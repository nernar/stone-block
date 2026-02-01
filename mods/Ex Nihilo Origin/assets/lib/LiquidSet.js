/*	liquidset: {
	    limit: {
	        "null": {
	            "water": 1,
	            "lava": 1,
	            "waterwitch": 1
	        },
	        "water": {
	            "water": 1
	        },
	        "lava": {
	            "lava": 1
	        }
	    },
	    mix: {
	        "water": {
	            "milk": "waterslime"
	        }
	    }
	},*/

LIBRARY({
    name: "LiquidSet",
    version: 1,
    shared: true,
    api: "CoreEngine"
});

var LiquidSet; 
(function(object) {
	LiquidSet.limit = {};
	LiquidSet.mix = {};
	LiquidSet.tileEntity = {};
	function limitSet(key, object) {
		LiquidSet.limit[key] = object
	};
	LiquidSet.limitSet = limitSet;
	function mixSet(key, object) {
		LiquidSet.mix[key] = object
	};
	LiquidSet.mixSet = mixSet;
	function limitAdd(key, key1, object) {
		LiquidSet.limit[key][key1] = object
	};
	LiquidSet.limitAdd = limitAdd;
	function getKey(object, value) {
		for (var key in object) {
			if (object[key][value]) {
				return key
			}
		}
		return null
	};
	LiquidSet.getKey = getKey;
	function mainLiquid(key, object) {
		if (!LiquidSet.tileEntity[object]) {
			LiquidSet.tileEntity[object] = {};
			LiquidSet.tileEntity[object]["mainLiquid"] = {};
			//alert(1)
		};
		//alert(LiquidSet.limit[key][object.liquidStorage.getLiquidStored()])
		if (LiquidSet.limit[key][object.liquidStorage.getLiquidStored()]) {
			LiquidSet.tileEntity[object]["mainLiquid"] = object.liquidStorage.getLiquidStored()
			//alert(object.liquidStorage.getLiquidStored())
		} else {
			LiquidSet.getKey(LiquidSet.limit, object.liquidStorage.getLiquidStored())
		}
	};
	LiquidSet.mainLiquid = mainLiquid;
	function setLimit(key, object) {
		LiquidSet.mainLiquid(key, object);
		object.liquidStorage.liquidLimits = LiquidSet.limit[key][LiquidSet.tileEntity[object]["mainLiquid"]] || {}
		//alert(LiquidSet.tileEntity[object]["mainLiquid"])
	};
	LiquidSet.setLimit = setLimit;
	function mixLiquid(key, object) {
		LiquidSet.mainLiquid(key, object);
		
		if (LiquidSet.mix[key][LiquidSet.tileEntity[object]["mainLiquid"]]) {
		//alert(LiquidSet.tileEntity[object]["mainLiquid"])
			for (i in LiquidSet.mix[key][LiquidSet.tileEntity[object]["mainLiquid"]]) {
				let amount = Math.min(object.liquidStorage.getAmount(LiquidSet.tileEntity[object]["mainLiquid"]), object.liquidStorage.getAmount(i));
				
				object.liquidStorage.addLiquid(LiquidSet.mix[key][LiquidSet.tileEntity[object]["mainLiquid"]][i], amount);
				object.liquidStorage.getLiquid(LiquidSet.tileEntity[object]["mainLiquid"], amount);
				if (object.liquidStorage.liquidAmounts[LiquidSet.tileEntity[object]["mainLiquid"]] - amount <= 0) {
					delete object.liquidStorage.liquidAmounts[LiquidSet.tileEntity[object]["mainLiquid"]]
				};
				object.liquidStorage.getLiquid(i, amount);
				if (object.liquidStorage.liquidAmounts[i] == 0) {
					delete object.liquidStorage.liquidAmounts[i]
				}
			}
		}
	};
LiquidSet.mixLiquid = mixLiquid;
} (LiquidSet || (LiquidSet = {})));




EXPORT("LiquidSet", LiquidSet);