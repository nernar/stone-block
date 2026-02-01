IDRegistry.genBlockID("weatherController");
Block.createBlockWithRotation("weatherController", [
	{name: "Weather Controller", texture: [["machine_de", 0], ["machine_de", 0], ["machine_de", 1], ["weather_controller", 0], ["machine_de", 1], ["machine_de", 1]], inCreative: true}
], BLOCK_TYPE_MACHINE)
ToolAPI.registerBlockMaterial(BlockID.weatherController, "stone");
Recipes.addShaped({id: BlockID.weatherController, count: 1, data: 0}, [
	"cac",
	"beb",
	"cdc"
], ['a', ItemID.draconicCore, 0, 'b', 405, 0, 'c', 265, 0, 'e', 426, 0, 'd', 325, 8]); 
Block.registerDropFunction("weatherController", function(coords, blockID, blockData, level){
	if (level > -1){
		return [[BlockID.weatherController, 1, 0]]
	}
	return [];
}, 2);

var guiWeatherController = new UI.StandartWindow({
	standart: {
		header: {text: 
                          {text: "Weather Controller"}
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
		"textHelp1": {type: "text", x: 520, y: 142, width: 350, height: 15, text: "Now, you can change weather."},
		"textHelp2": {type: "text", x: 520, y: 184, width: 350, height: 15, text: "First mode - OFF"},
		"textHelp3": {type: "text", x: 520, y: 226, width: 350, height: 15, text: "Second mode - CLEAR"},
		"textHelp4": {type: "text", x: 520, y: 268, width: 350, height: 15, text: "Third mode - RAIN"},
		"textHelp5": {type: "text", x: 520, y: 310, width: 350, height: 15, text: "Fourth mode - STORM"},
		
		"button": {type: "button", x: 441, y: 245, bitmap: "button_slot", scale: 0.16,
		clicker: {
			onClick: function(container, tileEntity){
				tileEntity.data.mode = (tileEntity.data.mode + 1) % 4;
}}}

   }
	
});

MachineRegistry.registerPrototype(BlockID.weatherController, {

    tick: function () {
var content = this.container.getGuiContent();

		if(content){
			content.elements.button.bitmap = "weather_" + this.data.mode;
		}
		
		var energyStorage = this.getEnergyStorage();
		this.data.energy = Math.min(this.data.energy, energyStorage);
	if(this.data.energy >= 4){
		
		var energyde = this.data.energy -= 1000;
		if(this.data.mode === 0){
		}
		if(this.data.mode === 1){
		World.setWeather({
         rain: 0,
         thunder: 0
        });
		energyde;
		}
		if(this.data.mode === 2){
		World.setWeather({
         rain: 2,
         thunder: 0
        });
		energyde;
		}
		if(this.data.mode === 3){
		World.setWeather({
         rain: 2,
         thunder: 2
        });
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
        return guiWeatherController;
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