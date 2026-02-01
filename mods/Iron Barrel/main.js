/*
BUILD INFO:
  dir: dev
  target: main.js
  files: 7
*/



// file: IRONBARREL.js

IMPORT("StorageInterface");

IDRegistry.genBlockID("ironbarrel");
Block.createBlockWithRotation("ironbarrel",[{name:"Iron Barrel",texture:[["iron_barrel_bottom",0],["iron_barrel_top",0],["iron_barrel_side",0],["iron_barrel_side",0],["iron_barrel_side",0],["iron_barrel_side",0]],inCreative:true}]);
ToolAPI.registerBlockMaterial(BlockID.ironbarrel, "stone", 3, true);

var ironbarrelUI=new UI.StandartWindow({standart:{header:{text:{text:"Iron Barrel"}},inventory:{standart:!0},background:{standart:!0}},drawing:[],elements:{
slot1:{type:"slot",x:320,y:40,size:50},
slot2:{type:"slot",x:370,y:40,size:50},
slot3:{type:"slot",x:420,y:40,size:50},
slot4:{type:"slot",x:470,y:40,size:50},
slot5:{type:"slot",x:520,y:40,size:50},
slot6:{type:"slot",x:570,y:40,size:50},
slot7:{type:"slot",x:620,y:40,size:50},
slot8:{type:"slot",x:670,y:40,size:50},
slot9:{type:"slot",x:720,y:40,size:50},

slot10:{type:"slot",x:320,y:90,size:50},
slot11:{type:"slot",x:370,y:90,size:50},
slot12:{type:"slot",x:420,y:90,size:50},
slot13:{type:"slot",x:470,y:90,size:50},
slot14:{type:"slot",x:520,y:90,size:50},
slot15:{type:"slot",x:570,y:90,size:50},
slot16:{type:"slot",x:620,y:90,size:50},
slot17:{type:"slot",x:670,y:90,size:50},
slot18:{type:"slot",x:720,y:90,size:50},

slot19:{type:"slot",x:320,y:140,size:50},
slot20:{type:"slot",x:370,y:140,size:50},
slot21:{type:"slot",x:420,y:140,size:50},
slot22:{type:"slot",x:470,y:140,size:50},
slot23:{type:"slot",x:520,y:140,size:50},
slot24:{type:"slot",x:570,y:140,size:50},
slot25:{type:"slot",x:620,y:140,size:50},
slot26:{type:"slot",x:670,y:140,size:50},
slot27:{type:"slot",x:720,y:140,size:50},

slot28:{type:"slot",x:320,y:190,size:50},
slot29:{type:"slot",x:370,y:190,size:50},
slot30:{type:"slot",x:420,y:190,size:50},
slot31:{type:"slot",x:470,y:190,size:50},
slot32:{type:"slot",x:520,y:190,size:50},
slot33:{type:"slot",x:570,y:190,size:50},
slot34:{type:"slot",x:620,y:190,size:50},
slot35:{type:"slot",x:670,y:190,size:50},
slot36:{type:"slot",x:720,y:190,size:50},

slot37:{type:"slot",x:320,y:240,size:50},
slot38:{type:"slot",x:370,y:240,size:50},
slot39:{type:"slot",x:420,y:240,size:50},
slot40:{type:"slot",x:470,y:240,size:50},
slot41:{type:"slot",x:520,y:240,size:50},
slot42:{type:"slot",x:570,y:240,size:50},
slot43:{type:"slot",x:620,y:240,size:50},
slot44:{type:"slot",x:670,y:240,size:50},
slot45:{type:"slot",x:720,y:240,size:50},

slot46:{type:"slot",x:320,y:290,size:50},
slot47:{type:"slot",x:370,y:290,size:50},
slot48:{type:"slot",x:420,y:290,size:50},
slot49:{type:"slot",x:470,y:290,size:50},
slot50:{type:"slot",x:520,y:290,size:50},
slot51:{type:"slot",x:570,y:290,size:50},
slot52:{type:"slot",x:620,y:290,size:50},
slot53:{type:"slot",x:670,y:290,size:50},
slot54:{type:"slot",x:720,y:290,size:50}}});
TileEntity.registerPrototype(BlockID.ironbarrel,{getGuiScreen:function(){return ironbarrelUI}, tick: function(){StorageInterface.checkHoppers(this)}});














