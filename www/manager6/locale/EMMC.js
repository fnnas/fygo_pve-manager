// Extend pve-i18n with translations for this fork's eMMC options.
(() => {
    const translations = {
        zh_CN: {
            'Each boot partition (KiB)': '每个启动分区 (KiB)',
            'RPMB size (KiB)': 'RPMB 大小 (KiB)',
            'Boot partition': '启动分区',
            'User area': '用户区',
            'Initial partition access': '初始访问分区',
            'Boot acknowledgement': '启动确认 (ACK)',
            'RPMB authentication key': 'RPMB 认证密钥',
            'Not preset': '不预设',
            'Must be a multiple of 128 KiB.': '必须为 128 KiB 的整数倍。',
            'Configure the corresponding partition size first.': '请先设置对应分区的大小。',
            'Enter exactly 64 hexadecimal characters (32 bytes).':
                '请输入 64 个十六进制字符（32 字节）。',
            'Image layout: BOOT1 | BOOT2 | RPMB | user area. For new images, disk size specifies the user area; boot and RPMB sizes are added automatically. Existing and imported images must contain the complete layout; set partition sizes to match the image.':
                '镜像布局：BOOT1 | BOOT2 | RPMB | 用户区。新建镜像时，磁盘大小指用户区容量，系统会自动加上两个启动分区和 RPMB 的容量。挂载已有镜像或导入时，镜像必须包含完整布局，请按镜像的实际布局调整分区大小。',
            'Changing partition sizes reinterprets existing image data. Shut down the VM before changing devices, layouts or capacity. Firmware must support SD/MMC boot; the boot partition setting does not set BIOS/UEFI boot priority.':
                '修改分区大小会改变现有镜像数据的解释方式，不会移动数据。修改设备、布局或容量前请先关闭虚拟机。从 eMMC 启动需要固件支持 SD/MMC；此处的启动分区设置不控制 BIOS/UEFI 启动顺序。',
            'A size of 0 disables RPMB. Guest-programmed RPMB keys and write counters are lost on cold restarts. A preset key is stored in the VM configuration and applied each start; it requires QEMU support for emmc.auth-key. With RPMB, use disk-only backups and offline migration; RAM snapshots, hibernation and live migration are unavailable.':
                'RPMB 大小设为 0 时禁用。虚拟机冷启动后，来宾设置的 RPMB 密钥和写入计数器会重置。预设密钥保存在虚拟机配置中，每次启动时应用，需要 QEMU 支持 emmc.auth-key。启用 RPMB 后可使用纯磁盘备份和离线迁移，无法使用包含内存的快照、休眠和在线迁移。',
        },
        zh_TW: {
            'Each boot partition (KiB)': '每個開機分割區 (KiB)',
            'RPMB size (KiB)': 'RPMB 大小 (KiB)',
            'Boot partition': '開機分割區',
            'User area': '使用者區',
            'Initial partition access': '初始存取分割區',
            'Boot acknowledgement': '開機確認 (ACK)',
            'RPMB authentication key': 'RPMB 驗證金鑰',
            'Not preset': '不預設',
            'Must be a multiple of 128 KiB.': '必須為 128 KiB 的整數倍。',
            'Configure the corresponding partition size first.': '請先設定對應分割區的大小。',
            'Enter exactly 64 hexadecimal characters (32 bytes).':
                '請輸入 64 個十六進位字元（32 位元組）。',
            'Image layout: BOOT1 | BOOT2 | RPMB | user area. For new images, disk size specifies the user area; boot and RPMB sizes are added automatically. Existing and imported images must contain the complete layout; set partition sizes to match the image.':
                '映像配置：BOOT1 | BOOT2 | RPMB | 使用者區。建立新映像時，磁碟大小指使用者區容量，系統會自動加上兩個開機分割區和 RPMB 的容量。掛載既有映像或匯入時，映像必須包含完整配置，請依映像的實際配置調整分割區大小。',
            'Changing partition sizes reinterprets existing image data. Shut down the VM before changing devices, layouts or capacity. Firmware must support SD/MMC boot; the boot partition setting does not set BIOS/UEFI boot priority.':
                '修改分割區大小會改變現有映像資料的解讀方式，不會移動資料。修改裝置、配置或容量前請先關閉虛擬機。從 eMMC 開機需要韌體支援 SD/MMC；此處的開機分割區設定不控制 BIOS/UEFI 開機順序。',
            'A size of 0 disables RPMB. Guest-programmed RPMB keys and write counters are lost on cold restarts. A preset key is stored in the VM configuration and applied each start; it requires QEMU support for emmc.auth-key. With RPMB, use disk-only backups and offline migration; RAM snapshots, hibernation and live migration are unavailable.':
                'RPMB 大小設為 0 時停用。虛擬機冷開機後，客體設定的 RPMB 金鑰和寫入計數器會重設。預設金鑰儲存在虛擬機設定中，每次開機時套用，需要 QEMU 支援 emmc.auth-key。啟用 RPMB 後可使用純磁碟備份和離線遷移，無法使用包含記憶體的快照、休眠和線上遷移。',
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
