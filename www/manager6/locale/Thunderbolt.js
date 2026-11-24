(() => {
    const translations = {
        zh_CN: {
            Thunderbolt: '雷电',
            'Thunderbolt Controller': '雷电主控',
            'Thunderbolt Dock': '雷电扩展坞',
            'Reserve the upstream port. Unmount disks in this dock and its downstream devices before disconnecting.':
                '保留上游端口。断开前请先在客户机中卸载此扩展坞和下游设备上的磁盘。',
            'Generic USB4': '通用 USB4',
            'Controller model': '主控型号',
            'Thunderbolt dock port': '雷电扩展坞端口',
            'Recommended default. Two virtual ports.\nConnects docks and multiple NVMe data disks, with dock cascading support.':
                '默认推荐。提供 2 个虚拟端口。\n可连接扩展坞和多块 NVMe 数据盘，也支持扩展坞级联。',
            'Two virtual ports.\nEmulates the Alder Lake-P integrated USB4 router and selected register behavior for guest driver detection tests.':
                '提供 2 个虚拟端口。\n模拟 Alder Lake-P 集成主控的 USB4 路由器和部分寄存器行为，适合测试这一平台的驱动识别。',
            'Two virtual ports.\nPresents the ASM4242 PCI device ID to test guest detection of the ASMedia controller.':
                '提供 2 个虚拟端口。\n向客户机呈现 ASM4242 的 PCI 设备标识，适合测试系统对 ASMedia 主控的识别。',
            'Two virtual ports.\nEmulates an AMD USB4 router identity and uses the generic QEMU USB4 PCI device ID.':
                '提供 2 个虚拟端口。\n模拟 AMD USB4 路由器标识，主控在 PCI 设备列表中仍显示为通用 QEMU USB4。',
            'Single-port Thunderbolt 3 controller emulating the low-power JHL6240.\nConnects one dock for testing early Thunderbolt 3 device detection.':
                '雷电 3 单口主控，模拟低功耗版 JHL6240。\n可直连 1 个扩展坞，适合测试早期雷电 3 设备识别。',
            'Dual-port Thunderbolt 3 controller emulating the JHL7540.\nConnects two docks for testing Titan Ridge firmware connection management.':
                '雷电 3 双口主控，模拟 JHL7540。\n可直连 2 个扩展坞，适合测试 Titan Ridge 的固件连接管理。',
            'Dual-port Thunderbolt 3 controller emulating the integrated Ice Lake controller.\nConnects two docks for testing integrated controller detection.':
                '雷电 3 双口主控，模拟 Ice Lake 平台集成的控制器。\n可直连 2 个扩展坞，适合测试集成式雷电 3 主控的识别。',
            'Upstream port': '上级设备端口',
            'Dock port': '扩展坞端口',
            'Built-in NVMe': '内置 NVMe',
            'No free device slot': '没有可用的设备槽位',
            'Direct PCIe connection': '直接连接 PCIe',
        },
        zh_TW: {
            Thunderbolt: 'Thunderbolt',
            'Thunderbolt Controller': 'Thunderbolt 控制器',
            'Thunderbolt Dock': 'Thunderbolt 擴充基座',
            'Reserve the upstream port. Unmount disks in this dock and its downstream devices before disconnecting.':
                '保留上游連接埠。斷開前請先在客體中卸載此擴充基座和下游裝置上的磁碟。',
            'Generic USB4': '通用 USB4',
            'Controller model': '控制器型號',
            'Thunderbolt dock port': 'Thunderbolt 擴充基座連接埠',
            'Recommended default. Two virtual ports.\nConnects docks and multiple NVMe data disks, with dock cascading support.':
                '預設推薦。提供 2 個虛擬連接埠。\n可連接擴充基座和多顆 NVMe 資料碟，也支援擴充基座串接。',
            'Two virtual ports.\nEmulates the Alder Lake-P integrated USB4 router and selected register behavior for guest driver detection tests.':
                '提供 2 個虛擬連接埠。\n模擬 Alder Lake-P 整合控制器的 USB4 路由器與部分暫存器行為，適合測試此平台的驅動程式辨識。',
            'Two virtual ports.\nPresents the ASM4242 PCI device ID to test guest detection of the ASMedia controller.':
                '提供 2 個虛擬連接埠。\n向客體呈現 ASM4242 的 PCI 裝置識別碼，適合測試系統對 ASMedia 控制器的辨識。',
            'Two virtual ports.\nEmulates an AMD USB4 router identity and uses the generic QEMU USB4 PCI device ID.':
                '提供 2 個虛擬連接埠。\n模擬 AMD USB4 路由器的識別資訊，控制器在 PCI 裝置清單中仍顯示為通用 QEMU USB4。',
            'Single-port Thunderbolt 3 controller emulating the low-power JHL6240.\nConnects one dock for testing early Thunderbolt 3 device detection.':
                'Thunderbolt 3 單埠控制器，模擬低功耗版 JHL6240。\n可直連 1 個擴充基座，適合測試早期 Thunderbolt 3 裝置的辨識。',
            'Dual-port Thunderbolt 3 controller emulating the JHL7540.\nConnects two docks for testing Titan Ridge firmware connection management.':
                'Thunderbolt 3 雙埠控制器，模擬 JHL7540。\n可直連 2 個擴充基座，適合測試 Titan Ridge 的韌體連線管理。',
            'Dual-port Thunderbolt 3 controller emulating the integrated Ice Lake controller.\nConnects two docks for testing integrated controller detection.':
                'Thunderbolt 3 雙埠控制器，模擬 Ice Lake 平台的整合式控制器。\n可直連 2 個擴充基座，適合測試整合式 Thunderbolt 3 控制器的辨識。',
            'Upstream port': '上游裝置連接埠',
            'Dock port': '擴充基座連接埠',
            'Built-in NVMe': '內建 NVMe',
            'No free device slot': '沒有可用的裝置插槽',
            'Direct PCIe connection': '直接連接 PCIe',
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
