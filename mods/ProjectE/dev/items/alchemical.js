IDRegistry.genItemID("fuelAlchemical");
IDRegistry.genItemID("fuelMobius");
IDRegistry.genItemID("fuelAstral");
IDRegistry.genItemID("darkMatter");
IDRegistry.genItemID("redMatter");

Item.createItem("fuelAlchemical", "Alchemical fuel", {name: "fuelAlchemical"}, {stack: 64});
Item.createItem("fuelMobius", "Mobius fuel", {name: "fuelMobius"}, {stack: 64});
Item.createItem("fuelAstral", "Astral fuel", {name: "fuelAstral"}, {stack: 64});
Item.createItem("darkMatter", "Dark matter", {name: "darkMatter", meta: 0}, {stack: 64});
Item.createItem("redMatter", "Red matter", {name: "redMatter", meta: 0}, {stack: 64});

Recipes.addFurnaceFuel(ItemID.fuelAlchemical,0,6400);
Recipes.addFurnaceFuel(ItemID.fuelMobius,0,25600);
Recipes.addFurnaceFuel(ItemID.fuelAstral,0,102400);

IDRegistry.genBlockID("blockAlchemicalFuel");
IDRegistry.genBlockID("blockMobiusFuel");
IDRegistry.genBlockID("blockAstralFuel");
IDRegistry.genBlockID("dmBlock");
IDRegistry.genBlockID("rmBlock");

Block.createBlock("blockAlchemicalFuel", [{name: "Alchemical fuel block", texture: [["fuelAlchemical",0]], inCreative: true}],"opaque");
Block.createBlock("blockMobiusFuel", [{name: "Mobius fuel block", texture: [["fuelMobius",0]], inCreative: true}],"opaque");
Block.createBlock("blockAstralFuel", [{name: "Astral fuel block", texture: [["fuelAstral",0]], inCreative: true}],"opaque");
Block.createBlock("dmBlock", [{name: "Dark matter block", texture: [["dmBlock",0]], inCreative: true}],"opaque");
Block.createBlock("rmBlock", [{name: "Red matter block", texture: [["rmBlock",0]], inCreative: true}],"opaque");

Recipes.addFurnaceFuel(BlockID.blockAlchemicalFuel, 0, 6400*9);
Recipes.addFurnaceFuel(BlockID.blockMobiusFuel, 0, 518400);
Recipes.addFurnaceFuel(BlockID.blockAstralFuel, 0, 518400*9);


Callback.addCallback("PostLoaded", function(){
Recipes.addShaped({id: ItemID.darkMatter, count: 1, data: 0}, ["aaa", "aba", "aaa"],["a", ItemID.fuelAstral, 0, "b", 57, 0]);
Recipes.addShaped({id: ItemID.redMatter, count: 1, data: 0}, ["aaa", "bbb", "aaa"],["a", ItemID.fuelAstral, 0, "b", ItemID.darkMatter, 0]);
});


IDRegistry.genItemID("covDust1");
IDRegistry.genItemID("covDust2");
IDRegistry.genItemID("covDust3");
IDRegistry.genItemID("rodDivining1");
IDRegistry.genItemID("rodDivining2");
IDRegistry.genItemID("rodDivining3");

Item.createItem("covDust1", "Covalence dust Low", {name: "dustCovalenceLow", meta: 0}, {stack: 64});
Item.createItem("covDust2", "Covalence dust Medium", {name: "dustCovalenceMedium", meta: 0}, {stack: 64});
Item.createItem("covDust3", "Covalence dust High", {name: "dustCovalenceHigh", meta: 0}, {stack: 64});
Item.createItem("rodDivining1", "Divining rod low", {name: "rodDivining", meta: 0}, {stack: 1});
Item.createItem("rodDivining2", "Divining rod medium", {name: "rodDivining", meta: 1}, {stack: 1});
Item.createItem("rodDivining3", "Divining rod high", {name: "rodDivining", meta: 2}, {stack: 1});


