/*
BUILD INFO:
  dir: dev
  target: main.js
  files: 30
*/



// file: banner.js

/*
 ___  ___  ________  ________  ___      ___ _______   ________  _________
|\  \|\  \|\   __  \|\   __  \|\  \    /  /|\  ___ \ |\   ____\|\___   ___\
\ \  \\\  \ \  \|\  \ \  \|\  \ \  \  /  / | \   __/|\ \  \___|\|___ \  \_|
 \ \   __  \ \   __  \ \   _  _\ \  \/  / / \ \  \_|/_\ \_____  \   \ \  \
  \ \  \ \  \ \  \ \  \ \  \\  \\ \    / /   \ \  \_|\ \|____|\  \   \ \  \
   \ \__\ \__\ \__\ \__\ \__\\ _\\ \__/ /     \ \_______\____\_\  \   \ \__\
    \|__|\|__|\|__|\|__|\|__|\|__|\|__|/       \|_______|\_________\   \|__|
                                                        \|_________|


     ________  ________  ________  ________ _________
    |\   ____\|\   __  \|\   __  \|\  _____\\___   ___\
    \ \  \___|\ \  \|\  \ \  \|\  \ \  \__/\|___ \  \_|
     \ \  \    \ \   _  _\ \   __  \ \   __\    \ \  \
      \ \  \____\ \  \\  \\ \  \ \  \ \  \_|     \ \  \
       \ \_______\ \__\\ _\\ \__\ \__\ \__\       \ \__\
        \|_______|\|__|\|__|\|__|\|__|\|__|        \|__|



        ________      ________
       |\_____  \    |\   __  \
       \|____|\ /_   \ \  \|\  \
             \|\  \   \ \  \\\  \
            __\_\  \ __\ \  \\\  \
           |\_______\\__\ \_______\
           \|_______\|__|\|_______|

*/




// file: API/importLib.js

IMPORT("framework");
IMPORT("CropLib");
IMPORT("Harvest_Core");
IMPORT("StorageInterface");

var ForestryAPI = modsAPI.ForestryAPI;




// file: API/CropClasses.js

var CropsConfig = {
    HarvestcraftCrop: {
        ageSpeed: parseFloat(__config__.access("other.ageSpeed.crops")),
        growChance: parseFloat(__config__.access("other.growChance.crops"))
    },

    HarvestcraftFruit: {
        ageSpeed: parseFloat(__config__.access("other.ageSpeed.fruits")),
        growChance: parseFloat(__config__.access("other.growChance.fruits"))
    },

    HarvestcraftSapling: {
        ageSpeed: parseFloat(__config__.access("other.ageSpeed.saplings")),
        growChance: parseFloat(__config__.access("other.growChance.saplings"))
    }
};

var FlowerCrop = $("FlowerCrop", {
    registerAsFlower: function(id, datas){
        for(var m = 0; m < datas; m++){
            ForestryAPI.BeeRegistry.FLOWERS_FLOWERS.push(id + ':' + m);
        }//TODO test flowers
    }
});

var HarvestcraftCrop = $("HarvestCraftCrop", {
    extends: NormalCrop,
    includes: [FlowerCrop],
    blockType: CommonCrop,
    maxSize: 2,
    particles: {
        count: 10,
        type: Native.ParticleType.happyVillager
    },
    growChanceViaFertilizer: CropsConfig.HarvestcraftCrop.growChance,
    growChance: CropsConfig.HarvestcraftCrop.ageSpeed,
    __load__: function(){
        let id = parseInt(this.blockID);
        if(ForestryAPI) this.registerAsFlower(id, 3);
        this.super.__load__();
    }
});
var HarvestcraftFruit = $("HarvestcraftFruit", {
    extends: HarvestcraftCrop,
    includes: [FlowerCrop],
    blockType: CommonSapling,
    side: 0,
    maxSize: 2,
    farmlands: [{id: 18, data: -1}],
    particles: {
        count: 10,
        type: Native.ParticleType.happyVillager
    },
    growChanceViaFertilizer: CropsConfig.HarvestcraftFruit.growChance,
    growChance: CropsConfig.HarvestcraftFruit.ageSpeed,
    __load__: function(){
        let id = parseInt(this.blockID);
        if(ForestryAPI) this.registerAsFlower(id, 3);
        this.super.__load__();
    }
});

var HarvestcraftGarden = $("HarvestcraftGarden", {
    extends: NormalBush,
    includes: [FlowerCrop],
    blockType: CommonSapling,
    farmlands: [{id: 60, data: -1}, {id: 2, data: -1}, {id: 3, data: -1}],
    maxSize: 1,
    __load__: function(){
        let id = parseInt(this.blockID);
        if(ForestryAPI) this.registerAsFlower(id, 1);
        this.super.__load__();
    }
});

var HarvestcraftAridGarden = $("HarvestcraftAridGarden", {
    extends: NormalBush,
    blockType: CommonSapling,
    farmlands: [{id: 12, data: -1}],
    maxSize: 1,
    __load__: function(){
        let id = parseInt(this.blockID);
        if(ForestryAPI) this.registerAsFlower(id, 1);
        this.super.__load__();
    },
    registerAsFlower: function(id, datas){
        for(var m = 0; m < datas; m++){
            ForestryAPI.BeeRegistry.FLOWERS_CACTI.push(id + ':' + m);
        }
    }
});

let HarvestcraftSapling = $("HarvestcraftSapling", {
    extends: PuttableCrop,
    includes: [CropFertilizer, InterfaceCrop, CropParticles, FlowerCrop],

    blockType: CommonSapling,
    farmlands: [{id: 60, data: -1}, {id: 2, data: -1}, {id: 3, data: -1}],

    growChanceViaFertilizer: CropsConfig.HarvestcraftSapling.growChance,
    growChance: CropsConfig.HarvestcraftSapling.ageSpeed,

    maxSize: 1,

    click: function(coords, item, block){
        if(this.isFertilizer(item)){
            this.emitParticles(coords.x, coords.y, coords.z);
            if(this.isReadyForFertilize(block)){
                this.grow(coords.x, coords.y, coords.z);
            }
        }
    },
//! emergency crutch. sorry...
    isReadyForFertilize: function(block){
        if(Math.random() < CropsConfig.HarvestcraftSapling.growChance) return true;
        return false;
    },
//! emergency crutch again. sorry...
    randomTick: function(x, y, z){
        this.checkFarmland(x, y, z);
        if(Math.random() < CropsConfig.HarvestcraftSapling.ageSpeed) this.grow(x, y, z);
    },

    canGrow: function(x, y, z){
        return true
    },

    grow: function(x, y, z){
        let tree = TreeRegistry.getTreeFromSaplingBlock(parseInt(this.blockID));
        TreeRegistry.deployTree(x, y, z, tree);
        return true
    },

    destroyBlock: function(coords, block, player){
        this.checkFarmlandDestroy(coords, block);
        if(block.id == parseInt(this.blockID)){
            let seed = this.params.seed;
            World.drop(coords.x, coords.y, coords.z, seed.id, 1, 0);
        }
    },

    checkFarmlandDestroy: function(coords, block){
        let side = this.getSide();
        if(!(this.isFarmland(block) && side)) return;

        let relCoords = World.getRelativeCoords(coords.x, coords.y, coords.z, side);
        let relBlock = World.getBlock(relCoords.x, relCoords.y, relCoords.z);
        if(relBlock.id == parseInt(this.blockID)){
            World.destroyBlock(relCoords.x, relCoords.y, relCoords.z);
            this.destroyBlock(relCoords, relBlock, null);
        }
    },

    __load__:function(){
        this.super.__load__();
        let id = parseInt(this.blockID);
        if(ForestryAPI) this.registerAsFlower(id, 1);

        let self = this;
        Block.registerDropFunctionForID(parseInt(this.blockID), function(){
            return [];
        });

        Callback.addCallback("ItemUse", function(coords, item, block){
            if(block.id != parseInt(self.blockID)) return;
            self.click(coords, item, block);
        });

        Block.setRandomTickCallback(parseInt(self.blockID), function(x, y, z){
            self.randomTick(x, y, z, self.getSide());
        });

        Callback.addCallback("DestroyBlock", function(coords, block, player){
            self.destroyBlock(coords, block, player);
        });
    }
});




// file: API/TreeClasses.js

//MIDDLE
TreeRegistry.registerClass("Harvestcraft_middleFruitTree");
TreeRegistry.registerClassConfig("Harvestcraft_middleFruitTree",{
    fruitCount:7
});

var standartHarvestCraftTreePrototype = TreeRegistry.generateStandartTreePrototypeWithParams({leaves:{id:18,data:0},wood:{id:17,data:0}});

TreeRegistry.registerClassPrototype("Harvestcraft_middleFruitTree",standartHarvestCraftTreePrototype);

//JUNGLE
TreeRegistry.registerClass("Harvestcraft_jungleFruitTree");
TreeRegistry.registerClassConfig("Harvestcraft_jungleFruitTree",{
    fruitCount:5
});

var jungleHarvestCraftTreePrototype = TreeRegistry.generateStandartTreePrototypeWithParams({leaves:{id:18,data:3},wood:{id:17,data:3}});

TreeRegistry.registerClassPrototype("Harvestcraft_jungleFruitTree",jungleHarvestCraftTreePrototype);


//TAIGA
TreeRegistry.registerClass("Harvestcraft_taigaFruitTree");
TreeRegistry.registerClassConfig("Harvestcraft_taigaFruitTree",{
    fruitCount:4
});

var taigaHarvestCraftTreePrototype = TreeRegistry.generateStandartTreePrototypeWithParams({leaves:{id:18,data:4},wood:{id:162,data:0}});

TreeRegistry.registerClassPrototype("Harvestcraft_taigaFruitTree",taigaHarvestCraftTreePrototype);




// file: API/shared.js

ModAPI.registerAPI("HarvestAPI", {});




// file: translation.js

