var dirtEarth_TYPE_ = Block.createSpecialType({
    base: VanillaBlockID.dirt,
    sound: "gravel"
});
IDRegistry.genBlockID("ex_dirtEarth");
Block.createBlock("ex_dirtEarth", [{
    name: "Cursed Earth",
    texture: [
        ["ex_dirtEarth", 2],
        ["ex_dirtEarth", 0],
        ["ex_dirtEarth", 1]
    ],
    inCreative: true
}], dirtEarth_TYPE_);
ToolAPI.registerBlockMaterial(BlockID.ex_dirtEarth, "dirt");
Block.registerDropFunctionForID(BlockID.ex_dirtEarth,

function(croods, id, data, toolLevel) {
    return toolLevel.silk >= 1 ? [
        [BlockID.ex_dirtEarth, 1, 0]
    ] : [
        [3, 1, 0]
    ];
});
var mob = [{
    id: 32,
    chance: 12.5
}, {
    id: 33,
    chance: 13.5
}, {
    id: 34,
    chance: 12.5
}, {
    id: 35,
    chance: 6
}, {
    id: 45,
    chance: 5
}, {
    id: 38,
    chance: 2
}];
var ENT = {
    64: true,
    65: true,
    66: true,
    67: true,
    68: true,
    69: true,
    77: true,
    80: true,
    81: true,
    82: true,
    83: true,
    84: true,
    85: true,
    86: true,
    90: true,
    93: true,
    94: true
};
var animal = {
    10: true,
    11: true,
    12: true,
    13: true,
    14: true,
    15: true,
    115: true,
    16: true,
    17: true,
    18: true
};
TileEntity.registerPrototype(BlockID.ex_dirtEarth, {
    defaultValues: {
        tick: 0,
        entity: {},
        jin: 0
    },
    setTileEntity: function(x, y, z, id, data) {
        this.blockSource.setBlock(x, y, z, id, data);
        TileEntity.addTileEntity(x, y, z, this.blockSource);
    },
    check1: function(x, y, z) {
        var number = this.blockSource.getBlockId(x, y, z);
        return number === 2 || number === 3 ? true : false;
    },
    findNear: function(coords) {
        var data = EntityDataRegistry.getAllData();
        var closest = {
            dis: 20
        };
        for (var entity in data) {
            var dis = Entity.getDistanceToCoords(parseInt(entity), coords);
            if (dis < closest.dis) {
                this.data.entity[entity] = true;
            }
        }
    },
    tick: function() {
        var light = World.getLightLevel;
        var x = this.x;
        var y = this.y;
        var z = this.z;
        this.data.tick++;

        var up = this.check1(x, y + 1, z);
        var bottom = this.check1(x, y - 1, z);
        var left = this.check1(x + 1, y, z);
        var right = this.check1(x - 1, y, z);
        var front = this.check1(x, y, z + 1);
        var behind = this.check1(x, y, z - 1);
        this.findNear({
            x: this.x,
            y: this.y,
            z: this.z
        });
        //		Particles.addParticle(x, y + 0.2, z, Native.ParticleType.suspendedTown, 1, 1, 1, 0);
        if (this.data.tick >= 10000 && light(x, y + 1, z) <= 4) {
            left ? this.setTileEntity(x + 1, y, z, BlockID.ex_dirtEarth, 0) : up ? this.setTileEntity(x, y + 1, z, BlockID.ex_dirtEarth, 0) : front ? this.setTileEntity(x, y, z + 1, BlockID.ex_dirtEarth, 0) : right ? this.setTileEntity(x - 1, y, z, BlockID.ex_dirtEarth, 0) : behind ? this.setTileEntity(x, y, z - 1, BlockID.ex_dirtEarth, 0) : bottom ? this.setTileEntity(x, y - 1, z, BlockID.ex_dirtEarth, 0) : null;
        }
        if (light(x, y + 1, z) >= 8) {
            this.data.jin++;
            if (this.data.jin > 10) {
                this.blockSource.setBlock(x, y, z, 3, 0);
                if (Math.random() * 100 < 55) {
                    this.blockSource.setBlock(x, y + 1, z, 51, 0);
                }
            };
            if (World.getThreadTime() % 6 == 0) {
                try {
                    var all = EntityDataRegistry.getAllData();
                    for (var i in all) {
                        if (!ENT[Entity.getType(parseInt(i))] && Entity.getDistanceToCoords(parseInt(i), {
                            x: this.x,
                            y: this.y + 1,
                            z: this.z
                        }) < 1) {
                            Entity.damageEntity(parseInt(i), 13)
                        }
                    }
                } catch (e) {}
            };
        }

        if (World.getThreadTime() % 670 == 20 && Object.keys(this.data.entity)
            .length < Config.EntityMax && light(x, y + 1, z) <= 6) {
            for (var i = 0; i < mob.length; i++) {
                if (Math.random() * 100 < mob[i].chance) {
                    Entity.spawn(x, y + 1.5, z, mob[i].id);
                    this.data.entity = {};
                }
            }
        } else if (Object.keys(this.data.entity)
            .length > Config.EntityMax) {
            this.data.entity = {};
        };
        if (World.getThreadTime() % 12 == 0) {
            try {
                All = EntityDataRegistry.getAllData();

                for (var i in All) {
                    if (animal[Entity.getType(parseInt(i))]) {
                        if (Entity.getDistanceToCoords(parseInt(i), {
                            x: this.x,
                            y: this.y + 1,
                            z: this.z
                        }) < 1) {
                            Commands.exec("summon lightning_bolt" + " " + this.x + " " + this.y + " " + this.z);
                            return;
                        }
                    }
                }
            } catch (e) {}
        }
    }
});