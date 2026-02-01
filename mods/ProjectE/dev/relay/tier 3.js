IDRegistry.genBlockID("antimatterRelay3");
Block.createBlockWithRotation("antimatterRelay3", [
	 {name: "Anti-matter Relay III", texture: [
	   ["relayOther",0],
	   ["relayTop",2],
	   ["relayOther",0],
	   ["relayFront",0],
	   ["relayOther",0],
	   ["relayOther",0],
  ],inCreative: true}
], "opaque");
SetDescription(BlockID.antimatterRelay3, Translation.translate("§3Convert the items you put into it into EMC.")+"\n"+
    Translation.translate("§3Draw the EMC from the adjacent energy collector."));

Callback.addCallback("PostLoaded",function(){
if(hard_mode){
	Recipes.addShaped({id: BlockID.antimatterRelay3, count: 1, data: 0}, 
	["odo", 
	 "kfk",
	 "ooo"],
	["k", ItemID.kleinStar3, 0, "o", 49, 0, "f", BlockID.antimatterRelay2, 0, "d", ItemID.redMatter, 0]);
}else{
	Recipes.addShaped({id: BlockID.antimatterRelay3, count: 1, data: 0}, 
	["odo", 
	 "ofo",
	 "ooo"],
	["o", 49, 0, "f", BlockID.antimatterRelay2, 0, "d", ItemID.redMatter, 0]);
}
});

System.addspeed_up(BlockID.antimatterRelay3);
TileEntity.registerPrototype(BlockID.antimatterRelay3, {
    defaultValues: {emc: 0, max: __config__.getBool("无存储上限") ? 1e16 : 5000000 },
    getGuiScreen: function() { return relayUI; },
    emc_out: 80/20, times: 1, times2: 1,
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

StorageInterface.createInterface(BlockID.antimatterRelay3, {
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
