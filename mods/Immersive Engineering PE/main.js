// libraries
IMPORT("flags");
IMPORT("ToolType");
IMPORT("energylib");
IMPORT("ChargeItem");
IMPORT("MachineRender");

// energy (RF)
var RF = EnergyTypeRegistry.assureEnergyType("RF", 1);

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

var RYDA = Block.createSpecialType({
 base: 15,
 solid: true,
 destroytime: 6,
 opaque: true
});
IDRegistry.genBlockID("oreAluminum");  

Block.createBlock("oreAluminum", [ {name: "Алюминий", texture: [["oreAluminum", 0]], inCreative: true} ]); 


Block.registerDropFunction("oreAluminum", function(coords, id, data, diggingLevel, toolLevel){ return [[4, 1, data]];
}); 


Callback.addCallback("GenerateChunkUnderground", function (chunkX, chunkZ) {
    for(var i=0;i<5;i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 10, 60);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreAluminum, 0, 6);
    }
}
)

var RYDA = Block.createSpecialType({
 base: 15,
 solid: true,
 destroytime: 6,
 opaque: true
});
IDRegistry.genBlockID("oreCopper");  

Block.createBlock("oreCopper", [ {name: "Медь", texture: [["oreCopper", 0]], inCreative: true} ]); 


Block.registerDropFunction("oreCopper", function(coords, id, data, diggingLevel, toolLevel){ return [[4, 1, data]];
}); 


Callback.addCallback("GenerateChunkUnderground", function (chunkX, chunkZ) {
    for(var i=0;i<5;i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 10, 60);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreCopper, 0, 6);
    }
}
)


var RYDA = Block.createSpecialType({
 base: 15,
 solid: true,
 destroytime: 8,
 opaque: true
});
IDRegistry.genBlockID("oreLead");  

Block.createBlock("oreLead", [ {name: "Свинец", texture: [["oreLead", 0]], inCreative: true} ]); 


Block.registerDropFunction("oreLead", function(coords, id, data, diggingLevel, toolLevel){ return [[4, 1, data]];
}); 


Callback.addCallback("GenerateChunkUnderground", function (chunkX, chunkZ) {
    for(var i=0;i<5;i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 10, 60);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreLead, 0, 6);
    }
}
)

var RYDA = Block.createSpecialType({
 base: 15,
 solid: true,
 destroytime: 6,
 opaque: true
});
IDRegistry.genBlockID("oreNickel");  

Block.createBlock("oreNickel", [ {name: "Никель", texture: [["oreNickel", 0]], inCreative: true} ]); 


Block.registerDropFunction("oreNickel", function(coords, id, data, diggingLevel, toolLevel){ return [[4, 1, data]];
}); 


Callback.addCallback("GenerateChunkUnderground", function (chunkX, chunkZ) {
    for(var i=0;i<5;i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 10, 60);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreNickel, 0, 6);
    }
}
)

var RYDA = Block.createSpecialType({
 base: 15,
 solid: true,
 destroytime: 6,
 opaque: true
});
IDRegistry.genBlockID("oreSilver");  

Block.createBlock("oreSilver", [ {name: "Серебро", texture: [["oreSilver", 0]], inCreative: true} ]); 


Block.registerDropFunction("oreSilver", function(coords, id, data, diggingLevel, toolLevel){ return [[BlockID.oreSilver, 1, data]];
}); 


Callback.addCallback("GenerateChunkUnderground", function (chunkX, chunkZ) {
    for(var i=0;i<5;i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 10, 60);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreSilver, 0, 6);
    }
}
)

IDRegistry.genBlockID("blastBrick");
Block.createBlock("blastBrick", [ {name: "Доменный кирпич", texture: [["blastBrick", 0]], inCreative: true} ]); 

IDRegistry.genBlockID("blastBrickReinforced");
Block.createBlock("blastBrickReinforced", [ {name: "Укрепленный доменный кирпич", texture: [["blastBrickReinforced", 0]], inCreative: true} ]);

IDRegistry.genBlockID("blastFurnace");
Block.createBlock("blastFurnace", [ {name: "Доменный", texture: [["blastFurnace", 0], ["blastFurnace", 0], ["blastFurnace", 0], ["blastFurnace", 0], ["blastFurnace", 0], ["blastFurnace", 0]], inCreative: false} ]); 

IDRegistry.genBlockID("blastFurnaceOff");
Block.createBlock("blastFurnaceOff", [ {name: "Укрепленн доменный кирпич", texture: [["blastFurnaceOff", 0], ["blastFurnaceOff", 0], ["blastFurnaceOff", 0], ["blastFurnaceOff", 0], ["blastFurnaceOff", 0], ["blastFurnaceOff ", 0]], inCreative: false} ]); 