﻿Translation.addTranslation("Cutting board", {ru: " Разделочная доска", zh:"切肉板" });
Translation.addTranslation("Pot", {ru: "Чаша",zh:"罐"});
Translation.addTranslation("Skillet", {ru: "Сковорода",zh:"平底锅"});
Translation.addTranslation("Saucepan", {ru: "Кастрюля",zh:"炖锅"});
Translation.addTranslation("Bakeware", {ru: "Протвень для выпекания",zh:"烤盘"});
Translation.addTranslation("Mixing bowl", {ru: "Чаща для смешивания",zh:"搅拌钵"});
Translation.addTranslation("Mortar bowl", {ru: "Пестик и ступка",zh:"研钵及研杵"});
Translation.addTranslation("Juicer", {ru: "Соковыжималка",zh:"榨汁机"});
Translation.addTranslation("Toast", {ru: "Тост",zh:"烤面包"});
Translation.addTranslation("Raspberry juice", {ru: "Малиновый сок",zh:"树莓汁"});
Translation.addTranslation("Cranberry juice", {ru: "Клюквенный сок",zh:"蔓越莓汁"});
Translation.addTranslation("Blackberry juice", {ru: "Черничный сок",zh:"黑莓汁"});
Translation.addTranslation("Grape juice", {ru: "Виноградный сок",zh:"葡萄汁"});
Translation.addTranslation("Melon juice", {ru: "Арбузный сок",zh:"西瓜汁"});
Translation.addTranslation("Blueberry juice", {ru: "Сок из голубики",zh:"蓝莓汁"});
Translation.addTranslation("Carrot juice", {ru: "Морковный сок",zh:"胡萝卜汁"});
Translation.addTranslation("Apple juice", {ru: "Яблочный сок",zh:"苹果汁"});
Translation.addTranslation("Cocoa powder", {ru: "Какао порошок",zh:"可可豆粉"});
Translation.addTranslation("Chocolate milk", {ru: "Шоколадное молоко",zh:"巧克力牛奶"});
Translation.addTranslation("Strawberry smoothie", {ru: "Клубничный смузи",zh:"草莓冰沙"});
Translation.addTranslation("Raspberry smoothie", {ru: "Малиновый смузи",zh:"树莓冰沙"});
Translation.addTranslation("Blackberry smoothie", {ru: "Черничный смузи",zh:"黑莓冰沙"});
Translation.addTranslation("Blueberry smoothie", {ru: "Смузи из черники",zh:"蓝莓冰沙"});
Translation.addTranslation("Melon smoothie", {ru: "Арбузный смузи",zh:"西瓜冰沙"});
Translation.addTranslation("Plain yogurt", {ru: "Йогурт",zh:"原味酸奶酪"});
Translation.addTranslation("Strawberry yogurt", {ru: "Клубничный йогурт",zh:"草莓酸奶酪"});
Translation.addTranslation("Raspberry yogurt", {ru: "Малиновый йогурт",zh:"树莓酸奶酪"});
Translation.addTranslation("Grape yogurt", {ru: "Виноградный йогурт",zh:"葡萄酸奶酪"});
Translation.addTranslation("Apple yogurt", {ru: "Яблочный йогурт",zh:"苹果酸奶酪"});
Translation.addTranslation("Blackberry yogurt", {ru: "Йогурт из черники",zh:"黑莓酸奶酪"});
Translation.addTranslation("Blueberry yogurt", {ru: "Йогурт из голубики",zh:"蓝莓酸奶酪"});
Translation.addTranslation("Pumpkin yogurt", {ru: "Тыквенный йогурт",zh:"南瓜酸奶酪"});
Translation.addTranslation("Melon yogurt", {ru: "Абрузный йогурт",zh:"西瓜酸奶酪"});
Translation.addTranslation("Chocolate yogurt", {ru: "Шоколадный йогурт",zh:"巧克力酸奶酪"});
Translation.addTranslation("Espresso", {ru: "Эспрессо",zh:"特浓咖啡"});
Translation.addTranslation("Hot chocolate", {ru: "Горячий шоколад",zh:"热巧克力"});
Translation.addTranslation("Vinegar", {ru: "Укус",zh:"醋"});
Translation.addTranslation("Сheese", {ru: "Сыр",zh:"奶酪"});
Translation.addTranslation("Beet salad", {ru: "Салат из свеклы",zh:"甜菜色拉"});
Translation.addTranslation("Fruit salad", {ru: "Фруктовый салат",zh:"水果色拉"});
Translation.addTranslation("Spring salad", {ru: "Весенний салат",zh:"蔬菜色拉"});
Translation.addTranslation("Cucumber salad", {ru: "Огуречный салат",zh:"黄瓜色拉"});
Translation.addTranslation("Ceasar salade", {ru: "Салат Цезарь",zh:"凯撒色拉"});
Translation.addTranslation("Stock", {ru: "Бульон",zh:"高汤"});
Translation.addTranslation("Pot roast", {ru: "Тушеное мясо",zh:"红烧牛肉"});
Translation.addTranslation("Vegetable soup", {ru: "Овощной суп",zh:"蔬菜汤"});
Translation.addTranslation("Heavy cream", {ru: "Жирные сливки",zh:"多脂奶油"});
Translation.addTranslation("Pumpkin soup", {ru: "Суп из тыквы",zh:"南瓜汤"});
Translation.addTranslation("Cornflakes", {ru: "Кукурузные хлопья",zh:"玉米片"});
Translation.addTranslation("Fried egg", {ru: "Жаренное яйцо",zh:"煎蛋"});
Translation.addTranslation("Boiled egg", {ru: "Вареное яйцо",zh:"水煮鸡蛋"});
Translation.addTranslation("Pancakes", {ru: "Блины",zh:"煎饼"});
Translation.addTranslation("Dough", {ru: "Тесто",zh:"面团"});
Translation.addTranslation("Cranberry bar", {ru: "Клюквенный батончик",zh:"蔓越莓棒"});
Translation.addTranslation("Pizza", {ru: "Пицца",zh:"披萨"});
Translation.addTranslation("Fries", {ru: "Картофель фри",zh:"炸薯条"});
Translation.addTranslation("Breaded porkchop", {ru: "Панированная свинная отбивная",zh:"猪排面包"});
Translation.addTranslation("Butter", {ru: "Масло",zh:"黄油"});
Translation.addTranslation("Hot wings", {ru: "Горячие крылья",zh:"香辣鸡翅"});
Translation.addTranslation("Mayo", {ru: "Майонез",zh:"蛋黄酱"});
Translation.addTranslation("Fish dinner", {ru: "Рыбный ужин",zh:"鲜鱼晚宴"});
Translation.addTranslation("Potato cakes", {ru: "Картофельные пирожные",zh:"马铃薯蛋糕"});
Translation.addTranslation("Hearty breakfast", {ru: "Сердечный завтрак",zh:"丰盛早餐"});
Translation.addTranslation("Steak and chips", {ru: "Стейк и чипсы",zh:"牛排和薯条"});
Translation.addTranslation("Roast chicken", {ru: "Жаренный цыпленок",zh:"烤鸡"});
Translation.addTranslation("Roast potatoes", {ru: "Жареная картошка",zh:"烤马铃薯"});
Translation.addTranslation("Sunday roast", {ru: "Воскресный обед",zh:"烤肉"});
Translation.addTranslation("Lamb with mint sauce", {ru: "Ягненок с мятным соусом",zh:"薄荷酱羊肉"});
Translation.addTranslation("Meaty stew", {ru: "Мясное рагу",zh:"肉汤"});
Translation.addTranslation("Chocolate bar", {ru: "Шоколадный батончик",zh:"巧克力条"});
Translation.addTranslation("Chaos cookie", {ru: "Хаос печенье",zh:"卡俄斯曲奇饼"});
Translation.addTranslation("Blueberry pie", {ru: "Пирог с голубикой",zh:"蓝莓派"});
Translation.addTranslation("Waffles", {ru: "Вафли",zh:"华夫饼"});
Translation.addTranslation("Strawberry", {ru: "Земляника",zh:"草莓"});
Translation.addTranslation("Raspberry", {ru: "Малина",zh:"树莓"});
Translation.addTranslation("Cranberry", {ru: "Клюква",zh:"蔓越莓"});
Translation.addTranslation("Blueberry", {ru: "Голубика",zh:"蓝莓"});
Translation.addTranslation("Blackberry", {ru: "Черника",zh:"黑莓"});
Translation.addTranslation("Grape", {ru: "Виноград",zh:"葡萄"});
Translation.addTranslation("Cucumber", {ru: "Огурец",zh:"黄瓜"});
Translation.addTranslation("Onion", {ru: "Лук",zh:"洋葱"});
Translation.addTranslation("Cabbage", {ru: "Капуста",zh:"卷心菜"});
Translation.addTranslation("Tomato", {ru: "Помидор",zh:"番茄"});
Translation.addTranslation("Bellpepper", {ru: "Болгарский перец",zh:"甜椒"});
Translation.addTranslation("Garlic", {ru: "Чеснок",zh:"大蒜"});
Translation.addTranslation("Lettuce", {ru: "Салат",zh:"生菜"});
Translation.addTranslation("Coffee beans", {ru: "Кофейные зерна",zh:"咖啡豆"});
Translation.addTranslation("Peas", {ru: "Горох",zh:"豌豆"});
Translation.addTranslation("Chilli pepper", {ru: "Перец чили",zh:"红辣椒"});
Translation.addTranslation("Spice leaf", {ru: "Лист специй",zh:"香料叶"});
Translation.addTranslation("Corn", {ru: "Кукуруза",zh:"玉米"});
Translation.addTranslation("Peppercorn", {ru: "Перчинка",zh:"胡椒"});
Translation.addTranslation("Black pepper", {ru: "Черный перец",zh:"黑胡椒"});
Translation.addTranslation("Fresh water", {ru: "Свежая вода",zh:"淡水"});
Translation.addTranslation("Fresh milk", {ru: "Свежее молоко",zh:"鲜牛奶"});
Translation.addTranslation("Salt", {ru: "Соль",zh:"盐"});
Translation.addTranslation("Flour", {ru: "Мука",zh:"面粉"});
Translation.addTranslation("Strawberry Seed", {ru: "Семя клубники",zh:"草莓种子"});
Translation.addTranslation("Raspberry Seed", {ru: "Семя малины",zh:"树莓种子"});
Translation.addTranslation("Cranberry Seed", {ru: "Семя клюквы",zh:"蔓越莓种子"});
Translation.addTranslation("Blueberry Seed", {ru: "Семя голубики",zh:"蓝莓种子"});
Translation.addTranslation("Blackberry Seed", {ru: "Семя черники",zh:"黑莓种子"});
Translation.addTranslation("Candle berry Seed", {ru: "Семя свечной ягоды",zh:"蜡杨梅种子"});
Translation.addTranslation("Grape Seed", {ru: "Семя винограда",zh:"葡萄种子"});
Translation.addTranslation("Cucumber Seed", {ru: "Семя огурца",zh:"黄瓜种子"});
Translation.addTranslation("Onion Seed", {ru: "Семя лука",zh:"洋葱种子"});
Translation.addTranslation("Cabbage Seed", {ru: "Семя капусты",zh:"卷心菜种子"});
Translation.addTranslation("Tomato Seed", {ru: "Семя помидора",zh:"番茄种子"});
Translation.addTranslation("Bellpepper Seed", {ru: "Семя Болгарского перца",zh:"甜椒种子"});
Translation.addTranslation("Garlic Seed", {ru: "Семя чеснока",zh:"大蒜种子"});
Translation.addTranslation("Lettuce Seed", {ru: "Семя салата",zh:"生菜种子"});
Translation.addTranslation("Coffee Seed", {ru: "Семя кофейного дерева",zh:"咖啡种子"});
Translation.addTranslation("Peas Seed", {ru: "Семя гороха",zh:"豌豆种子"});
Translation.addTranslation("Chilli pepper Seed", {ru: "Семя перца чили",zh:"红辣椒种子"});
Translation.addTranslation("Spice leaf Seed", {ru: "Семя листа специй",zh:"香料叶种子"});
Translation.addTranslation("Corn Seed", {ru: "Семя кукурузы",zh:"玉米种子"});
Translation.addTranslation("Peppercorn Seed", {ru: "Семя чёрного перца",zh:"胡椒种子"});
Translation.addTranslation("Grass Garden", {ru: "Лекарственный куст",zh:"草丛"});
Translation.addTranslation("Herb Garden", {ru: "Травяной сад",zh:"草药丛"});
Translation.addTranslation("Berry Garden", {ru: "Ягодный сад",zh:"野果丛"});
Translation.addTranslation("Salt", {ru: "Соль",zh:"盐"});
Translation.addTranslation("Apple Tree Sapling", {ru: "Саженец яблони",zh:"苹果树苗"});
Translation.addTranslation("Sink",   {ru:"Бочка для воды",zh:"水桶"});
Translation.addTranslation("Sink 1", {ru:"Каменный резервуар",zh:"石罐"});
Translation.addTranslation("Sink 2", {ru:"Глиняный кувшин",zh:"陶罐"});
Translation.addTranslation("Sink 3", {ru:"Кирпичный колодец",zh:"砖井"});
Translation.addTranslation("Fish trap", {ru:"Ловушка для рыбы",zh:"捕鱼笼"});
Translation.addTranslation("Animal trap", {ru:"Ловушка для зверей",zh:"捕兽笼"});
Translation.addTranslation("Harded Leather Helmet", {ru:"Шлем из прочной кожи",zh:"硬化皮革头盔"});
Translation.addTranslation("Harded Leather Chestplate", {ru:"Кираса из прочной кожи",zh:"硬化皮革胸甲"});
Translation.addTranslation("Harded Leather Leggings", {ru:"Поножи из прочной кожи",zh:"硬化皮革护腿"});
Translation.addTranslation("Harded Leather Boots", {ru:"Ботинки из прочной кожи",zh:"硬化皮革鞋子"});
Translation.addTranslation("Grain bait", {ru: "Семечковая приманка",zh:"谷物诱饵"});
Translation.addTranslation("Fruit bait", {ru: "Фруктовая приманка",zh:"水果诱饵"});
Translation.addTranslation("Veggie bait", {ru: "Овощная приманка",zh:"蔬菜诱饵"});
Translation.addTranslation("Curryleaf", {ru: "Японское карри",zh:"咖喱叶"});
Translation.addTranslation("Curry Powder", {ru: "Порошок карри",zh:"咖喱粉"});
Translation.addTranslation("Curryleaf Seed", {ru: "Семя японского карри",zh:"咖喱叶种子"});
Translation.addTranslation("Raw venison", {ru: "Сырая оленина",zh:"生鹿肉"});
Translation.addTranslation("Cooked venison", {ru: "Приготовленная оленина",zh:"熟鹿肉"});
Translation.addTranslation("Raw turkey", {ru: "Сырая индейка",zh:"生火鸡"});
Translation.addTranslation("Cooked turkey", {ru: "Приготовленная индейка",zh:"熟鹿肉"});
Translation.addTranslation("Spider Eye Soup", {ru: "Суп из глаза паука",zh:"蜘蛛眼汤"});
Translation.addTranslation("Zombie Jerky", {ru: "Вяленое мясо зомби",zh:"僵尸肉干"});
Translation.addTranslation("Curry powder", {ru: "Прошок японского карри",zh:"日式咖喱粉"});
Translation.addTranslation("Vindaloo", {ru: "Виндалу",zh:"印度咖喱肉"});
Translation.addTranslation("Sausage", {ru: "Колбаса",zh:"香肠"});
Translation.addTranslation("Wax", {ru: "Воск",zh:"蜡杨梅蜡"});
Translation.addTranslation("Harded leather", {ru: "Прочная кожа",zh:"硬化皮革"});
Translation.addTranslation("Candle", {ru: "Свеча",zh:"蜡烛"});
Translation.addTranslation("Candleberry Garden", {ru: "Куст свечной ягоды",zh:"蜡杨梅丛"});
Translation.addTranslation("Apple", {ru: "Яблоко",zh:"苹果"});
Translation.addTranslation("Pressed wax", {ru: "Прессованный воск",zh:"压缩蜡块"});
Translation.addTranslation("Candle berry", {ru: "Свечная ягода",zh:"蜡杨梅"});
Translation.addTranslation("Cashew chicken", {ru: "Курица кешью",zh:"腰果鸡"});
Translation.addTranslation("Chicken celery casserole", {ru: "Куриная запеканка с сельдереем",zh:"芹菜鸡肉砂锅菜"});
Translation.addTranslation("Chicken chowmein", {ru: "Китайское рагу из курицы",zh:"鸡球炒面"});
Translation.addTranslation("Cheese", {ru: "Сыр",zh:"奶酪"});
Translation.addTranslation("Chicken curry", {ru: "Куриное карри",zh:"鸡肉咖喱"});
Translation.addTranslation("Chicken gumbo", {ru: "Куриное гамбо",zh:"秋葵烩鸡"});
Translation.addTranslation("Chicken noodle soup", {ru: "Куриный суп с лапшой",zh:"鸡汤面"});
Translation.addTranslation("Chicken pot pie", {ru: "Куриный пирог в горшочке",zh:"鸡肉派"});
Translation.addTranslation("Chicken sandwich", {ru: "Куриный сэндвич",zh:"鸡肉三明治"});
Translation.addTranslation("Fried chicken", {ru: "Курица фри",zh:"炸鸡肉"});
Translation.addTranslation("Garlic chicken", {ru: "Курица с чесноком",zh:"大蒜鸡肉"});
Translation.addTranslation("General tso chicken", {ru: "Курица генерала ЦО",zh:"左宗棠鸡"});
Translation.addTranslation("Ginger chicken", {ru: "Имбирная курица",zh:"姜味鸡肉"});
Translation.addTranslation("Kung pao chicken", {ru: "Курица Кунг Пао",zh:"宫保鸡丁"});
Translation.addTranslation("Lemon chicken", {ru: "Курица с лемоном",zh:"柠檬鸡肉"});
Translation.addTranslation("Orange chicken", {ru: "Курица с апельсином",zh:"橙子鸡肉"});
Translation.addTranslation("Sweet and sour chicken", {ru: "Кисло-сладкая курица",zh:"糖醋鸡"});
Translation.addTranslation("Teriyaki chicken", {ru: "Курица Терияки",zh:"照烧鸡"});
Translation.addTranslation("Bacon and eggs", {ru: "Яйца с беконом",zh:"培根肉加荷包蛋"});
Translation.addTranslation("Baked ham", {ru: "Буженина",zh:"烤火腿"});
Translation.addTranslation("Honey glazed ham", {ru: "Медовая ветчина",zh:"蜜汁火腿"});
Translation.addTranslation("Honey soy ribs", {ru: "Соевые ребра с медом",zh:"蜜汁排骨"});
Translation.addTranslation("Hot and sour soup", {ru: "Горячий кислый суп",zh:"酸辣汤"});
Translation.addTranslation("Pea and ham soup", {ru: "Ветчина с персиком",zh:"豌豆火腿汤"});
Translation.addTranslation("Pineapple ham", {ru: "Ветчина с ананасом",zh:"菠萝火腿"});
Translation.addTranslation("Pork lo mein", {ru: "Свинина с лапшой",zh:"肉捞面"});
Translation.addTranslation("Spicy mustarg pork", {ru: "Свинина в острой горчице",zh:"辛辣芥末猪肉"});
Translation.addTranslation("Honey lemon lamb", {ru: "Медовая баранина с медом",zh:"蜜汁柠檬羔羊肉"});
Translation.addTranslation("Lamb barley soup", {ru: "Суп из баранины с ячменем",zh:"羊羔大麦汤"});
Translation.addTranslation("Shepards pie", {ru: "Пирог Шепарда",zh:"马铃薯肉饼"});
Translation.addTranslation("Beefjerky", {ru: "Вяленое мясо",zh:"牛肉干"});
Translation.addTranslation("Cotton", {ru: "Хлопок",zh:"棉花"});
Translation.addTranslation("Cotton Seed", {ru: "Семя хлопка",zh:"棉花种子"});
Translation.addTranslation("Cotton Garden", {ru: "Хлопковый куст",zh:"棉花丛"});
Translation.addTranslation("Strawberry juice", {ru: "Клубничный сок",zh:"草莓汁"});
Translation.addTranslation("Cornish Pasty", {ru: "Корниш-пасты",zh:"康沃尔菜肉馅饼"});
Translation.addTranslation("Maple Sausage", {ru: "Кленовая колбаса",zh:"枫糖香肠"});
Translation.addTranslation("Hamburger", {ru: "Гамбургер",zh:"汉堡包"});
Translation.addTranslation("Cottage Pie", {ru: "Коттеджный пирог",zh:"农舍派"});
Translation.addTranslation("Meat Pie", {ru: "Пирог с мясом",zh:"肉饼"});
Translation.addTranslation("Corned Beef", {ru: "Солонина",zh:"腌牛肉"});
Translation.addTranslation("Beef Wellington", {ru: "Биф Веллингтон",zh:"威灵顿牛排"});
Translation.addTranslation("Bean", {ru: "Бобы",zh:"大豆"});
Translation.addTranslation("Rice", {ru: "Рис",zh:"水稻"});
Translation.addTranslation("Water Chestnut", {ru: "Каштан",zh:"孛荠"});
Translation.addTranslation("Rutabaga", {ru: "Редис",zh:"芜菁甘蓝"});
Translation.addTranslation("Mustard Seeds", {ru: "Горчичные семена",zh:"芥末种子"});
Translation.addTranslation("Ginger", {ru: "Имбирь",zh:"姜"});
Translation.addTranslation("Spinach", {ru: "Шпинат",zh:"菠菜"});
Translation.addTranslation("Bean Seed", {ru: "Семя бобов",zh:"大豆种子"});
Translation.addTranslation("Rice Seed", {ru: "Семя риса",zh:"水稻种子"});
Translation.addTranslation("Water Chestnut Seed", {ru: "Семя каштана",zh:"孛荠种子"});
Translation.addTranslation("Rutabaga Seed", {ru: "Семя редиса",zh:"芜菁甘蓝种子"});
Translation.addTranslation("Mustard Seed", {ru: "Горчичное семя",zh:"芥末种子"});
Translation.addTranslation("Ginger Seed", {ru: "Семя имбиря",zh:"姜种子"});
Translation.addTranslation("Spinach Seed", {ru: "Семя шпината",zh:"菠菜种子"});
Translation.addTranslation("Meat Pie", {ru: "Мясной пирог",zh:"肉饼"});
Translation.addTranslation("Baked Beans", {ru: "Печеные бобы",zh:"烤大豆"});
Translation.addTranslation("Dim Sum", {ru: "Дим-Сам",zh:"点心"});
////////////////////////////////
Translation.addTranslation("Apricot", {ru: "Абрикос",zh:"杏子"});
Translation.addTranslation("Cherry", {ru: "Вишня",zh:"樱桃"});
Translation.addTranslation("Avocado", {ru: "Авокадо",zh:"牛油果"});
Translation.addTranslation("Banana", {ru: "Банан",zh:"香蕉"});
Translation.addTranslation("Date", {ru: "Финик",zh:"枣椰"});
Translation.addTranslation("Dragonfruit", {ru: "Питайа",zh:"火龙果"});
Translation.addTranslation("Fig", {ru: "Инжир",zh:"无花果"});
Translation.addTranslation("Grapefruit", {ru: "Грейпфрут",zh:"葡萄柚"});
Translation.addTranslation("Gooseberry", {ru: "Крыжовник",zh:"醋栗"});
Translation.addTranslation("Lemon", {ru: "Лимон",zh:"柠檬"});
Translation.addTranslation("Lime", {ru: "Лайм",zh:"青柠"});
Translation.addTranslation("Mango", {ru: "Манго",zh:"芒果"});
Translation.addTranslation("Olive", {ru: "Олива",zh:"橄榄"});
Translation.addTranslation("Orange", {ru: "Апельсин",zh:"橙子"});
Translation.addTranslation("Papaya", {ru: "Папайа",zh:"木瓜"});
Translation.addTranslation("Peach", {ru: "Персик",zh:"桃子"});
Translation.addTranslation("Pear", {ru: "Груша",zh:"梨"});
Translation.addTranslation("Persimmon", {ru: "Хурма",zh:"柿子"});
Translation.addTranslation("Plum", {ru: "Слива",zh:"李子"});
Translation.addTranslation("Pomegranate", {ru: "Гранат",zh:"石榴"});
Translation.addTranslation("Starfruit", {ru: "Карамбола",zh:"杨桃"});
Translation.addTranslation("Almond", {ru: "Миндаль",zh:"杏仁"});
Translation.addTranslation("Cashew", {ru: "Кешью",zh:"腰果"});
Translation.addTranslation("Coconut", {ru: "Кокос",zh:"椰子"});
Translation.addTranslation("Cactusfruit", {ru: "Плод кактуса",zh:"仙人掌果"});
Translation.addTranslation("Cantaloupe", {ru: "Канталупа",zh:"哈密瓜"});
Translation.addTranslation("Kiwi", {ru: "Киви",zh:"猕猴桃"});
Translation.addTranslation("Pineapple", {ru: "Ананас",zh:"菠萝"});
Translation.addTranslation("Artichoke", {ru: "Артишок",zh:"菜蓟"});
Translation.addTranslation("Asparagus", {ru: "Спаржа",zh:"芦笋"});
Translation.addTranslation("Bambooshoot", {ru: "Бамбуковый побег",zh:"竹笋"});
Translation.addTranslation("Broccoli", {ru: "Брокколи",zh:"西兰花"});
Translation.addTranslation("Brusselsprout", {ru: "Брюссельская капуста",zh:"抱子甘蓝"});
Translation.addTranslation("Cauliflower", {ru: "Цветная капуста",zh:"花椰菜"});
Translation.addTranslation("Celery", {ru: "Сельдерей",zh:"芹菜"});
Translation.addTranslation("Radish", {ru: "Редис",zh:"白萝卜"});
Translation.addTranslation("Eggplant", {ru: "Баклажан",zh:"茄子"});
Translation.addTranslation("Leek", {ru: "Лук-порей",zh:"韭葱"});
Translation.addTranslation("Okra", {ru: "Окра",zh:"秋葵"});
Translation.addTranslation("Parsnip", {ru: "Пастернак",zh:"欧洲萝卜"});
Translation.addTranslation("Rhubarb", {ru: "Ревень",zh:"大黄"});
Translation.addTranslation("Scallion", {ru: "Лук-шалот",zh:"青葱"});
Translation.addTranslation("Soybean", {ru: "Соевые бобы",zh:"黄豆"});
Translation.addTranslation("Sweet Potato", {ru: "Сладкий картофель",zh:"番薯"});
Translation.addTranslation("Turnip", {ru: "Репа",zh:"大头菜"});
Translation.addTranslation("Peanut", {ru: "Арахис",zh:"花生"});
Translation.addTranslation("Rye", {ru: "Рожь",zh:"黑麦"});
Translation.addTranslation("Zucchini", {ru: "Цуккини",zh:"西葫芦"});
Translation.addTranslation("Barley", {ru: "Ячмень",zh:"大麦"});
Translation.addTranslation("Oats", {ru: "Овёс",zh:"燕麦"});
Translation.addTranslation("Beet", {ru: "Свёкла",zh:"甜菜"});
Translation.addTranslation("Wintersquash", {ru: "Зимняя тыква",zh:"笋瓜"});
Translation.addTranslation("Tea leaf", {ru: "Чайный лист",zh:"茶叶"});
Translation.addTranslation("Apricot smoothie", {ru: "Абрикосовый смузи",zh:"杏仁冰沙"});
Translation.addTranslation("Pina collada", {ru: "Пинья колада",zh:"冰镇果汁朗姆酒"});
Translation.addTranslation("Cherry smoothie", {ru: "Вишневый смузи",zh:"樱桃冰沙"});
Translation.addTranslation("Banana smoothie", {ru: "Банановый смузи",zh:"香蕉冰沙"});
Translation.addTranslation("Banana milkshake", {ru: "Банановый молочный коктель",zh:"香蕉奶昔"});
Translation.addTranslation("Goosseberry milkshake", {ru: "Крыжовниковый молочный коктель",zh:"醋栗奶昔"});
Translation.addTranslation("Fig smoothie", {ru: "Фиговый смузи",zh:"无花果冰沙"});
Translation.addTranslation("Gooseberry smoothie", {ru: "Крыжовниковый смузи",zh:"醋栗冰沙"});
Translation.addTranslation("Lemon smoothie", {ru: "Лимонный смузи",zh:"柠檬冰沙"});
Translation.addTranslation("Lime smoothie", {ru: "Лаймовый смузи",zh:"青柠冰沙"});
Translation.addTranslation("Mango smoothie", {ru: "Манговый смузи",zh:"芒果冰沙"});
Translation.addTranslation("Orange smoothie", {ru: "Апельсиновый смузи",zh:"橙子冰沙"});
Translation.addTranslation("Papaya smoothie", {ru: "Смузи из папайи",zh:"木瓜冰沙"});
Translation.addTranslation("Peach smoothie", {ru: "Персиковый смузи",zh:"桃子冰沙"});
Translation.addTranslation("Pear smoothie", {ru: "Грушевый смузи",zh:"梨冰沙"});
Translation.addTranslation("Persimmon smoothie", {ru: "Хурмовый смузи",zh:"柿子冰沙"});
Translation.addTranslation("Plum smoothie", {ru: "Сливовый смузи",zh:"李子冰沙"});
Translation.addTranslation("Pomegranate smoothie", {ru: "Гранатовый смузи",zh:"石榴冰沙"});
Translation.addTranslation("Starfruit smoothie", {ru: "Смузи из карамболы",zh:"杨桃冰沙"});
Translation.addTranslation("Coconut smoothie", {ru: "Кокосовый смузи",zh:"椰子冰沙"});
Translation.addTranslation("Apricot jelly", {ru: "Абрикосовое желе",zh:"杏桃果酱"});
Translation.addTranslation("Cherry jelly", {ru: "Вишневый желе",zh:"樱桃果酱"});
Translation.addTranslation("Fig jelly", {ru: "Фиговый желе",zh:"无花果酱"});
Translation.addTranslation("Grapefruit jelly", {ru: "Грейпфрутовое желе",zh:"葡萄柚果酱"});
Translation.addTranslation("Gooseberry jelly", {ru: "Желе из крыжовника",zh:"醋栗果酱"});
Translation.addTranslation("Lemon jelly", {ru: "Лимонное желе",zh:"柠檬果酱"});
Translation.addTranslation("Lime jelly", {ru: "Лаймовое желе",zh:"青柠果酱"});
Translation.addTranslation("Mango jelly", {ru: "Желе из манго",zh:"芒果果酱"});
Translation.addTranslation("Orange jelly", {ru: "Апельсиновое желе",zh:"橙子果酱"});
Translation.addTranslation("Papaya jelly", {ru: "Желе из папайи",zh:"木瓜果酱"});
Translation.addTranslation("Peach jelly", {ru: "Персиковое желе",zh:"桃子果酱"});
Translation.addTranslation("Pear jelly", {ru: "Желе из груши",zh:"梨果酱"});
Translation.addTranslation("Persimmon jelly", {ru: "Хурмовое желе",zh:"柿子果酱"});
Translation.addTranslation("Plum jelly", {ru: "Сливовое желе",zh:"李子果酱"});
Translation.addTranslation("Pomegranate jelly", {ru: "Гранатовое желе",zh:"石榴果酱"});
Translation.addTranslation("Starfruit jelly", {ru: "Желе из карамболы",zh:"杨桃果酱"});
Translation.addTranslation("Coconut jelly", {ru: "Кокосовое желе",zh:"椰子果酱"});
Translation.addTranslation("Apricot juice", {ru: "Абрикосовый сок",zh:"杏子汁"});
Translation.addTranslation("Cherry juice", {ru: "Вишневый сок",zh:"樱桃汁"});
Translation.addTranslation("Fig juice", {ru: "Фиговый сок",zh:"无花果汁"});
Translation.addTranslation("Grapefruit juice", {ru: "Грейпфрутовый сок",zh:"葡萄柚果汁"});
Translation.addTranslation("Lemonade", {ru: "Лимонад",zh:"柠檬水"});
Translation.addTranslation("Lime juice", {ru: "Лаймовый сок",zh:"青柠汁"});
Translation.addTranslation("Mango juice", {ru: "Сок из манго",zh:"芒果汁"});
Translation.addTranslation("Orange juice", {ru: "Апельсиновый сок",zh:"橙子汁"});
Translation.addTranslation("Papaya juice", {ru: "Сок из папайи",zh:"木瓜汁"});
Translation.addTranslation("Peach juice", {ru: "Персиковый сок",zh:"桃子汁"});
Translation.addTranslation("Pear juice", {ru: "Сок из груши",zh:"梨汁"});
Translation.addTranslation("Persimmon juice", {ru: "Хурмовый сок",zh:"柿子汁"});
Translation.addTranslation("Plum juice", {ru: "Сливовый сок",zh:"李子汁"});
Translation.addTranslation("Pomegranate juice", {ru: "Гранатовый сок",zh:"石榴汁"});
Translation.addTranslation("Starfruit juice", {ru: "Сок из карамболы",zh:"杨桃汁"});
Translation.addTranslation("Coconut milk", {ru: "Кокосовое молоко",zh:"椰子汁"});
Translation.addTranslation("Pineapple yogurt", {ru: "Ананасовый йогурт",zh:"菠萝酸奶酪"});
Translation.addTranslation("Apricot yogurt", {ru: "Абрикосовый йогурт",zh:"杏仁酸奶酪"});
Translation.addTranslation("Cherry yogurt", {ru: "Вишневый йогурт",zh:"樱桃酸奶酪"});
Translation.addTranslation("Banana yogurt", {ru: "Банановый йогурт",zh:"香蕉酸奶酪"});
Translation.addTranslation("Fig yogurt", {ru: "Фиговый йогурт",zh:"无花果酸奶酪"});
Translation.addTranslation("Grapefruit yogurt", {ru: "Грейпфрутовый йогурт",zh:"葡萄柚酸奶酪"});
Translation.addTranslation("Gooseberry yogurt", {ru: "Йогурт из крыжовника",zh:"醋栗酸奶酪"});
Translation.addTranslation("Lemon yogurt", {ru: "Лимонный йогурт",zh:"柠檬酸奶酪"});
Translation.addTranslation("Lime yogurt", {ru: "Лаймовый йогурт",zh:"青柠酸奶酪"});
Translation.addTranslation("Mango yogurt", {ru: "Йогурт из манго",zh:"芒果酸奶酪"});
Translation.addTranslation("Orange yogurt", {ru: "Апельсиновый йогурт",zh:"橙子酸奶酪"});
Translation.addTranslation("Papaya yogurt", {ru: "Йогурт из папайи",zh:"木瓜酸奶酪"});
Translation.addTranslation("Peach yogurt", {ru: "Персиковый йогурт",zh:"桃子酸奶酪"});
Translation.addTranslation("Pear yogurt", {ru: "Йогурт из груши",zh:"梨酸奶酪"});
Translation.addTranslation("Persimmon yogurt", {ru: "Хурмовый йогурт",zh:"柿子酸奶酪"});
Translation.addTranslation("Plum yogurt", {ru: "Сливовый йогурт",zh:"李子酸奶酪"});
Translation.addTranslation("Pomegranate yogurt", {ru: "Гранатовый йогурт",zh:"石榴酸奶酪"});
Translation.addTranslation("Starfruit yogurt", {ru: "Йогурт из карамболы",zh:"杨桃酸奶酪"});
Translation.addTranslation("Coconut yogurt", {ru: "Кокосовый йогурт",zh:"椰子酸奶酪"});
Translation.addTranslation("Cactusfruit Seed", {ru: "Семя кактуса",zh:"仙人掌果种子"});
Translation.addTranslation("Cantaloupe Seed", {ru: "Семя канталупы",zh:"哈密瓜种子"});
Translation.addTranslation("Kiwi Seed", {ru: "Семя киви",zh:"猕猴桃种子"});
Translation.addTranslation("Pineapple Seed", {ru: "Семя ананаса",zh:"菠萝种子"});
Translation.addTranslation("Artichoke Seed", {ru: "Семя артишока",zh:"菜蓟种子"});
Translation.addTranslation("Asparagus Seed", {ru: "Семя спаржи",zh:"芦笋种子"});
Translation.addTranslation("Bambooshoot Seed", {ru: "Семя бамбукового побега",zh:"竹笋种子"});
Translation.addTranslation("Broccoli Seed", {ru: "Семя броколли",zh:"西兰花种子"});
Translation.addTranslation("Brusselsprout Seed", {ru: "Семя брюссельской капусты",zh:"抱子甘蓝种子"});
Translation.addTranslation("Cauliflower Seed", {ru: "Семя цветной капусты",zh:"花椰菜种子"});
Translation.addTranslation("Celery Seed", {ru: "Семя сельдерея",zh:"芹菜种子"});
Translation.addTranslation("Radish Seed", {ru: "Семя редиса",zh:"白萝卜种子"});
Translation.addTranslation("Eggplant Seed", {ru: "Семя баклажана",zh:"茄子种子"});
Translation.addTranslation("Leek Seed", {ru: "Семя лука-порея",zh:"韭葱种子"});
Translation.addTranslation("Okra Seed", {ru: "Семя окры",zh:"秋葵种子"});
Translation.addTranslation("Parsnip Seed", {ru: "Семя пастернака",zh:"欧洲萝卜种子"});
Translation.addTranslation("Rhubarb Seed", {ru: "Семя ревеня",zh:"大黄种子"});
Translation.addTranslation("Scallion Seed", {ru: "Семя лука-шалота",zh:"青葱种子"});
Translation.addTranslation("Soybean Seed", {ru: "Семя соевого боба",zh:"黄豆种子"});
Translation.addTranslation("Sweet Potato Seed", {ru: "Семя сладкого картофеля",zh:"番薯种子"});
Translation.addTranslation("Turnip Seed", {ru: "Семя репы",zh:"大头菜种子"});
Translation.addTranslation("Peanut Seed", {ru: "Семя арахиса",zh:"花生种子"});
Translation.addTranslation("Rye Seed", {ru: "Семя ржи",zh:"黑麦种子"});
Translation.addTranslation("Zucchini Seed", {ru: "Семя цуккини",zh:"西葫芦种子"});
Translation.addTranslation("Barley Seed", {ru: "Семя ячменя",zh:"大麦种子"});
Translation.addTranslation("Oats Seed", {ru: "Семя овса",zh:"燕麦种子"});
Translation.addTranslation("Wintersquash Seed", {ru: "Семя зимней тыквы",zh:"笋瓜种子"});
Translation.addTranslation("Tealeaf Seed", {ru: "Семя чайного листа",zh:"茶叶种子"});
Translation.addTranslation("Beet Seed", {ru: "Семя свёклы",zh:"甜菜种子"});
Translation.addTranslation("Apricot Tree Sapling", {ru: "Саженец абрикоса",zh:"杏树苗"});
Translation.addTranslation("Cherry Tree Sapling", {ru: "Саженец вишни",zh:"樱桃树苗"});
Translation.addTranslation("Avocado Tree Sapling", {ru: "Саженец авокадо",zh:"牛油果树苗"});
Translation.addTranslation("Banana Tree Sapling", {ru: "Саженец банана",zh:"香蕉树苗"});
Translation.addTranslation("Date Tree Sapling", {ru: "Саженец финика",zh:"枣椰树苗"});
Translation.addTranslation("Dragonfruit Tree Sapling", {ru: "Саженец питайи",zh:"火龙果树苗"});
Translation.addTranslation("Fig Tree Sapling", {ru: "Саженец фига",zh:"无花果树苗"});
Translation.addTranslation("Grapefruit Tree Sapling", {ru: "Саженец грейпфрута",zh:"葡萄柚树苗"});
Translation.addTranslation("Gooseberry Tree Sapling", {ru: "Саженец крыжовника",zh:"醋栗树苗"});
Translation.addTranslation("Lime Tree Sapling", {ru: "Саженец лайма",zh:"青柠树苗"});
Translation.addTranslation("Lemon Tree Sapling", {ru: "Саженец лимона",zh:"柠檬树苗"});
Translation.addTranslation("Mango Tree Sapling", {ru: "Саженец манго",zh:"芒果树苗"});
Translation.addTranslation("Olive Tree Sapling", {ru: "Саженец оливы",zh:"橄榄树苗"});
Translation.addTranslation("Orange Tree Sapling", {ru: "Саженец апельсина",zh:"橙子树苗"});
Translation.addTranslation("Papaya Tree Sapling", {ru: "Саженец папайи",zh:"木瓜树苗"});
Translation.addTranslation("Peach Tree Sapling", {ru: "Саженец персика",zh:"桃子树苗"});
Translation.addTranslation("Pear Tree Sapling", {ru: "Саженец груши",zh:"梨树树苗"});
Translation.addTranslation("Persimmon Tree Sapling", {ru: "Саженец хурмы",zh:"柿子树苗"});
Translation.addTranslation("Plum Tree Sapling", {ru: "Саженец сливы",zh:"李子树苗"});
Translation.addTranslation("Pomegranate Tree Sapling", {ru: "Саженец граната",zh:"石榴树苗"});
Translation.addTranslation("Starfruit Tree Sapling", {ru: "Саженец карамболы",zh:"杨桃树苗"});
Translation.addTranslation("Almond Tree Sapling", {ru: "Саженец миндаля",zh:"杏仁树苗"});
Translation.addTranslation("Peppercorn Tree Sapling", {ru: "Саженец перца",zh:"胡椒树苗"});
Translation.addTranslation("Cashew Tree Sapling", {ru: "Саженец кешью",zh:"腰果树苗"});
Translation.addTranslation("Coconut Tree Sapling", {ru: "Саженец кокоса",zh:"椰子树苗"});
Translation.addTranslation("Kiwi smoothie", {ru: "Смузи из киви",zh:"猕猴桃冰沙"});
Translation.addTranslation("Kiwi yogurt", {ru: "Йогурт из киви",zh:"猕猴桃酸奶酪"});
Translation.addTranslation("Coconut cream", {ru: "Кокосовый крем",zh:"椰子软糖"});
Translation.addTranslation("Chai tea", {ru: "Чай масала",zh:"印度奶茶"});
Translation.addTranslation("Raspberry ice tea", {ru: "Малиновый холодный чай",zh:"树莓冰红茶"});
Translation.addTranslation("Fig bar", {ru: "Фиговый батончик",zh:"无花果馅饼"});
Translation.addTranslation("Lemon bar", {ru: "Лимонный батончик",zh:"柠檬条"});
Translation.addTranslation("Bacon wrapped dates", {ru: "Финики обёрнутые беконом",zh:"培根甜枣"});
Translation.addTranslation("Carnied lemon", {ru: "Карамельные лимоны",zh:"甜蜜柠檬"});
Translation.addTranslation("Arid Garden", {ru: "Пустынный куст",zh:"贫瘠菜园"});
Translation.addTranslation("Tropical Garden", {ru: "Тропический куст",zh:"热带菜园"});
Translation.addTranslation("Leafy Garden", {ru: "Лиственный куст",zh:"茂盛菜园"});
Translation.addTranslation("Frosty Garden", {ru: "Морозный сад",zh:"严寒菜园"});
Translation.addTranslation("Ground Garden", {ru: "Земляной куст",zh:"土地菜园"});
Translation.addTranslation("Stalk Garden", {ru: "Стебельковый куст",zh:"带茎菜园"});
Translation.addTranslation("Gourd Garden", {ru: "Тыквенный куст",zh:"葫芦丛"});
Translation.addTranslation("Almond Butter", {ru: "Миндальное масло"});




