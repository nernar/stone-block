
IDRegistry.genBlockID("blastFurnaceAdvanced");
Block.createBlockWithRotation("blastFurnaceAdvanced", [{name: "Низковольтныйdd коннектор", texture: [["dynamoBottom", 0]],inCreative: false, destroytime: 21, explosionres: 25}]);
//RenderMesh()
var mesh = new RenderMesh();
mesh.setBlockTexture("blastFurnaceAdvanced", 0);
mesh.importFromFile(__dir__ + "res/models/blastfurnace_advanced.obj", "obj", null); 
var blockModel = new BlockRenderer.Model(mesh);
var icRenderModel = new ICRender.Model();
icRenderModel.addEntry(blockModel);
BlockRenderer.setStaticICRender(BlockID.blastFurnaceAdvanced, -1, icRenderModel);
});
