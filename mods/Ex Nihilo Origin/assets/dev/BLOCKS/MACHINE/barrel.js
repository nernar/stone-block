Barrel.modelset({
	"VanillaBlockID.dirt": {texture: [["dirt", 0]]},
	"VanillaBlockID.end_stone": {texture: [["end_stone", 0]]},
	"VanillaBlockID.obsidian": {texture: [["obsidian", 0]]},
	"VanillaBlockID.netherrack": {texture: [["netherrack", 0]]},
	"VanillaBlockID.clay": {texture: [["clay", 0]]},
	"VanillaBlockID.ice": {texture: [["ice", 0]]},
	"VanillaBlockID.soul_sand": {texture: [["soul_sand", 0]]},
	"VanillaItemID.slime_ball": {texture: [["ex_slime", 0]]}
});
Barrel.modeladd(BlockID.ex_beeTrapTreated, {
	texture: [["ex_ScentedArtificialHive", 0]]
});
Barrel.modeladd(BlockID.ex_beeTrap, {
	texture: [["ex_ArtificialHive", 0]]
});
Barrel.dataSet("water", {});
Barrel.dataSet("seedOil", {});
Barrel.dataSet("waterwitch", {
	"VanillaBlockID.sand:0": {output: VanillaBlockID.soul_sand}
});
Barrel.dataSet("waterslime", {});
Barrel.dataAdd("water", BlockID.ex_dust, 0, {
	output: VanillaBlockID.clay
});
Barrel.dataAdd("seedOil", BlockID.ex_beeTrap, 0, {
	output: BlockID.ex_beeTrapTreated
});
Barrel.dataSet("lava", {
	"VanillaItemID.glowstone_dust:0": {output: VanillaBlockID.end_stone},
	"VanillaItemID.redstone:0": {output: VanillaBlockID.netherrack}
});
Barrel.dataSet("null", {
	"VanillaBlockID.sapling:0": {volume: 125, texture: [["ex_1", 0]]},
	"VanillaBlockID.sapling:1": {volume: 125, texture: [["ex_1", 0]]},
	"VanillaBlockID.sapling:2": {volume: 125, texture: [["ex_1", 0]]},
	"VanillaBlockID.sapling:3": {volume: 125, texture: [["ex_1", 0]]},
	"VanillaBlockID.sapling:4": {volume: 125, texture: [["ex_1", 0]]},
	"VanillaBlockID.sapling:5": {volume: 125, texture: [["ex_1", 0]]},
	"VanillaBlockID.leaves:0": {volume: 125, texture: [["ex_1", 0]]},
	"VanillaBlockID.leaves:1": {volume: 125, texture: [["ex_1", 0]]},
	"VanillaBlockID.leaves:2": {volume: 125, texture: [["ex_1", 0]]},
	"VanillaBlockID.leaves:3": {volume: 125, texture: [["ex_1", 0]]},
	"VanillaBlockID.leaves2:0": {volume: 125, texture: [["ex_1", 0]]},
	"VanillaBlockID.leaves2:1": {volume: 125, texture: [["ex_1", 0]]},
	"VanillaItemID.rotten_flesh:0": {volume: 100, texture: [["ex_2", 0]]},
	"VanillaItemID.spider_eye:0": {volume: 160, texture: [["ex_3", 0]]},
	"VanillaItemID.yellow_flower:0": {volume: 100, texture: [["ex_14", 0]]},
	"VanillaBlockID.red_flower:0": {volume: 100, texture: [["ex_5", 0]]},
	"VanillaBlockID.red_flower:1": {volume: 100, texture: [["ex_6", 0]]},
	"VanillaBlockID.red_flower:2": {volume: 100, texture: [["ex_4", 0]]},
	"VanillaBlockID.red_flower:3": {volume: 100, texture: [["ex_7", 0]]},
	"VanillaBlockID.red_flower:4": {volume: 100, texture: [["ex_9", 0]]},
	"VanillaBlockID.red_flower:5": {volume: 100, texture: [["ex_9", 0]]},
	"VanillaBlockID.red_flower:6": {volume: 100, texture: [["ex_0", 0]]},
	"VanillaBlockID.red_flower:7": {volume: 100, texture: [["ex_10", 0]]},
	"VanillaBlockID.red_flower:8": {volume: 100, texture: [["ex_7", 0]]},
	"VanillaBlockID.double_plant:0": {volume: 125, texture: [["ex_14", 0]]},
	"VanillaBlockID.double_plant:1": {volume: 125, texture: [["ex_4", 0]]},
	"VanillaBlockID.double_plant:2": {volume: 125, texture: [["ex_1", 0]]},
	"VanillaBlockID.double_plant:3": {volume: 125, texture: [["ex_1", 0]]},
	"VanillaBlockID.double_plant:4": {volume: 125, texture: [["ex_8", 0]]},
	"VanillaBlockID.double_plant:5": {volume: 125, texture: [["ex_10", 0]]},
	"VanillaBlockID.brown_mushroom:0": {volume: 125, texture: [["ex_11", 0]]},
	"VanillaBlockID.red_mushroom:0": {volume: 125, texture: [["ex_12", 0]]},
	"VanillaItemID.wheat:0": {volume: 160, texture: [["ex_13", 0]]},
	"VanillaItemID.pumpkin_pie:0": {volume: 160, texture: [["ex_2", 0]]},
	"VanillaItemID.egg:0": {volume: 80, texture: [["ex_13", 0]]},
	"VanillaItemID.porkchop:0": {volume: 200, texture: [["ex_15", 0]]},
	"VanillaItemID.beef:0": {volume: 200, texture: [["ex_8", 0]]},
	"VanillaItemID.cooked_beef:0": {volume: 200, texture: [["ex_16", 0]]},
	"VanillaItemID.chicken:0": {volume: 200, texture: [["ex_12", 0]]},
	"VanillaItemID.cooked_chicken:0": {volume: 200, texture: [["ex_2", 0]]},
	"VanillaItemID.fish:0": {volume: 150, texture: [["ex_17", 0]]},
	"VanillaItemID.cooked_fish:0": {volume: 150, texture: [["ex_18", 0]]},
	"VanillaItemID.apple:0": {volume: 180, texture: [["ex_8", 0]]},
	"VanillaItemID.golden_apple:0": {volume: 180, texture: [["ex_14", 0]]},
	"VanillaItemID.melon:0": {volume: 40, texture: [["ex_8", 0]]},
	"VanillaBlockID.melon_block:0": {volume: 166.7, texture: [["ex_8", 0]]},
	"VanillaBlockID.pumpkin:0": {volume: 166.7, texture: [["ex_13", 0]]},
	"VanillaBlockID.cactus:0": {volume: 166.7, texture: [["ex_19", 0]]},
	"VanillaItemID.carrot:0": {volume: 80, texture: [["ex_9", 0]]},
	"VanillaItemID.potato:0": {volume: 160, texture: [["ex_13", 0]]},
	"VanillaItemID.baked_potato:0": {volume: 160, texture: [["ex_13", 0]]},
	"VanillaItemID.poisonous_potato:0": {volume: 160, texture: [["ex_19", 0]]},
	"VanillaBlockID.waterlily:0": {volume: 100, texture: [["ex_1", 0]]},
	"VanillaBlockID.vine:0": {volume: 100, texture: [["ex_1", 0]]},
	"VanillaItemID.salmon:0": {volume: 150, texture: [["ex_5", 0]]},
	"VanillaItemID.cooked_salmon:0": {volume: 150, texture: [["ex_2", 0]]},
	"VanillaItemID.clownfish:0": {volume: 150, texture: [["ex_9", 0]]},
	"VanillaItemID.pufferfish:0": {volume: 150, texture: [["ex_20", 0]]},
	"VanillaItemID.muttonraw:0": {volume: 200, texture: [["ex_8", 0]]},
	"VanillaItemID.muttoncooked:0": {volume: 200, texture: [["ex_16", 0]]},
	"VanillaItemID.rabbit:0": {volume: 200, texture: [["ex_12", 0]]},
	"VanillaItemID.cooked_rabbit:0": {volume: 200, texture: [["ex_2", 0]]},
	"VanillaItemID.string:0": {volume: 30, texture: [["ex_0", 0]]},
	"VanillaItemID.ghast_tear:0": {volume: 160, texture: [["ex_0", 0]]},
	"VanillaItemID.nether_wart:0": {volume: 100, texture: [["ex_5", 0]]},
	"VanillaItemID.reeds:0": {volume: 100, texture: [["ex_19", 0]]}
});
Barrel.dataAdd("null", ItemID.ex_dustSaw, 0, {
	volume: 125,
	texture: [["ex_13", 0]]
});
Barrel.dataAdd("null", -163, 0, {
	volume: 125,
	texture: [["ex_19", 0]]
});
Barrel.dataAdd("null", -156, 0, {
	volume: 160,
	texture: [["ex_13", 0]]
});
Barrel.dataAdd("null", 335, 0, {
	volume: 125,
	texture: [["ex_1", 0]]
});
Barrel.dataAdd("null", ItemID.ex_silkWorm, 0, {
	volume: 40,
	texture: [["ex_7", 0]]
});
Barrel.dataAdd("null", ItemID.ex_cookedSilkWorm, 0, {
	volume: 40,
	texture: [["ex_16", 0]]
});

