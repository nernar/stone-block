(function() {
	var Leaves = Block.createSpecialType({
		base: VanillaBlockID.leaves,
		sound: "grass",
		destroytime: 0.15
	});
	IDRegistry.genBlockID("ex_infestedRaw0");
	IDRegistry.genBlockID("ex_infestedRaw1");
	IDRegistry.genBlockID("ex_infestedRaw2");
	IDRegistry.genBlockID("ex_infestedLeaf0");
	IDRegistry.genBlockID("ex_infestedLeaf1");
	IDRegistry.genBlockID("ex_infestedLeaf2");
	Block.createBlock("ex_infestedRaw0", [{
		name: "Raw Infested Leaves",
		texture: [["enr_RawInfestedLeaves0", 0]],
		inCreative: true
	}], Leaves);
	Block.createBlock("ex_infestedRaw1", [{
		name: "Raw Infested Leaves",
		texture: [["enr_RawInfestedLeaves1", 0]],
		inCreative: true
	}], Leaves);
	Block.createBlock("ex_infestedRaw2", [{
		name: "Raw Infested Leaves",
		texture: [["enr_RawInfestedLeaves2", 0]],
		inCreative: true
	}], Leaves);
	Block.createBlock("ex_infestedLeaf0", [{
		name: "Infested Leaves",
		texture: [["enr_InfestedLeaves0", 0]],
		inCreative: true
	}], Leaves);
	Block.createBlock("ex_infestedLeaf1", [{
		name: "Infested Leaves",
		texture: [["enr_InfestedLeaves1", 0]],
		inCreative: true
	}], Leaves);
	Block.createBlock("ex_infestedLeaf2", [{
		name: "Infested Leaves",
		texture: [["enr_InfestedLeaves2", 0]],
		inCreative: true
	}], Leaves);
	for (var i = 0; i < 3; i++) {
		Block.registerDropFunctionForID(BlockID["ex_infestedRaw" + i],
		function(id, data) {
			return []
		})
	}
})();
ToolAPI.registerBlockMaterial(BlockID.ex_infestedRaw0, "plant");
ToolAPI.registerBlockMaterial(BlockID.ex_infestedRaw1, "plant");
ToolAPI.registerBlockMaterial(BlockID.ex_infestedRaw2, "plant");
ToolAPI.registerBlockMaterial(BlockID.ex_infestedLeaf0, "plant");
ToolAPI.registerBlockMaterial(BlockID.ex_infestedLeaf1, "plant");
ToolAPI.registerBlockMaterial(BlockID.ex_infestedLeaf2, "plant");
var GrowGroup = {
	ex_infestedRaw0: BlockID.ex_infestedLeaf0,
	ex_infestedRaw1: BlockID.ex_infestedLeaf1,
	ex_infestedRaw2: BlockID.ex_infestedLeaf2
};
function check(block, x, y, z, blockSource) {
	if (LeafGroup[block.id] && LeafGroup[block.id][block.data]) {
		blockSource.setBlock(x, y, z, LeafGroup[block.id][block.data], 0)
	}
};
var LeafGroup = {
	18 : {
		0 : BlockID.ex_infestedRaw0,
		1 : BlockID.ex_infestedRaw2,
		2 : BlockID.ex_infestedRaw0,
		3 : BlockID.ex_infestedRaw1,
		4 : BlockID.ex_infestedRaw0,
		5 : BlockID.ex_infestedRaw2,
		6 : BlockID.ex_infestedRaw0,
		7 : BlockID.ex_infestedRaw1
	},
	161 : {
		0 : BlockID.ex_infestedRaw0,
		1 : BlockID.ex_infestedRaw0,
		2 : BlockID.ex_infestedRaw0,
		3 : BlockID.ex_infestedRaw0
	},
	registerLeafRaw: function(blockID, StringId) {
		Block.registerNeighbourChangeFunction(GrowGroup[StringId],
		function(coords, block, changedCoords, blockSource) {
			if (LeafGroup[blockSource.getBlockId(changedCoords.x, changedCoords.y, changedCoords.z)]) {
				blockSource.setBlock(changedCoords.x, changedCoords.y, changedCoords.z, LeafGroup[blockSource.getBlock(changedCoords.x, changedCoords.y, changedCoords.z).id][blockSource.getBlock(changedCoords.x, changedCoords.y, changedCoords.z).data], 0)
			}
		});
		Block.registerPlaceFunction(GrowGroup[StringId],
		function(coords, item, block, player, blockSource) {
			let x = coords.relative.x;
			let y = coords.relative.y;
			let z = coords.relative.z;
			blockSource.setBlock(x, y, z, item.id, item.data);
			check(blockSource.getBlock(x + 1, y, z), x + 1, y, z, blockSource);
			check(blockSource.getBlock(x - 1, y, z), x - 1, y, z, blockSource);
			check(blockSource.getBlock(x, y + 1, z), x, y + 1, z, blockSource);
			check(blockSource.getBlock(x, y - 1, z), x, y - 1, z, blockSource);
			check(blockSource.getBlock(x, y, z + 1), x, y, z + 1, blockSource);
			check(blockSource.getBlock(x, y, z - 1), x, y, z - 1, blockSource)
		});
		Block.setRandomTickCallback(blockID,
		function(x, y, z, id, data, blockSource) {
			blockSource.setBlock(x, y, z, GrowGroup[StringId], 0);
			check(blockSource.getBlock(x + 1, y, z), x + 1, y, z, blockSource);
			check(blockSource.getBlock(x - 1, y, z), x - 1, y, z, blockSource);
			check(blockSource.getBlock(x, y + 1, z), x, y + 1, z, blockSource);
			check(blockSource.getBlock(x, y - 1, z), x, y - 1, z, blockSource);
			check(blockSource.getBlock(x, y, z + 1), x, y, z + 1, blockSource);
			check(blockSource.getBlock(x, y, z - 1), x, y, z - 1, blockSource)
		})
	},
	registerDrop: function(blockID) {
		Block.registerDropFunctionForID(blockID,
		function(blockCoords, blockID, blockData, diggingLevel, enchant, item, region) {
			var random = Math.random() * 100;
			var data = random < 42.5 ? [[VanillaItemID.string, 1, 0]] : random < 10 ? [[VanillaItemID.string, 2, 0]] : [[0, 0, 0]];
			if (item.id == VanillaItemID.shears) {
				ToolAPI.breakCarriedTool(1);
				data = [[blockID, 1, 0]]
			}
			return [data[0]]
		});
	}
};
LeafGroup.registerLeafRaw(BlockID.ex_infestedRaw0, "ex_infestedRaw0");
LeafGroup.registerLeafRaw(BlockID.ex_infestedRaw1, "ex_infestedRaw1");
LeafGroup.registerLeafRaw(BlockID.ex_infestedRaw2, "ex_infestedRaw2");
LeafGroup.registerDrop(BlockID.ex_infestedLeaf0);
LeafGroup.registerDrop(BlockID.ex_infestedLeaf1);
LeafGroup.registerDrop(BlockID.ex_infestedLeaf2);