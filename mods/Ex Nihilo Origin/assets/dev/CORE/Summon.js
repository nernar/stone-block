//api updates
(function() {
    function ItemEntitys(entityId, innerId, type, prototype) {
        this.entityId = entityId;
        this.innerId = innerId;
        this.type = type;
        this.coords = prototype.coords;
        this.tick = function() {};
        var self = this;
        Callback.addCallback("LocalTick", function() {
            self.tick();
        });
    };
    SummonAPI = {
        setItemEntityAddedCallbackOpen: function(id) {
            var ItemEntity = {};
            Callback.addCallback("EntityAdded", function(entity) {
                let tag = Entity.getCompoundTag(entity);
                let tags = tag.toScriptable();
                let pos = tags.Pos;
                var coords = {
                    x: pos[0],
                    y: pos[1],
                    z: pos[2]
                };
                var item = tags.Item;
                if (item) {
                    var count = item.Count;
                    var namespace = item.Name;
                    var inId = namespace.split(":")[1];
                    if (typeof(id) == "number" && inId == (id >= 8192 ? "block_" : "item_") + IDRegistry.getNameByID(id)) {
                        Callback.invokeCallback("ItemEntityAdded", id, count, entity, tag, coords);
                    };
                    if (namespace == id) {
                        Callback.invokeCallback("ItemEntityAddedVanilla", namespace, count, entity, tag, coords);
                    };
                };
            });
            Callback.addCallback("EntityRemoved", function(entity) {
                let tag = Entity.getCompoundTag(entity);
                let tags = tag.toScriptable();
                var item = tags.Item;
                if (item) {
                    var count = item.Count;
                    var namespace = item.Name;
                    var inId = namespace.split(":")[1];
                    if (typeof(id) == "number" && inId == (id >= 8192 ? "block_" : "item_") + IDRegistry.getNameByID(id)) {
                        Callback.invokeCallback("ItemEntityRemoved", id, count, entity, tag);
                    };
                    if (namespace == id) {
                        Callback.invokeCallback("ItemEntityRemovedVanilla", namespace, count, entity, tag);
                    };
                };
            });
        },
        setAge: function(entity, age) {
            let tag = Entity.getCompoundTag(entity);
            tag.remove("Age");
            tag.putInt("Age", age);
            Entity.setCompoundTag(entity, tag);
        },
        spawnVindicator: function(x, y, z) {
            Commands.exec("summon vindicator " + x + " " + y + " " + z);
        },
        spawnLightningBolt: function(x, y, z) {
            Commands.exec("summon lightning_bolt " + x + " " + y + " " + z);
        },
        spawnCow: function(x, y, z) {
            Commands.exec("summon cow " + x + " " + y + " " + z);
        },
        spawnItemEntity: function(x, y, z, id, count, data) {
            let inId = "minecraft:" + ((id >= 8192 ? "block_" : "item_") + IDRegistry.getNameByID(id));
            let InData = data;
            let InCount = count;

            //let ItemEntityId = Entity.spawn(x, y, z, 64);
            //let tag = Entity.getCompoundTag(ItemEntityId);

            /*var itemTag = new NBT.CompoundTag();
        itemTag.putString("Name", inId);
        itemTag.putInt("Count", InCount);
        itemTag.putInt("Damage", InData);
        itemTag.putInt("WasPickedUp", 0);
        
        if (id >= 8192) {
            var blockTag = new NBT.CompoundTag();
            blockTag.putString("name", inId);
            var statesTag = new NBT.CompoundTag();
            statesTag.putString("color", "white");
            blockTag.putCompoundTag("states", statesTag);
            blockTag.putInt("version", 17432626);
            itemTag.putCompoundTag("Block", blockTag);
        };
        
        tag.remove("Item");
        tag.putCompoundTag("Item", itemTag);
        
        Entity.setCompoundTag(ItemEntityId, tag);
        */
            //alert(JSON.stringify(tag.toScriptable()));
        }
    };
})();