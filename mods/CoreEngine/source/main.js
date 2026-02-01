Game.isDedicatedServer = Game.isDedicatedServer || function () {
    return false;
};
var BlockPos = WRAP_JAVA("com.core.api.mcpe.api.BlockPos");
var Vec2 = WRAP_JAVA("com.core.api.mcpe.api.Vec2");
var Vec3 = WRAP_JAVA("com.core.api.mcpe.api.Vec3");
var ChunkPos = WRAP_JAVA("com.core.api.mcpe.api.ChunkPos");
var Parameter = WRAP_JAVA("com.core.api.module.types.Parameter");
var Injector = WRAP_JAVA("com.core.api.Injector");
var ToolTip = WRAP_JAVA("com.core.api.item.ToolTip");
var NativeSaver = WRAP_JAVA("com.core.api.engine.NativeSaver");
var FileUtils = WRAP_JAVA("com.core.api.engine.FileUtils");
var CustomWarp = WRAP_JAVA("com.core.api.engine.CustomWarp");
var Warp = CustomWarp.init();
var Actor = WRAP_JAVA("com.core.api.mcpe.entity.Actor");
var Mob = WRAP_JAVA("com.core.api.mcpe.entity.Mob");
var NativePlayer = WRAP_JAVA("com.core.api.mcpe.entity.Player");
var LocalPlayer = WRAP_JAVA("com.core.api.mcpe.entity.LocalPlayer");
var ServerPlayer = WRAP_JAVA("com.core.api.mcpe.entity.ServerPlayer");
var ItemStack = WRAP_JAVA("com.core.api.mcpe.item.ItemStack");
var NativeVar = WRAP_JAVA("com.core.api.engine.NativeVar");
var ActorDamageCause = WRAP_JAVA("com.core.api.entity.ActorDamageCause");
var NativeUi = WRAP_JAVA("com.core.api.engine.ui.NativeUi");
var ImageElement = WRAP_JAVA("com.core.api.engine.ui.types.ImageElement");
var TextElement = WRAP_JAVA("com.core.api.engine.ui.types.TextElement");
var MeshElement = WRAP_JAVA("com.core.api.engine.ui.types.MeshElement");
var HookManager = WRAP_JAVA("com.core.api.module.HookManager");
if (__config__.getBool("membory_display") == true) {
    var Membory_1 = new UI.Window({
        drawing: [
            { type: "color", color: android.graphics.Color.argb(0, 0, 0, 0) }
        ],
        elements: {
            "membory": { type: "text", x: 0, y: 0, text: "", size: 70, font: { color: android.graphics.Color.argb(1, 1, 1, 1) } }
        }
    });
    Membory_1.setAsGameOverlay(true);
    Membory_1.setTouchable(false);
    Membory_1.open();
    var time_1 = 1000 / 30;
    Threading.initThread("membory-information-update", function () {
        var context = UI.getContext();
        while (true) {
            java.lang.Thread.sleep(time_1);
            var free = Math.floor(context.getFreeMemory() / 1024 / 1024);
            var total = Math.floor(context.getTotalMemory() / 1024 / 1024);
            var float = free / total;
            var obj = Membory_1.content.elements["membory"];
            if (float >= .85)
                obj.font.color = android.graphics.Color.RED;
            else if (float >= .6)
                obj.font.color = android.graphics.Color.YELLOW;
            else
                obj.font.color = android.graphics.Color.GREEN;
            obj.text = free + "/" + total;
            Membory_1.forceRefresh();
        }
    });
}
var Helper = WRAP_NATIVE("HelperCoreUtility");
// let ui = new NativeUi([
//     new TextElement({
//         x: 100,
//         y: 100,
//         text: "Белевич где двери"
//     })
// ]);
// let size = 0;
// ui.setListener({
//     update(ui, value){
//         size += size + (5 * value);
//         if(size >= 1000)
//             size = 100;
//         ui.getElements()[0].size = size;
//     },
//     touch(){
//         return true;
//     }
// });
// ui.open();
/*
Любопытной варваре нос аторвали
И хуй тоже оторвут, если ещё раз сюда залезишь
let BlockSource_ = BlockSource;
BlockSource = new Warp("com.zhekasmirnov.apparatus.mcpe.NativeBlockSource");
function createBlockSource(region){
    try {
        let object = new CustomWarp.JsObject(region);
        object.test = function(){
            alert("hello");
        };
        return object;
    } catch (error) {
        Logger.error(error.toString());
        return region;
    }
}
try {
    BlockSource.staticTest = function(player){
        alert("createBlockSource");
        return createBlockSource(BlockSource_.getDefaultForActor(player));
    };
} catch (error) {
    Logger.error(error.toString());
}*/ 
var NativeAPIJava = WRAP_JAVA("com.core.api.module.NativeAPI");
var ConversionType = {
    ITEM: 0,
    BLOCK: 1
};
var NativeAPI = {
    dynamicToStatic: function (id, type) {
        return Number(NativeAPIJava.dynamicToStatic(id, type || ConversionType.ITEM));
    },
    staticToDynamic: function (id, type) {
        return Number(NativeAPIJava.staticToDynamic(id, type || ConversionType.ITEM));
    },
    getActorID: function (ptr) {
        return NativeAPIJava.getActorID(ptr);
    },
    getXBlockPos: function (ptr) {
        return Number(NativeAPIJava.getXBlockPos(ptr));
    },
    getYBlockPos: function (ptr) {
        return Number(NativeAPIJava.getYBlockPos(ptr));
    },
    getZBlockPos: function (ptr) {
        return Number(NativeAPIJava.getZBlockPos(ptr));
    },
    getActorById: function (ptr) {
        return NativeAPIJava.getActorById(ptr);
    }
};
var ItemsUtilJava = WRAP_JAVA("com.core.api.module.ItemsUtil");
var ItemsUtil = {
    api: WRAP_JAVA("com.core.api.mcpe.item.Item"),
    getItemById: function (id) {
        return ItemsUtilJava.getItem(id);
    },
    overrideName: function (id, data, name) {
        this.api.overrideName(id, data, name);
    },
    overrideArmorValue: function (id, value) {
        this.api.overrideArmorValue(id, value);
    },
};
var CustomEntityJava = WRAP_JAVA("com.core.api.entity.CustomEntity");
var EntityRegister = {
    setHandlerTick: function (name, func) {
        CustomEntityJava.setHandlerTick(name, func);
    }
};
var Gui = {
    animationDestroy: function (x, y, z, speed) {
        GlobalContext.getClientInstance().renderDestroyBlock(x, y, z, speed || 1);
    }
};
var TickingAreasManagerJava = WRAP_JAVA("com.core.api.level.area.TickingAreasManager");
var TickingAreasManager = {
    hasActiveAreas: function () {
        return TickingAreasManagerJava.hasActiveAreas() == 1;
    },
    addArea: function (dimension, name, x, y, z, range) {
        TickingAreasManagerJava.addArea(dimension, name, x, y, z, range);
    },
    addAreaPostions: function (dimension, name, x, y, z, xx, yy, zz) {
        TickingAreasManagerJava.addAreaPostions(dimension, name, x, y, z, xx, yy, zz);
    },
    addEntityArea: function (dimension, ent) {
        TickingAreasManagerJava.addEntityArea(dimension, ent);
    },
    countStandaloneTickingAreas: function () {
        return Number(TickingAreasManagerJava.countStandaloneTickingAreas());
    },
    countPendingAreas: function (dimension) {
        return Number(TickingAreasManagerJava.countPendingAreas(dimension));
    }
};
var GlobalContext = {
    api: WRAP_JAVA("com.core.api.innnercore.GlobalContext"),
    getClientInstance: function () {
        return this.api.getClientInstance();
    },
    getServerLevel: function () {
        return this.api.getLevelServer();
    },
    getLevel: function () {
        return this.api.getLevel();
    },
    getLocalPlayer: function () {
        return this.api.getLocalPlayer();
    },
    getServerPlayer: function () {
        return this.api.getServerPlayer();
    },
    getDimension: function () {
        return this.api.getDimension();
    }
};
var BlockUtilsJava = WRAP_JAVA("com.core.api.innnercore.BlockUtils");
BlockUtilsJava.register(5, new ICRender.Model(new BlockRenderer.Model(5, 0)));
var BlockUtils = {
    getBlockById: function (id) {
        return BlockUtilsJava.getBlockById(id);
    },
    getBlockStateForIdData: function (id, data) {
        return BlockUtilsJava.getBlockStateForIdData(id, data);
    }
};
var BlockRegistry = {
    api: WRAP_JAVA("com.core.api.engine.BlockRegistry"),
    registerDoorBlock: function (uid, name, texture) {
        this.api.registerDoorBlock(BlockID[uid], uid, name, texture.name, texture.data | 0);
    }
};
var WorldJavaAPI = WRAP_JAVA("com.core.api.mcpe.World");
World.addWorldToCache = function (path) {
    return WorldJavaAPI.addWorldToCache(path);
};
World.updateWorlds = function () {
    return WorldJavaAPI.updateWorlds();
};
World.getWorldsCount = function () {
    return WorldJavaAPI.getWorldsCount();
};
World.setFlatGenerator = function (json) {
    return WorldJavaAPI.setFlatGenerator(json);
};
World.setFlatGenerator('{"biome_id":1,"block_layers":[{"block_data":0,"block_id":7,"count":1},{"block_data":0,"block_id":3,"count":2},{"block_data":0,"block_id":2,"count":1}],"encoding_version":3,"structure_options":null}');
if (Game.isDedicatedServer())
    var ScalesJava = WRAP_JAVA("com.core.api.module_server.Scales");
