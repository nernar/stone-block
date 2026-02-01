var CUSTOM_DIR = __dir__+"/emc/custom.json";

Callback.addCallback("PostLoaded", function(){
	if(FileTools.isExists(__dir__+"/custom.json") && !FileTools.isExists(CUSTOM_DIR)){
		var temp = FileTools.ReadJSON(__dir__+"/custom.json");
		FileTools.WriteJSON(CUSTOM_DIR, temp, true);
	};
	if(FileTools.isExists(CUSTOM_DIR)){
		var arr = FileTools.ReadJSON(CUSTOM_DIR);
		arr.map(function(i){
			System.setValue(eval(i.id), i.data, i.emc);
		});
	}else{
		FileTools.WriteJSON(CUSTOM_DIR, [], true);
	};
});

Callback.addCallback("LevelLoaded", function(){
	if(FileTools.isExists(CUSTOM_DIR)){
		var arr = FileTools.ReadJSON(CUSTOM_DIR);
		arr.map(function(i){
			System.setValue(eval(i.id), i.data, i.emc);
		});
	}else{
		FileTools.WriteJSON(CUSTOM_DIR, [], true);
	};
});


var command={
  set: function(id, data, emc){
      var arr = FileTools.ReadJSON(CUSTOM_DIR);
      var success = false;
      if(isNaN(Number(id))==isNaN(Number(data))==isNaN(Number(emc))==false){
        System.setValue(id, data, Number(emc));
        if(2048 <= id < 8192){
          for(i in ItemID){
            if(ItemID[i] == id){
              id = "ItemID."+i;
              break;
            }
          }
        };
        if(id >= 8192){
          for(i in BlockID){
            if(BlockID[i] == id){
              id = "BlockID."+i;
              break;
            }
          }
        };
        arr.map(function(i1, i2){
          if(success == false && i1.id == id && i1.data == data){
            arr[i2].emc = Number(emc);
            success = true;
          };
        });
        if(success == false){
          arr.push({id: id, data: Number(data), emc: Number(emc)});
        };
        FileTools.WriteJSON(CUSTOM_DIR, arr, true);
        Game.message(Translation.translate("Succesfully setted value for ")+Item.getName(Number(id), Number(data)));
      } else Game.message(Translation.translate("Please enter the correct number"));
  },
};

Callback.addCallback("NativeCommand", function(str){
  var arr = FileTools.ReadJSON(CUSTOM_DIR);
  var need_help = true;
  cmd = str.split(" ");
  
  if(cmd[0] == "/projecte"){
    if(cmd[1] == "set"){
      need_help = false;
      command.set(cmd[2], cmd[3], cmd[4]);
    };
    
    if(cmd[1] == "sethand"){
      need_help = false;
      let item = Player.getCarriedItem();
      command.set(item.id, item.data, cmd[2]);
    };
    
    if(cmd[1] == "reload"){
      need_help = false;
      var arr = FileTools.ReadJSON(CUSTOM_DIR);
      arr.map(function(i){System.setValue(eval(i.id), i.data, i.emc)});
      DefineEmcFromRecipe();
      Game.message(Translation.translate("Custom values was updated"));
    };
    
    if(cmd[1] == "clear"){
      need_help = false;
      FileTools.WriteJSON(CUSTOM_DIR, [], true);
      Game.message(Translation.translate("Succesfully cleared all custom EMC value"));
    };
    
    if(cmd[1] == "getui"){
      need_help = false;
      if(EMCUIa.enabled){
        Game.message("x: §3"+EMCUIa.X+"\n§ry: §3"+EMCUIa.Y+"\n§rsize: §3"+EMCUIa.size);
      } else Game.message(Translation.translate("Please make sure you opened showing EMC."));
    };
    
    if(cmd[1] == "setui"){
      need_help = false;
      if(EMCUIa.enabled){
        if(isNaN(Number(cmd[2]))==isNaN(Number(cmd[3]))==isNaN(Number(cmd[4]))==false){
          if(0 <= Number(cmd[2]) <= 1000 && 0 <= Number(cmd[3]) <= 1000 && 0 < Number(cmd[4]) <=300){
            EMCUIa.X = Number(cmd[2]);    __config__.set("显示EMC.X", Number(cmd[2]));
            EMCUIa.Y = Number(cmd[3]);    __config__.set("显示EMC.Y", Number(cmd[3]));
            EMCUIa.size = Number(cmd[4]);    __config__.set("显示EMC.size", Number(cmd[4]));
            __config__.save();
            EMCUI.window.getLocation().set(Number(cmd[2]), Number(cmd[3]), Number(cmd[4]), Number(cmd[4])*2/3);
            Game.message(Translation.translate("Successfully changed the location of showing EMC"));
          } else Game.message(Translation.translate("Please enter the correct number")+"x: 0~1000, y: 0~1000, size: 0~1000");
        } else Game.message(Translation.translate("Please enter the correct number")+"x: 0~1000, y: 0~1000, size: 0~1000");
      } else Game.message(Translation.translate("Please make sure you opened showing EMC."));
    };
    
    if(need_help){Game.message(Translation.translate(helps))};
    Game.prevent();
  }
});