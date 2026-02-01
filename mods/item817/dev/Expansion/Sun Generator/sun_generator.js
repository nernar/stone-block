var BLOCK_TYPE_SUN_CORE = Block.createSpecialType({
  destroytime: 20,
  explosionres: 3600000*3
});

IDRegistry.genBlockID("sunGenerator");
Block.createBlock("sunGenerator", [
  {
    name: "Sun Generator",
	texture: [["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["solar_generators", 0], ["machineSide", 0]],
    inCreative: true
  }
]);

