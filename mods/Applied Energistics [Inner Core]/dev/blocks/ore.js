IDRegistry.genBlockID("certusore");
Block.createBlock("certusore", [{name: "Руда истинного кварца", texture: [["certus_ore", 0], ["certus_ore", 0], ["certus_ore", 0], ["certus_ore", 0], ["certus_ore", 0], ["certus_ore", 0]], inCreative: true}]);

ToolAPI.registerBlockMaterial(BlockID.certusore, "stone", 2, true);
Block.registerDropFunction("certusore", function(coords, blockID, blockData, level){
 if (level >= 2){
  return [[ItemID.certusingot, 2, 0]]
 }
 if(level >= 2 && Math.random() == 0.15){
  return [[ItemID.certusingotcharged, 1, 0]]
 }
 return [];
}, 1);

Callback.addCallback("GenerateChunkUnderground", function (chunkX, chunkZ) {
    for(var i=0;i<10;i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 1, 100);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.certusore, 0, 5);
    }
}
)