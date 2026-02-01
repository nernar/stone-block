TileEntity.registerPrototype(BlockID.draconiumBlock, {
	
	tick: function(){
		RAPI.ChargedBlock({x: this.x, y: this.y, z: this.z});
	}
	
});

TileEntity.registerPrototype(BlockID.dragonHeart, {
	
	tick: function(){
		RAPI.AwakedBlock({x: this.x, y: this.y, z: this.z});
	}
	
});

TileEntity.registerPrototype(BlockID.ressuractionStone, {
	
	tick: function(){
		RAPI.EvolutionRitual({x: this.x, y: this.y, z: this.z});
	}
	
});

Callback.addCallback("EntityDeath", function(entity){
   if (!DAPI.getSpawn("EvolutionDragon") && Entity.getType(entity) == 53){
    	var coords = Entity.getPosition(entity);
 	   World.setBlock (coords.x-3 + Math.random() * 6, coords.y+2, coords.z-3 + Math.random() * 6, BlockID.dragonHeart, 0);
   }
   if (DAPI.getSpawn("EvolutionDragon") && Entity.getType(entity) == 53){
   	var coords = Entity.getPosition(entity);
       World.setBlock (coords.x-3 + Math.random() * 6, coords.y+2, coords.z-3 + Math.random() * 6, BlockID.dragonHeart, 0);
       World.setBlock (coords.x+3 + Math.random() * 6, coords.y+4, coords.z+3 + Math.random() * 6, BlockID.chaosCrystal, 0);
       World.setBlock (0, 65, 0, 122, 0);
       DAPI.getSpawn("EvolutionDragon") = false;
   }
});