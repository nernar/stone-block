//该作品由@桃乐丝制作
LIBRARY({
    name: "BcuketRegister",
    version: 2,
    shared: false,
    api: "CoreEngine"
});

var BcuketRegister = {
    items: {
        full: {},
        empty: {}
    },
    registerAll: function(emptyBcuketId, fullBcuketId, fullBcuketBlockId, ifs1, ifs2) {
        Item.setLiquidClip(emptyBcuketId, true);
        if (!this.items.full.fullBcuketId) {
            this.items.full.fullBcuketId = [];
        };
        if (!this.items.empty.emptyBcuketId) {
            this.items.empty.emptyBcuketId = [];
        };
        this.items.full.fullBcuketId.push(function(coords, item, block, player) {
            var blockSource = BlockSource.getDefaultForActor(player);
            var tileEntity = TileEntity.getTileEntity(coords.x, coords.y, coords.z, blockSource);
            var blockID = blockSource.getBlock(coords.relative.x, coords.relative.y, coords.relative.z).id;
            if (!tileEntity || Entity.getSneaking(player)) {
                if ((ifs1 && ifs1(blockID, block)) || ifs1 == null) {
                    blockSource.setBlock(coords.relative.x, coords.relative.y, coords.relative.z, fullBcuketBlockId);
                    Entity.setCarriedItem(player, item.id, item.count - 1, item.data);
                    new PlayerActor(player).addItemToInventory(emptyBcuketId, 1, 0);
                };
            };
        });
        this.items.empty.emptyBcuketId.push(function(coords, item, block, player) {
            var blockSource = BlockSource.getDefaultForActor(player);
            var tileEntity = TileEntity.getTileEntity(coords.x, coords.y, coords.z, blockSource);
            var Block = blockSource.getBlock(coords.relative.x, coords.relative.y, coords.relative.z).id;
            if (!tileEntity || Entity.getSneaking(player)) {
                if ((ifs2 && ifs2(Block.id, block)) || ifs2 == null) {
                    blockSource.setBlock(coords.x, coords.y, coords.z, 0);
                    Entity.setCarriedItem(player, item.id, item.count - 1, item.data);
                    new PlayerActor(player).addItemToInventory(fullBcuketId, 1, 0);
                };
            };
        });
        var self = this;
        Item.registerUseFunctionForID(fullBcuketId, function(coords, item, block, player) {
            self.items.full.fullBcuketId.forEach(function(func, index, array) {
                func(coords, item, block, player);
            });
        });
        Item.registerUseFunctionForID(emptyBcuketId, function(coords, item, block, player) {
            self.items.empty.emptyBcuketId.forEach(function(func, index, array) {
                func(coords, item, block, player);
            });
        });
    }
};
EXPORT("BcuketRegister", BcuketRegister);