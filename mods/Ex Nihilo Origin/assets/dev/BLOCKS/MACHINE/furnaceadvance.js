IDRegistry.genBlockID("ex_furnace");
Block.createBlock("ex_furnace", [{
        name: "Furnace",
        texture: [
            ["ex_furnace_top", 0],
            ["ex_furnace_top", 0],
            ["ex_furnace_side", 0],
            ["ex_furnace_front_off", 0],
            ["ex_furnace_side", 0],
            ["ex_furnace_side", 0]
        ],
        inCreative: false
    }], {
    sound: "stone"
});
ToolAPI.registerBlockMaterial(BlockID["ex_furnace"], "stone");
TileRender_private.setStandartModel(BlockID.ex_furnace, [
    ["ex_furnace_top", 0],
    ["ex_furnace_top", 0],
    ["ex_furnace_side", 0],
    ["ex_furnace_front_off", 0],
    ["ex_furnace_side", 0],
    ["ex_furnace_side", 0]
]);
TileRender_private.registerRotationModel(BlockID.ex_furnace, 0, [
    ["ex_furnace_top", 0],
    ["ex_furnace_top", 0],
    ["ex_furnace_side", 0],
    ["ex_furnace_front_off", 0],
    ["ex_furnace_side", 0],
    ["ex_furnace_side", 0]
]);
TileRender_private.registerRotationModel(BlockID.ex_furnace, 4, [
    ["ex_furnace_top", 0],
    ["ex_furnace_top", 0],
    ["ex_furnace_side", 0],
    ["ex_furnace_front_on", 0],
    ["ex_furnace_side", 0],
    ["ex_furnace_side", 0]
]);

Block.registerPlaceFunction(BlockID.ex_furnace0, function(coords, item, block, player, region) {
			if(region.getBlockId(coords.x, coords.y, coords.z)==BlockID.ex_furnace0&&Entity.getSneaking(player)){
			let tile = TileEntity.getTileEntity(coords.x, coords.y, coords.z,region)
			let desert = tile.container.getSlot("desert");
            let result = tile.container.getSlot("result");
            let fuel = tile.container.getSlot("fuel");
            let data = tile.data;
            let desertSlot = {
            id:desert.id,
            count:desert.count,
            data:desert.data,
            extra:desert.extra
            };
            let resultSlot = {
            id:result.id,
            count:result.count,
            data:result.data,
            extra:result.extra
            };
            let fuelSlot = {
            id:fuel.id,
            count:fuel.count,
            data:fuel.data,
            extra:fuel.extra
            };
            desert.setSlot(0,0,0);
            result.setSlot(0,0,0)
            fuel.setSlot(0,0,0)
            BlockRenderer.unmapAtCoords(coords.x, coords.y, coords.z);
            TileEntity.destroyTileEntity(tile)
			region.setBlock(coords.x, coords.y, coords.z, BlockID.ex_furnace, 0);
			let newtile = TileEntity.addTileEntity(coords.x, coords.y, coords.z);
			newtile.container.getSlot("desert").setSlot(desertSlot.id,desertSlot.count,desertSlot.data);
			newtile.container.getSlot("result").setSlot(resultSlot.id,resultSlot.count,resultSlot.data);
			newtile.container.getSlot("fuel").setSlot(fuelSlot.id,fuelSlot.count,fuelSlot.data);
			newtile.data = data;
			World.playSound(coords.x, coords.y, coords.z, "dig.stone", 1, 0.8)
			TileRender_private.mapAtCoords(coords.x, coords.y, coords.z, tile.data.meta);
			}else{
			let place = World.canTileBeReplaced(block.id, block.data) ? coords : coords.relative;
			region.setBlock(place.x, place.y, place.z, item.id, 0);
			World.playSound(place.x, place.y, place.z,  "dig.stone", 1, 0.8)
			let rotation = TileRender_private.getBlockRotation(player, false);
			let tile = TileEntity.addTileEntity(place.x, place.y, place.z, region);
			tile.data.meta = rotation;
			TileRender_private.mapAtCoords(place.x, place.y, place.z, item.id, rotation);
			return place;
			}
		});


