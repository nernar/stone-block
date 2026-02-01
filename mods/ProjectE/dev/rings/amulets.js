IDRegistry.genItemID("evertideAmulet");
Item.createItem("evertideAmulet", "Evertide Amulet", {name: "evertideAmulet", meta: 0}, {stack: 1});
SetDescription(ItemID.evertideAmulet, Translation.translate("§3In inventory: allow you to walk on the water.\n§3On pedestal: make the weather rainy.\n§3Be used: place a block of water."));

IDRegistry.genItemID("vulcaniteAmulet");
Item.createItem("vulcaniteAmulet", "Vulcanite Amulet", {name: "vulcaniteAmulet", meta: 0}, {stack: 1});
SetDescription(ItemID.vulcaniteAmulet, Translation.translate("§3In inventory: allow you to walk on the lava.\n§3On pedestal: make the weather clear.\n§3Be used: place a block of lava."));

Callback.addCallback("PostLoaded", function (){
if(hard_mode){
	  Recipes.addShaped({id: ItemID.evertideAmulet, count: 1, data: 0}, 
	     ["www", 
	      "mmm",
	      "www"],
	    ["w", 325, 8, "m", ItemID.redMatter, 0]);
	  if(VanillaItemID) Recipes.addShaped({id: ItemID.evertideAmulet, count: 1, data: 0}, 
	     ["www", 
	      "mmm",
	      "www"],
	    ["w", VanillaItemID.water_bucket, 0, "m", ItemID.redMatter, 0]);
	  
	  Recipes.addShaped({id: ItemID.vulcaniteAmulet, count: 1, data: 0}, 
	     ["www", 
	      "mmm",
	      "www"],
	    ["w", 325, 10, "m", ItemID.redMatter, 0]);
	  if(VanillaItemID) Recipes.addShaped({id: ItemID.vulcaniteAmulet, count: 1, data: 0}, 
	     ["www", 
	      "mmm",
	      "www"],
	    ["w", VanillaItemID.lava_bucket, 0, "m", ItemID.redMatter, 0]);
	}else{
	  Recipes.addShaped({id: ItemID.evertideAmulet, count: 1, data: 0}, 
	     ["www", 
	      "mmm",
	      "www"],
	    ["w", 325, 8, "m", ItemID.darkMatter, 0]);
	  if(VanillaItemID) Recipes.addShaped({id: ItemID.evertideAmulet, count: 1, data: 0}, 
	     ["www", 
	      "mmm",
	      "www"],
	    ["w", VanillaItemID.water_bucket, 0, "m", ItemID.darkMatter, 0]);
	  
	  Recipes.addShaped({id: ItemID.vulcaniteAmulet, count: 1, data: 0}, 
	     ["www", 
	      "mmm",
	      "www"],
	    ["w", 325, 10, "m", ItemID.darkMatter, 0]);
	  if(VanillaItemID) Recipes.addShaped({id: ItemID.vulcaniteAmulet, count: 1, data: 0}, 
	     ["www", 
	      "mmm",
	      "www"],
	    ["w", VanillaItemID.lava_bucket, 0, "m", ItemID.darkMatter, 0]);
	};
});

Item.registerUseFunction("evertideAmulet", function (crd, i, b){
  var c = crd.relative;
  if(World.getBlockID(c.x, c.y, c.z) == 0 || World.getBlockID(c.x, c.y, c.z) == 8 || World.getBlockID(c.x, c.y, c.z) == 9){
    World.setBlock(c.x, c.y, c.z, 8, 0);
  }
});

Item.registerUseFunction("vulcaniteAmulet", function (crd, i, b){
  var c = crd.relative;
  if(World.getBlockID(c.x, c.y, c.z) == 0 || World.getBlockID(c.x, c.y, c.z) == 10 || World.getBlockID(c.x, c.y, c.z) == 11){
    World.setBlock(c.x, c.y, c.z, 10, 0);
  }
});

Rings.float(8, function(){return Rings.get(ItemID.evertideAmulet)});
Rings.float(9, function(){return Rings.get(ItemID.evertideAmulet)});
Callback.addCallback("tick", function(){
  if(Rings.get(ItemID.evertideAmulet)){
    let p=Player.getPosition();
    if(World.getBlockID(p.x, p.y, p.z) == 9){
      Entity.addEffect(Player.get(), 13, 0, 160, false, false);
    }
  }
});
Rings.addPedestalFunction(ItemID.evertideAmulet, function(tile, coords){
World.setWeather({rain: 10});
tile.data.active=false;
});

Rings.float(10, function(){return Rings.get(ItemID.vulcaniteAmulet)});
Rings.float(11, function(){return Rings.get(ItemID.vulcaniteAmulet)});
Callback.addCallback("tick", function(){
  if(Rings.get(ItemID.vulcaniteAmulet)){
    Entity.setFire(Player.get(), 0);
    Entity.addEffect(Player.get(), 12, 0, 160, false, false);
  }
});
Rings.addPedestalFunction(ItemID.vulcaniteAmulet, function(tile, coords){
World.setWeather({rain: 0});
tile.data.active=false;
});