// file: GENERATION/biomes.js

/*LEGACY
var SaltBiomes = [0,24,10];
	//var SaltBiomes = __config__.access("generation.biomes.gardens.SaltBiomes");
var BerryGardenBiomes = [1,4,3,132,129,34, 18, 27, 28,13];
	//var BerryGardenBiomes = __config__.access("generation.biomes.gardens.BerryGardenBiomes");
var CandleberryGardenBiomes = [1,4,3,132,129,34, 18, 27, 28,13];
	//var CandleberryGardenBiomes = __config__.access("generation.biomes.gardens.CandleberryGardenBiomes");
var DesertGardenBiomes =[2,35,37,135];
	//var DesertGardenBiomes = __config__.access("generation.biomes.gardens.DesertGardenBiomes");
var GourdGardenBiomes = [1,4,3,132,129,34, 18, 27, 28,13];
	//var GourdGardenBiomes = __config__.access("generation.biomes.gardens.GourdGardenBiomes");
var GrassGardenBiomes = [1,4,3,132,129,34, 18, 27, 28];
	//var GrassGardenBiomes = __config__.access("generation.biomes.gardens.GrassGardenBiomes");
var GroundGardenBiomes =[1,4,3,132,129,34,4, 18, 27, 28,13];
	//var GroundGardenBiomes = __config__.access("generation.biomes.gardens.GroundGardenBiomes");
var HerbGardenBiomes =  [1,4,3,132,129,34, 18, 27, 28];
	//var HerbGardenBiomes = __config__.access("generation.biomes.gardens.HerbGardenBiomes");
var LeafyGardenBiomes = [1,4,3,132,129,34, 18, 27, 28,13];
	//var LeafyGardenBiomes = __config__.access("generation.biomes.gardens.LeafyGardenBiomes");
var MushroomGardenBiomes = [1,4,3,132,129,34, 18, 27, 28];
	//var MushroomGardenBiomes = __config__.access("generation.biomes.gardens.MushroomGardenBiomes");
var StalkGardenBiomes = [1,4,3,132,129,34, 18, 27, 28];
	//var StalkGardenBiomes = __config__.access("generation.biomes.gardens.StalkGardenBiomes");
var TextileGardenBiomes = [1,4,3,132,129,34, 18, 27, 28];
	//var TextileGardenBiomes = __config__.access("generation.biomes.gardens.TextileGardenBiomes");
var TropicalGardenBiomes = [21, 22, 23, 149, 151,6, 134,36];
	//var TropicalGardenBiomes = __config__.access("generation.biomes.gardens.TropicalGardenBiomes");
var WaterGardenBiomes = [24,0];
	//var WaterGardenBiomes = __config__.access("generation.biomes.gardens.WaterGardenBiomes");
var FrostyGardenBiomes = [12,140,30,158,11,26];
Callback.addCallback("ItemUse", function(coords, item, block){
	alert(World.getBiome(coords.x, coords.z));
});*/

var SaltBiomes = [0,24,10];

var gardensBiomes = {
    arid: [2,35,37,135],

    berry: [1,4,3,132,129,34, 18, 27, 28,13],

    candleberry: [1,4,3,132,129,34, 18, 27, 28,13],

    cotton: [1,4,3,132,129,34, 18, 27, 28],

    frosty: [12,140,30,158,11,26],

    gourd: [1,4,3,132,129,34, 18, 27, 28,13],

    grass: [1,4,3,132,129,34, 18, 27, 28],

    ground: [1,4,3,132,129,34,4, 18, 27, 28,13],

    herb: [1,4,3,132,129,34, 18, 27, 28],

    leafy: [1,4,3,132,129,34, 18, 27, 28,13],

    stalk: [1,4,3,132,129,34, 18, 27, 28],

    tropical: [21, 22, 23, 149, 151,6, 134,36]
};




// file: ITEMS/tools.js

IDRegistry.genItemID("cutting_board");
Item.createItem("cutting_board", "Cutting board", {name: "cutting_board", meta: 0}, {stack: 1});
Harvest.registerTool(ItemID.cutting_board);

IDRegistry.genItemID("pot");
Item.createItem("pot", "Pot", {name: "pot", meta: 0}, {stack: 1});
Harvest.registerTool(ItemID.pot);

IDRegistry.genItemID("skillet");
Item.createItem("skillet", "Skillet", {name: "skillet", meta: 0}, {stack: 1});
Harvest.registerTool(ItemID.skillet);

IDRegistry.genItemID("saucepan");
Item.createItem("saucepan", "Saucepan", {name: "saucepan", meta: 0}, {stack: 1});
Harvest.registerTool(ItemID.saucepan);

IDRegistry.genItemID("bakeware");
Item.createItem("bakeware", "Bakeware", {name: "bakeware", meta: 0}, {stack: 1});
Harvest.registerTool(ItemID.bakeware);

IDRegistry.genItemID("mixing_bowl");
Item.createItem("mixing_bowl", "Mixing bowl", {name: "mixing_bowl", meta: 0}, {stack: 1});
Harvest.registerTool(ItemID.mixing_bowl);

IDRegistry.genItemID("mortar_bowl");
Item.createItem("mortar_bowl", "Mortar bowl", {name: "mortar_bowl", meta: 0}, {stack: 1});
Harvest.registerTool(ItemID.mortar_bowl);

IDRegistry.genItemID("juicer");
Item.createItem("juicer", "Juicer", {name: "juicer", meta: 0}, {stack: 1});
Harvest.registerTool(ItemID.juicer);

Harvest.registerTool(325);

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: ItemID.juicer, count: 1, data: 0}, ["a  ", "b  "], ["a", 1, 0, "b", 70, 0]);
	Recipes.addShaped({id: ItemID.mortar_bowl, count: 1, data: 0}, ["aba", " a "], ["a", 1, 0, "b", 280, 0]);
	Recipes.addShaped({id: ItemID.mixing_bowl, count: 1, data: 0}, ["aba", " a "], ["a", 5, 0, "b", 280, 0]);
	Recipes.addShaped({id: ItemID.bakeware, count: 1, data: 0}, ["aaa", "a a", "aaa"], ["a", 336, 0]);
	Recipes.addShaped({id: ItemID.saucepan, count: 1, data: 0}, ["a  ", "b  "], ["a", 265, 0, "b", 280, 0]);
	Recipes.addShaped({id: ItemID.skillet, count: 1, data: 0}, ["a  ", " a ", "  b"], ["a", 265, 0, "b", 280, 0]);
	Recipes.addShaped({id: ItemID.pot, count: 1, data: 0}, ["abb", " bb"], ["a", 280, 0, "b", 265, 0]);
	Recipes.addShaped({id: ItemID.cutting_board, count: 1, data: 0}, ["a  ", " b ", "  c"], ["a", 265, 0, "b", 280, 0, "c", 5, 0]);
});




// file: ITEMS/baits.js

IDRegistry.genItemID("graitBait");
Item.createItem("graitBait", "Grain bait", {name: "grain_bait", meta: 0}, {});
IDRegistry.genItemID("fruitBait");
Item.createItem("fruitBait", "Fruit bait", {name: "fruit_bait", meta: 0}, {});
IDRegistry.genItemID("veggieBait");
Item.createItem("veggieBait", "Veggie bait", {name: "veggie_bait", meta: 0}, {});
/*
IDRegistry.genItemID("fishBait");
Item.createItem("fishBait", "Fish bait", {name: "fish_bait", meta: 0}, {});*/
Callback.addCallback("LevelLoaded", function(){
	Recipes.addShapeless({id: ItemID.graitBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: 295, data: 0},{id: 295, data: 0},{id: 295, data: 0}]);
	Recipes.addShapeless({id: ItemID.graitBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.rhubarb, data: 0},{id: ItemID.rhubarb, data: 0},{id: ItemID.rhubarb, data: 0}]);
	Recipes.addShapeless({id: ItemID.graitBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.rye, data: 0},{id: ItemID.rye, data: 0},{id: ItemID.rye, data: 0}]);
	Recipes.addShapeless({id: ItemID.graitBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.barley, data: 0},{id: ItemID.barley, data: 0},{id: ItemID.barley, data: 0}]);
	Recipes.addShapeless({id: ItemID.graitBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.oats, data: 0},{id: ItemID.oats, data: 0},{id: ItemID.oats, data: 0}]);
	Recipes.addShapeless({id: ItemID.fruitBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: 260, data: 0},{id: 260, data: 0},{id: 260, data: 0}]);
	Recipes.addShapeless({id: ItemID.fruitBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.cactusfruit, data: 0},{id: ItemID.cactusfruit, data: 0},{id: ItemID.cactusfruit, data: 0}]);
	Recipes.addShapeless({id: ItemID.fruitBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.cantaloupe, data: 0},{id: ItemID.cantaloupe, data: 0},{id: ItemID.cantaloupe, data: 0}]);
	Recipes.addShapeless({id: ItemID.fruitBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.strawberry, data: 0},{id: ItemID.strawberry, data: 0},{id: ItemID.strawberry, data: 0}]);
	Recipes.addShapeless({id: ItemID.fruitBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.raspberry, data: 0},{id: ItemID.raspberry, data: 0},{id: ItemID.raspberry, data: 0}]);
	Recipes.addShapeless({id: ItemID.fruitBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.cranberry, data: 0},{id: ItemID.cranberry, data: 0},{id: ItemID.cranberry, data: 0}]);
	Recipes.addShapeless({id: ItemID.fruitBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.blueberry, data: 0},{id: ItemID.blueberry, data: 0},{id: ItemID.blueberry, data: 0}]);
	Recipes.addShapeless({id: ItemID.fruitBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.blackberry, data: 0},{id: ItemID.blackberry, data: 0},{id: ItemID.blackberry, data: 0}]);
	Recipes.addShapeless({id: ItemID.fruitBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.grape, data: 0},{id: ItemID.grape, data: 0},{id: ItemID.grape, data: 0}]);
	Recipes.addShapeless({id: ItemID.veggieBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.cucumber, data: 0},{id: ItemID.cucumber, data: 0},{id: ItemID.cucumber, data: 0}]);
	Recipes.addShapeless({id: ItemID.veggieBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.zucchini, data: 0},{id: ItemID.zucchini, data: 0},{id: ItemID.zucchini, data: 0}]);
	Recipes.addShapeless({id: ItemID.veggieBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.onion, data: 0},{id: ItemID.onion, data: 0},{id: ItemID.onion, data: 0}]);
	Recipes.addShapeless({id: ItemID.veggieBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.cabbage, data: 0},{id: ItemID.cabbage, data: 0},{id: ItemID.cabbage, data: 0}]);
	Recipes.addShapeless({id: ItemID.veggieBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.tomato, data: 0},{id: ItemID.tomato, data: 0},{id: ItemID.tomato, data: 0}]);
	Recipes.addShapeless({id: ItemID.veggieBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.soybean, data: 0},{id: ItemID.soybean, data: 0},{id: ItemID.soybean, data: 0}]);
	Recipes.addShapeless({id: ItemID.veggieBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.bellpepper, data: 0},{id: ItemID.bellpepper, data: 0},{id: ItemID.bellpepper, data: 0}]);
	Recipes.addShapeless({id: ItemID.veggieBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.artichoke, data: 0},{id: ItemID.artichoke, data: 0},{id: ItemID.artichoke, data: 0}]);
	Recipes.addShapeless({id: ItemID.veggieBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.asparagus, data: 0},{id: ItemID.asparagus, data: 0},{id: ItemID.asparagus, data: 0}]);
	Recipes.addShapeless({id: ItemID.veggieBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.bambooshoot, data: 0},{id: ItemID.bambooshoot, data: 0},{id: ItemID.bambooshoot, data: 0}]);
	Recipes.addShapeless({id: ItemID.veggieBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.radish, data: 0},{id: ItemID.radish, data: 0},{id: ItemID.radish, data: 0}]);
	Recipes.addShapeless({id: ItemID.veggieBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.parsnip, data: 0},{id: ItemID.parsnip, data: 0},{id: ItemID.parsnip, data: 0}]);
	Recipes.addShapeless({id: ItemID.veggieBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.brusselsprout, data: 0},{id: ItemID.brusselsprout, data: 0},{id: ItemID.brusselsprout, data: 0}]);
	Recipes.addShapeless({id: ItemID.veggieBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.beet, data: 0},{id: ItemID.beet, data: 0},{id: ItemID.beet, data: 0}]);
	Recipes.addShapeless({id: ItemID.veggieBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.garlic, data: 0},{id: ItemID.garlic, data: 0},{id: ItemID.garlic, data: 0}]);
	Recipes.addShapeless({id: ItemID.veggieBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.lettuce, data: 0},{id: ItemID.lettuce, data: 0},{id: ItemID.lettuce, data: 0}]);
	Recipes.addShapeless({id: ItemID.veggieBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.peas, data: 0},{id: ItemID.peas, data: 0},{id: ItemID.peas, data: 0}]);
	Recipes.addShapeless({id: ItemID.veggieBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.chili_pepper, data: 0},{id: ItemID.chili_pepper, data: 0},{id: ItemID.chili_pepper, data: 0}]);
	Recipes.addShapeless({id: ItemID.veggieBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: ItemID.corn, data: 0},{id: ItemID.corn, data: 0},{id: ItemID.corn, data: 0}]);
	//Recipes.addShapeless({id: ItemID.fishBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: 349, data: 0},{id: 349 data: 0},{id: 349, data: 0}]);
	//Recipes.addShapeless({id: ItemID.fishBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: 460, data: 0},{id: 460 data: 0},{id: 460, data: 0}]);
	//Recipes.addShapeless({id: ItemID.fishBait, count: 1, data: 0}, [{id: 287, data: 0}, {id: 461, data: 0},{id: 461 data: 0},{id: 461, data: 0}]);
});




// file: ITEMS/FOOD/fruits.js

Harvest.setFood("strawberry","Strawberry",1);
Harvest.setFood("raspberry","Raspberry",1);
Harvest.setFood("cranberry","Cranberry",1);
Harvest.setFood("blueberry","Blueberry",1);
Harvest.setFood("blackberry","Blackberry",1);
Harvest.setFood("candleberry","Candle berry",1);
Harvest.setFood("grape","Grape",1);
Harvest.setFood("cucumber","Cucumber",1);
Harvest.setFood("onion","Onion",1);
Harvest.setFood("cabbage","Cabbage",1);
Harvest.setFood("tomato","Tomato",1);
Harvest.setFood("bellpepper","Bellpepper",1);
Harvest.setFood("garlic","Garlic",1);
Harvest.setFood("lettuce","Lettuce",1);
Harvest.setFood("coffee_beans","Coffee beans",1);
Harvest.setFood("peas","Peas",1);
Harvest.setFood("chili_pepper","Chilli pepper",1);
Harvest.setFood("spice_leaf","Spice leaf",1);
Harvest.setFood("corn","Corn",1);
Harvest.setFood("curryleaf","Curryleaf",1);
Harvest.setFood("cotton","Cotton",1);
Harvest.setFood("bean","Bean",1);
Harvest.setFood("rice","Rice",1);
Harvest.setFood("waterchestnut","Water Chestnut",1);
Harvest.setFood("rutabaga","Rutabaga",1);
Harvest.setFood("mustardseeds","Mustard Seeds",1);
Harvest.setFood("ginger","Ginger",1);
Harvest.setFood("spinach","Spinach",1);
Harvest.setFood("cactusfruit","Cactusfruit",1);
Harvest.setFood("cantaloupe","Cantaloupe",1);
Harvest.setFood("kiwi","Kiwi",1);
Harvest.setFood("pineapple","Pineapple",1);
Harvest.setFood("artichoke","Artichoke",1);
Harvest.setFood("asparagus","Asparagus",1);
Harvest.setFood("bambooshoot","Bambooshoot",1);
Harvest.setFood("broccoli","Broccoli",1);
Harvest.setFood("brusselsprout","Brusselsprout",1);
Harvest.setFood("cauliflower","Cauliflower",1);
Harvest.setFood("celery","Celery",1);
Harvest.setFood("radish","Radish",1);
Harvest.setFood("eggplant","Eggplant",1);
Harvest.setFood("leek","Leek",1);
Harvest.setFood("okra","Okra",1);
Harvest.setFood("parsnip","Parsnip",1);
Harvest.setFood("rhubarb","Rhubarb",1);
Harvest.setFood("scallion","Scallion",1);
Harvest.setFood("soybean","Soybean",1);
Harvest.setFood("sweetpotato","Sweet Potato",1);
Harvest.setFood("turnip","Turnip",1);
Harvest.setFood("peanut","Peanut",1);
Harvest.setFood("rye","Rye",1);
Harvest.setFood("zucchini","Zucchini",1);
Harvest.setFood("barley","Barley",1);
Harvest.setFood("oats","Oats",1);
Harvest.setFood("beet","Beet",1);
Harvest.setFood("wintersquash","Wintersquash",1);
IDRegistry.genItemID("tealeaf");
Item.createItem("tealeaf", "Tea leaf", {name: "tealeaf", meta: 0});




