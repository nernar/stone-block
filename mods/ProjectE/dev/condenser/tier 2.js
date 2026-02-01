IDRegistry.genBlockID("energyCondenser2");
Block.createBlockWithRotation("energyCondenser2", [
 {name: "Energy Condenser II", texture: [
   ["condenserBottom",0],
   ["condenserTop",0],
   ["condenserSide",0],
   ["condenserFront",0],
   ["condenserSide",0],
   ["condenserSide",0],
  ],inCreative: true}
]);
SetDescription(BlockID.energyCondenser2, Translation.translate("§3Convert the items placed on the left side of it into EMC.")+"\n"+
    Translation.translate("§3Convert EMC into a specific item.")+"\n"+
    Translation.translate("§3Draw EMC from the adjacent energy collector and antimatter relay."));

CustomChest.setChestRender(BlockID.energyCondenser2);

Callback.addCallback("PostLoaded",function(){
if(hard_mode){
	Recipes.addShaped({id: BlockID.energyCondenser2, count: 1, data: 0}, 
	["oko",
	 "dcd",
	 "oro"],
	["k", ItemID.kleinStar4, 0, "r", BlockID.antimatterRelay3, 0, "o", BlockID.dmBlock, 0, "d", BlockID.rmBlock, 0, "c", BlockID.energyCondenser1, 0]);
}else{
	Recipes.addShaped({id: BlockID.energyCondenser2, count: 1, data: 0}, 
	["odo",
	 "dcd",
	 "odo"],
	["o", BlockID.dmBlock, 0, "d", BlockID.rmBlock, 0, "c", BlockID.energyCondenser1, 0]);
}
});

var condenserUI_2 = new UI.StandartWindow({
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
      "slotInput0": {type: "slot", x: 380, y: 200},
      "slotInput1": {type: "slot", x: 440, y: 200},
      "slotInput2": {type: "slot", x: 500, y: 200},
      "slotInput3": {type: "slot", x: 560, y: 200},
      "slotInput4": {type: "slot", x: 380, y: 260},
      "slotInput5": {type: "slot", x: 440, y: 260},
      "slotInput6": {type: "slot", x: 500, y: 260},
      "slotInput7": {type: "slot", x: 560, y: 260},
      "slotInput8": {type: "slot", x: 380, y: 320},
      "slotInput9": {type: "slot", x: 440, y: 320},
      "slotInput10": {type: "slot", x: 500, y: 320},
      "slotInput11": {type: "slot", x: 560, y: 320},
      "slotInput12": {type: "slot", x: 380, y: 380},
      "slotInput13": {type: "slot", x: 440, y: 380},
      "slotInput14": {type: "slot", x: 500, y: 380},
      "slotInput15": {type: "slot", x: 560, y: 380},
      "slotOutput0": {type: "slot", x: 660, y: 200},
      "slotOutput1": {type: "slot", x: 720, y: 200},
      "slotOutput2": {type: "slot", x: 780, y: 200},
      "slotOutput3": {type: "slot", x: 840, y: 200},
      "slotOutput4": {type: "slot", x: 660, y: 260},
      "slotOutput5": {type: "slot", x: 720, y: 260},
      "slotOutput6": {type: "slot", x: 780, y: 260},
      "slotOutput7": {type: "slot", x: 840, y: 260},
      "slotOutput8": {type: "slot", x: 660, y: 320},
      "slotOutput9": {type: "slot", x: 720, y: 320},
      "slotOutput10": {type: "slot", x: 780, y: 320},
      "slotOutput11": {type: "slot", x: 840, y: 320},
      "slotOutput12": {type: "slot", x: 660, y: 380},
      "slotOutput13": {type: "slot", x: 720, y: 380},
      "slotOutput14": {type: "slot", x: 780, y: 380},
      "slotOutput15": {type: "slot", x: 840, y: 380},
    }
});


System.addspeed_up(BlockID.energyCondenser2);
TileEntity.registerPrototype(BlockID.energyCondenser2, {
  defaultValues: {emc: 0, max: 0, work: false},
  emc_out: 12, times: 1, times2: 1,
  getGuiScreen: function(){
    return condenserUI_2;
  },
  getTransportSlots: function(){
    var slotInput=[], slotOutput=[];
    for(i=0; i<16; i++){
      slotInput.push("slotInput"+i);
      slotOutput.push("slotOutput"+i);
    };
    return {input: slotInput, output: slotOutput};
  },
  tick: function(){
    this.times2=this.times;
    StorageInterface.checkHoppers(this);

    var ths=this, coords={x: this.x, y: this.y, z: this.z};
    var slotItem=this.container.getSlot("item");
    var slotInput=[], slotOutput=[];
    for(i=0; i<16; i++){
      slotOutput[i]=this.container.getSlot("slotOutput"+String(i));
      slotInput[i]=this.container.getSlot("slotInput"+String(i));
    };

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
      for(i=0; i<16; i++){
        var value=System.getValue(slotInput[i].id, slotInput[i].data);
        while(value && this.data.emc<this.data.max){
          this.data.emc += value;
          slotInput[i].count--;
          this.container.validateAll();
          value=System.getValue(slotInput[i].id, slotInput[i].data);
        }
      };
    };

    if(this.data.work){
      for(i=0; i<16; i++){
        if(this.data.emc>=this.data.max && slotOutput[i].count<Item.getMaxStack(slotOutput[i].id,slotOutput[i].data) &&
          (slotOutput[i].id==0 || (slotOutput[i].id==slotItem.id && slotOutput[i].data==slotItem.data && !slotOutput[i].extra))){
          this.data.emc-=this.data.max;
          slotOutput[i].id=slotItem.id;
          slotOutput[i].data=slotItem.data;
          slotOutput[i].count+=1;
          this.container.validateAll();
          break;
        };
      };
    };

    this.times=1;
  }
});

StorageInterface.createInterface(BlockID.energyCondenser2, {
	slots: {
		"slotInput0": {input: true},
		"slotInput1": {input: true},
		"slotInput2": {input: true},
		"slotInput3": {input: true},
		"slotInput4": {input: true},
		"slotInput5": {input: true},
		"slotInput6": {input: true},
		"slotInput7": {input: true},
		"slotInput8": {input: true},
		"slotInput9": {input: true},
		"slotInput10": {input: true},
		"slotInput11": {input: true},
		"slotInput12": {input: true},
		"slotInput13": {input: true},
		"slotInput14": {input: true},
		"slotInput15": {input: true},
		"slotOutput0": {output: true},
		"slotOutput1": {output: true},
		"slotOutput2": {output: true},
		"slotOutput3": {output: true},
		"slotOutput4": {output: true},
		"slotOutput5": {output: true},
		"slotOutput6": {output: true},
		"slotOutput7": {output: true},
		"slotOutput8": {output: true},
		"slotOutput9": {output: true},
		"slotOutput10": {output: true},
		"slotOutput11": {output: true},
		"slotOutput12": {output: true},
		"slotOutput13": {output: true},
		"slotOutput14": {output: true},
		"slotOutput15": {output: true},
	},
	isValidInput: function(item){
		return System.getValue(item.id, item.data);
	}
});
