IMPORT("StorageInterface");

let modelOptimization = __config__.getBool("modelOptimization");

function randomInt(min, max) {
	if (!max) {
		max = min;
		min = 0;
	};
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getDistance(x, y, z, x2, y2, z2) {
	x -= x2;
	y -= y2;
	z -= z2;
	return Math.abs(Math.sqrt((x * x) + (y * y) + (z * z)));
};

function toJson(obj, spaces) {
	return JSON.stringify(obj, function(k, v) {
		if (!(v instanceof java.lang.Object) && !(v instanceof java.lang.Class)) return v;
	}, spaces);
};

function arrayContainArrayValues(arr2, arr) {
	let valid = 0;
	for (let i in arr)
		if (arr2.indexOf(arr[i]) !== -1) valid++;
	if (valid == arr2.length) return true;
	return false;
};

function nameToNumericId(any, isVanilla) {
	let id;
	let idSpace = { block: isVanilla ? VanillaBlockID : BlockID, item: isVanilla ? VanillaItemID : ItemID };
	if (typeof any == "string") {
		let arr = any.split(":");
		id = idSpace[arr[0]][arr[1]];
	} else id = Number(any);
	if (!id) {
		let idSpace2 = { block: !isVanilla ? VanillaBlockID : BlockID, item: !isVanilla ? VanillaItemID : ItemID };
		if (typeof any == "string") {
			let arr = any.split(":");
			id = idSpace2[arr[0]][arr[1]];
		}
	};
	if (!id) alert("id: " + id + " - invalid");
	return id;
};

let LevelDisplayedQueue = {
	actions: [],
	isDisplayed: false,
	run: function(action) {
		if (this.isDisplayed) action();
		else this.actions.push(action);
	}
};

Network.addClientPacket("bonsaiPots.bone_mile_use", function(data) {
	for (let i = 0; i < 16; i++) {
		let px = data.x + 1/16 + (Math.random() * 15/16);
		let pz = data.z + 1/16 + (Math.random() * 15/16);
		let py = data.y + Math.random();
		Particles.addParticle(37, px, py, pz, 0, 0, 0);
	}
});

function spawnBoneMileParticles(dimension, coords) {
	dimension = typeof dimension == "number" ? dimension : dimension.getDimension();
	let clients = Network.getConnectedClients();
	for (let i in clients) {
		let client = clients[i];
		let player = client.getPlayerUid();
		if (dimension == Entity.getDimension(player)) {
			let pos = Entity.getPosition(player);
			if(getDistance(pos.x, pos.y, pos.z, coords.x, coords.y, coords.z) < 64){
				client.send("bonsaiPots.bone_mile_use", coords);
			}
		}
	}
};

Callback.addCallback("LevelDisplayed", function() {
	let actions = LevelDisplayedQueue.actions;
	LevelDisplayedQueue.isDisplayed = true;
	while (actions.length > 0) {
		actions.shift()();
	}
});

Callback.addCallback("LevelLeft", function() {
	LevelDisplayedQueue.isDisplayed = false;
});

let crossSaplingMesh = new RenderMesh();
crossSaplingMesh.importFromFile(__dir__ + "res/CrossSaplingModel.obj", "obj", {});
crossSaplingMesh.rotate(0, Math.PI / 4, 0);
crossSaplingMesh.scale(6, 6, 6);

let bonsaiPotModel = new ICRender.Model();
let hoppingBonsaiPotModel = new ICRender.Model();
let bonsaiPotMesh = new RenderMesh();
bonsaiPotMesh.importFromFile(__dir__ + "res/BonsaiPotModel.obj", "obj", {
	translate: [0.5, 0, 0.5]
});
let hoppingBonsaiPotMesh = bonsaiPotMesh.clone();
bonsaiPotMesh.setBlockTexture("bonsaipot", 0);
hoppingBonsaiPotMesh.setBlockTexture("hopping_bonsaipot", 0);
bonsaiPotMesh.setLightPos(0, 1, 0);
hoppingBonsaiPotMesh.setLightPos(0, 1, 0);
bonsaiPotMesh.rebuild();
hoppingBonsaiPotMesh.rebuild();
bonsaiPotModel.addEntry(new BlockRenderer.Model(bonsaiPotMesh));
hoppingBonsaiPotModel.addEntry(new BlockRenderer.Model(hoppingBonsaiPotMesh));

let bonsaiPotCollision = new ICRender.CollisionShape();
let bonsaiPotEntry = bonsaiPotCollision.addEntry();
bonsaiPotEntry.addBox(2 / 16, 0 / 16, 2 / 16, 14 / 16, 1 / 16, 14 / 16);
bonsaiPotEntry.addBox(1 / 16, 1 / 16, 2 / 16, 2 / 16, 3 / 16, 15 / 16);
bonsaiPotEntry.addBox(1 / 16, 1 / 16, 1 / 16, 14 / 16, 3 / 16, 2 / 16);
bonsaiPotEntry.addBox(2 / 16, 1 / 16, 14 / 16, 15 / 16, 3 / 16, 15 / 16);
bonsaiPotEntry.addBox(14 / 16, 1 / 16, 1 / 16, 15 / 16, 3 / 16, 14 / 16);

IDRegistry.genBlockID("bonsaiPot");
Block.createBlock("bonsaiPot", [
	{
		name: "Bonsai Pot",
		texture: [["bonsaipot", 0]],
		inCreative: true
	}
], {
	lightopacity: 2,
	renderallfaces: true,
	solid: false
});

Translation.addTranslation("Bonsai Pot", {
	ru: "Горшок для Бонсаев",
	zh: "盆栽盆",
	ja: "盆栽鉢",
	pt: "vaso de bonsai"
});

Block.setShape(BlockID.bonsaiPot, 1 / 16, 0, 1 / 16, 15 / 16, 3 / 16, 15 / 16);
BlockRenderer.setStaticICRender(BlockID.bonsaiPot, 0, bonsaiPotModel);
BlockRenderer.setCustomCollisionShape(BlockID.bonsaiPot, 0, bonsaiPotCollision);
ItemModel.getFor(BlockID.bonsaiPot, 0).setModUiSpriteName("bonsai_pot", 0);

IDRegistry.genBlockID("hoppingBonsaiPot");
Block.createBlock("hoppingBonsaiPot", [
	{
		name: "Hopping Bonsai Pot",
		texture: [["hopping_bonsaipot", 0]],
		inCreative: true
	}
], {
	lightopacity: 2,
	renderallfaces: true,
	solid: false
});

Translation.addTranslation("Hopping Bonsai Pot", {
	ru: "Горшок для Бонсаев с воронкой",
	zh: "漏式盆栽盆",
	ja: "じょうご付き盆栽鉢",
	pt: "Pote de bonsai com funil"
});

Block.setShape(BlockID.hoppingBonsaiPot, 1 / 16, 0, 1 / 16, 15 / 16, 3 / 16, 15 / 16);
BlockRenderer.setStaticICRender(BlockID.hoppingBonsaiPot, 0, hoppingBonsaiPotModel);
BlockRenderer.setCustomCollisionShape(BlockID.hoppingBonsaiPot, 0, bonsaiPotCollision);
ItemModel.getFor(BlockID.hoppingBonsaiPot, 0).setModUiSpriteName("hopping_bonsai_pot", 0);

let treeMeshs = {};

function TreeMesh(sapling) {
	this.sapling = sapling;
	this.mesh = ItemModel.getEmptyMeshFromPool();
	this.addBlock = function(x, y, z, block) {
		let that = this;
		LevelDisplayedQueue.run(function() {
			ItemModel.getForWithFallback(Network.serverToLocalId(block.id), block.data).addToMesh(that.mesh, x, y, z);
		});
		return this;
	};
	this.addMesh = function(x, y, z, mesh) {
		this.mesh.addMesh(mesh, x, y, z);
		mesh.clear();
		ItemModel.releaseMesh(mesh);
		return this;
	};
	this.initFromScheme = function(scheme) {
		let treeScheme = scheme || schemes[this.sapling.toString()];
		for (let i in treeScheme) {
			let block = treeScheme[i];
			let arr = i.split(":");
			this.addBlock(arr[0], arr[1], arr[2], block);
		}
		return this;
	};
	this.rotate = function(x, y, z, x1, y1, z1) {
		this.mesh.rotate(x, y, z, x1, y1, z1);
		return this;
	};
	this.scale = function(x, y, z) {
		this.mesh.scale(x, y, z);
		return this;
	};
	this.end = function() {
		treeMeshs[this.sapling.toString()] = this.mesh;
	};
	return this;
};

function getTreeMesh(item) {
	return treeMeshs[item.toString()];
};

function IdData(id, data) {
	if (typeof id == "number") {
		this.id = id;
		this.data = data || 0;
	} else if (typeof id == "string") {
		let arr = id.split(":");
		this.id = Number(arr[0]);
		this.data = Number(arr[1]);
	} else {
		this.id = id.id;
		this.data = id.data || 0;
	};
	this.toString = function() {
		return this.id + ":" + this.data;
	}
};

function ItemInstance(id, count, data, extra) {
	if (typeof id == "number") {
		this.id = id;
		this.count = count || 1;
		this.data = data || 0;
		this.extra = extra;
	} else if (typeof id == "string") {
		let arr = id.split(":");
		this.id = arr[0];
		this.count = 1;
		this.data = arr[1];
		this.extra = null;
	} else {
		this.id = id.id;
		this.count = id.count || 1;
		this.data = id.data || 0;
		this.extra = id.extra;
	}
	this.setId = function(id) {
		this.id = id;
		return this;
	};
	this.setCount = function(count) {
		this.count = count
		return this;
	};
	this.setData = function(data) {
		this.data = data;
		return this;
	};
	this.setExtra = function(extra) {
		this.extra = extra;
		return this;
	};
}

let treeLootTables = {};

function TreeLootTable(item) {
	this.item = item;
	this.lootTable = {};
	this.addItem = function(item, chance, rolls, silkTouch) {
		this.lootTable[item.toString()] = { chance: chance || 1, rolls: rolls || 1, requiresSilkTouch: silkTouch || false };
		return this;
	};
	this.end = function() {
		treeLootTables[this.item.toString()] = this;
	};
	this.getRandomItems = function(hasSilkTouch) {
		let items = [];
		for (let i in this.lootTable) {
			let loot = this.lootTable[i];
			if (loot.requiresSilkTouch && !hasSilkTouch) continue;
			for (let j = 0; j < loot.rolls; j++) {
				if (loot.chance > Math.random()) items.push(new ItemInstance(i).setCount(1));
			}
		}
		return items;
	};
	return this;
}

function getTreeLootTable(item) {
	return treeLootTables[item.toString()];
};

let soils = {};

function registerSoil(item, block, multiplier, tags, backItem) {
	soils[item.toString()] = { block: block, multiplier: multiplier || 1, tags: tags || ["dirt"], backItem: backItem || new IdData(0) };
};

function getSoilData(item) {
	return soils[item.toString()];
};

function isSoil(item) {
	return !!soils[item.toString()];
};

let saplings = {};

function registerSapling(item, growTime, tags) {
	saplings[item.toString()] = { growTime: growTime || 300, tags: tags || ["dirt", "grass"] };
};

function getSaplingData(item) {
	return saplings[item.toString()];
};

function isSapling(item) {
	return !!saplings[item.toString()];
};

function isValidSoilForSapling(soil, sapling) {
	return arrayContainArrayValues(getSoilData(soil).tags, getSaplingData(sapling).tags);
};

let schemes = {};

function TreeScheme(sapling) {
	this.sapling = sapling;
	this.scheme = {};
	this.createFromShape = function(shape, ref) {
		for (let i in shape) {
			for (let j in shape[i]) {
				for (let k = 0; k < shape[i][j].length; k++) {
					let x = ((shape.length - 1) / 2).toFixed(2) - Number(i);
					let y = (shape[i].length - 1) - Number(j);
					let z = ((shape[i][j].length - 1) / 2).toFixed(2) - Number(k);
					let value = shape[i][j][k];
					if (value !== " ") {
						let block = new IdData(nameToNumericId(ref[value].id, ref[value].isVanilla), ref[value].data);
						this.setBlock(x, y, z, block);
					}
				};
			};
		};
		return this;
	};
	this.setScheme = function(scheme) {
		this.scheme = scheme;
		return this;
	};
	this.setBlock = function(x, y, z, item) {
		this.scheme[x + ':' + y + ':' + z] = item;
		return this;
	};
	this.move = function(vec) {
		if (vec.x == 0 && vec.y == 0 && vec.z == 0) return this;
		let newScheme = {};
		for (let i in this.scheme) {
			let arr = i.split(":");
			newScheme[(Number(arr[0]) + vec.x) + ':' + (Number(arr[1]) + vec.y) + ':' + (Number(arr[2]) + vec.z)] = this.scheme[i];
		};
		this.scheme = newScheme;
		return this;
	};
	this.end = function() {
		schemes[this.sapling.toString()] = this.scheme;
	};
	return this;
};

function getTreeScheme(item) {
	return schemes[item.toString()];
};

function DataReader(dir) {
	this.dir = dir;
	this.readJson = function(path) {
		return FileTools.ReadJSON(this.dir + path);
	};
	this.foreachDir = function(path, func) {
		let dir = new java.io.File(this.dir + path);
		let list = dir.list();
		for (let i in list) {
			func(list[i]);
		}
	};
	this.createTreeData = function(path) {
		let obj = this.readJson(path);
		registerSapling(new IdData(nameToNumericId(obj.sapling.id, obj.sapling.isVanilla), obj.sapling.data), obj.growTime, obj.compatibleSoilTags);
		let lootTable = new TreeLootTable(new IdData(nameToNumericId(obj.sapling.id, obj.sapling.isVanilla), obj.sapling.data))
		for (let i in obj.drops) {
			let drop = obj.drops[i];
			lootTable.addItem(new IdData(nameToNumericId(drop.id, drop.isVanilla), drop.data), drop.chance, drop.rolls, drop.requiresSilkTouch);
		};
		lootTable.end();
		return this;
	};
	this.createTreeDataFromDir = function(path) {
		let that = this;
		this.foreachDir(path, function(filePath) {
			that.createTreeData(path + "/" + filePath);
		});
		return this;
	};
	this.createSoilData = function(path) {
		let obj = this.readJson(path);
		registerSoil(new IdData(nameToNumericId(obj.soil.id, obj.soil.isVanilla), obj.soil.data), new IdData(Block.convertBlockToItemId(nameToNumericId(obj.block.id, obj.block.isVanilla)), obj.block.data), obj.tickModifier, obj.compatibleSoilTags, obj.backItem ? new IdData(nameToNumericId(obj.backItem.id, obj.backItem.isVanilla), obj.backItem.data) : null);
		return this;
	};
	this.createSoilDataFromDir = function(path) {
		let that = this;
		this.foreachDir(path, function(filePath) {
			that.createSoilData(path + "/" + filePath);
		});
		return this;
	};
	this.createTreeScheme = function(path){
		let obj = this.readJson(path);
		let sapling = new IdData(nameToNumericId(obj.sapling.id, obj.sapling.isVanilla), obj.sapling.data);
		new TreeScheme(sapling)
			.createFromShape(obj.shape, obj.ref)
			.move(obj.relative || { x: 0, y: 0, z: 0 })
		.end();
		return this;
	};
	this.createTreeMesh = function(path) {
		let obj = this.readJson(path);
		let sapling = new IdData(nameToNumericId(obj.sapling.id, obj.sapling.isVanilla), obj.sapling.data);
		this.createTreeScheme(path);
		new TreeMesh(sapling).initFromScheme().end();
		return this;
	};
	this.createTreeMeshFromDir = function(path) {
		let that = this;
		this.foreachDir(path, function(filePath) {
			that.createTreeMesh(path + "/" + filePath);
		});
		return this;
	};
	return this;
};

let bonsaiPotPrototype = {
	useNetworkItemContainer: true,
	defaultValues: {
		isHopping: false,
		growTime: 0,
		currentGrowTime: 0,
		multiplier: 1,
		plantGrowed: false,
		isPlanted: false,
		soiled: false,
		allowSoilDrop: true
	},
	client: {
		tick() {
			if (this.treeAnim) {
				if (this.growTime > this.currentGrowTime) {
					this.currentGrowTime += this.multiplier;
				};
				let size = this.currentGrowTime / this.growTime * 0.125;
				this.treeAnim.transform().lock().clear().scale(size, size, size).unlock();
			}
		},
		events: {
			loadSoilAnim(packet) {
				let that = this;
				this.multiplier = packet.multiplier;
				LevelDisplayedQueue.run(function() {
					that.soilAnim = new Animation.Item(that.x + 0.5, that.y + 1.5 / 16, that.z + 0.5);
					that.soilAnim.describeItem({
						id: Network.serverToLocalId(packet.id),
						data: packet.data,
						count: 1,
						notRandomize: true
					});
					that.soilAnim.refresh();
					that.soilAnim.load();
					that.soilAnim.transform().lock().clear().scale(12 / 16, 1 / 16, 12 / 16).unlock();
				});
			},
			destroySoilAnim() {
				if (this.soilAnim) this.soilAnim.destroy();
			},
			loadTreeAnim(packet) {
				let that = this;
				this.growTime = packet.growTime;
				LevelDisplayedQueue.run(function() {
					that.treeAnim = new Animation.Base(that.x + 0.5, that.y + 3 / 16, that.z + 0.5);
					that.treeAnim.describe({
						mesh: modelOptimization ? crossSaplingMesh : getTreeMesh(new IdData(Network.serverToLocalId(packet.id), packet.data)),
						skin: modelOptimization ? ItemModel.getForWithFallback(Network.serverToLocalId(packet.id), packet.data).getWorldTextureName() : "atlas::terrain",
						scale: 0.000001
					});
					that.treeAnim.refresh();
					that.treeAnim.load();
				});
			},
			destroyTreeAnim() {
				if (this.treeAnim) {
					this.growTime = 0;
					this.currentGrowTime = 0;
					this.treeAnim.destroy();
					this.treeAnim = null;
				}
			},
			setCurrentGrowTime(packet) {
				this.currentGrowTime = packet.time;
			}
		}
	},
	created() {
		this.data.isHopping = this.blockID == BlockID.hoppingBonsaiPot;
	},
	load() {
		if (this.data.soiled) {
			let slot = this.container.getSlot("soil");
			if (!this.data.multiplier) this.data.multiplier = getSoilData(new IdData(soil)).multiplier;
			this.sendPacket("loadSoilAnim", { id: slot.id, data: slot.data, multiplier: this.data.multiplier });
		}
		if (this.data.isPlanted) {
			let slot = this.container.getSlot("sapling");
			this.sendPacket("setCurrentGrowTime", { time: this.data.currentGrowTime || 0 });
			this.sendPacket("loadTreeAnim", { id: slot.id, data: slot.data, growTime: this.data.growTime });
		};
	},
	destroy() {
		this.sendPacket("destroySoilAnim");
		this.sendPacket("destroyTreeAnim");
	},
	click(id, count, data, coords, player, extra) {
		Game.prevent();
		if (this.data.soiled) {
			let toolData = ToolAPI.getToolData(id);
			if (toolData && toolData.blockMaterials.wood) {
				Entity.setCarriedItem(player, id, count, data + 1, extra);
				if (this.data.isPlanted) {
					this.data.currentGrowTime = 0;
					if (this.data.plantGrowed) {
						this.sendPacket("setCurrentGrowTime", { time: 0 });
						this.data.plantGrowed = false;
						let sapling = this.container.getSlot("sapling");
						let lootTable = getTreeLootTable(new IdData(sapling));
						let drops = lootTable.getRandomItems(ToolAPI.getEnchantExtraData(extra).silk);
						for (let i in drops) {
							let drop = drops[i];
							this.blockSource.spawnDroppedItem(this.x + 0.5, this.y + 0.25, this.z + 0.5, drop.id, drop.count, drop.data);
						}
					} else {
						this.sendPacket("destroyTreeAnim");
						this.data.growTime = 0;
						this.data.isPlanted = false;
						this.container.dropSlot(this.blockSource, "sapling", this.x + 0.5, this.y + 0.5, this.z + 0.5);
					}
				} else {
					this.data.soiled = false;
					this.data.multiplier = 1;
					this.sendPacket("destroySoilAnim");
					let soil = this.container.getSlot("soil");
					let soilData = getSoilData(new IdData(soil));
					if (this.data.allowSoilDrop) this.container.dropSlot(this.blockSource, "soil", this.x + 0.5, this.y + 0.5, this.z + 0.5);
					else soil.clear();
				}
			}
			if (!this.data.isPlanted && isSapling(new IdData(id, data))) {
				let soil = this.container.getSlot("soil");
				if (isValidSoilForSapling(new IdData(soil), new IdData(id, data))) {
					Entity.setCarriedItem(player, id, count - 1, data, extra);
					let saplingData = getSaplingData(new IdData(id, data));
					this.container.setSlot("sapling", id, 1, data);
					this.data.isPlanted = true;
					this.sendPacket("setCurrentGrowTime", { time: 0 });
					this.sendPacket("loadTreeAnim", { id: id, data: data, growTime: saplingData.growTime });
					this.data.growTime = saplingData.growTime;
				}
			} else if (this.data.isPlanted && !this.data.plantGrowed && id == 858) {
				this.data.currentGrowTime = Math.min(this.data.currentGrowTime + Math.floor(Math.random() * 75), this.data.growTime);
				this.sendPacket("setCurrentGrowTime", {time: this.data.currentGrowTime});
				Entity.setCarriedItem(player, id, count - 1, data, extra);
				spawnBoneMileParticles(this.dimension, {x: this.x, y: this.y, z: this.z});
			}
		}
		else if (isSoil(new IdData(id, data))) {
			let soilData = getSoilData(new IdData(id, data));
			Entity.setCarriedItem(player, id, count - 1, data, extra);
			new PlayerActor(player).addItemToInventory(soilData.backItem.id, 1, soilData.backItem.data, null, true);
			this.container.setSlot("soil", soilData.block.id, 1, soilData.block.data);
			this.sendPacket("loadSoilAnim", { id: soilData.block.id, data: soilData.block.data, multiplier: soilData.multiplier });
			this.data.soiled = true;
			this.data.multiplier = soilData.multiplier;
			this.data.allowSoilDrop = !soilData.backItem.id;
		}
	},
	tick() {
		if (this.remove) return;
		if (this.data.isPlanted) {
			if (this.data.currentGrowTime >= this.data.growTime) {
				this.data.plantGrowed = true;
				if (this.data.isHopping) {
					let sapling = this.container.getSlot("sapling");
					let lootTable = getTreeLootTable(new IdData(sapling));
					let drops = lootTable.getRandomItems(false);
					let storage = StorageInterface.getStorage(this.blockSource, this.x, this.y - 1, this.z);
					if (storage) {
						for (let i in drops) {
							storage.addItem(drops[i]);
						};
						if (this.networkEntity) this.sendPacket("setCurrentGrowTime", { time: 0 });
						this.data.currentGrowTime = 0;
						this.data.plantGrowed = false;
					};
				};
			} else this.data.currentGrowTime += this.data.multiplier;
		};
	}
};

TileEntity.registerPrototype(BlockID.bonsaiPot, bonsaiPotPrototype);
TileEntity.registerPrototype(BlockID.hoppingBonsaiPot, bonsaiPotPrototype);

Recipes.addShaped({ id: BlockID.bonsaiPot, count: 1, data: 0 }, [
	"",
	"b b",
	"bbb"
], ['b', VanillaItemID.brick, 0]);

Recipes.addShaped({ id: BlockID.hoppingBonsaiPot, count: 1, data: 0 }, [
	"a",
	"b",
], ['a', BlockID.bonsaiPot, 0, 'b', VanillaBlockID.hopper, 0]);

ModAPI.registerAPI("bonsaiTrees", {
	DataReader: DataReader,
	IdData: IdData,
	TreeMesh: TreeMesh,
	TreeScheme: TreeScheme,
	TreeLootTable: TreeLootTable,
	getTreeMesh: getTreeMesh,
	getTreeLootTable: getTreeLootTable,
	registerSoil: registerSoil,
	registerSapling: registerSapling,
	isSapling: isSapling,
	isSoil: isSoil,
	getSaplingData: getSaplingData,
	getSoilData: getSoilData,
	getTreeScheme: getTreeScheme,
	requireGlobal: function(command) {
		return eval(command);
	}
});

let dataReader = new DataReader(__dir__ + "data")
	.createSoilDataFromDir("/soil/minecraft")
	.createTreeDataFromDir("/tree/minecraft")
	.createTreeMeshFromDir("/model/minecraft");

ModAPI.addAPICallback("ICore", function(api) {
	dataReader.createTreeDataFromDir("/tree/industrial_craft")
		.createTreeMeshFromDir("/model/industrial_craft");
});

let getPointed = ModAPI.requireGlobal("Player.getPointed");
/*let serverLastCoords = {};
let tryPoints = {};
let pointedBonsaiPots = {};
*/
ModAPI.addAPICallback("WailaAPI", function(api) {
	/*Callback.addCallback("LocalTick", function() {
		let point = getPointed();
		let coords = point.pos;
		let player = Player.get();
		let coordsStr = coords.x + ':' + coords.y + ':' + coords.z;
		if (pointedBonsaiPots[coordsStr]) api.Waila.showPopup(point.block);
			if (!serverLastCoords[player]) serverLastCoords[player] = coordsStr;
		if (severLastCoords[player] != coordsStr) {
			let posArr = serverLastCoords[player].split(':');
			Callback.invokeCallback("DePointed", { x: posArr[0], y: posArr[1], z: posArr[2] }, World.getBlock(posArr[0], posArr[1], posArr[2]), player);
			tryPoints[player] = true
			serverLastCoords[player] = coordsStr;
		} else if (tryPoints[player]) {
			Callback.invokeCallback("OnPointed", point.pos, point.block, player);
			tryPoints[player] = false;
		}
	});
	Callback.addCallback("OnPointed", function(coords, block, player) {
		if (block.id == BlockID.bonsaiPot || block.id == BlockID.hoppingBonsaiPot) pointedBonsaiPots[coords.x + ":" + coords.y + ":" + coords.z] = true;
	});
	Callback.addCallback("DePointed", function(coords, block, player) {
		if (block.id == BlockID.bonsaiPot || block.id == BlockID.hoppingBonsaiPot) pointedBonsaiPots[coords.x + ":" + coords.y + ":" + coords.z] = false;
	});*/
	Translation.addTranslation("Soil", { ru: "Почва", zh: "土壤", ja: "土", pt: "Solo" });
	Translation.addTranslation("Sapling", { ru: "Саженец", zh: "树苗", ja: "苗木", pt: "Muda" });
	Callback.addCallback("LocalTick", function() {
		if (World.getThreadTime() % 20 != 0) return;
		let coords = getPointed().pos;
		let block = World.getBlock(coords.x, coords.y, coords.z);
		if (block.id == BlockID.bonsaiPot || block.id == BlockID.hoppingBonsaiPot) {
			api.Waila.showPopup(block);
		}
	});
	if (api.WailaConfig.extCropGrowth) {
		api.Waila.addGlobalExtension(function(id, data, elements, tile, yPos) {
			if ((id == BlockID.bonsaiPot || id == BlockID.hoppingBonsaiPot) && !!tile) {
				let data = tile.data;
				if (data.soiled) {
					let soilSlot = tile.container.getSlot("soil");
					elements["soil"] = {
						type: "text",
						text: Translation.translate("Soil") + ":   " + Item.getName(soilSlot.id, soilSlot.data),
						x: 200,
						y: yPos,
						font: api.StyleManager.getDefaultFont()
					};
					yPos += 60;
					api.Waila.requireHeight(20);
				};
				if (data.isPlanted) {
					let saplingSlot = tile.container.getSlot("sapling");
					elements["sapling"] = {
						type: "text",
						text: Translation.translate("Sapling") + ":   " + Item.getName(saplingSlot.id, saplingSlot.data),
						x: 200,
						y: yPos,
						font: api.StyleManager.getDefaultFont()
					};
					yPos += 60;
					api.Waila.requireHeight(20);
				};
				if (data.isPlanted) {
					api.Waila.addBar({
						elements: elements,
						progress: Math.floor(data.currentGrowTime),
						progressMax: data.growTime,
						prefix: "growth",
						yPos: yPos
					});
					yPos += 80;
					api.Waila.requireHeight(28);
				}
			}
			return yPos;
		});
	}
})

/*
let lastCoords;

function abs(min, max) {
	return Math.abs(min) + Math.abs(max);
};

function replaceAt(str, index, character) {
	let chars = str.split("");
	chars[index] = character;
	let output = "";
	for (let i in chars)
		output += chars[i];
	return output;
};

let index = 0;

Callback.addCallback("ItemUse", function(c, i, b, is, p) {
	if(!Entity.getSneaking(p)) return;
	if (lastCoords) {
		let arr = [];
		let blocks = [];
		for (let xx = lastCoords.x; xx < c.x; xx++) {
			for (let yy = lastCoords.y; yy < c.y; yy++) {
				for (let zz = lastCoords.z; zz < c.z; zz++) {
					let block3 = World.getBlock(xx, yy, zz);
					if(block3.id) blocks.push({ x: xx - lastCoords.x, y: yy - lastCoords.y, z: zz - lastCoords.z, id: block3.id, data: block3.data });
				}
			}
		}
		let size = [{min: 0, max: 0}, {min: 0, max: 0}, {min: 0, max: 0}];
		for(let i in blocks){
			let block = blocks[i];
			if(size[0].max < block.x) size[0].max = block.x;
			else if(size[0].min > block.x) size[0].min = block.x;
			if(size[1].max < block.y) size[1].max = block.y;
			else if(size[1].min > block.y) size[1].min = block.y;
			if(size[2].max < block.z) size[2].max = block.z;
			else if(size[2].min > block.z) size[2].min = block.z;
		};
		alert(JSON.stringify(size));
		let x_max = abs(size[0].min, size[0].max);
		let y_max = abs(size[1].min, size[1].max);
		let z_max = abs(size[2].min, size[2].max);
		for (let z = 0; z <= z_max; z++) {
			let blocks_z = [];
			for (let y = 0; y <= y_max; y++) {
				let blocks_x = "";
				for (let x = 0; x <= x_max; x++)
					blocks_x += " ";
				blocks_z.push(blocks_x);
			}
			arr.push(blocks_z);
		}
		let blocks_obj = {};
		let symbols = ["a", "b", "c", "d", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "f", "g", "h", "j", "k", "l", "z", "x", "v", "n", "m"];
		for (let i in blocks) {
			let block = blocks[i];
			let bl_n = block.id + ':' + block.data;
			if (block.id != 0) {
				let s = blocks_obj[bl_n];
				if (!s)
					blocks_obj[bl_n] = symbols[Object.keys(blocks_obj).length];
				s = blocks_obj[bl_n];
				let y = arr[block.z + Math.abs(size[2].min)].length - 1 - (block.y + Math.abs(size[1].min));
				arr[block.z + Math.abs(size[2].min)][y] = replaceAt(arr[block.z + Math.abs(size[2].min)][y], (block.x + Math.abs(size[0].min)), s);
			}
		}
		lastCoords = undefined;
		let jsonObj = {
			ref: (function() {
				let obj = {};
				let keys = Object.keys(blocks_obj);
				for (let i in keys) {
					let keyArr = keys[i].split(':');
					obj[blocks_obj[keys[i]]] = { id: keyArr[0], data: keyArr[1] };
				}
				return obj;
			})(),
			shape: arr
		};
		FileTools.WriteJSON(__dir__ + "data/model/test/test_model_" + index + ".json", jsonObj, true);
		index++;
	} else lastCoords = c;
});*/

if(!Game.isDedicatedServer || !Game.isDedicatedServer()){
	let blockModels = FileTools.ReadJSON(__packdir__ + "assets/innercore/icons/block_models.json");
	for (let i = 0; i < 16; i++) {
		blockModels["99:" + i] = {
			tex: [["mushroom_brown_bottom", i], ["mushroom_brown_top", i], ["mushroom_brown_west", i], ["mushroom_brown_east", i], ["mushroom_brown_south", i], ["mushroom_brown_north", i]]
		};
		blockModels["100:" + i] = {
			tex: [["mushroom_red_bottom", i], ["mushroom_red_top", i], ["mushroom_red_west", i], ["mushroom_red_east", i], ["mushroom_red_south", i], ["mushroom_red_north", i]]
		};
	};

	FileTools.WriteJSON(__packdir__ + "assets/innercore/icons/block_models.json", blockModels);
}
