var EMCUIa = {
    enabled: __config__.getBool("显示EMC.是否显示"),
    size: __config__.getNumber("显示EMC.size"),
    X: __config__.getNumber("显示EMC.X"),
    Y: __config__.getNumber("显示EMC.Y")
};

const System = {
    values: {}, stars: {}, collector: {}, collector_transfer: {}, PS_recipes: {}, speed_up: {},
    setStar: function(id, storage, speed){
    	this.stars[id] = true;
    	Item.addToCreative(id, 1, 27);
    	ChargeItemRegistry.registerExtraItem(id, "EMC", storage, speed, 1, "storage", true, true);
    	Item.registerNameOverrideFunction(id, function(item, name){
    		return name+"\n§7EMC: "+ChargeItemRegistry.getEnergyStored(item, "EMC")
    		    +"/"+ChargeItemRegistry.getMaxCharge(item.id, "EMC");
    	});
    },
    getStarMaxCharge: function(id){
    	return ChargeItemRegistry.getMaxCharge(id, "EMC");
    },
    isStar: function(id){
    	return this.stars[id] || false;
    },
    chargeStar: function (cont, data){
    	var star = cont.getSlot("charge");
    	itemdata = ChargeItemRegistry.getItemData(star.id);
    	itemcharge = ChargeItemRegistry.getEnergyStored(star, "EMC");
    	maxcharge = ChargeItemRegistry.getMaxCharge(star.id, "EMC");
    	
    	if(this.isStar(star.id)){
    		if(data === true){
    			var transfer = Math.min(itemdata.transferLimit, TABLET_EMC, maxcharge - itemcharge);
    			ChargeItemRegistry.setEnergyStored(star, (itemcharge + transfer) );
    			TABLET_EMC -= transfer;
    		} else {
    			var transfer = Math.min(itemdata.transferLimit, data.emc, maxcharge - itemcharge);
    			ChargeItemRegistry.setEnergyStored(star, (itemcharge + transfer) );
    			data.emc -= transfer;
    		}
    	}
    },
    unchargeStar: function (cont, data){
    	var star = cont.getSlot("uncharge");
    	itemdata = ChargeItemRegistry.getItemData(star.id);
    	itemcharge = ChargeItemRegistry.getEnergyStored(star, "EMC");
    	maxcharge = ChargeItemRegistry.getMaxCharge(star.id, "EMC");
    	
    	if(this.isStar(star.id)){
    		if(data === true){
    			var transfer = Math.min(itemdata.transferLimit, itemcharge);
    			ChargeItemRegistry.setEnergyStored(star, (itemcharge - transfer) );
    			TABLET_EMC += transfer;
    		} else {
    			var transfer = Math.min(itemdata.transferLimit, data.max - data.emc, itemcharge);
    			ChargeItemRegistry.setEnergyStored(star, (itemcharge - transfer) );
    			data.emc += transfer;
    		}
    	}
    },
    getValue: function(id, data){
    	if(!data) data=0;
    	if(this.values[id+":"+data] != 0){
    		return this.values[id+":"+data] ? this.values[id+":"+data] : this.values[id+":"+"-1"];
    	}
    },
    setValue: function(id, data, value, isblock){
    	if(!id) return;
    	if(typeof(value) != "number") return;
    	if(isblock && id>255){
    		this.values[255-id+":"+data] = value;
    	}else{
    		this.values[id+":"+data] = value;
    	};
    },
    regRecipe: function(arg){
    	this.collector[arg.ing.id+":"+arg.ing.data] = {id: arg.out.id, emc: arg.out.emc};
    	this.collector_transfer[arg.ing.id+":"+arg.ing.data] = true;
    },
    getRecipe: function(id,data){
    	return this.collector[id+":"+data];
    },
    getCanRecipe: function(id,data){
    	return this.collector_transfer[id+":"+data];
    },
    isEnchanted: function(item){
    	if(item.extra){
    		let itemextra = item.extra.getEnchants();
    		for(i in itemextra){
    			if(itemextra[i]) return true;
    		}
    	}else return false;
    },
    PS_regRecipe: function(input, output, isSneaking){
    	this.PS_recipes[input+":"+isSneaking] = output;
    },
    PS_getRecipe: function(input, isSneaking){
    	return this.PS_recipes[input+":"+isSneaking];
    },
    addspeed_up: function(id){
    	this.speed_up[id] = true;
    },
    getspeed_up: function(id){
    	return this.speed_up[id] || false;
    },
    transfer: function(self, tile){
    	if(tile && tile.data && tile.data.emc>0 && self.data.emc<self.data.max){
    		var transfer=Math.min(self.data.max-self.data.emc, tile.data.emc,
    		    self.emc_out ? self.emc_out*(self.times2 || self.times) : Infinity,
    		    tile.emc_out ? tile.emc_out*(tile.times2 || tile.times) : Infinity);
    		self.data.emc += transfer;
    		tile.data.emc -= transfer;
    	}
    },
    getAllKnowledge: function(){
    	for(i in System.values){
    		var itm = i.split(":");
    		if(Item.isValid(itm[0], itm[1]) && !TABLET_LIST[itm[0]+":"+itm[1]]){
    			TABLET_LIST[itm[0]+":"+itm[1]] = true;
    			TABLET_ITEMS.push({id: itm[0], data: itm[1]});
    		}
    	}
    	Game.message(Translation.translate("You got all transmutation knowledges"));
    }
};


