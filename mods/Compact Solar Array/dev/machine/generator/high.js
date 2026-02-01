IDRegistry.genBlockID("hvsa");
Block.createBlock("hvsa", [
	{name: "High Voltage Solar Array", texture: [["high_voltage_bottom", 0], ["high_voltage_top", 0], ["high_voltage_sides", 0], ["high_voltage_sides", 0], ["high_voltage_sides", 0], ["high_voltage_sides", 0]], inCreative: true}
], "opaque");

Translation.addTranslation("High Voltage Solar Array", {ru: "Солнечная панель высокого напряжения"});

Block.registerDropFunction("hvsa", function(coords, blockID, blockData, level){
	return MachineRegistry.getMachineDrop(coords, blockID, level, BlockID.machineBlockBasic);
});

Callback.addCallback("PreLoaded", function(){
	Recipes.addShaped({id: BlockID.hvsa, count: 1, data: 0}, [
		"xxx",
		"xax",
		"xxx"
	], ['x', BlockID.mvsa, 0, 'a', BlockID.transformerHV, 0]);
});


var guiSolarPanel3 = null;
Callback.addCallback("LevelLoaded", function(){
	guiSolarPanel3 = new UI.StandartWindow({
		standart: {
			header: {text: {text: Translation.translate("High Voltage Solar Array")}},
			inventory: {standart: true},
			background: {standart: true}
		},
		
		params: {
			slot: "default_slot",
			invSlot: "default_slot"
		},
		
		drawing: [
			{type: "background", color: android.graphics.Color.rgb(179, 179, 179)},
		],
		
		elements: {
			"slotEnergy": {type: "slot", x: 600, y: 130, isValid: function(id){return ChargeItemRegistry.isValidItem(id, "Eu", 512);}},
			"sun": {type: "image", x: 608, y: 194, bitmap: "sun_off", scale: GUI_SCALE}
		}
	});
});

MachineRegistry.registerGenerator(BlockID.hvsa, {
	getGuiScreen: function(){
		return guiSolarPanel3;
	},
	
	tick: function(){
		var content = this.container.getGuiContent();
		if(World.getBlockID(this.x, this.y + 1, this.z) != BlockID.luminator && World.getLightLevel(this.x, this.y + 1, this.z) == 15){
			this.data.energy = 1;
			this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slotEnergy"), "Eu", 512, 32, 1);
			if(content){ 
				content.elements["sun"].bitmap = "sun_on";
			}
		}
		else if(content){ 
			content.elements["sun"].bitmap = "sun_off";
		}
	},
	
	getEnergyStorage: function(){
		return 1;
	},
	
	energyTick: function(type, src){
		if(this.data.energy){
			src.addAll(512);
			this.data.energy = 0;
		}
	}
});
