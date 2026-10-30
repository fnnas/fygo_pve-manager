Ext.define('PVE.qemu.DisplayInputPanel', {
    extend: 'Proxmox.panel.InputPanel',
    xtype: 'pveDisplayInputPanel',
    onlineHelp: 'qm_display',

    onGetValues: function (values) {
        if (/^(mdev|ramfb)$/.test(values.type)) {
            delete values.memory;
            delete values.clipboard;
        }
        let vhost = /^vhost-user-/.test(values.type);
        if (vhost) {
            delete values.memory;
        }
        if (values.type !== 'mdev' || values.gl) {
            delete values.gl;
        }
        if (!values.rendernode || !this.getViewModel().get('hasGL')) {
            delete values.rendernode;
        }
        if (values.type !== 'ati-vga' || values['ati-model'] === '__default__') {
            delete values['ati-model'];
        }
        let ret = PVE.Parser.printPropertyString(values, 'type');
        if (ret === '') {
            return { delete: 'vga' };
        }
        return { vga: ret };
    },

    viewModel: {
        data: {
            type: '__default__',
            clipboard: '__default__',
            gl: true,
        },
        formulas: {
            matchNonGUIOption: function (get) {
                return get('type').match(/^(serial\d|none|ramfb|mdev)$/);
            },
            isVFIO: (get) => get('type') === 'mdev',
            isRAMFB: (get) => get('type') === 'ramfb',
            isATI: (get) => get('type') === 'ati-vga',
            hasGLOption: (get) => get('isVFIO'),
            hasGL: (get) =>
                /^(virtio-(gl|gpu-gl-(pci|device))|vhost-user-(vga|gpu-pci))$/.test(get('type')) ||
                (get('hasGLOption') && get('gl')),
            memoryUnavailable: (get) =>
                get('matchNonGUIOption') || /^vhost-user-/.test(get('type')),
            memoryMaximum: (get) => (get('type') === 'bochs-display' ? 256 : 512),
            displayHint: (get) => PVE.Utils.kvm_vga_hints[get('type')] || '',
            memoryEmptyText: function (get) {
                let val = get('type');
                if (val === 'cirrus' || val === 'isa-cirrus-vga') {
                    return '4';
                } else if (val === 'isa-vga') {
                    return '8';
                } else if (
                    val === 'std' ||
                    val.match(/^qxl(?:[234]|-pci)?$/) ||
                    ['vmware', 'ati-vga', 'bochs-display', 'secondary-vga'].includes(val)
                ) {
                    return '16';
                } else if (val.match(/^virtio/)) {
                    return '256';
                } else if (get('memoryUnavailable')) {
                    return 'N/A';
                } else {
                    console.debug('unexpected display type', val);
                    return Proxmox.Utils.defaultText;
                }
            },
            isVNC: (get) => get('clipboard') === 'vnc',
            hideDefaultHint: (get) => get('isVNC') || get('matchNonGUIOption'),
            hideVNCHint: (get) => !get('isVNC') || get('matchNonGUIOption'),
        },
    },

    items: [
        {
            name: 'type',
            xtype: 'pveFilteredKVComboBox',
            value: '__default__',
            deleteEmpty: false,
            fieldLabel: gettext('Graphic card'),
            comboItems: Object.entries(PVE.Utils.kvm_vga_drivers),
            allowedValuesPerCategory: PVE.qemu.Architecture.allowedDisplays,
            category: 'x86_64',
            listeners: {
                change: function (field, type) {
                    field
                        .up('pveDisplayInputPanel')
                        ?.getViewModel()
                        .set('gl', type === 'mdev');
                },
            },
            validator: function (v) {
                let cfg = this.up('proxmoxWindowEdit')?.vmconfig || {};

                if (v?.match(/^serial\d+$/) && (!cfg[v] || cfg[v] !== 'socket')) {
                    let fmt = gettext("Serial interface '{0}' is not correctly configured.");
                    return Ext.String.format(fmt, v);
                }
                return true;
            },
            bind: {
                value: '{type}',
            },
        },
        {
            xtype: 'proxmoxintegerfield',
            emptyText: Proxmox.Utils.defaultText,
            fieldLabel: gettext('Memory') + ' (MiB)',
            minValue: 4,
            maxValue: 512,
            step: 4,
            name: 'memory',
            validator: function (value) {
                let panel = this.up('pveDisplayInputPanel');
                let type = panel?.getViewModel().get('type');
                if (
                    value &&
                    /^(cirrus|isa-cirrus-vga)$/.test(type) &&
                    ![4, 8, 16].includes(Number(value))
                ) {
                    return gettext('Cirrus video memory must be 4, 8 or 16 MiB.');
                }
                if (
                    value &&
                    type === 'ati-vga' &&
                    panel.down('[name=ati-model]').getValue() === 'rv100' &&
                    Number(value) < 16
                ) {
                    return gettext('ATI RV100 requires at least 16 MiB video memory.');
                }
                return true;
            },
            bind: {
                emptyText: '{memoryEmptyText}',
                disabled: '{memoryUnavailable}',
                maxValue: '{memoryMaximum}',
            },
        },
        {
            xtype: 'proxmoxKVComboBox',
            name: 'ati-model',
            fieldLabel: gettext('ATI model'),
            value: '__default__',
            comboItems: [
                ['__default__', `${Proxmox.Utils.defaultText} (Rage 128 Pro)`],
                ['rage128p', 'Rage 128 Pro'],
                ['rv100', 'Radeon RV100'],
            ],
            listeners: {
                change: function (field) {
                    field.up('pveDisplayInputPanel')?.down('[name=memory]').validate();
                },
            },
            bind: { hidden: '{!isATI}', disabled: '{!isATI}' },
        },
        {
            xtype: 'displayfield',
            userCls: 'pmx-hint',
            bind: { value: '{displayHint}', hidden: '{!displayHint}' },
        },
    ],

    advancedItems: [
        {
            xtype: 'proxmoxcheckbox',
            name: 'gl',
            fieldLabel: 'OpenGL (EGL)',
            checked: true,
            uncheckedValue: 0,
            bind: {
                value: '{gl}',
                hidden: '{!hasGLOption}',
                disabled: '{!hasGLOption}',
            },
        },
        {
            xtype: 'textfield',
            name: 'rendernode',
            fieldLabel: gettext('DRM render node'),
            emptyText: gettext('Automatic'),
            submitEmptyText: false,
            regex: /^\/dev\/dri\/renderD[0-9]+$/,
            regexText: gettext('Use a host path such as /dev/dri/renderD128.'),
            bind: {
                hidden: '{!hasGL}',
                disabled: '{!hasGL}',
            },
        },
        {
            xtype: 'displayfield',
            userCls: 'pmx-hint',
            value: gettext(
                'Enable Console display on the graphics PCI device, then select Mediated/VFIO display here. Only selected graphics devices are exposed to VNC/SPICE. The host driver and vGPU profile must support a VFIO display interface; compute-only profiles cannot display a console.',
            ),
            bind: { hidden: '{!isVFIO}' },
        },
        {
            xtype: 'displayfield',
            userCls: 'pmx-hint',
            value: gettext(
                'OpenGL is enabled by default for DMA-BUF displays and needs a usable host DRM render node, libegl1 and libgl1. Leave the node empty for automatic selection; on multi-GPU hosts choose the node compatible with the vGPU. Disable OpenGL only for a CPU-accessible VFIO display region. A GPU passed through exclusively may not provide a host render node.',
            ),
            bind: { hidden: '{!isVFIO}' },
        },
        {
            xtype: 'displayfield',
            userCls: 'pmx-hint',
            value: gettext(
                'RAM framebuffer provides a simple UEFI display, not an accelerated GPU. It requires compatible UEFI firmware and a guest framebuffer driver. For vGPU boot graphics, use the RAMFB boot display switch on the PCI device instead. Shut down and start the VM after display changes.',
            ),
            bind: { hidden: '{!isRAMFB}' },
        },
        {
            xtype: 'proxmoxKVComboBox',
            name: 'clipboard',
            deleteEmpty: false,
            value: '__default__',
            fieldLabel: gettext('Clipboard'),
            comboItems: [
                ['__default__', Proxmox.Utils.defaultText],
                ['vnc', 'VNC'],
            ],
            bind: {
                value: '{clipboard}',
                disabled: '{matchNonGUIOption}',
            },
        },
        {
            xtype: 'displayfield',
            name: 'vncHint',
            userCls: 'pmx-hint',
            value:
                gettext(
                    'You cannot use the default SPICE clipboard if the VNC clipboard is selected.',
                ) +
                ' ' +
                gettext('VNC clipboard requires spice-tools installed in the Guest-VM.'),
            bind: {
                hidden: '{hideVNCHint}',
            },
        },
        {
            xtype: 'displayfield',
            name: 'vncMigration',
            userCls: 'pmx-hint',
            value: gettext(
                'You cannot live-migrate while using the VNC clipboard with machine versions older than 10.1.',
            ),
            bind: {
                hidden: '{hideVNCHint}',
            },
        },
        {
            xtype: 'displayfield',
            name: 'defaultHint',
            userCls: 'pmx-hint',
            value:
                gettext('This option depends on your display type.') +
                ' ' +
                gettext(
                    'If the display type uses SPICE you are able to use the default SPICE clipboard.',
                ),
            bind: {
                hidden: '{hideDefaultHint}',
            },
        },
    ],
});

Ext.define('PVE.qemu.DisplayEdit', {
    extend: 'Proxmox.window.Edit',

    vmconfig: undefined,

    subject: gettext('Display'),
    width: 600,

    items: [
        {
            xtype: 'pveDisplayInputPanel',
        },
    ],

    initComponent: function () {
        let me = this;

        me.callParent();

        me.load({
            success: function (response) {
                me.vmconfig = response.result.data;
                let vga = me.vmconfig.vga || '__default__';
                let values = PVE.Parser.parsePropertyString(vga, 'type');
                values.gl = PVE.Parser.parseBoolean(values.gl, true);
                me.down('[name=type]').setCategory(
                    PVE.qemu.Architecture.normalizeArchitecture(me.vmconfig.arch) ||
                        PVE.qemu.Architecture.normalizeArchitecture(me.arch) ||
                        PVE.qemu.Architecture.getNodeArchitecture(me.pveSelNode?.data.node),
                );
                me.setValues(values);
            },
        });
    },
});