(function () {
    var FurnaceGui = new UI.StandartWindow({
        standart: {
            header: {
                text: {
                    text: Translation.translate("Furnace")
                }
            },
            inventory: {
                standart: true
            },
            background: {
                standart: true
            }
        },
        drawing: [{
                type: "bitmap",
                x: 480,
                y: 210,
                bitmap: "arrow_0",
                scale: 3
            },
            {
                type: "bitmap",
                x: 480,
                y: 150,
                bitmap: "arrow_0",
                scale: 3
            }, {
                type: "bitmap",
                x: 400,
                y: 210,
                bitmap: "fire_0",
                scale: 4
            }],
        elements: {
            "fireScale": {
                type: "scale",
                x: 400,
                y: 210,
                direction: 1,
                value: 0.5,
                bitmap: "fire_1",
                scale: 4
            },
            "arrowScale": {
                type: "scale",
                x: 480,
                y: 210,
                direction: 0,
                value: 0.5,
                bitmap: "arrow_1",
                scale: 3
            },
            "arrowScale1": {
                type: "scale",
                x: 480,
                y: 150,
                direction: 0,
                value: 0.5,
                bitmap: "arrow_1",
                scale: 3
            },
            "desert": {
                type: "slot",
                x: 400,
                y: 130,
                size: 60
            },
            "result": {
                type: "slot",
                x: 560,
                y: 200,
                size: 60
            },
            "desert1": {
                type: "slot",
                x: 400,
                y: 70,
                size: 60
            },
            "result1": {
                type: "slot",
                x: 560,
                y: 140,
                size: 60
            },
            "fuel": {
                type: "slot",
                x: 400,
                y: 270,
                size: 60
            }
        }
    });
    TileEntity.registerPrototype(BlockID.ex_furnace, {
        useNetworkItemContainer: true,
        defaultValues: {
            isActive: false,
            burn: 0,
            burnMax: 200,
            make: 0,
            make1: 0,
            meta: 0,
            isCreate: false,
            isCreate1: false
        },
        getFacing: function () {
            return this.data.meta + 4
        },
        init: function () {
            //this.blockSource.setBlock(this.x, this.y, this.z, this.blockID, this.data.meta + 4);
            this.networkData.putInt("blockId", this.blockID);
            this.networkData.putInt("meta", this.data.meta);
            this.networkData.putInt("blockData", this.getFacing());
            this.container.setSlotAddTransferPolicy("desert", function (container, name, id, count, data, extra, player) {
                if (Recipes.getFurnaceRecipeResult(id, data)) {
                    return count;
                }
                else {
                    return 0;
                }
            });
            this.container.setSlotAddTransferPolicy("fuel", function (container, name, id, count, data) {
                if (Recipes.getFuelBurnDuration(id, data) > 0) {
                    return count;
                }
                else {
                    return 0;
                }
            });
            this.container.setSlotAddTransferPolicy("result", function () {
                return 0;
            });
            this.container.setSlotAddTransferPolicy("desert1", function (container, name, id, count, data, extra, player) {
                if (Recipes.getFurnaceRecipeResult(id, data)) {
                    return count;
                }
                else {
                    return 0;
                }
            });
            
            this.container.setSlotAddTransferPolicy("result1", function () {
                return 0;
            });
            this.networkData.sendChanges();
        },
        client: {
            renderModel: function () {
                if (this.networkData.getBoolean("isActive")) {
                    var blockId = Network.serverToLocalId(this.networkData.getInt("blockId"));
                    var blockData = this.networkData.getInt("blockData");
                    TileRender_private.mapAtCoords(this.x, this.y, this.z, blockId, blockData);
                }
                if (!this.networkData.getBoolean("isActive")) {
                    var blockId = Network.serverToLocalId(this.networkData.getInt("blockId"));
                    var meta = this.networkData.getInt("meta");
                    TileRender_private.mapAtCoords(this.x, this.y, this.z, blockId, meta);
                }
            },
            load: function () {
                this.renderModel();
                var self = this;
                this.networkData.addOnDataChangedListener(function (data, isExternal) {
                    self.renderModel();
                });
            }
        },
        getFuel: function (Name) {
            var fuelSlot = this.container.getSlot(Name);
            var fuel = Recipes.getFuelBurnDuration(fuelSlot.id, fuelSlot.data);
            if (fuelSlot.id == 325 && fuelSlot.data == 10) {
                this.container.setSlot(Name, fuelSlot.id, 1, 0);
            }
            else if (fuel > 0) {
                this.container.setSlot(Name, fuelSlot.id, fuelSlot.count - 1, 0);
                this.container.validateSlot(Name);
            }
            return this.data.burnMax = this.data.burn = fuel;
        },
        tick: function () {
            var desert = this.container.getSlot("desert");
            var desert1 = this.container.getSlot("desert1");
            var resultSlot = this.container.getSlot("result");
            var resultSlot1 = this.container.getSlot("result1");
            var fuelSlot = this.container.getSlot("fuel");
            var result = Recipes.getFurnaceRecipeResult(desert.id, desert.data);
            var result1 = Recipes.getFurnaceRecipeResult(desert1.id, desert1.data);
            if ((result && ((resultSlot.id == result.id && resultSlot.data == result.data) || resultSlot.id == 0))||(result1 && ((resultSlot1.id == result1.id && resultSlot1.data == result1.data) || resultSlot1.id == 0))) {
                if (this.data.burn > 0) {
                    this.data.isCreate = true;
                    this.data.isCreate1 = true;
                    this.data.make += 1;
                    this.data.make1 += 1;
                }
                else if (fuelSlot.id > 0) {
                    this.getFuel("fuel");
                }
                else {
                    this.data.make = 0;
                    this.data.make1 = 0;
                    this.data.isCreate = false;
                }
                if (this.data.make == 200) {
                    resultSlot.setSlot(result.id, resultSlot.count + 1, result.data);
                    desert.setSlot(desert.id, desert.count - 1, desert.data);
                    this.container.validateSlot("desert");
          
                    this.data.make = 0;
                    this.data.isCreate = false;
                }
                if (this.data.make1 == 200) {
                
                    resultSlot1.setSlot(result1.id, resultSlot1.count + 1, result1.data);
                    desert1.setSlot(desert1.id, desert1.count - 1, desert1.data);
                    this.container.validateSlot("desert1");
                    this.data.make1 = 0;
                    this.data.isCreate1 = false;
                }
            }
            if (this.data.burn > 0) {
                this.data.burn -= 1;
            }
            if (desert.id == 0) {
                this.data.isCreate = false;
            }
            if (desert1.id == 0) {
                this.data.isCreate1 = false;
            }
            if (!this.data.isCreate) {
                this.data.make = 0;
            }
             if (!this.data.isCreate1) {
                this.data.make1 = 0;
            }
            if (this.data.burn <= 0 && !this.data.isCreate&&!this.data.isCreate1) {
                this.data.burn = this.data.make = this.data.make1 = 0;
                this.data.burnMax = 200;
                result = null;
            }
            this.setActive(this.data.burn > 0);
            this.container.setScale("arrowScale", this.data.make / 200);
            this.container.setScale("arrowScale1", this.data.make1 / 200);
            this.container.setScale("fireScale", this.data.burn / this.data.burnMax);
            this.container.sendChanges();
        },
        click: function(id, count, data, coords, player) {
        },
        getScreenByName: function (screenName) {
            return FurnaceGui;
        },
        getScreenName: function (screenName) {
            return "FurnaceGui";
        },
        setActive: function (isActive) {
            if (this.networkData.getBoolean("isActive") != isActive) {
                this.networkData.putBoolean("isActive", isActive);
                this.networkData.sendChanges();
            }
        }
    });
})();
