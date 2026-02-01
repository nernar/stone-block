IDRegistry.genBlockID("ex_world_core");
Block.createBlockWithRotation("ex_world_core", [{
    name: "World Core",
    texture: [
        ["world_core", 0]
    ],
    inCreative: true
}], {
    base: VanillaBlockID.obsidian,
    explosionres: 99999
});

ModelHelper.loadModel(BlockID.ex_world_core, 0, "world_core_0");
ModelHelper.loadModel(BlockID.ex_world_core, 1, "world_core_0");
ModelHelper.loadModel(BlockID.ex_world_core, 2, "world_core_1");
ModelHelper.loadModel(BlockID.ex_world_core, 3, "world_core_1");

Block.registerDropFunctionForID(BlockID.ex_world_core,
function(blockCoords, blockID, blockData, diggingLevel) {
//    SummonAPI.spawnItemEntity(blockCoords.x, blockCoords.y, blockCoords.z, blockID, 1, blockData);
    if (diggingLevel >= 4) {
        return [[blockID, 1, blockData]];
    } else {
        return [];
    }
});
/*SummonAPI.setItemEntityAddedCallbackOpen(BlockID.ex_world_core);
Callback.addCallback("ItemEntityAdded", function(id, count, entity, tag, coords){
    if (id == BlockID.ex_world_core) {
        SummonAPI.spawnLightningBolt(coords.x, coords.y, coords.z);
    };
});
*/
/*SummonAPI.setItemEntityAddedCallbackOpen(BlockID.ex_world_core);
Callback.addCallback("ItemEntityAdded", 
function(id, count, entity, tag) {
    if (id == BlockID.ex_world_core) {
        let tags = tag.toScriptable();
        alert(JSON.stringify(tags));
    };
});
Callback.addCallback("ItemUse",
function(coords, item, block, isExternal, player) {
    SummonAPI.spawnItemEntity(coords.x, coords.y, coords.z, BlockID.ex_world_core, 1, 0, 0);
});
for (var i in Native.Dimension) {
    alert(i+":"+Native.Dimension[i]);
}
*/