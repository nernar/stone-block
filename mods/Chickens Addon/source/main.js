
// included from: \header.js
IMPORT("EnhancedRecipes");

const bitmap = new android.graphics.Bitmap.createBitmap(16, 16, android.graphics.Bitmap.Config.ARGB_8888);
const canvas = new android.graphics.Canvas(bitmap);
const paint = new android.graphics.Paint();


const Egg = {

	hideEgg: __config__.getBool("hide_egg"),
	baseMaterial: {
		copper: {enabled: false, parents: ["brown", "yellow"], color: ["#c06a48", "#ff9d76"]},
		tin: {enabled: false, parents: ["white", "clay"], color: ["#fff7ee", "#bbb1a7"]},
		lead: {enabled: false, parents: ["iron", "cyan"], color: ["#777777", "#383838"]},
		silver: {enabled: false, parents: ["iron", "white"], color: ["#bebebe", "#ffffff"]},
		aluminum: {enabled: false, parents: ["flint", "iron"], color: ["#d3dddc", "#cbd7d6"]},
		platinum: {enabled: false, parents: ["nickel", "silver"], color: ["#ffffff", "#8d9a96"]},
		nickel: {enabled: false, parents: ["white", "lime"], color: ["#efffec", "#a2b69f"]},//
		zinc: {enabled: false, parents: ["lightgray", "clay"], color: ["#b7b7b7", "#868686"]},//
		steel: {enabled: false, parents: ["coal", "iron"], color: ["#d3e1e3", "#8e9799"]},
		bronze: {enabled: false, parents: ["copper", "tin"], color: ["#9a6731", "#f6a44e"]},
		brass: {enabled: false, parents: ["copper", "zinc"], color: ["#a99340", "#ffe377"]},
		cupronickel: {enabled: false, parents: ["copper", "nickel"], color: ["#d8ccb4", "#98896c"]},
		invar: {enabled: false, parents: ["iron", "nickel"], color: ["#989585", "#d1ccb6"]},
		electrum: {enabled: false, parents: ["gold", "silver"], color: ["#fff2b1", "#d4be50"]},
		ruby: {enabled: false, parents: ["red", "snowball"], color: ["#B7002E", "#5A0116"]},//
		sapphire: {enabled: false, parents: ["blue", "snowball"], color: ["#19689A", "#0D4565"]},//
		amber: {enabled: false, parents: ["water", "log"], color: ["#FFAD21", "#7F5113"]},
		amethyst: {enabled: false, parents: ["ghast", "purple"], color: ["#E051ED", "#841D8E"]},
		malachite: {enabled: false, parents: ["green", "coal"], color: ["#29B17F", "#085F50"]},//
		peridot: {enabled: false, parents: ["quartz", "green"], color: ["#6CA127", "#29430B"]},//
		tanzanite: {enabled: false, parents: ["quartz", "purple"], color: ["#7310C0", "#5A007F"]},
		topaz: {enabled: false, parents: ["quartz", "orange"], color: ["#D64D00", "#7C3400"]},
		rubber: {enabled: false, parents: ["log", "orange"], color: ["#895D02", "#4E3209"]},
		silicon: {enabled: false, parents: ["clay", "sand"], color: ["#5f706b", "#424242"]},
		sulfur: {enabled: false, parents: ["gunpowder", "flint"], color: ["#FFE782", "#AD9326"]},
		saltpeter: {enabled: false, parents: ["sulfur", "redstone"], color: ["#DDD6D6", "#AC9E9D"]},
		salt: {enabled: false, parents: ["white", "sand"], color: ["#EAE8DA", "#DBD9CC"]},//
		uranium: {enabled: false, parents: ["redstone", "ender"], color: ["#91d76d", "#9ce26c"]}
	},

	enableMaterials: function(){
		for(let i = arguments.length; i--;){
			if(arguments[i] in this.baseMaterial){
				this.baseMaterial[arguments[i]].enabled = true;
			}
		}
	},

	bmp: {
		normal: FileTools.ReadImage(__dir__ + "egg/normal.png"),
		overlay: FileTools.ReadImage(__dir__ + "egg/overlay.png"),
		colored: FileTools.ReadImage(__dir__ + "egg/colored.png"),
		liquid: FileTools.ReadImage(__dir__ + "egg/liquid.png")
	},

	coloredDraw: function(image, color){
		paint.setColorFilter(new android.graphics.PorterDuffColorFilter(android.graphics.Color.parseColor(color), android.graphics.PorterDuff.Mode.MULTIPLY));
		canvas.drawBitmap(this.bmp[image], 0, 0, paint);
	},

	writeImage: function(path, bitmap){
		const file = new java.io.File(path);
		file.getParentFile().mkdirs();
		file.createNewFile();
		FileTools.WriteImage(path, bitmap);
	},

	createEgg: function(key, name, color1, color2){
		const id = "egg_" + key;
		const path = __dir__ + "resources/res/items-opaque/egg/" + id + ".png";
		if(!FileTools.isExists(path)){
			if(color2){
				this.coloredDraw("normal", color1);
				this.coloredDraw("overlay", color2);
			}
			else{
				this.coloredDraw("colored", color1);
			}
			this.writeImage(path, bitmap);
		}
		name = name || key.charAt().toUpperCase() + key.slice(1);
		IDRegistry.genItemID(id);
		Item.createThrowableItem(id, name + " Egg", {name: id}, {stack: 16});
		Item.registerThrowableFunction(id, function(projectile, item, target){
			if(Math.random() < 35 / 256){
				const custom = Entity.spawnCustom("chicken_" + key, target.x, target.y, target.z);
				//Entity.setAge(custom.entity, -24000);
			}
        });
        Item.addCreativeGroup("roost_egg", "Eggs", [ItemID[id]]);
	},

	createLiquidEgg: function(key, name, liquid, color, inNether){
		const id = "liquid_egg_" + key;
		const path = __dir__ + "resources/res/items-opaque/egg/" + id + ".png";
		if(!FileTools.isExists(path)){
			this.coloredDraw("liquid", color);
			this.writeImage(path, bitmap);
		}
		name = name || key.charAt().toUpperCase() + key.slice(1);
		IDRegistry.genItemID(id);
		Item.createItem(id, name + " Egg", {name: id}, {stack: 16});
		Item.registerUseFunction(id, function(c){
			if(!inNether && Player.getDimension() == 1){
				return;
			}
			c = c.relative;
			World.setBlock(c.x, c.y, c.z, liquid);
			Player.decreaseCarriedItem();
		});
	}

};


