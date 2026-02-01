IDRegistry.genItemID("ringZero");
Item.createItem("ringZero", "Ring of Zero", {name: "ringZero", meta: 0}, {stack: 1});
SetDescription(ItemID.ringZero, Translation.translate("§3On pedestal: harm nearest hostle creature.\n§3On pedestal/In inventory: Freezes water\n§4Inactive"));

IDRegistry.genItemID("ringZeroActivated");
Item.createItem("ringZeroActivated", "Ring of Zero", {name: "ringZero", meta: 1}, {stack: 1, isTech: true});
SetDescription(ItemID.ringZeroActivated, Translation.translate("§3On pedestal: harm nearest hostle creature.\n§3On pedestal/In inventory: Freezes water\n§2Active"));

Callback.addCallback("PostLoaded", function(){
if(hard_mode){
	Recipes.addShaped({id: ItemID.ringZero, count: 1, data: 0}, 
	["sas", 
	 "dbd",
	 "sas"],
	["b", ItemID.ironBand, 0, "d", ItemID.redMatter, 0, "s", 80, 0, "a", 332, 0]);
}else{
	Recipes.addShaped({id: ItemID.ringZero, count: 1, data: 0}, 
	["sas", 
	 "dbd",
	 "sas"],
	["b", ItemID.ironBand, 0, "d", ItemID.darkMatter, 0, "s", 80, 0, "a", 332, 0]);
}
});

Rings.activateRing(ItemID.ringZero, ItemID.ringZeroActivated, true);

var ringzero=function(tile){
  if(Math.random()<1/20){
    for(i in evilList){
      let entity = Entity.findNearest({x: tile.x, y: tile.y, z: tile.z}, evilList[i], 20);
      if(entity){
        Entity.damageEntity(entity, 7);
        break;
      };
    };
    for(xx = -4; xx <= 4; xx ++){
      for(zz = -4; zz <= 4; zz ++){
        if(World.getBlock(tile.x+xx, tile.y, tile.z+zz).id == 0){
          let block = World.getBlock(tile.x+xx, tile.y-2, tile.z+zz);
          if(block.id == 9 && block.data == 0){
            World.setBlock(tile.x+xx, tile.y-1, tile.z+zz, 79, 0);
          }
        }
      }
    };
  }
};

Rings.addPedestalFunction(ItemID.ringZero, ringzero);
Rings.addPedestalFunction(ItemID.ringZeroActivated, ringzero);

Rings.addRingFunction(ItemID.ringZeroActivated, function(){
  let tile = Player.getPosition();
  if(Math.random()<1/5){
    for(xx = -2; xx <= 2; xx ++){
      for(zz = -2; zz <= 2; zz ++){
        if(World.getBlock(tile.x+xx, tile.y-1, tile.z+zz).id == 0){
          let block = World.getBlock(tile.x+xx, tile.y-2, tile.z+zz);
          if(block.id == 9 && block.data == 0){
            World.setBlock(tile.x+xx, tile.y-2, tile.z+zz, 79, 0);
          }
        }
      }
    }
  }
});

Callback.addCallback("tick", function(){
  if(Rings.get(ItemID.ringZeroActivated)){
    Rings.getRingFunction(ItemID.ringZeroActivated).inv();
  }
});