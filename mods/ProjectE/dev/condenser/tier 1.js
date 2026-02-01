IDRegistry.genBlockID("energyCondenser1");
Block.createBlockWithRotation("energyCondenser1", [
 {name: "Energy Condenser I", texture: [
   ["condenserBottom",0],
   ["condenserTop",0],
   ["condenserSide",0],
   ["condenserFront",0],
   ["condenserSide",0],
   ["condenserSide",0],
  ],inCreative: true}
]);
SetDescription(BlockID.energyCondenser1, Translation.translate("§3Convert EMC into a specific item.")+"\n"+
    Translation.translate("§3Draw EMC from the adjacent energy collector and antimatter relay."));

CustomChest.setChestRender(BlockID.energyCondenser1);

Callback.addCallback("PostLoaded",function(){
if(hard_mode){
	Recipes.addShaped({id: BlockID.energyCondenser1, count: 1, data: 0}, 
	["odo",
	 "dcd",
	 "kdk"],
	["k", ItemID.kleinStar3, 0, "o", 49, 0, "d", 264, 0, "c", BlockID.alchChest, 0]);
}else{
	Recipes.addShaped({id: BlockID.energyCondenser1, count: 1, data: 0}, 
	["odo",
	 "dcd",
	 "odo"],
	["o", 49, 0, "d", 264, 0, "c", BlockID.alchChest, 0]);
}
});

var condenserUI_1 = new UI.StandartWindow({
    standart: {
      header: {text: {text: Translation.translate("Energy condenser") }},
      inventory: {standart: true},
      background: {standart: true},
      minHeight: 1000/16*9*1.5-500/屏幕长宽比-90
    }, 
    drawing: [
      {type: "bitmap", x: 500, y: 100, bitmap: "emcBar_0", scale: 4},
    ],
    elements: {
      "item": {type: "slot", x: 430, y: 95},
      "charge": {type: "slot", x: 360, y: 70, size: 55, bitmap: "starCharge"},
      "uncharge": {type: "slot", x: 360, y: 125, size: 55, bitmap: "unstarCharge" },
      "emcScale": {type: "scale", x: 500, y: 100, bitmap: "emcBar_1", scale: 4},
      "text": {type: "text", x: 325, y: 35, width: 100, height: 30, text: "EMC"},
      "slotCatalyst0": {type: "slot", x: 400, y: 200},
      "slotCatalyst1": {type: "slot", x: 460, y: 200},
      "slotCatalyst2": {type: "slot", x: 520, y: 200},
      "slotCatalyst3": {type: "slot", x: 580, y: 200},
      "slotCatalyst4": {type: "slot", x: 640, y: 200},
      "slotCatalyst5": {type: "slot", x: 700, y: 200},
      "slotCatalyst6": {type: "slot", x: 760, y: 200},
      "slotCatalyst7": {type: "slot", x: 820, y: 200},
      "slotCatalyst8": {type: "slot", x: 400, y: 260},
      "slotCatalyst9": {type: "slot", x: 460, y: 260},
      "slotCatalyst10": {type: "slot", x: 520, y: 260},
      "slotCatalyst11": {type: "slot", x: 580, y: 260},
      "slotCatalyst12": {type: "slot", x: 640, y: 260},
      "slotCatalyst13": {type: "slot", x: 700, y: 260},
      "slotCatalyst14": {type: "slot", x: 760, y: 260},
      "slotCatalyst15": {type: "slot", x: 820, y: 260},
      "slotCatalyst16": {type: "slot", x: 400, y: 320},
      "slotCatalyst17": {type: "slot", x: 460, y: 320},
      "slotCatalyst18": {type: "slot", x: 520, y: 320},
      "slotCatalyst19": {type: "slot", x: 580, y: 320},
      "slotCatalyst20": {type: "slot", x: 640, y: 320},
      "slotCatalyst21": {type: "slot", x: 700, y: 320},
      "slotCatalyst22": {type: "slot", x: 760, y: 320},
      "slotCatalyst23": {type: "slot", x: 820, y: 320},
      "slotCatalyst24": {type: "slot", x: 400, y: 380},
      "slotCatalyst25": {type: "slot", x: 460, y: 380},
      "slotCatalyst26": {type: "slot", x: 520, y: 380},
      "slotCatalyst27": {type: "slot", x: 580, y: 380},
      "slotCatalyst28": {type: "slot", x: 640, y: 380},
      "slotCatalyst29": {type: "slot", x: 700, y: 380},
      "slotCatalyst30": {type: "slot", x: 760, y: 380},
      "slotCatalyst31": {type: "slot", x: 820, y: 380},
    }
});


