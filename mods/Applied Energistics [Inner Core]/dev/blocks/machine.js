IDRegistry.genBlockID("grindstone");
Block.createBlockWithRotation("grindstone", [{name: "Кварцевый дробитель", texture: [["grindstone_bottom", 0], ["grindstone", 0], ["grindstone_bottom", 0], ["grindstone_front", 0], ["grindstone_side", 0], ["grindstone_side", 0]], inCreative: true}]);

IDRegistry.genBlockID("medrive");
Block.createBlockWithRotation("medrive", [{name: "МЭ Дисковод", texture: [["drive_bottom", 0], ["drive_top", 0], ["drive_bottom", 0], ["drive_front", 0], ["drive_side", 0], ["drive_side", 0]], inCreative: true}]);

var guiMeDrive = new UI.StandartWindow({
	standart: {header: {text: {text: "Me Drive"}},
	background: {color: android.graphics.Color.parseColor("#b3b3b3")}, inventory: {standart: true}},
	drawing: [],
	elements: {
		"slot_0": {type: "slot", x: 573, y: 190, size: 60},
		"slot_1": {type: "slot", x: 572, y: 250, size: 60},
		"slot_2": {type: "slot", x: 573, y: 310, size: 60},
		"slot_3": {type: "slot", x: 510, y: 190, size: 60},
		"slot_4": {type: "slot", x: 510, y: 250, size: 60},
		"slot_5": {type: "slot", x: 510, y: 310, size: 60},
		"slot_6": {type: "slot", x: 572, y: 370, size: 60},
		"slot_7": {type: "slot", x: 510, y: 370, size: 60},
		"slot_8": {type: "slot", x: 510, y: 430, size: 60},
		"slot_9": {type: "slot", x: 572, y: 430, size: 60}
	}
});

TileEntity.registerPrototype(BlockID.medrive,
 {
     getGuiScreen: function(){
          return guiMeDrive;
     }
});

IDRegistry.genBlockID("meCable");
Block.createBlock("meCable", [{name: "Me Cable", texture: [["mecable", 0], ["mecable", 0], ["mecable", 0], ["mecable", 0], ["mecable", 0], ["mecable", 0]], inCreative: true}])


function setupWireRender(id, width, groupName, preventSelfAdd) {
    var render = new ICRender.Model();
    BlockRenderer.setStaticICRender(id, 0, render);
   
    var boxes = [
        {side: [1, 0, 0], box: [0.5 + width / 2, 0.5 - width / 2, 0.5 - width / 2, 1, 0.5 + width / 2, 0.5 + width / 2]},
        {side: [-1, 0, 0], box: [0, 0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2]},
        {side: [0, 1, 0], box: [0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2, 1, 0.5 + width / 2]},
        {side: [0, -1, 0], box: [0.5 - width / 2, 0, 0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2]},
        {side: [0, 0, 1], box: [0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, 1]},
        {side: [0, 0, -1], box: [0.5 - width / 2, 0.5 - width / 2, 0, 0.5 + width / 2, 0.5 + width / 2, 0.5 - width / 2]},
    ]
   
    var group = ICRender.getGroup(groupName);
    if (!preventSelfAdd) {
        group.add(id, -1);
    }
   
    for (var i in boxes) {
        var box = boxes[i];
       
        var model = BlockRenderer.createModel();
        model.addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5], id, 0);
       
        render.addEntry(model).asCondition(box.side[0], box.side[1], box.side[2], group, 0);
    }
   
    var model = BlockRenderer.createModel();
    model.addBox(0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, id, 0);
    render.addEntry(model);
    
    width = Math.max(width, 0.5);
    Block.setBlockShape(id, {x: 0.5 - width/2, y: 0.5 - width/2, z: 0.5 - width/2}, {x: 0.5 + width/2, y: 0.5 + width/2, z: 0.5 + width/2});
}

function setupBlockAsWire(id) {
	AE.registerWire(id);
}

setupBlockAsWire(BlockID.meCable);
setupWireRender(BlockID.meCable, 3/8, "ic-wire");