// file: ITEMS/seeds.js

IDRegistry.genItemID("strawberry_seed");
Item.createItem("strawberry_seed", "Strawberry Seed", {name: "strawberry_seed", meta: 0});
Harvest.recipe({id:ItemID.strawberry_seed},[{id: ItemID.strawberry, data: 0}]);
Harvest.addGrassDrop(ItemID.strawberry_seed);

IDRegistry.genItemID("raspberry_seed");
Item.createItem("raspberry_seed", "Raspberry Seed", {name: "raspberry_seed", meta: 0});
Harvest.recipe({id:ItemID.raspberry_seed},[{id: ItemID.raspberry, data: 0}]);
Harvest.addGrassDrop(ItemID.raspberry_seed);

IDRegistry.genItemID("cranberry_seed");
Item.createItem("cranberry_seed", "Cranberry Seed", {name: "cranberry_seed", meta: 0});
Harvest.recipe({id:ItemID.cranberry_seed},[{id: ItemID.cranberry, data: 0}]);
Harvest.addGrassDrop(ItemID.cranberry_seed);

IDRegistry.genItemID("blueberry_seed");
Item.createItem("blueberry_seed", "Blueberry Seed", {name: "blueberry_seed", meta: 0});
Harvest.recipe({id:ItemID.blueberry_seed},[{id: ItemID.blueberry, data: 0}]);
Harvest.addGrassDrop(ItemID.blueberry_seed);

IDRegistry.genItemID("blackberry_seed");
Item.createItem("blackberry_seed", "Blackberry Seed", {name: "blackberry_seed", meta: 0});
Harvest.recipe({id:ItemID.blackberry_seed},[{id: ItemID.blackberry, data: 0}]);
Harvest.addGrassDrop(ItemID.blackberry_seed);

IDRegistry.genItemID("candleberry_seed");
Item.createItem("candleberry_seed", "Candle berry Seed", {name: "candleberryseed", meta: 0});
Harvest.recipe({id:ItemID.candleberry_seed},[{id: ItemID.candleberry, data: 0}]);
Harvest.addGrassDrop(ItemID.candleberry_seed);

IDRegistry.genItemID("grape_seed");
Item.createItem("grape_seed", "Grape Seed", {name: "grape_seed", meta: 0});
Harvest.recipe({id:ItemID.grape_seed},[{id: ItemID.grape, data: 0}]);
Harvest.addGrassDrop(ItemID.grape_seed);

IDRegistry.genItemID("cucumber_seed");
Item.createItem("cucumber_seed", "Cucumber Seed", {name: "cucumber_seed", meta: 0});
Harvest.recipe({id:ItemID.cucumber_seed},[{id: ItemID.cucumber, data: 0}]);
Harvest.addGrassDrop(ItemID.cucumber_seed);

IDRegistry.genItemID("onion_seed");
Item.createItem("onion_seed", "Onion Seed", {name: "onion_seed", meta: 0});
Harvest.recipe({id:ItemID.onion_seed},[{id: ItemID.onion, data: 0}]);
Harvest.addGrassDrop(ItemID.onion_seed);

IDRegistry.genItemID("cabbage_seed");
Item.createItem("cabbage_seed", "Cabbage Seed", {name: "cabbage_seed", meta: 0});
Harvest.recipe({id:ItemID.cabbage_seed},[{id: ItemID.cabbage, data: 0}]);
Harvest.addGrassDrop(ItemID.cabbage_seed);

IDRegistry.genItemID("tomato_seed");
Item.createItem("tomato_seed", "Tomato Seed", {name: "tomato_seed", meta: 0});
Harvest.recipe({id:ItemID.tomato_seed},[{id: ItemID.tomato, data: 0}]);
Harvest.addGrassDrop(ItemID.tomato_seed);

IDRegistry.genItemID("bellpepper_seed");
Item.createItem("bellpepper_seed", "Bellpepper Seed", {name: "bellpepper_seed", meta: 0});
Harvest.recipe({id:ItemID.bellpepper_seed},[{id: ItemID.bellpepper, data: 0}]);
Harvest.addGrassDrop(ItemID.bellpepper_seed);

IDRegistry.genItemID("garlic_seed");
Item.createItem("garlic_seed", "Garlic Seed", {name: "garlic_seed", meta: 0});
Harvest.recipe({id:ItemID.garlic_seed},[{id: ItemID.garlic, data: 0}]);
Harvest.addGrassDrop(ItemID.garlic_seed);

IDRegistry.genItemID("lettuce_seed");
Item.createItem("lettuce_seed", "Lettuce Seed", {name: "lettuce_seed", meta: 0});
Harvest.recipe({id:ItemID.lettuce_seed},[{id: ItemID.lettuce, data: 0}]);
Harvest.addGrassDrop(ItemID.lettuce_seed);

IDRegistry.genItemID("coffee_seed");
Item.createItem("coffee_seed", "Coffee Seed", {name: "coffee_seed", meta: 0});
Harvest.recipe({id:ItemID.coffee_seed},[{id: ItemID.coffee_beans, data: 0}]);
Harvest.addGrassDrop(ItemID.coffee_seed);

IDRegistry.genItemID("peas_seed");
Item.createItem("peas_seed", "Peas Seed", {name: "peas_seed", meta: 0});
Harvest.recipe({id:ItemID.peas_seed},[{id: ItemID.peas, data: 0}]);
Harvest.addGrassDrop(ItemID.peas_seed);

IDRegistry.genItemID("chili_pepper_seed");
Item.createItem("chili_pepper_seed", "Chilli pepper Seed", {name: "chili_pepper_seed", meta: 0});
Harvest.recipe({id:ItemID.chili_pepper_seed},[{id: ItemID.chili_pepper, data: 0}]);
Harvest.addGrassDrop(ItemID.chili_pepper_seed);

IDRegistry.genItemID("spice_leaf_seed");
Item.createItem("spice_leaf_seed", "Spice leaf Seed", {name: "spice_leaf_seed", meta: 0});
Harvest.recipe({id:ItemID.spice_leaf_seed},[{id: ItemID.spice_leaf, data: 0}]);
Harvest.addGrassDrop(ItemID.spice_leaf_seed);

IDRegistry.genItemID("corn_seed");
Item.createItem("corn_seed", "Corn Seed", {name: "corn_seed", meta: 0});
Harvest.recipe({id:ItemID.corn_seed},[{id: ItemID.corn, data: 0}]);
Harvest.addGrassDrop(ItemID.corn_seed);

/*
IDRegistry.genItemID("peppercorn_seed");
Item.createItem("peppercorn_seed", "Peppercorn Seed", {name: "peppercorn_seed", meta: 0});
Harvest.recipe({id:ItemID.peppercorn_seed},[{id: ItemID.peppercorn, data: 0}]);
Harvest.addGrassDrop(ItemID.peppercorn_seed);*/

IDRegistry.genItemID("curryleaf_seed");
Item.createItem("curryleaf_seed", "Curryleaf Seed", {name: "curryleafseed", meta: 0});
Harvest.recipe({id:ItemID.curryleaf_seed},[{id: ItemID.curryleaf, data: 0}]);
Harvest.addGrassDrop(ItemID.curryleaf_seed);

IDRegistry.genItemID("cotton_seed");
Item.createItem("cotton_seed", "Cotton Seed", {name: "cottonSeed", meta: 0});
Harvest.recipe({id:ItemID.cotton_seed},[{id: ItemID.cotton, data: 0}]);
Harvest.addGrassDrop(ItemID.cotton_seed);

IDRegistry.genItemID("bean_seed");
Item.createItem("bean_seed", "Bean Seed", {name: "beanseed", meta: 0});
Harvest.recipe({id:ItemID.bean_seed},[{id: ItemID.bean, data: 0}]);
Harvest.addGrassDrop(ItemID.bean_seed);

IDRegistry.genItemID("rice_seed");
Item.createItem("rice_seed", "Rice Seed", {name: "riceseed", meta: 0});
Harvest.recipe({id:ItemID.rice_seed},[{id: ItemID.rice, data: 0}]);
Harvest.addGrassDrop(ItemID.rice_seed);

IDRegistry.genItemID("waterchestnut_seed");
Item.createItem("waterchestnut_seed", "Water Chestnut Seed", {name: "waterchestnutseed", meta: 0});
Harvest.recipe({id:ItemID.waterchestnut_seed},[{id: ItemID.waterchestnut, data: 0}]);
Harvest.addGrassDrop(ItemID.waterchestnut_seed);

IDRegistry.genItemID("rutabaga_seed");
Item.createItem("rutabaga_seed", "Rutabaga Seed", {name: "rutabagaseed", meta: 0});
Harvest.recipe({id:ItemID.rutabaga_seed},[{id: ItemID.rutabaga, data: 0}]);
Harvest.addGrassDrop(ItemID.rutabaga_seed);

IDRegistry.genItemID("mustard_seed");
Item.createItem("mustard_seed", "Mustard Seed", {name: "mustardseed", meta: 0});
Harvest.recipe({id:ItemID.mustard_seed},[{id: ItemID.mustardseeds, data: 0}]);
Harvest.addGrassDrop(ItemID.mustard_seed);

IDRegistry.genItemID("ginger_seed");
Item.createItem("ginger_seed", "Ginger Seed", {name: "gingerseed", meta: 0});
Harvest.recipe({id:ItemID.ginger_seed},[{id: ItemID.ginger, data: 0}]);
Harvest.addGrassDrop(ItemID.ginger_seed);

IDRegistry.genItemID("spinach_seed");
Item.createItem("spinach_seed", "Spinach Seed", {name: "spinachseed", meta: 0});
Harvest.recipe({id:ItemID.spinach_seed},[{id: ItemID.spinach, data: 0}]);
Harvest.addGrassDrop(ItemID.spinach_seed);

IDRegistry.genItemID("cactusfruit_seed");
Item.createItem("cactusfruit_seed", "Cactusfruit Seed", {name: "cactusfruitseed", meta: 0});
Harvest.recipe({id:ItemID.cactusfruit_seed},[{id: ItemID.cactusfruit, data: 0}]);
Harvest.addGrassDrop(ItemID.cactusfruit_seed);

IDRegistry.genItemID("cantaloupe_seed");
Item.createItem("cantaloupe_seed", "Cantaloupe Seed", {name: "cantaloupeseed", meta: 0});
Harvest.recipe({id:ItemID.cantaloupe_seed},[{id: ItemID.cantaloupe, data: 0}]);
Harvest.addGrassDrop(ItemID.cantaloupe_seed);

IDRegistry.genItemID("kiwi_seed");
Item.createItem("kiwi_seed", "Kiwi Seed", {name: "kiwiseed", meta: 0});
Harvest.recipe({id:ItemID.kiwi_seed},[{id: ItemID.kiwi, data: 0}]);
Harvest.addGrassDrop(ItemID.kiwi_seed);

IDRegistry.genItemID("pineapple_seed");
Item.createItem("pineapple_seed", "Pineapple Seed", {name: "pineappleseed", meta: 0});
Harvest.recipe({id:ItemID.pineapple_seed},[{id: ItemID.pineapple, data: 0}]);
Harvest.addGrassDrop(ItemID.pineapple_seed);

IDRegistry.genItemID("artichoke_seed");
Item.createItem("artichoke_seed", "Artichoke Seed", {name: "artichokeseed", meta: 0});
Harvest.recipe({id:ItemID.artichoke_seed},[{id: ItemID.artichoke, data: 0}]);
Harvest.addGrassDrop(ItemID.artichoke_seed);

IDRegistry.genItemID("asparagus_seed");
Item.createItem("asparagus_seed", "Asparagus Seed", {name: "asparagusseed", meta: 0});
Harvest.recipe({id:ItemID.asparagus_seed},[{id: ItemID.asparagus, data: 0}]);
Harvest.addGrassDrop(ItemID.asparagus_seed);

IDRegistry.genItemID("bambooshoot_seed");
Item.createItem("bambooshoot_seed", "Bambooshoot Seed", {name: "bambooshootseed", meta: 0});
Harvest.recipe({id:ItemID.bambooshoot_seed},[{id: ItemID.bambooshoot, data: 0}]);
Harvest.addGrassDrop(ItemID.bambooshoot_seed);

IDRegistry.genItemID("broccoli_seed");
Item.createItem("broccoli_seed", "Broccoli Seed", {name: "broccoliseed", meta: 0});
Harvest.recipe({id:ItemID.broccoli_seed},[{id: ItemID.broccoli, data: 0}]);
Harvest.addGrassDrop(ItemID.broccoli_seed);

IDRegistry.genItemID("brusselsprout_seed");
Item.createItem("brusselsprout_seed", "Brusselsprout Seed", {name: "brusselsproutseed", meta: 0});
Harvest.recipe({id:ItemID.brusselsprout_seed},[{id: ItemID.brusselsprout, data: 0}]);
Harvest.addGrassDrop(ItemID.brusselsprout_seed);

IDRegistry.genItemID("cauliflower_seed");
Item.createItem("cauliflower_seed", "Cauliflower Seed", {name: "cauliflowerseed", meta: 0});
Harvest.recipe({id:ItemID.cauliflower_seed},[{id: ItemID.cauliflower, data: 0}]);
Harvest.addGrassDrop(ItemID.cauliflower_seed);

IDRegistry.genItemID("celery_seed");
Item.createItem("celery_seed", "Celery Seed", {name: "celeryseed", meta: 0});
Harvest.recipe({id:ItemID.celery_seed},[{id: ItemID.celery, data: 0}]);
Harvest.addGrassDrop(ItemID.celery_seed);

IDRegistry.genItemID("radish_seed");
Item.createItem("radish_seed", "Radish Seed", {name: "radishseed", meta: 0});
Harvest.recipe({id:ItemID.radish_seed},[{id: ItemID.radish, data: 0}]);
Harvest.addGrassDrop(ItemID.radish_seed);

IDRegistry.genItemID("eggplant_seed");
Item.createItem("eggplant_seed", "Eggplant Seed", {name: "eggplantseed", meta: 0});
Harvest.recipe({id:ItemID.eggplant_seed},[{id: ItemID.eggplant, data: 0}]);
Harvest.addGrassDrop(ItemID.eggplant_seed);

IDRegistry.genItemID("leek_seed");
Item.createItem("leek_seed", "Leek Seed", {name: "leekseed", meta: 0});
Harvest.recipe({id:ItemID.leek_seed},[{id: ItemID.leek, data: 0}]);
Harvest.addGrassDrop(ItemID.leek_seed);

IDRegistry.genItemID("okra_seed");
Item.createItem("okra_seed", "Okra Seed", {name: "okraseed", meta: 0});
Harvest.recipe({id:ItemID.okra_seed},[{id: ItemID.okra, data: 0}]);
Harvest.addGrassDrop(ItemID.okra_seed);

IDRegistry.genItemID("parsnip_seed");
Item.createItem("parsnip_seed", "Parsnip Seed", {name: "parsnipseed", meta: 0});
Harvest.recipe({id:ItemID.parsnip_seed},[{id: ItemID.parsnip, data: 0}]);
Harvest.addGrassDrop(ItemID.parsnip_seed);

IDRegistry.genItemID("rhubarb_seed");
Item.createItem("rhubarb_seed", "Rhubarb Seed", {name: "rhubarbseed", meta: 0});
Harvest.recipe({id:ItemID.rhubarb_seed},[{id: ItemID.rhubarb, data: 0}]);
Harvest.addGrassDrop(ItemID.rhubarb_seed);

IDRegistry.genItemID("scallion_seed");
Item.createItem("scallion_seed", "Scallion Seed", {name: "scallionseed", meta: 0});
Harvest.recipe({id:ItemID.scallion_seed},[{id: ItemID.scallion, data: 0}]);
Harvest.addGrassDrop(ItemID.scallion_seed);

IDRegistry.genItemID("soybean_seed");
Item.createItem("soybean_seed", "Soybean Seed", {name: "soybeanseed", meta: 0});
Harvest.recipe({id:ItemID.soybean_seed},[{id: ItemID.soybean, data: 0}]);
Harvest.addGrassDrop(ItemID.soybean_seed);

IDRegistry.genItemID("sweetpotato_seed");
Item.createItem("sweetpotato_seed", "Sweet Potato Seed", {name: "sweetpotatoseed", meta: 0});
Harvest.recipe({id:ItemID.sweetpotato_seed},[{id: ItemID.sweetpotato, data: 0}]);
Harvest.addGrassDrop(ItemID.sweetpotato_seed);

IDRegistry.genItemID("turnip_seed");
Item.createItem("turnip_seed", "Turnip Seed", {name: "turnipseed", meta: 0});
Harvest.recipe({id:ItemID.turnip_seed},[{id: ItemID.turnip, data: 0}]);
Harvest.addGrassDrop(ItemID.turnip_seed);

IDRegistry.genItemID("peanut_seed");
Item.createItem("peanut_seed", "Peanut Seed", {name: "peanutseed", meta: 0});
Harvest.recipe({id:ItemID.peanut_seed},[{id: ItemID.peanut, data: 0}]);
Harvest.addGrassDrop(ItemID.peanut_seed);

IDRegistry.genItemID("rye_seed");
Item.createItem("rye_seed", "Rye Seed", {name: "ryeseed", meta: 0});
Harvest.recipe({id:ItemID.rye_seed},[{id: ItemID.rye, data: 0}]);
Harvest.addGrassDrop(ItemID.rye_seed);

IDRegistry.genItemID("zucchini_seed");
Item.createItem("zucchini_seed", "Zucchini Seed", {name: "zucchiniseed", meta: 0});
Harvest.recipe({id:ItemID.zucchini_seed},[{id: ItemID.zucchini, data: 0}]);
Harvest.addGrassDrop(ItemID.zucchini_seed);

IDRegistry.genItemID("barley_seed");
Item.createItem("turnip_seed", "Barley Seed", {name: "barleyseed", meta: 0});
Harvest.recipe({id:ItemID.turnip_seed},[{id: ItemID.barley, data: 0}]);
Harvest.addGrassDrop(ItemID.turnip_seed);

IDRegistry.genItemID("oats_seed");
Item.createItem("oats_seed", "Oats Seed", {name: "oatsseed", meta: 0});
Harvest.recipe({id:ItemID.oats_seed},[{id: ItemID.oats, data: 0}]);
Harvest.addGrassDrop(ItemID.oats_seed);

IDRegistry.genItemID("wintersquash_seed");
Item.createItem("wintersquash_seed", "Wintersquash Seed", {name: "wintersquashseed", meta: 0});
Harvest.recipe({id:ItemID.wintersquash_seed},[{id: ItemID.wintersquash, data: 0}]);
Harvest.addGrassDrop(ItemID.wintersquash_seed);

IDRegistry.genItemID("tealeaf_seed");
Item.createItem("tealeaf_seed", "Tealeaf Seed", {name: "teaseed", meta: 0});
Harvest.recipe({id:ItemID.tealeaf_seed},[{id: ItemID.tealeaf, data: 0}]);
Harvest.addGrassDrop(ItemID.tealeaf_seed);

IDRegistry.genItemID("beet_seed");
Item.createItem("beet_seed", "Beet Seed", {name: "beetseed", meta: 0});
Harvest.recipe({id:ItemID.beet_seed},[{id: ItemID.beet, data: 0}]);
Harvest.addGrassDrop(ItemID.beet_seed);




// file: ITEMS/FOOD/juice.js

Harvest.setFood("strawberry_juice","Strawberry juice",5);
Harvest.recipe({id:ItemID.strawberry_juice},[{id: ItemID.juicer, data: 0}, {id: ItemID.strawberry, data: 0}]);

Harvest.setFood("raspberry_juice","Raspberry juice",5);
Harvest.recipe({id:ItemID.raspberry_juice},[{id: ItemID.juicer, data: 0}, {id: ItemID.strawberry, data: 0}]);

Harvest.setFood("cranberry_juice","Cranberry juice",5);
Harvest.recipe({id:ItemID.cranberry_juice},[{id: ItemID.juicer, data: 0}, {id: ItemID.cranberry, data: 0}]);

Harvest.setFood("blackberry_juice","Blackberry juice",5);
Harvest.recipe({id:ItemID.blackberry_juice},[{id: ItemID.juicer, data: 0}, {id: ItemID.blackberry, data: 0}]);

Harvest.setFood("grape_juice","Grape juice",5);
Harvest.recipe({id:ItemID.grape_juice},[{id: ItemID.juicer, data: 0}, {id: ItemID.grape, data: 0}]);

Harvest.setFood("melon_juice","Melon juice",5);
Harvest.recipe({id:ItemID.melon_juice},[{id: ItemID.juicer, data: 0}, {id: 360, data: 0}]);

Harvest.setFood("blueberry_juice","Blueberry juice",5);
Harvest.recipe({id:ItemID.blueberry_juice}, [{id: ItemID.juicer, data: 0}, {id: ItemID.blueberry, data: 0}]);

Harvest.setFood("carrot_juice","Carrot juice",5);
Harvest.recipe({id:ItemID.carrot_juice},[{id: ItemID.juicer, data: 0}, {id: 391, data: 0}]);

Harvest.setFood("apple_juice","Apple juice",5);
Harvest.recipe({id:ItemID.apple_juice}, [{id: ItemID.juicer, data: 0}, {id: 260, data: 0}]);

Harvest.setFood("cactusfruitjuice","Cactusfruit juice",5);
Harvest.recipe({id:ItemID.cactusfruitjuice}, [{id: ItemID.juicer, data: 0}, {id: ItemID.cactusfruit, data: 0}]);

Harvest.setFood("kiwijuice","Kiwi juice",5);
Harvest.recipe({id:ItemID.kiwijuice}, [{id: ItemID.juicer, data: 0}, {id: ItemID.kiwi, data: 0}]);

Harvest.setFood("apricotjuice","Apricot juice",5);
Harvest.recipe({id:ItemID.apricotjuice}, [{id: ItemID.juicer, data: 0}, {id: ItemID.apricot, data: 0}]);

