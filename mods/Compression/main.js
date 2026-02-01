/*
NIDE BUILD INFO:
  dir: dev
  target: main.js
  files: 14
*/



// file: /api/compressAPI.js

let Creative = __config__.getBool("in_creative");

var Compress = { 
    
    addBlock: function(id,params,props){
        
        if(!params.textureData) params.textureData = 0;
        if(!props.destroyTime) props.destroyTime = 6;
        if(!props.level) props.level = 1;
        if(!props.material) props.material = "stone";
        IDRegistry.genBlockID(id);
        Block.createBlock(id,
        [{name:params.name,
        texture:[[params.texture,params.textureData]],
        inCreative:Creative}],"opaque");
        let ID = BlockID[id];
        ToolAPI.registerBlockMaterial(ID,props.material,props.level,true);
        Block.setDestroyTime(ID,props.destroyTime);
        Block.setDestroyLevel(ID,props.level);
    },
    
    addCraft: function(item,material){
        if(!material.data) material.data = 0;
        if(!material.count) material.count = 9;
        if(!item.count) item.count = 1;
        if(!item.data) item.data = 0;
        Recipes.addShaped({id:item.id,count:item.count,data:item.data},[
        "aaa",
        "aaa",
        "aaa"
        ],["a",material.id,material.data]);
        Recipes.addShapeless({id:material.id,count:material.count,data:material.data},[{id:item.id,data:item.data}]);
    },
    
    Local: {
        RU: function(str,RU){
        Translation.addTranslation(str,{ru:RU});
        }
    }
    
};



// file: /config.js

let increasing_time = __config__.access("blocks.increasing_time");

let cobblestone_time = __config__.access("blocks.time.cobblestone");
let stone_time = __config__.access("blocks.time.stone");
let cobblestone_mossy_time = __config__.access("blocks.time.cobblestone_mossy");
let dirt_time = __config__.access("blocks.time.dirt");
let sand_time = __config__.access("blocks.time.sand");
let gravel_time = __config__.access("blocks.time.gravel");
let endstone_time = __config__.access("blocks.time.end_stone");
let soulsand_time = __config__.access("blocks.time.soul_sand");
let charcoal_time = __config__.access("blocks.time.charcoal");
let coal_time = __config__.access("blocks.time.coal");
let netherrack_time = __config__.access("blocks.time.netherrack");
let wood_time = __config__.access("blocks.time.wood");
let feather_time = __config__.access("blocks.time.feather");
let string_time = __config__.access("blocks.time.string");
let meat_time = __config__.access("blocks.time.meat");
let bone_time = __config__.access("blocks.time.bone");
let egg_time = __config__.access("blocks.time.egg");
let leather_time = __config__.access("blocks.time.leather");
let bread_time = __config__.access("blocks.time.bread");
let cookie_time = __config__.access("blocks.time.cookie");
let potato_time = __config__.access("blocks.time.potato");
let carrot_time = __config__.access("blocks.time.carrot");
let netherwart_time = __config__.access("blocks.time.netherwart");
let melon_time = __config__.access("blocks.time.melon");
let apple_time = __config__.access("blocks.time.apple");
let rotten_flesh_time = __config__.access("blocks.time.rotten_flesh");
let blazerod_time = __config__.access("blocks.time.blaze_rod");
let spidereye_time = __config__.access("blocks.time.spider_eye");
let enderpearl_time = __config__.access("blocks.time.enderpearl");
let sugar_time = __config__.access("blocks.time.sugar");
let gunpowder_time = __config__.access("blocks.time.gunpowder");
let sugarcane_time = __config__.access("blocks.time.sugarcane");
let netherstar_time = __config__.access("blocks.time.netherstar");
let clay_time = __config__.access("blocks.time.clay");
let flint_time = __config__.access("blocks.time.flint");
let slime_time = __config__.access("blocks.time.slime");
let iron_block_time = __config__.access("blocks.time.iron_block");
let gold_block_time = __config__.access("blocks.time.gold_block");
let emerald_block_time = __config__.access("blocks.time.emerald_block");
let diamond_block_time = __config__.access("blocks.time.diamond_block");
let redstone_block_time = __config__.access("blocks.time.redstone_block");
let lazurite_block_time = __config__.access("blocks.time.lazurite_block");
let hay_time = __config__.access("blocks.time.hay");



// file: /localisation/ru_RU.js

//single, double, triple, quadruple,quintuple, sextuple, septuple, octuple, nonuple, decuple.

//SINGLE:
Compress.Local.RU("Single Compressed Cobblestone","Сжатый булыжник");
Compress.Local.RU("Single Compressed Stone","Сжатый камень");
Compress.Local.RU("Single Compressed Sand","Сжатый песок");
Compress.Local.RU("Single Compressed Dirt","Сжатая земля");
Compress.Local.RU("Single Compressed Gravel","Сжатый гравий");
Compress.Local.RU("Single Compressed Mossy Cobblestone","Сжатый замшелый булыжник");
Compress.Local.RU("Single Compressed End Stone","Сжатый камень Края");
Compress.Local.RU("Single Compressed Charcoal","Сжатый древесно-угольный блок");
Compress.Local.RU("Single Compressed Netherrack","Сжатый камень Нижнего мира");
Compress.Local.RU("Single Compressed Soul Sand","Сжатый песок душ");
Compress.Local.RU("Block of Log Oak","Блок из древесины дуба");
Compress.Local.RU("Block of Log Spruce","Блок из древесины сосны");
Compress.Local.RU("Block of Log Birch","Блок из древесины берёзы");
Compress.Local.RU("Block of Log Jungle","Блок из тропической древесина");
Compress.Local.RU("Block of Log Acacia","Блок из древесины акации");
Compress.Local.RU("Block of Log Dark Oak","Блок из древесины темного дуба");
Compress.Local.RU("Single Compressed Feathers","Сжатые перья");
Compress.Local.RU("Block of Strings","Блок из нитей");
Compress.Local.RU("Single Compressed Porkchop","Сжатая свинина");
Compress.Local.RU("Single Compressed Chicken","Сжатая курица");
Compress.Local.RU("Single Compressed Beef","Сжатая говядина");
Compress.Local.RU("Single Compressed Fish","Сжатая рыба");
Compress.Local.RU("Single Compressed Bones","Сжатые кости");
Compress.Local.RU("Single Compressed Eggs","Сжатые яйца");
Compress.Local.RU("Single Compressed Leather","Сжатая кожа");
Compress.Local.RU("Block of Bread","Блок из хлеба");
Compress.Local.RU("Block of Cookies","Блок из печеньев");
Compress.Local.RU("Single Compressed Potatoes","Сжатый картофель");
Compress.Local.RU("Single Compressed Carrots","Сжатая морковь");
Compress.Local.RU("Single Compressed Nether Wart","Сжатый адский нарост");
Compress.Local.RU("Single Compressed Melon","Сжатый арбуз");
Compress.Local.RU("Single Compressed Apples","Сжатое яблоко");
Compress.Local.RU("Single Compressed Rotten Flesh","Сжатая гнилая плоть");
Compress.Local.RU("Single Compressed Blaze","Сжатый огненный стержень");
Compress.Local.RU("Single Compressed Spider Eyes","Сжатые паучьи глаза");
Compress.Local.RU("Single Compressed Ender Pearl","Сжатый жемчуг Края");
Compress.Local.RU("Single Compressed Sugar","Сжатый сахар");
Compress.Local.RU("Single Compressed Gunpowder","Сжатый порох");
Compress.Local.RU("Single Compressed Sugar Cane","Сжатый сахарный тростник");
Compress.Local.RU("Block of Nether Star","Блок из звезды Нижнего мира");
Compress.Local.RU("Single Compressed Clay","Сжатая шерсть");
Compress.Local.RU("Single Compressed Flint","Сжатый кремень");

//DOUBLE:
Compress.Local.RU("Double Compressed Cobblestone","Двукратно сжатый булыжник");
Compress.Local.RU("Double Compressed Stone","Двукратно сжатый камень");
Compress.Local.RU("Double Compressed Sand","Двукратно сжатый песок");
Compress.Local.RU("Double Compressed Dirt","Двукратно сжатая земля");
Compress.Local.RU("Double Compressed Gravel","Двукратно сжатый гравий");
Compress.Local.RU("Double Compressed Mossy Cobblestone","Двукратно сжатый замшелый булыжник");
Compress.Local.RU("Double Compressed End Stone","Двукратно сжатый камень Края");
Compress.Local.RU("Double Compressed Charcoal","Двукратно сжатый древесно-угольный блок");
Compress.Local.RU("Double Compressed Coal","Двукратно сжатый угольный блок");
Compress.Local.RU("Double Compressed Netherrack","Двукратно сжатый камень Нижнего мира");
Compress.Local.RU("Double Compressed Soul Sand","Двукратно сжатый песок душ");
Compress.Local.RU("Double Compressed Feathers","Двукратно сжатые перья");
Compress.Local.RU("Double Compressed Porkchop","Двукратно сжатая свинина");
Compress.Local.RU("Double Compressed Chicken","Двукратно сжатая курица");
Compress.Local.RU("Double Compressed Beef","Двукратно сжатая говядина");
Compress.Local.RU("Double Compressed Fish","Двукратно сжатая рыба");
Compress.Local.RU("Double Compressed Bones","Двукратно сжатые кости");
Compress.Local.RU("Double Compressed Eggs","Двукратно сжатые яйца");
Compress.Local.RU("Double Compressed Leather","Двукратно сжатая кожа");
Compress.Local.RU("Double Compressed Potatoes","Двукратно сжатый картофель");
Compress.Local.RU("Double Compressed Carrots","Двукратно сжатая морковь");
Compress.Local.RU("Double Compressed Nether Wart","Двукратно сжатый адский нарост");
Compress.Local.RU("Double Compressed Melon","Двукратно сжатый арбуз");
Compress.Local.RU("Double Compressed Apples","Двукратно сжатое яблоко");
Compress.Local.RU("Double Compressed Rotten Flesh","Двукратно сжатая гнилая плоть");
Compress.Local.RU("Double Compressed Blaze","Двукратно сжатый огненный стержень");
Compress.Local.RU("Double Compressed Spider Eyes","Двукратно сжатые паучьи глаза");
Compress.Local.RU("Double Compressed Ender Pearl","Двукратно сжатый жемчуг Края");
Compress.Local.RU("Double Compressed Sugar","Двукратно сжатый сахар");
Compress.Local.RU("Double Compressed Gunpowder","Двукратно сжатый порох");
Compress.Local.RU("Double Compressed Sugar Cane","Двукратно сжатый сахарный тростник");
Compress.Local.RU("Double Compressed Iron Block","Двукратно сжатый железный блок");
Compress.Local.RU("Double Compressed Gold Block","Двукратно сжатый золотой блок");
Compress.Local.RU("Double Compressed Diamond Block","Двукратно сжатый алмазный блок");
Compress.Local.RU("Double Compressed Emerald Block","Двукратно сжатый изумрудный блок");
Compress.Local.RU("Double Compressed Lazurite Block","Двукратно сжатый лазуритовый блок");
Compress.Local.RU("Double Compressed Redstone Block","Двукратно сжатый блок из красного камня");
Compress.Local.RU("Double Compressed Hay","Двукратно сжатый сноп сена");
Compress.Local.RU("Double Compressed Clay","Двукратно сжатая шерсть");
Compress.Local.RU("Double Compressed Flint","Двукратно сжатый кремень");
Compress.Local.RU("Double Compressed Slime","Двукратно сжатый блок слизи");

