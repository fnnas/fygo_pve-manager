Ext.define('PVE.qemu.MachineInputPanel', {
    extend: 'Proxmox.panel.InputPanel',
    xtype: 'pveMachineInputPanel',
    onlineHelp: 'qm_machine_type',

    viewModel: {
        data: {
            type: '__default__',
        },
        formulas: {
            custom: (get) => get('type') === '__custom__',
            q35: (get) => get('type') === 'q35' || get('type') === '__custom__',
        },
    },

    controller: {
        xclass: 'Ext.app.ViewController',
        control: {
            'combobox[name=machine]': {
                change: 'onMachineChange',
            },
        },
        onMachineChange: function (field, value, oldValue) {
            let me = this;
            if (value === '__custom__') {
                return;
            }
            let version = me.lookup('version');
            let store = version.getStore();

            let oldRec = store.findRecord('id', version.getValue(), 0, false, false, true);

            me.setVersionFilter(value);

            if (!me.getView().isWindows) {
                version.setValue('latest');
            } else {
                let custom =
                    oldValue === '__custom__'
                        ? PVE.qemu.Architecture.getCustomMachine(
                              me.lookup('customMachine').getValue() ||
                                  me.getView().machineConfig?.type,
                          )
                        : undefined;
                let oldVers = oldRec?.data.version ?? custom?.version;
                if (!oldVers) {
                    return;
                }
                const selectVersion = () => {
                    if (me.destroyed || me.getView().destroyed || field.getValue() !== value) {
                        return;
                    }
                    // The store is already filtered by the selected base type.
                    let rec = store.findRecord('version', oldVers, 0, false, false, true);
                    if (!rec && custom) {
                        rec = store.getRange().find((entry) => entry.data.id !== 'latest');
                    }
                    if (rec) {
                        version.select(rec);
                    } else if (custom) {
                        version.setValue(null);
                    }
                };
                selectVersion();
                if (store.isLoading() || store.hasPendingLoad()) {
                    me.mon(store, 'load', selectVersion, undefined, { single: true });
                }
            }
        },

        setVersionFilter: function (machineType) {
            let me = this;
            let vm = me.getViewModel();
            let arch = vm.get('arch');
            let defaultMachine = PVE.qemu.Architecture.defaultMachines[arch];
            if (defaultMachine === 'pc') {
                defaultMachine = 'i440fx'; // the default in the backend is 'pc' which means 'i440fx' for the qemu machinetype
            }
            let type = machineType === 'q35' ? 'q35' : defaultMachine;
            let store = me.lookup('version').getStore();
            store.clearFilter();
            store.addFilter((val) => val.data.id === 'latest' || val.data.type === type);
            store.isWindows = me.getView().isWindows;
        },

        setArch: function (arch) {
            let me = this;
            let store = me.lookup('version').getStore();
            let nodename = me.getViewModel().get('nodename');
            store
                .getProxy()
                .setUrl(
                    `/api2/json/nodes/${encodeURIComponent(nodename)}/capabilities/qemu/machines`,
                );
            store.getProxy().setExtraParams({
                arch,
            });
            store.reload();
        },
    },

    onGetValues: function (values) {
        // arch is a hidden field used only for the machine-default lookup; do not submit it.
        let arch = values.arch;
        delete values.arch;
        let extra = { ...this.machineConfig };
        delete extra.type;
        delete extra.viommu;
        if (values.viommu !== this.machineConfig?.viommu) {
            delete extra['aw-bits'];
        }
        if (values.delete === 'machine' && Object.keys(extra).length) {
            delete values.delete;
            values.machine = PVE.qemu.Architecture.defaultMachines[arch];
        }
        Object.assign(values, extra);
        if (values.delete === 'machine' && values.viommu) {
            delete values.delete;
            values.machine = PVE.qemu.Architecture.defaultMachines[arch];
        }
        if (values.machine === '__custom__') {
            values.machine = values.custom_machine;
            if (!PVE.qemu.Architecture.getCustomMachine(values.machine)) {
                throw gettext('No custom machine is available on this node.');
            }
            delete values.delete;
        } else if (values.version && values.version !== 'latest') {
            values.machine = values.version;
            delete values.delete;
        }
        delete values.custom_machine;
        delete values.version;
        if (values.delete === 'machine' && !values.viommu) {
            return values;
        }
        let ret = {};
        ret.machine = PVE.Parser.printPropertyString(values, 'machine');
        return ret;
    },

    setValues: function (values) {
        let me = this;

        let machineConf = PVE.Parser.parsePropertyString(values.machine, 'type');
        me.machineConfig = machineConf;
        values.machine = machineConf.type;
        me.getViewModel().set('nodename', values.nodename);

        let custom = PVE.qemu.Architecture.getCustomMachine(values.machine);
        if (custom) {
            values.custom_machine = values.machine.replace(/\+pve0$/, '');
            values.machine = '__custom__';
        }

        let defaultMachine = PVE.qemu.Architecture.defaultMachines[values.arch];
        me.isWindows = values.isWindows;
        if (values.machine === defaultMachine) {
            values.machine = '__default__';
        }

        if (me.isWindows) {
            if (values.machine === '__default__' || values.machine === 'q35') {
                let effective = PVE.Utils.qemu_implicit_machine_version(
                    values.machine,
                    values.creationQemu,
                    values.arch,
                );
                values.effectiveVersion = effective + ' ' + gettext('(implicit)');
                me.lookup('effectiveVersion').setVisible(true);
                me.lookup('implicitVersionHint').setVisible(true);
                me.setAdvancedVisible(true);
            }
        }

        values.viommu = machineConf.viommu || '__default__';

        if (!custom && values.machine !== '__default__' && values.machine !== 'q35') {
            values.version = values.machine;
            values.machine = values.version.match(/q35/) ? 'q35' : '__default__';

            // avoid hiding a pinned version
            me.setAdvancedVisible(true);
        }

        this.callParent(arguments);
        this.getController().setVersionFilter(values.machine);
        this.getController().setArch(values.arch);
    },

    items: [
        {
            xtype: 'pveQemuMachineSelector',
            name: 'machine',
            reference: 'machine',
            fieldLabel: gettext('Machine'),
            value: '__default__',
            bind: {
                value: '{type}',
                category: '{arch}',
            },
        },
        {
            xtype: 'pveQemuCustomMachineSelector',
            name: 'custom_machine',
            reference: 'customMachine',
            hidden: true,
            disabled: true,
            bind: {
                nodename: '{nodename}',
                arch: '{arch}',
                hidden: '{!custom}',
                disabled: '{!custom}',
            },
        },
        {
            xtype: 'displayfield',
            userCls: 'pmx-hint',
            value: PVE.qemu.Architecture.customMachineHint,
            hidden: true,
            bind: { hidden: '{!custom}' },
        },
        {
            xtype: 'hidden',
            name: 'arch',
            reference: 'arch',
            bind: '{arch}',
        },
    ],

    advancedItems: [
        {
            xtype: 'combobox',
            name: 'version',
            reference: 'version',
            fieldLabel: gettext('Version'),
            emptyText: gettext('Latest'),
            value: 'latest',
            editable: false,
            bind: {
                hidden: '{custom}',
                disabled: '{custom}',
            },
            valueField: 'id',
            displayField: 'version',
            queryParam: false,
            store: {
                autoLoad: false,
                fields: ['id', 'type', 'version'],
                proxy: {
                    type: 'proxmox',
                    url: '/api2/json/nodes/localhost/capabilities/qemu/machines',
                },
                listeners: {
                    load: function (records) {
                        if (!this.isWindows) {
                            this.insert(0, {
                                id: 'latest',
                                type: 'any',
                                version: gettext('Latest'),
                            });
                        }
                    },
                },
            },
        },
        {
            xtype: 'displayfield',
            name: 'effectiveVersion',
            fieldLabel: gettext('Current Version'),
            reference: 'effectiveVersion',
            submitValue: false,
            hidden: true,
        },
        {
            xtype: 'displayfield',
            reference: 'implicitVersionHint',
            userCls: 'pmx-hint',
            hidden: true,
            value: gettext(
                'No fixed version is set; the version is chosen automatically based on when the VM' +
                    ' was created. Pinning a specific version is recommended.',
            ),
        },
        {
            xtype: 'displayfield',
            fieldLabel: gettext('Note'),
            value: gettext(
                'Machine version change may affect hardware layout and settings in the guest OS.',
            ),
        },
        {
            xtype: 'proxmoxKVComboBox',
            name: 'viommu',
            fieldLabel: gettext('vIOMMU'),
            reference: 'viommu-q35',
            deleteEmpty: false,
            value: '__default__',
            comboItems: [
                ['__default__', Proxmox.Utils.defaultText + ' (None)'],
                ['intel', gettext('Intel (AMD Compatible)')],
                ['virtio', 'VirtIO'],
            ],
            bind: {
                hidden: '{!q35}',
                disabled: '{!q35}',
            },
        },
        {
            xtype: 'proxmoxKVComboBox',
            name: 'viommu',
            fieldLabel: gettext('vIOMMU'),
            reference: 'viommu-i440fx',
            deleteEmpty: false,
            value: '__default__',
            comboItems: [
                ['__default__', Proxmox.Utils.defaultText + ' (None)'],
                ['virtio', 'VirtIO'],
            ],
            bind: {
                hidden: '{q35}',
                disabled: '{q35}',
            },
        },
    ],
});

Ext.define('PVE.qemu.MachineEdit', {
    extend: 'Proxmox.window.Edit',

    subject: gettext('Machine'),

    items: {
        xtype: 'pveMachineInputPanel',
    },

    width: 400,

    initComponent: function () {
        let me = this;

        me.nodename = me.pveSelNode?.data.node;

        if (!me.nodename) {
            throw 'no nodename given';
        }

        me.callParent();

        me.load({
            success: function (response) {
                let conf = response.result.data;
                let values = {
                    machine: conf.machine || '__default__',
                    nodename: me.nodename,
                };
                values.isWindows = PVE.Utils.is_windows(conf.ostype);
                values.arch = PVE.qemu.Architecture.getGuestArchitecture(conf.arch, me.nodename);
                if (conf.meta) {
                    let meta = PVE.Parser.parsePropertyString(conf.meta);
                    values.creationQemu = meta['creation-qemu'];
                }

                me.setValues(values);
            },
        });
    },
});
