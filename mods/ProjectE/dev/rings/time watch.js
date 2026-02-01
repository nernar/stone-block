IDRegistry.genItemID("watchTime");
Item.createItem("watchTime", "Watch of flowing time", {name: "timeWatch", meta: 0}, {stack: 1});

Callback.addCallback("PostLoaded", function(){
if(hard_mode){
	Recipes.addShaped({id: ItemID.watchTime, count: 1, data: 0}, 
	["dsd", 
	 "gcg",
	 "dsd"],
	["c", 351, 4, "g", 89, 0, "c", 347, 0, "d", ItemID.redMatter, 0, "s", 49, 0]);
}else{
	Recipes.addShaped({id: ItemID.watchTime, count: 1, data: 0}, 
	["dsd", 
	 "gcg",
	 "dsd"],
	["c", 351, 4, "g", 89, 0, "c", 347, 0, "d", ItemID.darkMatter, 0, "s", 49, 0]);
}
});

var watchTime={}, watch_portal={}, watch_mode=1;
var watchTime2={
    "time":__config__.getNumber("时间洪流怀表.刷新时间"),
    "x":__config__.getNumber("时间洪流怀表.X范围"),
    "y":__config__.getNumber("时间洪流怀表.Y范围"),
    "z":__config__.getNumber("时间洪流怀表.Z范围")
};

SetDescription(ItemID.watchTime, Translation.translate("§3Be used: Change the speed of time passage.\n§3On pedestal: speed up some machines.\n§3Acceleration range: ")+(watchTime2.x*2+1)+"(x)*"+(watchTime2.y*2+1)+"(y)*"+(watchTime2.z*2+1)+"(z)");

Item.registerUseFunction("watchTime", function (crd, i, b){
	if(!Entity.getSneaking(Player.get())){
		switch(watch_mode){
		case 1:
			watch_mode = 2;
			Game.message(Translation.translate("Speed of passage of time: ")+"×"+(watch_mode));
		break;
		case 2:
			watch_mode = 10;
			Game.message(Translation.translate("Speed of passage of time: ")+"×"+(watch_mode));
		break;
		case 10:
			watch_mode = 60;
			Game.message(Translation.translate("Speed of passage of time: ")+"×"+(watch_mode));
		break;
		case 60:
			watch_mode = -60;
			Game.message(Translation.translate("Speed of passage of time: ")+"× "+(watch_mode));
		break;
		case -60:
			watch_mode = -10;
			Game.message(Translation.translate("Speed of passage of time: ")+"× "+(watch_mode));
		break;
		case -10:
			watch_mode = -2;
			Game.message(Translation.translate("Speed of passage of time: ")+"× "+(watch_mode));
		break;
		case -2:
			watch_mode = -1;
			Game.message(Translation.translate("Speed of passage of time: ")+"× "+(watch_mode));
		break;
		case -1:
			watch_mode = 0;
			Game.message(Translation.translate("Speed of passage of time: ")+"× "+(watch_mode));
		break;
		case 0:
			watch_mode = 1;
			Game.message(Translation.translate("Speed of passage of time: ")+"× "+(watch_mode));
		break;
		};
	}else{
		watch_mode = 1;
		Game.message(Translation.translate("Speed of passage of time: ")+"× "+(watch_mode));
	}
});

Callback.addCallback("tick", function(){
	if(watch_mode==1) return;
	var time=World.getWorldTime();
	World.setWorldTime(0-(0-time-(watch_mode-1)));
});


Rings.addPedestalFunction(ItemID.watchTime, function(tile, coords){
if(World.getThreadTime()%watchTime2.time==Math.abs(Math.floor(coords.x+coords.y+coords.z))%watchTime2.time){
	watchTime[coords.x+":"+coords.y+":"+coords.z]=[];
	for(xx = -Math.floor(watchTime2.x); xx <= Math.floor(watchTime2.x); xx++){
		for(yy = -Math.floor(watchTime2.y); yy <= Math.floor(watchTime2.y); yy++){
			for(zz = -Math.floor(watchTime2.z); zz <= Math.floor(watchTime2.z); zz++){
				if(System.getspeed_up(World.getBlock(coords.x+xx, coords.y+yy, coords.z+zz).id)){
					watchTime[coords.x+":"+coords.y+":"+coords.z].push({"x":coords.x+xx, "y":coords.y+yy, "z":coords.z+zz});
				}else if(World.getBlock(coords.x+xx, coords.y+yy, coords.z+zz).id==90 &&
				    World.getBlock(coords.x+xx, coords.y+yy-1, coords.z+zz).id==49){
					watch_portal[(coords.x+xx)+":"+(coords.y+yy)+":"+(coords.z+zz)] = (watch_portal[(coords.x+xx)+":"+(coords.y+yy)+":"+(coords.z+zz)] || 1) * 18;
				};
			}
		}
	}
};
if(watchTime[coords.x+":"+coords.y+":"+coords.z]){
	watchTime[coords.x+":"+coords.y+":"+coords.z].map(function(i){
		try{
		World.getTileEntity(i.x, i.y, i.z).times=(World.getTileEntity(i.x, i.y, i.z).times||1)*18;
		}catch(e){};
	});
};
});

Callback.addCallback("tick", function(){
if(Math.random()<1/4){
	for(i in watch_portal){
		if(Math.random()<watch_portal[i]/1000){
			var p = i.split(":");
			var ent = Entity.spawn(p[0]-(0-0.5), p[1]-(0-0.1), p[2]-(0-0.5), 36);
		}
	}
}
if(World.getThreadTime()%watchTime2.time==0) watch_portal={};
});

Callback.addCallback("LevelLeft", function(){
watchTime={};
watch_mode=1;
});
