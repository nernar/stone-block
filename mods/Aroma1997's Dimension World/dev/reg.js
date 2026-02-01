IMPORT("dimensions");
IMPORT("ToolType");

var mm ={
addRecipe: function(result, data, tool){
		data.push({id: tool, data: -1});
		Recipes.addShapeless(result, data, function(api, field, result){
			for (var i in field){
				if (field[i].id == tool){
					field[i].data++;
					if (field[i].data >= Item.getMaxDamage(tool)){
						field[i].id = field[i].count = field[i].data = 0;
					}
				}
				else {
					api.decreaseFieldSlot(i);
				}
			}
		})
		}};

ToolAPI.addToolMaterial("ar", {durability: 20, level: 1, efficiency: 3, damage: 1, enchantability: 1});
IDRegistry.genItemID("minehui");
Item.createItem("minehui", "Mining Multitool", {name: "miningmultitool", meta: 0}, {stack: 1});
Item.setMaxDamage(ItemID.minehui, 20);   
Recipes.addShaped({id: ItemID.minehui, count: 1, data: 0}, [
"aba",
"oco",
"odo"], ['a', BlockID.quintuple_compressed_cobblestone, 0, 'b', 259, 0, 'c', 274, 0, 'd', 280, 0]); 
Item.setMaxDamage(ItemID.minehui, 20);       
ToolAPI.setTool(ItemID.minehui, "ar", ToolType.hoe);   


IDRegistry.genBlockID("portalframe");
Block.createBlock("portalframe", [{name:"Portal Frame", texture:[["portalframe",0]
],inCreative:true}]);
   
IDRegistry.genBlockID("clayore");
Block.createBlock("clayore", [{name:"Clay Ore", texture:[["clayore",0]
],inCreative:true}]);   
IDRegistry.genBlockID("stickyore");
Block.createBlock("stickyore", [{name:"Sticky Ore", texture:[["stickyore",0]
],inCreative:true}]);   
   
ToolAPI.registerBlockMaterial(BlockID.clayore, "stone", 2, true);
Block.setDestroyTime(BlockID.clayore, 3);
Block.setDestroyLevel("clayore", 2);
ToolAPI.registerBlockMaterial(BlockID.stickyore, "stone", 2, true);
Block.setDestroyTime(BlockID.stickyore, 3);
Block.setDestroyLevel("stickyore", 2);   

IDRegistry.genItemID("dimensionchanger");
Item.createItem("dimensionchanger", "DimensionChanger", {name: "dimensionchanger", meta: 0}, {stack: 1});
Recipes.addShaped({id: ItemID.dimensionchanger, count: 1, data: 0}, [
"aba",
"cdc",
"aba"], ['a', 264, 0, 'b', 381, 0, 'c', 368, 0, 'd', ItemID.minehui, 0]); 

  Block.registerDropFunction(BlockID.clayore, function(coords, blockID, blockData, level){
	var drop = [];
		drop.push([337, 1, 0]);
	return drop;
});
Block.registerDropFunction(BlockID.stickyore, function(coords, blockID, blockData, level){
	var drop = [];
		drop.push([341, 1, 0]);
	return drop;
});  

mm.addRecipe({id: BlockID.portalframe, count: 1, data: 0}, [{id: 98, data: 0}], ItemID.minehui);

