
// included from: \header.js
IMPORT("StorageInterface");
IMPORT("EnhancedRecipes");


const MaxStack = __config__.getNumber("MaxStack") | 0;
const SpeedModifier = {
	roost: __config__.getNumber("SpeedModifier.roost"),
	breeder: __config__.getNumber("SpeedModifier.breeder")
};


const Chicken = function(key, name, product, biomeType){
	this.key = "chicken_" + key;
	this.name = name;
	this.skin = "model/roost_chicken/" + key + ".png";
	this.product = {id: product.id, data: product.data || 0};
	this.biomeType = biomeType;
};

Chicken.prototype = {

	getKey: function(){
		return this.key;
	},
	getName: function(){
		return this.name;
	},
	getSkin: function(){
		return this.skin;
	},
	getProduct: function(){
		return this.product;
	},

	isValidBiome: function(biome){
		let biomeType = 0;
		switch(biome){
			case 8:
				biomeType = 3;
				break;
			case 3:
			case 10:
			case 11:
			case 12:
			case 13:
			case 20:
			case 26:
			case 30:
			case 31:
			case 34:
			case 131:
			case 140:
			case 158:
			case 162:
				biomeType = 2;
				break;
			default:
				biomeType = 1;
				break;
		}
		return this.biomeType == biomeType;
	},

	setParents: function(parent1, parent2){
		this.parent1 = parent1;
		this.parent2 = parent2;
	},
	isChildOf: function(parent1, parent2){
		return this.parent1 == parent1 && this.parent2 == parent2 || this.parent1 == parent2 && this.parent2 == parent1;
	},

	getTier: function(){
		if(this.tier){
			return this.tier;
		}
		this.tier = this.parent1 ? Math.max(this.parent1.getTier(), this.parent2.getTier()) + 1 : 1;
		return this.tier;
	},

	getMinLayTime: function(){
		return Math.max(this.getTier() * 6000, 1) | 0;
	},
	getMaxLayTime: function(){
		return this.getMinLayTime() * 2;
	},
	getLayTime: function(){
		const min = this.getMinLayTime();
		const max = this.getMaxLayTime();
		return min + (Math.random() * (max - min) | 0);
	},

	getRandomChild: function(){
		if(!this.parent1){
			return this.getKey();
		}
		const array = [this, this.parent1, this.parent2];
		const maxChance = Math.max.apply(null, array.map(function(data){
			return data.getTier();
		})) + 1;
		let i = 0;
		let maxDiceValue = 0;
		for(i = 3; i--;){
			maxDiceValue += maxChance - array[i].getTier();
		}
		const diceValue = Math.random() * maxDiceValue;
		let currentValue = 0;
		for(i = 0; i < 3; i++){
			currentValue += maxChance - array[i].getTier();
			if(diceValue < currentValue){
				return array[i].getKey();
			}
		}
		return null;
	}

};


const ChickenRegistry = {

	data: {},
	recipe: {},

	biomeType: {
		NONE: 0,
		NORMAL: 1,
		SNOW: 2,
		HELL: 3
	},

	registerChicken: function(key, name, product, spawnType, isVanilla){
		name = name || key.charAt().toUpperCase() + key.slice(1);
		name += " Chicken";
		const biomeType = this.biomeType[spawnType];
		const chickenData = new Chicken(key, name, product, biomeType);
		key = chickenData.getKey();
		const id = IDRegistry.genItemID(key);
        Item.createItem(key, name, {name: key}, {stack: MaxStack});
        Item.addCreativeGroup("roost_chicken", "Chickens", [id]);
		this.data[id] = chickenData;
		Recipes.addFurnace(id, 366);
		if(isVanilla){
			Item.registerUseFunctionForID(id, function(c){
				c = c.relative;
				const ent = Entity.spawn(c.x + 0.5, c.y, c.z + 0.5, 10);
				Entity.setAge(ent, 0);
				Player.decreaseCarriedItem();
			});
			return;
		}

		const entity = MobRegistry.registerEntity(key);
		const model = new EntityModel();
		model.setRender(new Render(5));
		model.setTexture(new Texture(chickenData.getSkin()));
		entity.customizeVisual({ 
			getModels: function(){
				return {
					main: model
				};
			}
		});
		entity.setBaseType(10);
		Item.registerUseFunctionForID(id, function(c){
			c = c.relative;
			const custom = Entity.spawnCustom(key, c.x + 0.5, c.y, c.z + 0.5);
			Entity.setAge(custom.entity, 0);
			Player.decreaseCarriedItem();
		});
		if(biomeType){
			MobSpawnRegistry.registerSpawn(key, 0.05, function(x, z){
//				const data = ChickenRegistry.getData(ItemID[key]);
				return chickenData.isValidBiome(World.getBiome(x, z)) ? 3 : 0;
			});
		}

	},

	isChicken: function(id){
		return id in this.data;
	},

	getData: function(id){
		return this.data[id];
	},

	createKey: function(parent1, parent2){
		parent1 < parent2 ? parent1 <<= 12 : parent2 <<= 12;
		return parent1 | parent2;
	},

	parentsData: {},
	setParents: function(child, parent1, parent2){
		this.parentsData[child] = [parent1, parent2];
	},
	loadParentsData: function(){
		let child = parent1 = parent2 = 0;
		let chickenData, parentData1, parentData2;
		for(let key in this.parentsData){
			child = ItemID["chicken_" + key];
			parent1 = ItemID["chicken_" + this.parentsData[key][0]];
			parent2 = ItemID["chicken_" + this.parentsData[key][1]];
			chickenData = this.getData(child);
			parentData1 = this.getData(parent1);
			parentData2 = this.getData(parent2);
			chickenData.setParents(parentData1, parentData2);
			this.recipe[this.createKey(parent1, parent2)] = child;
		}
	},

	getChildForID: function(parent1, parent2){
		if(parent1 == parent2){
			return parent1;
		}
		return this.recipe[this.createKey(parent1, parent2)] || 0;
	},

	getChild: function(parent1, parent2){
		if(parent1 == parent2){
			return parent1;
		}
		for(let id in this.data){
			if(this.data[id].isChildOf(parent1, parent2)){
				return this.data[id].getKey();
			}
		}
		return null;
	}

};


