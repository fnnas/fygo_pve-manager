(function () {
    const translations = {
        zh_CN: {
            'Bochs (no VGA compatibility)': 'Bochs（非 VGA 兼容）',
            'Secondary VGA': '辅助 VGA',
            'QXL (no VGA compatibility)': 'QXL（非 VGA 兼容）',
            'VirtIO GPU (PCI, no VGA compatibility)': 'VirtIO GPU（PCI，非 VGA 兼容）',
            'VirGL GPU (PCI, no VGA compatibility)': 'VirGL GPU（PCI，非 VGA 兼容）',
            'Cirrus video memory must be 4, 8 or 16 MiB.': 'Cirrus 显存必须为 4、8 或 16 MiB。',
            'ATI RV100 requires at least 16 MiB video memory.': 'ATI RV100 至少需要 16 MiB 显存。',
            'ATI model': 'ATI 型号',
            'Bochs is a simple PCI framebuffer without legacy VGA ports. UEFI or a guest Bochs DRM driver is required for graphics. Video memory defaults to 16 MiB and must not exceed 256 MiB.':
                'Bochs 是不提供传统 VGA 端口的基础 PCI 帧缓冲设备。显示画面需要兼容的 UEFI 固件或客户机 Bochs DRM 驱动。显存默认 16 MiB，最大 256 MiB。',
            'ATI emulates Rage 128 Pro by default, or Radeon RV100 when selected. RV100 needs at least 16 MiB video memory. This model has no migration state support: live migration, RAM snapshots and hibernation are unavailable.':
                'ATI 默认模拟 Rage 128 Pro，也可选择 Radeon RV100；RV100 至少需要 16 MiB 显存。此设备未实现迁移状态，不支持在线迁移、包含内存的快照和休眠。',
            'ISA graphics are for legacy x86 guests. They do not use a PCI slot and may not be initialized by UEFI. ISA VGA defaults to 8 MiB video memory; ISA Cirrus defaults to 4 MiB.':
                'ISA 显卡适合旧式 x86 客户机，不占用 PCI 插槽，UEFI 可能无法初始化。ISA VGA 默认显存为 8 MiB，ISA Cirrus 默认显存为 4 MiB。',
            'Cirrus is a legacy VGA model. Prefer Standard VGA or VirtIO for modern guests. Configurable video memory is 4, 8 or 16 MiB; larger settings do not add modern graphics capabilities.':
                'Cirrus 是旧式 VGA 型号；现代客户机建议使用标准 VGA 或 VirtIO。显存只可设置为 4、8 或 16 MiB，增加显存不会提供现代图形加速能力。',
            'This PCI graphics model omits legacy VGA I/O ports. Despite its name, it can be the only configured display. Firmware output depends on compatible UEFI; the guest needs a matching graphics driver.':
                '此 PCI 显示设备省略传统 VGA I/O 端口。虽然名为“辅助 VGA”，仍可作为唯一配置的显示设备。固件画面取决于 UEFI 兼容性，客户机需要匹配的图形驱动。',
            'This is the non-VGA QXL PCI device, with SPICE support. The guest needs a QXL driver. Firmware graphics may require UEFI; selecting it does not add a second display automatically.':
                '此选项使用不提供传统 VGA 兼容性的 QXL PCI 设备，支持 SPICE，需要客户机 QXL 驱动。固件画面可能需要 UEFI；选择此项不会自动添加第二块显卡。',
            'This VirtIO GPU uses PCI without legacy VGA compatibility. The guest needs a VirtIO GPU driver. Use UEFI for firmware graphics; with legacy BIOS, the console may appear only after the guest driver loads.':
                '此 VirtIO GPU 使用 PCI 总线，不提供传统 VGA 兼容性，需要客户机 VirtIO GPU 驱动。建议使用 UEFI 显示固件画面；使用传统 BIOS 时，控制台可能在客户机驱动加载后才出现。',
            'VirGL needs a compatible host render node, libegl1, libgl1 and guest VirtIO GPU/Mesa drivers. PCI and ARM MMIO variants omit legacy VGA compatibility. Live migration, RAM snapshots and hibernation are unavailable.':
                'VirGL 需要兼容的宿主机渲染节点、libegl1、libgl1，以及客户机 VirtIO GPU/Mesa 驱动。PCI 和 ARM MMIO 版本均不提供传统 VGA 兼容性。不支持在线迁移、包含内存的快照和休眠。',
            'This VirtIO GPU uses the ARM virt machine MMIO bus and consumes no PCI slot. It requires a guest VirtIO MMIO GPU driver. Firmware graphics may appear only after the guest driver loads.':
                '此 VirtIO GPU 使用 ARM virt 机型的 MMIO 总线，不占用 PCI 插槽，需要客户机 VirtIO MMIO GPU 驱动。显示画面可能在客户机驱动加载后才出现。',
            'Start an external vhost-user GPU backend before the VM, listening on /run/qemu-server/VMID.vgpu. QEMU connects as a client; the backend is managed separately and must be restarted for subsequent VM starts. Main RAM is shared automatically, including NUMA RAM. Memory hotplug, live migration, RAM snapshots and hibernation are unavailable. VNC/SPICE requires EGL and a usable host DRM render node even with a 2D backend; OpenGL is enabled automatically. Cold migration requires force and a separately prepared backend on the target.':
                '启动虚拟机前，请先启动独立的 vhost-user GPU 后端，监听 /run/qemu-server/VMID.vgpu（VMID 替换为虚拟机编号）。QEMU 作为客户端连接；后端由外部管理，每次启动虚拟机前需重新就绪。系统会自动共享全部主内存，包括 NUMA 内存。不支持内存热插拔、在线迁移、包含内存的快照和休眠。即使使用 2D 后端，VNC/SPICE 仍需要 EGL 和可用的宿主机 DRM 渲染节点；系统会自动启用 OpenGL。关机迁移需使用强制选项，并在目标节点单独准备后端。',
        },
        zh_TW: {
            'Bochs (no VGA compatibility)': 'Bochs（非 VGA 相容）',
            'Secondary VGA': '次要 VGA',
            'QXL (no VGA compatibility)': 'QXL（非 VGA 相容）',
            'VirtIO GPU (PCI, no VGA compatibility)': 'VirtIO GPU（PCI，非 VGA 相容）',
            'VirGL GPU (PCI, no VGA compatibility)': 'VirGL GPU（PCI，非 VGA 相容）',
            'Cirrus video memory must be 4, 8 or 16 MiB.':
                'Cirrus 顯示記憶體必須為 4、8 或 16 MiB。',
            'ATI RV100 requires at least 16 MiB video memory.':
                'ATI RV100 至少需要 16 MiB 顯示記憶體。',
            'ATI model': 'ATI 型號',
            'Bochs is a simple PCI framebuffer without legacy VGA ports. UEFI or a guest Bochs DRM driver is required for graphics. Video memory defaults to 16 MiB and must not exceed 256 MiB.':
                'Bochs 是不提供傳統 VGA 連接埠的基礎 PCI 畫面緩衝裝置。顯示畫面需要相容的 UEFI 韌體或客體 Bochs DRM 驅動。顯示記憶體預設 16 MiB，最大 256 MiB。',
            'ATI emulates Rage 128 Pro by default, or Radeon RV100 when selected. RV100 needs at least 16 MiB video memory. This model has no migration state support: live migration, RAM snapshots and hibernation are unavailable.':
                'ATI 預設模擬 Rage 128 Pro，也可選擇 Radeon RV100；RV100 至少需要 16 MiB 顯示記憶體。此裝置未實作遷移狀態，不支援線上遷移、包含記憶體的快照和休眠。',
            'ISA graphics are for legacy x86 guests. They do not use a PCI slot and may not be initialized by UEFI. ISA VGA defaults to 8 MiB video memory; ISA Cirrus defaults to 4 MiB.':
                'ISA 顯示卡適合舊式 x86 客體，不占用 PCI 插槽，UEFI 可能無法初始化。ISA VGA 預設顯示記憶體為 8 MiB，ISA Cirrus 預設為 4 MiB。',
            'Cirrus is a legacy VGA model. Prefer Standard VGA or VirtIO for modern guests. Configurable video memory is 4, 8 or 16 MiB; larger settings do not add modern graphics capabilities.':
                'Cirrus 是舊式 VGA 型號；現代客體建議使用標準 VGA 或 VirtIO。顯示記憶體只可設為 4、8 或 16 MiB，增加容量不會提供現代圖形加速能力。',
            'This PCI graphics model omits legacy VGA I/O ports. Despite its name, it can be the only configured display. Firmware output depends on compatible UEFI; the guest needs a matching graphics driver.':
                '此 PCI 顯示裝置省略傳統 VGA I/O 連接埠。雖然名為「次要 VGA」，仍可作為唯一設定的顯示裝置。韌體畫面取決於 UEFI 相容性，客體需要相符的圖形驅動。',
            'This is the non-VGA QXL PCI device, with SPICE support. The guest needs a QXL driver. Firmware graphics may require UEFI; selecting it does not add a second display automatically.':
                '此選項使用不提供傳統 VGA 相容性的 QXL PCI 裝置，支援 SPICE，需要客體 QXL 驅動。韌體畫面可能需要 UEFI；選擇此項不會自動新增第二張顯示卡。',
            'This VirtIO GPU uses PCI without legacy VGA compatibility. The guest needs a VirtIO GPU driver. Use UEFI for firmware graphics; with legacy BIOS, the console may appear only after the guest driver loads.':
                '此 VirtIO GPU 使用 PCI 匯流排，不提供傳統 VGA 相容性，需要客體 VirtIO GPU 驅動。建議使用 UEFI 顯示韌體畫面；使用傳統 BIOS 時，主控台可能在客體驅動載入後才出現。',
            'VirGL needs a compatible host render node, libegl1, libgl1 and guest VirtIO GPU/Mesa drivers. PCI and ARM MMIO variants omit legacy VGA compatibility. Live migration, RAM snapshots and hibernation are unavailable.':
                'VirGL 需要相容的宿主機算繪節點、libegl1、libgl1，以及客體 VirtIO GPU/Mesa 驅動。PCI 和 ARM MMIO 版本均不提供傳統 VGA 相容性。不支援線上遷移、包含記憶體的快照和休眠。',
            'This VirtIO GPU uses the ARM virt machine MMIO bus and consumes no PCI slot. It requires a guest VirtIO MMIO GPU driver. Firmware graphics may appear only after the guest driver loads.':
                '此 VirtIO GPU 使用 ARM virt 機型的 MMIO 匯流排，不占用 PCI 插槽，需要客體 VirtIO MMIO GPU 驅動。顯示畫面可能在客體驅動載入後才出現。',
            'Start an external vhost-user GPU backend before the VM, listening on /run/qemu-server/VMID.vgpu. QEMU connects as a client; the backend is managed separately and must be restarted for subsequent VM starts. Main RAM is shared automatically, including NUMA RAM. Memory hotplug, live migration, RAM snapshots and hibernation are unavailable. VNC/SPICE requires EGL and a usable host DRM render node even with a 2D backend; OpenGL is enabled automatically. Cold migration requires force and a separately prepared backend on the target.':
                '啟動虛擬機前，請先啟動獨立的 vhost-user GPU 後端，監聽 /run/qemu-server/VMID.vgpu（VMID 替換為虛擬機編號）。QEMU 作為用戶端連線；後端由外部管理，每次啟動虛擬機前須重新就緒。系統會自動共享全部主記憶體，包括 NUMA 記憶體。不支援記憶體熱插拔、線上遷移、包含記憶體的快照和休眠。即使使用 2D 後端，VNC/SPICE 仍需要 EGL 和可用的宿主機 DRM 算繪節點；系統會自動啟用 OpenGL。關機遷移須使用強制選項，並在目標節點單獨準備後端。',
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
