(function () {
    const translations = {
        zh_CN: {
            'Mediated/VFIO display': 'mdev/VFIO 显示',
            'RAM framebuffer': 'RAM 帧缓冲显示',
            'Console display': '控制台显示',
            'RAMFB boot display': 'RAMFB 启动画面',
            'DRM render node': 'DRM 渲染节点',
            'Use a host path such as /dev/dri/renderD128.':
                '请填写宿主机路径，例如 /dev/dri/renderD128。',
            'Console display requires a graphics PCI device.':
                '控制台显示只能用于图形类 PCI 设备。',
            'Enable Console display on the graphics PCI device, then select Mediated/VFIO display here. Only selected graphics devices are exposed to VNC/SPICE. The host driver and vGPU profile must support a VFIO display interface; compute-only profiles cannot display a console.':
                '先在图形类 PCI 设备中开启“控制台显示”，再在此选择“mdev/VFIO 显示”。只有勾选的图形设备会接入 VNC/SPICE。宿主驱动和 vGPU 配置必须提供 VFIO 显示接口；仅计算用途的配置不能显示控制台。',
            'OpenGL is enabled by default for DMA-BUF displays and needs a usable host DRM render node, libegl1 and libgl1. Leave the node empty for automatic selection; on multi-GPU hosts choose the node compatible with the vGPU. Disable OpenGL only for a CPU-accessible VFIO display region. A GPU passed through exclusively may not provide a host render node.':
                'OpenGL 默认开启，用于 DMA-BUF 显示，需要宿主机提供可用的 DRM 渲染节点，并安装 libegl1 和 libgl1。节点留空时自动选择；多显卡宿主机应选择与 vGPU 兼容的节点。仅当设备提供 CPU 可访问的 VFIO 显示区域时才能关闭 OpenGL。整卡独占直通后，该卡可能不再提供宿主渲染节点。',
            'RAM framebuffer provides a simple UEFI display, not an accelerated GPU. It requires compatible UEFI firmware and a guest framebuffer driver. For vGPU boot graphics, use the RAMFB boot display switch on the PCI device instead. Shut down and start the VM after display changes.':
                'RAM 帧缓冲提供基础 UEFI 显示，无 GPU 加速能力，需要兼容的 UEFI 固件和客户机帧缓冲驱动。若需要 vGPU 加载驱动前的启动画面，请在 PCI 设备中开启“RAMFB 启动画面”。修改显示配置后，请关闭虚拟机再启动。',
            'Console display is off by default. Enable it only on a GPU with VFIO display support, then set the VM display to Mediated/VFIO display. MDev Type selects an existing host vGPU profile; this does not enable unsupported hardware or drivers. Mapped devices and all alternatives are checked at startup.':
                '控制台显示默认关闭。仅对支持 VFIO 显示的 GPU 开启，并将虚拟机“显示”设为“mdev/VFIO 显示”。MDev 类型用于选择宿主机已有的 vGPU 配置，不能为不支持的硬件或驱动增加 vGPU 能力。映射设备及所有候选设备会在启动时检查。',
            'RAMFB boot display is off by default and requires Console display and compatible UEFI firmware. Enable it on at most one GPU for boot graphics before the guest GPU driver loads. Device hotplug is unavailable. Shut down and start the VM to apply changes; migration and snapshots remain subject to VFIO and driver restrictions.':
                'RAMFB 启动画面默认关闭，需要先开启“控制台显示”并使用兼容的 UEFI 固件。最多对一个 GPU 开启，用于客户机 GPU 驱动加载前的启动画面。不支持设备热插拔。修改后请关闭虚拟机再启动；迁移和快照仍受 VFIO 与驱动限制。',
            'Before starting the VM, add a graphics PCI device and enable Console display. Configure OpenGL and the render node in Hardware - Display after creation.':
                '启动虚拟机前，请添加图形类 PCI 设备并开启“控制台显示”。创建完成后，可在“硬件－显示”中设置 OpenGL 和渲染节点。',
            'RAM framebuffer requires compatible UEFI firmware.':
                'RAM 帧缓冲显示需要兼容的 UEFI 固件。',
        },
        zh_TW: {
            'Mediated/VFIO display': 'mdev/VFIO 顯示',
            'RAM framebuffer': 'RAM 畫面緩衝顯示',
            'Console display': '主控台顯示',
            'RAMFB boot display': 'RAMFB 開機畫面',
            'DRM render node': 'DRM 算繪節點',
            'Use a host path such as /dev/dri/renderD128.':
                '請填寫宿主機路徑，例如 /dev/dri/renderD128。',
            'Console display requires a graphics PCI device.':
                '主控台顯示只能用於圖形類 PCI 裝置。',
            'Enable Console display on the graphics PCI device, then select Mediated/VFIO display here. Only selected graphics devices are exposed to VNC/SPICE. The host driver and vGPU profile must support a VFIO display interface; compute-only profiles cannot display a console.':
                '先在圖形類 PCI 裝置中開啟「主控台顯示」，再於此處選擇「mdev/VFIO 顯示」。只有勾選的圖形裝置會接入 VNC/SPICE。宿主驅動和 vGPU 設定必須提供 VFIO 顯示介面；僅計算用途的設定不能顯示主控台。',
            'OpenGL is enabled by default for DMA-BUF displays and needs a usable host DRM render node, libegl1 and libgl1. Leave the node empty for automatic selection; on multi-GPU hosts choose the node compatible with the vGPU. Disable OpenGL only for a CPU-accessible VFIO display region. A GPU passed through exclusively may not provide a host render node.':
                'OpenGL 預設開啟，用於 DMA-BUF 顯示，需要宿主機提供可用的 DRM 算繪節點，並安裝 libegl1 和 libgl1。節點留空時自動選擇；多顯示卡宿主機應選擇與 vGPU 相容的節點。僅當裝置提供 CPU 可存取的 VFIO 顯示區域時才能關閉 OpenGL。整卡獨占直通後，該卡可能不再提供宿主算繪節點。',
            'RAM framebuffer provides a simple UEFI display, not an accelerated GPU. It requires compatible UEFI firmware and a guest framebuffer driver. For vGPU boot graphics, use the RAMFB boot display switch on the PCI device instead. Shut down and start the VM after display changes.':
                'RAM 畫面緩衝提供基礎 UEFI 顯示，無 GPU 加速能力，需要相容的 UEFI 韌體和客體畫面緩衝驅動。若需要 vGPU 載入驅動前的開機畫面，請在 PCI 裝置中開啟「RAMFB 開機畫面」。修改顯示設定後，請關閉虛擬機再啟動。',
            'Console display is off by default. Enable it only on a GPU with VFIO display support, then set the VM display to Mediated/VFIO display. MDev Type selects an existing host vGPU profile; this does not enable unsupported hardware or drivers. Mapped devices and all alternatives are checked at startup.':
                '主控台顯示預設關閉。僅對支援 VFIO 顯示的 GPU 開啟，並將虛擬機「顯示」設為「mdev/VFIO 顯示」。MDev 類型用於選擇宿主機已有的 vGPU 設定，不能為不支援的硬體或驅動增加 vGPU 能力。映射裝置及所有候選裝置會在啟動時檢查。',
            'RAMFB boot display is off by default and requires Console display and compatible UEFI firmware. Enable it on at most one GPU for boot graphics before the guest GPU driver loads. Device hotplug is unavailable. Shut down and start the VM to apply changes; migration and snapshots remain subject to VFIO and driver restrictions.':
                'RAMFB 開機畫面預設關閉，需要先開啟「主控台顯示」並使用相容的 UEFI 韌體。最多對一個 GPU 開啟，用於客體 GPU 驅動載入前的開機畫面。不支援裝置熱插拔。修改後請關閉虛擬機再啟動；遷移和快照仍受 VFIO 與驅動限制。',
            'Before starting the VM, add a graphics PCI device and enable Console display. Configure OpenGL and the render node in Hardware - Display after creation.':
                '啟動虛擬機前，請新增圖形類 PCI 裝置並開啟「主控台顯示」。建立完成後，可在「硬體－顯示」中設定 OpenGL 和算繪節點。',
            'RAM framebuffer requires compatible UEFI firmware.':
                'RAM 畫面緩衝顯示需要相容的 UEFI 韌體。',
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
