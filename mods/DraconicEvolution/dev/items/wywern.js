IDRegistry.genItemID("wywernCore");
Item.createItem("wywernCore", "Wywern Core", {name: "core", meta: 1}, {});
Item.setGlint(ItemID.wywernCore, true);
Recipes.addShaped({id: ItemID.wywernCore, count: 1, data: 0}, [
	"bab",
	"aca",
	"bab"
], ['a', ItemID.draconicCore, 0, 'b', ItemID.draconiumIngot, 0, 'c', 399, 0]); 
IDRegistry.genItemID("wywernEnergyCore");
Item.createItem("wywernEnergyCore", "Wywern Energy Core", {name: "energy_core", meta: 0}, {});
Recipes.addShaped({id: ItemID.wywernEnergyCore, count: 1, data: 0}, [
	"bab",
	"aca",
	"bab"
], ['a', 152, 0, 'b', ItemID.draconiumIngot, 0, 'c', ItemID.draconicCore, 0]); 
IDRegistry.genItemID("wywernHelmet");
Item.createArmorItem("wywernHelmet", "Wywern Helmet", {name: "wywern_helmet", meta: 0}, {	isTech: false,
	armor: 3,
	type: "helmet",
	texture: "armor/wywern0.png",
	durability: 4000000
});
ARMOR.setMode({
	id: ItemID.wywernHelmet,
	type: [0],
	tick: function(){
	   Entity.addEffect(Player.get(), 10, 40, 14, false,false);
	}
});
Item.registerNameOverrideFunction(ItemID.wywernHelmet, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.wywernHelmet, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"
], ['a', ItemID.wywernCore, 0, 'b', ItemID.draconiumIngot, 0, 'c', 310, 0, 'd', ItemID.wywernEnergyCore, 0], PADDING_ENERGY);
IDRegistry.genItemID("wywernChestplate");
Item.createArmorItem("wywernChestplate", "Wywern Chestplate", {name: "wywern_chestplate", meta: 0}, {	isTech: false,
	armor: 8,
	type: "chestplate",
	texture: "armor/wywern0.png",
	durability: 4000000
});
ARMOR.setMode({
	id: ItemID.wywernChestplate,
	type: [1],
	tick: function(){
	   Entity.addEffect(Player.get(), 11, 40, 14, false,false);
	}
});
Item.registerNameOverrideFunction(ItemID.wywernChestplate, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.wywernChestplate, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"
], ['a', ItemID.wywernCore, 0, 'b', ItemID.draconiumIngot, 0, 'c', 311, 0, 'd', ItemID.wywernEnergyCore, 0], PADDING_ENERGY);
IDRegistry.genItemID("wywernLeggings");
Item.createArmorItem("wywernLeggings", "Wywern Leggings", {name: "wywern_leggins", meta: 0}, {	isTech: false,
	armor: 6,
	type: "leggings",
	texture: "armor/wywern1.png",
	durability: 4000000
});
ARMOR.setMode({
	id: ItemID.wywernLeggings,
	type: [2],
	tick: function(){
	   Entity.addEffect(Player.get(), 1, 4, 14, false,false);
	}
});
Item.registerNameOverrideFunction(ItemID.wywernLeggings, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.wywernLeggings, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"
], ['a', ItemID.wywernCore, 0, 'b', ItemID.draconiumIngot, 0, 'c', 312, 0, 'd', ItemID.wywernEnergyCore, 0], PADDING_ENERGY);
IDRegistry.genItemID("wywernBoots");
Item.createArmorItem("wywernBoots", "Wywern Boots", {name: "wywern_boots", meta: 0}, {	isTech: false,
	armor: 3,
	type: "boots",
	texture: "armor/wywern0.png",
	durability: 4000000
});
ARMOR.setMode({
	id: ItemID.wywernBoots,
	type: [3],
	tick: function(){
	   Entity.addEffect(Player.get(), 8, 2, 14, false,false);
	}
});
Item.registerNameOverrideFunction(ItemID.wywernBoots, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.wywernBoots, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"
], ['a', ItemID.wywernCore, 0, 'b', ItemID.draconiumIngot, 0, 'c', 313, 0, 'd', ItemID.wywernEnergyCore, 0], PADDING_ENERGY);
ToolAPI.addToolMaterial("wywern", {durability: 4000000, level: 5, efficiency: 15, damage: 15, enchantability: 1});
IDRegistry.genItemID("wywernSword");
Item.createItem("wywernSword", "Wywern Sword", {name: "wywern_sword", meta: 0}, {stack: 1});
Callback.addCallback("DestroyBlock", function(coords, block, player){
var getBlock = World.getBlockID(coords.x, coords.y, coords.z);
item=Player.getCarriedItem(true);
if(item.id==ItemID.wywernSword&&getBlock==31||item.id==ItemID.wywernSword&&getBlock==175){
for(var xx = -10; xx <=10; xx++){
for(var yy = -10; yy <=10; yy++){
for(var zz = -10; zz <=10; zz++){
if(World.getBlockID(coords.x + xx, coords.y + yy, coords.z + zz) == 31||World.getBlockID(coords.x + xx, coords.y + yy, coords.z + zz) == 175) {
World.destroyBlock(coords.x + xx, coords.y + yy, coords.z + zz, true);}}}};}});
ToolAPI.setTool(ItemID.wywernSword, "wywern", ToolType.sword);
Item.registerNameOverrideFunction(ItemID.wywernSword, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.wywernSword, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"
], ['a', ItemID.wywernCore, 0, 'b', ItemID.draconiumIngot, 0, 'c', 276, 0, 'd', ItemID.wywernEnergyCore, 0], PADDING_ENERGY);
IDRegistry.genItemID("wywernPickaxe");
Item.createItem("wywernPickaxe", "Wywern Pickaxe", {name: "wywern_pickaxe", meta: 0}, {stack: 1});
ToolAPI.setTool(ItemID.wywernPickaxe, "wywern", ToolType.pickaxe);
Callback.addCallback("DestroyBlock", function(coords, block, player){

var side = coords.side;

var X = 1;
var Y = 1;
var Z = 1;

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
if(World.getBlockID(xx, yy, zz) !== 7 &&  material.name == "stone" &&item.id==ItemID.wywernPickaxe){
ToolAPI.breakCarriedTool(9);
World.destroyBlock(xx, yy, zz, true);}}}};});
Item.registerNameOverrideFunction(ItemID.wywernPickaxe, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.wywernPickaxe, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"
], ['a', ItemID.wywernCore, 0, 'b', ItemID.draconiumIngot, 0, 'c', 278, 0, 'd', ItemID.wywernEnergyCore, 0], PADDING_ENERGY);
IDRegistry.genItemID("wywernShovel");
Item.createItem("wywernShovel", "Wywern Shovel", {name: "wywern_shovel", meta: 0}, {stack: 1});
Callback.addCallback("DestroyBlock", function(coords, block, player){
var getBlock = World.getBlockID(coords.x, coords.y, coords.z);
item=Player.getCarriedItem(true);
if(item.id==ItemID.wywernShovel&&getBlock==2||item.id==ItemID.wywernShovel&&getBlock==3){
for(var xx = -1; xx <=1; xx++){
for(var yy = -1; yy <=1; yy++){
for(var zz = -1; zz <=1; zz++){
if(World.getBlockID(coords.x + xx, coords.y + yy, coords.z + zz) == 2||World.getBlockID(coords.x + xx, coords.y + yy, coords.z + zz) == 3) {
ToolAPI.breakCarriedTool(9);
World.destroyBlock(coords.x + xx, coords.y + yy, coords.z + zz, true);}}}};}});
ToolAPI.setTool(ItemID.wywernShovel, "wywern", ToolType.shovel);
Item.registerNameOverrideFunction(ItemID.wywernShovel, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.wywernShovel, count: 1, data: 0}, [
	"bab",
	"bcb",
	"bdb"
], ['a', ItemID.wywernCore, 0, 'b', ItemID.draconiumIngot, 0, 'c', 277, 0, 'd', ItemID.wywernEnergyCore, 0], PADDING_ENERGY);