Callback.addCallback("PostLoaded", function(){
	ChickenRegistry.loadParentsData();
});


Callback.addCallback("EntityAdded", function(ent){
	if(Entity.getType(ent) != 10 || Entity.getAge(ent) != -24000){
		return;
	}
	const array = Entity.getAllInRange(Entity.getPosition(ent), 1, 10);
	const index = array.indexOf(ent);
	index != -1 && array.splice(index, 1);
	if(array.length < 2){
		return;
	}
	array.sort(function(a, b){
		return Entity.getDistanceToEntity(a, ent) < Entity.getDistanceToEntity(b, ent) ? -1 : 1;
	});
	array.length = 2;
	const custom1 = Entity.getCustom(array[0]);
	const custom2 = Entity.getCustom(array[1]);
	if(!custom1 || !custom2){
		return;
	}
	const parent1 = ChickenRegistry.getData(ItemID[custom1.nameId]);
	const parent2 = ChickenRegistry.getData(ItemID[custom2.nameId]);
	const key = ChickenRegistry.getChild(parent1, parent2);
	if(!key){
		Game.prevent();
		return;
	}
	const key2 = ChickenRegistry.getData(ItemID[key]).getRandomChild();
	const type = MobRegistry.customEntities[key2];
	const custom = type.instantiate(ent);
	custom.callControllerEvent("created");
	custom.update();
});


const ValidFunc = {

	chicken: function(id){
		return ChickenRegistry.isChicken(id);
	},

	isSeed: {295: true, 361: true, 362: true, 458: true},
	seed: function(id){
		return this.isSeed[id] || false;
	},

	result: function(){
		return false;
	}

};


const BlackFont = {color: android.graphics.Color.BLACK, size: 40};


ModAPI.registerAPI("RoostAPI", {
	ChickenClass: Chicken,
	ChickenRegistry: ChickenRegistry
});


// included from: \item.js
IDRegistry.genItemID("chicken_catcher");
Item.createItem("chicken_catcher", "Chicken Catcher", {name: "chicken_catcher"}, {stack: 1});
Recipes2.addShaped(ItemID.chicken_catcher, "a:b:c", {a: 344, b: 280, c: 288});


Callback.addCallback("PlayerAttack", function(player, ent){
	if(Entity.getType(ent) == 10 && Player.getCarriedItem().id == ItemID.chicken_catcher){
		const pos = Entity.getPosition(ent);
		const age = Entity.getAge(ent);
		const particle = age < 0 ? 4 : 5;
		Game.prevent();
		for(let i = 20; i--;){
			Particles.addParticle(particle, pos.x + Math.random() * 0.6 - 0.3, pos.y + Math.random() * 0.6, pos.z + Math.random() * 0.6 - 0.3, Math.random() * 0.02, Math.random() * 0.2, Math.random() * 0.02);
		}
		if(age < 0){
			return;
		}
		const custom = Entity.getCustom(ent);
		if(custom && ItemID[custom.nameId]){
			World.drop(pos.x + 0.5, pos.y, pos.z + 0.5, ItemID[custom.nameId], 1);
			Entity.remove(ent);
			return;
		}
		World.drop(pos.x + 0.5, pos.y, pos.z + 0.5, ItemID.chicken_vanilla, 1);
		Entity.remove(ent);
	}
});


ChickenRegistry.registerChicken("vanilla", "", {id: 344}, "NONE", true);



