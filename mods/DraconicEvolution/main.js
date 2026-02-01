/*
BUILD INFO:
  dir: dev
  target: main.js
  files: 20
*/



// file: header.js

importLib("ToolType", "*");
importLib("energylib", "*");
IMPORT("HelperMod");

var DE_FUEL_MAP = {
	152: 8100,
	331: 900
};

Game.getGameMode = ModAPI.requireGlobal("Level.getGameMode");

var RF = EnergyTypeRegistry.assureEnergyType("RF", 1/4);

ToolAPI.registerBlockMaterial(175, "fibre");
ToolAPI.registerBlockMaterial(31, "plant");




// file: translation.js

Translation.addTranslation("Draconium Dust", {ru: "Дракониевая пыль"});
Translation.addTranslation("Draconium Ingot", {ru: "Дракониевый слиток"});
Translation.addTranslation("Draconic Core", {ru: "Драконье ядро"});
Translation.addTranslation("Wywern Core", {ru: "Ядро Виверна"});
Translation.addTranslation("Wywern Energy Core", {ru: "Энергетическое ядро Виверна"});
Translation.addTranslation("Dragon Heart", {ru: "Сердце дракона"});
Translation.addTranslation("Awaked Draconic Ingot", {ru: "Пробуждённый дракониевый слиток"});
Translation.addTranslation("Awaked Draconic Core", {ru: "Пробуждённое дракониевое ядро"});
Translation.addTranslation("Awaked Draconic Energy Core", {ru: "Пробуждённое дракониевое энергетическое ядро"});
Translation.addTranslation("Small Crystal of Chaos", {ru: "Маленький кристалл хаоса"});
Translation.addTranslation("Crystal of Chaos", {ru: "Кристалл хаоса"});
Translation.addTranslation("Chaos Crystal", {ru: "Кристалл хаоса"});
Translation.addTranslation("Chaos Core", {ru: "Ядро хаоса"});
Translation.addTranslation("Wywern Sword", {ru: "Меч Виверны"});
Translation.addTranslation("Wywern Pickaxe", {ru: "Кирка Виверны"});
Translation.addTranslation("Wywern Shovel", {ru: "Лопата Виверны"});
Translation.addTranslation("Draconic Sword", {ru: "Драконий меч"});
Translation.addTranslation("Draconic Pickaxe", {ru: "Драконья кирка"});
Translation.addTranslation("Draconic Shovel", {ru: "Драконья лопата"});
Translation.addTranslation("Draconic Axe", {ru: "Драконий топор"});
Translation.addTranslation("Draconic Hoe", {ru: "Драконья мотыга"});
Translation.addTranslation("Staff of Power", {ru: "Драконий посох силы"});
Translation.addTranslation("Wywern Helmet", {ru: "Шлем Виверны"});
Translation.addTranslation("Wywern Chestplate", {ru: "Нагрудник Виверны"});
Translation.addTranslation("Wywern Leggings", {ru: "Поножи Виверны"});
Translation.addTranslation("Wywern Boots", {ru: "Ботинки Виверны"});
Translation.addTranslation("Draconic Helmet", {ru: "Драконий шлем"});
Translation.addTranslation("Draconic Chestplate", {ru: "Драконий нагрудник"});
Translation.addTranslation("Draconic Leggings", {ru: "Драконьи поножи"});
Translation.addTranslation("Draconic Boots", {ru: "Драконьи ботинки"});
Translation.addTranslation("Draconium Ore", {ru: "Дракониевая руда"});
Translation.addTranslation("Draconium Block", {ru: "Дракониевый блок"});
Translation.addTranslation("Charged Draconium Block", {ru: "Заряженный дракониевый блок"});
Translation.addTranslation("Awaked Draconic Block", {ru: "Пробуждённый дракониевый блок"});
Translation.addTranslation("Infused Obsidian", {ru: "Заряженный обсидиан"});
Translation.addTranslation("Ressuraction Stone", {ru: "Камень воскрешения"});
Translation.addTranslation("Draconic Generator", {ru: "Драконий генератор"});
Translation.addTranslation("Draconic Solar Panel", {ru: "Дракониевая солнечная панель"});
Translation.addTranslation("Energy Infuser", {ru: "Наполнитель энергии"});
Translation.addTranslation("Mob Grinder", {ru: "Дробилка существ"});
Translation.addTranslation("Celestial Manipulator", {ru: "Небесный манипулятор"});
Translation.addTranslation("Weather Controller", {ru: "Погодный контроллер"});
Translation.addTranslation("Regenerator", {ru: "Регенератор"});




// file: api/MachineRegistry.js

var MachineRegistry = {
	machineIDs: {},
	
	isMachine: function(id){
		return this.machineIDs[id];
	},
	
	
	registerPrototype: function(id, Prototype){
		// register ID
		this.machineIDs[id] = true;
		// setup energy value
		if (Prototype.defaultValues){
			Prototype.defaultValues.energy = 0;
		}
		else{
			Prototype.defaultValues = {
				energy: 0
			};
		}
		// copy functions
		if(!Prototype.getEnergyStorage){
			Prototype.getEnergyStorage = function(){
				return 0;
			};
		}
		/*
		Prototype.click = function(id, count, data, coords){
			if(id==ItemID.wrench || id==ItemID.electricWrench){
				return true;
			}
		}
		*/
		ICRender.getGroup("rf-wire").add(id, -1);
		
		ToolAPI.registerBlockMaterial(id, "stone");
		TileEntity.registerPrototype(id, Prototype);
		EnergyTileRegistry.addEnergyTypeForId(id, RF);
	},
	
	// standart functions
	basicEnergyReceiveFunc: function(type, src){
		var energyNeed = this.getEnergyStorage() - this.data.energy;
		this.data.energy += src.getAll(energyNeed);
	}
}

