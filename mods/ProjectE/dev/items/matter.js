IDRegistry.genItemID("dmPickaxe");
Item.createItem("dmPickaxe", "Dark matter pickaxe", {name: "dm_pickaxe", meta: 0}, {stack: 1});
IDRegistry.genItemID("dmAxe");
Item.createItem("dmAxe", "Dark matter axe", {name: "dm_axe", meta: 0}, {stack: 1});
IDRegistry.genItemID("dmShovel");
Item.createItem("dmShovel", "Dark matter shovel", {name: "dm_shovel", meta: 0}, {stack: 1});
IDRegistry.genItemID("dmSword");
Item.createItem("dmSword", "Dark matter sword", {name: "dm_sword", meta: 0}, {stack: 1});

ToolAPI.setTool(ItemID.dmPickaxe, {level: 5, efficiency: 10, damage: 10, durability: 10000000, enchantability: 30}, ToolType.pickaxe);
ToolAPI.setTool(ItemID.dmAxe, {level: 5, efficiency: 10, damage: 16, durability: 10000000, enchantability: 30}, ToolType.axe);
ToolAPI.setTool(ItemID.dmShovel, {level: 5, efficiency: 10, damage: 10, durability: 10000000, enchantability: 30}, ToolType.shovel);
ToolAPI.setTool(ItemID.dmSword, {level: 5, efficiency: 10, damage: 20, durability: 10000000, enchantability: 30}, ToolType.sword);

IDRegistry.genItemID("dmHelm");
IDRegistry.genItemID("dmChest");
IDRegistry.genItemID("dmLegg");
IDRegistry.genItemID("dmBoots");

Item.createArmorItem("dmHelm", "Dark matter helmet", {name: "dm_armor", meta: 2}, {type: "helmet", armor: 7, durability: 10000000, texture: "armor/dm_0.png"});
Item.createArmorItem("dmChest", "Dark matter chestplate", {name: "dm_armor", meta: 0}, {type: "chestplate", armor: 14, durability: 10000000, texture: "armor/dm_0.png"});
Item.createArmorItem("dmLegg", "Dark matter leggings", {name: "dm_armor", meta: 3}, {type: "leggings", armor: 12, durability: 10000000, texture: "armor/dm_1.png"});
Item.createArmorItem("dmBoots", "Dark matter boots", {name: "dm_armor", meta: 1}, {type: "boots", armor: 7, durability: 10000000, texture: "armor/dm_0.png"});

Callback.addCallback("PostLoaded", function(){
Recipes.addShaped({id: ItemID.dmHelm, count: 1, data: 0}, ["aaa", "a a", "   "], ["a", ItemID.darkMatter, 0]);
Recipes.addShaped({id: ItemID.dmChest, count: 1, data: 0}, ["a a", "aaa", "aaa"], ["a", ItemID.darkMatter, 0]);
Recipes.addShaped({id: ItemID.dmLegg, count: 1, data: 0}, ["aaa", "a a", "a a"], ["a", ItemID.darkMatter, 0]);
Recipes.addShaped({id: ItemID.dmBoots, count: 1, data: 0}, ["a a", "a a", "   "], ["a", ItemID.darkMatter, 0]);

Recipes.addShaped({id: ItemID.dmPickaxe, count: 1, data: 0}, ["aaa", " d ", " d "], ["a", ItemID.darkMatter, 0, "d", 264, 0]);
Recipes.addShaped({id: ItemID.dmAxe, count: 1, data: 0}, ["aa", "ad", " d"], ["a", ItemID.darkMatter, 0, "d", 264, 0]);
Recipes.addShaped({id: ItemID.dmShovel, count: 1, data: 0}, ["a", "d", "d"], ["a", ItemID.darkMatter, 0, "d", 264, 0]);
Recipes.addShaped({id: ItemID.dmSword, count: 1, data: 0}, ["a", "a", "d"], ["a", ItemID.darkMatter, 0, "d", 264, 0]);
});