// file: GOLDBARREL.js

IDRegistry.genBlockID("goldbarrel");
Block.createBlockWithRotation("goldbarrel",[{name:"Gold Barrel",texture:[["gold_barrel_bottom",0],["gold_barrel_top",0],["gold_barrel_side",0],["gold_barrel_side",0],["gold_barrel_side",0],["gold_barrel_side",0]],inCreative:true}]);
ToolAPI.registerBlockMaterial(BlockID.goldbarrel, "stone", 3, true);

var goldbarrelUI=new UI.StandartWindow({standart:{header:{text:{text:"Gold Barrel"}},inventory:{standart:!0},background:{standart:!0}},drawing:[],elements:{
slot1:{type:"slot",x:320,y:40,size:50},
slot2:{type:"slot",x:370,y:40,size:50},
slot3:{type:"slot",x:420,y:40,size:50},
slot4:{type:"slot",x:470,y:40,size:50},
slot5:{type:"slot",x:520,y:40,size:50},
slot6:{type:"slot",x:570,y:40,size:50},
slot7:{type:"slot",x:620,y:40,size:50},
slot8:{type:"slot",x:670,y:40,size:50},
slot9:{type:"slot",x:720,y:40,size:50},
slot10:{type:"slot",x:770,y:40,size:50},
slot11:{type:"slot",x:820,y:40,size:50},
slot12:{type:"slot",x:870,y:40,size:50},

slot13:{type:"slot",x:320,y:90,size:50},
slot14:{type:"slot",x:370,y:90,size:50},
slot15:{type:"slot",x:420,y:90,size:50},
slot16:{type:"slot",x:470,y:90,size:50},
slot17:{type:"slot",x:520,y:90,size:50},
slot18:{type:"slot",x:570,y:90,size:50},
slot19:{type:"slot",x:620,y:90,size:50},
slot20:{type:"slot",x:670,y:90,size:50},
slot21:{type:"slot",x:720,y:90,size:50},
slot22:{type:"slot",x:770,y:90,size:50},
slot23:{type:"slot",x:820,y:90,size:50},
slot24:{type:"slot",x:870,y:90,size:50},

slot25:{type:"slot",x:320,y:140,size:50},
slot26:{type:"slot",x:370,y:140,size:50},
slot27:{type:"slot",x:420,y:140,size:50},
slot28:{type:"slot",x:470,y:140,size:50},
slot29:{type:"slot",x:520,y:140,size:50},
slot30:{type:"slot",x:570,y:140,size:50},
slot31:{type:"slot",x:620,y:140,size:50},
slot32:{type:"slot",x:670,y:140,size:50},
slot33:{type:"slot",x:720,y:140,size:50},
slot34:{type:"slot",x:770,y:140,size:50},
slot35:{type:"slot",x:820,y:140,size:50},
slot36:{type:"slot",x:870,y:140,size:50},

slot37:{type:"slot",x:320,y:190,size:50},
slot38:{type:"slot",x:370,y:190,size:50},
slot39:{type:"slot",x:420,y:190,size:50},
slot40:{type:"slot",x:470,y:190,size:50},
slot41:{type:"slot",x:520,y:190,size:50},
slot42:{type:"slot",x:570,y:190,size:50},
slot43:{type:"slot",x:620,y:190,size:50},
slot44:{type:"slot",x:670,y:190,size:50},
slot45:{type:"slot",x:720,y:190,size:50},
slot46:{type:"slot",x:770,y:190,size:50},
slot47:{type:"slot",x:820,y:190,size:50},
slot48:{type:"slot",x:870,y:190,size:50},

slot49:{type:"slot",x:320,y:240,size:50},
slot50:{type:"slot",x:370,y:240,size:50},
slot51:{type:"slot",x:420,y:240,size:50},
slot52:{type:"slot",x:470,y:240,size:50},
slot53:{type:"slot",x:520,y:240,size:50},
slot54:{type:"slot",x:570,y:240,size:50},
slot55:{type:"slot",x:620,y:240,size:50},
slot56:{type:"slot",x:670,y:240,size:50},
slot57:{type:"slot",x:720,y:240,size:50},
slot58:{type:"slot",x:770,y:240,size:50},
slot59:{type:"slot",x:820,y:240,size:50},
slot60:{type:"slot",x:870,y:240,size:50},

slot61:{type:"slot",x:320,y:290,size:50},
slot62:{type:"slot",x:370,y:290,size:50},
slot63:{type:"slot",x:420,y:290,size:50},
slot64:{type:"slot",x:470,y:290,size:50},
slot65:{type:"slot",x:520,y:290,size:50},
slot66:{type:"slot",x:570,y:290,size:50},
slot67:{type:"slot",x:620,y:290,size:50},
slot68:{type:"slot",x:670,y:290,size:50},
slot69:{type:"slot",x:720,y:290,size:50},
slot70:{type:"slot",x:770,y:290,size:50},
slot71:{type:"slot",x:820,y:290,size:50},
slot72:{type:"slot",x:870,y:290,size:50},

slot73:{type:"slot",x:320,y:340,size:50},
slot74:{type:"slot",x:370,y:340,size:50},
slot75:{type:"slot",x:420,y:340,size:50},
slot76:{type:"slot",x:470,y:340,size:50},
slot77:{type:"slot",x:520,y:340,size:50},
slot78:{type:"slot",x:570,y:340,size:50},
slot79:{type:"slot",x:620,y:340,size:50},
slot80:{type:"slot",x:670,y:340,size:50},
slot81:{type:"slot",x:720,y:340,size:50}}});