//TRIPLE:
Compress.Local.RU("Triple Compressed Cobblestone","Трёхкратно сжатый булыжник");
Compress.Local.RU("Triple Compressed Stone","Трёхкратно сжатый камень");
Compress.Local.RU("Triple Compressed Sand","Трёхкратно сжатый песок");
Compress.Local.RU("Triple Compressed Dirt","Трёхкратно сжатая земля");
Compress.Local.RU("Triple Compressed Gravel","Трёхкратно сжатый гравий");
Compress.Local.RU("Triple Compressed Mossy Cobblestone","Трёхкратно сжатый замшелый булыжник");
Compress.Local.RU("Triple Compressed End Stone","Трёхкратно сжатый камень Края");
Compress.Local.RU("Triple Compressed Charcoal","Трёхкратно сжатый древесно-угольный блок");
Compress.Local.RU("Triple Compressed Coal","Трёхкратно сжатый угольный блок");
Compress.Local.RU("Triple Compressed Netherrack","Трёхкратно сжатый камень Нижнего мира");
Compress.Local.RU("Triple Compressed Soul Sand","Трёхкратно сжатый песок душ");
Compress.Local.RU("Triple Compressed Feathers","Трёхкратно сжатые перья");
Compress.Local.RU("Triple Compressed Porkchop","Трёхкратно сжатая свинина");
Compress.Local.RU("Triple Compressed Chicken","Трёхкратно сжатая курица");
Compress.Local.RU("Triple Compressed Beef","Трёхкратно сжатая говядина");
Compress.Local.RU("Triple Compressed Fish","Трёхкратно сжатая рыба");
Compress.Local.RU("Triple Compressed Bones","Трёхкратно сжатые кости");
Compress.Local.RU("Triple Compressed Eggs","Трёхкратно сжатые яйца");
Compress.Local.RU("Triple Compressed Leather","Трёхкратно сжатая кожа");
Compress.Local.RU("Triple Compressed Potatoes","Трёхкратно сжатый картофель");
Compress.Local.RU("Triple Compressed Carrots","Трёхкратно сжатая морковь");
Compress.Local.RU("Triple Compressed Nether Wart","Трёхкратно сжатый адский нарост");
Compress.Local.RU("Triple Compressed Apples","Трёхкратно сжатое яблоко");
Compress.Local.RU("Triple Compressed Rotten Flesh","Трёхкратно сжатая гнилая плоть");
Compress.Local.RU("Triple Compressed Blaze","Трёхкратно сжатый огненный стержень");
Compress.Local.RU("Triple Compressed Spider Eyes","Трёхкратно сжатые паучьи глаза");
Compress.Local.RU("Triple Compressed Ender Pearl","Трёхкратно сжатый жемчуг Края");
Compress.Local.RU("Triple Compressed Sugar","Трёхкратно сжатый сахар");
Compress.Local.RU("Triple Compressed Gunpowder","Трёхкратно сжатый порох");
Compress.Local.RU("Triple Compressed Sugar Cane","Трёхкратно сжатый сахарный тростник");
Compress.Local.RU("Triple Compressed Iron Block","Трёхкратно сжатый железный блок");
Compress.Local.RU("Triple Compressed Gold Block","Трёхкратно сжатый золотой блок");
Compress.Local.RU("Triple Compressed Diamond Block","Трёхкратно сжатый алмазный блок");
Compress.Local.RU("Triple Compressed Emerald Block","Трёхкратно сжатый изумрудный блок");
Compress.Local.RU("Triple Compressed Lazurite Block","Трёхкратно сжатый лазуритовый блок");
Compress.Local.RU("Triple Compressed Redstone Block","Трёхкратно сжатый блок из красного камня");
Compress.Local.RU("Triple Compressed Hay","Трёхкратно сжатый сноп сена");
Compress.Local.RU("Triple Compressed Clay","Трёхкратно сжатая шерсть");
Compress.Local.RU("Triple Compressed Flint","Трёхкратно сжатый кремень");
Compress.Local.RU("Triple Compressed Slime","Трёхкратно сжатый блок слизи");

//QUADRUPLE:
Compress.Local.RU("Quadruple Compressed Cobblestone","Четырёхкратно сжатый булыжник");
Compress.Local.RU("Quadruple Compressed Stone","Четырёхкратно сжатый камень");
Compress.Local.RU("Quadruple Compressed Sand","Четырёхкратно сжатый песок");
Compress.Local.RU("Quadruple Compressed Dirt","Четырёхкратно сжатая земля");
Compress.Local.RU("Quadruple Compressed Gravel","Четырёхкратно сжатый гравий");
Compress.Local.RU("Quadruple Compressed Mossy Cobblestone","Четырёхкратно сжатый замшелый булыжник");
Compress.Local.RU("Quadruple Compressed End Stone","Четырёхкратно сжатый камень Края");
Compress.Local.RU("Quadruple Compressed Netherrack","Четырёхкратно сжатый камень Нижнего мира");
Compress.Local.RU("Quadruple Compressed Soul Sand","Четырёхкратно сжатый песок душ");
Compress.Local.RU("Quadruple Compressed Eggs","Четырёхкратно сжатые яйца");
Compress.Local.RU("Quadruple Compressed Rotten Flesh","Четырёхкратно сжатая гнилая плоть");
Compress.Local.RU("Quadruple Compressed Sugar Cane","Четырёхкратно сжатый сахарный тростник");
Compress.Local.RU("Quadruple Compressed Clay","Четырёхкратно сжатая шерсть");

//QUINTUPLE:
Compress.Local.RU("Quintuple Compressed Cobblestone","Пятикратно сжатый булыжник");
Compress.Local.RU("Quintuple Compressed Stone","Пятикратно сжатый камень");
Compress.Local.RU("Quintuple Compressed Sand","Пятикратно сжатый песок");
Compress.Local.RU("Quintuple Compressed Dirt","Пятикратно сжатая земля");
Compress.Local.RU("Quintuple Compressed Gravel","Пятикратно сжатый гравий");
Compress.Local.RU("Quintuple Compressed Mossy Cobblestone","Пятикратно сжатый замшелый булыжник");
Compress.Local.RU("Quintuple Compressed End Stone","Пятикратно сжатый камень Края");
Compress.Local.RU("Quintuple Compressed Netherrack","Пятикратно сжатый камень Нижнего мира");
Compress.Local.RU("Quintuple Compressed Soul Sand","Пятикратно сжатый песок душ");
Compress.Local.RU("Quintuple Compressed Eggs","Пятикратно сжатые яйца");
Compress.Local.RU("Quintuple Compressed Rotten Flesh","Пятикратно сжатая гнилая плоть");
Compress.Local.RU("Quintuple Compressed Sugar Cane","Пятикратно сжатый сахарный тростник");
Compress.Local.RU("Quintuple Compressed Clay","Пятикратно сжатая шерсть");

//SEXTUPLE:
Compress.Local.RU("Sextuple Compressed Cobblestone","Шестикратно сжатый булыжник");
Compress.Local.RU("Sextuple Compressed Stone","Шестикратно сжатый камень");
Compress.Local.RU("Sextuple Compressed Sand","Шестикратно сжатый песок");
Compress.Local.RU("Sextuple Compressed Dirt","Шестикратно сжатая земля");
Compress.Local.RU("Sextuple Compressed Gravel","Шестикратно сжатый гравий");
Compress.Local.RU("Sextuple Compressed Mossy Cobblestone","Шестикратно сжатый замшелый булыжник");
Compress.Local.RU("Sextuple Compressed End Stone","Шестикратно сжатый камень Края");
Compress.Local.RU("Sextuple Compressed Netherrack","Шестикратно сжатый камень Нижнего мира");
Compress.Local.RU("Sextuple Compressed Soul Sand","Шестикратно сжатый песок душ");
Compress.Local.RU("Sextuple Compressed Clay","Шестикратно сжатая шерсть");

//SEPTUPLE:
Compress.Local.RU("Septuple Compressed Cobblestone","Семикратно сжатый булыжник");
Compress.Local.RU("Septuple Compressed Stone","Семикратно сжатый камень");
Compress.Local.RU("Septuple Compressed Sand","Семикратно сжатый песок");
Compress.Local.RU("Septuple Compressed Dirt","Семикратно сжатая земля");
Compress.Local.RU("Septuple Compressed Gravel","Семикратно сжатый гравий");
Compress.Local.RU("Septuple Compressed Mossy Cobblestone","Семикратно сжатый замшелый булыжник");
Compress.Local.RU("Septuple Compressed End Stone","Семикратно сжатый камень Края");
Compress.Local.RU("Septuple Compressed Netherrack","Семикратно сжатый камень Нижнего мира");
Compress.Local.RU("Septuple Compressed Soul Sand","Семикратно сжатый песок душ");
Compress.Local.RU("Septuple Compressed Clay","Семикратно сжатая шерсть");

//OCTUPLE:
Compress.Local.RU("Octuple Compressed Cobblestone","Восьмикратно сжатый булыжник");
Compress.Local.RU("Octuple Compressed Stone","Восьмикратно сжатый камень");
Compress.Local.RU("Octuple Compressed Sand","Восьмикратно сжатый песок");
Compress.Local.RU("Octuple Compressed Dirt","Восьмикратно сжатая земля");
Compress.Local.RU("Octuple Compressed Gravel","Восьмикратно сжатый гравий");
Compress.Local.RU("Octuple Compressed Mossy Cobblestone","Восьмикратно сжатый замшелый булыжник");
Compress.Local.RU("Octuple Compressed End Stone","Восьмикратно сжатый камень Края");
Compress.Local.RU("Octuple Compressed Netherrack","Восьмикратно сжатый камень Нижнего мира");
Compress.Local.RU("Octuple Compressed Soul Sand","Восьмикратно сжатый песок душ");
Compress.Local.RU("Octuple Compressed Clay","Восьмикратно сжатая шерсть");

//NONUPLE:
Compress.Local.RU("Nonuple Compressed Cobblestone","Девятикратно сжатый булыжник");
Compress.Local.RU("Nonuple Compressed Stone","Девятикратно сжатый камень");
Compress.Local.RU("Nonuple Compressed Sand","Девятикратно сжатый песок");
Compress.Local.RU("Nonuple Compressed Dirt","Девятикратно сжатая земля");
Compress.Local.RU("Nonuple Compressed Gravel","Девятикратно сжатый гравий");
Compress.Local.RU("Nonuple Compressed Mossy Cobblestone","Девятикратно сжатый замшелый булыжник");
Compress.Local.RU("Nonuple Compressed End Stone","Девятикратно сжатый камень Края");
Compress.Local.RU("Nonuple Compressed Netherrack","Девятикратно сжатый камень Нижнего мира");
Compress.Local.RU("Nonuple Compressed Soul Sand","Девятикратно сжатый песок душ");
Compress.Local.RU("Nonuple Compressed Clay","Девятикратно сжатая шерсть");

