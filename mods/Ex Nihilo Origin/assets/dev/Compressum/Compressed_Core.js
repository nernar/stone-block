//var UIbase = UI.getScreenHeight();
ToolType.CompressedHammer = {
	damage: 2,
	blockTypes: ["stone", "dirt"],
	onAttack: function(item) {
		if (item.data > Item.getMaxDamage(item.id)) {
			item.id = item.data = item.count = 0;
		};
	}
};
var CompressedCore = {
	isHammer: {},
	machine: {},
	addBlock: function(metal, Metal, texture) {
		IDRegistry.genBlockID("compressed" + metal);
		Block.createBlock("compressed" + metal, [{
			name: "Compressed " + Metal,
			texture: [[texture, 0]],
			inCreative: true
		}])
	},
	HammerRecipes: function(ID, id) {
		Recipes.addShaped({id: ID, count: 1, data: 0}, ["aaa", "aaa", "aaa"], ["a", id, 0])
	},
	BlockRecipes: function(ID, id) {
		Recipes.addShaped({id: ID, count: 1, data: 0}, ["aaa", "aaa", "aaa"], ["a", id, 0])
	},
	transformation: function(blockid, id, count, data) {
		var fun = Block.getDropFunction(blockid);
        Block.registerDropFunctionForID(blockid, function(coords, blockId, blockData, level, enchant, item, blockSource) {
            if (EXCore.isHammer[item.id]) {
                return [[id, count, data]];
            } else {
                return fun && fun(coords, blockId, blockData, level, enchant, item, blockSource);
            };
        });
	},
	addHammer: function(id) {
		this.isHammer[id]={}
	},
	setMachineInPut: function(machine, object) {
		this.machine[machine] = object
	},
	getMachineInPut: function(machine, id, data) {
		return eval(this.machine[machine][id + ":" + data])
	},
	machineAdd: function(machine, id, data, object) {
		this.machine[machine][id + ":" + data] = object
	},
}