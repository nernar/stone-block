    //*     StoneChestBE V. 1.1.Discontinue     *//
   //*   Create Mod By BuslnwTH    *//
 //*   Mod Optimize for Hozion    *//
//*   Thank you for Install Mod   *//

IMPORT("ToolType");
IMPORT("StorageInterface");

const GROUP_STONECHEST = "StoneChest";
const GROUP_STONEPART = "StonePart";
const StoneChest = {
    add: function (stonec, name, textures, inCreative, slots, tile, specType) {
        Block.createBlockWithRotation(stonec, [
            {name: name, texture: textures, inCreative: inCreative}
        ], specType);
      ToolAPI.registerBlockMaterial(BlockID[stonec], "stone", 1, true);
       Block.setDestroyTime(BlockID[stonec], 2);
       Item.addCreativeGroup(GROUP_STONECHEST, "StoneChest", [BlockID[stonec]]);
       ICRender.getGroup("item-pipe").add(BlockID[stonec], -1);
        this.createModel(BlockID[stonec]);
        let guiObj = {
            standart: {
                header: {
                    text: {
                        text: name
                    }
                },
                inventory: {
                    standart: true
                },
                background: {
                    standart: true
                }
            },
            drawing: [],
            elements: {}
        };

        for (let i = 0; i < slots; i++) {
            guiObj.elements[i] = {
                type: "slot",
                x: 350 + i % 10 * 61,
                y: 40 + Math.floor(i / 10) * 61,
                isValid: tile.isValid
            };
        }
        guiObj.standart.minHeight = 110 + slots / 10 * 61;

        let gui = new UI.StandartWindow(guiObj);

        tile.getGuiScreen = function () {
            return gui;
        };

        TileEntity.registerPrototype(BlockID[stonec], tile);

        let slotList = {};

        for (let i = 0; i < slots; i++) {
            slotList[i] = {
                input: false, //Error
                output: false, //Error

                isValid: function (item) {
                    return tile.isValid(item.id, item.data);
                },
            };
        }

        StorageInterface.createInterface(BlockID[stonec], {
            slots: slotList
        });
    },

    createModel: function (blockID) {
        Block.setBlockShape(blockID, {x: 0.07, y: 0, z: 0.07}, {x: 0.93, y: 0.87, z: 0.93});

        for (let i = 0; i < 4; i++) {
            let render = new ICRender.Model();
            BlockRenderer.setStaticICRender(blockID, i, render);

            let model = BlockRenderer.createModel();
            model.addBox(0.07, 0, 0.07, 0.93, 0.87, 0.93, blockID, i);

            switch (i) {
            	case 0:
                    model.addBox(0.43, 0.45, 0.93, 0.55, 0.7, 1, 42, 0);
                    break;
                case 1:
                    model.addBox(0.44, 0.45, 0, 0.57, 0.7, 0.07, 42, 0);
                    break;
                case 2:
                    model.addBox(0.93, 0.45, 0.45, 1, 0.7, 0.55, 42, 0);
                    break;
                case 3:
                    model.addBox(0, 0.45, 0.44, 0.07, 0.7, 0.55, 42, 0);
                    break;
 
            }

            render.addEntry(model);
        }

    }
};

