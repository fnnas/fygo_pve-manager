Ext.define('PVE.form.QemuCustomMachineSelector', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.pveQemuCustomMachineSelector',

    fieldLabel: gettext('Custom machine'),
    valueField: 'id',
    displayField: 'version',
    queryMode: 'local',
    editable: false,
    forceSelection: true,
    allowBlank: false,
    store: {
        fields: ['id', 'type', 'version'],
        data: [],
    },

    setNodename: function (nodename) {
        if (this.nodename !== nodename) {
            this.nodename = nodename;
            this.loadMachines();
        }
    },

    setArch: function (arch) {
        if (this.arch !== arch) {
            this.arch = arch;
            this.loadMachines();
        }
    },

    validator: function () {
        let me = this;
        if (me.loadError) {
            return me.loadError;
        }
        if (!me.machinesLoaded) {
            return gettext('Loading...');
        }
        return (
            !!me.getStore().findRecord('id', me.getValue(), 0, false, true, true) ||
            gettext('No custom machine is available on this node.')
        );
    },

    loadMachines: function () {
        let me = this;
        if (!me.store?.isStore || me.destroyed || me.destroying) {
            return;
        }
        let request = (me.machineRequest = (me.machineRequest ?? 0) + 1);
        me.machinesLoaded = false;
        me.loadError = undefined;
        me.validate();
        if (!me.nodename || me.arch !== 'x86_64') {
            return;
        }
        Proxmox.Utils.API2Request({
            url: `/nodes/${encodeURIComponent(me.nodename)}/capabilities/qemu/machines`,
            method: 'GET',
            params: { arch: me.arch },
            success: function (response) {
                if (me.destroyed || me.destroying || request !== me.machineRequest) {
                    return;
                }
                let machines = response.result.data.filter(
                    (entry) =>
                        entry.type === 'custom' && PVE.qemu.Architecture.customMachines[entry.id],
                );
                let value = me.getValue();
                me.machinesLoaded = true;
                me.getStore().setData(machines);
                me.setValue(value || machines[0]?.id);
                me.validate();
            },
            failure: function () {
                if (me.destroyed || me.destroying || request !== me.machineRequest) {
                    return;
                }
                me.loadError = gettext('Could not load custom machines.');
                me.validate();
            },
        });
    },

    initComponent: function () {
        this.callParent();
        this.loadMachines();
    },
});
