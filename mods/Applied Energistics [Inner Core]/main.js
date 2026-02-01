/*
BUILD INFO:
  dir: dev
  target: main.js
  files: 8
*/



// file: items/items.js

IDRegistry.genItemID("certusQuartz");
Item.createItem("certusQuartz", "Certuz Quartz", {name: "certusquartz", meta: 0}, {stack: 64});

IDRegistry.genItemID("fluixCrystal");
Item.createItem("fluixCrystal", "Fluix Crystal", {name: "fluixcrystal", meta: 0}, {stack: 64});

IDRegistry.genItemID("crank");
Item.createItem("crank", "Wooden Crank", {name: "crank", meta: 0}, {stack: 64});

IDRegistry.genItemID("certusCharged");
Item.createItem("certusCharged", "Charged Certus Quartz", {name: "certuscharged", meta: 0}, {stack: 64});









// file: items/tools.js

IMPORT("ToolType");

IDRegistry.genItemID("certussword");
IDRegistry.genItemID("certuspickaxe");
IDRegistry.genItemID("certusaxe");
IDRegistry.genItemID("certusshovel");
IDRegistry.genItemID("certusknife");
Item.createItem("certussword", "Меч из кварца Нижнего мира", {name: "certus_quartz_sword", meta: 0}, {stack: 1});
Item.createItem("certuspickaxe", "Кирка из кварца Нижнего мира", {name: "certus_quartz_pickaxe", meta: 0}, {stack: 1});
Item.createItem("certusaxe", "Топор из кварца Нижнего мира", {name: "certus_quartz_axe", meta: 0}, {stack: 1});
Item.createItem("certusshovel", "Лопата из кварца Нижнего мира", {name: "certus_quartz_shovel", meta: 0}, {stack: 1});
Item.createItem("certusknife", "Кварцевый нож", {name: "certus_quartz_cutting_knife", meta: 0}, {stack: 1});


ToolAPI.addToolMaterial("certusingot", {durability: 3400, level: 4, efficiency: 4, damage: 5, enchantability: 14});
ToolAPI.setTool(ItemID.certussword, "certusingot", ToolType.sword);
ToolAPI.setTool(ItemID.certuspickaxe, "certusingot", ToolType.pickaxe);
ToolAPI.setTool(ItemID.certusaxe, "certusingot", ToolType.axe);
ToolAPI.setTool(ItemID.certusshovel, "certusingot", ToolType.shovel);

Recipes.addShaped({id: ItemID.certussword, count: 1, data: 0}, [ " a ", " a ", " b "], ['a', ItemID.certusingot, 0, 'b', 280, 0]);
Recipes.addShaped({id: ItemID.certuspickaxe, count: 1, data: 0}, [ "aaa", " b ", " b "], ['a', ItemID.certusingot, 0, 'b', 280, 0]);
Recipes.addShaped({id: ItemID.certusaxe, count: 1, data: 0}, [ "aa ", "ab ", " b "], ['a', ItemID.certusingot, 0, 'b', 280, 0]);
Recipes.addShaped({id: ItemID.certusshovel, count: 1, data: 0}, [ " a ", " b ", " b "], ['a', ItemID.certusingot, 0, 'b', 280, 0]);




// file: items/memory.js

IDRegistry.genItemID("creativestoragecell");
Item.createItem("creativestoragecell","Диск хранения на бесконечность", {name: "creativestoragecell", meta: 0}, {stack: 64});

IDRegistry.genItemID("fluidstoragecell1k");
Item.createItem("fluidstoragecell1k","МЭ 1K жёсткий диск", {name: "fluidstoragecell1k", meta: 0}, {stack: 64});

IDRegistry.genItemID("fluidstoragecell4k");
Item.createItem("fluidstoragecell4k","МЭ 4K жёсткий диск", {name: "fluidstoragecell4k", meta: 0}, {stack: 64});

IDRegistry.genItemID("fluidstoragecell16k");
Item.createItem("fluidstoragecell16k","МЭ 16K жёсткий диск", {name: "fluidstoragecell16k", meta: 0}, {stack: 64});

IDRegistry.genItemID("fluidstoragecell64k");
Item.createItem("fluidstoragecell64k","МЭ 64K жёсткий диск", {name: "fluidstoragecell64k", meta: 0}, {stack: 64});




// file: items/processor.js

IDRegistry.genItemID("engineeringpoccesorprint");
Item.createItem("engineeringpoccesorprint", "Инженерный контур", {name: "material_engineering_processor_print", meta: 0}, {stack: 64});

IDRegistry.genItemID("engineeringpoccesor");
Item.createItem("engineeringpoccesor", "Инженерный процессор", {name: "material_engineering_processor", meta: 0}, {stack: 64});

IDRegistry.genItemID("logicpoccesorprint");
Item.createItem("logicpoccesorprint", "Логический контур", {name: "material_logic_processor_print", meta: 0}, {stack: 64});

IDRegistry.genItemID("logicpoccesor");
Item.createItem("logicpoccesor", "Логический процессор", {name: "material_logic_processor", meta: 0}, {stack: 64});





// file: items/growth.js

importLib("energylib", "*");

