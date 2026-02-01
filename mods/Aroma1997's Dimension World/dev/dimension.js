var mineworld = new Dimension({ 
name: "mineworld", 
generation: { 
layers: [ 
{ 
range: [103, 110], 
noise: { 
octaves: { 
count: 6, 
weight: 0.8,
scale: [1, 0.2, 1]
} 
}, 
gradient: [ 
[.0,.0],[.0,0],[.0,.0],[0, -0] 
], 

terrain: { 
base: 1, 
cover:{ 
height:5, 
top:2, 
block:3 
} 
}, 
}, 

{ 
range: [4, 107], 
noise: { 
octaves: { 
count: 6, 
weight: 0.8,
scale: [1, 0.4, 1]
} 
}, 
gradient: [[-1, 0.8], [-0.6, 0.5], [-0.2, 0.2], [0.2, 0.9], [0.6, 0.7], [1, 0.1]],
terrain: { 
base: 1, 
cover:{ 
height:1, 
top:1, 
block:1 
} 
}, 
}, 

/*
{ 
range: [4, 55], 
noise: { 
octaves: { 
count: 6, 
weight: 0.8, 
scale: [0.005, 0.01, 0.02] 
} 
}, 
gradient: [[-1, 0.8], [-0.6, 0.5], [-0.2, 0.2], [0.2, 0.9], [0.6, 0.7], [1, 0.1]],
terrain: { 
base: 1, 
cover:{ 
height:1, 
top:1, 
block:1 
} 
}, 
}, 
*/
{ 
range: [0, 5], 
noise: { 
octaves: { 
count: 7, 
weight: 0.6,
scale: [1, 0.4, 1]
} 
}, 
gradient: [ 
[.0,.0],[.0,-.0],[.0,-.0],[0, -0] 
], 

terrain: { 
base: 7, 
cover:{ 
height:5, 
top:7, 
block:7
} 
}, 
}, 
],
decoration: {
biome: 1
} 
}, 

environment: { 
sky: [0, 196, 255], 
fog: [0, 196, 255] 
}, 
callbacks: { 
tick: function() { 
}, 
generateChunk: function(chunkX, chunkZ) { 
}, 
loaded: function() { 
}, 
unloaded: function() { 
} 
} 
}); 

//ПОРТАЛ 

var pes = new TransferSequence(mineworld); 
pes.setPortalTimeout(0); 

pes.setPortalOverlay(new PortalOverlayWindow({ 
frames: 32, 
rate: 20, 
fade: 1, 
texture: "mine_portal.anim" 
})); 

var suka = new PortalShape(mineworld); 
suka.setPortalId(BlockID.mineportal); 
suka.setFrameIds(BlockID.portalframe); 
suka.setMinSize(2, 3); 

pes.setPortalBuilder(suka.getBuilder()); 
pes.setLoadingScreenParams({ 
texture: "default_dimension_loading_screen" 
}); 
PortalRegistry.newPortalBlock("mineportal", ["mine_portal", 0], pes.getPortal(), {type: "u-plane", frameId: 1}, true); 
pes.setPortalTiles(BlockID.mineportal); 

var suka = new PortalShape(); 
suka.setPortalId(BlockID.mineportal); 
suka.setFrameIds(BlockID.portalframe); 
suka.setMinSize(2, 3); 

pes.setPortalBuilder(suka.getBuilder()); 

Callback.addCallback("ItemUse", function(coords, item) { 
if (item.id == ItemID.minehui) { 

var rect = suka.findPortal(coords.relative.x, coords.relative.y, coords.relative.z); 
if (rect) { 
suka.buildPortal(rect, false); 
} 
} 
}); 
Callback.addCallback("DestroyBlock", function(pos, block){ 
if (block.id == BlockID.portalframe || block.id == BlockID.mineportal) { 
DimensionHelper.eliminateIncorrectPlacedPortals(pos, BlockID.mineportal, [4]); 
} 
} 
);


function randomInt(min, max){ 
return Math.floor(Math.random() * (max - min + 1)) + min; 
};

Callback.addCallback("tick", function(coords, item){
if(Player.getDimension(mineworld)){
World.setWorldTime(8000);
World.setWeather(0);
}
});


