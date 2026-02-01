IDRegistry.genBlockID("sunDial");
Block.createBlockWithRotation("sunDial", [
	{name: "Celestial Manipulator", texture: [["machine_de", 0], ["machine_de", 0], ["machine_de", 1], ["sun_dial", 0], ["machine_de", 1], ["machine_de", 1]], inCreative: true}
], BLOCK_TYPE_MACHINE)
ToolAPI.registerBlockMaterial(BlockID.sunDial, "stone");
Recipes.addShaped({id: BlockID.sunDial, count: 1, data: 0}, [
	"cac",
	"beb",
	"cac"
], ['a', ItemID.draconicCore, 0, 'b', 405, 0, 'c', 265, 0, 'e', 426, 0]); 
Block.registerDropFunction("sunDial", function(coords, blockID, blockData, level){
	if (level > -1){
		return [[BlockID.sunDial, 1, 0]]
	}
	return [];
}, 2);

var guiSunDial = new UI.StandartWindow({
	standart: {
		header: {text: 
                          {text: "Celestial Manipulator"}
},
		inventory: {
                         standart: true
},
		background: {
                         standart: true
}
	},
	
	drawing: [
	    {type: "bitmap", x: 425, y: 120, bitmap: "de_text_panel", scale: 5.7},
	    {type: "bitmap", x: 450, y: 135, bitmap: "fire_background", scale: 3.2},
	],
	
	elements: {
		"burningScale": {type: "scale", x: 450, y: 135, direction: 1, value: 0.5, bitmap: "fire_scale", scale: 3.2},
		"slotFuel": {type: "slot", x: 441, y: 180},
		"textHelp1": {type: "text", x: 520, y: 142, width: 350, height: 15, text: "Now, you can change time."},
		"textHelp2": {type: "text", x: 520, y: 184, width: 350, height: 15, text: "First mode - OFF"},
		"textHelp3": {type: "text", x: 520, y: 226, width: 350, height: 15, text: "Second mode - SUN"},
		"textHelp4": {type: "text", x: 520, y: 268, width: 350, height: 15, text: "Third mode - NIGHT"},
		
		"button": {type: "button", x: 441, y: 245, bitmap: "button_slot", scale: 0.16,
		clicker: {
			onClick: function(container, tileEntity){
				tileEntity.data.mode = (tileEntity.data.mode + 1) % 3;
}}}

   }
	
});

MachineRegistry.registerPrototype(BlockID.sunDial, {

    tick: function () {
var content = this.container.getGuiContent();

		if(content){
			content.elements.button.bitmap = "sun_dial_" + this.data.mode;
		}
		
		var energyStorage = this.getEnergyStorage();
		this.data.energy = Math.min(this.data.energy, energyStorage);
	if(this.data.energy >= 3){
		
		var energyde = this.data.energy -= 10000;
		if(this.data.mode === 0){
		}
		if(this.data.mode === 1){
		World.setWorldTime (6000)
		energyde;
		}
		if(this.data.mode === 2){
		World.setWorldTime (18000)
		energyde;
		}
	}
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
		}
		return 0;
	},

    getGuiScreen: function () {
        return guiSunDial;
    },
    
    defaultValues: {
		energy_storage: 20000,
		mode: 0,
		burn: 0,
		burnMax: 0
	},
	
	getEnergyStorage: function(){
		return this.data.energy_storage;
	},
	
	energyTick: MachineRegistry.basicEnergyReceiveFunc
});