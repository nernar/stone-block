if(Game.getEngineVersion().split(".")[0]!="2"){

Item.addCreativeGroup = function(){return null};
Item.isValid = function(){return true};
World.getGameMode = ModAPI.requireGlobal("Level.getGameMode");
Workbench_open=function(){Game.message(Translation.translate("You can't open this GUI"))};

};