var UniqueGen={ 
generateOre: function(id, data, chunkX, chunkZ, params){  
for (var i = 0; i < params.veinCounts; i++){ 
var coords = GenerationUtils.randomCoords(chunkX, chunkZ, params.min_y, params.max_y); 
if(Math.random() < params.veinChance)GenerationUtils.genMinable(coords.x, coords.y, coords.z, { 
id: id, 
data: data, 
size: params.size, 
ratio: params.ratio, 
checkerTile: params.checkerTile, 
checkerMode: params.checkerMode 
      }); 
   }  
}, 
generateOreInDimension: function(id, data, dimension, chunkX, chunkZ, params){ 
if(Player.getDimension() ==dimension){ 
for (var i = 0; i < params.veinCounts; i++){ 
var coords = GenerationUtils.randomCoords(chunkX, chunkZ, params.min_y, params.max_y); 
if(Math.random() < params.veinChance)GenerationUtils.genMinable(coords.x, coords.y, coords.z, { 
id: id, 
data: data, 
size: params.size, 
ratio: params.ratio, 
checkerTile: params.checkerTile, 
checkerMode: params.checkerMode 
         }); 
      } 
   } 
}
};


Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){ 
UniqueGen.generateOreInDimension(14, 0, mineworld, chunkX, chunkZ, { 
veinCounts: 4, 
veinChance: 70, 
minY: 8, 
maxY: 50,  
size: randomInt(8, 10),  
ratio: [.3, .4, .5],
checkerTile: 1, 
checkerMode: false
}); 
});

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){ 
UniqueGen.generateOreInDimension(15, 0, mineworld, chunkX, chunkZ, { 
veinCounts: 8, 
veinChance: 80, 
minY: 29, 
maxY: 105,  
size: randomInt(13, 17),  
ratio: [.8, .4, .5], 
checkerTile: 1, 
checkerMode: false
}); 
});

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){ 
UniqueGen.generateOreInDimension(16, 0, mineworld, chunkX, chunkZ, { 
veinCounts: 9, 
veinChance: 90, 
minY: 39, 
maxY: 106,  
size: randomInt(19, 26),  
ratio: [.7, .3, .8],
checkerTile: 1, 
checkerMode: false
}); 
});

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){ 
UniqueGen.generateOreInDimension(21, 0, mineworld, chunkX, chunkZ, { 
veinCounts: 5, 
veinChance: 70, 
minY: 3, 
maxY: 46,  
size: randomInt(6, 8),  
ratio: .5, 
checkerTile: 1, 
checkerMode: false
}); 
});

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){ 
UniqueGen.generateOreInDimension(73, 0, mineworld, chunkX, chunkZ, { 
veinCounts: 6, 
veinChance: 80, 
minY: 3, 
maxY: 46,  
size: randomInt(6, 8),  
ratio: .5, 
checkerTile: 1, 
checkerMode: false
}); 
});

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){ 
UniqueGen.generateOreInDimension(56, 0, mineworld, chunkX, chunkZ, { 
veinCounts: 4, 
veinChance: 90, 
minY: 3, 
maxY: 19,  
size: randomInt(5, 7),  
ratio: .5, 
checkerTile: 1, 
checkerMode: false
}); 
});

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){ 
UniqueGen.generateOreInDimension(129, 0, mineworld, chunkX, chunkZ, { 
veinCounts: 2, 
veinChance: 50, 
minY: 2, 
maxY: 69,  
size: randomInt(3, 6),  
ratio: [.5, 0.1, 0.6],
checkerTile: 1, 
checkerMode: false
}); 
});

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){ 
UniqueGen.generateOreInDimension(BlockID.clayore, 0, mineworld, chunkX, chunkZ, { 
veinCounts: 5, 
veinChance: 85, 
minY: 40, 
maxY: 90,  
size: randomInt(5, 8),  
ratio: [.5, .2, .4],
checkerTile: 1, 
checkerMode: false
}); 
});

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){ 
UniqueGen.generateOreInDimension(BlockID.stickyore, 0, mineworld, chunkX, chunkZ, { 
veinCounts: 6, 
veinChance: 70, 
minY: 30, 
maxY: 87,  
size: randomInt(4, 8),  
ratio: [.5, .2, .4],
checkerTile: 1, 
checkerMode: false
}); 
});
