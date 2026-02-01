IDRegistry.genBlockID("infusedObsidian");
Block.createBlock("infusedObsidian", [
	{name: "Infused Obsidian", texture: [["infused_obsidian", 0]], inCreative: true}
], BLOCK_TYPE_BOOM)
ToolAPI.registerBlockMaterial(BlockID.infusedObsidian, "unbreaking");
Recipes.addShaped({id: BlockID.infusedObsidian, count: 1, data: 0}, [
	"bab",
	"aca",
	"bab"
], ['a', 49, 0, 'b', 377, 0, 'c', ItemID.draconiumDust, 0]); 
Block.registerDropFunction("infusedObsidian", function(coords, blockID, blockData, level){
	if (level > 3){
		return [[BlockID.infusedObsidian, 1, 0]]
	}
	return [];
}, 2);

IDRegistry.genItemID("smallChaosCrystal");
Item.createItem("smallChaosCrystal", "Small Crystal of Chaos", {name: "small_crystal_chaos", meta: 0}, {stack: 64});
IDRegistry.genItemID("chaosCrystal");
Item.createItem("chaosCrystal", "Crystal of Chaos", {name: "crystal_chaos", meta: 0}, {stack: 64});
IDRegistry.genBlockID("chaosCrystal");
Block.createBlock("chaosCrystal", [
	{name: "Chaos Crystal", texture: [["chaos_crystal", 0]], inCreative: true}
], BLOCK_TYPE_BOOM)
ToolAPI.registerBlockMaterial(BlockID.chaosCrystal, "stone")
Block.registerDropFunction("chaosCrystal", function(coords, blockID, blockData, level){
	if (level > 3){
		return [[ItemID.smallChaosCrystal,1 + Math.random() * 5,0], [ItemID.chaosCrystal, 1, 0]]
	}
	return [];
}, 2);
var mesh = new RenderMesh();
mesh.setBlockTexture("chaos_crystal", 0);
mesh.importFromFile(__dir__ + "res/models/chaos_crystal.obj", "obj", null); 
var blockModel = new BlockRenderer.Model(mesh);
var icRenderModel = new ICRender.Model();
icRenderModel.addEntry(blockModel);
BlockRenderer.setStaticICRender(BlockID.chaosCrystal, -1, icRenderModel);
Recipes.addShaped({id: ItemID.chaosCrystal, count: 1, data: 0}, [
	"aaa",
	"aaa",
	"aaa"
], ['a', ItemID.smallChaosCrystal, 0]); 
IDRegistry.genItemID("chaosCore");
Item.createItem("chaosCore", "Chaos Core", {name: "core", meta: 3}, {});
Item.setGlint(ItemID.chaosCore, true);
Recipes.addShaped({id: ItemID.chaosCore, count: 1, data: 0}, [
	"bab",
	"aca",
	"bab"
], ['a', ItemID.awakedCore, 0, 'b', ItemID.awakedIngot, 0, 'c', ItemID.chaosCrystal, 0]); 
ToolType.staff = {
enchantType: Native.EnchantType.pickaxe,
damage: 0,
blockTypes: ["stone", "dirt", "wood", "plant", "firbe"]}
ToolAPI.addToolMaterial("chaos", {durability: 48000000, level: 5, efficiency: 60, damage: 60, enchantability: 1});
IDRegistry.genItemID("powerStaff");
Item.createItem("powerStaff", "Staff of Power", {name: "staff", meta: 0}, {stack: 1});
ToolAPI.setTool(ItemID.powerStaff, "chaos", ToolType.staff);
Callback.addCallback("DestroyBlock", function(coords, block, player){

var side = coords.side;

var X = 3;
var Y = 3;
var Z = 3;

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
if(World.getBlockID(xx, yy, zz) !== 7&&item.id==ItemID.powerStaff){
ToolAPI.breakCarriedTool(49);
World.destroyBlock(xx, yy, zz, true);}}}};});
Item.registerNameOverrideFunction(ItemID.powerStaff, ENERGY_ITEM_NAME);
Recipes.addShaped({id: ItemID.powerStaff, count: 1, data: 0}, [
	"bab",
	"ecf",
	"bdb"
], ['a', ItemID.awakedCore, 0, 'b', ItemID.awakedIngot, 0, 'c', ItemID.draconicPickaxe, -1, 'd', ItemID.awakedEnergyCore, 0, 'e', ItemID.draconicAxe, -1, 'f', ItemID.draconicShovel, -1], PADDING_ENERGY);