Barrel.add("ex_barrelStone", "Stone Barrel", "stone", "stone");
//planks update
Barrel.add("ex_barrelOak", "Oak Barrel", "planks_oak", "wood");
Barrel.add("ex_barrelBirch", "Birch Barrel", "planks_birch", "wood");
Barrel.add("ex_barrelAcacia", "Acacia Barrel", "planks_acacia", "wood");
Barrel.add("ex_barrelBigOak", "Big Oak Barrel", "planks_big_oak", "wood");
Barrel.add("ex_barrelJungle", "Jungle Barrel", "planks_jungle", "wood");
Barrel.add("ex_barrelSpruce", "Spruce Barrel", "planks_spruce", "wood");
//glass update
Barrel.add("ex_barrel_glass_black", "Black Glass Barrel", "glass_black", "glass");
Barrel.add("ex_barrel_glass_blue", "Blue Glass Barrel", "glass_blue", "glass");
Barrel.add("ex_barrel_glass_brown", "Brown Glass Barrel", "glass_brown", "glass");
Barrel.add("ex_barrel_glass_cyan", "Cyan Glass Barrel", "glass_cyan", "glass");
Barrel.add("ex_barrel_glass_gray", "Gray Glass Barrel", "glass_gray", "glass");
Barrel.add("ex_barrel_glass_green", "Green Glass Barrel", "glass_green", "glass");
Barrel.add("ex_barrel_glass_light_blue", "Light blue Glass Barrel", "glass_light_blue", "glass");
Barrel.add("ex_barrel_glass_lime", "Lime Glass Barrel", "glass_lime", "glass");
Barrel.add("ex_barrel_glass_magenta", "Magenta Glass Barrel", "glass_magenta", "glass");
Barrel.add("ex_barrel_glass_orange", "Orange Glass Barrel", "glass_orange", "glass");
Barrel.add("ex_barrel_glass_pink", "Pink Glass Barrel", "glass_pink", "glass");
Barrel.add("ex_barrel_glass_purple", "Purple Glass Barrel", "glass_purple", "glass");
Barrel.add("ex_barrel_glass_red", "Red Glass Barrel", "glass_red", "glass");
Barrel.add("ex_barrel_glass_silver", "Silver Glass Barrel", "glass_silver", "glass");
Barrel.add("ex_barrel_glass_white", "White Glass Barrel", "glass_white", "glass");
Barrel.add("ex_barrel_glass_yellow", "Yellow Glass Barrel", "glass_yellow", "glass");
