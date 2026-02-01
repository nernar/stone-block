Translation.addTranslation("low Voltage Solar Hat", {ru: "ЛВСП-шлем"});
Translation.addTranslation("Medium Voltage Solar Hat", {ru: "МВСП-шлем"});
Translation.addTranslation("High Voltage Solar Hat", {ru: "ХВСП-шлем"});
IDRegistry.genItemID("lhat"); IDRegistry.genItemID("mhat"); IDRegistry.genItemID("hhat");
Item.createArmorItem("lhat", "low Voltage Solar Hat", {name: "solar_hat_low_voltage"}, {type: "helmet", armor: 0, durability: 0, texture: "armor/lv_hat.png", isTech: false});
Item.createArmorItem("mhat", "Medium Voltage Solar Hat", {name: "solar_hat_medium_voltage"}, {type: "helmet", armor: 0, durability: 0, texture: "armor/mv_hat.png", isTech: false});
Item.createArmorItem("hhat", "High Voltage Solar Hat", {name: "solar_hat_high_voltage"}, {type: "helmet", armor: 0, durability: 0, texture: "armor/hv_hat.png", isTech: false});
ChargeItemRegistry.registerItem(ItemID.lhat, "Eu",  -1, 3, true);
ChargeItemRegistry.registerItem(ItemID.mhat, "Eu",  -1, 3, true);
ChargeItemRegistry.registerItem(ItemID.hhat, "Eu",  -1, 3, true);
Callback.addCallback("PreLoaded", function(){Recipes.addShaped({id: ItemID.lhat, count: 1, data: 0}, ["xa "], ['x', BlockID.lvsa, 0, 'a', 306, 0]);});
Callback.addCallback("PreLoaded", function(){Recipes.addShaped({id: ItemID.mhat, count: 1, data: 0}, ["xa "], ['x', BlockID.mvsa, 0, 'a', 306, 0]);});
Callback.addCallback("PreLoaded", function(){Recipes.addShaped({id: ItemID.hhat, count: 1, data: 0}, ["xa "], ['x', BlockID.hvsa, 0, 'a', 306, 0]);});

function registerSOLARHELMET(id, level, tranfer){
 Armor.registerFuncs(id, {
  hurt: function(){
   return false;
  },
  tick: function(slot, index, maxDamage){
   return SOLAR_NANO_HELMET(slot, maxDamage, level, tranfer);
  }
 });
}

 var SOLAR_NANO_HELMET = function(slot, maxDamage, level, transfer){
 if(World.getThreadTime()%20==0){
              var item = 
     Player.getArmorSlot(1);
     var energyAdd = ChargeItemRegistry.addEnergyTo(item, "Eu", item.data - 0, transfer*1, level);
     if(energyAdd > 0){
         slot.data += energyAdd;

Player.setArmorSlot(1, item.id, 1, item.data, item.extra);
         return true;
  }
    }
    return false;
}
registerSOLARHELMET("lhat", 1, 8);
registerSOLARHELMET("mhat", 1, 64);
registerSOLARHELMET("mhat", 2, 64);
registerSOLARHELMET("hhat", 1, 512);
registerSOLARHELMET("hhat", 2, 512);
registerSOLARHELMET("hhat", 3, 512);