IDRegistry.genBlockID("blastFurnaceOn");
Block.createBlock("blastFurnaceOn", [ {name: "Доменный", texture: [["blastFurnaceOn", 0], ["blastFurnaceOn", 0], ["blastFurnaceOn", 0], ["blastFurnaceOn", 0], ["blastFurnaceOn", 0], ["blastFurnaceOn", 0]], inCreative: false} ]); 



IDRegistry.genBlockID("cokeBrick");
Block.createBlock("cokeBrick", [ {name: "Прочный кирпич", texture: [["cokeBrick", 0]], inCreative: true}]); 
Recipes.addShaped({id: BlockID.cokeBrick, count: 1, data: 0}, [
	"aba",
	"bzb",
	"aba"
], ['a', 337, 0, 'b', 336, 0, 'z',43 ,0]);

IDRegistry.genBlockID("cokeOven1");
Block.createBlock("cokeOven1", [ {name: "Прочный кирпич", texture: [["cokeOven1", 0]], inCreative: false} ]); 

IDRegistry.genBlockID("cokeOven2");
Block.createBlock("cokeOven2", [ {name: "Прочный кирпич", texture: [["cokeOven2", 0], ["cokeOven2", 0], ["cokeOven2", 0], ["cokeOven2", 0], ["cokeOven2", 0], ["cokeOven2", 0]], inCreative: false} ]); 


IDRegistry.genBlockID("cokeOven3");
Block.createBlock("cokeOven3", [ {name: "Прочный кирпич", texture: [["cokeOven3", 0], ["cokeOven3", 0], ["cokeOven3", 0], ["cokeOven3", 0], ["cokeOven3", 0], ["cokeOven3", 0]], inCreative: false} ]); 

IDRegistry.genBlockID("cokeOven");
Block.createBlock("cokeOven", [ {name: "Прочный кирпич", texture: [["cokeOven", 0], ["cokeOven", 0], ["cokeOven", 0], ["cokeOven", 0], ["cokeOven", 0], ["cokeOven", 0]], inCreative: false} ]); 

IDRegistry.genBlockID("cokeOven0");
Block.createBlock("cokeOven0", [ {name: "Прочный кирпич", texture: [["cokeOven0", 0], ["cokeOven0", 0], ["cokeOven0", 0], ["cokeOven0", 0], ["cokeOven0", 0], ["cokeOven0", 0]], inCreative: false} ]); 


IDRegistry.genBlockID("cokeOven5");
Block.createBlock(" cokeOven5 ", [ {name: "Прочный кирпич", texture: [[" cokeOven5 ", 0], [" cokeOven5 ", 0], [" cokeOven5 ", 0], [" cokeOven5 ", 0], [" cokeOven5 ", 0], [" cokeOven5 ", 0]], inCreative: false} ]); 

IDRegistry.genBlockID(" cokeOvenon ");
Block.createBlock(" cokeOvenon ", [ {name: "Прочный кирпич", texture: [[" cokeOvenon ", 0], [" cokeOvenon ", 0], [" cokeOvenon ", 0], [" cokeOvenon ", 0], [" cokeOvenon ", 0], [" cokeOvenon ", 0]], inCreative: false} ]); 

IDRegistry.genBlockID(" cokeOven4on ");
Block.createBlock(" cokeOven4on ", [ {name: "Прочный кирпич", texture: [[" cokeOven4on ", 0], [" cokeOven4on ", 0], [" cokeOven4on ", 0], [" cokeOven4on ", 0], [" cokeOven4on ", 0], [" cokeOven4on ", 0]], inCreative: false} ]); 


IDRegistry.genBlockID(" cokeOvenoff ");
Block.createBlock(" cokeOvenoff ", [ {name: "Прочный кирпич", texture: [[" cokeOvenoff ", 0], [" cokeOvenoff ", 0], [" cokeOvenoff ", 0], [" cokeOvenoff ", 0], [" cokeOvenoff ", 0], [" cokeOvenoff ", 0]], inCreative: false} ]); 

IDRegistry.genBlockID(" cokeOven8 ");
Block.createBlock(" cokeOven8 ", [ {name: "Прочный кирпич", texture: [[" cokeOven8 ", 0], [" cokeOven8 ", 0], [" cokeOven8 ", 0], [" cokeOven8 ", 0], [" cokeOven8 ", 0], [" cokeOven8 ", 0]], inCreative: false} ]); 

IDRegistry.genBlockID(" cokeOven4off ");
Block.createBlock(" cokeOven4off ", [ {name: "Прочный кирпич", texture: [[" cokeOven4off ", 0], [" cokeOven4off ", 0], [" cokeOven4off ", 0], [" cokeOven4off ", 0], [" cokeOven4off ", 0], [" cokeOven4on ", 0]], inCreative: false} ]); 


