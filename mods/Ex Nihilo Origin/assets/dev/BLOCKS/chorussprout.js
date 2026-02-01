var chorussproutHelper = /** @class */ (function () {
    function chorussproutHelper() {
    }
    chorussproutHelper.setPlantModel = function (id, data) {
        var render = new ICRender.CollisionShape();
        render.addEntry()
            .addBox(1, 1, 1, 0, 0, 0);
        BlockRenderer.setCustomCollisionShape(id, data, render);
        render = new ICRender.Model();
        var model = BlockRenderer.createModel();
        model.addBox(0.2499, 0.01, 0, 0.25, 0.99, 1, id, data);
        model.addBox(0, 0.01, 0.2499, 1, 0.99, 0.25, id, data);
        model.addBox(0.7499, 0.01, 0, 0.75, 0.99, 1, id, data);
        model.addBox(0, 0.01, 0.7499, 1, 0.99, 0.75, id, data);
        render.addEntry(model);
        BlockRenderer.setStaticICRender(id, data, render);
    };
    return chorussproutHelper;
}());
IDRegistry.genBlockID("ex_chorusSprout");
Block.createBlock("ex_chorusSprout", [{
        name: "",
        texture: [
            ["enr_chorusSprout", 0],
            ["enr_chorusSprout", 0],
            ["enr_chorusSprout", 0],
            ["enr_chorusSprout", 0],
            ["enr_chorusSprout", 0],
            ["enr_chorusSprout", 0]
        ],
        inCreative: false
    }]);
IDRegistry.genBlockID("ex_chorusSprout1");
Block.createBlock("ex_chorusSprout1", [{
        name: "",
        texture: [
            ["enr_chorusSprout", 1],
            ["enr_chorusSprout", 1],
            ["enr_chorusSprout", 1],
            ["enr_chorusSprout", 1],
            ["enr_chorusSprout", 1],
            ["enr_chorusSprout", 1]
        ],
        inCreative: false
    }]);
IDRegistry.genBlockID("ex_chorusSprout2");
Block.createBlock("ex_chorusSprout2", [{
        name: "",
        texture: [
            ["enr_chorusSprout", 2],
            ["enr_chorusSprout", 2],
            ["enr_chorusSprout", 2],
            ["enr_chorusSprout", 2],
            ["enr_chorusSprout", 2],
            ["enr_chorusSprout", 2]
        ],
        inCreative: false
    }]);
IDRegistry.genBlockID("ex_chorusSprout3");
Block.createBlock("ex_chorusSprout3", [{
        name: "",
        texture: [
            ["enr_chorusSprout", 3],
            ["enr_chorusSprout", 3],
            ["enr_chorusSprout", 3],
            ["enr_chorusSprout", 3],
            ["enr_chorusSprout", 3],
            ["enr_chorusSprout", 3]
        ],
        inCreative: false
    }]);
chorussproutHelper.setPlantModel(BlockID.ex_chorusSprout, 0);
chorussproutHelper.setPlantModel(BlockID.ex_chorusSprout1, 0);
chorussproutHelper.setPlantModel(BlockID.ex_chorusSprout2, 0);
chorussproutHelper.setPlantModel(BlockID.ex_chorusSprout3, 0);
Block.setRandomTickCallback(BlockID.ex_chorusSprout, function (x, y, z, id, data, blockSource) {
    var G = Math.random();
    if (G < 0.15) {
        TileEntity.destroyTileEntityAtCoords(x, y, z, blockSource);
        blockSource.setBlock(x, y, z, BlockID.ex_chorusSprout1, 0);
        TileEntity.addTileEntity(x, y, z, blockSource);
    }
});
Block.setRandomTickCallback(BlockID.ex_chorusSprout1, function (x, y, z, id, data, blockSource) {
    var G = Math.random();
    if (G < 0.15) {
        TileEntity.destroyTileEntityAtCoords(x, y, z, blockSource);
        blockSource.setBlock(x, y, z, BlockID.ex_chorusSprout2, 0);
        TileEntity.addTileEntity(x, y, z, blockSource);
    }
});
Block.setRandomTickCallback(BlockID.ex_chorusSprout2, function (x, y, z, id, data, blockSource) {
    var G = Math.random();
    if (G < 0.15) {
        TileEntity.destroyTileEntityAtCoords(x, y, z, blockSource);
        blockSource.setBlock(x, y, z, BlockID.ex_chorusSprout3, 0);
        TileEntity.addTileEntity(x, y, z, blockSource);
    }
});
setDrop(BlockID.ex_chorusSprout, ItemID.ex_seedsChorus);
setDrop(BlockID.ex_chorusSprout1, ItemID.ex_seedsChorus);
setDrop(BlockID.ex_chorusSprout2, ItemID.ex_seedsChorus);
setDrop(BlockID.ex_chorusSprout3, ItemID.ex_seedsChorus);