IDRegistry.genItemID("rmPickaxe");
Item.createItem("rmPickaxe", "Red matter pickaxe", {name: "rm_pickaxe", meta: 0}, {stack: 1});
IDRegistry.genItemID("rmAxe");
Item.createItem("rmAxe", "Red matter axe", {name: "rm_axe", meta: 0}, {stack: 1});
IDRegistry.genItemID("rmShovel");
Item.createItem("rmShovel", "Red matter shovel", {name: "rm_shovel", meta: 0}, {stack: 1});
IDRegistry.genItemID("rmSword");
Item.createItem("rmSword", "Red matter sword", {name: "rm_sword", meta: 0}, {stack: 1});
SetDescription(ItemID.rmSword, Translation.translate("§3Attack with AoE while sneaking."));

ToolAPI.setTool(ItemID.rmPickaxe, {level: 5, efficiency: 14, damage: 20, durability: 10000000, enchantability: 30}, ToolType.pickaxe);
ToolAPI.setTool(ItemID.rmAxe, {level: 5, efficiency: 14, damage: 30, durability: 10000000, enchantability: 30}, ToolType.axe);
ToolAPI.setTool(ItemID.rmShovel, {level: 5, efficiency: 14, damage: 20, durability: 10000000, enchantability: 30}, ToolType.shovel);
ToolAPI.setTool(ItemID.rmSword, {level: 5, efficiency: 14, damage: 100, durability: 10000000, enchantability: 30}, ToolType.sword);

IDRegistry.genItemID("rmHelm");
IDRegistry.genItemID("rmChest");
IDRegistry.genItemID("rmLegg");
IDRegistry.genItemID("rmBoots");

Item.createArmorItem("rmHelm", "Red matter helmet", {name: "rm_armor", meta: 2}, {type: "helmet", armor: 7, durability: 10000000, texture: "armor/rm_0.png"});
Item.createArmorItem("rmChest", "Red matter chestplate", {name: "rm_armor", meta: 0}, {type: "chestplate", armor: 14, durability: 10000000, texture: "armor/rm_0.png"});
Item.createArmorItem("rmLegg", "Red matter leggings", {name: "rm_armor", meta: 3}, {type: "leggings", armor: 12, durability: 10000000, texture: "armor/rm_1.png"});
Item.createArmorItem("rmBoots", "Red matter boots", {name: "rm_armor", meta: 1}, {type: "boots", armor: 7, durability: 10000000, texture: "armor/rm_0.png"});

SetDescription(ItemID.rmHelm, Translation.translate("§3Dress in full suit to unlock stronger effects."));
SetDescription(ItemID.rmChest, Translation.translate("§3Dress in full suit to unlock stronger effects."));
SetDescription(ItemID.rmLegg, Translation.translate("§3Dress in full suit to unlock stronger effects."));
SetDescription(ItemID.rmBoots, Translation.translate("§3Dress in full suit to unlock stronger effects."));

Callback.addCallback("PostLoaded", function(){
Recipes.addShaped({id: ItemID.rmHelm, count: 1, data: 0}, ["aaa", "ada", "   "], ["a", ItemID.redMatter, 0, "d", ItemID.dmHelm, -1]);
Recipes.addShaped({id: ItemID.rmChest, count: 1, data: 0}, ["ada", "aaa", "aaa"], ["a", ItemID.redMatter, 0, "d", ItemID.dmChest, -1]);
Recipes.addShaped({id: ItemID.rmLegg, count: 1, data: 0}, ["aaa", "ada", "a a"], ["a", ItemID.redMatter, 0, "d", ItemID.dmLegg, -1]);
Recipes.addShaped({id: ItemID.rmBoots, count: 1, data: 0}, ["ada", "a a", "   "], ["a", ItemID.redMatter, 0, "d", ItemID.dmBoots, -1]);
Recipes.addShaped({id: ItemID.rmPickaxe, count: 1, data: 0}, ["aaa", " m ", " d "], ["a", ItemID.redMatter, 0, "d", ItemID.darkMatter, 0, "m", ItemID.dmPickaxe, -1]);
Recipes.addShaped({id: ItemID.rmAxe, count: 1, data: 0}, ["aa", "am", " d"], ["a", ItemID.redMatter, 0, "d", ItemID.darkMatter, 0, "m", ItemID.dmAxe, -1]);
Recipes.addShaped({id: ItemID.rmShovel, count: 1, data: 0}, ["a", "m", "d"], ["a", ItemID.redMatter, 0, "d", ItemID.darkMatter, 0, "m", ItemID.dmShovel, -1]);
Recipes.addShaped({id: ItemID.rmSword, count: 1, data: 0}, ["a", "m", "d"], ["a", ItemID.redMatter, 0, "d", ItemID.darkMatter, 0, "m", ItemID.dmSword, -1]);
});

