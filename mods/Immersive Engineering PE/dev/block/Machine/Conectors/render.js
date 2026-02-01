//Только б сработало...
//Не, не заработало(((
//Почти, почти
/*IDRegistry.genItemID("connectora");
Item.createItem("connectora", "Низковольтный коннектор", {name: "connectora", meta: 0}, {stack: 64});
IDRegistry.genBlockID("connectorr");
Block.createBlockWithRotation("connectorr", [{name: "Низковольтный коннектор", texture: [[" dynamoBottom", 0]],inCreative: false, destroytime: 21, explosionres: 25}]);
//RenderMesh()
var mesh = new RenderMesh();
mesh.setBlockTexture("connector", 0);
mesh.importFromFile(__dir__ + "res/models/connectorLV.obj", "obj", null); 
var blockModel = new BlockRenderer.Model(mesh);
var icRenderModel = new ICRender.Model();
icRenderModel.addEntry(blockModel);
BlockRenderer.setStaticICRender(BlockID.connectorr, -1, icRenderModel);
Item.registerUseFunctionForID(ItemID.connectora, function(coords, item, block); { 
	coords = coords.relative; 
	World.setBlock(coords.x, coords.y, coords.z, BlockID.connectorr, 0)};
});*/

