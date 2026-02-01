ToolType.pickaxe = {
	damage: 2,
	blockTypes: ["stone", "dirt"],
	onAttack: function(item) {
		if (item.data > Item.getMaxDamage(item.id)) {
			item.id = item.data = item.count = 0;
		}
	}
};
EXCore.registerHammer("Wood", "enr_hammers_Wood", 0);
EXCore.registerHammer("Stone", "enr_hammers_Stone", 0);
EXCore.registerHammer("Iron", "enr_hammers_Iron", 0);
EXCore.registerHammer("Gold", "enr_hammers_Gold", 0);
EXCore.registerHammer("Diamond", "enr_hammers_Diamond", 0);
EXCore.registerHammer("Copper", "enr_hammers_Copper", 0);
EXCore.registerHammer("Tin", "enr_hammers_Tin", 0);
EXCore.registerHammer("Lead", "enr_hammers_Lead", 0);
EXCore.registerHammer("Silver", "enr_hammers_Silver", 0);
EXCore.registerHammer("Platinum", "enr_hammers_Platinum", 0);
EXCore.registerHammer("Aluminum", "enr_hammers_Aluminum", 0);
EXCore.registerHammer("Invar", "enr_hammers_Invar", 0);
EXCore.registerHammer("Nickel", "enr_hammers_Nickel", 0);
ToolAPI.setTool(ItemID.ex_hammersWood, {
	durability: 60,
	level: 1,
	efficiency: 2,
	damage: 2
},
ToolType.pickaxe);
ToolAPI.setTool(ItemID.ex_hammersStone, {
	durability: 132,
	level: 2,
	efficiency: 3,
	damage: 3
},
ToolType.pickaxe);
ToolAPI.setTool(ItemID.ex_hammersIron, {
	durability: 251,
	level: 3,
	efficiency: 6,
	damage: 4
},
ToolType.pickaxe);
ToolAPI.setTool(ItemID.ex_hammersGold, {
	durability: 33,
	level: 1,
	efficiency: 12,
	damage: 2
},
ToolType.pickaxe);
ToolAPI.setTool(ItemID.ex_hammersDiamond, {
	durability: 1562,
	level: 4,
	efficiency: 8,
	damage: 5
},
ToolType.pickaxe);
ToolAPI.setTool(ItemID.ex_hammersCopper, {
	durability: 175,
	level: 1,
	efficiency: 4,
	damage: 1
},
ToolType.pickaxe);
ToolAPI.setTool(ItemID.ex_hammersTin, {
	durability: 200,
	level: 1,
	efficiency: 5,
	damage: 1
},
ToolType.pickaxe);
ToolAPI.setTool(ItemID.ex_hammersSilver, {
	durability: 200,
	level: 2,
	efficiency: 6,
	damage: 2
},
ToolType.pickaxe);
ToolAPI.setTool(ItemID.ex_hammersLead, {
	durability: 150,
	level: 1,
	efficiency: 5,
	damage: 1
},
ToolType.pickaxe);
ToolAPI.setTool(ItemID.ex_hammersAluminum, {
	durability: 225,
	level: 1,
	efficiency: 10,
	damage: 1
},
ToolType.pickaxe);
ToolAPI.setTool(ItemID.ex_hammersNickel, {
	durability: 300,
	level: 2,
	efficiency: 6,
	damage: 2
},
ToolType.pickaxe);
ToolAPI.setTool(ItemID.ex_hammersPlatinum, {
	durability: 1700,
	level: 4,
	efficiency: 9,
	damage: 4
},
ToolType.pickaxe);
ToolAPI.setTool(ItemID.ex_hammersInvar, {
	durability: 450,
	level: 2,
	efficiency: 7,
	damage: 3
},
ToolType.pickaxe);
Callback.addCallback("PostLoaded",
function() {
	EXCore.transformation(VanillaBlockID.cobblestone, VanillaBlockID.gravel, 1, 0);
	EXCore.transformation(VanillaBlockID.gravel, VanillaBlockID.sand, 1, 0);
	EXCore.transformation(VanillaBlockID.sand, BlockID.ex_dust, 1, 0);
	EXCore.transformation(VanillaBlockID.log, ItemID.ex_dustSaw, 4, 0);
	EXCore.transformation(VanillaBlockID.log2, ItemID.ex_dustSaw, 4, 0);
});