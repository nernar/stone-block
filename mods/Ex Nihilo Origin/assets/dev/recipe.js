//api update
var registerRecipe = {
    barrel: function(resultId, id1, data1, id2, data2) {
        Recipes.addShaped({id: resultId, count: 1, data: 0}, ["non", "non", "ntn"], ["n", id1, data1, "t", id2, data2]);
    },
    sieve: function(resultId, id1, data1) {
        Recipes.addShaped({id: resultId, count: 1, data: 0}, ["non", "nnn", "mom"], ["n", id1, data1,"m", VanillaItemID.stick, 0]);
    },
    crook: function(resultId, id1) {
        Recipes.addShaped({id: resultId, count: 1, data: 0}, ["nn", "n", "n"], ["n", id1, 0]);
    },
    hammers: function(resultId, id1, data1) {
        Recipes.addShaped({id: resultId, count: 1, data: 0}, ["owo", "ohw", "hoo"], ["w", id1, data1, "h", VanillaItemID.stick, 0]);
    }
};

Callback.addCallback("PreLoaded", function () {
    Recipes.addFurnace(ItemID.ex_silkWorm, ItemID.ex_cookedSilkWorm, 0);
    Recipes.addFurnace(ItemID.ex_bucketPorcelainRaw, ItemID.ex_bucketPorcelainEmpty, 0);
    Recipes.addFurnace(ItemID.ex_slimeBallBlack, VanillaItemID.coal, 0);
    Recipes.addFurnace(BlockID.ex_crucibleRaw, BlockID.ex_crucible, 0);
    Recipes.addFurnace(BlockID.ex_oreSaltsGold, VanillaBlockID.gold_block, 0);
    Recipes.addFurnace(BlockID.ex_oreSaltsIron, VanillaBlockID.iron_block, 0);
    
    registerRecipe.barrel(BlockID.ex_barrelOak, VanillaBlockID.planks, 0, VanillaBlockID.wooden_slab, 0);
    registerRecipe.barrel(BlockID.ex_barrelBirch, VanillaBlockID.planks, 2, VanillaBlockID.wooden_slab, 2);
    registerRecipe.barrel(BlockID.ex_barrelAcacia, VanillaBlockID.planks, 4, VanillaBlockID.wooden_slab, 4);
    registerRecipe.barrel(BlockID.ex_barrelBigOak, VanillaBlockID.planks, 5, VanillaBlockID.wooden_slab, 5);
    registerRecipe.barrel(BlockID.ex_barrelJungle, VanillaBlockID.planks, 3, VanillaBlockID.wooden_slab, 3);
    registerRecipe.barrel(BlockID.ex_barrelSpruce, VanillaBlockID.planks, 1, VanillaBlockID.wooden_slab, 1);
    
    registerRecipe.barrel(BlockID.ex_barrelStone, VanillaBlockID.stone, 0, VanillaBlockID.double_stone_slab4, 2);
    
    registerRecipe.barrel(BlockID.ex_barrel_glass_black, VanillaBlockID.stained_glass, 15, VanillaBlockID.stained_glass_pane, 15);
    registerRecipe.barrel(BlockID.ex_barrel_glass_blue, VanillaBlockID.stained_glass, 11, VanillaBlockID.stained_glass_pane, 11);
    registerRecipe.barrel(BlockID.ex_barrel_glass_brown, VanillaBlockID.stained_glass, 12, VanillaBlockID.stained_glass_pane, 12);
    registerRecipe.barrel(BlockID.ex_barrel_glass_cyan, VanillaBlockID.stained_glass, 9, VanillaBlockID.stained_glass_pane, 9);
    registerRecipe.barrel(BlockID.ex_barrel_glass_gray, VanillaBlockID.stained_glass, 7, VanillaBlockID.stained_glass_pane, 7);
    registerRecipe.barrel(BlockID.ex_barrel_glass_green, VanillaBlockID.stained_glass, 13, VanillaBlockID.stained_glass_pane, 13);
    registerRecipe.barrel(BlockID.ex_barrel_glass_light_blue, VanillaBlockID.stained_glass, 3, VanillaBlockID.stained_glass_pane, 3);
    registerRecipe.barrel(BlockID.ex_barrel_glass_lime, VanillaBlockID.stained_glass, 5, VanillaBlockID.stained_glass_pane, 5);
    registerRecipe.barrel(BlockID.ex_barrel_glass_magenta, VanillaBlockID.stained_glass, 2, VanillaBlockID.stained_glass_pane, 2);
    registerRecipe.barrel(BlockID.ex_barrel_glass_orange, VanillaBlockID.stained_glass, 1, VanillaBlockID.stained_glass_pane, 1);
    registerRecipe.barrel(BlockID.ex_barrel_glass_pink, VanillaBlockID.stained_glass, 6, VanillaBlockID.stained_glass_pane, 6);
    registerRecipe.barrel(BlockID.ex_barrel_glass_purple, VanillaBlockID.stained_glass, 10, VanillaBlockID.stained_glass_pane, 10);
    registerRecipe.barrel(BlockID.ex_barrel_glass_red, VanillaBlockID.stained_glass, 14, VanillaBlockID.stained_glass_pane, 14);
    registerRecipe.barrel(BlockID.ex_barrel_glass_silver, VanillaBlockID.stained_glass, 8, VanillaBlockID.stained_glass_pane, 8);
    registerRecipe.barrel(BlockID.ex_barrel_glass_white, VanillaBlockID.stained_glass, 0, VanillaBlockID.stained_glass_pane, 0);
    registerRecipe.barrel(BlockID.ex_barrel_glass_yellow, VanillaBlockID.stained_glass, 4, VanillaBlockID.stained_glass_pane, 4);

    registerRecipe.sieve(BlockID.ex_sieve_birch, VanillaBlockID.planks, 2);
    registerRecipe.sieve(BlockID.ex_sieve_acacia, VanillaBlockID.planks, 4);
    registerRecipe.sieve(BlockID.ex_sieve_big_oak, VanillaBlockID.planks, 5);
    registerRecipe.sieve(BlockID.ex_sieve_jungle, VanillaBlockID.planks, 3);
    registerRecipe.sieve(BlockID.ex_sieve_spruce, VanillaBlockID.planks, 1);
    registerRecipe.sieve(BlockID.ex_sieve_oak, VanillaBlockID.planks, 0);
    
    registerRecipe.sieve(BlockID.ex_heavysieve_oak, VanillaBlockID.log, 0);
    registerRecipe.sieve(BlockID.ex_heavysieve_spruce, VanillaBlockID.log, 1);
    registerRecipe.sieve(BlockID.ex_heavysieve_birch, VanillaBlockID.log, 2);
    registerRecipe.sieve(BlockID.ex_heavysieve_jungle, VanillaBlockID.log, 3);
    registerRecipe.sieve(BlockID.ex_heavysieve_acacia, VanillaBlockID.log2, 0);
    registerRecipe.sieve(BlockID.ex_heavysieve_big_oak, VanillaBlockID.log2, 1);

    Recipes.addShaped({id: BlockID.ex_endCake, count: 1, data: 0}, ["nnn", "aba", "nnn"], ["n", VanillaItemID.ender_eye, 0, "b", VanillaItemID.golden_apple, 0, "a", VanillaBlockID.cake, 0]);
    Recipes.addShaped({id: BlockID.ex_crucibleRaw, count: 1, data: 0}, ["non", "non", "nnn"], ["n", ItemID.ex_porcelain, -1]);
    Recipes.addShaped({id: ItemID.ex_bucketPorcelainRaw, count: 1, data: 0}, ["non", "ono", ""], ["n", ItemID.ex_porcelain, -1]);
    Recipes.addShaped({id: ItemID.ex_meshWood, count: 1, data: 0}, ["nnn", "nnn", "nnn"], ["n", VanillaItemID.stick, -1]);
    
    registerRecipe.crook(ItemID.ex_crookWood, VanillaItemID.stick);
    registerRecipe.crook(ItemID.ex_crookBone, VanillaItemID.bone);
    registerRecipe.crook(ItemID.ex_crookReed, VanillaItemID.sugar_cane);
    registerRecipe.crook(ItemID.ex_crookGold, VanillaItemID.gold_ingot);
    
    Recipes.addShaped({id: ItemID.ex_crookHay, count: 1, data: 0}, ["ynn", "ono", "yny"], ["n", 296, 0, "o", VanillaBlockID.iron_bars, 0]);
    
    Recipes.addShaped({id: ItemID.ex_slimeBallBlack, count: 1, data: 0}, ["www", "wow", "www"], ["w", VanillaItemID.coal, 1, "o", VanillaItemID.slime_ball, 0]);
    
    registerRecipe.hammers(ItemID.ex_hammersWood, VanillaBlockID.planks, -1);
    registerRecipe.hammers(ItemID.ex_hammersStone, VanillaBlockID.cobblestone, 0);
    registerRecipe.hammers(ItemID.ex_hammersIron, VanillaItemID.iron_ingot, 0);
    registerRecipe.hammers(ItemID.ex_hammersGold, VanillaItemID.gold_ingot, 0);
    registerRecipe.hammers(ItemID.ex_hammersDiamond, VanillaItemID.diamond, 0);
    registerRecipe.hammers(ItemID.ex_hammersAluminum, ItemID.ingotAluminum, 0);
    registerRecipe.hammers(ItemID.ex_hammersNickel, ItemID.ingotNickel, 0);
    registerRecipe.hammers(ItemID.ex_hammersPlatinum, ItemID.ingotPlatinum, 0);
    
    
    
    
    
    
    
    
        Recipes.addShaped({id: ItemID.ex_meshcoSilk, count: 1, data: 0}, ["ooa", "ooa", "aaa"], ["o", ItemID.ex_meshSilk, 0]);
        Recipes.addShaped({id: ItemID.ex_meshcoFlint, count: 1, data: 0}, ["ooa", "ooa", "aaa"], ["o", ItemID.ex_meshFlint, 0]);
    Recipes.addShaped({id: ItemID.ex_meshcoIron, count: 1, data: 0}, ["ooa", "ooa", "aaa"], ["o", ItemID.ex_meshIron, 0]);
    Recipes.addShaped({id: ItemID.ex_meshcoDiamond, count: 1, data: 0}, ["ooa", "ooa", "aaa"], ["o", ItemID.ex_meshDiamond, 0]);

    
    
    Recipes.addShaped({id: ItemID.ex_meshSilk, count: 1, data: 0}, ["ooo", "ooo", "ooo"], ["o", VanillaItemID.string, 0]);
    Recipes.addShaped({id: ItemID.ex_meshFlint, count: 1, data: 0}, ["bab", "bob", "bab"], ["o", ItemID.ex_meshSilk, -1, "b", VanillaItemID.flint, -1]);
    Recipes.addShaped({id: ItemID.ex_meshIron, count: 1, data: 0}, ["bab", "bob", "bab"], ["o", ItemID.ex_meshFlint, -1, "b", VanillaItemID.iron_ingot, 0]);
    Recipes.addShaped({id: ItemID.ex_meshDiamond, count: 1, data: 0}, ["bab", "bob", "bab"], ["o", ItemID.ex_meshIron, -1, "b", VanillaItemID.diamond, 0]);
    Recipes.addShaped({id: VanillaBlockID.cobblestone, count: 1, data: 0}, ["bb", "bb", ""], ["b", ItemID.ex_stoneSmall, -1]);
    Recipes.addShaped({id: ItemID.ex_porcelain, count: 1, data: 0}, ["ba", "", ""], getMCPEVersion().array[1] == 11 ? ["b", VanillaItemID.clay_ball, 0, "a", VanillaItemID.dye, 15] : ["b", VanillaItemID.clay_ball, 0, "a", VanillaItemID.bone_meal, 0]);
    Recipes.addShaped({id: BlockID.ex_furnacehalf, count: 1, data: 0}, ["aaa", "a a", "aaa"], ["a", VanillaBlockID.double_stone_slab4, 3]);
    
    Recipes.addShaped({id: BlockID.ex_compressedObsidian_level1, count: 1, data: 0}, ["aaa", "aaa", "aaa"], ["a", VanillaBlockID.obsidian, 0]);
    Recipes.addShaped({id: BlockID.ex_compressedObsidian_level2, count: 1, data: 0}, ["aaa", "aaa", "aaa"], ["a", BlockID.ex_compressedObsidian_level1, 0]);
    Recipes.addShaped({id: BlockID.ex_world_core, count: 1, data: 0}, ["aca", "dbd", "aca"], ["a", BlockID.compresseddirt, 0, "b", BlockID.ex_compressedObsidian_level2, 0, "c", VanillaItemID.ender_pearl, 0, "d", VanillaBlockID.diamond_block, 0]);
    Recipes.addShaped({id: BlockID.ex_damage0, count: 1, data: 0}, ["cac", "aba", "cac"], ["a", VanillaBlockID.cobblestone, 0, "c", VanillaItemID.redstone, 0, "b", VanillaItemID.iron_pickaxe, 0]);
    
    Recipes.addShaped({id: BlockID.ex_crucible_oak, count: 1, data: 0}, ["aba", "aba", "aca"], ["a", VanillaBlockID.log, 0, "c", VanillaBlockID.wooden_slab, 0]);
    Recipes.addShaped({id: BlockID.ex_crucible_spruce, count: 1, data: 0}, ["aba", "aba", "aca"], ["a", VanillaBlockID.log, 1, "c", VanillaBlockID.wooden_slab, 1]);
    Recipes.addShaped({id: BlockID.ex_crucible_birch, count: 1, data: 0}, ["aba", "aba", "aca"], ["a", VanillaBlockID.log, 2, "c", VanillaBlockID.wooden_slab, 2]);
    Recipes.addShaped({id: BlockID.ex_crucible_jungle, count: 1, data: 0}, ["aba", "aba", "aca"], ["a", VanillaBlockID.log, 3, "c", VanillaBlockID.wooden_slab, 3]);
    Recipes.addShaped({id: BlockID.ex_crucible_acacia, count: 1, data: 0}, ["aba", "aba", "aca"], ["a", VanillaBlockID.log2, 0, "c", VanillaBlockID.wooden_slab, 4]);
    Recipes.addShaped({id: BlockID.ex_crucible_big_oak, count: 1, data: 0}, ["aba", "aba", "aca"], ["a", VanillaBlockID.log2, 1, "c", VanillaBlockID.wooden_slab, 5]);
    
    Recipes.addShapeless({id: ItemID.baitSheep, count: 1, data: 0}, [{id: ItemID.ex_seedsGrass, data: 0}, {id: 296, data: 0}]);
    Recipes.addShapeless({id: ItemID.baitPig, count: 1, data: 0}, [{id: 391, data: 0}, {id: 391, data: 0}]);
    Recipes.addShapeless({id: ItemID.baitWolf, count: 1, data: 0}, [{id: 363, data: 0}, {id: 352, data: 0}]);
    Recipes.addShapeless({id: ItemID.baitCow, count: 1, data: 0}, [{id: 296, data: 0}, {id: 296, data: 0}]);
    Recipes.addShapeless({id: ItemID.baitChicken, count: 1, data: 0}, [{id: 295, data: 0}, {id: 295, data: 0}]);
    Recipes.addShapeless({id: ItemID.baitOcelot, count: 1, data: 0}, [{id: 289, data: 0}, {id: 349, data: 0}]);
    
    CompressedCore.HammerRecipes(ItemID.ex_hammersCompressedWood, ItemID.ex_hammersWood);
    CompressedCore.HammerRecipes(ItemID.ex_hammersCompressedStone, ItemID.ex_hammersStone);
    CompressedCore.HammerRecipes(ItemID.ex_hammersCompressedIron, ItemID.ex_hammersIron);
    CompressedCore.HammerRecipes(ItemID.ex_hammersCompressedGold, ItemID.ex_hammersGold);
    CompressedCore.HammerRecipes(ItemID.ex_hammersCompressedDiamond, ItemID.ex_hammersDiamond);
    
    Recipes.addShaped({id: ItemID.ex_hammersoresmasher, count: 1, data: 0}, ["abc", "adb", "daa"], ["b", VanillaBlockID.crafting_table, 0, "c", VanillaItemID.diamond, 0, "d", VanillaItemID.stick, 0]);
    
    CompressedCore.BlockRecipes(BlockID.compressedstone, VanillaBlockID.stone);
    CompressedCore.BlockRecipes(BlockID.compresseddirt, VanillaBlockID.dirt);
    CompressedCore.BlockRecipes(BlockID.compressedgravel, VanillaBlockID.gravel);
    CompressedCore.BlockRecipes(BlockID.compressedsand, VanillaBlockID.sand);
    CompressedCore.BlockRecipes(BlockID.compresseddust, BlockID.ex_dust);
    CompressedCore.BlockRecipes(BlockID.compressednetherrack, VanillaBlockID.netherrack);
    CompressedCore.BlockRecipes(BlockID.compressedflint, VanillaItemID.flint);
    CompressedCore.BlockRecipes(BlockID.compressedcobblestone, VanillaBlockID.cobblestone);
    CompressedCore.BlockRecipes(BlockID.compressednethergravel, BlockID.ex_gravelNether);
    CompressedCore.BlockRecipes(BlockID.compressedendstone, VanillaBlockID.end_stone);
    CompressedCore.BlockRecipes(BlockID.compressedendergravel, BlockID.ex_gravelEnder);
    CompressedCore.BlockRecipes(BlockID.compressedsoulsand, VanillaBlockID.soul_sand);
});