TileEntity.registerPrototype(BlockID.goldbarrel,{getGuiScreen:function(){return goldbarrelUI}});




// file: DIAMONDBARREL.js

IDRegistry.genBlockID("diamondbarrel");
Block.createBlockWithRotation("diamondbarrel",[{name:"Diamond Barrel",texture:[["diamond_barrel_bottom",0],["diamond_barrel_top",0],["diamond_barrel_side",0],["diamond_barrel_side",0],["diamond_barrel_side",0],["diamond_barrel_side",0]],inCreative:true}]);
ToolAPI.registerBlockMaterial(BlockID.diamondbarrel, "stone", 3, true);

var diamondbarrelUI=new UI.StandartWindow({standart:{header:{text:{text:"Diamond Barrel"}},inventory:{standart:!0},background:{standart:!0}},drawing:[],elements:{
slot1:{type:"slot",x:320,y:40,size:40},
slot2:{type:"slot",x:360,y:40,size:40},
slot3:{type:"slot",x:400,y:40,size:40},
slot4:{type:"slot",x:440,y:40,size:40},
slot5:{type:"slot",x:480,y:40,size:40},
slot6:{type:"slot",x:520,y:40,size:40},
slot7:{type:"slot",x:560,y:40,size:40},
slot8:{type:"slot",x:600,y:40,size:40},
slot9:{type:"slot",x:640,y:40,size:40},
slot10:{type:"slot",x:680,y:40,size:40},
slot11:{type:"slot",x:720,y:40,size:40},
slot12:{type:"slot",x:760,y:40,size:40},
slot13:{type:"slot",x:800,y:40,size:40},
slot14:{type:"slot",x:840,y:40,size:40},
slot15:{type:"slot",x:880,y:40,size:40},
slot16:{type:"slot",x:640,y:280,size:40},

slot17:{type:"slot",x:320,y:80,size:40},
slot18:{type:"slot",x:360,y:80,size:40},
slot19:{type:"slot",x:400,y:80,size:40},
slot20:{type:"slot",x:440,y:80,size:40},
slot21:{type:"slot",x:480,y:80,size:40},
slot22:{type:"slot",x:520,y:80,size:40},
slot23:{type:"slot",x:560,y:80,size:40},
slot24:{type:"slot",x:600,y:80,size:40},
slot25:{type:"slot",x:640,y:80,size:40},
slot26:{type:"slot",x:680,y:80,size:40},
slot27:{type:"slot",x:720,y:80,size:40},
slot28:{type:"slot",x:760,y:80,size:40},
slot29:{type:"slot",x:800,y:80,size:40},
slot30:{type:"slot",x:840,y:80,size:40},
slot31:{type:"slot",x:880,y:80,size:40},
slot32:{type:"slot",x:680,y:280,size:40},

slot33:{type:"slot",x:320,y:120,size:40},
slot34:{type:"slot",x:360,y:120,size:40},
slot35:{type:"slot",x:400,y:120,size:40},
slot36:{type:"slot",x:440,y:120,size:40},
slot37:{type:"slot",x:480,y:120,size:40},
slot38:{type:"slot",x:520,y:120,size:40},
slot39:{type:"slot",x:560,y:120,size:40},
slot40:{type:"slot",x:600,y:120,size:40},
slot41:{type:"slot",x:640,y:120,size:40},
slot42:{type:"slot",x:680,y:120,size:40},
slot43:{type:"slot",x:720,y:120,size:40},
slot44:{type:"slot",x:760,y:120,size:40},
slot45:{type:"slot",x:800,y:120,size:40},
slot46:{type:"slot",x:840,y:120,size:40},
slot47:{type:"slot",x:880,y:120,size:40},
slot48:{type:"slot",x:720,y:280,size:40},

slot49:{type:"slot",x:320,y:160,size:40},
slot50:{type:"slot",x:360,y:160,size:40},
slot51:{type:"slot",x:400,y:160,size:40},
slot52:{type:"slot",x:440,y:160,size:40},
slot53:{type:"slot",x:480,y:160,size:40},
slot54:{type:"slot",x:520,y:160,size:40},
slot55:{type:"slot",x:560,y:160,size:40},
slot56:{type:"slot",x:600,y:160,size:40},
slot57:{type:"slot",x:640,y:160,size:40},
slot58:{type:"slot",x:680,y:160,size:40},
slot59:{type:"slot",x:720,y:160,size:40},
slot60:{type:"slot",x:760,y:160,size:40},
slot61:{type:"slot",x:800,y:160,size:40},
slot62:{type:"slot",x:840,y:160,size:40},
slot63:{type:"slot",x:880,y:160,size:40},
slot64:{type:"slot",x:760,y:280,size:40},

slot65:{type:"slot",x:320,y:200,size:40},
slot66:{type:"slot",x:360,y:200,size:40},
slot67:{type:"slot",x:400,y:200,size:40},
slot68:{type:"slot",x:440,y:200,size:40},
slot69:{type:"slot",x:480,y:200,size:40},
slot70:{type:"slot",x:520,y:200,size:40},
slot71:{type:"slot",x:560,y:200,size:40},
slot72:{type:"slot",x:600,y:200,size:40},
slot73:{type:"slot",x:640,y:200,size:40},
slot74:{type:"slot",x:680,y:200,size:40},
slot75:{type:"slot",x:720,y:200,size:40},
slot76:{type:"slot",x:760,y:200,size:40},
slot77:{type:"slot",x:800,y:200,size:40},
slot78:{type:"slot",x:840,y:200,size:40},
slot79:{type:"slot",x:880,y:200,size:40},
slot80:{type:"slot",x:800,y:280,size:40},

slot81:{type:"slot",x:320,y:240,size:40},
slot82:{type:"slot",x:360,y:240,size:40},
slot83:{type:"slot",x:400,y:240,size:40},
slot84:{type:"slot",x:440,y:240,size:40},
slot85:{type:"slot",x:480,y:240,size:40},
slot86:{type:"slot",x:520,y:240,size:40},
slot87:{type:"slot",x:560,y:240,size:40},
slot88:{type:"slot",x:600,y:240,size:40},
slot89:{type:"slot",x:640,y:240,size:40},
slot90:{type:"slot",x:680,y:240,size:40},
slot91:{type:"slot",x:720,y:240,size:40},
slot92:{type:"slot",x:760,y:240,size:40},
slot93:{type:"slot",x:800,y:240,size:40},
slot94:{type:"slot",x:840,y:240,size:40},
slot95:{type:"slot",x:880,y:240,size:40},
slot96:{type:"slot",x:840,y:280,size:40},

slot97:{type:"slot",x:320,y:280,size:40},
slot98:{type:"slot",x:360,y:280,size:40},
slot99:{type:"slot",x:400,y:280,size:40},
slot100:{type:"slot",x:440,y:280,size:40},
slot101:{type:"slot",x:480,y:280,size:40},
slot102:{type:"slot",x:520,y:280,size:40},
slot103:{type:"slot",x:560,y:280,size:40},
slot104:{type:"slot",x:600,y:280,size:40}}});
TileEntity.registerPrototype(BlockID.diamondbarrel,{getGuiScreen:function(){return diamondbarrelUI}});




