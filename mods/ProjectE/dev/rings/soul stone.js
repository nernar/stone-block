IDRegistry.genItemID("soulStone");
Item.createItem("soulStone", "Soul stone", {name: "soulStone", meta: 0}, {stack: 1});
SetDescription(ItemID.soulStone, Translation.translate("§3On pedestal/In inventory: restores health to player."));

Callback.addCallback("PostLoaded", function(){
if(hard_mode){
	Recipes.addShaped({id: ItemID.soulStone, count: 1, data: 0}, 
	["sss", 
	 "dbd",
	 "sss"],
	["b", 351, 4, "d", BlockID.rmBlock, 0, "s", 348, 0]);
}else{
	Recipes.addShaped({id: ItemID.soulStone, count: 1, data: 0}, 
	["sss", 
	 "dbd",
	 "sss"],
	["b", 351, 4, "d", ItemID.redMatter, 0, "s", 348, 0]);
};
});

Rings.addPedestalFunction(ItemID.soulStone, function(tile){
  if(World.getThreadTime()%5 == 0 && Entity.getHealth(Player.get()) < Entity.getMaxHealth(Player.get())){
    let player = Entity.findNearest({x: tile.x, y: tile.y, z: tile.z}, Player.get(), 11);
    Entity.setHealth(Player.get(), Entity.getHealth(Player.get())+1);
  }
});

Callback.addCallback("tick", function(){
  if(Rings.get(ItemID.bodyStone)){
    if(World.getThreadTime()%10 == 0 && Entity.getHealth(Player.get()) < Entity.getMaxHealth(Player.get())){
      Entity.setHealth(Player.get(), Entity.getHealth(Player.get())+1);
    }
  }
});
