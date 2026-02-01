var BLOCK_TYPE_ORE = Block.createSpecialType({
	destroytime: 16.0,
	explosionres: 60,
	base: 1
});
IDRegistry.genBlockID("draconiumOre");
Block.createBlock("draconiumOre", [
	{name: "Draconium Ore", texture: [["draconium_ore", 0]], inCreative: true}
], BLOCK_TYPE_ORE)
ToolAPI.registerBlockMaterial(BlockID.draconiumOre, "stone")
Callback.addCallback("GenerateChunkUnderground", function (chunkX, chunkZ) {
    for(var i=0;i<7;i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 10, 40);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.draconiumOre, 7, 6);
    }
}
)
Block.registerDropFunction("draconiumOre", function(coords, blockID, blockData, level){
	if (level > 3){
		return [[ItemID.draconiumDust,1 + Math.random() * 2,0]]
	}
	return [];
}, 2);
IDRegistry.genBlockID("draconiumOreNether");
Block.createBlock("draconiumOreNether", [
	{name: "Draconium Ore", texture: [["draconium_ore_nether", 0]], inCreative: true}
], BLOCK_TYPE_ORE)
ToolAPI.registerBlockMaterial(BlockID.draconiumOreNether, "stone")
Callback.addCallback("GenerateNetherChunk", function (chunkX, chunkZ) {
    for(var i=0;i<7;i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 10, 123);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.draconiumOreNether, 7, 8);
    }
}
)
Block.registerDropFunction("draconiumOreNether", function(coords, blockID, blockData, level){
	if (level > 2){
		return [[ItemID.draconiumDust,1 + Math.random() * 2,0]]
	}
	return [];
}, 2);
IDRegistry.genBlockID("draconiumOreEnd");
Block.createBlock("draconiumOreEnd", [
	{name: "Draconium Ore", texture: [["draconium_ore_end", 0]], inCreative: true}
], BLOCK_TYPE_ORE)
ToolAPI.registerBlockMaterial(BlockID.draconiumOreEnd, "stone")
Callback.addCallback("GenerateEndChunk", function (chunkX, chunkZ) {
    for(var i=0;i<7;i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 10, 123);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.draconiumOreEnd, 7, 8);
    }
}
)
Block.registerDropFunction("draconiumOreEnd", function(coords, blockID, blockData, level){
	if (level > 2){
		return [[ItemID.draconiumDust,1 + Math.random() * 2,0]]
	}
	return [];
}, 2);
var BLOCK_TYPE_DRACONIUM = Block.createSpecialType({
	destroytime: 10.0,
	explosionres: 1500.0,
	base: 1
});
IDRegistry.genBlockID("draconiumBlock");
Block.createBlock("draconiumBlock", [
	{name: "Draconium Block", texture: [["draconium_block", 0], ["draconium_block", 0], ["draconium_block_side", 0]], inCreative: true}
], BLOCK_TYPE_DRACONIUM)
ToolAPI.registerBlockMaterial(BlockID.draconiumBlock, "stone")
Recipes.addShaped({id: BlockID.draconiumBlock, count: 1, data: 0}, [
	"aaa",
	"aaa",
	"aaa"
], ['a', ItemID.draconiumIngot, 0]); 
Recipes.addShaped({id: ItemID.draconiumIngot, count: 9, data: 0}, [
	"a"
], ['a', BlockID.draconiumBlock, 0]); 
Block.registerDropFunction("draconiumBlock", function(coords, blockID, blockData, level){
	if (level > 2){
		return [[BlockID.draconiumBlock, 1, 0]]
	}
	return [];
}, 2);
IDRegistry.genBlockID("draconiumBlockCharged");
Block.createBlock("draconiumBlockCharged", [
	{name: "Charged Draconium Block", texture: [["draconium_block_charged", 0], ["draconium_block_charged", 0], ["draconium_block_charged_side", 0]], inCreative: true}
], BLOCK_TYPE_DRACONIUM)
ToolAPI.registerBlockMaterial(BlockID.draconiumBlockCharged, "stone")
Block.registerDropFunction("draconiumBlockCharged", function(coords, blockID, blockData, level){
	if (level > 2){
		return [[BlockID.draconiumBlockCharged, 1, 0]]
	}
	return [];
}, 2);
var BLOCK_TYPE_BOOM = Block.createSpecialType({
	destroytime: 1200.0,
	explosionres: 1200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000.0,
	base: 1
});
IDRegistry.genBlockID("ressuractionStone");
Block.createBlock("ressuractionStone", [
	{name: "Ressuraction Stone", texture: [["ressuraction_stone", 0]], inCreative: true}
], BLOCK_TYPE_DRACONIUM)
ToolAPI.registerBlockMaterial(BlockID.ressuractionStone, "stone")
Recipes.addShaped({id: BlockID.ressuractionStone, count: 1, data: 0}, [
	" b",
	"bab",
	" b "
], ['a', BlockID.draconiumBlock, 0, 'b', ItemID.wywernCore, 0]); 