var BLOCK_TYPE_MACHINE = Block.createSpecialType({
	destroytime: 1.0,
	explosionres: 1900000000.0,
	base: 1
});




// file: api/ChargeRegistry.js

var ChargeItemRegistry = {
	chargeData: {},
	
	registerItem: function(item, energy, level, preventUncharge, isTool){
		Item.setMaxDamage(item, energy + 1);
		this.chargeData[item] = {
			type: "normal",
			id: item,
			level: level || 0,
			maxDamage: energy + 1,
			maxCharge: energy,
			preventUncharge: preventUncharge,
			isTool: isTool
		};
	},
	
	registerFlashItem: function(item, energy, level){
		this.chargeData[item] = {
			type: "flash",
			id: item,
			level: level || 0,
			energy: energy,
		};
	},
	
	getItemData: function(id){
		return this.chargeData[id];
	},
	
	isFlashStorage: function(id){
		var data = this.getItemData(id);
		return data && data.type == "flash";
	},
	
	getEnergyFrom: function(item, amount, level, getFromAll){
		if(item.id==ItemID.debugItem){
			return amount;
		}
		
		level = level || 0;
		var data = this.getItemData(item.id);
		if(!data || data.level > level || !getFromAll && data.preventUncharge){
			return 0;
		}
		if(data.type == "flash"){
			if(amount < 1){
				return 0;
			}
			item.count--;
			if(item.count < 1){
				item.id = item.data = 0;
			}
			return data.energy;
		}
		if(item.data < 1){
			item.data = 1;
		}
		
		var energyGot = Math.min(amount, data.maxDamage - item.data);
		item.data += energyGot;
		return energyGot;
	},
	
	addEnergyTo: function(item, energy, transf, level){
		level = level || 0;
		var data = this.getItemData(item.id);
		if(!data || data.type == "flash" || data.level > level){
			return 0;
		}
		
		var energyAdd = Math.min(item.data - 1, transf);
		if(energy >= energyAdd){
			item.data -= energyAdd;
			return energyAdd;
		}
		return 0;
	},
	
	getEnergyStored: function(item){
		var data = this.getItemData(item.id);
		if(!data){
			return 0;
		}
		return data.maxDamage - item.data;
	}
}

Callback.addCallback("tick", function(){
	var item = Player.getCarriedItem();
	var data = ChargeItemRegistry.getItemData(item.id);
	if(item.data==0 && data && data.type != "flash"){
		Player.setCarriedItem(item.id, 1, 1);
	}
});

var PADDING_ENERGY = function(api, field, result){
	var energy = 0;
	for(var i in field){
		if(!ChargeItemRegistry.isFlashStorage(field[i].id)){
			energy += ChargeItemRegistry.getEnergyFrom(field[i], 10000000, 3, true);
		}
		api.decreaseFieldSlot(i);
	}
	ChargeItemRegistry.addEnergyTo(result, energy, energy, 3);
}

var ENERGY_ITEM_NAME = function(item, name){
	var energyStorage = Item.getMaxDamage(item.id) - 1;
	var energyStored = Math.min(energyStorage - item.data + 1, energyStorage);
	if(energyStored==0){return name;}
	return name + "\n" + energyStored + "/" + energyStorage + " RF";
}




// file: items/draconium.js

IDRegistry.genItemID("draconiumDust");
Item.createItem("draconiumDust", "Draconium Dust", {name: "draconium_dust", meta: 0}, {});
IDRegistry.genItemID("draconiumIngot");
Item.createItem("draconiumIngot", "Draconium Ingot", {name: "draconium_ingot", meta: 0}, {});
Recipes.addFurnace(ItemID.draconiumDust, ItemID.draconiumIngot, 0);
IDRegistry.genItemID("draconicCore");
Item.createItem("draconicCore", "Draconic Core", {name: "core", meta: 0}, {});
Recipes.addShaped({id: ItemID.draconicCore, count: 1, data: 0}, [
	"bab",
	"aca",
	"bab"
], ['a', ItemID.draconiumIngot, 0, 'b', 266, 0, 'c', 264, 0]); 




// file: items/wywern.js

