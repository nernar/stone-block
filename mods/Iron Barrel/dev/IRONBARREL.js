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