Egg.createLiquidEgg("water", "", 8, "#0000ff", false);
Egg.createLiquidEgg("lava", "", 10, "#ff0000", true);

IDRegistry.genItemID("solid_xp");
Item.createItem("solid_xp", "Solid Xp", {name: "solid_xp"});
Item.registerUseFunction("solid_xp", function(coords, item){
    const count = Entity.getSneaking(Player.get()) ? item.count : 1;
    Player.addExperience(25 * count);
    Player.decreaseCarriedItem(count);
});


const addChicken = function(key, name, product, obtain, color1, color2){
	ChickenRegistry.registerChicken(key, name, typeof product == "number" ? {id: product} : product, typeof obtain == "string" ? obtain : "NONE");
	obtain.length == 2 && ChickenRegistry.setParents(key, obtain[0], obtain[1]);
	if(Egg.hideEgg && color2){
		return;
	}
	Egg.createEgg(key, name, color1, color2);
};


//colored
addChicken("black", "Inc Black", {id: 351, data: 0}, "NONE", "#191919");
addChicken("red", "", {id: 351, data: 1}, "NONE", "#993333");
addChicken("green", "Cactus Green", {id: 351, data: 2}, "NONE", "#667f33");
addChicken("brown", "Cocoa Brown", {id: 351, data: 3}, ["red", "green"], "#664c33");
addChicken("blue", "Lapis Blue", {id: 351, data: 4}, "NONE", "#334cb2");
addChicken("purple", "", {id: 351, data: 5}, ["red", "blue"], "#7f3fb2");
addChicken("cyan", "", {id: 351, data: 6}, ["green", "blue"], "#4c7f99");
addChicken("lightgray", "", {id: 351, data: 7}, ["gray", "white"], "#999999");
addChicken("gray", "", {id: 351, data: 8}, ["black", "white"], "#4c4c4c");
addChicken("pink", "", {id: 351, data: 9}, ["red", "white"], "#f27fa5");
addChicken("lime", "", {id: 351, data: 10}, ["green", "white"], "#7fcc19");
addChicken("yellow", "", {id: 351, data: 11}, "NONE", "#e5e533");
addChicken("lightblue", "", {id: 351, data: 12}, ["blue", "white"], "#6699d8");
addChicken("magenta", "", {id: 351, data: 13}, ["purple", "pink"], "#b24cd8");
addChicken("orange", "", {id: 351, data: 14}, ["red", "yellow"], "#d87f33");
addChicken("white", "Bone White", {id: 351, data: 15}, "NONE", "#ffffff");
Recipes2.addShapeless(ItemID.egg_black, [344, {id: 351, data: 0}]);
Recipes2.addShapeless(ItemID.egg_red, [344, {id: 351, data: 1}]);
Recipes2.addShapeless(ItemID.egg_green, [344, {id: 351, data: 2}]);
Recipes2.addShapeless(ItemID.egg_brown, [344, {id: 351, data: 3}]);
Recipes2.addShapeless(ItemID.egg_blue, [344, {id: 351, data: 4}]);
Recipes2.addShapeless(ItemID.egg_purple, [344, {id: 351, data: 5}]);
Recipes2.addShapeless(ItemID.egg_cyan, [344, {id: 351, data: 6}]);
Recipes2.addShapeless(ItemID.egg_lightgray, [344, {id: 351, data: 7}]);
Recipes2.addShapeless(ItemID.egg_gray, [344, {id: 351, data: 8}]);
Recipes2.addShapeless(ItemID.egg_pink, [344, {id: 351, data: 9}]);
Recipes2.addShapeless(ItemID.egg_lime, [344, {id: 351, data: 10}]);
Recipes2.addShapeless(ItemID.egg_yellow, [344, {id: 351, data: 11}]);
Recipes2.addShapeless(ItemID.egg_lightblue, [344, {id: 351, data: 12}]);
Recipes2.addShapeless(ItemID.egg_magenta, [344, {id: 351, data: 13}]);
Recipes2.addShapeless(ItemID.egg_orange, [344, {id: 351, data: 14}]);
Recipes2.addShapeless(ItemID.egg_white, [344, {id: 351, data: 15}]);


