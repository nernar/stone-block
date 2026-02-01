IMPORT("EnergyNet");
IMPORT("OresAPI");
IMPORT("ChargeItem");
IMPORT("GUILib");
IMPORT("RelativeAPI");
IMPORT("itemAnimator");
function sphere(type, x, y, z, r) {
    //pich - вертикаль, yaw - горизонталь
    var pitch = Math.random() * Math.PI - Math.PI / 2;
    var yaw = Math.random() * 2 * Math.PI;
    var px = x + Math.sin(yaw) * Math.cos(pitch) * r;
    var py = y + Math.sin(pitch) + Math.cos(pitch) * r;
    var pz = z + Math.cos(yaw) * Math.cos(pitch) * r;
    for (var i = 0; i <= 20; i++) {
        yaw = Math.random() * 2 * Math.PI;
        Particles.addParticle(type, px, py, pz, 0, 0, 0);
    }
}
function cilinder(type, coords, r) {
    var pitch = Math.random() * Math.PI - Math.PI / 2;
    var yaw = Math.random() * 2 * Math.PI;
    var px = coords.x + Math.sin(yaw) * r;
    var py = coords.y + Math.sin(pitch) * r;
    var pz = coords.z + Math.cos(yaw) * r;
    Particles.addParticle(type, px, py, pz, 0, 0, 0);
}
function line(type, start, end) {
    var dx = end.x - start.x;
    var dy = end.y - start.y;
    var dz = end.z - start.z;
    var dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
    for (var i = .5; i < dist; i += .5) {
        var sx = start.x + dx * i / dist;
        var sy = start.y + dy * i / dist;
        var sz = start.z + dz * i / dist;
        Particles.addParticle(type, sx, sy, sz, 0, 0, 0);
    }
}
function circle(type, coords, radius) {
    //for(var yaw = 0; yaw < Math.PI * 2; yaw += .3){
    var yaw = Math.random() * 2 * Math.PI;
    var px = coords.x + Math.cos(yaw) * radius;
    var py = coords.y;
    var pz = coords.z + Math.sin(yaw) * radius;
    Particles.addParticle(type, px, py, pz, 0, 0, 0);
    //}
}
Network.addClientPacket("oresMod.drawParticleLine", function (packet) {
    line(packet.type, packet.start, packet.end);
});
//тест генерации руд
/*Callback.addCallback("ItemUse", function(c, i, b){
    if(i.id == 280){
        const blocks = [
            BlockID.oreAdamantite,
            BlockID.oreLead,
            BlockID.oreMalachite,
            BlockID.oreSapphire,
            BlockID.oreUranium
        ];
        for(var y = 110; y > 1; y--){
            for(var x = -20; x <= 20; x++){
                for(var z = -20; z <= 20; z++){
                    var bool = true;
                    var block = World.getBlock(c.x + x, y, c.z + z).id;
                    if(block == 0) continue;
                    if(block == 1 || block == 2 || block == 7){
                        World.setBlock(c.x + x, y, c.z + z, 0);
                        continue;
                    }
                    for(var i in blocks){
                        if(blocks[i] == block){
                            bool = false;
                            break;
                        }
                    }
                    if(bool){
                        World.setBlock(c.x + x, y, c.z + z, 0);
                    }
                }
            }
        }
    }
});*/
OresAPI.createObject = function (objectType, configKey, oreDrop) {
    var get = OresAPI.getConfigValue;
    switch (objectType) {
        case "ore":
            function veins(key) {
                return get(configKey + ".veins." + key);
            }
            function depth(key) {
                return get(configKey + ".depth_ore_generation." + key);
            }
            return {
                requiredToolLvl: get(configKey + ".tool_lvl"),
                veinSize: {
                    min: veins("size.min"),
                    max: veins("size.max")
                },
                veinsInChunk: veins("amount_in_chunk"),
                depthGeneration: {
                    min: depth("min"),
                    max: depth("max")
                },
                oreDrop: oreDrop || null
            };
            break;
        case "tools":
            function tools(key) {
                return get(configKey + ".tools." + key);
            }
            return {
                material: configKey,
                durability: tools("durability"),
                efficiency: tools("efficiency"),
                level: tools("level"),
                damage: tools("damage")
            };
            break;
        case "armor":
            function tools(key) {
                return get(configKey + ".tools." + key);
            }
            function armorPoints(key) {
                return get(configKey + ".armor_points." + key);
            }
            return {
                durability: tools("durability"),
                helmet: { armor: armorPoints("helmet") },
                chestplate: { armor: armorPoints("chestplate") },
                leggings: { armor: armorPoints("leggings") },
                boots: { armor: armorPoints("boots") }
            };
            break;
    }
};
Saver.addSavesScope("armorExtraData", function read(scope) {
    if (scope && scope.amount) {
        ArmorExtraData.data = scope.amount;
    }
}, function save() {
    return { amount: ArmorExtraData.data };
});
var EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);
var QE = EnergyTypeRegistry.assureEnergyType("QE", 1);
var fullFlackTexturesData = [
    "хуй",
    [8, 15, 22, 29, 36, 43],
    [9, 16, 23, 30, 37, 44],
    [10, 17, 24, 31, 38, 45],
    [11, 18, 25, 32, 39, 46],
    [12, 19, 26, 33, 40, 47],
    [13, 20, 27, 34, 41, 48],
    [14, 21, 28, 35, 42, 49]
];
var IndustrialCraftIsExist = false;
ModAPI.addAPICallback("ICore", function (api) {
    IDRegistry.genItemID("crushedAdamantite");
    IDRegistry.genItemID("crushedMalachite");
    Translation.addTranslation("Crushed Adamantite", { ru: "Дроблённый Адамантит" });
    Translation.addTranslation("Crushed Malachite", { ru: "Дроблённый Малахит" });
    Item.createItem("crushedAdamantite", "Crushed Adamantite", { name: "crushedAdamantite" });
    Item.createItem("crushedMalachite", "Crushed Malachite", { name: "crushedMalachite" });
    Callback.addCallback("PostLoaded", function () {
        Recipes.addFurnace(ItemID.crushedUranium, ItemID.ingotUranium, 0);
        Recipes.addFurnace(ItemID.crushedAdamantite, ItemID.ingotAdamantite, 0);
        Recipes.addFurnace(ItemID.crushedMalachite, ItemID.ingotMalachite, 0);
        api.Recipe.addRecipeFor("macerator", BlockID.oreAdamantite, { id: ItemID.crushedAdamantite, count: 2, data: 0 });
        api.Recipe.addRecipeFor("macerator", BlockID.oreMalachite, { id: ItemID.crushedMalachite, count: 2, data: 0 });
        var path = __packdir__ + "/innercore/mods/IndustrialCraft2/config.json";
        var myPatch = __packdir__ + "innercore/mods/OresMod/config.json";
        var parsedICConfig = FileTools.ReadJSON(path);
        var parsedOresConfig = FileTools.ReadJSON(myPatch);
        if (parsedICConfig.uranium_ore.maxHeight == 64) //default value
            parsedICConfig.uranium_ore.maxHeight = parsedOresConfig.uranium.depth_ore_generation.max;
        FileTools.WriteJSON(path, parsedICConfig, true);
    });
    IndustrialCraftIsExist = true;
});
Callback.addCallback("PostLoaded", function () {
    Item.addCreativeGroup("OresModSwords", Translation.translate("OresMod: Swords"), [
        ItemID.adamantiteSword,
        ItemID.leadSword,
        ItemID.malachiteSword,
        ItemID.sapphireSword,
        ItemID.uraniumSword
    ]);
    Item.addCreativeGroup("OresModPickaxes", Translation.translate("OresMod: Pickaxes"), [
        ItemID.adamantitePickaxe,
        ItemID.leadPickaxe,
        ItemID.malachitePickaxe,
        ItemID.sapphirePickaxe,
        ItemID.uraniumPickaxe
    ]);
    Item.addCreativeGroup("OresModShovels", Translation.translate("OresMod: Shovels"), [
        ItemID.adamantiteShovel,
        ItemID.leadShovel,
        ItemID.malachiteShovel,
        ItemID.sapphireShovel,
        ItemID.uraniumShovel
    ]);
    Item.addCreativeGroup("OresModAxes", Translation.translate("OresMod: Axes"), [
        ItemID.adamantiteAxe,
        ItemID.leadAxe,
        ItemID.malachiteAxe,
        ItemID.sapphireAxe,
        ItemID.uraniumAxe
    ]);
    Item.addCreativeGroup("OresModHoes", Translation.translate("OresMod: Hoes"), [
        ItemID.adamantiteHoe,
        ItemID.leadHoe,
        ItemID.malachiteHoe,
        ItemID.sapphireHoe,
        ItemID.uraniumHoe
    ]);
    Item.addCreativeGroup("OresModAdamatiteArmor", Translation.translate("Adamantite Armor"), [
        ItemID.adamantiteHelmet,
        ItemID.adamantiteChestplate,
        ItemID.adamantiteLeggings,
        ItemID.adamantiteBoots
    ]);
    Item.addCreativeGroup("OresModLeadArmor", Translation.translate("Lead Armor"), [
        ItemID.leadHelmet,
        ItemID.leadChestplate,
        ItemID.leadLeggings,
        ItemID.leadBoots
    ]);
    Item.addCreativeGroup("OresModMalachiteArmor", Translation.translate("Malachite Armor"), [
        ItemID.malachiteHelmet,
        ItemID.malachiteChestplate,
        ItemID.malachiteLeggings,
        ItemID.malachiteBoots
    ]);
    Item.addCreativeGroup("OresModSapphireArmor", Translation.translate("Sapphire Armor"), [
        ItemID.sapphireHelmet,
        ItemID.sapphireChestplate,
        ItemID.sapphireLeggings,
        ItemID.sapphireBoots
    ]);
    Item.addCreativeGroup("OresModUraniumArmor", Translation.translate("Uranium Armor"), [
        ItemID.uraniumHelmet,
        ItemID.uraniumChestplate,
        ItemID.uraniumLeggings,
        ItemID.uraniumBoots
    ]);
    Item.addCreativeGroup("OresModMechanicAdamantiteArmor", Translation.translate("OresMod: Mechanic Adamantite Armor"), [
        ItemID.mechanicAdamantiteHelmet,
        ItemID.mechanicAdamantiteChestplate,
        ItemID.mechanicAdamantiteLeggings,
        ItemID.mechanicAdamantiteBoots
    ]);
    Item.addCreativeGroup("OresModMechanicSapphireArmor", Translation.translate("OresMod: Mechanic Sapphire Armor"), [
        ItemID.mechanicSapphireHelmet,
        ItemID.mechanicSapphireChestplate,
        ItemID.mechanicSapphireLeggings,
        ItemID.mechanicSapphireBoots
    ]);
    Item.addCreativeGroup("OresModSources", Translation.translate("OresMod: Sources"), !IndustrialCraftIsExist ? [
        ItemID.ingotAdamantite,
        ItemID.ingotLavarite,
        ItemID.ingotLead,
        ItemID.formationsLeotite,
        ItemID.ingotMalachite,
        ItemID.nuggetMionite,
        ItemID.crystalSapphire,
        ItemID.ingotUranium
    ] : [
        ItemID.ingotAdamantite,
        ItemID.ingotLavarite,
        ItemID.formationsLeotite,
        ItemID.ingotMalachite,
        ItemID.nuggetMionite,
        ItemID.crystalSapphire,
    ]);
    Item.addCreativeGroup("OresModOres", Translation.translate("OresMod: Ores"), !IndustrialCraftIsExist ? [
        BlockID.oreAdamantite,
        BlockID.oreLavarite,
        BlockID.oreLead,
        BlockID.oreLeotite,
        BlockID.oreMalachite,
        BlockID.oreMionite,
        BlockID.oreSapphire,
        BlockID.oreUranium
    ] : [
        BlockID.oreAdamantite,
        BlockID.oreLavarite,
        BlockID.oreLeotite,
        BlockID.oreMalachite,
        BlockID.oreMionite,
        BlockID.oreSapphire
    ]);
    Item.addCreativeGroup("OresModBlocks", Translation.translate("OresMod: Blocks"), !IndustrialCraftIsExist ? [
        BlockID.blockAdamantite,
        BlockID.blockLavarite,
        BlockID.blockLead,
        BlockID.blockLeotite,
        BlockID.blockMalachite,
        BlockID.oreMalachite,
        BlockID.blockMionite,
        BlockID.blockSapphire,
        BlockID.blockUranium
    ] : [
        BlockID.blockAdamantite,
        BlockID.blockLavarite,
        BlockID.blockLeotite,
        BlockID.blockMalachite,
        BlockID.oreMalachite,
        BlockID.blockMionite,
        BlockID.blockSapphir
    ]);
    Item.addCreativeGroup("OresModSolarPanels", Translation.translate("Solar Panels"), [
        BlockID.solarPanelLeadstone,
        BlockID.solarPanelHardent,
        BlockID.solarPanelRedstone,
        BlockID.solarPanelResonant,
        BlockID.solarPanelAdvanced,
        BlockID.solarPanelUltimate
    ]);
    Item.addCreativeGroup("OresModMechanisms", Translation.translate("OresMod: Mechanisms"), [
        BlockID.labBlock,
        BlockID.matterReenactor,
        BlockID.molecularConverter,
        BlockID.molecularSealer,
        BlockID.armorImplantationTable,
        BlockID.naniteCollector,
        BlockID.naniteTrainingNode,
        BlockID.woodIncubator,
        BlockID.molecularSealant,
        BlockID.molecularGenerator
    ]);
    Item.addCreativeGroup("OresModChips", Translation.translate("OresMod: Chips"), [
        ItemID.researchChip,
        ItemID.splitterChip,
        ItemID.quantomDetectorChip,
        ItemID.densityControllerChip,
        ItemID.matteryDrive
    ]);
    Item.addCreativeGroup("OresModSolarPanelCores", Translation.translate("OresMod: Solar Panel Cores"), [
        ItemID.solarCoreLeadstone,
        ItemID.solarCoreHardent,
        ItemID.solarCoreRedstone,
        ItemID.solarCoreResonant,
        ItemID.solarCoreAdvanced,
        ItemID.solarCoreUltimate
    ]);
    Item.addCreativeGroup("OresModNuggets", Translation.translate("OresMod: Nuggets"), [
        ItemID.nuggetLead,
        ItemID.nuggetElectrum,
        ItemID.nuggetUranium,
        ItemID.nuggetMistery,
        ItemID.ingotLead,
        ItemID.ingotUranium
    ]);
    Item.addCreativeGroup("OresModOtherResources", Translation.translate("OresMod: Other Resources"), [
        ItemID.Oresmatter,
        ItemID.shardLapis,
        ItemID.cellPhotovailtaic
    ]);
    Item.addCreativeGroup("OresModMechanicArmorComponents", Translation.translate("OresMod: Mechanic Armor Components"), [
        ItemID.connectingSystems, ItemID.opticalLens, ItemID.centralLogicSystem, ItemID.localLogicSystem,
        ItemID.matrixOfHoloSystems, ItemID.manipulationCable, ItemID.thermoadaptationCoating, ItemID.outerProtectivePlate,
        ItemID.movableElements, ItemID.advancedConnectingSystems, ItemID.advancedOpticalLens, ItemID.advancedLocalLogicSystem,
        ItemID.advancedMatrixOfHoloSystems, ItemID.advancedMovableElements
    ]);
});
function addToRenderGroup(id, group) {
    Callback.addCallback("PostLoaded", function () {
    	//try {
            ICRender.getGroup(group).add(id, -1);
        //}catch(err) {
        	
        //}
    });
}
var OreGenerationHelper = {
    findAllAndPlace: function (x, y, z, id, targetBlock, key) {
        var blocks = [];
        var coords = this.findAll(x, y, z, targetBlock);
        for (var i in coords) {
            var crds = i.split(":").map(function (e) {
                return parseInt(e);
            });
            blocks.push(crds);
        }
        var probability = __config__.access(key + ".probability_of_gen");
        if (blocks.length == 0 || Math.random() > probability)
            return;
        var count = random(OresAPI.getConfigValue(key + ".veins.size.min"), OresAPI.getConfigValue(key + ".veins.size.max"));
        if (count > blocks.length)
            count = blocks.length;
        for (var i_1 = 0; i_1 < count; i_1++) {
            var index = Math.floor(Math.random() * blocks.length);
            var crds = blocks[index];
            if (World.getBlockID(crds[0], crds[1], crds[2]) == targetBlock) {
                World.setBlock(crds[0], crds[1], crds[2], id);
            }
            coords.splice(index, 1);
        }
    },
    findAll: function (x, y, z, targetBlock, map) {
        if (!map)
            map = [];
        var key = x + ":" + y + ":" + z;
        if (map[key] || World.getBlockID(x, y, z) !== targetBlock)
            return map;
        map[key] = true;
        this.findAll(x + 1, y, z, targetBlock, map);
        this.findAll(x - 1, y, z, targetBlock, map);
        this.findAll(x, y + 1, z, targetBlock, map);
        this.findAll(x, y - 1, z, targetBlock, map);
        this.findAll(x, y, z + 1, targetBlock, map);
        this.findAll(x, y, z - 1, targetBlock, map);
        return map;
    }
};
var UIColor = android.graphics.Color;
var TIPS = __config__.getBool("enable_tips_in_machines");
function random(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
var setRequiresIconOverride = ModAPI.requireGlobal("Item.setRequiresIconOverride");
var PotionEffect = Native.PotionEffect;
var ParticleType = Native.PaticleType;
function defaultItemNameOverride(color, type) {
    return NameOverrider.overrideItemName(color, type, { dontDisplayDurability: true });
}
function defaultBlockNameOverride(color, type) {
    return NameOverrider.overrideBlockName(color, type);
}
function energyNameOverride(color, type, tier, mode) {
    return NameOverrider.overrideBlockName(color || "f", type, { other: function () {
            if (!mode) {
                return "§7" + Translation.translate("Power tier") + ": " + tier;
            }
            else {
                return "§7" + Translation.translate("Output") + ": " + tier + "/tick";
            }
        }
    });
}
function chanse(chanse, max) {
    return Math.floor(chanse / max * 100);
}
var StringHelper = {
    toMain: Translation.translate("To main"),
    usedInCrafts: Translation.translate("Used in crafts."),
    adv: function (str) {
        return Translation.translate("Advantage") + ": " + Translation.translate(str);
    },
    t: Translation.translate,
    navigator: function (link) {
        return [
            Guide.link("To main", "default"),
            Guide.link("To the list", link)
        ];
    },
    disAdv: function (str) {
        return Translation.translate("Disadvantage") + ": " + Translation.translate(str);
    },
    solar: function (type) {
        return Translation.translate("Generation") + ": " + OresAPI.getConfigValue(type + "_solar_panel.gen_day") + " (" + OresAPI.getConfigValue(type + "_solar_panel.gen_night") + " " + Translation.translate("night") + ")";
    },
    oreDesc: function (adv, disAdv) {
        return [
            Guide.text(this.usedInCrafts),
            Guide.text(this.adv(this.t(adv)), null, UIColor.parseColor("#191970")),
            Guide.text(this.disAdv(this.t(disAdv)), null, UIColor.RED)
        ];
    },
    ore: function (id) {
        lang = (Item.getName(280) == "Stick") ? false : true;
        var a, b;
        switch (id) {
            case 1:
                a = "Адамантит";
                b = "Adamantite";
                break;
            case 2:
                a = "Свинец";
                b = "Tin";
                break;
            case 3:
                a = "Малахит";
                b = "Malachite";
                break;
            case 4:
                a = "Мифрил";
                b = "Muthril";
                break;
            case 5:
                a = "Сапфир";
                b = "Sapphire";
                break;
            case 6:
                a = "Ураниум";
                b = "Uranium";
                break;
        }
        return (lang) ? a : b;
    }
};
function setupWireRender(id, width, group) {
    var render = new ICRender.Model();
    BlockRenderer.setStaticICRender(id, 0, render);
    var boxes = [
        { side: [1, 0, 0], box: [0.5 + width / 2, 0.5 - width / 2, 0.5 - width / 2, 1, 0.5 + width / 2, 0.5 + width / 2] },
        { side: [-1, 0, 0], box: [0, 0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2] },
        { side: [0, 1, 0], box: [0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2, 1, 0.5 + width / 2] },
        { side: [0, -1, 0], box: [0.5 - width / 2, 0, 0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2] },
        { side: [0, 0, 1], box: [0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, 1] },
        { side: [0, 0, -1], box: [0.5 - width / 2, 0.5 - width / 2, 0, 0.5 + width / 2, 0.5 + width / 2, 0.5 - width / 2] },
    ];
    for (var i in boxes) {
        var box = boxes[i];
        var model = BlockRenderer.createModel();
        model.addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5], id, 0);
        render.addEntry(model).asCondition(box.side[0], box.side[1], box.side[2], group, 0);
    }
    ICRender.getGroup(group).add(id, -1);
    var model = BlockRenderer.createModel();
    model.addBox(0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, id, 0);
    render.addEntry(model);
    width = Math.max(width, 0.5);
    Block.setBlockShape(id, { x: 0.5 - width / 2, y: 0.5 - width / 2, z: 0.5 - width / 2 }, { x: 0.5 + width / 2, y: 0.5 + width / 2, z: 0.5 + width / 2 });
}
var GUI_BAR_STANDART_SCALE = 4.2;
var gui = {};
/*function setupRender(id, group){
    var boxes = [
        {
            side: [1, 0, 0],
            boxes:[
                [.55, .2, .4, 1, .4, .6],
                [.55, .6, .4, 1, .8, .6]
            ]
        },
        {
            side: [-1, 0, 0],
            boxes:[
                [0, .2, .4, .4, .4, .6],
                [0, .6, .4, .4, .8, .6]
            ]
        },
        {
            side: [0, 0, 1],
            boxes:[
                [.4, .2, .6, .6, .4, 1],
                [.4, .6, .6, .6, .8, 1]
            ]
        },
        {
            side: [0, 0, -1],
            boxes:[
                [.4, .2, 0, .6, .4, .4],
                [.4, .6, .0, .6, .8, .4]
            ]
        }
    ];
    
    var model = new ICRender.Model();
    BlockRenderer.setStaticICRender(id, 0, model);
    
    for(var i in boxes){
        var render = BlockRenderer.createModel();
        var side = boxes[i].side;
        var currentBoxes = boxes[i].boxes;
        ICRender.getGroup(group).add(id, -1);
        render.addBox(.4, 0, .4, .6, 1, .6, id, 0);
        model.addEntry(render);
        render = BlockRenderer.createModel();
        for(var i in currentBoxes){
            var box = currentBoxes[i];
            render.addBox(box[0], box[1], box[2], box[3], box[4], box[5], id, 0);
        }
        model.addEntry(render).asCondition(side[0], side[1], side[2], group, 0);
    }
}


IDRegistry.genBlockID("test");
Block.createBlock("test", [{
    name:"__", texture:[["planks", 0]], inCreative: true
}]);

setupRender(BlockID.test, "tg");*/
/**
 * Ничего серьезного
 * и вообще
 * тут говнокод
 * уйди
 */