IDRegistry.genItemID("wywernCore");
Item.createItem("wywernCore", "Wywern Core", {name: "core", meta: 1}, {});
Item.setGlint(ItemID.wywernCore, true);
Recipes.addShaped({id: ItemID.wywernCore, count: 1, data: 0}, [
	"bab",
	"aca",
	"bab"
], ['a', ItemID.draconicCore, 0, 'b', ItemID.draconiumIngot, 0, 'c', 399, 0]); 
IDRegistry.genItemID("wywernEnergyCore");
Item.createItem("wywernEnergyCore", "Wywern Energy Core", {name: "energy_core", meta: 0}, {});
Recipes.addShaped({id: ItemID.wywernEnergyCore, count: 1, data: 0}, [
	"bab",
	"aca",
	"bab"
], ['a', 152, 0, 'b', ItemID.draconiumIngot, 0, 'c', ItemID.draconicCore, 0]); 
IDRegistry.genItemID("wywernHelmet");
Item.createArmorItem("wywernHelmet", "Wywern Helmet", {name: "wywern_helmet", meta: 0}, {	isTech: false,
	armor: 3,
	type: "helmet",
	texture: "armor/wywern0.png",
	durability: 4000000
});
ARMOR.setMode({
	id: ItemID.wywernHelmet,
	type: [0],
	tick: function(){
	   Entity.addEffect(Player.get(), 10, 40, 14, false,false);
	}
});
Item.registerNameOverrideFunction(ItemID.wywernHelmet, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.wywernHelmet, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"
], ['a', ItemID.wywernCore, 0, 'b', ItemID.draconiumIngot, 0, 'c', 310, 0, 'd', ItemID.wywernEnergyCore, 0], PADDING_ENERGY);
IDRegistry.genItemID("wywernChestplate");
Item.createArmorItem("wywernChestplate", "Wywern Chestplate", {name: "wywern_chestplate", meta: 0}, {	isTech: false,
	armor: 8,
	type: "chestplate",
	texture: "armor/wywern0.png",
	durability: 4000000
});
ARMOR.setMode({
	id: ItemID.wywernChestplate,
	type: [1],
	tick: function(){
	   Entity.addEffect(Player.get(), 11, 40, 14, false,false);
	}
});
Item.registerNameOverrideFunction(ItemID.wywernChestplate, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.wywernChestplate, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"
], ['a', ItemID.wywernCore, 0, 'b', ItemID.draconiumIngot, 0, 'c', 311, 0, 'd', ItemID.wywernEnergyCore, 0], PADDING_ENERGY);
IDRegistry.genItemID("wywernLeggings");
Item.createArmorItem("wywernLeggings", "Wywern Leggings", {name: "wywern_leggins", meta: 0}, {	isTech: false,
	armor: 6,
	type: "leggings",
	texture: "armor/wywern1.png",
	durability: 4000000
});
ARMOR.setMode({
	id: ItemID.wywernLeggings,
	type: [2],
	tick: function(){
	   Entity.addEffect(Player.get(), 1, 4, 14, false,false);
	}
});
Item.registerNameOverrideFunction(ItemID.wywernLeggings, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.wywernLeggings, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"
], ['a', ItemID.wywernCore, 0, 'b', ItemID.draconiumIngot, 0, 'c', 312, 0, 'd', ItemID.wywernEnergyCore, 0], PADDING_ENERGY);
IDRegistry.genItemID("wywernBoots");
Item.createArmorItem("wywernBoots", "Wywern Boots", {name: "wywern_boots", meta: 0}, {	isTech: false,
	armor: 3,
	type: "boots",
	texture: "armor/wywern0.png",
	durability: 4000000
});
ARMOR.setMode({
	id: ItemID.wywernBoots,
	type: [3],
	tick: function(){
	   Entity.addEffect(Player.get(), 8, 2, 14, false,false);
	}
});
Item.registerNameOverrideFunction(ItemID.wywernBoots, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.wywernBoots, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"
], ['a', ItemID.wywernCore, 0, 'b', ItemID.draconiumIngot, 0, 'c', 313, 0, 'd', ItemID.wywernEnergyCore, 0], PADDING_ENERGY);
ToolAPI.addToolMaterial("wywern", {durability: 4000000, level: 5, efficiency: 15, damage: 15, enchantability: 1});
IDRegistry.genItemID("wywernSword");
Item.createItem("wywernSword", "Wywern Sword", {name: "wywern_sword", meta: 0}, {stack: 1});
Callback.addCallback("DestroyBlock", function(coords, block, player){
var getBlock = World.getBlockID(coords.x, coords.y, coords.z);
item=Player.getCarriedItem(true);
if(item.id==ItemID.wywernSword&&getBlock==31||item.id==ItemID.wywernSword&&getBlock==175){
for(var xx = -10; xx <=10; xx++){
for(var yy = -10; yy <=10; yy++){
for(var zz = -10; zz <=10; zz++){
if(World.getBlockID(coords.x + xx, coords.y + yy, coords.z + zz) == 31||World.getBlockID(coords.x + xx, coords.y + yy, coords.z + zz) == 175) {
World.destroyBlock(coords.x + xx, coords.y + yy, coords.z + zz, true);}}}};}});
ToolAPI.setTool(ItemID.wywernSword, "wywern", ToolType.sword);
Item.registerNameOverrideFunction(ItemID.wywernSword, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.wywernSword, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"
], ['a', ItemID.wywernCore, 0, 'b', ItemID.draconiumIngot, 0, 'c', 276, 0, 'd', ItemID.wywernEnergyCore, 0], PADDING_ENERGY);
IDRegistry.genItemID("wywernPickaxe");
Item.createItem("wywernPickaxe", "Wywern Pickaxe", {name: "wywern_pickaxe", meta: 0}, {stack: 1});
ToolAPI.setTool(ItemID.wywernPickaxe, "wywern", ToolType.pickaxe);
Callback.addCallback("DestroyBlock", function(coords, block, player){

var side = coords.side;

var X = 1;
var Y = 1;
var Z = 1;

if(side==4 || side==5){
            X = 0;}
            if(side==1 || side==6){
            Y = 0;}
            if(side==2 || side==3){
            Z = 0;}
for(var xx = coords.x - X; xx <= coords.x + X; xx++){
                for(var yy = coords.y - Y; yy <= coords.y + Y; yy++){
                    for(var zz = coords.z - Z; zz <= coords.z + Z; zz++){
item=Player.getCarriedItem(true);
var blockID = World.getBlockID(xx, yy, zz);
var material = ToolAPI.getBlockMaterial(blockID) || {};
if(World.getBlockID(xx, yy, zz) !== 7 &&  material.name == "stone" &&item.id==ItemID.wywernPickaxe){
ToolAPI.breakCarriedTool(9);
World.destroyBlock(xx, yy, zz, true);}}}};});
Item.registerNameOverrideFunction(ItemID.wywernPickaxe, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.wywernPickaxe, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"
], ['a', ItemID.wywernCore, 0, 'b', ItemID.draconiumIngot, 0, 'c', 278, 0, 'd', ItemID.wywernEnergyCore, 0], PADDING_ENERGY);
IDRegistry.genItemID("wywernShovel");
Item.createItem("wywernShovel", "Wywern Shovel", {name: "wywern_shovel", meta: 0}, {stack: 1});
Callback.addCallback("DestroyBlock", function(coords, block, player){
var getBlock = World.getBlockID(coords.x, coords.y, coords.z);
item=Player.getCarriedItem(true);
if(item.id==ItemID.wywernShovel&&getBlock==2||item.id==ItemID.wywernShovel&&getBlock==3){
for(var xx = -1; xx <=1; xx++){
for(var yy = -1; yy <=1; yy++){
for(var zz = -1; zz <=1; zz++){
if(World.getBlockID(coords.x + xx, coords.y + yy, coords.z + zz) == 2||World.getBlockID(coords.x + xx, coords.y + yy, coords.z + zz) == 3) {
ToolAPI.breakCarriedTool(9);
World.destroyBlock(coords.x + xx, coords.y + yy, coords.z + zz, true);}}}};}});
ToolAPI.setTool(ItemID.wywernShovel, "wywern", ToolType.shovel);
Item.registerNameOverrideFunction(ItemID.wywernShovel, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.wywernShovel, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"
], ['a', ItemID.wywernCore, 0, 'b', ItemID.draconiumIngot, 0, 'c', 277, 0, 'd', ItemID.wywernEnergyCore, 0], PADDING_ENERGY);