var rm_fly=false;
Callback.addCallback("tick", function(){
  if(
    Entity.getArmorSlot(Player.get(), 0).id == ItemID.rmHelm &&
    Entity.getArmorSlot(Player.get(), 1).id == ItemID.rmChest &&
    Entity.getArmorSlot(Player.get(), 2).id == ItemID.rmLegg &&
    Entity.getArmorSlot(Player.get(), 3).id == ItemID.rmBoots
  ){
  Player.setHunger(20);
  if(!rm_fly){rm_fly=true};
  Player.setFlyingEnabled(true);
  }else if(rm_fly && Game.getGameMode()!==1){
    rm_fly=false;
    Player.setFlyingEnabled(false);
    Player.setFlying(false);
  };
});

ToolType.katar = {
  isWeapon: true,
  damage: 8,
  baseDamage: 16,
  blockTypes: ["fibre", "wood", "plant"],
  onDestroy: function(item){
    item.data=0;
  },
  onBroke: function(item){
    item.data=0;
    return true;
  },
  onAttack: function(item, mob){
    item.data=0;
  },
  useItem: function(c, i, b){
    if(b.id == 17 || b.id == 162){
      var rad = 24;
      for(x = -rad; x <= rad; x ++){
        for(y = -2; y <= rad; y ++){
          for(z = -rad; z <= rad; z ++){
            let block = World.getBlock(c.x+x, c.y+y, c.z+z);
            if(block.id == b.id){
              World.setBlock(c.x+x, c.y+y, c.z+z, 0);
              Player.addItemToInventory(block.id, 1, block.data);
            }
          }
        }
      }
    }
  }
};

ToolType.morningStar = {
  isWeapon: true,
  damage: 8,
  baseDamage: 12,
  blockTypes: ["stone", "wood", "dirt", "plant", "fibre"],
  onDestroy: function(item){
    item.data=0;
  },
  onBroke: function(item){
    item.data=0;
    return true;
  },
  onAttack: function(item, mob){
    item.data=0;
  },
  calcDestroyTime: function(i, c, b, p, d, e){
    var material = ToolAPI.getBlockMaterial(b.id) || {};
    if(d<=0.05){return d}
    if((material.name&&material.name!=="unbreaking")||d>=10000){return 0.05}
    return d;
  },
  useItem: function(coords, item, block){
    let x=coords.x; y=coords.y; z=coords.z;
    let rr = 6-morningStarcount;
    
    if(!Entity.getSneaking(Player.get())){
      for(xx = -rr; xx <= rr; xx++){
        for(yy = -rr; yy <= rr; yy++){
          for(zz = -rr; zz <= rr; zz++){
            let block = World.getBlock(x + xx, y + yy, z + zz);
            if(!UNBREAKABLE[block.id]){
            var block_drop = Block.getBlockDropViaItem(block, {id: ItemID.rmMorningStar, data:0}, i) || [];
            var pp = Player.getPosition();
            block_drop.map(function(ii){
              World.drop(pp.x, pp.y, pp.z, ii[0], ii[1], ii[2])
            })
            World.setBlock(x + xx, y + yy, z + zz, 0);
            }
          }
        }
      }
    }
  }
};

IDRegistry.genItemID("rmKatar");
Item.createItem("rmKatar", "Red Matter Katar", {name: "katar", meta: 0}, {stack: 1});
SetDescription(ItemID.rmKatar, Translation.translate("§3Attack with AoE while sneaking.")+"\n"+Translation.translate("§3Click to trim the leaves."));

