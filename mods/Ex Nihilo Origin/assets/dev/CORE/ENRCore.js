var ExNihiloOriginVERSION = "2.3.2beta";
ItemModel.setCurrentCacheGroup("Ex Nihilo Origin", ExNihiloOriginVERSION);
var UIbase = UI.getScreenHeight();
var EntityDataRegistry = ModAPI.requireGlobal("EntityDataRegistry")
Callback.addCallback("LevelLoaded", function() {
    delete World.destroyBlock
    World.destroyBlock = function(x, y, z, drop, player) {
        var tile = World.getBlock(x, y, z);
        Callback.invokeCallback("DestroyBlock_hook", {
            x: x,
            y: y,
            z: z,
            side: 1,
            relative: {
                "x": 0,
                "y": 0,
                "z": 0
            }
        }, tile, player);
        if (drop) {


            player = player || Player.get();

            let blockSource = BlockSource.getDefaultForActor(player);
            Block.onBlockDestroyed({
                x: x,
                y: y,
                z: z
            }, tile, false, true, blockSource, player, Entity.getCarriedItem(player));
        }
        Level.destroyBlock(x, y, z, drop);

    }

});




function containerSlot(object, name) {
    var TileEntity = object;
    return TileEntity.container.getSlot(name);
}

ToolType.mesh = {
    damage: 0,
    blockTypes: [],
    onDestroy: function(item) {
        return true;
    },
    onAttack: function(item) {
        return true;
    }
};