// file: items/awaked.js

IDRegistry.genItemID("dragonHeart");
Item.createItem("dragonHeart", "Dragon Heart", {name: "dragon_heart", meta: 0}, {stack: 1});

Callback.addCallback("ItemUse", function (coords, item, block) {
if (item.id==ItemID.dragonHeart)
{
World.setBlock (coords.relative.x, coords.relative.y, coords.relative.z, BlockID.dragonHeart, 0);
Player.decreaseCarriedItem (1);
}
});

IDRegistry.genItemID("awakedIngot");
Item.createItem("awakedIngot", "Awaked Draconic Ingot", {name: "draconic_ingot", meta: 0}, {});
Recipes.addShaped({id: ItemID.awakedIngot, count: 9, data: 0}, [
	"a"
], ['a', BlockID.awakedBlock, 0]); 
IDRegistry.genItemID("awakedCore");
Item.createItem("awakedCore", "Awaked Draconic Core", {name: "core", meta: 2}, {});
Item.setGlint(ItemID.awakedCore, true);
Recipes.addShaped({id: ItemID.awakedCore, count: 1, data: 0}, [
	"bab",
	"aca",
	"bab"
], ['a', ItemID.wywernCore, 0, 'b', ItemID.awakedIngot, 0, 'c', ItemID.dragonHeart, 0]); 
IDRegistry.genItemID("awakedEnergyCore");
Item.createItem("awakedEnergyCore", "Awaked Draconic Energy Core", {name: "energy_core", meta: 1,}, {});
Recipes.addShaped({id: ItemID.awakedEnergyCore, count: 1, data: 0}, [
	"bab",
	"aca",
	"bab"
], ['a', 152, 0, 'b', ItemID.awakedIngot, 0, 'c', ItemID.wywernEnergyCore, 0]); 




// file: items/draconic.js

