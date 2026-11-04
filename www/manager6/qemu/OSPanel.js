/// Used only for the wizard to combine the cd input panel and the ostype panel

Ext.define('PVE.qemu.OSPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'pveQemuOSPanel',

    layout: 'hbox',
    defaults: {
        flex: 1,
        padding: '0 10',
    },

    setArch: function (arch) {
        let me = this;
        let defaultCD = PVE.qemu.Architecture.defaultCDDrive;
        let [controller, id] = defaultCD[arch] ?? defaultCD.x86_64;
        let vm = me.getController().getViewModel();
        let conf = `${controller}${id}`;
        vm.set('current.isoConfig', conf);
        me.lookup('cdSelector').confid = conf;
        let driverCD = PVE.qemu.Architecture.defaultDriverCDDrive;
        let [driverController, driverId] = driverCD[arch] ?? driverCD.x86_64;
        vm.set('current.driverIsoConfig', `${driverController}${driverId}`);
    },

    controller: {
        xclass: 'Ext.app.ViewController',
        control: {
            'combobox[name=osbase]': {
                change: 'onOSBaseChange',
            },
            'combobox[name=ostype]': {
                afterrender: 'onOSTypeChange',
                change: 'onOSTypeChange',
            },
            'checkbox[reference=enableSecondCD]': {
                change: 'onSecondCDChange',
            },
        },
        onOSBaseChange: function (field, value) {
            let me = this;
            let isWindows = value === 'Microsoft Windows';
            let enableSecondCD = me.lookup('enableSecondCD');
            enableSecondCD.setVisible(isWindows);
            if (!isWindows) {
                enableSecondCD.setValue(false);
            }
        },
        onOSTypeChange: function (field) {
            var me = this,
                ostype = field.getValue();

            let vm = me.getViewModel();
            let arch = vm.get('current.architecture');
            var targetValues = PVE.qemu.OSDefaults.getDefaults(ostype, arch);

            let useVirtIO = ostype?.startsWith('w') && vm.get('current.driverIso') === 'some';
            me.setWidget('pveBusSelector', useVirtIO ? 'scsi' : targetValues.busType);
            me.setWidget('pveNetworkCardSelector', useVirtIO ? 'virtio' : targetValues.networkCard);
            me.setWidget('CPUModelSelector', targetValues.cputype);
            var scsihw = targetValues.scsihw || '__default__';
            this.getViewModel().set('current.scsihw', scsihw);
            this.getViewModel().set('current.ostype', ostype);
        },
        setWidget: function (widget, newValue) {
            // changing a widget is safe only if ComponentQuery.query returns us
            // a single value array
            var widgets = Ext.ComponentQuery.query('pveQemuCreateWizard ' + widget);
            if (widgets.length === 1) {
                widgets[0].setValue(newValue);
            } else {
                // ignore multiple disks, we only want to set the type if there is a single disk
            }
        },
        onSecondCDChange: function (widget, value, lastValue) {
            let me = this;
            let vm = me.getViewModel();
            let updateVMConfig = function () {
                let widgets = Ext.ComponentQuery.query('pveMultiHDPanel');
                if (widgets.length === 1) {
                    widgets[0].getController().updateVMConfig();
                }
            };
            if (value) {
                // only for windows
                vm.set('current.driverIso', 'some');
                vm.notify();
                updateVMConfig();
                me.setWidget('pveBusSelector', 'scsi');
                me.setWidget('pveNetworkCardSelector', 'virtio');
            } else {
                vm.set('current.driverIso', '');
                vm.notify();
                updateVMConfig();
                me.setWidget('pveBusSelector', 'scsi');
                let ostype = me.getView().down('[name=ostype]').getValue();
                let arch = vm.get('current.architecture');
                let targetValues = PVE.qemu.OSDefaults.getDefaults(ostype, arch);
                me.setWidget('pveBusSelector', targetValues.busType);
                me.setWidget('pveNetworkCardSelector', targetValues.networkCard);
            }
        },
    },

    items: [
        {
            xtype: 'pveQemuCDInputPanel',
            reference: 'cdSelector',
            bind: {
                nodename: '{nodename}',
            },
            confid: 'sata2',
            insideWizard: true,
        },
        {
            xtype: 'container',
            layout: {
                type: 'vbox',
                align: 'stretch',
            },
            defaults: {
                flex: 1,
            },
            items: [
                {
                    xtype: 'displayfield',
                    value: gettext('Guest OS') + ':',
                },
                {
                    xtype: 'pveQemuOSTypePanel',
                    insideWizard: true,
                    bind: {
                        arch: '{current.architecture}',
                    },
                },
                {
                    xtype: 'inputpanel',
                    onGetValues: function (values) {
                        if (values.driverIso) {
                            let drive = {
                                media: 'cdrom',
                                file: values.driverIso,
                            };
                            let confid =
                                this.lookupViewModel().get('current.driverIsoConfig') ?? 'sata0';
                            values[confid] = PVE.Parser.printQemuDrive(drive);
                        }
                        delete values.driverIso;
                        return values;
                    },
                    items: [
                        {
                            xtype: 'proxmoxcheckbox',
                            reference: 'enableSecondCD',
                            isFormField: false,
                            hidden: true,
                            checked: false,
                            boxLabel: gettext('Add additional drive for VirtIO drivers'),
                            listeners: {
                                change: function (cb, value) {
                                    let me = this.up('pveQemuOSPanel');
                                    me.lookup('isoSelector').setDisabled(!value);
                                    me.lookup('isoSelector').setHidden(!value);
                                },
                            },
                        },
                        {
                            xtype: 'pveIsoSelector',
                            reference: 'isoSelector',
                            name: 'driverIso',
                            insideWizard: true,
                            hidden: true,
                            disabled: true,
                            bind: {
                                nodename: '{nodename}',
                            },
                        },
                    ],
                },
            ],
        },
    ],
});
