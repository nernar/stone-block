var ExSeeds = {
    seeds_data: {},
    registryAsSet: function(ID, name, texture, object) {
        IDRegistry.genItemID(ID, name, texture, object);
        Item.createItem(ID, name, {
            name: texture,
            meta: 0
        });
        this.seeds_data[ID] = object;
        Item.addCreativeGroup("seeds", Translation.translate("Seeds"), [ItemID[ID]]);
    }
}

ExSeeds.registryAsSet("ex_seedsOak", "Acorn", "ex_seedsOak", {
    id: VanillaTileID.sapling,
    data: 0
});
ExSeeds.registryAsSet("ex_seedsSpruce", "Spruce Seed", "ex_seedsSpruce", {
    id: VanillaTileID.sapling,
    data: 1
});
ExSeeds.registryAsSet("ex_seedsBirch", "Birch Seed", "ex_seedsBirch", {
    id: VanillaTileID.sapling,
    data: 2
});
ExSeeds.registryAsSet("ex_seedsJungle", "Exotic Seed", "ex_seedsJungle", {
    id: VanillaTileID.sapling,
    data: 3
});
ExSeeds.registryAsSet("ex_seedsAcacia", "Acacia Seeds", "ex_seedsAcacia", {
    id: VanillaTileID.sapling,
    data: 4
});
ExSeeds.registryAsSet("ex_seedsDarkOak", "Dark Acorn", "ex_seedsDarkOak", {
    id: VanillaTileID.sapling,
    data: 5
});
ExSeeds.registryAsSet("ex_seedsCarrot", "Carrot Seeds", "ex_seedsCarrot", {
    id: VanillaTileID.carrots,
    data: 0
});
ExSeeds.registryAsSet("ex_seedsPotato", "Potato Seeds", "ex_seedsPotato", {
    id: VanillaTileID.potatoes,
    data: 0
});
ExSeeds.registryAsSet("ex_seedsBamboo", "Bamboo Seeds", "ex_seedsBamboo", {
    id: VanillaTileID.bamboo_sapling,
    data: 0
});
ExSeeds.registryAsSet("ex_seedsBerries", "Berries Seeds", "ex_seedsBerries", {
    id: VanillaTileID.sweet_berry_bush,
    data: 0
});
IDRegistry.genItemID("ex_seedsGrass");
Item.createItem("ex_seedsGrass", "Grass Seeds", {
    name: "ex_seedsGrass",
    meta: 0
});
IDRegistry.genItemID("ex_seedsCactus");
Item.createItem("ex_seedsCactus", "Cactus Seeds", {
    name: "ex_seedsCactus",
    meta: 0
});
IDRegistry.genItemID("ex_seedsCanes");
Item.createItem("ex_seedsCanes", "Sugarcane Seeds", {
    name: "ex_seedsCanes",
    meta: 0
});
IDRegistry.genItemID("ex_spores");
Item.createItem("ex_spores", "Spores", {
    name: "ex_spores",
    meta: 0
});
IDRegistry.genItemID("ex_seedsChorus");
Item.createItem("ex_seedsChorus", "Chorus Seeds", {
    name: "ex_seedsChorus",
    meta: 0
});

Item.addCreativeGroup("seeds", Translation.translate("Seeds"), [
    ItemID["ex_seedsGrass"], 
    ItemID["ex_seedsOak"], 
    ItemID["ex_seedsJungle"], 
    ItemID["ex_seedsDarkOak"], 
    ItemID["ex_seedsBirch"], 
    ItemID["ex_seedsSpruce"], 
    ItemID["ex_seedsAcacia"], 
    ItemID["ex_seedsPotato"], 
    ItemID["ex_seedsCarrot"], 
    ItemID["ex_seedsCactus"], 
    ItemID["ex_seedsCanes"], 
    ItemID["ex_spores"], 
    ItemID["ex_seedsChorus"], 
    ItemID["ex_seedsBamboo"], 
    ItemID["ex_seedsBerries"]
]);

Callback.addCallback("ItemUse",
function(coords, item, block, isExternal, player) {
    var blockSource = BlockSource.getDefaultForActor(player);
    var x = coords.x;
    var y = coords.y;
    var z = coords.z
    var ID = blockSource.getBlock(x, y, z).id;
    if (blockSource.getBlock(x, y + 1, z).id != 0) return;
    if (coords.side != 1) return;
    if (ID == 2 || ID == 3) {
        if (item.id == ItemID.ex_seedsGrass && blockSource.getBlock(x, y, z).id == 3) {
            SoundManager.playSoundAtEntity(player, "sieve.ogg");
            blockSource.setBlock(x, y, z, 2, 0);
            new PlayerEntity(player).setCarriedItem(item.id, item.count - 1, item.data);
        }
        for (var key in ExSeeds.seeds_data) {
            if (item.id == ItemID[key]) {
                SoundManager.playSoundAtEntity(player, "sieve.ogg");
                blockSource.setBlock(x, y + 1, z, ExSeeds.seeds_data[key].id, ExSeeds.seeds_data[key].data);
                new PlayerEntity(player).setCarriedItem(item.id, item.count - 1, item.data);
            }
        }
    }
    if (ID == 60) {
        for (var key in ExSeeds.seeds_data) {
            if (item.id == ItemID[key]) {
                blockSource.setBlock(x, y + 1, z, ExSeeds.seeds_data[key].id, ExSeeds.seeds_data[key].data);
                new PlayerEntity(player).setCarriedItem(item.id, item.count - 1, item.data);
            }
        }
    }
    if (item.id == ItemID.ex_seedsCanes) {
        if (ID == 2 || ID == 3 || ID == 12) {
            blockSource.setBlock(x, y + 1, z, 83, 0);
            new PlayerEntity(player).setCarriedItem(item.id, item.count - 1, item.data);
        }
    }
    if (item.id == ItemID.ex_spores) {
        if (ID == 2 || ID == 3) {
            blockSource.setBlock(x, y, z, 110, 1);
            new PlayerEntity(player).setCarriedItem(item.id, item.count - 1, item.data);
        }
    }
    if (item.id == ItemID.ex_seedsCactus) {
        if (ID == 12) {
            blockSource.setBlock(x, y + 1, z, 81, 0);
            new PlayerEntity(player).setCarriedItem(item.id, item.count - 1, item.data);
        }
        if (ID == 121) {
            blockSource.setBlock(x, y + 1, z, BlockID.ex_chorusSprout, 0);
            new PlayerEntity(player).setCarriedItem(item.id, item.count - 1, item.data);
        }
    }
});