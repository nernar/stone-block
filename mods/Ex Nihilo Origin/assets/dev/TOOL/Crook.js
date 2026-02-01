ToolType.crook = {
	isWeapon: false,
	damage: 1,
	baseDamage: 0,
	blockTypes: ["plant", "fibre", "fiber"],
	calcDestroyTime: function(item, coords, block, params, destroyTime, enchant) {
		if (block.id == 18 || block.id == 161) {
			return 0.2;
		} else {
			return destroyTime;
		}
	}
};
IDRegistry.genItemID("ex_crookwriter");
Item.createItem("ex_crookwriter", "Author Crook", {
	name: "enr_Crook",
	meta: 0
},
{
	stack: 1
});
IDRegistry.genItemID("ex_crookWood");
Item.createItem("ex_crookWood", "Wooden Crook", {
	name: "enr_Crook",
	meta: 0
},
{
	stack: 1
});
IDRegistry.genItemID("ex_crookBone");
Item.createItem("ex_crookBone", "Bone Crook", {
	name: "enr_Crook",
	meta: 1
},
{
	stack: 1
});
IDRegistry.genItemID("ex_crookReed");
Item.createItem("ex_crookReed", "Sugarcane Crook", {
	name: "enr_Crook",
	meta: 2
},
{
	stack: 1
});
IDRegistry.genItemID("ex_crookHay");
Item.createItem("ex_crookHay", "Hay Crook", {
	name: "enr_Crook",
	meta: 3
},
{
	stack: 1
});
IDRegistry.genItemID("ex_crookGold");
Item.createItem("ex_crookGold", "Gold Crook", {
	name: "enr_Crook",
	meta: 4
},
{
	stack: 1
});
Item.addCreativeGroup("crook", Translation.translate("Crooks"), [ItemID["ex_crookwriter"], ItemID["ex_crookWood"], ItemID["ex_crookBone"], ItemID["ex_crookReed"], ItemID["ex_crookHay"], ItemID["ex_crookGold"], ]);
ToolAPI.setTool(ItemID.ex_crookWood, {
	durability: 60,
	level: 1,
	efficiency: 1,
	damage: 2
},
ToolType.crook);
ToolAPI.setTool(ItemID.ex_crookBone, {
	durability: 90,
	level: 1,
	efficiency: 1,
	damage: 3
},
ToolType.crook);
ToolAPI.setTool(ItemID.ex_crookReed, {
	durability: 45,
	level: 1,
	efficiency: 2,
	damage: 2
},
ToolType.crook);
ToolAPI.setTool(ItemID.ex_crookHay, {
	durability: 110,
	level: 1,
	efficiency: 3,
	damage: 2
},
ToolType.crook);
ToolAPI.setTool(ItemID.ex_crookGold, {
	durability: 30,
	level: 1,
	efficiency: 12,
	damage: 2
},
ToolType.crook);

Callback.addCallback("DestroyBlock", function(coords, block, player) {
if (block.id == 18||block.id == 161){
Callback.invokeCallback("DestroyBlock_hook", coords, block, player);
}
});