System.addspeed_up(BlockID.energyCondenser1);
TileEntity.registerPrototype(BlockID.energyCondenser1, {
  defaultValues: {emc: 0, max: 0, work: false},
  emc_out: 6, times: 1, times2: 1,
  getGuiScreen: function(){
    return condenserUI_1;
  },
  getTransportSlots: function(){
    var slot=[];
    for(i=0; i<32; i++){
      slot.push("slotCatalyst"+i);
    };
    return {input: slot, output: slot};
  },
  tick: function(){
    this.times2=this.times;
    StorageInterface.checkHoppers(this);

    var ths=this, coords={x: this.x, y: this.y, z: this.z}, slot=[];
    var slotItem=this.container.getSlot("item");
    for(i=0; i<32; i++){slot[i]=this.container.getSlot("slotCatalyst"+String(i))};

    this.container.setText("text", "EMC: "+Math.floor(this.data.emc));
    System.chargeStar(this.container, this.data);
    System.unchargeStar(this.container, this.data);

    if(System.getValue(slotItem.id, slotItem.data)){
      this.data.max = System.getValue(slotItem.id, slotItem.data);
      this.container.setScale("emcScale", this.data.emc/this.data.max);
      if(!this.data.work){this.data.work=true};
    } else {
      this.data.max=0;
      this.container.setScale("emcScale", 0);
      if(this.data.work){this.data.work=false};
    };

    if(this.data.work){
      DIRS.map(function(dir){
        let tile = World.getTileEntity(coords.x+dir.x, coords.y+dir.y, coords.z+dir.z);
        let block = World.getBlock(coords.x+dir.x, coords.y+dir.y, coords.z+dir.z);
        if(block.id==BlockID.energyCollector1 || block.id==BlockID.energyCollector2 || block.id==BlockID.energyCollector3 ||
          block.id==BlockID.antimatterRelay1 || block.id==BlockID.antimatterRelay2 || block.id==BlockID.antimatterRelay3){
          System.transfer(ths, tile);
        };
      });
    };

    if(this.data.work){
      for(i=0; i<32; i++){
        if(this.data.emc>=this.data.max && slot[i].count<Item.getMaxStack(slot[i].id,slot[i].data) &&
          (slot[i].id==0 || (slot[i].id==slotItem.id && slot[i].data==slotItem.data && !slot[i].extra))){
          this.data.emc-=this.data.max;
          slot[i].id=slotItem.id;
          slot[i].data=slotItem.data;
          slot[i].count+=1;
          this.container.validateAll();
          break;
        };
      };
    };

    this.times=1;
  }
});

StorageInterface.createInterface(BlockID.energyCondenser1, {
	slots: {
		"slotCatalyst0": {output: true},
		"slotCatalyst1": {output: true},
		"slotCatalyst2": {output: true},
		"slotCatalyst3": {output: true},
		"slotCatalyst4": {output: true},
		"slotCatalyst5": {output: true},
		"slotCatalyst6": {output: true},
		"slotCatalyst7": {output: true},
		"slotCatalyst8": {output: true},
		"slotCatalyst9": {output: true},
		"slotCatalyst10": {output: true},
		"slotCatalyst11": {output: true},
		"slotCatalyst12": {output: true},
		"slotCatalyst13": {output: true},
		"slotCatalyst14": {output: true},
		"slotCatalyst15": {output: true},
		"slotCatalyst16": {output: true},
		"slotCatalyst17": {output: true},
		"slotCatalyst18": {output: true},
		"slotCatalyst19": {output: true},
		"slotCatalyst20": {output: true},
		"slotCatalyst21": {output: true},
		"slotCatalyst22": {output: true},
		"slotCatalyst23": {output: true},
		"slotCatalyst24": {output: true},
		"slotCatalyst25": {output: true},
		"slotCatalyst26": {output: true},
		"slotCatalyst27": {output: true},
		"slotCatalyst28": {output: true},
		"slotCatalyst29": {output: true},
		"slotCatalyst30": {output: true},
		"slotCatalyst31": {output: true},
	}
});