else
    var ScalesJava = WRAP_JAVA("com.core.api.module.Scales");
Network.addClientPacket("scales.setValue", function (data) {
    ScalesJava.getScaleByPlayer(data.player, data.name).setValue(data.value);
});
Network.addClientPacket("scales.setMode", function (data) {
    ScalesJava.setServerMode(data.mode);
});
Callback.addCallback("EntityDeath", function (entity) {
    var players = Network.getConnectedPlayers();
    if (players.indexOf(entity) != -1) {
        var scales = ScalesJava.getScales();
        for (var i in scales) {
            var name = scales[i];
            if (ScalesJava.getScaleByName(name).isReset())
                ScalesJava.getScaleByPlayer(entity, name).reset();
        }
    }
});
Callback.addCallback("ServerPlayerLoaded", function (player) {
    var scales = ScalesJava.getScales();
    var client = Network.getClientForPlayer(player);
    if (client) {
        for (var i in scales)
            Scales.getScaleByPlayer(player, scales[i]).send();
        var packet = { mode: Game.isDedicatedServer() };
        client.send("scales.setMode", packet);
    }
    ;
});
var PlayerScale = /** @class */ (function () {
    function PlayerScale(java_class, player, name) {
        this.java_class = java_class;
        this.player = player;
        this.name = name;
    }
    PlayerScale.prototype.getValue = function () {
        return this.java_class.getValue();
    };
    PlayerScale.prototype.send = function (value, client) {
        if (value === void 0) { value = this.getValue(); }
        if (client === void 0) { client = Network.getClientForPlayer(this.player); }
        var packet = {
            player: Entity.getNameTag(this.player),
            name: String(this.name),
            value: Number(value)
        };
        client && client.send("scales.setValue", packet);
    };
    PlayerScale.prototype.setValue = function (value) {
        this.send(value);
        this.java_class.setValue(value);
    };
    PlayerScale.prototype.addValue = function (v) {
        this.setValue(this.getValue() + v);
    };
    PlayerScale.prototype.reset = function () {
        this.java_class.reset();
    };
    PlayerScale.prototype.getType = function () {
        return this.java_class.getType();
    };
    return PlayerScale;
}());
var Scale = /** @class */ (function () {
    function Scale(java_class) {
        this.java_class = java_class;
    }
    Scale.prototype.setDisplay = function (v) {
        this.java_class.setDisplay(v);
        return this;
    };
    Scale.prototype.isDisplay = function () {
        return this.java_class.isDisplay();
    };
    return Scale;
}());
var Scales;
(function (Scales) {
    function register(obj) {
        return new Scale(ScalesJava.register(obj));
    }
    Scales.register = register;
    function getScaleByPlayer(player, name) {
        return new PlayerScale(ScalesJava.getScaleByPlayer(player, name), player, name);
    }
    Scales.getScaleByPlayer = getScaleByPlayer;
    function isCreative(player, name) {
        return new PlayerActor(player).getGameMode() == 0;
    }
    Scales.isCreative = isCreative;
})(Scales || (Scales = {}));
Saver.addSavesScope("lib.scales", function (scope) {
    var players = Object.keys(scope.players || {});
    for (var i in players) {
        var player = players[i];
        var scales = Object.keys(scope.players[player]);
        for (var j in scales) {
            var scale = scales[j];
            ScalesJava.getScaleByPlayer(player, scale).setValue(scope.players[player][scale]);
        }
    }
}, function () {
    var obj = {};
    var players = ScalesJava.getPlayers();
    for (var i in players) {
        var player = players[i];
        var scales = ScalesJava.getScales();
        var data_save = obj[player] = {};
        for (var j in scales) {
            var scale = scales[j];
            data_save[scale] = ScalesJava.getScaleByPlayer(player, scale).getValue();
        }
    }
    return {
        players: obj,
    };
});
var JsHelper = WRAP_JAVA("com.core.api.JsHelper");
var ModuleAPI = WRAP_JAVA("com.core.api.module.ModuleAPI");
var CoreUtility = {
    ToolTip: JsHelper.get(ToolTip),
    ConversionType: ConversionType,
    NativeAPI: NativeAPI,
    Injector: JsHelper.get(Injector),
    EntityRegister: EntityRegister,
    ItemsUtil: ItemsUtil,
    FileUtils: JsHelper.get(FileUtils),
    Gui: Gui,
    TickingAreasManager: TickingAreasManager,
    GlobalContext: GlobalContext,
    Parameter: JsHelper.get(Parameter),
    BlockPos: JsHelper.get(BlockPos),
    Vec3: JsHelper.get(Vec3),
    Vec2: JsHelper.get(Vec2),
    ChunkPos: JsHelper.get(ChunkPos),
    ItemStack: JsHelper.get(ItemStack),
    Actor: JsHelper.get(Actor),
    Mob: JsHelper.get(Mob),
    NativePlayer: JsHelper.get(NativePlayer),
    LocalPlayer: JsHelper.get(LocalPlayer),
    ServerPlayer: JsHelper.get(ServerPlayer),
    NativeUi: JsHelper.get(NativeUi),
    ImageElement: JsHelper.get(ImageElement),
    TextElement: JsHelper.get(TextElement),
    MeshElement: JsHelper.get(MeshElement),
    ActorDamageCause: JsHelper.get(ActorDamageCause),
    BlockUtils: BlockUtils,
    BlockRegistry: BlockRegistry,
    Scales: Scales,
    HookManager: JsHelper.get(HookManager),
    Module: JsHelper.get(ModuleAPI),
    version: Number(com.core.api.Boot.API_VERSION),
    requireGlobal: function (cmd) {
        return eval(cmd);
    }
};
JsHelper.log("Module count " + ModuleAPI.modules.size());
for (var key in ModuleAPI.object)
    CoreUtility[key] = ModuleAPI.object[key];
