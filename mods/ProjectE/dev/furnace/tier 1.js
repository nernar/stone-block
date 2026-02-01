IDRegistry.genBlockID("dmfurnace");
Block.createBlockWithRotation("dmfurnace", [
    {name: "Dark matter furnace", texture: [["dmBlock", 0], ["dmBlock", 0], ["dmBlock", 0],
        ["dmFurn", 0], ["dmBlock", 0], ["dmBlock", 0]], inCreative: true},
    {name: "Dark matter furnace", texture: [["dmBlock", 0], ["dmBlock", 0], ["dmBlock", 0],
        ["dmFurn", 1], ["dmBlock", 0], ["dmBlock", 0]], inCreative: false}
]);

Callback.addCallback("PostLoaded",function(){
if(hard_mode){
	Recipes.addShaped({id: BlockID.dmfurnace, count: 1, data: 0},
	["ddd",
	 "kfk",
	 "drd"],
	["k", ItemID.kleinStar2, 0, "r", BlockID.antimatterRelay1, 0, "d", ItemID.darkMatter, 0, "f", 61, 0]);
}else{
	Recipes.addShaped({id: BlockID.dmfurnace, count: 1, data: 0},
	["ddd",
	 "dfd",
	 "dfd"],
	["d", ItemID.darkMatter, 0, "f", 61, 0]);
}
});


var dmfurnUI = (function(){
	var bit = 600/170;
	var base = {x: 360, y: 90};
	var elem = {
	    "input": {type: "slot", x: base.x+bit*44, y: base.y+bit*12, size: bit*18, isTransparentBackground: true},
	    "output": {type: "slot", x: base.x+bit*100, y: base.y+bit*26, size: bit*26,
	        isTransparentBackground: true, isValid: function(){return false}},
	    "fuel": {type: "slot", x: base.x+bit*44, y: base.y+bit*48, size: bit*18, isTransparentBackground: true},
	    "charge": {type: "slot", x: base.x+bit*62, y: base.y+bit*48, bitmap: "starCharge", size: bit*18},
	    "uncharge": {type: "slot", x: base.x+bit*80, y: base.y+bit*48, bitmap: "unstarCharge", size: bit*18},
	    "progScale": {type: "scale", x: base.x+bit*67, y: base.y+bit*31, bitmap: "furnace_0", scale: bit, direction: 0},
	    "burn": {type: "scale", x: base.x+bit*46, y: base.y+bit*33, bitmap: "furnace_1", scale: bit, direction: 1},
	    "text": {type: "text", x: 325, y: 35, width: 100, height: 30, text: "EMC"}
	};
	for(i=0; i<8; i++){
		elem["input"+i] = {type: "slot", x: base.x+bit*(8+i%2*18), y: base.y+bit*(3+Math.floor(i/2)*18), size: bit*18,
		    isTransparentBackground: true};
		elem["output"+i] = {type: "slot", x: base.x+bit*(126+i%2*18), y: base.y+bit*(3+Math.floor(i/2)*18), size: bit*18,
		    isTransparentBackground: true, isValid: function(){return false}};
	};
	return new UI.StandartWindow({
	    standart: {
	        header: {text: {text: Translation.translate("Furnace")}},
	        inventory: {standart: true},
	        background: {standart: true},
	        minHeight: 1000/16*9*1.5-500/屏幕长宽比-90
	    },
	    params: {slot: "clear"},
	    drawing: [{type: "bitmap", x: base.x, y: base.y, bitmap: "dmfurnace", scale: bit}],
	    elements: elem
	});
})();


