var BAG_CONTAINERS = {};
Saver.addSavesScope("EE2Bags",
function read(scope){
	if(scope && scope.cont){
		for(i=0; i<16; i++) BAG_CONTAINERS["bag"+i] = scope.cont["bag"+i] || new UI.Container();
	} else for(i=0; i<16; i++) BAG_CONTAINERS["bag"+i] = new UI.Container();
},
function save(){
	return {cont: BAG_CONTAINERS};
});

var setupBag = function(index){
	IDRegistry.genItemID("alchemyBag"+index);
	Item.createItem("alchemyBag"+index, "Alchemy bag", {name: "alchemy_bag", meta: index},
	    {isTech: !(__config__.getBool("物品方块.炼金术之袋")), stack: 1});
	SetDescription(ItemID["alchemyBag"+index],
	    Translation.translate("§3 storing items, similar to Ender box but not Shulker box."));
	if(__config__.getBool("物品方块.炼金术之袋"))
	    Item.addCreativeGroup("EE2bags", Translation.translate("Alchemy bag"), [ItemID["alchemyBag"+i]]);
	Callback.addCallback("ItemUse", function (c, i, b){
		if(i.id == ItemID["alchemyBag"+index])
		    BAG_CONTAINERS["bag"+index].openAs(alchChestUI);
	});
};

for(i=0; i<16; i++)setupBag(i);

if(__config__.getBool("物品方块.炼金术之袋")) Callback.addCallback("PostLoaded", function(){
	for(i=0; i<16; i++) Recipes.addShaped({id: ItemID["alchemyBag"+i], count: 1, data: 0},
	    ["mmm", "aca", "aaa"], ["a", 35, i, "m", ItemID.covDust3, 0, "c", BlockID.alchChest, 0]);
});