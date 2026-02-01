var Damage_TYPE_ = Block.createSpecialType({
    sound: "stone"
});
IDRegistry.genBlockID("ex_damage0");
Block.createBlock("ex_damage0", [{
    name: "Damage",
    texture: [
        ["ex_damageSide", 0],
        ["ex_damageSide", 0],
        ["ex_damageSide", 0],
        ["ex_damageFront", 0],
        ["ex_damageSide", 0],
        ["ex_damageSide", 0]
    ],
    inCreative: true
}, {
    name: "Damage1",
    texture: [
        ["ex_damageSide", 0],
        ["ex_damageSide", 0],
        ["ex_damageFront", 0],
        ["ex_damageSide", 0],
        ["ex_damageSide", 0],
        ["ex_damageSide", 0]
    ],
    inCreative: false
}, {
    name: "Damage2",
    texture: [
        ["ex_damageSide", 0],
        ["ex_damageSide", 0],
        ["ex_damageSide", 0],
        ["ex_damageSide", 0],
        ["ex_damageFront", 0],
        ["ex_damageSide", 0]
    ],
    inCreative: false
}, {
    name: "Damage3",
    texture: [
        ["ex_damageSide", 0],
        ["ex_damageSide", 0],
        ["ex_damageSide", 0],
        ["ex_damageSide", 0],
        ["ex_damageSide", 0],
        ["ex_damageFront", 0], ],
    inCreative: false
}], Damage_TYPE_);
//damage z+ 0
//damage1 z- 1
//damage2 x- 2
//damage3 x+ 3

ToolAPI.registerBlockMaterial(BlockID["ex_damage0"], "stone");

Block.registerPlaceFunction("ex_damage0", function(coords, item, block, player, blocksource) {
    if (TileRender_private.getBlockRotation(player, false) == 0) {
        blocksource.setBlock(coords.relative.x, coords.relative.y, coords.relative.z, item.id, 1);
    } else if (TileRender_private.getBlockRotation(player, false) == 1) {
        blocksource.setBlock(coords.relative.x, coords.relative.y, coords.relative.z, item.id, 0);
    } else if (TileRender_private.getBlockRotation(player, false) == 2) {
        blocksource.setBlock(coords.relative.x, coords.relative.y, coords.relative.z, item.id, 2);
    } else if (TileRender_private.getBlockRotation(player, false) == 3) {
        blocksource.setBlock(coords.relative.x, coords.relative.y, coords.relative.z, item.id, 3);
    }
});

Block.registerDropFunctionForID(BlockID["ex_damage0"], function(id, data) {
    return [
    [BlockID["ex_damage0"], 1, 0]];
});
var LIST = {
    "0": true,
    "7": true,
    "8": true,
    "9": true,
    "10": true,
    "11": true,
    "34": true,
    "51": true,
    "90": true,
    "95": true,
    "119": true,
    "120": true,
    "122": true,
    "137": true,
    "188": true,
    "189": true,
    "192": true,
    "199": true,
    "205": true,
    "209": true,
    "217": true,
    "218": true,
    "415": true,
    "416": true,
    "466": true,
    "470": true,
    "472": true,
    "6": true,
    "31": true,
    "32": true,
    "37": true,
    "38": true,
    "39": true,
    "40": true,
    "104": true,
    "105": true,
    "115": true,
    "127": true,
    "141": true,
    "142": true,
    "175": true,
    "244": true,
    "385": true,
    "386": true,
    "387": true,
    "388": true,
    "389": true,
    "390": true,
    "391": true,
    "392": true,
    "462": true,
    "140": true,
};

function checkAlow(ID) {
    if (Config.checkAlow) {
        return LIST[ID] ? false : true;
    } else {
        return true;
    };
};
TileEntity.registerPrototype(BlockID.ex_damage0, {
    defaultValues: {
        blockData: 0,
        workTime: 0,
    },
    work: function(x, y, z) {
        this.data.workTime += 1;
        var ST = this.blockSource.getBlock(this.x + x, this.y + y, this.z + z);
        if (this.data.workTime == 50) {
            this.blockSource.destroyBlock(this.x + x, this.y + y, this.z + z, false);
            if (checkAlow(ST.id)) {
                if (ST.id > 255 && ST.id < 8000) {
                    this.blockSource.spawnDroppedItem(this.x + x, this.y + y, this.z + z, 255 - ST.id, 1, ST.data);
                } else {
                    this.blockSource.spawnDroppedItem(this.x + x, this.y + y, this.z + z, ST.id, 1, ST.data);
                };
            };
            this.data.workTime = 0;
        };
    },
    checkData: function(blocksource) {
        this.data.blockData = blocksource.getBlockData(this.x, this.y, this.z);
    },
    tick: function() {
        this.checkData(this.blockSource);
        if (this.data.blockData == 0) {
            this.work(0, 0, 1);
        };
        if (this.data.blockData == 1) {
            this.work(0, 0, -1);
        };
        if (this.data.blockData == 2) {
            this.work(-1, 0, 0);
        };
        if (this.data.blockData == 3) {
            this.work(1, 0, 0);
        };
    }
});