// file: OBSIDIANBARREL.js

var BLOCK_TYPE_OBSIDIAN = Block.createSpecialType({
     explosionres: 100,
     destroytime: 2
});

IDRegistry.genBlockID("obsidianbarrel");
Block.createBlockWithRotation("obsidianbarrel",[{name:"Obsidian Barrel",texture:[["obsidian_barrel_bottom",0],["obsidian_barrel_top",0],["obsidian_barrel_side",0],["obsidian_barrel_side",0],["obsidian_barrel_side",0],["obsidian_barrel_side",0]],inCreative:true}], BLOCK_TYPE_OBSIDIAN);
ToolAPI.registerBlockMaterial(BlockID.obsidianbarrel, "stone", 3, true);

var obsidianbarrelUI=new UI.StandartWindow({standart:{header:{text:{text:"Obsidian Barrel"}},inventory:{standart:!0},background:{standart:!0}},drawing:[],elements:{
slot1:{type:"slot",x:320,y:40,size:40},
slot2:{type:"slot",x:360,y:40,size:40},
slot3:{type:"slot",x:400,y:40,size:40},
slot4:{type:"slot",x:440,y:40,size:40},
slot5:{type:"slot",x:480,y:40,size:40},
slot6:{type:"slot",x:520,y:40,size:40},
slot7:{type:"slot",x:560,y:40,size:40},
slot8:{type:"slot",x:600,y:40,size:40},
slot9:{type:"slot",x:640,y:40,size:40},
slot10:{type:"slot",x:680,y:40,size:40},
slot11:{type:"slot",x:720,y:40,size:40},
slot12:{type:"slot",x:760,y:40,size:40},
slot13:{type:"slot",x:800,y:40,size:40},
slot14:{type:"slot",x:840,y:40,size:40},
slot15:{type:"slot",x:880,y:40,size:40},
slot16:{type:"slot",x:640,y:280,size:40},

slot17:{type:"slot",x:320,y:80,size:40},
slot18:{type:"slot",x:360,y:80,size:40},
slot19:{type:"slot",x:400,y:80,size:40},
slot20:{type:"slot",x:440,y:80,size:40},
slot21:{type:"slot",x:480,y:80,size:40},
slot22:{type:"slot",x:520,y:80,size:40},
slot23:{type:"slot",x:560,y:80,size:40},
slot24:{type:"slot",x:600,y:80,size:40},
slot25:{type:"slot",x:640,y:80,size:40},
slot26:{type:"slot",x:680,y:80,size:40},
slot27:{type:"slot",x:720,y:80,size:40},
slot28:{type:"slot",x:760,y:80,size:40},
slot29:{type:"slot",x:800,y:80,size:40},
slot30:{type:"slot",x:840,y:80,size:40},
slot31:{type:"slot",x:880,y:80,size:40},
slot32:{type:"slot",x:680,y:280,size:40},

slot33:{type:"slot",x:320,y:120,size:40},
slot34:{type:"slot",x:360,y:120,size:40},
slot35:{type:"slot",x:400,y:120,size:40},
slot36:{type:"slot",x:440,y:120,size:40},
slot37:{type:"slot",x:480,y:120,size:40},
slot38:{type:"slot",x:520,y:120,size:40},
slot39:{type:"slot",x:560,y:120,size:40},
slot40:{type:"slot",x:600,y:120,size:40},
slot41:{type:"slot",x:640,y:120,size:40},
slot42:{type:"slot",x:680,y:120,size:40},
slot43:{type:"slot",x:720,y:120,size:40},
slot44:{type:"slot",x:760,y:120,size:40},
slot45:{type:"slot",x:800,y:120,size:40},
slot46:{type:"slot",x:840,y:120,size:40},
slot47:{type:"slot",x:880,y:120,size:40},
slot48:{type:"slot",x:720,y:280,size:40},

slot49:{type:"slot",x:320,y:160,size:40},
slot50:{type:"slot",x:360,y:160,size:40},
slot51:{type:"slot",x:400,y:160,size:40},
slot52:{type:"slot",x:440,y:160,size:40},
slot53:{type:"slot",x:480,y:160,size:40},
slot54:{type:"slot",x:520,y:160,size:40},
slot55:{type:"slot",x:560,y:160,size:40},
slot56:{type:"slot",x:600,y:160,size:40},
slot57:{type:"slot",x:640,y:160,size:40},
slot58:{type:"slot",x:680,y:160,size:40},
slot59:{type:"slot",x:720,y:160,size:40},
slot60:{type:"slot",x:760,y:160,size:40},
slot61:{type:"slot",x:800,y:160,size:40},
slot62:{type:"slot",x:840,y:160,size:40},
slot63:{type:"slot",x:880,y:160,size:40},
slot64:{type:"slot",x:760,y:280,size:40},

slot65:{type:"slot",x:320,y:200,size:40},
slot66:{type:"slot",x:360,y:200,size:40},
slot67:{type:"slot",x:400,y:200,size:40},
slot68:{type:"slot",x:440,y:200,size:40},
slot69:{type:"slot",x:480,y:200,size:40},
slot70:{type:"slot",x:520,y:200,size:40},
slot71:{type:"slot",x:560,y:200,size:40},
slot72:{type:"slot",x:600,y:200,size:40},
slot73:{type:"slot",x:640,y:200,size:40},
slot74:{type:"slot",x:680,y:200,size:40},
slot75:{type:"slot",x:720,y:200,size:40},
slot76:{type:"slot",x:760,y:200,size:40},
slot77:{type:"slot",x:800,y:200,size:40},
slot78:{type:"slot",x:840,y:200,size:40},
slot79:{type:"slot",x:880,y:200,size:40},
slot80:{type:"slot",x:800,y:280,size:40},

slot81:{type:"slot",x:320,y:240,size:40},
slot82:{type:"slot",x:360,y:240,size:40},
slot83:{type:"slot",x:400,y:240,size:40},
slot84:{type:"slot",x:440,y:240,size:40},
slot85:{type:"slot",x:480,y:240,size:40},
slot86:{type:"slot",x:520,y:240,size:40},
slot87:{type:"slot",x:560,y:240,size:40},
slot88:{type:"slot",x:600,y:240,size:40},
slot89:{type:"slot",x:640,y:240,size:40},
slot90:{type:"slot",x:680,y:240,size:40},
slot91:{type:"slot",x:720,y:240,size:40},
slot92:{type:"slot",x:760,y:240,size:40},
slot93:{type:"slot",x:800,y:240,size:40},
slot94:{type:"slot",x:840,y:240,size:40},
slot95:{type:"slot",x:880,y:240,size:40},
slot96:{type:"slot",x:840,y:280,size:40},

slot97:{type:"slot",x:320,y:280,size:40},
slot98:{type:"slot",x:360,y:280,size:40},
slot99:{type:"slot",x:400,y:280,size:40},
slot100:{type:"slot",x:440,y:280,size:40},
slot101:{type:"slot",x:480,y:280,size:40},
slot102:{type:"slot",x:520,y:280,size:40},
slot103:{type:"slot",x:560,y:280,size:40},
slot104:{type:"slot",x:600,y:280,size:40}}});
TileEntity.registerPrototype(BlockID.obsidianbarrel,{getGuiScreen:function(){return obsidianbarrelUI}});




