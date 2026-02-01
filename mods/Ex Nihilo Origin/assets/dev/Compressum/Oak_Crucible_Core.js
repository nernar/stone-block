var CrucibleAPI = {
	registerCrucible: function(StringId, name, tex, api) {
		IDRegistry.genBlockID(StringId);
		var CrucibleType = Block.createSpecialType({
			sound: "wood"
		});
		Block.createBlock(StringId, [{
			name: name,
			texture: [[tex, 0]],
			inCreative: true
		}], CrucibleType);
		ToolAPI.registerBlockMaterial(BlockID[StringId], "wood");
		var render = new ICRender.Model();
		var model = BlockRenderer.Model();
		model.addBox(c0, c3, c0, c1, c16, c16, BlockID[StringId], 0);
		model.addBox(c15, c3, c0, c16, c16, c16, BlockID[StringId], 0);
		model.addBox(c1, c3, c0, c15, c16, c1, BlockID[StringId], 0);
		model.addBox(c1, c3, c15, c15, c16, c16, BlockID[StringId], 0);
		model.addBox(c0, c0, c0, c1, c3, c1, BlockID[StringId], 0);
		model.addBox(c15, c0, c0, c16, c3, c1, BlockID[StringId], 0);
		model.addBox(c15, c0, c15, c16, c3, c16, BlockID[StringId], 0);
		model.addBox(c0, c0, c15, c1, c3, c16, BlockID[StringId], 0);
		model.addBox(c1, c3, c1, c15, c4, c15, [[tex, 0]]);
		render.addEntry(model);
		BlockRenderer.enableCoordMapping(BlockID[StringId], 0, render);
		var Collision = new ICRender.CollisionShape();
		Collision.addEntry().addBox(c0, c3, c0, c1, c16, c16);
		Collision.addEntry().addBox(c15, c3, c0, c16, c16, c16);
		Collision.addEntry().addBox(c1, c3, c0, c15, c16, c1);
		Collision.addEntry().addBox(c1, c3, c15, c15, c16, c16);
		Collision.addEntry().addBox(c0, c0, c0, c1, c3, c1);
		Collision.addEntry().addBox(c15, c0, c0, c16, c3, c1);
		Collision.addEntry().addBox(c15, c0, c15, c16, c3, c16);
		Collision.addEntry().addBox(c0, c0, c15, c1, c3, c16);
		Collision.addEntry().addBox(c1, c3, c1, c15, c4, c15);
		BlockRenderer.setCustomCollisionShape(BlockID[StringId], 0, Collision);
		var params = {
			useNetworkItemContainer: true,
			defaultValues: {
				worktime: 0,
				Work: false,
				data: 0,
				CrucibleOnce: false
			},
			getTransportSlots: function() {
				return {
					input: ["slotInput"]
				}
			},
			init: function() {
				this.liquidStorage.setLimit("water", 1)
			},
			oakcruciblebox: function(ydata1, ydata2, ydata3, ydata4, data) {
				var render = new ICRender.Model();
				var model = BlockRenderer.Model();
				model.addBox(c0, c3, c0, c1, c16, c16, BlockID[StringId], 0);
				model.addBox(c15, c3, c0, c16, c16, c16, BlockID[StringId], 0);
				model.addBox(c1, c3, c0, c15, c16, c1, BlockID[StringId], 0);
				model.addBox(c1, c3, c15, c15, c16, c16, BlockID[StringId], 0);
				model.addBox(c0, c0, c0, c1, c3, c1, BlockID[StringId], 0);
				model.addBox(c15, c0, c0, c16, c3, c1, BlockID[StringId], 0);
				model.addBox(c15, c0, c15, c16, c3, c16, BlockID[StringId], 0);
				model.addBox(c0, c0, c15, c1, c3, c16, BlockID[StringId], 0);
				model.addBox(c1, c3, c1, c15, c4, c15, [[tex, 0]]);
				model.addBox(c1, ydata1, c1, c15, ydata2, c15, [["leaf", 0]]);
				model.addBox(c1, ydata3, c1, c15, ydata4, c15, data);
				render.addEntry(model);
				BlockRenderer.mapAtCoords(this.x, this.y, this.z, render);
				var Collision = new ICRender.CollisionShape();
				Collision.addEntry().addBox(c0, c3, c0, c1, c16, c16);
				Collision.addEntry().addBox(c15, c3, c0, c16, c16, c16);
				Collision.addEntry().addBox(c1, c3, c0, c15, c16, c1);
				Collision.addEntry().addBox(c1, c3, c15, c15, c16, c16);
				Collision.addEntry().addBox(c0, c0, c0, c1, c3, c1);
				Collision.addEntry().addBox(c15, c0, c0, c16, c3, c1);
				Collision.addEntry().addBox(c15, c0, c15, c16, c3, c16);
				Collision.addEntry().addBox(c0, c0, c15, c1, c3, c16);
				Collision.addEntry().addBox(c1, c3, c1, c15, c4, c15);
				Collision.addEntry().addBox(c1, ydata1, c1, c15, ydata2, c15);
				Collision.addEntry().addBox(c1, ydata3, c1, c15, ydata4, c15);
				BlockRenderer.setCustomCollisionShape(BlockID[StringId], 0, Collision);
			},
			Model: function(ydata1, ydata2, ydata3, ydata4, data) {
				//this.data.CrucibleOnce = true;
				this.networkData.putString("data", data);
				this.networkData.putInt("click", ydata1);
				this.networkData.putInt("click", ydata2);
				this.networkData.putInt("click", ydata3);
				this.networkData.putInt("click", ydata4);
				//this.oakcruciblebox(ydata1, ydata2, ydata3, ydata4, data);
			},
			client: {
				renderModel: function() {
					let data = this.networkData.getString("data");
					let ydata1 = this.networkData.getInt("ydata1");
					let ydata2 = this.networkData.getInt("ydata2");
					let ydata3 = this.networkData.getInt("ydata3");
					let ydata4 = this.networkData.getInt("ydata4");
					params.oakcruciblebox(ydata1, ydata2, ydata3, ydata4, data);
				},
				load: function() {
					this.renderModel();
					var self = this;
					this.networkData.addOnDataChangedListener(function(data, isExternal) {
						self.renderModel();
					});
				}
			},
			tick: function() {
				let input = this.container.getSlot("slotInput");
				let st2 = this.container.getSlot("slot2");
				let water = this.liquidStorage.getAmount("water");
				let get = api.Crucible.dataGet("oak_crucible", input.id, input.data);

				if (water < 1 && this.data.worktime > 0) {
					get && this.liquidStorage.addLiquid("water", get.addwater);
					this.data.worktime -= 1;
				};
				if ((this.data.worktime + water * 1000 <= 750 || this.data.worktime <= 0 && water < 1) && get && st2.count == 0 && input.count == 64) {
					input.count--;
					this.data.worktime += get.addworktime;
				};
				this.data.worktime >= water && water <= 0 && this.Model(c4, this.data.worktime * 0.00075 + c4, c4, c4, [["air", 0]]);
				water > 0 && this.Model(c4, 1 - (1000 - this.data.worktime) * 0.00075, c4, (water * 1000) * 0.00075 + c4, [["Water", 0]]);
				input.count = input.count <= 0 ? 63 : input.count;
				if (this.data.worktime + water * 1000 >= 988 && st2.count == 0) {
					st2.count++;
					input.count = 64;
				};
				if (st2.count == 1 && input.count == 64 && this.data.worktime + water * 1000 == 0) {
					BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
					st2.count = 0;
					input.count = 63;
				};
			},
			getLiquid: function(full, amount, id, data, count, player) {
				Game.prevent();
				if (amount >= 1) {
					this.liquidStorage.getLiquid("water", 1);
					new PlayerEntity(player).setCarriedItem(id, count - 1, data);
					new PlayerEntity(player).addItemToInventory(full.id, 1, full.data);
					return true;
				};
			},
			click: function(id, count, data, croods, player) {
				var water = this.liquidStorage.getAmount("water");
				var input = this.container.getSlot("slotInput");
				var st2 = this.container.getSlot("slot2");
				var get = api.Crucible.dataGet("oak_crucible", id, data);
				var waterfull = LiquidRegistry.getFullItem(id, data, "water");
				if (this.data.worktime <= 750 && this.data.worktime / 1000 + water < 1) {
					if (get) {
						new PlayerEntity(player).setCarriedItem(id, count - 1, data);
						input.id = id;
						input.data = data;
						input.count++;
						Game.prevent();
					};
				};
				waterfull && this.getLiquid(waterfull, water, id, data, count, player);
			},
			destroy: function() {
				BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
				var input = this.container.getSlot("slotInput");
				var st2 = this.container.getSlot("slot2");
				input.count = 0;
				st2.count = 0;
			}
		};
		TileEntity.registerPrototype(BlockID[StringId], params);
	}
};