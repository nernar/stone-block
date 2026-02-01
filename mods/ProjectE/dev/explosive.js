IDRegistry.genBlockID("explosive1");
Block.createBlock("explosive1", [
	 {name: "Nova catalyst", texture: [
	   ["explosiveTop",0],
	   ["explosiveBottom",0],
	   ["explosiveSide",0],
  ],inCreative: __config__.getBool("物品方块.催化剂(炸弹)")}
], "opaque");

IDRegistry.genBlockID("explosive2");
Block.createBlock("explosive2", [
	 {name: "Astral catalyst", texture: [
	   ["explosiveTop",0],
	   ["explosiveBottom",0],
	   ["explosiveSide",1],
  ],inCreative: __config__.getBool("物品方块.催化剂(炸弹)")}
], "opaque");

Callback.addCallback("PostLoaded", function(){
if(__config__.getBool("物品方块.催化剂(炸弹)")){
Recipes.addShapeless({id: BlockID.explosive1, count: 2, data: 0}, [{id: 46, data: 0}, {id: ItemID.fuelMobius, data: 0}]);
Recipes.addShapeless({id: BlockID.explosive2, count: 2, data: 0}, [{id: BlockID.explosive1, data: 0}, {id: ItemID.fuelAstral, data: 0}]);
}
});

Callback.addCallback("ItemUse", function (c, i, b){
  if(i.id == 259 && (b.id == BlockID.explosive1 || b.id == BlockID.explosive2)){
    try{
      World.getTileEntity(c.x, c.y, c.z).data.flame=1;
      ToolAPI.breakCarriedTool(1);
      Game.message(Translation.translate("Catalyst will explode! Run away!"));
      Game.prevent();
    }catch(e){};
  }
});

TileEntity.registerPrototype(BlockID.explosive1, {
  defaultValues: {
    flame: 0, time: 60
  },
  radius: 3,
  blocks: [],
  explode: function(){
    var coords={x: this.x, y: this.y, z: this.z};
    this.data.time=-1;
    for(x1 = -this.radius*2; x1 <= this.radius*2; x1 ++){
      for(y1 = -this.radius*2; y1 <= this.radius*2; y1 ++){
        for(z1 = -this.radius*2; z1 <= this.radius*2; z1 ++){
          if(x1*x1+y1*y1+z1*z1<1*this.radius*this.radius){this.blocks.push({x: this.x+x1, y: this.y+y1, z: this.z+z1})}else
          if(x1*x1+y1*y1+z1*z1<2.25*this.radius*this.radius && Math.random()<0.9){this.blocks.push({x: this.x+x1, y: this.y+y1, z: this.z+z1})}else
          if(x1*x1+y1*y1+z1*z1<4*this.radius*this.radius && Math.random()<0.3){this.blocks.push({x: this.x+x1, y: this.y+y1, z: this.z+z1})}
        }
      }
    }
    this.blocks = this.blocks.filter(function(item,index,self){return self.indexOf(item)===index});
    World.setBlock(this.x, this.y, this.z, 0);
    this.blocks.map(function(i){
      var block=World.getBlock(i.x, i.y, i.z);
      if(block.id==BlockID.explosive1 || block.id==BlockID.explosive2){
        if(World.getTileEntity(i.x, i.y, i.z).data.flame==0){
          World.getTileEntity(i.x, i.y, i.z).data.flame=1;
          World.getTileEntity(i.x, i.y, i.z).data.time=20;
        };
      }else if(System.getValue(block.id, block.data, true)){
        World.setBlock(i.x, i.y, i.z, 0);
        var block_drop = Block.getBlockDropViaItem(block, {id: 278, data:0}, i) || [];
        block_drop.map(function(ii){
          World.drop(coords.x, coords.y, coords.z, ii[0], ii[1], ii[2])
        })
      }
    });
  },
  tick: function(){
    if(this.data.flame && this.data.time>0){this.data.time-=1};
    if(this.data.time==0){
      this.explode()
    }
  },
  redstone: function(params){
    if(params.power>0) this.data.flame = 1;
  },
});

TileEntity.registerPrototype(BlockID.explosive2, {
  defaultValues: {
    flame: 0, time: 60
  },
  radius: 5,
  blocks: [],
  explode: function(){
    var coords={x: this.x, y: this.y, z: this.z};
    this.data.time=-1;
    for(x1 = -this.radius*2; x1 <= this.radius*2; x1 ++){
      for(y1 = -this.radius*2; y1 <= this.radius*2; y1 ++){
        for(z1 = -this.radius*2; z1 <= this.radius*2; z1 ++){
          if(x1*x1+y1*y1+z1*z1<1*this.radius*this.radius){this.blocks.push({x: this.x+x1, y: this.y+y1, z: this.z+z1})}else
          if(x1*x1+y1*y1+z1*z1<2.25*this.radius*this.radius && Math.random()<0.9){this.blocks.push({x: this.x+x1, y: this.y+y1, z: this.z+z1})}else
          if(x1*x1+y1*y1+z1*z1<4*this.radius*this.radius && Math.random()<0.3){this.blocks.push({x: this.x+x1, y: this.y+y1, z: this.z+z1})}
        }
      }
    }
    this.blocks = this.blocks.filter(function(item,index,self){return self.indexOf(item)===index});
    World.setBlock(this.x, this.y, this.z, 0);
    this.blocks.map(function(i){
      var block=World.getBlock(i.x, i.y, i.z);
      if(block.id==BlockID.explosive1 || block.id==BlockID.explosive2){
        if(World.getTileEntity(i.x, i.y, i.z).data.flame==0){
          World.getTileEntity(i.x, i.y, i.z).data.flame=1;
          World.getTileEntity(i.x, i.y, i.z).data.time=20;
        };
      }else if(System.getValue(block.id, block.data, true)){
        World.setBlock(i.x, i.y, i.z, 0);
        var block_drop = Block.getBlockDropViaItem(block, {id: 278, data:0}, i) || [];
        block_drop.map(function(ii){
          World.drop(coords.x, coords.y, coords.z, ii[0], ii[1], ii[2])
        })
      }
    });
  },
  tick: function(){
    if(this.data.flame && this.data.time>0){this.data.time-=1};
    if(this.data.time==0){
      this.explode()
    }
  },
  redstone: function(params){
    if(params.power>0) this.data.flame = 1;
  },
});