var AE = EnergyTypeRegistry.assureEnergyType("AE", 1);




// file: items/harvest.js

IDRegistry.genItemID("seedCertus");
Item.createItem("seddCertus", "Certus Quartz Seed", {name: "cristal_seed_certus", meta: 0}, {stack: 64});




// file: blocks/machine.js

IDRegistry.genBlockID("grindstone");
Block.createBlockWithRotation("grindstone", [{name: "Кварцевый дробитель", texture: [["grindstone_bottom", 0], ["grindstone", 0], ["grindstone_bottom", 0], ["grindstone_front", 0], ["grindstone_side", 0], ["grindstone_side", 0]], inCreative: true}]);

IDRegistry.genBlockID("medrive");
Block.createBlockWithRotation("medrive", [{name: "МЭ Дисковод", texture: [["drive_bottom", 0], ["drive_top", 0], ["drive_bottom", 0], ["drive_front", 0], ["drive_side", 0], ["drive_side", 0]], inCreative: true}]);

var guiMeDrive = new UI.StandartWindow({
	standart: {header: {text: {text: "Me Drive"}},
	background: {color: android.graphics.Color.parseColor("#b3b3b3")}, inventory: {standart: true}},
	drawing: [],
	elements: {
		"slot_0": {type: "slot", x: 573, y: 190, size: 60},
		"slot_1": {type: "slot", x: 572, y: 250, size: 60},
		"slot_2": {type: "slot", x: 573, y: 310, size: 60},
		"slot_3": {type: "slot", x: 510, y: 190, size: 60},
		"slot_4": {type: "slot", x: 510, y: 250, size: 60},
		"slot_5": {type: "slot", x: 510, y: 310, size: 60},
		"slot_6": {type: "slot", x: 572, y: 370, size: 60},
		"slot_7": {type: "slot", x: 510, y: 370, size: 60},
		"slot_8": {type: "slot", x: 510, y: 430, size: 60},
		"slot_9": {type: "slot", x: 572, y: 430, size: 60}
	}
});

TileEntity.registerPrototype(BlockID.medrive,
 {
     getGuiScreen: function(){
          return guiMeDrive;
     }
});

IDRegistry.genBlockID("meCable");
Block.createBlock("meCable", [{name: "Me Cable", texture: [["mecable", 0], ["mecable", 0], ["mecable", 0], ["mecable", 0], ["mecable", 0], ["mecable", 0]], inCreative: true}])


function setupWireRender(id, width, groupName, preventSelfAdd) {
    var render = new ICRender.Model();
    BlockRenderer.setStaticICRender(id, 0, render);
   
    var boxes = [
        {side: [1, 0, 0], box: [0.5 + width / 2, 0.5 - width / 2, 0.5 - width / 2, 1, 0.5 + width / 2, 0.5 + width / 2]},
        {side: [-1, 0, 0], box: [0, 0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2]},
        {side: [0, 1, 0], box: [0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2, 1, 0.5 + width / 2]},
        {side: [0, -1, 0], box: [0.5 - width / 2, 0, 0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2]},
        {side: [0, 0, 1], box: [0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, 1]},
        {side: [0, 0, -1], box: [0.5 - width / 2, 0.5 - width / 2, 0, 0.5 + width / 2, 0.5 + width / 2, 0.5 - width / 2]},
    ]
   
    var group = ICRender.getGroup(groupName);
    if (!preventSelfAdd) {
        group.add(id, -1);
    }
   
    for (var i in boxes) {
        var box = boxes[i];
       
        var model = BlockRenderer.createModel();
        model.addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5], id, 0);
       
        render.addEntry(model).asCondition(box.side[0], box.side[1], box.side[2], group, 0);
    }
   
    var model = BlockRenderer.createModel();
    model.addBox(0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, id, 0);
    render.addEntry(model);
    
    width = Math.max(width, 0.5);
    Block.setBlockShape(id, {x: 0.5 - width/2, y: 0.5 - width/2, z: 0.5 - width/2}, {x: 0.5 + width/2, y: 0.5 + width/2, z: 0.5 + width/2});
}

function setupBlockAsWire(id) {
	AE.registerWire(id);
}

setupBlockAsWire(BlockID.meCable);
setupWireRender(BlockID.meCable, 3/8, "ic-wire");




// file: blocks/ore.js

IDRegistry.genBlockID("certusore");
Block.createBlock("certusore", [{name: "Руда истинного кварца", texture: [["certus_ore", 0], ["certus_ore", 0], ["certus_ore", 0], ["certus_ore", 0], ["certus_ore", 0], ["certus_ore", 0]], inCreative: true}]);

ToolAPI.registerBlockMaterial(BlockID.certusore, "stone", 2, true);
Block.registerDropFunction("certusore", function(coords, blockID, blockData, level){
 if (level >= 2){
  return [[ItemID.certusingot, 2, 0]]
 }
 if(level >= 2 && Math.random() == 0.15){
  return [[ItemID.certusingotcharged, 1, 0]]
 }
 return [];
}, 1);

Callback.addCallback("GenerateChunkUnderground", function (chunkX, chunkZ) {
    for(var i=0;i<10;i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 1, 100);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.certusore, 0, 5);
    }
}
)




