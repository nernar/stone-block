IDRegistry.genItemID("talismanRepair");
Item.createItem("talismanRepair", "Talisman of repair", {name: "talismanRepair", meta: 0}, {stack: 1});
SetDescription(ItemID.talismanRepair, Translation.translate("§3In inventory: fix the durability of some items in the player's inventory."));

Callback.addCallback("PostLoaded", function(){
Recipes.addShaped({id: ItemID.talismanRepair, count: 1, data: 0}, 
["abc", 
 "pps",
 "abc"],
["a", ItemID.covDust1, 0, "b", ItemID.covDust2, 0, "c", ItemID.covDust3, 0, "p", 339, 0, "s", 287, 0]);
});

var toolList = {
  //其它
  259: true, 261: true, 346: true, 359: true, 398: true, 444: true, 455: true, 469: true, 513: true,
  //铁
  256: true, 257: true, 258: true, 267: true, 292: true,
  //木
  268: true, 269: true, 270: true, 271: true, 290: true, 
  //石
  272: true, 273: true, 274: true, 275: true, 291: true,
  //钻石
  276: true, 277: true, 278: true, 279: true, 293: true, 
  //金
  283: true, 284: true, 285: true, 286: true, 294: true,
  //皮革
  298: true, 299: true, 300: true, 301: true,
  //锁链
  302: true, 303: true, 304: true, 305: true,
  //铁
  306: true, 307: true, 308: true, 309: true,
  //金
  314: true, 315: true, 316: true, 317: true,
  //钻石
  310: true, 311: true, 312: true, 313: true,
};


Rings.addRingFunction(ItemID.talismanRepair, function(){
if(World.getThreadTime()%20 == 0){
  for(i = 0; i < 36; i ++){
    let item = Player.getInventorySlot(i);
    if(item.data > 0&&toolList[item.id]&&(GuiName=="in_game_play_screen"||GuiName=="hud_screen")){
      Player.setInventorySlot(i, item.id, item.count, item.data-4<0?0:item.data-4, item.extra);
    }
  }
  for(i = 0; i < 4; i ++){
    let armor = Player.getArmorSlot(i);
    if(armor.data > 0&&toolList[armor.id]&&(GuiName=="in_game_play_screen"||GuiName=="hud_screen")){
      Player.setArmorSlot(i, armor.id, armor.count, armor.data-4<0?0:armor.data-4, armor.extra);
    }
  }
};
});

Callback.addCallback("tick", function(){
  if(Rings.get(ItemID.talismanRepair)){
    Rings.getRingFunction(ItemID.talismanRepair).inv();
  }
});