//DECUPLE:
Compress.Local.RU("Decuple Compressed Cobblestone","Десятикратно сжатый булыжник");
Compress.Local.RU("Decuple Compressed Stone","Десятикратно сжатый камень");
Compress.Local.RU("Decuple Compressed Sand","Десятикратно сжатый песок");
Compress.Local.RU("Decuple Compressed Dirt","Десятикратно сжатая земля");
Compress.Local.RU("Decuple Compressed Gravel","Десятикратно сжатый гравий");
Compress.Local.RU("Decuple Compressed Mossy Cobblestone","Десятикратно сжатый замшелый булыжник");
Compress.Local.RU("Decuple Compressed End Stone","Десятикратно сжатый камень Края");
Compress.Local.RU("Decuple Compressed Netherrack","Десятикратно сжатый камень Нижнего мира");
Compress.Local.RU("Decuple Compressed Soul Sand","Десятикратно сжатый песок душ");
Compress.Local.RU("Decuple Compressed Clay","Десятикратно сжатая шерсть");



// file: /data/blocks/single.js

///COBBLESTONE:
Compress.addBlock("single_compressed_cobblestone",
{
    name:"Single Compressed Cobblestone",
    texture:"cobblestone_compressed",
},
{ 
    destroyTime: cobblestone_time
});

Compress.addCraft(
{id:BlockID.single_compressed_cobblestone},
{id:4}
);


//STONE:
Compress.addBlock("single_compressed_stone",
{
    name:"Single Compressed Stone",
    texture:"stone_compressed",
},
{ 
    destroyTime: stone_time
});

Compress.addCraft(
{id:BlockID.single_compressed_stone},
{id:1}
);


//SAND:
Compress.addBlock("single_compressed_blocksand",
{
    name:"Single Compressed Sand",
    texture:"blocksand_compressed",
},
{
    destroyTime: sand_time
});

Compress.addCraft(
{id:BlockID.single_compressed_blocksand},
{id:12,data:0}
);


//DIRT:
Compress.addBlock("single_compressed_dirt",
{
    name:"Single Compressed Dirt",
    texture:"dirt_compressed",
},
{
    destroyTime: dirt_time
});

Compress.addCraft(
{id:BlockID.single_compressed_dirt},
{id:3}
);


//GRAVEL:
Compress.addBlock("single_compressed_gravel",
{
    name:"Single Compressed Gravel",
    texture:"gravel_compressed",
},
{ 
    destroyTime: gravel_time
});

Compress.addCraft(
{id:BlockID.single_compressed_gravel},
{id:13}
);


//COBBLESTONE MOSSY:
Compress.addBlock("single_compressed_cobblestone_mossy",
{
    name:"Single Compressed Mossy Cobblestone",
    texture:"cobblestonemossy_compressed",
},
{ 
    destroyTime: cobblestone_mossy_time
});

Compress.addCraft(
{id:BlockID.single_compressed_cobblestone_mossy},
{id:48}
);


//ENDSTONE:
Compress.addBlock("single_compressed_endstone",
{
    name:"Single Compressed End Stone",
    texture:"endstone_compressed",
},
{ 
    destroyTime: endstone_time
});

Compress.addCraft(
{id:BlockID.single_compressed_endstone},
{id:121}
);


//CHARCOAL:
Compress.addBlock("single_compressed_charcoal",
{
    name:"Single Compressed Charcoal",
    texture:"charcoal_compressed",
},
{ 
    destroyTime: charcoal_time
});

Compress.addCraft(
{id:BlockID.single_compressed_charcoal},
{id:263,data:1}
);


//NETHERRACK:
Compress.addBlock("single_compressed_netherrack",
{
    name:"Single Compressed Netherrack",
    texture:"netherrack_compressed",
},
{ 
    destroyTime: netherrack_time
});

Compress.addCraft(
{id:BlockID.single_compressed_netherrack},
{id:87}
);


//SOULSAND:
Compress.addBlock("single_compressed_soulsand",
{
    name:"Single Compressed Soul Sand",
    texture:"soulsand_compressed",
},
{
    destroyTime: soulsand_time
});

Compress.addCraft(
{id:BlockID.single_compressed_soulsand},
{id:88}
);


//LOG OAK:
Compress.addBlock("compressed_logwood",
{
    name:"Block of Log Oak",
    texture:"logoak_compressed",
},
{ 
    destroyTime: wood_time
});

Compress.addCraft(
{id:BlockID.compressed_logwood},
{id:17,data:0}
);


//LOG SPRUCE:
Compress.addBlock("compressed_logspruce",
{
    name:"Block of Log Spruce",
    texture:"logspruce_compressed",
},
{ 
    destroyTime: wood_time
});

Compress.addCraft(
{id:BlockID.compressed_logspruce},
{id:17,data:1}
);


//LOG BIRCH:
Compress.addBlock("compressed_logbirch",
{
    name:"Block of Log Birch",
    texture:"logbirch_compressed",
},
{ 
    destroyTime: wood_time
});

Compress.addCraft(
{id:BlockID.compressed_logbirch},
{id:17,data:2}
);


//LOG JUNGLE:
Compress.addBlock("compressed_logjungle",
{
    name:"Block of Log Jungle",
    texture:"logjungle_compressed",
},
{ 
    destroyTime: wood_time
});

Compress.addCraft(
{id:BlockID.compressed_logjungle},
{id:17,data:3}
);


//LOG ACACIA:
Compress.addBlock("compressed_logacacia",
{
    name:"Block of Log Acacia",
    texture:"logacacia_compressed",
},
{ 
    destroyTime: wood_time
});

Compress.addCraft(
{id:BlockID.compressed_logacacia},
{id:162,data:0}
);


//LOG DARK OAK:
Compress.addBlock("compressed_logdarkoak",
{
    name:"Block of Log Dark Oak",
    texture:"logbigoak_compressed",
},
{ 
    destroyTime: wood_time
});

Compress.addCraft(
{id:BlockID.compressed_logdarkoak},
{id:162,data:1}
);


//FEATHER:
Compress.addBlock("single_compressed_feather",
{
    name:"Single Compressed Feathers",
    texture:"feather_compressed",
},
{
    destroyTime: feather_time
});

Compress.addCraft(
{id:BlockID.single_compressed_feather},
{id:288}
);


//STRING:
Compress.addBlock("compressed_string",
{
    name:"Block of Strings",
    texture:"string_compressed",
},
{
    destroyTime: string_time
});

Compress.addCraft(
{id:BlockID.compressed_string},
{id:287}
);


//PORKCHOP:
Compress.addBlock("single_compressed_porkchop",
{
    name:"Single Compressed Porkchop",
    texture:"meatporkchop_compressed",
},
{ 
    destroyTime: meat_time
});

Compress.addCraft(
{id:BlockID.single_compressed_porkchop},
{id:319}
);


//CHICKEN:
Compress.addBlock("single_compressed_chicken",
{
    name:"Single Compressed Chicken",
    texture:"meatchicken_compressed",
},
{ 
    destroyTime: meat_time
});

Compress.addCraft(
{id:BlockID.single_compressed_chicken},
{id:365}
);


//BEEF:
Compress.addBlock("single_compressed_beef",
{
    name:"Single Compressed Beef",
    texture:"meatbeef_compressed",
},
{ 
    destroyTime: meat_time
});

Compress.addCraft(
{id:BlockID.single_compressed_beef},
{id:363}
);


//FISH:
Compress.addBlock("single_compressed_fish",
{
    name:"Single Compressed Fish",
    texture:"meatfish_compressed",
},
{ 
    destroyTime: meat_time
});

Compress.addCraft(
{id:BlockID.single_compressed_fish},
{id:349}
);


//BONE:
Compress.addBlock("single_compressed_bone",
{
    name:"Single Compressed Bones",
    texture:"bone_compressed",
},
{ 
    destroyTime: bone_time
});

Compress.addCraft(
{id:BlockID.single_compressed_bone},
{id:352}
);


//EGG:
Compress.addBlock("single_compressed_egg",
{
    name:"Single Compressed Eggs",
    texture:"egg_compressed",
},
{
    destroyTime: egg_time
});

Compress.addCraft(
{id:BlockID.single_compressed_egg},
{id:344,data:0}
);


//LEATHER:
Compress.addBlock("single_compressed_leather",
{
    name:"Single Compressed Leather",
    texture:"leather_compressed",
},
{
    destroyTime: leather_time
});

Compress.addCraft(
{id:BlockID.single_compressed_leather},
{id:334}
);


//BREAD:
Compress.addBlock("compressed_bread",
{
    name:"Block of Bread",
    texture:"bread_compressed",
},
{
    destroyTime: bread_time
});

Compress.addCraft(
{id:BlockID.compressed_bread},
{id:297}
);


//COOKIE:
Compress.addBlock("compressed_cookie",
{
    name:"Block of Cookies",
    texture:"cookie_compressed",
},
{
    destroyTime: cookie_time
});

Compress.addCraft(
{id:BlockID.compressed_cookie},
{id:357}
);


//POTATO:
Compress.addBlock("single_compressed_potato",
{
    name:"Single Compressed Potatoes",
    texture:"croppotato_compressed",
},
{ 
    destroyTime: potato_time
});

Compress.addCraft(
{id:BlockID.single_compressed_potato},
{id:392}
);


//CARROT:
Compress.addBlock("single_compressed_carrot",
{
    name:"Single Compressed Carrots",
    texture:"cropcarrot_compressed",
},
{
    destroyTime: carrot_time
});

Compress.addCraft(
{id:BlockID.single_compressed_carrot},
{id:391}
);


//NETHER WART:
Compress.addBlock("single_compressed_netherwart",
{
    name:"Single Compressed Nether Wart",
    texture:"cropnetherwart_compressed",
},
{ 
    destroyTime: netherwart_time
});

Compress.addCraft(
{id:BlockID.single_compressed_netherwart},
{id:372}
);


//MELON:
Compress.addBlock("single_compressed_melon",
{
    name:"Single Compressed Melon",
    texture:"cropmelon_compressed",
    textureData: 1
},
{
    destroyTime: melon_time
});

Compress.addCraft(
{id:BlockID.single_compressed_melon},
{id:360}
);


//APPLE:
Compress.addBlock("single_compressed_apple",
{
    name:"Single Compressed Apples",
    texture:"cropapple_compressed",
},
{
    destroyTime: apple_time
});

Compress.addCraft(
{id:BlockID.single_compressed_apple},
{id:260}
);


