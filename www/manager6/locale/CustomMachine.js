// Supplement the installed translation catalog for custom machine selection.
(() => {
    const translations = {
        zh_CN: {
            Custom: '自定义',
            'Custom machine': '自定义机型',
            'No custom machine is available on this node.': '此节点没有可用的自定义机型。',
            'Could not load custom machines.': '无法加载自定义机型。',
            'azw-me-pro uses a fixed Q35 platform with NVMe controller slots nvme0 to nvme2 and six shared SATA/IDE ports. Requires the matching custom QEMU. UEFI is recommended.':
                'azw-me-pro 使用固定的 Q35 平台，提供 nvme0 至 nvme2 三个 NVMe 控制器槽位和六个 SATA/IDE 共用端口。需要配套的自定义 QEMU，建议使用 UEFI。',
        },
        zh_TW: {
            Custom: '自訂',
            'Custom machine': '自訂機型',
            'No custom machine is available on this node.': '此節點沒有可用的自訂機型。',
            'Could not load custom machines.': '無法載入自訂機型。',
            'azw-me-pro uses a fixed Q35 platform with NVMe controller slots nvme0 to nvme2 and six shared SATA/IDE ports. Requires the matching custom QEMU. UEFI is recommended.':
                'azw-me-pro 使用固定的 Q35 平台，提供 nvme0 至 nvme2 三個 NVMe 控制器插槽和六個 SATA/IDE 共用連接埠。需要配套的自訂 QEMU，建議使用 UEFI。',
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
