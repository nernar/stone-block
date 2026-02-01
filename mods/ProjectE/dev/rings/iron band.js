IDRegistry.genItemID("ironBand");
Item.createItem("ironBand", "Iron band", {name: "ironBand", meta: 0}, {stack: 64});

Callback.addCallback("PostLoaded", function(){
if(hard_mode){
	Recipes.addShaped({id: ItemID.ironBand, count: 1, data: 0}, 
	["iri", 
	 "rxr",
	 "iri"],
	["x", 399, 0, "i", 42, 0, "r", ItemID.darkMatter, 0]);
	Recipes.addShaped({id: ItemID.ironBand, count: 1, data: 0}, 
	["iri", 
	 "rxr",
	 "iri"],
	["x", 466, 0, "i", 42, 0, "r", ItemID.darkMatter, 0]);
	//EMC: 139264+4*2304+4*139264=705536
}else{
	Recipes.addShaped({id: ItemID.ironBand, count: 1, data: 0}, 
	["iii", 
	 "ili",
	 "iii"],
	["l", 325, 10, "i", 265, 0]);
	if(VanillaItemID) Recipes.addShaped({id: ItemID.ironBand, count: 1, data: 0}, 
	["iii", 
	 "ili",
	 "iii"],
	["l", VanillaItemID.lava_bucket, 0, "i", 265, 0]);
};
});