//ROTTEN FLESH:
Compress.addBlock("single_compressed_rotten",
{
    name:"Single Compressed Rotten Flesh",
    texture:"meatrotten_compressed",
},
{
    destroyTime: rotten_flesh_time
});

Compress.addCraft(
{id:BlockID.single_compressed_rotten},
{id:367}
);


//BLAZE ROD:
Compress.addBlock("single_compressed_blazerod",
{
    name:"Single Compressed Blaze",
    texture:"rodblaze_compressed",
},
{
    destroyTime: blazerod_time
});

Compress.addCraft(
{id:BlockID.single_compressed_blazerod},
{id:369}
);


//SPIDER EYE:
Compress.addBlock("single_compressed_spider_eye",
{
    name:"Single Compressed Spider Eyes",
    texture:"spidereye_compressed",
},
{
    destroyTime: spidereye_time
});

Compress.addCraft(
{id:BlockID.single_compressed_spider_eye},
{id:375}
);


//ENDER PEARL:
Compress.addBlock("single_compressed_enderpearl",
{
    name:"Single Compressed Ender Pearl",
    texture:"pearlender_compressed",
},
{
    destroyTime: enderpearl_time
});

Compress.addCraft(
{id:BlockID.single_compressed_enderpearl},
{id:368}
);


//SUGAR:
Compress.addBlock("single_compressed_sugar",
{
    name:"Single Compressed Sugar",
    texture:"dustsugar_compressed",
},
{
    destroyTime: sugar_time
});

Compress.addCraft(
{id:BlockID.single_compressed_sugar},
{id:353}
);


//GUNPOWDER:
Compress.addBlock("single_compressed_gunpowder",
{
    name:"Single Compressed Gunpowder",
    texture:"dustgunpowder_compressed",
},
{
    destroyTime: gunpowder_time
});

Compress.addCraft(
{id:BlockID.single_compressed_gunpowder},
{id:289}
);


//SUGAR CANE:
Compress.addBlock("single_compressed_sugarcane",
{
    name:"Single Compressed Sugar Cane",
    texture:"cropsugarcane_compressed",
},
{
    destroyTime: sugarcane_time
});

Compress.addCraft(
{id:BlockID.single_compressed_sugarcane},
{id:338}
);


//NETHER STAR:
Compress.addBlock("compressed_netherstar",
{
    name:"Block of Nether Star",
    texture:"itemnetherstar_compressed",
},
{
    destroyTime: netherstar_time
});

Compress.addCraft(
{id:BlockID.compressed_netherstar},
{id:399}
);

/*
v1.1
added Slime, Clay, flint
*/

//CLAY
Compress.addBlock("single_compressed_clay",
{
    name:"Single Compressed Clay",
    texture:"clay_compressed",
},
{
    destroyTime: clay_time
});

Compress.addCraft(
{id:BlockID.single_compressed_clay},
{id:82,data:0}
);


//FLINT
Compress.addBlock("single_compressed_flint",
{
    name:"Single Compressed Flint",
    texture:"flint_compressed",
},
{
    destroyTime: flint_time
});

Compress.addCraft(
{id:BlockID.single_compressed_flint},
{id:318}
);



// file: /data/blocks/double.js

//COBBLESTONE:
Compress.addBlock("double_compressed_cobblestone",
{
    name:"Double Compressed Cobblestone",
    texture:"cobblestone_compressed",
    textureData: 1
},
{ 
    destroyTime: cobblestone_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_cobblestone},
{id:BlockID.single_compressed_cobblestone}
);


//STONE:
Compress.addBlock("double_compressed_stone",
{
    name:"Double Compressed Stone",
    texture:"stone_compressed",
    textureData: 1
},
{ 
    destroyTime: stone_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_stone},
{id:BlockID.single_compressed_stone}
);


//SAND:
Compress.addBlock("double_compressed_blocksand",
{
    name:"Double Compressed Sand",
    texture:"blocksand_compressed",
    textureData: 1
},
{
    destroyTime: sand_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_blocksand},
{id:BlockID.single_compressed_blocksand}
);


//DIRT:
Compress.addBlock("double_compressed_dirt",
{
    name:"Double Compressed Dirt",
    texture:"dirt_compressed",
    textureData: 1
},
{
    destroyTime: dirt_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_dirt},
{id:BlockID.single_compressed_dirt}
);


//GRAVEL:
Compress.addBlock("double_compressed_gravel",
{
    name:"Double Compressed Gravel",
    texture:"gravel_compressed",
    textureData: 1
},
{
    destroyTime: gravel_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_gravel},
{id:BlockID.single_compressed_gravel}
);


//COBBLESTONE MOSSY:
Compress.addBlock("double_compressed_cobblestone_mossy",
{
    name:"Double Compressed Mossy Cobblestone",
    texture:"cobblestonemossy_compressed",
    textureData: 1
},
{ 
    destroyTime: cobblestone_mossy_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_cobblestone_mossy},
{id:BlockID.single_compressed_cobblestone_mossy}
);


//ENDSTONE
Compress.addBlock("double_compressed_endstone",
{
    name:"Double Compressed End Stone",
    texture:"endstone_compressed",
    textureData: 1
},
{ 
    destroyTime: endstone_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_endstone},
{id:BlockID.single_compressed_endstone}
);


//CHARCOAL:
Compress.addBlock("double_compressed_charcoal",
{
    name:"Double Compressed Charcoal",
    texture:"charcoal_compressed",
    textureData: 1
},
{ 
    destroyTime: charcoal_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_charcoal},
{id:BlockID.single_compressed_charcoal}
);


//COAL:
Compress.addBlock("double_compressed_coal",
{
    name:"Double Compressed Coal",
    texture:"coal_compressed",
    textureData: 1
},
{ 
    destroyTime: coal_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_coal},
{id:173}
);


//NETHERRACK:
Compress.addBlock("double_compressed_netherrack",
{
    name:"Double Compressed Netherrack",
    texture:"netherrack_compressed",
    textureData: 1
},
{ 
    destroyTime: netherrack_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_netherrack},
{id:BlockID.single_compressed_netherrack}
);


//SOULSAND:
Compress.addBlock("double_compressed_soulsand",
{
    name:"Double Compressed Soul Sand",
    texture:"soulsand_compressed",
    textureData: 1
},
{
    destroyTime: soulsand_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_soulsand},
{id:BlockID.single_compressed_soulsand}
);


//FEATHER:
Compress.addBlock("double_compressed_feather",
{
    name:"Double Compressed Feathers",
    texture:"feather_compressed",
    textureData: 1
},
{
    destroyTime: feather_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_feather},
{id:BlockID.single_compressed_feather}
);


//PORKCHOP:
Compress.addBlock("double_compressed_porkchop",
{
    name:"Double Compressed Porkchop",
    texture:"meatporkchop_compressed",
    textureData: 1
},
{ 
    destroyTime: meat_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_porkchop},
{id:BlockID.single_compressed_porkchop}
);


//CHICKEN:
Compress.addBlock("double_compressed_chicken",
{
    name:"Double Compressed Chicken",
    texture:"meatchicken_compressed",
    textureData: 1
},
{ 
    destroyTime: meat_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_chicken},
{id:BlockID.single_compressed_chicken}
);


//BEEF:
Compress.addBlock("double_compressed_beef",
{
    name:"Double Compressed Beef",
    texture:"meatbeef_compressed",
    textureData: 1
},
{ 
    destroyTime: meat_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_beef},
{id:BlockID.single_compressed_beef}
);


//FISH:
Compress.addBlock("double_compressed_fish",
{
    name:"Double Compressed Fish",
    texture:"meatfish_compressed",
    textureData: 1
},
{ 
    destroyTime: meat_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_fish},
{id:BlockID.single_compressed_fish}
);


//BONE:
Compress.addBlock("double_compressed_bone",
{
    name:"Double Compressed Bones",
    texture:"bone_compressed",
    textureData: 1
},
{ 
    destroyTime: bone_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_bone},
{id:BlockID.single_compressed_bone}
);


//EGG:
Compress.addBlock("double_compressed_egg",
{
    name:"Double Compressed Eggs",
    texture:"egg_compressed",
    textureData: 1
},
{
    destroyTime: egg_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_egg},
{id:BlockID.single_compressed_egg}
);


//LEATHER:
Compress.addBlock("double_compressed_leather",
{
    name:"Double Compressed Leather",
    texture:"leather_compressed",
    textureData: 1
},
{ 
    destroyTime: leather_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_leather},
{id:BlockID.single_compressed_leather}
);


//POTATO:
Compress.addBlock("double_compressed_potato",
{
    name:"Double Compressed Potatoes",
    texture:"croppotato_compressed",
    textureData: 1
},
{ 
    destroyTime: potato_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_potato},
{id:BlockID.single_compressed_potato}
);


//CARROT:
Compress.addBlock("double_compressed_carrot",
{
    name:"Double Compressed Carrots",
    texture:"cropcarrot_compressed",
    textureData: 1
},
{ 
    destroyTime: carrot_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_carrot},
{id:BlockID.single_compressed_carrot}
);


//NETHER WART:
Compress.addBlock("double_compressed_netherwart",
{
    name:"Double Compressed Nether Wart",
    texture:"cropnetherwart_compressed",
    textureData: 1
},
{ 
    destroyTime: netherwart_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_netherwart},
{id:BlockID.single_compressed_netherwart}
);

//MELON:
Compress.addBlock("double_compressed_melon",
{
    name:"Double Compressed Melon",
    texture:"cropmelon_compressed",
    textureData: 2
},
{ 
    destroyTime: melon_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_melon},
{id:BlockID.single_compressed_melon}
);


//APPLE:
Compress.addBlock("double_compressed_apple",
{
    name:"Double Compressed Apples",
    texture:"cropapple_compressed",
    textureData: 1
},
{ 
    destroyTime: apple_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_apple},
{id:BlockID.single_compressed_apple}
);


//ROTTEN FLESH:
Compress.addBlock("double_compressed_rotten",
{
    name:"Double Compressed Rotten Flesh",
    texture:"meatrotten_compressed",
    textureData: 1
},
{ 
    destroyTime: rotten_flesh_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_rotten},
{id:BlockID.single_compressed_rotten}
);


//BLAZE ROD:
Compress.addBlock("double_compressed_blazerod",
{
    name:"Double Compressed Blaze",
    texture:"rodblaze_compressed",
    textureData: 1
},
{
    destroyTime: blazerod_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_blazerod},
{id:BlockID.single_compressed_blazerod}
);


//SPIDER EYE:
Compress.addBlock("double_compressed_spider_eye",
{
    name:"Double Compressed Spider Eyes",
    texture:"spidereye_compressed",
    textureData: 1
},
{
    destroyTime: spidereye_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_spider_eye},
{id:BlockID.single_compressed_spider_eye}
);


//ENDER PEARL:
Compress.addBlock("double_compressed_enderpearl",
{
    name:"Double Compressed Ender Pearl",
    texture:"pearlender_compressed",
    textureData: 1
},
{
    destroyTime: enderpearl_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_enderpearl},
{id:BlockID.single_compressed_enderpearl}
);


