var BaitAPI = {
	players: {},
	load: function() {
		Callback.addCallback("CustomDimensionTransfer",
		function(entity, from, to) {
			if (Player.isPlayer(entity)) {
				BaitAPI.players[entity] = true;
			};
		});
	},
	registerBait: function(animal, mob) {
		IDRegistry.genItemID("bait" + animal);
		Item.createItem("bait" + animal, animal + " Bait", {
			name: "bait_" + animal,
			meta: 0
		});
		IDRegistry.genBlockID("baitB" + animal);
		Block.createBlock("baitB" + animal, [{
			name: "",
			texture: [["bait_" + animal, 0], ["air", 0]],
			inCreative: false
		}]);
		Block.setDestroyTime(BlockID["baitB" + animal], 0);
		Block.registerDropFunction("baitB" + animal,
		function(coords, id, data, diggingLevel, enchant, item, blockSource) {
			TileEntity.destroyTileEntityAtCoords(coords.x, coords.y, coords.z, blockSource);
			return [[ItemID["bait" + animal], 1, 0]];
		});
		
		var render = new ICRender.CollisionShape();
		var entry = render.addEntry();
		entry.addBox(1, 1, 1, 0, 0, 0);
		BlockRenderer.setCustomCollisionShape(BlockID["baitB" + animal], 0, render);
		
		var render = new ICRender.Model();
		var model = BlockRenderer.Model();
		model.addBox(0, 0, 0, 1, 1, 1, [["air", 0]]);
		render.addEntry(model);
		BlockRenderer.setStaticICRender(BlockID["baitB" + animal], 0, render);
		
		Item.registerUseFunctionForID(ItemID["bait" + animal],
		function(coords, item, block, player) {
			var x = coords.x;
			var y = coords.y;
			var z = coords.z;
			let blockSource = BlockSource.getDefaultForActor(player);
			if (coords.side == 1) {
				blockSource.setBlock(x, y + 1, z, BlockID["baitB" + animal]);
				TileEntity.addTileEntity(x, y + 1, z, blockSource);
				new PlayerEntity(player).setCarriedItem(item.id, item.count - 1, item.data);
			};
		});
		TileEntity.registerPrototype(BlockID["baitB" + animal], {
			defaultValues: {},
			tick: function() {
				var IDA = [];
				if (this.blockSource.getBlockId(this.x, this.y - 1, this.z) == 0) {
					this.blockSource.destroyBlock(this.x, this.y, this.z, false);
					TileEntity.destroyTileEntityAtCoords(this.x, this.y, this.z, this.blockSource);
				};
				for (var xx = this.x - 5; xx <= this.x + 5; xx++) {
					for (var zz = this.z - 5; zz <= this.z + 5; zz++) {
						for (var yy = this.y - 5; yy <= this.y + 5; yy++) {
							IDA.push(this.blockSource.getBlockId(xx, yy, zz));
						};
					};
				};
				for (var Player in BaitAPI.players) {
					var player = Entity.getPosition(Player);
					if (Count(IDA)[2] >= 9 && Count(IDA)[9] >= 4 && (Math.abs(player.x - this.x) > 5 || Math.abs(player.y - this.y) > 5 || Math.abs(player.z - this.z) > 5) && Math.random() * 100 < 0.05) {
						Entity.spawn(this.x, this.y + 0.5, this.z, mob);
						this.blockSource.setBlock(this.x, this.y, this.z, 0);
						TileEntity.destroyTileEntityAtCoords(this.x, this.y, this.z, this.blockSource);
					};
				}
			},
			click: function(id, count, data, coords) {
				Game.prevent();
				return false;
			},
			init: function() {
				this.anim();
			},
			anim: function() {
				this.ani_Item = new Animation.Item(this.x + 0.5, this.y + 1 / 32, this.z + 0.5);
				this.ani_Item.describeItem({
					id: ItemID["bait" + animal],
					count: 1,
					data: 0,
					size: 0.5,
					rotation: [Math.PI / 2, 0, 0]
				});
				this.ani_Item.load();
			},
			destroy: function() {
				if (this.ani_Item) {
					this.ani_Item.destroy();
				};
			}
		});
	}
};

function Count(arr) {
	var obj = {};
	for (var i = 0,
	l = arr.length; i < l; i++) {
		var item = arr[i];
		obj[item] = (obj[item] + 1) || 1
	}
	return obj
};

BaitAPI.registerBait("Sheep", 13);
BaitAPI.registerBait("Cow", 11);
BaitAPI.registerBait("Chicken", 10);
BaitAPI.registerBait("Pig", 12);
BaitAPI.registerBait("Wolf", 14);
BaitAPI.registerBait("Ocelot", 22);

BaitAPI.load();