ModAPI.addAPICallback("ICore",
function(api) {
    IDRegistry.genBlockID("ex_autocompressedhammer");
    Block.createBlock("ex_autocompressedhammer", [{
        name: "Auto Compressed Hammer",
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
    Recipes.addShaped({id: BlockID.ex_autocompressedhammer, count: 1, data: 0}, ["aba", "aca", "aba"], ["a", ItemID.ingotSteel, 0, "b", VanillaBlockID.heavy_weighted_pressure_plate, 0, "c", ItemID.ex_hammersCompressedDiamond, 0]);
    var render = new ICRender.CollisionShape();
    var entry = render.addEntry();
    entry.addBox(0, 0, 0, 1, 1, 1);
    BlockRenderer.setCustomCollisionShape(BlockID.ex_autocompressedhammer, 0, render);
    render = new ICRender.Model();
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
    render.addEntry(model);
    BlockRenderer.setStaticICRender(BlockID.ex_autocompressedhammer, 0, render);
    var AutoCompressedHammerUI = {
        standart: {
            header: {
                text: Translation.translate("Auto Hammer")
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
            },
            slot21: {
                type: "slot",
                x: (510 - UIbase * 0.49) + (UIbase / 12),
                y: (UIbase / 12) * 5,
                size: (UIbase / 12)
            },
            slot22: {
                type: "slot",
                x: (510 - UIbase * 0.49) + (UIbase / 12) * 2,
                y: (UIbase / 12) * 5,
                size: (UIbase / 12)
            }
        }
    };
    for (var i = 0; i < 20; i++) {
        AutoCompressedHammerUI.elements["slot" + (i + 1)] = {
            type: "slot",
            x: (510 - UIbase * 0.49) + (i % 5) * (UIbase / 12) + (UIbase / 12) * 3.7,
            y: 75 + parseInt(i / 5) * (UIbase / 12),
            size: (UIbase / 12)
        };
    };
    AutoCompressedHammerUI = new UIRegistry(AutoCompressedHammerUI);


    CompressedCore.setMachineInPut("ex_autocompressedhammer", {});
    CompressedCore.machineAdd("ex_autocompressedhammer", BlockID.compressedgravel, 0, {
        id: 12,
        count: 9,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressedhammer", BlockID.compressedsand, 0, {
        id: BlockID.ex_dust,
        count: 9,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressedhammer", BlockID.compressednetherrack, 0, {
        id: BlockID.ex_gravelNether,
        count: 9,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressedhammer", BlockID.compressednethergravel, 0, {
        id: BlockID.ex_gravelEnder,
        count: 9,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressedhammer", BlockID.compressedcobblestone, 0, {
        id: 13,
        count: 9,
        data: 0
    });
    api.Machine.registerElectricMachine(BlockID.ex_autocompressedhammer, {
        useNetworkItemContainer: true,
        defaultValues: {
            work_time: 200,
            energy_storage: 10000,
            energy_consumption: 2,
            speed: 0,
            progress: 0
        },
        tick: function() {
            StorageInterface.checkHoppers(this);
            var input = this.container.getSlot("slot0"),
                st21 = this.container.getSlot("slot21"),
                st22 = this.container.getSlot("slot22"),
                recipe = CompressedCore.getMachineInPut("ex_autocompressedhammer", input.id, input.data);
            if (recipe) {
                if (this.data.energy >= this.data.energy_consumption) {
                    this.data.progress += (1 + this.data.speed) / this.data.work_time;
                    this.data.energy -= this.data.energy_consumption;
                    if (st21.count == 1) {
                        if (Math.random() * 100 < 5) {
                            st21.data++
                        }
                    }
                    if (st22.count == 1) {
                        if (Math.random() * 100 < 5) {
                            st22.data++
                        }
                    }
                    if (this.data.progress.toFixed(3) >= 1) {
                        this.setOutput(recipe.id, recipe.count, recipe.data);
                        input.count -= 1;
                        this.container.validateAll();
                        this.data.progress = 0
                    }
                }
            } else {
                this.data.progress = 0
            }
            var tier = this.getTier();
            var energyStorage = this.getEnergyStorage();
            this.data.energy = Math.min(this.data.energy, energyStorage);
            this.data.energy += api.ChargeRegistry.getEnergyFrom(this.container.getSlot("slotEnergy"), "Eu", energyStorage - this.data.energy, 32, tier);
            this.container.setScale("jindu1", this.data.progress);
            this.container.setScale("jindu2", this.data.energy / energyStorage);
            this.data.speed = st21.count + st22.count;
            this.container.sendChanges();
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
        getScreenByName: function() {
			return AutoCompressedHammerUI;
		},
		getScreenName: function() {
			return "AutoCompressedHammerUI";
		},
        init: function() {
            this.anim()
        },
        destroy: function() {
            if (this.ani_item) {
                this.ani_item.destroy()
            }
        },
        anim: function() {
            this.ani_item = new Animation.Item(this.x + 0.5, this.y + 0.5, this.z + 0.5);
            this.ani_item.describeItem({
                id: ItemID.ex_hammersCompressedDiamond,
                count: 1,
                data: 0,
                size: 0.5
            });
            this.ani_item.load()
        },
        getEnergyStorage: function() {
            return this.data.energy_storage
        },
        energyReceive: api.Machine.basicEnergyReceiveFunc
    });
    StorageInterface.createInterface(BlockID.ex_autocompressedhammer, {
        slots: {
            "slot^1-20": {output: true},
            "slot0": {input: true}
        }
    });
});

