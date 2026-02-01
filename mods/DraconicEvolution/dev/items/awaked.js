IDRegistry.genItemID("dragonHeart");
Item.createItem("dragonHeart", "Dragon Heart", {name: "dragon_heart", meta: 0}, {stack: 1});

Callback.addCallback("ItemUse", function (coords, item, block) {
if (item.id==ItemID.dragonHeart)
{
World.setBlock (coords.relative.x, coords.relative.y, coords.relative.z, BlockID.dragonHeart, 0);
Player.decreaseCarriedItem (1);
}
});

IDRegistry.genItemID("awakedIngot");
Item.createItem("awakedIngot", "Awaked Draconic Ingot", {name: "draconic_ingot", meta: 0}, {});
Recipes.addShaped({id: ItemID.awakedIngot, count: 9, data: 0}, [
	"a"
], ['a', BlockID.awakedBlock, 0]); 
IDRegistry.genItemID("awakedCore");
Item.createItem("awakedCore", "Awaked Draconic Core", {name: "core", meta: 2}, {});
Item.setGlint(ItemID.awakedCore, true);
Recipes.addShaped({id: ItemID.awakedCore, count: 1, data: 0}, [
	"bab",
	"aca",
	"bab"
], ['a', ItemID.wywernCore, 0, 'b', ItemID.awakedIngot, 0, 'c', ItemID.dragonHeart, 0]); 
IDRegistry.genItemID("awakedEnergyCore");
Item.createItem("awakedEnergyCore", "Awaked Draconic Energy Core", {name: "energy_core", meta: 1,}, {});
Recipes.addShaped({id: ItemID.awakedEnergyCore, count: 1, data: 0}, [
	"bab",
	"aca",
	"bab"
], ['a', 152, 0, 'b', ItemID.awakedIngot, 0, 'c', ItemID.wywernEnergyCore, 0]); 