IDRegistry.genBlockID(" cokeOven6 ");
Block.createBlock(" cokeOven6 ", [ {name: "Прочный кирпич", texture: [[" cokeOven6 ", 0], [" cokeOven6 ", 0], [" cokeOven6 ", 0], [" cokeOven6 ", 0], [" cokeOven6 ", 0], [" cokeOven6 ", 0]], inCreative: false} ]); 

IDRegistry.genBlockID(" cokeOven7 ");
Block.createBlock(" cokeOven7 ", [ {name: "Прочный кирпич", texture: [[" cokeOven7 ", 0], [" cokeOven7 ", 0], [" cokeOven7 ", 0], [" cokeOven7 ", 0], [" cokeOven7 ", 0], [" cokeOven7 ", 0]], inCreative: false} ]); 

IDRegistry.genBlockID("storageCopper");
Block.createBlock("storageCopper", [ {name: "Медный блок", texture: [["storageCopper", 0]], inCreative: true} ]); 

IDRegistry.genBlockID("storageSilver");
Block.createBlock("storageSilver", [ {name: "Серебряный блок", texture: [["storageSilver", 0]], inCreative: true} ]); 

IDRegistry.genBlockID("storageElectrum");
Block.createBlock("storageElectrum", [ {name: "Электруумный блок", texture: [["storageElectrum", 0]], inCreative: true} ]); 

IDRegistry.genBlockID("storageSteel");
Block.createBlock("storageSteel", [ {name: "Стальной блок", texture: [["storageSteel", 0]], inCreative: true} ]); 

IDRegistry.genBlockID("storageLead");
Block.createBlock("storageLead", [ {name: "Свинцовый блок", texture: [["storageLead", 0]], inCreative: true} ]); 


IDRegistry.genItemID("ingotCopper");
Item.createItem("ingotCopper", "Медный слиток", {name: "ingotCopper", meta: 0}, {stack: 64});

IDRegistry.genItemID("ingotAluminum");
Item.createItem("ingotAluminum", "Алюминовый слиток", {name: "ingotAluminum", meta: 0}, {stack: 64});

IDRegistry.genItemID("ingotConstanta");
Item.createItem("ingotConstanta", "Бронзовый слиток", {name: "ingotConstanta", meta: 0}, {stack: 64});

IDRegistry.genItemID("ingotElectrum");
Item.createItem("ingotElectrum", "Электруумый слиток", {name: "ingotElectrum", meta: 0}, {stack: 64});

IDRegistry.genItemID("ingotSilver");
Item.createItem("ingotSilver", "Серебряный слиток", {name: "ingotSilver", meta: 0}, {stack: 64});


IDRegistry.genItemID("blueprint");
Item.createItem("blueprint", "Чертеж", {name: "blueprint", meta: 0}, {stack: 64});

IDRegistry.genItemID("coilCopper");
Item.createItem("coilCopper", "Катушка низковольтного провода", {name: "coilCopper", meta: 0}, {stack: 64});

IDRegistry.genItemID("coilElectrum");
Item.createItem("coilElectrum", "Катушка средневольтного провода", {name: "coilElectrum", meta: 0}, {stack: 64});

IDRegistry.genItemID("coilHV");
Item.createItem("coilHV", "Катушка высоковольтного провода", {name: "coilHV", meta: 0}, {stack: 64});

IDRegistry.genItemID("nuggetAluminum");
Item.createItem("nuggetAluminum", "Алюминиевый самородок", {name: "nuggetAluminum", meta: 0}, {stack: 64});

IDRegistry.genItemID("nuggetCopper");
Item.createItem("nuggetCopper", "Медный самородок", {name: "nuggetCopper", meta: 0}, {stack: 64});

IDRegistry.genItemID("nuggetLead");
Item.createItem("nuggetLead", "Свинцовый самородок", {name: "nuggetLead", meta: 0}, {stack: 64});

IDRegistry.genItemID("nuggetSilver");
Item.createItem("nuggetSilver", "Серебряный  самородок", {name: "nuggetSilver", meta: 0}, {stack: 64});

IDRegistry.genItemID("nuggetElectrum");
Item.createItem("nuggetElectrum", "Электруумный самородок", {name: "nuggetElectrum", meta: 0}, {stack: 64});

IDRegistry.genItemID("coalCoke ");
Item.createItem("coalCoke ", "Коксовый уголь", {name: "coalCoke", meta: 0}, {stack: 64});

IDRegistry.genItemID("stickAluminum");
Item.createItem("stickAluminum", "Алюминиевая палка", {name: "stickAluminum", meta: 0}, {stack: 64});

