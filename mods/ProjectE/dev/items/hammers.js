const dirtBlocksDrop = {"2": 3, "3": 3, "60": 3, "61": 3, "198": 3, "243": 3, "110": 3};

function getBlockDrop(coords, id, data, level){
	 let dropFunc = Block.dropFunctions[id];
	 
	 if(dropFunc){
	   	return dropFunc(coords, id, data, level, {});
  	}
  	
  	if(dirtBlocksDrop[id]){
		  return [[dirtBlocksDrop[id], 1, 0]];
  	}
  	
  	return [[id, 1, data]];
}

var UNBREAKABLE = {0: true, 7: true, 8: true, 9: true, 10: true, 11: true,
 34: true, 51: true, 90: true, 95: true, 119: true, 120: true, 122: true,
 137: true, 188: true, 189: true, 192: true, 199: true, 205: true, 209: true,
 217: true, 218: true, 415: true, 416: true, 466: true, 470: true, 472: true};

var dmHammercount = 0;var rmHammercount =0;var morningStarcount = 0;


IDRegistry.genItemID("dmHammer");
Item.createItem("dmHammer", "Dark matter hammer", {name: "dm_hammer", meta: 0}, {stack: 1});
ToolAPI.setTool(ItemID.dmHammer, {level: 5, efficiency: 10, damage: 16, durability: 10000000, enchantability: 30}, ToolType.pickaxe);
SetDescription(ItemID.dmHammer, Translation.translate("§3Click to mine by range."));

Item.registerUseFunction("dmHammer", function(coords, item, block){
  let x=coords.x; y=coords.y; z=coords.z;
  let rr = 2-dmHammercount;
  
  if(!Entity.getSneaking(Player.get())){
    for(xx = -rr; xx <= rr; xx++){
      for(yy = -rr; yy <= rr; yy++){
        for(zz = -rr; zz <= rr; zz++){
          let block = World.getBlock(x + xx, y + yy, z + zz);
          if(!UNBREAKABLE[block.id]){
            var block_drop = Block.getBlockDropViaItem(block, {id: ItemID.dmHammer, data:0}, i) || [];
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
});

setUI_.dmHammer = new setUI({id: ItemID.dmHammer}, 700, 250, "change", function(){
if(dmHammercount<2){dmHammercount=dmHammercount+1} else
if(dmHammercount>=2){dmHammercount=0};
Game.message(Translation.translate("Excavation Range: ")+(5-2*dmHammercount))
});

Callback.addCallback("tick", function(){
try{
if(Player.getCarriedItem().id==ItemID.dmHammer && (GuiName=="in_game_play_screen"||GuiName=="hud_screen") ){
setUI_.dmHammer.ui.open()}else{setUI_.dmHammer.ui.close()};
}catch(e){};
});
Callback.addCallback("LevelLeft", function(){try{setUI_.dmHammer.ui.close()}catch(e){}});


IDRegistry.genItemID("rmHammer");
Item.createItem("rmHammer", "Red matter hammer", {name: "rm_hammer", meta: 0}, {stack: 1});
ToolAPI.setTool(ItemID.rmHammer, {level: 5, efficiency: 14, damage: 30, durability: 10000000, enchantability: 30}, ToolType.pickaxe);
SetDescription(ItemID.rmHammer, Translation.translate("§3Click to mine by range."));

Item.registerUseFunction("rmHammer", function(coords, item, block){
  let x=coords.x; y=coords.y; z=coords.z;
  let rr = 4-rmHammercount;
  
  if(!Entity.getSneaking(Player.get())){
    for(xx = -rr; xx <= rr; xx++){
      for(yy = -rr; yy <= rr; yy++){
        for(zz = -rr; zz <= rr; zz++){
          let block = World.getBlock(x + xx, y + yy, z + zz);
          if(!UNBREAKABLE[block.id]){
            var block_drop = Block.getBlockDropViaItem(block, {id: ItemID.rmHammer, data:0}, i) || [];
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
});

setUI_.rmHammer = new setUI({id: ItemID.rmHammer}, 700, 250, "change", function(){
if(rmHammercount<4){rmHammercount=rmHammercount+1} else
if(rmHammercount>=4){rmHammercount=0};
Game.message(Translation.translate("Excavation Range: ")+(9-2*rmHammercount))
});

Callback.addCallback("tick", function(){
try{
if(Player.getCarriedItem().id==ItemID.rmHammer && (GuiName=="in_game_play_screen"||GuiName=="hud_screen") ){
setUI_.rmHammer.ui.open()}else{setUI_.rmHammer.ui.close()};
}catch(e){};
});
Callback.addCallback("LevelLeft", function(){try{setUI_.rmHammer.ui.close()}catch(e){}});


Callback.addCallback("PostLoaded", function (){
Recipes.addShaped({id: ItemID.dmHammer, count: 1, data: 0}, ["mdm", " d", " d"], ["m", ItemID.darkMatter, 0, "d", 264, 0]);
Recipes.addShaped({id: ItemID.rmHammer, count: 1, data: 0}, ["mhm", " d", " d"], ["m", ItemID.redMatter, 0, "d", ItemID.darkMatter, 0, "h", ItemID.dmHammer, -1]);
});