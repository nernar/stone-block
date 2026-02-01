IDRegistry.genItemID("draconiumDust");
Item.createItem("draconiumDust", "Draconium Dust", {name: "draconium_dust", meta: 0}, {});
IDRegistry.genItemID("draconiumIngot");
Item.createItem("draconiumIngot", "Draconium Ingot", {name: "draconium_ingot", meta: 0}, {});
Recipes.addFurnace(ItemID.draconiumDust, ItemID.draconiumIngot, 0);
IDRegistry.genItemID("draconicCore");
Item.createItem("draconicCore", "Draconic Core", {name: "core", meta: 0}, {});
Recipes.addShaped({id: ItemID.draconicCore, count: 1, data: 0}, [
	"bab",
	"aca",
	"bab"
], ['a', ItemID.draconiumIngot, 0, 'b', 266, 0, 'c', 264, 0]); 