//SUGAR:
Compress.addBlock("double_compressed_sugar",
{
    name:"Double Compressed Sugar",
    texture:"dustsugar_compressed",
    textureData: 1
},
{
    destroyTime: sugar_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_sugar},
{id:BlockID.single_compressed_sugar}
);


//GUNPOWDER:
Compress.addBlock("double_compressed_gunpowder",
{
    name:"Double Compressed Gunpowder",
    texture:"dustgunpowder_compressed",
    textureData: 1
},
{
    destroyTime: gunpowder_time*increasing_time 
});

Compress.addCraft(
{id:BlockID.double_compressed_gunpowder},
{id:BlockID.single_compressed_gunpowder}
);


//SUGAR CANE:
Compress.addBlock("double_compressed_sugarcane",
{
    name:"Double Compressed Sugar Cane",
    texture:"cropsugarcane_compressed",
    textureData: 1
},
{
    destroyTime: sugarcane_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_sugarcane},
{id:BlockID.single_compressed_sugarcane}
);


//IRON BLOCK:
Compress.addBlock("double_compressed_iron",
{
    name:"Double Compressed Iron Block",
    texture:"ingotiron_compressed",
    textureData: 1
},
{
    level: 2,
    destroyTime: iron_block_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_iron},
{id:42}
);


//GOLD BLOCK:
Compress.addBlock("double_compressed_gold",
{
    name:"Double Compressed Gold Block",
    texture:"ingotgold_compressed",
    textureData: 1
},
{
    level: 2,
    destroyTime: gold_block_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_gold},
{id:41}
);


//DIAMOND BLOCK:
Compress.addBlock("double_compressed_diamond",
{
    name:"Double Compressed Diamond Block",
    texture:"gemdiamond_compressed",
    textureData: 1
},
{
    level: 2,
    destroyTime: diamond_block_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_diamond},
{id:57}
);


//EMERALD BLOCK:
Compress.addBlock("double_compressed_emerald",
{
    name:"Double Compressed Emerald Block",
    texture:"gememerald_compressed",
    textureData: 1
},
{
    level: 2,
    destroyTime: emerald_block_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_emerald},
{id:133}
);


//LAPIS BLOCK:
Compress.addBlock("double_compressed_lapis",
{
    name:"Double Compressed Lazurite Block",
    texture:"gemlapis_compressed",
    textureData: 1
},
{
    level: 2,
    destroyTime: lazurite_block_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_lapis},
{id:22}
);


//REDSTONE BLOCK:
Compress.addBlock("double_compressed_redstone",
{
    name:"Double Compressed Redstone Block",
    texture:"dustredstone_compressed",
    textureData: 1
},
{
    level: 2,
    destroyTime: redstone_block_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_redstone},
{id:152}
);


//HAY:
Compress.addBlock("double_compressed_hay",
{
    name:"Double Compressed Hay",
    texture:"cropwheat_compressed",
    textureData: 1
},
{
    destroyTime: hay_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_hay},
{id:170}
);


//CLAY
Compress.addBlock("double_compressed_clay",
{
    name:"Double Compressed Clay",
    texture:"clay_compressed",
    textureData: 1
},
{
    destroyTime: clay_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_clay},
{id:BlockID.single_compressed_clay}
);


//SLIME
Compress.addBlock("double_compressed_slime",
{
    name:"Double Compressed Slime",
    texture:"slime_compressed",
    textureData: 1
},
{
    destroyTime: slime_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_slime},
{id:165}
);


//FLINT
Compress.addBlock("double_compressed_flint",
{
    name:"Double Compressed Flint",
    texture:"flint_compressed",
    textureData: 1
},
{ 
    destroyTime: flint_time*increasing_time
});

Compress.addCraft(
{id:BlockID.double_compressed_flint},
{id:BlockID.single_compressed_flint}
);



// file: /data/blocks/triple.js

//COBBLESTONE:
Compress.addBlock("triple_compressed_cobblestone",
{
    name:"Triple Compressed Cobblestone",
    texture:"cobblestone_compressed",
    textureData: 2
},
{ 
    destroyTime: cobblestone_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.triple_compressed_cobblestone},
{id:BlockID.double_compressed_cobblestone}
);


//STONE:
Compress.addBlock("triple_compressed_stone",
{
    name:"Triple Compressed Stone",
    texture:"stone_compressed",
    textureData: 2
},
{ 
    destroyTime: stone_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.triple_compressed_stone},
{id:BlockID.double_compressed_stone}
);


//SAND:
Compress.addBlock("triple_compressed_blocksand",
{
    name:"Triple Compressed Sand",
    texture:"blocksand_compressed",
    textureData: 2
},
{
    destroyTime: sand_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.triple_compressed_blocksand},
{id:BlockID.double_compressed_blocksand}
);


//DIRT:
Compress.addBlock("triple_compressed_dirt",
{
    name:"Triple Compressed Dirt",
    texture:"dirt_compressed",
    textureData: 2
},
{
    destroyTime: dirt_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.triple_compressed_dirt},
{id:BlockID.double_compressed_dirt}
);


//GRAVEL:
Compress.addBlock("triple_compressed_gravel",
{
    name:"Triple Compressed Gravel",
    texture:"gravel_compressed",
    textureData: 2
},
{
    destroyTime: gravel_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.triple_compressed_gravel},
{id:BlockID.double_compressed_gravel}
);


//COBBLESTONE MOSSY:
Compress.addBlock("triple_compressed_cobblestone_mossy",
{
    name:"Triple Compressed Mossy Cobblestone",
    texture:"cobblestonemossy_compressed",
    textureData: 2
},
{ 
    destroyTime: cobblestone_mossy_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.triple_compressed_cobblestone_mossy},
{id:BlockID.double_compressed_cobblestone_mossy}
);


//ENDSTONE
Compress.addBlock("triple_compressed_endstone",
{
    name:"Triple Compressed End Stone",
    texture:"endstone_compressed",
    textureData: 2
},
{ 
    destroyTime: endstone_time*increasing_time*increasing_time 
});

Compress.addCraft(
{id:BlockID.triple_compressed_endstone},
{id:BlockID.double_compressed_endstone}
);


//CHARCOAL:
Compress.addBlock("triple_compressed_charcoal",
{
    name:"Triple Compressed Charcoal",
    texture:"charcoal_compressed",
    textureData: 2
},
{ 
    destroyTime: charcoal_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.triple_compressed_charcoal},
{id:BlockID.double_compressed_charcoal}
);


//COAL:
Compress.addBlock("triple_compressed_coal",
{
    name:"Triple Compressed Coal",
    texture:"coal_compressed",
    textureData: 2
},
{ 
    destroyTime: coal_time*increasing_time*increasing_time 
});

Compress.addCraft(
{id:BlockID.triple_compressed_coal},
{id:BlockID.double_compressed_coal}
);


//NETHERRACK:
Compress.addBlock("triple_compressed_netherrack",
{
    name:"Triple Compressed Netherrack",
    texture:"netherrack_compressed",
    textureData: 2
},
{ 
    destroyTime: netherrack_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.triple_compressed_netherrack},
{id:BlockID.double_compressed_netherrack}
);


//SOULSAND:
Compress.addBlock("triple_compressed_soulsand",
{
    name:"Triple Compressed Soul Sand",
    texture:"soulsand_compressed",
    textureData: 2
},
{
    destroyTime: soulsand_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.triple_compressed_soulsand},
{id:BlockID.double_compressed_soulsand}
);


//FEATHER:
Compress.addBlock("triple_compressed_feather",
{
    name:"Triple Compressed Feathers",
    texture:"feather_compressed",
    textureData: 2
},
{
    destroyTime: feather_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.triple_compressed_feather},
{id:BlockID.double_compressed_feather}
);


//PORKCHOP:
Compress.addBlock("triple_compressed_porkchop",
{
    name:"Triple Compressed Porkchop",
    texture:"meatporkchop_compressed",
    textureData: 2
},
{ 
    destroyTime: meat_time*increasing_time*increasing_time 
});

Compress.addCraft(
{id:BlockID.triple_compressed_porkchop},
{id:BlockID.double_compressed_porkchop}
);


//CHICKEN:
Compress.addBlock("triple_compressed_chicken",
{
    name:"Triple Compressed Chicken",
    texture:"meatchicken_compressed",
    textureData: 2
},
{ 
    destroyTime: meat_time*increasing_time*increasing_time 
});

Compress.addCraft(
{id:BlockID.triple_compressed_chicken},
{id:BlockID.double_compressed_chicken}
);


//BEEF:
Compress.addBlock("triple_compressed_beef",
{
    name:"Triple Compressed Beef",
    texture:"meatbeef_compressed",
    textureData: 2
},
{ 
    destroyTime: meat_time*increasing_time*increasing_time 
});

Compress.addCraft(
{id:BlockID.triple_compressed_beef},
{id:BlockID.double_compressed_beef}
);


//FISH:
Compress.addBlock("triple_compressed_fish",
{
    name:"Triple Compressed Fish",
    texture:"meatfish_compressed",
    textureData: 2
},
{ 
    destroyTime: meat_time*increasing_time*increasing_time 
});

Compress.addCraft(
{id:BlockID.triple_compressed_fish},
{id:BlockID.double_compressed_fish}
);


//BONE:
Compress.addBlock("triple_compressed_bone",
{
    name:"Triple Compressed Bones",
    texture:"bone_compressed",
    textureData: 2
},
{ 
    destroyTime: bone_time*increasing_time*increasing_time 
});

Compress.addCraft(
{id:BlockID.triple_compressed_bone},
{id:BlockID.double_compressed_bone}
);


//EGG:
Compress.addBlock("triple_compressed_egg",
{
    name:"Triple Compressed Eggs",
    texture:"egg_compressed",
    textureData: 2
},
{
    destroyTime: egg_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.triple_compressed_egg},
{id:BlockID.double_compressed_egg}
);


//LEATHER:
Compress.addBlock("triple_compressed_leather",
{
    name:"Triple Compressed Leather",
    texture:"leather_compressed",
    textureData: 2
},
{ 
    destroyTime: leather_time*increasing_time*increasing_time 
});

Compress.addCraft(
{id:BlockID.triple_compressed_leather},
{id:BlockID.double_compressed_leather}
);


//POTATO:
Compress.addBlock("triple_compressed_potato",
{
    name:"Triple Compressed Potatoes",
    texture:"croppotato_compressed",
    textureData: 2
},
{ 
    destroyTime: potato_time*increasing_time*increasing_time 
});

Compress.addCraft(
{id:BlockID.triple_compressed_potato},
{id:BlockID.double_compressed_potato}
);


//CARROT:
Compress.addBlock("triple_compressed_carrot",
{
    name:"Triple Compressed Carrots",
    texture:"cropcarrot_compressed",
    textureData: 2
},
{ 
    destroyTime: carrot_time*increasing_time*increasing_time 
});

Compress.addCraft(
{id:BlockID.triple_compressed_carrot},
{id:BlockID.double_compressed_carrot}
);