/*
IDRegistry.genItemID("chicken_guide");
Item.createItem("chicken_guide", "Chicken Breeding Guide", {name: "chicken_guide"}, {stack: 1});
Recipes2.addShaped("ItemID.chicken_guide", "oao:aba:oao", {a: 344, b: 339});


const ScreenHeight = UI.getScreenHeight();


const setupGuide = function(keyword){
	const elements = GuideAdjacentWindow.getElements();
	let button, slot, text;
	let name = "";
	let i = x = y = 0;
	for(let id in ChickenRegistry.data){
		name = Item.getName(id).replace(" Chicken", "");
		if(keyword && !name.match(new RegExp(keyword, "i"))){
			continue;
		}
		button = elements.get("button" + i);
		slot = elements.get("slot" + i);
		text = elements.get("text" + i);
		x = (i & 1) * 500;
		y = (i >> 1) * 89;
		button.x = x;
		button.y = y;
		slot.x = x - 20;
		slot.y = y - 15;
		slot.source.id = id - 0;
		text.x = x + 80;
		text.y = y + 20;
		text.onBindingUpdated("text", name);
		if(++i >= 256){
			break;
		}
	}
	for(; i < 256; i++){
		button = elements.get("button" + i);
		slot = elements.get("slot" + i);
		text = elements.get("text" + i);
		button.x = slot.x = text.x = 2000;
		slot.source.id = 0;
	}
	const location = GuideAdjacentWindow.getLocation();
	location.scrollY = Math.max(y, ScreenHeight - 108);
};


const clickButton = function(key){
	return function(){
		let elements = typeof key == "number" ?
			GuideAdjacentWindow.getElements() :
			GuideWindow.getElements();
		let elem = elements.get("slot" + key);
		const id = elem.source.id;
		const chickenData = ChickenRegistry.getData(id);
		if(!chickenData){
			return;
		}
		elements = GuideWindow.getElements();
		elem = elements.get("textName");
		elem.onBindingUpdated("text", chickenData.getName());
		elem = elements.get("textInfo");
		elem.onBindingUpdated("text", "Tier " + chickenData.getTier() + ",  Spawn Type: " + ["None", "Normal", "Snow", "Hell"][chickenData.biomeType]);
		elem = elements.get("slotParent1");
		elem.source.id = chickenData.parent1 ? 	ItemID[chickenData.parent1.getKey()] : 0;
		elem = elements.get("slotParent2");
		elem.source.id = chickenData.parent2 ? ItemID[chickenData.parent2.getKey()] : 0;
		elem = elements.get("slotChild");
		elem.source.id = id;
		elem = elements.get("slotChicken");
		elem.source.id = id;
		elem = elements.get("slotProduct");
		elem.source.id = chickenData.product.id;
		elem.source.data = chickenData.product.data || 0;
	};
};


const GuideWindow = new UI.Window({
	location: {x: 0, y: 0, width: 1000, height: ScreenHeight},
	params: {slot: "_default_slot_empty"},
	drawing: [
		{type: "background", color: android.graphics.Color.TRANSPARENT},
		{type: "frame", x: 0, y: 0, width: 1000, height: ScreenHeight, bitmap: "classic_frame_bg_light", scale: 4},
		{type: "frame", x: 20, y: 80, width: 508, height: ScreenHeight - 100, bitmap: "classic_frame_tin_border", scale: 2},
		{type: "bitmap", x: 550, y: 100, bitmap: "image_breeding", scale: 5},
		{type: "bitmap", x: 550, y: 350, bitmap: "image_laying", scale: 5},
	],
	elements: {
		close: {
			type: "closeButton",
			x: 942, y: 0, scale: 3.2,
			bitmap: "close_button_up", bitmap2: "close_button_down"
		},
		textName: {
			type: "text",
			x: 550, y: 30,
			text: "",
			font: {color: android.graphics.Color.CYAN, shadow: 0.5, size: 30}
		},
		textInfo: {
			type: "text",
			x: 550, y: 70,
			text: "",
			font: {size: 15}
		},
		slotParent1: {
			type: "slot",
			x: 585, y: 155, size: 90,
			visual: true,
			source: {id: 0, count: 1},
			clicker: {onClick: clickButton("Parent1")}
		},
		slotParent2: {
			type: "slot",
			x: 800, y: 155, size: 90,
			visual: true,
			source: {id: 0, count: 1},
			clicker: {onClick: clickButton("Parent2")}
		},
		slotChild: {
			type: "slot",
			x: 700, y: 248, size: 90,
			visual: true,
			source: {id: 0, count: 1}
		},
		slotChicken: {
			type: "slot",
			x: 615, y: 385, size: 90,
			visual: true,
			source: {id: 0, count: 1}
		},
		slotProduct: {
			type: "slot",
			x: 835, y: 413, size: 90,
			visual: true,
			source: {id: 0, count: 1, data: 0}
		},
		buttonSearch: {
			type: "button",
			x: 30, y: 30, scale: 0.8,
			bitmap: "mod_browser_search_field",
			clicker: {onClick: function(){
				const ctx = UI.getContext();
				ctx.runOnUiThread(new java.lang.Runnable({
					run: function(){
						try{
							const dialog = new android.app.AlertDialog.Builder(ctx); 
							dialog.setTitle("Please type the keywords");
							const editText = new android.widget.EditText(ctx); 
							editText.setHint("in this space");
							const layout = new android.widget.LinearLayout(ctx); 
							layout.setOrientation(1);
							layout.addView(editText);
							dialog.setView(layout);
							dialog.setPositiveButton("Search", new android.content.DialogInterface.OnClickListener(){
								onClick: function(){
									const elements = GuideWindow.getElements();
									const text = elements.get("textSearch");
									const keyword = editText.getText() + "";
									text.onBindingUpdated("text", keyword);
									setupGuide(keyword);
								}
							});
							dialog.show();
						}
						catch(e){
							alert(e);
						}
					}
				}));
			}}
		},
		textSearch: {type: "text", x: 40, y: 40, z: 1, font: {color: android.graphics.Color.WHITE, size: 20}, text: ""}
	}
});


const GuideAdjacentElements = {};
(function(){
	let x = y = 0;
	for(let i = 0; i < 256; i++){
		x = (i & 1) * 500;
		y = (i >> 1) * 89;
		GuideAdjacentElements["button" + i] = {
			type: "button",
			x: x, y: y, scale: 1.78,
			bitmap: "mod_browser_button", bitmap2: "mod_browser_button_down",
			clicker: {onClick: clickButton(i)}
		};
		GuideAdjacentElements["slot" + i] = {
			type: "slot",
			x: x - 20, y: y - 15, z: 1, size: 120,
			bitmap: "_default_slot_empty",
			visual: true,
			source: {id: 0, count: 1}
		};
		GuideAdjacentElements["text" + i] = {
			type: "text",
			x: x + 80, y: y + 20, z: 1,
			text: "",
			font: {color: android.graphics.Color.WHITE, size: 40}
		};
	}
})();

const GuideAdjacentWindow = new UI.Window({
	location: {x: 24, y: 84, width: 500, padding: {bottom: 24}, scrollY: ScreenHeight - 108},
	params: {slot: "_default_slot_empty"},
	drawing: [
		{type: "background", color: android.graphics.Color.TRANSPARENT}
	],
	elements: GuideAdjacentElements
});

GuideWindow.setBlockingBackground(true);
GuideWindow.addAdjacentWindow(GuideAdjacentWindow);



Item.registerUseFunction("chicken_guide", function(coords, item, block){
	setupGuide();
	GuideWindow.open();
});
*/