IDRegistry.genItemID("stickSteel");
Item.createItem("stickSteel", "Стальная палка", {name: "stickSteel", meta: 0}, {stack: 64});

IDRegistry.genItemID("stickIron");
Item.createItem("stickIron", "Железная палка", {name: "stickIron", meta: 0}, {stack: 64});

IDRegistry.genItemID("jerrycan");
Item.createItem("jerrycan", "Канистра", {name: "jerrycan", meta: 0}, {stack: 64});

IDRegistry.genItemID("materialSlag");
Item.createItem("materialSlag", "Шлаг", {name: "materialSlag", meta: 0}, {stack: 64});

IDRegistry.genItemID("waterwheelSegment");
Item.createItem("waterwheelSegment", "Часть колеса мельницы", {name: "waterwheelSegment", meta: 0}, {stack: 64});

IDRegistry.genItemID("drillheadIron");
Item.createItem("drillheadIron", "Железная часть бура", {name: "drillheadIron", meta: 0}, {stack: 64});

IDRegistry.genItemID("drillheadSteel");
Item.createItem("drillheadSteel", "Стальная часть бура", {name: "drillheadSteel", meta: 0}, {stack: 64});

Recipes.addShaped({id: ItemID. waterwheelSegment , count: 4, data: 0}, [
        "oxo",
        "xyx",
        "yxy"
    ], ['x', 280, 0, 'y', 5, 1]);


IDRegistry.genItemID("plateCopper");
Item.createItem("plateCopper", "Медная пластина", {name: "plateCopper", meta: 0}, {stack: 64});

IDRegistry.genItemID("plateAluminum");
Item.createItem("plateAluminum", "Алюминиевая пластина", {name: "plateAluminum", meta: 0}, {stack: 64});

IDRegistry.genItemID("plateConstanta");
Item.createItem("plateConstanta", "Пластина бронзы", {name: "plateConstanta", meta: 0}, {stack: 64});

IDRegistry.genItemID("plateElectrum");
Item.createItem("plateElectrum", "Электруумная пластина", {name: "plateElectrum", meta: 0}, {stack: 64});

IDRegistry.genItemID("plateSilver");
Item.createItem("plateSilver", "Серебряная пластина", {name: "plateSilver", meta: 0}, {stack: 64});

IDRegistry.genItemID("plateIron");
Item.createItem("plateIron", "Железная пластина", {name: "plateIron", meta: 0}, {stack: 64});

IDRegistry.genItemID("plateNickel");
Item.createItem("plateNickel", "Никеливая пластина", {name: "plateNickel", meta: 0}, {stack: 64});

IDRegistry.genItemID("plateLead");
Item.createItem("plateLead", "Свинцовая", {name: "plateLead", meta: 0}, {stack: 64});

IDRegistry.genItemID("plateSteel");
Item.createItem("plateSteel", "Стальная пластина", {name: "plateSteel", meta: 0}, {stack: 64});


//Регестрируем и добавляем в креатив наши итемы
IDRegistry.genItemID("dustAluminum");
Item.createItem("dustAluminum", "Алюминиевая  пыль", {name: "dustAluminum", meta: 0}, {stack: 64});

IDRegistry.genItemID("dustCopper");
Item.createItem("dustCopper", "Медная  пыль", {name: "dustCopper", meta: 0}, {stack: 64});

IDRegistry.genItemID("dustGold");
Item.createItem(" dustGold ", "Золотая пыль", {name: "dustGold", meta: 0}, {stack: 64});

IDRegistry.genItemID("dustSilver");
Item.createItem("dustSilver", "Серебряная  пыль", {name: "dustSilver", meta: 0}, {stack: 64});

IDRegistry.genItemID("dustElectrum");
Item.createItem("dustElectrum", "Электруумная пыль", {name: "dustElectrum", meta: 0}, {stack: 64});

IDRegistry.genItemID("dustIron");
Item.createItem(" dustIron", "Железная пыль", {name: "dustIron", meta: 0}, {stack: 64});

IDRegistry.genItemID("dustCoke");
Item.createItem(" dustCoke", "Коксовая пыль", {name: "dustCoke", meta: 0}, {stack: 64});

IDRegistry.genItemID("dustLead");
Item.createItem(" dustLead", "Свинцовая пыль", {name: "dustLead", meta: 0}, {stack: 64});

IDRegistry.genItemID("dustNickel");
Item.createItem(" dustNickel", "Никелевая пыль", {name: "dustNickel", meta: 0}, {stack: 64});

IDRegistry.genItemID("dustQuartz");
Item.createItem(" dustQuartz", "Кварцевая пыль", {name: "dustQuartz", meta: 0}, {stack: 64});
