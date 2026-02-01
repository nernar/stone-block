LIBRARY({
	name: "HelperMod",
	version: 1,
	shared: true,
	api: "CoreEngine"
});

//Author Abdulla Nagmetdulla

var ARMOR = {
	
	setMode: function(arg){
       Callback.addCallback("tick",function() {
           if(Player.getArmorSlot(arg.type[0]).id == arg.id){
	          arg.tick();
    }})}
    
};

var DAPI = {
	
	func: {},
	
	getFuncsDragon: function (unique) {
		return this.func[unique];
	},
	
	registerDragon: function (unique, func) {
		this.func[unique] = func;
	},
	
	getSpawn: function (unique) {
		this.getFuncsDragon(unique).Spawn;
	},
	
	spawnAtCoords: function (unique, coords, coordsy, coordsz) {
	    SAC = null;
		if (coordsy && coordsz) { SAC = Entity.spawn(coords, coordsy+5, coordsz, 53); } 
        else { SAC = Entity.spawn(coords.x, coords.y+5, coords.z, 53); }
	    Entity.setSkin(SAC, "mob/" + this.getFuncsDragon(unique).Texture + ".png");
	    Entity.setMaxHealth(SAC, this.getFuncsDragon(unique).MaxHealth);
	    Entity.setHealth(SAC, this.getFuncsDragon(unique).Health);
	    this.getFuncsDragon(unique).Spawn = true;
	}
	
};