// included from: \roost.js
IDRegistry.genBlockID("chicken_roost");
Block.createBlockWithRotation("chicken_roost", [
	{name: "Roost", texture: [["roost_plain", 0], ["roost_plain", 0], ["roost_inside", 0], ["roost_plain", 0], ["roost_plain", 0], ["roost_plain", 0]], inCreative: true}
]);

ToolAPI.registerBlockMaterial(BlockID.chicken_roost, "wood");
Recipes2.addShaped(BlockID.chicken_roost, "aaa:aoa:bbb", {a: 5, b: 170});


const ChickenRender = [null, null, null, null];
let RoostWindow;

(function(){

	let i = 0;

	const RoostModel = [
		BlockRenderer.createModel(),
		BlockRenderer.createModel(),
		BlockRenderer.createModel(),
		BlockRenderer.createModel()
	];

	const addBox = function(x1, x2, z1, z2, y1, y2, array){
		const tex = array.map(function(value){
			return ["roost_" + value, 0];
		});
		RoostModel[0].addBox(x1/16, y1/16, z1/16, x2/16, y2/16, z2/16, [tex[0], tex[1], tex[2], tex[3], tex[4], tex[5]]);
		RoostModel[1].addBox(x1/16, y1/16, (16-z2)/16, x2/16, y2/16, (16-z1)/16, [tex[0], tex[1], tex[3], tex[2], tex[4], tex[5]]);
		RoostModel[2].addBox(z1/16, y1/16, x1/16, z2/16, y2/16, x2/16, [tex[0], tex[1], tex[4], tex[5], tex[2], tex[3]]);
		RoostModel[3].addBox((16-z2)/16, y1/16, x1/16, (16-z1)/16, y2/16, x2/16, [tex[0], tex[1], tex[4], tex[5], tex[3], tex[2]]);
	};

	addBox(00,16,	00,16,	00,03,	["plain", "floor", "plain", "curtain", "plain", "plain"]);
	addBox(00,16,	00,16,	13,16,	["plain", "plain", "plain", "curtain", "plain", "plain"]);
	addBox(00,03,	00,16,	03,13,	["plain", "plain", "plain", "curtain", "plain", "inside"]);
	addBox(13,16,	00,16,	03,13,	["plain", "plain", "plain", "curtain", "inside", "plain"]);
	addBox(03,13,	00,03,	03,13,	["plain", "plain", "plain", "inside", "plain", "plain"]);

	const ChickenModel = [
		{//head
			type: "box",
			uv: {x: 0, y: 0},
			coords: {x: 0, y: -1, z: -4.5},
			size: {x: 4, y: 6, z: 3}
		},
		{//nose
			type: "box",
			uv: {x: 14, y: 0},
			coords: {x: 0, y: -1, z: -7},
			size: {x: 4, y: 2, z: 2}
		},
		{//jowl
			type: "box",
			uv: {x: 14, y: 4},
			coords: {x: 0, y: 1, z: -6},
			size: {x: 2, y: 2, z: 2}
		},
		{//body
			type: "box",
			uv: {x: 0, y: 9},
			coords: {x: 0, y: 3, z: 0},
			size: {x: 6, y: 6, z: 8}
		},
		{//wing1
			type: "box",
			uv: {x: 24, y: 13},
			coords: {x: -3.5, y: 2, z: 0},
			size: {x: 1, y: 4, z: 6}
		},
		{//wing2
			type: "box",
			uv: {x: 24, y: 13},
			coords: {x: 3.5, y: 2, z: 0},
			size: {x: 1, y: 4, z: 6}
		}
	];

	const Direction = [0, Math.PI, -Math.PI / 2, Math.PI / 2];
	let render;
	for(i = 4; i--;){
		render = new ICRender.Model();
		render.addEntry(RoostModel[i]);
		BlockRenderer.enableCoordMapping(BlockID.chicken_roost, i, render);
		render = new Render();
		render.getPart("body").addPart("sub");
		render.setPart("sub", ChickenModel, {rotation: {y: Direction[i]}, width: 64, height: 32});
		ChickenRender[i] = render.getID();
	}

	const elements = {
		close: {type: "closeButton", x: 928, y: 0, bitmap: "close_button_up", bitmap2: "close_button_down", scale: 4},
		progress: {type: "scale", x: 278, y: 116, bitmap: "roost.bar_roost_1", scale: 5.5},
		slotChicken: {type: "slot", x: 150, y: 110, size: 100, bitmap: "roost.slot", isValid: ValidFunc.chicken},
		slot0: {type: "slot", x: 450, y: 110, size: 100, isValid: ValidFunc.result},
		slot1: {type: "slot", x: 550, y: 110, size: 100, isValid: ValidFunc.result},
		slot2: {type: "slot", x: 650, y: 110, size: 100, isValid: ValidFunc.result},
		slot3: {type: "slot", x: 750, y: 110, size: 100, isValid: ValidFunc.result}
	};

	for(i = 9; i <= 44; i++){
		elements["invSlot" + i] = {
			type: "invSlot",
			x: 50 + (i % 9) * 100,
			y: 210 + (i / 9 | 0) * 100,
			size: 100,
			index: i
		};
	}

	RoostWindow = 	new UI.Window({
		location: {x: 200, y: 20, width: 600, height: 450},
		params: {slot: "classic_slot", inv_slot: "classic_slot"},
		drawing: [
			{type: "background", color: android.graphics.Color.TRANSPARENT},
			{type: "frame", x: 0, y: 0, width: 1000, height: 750, bitmap: "classic_frame_bg_light", scale: 6},
			{type: "text", x: 50, y: 60, text: "Roost", font: BlackFont},
			{type: "text", x: 50, y: 300, text: "Inventory", font: BlackFont},
			{type: "bitmap", x: 278, y: 116, bitmap: "roost.bar_roost_0", scale: 5.5}
		],
		elements: elements
	});

	RoostWindow.setInventoryNeeded(true);
	RoostWindow.setBlockingBackground(true);

})();