Harvest.setFood("cherryjuice","Cherry juice",5);
Harvest.recipe({id:ItemID.cherryjuice}, [{id: ItemID.juicer, data: 0}, {id: ItemID.cherry, data: 0}]);

Harvest.setFood("figjuice","Fig juice",5);
Harvest.recipe({id:ItemID.figjuice}, [{id: ItemID.juicer, data: 0}, {id: ItemID.fig, data: 0}]);

Harvest.setFood("grapefruitjuice","Grapefruit juice",5);
Harvest.recipe({id:ItemID.grapefruitjuice}, [{id: ItemID.juicer, data: 0}, {id: ItemID.grapefruit, data: 0}]);

Harvest.setFood("lemonade","Lemonade",5);
Harvest.recipe({id:ItemID.lemonade}, [{id: ItemID.juicer, data: 0}, {id: ItemID.lemon, data: 0}]);

Harvest.setFood("limejuice","Lime juice",5);
Harvest.recipe({id:ItemID.limejuice}, [{id: ItemID.juicer, data: 0}, {id: ItemID.lime, data: 0}]);

Harvest.setFood("mangojuice","Mango juice",5);
Harvest.recipe({id:ItemID.mangojuice}, [{id: ItemID.juicer, data: 0}, {id: ItemID.mango, data: 0}]);

Harvest.setFood("orangejuice","Orange juice",5);
Harvest.recipe({id:ItemID.orangejuice}, [{id: ItemID.juicer, data: 0}, {id: ItemID.orange, data: 0}]);

Harvest.setFood("papayajuice","Papaya juice",5);
Harvest.recipe({id:ItemID.papayajuice}, [{id: ItemID.juicer, data: 0}, {id: ItemID.papaya, data: 0}]);

Harvest.setFood("peachjuice","Peach juice",5);
Harvest.recipe({id:ItemID.peachjuice}, [{id: ItemID.juicer, data: 0}, {id: ItemID.peach, data: 0}]);

Harvest.setFood("pearjuice","Pear juice",5);
Harvest.recipe({id:ItemID.pearjuice}, [{id: ItemID.juicer, data: 0}, {id: ItemID.pear, data: 0}]);

Harvest.setFood("persimmonjuice","Persimmon juice",5);
Harvest.recipe({id:ItemID.persimmonjuice}, [{id: ItemID.juicer, data: 0}, {id: ItemID.persimmon, data: 0}]);

Harvest.setFood("plumjuice","Plum juice",5);
Harvest.recipe({id:ItemID.plumjuice}, [{id: ItemID.juicer, data: 0}, {id: ItemID.plum, data: 0}]);

Harvest.setFood("pomegranatejuice","Pomegranate juice",5);
Harvest.recipe({id:ItemID.pomegranatejuice}, [{id: ItemID.juicer, data: 0}, {id: ItemID.pomegranate, data: 0}]);

Harvest.setFood("starfruitjuice","Starfruit juice",5);
Harvest.recipe({id:ItemID.starfruitjuice}, [{id: ItemID.juicer, data: 0}, {id: ItemID.starfruit, data: 0}]);

Harvest.setFood("coconutmilk","Coconut milk",5);
Harvest.recipe({id:ItemID.coconutmilk}, [{id: ItemID.juicer, data: 0}, {id: ItemID.coconut, data: 0}]);




// file: ITEMS/FOOD/smothie.js

Harvest.setFood("strawberry_smoothie","Strawberry smoothie",6);
Harvest.recipe({id:ItemID.raspberry_juice},[{id: ItemID.juicer, data: 0}, {id: ItemID.strawberry, data: 0},{id: 332, data: 0}]);

Harvest.setFood("raspberry_smoothie","Raspberry smoothie",6);
Harvest.recipe({id:ItemID.raspberry_juice},[{id: ItemID.juicer, data: 0}, {id: ItemID.raspberry, data: 0},{id: 332, data: 0}]);

Harvest.setFood("blackberry_smoothie","Blackberry smoothie",6);
Harvest.recipe({id:ItemID.raspberry_juice},[{id: ItemID.juicer, data: 0}, {id: ItemID.blackberry, data: 0},{id: 332, data: 0}]);

Harvest.setFood("blueberry_smoothie","Blueberry smoothie",6);
Harvest.recipe({id:ItemID.raspberry_juice},[{id: ItemID.juicer, data: 0}, {id: ItemID.blueberry, data: 0},{id: 332, data: 0}]);

Harvest.setFood("melon_smoothie","Melon smoothie",6);
Harvest.recipe({id:ItemID.raspberry_juice},[{id: ItemID.juicer, data: 0}, {id: 360, data: 0},{id: 332, data: 0}]);

Harvest.setFood("kiwismoothie","Kiwi smoothie",6);
Harvest.recipe({id:ItemID.kiwismoothie},[{id: ItemID.juicer, data: 0}, {id: ItemID.kiwi, data: 0},{id: 332, data: 0}]);

Harvest.setFood("apricotsmoothie","Apricot smoothie",6);
Harvest.recipe({id:ItemID.apricotsmoothie},[{id: ItemID.juicer, data: 0}, {id: ItemID.apricot, data: 0},{id: 332, data: 0}]);

Harvest.setFood("pinacolada","Pina collada",6);
Harvest.recipe({id:ItemID.pinacolada},[{id: ItemID.juicer, data: 0}, {id: ItemID.pineapple, data: 0},{id: ItemID.coconut, data: 0}]);

Harvest.setFood("cherrysmoothie","Cherry smoothie",6);
Harvest.recipe({id:ItemID.cherrysmoothie},[{id: ItemID.juicer, data: 0}, {id: ItemID.cherry, data: 0},{id: 332, data: 0}]);

Harvest.setFood("bananasmoothie","Banana smoothie",6);
Harvest.recipe({id:ItemID.bananasmoothie},[{id: ItemID.juicer, data: 0}, {id: ItemID.banana, data: 0},{id: 332, data: 0}]);

Harvest.setFood("bananamilkshake","Banana milkshake",6);
Harvest.recipe({id:ItemID.bananasmoothie},[{id: ItemID.juicer, data: 0}, {id: ItemID.banana, data: 0},{id: 325, data: 1},{id: 332, data: 0}]);

Harvest.setFood("gooseberrymilkshake","Goosseberry milkshake",6);
Harvest.recipe({id:ItemID.gooseberrymilkshake},[{id: ItemID.juicer, data: 0}, {id: ItemID.gooseberry, data: 0},{id: 325, data: 1},{id: 332, data: 0}]);

Harvest.setFood("figsmoothie","Fig smoothie",6);
Harvest.recipe({id:ItemID.figsmoothie},[{id: ItemID.juicer, data: 0}, {id: ItemID.fig, data: 0},{id: 332, data: 0}]);

Harvest.setFood("gooseberrysmoothie","Gooseberry smoothie",6);
Harvest.recipe({id:ItemID.gooseberrysmoothie},[{id: ItemID.juicer, data: 0}, {id: ItemID.gooseberry, data: 0},{id: 332, data: 0}]);

Harvest.setFood("lemonsmoothie","Lemon smoothie",6);
Harvest.recipe({id:ItemID.lemonsmoothie},[{id: ItemID.juicer, data: 0}, {id: ItemID.lemon, data: 0},{id: 332, data: 0}]);

Harvest.setFood("limesmoothie","Lime smoothie",6);
Harvest.recipe({id:ItemID.limesmoothie},[{id: ItemID.juicer, data: 0}, {id: ItemID.lime, data: 0},{id: 332, data: 0}]);

Harvest.setFood("mangosmoothie","Mango smoothie",6);
Harvest.recipe({id:ItemID.mangosmoothie},[{id: ItemID.juicer, data: 0}, {id: ItemID.mango, data: 0},{id: 332, data: 0}]);

Harvest.setFood("orangesmoothie","Orange smoothie",6);
Harvest.recipe({id:ItemID.orangesmoothie},[{id: ItemID.juicer, data: 0}, {id: ItemID.orange, data: 0},{id: 332, data: 0}]);

Harvest.setFood("papayasmoothie","Papaya smoothie",6);
Harvest.recipe({id:ItemID.papayasmoothie},[{id: ItemID.juicer, data: 0}, {id: ItemID.papaya, data: 0},{id: 332, data: 0}]);

Harvest.setFood("peachsmoothie","Peach smoothie",6);
Harvest.recipe({id:ItemID.peachsmoothie},[{id: ItemID.juicer, data: 0}, {id: ItemID.peach, data: 0},{id: 332, data: 0}]);

Harvest.setFood("pearsmoothie","Pear smoothie",6);
Harvest.recipe({id:ItemID.pearsmoothie},[{id: ItemID.juicer, data: 0}, {id: ItemID.pear, data: 0},{id: 332, data: 0}]);

Harvest.setFood("persimmonsmoothie","Persimmon smoothie",6);
Harvest.recipe({id:ItemID.persimmonsmoothie},[{id: ItemID.juicer, data: 0}, {id: ItemID.persimmon, data: 0},{id: 332, data: 0}]);

Harvest.setFood("plumsmoothie","Plum smoothie",6);
Harvest.recipe({id:ItemID.plumsmoothie},[{id: ItemID.juicer, data: 0}, {id: ItemID.plum, data: 0},{id: 332, data: 0}]);

Harvest.setFood("pomegranatesmoothie","Pomegranate smoothie",6);
Harvest.recipe({id:ItemID.pomegranatesmoothie},[{id: ItemID.juicer, data: 0}, {id: ItemID.pomegranate, data: 0},{id: 332, data: 0}]);

Harvest.setFood("starfruitsmoothie","Starfruit smoothie",6);
Harvest.recipe({id:ItemID.starfruitsmoothie},[{id: ItemID.juicer, data: 0}, {id: ItemID.starfruit, data: 0},{id: 332, data: 0}]);

Harvest.setFood("coconutsmoothie","Coconut smoothie",6);
Harvest.recipe({id:ItemID.coconutsmoothie},[{id: ItemID.juicer, data: 0}, {id: ItemID.coconut, data: 0},{id: 332, data: 0}]);




// file: ITEMS/FOOD/yogurt.js

Harvest.setFood("plain_yogurt","Plain yogurt",2);
Harvest.recipe({id:ItemID.plain_yogurt,count: 4},[{id: ItemID.fresh_milk, data: 0}, {id: 334, data: 0}]);
Harvest.recipe({id:ItemID.plain_yogurt,count: 4},[{id: ItemID.plain_yogurt, data: 0}, {id: ItemID.fresh_milk, data: 0}]);
Harvest.recipe({id:ItemID.plain_yogurt,count: 4},[{id: 325, data: 1}, {id: 334, data: 0}]);

Harvest.setFood("strawberry_yogurt","Strawberry yogurt",8);
Harvest.recipe({id:ItemID.strawberry_yogurt}, [{id: ItemID.plain_yogurt, data: 0}, {id: ItemID.strawberry, data: 0}]);

Harvest.setFood("raspberry_yogurt","Raspberry yogurt",8);
Harvest.recipe({id:ItemID.raspberry_yogurt},[{id: ItemID.plain_yogurt, data: 0}, {id: ItemID.raspberry, data: 0}]);

Harvest.setFood("grape_yogurt","Grape yogurt",8);
Harvest.recipe({id:ItemID.grape_yogurt}, [{id: ItemID.plain_yogurt, data: 0}, {id: ItemID.grape, data: 0}]);

Harvest.setFood("apple_yogurt","Apple yogurt",8);
Harvest.recipe({id:ItemID.apple_yogurt}, [{id: ItemID.plain_yogurt, data: 0}, {id: 260, data: 0}]);

Harvest.setFood("blackberry_yogurt","Blackberry yogurt",8);
Harvest.recipe({id:ItemID.blackberry_yogurt},[{id: ItemID.plain_yogurt, data: 0}, {id: ItemID.blackberry, data: 0}]);

Harvest.setFood("blueberry_yogurt","Blueberry yogurt",8);
Harvest.recipe({id:ItemID.blueberry_yogurt},[{id: ItemID.plain_yogurt, data: 0}, {id: ItemID.blueberry, data: 0}]);

Harvest.setFood("pumpkin_yogurt","Pumpkin yogurt",8);
Harvest.recipe({id:ItemID.pumpkin_yogurt}, [{id: ItemID.plain_yogurt, data: 0}, {id: 86, data: 0}]);

Harvest.setFood("melon_yogurt","Melon yogurt",8);
Harvest.recipe({id:ItemID.melon_yogurt},[{id: ItemID.plain_yogurt, data: 0}, {id: 360, data: 0}]);

Harvest.setFood("chocolate_yogurt","Chocolate yogurt",8);
Harvest.recipe({id:ItemID.chocolate_yogurt}, [{id: ItemID.plain_yogurt, data: 0}, {id: ItemID.cocoa_powder, data: 0}]);

Harvest.setFood("kiwiyogurt","Kiwi yogurt",8);
Harvest.recipe({id:ItemID.kiwiyogurt}, [{id: ItemID.plain_yogurt, data: 0}, {id: ItemID.kiwi, data: 0}]);

Harvest.setFood("pineappleyogurt","Pineapple yogurt",8);
Harvest.recipe({id:ItemID.pineappleyogurt}, [{id: ItemID.plain_yogurt, data: 0}, {id: ItemID.pineapple, data: 0}]);

Harvest.setFood("apricotyogurt","Apricot yogurt",8);
Harvest.recipe({id:ItemID.apricotyogurt}, [{id: ItemID.plain_yogurt, data: 0}, {id: ItemID.apricot, data: 0}]);

Harvest.setFood("cherryyogurt","Cherry yogurt",8);
Harvest.recipe({id:ItemID.cherryyogurt}, [{id: ItemID.plain_yogurt, data: 0}, {id: ItemID.cherry, data: 0}]);

Harvest.setFood("bananayogurt","Banana yogurt",8);
Harvest.recipe({id:ItemID.bananayogurt}, [{id: ItemID.plain_yogurt, data: 0}, {id: ItemID.banana, data: 0}]);

Harvest.setFood("figyogurt","Fig yogurt",8);
Harvest.recipe({id:ItemID.figyogurt}, [{id: ItemID.plain_yogurt, data: 0}, {id: ItemID.fig, data: 0}]);

Harvest.setFood("grapefruityogurt","Grapefruit yogurt",8);
Harvest.recipe({id:ItemID.grapefruityogurt}, [{id: ItemID.plain_yogurt, data: 0}, {id: ItemID.grapefruit, data: 0}]);

Harvest.setFood("gooseberryyogurt","Gooseberry yogurt",8);
Harvest.recipe({id:ItemID.gooseberryyogurt}, [{id: ItemID.plain_yogurt, data: 0}, {id: ItemID.gooseberry, data: 0}]);

Harvest.setFood("lemonyogurt","Lemon yogurt",8);
Harvest.recipe({id:ItemID.lemonyogurt}, [{id: ItemID.plain_yogurt, data: 0}, {id: ItemID.lemon, data: 0}]);

Harvest.setFood("limeyogurt","Lime yogurt",8);
Harvest.recipe({id:ItemID.limeyogurt}, [{id: ItemID.plain_yogurt, data: 0}, {id: ItemID.lime, data: 0}]);

Harvest.setFood("mangoyogurt","Mango yogurt",8);
Harvest.recipe({id:ItemID.mangoyogurt}, [{id: ItemID.plain_yogurt, data: 0}, {id: ItemID.mango, data: 0}]);

Harvest.setFood("orangeyogurt","Orange yogurt",8);
Harvest.recipe({id:ItemID.orangeyogurt}, [{id: ItemID.plain_yogurt, data: 0}, {id: ItemID.orange, data: 0}]);

Harvest.setFood("papayayogurt","Papaya yogurt",8);
Harvest.recipe({id:ItemID.papayayogurt}, [{id: ItemID.plain_yogurt, data: 0}, {id: ItemID.papaya, data: 0}]);

Harvest.setFood("peachyogurt","Peach yogurt",8);
Harvest.recipe({id:ItemID.peachyogurt}, [{id: ItemID.plain_yogurt, data: 0}, {id: ItemID.peach, data: 0}]);

Harvest.setFood("pearyogurt","Pear yogurt",8);
Harvest.recipe({id:ItemID.pearyogurt}, [{id: ItemID.plain_yogurt, data: 0}, {id: ItemID.pear, data: 0}]);

Harvest.setFood("persimmonyogurt","Persimmon yogurt",8);
Harvest.recipe({id:ItemID.persimmonyogurt}, [{id: ItemID.plain_yogurt, data: 0}, {id: ItemID.persimmon, data: 0}]);

Harvest.setFood("plumyogurt","Plum yogurt",8);
Harvest.recipe({id:ItemID.plumyogurt}, [{id: ItemID.plain_yogurt, data: 0}, {id: ItemID.plum, data: 0}]);

Harvest.setFood("pomegranateyogurt","Pomegranate yogurt",8);
Harvest.recipe({id:ItemID.pomegranateyogurt}, [{id: ItemID.plain_yogurt, data: 0}, {id: ItemID.pomegranate, data: 0}]);

Harvest.setFood("starfruityogurt","Starfruit yogurt",8);
Harvest.recipe({id:ItemID.starfruityogurt}, [{id: ItemID.plain_yogurt, data: 0}, {id: ItemID.starfruit, data: 0}]);

Harvest.setFood("coconutyogurt","Coconut yogurt",8);
Harvest.recipe({id:ItemID.coconutyogurt}, [{id: ItemID.plain_yogurt, data: 0}, {id: ItemID.coconut, data: 0}]);




// file: ITEMS/FOOD/jelly.js

Harvest.setFood("apricotjelly","Apricot jelly",4);
Harvest.recipe({id:ItemID.apricotjelly},[{id: ItemID.bakeware, data: 0},{id: ItemID.saucepan, data: 0},{id: ItemID.apricot, data: 0},  {id: 353, data: 0}]);

Harvest.setFood("cherryjelly","Cherry jelly",4);
Harvest.recipe({id:ItemID.cherryjelly},[{id: ItemID.bakeware, data: 0},{id: ItemID.saucepan, data: 0},{id: ItemID.cherry, data: 0},  {id: 353, data: 0}]);

Harvest.setFood("figjelly","Fig jelly",4);
Harvest.recipe({id:ItemID.figjelly},[{id: ItemID.bakeware, data: 0},{id: ItemID.saucepan, data: 0},{id: ItemID.fig, data: 0},  {id: 353, data: 0}]);

Harvest.setFood("grapefruitjelly","Grapefruit jelly",4);
Harvest.recipe({id:ItemID.grapefruitjelly},[{id: ItemID.bakeware, data: 0},{id: ItemID.saucepan, data: 0},{id: ItemID.grapefruit, data: 0},  {id: 353, data: 0}]);

Harvest.setFood("gooseberryjelly","Gooseberry jelly",4);
Harvest.recipe({id:ItemID.gooseberryjelly},[{id: ItemID.bakeware, data: 0},{id: ItemID.saucepan, data: 0},{id: ItemID.gooseberry, data: 0},  {id: 353, data: 0}]);

Harvest.setFood("lemonjelly","Lemon jelly",4);
Harvest.recipe({id:ItemID.lemonjelly},[{id: ItemID.bakeware, data: 0},{id: ItemID.saucepan, data: 0},{id: ItemID.lemon, data: 0},  {id: 353, data: 0}]);

Harvest.setFood("limejelly","Lime jelly",4);
Harvest.recipe({id:ItemID.limejelly},[{id: ItemID.bakeware, data: 0},{id: ItemID.saucepan, data: 0},{id: ItemID.lime, data: 0},  {id: 353, data: 0}]);

Harvest.setFood("mangojelly","Mango jelly",4);
Harvest.recipe({id:ItemID.mangojelly},[{id: ItemID.bakeware, data: 0},{id: ItemID.saucepan, data: 0},{id: ItemID.mango, data: 0},  {id: 353, data: 0}]);

Harvest.setFood("orangejelly","Orange jelly",4);
Harvest.recipe({id:ItemID.orangejelly},[{id: ItemID.bakeware, data: 0},{id: ItemID.saucepan, data: 0},{id: ItemID.orange, data: 0},  {id: 353, data: 0}]);

Harvest.setFood("papayajelly","Papaya jelly",4);
Harvest.recipe({id:ItemID.papayajelly},[{id: ItemID.bakeware, data: 0},{id: ItemID.saucepan, data: 0},{id: ItemID.papaya, data: 0},  {id: 353, data: 0}]);

Harvest.setFood("peachjelly","Peach jelly",4);
Harvest.recipe({id:ItemID.peachjelly},[{id: ItemID.bakeware, data: 0},{id: ItemID.saucepan, data: 0},{id: ItemID.peach, data: 0},  {id: 353, data: 0}]);

Harvest.setFood("pearjelly","Pear jelly",4);
Harvest.recipe({id:ItemID.pearjelly},[{id: ItemID.bakeware, data: 0},{id: ItemID.saucepan, data: 0},{id: ItemID.pear, data: 0},  {id: 353, data: 0}]);

Harvest.setFood("persimmonjelly","Persimmon jelly",4);
Harvest.recipe({id:ItemID.persimmonjelly},[{id: ItemID.bakeware, data: 0},{id: ItemID.saucepan, data: 0},{id: ItemID.persimmon, data: 0},  {id: 353, data: 0}]);

Harvest.setFood("plumjelly","Plum jelly",4);
Harvest.recipe({id:ItemID.plumjelly},[{id: ItemID.bakeware, data: 0},{id: ItemID.saucepan, data: 0},{id: ItemID.plum, data: 0},  {id: 353, data: 0}]);

Harvest.setFood("pomegranatejelly","Pomegranate jelly",4);
Harvest.recipe({id:ItemID.pomegranatejelly},[{id: ItemID.bakeware, data: 0},{id: ItemID.saucepan, data: 0},{id: ItemID.pomegranate, data: 0},  {id: 353, data: 0}]);

Harvest.setFood("starfruitjelly","Starfruit jelly",4);
Harvest.recipe({id:ItemID.starfruitjelly},[{id: ItemID.bakeware, data: 0},{id: ItemID.saucepan, data: 0},{id: ItemID.starfruit, data: 0},  {id: 353, data: 0}]);

Harvest.setFood("coconutcream","Coconut cream",2);
Harvest.recipe({id:ItemID.coconutcream},[{id: ItemID.pot, data: 0},{id: ItemID.coconutcream, data: 0}]);




// file: ITEMS/FOOD/salad.js

Harvest.setFood("beet_salad","Beet salad",10);
Harvest.recipe({id:ItemID.beet_salad}, [{id: ItemID.mixing_bowl, data: 0}, {id: 457, data: 0}, {id: ItemID.lettuce, data: 0}, {id: ItemID.vinegar, data: 0}, {id: ItemID.cheese, data: 0}]);

