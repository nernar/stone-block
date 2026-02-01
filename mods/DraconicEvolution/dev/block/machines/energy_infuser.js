IDRegistry.genBlockID("energyInfuser");
Block.createBlockWithRotation("energyInfuser", [
	{name: "Energy Infuser", texture: [["machine_de", 0], ["machine_de", 0], ["machine_de", 1], ["energy_infuser", 0], ["machine_de", 1], ["machine_de", 1]], inCreative: true}
]);
ToolAPI.registerBlockMaterial(BlockID.energyInfuser, "stone");
Recipes.addShaped({id: BlockID.energyInfuser, count: 1, data: 0}, [
	"bab",
	"aca",
	"beb"
], ['a', 265, 0, 'b', 405, 0, 'c', ItemID.wywernCore, 0, 'e', BlockID.draconicGenerator, 0]); 

var guiEI = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Energy Infuser"}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	drawing: [
	    {type: "bitmap", x: 330, y: 85, bitmap: "de_text_panel", scale: 5.7},
		{type: "bitmap", x: 350, y: 105, bitmap: "mekback", scale: 3.7},
	],
	
	elements: {
		"energyScale": {type: "scale", x: 350, y: 105, direction: 1, value: 0.5, bitmap: "mekbar", scale: 3.7},
		"slot1": {type: "slot", x: 415, y: 115},
		"slot2": {type: "slot", x: 415, y: 195},
		"textInfo1": {type: "text", x: 480, y: 142, width: 350, height: 30, text: "0/"},
		"textInfo2": {type: "text", x: 480, y: 172, width: 350, height: 30, text: "1000000000"},
		"textHelp1": {type: "text", x: 350, y: 270, width: 350, height: 15, text: "Now, you can charge tools."},
	}
});




MachineRegistry.registerPrototype(BlockID.energyInfuser, {
	getGuiScreen: function(){
		return guiEI;
	},
	
	tick: function(){
		var energyStorage = this.getEnergyStorage();
		this.container.setScale("energyScale", this.data.energy / energyStorage);
		this.container.setText("textInfo1", parseInt(this.data.energy) + "/");
		this.container.setText("textInfo2", energyStorage + "");
		
		var TRANSFER = 512;
		this.data.energy += ChargeItemRegistry.getEnergyFrom(this.container.getSlot("slot2"), Math.min(TRANSFER, energyStorage - this.data.energy), 2);
		this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slot1"), this.data.energy, TRANSFER, 2);
	},
	
	getEnergyStorage: function(){
		return 1000000;
	},
	
	energyTick: function(type, src){
		var TRANSFER = 512;
		this.data.energy += src.storage(Math.min(TRANSFER, this.getEnergyStorage() - this.data.energy), Math.min(TRANSFER, this.data.energy));
	}
});

ChargeItemRegistry.registerItem(ItemID.wywernSword, 4000000, 0, true, true);
ChargeItemRegistry.registerItem(ItemID.wywernShovel, 4000000, 0, true, true);
ChargeItemRegistry.registerItem(ItemID.wywernPickaxe, 4000000, 0, true, true);
ChargeItemRegistry.registerItem(ItemID.wywernHelmet, 4000000, 0, true, true);
ChargeItemRegistry.registerItem(ItemID.wywernChestplate, 4000000, 0, true, true);
ChargeItemRegistry.registerItem(ItemID.wywernLeggings, 4000000, 0, true, true);
ChargeItemRegistry.registerItem(ItemID.wywernBoots, 4000000, 0, true, true);
ChargeItemRegistry.registerItem(ItemID.draconicSword, 16000000, 0, true, true);
ChargeItemRegistry.registerItem(ItemID.draconicShovel, 16000000, 0, true, true);
ChargeItemRegistry.registerItem(ItemID.draconicPickaxe, 16000000, 0, true, true);
ChargeItemRegistry.registerItem(ItemID.draconicAxe, 16000000, 0, true, true);
ChargeItemRegistry.registerItem(ItemID.draconicHoe, 16000000, 0, true, true);
ChargeItemRegistry.registerItem(ItemID.draconicHelmet, 160000000, 0, true, true);
ChargeItemRegistry.registerItem(ItemID.draconicChestplate, 16000000, 0, true, true);
ChargeItemRegistry.registerItem(ItemID.draconicLeggings, 16000000, 0, true, true);
ChargeItemRegistry.registerItem(ItemID.draconicBoots, 16000000, 0, true, true);
ChargeItemRegistry.registerItem(ItemID.powerStaff, 48000000, 0, true, true);