var KotoffeyMatch = {
    randomYaw: function () {
        return Math.random() * 2 * Math.PI;
    },
    randomPitch: function () {
        return Math.random * Math.PI - Math.PI / 2;
    },
    selectRandom: function (a, b) {
        return Math.random() > .45 ? a : b;
    },
    randomFloat: function (max, min) {
        return Math.random() * (max - min) + min;
    },
    randomInt: function (max, min) {
        return Math.floor(this.randomFloat(max, min));
    },
    HORIZONTAL_DEFAULT: 1,
    HORIZONTAL_DIRECTION_INVERSE: -1,
    VERTICAL_DIRECTION_TOP: 1,
    VERTICAL_DIRECTION_BOTTON: -1,
    rotatedAnimationInstance: function (obj) {
        this.startCoords = obj.coords;
        this.age = 0;
        this.animation = new Animation.Item(this.startCoords.x, this.startCoords.y, this.startCoords.z);
        this.updateFunction = null;
        //значения описания
        var desc = obj.description || {};
        this.id = desc.id || 264;
        this.count = desc.count || 1;
        this.data = desc.data || 0;
        this.size = desc.size || .5;
        this.rotation = desc.rotation || [0, Math.PI * .5, 0];
        this.notRandomize = desc.notRandomize || true;
        /**
         * значения направления движений анимации
         * alpha - положение анимации на виртуальной окружности
         * horizontalDirection - направление движения анимации по виртуальной окружности
         * verticalDirection - начальное горизонтальное направление анимации
         * radius - радиус виртуальной окружности
         * speed - скорость движение по виртуальной окружности
         */
        this.alpha = KotoffeyMatch.randomYaw();
        this.horizontalDirection = KotoffeyMatch.selectRandom(KotoffeyMatch.HORIZONTAL_DEFAULT, KotoffeyMatch.HORIZONTAL_DIRECTION_INVERSE);
        this.verticalDirection = KotoffeyMatch.selectRandom(KotoffeyMatch.VERTICAL_DIRECTION_TOP, KotoffeyMatch.VERTICAL_DIRECTION_BOTTON);
        this.radius = obj.radius || KotoffeyMatch.randomFloat(1.6, 1.4);
        this.speed = obj.speed || KotoffeyMatch.randomFloat(.15, .1);
        this.speed *= this.horizontalDirection;
        /**
         * значения-сохранения положения анимации
         * rotationSpeed - (исключение) скорость оборота анимации
         * currentHRotation - сохраненное вращение анимации по горизонтали
         * currentVRotation - то же самое, но по вертикали
         */
        this.rotationSpeed = Math.PI * 2 / this.speed;
        this.currentHRotation = 0;
        this.currentVRotation = this.startCoords.y;
        this.describe = function (rotation) {
            var id = this.id, count = this.count, data = this.data, notRandomize = this.notRandomize, size = this.size;
            this.animation.describeItem({
                id: id,
                count: count,
                data: data,
                size: size,
                rotation: rotation,
                notRandomize: notRandomize
            });
        };
        this.describe(this.rotation);
        this.getAge = function () {
            return this.age;
        };
        this.destroy = function () {
            this.animation.destroy();
        };
        this.setUpdateFunction = function (func) {
            this.updateFunction = func;
        };
    },
    loadRotatedAnimation: function (instance) {
        if (instance instanceof KotoffeyMatch.rotatedAnimationInstance) {
            instance.animation.loadCustom(function () {
                var start = instance.startCoords;
                instance.age++;
                var coords = this.coords;
                coords.x = start.x + Math.sin(instance.alpha) * instance.radius + .5;
                coords.y = instance.currentVRotation + (Math.sin(.02) * instance.verticalDirection);
                coords.z = start.z + Math.cos(instance.alpha) * instance.radius + .5;
                if (World.getThreadTime() % 30 == 0)
                    instance.verticalDirection *= -1;
                this.setPos(coords.x, coords.y, coords.z);
                this.refresh();
                instance.currentVRotation = coords.y;
                instance.alpha += instance.speed * instance.horizontalDirection;
                instance.describe(instance.rotation);
                instance.rotation[1] += Math.PI * 2 / instance.rotationSpeed * -instance.horizontalDirection;
                if (instance.updateFunction)
                    instance.updateFunction(coords, instance);
            });
        }
    },
    particleSphere: function (coords, radius) {
        this.emitter = new Particles.ParticleEmitter(coords.x, coords.y, coords.z);
        this.getemitter = function () {
            return this.emitter;
        };
        this.stopRequired = false;
        this.requireStop = function () {
            this.stopRequired = true;
        };
        this.coords = coords;
        this.setCoords = function (coords) {
            this.coords = coords;
        };
        this.radius = radius || 1;
        this.setRadius = function (radius) {
            this.radius = radius;
        };
        this.particleType = Native.ParticleType.flame;
        this.setParticleType = function (type) {
            this.particleType = type;
        };
        this.particlesDensity = 3;
        this.setParticlesDensity = function (count) {
            this.particlesDensity = count;
        };
        this.emit = function () {
            var c = this.coords;
            var r = this.radius;
            var type = this.particleType;
            for (var i = 0; i < this.particlesDensity; i++) {
                var pitch = KotoffeyMatch.randomPitch();
                var yaw = KotoffeyMatch.randomYaw();
                var px = c.x + Math.sin(yaw) * Math.cos(pitch) * r;
                var py = c.y + Math.sin(pitch) + Math.cos(pitch) * r;
                var pz = c.z + Math.cos(yaw) * Math.cos(pitch) * r;
                this.emitter.emit(type, 0, px, py, pz);
            }
        };
    }
};
var newGame = true;
Callback.addCallback("LevelLoaded", function () {
    if (newGame) {
        Game.message("                                      (Ores Mod v.3.2)");
        Game.message("                                    отдельная благодарность");
        Game.message(Translation.translate("§5Maksim Kievsky: §2detected a problem with a block drop. §114.02.2018 §9version 2.0.1"));
        Game.message(Translation.translate("§5miron27khv: §4created 90% of texture mod. §9Was taken to the development team since version 2.2.3"));
        Game.message(Translation.translate("§4ripemc: §6noticed a bug with integration with IC². §214.04.2019 §9version 2.4.5.3"));
        Game.message(Translation.translate("§5BrassyFaNToM: §7reported an error with most of the mechanisms. §C08.06.2019 §9 Versions §b3§f.§70"));
        Game.message(Translation.translate("§1Витя Белей: §7проявил соучастие в совершествовании рецептов компонентов механической брони и созданию новых ресурсов. §c09.08.2020 §b3§f.§70§f.§36"));
        Player.addItemToInventory(ItemID.oresModGuideBook, 1, 0);
    }
});
Saver.addSavesScope("book", function read(scope) {
    if (scope && scope.amount) {
        newGame = false;
    }
}, function save() {
    return { amount: true };
});
ModAPI.registerAPI("OresAPI", {
    OresAPI: OresAPI,
    solarPanelAPI: SolarPanel,
    woodIncubatorRecipes: WoodIncubatorRecipes
});
Translation.addTranslation("Leadstone Solar Panel", { ru: "Свинцовая Солнечная Панель" });
Translation.addTranslation("Hardent Solar Panel", { ru: "Закалённая Солнечная Панель" });
Translation.addTranslation("Redstone Solar Panel", { ru: "Краснокаменная Солнечная Панель" });
Translation.addTranslation("Resonant Solar Panel", { ru: "Резонирующая Солнечная Панель" });
Translation.addTranslation("Advanced Solar Panel", { ru: "Улучшенная Солнечная Панель" });
Translation.addTranslation("Ultimate Solar Panel", { ru: "Совершенная Солнечная Панель" });
Translation.addTranslation("Power tier", { ru: "Энергоуровень" });
Translation.addTranslation("§5Maksim Kievsky: §2detected a problem with a block drop. §114.02.2018 §9version 2.0.1", { ru: "§5Максим Киевский: §2обнаружил проблему с дропом блоков. §114.02.2018 §9версии 2.0.1" });
Translation.addTranslation("§5miron27khv: §4created 90% of texture mod. §9Was taken to the development team since version 2.2.3", { ru: "§5miron27khv: §создал 90% текстур мода. §9состоит в команде разработчиков с версии 2.2.3" });
Translation.addTranslation("§4ripemc: §6 noticed a bug with integration with IC². §214.04.2019 §9version 2.4.5.3", { ru: "§4ripemc: §6 заметил баг с интеграцией с IC². §214.04.2019 §9версии 2.4.5.3" });
Translation.addTranslation("§5BrassyFaNToM: §7 reported an error with most of the mechanisms. §C08.06.2019 §9 Versions §b3§f.§70", { ru: "§5BrassyFaNToM: §7 сообщил о баге с большинством механизмов. §C08.06.2019 §9версии §b3§f.§80" });
Translation.addTranslation("This message can be disabled by disabling the show_helpers_message parameter in the config (games/com.mojang/mods/ores/config.json)", { ru: "это сообщение можно отключить, отключив параметр show_helpers_message в конфиге (games/com.mojang/mods/ores/config.json)" });
Translation.addTranslation("All about Ores Mod", { ru: "Все о моде Ores Mod" });
Translation.addTranslation("About ores", { ru: "О рудах" });
Translation.addTranslation("About mechanical blocks", { ru: "О механических блоках" });
Translation.addTranslation("About other items", { ru: "О прочих предметах" });
Translation.addTranslation("To main", { ru: "На главную" });
Translation.addTranslation("To the list", { ru: "К списку" });
Translation.addTranslation("Used in crafts.", { ru: "Используется в крафтах." });
Translation.addTranslation("Advantage", { ru: "Преимущество" });
Translation.addTranslation("Disadvantage", { ru: "Недостаток" });
Translation.addTranslation("not rare", { ru: "не редкий" });
Translation.addTranslation("no strengths", { ru: "нет сильных сторон" });
Translation.addTranslation("Adamantite", { ru: "Адамантит" });
Translation.addTranslation("Lead", { ru: "Свинец" });
Translation.addTranslation("Malachite", { ru: "Малахит" });
Translation.addTranslation("Muthril", { ru: "Мифрил" });
Translation.addTranslation("Uranium", { ru: "Ураниум" });
Translation.addTranslation("Sapphire", { ru: "Сапфир" });
Translation.addTranslation("very fast", { ru: "Очень быстрый" });
Translation.addTranslation("not durable", { ru: "Не долговечен" });
Translation.addTranslation("strength", { ru: "сильный" });
Translation.addTranslation("low speed", { ru: "низкая скорость" });
Translation.addTranslation("the most effective material", { ru: "самый эффективный материал" });
Translation.addTranslation("rate", { ru: "редкий" });
Translation.addTranslation("effective, has the highest damage", { ru: "эффективный, имеет самый высокий урон" });
Translation.addTranslation("rarely comes across", { ru: "редко попадается" });
Translation.addTranslation("Turns reconstructed matter into objects.", { ru: "Превращает реконструированную материю в предметы." });
Translation.addTranslation("Using molecular converter", { ru: "Использование молекулярного конвертатора" });
Translation.addTranslation("The information panel in the mechanism window displays the current state of the mechanism and helps to understand how the mechanism works.", { ru: "Информационная панель в окне механизма отображает текущее состояние механизма и помогает понять, как работает механизм." });
Translation.addTranslation("As a result, you will receive an item that was as a result of the reconstruction of matter.", { ru: "В результате вы получите предмет, который был в результате реконструкции материи." });
Translation.addTranslation("At the exit you will receive the item that was recorded in the reconstructed matter.", { ru: "На выходе вы получите предмет, который был записан в реконструированной материи." });
Translation.addTranslation("The only source of chips", { ru: "Единственный источник получения чипов" });
Translation.addTranslation("Using a laboratory block", { ru: "Использование лабораторного блока." });
Translation.addTranslation("For the mechanism to work, you need to: keep the mechanism charged with energy and place the research chips in the upper slot.", { ru: "Чтобы механизм работал, вам необходимо: держать механизм заряженным энергией и поместить исследовательские чипы в верхний слот." });
Translation.addTranslation("Generator, for generating a new type of energy QE (Quantum Energy)", { ru: "Генератор, для генерации нового типа энергии QE(Quantum Energy)" });
Translation.addTranslation("Using a molecular generator", { ru: "Использование молекулярного генератора" });
Translation.addTranslation("Working with this mechanism is the easiest.", { ru: "Работа с этим механизмом самая простая." });
Translation.addTranslation("In the interface of the mechanism there are many slots, in these slots are placed any items that the mechanism will turn into energy.", { ru: "В интерфейсе механизма находится множество слотов, в эти слоты помещаются любые предметы, которые механизм превратит в энергию." });
Translation.addTranslation("The mechanism does not consume Eu-energy.", { ru: "Механизм не потребляет Eu-энергии." });
Translation.addTranslation("The removal of energy is carried out by attaching a special conductor to the upper side of the mechanism.", { ru: "Вывод энергии осуществляется, путем присоединения специального проводника к верхней стороне механизма." });
Translation.addTranslation("He accepts ordinary matter and any object, the data of which he will transmit to matter and will issue reconstructed matter.", { ru: "Принимает обычную материю и какой-либо предмет, данные которого он передаст в материю и выдаст реконструированную материю." });
Translation.addTranslation("Reconstructed matter is used in a molecular transducer.", { ru: "Реконструированная материя применяется в молекулярном преобразователе." });
Translation.addTranslation("Use of matter re-constructor", { ru: "Использование реконструктора материи" });
Translation.addTranslation("To understand the mechanism, just open it and look at the panel below.", { ru: "Чтобы понять, как работает механизм, посмотрите на панель снизу, в окне механизма." });
Translation.addTranslation("The red and yellow text indicates that the mechanism is lacking for work.", { ru: "Красный и желтый текст показывают, что нехватает механизму для работы." });
Translation.addTranslation("Molecular compactor compresses QE energy, turning it into matter.", { ru: "Молекулярный уплотнитель сжимает QE энергию, превращая её в материю." });
Translation.addTranslation("The use of molecular sealer.", { ru: "Использование молекулярного уплотнителя." });
Translation.addTranslation("The operation of this mechanism is fully automatic, you just need to maintain working conditions.", { ru: "Работа этого механизма полностью автоматическая, вам лишь нужно поддерживать условия работы" });
Translation.addTranslation("In order for the mechanism to accept QE-energy, you need to connect a wire to it to the upper side.", { ru: "Чтобы механизм принимал QE-энергию - нужно подключить к нему провод к верхней стороне." });
Translation.addTranslation("The mechanism itself begins to work when the energy inside it is greater than 0.", { ru: "Механизм сам начинает работать, когда энергия внутри него больше чем 0." });
Translation.addTranslation("The redstone signal stops the operation of the mechanism, but at the same time it will still be able to absorb energy.", { ru: "Редстоун-сигнал останавливает работу механизма, но при этом он по прежнему сможет принимать в себя энергию." });
Translation.addTranslation("Generation", { ru: "Генерация" });
Translation.addTranslation("night", { ru: "ночью" });
Translation.addTranslation("Leadstone", { ru: "Свинцовая" });
Translation.addTranslation("Hardent", { ru: "Закалённая" });
Translation.addTranslation("Redstone", { ru: "Краснокаменная" });
Translation.addTranslation("Resonant", { ru: "Резонирующая" });
Translation.addTranslation("Advanced", { ru: "Улучшенная" });
Translation.addTranslation("Ultimate", { ru: "Окончательная" });
Translation.addTranslation("This mechanism will grow the tree anywhere.", { ru: "Этот механизм вырастит дерево где угодно." });
Translation.addTranslation("To the instructions", { ru: "К инструкции" });
Translation.addTranslation("Use of a wood incubator", { ru: "Использование древесного инкубатора" });
Translation.addTranslation("To use a wood incubator you will need: seedling, energy and catalyst.", { ru: "Для использования древесного инкубатора понадобится: саженец, энергия и катализатор." });
Translation.addTranslation("List of supported seedlings and catalysts on the right page.", { ru: "Список поддерживаемых саженцев и катализаторов на правой странице." });
Translation.addTranslation("Before using the mechanism, you need to place a block of earth or dirt next to it.", { ru: "Перед использованием механизма вам нужно поставить рядом с ним блок земли или грязи." });
Translation.addTranslation("In the window of the mechanism, approximately in the middle, there is a red rectangle.", { ru: "В окне механизма, примерно по середине, находится красный прямоугольник." });
Translation.addTranslation("You need to work only with slots from the left of this rectangle.", { ru: "Вам нужно работать только со слотами с лева от этого прямоугольника." });
Translation.addTranslation("A sapling is placed in the top slot; in the right - the catalyst", { ru: "В верхний слот помещается саженец; в правый - катализатор" });
Translation.addTranslation("If you did everything correctly, then a sapling will appear on the dirt block, and the red rectangle will turn green.", { ru: "Если вы все сделали правильно - то на блоке грязи появится саженец, а красный прямоугольник будет становиться зелёным." });
Translation.addTranslation("I remind you that the mechanism consumes energy, nothing will work without it.", { ru: "Напоминаю, что механизм потребляет энергию, без неё ничего работать не будет." });
Translation.addTranslation("The red box is the growth progress bar. When progress is completed - you will receive a tree, seedlings and a special drop, if there is one.", { ru: "Красный прямоугольник - шкала прогресса роста. Когда прогресс завершится - вы получите дерево, саженцы и особый дроп, если таков есть." });
Translation.addTranslation("Saplings:", { ru: "Саженцы:" });
Translation.addTranslation("Currently supported saplings from Minecraft and Industrial Craft", { ru: "В настоящий момент поддерживаются cаженцы из Minecraft и Industrial Craft" });
Translation.addTranslation("Catalysts:", { ru: "Катализаторы:" });
Translation.addTranslation("Bone flour.", { ru: "Костная мука." });
Translation.addTranslation("The catalyst is used to accelerate the growth of the tree, its use is not necessary", { ru: "Катализатор используется для ускорения роста дерева, его использование не обязательно" });
Translation.addTranslation("Solar Panels", { ru: "Солнечная панель" });
Translation.addTranslation("Chips", { ru: "Чипы" });
Translation.addTranslation("Receiving:", { ru: "Получение:" });
Translation.addTranslation("Application:", { ru: "Применение:" });
Translation.addTranslation("Creating mechanisms", { ru: "Создание механизмов" });
Translation.addTranslation("Used in the creation of solar panels", { ru: "Используются в создании солнечных панелей" });
Translation.addTranslation("To find out the recipe for higher level kernels, put the core one level less in inventory and open the inventory.", { ru: "Чтобы узнать рецепт ядер более высокого уровня - положите в инвентарь ядро на один уровень меньше и откройте инвентарь." });
Translation.addTranslation("For example, to find out the recipe for the core of a hardened solar panel - take the lead core and open the workbench.", { ru: "Например, чтобы узнать рецепт для ядра закаленной солнечной панели - возьмите ядро свинцовой и откройте верстак." });
Translation.addTranslation("Cores", { ru: "Ядра" });
Translation.addTranslation("Nuggets", { ru: "Самородки" });
Translation.addTranslation("Nanite Collector", { ru: "Сборщик Нанитов" });
Translation.addTranslation("Nanite Training Node", { ru: "Узел Обучения Нанитов" });
Translation.addTranslation("Output", { ru: "Выход" });
Translation.addTranslation("Most of the nuggets are obtained from the same name full-fledged ingots (in the case of a lapis lazuli fragment - this is a whole lapis lazuli), except for unidentified and electroumovogo nuggets", { ru: "Большая часть самородков получена из одноименных полноценных слитков (в случае с фрагментом ляпис-лазури-это целый ляпис-лазурь), за исключением неидентифицированных и электроумовых самородков" });
Translation.addTranslation("To back", { ru: "Назад" });
Translation.addTranslation("Rebuilt Matter", { ru: "Реконструированная Материя" });
Translation.addTranslation("The same mechanism that will modify your mechanical armor", { ru: "Тот самый механизм, что будет модифицировать вашу механическую броню" });
Translation.addTranslation("The use of Desk trainer armor", { ru: "Использование стола имплантирования брони" });
Translation.addTranslation("When you open the mechanism window, you will see two slots.", { ru: "При открытии окна механизма, будет видно два слота." });
Translation.addTranslation("Only a flask with trained nanites is installed in the upper slot", { ru: "В верхний слот устанавливается только колба с обученными нанитами" });
Translation.addTranslation("only mechanical armor is installed in the center slot.", { ru: "в центральный слот устанавливается только механическая броня." });
Translation.addTranslation("after installing the mechanical armor in the slot, a certain number of new slots will appear, these are conditional cells of modifications.", { ru: "после установки механической брони в слот, появится некоторое количество новых слотов, это условные ячейки модификаций." });
Translation.addTranslation("clicking on the conditional modification slots will show you their status in the form of text information, if the slot is blocked - it needs to be unlocked by the nanites of the \"Builder\" specialization before the modification can be implemented in it.", { ru: "нажатие на условные слоты модификации покажет вам их статус в виде текстовой информации, если слот заблокирован - он должен быть разблокирован нанитами специализации \"Строитель\", прежде чем модификация может быть реализована в нем." });
Translation.addTranslation("all implemented modifications cannot be extracted or replaced, only improved by re-introducing nanites of the same specialization.", { ru: "все внедрённые модификации не могут быть извлечены или заменены, только улучшены, путём повторного внедрения нанитов той же специализации." });
Translation.addTranslation("Father of mechanical micro-organisms", { ru: "Отец механических микроорганизмов" });
Translation.addTranslation("There are three slots in the mechanism next to each other", { ru: "В механизме находятся три рядом находящихся слота" });
Translation.addTranslation("The left slot is intended for iron ingots", { ru: "Левый слот предназначен для железных слитков" });
Translation.addTranslation("Central for empty flasks", { ru: "Центральный для пустых колб" });
Translation.addTranslation("Right for red dust", { ru: "Правый для красной пыли" });
Translation.addTranslation("The mechanism needs two types of energy to start producing nanites", { ru: "Механизму нужно два типа энергии, чтобы начать производство нанитов" });
Translation.addTranslation("Once production is complete you will receive one nanite capsule", { ru: "После завершения производства вы получите одну капсулу с нанитами" });
Translation.addTranslation("Using the nanite collector", { ru: "Использованме сборщика нанитов" });
Translation.addTranslation("Nanites also need to learn", { ru: "Нанитам тоже нужно учиться" });
Translation.addTranslation("Using the nanite training node", { ru: "Использование узла обучения нанитов" });
Translation.addTranslation("You need to select the desired specification of nanites, and then place the flask with nanites in the left slot. The mechanism will issue a flask with trained nanites", { ru: "Вам нужно выбрать нужную вам спецификацию нанитов, после чего поместить колбу с нанитами в левый слот. Механизм выдаст колбу с обученными нанитами" });
Translation.addTranslation("Only he is able to charge a mechanical armor", { ru: "Только он способен зарядить механическую броню" });
Translation.addTranslation("Well there's nothing to explain ｡ ◕ ‿ ◕ ｡", { ru: "Ну тут объяснять нечего ｡ ◕ ‿ ◕ ｡" });
Translation.addTranslation("Nanites", { ru: "Наниты" });
Translation.addTranslation("Craft of glass on the workbench", { ru: "Крафт из стекла на верстаке" });
Translation.addTranslation("Components of mechanical armor", { ru: "Компоненты механической брони" });
Translation.addTranslation("Mechanic Armor", { ru: "Механическая Броня" });
Translation.addTranslation("Adamantite mechanical armor", { ru: "Адамантитовая механическая броня" });
Translation.addTranslation("Sapphire mechanical armor", { ru: "Сапфировая механическая броня" });
Translation.addTranslation("By itself, this armor has nothing special.", { ru: "Сама по себе эта броня не имеет ничего особенного." });
Translation.addTranslation("This armor can be embedded with nanites on the armor implantation table.", { ru: "В эту броню возможно внедрение нанитов на столе имплантирования брони." });
Translation.addTranslation("Embedding nanites will give you the property that the selected type of nanites is designed for when training in the nanite learning node", { ru: "Внедрение нанитов даст вам то свойство, на который рассчитан выбранный вами тип нанитов при обучении в узле обучения нанитов" });
Translation.addTranslation("Armor modifications", { ru: "Модификации брони" });
Translation.addTranslation("All existing modifications of mechanical armor are listed below. They are needed to improve it", { ru: "Ниже перечислены все существующие модификации механической брони. Они нужны для её улучшения" });
Translation.addTranslation("Builder", { ru: "Строитель" });
Translation.addTranslation("Power", { ru: "Сила" });
Translation.addTranslation("Refractoriness", { ru: "Огнеупорность" });
Translation.addTranslation("Protection from damage", { ru: "Защита от порчи" });
Translation.addTranslation("Power panel", { ru: "Силовой щит" });
Translation.addTranslation("Night vision", { ru: "Ночное зрение" });
Translation.addTranslation("Reinforced hull", { ru: "Укреплённый корпус" });
Translation.addTranslation("The speed of digging", { ru: "Скорость копания" });
Translation.addTranslation("Acceleration", { ru: "Ускорение" });
Translation.addTranslation("Compressed Cargo Space", { ru: "Сжатое Грузовое Пространство" });
Translation.addTranslation("Submariner", { ru: "Подводник" });
Translation.addTranslation("Integrated jetpack", { ru: "Интегрированный реактивный ранец" });
Translation.addTranslation("Anti-gravity field generator", { ru: "Генератор антигравитационного поля" });
Translation.addTranslation("Defense module", { ru: "Модуль обороны" });
Translation.addTranslation("This modification is designed to unlock modification slots.", { ru: "Эта модификация предназначена для разблокировки слотов модификаций." });
Translation.addTranslation("This modification will cause additional damage to the enemy", { ru: "Эта модификация будет наносить дополнительный урон противнику" });
Translation.addTranslation("It is installed in the bib", { ru: "Устанавливается в нагрудник" });
Translation.addTranslation("In constant mode, it provides protection from everything that is hot", { ru: "В постоянном режиме обеспечивает защиту от всего, что горячее" });
Translation.addTranslation("    At the first level it protects against blindness and food poisoning", { ru: "    На первом уровне защищает от слепоты и пищевого отравления" });
Translation.addTranslation("    At the second level, it neutralizes slowing down, nausea and weakness", { ru: "   На втором уровне нейтрализует замедление, тошноту и слабость" });
Translation.addTranslation("    At the last level it protects against poisoning and desiccation", { ru: "   На последнем уровне защищает от отравления и иссушения" });
Translation.addTranslation("In constant mode provides additional health", { ru: "В постоянном режиме обеспечивает дополнительным здоровьем" });
Translation.addTranslation("Automatically provides perfect visibility in the dark", { ru: "Автоматически обеспечивает идеальную видимость в темноте" });
Translation.addTranslation("Installed in the helmet", { ru: "Устанавливается в шлем" });
Translation.addTranslation("Absorbs part of the received damage", { ru: "Поглощает часть полученного урона" });
Translation.addTranslation("Deals retaliatory damage to creatures attacking you", { ru: "Наносит ответный урон атакующим вас существам" });
Translation.addTranslation("Automatically activated when blocks are broken", { ru: "Автоматически активируется при ломании блоков" });
Translation.addTranslation("Increases the speed of movement when running", { ru: "Увеличивает скорость передвижения при беге" });
Translation.addTranslation("Installed in greaves", { ru: "Устанавливается в поножи" });
Translation.addTranslation("Provides a storage of items that is always nearby.", { ru: "Обеспечивает хранилище предметов, которое всегда рядом." });
Translation.addTranslation("Increasing the level increases the cargo space capacity", { ru: "Повышение уровня увеличивает ёмкость грузового пространства" });
Translation.addTranslation("You can't drown yourself", { ru: "Утопиться не выйдет" });
Translation.addTranslation("Well, sometimes you can take content from Industrial Craft", { ru: "Ну иногда, можно и взять контент из Industrial Craft" });
Translation.addTranslation("Fly - so fly!", { ru: "Летать - так летать!" });
Translation.addTranslation("Installed in shoes", { ru: "Устанавливается в ботинки" });
Translation.addTranslation("Improved version of mechanical armor.", { ru: "Улучшенный вариант механической брони." });
Translation.addTranslation("When creating a sapphire armor, it will pass all the modifiers that are in the Adamantite armor", { ru: "При создании сапфировой брони, в неё передадуться все модификаторы, которые находятся в адамантитовой броне" });
Translation.addTranslation("Charge", { ru: "Заряд" });
Translation.addTranslation("There should be a research chip in the slot on top", { ru: "В слоте сверху должна быть исследовательская микросхема" });
Translation.addTranslation("Idles", { ru: "Простаивает" });
Translation.addTranslation("No power", { ru: "Нет энергии" });
Translation.addTranslation("The slot on top is not a research chip", { ru: "В слоте сверху находится не исследовательская микросхема" });
Translation.addTranslation("Works", { ru: "Работает" });
Translation.addTranslation("The slot must have an item on top", { ru: "В слоте сверху должен быть предмет" });
Translation.addTranslation("The slot on the left should contain matter", { ru: "В слоте слева должна быть материя" });
Translation.addTranslation("But it is not matter._.", { ru: "Но это не материя._." });
Translation.addTranslation("The slot on the left should contain matter", { ru: "В слоте слева должна быть материя" });
Translation.addTranslation("No matter!!!", { ru: "Материю низя!!!" });
Translation.addTranslation("In the slot above there should be reconstructed matter", { ru: "В слоте сверху должна быть реконструированная материя" });
Translation.addTranslation("The slot on the left should contain matter", { ru: "В слоте слева должна быть материя" });
Translation.addTranslation("Generation", { ru: "Генерация" });
Translation.addTranslation("Condition", { ru: "Состояние" });
Translation.addTranslation("§§1 Vitya Beley: §7 participated in improving recipes for mechanical armor components and creating new resources. §c09.08.2020 §b3§f.§70§f.§36", { ru: "§1Витя Белей: §7проявил соучастие в совершенствовании рецептов компонентов механической брони и созданию новых ресурсов. §c09.08.2020 §b3§f.§70§f.§36" });
Translation.addTranslation("Lavarite", { ru: "Лаварит" });
Translation.addTranslation("Leotite", { ru: "Леотит" });
Translation.addTranslation("Mionite", { ru: "Мионит" });
Translation.addTranslation("It is found in the lower world in magma.", { ru: "Встречается в нижнем мире в магме." });
Translation.addTranslation("A strange mutation of the glowing stone, found in the lower world.", { ru: "Странная мутация светящегося камня, встречается в нижнем мире." });
Translation.addTranslation("You need to search where the edge stone is located", { ru: "Нужно искать там, где находится камень края" });
Translation.addTranslation("Laboratory Block", { ru: "Лабораторный Блок" });
Translation.addTranslation("Molecular Sealer", { ru: "Молекулярный Уплотнитель" });
Translation.addTranslation("Wood Incubator", { ru: "Древесный Инкубатор" });
Translation.addTranslation("Molecular Converter", { ru: "Молекулярный Преобразователь" });
Translation.addTranslation("Matter Reenactor", { ru: "Реконструктор Материи" });
Translation.addTranslation("Empty Flasks", { ru: "Пустые Колбы" });
Translation.addTranslation("OresMod: Swords", { ru: "OresMod: Мечи" });
Translation.addTranslation("OresMod: Pickaxes", { ru: "OresMod: Кирки" });
Translation.addTranslation("OresMod: Shovels", { ru: "OresMod: Лопаты" });
Translation.addTranslation("OresMod: Axes", { ru: "OresMod: Топоры" });
Translation.addTranslation("OresMod: Hoes", { ru: "OresMod: Мотыги" });
Translation.addTranslation("OresMod: Ores", { ru: "OresMod: Руды" });
Translation.addTranslation("OresMod: Blocks", { ru: "OresMod: Блоки" });
Translation.addTranslation("OresMod: Sources", { ru: "OresMod: Ресурсы" });
Translation.addTranslation("Adamantite Armor", { ru: "Адамантитовая Броня" });
Translation.addTranslation("Lead Armor", { ru: "Свинцовая Броня" });
Translation.addTranslation("Malachite Armor", { ru: "Малахитовая Броня" });
Translation.addTranslation("Sapphire Armor", { ru: "Сапфировая Броня" });
Translation.addTranslation("Uranium Armor", { ru: "Ураниумовая Броня" });
Translation.addTranslation("Solar Panels", { ru: "Солнечные Панели" });
Translation.addTranslation("OresMod: Mechanisms", { ru: "OresMod: Механизмы" });
Translation.addTranslation("OresMod: Chips", { ru: "OresMod: Чипы" });
Translation.addTranslation("OresMod: Solar Panel Cores", { ru: "OresMod: Ядра солнечных панелей" });
Translation.addTranslation("OresMod: Nuggets", { ru: "OresMod: Самородки" });
Translation.addTranslation("OresMod: Other Resources", { ru: "OresMod: Другие Ресурсы" });
Translation.addTranslation("OresMod: Mechanic Adamantite Armor", { ru: "OresMod: Механическая Адамантитовая Броня" });
Translation.addTranslation("OresMod: Mechanic Sapphire Armor", { ru: "OresMod: Механическая Сапфировая Броня" });
Translation.addTranslation("OresMod: Empty Flasks", { ru: "OresMod: Пустые Колбы" });
Translation.addTranslation("OresMod: Flasks With Nanites", { ru: "OresMod: Колбы С Нанитами" });
Translation.addTranslation("OresMod: Mechanic Armor Components", { ru: "OresMod: Механические Компоненты" });
function wireRegistry(id, texture, special, visual, energy) {
    var specialTypes = false;
    if (special)
        specialTypes = Block.createSpecialType(special);
    IDRegistry.genBlockID(id);
    Block.createBlock(id, [
        {
            name: energy.energyType + " Conduct",
            texture: texture,
            inCreative: false
        }
    ], specialTypes);
    Callback.addCallback("PostLoaded", function () {
        ICRender.getGroup(visual.group).add(BlockID[id], -1);
        setupWireRender(BlockID[id], visual.size, visual.group);
        eval(energy.energyType).registerWire(BlockID[id], energy.maxVoltage);
    });
}
function itemWireRegistry(id, name, texture, wire) {
    OresAPI.registerItem(id, name[0], { name: texture }, { ru: name[1] }, {}, defaultItemNameOverride("a", "item"));
    Item.registerUseFunction(id, function (coords, item, block) {
        World.setBlock(coords.relative.x, coords.relative.y, coords.relative.z, BlockID[wire]);
        Player.decreaseCarriedItem(1);
    });
    Block.registerDropFunctionForID(BlockID[wire], function (c) {
        return [[ItemID[id], 1, 0]];
    });
}
wireRegistry("QEconduct", [["conduct", 0]], { lightlevel: 13 }, { group: "QE-wire", size: 1 / 6 }, { energyType: "QE", maxVoltage: 2048 });
itemWireRegistry("QEconduct", ["QE cable", "QE проводник"], "QE_cable", "QEconduct");
wireRegistry("EUconduct", [["conduct", 1]], null, { group: "ic-wire", size: 1 / 4 }, { energyType: "EU", maxVoltage: 2048 });
itemWireRegistry("EUconduct", ["Wire", "Провод"], "EU_wire", "EUconduct");
Callback.addCallback("PostLoaded", function () {
    OresAPI.addShapedRecipe([ItemID.QEconduct, 12, 0], ["wiw", "sgs", "wdw"], ["w", 35, -1, "i", 265, 0, "s", 348, 0, "g", 20, 0, "d", 351, 2]);
    OresAPI.addShapedRecipe([ItemID.EUconduct, 12, 0], ["cic", "lsl", "cic"], ["i", 265, 0, "c", 263, 0, "l", 821, 0, "s", ItemID.crystalSapphire, -1]);
});
var GuideAPI = false;
var GuideHelper, Ctrl = null;
var pages = {};
var Lcolor = UIColor.rgb(0, 0, 128);
var Ncolor = UIColor.rgb(128, 0, 128);
var Guide = {
    pages: {},
    addPage: function (name, left, right, navigation) {
        //if(!this.pages[name])
        pages[name] = { left: {}, right: {} };
        left = this.createPageSide(left);
        right = this.createPageSide(right);
        pages[name].left = left;
        pages[name].right = right;
        if (navigation)
            this.addButtons(name, navigation);
    },
    addButtons: function (name, buttons) {
        for (var i in buttons) {
            pages[name][i] = buttons[i];
        }
    },
    createPageSide: function (page) {
        var ctrl = page.ctrl;
        delete page.ctrl;
        switch (ctrl) {
            case "itemPage":
                page.controller = Ctrl.ITEM_PAGE;
                page.items = this.formateItemsList(page.items);
                return page;
            case "basic":
                page.controller = Ctrl.BASIC_PAGE;
                return page;
            case "craftPage":
                page.controller = Ctrl.GRID_3x3_PAGE;
                //page.recipes = this.formateRecipeGridList(page.recipes);
                return page;
        }
    },
    formateItemsList: function (items) {
        var arr = [];
        var pointer = 0;
        var currentItem = {};
        for (var i in items) {
            switch (pointer) {
                case 0:
                    pointer++;
                    currentItem.id = items[i];
                    break;
                case 1:
                    pointer--;
                    currentItem.data = items[i];
                    arr.push(currentItem);
                    currentItem = {};
                    break;
            }
        }
        return arr;
    },
    text: function (text, size, color, bold, underline) {
        return { text: Translation.translate(text), size: size || 15, color: color || Ncolor, bold: bold, underline: underline };
    },
    link: function (text, link, size, color) {
        return { text: Translation.translate(text), size: size || 20, color: color || Lcolor, link: link, underline: true, bold: true };
    },
    title: function (text) {
        return this.text(text, 20, UIColor.CYAN);
    },
    solar: function (type) {
        return this.text(StringHelper
            .solar(type));
    }
};
ModAPI.addAPICallback("GuideAPI", function (api) {
    GuideAPI = api.GuideAPI;
    GuideHelper = api.GudeHelper;
    Ctrl = api.PageControllers;
    Callback.addCallback("PostLoaded", function () {
        GuideAPI.registerGuide("oresModGuide", {
            item: ItemID.oresModGuideBook,
            pages: pages,
            textures: {
                background: "blue_background",
                nextLink: "next",
                preLink: "pre",
                close: "btn"
            }
        });
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("default", {
        ctrl: "itemPage",
        items: [ItemID.crystalSapphire, 0],
        elements: [Guide.text("All about Ores Mod", 30, UIColor.CYAN)]
    }, {
        ctrl: "basic",
        elements: [
            Guide.link("About ores", "ores_main"),
            Guide.link("About mechanical blocks", "mech_main"),
            Guide.link("About other items", "items_main"),
            Guide.link("Armor modifications", "desc_main")
        ]
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("chips", {
        ctrl: "itemPage",
        items: [
            ItemID.researchChip, 0,
            ItemID.burntChip, 0,
            ItemID.quantomDetectorChip, 0,
            ItemID.densityControllerChip, 0,
            ItemID.matteryDrive, 0
        ],
        elements: [
            { text: StringHelper.t("Chips"), color: Ncolor, size: 20, bold: true },
            { text: StringHelper.t("Receiving:"), color: Ncolor, size: 14, underline: true },
            { text: Translation.translate("Laboratory Block"), color: Ncolor, size: 17, bold: true, link: "lbm" },
            { text: StringHelper.t("Application:"), color: Ncolor, size: 14, underline: true },
            { text: StringHelper.t("Creating mechanisms"), color: Ncolor, size: 17, bold: true }
        ]
    }, {
        ctrl: "craftPage",
        title: Translation.translate("Research Chip"),
        recipes: [{
                grid: [["t", "r", "t"], ["r", "s", "r"], ["t", "r", "t"]],
                materials: {
                    "t": { id: ItemID.ingotLead, data: 0 },
                    "r": { id: 331, data: 0 },
                    "s": { id: 265, data: 0 }
                },
                result: { id: ItemID.researchChip, count: 4, data: 0 }
            }]
    }, { preLink: "items_main" });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("cores", {
        ctrl: "itemPage",
        items: [
            ItemID.solarCoreLeadstone, 0,
            ItemID.solarCoreHardent, 0,
            ItemID.solarCoreRedstone, 0,
            ItemID.solarCoreResonant, 0,
            ItemID.solarCoreAdvanced, 0,
            ItemID.solarCoreUltimate, 0
        ],
        elements: [Guide.text("Used in the creation of solar panels", null, null, true)]
    }, {
        ctrl: "craftPage",
        title: "",
        recipes: [{
                grid: [["o", "n", "o"], ["n", "i", "n"], ["o", "n", "o"]],
                materials: {
                    "i": { id: 265, data: 0 },
                    "n": { id: ItemID.nuggetLead, data: 0 }
                },
                result: { id: ItemID.solarCoreLeadstone, data: 0 }
            }],
        elements: [
            Guide.text("To find out the recipe for higher level kernels, put the core one level less in inventory and open the inventory.", null, null, null, true),
            Guide.text("For example, to find out the recipe for the core of a hardened solar panel - take the lead core and open the workbench.")
        ]
    }, {
        preLink: "items_main"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("items_main", {
        ctrl: "basic",
        elements: [
            Guide.link("Matter", "matter"),
            Guide.link("Chips", "chips"),
            Guide.link("Cores", "cores"),
            Guide.link("Nuggets", "nuggets"),
            Guide.link("Photovailtaic Cell", "PhotovailtaicCell"),
            Guide.link("Nanites", "nanites"),
            Guide.link("Components of mechanical armor", "comp_main"),
            Guide.link("Mechanic Armor", "mamain")
        ]
    }, {}, {
        preLink: "default"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("matter", {
        ctrl: "itemPage",
        items: [ItemID.Oresmatter, 0],
        elements: [
            Guide.text("Matter", 20, null, true),
            Guide.text("Receiving:", null, null, null, true),
            Guide.link("Molecular Sealer", "msm")
        ]
    }, {
        ctrl: "itemPage",
        items: [ItemID.rebuiltMatter, 0],
        elements: [
            Guide.text("Rebuilt Matter", 20, null, true),
            Guide.text("Receiving:", null, null, null, true),
            Guide.link("Matter Reenactor", "mrm"),
            Guide.text("Application:", null, null, null, true),
            Guide.link("Molecular Converter", "mcm")
        ]
    }, {
        preLink: "items_main"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("nanites", {
        ctrl: "itemPage",
        items: [
            ItemID.flaskWithNanites, 22,
            ItemID.flaskWithNanites, 23,
            ItemID.flaskWithNanites, 24,
            ItemID.flaskWithNanites, 25,
            ItemID.flaskWithNanites, 26,
            ItemID.flaskWithNanites, 27,
            ItemID.flaskWithNanites, 28
        ],
        elements: [
            Guide.text("Flask With Nanites", 20, null, true),
            Guide.text("Receiving:", null, null, null, true),
            Guide.link("Nanite Collector", "ncm"),
            Guide.text("Application:", null, null, null, true),
            Guide.link("Nanite Training Node", "ntnm")
        ]
    }, {
        ctrl: "itemPage",
        items: [ItemID.emptyFlask, 0],
        elements: [
            Guide.text("Empty Flask", 20, null, true),
            Guide.text("Receiving:", null, null, null, true),
            Guide.link("Craft of glass on the workbench"),
            Guide.text("Application:", null, null, null, true),
            Guide.link("Nanite Collector", "ncm")
        ]
    }, {
        preLink: "items_main"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("nuggets", {
        ctrl: "itemPage",
        items: [
            ItemID.shardLapis, 0,
            ItemID.nuggetLead, 0,
            ItemID.nuggetElectrum, 0,
            ItemID.nuggetMistery, 0
        ],
        elements: [
            Guide.text("Most of the nuggets are obtained from the same name full-fledged ingots (in the case of a lapis lazuli fragment - this is a whole lapis lazuli), except for unidentified and electroumovogo nuggets", null, null, null, true)
        ]
    }, {
        ctrl: "craftPage",
        title: "",
        recipes: [{
                grid: [["o", "g", "o"], ["r", "s", "r"], ["o", "g", "o"]],
                materials: {
                    "s": { id: ItemID.nuggetLead, data: 0 },
                    "r": { id: 331, data: 0 },
                    "g": { id: 371, data: 0 },
                    "o": { id: 0 }
                },
                result: { id: ItemID.nuggetElectrum, data: 0 }
            }, {
                grid: [["o", "e", "o"], ["d", "s", "d"], ["o", "e", "o"]],
                materials: {
                    "o": { id: 49, data: 0 },
                    "d": { id: 264, data: 0 },
                    "s": { id: ItemID.crystalSapphire, data: 0 },
                    "e": { id: ItemID.nuggetElectrum, data: 0 },
                    "o": { id: 0 }
                },
                result: { id: ItemID.nuggetMistery, data: 0 }
            }]
    }, {
        preLink: "items_main"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("PhotovailtaicCell", {
        ctrl: "itemPage",
        items: [ItemID.cellPhotovailtaic, 0],
        elements: [
            Guide.text("Application:", null, null, null, true),
            Guide.text("Creating mechanisms", null, null, true)
        ]
    }, {
        ctrl: "craftPage",
        title: StringHelper.t("Photovailtaic Cell"),
        recipes: [{
                grid: [["g", "g", "g"], ["l", "l", "l"], ["i", "i", "i"]],
                materials: {
                    "g": { id: 102, data: 0 },
                    "l": { id: ItemID.shardLapis, data: 0 },
                    "i": { id: 452, data: 0 }
                },
                result: { id: ItemID.cellPhotovailtaic, data: 0 }
            }]
    }, {
        preLink: "items_main"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("c1", {
        ctrl: "itemPage",
        items: [ItemID.connectingSystems, 0],
        elements: [
            Guide.text("Connecting Systems", 20, null, true)
        ]
    }, {
        ctrl: "craftPage",
        title: StringHelper.t("Connecting Systems"),
        recipes: [{
                grid: [["i", "a", "i"], ["i", "r", "i"], ["i", "a", "i"]],
                materials: {
                    "a": { id: ItemID.ingotLavarite },
                    "i": { id: ItemID.ingotLead },
                    "r": { id: 331 }
                },
                result: { id: ItemID.connectingSystems },
            }],
        elements: StringHelper.navigator("comp_main")
    }, {
        preLink: "comp_main",
        nextLink: "c2"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("c10", {
        ctrl: "itemPage",
        items: [ItemID.advancedOpticalLens, 0],
        elements: [
            Guide.text("Advanced Optical Lens", 20, null, null, true)
        ]
    }, {
        ctrl: "craftPage",
        title: StringHelper.t("Advanced Optical Lens"),
        recipes: [{
                grid: [["r", "s", "r"], ["s", "g", "s"], ["r", "s", "r"]],
                materials: {
                    "r": { id: 331 },
                    "s": { id: ItemID.nuggetMionite },
                    "g": { id: ItemID.opticalLens },
                },
                result: { id: ItemID.advancedOpticalLens }
            }],
        elements: StringHelper.navigator("comp_main")
    }, { preLink: "c9", nextLink: "c11" });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("c11", {
        ctrl: "itemPage",
        items: [ItemID.advancedLocalLogicSystem, 0],
        elements: [
            Guide.text("Advanced Local Logic System", 20, null, null, true)
        ]
    }, {
        ctrl: "craftPage",
        title: StringHelper.t("Advanced Local Logic System"),
        recipes: [{
                grid: [["s", "r", "s"], ["s", "c", "s"], ["s", "r", "s"]],
                materials: {
                    "r": { id: 152 },
                    "d": { id: 57 },
                    "s": { id: ItemID.nuggetMionite },
                    "g": { id: ItemID.opticalLens },
                },
                result: { id: ItemID.advancedLocalLogicSystem }
            }],
        elements: StringHelper.navigator("comp_main")
    }, { preLink: "c10", nextLink: "c12" });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("c12", {
        ctrl: "itemPage",
        items: [ItemID.advancedMatrixOfHoloSystems, 0],
        elements: [
            Guide.text("Advanced Local Logic System", 20, null, null, true)
        ]
    }, {
        ctrl: "craftPage",
        title: StringHelper.t("Advanced Local Logic System"),
        recipes: [{
                grid: [["o", "s", "o"], ["o", "c", "o"], ["o", "s", "o"]],
                materials: {
                    "o": { id: 49 },
                    "c": { id: ItemID.matrixOfHoloSystems },
                    "s": { id: ItemID.nuggetMionite },
                },
                result: { id: ItemID.advancedMatrixOfHoloSystems }
            }],
        elements: StringHelper.navigator("comp_main")
    }, { preLink: "c11", nextLink: "c13" });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("c13", {
        ctrl: "itemPage",
        items: [ItemID.advancedMovableElements, 0],
        elements: [
            Guide.text("Advanced Movable Elements", 20, null, null, true)
        ]
    }, {
        ctrl: "craftPage",
        title: StringHelper.t("Advanced Movable Elements"),
        recipes: [{
                grid: [["s", "d", "s"], ["d", "c", "d"], ["s", "d", "s"]],
                materials: {
                    "o": { id: 49 },
                    "d": { id: ItemID.nuggetMionite },
                    "c": { id: ItemID.movableElements },
                    "s": { id: ItemID.crystalSapphire },
                },
                result: { id: ItemID.advancedMovableElements }
            }],
        elements: StringHelper.navigator("comp_main")
    }, { preLink: "c12", nextLink: "c14" });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("c2", {
        ctrl: "itemPage",
        items: [ItemID.opticalLens, 0],
        elements: [
            Guide.text("Optical Lens", 20, null, null, true)
        ]
    }, {
        ctrl: "craftPage",
        title: StringHelper.t("Optical Lens"),
        recipes: [{
                grid: [["r", "a", "r"], ["a", "g", "a"], ["r", "a", "r"]],
                materials: {
                    "a": { id: ItemID.formationsLeotite },
                    "r": { id: 331 },
                    "g": { id: 102 }
                },
                result: { id: ItemID.opticalLens },
            }],
        elements: StringHelper.navigator("comp_main")
    }, { preLink: "c1", nextLink: "c3" });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("c3", {
        ctrl: "itemPage",
        items: [ItemID.centralLogicSystem, 0],
        elements: [
            Guide.text("Central Logic System", 20, null, null, true)
        ]
    }, {
        ctrl: "craftPage",
        title: StringHelper.t("Central Logic System"),
        recipes: [{
                grid: [["a", "s", "a"], ["d", "l", "d"], ["a", "s", "a"]],
                materials: {
                    "a": { id: ItemID.ingotAdamantite },
                    "s": { id: ItemID.formationsLeotite },
                    "l": { id: ItemID.localLogicSystem },
                    "d": { id: 57 }
                },
                result: { id: ItemID.centralLogicSystem },
            }],
        elements: StringHelper.navigator("comp_main")
    }, { preLink: "c2", nextLink: "c4" });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("c4", {
        ctrl: "itemPage",
        items: [ItemID.localLogicSystem, 0],
        elements: [
            Guide.text("Local Logic System", 20, null, null, true)
        ]
    }, {
        ctrl: "craftPage",
        title: StringHelper.t("Local Logic System"),
        recipes: [{
                grid: [["t", "a", "t"], ["s", "r", "s"], ["t", "d", "t"]],
                materials: {
                    "t": { id: ItemID.ingotLavarite },
                    "a": { id: ItemID.formationsLeotite },
                    "s": { id: ItemID.crystalSapphire },
                    "d": { id: 264 },
                    "r": { id: 331 }
                },
                result: { id: ItemID.localLogicSystem }
            }],
        elements: StringHelper.navigator("comp_main")
    }, { preLink: "c3", nextLink: "c5" });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("c5", {
        ctrl: "itemPage",
        items: [ItemID.matrixOfHoloSystems, 0],
        elements: [
            Guide.text("Matrix Of Holographics Systems", 20, null, null, true)
        ]
    }, {
        ctrl: "craftPage",
        title: StringHelper.t("Matrix Of Holographics Systems"),
        recipes: [{
                grid: [["s", "a", "s"], ["r", "g", "r"], ["s", "a", "s"]],
                materials: {
                    "g": { id: 102 },
                    "a": { id: ItemID.ingotLavarite },
                    "s": { id: ItemID.formationsLeotite },
                    "d": { id: 264 },
                    "r": { id: 331 }
                },
                result: { id: ItemID.matrixOfHoloSystems }
            }],
        elements: StringHelper.navigator("comp_main")
    }, { preLink: "c4", nextLink: "c6" });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("c6", {
        ctrl: "itemPage",
        items: [ItemID.manipulationCable, 0],
        elements: [
            Guide.text("Manipulation Cable", 20, null, null, true)
        ]
    }, {
        ctrl: "craftPage",
        title: StringHelper.t("Manipulation Cable"),
        recipes: [{
                grid: [["t", "s", "t"], ["a", "d", "a"], ["a", "e", "a"]],
                materials: {
                    "t": { id: ItemID.formationsLeotite },
                    "a": { id: ItemID.ingotLavarite },
                    "s": { id: ItemID.crystalSapphire },
                    "d": { id: 264 },
                    "e": { id: 388 }
                },
                result: { id: ItemID.manipulationCable }
            }],
        elements: StringHelper.navigator("comp_main")
    }, { preLink: "c5", nextLink: "c7" });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("c7", {
        ctrl: "itemPage",
        items: [ItemID.thermoadaptationCoating, 0],
        elements: [
            Guide.text("Thermoadaptation Coating", 20, null, null, true)
        ]
    }, {
        ctrl: "craftPage",
        title: StringHelper.t("Thermoadaptation Coating"),
        recipes: [{
                grid: [["a", "d", "a"], ["s", "d", "s"], ["a", "d", "a"]],
                materials: {
                    "a": { id: ItemID.ingotAdamantite },
                    "s": { id: ItemID.crystalSapphire },
                    "d": { id: ItemID.ingotLavarite },
                },
                result: { id: ItemID.thermoadaptationCoating }
            }],
        elements: StringHelper.navigator("comp_main")
    }, { preLink: "c6", nextLink: "c8" });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("c8", {
        ctrl: "itemPage",
        items: [ItemID.outerProtectivePlate, 0],
        elements: [
            Guide.text("Outer Protective Plate", 20, null, null, true)
        ]
    }, {
        ctrl: "craftPage",
        title: StringHelper.t("Outer Protective Plate"),
        recipes: [{
                grid: [["a", "a", "a"], ["d", "i", "d"], ["a", "a", "a"]],
                materials: {
                    "a": { id: ItemID.ingotLavarite },
                    "d": { id: ItemID.formationsLeotite },
                    "i": { id: 42 }
                },
                result: { id: ItemID.outerProtectivePlate }
            }],
        elements: StringHelper.navigator("comp_main")
    }, { preLink: "c7", nextLink: "c9" });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("c9", {
        ctrl: "itemPage",
        items: [ItemID.advancedConnectingSystems, 0],
        elements: [
            Guide.text("Advanced Connecting Systems", 20, null, null, true)
        ]
    }, {
        ctrl: "craftPage",
        title: StringHelper.t("Advanced Connecting Systems"),
        recipes: [{
                grid: [["s", "s", "s"], ["d", "c", "d"], ["s", "s", "s"]],
                materials: {
                    "d": { id: ItemID.crystalSapphire },
                    "s": { id: ItemID.nuggetMionite },
                    "c": { id: ItemID.connectingSystems },
                },
                result: { id: ItemID.advancedConnectingSystems }
            }],
        elements: StringHelper.navigator("comp_main")
    }, { preLink: "c8", nextLink: "c10" });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("comp_main", {
        ctrl: "basic",
        elements: [
            Guide.link("Connecting Systems", "c1"),
            Guide.link("Optical Lens", "c2"),
            Guide.link("Central Logic System", "c3"),
            Guide.link("Local Logic System", "c4"),
            Guide.link("Matrix Of Holographics Systems", "c5"),
            Guide.link("Manipulation Cable", "c6"),
            Guide.link("Thermoadaptation Coating", "c7"),
            Guide.link("Outer Protective Plate", "c8")
        ]
    }, {
        ctrl: "basic",
        elements: [
            Guide.link("Advanced Connecting Systems", "c9"),
            Guide.link("Advanced Optical Lens", "c10"),
            Guide.link("Advanced Matrix Of Holo Systems", "c11"),
            Guide.link("Advanced Movable Elements", "c12")
        ]
    }, {
        preLink: "items_main"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("mamain", {
        ctrl: "basic",
        elements: [
            Guide.link("Adamantite mechanical armor", "maa"),
            Guide.link("Sapphire mechanical armor", "mas")
        ]
    }, {}, {
        preLink: "items_main"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("maa", {
        ctrl: "itemPage",
        items: [
            ItemID.mechanicAdamantiteHelmet, 0,
            ItemID.mechanicAdamantiteChestplate, 0,
            ItemID.mechanicAdamantiteLeggings, 0,
            ItemID.mechanicAdamantiteBoots, 0
        ],
    }, {
        ctrl: "craftPage",
        title: StringHelper.t("Adamantite mechanical armor"),
        recipes: [
            {
                grid: [["a", "h", "a"], ["l", "c", "l"], ["o", "m", "g"]],
                materials: {
                    "a": { id: ItemID.ingotLavarite },
                    "h": { id: ItemID.matrixOfHoloSystems },
                    "l": { id: ItemID.opticalLens },
                    "c": { id: ItemID.centralLogicSystem },
                    "o": { id: ItemID.outerProtectivePlate },
                    "m": { id: ItemID.manipulationCable },
                    "g": { id: ItemID.connectingSystems },
                },
                result: { id: ItemID.mechanicAdamantiteHelmet, count: 1, data: 0 }
            },
            {
                grid: [["o", "c", "o"], ["t", "o", "t"], ["s", "o", "l"]],
                materials: {
                    "o": { id: ItemID.outerProtectivePlate },
                    "c": { id: ItemID.connectingSystems },
                    "t": { id: ItemID.thermoadaptationCoating },
                    "s": { id: ItemID.manipulationCable },
                    "l": { id: ItemID.localLogicSystem }
                },
                result: { id: ItemID.mechanicAdamantiteChestplate, count: 1, data: 0 }
            }
        ]
    }, {
        preLink: "mamain",
        nextLink: "maa2"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("maa2", {
        ctrl: "craftPage",
        title: StringHelper.t("Adamantite mechanical armor"),
        recipes: [
            {
                grid: [["m", "c", "m"], ["o", "t", "o"], ["l", "s", "o"]],
                materials: {
                    "m": { id: ItemID.movableElements },
                    "c": { id: ItemID.connectingSystems },
                    "o": { id: ItemID.outerProtectivePlate },
                    "t": { id: ItemID.thermoadaptationCoating },
                    "l": { id: ItemID.localLogicSystem },
                    "s": { id: ItemID.manipulationCable }
                },
                result: { id: ItemID.mechanicAdamantiteLeggings, count: 1, data: 0 }
            },
            {
                grid: [["o", "c", "o"], ["t", "l", "o"], ["o", "t", "o"]],
                materials: {
                    "o": { id: ItemID.outerProtectivePlate },
                    "c": { id: ItemID.connectingSystems },
                    "t": { id: ItemID.thermoadaptationCoating },
                    "l": { id: ItemID.localLogicSystem }
                },
                result: { id: ItemID.mechanicAdamantiteBoots, count: 1, data: 0 }
            }
        ]
    }, {
        ctrl: "basic",
        elements: [
            Guide.text("By itself, this armor has nothing special."),
            Guide.text("This armor can be embedded with nanites on the armor implantation table."),
            Guide.text("Embedding nanites will give you the property that the selected type of nanites is designed for when training in the nanite learning node"),
            Guide.link("Armor Implantation Table", "aitm"),
            Guide.link("Nanite Training Node", "ntnm"),
            Guide.link("Nanite Collector", "ncm"),
            Guide.link("Nanites", "nanites"),
            Guide.link("Armor modifications", "desc_main")
        ]
    }, {
        preLink: "maa",
        nextLink: "mamain"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("mas", {
        ctrl: "itemPage",
        items: [
            ItemID.mechanicSapphireHelmet, 0,
            ItemID.mechanicSapphireChestplate, 0,
            ItemID.mechanicSapphireLeggings, 0,
            ItemID.mechanicSapphireBoots, 0
        ],
    }, {
        ctrl: "craftPage",
        title: StringHelper.t("Sapphire mechanical armor"),
        recipes: [
            {
                grid: [["a", "m", "a"], ["l", "c", "l"], ["o", "h", "g"]],
                materials: {
                    "a": { id: ItemID.nuggetMionite },
                    "h": { id: ItemID.mechanicAdamantiteHelmet },
                    "l": { id: ItemID.advancedOpticalLens },
                    "c": { id: ItemID.centralLogicSystem },
                    "o": { id: ItemID.outerProtectivePlate },
                    "m": { id: ItemID.advancedMatrixOfHoloSystems },
                    "g": { id: ItemID.connectingSystems },
                },
                result: { id: ItemID.mechanicSapphireHelmet, count: 1, data: 0 }
            },
            {
                grid: [["c", "c", "c"], ["p", "a", "p"], ["p", "p", "p"]],
                materials: {
                    "c": { id: ItemID.advancedLocalLogicSystem },
                    "p": { id: ItemID.outerProtectivePlate },
                    "a": { id: ItemID.mechanicAdamantiteChestplate }
                },
                result: { id: ItemID.mechanicSapphireChestplate, count: 1, data: 0 }
            }
        ]
    }, {
        preLink: "mamain",
        nextLink: "mas2"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("mas2", {
        ctrl: "craftPage",
        title: StringHelper.t("Sapphire mechanical armor"),
        recipes: [
            {
                grid: [["p", "p", "p"], ["m", "a", "m"], ["p", "c", "p"]],
                materials: {
                    "m": { id: ItemID.advancedMovableElements },
                    "c": { id: ItemID.advancedLocalLogicSystem },
                    "p": { id: ItemID.outerProtectivePlate },
                    "a": { id: ItemID.mechanicAdamantiteLeggings }
                },
                result: { id: ItemID.mechanicSapphireLeggings, count: 1, data: 0 }
            },
            {
                grid: [["c", "a", "c"], ["s", "s", "s"], ["p", "p", "p"]],
                materials: {
                    "p": { id: ItemID.outerProtectivePlate },
                    "c": { id: ItemID.advancedLocalLogicSystem },
                    "a": { id: ItemID.mechanicAdamantiteBoots },
                    "s": { id: ItemID.crystalSapphire }
                },
                result: { id: ItemID.mechanicSapphireBoots, count: 1, data: 0 }
            }
        ]
    }, {
        ctrl: "basic",
        elements: [
            Guide.text("Improved version of mechanical armor."),
            Guide.text("When creating a sapphire armor, it will pass all the modifiers that are in the Adamantite armor", null, null, true, true)
        ]
    }, {
        preLink: "mas",
        nextLink: "mamain"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("mech_main", {
        ctrl: "basic",
        elements: [
            Guide.link("Solar Panels", "solar_main"),
            Guide.link("Wood Incubator", "wim"),
            Guide.link("Laboratory Block", "lbm"),
            Guide.link("Molecular Generator", "mgm"),
            Guide.link("Molecular Sealer", "msm"),
            Guide.link("Matter Reenactor", "mrm"),
            Guide.link("Molecular Converter", "mcm"),
            Guide.link("Nanite Collector", "ncm"),
            Guide.link("Nanite Training Node", "ntnm"),
            Guide.link("Armor Implantation Table", "aitm"),
        ]
    }, {}, { preLink: "default" });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("mac", {
        ctrl: "itemPage",
        items: [BlockID.armorCharger, 0],
        elements: [
            Guide.text("Only he is able to charge a mechanical armor")
        ]
    }, {
        ctrl: "craftPage",
        title: StringHelper.t("Mechanic Armor Charger"),
        grid: [["r", "r", "r"], ["s", "b", "s"], ["t", "t", "t"]],
        materials: {
            "r": { id: 331 },
            "b": { id: 152 },
            "t": { id: ItemID.ingotLead },
            "s": { id: ItemID.crystalSapphire }
        }
    }, {
        preLink: "mech_main",
        nextLink: "macg"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("macg", {
        ctrl: "basic",
        elements: [Guide.text("Well there's nothing to explain ｡ ◕ ‿ ◕ ｡")]
    }, {}, {
        preLink: "mac",
        nextLink: "mech_main"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("aitm", {
        ctrl: "itemPage",
        items: [BlockID.armorImplantationTable, 0],
        elements: [
            Guide.text("The same mechanism that will modify your mechanical armor")
        ]
    }, {
        ctrl: "craftPage",
        title: StringHelper.t("Armor Implantation Table"),
        recipes: [{
                grid: [["s", "t", "s"], ["d", "r", "d"], ["s", "t", "s"]],
                materials: {
                    "s": { id: ItemID.crystalSapphire, data: 0 },
                    "d": { id: 264, data: 0 },
                    "t": { id: ItemID.ingotLead, data: 0 },
                    "r": { id: 331, data: 0 }
                },
                result: { id: BlockID.armorImplantationTable, data: 0 }
            }]
    }, {
        preLink: "mech_main",
        nextLink: "aitg"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("aitg", {
        ctrl: "basic",
        elements: [
            Guide.title("The use of Desk trainer armor"),
            Guide.text("When you open the mechanism window, you will see two slots."),
            Guide.text("Only a flask with trained nanites is installed in the upper slot"),
            Guide.text("only mechanical armor is installed in the center slot."),
            Guide.text("after installing the mechanical armor in the slot, a certain number of new slots will appear, these are conditional cells of modifications."),
            Guide.text("clicking on the conditional modification slots will show you their status in the form of text information, if the slot is blocked - it needs to be unlocked by the nanites of the \"Builder\" specialization before the modification can be implemented in it.")
        ]
    }, {
        ctrl: "basic",
        elements: [
            Guide.text("all implemented modifications cannot be extracted or replaced, only improved by re-introducing nanites of the same specialization.")
        ]
    }, {
        preLink: "aitm",
        nextLink: "mech_main"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("mcm", {
        ctrl: "itemPage",
        items: [BlockID.molecularConverter, 0],
        elements: [Guide.text("Turns reconstructed matter into objects.")]
    }, {
        ctrl: "craftPage",
        title: Translation.translate("Molecular Converter"),
        recipes: [{
                grid: [["t", "s", "t"], ["r", "s", "r"], ["t", "d", "t"]],
                result: { id: BlockID.molecularConverter, data: 0 },
                materials: {
                    "t": { id: ItemID.ingotLead, data: 0 },
                    "s": { id: ItemID.crystalSapphire, data: 0 },
                    "r": { id: 331, data: 0 },
                    "c": { id: ItemID.densityControllerChip, data: 0 },
                    "d": { id: 264, data: 0 }
                }
            }]
    }, { preLink: "mech_main", nextLink: "mcg" });
});
ModAPI.addAPICallback("GuideAPI", function () {
    /*pages["mcg"] = {
        left:{
            controller: Ctrl.BASIC_PAGE,
            elements:[
                {text: StringHelper.t("Using molecular converter"), size: 20, color: UIColor.CYAN},
                {text: StringHelper.t("The information panel in the mechanism window displays the current state of the mechanism and helps to understand how the mechanism works."), size: 14, color: Ncolor},
                {text: StringHelper.t("As a result, you will receive an item that was as a result of the reconstruction of matter."), size: 14, color: Ncolor}
            ]
        },
        right:{
            controller: Ctrl.BASIC_PAGE,
            elements:[
                {text: StringHelper.t("At the exit you will receive the item that was recorded in the reconstructed matter."), size: 15, color: Ncolor}
            ]
        },
        preLink: "mcm",
        nextLink: "mechanic_main"
    }*/
    Guide.addPage("mcg", {
        ctrl: "basic",
        elements: [
            Guide.text("Using molecular converter", 20, UIColor.CYAN),
            Guide.text("The information panel in the mechanism window displays the current state of the mechanism and helps to understand how the mechanism works."),
            Guide.text("As a result, you will receive an item that was as a result of the reconstruction of matter.")
        ]
    }, {
        ctrl: "basic",
        elements: [
            Guide.text("At the exit you will receive the item that was recorded in the reconstructed matter.")
        ]
    }, { preLink: "mcm", nextLink: "mech_main" });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("lbm", {
        ctrl: "itemPage",
        items: [BlockID.labBlock, 0],
        elements: [
            Guide.text("The only source of chips")
        ]
    }, {
        ctrl: "craftPage",
        title: Translation.translate("Laboratory Block"),
        recipes: [{
                grid: [["s", "g", "s"], ["i", "r", "i"], ["r", "d", "r"]],
                materials: {
                    "s": { id: ItemID.crystalSapphire, data: 0 },
                    "d": { id: 54, data: 0 },
                    "i": { id: 42, data: 0 },
                    "r": { id: 152, data: 0 },
                    "g": { id: 20, data: 0 }
                },
                result: { id: BlockID.labBlock, data: 0 }
            }]
    }, {
        preLink: "mech_main",
        nextLink: "lbg"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("lbg", {
        ctrl: "basic",
        elements: [
            Guide.title("Using a laboratory block"),
            Guide.text("For the mechanism to work, you need to: keep the mechanism charged with energy and place the research chips in the upper slot.")
        ]
    }, {}, {
        preLink: "lbm",
        nextLink: "mech_main"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("mgm", {
        ctrl: "itemPage",
        items: [BlockID.molecularGenerator, 0],
        elements: [
            Guide.text("Generator, for generating a new type of energy QE (Quantum Energy)")
        ]
    }, {
        ctrl: "craftPage",
        recipes: [{
                result: { id: BlockID.molecularGenerator, data: 0 },
                grid: [["t", "d", "t"], ["r", "c", "r"], ["t", "s", "t"]],
                materials: {
                    "t": { id: ItemID.ingotLead, data: 0 },
                    "d": { id: ItemID.matteryDrive, data: 0 },
                    "r": { id: 331, data: 0 },
                    "s": { id: ItemID.splitterChip, data: 0 },
                    "c": { id: ItemID.crystalSapphire, data: 0 }
                }
            }],
        title: Translation.translate("Molecular Generator")
    }, {
        preLink: "mech_main",
        nextLink: "mgg"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    /*pages["mgg"] = {
        left:{
            controller: Ctrl.BASIC_PAGE,
            elements:[
                {text: StringHelper.t("Using a molecular generator"), size: 21, color: UIColor.CYAN, bold: true},
                {text: StringHelper.t("Working with this mechanism is the easiest"), size: 14, color: Ncolor},
                {text: StringHelper.t("In the interface of the mechanism there are many slots, in these slots are placed any items that the mechanism will turn into energy."), size: 14, color: Ncolor},
                {text: StringHelper.t("The mechanism does not consume Eu-energy."), underline: true, size: 14, color: Ncolor},
                {text: StringHelper.t("The removal of energy is carried out by attaching a special conductor to the upper side of the mechanism."), color: Ncolor}
            ]
        },
        preLink: "mgm",
        nextLink: "mechanic_main"
    }*/
    Guide.addPage("mgg", {
        ctrl: "basic",
        elements: [
            Guide.title("Using a molecular generator"),
            Guide.text("Working with this mechanism is the easiest."),
            Guide.text("In the interface of the mechanism there are many slots, in these slots are placed any items that the mechanism will turn into energy."),
            Guide.text("The mechanism does not consume Eu-energy.", null, null, null, true),
            Guide.text("The removal of energy is carried out by attaching a special conductor to the upper side of the mechanism.")
        ]
    }, {}, {
        preLink: "mgm",
        nextLink: "mech_main"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("ncm", {
        ctrl: "itemPage",
        items: [BlockID.naniteCollector, 0],
        elements: [
            Guide.text("Father of mechanical micro-organisms")
        ]
    }, {
        ctrl: "craftPage",
        title: StringHelper.t("Nanite Collector"),
        recipes: [{
                grid: [["b", "d", "b"], ["s", "c", "s"], ["b", "r", "b"]],
                materials: {
                    "r": { id: 331 },
                    "c": { id: ItemID.splitterChip },
                    "s": { id: ItemID.crystalSapphire },
                    "d": { id: ItemID.densityControllerChip },
                    "b": { id: ItemID.ingotLead }
                },
                result: { id: BlockID.naniteCollector, count: 1, data: 0 }
            }]
    }, {
        preLink: "mech_main",
        nextLink: "ncg"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("ncg", {
        ctrl: "basic",
        elements: [
            Guide.title("Using the nanite collector"),
            Guide.text("There are three slots in the mechanism next to each other"),
            Guide.text("The left slot is intended for iron ingots"),
            Guide.text("Central for empty flasks"),
            Guide.text("Right for red dust"),
            Guide.text("The mechanism needs two types of energy to start producing nanites", null, UIColor.RED, null, true),
            Guide.text("Once production is complete you will receive one nanite capsule")
        ]
    }, {}, {
        preLink: "ncm",
        nextLink: "mech_main"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("ntnm", {
        ctrl: "itemPage",
        items: [BlockID.naniteTrainingNode, 0],
        elements: [
            Guide.text("Nanites also need to learn")
        ]
    }, {
        ctrl: "craftPage",
        title: StringHelper.t("Nanite Training Node"),
        recipes: [{
                grid: [["b", "s", "b"], ["r", "d", "r"], ["b", "c", "b"]],
                materials: {
                    "d": { id: ItemID.quantomDetectorChip },
                    "b": { id: ItemID.ingotLead },
                    "r": { id: 331 },
                    "c": { id: ItemID.matteryDrive },
                    "s": { id: ItemID.crystalSapphire }
                },
                result: { id: BlockID.naniteTrainingNode, count: 1, data: 0 }
            }]
    }, {
        preLink: "mech_main",
        nextLink: "ntng"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("ntng", {
        ctrl: "basic",
        elements: [
            Guide.title("Using the nanite training node"),
            Guide.text("You need to select the desired specification of nanites, and then place the flask with nanites in the left slot. The mechanism will issue a flask with trained nanites")
        ]
    }, {}, {
        preLink: "ntnm",
        nextLink: "mech_main"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("mrm", {
        ctrl: "itemPage",
        items: [BlockID.matterReenactor, 0],
        elements: [
            Guide.text("He accepts ordinary matter and any object, the data of which he will transmit to matter and will issue reconstructed matter.")
        ]
    }, {
        ctrl: "craftPage",
        recipes: [{
                grid: [["t", "d", "t"], ["r", "c", "r"], ["t", "s", "t"]],
                materials: {
                    "t": { id: ItemID.ingotLead, data: 0 },
                    "d": { id: ItemID.quantomDetectorChip, data: 0 },
                    "r": { id: 331, data: 0 },
                    "c": { id: ItemID.splitterChip, data: 0 },
                    "s": { id: ItemID.crystalSapphire, data: 0 }
                },
                result: { id: BlockID.matterReenactor, data: 0 }
            }],
        title: StringHelper.t("Matter Reenactor")
    }, {
        preLink: "mech_main",
        nextLink: "mrg"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("mrg", {
        ctrl: "basic",
        elements: [
            Guide.title("Use of matter re-constructor"),
            Guide.text("To understand the mechanism, just open it and look at the panel below."),
            Guide.text("The red and yellow text indicates that the mechanism is lacking for work.")
        ]
    }, {}, {
        preLink: "mrm",
        nextLink: "mech_main"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("msm", {
        ctrl: "itemPage",
        items: [BlockID.molecularSealant, 0],
        elements: [
            Guide.text("Molecular compactor compresses QE energy, turning it into matter.")
        ]
    }, {
        ctrl: "craftPage",
        title: StringHelper.t("Molecular Sealer"),
        recipes: [{
                grid: [["t", "s", "t"], ["r", "d", "r"], ["t", "s", "t"]],
                materials: {
                    "t": { id: ItemID.ingotLead, data: 0 },
                    "s": { id: ItemID.crystalSapphire, data: 0 },
                    "r": { id: 331, data: 0 },
                    "d": { id: ItemID.quantomDetectorChip, data: 0 }
                },
                result: { id: BlockID.molecularSealant, data: 0 }
            }]
    }, {
        preLink: "mech_main",
        nextLink: "msg"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("msg", {
        ctrl: "basic",
        elements: [
            Guide.title("The use of molecular sealer."),
            Guide.text("The operation of this mechanism is fully automatic, you just need to maintain working conditions."),
            Guide.text("In order for the mechanism to accept QE-energy, you need to connect a wire to it to the upper side."),
            Guide.text("The mechanism itself begins to work when the energy inside it is greater than 0.")
        ]
    }, {
        ctrl: "basic",
        elements: [
            Guide.text("The redstone signal stops the operation of the mechanism, but at the same time it will still be able to absorb energy.")
        ]
    }, {
        preLink: "msm",
        nextLink: "mech_main"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("advanced", {
        ctrl: "itemPage",
        items: [BlockID.solarPanelAdvanced, 0],
        elements: [
            Guide.solar("advanced")
        ]
    }, {
        ctrl: "craftPage",
        title: StringHelper.t("Advanced Solar Panel"),
        recipes: [{
                grid: [
                    ["p", "l", "p"],
                    ["c", "r", "c"],
                    ["s", "l", "s"]
                ],
                materials: {
                    "p": { id: BlockID.solarPanelResonant, data: 0 },
                    "c": { id: ItemID.solarCoreAdvanced, data: 0 },
                    "l": { id: ItemID.cellPhotovailtaic, data: 0 },
                    "r": { id: ItemID.nuggetMionite, data: 0 },
                    "s": { id: ItemID.crystalSapphire, data: 0 },
                    "l": { id: ItemID.formationsLeotite, data: 0 }
                },
                result: { id: BlockID.solarPanelAdvanced, data: 0 }
            }],
        elements: StringHelper.navigator("solar_main")
    }, {
        preLink: "resonant",
        nextLink: "ultimate"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("hardent", {
        ctrl: "itemPage",
        items: [BlockID.solarPanelHardent, 0],
        elements: [
            Guide.solar("hardent")
        ]
    }, {
        ctrl: "craftPage",
        title: StringHelper.t("Hardent Solar Panel"),
        recipes: [{
                grid: [
                    ["p", "l", "p"],
                    ["c", "r", "c"],
                    ["n", "r", "n"]
                ],
                materials: {
                    "p": { id: BlockID.solarPanelLeadstone, data: 0 },
                    "c": { id: ItemID.solarCoreHardent, data: 0 },
                    "r": { id: ItemID.ingotLead, data: 0 },
                    "l": { id: ItemID.cellPhotovailtaic, data: 0 },
                    "n": { id: ItemID.nuggetLead, data: 0 }
                },
                result: { id: BlockID.solarPanelHardent, data: 0 }
            }],
        elements: StringHelper.navigator("solar_main")
    }, {
        preLink: "leadstone",
        nextLink: "redstone"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("leadstone", {
        ctrl: "itemPage",
        items: [BlockID.solarPanelLeadstone, 0],
        elements: [Guide.solar("leadstone")]
    }, {
        ctrl: "craftPage",
        title: StringHelper.t("Leadstone Solar Panel"),
        recipes: [{
                grid: [
                    ["l", "l", "l"],
                    ["r", "c", "r"],
                    ["n", "n", "n"]
                ],
                materials: {
                    "l": { id: ItemID.cellPhotovailtaic, data: 0 },
                    "r": { id: 266, data: 0 },
                    "c": { id: ItemID.solarCoreHardent, data: 0 },
                    "n": { id: ItemID.ingotLead, data: 0 }
                },
                result: { id: BlockID.solarPanelLeadstone, data: 0 },
            }],
        elements: StringHelper.navigator("solar_main")
    }, {
        nextLink: "hardent"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("solar_main", {
        ctrl: "basic",
        elements: [
            Guide.link("Leadstone", "leadstone"),
            Guide.link("Hardent", "hardent"),
            Guide.link("Redstone", "redstone"),
            Guide.link("Resonant", "resonant"),
            Guide.link("Advanced", "advanced"),
            Guide.link("Ultimate", "ultimate")
        ]
    }, {}, {
        preLink: "mech_main"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("redstone", {
        ctrl: "itemPage",
        items: [BlockID.solarPanelRedstone, 0],
        elements: [Guide.solar("redstone")]
    }, {
        ctrl: "craftPage",
        title: StringHelper.t("Redstone Solar Panel"),
        recipes: [{
                grid: [
                    ["p", "l", "p"],
                    ["c", "b", "c"],
                    ["n", "n", "n"]
                ],
                materials: {
                    "p": { id: BlockID.solarPanelHardent, data: 0 },
                    "c": { id: ItemID.solarCoreRedstone, data: 0 },
                    "l": { id: ItemID.cellPhotovailtaic, data: 0 },
                    "n": { id: ItemID.nuggetLead, data: 0 },
                    "b": { id: 266, data: 0 }
                },
                result: { id: BlockID.solarPanelRedstone, data: 0 }
            }],
        elements: StringHelper.navigator("solar_main")
    }, {
        preLink: "hardent",
        nextLink: "resonant"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("resonant", {
        ctrl: "itemPage",
        items: [BlockID.solarPanelResonant, 0],
        elements: [Guide.solar("resonant")]
    }, {
        ctrl: "craftPage",
        title: StringHelper.t("Resonant Solar Panel"),
        recipes: [{
                grid: [
                    ["p", "l", "p"],
                    ["c", "r", "c"],
                    ["n", "r", "n"]
                ],
                materials: {
                    "p": { id: BlockID.solarPanelRedstone, data: 0 },
                    "c": { id: ItemID.solarCoreResonant, data: 0 },
                    "l": { id: ItemID.cellPhotovailtaic, data: 0 },
                    "r": { id: 22, data: 0 },
                    "n": { id: ItemID.nuggetMistery, data: 0 }
                },
                result: { id: BlockID.solarPanelResonant, data: 0 }
            }],
        elements: StringHelper.navigator("solar_main")
    }, {
        preLink: "redstone",
        nextLink: "advanced"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("ultimate", {
        ctrl: "itemPage",
        items: [BlockID.solarPanelUltimate, 0],
        elements: [Guide.solar("ultimate")]
    }, {
        ctrl: "craftPage",
        title: StringHelper.t("Ultimate Solar Panel"),
        recipes: [{
                grid: [
                    ["p", "l", "p"],
                    ["c", "r", "c"],
                    ["n", "c", "n"]
                ],
                materials: {
                    "l": { id: ItemID.cellPhotovailtaic, data: 0 },
                    "r": { id: ItemID.nuggetMistery, data: 0 },
                    "c": { id: ItemID.solarCoreUltimate, data: 0 },
                    "p": { id: BlockID.solarPanelAdvanced, data: 0 },
                    "n": { id: ItemID.nuggetMionite, data: 0 }
                },
                result: { id: BlockID.solarPanelUltimate, data: 0 },
            }],
        elements: StringHelper.navigator("solar_main")
    }, {
        preLink: "advanced"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("wim", {
        ctrl: "itemPage",
        items: [BlockID.woodIncubator, 0],
        elements: [
            Guide.text("This mechanism will grow the tree anywhere.")
        ]
    }, {
        ctrl: "craftPage",
        title: StringHelper.t("Wood Incubator"),
        recipes: [{
                result: { id: BlockID.woodIncubator, data: 0 },
                grid: [
                    ["t", "d", "t"], ["r", "g", "r"], ["t", "t", "t"]
                ],
                materials: {
                    "t": { id: ItemID.ingotLead },
                    "d": { id: 3, data: 0 },
                    "g": { id: 266, data: 0 },
                    "r": { id: 331, data: 0 }
                }
            }],
    }, {
        preLink: "mech_main",
        nextLink: "wig"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("wig", {
        ctrl: "basic",
        elements: [
            Guide.title("Use of a wood incubator"),
            Guide.text("List of supported seedlings and catalysts on the right page.", null, null, null, true),
            Guide.text("Before using the mechanism, you need to place a block of earth or dirt next to it."),
            Guide.text("In the window of the mechanism, approximately in the middle, there is a red rectangle."),
            Guide.text("You need to work only with slots from the left of this rectangle.", null, null, null, true),
            Guide.text("A sapling is placed in the top slot; in the right - the catalyst"),
            Guide.text("If you did everything correctly, then a sapling will appear on the dirt block, and the red rectangle will turn green."),
            Guide.text("I remind you that the mechanism consumes energy, nothing will work without it."),
            Guide.text("The red box is the growth progress bar. When progress is completed - you will receive a tree, seedlings and a special drop, if there is one.")
        ]
    }, {
        ctrl: "basic",
        elements: [
            Guide.text("Saplings:", 20, null, true),
            Guide.text("Currently supported saplings from Minecraft and Industrial Craft"),
            Guide.text("Catalysts:", 20, null, true),
            Guide.text("Bone flour."),
            Guide.text("The catalyst is used to accelerate the growth of the tree, its use is not necessary", null, UIColor.RED, null, true),
            Guide.link("To back", "wim")
        ]
    }, {});
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("imp1", {
        ctrl: "basic",
        elements: [
            Guide.title("Builder"),
            Guide.text("This modification is designed to unlock modification slots.")
        ]
    }, {
        ctrl: "basic",
        elements: StringHelper.navigator("desc_main")
    }, {
        preLink: "desc_main",
        nextLink: "imp2"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("imp10", {
        ctrl: "basic",
        elements: [
            Guide.title("Acceleration"),
            Guide.text("Increases the speed of movement when running"),
            Guide.text("Installed in greaves", null, null, true)
        ]
    }, {
        ctrl: "basic",
        elements: StringHelper.navigator("desc_main")
    }, {
        preLink: "imp9",
        nextLink: "imp11"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("imp11", {
        ctrl: "basic",
        elements: [
            Guide.title("Compressed Cargo Space"),
            Guide.text("Provides a storage of items that is always nearby."),
            Guide.text("Increasing the level increases the cargo space capacity"),
            Guide.text("It is installed in the bib", null, null, true)
        ]
    }, {
        ctrl: "basic",
        elements: StringHelper.navigator("desc_main")
    }, {
        preLink: "imp10",
        nextLink: "imp12"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("imp12", {
        ctrl: "basic",
        elements: [
            Guide.title("Submariner"),
            Guide.text("You can't drown yourself"),
            Guide.text("Installed in the helmet", null, null, true)
        ]
    }, {
        ctrl: "basic",
        elements: StringHelper.navigator("desc_main")
    }, {
        preLink: "imp11",
        nextLink: "imp13"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("imp13", {
        ctrl: "basic",
        elements: [
            Guide.title("Integrated jetpack"),
            Guide.text("Well, sometimes you can take content from Industrial Craft"),
            Guide.text("It is installed in the bib", null, null, true)
        ]
    }, {
        ctrl: "basic",
        elements: StringHelper.navigator("desc_main")
    }, {
        preLink: "imp11",
        nextLink: "imp14"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("imp14", {
        ctrl: "basic",
        elements: [
            Guide.title("Anti-gravity field generator"),
            Guide.text("Fly - so fly!"),
            Guide.text("Installed in shoes", null, null, true)
        ]
    }, {
        ctrl: "basic",
        elements: StringHelper.navigator("desc_main")
    }, {
        preLink: "imp13"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("imp2", {
        ctrl: "basic",
        elements: [
            Guide.title("Power"),
            Guide.text("This modification will cause additional damage to the enemy"),
            Guide.text("It is installed in the bib", null, null, true)
        ]
    }, {
        ctrl: "basic",
        elements: StringHelper.navigator("desc_main")
    }, {
        preLink: "imp1",
        nextLink: "imp3"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("imp3", {
        ctrl: "basic",
        elements: [
            Guide.title("Refractoriness"),
            Guide.text("In constant mode, it provides protection from everything that is hot"),
            Guide.text("It is installed in the bib", null, null, true)
        ]
    }, {
        ctrl: "basic",
        elements: StringHelper.navigator("desc_main")
    }, {
        preLink: "imp2",
        nextLink: "imp4"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("imp4", {
        ctrl: "basic",
        elements: [
            Guide.title("Protection from damage"),
            Guide.text("    At the first level it protects against blindness and food poisoning"),
            Guide.text("    At the second level, it neutralizes slowing down, nausea and weakness"),
            Guide.text("    At the last level it protects against poisoning and desiccation"),
            Guide.text("It is installed in the bib", null, null, true)
        ]
    }, {
        ctrl: "basic",
        elements: StringHelper.navigator("desc_main")
    }, {
        preLink: "imp3",
        nextLink: "imp5"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("imp5", {
        ctrl: "basic",
        elements: [
            Guide.title("Power panel"),
            Guide.text("In constant mode provides additional health"),
            Guide.text("It is installed in the bib", null, null, true)
        ]
    }, {
        ctrl: "basic",
        elements: StringHelper.navigator("desc_main")
    }, {
        preLink: "imp4",
        nextLink: "imp6"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("imp6", {
        ctrl: "basic",
        elements: [
            Guide.title("Night vision"),
            Guide.text("Automatically provides perfect visibility in the dark"),
            Guide.text("Installed in the helmet", null, null, true)
        ]
    }, {
        ctrl: "basic",
        elements: StringHelper.navigator("desc_main")
    }, {
        preLink: "imp5",
        nextLink: "imp7"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("imp7", {
        ctrl: "basic",
        elements: [
            Guide.title("Reinforced hull"),
            Guide.text("Absorbs part of the received damage"),
            Guide.text("It is installed in the bib", null, null, true)
        ]
    }, {
        ctrl: "basic",
        elements: StringHelper.navigator("desc_main")
    }, {
        preLink: "imp6",
        nextLink: "imp8"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("imp8", {
        ctrl: "basic",
        elements: [
            Guide.title("Defense module"),
            Guide.text("Deals retaliatory damage to creatures attacking you"),
            Guide.text("Installed in the helmet", null, null, true)
        ]
    }, {
        ctrl: "basic",
        elements: StringHelper.navigator("desc_main")
    }, {
        preLink: "imp7",
        nextLink: "imp9"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("imp9", {
        ctrl: "basic",
        elements: [
            Guide.title("The speed of digging"),
            Guide.text("Automatically activated when blocks are broken"),
            Guide.text("It is installed in the bib", null, null, true)
        ]
    }, {
        ctrl: "basic",
        elements: StringHelper.navigator("desc_main")
    }, {
        preLink: "imp8",
        nextLink: "imp10"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("desc_main", {
        ctrl: "basic",
        elements: [
            Guide.text("All existing modifications of mechanical armor are listed below. They are needed to improve it", null, null, true),
            Guide.link("Builder", "imp1"),
            Guide.link("Power", "imp2"),
            Guide.link("Refractoriness", "imp3"),
            Guide.link("Protection from damage", "imp4"),
            Guide.link("Power panel", "imp5"),
            Guide.link("Night vision", "imp6"),
            Guide.link("Reinforced hull", "imp7"),
            Guide.link("Defense module", "imp8"),
            Guide.link("The speed of digging", "imp9"),
            Guide.link("Acceleration", "imp10"),
            Guide.link("Compressed Cargo Space", "imp11"),
            Guide.link("Submariner", "imp12"),
            Guide.link("Integrated jetpack", "imp13")
        ]
    }, {
        ctrl: "basic",
        elements: [
            Guide.link("Anti-gravity field generator", "imp14")
        ]
    }, {
        preLink: "default",
        nextLink: "imp1"
    });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("adamantite", {
        ctrl: "itemPage",
        items: [ItemID.ingotAdamantite, 0, BlockID.oreAdamantite, 0, BlockID.blockAdamantite, 0],
        elements: StringHelper.navigator("ores_main")
    }, {
        ctrl: "basic",
        elements: StringHelper.oreDesc("strength", "low speed", UIColor.parseColor("#191970"))
    }, { preLink: "ores_main", nextLink: "lead" });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("lavarite", {
        ctrl: "itemPage",
        items: [ItemID.ingotLavarite, 0, BlockID.oreLavarite, 0, BlockID.blockLavarite, 0],
        elements: StringHelper.navigator("ores_main")
    }, {
        ctrl: "basic",
        elements: [
            Guide.text("It is found in the lower world in magma.")
        ]
    }, { preLink: "uranium", nextLink: "leotite" });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("lead", {
        ctrl: "itemPage",
        items: [ItemID.ingotLead, 0, BlockID.oreLead, 0, BlockID.blockLead, 0],
        elements: StringHelper.navigator("ores_main")
    }, {
        ctrl: "basic",
        elements: StringHelper.oreDesc("not rare", "no strengths", UIColor.parseColor("#191970"))
    }, { preLink: "adamantite", nextLink: "malachite" });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("leotite", {
        ctrl: "itemPage",
        items: [ItemID.formationsLeotite, 0, BlockID.oreLeotite, 0, BlockID.blockLeotite, 0],
        elements: StringHelper.navigator("ores_main")
    }, {
        ctrl: "basic",
        elements: [
            Guide.text("A strange mutation of the glowing stone, found in the lower world.")
        ]
    }, { preLink: "lavarite", nextLink: "mionite" });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("ores_main", {
        ctrl: "basic",
        elements: [
            Guide.link("Adamantite", "adamantite"),
            Guide.link("Lead", "lead"),
            Guide.link("Malachite", "malachite"),
            Guide.link("Sapphire", "sapphire"),
            Guide.link("Uranium", "uranium"),
            Guide.link("Lavarite", "lavarite"),
            Guide.link("Leotite", "leotite"),
            Guide.link("Mionite", "mionite")
        ]
    }, {}, { preLink: "default" });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("malachite", {
        ctrl: "itemPage",
        items: [ItemID.ingotMalachite, 0, BlockID.oreMalachite, 0, BlockID.blockMalachite, 0],
        elements: StringHelper.navigator("ores_main")
    }, {
        ctrl: "basic",
        elements: StringHelper.oreDesc("very fast", "not durable")
    }, { preLink: "lead", nextLink: "sapphire" });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("mionite", {
        ctrl: "itemPage",
        items: [ItemID.nuggetMionite, 0, BlockID.oreLeotite, 0, BlockID.blockLeotite, 0],
        elements: StringHelper.navigator("ores_main")
    }, {
        ctrl: "basic",
        elements: [
            Guide.text("You need to search where the edge stone is located")
        ]
    }, { preLink: "leotite" });
});
ModAPI.addAPICallback("GuideAPI", function () {
    pages["muthril"] = {
        preLink: "ores_main",
        left: {
            controller: Ctrl.ITEM_PAGE,
            items: [
                { id: ItemID.ingotMuthril, data: 0 },
                { id: BlockID.oreMuthril, data: 0 },
                { id: BlockID.blockMuthril, data: 0 }
            ],
            elements: [
                { text: StringHelper.toMain, side: 20, color: Lcolor, underline: true, link: "default" }
            ]
        },
        right: {
            controller: Ctrl.BASIC_PAGE,
            elements: [
                { text: StringHelper.usedInCrafts, size: 15, color: Ncolor },
                { text: StringHelper.adv("not rare, relatively durable and efficient"), size: 14, color: UIColor.rgb(25, 25, 112) },
                { text: StringHelper.disAdv("lower speed than malachite"), size: 14, color: UIColor.RED }
            ]
        }
    };
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("sapphire", {
        ctrl: "itemPage",
        items: [ItemID.crystalSapphire, 0, BlockID.oreSapphire, 0, BlockID.blockSapphire, 0],
        elements: StringHelper.navigator("ores_main")
    }, {
        ctrl: "basic",
        elements: StringHelper.oreDesc("the most effective material", "rate")
    }, { preLink: "malachite", nextLink: "uranium" });
});
ModAPI.addAPICallback("GuideAPI", function () {
    Guide.addPage("uranium", {
        ctrl: "itemPage",
        items: [ItemID.ingotUranium, 0, BlockID.oreUranium, 0, BlockID.blockUranium, 0],
        elements: StringHelper.navigator("ores_main")
    }, {
        ctrl: "basic",
        elements: StringHelper.oreDesc("effective, has the highest damage", "rarely comes across")
    }, { preLink: "sapphire" });
});
OresAPI.registerItem("oresModGuideBook", "Guide Book", { name: "guide" }, { ru: "Книга-руководитель" }, { stack: 1 }, {
    colorName: "b",
    dontShowData: true,
    prefix: { standart: true, itemType: "item" },
    other: function () {
        return (GuideAPI) ? "" : "§8Нужен GuideAPI!";
    }
});
OresAPI.registerItem("researchChip", "Research Chip", { name: "researchChip" }, { ru: "Исследовательская Микросхема" }, {}, defaultItemNameOverride("a", "item"));
OresAPI.registerItem("burntChip", "Burnt Chip", { name: "burntChip" }, { ru: "Прожжённая Микросхема" }, { isTech: true }, defaultItemNameOverride("c", "item"));
OresAPI.registerItem("splitterChip", 'Chip "Quantum Splitter"', { name: "splitter" }, { ru: "Микросхема \"Квантовый Расщипитель\"" }, {}, defaultItemNameOverride(5, "item"));
OresAPI.registerItem("quantomDetectorChip", 'Chip "Quantom Detector"', { name: "detector" }, { ru: 'Микросхема "Квантовый Детектор"' }, {}, defaultItemNameOverride(4, "item"));
OresAPI.registerItem("densityControllerChip", 'Chip "Density Controller"', { name: "densityTransformer" }, { ru: "Микросхема \"Контроллер Плотности\"" }, {}, defaultItemNameOverride(3, "item"));
OresAPI.registerItem("matteryDrive", "Drive Quantum Energy", { name: "drive" }, { ru: "Накопитель Квантовой Энергии" }, {}, defaultItemNameOverride(1, "item"));
Callback.addCallback("PostLoaded", function () {
    OresAPI.addShapedRecipe([ItemID.researchChip, 4, 0], ["trt", "rsr", "trt"], ["t", ItemID.ingotLead, -1, "r", 331, 0, "s", 265, 0]);
});
OresAPI.registerItem("Oresmatter", "Matter", { name: "mattery" }, { ru: "Материя" }, {}, defaultItemNameOverride("e", "item"));
OresAPI.registerItem("rebuiltMatter", "Matter", { name: "mattery", data: 1 }, {}, { stack: 1, isTech: true, glint: true }, {
    colorName: "5",
    dontShowData: true,
    prefix: {
        standart: true,
        itemType: "item"
    },
    other: function (item, name) {
        if (item.extra) {
            return "§7item: " + Translation.translate(Item.getName(item.extra.getInt("id"))) /*+ " data: "+ item.extra.getInt("data")*/;
        }
        else {
            var extra = new ItemExtraData();
            extra.putInt("id", 0);
            extra.putInt("data", 0);
            Player.setCarriedItem(item.id, item.count, item.data, extra);
        }
    }
});
OresAPI.registerItem("emptyFlask", "Empty Flask", { name: "flask", data: 1 }, { ru: "Пустая капсула" }, { stack: 8, isTech: true }, defaultItemNameOverride(7, "item"));
OresAPI.registerItem("flaskWithNanites", "Flask With Nanites", { name: "flask", data: 8 }, { ru: "Капсула с Нанитами" }, { stack: 1, isTech: true }, defaultItemNameOverride("b", "item"));
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: ItemID.emptyFlask, count: 8, data: 0 }, ["xxo"], ["x", 20, 0], function (api, f, result) {
        result.data = random(1, 7);
    });
});
OresAPI.registerItem("flaskWithTrainedNanites", "Flask With Trained Nanites", { name: "flask", data: 1 }, { ru: "Капсула С Обученными нанитами" }, { isTech: true, glint: true, stack: 1 }, {
    colorName: "5",
    dontShowData: true,
    prefix: { standart: true, itemType: "item" },
    other: function (item, name) {
        if (!item.extra)
            return name;
        var imp = implantations[item.extra.getString("implantation")];
        return "§7специализация: §" + imp.itemColor + imp.name + "\n";
    }
});
setRequiresIconOverride(ItemID.flaskWithNanites, true);
setRequiresIconOverride(ItemID.flaskWithTrainedNanites, true);
var getRandomFullFlaskTexture = function (data) {
    return fullFlackTexturesData[data][random(0, 5)];
};
Item.registerIconOverrideFunction(ItemID.emptyFlask, function (item) {
    if (item.data > 0) {
        return { name: "flask", meta: item.data };
    }
});
Item.registerIconOverrideFunction(ItemID.flaskWithNanites, function (item) {
    if (item.data > 7) {
        return { name: "flask", meta: item.data };
    }
});
Item.registerIconOverrideFunction(ItemID.flaskWithTrainedNanites, function (item) {
    return { name: "flask", meta: item.data };
});
OresAPI.registerArmor({
    material: "mechanicAdamantite",
    properties: {
        preventDamaging: true,
        durability: 10000000,
        helmet: { armor: 0.5 },
        chestplate: { armor: 0.5 },
        leggings: { armor: 0.5 },
        boots: { armor: 0.5 }
    },
    translations: {
        helmet: { ru: "Механический Адамантитовый Шлем" },
        chestplate: { ru: "Механичесий Адамантитовый Нагрудник" },
        leggings: { ru: "Механические Адамантитовые Поножи" },
        boots: { ru: "Механические Адамантитовые Ботинки" }
    },
    overrideNames: {
        dontShowData: true,
        prefix: { standart: true, itemType: "item" },
        itemsColor: 4,
        other: function (item) {
            var procent = ArmorButtons.currentScreen == "hud_screen" || ArmorButtons.currentScreen == "in_game_play_screen" ?
                "%%%%%%%%" : "%%%%";
            var energy = ChargeItemRegistry.getEnergyStored(item, "Eu");
            var storage = ChargeItemRegistry.getMaxCharge(item.id, "Eu");
            var charge = "§9" + Translation.translate("Charge") + ": §e";
            return charge + (energy / storage * 100) + procent;
        }
    },
    recipes: { prevent: true }
});
OresAPI.registerArmor({
    material: "mechanicSapphire",
    properties: {
        preventDamaging: true,
        durability: 15000000,
        helmet: { armor: 1.5 },
        chestplate: { armor: 1.5 },
        leggings: { armor: 1 },
        boots: { armor: .5 }
    },
    translations: {
        helmet: { ru: "Механический Сапфировый Шлем" },
        chestplate: { ru: "Механичесий Сапфировый Нагрудник" },
        leggings: { ru: "Механические Сапфировые Поножи" },
        boots: { ru: "Механические Сапфировые Ботинки" }
    },
    overrideNames: {
        dontShowData: true,
        prefix: { standart: true, itemType: "item" },
        itemsColor: 1,
        other: function (item) {
            var procent = ArmorButtons.currentScreen == "hud_screen" || ArmorButtons.currentScreen == "in_game_play_screen" ?
                "%%%%%%%%" : "%%%%";
            var energy = ChargeItemRegistry.getEnergyStored(item, "Eu");
            var storage = ChargeItemRegistry.getMaxCharge(item.id, "Eu");
            var charge = "§9" + Translation.translate("Charge") + ": §e";
            return charge + (energy / storage * 100) + procent;
        }
    },
    recipes: { prevent: true }
});
ChargeItemRegistry.registerExtraItem(ItemID.mechanicAdamantiteHelmet, "Eu", 10000000, 2048, 4, "armor", true, false);
ChargeItemRegistry.registerExtraItem(ItemID.mechanicAdamantiteChestplate, "Eu", 10000000, 2048, 4, "armor", true, false);
ChargeItemRegistry.registerExtraItem(ItemID.mechanicAdamantiteLeggings, "Eu", 10000000, 2048, 4, "armor", true, false);
ChargeItemRegistry.registerExtraItem(ItemID.mechanicAdamantiteBoots, "Eu", 10000000, 2048, 4, "armor", true, false);
ChargeItemRegistry.registerExtraItem(ItemID.mechanicSapphireHelmet, "Eu", 15000000, 2048, 4, "armor", true, false);
ChargeItemRegistry.registerExtraItem(ItemID.mechanicSapphireChestplate, "Eu", 15000000, 2048, 4, "armor", true, false);
ChargeItemRegistry.registerExtraItem(ItemID.mechanicSapphireLeggings, "Eu", 15000000, 2048, 4, "armor", true, false);
ChargeItemRegistry.registerExtraItem(ItemID.mechanicSapphireBoots, "Eu", 15000000, 2048, 4, "armor", true, false);
function mechanicArmorRecipeFuncs(api, field, result) {
    for (var i in field) {
        if (isMechanicArmor(field[i].id)) {
            result.extra = field[i].extra;
            result.data = field[i].data;
            break;
        }
    }
}
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: ItemID.mechanicAdamantiteHelmet, count: 1, data: 0 }, ["aha", "lcl", "omg"], ["a", ItemID.ingotLavarite, -1, "h", ItemID.matrixOfHoloSystems, -1, "l", ItemID.opticalLens, -1, "c", ItemID.centralLogicSystem, -1, "o", ItemID.outerProtectivePlate, -1, "m", ItemID.manipulationCable, -1, "g", ItemID.connectingSystems, -1]);
    Recipes.addShaped({ id: ItemID.mechanicAdamantiteChestplate, count: 1, data: 0 }, ["oco", "tot", "sol"], ["o", ItemID.outerProtectivePlate, -1, "c", ItemID.connectingSystems, -1, "t", ItemID.thermoadaptationCoating, -1, "s", ItemID.manipulationCable, -1, "l", ItemID.localLogicSystem, -1]);
    Recipes.addShaped({ id: ItemID.mechanicAdamantiteLeggings, count: 1, data: 0 }, ["mcm", "oto", "lso"], ["m", ItemID.movableElements, -1, "c", ItemID.connectingSystems, -1, "o", ItemID.outerProtectivePlate, -1, "t", ItemID.thermoadaptationCoating, -1, "l", ItemID.localLogicSystem, -1, "s", ItemID.manipulationCable, -1]);
    Recipes.addShaped({ id: ItemID.mechanicAdamantiteBoots, count: 1, data: 0 }, ["oco", "tlo", "oto"], ["o", ItemID.outerProtectivePlate, -1, "c", ItemID.connectingSystems, -1, "t", ItemID.thermoadaptationCoating, -1, "l", ItemID.localLogicSystem, -1]);
    OresAPI.addShapedRecipeWithFunction([ItemID.mechanicSapphireHelmet, 1, 0], ["ama", "lcl", "ohg"], ["a", ItemID.nuggetMionite, -1, "m", ItemID.advancedMatrixOfHoloSystems, -1, "l", ItemID.advancedOpticalLens, -1, "c", ItemID.centralLogicSystem, -1, "o", ItemID.outerProtectivePlate, -1, "h", ItemID.mechanicAdamantiteHelmet, -1, "g", ItemID.connectingSystems, -1], mechanicArmorRecipeFuncs);
    OresAPI.addShapedRecipeWithFunction([ItemID.mechanicSapphireChestplate, 1, 0], ["ccc", "pap", "ppp"], ["p", ItemID.outerProtectivePlate, -1, "a", ItemID.mechanicAdamantiteChestplate, 0, "c", ItemID.advancedLocalLogicSystem, -1], mechanicArmorRecipeFuncs);
    OresAPI.addShapedRecipeWithFunction([ItemID.mechanicSapphireLeggings, 1, 0], ["ppp", "mam", "pcp"], ["p", ItemID.outerProtectivePlate, -1, "m", ItemID.advancedMovableElements, -1, "a", ItemID.mechanicAdamantiteLeggings, -1, "c", ItemID.advancedLocalLogicSystem, -1], mechanicArmorRecipeFuncs);
    OresAPI.addShapedRecipeWithFunction([ItemID.mechanicSapphireBoots, 1, 0], ["cac", "sss", "ppp"], ["p", ItemID.outerProtectivePlate, -1, "a", ItemID.mechanicAdamantiteBoots, -1, "c", ItemID.advancedLocalLogicSystem, -1, "s", ItemID.crystalSapphire, -1], mechanicArmorRecipeFuncs);
});
function getModificationEnergyConsumption(str) {
    return OresAPI.getConfigValue("mechanic_armor.energy_use_by_modfiers." + str);
}
var IMP_DIVER_ENERGY_CONSUMPTION = getModificationEnergyConsumption("Submariner");
var IMP_PROTECTION_ENERGY_CONSUMPTION = getModificationEnergyConsumption("Reinforced_hull");
var IMP_NIGHTVISION_ENERGY_CONSUMPTION = getModificationEnergyConsumption("Night_vision");
var IMP_FIRE_RESIST_ENERGY_CONSUMTPION = getModificationEnergyConsumption("Refractoriness");
var IMP_DAMAGE_PROTECTION_ENERGY_CONSUMPTION = getModificationEnergyConsumption("Protection_from_damage");
var IMP_SHIELD_ENERGY_CONSUMPTION = getModificationEnergyConsumption("Power_panel");
var IMP_INTEGRATED_JETPACK_ENERGY_CONSUMPTION = getModificationEnergyConsumption("Integrated_jetpack");
var IMP_ACCELERATION_ENERGY_CONSUMPTION = getModificationEnergyConsumption("Acceleration");
var IMP_COMPRESSED_SPACE_ENERGY_CONSUMPTION = getModificationEnergyConsumption("Compressed_Cargo_Space");
var IMP_GENERATOR_ENERGY_CONSUMPTION = getModificationEnergyConsumption("gravity_field_generator");
var IMP_PROTECTER_ENERGY_CONSUMPTION = getModificationEnergyConsumption("Defense_module");
var IMP_POWER_ENERGY_CONSUMPTION = getModificationEnergyConsumption("Power");
var IMP_DESTROY_BLOCK_ENERGY_CONSUMPTION = getModificationEnergyConsumption("The_speed_of_digging");
function hurtArmorFuncs(slot, index, player, damage, type) {
    var extra = getExtra(slot);
    var charge = ChargeItemRegistry.getEnergyStored(slot, "Eu");
    if (index == 0) {
        if (type == 9 && charge >= IMP_DIVER_ENERGY_CONSUMPTION && extra.diver) {
            Game.prevent();
            Entity.addEffect(player, PotionEffect.waterBreathing, 0, 3 * 20, true, true);
            cilinder(Native.ParticleType.happyVillager, Entity.getPosition(player), 1);
            charge -= IMP_DIVER_ENERGY_CONSUMPTION;
        }
    }
    if (index == 1) {
        if (type == 2) {
            if (charge >= IMP_PROTECTION_ENERGY_CONSUMPTION && extra.protection) {
                var damageConsume = extra.protection * 10;
                Game.prevent();
                Entity.damageEntity(player, Math.floor(damage - (damage / 100 * damageConsume)));
                cilinder(Native.ParticleType.ink, Entity.getPosition(player), 1);
                charge -= IMP_PROTECTION_ENERGY_CONSUMPTION;
            }
        }
    }
    if (charge - ChargeItemRegistry.getMaxCharge(slot.id, "Eu") != 0) {
        ChargeItemRegistry.setEnergyStored(slot, charge);
    }
    return false;
}
function tickArmorFuncs(i1, accelerationLevel) {
    return function (slot, index, player) {
        var currentTime = World.getThreadTime();
        var time = currentTime % 10 == index;
        var c = Entity.getPosition(player);
        var extra = getExtra(slot);
        var charge = ChargeItemRegistry.getEnergyStored(slot, "Eu");
        switch (index) {
            case 0:
                if (time && extra.nightVision) {
                    if (charge >= IMP_NIGHTVISION_ENERGY_CONSUMPTION && World.getLightLevel(c.x, c.y, c.z) < 11) {
                        Entity.addEffect(player, PotionEffect.nightVision, 0, 250, true, false);
                        charge -= IMP_NIGHTVISION_ENERGY_CONSUMPTION;
                    }
                    else
                        Entity.clearEffect(player, PotionEffect.nightVision);
                }
                break;
            case 1:
                if (currentTime % 600 == 0 && charge >= IMP_FIRE_RESIST_ENERGY_CONSUMTPION && extra.fireResist) {
                    Entity.addEffect(player, PotionEffect.fireResistance, 0, 601, true, true);
                    charge -= IMP_FIRE_RESIST_ENERGY_CONSUMTPION; //раз в 5 минут
                }
                if (charge >= IMP_DAMAGE_PROTECTION_ENERGY_CONSUMPTION && extra.damageProtection) {
                    var lvl = extra.damageProtection;
                    Entity.clearEffect(player, PotionEffect.blindness);
                    Entity.clearEffect(player, PotionEffect.hunger);
                    charge -= IMP_DAMAGE_PROTECTION_ENERGY_CONSUMPTION;
                    if (lvl > 1) {
                        Entity.clearEffect(player, PotionEffect.weakness);
                        Entity.clearEffect(player, PotionEffect.confusion);
                        Entity.clearEffect(player, PotionEffect.movementSlowdown);
                        if (lvl > 2) {
                            Entity.clearEffect(player, PotionEffect.poison);
                            Entity.clearEffect(player, PotionEffect.wither);
                            if (Entity.getHealth(player) < Entity.getMaxHealth(player)) {
                                if (Math.random() < .15) {
                                    //Entity.addEffect(player, PotionEffect.regeneration, 4, 10, true, true);
                                    Entity.healEntity(player, .5);
                                }
                            }
                        }
                    }
                }
                if (charge >= IMP_SHIELD_ENERGY_CONSUMPTION && extra.shield) {
                    Entity.addEffect(player, PotionEffect.healthBoost, extra.shield, 30, true, true);
                    charge -= IMP_SHIELD_ENERGY_CONSUMPTION;
                }
                if (extra.compressedCargoSpace) {
                    if (charge >= IMP_COMPRESSED_SPACE_ENERGY_CONSUMPTION) {
                        //ArmorButtons.enable(player, "compressedCargoSpace");
                        if (CompressedCargoSpace.isOpened)
                            charge -= IMP_COMPRESSED_SPACE_ENERGY_CONSUMPTION;
                    }
                    else {
                        ArmorButtons.disable(player, "compressedCargoSpace");
                    }
                }
                /*if(extra.integratedJetpack){
                    if(charge >= IMP_INTEGRATED_JETPACK_ENERGY_CONSUMPTION){
                        ArmorButtons.enable(player, "jetpack");
                    }else{
                        ArmorButtons.disable(player, "jetpack");
                    }
                }*/
                break;
            case 2:
                if (charge >= IMP_ACCELERATION_ENERGY_CONSUMPTION && extra.acceleration) {
                    //Debug.message(CURRENT_ACCELERATION_TIMER);
                    var velocity = Entity.getVelocity(player);
                    var horizontalVel = Math.sqrt(velocity.x * velocity.x + velocity.z * velocity.z);
                    if (horizontalVel > .13) {
                        if (CURRENT_ACCELERATION_TIMER <= 0) {
                            Entity.addEffect(player, PotionEffect.movementSpeed, accelerationLevel, 30, true, true);
                        }
                        else
                            CURRENT_ACCELERATION_TIMER--;
                        if (i1) {
                            var e = leggingsExtra.protection;
                            if (e && World.getThreadTime() % 80 / 20 == 2) {
                                Entity.addEffect(player, PotionEffect.damageResistance, e.protection - 1, 50, true, true);
                                charge -= IMP_ACCELERATION_ENERGY_CONSUMPTION;
                            }
                        }
                    }
                    else
                        CURRENT_ACCELERATION_TIMER = ACCELERATION_TIMEOUT;
                    ч;
                }
                break;
            case 3:
                if (extra.antigravitation) {
                    if (currentTime % 30 == 0) {
                        var value = false;
                        if (charge >= IMP_GENERATOR_ENERGY_CONSUMPTION) {
                            value = true;
                        }
                        Network.getClientForPlayer(player).send("oresMod.checkAntiGravitation", {
                            value: value
                        });
                    }
                }
                break;
        }
        if (time && charge - ChargeItemRegistry.getMaxCharge(slot.id, "Eu") != 0) {
            ChargeItemRegistry.setEnergyStored(slot, charge);
            return true;
        }
        return false;
    };
}
Armor.registerOnTickListener(ItemID.mechanicAdamantiteHelmet, tickArmorFuncs(false, 1));
Armor.registerOnTickListener(ItemID.mechanicAdamantiteChestplate, tickArmorFuncs(false, 1));
Armor.registerOnTickListener(ItemID.mechanicAdamantiteLeggings, tickArmorFuncs(false, 1));
Armor.registerOnTickListener(ItemID.mechanicAdamantiteBoots, tickArmorFuncs(false, 1));
Armor.registerOnTickListener(ItemID.mechanicSapphireHelmet, tickArmorFuncs(true, 2));
Armor.registerOnTickListener(ItemID.mechanicSapphireChestplate, tickArmorFuncs(true, 2));
Armor.registerOnTickListener(ItemID.mechanicSapphireLeggings, tickArmorFuncs(true, 2));
Armor.registerOnTickListener(ItemID.mechanicSapphireBoots, tickArmorFuncs(true, 2));
Armor.registerOnHurtListener(ItemID.mechanicAdamantiteHelmet, hurtArmorFuncs);
Armor.registerOnHurtListener(ItemID.mechanicAdamantiteChestplate, hurtArmorFuncs);
Armor.registerOnHurtListener(ItemID.mechanicAdamantiteLeggings, hurtArmorFuncs);
Armor.registerOnHurtListener(ItemID.mechanicAdamantiteBoots, hurtArmorFuncs);
Armor.registerOnHurtListener(ItemID.mechanicSapphireHelmet, hurtArmorFuncs);
Armor.registerOnHurtListener(ItemID.mechanicSapphireChestplate, hurtArmorFuncs);
Armor.registerOnHurtListener(ItemID.mechanicSapphireLeggings, hurtArmorFuncs);
Armor.registerOnHurtListener(ItemID.mechanicSapphireBoots, hurtArmorFuncs);
Armor.registerOnTakeOnListener(ItemID.mechanicAdamantiteHelmet, onTakeOnArmor);
Armor.registerOnTakeOnListener(ItemID.mechanicAdamantiteChestplate, onTakeOnArmor);
Armor.registerOnTakeOnListener(ItemID.mechanicAdamantiteLeggings, onTakeOnArmor);
Armor.registerOnTakeOnListener(ItemID.mechanicAdamantiteBoots, onTakeOnArmor);
Armor.registerOnTakeOnListener(ItemID.mechanicSapphireHelmet, onTakeOnArmor);
Armor.registerOnTakeOnListener(ItemID.mechanicSapphireChestplate, onTakeOnArmor);
Armor.registerOnTakeOnListener(ItemID.mechanicSapphireLeggings, onTakeOnArmor);
Armor.registerOnTakeOnListener(ItemID.mechanicSapphireBoots, onTakeOnArmor);
var ACCELERATION_TIMEOUT = 2;
var CURRENT_ACCELERATION_TIMER = 2;
Callback.addCallback("EntityHurt", function (attacker, victim, damage) {
    var client = Network.getClientForPlayer(attacker == Player.get() ? attacker : victim);
    if (client != null) {
        if (victim == Player.get()) {
            var slot = new PlayerActor(victim).getArmor(0);
            if (slot.id == ItemID.mechanicAdamantiteHelmet || slot.id == ItemID.mechanicSapphireHelmet) {
                var extra = getExtra(slot);
                if (ChargeItemRegistry.getEnergyStored(slot, "Eu") >= IMP_PROTECTION_ENERGY_CONSUMPTION &&
                    extra.programPROTECTER) {
                    Network.sendAllClients("oresMod.drawParticleLine", {
                        type: Native.ParticleType.flame,
                        start: Entity.getPosition(victim),
                        end: Entity.getPosition(attacker)
                    });
                    Entity.damageEntity(attacker, 1.5 * extra.programPROTECTER);
                    resetArmor(1, slot, IMP_PROTECTER_ENERGY_CONSUMPTION, victim);
                }
            }
        }
        else if (attacker == Player.get()) {
            var slot = new PlayerActor(attacker).getArmor(1);
            if (slot.id == ItemID.mechanicAdamantiteChestplate || slot.id == ItemID.mechanicSapphireChestplate) {
                var extra = getExtra(slot);
                if (ChargeItemRegistry.getEnergyStored(slot, "Eu") >= IMP_POWER_ENERGY_CONSUMPTION
                    && extra.power) {
                    Entity.damageEntity(victim, Math.floor(damage * (extra.power + 1) / 2));
                    resetArmor(1, slot, IMP_POWER_ENERGY_CONSUMPTION, attacker);
                }
            }
        }
    }
});
var CHECK_DESTROY_BLOCK_START_TIMEOUT = 0;
var LAST_CHESTPLATE_VALIDATION_RESULT = null;
function recheckChestplate() {
    if (LAST_CHESTPLATE_VALIDATION_RESULT == null || Math.random() < 0.08) {
        var slot = new PlayerActor(Player.get()).getArmor(1);
        LAST_CHESTPLATE_VALIDATION_RESULT =
            slot.id > 0 &&
                (slot.id == ItemID.mechanicAdamantiteChestplate ||
                    slot.id == ItemID.mechanicSapphireChestplate);
    }
    return LAST_CHESTPLATE_VALIDATION_RESULT;
}
function checkDestroyBlockStartOrContinue() {
    if (recheckChestplate()) {
        if (!CHECK_DESTROY_BLOCK_START_TIMEOUT) {
            var slot = new PlayerActor(Player.get()).getArmor(1);
            var extra = getExtra(slot);
            if (extra.diggingSpeed && ChargeItemRegistry.getEnergyStored(slot, "Eu") >= IMP_DESTROY_BLOCK_ENERGY_CONSUMPTION) {
                Entity.addEffect(Player.get(), PotionEffect.digSpeed, extra.diggingSpeed - 1, 40, true, true);
                resetArmor(1, slot, IMP_DESTROY_BLOCK_ENERGY_CONSUMPTION);
                LAST_CHESTPLATE_VALIDATION_RESULT = 39; //цифра от балды
            }
        }
    }
}
Callback.addCallback("DestroyBlockStart", function (coords, block) {
    checkDestroyBlockStartOrContinue();
});
Callback.addCallback("DestroyBlockContinue", function () {
    checkDestroyBlockStartOrContinue();
});
Callback.addCallback("LocalTick", function () {
    if (CHECK_DESTROY_BLOCK_START_TIMEOUT > 0) {
        CHECK_DESTROY_BLOCK_START_TIMEOUT--;
    }
});
OresAPI.registerItem("connectingSystems", "Connecting Systems", { name: "connectinsSystems" }, { ru: "Соединительные Системы" }, { stack: 8 }, defaultItemNameOverride("b", "item"));
OresAPI.registerItem("opticalLens", "Optical Lens", { name: "opticalLens" }, { ru: "Оптическая линза" }, { stack: 8 }, defaultItemNameOverride("e", "item"));
OresAPI.registerItem("centralLogicSystem", "Central Logic System", { name: "logicSystem" }, { ru: "Центральная Логическая Система" }, { stack: 8 }, defaultItemNameOverride("b", "item"));
OresAPI.registerItem("localLogicSystem", "Local Logic System", { name: "logicSystem", data: 1 }, { ru: "Локальная Логическая Система" }, { stack: 8 }, defaultItemNameOverride("e", "item"));
OresAPI.registerItem("matrixOfHoloSystems", "Matrix Of Holographics Systems", { name: "matrixOfHoloSystems" }, { ru: "Матрица Голосистем" }, { stack: 8 }, defaultItemNameOverride(5, "item"));
OresAPI.registerItem("manipulationCable", "Manipulation Cable", { name: "manipulationCable" }, { ru: "Манипуляционный кабель" }, { stack: 8 }, defaultItemNameOverride("e", "item"));
OresAPI.registerItem("thermoadaptationCoating", "Thermoadaptation Coating", { name: "thermoadaptationCoating" }, { ru: "Термоадаптивное Покрытие" }, { stack: 8 }, defaultItemNameOverride(4, "item"));
OresAPI.registerItem("outerProtectivePlate", "Outer Protective Plate", { name: "outerProtectivePlate" }, { ru: "Внешняя Защитная Пластина" }, { stack: 8 }, defaultItemNameOverride("c", "item"));
OresAPI.registerItem("movableElements", "Movable Elements", { name: "movableElements" }, { ru: "Подвижные Элементы" }, { stack: 8 }, defaultItemNameOverride(7, "item"));
OresAPI.registerItem("advancedConnectingSystems", "Advanced Connecting Systems", { name: "connectingSystems", data: 1 }, { ru: "Продвинутые Соеденительные Системы" }, { stack: 8 }, defaultItemNameOverride(1, "item"));
OresAPI.registerItem("advancedOpticalLens", "Advanced Optical Lens", { name: "opticalLens", data: 1 }, { ru: "Продвинутая Оптическая Линза" }, { stack: 8 }, defaultItemNameOverride(1, "item"));
OresAPI.registerItem("advancedLocalLogicSystem", "Advanced Local Logic System", { name: "logicSystem", data: 2 }, { ru: "Продвинутая Локальная Логическая Система" }, { stack: 8 }, defaultItemNameOverride("e", "item"));
OresAPI.registerItem("advancedMatrixOfHoloSystems", "Advanced Matrix Of Holo Systems", { name: "matrixOfHoloSystems", data: 1 }, { ru: "Продвинутая Матрица Голосистем" }, { stack: 8 }, defaultItemNameOverride(1, "item"));
OresAPI.registerItem("advancedMovableElements", "Advanced Movable Elements", { name: "movableElements", data: 1 }, { ru: "Продвинутые Подвижные Элементы" }, { stack: 8 }, defaultItemNameOverride("b", "item"));
Callback.addCallback("PostLoaded", function () {
    OresAPI.addShapedRecipe([ItemID.connectingSystems, 1, 0], ["iai", "iri", "iai"], ["a", ItemID.ingotLavarite, -1, "i", ItemID.ingotLead, 0, "r", 331, 0]);
    OresAPI.addShapedRecipe([ItemID.opticalLens, 1, 0], ["rar", "aga", "rar"], ["a", ItemID.formationsLeotite, -1, "r", 331, 0, "g", 102, 0]);
    OresAPI.addShapedRecipe([ItemID.centralLogicSystem, 1, 0], ["asa", "dld", "asa"], ["a", ItemID.ingotAdamantite, -1, "s", ItemID.formationsLeotite, -1, "l", ItemID.localLogicSystem, -1, "d", 57, 0]);
    OresAPI.addShapedRecipe([ItemID.localLogicSystem, 1, 0], ["tat", "srs", "tdt"], ["t", ItemID.ingotLavarite, -1, "a", ItemID.formationsLeotite, -1, "s", ItemID.crystalSapphire, -1, "d", 264, 0, "r", 331, 0]);
    OresAPI.addShapedRecipe([ItemID.matrixOfHoloSystems, 1, 0], ["sas", "rgr", "sas"], ["s", ItemID.formationsLeotite, -1, "r", 331, 0, "a", ItemID.ingotLavarite, 0, "g", 102, 0]);
    OresAPI.addShapedRecipe([ItemID.manipulationCable, 1, 0], ["tst", "ada", "aea"], ["t", ItemID.formationsLeotite, -1, "s", ItemID.crystalSapphire, -1, "d", 264, 0, "a", ItemID.ingotLavarite, -1, "e", 388, 0]);
    OresAPI.addShapedRecipe([ItemID.thermoadaptationCoating, 1, 0], ["ada", "sds", "ada"], ["d", ItemID.ingotLavarite, -1, "s", ItemID.crystalSapphire, -1, "a", ItemID.ingotAdamantite, -1]);
    OresAPI.addShapedRecipe([ItemID.outerProtectivePlate, 1, 0], ["aaa", "did", "aaa"], ["a", ItemID.ingotLavarite, -1, "d", ItemID.formationsLeotite, -1, "i", 42, 0]);
    OresAPI.addShapedRecipe([ItemID.movableElements, 1, 0], ["xix", "iri", "xix"], ["i", 265, 0, "r", 331, 0]);
    OresAPI.addShapedRecipe([ItemID.advancedConnectingSystems, 1, 0], ["sss", "dcd", "sss"], ["d", ItemID.crystalSapphire, -1, "s", ItemID.nuggetMionite, -1, "c", ItemID.connectingSystems, 0]);
    OresAPI.addShapedRecipe([ItemID.advancedOpticalLens, 1, 0], ["rsr", "sgs", "rsr"], ["g", ItemID.opticalLens, 0, "r", 331, 0, "s", ItemID.nuggetMionite, -1]);
    OresAPI.addShapedRecipe([ItemID.advancedLocalLogicSystem, 1, 0], ["srs", "scs", "srs"], ["s", ItemID.nuggetMionite, -1, "r", 152, 0, "c", ItemID.localLogicSystem, 0]);
    OresAPI.addShapedRecipe([ItemID.advancedMatrixOfHoloSystems, 1, 0], ["oso", "oco", "oso"], ["o", 49, 0, "c", ItemID.matrixOfHoloSystems, 0, "s", ItemID.nuggetMionite, -1]);
    OresAPI.addShapedRecipe([ItemID.advancedMovableElements, 1, 0], ["sds", "dcd", "sds"], ["s", ItemID.crystalSapphire, -1, "d", ItemID.nuggetMionite, -1, "c", ItemID.movableElements, 0]);
});
Callback.addCallback("PostLoaded", function () {
    ArmorButtons.registerButton("compressedCargoSpace", {
        type: "button",
        y: 2000,
        scale: 1000 / 32,
        bitmap: "knopka",
        clicker: {
            onClick: function () {
                CompressedCargoSpace.displayWindow();
            }
        }
    }, function () {
        CompressedCargoSpace.onDisplay();
    });
});
var CompressedCargoSpace = {
    containers: {},
    key: null,
    window: new UI.StandartWindow({
        standart: { header: null, inventory: { standart: true }, background: { standart: true } },
        elements: {
            "closeButton": { type: "button", x: 900, y: 10, bitmap: "btn", scale: 4, clicker: { onClick: function () {
                        CompressedCargoSpace.closeWindow();
                    } } }
        }
    }),
    safeGetContainerFor: function (player) {
        if (!this.containers[player]) {
            this.containers[player] = new ItemContainer();
            this.containers[player].setClientContainerTypeName("oresMod.compressedCargoSpaceContainer");
        }
        return this.containers[player];
    },
    getContainerFor: function (player) {
        return this.containers[player];
    },
    onDisplay: function () {
        this.key = new PlayerActor(Player.get()).getArmor(1).extra.getInt("key");
        var level = ArmorExtraData.get(this.key).compressedCargoSpace;
        var elements = this.window.content.elements;
        var index = 0;
        for (var h = 1; h <= level; h++) {
            for (var i = 1; i < 11; i++) {
                elements["slot" + index] = {
                    type: "slot",
                    x: 345 + (55 * i),
                    y: 45 + (55 * h),
                    size: 50,
                };
                index++;
            }
        }
        this.window.content.elements = elements;
    },
    displayWindow: function () {
        Network.sendToServer("oresMod.compressedCargoSpace.open", {});
        Network.sendToServer("oresMod.compressedCargoSpace.fillSlots", {
            key: this.key
        });
    },
    closeWindow: function () {
        Network.sendToServer("oresMod.compressedCargoSpace.close", {
            elements: this.window.getContent().elements,
            key: this.key
        });
    }
};
Callback.addCallback("LevelLeft", function () {
    CompressedCargoSpace.containers = {};
});
ItemContainer.registerScreenFactory("oresMod.compressedCargoSpaceContainer", function () {
    return CompressedCargoSpace.window;
});
Network.addServerPacket("oresMod.compressedCargoSpace.open", function (client) {
    CompressedCargoSpace.safeGetContainerFor(client.getPlayerUid()).openFor(client, "default");
});
Network.addServerPacket("oresMod.compressedCargoSpace.fillSlots", function (client, packet) {
    var extra = ArmorExtraData.get(packet.key);
    var cargo = extra.cargo || {};
    var container = CompressedCargoSpace.containers[client.getPlayerUid()];
    for (var element in cargo) {
        var slot = cargo[element] || null;
        if (slot)
            container.setSlot(element, slot.id, slot.count, slot.data, slot.extra || null);
    }
    container.sendChanges();
});
Network.addServerPacket("oresMod.compressedCargoSpace.close", function (client, packet) {
    var cargo = {};
    var container = CompressedCargoSpace.containers[client.getPlayerUid()];
    for (var element in packet.elements) {
        if (element == "closeButton")
            continue;
        var slot = container.getSlot(element);
        cargo[element] = {
            id: slot.id,
            count: slot.count,
            data: slot.data,
            extra: slot.extra
        };
    }
    ArmorExtraData.data[packet.key].cargo = cargo;
    container.close();
});
/*ModAPI.addAPICallback("ICore", function(api){
    var buttonContent = api.requireGlobal("buttonContent");
    Callback.addCallback("PostLoaded", function(){
        ArmorButtons.registerButton("jetpack", buttonContent.button_fly, function(){
            jetpackArmorKey = Player.getArmorSlot(1).data;
        });
    });
    var jetpackArmorKey = null;
    var jetpackLoop = api.requireGlobal("jetpackLoop");
    const soundEnabled = api.requireGlobal("Config.soundEnabled");
    
    Callback.addCallback("localTick", function(){
        if(ArmorButtons.map.jetpack && (ArmorButtons.currentScreen == "hud_screen" || ArmorButtons.currentScreen == "in_game_play_screen")){
            var playSound = false;
            var energy = ArmorExtraData.getEnergy(jetpackArmorKey).energy;
            if(energy >= 400&&ArmorButtons.container.isElementTouched("jetpack")){
                playSound = true;
                var y = Player.getPosition().y;
                var vel = Player.getVelocity();
                var vy = Math.min(32, 264-y) / 160;
                if(vel.y < 0.67){
                    Player.addVelocity(0, Math.min(vy, 0.67-vel.y), 0);
                }
                ArmorExtraData.setEnergy(jetpackArmorKey, energy-400);
            }
        }
        if(soundEnabled && playSound && !jetpackLoop.isPlaying()){
            jetpackLoop.start();
        }
        if(!playSound && jetpackLoop.isPlaying()){
            jetpackLoop.stop();
        }
    });
});*/
var button_scale = /*OresAPI.getConfigValue("overlay_buttons_scale")*/ 45;
var ArmorButtons = {
    containers: {},
    currentScreen: null,
    isEnabled: false,
    Window: new UI.Window({
        location: {
            x: 1000 - button_scale,
            y: UI.getScreenHeight() / 2 - button_scale * 2,
            width: button_scale,
            height: button_scale * 4
        },
        drawing: [{ type: "background", color: 0 }],
        elements: {}
    }),
    updatesManager: {},
    map: {},
    buttons: {},
    onClick: {},
    getContainerFor: function (clientId) {
        if (!this.containers[clientId]) {
            this.containers[clientId] = container = new ItemContainer();
            container.setClientContainerTypeName("oresMod.armorButonsOverlay");
        }
        return this.containers[clientId];
    },
    registerButton: function (name, button, onClick) {
        this.map[name] = false;
        this.buttons[name] = button;
        this.updatesManager[name] = false;
        if (onClick) {
            this.onClick[name] = onClick;
        }
    },
    enable: function (player, name) {
        Network.getClientForPlayer(player).send("oresMod.armorButtonsOverlayEnableButton", {
            name: name
        });
    },
    disable: function (player, name) {
        Network.getClientForPlayer(player).send("oresMod.armorButtonsOverlayDisableButton", {
            name: name
        });
    },
    show: function () {
        if (!this.isEnabled) {
            this.validate();
            Network.sendToServer("oresMod.showArmorButtonsOverlay", {});
            this.isEnabled = true;
        }
    },
    hide: function () {
        if (this.isEnabled) {
            this.isEnabled = false;
            Network.sendToServer("oresMod.hideArmorButtonsOverlay", {});
            this.drop();
        }
    },
    validate: function () {
        var elements = this.Window.content.elements;
        for (var i in this.map) {
            if (!this.map[i] && elements[i]) {
                delete elements[i];
                continue;
            }
            if (this.map[i] && !elements[i]) {
                elements[i] = this.buttons[i];
                //Debug.m(Object.keys(this.onClick));
                if (this.onClick[i]) {
                    this.onClick[i]();
                }
            }
        }
    },
    drop: function () {
        for (var i in this.map) {
            this.map[i] = false;
        }
    },
    checkSuit: function () {
        var helmet = Player.getArmorSlot(0);
        var chestplate = Player.getArmorSlot(1);
        var leggings = Player.getArmorSlot(2);
        var boots = Player.getArmorSlot(3);
        return (helmet.id == ItemID.mechanicAdamantiteHelmet &&
            chestplate.id == ItemID.mechanicAdamantiteChestplate &&
            leggings.id == ItemID.mechanicAdamantiteLeggings &&
            boots.id == ItemID.mechanicAdamantiteBoots) ||
            (helmet.id == ItemID.mechanicSapphireHelmet &&
                chestplate.id == ItemID.mechanicSapphireChestplate &&
                leggings.id == ItemID.mechanicSapphireLeggings &&
                boots.id == ItemID.mechanicSapphireBoots);
    },
    enableIfActive: function (player, name, extra) {
        if (extra[name])
            this.enable(player, name);
    }
};
ArmorButtons.Window.setAsGameOverlay(true);
ItemContainer.registerScreenFactory("oresMod.armorButonsOverlay", function () {
    return ArmorButtons.Window;
});
Network.addServerPacket("oresMod.showArmorButtonsOverlay", function (client) {
    ArmorButtons.getContainerFor(client.getPlayerUid())
        .openFor(client, "ШОТОИНТЕРЕСНОЕ");
});
Network.addServerPacket("oresMod.hideArmorButtonsOverlay", function (client) {
    ArmorButtons.getContainerFor(client.getPlayerUid()).close();
});
Network.addClientPacket("oresMod.armorButtonsOverlayDisableButton", function (packet) {
    if (ArmorButtons.map[packet.name] === true) { //и так тоже
        ArmorButtons.map[packet.name] = false;
        ArmorButtons.updatesManager[packet.name] = false;
        ArmorButtons.validate();
    }
});
Network.addClientPacket("oresMod.armorButtonsOverlayEnableButton", function (packet) {
    if (ArmorButtons.map[packet.name] === false) { //так надо
        ArmorButtons.map[packet.name] = true;
        if (!ArmorButtons.updatesManager[packet.name]) {
            ArmorButtons.validate();
            ArmorButtons.updatesManager[packet.name] = true;
        }
    }
});
Callback.addCallback("NativeGuiChanged", function (screenName) {
    ArmorButtons.currentScreen = screenName;
    if (screenName == "hud_screen" || screenName == "in_game_play_screen") {
        LAST_CHESTPLATE_VALIDATION_RESULT = null;
        if (ArmorButtons.checkSuit()) {
            ArmorButtons.show();
        }
        else {
            ArmorButtons.hide();
        }
    }
    else {
        ArmorButtons.hide();
    }
});
var mechanicArmorParams = {};
mechanicArmorParams[ItemID.mechanicAdamantiteHelmet] = { slots: 1, lvl: 1, type: 0, slotsCoords: { 1: [500, 170] } };
mechanicArmorParams[ItemID.mechanicAdamantiteChestplate] = { slots: 4, lvl: 1, type: 1, slotsCoords: { 1: [440, 180], 2: [560, 180], 3: [440, 300], 4: [560, 300] } };
mechanicArmorParams[ItemID.mechanicAdamantiteLeggings] = { slots: 2, lvl: 1, type: 2, slotsCoords: { 1: [400, 240], 2: [600, 240] } };
mechanicArmorParams[ItemID.mechanicAdamantiteBoots] = { slots: 2, lvl: 1, type: 3, slotsCoords: { 1: [400, 300], 2: [600, 300] } };
mechanicArmorParams[ItemID.mechanicSapphireHelmet] = { slots: 2, lvl: 2, type: 0, slotsCoords: { 1: [400, 180], 2: [600, 180] } };
mechanicArmorParams[ItemID.mechanicSapphireChestplate] = { slots: 5, lvl: 2, type: 1, slotsCoords: { 1: [440, 180], 2: [560, 180], 3: [440, 300], 4: [560, 300], 5: [500, 180] } };
mechanicArmorParams[ItemID.mechanicSapphireLeggings] = { slots: 3, lvl: 2, type: 2, slotsCoords: { 1: [440, 300], 2: [500, 300], 3: [560, 300] } };
mechanicArmorParams[ItemID.mechanicSapphireBoots] = { slots: 3, lvl: 2, type: 3, slotsCoords: { 1: [440, 180], 2: [500, 300], 3: [560, 180] } };
function getMechanicArmorParams(armorID) {
    /*const keys = Object.keys(mechanicArmorParams);
    const index = keys.map(eval).indexOf(armor);
    if(index != -1)
        return mechanicArmorParams[keys[index]]; */
    return mechanicArmorParams[armorID];
}
function isMechanicArmor(id) {
    /*const keys = Object.keys(mechanicArmorParams);
    return keys.map(eval).indexOf(id) > -1;*/
    return typeof mechanicArmorParams[id] == "object";
}
var ArmorExtraData = {
    data: [],
    energyData: [],
    register: function (params) {
        var obj = {};
        for (var i in params.slotsCoords) {
            obj["slot" + i] = {
                texture: 0,
                key: -1,
                locked: true,
                isEmpty: true,
                slotCoords: params.slotsCoords[i],
                lvl: 0,
            };
        }
        this.data.push(obj);
        return this.data.length - 1;
    },
    registerForItem: function (slot) {
        var extra = new ItemExtraData();
        extra.putInt("key", this.register(getMechanicArmorParams(slot.id)));
        slot.extra = extra;
    },
    registerForActor: function (slot, index, actor) {
        this.registerForItem(slot);
        actor.setArmor(index, slot.id, slot.count, slot.data, slot.extra);
    },
    get: function (key) {
        //Debug.m(ArmorExtraData.data[key]);
        return this.data[key];
    }
};
var implantations = {};
function Implantation(categories, maxLvl, color, itemColor, name, consumption) {
    var obj = {};
    if (!Array.isArray(categories) && typeof categories != "string")
        categories = [categories];
    obj.categories = categories;
    obj.maxLvl = maxLvl;
    obj.color = color;
    obj.itemColor = itemColor;
    obj.name = name;
    obj.key = Object.keys(implantations).length + 1;
    obj.consumption = consumption;
    return obj;
}
Callback.addCallback("PostLoaded", function () {
    implantations.builders = Implantation("all", 1, UIColor.WHITE, 7, StringHelper.t("Builder"), 0);
    implantations.power = Implantation(1, 2, UIColor.RED, 4, StringHelper.t("Power"), 6000);
    implantations.fireResist = Implantation(1, 1, UIColor.parseColor("#DC143C"), "c", StringHelper.t("Refractoriness"));
    implantations.damageProtection = Implantation(1, 3, UIColor.parseColor("#800080"), 5, StringHelper.t("Protection from damage"));
    implantations.shield = Implantation(1, 5, UIColor.RED, "a", StringHelper.t("Power panel"));
    implantations.nightVision = Implantation(0, 1, UIColor.BLUE, 1, StringHelper.t("Night vision"));
    implantations.protection = Implantation(1, 6, UIColor.parseColor("#D3D3D3"), 7, StringHelper.t("Reinforced hull"));
    implantations.programPROTECTER = Implantation(0, 3, UIColor.parseColor("#FFD700"), 3, StringHelper.t("Defense module"));
    implantations.diggingSpeed = Implantation(1, 6, UIColor.parseColor("#A9A9A9"), 8, StringHelper.t("The speed of digging"));
    implantations.acceleration = Implantation(2, 1, UIColor.WHITE, 7, StringHelper.t("Acceleration"));
    implantations.compressedCargoSpace = Implantation(1, 5, UIColor.parseColor("#48D1CC"), "a", StringHelper.t("Compressed Cargo Space"));
    implantations.diver = Implantation(0, 1, UIColor.parseColor("#191970"), "9", StringHelper.t("Submariner"));
    if (IndustrialCraftIsExist) {
        //implantations.integratedJetpack = Implantation(1, 1, UIColor.GREEN, 7, StringHelper.t("Integrated jetpack"));
        //implantations.integratedChargeDevice = Implantation(2, 4, UIColor.WHITE, "e", "Интегрированное зарядное устройство");
    }
    implantations.antigravitation = Implantation(3, 1, UIColor.RED, 5, StringHelper.t("Anti-gravity field generator"));
});
Callback.addCallback("NativeCommand", function (str) {
    if (str == "/caed") {
        Game.prevent();
        ArmorExtraData.data = [];
        Debug.message("ПАЧИСТИЛ");
    }
});
var currentSuit = 0;
var currentFlyMode = false;
var suitTypes = [
    [ItemID.mechanicAdamantiteHelmet,
        ItemID.mechanicAdamantiteChestplate,
        ItemID.mechanicAdamantiteLeggings,
        ItemID.mechanicAdamantiteBoots],
    [ItemID.mechanicSapphireHelmet,
        ItemID.mechanicSapphireChestplate,
        ItemID.mechanicSapphireLeggings,
        ItemID.mechanicSapphireBoots]
];
function checkSuit(player) {
    var actor = new PlayerActor(player);
    var currentSuitType = (actor.getArmor(0).id == ItemID.mechanicAdamantiteHelmet) ?
        suitTypes[0] : suitTypes[1];
    for (var i in currentSuitType) {
        if (actor.getArmor(i).id != currentSuitType[i]) {
            currentSuit = 0;
            if (actor.getGameMode() != 1)
                Player.setFlyingEnabled(false);
            currentFlyMode = false;
            return false;
        }
    }
    return true;
}
function getExtra(slot) {
    return currentSuit ? ArmorExtraData.get(slot.extra.getInt("key")) : {};
}
function resetArmor(index, slot, amount, player) {
    if (!player)
        player = Player.get();
    slot.extra.putInt("energy", ChargeItemRegistry.getEnergyStored(slot, "Eu") - amount);
    new PlayerActor(player).setArmor(index, slot.id, slot.count, slot.data, slot.extra);
}
function onTakeOnArmor(slot, index, player) {
    //Debug.m("§1onEquipArmor произошёл");
    var client = Network.getClientForPlayer(player);
    if (!slot.extra) {
        //Debug.m("§2slot.extra не существует");
        ArmorExtraData.registerForActor(slot, index, new PlayerActor(player));
        //Debug.m("§3ресетнул");
    }
    var data = ArmorExtraData.get(slot.extra.getInt("key"));
    currentSuit = checkSuit(player);
    if (currentSuit) {
        ArmorButtons.enableIfActive(player, "compressedCargoSpace", data);
        //ArmorButtons.enableIfActive(player, "jetpack", data);
    }
    client.send("oresMod.sendArmorExtraData", {
        index: index,
        data: data,
        currentSuit: currentSuit
    });
}
function onTakeOffArmor() {
    currentSuit = false;
}
Network.addClientPacket("oresMod.sendArmorExtraData", function (packet) {
    ArmorExtraData.data[packet.index] = packet.data;
    currentSuit = packet.currentSuit;
});
Network.addClientPacket("oresMod.checkAntiGravitation", function (packet) {
    if (Player.getFlying()) {
        cilinder(Native.ParticleType.portal, c, .5);
        resetArmor(1, new PlayerActor().getArmor(1), IMP_GENERATOR_ENERGY_CONSUMPTION);
    }
    if (packet.value != currentFlyMode) {
        currentFlyMode = package.value;
        Player.setFlyingEnabled(currentFlyMode);
    }
});
//Основа взята из IC2
var MachineRegistry = {
    machineIDs: {},
    isMachine: function (id) {
        return this.machineIDs[id];
    },
    // Machine Base
    registerPrototype: function (id, Prototype) {
        // register ID
        this.machineIDs[id] = true;
        Prototype.id = id;
        Prototype.useNetworkItemContainer = true;
        Prototype.getScreenName = function () { return "main"; };
        ToolAPI.registerBlockMaterial(id, "stone", 1);
        Block.setDestroyTime(id, 3);
        TileEntity.registerPrototype(id, Prototype);
    },
    registerElectricMachine: function (id, Prototype) {
        if (Prototype.defaultValues) {
            Prototype.defaultValues.energy = 0;
            Prototype.defaultValues.meta = 0;
            Prototype.defaultValues.progress = 0;
        }
        else {
            Prototype.defaultValues = {
                energy: 0,
                meta: 0,
                progress: 0
            };
        }
        Prototype.getTier = Prototype.getTier || function () {
            return 1;
        };
        Prototype.getProgress = function () {
            return Math.floor(100 * this.data.progress / 1);
        };
        if (!Prototype.getEnergyStorage) {
            Prototype.getEnergyStorage = function () {
                return 0;
            };
        }
        if (!Prototype.getMaxPacketSize) {
            Prototype.getMaxPacketSize = function (tier) {
                return Math.pow(2, 3 + this.getTier() * 2);
            };
        }
        if (!Prototype.energyReceive) {
            Prototype.energyReceive = MachineRegistry.basicEnergyReceiveFunc;
        }
        this.registerPrototype(id, Prototype);
    },
    registerGenerator: function (id, Prototype) {
        Prototype.canReceiveEnergy = function () {
            return false;
        },
            Prototype.isEnergySource = function () {
                return true;
            },
            Prototype.energyReceive = Prototype.energyReceive || this.basicEnergyReceiveFunc;
        Prototype.energyTick = Prototype.energyTick || this.basicEnergyOutFunc;
        this.registerElectricMachine(id, Prototype);
    },
    registerEUStorage: function (id, Prototype) {
        Prototype.isEnergySource = function () {
            return true;
        },
            Prototype.energyReceive = Prototype.energyReceive || this.basicEnergyReceiveFunc;
        Prototype.energyTick = Prototype.energyTick || this.basicEnergyOutFunc;
        Prototype.isTeleporterCompatible = true;
        this.registerElectricMachine(id, Prototype);
    },
    basicEnergyOutFunc: function (type, src) {
        var output = transferByTier[this.getTier()];
        if (this.data.energy >= output) {
            this.data.energy += src.add(output) - output;
        }
    },
    basicEnergyReceiveFunc: function (type, amount, voltage) {
        var maxVoltage = this.getMaxPacketSize();
        if (voltage > maxVoltage) {
            /*if(voltageEnabled){
                World.explode(this.x + 0.5, this.y + 0.5, this.z + 0.5, 0.5, true);
                this.selfDestroy();
                return 0;
            }*/
            var add = Math.min(maxVoltage, this.getEnergyStorage() - this.data.energy);
        }
        else {
            var add = Math.min(amount, this.getEnergyStorage() - this.data.energy);
        }
        this.data.energy += add;
        return add;
    },
    isValidEUItem: function (id, count, data, energyType) {
        if (!energyType)
            energyType = "Eu";
        var level = container.tileEntity.getTier();
        return ChargeItemRegistry.isValidItem(id, energyType, level);
    },
    isValidEUStorage: function (id, count, data, energyType) {
        if (!energyType)
            energyType = "Eu";
        var level = container.tileEntity.getTier();
        return ChargeItemRegistry.isValidStorage(id, energyType, level);
    }
};
var transferByTier = {
    1: 32,
    2: 256,
    3: 2048,
    4: 8192
};
var MachineRecipeRegistry = {
    recipeData: {},
    registerRecipesFor: function (name, data, validateKeys) {
        if (validateKeys) {
            var newData = {};
            for (var key in data) {
                var newKey = key;
                if (key.split(":").length < 2) {
                    newKey = eval(key);
                }
                newData[newKey] = data[key];
            }
            data = newData;
        }
        this.recipeData[name] = data;
    },
    addRecipeFor: function (name, source, result) {
        this.requireRecipesFor(name, true)[source] = result;
    },
    requireRecipesFor: function (name, createIfNotFound) {
        if (!this.recipeData[name] && createIfNotFound) {
            this.recipeData[name] = {};
        }
        return this.recipeData[name];
    },
    getRecipeResult: function (name, key1, key2) {
        var data = this.requireRecipesFor(name);
        if (data) {
            return data[key1] || data[key1 + ":" + key2];
        }
    }
};
GUI.createObject("Модификатор Брони");
GUI.addElement.slot("armorSlot", { x: 500, y: 240 });
GUI.addElement.slot("slot1", { x: 1100, y: 1100 }, 50);
GUI.addElement.slot("slot2", { x: 1100, y: 1100 }, 50);
GUI.addElement.slot("slot3", { x: 1100, y: 1100 }, 50);
GUI.addElement.slot("slot4", { x: 1100, y: 1100 }, 50);
GUI.addElement.slot("slot5", { x: 1100, y: 1100 }, 50);
GUI.addElement.slot("flaskSlot", { x: 430, y: 80 }, 50, false);
GUI.addDrawableObject.frame({ x: 732, y: 53 }, "classic_frame_input", 240, 400, 3.6);
GUI.addDrawableObject.bitmap("energy_scale_bg", { x: 640, y: 80 }, 3.6);
GUI.addElement.scale("EuScale", { x: 640, y: 80 }, 1, "energy_scale", 3.6);
GUI.addElement.text("logo", { x: 802, y: 63 }, 0, 0, "__console__", { size: 15, color: UIColor.YELLOW });
GUI.addElement.text("isLocked", { x: 742, y: 83 }, 1, 1, "", { size: 15, color: UIColor.parseColor("#8B0000"), shadow: 0.2 });
GUI.addElement.text("imp", { x: 742, y: 103 }, 1, 1, "", { size: 15, color: UIColor.parseColor("#8B0000"), shadow: 0.2 });
GUI.addElement.text("impLvl", { x: 742, y: 123 }, 1, 1, "", { size: 15, color: UIColor.parseColor("#8B0000"), shadow: 0.2 });
GUI.addElement.text("modeShower", { x: 742, y: 223 }, 1, 0, "Простаивает", { size: 15, color: UIColor.parseColor("#8B0000") });
GUI.addElement.text("processModeShower", { x: 742, y: 243 }, 1, 0, "Простаивает", { size: 15, color: UIColor.parseColor("#8B0000") });
GUI.addClicker("slot1", updateStrings("slot1"));
GUI.addClicker("slot2", updateStrings("slot2"));
GUI.addClicker("slot3", updateStrings("slot3"));
GUI.addClicker("slot4", updateStrings("slot4"));
GUI.addClicker("slot5", updateStrings("slot5"));
gui.armorImplantationTable = GUI.importScreen();
function updateStrings(slot) { return { onClick: function (position, container, tileEntity) { UPDATE_NEEDED = slot; } }; }
MachineRegistry.registerElectricMachine(BlockID.armorImplantationTable, {
    defaultValues: {
        energy_consumption: OresAPI.getConfigValue("armor_implantation_table.energy_consumption"),
        work_time: OresAPI.getConfigValue("armor_implantation_table.work_time"),
        active: false
    },
    slots: [],
    lastArmorItem: 0,
    validItems: Object.keys(mechanicArmorParams).map(eval),
    armorDataKey: null,
    armorIndex: null,
    armorType: null,
    getEnergyStorage: function () {
        return OresAPI.getConfigValue("armor_implantation_table.energy_storage");
    },
    getScreenByName: function () {
        return gui.armorImplantationTable;
    },
    canReceiveEnergy: function (side) {
        var getSide = RelativeAPI.getRelativeSide;
        var data = this.blockSource.getBlockData(this.x, this.y, this.z);
        var sides = [getSide(data, 1), getSide(data, 2), getSide(data, 3)];
        for (var i in sides) {
            if (sides[i] == side) {
                return true;
            }
        }
        return false;
    },
    getTier: function () {
        return 4;
    },
    tick: function () {
        this.updateAndRepairValues();
        if (this.processCondition()) {
            if (this.data.progress == 0) {
                this.isValidProcess();
                //if(this.data.active) Debug.warning("ОНО РАБОТАЕТ");
                //this.data.progress += 1/this.data.work_time;
            }
            if (this.data.active)
                this.continueProcessing();
            if (this.data.progress >= 1) {
                this.data.active = false;
                this.data.progress = 0;
                switch (this.data.work_type.mode) {
                    case 0:
                        //Debug.message("§7метод finishBuildingProcess вызван");
                        this.finishBuildingProcess();
                        break;
                    case 1:
                        this.finishUpdatingProcess();
                        break;
                    case 2:
                        //Debug.message("§7метод finishInstallingProcess вызван");
                        this.finishInstallingProcess();
                        break;
                }
                this.flaskSlot.setSlot(this.flaskSlot.id, this.flaskSlot.count - 1, this.flaskSlot.data, this.flaskSlot.extra);
                this.flaskSlot.validate();
            }
        }
        else {
            this.data.active = false;
            this.data.progress = 0;
        }
        this.container.sendChanges();
    },
    finishUpdatingProcess: function () {
        var newData = ArmorExtraData.data[this.armorDataKey];
        newData[this.data.work_type.slot].lvl++;
        newData[this.flaskSlot.extra.getString("implantation")]++;
        newData[this.data.work_type.slot].texture = this.flaskSlot.data;
        ArmorExtraData.data[this.armorDataKey] = newData;
        this.container.clearSlot(this.data.work_type.slot);
        this.container.setSlot(this.data.work_type.slot, ItemID.flaskWithTrainedNanites, 1, this.flaskSlot.data);
    },
    finishInstallingProcess: function () {
        ArmorExtraData.data[this.armorDataKey][this.data.work_type.slot].isEmpty = false;
        ArmorExtraData.data[this.armorDataKey][this.data.work_type.slot].key = this.flaskSlot.extra.getString("implantation");
        ArmorExtraData.data[this.armorDataKey][this.data.work_type.slot].texture = this.flaskSlot.data;
        ArmorExtraData.data[this.armorDataKey][this.data.work_type.slot].lvl = 1;
        ArmorExtraData.data[this.armorDataKey][this.flaskSlot.extra.getString("implantation")] = 1;
        this.container.setSlot(this.data.work_type.slot, ItemID.flaskWithTrainedNanites, 1, this.flaskSlot.data);
        for (var i in ArmorExtraData.data[this.armorDataKey]) {
            Debug.m(ArmorExtraData.data[this.armorDataKey]);
        }
    },
    finishBuildingProcess: function () {
        ArmorExtraData.data[this.armorDataKey][this.data.work_type.slot].locked = false;
    },
    continueProcessing: function () {
        if (this.data.energy >= 6) {
            this.data.progress += 1 / this.data.work_time;
            this.data.energy -= 6;
        }
    },
    processCondition: function () {
        return (this.flaskSlot.id == ItemID.flaskWithTrainedNanites && this.isValidArmor() !== false);
    },
    isValidProcess: function () {
        //try{
        //Debug.message("§bметод isValidProcess был вызван");
        var property = this.flaskSlot.extra.getString("implantation");
        var extra = ArmorExtraData.get(this.armorDataKey);
        var mod = implantations[property];
        if (property == "builders") {
            //Debug.message("§bметод понял, что property == \"builders\"");
            for (var i in this.slots) {
                if (extra[this.slots[i]].locked) {
                    //Debug.message("§bметод нашел нужный слот, ключ: "+this.slots[i]);
                    this.data.work_type = {
                        slot: this.slots[i],
                        mode: 0
                    };
                    this.data.active = true;
                    return;
                }
            }
            //Debug.message("§bметод не нашел ни одного нужного слота");
        }
        Debug.message("§bметод начал перебирать все слоты");
        for (var i in this.slots) {
            Debug.message("§1метод принимает слот " + this.slots[i]);
            if (extra[this.slots[i]].locked) {
                //Debug.message("§cслот оказался заблокированным");
                continue;
            }
            Debug.message("слот не заблокирован");
            var key = extra[this.slots[i]].key;
            if (key == property) {
                Debug.message("§bв слоте есть мод");
                if (extra[this.slots[i]].lvl < mod.maxLvl) {
                    Debug.message("в слоте найден мод, который можно улучшить");
                    this.data.work_type = {
                        slot: this.slots[i],
                        mode: 1
                    };
                    this.data.active = true;
                    return;
                }
                else
                    return false;
            }
            else if (key == -1) {
                Debug.m(mod.categories, mod.categories.indexOf(this.armorType), this.armorType);
                if (mod.categories === "all" ||
                    mod.categories.indexOf(this.armorType) > -1) {
                    Debug.message("этот мод подходит");
                    this.data.work_type = {
                        slot: this.slots[i],
                        mode: 2
                    };
                    this.data.active = true;
                    return;
                }
            }
        }
        /*}catch(e){
            Debug.error("произошла неведомая херота: "+e);
        }*/
    },
    getSlotsObjects: function (params) {
        var obj = {};
        for (var i in params) {
            if (typeof params[i] == "object")
                obj[i] = params[i];
        }
        return obj;
    },
    updateAndRepairValues: function () {
        this.container.setScale("EuScale", this.data.energy / this.getEnergyStorage());
        //let container = this.container.getGuiContent();
        var params;
        //let animations = Object.keys(this.data.anims);
        this.armorSlot = this.container.getSlot("armorSlot");
        this.flaskSlot = this.container.getSlot("flaskSlot");
        var isValid = this.isValidArmor();
        //if(container&&this.armorSlot.id != 0) Debug.m(isValid);
        if (isValid !== false) { //а я немного удивился, когда isValid со значением 0 вернул false
            if (!this.armorSlot.extra) {
                //alert("ha");
                ArmorExtraData.registerForItem(this.armorSlot);
                //this.armorSlot.data = ArmorExtraData.register(mechanicArmorParams[Object.keys(mechanicArmorParams)[this.armorIndex]]);
            }
            this.armorDataKey = this.armorSlot.extra.getInt("key");
            //this.armorDataKey = this.armorSlot.data;
            this.armorType = getMechanicArmorParams(this.armorSlot.id).type;
            params = ArmorExtraData.get(parseInt(this.armorDataKey));
            var JSONParams = Saver.serialize(params);
            //try {
            this.container.sendEvent("update_info_strings", {
                params: JSONParams,
                progress: this.getProgress(),
                updateAll: this.data.work_type ? this.data.work_type.mode : false
            });
            /*}
            catch (понимаю) {
                if (!this.e) {
                    for (var i in params) {
                        Debug.big(params[i]);
                    }
                    this.e = true;
                }
            }*/
        }
        if (this.armorSlot.id != this.lastArmorItem) {
            if (isValid !== false) {
                /*Debug.m(ArmorExtraData.data[this.armorDataKey]);
                Debug.m(ArmorExtraData.data);
                Debug.message(this.armorDataKey);
                Game.message(" ");*/
                this.lastArmorItem = this.validItems[this.armorIndex];
                this.container.sendEvent("display_slots", {
                    anims: this.data.anims,
                    params: JSONParams
                });
                //Debug.m(this.data.anims);
                //Debug.m(this.validItems[this.armorIndex]);
            }
            else {
                this.container.sendEvent("hide_slots", {});
                for (var i = 0; i < 5; i++)
                    this.container.clearSlot("slot" + i);
                this.slots = [];
                this.data.anims = {};
                this.lastArmorItem = this.data.progress = 0;
                this.container.setText("isLocked", " ");
                this.container.setText("imp", " ");
                this.container.setText("impLvl", " ");
                //Debug.error(0);
            }
        }
    },
    isValidArmor: function () {
        this.armorIndex = this.validItems.indexOf(this.armorSlot.id);
        if (this.armorIndex == -1)
            this.armorIndex = false;
        return this.armorIndex;
    },
    /*moveSlot:function(obj, toX, toY, step){
        let element = this.container.getGuiContent().elements[obj];
        
        step *= 10;
        
        const moveX = toX - element.x;
        const moveY = toY - element.y;
        
        let repairX = (element.x > toX)?Math.max:Math.min;
        let repairY = (element.y > toY)?Math.max:Math.min;
        
        let moveDistX = moveX/2;
        let moveDistY = moveY/2;

        for(var i = 0; i < step; i++){
            element.x = repairX(toX, element.x + 1 / moveDistX);
            element.y = repairY(toY, element.y + 1 / moveDistY);
        }
        
        if(element.x == toX&&element.y == toY) delete this.data.anims[obj];
    }*/
    containerEvents: {
        "display_slots_answer": function (packet) {
            this.slots = packet.slots;
            for (var i in packet.updates) {
                this.container.setSlot(packet.updates[i][0], ItemID.flaskWithTrainedNanites, 1, packet.updates[i][1]);
            }
        },
    },
    client: {
        containerEvents: {
            "update_info_strings": function (container, window, content, packet) {
                if (!content)
                    return;
                if (UPDATE_NEEDED != -1) {
                    var params = packet.params[UPDATE_NEEDED];
                    //Debug.warning("хы");
                    try {
                        var condition1 = !params.locked;
                        var condition2 = params.key != -1;
                        var isLockedText = condition1 ? "Разблокирован" : "Заблокирован";
                        var isLockedColor = condition1 ? UIColor.GREEN : UIColor.parseColor("#8B0000");
                        var impText = condition2 ? implantations[params.key].name : "Не установлен";
                        var impColor = condition2 ? implantations[params.key].color : UIColor.parseColor("#8B0000");
                        var impLvlText = condition2 ? params.lvl + "/" + implantations[params.key].maxLvl : "N/А";
                        var impLvlColor = (condition2 && params.lvl < implantations[params.key].maxLvl) ? UIColor.GREEN : UIColor.parseColor("#8B0000");
                        content.elements["isLocked"].text = isLockedText;
                        content.elements["imp"].text = "Мод: " + impText;
                        content.elements["impLvl"].text = "Уровень: " + impLvlText;
                        content.elements["impLvl"].font.color = impLvlColor;
                        content.elements["imp"].font.color = impColor;
                        content.elements["isLocked"].font.color = isLockedColor;
                    }
                    catch (e) {
                        content.elements["isLocked"].text = "Заблокирован";
                        content.elements["imp"].text = "Не установлен";
                        content.elements["impLvl"].text = "Уровень: N/А";
                        content.elements["impLvl"].font.color = UIColor.parseColor("#8B0000");
                        content.elements["imp"].font.color = UIColor.parseColor("#8B0000");
                        content.elements["isLocked"].font.color = UIColor.parseColor("#8B0000");
                    }
                    UPDATE_NEEDED = -1;
                }
                if (packet.progress > 0) {
                    content.elements["modeShower"].text = "Работает  " + packet.progress + "%";
                    content.elements["modeShower"].font.color = UIColor.GREEN;
                    switch (packet.updateAll) {
                        case 0:
                            content.elements["processModeShower"].text = "Конструирование";
                            content.elements["processModeShower"].font.color = UIColor.GREEN;
                            break;
                        case 1:
                            content.elements["processModeShower"].text = "Обновление";
                            content.elements["processModeShower"].font.color = UIColor.parseColor("#008080");
                            break;
                        case 2:
                            content.elements["processModeShower"].text = "Внедрение";
                            content.elements["processModeShower"].font.color = UIColor.parseColor("#800080");
                            break;
                    }
                }
                else {
                    content.elements["modeShower"].text = "Простаивает";
                    content.elements["modeShower"].font.color = UIColor.parseColor("#8B0000");
                    content.elements["processModeShower"].text = "Простаивает";
                    content.elements["processModeShower"].font.color = UIColor.parseColor("#8B0000");
                }
            },
            "display_slots": function (container, window, content, packet) {
                var slots = [];
                var anims = packet.anims;
                var params = packet.params;
                /*function moveSlot(content, obj, toX, toY){
                    let element = content.elements[obj];
                    if(!content || element.x == 1100) return;
                    const step = 200;
                    
                    const moveX = toX - element.x;
                    const moveY = toY - element.y;
                    
                    let repairX = (element.x > toX)?Math.max:Math.min;
                    let repairY = (element.y > toY)?Math.max:Math.min;
                    
                    let moveDistX = moveX/2;
                    let moveDistY = moveY/2;
            
                    for(var i = 0; i < step; i++){
                        content.element[obj].x = repairX(toX, element.x + 1 / moveDistX);
                        content.element[obj].y = repairY(toY, element.y + 1 / moveDistY);
                    }
                    
                    if(element.x != toX&&element.y != toY) moveSlot(content, obj, toX, toY);
                    else delete this.networkData.anims[obj]
                }*/
                var s = [];
                //if(anims == []){
                for (var i in params) {
                    if (content.elements[i]) {
                        slots.push(i);
                        content.elements[i].x = params[i].slotCoords[0];
                        content.elements[i].y = params[i].slotCoords[1];
                        if (params[i].key != -1)
                            s.push([i, params[i].texture]);
                    }
                }
                container.sendEvent("display_slots_answer", {
                    slots: slots,
                    updates: s
                });
                //}else{
                for (var i in anims) {
                    content.elements[i].x = anims[i][0];
                    content.elements[i].y = anims[i][1];
                    //moveSlot(content, i, anims[i][0], anims[i][1]);
                }
                //}
            },
            "hide_slots": function (c, w, content) {
                for (var i = 1; i <= 5; i++) {
                    content.elements["slot" + i].x = 1100;
                    content.elements["slot" + i].y = 1100;
                }
            }
        }
    }
});
EnergyTileRegistry.addEnergyTypeForId(BlockID.armorImplantationTable, EU);
addToRenderGroup(BlockID.armorImplantationTable, "ic-wire");
OresAPI.registerBlock("armorImplantationTable", true, [
    { name: "Armor Implantation Table", texture: [["MBot", 0], ["tableTop", 0], ["tableBack", 0], ["tableFront", 0], ["tableLeft", 0], ["tableRight", 0]], inCreative: true }
], "opaque", [{ ru: "Стол Модифицирования Брони" }], energyNameOverride("b", "machine", 4));
Callback.addCallback("PostLoaded", function () {
    OresAPI.addShapedRecipe([BlockID.armorImplantationTable, 1, 0], ["sts", "drd", "sts"], ["s", ItemID.crystalSapphire, -1, "t", ItemID.ingotLead, -1, "d", 264, 0, "r", 331, 0]);
});
var UPDATE_NEEDED = -1;
GUI.createObject(Translation.translate("Laboratory Block"));
GUI.addDrawableObject.bitmap("research", { x: 533, y: 153 }, 3.6);
GUI.addDrawableObject.bitmap("arrow_bg_bottom", { x: 573, y: 107 }, 2);
GUI.addDrawableObject.bitmap("arrow_bg", { x: 693, y: 191 }, 3.6);
GUI.addDrawableObject.bitmap("background", { x: 662, y: 143 / 2 }, 3.6);
GUI.addElement.slot("chipSlot", { x: 564, y: 56 });
var slots = [
    "burntChipSlot", "splitterChipSlot",
    "quantomDetectorChipSlot", "densityControllerChipSlot",
    "matterDriveChipSlot"
];
for (var i = 1; i < 6; i++) {
    GUI.addElement.slot(slots[i - 1], { x: 810, y: 50 * i + 21 });
}
GUI.addElement.scale("researchScale", { x: 533, y: 153 }, 3, "research_full", 3.6);
GUI.addElement.scale("energyScale", { x: 662 + 3.6 * 4, y: 143 / 2 }, 0, "scale", 3.6);
if (TIPS) {
    GUI.addDrawableObject.frame({ x: 336, y: 343 }, "classic_frame_input", 630, 100, 3.6);
    GUI.addDrawableObject.text("__DEBUG console__", { x: ((630 + 336) / 2) + 70, y: 360 }, { size: 14, color: UIColor.WHITE });
    GUI.addDrawableObject.text("Состояние:", { x: 340, y: 383 }, { size: 14, color: UIColor.WHITE });
    GUI.addElement.text("chipListener", { x: 350, y: 410 }, 300, 20, StringHelper.t("There should be a research chip in the slot on top"), { color: UIColor.RED, size: 15 });
    GUI.addElement.text("mode", { x: ((630 + 336) / 2) + 70, y: 371 }, 0, 0, StringHelper.t("Idles"), { color: UIColor.YELLOW, size: 14 });
}
gui.laboratory = GUI.importScreen();
OresAPI.registerBlock("labBlock", true, [
    {
        name: "Laboratory Block",
        texture: [["MBot", 0], ["labTop", 0], ["MBot", 0], ["labFront", 0], ["MBot", 0], ["MBot", 0]],
        inCreative: true
    }
], "opaque", [{ ru: "Лабораторный Блок" }], energyNameOverride(4, "machine", 3));
Callback.addCallback("PostLoaded", function () {
    OresAPI.addShapedRecipe([BlockID.labBlock, 1, 0], ["sgs", "iri", "rdr"], ["s", ItemID.crystalSapphire, -1, "d", 54, 0, "i", 42, 0, "r", 152, 0, "g", 20, 0]);
});
var labItems = [ItemID.splitterChip, ItemID.quantomDetectorChip, ItemID.densityControllerChip, ItemID.matteryDrive];
function tryResearch() {
    if (Math.random() < 0.06) {
        return labItems[random(0, labItems.length - 1)];
    }
    return ItemID.burntChip;
}
MachineRegistry.registerElectricMachine(BlockID.labBlock, {
    defaultValues: {
        work_time: OresAPI.getConfigValue("laboratory.work_time"),
        consumption: OresAPI.getConfigValue("laboratory.energy_consumption")
    },
    getTier: function () {
        return OresAPI.getConfigValue("laboratory.tier");
    },
    canReceiveEnergy: function (side) {
        var getSide = RelativeAPI.getRelativeSide;
        var data = this.blockSource.getBlockData(this.x, this.y, this.z);
        var sides = [getSide(data, 1), getSide(data, 2), getSide(data, 3), 0];
        for (var i in sides) {
            if (sides[i] == side) {
                return true;
            }
        }
        return false;
    },
    client: {
        containerEvents: {
            updateTips_laboratory: function (container, window, content, data) {
                if (TIPS && content != null) {
                    if (data.source == 0) {
                        content.elements["chipListener"].text = StringHelper.t("There should be a research chip in the slot on top");
                        content.elements["chipListener"].font = { color: UIColor.RED, size: 15 };
                        content.elements["mode"].text = StringHelper.t("Idles");
                        content.elements["mode"].font.color = UIColor.YELLOW;
                    }
                    else if (data.source == ItemID.researchChip && data.energy >= data.consumption) {
                        content.elements["chipListener"].text = "";
                        content.elements["mode"].text = StringHelper.t("Works") + " " + data.progress + "%";
                        content.elements["mode"].font.color = UIColor.GREEN;
                    }
                    else if (data.source == ItemID.researchChip && data.energy < data.consumption) {
                        content.elements["chipListener"].text = "";
                        content.elements["mode"].text = StringHelper.t("No power");
                        content.elements["mode"].font.color = UIColor.RED;
                    }
                    else {
                        content.elements["chipListener"].text = StringHelper.t("The slot on top is not a research chip");
                        content.elements["chipListener"].font = { color: UIColor.YELLOW, size: 15 };
                        content.elements["mode"].text = StringHelper.t("Idles");
                        content.elements["mode"].font.color = UIColor.YELLOW;
                    }
                }
            }
        }
    },
    updateValues: function () {
        this.source = this.container.getSlot("chipSlot");
        this.splitter = this.container.getSlot("splitterChipSlot");
        this.quantomDetector = this.container.getSlot("quantomDetectorChipSlot");
        this.densityController = this.container.getSlot("densityControllerChipSlot");
        this.matterDrive = this.container.getSlot("matterDriveChipSlot");
        this.burnt = this.container.getSlot("burntChipSlot");
        this.container.sendEvent("updateTips_laboratory", {
            source: this.source.id,
            energy: this.data.energy,
            consumption: this.data.consumption,
            progress: this.getProgress()
        });
        this.container.setScale("energyScale", this.data.energy / this.getEnergyStorage());
        this.container.setScale("researchScale", this.data.progress);
    },
    condition: function () {
        return (this.source.id == ItemID.researchChip && this.data.energy >= this.data.consumption);
    },
    tick: function () {
        this.updateValues();
        if (this.condition()) {
            this.data.energy -= this.data.consumption;
            this.data.progress += 1 / this.data.work_time;
            if (this.data.progress >= 1) {
                this.data.progress = 0;
                var result = tryResearch(), slot = this.selectSlot(result);
                this[slot].setSlot(result, this[slot].count + 1, 0);
                this.source.setSlot(this.source.id, this.source.count - 1, this.source.data);
                this.source.validate();
            }
        }
        else {
            this.data.progress = 0;
        }
        this.container.sendChanges();
    },
    selectSlot: function (id) {
        switch (id) {
            case ItemID.splitterChip:
                return "splitter";
                break;
            case ItemID.quantomDetectorChip:
                return "quantomDetector";
                break;
            case ItemID.densityControllerChip:
                return "densityController";
                break;
            case ItemID.matteryDrive:
                return "matterDrive";
                break;
            case ItemID.burntChip:
                return "burnt";
                break;
        }
    },
    getScreenByName: function () {
        return gui.laboratory;
    },
    getEnergyStorage: function () {
        return OresAPI.getConfigValue("laboratory.energy_storage");
    }
});
addToRenderGroup(BlockID.labBlock, "ic-wire");
EnergyTileRegistry.addEnergyTypeForId(BlockID.labBlock, EU);
GUI.createObject(Translation.translate("Matter Reenactor"));
GUI.addDrawableObject.bitmap("arrow_bg", { x: 533, y: 153 }, 3.2);
GUI.addDrawableObject.bitmap("background", { x: 523, y: 220 }, 3.2);
GUI.addElement.scale("processScale", { x: 533, y: 153 }, 0, "arrow_scale", 3.2);
GUI.addElement.slot("matterySlot", { x: 450, y: 151 }, 50);
GUI.addElement.slot("itemSlot", { x: 534, y: 80 }, 50);
GUI.addElement.slot("outSlot", { x: 632, y: 151 }, 50);
GUI.addElement.scale("energyScale", { x: 523 + 3.2 * 4, y: 220 }, 0, "scale", 3.2);
if (TIPS) {
    GUI.addDrawableObject.frame({ x: 336, y: 303 }, "classic_frame_input", 630, 120, 3.6);
    GUI.addDrawableObject.text("__DEBUG console__", { x: ((630 + 336) / 2) + 70, y: 320 }, { size: 14, color: UIColor.WHITE });
    GUI.addDrawableObject.text("Состояние:", { x: 350, y: 343 }, { size: 14, color: UIColor.WHITE });
    GUI.addElement.text("mode", { x: ((630 + 336) / 2) + 70, y: 331 }, 1, 1, StringHelper.t("Idles"), { color: UIColor.YELLOW, size: 14 });
    GUI.addElement.text("topSlot", { x: 350, y: 370 }, 1, 1, StringHelper.t("The slot must have an item on top"), { color: UIColor.RED, size: 14 });
    GUI.addElement.text("leftSlot", { x: 350, y: 395 }, 1, 1, StringHelper.t("The slot on the left should contain matter"), { color: UIColor.RED, size: 14 });
}
gui.reenactor = GUI.importScreen();
MachineRegistry.registerElectricMachine(BlockID.matterReenactor, {
    defaultValues: {
        work_time: OresAPI.getConfigValue("matter_reenactor.work_time"),
        consumption: OresAPI.getConfigValue("matter_reenactor.energy_consumption")
    },
    getScreenByName: function () {
        return gui.reenactor;
    },
    getEnergyStorage: function () {
        return OresAPI.getConfigValue("matter_reenactor.energy_storage");
    },
    getTier: function () {
        return OresAPI.getConfigValue("matter_reenactor.tier");
    },
    canReceiveEnergy: function (side) {
        return side != RelativeAPI.getRelativeSide(this.blockSource.getBlockData(this.x, this.y, this.z), 0);
    },
    tick: function () {
        var matter = this.container.getSlot("matterySlot");
        var item = this.container.getSlot("itemSlot");
        var result = this.container.getSlot("outSlot");
        if (TIPS) {
            this.container.sendEvent("update_tipe_reenactor", {
                matterId: matter.id,
                itemId: item.id,
                progress: this.getProgress(),
                energy: this.data.energy,
                consumption: this.data.consumption
            });
        }
        this.container.setScale("energyScale", this.data.energy / this.getEnergyStorage());
        this.container.setScale("processScale", this.data.progress);
        if (matter.id == ItemID.Oresmatter && item.id != ItemID.Oresmatter && item.id != ItemID.rebuiltMatter && item.id > 0) {
            if (this.data.energy >= this.data.consumption) {
                this.data.energy -= this.data.consumption;
                this.data.progress += 1 / this.data.work_time;
            }
            if (this.data.progress >= 1) {
                result.setSlot(ItemID.rebuiltMatter, result.count + 1, 0);
                result.extra = new ItemExtraData();
                result.extra.putInt("id", item.id);
                result.extra.putInt("data", item.data);
                item.setSlot(item.id, item.count - 1, item.data);
                matter.setSlot(matter.id, matter.count - 1, matter.data);
                item.validate();
                matter.validate();
                this.data.progress = 0;
            }
        }
        else {
            this.data.progress = 0;
        }
        this.container.sendChanges();
    },
    client: {
        containerEvents: {
            "update_tipe_reenactor": function (container, window, content, packet) {
                if (!content)
                    return;
                if (packet.matterId > 0) {
                    if (packet.matterId != ItemID.Oresmatter) {
                        content.elements["leftSlot"].text = StringHelper.t("But it is not matter._.");
                        content.elements["leftSlot"].font.color = UIColor.YELLOW;
                    }
                    else {
                        content.elements["leftSlot"].text = "";
                    }
                }
                else {
                    content.elements["leftSlot"].text = StringHelper.t("The slot on the left should contain matter");
                    content.elements["leftSlot"].font.color = UIColor.RED;
                }
                if (packet.itemId > 0) {
                    if (packet.itemId == ItemID.Oresmatter || packet.itemId == ItemID.rebuiltMatter) {
                        content.elements["topSlot"].text = StringHelper.t("No matter!!!");
                        content.elements["topSlot"].font.color = UIColor.YELLOW;
                    }
                    else {
                        content.elements["topSlot"].text = "";
                    }
                }
                else {
                    content.elements["topSlot"].text = StringHelper.t("The slot must have an item on top");
                    content.elements["topSlot"].font.color = UIColor.RED;
                }
                if (packet.matterId == ItemID.Oresmatter && (packet.itemId > 0 && (packet.itemId != ItemID.Oresmatter && packet.itemId != ItemID.rebuiltMatter)) & packet.energy >= packet.consumption) {
                    content.elements["mode"].text = StringHelper.t("Works") + " " + packet.progress + "%";
                    content.elements["mode"].font.color = UIColor.GREEN;
                }
                else if (packet.matterId == ItemID.Oresmatter && (packet.itemId > 0 && (packet.itemId != ItemID.Oresmatter && packet.itemId != ItemID.rebuiltMatter)) && packet.energy < packet.consumption) {
                    content.elements["mode"].text = StringHelper.t("No power");
                    content.elements["mode"].font.color = UIColor.RED;
                }
                else {
                    content.elements["mode"].text = StringHelper.t("Idles");
                    content.elements["mode"].font.color = UIColor.YELLOW;
                }
            }
        }
    }
});
addToRenderGroup(BlockID.matterReenactor, "ic-wire");
EnergyTileRegistry.addEnergyTypeForId(BlockID.matterReenactor, EU);
OresAPI.registerBlock("matterReenactor", true, [
    {
        name: "Matter Reenactor",
        texture: [["MBot", 0], ["MBot", 0], ["MBot", 0], ["reenactorFront", 0], ["MBot", 0], ["MBot", 0]],
        inCreative: true
    }
], "opaque", [{ ru: "Реконструктор Материи" }], energyNameOverride("a", "machine", 4));
Callback.addCallback("PostLoaded", function () {
    OresAPI.addShapedRecipe([BlockID.matterReenactor, 1, 0], ["tdt", "rcr", "tst"], ["t", ItemID.ingotLead, -1, "d", ItemID.quantomDetectorChip, 0, "r", 331, 0, "c", ItemID.splitterChip, 0, "s", ItemID.crystalSapphire, -1]);
});
OresAPI.registerBlock("molecularConverter", true, [
    {
        name: "Molecular Converter",
        texture: [["MBot", 0], ["MBot", 0], ["MBot", 0], ["converterFront", 0], ["MBot", 0], ["MBot", 0]],
        inCreative: true
    }
], "opaque", [{ ru: "Молекулярный Преобразователь" }], energyNameOverride("b", "machine", 4));
Callback.addCallback("PostLoaded", function () {
    OresAPI.addShapedRecipe([BlockID.molecularConverter, 1, 0], ["tst", "rcr", "tdt"], ["t", ItemID.ingotLead, -1, "s", ItemID.crystalSapphire, -1, "r", 331, 0, "c", ItemID.densityControllerChip, -1, "d", 264, 0]);
});
GUI.createObject(Translation.translate("Molecular Converter"));
GUI.addDrawableObject.bitmap("arrow_bg", { x: 533, y: 153 }, 3.2);
GUI.addDrawableObject.bitmap("background", { x: 523, y: 220 }, 3.2);
GUI.addElement.scale("processScale", { x: 533, y: 153 }, 0, "arrow_scale", 3.2);
GUI.addElement.slot("matterSlot", { x: 450, y: 151 }, 50);
GUI.addElement.slot("rebuiltMatter", { x: 534, y: 80 }, 50);
GUI.addElement.slot("outSlot", { x: 632, y: 151 }, 50);
GUI.addElement.scale("energyScale", { x: 523 + 3.2 * 4, y: 220 }, 0, "scale", 3.2);
if (TIPS) {
    GUI.addDrawableObject.frame({ x: 336, y: 303 }, "classic_frame_input", 630, 100, 3.6);
    GUI.addDrawableObject.text("__DEBUG console__", { x: 503, y: 320 }, { size: 14, color: UIColor.WHITE });
    GUI.addElement.text("mode", { x: ((630 + 336) / 2) + 70, y: 331 }, 1, 1, StringHelper.t("Idles"), { color: UIColor.YELLOW, size: 14 });
    GUI.addElement.text("topSlot", { x: 350, y: 350 }, 1, 1, StringHelper.t("In the slot above there should be reconstructed matter"), { color: UIColor.RED, size: 14 });
    GUI.addElement.text("leftSlot", { x: 350, y: 375 }, 1, 1, StringHelper.t("The slot on the left should contain matter"), { color: UIColor.RED, size: 14 });
}
gui.converter = GUI.importScreen();
MachineRegistry.registerElectricMachine(BlockID.molecularConverter, {
    defaultValues: {
        work_time: OresAPI.getConfigValue("molecular_converter.work_time"),
        energy_consumption: OresAPI.getConfigValue("molecular_converter.energy_consumption")
    },
    updateValues: function () {
        this.matterSlot = this.container.getSlot("matterSlot");
        this.result = this.container.getSlot("outSlot");
        this.itemSlot = this.container.getSlot("rebuiltMatter");
        this.container.setScale("processScale", this.data.progress);
        this.container.setScale("energyScale", this.data.energy / this.getEnergyStorage());
        if (TIPS) {
            this.container.sendEvent("update_tips_converter", {
                itemSlotId: this.itemSlot.id,
                matterSlotId: this.matterSlot.id,
                condition: this.condition(),
                progress: this.getProgress(),
                energy: this.data.energy
            });
        }
    },
    condition: function () {
        if ((this.itemSlot.id == ItemID.rebuiltMatter && this.matterSlot.id == ItemID.Oresmatter) &&
            (this.result.id == 0 || (this.result.id == this.itemSlot.extra.getInt("id") && result.data == itemSlot.extra.getInt("data")) && result.count + 1 <= Item.getMaxStack(result.id)))
            return true;
    },
    tick: function () {
        this.updateValues();
        if (this.condition()) {
            if (this.data.energy >= this.data.energy_consumption) {
                this.data.energy -= this.data.energy_consumption;
                this.data.progress += 1 / this.data.work_time;
            }
            if (this.data.progress >= 1) {
                this.result.setSlot(this.itemSlot.extra.getInt("id"), this.result.count + random(64, 120), this.itemSlot.extra.getInt("data"));
                this.matterSlot.setSlot(this.matterSlot.id, this.matterSlot.count - 1, this.matterSlot.data);
                this.itemSlot.setSlot(this.itemSlot.id, this.itemSlot.count - 1, this.itemSlot.data);
                this.matterSlot.validate();
                this.itemSlot.validate();
                this.data.progress = 0;
            }
        }
        else {
            this.data.progress = 0;
        }
        this.container.sendChanges();
    },
    client: {
        containerEvents: {
            "update_tips_converter": function (container, window, content, packet) {
                if (!content)
                    return;
                if (packet.itemSlotId > 0) {
                    if (packet.itemSlotId == ItemID.rebuiltMatter) {
                        content.elements["topSlot"].text = "";
                    }
                    else {
                        content.elements["topSlot"].text = "В слоте сверху не реконструированная материя";
                        content.elements["topSlot"].font.color = UIColor.YELLOW;
                    }
                }
                else {
                    content.elements["topSlot"].text = "В слоте сверху должна быть реконструированная материя";
                    content.elements["topSlot"].font.color = UIColor.RED;
                }
                if (packet.matterSlotId > 0) {
                    if (packet.matterSlotId == ItemID.Oresmatter) {
                        content.elements["leftSlot"].text = "";
                    }
                    else {
                        content.elements["leftSlot"].text = "В слоте слева не материя";
                        content.elements["leftSlot"].font.color = UIColor.YELLOW;
                    }
                }
                else {
                    content.elements["leftSlot"].text = "В слоте слева должна быть материя";
                    content.elements["leftSlot"].font.color = UIColor.RED;
                }
                if (packet.condition) {
                    if (packet.energy >= MolecularConverterConfig.energyConsumption) {
                        content.elements["mode"].text = "Работает " + packet.progress + "%";
                        content.elements["mode"].font.color = UIColor.GREEN;
                    }
                    else {
                        content.elements["mode"].text = "Нет энергии";
                        content.elements["mode"].font.color = UIColor.RED;
                    }
                }
                else {
                    content.elements["mode"].text = "Простаивает";
                    content.elements["mode"].font.color = UIColor.YELLOW;
                }
            }
        }
    },
    getEnergyStorage: function () {
        return OresAPI.getConfigValue("molecular_converter.energy_storage");
    },
    canReceiveEnergy: function (side) {
        return side != RelativeAPI.getRelativeSide(this.blockSource.getBlockData(this.x, this.y, this.z), 0);
    },
    getTier: function () {
        return OresAPI.getConfigValue("molecular_converter.tier");
    },
    getScreenByName: function () { return gui.converter; }
});
addToRenderGroup(BlockID.molecularConverter, "ic-wire");
EnergyTileRegistry.addEnergyTypeForId(BlockID.molecularConverter, EU);
OresAPI.registerBlock("molecularGenerator", true, [
    {
        name: "Molecular Generator",
        texture: [["MBot", 0], ["sealantTop", 0], ["MBot", 0], ["MGfront", 0], ["MBot", 0], ["MBot", 0]],
        inCreative: true
    }
], "opaque", [{ ru: "Молекулярный Генератор" }], energyNameOverride(null, "machine§f", 2));
Callback.addCallback("PostLoaded", function () {
    OresAPI.addShapedRecipe([BlockID.molecularGenerator, 1, 0], ["tdt", "rcr", "tst"], ["t", ItemID.ingotLead, -1, "d", ItemID.matteryDrive, 0, "r", 331, 0, "c", ItemID.splitterChip, 0, "s", ItemID.crystalSapphire, -1]);
});
var itemsPrice = {
    commonGroup: { items: [1, 2, 3, 4, 5, 6, 12, 18, 21, 33, 37, 38, 39, 40, 44, 45, 47, 50, 61, 65, 66, 67, 69, 70, 72, 77, 79, 80, 96, 261, 262, 263, 268, 269, 270, 271, 287, 288, ItemID.ingotMalachite], price: [30, 70] },
    uncommonGroup: { items: [14, 15, 16, 17, 20, 22, 23, 24, 27, 28, 29, 35, 48, 54, 73, 76, 81, 82, 85, 86, 87, 93, 98, 99, 100, 101, 102, 123, 256, 257, 258, 259, 260, 267, ItemID.ingotLead, BlockID.blockMalachite], price: [50, 70] },
    rateGroup: { items: [19, 25, 41, 42, 46, 52, 56, 88, 89, 91, 121, 265, 266, 283, 284, 285, 286, 298, 299, 300, 301, BlockID.blockLead], price: [80, 100] },
    insaneGroup: { items: [49, 57, 120, 129, 130, 133, 264, 276, 277, 278, 279, 289, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, ItemID.burntChip, ItemID.ingotAdamantite, ItemID.ingotUranium, ItemID.crystalSapphire, ItemID.ingotLavarite, ItemID.formationsLeotite], price: [135, 245] },
    ultimateGroup: { items: [122, 116, 138, BlockID.blockAdamantite, BlockID.blockUranium, BlockID.blockSapphire, BlockID.blockLavarite, BlockID.blockLeotite], price: [500, 800] },
    groupX: { items: [ItemID.nuggetMionite], price: [810, 1040] },
    groupY: { items: [BlockID.blockMionite], price: [2000, 5000] }
};
ModAPI.addAPICallback("ICore", function () {
    itemsPrice.commonGroup.items.push(ItemID.coil);
    itemsPrice.uncommonGroup.items.push(BlockID.machineBlockBasic, ItemID.circuitBasic, ItemID.electricMotor, ItemID.powerUnit, ItemID.powerUnitSmall);
    itemsPrice.insaneGroup.items.push(BlockID.machineBlockAdvanced, ItemID.upgradeOverclocker, ItemID.upgradeTransformer, ItemID.upgradeEnergyStorage, ItemID.upgradeRedstone, ItemID.upgradeEjector, ItemID.upgradePulling, ItemID.upgradeFluidEjector, ItemID.upgradeFluidPulling);
    itemsPrice.rateGroup.items.push(BlockID.reinforcedStone, BlockID.reinforcedGlass, ItemID.circuitAdvanced, ItemID.storageBattery, ItemID.storageAdvBattery, ItemID.storageCrystal, ItemID.storageLapotronCrystal);
    itemsPrice.ultimateGroup.items.push(ItemID.iridiumChunk, ItemID.plateReinforcedIridium);
});
var slotCount = 1;
GUI.createObject(Translation.translate("Molecular Generator"));
GUI.addDrawableObject.bitmap("moleuclar_background", { x: 543, y: 240 }, 3.2);
GUI.addElement.scale("molecularScale", { x: 543 + 3.2 * 4, y: 240 }, 0, "molecularScale", 3.2);
GUI.addElement.text("molecularText", { x: 543, y: 291 }, 1, 1, "0/10000 QE", { color: UIColor.parseColor("#00FFFF"), shadow: 0.6 });
for (var w = 0; w < 3; w++) {
    for (var i = 1; i < 11; i++) {
        GUI.addElement.slot("slot" + slotCount, { x: 300 + (60 * i), y: 1 + (60 * (w + 1)) }, 55);
        slotCount++;
    }
}
if (TIPS) {
    GUI.addDrawableObject.frame({ x: 336, y: 323 }, "classic_frame_input", 630, 100, 3.6);
    GUI.addDrawableObject.text("__DEBUG console__", { x: ((630 + 336) / 2) + 70, y: 340 }, { size: 14, color: UIColor.WHITE });
    GUI.addDrawableObject.text(StringHelper.t("Condition") + ":", { x: 340, y: 373 }, { size: 14, color: UIColor.WHITE });
    GUI.addElement.text("input", { x: ((630 + 336) / 2) + 70, y: 361 }, 0, 0, StringHelper.t("Generation") + ": 0QE", { color: UIColor.YELLOW, size: 14 });
}
gui.MG = GUI.importScreen();
MachineRegistry.registerGenerator(BlockID.molecularGenerator, {
    defaultValues: {
        power: true
    },
    redstone: function (params) {
        this.data.power = !params.power;
    },
    getEnergyStorage: function () {
        return OresAPI.getConfigValue("molecular_generator.energy_storage");
    },
    getInput: function (slot) {
        for (var i in itemsPrice) {
            for (var d in itemsPrice[i].items) {
                if (slot.id == itemsPrice[i].items[d]) {
                    return random(itemsPrice[i].price[0], itemsPrice[i].price[1]);
                }
            }
        }
        this.input = random(2, 20);
        return this.input;
    },
    canExtractEnergy: function (t) {
        return t == 1;
    },
    input: 0,
    slot: null,
    tick: function () {
        if (TIPS) {
            this.container.sendEvent("update_tips_generator", {
                input: this.input
            });
        }
        this.container.setText("molecularText", parseInt(this.data.energy) + "/" + this.getEnergyStorage() + " Qe");
        this.container.setScale("molecularScale", this.data.energy / this.getEnergyStorage());
        var time = World.getThreadTime() % 8;
        if ((this.data.power && this.data.energy < this.getEnergyStorage()) && time) {
            if (this.slot) {
                this.data.energy = Math.min(this.getEnergyStorage(), this.data.energy + this.getInput(this.slot));
                this.slot.setSlot(this.slot.id, this.slot.count - 1, this.slot.data);
                if (this.slot.count == 0) {
                    this.slot.validate();
                    this.slot = null;
                    this.input = 0;
                }
            }
            else {
                for (var i = 1; i <= 30; i++) {
                    var slot = this.container.getSlot("slot" + i);
                    if (slot.id > 0) {
                        this.slot = slot;
                        break;
                    }
                }
            }
        }
        this.container.sendChanges();
    },
    getTier: function () {
        return OresAPI.getConfigValue("molecular_generator.tier");
    },
    getScreenByName: function () { return gui.MG; },
    energyTick: function (type, src) {
        var output = Math.min(this.data.energy, OresAPI.getConfigValue("molecular_generator.output"));
        this.data.energy += src.add(output) - output;
    },
    client: {
        containerEvents: {
            "update_tips_generator": function (container, window, content, packet) {
                if (!content)
                    return;
                content.elements["input"].text = StringHelper.t("Generation") + ": " + packet.input + "QE";
                content.elements["input"].font.color = (packet.input > 0) ?
                    UIColor.GREEN : UIColor.YELLOW;
            }
        }
    }
});
addToRenderGroup(BlockID.molecularGenerator, "QE-wire");
EnergyTileRegistry.addEnergyTypeForId(BlockID.molecularGenerator, QE);
GUI.createObject(Translation.translate("Molecular Sealer"));
GUI.addDrawableObject.bitmap("moleuclar_background", { x: 523, y: 240 }, 3.2);
GUI.addDrawableObject.bitmap("arrow_bg", { x: 543, y: 153 }, 3.2);
GUI.addElement.scale("molecularScale", { x: 523 + 3.2 * 4, y: 240 }, 0, "molecularScale", 3.2);
GUI.addElement.text("molecularText", { x: 523, y: 291 }, 1, 1, "0/50000 Qe", { color: UIColor.parseColor("#00FFFF"), shadow: 0.6 });
GUI.addElement.slot("matterSlot", { x: 643, y: 149 });
GUI.addElement.slot("batterySlot", { x: 450, y: 149 });
GUI.addElement.scale("processScale", { x: 543, y: 153 }, 0, "arrow_scale", 3.2);
if (TIPS) {
    GUI.addDrawableObject.frame({ x: 336, y: 363 }, "classic_frame_input", 630, 100, 3.6);
    GUI.addDrawableObject.text("__DEBUG console__", { x: ((630 + 336) / 2) + 70, y: 380 }, { size: 14, color: UIColor.WHITE });
    GUI.addDrawableObject.text(StringHelper.t("Condition") + ":", { x: 340, y: 403 }, { size: 14, color: UIColor.WHITE });
    GUI.addElement.text("mode", { x: ((630 + 336) / 2) + 70, y: 391 }, 0, 0, StringHelper.t("Idles"), { color: UIColor.YELLOW, size: 14 });
}
gui.molecularSealant = GUI.importScreen();
MachineRegistry.registerElectricMachine(BlockID.molecularSealant, {
    defaultValues: {
        work_time: OresAPI.getConfigValue("molecular_sealer.work_time"),
        progress: 0,
        energyEated: 0,
        signal: true
    },
    redstone: function (params) {
        this.data.signal = !params.power;
    },
    tick: function () {
        if (TIPS) {
            this.container.sendEvent("update_tips_sealer", {
                energy: this.data.energy,
                signal: this.data.signal,
                progress: this.getProgress(),
            });
        }
        if (this.data.signal && this.data.energy > 0) {
            this.data.energy--;
            this.data.progress += 1 / this.data.work_time;
        }
        if (this.data.progress >= 1) {
            var resultSlot = this.container.getSlot("matterSlot");
            resultSlot.setSlot(ItemID.Oresmatter, resultSlot.count + 1, 0);
            this.data.progress = 0;
        }
        var energyStorage = this.getEnergyStorage();
        var tier = this.getTier();
        this.data.energy = Math.min(this.data.energy, energyStorage);
        this.data.energy += ChargeItemRegistry.getEnergyFrom(this.container.getSlot("batterySlot"), "Qe", energyStorage - this.data.energy, transferByTier[tier], tier);
        this.container.setScale("processScale", this.data.progress);
        this.container.setScale("molecularScale", this.data.energy / this.getEnergyStorage());
        this.container.setText("molecularText", parseInt(this.data.energy) + "/" + this.getEnergyStorage() + " QE");
        this.container.sendChanges();
    },
    client: {
        containerEvents: {
            "update_tips_sealer": function (container, window, content, packet) {
                if (!content)
                    return;
                if (packet.energy > 0 && packet.signal) {
                    content.elements.mode.text = StringHelper.t("Works") + " " + packet.progress + "%";
                    content.elements.mode.font.color = UIColor.GREEN;
                }
                else {
                    if (packet.progress > 0) {
                        content.elements.mode.text = StringHelper.t("Idles") + " " + packet.progress + "%";
                    }
                    else
                        content.elements.mode.text = StringHelper.t("Idles") + " ";
                    content.elements.mode.font.color = UIColor.YELLOW;
                }
            }
        }
    },
    getTier: function () {
        return OresAPI.getConfigValue("molecular_sealer.tier");
    },
    canReceiveEnergy: function (side) {
        return side == 1;
    },
    getEnergyStorage: function () {
        return OresAPI.getConfigValue("molecular_sealer.energy_storage");
    },
    getScreenByName: function () { return gui.molecularSealant; }
});
addToRenderGroup(BlockID.molecularSealant, "QE-wire");
EnergyTileRegistry.addEnergyTypeForId(BlockID.molecularSealant, QE);
OresAPI.registerBlock("molecularSealant", true, [
    {
        name: "Molecular Sealer",
        texture: [["MBot", 0], ["sealantTop", 0], ["MBot", 0], ["sealantFront", 0], ["MBot", 0], ["MBot", 0]],
        inCreative: true
    }
], "opaque", [{ ru: "Молекулярный Уплотнитель" }], energyNameOverride("b", "machine", 3));
Callback.addCallback("PostLoaded", function () {
    OresAPI.addShapedRecipe([BlockID.molecularSealant, 1, 0], ["tst", "rdr", "tst"], ["t", ItemID.ingotLead, -1, "s", ItemID.crystalSapphire, -1, "r", 331, 0, "d", ItemID.quantomDetectorChip, 0]);
});
OresAPI.registerBlock("naniteCollector", true, [
    {
        name: "Nanite Collector",
        texture: [["MBot", 0], ["MBot", 0], ["collectorBack", 0], ["collectorFront", 0], ["collectorLeft", 0], ["collectorRight", 0]],
        inCreative: true
    }
], "opaque", [{ ru: "Сборщик Нанитов" }], energyNameOverride(4, "machine", 4));
Callback.addCallback("PostLoaded", function () {
    OresAPI.addShapedRecipe([BlockID.naniteCollector, 1, 0], ["bdb", "scs", "brb"], ["r", 331, 0, "c", ItemID.splitterChip, -1, "s", ItemID.crystalSapphire, -1, "d", ItemID.densityControllerChip, -1, "b", ItemID.ingotLead, -1]);
});
GUI.createObject(Translation.translate("Nanite Collector"));
GUI.addDrawableObject.bitmap("energy_scale_bg", { x: 563, y: 82 }, 3.6);
GUI.addDrawableObject.bitmap("energy_scale_bg", { x: 602, y: 82 }, 3.6);
GUI.addElement.slot("mainSource", { x: 531, y: 152 }, 50, false, function (id, count, data) { return id == 265; });
GUI.addElement.slot("box", { x: 586, y: 152 });
GUI.addElement.slot("redstone", { x: 586 + 55, y: 152 }, 50, false, function (id, count, data) { return id == 331; });
GUI.addElement.text("progressText", { x: 586, y: 202 }, 1, 1, "0%", { size: 50, color: UIColor.RED });
GUI.addElement.slot("result", { x: 586, y: 271 }, 50, false, function () { return false; });
GUI.addElement.scale("energyScale", { x: 563, y: 82 }, 1, "energy_scale", 3.6);
GUI.addElement.scale("matterScale", { x: 602, y: 82 }, 1, "blue_energy_scale", 3.6);
gui.naniteCollector = GUI.importScreen();
MachineRegistry.registerElectricMachine(BlockID.naniteCollector, {
    defaultValues: {
        energy_EU_consumption: OresAPI.getConfigValue("nanite_collector.energy_EU_consumption"),
        energy_QE_consumption: OresAPI.getConfigValue("nanite_collector.energy_QE_consumption"),
        work_time: OresAPI.getConfigValue("nanite_collector.work_time"),
        EU: 0,
        QE: 0
    },
    getScreenByName: function () {
        return gui.naniteCollector;
    },
    getEUStorage: function () {
        return OresAPI.getConfigValue("nanite_collector.energy_EU_storage");
    },
    getQEStorage: function () {
        return OresAPI.getConfigValue("nanite_collector.energy_QE_storage");
    },
    canReceiveEnergy: function (side, type) {
        return type == "Eu" ?
            side != RelativeAPI.getRelativeSide(this.blockSource.getBlockData(this.x, this.y, this.z), 0) :
            side == 1;
    },
    tick: function () {
        this.updateValues();
        if (this.condition()) {
            if (this.data.EU >= this.data.energy_EU_consumption &&
                this.data.QE >= this.data.energy_QE_consumption) {
                this.data.EU -= this.data.energy_EU_consumption;
                this.data.QE -= this.data.energy_QE_consumption;
                this.data.progress += 1 / this.data.work_time;
                if (this.data.progress >= 1)
                    this.finnaly();
            }
        }
        this.container.sendChanges();
    },
    getTier: function () {
        return OresAPI.getConfigValue("nanite_collector.tier");
    },
    QEReceive: function (type, amount, voltage) {
        var maxVoltage = this.getMaxPacketSize();
        if (voltage > maxVoltage) {
            var add = Math.min(maxVoltage, this.getQEStorage() - this.data.QE);
        }
        else {
            var add = Math.min(amount, this.getQEStorage() - this.data.QE);
        }
        this.data.QE += add;
        return add;
    },
    EUReceive: function (type, amount, voltage) {
        var maxVoltage = this.getMaxPacketSize();
        if (voltage > maxVoltage) {
            var add = Math.min(maxVoltage, this.getEUStorage() - this.data.EU);
        }
        else {
            var add = Math.min(amount, this.getEUStorage() - this.data.EU);
        }
        this.data.EU += add;
        return add;
    },
    energyReceive: function (type, amount, voltage) {
        if (type == "Eu") {
            return this.EUReceive(type, amount, voltage);
        }
        if (type == "QE") {
            return this.QEReceive(type, amount, voltage);
        }
    },
    updateValues: function () {
        this.container.sendEvent("set_color", {
            progress: this.getProgress()
        });
        this.mainSource = this.container.getSlot("mainSource");
        this.box = this.container.getSlot("box");
        this.redstone = this.container.getSlot("redstone");
        this.resultSlot = this.container.getSlot("result");
        this.container.setScale("energyScale", this.data.EU / this.getEUStorage());
        this.container.setScale("matterScale", this.data.QE / this.getQEStorage());
    },
    condition: function () {
        if (this.mainSource.id == 265 && this.box.id == ItemID.emptyFlask && this.redstone.id == 331 && this.resultSlot.id == 0)
            return true;
    },
    finnaly: function () {
        this.resultSlot.setSlot(ItemID.flaskWithNanites, 1, getRandomFullFlaskTexture(this.box.data));
        this.data.progress = 0;
        this.redstone.setSlot(this.redstone.id, this.redstone.count - 1, this.redstone.data);
        this.mainSource.setSlot(this.mainSource.id, this.mainSource.count - 1, this.mainSource.data);
        this.box.setSlot(this.box.id, this.box.count - 1, this.box.data);
        this.redstone.validate();
        this.mainSource.validate();
        this.box.validate();
    },
    client: {
        containerEvents: {
            "set_color": function (c, w, content, packet) {
                if (!content)
                    return;
                function getColor(a) {
                    if (a > 96)
                        return "#7CFC00";
                    if (a > 90)
                        return "#00FF00";
                    if (a > 84)
                        return "#32CD32";
                    if (a > 73)
                        return "#008000";
                    if (a > 67)
                        return "#228B22";
                    if (a > 50)
                        return "#6B8E23";
                    if (a > 41)
                        return "#2E8B57";
                    if (a > 32)
                        return "#FF8C00";
                    if (a > 14)
                        return "#FF4500";
                    return "#FF0000";
                }
                content.elements.progressText.font.color = UIColor.parseColor(getColor(packet.progress));
                content.elements.progressText.text = packet.progress + "%";
            }
        }
    }
});
addToRenderGroup(BlockID.naniteCollector, "ic-wire");
addToRenderGroup(BlockID.naniteCollector, "QE-wire");
EnergyTileRegistry.addEnergyTypeForId(BlockID.naniteCollector, EU);
EnergyTileRegistry.addEnergyTypeForId(BlockID.naniteCollector, QE);
GUI.createObject(Translation.translate("Nanite Training Node"));
GUI.addDrawableObject.bitmap("sslot", { x: 600, y: 92 }, 5);
GUI.addElement.button("b-1", { x: 520, y: 92 }, "slot", 5, naniteTrainingNodeButtonsOnClick(-1));
GUI.addElement.button("b+1", { x: 680, y: 92 }, "slot", 5, naniteTrainingNodeButtonsOnClick(1));
GUI.addDrawableObject.text("-1", { x: 540, y: 80 });
GUI.addDrawableObject.text("свойство", { x: 610, y: 140 }, { color: UIColor.WHITE, size: 10 });
GUI.addDrawableObject.text("+1", { x: 700, y: 80 });
GUI.addDrawableObject.bitmap("energy_scale_bg", { x: 840, y: 110 }, 3.2);
GUI.addDrawableObject.bitmap("energy_scale_bg", { x: 870, y: 110 }, 3.2);
GUI.addDrawableObject.text("Выбранное свойство: ", { x: 530, y: 200 });
GUI.addElement.text("selectedImp", { x: 500, y: 250 }, 100, 10, "");
GUI.addElement.slot("source", { x: 470, y: 340 });
GUI.addElement.scale("processScale", { x: 553, y: 341 }, 0, "arrow_scale", 3.2);
GUI.addElement.scale("energyScale", { x: 840, y: 110 }, 1, "energy_scale", 3.2);
GUI.addElement.scale("matterScale", { x: 870, y: 110 }, 1, "blue_energy_scale", 3.2);
GUI.addElement.slot("result", { x: 652, y: 340 });
gui.naniteTrainingNode = GUI.importScreen();
function naniteTrainingNodeButtonsOnClick(value) {
    return {
        onClick: function (position, container) {
            container.sendEvent("on_button_click", {
                value: value
            });
        }
    };
}
MachineRegistry.registerElectricMachine(BlockID.naniteTrainingNode, {
    defaultValues: {
        energy_EU_consumption: OresAPI.getConfigValue("nanite_training_node.energy_EU_consumption"),
        energy_QE_consumption: OresAPI.getConfigValue("nanite_training_node.energy_QE_consumption"),
        work_time: OresAPI.getConfigValue("nanite_training_node.work_time"),
        EU: 0,
        QE: 0,
        selectID: 0,
        isActive: false
    },
    getTier: function () {
        return OresAPI.getConfigValue("nanite_training_node.tier");
    },
    getEUStorage: function () {
        return OresAPI.getConfigValue("nanite_training_node.energy_EU_storage");
    },
    getQEStorage: function () {
        return OresAPI.getConfigValue("nanite_training_node.energy_QE_storage");
    },
    getScreenByName: function () {
        return gui.naniteTrainingNode;
    },
    canReceiveEnergy: function (side, type) {
        return type == "Eu" ?
            side != RelativeAPI.getRelativeSide(this.blockSource.getBlockData(this.x, this.y, this.z), 0) :
            side == 1;
    },
    showSelectedMode: function (id) {
        for (var i in implantations) {
            if (implantations[i].key == id) {
                this.data.key = i;
                this.container.sendEvent("show_selected_mode", {
                    params: implantations[i]
                });
                break;
            }
        }
    },
    QEReceive: function (type, amount, voltage) {
        var maxVoltage = this.getMaxPacketSize();
        if (voltage > maxVoltage) {
            var add = Math.min(maxVoltage, this.getQEStorage() - this.data.QE);
        }
        else {
            var add = Math.min(amount, this.getQEStorage() - this.data.QE);
        }
        this.data.QE += add;
        return add;
    },
    EUReceive: function (type, amount, voltage) {
        var maxVoltage = this.getMaxPacketSize();
        if (voltage > maxVoltage) {
            /*if(voltageEnabled){
                World.explode(this.x + 0.5, this.y + 0.5, this.z + 0.5, 0.5, true);
                this.selfDestroy();
                return 0;
            }*/
            var add = Math.min(maxVoltage, this.getEUStorage() - this.data.EU);
        }
        else {
            var add = Math.min(amount, this.getEUStorage() - this.data.EU);
        }
        this.data.EU += add;
        return add;
    },
    energyReceive: function (type, amount, voltage) {
        if (type == "Eu") {
            return this.EUReceive(type, amount, voltage);
        }
        if (type == "QE") {
            return this.QEReceive(type, amount, voltage);
        }
    },
    tick: function () {
        this.updateValues();
        if (this.processCondition()) {
            if (this.data.EU >= this.data.energy_EU_consumption &&
                this.data.QE >= this.data.energy_QE_consumption) {
                this.data.EU -= this.data.energy_EU_consumption;
                this.data.QE -= this.data.energy_QE_consumption;
                this.data.isActive = true;
                this.data.progress += 1 / this.data.work_time;
            }
            if (this.data.progress >= 1)
                this.finnaly();
        }
        else {
            this.data.progress = 0;
            this.data.isActive = false;
        }
        this.container.sendChanges();
    },
    processCondition: function () {
        return (this.valid && (this.result.id == 0 && this.source.id == ItemID.flaskWithNanites));
    },
    finnaly: function () {
        this.data.progress = 0;
        var resultExtra = new ItemExtraData();
        resultExtra.putString("implantation", this.data.key);
        this.result.setSlot(ItemID.flaskWithTrainedNanites, 1, this.source.data, resultExtra);
        this.source.setSlot(this.source.id, this.source.count - 1, this.source.data);
        this.source.validate();
        this.data.isActive = false;
    },
    updateValues: function () {
        this.source = this.container.getSlot("source");
        this.result = this.container.getSlot("result");
        this.container.setScale("processScale", this.data.progress);
        this.container.setScale("energyScale", this.data.EU / this.getEUStorage());
        this.container.setScale("matterScale", this.data.QE / this.getQEStorage());
    },
    containerEvents: {
        "on_button_click": function (packet) {
            if (!this.data.isActive) {
                var implantationsList = Object.keys(implantations);
                var count = this.data.selectID + packet.value;
                if (count > implantationsList.length)
                    count = 1;
                if (count < 1)
                    count = implantationsList.length;
                this.data.selectID = count;
                this.valid = true;
                this.showSelectedMode(this.data.selectID);
            }
        }
    },
    client: {
        containerEvents: {
            "show_selected_mode": function (c, w, content, package) {
                content.elements["selectedImp"].font.color = package.params.color;
                content.elements["selectedImp"].text = package.params.name;
            }
        }
    }
});
addToRenderGroup(BlockID.naniteTrainingNode, "ic-wire");
addToRenderGroup(BlockID.naniteTrainingNode, "QE-wire");
EnergyTileRegistry.addEnergyTypeForId(BlockID.naniteTrainingNode, EU);
EnergyTileRegistry.addEnergyTypeForId(BlockID.naniteTrainingNode, QE);
OresAPI.registerBlock("naniteTrainingNode", true, [
    {
        name: "Nanite Training Node",
        texture: [["nodeSide", 0], ["nodeTop", 0], ["nodeSide", 0], ["nodeFront", 0], ["nodeSide", 0], ["nodeSide", 0]],
        inCreative: true
    }
], "opaque", [{ ru: "Узел Обучения Нанитов" }], energyNameOverride("e", "machine", 4));
Callback.addCallback("PostLoaded", function () {
    OresAPI.addShapedRecipe([BlockID.naniteTrainingNode, 1, 0], ["bsb", "rdr", "bcb"], ["d", ItemID.quantomDetectorChip, -1, "b", ItemID.ingotLead, -1, "r", 331, 0, "c", ItemID.matteryDrive, -1, "s", ItemID.crystalSapphire, -1]);
});
var SolarPanel = {
    machine: function (id, type) {
        var conf = type + "_solar_panel.";
        MachineRegistry.registerGenerator(BlockID["solarPanel" + id], {
            getValue: OresAPI.getConfigValue,
            getScreenByName: function () { return gui[type]; },
            getEnergyStorage: function () { return this.getValue(conf + "storage"); },
            tick: function () {
                //try {
                this.container.setText("energyText", parseInt(this.data.energy) + "");
                this.container.setScale("energyScale", this.data.energy / this.getEnergyStorage());
                for (var i = 1; i < 6; i++) {
                    var slot = this.container.getSlot("slot" + i);
                    if (slot.id == 0)
                        continue;
                    this.data.energy -= ChargeItemRegistry.addEnergyTo(slot, "Eu", this.data.energy, this.getValue(conf + "output"), this.getValue(conf + "tier"));
                    slot.setSlot(slot.id, slot.count, slot.data, slot.extra);
                }
                if (this.getEnergyStorage() > this.data.energy && this.blockSource.canSeeSky(this.x, this.y, this.z)) {
                    var time = World.getWorldTime() % 24000;
                    if ((time >= 23500 || time < 12550) && (!World.getWeather().rain || this.blockSource.getLightLevel(this.x, this.y + 1, this.z) > 14)) {
                        this.data.energy = Math.min(this.getEnergyStorage(), this.data.energy + this.getValue(conf + "gen_day"));
                    }
                    else if (this.getValue(conf + "gen_night") > 0) {
                        this.data.energy = Math.min(this.getEnergyStorage(), this.data.energy + this.getValue(conf + "gen_night"));
                    }
                }
                this.container.sendChanges();
                /*}catch(e){
                    Debug.error(e);
                    Logger.Log(e);
                }*/
            },
            canExtractEnergy: function (side) {
                return side == 0;
            },
            energyTick: function (type, src) {
                //try{
                var output = Math.min(this.getValue(conf + "output"), this.data.energy);
                this.data.energy += src.add(output) - output;
                /*}catch(e){
                    Debug.error(e);
                    Logger.Log("energyTick: "+e)
                }*/
            }
        });
        addToRenderGroup(BlockID["solarPanel" + id], "ic-wire");
        EnergyTileRegistry.addEnergyTypeForId(BlockID["solarPanel" + id], EU);
    },
    window: function (p) {
        GUI.createObject(p[0]);
        GUI.editStyles({
            slot: p[1][0],
            invSlot: p[1][0],
            selection: p[1][1],
            background: p[1][2]
        });
        GUI.addDrawableObject.bitmap(p[2], { x: 560, y: 200 }, 3.6);
        GUI.addElement.scale("energyScale", { x: 560 + 3.6 * 4, y: 200 }, 0, p[3], 3.6);
        for (var i = 1; i <= 5; i++) {
            GUI.addElement.slot("slot" + i, { x: 463 + (50 * i), y: 273 });
        }
        GUI.addElement.text("energyText", { x: 570, y: 168 }, 1, 1, "0", { color: p[4] });
        return GUI.importScreen();
    },
    shape: function (id, q, w, e) {
        var render = new ICRender.Model();
        BlockRenderer.setStaticICRender(id, -1, render);
        var model = BlockRenderer.createModel();
        model.addBox(1, 0, 1, 0, 0.1, 0, q, 0);
        model.addBox(0.4, 0.1, 0.4, 0.6, 0.55, 0.6, q, 0);
        model.addBox(0.6, 0.1, 0.3, 0.7, 0.55, 0.4, w, 0);
        model.addBox(0.6, 0.1, 0.6, 0.7, 0.55, 0.7, w, 0);
        model.addBox(0.3, 0.1, 0.3, 0.4, 0.55, 0.4, w, 0);
        model.addBox(0.3, 0.1, 0.6, 0.4, 0.55, 0.7, w, 0);
        model.addBox(1, 0.55, 1, 0, 0.7, 0, [[q, 0], [e, 0], [q, 0], [q, 0], [q, 0], [q, 0], [q, 0]]);
        render.addEntry(model);
    }
};
gui.leadstone = SolarPanel.window([Translation.translate("Leadstone Solar Panel"), ["lslot", "lsslot", "#778899"], "lbg", "ls", UIColor.parseColor("#D2B48C")]);
gui.hardent = SolarPanel.window([Translation.translate("Hardent Solar Panel"), ["hslot", "hsslot", "#696969"], "hsbg", "hs", UIColor.parseColor("#D2B48C")]);
gui.redstone = SolarPanel.window([Translation.translate("Redstone Solar Panel"), ["rdslot", "rdsslot", "#BDB76B"], "rdsbg", "rds", UIColor.parseColor("#800000")]);
gui.resonant = SolarPanel.window([Translation.translate("Resonant Solar Panel"), ["rsslot", "rssslot", "#556B2F"], "rssbg", "rss", UIColor.parseColor("#006400")]);
gui.advanced = SolarPanel.window([Translation.translate("Advanced Solar Panel"), ["aslot", "asslot", "#4169E1"], "asbg", "as", UIColor.parseColor("#00BFFF")]);
gui.ultimate = SolarPanel.window([Translation.translate("Ultimate Solar Panel"), ["uslot", "usslot", "#9400D3"], "usbg", "us", UIColor.parseColor("#4B0082")]);
SolarPanel.machine("Hardent", "hardent");
SolarPanel.machine("Leadstone", "leadstone");
SolarPanel.machine("Redstone", "redstone");
SolarPanel.machine("Resonant", "resonant");
SolarPanel.machine("Advanced", "advanced");
SolarPanel.machine("Ultimate", "ultimate");
OresAPI.registerBlock("solarPanelLeadstone", false, [
    { name: "Leadstone Solar Panel", texture: [["leadstone", 0], ["Ltop", 0], ["leadstone", 0], ["leadstone", 0], ["leadstone", 0], ["leadstone", 0]], inCreative: true }
], false, [{ ru: "Свинцовая Солнечная Панель" }], energyNameOverride(8, "machine", OresAPI.getConfigValue("leadstone_solar_panel.output"), 1), "stone", 1);
OresAPI.registerBlock("solarPanelHardent", false, [
    { name: "Hardent Solar Panel", texture: [["hardent", 0], ["Htop", 0], ["hardent", 0], ["hardent", 0], ["hardent", 0], ["hardent", 0]], inCreative: true }
], false, [{ ru: "Закалённая Солнечная Панель" }], energyNameOverride(7, "machine", OresAPI.getConfigValue("hardent_solar_panel.output"), 1), "stone", 1);
OresAPI.registerBlock("solarPanelRedstone", false, [
    { name: "Redstone Solar Panel", texture: [["redstone", 0], ["RDtop", 0], ["redstone", 0], ["redstone", 0], ["redstone", 0], ["redstone", 0]], inCreative: true }
], false, [{ ru: "Краснокаменная Солнечная Панель" }], energyNameOverride("e", "machine", OresAPI.getConfigValue("redstone_solar_panel.output"), 1), "stone", 1);
OresAPI.registerBlock("solarPanelResonant", false, [
    { name: "Resonant Solar Panel", texture: [["resonant", 0], ["RStop", 0], ["resonant", 0], ["resonant", 0], ["resonant", 0], ["resonant", 0]], inCreative: true }
], false, [{ ru: "Резонирующая Солнечная Панель" }], energyNameOverride(2, "machine", OresAPI.getConfigValue("resonant_solar_panel.output"), 1), "stone", 1);
OresAPI.registerBlock("solarPanelAdvanced", false, [
    { name: "Advanced Solar Panel", texture: [["advanced", 0], ["Atop", 0], ["advanced", 0], ["advanced", 0], ["advanced", 0], ["advanced", 0]], inCreative: true }
], false, [{ ru: "Продвинутая Солнечная Панель" }], energyNameOverride(1, "machine", OresAPI.getConfigValue("advanced_solar_panel.output"), 1), "stone", 1);
OresAPI.registerBlock("solarPanelUltimate", false, [
    { name: "Ultimate Solar Panel", texture: [["ultimate", 0], ["Utop", 0], ["ultimate", 0], ["ultimate", 0], ["ultimate", 0], ["ultimate", 0]], inCreative: true }
], false, [{ ru: "Совершенная Солнечная Панель" }], energyNameOverride(5, "machine", OresAPI.getConfigValue("ultimate_solar_panel.output"), 1), "stone", 1);
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: BlockID.solarPanelLeadstone, count: 1, data: 0 }, ["lll", "rcr", "nnn"], ["l", ItemID.cellPhotovailtaic, -1, "r", ItemID.ingotLead, -1, "c", ItemID.solarCoreLeadstone, -1, "n", ItemID.ingotLead, -1]);
    Recipes.addShaped({ id: BlockID.solarPanelHardent, count: 1, data: 0 }, ["plp", "crc", "nrn"], ["p", BlockID.solarPanelLeadstone, -1, "c", ItemID.solarCoreHardent, -1, "r", ItemID.ingotLead, -1, "l", ItemID.cellPhotovailtaic, -1, "n", ItemID.nuggetLead, -1]);
    Recipes.addShaped({ id: BlockID.solarPanelRedstone, count: 1, data: 0 }, ["plp", "crc", "nnn"], ["p", BlockID.solarPanelHardent, -1, "c", ItemID.solarCoreRedstone, -1, "l", ItemID.cellPhotovailtaic, -1, "r", 266, 0, "n", ItemID.nuggetElectrum, -1]);
    Recipes.addShaped({ id: BlockID.solarPanelResonant, count: 1, data: 0 }, ["plp", "crc", "nrn"], ["p", BlockID.solarPanelRedstone, -1, "c", ItemID.solarCoreResonant, -1, "r", 22, 0, "l", ItemID.cellPhotovailtaic, -1, "n", ItemID.nuggetMistery, -1]);
    Recipes.addShaped({ id: BlockID.solarPanelAdvanced, count: 1, data: 0 }, ["plp", "crc", "sls"], ["p", BlockID.solarPanelResonant, -1, "c", ItemID.solarCoreAdvanced, -1, "r", ItemID.nuggetMionite, -1, "l", ItemID.cellPhotovailtaic, -1, "s", ItemID.crystalSapphire, -1, "l", ItemID.formationsLeotite, -1]);
    Recipes.addShaped({ id: BlockID.solarPanelUltimate, count: 1, data: 0 }, ["plp", "crc", "ncn"], ["p", BlockID.solarPanelAdvanced, -1, "c", ItemID.solarCoreUltimate, -1, "r", ItemID.nuggetMistery, -1, "l", ItemID.cellPhotovailtaic, -1, "n", ItemID.nuggetMionite, -1]);
});
SolarPanel.shape(BlockID.solarPanelLeadstone, "leadstone", "coal_block", "Ltop");
SolarPanel.shape(BlockID.solarPanelHardent, "hardent", "iron_block", "Htop");
SolarPanel.shape(BlockID.solarPanelRedstone, "redstone", "gold_block", "RDtop");
SolarPanel.shape(BlockID.solarPanelResonant, "resonant", "uranium_block", "RStop");
SolarPanel.shape(BlockID.solarPanelAdvanced, "advanced", "SB", "Atop");
SolarPanel.shape(BlockID.solarPanelUltimate, "ultimate", "obsidian", "Utop");
OresAPI.registerItem("shardLapis", "Lapis Shard", { name: "lapisShard" }, { ru: "Лазуритовый осколок" }, {}, defaultItemNameOverride(1, "item"));
OresAPI.registerItem("cellPhotovailtaic", "Photovailtaic Cell", { name: "cell" }, { ru: "Фотоэллектрический Провод" }, {}, defaultItemNameOverride(1, "item"));
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: ItemID.shardLapis, count: 9, data: 0 }, ["ooo", "olo", "ooo"], ["l", 821, 0]);
    OresAPI.addShapedRecipe([861, 1, 0], ["nnn", "nnn", "nnn"], ["n", ItemID.shardLapis, -1]);
    OresAPI.addShapedRecipe([265, 1, 0], ["nnn", "nnn", "nnn"], ["n", 452, -1]);
    OresAPI.addShapedRecipe([ItemID.cellPhotovailtaic, 1, 0], ["ggg", "lll", "iii"], ["g", 102, 0, "l", ItemID.shardLapis, -1, "n", 452, -1]);
    OresAPI.addShapedRecipe([265, 1, 0], ["aaa", "aaa", "aaa"], ["a", 452, -1]);
});
Callback.addCallback("PostLoaded", function () {
    OresAPI.addShapedRecipe([ItemID.solarCoreLeadstone, 1, 0], ["ono", "nin", "ono"], ["i", 265, 0, "n", ItemID.nuggetLead, -1]);
    OresAPI.addShapedRecipe([ItemID.solarCoreHardent, 1, 0], ["ono", "ncn", "ono"], ["c", ItemID.solarCoreLeadstone, 0, "n", ItemID.nuggetLead, 0]);
    OresAPI.addShapedRecipe([ItemID.solarCoreRedstone, 1, 0], ["ono", "ncn", "ono"], ["c", ItemID.solarCoreHardent, -1, "n", ItemID.nuggetElectrum, -1]);
    OresAPI.addShapedRecipe([ItemID.solarCoreResonant, 1, 0], ["olo", "lcl", "olo"], ["c", ItemID.solarCoreRedstone, -1, "n", 351, 4, "l", 265, 0]);
    OresAPI.addShapedRecipe([ItemID.solarCoreAdvanced, 1, 0], ["olo", "lcl", "olo"], ["c", ItemID.solarCoreResonant, -1, "l", ItemID.crystalSapphire, -1, "n", ItemID.shardLapis, -1]);
    OresAPI.addShapedRecipe([ItemID.solarCoreUltimate, 1, 0], ["ono", "ncn", "ono"], ["c", ItemID.solarCoreAdvanced, -1, "n", ItemID.nuggetMistery, -1, "o", ItemID.nuggetElectrum, -1]);
});
OresAPI.registerItem("solarCoreLeadstone", "Leadstone Solar Core", { name: "core", data: 0 }, { ru: "Свинцовое Солнечное Ядро" }, {}, defaultItemNameOverride(8, "item"));
OresAPI.registerItem("solarCoreHardent", "Hardend Solar Core", { name: "core", data: 1 }, { ru: "Закалённое Солнечное Ядро" }, {}, defaultItemNameOverride(7, "item"));
OresAPI.registerItem("solarCoreRedstone", "Redstone Solar Core", { name: "core", data: 2 }, { ru: "Краснокаменное Солнечное Ядро" }, {}, defaultItemNameOverride("e", "item"));
OresAPI.registerItem("solarCoreResonant", "Resonant Solar Core", { name: "core", data: 3 }, { ru: "Резонирующее Солнечное Ядро" }, {}, defaultItemNameOverride(2, "item"));
OresAPI.registerItem("solarCoreAdvanced", "Advanced Solar Core", { name: "core", data: 4 }, { ru: "Продвинутое Солнечное Ядро" }, {}, defaultItemNameOverride(1, "item"));
OresAPI.registerItem("solarCoreUltimate", "Ultimate Solar Core", { name: "core", data: 5 }, { ru: "Идеальное Солнечное Ядро" }, {}, defaultItemNameOverride(5, "item"));
Callback.addCallback("PostLoaded", function () {
    OresAPI.addShapedRecipe([ItemID.nuggetLead, 9, 0], ["ooo", "oao", "ooo"], ["a", ItemID.ingotLead, -1]);
    OresAPI.addShapedRecipe([ItemID.nuggetElectrum, 1, 0], ["ogo", "rsr", "ogo"], ["s", ItemID.nuggetLead, -1, "r", 331, 0, "g", 371, 0]);
    OresAPI.addShapedRecipe([ItemID.nuggetUranium, 9, 0], ["ogo", "gug", "ogo"], ["g", 348, 0, "u", ItemID.ingotUranium, -1]);
    OresAPI.addShapedRecipe([ItemID.nuggetMistery, 1, 0], ["oeo", "dsd", "oeo"], ["o", 49, 0, "d", 264, 0, "s", ItemID.crystalSapphire, -1, "e", ItemID.nuggetElectrum, -1]);
    OresAPI.addShapedRecipe([ItemID.ingotLead, 1, 0], ["aaa", "aaa", "aaa"], ["a", ItemID.nuggetLead, -1]);
    OresAPI.addShapedRecipe([ItemID.ingotUranium, 1, 0], ["aaa", "aaa", "aaa"], ["a", ItemID.nuggetUranium, -1]);
});
OresAPI.registerItem("nuggetLead", "Lead Nugget", { name: "nugget", data: 0 }, { ru: "Свинцовый Самородок" }, {}, defaultItemNameOverride(8, "item"));
OresAPI.registerItem("nuggetElectrum", "Electrum Nugget", { name: "nugget", data: 1 }, { ru: "Электроумовый Самородок" }, {}, "e", "item");
OresAPI.registerItem("nuggetUranium", "Uranium Nugget", { name: "nugget", data: 2 }, { ru: "Ураниумовый Самородок" }, {}, defaultItemNameOverride("a", "item"));
OresAPI.registerItem("nuggetMistery", "Mistery Nugget", { name: "nugget", data: 3 }, { ru: "Загадочный Самородок" }, {}, defaultItemNameOverride(5, "item"));
GUI.createObject(StringHelper.t("Wood Incubator"));
GUI.addDrawableObject.bitmap("red_scale", { x: 564, y: 154 }, 4.2);
GUI.addDrawableObject.bitmap("energy_scale_bg", { x: 563, y: 112 }, 3.2);
GUI.addElement.scale("processScale", { x: 564, y: 154 }, 0, "green_scale", 4.2);
GUI.addElement.scale("energyScale", { x: 563, y: 112 }, 1, "energy_scale", 3.2);
GUI.addElement.slot("materialSlot", { x: 500, y: 137 }, 50);
GUI.addElement.slot("engineSlot", { x: 500, y: 187 }, 50);
GUI.addElement.slot("inputSlot", { x: 723, y: 164 }, 50);
GUI.addElement.slot("saplingSlot", { x: 723, y: 114 }, 50);
GUI.addElement.slot("specialSlot", { x: 723, y: 214 }, 50);
gui.woodIncubator = GUI.importScreen();
var WoodIncubatorRecipes = {
    data: {},
    sapling: {},
    registerSpecialDrop: function (id, count, data, result) {
        WoodIncubatorRecipes.data[id + ":" + data] = { id: result.id, data: result.data, count: { standart: count.standart, withEngine: count.withEngine } };
    },
    getSpecialDrop: function (id, data) {
        if (WoodIncubatorRecipes.data[id + ":" + data]) {
            return WoodIncubatorRecipes.data[id + ":" + data];
        }
        return false;
    },
    getDropCount: function (id, data, bool) {
        var p = WoodIncubatorRecipes.data[id + ":" + data].count;
        return bool ?
            random(p.withEngine[0], p.withEngine[1]) :
            random(p.standart[0], p.standart[1]);
    },
    registerSapling: function (a, b) {
        WoodIncubatorRecipes.sapling[a.id + ":" + a.data] = b;
    },
    getSapling: function (id, data) {
        return WoodIncubatorRecipes.sapling[id + ":" + data] || { id: 6, data: 0 };
    }
};
OresAPI.registerBlock("woodIncubator", true, [
    { name: "Wood Incubator", texture: [["woodBot", 0], ["woodTop", 0], ["MBot", 0], ["woodFront", 0], ["MBot", 0], ["woodSide", 0]], inCreative: true }
], "opaque", [{ ru: "Древесный Инкубатор" }], energyNameOverride(6, "machine", 2));
Callback.addCallback("PostLoaded", function () {
    OresAPI.addShapedRecipe([BlockID.woodIncubator, 1, 0], ["tdt", "rgr", "ttt"], ["t", ItemID.ingotLead, -1, "d", 3, 0, "g", 266, 0, "r", 331, 0]);
});
Callback.addCallback("PostLoaded", function () {
    MachineRecipeRegistry.registerRecipesFor("woodIncubator", {
        "6:0": { id: 17, count: 20, data: 0 },
        "6:1": { id: 17, count: 20, data: 1 },
        "6:2": { id: 17, count: 20, data: 2 },
        "6:3": { id: 17, count: 20, data: 3 },
        "6:4": { id: 17, count: 20, data: 4 },
        "6:5": { id: 17, count: 20, data: 5 }
    });
    for (var i = 0; i <= 5; i++) {
        WoodIncubatorRecipes.registerSapling({ id: 6, data: i }, { id: 6, data: i });
    }
    WoodIncubatorRecipes.registerSpecialDrop(6, { standart: [1, 2], withEngine: [3, 6] }, 0, { id: 260, data: 0 });
});
ModAPI.addAPICallback("ICore", function (api) {
    IDRegistry.genBlockID("rubberTreeSaplingPrototype");
    Block.createBlock("rubberTreeSaplingPrototype", [
        { name: "", texture: [["rubber_tree_sapling", 0]], inCreative: false }
    ], { rendertype: 1 });
    var setEmptyCollisionShape = api.requireGlobal("TileRenderer.setEmptyCollisionShape");
    Block.setDestroyTime(BlockID.rubberTreeSaplingPrototype, 0);
    ToolAPI.registerBlockMaterial(BlockID.rubberTreeSaplingPrototype, "plant");
    Block.setShape(BlockID.rubberTreeSaplingPrototype, 1 / 8, 0, 1 / 8, 7 / 8, 1, 7 / 8);
    setEmptyCollisionShape(BlockID.rubberTreeSaplingPrototype);
    Block.registerDropFunction("rubberTreeSaplingPrototype", function () {
        return [[ItemID.rubberSapling, 1, 0]];
    });
    Callback.addCallback("PostLoaded", function () {
        MachineRecipeRegistry.addRecipeFor("woodIncubator", ItemID.rubberSapling, { id: BlockID.rubberTreeLog, count: 20, data: 0 });
        WoodIncubatorRecipes.registerSapling({ id: ItemID.rubberSapling, data: 0 }, { id: BlockID.rubberTreeSaplingPrototype, data: 0 });
        WoodIncubatorRecipes.registerSpecialDrop(ItemID.rubberSapling, { standart: [2, 5], withEngine: [10, 15] }, 0, { id: ItemID.latex, data: 0 });
    });
});
MachineRegistry.registerElectricMachine(BlockID.woodIncubator, {
    defaultValues: {
        active: false,
        block: false,
        blockCoords: null,
        sourceData: null,
        work_time: OresAPI.getConfigValue("wood_incubator.work_time"),
        Sapling: null,
        boost: false,
        wood: [
            OresAPI.getConfigValue("wood_incubator.wood_output_count.min"),
            OresAPI.getConfigValue("wood_incubator.wood_output_count.max")
        ],
        sapling: [
            OresAPI.getConfigValue("wood_incubator.saplings_output_count.min"),
            OresAPI.getConfigValue("wood_incubator.saplings_output_count.max")
        ],
        consumption: OresAPI.getConfigValue("wood_incubator.energy_consumption")
    },
    getScreenByName: function () {
        return gui.woodIncubator;
    },
    getTier: function () {
        return OresAPI.getConfigValue("wood_incubator.tier");
    },
    getEnergyStorage: function () {
        return OresAPI.getConfigValue("wood_incubator.energy_storage");
    },
    tick: function () {
        this.updateData();
        if (this.data.block) {
            if (this.checkBlock()) {
                if (this.processCondition()) {
                    if (!this.data.active) {
                        this.startProcessing();
                    }
                    else {
                        if (this.data.energy >= this.data.consumption) {
                            if (this.checkSapling()) {
                                this.data.energy -= this.data.consumption;
                                this.data.progress += 1 / this.data.work_time;
                                //Debug.m(this.data.progress);
                            }
                        }
                    }
                    if (this.engine.id == 351 && this.engine.data == 15) {
                        if (!this.data.boost)
                            this.boostValues();
                    }
                    else if (this.data.boost) {
                        this.returnValues();
                    }
                    if (this.data.progress >= 1) {
                        var c = this.data.blockCoords;
                        var special = WoodIncubatorRecipes.getSpecialDrop(this.data.sourceData[0], this.data.sourceData[1]);
                        this.resultSlot.setSlot(this.result.id, this.resultSlot.count + random(this.data.wood[0], this.data.wood[1]), this.result.data);
                        this.sapling.setSlot(this.data.sourceData[0], this.sapling.count + random(this.data.sapling[0], this.data.sapling[1]), this.data.sourceData[1]);
                        if (special) {
                            var count = WoodIncubatorRecipes.getDropCount(this.data.sourceData[0], this.data.sourceData[1], this.data.boost);
                            if ((this.special.id == 0 || this.special.id == special.id && this.special.data == special.data)) {
                                this.special.setSlot(special.id, this.special.count + count, special.data);
                            }
                            else {
                                this.blockSource.drop(c[0], c[1] + 1, c[2], special.id, count, special.data);
                            }
                        }
                        if (this.data.boost) {
                            this.engine.setSlot(this.engine.id, this.engine.count - 1, this.engine.data);
                            this.engine.validate();
                            this.data.boost = false;
                        }
                        this.data.progress = 0;
                        this.data.active = false;
                        this.blockSource.setBlock(c[0], c[1] + 1, c[2], 0);
                    }
                }
            }
        }
        else
            this.searchBlock();
        this.container.sendChanges();
    },
    canReceiveEnergy: function (side) {
        var data = this.blockSource.getBlockData(this.x, this.y, this.z);
        var getSide = RelativeAPI.getRelativeSide;
        var sides = [1, getSide(data, 0), getSide(data, 3)];
        for (var i in sides) {
            if (side == sides[i])
                return false;
        }
        return true;
    },
    searchBlock: function () {
        if (!this.data.blockCoords) {
            this.data.blockCoords = RelativeAPI.getRelativeCoordsArray({ x: this.x, y: this.y, z: this.z }, 3);
        }
        c = this.data.blockCoords;
        if ([2, 3].indexOf(this.blockSource.getBlockId(c[0], c[1], c[2])) > -1) {
            this.data.block = true;
            //Debug.message("зачекал!");
        }
    },
    checkBlock: function () {
        if (Math.random() < 0.02) {
            var c = this.data.blockCoords;
            b = this.blockSource.getBlockId(c[0], c[1], c[2]);
            if ([2, 3].indexOf(b) > -1) {
                return true;
            }
            else {
                this.data.blockCoords = this.data.block = this.data.active = false;
                this.data.progress = 0;
                //Debug.error("п5л");
            }
        }
        else
            return true;
    },
    updateData: function () {
        this.source = this.container.getSlot("materialSlot");
        this.engine = this.container.getSlot("engineSlot");
        this.resultSlot = this.container.getSlot("inputSlot");
        this.sapling = this.container.getSlot("saplingSlot");
        this.special = this.container.getSlot("specialSlot");
        if (!this.data.active)
            this.result = MachineRecipeRegistry.getRecipeResult("woodIncubator", this.source.id, this.source.data);
        else {
            this.result = MachineRecipeRegistry.getRecipeResult("woodIncubator", this.data.sourceData[0], this.data.sourceData[1]);
            if (World.getThreadTime() % 10 == 0) {
                var c = this.data.blockCoords;
                var b = this.data.Sapling;
                this.blockSource.setBlock(c[0], c[1] + 1, c[2], b.id, b.data);
            }
        }
        this.container.setScale("processScale", this.data.progress);
        this.container.setScale("energyScale", this.data.energy / this.getEnergyStorage());
    },
    processCondition: function () {
        if ((this.result && (this.result.id == this.resultSlot.id && this.result.data == this.resultSlot.data || this.resultSlot.id == 0)) || this.data.active)
            return true;
    },
    startProcessing: function () {
        var c = this.data.blockCoords, data = this.source.data;
        var block = WoodIncubatorRecipes.getSapling(this.source.id, data);
        //NativeAPI.setTileUpdateAllowed(false);
        this.blockSource.setBlock(c[0], c[1] + 1, c[2], block.id, block.data);
        //NativeAPI.setTileUpdateAllowed(true);
        this.data.Sapling = block;
        this.data.sourceData = [this.source.id, data];
        this.source.setSlot(this.source.id, this.source.count - 1, this.source.data);
        this.source.validate();
        this.data.active = true;
        //Debug.message("стартануло");
        //BlockRenderer.forceRenderRebuild(c[0], c[1]+1, c[2], 0);
        this.data.progress += 1 / this.data.work_time;
    },
    checkSapling: function () {
        var c = this.data.blockCoords;
        var b = this.blockSource.getBlock(c[0], c[1] + 1, c[2]);
        if (b.id == this.data.Sapling.id) {
            //Game.tipMessage(b.data);
            return true;
        }
        //Debug.warning("потеряно");
        this.data.progress = 0;
        this.data.active = false;
        return false;
    },
    boostValues: function () {
        this.data.work_time = OresAPI.getConfigValue("wood_incubator.work_time_with_boost");
        this.data.wood = [
            OresAPI.getConfigValue("wood_incubator.wood_output_count_with_boost.min"),
            OresAPI.getConfigValue("wood_incubator.wood_output_count_with_boost.max")
        ];
        this.data.sapling = [
            OresAPI.getConfigValue("wood_incubator.saplings_output_count_with_boost.min"),
            OresAPI.getConfigValue("wood_incubator.saplings_output_count_with_boost.max")
        ];
        this.data.consumption = OresAPI.getConfigValue("wood_incubator.energy_consumption_with_boost");
        this.data.boost = true;
        //Debug.message("забустил!");
    },
    returnValues: function () {
        this.data.work_time = OresAPI.getConfigValue("wood_incubator.work_time");
        this.data.wood = [
            OresAPI.getConfigValue("wood_incubator.wood_output_count.min"),
            OresAPI.getConfigValue("wood_incubator.wood_output_count.max")
        ];
        this.data.sapling = [
            OresAPI.getConfigValue("wood_incubator.saplings_output_count.min"),
            OresAPI.getConfigValue("wood_incubator.saplings_output_count.max")
        ];
        this.data.consumption = OresAPI.getConfigValue("wood_incubator.energy_consumption");
        //Debug.message("буст п5н");
        this.data.boost = false;
    }
});
addToRenderGroup(BlockID.woodIncubator, "ic-wire");
EnergyTileRegistry.addEnergyTypeForId(BlockID.woodIncubator, EU);
OresAPI.registerOre({
    source: { material: "adamantite" },
    ore: OresAPI.createObject("ore", "adamantite"),
    translations: {
        source: { ru: "Адамантитовый Слиток" },
        ore: [{ ru: "Адамантитовая Руда" }],
        oreBlock: [{ ru: "Адамантитовый Блок" }]
    },
    overrideNames: {
        itemColor: 4,
        source: { standart: true },
        ore: { standart: true },
        oreBlock: { standart: true }
    }
});
OresAPI.registerTools({
    toolMaterial: OresAPI.createObject("tools", "adamantite"),
    recipes: { primary: ItemID.ingotAdamantite },
    translations: {
        sword: { ru: "Адамантитовый Меч" },
        pickaxe: { ru: "Адамантитовая Кирка" },
        axe: { ru: "Адамантитовый Топор" },
        hoe: { ru: "Адамантитовая Мотыга" },
        shovel: { ru: "Адамантитовая Лопата" }
    },
    overrideNames: {
        standart: true,
        itemsColor: 4
    }
});
OresAPI.registerArmor({
    material: "adamantite",
    properties: OresAPI.createObject("armor", "adamantite"),
    translations: {
        helmet: { ru: "Адамантитовый Шлем" },
        chestplate: { ru: "Адамантитовый Нагрудник" },
        leggings: { ru: "Адамантитовые Поножи" },
        boots: { ru: "Адамантитовые Ботинки" }
    },
    overrideNames: {
        standart: true,
        itemsColor: 4
    }
});
OresAPI.registerOre({
    source: { material: "lavarite" },
    ore: {
        requiredToolLvl: OresAPI.getConfigValue("lavarite.tool_lvl"),
        veinSize: {
            min: OresAPI.getConfigValue("lavarite.veins.size.min"),
            max: OresAPI.getConfigValue("lavarite.veins.size.max")
        },
        veinsInChunk: OresAPI.getConfigValue("lavarite.veins.amount_in_chunk"),
        depthGeneration: {
            min: OresAPI.getConfigValue("lavarite.depth_ore_generation.min"),
            max: OresAPI.getConfigValue("lavarite.depth_ore_generation.max")
        },
        dimension: "GenerateNetherChunk",
        oreSpecialParams: {
            lightlevel: 11
        },
        blockSpecialParams: {
            lightlevel: 13
        },
        customOreGen: function () { }
    },
    translations: {
        source: { ru: "Лаваритовый Слиток" },
        ore: [{ ru: "Лаваритовая Руда" }],
        oreBlock: [{ ru: "Лаваритовый Блок" }]
    },
    overrideNames: {
        itemColor: "c",
        source: { standart: true },
        ore: { standart: true },
        oreBlock: { standart: true }
    }
});
//генерация лаварита и леотита
Callback.addCallback("GenerateNetherChunk", function (cx, cz) {
    var maxIterationsCount = 100;
    var leotiteMin = OresAPI.getConfigValue("leotite.depth_ore_generation.min");
    var leotiteMax = OresAPI.getConfigValue("leotite.depth_ore_generation.max");
    var lavariteMin = OresAPI.getConfigValue("lavarite.depth_ore_generation.min");
    var lavariteMax = OresAPI.getConfigValue("lavarite.depth_ore_generation.max");
    for (var i = 0; i < maxIterationsCount; i++) {
        var coords = GenerationUtils.randomCoords(cx, cz, leotiteMin, leotiteMax);
        OreGenerationHelper.findAllAndPlace(coords.x, coords.y, coords.z, BlockID.oreLeotite, 89, "leotite");
        coords = GenerationUtils.randomCoords(cx, cz, lavariteMin, lavariteMax);
        OreGenerationHelper.findAllAndPlace(coords.x, coords.y, coords.z, BlockID.oreLavarite, 213, "lavarite");
    }
});
OresAPI.registerOre({
    source: { material: "lead" },
    ore: OresAPI.createObject("ore", "lead"),
    translations: {
        source: { ru: "Свинцовый Слиток" },
        ore: [{ ru: "Свинцовая Руда" }],
        oreBlock: [{ ru: "Свинцовый Блок" }]
    },
    overrideNames: {
        itemColor: 9,
        source: { standart: true },
        ore: { standart: true },
        oreBlock: { standart: true }
    }
});
OresAPI.registerTools({
    toolMaterial: OresAPI.createObject("tools", "lead"),
    recipes: { primary: ItemID.ingotLead },
    translations: {
        sword: { ru: "Свинцовый Меч" },
        pickaxe: { ru: "Свинцовая Кирка" },
        axe: { ru: "Свинцовый Топор" },
        hoe: { ru: "Свинцовая Мотыга" },
        shovel: { ru: "Свинцовая Лопата" }
    },
    overrideNames: {
        standart: true,
        itemsColor: 9
    }
});
OresAPI.registerArmor({
    material: "lead",
    properties: OresAPI.createObject("armor", "lead"),
    translations: {
        helmet: { ru: "Свинцовый Шлем" },
        chestplate: { ru: "Свинцовый Нагрудник" },
        leggings: { ru: "Свинцовые Поножи" },
        boots: { ru: "Свинцовые Ботинки" }
    },
    overrideNames: {
        standart: true,
        itemsColor: 9
    }
});
OresAPI.registerOre({
    source: { material: "leotite", sourceType: "formations" },
    ore: {
        requiredToolLvl: OresAPI.getConfigValue("leotite.tool_lvl"),
        veinSize: {
            min: OresAPI.getConfigValue("leotite.veins.size.min"),
            max: OresAPI.getConfigValue("leotite.veins.size.max")
        },
        oreDrop: [[ItemID.formationsLeotite, "2-4", 0]],
        veinsInChunk: 1,
        depthGeneration: {
            min: 1,
            max: 1
        },
        oreSpecialParams: { lightlevel: 11 },
        blockSpecialParams: {
            lightlevel: 12
        },
        dimension: "GenerateNetherChunk",
        customOreGen: function () { }
    },
    translations: {
        source: { ru: "Леотитовые Образования" },
        ore: [{ ru: "Леотовая Руда" }],
        oreBlock: [{ ru: "Леотитовый Блок" }]
    },
    overrideNames: {
        itemColor: 3,
        source: { standart: true },
        ore: { standart: true },
        oreBlock: { standart: true }
    }
});
OresAPI.registerOre({
    source: { material: "malachite" },
    ore: OresAPI.createObject("ore", "malachite"),
    translations: {
        source: { ru: "Малахитовый Слиток" },
        ore: [{ ru: "Малахитовая Руда" }],
        oreBlock: [{ ru: "Малахитовый Блок" }]
    },
    overrideNames: {
        itemColor: "a",
        source: { standart: true },
        ore: { standart: true },
        oreBlock: { standart: true }
    }
});
OresAPI.registerTools({
    toolMaterial: OresAPI.createObject("tools", "malachite"),
    recipes: { primary: ItemID.ingotMalachite },
    translations: {
        sword: { ru: "Малахитовый Меч" },
        pickaxe: { ru: "Малахитовая Кирка" },
        shovel: { ru: "Малахитовая Лопата" },
        axe: { ru: "Махалитовый Топор" },
        hoe: { ru: "Малахитовая Мотыга" }
    },
    overrideNames: {
        standart: true,
        itemsColor: "a"
    }
});
OresAPI.registerArmor({
    material: "malachite",
    properties: {
        durability: OresAPI.getConfigValue("malachite.tools.durability"),
        helmet: { armor: OresAPI.getConfigValue("malachite.armor_points.helmet") },
        chestplate: { armor: OresAPI.getConfigValue("malachite.armor_points.chestplate") },
        leggings: { armor: OresAPI.getConfigValue("malachite.armor_points.leggings") },
        boots: { armor: OresAPI.getConfigValue("malachite.armor_points.boots") }
    },
    translations: {
        helmet: { ru: "Малахитовый Шлем" },
        chestplate: { ru: "Малахитовый Нагрудник" },
        leggings: { ru: "Малахитовые Поножи" },
        boots: { ru: "Малахитовые Ботинки" }
    },
    overrideNames: {
        standart: true,
        itemsColor: "a"
    }
});
OresAPI.registerOre({
    source: { material: "mionite", sourceType: "nugget" },
    ore: {
        requiredToolLvl: OresAPI.getConfigValue("mionite.tool_lvl"),
        veinSize: {
            min: OresAPI.getConfigValue("mionite.veins.size.min"),
            max: OresAPI.getConfigValue("mionite.veins.size.max")
        },
        oreDrop: [[ItemID.nuggetMionite, 1, 0]],
        veinsInChunk: 1,
        depthGeneration: {
            min: 1,
            max: 1
        },
        oreSpecialParams: { lightlevel: 11 },
        blockSpecialParams: {
            lightlevel: 12
        },
        dimension: "GenerateEndChunk",
        customOreGen: function () { }
    },
    oreDrop: [[ItemID.nuggetMionite, "1-2", 0]],
    translations: {
        source: { ru: "Самородок мионита" },
        ore: [{ ru: "Мионитовая руда" }],
        oreBlock: [{ ru: "Мионитовый блок" }]
    },
    overrideNames: {
        itemColor: 5,
        source: { standart: true },
        ore: { standart: true },
        oreBlock: { standart: true }
    },
    dimension: "GenerateEndChunk",
    customOreGen: function (cx, cz) {
        for (var i = 0; i < OresAPI.getConfigValue("mionite.veins.amount_in_chunk"); i++) {
            var coords = GenerationUtils.randomCoords(cx, cz, 18, 70);
            var count = random(OresAPI.getConfigValue("mionite.veins.size.min"), OresAPI.getConfigValue("mionite.veins.size.max"));
            GenerationUtils.generateOreCustom(coords.x, coords.y, coords.z, BlockID.oreMionite, 0, count, true, [121]);
            alert("сетнул");
        }
    }
});
Callback.addCallback("GenerateEndChunk", function (cx, cz) {
    for (var i = 0; i < OresAPI.getConfigValue("mionite.veins.amount_in_chunk"); i++) {
        var coords = GenerationUtils.randomCoords(cx, cz, 18, 70);
        var count = random(OresAPI.getConfigValue("mionite.veins.size.min"), OresAPI.getConfigValue("mionite.veins.size.max"));
        GenerationUtils.generateOreCustom(coords.x, coords.y, coords.z, BlockID.oreMionite, 0, count, true, [121]);
    }
});
ItemAnimator.registerItemAnimation({ id: ItemID.nuggetMionite }, [{ name: "mionite_nugget", data: 8 },
    { name: "mionite_nugget", data: 8 },
    { name: "mionite_nugget", data: 7 },
    { name: "mionite_nugget", data: 6 },
    { name: "mionite_nugget", data: 0 },
    { name: "mionite_nugget", data: 1 },
    { name: "mionite_nugget", data: 2 },
    { name: "mionite_nugget", data: 3 },
    { name: "mionite_nugget", data: 4 },
    { name: "mionite_nugget", data: 5 }], 3);
OresAPI.registerOre({
    source: { material: "sapphire", sourceType: "crystal" },
    ore: OresAPI.createObject("ore", "sapphire", [[ItemID.crystalSapphire, 2, 0]]),
    translations: {
        source: { ru: "Сапфировый Кристалл" },
        ore: [{ ru: "Сапфировая Руда" }],
        oreBlock: [{ ru: "Сапфировый Блок" }]
    },
    overrideNames: {
        itemColor: 1,
        source: { standart: true },
        ore: { standart: true },
        oreBlock: { standart: true }
    }
});
OresAPI.registerTools({
    toolMaterial: OresAPI.createObject("tools", "sapphire"),
    recipes: { primary: ItemID.crystalSapphire },
    translations: {
        sword: { ru: "Сапфировый Меч" },
        pickaxe: { ru: "Сапфировая Кирка" },
        axe: { ru: "Сапфировый Топор" },
        hoe: { ru: "Сапфировая Мотыга" },
        shovel: { ru: "Сапфировая Лопата" }
    },
    overrideNames: {
        standart: true,
        itemsColor: 1
    }
});
OresAPI.registerArmor({
    material: "sapphire",
    materialID: "crystalSapphire",
    properties: OresAPI.createObject("armor", "sapphire"),
    translations: {
        helmet: { ru: "Сапфировый Шлем" },
        chestplate: { ru: "Сапфировый Нагрудник" },
        leggings: { ru: "Сапфировые Поножи" },
        boots: { ru: "Сапфировые Ботинки" }
    },
    overrideNames: {
        standart: true,
        itemsColor: 1
    }
});
OresAPI.registerOre({
    source: { material: "uranium" },
    ore: OresAPI.createObject("ore", "uranium"),
    translations: {
        source: { ru: "Ураниумовый Слиток" },
        ore: [{ ru: "Ураниумовая Руда" }],
        oreBlock: [{ ru: "Ураниумовый Блок" }]
    },
    overrideNames: {
        itemColor: 2,
        source: { standart: true },
        ore: { standart: true },
        oreBlock: { standart: true }
    }
});
OresAPI.registerTools({
    toolMaterial: OresAPI.createObject("tools", "uranium"),
    recipes: { primary: ItemID.ingotUranium },
    translations: {
        sword: { ru: "Ураниумовый Меч" },
        pickaxe: { ru: "Ураниумовая Кирка" },
        axe: { ru: "Ураниумовый Топор" },
        hoe: { ru: "Ураниумовая Мотыга" },
        shovel: { ru: "Ураниумовая Лопата" }
    },
    overrideNames: {
        standart: true,
        itemsColor: 2
    }
});
OresAPI.registerArmor({
    material: "uranium",
    properties: OresAPI.createObject("armor", "uranium"),
    translations: {
        helmet: { ru: "Ураниумовый Шлем" },
        chestplate: { ru: "Ураниумовый Нагрудник" },
        leggings: { ru: "Ураниумовые Поножи" },
        boots: { ru: "Ураниумовые Ботинки" }
    },
    overrideNames: {
        standart: true,
        itemsColor: 2
    }
});
