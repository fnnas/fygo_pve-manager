Ext.define('PVE.qemu.MultiHDPanel', {
    extend: 'PVE.panel.MultiDiskPanel',
    alias: 'widget.pveMultiHDPanel',

    onlineHelp: 'qm_hard_disk',

    importDisk: true,

    controller: {
        xclass: 'Ext.app.ViewController',

        init: function (view) {
            const me = this;
            view.on(
                'afterrender',
                () => {
                    const bindings = [
                        'architecture',
                        'ostype',
                        'scsihw',
                        'isoConfig',
                        'driverIsoConfig',
                        'driverIso',
                    ].map((name) =>
                        me.getViewModel().bind(`{current.${name}}`, () => {
                            if (view.nodename && !view.destroyed && !view.destroying) {
                                me.updateVMConfig();
                            }
                        }),
                    );
                    view.on('destroy', () => Ext.destroy(bindings), me, { single: true });
                },
                me,
                { single: true },
            );
        },

        // Unused volumes do not provide hardware slots; reserve the default CD drive.
        maxCount:
            Object.entries(PVE.Utils.diskControllerMaxIDs)
                .filter(([bus]) => bus !== 'unused')
                .reduce((previous, [, count]) => previous + count, 0) - 1,

        getNextFreeDisk: function (vmconfig) {
            let nodename = this.getView().nodename;
            let clist = PVE.Utils.sortByPreviousUsage(vmconfig, nodename);
            const hasDisk = Object.entries(vmconfig).some(
                ([id, value]) => id.match(PVE.Utils.bus_match) && !value.includes('media=cdrom'),
            );
            if (
                !hasDisk &&
                vmconfig.ostype?.startsWith('w') &&
                this.getViewModel().get('current.driverIso') === 'some'
            ) {
                clist = ['scsi', ...clist.filter((bus) => bus !== 'scsi')];
            }
            const arch = PVE.qemu.Architecture.getGuestArchitecture(vmconfig.arch, nodename);
            const allowed = PVE.qemu.Architecture.allowedBusses[arch];
            if (allowed) {
                clist = clist.filter((bus) => allowed.includes(bus));
            }
            return PVE.Utils.nextFreeDisk(clist, vmconfig);
        },

        addPanel: function (itemId, vmconfig, nextFreeDisk, importDisk) {
            let me = this;
            const panel = me.getView().add({
                vmconfig,
                border: false,
                showAdvanced: Ext.state.Manager.getProvider().get('proxmox-advanced-cb'),
                xtype: 'pveQemuHDInputPanel',
                bind: {
                    nodename: '{nodename}',
                },
                padding: '0 0 0 5',
                itemId,
                isCreate: true,
                insideWizard: true,
                importDisk,
            });
            panel.bussel.down('field[name=controller]').setValue(nextFreeDisk.controller);
            panel.bussel.down('field[name=deviceid]').setValue(nextFreeDisk.id);
            return panel;
        },

        getBaseVMConfig: function () {
            let me = this;
            let vm = me.getViewModel();

            let res = {
                arch: vm.get('current.architecture'),
                scsihw: vm.get('current.scsihw'),
                ostype: vm.get('current.ostype'),
            };

            const [controller, id] =
                PVE.qemu.Architecture.defaultCDDrive[res.arch] ??
                PVE.qemu.Architecture.defaultCDDrive.x86_64;
            let isoConfig = vm.get('current.isoConfig') ?? `${controller}${id}`;
            res[isoConfig] = 'media=cdrom';

            if (vm.get('current.driverIso') === 'some') {
                const [driverController, driverId] =
                    PVE.qemu.Architecture.defaultDriverCDDrive[res.arch] ??
                    PVE.qemu.Architecture.defaultDriverCDDrive.x86_64;
                let driverIsoConfig =
                    vm.get('current.driverIsoConfig') ?? `${driverController}${driverId}`;
                res[driverIsoConfig] = 'media=cdrom';
            }

            return res;
        },

        diskSorter: {
            sorterFn: function (rec1, rec2) {
                let [, name1, id1] = PVE.Utils.bus_match.exec(rec1.data.name);
                let [, name2, id2] = PVE.Utils.bus_match.exec(rec2.data.name);

                if (name1 === name2) {
                    return parseInt(id1, 10) - parseInt(id2, 10);
                }

                return name1 < name2 ? -1 : 1;
            },
        },

        deleteDisabled: () => false,
    },
});
