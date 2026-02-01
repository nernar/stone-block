ModAPI.addAPICallback("ICore",

function(api) {
    IDRegistry.genBlockID("ex_autocompressor");
    Block.createBlock("ex_autocompressor", [{
        name: "Auto Compressor",
        texture: [
            ["ex_bottom", 0],
            ["ex_compressor_top", 0],
            ["ex_bottom", 0],
            ["ex_bottom", 0],
            ["ex_bottom", 0],
            ["ex_bottom", 0]
        ],
        inCreative: true
    }], "opaque");
    Recipes.addShaped({
        id: BlockID.ex_autocompressor,
        count: 1,
        data: 0
    }, ["aba", "bcb", "aba"], ["a", VanillaBlockID.crafting_table, 0, "b", VanillaItemID.iron_ingot, 0, "c", VanillaBlockID.iron_block, 0]);
    var AutoCompressorUI = {
        standart: {
            header: {
                text: Translation.translate("Auto Compressor")
            }
        },
        drawing: [{
            type: "bitmap",
            x: (510 - UIbase * 0.49) + (UIbase / 12) * 4.5 - 2,
            y: (UIbase / 12) * 1.6 - 2,
            bitmap: "ex_sieve",
            scale: (UIbase / 170)
        }, {
            type: "bitmap",
            x: (510 - UIbase * 0.49) + (UIbase / 12) * 4.5 - 2,
            y: (UIbase / 12) * 3 - 2,
            bitmap: "ex_sieve",
            scale: (UIbase / 170)
        }, {
            type: "bitmap",
            x: (510 - UIbase * 0.49) + (UIbase / 12) * 4.5 - 2,
            y: (UIbase / 12) * 4.4 - 2,
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
                x: (510 - UIbase * 0.49) + (UIbase / 12) * 4.5,
                y: (UIbase / 12) * 1.6,
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
            jindu3: {
                type: "scale",
                x: (510 - UIbase * 0.49) + (UIbase / 12) * 4.5,
                y: (UIbase / 12) * 3,
                direction: 0,
                value: 0.5,
                bitmap: "ex_sievefull",
                scale: (UIbase / 170)
            },
            jindu4: {
                type: "scale",
                x: (510 - UIbase * 0.49) + (UIbase / 12) * 4.5,
                y: (UIbase / 12) * 4.4,
                direction: 0,
                value: 0.5,
                bitmap: "ex_sievefull",
                scale: (UIbase / 170)
            }
        }
    };
    for (var i = 0; i < 12; i++) {
        AutoCompressorUI.elements["Slot" + (1 + i)] = {
            type: "slot",
            x: (510 - UIbase * 0.49) + (1 + i % 3) * (UIbase / 12),
            y: (1.6 + parseInt(i / 3)) * (UIbase / 12),
            size: (UIbase / 12)
        };
    };
    for (var i = 12; i < 24; i++) {
        AutoCompressorUI.elements["Slot" + (1 + i)] = {
            type: "slot",
            x: (510 - UIbase * 0.49) + (6 + i % 3) * (UIbase / 12),
            y: (1.6 + parseInt((i - 12) / 3)) * (UIbase / 12),
            size: (UIbase / 12)
        };
    };

    AutoCompressorUI = new UIRegistry(AutoCompressorUI);
    CompressedCore.setMachineInPut("ex_autocompressor", {});
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_Ironbroken, 0, {
        id: BlockID.ex_Irongravel,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_Goldbroken, 0, {
        id: BlockID.ex_Goldgravel,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_Copperbroken, 0, {
        id: BlockID.ex_Coppergravel,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_Tinbroken, 0, {
        id: BlockID.ex_Tingravel,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_Leadbroken, 0, {
        id: BlockID.ex_Leadgravel,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_Silverbroken, 0, {
        id: BlockID.ex_Silvergravel,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_Platinumbroken, 0, {
        id: BlockID.ex_Platinumgravel,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_Aluminumbroken, 0, {
        id: BlockID.ex_Aluminumgravel,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_Nickelbroken, 0, {
        id: BlockID.ex_Nickelgravel,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.crushediron, 0, {
        id: BlockID.ex_Ironsand,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.crushedgold, 0, {
        id: BlockID.ex_Goldsand,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.crushedcopper, 0, {
        id: BlockID.ex_Coppersand,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.crushedtin, 0, {
        id: BlockID.ex_Tinsand,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.crushedlead, 0, {
        id: BlockID.ex_Leadsand,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.crushedsilver, 0, {
        id: BlockID.ex_Silversand,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.crushedplatinum, 0, {
        id: BlockID.ex_Platinumsand,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.crushedaluminum, 0, {
        id: BlockID.ex_Aluminumsand,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.crushednickel, 0, {
        id: BlockID.ex_Nickelsand,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_IronpoweredIron, 0, {
        id: BlockID.ex_Irondust,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_GoldpoweredIron, 0, {
        id: BlockID.ex_Golddust,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_CopperpoweredIron, 0, {
        id: BlockID.ex_Copperdust,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_TinpoweredIron, 0, {
        id: BlockID.ex_Tindust,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_LeadpoweredIron, 0, {
        id: BlockID.ex_Leaddust,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_SilverpoweredIron, 0, {
        id: BlockID.ex_Silverdust,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_PlatinumpoweredIron, 0, {
        id: BlockID.ex_Platinumdust,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_AluminumpoweredIron, 0, {
        id: BlockID.ex_Aluminumdust,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_NickelpoweredIron, 0, {
        id: BlockID.ex_Nickeldust,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_netherIronBroken, 0, {
        id: BlockID.ex_netherIrongravel,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_netherGoldBroken, 0, {
        id: BlockID.ex_netherGoldgravel,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_netherCopperBroken, 0, {
        id: BlockID.ex_netherCoppergravel,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_netherTinBroken, 0, {
        id: BlockID.ex_netherTingravel,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_netherLeadBroken, 0, {
        id: BlockID.ex_netherLeadgravel,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_netherSilverBroken, 0, {
        id: BlockID.ex_netherSilvergravel,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_netherPlatinumBroken, 0, {
        id: BlockID.ex_netherPlatinumgravel,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_netherAluminumBroken, 0, {
        id: BlockID.ex_netherAluminumgravel,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_netherNickelBroken, 0, {
        id: BlockID.ex_netherNickelgravel,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_enderIronBroken, 0, {
        id: BlockID.ex_enderIrongravel,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_enderGoldBroken, 0, {
        id: BlockID.ex_enderGoldgravel,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_enderCopperBroken, 0, {
        id: BlockID.ex_enderCoppergravel,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_enderTinBroken, 0, {
        id: BlockID.ex_enderTingravel,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_enderLeadBroken, 0, {
        id: BlockID.ex_enderLeadgravel,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_enderSilverBroken, 0, {
        id: BlockID.ex_enderSilvergravel,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_enderPlatinumBroken, 0, {
        id: BlockID.ex_enderPlatinumgravel,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_enderAluminumBroken, 0, {
        id: BlockID.ex_enderAluminumgravel,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", ItemID.ex_enderNickelBroken, 0, {
        id: BlockID.ex_enderNickelgravel,
        count: 4,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", 3, 0, {
        id: BlockID.compresseddirt,
        count: 9,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", 13, 0, {
        id: BlockID.compressedgravel,
        count: 9,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", 12, 0, {
        id: BlockID.compressedsand,
        count: 9,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", BlockID.ex_dust, 0, {
        id: BlockID.compresseddust,
        count: 9,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", 87, 0, {
        id: BlockID.compressednetherrack,
        count: 9,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", 1, 0, {
        id: BlockID.compressedstone,
        count: 9,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", 318, 0, {
        id: BlockID.compressedflint,
        count: 9,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", 4, 0, {
        id: BlockID.compressedcobblestone,
        count: 9,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", BlockID.ex_gravelNether, 0, {
        id: BlockID.compressednethergravel,
        count: 9,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", 121, 0, {
        id: BlockID.compressedendstone,
        count: 9,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", BlockID.ex_gravelEnder, 0, {
        id: BlockID.compressedendergravel,
        count: 9,
        data: 0
    });
    CompressedCore.machineAdd("ex_autocompressor", 88, 0, {
        id: BlockID.compressedsoulsand,
        count: 9,
        data: 0
    });
    api.Machine.registerElectricMachine(BlockID.ex_autocompressor, {
        useNetworkItemContainer: true,
        defaultValues: {
            power_tier: 1,
            work_time: 200,
            energy_storage: 10000,
            energy_consumption: 2,
            recipe: {},
            decreaseCount: 0,
            isWorking: {},
            workingItemId: 0,
            progress: 0,
            slotCount: {}
        },
        decreaseItem: function(id, count) {
            for (var slotid = 1; slotid < 13; slotid++) {
                var slot = this.container.getSlot("Slot" + slotid);
                if (slot.id == id && slot.count > 0) {
                    (slot.count - 1 == 0) ? slot.setSlot(0, 0, 0) : slot.setSlot(id, slot.count - 1, slot.data);
                    this.data.slotCount[slotid][slot.id] -= 1;
                    this.data.decreaseCount += 1;
                    break;
                };
            };
            if (this.data.decreaseCount < count) {
                this.decreaseItem(id, count);
            } else {
                this.data.decreaseCount = 0;
            };
        },
        getItemCount: function(id) {
            var count = 0;
            for (var slotId in this.data.slotCount) {
                for (var itemId in this.data.slotCount[slotId]) {
                    if (itemId == id) {
                        count += this.data.slotCount[slotId][itemId];
                    };
                };
            };
            return count;
        },
        init: function() {
            for (var slotid = 1; slotid < 13; slotid++) {
                this.container.setSlotAddTransferPolicy("Slot" + slotid, function(container, name, id, count, data, extra, player) {
                    if (CompressedCore.getMachineInPut("ex_autocompressor", id, data)) {
                        return count;
                    } else {
                        return 0
                    }
                });
            };
        },
        tick: function() {
            StorageInterface.checkHoppers(this);
            for (var slotid = 1; slotid < 13; slotid++) {
                let slot = this.container.getSlot("Slot" + slotid);
                if (CompressedCore.getMachineInPut("ex_autocompressor", slot.id, slot.data)) {
                    let item = CompressedCore.getMachineInPut("ex_autocompressor", slot.id, slot.data);
                    if (!this.data.recipe[slot.id]) {
                        this.data.recipe[slot.id] = {
                            item: item,
                            slotId: slotid,
                            id: slot.id
                        };
                    };
                };
                if (this.data.slotCount && this.data.slotCount[slotid] == null || this.data.slotCount[slotid] == undefined) {
                    this.data.slotCount[slotid] = {};
                    this.data.slotCount[slotid][slot.id] = slot.count;
                    this.data.slotCount[slotid][slot.id] = this.data.slotCount[slotid][slot.id] < 0 ? 0 : this.data.slotCount[slotid][slot.id];
                } else {
                    this.data.slotCount[slotid][slot.id] = slot.count;
                    this.data.slotCount[slotid][slot.id] = this.data.slotCount[slotid][slot.id] < 0 ? 0 : this.data.slotCount[slotid][slot.id];
                };
                if (slot.id == 0) {
                    for (var itemCount in this.data.slotCount[slotid]) {
                        this.data.slotCount[slotid][itemCount] = 0;
                    };
                };
            };

            for (let itemId in this.data.recipe) {
                if (this.data.recipe[itemId]) {
                    if (this.data.workingItemId == 0) {
                        if (this.getItemCount(itemId) >= this.data.recipe[itemId]["item"]["count"]) {
                            if (this.data.workingItemId != itemId) {
                                this.data.progress = 0;
                            };
                            this.data.workingItemId = itemId;
                            this.data.isWorking[itemId] = true;
                        } else {
                            this.data.isWorking[itemId] = false;
                        };
                    };
                };
            };

            if (!this.data.isWorking[this.data.workingItemId]) {
                this.data.workingItemId = 0;
                this.data.progress = 0;
            };
            if (this.data.isWorking[this.data.workingItemId] && this.getItemCount(this.data.workingItemId) < this.data.recipe[this.data.workingItemId]["item"]["count"]) {
                this.data.workingItemId = 0;
                this.data.progress = 0;
            };

            if (this.data.isWorking[this.data.workingItemId]) {
                if (this.data.energy >= this.data.energy_consumption && this.canOutput(this.data.recipe[this.data.workingItemId]["item"]["id"])) {
                    this.data.progress += 1 / this.data.work_time;
                    this.data.energy -= this.data.energy_consumption;
                    if (this.data.progress.toFixed(3) >= 1) {
                        this.setOutput(this.data.recipe[this.data.workingItemId]["item"]["id"]);
                        this.decreaseItem(this.data.recipe[this.data.workingItemId]["id"], this.data.recipe[this.data.workingItemId]["item"]["count"]);
                        this.data.progress = 0;
                        this.data.recipe = {};
                        this.data.isWorking[this.data.workingItemId] = false;
                        this.data.workingItemId = 0;
                    };
                };
            };
            var tier = this.getTier();
            var energyStorage = this.getEnergyStorage();
            this.data.energy = Math.min(this.data.energy, energyStorage);
            this.data.energy += api.ChargeRegistry.getEnergyFrom(this.container.getSlot("slotEnergy"), "Eu", energyStorage - this.data.energy, 32, tier);
            this.container.setScale("jindu1", this.data.progress);
            this.container.setScale("jindu3", this.data.progress);
            this.container.setScale("jindu4", this.data.progress);
            this.container.setScale("jindu2", this.data.energy / energyStorage);
            this.container.sendChanges();
        },
        canOutput: function(id) {
            this.boolean = false;
            for (var slot = 13; slot < 25; slot++) {
                var output = this.container.getSlot("Slot" + slot);
                if ((output.id == 0 || output.id == id) && output.count < 64) {
                    this.boolean = true;
                    break;
                };
                if (output.id != 0 && (output.id != id || output.count == 64)) {
                    this.boolean = false;
                };
            };
            return this.boolean;
        },
        setOutput: function(id) {
            for (var slot = 13; slot < 25; slot++) {
                var output = this.container.getSlot("Slot" + slot);
                if ((output.id == 0 || output.id == id) && output.count < 64) {
                    output.setSlot(id, output.count + 1, 0);
                    this.container.sendChanges();
                    break;
                };
            };
        },
        getScreenByName: function() {
            return AutoCompressorUI;
        },
        getScreenName: function() {
            return "AutoCompressorUI";
        },
        getEnergyStorage: function() {
            return this.data.energy_storage
        },
        energyReceive: api.Machine.basicEnergyReceiveFunc
    });
    StorageInterface.createInterface(BlockID.ex_autocompressor, {
        slots: {
            "Slot^11-24": {
                output: true
            },
            "Slot^0-12": {
                input: true
            }
        }
    });
})