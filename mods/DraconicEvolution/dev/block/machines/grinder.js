IDRegistry.genBlockID("grinder");
Block.createBlockWithRotation("grinder", [
	{name: "Mob Grinder", texture: [["machine_de", 0], ["machine_de", 0], ["machine_de", 1], ["grinder", 0], ["machine_de", 1], ["machine_de", 1]], inCreative: true}
]);
ToolAPI.registerBlockMaterial(BlockID.grinder, "stone");
Recipes.addShaped({id: BlockID.grinder, count: 1, data: 0}, [
	"beb",
	"aca",
	"bdb"
], ['b', 265, 0, 'e', ItemID.draconiumIngot, 0, 'c', ItemID.draconicCore, 0, 'd', 61, -1, 'a', 276, 0]); 

var guiGrinder = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Mob Grinder"}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	drawing: [
	    {type: "bitmap", x: 330, y: 85, bitmap: "de_text_panel", scale: 5.7},
		{type: "bitmap", x: 350, y: 105, bitmap: "mekback", scale: 3.7},
	],
	
	elements: {
		"energyScale": {type: "scale", x: 350, y: 105, direction: 1, value: 0.5, bitmap: "mekbar", scale: 3.7},
		"slot1": {type: "slot", x: 415, y: 195},
		"textInfo1": {type: "text", x: 485, y: 202, width: 350, height: 30, text: "0/"},
		"textInfo2": {type: "text", x: 485, y: 232, width: 350, height: 30, text: "20000"},
		"textHelp1": {type: "text", x: 350, y: 270, width: 350, height: 15, text: "Now, machine can kill mobs."},
	}
});

var evilMobs = [Native.EntityType.BLAZE, Native.EntityType.CAVE_SPIDER, Native.EntityType.CREEPER, Native.EntityType.ENDERMAN, 52, 53, Native.EntityType.GHAST, Native.EntityType.IRON_GOLEM, Native.EntityType.LAVA_SLIME, Native.EntityType.PIG_ZOMBIE, Native.EntityType.SILVERFISH, Native.EntityType.SKELETON, Native.EntityType.SLIME, Native.EntityType.SPIDER, Native.EntityType.ZOMBIE, Native.EntityType.ZOMBIE_VILLAGER, 45, 46, 47, 48, 49, 55];

MachineRegistry.registerPrototype(BlockID.grinder, {
	getGuiScreen: function(){
		return guiGrinder;
	},
	
	tick: function(){
		var energyStorage = this.getEnergyStorage();
		this.container.setScale("energyScale", this.data.energy / energyStorage);
		this.container.setText("textInfo1", parseInt(this.data.energy) + "/");
		this.container.setText("textInfo2", energyStorage + "");
		for(let i in evilMobs){
		   let ent = Entity.findNearest({x: this.x, y: this.y, z: this.z}, evilMobs[i], 10);   
		      if(ent && this.data.energy > 9){
				Entity.damageEntity(ent, 10);
				this.data.energy -= 10
		   }
        }
	},
	
	getEnergyStorage: function(){
		return 20000;
	},
	
	energyTick: MachineRegistry.basicEnergyReceiveFunc
});