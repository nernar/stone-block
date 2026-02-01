IDRegistry.genItemID("ex_bucketPorcelainRaw");
Item.createItem("ex_bucketPorcelainRaw", "Unfired Bucket", {
    name: "enr_bucketPorcelainRaw",
    meta: 0
}, {
    stack: 16
});
IDRegistry.genItemID("ex_bucketPorcelainEmpty");
Item.createItem("ex_bucketPorcelainEmpty", "Bucket", {
    name: "enr_bucketPorcelainEmpty",
    meta: 0
}, {
    stack: 16
});
IDRegistry.genItemID("ex_bucketPorcelainWater");
Item.createItem("ex_bucketPorcelainWater", "Water Bucket", {
    name: "enr_bucketPorcelainWater",
    meta: 0
}, {
    stack: 1
});
IDRegistry.genItemID("ex_bucketPorcelainLava");
Item.createItem("ex_bucketPorcelainLava", "Lava Bucket", {
    name: "enr_bucketPorcelainLava",
    meta: 0
}, {
    stack: 1
});
LiquidRegistry.registerItem("water", {
    id: ItemID.ex_bucketPorcelainEmpty,
    data: 0
}, {
    id: ItemID.ex_bucketPorcelainWater,
    data: 0
});
LiquidRegistry.registerItem("lava", {
    id: ItemID.ex_bucketPorcelainEmpty,
    data: 0
}, {
    id: ItemID.ex_bucketPorcelainLava,
    data: 0
});
BcuketRegister.registerAll(ItemID.ex_bucketPorcelainEmpty, ItemID.ex_bucketPorcelainWater, 8, function(blockID) {
    if (blockID == 0 || blockID > 7 && blockID < 12) return true;
}, function(blockID, block) {
    if (block.id == 8 || (block.id == 9 && block.data == 0)) return true;
});
BcuketRegister.registerAll(ItemID.ex_bucketPorcelainEmpty, ItemID.ex_bucketPorcelainLava, 10, function(blockID) {
    if (blockID == 0 || blockID > 7 && blockID < 12) return true;
}, function(blockID, block) {
    if (block.id == 10 || (block.id == 11 && block.data == 0)) return true;
});