TileEntity.registerPrototype(BlockID.chicken_roost, {

	anim: null,
	defaultValues: {
		timeElapsed: 0,
		timeUntilNextDrop: 0
	},

	init: function(){
		this.anim = new Animation.Base(this.x + 0.5, this.y - 1, this.z + 0.5);
		this.anim.description.render = ChickenRender[World.getBlock(this.x, this.y, this.z).data];
		delete this.liquidStorage;
	},

	destroy: function(){
		this.anim.destroy();
		this.anim = null;
	},

	getGuiScreen: function(){
		return RoostWindow;
	},

	click: function(id, count, data){
		const chicken = this.container.getSlot("slotChicken");
		if(ChickenRegistry.isChicken(id) && (!chicken.id || chicken.id == id && chicken.count < 16)){
			const add = Math.min(16 - chicken.count, count);
			chicken.id = id;
			chicken.count += add;
			Player.decreaseCarriedItem(add);
			return true;
		}
	},

	tick: function(){

		StorageInterface.checkHoppers(this);
		this.container.setScale("progress", this.data.timeElapsed / this.data.timeUntilNextDrop || 0);

		const chicken = this.container.getSlot("slotChicken");
		const chickenData = ChickenRegistry.getData(chicken.id);
		if(!chickenData){
			this.anim && this.anim.destroy();
			this.data.timeElapsed = this.data.timeUntilNextDrop = 0;
			return;
		}

		const skin = chickenData.getSkin();
		if(this.anim.description.skin != skin){
			this.anim.description.skin = skin;
			this.anim.load();
		}

		this.data.timeUntilNextDrop = this.data.timeUntilNextDrop || chickenData.getLayTime() / SpeedModifier.roost | 0;

		if(this.data.timeUntilNextDrop){
			this.data.timeElapsed += chicken.count;
			if(this.data.timeElapsed >= this.data.timeUntilNextDrop){
				const result = chickenData.getProduct();
				const stack = Item.getMaxStack(result.id);
				let slot;
				for(let i = 0; i < 4; i++){
					slot = this.container.getSlot("slot" + i);
					if(!slot.id || slot.id == result.id && slot.data == result.data && slot.count < stack){
						slot.id = result.id;
						slot.data = result.data;
						slot.count++;
						this.data.timeElapsed = 0;
						this.data.timeUntilNextDrop = chickenData.getLayTime() / SpeedModifier.roost | 0;
						break;
					}
				}
			}
		}

	}

});


