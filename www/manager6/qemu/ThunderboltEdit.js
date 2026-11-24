Ext.define('PVE.qemu.Thunderbolt', {
    singleton: true,

    models: [
        ['usb4-generic', gettext('Generic USB4')],
        ['intel-adl', 'Intel Alder Lake USB4'],
        ['asm4242', 'ASMedia ASM4242'],
        ['amd', 'AMD USB4'],
        ['tb3-alpine-ridge', 'Intel Alpine Ridge'],
        ['tb3-titan-ridge', 'Intel Titan Ridge'],
        ['tb3-ice-lake', 'Intel Ice Lake'],
    ],

    modelDescriptions: {
        'usb4-generic': gettext(
            'Recommended default. Two virtual ports.\nConnects docks and multiple NVMe data disks, with dock cascading support.',
        ),
        'intel-adl': gettext(
            'Two virtual ports.\nEmulates the Alder Lake-P integrated USB4 router and selected register behavior for guest driver detection tests.',
        ),
        asm4242: gettext(
            'Two virtual ports.\nPresents the ASM4242 PCI device ID to test guest detection of the ASMedia controller.',
        ),
        amd: gettext(
            'Two virtual ports.\nEmulates an AMD USB4 router identity and uses the generic QEMU USB4 PCI device ID.',
        ),
        'tb3-alpine-ridge': gettext(
            'Single-port Thunderbolt 3 controller emulating the low-power JHL6240.\nConnects one dock for testing early Thunderbolt 3 device detection.',
        ),
        'tb3-titan-ridge': gettext(
            'Dual-port Thunderbolt 3 controller emulating the JHL7540.\nConnects two docks for testing Titan Ridge firmware connection management.',
        ),
        'tb3-ice-lake': gettext(
            'Dual-port Thunderbolt 3 controller emulating the integrated Ice Lake controller.\nConnects two docks for testing integrated controller detection.',
        ),
    },

    supportsDownstream: function (config, id) {
        const seen = new Set();
        while (/^tbdock\d+$/.test(id) && config[id] && !seen.has(id)) {
            seen.add(id);
            const dock = PVE.Parser.parsePropertyString(config[id]);
            id = dock.parent || dock.host;
        }
        const model = PVE.Parser.parsePropertyString(config[id], 'model').model;
        return model && !model.startsWith('tb3-');
    },

    availablePorts: function (config, confid, docksOnly = false) {
        const occupied = new Set();
        const docks = {};
        Object.entries(config).forEach(([key, value]) => {
            if (/^tbdock\d+$/.test(key) && value) {
                const dock = PVE.Parser.parsePropertyString(value);
                docks[key] = dock;
                if (key !== confid) {
                    occupied.add((dock.parent || dock.host) + ':' + dock.port);
                }
            } else if (/^nvme\d+$/.test(key) && key !== confid && value) {
                const drive = PVE.Parser.parseQemuDrive(key, value);
                if (drive?.['nvme-dock-port']) {
                    occupied.add(drive['nvme-dock'] + ':' + drive['nvme-dock-port']);
                }
            }
        });
        const isDescendant = (key) => {
            const visited = new Set();
            for (let parent = key; parent && !visited.has(parent); parent = docks[parent]?.parent) {
                if (parent === confid) {
                    return true;
                }
                visited.add(parent);
            }
            return false;
        };
        const usedAsParent = new Set(
            Object.entries(docks)
                .filter(([key]) => key !== confid)
                .map(([, dock]) => dock.parent),
        );
        const canChain = (key) =>
            !docks[key].parent && !usedAsParent.has(key) && !usedAsParent.has(confid);
        return Object.keys(config)
            .filter(
                (key) =>
                    (docks[key] && !isDescendant(key) && (docksOnly || canChain(key))) ||
                    (!docksOnly && /^thunderbolt[01]$/.test(key) && config[key]),
            )
            .sort()
            .flatMap((key) => {
                const isDock = !!docks[key];
                const model = isDock
                    ? undefined
                    : PVE.Parser.parsePropertyString(config[key], 'model').model;
                const ports = isDock
                    ? PVE.qemu.Thunderbolt.supportsDownstream(config, key)
                        ? [1, 2, 3]
                        : []
                    : model === 'tb3-alpine-ridge'
                      ? [1]
                      : [1, 2];
                return ports
                    .map((port) => key + ':' + port)
                    .filter((key) => !occupied.has(key))
                    .map((id) => [id, key + ' · ' + gettext('Port') + ' ' + id.slice(-1)]);
            });
    },
});

Ext.define('PVE.qemu.ThunderboltEdit', {
    extend: 'Proxmox.window.Edit',

    dock: false,

    initComponent: function () {
        const me = this;
        const isDock = me.dock || /^tbdock/.test(me.confid ?? '');
        const subject = isDock ? gettext('Thunderbolt Dock') : gettext('Thunderbolt Controller');
        const prefix = isDock ? 'tbdock' : 'thunderbolt';
        me.isCreate = !me.confid;
        me.subject = subject;
        const panel = Ext.create('Proxmox.panel.InputPanel', {
            onGetValues: function (values) {
                if (!me.confid) {
                    return {};
                }
                if (!isDock) {
                    return { [me.confid]: values.model };
                }
                const [host, port] = values.connection.split(':');
                const target = /^tbdock/.test(host) ? 'parent' : 'host';
                return { [me.confid]: PVE.Parser.printPropertyString({ [target]: host, port }) };
            },
            items: [
                {
                    xtype: 'proxmoxKVComboBox',
                    name: isDock ? 'connection' : 'model',
                    fieldLabel: isDock ? gettext('Upstream port') : gettext('Controller model'),
                    comboItems: isDock ? [] : PVE.qemu.Thunderbolt.models,
                    allowBlank: false,
                    value: isDock ? null : 'usb4-generic',
                },
                ...(isDock
                    ? []
                    : [
                          {
                              xtype: 'displayfield',
                              itemId: 'modelDescription',
                              userCls: 'pmx-hint',
                              htmlEncode: true,
                              fieldStyle:
                                  'white-space: pre-line; overflow-wrap: anywhere; line-height: 1.5;',
                          },
                      ]),
            ],
        });
        me.items = [panel];
        me.callParent();
        const field = panel.down('proxmoxKVComboBox');
        if (!isDock) {
            const description = panel.down('#modelDescription');
            const updateDescription = (model) =>
                description.setValue(PVE.qemu.Thunderbolt.modelDescriptions[model] ?? '');
            me.mon(field, 'change', (_field, model) => updateDescription(model));
            updateDescription(field.getValue());
        }
        me.load({
            success: ({ result }) => {
                const config = result.data;
                if (me.isCreate) {
                    const limit = isDock ? 4 : 2;
                    for (let i = 0; i < limit; i++) {
                        if (!config[prefix + i]) {
                            me.confid = prefix + i;
                            break;
                        }
                    }
                    if (!me.confid) {
                        me.close();
                        Ext.Msg.alert(gettext('Error'), gettext('No free device slot'));
                        return;
                    }
                }
                if (isDock) {
                    const choices = PVE.qemu.Thunderbolt.availablePorts(config, me.confid);
                    field.setComboItems(choices);
                    const value = PVE.Parser.parsePropertyString(config[me.confid]);
                    const upstream = value.parent || value.host;
                    field.setValue(upstream ? upstream + ':' + value.port : choices[0]?.[0]);
                } else {
                    const value = PVE.Parser.parsePropertyString(config[me.confid], 'model');
                    field.setValue(value.model ?? 'usb4-generic');
                }
            },
        });
    },
});
