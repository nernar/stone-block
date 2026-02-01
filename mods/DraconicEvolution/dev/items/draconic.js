IDRegistry.genItemID("draconicHelmet");
Item.createArmorItem("draconicHelmet", "Draconic Helmet", {name: "draconic_helmet", meta: 0}, {	isTech: false,
	armor: 3,
	type: "helmet",
	texture: "armor/draconic0.png",
	durability: 16000000
});
ARMOR.setMode({
	id: ItemID.draconicHelmet,
	type: [0],
	tick: function(){
	   Entity.addEffect(Player.get(), 16, 1, 19, false,false);
       Entity.addEffect(Player.get(), 23, 190, 19, false,false);
       Entity.addEffect(Player.get(), 13, 190, 19, false,false);
	}
});
Item.registerNameOverrideFunction(ItemID.draconicHelmet, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.draconicHelmet, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"
], ['a', ItemID.awakedCore, 0, 'b', ItemID.awakedIngot, 0, 'c', ItemID.wywernHelmet, -1, 'd', ItemID.awakedEnergyCore, 0], PADDING_ENERGY);
IDRegistry.genItemID("draconicChestplate");
Item.createArmorItem("draconicChestplate", "Draconic Chestplate", {name: "draconic_chestplate", meta: 0}, {	isTech: false,
	armor: 8,
	type: "chestplate",
	texture: "armor/draconic0.png",
	durability: 16000000
});
ARMOR.setMode({
	id: ItemID.draconicChestplate,
	type: [1],
	tick: function(){
	   Entity.addEffect(Player.get(), 11, 190, 19, false,false);
       Entity.addEffect(Player.get(), 10, 190, 19, false,false);
       Player.setFlyingEnabled(true);
	}
});
Callback.addCallback("tick",function() {
    if(Player.getArmorSlot(1).id ==! ItemID.draconicChestplate && !Game.getGameMode()){
	    Player.setFlyingEnabled(false);
    }
});
Item.registerNameOverrideFunction(ItemID.draconicChestplate, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.draconicChestplate, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"
], ['a', ItemID.awakedCore, 0, 'b', ItemID.awakedIngot, 0, 'c', ItemID.wywernChestplate, -1, 'd', ItemID.awakedEnergyCore, 0], PADDING_ENERGY);
IDRegistry.genItemID("draconicLeggings");
Item.createArmorItem("draconicLeggings", "Draconic Leggings", {name: "draconic_leggins", meta: 0}, {	isTech: false,
	armor: 6,
	type: "leggings",
	texture: "armor/draconic1.png",
	durability: 16000000
});
ARMOR.setMode({
	id: ItemID.draconicLeggings,
	type: [2],
	tick: function(){
	   Entity.addEffect(Player.get(), 1, 9, 19, false,false);
	}
});
Item.registerNameOverrideFunction(ItemID.draconicLeggings, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.draconicLeggings, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"
], ['a', ItemID.awakedCore, 0, 'b', ItemID.awakedIngot, 0, 'c', ItemID.wywernLeggings, -1, 'd', ItemID.awakedEnergyCore, 0], PADDING_ENERGY);
IDRegistry.genItemID("draconicBoots");
Item.createArmorItem("draconicBoots", "Draconic Boots", {name: "draconic_boots", meta: 0}, {	isTech: false,
	armor: 3,
	type: "boots",
	texture: "armor/draconic0.png",
	durability: 16000000
});
ARMOR.setMode({
	id: ItemID.draconicBoots,
	type: [3],
	tick: function(){
	   Entity.addEffect(Player.get(), 8, 3, 19, false,false);
	}
});
Item.registerNameOverrideFunction(ItemID.draconicBoots, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.draconicBoots, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"], ['a', ItemID.awakedCore, 0, 'b', ItemID.awakedIngot, 0, 'c', ItemID.wywernBoots, -1, 'd', ItemID.awakedEnergyCore, 0], PADDING_ENERGY);
ToolAPI.addToolMaterial("draconic", {durability: 16000000, level: 5, efficiency: 35, damage: 35, enchantability: 1});
IDRegistry.genItemID("draconicSword");
Item.createItem("draconicSword", "Draconic Sword", {name: "draconic_sword", meta: 0}, {stack: 1});
ToolAPI.setTool(ItemID.draconicSword, "draconic", ToolType.sword);
Callback.addCallback("DestroyBlock", function(coords, block, player){
var getBlock = World.getBlockID(coords.x, coords.y, coords.z);
item=Player.getCarriedItem(true);
if(item.id==ItemID.draconicSword&&getBlock==31||item.id==ItemID.draconicSword&&getBlock==175){
for(var xx = -20; xx <=20; xx++){
for(var yy = -20; yy <=20; yy++){
for(var zz = -20; zz <=20; zz++){
if(World.getBlockID(coords.x + xx, coords.y + yy, coords.z + zz) == 31||World.getBlockID(coords.x + xx, coords.y + yy, coords.z + zz) == 175) {
World.destroyBlock(coords.x + xx, coords.y + yy, coords.z + zz, true);}}}};}});
Item.registerNameOverrideFunction(ItemID.draconicSword, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.draconicSword, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"
], ['a', ItemID.awakedCore, 0, 'b', ItemID.awakedIngot, 0, 'c', ItemID.wywernSword, -1, 'd', ItemID.awakedEnergyCore, 0], PADDING_ENERGY);
IDRegistry.genItemID("draconicPickaxe");
Item.createItem("draconicPickaxe", "Draconic Pickaxe", {name: "draconic_pickaxe", meta: 0}, {stack: 1});
ToolAPI.setTool(ItemID.draconicPickaxe, "draconic", ToolType.pickaxe);
Callback.addCallback("DestroyBlock", function(coords, block, player){

var side = coords.side;

var X = 2;
var Y = 2;
var Z = 2;

if(side==4 || side==5){
            X = 0;}
            if(side==1 || side==6){
            Y = 0;}
            if(side==2 || side==3){
            Z = 0;}
for(var xx = coords.x - X; xx <= coords.x + X; xx++){
                for(var yy = coords.y - Y; yy <= coords.y + Y; yy++){
                    for(var zz = coords.z - Z; zz <= coords.z + Z; zz++){
item=Player.getCarriedItem(true);
var blockID = World.getBlockID(xx, yy, zz);
var material = ToolAPI.getBlockMaterial(blockID) || {};
if(World.getBlockID(xx, yy, zz) !== 7 && material.name == "stone" && item.id==ItemID.draconicPickaxe){
ToolAPI.breakCarriedTool(25);
World.destroyBlock(xx, yy, zz, true);}}}};});
Item.registerNameOverrideFunction(ItemID.draconicPickaxe, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.draconicPickaxe, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"
], ['a', ItemID.awakedCore, 0, 'b', ItemID.awakedIngot, 0, 'c', ItemID.wywernPickaxe, -1, 'd', ItemID.awakedEnergyCore, 0], PADDING_ENERGY);
IDRegistry.genItemID("draconicShovel");
Item.createItem("draconicShovel", "Draconic Shovel", {name: "draconic_shovel", meta: 0}, {stack: 1});
Callback.addCallback("DestroyBlock", function(coords, block, player){
var getBlock = World.getBlockID(coords.x, coords.y, coords.z);
item=Player.getCarriedItem(true);
if(item.id==ItemID.draconicShovel&&getBlock==2||item.id==ItemID.draconicShovel&&getBlock==3){
for(var xx = -2; xx <=2; xx++){
for(var yy = -2; yy <=2; yy++){
for(var zz = -2; zz <=2; zz++){
if(World.getBlockID(coords.x + xx, coords.y + yy, coords.z + zz) == 2||World.getBlockID(coords.x + xx, coords.y + yy, coords.z + zz) == 3) {
ToolAPI.breakCarriedTool(25);
World.destroyBlock(coords.x + xx, coords.y + yy, coords.z + zz, true);}}}};}});
ToolAPI.setTool(ItemID.draconicShovel, "draconic", ToolType.shovel);
Item.registerNameOverrideFunction(ItemID.draconicShovel, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.draconicShovel, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"
], ['a', ItemID.awakedCore, 0, 'b', ItemID.awakedIngot, 0, 'c', ItemID.wywernShovel, -1, 'd', ItemID.awakedEnergyCore, 0], PADDING_ENERGY);
IDRegistry.genItemID("draconicAxe");
Item.createItem("draconicAxe", "Draconic Axe", {name: "draconic_axe", meta: 0}, {stack: 1});
ToolAPI.setTool(ItemID.draconicAxe, "draconic", ToolType.axe);
Callback.addCallback("DestroyBlock", function(coords, block, player){
var getBlock = World.getBlockID(coords.x, coords.y, coords.z);
item=Player.getCarriedItem(true);
if(item.id==ItemID.draconicAxe&&getBlock==17||item.id==ItemID.draconicAxe&&getBlock==162){
for(var xx = -5; xx <=5; xx++){
for(var yy = -20; yy <=40; yy++){
for(var zz = -5; zz <=5; zz++){
if(World.getBlockID(coords.x + xx, coords.y + yy, coords.z + zz) == 17||World.getBlockID(coords.x + xx, coords.y + yy, coords.z + zz) == 162||World.getBlockID(coords.x + xx, coords.y + yy, coords.z + zz) == 18||World.getBlockID(coords.x + xx, coords.y + yy, coords.z + zz) == 161) {
ToolAPI.breakCarriedTool(25);
World.destroyBlock(coords.x + xx, coords.y + yy, coords.z + zz, true);}}}};}});
Item.registerNameOverrideFunction(ItemID.draconicAxe, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.draconicAxe, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"
], ['a', ItemID.awakedCore, 0, 'b', ItemID.awakedIngot, 0, 'c', 279, 0, 'd', ItemID.awakedEnergyCore, 0], PADDING_ENERGY);
IDRegistry.genItemID("draconicHoe");
Item.createItem("draconicHoe", "Draconic Hoe", {name: "draconic_hoe", meta: 0}, {stack: 1});
ToolAPI.setTool(ItemID.draconicHoe, "draconic", ToolType.hoe);
Item.registerNameOverrideFunction(ItemID.draconicHoe, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.draconicHoe, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"
], ['a', ItemID.awakedCore, 0, 'b', ItemID.awakedIngot, 0, 'c', 293, 0, 'd', ItemID.awakedEnergyCore, 0], PADDING_ENERGY);