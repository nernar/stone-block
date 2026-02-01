ModAPI.addAPICallback("ICore",
function(api) {
    var RUBBER_SAPLING_GROUND_TILES = {
        2: true,
        3: true,
        60: true
    };
    IDRegistry.genItemID("ex_seedsRubber");
    Item.createItem("ex_seedsRubber", "Rubber Seeds", {
        name: "ex_seedsRubber",
        meta: 0
    });
    Item.registerUseFunction("ex_seedsRubber",
    function(coords, item, tile, player) {
        var place = coords.relative;
        var blockSource = BlockSource.getDefaultForActor(player);
        var tile1 = blockSource.getBlock(place.x, place.y, place.z);
        var tile2 = blockSource.getBlock(place.x, place.y - 1, place.z);
        if (GenerationUtils.isTransparentBlock(tile1.id) && RUBBER_SAPLING_GROUND_TILES[tile2.id]) {
            blockSource.setBlock(place.x, place.y, place.z, BlockID.rubberTreeSapling);
            TileEntity.addTileEntity(place.x, place.y, place.z, blockSource);
            new PlayerEntity(player).setCarriedItem(item.id, item.count - 1, item.data);
        };
    });
    Recipes.addShaped({id: ItemID.ex_hammersCopper, count: 1, data: 0}, ["owo", "ohw", "hoo"], ["w", ItemID.ingotCopper, -1, "h", VanillaItemID.stick, 0]);
    Recipes.addShaped({id: ItemID.ex_hammersTin, count: 1, data: 0}, ["owo", "ohw", "hoo"], ["w", ItemID.ingotTin, -1, "h", VanillaItemID.stick, 0]);
    Recipes.addShaped({id: ItemID.ex_hammersSilver, count: 1, data: 0}, ["owo", "ohw", "hoo"], ["w", ItemID.ingotSilver, -1, "h", VanillaItemID.stick, 0]);
    Callback.addCallback("LevelSelected",
    function() {
        Recipes.addFurnace(BlockID.ex_oreSaltsCopper, BlockID.blockCopper, 0);
        Recipes.addFurnace(BlockID.ex_oreSaltsTin, BlockID.blockTin, 0);
        Recipes.addFurnace(BlockID.ex_oreSaltsLead, BlockID.blockLead, 0);
        Recipes.addFurnace(BlockID.ex_oreSaltsSilver, BlockID.blockSilver, 0);
        EXCore.register_2("Nickel", ItemID.ingotNickel, 0, 4);
        EXCore.register_2("Platinum", ItemID.ingotPlatinum, 0, 4);
        EXCore.register_2("Aluminum", ItemID.ingotAluminum, 0, 4);
    });
    EXCore.register("Copper", ItemID.ingotCopper, 0, 4);
    EXCore.register("Tin", ItemID.ingotTin, 0, 4);
    EXCore.register("Lead", ItemID.ingotLead, 0, 4);
    EXCore.register("Silver", ItemID.ingotSilver, 0, 4);
    
    Sieve.addSieved(VanillaBlockID.gravel, ItemID.ex_Copperbroken, 0, 1, 4, 14);
    Sieve.addSieved(VanillaBlockID.gravel, ItemID.ex_Tinbroken, 0, 1, 4, 14);
    Sieve.addSieved(VanillaBlockID.gravel, ItemID.ex_Leadbroken, 0, 1, 4, 11);
    Sieve.addSieved(VanillaBlockID.gravel, ItemID.ex_Silverbroken, 0, 1, 4, 9);
    Sieve.addSieved(VanillaBlockID.sand, ItemID.ex_seedsRubber, 0, 1, 1, 1);
    Sieve.addSieved(VanillaBlockID.sand, ItemID.ex_Coppercrushed, 0, 1, 4, 14);
    Sieve.addSieved(VanillaBlockID.sand, ItemID.ex_Tincrushed, 0, 1, 4, 14);
    Sieve.addSieved(VanillaBlockID.sand, ItemID.ex_Leadcrushed, 0, 1, 4, 11);
    Sieve.addSieved(VanillaBlockID.sand, ItemID.ex_Silvercrushed, 0, 1, 4, 9);
    Sieve.addSieved(BlockID.ex_dust, ItemID.ex_Copperpowered, 0, 1, 4, 14);
    Sieve.addSieved(BlockID.ex_dust, ItemID.ex_Tinpowered, 0, 1, 4, 14);
    Sieve.addSieved(BlockID.ex_dust, ItemID.ex_Leadpowered, 0, 1, 4, 11);
    Sieve.addSieved(BlockID.ex_dust, ItemID.ex_Silverpowered, 0, 1, 4, 9);
    Sieve.addSieved(BlockID.ex_gravelNether, ItemID.ex_netherCopperbroken, 0, 1, 4, 10);
    Sieve.addSieved(BlockID.ex_gravelNether, ItemID.ex_netherTinbroken, 0, 1, 4, 10);
    Sieve.addSieved(BlockID.ex_gravelNether, ItemID.ex_netherLeadbroken, 0, 1, 4, 17);
    Sieve.addSieved(BlockID.ex_gravelNether, ItemID.ex_netherSilverbroken, 0, 1, 4, 17);
    Sieve.addSieved(BlockID.ex_gravelEnder, ItemID.ex_enderCopperbroken, 0, 1, 4, 10);
    Sieve.addSieved(BlockID.ex_gravelEnder, ItemID.ex_enderTinbroken, 0, 1, 4, 10);
    Sieve.addSieved(BlockID.ex_gravelEnder, ItemID.ex_enderLeadbroken, 0, 1, 4, 17);
    Sieve.addSieved(BlockID.ex_gravelEnder, ItemID.ex_enderSilverbroken, 0, 1, 4, 17);
    Sieve.addSieved(BlockID.ex_saltcoarse, ItemID.ex_CopperDustSalts, 0, 1, 4, 10);
    Sieve.addSieved(BlockID.ex_saltcoarse, ItemID.ex_TinDustSalts, 0, 1, 4, 10);
    Sieve.addSieved(BlockID.ex_saltcoarse, ItemID.ex_LeadDustSalts, 0, 1, 4, 17);
    Sieve.addSieved(BlockID.ex_saltcoarse, ItemID.ex_SilverDustSalts, 0, 1, 4, 17);
});