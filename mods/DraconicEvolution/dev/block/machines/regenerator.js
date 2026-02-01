IDRegistry.genBlockID("regenerator");
Block.createBlock("regenerator", [
	{name: "Regenerator", texture: [["machine_de", 0], ["regenerator", 0], ["machine_de", 2]], inCreative: true}
], BLOCK_TYPE_MACHINE)
ToolAPI.registerBlockMaterial(BlockID.regenerator, "stone");
Recipes.addShaped({id: BlockID.regenerator, count: 1, data: 0}, [
	"aba",
	"ede",
	"aca"
], ['a', 42, 0, 'b', BlockID.draconiumBlockCharged, 0, 'c', ItemID.chaosCore, 0, 'd', 397, 1, 'e', ItemID.wywernCore, 0]); 

Block.setBlockShape(BlockID.regenerator, {x: 0, y: 0, z: 0}, {x: 1, y: 0.5, z: 1});

Block.registerDropFunction("regenerator", function(coords, blockID, blockData, level){
	if (level > -1){
		return [[BlockID.regenerator, 1, 0]]
	}
	return [];
}, 2);

var guiRegenerator = new UI.StandartWindow({
	standart: {
		header: {text: 
                          {text: "Regenerator"}
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
		"textHelp1": {type: "text", x: 520, y: 142, width: 350, height: 15, text: "Now, you can't die!"},
		"textHelp2": {type: "text", x: 520, y: 184, width: 350, height: 15, text: "First mode - OFF"},
		"textHelp3": {type: "text", x: 520, y: 226, width: 350, height: 15, text: "Second mode - ON"},
		
		"button": {type: "button", x: 441, y: 245, bitmap: "button_slot", scale: 0.16,
		clicker: {
			onClick: function(container, tileEntity){
				tileEntity.data.mode = (tileEntity.data.mode + 1) % 2;
}}}

   }
	
});

MachineRegistry.registerPrototype(BlockID.regenerator, {

    tick: function () {
var content = this.container.getGuiContent();

		if(content){
			content.elements.button.bitmap = "reg_" + this.data.mode;
		}
		
		var energyStorage = this.getEnergyStorage();
		this.data.energy = Math.min(this.data.energy, energyStorage);
	if(this.data.energy >= 3){
		
		var energyde = this.data.energy = 200;
		if(this.data.mode === 0){
		}
		if(this.data.mode === 1){
		Entity.setHealth (Player.get(), 100);
		if(this.data.mode === 2){
	    }
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
        return guiRegenerator;
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