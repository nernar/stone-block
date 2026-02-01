LIBRARY({
    name: "getName",
    version: 1,
    shared: true,
    api: "CoreEngine"
});
var memory = {};
__hook_method_IDRegistry_genBlockID = IDRegistry.genBlockID;
__hook_method_IDRegistry_genItemID = IDRegistry.genItemID;
var Memory = {
    run: function(name) {
        IDRegistry.genBlockID = function(string) {
            var id = __hook_method_IDRegistry_genBlockID(string);
            memory[id] = name;
            //    alert();
            return id;
        };
        IDRegistry.genItemID = function(string) {
            var id = __hook_method_IDRegistry_genItemID(string);
            memory[id] = name;
            //    alert(id);
            return id;
        };
    },
    interpret: function() {
        IDRegistry.genBlockID = __hook_method_IDRegistry_genBlockID;
        IDRegistry.genItemID = __hook_method_IDRegistry_genItemID;
    },
    getName: function(id) {
        return memory[id];
    }
};
Memory.run(__name__)
Callback.addCallback("ItemUse", function(coords, item) {
   alert(Memory.getName(item.id));
});
EXPORT("memory", memory);
EXPORT("Memory", Memory);