StorageInterface.createInterface(BlockID.chicken_roost, {
	slots: {
		slot0: {output: true},
		slot1: {output: true},
		slot2: {output: true},
		slot3: {output: true}
	},
	isValidInput: function(){
		return false;
	}
});


// included from: \breeder.js
IDRegistry.genBlockID("chicken_breeder");
Block.createBlock("chicken_breeder", [
	{name: "Chicken Breeder", texture: [["roost_plain", 0], ["roost_plain", 0], ["roost_curtain", 0]], inCreative: true}
]);

ToolAPI.registerBlockMaterial(BlockID.chicken_breeder, "wood");
Recipes2.addShaped(BlockID.chicken_breeder, "aaa:aba:ccc", {a: 5, b: 295, c: 170});


const BreederRender = [];
let BreederWindow;

(function(){

	const model = [];
	let i = 0;

	const box = function(x1, x2, z1, z2, y1, y2, tex, num){
		for(let j = tex.length; j--;){
			tex[j] = ["roost_" + tex[j], 0];
		}
		model[num].addBox(x1/16, y1/16, z1/16, x2/16, y2/16, z2/16, tex);
	};


	for(i = 3; i--;){
		model[i] = BlockRenderer.createModel();
		box(00,16,  00,16,  00,03,  ["plain", "floor", "plain"], i);
		box(00,16,  00,16,  13,16,  ["plain"], i);
		box(00,03,  00,03,  03,13,  ["curtain"], i);
		box(00,03,  13,16,  03,13,  ["curtain"], i);
		box(13,16,  00,03,  03,13,  ["curtain"], i);
		box(13,16,  13,16,  03,13,  ["curtain"], i);
	}

	box(03,13,  03,13,  03,13,  ["empty"], 1);
	box(03,13,  03,13,  03,13,  ["curtain"], 2);


	for(i = 3; i--;){
		BreederRender[i] = new ICRender.Model();
		BreederRender[i].addEntry(model[i]);
	}

	BlockRenderer.enableCoordMapping(BlockID.chicken_breeder, 0, BreederRender[0]);

	const elements = {
		close: {type: "closeButton", x: 928, y: 0, bitmap: "close_button_up", bitmap2: "close_button_down", scale: 4},
		progress: {type: "scale", x: 478, y: 120, bitmap: "roost.bar_breeder_1", scale: 5.5},
		slotSeed: {type: "slot", x: 50, y: 110, size: 100, bitmap: "classic_slot", isValid: ValidFunc.seed},
		slotParent1: {type: "slot", x: 250, y: 110, size: 100, bitmap: "roost.slot", isValid: ValidFunc.chicken},
		slotParent2: {type: "slot", x: 350, y: 110, size: 100, bitmap: "roost.slot", isValid: ValidFunc.chicken},
		slot0: {type: "slot", x: 650, y: 110, size: 100, isValid: ValidFunc.result},
		slot1: {type: "slot", x: 750, y: 110, size: 100, isValid: ValidFunc.result},
		slot2: {type: "slot", x: 850, y: 110, size: 100, isValid: ValidFunc.result},
	};

	for(let i = 9; i <= 44; i++){
		elements["invSlot" + i] = {
			type: "invSlot",
			x: 50 + (i % 9) * 100,
			y: 210 + (i / 9 | 0) * 100,
			size: 100,
			index: i
		};
	}

	BreederWindow = 	new UI.Window({
		location: {x: 200, y: 20, width: 600, height: 450},
		params: {slot: "classic_slot", inv_slot: "classic_slot"},
		drawing: [
			{type: "background", color: android.graphics.Color.TRANSPARENT},
			{type: "frame", x: 0, y: 0, width: 1000, height: 750, bitmap: "classic_frame_bg_light", scale: 6},
			{type: "text", x: 50, y: 60, text: "Chicken Breeder", font: BlackFont},
			{type: "text", x: 50, y: 300, text: "Inventory", font: BlackFont},
			{type: "bitmap", x: 172, y: 130, bitmap: "roost.plus", scale: 5.5},
			{type: "bitmap", x: 478, y: 120, bitmap: "roost.bar_breeder_0", scale: 5.5}
		],
		elements: elements
	});

	BreederWindow.setInventoryNeeded(true);
	BreederWindow.setBlockingBackground(true);

})();