with (ModuleAPI.object) {
    for (var i = 0; i < ModuleAPI.modules.size(); i++) {
        var api = ModuleAPI.modules.get(i).getApi();
        function EXPORT(name, value) {
            CoreUtility[name] = value;
        }
        api.start();
    }
}
ModAPI.registerAPI("CoreUtility", CoreUtility);
//container.openAs(window);
//WRAP_JAVA("com.core.api.module.NativeAPI").setWorldGenerator("{'biome_id':1,'block_layers': [{'block_name': 'minecraft:dirt',count:80}],'encoding_version':5}");
/*
let block_id = IDRegistry.genBlockID("test_block");
BlockRegistry.registerDoorBlock("test_block","Test Glass Door",{name:"glass"});

Item.registerUseFunctionForID(280, function(coords,item,block){
    var source = BlockSource.getDefaultForActor(Player.get());
    var down_door = new BlockState(BlockID["test_block"],0).addStates({
        open_bit:0, direction: 0, door_hinge_bit: 0, upper_block_bit: 0, color:0
    });
    var upper_door = new BlockState(BlockID["test_block"],0).addStates({
        open_bit:0, direction: 0, door_hinge_bit: 0, upper_block_bit: 1, color:0
     });
    source.setBlock(coords.x,coords.y + 1, coords.z, down_door);
    source.setBlock(coords.x,coords.y + 2,coords.z, upper_door);
   // Debug.m(source.getBlock(coords.x,coords.y +1,coords.z));
   // Debug.m(source.getBlock(coords.x,coords.y +2,coords.z));
})*/
