Ext.define('PVE.form.BusTypeSelector', {
    extend: 'PVE.form.FilteredKVComboBox',
    alias: 'widget.pveBusSelector',

    withVirtIO: true,
    withEMMC: true,
    withUnused: false,

    allowedValuesPerCategory: PVE.qemu.Architecture.allowedBusses,

    initComponent: function () {
        var me = this;

        me.comboItems = [
            ['ide', 'IDE'],
            ['sata', 'SATA'],
        ];

        if (me.withVirtIO) {
            me.comboItems.push(['virtio', 'VirtIO Block']);
        }

        me.comboItems.push(['scsi', 'SCSI']);

        if (me.withEMMC) {
            me.comboItems.push(['emmc', 'eMMC']);
        }

        if (me.withUnused) {
            me.comboItems.push(['unused', 'Unused']);
        }

        me.callParent();
    },
});