//NETHER WART:
Compress.addBlock("triple_compressed_netherwart",
{
    name:"Triple Compressed Nether Wart",
    texture:"cropnetherwart_compressed",
    textureData: 2
},
{ 
    destroyTime: netherwart_time*increasing_time*increasing_time 
});

Compress.addCraft(
{id:BlockID.triple_compressed_netherwart},
{id:BlockID.double_compressed_netherwart}
);


//APPLE:
Compress.addBlock("triple_compressed_apple",
{
    name:"Triple Compressed Apples",
    texture:"cropapple_compressed",
    textureData: 2
},
{ 
    destroyTime: apple_time*increasing_time*increasing_time 
});

Compress.addCraft(
{id:BlockID.triple_compressed_apple},
{id:BlockID.double_compressed_apple}
);


//ROTTEN FLESH:
Compress.addBlock("triple_compressed_rotten",
{
    name:"Triple Compressed Rotten Flesh",
    texture:"meatrotten_compressed",
    textureData: 2
},
{ 
    destroyTime: rotten_flesh_time*increasing_time*increasing_time 
});

Compress.addCraft(
{id:BlockID.triple_compressed_rotten},
{id:BlockID.double_compressed_rotten}
);


//BLAZE ROD:
Compress.addBlock("triple_compressed_blazerod",
{
    name:"Triple Compressed Blaze",
    texture:"rodblaze_compressed",
    textureData: 2
},
{
    destroyTime: blazerod_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.triple_compressed_blazerod},
{id:BlockID.double_compressed_blazerod}
);


//SPIDER EYE:
Compress.addBlock("triple_compressed_spider_eye",
{
    name:"Triple Compressed Spider Eyes",
    texture:"spidereye_compressed",
    textureData: 2
},
{
    destroyTime: spidereye_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.triple_compressed_spider_eye},
{id:BlockID.double_compressed_spider_eye}
);


//ENDER PEARL:
Compress.addBlock("triple_compressed_enderpearl",
{
    name:"Triple Compressed Ender Pearl",
    texture:"pearlender_compressed",
    textureData: 2
},
{
    destroyTime: enderpearl_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.triple_compressed_enderpearl},
{id:BlockID.double_compressed_enderpearl}
);


//SUGAR:
Compress.addBlock("triple_compressed_sugar",
{
    name:"Triple Compressed Sugar",
    texture:"dustsugar_compressed",
    textureData: 2
},
{
    destroyTime: sugar_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.triple_compressed_sugar},
{id:BlockID.double_compressed_sugar}
);


//GUNPOWDER:
Compress.addBlock("triple_compressed_gunpowder",
{
    name:"Triple Compressed Gunpowder",
    texture:"dustgunpowder_compressed",
    textureData: 2
},
{
    destroyTime: gunpowder_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.triple_compressed_gunpowder},
{id:BlockID.double_compressed_gunpowder}
);


//SUGAR CANE:
Compress.addBlock("triple_compressed_sugarcane",
{
    name:"Triple Compressed Sugar Cane",
    texture:"cropsugarcane_compressed",
    textureData: 2
},
{
    destroyTime: sugarcane_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.triple_compressed_sugarcane},
{id:BlockID.double_compressed_sugarcane}
);


//IRON BLOCK:
Compress.addBlock("triple_compressed_iron",
{
    name:"Triple Compressed Iron Block",
    texture:"ingotiron_compressed",
    textureData: 2
},
{
    level: 2,
    destroyTime: iron_block_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.triple_compressed_iron},
{id:BlockID.double_compressed_iron}
);


//GOLD BLOCK:
Compress.addBlock("triple_compressed_gold",
{
    name:"Triple Compressed Gold Block",
    texture:"ingotgold_compressed",
    textureData: 2
},
{
    level: 2,
    destroyTime: gold_block_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.triple_compressed_gold},
{id:BlockID.double_compressed_gold}
);


//DIAMOND BLOCK:
Compress.addBlock("triple_compressed_diamond",
{
    name:"Triple Compressed Diamond Block",
    texture:"gemdiamond_compressed",
    textureData: 2
},
{
    level: 2,
    destroyTime: diamond_block_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.triple_compressed_diamond},
{id:BlockID.double_compressed_diamond}
);


//EMERALD BLOCK:
Compress.addBlock("triple_compressed_emerald",
{
    name:"Triple Compressed Emerald Block",
    texture:"gememerald_compressed",
    textureData: 2
},
{
    level: 2,
    destroyTime: emerald_block_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.triple_compressed_emerald},
{id:BlockID.double_compressed_emerald}
);


//LAPIS BLOCK:
Compress.addBlock("triple_compressed_lapis",
{
    name:"Triple Compressed Lazurite Block",
    texture:"gemlapis_compressed",
    textureData: 2
},
{
    level: 2,
    destroyTime: lazurite_block_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.triple_compressed_lapis},
{id:BlockID.double_compressed_lapis}
);


//REDSTONE BLOCK:
Compress.addBlock("triple_compressed_redstone",
{
    name:"Triple Compressed Redstone Block",
    texture:"dustredstone_compressed",
    textureData: 2
},
{
    level: 2,
    destroyTime: redstone_block_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.triple_compressed_redstone},
{id:BlockID.double_compressed_redstone}
);


//HAY:
Compress.addBlock("triple_compressed_hay",
{
    name:"Triple Compressed Hay",
    texture:"cropwheat_compressed",
    textureData: 2
},
{
    destroyTime: hay_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.triple_compressed_hay},
{id:BlockID.double_compressed_hay}
);


//CLAY
Compress.addBlock("triple_compressed_clay",
{
    name:"Triple Compressed Clay",
    texture:"clay_compressed",
    textureData: 2
},
{
    destroyTime: clay_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.triple_compressed_clay},
{id:BlockID.double_compressed_clay}
);


//SLIME
Compress.addBlock("triple_compressed_slime",
{
    name:"Triple Compressed Slime",
    texture:"slime_compressed",
    textureData: 2
},
{
    destroyTime: slime_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.triple_compressed_slime},
{id:BlockID.double_compressed_slime}
);


//FLINT
Compress.addBlock("triple_compressed_flint",
{
    name:"Triple Compressed Flint",
    texture:"flint_compressed",
    textureData: 2
},
{ 
    destroyTime: flint_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.triple_compressed_flint},
{id:BlockID.double_compressed_flint}
);



// file: /data/blocks/quadruple.js

//COBBLESTONE:
Compress.addBlock("quadruple_compressed_cobblestone",
{
    name:"Quadruple Compressed Cobblestone",
    texture:"cobblestone_compressed",
    textureData: 3
},
{ 
    destroyTime: cobblestone_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.quadruple_compressed_cobblestone},
{id:BlockID.triple_compressed_cobblestone}
);


//STONE:
Compress.addBlock("quadruple_compressed_stone",
{
    name:"Quadruple Compressed Stone",
    texture:"stone_compressed",
    textureData: 3
},
{ 
    destroyTime: stone_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.quadruple_compressed_stone},
{id:BlockID.triple_compressed_stone}
);


//SAND:
Compress.addBlock("quadruple_compressed_blocksand",
{
    name:"Quadruple Compressed Sand",
    texture:"blocksand_compressed",
    textureData: 3
},
{
    destroyTime: sand_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.quadruple_compressed_blocksand},
{id:BlockID.triple_compressed_blocksand}
);


//DIRT:
Compress.addBlock("quadruple_compressed_dirt",
{
    name:"Quadruple Compressed Dirt",
    texture:"dirt_compressed",
    textureData: 3
},
{
    destroyTime: dirt_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.quadruple_compressed_dirt},
{id:BlockID.triple_compressed_dirt}
);


//GRAVEL:
Compress.addBlock("quadruple_compressed_gravel",
{
    name:"Quadruple Compressed Gravel",
    texture:"gravel_compressed",
    textureData: 3
},
{
    destroyTime: gravel_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.quadruple_compressed_gravel},
{id:BlockID.triple_compressed_gravel}
);


//COBBLESTONE MOSSY:
Compress.addBlock("quadruple_compressed_cobblestone_mossy",
{
    name:"Quadruple Compressed Mossy Cobblestone",
    texture:"cobblestonemossy_compressed",
    textureData: 3
},
{ 
    destroyTime: cobblestone_mossy_time*increasing_time*increasing_time*increasing_time 
});

Compress.addCraft(
{id:BlockID.quadruple_compressed_cobblestone_mossy},
{id:BlockID.triple_compressed_cobblestone_mossy}
);


//ENDSTONE
Compress.addBlock("quadruple_compressed_endstone",
{
    name:"Quadruple Compressed End Stone",
    texture:"endstone_compressed",
    textureData: 3
},
{ 
    destroyTime: endstone_time*increasing_time*increasing_time*increasing_time 
});

Compress.addCraft(
{id:BlockID.quadruple_compressed_endstone},
{id:BlockID.triple_compressed_endstone}
);


//NETHERRACK:
Compress.addBlock("quadruple_compressed_netherrack",
{
    name:"Quadruple Compressed Netherrack",
    texture:"netherrack_compressed",
    textureData: 3
},
{ 
    destroyTime: netherrack_time*increasing_time*increasing_time*increasing_time 
});

Compress.addCraft(
{id:BlockID.quadruple_compressed_netherrack},
{id:BlockID.triple_compressed_netherrack}
);


//SOULSAND:
Compress.addBlock("quadruple_compressed_soulsand",
{
    name:"Quadruple Compressed Soul Sand",
    texture:"soulsand_compressed",
    textureData: 3
},
{
    destroyTime: soulsand_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.quadruple_compressed_soulsand},
{id:BlockID.triple_compressed_soulsand}
);


//EGG:
Compress.addBlock("quadruple_compressed_egg",
{
    name:"Quadruple Compressed Eggs",
    texture:"egg_compressed",
    textureData: 3
},
{
    destroyTime: egg_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.quadruple_compressed_egg},
{id:BlockID.triple_compressed_egg}
);


//ROTTEN FLESH:
Compress.addBlock("quadruple_compressed_rotten",
{
    name:"Quadruple Compressed Rotten Flesh",
    texture:"meatrotten_compressed",
    textureData: 3
},
{ 
    destroyTime: rotten_flesh_time*increasing_time*increasing_time*increasing_time 
});

Compress.addCraft(
{id:BlockID.quadruple_compressed_rotten},
{id:BlockID.triple_compressed_rotten}
);


//SUGARCANE:
Compress.addBlock("quadruple_compressed_sugarcane",
{
    name:"Quadruple Compressed Sugar Cane",
    texture:"cropsugarcane_compressed",
    textureData: 3
},
{
    destroyTime: sugarcane_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.quadruple_compressed_sugarcane},
{id:BlockID.triple_compressed_sugarcane}
);


//CLAY
Compress.addBlock("quadruple_compressed_clay",
{
    name:"Quadruple Compressed Clay",
    texture:"clay_compressed",
    textureData: 3
},
{
    destroyTime: clay_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.quadruple_compressed_clay},
{id:BlockID.triple_compressed_clay}
);