IDRegistry.genItemID("draconicHelmet");
Item.createArmorItem("draconicHelmet", "Draconic Helmet", {name: "draconic_helmet", meta: 0}, {	isTech: false,
	armor: 3,
	type: "helmet",
	texture: "armor/draconic0.png",
	durability: 16000000
});
ARMOR.setMode({
	id: ItemID.draconicHelmet,
	type: [0],
	tick: function(){
	   Entity.addEffect(Player.get(), 16, 1, 19, false,false);
       Entity.addEffect(Player.get(), 23, 190, 19, false,false);
       Entity.addEffect(Player.get(), 13, 190, 19, false,false);
	}
});
Item.registerNameOverrideFunction(ItemID.draconicHelmet, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.draconicHelmet, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"
], ['a', ItemID.awakedCore, 0, 'b', ItemID.awakedIngot, 0, 'c', ItemID.wywernHelmet, -1, 'd', ItemID.awakedEnergyCore, 0], PADDING_ENERGY);
IDRegistry.genItemID("draconicChestplate");
Item.createArmorItem("draconicChestplate", "Draconic Chestplate", {name: "draconic_chestplate", meta: 0}, {	isTech: false,
	armor: 8,
	type: "chestplate",
	texture: "armor/draconic0.png",
	durability: 16000000
});
ARMOR.setMode({
	id: ItemID.draconicChestplate,
	type: [1],
	tick: function(){
	   Entity.addEffect(Player.get(), 11, 190, 19, false,false);
       Entity.addEffect(Player.get(), 10, 190, 19, false,false);
       Player.setFlyingEnabled(true);
	}
});
Callback.addCallback("tick",function() {
    if(Player.getArmorSlot(1).id ==! ItemID.draconicChestplate && !Game.getGameMode()){
	    Player.setFlyingEnabled(false);
    }
});
Item.registerNameOverrideFunction(ItemID.draconicChestplate, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.draconicChestplate, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"
], ['a', ItemID.awakedCore, 0, 'b', ItemID.awakedIngot, 0, 'c', ItemID.wywernChestplate, -1, 'd', ItemID.awakedEnergyCore, 0], PADDING_ENERGY);
IDRegistry.genItemID("draconicLeggings");
Item.createArmorItem("draconicLeggings", "Draconic Leggings", {name: "draconic_leggins", meta: 0}, {	isTech: false,
	armor: 6,
	type: "leggings",
	texture: "armor/draconic1.png",
	durability: 16000000
});
ARMOR.setMode({
	id: ItemID.draconicLeggings,
	type: [2],
	tick: function(){
	   Entity.addEffect(Player.get(), 1, 9, 19, false,false);
	}
});
Item.registerNameOverrideFunction(ItemID.draconicLeggings, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.draconicLeggings, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"
], ['a', ItemID.awakedCore, 0, 'b', ItemID.awakedIngot, 0, 'c', ItemID.wywernLeggings, -1, 'd', ItemID.awakedEnergyCore, 0], PADDING_ENERGY);
IDRegistry.genItemID("draconicBoots");
Item.createArmorItem("draconicBoots", "Draconic Boots", {name: "draconic_boots", meta: 0}, {	isTech: false,
	armor: 3,
	type: "boots",
	texture: "armor/draconic0.png",
	durability: 16000000
});
ARMOR.setMode({
	id: ItemID.draconicBoots,
	type: [3],
	tick: function(){
	   Entity.addEffect(Player.get(), 8, 3, 19, false,false);
	}
});
Item.registerNameOverrideFunction(ItemID.draconicBoots, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.draconicBoots, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"], ['a', ItemID.awakedCore, 0, 'b', ItemID.awakedIngot, 0, 'c', ItemID.wywernBoots, -1, 'd', ItemID.awakedEnergyCore, 0], PADDING_ENERGY);
ToolAPI.addToolMaterial("draconic", {durability: 16000000, level: 5, efficiency: 35, damage: 35, enchantability: 1});
IDRegistry.genItemID("draconicSword");
Item.createItem("draconicSword", "Draconic Sword", {name: "draconic_sword", meta: 0}, {stack: 1});
ToolAPI.setTool(ItemID.draconicSword, "draconic", ToolType.sword);
Callback.addCallback("DestroyBlock", function(coords, block, player){
var getBlock = World.getBlockID(coords.x, coords.y, coords.z);
item=Player.getCarriedItem(true);
if(item.id==ItemID.draconicSword&&getBlock==31||item.id==ItemID.draconicSword&&getBlock==175){
for(var xx = -20; xx <=20; xx++){
for(var yy = -20; yy <=20; yy++){
for(var zz = -20; zz <=20; zz++){
if(World.getBlockID(coords.x + xx, coords.y + yy, coords.z + zz) == 31||World.getBlockID(coords.x + xx, coords.y + yy, coords.z + zz) == 175) {
World.destroyBlock(coords.x + xx, coords.y + yy, coords.z + zz, true);}}}};}});
Item.registerNameOverrideFunction(ItemID.draconicSword, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.draconicSword, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"
], ['a', ItemID.awakedCore, 0, 'b', ItemID.awakedIngot, 0, 'c', ItemID.wywernSword, -1, 'd', ItemID.awakedEnergyCore, 0], PADDING_ENERGY);
IDRegistry.genItemID("draconicPickaxe");
Item.createItem("draconicPickaxe", "Draconic Pickaxe", {name: "draconic_pickaxe", meta: 0}, {stack: 1});
ToolAPI.setTool(ItemID.draconicPickaxe, "draconic", ToolType.pickaxe);
Callback.addCallback("DestroyBlock", function(coords, block, player){

var side = coords.side;

var X = 2;
var Y = 2;
var Z = 2;

if(side==4 || side==5){
            X = 0;}
            if(side==1 || side==6){
            Y = 0;}
            if(side==2 || side==3){
            Z = 0;}
for(var xx = coords.x - X; xx <= coords.x + X; xx++){
                for(var yy = coords.y - Y; yy <= coords.y + Y; yy++){
                    for(var zz = coords.z - Z; zz <= coords.z + Z; zz++){
item=Player.getCarriedItem(true);
var blockID = World.getBlockID(xx, yy, zz);
var material = ToolAPI.getBlockMaterial(blockID) || {};
if(World.getBlockID(xx, yy, zz) !== 7 && material.name == "stone" && item.id==ItemID.draconicPickaxe){
ToolAPI.breakCarriedTool(25);
World.destroyBlock(xx, yy, zz, true);}}}};});
Item.registerNameOverrideFunction(ItemID.draconicPickaxe, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.draconicPickaxe, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"
], ['a', ItemID.awakedCore, 0, 'b', ItemID.awakedIngot, 0, 'c', ItemID.wywernPickaxe, -1, 'd', ItemID.awakedEnergyCore, 0], PADDING_ENERGY);
IDRegistry.genItemID("draconicShovel");
Item.createItem("draconicShovel", "Draconic Shovel", {name: "draconic_shovel", meta: 0}, {stack: 1});
Callback.addCallback("DestroyBlock", function(coords, block, player){
var getBlock = World.getBlockID(coords.x, coords.y, coords.z);
item=Player.getCarriedItem(true);
if(item.id==ItemID.draconicShovel&&getBlock==2||item.id==ItemID.draconicShovel&&getBlock==3){
for(var xx = -2; xx <=2; xx++){
for(var yy = -2; yy <=2; yy++){
for(var zz = -2; zz <=2; zz++){
if(World.getBlockID(coords.x + xx, coords.y + yy, coords.z + zz) == 2||World.getBlockID(coords.x + xx, coords.y + yy, coords.z + zz) == 3) {
ToolAPI.breakCarriedTool(25);
World.destroyBlock(coords.x + xx, coords.y + yy, coords.z + zz, true);}}}};}});
ToolAPI.setTool(ItemID.draconicShovel, "draconic", ToolType.shovel);
Item.registerNameOverrideFunction(ItemID.draconicShovel, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.draconicShovel, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"
], ['a', ItemID.awakedCore, 0, 'b', ItemID.awakedIngot, 0, 'c', ItemID.wywernShovel, -1, 'd', ItemID.awakedEnergyCore, 0], PADDING_ENERGY);
IDRegistry.genItemID("draconicAxe");
Item.createItem("draconicAxe", "Draconic Axe", {name: "draconic_axe", meta: 0}, {stack: 1});
ToolAPI.setTool(ItemID.draconicAxe, "draconic", ToolType.axe);
Callback.addCallback("DestroyBlock", function(coords, block, player){
var getBlock = World.getBlockID(coords.x, coords.y, coords.z);
item=Player.getCarriedItem(true);
if(item.id==ItemID.draconicAxe&&getBlock==17||item.id==ItemID.draconicAxe&&getBlock==162){
for(var xx = -5; xx <=5; xx++){
for(var yy = -20; yy <=40; yy++){
for(var zz = -5; zz <=5; zz++){
if(World.getBlockID(coords.x + xx, coords.y + yy, coords.z + zz) == 17||World.getBlockID(coords.x + xx, coords.y + yy, coords.z + zz) == 162||World.getBlockID(coords.x + xx, coords.y + yy, coords.z + zz) == 18||World.getBlockID(coords.x + xx, coords.y + yy, coords.z + zz) == 161) {
ToolAPI.breakCarriedTool(25);
World.destroyBlock(coords.x + xx, coords.y + yy, coords.z + zz, true);}}}};}});
Item.registerNameOverrideFunction(ItemID.draconicAxe, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.draconicAxe, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"
], ['a', ItemID.awakedCore, 0, 'b', ItemID.awakedIngot, 0, 'c', 279, 0, 'd', ItemID.awakedEnergyCore, 0], PADDING_ENERGY);
IDRegistry.genItemID("draconicHoe");
Item.createItem("draconicHoe", "Draconic Hoe", {name: "draconic_hoe", meta: 0}, {stack: 1});
ToolAPI.setTool(ItemID.draconicHoe, "draconic", ToolType.hoe);
Item.registerNameOverrideFunction(ItemID.draconicHoe, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.draconicHoe, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"
], ['a', ItemID.awakedCore, 0, 'b', ItemID.awakedIngot, 0, 'c', 293, 0, 'd', ItemID.awakedEnergyCore, 0], PADDING_ENERGY);




