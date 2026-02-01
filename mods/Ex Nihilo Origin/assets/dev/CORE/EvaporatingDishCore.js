(function() {
    var EvaporatingDish_boxes_1 = [
        [0, 0, 0, 1, 1 / 16, 1],
        [0, 1 / 16, 0, 1, 5 / 16, 1 / 16],
        [0, 1 / 16, 1 / 16, 1 / 16, 5 / 16, 15 / 16],
        [0, 1 / 16, 15 / 16, 1, 5 / 16, 1],
        [15 / 16, 1 / 16, 1 / 16, 1, 5 / 16, 15 / 16]
    ];
    var SetupModel = function(stringId) {
        var model = BlockRenderer.Model();
        var render = new ICRender.Model();
        for (var box in EvaporatingDish_boxes_1) {
            var array = EvaporatingDish_boxes_1[box];
            model.addBox(array[0], array[1], array[2], array[3], array[4], array[5], BlockID[stringId], 0);
        };
        render.addEntry(model);
        BlockRenderer.enableCoordMapping(BlockID[stringId], 0, render);
       // BlockRenderer.enableCustomRender(BlockID[stringId], 0);
        var Collision = new ICRender.CollisionShape();
        for (var box in EvaporatingDish_boxes_1) {
            var array = EvaporatingDish_boxes_1[box];
            Collision.addEntry().addBox(array[0], array[1], array[2], array[3], array[4], array[5]);
        };
        BlockRenderer.setCustomCollisionShape(BlockID[stringId], 0, Collision);
    };
    var BuildEvaporatingDishBox = function(id, ydata, data, x, y, z, dim) {
        var model = BlockRenderer.Model();
        var render = new ICRender.Model();
        for (var box in EvaporatingDish_boxes_1) {
            var array = EvaporatingDish_boxes_1[box];
            model.addBox(array[0], array[1], array[2], array[3], array[4], array[5], id, 0);
        };
        model.addBox(1 / 16, 1 / 16, 1 / 16, 15 / 16, ydata, 15 / 16, data);
        render.addEntry(model);
        BlockRenderer.mapAtCoords(x, y, z, render);
        var Collision = new ICRender.CollisionShape();
        for (var box in EvaporatingDish_boxes_1) {
            var array = EvaporatingDish_boxes_1[box];
            Collision.addEntry().addBox(array[0], array[1], array[2], array[3], array[4], array[5]);
        };
        Collision.addEntry().addBox(1 / 16, 1 / 16, 1 / 16, 15 / 16, ydata, 15 / 16);
        BlockRenderer.mapCollisionModelAtCoords(dim, x, y, z, Collision);
    };
    var SetupTileEntity = function(stringId, name, texture) {
        this.tileEntity = {};
        this.tileEntity.client = {};
        this.tileEntity.useNetworkItemContainer = true;
        this.tileEntity.defaultValues = {
            worktime: 0,
            type: null,
            BuildEvaporatingDishOnce: false
        };
        this.tileEntity.getTransportSlots = function() {
            return {output: ["slot2"]};
        };
        this.tileEntity.show = function() {
            var input = this.container.getSlot("slotInput");
            var st2 = this.container.getSlot("slot2");
            var stored = this.liquidStorage.getLiquidStored();
            var amount = this.liquidStorage.getAmount(stored);
            var tex = EvaporatingDish.getTexture("water", st2.id);
            amount > 0 ? this.box(5 / 16 * amount, [["ex_water", 0]]) : this.box(5 / 16, [["air", 0]]);
            st2.count > 0 && this.box(5 / 16, [[tex, 0]]);
        };
        this.tileEntity.init = function() {
            this.liquidStorage.setLimit("water", 1);
            this.show();
        };
        this.tileEntity.box = function(ydata, data) {
            this.networkData.putFloat("ydata", ydata || 0);
            this.networkData.putString("data", data);
            this.networkData.putInt("dim", this.dimension);
            this.networkData.sendChanges();
            //BuildEvaporatingDishBox(BlockID[stringId], ydata, data, this.x, this.y, this.z, this.dimension);
        };
        this.tileEntity.client.renderModel = function() {
            let ydata = this.networkData.getFloat("ydata");
            let data = this.networkData.getString("data")||"air";
            let dim = this.networkData.getInt("dim");
            if (typeof(ydata) == "number") {
           
            BuildEvaporatingDishBox(BlockID[stringId], ydata,  [[data.split(",")[0], Number(data.split(",")[1])]], this.x, this.y, this.z, dim);
            }
        };
        this.tileEntity.client.load = function() {
            this.renderModel();
            var self = this;
            this.networkData.addOnDataChangedListener(function(data, isExternal) {
                self.renderModel();
            });
        };
        this.tileEntity.setItem = function(id, data, count, id2, data2, player) {
            if (count > 1) {
                new PlayerEntity(player).addItemToInventory(id, 1, data);
                new PlayerEntity(player).setCarriedItem(id2, count - 1, data2);
            } else {
                new PlayerEntity(player).setCarriedItem(id, 1, data);
            };
        };
        this.tileEntity.setLiquid = function(type, id, data, count, stored, amount, empty, liquid, player) {
            Game.prevent();
            var st2 = this.container.getSlot("slot2");
            if (!stored && st2.id == 0 && (!this.data.worktime || stored == type) && amount < 1) {
                this.liquidStorage.addLiquid(liquid, 1);
                this.setItem(empty.id, empty.data, count, id, data, player);
                return true;
            };
        };
        this.tileEntity.click = function(id, count, data, coords, player) {
            var input = this.container.getSlot("slotInput");
            var st2 = this.container.getSlot("slot2");
            var stored = this.liquidStorage.getLiquidStored();
            var liquid = LiquidRegistry.getItemLiquid(id, data);
            var amount = this.liquidStorage.getAmount(stored);
            var full = LiquidRegistry.getFullItem(id, data, stored);
            var empty = LiquidRegistry.getEmptyItem(id, data);
            var client = Network.getClientForPlayer(player);
            liquid && this.setLiquid(liquid, id, data, count, stored, amount, empty, liquid, player);
            if (st2.count > 0) {
                Game.prevent();
                this.blockSource.spawnDroppedItem(this.x + 0.5, this.y + 1, this.z + 0.5, st2.id, st2.count, st2.data);
                st2.setSlot(0, 0, 0);
            };
        };
        this.tileEntity.destroyBlock = function(coords, player) {
            this.box(5 / 16, [["air", 0]]);
            BlockRenderer.unmapAtCoords(coords.x, coords.y, coords.z);
            BlockRenderer.unmapCollisionModelAtCoords(this.dimension, coords.x, coords.y, coords.z);
        };
        this.tileEntity.tick = function() {
            var st2 = this.container.getSlot("slot2");
            var stored = this.liquidStorage.getLiquidStored();
            var water = this.liquidStorage.getAmount("water");
            if (water >= 1 && this.data.worktime < 1000) {
                this.data.worktime++;
            };
            if (stored != this.data.type) {
                this.show();
                this.data.type = stored;
            };
            if (this.data.worktime >= 1000) {
                this.liquidStorage.getLiquid("water", 1);
                st2.setSlot(BlockID.ex_saltcoarse, st2.count + 1, 0);
                this.show();
                this.data.worktime = 0
            };
            if (this.data.worktime <= 0 && water <= 0 && st2.count <= 0) {
                this.box(5 / 16, [["air", 0]]);
            };
        };
        TileEntity.registerPrototype(BlockID[stringId], this.tileEntity);
    };
    EvaporatingDish = {
        addRecipe: function(material, result, texture) {
            if (!this.material) this.material = {};
            this.material[result] = texture;
        },
        getResult: function(material) {
            return this.material;
        },
        getTexture: function(material, result) {
            return this.material[result];
        },
        addDish: function(stringId, name, texture, sound) {
            IDRegistry.genBlockID(stringId);
            Block.createBlock(stringId, [{name: name, texture: [[texture, 0]], inCreative: true}], {sound: sound});
            Item.addCreativeGroup("EvaporatingDish", Translation.translate("EvaporatingDish"), [BlockID[stringId]]);
            SetupModel(stringId);
            SetupTileEntity(stringId, name, texture);
        }
    };
})();