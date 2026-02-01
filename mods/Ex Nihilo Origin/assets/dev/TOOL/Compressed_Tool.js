ModAPI.addAPICallback("ENR",
function(api) {
	IDRegistry.genItemID("doublecompresseddiamondhammer");
	Item.createItem("doublecompresseddiamondhammer", "Double Compressed Diamond Hammer", {
		name: "ex_double_compressed_diamond_hammer",
		meta: 0
	});
	IDRegistry.genItemID("ex_hammersoresmasher");
	Item.createItem("ex_hammersoresmasher", "Ore Smasher", {
		name: "ex_ore_smasher",
		meta: 0
	});
	api.EX.addHammer(ItemID.ex_hammersoresmasher);
	api.EX.registerHammer("CompressedWood", "ex_compressed_hammer_wood", 0);
	api.EX.registerHammer("CompressedStone", "ex_compressed_hammer_stone", 0);
	api.EX.registerHammer("CompressedIron", "ex_compressed_hammer_iron", 0);
	api.EX.registerHammer("CompressedGold", "ex_compressed_hammer_gold", 0);
	api.EX.registerHammer("CompressedDiamond", "ex_compressed_hammer_diamond", 0);
	CompressedCore.addHammer(ItemID.ex_hammersCompressedWood);
	CompressedCore.addHammer(ItemID.ex_hammersCompressedStone);
	CompressedCore.addHammer(ItemID.ex_hammersCompressedIron);
	CompressedCore.addHammer(ItemID.ex_hammersCompressedGold);
	CompressedCore.addHammer(ItemID.ex_hammersCompressedDiamond);
	ToolAPI.setTool(ItemID.ex_hammersCompressedWood, {
		durability: 540,
		level: 1,
		efficiency: 2,
		damage: 2
	},
	ToolType.CompressedHammer);
	ToolAPI.setTool(ItemID.ex_hammersCompressedStone, {
		durability: 1188,
		level: 2,
		efficiency: 3,
		damage: 3
	},
	ToolType.CompressedHammer);
	ToolAPI.setTool(ItemID.ex_hammersCompressedIron, {
		durability: 2259,
		level: 3,
		efficiency: 6,
		damage: 4
	},
	ToolType.CompressedHammer);
	ToolAPI.setTool(ItemID.ex_hammersCompressedGold, {
		durability: 297,
		level: 1,
		efficiency: 12,
		damage: 2
	},
	ToolType.CompressedHammer);
	ToolAPI.setTool(ItemID.ex_hammersCompressedDiamond, {
		durability: 14058,
		level: 4,
		efficiency: 8,
		damage: 5
	},
	ToolType.CompressedHammer);
	ToolAPI.setTool(ItemID.ex_hammersoresmasher, {
		durability: 2000,
		level: 4,
		efficiency: 8,
		damage: 5
	},
	ToolType.CompressedHammer);
	CompressedCore.transformation(BlockID.compressedcobblestone, 13, 9, 0);
	CompressedCore.transformation(BlockID.compressedgravel, 12, 9, 0);
	CompressedCore.transformation(BlockID.compressedsand, BlockID.ex_dust, 9, 0);
	CompressedCore.transformation(BlockID.compressednetherrack, BlockID.ex_gravelNether, 9, 0);
	CompressedCore.transformation(BlockID.compressedendstone, BlockID.ex_gravelEnder, 9, 0);
	function searchItem(player, id) {
		for (var i = 9; i < 45; i++) {
			if (new PlayerEntity(player).getInventorySlot(i).id == id) {
				return {
					id: new PlayerEntity(player).getInventorySlot(i).id,
					data: new PlayerEntity(player).getInventorySlot(i).data,
					extra: new PlayerEntity(player).getInventorySlot(i).extra,
					count: new PlayerEntity(player).getInventorySlot(i).count,
					slot: i
				};
			};
		};
	};
	function set(x, y, z, ID, id, player) {
		let blockSource = BlockSource.getDefaultForActor(player);
		var block = blockSource.getBlock(x, y, z)["id"];
		if (block == 0 || block == 9 || block == 11) {
			var item = searchItem(player, id);
			if (!item||item.count<4) return;
			new PlayerEntity(player).setInventorySlot(item.slot, id, item.count - 4, 0);
			blockSource.setBlock(x, y, z, ID, 0);
			if (item.count <= 0) {
				new PlayerEntity(player).setInventorySlot(item.slot, 0, 0, 0);
			};
		};
	};
	Item.registerUseFunction("ex_hammersoresmasher",
	function(coords, item, b, player) {
		var x = coords.relative.x;
		y = coords.relative.y;
		z = coords.relative.z;
		set(x, y, z, BlockID.ex_Irongravel, ItemID.ex_Ironbroken, player);
		set(x, y, z, BlockID.ex_Goldgravel, ItemID.ex_Goldbroken, player);
		set(x, y, z, BlockID.ex_Coppergravel, ItemID.ex_Copperbroken, player);
		set(x, y, z, BlockID.ex_Tingravel, ItemID.ex_Tinbroken, player);
		set(x, y, z, BlockID.ex_Leadgravel, ItemID.ex_Leadbroken, player);
		set(x, y, z, BlockID.ex_Silvergravel, ItemID.ex_Silverbroken, player);
		set(x, y, z, BlockID.ex_Platinumgravel, ItemID.ex_Platinumbroken, player);
		set(x, y, z, BlockID.ex_Aluminumgravel, ItemID.ex_Aluminumbroken, player);
		set(x, y, z, BlockID.ex_Nickelgravel, ItemID.ex_Nickelbroken, player);
		set(x, y, z, BlockID.ex_Ironsand, ItemID.ex_Ironcrushed, player);
		set(x, y, z, BlockID.ex_Goldsand, ItemID.ex_Goldcrushed, player);
		set(x, y, z, BlockID.ex_Coppersand, ItemID.ex_Coppercrushed, player);
		set(x, y, z, BlockID.ex_Tinsand, ItemID.ex_Tincrushed, player);
		set(x, y, z, BlockID.ex_Leadsand, ItemID.ex_Leadcrushed, player);
		set(x, y, z, BlockID.ex_Silversand, ItemID.ex_Silvercrushed, player);
		set(x, y, z, BlockID.ex_Platinumsand, ItemID.ex_Platinumcrushed, player);
		set(x, y, z, BlockID.ex_Aluminumsand, ItemID.ex_Aluminumcrushed, player);
		set(x, y, z, BlockID.ex_Nickelsand, ItemID.ex_Nickelcrushed, player);
		set(x, y, z, BlockID.ex_Irondust, ItemID.ex_Ironpowered, player);
		set(x, y, z, BlockID.ex_Golddust, ItemID.ex_Goldpowered, player);
		set(x, y, z, BlockID.ex_Copperdust, ItemID.ex_Copperpowered, player);
		set(x, y, z, BlockID.ex_Tindust, ItemID.ex_Tinpowered, player);
		set(x, y, z, BlockID.ex_Leaddust, ItemID.ex_Leadpowered, player);
		set(x, y, z, BlockID.ex_Silverdust, ItemID.ex_Silverpowered, player);
		set(x, y, z, BlockID.ex_Platinumdust, ItemID.ex_Platinumpowered, player);
		set(x, y, z, BlockID.ex_Aluminumdust, ItemID.ex_Aluminumpowered, player);
		set(x, y, z, BlockID.ex_Nickeldust, ItemID.ex_Nickelpowered, player);
		set(x, y, z, BlockID.ex_netherIrongravel, ItemID.ex_netherIronbroken, player);
		set(x, y, z, BlockID.ex_netherGoldgravel, ItemID.ex_netherGoldbroken, player);
		set(x, y, z, BlockID.ex_netherCoppergravel, ItemID.ex_netherCopperbroken, player);
		set(x, y, z, BlockID.ex_netherTingravel, ItemID.ex_netherTinbroken, player);
		set(x, y, z, BlockID.ex_netherLeadgravel, ItemID.ex_netherLeadbroken, player);
		set(x, y, z, BlockID.ex_netherSilvergravel, ItemID.ex_netherSilverbroken, player);
		set(x, y, z, BlockID.ex_netherPlatinumgravel, ItemID.ex_netherPlatinumbroken, player);
		set(x, y, z, BlockID.ex_netherAluminumgravel, ItemID.ex_netherAluminumbroken, player);
		set(x, y, z, BlockID.ex_netherNickelgravel, ItemID.ex_netherNickelbroken, player);
		set(x, y, z, BlockID.ex_enderIrongravel, ItemID.ex_enderIronbroken, player);
		set(x, y, z, BlockID.ex_enderGoldgravel, ItemID.ex_enderGoldbroken, player);
		set(x, y, z, BlockID.ex_enderCoppergravel, ItemID.ex_enderCopperbroken, player);
		set(x, y, z, BlockID.ex_enderTingravel, ItemID.ex_enderTinbroken, player);
		set(x, y, z, BlockID.ex_enderLeadgravel, ItemID.ex_enderLeadbroken, player);
		set(x, y, z, BlockID.ex_enderSilvergravel, ItemID.ex_enderSilverbroken, player);
		set(x, y, z, BlockID.ex_enderPlatinumgravel, ItemID.ex_enderPlatinumbroken, player);
		set(x, y, z, BlockID.ex_enderAluminumgravel, ItemID.ex_enderAluminumbroken, player);
		set(x, y, z, BlockID.ex_enderNickelgravel, ItemID.ex_enderNickelbroken, player);
	});
});