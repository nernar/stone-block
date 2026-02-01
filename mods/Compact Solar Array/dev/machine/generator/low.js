var IC_WIRES = {};
function setupBlockAsWire(id, maxVoltage, insulationLevels){
	EU.registerWire(id, maxVoltage);
	IC_WIRES[id] = insulationLevels || 0;
}

Translation.addTranslation("Low Voltage Solar Array", {ru: "Солнечная панель низкого напряжения"});

IDRegistry.genBlockID("lvsa");
Block.createBlock("lvsa", [
	{name: "Low Voltage Solar Array", texture: [["low_voltage_bottom", 0], ["low_voltage_top", 0], ["low_voltage_sides", 0], ["low_voltage_sides", 0], ["low_voltage_sides", 0], ["low_voltage_sides", 0]], inCreative: true}
], "opaque");

Block.registerDropFunction("lvsa", function(coords, blockID, blockData, level){
	return MachineRegistry.getMachineDrop(coords, blockID, level, BlockID.machineBlockBasic);
});

Callback.addCallback("PreLoaded", function(){
	Recipes.addShaped({id: BlockID.lvsa, count: 1, data: 0}, [
		"xxx",
		"xax",
		"xxx"
	], ['x', BlockID.solarPanel, 0, 'a', BlockID.transformerLV, 0]);
});


var guiSolarPanel1 = null;
Callback.addCallback("LevelLoaded", function(){
	guiSolarPanel1 = new UI.StandartWindow({
		standart: {
			header: {text: {text: Translation.translate("Low Voltage Solar Array")}},
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
			"slotEnergy": {type: "slot", x: 600, y: 130, isValid: function(id){return ChargeItemRegistry.isValidItem(id, "Eu", 8);}},
			"sun": {type: "image", x: 608, y: 194, bitmap: "sun_off", scale: GUI_SCALE}
		}
	});
});

MachineRegistry.registerGenerator(BlockID.lvsa, {
	getGuiScreen: function(){
		return guiSolarPanel1;
	},
	
	tick: function(){
		var content = this.container.getGuiContent();
		if(World.getBlockID(this.x, this.y + 1, this.z) != BlockID.luminator && World.getLightLevel(this.x, this.y + 1, this.z) == 15){
			this.data.energy = 1;
			this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slotEnergy"), "Eu", 8, 32, 1);
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
			src.addAll(8);
			this.data.energy = 0;
		}
	}
});