IDRegistry.genItemID("rmMorningStar");
Item.createItem("rmMorningStar", "Red Matter Morning Star", {name: "morning_star", meta: 0}, {stack: 1});
SetDescription(ItemID.rmMorningStar, Translation.translate("§3Click to mine by range."));


ToolAPI.setTool(ItemID.rmKatar, {level: 5, efficiency: 20, damage: 1000, durability: 10000000, enchantability: 30}, ToolType.katar);
ToolAPI.setTool(ItemID.rmMorningStar, {level: 5, efficiency: 30, damage: 30, durability: 10000000, enchantability: 30}, ToolType.morningStar);

Callback.addCallback("PostLoaded", function(){
	if(hard_mode){
		Recipes.addShaped({id: ItemID.rmKatar, count: 1, data: 0},
		    ["sak", "rrr", "rrr"],
		    ["k", ItemID.kleinStar6, -1, "s", ItemID.rmSword, -1, "a", ItemID.rmAxe, -1, "r", ItemID.redMatter, -1]);
		Recipes.addShaped({id: ItemID.rmMorningStar, count: 1, data: 0},
		    ["sak", "hrr", "rrr"],
		    ["k", ItemID.kleinStar6, -1, "h", ItemID.rmHammer, -1, "s", ItemID.rmShovel, -1, "a", ItemID.rmPickaxe, -1, "r", ItemID.redMatter, -1]);
	}else{
		Recipes.addShaped({id: ItemID.rmKatar, count: 1, data: 0},
		    ["sar", "rrr", "rrr"],
		    ["s", ItemID.rmSword, -1, "a", ItemID.rmAxe, -1, "r", ItemID.redMatter, -1]);
		Recipes.addShaped({id: ItemID.rmMorningStar, count: 1, data: 0},
		    ["sar", "hrr", "rrr"],
		    ["h", ItemID.rmHammer, -1, "s", ItemID.rmShovel, -1, "a", ItemID.rmPickaxe, -1, "r", ItemID.redMatter, -1]);
	}
});

setUI_.rmMorningStar = new setUI({id: ItemID.rmMorningStar}, 700, 250, "change", function(){
if(morningStarcount<6){morningStarcount = morningStarcount+1} else
if(morningStarcount>=6){morningStarcount = 0};
Game.message(Translation.translate("Excavation Range: ")+(13-2*morningStarcount))
});

Callback.addCallback("tick", function(){
try{
if(Player.getCarriedItem().id==ItemID.rmMorningStar && (GuiName=="in_game_play_screen"||GuiName=="hud_screen") ){
setUI_.rmMorningStar.ui.open()}else{setUI_.rmMorningStar.ui.close()};
}catch(e){};
});
Callback.addCallback("LevelLeft", function(){try{setUI_.rmMorningStar.ui.close()}catch(e){}});


Callback.addCallback("EntityHurt", function(a, v, d){
  item = Player.getCarriedItem();
  if(a == Player.get() && (item.id == ItemID.rmKatar) && Entity.getSneaking(Player.get())==true){
    var pos = Entity.getPosition(v);
    for(m in allMobs){
      var mobs = Entity.getAllInRange(pos, 6, allMobs[m]);
      for(i in mobs){
        var mob = mobs[i];
        Entity.damageEntity(mob, 1000, Player.get());
      }
    }
  }
});//潜行秒杀1
Callback.addCallback("EntityHurt", function(a, v, d){
  item = Player.getCarriedItem();
  if(a == Player.get() && (item.id == ItemID.rmSword) && Entity.getSneaking(Player.get())==true){
    var pos = Entity.getPosition(v);
    for(m in allMobs){
      var mobs = Entity.getAllInRange(pos, 3, allMobs[m]);
      for(i in mobs){
        var mob = mobs[i];
        Entity.damageEntity(mob, 100, Player.get());
      }
    }
  }
});//潜行秒杀2