//vanilla
addChicken("flint", "", 318, "NORMAL", "#6b6b47", "#a3a375");
addChicken("quartz", "", 406, "HELL", "#4d0000", "#1a0000");
addChicken("log", "", 17, "NORMAL", "#98846d", "#528358");
addChicken("sand", "", 12, "NORMAL", "#ece5b1", "#a7a06c");
addChicken("string", "", 287, ["black", "log"], "#331a00", "#800000");
addChicken("glowstone", "", 348, ["yellow", "quartz"], "#ffff66", "#ffff00");
addChicken("gunpowder", "", 289, ["flint", "sand"], "#999999", "#404040");
addChicken("redstone", "", 331, ["red", "sand"], "#e60000", "#800000");
addChicken("glass", "", 20, ["quartz", "redstone"], "#ffffff", "#eeeeff");
addChicken("iron", "", 265, ["white", "flint"], "#ffffcc", "#ffcccc");
addChicken("coal", "", 263, ["flint", "log"], "#262626", "#000000");
addChicken("gold", "", 371, ["yellow", "iron"], "#cccc00", "#ffff80");
addChicken("snowball", "", 332, ["blue", "log"], "#33bbff", "#0088cc");
addChicken("water", "", ItemID.liquid_egg_water, ["gunpowder", "snowball"], "#000099", "#8080ff");
addChicken("lava", "", ItemID.liquid_egg_lava, ["quartz", "coal"], "#cc3300", "#ffff00");
addChicken("clay", "", 337, ["sand", "snowball"], "#cccccc", "#bfbfbf");
addChicken("leather", "", 334, ["brown", "string"], "#A7A06C", "#919191");
addChicken("netherwart", "", 372, ["brown", "glowstone"], "#800000", "#331a00");
addChicken("diamond", "", 264, ["glass", "gold"], "#99ccff", "#e6f2ff");
addChicken("blaze", "", 369, ["gold", "lava"], "#ffff66", "#ff3300");
addChicken("slime", "", 341, ["green", "clay"], "#009933", "#99ffbb");
addChicken("ender", "", 368, ["netherwart", "diamond"], "#001a00", "#001a33");
addChicken("ghast", "", 370, ["white", "blaze"], "#ffffcc", "#ffffff");
addChicken("emerald", "", 388, ["green", "diamond"], "#00cc00", "#003300");
addChicken("magma", "", 378, ["blaze", "slime"], "#1a0500", "#000000");
addChicken("pshard", "Prismarine Shard", 409, ["blue", "water"], "#43806e", "#9fcbbc");
addChicken("pcrystal", "Prismarine Crystal", 422, ["water", "emerald"], "#4e6961", "#dfe9dc");
addChicken("obsidian", "", 49, ["water", "lava"], "#08080e", "#463a60");
addChicken("soulsand", "", 88, "HELL", "#453125", "#d52f08");
addChicken("xp", "", ItemID.solid_xp, ["green", "emerald"], "#3dff1e", "#3ff123");


