IDRegistry.genItemID("ex_silkWorm");
Item.createItem("ex_silkWorm", "Silkworm", {
	name: "enr_SilkWorm",
	meta: 0
});
IDRegistry.genItemID("ex_cookedSilkWorm");
Item.createFoodItem("ex_cookedSilkWorm", "Cooked Silkworm", {
	name: "enr_CookedSilkWorm",
	meta: 0
},
{
	food: 1
});
Item.registerIconOverrideFunction(ItemID.ex_silkWorm,
function(item, name) {
	return {
		name: "enr_SilkWorm",
		meta: Math.floor(Math.random() * 8)
	};
});
Item.registerUseFunction("ex_silkWorm", function (coords, item, block, player) {
    var id = block.id;
    var data = block.data;
    var blockSource = BlockSource.getDefaultForActor(player);
    switch (id) {
        case 18:
        switch (data) {
		case 0: case 1: case 2: case 3:
		case 4: case 5: case 6: case 7:
            new PlayerEntity(player).setCarriedItem(item.id, item.count - 1, item.data);
            blockSource.setBlock(coords.x, coords.y, coords.z, LeafGroup[18][data]);
            TileEntity.addTileEntity(coords.x, coords.y, coords.z);
            break;
        };
        break;
        case 161:
        switch (data) {
		case 0: case 1:
		case 2: case 3:
            new PlayerEntity(player).setCarriedItem(item.id, item.count - 1, item.data);
            blockSource.setBlock(coords.x, coords.y, coords.z, LeafGroup[161][data]);
            TileEntity.addTileEntity(coords.x, coords.y, coords.z);
        };
        break;
    }
});