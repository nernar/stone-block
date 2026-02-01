IDRegistry.genItemID("bodyStone");
Item.createItem("bodyStone", "Body stone", {name: "bodyStone", meta: 0}, {stack: 1});
SetDescription(ItemID.bodyStone, Translation.translate("§3On pedestal/In inventory: restores hunger to player."));

Callback.addCallback("PostLoaded", function(){
if(hard_mode){
	Recipes.addShaped({id: ItemID.bodyStone, count: 1, data: 0}, 
	["sss", 
	 "dbd",
	 "sss"],
	["b", 351, 4, "d", BlockID.rmBlock, 0, "s", 353, 0]);
	if(VanillaItemID) Recipes.addShaped({id: ItemID.bodyStone, count: 1, data: 0}, 
	["sss", 
	 "dbd",
	 "sss"],
	["b", VanillaItemID.lapis_lazuli, 0, "d", BlockID.rmBlock, 0, "s", 353, 0]);
}else{
	Recipes.addShaped({id: ItemID.bodyStone, count: 1, data: 0}, 
	["sss", 
	 "dbd",
	 "sss"],
	["b", 351, 4, "d", ItemID.redMatter, 0, "s", 353, 0]);
	if(VanillaItemID) Recipes.addShaped({id: ItemID.bodyStone, count: 1, data: 0}, 
	["sss", 
	 "dbd",
	 "sss"],
	["b", VanillaItemID.lapis_lazuli, 0, "d", ItemID.redMatter, 0, "s", 353, 0]);
}
});

Rings.addPedestalFunction(ItemID.bodyStone, function(tile){
  if(World.getThreadTime()%5 == 0){
    let player = Entity.findNearest({x: tile.x, y: tile.y, z: tile.z}, Player.get(), 11);
    Player.setHunger(Player.getHunger()+1);
  }
});

Callback.addCallback("tick", function(){
  if(Rings.get(ItemID.bodyStone)){
    if(World.getThreadTime()%10 == 0){
      Player.setHunger(Player.getHunger()+1);
    }
  }
});
