IDRegistry.genItemID("gemHelm");
IDRegistry.genItemID("gemChest");
IDRegistry.genItemID("gemLegg");
IDRegistry.genItemID("gemBoots");

Item.createArmorItem("gemHelm", "Abyss Helmet", {name: "gem_armor", meta: 2}, {type: "helmet", armor: 4, durability: 10000000, texture: "armor/gem_0.png"});
Item.createArmorItem("gemChest", "Grid Infernal Armor", {name: "gem_armor", meta: 0}, {type: "chestplate", armor: 14, durability: 10000000, texture: "armor/gem_0.png"});
Item.createArmorItem("gemLegg", "Gravity Greaves", {name: "gem_armor", meta: 3}, {type: "leggings", armor: 12, durability: 10000000, texture: "armor/gem_1.png"});
Item.createArmorItem("gemBoots", "Hurricane Boots", {name: "gem_armor", meta: 1}, {type: "boots", armor: 7, durability: 10000000, texture: "armor/gem_0.png"});

SetDescription(ItemID.gemHelm, Translation.translate("§3allow you to walk on water.")+"\n"+
    Translation.translate("§3night vision and restore health."));
SetDescription(ItemID.gemChest, Translation.translate("§3allow you to walk on lava.")+"\n"+
    Translation.translate("§3saturation."));
SetDescription(ItemID.gemLegg, Translation.translate("§3repel mobs while sneaking.")+"\n"+
    Translation.translate("§3increase the speed of descent."));
SetDescription(ItemID.gemBoots, Translation.translate("§3allow you to fly."));

Callback.addCallback("PostLoaded", function(){
	Recipes.addShapeless({id: ItemID.gemHelm, count: 1, data: 0}, [
	    {id: ItemID.rmHelm, data: -1}, {id: ItemID.kleinStar6, data: -1},
	    {id: ItemID.evertideAmulet, data: 0}, {id: ItemID.soulStone, data: 0}
	]);

	Recipes.addShapeless({id: ItemID.gemChest, count: 1, data: 0}, [
	    {id: ItemID.rmChest, data: -1}, {id: ItemID.kleinStar6, data: -1},
	    {id: ItemID.vulcaniteAmulet, data: 0}, {id: ItemID.bodyStone, data: 0}
	]);

	Recipes.addShapeless({id: ItemID.gemLegg, count: 1, data: 0}, [
	    {id: ItemID.rmLegg, data: -1}, {id: ItemID.kleinStar6, data: -1},
	    {id: ItemID.watchTime, data: 0}, {id: ItemID.ringBlackHoleInactive, data: 0}
	]);

	Recipes.addShapeless({id: ItemID.gemBoots, count: 1, data: 0}, [
	    {id: ItemID.rmBoots, data: -1}, {id: ItemID.kleinStar6, data: -1},
	    {id: ItemID.swiftWolfRendingGale, data: 0}, {id: ItemID.swiftWolfRendingGale, data: 0}
	]);
});


Armor.onTick({id: ItemID.gemHelm, slot: 0}, function (s){
  Entity.addEffect(Player.get(), 16, 0, 160, false, false);
  p = Player.getPosition();
  if(World.getBlockID(p.x, p.y, p.z) == 9){
    Entity.addEffect(Player.get(), 13, 0, 160, false, false);
  }
  if(World.getThreadTime()%10 == 0 && Entity.getHealth(Player.get()) < Entity.getMaxHealth(Player.get())){
    Entity.setHealth(Player.get(), Entity.getHealth(Player.get())+1);
  }
});

Rings.float(8, function(){return Entity.getArmorSlot(Player.get(), 0).id==ItemID.gemHelm});
Rings.float(9, function(){return Entity.getArmorSlot(Player.get(), 0).id==ItemID.gemHelm});

Armor.onTick({id: ItemID.gemChest, slot: 1}, function (a, v, s){
  Entity.setFire(Player.get(), 0);
  Entity.addEffect(Player.get(), 12, 0, 160, false, false);
  if(World.getThreadTime()%10 == 0){
    Player.setHunger(Player.getHunger()+1);
  }
});

Rings.float(10, function(){return Entity.getArmorSlot(Player.get(), 1).id==ItemID.gemChest});
Rings.float(11, function(){return Entity.getArmorSlot(Player.get(), 1).id==ItemID.gemChest});

Armor.onTick({id: ItemID.gemLegg, slot: 2}, function (s){
  if(Entity.getSneaking(Player.get())){
    for(j in allMobs){
      ent = Entity.getAllInRange(Player.getPosition(), 6, allMobs[j]);
      for(i in ent){
        let x=Entity.getPosition(ent[i]).x-Player.getPosition().x;
        let y=Entity.getPosition(ent[i]).y-Player.getPosition().y;
        let z=Entity.getPosition(ent[i]).z-Player.getPosition().z;
        let dis=Math.sqrt(x*x+y*y+z*z);
        let vel=(6-dis)/3;
        if(vel>0) Entity.addVelocity(ent[i], vel*x/dis, vel*y/dis, vel*z/dis);
       }
    }
    if(Entity.getVelocity(Player.get()).y <= fallVelocity){
      Entity.setVelocity(Player.get(), Entity.getVelocity(Player.get()).x, -2, Entity.getVelocity(Player.get()).z);
    }
  }
});

Armor.onTick({id: ItemID.gemBoots, slot: 3}, function (s){
  Entity.addEffect(Player.get(), 1, 0, 160, false, false);
});

var gem_fly=false;
Callback.addCallback("tick", function(){
  if(Entity.getArmorSlot(Player.get(), 3).id==ItemID.gemBoots){
   if(!gem_fly){gem_fly=true};
   Player.setFlyingEnabled(true);
  }else if(gem_fly && Game.getGameMode()!==1){
    gem_fly=false;
    Player.setFlyingEnabled(false);
    Player.setFlying(false);
  };
});


Armor.onHurt({id: ItemID.gemHelm, slot: 0}, function (a, v, s){
  Armor.preventDamaging(ItemID.gemHelm);
});

Armor.onHurt({id: ItemID.gemChest, slot: 1}, function (a, v, s, h){
  Armor.preventDamaging(ItemID.gemChest);
});

Armor.onHurt({id: ItemID.gemLegg, slot: 2}, function (a, v, s){
  Armor.preventDamaging(ItemID.gemLegg);
});

Armor.onHurt({id: ItemID.gemBoots, slot: 3}, function (a, v, s){
  Armor.preventDamaging(ItemID.gemBoots);
});

Callback.addCallback("EntityHurt", function(a, v, h){
if(v == Player.get()){
  if(
    Entity.getArmorSlot(Player.get(), 0).id == ItemID.gemHelm &&
    Entity.getArmorSlot(Player.get(), 1).id == ItemID.gemChest &&
    Entity.getArmorSlot(Player.get(), 2).id == ItemID.gemLegg &&
    Entity.getArmorSlot(Player.get(), 3).id == ItemID.gemBoots
  ){
    Game.prevent();
  }
};
});
