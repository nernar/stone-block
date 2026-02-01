(function() {
	var barrel_boxes_1 = [[c2, c0, c2, c14, c1, c14], [c1, c0, c1, c14, c16, c2], [c1, c0, c2, c2, c16, c15], [c14, c0, c1, c15, c16, c14], [c2, c0, c14, c15, c16, c15]];
	var BuildBarrelBox = function(id, ydata, data, x, y, z, dim) {
		var model = BlockRenderer.Model();
		var render = new ICRender.Model();
		for (var box in barrel_boxes_1) {
			var array = barrel_boxes_1[box];
			model.addBox(array[0], array[1], array[2], array[3], array[4], array[5], BlockID[id], 0)
		};
		model.addBox(c2, c1, c2, c14, ydata, c14, data);
		render.addEntry(model);
		BlockRenderer.mapAtCoords(x, y, z, render);
		var Collision = new ICRender.CollisionShape();
		for (var box in barrel_boxes_1) {
			var array = barrel_boxes_1[box];
			Collision.addEntry().addBox(array[0], array[1], array[2], array[3], array[4], array[5])
		};
		Collision.addEntry().addBox(c2, c1, c2, c14, ydata, c14);
		BlockRenderer.mapCollisionModelAtCoords(dim, x, y, z, Collision)
	};
	var SetupModel = function(ID) {
		var model = BlockRenderer.Model();
		for (var box in barrel_boxes_1) {
			var array = barrel_boxes_1[box];
			model.addBox(array[0], array[1], array[2], array[3], array[4], array[5], BlockID[ID], 0)
		};
		var render = new ICRender.Model();
		render.addEntry(model);
		BlockRenderer.enableCoordMapping(BlockID[ID], 0, render);
		var Collision = new ICRender.CollisionShape();
		for (var box in barrel_boxes_1) {
			var array = barrel_boxes_1[box];
			Collision.addEntry().addBox(array[0], array[1], array[2], array[3], array[4], array[5])
		};
		BlockRenderer.setCustomCollisionShape(BlockID[ID], 0, Collision)
	};
	var testUI = new UIRegistry({
		standart: {
			header: {
				text: "Crusher"
			}
		},
		elements: {
			"slotInPut": {
				type: "slot",
				x: 600,
				y: 146
			},
			"slotOutPut": {
				type: "slot",
				x: 670,
				y: 146
			},
			"slotCompost": {
				type: "slot",
				x: 670 + 70,
				y: 146
			}
		}
	});
	var SetupTileEntity = function(ID, name, texture, material) {
		this.tileEntity = {};
		this.tileEntity.client = {};
		StorageInterface.createInterface(BlockID[ID], {
			slots: {
				"slotInPut": {
					input: true
				},
				"slotOutPut": {
					output: true
				}
			},
			isValidInput: function(item, side, tileEntity) {
				return tileEntity.canWork(item)
			}
		});
		this.tileEntity.useNetworkItemContainer = true;
		this.tileEntity.defaultValues = {
			origin: 0,
			baseProcess: 0,
			volume: 0,
			refresh: false,
			ferment: false,
			mainliquid: null
		};
		this.tileEntity.show = function() {
			var stored = this.liquidStorage.getLiquidStored();
			var amount = this.liquidStorage.getAmount(stored);
			var model = containerSlot(this, "slotOutPut").id != 0 && Barrel.modelget(containerSlot(this, "slotOutPut").id);
			var Texture = containerSlot(this, "slotCompost").id != 0 && Barrel.dataGet("null", containerSlot(this, "slotCompost").id, containerSlot(this, "slotCompost").data).texture;
			if (Texture) {
				if (this.threadProcess() <= 0) {
					this.barrelbox(c16 / 1000 * this.data.volume, Texture)
				} else {
					this.barrelbox(1, [[Texture[0][0], Math.round(this.data.baseProcess / 10)]])
				}
			}
			stored ? this.barrelbox(c16 * amount, [["ex_" + stored, 0]]) : null;
			model ? this.barrelbox(c16, model.texture) : null; ! this.data.ferment && !stored && !Texture && !model ? BlockRenderer.unmapAtCoords(this.x, this.y, this.z) : null
		};
		this.tileEntity.barrelbox = function(ydata, data) {
			this.networkData.putFloat("ydata", ydata);
			this.networkData.putFloat("fresh", World.getThreadTime());
			this.networkData.putString("data", data);
			this.networkData.putInt("dim", this.dimension)
		};
		this.tileEntity.init = function() {
			this.show();
			this.data.origin = -this.data.baseProcess
		};
		this.tileEntity.canWork = function(item) {
			var stored = this.liquidStorage.getLiquidStored();
			var amount = this.liquidStorage.getAmount(stored);
			if (containerSlot(this, "slotOutPut").id == 0 && !this.data.refresh) {
				if (stored != null && amount >= 1 && Barrel.dataGet(stored, item.id, item.data) || stored == null && Barrel.dataGet(stored, item.id, item.data)) {
					return true
				} else {
					return false
				}
			} else {
				return false
			}
		};
		this.tileEntity.play = function(type, x, y, z) {
			var particles = new Particles.ParticleEmitter(x + 0.5, y + 0.6, z + 0.5);
			particles.setEmitRelatively(true);
			for (var amount = 3; amount > 0; amount--) {
				var x2 = Math.random() <= 0.5 ? 0.1 : Math.random() * 0.5;
				y2 = x2;
				z2 = -x2;
				x2 = Math.random() <= 0.5 ? -x2: x2;
				z2 = Math.random() <= 0.5 ? z2: -z2;
				particles.emit(type, 0, 0, 0.5, 0, x2, y2, z2)
			}
		};
		this.tileEntity.setOrigin = function() {
			this.data.origin = World.getThreadTime();
		};
		this.tileEntity.threadProcess = function() {
			if (World.getThreadTime() >= this.data.origin) {
				this.data.baseProcess = (World.getThreadTime() - this.data.origin) % 1000;
				return Math.abs(Number(Math.sin((World.getThreadTime() - this.data.origin) * 0.09 * Math.PI / 180).toFixed(7)))
			}
		};
		this.tileEntity.bucketInteract = function(emptyid, emptydata, count, fullid, fulldata, player) {
			if (count > 1) {
				new PlayerEntity(player).addItemToInventory(emptyid, 1, emptydata);
				new PlayerEntity(player).setCarriedItem(fullid, count - 1, fulldata)
			} else {
				new PlayerEntity(player).setCarriedItem(emptyid, 1, emptydata)
			}
		};
		this.tileEntity.setLiquid = function(liquid, id, data, count, stored, amount, empty, player) {
			switch (liquid) {
			case "milk":
				if (stored == "water" && amount >= 1) {
				//alert(2)
					this.liquidStorage.addLiquid("milk", 1);
					this.bucketInteract(empty.id, empty.data, count, id, data, player);
					return true
				};
				break
			};
			if(this.liquidStorage.liquidLimits[liquid]){
			if (!stored && containerSlot(this, "slotOutPut").id == 0 && (this.data.volume <= 0 || stored == liquid) && amount < 1) {
		//	alert(this.liquidStorage.getLimit(liquid))
				this.liquidStorage.setAmount(liquid, 1);
				this.bucketInteract(empty.id, empty.data, count, id, data, player);
				return true
			}
			}
		};
		this.tileEntity.getLiquid = function(full, amount, stored, id, data, count, player) {
			Game.prevent();
			this.liquidStorage.getLiquid(stored, 1);
			this.data.refresh = false;
			if (count >= 1) {
				new PlayerEntity(player).setCarriedItem(id, count - 1, data);
				new PlayerEntity(player).addItemToInventory(full.id, 1, full.data);
				return true
			} else {
				new PlayerEntity(player).setCarriedItem(full.id, 1, full.data);
				return true
			}
		};
		this.tileEntity.getBlock = function(id, data, count, player) {
			if (!this.data.ferment) {
				containerSlot(this, "slotInPut").setSlot(id, containerSlot(this, "slotInPut").count + 1, data);
				new PlayerEntity(player).setCarriedItem(id, count - 1, data)
			}
		};
		this.tileEntity.getScreenName = function(player, coords) {
			if (Entity.getCarriedItem(player).id == ItemID.ex_crookwriter) {
				return "testUI"
			}
		};
		this.tileEntity.getScreenByName = function(screenName) {
			return screenName == "testUI" ? testUI: null
		};
		this.tileEntity.destroyBlock = function(coords, player) {
			containerSlot(this, "slotOutPut").setSlot(0, 0, 0);
			containerSlot(this, "slotCompost").setSlot(0, 0, 0);
			containerSlot(this, "slotInPut").setSlot(0, 0, 0);
			BlockRenderer.unmapAtCoords(coords.x, coords.y, coords.z);
			BlockRenderer.unmapCollisionModelAtCoords(this.dimension, coords.x, coords.y, coords.z);
			this.show()
		};
		this.tileEntity.client.renderModel = function() {
			let ydata = this.networkData.getFloat("ydata");
			let data = this.networkData.getString("data") || "air";
			let dim = this.networkData.getInt("dim");
			let fresh = this.networkData.getFloat("fresh");
			if (typeof(ydata) == "number") {
				BuildBarrelBox(ID, ydata, [[data.split(",")[0], Number(data.split(",")[1])]], this.x, this.y, this.z, dim)
			}
		};
		this.tileEntity.client.load = function() {
			this.renderModel();
			var self = this;
			this.networkData.addOnDataChangedListener(function(data, isExternal) {
				self.renderModel()
			})
		};
		this.tileEntity.click = function(id, count, data, coords, player) {
			var stored = this.liquidStorage.getLiquidStored();
			var bucketLiquid = LiquidRegistry.getItemLiquid(id, data);
			var liquidget = Barrel.dataGet(stored, id, data);
			var amount = this.liquidStorage.getAmount(stored);
			var full = LiquidRegistry.getFullItem(id, data, stored);
			var empty = LiquidRegistry.getEmptyItem(id, data);
			var inPut = Barrel.dataGet("null", id, data); (inPut || bucketLiquid || liquidget || containerSlot(this, "slotOutPut").id != 0) && Game.prevent();
			bucketLiquid && this.setLiquid(bucketLiquid, id, data, count, stored, amount, empty, player); 
			(full && amount >= 1) && this.getLiquid(full, amount, stored, id, data, count, player);
			containerSlot(this, "slotOutPut").id <= 0 && inPut && !stored && this.getBlock(id, data, count, player);
			if (liquidget && amount >= 1) {
				containerSlot(this, "slotInPut").setSlot(id, containerSlot(this, "slotInPut").count + 1, data);
				new PlayerEntity(player).setCarriedItem(id, count - 1, data)
			};
			if (containerSlot(this, "slotOutPut").id != 0) {
				this.blockSource.spawnDroppedItem(this.x + 0.5, this.y + 1, this.z + 0.5, containerSlot(this, "slotOutPut").id, containerSlot(this, "slotOutPut").count, containerSlot(this, "slotOutPut").data, null);
				containerSlot(this, "slotOutPut").setSlot(0, 0, 0)
			}
		};
		this.tileEntity.liquidInteract = function(type, material, blockSource) {
			switch (type) {
			case "waterslime":
				this.data.refresh = true;
				if (this.threadProcess() >= 1) {
					containerSlot(this, "slotOutPut").setSlot(341, containerSlot(this, "slotOutPut").count + 2, containerSlot(this, "slotOutPut").data);
					this.liquidStorage.getLiquid("waterslime", 1);
					this.data.refresh = false
				};
				break;
			case "water":
				if (this.liquidStorage.getAmount("water") >= 1 && blockSource.getBlockId(this.x, this.y - 1, this.z) == 110) {
					this.data.refresh = true
					if (this.threadProcess() >= 1) {
						if (blockSource.getBlockId(this.x, this.y - 1, this.z) == 110) {
							this.liquidStorage.addLiquid("waterwitch", 1);
							this.liquidStorage.getLiquid("water", 1);
							this.data.refresh = false
						} else {
							containerSlot(this, "slotOutPut").setSlot(79, containerSlot(this, "slotOutPut").count + 1, containerSlot(this, "slotOutPut").data);
							this.liquidStorage.getLiquid("water", 1);
							this.data.refresh = false
						}
					}
				};
				break;
			case "lava":
				this.data.refresh = true
				if (blockSource.getBlock(this.x, this.y + 1, this.z).id == 8 || blockSource.getBlock(this.x, this.y + 1, this.z).id == 9) {
					containerSlot(this, "slotOutPut").setSlot(49, 1, containerSlot(this, "slotOutPut").data);
					this.liquidStorage.getLiquid("lava", 1);
					this.data.refresh = false
				};
				if (material && material.name == "wood") {
					if (Math.random() <= 0.05) {
						this.play(9, this.x, this.y, this.z)
					};
					if (this.threadProcess() >= 1) {
						blockSource.setBlock(this.x, this.y, this.z, 10, 0);
						BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
						this.data.refresh = false
					}
				};
				break
			}
		};
		this.tileEntity.tick = function() {
			var stored = this.liquidStorage.getLiquidStored();
			var amount = this.liquidStorage.getAmount(stored);
			var Ferment = Barrel.dataGet("null", containerSlot(this, "slotInPut").id, containerSlot(this, "slotInPut").data);
			var Volume = containerSlot(this, "slotCompost").id != 0 && Barrel.dataGet("null", containerSlot(this, "slotCompost").id, containerSlot(this, "slotCompost").data).volume * containerSlot(this, "slotCompost").count;
			var liquidget = Barrel.dataGet(stored, containerSlot(this, "slotInPut").id, containerSlot(this, "slotInPut").data);
			var material = ToolAPI.getBlockMaterial(this.blockSource.getBlock(this.x, this.y, this.z).id);
			this.liquidInteract(stored, material, this.blockSource); ! this.data.refresh && this.setOrigin();
			LiquidSet.setLimit("Barrel",this);
			LiquidSet.mixLiquid("Barrel",this);
			
			StorageInterface.checkHoppers(this);
			
			if (!this.data.ferment && Number(Math.cos(Volume * 0.09 * Math.PI / 180).toFixed(7)) > 0) {
				if (Ferment) {
					containerSlot(this, "slotCompost").setSlot(containerSlot(this, "slotInPut").id, Volume / Ferment.volume + 1, containerSlot(this, "slotInPut").data);
					containerSlot(this, "slotInPut").setSlot(0, containerSlot(this, "slotInPut").count - 1, 0)
				};
				this.data.volume = Volume
			} else {
				if (!this.data.ferment) {
					this.data.refresh = true;
					this.data.ferment = true;
					this.data.volume = 1000
				}
			};
			if (this.data.ferment) {
				if (this.threadProcess() >= 1) {
					this.data.refresh = false;
					this.data.ferment = false;
					this.data.volume = 0;
					containerSlot(this, "slotCompost").setSlot(0, 0, 0);
					containerSlot(this, "slotOutPut").setSlot(3, 1, 0)
				}
			};
			if (World.getWeather().rain != 0 && (!stored || stored == "water") && this.data.volume <= 0 && containerSlot(this, "slotOutPut").id <= 0 && !this.data.refresh) {
				this.data.canseesky = GenerationUtils.canSeeSky(this.x, this.y, this.z) ? true: false;
				this.data.canseesky && this.liquidStorage.addLiquid("water", 5 / 1000)
			};
			if (liquidget && liquidget.output) {
				containerSlot(this, "slotOutPut").setSlot(liquidget.output, 1, containerSlot(this, "slotOutPut").data);
				containerSlot(this, "slotInPut").setSlot(0, 0, 0);
				this.liquidStorage.getLiquid(stored, 1);
				this.data.refresh = false
			};
			this.container.sendChanges();
			this.show();
			this.networkData.sendChanges()
		};
		TileEntity.registerPrototype(BlockID[ID], this.tileEntity)
	};
	
	LiquidSet.limitSet("Barrel",{
				"null": {
					"water": 1,
					"lava": 1,
					"waterwitch": 1
				},
				"water": {
					"water": 1
				},
				"waterslime":{},
				"lava": {
					"lava": 1
				}
			});
	LiquidSet.mixSet("Barrel",{
				"water": {
					"milk": "waterslime"
				}
			});
	Barrel = {
		data: {},
		model: {},
		id: {},
		dataSet: function(liquid, object) {
			let newObject = {};
			for (let key in object) {
				let value = object[key];
				let id = eval(key.split(":")[0]);
				let data = key.split(":")[1];
				let string = id + ":" + data;
				newObject[string] = value
			};
			this.data[liquid] = newObject;
			newObject = null
		},
		dataGet: function(liquid, id, data) {
			return eval(this.data[liquid][id + ":" + data])
		},
		dataAdd: function(liquid, id, data, object) {
			this.data[liquid][id + ":" + data] = object
		},
		modelset: function(object) {
			var newObject = {};
			for (var key in object) {
				var value = object[key];
				var id = eval(key.split(":")[0]) + "";
				newObject[id] = value
			};
			this.model = newObject;
			newObject = null
		},
		modeladd: function(id, object) {
			this.model[id] = object
		},
		modelget: function(id) {
			return this.model[id]
		},
		add: function(ID, name, texture, material) {
			IDRegistry.genBlockID(ID);
			switch (material) {
			case "wood":
				Block.createBlock(ID, [{
					name: name,
					texture: [[texture, 0]],
					inCreative: true
				}], {
					sound: "wood",
					solid: true
				});
				ToolAPI.registerBlockMaterial(BlockID[ID], "wood");
				break;
			case "glass":
				Block.createBlock(ID, [{
					name: name,
					texture: [[texture, 0]],
					inCreative: true
				}], {
					sound: "glass",
					solid: false,
					renderlayer: 1,
					renderallfaces: true
				});
				break;
			case "stone":
				Block.createBlock(ID, [{
					name: name,
					texture: [[texture, 0]],
					inCreative: true,
					solid: true
				}]);
				ToolAPI.registerBlockMaterial(BlockID[ID], "stone");
				break;
			default:
				Block.createBlock(ID, [{
					name: name,
					texture: [[texture, 0]],
					inCreative: true
				}]);
				break
			};
			SetupModel(ID);
			Item.addCreativeGroup("Barrel", Translation.translate("Barrel"), [BlockID[ID]]);
			SetupTileEntity(ID, name, texture, material)
		}
	}
})();