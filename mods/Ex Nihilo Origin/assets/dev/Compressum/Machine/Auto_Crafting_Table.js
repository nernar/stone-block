IDRegistry.genBlockID("ex_auto_crafting_table");
Block.createBlock("ex_auto_crafting_table", [{
    name: "Auto Crafting Table",
    texture: [
        ["ex_side", 0],
        ["ex_compressor_top", 0],
        ["ex_side", 0],
        ["ex_side", 0],
        ["ex_side", 0],
        ["ex_side", 0]
    ],
    inCreative: true
}]);

var auto_crafting_tableGui = {
    standart: {
        header: {text: {text: Translation.translate("Auto Crafting Table")}},
        inventory: {standart: true},
        background: {standart: true}
    },
    drawing: [
        {type: "bitmap", x: 680, y: 140, bitmap: "arrow_0", scale: 3},
        {type: "bitmap", x: 858, y: 78, bitmap: "ex_energyground", scale: 3}
    ],
    elements: {
        "arrowScale": {type: "scale", x: 680, y: 140, direction: 0, value: 0.5, bitmap: "arrow_1", scale: 3},
        "energyScale": {type: "scale", x: 860, y: 80, bitmap: "ex_energy", scale: 3, direction: 1}
    }
};

for (var i = 0; i < 9; i++) {
    auto_crafting_tableGui.elements["slot" + i] = {
        type: "slot",
        x: 400 + (i % 3) * 60,
        y: 75 + parseInt(i / 3) * 60,
        size: 60
    };
};
for (var i = 0; i < 12; i++) {
    auto_crafting_tableGui.elements["Slot" + i] = {
        type: "slot",
        x: 400 + (i % 6) * 60,
        y: 270 + parseInt(i / 6) * 60,
        size: 60
    };
};
auto_crafting_tableGui.elements["result"] = {type: "slot", x: 770, y: 135, size: 60};
auto_crafting_tableGui = new UI.StandartWindow(auto_crafting_tableGui);

ModAPI.addAPICallback("ICore",
function(api) {
    api.Machine.registerElectricMachine(BlockID.ex_auto_crafting_table, {
        useNetworkItemContainer: true,
        defaultValues: {
            worktime: 0,
            worklimit: 200,
            isWorking: false,
            energy: 0,
            energy_storage: 20000,
            decreaseCount: 0
        },
        tick: function() {
            var result = Recipes.getRecipeResult(this.container.asLegacyContainer());
            StorageInterface.checkHoppers(this);
            var resultSlot = this.container.getSlot("result");
            var recipe = Recipes.getRecipeByField(this.container.asLegacyContainer());
            var callback = recipe && recipe.getCallback();
            if (this.data.energy > 0 && !callback && this.canRun() && result && (resultSlot.id == 0 || (result.id == resultSlot.id && result.data == resultSlot.data && resultSlot.count + result.count < Item.getMaxStack(result.id)))) {
                this.data.worktime += 1;
                this.data.energy -= 4;
                if (this.data.worktime >= 200) {
                    this.data.worktime = 0;
                    resultSlot.setSlot(result.id, resultSlot.count + result.count, result.data);
                    this.decreaseItem();
                };
            };
            if (!result || !this.canRun()) {
                this.data.worktime = 0;
            };
            var energyStorage = this.getEnergyStorage();
            this.container.setScale("arrowScale", this.data.worktime / 200);
            this.container.setScale("energyScale", this.data.energy / energyStorage);
            this.container.sendChanges();
        },
        canRun: function() {
            return this.decreaseItem(true);
        },
        decreaseItem: function(bool) {
            var item = {};
            for (var slotId = 0; slotId < 9; slotId++) {
                var slot = this.container.getSlot("slot" + slotId);
                if (slot.id != 0) {
                    if (!item[slot.id + ":" + slot.data]) {
                        item[slot.id + ":" + slot.data] = 0;
                        item[slot.id + ":" + slot.data]++;
                    } else if (item[slot.id + ":" + slot.data]) {
                        item[slot.id + ":" + slot.data]++;
                    };
                };
            };
            return this.setInputSlot(bool, item);
        },
        setInputSlot: function(bool, item) {
            var vitem = {};
            for (var slotId = 0; slotId < 12; slotId++) {
                var inputSlot = this.container.getSlot("Slot" + slotId);
                for (var group in item) {
                    var id = group.split(":")[0];
                    var data = group.split(":")[1];
                    if (inputSlot.id == id && inputSlot.data == data && inputSlot.id != 0) {
                        if (!vitem[group]) {
                            vitem[group] = 0;
                            vitem[group] += inputSlot.count;
                        } else if (vitem[group]) {
                            vitem[group] += inputSlot.count;
                        };
                    };
                };
            };
            var boolean = false;
            for (var group in item) {
                if (vitem[group] >= item[group]) {
                    boolean = true;
                } else {
                    boolean = false;
                };
            };
            if (boolean && !bool) {
                for (var group in item) {
                    var id = group.split(":")[0];
                    var data = group.split(":")[1];
                    this.setInputSlotCount(id, data, item[group]);
                };
            };
            return boolean;
        },
        setInputSlotCount: function(id, data, count) {
			for (var slotid = 0; slotid < 12; slotid++) {
				var slot = this.container.getSlot("Slot" + slotid);
				if (slot.id == id && slot.data == data && slot.count > 0) { 
				    (slot.count - 1 == 0) ? slot.setSlot(0, 0, 0) : slot.setSlot(id, slot.count - 1, data);
					this.data.decreaseCount += 1;
					break;
				};
			};
			if (this.data.decreaseCount < count) {
				this.setInputSlotCount(id, data, count);
			} else {
				this.data.decreaseCount = 0;
			};
		},
        getEnergyStorage: function() {
            return this.data.energy_storage;
        },
        energyReceive: api.Machine.basicEnergyReceiveFunc,
        getScreenByName: function(screenName) {
            return auto_crafting_tableGui;
        },
        getScreenName: function(screenName) {
            return "auto_crafting_tableGui";
        }
    });
    StorageInterface.createInterface(BlockID.ex_auto_crafting_table, {
        slots: {
            "Slot^0-11": {input: true},
            "result": {output: true}
        }
    });
});