Harvest.setFood("fruit_salad","Fruit salad",6);
Harvest.recipeVariations({id:ItemID.fruit_salad},ItemID.cutting_board,[ItemID.wintersquash,ItemID.starfruit,ItemID.pomegranate,ItemID.plum,ItemID.persimmon,ItemID.pear,ItemID.papaya,ItemID.orange,ItemID.mango,ItemID.lime,ItemID.lemon,ItemID.gooseberry,ItemID.grapefruit,ItemID.fig,ItemID.dragonfruit,ItemID.date,ItemID.banana,ItemID.cherry,ItemID.strawberry,ItemID.raspberry,260,ItemID.cranberry,ItemID.blueberry,ItemID.blackberry,ItemID.grape,ItemID.cactusfruit,ItemID.cantaloupe]);

Harvest.setFood("spring_salad","Spring salad",9);
Harvest.recipeVariations({id:ItemID.spring_salad},ItemID.cutting_board,[ItemID.avocado,ItemID.lettuce,ItemID.onion,ItemID.cucumber,ItemID.bellpepper,ItemID.zucchini,ItemID.tomato,ItemID.leek,ItemID.rhubarb,ItemID.peas,391,ItemID.rutabaga,ItemID.broccoli,ItemID.cauliflower,ItemID.radish]);

Harvest.setFood("cucumber_salad","Cucumber salad",11);
Harvest.recipe({id:ItemID.cucumber_salad}, [{id: ItemID.cutting_board, data: 0}, {id: ItemID.spring_salad, data: 0}, {id: ItemID.cucumber, data: 0}]);

Harvest.setFood("ceasar_salade","Ceasar salad",10);
Harvest.recipe({id:ItemID.ceasar_salade}, [{id: ItemID.mixing_bowl, data: 0}, {id: ItemID.lettuce, data: 0}, {id: ItemID.toast, data: 0}, {id: ItemID.cheese, data: 0}, {id: ItemID.garlic, data: 0}, {id: ItemID.black_pepper, data: 0}]);




// file: ITEMS/FOOD/meat.js

Harvest.setFood("venisonRaw","Raw venison",3);

Harvest.setFood("venisonCooked","Cooked venison",8);
Recipes.addFurnace(ItemID.venisonRaw, ItemID.venisonCooked, 0);

Harvest.setFood("turkeyRaw","Raw turkey",2);

Harvest.setFood("turkeyCooked","Cooked turkey",5);
Recipes.addFurnace(ItemID.turkeyRaw, ItemID.turkeyCooked, 0);




// file: ITEMS/FOOD/food.js

IDRegistry.genItemID("black_pepper");
Item.createItem("black_pepper", "Black pepper", {name: "black_pepper", meta: 0});
Harvest.recipe({id:ItemID.black_pepper},[{id: ItemID.mortar_bowl, data: 0}, {id: ItemID.peppercorn, data: 0}]);

IDRegistry.genItemID("cocoa_powder");
Item.createItem("cocoa_powder", "Cocoa powder", {name: "cocoa_powder", meta: 0});
Harvest.recipe({id:ItemID.cocoa_powder},[{id: ItemID.mortar_bowl, data: 0}, {id: 351, data: 3}]);

IDRegistry.genItemID("almondbutter");
Item.createItem("almondbutter", "Almond Butter", {name: "almondbutter", meta: 0});
Harvest.recipe({id:ItemID.almondbutter},[{id: ItemID.juicer, data: 0}, {id: ItemID.almond, data: 0}]);

Harvest.setFood("chocolate_milk","Chocolate milk",6);
Harvest.recipe({id:ItemID.chocolate_milk},[{id: ItemID.cocoa_powder, data: 0}, {id: 325, data: 1}]);
Harvest.recipe({id:ItemID.chocolate_milk},[{id: ItemID.cocoa_powder, data: 0}, {id: ItemID.fresh_milk, data: 0}]);

Harvest.setFood("espresso","Espresso",8);
Harvest.recipe({id:ItemID.espresso},[{id: ItemID.coffee_beans, data: 0}, {id: ItemID.coffee_beans, data: 0}, {id: ItemID.coffee_beans, data: 0}, {id: 353, data: 0}]);

Harvest.setFood("chaitea","Chai tea",2);
Harvest.recipe({id:ItemID.chaitea},[{id: ItemID.black_pepper, data: 0},{id: ItemID.tealeaf, data: 0}]);

Harvest.setFood("raspberryicedtea","Raspberry ice tea",2);
Harvest.recipe({id:ItemID.raspberryicedtea},[{id: ItemID.raspberry, data: 0},{id: ItemID.tealeaf, data: 0},{id: 332, data: 0}]);

Harvest.setFood("hot_chocolate","Hot chocolate",2);
Harvest.recipe({id:ItemID.hot_chocolate},[{id: ItemID.juicer, data: 0}, {id: ItemID.fresh_milk, data: 0}, {id: ItemID.cocoa_powder, data: 0}]);

IDRegistry.genItemID("vinegar");
Item.createItem("vinegar", "Vinegar", {name: "vinegar", meta: 0});
Harvest.recipe({id:ItemID.vinegar},[{id: ItemID.pot, data: 0}, {id: ItemID.grape_juice, data: 0}]);

Harvest.setFood("cheese","Cheese",2);
Harvest.recipe({id:ItemID.cheese},[{id: ItemID.pot, data: 0}, {id: ItemID.fresh_milk, data: 0}, {id: ItemID.salt, data: 0}]);

Harvest.setFood("tortilla","Tortilla",6);
Harvest.recipe({id:ItemID.tortilla},[{id: ItemID.skillet, data: 0}, {id: ItemID.fresh_water, data: 0}, {id: ItemID.flour, data: 0}]);

Harvest.setFood("stock","Stock",3);
Harvest.recipeDuoVariations({id:ItemID.stock},ItemID.pot,
[352,363,319,423,411,365,ItemID.corn,ItemID.beet,ItemID.zucchini,ItemID.tomato,ItemID.cucumber,ItemID.rutabaga,ItemID.onion,ItemID.cabbage,ItemID.bellpepper,ItemID.peas,ItemID.bean,ItemID.rice,ItemID.artichoke,ItemID.parsnip,ItemID.rhubarb,ItemID.scallion,ItemID.soybean,ItemID.turnip,ItemID.okra,ItemID.asparagus,ItemID.eggplant,ItemID.bambooshoot,ItemID.brusselsprout,ItemID.cauliflower,ItemID.celery,ItemID.radish,86,392]);

Harvest.setFood("pot_roast","Pot roast",10);
Harvest.recipe({id:ItemID.pot_roast}, [{id: ItemID.pot, data: 0}, {id: 363, data: 0}, {id: 393, data: 0}, {id: 391, data: 0}, {id: ItemID.stock, data: 0}]);

Harvest.setFood("vegetable_soup","Vegetable soup",8);
Harvest.recipe({id:ItemID.vegetable_soup},[{id: ItemID.pot, data: 0}, {id: 40, data: 0}, {id: 393, data: 0}, {id: 391, data: 0}, {id: ItemID.stock, data: 0}]);
Harvest.recipe({id:ItemID.vegetable_soup},[{id: ItemID.pot, data: 0}, {id: 39, data: 0}, {id: 393, data: 0}, {id: 391, data: 0}, {id: ItemID.stock, data: 0}]);

IDRegistry.genItemID("heavy_cream");
Item.createItem("heavy_cream", "Heavy cream", {name: "heavy_cream", meta: 0});
Harvest.recipe({id:ItemID.heavy_cream},[{id: ItemID.mixing_bowl, data: 0}, {id: 352, data: 1}]);
Harvest.recipe({id:ItemID.heavy_cream},[{id: ItemID.mixing_bowl, data: 0}, {id: ItemID.fresh_milk, data: 0}]);

Harvest.setFood("pumpkin_soup","Pumpkin soup",8);
Harvest.recipe({id:ItemID.pumpkin_soup},[{id: ItemID.pot, data: 0}, {id: 86, data: 0}, {id: ItemID.heavy_cream, data: 0}, {id: ItemID.stock, data: 0}]);

Harvest.setFood("cornflakes","Cornflakes",8);
Harvest.recipe({id:ItemID.cornflakes},[{id: ItemID.mixing_bowl, data: 0}, {id: ItemID.fresh_milk, data: 0}, {id: ItemID.corn, data: 0}]);

Harvest.setFood("fried_egg","Fried egg",4);
Harvest.recipe({id:ItemID.fried_egg},[{id: ItemID.skillet, data: 0}, {id: 344, data: 0}]);

Harvest.setFood("boiled_egg","Boiled egg",2);
Harvest.recipe({id:ItemID.boiled_egg},[{id: ItemID.pot, data: 0}, {id: 344, data: 0}]);

Harvest.setFood("pancakes","Pancakes",6);
Harvest.recipe({id:ItemID.pancakes},[{id: ItemID.skillet, data: 0}, {id: ItemID.flour, data: 0}, {id: ItemID.fresh_milk, data: 0}, {id: 344, data: 0}]);
Harvest.recipe({id:ItemID.pancakes},[{id: ItemID.skillet, data: 0}, {id: ItemID.flour, data: 0}, {id: 325, data: 1}, {id: 344, data: 0}]);

IDRegistry.genItemID("dough");
Item.createItem("dough", "Dough", {name: "dough", meta: 0});
Harvest.recipe({id:ItemID.dough},[{id: ItemID.mixing_bowl, data: 0}, {id: ItemID.flour, data: 0}, {id: ItemID.fresh_water, data: 0}, {id: ItemID.salt, data: 0}]);
Harvest.recipe({id:ItemID.dough},[{id: ItemID.mixing_bowl, data: 0}, {id: ItemID.flour, data: 0}, {id: 325, data: 8}, {id: ItemID.salt, data: 0}]);

Harvest.setFood("cranberry_bar","Cranberry bar",8);
Harvest.recipe({id:ItemID.cranberry_bar},[{id: ItemID.bakeware, data: 0}, {id: ItemID.dough, data: 0}, {id: ItemID.cranberry, data: 0}, {id: 353, data: 0}]);

Harvest.setFood("figbar","Fig bar",10);
Harvest.recipe({id:ItemID.figbar},[{id: ItemID.bakeware, data: 0}, {id:ItemID.fig, data: 0},{id: ItemID.dough, data: 0},{id: 353, data: 0}]);

Harvest.setFood("lemonbar","Lemon bar",10);
Harvest.recipe({id:ItemID.lemonbar},[{id: ItemID.bakeware, data: 0}, {id:ItemID.lemon, data: 0},{id: ItemID.dough, data: 0},{id: 353, data: 0}]);

Harvest.setFood("pizza","Pizza",10);
Harvest.recipe({id:ItemID.pizza},[{id: ItemID.bakeware, data: 0}, {id: ItemID.dough, data: 0}, {id: ItemID.tomato, data: 0}, {id: 319, data: 0}, {id: ItemID.cheese, data: 0}]);

Harvest.setFood("fries","Fries",4);
Harvest.recipe({id:ItemID.fries},[{id: ItemID.bakeware, data: 0}, {id: 394, data: 0}, {id: ItemID.salt, data: 0}]);

Harvest.setFood("breaded_porkchop","Breaded porkchop",5);
Harvest.recipe({id:ItemID.breaded_porkchop},[{id: ItemID.skillet, data: 0}, {id: 319, data: 0}, {id: ItemID.flour, data: 0}]);

IDRegistry.genItemID("butter");
Item.createItem("butter", "Butter", {name: "butter", meta: 0});
Harvest.recipe({id:ItemID.butter},[{id: ItemID.saucepan, data: 0}, {id: ItemID.heavy_cream, data: 0}, {id: ItemID.salt, data: 0}]);

Harvest.setFood("hot_wings","Hot wings",5);
Harvest.recipe({id:ItemID.hot_wings},[{id: ItemID.skillet, data: 0}, {id: 366, data: 0}, {id: ItemID.chili_pepper, data: 0}, {id: ItemID.butter, data: 0}]);

IDRegistry.genItemID("mayo");
Item.createFoodItem("mayo", "Mayo", {name: "mayo", meta: 0});
Harvest.recipe({id:ItemID.mayo},[{id: ItemID.juicer, data: 0}, {id: 344, data: 0}]);

Harvest.setFood("fish_dinner","Fish dinner",10);
IDRegistry.genItemID("fish_dinner");
Item.createFoodItem("fish_dinner", "Fish dinner", {name: "fish_dinner", meta: 0}, {food: 10});
Harvest.recipe({id:ItemID.fish_dinner},[{id: ItemID.skillet, data: 0}, {id: 349, data: 0}, {id: ItemID.flour, data: 0}, {id: ItemID.mayo, data: 0}]);
Harvest.recipe({id:ItemID.fish_dinner},[{id: ItemID.skillet, data: 0}, {id: 460, data: 0}, {id: ItemID.flour, data: 0}, {id: ItemID.mayo, data: 0}]);

Harvest.setFood("potato_cakes","Potato cakes",7);
IDRegistry.genItemID("potato_cakes");
Item.createFoodItem("potato_cakes", "Potato cakes", {name: "potato_cakes", meta: 0}, {food: 7});
Harvest.recipe({id:ItemID.potato_cakes},[{id: ItemID.skillet, data: 0}, {id: 392, data: 0}, {id: ItemID.butter, data: 0}, {id: ItemID.onion, data: 0}]);

Harvest.setFood("hearty_breakfast","Hearty breakfast",18);
Harvest.recipe({id:ItemID.hearty_breakfast},[{id: ItemID.fried_egg, data: 0}, {id: 320, data: 0}, {id: ItemID.potato_cakes, data: 0}, {id: ItemID.toast, data: 0}, {id: ItemID.grape_juice, data: 0}]);

Harvest.setFood("steak_and_chips","Steak and chips",12);
Harvest.recipe({id:ItemID.steak_and_chips},[{id: ItemID.skillet, data: 0}, {id: 363, data: 0}, {id: ItemID.fries, data: 0}]);

Harvest.setFood("avocadoburrito","Avocado burrito",12);
Harvest.recipe({id:ItemID.avocadoburrito},[{id: ItemID.cutting_board, data: 0}, {id: ItemID.avocado, data: 0}, {id: ItemID.tortilla, data: 0}, {id: 366, data: 0}]);
Harvest.recipe({id:ItemID.avocadoburrito},[{id: ItemID.cutting_board, data: 0}, {id: ItemID.avocado, data: 0}, {id: ItemID.tortilla, data: 0}, {id: 320, data: 0}]);

Harvest.setFood("roast_chicken","Roast chicken",9);
Harvest.recipe({id:ItemID.roast_chicken},[{id: ItemID.bakeware, data: 0}, {id: 366, data: 0}, {id: ItemID.salt, data: 0}, {id: ItemID.black_pepper, data: 0}]);

Harvest.setFood("roast_potatoes","Roast potatoes",6);
Harvest.recipe({id:ItemID.roast_potatoes},[{id: ItemID.bakeware, data: 0}, {id: 392, data: 0}, {id: ItemID.salt, data: 0}, {id: ItemID.black_pepper, data: 0}]);

Harvest.setFood("sunday_roast","Strawberry juice",14);
Harvest.recipe({id:ItemID.sunday_roast},[{id: ItemID.bakeware, data: 0}, {id: ItemID.roast_chicken, data: 0}, {id: ItemID.roast_potatoes, data: 0}, {id: ItemID.lettuce, data: 0}]);

Harvest.setFood("lamb_with_mint_sauce","Lamb with mint sauce",11);
Harvest.recipe({id:ItemID.lamb_with_mint_sauce},[{id: ItemID.bakeware, data: 0}, {id: 423, data: 0}, {id: ItemID.spice_leaf, data: 0}, {id: ItemID.vinegar, data: 0}, {id: 353, data: 0}]);

Harvest.setFood("meaty_stew","Meaty stew",8);
Harvest.recipe({id:ItemID.meaty_stew},[{id: ItemID.pot, data: 0}, {id: 363, data: 0}, {id: ItemID.flour, data: 0}, {id: ItemID.stock, data: 0}]);
Harvest.recipe({id:ItemID.meaty_stew},[{id: ItemID.pot, data: 0}, {id: 319, data: 0}, {id: ItemID.flour, data: 0}, {id: ItemID.stock, data: 0}]);
Harvest.recipe({id:ItemID.meaty_stew},[{id: ItemID.pot, data: 0}, {id: 423, data: 0}, {id: ItemID.flour, data: 0}, {id: ItemID.stock, data: 0}]);
Harvest.recipe({id:ItemID.meaty_stew},[{id: ItemID.pot, data: 0}, {id: 363, data: 0}, {id: ItemID.flour, data: 0}, {id: ItemID.stock, data: 0}]);
Harvest.recipe({id:ItemID.meaty_stew},[{id: ItemID.pot, data: 0}, {id: 411, data: 0}, {id: ItemID.flour, data: 0}, {id: ItemID.stock, data: 0}]);

Harvest.setFood("chocolate_bar","Chocolate bar",5);
Harvest.recipe({id:ItemID.chocolate_bar},[{id: ItemID.saucepan, data: 0}, {id: ItemID.cocoa_powder, data: 0}, {id: ItemID.butter, data: 0}, {id: ItemID.fresh_milk, data: 0}]);
Harvest.recipe({id:ItemID.chocolate_bar},[{id: ItemID.saucepan, data: 0}, {id: ItemID.cocoa_powder, data: 0}, {id: ItemID.butter, data: 0}, {id: 325, data: 1}]);

Harvest.setFood("chaos_cookie","Chaos cookie",4);
Harvest.recipe({id:ItemID.chaos_cookie}, [{id: ItemID.bakeware, data: 0}, {id: ItemID.chocolate_bar, data: 0}, {id: ItemID.flour, data: 0}, {id: 352, data: 0}]);

Harvest.setFood("blueberry_pie","Blueberry pie",8);
Harvest.recipe({id:ItemID.blueberry_pie},[{id: ItemID.bakeware, data: 0}, {id: ItemID.blueberry, data: 0}, {id: ItemID.dough, data: 0}, {id: 353, data: 0}]);

Harvest.setFood("waffles","Waffles",9);
Harvest.recipe({id:ItemID.waffles},[{id: ItemID.skillet, data: 0}, {id: ItemID.flour, data: 0}, {id: 344, data: 0}, {id: ItemID.butter, data: 0}, {id: ItemID.fresh_milk, data: 0}]);
Harvest.recipe({id:ItemID.waffles},[{id: ItemID.skillet, data: 0}, {id: ItemID.flour, data: 0}, {id: 344, data: 0}, {id: ItemID.butter, data: 0}, {id: 325, data: 1}]);

IDRegistry.genItemID("fresh_water");
Item.createItem("fresh_water", "Fresh water", {name: "fresh_water", meta: 0});
Harvest.recipe({id:ItemID.fresh_water},[{id: 325, data: 8}]);

IDRegistry.genItemID("fresh_milk");
Item.createItem("fresh_milk", "Fresh milk", {name: "fresh_milk", meta: 0});
Harvest.recipe({id:ItemID.fresh_milk},[{id: 325, data: 1}]);

IDRegistry.genItemID("salt");
Item.createItem("salt", "Salt", {name: "salt", meta: 0});
Harvest.recipe({id:ItemID.salt},[{id: ItemID.fresh_water, data: 0}, {id: ItemID.pot, data: 0}]);

IDRegistry.genItemID("flour");
Item.createItem("flour", "Flour", {name: "flour", meta: 0});
Harvest.recipe({id:ItemID.flour},[{id: ItemID.mortar_bowl, data: 0}, {id: 394, data: 0}]);
Harvest.recipe({id:ItemID.flour},[{id: ItemID.mortar_bowl, data: 0}, {id: 296, data: 0}]);

Harvest.setFood("spidereyesoup","Spider Eye Soup",8);
IDRegistry.genItemID("spidereyesoup");
Item.createFoodItem("spidereyesoup", "Spider Eye Soup", {name: "spidereyesoup", meta: 0}, {food: 8});
Harvest.recipe({id:ItemID.spidereyesoup},[{id: ItemID.pot, data: 0}, {id: 375, data: 0}, {id: ItemID.stock, data: 0}]);

Harvest.setFood("zombiejerky","Zombie Jerky",4);
Harvest.recipe({id:ItemID.zombiejerky},[{id: ItemID.salt, data: 0}, {id: ItemID.salt, data: 0}, {id: 367, data: 0}]);

IDRegistry.genItemID("currypowder");
Item.createItem("currypowder", "Curry Powder", {name: "currypowder", meta: 0});
Harvest.recipe({id:ItemID.currypowder},[{id: ItemID.mortar_bowl, data: 0}, {id: ItemID.curryleaf, data: 0}]);

Harvest.setFood("vindaloo","Vindaloo",10);
Harvest.recipe({id:ItemID.vindaloo},[{id: ItemID.saucepan, data: 0}, {id: 363, data: 0}, {id: ItemID.currypowder, data: 0}, {id: ItemID.butter, data: 0}, {id: 351, data: 0}, {id: ItemID.onion, data: 0}]);
Harvest.recipe({id:ItemID.vindaloo}, [{id: ItemID.saucepan, data: 0}, {id: 365, data: 0}, {id: ItemID.currypowder, data: 0}, {id: ItemID.butter, data: 0}, {id: 351, data: 0}, {id: ItemID.onion, data: 0}]);
Harvest.recipe({id:ItemID.vindaloo},[{id: ItemID.saucepan, data: 0}, {id: 319, data: 0}, {id: ItemID.currypowder, data: 0}, {id: ItemID.butter, data: 0}, {id: 351, data: 0}, {id: ItemID.onion, data: 0}]);
Harvest.recipe({id:ItemID.vindaloo},[{id: ItemID.saucepan, data: 0}, {id: 411, data: 0}, {id: ItemID.currypowder, data: 0}, {id: ItemID.butter, data: 0}, {id: 351, data: 0}, {id: ItemID.onion, data: 0}]);
Harvest.recipe({id:ItemID.vindaloo},[{id: ItemID.saucepan, data: 0}, {id: 423, data: 0}, {id: ItemID.currypowder, data: 0}, {id: ItemID.butter, data: 0}, {id: 351, data: 0}, {id: ItemID.onion, data: 0}]);

Harvest.setFood("sausage","Sausage",6);
Harvest.recipe({id:ItemID.sausage},[{id: ItemID.cutting_board, data: 0}, {id: ItemID.salt, data: 0}, {id: ItemID.currypowder, data: 0}, {id: 363, data: 0}]);

Harvest.setFood("cashewChicken","Cashew chicken",6);
Harvest.recipe({id:ItemID.cashewChicken},[{id: ItemID.saucepan, data: 0}, {id: ItemID.peas, data: 0}, {id: ItemID.peppercorn, data: 0}, {id: ItemID.corn, data: 0},{id: 365, data: 0}]);

Harvest.setFood("chickenCeleryCasserole","Chicken celery casserole",12);
Harvest.recipe({id:ItemID.chickenCeleryCasserole},[{id: ItemID.bakeware, data: 0}, {id: 391, data: 0}, {id: ItemID.garlic, data: 0}, {id: 39, data: 0},{id: 365, data: 0}]);

Harvest.setFood("chickenChowmein","Chicken chowmein",10);
Harvest.recipe({id:ItemID.chickenChowmein},[{id: ItemID.skillet, data: 0}, {id: 391, data: 0}, {id: ItemID.peas, data: 0}, {id: ItemID.onion, data: 0},{id: ItemID.garlic, data: 0},{id: ItemID.stock, data: 0}]);

