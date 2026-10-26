Ext.define('PVE.form.BusTypeSelector', {
    extend: 'PVE.form.FilteredKVComboBox',
    alias: 'widget.pveBusSelector',

    withVirtIO: true,
    withNVMe: true,
    withUSB: true,
    withEMMC: true,
    withUnused: false,

    allowedValuesPerCategory: PVE.qemu.Architecture.allowedBusses,

    initComponent: function () {
        var me = this;

        me.comboItems = [
            ['ide', 'IDE'],
            ['sata', 'SATA'],
        ];

        if (me.withNVMe) {
            me.comboItems.push(['nvme', 'NVMe']);
        }

        if (me.withVirtIO) {
            me.comboItems.push(['virtio', 'VirtIO Block']);
        }

        me.comboItems.push(['scsi', 'SCSI']);

        if (me.withUSB) {
            me.comboItems.push(['usbdisk', 'USB']);
        }

        if (me.withEMMC) {
            me.comboItems.push(['emmc', 'eMMC']);
        }

        if (me.withUnused) {
            me.comboItems.push(['unused', 'Unused']);
        }

        me.callParent();
    },
});
