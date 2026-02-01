var BLOCK_TYPE_HEART= Block.createSpecialType({
	destroytime: 0,
	explosionres: 19000000000000000000000000000000000.0,
	base: 1
});

IDRegistry.genBlockID("dragonHeart");
Block.createBlock("dragonHeart", [{name: "Dragon Heart", texture: [["dragon_heart", 0]], inCreative: false}], BLOCK_TYPE_HEART);
var render = new ICRender.Model(); 
BlockRenderer.setStaticICRender(BlockID.dragonHeart, 0, render);

var model = BlockRenderer.createModel();

model.addBox(8/16, 3/16, 7/16, 9/16, 4/16, 9/16, BlockID.dragonHeart, 0);
model.addBox(8/16, 4/16, 6/16, 9/16, 5/16, 10/16, BlockID.dragonHeart, 0);
model.addBox(7/16, 4/16, 7/16, 10/16, 5/16, 9/16, BlockID.dragonHeart, 0);
model.addBox(8/16, 5/16, 5/16, 9/16, 6/16, 11/16, BlockID.dragonHeart, 0);
model.addBox(7/16, 5/16, 6/16, 10/16, 6/16, 10/16, BlockID.dragonHeart, 0);
model.addBox(8/16, 6/16, 4/16, 9/16, 7/16, 12/16, BlockID.dragonHeart, 0);
model.addBox(7/16, 6/16, 5/16, 10/16, 7/16, 11/16, BlockID.dragonHeart, 0);
model.addBox(8/16, 7/16, 3/16, 9/16, 11/16, 13/16, BlockID.dragonHeart, 0);
model.addBox(7/16, 7/16, 4/16, 10/16, 11/16, 12/16, BlockID.dragonHeart, 0);
model.addBox(8/16, 11/16, 4/16, 9/16, 12/16, 12/16, BlockID.dragonHeart, 0);
model.addBox(7/16, 11/16, 5/16, 10/16, 12/16, 7/16, BlockID.dragonHeart, 0);
model.addBox(7/16, 11/16, 9/16, 10/16, 12/16, 11/16, BlockID.dragonHeart, 0);
model.addBox(8/16, 12/16, 5/16, 9/16, 13/16, 7/16, BlockID.dragonHeart, 0);
model.addBox(8/16, 12/16, 9/16, 9/16, 13/16, 11/16, BlockID.dragonHeart, 0);
render.addEntry(model); 

Block.setBlockShape(BlockID.dragonHeart, {x: 0.4, y: 0.1, z: 0.1}, {x: 0.6, y: 0.9, z: 0.9});

ToolAPI.registerBlockMaterial(BlockID.dragonHeart, "stone")
Block.registerDropFunction("dragonHeart", function(coords, blockID, blockData, level){
	if (level > -1){
		return [[ItemID.dragonHeart, 1, 0]]
	}
	return [];
}, 2);

IDRegistry.genBlockID("awakedBlock");
Block.createBlock("awakedBlock", [
	{name: "Awaked Draconic Block", texture: [["draconic_block", 0], ["draconic_block", 0], ["draconic_block_side", 0]], inCreative: true}
], BLOCK_TYPE_DRACONIUM)
ToolAPI.registerBlockMaterial(BlockID.awakedBlock, "stone")
Recipes.addShaped({id: BlockID.awakedBlock, count: 1, data: 0}, [
	"aaa",
	"aaa",
	"aaa"
], ['a', ItemID.awakedIngot, 0]); 