Harvest.setFood("chickenCurry","Chicken curry",14);
Harvest.recipe({id:ItemID.chickenCurry},[{id: ItemID.pot, data: 0}, {id: 392, data: 0}, {id: ItemID.plain_yogurt, data: 0}, {id: ItemID.spice_leaf, data: 0},{id: ItemID.chili_pepper, data: 0},{id: 365, data: 0},{id: ItemID.lettuce, data: 0},{id: ItemID.peas, data: 0},{id: ItemID.garlic, data: 0}]);

Harvest.setFood("chickenGumbo","Chicken gumbo",16);
Harvest.recipe({id:ItemID.chickenGumbo},[{id: ItemID.pot, data: 0}, {id: 392, data: 0}, {id: 391, data: 0}, {id: ItemID.onion, data: 0},{id: ItemID.stock, data: 0},{id: 365, data: 0},{id: ItemID.spice_leaf, data: 0},{id: ItemID.bellpepper, data: 0}]);

Harvest.setFood("chickenNoodleSoup","Chicken noodle soup",9);
Harvest.recipe({id:ItemID.chickenNoodleSoup},[{id: ItemID.pot, data: 0}, {id: 296, data: 0}, {id: 391, data: 0}, {id: ItemID.stock, data: 0}]);

Harvest.setFood("chickenPotPie","Chicken pot pie",10);
Harvest.recipe({id:ItemID.chickenPotPie},[{id: ItemID.bakeware, data: 0}, {id: 265, data: 0}, {id: 391, data: 0},{id: ItemID.dough, data: 0}]);

Harvest.setFood("chickenSandwich","Chicken sandwich",11);
Harvest.recipe({id:ItemID.chickenSandwich},[{id: ItemID.skillet, data: 0}, {id: 365, data: 0}, {id: 297, data: 0}, {id: ItemID.mayo, data: 0}]);

Harvest.setFood("friredChicken","Fried chicken",11);
Harvest.recipe({id:ItemID.friredChicken},[{id: ItemID.pot, data: 0}, {id: 365, data: 0}, {id: ItemID.butter, data: 0}, {id: ItemID.spice_leaf, data: 0}, {id: ItemID.black_pepper, data: 0}]);

Harvest.setFood("garlicChicken","Garlic chicken",12);
Harvest.recipe({id:ItemID.garlicChicken},[{id: ItemID.bakeware, data: 0}, {id: ItemID.garlic, data: 0}, {id: ItemID.garlic, data: 0},{id: 365, data: 0}]);

Harvest.setFood("generalTsoChicken","General tso chicken",12);
Harvest.recipe({id:ItemID.generalTsoChicken},[{id: ItemID.skillet, data: 0}, {id: 365, data: 0}, {id: ItemID.lettuce, data: 0}, {id: 353, data: 0}]);

Harvest.setFood("gingerChicken","Ginger chicken",12);
Harvest.recipe({id:ItemID.gingerChicken},[{id: ItemID.saucepan, data: 0}, {id: ItemID.garlic, data: 0}, {id: 365, data: 0}, {id: ItemID.onion, data: 0}, {id: 353, data: 0}]);

Harvest.setFood("kungPaoCkicken","Kung pao chicken",12);
Harvest.recipe({id:ItemID.kungPaoCkicken},[{id: ItemID.saucepan, data: 0}, {id:365, data: 0}, {id: ItemID.grape, data: 0}, {id: ItemID.garlic, data: 0}, {id: ItemID.onion, data: 0},{id:353 ,data:0},{id:ItemID.butter ,data:0},{id:ItemID.peppercorn ,data:0},{id:ItemID.cucumber ,data:0}]);

Harvest.setFood("lemonChicken","Lemon chicken",9);
Harvest.recipe({id:ItemID.lemonChicken},[{id: ItemID.bakeware, data: 0}, {id:365, data: 0}, {id: ItemID.grape, data: 0},{id:ItemID.butter ,data:0}]);

Harvest.setFood("orangeChicken","Orange chicken",12);
Harvest.recipe({id:ItemID.orangeChicken},[{id: ItemID.saucepan, data: 0}, {id:365, data: 0}, {id: ItemID.grape, data: 0},{id:353 ,data:0},{id:ItemID.lettuce ,data:0},{id:ItemID.cabbage ,data:0}]);

Harvest.setFood("sweetAndSourChicken","Sweet and sour chicken",10);
Harvest.recipe({id:ItemID.sweetAndSourChicken},[{id: ItemID.saucepan, data: 0}, {id:365, data: 0}, {id: ItemID.butter, data: 0},{id:ItemID.grape ,data:0},{id:ItemID.bellpepper ,data:0},{id:ItemID.onion ,data:0},{id:ItemID.tomato ,data:0}]);

Harvest.setFood("teriyakiChicken","Teriyaki chicken",10);
Harvest.recipe({id:ItemID.teriyakiChicken},[{id: ItemID.skillet, data: 0}, {id:365, data: 0}, {id: ItemID.peas, data: 0},{id:ItemID.sausage ,data:0},{id:ItemID.candleberry ,data:0},{id:ItemID.onion ,data:0},{id:ItemID.garlic ,data:0}]);

Harvest.setFood("baconAndEggs","Bacon and eggs",10);
Harvest.recipe({id:ItemID.baconAndEggs},[{id: ItemID.skillet, data: 0}, {id:319, data: 0}, {id: 344, data: 0}]);

Harvest.setFood("bakedHam","Baked ham",9);
Harvest.recipe({id:ItemID.bakedHam},[{id: ItemID.bakeware, data: 0}, {id:319, data: 0}, {id: 260, data: 0}, {id: 353, data: 0}]);

Harvest.setFood("honeyGlazedHam","Honey glazed ham",10);
Harvest.recipe({id:ItemID.honeyGlazedHam}, [{id: ItemID.saucepan, data: 0}, {id:319, data: 0}, {id: 353, data: 0}, {id: ItemID.black_pepper, data: 0}]);

Harvest.setFood("honeySoyRibs","Honey soy ribs",14);
Harvest.recipe({id:ItemID.honeySoyRibs},[{id: ItemID.bakeware, data: 0}, {id:319, data: 0}, {id: 353, data: 0}, {id: ItemID.sausage, data: 0},{id: ItemID.garlic, data: 0},{id: ItemID.vinegar, data: 0}]);

Harvest.setFood("hotAndSourSoup","Hot and sour soup",12);
Harvest.recipe({id:ItemID.hotAndSourSoup},[{id: ItemID.saucepan, data: 0}, {id:319, data: 0}, {id: 39, data: 0}, {id: ItemID.cucumber, data: 0},{id: 344, data: 0},{id: ItemID.vinegar, data: 0},{id: ItemID.black_pepper, data: 0}]);

Harvest.setFood("peaAndHamSoup","Pea and ham soup",8);
Harvest.recipe({id:ItemID.peaAndHamSoup},[{id: ItemID.pot, data: 0}, {id:319, data: 0}, {id: ItemID.peas, data: 0}, {id: ItemID.strawberry, data: 0},{id: ItemID.onion, data: 0},{id: 391, data: 0},{id: ItemID.raspberry, data: 0},{id: ItemID.black_pepper, data: 0}]);

Harvest.setFood("pineappleHam","Pineapple ham",10);
Harvest.recipe({id:ItemID.pineappleHam},[{id: ItemID.bakeware, data: 0}, {id:319, data: 0}, {id: 353, data: 0}]);

Harvest.setFood("porkLoMein","Pork lo mein",14);
Harvest.recipe({id:ItemID.porkLoMein},[{id: ItemID.pot, data: 0}, {id:319, data: 0}, {id: 296, data: 0}, {id: ItemID.onion, data: 0}, {id: 291, data: 0},{id: ItemID.cabbage, data: 0},{id: ItemID.garlic, data: 0},{id: ItemID.sausage, data: 0}]);

Harvest.setFood("spicyMustardPork","Spicy mustarg pork",10);
Harvest.recipe({id:ItemID.spicyMustardPork}, [{id: ItemID.saucepan, data: 0}, {id:319, data: 0}, {id: ItemID.garlic, data: 0}]);
Harvest.recipe({id:ItemID.spicyMustardPork},[{id: ItemID.saucepan, data: 0}, {id:319, data: 0}, {id: ItemID.salt, data: 0}]);
Harvest.recipe({id:ItemID.spicyMustardPork},[{id: ItemID.saucepan, data: 0}, {id:319, data: 0}, {id: ItemID.black_pepper, data: 0}]);

Harvest.setFood("honeyLemonLamb","Honey lemon lamb",8);
Harvest.recipe({id:ItemID.honeyLemonLamb},[{id: ItemID.pot, data: 0}, {id:291, data: 0}, {id: 292, data: 0}, {id: 411, data: 0}, {id: 39, data: 0}]);

Harvest.setFood("lambBarleySoup","Lamb barley soup",10);
Harvest.recipe({id:ItemID.lambBarleySoup},[{id: ItemID.pot, data: 0}, {id:291, data: 0}, {id: ItemID.stock, data: 0}, {id: 411, data: 0}, {id: ItemID.onion, data: 0}]);

Harvest.setFood("shepardsPie","Shepards pie",12);
Harvest.recipe({id:ItemID.shepardsPie}, [{id: ItemID.bakeware, data: 0}, {id:292, data: 0}, {id: ItemID.dough, data: 0}, {id: 291, data: 0}, {id: ItemID.peas, data: 0}]);

Harvest.setFood("beefjerky","Beefjerky",5);
Harvest.recipe({id:ItemID.beefjerky},[{id:363, data: 0}, {id: ItemID.salt, data: 0}]);

Harvest.setFood("meatPie","Meat pie",14);
Harvest.recipe({id:ItemID.meatPie},[{id: ItemID.dough, data: 0}, {id:363, data: 0}, {id: ItemID.bakeware, data: 0}, {id: ItemID.onion, data: 0}, {id: ItemID.garlic, data: 0}, {id: ItemID.stock, data: 0}]);

Harvest.setFood("bakedbeans","Baked Beans",10);
Harvest.recipe({id:ItemID.bakedbeans},[{id: ItemID.bean, data: 0}, {id: ItemID.pot, data: 0}, {id:320, data: 0}, {id:353, data: 0}]);

Harvest.setFood("maplesausage","Maple Sausage",1);
Harvest.recipe({id:ItemID.maplesausage},[{id: ItemID.spice_leaf, data: 0}, {id:363, data: 0}]);

Harvest.setFood("toast","Toast",4);
Harvest.recipe({id:ItemID.toast},[{id: ItemID.bakeware, data: 0}, {id:297, data: 0}]);

Harvest.setFood("hamburger","Hamburger",8);
Harvest.recipe({id:ItemID.hamburger},[{id: ItemID.skillet, data: 0}, {id:363, data: 0}, {id: ItemID.toast, data: 0}]);

Harvest.setFood("dimsum","Dim Sum",12);
/*
Harvest.recipe({id:ItemID.dimsum},[{id: ItemID.pot, data: 0}, {id: ItemID.waterchestnut, data: 0}, {id: ItemID.rice, data: 0}, {id: ItemID.dough, data: 0}, {id: ItemID.whitemushroom, data: 0}, {id:365, data: 0}]);
Harvest.recipe({id:ItemID.dimsum},[{id: ItemID.pot, data: 0}, {id: ItemID.waterchestnut, data: 0}, {id: ItemID.rice, data: 0}, {id: ItemID.dough, data: 0}, {id: ItemID.whitemushroom, data: 0}, {id:363, data: 0}]);
Harvest.recipe({id:ItemID.dimsum}, [{id: ItemID.pot, data: 0}, {id: ItemID.waterchestnut, data: 0}, {id: ItemID.rice, data: 0}, {id: ItemID.dough, data: 0}, {id: ItemID.whitemushroom, data: 0}, {id:319, data: 0}]);
Harvest.recipe({id:ItemID.dimsum},[{id: ItemID.pot, data: 0}, {id: ItemID.waterchestnut, data: 0}, {id: ItemID.rice, data: 0}, {id: ItemID.dough, data: 0}, {id: ItemID.whitemushroom, data: 0}, {id:411, data: 0}]);
Harvest.recipe({id:ItemID.dimsum},[{id: ItemID.pot, data: 0}, {id: ItemID.waterchestnut, data: 0}, {id: ItemID.rice, data: 0}, {id: ItemID.dough, data: 0}, {id: ItemID.whitemushroom, data: 0}, {id:423, data: 0}],);
Harvest.recipe({id:ItemID.dimsum},[{id: ItemID.pot, data: 0}, {id: ItemID.waterchestnut, data: 0}, {id: ItemID.rice, data: 0}, {id: ItemID.dough, data: 0}, {id: ItemID.whitemushroom, data: 0}, {id: ItemID.turkeyRaw, data: 0}]);
Harvest.recipe({id:ItemID.dimsum},[{id: ItemID.pot, data: 0}, {id: ItemID.waterchestnut, data: 0}, {id: ItemID.rice, data: 0}, {id: ItemID.dough, data: 0}, {id: ItemID.whitemushroom, data: 0}, {id: ItemID.venisonRaw, data: 0}]);
*/
Harvest.recipe({id:ItemID.dimsum},[{id: ItemID.pot, data: 0}, {id: ItemID.waterchestnut, data: 0}, {id: ItemID.rice, data: 0}, {id: ItemID.dough, data: 0}, {id:40, data: 0}, {id:365, data: 0}]);
Harvest.recipe({id:ItemID.dimsum},[{id: ItemID.pot, data: 0}, {id: ItemID.waterchestnut, data: 0}, {id: ItemID.rice, data: 0}, {id: ItemID.dough, data: 0}, {id:40, data: 0}, {id:363, data: 0}]);
Harvest.recipe({id:ItemID.dimsum},[{id: ItemID.pot, data: 0}, {id: ItemID.waterchestnut, data: 0}, {id: ItemID.rice, data: 0}, {id: ItemID.dough, data: 0}, {id:40, data: 0}, {id:319, data: 0}]);
Harvest.recipe({id:ItemID.dimsum},[{id: ItemID.pot, data: 0}, {id: ItemID.waterchestnut, data: 0}, {id: ItemID.rice, data: 0}, {id: ItemID.dough, data: 0}, {id:40, data: 0}, {id:411, data: 0}]);
Harvest.recipe({id:ItemID.dimsum},[{id: ItemID.pot, data: 0}, {id: ItemID.waterchestnut, data: 0}, {id: ItemID.rice, data: 0}, {id: ItemID.dough, data: 0}, {id:40, data: 0}, {id:423, data: 0}]);
Harvest.recipe({id:ItemID.dimsum},[{id: ItemID.pot, data: 0}, {id: ItemID.waterchestnut, data: 0}, {id: ItemID.rice, data: 0}, {id: ItemID.dough, data: 0}, {id:40, data: 0}, {id: ItemID.turkeyRaw, data: 0}]);
Harvest.recipe({id:ItemID.dimsum},[{id: ItemID.pot, data: 0}, {id: ItemID.waterchestnut, data: 0}, {id: ItemID.rice, data: 0}, {id: ItemID.dough, data: 0}, {id:40, data: 0}, {id: ItemID.venisonRaw, data: 0}]);
Harvest.recipe({id:ItemID.dimsum},[{id: ItemID.pot, data: 0}, {id: ItemID.waterchestnut, data: 0}, {id: ItemID.rice, data: 0}, {id: ItemID.dough, data: 0}, {id:39, data: 0}, {id:365, data: 0}]);
Harvest.recipe({id:ItemID.dimsum},[{id: ItemID.pot, data: 0}, {id: ItemID.waterchestnut, data: 0}, {id: ItemID.rice, data: 0}, {id: ItemID.dough, data: 0}, {id:39, data: 0}, {id:363, data: 0}]);
Harvest.recipe({id:ItemID.dimsum},[{id: ItemID.pot, data: 0}, {id: ItemID.waterchestnut, data: 0}, {id: ItemID.rice, data: 0}, {id: ItemID.dough, data: 0}, {id:39, data: 0}, {id:319, data: 0}]);
Harvest.recipe({id:ItemID.dimsum},[{id: ItemID.pot, data: 0}, {id: ItemID.waterchestnut, data: 0}, {id: ItemID.rice, data: 0}, {id: ItemID.dough, data: 0}, {id:39, data: 0}, {id:411, data: 0}]);
Harvest.recipe({id:ItemID.dimsum}, [{id: ItemID.pot, data: 0}, {id: ItemID.waterchestnut, data: 0}, {id: ItemID.rice, data: 0}, {id: ItemID.dough, data: 0}, {id:39, data: 0}, {id:423, data: 0}]);
Harvest.recipe({id:ItemID.dimsum},[{id: ItemID.pot, data: 0}, {id: ItemID.waterchestnut, data: 0}, {id: ItemID.rice, data: 0}, {id: ItemID.dough, data: 0}, {id:39, data: 0}, {id: ItemID.turkeyRaw, data: 0}]);
Harvest.recipe({id:ItemID.dimsum},[{id: ItemID.pot, data: 0}, {id: ItemID.waterchestnut, data: 0}, {id: ItemID.rice, data: 0}, {id: ItemID.dough, data: 0}, {id:39, data: 0}, {id: ItemID.venisonRaw, data: 0}]);
Harvest.recipe({id:ItemID.dimsum},[{id: ItemID.bakeware, data: 0}, {id:363, data: 0}, {id:392, data: 0}, {id:391, data: 0}, {id: ItemID.dough, data: 0}, {id: ItemID.peas, data: 0}]);

Harvest.setFood("cornishpasty","Cornish Pasty",12);
Harvest.recipe({id:ItemID.cornishpasty},[{id: ItemID.bakeware, data: 0}, {id:363, data: 0}, {id:392, data: 0}, {id: ItemID.dough, data: 0}, {id: ItemID.rutabaga, data: 0}]);

Harvest.setFood("cornedbeef","Corned Beef",10);
Harvest.recipe({id:ItemID.cornedbeef},[{id: ItemID.pot, data: 0}, {id:363, data: 0}, {id: ItemID.salt, data: 0}, {id:353, data: 0}, {id: ItemID.mustardseeds, data: 0}, {id: ItemID.spice_leaf, data: 0}, {id: ItemID.ginger, data: 0}]);

Harvest.setFood("beefwellington","Beef Wellington",18);
Harvest.recipe({id:ItemID.beefwellington},[{id:363, data: 0}, {id: ItemID.dough, data: 0}, {id: ItemID.spinach, data: 0}, {id:40, data: 0}]);
Harvest.recipe({id:ItemID.beefwellington}, [{id:363, data: 0}, {id: ItemID.dough, data: 0}, {id: ItemID.spinach, data: 0}, {id:39, data: 0}]);

Harvest.setFood("baconwrappeddates","Bacon wrapped dates",10);
Harvest.recipe({id:ItemID.baconwrappeddates},[{id: ItemID.bakeware, data: 0}, {id:320, data: 0},{id: ItemID.date, data: 0}]);

Harvest.setFood("candiedlemon","Carnied lemon",3);
Harvest.recipe({id:ItemID.candiedlemon},[{id: ItemID.saucepan, data: 0}, {id:353, data: 0},{id: ItemID.lemon, data: 0}]);




// file: ITEMS/wax.js

IDRegistry.genItemID("pressedWax");
Item.createItem("pressedWax", "Wax", {name: "wax", meta: 0}, {});

IDRegistry.genBlockID("pressedWaxBlock"); 
Block.createBlock("pressedWaxBlock", [
	{name: "Pressed wax", texture: [["pressedwax", 0]], inCreative: true}
]);

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.pressedWaxBlock, count: 1, data: 0}, ["bbb", "bbb"," bbb"], [ "b", ItemID.pressedWax, 0]);
	Recipes.addShapeless({id: ItemID.pressedWax, count: 1, data: 0}, [{id: ItemID.pot, data: 0}, {id: ItemID.candleberry, data: 0},{id: ItemID.candleberry, data: 0},{id: ItemID.candleberry, data: 0},{id: ItemID.candleberry, data: 0},{id: ItemID.candleberry, data: 0},{id: ItemID.candleberry, data: 0},{id: ItemID.candleberry, data: 0},{id: ItemID.candleberry, data: 0}], function(api, field, result){ 
		for (var i in field){
			if (field[i].id != ItemID.pot){
				api.decreaseFieldSlot(i);
			}
		}
	});
});




// file: ITEMS/armor.js

IDRegistry.genItemID("hardedLeather");
Item.createItem("hardedLeather", "Harded leather", {name: "hardenedleatherItem", meta: 0}, {stack: 64});
IDRegistry.genItemID("hardedHelm");
IDRegistry.genItemID("hardedChestplate");
IDRegistry.genItemID("hardedLegging");
IDRegistry.genItemID("hardedFoots");

Item.createArmorItem("hardedHelm", "Harded Leather Helmet", {name: "hardenedleatherhelmItem"}, {type: "helmet", armor: 2, durability: 149, texture: "armor/hardenedleather_1.png"});
Item.createArmorItem("hardedChestplate", "Harded Leather Chestplate", {name: "hardenedleatherchestItem"}, {type: "chestplate", armor: 6, durability: 216, texture: "armor/hardenedleather_1.png"});
Item.createArmorItem("hardedLegging", "Harded Leather Leggings", {name: "hardenedleatherleggingsItem"}, {type: "leggings", armor: 5, durability: 203, texture: "armor/hardenedleather_2.png"});
Item.createArmorItem("hardedFoots", "Harded Leather Boots", {name: "hardenedleatherbootsItem"}, {type: "boots", armor: 2, durability: 176, texture: "armor/hardenedleather_1.png"});
Callback.addCallback("PostLoaded", function(){
	Recipes.addShapeless({id: ItemID.hardedLeather, count: 1, data: 0}, [{id: 334, data: 0}, {id: ItemID.pressedWax, data: 0}]);
	Recipes.addShaped({id: ItemID.hardedHelm, count: 1, data: 0}, [
		"xxx",
		"x x"
	], ['x', ItemID.hardedLeather, 0]);

	Recipes.addShaped({id: ItemID.hardedChestplate, count: 1, data: 0}, [
		"x x",
		"xxx",
		"xxx"
	], ['x', ItemID.hardedLeather, 0]);

	Recipes.addShaped({id: ItemID.hardedLegging, count: 1, data: 0}, [
		"xxx",
		"x x",
		"x x"
	], ['x', ItemID.hardedLeather, 0]);

	Recipes.addShaped({id: ItemID.hardedFoots, count: 1, data: 0}, [
		"x x",
		"x x"
	], ['x', ItemID.hardedLeather, 0]);
});




// file: ITEMS/candles.js

function getPlaceFuncForCandle(i){
	return function(coords, item, block){
		if(coords.side == 1 && !GenerationUtils.isTransparentBlock(block.id)){
			World.setBlock(coords.x, coords.y + 1,coords.z, BlockID.candle, i);
			Player.decreaseCarriedItem(1);
		}
	};
}
for(var i = 0; i < 16; i++){
	IDRegistry.genItemID("candleItem" + i);
	Item.createItem("candleItem" + i, "Candle", {name: "candle", meta: i}, {});
	Item.registerUseFunction("candleItem"+ i , getPlaceFuncForCandle(i));
};