// file: /data/blocks/quintuple.js

//COBBLESTONE:
Compress.addBlock("quintuple_compressed_cobblestone",
{
    name:"Quintuple Compressed Cobblestone",
    texture:"cobblestone_compressed",
    textureData: 4
},
{ 
    destroyTime: cobblestone_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.quintuple_compressed_cobblestone},
{id:BlockID.quadruple_compressed_cobblestone}
);


//STONE:
Compress.addBlock("quintuple_compressed_stone",
{
    name:"Quintuple Compressed Stone",
    texture:"stone_compressed",
    textureData: 4
},
{ 
    destroyTime: stone_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.quintuple_compressed_stone},
{id:BlockID.quadruple_compressed_stone}
);


//SAND:
Compress.addBlock("quintuple_compressed_blocksand",
{
    name:"Quintuple Compressed Sand",
    texture:"blocksand_compressed",
    textureData: 4
},
{
    destroyTime: sand_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.quintuple_compressed_blocksand},
{id:BlockID.quadruple_compressed_blocksand}
);


//DIRT:
Compress.addBlock("quintuple_compressed_dirt",
{
    name:"Quintuple Compressed Dirt",
    texture:"dirt_compressed",
    textureData: 4
},
{
    destroyTime: dirt_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.quintuple_compressed_dirt},
{id:BlockID.quadruple_compressed_dirt}
);


//GRAVEL:
Compress.addBlock("quintuple_compressed_gravel",
{
    name:"Quintuple Compressed Gravel",
    texture:"gravel_compressed",
    textureData: 4
},
{
    destroyTime: gravel_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.quintuple_compressed_gravel},
{id:BlockID.quadruple_compressed_gravel}
);


//COBBLESTONE MOSSY:
Compress.addBlock("quintuple_compressed_cobblestone_mossy",
{
    name:"Quintuple Compressed Mossy Cobblestone",
    texture:"cobblestonemossy_compressed",
    textureData: 4
},
{ 
    destroyTime: cobblestone_mossy_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.quintuple_compressed_cobblestone_mossy},
{id:BlockID.quadruple_compressed_cobblestone_mossy}
);


//ENDSTONE
Compress.addBlock("quintuple_compressed_endstone",
{
    name:"Quintuple Compressed End Stone",
    texture:"endstone_compressed",
    textureData: 4
},
{ 
    destroyTime: endstone_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.quintuple_compressed_endstone},
{id:BlockID.quadruple_compressed_endstone}
);


//NETHERRACK:
Compress.addBlock("quintuple_compressed_netherrack",
{
    name:"Quintuple Compressed Netherrack",
    texture:"netherrack_compressed",
    textureData: 4
},
{ 
    destroyTime: netherrack_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.quintuple_compressed_netherrack},
{id:BlockID.quadruple_compressed_netherrack}
);


//SOULSAND:
Compress.addBlock("quintuple_compressed_soulsand",
{
    name:"Quintuple Compressed Soul Sand",
    texture:"soulsand_compressed",
    textureData: 4
},
{
    destroyTime: soulsand_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.quintuple_compressed_soulsand},
{id:BlockID.quadruple_compressed_soulsand}
);


//EGG:
Compress.addBlock("quintuple_compressed_egg",
{
    name:"Quintuple Compressed Eggs",
    texture:"egg_compressed",
    textureData: 4
},
{
    destroyTime: egg_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.quintuple_compressed_egg},
{id:BlockID.quadruple_compressed_egg}
);


//ROTTEN FLESH:
Compress.addBlock("quintuple_compressed_rotten",
{
    name:"Quintuple Compressed Rotten Flesh",
    texture:"meatrotten_compressed",
    textureData: 4
},
{ 
    destroyTime: rotten_flesh_time*increasing_time*increasing_time*increasing_time*increasing_time 
});

Compress.addCraft(
{id:BlockID.quintuple_compressed_rotten},
{id:BlockID.quadruple_compressed_rotten}
);


//SUGAR CANE:
Compress.addBlock("quintuple_compressed_sugarcane",
{
    name:"Quintuple Compressed Sugar Cane",
    texture:"cropsugarcane_compressed",
    textureData: 4
},
{
    destroyTime: sugarcane_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.quintuple_compressed_sugarcane},
{id:BlockID.quadruple_compressed_sugarcane}
);


//CLAY
Compress.addBlock("quintuple_compressed_clay",
{
    name:"Quintuple Compressed Clay",
    texture:"clay_compressed",
    textureData: 4
},
{
    destroyTime: clay_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.quintuple_compressed_clay},
{id:BlockID.quadruple_compressed_clay}
);



// file: /data/blocks/sextuple.js

//COBBLESTONE:
Compress.addBlock("sextuple_compressed_cobblestone",
{
    name:"Sextuple Compressed Cobblestone",
    texture:"cobblestone_compressed",
    textureData: 5
},
{ 
    destroyTime: cobblestone_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time 
});

Compress.addCraft(
{id:BlockID.sextuple_compressed_cobblestone},
{id:BlockID.quintuple_compressed_cobblestone}
);


//STONE:
Compress.addBlock("sextuple_compressed_stone",
{
    name:"Sextuple Compressed Stone",
    texture:"stone_compressed",
    textureData: 5
},
{ 
    destroyTime: stone_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time 
});

Compress.addCraft(
{id:BlockID.sextuple_compressed_stone},
{id:BlockID.quintuple_compressed_stone}
);


//SAND:
Compress.addBlock("sextuple_compressed_blocksand",
{
    name:"Sextuple Compressed Sand",
    texture:"blocksand_compressed",
    textureData: 5
},
{
    destroyTime: sand_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.sextuple_compressed_blocksand},
{id:BlockID.quintuple_compressed_blocksand}
);


//DIRT:
Compress.addBlock("sextuple_compressed_dirt",
{
    name:"Sextuple Compressed Dirt",
    texture:"dirt_compressed",
    textureData: 5
},
{
    destroyTime: dirt_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.sextuple_compressed_dirt},
{id:BlockID.quintuple_compressed_dirt}
);


//GRAVEL:
Compress.addBlock("sextuple_compressed_gravel",
{
    name:"Sextuple Compressed Gravel",
    texture:"gravel_compressed",
    textureData: 5
},
{
    destroyTime: gravel_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.sextuple_compressed_gravel},
{id:BlockID.quintuple_compressed_gravel}
);


//COBBLESTONE MOSSY:
Compress.addBlock("sextuple_compressed_cobblestone_mossy",
{
    name:"Sextuple Compressed Mossy Cobblestone",
    texture:"cobblestonemossy_compressed",
    textureData: 5
},
{ 
    destroyTime: cobblestone_mossy_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.sextuple_compressed_cobblestone_mossy},
{id:BlockID.quintuple_compressed_cobblestone_mossy}
);


//ENDSTONE
Compress.addBlock("sextuple_compressed_endstone",
{
    name:"Sextuple Compressed End Stone",
    texture:"endstone_compressed",
    textureData: 5
},
{ 
    destroyTime: endstone_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.sextuple_compressed_endstone},
{id:BlockID.quintuple_compressed_endstone}
);


//NETHERRACK:
Compress.addBlock("sextuple_compressed_netherrack",
{
    name:"Sextuple Compressed Netherrack",
    texture:"netherrack_compressed",
    textureData: 5
},
{ 
    destroyTime: netherrack_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.sextuple_compressed_netherrack},
{id:BlockID.quintuple_compressed_netherrack}
);


//SOULSAND:
Compress.addBlock("sextuple_compressed_soulsand",
{
    name:"Sextuple Compressed Soul Sand",
    texture:"soulsand_compressed",
    textureData: 5
},
{
    destroyTime: soulsand_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.sextuple_compressed_soulsand},
{id:BlockID.quintuple_compressed_soulsand}
);


//CLAY
Compress.addBlock("sextuple_compressed_clay",
{
    name:"Sextuple Compressed Clay",
    texture:"clay_compressed",
    textureData: 5
},
{
    destroyTime: clay_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.sextuple_compressed_clay},
{id:BlockID.quintuple_compressed_clay}
);



// file: /data/blocks/septuple.js

//COBBLESTONE:
Compress.addBlock("septuple_compressed_cobblestone",
{
    name:"Septuple Compressed Cobblestone",
    texture:"cobblestone_compressed",
    textureData: 6
},
{ 
    destroyTime: cobblestone_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time 
});

Compress.addCraft(
{id:BlockID.septuple_compressed_cobblestone},
{id:BlockID.sextuple_compressed_cobblestone}
);


//STONE:
Compress.addBlock("septuple_compressed_stone",
{
    name:"Septuple Compressed Stone",
    texture:"stone_compressed",
    textureData: 6
},
{ 
    destroyTime: stone_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time 
});

Compress.addCraft(
{id:BlockID.septuple_compressed_stone},
{id:BlockID.sextuple_compressed_stone}
);


//SAND:
Compress.addBlock("septuple_compressed_blocksand",
{
    name:"Septuple Compressed Sand",
    texture:"blocksand_compressed",
    textureData: 6
},
{
    destroyTime: sand_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.septuple_compressed_blocksand},
{id:BlockID.sextuple_compressed_blocksand}
);


//DIRT:
Compress.addBlock("septuple_compressed_dirt",
{
    name:"Septuple Compressed Dirt",
    texture:"dirt_compressed",
    textureData: 6
},
{
    destroyTime: dirt_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.septuple_compressed_dirt},
{id:BlockID.sextuple_compressed_dirt}
);


//GRAVEL:
Compress.addBlock("septuple_compressed_gravel",
{
    name:"Septuple Compressed Gravel",
    texture:"gravel_compressed",
    textureData: 6
},
{
    destroyTime: gravel_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.septuple_compressed_gravel},
{id:BlockID.sextuple_compressed_gravel}
);


//COBBLESTONE MOSSY:
Compress.addBlock("septuple_compressed_cobblestone_mossy",
{
    name:"Septuple Compressed Mossy Cobblestone",
    texture:"cobblestonemossy_compressed",
    textureData: 6
},
{ 
    destroyTime: cobblestone_mossy_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.septuple_compressed_cobblestone_mossy},
{id:BlockID.sextuple_compressed_cobblestone_mossy}
);


//ENDSTONE
Compress.addBlock("septuple_compressed_endstone",
{
    name:"Septuple Compressed End Stone",
    texture:"endstone_compressed",
    textureData: 6
},
{ 
    destroyTime: endstone_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time 
});

Compress.addCraft(
{id:BlockID.septuple_compressed_endstone},
{id:BlockID.sextuple_compressed_endstone}
);


//NETHERRACK:
Compress.addBlock("septuple_compressed_netherrack",
{
    name:"Septuple Compressed Netherrack",
    texture:"netherrack_compressed",
    textureData: 6
},
{ 
    destroyTime: netherrack_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.septuple_compressed_netherrack},
{id:BlockID.sextuple_compressed_netherrack}
);


