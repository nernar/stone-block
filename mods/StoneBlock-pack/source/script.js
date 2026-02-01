// file: header.js

/*
     _____ _                   ____  _            _    
    / ____| |                 |  _ \| |          | |   
   | (___ | |_ ___  _ __   ___| |_) | | ___   ___| | __
    \___ \| __/ _ \| '_ \ / _ \  _ <| |/ _ \ / __| |/ /
    ____) | || (_) | | | |  __/ |_) | | (_) | (__|   < 
   |_____/ \__\___/|_| |_|\___|____/|_|\___/ \___|_|\_\

   Copyright 2022 Nernar (https://github.com/nernar)
   Copyright 2019-2022 FOLDIK UA (https://github.com/foldikos)
   
   Licensed under the Apache License, Version 2.0(the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
   
     http://www.apache.org/licenses/LICENSE-2.0
   
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

*/

const STONE_BLOCK_ROOM_LOCATION_Y = 183;

if (Entity.teleportTo === undefined) {
	(function(requireMethodFromNativeAPI) {
		Entity.teleportTo = requireMethodFromNativeAPI("api.NativeAPI", "teleportTo");
	})(ModAPI.requireGlobal("requireMethodFromNativeAPI"));
}

if (World.isLevelDisplayed === undefined) {
	(function(requireMethodFromNativeAPI) {
		World.isLevelDisplayed = requireMethodFromNativeAPI("api.NativeCallback", "isLevelDisplayed");
	})(ModAPI.requireGlobal("requireMethodFromNativeAPI"));
}

const addItemIntoTargetSlot = function(playerUid, slotId, id, count, data, extra, dropRemaining) {
	let player = new PlayerActor(playerUid);
	let slot = player.getInventorySlot(slotId);
	if (slot && slot.id == 0) {
		player.setInventorySlot(slotId, id, count || 1, data || 0, extra || null);
		return;
	}
	player.addItemToInventory(id, count || 1, data || 0, extra || null, dropRemaining || true);
};

Translation.addTranslation("Not developed yet", {
	ch: "還沒開發",
	ru: "Пока не реализовано",
	uk: "Поки що не реалізовано"
});

Files = Packages.com.zhekasmirnov.innercore.utils.FileTools;

IMPORT("BetterQuesting");

let json = Files.readFileText(__dir__ + "quests/quests.json");
let processor = BetterQuesting.fromJson("StoneBlock", JSON.parse(json));

// file: dimension/registration.js

const StoneBlock = new Dimensions.CustomDimension("StoneBlock", 9669);

if (StoneBlock.id != 9669) {
	Logger.info("StoneBlock", "StoneBlock dimension registered with another id (" + StoneBlock.id + ")!");
	if (Dimensions.getDimensionById(9669).name == "StoneBlock") {
		Logger.info("StoneBlock", "Found alternative registered dimension outside that instance");
		ModAPI.requireGlobal("MCSystem").throwException("Another StoneBlock dimension has been already registered");
	}
	Logger.info("StoneBlock", "Please unsure that you're installed only one core");
}

(function(dimension) {
	dimension.setHasSkyLight(false);
	// dimension.setSkyColor(.4, .4, .5);
	// dimension.setSunsetColor(.3, .3, .5);
	dimension.setFogColor(.3, .3, .5);
	dimension.setCloudColor(.4, .4, .5);
	let generator = new Dimensions.newGenerator({
		buildVanillaSurfaces: false,
		generateVanillaStructures: false,
		modWorldgenDimension: "overworld",
		biome: 0, // ocean
		layers: [
			// overworld lava border
			{
				minY: 254, maxY: 256,
				material: {
					base: VanillaBlockID.bedrock,
					surface: VanillaBlockID.lava
				}
			},
			{
				minY: 255, maxY: 256,
				material: {
					base: VanillaBlockID.magma
				},
				noise: {
					octaves: { count: 1, scale: 5 }
				}
			},
			// basic stone layer
			{
				minY: 0, maxY: 254,
				material: {
					base: VanillaBlockID.bedrock,
					surface: {
						id: VanillaBlockID.stone,
						width: 253
					}
				}
			}
		]
	});
	// Dimensions.overrideGeneratorForVanillaDimension(0, generator);
	dimension.setGenerator(generator);
})(StoneBlock);

// file: dimension/generation.js

let generationPostProcessLocation = [];

