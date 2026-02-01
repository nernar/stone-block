/*
BUILD INFO:
  dir: dev
  target: main.js
  files: 13
*/



// file: header.js

/*
  ___               _                 _                    _      ____                         
 |_ _|  _ __     __| |  _   _   ___  | |_   _ __    __ _  | |    / ___|   ___    _ __    ___   
  | |  | '_ \   / _` | | | | | / __| | __| | '__|  / _` | | |   | |      / _ \  | '__|  / _ \  
  | |  | | | | | (_| | | |_| | \__ \ | |_  | |    | (_| | | |   | |___  | (_) | | |    |  __/  
 |___| |_| |_|  \__,_|  \__,_| |___/  \__| |_|     \__,_| |_|    \____|  \___/  |_|     \___|  
 
 by temeyd, zheka_smirnov (vk.com/zheka_smirnov) and MineExplorer (vk.com/vlad.gr2027)

 This code is a copyright, do not distribute.
*/

// libraries
IMPORT("flags");
IMPORT("ToolLib");
IMPORT("EnergyNet");
IMPORT("ChargeItem");
IMPORT("TileRender");
IMPORT("StorageInterface");

// constants
const GUI_SCALE = 3.2;
const fallVelocity = -0.0784;
var player;

// square lava texture for geothermal generator ui.
LiquidRegistry.getLiquidData("lava").uiTextures.push("gui_lava_texture_16x16");

// import values
Player.getArmorSlot = ModAPI.requireGlobal("Player.getArmorSlot");
Player.setArmorSlot = ModAPI.requireGlobal("Player.setArmorSlot");
Player.setInventorySlot = ModAPI.requireGlobal("Player.setInventorySlot");
var nativeDropItem = ModAPI.requireGlobal("Level.dropItem");
var MobEffect = Native.PotionEffect;
var Enchantment = Native.Enchantment;
var BlockSide = Native.BlockSide;
var EntityType = Native.EntityType;

// energy (Eu)
var EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);

// config
var debugMode = __config__.getBool("debug_mode");
var voltageEnabled = __config__.getBool("voltage_enabled");
var wireDamageEnabled = __config__.getBool("wire_damage_enabled");
Callback.addCallback("LevelLoaded", function(){
	debugMode = __config__.getBool("debug_mode");
	voltageEnabled = __config__.getBool("voltage_enabled");
	wireDamageEnabled = __config__.getBool("wire_damage_enabled");
	player = Player.get();
});

