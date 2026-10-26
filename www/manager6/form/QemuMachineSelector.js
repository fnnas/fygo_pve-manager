Ext.define('PVE.form.QemuMachineSelector', {
    extend: 'PVE.form.FilteredKVComboBox',
    alias: 'widget.pveQemuMachineSelector',

    comboItems: [
        ['__default__', PVE.Utils.render_qemu_machine('')],
        ['q35', 'q35'],
        ['__custom__', gettext('Custom')],
    ],

    allowedValuesPerCategory: PVE.qemu.Architecture.allowedMachines,

    setDefaultDisplay: (arch) => PVE.Utils.render_qemu_machine('', arch),
});
