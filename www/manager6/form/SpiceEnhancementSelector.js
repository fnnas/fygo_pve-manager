Ext.define('PVE.form.SpiceEnhancementSelector', {
    extend: 'Proxmox.panel.InputPanel',
    alias: 'widget.pveSpiceEnhancementSelector',

    viewModel: {},

    items: [
        {
            xtype: 'proxmoxcheckbox',
            itemId: 'foldersharing',
            name: 'foldersharing',
            reference: 'foldersharing',
            fieldLabel: gettext('Folder Sharing'),
            uncheckedValue: 0,
        },
        {
            xtype: 'proxmoxKVComboBox',
            itemId: 'videostreaming',
            name: 'videostreaming',
            value: 'off',
            fieldLabel: gettext('Video Streaming'),
            comboItems: [
                ['off', 'off'],
                ['all', 'all'],
                ['filter', 'filter'],
            ],
        },
        {
            xtype: 'displayfield',
            itemId: 'spicehint',
            userCls: 'pmx-hint',
            value: gettext(
                'These features require a display that supports SPICE. Check the display settings in the VM hardware.',
            ),
            hidden: true,
        },
        {
            xtype: 'displayfield',
            itemId: 'spicefolderhint',
            userCls: 'pmx-hint',
            value: gettext('Make sure the SPICE WebDav daemon is installed in the VM.'),
            bind: {
                hidden: '{!foldersharing.checked}',
            },
        },
    ],

    onGetValues: function (values) {
        var ret = {};

        if (values.videostreaming !== 'off') {
            ret.videostreaming = values.videostreaming;
        }
        if (values.foldersharing) {
            ret.foldersharing = 1;
        }
        if (Ext.Object.isEmpty(ret)) {
            return { delete: 'spice_enhancements' };
        }
        var enhancements = PVE.Parser.printPropertyString(ret);
        return { spice_enhancements: enhancements };
    },

    setValues: function (values) {
        let arch = PVE.qemu.Architecture.getGuestArchitecture(values.arch, this.nodename);
        this.down('#spicehint').setVisible(!PVE.qemu.Architecture.displayUsesSpice(values, arch));
        if (values.spice_enhancements) {
            let enhancements = PVE.Parser.parsePropertyString(values.spice_enhancements);
            enhancements.foldersharing = PVE.Parser.parseBoolean(enhancements.foldersharing, 0);
            this.callParent([enhancements]);
        }
    },
});
