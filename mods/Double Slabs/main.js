var slabs = [
  {
    bottom: [44, 0],
    up: [44, 8]
  },
  {
    bottom: [44, 1],
    up: [44, 9]
  },
  {
    bottom: [44, 2],
    up: [44, 10]
  },
  {
    bottom: [44, 3],
    up: [44, 11]
  },
  {
    bottom: [44, 4],
    up: [44, 12]
  },
  {
    bottom: [44, 5],
    up: [44, 13]
  },
  {
    bottom: [44, 6],
    up: [44, 14]
  },
  {
    bottom: [44, 7],
    up: [44, 15]
  },
  {
    bottom: [158, 0],
    up: [158, 8]
  },
  {
    bottom: [158, 1],
    up: [158, 9]
  },
  {
    bottom: [158, 2],
    up: [158, 10]
  },
  {
    bottom: [158, 3],
    up: [158, 11]
  },
  {
    bottom: [158, 4],
    up: [158, 12]
  },
  {
    bottom: [158, 5],
    up: [158, 13]
  },
  {
    bottom: [182, 0],
    up: [182, 8]
  },
  {
    bottom: [182, 1],
    up: [182, 9]
  }
];

var STONE = Block.createSpecialType({
	base: 1,
	opaque: true,
	lightopacity: 15,
	solid: true
});

function addSlabs(slab1, slab2){
	let nameID = "DB$" + slab1[0][0] + "$" + slab1[0][1] + "$" + slab2[0][0] + "$" + slab2[0][1];
	IDRegistry.genBlockID(nameID);
	Block.createBlock(nameID, [
		{name: slab1[0][0] + ":" + slab1[0][1] + "&" + slab2[1][0] + ":" + slab2[1][1], texture: "null", inCreative: false},
		{name: slab2[0][0] + ":" + slab2[0][1] + "&" + slab1[1][0] + ":" + slab1[1][1], texture: "null", inCreative: false}
	], STONE);
	
	let slabsModel1 = BlockRenderer.createModel();
	slabsModel1.addBox(0/16, 0/16, 0/16, 16/16, 8/16, 16/16, slab1[0][0], slab1[0][1]);
	slabsModel1.addBox(0/16, 8/16, 0/16, 16/16, 16/16, 16/16, slab2[1][0], slab2[1][1]);
	let slabsRender1 = new ICRender.Model();
	slabsRender1.addEntry(slabsModel1);
	BlockRenderer.setStaticICRender(BlockID[nameID], 0, slabsRender1);
	
	let slabsModel2 = BlockRenderer.createModel();
	slabsModel2.addBox(0/16, 0/16, 0/16, 16/16, 8/16, 16/16, slab2[0][0], slab2[0][1]);
	slabsModel2.addBox(0/16, 8/16, 0/16, 16/16, 16/16, 16/16, slab1[1][0], slab1[1][1]);
	let slabsRender2 = new ICRender.Model();
	slabsRender2.addEntry(slabsModel2);
	BlockRenderer.setStaticICRender(BlockID[nameID], 1, slabsRender2);
	
	
	Block.registerDropFunction(nameID, function(coords, id, data, diggingLevel, toolLevel){
		return [[slab1[0][0], 1, slab1[0][1]], [slab2[0][0], 1, slab2[0][1]]];
	});
	
	Callback.addCallback("ItemUse", function(coords, item, block){
		if(item.id == slab1[0][0] && item.data == slab1[0][1]){
			if(coords.side == 0 && block.id == slab2[1][0] && block.data == slab2[1][1]){
				Game.prevent();
				World.setBlock(coords.x, coords.y, coords.z, BlockID[nameID], 0);
				Player.decreaseCarriedItem(1);
			}
			else if(coords.side == 1 && block.id == slab2[0][0] && block.data == slab2[0][1]){
				Game.prevent();
				World.setBlock(coords.x, coords.y, coords.z, BlockID[nameID], 1);
				Player.decreaseCarriedItem(1);
			}
		}
		else if(item.id == slab2[0][0] && item.data == slab2[0][1]){
			if(coords.side == 0 && block.id == slab1[1][0] && block.data == slab1[1][1]){
				Game.prevent();
				World.setBlock(coords.x, coords.y, coords.z, BlockID[nameID], 1);
				Player.decreaseCarriedItem(1);
			}
			else if(coords.side == 1 && block.id == slab1[0][0] && block.data == slab1[0][1]){
				Game.prevent();
				World.setBlock(coords.x, coords.y, coords.z, BlockID[nameID], 0);
				Player.decreaseCarriedItem(1);
			}
		}
	});
}

for(i=0; i<slabs.length; i++){
	for(j=i+1; j<slabs.length; j++){
		addSlabs([slabs[i].bottom, slabs[i].up], [slabs[j].bottom, slabs[j].up]);
	}
}

ModAPI.registerAPI("DoubleSlabs", {
	addSlabs: addSlabs,
	requireGlobal: function (command) {
		return eval(command);
	}
});
