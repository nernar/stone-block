var TrophyAPI = {
    Trophy: {},
    addTrophyForBlock: function(blockId, blockData, id, data, chance, min, max) {
        var item = {
            id: id,
            data: data,
            chance: chance,
            minCount: min,
            maxCount: max
        };
        if (!this.Trophy[blockId + ":" + blockData]) {
            this.Trophy[blockId + ":" + blockData] = {};
        };
        this.Trophy[blockId + ":" + blockData][id + ":" + data] = item;
    },
    getTrophyByBlockId: function(blockId, blockData) {
        return this.Trophy[blockId + ":" + blockData];
    },
    setTrophyAtCoords: function(x, y, z, blockSource) {
        let id = blockSource.getBlockId(x, y, z);
        let data = blockSource.getBlockData(x, y, z);
        var Trophy = this.getTrophyByBlockId(id, data);
        var Storage = StorageInterface.getStorage(blockSource, x, y, z);
        var slots = Storage && Storage.getInputSlots();
        var setTimes = {};
        var former = {};
        if (slots) {
            for (let l = 0; l < slots.length; l++) {
                var slot = Storage.getSlot(slots[l]);
                if (slot.id == 0) {
                    for (let item in Trophy) {
                        var items = Trophy[item];
                        var chance = items.chance;
                        var m = 0.7;
                        var count = items.minCount;
                        while (items.minCount < items.maxCount) {
                            items.minCount += 0.2;
                            count += 0.12;
                            if (Math.random() < m) {
                                break;
                            };
                            m += 0.1;
                        };
                        count = Math.floor(count);
                        if (Math.floor(Math.random() * 100) < chance && items.id != former.id) {
                            former.id = items.id;
                            former.data = items.data;
                            former.count = count;
                            former.chance = chance;
                            if (!setTimes[items.id + ":" + items.data]) {
                                setTimes[items.id + ":" + items.data] = 1;
                            } else {
                                setTimes[items.id + ":" + items.data] += 1;
                            };
                            if (items.id && count && (items.data || 0)) Storage.setSlot(slots[l], items.id, count, items.data, null);
                            break;
                        };
                        if (items.id == former.id) {
                            if (Math.floor(Math.random() * 100) < (former.chance / (2 * setTimes[items.id + ":" + items.data]))) {
                                former.id = items.id;
                                former.data = items.data;
                                former.count = count;
                                former.chance = chance;
                                setTimes[items.id + ":" + items.data] += 1;
                                if (items.id && count && (items.data || 0)) Storage.setSlot(slots[l], items.id, count, items.data, null);
                                break;
                            };
                        };
                    };
                };
            };
        };
    }
};

TrophyAPI.addTrophyForBlock(VanillaBlockID.shulker_box, 8, VanillaBlockID.end_portal_frame, 0, 1, 2, 3);
TrophyAPI.addTrophyForBlock(VanillaBlockID.shulker_box, 8, VanillaItemID.ender_pearl, 0, 3, 1, 3);
TrophyAPI.addTrophyForBlock(VanillaBlockID.shulker_box, 8, VanillaItemID.golden_apple, 0, 1, 1, 1);
TrophyAPI.addTrophyForBlock(VanillaBlockID.shulker_box, 8, VanillaItemID.iron_ingot, 0, 7, 1, 3);
TrophyAPI.addTrophyForBlock(VanillaBlockID.shulker_box, 8, VanillaItemID.gold_ingot, 0, 4, 1, 2);
//TrophyAPI.addTrophyForBlock(VanillaBlockID.shulker_box, 8, VanillaItemID.flint_and_steel, 0, 3, 1, 1);
//TrophyAPI.addTrophyForBlock(VanillaBlockID.shulker_box, 8, VanillaItemID.cake, 0, 6, 1, 1);
TrophyAPI.addTrophyForBlock(VanillaBlockID.shulker_box, 8, VanillaItemID.dragon_breath, 0, 0.8, 1, 1);
TrophyAPI.addTrophyForBlock(VanillaBlockID.shulker_box, 8, VanillaItemID.horsearmorleather, 0, 0.8, 1, 1);
