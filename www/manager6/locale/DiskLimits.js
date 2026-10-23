// Extend pve-i18n with validation messages for disk I/O limits.
(() => {
    const translations = {
        zh_CN: {
            'Set the corresponding limit before configuring a burst.':
                '请先设置对应的基础限速，再配置突发值。',
            'The burst value must be greater than or equal to the corresponding limit.':
                '突发值必须大于或等于对应的基础限速。',
        },
        zh_TW: {
            'Set the corresponding limit before configuring a burst.':
                '請先設定對應的基本速率限制，再設定突發值。',
            'The burst value must be greater than or equal to the corresponding limit.':
                '突發值必須大於或等於對應的基本速率限制。',
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
