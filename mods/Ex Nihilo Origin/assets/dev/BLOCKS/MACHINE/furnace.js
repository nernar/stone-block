IDRegistry.genBlockID("ex_furnacehalf");
Block.createBlock("ex_furnacehalf", [{
        name: "Furnace Half",
        texture: [
            ["ex_furnace_top", 0],
            ["ex_furnace_top", 0],
            ["ex_furnace_side", 1],
            ["ex_furnace_front_off", 1],
            ["ex_furnace_side", 1],
            ["ex_furnace_side", 1]
        ],
        inCreative: true
    }], {
    sound: "stone"
});
Block.setShape(BlockID.ex_furnacehalf, 0, 0, 0, 1, 0.5, 1, -1);
ToolAPI.registerBlockMaterial(BlockID["ex_furnacehalf"], "stone");
TileRender_private.setSlabModel(BlockID.ex_furnacehalf, [
    ["ex_furnace_top", 0],
    ["ex_furnace_top", 0],
    ["ex_furnace_side", 0],
    ["ex_furnace_front_off", 1],
    ["ex_furnace_side", 0],
    ["ex_furnace_side", 0]
]);
TileRender_private.registerSlabRotationModel(BlockID.ex_furnacehalf, 0, [
    ["ex_furnace_top", 0],
    ["ex_furnace_top", 0],
    ["ex_furnace_side", 1],
    ["ex_furnace_front_off", 1],
    ["ex_furnace_side", 1],
    ["ex_furnace_side", 1]
]);
TileRender_private.registerSlabRotationModel(BlockID.ex_furnacehalf, 4, [
    ["ex_furnace_top", 0],
    ["ex_furnace_top", 0],
    ["ex_furnace_side", 1],
    ["ex_furnace_front_on", 1],
    ["ex_furnace_side", 1],
    ["ex_furnace_side", 1]
]);
//TileRender_private.setRotationPlaceFunction(BlockID.ex_furnacehalf);
(function () {
    var FurnaceGui = new UI.StandartWindow({
        standart: {
            header: {
                text: {
                    text: Translation.translate("Furnace Half")
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
                y: 180,
                bitmap: "arrow_0",
                scale: 3
            }, {
                type: "bitmap",
                x: 400,
                y: 180,
                bitmap: "fire_0",
                scale: 4
            }],
        elements: {
            "fireScale": {
                type: "scale",
                x: 400,
                y: 180,
                direction: 1,
                value: 0.5,
                bitmap: "fire_1",
                scale: 4
            },
            "arrowScale": {
                type: "scale",
                x: 480,
                y: 180,
                direction: 0,
                value: 0.5,
                bitmap: "arrow_1",
                scale: 3
            },
            "desert": {
                type: "slot",
                x: 400,
                y: 100,
                size: 60
            },
            "result": {
                type: "slot",
                x: 560,
                y: 170,
                size: 60
            },
            "fuel": {
                type: "slot",
                x: 400,
                y: 240,
                size: 60
            }
        }
    });
    TileEntity.registerPrototype(BlockID.ex_furnacehalf, {
        useNetworkItemContainer: true,
        defaultValues: {
            isActive: false,
            burn: 0,
            burnMax: 200,
            make: 0,
            meta: 0,
            isCreate: false
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
            var resultSlot = this.container.getSlot("result");
            var fuelSlot = this.container.getSlot("fuel");
            var result = Recipes.getFurnaceRecipeResult(desert.id, desert.data);
            if (result && ((resultSlot.id == result.id && resultSlot.data == result.data) || resultSlot.id == 0)) {
                if (this.data.burn > 0) {
                    this.data.isCreate = true;
                    this.data.make += 1;
                }
                else if (fuelSlot.id > 0) {
                    this.getFuel("fuel");
                }
                else {
                    this.data.make = 0;
                    this.data.isCreate = false;
                }
                if (this.data.make == 300) {
                    resultSlot.setSlot(result.id, resultSlot.count + 1, result.data);
                    desert.setSlot(desert.id, desert.count - 1, desert.data);
                    this.container.validateSlot("desert");
                    this.data.make = 0;
                    this.data.isCreate = false;
                }
            }
            if (this.data.burn > 0) {
                this.data.burn -= 1;
            }
            if (desert.id == 0) {
                this.data.isCreate = false;
            }
            if (!this.data.isCreate) {
                this.data.make = 0;
            }
            if (this.data.burn <= 0 && !this.data.isCreate) {
                this.data.burn = this.data.make = 0;
                this.data.burnMax = 200;
                result = null;
            }
            this.setActive(this.data.burn > 0);
            this.container.setScale("arrowScale", this.data.make / 300);
            this.container.setScale("fireScale", this.data.burn / this.data.burnMax);
            this.container.sendChanges();
        },
        click: function(id, count, data, coords, player) {
        if(Entity.getSneaking(player)){
      //  this.blockSource.setBlock(this.x, this.y, this.z, BlockID.ex_furnace, 0);
        }
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
