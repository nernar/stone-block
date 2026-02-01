var BLOCK_TYPE_SUN = Block.createSpecialType({
  destroytime: -1,
  explosionres: 3600000*3,
  renderlayer: 3,
  lightopacity: 15,
  lightlevel: 15
});

IDRegistry.genBlockID("eio_sun");
Block.createBlock("eio_sun", [
  { name: "Sun", texture: [["solar", 0]], inCreative: true }
], BLOCK_TYPE_SUN)

IDRegistry.genBlockID("eio_sun_ender");
Block.createBlock("eio_sun_ender", [
  { name: "Ender Sun", texture: [["solar_ender", 0]], inCreative: true }
], BLOCK_TYPE_SUN)

IDRegistry.genItemID("eio_sun");
Item.createItem("eio_sun", "Sun", { name: "solar" }, { stack: 1 });

IDRegistry.genItemID("eio_sun_ender");
Item.createItem("eio_sun_ender", "Ender Sun", { name: "solar_ender" }, { stack: 1 });

SunCore.SunMatter.setValue(VanillaBlockID.diamond_block, 74000)
SunCore.SunMatter.setValue(VanillaBlockID.emerald_block, 148000)
SunCore.SunMatter.setValue(VanillaBlockID.iron_block, 2400)
SunCore.SunMatter.setValue(VanillaBlockID.gold_block, 18000)