const generateStoneBlockRoom = function(dx, dz, ignoreSpawn) {
	// let source = BlockSource.getDefaultForDimension(StoneBlock.id);
	let source = BlockSource.getDefaultForDimension(Native.Dimension.NORMAL);

	Logger.info("StoneBlock", "Generating starting room at " + dx + ", " + dz);

	for (let gx = -5; gx < 5; gx++)
		for (let gy = -3; gy < 5; gy++)
			for (let gz = -5; gz < 5; gz++)
				if (gx * gx + gy * gy + gz * gz <= 20)
					World.setBlock(dx + gx, STONE_BLOCK_ROOM_LOCATION_Y + gy, dz + gz, 0, 0);
	
	// footage room surface corners
	World.setBlock(dx + 3, STONE_BLOCK_ROOM_LOCATION_Y - 2, dz + 3, 0, 0);
	World.setBlock(dx - 3, STONE_BLOCK_ROOM_LOCATION_Y - 2, dz + 3, 0, 0);
	World.setBlock(dx + 3, STONE_BLOCK_ROOM_LOCATION_Y - 2, dz - 3, 0, 0);
	World.setBlock(dx - 3, STONE_BLOCK_ROOM_LOCATION_Y - 2, dz - 3, 0, 0);
	
	World.setBlock(dx, STONE_BLOCK_ROOM_LOCATION_Y - 3, dz, VanillaBlockID.torch, 0);
	
	if (!ignoreSpawn) {
		spawnLocation = {
			x: dx,
			y: STONE_BLOCK_ROOM_LOCATION_Y,
			z: dz
		};
	}
};

let generatedStoneBlockRoom = false;
let spawnLocation = null;

// Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId) {
Callback.addCallback("GenerateChunk", function(chunkX, chunkZ, random, dimensionId) {
	// if (!generatedStoneBlockRoom && dimensionId == StoneBlock.id) {
	if (!generatedStoneBlockRoom && dimensionId == Native.Dimension.NORMAL) {
		let gx = Math.round(generationPostProcessLocation[0] / 16);
		let gz = Math.round(generationPostProcessLocation[1] / 16);
		Logger.debug("StoneBlock", "TEST " + gx + ", " + gz + "; " + chunkX + ", " + chunkZ);
		if (gx == chunkX && gz == chunkZ) {
			generateStoneBlockRoom(generationPostProcessLocation[0], generationPostProcessLocation[1]);
			generatedStoneBlockRoom = true;
			generationPostProcessLocation.splice(0, 2);
			teleportPostGeneratedPlayers();
		}
	}
});

Saver.addSavesScope("StoneBlock", function read(scope) {
	generatedStoneBlockRoom = !!scope.generatedRoom;
	spawnLocation = scope.spawnLocation;
}, function save() {
	return {
		generatedRoom: generatedStoneBlockRoom,
		spawnLocation: spawnLocation
	};
});

// file: dimension/teleport.js

const transferIntoStoneBlockDimension = function(playerUid) {
	Logger.debug("StoneBlock", "Transfering player (uid=" + playerUid + ") to StoneBlock");
	// Entity.addEffect(playerUid, Native.PotionEffect.fireResistance, 0, 120, false, false);
	Dimensions.transfer(playerUid, StoneBlock.id);
};

const teleportIntoStoneBlockRoom = function(playerUid) {
	Logger.debug("StoneBlock", "Teleporting player (uid=" + playerUid + ") into room");
	let position = Entity.getPosition(playerUid);
	Entity.teleportTo(playerUid, position.x, STONE_BLOCK_ROOM_LOCATION_Y, position.z);
	Entity.setPosition(playerUid, position.x, STONE_BLOCK_ROOM_LOCATION_Y, position.z);
	// Entity.clearEffect(playerUid, Native.PotionEffect.fireResistance);
	Logger.debug("StoneBlock", "Verifying player (uid=" + playerUid + ") compound byte");
	let compound = Entity.getCompoundTag(playerUid);
	if (compound.containsValueOfType("TeleportedIntoStoneBlock", 1)) {
		let state = compound.getByte("TeleportedIntoStoneBlock");
		if (state == 1) return;
	}
	Logger.debug("StoneBlock", "Adding required items (uid=" + playerUid + ") to start adventure");
	compound.putByte("TeleportedIntoStoneBlock", 1);
	addItemIntoTargetSlot(playerUid, 8, ItemID.quest_book);
};

const registerRequiredPlayerNbt = function(playerUid) {
	let compound = Entity.getCompoundTag(playerUid);
	// if (compound.containsValueOfType("DimensionId", 3)) {
		// if (compound.getInt("DimensionId") == 0) {
			// compound.putInt("DimensionId", StoneBlock.id);
		// }
		// Logger.debug("StoneBlock", "Found player (uid=" + playerUid + ") dimension");
	// }
	// if (compound.containsValueOfType("SpawnDimension", 3)) {
		// if (compound.getInt("SpawnDimension") == 3) {
			// compound.putInt("SpawnDimension", StoneBlock.id);
		// }
		// Logger.debug("StoneBlock", "Found player (uid=" + playerUid + ") spawn dimension");
	// }
	if (spawnLocation) {
		if (compound.containsValueOfType("SpawnX", 3)) {
			if (compound.getInt("SpawnX") != spawnLocation.x) {
				compound.putInt("SpawnX", spawnLocation.x);
			}
			Logger.debug("StoneBlock", "Found player (uid=" + playerUid + ") spawn x");
		}
		if (compound.containsValueOfType("SpawnY", 3)) {
			if (compound.getInt("SpawnY") != spawnLocation.y) {
				compound.putInt("SpawnY", spawnLocation.y);
			}
			Logger.debug("StoneBlock", "Found player (uid=" + playerUid + ") spawn y");
		}
		if (compound.containsValueOfType("SpawnZ", 3)) {
			if (compound.getInt("SpawnZ") != spawnLocation.z) {
				compound.putInt("SpawnZ", spawnLocation.z);
			}
			Logger.debug("StoneBlock", "Found player (uid=" + playerUid + ") spawn z");
		}
	}
};