TileEntity.registerPrototype(BlockID.chicken_breeder, {

	currentModel: 0,

	defaultValues: {
		timeElapsed: 0,
		timeUntilNextDrop: 0
	},

	getGuiScreen: function(){
		return BreederWindow;
	},

	init: function(){
		delete this.liquidStorage;
	},

	setModel: function(meta){
		if(this.currentModel != meta){
			this.currentModel = meta;
			meta ?
				BlockRenderer.mapAtCoords(this.x, this.y, this.z, BreederRender[meta]) :
				BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
		}
	},

	tick: function(){

		StorageInterface.checkHoppers(this);
		this.container.setScale("progress", this.data.timeElapsed / this.data.timeUntilNextDrop || 0);

		const parent1 = this.container.getSlot("slotParent1");
		const parent2 = this.container.getSlot("slotParent2");
		const child = ChickenRegistry.getChildForID(parent1.id, parent2.id);
		if(!child){
			this.data.timeElapsed = this.data.timeUntilNextDrop = 0;
			this.setModel(0);
			return;
		}

		const seed = this.container.getSlot("slotSeed");
		if(!ValidFunc.isSeed[seed.id] || seed.count < 2){
			this.data.timeElapsed = this.data.timeUntilNextDrop = 0;
			this.setModel(1);
			return;
		}

		const parentData1 = ChickenRegistry.getData(parent1.id);
		const parentData2 = ChickenRegistry.getData(parent2.id);
		this.data.timeUntilNextDrop = this.data.timeUntilNextDrop || Math.max(parentData1.getLayTime(), parentData2.getLayTime()) / SpeedModifier.breeder | 0;

		if(this.data.timeUntilNextDrop){
			this.setModel(2);
			this.data.timeElapsed += Math.min(parent1.count, parent2.count);
			if(this.data.timeElapsed >= this.data.timeUntilNextDrop){
				const result = ItemID[ChickenRegistry.getData(child).getRandomChild()];
				let slot;
				for(let i = 0; i < 3; i++){
					slot = this.container.getSlot("slot" + i);
					if(!slot.id || slot.id == result && slot.count < MaxStack){
						slot.id = result;
						slot.count++;
						seed.count -= 2;
						this.container.validateSlot("slotSeed");
						this.data.timeElapsed = 0;
						this.data.timeUntilNextDrop = Math.max(parentData1.getLayTime(), parentData2.getLayTime()) / SpeedModifier.breeder | 0;
						Particles.addParticle(17, this.x - 0.1, this.y + 0.5, this.z + 0.5, 0, 0.2, 0.2);
						Particles.addParticle(17, this.x + 0.5, this.y + 0.5, this.z - 0.1, 0.2, 0.2, 0);
						Particles.addParticle(17, this.x + 1.1, this.y + 0.5, this.z + 0.5, 0, 0.2, 0.2);
						Particles.addParticle(17, this.x + 0.5, this.y + 0.5, this.z + 1.1, 0.2, 0.2, 0);
						break;
					}
				}
			}
		}

	}

});


StorageInterface.createInterface(BlockID.chicken_breeder, {
	slots: {
		slotSeed: {input: true},
		slot0: {output: true},
		slot1: {output: true},
		slot2: {output: true}
	},
	isValidInput: function(item){
		return ValidFunc.isSeed[item.id] || false;
	}
});


// included from: \collector.js
IDRegistry.genBlockID("chicken_collector");
Block.createBlock("chicken_collector", [
	{name: "Chicken Collector", texture: [["roost_plain", 0], ["roost_plain", 0], ["roost_slat", 0]], inCreative: true}
]);

ToolAPI.registerBlockMaterial(BlockID.chicken_collector, "wood");
Recipes2.addShaped(BlockID.chicken_collector, "aba:aca:ada", {a: 5, b: ItemID.chicken_vanilla, c: 410, d: 54});


let CollectorWindow;

(function(){

	const elements = {
		close: {
			type: "closeButton",
			x: 928, y: 0,
			bitmap: "close_button_up", bitmap2: "close_button_down",
			scale: 4
		},
		button: {
			type: "button",
			x: 456, y: 391,
			bitmap: "classic_button_up", bitmap2: "classic_slot",
			scale: 5.3,
			clicker: {onClick: function(container, tileEntity){
				let i = j = stack = min = 0;
				let slot, inv;
				for(i = 27; i--;){
					slot = container.getSlot("slot" + i);
					if(!slot.id){
						continue;
					}
					stack = Item.getMaxStack(slot.id);
					for(j = 9; j <= 44; j++){
						inv = Player.getInventorySlot(j);
						if(!inv.id || inv.id == slot.id && inv.data == slot.data && inv.count < stack){
							min = Math.min(slot.count, stack - inv.count);
							slot.count -= min;
							Player.setInventorySlot(j, slot.id, inv.count + min, slot.data);
							if(!slot.count){
								slot.id = slot.data = 0;
								break;
							}
						}
					}
				}
			}}
		},
		overlay: {type: "image", x: 462, y: 400, z: 1, bitmap: "icon_mod_compile", scale: 4.5}
	};

	for(let i = 0; i < 27; i++){
		elements["slot" + i] = {
			type: "slot",
			x: 50 + (i % 9) * 100,
			y: 80 + (i / 9 | 0) * 100,
			size: 100
		};
	}

	CollectorWindow = 	new UI.Window({
		location: {x: 200, y: 20, width: 600, height: 300},
		params: {slot: "classic_slot"},
		drawing: [
			{type: "background", color: android.graphics.Color.TRANSPARENT},
			{type: "frame", x: 0, y: 0, width: 1000, height: 500, bitmap: "classic_frame_bg_light", scale: 6},
			{type: "text", x: 50, y: 60, text: "Chicken Collector", font: BlackFont}
		],
		elements: elements
	});

	CollectorWindow.setBlockingBackground(true);

})();



