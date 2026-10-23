Ext.define('PVE.panel.MultiDiskPanel', {
    extend: 'Ext.panel.Panel',

    mixins: ['Proxmox.Mixin.CBind'],

    setNodename: function (nodename) {
        let me = this;
        me.items.each((panel) => panel.setNodename(nodename));
        me.nodename = nodename;

        if (!me.addedFirstDisk && !!nodename) {
            let controller = me.getController();
            controller.onAdd();
            me.lookup('grid').getSelectionModel().select(0, false);
        }
    },

    addedFirstDisk: false,

    border: false,
    bodyBorder: false,

    importDisk: false, // allow import panel

    layout: 'card',

    controller: {
        xclass: 'Ext.app.ViewController',

        vmconfig: {},

        onAdd: function () {
            let me = this;
            let view = me.getView();
            me.addDiskChecked(false);
            if (!view.addedFirstDisk) {
                view.addedFirstDisk = true;
            }
        },

        onImport: function () {
            this.addDiskChecked(true);
        },

        addDiskChecked: function (importDisk) {
            let me = this;
            me.lookup('addButton').setDisabled(true);
            me.lookup('addImportButton').setDisabled(true);
            me.addDisk(importDisk);
            me.updateAddButtons();
        },

        updateAddButtons: function () {
            let me = this;
            const full =
                me.lookup('grid').getStore().getCount() >= me.maxCount ||
                !me.getNextFreeDisk(me.getVMConfig(true));
            me.lookup('addButton').setDisabled(full);
            me.lookup('addImportButton').setDisabled(full || !me.getView().importDisk);
        },

        getNextFreeDisk: function (vmconfig) {
            throw 'implement in subclass';
        },

        addPanel: function (itemId, vmconfig, nextFreeDisk, importDisk) {
            throw 'implement in subclass';
        },

        // define in subclass
        diskSorter: undefined,

        addDisk: function (importDisk) {
            let me = this;
            let grid = me.lookup('grid');
            let store = grid.getStore();

            // get free disk id
            let vmconfig = me.getVMConfig(true);
            let nextFreeDisk = me.getNextFreeDisk(vmconfig);
            if (!nextFreeDisk) {
                return;
            }

            // add store entry + panel
            let itemId = 'disk-card-' + ++Ext.idSeed;
            let rec = store.add({
                name: nextFreeDisk.confid,
                itemId,
                valid: false,
            })[0];

            let panel = me.addPanel(itemId, vmconfig, nextFreeDisk, importDisk);
            panel.updateVMConfig(vmconfig);

            // we need to setup a validitychange handler, so that we can show
            // that a disk has invalid fields
            let fields = panel.query('field');
            fields.forEach((el) =>
                el.on('validitychange', () => {
                    let valid = fields.every((field) => field.isValid());
                    rec.set('valid', valid);
                    me.checkValidity();
                }),
            );

            store.sort(me.diskSorter);

            // select if the panel added is the only one
            if (store.getCount() === 1) {
                grid.getSelectionModel().select(0, false);
            }
            me.updateVMConfig();
        },

        getBaseVMConfig: function () {
            throw 'implement in subclass';
        },

        getVMConfig: function (all) {
            let me = this;

            let vmconfig = me.getBaseVMConfig();

            me.lookup('grid')
                .getStore()
                .each((rec) => {
                    if (all || rec.get('valid')) {
                        vmconfig[rec.get('name')] = rec.get('itemId');
                    }
                });

            return vmconfig;
        },

        checkValidity: function () {
            let me = this;
            const valid =
                me
                    .lookup('grid')
                    .getStore()
                    .findBy((rec) => rec.get('valid') !== true) === -1;
            me.lookup('validationfield').setValue(valid ? 'ready' : '');
        },

        updateVMConfig: function () {
            let me = this;
            let view = me.getView();
            let grid = me.lookup('grid');
            let store = grid.getStore();

            // Incomplete disks reserve their slots too, so they cannot acquire
            // the same ID when their storage fields become valid later.
            let vmconfig = me.getVMConfig(true);
            const baseConfig = me.getBaseVMConfig();

            store.each((rec) => {
                let itemId = rec.get('itemId');
                let panel = view.getComponent(itemId);
                if (!panel) {
                    throw 'unexpected missing panel';
                }

                // Exclude only this card. Other cards with the same ID and
                // reserved devices such as the install CD still occupy it.
                let panel_vmconfig = Ext.apply({}, baseConfig);
                store.each((other) => {
                    if (other !== rec) {
                        panel_vmconfig[other.get('name')] = other.get('itemId');
                    }
                });

                panel.updateVMConfig(panel_vmconfig);
                rec.set(
                    'valid',
                    panel.query('field').every((field) => field.isValid()),
                );
            });

            me.checkValidity();
            me.updateAddButtons();

            return vmconfig;
        },

        onChange: function (panel, newVal) {
            let me = this;
            let store = me.lookup('grid').getStore();

            let el = store.findRecord('itemId', panel.itemId, 0, false, true, true);
            if (el.get('name') === newVal) {
                // do not update if there was no change
                return;
            }

            el.set('name', newVal);
            el.commit();

            store.sort(me.diskSorter);

            // so that it happens after the layouting
            setTimeout(function () {
                if (!me.destroyed && !me.destroying) {
                    const view = me.getView();
                    if (view && !view.destroyed && !view.destroying) {
                        me.updateVMConfig();
                    }
                }
            }, 10);
        },

        onRemove: function (tableview, rowIndex, colIndex, item, event, record) {
            let me = this;
            let grid = me.lookup('grid');
            let store = grid.getStore();
            let removed_idx = store.indexOf(record);

            let selection = grid.getSelection()[0];
            let selected_idx = store.indexOf(selection);

            if (selected_idx === removed_idx) {
                let newidx = store.getCount() > removed_idx + 1 ? removed_idx + 1 : removed_idx - 1;
                grid.getSelectionModel().select(newidx, false);
            }

            store.remove(record);
            me.getView().remove(record.get('itemId'));
            me.updateVMConfig();
            me.checkValidity();
        },

        onSelectionChange: function (grid, selection) {
            let me = this;
            if (!selection || selection.length < 1) {
                return;
            }

            me.getView().setActiveItem(selection[0].data.itemId);
        },

        control: {
            inputpanel: {
                diskidchange: 'onChange',
            },
            'grid[reference=grid]': {
                selectionchange: 'onSelectionChange',
            },
        },
    },

    dockedItems: [
        {
            xtype: 'container',
            layout: {
                type: 'vbox',
                align: 'stretch',
            },
            dock: 'left',
            border: false,
            width: 130,
            cbind: {}, // for nested cbinds
            items: [
                {
                    xtype: 'grid',
                    hideHeaders: true,
                    reference: 'grid',
                    flex: 1,
                    emptyText: gettext('No Disks'),
                    margin: '0 0 5 0',
                    store: {
                        fields: ['name', 'itemId', 'valid'],
                        data: [],
                    },
                    columns: [
                        {
                            dataIndex: 'name',
                            renderer: function (val, md, rec) {
                                let warn = '';
                                if (!rec.get('valid')) {
                                    warn = ' <i class="fa warning fa-warning"></i>';
                                }
                                return val + warn;
                            },
                            flex: 1,
                        },
                        {
                            xtype: 'actioncolumn',
                            width: 30,
                            align: 'center',
                            menuDisabled: true,
                            items: [
                                {
                                    iconCls: 'x-fa fa-trash critical',
                                    tooltip: 'Delete',
                                    handler: 'onRemove',
                                    isActionDisabled: 'deleteDisabled',
                                },
                            ],
                        },
                    ],
                },
                {
                    xtype: 'button',
                    reference: 'addButton',
                    text: gettext('Add'),
                    iconCls: 'fa fa-plus-circle',
                    handler: 'onAdd',
                },
                {
                    xtype: 'button',
                    reference: 'addImportButton',
                    text: gettext('Import'),
                    iconCls: 'fa fa-cloud-download',
                    handler: 'onImport',
                    margin: '5 0 0 0',
                    cbind: {
                        disabled: '{!importDisk}',
                        hidden: '{!importDisk}',
                    },
                },
                {
                    // dummy field to control wizard validation
                    xtype: 'textfield',
                    hidden: true,
                    reference: 'validationfield',
                    submitValue: false,
                    value: 'ready',
                    allowBlank: false,
                },
            ],
        },
    ],
});
