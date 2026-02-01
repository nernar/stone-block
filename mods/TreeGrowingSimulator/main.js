var isGrowable = {};
Callback.addCallback("ServerPlayerTick", function (uid, isDead) {
	isGrowable[uid] == undefined && (isGrowable[uid] = true);
	if (isDead) return;

	let world = BlockSource.getDefaultForActor(uid); 
	let pos = Entity.getPosition(uid);
	pos.x = Math.floor(pos.x),
	pos.y = Math.floor(pos.y - 1.6),
	pos.z = Math.floor(pos.z);
	let isSneaking = Entity.getSneaking(uid);
	let sapling = world.getBlockId(pos.x, pos.y, pos.z);
	let dirt = world.getBlock(pos.x, pos.y - 1, pos.z);

	if (!isSneaking)
		isGrowable[uid] = true;

	if (isGrowable[uid] && isSneaking && sapling == 6 && ~[2, 3, 60, 243].indexOf(dirt.id)) {
		isGrowable[uid] = false;
		world.setBlock(pos.x, pos.y - 1, pos.z, 250, 0);
		world.setBlock(pos.x, pos.y - 1, pos.z, dirt.id, dirt.data);
		for (let i = 0; i < 12; i++)
			Commands.exec("particle minecraft:villager_happy " + (pos.x + Math.random())  + " " + (pos.y + Math.random()) + " " + (pos.z + Math.random()));
	}
});