// file: CRYSTALBARREL.js

IDRegistry.genBlockID("crystalbarrel");
Block.createBlockWithRotation("crystalbarrel",[{name:"Crystal Barrel",texture:[["crystal_barrel_bottom",0],["crystal_barrel_top",0],["crystal_barrel_side",0],["crystal_barrel_side",0],["crystal_barrel_side",0],["crystal_barrel_side",0]],inCreative:true}]);
ToolAPI.registerBlockMaterial(BlockID.crystalbarrel, "stone", 3, true);

var crystalbarrelUI=new UI.StandartWindow({standart:{header:{text:{text:"Crystal Barrel"}},inventory:{standart:!0},background:{standart:!0}},drawing:[],elements:{
slot1:{type:"slot",x:320,y:40,size:40},
slot2:{type:"slot",x:360,y:40,size:40},
slot3:{type:"slot",x:400,y:40,size:40},
slot4:{type:"slot",x:440,y:40,size:40},
slot5:{type:"slot",x:480,y:40,size:40},
slot6:{type:"slot",x:520,y:40,size:40},
slot7:{type:"slot",x:560,y:40,size:40},
slot8:{type:"slot",x:600,y:40,size:40},
slot9:{type:"slot",x:640,y:40,size:40},
slot10:{type:"slot",x:680,y:40,size:40},
slot11:{type:"slot",x:720,y:40,size:40},
slot12:{type:"slot",x:760,y:40,size:40},
slot13:{type:"slot",x:800,y:40,size:40},
slot14:{type:"slot",x:840,y:40,size:40},
slot15:{type:"slot",x:880,y:40,size:40},
slot16:{type:"slot",x:640,y:280,size:40},

slot17:{type:"slot",x:320,y:80,size:40},
slot18:{type:"slot",x:360,y:80,size:40},
slot19:{type:"slot",x:400,y:80,size:40},
slot20:{type:"slot",x:440,y:80,size:40},
slot21:{type:"slot",x:480,y:80,size:40},
slot22:{type:"slot",x:520,y:80,size:40},
slot23:{type:"slot",x:560,y:80,size:40},
slot24:{type:"slot",x:600,y:80,size:40},
slot25:{type:"slot",x:640,y:80,size:40},
slot26:{type:"slot",x:680,y:80,size:40},
slot27:{type:"slot",x:720,y:80,size:40},
slot28:{type:"slot",x:760,y:80,size:40},
slot29:{type:"slot",x:800,y:80,size:40},
slot30:{type:"slot",x:840,y:80,size:40},
slot31:{type:"slot",x:880,y:80,size:40},
slot32:{type:"slot",x:680,y:280,size:40},

slot33:{type:"slot",x:320,y:120,size:40},
slot34:{type:"slot",x:360,y:120,size:40},
slot35:{type:"slot",x:400,y:120,size:40},
slot36:{type:"slot",x:440,y:120,size:40},
slot37:{type:"slot",x:480,y:120,size:40},
slot38:{type:"slot",x:520,y:120,size:40},
slot39:{type:"slot",x:560,y:120,size:40},
slot40:{type:"slot",x:600,y:120,size:40},
slot41:{type:"slot",x:640,y:120,size:40},
slot42:{type:"slot",x:680,y:120,size:40},
slot43:{type:"slot",x:720,y:120,size:40},
slot44:{type:"slot",x:760,y:120,size:40},
slot45:{type:"slot",x:800,y:120,size:40},
slot46:{type:"slot",x:840,y:120,size:40},
slot47:{type:"slot",x:880,y:120,size:40},
slot48:{type:"slot",x:720,y:280,size:40},

slot49:{type:"slot",x:320,y:160,size:40},
slot50:{type:"slot",x:360,y:160,size:40},
slot51:{type:"slot",x:400,y:160,size:40},
slot52:{type:"slot",x:440,y:160,size:40},
slot53:{type:"slot",x:480,y:160,size:40},
slot54:{type:"slot",x:520,y:160,size:40},
slot55:{type:"slot",x:560,y:160,size:40},
slot56:{type:"slot",x:600,y:160,size:40},
slot57:{type:"slot",x:640,y:160,size:40},
slot58:{type:"slot",x:680,y:160,size:40},
slot59:{type:"slot",x:720,y:160,size:40},
slot60:{type:"slot",x:760,y:160,size:40},
slot61:{type:"slot",x:800,y:160,size:40},
slot62:{type:"slot",x:840,y:160,size:40},
slot63:{type:"slot",x:880,y:160,size:40},
slot64:{type:"slot",x:760,y:280,size:40},

slot65:{type:"slot",x:320,y:200,size:40},
slot66:{type:"slot",x:360,y:200,size:40},
slot67:{type:"slot",x:400,y:200,size:40},
slot68:{type:"slot",x:440,y:200,size:40},
slot69:{type:"slot",x:480,y:200,size:40},
slot70:{type:"slot",x:520,y:200,size:40},
slot71:{type:"slot",x:560,y:200,size:40},
slot72:{type:"slot",x:600,y:200,size:40},
slot73:{type:"slot",x:640,y:200,size:40},
slot74:{type:"slot",x:680,y:200,size:40},
slot75:{type:"slot",x:720,y:200,size:40},
slot76:{type:"slot",x:760,y:200,size:40},
slot77:{type:"slot",x:800,y:200,size:40},
slot78:{type:"slot",x:840,y:200,size:40},
slot79:{type:"slot",x:880,y:200,size:40},
slot80:{type:"slot",x:800,y:280,size:40},

slot81:{type:"slot",x:320,y:240,size:40},
slot82:{type:"slot",x:360,y:240,size:40},
slot83:{type:"slot",x:400,y:240,size:40},
slot84:{type:"slot",x:440,y:240,size:40},
slot85:{type:"slot",x:480,y:240,size:40},
slot86:{type:"slot",x:520,y:240,size:40},
slot87:{type:"slot",x:560,y:240,size:40},
slot88:{type:"slot",x:600,y:240,size:40},
slot89:{type:"slot",x:640,y:240,size:40},
slot90:{type:"slot",x:680,y:240,size:40},
slot91:{type:"slot",x:720,y:240,size:40},
slot92:{type:"slot",x:760,y:240,size:40},
slot93:{type:"slot",x:800,y:240,size:40},
slot94:{type:"slot",x:840,y:240,size:40},
slot95:{type:"slot",x:880,y:240,size:40},
slot96:{type:"slot",x:840,y:280,size:40},

slot97:{type:"slot",x:320,y:280,size:40},
slot98:{type:"slot",x:360,y:280,size:40},
slot99:{type:"slot",x:400,y:280,size:40},
slot100:{type:"slot",x:440,y:280,size:40},
slot101:{type:"slot",x:480,y:280,size:40},
slot102:{type:"slot",x:520,y:280,size:40},
slot103:{type:"slot",x:560,y:280,size:40},
slot104:{type:"slot",x:600,y:280,size:40}}});
TileEntity.registerPrototype(BlockID.crystalbarrel,{getGuiScreen:function(){return crystalbarrelUI}});




