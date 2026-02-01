var ForestryAPI_GROUP_ = {
	4 : 0,
	132 : 0,
	155 : 0,
	27 : 0,
	29 : 0,
	157 : 0,
	1 : 1,
	2 : 2,
	6 : 5,
	134 : 5,
	21 : 3,
	149 : 3,
	12 : 4,
	140 : 4,
	30 : 4,
	26 : 4
};
ModAPI.addAPICallback("ForestryAPI",
function(api) {
	IDRegistry.genBlockID("ex_beeTrap");
	Block.createBlock("ex_beeTrap", [{
		name: "Artificial Hive",
		texture: [["ex_ArtificialHive", 1], ["ex_ArtificialHive", 1], ["ex_ArtificialHive", 0]],
		inCreative: true
	}]);
	IDRegistry.genBlockID("ex_beeTrapTreated");
	Block.createBlock("ex_beeTrapTreated", [{
		name: "Scented Artificial Hive",
		texture: [["ex_ScentedArtificialHive", 1], ["ex_ScentedArtificialHive", 1], ["ex_ScentedArtificialHive", 0]],
		inCreative: true
	}]);
	Block.setRandomTickCallback(BlockID.ex_beeTrapTreated,
	function(x, y, z, id, data, blockSource) {
		var G = Math.random();
		var BiomeID = blockSource.getBiome(x, z);
		if (G < 0.25) {
			for (var key in ForestryAPI_GROUP_) {
				if (BiomeID == key) {
					TileEntity.destroyTileEntityAtCoords(x, y, z, blockSource);
					blockSource.setBlock(x, y, z, BlockID.ex_beehive, ForestryAPI_GROUP_[key]);
					TileEntity.addTileEntity(x, y, z, blockSource);
				}
			}
		} else {
			TileEntity.destroyTileEntityAtCoords(x, y, z, blockSource);
			blockSource.setBlock(x, y, z, BlockID.ex_beeTrap, 0);
			TileEntity.addTileEntity(x, y, z, blockSource);
		}
	});
});