// file: items/chaos.js

IDRegistry.genBlockID("infusedObsidian");
Block.createBlock("infusedObsidian", [
	{name: "Infused Obsidian", texture: [["infused_obsidian", 0]], inCreative: true}
], BLOCK_TYPE_BOOM)
ToolAPI.registerBlockMaterial(BlockID.infusedObsidian, "unbreaking");
Recipes.addShaped({id: BlockID.infusedObsidian, count: 1, data: 0}, [
	"bab",
	"aca",
	"bab"
], ['a', 49, 0, 'b', 377, 0, 'c', ItemID.draconiumDust, 0]); 
Block.registerDropFunction("infusedObsidian", function(coords, blockID, blockData, level){
	if (level > 3){
		return [[BlockID.infusedObsidian, 1, 0]]
	}
	return [];
}, 2);

IDRegistry.genItemID("smallChaosCrystal");
Item.createItem("smallChaosCrystal", "Small Crystal of Chaos", {name: "small_crystal_chaos", meta: 0}, {stack: 64});
IDRegistry.genItemID("chaosCrystal");
Item.createItem("chaosCrystal", "Crystal of Chaos", {name: "crystal_chaos", meta: 0}, {stack: 64});
IDRegistry.genBlockID("chaosCrystal");
Block.createBlock("chaosCrystal", [
	{name: "Chaos Crystal", texture: [["chaos_crystal", 0]], inCreative: true}
], BLOCK_TYPE_BOOM)
ToolAPI.registerBlockMaterial(BlockID.chaosCrystal, "stone")
Block.registerDropFunction("chaosCrystal", function(coords, blockID, blockData, level){
	if (level > 3){
		return [[ItemID.smallChaosCrystal,1 + Math.random() * 5,0], [ItemID.chaosCrystal, 1, 0]]
	}
	return [];
}, 2);
var mesh = new RenderMesh();
mesh.setBlockTexture("chaos_crystal", 0);
mesh.importFromFile(__dir__ + "res/models/chaos_crystal.obj", "obj", null); 
var blockModel = new BlockRenderer.Model(mesh);
var icRenderModel = new ICRender.Model();
icRenderModel.addEntry(blockModel);
BlockRenderer.setStaticICRender(BlockID.chaosCrystal, -1, icRenderModel);
Recipes.addShaped({id: ItemID.chaosCrystal, count: 1, data: 0}, [
	"aaa",
	"aaa",
	"aaa"
], ['a', ItemID.smallChaosCrystal, 0]); 
IDRegistry.genItemID("chaosCore");
Item.createItem("chaosCore", "Chaos Core", {name: "core", meta: 3}, {});
Item.setGlint(ItemID.chaosCore, true);
Recipes.addShaped({id: ItemID.chaosCore, count: 1, data: 0}, [
	"bab",
	"aca",
	"bab"
], ['a', ItemID.awakedCore, 0, 'b', ItemID.awakedIngot, 0, 'c', ItemID.chaosCrystal, 0]); 
ToolType.staff = {
enchantType: Native.EnchantType.pickaxe,
damage: 0,
blockTypes: ["stone", "dirt", "wood", "plant", "firbe"]}
ToolAPI.addToolMaterial("chaos", {durability: 48000000, level: 5, efficiency: 60, damage: 60, enchantability: 1});
IDRegistry.genItemID("powerStaff");
Item.createItem("powerStaff", "Staff of Power", {name: "staff", meta: 0}, {stack: 1});
ToolAPI.setTool(ItemID.powerStaff, "chaos", ToolType.staff);
Callback.addCallback("DestroyBlock", function(coords, block, player){

var side = coords.side;

var X = 3;
var Y = 3;
var Z = 3;

if(side==4 || side==5){
            X = 0;}
            if(side==1 || side==6){
            Y = 0;}
            if(side==2 || side==3){
            Z = 0;}
for(var xx = coords.x - X; xx <= coords.x + X; xx++){
                for(var yy = coords.y - Y; yy <= coords.y + Y; yy++){
                    for(var zz = coords.z - Z; zz <= coords.z + Z; zz++){
item=Player.getCarriedItem(true);
if(World.getBlockID(xx, yy, zz) !== 7&&item.id==ItemID.powerStaff){
ToolAPI.breakCarriedTool(49);
World.destroyBlock(xx, yy, zz, true);}}}};});
Item.registerNameOverrideFunction(ItemID.powerStaff, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.powerStaff, count: 1, data: 0}, [
	"bab",
	"ecf",
	"bdb"
], ['a', ItemID.awakedCore, 0, 'b', ItemID.awakedIngot, 0, 'c', ItemID.draconicPickaxe, -1, 'd', ItemID.awakedEnergyCore, 0, 'e', ItemID.draconicAxe, -1, 'f', ItemID.draconicShovel, -1], PADDING_ENERGY);




