var RYDA = Block.createSpecialType({
 base: 15,
 solid: true,
 destroytime: 6,
 opaque: true
});
IDRegistry.genBlockID("oreAluminum");  

Block.createBlock("oreAluminum", [ {name: "Алюминий", texture: [["oreAluminum", 0]], inCreative: true} ]); 


Block.registerDropFunction("oreAluminum", function(coords, id, data, diggingLevel, toolLevel){ return [[4, 1, data]];
}); 


Callback.addCallback("GenerateChunkUnderground", function (chunkX, chunkZ) {
    for(var i=0;i<5;i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 10, 60);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreAluminum, 0, 6);
    }
}
)