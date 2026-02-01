/*
   made by @桃乐丝
*/
LIBRARY({
    name: "BcuketRegister",
    version: 4,
    shared: false,
    api: "CoreEngine"
});
var BcuketRegister;
(function(BcuketRegister) {
    BcuketRegister.items = [];
    BcuketRegister.emptyBcuket = [];
    BcuketRegister.emptyIdMemory = {};
    var BcuketItem = /** @class */ (function() {
        function BcuketItem() {
            this.full = {
                id: 0,
                data: 0
            };
            this.liquid = {
                id: 0,
                data: 0
            };
            this.clipFunction = function() {};
            this.setupFunction = function() {};
        }
        return BcuketItem;
    }());
    BcuketRegister.BcuketItem = BcuketItem;
    var emptyBcuketItem = /** @class */ (function() {
        function emptyBcuketItem() {
            this.empty = {
                id: 0,
                data: 0
            };
            this.clipFunction = [];
        }
        return emptyBcuketItem;
    }());
    BcuketRegister.emptyBcuketItem = emptyBcuketItem;

    function registerAll(emptyBcuketId, fullBcuketId, liquidBlockId, setupFunction, clipFunction) {
        var item = new BcuketItem();
        item.full.id = fullBcuketId;
        item.liquid.id = liquidBlockId;
        if (!this.emptyIdMemory[emptyBcuketId]) {
            var emptyItem = new emptyBcuketItem();
            emptyItem.empty.id = emptyBcuketId;
            this.emptyIdMemory[emptyBcuketId] = emptyItem;
            this.emptyBcuket.push(emptyItem);
        } else {
            var emptyItem = this.emptyIdMemory[emptyBcuketId];
        }
        emptyItem.clipFunction.push(function(coords, item, block, player) {
            var blockSource = BlockSource.getDefaultForActor(player);
            var tileEntity = TileEntity.getTileEntity(coords.x, coords.y, coords.z, blockSource);
            var Block = blockSource.getBlock(coords.relative.x, coords.relative.y, coords.relative.z)
                .id;
            if (!tileEntity || Entity.getSneaking(player)) {
                if (clipFunction && clipFunction(Block.id, block)) {
                    blockSource.setBlock(coords.x, coords.y, coords.z, 0);
                    if (item.count > 1) {
                        Entity.setCarriedItem(player, item.id, item.count - 1, item.data);
                        new PlayerActor(player).addItemToInventory(fullBcuketId, 1, 0);
                    } else {
                        Entity.setCarriedItem(player, fullBcuketId, 1, 0);
                    }
                }
            }
        });
        Item.setLiquidClip(emptyBcuketId, true);
        item.setupFunction = function(coords, item, block, player) {
            var blockSource = BlockSource.getDefaultForActor(player);
            var tileEntity = TileEntity.getTileEntity(coords.x, coords.y, coords.z, blockSource);
            var blockID = blockSource.getBlock(coords.relative.x, coords.relative.y, coords.relative.z)
                .id;
            if (!tileEntity || Entity.getSneaking(player)) {
                if (setupFunction && setupFunction(blockID, block)) {
                    blockSource.setBlock(coords.relative.x, coords.relative.y, coords.relative.z, liquidBlockId);
                    Entity.setCarriedItem(player, emptyBcuketId, item.count, item.data);
                }
            }
        };
        this.items.push(item);
    }
    BcuketRegister.registerAll = registerAll;
})(BcuketRegister || (BcuketRegister = {}));
Callback.addCallback("LevelPreLoaded", function() {
    BcuketRegister.items.forEach(function(bcuketItem, index, array) {
        Item.registerUseFunctionForID(bcuketItem.full.id, function(coords, item, block, player) {
            bcuketItem.setupFunction(coords, item, block, player);
        });
    });
    BcuketRegister.emptyBcuket.forEach(function(emptyBcuketItem, index, array) {
        Item.registerUseFunctionForID(emptyBcuketItem.empty.id, function(coords, item, block, player) {
            emptyBcuketItem.clipFunction.forEach(function(func, index, array) {
                func(coords, item, block, player);
            });
        });
    });
});
EXPORT("BcuketRegister", BcuketRegister);