Callback.addCallback("PostLoaded", function(){
Recipes.addShaped({id: ItemID.covDust1, count: 40, data: 0}, ["sii", "iii", "iii"],["s", 263, 1, "i", 4, 0]);
if(VanillaItemID) Recipes.addShaped({id: ItemID.covDust1, count: 40, data: 0}, ["sii", "iii", "iii"],["s", VanillaItemID.charcoal, 0, "i", 4, 0]);
if(VanillaItemID) Recipes.addShaped({id: ItemID.covDust1, count: 40, data: 0}, ["sii", "iii", "iii"],["s", VanillaItemID.charcoal, 1, "i", 4, 0]);
Recipes.addShapeless({id: ItemID.covDust2, count: 40, data: 0}, [{id: 265, data: 0},{id: 331, data: 0}]);
Recipes.addShapeless({id: ItemID.covDust3, count: 40, data: 0}, [{id: 264, data: 0},{id: 263, data: 0}]);

Recipes.addShaped({id: ItemID.rodDivining1, count: 1, data: 0}, ["iii", "isi", "iii"],["s", 280, 0, "i", ItemID.covDust1, 0]);
Recipes.addShaped({id: ItemID.rodDivining2, count: 1, data: 0}, ["iii", "isi", "iii"],["s", ItemID.rodDivining1, 0, "i", ItemID.covDust2, 0]);
Recipes.addShaped({id: ItemID.rodDivining3, count: 1, data: 0}, ["iii", "isi", "iii"],["s", ItemID.rodDivining2, 0, "i", ItemID.covDust3, 0]);

Recipes.addShapeless({id: BlockID.dmBlock, count: 1, data: 0}, [{id: ItemID.darkMatter, data: 0}, {id: ItemID.darkMatter, data: 0}, {id: ItemID.darkMatter, data: 0}, {id: ItemID.darkMatter, data: 0}]);
Recipes.addShapeless({id: BlockID.rmBlock, count: 1, data: 0}, [{id: ItemID.redMatter, data: 0}, {id: ItemID.redMatter, data: 0}, {id: ItemID.redMatter, data: 0}, {id: ItemID.redMatter, data: 0}]);
Recipes.addShaped({id: BlockID.blockAlchemicalFuel, count: 1, data: 0}, ["aaa", "aaa", "aaa"],["a", ItemID.fuelAlchemical, 0]);
Recipes.addShaped({id: BlockID.blockMobiusFuel, count: 1, data: 0}, ["aaa", "aaa", "aaa"],["a", ItemID.fuelMobius, 0]);
Recipes.addShaped({id: BlockID.blockAstralFuel, count: 1, data: 0}, ["aaa", "aaa", "aaa"],["a", ItemID.fuelAstral, 0]);

Recipes.addShapeless({id: ItemID.darkMatter, count: 4, data: 0}, [{id: BlockID.dmBlock, data: 0}]);
Recipes.addShapeless({id: ItemID.redMatter, count: 4, data: 0}, [{id: BlockID.rmBlock, data: 0}]);
Recipes.addShapeless({id: ItemID.fuelAlchemical, count: 9, data: 0}, [{id: BlockID.blockAlchemicalFuel, data: 0}]);
Recipes.addShapeless({id: ItemID.fuelMobius, count: 9, data: 0}, [{id: BlockID.blockMobiusFuel, data: 0}]);
Recipes.addShapeless({id: ItemID.fuelAstral, count: 9, data: 0}, [{id: BlockID.blockAstralFuel, data: 0}]);
});


var ore_emc = {"1": 1, "14": 2048, "15": 256, "16": 128, "56": 8192, "129": 16384, "73": 64};

Item.registerUseFunction("rodDivining1", function(crd, b, i){
  let total = 0;
  c = crd.relative
  for(let xx = -1; xx <= 1; xx++){
    for(let yy = -1; yy <= 1; yy++){
      for(let zz = -1; zz <= 1; zz++){
        let val = ore_emc[World.getBlockID(c.x+xx, c.y+yy, c.z+zz)];
        if(val){total+=val};
      }
    }
  }
  Game.message(Translation.translate("Total EMC in this area: ")+total);
});

Item.registerUseFunction("rodDivining2", function(crd, b, i){
  let total = 0;
  c = crd.relative
  for(let xx = -2; xx <= 2; xx++){
    for(let yy = -2; yy <= 2; yy++){
      for(let zz = -2; zz <= 2; zz++){
        let val = ore_emc[World.getBlockID(c.x+xx, c.y+yy, c.z+zz)];
        if(val){total+=val};
      }
    }
  }
  Game.message(Translation.translate("Total EMC in this area: ")+total);
});

Item.registerUseFunction("rodDivining3", function(crd, b, i){
  let total = 0;
  c = crd.relative
  for(let xx = -3; xx <= 3; xx++){
    for(let yy = -2; yy <= 2; yy++){
      for(let zz = -3; zz <= 3; zz++){
        let val = ore_emc[World.getBlockID(c.x+xx, c.y+yy, c.z+zz)];
        if(val){total+=val};
      }
    }
  }
  Game.message(Translation.translate("Total EMC in this area: ")+total);
});