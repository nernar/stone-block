ModAPI.addAPICallback("ICore", function(api) {
    IDRegistry.genBlockID("ex_autosieve");
    var modelfunc = function(ydata, texture, x, y, z) {
        var render = new ICRender.Model();
        var model = BlockRenderer.Model();
        model.addBox(0, 0, 0, 1, 1 / 16, 1, [
            ["ex_top", 0]
        ]);
        model.addBox(0, 15 / 16, 0, 1, 1, 1, [
            ["ex_top", 0]
        ]);
        model.addBox(0, 0, 0, 1 / 16, 1, 1 / 16, [
            ["ex_side", 0]
        ]);
        model.addBox(15 / 16, 0, 0, 1, 1, 1 / 16, [
            ["ex_side", 0]
        ]);
        model.addBox(0, 0, 15 / 16, 1 / 16, 1, 1, [
            ["ex_side", 0]
        ]);
        model.addBox(15 / 16, 0, 15 / 16, 1, 1, 1, [
            ["ex_side", 0]
        ]);
        model.addBox(1 / 16, 1 / 16, 1 / 16, 15 / 16, 15 / 16, 2 / 16, [
            ["glass", 0]
        ]);
        model.addBox(1 / 16, 1 / 16, 1 / 16, 2 / 16, 15 / 16, 15 / 16, [
            ["glass", 0]
        ]);
        model.addBox(1 / 16, 1 / 16, 14 / 16, 15 / 16, 15 / 16, 15 / 16, [
            ["glass", 0]
        ]);
        model.addBox(14 / 16, 1 / 16, 1 / 16, 15 / 16, 15 / 16, 15 / 16, [
            ["glass", 0]
        ]);
        model.addBox(c0 + 0.25, c4 + c1, c0 + 0.25, c8 + 0.25, 3 / 8 + c1, 1 / 32 + 0.25, [
            ["planks", 0]
        ]);
        model.addBox(c0 + 0.25, c4 + c1, c15 / 2 + 0.25, c8 + 0.25, c6 + c1, c8 + 0.25, [
            ["planks", 0]
        ]);
        model.addBox(c0 + 0.25, c4 + c1, c1 / 2 + 0.25, c1 / 2 + 0.25, c6 + c1, c15 / 2 + 0.25, [
            ["planks", 0]
        ]);
        model.addBox(c15 / 2 + 0.25, c4 + c1, c1 / 2 + 0.25, c8 + 0.25, c6 + c1, c15 / 2 + 0.25, [
            ["planks", 0]
        ]);
        model.addBox(c1 / 2 + 0.25, c0 + c1, c1 / 2 + 0.25, c1 + 0.25, c9 / 2 + c1, c1 + 0.25, [
            ["planks", 0]
        ]);
        model.addBox(c7 + 0.25, c0 + c1, c7 + 0.25, c15 / 2 + 0.25, c9 / 2 + c1, c15 / 2 + 0.25, [
            ["planks", 0]
        ]);
        model.addBox(c7 + 0.25, c0 + c1, c1 / 2 + 0.25, c15 / 2 + 0.25, c9 / 2 + c1, c1 + 0.25, [
            ["planks", 0]
        ]);
        model.addBox(c1 / 2 + 0.25, c0 + c1, c7 + 0.25, c1 + 0.25, c9 / 2 + c1, c15 / 2 + 0.25, [
            ["planks", 0]
        ]);
        model.addBox(c0 + 0.25, 0.5623 / 2 + c1, c0 + 0.25, c8 + 0.25, 9.3 / 32 + c1, c8 + 0.25, [
            ["筛子", 2]
        ]);
        model.addBox(c1 / 2 + 0.25, 0.6255 / 2, c1 / 2 + 0.25, c15 / 2 + 0.25, c5, c15 / 2 + 0.25, [
            ["筛网", 0]
        ]);
        model.addBox(c1 / 2 + 0.25, 0.6255 / 2 + 0.05, c1 / 2 + 0.25, c15 / 2 + 0.25, c5 + ydata, c15 / 2 + 0.25, [
            [texture, 0]
        ]);
        render.addEntry(model);
        BlockRenderer.mapAtCoords(x, y, z, render);
    };
    Block.createBlock("ex_autosieve", [{
        name: "Auto Sieve",
        texture: [
            ["ex_top", 0],
            ["ex_top", 0],
            ["ex_side", 0],
            ["ex_side", 0],
            ["ex_side", 0],
            ["ex_side", 0]
        ],
        inCreative: true
    }]);
    Recipes.addShaped({
        id: BlockID.ex_autosieve,
        count: 1,
        data: 0
    }, ["aba", "bcb", "dbd"], ["a", VanillaBlockID.iron_block, 0, "b", VanillaBlockID.glass_pane, 0, "c", BlockID.ex_sieve_birch, 0, "d", VanillaItemID.iron_ingot, 0]);
    Recipes.addShaped({
        id: BlockID.ex_autosieve,
        count: 1,
        data: 0
    }, ["aba", "bcb", "dbd"], ["a", VanillaBlockID.iron_block, 0, "b", VanillaBlockID.glass_pane, 0, "c", BlockID.ex_sieve_acacia, 0, "d", VanillaItemID.iron_ingot, 0]);
    Recipes.addShaped({
        id: BlockID.ex_autosieve,
        count: 1,
        data: 0
    }, ["aba", "bcb", "dbd"], ["a", VanillaBlockID.iron_block, 0, "b", VanillaBlockID.glass_pane, 0, "c", BlockID.ex_sieve_big_oak, 0, "d", VanillaItemID.iron_ingot, 0]);
    Recipes.addShaped({
        id: BlockID.ex_autosieve,
        count: 1,
        data: 0
    }, ["aba", "bcb", "dbd"], ["a", VanillaBlockID.iron_block, 0, "b", VanillaBlockID.glass_pane, 0, "c", BlockID.ex_sieve_jungle, 0, "d", VanillaItemID.iron_ingot, 0]);
    Recipes.addShaped({
        id: BlockID.ex_autosieve,
        count: 1,
        data: 0
    }, ["aba", "bcb", "dbd"], ["a", VanillaBlockID.iron_block, 0, "b", VanillaBlockID.glass_pane, 0, "c", BlockID.ex_sieve_spruce, 0, "d", VanillaItemID.iron_ingot, 0]);
    Recipes.addShaped({
        id: BlockID.ex_autosieve,
        count: 1,
        data: 0
    }, ["aba", "bcb", "dbd"], ["a", VanillaBlockID.iron_block, 0, "b", VanillaBlockID.glass_pane, 0, "c", BlockID.ex_sieve_oak, 0, "d", VanillaItemID.iron_ingot, 0]);

    Block.setShape(BlockID.ex_autosieve, 0, 0, 0, 1, 1, 1);
    var autosieverender = new ICRender.CollisionShape();
    var entry = autosieverender.addEntry();
    entry.addBox(0, 0, 0, 1, 1, 1);
    BlockRenderer.setCustomCollisionShape(BlockID.ex_autosieve, 0, autosieverender);
    var render = new ICRender.Model();
    var model = BlockRenderer.Model();
    model.addBox(0, 0, 0, 1, 1 / 16, 1, [
        ["ex_top", 0]
    ])
    model.addBox(0, 15 / 16, 0, 1, 1, 1, [
        ["ex_top", 0]
    ])
    model.addBox(0, 0, 0, 1 / 16, 1, 1 / 16, [
        ["ex_side", 0]
    ])
    model.addBox(15 / 16, 0, 0, 1, 1, 1 / 16, [
        ["ex_side", 0]
    ])
    model.addBox(0, 0, 15 / 16, 1 / 16, 1, 1, [
        ["ex_side", 0]
    ])
    model.addBox(15 / 16, 0, 15 / 16, 1, 1, 1, [
        ["ex_side", 0]
    ])
    model.addBox(1 / 16, 1 / 16, 1 / 16, 15 / 16, 15 / 16, 2 / 16, [
        ["glass", 0]
    ])
    model.addBox(1 / 16, 1 / 16, 1 / 16, 2 / 16, 15 / 16, 15 / 16, [
        ["glass", 0]
    ])
    model.addBox(1 / 16, 1 / 16, 14 / 16, 15 / 16, 15 / 16, 15 / 16, [
        ["glass", 0]
    ])
    model.addBox(14 / 16, 1 / 16, 1 / 16, 15 / 16, 15 / 16, 15 / 16, [
        ["glass", 0]
    ])
    model.addBox(c0 + 0.25, c4 + c1, c0 + 0.25, c8 + 0.25, 3 / 8 + c1, 1 / 32 + 0.25, [
        ["planks", 0]
    ])
    model.addBox(c0 + 0.25, c4 + c1, c15 / 2 + 0.25, c8 + 0.25, c6 + c1, c8 + 0.25, [
        ["planks", 0]
    ])
    model.addBox(c0 + 0.25, c4 + c1, c1 / 2 + 0.25, c1 / 2 + 0.25, c6 + c1, c15 / 2 + 0.25, [
        ["planks", 0]
    ])
    model.addBox(c15 / 2 + 0.25, c4 + c1, c1 / 2 + 0.25, c8 + 0.25, c6 + c1, c15 / 2 + 0.25, [
        ["planks", 0]
    ])
    model.addBox(c1 / 2 + 0.25, c0 + c1, c1 / 2 + 0.25, c1 + 0.25, c9 / 2 + c1, c1 + 0.25, [
        ["planks", 0]
    ])
    model.addBox(c7 + 0.25, c0 + c1, c7 + 0.25, c15 / 2 + 0.25, c9 / 2 + c1, c15 / 2 + 0.25, [
        ["planks", 0]
    ])
    model.addBox(c7 + 0.25, c0 + c1, c1 / 2 + 0.25, c15 / 2 + 0.25, c9 / 2 + c1, c1 + 0.25, [
        ["planks", 0]
    ])
    model.addBox(c1 / 2 + 0.25, c0 + c1, c7 + 0.25, c1 + 0.25, c9 / 2 + c1, c15 / 2 + 0.25, [
        ["planks", 0]
    ])
    model.addBox(c1 / 2 + 0.25, 0.6255 / 2, c1 / 2 + 0.25, c15 / 2 + 0.25, c5 + 0.028, c15 / 2 + 0.25, [
        ["ex_string_mesh", 0]
    ])
    render.addEntry(model);
    BlockRenderer.enableCoordMapping(BlockID.ex_autosieve, 0, render);

    var AutoSieveUI = {
        standart: {
            header: {
                text: Translation.translate("Auto Sieve")
            }
        },
        drawing: [{
            type: "bitmap",
            x: (510 - UIbase * 0.49) + (UIbase / 12) * 2.3 - 2,
            y: (UIbase / 12) * 4.5 - (UIbase / 12) * 1.32 - 2,
            bitmap: "ex_sieve",
            scale: (UIbase / 170)
        }, {
            type: "bitmap",
            x: (510 - UIbase * 0.49) + (UIbase / 12) * 9.6 - 2,
            y: UIbase / 7.5 - 2,
            bitmap: "ex_energyground",
            scale: (UIbase / 170)
        }],
        elements: {
            jindu1: {
                type: "scale",
                x: (510 - UIbase * 0.49) + (UIbase / 12) * 2.3,
                y: (UIbase / 12) * 4.5 - (UIbase / 12) * 1.32,
                direction: 0,
                value: 0.5,
                bitmap: "ex_sievefull",
                scale: (UIbase / 170)
            },
            jindu2: {
                type: "scale",
                x: (510 - UIbase * 0.49) + (UIbase / 12) * 9.6,
                y: UIbase / 7.5 + 2,
                bitmap: "ex_energy",
                scale: (UIbase / 170),
                direction: 1
            },
            slot0: {
                type: "slot",
                x: (510 - UIbase * 0.49) + (UIbase / 12),
                y: (UIbase / 12) * 3.3,
                size: (UIbase / 12)
            }
        }
    };
    for (var i = 0; i < 20; i++) {
        AutoSieveUI.elements["slot" + (i + 1)] = {
            type: "slot",
            x: (510 - UIbase * 0.49) + (i % 5) * (UIbase / 12) + (UIbase / 12) * 3.7,
            y: 75 + parseInt(i / 5) * (UIbase / 12),
            size: (UIbase / 12)
        };
    };
    AutoSieveUI = new UIRegistry(AutoSieveUI);
    var prototype = {
        useNetworkItemContainer: true,
        defaultValues: {
            power_tier: 1,
            work_time: 160,
            energy_storage: 10000,
            energy_consumption: 2,
            progress: 0,
            meta: 0,
            isActive: false,
            AutoSieveOnce: false
        },
        tick: function() {
            StorageInterface.checkHoppers(this);
            var inputSlot = this.container.getSlot("slot0")
            var SievedBlock = Sieve.sieve.ex[inputSlot.id];
            if (SievedBlock) {
                if (this.data.energy >= this.data.energy_consumption) {
                    this.data.progress += 1 / this.data.work_time;
                    this.data.energy -= this.data.energy_consumption;
                    if (this.data.progress > 0.2 && this.data.progress < 0.4) {
                        this.setModel(0.2, SievedBlock.texture);
                    };
                    if (this.data.progress > 0.4 && this.data.progress < 0.6) {
                        this.setModel(0.15, SievedBlock.texture);
                    };
                    if (this.data.progress > 0.6 && this.data.progress < 0.8) {
                        this.setModel(0.1, SievedBlock.texture);
                    };
                    if (this.data.progress > 0.8 && this.data.progress < 1) {
                        this.setModel(0.05, SievedBlock.texture);
                    };
                    if (this.data.progress.toFixed(3) >= 1) {
                        BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
                        for (var a = 0; a < 6; a++) {
                            for (i in Sieve[inputSlot.id]) {
                                if (Math.random() * 100 <= Sieve[inputSlot.id][i].chance) {
                                    try {
                                        this.setOutput(i || 0, randomNum(Sieve[inputSlot.id][i].dropmin, Sieve[inputSlot.id][i].dropmax, 1 / 4) || 0, Sieve[inputSlot.id][i].data || 0);
                                    } catch (e) {}
                                };
                            };
                            a++;
                        };
                        inputSlot.setSlot(inputSlot.id, inputSlot.count - 1, inputSlot.data);
                        this.container.validateAll();
                        this.data.progress = 0;
                    };
                };
            } else {
                BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
                this.data.progress = 0;
            };
            var tier = this.getTier();
            var energyStorage = this.getEnergyStorage();
            this.data.energy = Math.min(this.data.energy, energyStorage);
            this.data.energy += api.ChargeRegistry.getEnergyFrom(this.container.getSlot("slotEnergy"), "Eu", energyStorage - this.data.energy, 32, tier);
            this.container.setScale("jindu1", this.data.progress);
            this.container.setScale("jindu2", this.data.energy / energyStorage);
            this.container.sendChanges();
        },
        destroy: function() {
            BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
        },
        setModel: function(ydata, texture) {
            this.data.AutoSieveOnce = true;
            this.networkData.putInt("ydata", ydata);
            this.networkData.putString("texture", texture);
            modelfunc(ydata, texture, this.x, this.y, this.z);
        },
        client: {
            renderModel: function() {
                let ydata = this.networkData.getInt("ydata");
                let texture = this.networkData.getString("texture");
                if (prototype.defaultValues.AutoSieveOnce != false) modelfunc(ydata, texture, this.x, this.y, this.z);
            },
            load: function() {
                this.renderModel();
                var self = this;
                this.networkData.addOnDataChangedListener(function(data, isExternal) {
                    self.renderModel();
                });
            }
        },
        setOutput: function(id, count, data) {
            for (var slot = 1; slot < 21; slot++) {
                var output = this.container.getSlot("slot" + slot);
                if (output.id == 0 || output.id == id && output.data == data && output.count < 64) {
                    if (output.count + count > 64) {
                        var output_count = 64 - output.count;
                        output.setSlot(id, output.count + output_count, data);
                        this.setOutput(id, (output.count + count - 64) - output_count, data);
                        this.container.sendChanges();
                    } else {
                        output.setSlot(id, output.count + count, data);
                        this.container.sendChanges();
                    };
                    break;
                };
            };
        },
        getScreenByName: function(screenName) {
            return AutoSieveUI;
        },
        getScreenName: function(screenName) {
            return "AutoSieveUI";
        },
        getEnergyStorage: function() {
            return this.data.energy_storage;
        },
        energyReceive: api.Machine.basicEnergyReceiveFunc
    };
    api.Machine.registerElectricMachine(BlockID.ex_autosieve, prototype);
});
StorageInterface.createInterface(BlockID.ex_autosieve, {
    slots: {
        "slot^1-20": {
            output: true
        },
        "slot0": {
            input: true
        }
    }
});