System.addspeed_up(BlockID.dmfurnace);
TileEntity.registerPrototype(BlockID.dmfurnace, {
    defaultValues: {
        prog: 0, emc: 0, max: __config__.getBool("无存储上限") ? 1e16 : 1200000
    },
    times: 1, times2: 1, fine: 20,
    getGuiScreen: function(){
    	return dmfurnUI;
    },
    getTransportSlots: function(){
    	var inputC=["input"], outputC=["output"];
    	for(i=0; i<8; i++){
    		inputC.push("input"+i);
    		outputC.push("output"+i);
    	};
    	return {input: inputC, output: outputC};
    },
    tick: function(){
    	this.times2 = this.times;
    	StorageInterface.checkHoppers(this);
    	System.chargeStar(this.container, this.data);
    	System.unchargeStar(this.container, this.data);

    	var ths=this, coords={x: this.x, y: this.y, z: this.z};
    	var res, slotInput = [], slotOutput = [];
    	var slotFuel = this.container.getSlot("fuel");
    	for(i=0; i<8; i++){
    		slotInput[i] = this.container.getSlot("input"+i);
    		slotOutput[i+1] = this.container.getSlot("output"+i);
    	}
    	slotInput[8] = this.container.getSlot("input");
    	slotOutput[0] = this.container.getSlot("output");
    	res = Recipes.getFurnaceRecipeResult(slotInput[8].id, slotInput[8].data);

    	this.container.setText("text", "EMC: "+Math.floor(this.data.emc));
    	this.container.setScale("progScale", this.data.prog/this.fine);
    	this.container.setScale("burn", this.data.emc<this.fine ? this.data.emc/this.fine : 1);

    	var value = System.getValue(slotFuel.id, slotFuel.data);
    	while(value && this.data.emc+value<=this.data.max && slotFuel.id != 0){
    		this.data.emc += value;
    		slotFuel.count--;
    		this.container.validateAll();
    	};

    	if(this.data.emc<this.data.max){
    		DIRS.map(function(dir){
    			let tile = World.getTileEntity(coords.x+dir.x, coords.y+dir.y, coords.z+dir.z);
    			let block = World.getBlock(coords.x+dir.x, coords.y+dir.y, coords.z+dir.z);
    			if(block.id==BlockID.energyCollector1 || block.id==BlockID.energyCollector2 || block.id==BlockID.energyCollector3 ||
    			    block.id==BlockID.antimatterRelay1 || block.id==BlockID.antimatterRelay2 || block.id==BlockID.antimatterRelay3){
    				System.transfer(ths, tile);
    			};
    		});
    	};

    	if(this.data.prog<this.fine && res && res.id){
    		let temp = this.data.prog;
    		temp += this.times2;
    		if(temp > this.fine) temp = temp%this.fine+this.fine;
    		if(this.data.emc >= (temp-this.data.prog)*Math.floor(20/this.fine)){
    			this.data.emc -= (temp-this.data.prog)*Math.floor(20/this.fine);
    			this.data.prog = temp;
    		}else{
    			this.data.prog += this.data.emc;
    			this.data.emc = 0;
    		};
    		temp = 0;
    	};

    	for(i=0; i<9; i++){
    		if(res && res.id && this.data.prog>=this.fine &&
    		    (slotOutput[i].id==0 || (slotOutput[i].id==res.id && slotOutput[i].data==res.data &&
    		         slotOutput[i].count<Item.getMaxStack(slotOutput[i].id, slotOutput[i].data) && !slotOutput[i].extra))){
    			this.data.prog=this.data.prog%this.fine;
    			slotOutput[i].id=res.id;
    			slotOutput[i].count++;
    			if(Math.random()<=0.5){
    				if(slotOutput[i].count<Item.getMaxStack(slotOutput[i].id, slotOutput[i].data)) slotOutput[i].count++;
    				else for(j=i+1; j<8; j++){
    					if(slotOutput[j].id==0 || (slotOutput[j].id==res.id && slotOutput[j].data==res.data &&
    					    slotOutput[j].count<Item.getMaxStack(slotOutput[j].id, slotOutput[j].data) && !slotOutput[j].extra)){
    						slotOutput[j].count++;
    						j = 8;
    					}
    				};
    			};
    			slotInput[8].count--;
    			this.container.validateAll();
    			break;
    		}
    	};

    	if(slotInput[8].id == 0 || (res && res.id && slotInput[8].count<Item.getMaxStack(slotInput[8].id, slotInput[8].data))){
    		if(!slotInput[8].extra) for(i=0; i<8; i++){
    			if(slotInput[i].id != 0 && (Recipes.getFurnaceRecipeResult(slotInput[i].id, slotInput[i].data) || {}).id &&
    			    (slotInput[8].id == 0 || (slotInput[i].id == slotInput[8].id && slotInput[i].data == slotInput[8].data && !slotInput[i].extra))){
    				let transfer = (slotInput[8].id==0) ? slotInput[i].count : Math.min(slotInput[i].count,
    				    Item.getMaxStack(slotInput[8].id, slotInput[8].data) - slotInput[8].count);
    				slotInput[8].id=slotInput[i].id;
    				slotInput[8].data=slotInput[i].data;
    				slotInput[8].count += transfer;
    				slotInput[i].count -= transfer;
    				this.container.validateAll();
    				break;
    			}
    		};
    	};

    	this.times = 1;
  }
});

StorageInterface.createInterface(BlockID.dmfurnace, {
	slots: {
		"input": {input: true},
		"input^0-7": {input: true},
		"output": {output: true},
		"output^0-7": {output: true},
	},
	isValidInput: function(item){
		return Boolean((Recipes.getFurnaceRecipeResult(item.id, item.data) || {}).id);
	}
});