//StoneChest
IDRegistry.genBlockID("cobbleChest");
StoneChest.add("cobbleChest", "Cobblestone Chest",
[["cobbleChest",2], ["cobbleChest",2], ["cobbleChest",1], ["cobbleChest",0], ["cobbleChest",1], ["cobbleChest",1]], true, 27, {});
Recipes.addShaped({id: BlockID.cobbleChest, count: 1, data: 0}, [
    "bb",
    "bb",
    "  "
], ['b', ItemID.part_cobble, 0]);
IDRegistry.genBlockID("stoneChest");
StoneChest.add("stoneChest", "Stone Chest",
[["stoneChest",2], ["stoneChest",2], ["stoneChest",1], ["stoneChest",0], ["stoneChest",1], ["stoneChest",1]], true, 27, {});
Recipes.addShaped({id: BlockID.stoneChest, count: 1, data: 0}, [
    "bb",
    "bb",
    "  "
], ['b', ItemID.part_stone, 0]);
IDRegistry.genBlockID("graniteChest");
StoneChest.add("graniteChest", "Granite Chest",
[["graniteChest",2], ["graniteChest",2], ["graniteChest",1], ["graniteChest",0], ["graniteChest",1], ["graniteChest",1]], true, 27, {});
Recipes.addShaped({id: BlockID.graniteChest, count: 1, data: 0}, [
    "bb",
    "bb",
    "  "
], ['b', ItemID.part_granite, 0]);
IDRegistry.genBlockID("dioriteChest");
StoneChest.add("dioriteChest", "Diorite Chest",
[["dioriteChest",2], ["dioriteChest",2], ["dioriteChest",1], ["dioriteChest",0], ["dioriteChest",1], ["dioriteChest",1]], true, 27, {});
Recipes.addShaped({id: BlockID.dioriteChest, count: 1, data: 0}, [
    "bb",
    "bb",
    "  "
], ['b', ItemID.part_diorite, 0]);
IDRegistry.genBlockID("andesiteChest");
StoneChest.add("andesiteChest", "Andesite Chest",
[["andesiteChest",2], ["andesiteChest",2], ["andesiteChest",1], ["andesiteChest",0], ["andesiteChest",1], ["andesiteChest",1]], true, 27, {});
Recipes.addShaped({id: BlockID.andesiteChest, count: 1, data: 0}, [
    "bb",
    "bb",
    "  "
], ['b', ItemID.part_andesite, 0]);

//StonePart
Item.addCreativeGroup(GROUP_STONEPART, "StonePart", [ItemID.part_cobble, ItemID.part_stone, ItemID.part_granite, ItemID.part_diorite, ItemID.part_andesite]);
IDRegistry.genItemID("part_cobble");
Item.createItem("part_cobble", "Cobblestone Part", {name: "part_cobble"});
Recipes.addShaped({id: ItemID.part_cobble, count: 1, data: 0}, [
    " c ",
    "c  ",
    "   "
], ['c', 4, 0,]);
IDRegistry.genItemID("part_stone");
Item.createItem("part_stone", "Stone Part", {name: "part_stone"});
Recipes.addShaped({id: ItemID.part_stone, count: 1, data: 0}, [
    " c",
    "c ",
    "  "
], ['c', 1, 0]);
IDRegistry.genItemID("part_granite");
Item.createItem("part_granite", "Granite Part", {name: "part_granite"});
Recipes.addShaped({id: ItemID.part_granite, count: 1, data: 0}, [
    " c",
    "c ",
    "  "
], ['c', 1, 1]);
IDRegistry.genItemID("part_diorite");
Item.createItem("part_diorite", "Diorite Part", {name: "part_diorite"});
Recipes.addShaped({id: ItemID.part_diorite, count: 1, data: 0}, [
    " c",
    "c ",
    "  "
], ['c', 1, 3]);
IDRegistry.genItemID("part_andesite");
Item.createItem("part_andesite", "Andesite Part", {name: "part_andesite"});
Recipes.addShaped({id: ItemID.part_andesite, count: 1, data: 0}, [
    " c",
    "c ",
    "  "
], ['c', 1, 5]);

//Translateru
Translation.addTranslation("StoneChest", {ru: "Каменьсундук"});
Translation.addTranslation("StonePart", {ru: "Каменьчасть"});

Translation.addTranslation("Cobblestone Chest", {ru: "Булыжник сундук"});
Translation.addTranslation("Stone Chest", {ru: "Камень сундук"});
Translation.addTranslation("Granite Chest", {ru: "Гранит сундук"});
Translation.addTranslation("Diorite Chest", {ru: "Диорит сундук"});
Translation.addTranslation("Andesite Chest", {ru: "Андезит сундук"});

Translation.addTranslation("Cobblestone Part", {ru: "Булыжник часть"});
Translation.addTranslation("Stone Part", {ru: "Камень часть"});
Translation.addTranslation("Granite Part", {ru: "Гранит часть"});
Translation.addTranslation("Diorite Part", {ru: "Диорит часть"});
Translation.addTranslation("Andesite Part", {ru: "Андезит часть"});
