/*
BUILD INFO:
  dir: dev
  target: main.js
  files: 4
*/



// file: header.js

/*Storage Drawer powered by Denys Dzhuhalik
  Don't copy!
*/

IMPORT ("DrawerAPI", "Drawer");




// file: block.js

var BLOCK_TYPE_WOOD = Block.createSpecialType({
    base: 4
});

IDRegistry.genBlockID("oakDrawer");
Block.createBlockWithRotation("oakDrawer", [
    {
        name: "Oak Drawer",
        texture: [["drawers_oak_side", 0], ["drawers_oak_side", 0], ["drawers_oak_side", 0], ["drawers_oak_front", 0], ["drawers_oak_side", 0], ["drawers_oak_side", 0]],
        inCreative: true
    }
], BLOCK_TYPE_WOOD);


IDRegistry.genBlockID("brichDrawer");
Block.createBlockWithRotation("brichDrawer", [
    {
        name: "Brich Drawer",
        texture: [["drawers_birch_side", 0], ["drawers_birch_side", 0], ["drawers_birch_side", 0], ["drawers_birch_front", 0], ["drawers_birch_side", 0], ["drawers_birch_side", 0]],
        inCreative: true
    }
], BLOCK_TYPE_WOOD);


IDRegistry.genBlockID("bigDrawer");
Block.createBlockWithRotation("bigDrawer", [
    {
        name: "Big oak Drawer",
        texture: [["drawers_big_oak_side", 0], ["drawers_big_oak_side", 0], ["drawers_big_oak_side", 0], ["drawers_big_oak_front", 0], ["drawers_big_oak_side", 0], ["drawers_big_oak_side", 0]],
        inCreative: true
    }
], BLOCK_TYPE_WOOD);


IDRegistry.genBlockID("acaciaDrawer");
Block.createBlockWithRotation("acaciaDrawer", [
    {
        name: "Acacia Drawer",
        texture: [["drawers_acacia_side", 0], ["drawers_acacia_side", 0], ["drawers_acacia_side", 0], ["drawers_acacia_front", 0], ["drawers_acacia_side", 0], ["drawers_acacia_side", 0]],
        inCreative: true
    }
], BLOCK_TYPE_WOOD);

IDRegistry.genBlockID("spruceDrawer");
Block.createBlockWithRotation("spruceDrawer", [
    {
        name: "Spruce Drawer",
        texture: [["drawers_spruce_side", 0], ["drawers_spruce_side", 0], ["drawers_spruce_side", 0], ["drawers_spruce_front", 0], ["drawers_spruce_side", 0], ["drawers_spruce_side", 0]],
        inCreative: true
    }
], BLOCK_TYPE_WOOD);

IDRegistry.genBlockID("jungleDrawer");
Block.createBlockWithRotation("jungleDrawer", [
    {
        name: "Jungle Drawer",
        texture: [["drawers_jungle_side", 0], ["drawers_jungle_side", 0], ["drawers_jungle_side", 0], ["drawers_jungle_front", 0], ["drawers_jungle_side", 0], ["drawers_jungle_side", 0]],
        inCreative: true
    }
], BLOCK_TYPE_WOOD);

Drawer.registerStorage(BlockID.oakDrawer);
Drawer.registerStorage(BlockID.brichDrawer);
Drawer.registerStorage(BlockID.bigDrawer);
Drawer.registerStorage(BlockID.acaciaDrawer);
Drawer.registerStorage(BlockID.spruceDrawer);
Drawer.registerStorage(BlockID.jungleDrawer);




// file: recipes.js

Drawer.registerRecipes(BlockID.oakDrawer, 17, 0);
Drawer.registerRecipes(BlockID.brichDrawer, 17, 2);
Drawer.registerRecipes(BlockID.bigDrawer, 162, 1);
Drawer.registerRecipes(BlockID.acaciaDrawer, 162, 0);
Drawer.registerRecipes(BlockID.spruceDrawer, 17, 1);
Drawer.registerRecipes(BlockID.jungleDrawer, 17, 3);




// file: localize.js

Translation.addTranslation("Oak Drawer", {ru: "Дубовый ящик"});
Translation.addTranslation("Brich Drawer", {ru: "Березовый ящик"});
Translation.addTranslation("Big oak Drawer", {ru: "Ящик с большого дуба"});
Translation.addTranslation("Acacia Drawer", {ru: "Ящик из акации"});
Translation.addTranslation("Spruce Drawer", {ru: "Еловый ящик"});
Translation.addTranslation("Jungle Drawer", {ru: "Ящик для джунглей"});