// file: block/draconium.js

var BLOCK_TYPE_ORE = Block.createSpecialType({
	destroytime: 16.0,
	explosionres: 60,
	base: 1
});
IDRegistry.genBlockID("draconiumOre");
Block.createBlock("draconiumOre", [
	{name: "Draconium Ore", texture: [["draconium_ore", 0]], inCreative: true}
], BLOCK_TYPE_ORE)
ToolAPI.registerBlockMaterial(BlockID.draconiumOre, "stone")
Callback.addCallback("GenerateChunkUnderground", function (chunkX, chunkZ) {
    for(var i=0;i<7;i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 10, 40);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.draconiumOre, 7, 6);
    }
}
)
Block.registerDropFunction("draconiumOre", function(coords, blockID, blockData, level){
	if (level > 3){
		return [[ItemID.draconiumDust,1 + Math.random() * 2,0]]
	}
	return [];
}, 2);
IDRegistry.genBlockID("draconiumOreNether");
Block.createBlock("draconiumOreNether", [
	{name: "Draconium Ore", texture: [["draconium_ore_nether", 0]], inCreative: true}
], BLOCK_TYPE_ORE)
ToolAPI.registerBlockMaterial(BlockID.draconiumOreNether, "stone")
Callback.addCallback("GenerateNetherChunk", function (chunkX, chunkZ) {
    for(var i=0;i<7;i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 10, 123);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.draconiumOreNether, 7, 8);
    }
}
)
Block.registerDropFunction("draconiumOreNether", function(coords, blockID, blockData, level){
	if (level > 2){
		return [[ItemID.draconiumDust,1 + Math.random() * 2,0]]
	}
	return [];
}, 2);
IDRegistry.genBlockID("draconiumOreEnd");
Block.createBlock("draconiumOreEnd", [
	{name: "Draconium Ore", texture: [["draconium_ore_end", 0]], inCreative: true}
], BLOCK_TYPE_ORE)
ToolAPI.registerBlockMaterial(BlockID.draconiumOreEnd, "stone")
Callback.addCallback("GenerateEndChunk", function (chunkX, chunkZ) {
    for(var i=0;i<7;i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 10, 123);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.draconiumOreEnd, 7, 8);
    }
}
)
Block.registerDropFunction("draconiumOreEnd", function(coords, blockID, blockData, level){
	if (level > 2){
		return [[ItemID.draconiumDust,1 + Math.random() * 2,0]]
	}
	return [];
}, 2);
var BLOCK_TYPE_DRACONIUM = Block.createSpecialType({
	destroytime: 10.0,
	explosionres: 1500.0,
	base: 1
});
IDRegistry.genBlockID("draconiumBlock");
Block.createBlock("draconiumBlock", [
	{name: "Draconium Block", texture: [["draconium_block", 0], ["draconium_block", 0], ["draconium_block_side", 0]], inCreative: true}
], BLOCK_TYPE_DRACONIUM)
ToolAPI.registerBlockMaterial(BlockID.draconiumBlock, "stone")
Recipes.addShaped({id: BlockID.draconiumBlock, count: 1, data: 0}, [
	"aaa",
	"aaa",
	"aaa"
], ['a', ItemID.draconiumIngot, 0]); 
Recipes.addShaped({id: ItemID.draconiumIngot, count: 9, data: 0}, [
	"a"
], ['a', BlockID.draconiumBlock, 0]); 
Block.registerDropFunction("draconiumBlock", function(coords, blockID, blockData, level){
	if (level > 2){
		return [[BlockID.draconiumBlock, 1, 0]]
	}
	return [];
}, 2);
IDRegistry.genBlockID("draconiumBlockCharged");
Block.createBlock("draconiumBlockCharged", [
	{name: "Charged Draconium Block", texture: [["draconium_block_charged", 0], ["draconium_block_charged", 0], ["draconium_block_charged_side", 0]], inCreative: true}
], BLOCK_TYPE_DRACONIUM)
ToolAPI.registerBlockMaterial(BlockID.draconiumBlockCharged, "stone")
Block.registerDropFunction("draconiumBlockCharged", function(coords, blockID, blockData, level){
	if (level > 2){
		return [[BlockID.draconiumBlockCharged, 1, 0]]
	}
	return [];
}, 2);
var BLOCK_TYPE_BOOM = Block.createSpecialType({
	destroytime: 1200.0,
	explosionres: 1200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000.0,
	base: 1
});
IDRegistry.genBlockID("ressuractionStone");
Block.createBlock("ressuractionStone", [
	{name: "Ressuraction Stone", texture: [["ressuraction_stone", 0]], inCreative: true}
], BLOCK_TYPE_DRACONIUM)
ToolAPI.registerBlockMaterial(BlockID.ressuractionStone, "stone")
Recipes.addShaped({id: BlockID.ressuractionStone, count: 1, data: 0}, [
	" b",
	"bab",
	" b "
], ['a', BlockID.draconiumBlock, 0, 'b', ItemID.wywernCore, 0]); 




