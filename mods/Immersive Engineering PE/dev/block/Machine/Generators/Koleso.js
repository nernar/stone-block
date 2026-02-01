IDRegistry.genBlockID("waterBlock");
Block.createBlock("waterBlock", [ {name: "Водяная мельница", texture: [["waterBlock", 0]], inCreative: false}]);

IDRegistry.genItemID("waterItem");
Item.createItem("waterBlock", "Водяное колесо", {name: "water_item", meta: 0}, {stack: 64});
//RenderMesh()
var mesh = new RenderMesh();
mesh.setBlockTexture("waterBlock", 0);
mesh.importFromFile(__dir__ + "res/models/ bucketWheel.obj ", "obj", null); 
var blockModel = new BlockRenderer.Model(mesh);
var icRenderModel = new ICRender.Model();
icRenderModel.addEntry(blockModel);
BlockRenderer.setStaticICRender(BlockID.waterBlock, 0, icRenderModel);
Item.registerUseFunctionForID(ItemID.waterItem, function(coords, item, block) { 
	coords = coords.relative; 
	World.setBlock(coords.x, coords.y, coords.z, BlockID.waterBlock, 0)});