function setDrop(block, it) {
    Block.registerDropFunctionForID(block, function(id, data) {
        return [[it, 1, 0]];
    });
}
var EXCore = /** @class */ (function() {
    function EXCore() {}
    var _a;
    _a = EXCore;
    EXCore.isHammer = {};
    EXCore.Hammer = {};
    EXCore.Mesh = {};
    EXCore.sieve = {};
    EXCore.gravelTYPE = {
        sound: "gravel",
        base: VanillaBlockID.gravel,
        solid: true
    };
    EXCore.sandTYPE = {
        sound: "sand",
        base: VanillaBlockID.sand,
        solid: true
    };
    EXCore.registerBroken = function(metal) {
        IDRegistry.genItemID("ex_" + metal + "broken");
        Item.createItem("ex_" + metal + "broken", "Broken " + metal + " Ore", {
            name: "ex_" + metal + "broken",
            meta: 0
        });
        Item.addCreativeGroup("Ore Broken", Translation.translate("Broken Ore"), [ItemID["ex_" + metal + "broken"]]);
    };
    EXCore.registerNetherBroken = function(metal) {
        IDRegistry.genItemID("ex_nether" + metal + "broken");
        Item.createItem("ex_nether" + metal + "broken", "Nether Broken " + metal + " Ore", {
            name: "ex_nether" + metal + "broken",
            meta: 0
        });
        Item.addCreativeGroup("Ore Broken", Translation.translate("Broken Ore"), [ItemID["ex_nether" + metal + "broken"]]);
    };
    EXCore.registerEnderBroken = function(metal) {
        IDRegistry.genItemID("ex_ender" + metal + "broken");
        Item.createItem("ex_ender" + metal + "broken", "Ender Broken " + metal + " Ore", {
            name: "ex_ender" + metal + "broken",
            meta: 0
        });
        Item.addCreativeGroup("Ore Broken", Translation.translate("Broken Ore"), [ItemID["ex_ender" + metal + "broken"]]);
    };
    EXCore.registerGravel = function(metal) {
        IDRegistry.genBlockID("ex_" + metal + "gravel");
        Block.createBlock("ex_" + metal + "gravel", [{
            name: metal + " Ore Gravel",
            texture: [
                ["ex_" + metal + "gravel", 0]
            ],
            inCreative: true
        }], _a.gravelTYPE);
        ToolAPI.registerBlockMaterial(BlockID["ex_" + metal + "gravel"], "stone");
        EXCore.registerDropType("ex_" + metal + "gravel", "ex__" + metal + "gravel");
        EXCore.Hammer[eval("BlockID.ex_" + metal + "gravel")] = {
            output: "crushed",
            data: metal
        };
        EXCore._transformation(eval("BlockID.ex_" + metal + "gravel"));
        Item.addCreativeGroup("Ore Gravel", Translation.translate("Ore Gravel"), [BlockID["ex_" + metal + "gravel"]]);
        Recipes.addShaped({
            id: BlockID["ex_" + metal + "gravel"],
            count: 1,
            data: 0
        }, ["nn", "nn", ""], ["n", ItemID["ex_" + metal + "broken"], -1]);
    };
    EXCore.registerNetherGravel = function(metal) {
        IDRegistry.genBlockID("ex_nether" + metal + "gravel");
        Block.createBlock("ex_nether" + metal + "gravel", [{
            name: "Nether " + metal + " Ore Gravel",
            texture: [
                ["ex_nether" + metal + "gravel", 0]
            ],
            inCreative: true
        }], _a.gravelTYPE);
        ToolAPI.registerBlockMaterial(BlockID["ex_nether" + metal + "gravel"], "stone");
        EXCore.registerDropType("ex_nether" + metal + "gravel", "ex_nether_" + metal + "gravel");
        Item.addCreativeGroup("Ore Gravel", Translation.translate("Ore Gravel"), [BlockID["ex_nether" + metal + "gravel"]]);
        Recipes.addShaped({
            id: BlockID["ex_nether" + metal + "gravel"],
            count: 1,
            data: 0
        }, ["nn", "nn", ""], ["n", ItemID["ex_nether" + metal + "broken"], -1]);
    };
    EXCore.registerEnderGravel = function(metal) {
        IDRegistry.genBlockID("ex_ender" + metal + "gravel");
        Block.createBlock("ex_ender" + metal + "gravel", [{
            name: "Ender " + metal + " Ore Gravel",
            texture: [
                ["ex_ender" + metal + "gravel", 0]
            ],
            inCreative: true
        }], _a.gravelTYPE);
        ToolAPI.registerBlockMaterial(BlockID["ex_ender" + metal + "gravel"], "stone");
        EXCore.registerDropType("ex_ender" + metal + "gravel", "ex_ender_" + metal + "gravel");
        Item.addCreativeGroup("Ore Gravel", Translation.translate("Ore Gravel"), [BlockID["ex_ender" + metal + "gravel"]]);
        Recipes.addShaped({
            id: BlockID["ex_ender" + metal + "gravel"],
            count: 1,
            data: 0
        }, ["nn", "nn", ""], ["n", ItemID["ex_ender" + metal + "broken"], -1]);
    };
    EXCore.registerSand = function(metal) {
        IDRegistry.genBlockID("ex_" + metal + "sand");
        Block.createBlock("ex_" + metal + "sand", [{
            name: metal + " Ore Sand",
            texture: [
                ["ex_" + metal + "sand", 0]
            ],
            inCreative: true
        }], _a.sandTYPE);
        ToolAPI.registerBlockMaterial(BlockID["ex_" + metal + "sand"], "stone");
        EXCore.registerDropType("ex_" + metal + "sand", "ex__" + metal + "sand");
        EXCore.Hammer[eval("BlockID.ex_" + metal + "sand")] = {
            output: "Powdered",
            data: metal
        };
        EXCore._transformation(eval("BlockID.ex_" + metal + "sand"));
        Item.addCreativeGroup("Ore Sand", Translation.translate("Ore Sand"), [BlockID["ex_" + metal + "sand"]]);
        Recipes.addShaped({
            id: BlockID["ex_" + metal + "sand"],
            count: 1,
            data: 0
        }, ["nn", "nn", ""], ["n", ItemID["ex_" + metal + "crushed"], -1]);
    };
    EXCore.registerCrushed = function(metal) {
        IDRegistry.genItemID("ex_" + metal + "crushed");
        Item.createItem("ex_" + metal + "crushed", "Crushed " + metal + " Ore", {
            name: "ex_" + metal + "crushed",
            meta: 0
        });
        Item.addCreativeGroup("Ore Crushed", Translation.translate("Crushed Ore"), [ItemID["ex_" + metal + "crushed"]]);
    };
    EXCore.registerDust = function(metal) {
        IDRegistry.genBlockID("ex_" + metal + "dust");
        Block.createBlock("ex_" + metal + "dust", [{
            name: metal + " Ore Dust",
            texture: [
                ["ex_" + metal + "dust", 0]
            ],
            inCreative: true
        }], _a.sandTYPE);
        ToolAPI.registerBlockMaterial(BlockID["ex_" + metal + "dust"], "stone");
        EXCore.registerDropType("ex_" + metal + "dust", "ex__" + metal + "dust");
        Item.addCreativeGroup("Ore Dust", Translation.translate("Ore Dust"), [BlockID["ex_" + metal + "dust"]]);
        Recipes.addShaped({
            id: BlockID["ex_" + metal + "dust"],
            count: 1,
            data: 0
        }, ["nn", "nn", ""], ["n", ItemID["ex_" + metal + "Powdered"], -1]);
    };
    EXCore.registerPowdered = function(metal) {
        IDRegistry.genItemID("ex_" + metal + "Powdered");
        Item.createItem("ex_" + metal + "Powdered", "Powdered " + metal + " Ore", {
            name: "ex_" + metal + "powdered",
            meta: 0
        });
        Item.addCreativeGroup("Ore Powdered", Translation.translate("Powdered Ore"), [ItemID["ex_" + metal + "Powdered"]]);
    };
    EXCore.setTag = function(entity, string) {
        var tag = Entity.getCompoundTag(entity);
        var FallingBlockTag = tag.getCompoundTag("FallingBlock");
        FallingBlockTag.putString("name", "minecraft:block_" + string);
        tag.putCompoundTag("FallingBlock", FallingBlockTag);
        Entity.setCompoundTag(entity, tag);
    };
    EXCore.registerDropType = function(string, string2) {


        Callback.addCallback("onBlockPlace", function(x,y,z,blockSource) {
            var ani_item = new Animation.Item(x + 0.5, y + 0.5, z + 0.5);
            ani_item.describeItem({
                id: BlockID[string],
                count: 1,
                data: 0,
                size: 1.02
            });
            Updatable.addUpdatable({
                time: 0,
                update: function() {
                    this.time++;
                    if (blockSource.getBlockId(x, y, z) == BlockID[string] && blockSource.getBlockId(x, y - 1, z) == 0 && this.time == 2) {
                        ani_item.load();
                        blockSource.setBlock(x, y, z, 0, 0);
                        var entity = Entity.spawn(x + 0.5, y + 0.25, z + 0.5, 66);
                        EXCore.setTag(entity, string2);
                        Entity.setPosition(entity, x + 0.5, y + 0.25, z + 0.5);
                    } else if (ani_item && this.time >= 6) {
                        this.remove = true;
                        ani_item.destroy();
                    }
                }
            });
        });

        Block.registerNeighbourChangeFunction(string, function(coords, block, changedCoords, blockSource) {
            var ani_item = new Animation.Item(coords.x + 0.5, coords.y + 0.5, coords.z + 0.5);
            ani_item.describeItem({
                id: BlockID[string],
                count: 1,
                data: 0,
                size: 1.02
            });
            Updatable.addUpdatable({
                time: 0,
                update: function() {
                    this.time++;
                  
                    if (changedCoords.y + 1 == coords.y && blockSource.getBlockId(changedCoords.x, changedCoords.y, changedCoords.z) == 0 && this.time == 2) {
                        ani_item.load();
                        blockSource.setBlock(coords.x, coords.y, coords.z, 0, 0);
                        var entity = Entity.spawn(coords.x + 0.5, coords.y + 0.25, coords.z + 0.5, 66);
                        EXCore.setTag(entity, string2);
                        Entity.setPosition(entity, coords.x + 0.5, coords.y + 0.25, coords.z + 0.5);
                    } else if (ani_item && this.time >= 6) {
                        this.remove = true;
                        ani_item.destroy();
                    }
                }
            });
        });

    };
    EXCore.registerIngot = function(nameID, name) {
        IDRegistry.genItemID(nameID);
        Item.createItem(nameID, name, {
            name: "ex_" + nameID,
            meta: 0
        });
        Item.addCreativeGroup("Ingots", Translation.translate("Ingots"), [ItemID[nameID]]);
    };
    EXCore.registerMesh = function(metal, number1, number2, group) {
        IDRegistry.genItemID("ex_mesh" + metal);
        Item.createItem("ex_mesh" + metal, metal + " Mesh", {
            name: "ex_" + metal + "Mesh",
            meta: 0
        });
        _a.Mesh[ItemID["ex_mesh" + metal]] = {
            group: group,
            data: metal,
            dropchance: number1
        };
        ToolAPI.setTool(ItemID["ex_mesh" + metal], {
            durability: number2,
            level: 0,
            efficiency: 0,
            damage: 0
        }, ToolType.mesh);
        Item.addCreativeGroup("mesh", Translation.translate("Mesh"), [ItemID["ex_mesh" + metal]]);
    };
    EXCore.register_1 = function(metal) {
        _a.registerBroken(metal);
        _a.registerNetherBroken(metal);
        _a.registerEnderBroken(metal);
        _a.registerGravel(metal);
        _a.registerNetherGravel(metal);
        _a.registerEnderGravel(metal);
        _a.registerCrushed(metal);
        _a.registerSand(metal);
        _a.registerPowdered(metal);
        _a.registerDust(metal);
    };
    EXCore.register_2 = function(metal, outid, outdata) {
        Recipes.addFurnace(BlockID["ex_" + metal + "gravel"], outid, outdata);
        Recipes.addFurnace(BlockID["ex_" + metal + "sand"], outid, outdata);
        Recipes.addFurnace(BlockID["ex_" + metal + "dust"], outid, outdata);
        Recipes.addFurnace(BlockID["ex_nether" + metal + "gravel"], outid, outdata);
        Recipes.addFurnace(BlockID["ex_ender" + metal + "gravel"], outid, outdata);
    };
    EXCore.register = function(metal, outid, outdata) {
        _a.register_1(metal);
        _a.register_2(metal, outid, outdata);
    };
    EXCore.defineAllSalts = function(metal, texture) {
        IDRegistry.genBlockID("ex_oreSalts" + metal);
        Block.createBlock("ex_oreSalts" + metal, [{
            name: metal + " Ore Salts",
            texture: [
                [texture, 0]
            ],
            inCreative: true
        }]);
        Item.addCreativeGroup("oreSalts", Translation.translate("Ore Salts"), [BlockID["ex_oreSalts" + metal]]);
        IDRegistry.genItemID("ex_" + metal + "DustSalts");
        Item.createItem("ex_" + metal + "DustSalts", metal + " Dust Salts", {
            name: "ex_" + metal + "DustSalts",
            meta: 0
        });
        Item.addCreativeGroup("Salts", Translation.translate("Dust Salts"), [ItemID["ex_" + metal + "DustSalts"]]);
        var render = new ICRender.CollisionShape();
        var entry = render.addEntry();
        entry.addBox(1, 1, 1, 0, 0, 0);
        BlockRenderer.setCustomCollisionShape(BlockID["ex_oreSalts" + metal], 0, render);
        var render = new ICRender.Model();
        var model = BlockRenderer.Model();
        model.addBox(c7, c0, c7, c9, c4, c9, BlockID["ex_oreSalts" + metal], 0);
        model.addBox(c7, c0, c8, c8, c6, c9, BlockID["ex_oreSalts" + metal], 0);
        model.addBox(c8, c1, c7, c9, c7, c8, BlockID["ex_oreSalts" + metal], 0);
        model.addBox(c7, c1, c7, c8, c7, c8, BlockID["ex_oreSalts" + metal], 0);
        model.addBox(c8, c1, c8, c9, c7, c9, BlockID["ex_oreSalts" + metal], 0);
        model.addBox(c7, c0, c7, c9, c5, c9, BlockID["ex_oreSalts" + metal], 0);
        model.addBox(c7, c2, c11, c8, c8, c12, BlockID["ex_oreSalts" + metal], 0);
        model.addBox(c8, c2, c5, c9, c8, c6, BlockID["ex_oreSalts" + metal], 0);
        model.addBox(c10, c2, c8, c11, c9, c9, BlockID["ex_oreSalts" + metal], 0);
        model.addBox(c4, c3, c7, c5, c8, c8, BlockID["ex_oreSalts" + metal], 0);
        render.addEntry(model);
        BlockRenderer.setStaticICRender(BlockID["ex_oreSalts" + metal], 0, render);
        Recipes.addShaped({
            id: BlockID["ex_oreSalts" + metal],
            count: 1,
            data: 0
        }, ["ooo", "ooo", "ooo"], ["o", ItemID["ex_" + metal + "DustSalts"], -1]);
    };
    EXCore.registerHammer = function(ore, texture, meta) {
        IDRegistry.genItemID("ex_hammers" + ore);
        Item.createItem("ex_hammers" + ore, ore + " Hammer", {
            name: texture,
            meta: meta
        }, {
            stack: 1
        });
        _a.isHammer[ItemID["ex_hammers" + ore]] = {};
        Item.addCreativeGroup("Hammer", Translation.translate("Hammer"), [ItemID["ex_hammers" + ore]]);
    };
    EXCore.addHammer = function(id) {
        _a.isHammer[id] = {};
        Item.addCreativeGroup("Hammer", Translation.translate("Hammer"), [id]);
    };
    EXCore.transformation = function(blockid, id, count, data) {
        var fun = Block.getDropFunction(blockid);
        Block.registerDropFunctionForID(blockid, function(coords, blockId, blockData, level, enchant, item, blockSource) {
            if (EXCore.isHammer[item.id]) {
                return [[id, count, data]];
            } else {
                return fun && fun(coords, blockId, blockData, level, enchant, item, blockSource);
            };
        });
    };
    EXCore._transformation = function(blockID) {
        var fun = Block.getDropFunction(blockID);
        Block.registerDropFunctionForID(blockID, function(coords, blockId, blockData, level, enchant, item, blockSource) {
            var chance = Math.random() * 100;
            if (EXCore.isHammer[item.id]) {
                if (EXCore.Hammer[blockID].output) {
                    var count = chance < 3 ? 7 : (chance < 15 ? 6 : (chance < 35 ? 5 : 4));
                    return [[eval("ItemID.ex_" + EXCore.Hammer[blockID].data + EXCore.Hammer[blockID].output), count, 0]];
                };
            } else {
                return fun && fun(coords, blockId, blockData, level, enchant, item, blockSource);
            };
        });
    };
    return EXCore;
}());
var threadHelper = /** @class */ (function() {
    function threadHelper() {}
    threadHelper.setTimeout = function(func, time) {
        var Thread = new java.lang.Thread(new java.lang.Runnable({
            run: function() {
                Thread.sleep(time);
                try {
                    java.lang.Thread.yield();
                    func();
                } catch (e) {
                    Logger.Log("Thread is wrong.", "ERROR");
                    Logger.LogError(e);
                }
            }
        }));
        Thread.start();
        return Thread;
    };
    return threadHelper;
}());
var Crucible = /** @class */ (function() {
    function Crucible() {}
    Crucible.dataSet = function(data, object) {
        this.types[data] = object;
    };
    Crucible.dataGet = function(data, id, data1) {
        return eval(this.types[data][id + ":" + data1]);
    };
    Crucible.dataAdd = function(data, id, data1, object) {
        this.types[data][id + ":" + data1] = object;
    };
    Crucible.types = {};
    return Crucible;
}());
SoundManager.init(16);
SoundManager.setResourcePath(__dir__ + "sounds/");
SoundManager.registerSound("sieve.ogg", "sieve.ogg", false);
SoundManager.registerSound("meshbreak.ogg", "meshbreak.ogg", false);
Block.registerDropFunctionForID(421, function(id, data) {
    return [[VanillaBlockID.double_stone_slab4, 1, 2]];
});