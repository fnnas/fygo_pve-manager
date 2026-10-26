Ext.define('PVE.qemu.NVMe', {
    singleton: true,

    // Defaults are placeholders, not field values, at every add/attach/import entry point.
    // Feature switches only supply the parameters required to activate a feature.
    options: {
        'nvme-controller': { value: '', label: gettext('NVMe controller') },
        serial: { value: '', label: gettext('Serial number'), encoded: true },
        model: { value: '', label: gettext('Model'), encoded: true },
        'firmware-version': { value: '', label: gettext('Firmware version'), encoded: true },
        max_ioqpairs: { value: 64, min: 1, max: 65535, label: gettext('I/O queue pairs') },
        msix_qsize: { value: 65, min: 1, max: 2048, label: gettext('MSI-X vectors') },
        mdts: { value: 7, min: 1, max: 9, label: 'MDTS' },
        'use-intel-id': { value: true, label: gettext('Use Intel PCI IDs') },
        cmb_size_mb: {
            value: 0,
            min: 0,
            max: 4096,
            label: gettext('Controller memory buffer') + ' (MiB)',
        },
        'legacy-cmb': { value: false, label: gettext('Legacy CMB behavior') },
        ocp: { value: false, switch: true, label: gettext('OCP extended SMART log') },
        subsystem: { value: false, switch: true, label: gettext('NVM subsystem') },
        subnqn: { value: '', label: gettext('Subsystem NQN suffix') },
        'nvme-paths': { value: 1, min: 1, max: 8, label: gettext('Controller paths') },
        nsid: { value: '', min: 1, max: 256, label: gettext('Namespace ID') },
        uuid: { value: '', label: gettext('Namespace UUID') },
        nguid: { value: '', label: 'NGUID' },
        eui64: { value: '', label: 'EUI-64' },
        logical_block_size: { value: 512, label: gettext('Logical block size') },
        'nvme-shared': { value: true, label: gettext('Share across controller paths') },
        detached: { value: false, switch: true, label: gettext('Initially detached') },
        mssrl: { value: 128, min: 0, max: 65535, label: 'MSSRL' },
        mcl: { value: 128, min: 0, max: 4294967295, label: 'MCL' },
        msrc: { value: 127, min: 0, max: 255, label: 'MSRC' },
        zoned: { value: false, switch: true, label: gettext('Zoned Namespace (ZNS)') },
        'zoned-zone-size': {
            value: 128,
            min: 512 / 1048576,
            max: Number.MAX_SAFE_INTEGER / 1048576,
            scale: 1048576,
            label: gettext('Zone size') + ' (MiB)',
        },
        'zoned-zone-capacity': {
            value: 0,
            min: 0,
            max: Number.MAX_SAFE_INTEGER / 1048576,
            scale: 1048576,
            label: gettext('Zone capacity') + ' (MiB)',
        },
        'zoned-descr-ext-size': {
            value: 0,
            min: 0,
            max: 16320,
            label: gettext('Zone descriptor extension') + ' (B)',
        },
        'zoned-cross-read': { value: false, label: gettext('Read across zones') },
        'zoned-max-active': {
            value: 0,
            min: 0,
            max: 4294967295,
            label: gettext('Maximum active zones'),
        },
        'zoned-max-open': {
            value: 0,
            min: 0,
            max: 4294967295,
            label: gettext('Maximum open zones'),
        },
        'zoned-zasl': { value: 0, min: 0, max: 9, label: 'ZASL' },
        ms: { value: 0, min: 0, max: 65535, label: gettext('Metadata bytes per LBA') },
        mset: { value: 0, label: gettext('Metadata transfer') },
        pi: { value: 0, label: gettext('Protection information') },
        pil: { value: 0, label: gettext('Protection placement') },
        pif: { value: 0, label: gettext('Protection guard format') },
        fdp: { value: false, switch: true, label: gettext('Flexible Data Placement (FDP)') },
        'fdp-nrg': { value: 1, min: 1, max: 65535, label: gettext('Reclaim groups') },
        'fdp-nruh': { value: 16, min: 1, max: 127, label: gettext('Reclaim unit handles') },
        'fdp-runs': {
            value: 96,
            min: 512 / 1048576,
            max: Number.MAX_SAFE_INTEGER / 1048576,
            scale: 1048576,
            label: gettext('Reclaim unit size') + ' (MiB)',
        },
        'fdp-ruhs': { value: '', label: gettext('Namespace handle list') },
        sriov_max_vfs: { value: 0, min: 0, max: 127, label: gettext('Maximum virtual functions') },
        sriov_vq_flexible: {
            value: 0,
            min: 0,
            max: 65535,
            label: gettext('Flexible queue resources'),
        },
        sriov_vi_flexible: {
            value: 0,
            min: 0,
            max: 2047,
            label: gettext('Flexible interrupt resources'),
        },
        sriov_max_vq_per_vf: {
            value: 0,
            min: 0,
            max: 65535,
            label: gettext('Maximum queues per VF'),
        },
        sriov_max_vi_per_vf: {
            value: 0,
            min: 0,
            max: 2047,
            label: gettext('Maximum interrupts per VF'),
        },
    },

    features: {
        cmb: {
            label: gettext('Enable CMB'),
            state: 'nvmeCMB',
            options: ['cmb_size_mb', 'legacy-cmb'],
            parameter: 'cmb_size_mb',
            value: 16,
            min: 1,
        },
        multipath: {
            label: gettext('Multiple controller paths'),
            state: 'nvmeMultipath',
            options: ['nvme-paths'],
            parameter: 'nvme-paths',
            value: 2,
            min: 2,
        },
        copy: {
            label: gettext('Customize Simple Copy limits'),
            state: 'nvmeCopy',
            options: ['mssrl', 'mcl', 'msrc'],
        },
        metadata: {
            label: gettext('Enable metadata'),
            state: 'nvmeMetadata',
            options: ['ms', 'mset'],
            parameter: 'ms',
            value: 8,
            min: 1,
        },
        protection: {
            label: gettext('Enable protection information'),
            state: 'nvmeProtection',
            options: ['pi', 'pil', 'pif'],
            parameter: 'pi',
            value: 1,
            min: 1,
        },
        sriov: {
            label: gettext('Enable SR-IOV'),
            state: 'nvmeSRIOV',
            options: [
                'sriov_max_vfs',
                'sriov_vq_flexible',
                'sriov_vi_flexible',
                'sriov_max_vq_per_vf',
                'sriov_max_vi_per_vf',
            ],
            parameter: 'sriov_max_vfs',
            value: 1,
            min: 1,
        },
    },

    controllerOptions: [
        'serial',
        'model',
        'firmware-version',
        'max_ioqpairs',
        'msix_qsize',
        'mdts',
        'use-intel-id',
        'cmb_size_mb',
        'legacy-cmb',
        'ocp',
        'subsystem',
        'subnqn',
        'nvme-paths',
        'zoned-zasl',
        'fdp',
        'fdp-nrg',
        'fdp-nruh',
        'fdp-runs',
        'sriov_max_vfs',
        'sriov_vq_flexible',
        'sriov_vi_flexible',
        'sriov_max_vq_per_vf',
        'sriov_max_vi_per_vf',
    ],

    decodeIdentity: function (value) {
        try {
            return decodeURIComponent(value);
        } catch {
            // Older configurations may contain URL-encoded non-UTF-8 bytes.
            return value;
        }
    },

    featureEnabled: function (drive, feature) {
        return feature.parameter
            ? Number(drive[feature.parameter]) >= feature.min
            : feature.options.some((name) => drive[name] !== undefined);
    },

    loadValues: function (drive) {
        let values = {};
        for (const [name, option] of Object.entries(this.options)) {
            let value = drive[name];
            if (value === undefined) {
                value = option.switch ? false : '';
            } else if (name === 'nvme-controller') {
                value = Number(value);
            } else if (typeof option.value === 'boolean') {
                value = PVE.Parser.parseBoolean(String(value));
                if (!option.switch) {
                    value = Number(value);
                }
            } else if (option.encoded) {
                value = this.decodeIdentity(value);
            } else if (option.scale) {
                value = Number(value) / option.scale;
            }
            values[`nvme-${name}`] = value;
        }
        for (const [name, feature] of Object.entries(this.features)) {
            values[`nvme-enable-${name}`] = this.featureEnabled(drive, feature);
        }
        return values;
    },

    applyValues: function (drive, values, confid) {
        let me = this;
        const isNVMe = /^nvme\d+$/.test(confid);
        const owner = values['nvme-nvme-controller'];
        const child =
            owner !== undefined &&
            owner !== null &&
            owner !== '' &&
            `nvme${Number(owner)}` !== confid;
        const enabled = {};
        const wasEnabled = {};
        for (const [name, feature] of Object.entries(me.features)) {
            wasEnabled[name] = me.featureEnabled(drive, feature);
            enabled[name] =
                values[`nvme-enable-${name}`] === undefined
                    ? wasEnabled[name]
                    : PVE.Parser.parseBoolean(String(values[`nvme-enable-${name}`]));
        }
        enabled.protection &&= enabled.metadata;
        for (const [name, option] of Object.entries(me.options)) {
            // Keep identity overrides only on buses whose drive schemas accept them.
            if (!isNVMe) {
                const supportedIdentity =
                    (name === 'serial' && /^(ide|sata|scsi|virtio|usbdisk)\d+$/.test(confid)) ||
                    (name === 'model' && /^ide\d+$/.test(confid));
                if (!supportedIdentity) {
                    delete drive[name];
                }
                continue;
            }
            if (child && me.controllerOptions.includes(name)) {
                delete drive[name];
                continue;
            }
            let value = values[`nvme-${name}`];
            if (value === undefined) {
                continue;
            }
            const boolean = typeof option.value === 'boolean';
            if (value === '' || value === null) {
                delete drive[name];
            } else if (name === 'nvme-controller') {
                drive[name] = Number(value);
            } else if (boolean) {
                value = PVE.Parser.parseBoolean(String(value)) ? 1 : 0;
                if (!value && option.switch && PVE.Parser.parseBoolean(String(drive[name] ?? 1))) {
                    delete drive[name];
                } else {
                    drive[name] = value;
                }
            } else if (option.encoded) {
                if (drive[name] === undefined || me.decodeIdentity(drive[name]) !== value) {
                    drive[name] = encodeURIComponent(value);
                }
            } else {
                drive[name] = option.scale ? Number(value) * option.scale : value;
            }
        }
        if (!isNVMe) {
            return;
        }
        for (const [name, feature] of Object.entries(me.features)) {
            if (child && me.controllerOptions.includes(feature.parameter)) {
                continue;
            }
            if (!enabled[name]) {
                // A guard format can be configured while PI is disabled.
                const disablingMetadata =
                    name === 'protection' && wasEnabled.metadata && !enabled.metadata;
                if (wasEnabled[name] || disablingMetadata) {
                    feature.options.forEach((option) => delete drive[option]);
                }
            } else if (feature.parameter && drive[feature.parameter] === undefined) {
                drive[feature.parameter] =
                    name === 'metadata' && enabled.protection && Number(drive.pif) === 2
                        ? 16
                        : feature.value;
            }
        }
        if (!PVE.Parser.parseBoolean(String(values['nvme-zoned'] ?? drive.zoned))) {
            Object.keys(me.options)
                .filter((name) => name.startsWith('zoned-') && name !== 'zoned-zasl')
                .forEach((name) => delete drive[name]);
        }
        if (!PVE.Parser.parseBoolean(String(values['nvme-fdp'] ?? drive.fdp))) {
            ['fdp-nrg', 'fdp-nruh', 'fdp-runs'].forEach((name) => delete drive[name]);
        }
        if (!child && !PVE.Parser.parseBoolean(String(drive.fdp))) {
            delete drive['fdp-ruhs'];
        }
    },

    createPanel: function (view) {
        let me = this;
        const fields = {};
        const get = (name) => view.down(`field[name=nvme-${name}]`)?.getValue();
        const defaultText = (value) => `${Proxmox.Utils.defaultText} (${value})`;
        const setPlaceholder = (name, value) => {
            const field = view.down(`field[name=nvme-${name}]`);
            field?.setEmptyText(defaultText(value));
        };
        const updateState = () => {
            const model = view.getViewModel();
            const owner = get('nvme-controller');
            const id = view.bussel?.getConfId() || view.confid;
            model.set(
                'nvmeIsChild',
                owner !== undefined &&
                    owner !== null &&
                    owner !== '' &&
                    `nvme${Number(owner)}` !== id,
            );
            model.set('nvmeZoned', !!get('zoned'));
            model.set('nvmeFDP', !!get('fdp'));
            for (const [name, feature] of Object.entries(me.features)) {
                model.set(feature.state, !!get(`enable-${name}`));
            }
            const metadata = get('enable-protection') && Number(get('pif')) === 2 ? 16 : 8;
            setPlaceholder('ms', metadata);
            const vfs = Number(get('sriov_max_vfs')) || me.features.sriov.value;
            const queues = Number(get('sriov_vq_flexible')) || 2 * vfs;
            const interrupts = Number(get('sriov_vi_flexible')) || vfs;
            setPlaceholder('sriov_vq_flexible', `${gettext('Automatic')}: ${2 * vfs}`);
            setPlaceholder('sriov_vi_flexible', `${gettext('Automatic')}: ${vfs}`);
            setPlaceholder(
                'sriov_max_vq_per_vf',
                `${gettext('Automatic')}: ${Math.floor(queues / vfs)}`,
            );
            setPlaceholder(
                'sriov_max_vi_per_vf',
                `${gettext('Automatic')}: ${Math.floor(interrupts / vfs)}`,
            );
        };
        // InputPanel collects getSubmitData() from every field. Always submit blanks
        // explicitly here so clearing an override removes it from the disk property string.
        const getSubmitData = function () {
            return this.disabled ? null : { [this.getName()]: this.getValue() ?? '' };
        };
        const change = (field, value) => {
            if (value === '__default__') {
                field.setValue(null);
            }
            updateState();
        };
        for (const [name, option] of Object.entries(me.options)) {
            const boolean = typeof option.value === 'boolean';
            let field = {
                xtype: option.switch
                    ? 'proxmoxcheckbox'
                    : option.min !== undefined
                      ? 'proxmoxintegerfield'
                      : 'textfield',
                name: `nvme-${name}`,
                fieldLabel: option.label,
                labelWidth: 165,
                value: option.switch ? false : '',
                emptyText:
                    option.value === ''
                        ? undefined
                        : defaultText(
                              boolean
                                  ? option.value
                                      ? gettext('Enabled')
                                      : gettext('Disabled')
                                  : option.value,
                          ),
                submitEmptyText: false,
                allowBlank: true,
                getSubmitData,
                listeners: { change, afterrender: updateState },
                bind: {
                    disabled: me.controllerOptions.includes(name)
                        ? '{!isNVMe || nvmeIsChild}'
                        : '{!isNVMe}',
                },
            };
            if (option.min !== undefined) {
                Object.assign(field, {
                    minValue: option.min,
                    maxValue: option.max,
                });
                if (option.scale) {
                    field.xtype = 'numberfield';
                    field.allowDecimals = true;
                    field.decimalPrecision = 11;
                }
            }
            if (boolean && !option.switch) {
                Object.assign(field, {
                    xtype: 'proxmoxKVComboBox',
                    comboItems: [
                        ['__default__', Proxmox.Utils.defaultText],
                        [1, gettext('Enabled')],
                        [0, gettext('Disabled')],
                    ],
                    editable: false,
                });
            }
            if (name.startsWith('zoned-') && name !== 'zoned-zasl') {
                field.bind.disabled = '{!isNVMe || !nvmeZoned}';
            } else if (['fdp-nrg', 'fdp-nruh', 'fdp-runs'].includes(name)) {
                field.bind.disabled = '{!isNVMe || nvmeIsChild || !nvmeFDP}';
            }
            fields[name] = field;
        }
        for (const [name, feature] of Object.entries(me.features)) {
            const controller = me.controllerOptions.includes(feature.parameter);
            fields[`enable-${name}`] = {
                xtype: 'proxmoxcheckbox',
                name: `nvme-enable-${name}`,
                fieldLabel: feature.label,
                labelWidth: 165,
                value: false,
                getSubmitData,
                listeners: { change: updateState, afterrender: updateState },
                bind: {
                    disabled:
                        name === 'protection'
                            ? '{!isNVMe || !nvmeMetadata}'
                            : controller
                              ? '{!isNVMe || nvmeIsChild}'
                              : '{!isNVMe}',
                },
            };
            for (const option of feature.options) {
                fields[option].bind.disabled = controller
                    ? `{!isNVMe || nvmeIsChild || !${feature.state}}`
                    : name === 'protection'
                      ? '{!isNVMe || !nvmeMetadata || !nvmeProtection}'
                      : `{!isNVMe || !${feature.state}}`;
            }
            if (feature.parameter) {
                Object.assign(fields[feature.parameter], {
                    minValue: feature.min,
                    emptyText: defaultText(feature.value),
                });
            }
        }
        fields['fdp-ruhs'].bind.disabled = '{!isNVMe || (!nvmeIsChild && !nvmeFDP)}';
        fields.cmb_size_mb.validator = (value) =>
            !Number(value) ||
            (Number(value) & (Number(value) - 1)) === 0 ||
            gettext('CMB size must be a power of two in MiB.');
        fields.sriov_vq_flexible.minValue = 2;
        fields.sriov_vi_flexible.minValue = 1;
        Object.assign(fields['nvme-controller'], {
            xtype: 'proxmoxKVComboBox',
            reference: 'nvmeOwner',
            comboItems: [['__default__', gettext('Dedicated controller')]],
            editable: false,
            emptyText: gettext('Dedicated controller'),
            listeners: {
                ...fields['nvme-controller'].listeners,
                beforequery: () => view.updateNVMeControllers?.(),
            },
        });
        const combos = {
            logical_block_size: [
                [512, '512 B'],
                [4096, '4096 B'],
            ],
            mset: [
                [0, gettext('Separate metadata')],
                [1, gettext('Extended LBA')],
            ],
            pi: [
                [0, gettext('Disabled')],
                [1, gettext('Type 1')],
                [2, gettext('Type 2')],
                [3, gettext('Type 3')],
            ],
            pil: [
                [0, gettext('Last metadata bytes')],
                [1, gettext('First metadata bytes')],
            ],
            pif: [
                [0, gettext('16-bit')],
                [2, gettext('64-bit')],
            ],
        };
        for (const [name, comboItems] of Object.entries(combos)) {
            Object.assign(fields[name], {
                xtype: 'proxmoxKVComboBox',
                comboItems: [['__default__', Proxmox.Utils.defaultText], ...comboItems],
                editable: false,
                emptyText: defaultText(
                    comboItems.find(
                        ([key]) =>
                            key ===
                            (me.features.protection.parameter === name
                                ? me.features.protection.value
                                : me.options[name].value),
                    )?.[1],
                ),
            });
        }
        fields.pi.validator = function () {
            const value = this.getValue();
            return (
                value === '' ||
                value === null ||
                Number(value) > 0 ||
                gettext('Select a protection type.')
            );
        };
        fields.sriov_max_vq_per_vf.validator = (value) =>
            Number(value) !== 1 || gettext('Use 0 for automatic allocation or at least 2 queues.');
        for (const name of ['serial', 'model', 'firmware-version']) {
            const max = name === 'serial' ? 20 : name === 'model' ? 40 : 8;
            fields[name].maxLength = max;
            fields[name].validator = (value) =>
                !value ||
                /^[\x20-\x7e]+$/.test(value) ||
                gettext('Use printable ASCII characters.');
        }
        fields.nsid.emptyText = gettext('Automatic (disk index + 1)');
        fields.uuid.emptyText = gettext('Automatic, stable UUID');
        fields.nguid.emptyText = gettext('Not set');
        fields.eui64.emptyText = gettext('Automatic (QEMU default)');
        fields.subnqn.emptyText = gettext('Automatic, unique per VM and controller');
        fields['firmware-version'].emptyText = gettext('QEMU version');
        fields.model.emptyText = 'QEMU NVMe Ctrl';
        fields.serial.emptyText = gettext('Disk ID');
        fields['fdp-ruhs'].emptyText = gettext('Automatic, or e.g. 0;8-15');
        const patterns = {
            uuid: /^(auto|[0-9a-fA-F]{8}(-[0-9a-fA-F]{4}){3}-[0-9a-fA-F]{12})$/,
            nguid: /^(auto|[0-9a-fA-F]{2}(-?[0-9a-fA-F]{2}){15})$/,
            eui64: /^0x[0-9a-fA-F]{16}$/,
            subnqn: /^[a-z0-9_.:-]{1,200}$/i,
            'fdp-ruhs': /^\d+(-\d+)?(;\d+(-\d+)?)*$/,
        };
        for (const [name, pattern] of Object.entries(patterns)) {
            fields[name].validator = (value) =>
                !value || pattern.test(value) || gettext('Invalid NVMe identifier or handle list.');
        }
        fields['zoned-descr-ext-size'].validator = (value) =>
            Number(value) % 64 === 0 || gettext('Must be a multiple of 64 bytes.');
        const helpSection = (title, text, commands = []) => ({
            xtype: 'displayfield',
            hideLabel: true,
            value: [
                `<b>${Ext.String.htmlEncode(title)}</b>`,
                Ext.String.htmlEncode(text),
                ...commands.map(
                    (command) =>
                        `<code style="white-space:pre-wrap;overflow-wrap:anywhere">${Ext.String.htmlEncode(command)}</code>`,
                ),
            ].join('<br>'),
        });
        const help = {
            controller: [
                helpSection(
                    gettext('Everyday use and defaults'),
                    gettext(
                        'For a normal data or boot disk, leave advanced features disabled and fields blank unless needed. Gray text shows defaults; entering a value saves an override, and clearing it removes that override. Feature switches supply required activation parameters. Apply NVMe device changes by shutting down and starting the VM. Live migration, RAM snapshots and hibernation are unavailable. A boot disk also needs compatible VM firmware, an installed bootloader and selection in Boot Order.',
                    ),
                    ['nvme list', 'nvme list-subsys'],
                ),
                helpSection(
                    gettext('Controller identity and PCI IDs'),
                    gettext(
                        'Serial, model and firmware version accept at most 20, 40 and 8 printable ASCII characters. Defaults report the disk ID, QEMU NVMe Ctrl and the QEMU version. Model and firmware overrides need support in the host QEMU. These fields change reported identity; guest drivers still need NVMe support. Intel PCI IDs are enabled by default in this integration; change them only for driver compatibility testing.',
                    ),
                    ['nvme id-ctrl /dev/nvme0 -H'],
                ),
                helpSection(
                    gettext('Queues, interrupts and transfer size'),
                    gettext(
                        'The defaults allow 64 I/O queue pairs and 65 MSI-X vectors, including the admin interrupt. The guest chooses how many queues to use according to its CPUs and driver; larger limits alone do not guarantee higher throughput. MDTS is an exponent, not a size in MiB: the limit is 4096 bytes times 2^MDTS in this emulation, so 7 allows 512 KiB per command. Keep the defaults unless testing specific queue or transfer limits.',
                    ),
                    ['nvme get-feature /dev/nvme0 -f 7 -H', 'nvme show-regs /dev/nvme0 -H'],
                ),
                helpSection(
                    gettext('Controller Memory Buffer (CMB)'),
                    gettext(
                        'Enable CMB to expose a memory buffer in PCI BAR 2; an empty size uses 16 MiB. The size must be a power of two in MiB, such as 1, 2, 4, 8 or 16. It consumes additional host memory and its contents do not survive device recreation. The default NVMe 1.4 mode requires the guest driver to enable and use it. Legacy mode exposes NVMe 1.3 behavior for compatibility tests. Linux use of submission queues in CMB depends on nvme.use_cmb_sqes and driver support; if changing this boot parameter, reboot the guest. CMB cannot be combined with SR-IOV.',
                    ),
                    [
                        'cat /sys/module/nvme/parameters/use_cmb_sqes',
                        'nvme show-regs /dev/nvme0 -H',
                    ],
                ),
                helpSection(
                    gettext('OCP and SMART logs'),
                    gettext(
                        'OCP enables the additional SMART/Health log at page 0xc0. Use a compatible nvme-cli OCP plugin to decode it, or inspect the raw log with get-log. SMART counters describe the virtual controller and reset when it is power cycled; inspect the host storage separately for physical disk health. The log fields supported by QEMU vary by version.',
                    ),
                    [
                        'nvme smart-log /dev/nvme0',
                        'nvme ocp smart-add-log /dev/nvme0',
                        'nvme get-log /dev/nvme0 --log-id=0xc0 --log-len=512',
                    ],
                ),
                helpSection(
                    gettext('Subsystems and controller paths'),
                    gettext(
                        'To add another namespace to an existing controller, select its owning disk in NVMe controller; configure all controller settings on that disk. References cannot be chained. Each disk retains its own backing volume. Multiple paths use one subsystem, and an empty path count uses 2 when enabled. Linux native multipath requires nvme_core.multipath=Y; reboot the guest after changing it. All paths access the same backing data. NQN suffixes accept up to 200 letters, digits and the characters _.:-. Keep them unique; QEMU prefixes them with nqn.2019-08.org.qemu:.',
                    ),
                    ['cat /sys/module/nvme_core/parameters/multipath', 'nvme list-subsys'],
                ),
                helpSection(
                    gettext('Linux device names'),
                    gettext(
                        'With Linux native NVMe multipath, nvme0n1 is the namespace access device and nvme0c0n1 is a controller path, which can appear in logs even with one path. In nvme0c0n1, the first 0 identifies the subsystem, c0 the controller path, and n1 the namespace device index; this index can differ from NSID. Normally use /dev/nvme0n1 or its partitions for partitioning, formatting and mounting.',
                    ),
                ),
            ],
            namespace: [
                helpSection(
                    gettext('Namespace IDs and persistent identifiers'),
                    gettext(
                        'With explicit namespaces, NSIDs must be unique within their subsystem and range from 1 to 256; blank uses the VM disk index plus one. The legacy single-namespace layout uses NSID 1. Explicit namespace UUIDs default to a stable value derived from the VM ID and disk slot. NGUID is unset when blank; EUI-64 follows the QEMU machine defaults. UUID uses the 8-4-4-4-12 hexadecimal format, NGUID uses 32 hexadecimal digits with optional hyphens between bytes, and EUI-64 uses 0x followed by 16 hexadecimal digits. Keep identifiers unique. UUID or NGUID set to auto changes at each cold start and can change persistent device paths. Device identifiers are separate from filesystem UUIDs.',
                    ),
                    ['nvme id-ns /dev/nvme0n1 -H', 'nvme ns-descs /dev/nvme0n1'],
                ),
                helpSection(
                    gettext('Sharing, detachment and booting'),
                    gettext(
                        'Share across controller paths attaches the namespace to all controllers in this VM subsystem. It is independent of the storage Shared flag. A private namespace can attach to only one controller at a time and initially uses the primary path. Initially detached leaves it allocated but inaccessible until guest attachment, and it cannot be selected as a boot device. Leave detachment disabled for an ordinary data or boot disk.',
                    ),
                ),
                helpSection(
                    gettext('Attaching a detached namespace'),
                    gettext(
                        'List all allocated namespaces with list-ns -a, obtain controller IDs with list-ctrl, then attach the chosen NSID to the chosen CNTLID and rescan. CNTLID is the protocol controller ID, not necessarily the number in /dev/nvme0. Repeat attachment after cold starts while Initially detached remains enabled. Inspect actual device names again after rescanning.',
                    ),
                    [
                        'nvme list-ns /dev/nvme0 -a',
                        'nvme list-ctrl /dev/nvme0',
                        'nvme attach-ns /dev/nvme0 -n <NSID> -c <CNTLID>',
                        'nvme ns-rescan /dev/nvme0',
                    ],
                ),
                helpSection(
                    gettext('Logical block size and existing data'),
                    gettext(
                        'Choose 512 or 4096 data bytes per logical block; blank uses 512. Guest firmware, drivers and software must support the chosen format. Changing LBA size reinterprets existing image data and does not convert partition tables or filesystems. Back up and convert existing data before changing it. Metadata also reduces the data capacity reported to the guest.',
                    ),
                ),
                helpSection(
                    gettext('Simple Copy usage and limits'),
                    gettext(
                        'Simple Copy copies logical block ranges within a namespace when guest software issues the NVMe Copy command. Normal file copying does not necessarily use it. Support is available by default; the switch only customizes limits. MSSRL limits each source range and MCL the total copied blocks. Defaults of 128 blocks allow 64 KiB with 512-byte LBAs or 512 KiB with 4096-byte LBAs. MSRC is the maximum range count minus one, so 127 means 128 ranges. Raw nvme copy overwrites destination LBAs; use an unmounted disposable test namespace and consult its version-specific help.',
                    ),
                    ['nvme id-ns /dev/nvme0n1 -H', 'nvme copy --help'],
                ),
            ],
            zns: [
                helpSection(
                    gettext('ZNS test workflow'),
                    gettext(
                        'Use a guest kernel and filesystem that support zoned block devices. Btrfs can detect zoned mode automatically; the example explicitly selects it on a blank whole test namespace, without a conventional GPT layout. Replace nvmeXnY with the test device. Formatting erases its contents. Inspect zone state with report-zones. This QEMU emulation loses zone state on cold starts, so keep this workflow for disposable tests.',
                    ),
                    [
                        'nvme zns id-ns /dev/nvmeXnY',
                        'nvme zns report-zones /dev/nvmeXnY',
                        'mkfs.btrfs -O zoned /dev/nvmeXnY',
                    ],
                ),
                helpSection(
                    gettext('Zone geometry and writable capacity'),
                    gettext(
                        'Zone size is the spacing between zone starts; zone capacity is the writable amount in each zone. Defaults use 128 MiB zones and capacity 0, meaning equal to zone size. Capacity cannot exceed zone size, and both must align to the logical block size. The namespace must fit at least one complete zone after metadata is accounted for. Choose a zone size supported by the guest filesystem; retain the 128 MiB default for the Btrfs test.',
                    ),
                ),
                helpSection(
                    gettext('Open and active zone limits'),
                    gettext(
                        'Active zones include open and closed zones that have not become full or been reset. Maximum active zones 0 is unlimited. Maximum open zones 0 follows a nonzero active limit, otherwise it is unlimited. A nonzero open limit cannot exceed the active limit. Small limits can cause zone-resource errors or prevent a filesystem from working. Zone reset invalidates existing data in that zone; it is not a filesystem repair operation.',
                    ),
                ),
                helpSection(
                    gettext('Descriptors, cross-zone reads and Zone Append'),
                    gettext(
                        'Descriptor extension size is in bytes and must be a multiple of 64; 0 disables it. Read across zones permits a read command to cross a boundary while preserving the sequential-write rules. ZASL controls the maximum Zone Append transfer as 4096 bytes times 2^ZASL; 0 inherits MDTS and a nonzero value cannot exceed MDTS. ZASL belongs to the controller and is configured on its owning disk. ZNS cannot share an FDP-enabled subsystem.',
                    ),
                ),
            ],
            metadata: [
                helpSection(
                    gettext('Metadata transport and data capacity'),
                    gettext(
                        'Metadata associates additional bytes with each logical block. Enabling it with a blank size uses 8 bytes. Separate metadata uses MPTR; Extended LBA transfers data and metadata together. The guest driver must support the chosen mode. Data and metadata consume the same backing image: the number of data blocks is floor(image bytes / (LBA data bytes + metadata bytes)). A namespace with metadata cannot be resized by this integration.',
                    ),
                ),
                helpSection(
                    gettext('Protection types, placement and guards'),
                    gettext(
                        'Protection information adds integrity checks to metadata. Enabling it with blank fields selects type 1. Types 1 and 2 validate reference tags using their respective addressing rules; type 3 omits that check. Match the type and first/last metadata placement to the guest integrity stack. The default 16-bit guard requires at least 8 metadata bytes. A 64-bit guard requires at least 16 bytes, which is also the blank-size fallback for that format. 32-bit guards are unsupported.',
                    ),
                ),
                helpSection(
                    gettext('Firmware boot support'),
                    gettext(
                        'SeaBIOS skips NVMe namespaces with metadata or protection information because its disk interface cannot transfer metadata. These namespaces remain available to a compatible guest driver after booting from another disk. Use an ordinary namespace without metadata for SeaBIOS boot. OVMF boot support depends on its NVMe driver and the selected format; verify firmware support before choosing a protected boot disk.',
                    ),
                ),
                helpSection(
                    gettext('Large metadata formats'),
                    gettext(
                        'Linux kernels with an 8-bit integrity tuple size, including Linux 6.12, cannot safely handle more than 255 metadata bytes in Separate metadata mode and may crash. Use a format supported by the guest. Extended LBA can be used with a compatible passthrough application, but the standard Linux block device may be unavailable.',
                    ),
                ),
                helpSection(
                    gettext('Guest support and existing images'),
                    gettext(
                        'Keep metadata and protection disabled for ordinary use unless the guest supports the selected format. On Linux, check NVMe driver and block-integrity support; unsupported formats can leave the disk unavailable or cause I/O errors. Identify the active format before creating a filesystem. Changing LBA size, metadata size, transfer mode or protection settings does not convert existing data or generate valid protection information. Back up and convert existing images, or start with a blank disposable image.',
                    ),
                    ['nvme id-ns /dev/nvme0n1 -H', 'ls /sys/block/nvme0n1/integrity'],
                ),
                helpSection(
                    gettext('Creating a protected disk'),
                    gettext(
                        'Create a new disk with protection already enabled to initialize its metadata before use. Initialization writes the metadata area and may take time and allocate storage on thin-provisioned volumes. Existing, imported, cloned and restored images retain their contents and must already have valid metadata for the selected format. Enabling protection on an existing zero-filled image does not initialize it.',
                    ),
                ),
            ],
            fdp: [
                helpSection(
                    gettext('Enable FDP and choose a workload'),
                    gettext(
                        'FDP lets software direct writes to placement handles while retaining conventional random-write semantics. Enable it on the controller-owning disk; the subsystem defaults to 1 reclaim group, 16 reclaim unit handles and 96 MiB reclaim units. This QEMU emulation exposes one Endurance Group with ID 1 and always enables FDP Mode when configured. Ordinary filesystems can use default placement; exercising different placements requires a guest application or an FDP-capable fio io_uring_cmd workload.',
                    ),
                    ['nvme fdp configs /dev/nvme0 -e 1', 'fio --cmdhelp=fdp'],
                ),
                helpSection(
                    gettext('Reclaim unit handles and namespace mapping'),
                    gettext(
                        'The namespace handle list selects subsystem reclaim unit handles, using semicolons and inclusive ranges such as 0;8-15. Values must be distinct and less than the subsystem handle count. Manual lists reserve their handles first; blank lists share the first remaining free handle as placement handle 0. Leave at least one subsystem handle unselected when mixing manual and automatic mappings. Inspect the namespace status for its placement identifiers rather than treating a reclaim unit handle index as a placement identifier. Configure each namespace list on that disk, including when it shares another disk controller.',
                    ),
                    ['nvme fdp status /dev/nvme0 -n <NSID>', 'nvme fdp usage /dev/nvme0 -e 1'],
                ),
                helpSection(
                    gettext('FDP constraints and interpreting results'),
                    gettext(
                        'Namespaces sharing a reclaim unit handle must use the same LBA data size and metadata byte count; namespaces using disjoint handles may use different formats. Reclaim unit size must be a multiple of every namespace LBA size, and the group/handle configuration must fit the placement identifier encoding. ZNS is incompatible with the entire FDP-enabled subsystem. QEMU is useful for protocol and placement-policy tests; physical SSD write-amplification and endurance benefits require validation on real hardware.',
                    ),
                ),
            ],
            sriov: [
                helpSection(
                    gettext('SR-IOV requirements and resource budget'),
                    gettext(
                        'This experimental feature exposes virtual PCIe primary and secondary controller functions inside this guest. It requires Q35 or aarch64, one controller path and CMB disabled. An empty VF count uses 1. Empty flexible pools reserve 2 queue resources and 1 interrupt per VF; these include an admin queue and an I/O queue. Leave at least 2 queue resources and 1 interrupt for the primary controller. Per-VF limits of 0 divide the pool by the VF count; a nonzero queue limit must be at least 2 and fit the pool.',
                    ),
                ),
                helpSection(
                    gettext('1. Identify the PF and release flexible resources'),
                    gettext(
                        'The following sequence configures one VF with the default pools. Use a disposable data controller: Function Level Reset interrupts I/O to all its namespaces, so stop workloads and unmount them first. Obtain the PF PCI address and protocol controller IDs from this guest; replace PF-BDF, VF-BDF, PF-CNTLID and VF-CNTLID below. Release flexible interrupt and queue resources from the primary controller before resetting it.',
                    ),
                    [
                        'lspci -Dnn',
                        'nvme id-ctrl /dev/nvme0 -H',
                        'nvme list-secondary /dev/nvme0',
                        'nvme virt-mgmt /dev/nvme0 -c <PF-CNTLID> -r 1 -a 1 -n 0',
                        'nvme virt-mgmt /dev/nvme0 -c <PF-CNTLID> -r 0 -a 1 -n 0',
                    ],
                ),
                helpSection(
                    gettext('2. Reset the PF and expose one VF'),
                    gettext(
                        'Reset the PF to make the released resources available, then enable one VF through its guest sysfs attribute. Recheck controller paths and IDs after reset, because enumeration can change. Enabling the VF alone does not allocate its NVMe resources or make the secondary controller online.',
                    ),
                    [
                        'echo 1 > /sys/bus/pci/devices/<PF-BDF>/reset',
                        'echo 1 > /sys/bus/pci/devices/<PF-BDF>/sriov_numvfs',
                        'nvme list-secondary /dev/nvme0',
                    ],
                ),
                helpSection(
                    gettext('3. Assign resources, bring the VF online and bind it'),
                    gettext(
                        'Assign one interrupt and two queues to the actual secondary CNTLID, set it online, then bind its PCI function to the guest nvme driver if it is still unbound. The namespace must be shared or attached to that controller to provide a disk; follow the Namespace page when manual attachment is needed. Inspect the resulting devices before using them.',
                    ),
                    [
                        'nvme virt-mgmt /dev/nvme0 -c <VF-CNTLID> -r 1 -a 8 -n 1',
                        'nvme virt-mgmt /dev/nvme0 -c <VF-CNTLID> -r 0 -a 8 -n 2',
                        'nvme virt-mgmt /dev/nvme0 -c <VF-CNTLID> -r 0 -a 9 -n 0',
                        'echo <VF-BDF> > /sys/bus/pci/drivers/nvme/bind',
                        'nvme list',
                        'nvme list-subsys',
                    ],
                ),
                helpSection(
                    gettext('Cold starts and shared data'),
                    gettext(
                        'Check and reapply guest VF provisioning after cold starts, or automate it in the guest after validating the sequence. Shut the VM down before changing or disabling this feature in its configuration. PFs and VFs access this VM subsystem and its backing volumes; coordinate all access to a shared namespace. Virtual functions model protocol and PCIe behavior, so benchmark and validate the actual workload rather than assuming a performance gain.',
                    ),
                ),
            ],
        };
        const panel = (title, names, hint, help = []) => ({
            title,
            xtype: 'inputpanel',
            column1: names.slice(0, Math.ceil(names.length / 2)).map((name) => fields[name]),
            column2: names.slice(Math.ceil(names.length / 2)).map((name) => fields[name]),
            columnB: [
                ...(hint ? [{ xtype: 'displayfield', value: hint }] : []),
                ...(help.length
                    ? [
                          {
                              xtype: 'fieldset',
                              title: gettext('Usage and precautions'),
                              collapsible: true,
                              collapsed: true,
                              maxHeight: 300,
                              scrollable: 'vertical',
                              layout: 'anchor',
                              defaults: { anchor: '100%' },
                              items: [
                                  {
                                      xtype: 'displayfield',
                                      value: gettext(
                                          'The examples target Linux guests. Install nvme-cli and the other tools shown, then run commands as root. Replace example device paths and values in angle brackets with those reported by that guest. Command names and supported features depend on the guest kernel and nvme-cli version; check nvme help when needed.',
                                      ),
                                  },
                                  ...help,
                                  {
                                      xtype: 'displayfield',
                                      value:
                                          '<a href="https://www.qemu.org/docs/master/system/devices/nvme.html" target="_blank" rel="noopener noreferrer">' +
                                          gettext('QEMU NVMe documentation') +
                                          '</a>',
                                  },
                              ],
                          },
                      ]
                    : []),
            ],
            getValues: () => ({}),
        });
        return {
            title: 'NVMe',
            xtype: 'tabpanel',
            reference: 'nvmePanel',
            plain: true,
            tabBar: { layout: { overflowHandler: 'scroller' } },
            deferredRender: false,
            bind: { disabled: '{!isNVMe}' },
            listeners: { afterrender: updateState },
            items: [
                panel(
                    gettext('Controller'),
                    [
                        'nvme-controller',
                        'serial',
                        'model',
                        'firmware-version',
                        'max_ioqpairs',
                        'msix_qsize',
                        'mdts',
                        'use-intel-id',
                        'enable-cmb',
                        'cmb_size_mb',
                        'legacy-cmb',
                        'ocp',
                        'subsystem',
                        'subnqn',
                        'enable-multipath',
                        'nvme-paths',
                    ],
                    gettext(
                        'Leave fields empty to use the displayed defaults. Feature switches supply the parameters needed to enable the feature. Select an existing disk controller to add a namespace; configure controller settings on its owning disk. Multiple paths share one subsystem; private namespaces attach only to the primary path. Model and firmware overrides require QEMU support. NVMe device changes require a shutdown; live migration, RAM snapshots and hibernation are unavailable.',
                    ),
                    help.controller,
                ),
                panel(
                    gettext('Namespace'),
                    [
                        'nsid',
                        'uuid',
                        'nguid',
                        'eui64',
                        'logical_block_size',
                        'nvme-shared',
                        'detached',
                        'enable-copy',
                        'mssrl',
                        'mcl',
                        'msrc',
                    ],
                    gettext(
                        'Simple Copy is available by default; its switch customizes limits. Initially detached namespaces need guest attachment and cannot be boot devices. UUID defaults to a stable generated value; NGUID is unset and EUI-64 follows QEMU defaults. See Usage and precautions before changing identifiers or LBA size.',
                    ),
                    help.namespace,
                ),
                panel(
                    'ZNS',
                    [
                        'zoned',
                        'zoned-zone-size',
                        'zoned-zone-capacity',
                        'zoned-descr-ext-size',
                        'zoned-cross-read',
                        'zoned-max-active',
                        'zoned-max-open',
                        'zoned-zasl',
                    ],
                    gettext(
                        'ZNS requires sequential writes and a guest filesystem with zoned-device support, such as Btrfs in zoned mode. Standard GPT partitioning and ext4 formatting can fail with I/O errors; leave ZNS disabled for ordinary disks. This QEMU emulation resets zone write pointers and state on cold starts, so existing filesystem data may become inaccessible; use it for testing. A zone capacity of 0 uses the zone size; a limit of 0 is unlimited or follows the active limit. ZNS and FDP cannot be combined.',
                    ),
                    help.zns,
                ),
                panel(
                    gettext('Metadata and protection'),
                    ['enable-metadata', 'ms', 'mset', 'enable-protection', 'pi', 'pil', 'pif'],
                    gettext(
                        'Metadata and protection are disabled by default. When enabled, blank fields use 8 metadata bytes and protection type 1; 64-bit guards use 16 metadata bytes. Metadata consumes backing image capacity and prevents resizing. Changing LBA size or metadata reinterprets existing image data; it does not convert the image.',
                    ),
                    help.metadata,
                ),
                panel(
                    'FDP',
                    ['fdp', 'fdp-nrg', 'fdp-nruh', 'fdp-runs', 'fdp-ruhs'],
                    gettext(
                        'FDP is disabled by default. When enabled, the subsystem uses 1 reclaim group, 16 handles and 96 MiB reclaim units unless overridden. Namespace handle lists use semicolons and ranges. Namespaces sharing a reclaim unit handle must use the same LBA and metadata format. Reclaim unit size must be a multiple of every namespace LBA size.',
                    ),
                    help.fdp,
                ),
                panel(
                    gettext('SR-IOV (experimental)'),
                    [
                        'enable-sriov',
                        'sriov_max_vfs',
                        'sriov_vq_flexible',
                        'sriov_vi_flexible',
                        'sriov_max_vq_per_vf',
                        'sriov_max_vi_per_vf',
                    ],
                    gettext(
                        'SR-IOV is disabled by default. When enabled, an empty VF count uses 1 VF. It requires Q35 or aarch64 and a single controller path. Empty resources use two queues and one interrupt per VF, with per-VF limits derived from the pool. Leave resources for the primary controller. Provision VFs from the guest using nvme-cli.',
                    ),
                    help.sriov,
                ),
            ],
        };
    },
});
