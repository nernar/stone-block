var BLOCK_TYPE_SUN_CONTROL = Block.createSpecialType({
  destroytime: 20,
  explosionres: 3600000*3
});

IDRegistry.genBlockID("sunControl");
Block.createBlock("sunControl", [
  {
    name: "Sun Controller",
    texture: [
	["machineBottom", 0], ["solar_control_top", 0], ["olar_control_side", 0]],
    inCreative: true
  }
]);
Block.setBlockShape(BlockID.photovoltaicCell, { x: 0, y: 0, z: 0 }, { x: 1, y: 0.5, z: 1 });
