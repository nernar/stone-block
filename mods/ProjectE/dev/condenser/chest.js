IDRegistry.genBlockID("alchChest");
Block.createBlockWithRotation("alchChest", [{
    name: "Alchemical chest",
    texture: [
        ["alchemicalChestBottom", 0],
        ["alchemicalChestBottom", 0],
        ["alchemicalChestSide", 0],
        ["alchemicalChestFront", 0],
        ["alchemicalChestSide", 0],
        ["alchemicalChestSide", 0]
    ],
    inCreative: true
}]);

CustomChest.setChestRender(BlockID.alchChest);

var alchChestUI_obj = {
  standart: {
    header: { text: { text: Translation.translate("Alchemical Storage") }},
    inventory: { standart: true},
    background: { standart: true},
    minHeight: 1000/16*9*1.5-500/屏幕长宽比-90
  },
  elements: {},
  transfer: {}
};
for(i=1;i<=104;i++){alchChestUI_obj.elements["slot"+String(i)]={type: "slot", x: 350+50*((i-1)%12), y: 40+50*Math.floor((i-1)/12), size: 50}};
for(i=1;i<=104;i++){alchChestUI_obj.transfer["slot"+String(i)]={input: true, output: true}};
var alchChestUI = new UI.StandartWindow(alchChestUI_obj);


Callback.addCallback("PostLoaded", function(){
Recipes.addShaped({ id: BlockID.alchChest, count: 1, data: 0},
["lmh", "sds", "ici"], ["l", ItemID.covDust1, 0, "m", ItemID.covDust2, 0, "h", ItemID.covDust3, 0, "s", 1, 0, "i", 265, 0, "c", 54, 0, "d", 264, 0]);
});

TileEntity.registerPrototype(BlockID.alchChest, {
  getGuiScreen: function(){
    return alchChestUI;
  },
  getTransportSlots: function(){
    let inputC = [];
    let outputC = [];
    for(i=1; i<=104; i++){
      inputC.push("slot" + i);
      outputC.push("slot" + i);
    };
    return {input: inputC, output: outputC}
  },
  tick: function(){
    StorageInterface.checkHoppers(this);
  }
});

StorageInterface.createInterface(BlockID.alchChest, {
	slots: alchChestUI_obj.transfer
});
