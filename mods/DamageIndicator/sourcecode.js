
/*
Version : 1.3.0
*/

!function(){
function m(a){
eval(a+"=ModAPI.requireGlobal('"+a+"')")};
m("Player.getPointed");
}()

let mobtype,guiname,tick,deathtick = 0;
const white = android.graphics.Color.WHITE,ui={x: __config__.access("X"),y:__config__.access("Y")};

Callback.addCallback("NativeGuiChanged", function(screenName){
 guiname = screenName;
  if(screenName != "hud_screen" || screenName != "in_game_play_screen"){
  if(DI.container){
   DI.container.close();
   DI.container = null;
   }
  }
});

const mob = {
 10: "Chicken",
 11: "Cow",
 12: "Pig",
 13: "Sheep",
 14: "Wolf",
 15: "Villager",
 16: "Mushroom Cow",
 17: "Squid",
 18: "Rabbit",
 19: "Bat",
 20: "Iron Golem",
 21: "Snow Golem",
 22: "Ocelot",
 23: "Horse",
 24: "Donkey",
 25: "Mule",
 26: "Skeleton Horse",
 27: "Zombie Horse",
 28: "Polar Bear",
 32: "Zombie",
 33: "Creeper",
 34: "Skeleton",
 35: "Spider",
 36: "Zombie Pigman",
 37: "Slime",
 38: "Enderman",
 39: "Silverfish",
 40: "Cave Spider",
 41: "Ghast",
 42: "Magma Cube",
 43: "Blaze",
 44: "Zombie Villager",
 45: "Witch",
 46: "Stray",
 47: "Husk",
 48: "Wither Skeleton",
 49: "Guardian",
 50: "Elder Guardian",
 52: "Wither",
 53: "Ender Dragon",
 54: "Shulker",
 55: "Ender Mite"
};

let DI = {

 Enabled: false,
 Entity: 0,
 Name: 0,
 container: null,

  window: new UI.Window({
   location: {
    x:ui.x,
    y:ui.y,
    width:256,
    height:64
    },
   elements: {
    "healthscale": {type: "scale", x: 35, y: 131, direction: 0, value: 1, bitmap: "health", scale: 3.5},
    "HP": {type: "text", x: 270, y: 150, text: "", font: {color: white, size: 50}},
    "MOB": {type: "text", x: 340, y: 30, text: "", font: {color: white, size: 55}},
   },
   drawing: [
    {type: "background", color: 0},
    {type: "bitmap", x: 10, y: 0, bitmap: "back", scale: 3.5}
   ]
  }),
};

DI.window.setAsGameOverlay(true);

Callback.addCallback("tick", function(){
  DI.Enabled = DI.Entity ? true:false;
 if(DI.Enabled && (guiname == "hud_screen" || guiname == "in_game_play_screen")){
  if(!DI.container){
   DI.container = new UI.Container();
    DI.container.openAs(
DI.window);
  }
   if(DI.container.isOpened() && tick <= 30){
    let content = DI.container.getGuiContent();
    const health = {get: function(a){return Entity.getHealth(a)},max: function(a){return Entity.getMaxHealth(a)}};
      if(tick == 0){
       content.elements["MOB"].x = DI.Name === "DiNoNaMe"?340-mob[mobtype].length*10:340-DI.Name.length*10;
        }
     tick++;
    if(health.max(DI.Entity) !== 0){
if(DI.Name === "DiNoNaMe"){
    DI.container.setText("MOB", mob[mobtype]);
} else
     DI.container.setText("MOB", DI.Name);
    DI.container.setText("HP", health.get(DI.Entity)+" / "+health.max(DI.Entity));
    DI.container.setScale("healthscale", health.get(DI.Entity) / health.max(DI.Entity));
     }
     if(!health.get(DI.Entity)){
      deathtick++;
    }
  }
 }
  if(DI.container && (tick > 30 || deathtick === 15)){
   DI.container.close();
   DI.container = null;
   DI.Name = DI.Entity = tick = deathtick = mobtype = 0;
	}
});

Callback.addCallback("tick", function(){
const ent = [10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,52,53,54,55],v = Player.getPointed().entity;
for(let i=ent.length;i--;){
 if(Entity.getType(v) === ent[i]){
  DI.Name = Entity.getCustom(v) === null?"DiNoNaMe":Entity.getCustom(v).nameId;
  if(DI.Name.search(/mobblock/) === -1){
   DI.Entity = v;
   tick = deathtick = 0;
   mobtype = Entity.getType(v);
  }
 }
}
});

Callback.addCallback("EntityDeath", function(entity){
 const p = Player.get();
 if(DI.Enabled && entity === p)tick = 31;
});