var RAPI = {
	
	EvolutionRitual: function (coords, tick) {
		var wgb = World.getBlockID;
		
        var blc1 = wgb(coords.x,coords.y+1,coords.z);
		var blc2 = wgb(coords.x+1,coords.y,coords.z);
        var blc3 = wgb(coords.x-1,coords.y,coords.z);
        var blc4 = wgb(coords.x,coords.y,coords.z+1);
        var blc5 = wgb(coords.x,coords.y,coords.z-1);
        var blc10 = wgb(coords.x+1,coords.y,coords.z+1);
        var blc11 = wgb(coords.x-1,coords.y,coords.z-1);
        var blc12 = wgb(coords.x+1,coords.y,coords.z-1);
        var blc13 = wgb(coords.x-1,coords.y,coords.z+1);
        var blc6 = wgb(coords.x+3,coords.y+1,coords.z);
        var blc7 = wgb(coords.x-3,coords.y+1,coords.z);
        var blc8 = wgb(coords.x,coords.y+1,coords.z-3);
        var blc9 = wgb(coords.x,coords.y+1,coords.z+3);
        var blc14 = wgb(coords.x+2,coords.y+2,coords.z+2);
        var blc15 = wgb(coords.x-2,coords.y+2,coords.z-2);
        var blc16 = wgb(coords.x+2,coords.y+2,coords.z-2);
        var blc17 = wgb(coords.x-2,coords.y+2,coords.z+2);
        
	    if(blc14 == 152 && blc15==152&&blc16==152&&blc17==152 && blc1 == 122 && blc2 == 152 && blc3 == 152 && blc4 == 152 && blc5 == 152 && blc6 == BlockID.draconiumBlock && blc7 == BlockID.draconiumBlock && blc8 == BlockID.draconiumBlock && blc9 == BlockID.draconiumBlock && blc10 == 57 && blc11 == 57 && blc12 == 57 && blc13 == 57){
		DAPI.spawnAtCoords("EvolutionDragon", {x: coords.x, y: coords.y, z: coords.z});
		Entity.spawn(coords.x, coords.y, coords.z, 93);
		World.destroyBlock(coords.x,coords.y+1,coords.z, false);
		World.destroyBlock(coords.x+3,coords.y+1,coords.z, false);
		World.destroyBlock(coords.x-3,coords.y+1,coords.z, false);
		World.destroyBlock(coords.x,coords.y+1,coords.z+3, false);
		World.destroyBlock(coords.x,coords.y+1,coords.z-3, false);
		World.destroyBlock(coords.x+1,coords.y,coords.z, false);
		World.destroyBlock(coords.x+1,coords.y,coords.z+1, false);
		World.destroyBlock(coords.x+1,coords.y,coords.z-1, false);
		World.destroyBlock(coords.x-1,coords.y,coords.z, false);
		World.destroyBlock(coords.x-1,coords.y,coords.z+1, false);
		World.destroyBlock(coords.x-1,coords.y,coords.z-1, false);
		World.destroyBlock(coords.x,coords.y,coords.z+1, false);
		World.destroyBlock(coords.x,coords.y,coords.z-1, false);
		World.destroyBlock(coords.x,coords.y,coords.z, false);
		World.destroyBlock(coords.x+2,coords.y+2,coords.z+2, false);
		World.destroyBlock(coords.x-2,coords.y+2,coords.z-2, false);
		World.destroyBlock(coords.x-2,coords.y+2,coords.z+2, false);
		World.destroyBlock(coords.x+2,coords.y+2,coords.z-2, false);
		}
	},
	
	AwakedBlock: function (coords) {
		var wgb = World.getBlock;
		
        var wgb1 = wgb(coords.x,coords.y-1,coords.z);
		var wgb2 = wgb(coords.x+1,coords.y,coords.z);
        var wgb3 = wgb(coords.x-1,coords.y,coords.z);
        var wgb4 = wgb(coords.x,coords.y+1,coords.z);
        var wgb5 = wgb(coords.x,coords.y,coords.z+1);
        var wgb6 = wgb(coords.x,coords.y,coords.z-1);
        var blc1 = wgb1.id== BlockID.draconiumBlockCharged;var blc2 = wgb2.id== BlockID.draconiumBlockCharged;var blc3 = wgb3.id== BlockID.draconiumBlockCharged;
        var blc4 = wgb4.id== BlockID.draconiumBlockCharged;var blc5 = wgb5.id== BlockID.draconiumBlockCharged;var blc6 = wgb6.id== BlockID.draconiumBlockCharged;
        
	   if(blc1 && blc2 && blc3 && blc4 && blc5 && blc6){
		Entity.spawn(coords.x, coords.y, coords.z, 93);
		Entity.spawn(coords.x+3, coords.y-1, coords.z, 93);
		Entity.spawn(coords.x-3, coords.y-1, coords.z, 93);
		Entity.spawn(coords.x, coords.y-1, coords.z+3, 93);
		Entity.spawn(coords.x, coords.y-1, coords.z-3, 93);
		Entity.spawn(coords.x+2, coords.y-1, coords.z+2, 93);
		Entity.spawn(coords.x+2, coords.y-1, coords.z-2, 93);
		Entity.spawn(coords.x-2, coords.y-1, coords.z+2, 93);
		Entity.spawn(coords.x-2, coords.y-1, coords.z-2, 93);
		World.destroyBlock(coords.x,coords.y-1,coords.z, false);
		World.destroyBlock(coords.x+1,coords.y,coords.z, false);
		World.destroyBlock(coords.x-1,coords.y,coords.z, false);
		World.destroyBlock(coords.x,coords.y+1,coords.z, false);
		World.destroyBlock(coords.x,coords.y,coords.z+1, false);
		World.destroyBlock(coords.x,coords.y,coords.z-1, false);
		World.destroyBlock(coords.x,coords.y,coords.z, false);
		World.setBlock(coords.x, coords.y, coords.z, BlockID.awakedBlock);
		}
	},
	
	ChargedBlock: function (coords) {
		var wgb = World.getBlock;
		
        var wgb1 = wgb(coords.x,coords.y-1,coords.z);
		var wgb2 = wgb(coords.x+1,coords.y-1,coords.z);
        var wgb3 = wgb(coords.x-1,coords.y-1,coords.z);
        var wgb4 = wgb(coords.x,coords.y-1,coords.z+1);
        var wgb5 = wgb(coords.x,coords.y-1,coords.z-1);
        var wgb6 = wgb(coords.x,coords.y+1,coords.z);
        var wgb7 = wgb(coords.x+1,coords.y+1,coords.z);
        var wgb8 = wgb(coords.x-1,coords.y+1,coords.z);
        var wgb9 = wgb(coords.x,coords.y+1,coords.z+1);
        var wgb10 = wgb(coords.x,coords.y+1,coords.z-1);
        var wgb11 = wgb(coords.x+1,coords.y,coords.z);
        var wgb12 = wgb(coords.x+1,coords.y,coords.z-1);
        var wgb13 = wgb(coords.x+1,coords.y,coords.z+1);
        var wgb14 = wgb(coords.x-1,coords.y,coords.z);
        var wgb15 = wgb(coords.x-1,coords.y,coords.z-1);
        var wgb16 = wgb(coords.x-1,coords.y,coords.z+1);
        var wgb17 = wgb(coords.x,coords.y,coords.z-1);
        var wgb18 = wgb(coords.x,coords.y,coords.z+1);
        var blc1 = wgb1.id== 152;var blc2 = wgb2.id== 152;var blc3 = wgb3.id== 152;
        var blc4 = wgb4.id== 152;var blc5 = wgb5.id== 152;var blc6 = wgb6.id== 152;
        var blc7 = wgb7.id== 152;var blc8 = wgb8.id== 152;var blc9 = wgb9.id== 152;
        var blc10 = wgb10.id== 152;var blc11 = wgb11.id== 152;var blc12 = wgb12.id== 152;
        var blc13 = wgb13.id== 152;var blc13 = wgb13.id== 152;var blc14 = wgb14.id== 152;
        var blc15 = wgb15.id== 152;var blc16 = wgb16.id== 152;var blc17 = wgb17.id== 152;
        var blc18 = wgb18.id== 152;
        
	    if(blc1 && blc2 && blc3 && blc4 && blc5 && blc6 && blc7 && blc8 && blc9 && blc10 && blc11 && blc12 && blc13 && blc14 && blc15 && blc16 && blc17 && blc18){
		Entity.spawn(coords.x, coords.y, coords.z, 93);
		World.destroyBlock(coords.x,coords.y+1,coords.z, false);
		World.destroyBlock(coords.x,coords.y,coords.z, false);
		World.destroyBlock(coords.x+1,coords.y+1,coords.z, false);
		World.destroyBlock(coords.x-1,coords.y+1,coords.z, false);
		World.destroyBlock(coords.x,coords.y+1,coords.z+1, false);
		World.destroyBlock(coords.x,coords.y+1,coords.z-1, false);
		World.destroyBlock(coords.x+1,coords.y,coords.z, false);
		World.destroyBlock(coords.x+1,coords.y,coords.z+1, false);
		World.destroyBlock(coords.x+1,coords.y,coords.z-1, false);
		World.destroyBlock(coords.x-1,coords.y,coords.z, false);
		World.destroyBlock(coords.x-1,coords.y,coords.z+1, false);
		World.destroyBlock(coords.x-1,coords.y,coords.z-1, false);
		World.destroyBlock(coords.x,coords.y,coords.z+1, false);
		World.destroyBlock(coords.x,coords.y,coords.z-1, false);
		World.destroyBlock(coords.x,coords.y-1,coords.z, false);
		World.destroyBlock(coords.x+1,coords.y-1,coords.z, false);
		World.destroyBlock(coords.x-1,coords.y-1,coords.z, false);
		World.destroyBlock(coords.x,coords.y-1,coords.z+1, false);
		World.destroyBlock(coords.x,coords.y-1,coords.z-1, false);
		World.setBlock(coords.x, coords.y, coords.z, BlockID.draconiumBlockCharged);
		}
	}
	
};

EXPORT("ARMOR", ARMOR);
EXPORT("DAPI", DAPI);
EXPORT("RAPI", RAPI);
EXPORT("FURNACE_FUEL_MAP", {5: 300,6: 100,17: 300,25: 300,47: 300,53: 300,54: 300,58: 300,65: 300,72: 300,85: 300,96: 300,107: 300,134: 300,135: 300,136: 300,146: 300,151: 300,158: 150,162: 300,163: 300,164: 300,173: 16000,183: 300,184: 300,185: 300,186: 300,187: 300,261: 200,263: 1600,268: 200,269: 200,270: 200,271: 200,280: 100,281: 200,290: 200,232: 200,333: 1200,346: 200,369: 2400,427: 300,428: 300,429: 300,430: 300,431: 300});