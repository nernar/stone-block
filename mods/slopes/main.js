const collision = __config__.getBool("CollisionShape");

const regSlope = function(id, name, tex, meta, stairs, block, data){
  id = "slope_" + id;

  IDRegistry.genBlockID(id);
  Block.createBlockWithRotation(id, [{name: "", texture: [[tex, meta]]}]);

  IDRegistry.genItemID(id);
  Item.createItem(id, name + " Slope", {name: id});
  Recipes.addShaped({id: ItemID[id], count: 4}, ["aoo", "bao", "bba"], ["a", stairs, 0, "b", block, data || -1]);

  Item.registerUseFunction(id, function(c){
    let yaw = ((Entity.getLookAngle(Player.get()).yaw * 180 / Math.PI) - 45) / 90;
    yaw < 0 && yaw--;
    yaw &= 3;
    c = c.relative;
    ~[0, 8, 9, 10, 11, 31].indexOf(World.getBlock(c.x, c.y, c.z).id) &&
      World.setBlock(c.x, c.y, c.z, BlockID[id], [2, 0, 3, 1][yaw]) &
      Player.decreaseCarriedItem();
  });

  Block.registerDropFunction(id, function(){
    return [[ItemID[id], 1]];
  });


  let i = 0;

  const render = [];
  const group = [];

  for(i = 4; i--;){
    render[i] = new ICRender.Model();
    group[i] = ICRender.getGroup("slope" + i);
    group[i].add(BlockID[id], i);
  }

  const model = [];
  let mesh;

  for(i = 12; i--;){
    mesh = new RenderMesh();
    mesh.setBlockTexture(tex, meta);
    mesh.importFromFile(__dir__ + "res/model/" + i + ".obj", "obj", null);
    model[i] = new BlockRenderer.Model(mesh);
  }

  render[0].addEntry(model[0]).setCondition(ICRender.AND(
    ICRender.BLOCK(0, 0, -1, group[2], true),
    ICRender.BLOCK(0, 0, -1, group[3], true),
    ICRender.BLOCK(0, 0, 1, group[2], true),
    ICRender.BLOCK(0, 0, 1, group[3], true)
  ));
  render[0].addEntry(model[4]).asCondition(0, 0, -1, group[2], 0);
  render[0].addEntry(model[7]).asCondition(0, 0, -1, group[3], 0);
  render[0].addEntry(model[8]).asCondition(0, 0, 1, group[2], 0);
  render[0].addEntry(model[11]).asCondition(0, 0, 1, group[3], 0);

  render[1].addEntry(model[1]).setCondition(ICRender.AND(
    ICRender.BLOCK(0, 0, 1, group[2], true),
    ICRender.BLOCK(0, 0, 1, group[3], true),
    ICRender.BLOCK(0, 0, -1, group[2], true),
    ICRender.BLOCK(0, 0, -1, group[3], true)
  ));
  render[1].addEntry(model[5]).asCondition(0, 0, 1, group[2], 0);
  render[1].addEntry(model[6]).asCondition(0, 0, 1, group[3], 0);
  render[1].addEntry(model[9]).asCondition(0, 0, -1, group[2], 0);
  render[1].addEntry(model[10]).asCondition(0, 0, -1, group[3], 0);

  render[2].addEntry(model[2]).setCondition(ICRender.AND(
    ICRender.BLOCK(-1, 0, 0, group[0], true),
    ICRender.BLOCK(-1, 0, 0, group[1], true),
    ICRender.BLOCK(1, 0, 0, group[0], true),
    ICRender.BLOCK(1, 0, 0, group[1], true)
  ));
  render[2].addEntry(model[4]).asCondition(-1, 0, 0, group[0], 0);
  render[2].addEntry(model[5]).asCondition(-1, 0, 0, group[1], 0);
  render[2].addEntry(model[8]).asCondition(1, 0, 0, group[0], 0);
  render[2].addEntry(model[9]).asCondition(1, 0, 0, group[1], 0);

  render[3].addEntry(model[3]).setCondition(ICRender.AND(
    ICRender.BLOCK(1, 0, 0, group[0], true),
    ICRender.BLOCK(1, 0, 0, group[1], true),
    ICRender.BLOCK(-1, 0, 0, group[0], true),
    ICRender.BLOCK(-1, 0, 0, group[1], true)
  ));
  render[3].addEntry(model[7]).asCondition(1, 0, 0, group[0], 0);
  render[3].addEntry(model[6]).asCondition(1, 0, 0, group[1], 0);
  render[3].addEntry(model[11]).asCondition(-1, 0, 0, group[0], 0);
  render[3].addEntry(model[10]).asCondition(-1, 0, 0, group[1], 0);

  for(i = 4; i--;){
    BlockRenderer.setStaticICRender(BlockID[id], i, render[i]);
  }

  if(!collision){
    return;
  }

  render.length = model.length = 0;

  for(i = 4; i--;){
    render[i] = new ICRender.CollisionShape();
    model[i] = render[i].addEntry();
  }

  for(i = 16; i--;){
    model[0].addBox(0, 0, (15 - i) / 16, 1, i / 16, (16 - i) / 16)
    model[1].addBox(0, 0, i / 16, 1, i / 16, (i + 1) / 16);
    model[2].addBox((15 - i) / 16, 0, 0, (16 - i) / 16, i / 16, 1);
    model[3].addBox(i / 16, 0, 0, (i + 1) / 16, i / 16, 1);
  }

  for(i = 4; i--;){
    BlockRenderer.setCustomCollisionShape(BlockID[id], i, render[i]);
  }


};



