function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
(function() {
    var dirt = [
        [ItemID.ex_stoneSmall, 0, 2, 4, 100],
        [ItemID.ex_seedsGrass, 0, 1, 1, 7],
        [ItemID.ex_seedsOak, 0, 1, 1, 1],
        [VanillaItemID.wheat_seeds, 0, 1, 2, 7],
        [VanillaItemID.pumpkin_seeds, 0, 1, 1, 7],
        [VanillaItemID.melon_seeds, 0, 1, 1, 7],
        [ItemID.ex_seedsDarkOak, 0, 1, 1, 2],
        [ItemID.ex_seedsBirch, 0, 1, 1, 0],
        [ItemID.ex_seedsSpruce, 0, 1, 1, 1],
        [ItemID.ex_seedsAcacia, 0, 1, 1, 2],
        [ItemID.ex_seedsPotato, 0, 1, 1, 2],
        [ItemID.ex_seedsCarrot, 0, 1, 1, 2],
        [ItemID.ex_seedsCanes, 0, 1, 1, 7],
        [ItemID.ex_seedsBamboo, 0, 1, 1, 2],
        [ItemID.ex_seedsBerries, 0, 1, 1, 3]
    ];
    var gravel = [
        [VanillaItemID.coal, 0, 1, 4, 13],
        [VanillaItemID.flint, 0, 1, 3, 25],
        [ItemID.ex_Ironbroken, 0, 1, 4, 25],
        [ItemID.ex_Aluminumbroken, 0, 1, 4, 10],
        [ItemID.ex_Nickelbroken, 0, 1, 4, 9],
        [ItemID.ex_Goldbroken, 0, 1, 4, 9],
        //    [VanillaItemID.dye, 4, 1, 2, 5],
        [VanillaItemID.emerald, 0, 1, 1, 1],
        [VanillaItemID.diamond, 0, 1, 1, 1]
    ];
    gravel.push(getMCPEVersion()
        .array[1] == 11 ? [VanillaItemID.dye, 4, 1, 2, 5] : [VanillaItemID.lapis_lazuli, 4, 1, 2, 5]);
    var sand = [
        [ItemID.ex_seedsCactus, 0, 1, 1, 2],
        [ItemID.ex_seedsJungle, 0, 1, 1, 3],
        [ItemID.ex_Ironcrushed, 0, 1, 4, 20],
        [ItemID.ex_Aluminumcrushed, 0, 1, 4, 10],
        [ItemID.ex_Nickelcrushed, 0, 1, 4, 9],
        [ItemID.ex_Goldcrushed, 0, 1, 4, 9],
        [ItemID.ex_Platinumcrushed, 0, 1, 4, 3],
        [VanillaItemID.dye, 3, 1, 2, 3],
        [ItemID.ex_spores, 0, 1, 2, 1]
    ];
    var dust = [
    //    [VanillaItemID.dye, 15, 1, 4, 20],
    [ItemID.ex_IronPowdered, 0, 1, 4, 20],
        [ItemID.ex_GoldPowdered, 0, 1, 4, 9],
        [ItemID.ex_AluminumPowdered, 0, 1, 4, 10],
        [ItemID.ex_NickelPowdered, 0, 1, 4, 9],
        [ItemID.ex_PlatinumPowdered, 0, 1, 4, 3],
        [VanillaItemID.redstone, 0, 1, 3, 14],
        [VanillaItemID.gunpowder, 0, 1, 3, 7],
        [VanillaItemID.glowstone_dust, 0, 1, 3, 6],
        [VanillaItemID.blaze_powder, 0, 1, 3, 5]
    ];
    dust.push(getMCPEVersion()
        .array[1] == 11 ? [VanillaItemID.dye, 15, 1, 4, 20] : [VanillaItemID.bone_meal, 0, 1, 4, 20]);
    var soulsand = [
        [VanillaItemID.quartz, 0, 1, 6, 33],
        [VanillaItemID.nether_wart, 0, 1, 2, 5],
        [VanillaItemID.ghast_tear, 0, 1, 1, 2]
    ];
    var netherGravel = [
        [ItemID.ex_netherIronbroken, 0, 1, 4, 17],
        [ItemID.ex_netherGoldbroken, 0, 1, 4, 17],
        [ItemID.ex_netherNickelbroken, 0, 1, 4, 10],
        [ItemID.ex_netherPlatinumbroken, 0, 1, 4, 5],
        [ItemID.ex_netherAluminumbroken, 0, 1, 4, 7]
    ];
    var enderGravel = [
        [ItemID.ex_enderIronbroken, 0, 1, 4, 17],
        [ItemID.ex_enderGoldbroken, 0, 1, 4, 17],
        [ItemID.ex_enderNickelbroken, 0, 1, 4, 10],
        [ItemID.ex_enderPlatinumbroken, 0, 1, 4, 5],
        [ItemID.ex_enderAluminumbroken, 0, 1, 4, 7]
    ];
    var coarsesalt = [
        [ItemID.ex_IronDustSalts, 0, 1, 4, 17],
        [ItemID.ex_GoldDustSalts, 0, 1, 4, 17],
        [ItemID.ex_NickelDustSalts, 0, 1, 4, 10],
        [ItemID.ex_PlatinumDustSalts, 0, 1, 4, 5],
        [ItemID.ex_AluminumDustSalts, 0, 1, 4, 7]
    ];
    var boxes_1 = [
        [c0, c8, c0, c16, c12, c1],
        [c0, c8, c15, c16, c12, c16],
        [c0, c8, c1, c1, c12, c15],
        [c15, c8, c1, c16, c12, c15],
        [c1, c0, c1, c2, c9, c2],
        [c14, c0, c14, c15, c9, c15],
        [c14, c0, c1, c15, c9, c2],
        [c1, c0, c14, c2, c9, c15]
    ];
    var boxes_2 = [
        [c1, c0, c1, c15, c12, c15],
        [c0, c8, c15, c16, c12, c16],
        [c0, c8, c1, c1, c12, c15],
        [c15, c8, c1, c16, c12, c15],
        [c1, c0, c1, c2, c9, c2],
        [c14, c0, c14, c15, c9, c15],
        [c14, c0, c1, c15, c9, c2],
        [c1, c0, c14, c2, c9, c15]
    ];
    var sieveModelFUNC = function(stringId, metal, texture, x, y, z, click, dim) {
        var model = BlockRenderer.createModel();
        for (var box in boxes_1) {
            var array = boxes_1[box];
            model.addBox(array[0], array[1], array[2], array[3], array[4], array[5], BlockID[stringId], 0);
        };
        if (texture == "air" || !texture) {
            model.addBox(c1, 11 / 16, c1, c15, 15 / 16 - (0.25 / 14) * click, c15, [
                ["air", 0]
            ]);
        } else {
            model.addBox(c1, 11 / 16, c1, c15, 15 / 16 - (0.25 / 14) * click, c15, [
                [texture, 0]
            ]);
        };
        if (metal == "air" || !metal) {
            model.addBox(c1, 0.55, c1, c15, 0.6, c15, [
                ["air", 0]
            ]);
        } else {
            model.addBox(c1, 0.55, c1, c15, 0.6, c15, [
                ["ex_sieve" + metal + "Mesh", 0]
            ]);
        };
        var render = new ICRender.Model();
        render.addEntry(model);
        BlockRenderer.mapAtCoords(x, y, z, render);
        var Collision = new ICRender.CollisionShape();
        for (var box in boxes_2) {
            var array = boxes_2[box];
            Collision.addEntry()
                .addBox(array[0], array[1], array[2], array[3], array[4], array[5])
        };
        Collision.addEntry()
            .addBox(c1, 11 / 16, c1, c15, 15 / 16 - (0.25 / 14) * click, c15);
        Collision.addEntry()
            .addBox(c1, 0.55, c1, c15, 0.6, c15);
        BlockRenderer.mapCollisionModelAtCoords(dim, x, y, z, Collision);
    };
    var SetupModel = function(stringId) {
        var model = BlockRenderer.Model();
        for (var box in boxes_1) {
            var array = boxes_1[box];
            model.addBox(array[0], array[1], array[2], array[3], array[4], array[5], BlockID[stringId], 0);
        };
        var render = new ICRender.Model();
        render.addEntry(model);
        BlockRenderer.enableCoordMapping(BlockID[stringId], 0, render);
        var Collision = new ICRender.CollisionShape();
        for (var box in boxes_2) {
            var array = boxes_2[box];
            Collision.addEntry()
                .addBox(array[0], array[1], array[2], array[3], array[4], array[5])
        };
        BlockRenderer.setCustomCollisionShape(BlockID[stringId], 0, Collision);
    };
    var SetupTileEntity = function(stringId, name, tex) {
        this.tileEntity = {};
        this.tileEntity.client = {};
        this.tileEntity.useNetworkItemContainer = true;
        this.tileEntity.defaultValues = {
            dropChance: 0,
            brokeChance: 0,
            click: 0,
            _break: 0,
            SieveOnce: false
        };
        this.tileEntity.init = function() {
            var meshSlot = this.container.getSlot("meshSlot");
            var inPutSlot = this.container.getSlot("inPutSlot");
            if (EXCore.Mesh[meshSlot.id] && EXCore.Mesh[meshSlot.id].data) {
                if (inPutSlot.count > 0) {
                    this.sieveModel(EXCore.Mesh[meshSlot.id].data, Sieve.sieve[EXCore.Mesh[meshSlot.id].group][inPutSlot.id].texture);
                } else {
                    this.sieveModel(EXCore.Mesh[meshSlot.id].data, "air");
                };
            };
        };
        this.tileEntity.sieveModel = function(metal, texture_) {
            var meshSlot = this.container.getSlot("meshSlot");
            if (metal) {
                this.networkData.putString("mesh", metal);
            } else {
                this.networkData.putString("mesh", "air");
            };
            if (texture_) {
                this.networkData.putString("texture", texture_);
            } else {
                this.networkData.putString("texture", "air");
            };
            this.networkData.putInt("click", this.data.click);
            this.networkData.putInt("dim", this.dimension);
            this.networkData.sendChanges();
            //sieveModelFUNC(metal, texture_, this.x, this.y, this.z, this.data.click, this.dimension);
        };
        this.tileEntity.click = function(id, count, data, croods, player) {
            var inPutSlot = this.container.getSlot("inPutSlot");
            var meshSlot = this.container.getSlot("meshSlot");
            var a = 0;
            if (!EXCore.Mesh[meshSlot.id]) {
                if (EXCore.Mesh[id] && Sieve.type[this.blockSource.getBlock(this.x, this.y, this.z)
                    .id] == EXCore.Mesh[id].group) {
                    meshSlot.setSlot(id, 1, data);
                    this.data.dropChance = EXCore.Mesh[id].dropchance;
                    new PlayerEntity(player)
                        .setCarriedItem(id, count - 1, data);
                    this.sieveModel(EXCore.Mesh[meshSlot.id].data, "air")
                };
            };
            if (EXCore.Mesh[meshSlot.id]) {
                if (inPutSlot.id <= 0 && Sieve.sieve[EXCore.Mesh[meshSlot.id].group][id]) {
                    Game.prevent();
                    inPutSlot.setSlot(id, 1, data);
                    new PlayerEntity(player)
                        .setCarriedItem(id, count - 1, data);
                };
                if (inPutSlot.count > 0 && this.data.click < 14) {
                    SoundManager.playSoundAtEntity(player, "sieve.ogg");
                    this.data.click++;
                    this.sieveModel(EXCore.Mesh[meshSlot.id].data, Sieve.sieve[EXCore.Mesh[meshSlot.id].group][inPutSlot.id].texture, player);
                    Game.prevent();
                } else {
                    Game.prevent();
                };
                if (this.data.click >= 14) {
                    meshSlot.setSlot(meshSlot.id, 1, meshSlot.data += 1);
                    while (a < (EXCore.Mesh[meshSlot.id].group == "ex" ? 1 : 6)) {
                        this.sieveModel(EXCore.Mesh[meshSlot.id].data, "air");
                        for (i in Sieve[inPutSlot.id]) {
                            if (Math.random() * 100 <= Sieve[inPutSlot.id][i].chance + this.data.dropChance) {
                                try {
                                    this.blockSource.spawnDroppedItem(this.x + 0.5, this.y + 0.9, this.z + 0.5, i || 0, randomNum(Sieve[inPutSlot.id][i].dropmin, Sieve[inPutSlot.id][i].dropmax, 1 / 4) || 0, Sieve[inPutSlot.id][i].data || 0);
                                } catch (e) {};
                            };
                        };
                        a += 1;
                    };
                    if (meshSlot.data > Item.getMaxDamage(meshSlot.id)) {
                        SoundManager.playSoundAtEntity(player, "meshbreak.ogg");
                        meshSlot.setSlot(0, 0, 0);
                        BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
                        BlockRenderer.unmapCollisionModelAtCoords(this.dimension, this.x, this.y, this.z);
                    };
                    inPutSlot.setSlot(0, 0, 0);
                    this.data.click = 0;
                };
            };
            this.networkData.sendChanges();
        };
        this.tileEntity.destroyBlock = function(coords, player) {
            BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
            BlockRenderer.unmapCollisionModelAtCoords(this.dimension, this.x, this.y, this.z);
            this.container.getSlot("inPutSlot")
                .count = 0;
        };
        this.tileEntity.client.renderModel = function() {
            let metal = this.networkData.getString("mesh") || "air";
            let texture_ = this.networkData.getString("texture") || "air";
            let click = this.networkData.getInt("click");
            let dim = this.networkData.getInt("dim");
            sieveModelFUNC(stringId, metal, texture_, this.x, this.y, this.z, click, dim);
        };
        this.tileEntity.client.load = function() {
            this.renderModel();
            var self = this;
            this.networkData.addOnDataChangedListener(function(data, isExternal) {
                self.renderModel();
            });
        };
        TileEntity.registerPrototype(BlockID[stringId], this.tileEntity);
    };
    Sieve = {
        sieve: {},
        type: {},
        addType: function(id, object) {
            this.type[id] = object;
        },
        addSievedBlock: function(group, id, object) {
            if (!Sieve.sieve[group]) {
                Sieve.sieve[group] = {}
            }
            Sieve.sieve[group][id] = object;
        },
        addSieved: function(block, id, data, min, max, chance) {
            if (!this[block]) {
                this[block] = {}
            };
            this[block][id] = {
                data: data,
                dropmin: min,
                dropmax: max,
                chance: chance
            };
        },
        addSieve: function(stringId, name, tex, type) {
            IDRegistry.genBlockID(stringId);
            Block.createBlock(stringId, [{
                name: name,
                texture: [
                    [tex, 0],
                    [tex, 0],
                    [tex, 0]
                ],
                inCreative: true
            }], {
                sound: "wood"
            });
            Sieve.addType(BlockID[stringId], type);
            SetupModel(stringId);
            Item.addCreativeGroup("Sieve", Translation.translate("Sieve"), [BlockID[stringId]]);
            SetupTileEntity(stringId, name, tex);
        }
    };
    Sieve.addSievedBlock("ex", VanillaBlockID.dirt, {
        data: "dirt",
        texture: "dirt"
    });
    Sieve.addSievedBlock("ex", VanillaBlockID.gravel, {
        data: "gravel",
        texture: "gravel"
    });
    Sieve.addSievedBlock("ex", VanillaBlockID.sand, {
        data: "sand",
        texture: "sand"
    });
    Sieve.addSievedBlock("ex", BlockID.ex_dust, {
        data: "dust",
        texture: "ex_dust"
    });
    Sieve.addSievedBlock("ex", VanillaBlockID.soul_sand, {
        data: "soulsand",
        texture: "soul_sand"
    });
    Sieve.addSievedBlock("ex", BlockID.ex_gravelNether, {
        data: "netherGravel",
        texture: "ex_gravelNether"
    });
    Sieve.addSievedBlock("ex", BlockID.ex_gravelEnder, {
        data: "enderGravel",
        texture: "ex_gravelEnder"
    });
    Sieve.addSievedBlock("ex", BlockID.ex_saltcoarse, {
        data: "coarsesalt",
        texture: "ex_coarsesalt"
    });
    Sieve.addSievedBlock("co", BlockID.compresseddirt, {
        data: "dirt",
        texture: "ex_compressed_dirt"
    });
    Sieve.addSievedBlock("co", BlockID.compressedgravel, {
        data: "gravel",
        texture: "ex_compressed_gravel"
    });
    Sieve.addSievedBlock("co", BlockID.compressedsand, {
        data: "sand",
        texture: "ex_compressed_sand"
    });
    Sieve.addSievedBlock("co", BlockID.compresseddust, {
        data: "dust",
        texture: "ex_compressed_dust"
    });
    Sieve.addSievedBlock("co", BlockID.compressedsoulsand, {
        data: "soulsand",
        texture: "ex_compressed_soul_sand"
    });
    for (var i = 0; i < gravel.length; i++) {
        Sieve.addSieved(VanillaBlockID["gravel"], gravel[i][0], gravel[i][1], gravel[i][2], gravel[i][3], gravel[i][4])
    };
    for (var i = 0; i < dirt.length; i++) {
        Sieve.addSieved(VanillaBlockID["dirt"], dirt[i][0], dirt[i][1], dirt[i][2], dirt[i][3], dirt[i][4])
    };
    for (var i = 0; i < sand.length; i++) {
        Sieve.addSieved(VanillaBlockID["sand"], sand[i][0], sand[i][1], sand[i][2], sand[i][3], sand[i][4])
    };
    for (var i = 0; i < dust.length; i++) {
        Sieve.addSieved(BlockID.ex_dust, dust[i][0], dust[i][1], dust[i][2], dust[i][3], dust[i][4])
    };
    for (var i = 0; i < soulsand.length; i++) {
        Sieve.addSieved(VanillaBlockID["soul_sand"], soulsand[i][0], soulsand[i][1], soulsand[i][2], soulsand[i][3], soulsand[i][4])
    };
    for (var i = 0; i < netherGravel.length; i++) {
        Sieve.addSieved(BlockID.ex_gravelNether, netherGravel[i][0], netherGravel[i][1], netherGravel[i][2], netherGravel[i][3], netherGravel[i][4])
    };
    for (var i = 0; i < enderGravel.length; i++) {
        Sieve.addSieved(BlockID.ex_gravelEnder, enderGravel[i][0], enderGravel[i][1], enderGravel[i][2], enderGravel[i][3], enderGravel[i][4])
    };
    for (var i = 0; i < coarsesalt.length; i++) {
        Sieve.addSieved(BlockID.ex_saltcoarse, coarsesalt[i][0], coarsesalt[i][1], coarsesalt[i][2], coarsesalt[i][3], coarsesalt[i][4])
    };


    Callback.addCallback("PostLoaded",

    function() {
        for (var i in Sieve[VanillaBlockID["gravel"]]) {
            Sieve.addSieved(BlockID.compressedgravel, i, Sieve[VanillaBlockID["gravel"]][i].data, Sieve[VanillaBlockID["gravel"]][i].dropmin, Sieve[VanillaBlockID["gravel"]][i].dropmax, Sieve[VanillaBlockID["gravel"]][i].chance)
        };

        for (var i in Sieve[VanillaBlockID["dirt"]]) {
            Sieve.addSieved(BlockID.compresseddirt, i, Sieve[VanillaBlockID["dirt"]][i].data, Sieve[VanillaBlockID["dirt"]][i].dropmin, Sieve[VanillaBlockID["dirt"]][i].dropmax, Sieve[VanillaBlockID["dirt"]][i].chance)
        };

        for (var i in Sieve[VanillaBlockID["sand"]]) {
            Sieve.addSieved(BlockID.compressedsand, i, Sieve[VanillaBlockID["sand"]][i].data, Sieve[VanillaBlockID["sand"]][i].dropmin, Sieve[VanillaBlockID["sand"]][i].dropmax, Sieve[VanillaBlockID["sand"]][i].chance)
        };

        for (var i in Sieve[BlockID.ex_dust]) {
            Sieve.addSieved(BlockID.compresseddust, i, Sieve[BlockID.ex_dust][i].data, Sieve[BlockID.ex_dust][i].dropmin, Sieve[BlockID.ex_dust][i].dropmax, Sieve[BlockID.ex_dust][i].chance)
        };

        for (var i in Sieve[VanillaBlockID["soul_sand"]]) {
            Sieve.addSieved(BlockID.compressedsoulsand, i, Sieve[VanillaBlockID["soul_sand"]][i].data, Sieve[VanillaBlockID["soul_sand"]][i].dropmin, Sieve[VanillaBlockID["soul_sand"]][i].dropmax, Sieve[VanillaBlockID["soul_sand"]][i].chance)
        };
    });
})();