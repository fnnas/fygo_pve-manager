Ext.define('PVE.qemu.SDCard', {
    singleton: true,

    loadValues: function (drive) {
        return {
            sdcardCid: drive.cid || '',
            sdcardSpecVersion: String(drive['sd-spec-version'] ?? '__default__'),
        };
    },

    applyValues: function (drive, values, confid) {
        if (!/^sdcard\d+$/.test(confid)) {
            delete drive['sd-spec-version'];
            if (!/^emmc\d+$/.test(confid)) {
                delete drive.cid;
            }
            return;
        }
        PVE.Utils.propertyStringSet(drive, values.sdcardCid, 'cid');
        PVE.Utils.propertyStringSet(
            drive,
            values.sdcardSpecVersion === '__default__' ? undefined : values.sdcardSpecVersion,
            'sd-spec-version',
        );
        ['discard', 'ssd', 'iothread', 'ro', 'serial', 'rerror', 'werror'].forEach(
            (name) => delete drive[name],
        );
    },

    createPanel: function () {
        return {
            title: gettext('SD card'),
            xtype: 'inputpanel',
            reference: 'sdcardPanel',
            bind: { disabled: '{!isSDCard}' },
            column1: [
                {
                    xtype: 'proxmoxKVComboBox',
                    name: 'sdcardSpecVersion',
                    fieldLabel: gettext('SD specification'),
                    value: '__default__',
                    comboItems: [
                        ['__default__', Proxmox.Utils.defaultText + ' (3.01)'],
                        ['2', '2.00'],
                        ['3', '3.01'],
                    ],
                    bind: { disabled: '{!isSDCard}' },
                },
                {
                    xtype: 'textfield',
                    name: 'sdcardCid',
                    fieldLabel: gettext('SD card CID'),
                    value: '',
                    emptyText: gettext('Default'),
                    validator: (value) =>
                        !value ||
                        (value.length === 32 && /^[0-9a-fA-F]{32}$/.test(value)) ||
                        gettext('Enter exactly 32 hexadecimal characters (16 bytes).'),
                    bind: { disabled: '{!isSDCard}' },
                },
            ],
            column2: [
                {
                    xtype: 'displayfield',
                    value: gettext(
                        'The entire image is used as the SD card. There are no eMMC boot or RPMB partitions. Images must be between 256 KiB and 2 TiB: powers of two up to 2 GiB, then multiples of 512 KiB. Formatting and filesystems are managed inside the guest.',
                    ),
                },
                {
                    xtype: 'displayfield',
                    value: gettext(
                        'Leave CID empty to use the QEMU default. Custom CID requires sd-card.cid support. With this SDHCI controller, Linux reports the last CID byte as 00. Shut down and start the VM to apply device, CID, specification or capacity changes; device hotplug is unavailable.',
                    ),
                },
                {
                    xtype: 'displayfield',
                    value: gettext(
                        'Displaying the complete CID requires a QEMU SDHCI response mode that retains the CRC byte, plus sdhci.debug_quirks2=0x10000 in the guest Linux kernel command line followed by a guest reboot. The current QEMU package does not provide that mode; enabling the parameter alone misreads CID/CSD. The parameter affects all SDHCI controllers in the guest and overrides other quirks2 settings.',
                    ),
                },
                {
                    xtype: 'displayfield',
                    value: gettext(
                        'SD boot requires compatible firmware and QEMU support for sdhci-pci.bootindex. Configure boot priority in Boot Order. SD specification defaults to 3.01; capacity determines standard or high-capacity addressing automatically. SeaBIOS or PVE 4M UEFI is recommended; legacy 2M UEFI may not support SD boot.',
                    ),
                },
            ],
            getValues: () => ({}),
        };
    },
});