// file: RECIPES.js

Recipes.addShaped({id: BlockID.ironbarrel, count: 1, data: 0}, [" x ", "xax", " x "], ['a', VanillaBlockID.barrel, 0, 'x', 265, 0])
Recipes.addShaped({id: BlockID.goldbarrel, count: 1, data: 0}, [" x ", "xax", " x "], ['a', BlockID.ironbarrel, 0, 'x', 266, 0])
Recipes.addShaped({id: BlockID.diamondbarrel, count: 1, data: 0}, ["ax "], ['a', BlockID.goldbarrel, 0, 'x', 264, 0])
Recipes.addShaped({id: BlockID.obsidianbarrel, count: 1, data: 0}, [" x ", "xax", " x "], ['a', BlockID.diamondbarrel, 0, 'x', 49, 0])
Recipes.addShaped({id: BlockID.crystalbarrel, count: 1, data: 0}, [" x ", "xax", " x "], ['a', BlockID.diamondbarrel, 0, 'x', 20, 0])




// file: TRANSLATION.js

Translation.addTranslation("Wood Barrel", {ru: "Деревянная Бочка"});
Translation.addTranslation("Iron Barrel", {ru: "Железная Бочка"});
Translation.addTranslation("Gold Barrel", {ru: "Золотая Бочка"});
Translation.addTranslation("Diamond Barrel", {ru: "Алмазная Бочка"});
Translation.addTranslation("Obsidian Barrel", {ru: "Обсидиановая Бочка"});
Translation.addTranslation("Crystal Barrel", {ru: "Кристальная Бочка"});




