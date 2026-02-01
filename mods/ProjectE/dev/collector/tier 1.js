Block.createSpecialType({
	destroytime: 2,
	explosionres: 0.5,
	opaque: false,
	lightopacity: 0,
	renderlayer: 3,
	lightlevel: 10
}, "light");

IDRegistry.genBlockID("energyCollector1");
Block.createBlockWithRotation("energyCollector1", [
	 {name: "Energy Collector I", texture: [
	   ["collectorOther",0],
	   ["collectorTop",0],
	   ["collectorOther",0],
	   ["collectorFront",0],
	   ["collectorOther",0],
	   ["collectorOther",0],
  ], inCreative: __config__.getBool("物品方块.能量收集器")}
], "light");
SetDescription(BlockID.energyCollector1, Translation.translate("§3Collect EMC from the brighter air."));

Callback.addCallback("PostLoaded",function(){
if(__config__.getBool("物品方块.能量收集器")){
	if(hard_mode){
		Recipes.addShaped({id: BlockID.energyCollector1, count: 1, data: 0},
		["glg",
		 "kdk",
		 "gfg"],
		['k', ItemID.kleinStar1, 0, 'g', 89, 0, 'd', 57, 0, 'f', 61, 0, 'l', 20, 0]);
	}else{
		Recipes.addShaped({id: BlockID.energyCollector1, count: 1, data: 0},
		["glg",
		 "gdg",
		 "gfg"],
		['g', 89, 0, 'd', 57, 0, 'f', 61, 0, 'l', 20, 0]);
	}
};
});

var collectorUI = new UI.StandartWindow({
	standart: {
		header: {text: {text: Translation.translate("Energy collector")}},
		inventory: {standart: true},
		background: {standart: true},
		minHeight: 1000/16*9*1.5-500/屏幕长宽比-90
	},
	 drawing: [
    {type: "bitmap", x: 485, y: 100, bitmap: "emcBarShort_0", scale: 5},
    {type: "bitmap", x: 600, y: 200, bitmap: "collectorProgress_01", scale: 3.5},
    {type: "bitmap", x: 800, y: 200, bitmap: "collectSun_0", scale: 4},
  ],
        elements: {
        "output0": {type: "slot", x: 350, y: 240},
        "output1": {type: "slot", x: 410, y: 240},
        "output2": {type: "slot", x: 470, y: 240},
        "output3": {type: "slot", x: 530, y: 240},
        "output4": {type: "slot", x: 350, y: 300},
        "output5": {type: "slot", x: 410, y: 300},
        "output6": {type: "slot", x: 470, y: 300},
        "output7": {type: "slot", x: 530, y: 300},
       "input": {type: "slot", x: 700, y: 300},
      "progScale": {type: "scale", x: 600, y: 200, bitmap: "collectorProgress_11", scale: 3.5, direction: 2},
         "charge": {type: "slot", x: 350, y: 100, bitmap: "starCharge"},
       "uncharge": {type: "slot", x: 410, y: 100, bitmap: "unstarCharge" },
      "emcScale": {type: "scale", x: 485, y: 100, bitmap: "emcBarShort_1", scale: 5},
            "Sun": {type: "scale", x: 800, y: 200, bitmap: "collectSun_1", scale: 4},
            "text": {type: "text", x: 325, y: 35, width: 100, height: 30, text: "EMC"}
  	}
});


System.addspeed_up(BlockID.energyCollector1);
TileEntity.registerPrototype(BlockID.energyCollector1, {
  defaultValues: {
    emc: 0, max: __config__.getBool("无存储上限") ? 1e16 : 200000
  },
  times: 1, times2: 1,
  getGuiScreen: function(){
    return collectorUI;
  },
  getTransportSlots: function(){
    var inputC=["input"], outputC=[];
    for(i=0; i<8; i++){outputC.push("output"+i)};
    return {input: inputC, output: outputC};
  },
  tick: function(){
    this.times2=this.times;
    StorageInterface.checkHoppers(this);

    var val,res,light;
    slotInput = this.container.getSlot("input");
    slotOutput = [];
    slotOutput[0] = this.container.getSlot("output0");
    slotOutput[1] = this.container.getSlot("output1");
    slotOutput[2] = this.container.getSlot("output2");
    slotOutput[3] = this.container.getSlot("output3");
    slotOutput[4] = this.container.getSlot("output4");
    slotOutput[5] = this.container.getSlot("output5");
    slotOutput[6] = this.container.getSlot("output6");
    slotOutput[7] = this.container.getSlot("output7");
    
    this.container.setScale("emcScale", this.data.emc/this.data.max);
    this.container.setText("text", "EMC: "+Math.floor(this.data.emc));
    
    light=Math.max(World.getLightLevel(this.x+1, this.y, this.z),World.getLightLevel(this.x, this.y+1, this.z),World.getLightLevel(this.x, this.y, this.z+1),
    World.getLightLevel(this.x-1, this.y, this.z),World.getLightLevel(this.x, this.y-1, this.z),World.getLightLevel(this.x, this.y, this.z-1));
    if(light>=2){
        this.container.setScale("Sun", 1);
      if(this.data.emc <= this.data.max-4*this.times/20){
        this.data.emc=this.data.emc+4*this.times/20;
      } else if(this.data.emc > this.data.max-4*this.times/20 && this.data.emc < this.data.max){this.data.emc=this.data.max}
    } else this.container.setScale("Sun", 0);
    
    System.chargeStar(this.container, this.data);
    System.unchargeStar(this.container, this.data);
    
    if(System.getRecipe(slotInput.id,slotInput.data)){
     res = System.getRecipe(slotInput.id,slotInput.data).id;
     val = System.getRecipe(slotInput.id,slotInput.data).emc;
    };

    if(val && res){
     this.container.setScale("progScale", this.data.emc/val);
    } else	this.container.setScale("progScale", 0);
    
    for(i=0; i<8; i++){
      if(val && res && this.data.emc > val && slotOutput[i].count<Item.getMaxStack(slotOutput[i].id,slotOutput[i].data) &&
        (slotOutput[i].id==0 || (slotOutput[i].id==res && slotOutput[i].data==0 && !slotOutput[i].extra))){
        this.data.emc-=val;
        slotOutput[i].id=res;
        slotOutput[i].count++;
        slotInput.count--;
        this.container.validateAll();
        break;
    }};
    
    for(i=0; i<8; i++){
      if(slotInput.count<64 && System.getCanRecipe(slotOutput[i].id, slotOutput[i].data) && slotOutput[i].id!==0 &&
        (slotInput.id==0 || (slotInput.id==slotOutput[i].id && slotInput.data==slotOutput[i].data && !slotOutput[i].extra))){
        let transfer = Math.min(slotOutput[i].count, 64-slotInput.count);
        slotInput.id=slotOutput[i].id;
        slotInput.data=slotOutput[i].data;
        slotInput.count += transfer;
        slotOutput[i].count -= transfer;
        this.container.validateAll();
        break;
    }};
    
    this.times=1;
  }
});

StorageInterface.createInterface(BlockID.energyCollector1, {
	slots: {
		"input": {input: true},
		"output0": {output: true},
		"output1": {output: true},
		"output2": {output: true},
		"output3": {output: true},
		"output4": {output: true},
		"output5": {output: true},
		"output6": {output: true},
		"output7": {output: true},
	},
	isValidInput: function(item){
		return System.getCanRecipe(item.id, item.data);
	}
});