//物品UI
setUI_ = {};
var setUI = function(item, x, y, texture, func){
	this.ui = {
	    window: new UI.Window({
	        location: {x: x, y: y, width: 50, height: 50},
	        drawing: [{type: "bitmap", bitmap: "button0", x: 0, y: 0, width: 1000, height: 1000}],
	        elements: {
	            "main": {type: "slot", x: 0, y: 0, isTransparentBackground: true, visual: true, size: 1000, bitmap: texture,
	                source: {id: item.id, count: 1, data: item.data || 0}, clicker: {onClick: function(){func()} }},
	        },
	    }),
	    open: function(){
	        this.window.setAsGameOverlay(true);
	        this.window.open();
	    },
	    close: function(){this.window.close();}
	};
};


//EMC显示
if(EMCUIa.enabled){
	var EMCUI = {
	    window: new UI.Window({
	        location: {x: EMCUIa.X, y: EMCUIa.Y, width: EMCUIa.size, height: EMCUIa.size*2/3},
	        drawing: [{type: "background", color: android.graphics.Color.TRANSPARENT}],
	        elements: {
	            "close": {type: "button", x: 0, y: 0, bitmap: "clear", scale: 64, clicker: {onLongClick: function(){Game.message(Translation.translate(helps))}}},
	            "id": {type: "text", x: 0, y: 0, width: 200, height: 300, text: "ID:", font: {color: android.graphics.Color.WHITE, size: 120}},
	            "data": {type: "text", x: 0, y: 125, width: 200, height: 300, text: "data:", font: {color: android.graphics.Color.WHITE, size: 120}},
	            "emc": {type: "text", x: 0, y: 250, width: 200, height: 300, text: "emc:", font: {color: android.graphics.Color.WHITE, size: 120}},
	            "stackemc": {type: "text", x: 0, y: 375, width: 200, height: 300, text: "stack emc:", font: {color: android.graphics.Color.WHITE, size: 120}},
	            "stackemc2" :{type: "text", x: 0, y: 500, width: 200, height: 300, text: " ", font: {color: android.graphics.Color.WHITE, size: 120}},
	        },
	    }),
	    open: function(){
	    	this.window.setAsGameOverlay(true);
	    	this.window.open();
	    },
	    close: function(){this.window.close()},
	};
	
	Callback.addCallback("NativeGuiChanged", function(screenName){
		if(screenName=="in_game_play_screen" || screenName=="hud_screen"){
			EMCUI.open();
		}else{
			EMCUI.close();
		};
	});
	
	Callback.addCallback("tick", function(){
		carried = Player.getCarriedItem();
		carriedemc = System.getValue(carried.id , carried.data)||0;
		EMCUI.window.elements.get("id").onBindingUpdated("text", "ID:" + carried.id);
		EMCUI.window.elements.get("data").onBindingUpdated("text", "data:" + carried.data);
		EMCUI.window.elements.get("emc").onBindingUpdated("text", "emc:" + carriedemc);
		EMCUI.window.elements.get("stackemc2").onBindingUpdated("text", "" + carriedemc * carried.count);
	});
	
};

