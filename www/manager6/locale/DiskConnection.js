(() => {
    const translations = {
        zh_CN: '保留磁盘配置。从客户机断开前，请先卸载磁盘。运行时是否生效取决于热插拔设置和设备类型。',
        zh_TW: '保留磁碟設定。從客體中斷連線前，請先卸載磁碟。執行時是否生效取決於熱插拔設定及裝置類型。',
    };
    const message =
        'Keep the disk configured. Unmount it in the guest before disconnecting. The device type and hotplug settings determine when the change takes effect.';
    const translation = translations[Proxmox.defaultLang];
    const catalog = globalThis.__proxmox_i18n_msgcat__;
    if (!translation || !catalog || typeof globalThis.fnv31a !== 'function') {
        return;
    }
    const key = globalThis.fnv31a(message);
    if (!catalog[key]?.[0]) {
        catalog[key] = [translation];
    }
})();
