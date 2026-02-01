IDRegistry.genItemID("swiftWolfRendingGale");
Item.createItem("swiftWolfRendingGale", "Swift Wolf's Rending Gale", {name: "swiftWolfRendingGale", meta: 0}, {stack: 1});
SetDescription(ItemID.swiftWolfRendingGale, Translation.translate("§3On pedestal: shoots ligthning into nearest hostle creature.\n§3In inventory: allow players to fly."));

Callback.addCallback("PostLoaded", function(){
if(hard_mode){
	Recipes.addShaped({id: ItemID.swiftWolfRendingGale, count: 1, data: 0}, 
	["sfs", 
	 "fbf",
	 "sfs"],
	["b", ItemID.ironBand, 0, "f", ItemID.redMatter, 0, "s", 288, 0]);
}else{
	Recipes.addShaped({id: ItemID.swiftWolfRendingGale, count: 1, data: 0}, 
	["sfs", 
	 "fbf",
	 "sfs"],
	["b", ItemID.ironBand, 0, "f", ItemID.darkMatter, 0, "s", 288, 0]);
}
});

Rings.addPedestalFunction(ItemID.swiftWolfRendingGale, function(tile){
  if(Math.random()<1/15){
    for(i in evilList){
      let entity = Entity.findNearest({x: tile.x, y: tile.y, z: tile.z}, evilList[i], 20);
      if(entity){
        let crd = Entity.getPosition(entity);
        Entity.spawn(crd.x, crd.y, crd.z, 93);
        Entity.damageEntity(entity, 8);
      }
    }
  }
});

var swift_fly=false;
Callback.addCallback("tick", function(){
  if(Rings.get(ItemID.swiftWolfRendingGale)){
   if(!swift_fly){swift_fly=true};
   Player.setFlyingEnabled(true);
  }else if(swift_fly&&Game.getGameMode()!==1){
    swift_fly=false;
    Player.setFlyingEnabled(false);
    Player.setFlying(false);
  };
});
