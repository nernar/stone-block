IDRegistry.genBlockID("antimatterRelay1");
Block.createBlockWithRotation("antimatterRelay1", [{
    name: "Anti-matter Relay I",
    texture: [
        ["relayOther", 0],
        ["relayTop", 0],
        ["relayOther", 0],
        ["relayFront", 0],
        ["relayOther", 0],
        ["relayOther", 0],
    ],
    inCreative: true
}], "opaque");
SetDescription(BlockID.antimatterRelay1, Translation.translate("§3Convert the items you put into it into EMC.")+"\n"+
    Translation.translate("§3Draw the EMC from the adjacent energy collector."));

var relayUI = new UI.StandartWindow({
    standart: {
        header: {text: {text: Translation.translate("Anti-matter relay")}},
        inventory: {standart: true},
        background: {standart: true},
        minHeight: 1000/16*9*1.5-500/屏幕长宽比-90
    },
    drawing: [{type: "bitmap", x: 485, y: 100, bitmap: "emcBarShort_0", scale: 5}],
    elements: {
        "input0": {type: "slot", x: 400, y: 200},
        "input1": {type: "slot", x: 460, y: 200},
        "input2": {type: "slot", x: 520, y: 200},
        "input3": {type: "slot", x: 580, y: 200},
        "input4": {type: "slot", x: 640, y: 200},
        "input5": {type: "slot", x: 700, y: 200},
        "input6": {type: "slot", x: 760, y: 200},
        "input7": {type: "slot", x: 820, y: 200},
        "input8": {type: "slot", x: 400, y: 260},
        "input9": {type: "slot", x: 460, y: 260},
        "input10": {type: "slot", x: 520, y: 260},
        "input11": {type: "slot", x: 580, y: 260},
        "input12": {type: "slot", x: 640, y: 260},
        "input13": {type: "slot", x: 700, y: 260},
        "input14": {type: "slot", x: 760, y: 260},
        "input15": {type: "slot", x: 820, y: 260},
        "input16": {type: "slot", x: 400, y: 320},
        "input17": {type: "slot", x: 460, y: 320},
        "input18": {type: "slot", x: 520, y: 320},
        "input19": {type: "slot", x: 580, y: 320},
        "input20": {type: "slot", x: 640, y: 320},
        "input21": {type: "slot", x: 700, y: 320},
        "input22": {type: "slot", x: 760, y: 320},
        "input23": {type: "slot", x: 820, y: 320},
        "input24": {type: "slot", x: 400, y: 380},
        "input25": {type: "slot", x: 460, y: 380},
        "input26": {type: "slot", x: 520, y: 380},
        "input27": {type: "slot", x: 580, y: 380},
        "input28": {type: "slot", x: 640, y: 380},
        "input29": {type: "slot", x: 700, y: 380},
        "input30": {type: "slot", x: 760, y: 380},
        "input31": {type: "slot", x: 820, y: 380},
        "progScale": { type: "scale", x: 750, y: 200, bitmap: "relayProgress_1", scale: 3.5, direction: 1 },
        "charge": { type: "slot", x: 350, y: 100, bitmap: "starCharge" },
        "uncharge": { type: "slot", x: 410, y: 100, bitmap: "unstarCharge" },
        "emcScale": { type: "scale", x: 485, y: 100, bitmap: "emcBarShort_1", scale: 5 },
        "text": { type: "text", x: 325, y: 35, width: 100, height: 30, text: "EMC" }
    }
});


Callback.addCallback("PostLoaded", function() {
if(hard_mode){
	Recipes.addShaped({ id: BlockID.antimatterRelay1, count: 1, data: 0 },
	["odo",
	 "kfk",
	 "ooo"],
	["k", ItemID.kleinStar1, 0, "o", 49, 0, "f", 61, 0, "d", 57, 0]);
}else{
	Recipes.addShaped({ id: BlockID.antimatterRelay1, count: 1, data: 0 },
	["odo",
	 "ofo",
	 "ooo"],
	["o", 49, 0, "f", 61, 0, "d", 57, 0]);
}
});


System.addspeed_up(BlockID.antimatterRelay1);
TileEntity.registerPrototype(BlockID.antimatterRelay1, {
    defaultValues: {emc: 0, max: __config__.getBool("无存储上限") ? 1e16 : 300000 },
    getGuiScreen: function() { return relayUI; },
    emc_out: 8/20, times: 1, times2: 1,
    getTransportSlots: function(){
      let inputC = [];
      let outputC = [];
      for(i=0;i<32;i++){inputC.push("input"+i)};
      return {input: inputC, output: outputC};
    },
    tick: function(){
      this.times2=this.times;
      StorageInterface.checkHoppers(this);

      var ths=this;
      var coords={x: this.x, y: this.y, z: this.z};

      for(i = 0; i < 32; i++){
        let slotBurn = this.container.getSlot("input" + i);
        let value = System.getValue(slotBurn.id, slotBurn.data);
        while(value && this.data.emc+(value||0)<=this.data.max){
          this.data.emc += value;
          slotBurn.count--;
          this.container.validateAll();
          value = System.getValue(slotBurn.id, slotBurn.data);
        }
      };

      this.container.setScale("emcScale", this.data.emc / this.data.max);
      this.container.setText("text", "EMC: "+Math.floor(this.data.emc));
      System.chargeStar(this.container, this.data);
      System.unchargeStar(this.container, this.data);

      DIRS.map(function(dir){
        let tile = World.getTileEntity(coords.x+dir.x, coords.y+dir.y, coords.z+dir.z);
        let block = World.getBlock(coords.x+dir.x, coords.y+dir.y, coords.z+dir.z);
        if(block.id==BlockID.energyCollector1 || block.id==BlockID.energyCollector2 || block.id==BlockID.energyCollector3){
          System.transfer(ths, tile);
        };
      })

      this.times=1;
    }
});

StorageInterface.createInterface(BlockID.antimatterRelay1, {
	slots: {
		"input0": {input: true},
		"input1": {input: true},
		"input2": {input: true},
		"input3": {input: true},
		"input4": {input: true},
		"input5": {input: true},
		"input6": {input: true},
		"input7": {input: true},
		"input8": {input: true},
		"input9": {input: true},
		"input10": {input: true},
		"input11": {input: true},
		"input12": {input: true},
		"input13": {input: true},
		"input14": {input: true},
		"input15": {input: true},
		"input16": {input: true},
		"input17": {input: true},
		"input18": {input: true},
		"input19": {input: true},
		"input20": {input: true},
		"input21": {input: true},
		"input22": {input: true},
		"input23": {input: true},
		"input24": {input: true},
		"input25": {input: true},
		"input26": {input: true},
		"input27": {input: true},
		"input28": {input: true},
		"input29": {input: true},
		"input30": {input: true},
		"input31": {input: true},
	},
	isValidInput: function(item){
		return System.getValue(item.id, item.data);
	}
});
