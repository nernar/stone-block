(function LoadEMC(){
	var vanilla_item = FileTools.ReadKeyValueFile(__dir__ + "/emc/vanilla_item.js", "===");
	var vanilla_block = FileTools.ReadKeyValueFile(__dir__ + "/emc/vanilla_block.js", "===");
	for(i in vanilla_item){
		let item = i.split(":");
		if(item[0] && item[1] && vanilla_item[i]){
			if(isNaN(Number(item[0]))){
				System.setValue(VanillaItemID[item[0]], item[1]-0, eval(vanilla_item[i]));
			}else{
				System.setValue(Number(item[0]), item[1]-0, eval(vanilla_item[i]));
			}
		}
	};
	for(i in vanilla_block){
		let item = i.split(":");
		if(item[0] && item[1] && vanilla_block[i]){
			if(isNaN(Number(item[0]))){
				System.setValue(VanillaBlockID[item[0]], item[1]-0, eval(vanilla_block[i]), true);
			}else{
				System.setValue(Number(item[0]), item[1]-0, eval(vanilla_block[i]), true);
			}
		}
	};
})();

Callback.addCallback("PostLoaded", function(){
	var innercore_item = FileTools.ReadKeyValueFile(__dir__ + "/emc/innercore_item.js", "===");
	var innercore_block = FileTools.ReadKeyValueFile(__dir__ + "/emc/innercore_block.js", "===");
	for(i in innercore_item){
		let item = i.split(":");
		if(item[0] && item[1] && innercore_item[i]){
			System.setValue(ItemID[item[0]], item[1]-0, eval(innercore_item[i]));
		}
	};
	for(i in innercore_block){
		let item = i.split(":");
		if(item[0] && item[1] && innercore_block[i]){
			System.setValue(BlockID[item[0]], item[1]-0, eval(innercore_block[i]));
		}
	};
});
