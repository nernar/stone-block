IDRegistry.genBlockID("draconicGenerator");
Block.createBlockWithRotation("draconicGenerator", [
	{name: "Draconic Generator", texture: [["machine_de", 0], ["machine_de", 0], ["machine_de", 1], ["draconic_generator", 0], ["machine_de", 1], ["machine_de", 1]], inCreative: true}
], BLOCK_TYPE_MACHINE);

ToolAPI.registerBlockMaterial(BlockID.draconicGenerator, "stone");
Recipes.addShaped({id: BlockID.draconicGenerator, count: 1, data: 0}, [
	"bab",
	"aca",
	"beb"
], ['a', 405, 0, 'b', 265, 0, 'c', ItemID.draconicCore, 0, 'e', 61, 0]); 

var guiDrGenerator = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Draconic Generator"}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	drawing: [
	    {type: "bitmap", x: 330, y: 85, bitmap: "de_text_panel", scale: 5.7},
		{type: "bitmap", x: 425, y: 140, bitmap: "fire_background", scale: 3.2},
		{type: "bitmap", x: 350, y: 105, bitmap: "mekback", scale: 3.7},
	],
	
	elements: {
		"burningScale": {type: "scale", x: 425, y: 140, direction: 1, value: 0.5, bitmap: "fire_scale", scale: 3.2},
		"slotFuel": {type: "slot", x: 415, y: 195},
		"energyScale": {type: "scale", x: 350, y: 105, direction: 1, value: 0.5, bitmap: "mekbar", scale: 3.7},
		"textInfo1": {type: "text", x: 480, y: 142, width: 350, height: 30, text: "0/"},
		"textInfo2": {type: "text", x: 480, y: 172, width: 350, height: 30, text: "1000000"},
		"textHelp1": {type: "text", x: 350, y: 270, width: 350, height: 15, text: "You can change fuel on energy."}
	}
});




MachineRegistry.registerPrototype(BlockID.draconicGenerator, {
	defaultValues: {
		burn: 0,
		burnMax: 0,
	},
	
	getGuiScreen: function(){
		return guiDrGenerator;
	},

    tick: function(){
		var energyStorage = this.getEnergyStorage();
		this.container.setScale("energyScale", this.data.energy / energyStorage);
		this.container.setText("textInfo1", parseInt(this.data.energy) + "/");
		this.container.setText("textInfo2", energyStorage + "");
		
		if(this.data.burn > 0){
			
			if(this.data.energy < energyStorage){
				this.data.energy = Math.min(this.data.energy + 10, energyStorage);
				this.data.burn--;
			}
		}
		else {
			this.data.burn = this.data.burnMax = this.getFuel("slotFuel") / 4;
		}
		
		this.container.setScale("burningScale", this.data.burn / this.data.burnMax || 0);
		
	},
	
	getFuel: function(slotName){
		var fuelSlot = this.container.getSlot(slotName);
		if (fuelSlot.id > 0){
			var burn = FURNACE_FUEL_MAP[fuelSlot.id];
			if (burn){
				fuelSlot.count--;
				this.container.validateSlot(slotName);
				return burn;
			}
			if (LiquidRegistry.getItemLiquid(fuelSlot.id, fuelSlot.data) == "lava"){
				var empty = LiquidRegistry.getEmptyItem(fuelSlot.id, fuelSlot.data);
				fuelSlot.id = empty.id;
				fuelSlot.data = empty.data;
				return 20000;
			}
		}
		return 0;
	},
	
	isGenerator: function() {
		return true;
	},
	
	getEnergyStorage: function(){
		return 20000;
	},
	
	energyTick: function(type, src){
		var output = Math.min(32, this.data.energy);
		this.data.energy += src.add(output) - output;
	}
});