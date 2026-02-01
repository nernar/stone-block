importLib("BackpackAPI", '*');

var Backpack = {
	set: function(type, arg1){
	   IDRegistry.genItemID("backpack"+type);
	   Item.createItem("backpack"+type, type + " Backpack", {name: "backpack" + type, meta: 0}, {stack: 1});
	   Callback.addCallback("PostLoaded", function(){
           Recipes.addShaped({id: ItemID["backpack"+type], count: 1, data: 0}, [
	         "bbb",
	         "bab",
	         "bbb"
           ], ['a', arg1.ingridient2, 0, 'b', arg1.ingridient, 0]);});
	}
};

Backpack.set("Basic", {
	ingridient: 334,
	ingridient2: 54
});

Backpack.set("Iron", {
	ingridient: 265,
	ingridient2: ItemID["backpackBasic"]
});

Backpack.set("Gold", {
	ingridient: 266,
	ingridient2: ItemID["backpackIron"]
});

Backpack.set("Diamond", {
	ingridient: 264,
	ingridient2: ItemID["backpackGold"]
});

BackpackRegistry.register(ItemID.backpackBasic, {
	slots: 36,
	slotsCenter: true,
	inRow: 9
});

BackpackRegistry.register(ItemID.backpackIron, {
	slots: 54,
	slotsCenter: true,
	inRow: 9
});

BackpackRegistry.register(ItemID.backpackGold, {
	slots: 72,
	slotsCenter: true,
	inRow: 9
});

BackpackRegistry.register(ItemID.backpackDiamond, {
	slots: 108,
	slotsCenter: true,
	inRow: 9
});