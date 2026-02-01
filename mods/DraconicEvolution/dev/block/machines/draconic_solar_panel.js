IDRegistry.genBlockID("draconicSolarPanel");
Block.createBlock("draconicSolarPanel",[{name:"Draconic Solar Panel", texture:[["machine_de", 0], ["draconic_solar_panel", 0], ["machine_de", 2]], inCreative: true}]);
Block.setBlockShape(BlockID.draconicSolarPanel, {x: 0, y: 0, z: 0}, {x: 1, y: 0.5, z: 1});
MachineRegistry.registerPrototype(BlockID.draconicSolarPanel, {
	isGenerator: function() {
		return true;
	},
	
	energyTick: function(type, src){
		if(World.getLightLevel(this.x, this.y + 1, this.z) == 15){
			src.add(20);
		}
	}
});

Recipes.addShaped({id: BlockID.draconicSolarPanel, count: 1, data: 0}, [
	"aaa",
	"dcd",
	"bdb"
], ['d', ItemID.draconicCore, 0, 'b', ItemID.draconiumIngot, 0, 'a', 20, 0, 'c', 61, -1]); 