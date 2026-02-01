ModAPI.addAPICallback("ICore", function(api) {
    IDRegistry.genBlockID("ex_autoheavysieve");
    Block.createBlock("ex_autoheavysieve", [{
        name: "Auto Heavy Sieve",
        texture: [
            ["ex_bottom", 0],
            ["ex_bottom", 0],
            ["ex_heavy", 0],
            ["ex_heavy", 0],
            ["ex_heavy", 0],
            ["ex_heavy", 0]
        ],
        inCreative: true
    }]);
    Recipes.addShaped({id: BlockID.ex_autoheavysieve, count: 1, data: 0}, ["aba", "bcb", "dbd"], ["a", BlockID.blockSteel, 0, "b", VanillaBlockID.glass_pane, 0, "c", BlockID.ex_heavysieve_oak, 0, "d", ItemID.ingotSteel, 0]);
    var modelfunc = function(ydata, texture, x, y, z) {
        var render = new ICRender.Model();
        var model = BlockRenderer.Model();
        model.addBox(0, 0, 0, 1, 1 / 16, 1, [
            ["ex_bottom", 0]
        ]);
        model.addBox(0, 15 / 16, 0, 1, 1, 1, [
            ["ex_bottom", 0]
        ]);
        model.addBox(0, 0, 0, 1 / 16, 1, 1 / 16, [
            ["ex_heavy", 0]
        ]);
        model.addBox(15 / 16, 0, 0, 1, 1, 1 / 16, [
            ["ex_heavy", 0]
        ]);
        model.addBox(0, 0, 15 / 16, 1 / 16, 1, 1, [
            ["ex_heavy", 0]
        ]);
        model.addBox(15 / 16, 0, 15 / 16, 1, 1, 1, [
            ["ex_heavy", 0]
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
        model.addBox(c0 + 0.25, c5, c0 + 0.25, c8 + 0.25, c10 - c1, 1 / 32 + 0.25, [
            ["log_oak", 0]
        ]);
        model.addBox(c0 + 0.25, c5, c15 / 2 + 0.25, c8 + 0.25, c10 - c1, c8 + 0.25, [
            ["log_oak", 0]
        ]);
        model.addBox(c0 + 0.25, c5, c1 / 2 + 0.25, c1 / 2 + 0.25, c10 - c1, c15 / 2 + 0.25, [
            ["log_oak", 0]
        ]);
        model.addBox(c15 / 2 + 0.25, c5, c1 / 2 + 0.25, c8 + 0.25, c10 - c1, c15 / 2 + 0.25, [
            ["log_oak", 0]
        ]);
        model.addBox(c1 / 2 + 0.25, c0 + c1, c1 / 2 + 0.25, c3 / 2 + 0.25, c11 / 2, c3 / 2 + 0.25, [
            ["log_oak", 0]
        ]);
        model.addBox(c13 / 2 + 0.25, c0 + c1, c13 / 2 + 0.25, c15 / 2 + 0.25, c11 / 2, c15 / 2 + 0.25, [
            ["log_oak", 0]
        ]);
        model.addBox(c13 / 2 + 0.25, c0 + c1, c1 / 2 + 0.25, c15 / 2 + 0.25, c11 / 2, c3 / 2 + 0.25, [
            ["log_oak", 0]
        ]);
        model.addBox(c1 / 2 + 0.25, c0 + c1, c13 / 2 + 0.25, c3 / 2 + 0.25, c11 / 2, c15 / 2 + 0.25, [
            ["log_oak", 0]
        ]);
        model.addBox(0.05 / 2 + 0.25, 0.72 / 2 + 0.03, 0.05 / 2 + 0.25, 0.99375 / 2 + 0.23, 0.71 / 2 + ydata, 0.99375 / 2 + 0.23, [
            [texture, 0]
        ]);
        model.addBox(0.05 / 2 + 0.25, 0.72 / 2, 0.05 / 2 + 0.25, 0.99375 / 2 + 0.23, 0.71 / 2, 0.99375 / 2 + 0.23, [
            ["ex_string_mesh", 0]
        ]);
        render.addEntry(model);
        BlockRenderer.mapAtCoords(x, y, z, render);
    };

    var render = new ICRender.CollisionShape();
    var entry = render.addEntry();
    entry.addBox(c1, c0, c1, c15, c16, c15);
    BlockRenderer.setCustomCollisionShape(BlockID.ex_autoheavysieve, 0, render);

    var render = new ICRender.Model();
    var model = BlockRenderer.Model();
    model.addBox(0, 0, 0, 1, 1 / 16, 1, [
        ["ex_bottom", 0]
    ]);
    model.addBox(0, 15 / 16, 0, 1, 1, 1, [
        ["ex_bottom", 0]
    ]);
    model.addBox(0, 0, 0, 1 / 16, 1, 1 / 16, [
        ["ex_heavy", 0]
    ]);
    model.addBox(15 / 16, 0, 0, 1, 1, 1 / 16, [
        ["ex_heavy", 0]
    ]);
    model.addBox(0, 0, 15 / 16, 1 / 16, 1, 1, [
        ["ex_heavy", 0]
    ]);
    model.addBox(15 / 16, 0, 15 / 16, 1, 1, 1, [
        ["ex_heavy", 0]
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
    model.addBox(c0 + 0.25, c5, c0 + 0.25, c8 + 0.25, c10 - c1, 1 / 32 + 0.25, [
        ["log_oak", 0]
    ]);
    model.addBox(c0 + 0.25, c5, c15 / 2 + 0.25, c8 + 0.25, c10 - c1, c8 + 0.25, [
        ["log_oak", 0]
    ]);
    model.addBox(c0 + 0.25, c5, c1 / 2 + 0.25, c1 / 2 + 0.25, c10 - c1, c15 / 2 + 0.25, [
        ["log_oak", 0]
    ]);
    model.addBox(c15 / 2 + 0.25, c5, c1 / 2 + 0.25, c8 + 0.25, c10 - c1, c15 / 2 + 0.25, [
        ["log_oak", 0]
    ]);
    model.addBox(c1 / 2 + 0.25, c0 + c1, c1 / 2 + 0.25, c3 / 2 + 0.25, c11 / 2, c3 / 2 + 0.25, [
        ["log_oak", 0]
    ]);
    model.addBox(c13 / 2 + 0.25, c0 + c1, c13 / 2 + 0.25, c15 / 2 + 0.25, c11 / 2, c15 / 2 + 0.25, [
        ["log_oak", 0]
    ]);
    model.addBox(c13 / 2 + 0.25, c0 + c1, c1 / 2 + 0.25, c15 / 2 + 0.25, c11 / 2, c3 / 2 + 0.25, [
        ["log_oak", 0]
    ]);
    model.addBox(c1 / 2 + 0.25, c0 + c1, c13 / 2 + 0.25, c3 / 2 + 0.25, c11 / 2, c15 / 2 + 0.25, [
        ["log_oak", 0]
    ]);
    model.addBox(0.05 / 2 + 0.25, 0.72 / 2, 0.05 / 2 + 0.25, 0.99375 / 2 + 0.23, 0.71 / 2, 0.99375 / 2 + 0.23, [
        ["ex_string_mesh", 0]
    ]);
    render.addEntry(model);
    BlockRenderer.enableCoordMapping(BlockID.ex_autoheavysieve, 0, render);

    var AutoHeavySieveUI = {
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
        AutoHeavySieveUI.elements["slot" + (i + 1)] = {
            type: "slot",
            x: (510 - UIbase * 0.49) + (i % 5) * (UIbase / 12) + (UIbase / 12) * 3.7,
            y: 75 + parseInt(i / 5) * (UIbase / 12),
            size: (UIbase / 12)
        };
    };
    AutoHeavySieveUI = new UIRegistry(AutoHeavySieveUI);

    var prototype = {
        useNetworkItemContainer: true,
        defaultValues: {
            power_tier: 1,
            work_time: 160,
            energy_storage: 10000,
            energy_consumption: 2,
            progress: 0,
            AutoHeavySieveOnce: false
        },
        tick: function() {
            var inputSlot = this.container.getSlot("slot0")
            var SievedBlock = Sieve.sieve.co[inputSlot.id];
            StorageInterface.checkHoppers(this);
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
                        for (var a = 0; a < 20; a++) {
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
            this.data.AutoHeavySieveOnce = true;
            this.networkData.putInt("ydata", ydata);
            this.networkData.putString("texture", texture);
            modelfunc(ydata, texture, this.x, this.y, this.z);
        },
        client: {
            renderModel: function() {
                let ydata = this.networkData.getInt("ydata");
                let texture = this.networkData.getString("texture");
                if (prototype.defaultValues.AutoHeavySieveOnce != false) modelfunc(ydata, texture, this.x, this.y, this.z);
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
        getScreenByName: function(name) {
            return AutoHeavySieveUI;
        },
        getScreenName: function(name) {
            return "AutoHeavySieveUI";
        },
        getEnergyStorage: function() {
            return this.data.energy_storage;
        },
        energyReceive: api.Machine.basicEnergyReceiveFunc
    };
    api.Machine.registerElectricMachine(BlockID.ex_autoheavysieve, prototype);
    StorageInterface.createInterface(BlockID.ex_autoheavysieve, {
        slots: {
            "slot^1-20": {output: true},
            "slot0": {input: true}
        }
    });
})