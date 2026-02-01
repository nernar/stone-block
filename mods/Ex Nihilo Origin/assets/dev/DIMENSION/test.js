var GeneratorAPI = {
    FloatingIsland: function(blockSource, x, y, z) {
        blockSource.setBlock(x, y, z, VanillaBlockID.stone, 0);
        blockSource.setBlock(x, y + 1, z, VanillaBlockID.stone, 0);
        blockSource.setBlock(x + 1, y + 1, z, VanillaBlockID.stone, 0);
        blockSource.setBlock(x, y + 1, z + 1, VanillaBlockID.stone, 0);
        blockSource.setBlock(x - 1, y + 1, z, VanillaBlockID.stone, 0);
        blockSource.setBlock(x, y + 1, z - 1, VanillaBlockID.stone, 0);
        for (let coords_X = x - 2; coords_X <= x + 2; coords_X++) {
            for (let coords_Z = z - 2; coords_Z <= z + 2; coords_Z++) {
                blockSource.setBlock(coords_X, y + 2, coords_Z, VanillaBlockID.stone, 0);
                blockSource.setBlock(coords_X, y + 3, coords_Z, VanillaBlockID.stone, 0);
            };
        };
        blockSource.setBlock(x - 2, y + 3, z - 2, 0, 0);
        blockSource.setBlock(x - 2, y + 3, z + 2, 0, 0);
        blockSource.setBlock(x + 2, y + 3, z - 2, 0, 0);
        blockSource.setBlock(x + 2, y + 3, z + 2, 0, 0);
        for (let coords_X = x - 1; coords_X <= x + 1; coords_X++) {
            for (let coords_Z = z - 1; coords_Z <= z + 1; coords_Z++) {
                blockSource.setBlock(coords_X, y + 4, coords_Z, VanillaBlockID.stone, 0);
            };
        };
        blockSource.setBlock(x, y + 5, z, VanillaBlockID.shulker_box, 8);
        TrophyAPI.setTrophyAtCoords(x, y + 5, z, blockSource);
    }
};

var ex_dimension = new Dimensions.CustomDimension("ex_broken_dimension", 45);
var ex_dimension_generator = Dimensions.newGenerator({
    layers: [{
        minY: 0,
        maxY: 128,
        yConversion: [
            [0, 0.5],
            [1, -0.5]
        ],
        material: {
            base: VanillaBlockID.stone,
            surface: {
                id: VanillaBlockID.grass,
                data: 0,
                width: 2
            },
        },
        noise: {
            octaves: {
                count: 4,
                scale: 20
            }
        },
        materials: [{
            base: VanillaBlockID.dirt,
            diffuse: 0.1,
            noise: {
                octaves: [{
                    scale: 0.1,
                    weight: 0.6
                }, {
                    scale: 0.2,
                    weight: 0.3
                }]
            }
        }]
    }]
});
ex_dimension_generator.setGenerateVanillaStructures(false);
ex_dimension_generator.setGenerateModStructures(true);
ex_dimension_generator.setModGenerationBaseDimension(2);
ex_dimension.setGenerator(ex_dimension_generator);

Callback.addCallback("ItemUse", function(coords, item, block, i, player) {
    if (block.id != BlockID.ex_world_core) return;
    Game.prevent();
    let blockSource = BlockSource.getDefaultForActor(player);
    let dim = Entity.getDimension(player);
    dim == 0 && Dimensions.transfer(player, ex_dimension.id);
    dim == ex_dimension.id && Dimensions.transfer(player, 0);
    dim != ex_dimension.id && dim != 0 && blockSource.explode(coords.x, coords.y, coords.z, 3, true);
});

Callback.addCallback("CustomDimensionTransfer", function(entity, dimfrom, dimto) {
    if (dimfrom == 0 && dimto == ex_dimension.id || dimfrom == ex_dimension.id && dimto == 0) {
        Updatable.addUpdatable({
            timer: 0,
            update: function() {
                this.timer++;
                if (this.timer == 20) {
                    var region = BlockSource.getDefaultForDimension(dimto);
                    var pos = Entity.getPosition(entity);
                    var surf_1 = GenerationUtils.findSurface(pos.x, 92, pos.z);
                    Updatable.addUpdatable({
                        age: 0,
                        update: function() {
                            Entity.setPosition(entity, surf_1.x, surf_1.y + 3, surf_1.z);
                            this.remove = this.age++ > 5;
                        }
                    });
                    this.remove = true;
                }
            }
        });
    };
});

World.addGenerationCallback(getMCPEVersion().array[1] == 11 ? "GenerateChunk" : "PreProcessChunk", function(chunkX, chunkZ, random, dimension, chunkSeed, worldSeed, dimensionSeed) {
    if (dimension == ex_dimension.id) {
        let blockSource = BlockSource.getCurrentWorldGenRegion();
        var chance = Math.floor(Math.random() * 100);
        for (var i = 0; i < 16; i++) {
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 32);
            GenerationUtils.generateOreCustom(coords.x, coords.y, coords.z, 0, 0, 20, true, [VanillaBlockID.stone, VanillaBlockID.dirt]);
        };
        for (var i = 0; i < 15; i++) {
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 40, 64);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, VanillaBlockID.coal_ore, 0, Math.floor(Math.random() * 11) + 5);
        };
        for (var i = 0; i < 15; i++) {
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 20, 40);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, VanillaBlockID.iron_ore, 0, Math.floor(Math.random() * 11) + 2);
        };
        for (var i = 0; i < 9; i++) {
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 15, 20);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, VanillaBlockID.gold_ore, 0, Math.floor(Math.random() * 7));
        };
        for (var i = 0; i < 6; i++) {
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 11, 12);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, VanillaBlockID.diamond_ore, 0, Math.floor(Math.random() * 6) + 1);
        };
        if (chance > 98) {
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 128, 256);
            GeneratorAPI.FloatingIsland(blockSource, coords.x, coords.y, coords.z);
        };
    }
});