// API
function random(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addShapelessRecipe(result, source){
	var ingredients = [];
	for(var i in source){
		var item = source[i];
		for(var n = 0; n < item.count; n++){
			ingredients.push(item);
		}
	}
	Recipes.addShapeless(result, ingredients);
}


// vanilla items
Recipes.removeFurnaceRecipe(81);
Recipes.addFurnace(81, 351, 2); // cactus fix
Recipes.addFurnaceFuel(325, 10, 2000); // lava bucket
ChargeItemRegistry.registerFlashItem(331, "Eu", 800, 0); // redstone

// debug
var lasttime = -1
var frame = 0

Callback.addCallback("tick", function(){
	if(debugMode){
		var t = java.lang.System.currentTimeMillis()
		if(frame++ % 20 == 0){
			if(lasttime != -1){
				tps = 1000 / (t - lasttime) * 20
				Game.tipMessage(Math.round(tps * 10) / 10 + "tps")
			}
			lasttime = t
		}
	}
});




// file: core/machine/define.js

var MachineRegistry = {
	machineIDs: {},

	isMachine: function(id){
		return this.machineIDs[id];
	},
	
	// Machine Base
	registerPrototype: function(id, Prototype){
		// register ID
		this.machineIDs[id] = true;
		Prototype.id = id;
		
		// click fix
		Prototype.onItemClick = function(id, count, data, coords){
			if (id == ItemID.debugItem || id == ItemID.EUMeter) return false;
			if (this.click(id, count, data, coords)) return true;
			if (Entity.getSneaking(player)) return false;
			var gui = this.getGuiScreen();
			if (gui){
				this.container.openAs(gui);
				return true;
			}
		};
		
		if(Prototype.wrenchClick){
			Prototype.click = function(id, count, data, coords){
				if(ICTool.isValidWrench(id, data, 10)){
					if(this.wrenchClick(id, count, data, coords))
					ICTool.useWrench(id, data, 10);
					return true;
				}
				return false;
			};
		}
		
		if(!Prototype.initModel){
			Prototype.initModel = this.initModel;
		}
		
		if(Prototype.defaultValues && Prototype.defaultValues.isActive !== undefined){
			if(!Prototype.init){
				Prototype.init = Prototype.initModel;
			}
			if(!Prototype.activate){
				Prototype.activate = this.activateMachine;
			}
			if(!Prototype.deactivate){
				Prototype.deactivate = this.deactivateMachine;
			}
			if(!Prototype.destroy){
				Prototype.destroy = function(){
					BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
				}
			}
		}
		
		ToolAPI.registerBlockMaterial(id, "stone", 1);
		Block.setDestroyTime(id, 3);
		TileEntity.registerPrototype(id, Prototype);
	},
	
	// EU machines
	registerElectricMachine: function(id, Prototype){
		// wire connection
		ICRender.getGroup("ic-wire").add(id, -1);
		// setup energy value
		if (Prototype.defaultValues){
			Prototype.defaultValues.energy = 0;
			Prototype.defaultValues.energy_receive = 0;
			Prototype.defaultValues.last_energy_receive = 0;
			Prototype.defaultValues.voltage = 0;
			Prototype.defaultValues.last_voltage = 0;
		}
		else{
			Prototype.defaultValues = {
				energy: 0,
				energy_receive: 0,
				last_energy_receive: 0,
				voltage: 0,
				last_voltage: 0
			};
		}
		
		Prototype.getTier = Prototype.getTier || function(){
			return 1;
		}
		
		if(!Prototype.getEnergyStorage){
			Prototype.getEnergyStorage = function(){
				return 0;
			};
		}
		
		if(!Prototype.energyTick){
			Prototype.energyTick = function(){
				this.data.last_energy_receive = this.data.energy_receive;
				this.data.energy_receive = 0;
				this.data.last_voltage = this.data.voltage;
				this.data.voltage = 0;
			};
		}
		
		if (!Prototype.getMaxPacketSize) {
			Prototype.getMaxPacketSize = function(tier){
				return Math.pow(2, 3 + this.getTier()*2);
			}
		}
		
		this.registerPrototype(id, Prototype);
		// register for energy net
		EnergyTileRegistry.addEnergyTypeForId(id, EU);
	},
	
	registerGenerator(id, Prototype){
		Prototype.canReceiveEnergy = function(){
			return false;
		},
	
		Prototype.isEnergySource = function(){
			return true;
		},
		
		Prototype.energyTick = Prototype.energyTick || this.basicEnergyOutFunc;
		
		this.registerElectricMachine(id, Prototype);
	},
	
	registerEUStorage(id, Prototype){
		Prototype.isEnergySource = function(){
			return true;
		},
		
		Prototype.energyReceive = Prototype.energyReceive || this.basicEnergyReceiveFunc;
		
		Prototype.energyTick = Prototype.energyTick || this.basicEnergyOutFunc;
		
		Prototype.isTeleporterCompatible = true;
		
		this.registerElectricMachine(id, Prototype);
	},
	
	// standart functions
	setStoragePlaceFunction: function(id, fullRotation){
		Block.registerPlaceFunction(BlockID[id], function(coords, item, block){
			Game.prevent();
			var x = coords.relative.x
			var y = coords.relative.y
			var z = coords.relative.z
			block = World.getBlockID(x, y, z)
			if(GenerationUtils.isTransparentBlock(block)){
				World.setBlock(x, y, z, item.id, 0);
				var rotation = TileRenderer.getBlockRotation(fullRotation);
				var tile = World.addTileEntity(x, y, z);
				tile.data.meta = rotation;
				TileRenderer.mapAtCoords(x, y, z, item.id, rotation);
				if(item.extra){
					tile.data.energy = item.extra.getInt("Eu");
				}
			}
		});
	},
	
	getMachineDrop: function(coords, blockID, level, basicDrop){
		BlockRenderer.unmapAtCoords(coords.x, coords.y, coords.z);
		var item = Player.getCarriedItem();
		if(ICTool.isValidWrench(item.id, item.data, 10)){
			ICTool.useWrench(item.id, item.data, 10);
			World.setBlock(coords.x, coords.y, coords.z, 0);
			var chance = ICTool.getWrenchData(item.id).chance;
			if(Math.random() < chance){return [[blockID, 1, 0]];}
			return [[basicDrop || blockID, 1, 0]];
		}
		if(level >= ToolAPI.getBlockDestroyLevel(blockID)){
			return [[basicDrop || blockID, 1, 0]];
		}
		return [];
	},
	
	setFacing: function(coords){
		if(Entity.getSneaking(player)){
			var facing = coords.side + Math.pow(-1, coords.side);
		}else{
			var facing = coords.side;
		}
		if(facing != this.data.meta){
			this.data.meta = facing;
			this.initModel();
			return true;
		}
		return false;
	},
	
	initModel: function(){
		var index = this.hasFullRotation? 6 : 4;
		TileRenderer.mapAtCoords(this.x, this.y, this.z, this.id, this.data.meta + (this.data.isActive? index : 0));
	},
	
	activateMachine: function(){
		var index = this.hasFullRotation? 6 : 4;
		if(!this.data.isActive){
			this.data.isActive = true;
			TileRenderer.mapAtCoords(this.x, this.y, this.z, this.id, this.data.meta + index);
		}
	},
	
	deactivateMachine: function(){
		if(this.data.isActive){
			this.data.isActive = false;
			TileRenderer.mapAtCoords(this.x, this.y, this.z, this.id, this.data.meta);
		}
	},
	
	updateMachine: function(){
		var block = World.getBlock(this.x, this.y, this.z);
		if(block.id != this.id && block.id > 0){
			Game.message("§2Update tile ID: " + this.id);
			World.setBlock(this.x, this.y, this.z, this.id, 0);
			this.data.meta = 0;
		}
		this.initModel();
	},
	
	basicEnergyOutFunc: function(type, src){
		this.data.last_energy_receive = this.data.energy_receive;
		this.data.energy_receive = 0;
		this.data.last_voltage = this.data.voltage;
		this.data.voltage = 0;
		var output = this.getMaxPacketSize();
		if(this.data.energy >= output){
			this.data.energy += src.add(output) - output;
		}
	},
	
	basicEnergyReceiveFunc: function(type, amount, voltage) {
		var maxVoltage = this.getMaxPacketSize();
		if(voltage > maxVoltage){
			if(voltageEnabled){
				World.explode(this.x + 0.5, this.y + 0.5, this.z + 0.5, 0.5, true);
				this.selfDestroy();
				return 0;
			}
			var add = Math.min(maxVoltage, this.getEnergyStorage() - this.data.energy);
		}else{
			var add = Math.min(amount, this.getEnergyStorage() - this.data.energy);
		}
		this.data.energy += add;
		this.data.energy_receive += add;
		this.data.voltage = Math.max(this.data.voltage, voltage);
		return add;
	},
	
	isValidEUItem: function(id, count, data, container){
		var level = container.tileEntity.getTier();
		return ChargeItemRegistry.isValidItem(id, "Eu",  level);
	},
	
	isValidEUStorage: function(id, count, data, container){
		var level = container.tileEntity.getTier();
		return ChargeItemRegistry.isValidStorage(id, "Eu",  level);
	},
}

var transferByTier = {
	1: 32,
	2: 256,
	3: 2048,
	4: 8192
}




// file: core/machine/recipe.js

var MachineRecipeRegistry = {
	recipeData: {},
	
	registerRecipesFor: function(name, data, validateKeys){
		if(validateKeys){
			var newData = {};
			for(var key in data){
				var newKey = key;
				if(key.split(":").length < 2){
					newKey = eval(key);
				}
				newData[newKey] = data[key];
			}
			data = newData;
		}
		this.recipeData[name] = data;
	},
	
	addRecipeFor: function(name, source, result){
		this.requireRecipesFor(name, true)[source] = result;
	},
	
	requireRecipesFor: function(name, createIfNotFound){
		if(!this.recipeData[name] && createIfNotFound){
			this.recipeData[name] = {};
		}
		return this.recipeData[name];
	},
	
	getRecipeResult: function(name, key1, key2){
		var data = this.requireRecipesFor(name);
		if(data){
			return data[key1] || data[key1+":"+key2];
		}
	}
}




// file: core/machine/upgrade.js

var UpgradeAPI = {
	upgrades: {},
	data: {},

	isUpgrade: function(id){
		return UpgradeAPI.upgrades[id];
	},

	registerUpgrade: function(id, func){
		this.upgrades[id] = true;
		this.data[id] = func;
	},

	callUpgrade: function(item, machine, container, data, coords){
		var callback = this.data[item.id];
		if(callback){
			callback(item, machine, container, data, coords);
		}
	},
	
	getUpgrades: function(machine, container){
		var upgrades = [];
		for(var slotName in container.slots){
			if(slotName.match(/Upgrade/)){
				var slot = container.getSlot(slotName);
				if(slot.id){
					var find = false;
					for(var i in upgrades){
						var item = upgrades[i];
						if(item.id == slot.id && item.data == slot.data){
							find = true;
							item.count += slot.count;
						}
					}
					if(!find){
						item = {id: slot.id, count: slot.count, data: slot.data};
						upgrades.push(item);
					}
				}
			}
		}
		return upgrades;
	},

	executeUpgrades: function(machine){
		var container = machine.container;
		var data = machine.data;
		var coords = {x: machine.x, y: machine.y, z: machine.z};
		var upgrades = this.getUpgrades(machine, container);
		for(var i in upgrades){
			this.callUpgrade(upgrades[i], machine, container, data, coords);
		}
	},
}




// file: core/tool.js

var ICTool = {
	wrenchData: {},
	registerWrench: function(id, chance, energyOnUse){
		this.wrenchData[id] = {chance: chance, energy: energyOnUse}
	},
	getWrenchData: function(id){
		return this.wrenchData[id];
	},
	
	isValidWrench: function(id, data, damage){
		var wrench = this.getWrenchData(id);
		if(wrench && (!wrench.energy || data + wrench.energy * damage < Item.getMaxDamage(id))){
			return true;
		}
		return false;
	},
	
	useWrench: function(id, data, damage){
		var wrench = this.getWrenchData(id);
		if(!wrench.energy){
			ToolAPI.breakCarriedTool(damage);
		}else{
			Player.setCarriedItem(id, 1, data + wrench.energy * damage);
		}
	},
	
	addRecipe: function(result, data, tool){
		data.push({id: tool, data: -1});
		Recipes.addShapeless(result, data, function(api, field, result){
			for (var i in field){
				if (field[i].id == tool){
					field[i].data++;
					if (field[i].data >= Item.getMaxDamage(tool)){
						field[i].id = field[i].count = field[i].data = 0;
					}
				}
				else {
					api.decreaseFieldSlot(i);
				}
			}
		});
	}
}

Callback.addCallback("DestroyBlockStart", function(coords, block){
	if(MachineRegistry.machineIDs[block.id]){
		var item = Player.getCarriedItem();
		if(ICTool.isValidWrench(item.id, item.data, 10)){
			Block.setTempDestroyTime(block.id, 0);
		}
	}
});




// file: core/electricity.js

if(voltageEnabled){
	EU.onNetOverload = function(voltage) {
		for(var key in this.wireMap){
			var coords = key.split(':');
			var x = Math.floor(coords[0]), y = Math.floor(coords[1]), z = Math.floor(coords[2]);
			World.setBlock(x, y, z, 0);
			addBurnParticles(x, y, z);
		}
		EnergyNetBuilder.removeNet(this);
	}
}

var addBurnParticles = function(x, y, z){
	for(var i = 0; i < 32; i++){
		var px = x + Math.random();
		var pz = z + Math.random();
		var py = y + Math.random();
		Particles.addFarParticle(Native.ParticleType.smoke, px, py, pz, 0, 0.01, 0);
	}
}


var friendlyMobs = [EntityType.BAT, EntityType.CHICKEN, EntityType.COW, EntityType.MUSHROOM_COW, EntityType.OCELOT, EntityType.PIG, EntityType.RABBIT, EntityType.SHEEP, EntityType.SNOW_GOLEM, EntityType.SQUID, EntityType.VILLAGER, EntityType.WOLF, 23, 24, 25, 26, 27];
var evilMobs = [EntityType.BLAZE, EntityType.CAVE_SPIDER, EntityType.CREEPER, EntityType.ENDERMAN, EntityType.GHAST, EntityType.IRON_GOLEM, EntityType.LAVA_SLIME, EntityType.PIG_ZOMBIE, EntityType.SILVERFISH, EntityType.SKELETON, EntityType.SLIME, EntityType.SPIDER, EntityType.ZOMBIE, EntityType.ZOMBIE_VILLAGER, 45, 46, 47, 48, 49, 55];

function isMob(ent){
	var type = Entity.getType(ent);
	if(ent == player){
		if(Player.getArmorSlot(0).id == ItemID.hazmatHelmet && Player.getArmorSlot(1).id == ItemID.hazmatChestplate &&
		Player.getArmorSlot(2).id == ItemID.hazmatLeggings && Player.getArmorSlot(3).id == ItemID.rubberBoots){
			return false;
		}
		return true;
	}
	if(friendlyMobs.indexOf(type) != -1 || evilMobs.indexOf(type) != -1){
		return true;
	}
	return false;
}

function damageEntityInR(x, y, z, ent){
	for(var yy = y-2; yy < y+2; yy++){
		for(var xx = x-1; xx < x+2; xx++){
			for(var zz = z-1; zz < z+2; zz++){
				var block = World.getBlock(xx, yy, zz);
				if(block.data < IC_WIRES[block.id]){
					var net = EnergyNetBuilder.getNetOnCoords(xx, yy, zz);
					if(net && net.energyName == "Eu" && net.lastVoltage > insulationMaxVolt[block.data]){
						var damage = Math.ceil(net.lastVoltage / 32);
						Entity.damageEntity(ent, damage);
						return;
					}
				}
			}
		}
	}
}

var insulationMaxVolt = {
	0: 5,
	1: 128,
	2: 512
}

Callback.addCallback("tick", function(){
	if(World.getThreadTime()%20 == 0){
		if(wireDamageEnabled){
			var entities = Entity.getAll();
		}
		else{
			var entities = [player];
		}
		for(var i in entities){
			var ent = entities[i];
			if(isMob(ent) && Entity.getHealth(ent) > 0){
				var coords = Entity.getPosition(ent);
				damageEntityInR(Math.floor(coords.x), Math.floor(coords.y), Math.floor(coords.z), ent);
			}
		}
	}
});




// file: core/name_override.js

var RARE_ITEM_NAME = function(item, name){
	return "§b" + name;
}

NameOverrides = {
	addTierTooltip: function(id, tier){
		Item.registerNameOverrideFunction(BlockID[id], function(item, name){
			var tooltip = Translation.translate("Power Tier: ") + tier;
			return name + NameOverrides.getTooltip(name, tooltip);
		});
	},
	
	addStorageBlockTooltip: function(id, tier, capacity){
		Item.registerNameOverrideFunction(BlockID[id], function(item, name){
			return NameOverrides.showBlockStorage(name, tier, capacity);
		});
	},
	
	showBlockStorage: function(name, tier, capacity){
		var tierText = "§7" + Translation.translate("Power Tier: ") + tier;
		tierText = this.getTooltip(name, tierText);
		
		var energy = 0;
		var item = Player.getCarriedItem();
		if(item.extra){
			energy = item.extra.getInt("Eu");
		}
		var energyText = this.displayEnergy(energy) + "/" + capacity + " EU";
		energyText = this.getTooltip(name, energyText);
		
		return name + tierText + energyText;
	},
	
	getTooltip: function(name, tooltip){
		var n = name.length, l = tooltip.length;
		var space = "";
		if(name[0]=='§') n -= 2;
		if(tooltip[0]=='§') l -= 2;
		while(n > l){
			space += " ";
			n -= 2;
		}
		return "\n" + space + tooltip;
	},
	
	getItemStorageText: function(item, name){
		var capacity = Item.getMaxDamage(item.id) - 1;
		var energy = ChargeItemRegistry.getEnergyStored(item);
		var tooltip = "§7" + NameOverrides.displayEnergy(energy) + "/" + NameOverrides.displayEnergy(capacity) + " EU";
		return NameOverrides.getTooltip(name, tooltip);
	},
	
	showItemStorage: function(item, name){
		var tooltip = NameOverrides.getItemStorageText(item, name);
		return name + tooltip;
	},
	
	showRareItemStorage: function(item, name){
		var capacity = Item.getMaxDamage(item.id) - 1;
		var energy = ChargeItemRegistry.getEnergyStored(item);
		var tooltip = "§7" + NameOverrides.displayEnergy(energy) + "/" + NameOverrides.displayEnergy(capacity) + " EU"
		tooltip = NameOverrides.getTooltip(name, tooltip);
		if(energy > 0){
			name = "§b" + name;
		}
		return name + tooltip;
	},
	
	displayEnergy: function(energy){
		if(energy >= 1e6){
			return Math.floor(energy / 1e5) / 10 + "M";
		}
		if(energy >= 1000){
			return Math.floor(energy / 100) / 10 + "K";
		}
		return energy;
	}
}




// file: core/ui_buttons.js

var currentUIscreen;
Callback.addCallback("NativeGuiChanged", function(screenName){
	currentUIscreen = screenName;
	if(screenName != "hud_screen" && screenName != "in_game_play_screen"){
		if(UIbuttons.container){
			UIbuttons.container.close();
			UIbuttons.container = null;
		}
	}
});

var button_scale = __config__.access("button_scale");
var UIbuttons = {
	data: {},
	onSwitch: {},
	onUpdate: {},
	isEnabled: false,
	container: null,
	Window: new UI.Window({
		location: {
			x: 1000 - button_scale,
			y: UI.getScreenHeight()/2 - button_scale*2,
			width: button_scale,
			height: button_scale*5
		},
		drawing: [{type: "background", color: 0}],
		elements: {}
	}),
	
	setArmorButton: function(id, name){
		var data = {type: 0, name: name};
		if(!this.data[id]){
			this.data[id] = [data]
		}else{
			this.data[id].push(data);
		}
	},
	
	setToolButton: function(id, name){
		var data = {type: 1, name: name};
		if(!this.data[id]){
			this.data[id] = [data]
		}else{
			this.data[id].push(data);
		}
	},
	
	getButtons: function(id){
		return this.data[id];
	},
	
	registerButton: function(name, properties){
		buttonContent[name] = properties;
	},
	
	registerSwitchFunction: function(id, func){
		this.onSwitch[id] = func;
	},
	
	onButtonUpdate: function(name, func){
		this.onUpdate[name] = func;
	}
}

var buttonMap = {
	button_nightvision: false,
	button_fly: false,
	button_jump: false,
}

var buttonContent = {
	button_nightvision: {
		y: 0,
		type: "button",
		bitmap: "button_nightvision_on",
		bitmap2: "button_nightvision_off",
		scale: 50,
		clicker: {
			onClick: function(){
				var armor = Player.getArmorSlot(0);
				var extra = armor.extra;
				if(extra){
					var nightvision = extra.getBoolean("nv");
				}
				else{
					var nightvision = false;
					extra = new ItemExtraData();
				}
				if(nightvision){
					extra.putBoolean("nv", false);
					Game.message("§4" + Translation.translate("Nightvision mode disabled"));
				}
				else{
					extra.putBoolean("nv", true);
					Game.message("§2" + Translation.translate("Nightvision mode enabled"));
				}
				Player.setArmorSlot(0, armor.id, 1, armor.data, extra);
			}
		}
	},
	button_fly: {
		y: 1000,
		type: "button",
		bitmap: "button_fly_on",
		bitmap2: "button_fly_off",
		scale: 50
	},
	button_hover: {
		y: 2000,
		type: "button",
		bitmap: "button_hover_off",
		scale: 50,
		clicker: {
			onClick: function(){
				var armor = Player.getArmorSlot(1);
				var extra = armor.extra;
				if(extra){
					var hover = extra.getBoolean("hover");
				}
				else{
					var hover = false;
					extra = new ItemExtraData();
				}
				if(hover){
					extra.putBoolean("hover", false);
					Game.message("§4" + Translation.translate("Hover mode disabled"));
				}
				else{
					extra.putBoolean("hover", true);
					Game.message("§2" + Translation.translate("Hover mode enabled"));
				}
				Player.setArmorSlot(1, armor.id, 1, armor.data, extra);
			}
		}
	},
	button_jump: {
		y: 3000,
		type: "button",
		bitmap: "button_jump_on",
		bitmap2: "button_jump_off",
		scale: 50,
		clicker: {
			onClick: function(){
				var armor = Player.getArmorSlot(3);
				if(Item.getMaxDamage(armor.id) - armor.data >= 1000 && Math.abs(Player.getVelocity().y - fallVelocity) < 0.0001){
					Player.addVelocity(0, 1.4, 0);
					Player.setArmorSlot(3, armor.id, 1, armor.data+1000);
				}
			}
		}
	},
	button_switch: {
		y: 4000,
		type: "button",
		bitmap: "button_switch",
		bitmap2: "button_switch_touched",
		scale: 25,
		clicker: {
			onClick: function(){
				var item = Player.getCarriedItem();
				if(UIbuttons.onSwitch[item.id]){
					UIbuttons.onSwitch[item.id](item);
				}
			}
		}
	}
}

UIbuttons.Window.setAsGameOverlay(true);

UIbuttons.onButtonUpdate("button_hover", function(element){
	var armor = Player.getArmorSlot(1);
	var extra = armor.extra;
	if(extra && extra.getBoolean("hover")){
		element.bitmap = "button_hover_on";
	}else{
		element.bitmap = "button_hover_off";
	}
});

function updateUIbuttons(){
	var elements = UIbuttons.Window.content.elements;
	for(var name in buttonMap){
		if(buttonMap[name]){
			if(!elements[name]){
				elements[name] = buttonContent[name];
			}
			var element = elements[name];
			var func = UIbuttons.onUpdate[name];
			if(func) func(element);
			element.x = 0;
			buttonMap[name] = false;
		}
		else{
			elements[name] = null;
		}
	}
}

Callback.addCallback("tick", function(){
	var armor = [Player.getArmorSlot(0), Player.getArmorSlot(1), Player.getArmorSlot(2), Player.getArmorSlot(3)];
	activeButtons = [];
	for(var i in armor){
		var buttons = UIbuttons.getButtons(armor[i].id);
		for(var i in buttons){
			var button = buttons[i];
			if(button.type == 0){
				buttonMap[button.name] = true;
				UIbuttons.isEnabled = true;
			}
		}
	}
	var item = Player.getCarriedItem();
	var buttons = UIbuttons.getButtons(item.id);
	for(var i in buttons){
		var button = buttons[i];
		if(button.type == 1){
			buttonMap[button.name] = true;
			UIbuttons.isEnabled = true;
		}
	}
	if(UIbuttons.isEnabled && (currentUIscreen == "hud_screen" || currentUIscreen == "in_game_play_screen")){
		updateUIbuttons();
		if(!UIbuttons.container){
			UIbuttons.container = new UI.Container();
			UIbuttons.container.openAs(UIbuttons.Window);
		}
		if(UIbuttons.container.isElementTouched("button_fly")){
			var armor = armor[1];
			var extra = armor.extra;
			if(extra){
				var hover = extra.getBoolean("hover");
			}
			var y = Player.getPosition().y
			var maxDmg = Item.getMaxDamage(armor.id)
			if(armor.data < maxDmg && y < 256){
				var vel = Player.getVelocity();
				var vy = Math.min(32, 264-y) / 160;
				if(hover){
					if(World.getThreadTime() % 5 == 0){
						Player.setArmorSlot(1, armor.id, 1, Math.min(armor.data+20, maxDmg), extra);
					}
					if(vel.y < 0.2){
						Player.addVelocity(0, Math.min(vy, 0.2-vel.y), 0);
					}
				}
				else{
					if(World.getThreadTime() % 5 == 0){
						Player.setArmorSlot(1, armor.id, 1, Math.min(armor.data+35, maxDmg), extra);
					}
					if(vel.y < 0.67){
						Player.addVelocity(0, Math.min(vy, 0.67-vel.y), 0);
					}
				}
			}
		}
	}
	else{
		if(UIbuttons.container){
			UIbuttons.container.close();
			UIbuttons.container = null;
		}
	}
	UIbuttons.isEnabled = false;
});





// file: machine/generator/low.js

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




// file: machine/generator/medium.js

IDRegistry.genBlockID("mvsa");
Block.createBlock("mvsa", [
	{name: "Medium Voltage Solar Array", texture: [["medium_voltage_bottom", 0], ["medium_voltage_top", 0], ["medium_voltage_sides", 0], ["medium_voltage_sides", 0], ["medium_voltage_sides", 0], ["medium_voltage_sides", 0]], inCreative: true}
], "opaque");

Translation.addTranslation("Medium Voltage Solar Array", {ru: "Солнечная панель среднего напряжения"});

Block.registerDropFunction("mvsa", function(coords, blockID, blockData, level){
	return MachineRegistry.getMachineDrop(coords, blockID, level, BlockID.machineBlockBasic);
});

Callback.addCallback("PreLoaded", function(){
	Recipes.addShaped({id: BlockID.mvsa, count: 1, data: 0}, [
		"xxx",
		"xax",
		"xxx"
	], ['x', BlockID.lvsa, 0, 'a', BlockID.transformerMV, 0]);
});


var guiSolarPanel2 = null;
Callback.addCallback("LevelLoaded", function(){
	guiSolarPanel2 = new UI.StandartWindow({
		standart: {
			header: {text: {text: Translation.translate("Medium Voltage Solar Array")}},
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
			"slotEnergy": {type: "slot", x: 600, y: 130, isValid: function(id){return ChargeItemRegistry.isValidItem(id, "Eu", 64);}},
			"sun": {type: "image", x: 608, y: 194, bitmap: "sun_off", scale: GUI_SCALE}
		}
	});
});

MachineRegistry.registerGenerator(BlockID.mvsa, {
	getGuiScreen: function(){
		return guiSolarPanel2;
	},
	
	tick: function(){
		var content = this.container.getGuiContent();
		if(World.getBlockID(this.x, this.y + 1, this.z) != BlockID.luminator && World.getLightLevel(this.x, this.y + 1, this.z) == 15){
			this.data.energy = 1;
			this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slotEnergy"), "Eu", 64, 32, 1);
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
			src.addAll(64);
			this.data.energy = 0;
		}
	}
});




// file: machine/generator/high.js

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




// file: items/armor/helmet.js

Translation.addTranslation("low Voltage Solar Hat", {ru: "ЛВСП-шлем"});
Translation.addTranslation("Medium Voltage Solar Hat", {ru: "МВСП-шлем"});
Translation.addTranslation("High Voltage Solar Hat", {ru: "ХВСП-шлем"});
IDRegistry.genItemID("lhat"); IDRegistry.genItemID("mhat"); IDRegistry.genItemID("hhat");
Item.createArmorItem("lhat", "low Voltage Solar Hat", {name: "solar_hat_low_voltage"}, {type: "helmet", armor: 0, durability: 0, texture: "armor/lv_hat.png", isTech: false});
Item.createArmorItem("mhat", "Medium Voltage Solar Hat", {name: "solar_hat_medium_voltage"}, {type: "helmet", armor: 0, durability: 0, texture: "armor/mv_hat.png", isTech: false});
Item.createArmorItem("hhat", "High Voltage Solar Hat", {name: "solar_hat_high_voltage"}, {type: "helmet", armor: 0, durability: 0, texture: "armor/hv_hat.png", isTech: false});
ChargeItemRegistry.registerItem(ItemID.lhat, "Eu",  -1, 3, true);
ChargeItemRegistry.registerItem(ItemID.mhat, "Eu",  -1, 3, true);
ChargeItemRegistry.registerItem(ItemID.hhat, "Eu",  -1, 3, true);
Callback.addCallback("PreLoaded", function(){Recipes.addShaped({id: ItemID.lhat, count: 1, data: 0}, ["xa "], ['x', BlockID.lvsa, 0, 'a', 306, 0]);});
Callback.addCallback("PreLoaded", function(){Recipes.addShaped({id: ItemID.mhat, count: 1, data: 0}, ["xa "], ['x', BlockID.mvsa, 0, 'a', 306, 0]);});
Callback.addCallback("PreLoaded", function(){Recipes.addShaped({id: ItemID.hhat, count: 1, data: 0}, ["xa "], ['x', BlockID.hvsa, 0, 'a', 306, 0]);});

function registerSOLARHELMET(id, level, tranfer){
 Armor.registerFuncs(id, {
  hurt: function(){
   return false;
  },
  tick: function(slot, index, maxDamage){
   return SOLAR_NANO_HELMET(slot, maxDamage, level, tranfer);
  }
 });
}

 var SOLAR_NANO_HELMET = function(slot, maxDamage, level, transfer){
 if(World.getThreadTime()%20==0){
              var item = 
     Player.getArmorSlot(1);
     var energyAdd = ChargeItemRegistry.addEnergyTo(item, "Eu", item.data - 0, transfer*1, level);
     if(energyAdd > 0){
         slot.data += energyAdd;

Player.setArmorSlot(1, item.id, 1, item.data, item.extra);
         return true;
  }
    }
    return false;
}
registerSOLARHELMET("lhat", 1, 8);
registerSOLARHELMET("mhat", 1, 64);
registerSOLARHELMET("mhat", 2, 64);
registerSOLARHELMET("hhat", 1, 512);
registerSOLARHELMET("hhat", 2, 512);
registerSOLARHELMET("hhat", 3, 512);




// file: core/shared.js

ModAPI.registerAPI("ICore", {
	Machine: MachineRegistry,
	Recipe: MachineRecipeRegistry,
	ChargeRegistry: ChargeItemRegistry,
	requireGlobal: function(command){
		return eval(command);
	}
});

Logger.Log("Industrial Core API shared with name ICore.", "API");