regSlope("cobble", "Cobblestone", "cobblestone", 0, 67, 4);
regSlope("oak", "Oak Wood", "planks", 0, 53, 5, 0);
regSlope("spruce", "Spruce Wood", "planks", 1, 134, 5, 1);
regSlope("birch", "Birch Wood", "planks", 2, 135, 5, 2);
regSlope("jungle", "Jungle Wood", "planks", 3, 136, 5, 3);
regSlope("acacia", "Acacia Wood", "planks", 4, 163, 5, 4);
regSlope("dark", "Darkoak Wood", "planks", 5, 164, 5, 5);
regSlope("brick", "Brick", "brick", 0, 108, 45);
regSlope("sand", "Sandstone", "sandstone_top", 0, 128, 24);
regSlope("red", "Red Sandstone", "redsandstone_top", 0, 180, 179);
regSlope("stone", "Stone Brick", "stonebrick", 0, 109, 98);
regSlope("nether", "Nether Brick", "nether_brick", 0, 114, 112);
regSlope("quartz", "Quartz", "quartz_block_bottom", 0, 156, 155);
regSlope("pur", "Purpur", "purpur_block_bottom", 0, 203, 201);

Block.setDestroyTime(BlockID.slope_oak, 2);
Block.setDestroyTime(BlockID.slope_spruce, 2);
Block.setDestroyTime(BlockID.slope_birch, 2);
Block.setDestroyTime(BlockID.slope_jungle, 2);
Block.setDestroyTime(BlockID.slope_acacia, 2);
Block.setDestroyTime(BlockID.slope_dark, 2);
Block.setDestroyTime(BlockID.slope_cobble, 2);
Block.setDestroyTime(BlockID.slope_brick, 2);
Block.setDestroyTime(BlockID.slope_nether, 2);
Block.setDestroyTime(BlockID.slope_stone, 1.5);
Block.setDestroyTime(BlockID.slope_pur, 1.5);
Block.setDestroyTime(BlockID.slope_sand, 0.8);
Block.setDestroyTime(BlockID.slope_red, 0.8);
Block.setDestroyTime(BlockID.slope_quartz, 0.8);

ToolAPI.registerBlockMaterialAsArray("wood", [
  BlockID.slope_oak,
  BlockID.slope_spruce,
  BlockID.slope_birch,
  BlockID.slope_jungle,
  BlockID.slope_acacia,
  BlockID.slope_dark
]);

ToolAPI.registerBlockMaterialAsArray("stone", [
  BlockID.slope_cobble,
  BlockID.slope_brick,
  BlockID.slope_sand,
  BlockID.slope_red,
  BlockID.slope_stone,
  BlockID.slope_nether,
  BlockID.slope_quartz,
  BlockID.slope_pur
]);