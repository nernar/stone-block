IDRegistry.genItemID("philosophersStone");
Item.createItem("philosophersStone", "Philosopher's stone", {name: "philosophers_stone"}, {stack: 1});
SetDescription(ItemID.philosophersStone, Translation.translate("§3Click to transform blocks or mobs."))


Callback.addCallback("PostLoaded", function(){
Recipes.addShaped({id: ItemID.philosophersStone, count: 1, data: 0}, 
["rgr", 
"gdg",
"rgr"],
["r", 331, 0, "g", 348, 0, "d", 264, 0]);
});

function addPhilosophersStoneRecipe(item, input){
  let ingridients = [];
  for(i = 0; i < input.count; i++){
    ingridients.push({id: input.id, data: input.data});
  }
  
  Recipes.addCraftToolRecipeItem(
    {id: item.id, count: item.count, data: item.data}, ingridients, ItemID.philosophersStone
  );
}

Callback.addCallback("PostLoaded", function(){
Recipes.addCraftToolRecipeItem(
  {id: ItemID.fuelAlchemical, count: 1, data: 0}, [
    {id: 263, data: 0},
    {id: 263, data: 0},
    {id: 263, data: 0},
    {id: 263, data: 0},
  ], ItemID.philosophersStone
);

Recipes.addCraftToolRecipeItem(
  {id: ItemID.fuelMobius, count: 1, data: 0}, [
    {id: ItemID.fuelAlchemical, data: 0},
    {id: ItemID.fuelAlchemical, data: 0},
    {id: ItemID.fuelAlchemical, data: 0},
    {id: ItemID.fuelAlchemical, data: 0},
  ], ItemID.philosophersStone
);

Recipes.addCraftToolRecipeItem(
  {id: ItemID.fuelAstral, count: 1, data: 0}, [
    {id: ItemID.fuelMobius, data: 0},
    {id: ItemID.fuelMobius, data: 0},
    {id: ItemID.fuelMobius, data: 0},
    {id: ItemID.fuelMobius, data: 0},
  ], ItemID.philosophersStone
);

addPhilosophersStoneRecipe({id: 263, data: 0, count: 4}, {id: ItemID.fuelAlchemical, count: 1, data: 0});
addPhilosophersStoneRecipe({id: ItemID.fuelAlchemical, data: 0, count: 4}, {id: ItemID.fuelMobius, count: 1, data: 0});
addPhilosophersStoneRecipe({id: ItemID.fuelMobius, data: 0, count: 4}, {id: ItemID.fuelAstral, count: 1, data: 0});

addPhilosophersStoneRecipe({id: 368, data: 0, count: 1}, {id: 265, count: 4, data: 0});
addPhilosophersStoneRecipe({id: 263, data: 1, count: 4}, {id: 263, count: 1, data: 0});
if(VanillaItemID) addPhilosophersStoneRecipe({id: VanillaItemID.charcoal, data: 0, count: 4}, {id: 263, count: 1, data: 0});
addPhilosophersStoneRecipe({id: 263, data: 0, count: 1}, {id: 263, count: 4, data: 1});
if(VanillaItemID) addPhilosophersStoneRecipe({id: 263, data: 0, count: 1}, {id: VanillaItemID.charcoal, count: 4, data: -1});
addPhilosophersStoneRecipe({id: 266, data: 0, count: 1}, {id: 265, count: 8, data: 0});
addPhilosophersStoneRecipe({id: 265, data: 0, count: 8}, {id: 266, count: 1, data: 0});
addPhilosophersStoneRecipe({id: 264, data: 0, count: 1}, {id: 266, count: 4, data: 0});
addPhilosophersStoneRecipe({id: 266, data: 0, count: 4}, {id: 264, count: 1, data: 0});
addPhilosophersStoneRecipe({id: 388, data: 0, count: 1}, {id: 264, count: 2, data: 0});
addPhilosophersStoneRecipe({id: 264, data: 0, count: 2}, {id: 388, count: 1, data: 0});
});

//workbench
setUI_.philosophersStone = new setUI({id: ItemID.philosophersStone}, 700, 250, "crafting", function(){
Workbench_open();
});

Callback.addCallback("tick", function(){
try{
	if(Player.getCarriedItem().id==ItemID.philosophersStone && (GuiName=="in_game_play_screen"||GuiName=="hud_screen") )
		setUI_.philosophersStone.ui.open();
	else setUI_.philosophersStone.ui.close();
}catch(e){};
});
Callback.addCallback("LevelLeft", function(){try{setUI_.philosophersStone.ui.close()}catch(e){}});

//blocks
System.PS_regRecipe(1, 4, false);
System.PS_regRecipe(4, 1, false);
System.PS_regRecipe(2, 12, false);
System.PS_regRecipe(3, 12, false);
System.PS_regRecipe(12, 2, false);
System.PS_regRecipe(49, 10, false);
System.PS_regRecipe(79, 8, false);
System.PS_regRecipe(13, 24, false);
System.PS_regRecipe(24, 13, false);
System.PS_regRecipe(1, 2, true);
System.PS_regRecipe(4, 2, true);
System.PS_regRecipe(2, 4, true);
System.PS_regRecipe(12, 4, true);