TileEntity.registerPrototype(BlockID.chicken_collector, {

	getGuiScreen: function(){
		return CollectorWindow;
	},

	tick: function(){

		StorageInterface.checkHoppers(this);

		if(World.getThreadTime() & 63){
			return;
		}
		const This = this;
		const list = TileEntity.tileEntityList.filter(function(That){
			return (That.blockID == BlockID.chicken_roost || That.blockID == BlockID.chicken_breeder) && That.dimension == This.dimension && Math.abs(This.x - That.x) <= 4 && Math.abs(This.z - That.z) <= 4 && Math.abs(This.y - That.y + 1) <= 1;
		});

		for(let i = list.length; i--;){
			if(StorageInterface.extractItemsFromContainer(this, list[i].container, 0, 0, true)){
				break;
			}
		}

	}

});


StorageInterface.createInterface(BlockID.chicken_collector, {
	slots: {
		slot0: {input: true, output: true},
		slot1: {input: true, output: true},
		slot2: {input: true, output: true},
		slot3: {input: true, output: true},
		slot4: {input: true, output: true},
		slot5: {input: true, output: true},
		slot6: {input: true, output: true},
		slot7: {input: true, output: true},
		slot8: {input: true, output: true},
		slot9: {input: true, output: true},
		slot10: {input: true, output: true},
		slot11: {input: true, output: true},
		slot12: {input: true, output: true},
		slot13: {input: true, output: true},
		slot14: {input: true, output: true},
		slot15: {input: true, output: true},
		slot16: {input: true, output: true},
		slot17: {input: true, output: true},
		slot18: {input: true, output: true},
		slot19: {input: true, output: true},
		slot20: {input: true, output: true},
		slot21: {input: true, output: true},
		slot22: {input: true, output: true},
		slot23: {input: true, output: true},
		slot24: {input: true, output: true},
		slot25: {input: true, output: true},
		slot26: {input: true, output: true}
	}
});


// included from: \recipe_viewer.js
ModAPI.addAPICallback("RecipeViewer", function(api){

	api.Core.registerRecipeType("roost_product", {
		contents: {
			icon: BlockID.chicken_roost,
			drawing: [
				{type: "bitmap", x: 440, y: 220, scale: 5, bitmap: "roost.bar_roost_1"}
			],
			elements: {
				input0: {type: "slot", x: 300, y: 200, size: 120},
				output0: {type: "slot", x:  600, y: 200, size: 120}
			}
		},
		getList: function(id, data, isUsage){
			const list = [];
			let product;
			if(isUsage){
				const chicken = ChickenRegistry.getData(id);
				if(chicken){
					product = chicken.getProduct();
					list.push({
						input: [{id: id, count: 1, data: 0}],
						output: [{id: product.id, count: 1, data: product.data || 0}]
					});
				}
				return list;
			}
			for(let key in ChickenRegistry.data){
				product = ChickenRegistry.data[key].getProduct();
				product.id == id && (!~data || (product.data || 0) == data) && list.push({
					input: [{id: key - 0, count: 1, data: 0}],
					output: [{id: product.id, count: 1, data: product.data || 0}]
			 	});
			}
			return list;
		}
	});

	api.Core.registerRecipeType("roost_mutation", {
		contents: {
			icon: BlockID.chicken_breeder,
			drawing: [
				{type: "bitmap", x: 210, y: 230, scale: 6, bitmap: "roost.plus"},
				{type: "bitmap", x: 600, y: 230, scale: 6, bitmap: "roost.bar_breeder_1"}
			],
			elements: {
				slotSeed: {type: "slot", x: 60, y: 200, size: 120, visual: true},
				input0: {type: "slot", x: 300, y: 200, size: 120},
				input1: {type: "slot", x: 420, y: 200, size: 120},
				output0: {type: "slot", x: 840, y: 200, size: 120}
			}
		},
		getList: function(id, data, isUsage){
			const list = [];
			let key = "";
			if(isUsage){
				let parent1 = parent2 = 0;
				for(key in ChickenRegistry.parentsData){
					parent1 = ItemID["chicken_" + ChickenRegistry.parentsData[key][0]];
					parent2 = ItemID["chicken_" + ChickenRegistry.parentsData[key][1]];
					(parent1 == id || parent2 == id || ValidFunc.isSeed[id]) && list.push({
						input: [
							{id: parent1, count: 1, data: 0},
							{id: parent2, count: 1, data: 0}
						],
						output: [{id: ItemID["chicken_" + key], count: 1, data: 0}]
					});
				}
				return list;
			}
			for(key in ChickenRegistry.parentsData){
				ItemID["chicken_" + key] == id && list.push({
					input: [
						{id: ItemID["chicken_" + ChickenRegistry.parentsData[key][0]], count: 1, data: 0},
						{id: ItemID["chicken_" + ChickenRegistry.parentsData[key][1]], count: 1, data: 0}
					],
					output: [{id: id, count: 1, data: 0}]
				});
			}
			return list;
		},
		onOpen: function(elements, data){
			const array = Object.keys(ValidFunc.isSeed);
			const seed = array[Math.random() * array.length | 0];
			const elem = elements.get("slotSeed");
			elem.onBindingUpdated("source", {id: seed - 0, count: 1, data: 0});
		}
	});

});