Callback.addCallback("PostLoaded", function(){
	Recipes.addShapeless({id: ItemID.candleItem0, count: 4, data: 0}, [{id: 287, data: 0}, {id: ItemID.pressedWax, data: 0}]);
	for(var paintIndex = 14; paintIndex >= 0; paintIndex--){
		var candleData = 15 - paintIndex;
		Recipes.addShapeless({id: Item.getNumericId("candleItem" + candleData), count: 4, data: 0}, [{id: 351, data: paintIndex},{id: ItemID.candleItem0, data: 0},{id: ItemID.candleItem0, data: 0},{id: ItemID.candleItem0, data: 0}]);
	}
});




// file: BLOCKS/salt.js

IDRegistry.genBlockID("salt"); 
Block.createBlock("salt", [
	{name: "Salt", texture: [["saltBLOCK", 0]], inCreative: true}
]);
Block.registerDropFunction("salt", function(coords, blockID, blockData, level){
	var drop = [];
		drop.push([ItemID.salt, Random.Int(2,5), 0]);	
	return drop;
});




// file: GENERATION/salt.js

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
	var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 64, 128);
	coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);
	if(Math.random()< __config__.access("generation.numbers.other.salt")){
		 for(var idd in SaltBiomes ){
			var id = SaltBiomes[idd];
			if((World.getBiome((chunkX + 0.5) * 16, (chunkZ + 0.5) * 16)==id)){
				World.setBlock(coords.x, coords.y + 1, coords.z, BlockID.salt, 0);
				if (Math.random() < .5){ // top
					World.setBlock(coords.x, coords.y + 2, coords.z, BlockID.salt, 0);
				}
				if (Math.random() < .5){ // left
					World.setBlock(coords.x + 1, coords.y + 1, coords.z, BlockID.salt, 0);
				}
				if (Math.random() < .5){ // right
					World.setBlock(coords.x - 1, coords.y + 1, coords.z, BlockID.salt, 0);
				}
				if (Math.random() < .5){ // front
					World.setBlock(coords.x, coords.y + 1, coords.z + 1, BlockID.salt, 0);
				}
				if (Math.random() < .5){ // back
					World.setBlock(coords.x, coords.y + 1, coords.z - 1, BlockID.salt, 0);
				}
			}
		}
	}
});
Callback.addCallback("GenerateChunkUnderground", function(chunkX, chunkZ){
	var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 64, 128);
	if(Math.random()< __config__.access("generation.numbers.other.salt") ){
		if(World.getBlockID(coords.x,coords.y,coords.z)!=0){
			World.setBlock(coords.x, coords.y , coords.z, BlockID.salt, 0);
		}
	}
});




// file: BLOCKS/sinks.js

IDRegistry.genBlockID("well");
Block.createBlock("well", [
	{name: "Sink", texture: [["sinkbottom", 0], ["sinktop", 0], ["sinkside", 0], ["sinkside", 0], ["sinkside", 0], ["sinkside", 0]], inCreative: true},
	{name: "Sink", texture: [["sinkbottom", 1], ["sinktop", 1], ["sinkside", 1], ["sinkside", 1], ["sinkside", 1], ["sinkside", 1]], inCreative: true},
	{name: "Sink", texture: [["sinkbottom", 2], ["sinktop", 2], ["sinkside", 2], ["sinkside", 2], ["sinkside", 2], ["sinkside", 2]], inCreative: true},
	{name: "Sink", texture: [["sinkbottom", 3], ["sinktop", 3], ["sinkside", 3], ["sinkside", 3], ["sinkside", 3], ["sinkside", 3]], inCreative: true}
]);
Callback.addCallback("ItemUse", function(coords,item,block){
	if(block.id==BlockID.well){
		if((item.id==325&&item.data==0)){
			Player.addItemToInventory(325, 1, 8);
			Player.decreaseCarriedItem(1);
		}
		if(item.id==374){
			Player.addItemToInventory(373, 1, 0);
			Player.decreaseCarriedItem(1);
		}
	}
});
Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.well, count: 1, data: 0}, [
		"ara",
		"ara",
		"ara"
	], ["a", 265, 0, 'r', 17, -1]);
	 Recipes.addShaped({id: BlockID.well, count: 1, data: 1}, [
		"ara",
		"ara",
		"ara"
	], ["a", 265, 0, 'r', 1, -1]);
	 Recipes.addShaped({id: BlockID.well, count: 1, data: 2}, [
		"ara",
		"ara",
		"ara"
	], ["a", 265, 0, 'r', 82, 0]);
	 Recipes.addShaped({id: BlockID.well, count: 1, data: 3}, [
		"ara",
		"ara",
		"ara"
	], ["a", 265, 0, 'r', 1, -1]);
});




// file: BLOCKS/animalTrap.js

IDRegistry.genBlockID("animalTrap");
Block.createBlock("animalTrap", [
    {name: "Animal trap", texture: [["animaltrap", 0]], inCreative: true}
]);

var elementsForTrap = {};
function isValidItemInTrap(){return false}
elementsForTrap["slotBait"] = {type: "slot", x: 408, y: 173, size: 71, bitmap: "slot", isTransparentBackground: true};
for(let i = 0; i < 18; i++){
	let x = i % 6;
    let y = Math.floor(i / 6);
	elementsForTrap["slot" + i] = {type: "slot", x: 553 + 72*x, y: 103 + 72*y, size: 71, isValid: isValidItemInTrap, bitmap: "slot", isTransparentBackground: true}
}

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.animalTrap, count: 1, data: 0}, [
		"aya",
		"rtr",
		"ara"
	], ["a", 280, 0, 'r', 287, -1, 't', 54, 0, 'y', 96, -1]);
});



var animalTrapGUI = new UI.StandartWindow({
	standart: {
        header: {
            text: {
                text:"AnimalTrap"
            }
        },
        inventory: {standart: true},
        background: {standart: true}
	},

    drawing: [
		{type: "bitmap", bitmap: "groundtrap", x: 320, y: 70, scale: 4}
	],

    elements: elementsForTrap
});

Block.setRandomTickCallback(BlockID.animalTrap, function(x, y, z){
    let tileEntity = World.getTileEntity(x, y, z);
    if(tileEntity) tileEntity.onRandomTick();
});

TileEntity.registerPrototype(BlockID.animalTrap, {
    defaultValues: {
        chance: .1
    },

    getGuiScreen: function(){
        return animalTrapGUI;
    },

    onRandomTick: function(){
        if(Math.random() < this.data.chance) this.produce();
    },

    produce: function(){
        let baitSlot = this.container.getSlot("slotBait");
        let result = this.swither(baitSlot.id);
        baitSlot.count--;
        if(this.checker() && result){
            this.putResult(result);
        }
        this.container.validateAll();
    },

    hasGrass: function(){

    },

    findSides: [2, 3, 4, 5],
    findedGrass: 0,
    findGrass: function(x, y, z){
        let newCount = count;
        for(let i in this.findSides){
            let coords = World.getRelativeCoords(this.x, this.y, this.z, this.findSides[i]);
            let block = World.getBlockID();
            //TODO finish
        }

    },

    putResult: function(result){
        let count = Random.Int(1, 3);
        for(var i = 0; i < count; i++){
            var targetItem = result[Random.Int(0, result.length - 1)];
            this.addResult("slot", targetItem, 1, 0);
        }
        this.container.validateAll();
    },

    checker:function(){//TODO rewrite
        if(World.getBlockID(this.x+1,this.y,this.z)==2&&
           World.getBlockID(this.x-1,this.y,this.z)==2&&
           World.getBlockID(this.x,this.y,this.z+1)==2&&
           World.getBlockID(this.x,this.y,this.z-1)==2&&
           World.getBlockID(this.x-1,this.y,this.z-1)==2&&
           World.getBlockID(this.x+1,this.y,this.z-1)==2&&
           World.getBlockID(this.x+1,this.y,this.z+1)==2&&
           World.getBlockID(this.x-1,this.y,this.z+1)==2) return true;
           return false;
    },

    tick: function(){
        var nnumber = __config__.access("traps.animal.number");
        var slot = this.container.getSlot("slotBait").id;
        if((this.data.progress<100)&&((slot==ItemID.graitBait)||(slot==ItemID.fruitBait)||(slot==ItemID.veggieBait))&&(Math.random()<nnumber)){
            this.checker();
        }
        if((this.data.progress==100)&&((slot==ItemID.graitBait)||(slot==ItemID.fruitBait)||(slot==ItemID.veggieBait))){
            var slot = this.container.getSlot("slotBait");
            slot.count-=1;
            this.data.progress=0;
            this.swither();
            var tt = Random.Int(1,3);
            for(var u = 0; u < tt; u++){
                var targetItem = this.data.drop[Random.Int(0,this.data.drop.length-1)];
                this.addResult("slot",targetItem, 1, 0);
            }
            this.container.validateAll();
        }
    },

    addResult: function(area, id, count, data){
        for (var i = 0; i < 18; i++){
            var slot = this.container.getSlot(area + i);
            if (slot.id == 0){
                var add = Math.min(64 - slot.count, count);
                slot.count += add;
                slot.id = id;
                slot.data = data;
                count -= add;
                if (count == 0){
                    break;
                }
            }
        }
        if (count > 0){
            World.drop(this.x + .5, this.y + 1, this.z + .5, id, count, data);
        }
    },

    swither:function(id){
        switch(id){
            case ItemID.graitBait :
                return [352, 334, 344,ItemID.turkeyRaw,288,365];
            case ItemID.fruitBait :
                return [352,334,344,288,411,365];
            case ItemID.veggieBait :
                return [352,334,344,ItemID.venisonRaw,288,365];
            default: return null;
        }
    }
});

StorageInterface.createInterface(BlockID.animalTrap, {
	slots: {
		"outSlot^0-17": {output: true}
	}
});




// file: BLOCKS/candle.js

var BLOCK_TYPE_CANDLE = Block.createSpecialType({
    base: 50,
    opaque: false,
	lightopacity: 0,
	rendertype: 1,
	lightlevel: 10,
	destroytime: 0,
	explosionres: 0
});

var candleVariations = [];
for(let i = 0; i < 16; i++){
	candleVariations.push({name: "Candle", texture: [["candle", i]], inCreative: false})
};

IDRegistry.genBlockID("candle");
Block.createBlock("candle", candleVariations, BLOCK_TYPE_CANDLE);
Block.setBlockShape(BlockID.candle,
	{x: 0, y: 0, z: 0},
	{x: 1, y: 0.001, z: 1}
);

Block.setAnimateTickCallback(BlockID.candle, function(x, y, z, id, data) {
	var vel = {
		x: Random.Float(-0.01, 0.01),
		y: Random.Float(-0.01, 0.01),
		z: Random.Float(-0.01, 0.01)
	};
	Particles.addParticle(Native.ParticleType.flame,x + .5, y + .5, z + .5, vel.x, vel.y, vel.y, 0);
});
Block.registerDropFunction("candle", function(coords, blockID, blockData, level){
	return[[ItemID["candleItem" + blockData], 1, 0]];
});




// file: CROPS/crops.js

// file: CROPS/spiceleaf.js
CropRegistry.create(HarvestcraftCrop, {
    id: "spiceleafcrop",
    creative: false,
    seed: {
        id: ItemID.spice_leaf_seed,
        decrease: true
    },
    products: [{id: ItemID.spice_leaf, count: {min: 1, max: 3}, data: 0}]
});
// file: CROPS/chilipepper.js

CropRegistry.create(HarvestcraftCrop, {
    id: "chilipeppercrop",
    creative: false,
    seed: {
        id: ItemID.chili_pepper_seed,
        decrease: true
    },
    products: [{id: ItemID.chili_pepper, count: {min: 1, max: 3}, data: 0}]
});

// file: CROPS/coffeebean.js
CropRegistry.create(HarvestcraftCrop, {
    id: "coffeebeancrop",
    creative: false,
    seed: {
        id: ItemID.coffee_seed,
        decrease: true
    },
    products: [{id: ItemID.coffee_beans, count: {min: 1, max: 3}, data: 0}]
});

var cropList = [
    "strawberry",
    "raspberry",
    "cranberry",
    "blueberry",
    "blackberry",
    "grape",
    "cucumber",
    "onion",
    "cabbage",
    "tomato",
    "rhubarb",
    "garlic",
    "bellpepper",
    "lettuce",
    "peas",
    "corn",
    "candleberry",
    "curryleaf",
    "cotton",
    "rutabaga",
    "bean",
    "waterchestnut",
    "rice",
    "mustard",
    "ginger",
    "spinach",
    "cactusfruit",
    "cantaloupe",
    "kiwi",
    "pineapple",
    "artichoke",
    "asparagus",
    "bambooshoot",
    "broccoli",
    "brusselsprout",
    "cauliflower",
    "celery",
    "radish",
    "eggplant",
    "leek",
    "okra",
    "parsnip",
    "scallion",
    "soybean",
    "sweetpotato",
    "turnip",
    "peanut",
    "rye",
    "zucchini",
    "barley",
    "oats",
    "wintersquash",
    "tealeaf",
    "beet"
];

for(let i in cropList){
    let crop = cropList[i];
    CropRegistry.create(HarvestcraftCrop, {
        id: crop + "crop",
        creative: false,
        seed: {
            id: ItemID[crop + "_seed"],
            decrease: true
        },
        products: [{id: ItemID[crop], count: {min: 1, max: 3}, data: 0}]
    });
};




// file: CROPS/gardens.js

var gardensDrop = {
    arid: [
        {id: ItemID.cactusfruit, count: {min: 1, max: 3}, data: 0},
        {id: 81, count: {min: 1, max: 3}, data: 0}
    ],

    berry: [
        {id: ItemID.blackberry, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.candleberry, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.strawberry, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.raspberry, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.blueberry, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.cranberry, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.grape, count: {min: 1, max: 3}, data: 0}
    ],

    candleberry: [
        {id: ItemID.candleberry, count: {min: 1, max: 3}, data: 0}
    ],

    cotton: [
        {id: ItemID.cotton, count: {min: 1, max: 3}, data: 0}
    ],

    frosty: [
        {id: ItemID.oats, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.rye, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.parsnip, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.broccoli, count: {min: 1, max: 3}, data: 0}
    ],

    gourd: [
        {id: ItemID.zucchini, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.cucumber, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.wintersquash, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.cantaloupe, count: {min: 1, max: 3}, data: 0},
        {id: 86, count: {min: 1, max: 3}, data: 0}
    ],

    grass: [
        {id: ItemID.corn, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.asparagus, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.bambooshoot, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.rye, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.oats, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.barley, count: {min: 1, max: 3}, data: 0}
    ],

    ground: [
        {id: ItemID.beet, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.onion, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.parsnip, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.peanut, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.radish, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.rhubarb, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.rutabaga, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.sweetpotato, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.turnip, count: {min: 1, max: 3}, data: 0},
        {id: 392, count: {min: 1, max: 3}, data: 0},
        {id: 391, count: {min: 1, max: 3}, data: 0}
    ],

    herb: [
        {id: ItemID.tealeaf, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.mustardseeds, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.ginger, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.garlic, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.spice_leaf, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.coffee_beans, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.celery, count: {min: 1, max: 3}, data: 0}
    ],

    leafy: [
        {id: ItemID.spinach, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.scallion, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.lettuce, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.leek, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.cauliflower, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.cabbage, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.brusselsprout, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.broccoli, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.artichoke, count: {min: 1, max: 3}, data: 0}
    ],

    stalk: [
        {id: ItemID.soybean, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.tomato, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.peas, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.eggplant, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.okra, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.chili_pepper, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.bellpepper, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.bean, count: {min: 1, max: 3}, data: 0}
    ],

    tropical: [
        {id: ItemID.curryleaf, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.pineapple, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.kiwi, count: {min: 1, max: 3}, data: 0},
        {id: ItemID.grape, count: {min: 1, max: 3}, data: 0}
    ]
};

var normalGardens2register = [
    "berry",
    "candleberry",
    "cotton",
    "frosty",
    "gourd",
    "grass",
    "ground",
    "herb",
    "leafy",
    "stalk",
    "tropical"
];
//ARID
IDRegistry.genItemID("aridgarden");
Item.createItem("aridgarden", "Arid Garden", {name: "aridgarden", meta: 0} ,{});

CropRegistry.create(HarvestcraftAridGarden, {
    id: "aridgarden",
    creative: false,
    seed: {
        id: ItemID.aridgarden,
        decrease: true
    },
    products: gardensDrop.arid
});

var AridGardenCount = {
	min: __config__.access("generation.group.gardens.arid.min"),
	max: __config__.access("generation.group.gardens.arid.max")
};

Harvest.addBlockGeneration({id: BlockID.aridgarden, data:0, enabled:true}, gardensBiomes.arid, AridGardenCount,
__config__.access("generation.numbers.gardens.arid"));

//OTHER

for(let i in normalGardens2register){
    let name = normalGardens2register[i];
    let itemName = name[0].toUpperCase() + name.slice(1) + " Garden";
    let regID = name + "garden";

    IDRegistry.genItemID(regID);
    Item.createItem(regID, itemName, {name: regID, meta: 0} ,{});

    CropRegistry.create(HarvestcraftGarden, {
        id: regID,
        creative: false,
        seed: {
            id: ItemID[regID],
            decrease: true
        },
        products: gardensDrop[name]
    });

    //Generation

    var bushCount = {
        min: __config__.access("generation.group.gardens." + name + ".min"),
        max: __config__.access("generation.group.gardens." + name + ".max")
    };

    let biomes = gardensBiomes[name];
    let genNumber = __config__.access("generation.numbers.gardens." + name)
    Harvest.addBlockGeneration({id: BlockID[regID], data: 0, enabled: true}, biomes, bushCount, genNumber);
    //alert("Gen "+ BlockID[regID]+" biomes "+ biomes.length + " count "+ bushCount.min+' '+bushCount.max + " number "+ genNumber);
}




// file: TREES/TreeGeneration.js

let treesList = {

    normal: [
        "cherry",
        "avocado"
    ],

    tropical: [
        "persimmon",
        "pear",
        "peach",
        "papaya",
        "orange",
        "olive",
        "mango",
        "lime",
        "lemon",
        "gooseberry",
        "grapefruit",
        "fig",
        "dragonfruit",
        "date",
        "banana",
        "apricot",
        "coconut",
        "cashew",
        "peppercorn",
        "almond",
        "starfruit",
        "pomegranate",
        "plum"
    ]
};

let TreeGenerator = {

    generateSaplingItem: function(treeName){
        let id = treeName + "Sapling"
        IDRegistry.genItemID(id);
        Item.createItem(id, treeName[0].toUpperCase() + treeName.slice(1) + " Tree Sapling", {name: id, data: 0});
        return ItemID[id];
    },

    generateSapling: function(treeName){
        CropRegistry.create(HarvestcraftSapling, {
            id: treeName + "TreeSapling",
            texture: treeName + "Sapling",
            creative: false,
            seed: {
                id: ItemID[treeName + "Sapling"],
                decrease: true
            }
        });
        return BlockID[treeName + "TreeSapling"];
    },

    generateFruitItem: function(treeName){
        let name = treeName[0].toUpperCase() + treeName.slice(1);
        Harvest.setFood(treeName, name ,1);
        return ItemID[treeName]
    },

    generateFruit: function(treeName){
        let regID = treeName;
        CropRegistry.create(HarvestcraftFruit, {
            id: regID,
            creative: false,
            products: [{id: ItemID[treeName], count: {min: 1, max: 3}, data: 0}]
        });
        return BlockID[regID];
    },

    registerTree: function(treeName, sapItem, sapBlock, fruitItem, fruitBlock){
        TreeRegistry.deriveTreeAsClass("Harvestcraft_jungleFruitTree",{
            name: treeName,
            sapling:{
                block: sapBlock,
                item: sapItem
            },
            fruit:{
                block: fruitBlock,
                item: fruitItem
            }
        });
        //alert(treeName + " " +sapItem+ " "+sapBlock+" "+fruitItem+ " "+ fruitBlock);
    },

    generateTree: function(treeName, saplingData){
        let saplingItem = this.generateSaplingItem(treeName);
        let saplingBlock = this.generateSapling(treeName);
        let fruitItem = this.generateFruitItem(treeName);
        let fruitBlock = this.generateFruit(treeName)
        Harvest.recipe({id: saplingItem},[{id: ItemID[treeName], data: 0}, {id: 6, data: saplingData}]);
        this.registerTree(treeName, saplingItem, saplingBlock, fruitItem, fruitBlock);
    },

    generateTrees: function(){
        for(let i in treesList.tropical){
            let treeName = treesList.tropical[i];
            this.generateTree(treeName, 3);
        }
        for(let i in treesList.normal){
            let treeName = treesList.normal[i];
            this.generateTree(treeName, 0);
        }
    }
};
TreeGenerator.generateTrees();

//APPLE
let saplingApple = TreeGenerator.generateSaplingItem("apple");

CropRegistry.create(HarvestcraftFruit, {
    id: "appleBlock",
    creative: false,
    products: [{id:260, count: {min: 1, max: 3}, data: 0}]
});

CropRegistry.create(HarvestcraftSapling, {
    id: "appleTreeSapling",
    texture: "appleSapling",
    creative: false,
    seed: {
        id: saplingApple,
        decrease: true
    }
});

TreeRegistry.deriveTreeAsClass("Harvestcraft_middleFruitTree",{
	name: "apple",
	sapling:{
		block: BlockID["appleTreeSapling"],
		item: saplingApple
	},
	fruit:{
		block: BlockID["appleBlock"],
		item: 260
	}
});
Harvest.recipe({id: saplingApple},[{id: 260, data: 0}, {id: 6, data: 0}]);




// file: GENERATION/trees.js

var biomesTypes = {
	middleBiomes: [1,4,3,132,129,34, 18, 27, 28,13],
	savannaBiomes: [1,2,4, 18, 27, 28,13],
	taigaBiomes: [35,163,39,36,164, 167]
};

var treeBiomes = {

	middleBiomes: [
		"apple",
		"cherry",
		"avocado"
	],

	savannaBiomes: [
		"persimmon",
        "peach",
        "papaya",
        "orange",
        "olive",
        "mango",
        "lime",
        "lemon",
        "gooseberry",
        "grapefruit",
        "fig",
        "dragonfruit",
        "date",
        "banana",
        "apricot",
        "coconut",
        "cashew",
        "peppercorn",
        "almond",
        "starfruit",
        "pomegranate",
        "plum"
	],

	taigaBiomes: [
		"pear"
	]
};

for(let i in treeBiomes){
	let biomeType = treeBiomes[i];
	for(let j in biomeType){
		let name = biomeType[j];
		var treeCount = {
			min:__config__.access("generation.group.trees." + name + ".min"),
			max:__config__.access("generation.group.trees." + name + ".max"),
			enabled:true
		};
		let biomes = biomesTypes[i]
		TreeRegistry.addTreeGeneration(name, biomes , treeCount,__config__.access("generation.numbers.trees." + name));
	}
}