Item.registerUseFunction("philosophersStone", function(crd, i, b){
var block = System.PS_getRecipe(b.id, Entity.getSneaking(Player.get()));
if(block){
World.setBlock(crd.x, crd.y, crd.z, block);
PlaySoundFile("petransmute.ogg");
}else{
if(Entity.getSneaking(Player.get())){
if(b.id==35&&b.data!==0){World.setBlock(crd.x, crd.y, crd.z, b.id, b.data-1);PlaySoundFile("petransmute.ogg");}else
if(b.id==35&&b.data==0){World.setBlock(crd.x, crd.y, crd.z, b.id, 15);PlaySoundFile("petransmute.ogg");}else
if(b.id==6&&b.data!==0){World.setBlock(crd.x, crd.y, crd.z, b.id, b.data-1);PlaySoundFile("petransmute.ogg");}else
if(b.id==6&&b.data==0){World.setBlock(crd.x, crd.y, crd.z, b.id, 5);PlaySoundFile("petransmute.ogg");}else
if(b.id==17&&b.data!==0){World.setBlock(crd.x, crd.y, crd.z, b.id, b.data-1);PlaySoundFile("petransmute.ogg");}else
if(b.id==17&&b.data==0){World.setBlock(crd.x, crd.y, crd.z, 162, 1);PlaySoundFile("petransmute.ogg");}else
if(b.id==162&&b.data!==0){World.setBlock(crd.x, crd.y, crd.z, b.id, b.data-1);PlaySoundFile("petransmute.ogg");}else
if(b.id==162&&b.data==0){World.setBlock(crd.x, crd.y, crd.z, 17, 3);PlaySoundFile("petransmute.ogg");}else
if(b.id==18&&b.data!==0){World.setBlock(crd.x, crd.y, crd.z, b.id, b.data-1);PlaySoundFile("petransmute.ogg");}else
if(b.id==18&&b.data==0){World.setBlock(crd.x, crd.y, crd.z, 161, 1);PlaySoundFile("petransmute.ogg");}else
if(b.id==161&&b.data!==0){World.setBlock(crd.x, crd.y, crd.z, b.id, b.data-1);PlaySoundFile("petransmute.ogg");}else
if(b.id==161&&b.data==0){World.setBlock(crd.x, crd.y, crd.z, 18, 3);PlaySoundFile("petransmute.ogg");}
}else{
if(b.id==35&&b.data!==15){World.setBlock(crd.x, crd.y, crd.z, b.id, b.data+1);PlaySoundFile("petransmute.ogg");}else
if(b.id==35&&b.data==15){World.setBlock(crd.x, crd.y, crd.z, b.id, 0);PlaySoundFile("petransmute.ogg");}else
if(b.id==6&&b.data!==5){World.setBlock(crd.x, crd.y, crd.z, b.id, b.data+1);PlaySoundFile("petransmute.ogg");}else
if(b.id==6&&b.data==5){World.setBlock(crd.x, crd.y, crd.z, b.id, 0);PlaySoundFile("petransmute.ogg");}else
if(b.id==17&&b.data!==3){World.setBlock(crd.x, crd.y, crd.z, b.id, b.data+1);PlaySoundFile("petransmute.ogg");}else
if(b.id==17&&b.data==3){World.setBlock(crd.x, crd.y, crd.z, 162, 0);PlaySoundFile("petransmute.ogg");}else
if(b.id==162&&b.data!==1){World.setBlock(crd.x, crd.y, crd.z, b.id, b.data+1);PlaySoundFile("petransmute.ogg");}else
if(b.id==162&&b.data==1){World.setBlock(crd.x, crd.y, crd.z, 17, 0);PlaySoundFile("petransmute.ogg");}else
if(b.id==18&&b.data!==3){World.setBlock(crd.x, crd.y, crd.z, b.id, b.data+1);PlaySoundFile("petransmute.ogg");}else
if(b.id==18&&b.data==3){World.setBlock(crd.x, crd.y, crd.z, 161, 0);PlaySoundFile("petransmute.ogg");}else
if(b.id==161&&b.data!==1){World.setBlock(crd.x, crd.y, crd.z, b.id, b.data+1);PlaySoundFile("petransmute.ogg");}else
if(b.id==161&&b.data==1){World.setBlock(crd.x, crd.y, crd.z, 18, 0);PlaySoundFile("petransmute.ogg");}
}}
});

//mobs
var transfer_mob=function(victim){
  for(h in evilList){
    if(Entity.getType(victim)==evilList[h]){
      Entity.spawn(Entity.getPosition(victim).x, Entity.getPosition(victim).y, Entity.getPosition(victim).z, choose(evilList));
      Entity.remove(victim);
      PlaySoundFile("phiball.ogg");
      return true;
    }
  }
  for(a in friendlyList){
     if(Entity.getType(victim)==friendlyList[a]){
     Entity.spawn(Entity.getPosition(victim).x, Entity.getPosition(victim).y, Entity.getPosition(victim).z, choose(friendlyList));
     Entity.remove(victim);
     PlaySoundFile("phiball.ogg");
     return true;
    }
  }
};

var dec_item=function(id){
  for(i = 0; i <= 36; i ++){
    let item=Player.getInventorySlot(i);
    if(item.id == id){
      Player.setInventorySlot(i, item.id, item.count-1, item.data, item.extra);
      return;
    }
  }
};

Callback.addCallback("PlayerAttack", function(player,victim){
  let item = Player.getCarriedItem();
  if(item.id==ItemID.philosophersStone){
    let redstone=Rings.get(331);
    if(redstone){
      if(transfer_mob(victim)){
      dec_item(331);
      }
    }else{
      Game.message(Translation.translate("Please bring the red stone to transfer the mobs."));
    }
  }
});