Callback.addCallback("PostLoaded", function(){
	let data;
	let namedID = "";
	let id = 0;
	for(let key in Egg.baseMaterial){
		data = Egg.baseMaterial[key];
		namedID = __config__.getString("base_material." + key);
		id = ItemID[namedID] || BlockID[namedID] || 0;
		if(data.enabled && id){
			addChicken(key, "", id, data.parents, data.color[0], data.color[1]);
		}
	}
});



(function(){

	const ModList = {};
	const array = FileTools.GetListOfDirs(FileTools.moddir);
	let path = "";
	let json;
	for(let i = array.length; i--;){
		path = FileTools.moddir + array[i].toString() + "/mod.info";
		if(FileTools.isExists(path)){
			json = FileTools.ReadJSON(path);
			if(json.name){
				ModList[json.name] = true;
			}
		}
	}


	if(ModList["IndustrialCraft PE"]){
		Egg.enableMaterials("copper", "tin", "bronze", "lead", "silver", "steel", "rubber", "uranium");
	}

	if(ModList["Forestry"]){
		Egg.enableMaterials("copper", "tin", "bronze");
	}

	if(ModList["Botania"]){
		addChicken("manasteel", "", ItemID.manasteel, ["iron", "ghast"], "#69d7ff", "#002c4b");
		addChicken("terasteel", "", ItemID.terasteel, ["ender", "pcrystal"], "#3ff123", "#f5fcf1");
		//addChicken("elementium", "", 0000, ["manasteel", "terasteel"], "#f655f3", "#b407b7");
	}

	if(ModList["Draconic Evolution"]){
		addChicken("draconium", "", ItemID.draconiumIngot, ["gunpowder", "ender"], "#301549", "#1a0c27");
		addChicken("draconium_awakened", "Awakened Draconium", ItemID.awakedIngot, ["draconium", "ender"], "#cc440c", "#9c691a");
	}

	if(ModList["EnderIO"]){
		Egg.enableMaterials("silicon");
		addChicken("electrical_steel", "Electrical Steel", ItemID.electricalSteel, ["iron", "silicon"], "#939393", "#474747");
		addChicken("energetic_alloy", "Energetic Alloy", ItemID.energeticAlloy, ["gold", "glowstone"], "#ea6c05", "#65321b");
		addChicken("vibrant_alloy", "Vibrant Alloy", ItemID.vibrantAlloy, ["energetic", "ender"], "#bcf239", "#779c1d");
		addChicken("redstone_alloy", "Redstone Alloy", ItemID.redstoneAlloy, ["redstone", "silicon"], "#d03939", "#621919");
		addChicken("conductive_iron", "Conductive Iron", ItemID.conductiveIron, ["redstone", "iron"], "#CC9D96", "#7E6764");
		addChicken("pulsating_iron", "Pulsating Iron", ItemID.pulsatingIron, ["iron", "ender"], "#6FE78B", "#406448");
		addChicken("darksteel", "", ItemID.darkSteel, ["iron", "obsidian"], "#4D4D4E", "#242424");
		addChicken("soularium", "", ItemID.soulariumIngot, ["soulsand", "gold"], "#6F5C36", "#4E371A");
	}

	if(ModList["Immersive Engineering PE"]){
		Egg.enableMaterials("copper", "aluminum", "silver", "electrum", "uranium", "cupronickel");
	}

	if(ModList["Mekanism"]){
		Egg.enableMaterials("copper", "tin", "bronze", "steel");
		addChicken("osmium", "", ItemID.ingotosmium, ["iron", "quartz"], "#989585", "#d1ccb6");
	}

	if(ModList["Thermal Expansion"]){
		Egg.enableMaterials("copper", "tin", "silver", "aluminum", "lead", "nickel", "platinum", "steel", "electrum", "invar", "bronze", "cupronickel");
		addChicken("iridium", "", ItemID.ingotIridium, ["platinum", "flint"], "#EDEBF1", "#BBBCDD");
		addChicken("mithril", "", ItemID.ingotMithril, ["iridium", "gold"], "#5A89A8", "#A7FFFF");
		addChicken("signalum", "", ItemID.ingotSignalum, ["copper", "silver"], "#FFA424", "#C63200");
		addChicken("enderium", "", ItemID.ingotEnderium, ["platinum", "ender"], "#127575", "#0A4849");
	}

	if(ModList["Tinkers' Construct"]){
		Egg.enableMaterials("copper", "tin", "aluminum", "bronze");
		addChicken("ardite", "", ItemID.ingot_ardite, ["blaze", "magma"], "#dc3e00", "#ffb20b");
		addChicken("cobalt", "", ItemID.ingot_cobalt, ["netherwart", "ghast"], "#0c5abe", "#03d94f1");
		addChicken("manyullyn", "", ItemID.ingot_manyullyn, ["ardite", "cobalt"], "#652e87", "#bc8fe7");
	}

	if(ModList["EvilCraft"]){
		addChicken("darkgem", "Dark Gem", ItemID.darkGem, ["emerald", "coal"], "#1A1A1A", "#414141");
	}

	if(ModList["AlTech API"]){
		Egg.enableMaterials("sulfur", "rubber", "steel", "bronze", "electrum", "invar", "zinc", "aluminum", "copper", "tin", "nickel", "silver", "lead", "platinum", "ruby", "sapphire", "uranium");
		addChicken("titanium", "", ItemID.ingotTitanium, ["iron", "aluminum"], "#e2e2e2", "#5f5959");
		addChicken("chrome", "", ItemID.ingotChrome, ["tin", "titanium"], "#a0a1a3", "#454545");
		addChicken("tungsten", "", ItemID.ingotTungsten, ["ender", "steel"], "#c3bd89", "#dee6a6");
		addChicken("tungsteel", "Tungsten Steel", ItemID.IronTungstensteel, ["tungsten", "steel"], "#343536", "#696d71");
	}

})();