//能量收集器配方
Callback.addCallback("PostLoaded", function(){
	System.regRecipe({ing: {id:263,data:1}, out: {id:331,emc:32}});//木炭/红石粉
	if(VanillaItemID) System.regRecipe({ing: {id:VanillaItemID.charcoal,data:0}, out: {id:331,emc:32}});//木炭/红石粉
	if(VanillaItemID) System.regRecipe({ing: {id:VanillaItemID.charcoal,data:1}, out: {id:331,emc:32}});//木炭/红石粉
	System.regRecipe({ing: {id:331,data:0}, out: {id:263,emc:64}});//红石粉/煤炭
	System.regRecipe({ing: {id:263,data:0}, out: {id:289,emc:64}});//煤炭/火药
	System.regRecipe({ing: {id:289,data:0}, out: {id:348,emc:192}});//火药/萤石粉
	System.regRecipe({ing: {id:348,data:0}, out: {id:ItemID.fuelAlchemical,emc:128}});//萤石粉/炼金煤炭
	System.regRecipe({ing: {id:ItemID.fuelAlchemical,data:0}, out: {id:152,emc:64}});//炼金煤炭/红石块
	System.regRecipe({ing: {id:152,data:0}, out: {id:377,emc:192}});//红石块/烈焰粉
	System.regRecipe({ing: {id:377,data:0}, out: {id:173,emc:384}});//烈焰粉/煤炭块
	System.regRecipe({ing: {id:173,data:0}, out: {id:89,emc:384}});//煤炭块/萤石
	System.regRecipe({ing: {id:89,data:0}, out: {id:ItemID.fuelMobius,emc:512}});//萤石/莫比乌斯燃料
	System.regRecipe({ing: {id:ItemID.fuelMobius,data:0}, out: {id:BlockID.blockAlchemicalFuel,emc:2560}});//莫比乌斯燃料/炼金煤炭块
	System.regRecipe({ing: {id:BlockID.blockAlchemicalFuel,data:0}, out: {id:ItemID.fuelAstral,emc:3584}});//炼金煤炭块/永恒燃料
	System.regRecipe({ing: {id:ItemID.fuelAstral,data:0}, out: {id:BlockID.blockMobiusFuel,emc:10240}});//永恒燃料/莫比乌斯燃料块
	System.regRecipe({ing: {id:BlockID.blockMobiusFuel,data:0}, out: {id:BlockID.blockAstralFuel,emc:55296}});//莫比乌斯燃料块/永恒燃料块
});

//EMC计算
var THINGS_FROM_MODS = [];
for(let i in ItemID) THINGS_FROM_MODS.push(ItemID[i]);
for(let i in BlockID) THINGS_FROM_MODS.push(BlockID[i]);

var DefineEmcFromRecipe = function(){
	if(__config__.getBool("自动计算EMC")){
		for(t in THINGS_FROM_MODS){
			for(tt=0; tt<=Math.min(Item.getMaxDamage(THINGS_FROM_MODS[t]), 30); tt++){
				if(!System.getValue(THINGS_FROM_MODS[t], tt)){
					var array = Recipes.getWorkbenchRecipesByResult(THINGS_FROM_MODS[t], -1, tt);
					if(array) for(i = 0; i < array.size(); i ++){
						var arr = array.toArray()[i];
						if(arr){
							let ing = arr.getSortedEntries();
							let res = arr.result;
							var value = 0;
							if(!System.getValue(res.id, res.data) && !arr.getCallback()){
								for(s=0; s<9; s++) try{
									if(ing[s].id) value += System.getValue(ing[s].id, ing[s].data);
								}catch(e){};
								if(value) System.setValue(res.id, res.data, Math.round(value/res.count));
							}
						}
					}
				}
			}
		}
	}
};


Callback.addCallback("LevelLoaded", function (){
	DefineEmcFromRecipe();
});

Callback.addCallback("LevelSelected", function (){
	DefineEmcFromRecipe();
});

ModAPI.registerAPI("EquivalentAPI", {
	System: System,
	Rings: Rings,
	execute: function(c){return eval(c)}
});