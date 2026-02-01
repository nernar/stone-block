IDRegistry.genBlockID("ex_endCake");
Block.createBlockWithRotation("ex_endCake", [{
    name: "End Cake",
    texture: [
        ["enr_endCake", 0],
        ["enr_endCake", 1],
        ["enr_endCake", 2],
        ["enr_endCake", 2],
        ["enr_endCake", 2],
        ["enr_endCake", 2]
    ],
    inCreative: true
}], {
    base: 92,
    sound: "cloth",
    destroytime: 0.2
});
(function() {
    var render = new ICRender.Model();
    var model = BlockRenderer.Model();
    model.addBox(c1, c0, c1, c15, c8, c15, BlockID.ex_endCake, 0);
    render.addEntry(model);
    BlockRenderer.enableCoordMapping(BlockID.ex_endCake, 0, render);
    var Collision = new ICRender.CollisionShape();
    Collision.addEntry()
        .addBox(c1, c0, c1, c15, c8, c15);
    BlockRenderer.setCustomCollisionShape(BlockID.ex_endCake, 0, Collision);
    Block.registerDropFunctionForID(BlockID.ex_endCake, function(id, data) {
        return [];
    });

    function BuildEndCake(shape, x, y, z) {
        var model = BlockRenderer.Model();
        var render = new ICRender.Model();
        var Collision = new ICRender.CollisionShape();
        model.addBox(c1, c0, c1, c15, c8, shape / 16, BlockID.ex_endCake, 0);
        Collision.addEntry()
            .addBox(c1, c0, c1, c15, c8, shape / 16);
        render.addEntry(model);
        BlockRenderer.setCustomCollisionShape(BlockID.ex_endCake, 0, Collision);
        BlockRenderer.mapAtCoords(x, y, z, render);
    }
    var isTransfer;
    TileEntity.registerPrototype(BlockID.ex_endCake, {
        useNetworkItemContainer: true,
        defaultValues: {
            data: 15,
            transfer: false
        },
        client: {
            renderModel: function() {
                var shape = this.networkData.getInt("shape");
                BuildEndCake(shape, this.x, this.y, this.z);
            },
            load: function() {
                this.renderModel();
                var self = this;
                this.networkData.addOnDataChangedListener(function(data, isExternal) {
                    self.renderModel();
                });
            }
        },
        show: function() {
            this.networkData.putInt("shape", this.data.data);
            //BuildEndCake(this.data.data, this.x, this.y, this.z);
        },
        tick: function() {
            this.show();
            this.data.data <= 4 && this.blockSource.setBlock(this.x, this.y, this.z, 0, 0);
            this.networkData.sendChanges();
        },
        click: function(id, count, data, coords, player) {
            this.data.data -= 2;
            isTransfer = false;
            if (isTransfer != true && Entity.getDimension(player) == 0) {
                isTransfer = true;
            };
            Dimensions.transfer(player, 2);
        },
        destroy: function() {
            BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
        }
    });
    Callback.addCallback("CustomDimensionTransfer", function(entity, from, to) {
        if (to == 2 && isTransfer) {
            isTransfer = false;
            Callback.invokeCallback("GenerateAndSetPos", entity);
        };
    });
    Callback.addCallback("GenerateAndSetPos", function(playerUid) {
        Updatable.addUpdatable({
            timer: 0,
            update: function() {
                this.timer++;
                var pos = Entity.getPosition(playerUid);
                if (pos.y != 66) {
                    var blockSource = BlockSource.getDefaultForDimension(2);
                    var pos = Entity.getPosition(playerUid);
                    Updatable.addUpdatable({
                        age: 0,
                        update: function() {
                            Entity.setPosition(playerUid, 100 + 0.5, 53, 0 + 0.5);
                            this.remove = this.age++ > 5;
                        }
                    });
                    for (let coords_X = 98; coords_X <= 102; coords_X++) {
                        for (let coords_Z = -2; coords_Z <= 2; coords_Z++) {
                            for (let coords_Y = 49; coords_Y <= 51; coords_Y++) {
                                blockSource.setBlock(coords_X, coords_Y, coords_Z, 0, 0);
                            };
                            blockSource.setBlock(coords_X, 48, coords_Z, VanillaTileID.obsidian, 0);
                        };
                    };
                    var pos = Entity.getPosition(playerUid);
                    this.remove = ((pos.y == 53) || this.timer > 20) ? true : false;
                }
            }
        });
    });
})();