Callback.addCallback("DestroyBlock_hook", function(coords, block, player) {
	let item = Entity.getCarriedItem(player);
	let blockSource = BlockSource.getDefaultForActor(player);
	let x = coords.x, y = coords.y, z = coords.z;
	if (block.id != 18) return;
	if (item.id == ItemID.ex_crookWood || item.id == ItemID.ex_crookBone) {
		if (block.data == 0 || block.data == 4) {
			(Math.random() * 100 < 12) && blockSource.spawnDroppedItem(x, y, z, 6, 1, 0);
			(Math.random() * 100 < 6) && blockSource.spawnDroppedItem(x, y, z, 260, 1, 0);
		    (Math.random() * 100 < 2) && blockSource.spawnDroppedItem(x, y, z, ItemID.ex_silkWorm, 1, 0);
		};
		if (block.data == 1 || block.data == 5) {
			(Math.random() * 100 < 12) && blockSource.spawnDroppedItem(x, y, z, 6, 1, 1);
			(Math.random() * 100 < 6) && blockSource.spawnDroppedItem(x, y, z, 6, 2, 1);
			(Math.random() * 100 < 2) && blockSource.spawnDroppedItem(x, y, z, ItemID.ex_silkWorm, 1, 0);
		};
		if (block.data == 2 || block.data == 6) {
			(Math.random() * 100 < 12) && blockSource.spawnDroppedItem(x, y, z, 6, 1, 2);
			(Math.random() * 100 < 6) && blockSource.spawnDroppedItem(x, y, z, 260, 1, 0);
			(Math.random() * 100 < 2) && blockSource.spawnDroppedItem(x, y, z, ItemID.ex_silkWorm, 1, 0);
		}
		if (block.data == 3 || block.data == 7) {
			(Math.random() * 100 < 12) && blockSource.spawnDroppedItem(x, y, z, 6, 1, 3);
			(Math.random() * 100 < 1) && blockSource.spawnDroppedItem(x, y, z, 106, 1, 0);
			(Math.random() * 100 < 2) && blockSource.spawnDroppedItem(x, y, z, ItemID.ex_silkWorm, 1, 0);
		}
	}
	if (item.id == ItemID.ex_crookGold) {
		if (block.data == 0 || block.data == 4) {
			(Math.random() * 100 < 20) && blockSource.spawnDroppedItem(x, y, z, 6, 1, 0);
			(Math.random() * 100 < 14) && blockSource.spawnDroppedItem(x, y, z, 260, 1, 0);
		    (Math.random() * 100 < 10) && blockSource.spawnDroppedItem(x, y, z, ItemID.ex_silkWorm, 1, 0);
		}
		if (block.data == 3 || block.data == 7) {
			(Math.random() * 100 < 20) && blockSource.spawnDroppedItem(x, y, z, 6, 1, 3);
			(Math.random() * 100 < 9) && blockSource.spawnDroppedItem(x, y, z, 106, 1, 0);
			(Math.random() * 100 < 10) && blockSource.spawnDroppedItem(x, y, z, ItemID.ex_silkWorm, 1, 0);
		}
		if (block.data == 1 || block.data == 5) {
			(Math.random() * 100 < 20) && blockSource.spawnDroppedItem(x, y, z, 6, 1, 1);
			(Math.random() * 100 < 14) && blockSource.spawnDroppedItem(x, y, z, 6, 2, 1);
			(Math.random() * 100 < 10) && blockSource.spawnDroppedItem(x, y, z, ItemID.ex_silkWorm, 1, 0);
		}
		if (block.data == 2 || block.data == 6) {
			(Math.random() * 100 < 20) && blockSource.spawnDroppedItem(x, y, z, 6, 1, 2);
			(Math.random() * 100 < 14) && blockSource.spawnDroppedItem(x, y, z, 260, 1, 0);
			(Math.random() * 100 < 10) && blockSource.spawnDroppedItem(x, y, z, ItemID.ex_silkWorm, 1, 0);
		}
	}
	if (item.id == ItemID.ex_crookHay || item.id == ItemID.ex_crookReed) {
		if (block.data == 0 || block.data == 4) {
			(Math.random() * 100 < 15) && blockSource.spawnDroppedItem(x, y, z, 6, 1, 0);
			(Math.random() * 100 < 9) && blockSource.spawnDroppedItem(x, y, z, 260, 1, 0);
		    (Math.random() * 100 < 5) && blockSource.spawnDroppedItem(x, y, z, ItemID.ex_silkWorm, 1, 0);
		}
		if (block.data == 1 || block.data == 5) {
			(Math.random() * 100 < 15) && blockSource.spawnDroppedItem(x, y, z, 6, 1, 1);
			(Math.random() * 100 < 9) && blockSource.spawnDroppedItem(x, y, z, 6, 2, 1);
			(Math.random() * 100 < 5) && blockSource.spawnDroppedItem(x, y, z, ItemID.ex_silkWorm, 1, 0);
		}
		if (block.data == 2 || block.data == 6) {
			(Math.random() * 100 < 15) && blockSource.spawnDroppedItem(x, y, z, 6, 1, 2);
			(Math.random() * 100 < 9) && blockSource.spawnDroppedItem(x, y, z, 260, 1, 0);
			(Math.random() * 100 < 5) && blockSource.spawnDroppedItem(x, y, z, ItemID.ex_silkWorm, 1, 0);
		}
		if (block.data == 3 || block.data == 7) {
			(Math.random() * 100 < 15) && blockSource.spawnDroppedItem(x, y, z, 6, 1, 3);
			(Math.random() * 100 < 4) && blockSource.spawnDroppedItem(x, y, z, 106, 1, 0);
			(Math.random() * 100 < 5) && blockSource.spawnDroppedItem(x, y, z, ItemID.ex_silkWorm, 1, 0);
		}
	}
});
Callback.addCallback("DestroyBlock_hook", function(coords, block, player) {
	let item = Entity.getCarriedItem(player);
	let blockSource = BlockSource.getDefaultForActor(player);
	let x = coords.x, y = coords.y, z = coords.z;
	if (block.id != 161) return;
	if (item.id == ItemID.ex_crookWood || item.id == ItemID.ex_crookBone) {
		if (block.data == 0) {
			(Math.random() * 100 < 12) && blockSource.spawnDroppedItem(x, y, z, 6, 1, 4);
		    (Math.random() * 100 < 2) && blockSource.spawnDroppedItem(x, y, z, ItemID.ex_silkWorm, 1, 0);
		};
		if (block.data == 1 || block.data == 5) {
			(Math.random() * 100 < 12) && blockSource.spawnDroppedItem(x, y, z, 6, 1, 5);
			(Math.random() * 100 < 9) && blockSource.spawnDroppedItem(x, y, z, 260, 1, 0);
			(Math.random() * 100 < 2) && blockSource.spawnDroppedItem(x, y, z, ItemID.ex_silkWorm, 1, 0);
		};
	};
	if (item.id == ItemID.ex_crookGold) {
		if (data == 0) {
			(Math.random() * 100 < 20) && blockSource.spawnDroppedItem(x, y, z, 6, 1, 4);
		    (Math.random() * 100 < 10) && blockSource.spawnDroppedItem(x, y, z, ItemID.ex_silkWorm, 1, 0);
		}
		if (data == 1 || data == 5) {
			(Math.random() * 100 < 20) && blockSource.spawnDroppedItem(x, y, z, 6, 1, 5);
			(Math.random() * 100 < 17) && blockSource.spawnDroppedItem(x, y, z, 260, 1, 0);
			(Math.random() * 100 < 10) && blockSource.spawnDroppedItem(x, y, z, ItemID.ex_silkWorm, 1, 0);
		};
	};
	if (item.id == ItemID.ex_crookHay || item.id == ItemID.ex_crookReed) {
		if (data == 0) {
			(Math.random() * 100 < 15) && blockSource.spawnDroppedItem(x, y, z, 6, 1, 4);
			(Math.random() * 100 < 5) && blockSource.spawnDroppedItem(x, y, z, ItemID.ex_silkWorm, 1, 0);
		}
		if (data == 1 || data == 5) {
			(Math.random() * 100 < 15) && blockSource.spawnDroppedItem(x, y, z, 6, 1, 5);
			(Math.random() * 100 < 12) && blockSource.spawnDroppedItem(x, y, z, 260, 1, 0);
			(Math.random() * 100 < 5) && blockSource.spawnDroppedItem(x, y, z, ItemID.ex_silkWorm, 1, 0);
		};
	};
});

Item.registerUseFunction("ex_crookwriter",
function(coords, item, block, player) {
	let blockSource = BlockSource.getDefaultForActor(player);
	Debug.message("ID:" + blockSource.getBlockId(coords.x, coords.y, coords.z));
	Debug.message("DATA:" + blockSource.getBlockData(coords.x, coords.y, coords.z));
	//	Debug.message(World.getTileEntity(coords.x, coords.y, coords.z,blockSource))
//	Debug.message(World.getTileEntity(coords.x, coords.y, coords.z,blockSource).getTransportSlots)
});