let postGeneratedTeleportingStage = [];

const teleportPostGeneratedPlayers = function() {
	while (postGeneratedTeleportingStage.length > 0) {
		let playerUid = postGeneratedTeleportingStage.shift();
		registerRequiredPlayerNbt(playerUid);
		teleportIntoStoneBlockRoom(playerUid);
	}
};

// let teleportingOnEnterStage = [];

// Callback.addCallback("ItemUseNoTarget", function() {
	// while (teleportingOnEnterStage.length > 0) {
		// let playerUid = teleportingOnEnterStage.shift();
		// transferIntoStoneBlockDimension(playerUid);
	// }
// });

Callback.addCallback("PlayerChangedDimension", function(playerUid, currentId, lastId) {
	// if (currentId == StoneBlock.id) {
	if (currentId == Native.Dimension.NORMAL) {
		if (generatedStoneBlockRoom) {
			teleportIntoStoneBlockRoom(playerUid);
			return;
		}
		if (generationPostProcessLocation.length == 0) {
			let position = Entity.getPosition(playerUid);
			generationPostProcessLocation.push(position.x);
			generationPostProcessLocation.push(position.z);
		}
		postGeneratedTeleportingStage.push(playerUid);
	} else if (currentId == Native.Dimension.NORMAL) {
		// if (World.isLevelDisplayed()) {
			// transferIntoStoneBlockDimension(playerUid);
			// return;
		// }
		// teleportingOnEnterStage.push(playerUid);
	}
});

/*
Callback.addCallback("EntityAdded", function(entity) {
	if (Entity.getType(entity) == Native.EntityType.PLAYER) {
		if (Entity.getDimension(entity) == Native.Dimension.NORMAL) {
			transferIntoStoneBlockDimension(entity);
			// registerRequiredPlayerNbt(entity);
		}
	}
});

Callback.addCallback("EntityHurt", function(attacker, entity, damageValue, damageType, someBool1, someBool2) {
	if (Entity.getType(entity) == Native.EntityType.PLAYER) {
		Game.prevent();
	}
});
*/

Callback.addCallback("ServerPlayerLoaded", function(playerUid) {
	// CRASH: transferIntoStoneBlockDimension(playerUid);
	registerRequiredPlayerNbt(playerUid);
});

// Callback.addCallback("LevelDisplayed", function() {
	// let playerUid = Player.getServer ? Player.getServer() : Player.get();
	// transferIntoStoneBlockDimension(playerUid);
// });

// Callback.addCallback("ServerPlayerLeft", function(playerUid) {
	// let index = teleportingOnEnterStage.indexOf(playerUid);
	// if (index >= 0) {
		// Logger.info("StoneBlock", "Player (uid=" + playerUid + ") disconnected before dimension loaded");
		// teleportingOnEnterStage.splice(index, 1);
	// }
// });

// file: items/loot.js

Translation.addTranslation("Loot Chest", {
	ch: "戰利品箱",
	ru: "Сундук с лутом",
	uk: "Скриня з лутом"
});

IDRegistry.genItemID("loot_chest");
Item.createItem("loot_chest", "Loot Chest", {
	name: "loot_chest",
	meta: 0
}, {
	stack: 1
});
Item.setCategory(ItemID.loot_chest, Native.ItemCategory.TOOL);

// file: items/quest.js

Translation.addTranslation("Quest Book", {
	ch: "任務書",
	ru: "Книга квестов",
	uk: "Книга квестів"
});

IDRegistry.genItemID("quest_book");
Item.createItem("quest_book", "Quest Book", {
	name: "quest_book",
	meta: 0
}, {
	stack: 1
});
Item.setCategory(ItemID.quest_book, Native.ItemCategory.TOOL);

// file: callback/general.js

Callback.addCallback("ItemUseLocalServer", function(coords, item, block, isExternal, player) {
	if (item.id == ItemID.quest_book) {
		QuestBookUi.CONTAINER.openAs(QuestBookUi.Menu);
	} else if (item.id == ItemID.loot_chest) {
		Game.tipMessage(Translation.translate("Not developed yet"));
	}
});

Callback.addCallback("ItemUseNoTarget", function(item, player) {
	if (item.id == ItemID.quest_book) {
		QuestBookUi.CONTAINER.openAs(QuestBookUi.Menu);
	} else if (item.id == ItemID.loot_chest) {
		Game.tipMessage(Translation.translate("Not developed yet"));
	}
});

// file: callback/achieve.js



// file: integration/shared.js

ModAPI.registerAPI("StoneBlock", {
	getDimension: function() {
		return StoneBlock;
	}
});