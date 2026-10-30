(function () {
    const translations = {
        zh_CN: {
            'SD card': 'SD 卡',
            'SD card CID': 'SD 卡标识 (CID)',
            'SD specification': 'SD 规范版本',
            'Enter exactly 32 hexadecimal characters (16 bytes).':
                '请输入 32 个十六进制字符（16 字节）。',
            'The entire image is used as the SD card. There are no eMMC boot or RPMB partitions. Images must be between 256 KiB and 2 TiB: powers of two up to 2 GiB, then multiples of 512 KiB. Formatting and filesystems are managed inside the guest.':
                '整个磁盘映像作为 SD 卡使用，不包含 eMMC 启动分区和 RPMB。容量须为 256 KiB 至 2 TiB：不超过 2 GiB 时为 2 的整数次幂，超过 2 GiB 时为 512 KiB 的整数倍。请在虚拟机内分区并格式化。',
            'Leave CID empty to use the QEMU default. Custom CID requires sd-card.cid support. With this SDHCI controller, Linux reports the last CID byte as 00. Shut down and start the VM to apply device, CID, specification or capacity changes; device hotplug is unavailable.':
                'CID 留空时使用 QEMU 默认值，自定义 CID 需要支持 sd-card.cid 的 QEMU。使用当前 SDHCI 控制器时，Linux 读出的 CID 最后两位为 00。修改设备、CID、规范版本或容量后，请关闭虚拟机再启动；不支持设备热插拔。',
            'Displaying the complete CID requires a QEMU SDHCI response mode that retains the CRC byte, plus sdhci.debug_quirks2=0x10000 in the guest Linux kernel command line followed by a guest reboot. The current QEMU package does not provide that mode; enabling the parameter alone misreads CID/CSD. The parameter affects all SDHCI controllers in the guest and overrides other quirks2 settings.':
                '完整显示 CID 需要先使用保留 CRC 字节的 QEMU SDHCI 响应模式，再在客户机 Linux 内核启动参数中加入 sdhci.debug_quirks2=0x10000，并重启客户机。当前配套 QEMU 包尚未提供该模式，单独启用参数会导致 CID/CSD 读取错误。该参数影响客户机内所有 SDHCI 控制器，并覆盖其他 quirks2 设置。',
            'SD boot requires compatible firmware and QEMU support for sdhci-pci.bootindex. Configure boot priority in Boot Order. SD specification defaults to 3.01; capacity determines standard or high-capacity addressing automatically. SeaBIOS or PVE 4M UEFI is recommended; legacy 2M UEFI may not support SD boot.':
                '从 SD 卡启动需要兼容的固件，以及支持 sdhci-pci.bootindex 的 QEMU。请在“启动顺序”中设置优先级。SD 规范默认采用 3.01，标准容量或高容量寻址由磁盘大小自动决定。建议使用 SeaBIOS 或 PVE 4M UEFI；旧版 2M UEFI 可能不支持从 SD 卡启动。',
        },
        zh_TW: {
            'SD card': 'SD 卡',
            'SD card CID': 'SD 卡片識別碼 (CID)',
            'SD specification': 'SD 規範版本',
            'Enter exactly 32 hexadecimal characters (16 bytes).':
                '請輸入 32 個十六進位字元（16 位元組）。',
            'The entire image is used as the SD card. There are no eMMC boot or RPMB partitions. Images must be between 256 KiB and 2 TiB: powers of two up to 2 GiB, then multiples of 512 KiB. Formatting and filesystems are managed inside the guest.':
                '整個磁碟映像作為 SD 卡使用，不包含 eMMC 開機分割區和 RPMB。容量須為 256 KiB 至 2 TiB：不超過 2 GiB 時為 2 的整數次方，超過 2 GiB 時為 512 KiB 的整數倍。請在虛擬機內分割並格式化。',
            'Leave CID empty to use the QEMU default. Custom CID requires sd-card.cid support. With this SDHCI controller, Linux reports the last CID byte as 00. Shut down and start the VM to apply device, CID, specification or capacity changes; device hotplug is unavailable.':
                'CID 留空時使用 QEMU 預設值，自訂 CID 需要支援 sd-card.cid 的 QEMU。使用目前 SDHCI 控制器時，Linux 讀出的 CID 最後兩位為 00。修改裝置、CID、規範版本或容量後，請關閉虛擬機再啟動；不支援裝置熱插拔。',
            'Displaying the complete CID requires a QEMU SDHCI response mode that retains the CRC byte, plus sdhci.debug_quirks2=0x10000 in the guest Linux kernel command line followed by a guest reboot. The current QEMU package does not provide that mode; enabling the parameter alone misreads CID/CSD. The parameter affects all SDHCI controllers in the guest and overrides other quirks2 settings.':
                '完整顯示 CID 需要先使用保留 CRC 位元組的 QEMU SDHCI 回應模式，再於客體 Linux 核心啟動參數中加入 sdhci.debug_quirks2=0x10000，並重新啟動客體。目前配套 QEMU 套件尚未提供該模式，單獨啟用參數會導致 CID/CSD 讀取錯誤。該參數影響客體內所有 SDHCI 控制器，並覆寫其他 quirks2 設定。',
            'SD boot requires compatible firmware and QEMU support for sdhci-pci.bootindex. Configure boot priority in Boot Order. SD specification defaults to 3.01; capacity determines standard or high-capacity addressing automatically. SeaBIOS or PVE 4M UEFI is recommended; legacy 2M UEFI may not support SD boot.':
                '從 SD 卡開機需要相容的韌體，以及支援 sdhci-pci.bootindex 的 QEMU。請在「開機順序」中設定優先順序。SD 規範預設採用 3.01，標準容量或高容量定址由磁碟大小自動決定。建議使用 SeaBIOS 或 PVE 4M UEFI；舊版 2M UEFI 可能不支援從 SD 卡開機。',
        },
    }[Proxmox.defaultLang];
    const catalog = globalThis.__proxmox_i18n_msgcat__;
    const digest = globalThis.fnv31a;
    if (!translations || !catalog || typeof digest !== 'function') {
        return;
    }
    for (const [message, translation] of Object.entries(translations)) {
        const key = digest(message);
        if (!catalog[key]?.[0]) {
            catalog[key] = [translation];
        }
    }
})();
