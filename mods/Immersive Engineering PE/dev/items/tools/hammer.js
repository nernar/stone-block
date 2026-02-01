IDRegistry.genItemID("toolHammer");
Item.createItem("toolHammer", "Молот инженера", {name: "toolHammer", meta: 0}, {stack: 1});

function addRecipeWithCraftingTool(result, data, tool){
	data.push({id: tool, data: -1});
	Recipes.addShapeless(result, data, function(api, field, result){
		for (var i in field){
			if (field[i].id == tool){
				field[i].data++;
				if (field[i].data >= ){
					field[i].id = field[i].count = field[i].data = 0;
				}
			}
			else {
				api.decreaseFieldSlot(i);
			}
		}
	});
}

Recipes.addShaped({id: ItemID.toolHammer, count: 1, data: 0}, [
	"oax",
	"oba",
	"obo"
], ['a', 265, 0, 'b', 280, 0, 'x',287 , 0]);