//SOULSAND:
Compress.addBlock("septuple_compressed_soulsand",
{
    name:"Septuple Compressed Soul Sand",
    texture:"soulsand_compressed",
    textureData: 6
},
{
    destroyTime: soulsand_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.septuple_compressed_soulsand},
{id:BlockID.sextuple_compressed_soulsand}
);


//CLAY
Compress.addBlock("septuple_compressed_clay",
{
    name:"Septuple Compressed Clay",
    texture:"clay_compressed",
    textureData: 6
},
{
    destroyTime: clay_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.septuple_compressed_clay},
{id:BlockID.sextuple_compressed_clay}
);



// file: /data/blocks/octuple.js

//COBBLESTONE:
Compress.addBlock("octuple_compressed_cobblestone",
{
    name:"Octuple Compressed Cobblestone",
    texture:"cobblestone_compressed",
    textureData: 7
},
{ 
    destroyTime: cobblestone_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time 
});

Compress.addCraft(
{id:BlockID.octuple_compressed_cobblestone},
{id:BlockID.septuple_compressed_cobblestone}
);


//STONE:
Compress.addBlock("octuple_compressed_stone",
{
    name:"Octuple Compressed Stone",
    texture:"stone_compressed",
    textureData: 7
},
{ 
    destroyTime: stone_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.octuple_compressed_stone},
{id:BlockID.septuple_compressed_stone}
);


//SAND:
Compress.addBlock("octuple_compressed_blocksand",
{
    name:"Octuple Compressed Sand",
    texture:"blocksand_compressed",
    textureData: 7
},
{
    destroyTime: sand_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.octuple_compressed_blocksand},
{id:BlockID.septuple_compressed_blocksand}
);


//DIRT:
Compress.addBlock("octuple_compressed_dirt",
{
    name:"Octuple Compressed Dirt",
    texture:"dirt_compressed",
    textureData: 7
},
{
    destroyTime: dirt_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.octuple_compressed_dirt},
{id:BlockID.septuple_compressed_dirt}
);


//GRAVEL:
Compress.addBlock("octuple_compressed_gravel",
{
    name:"Octuple Compressed Gravel",
    texture:"gravel_compressed",
    textureData: 7
},
{
    destroyTime: gravel_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.octuple_compressed_gravel},
{id:BlockID.septuple_compressed_gravel}
);


//COBBLESTONE MOSSY:
Compress.addBlock("octuple_compressed_cobblestone_mossy",
{
    name:"Octuple Compressed Mossy Cobblestone",
    texture:"cobblestonemossy_compressed",
    textureData: 7
},
{ 
    destroyTime: cobblestone_mossy_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.octuple_compressed_cobblestone_mossy},
{id:BlockID.septuple_compressed_cobblestone_mossy}
);


//ENDSTONE
Compress.addBlock("octuple_compressed_endstone",
{
    name:"Octuple Compressed End Stone",
    texture:"endstone_compressed",
    textureData: 7
},
{ 
    destroyTime: endstone_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time 
});

Compress.addCraft(
{id:BlockID.octuple_compressed_endstone},
{id:BlockID.septuple_compressed_endstone}
);


//NETHERRACK:
Compress.addBlock("octuple_compressed_netherrack",
{
    name:"Octuple Compressed Netherrack",
    texture:"netherrack_compressed",
    textureData: 7
},
{ 
    destroyTime: netherrack_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time 
});

Compress.addCraft(
{id:BlockID.octuple_compressed_netherrack},
{id:BlockID.septuple_compressed_netherrack}
);


//SOULSAND:
Compress.addBlock("octuple_compressed_soulsand",
{
    name:"Octuple Compressed Soul Sand",
    texture:"soulsand_compressed",
    textureData: 7
},
{
    destroyTime: soulsand_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.octuple_compressed_soulsand},
{id:BlockID.septuple_compressed_soulsand}
);


//CLAY
Compress.addBlock("octuple_compressed_clay",
{
    name:"Octuple Compressed Clay",
    texture:"clay_compressed",
    textureData: 7
},
{
    destroyTime: clay_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.octuple_compressed_clay},
{id:BlockID.septuple_compressed_clay}
);



// file: /data/blocks/nonuple.js

//COBBLESTONE:
Compress.addBlock("nonuple_compressed_cobblestone",
{
    name:"Nonuple Compressed Cobblestone",
    texture:"cobblestone_compressed",
    textureData: 8
},
{ 
    destroyTime: cobblestone_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.nonuple_compressed_cobblestone},
{id:BlockID.octuple_compressed_cobblestone}
);


//STONE:
Compress.addBlock("nonuple_compressed_stone",
{
    name:"Nonuple Compressed Stone",
    texture:"stone_compressed",
    textureData: 8
},
{ 
    destroyTime: stone_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.nonuple_compressed_stone},
{id:BlockID.octuple_compressed_stone}
);


//SAND:
Compress.addBlock("nonuple_compressed_blocksand",
{
    name:"Nonuple Compressed Sand",
    texture:"blocksand_compressed",
    textureData: 8
},
{
    destroyTime: sand_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.nonuple_compressed_blocksand},
{id:BlockID.octuple_compressed_blocksand}
);


//DIRT:
Compress.addBlock("nonuple_compressed_dirt",
{
    name:"Nonuple Compressed Dirt",
    texture:"dirt_compressed",
    textureData: 8
},
{
    destroyTime: dirt_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.nonuple_compressed_dirt},
{id:BlockID.octuple_compressed_dirt}
);


//GRAVEL:
Compress.addBlock("nonuple_compressed_gravel",
{
    name:"Nonuple Compressed Gravel",
    texture:"gravel_compressed",
    textureData: 8
},
{
    destroyTime: gravel_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.nonuple_compressed_gravel},
{id:BlockID.octuple_compressed_gravel}
);


//COBBLESTONE MOSSY:
Compress.addBlock("nonuple_compressed_cobblestone_mossy",
{
    name:"Nonuple Compressed Mossy Cobblestone",
    texture:"cobblestonemossy_compressed",
    textureData: 8
},
{ 
    destroyTime: cobblestone_mossy_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.nonuple_compressed_cobblestone_mossy},
{id:BlockID.octuple_compressed_cobblestone_mossy}
);


//ENDSTONE
Compress.addBlock("nonuple_compressed_endstone",
{
    name:"Nonuple Compressed End Stone",
    texture:"endstone_compressed",
    textureData: 8
},
{ 
    destroyTime: endstone_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.nonuple_compressed_endstone},
{id:BlockID.octuple_compressed_endstone}
);


//NETHERRACK:
Compress.addBlock("nonuple_compressed_netherrack",
{
    name:"Nonuple Compressed Netherrack",
    texture:"netherrack_compressed",
    textureData: 8
},
{ 
    destroyTime: netherrack_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.nonuple_compressed_netherrack},
{id:BlockID.octuple_compressed_netherrack}
);


//SOULSAND:
Compress.addBlock("nonuple_compressed_soulsand",
{
    name:"Nonuple Compressed Soul Sand",
    texture:"soulsand_compressed",
    textureData: 8
},
{
    destroyTime: soulsand_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.nonuple_compressed_soulsand},
{id:BlockID.octuple_compressed_soulsand}
);


//CLAY
Compress.addBlock("nonuple_compressed_clay",
{
    name:"Nonuple Compressed Clay",
    texture:"clay_compressed",
    textureData: 8
},
{
    destroyTime: clay_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.nonuple_compressed_clay},
{id:BlockID.octuple_compressed_clay}
);



// file: /data/blocks/decuple.js

//COBBLESTONE:
Compress.addBlock("decuple_compressed_cobblestone",
{
    name:"Decuple Compressed Cobblestone",
    texture:"cobblestone_compressed",
    textureData: 9
},
{ 
    destroyTime: cobblestone_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.decuple_compressed_cobblestone},
{id:BlockID.nonuple_compressed_cobblestone}
);


//STONE:
Compress.addBlock("decuple_compressed_stone",
{
    name:"Decuple Compressed Stone",
    texture:"stone_compressed",
    textureData: 9
},
{ 
    destroyTime: stone_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.decuple_compressed_stone},
{id:BlockID.nonuple_compressed_stone}
);


//SAND:
Compress.addBlock("decuple_compressed_blocksand",
{
    name:"Decuple Compressed Sand",
    texture:"blocksand_compressed",
    textureData: 9
},
{
    destroyTime: sand_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.decuple_compressed_blocksand},
{id:BlockID.nonuple_compressed_blocksand}
);


//DIRT:
Compress.addBlock("decuple_compressed_dirt",
{
    name:"Decuple Compressed Dirt",
    texture:"dirt_compressed",
    textureData: 9
},
{
    destroyTime: dirt_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time 
});

Compress.addCraft(
{id:BlockID.decuple_compressed_dirt},
{id:BlockID.nonuple_compressed_dirt}
);


//GRAVEL:
Compress.addBlock("decuple_compressed_gravel",
{
    name:"Decuple Compressed Gravel",
    texture:"gravel_compressed",
    textureData: 9
},
{
    destroyTime: gravel_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.decuple_compressed_gravel},
{id:BlockID.nonuple_compressed_gravel}
);


//COBBLESTONE MOSSY:
Compress.addBlock("decuple_compressed_cobblestone_mossy",
{
    name:"Decuple Compressed Mossy Cobblestone",
    texture:"cobblestonemossy_compressed",
    textureData: 9
},
{ 
    destroyTime: cobblestone_mossy_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.decuple_compressed_cobblestone_mossy},
{id:BlockID.nonuple_compressed_cobblestone_mossy}
);


//ENDSTONE
Compress.addBlock("decuple_compressed_endstone",
{
    name:"Decuple Compressed End Stone",
    texture:"endstone_compressed",
    textureData: 9
},
{ 
    destroyTime: endstone_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.decuple_compressed_endstone},
{id:BlockID.nonuple_compressed_endstone}
);


//NETHERRACK:
Compress.addBlock("decuple_compressed_netherrack",
{
    name:"Decuple Compressed Netherrack",
    texture:"netherrack_compressed",
    textureData: 9
},
{ 
    destroyTime: netherrack_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.decuple_compressed_netherrack},
{id:BlockID.nonuple_compressed_netherrack}
);


//SOULSAND:
Compress.addBlock("decuple_compressed_soulsand",
{
    name:"Decuple Compressed Soul Sand",
    texture:"soulsand_compressed",
    textureData: 9
},
{
    destroyTime: soulsand_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.decuple_compressed_soulsand},
{id:BlockID.nonuple_compressed_soulsand}
);


//CLAY
Compress.addBlock("decuple_compressed_clay",
{
    name:"Decuple Compressed Clay",
    texture:"clay_compressed",
    textureData: 9
},
{
    destroyTime: clay_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time*increasing_time
});

Compress.addCraft(
{id:BlockID.decuple_compressed_clay},
{id:BlockID.nonuple_compressed_clay}
);



// file: /shared.js

ModAPI.registerAPI("CompressAPI", Compress);