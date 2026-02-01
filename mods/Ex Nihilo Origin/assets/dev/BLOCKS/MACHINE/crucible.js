(function() {
    IDRegistry.genBlockID("ex_crucibleRaw");
    Block.createBlock("ex_crucibleRaw", [{
        name: "Raw Crucible",
        texture: [
            ["enr_uncrucible", 0],
            ["enr_uncrucible", 2],
            ["enr_uncrucible", 1],
            ["enr_uncrucible", 1],
            ["enr_uncrucible", 1],
            ["enr_uncrucible", 1]
        ],
        inCreative: true
    }]);
    IDRegistry.genBlockID("ex_crucible");
    Block.createBlock("ex_crucible", [{
        name: "Crucible",
        texture: [
            ["enr_crucible", 0],
            ["enr_crucible", 2],
            ["enr_crucible", 1],
            ["enr_crucible", 1],
            ["enr_crucible", 1],
            ["enr_crucible", 1]
        ],
        inCreative: true
    }]);
    ToolAPI.registerBlockMaterial(BlockID["ex_crucible"], "stone");
    Block.registerNeighbourChangeFunction(BlockID["ex_crucible"], function(coords, block, changedCoords, blockSource) {
        if (changedCoords.y < coords.y) {
            let block = blockSource.getBlockId(changedCoords.x, changedCoords.y, changedCoords.z)
            let heatSource = Crucible.dataGet("energy", block, 0);
            World.getTileEntity(coords.x, coords.y, coords.z, blockSource)
                .data.energy = heatSource.energy
        }
    });
    World.setBlockChangeCallbackEnabled(BlockID["ex_crucible"], true);
    /* Callback.addCallback("BlockChanged", function (coords, block1, block2,a,b,blockSource) {
	if (block1.id==0&&block2.id == BlockID["ex_crucible"]){
	let block = blockSource.getBlockId(coords.x,coords.y-1,coords.z)
  let heatSource = Crucible.dataGet("energy", block, 0);
  if(heatSource){
    World.getTileEntity(coords.x,coords.y,coords.z,blockSource).data.energy=heatSource.energy
    }
		}
});*/
    var Crucible_boxes_1 = [
        [c0, c3, c0, c1, c16, c16],
        [c15, c3, c0, c16, c16, c16],
        [c1, c3, c0, c15, c16, c1],
        [c1, c3, c15, c15, c16, c16],
        [c1, c2, c1, c15, c3, c15],
        [c2, c1, c2, c14, c2, c14],
        [c0, c0, c0, c1, c3, c1],
        [c0, c0, c15, c1, c3, c16],
        [c1, c2, c1, c15, c3, c15]
    ];
    var Crucible_boxes_2 = [
        [c0, c3, c0, c1, c16, c16],
        [c15, c3, c0, c16, c16, c16],
        [c1, c3, c0, c15, c16, c1],
        [c1, c3, c15, c15, c16, c16],
        [c0, c0, c0, c1, c3, c1],
        [c0, c0, c15, c1, c3, c16],
        [c1, c2, c1, c15, c3, c15],
        [c15, c0, c0, c16, c3, c1],
        [c15, c0, c15, c16, c3, c16]
    ];
    var Crucible_boxes_3 = [
        [c2, c1, c2, c14, c2, c14],
        [c1, c2, c1, c15, c3, c15]
    ];
    var Crucible_tex_1 = [
        ["enr_crucible", 0]
    ];
    var Crucible_tex_2 = [
        ["enr_uncrucible", 0]
    ];
    (function() {
        var Collision = new ICRender.CollisionShape();
        var model = BlockRenderer.Model();
        var model2 = BlockRenderer.Model();
        Crucible_boxes_1.forEach(function(value) {
            Collision.addEntry()
                .addBox(value[0], value[1], value[2], value[3], value[4], value[5]);
        });
        BlockRenderer.setCustomCollisionShape(BlockID.ex_crucible, 0, Collision);
        BlockRenderer.setCustomCollisionShape(BlockID.ex_crucibleRaw, 0, Collision);
        Crucible_boxes_2.forEach(function(value) {
            model.addBox(value[0], value[1], value[2], value[3], value[4], value[5], BlockID.ex_crucible, 0);
            model2.addBox(value[0], value[1], value[2], value[3], value[4], value[5], BlockID.ex_crucibleRaw, 0);
        });
        Crucible_boxes_3.forEach(function(value) {
            model.addBox(value[0], value[1], value[2], value[3], value[4], value[5], Crucible_tex_1);
            model2.addBox(value[0], value[1], value[2], value[3], value[4], value[5], Crucible_tex_2);
        });
        var icRender1 = new ICRender.Model();
        var icRender2 = new ICRender.Model();
        icRender1.addEntry(model);
        icRender2.addEntry(model2);
        BlockRenderer.enableCoordMapping(BlockID.ex_crucible, 0, icRender1);
        BlockRenderer.enableCoordMapping(BlockID.ex_crucibleRaw, 0, icRender2);
    })();
    ToolAPI.registerBlockMaterial(BlockID.ex_crucible, "stone");
    ToolAPI.registerBlockMaterial(BlockID.ex_crucibleRaw, "stone");
    var crucibleUI = new UI.StandartWindow({
        standart: {
            header: {
                text: {
                    text: "Crusher"
                }
            },
            inventory: true,
            background: true
        },
        elements: {
            slotInPut: {
                type: "slot",
                x: 600,
                y: 146
            },
            slot3: {
                type: "slot",
                x: 670 + 70,
                y: 146
            }
        }
    });
    Crucible.dataSet("crucible", {
        "1:0": {
            addworktime: 2500,
            blockmodel: "stone",
            liquidmodel: "ex_lava",
            liquiddata: "lava",
            baseliquid: 0.0001
        },
        "4:0": {
            addworktime: 2500,
            blockmodel: "cobblestone",
            liquidmodel: "ex_lava",
            liquiddata: "lava",
            baseliquid: 0.0001
        },
        "13:0": {
            addworktime: 2500,
            blockmodel: "gravel",
            liquidmodel: "ex_lava",
            liquiddata: "lava",
            baseliquid: 0.0001
        }
    });
    Crucible.dataSet("energy", {
        "0:0": {
            energy: 0
        },
        "10:0": {
            energy: 3
        },
        "11:0": {
            energy: 2.5
        },
        "50:0": {
            energy: 1
        },
        "51:0": {
            energy: 1.5
        }
    });

    function CrucibleBoxFunc(ydata1, ydata2, ydata3, ydata4, data1, data2, x, y, z) {
        var model = BlockRenderer.Model();
        Crucible_boxes_2.forEach(function(value) {
            model.addBox(value[0], value[1], value[2], value[3], value[4], value[5], BlockID.ex_crucible, 0);
        });
        model.addBox(c1, c3, c1, c15, c4, c15, Crucible_tex_1);
        model.addBox(c1, ydata1, c1, c15, ydata2, c15, [
            [data1, 0]
        ]);
        model.addBox(c1, ydata3, c1, c15, ydata4, c15, [
            [data2, 0]
        ]);
        var icRender = new ICRender.Model();
        icRender.addEntry(model)
        BlockRenderer.mapAtCoords(x, y, z, icRender);
        var Collision = ICRender.CollisionShape();
        Crucible_boxes_2.forEach(function(value) {
            Collision.addEntry()
                .addBox(value[0], value[1], value[2], value[3], value[4], value[5]);
        });
        Collision.addEntry()
            .addBox(c1, ydata1, c1, c15, ydata2, c15);
        Collision.addEntry()
            .addBox(c1, ydata3, c1, c15, ydata4, c15);
        BlockRenderer.setCustomCollisionShape(BlockID.ex_crucible, 0, Collision);
    }
    StorageInterface.createInterface(BlockID["ex_crucible"], {
        slots: {
            "slotInPut": {
                input: true
            },
        },
        isValidInput: function(item, side, tileEntity) {
            return tileEntity.canInPut(item);
        }
    });
    TileEntity.registerPrototype(BlockID.ex_crucible, {
        useNetworkItemContainer: true,
        defaultValues: {
            worktime: 0,
            energy: 0,
            innerdata: null
        },

        init: function() {
            var stored = this.liquidStorage.getLiquidStored();
            var amount = this.liquidStorage.getAmount(stored);
            let block = this.blockSource.getBlockId(this.x, this.y - 1, this.z)
            let heatSource = Crucible.dataGet("energy", block, 0);
            if (heatSource) {
                this.data.energy = heatSource.energy
            }

            if (this.data.innerdata == null) {
                this.data.innerdata = {
                    baseliquid: 0,
                    addliquid: 0,
                    blockmodel: "air",
                    liquidmodel: "air",
                    liquiddata: "null"
                };
            }
            this.liquidStorage.setLimit("", 10);
            if (amount <= 0.1 && this.data.innerdata != null) {
                this.cruciblebox(c4, 1 - (10000 - this.data.worktime) * 0.000075, c4, c4, this.data.innerdata.blockmodel, "air");
            } else {
                this.cruciblebox(c4, c4, c4 + this.data.worktime * 0.000075, (amount / 10) * ((10000 - this.data.worktime) * 0.000075) + c4 + this.data.worktime * 0.000075, "air", this.data.innerdata.liquidmodel);
            }
        },
        client: {
            renderModel: function() {
                var ydata1 = this.networkData.getFloat("ydata1");
                var ydata2 = this.networkData.getFloat("ydata2");
                var ydata3 = this.networkData.getFloat("ydata3");
                var ydata4 = this.networkData.getFloat("ydata4");
                var data1 = this.networkData.getString("data1");
                var data2 = this.networkData.getString("data2");
                CrucibleBoxFunc(ydata1, ydata2, ydata3, ydata4, data1, data2, this.x, this.y, this.z);
            },
            load: function() {
                this.renderModel();
                var self = this;
                this.networkData.addOnDataChangedListener(function(data, isExternal) {
                    self.renderModel();
                });
            }
        },
        cruciblebox: function(ydata1, ydata2, ydata3, ydata4, data1, data2) {
            this.networkData.putFloat("ydata1", ydata1 ? ydata1 : 0);
            this.networkData.putFloat("ydata2", ydata2 ? ydata2 : 0);
            this.networkData.putFloat("ydata3", ydata3 ? ydata3 : 0);
            this.networkData.putFloat("ydata4", ydata4 ? ydata4 : 0);
            this.networkData.putString("data1", data1 ? data1 : "air");
            this.networkData.putString("data2", data2 ? data2 : "air");
            this.networkData.sendChanges();
            //CrucibleBoxFunc(ydata1, ydata2, ydata3, ydata4, data1, data2, this.x, this.y, this.z);
        },
        getLiquid: function(full, amount, id, data, count, player) {
            Game.prevent();
            var client = Network.getClientForPlayer(player);
            if (amount >= 1) {
                this.liquidStorage.getLiquid("lava", 1);
                new PlayerEntity(player)
                    .setCarriedItem(id, count - 1, data);
                new PlayerEntity(player)
                    .addItemToInventory(full.id, 1, full.data);
                return true;
            }
        },
        canInPut: function(item) {
        var stored = this.liquidStorage.getLiquidStored();
            var amount = this.liquidStorage.getAmount(stored);
            if (this.data.worktime <= 7500 && this.data.worktime / 10000 + amount < 10&&Crucible.dataGet("crucible", item.id, item.data)) {
                return true
            }
        },
        tick: function() {
            var input = this.container.getSlot("slotInPut");
            var stored = this.liquidStorage.getLiquidStored();
            var amount = this.liquidStorage.getAmount(stored);
            var get = Crucible.dataGet("crucible", input.id, input.data);
            //  var block = this.blockSource.getBlock(this.x, this.y - 1, this.z).id;
            // var energy = Crucible.dataGet("energy", block, 0);
StorageInterface.checkHoppers(this);
            if (this.data.energy) {
                this.data.innerdata.setliquid = floatObj.add(amount, floatObj.multiply(this.data.innerdata.baseliquid, this.data.energy));
            }
            if (this.liquidStorage.getLimit(this.data.innerdata.liquiddata) && amount < this.liquidStorage.getLimit(this.data.innerdata.liquiddata) && this.data.worktime > 0 && this.data.energy > 0) {
                this.liquidStorage.setAmount(this.data.innerdata.liquiddata, this.data.innerdata.setliquid);
                this.data.worktime -= this.data.energy;
            }
            //    if (this.data.worktime <= 7500 && this.data.worktime / 10000 + amount < 10) {
            //  this.setTransportSlots = ["slotInPut"];
            if (get) {
                input.count--;
                input.id = 0;
                this.data.innerdata.baseliquid = get.baseliquid;
                this.data.worktime += get.addworktime;
                this.data.innerdata.blockmodel = get.blockmodel;
                this.data.innerdata.liquidmodel = get.liquidmodel;
                this.data.innerdata.liquiddata = get.liquiddata;
            }


            if (this.data.worktime > 0 || amount > 0) {
                if (amount <= 0.1) {
                    this.cruciblebox(c4, 1 - (10000 - this.data.worktime) * 0.000075, c4, c4, this.data.innerdata.blockmodel, "air");
                } else {
                    this.cruciblebox(c4, c4, c4 + this.data.worktime * 0.000075, (amount / 10) * ((10000 - this.data.worktime) * 0.000075) + c4 + this.data.worktime * 0.000075, "air", this.data.innerdata.liquidmodel);
                }
            }
            if (this.data.worktime + amount * 1000 == 0) {
                BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
            }
        },
        click: function(id, count, data, coords, player) {
            var lava = this.liquidStorage.getAmount("lava");
            var input = this.container.getSlot("slotInPut");
            var get = Crucible.dataGet("crucible", id, data);
            var lavafull = LiquidRegistry.getFullItem(id, data, "lava");
            if (this.data.worktime <= 7500 && this.data.worktime / 10000 + lava < 10) {
                if (get) {
                    new PlayerEntity(player)
                        .setCarriedItem(id, count - 1, data);
                    input.id = id;
                    input.count++;
                    Game.prevent();
                }
            }
            id == ItemID.ex_crookwriter && Debug.message("LAVA:" + lava);
            lavafull && this.getLiquid(lavafull, lava, id, data, count, player);
        },
        getScreenName: function(player, coords) {
            var item = Entity.getCarriedItem(player);
            if (item.id == ItemID.ex_crookwriter) {
                return "crucibleUI";
            }
        },
        destroy: function() {
            BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
            var input = this.container.getSlot("slotInPut");

            input.count = 0;
        }
    });
})();