// file: block/awaked.js

var BLOCK_TYPE_HEART= Block.createSpecialType({
	destroytime: 0,
	explosionres: 19000000000000000000000000000000000.0,
	base: 1
});

IDRegistry.genBlockID("dragonHeart");
Block.createBlock("dragonHeart", [{name: "Dragon Heart", texture: [["dragon_heart", 0]], inCreative: false}], BLOCK_TYPE_HEART);
var render = new ICRender.Model(); 
BlockRenderer.setStaticICRender(BlockID.dragonHeart, 0, render);

var model = BlockRenderer.createModel();

model.addBox(8/16, 3/16, 7/16, 9/16, 4/16, 9/16, BlockID.dragonHeart, 0);
model.addBox(8/16, 4/16, 6/16, 9/16, 5/16, 10/16, BlockID.dragonHeart, 0);
model.addBox(7/16, 4/16, 7/16, 10/16, 5/16, 9/16, BlockID.dragonHeart, 0);
model.addBox(8/16, 5/16, 5/16, 9/16, 6/16, 11/16, BlockID.dragonHeart, 0);
model.addBox(7/16, 5/16, 6/16, 10/16, 6/16, 10/16, BlockID.dragonHeart, 0);
model.addBox(8/16, 6/16, 4/16, 9/16, 7/16, 12/16, BlockID.dragonHeart, 0);
model.addBox(7/16, 6/16, 5/16, 10/16, 7/16, 11/16, BlockID.dragonHeart, 0);
model.addBox(8/16, 7/16, 3/16, 9/16, 11/16, 13/16, BlockID.dragonHeart, 0);
model.addBox(7/16, 7/16, 4/16, 10/16, 11/16, 12/16, BlockID.dragonHeart, 0);
model.addBox(8/16, 11/16, 4/16, 9/16, 12/16, 12/16, BlockID.dragonHeart, 0);
model.addBox(7/16, 11/16, 5/16, 10/16, 12/16, 7/16, BlockID.dragonHeart, 0);
model.addBox(7/16, 11/16, 9/16, 10/16, 12/16, 11/16, BlockID.dragonHeart, 0);
model.addBox(8/16, 12/16, 5/16, 9/16, 13/16, 7/16, BlockID.dragonHeart, 0);
model.addBox(8/16, 12/16, 9/16, 9/16, 13/16, 11/16, BlockID.dragonHeart, 0);
render.addEntry(model); 

Block.setBlockShape(BlockID.dragonHeart, {x: 0.4, y: 0.1, z: 0.1}, {x: 0.6, y: 0.9, z: 0.9});

ToolAPI.registerBlockMaterial(BlockID.dragonHeart, "stone")
Block.registerDropFunction("dragonHeart", function(coords, blockID, blockData, level){
	if (level > -1){
		return [[ItemID.dragonHeart, 1, 0]]
	}
	return [];
}, 2);

IDRegistry.genBlockID("awakedBlock");
Block.createBlock("awakedBlock", [
	{name: "Awaked Draconic Block", texture: [["draconic_block", 0], ["draconic_block", 0], ["draconic_block_side", 0]], inCreative: true}
], BLOCK_TYPE_DRACONIUM)
ToolAPI.registerBlockMaterial(BlockID.awakedBlock, "stone")
Recipes.addShaped({id: BlockID.awakedBlock, count: 1, data: 0}, [
	"aaa",
	"aaa",
	"aaa"
], ['a', ItemID.awakedIngot, 0]); 




// file: block/machines/generator.js

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




// file: block/machines/energy_infuser.js

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




// file: block/machines/sun_dial.js

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




// file: block/machines/weather_controller.js

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




// file: block/machines/regenerator.js

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




// file: block/machines/grinder.js

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




// file: block/machines/draconic_solar_panel.js

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




// file: ritual.js

TileEntity.registerPrototype(BlockID.draconiumBlock, {
	
	tick: function(){
		RAPI.ChargedBlock({x: this.x, y: this.y, z: this.z});
	}
	
});

TileEntity.registerPrototype(BlockID.dragonHeart, {
	
	tick: function(){
		RAPI.AwakedBlock({x: this.x, y: this.y, z: this.z});
	}
	
});

TileEntity.registerPrototype(BlockID.ressuractionStone, {
	
	tick: function(){
		RAPI.EvolutionRitual({x: this.x, y: this.y, z: this.z});
	}
	
});

Callback.addCallback("EntityDeath", function(entity){
   if (!DAPI.getSpawn("EvolutionDragon") && Entity.getType(entity) == 53){
    	var coords = Entity.getPosition(entity);
 	   World.setBlock (coords.x-3 + Math.random() * 6, coords.y+2, coords.z-3 + Math.random() * 6, BlockID.dragonHeart, 0);
   }
   if (DAPI.getSpawn("EvolutionDragon") && Entity.getType(entity) == 53){
   	var coords = Entity.getPosition(entity);
       World.setBlock (coords.x-3 + Math.random() * 6, coords.y+2, coords.z-3 + Math.random() * 6, BlockID.dragonHeart, 0);
       World.setBlock (coords.x+3 + Math.random() * 6, coords.y+4, coords.z+3 + Math.random() * 6, BlockID.chaosCrystal, 0);
       World.setBlock (0, 65, 0, 122, 0);
       DAPI.getSpawn("EvolutionDragon") = false;
   }
});




// file: api/EvolutionDragon.js

DAPI.registerDragon("EvolutionDragon", {
	Texture: "de_dragon",
	MaxHealth: 250+Math.random()*400,
	Health: 400,
	Spawn: false
});




