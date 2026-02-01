var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) {
                    t[p] = s[p];
                }
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) {
        return o;
    }
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    }
    catch (error) {
        e = {error: error};
    }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) {
                m.call(i);
            }
        }
        finally {
            if (e) {
                throw e.error;
            }
        }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) {
        for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) {
                    ar = Array.prototype.slice.call(from, 0, i);
                }
                ar[i] = from[i];
            }
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf || ({__proto__: []} instanceof Array && function (d, b) {
            d.__proto__ = b;
        }) || function (d, b) {
            for (var p in b) {
                if (Object.prototype.hasOwnProperty.call(b, p)) {
                    d[p] = b[p];
                }
            }
        };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null) {
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        }
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
IMPORT("ItemAnimHelper");
IMPORT("RecipeTileEntity");
IMPORT("StorageInterface");
IMPORT("VanillaSlots");
var Color = android.graphics.Color;
var JString = java.lang.String;
var Integer = java.lang.Integer;
var Random = java.util.Random;
var File = java.io.File;
var debug_enabled = __config__.getBool("debug");
var MAX_GAPING_VOID_VIEW_DISTANCE = __config__.getInteger("max_gaping_void_view_distance");
var VOID_PARTICLES_PER_TICK = __config__.getInteger("void_particles_per_tick");
var COLLECTOR_PROCESS_TIME = __config__.getInteger("collector_process_time");
var BORING_FOOD = __config__.getBool("boring_food");
var EYE_COLOR_UPDATE_FREQUENCY = __config__.getInteger("eye_color_update_frequency");
var EYE_COLOR_RANDOM_SEED_CHANGING = __config__.getBool("eye_color_random_seed_changing");
var rand = new Random();
var AVA_STUFF = [];
var EntityArrow = WRAP_JAVA("vsdum.avaritia.NativeArrow");
var INFINITY_ITEM_FRAMES = [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 4, 4, 5, 6, 7, 8, 7, 6, 5, 4, 4, 3, 3, 2, 2, 2, 1, 1, 1];
var __loaded_mods = {Thaumcraft: false, TConstruct: false, HydCraft: false, ThermalExpansion: false, TSteelworks: false, IC2: false, ThaumicTinkerer: false, technom: false, magicalcrops: false, AgriCraft: false, MineFactoryReloaded: false, BigReactors: false, EE3: false, ProjectE: false, Botania: false, ExtraUtilities: false, appliedenergistics2: false, ImmersiveEngineering: false, Mekanism: false, Torcherino: false, DraconicEvolution: false};
ModAPI.addAPICallback("TConAPI", function () {
    return __loaded_mods.TConstruct = true;
});
ModAPI.addAPICallback("ICore", function () {
    return __loaded_mods.IC2 = true;
});
ModAPI.addAPICallback("BotaniaAPI", function () {
    return __loaded_mods.Botania = true;
});
ModAPI.addAPICallback("ProjectE", function () {
    return __loaded_mods.ProjectE = true;
});
var addShaped = function (id, count, data, mask, keys) {
    return Recipes.addShaped({id: id, count: count, data: data}, mask, keys);
};
var addShapeless = function (id, count, data, ingredients) {
    return Recipes.addShapeless({id: id, count: count, data: data}, ingredients.map(function (el) {
        return {id: el[0], data: el[1]};
    }));
};
Network.addClientPacket("avaritia.sound", function (data) {
    return World.playSound(data.x, data.y, data.z, data.sound, data.volume, data.pitch);
});
var playSound = function (x, y, z, dimension, sound, volume, pitch) {
    return new NetworkConnectedClientList().setupDistancePolicy(x, y, z, dimension, 64).send("avaritia.sound", {x: x, y: y, z: z, sound: sound, volume: volume, pitch: pitch});
};
var check_armor = function (player) {
    return Entity.getArmorSlot(player, 0).id == ItemID.infinity_helmet && Entity.getArmorSlot(player, 1).id == ItemID.infinity_chestplate && Entity.getArmorSlot(player, 2).id == ItemID.infinity_leggings && Entity.getArmorSlot(player, 3).id == ItemID.infinity_boots;
};
var INFINITY_TOOLS = [];
Callback.addCallback("PostLoaded", function () {
    return INFINITY_TOOLS.push(ItemID.infinity_sword, ItemID.infinity_axe, ItemID.infinity_pickaxe, ItemID.infinity_hammer, ItemID.infinity_shovel, ItemID.infinity_destroyer, ItemID.infinity_hoe, ItemID.infinity_helmet, ItemID.infinity_chestplate, ItemID.infinity_leggings, ItemID.infinity_boots, ItemID.infinity_bow);
});
var addTooltip = function (id, key) {
    return Item.registerNameOverrideFunction(id, function (item, name) {
        var translatedTooltip = Translation.translate(key);
        if (translatedTooltip == key) {
            return name;
        }
        return "".concat(name, "\n\xa7o\xa77").concat(Translation.translate(key));
    });
};
var dropItemRandom = function (drop, world, x, y, z) {
    var _a;
    return world.spawnDroppedItem(x + (rand.nextFloat() * 0.7 + 0.15), y + (rand.nextFloat() * 0.7 + 0.15), z + (rand.nextFloat() * 0.7 + 0.15), drop.id, drop.count, drop.data, (_a = drop.extra) !== null && _a !== void 0 ? _a : null);
};
var hsv2rgb = function (h, s, v) {
    var m, n, f, i, hsv = [h, s, v], rgb = [null, null, null];
    if (hsv[0] == -1) {
        rgb[0] = rgb[1] = rgb[2] = hsv[2];
        return rgb;
    }
    i = Math.floor(hsv[0]);
    f = hsv[0] - i;
    if (i % 2 == 0) {
        f = 1 - f;
    }
    m = hsv[2] * (1 - hsv[1]);
    n = hsv[2] * (1 - hsv[1] * f);
    switch (i) {
      case 6:
      case 0:
        rgb[0] = hsv[2], rgb[1] = n, rgb[2] = m;
        break;
      case 1:
        rgb[0] = n, rgb[1] = hsv[2], rgb[2] = m;
        break;
      case 2:
        rgb[0] = m, rgb[1] = hsv[2], rgb[2] = n;
        break;
      case 3:
        rgb[0] = m, rgb[1] = n, rgb[2] = hsv[2];
        break;
      case 4:
        rgb[0] = n, rgb[1] = m, rgb[2] = hsv[2];
        break;
      case 5:
        rgb[0] = hsv[2], rgb[1] = m, rgb[2] = n;
        break;
    }
    return rgb;
};
var itemInstanceFromArray = function (arr) {
    var _a;
    return ({id: arr[0], count: arr[1], data: arr[2], extra: (_a = arr[3]) !== null && _a !== void 0 ? _a : null});
};
var CONNECTED_PLAYERS = [];
Network.addClientPacket("avaritia.connectedplayersupdate", function (data) {
    return data.connect ? !~CONNECTED_PLAYERS.indexOf(data.player) && CONNECTED_PLAYERS.push(data.player) : CONNECTED_PLAYERS.splice(CONNECTED_PLAYERS.indexOf(data.player), 1);
});
Callback.addCallback("ServerPlayerLoaded", function (player) {
    Network.sendToAllClients("avaritia.connectedplayersupdate", {player: player, connect: true});
    var players = Network.getConnectedPlayers();
    var client = Network.getClientForPlayer(player);
    for (var i in players) {
        client.send("avaritia.connectedplayersupdate", {player: players[i], connect: true});
    }
});
Callback.addCallback("ServerPlayerLeft", function (player) {
    return Network.sendToAllClients("avaritia.connectedplayersupdate", {player: player, connect: false});
});
Callback.addCallback("LevelLeft", function () {
    return CONNECTED_PLAYERS.splice(0, CONNECTED_PLAYERS.length);
});
var queuedActions = [];
var isLevelDisplayed = false;
var ensureWorldLoaded = function (action) {
    return isLevelDisplayed ? action() : queuedActions.push(action);
};
Callback.addCallback("LevelDisplayed", function () {
    isLevelDisplayed = true;
    debug_enabled = __config__.getBool("debug");
    debug_enabled && Logger.Log("The level has been displayed, ".concat(queuedActions.length > 0 ? "executing ".concat(queuedActions.length, " queued tasks...") : "no tasks queued."), "AVARITIA DEBUG");
    queuedActions.forEach(function (action) {
        return action();
    });
    queuedActions.splice(0, queuedActions.length);
    MAX_GAPING_VOID_VIEW_DISTANCE = __config__.getInteger("max_gaping_void_view_distance");
    VOID_PARTICLES_PER_TICK = __config__.getInteger("void_particles_per_tick");
    COLLECTOR_PROCESS_TIME = __config__.getInteger("collector_process_time");
    BORING_FOOD = __config__.getBool("boring_food");
    EYE_COLOR_UPDATE_FREQUENCY = __config__.getInteger("eye_color_update_frequency");
    EYE_COLOR_RANDOM_SEED_CHANGING = __config__.getBool("eye_color_random_seed_changing");
});
Callback.addCallback("LevelLeft", function () {
    return isLevelDisplayed = false;
});
var actionsOnGuiChanged = [];
var isInGame = false;
var ensurePlayerInGame = function (action) {
    return isInGame ? action() : actionsOnGuiChanged.push(action);
};
Callback.addCallback("NativeGuiChanged", function (screen) {
    if (screen == "hud_screen" || screen == "in_game_play_screen") {
        isInGame = true;
        debug_enabled && Logger.Log("The player is in game, ".concat(actionsOnGuiChanged.length > 0 ? "executing ".concat(actionsOnGuiChanged.length, " queued tasks") : "no tasks queued."), "AVARITIA DEBUG");
        actionsOnGuiChanged.forEach(function (action) {
            return action();
        });
        actionsOnGuiChanged.splice(0, actionsOnGuiChanged.length);
    } else {
        isInGame = false;
    }
});
var undestroyableItem = function (id) {
    KEX.ItemsModule.setExplodable(id, false);
    KEX.ItemsModule.setFireResistant(id, true);
    KEX.ItemsModule.setShouldDespawn(id, false);
};
var Rarity;
(function (Rarity) {
    function makeRarity(id, rarity) {
        var _func = Item.nameOverrideFunctions[id];
        Item.registerNameOverrideFunction(id, function (item, name, name2) {
            var _a;
            if (_func) {
                name = ((_a = _func(item, name, name2)) !== null && _a !== void 0 ? _a : name);
            }
            return "".concat(rarity).concat(name);
        });
    }
    function uncommon(id) {
        makeRarity(id, "\xa7a");
    }
    Rarity.uncommon = uncommon;
    function rare(id) {
        makeRarity(id, "\xa7b");
    }
    Rarity.rare = rare;
    function epic(id) {
        makeRarity(id, "\xa7d");
    }
    Rarity.epic = epic;
    function cosmic(id) {
        makeRarity(id, "\xa7c");
    }
    Rarity.cosmic = cosmic;
})(Rarity || (Rarity = {}));
(function () {
    var _a;
    var _b, _c;
    var all_translation_keys = {};
    var readFile = function (name) {
        return FileTools.ReadText("".concat(__dir__, "/resources/res/lang/").concat(name, ".lang")).split("\n").filter(function (element) {
            return element.length > 0 && !element.startsWith("#");
        }).forEach(function (line) {
            var _a;
            var _b;
            var kv = line.split("=");
            (_a = all_translation_keys[_b = kv[0]]) !== null && _a !== void 0 ? _a : (all_translation_keys[_b] = {});
            all_translation_keys[kv[0]][name] = kv[1];
        });
    };
    FileTools.GetListOfFiles("".concat(__dir__, "/resources/res/lang"), "lang").forEach(function (file) {
        return readFile(new JString(file.getName()).replaceFirst("[.][^.]+$", ""));
    });
    for (var key in all_translation_keys) {
        (_a = (_b = all_translation_keys[key])[_c = Translation.getLanguage()]) !== null && _a !== void 0 ? _a : (_b[_c] = all_translation_keys[key].en);
        Translation.addTranslation(key, all_translation_keys[key]);
    }
})();
(function () {
    var _a;
    var _b;
    var obj = {en: "Inventory", ar: "\u062c\u064e\u0631\u0652\u062f\u064c", pt: "Invent\xe1rio", zh: "\u5b58\u8d27", hr: "Inventar", cs: "Invent\xe1\u0159", da: "Opg\xf8relse", nl: "Inventaris", es: "Inventario", fi: "Inventaario", fr: "Inventaire", de: "Inventar", el: "\u03ba\u03b1\u03c4\u03ac\u03bb\u03bf\u03b3\u03bf\u03c2 \u03b1\u03c0\u03bf\u03b3\u03c1\u03b1\u03c6\u03ad\u03bd\u03c4\u03c9\u03bd \u03b1\u03bd\u03c4\u03b9\u03ba\u03b5\u03b9\u03bc\u03ad\u03bd\u03c9\u03bd", it: "Inventario", ja: "\u76ee\u9332", ko: "\ud488\ubaa9 \uc77c\ub78c", nb: "Liste", pl: "Inwentarz", ro: "Inventar", ru: "\u0418\u043d\u0432\u0435\u043d\u0442\u0430\u0440\u044c", sv: "inventarief\xf6rteckning", th: "\u0e23\u0e32\u0e22\u0e01\u0e32\u0e23\u0e2a\u0e34\u0e48\u0e07\u0e02\u0e2d\u0e07", tr: "Envanter", uk: "I\u043d\u0432\u0435\u043d\u0442\u0430\u0440", vi: "b\u1ea3n ki\u1ec3m k\xea"};
    (_a = obj[_b = Translation.getLanguage()]) !== null && _a !== void 0 ? _a : (obj[_b] = obj.en);
    Translation.addTranslation("avaritia.inventory", obj);
})();
(function () {
    var _a;
    var _b;
    var obj = {en: "Input Amount: %d", ru: "\u0422\u0440\u0435\u0431\u0443\u0435\u043c\u043e\u0435 \u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e: %d", de: "Eingabebetrag: %d", es: "Cantidad de entrada: %d", pt: "Quantidade de entrada: %d", sv: "Ing\xe5ngsbelopp: %d", zh: "\u6295\u5165\u91d1\u989d: %d"};
    (_a = obj[_b = Translation.getLanguage()]) !== null && _a !== void 0 ? _a : (obj[_b] = obj.en);
    Translation.addTranslation("avaritia.rv.compressor.amount", obj);
})();
var Quat = (function () {
    function Quat(x, y, z, s) {
        this.x = x !== null && x !== void 0 ? x : 0, this.y = y !== null && y !== void 0 ? y : 0, this.z = z !== null && z !== void 0 ? z : 0, this.s = s !== null && s !== void 0 ? s : 0;
    }
    Quat.prototype.setAroundAxis = function (ax, ay, az, angle) {
        angle *= 0.5;
        var sin = Math.sin(angle);
        this.s = Math.cos(angle), this.x = ax * sin, this.y = ay * sin, this.z = az * sin;
        return this;
    };
    Quat.prototype.rotate = function (vec) {
        var d = -this.x * vec.x - this.y * vec.y - this.z * vec.z;
        var d1 = this.s * vec.x + this.y * vec.z - this.z * vec.y;
        var d2 = this.s * vec.y - this.x * vec.z + this.z * vec.x;
        var d3 = this.s * vec.z + this.x * vec.y - this.y * vec.x;
        vec.x = d1 * this.s - d * this.x - d2 * this.z + d3 * this.y;
        vec.y = d2 * this.s - d * this.y + d1 * this.z - d3 * this.x;
        vec.z = d3 * this.s - d * this.z - d1 * this.y + d2 * this.x;
    };
    return Quat;
}());
var Vector3 = (function () {
    function Vector3(d, d1, d2) {
        this.x = d !== null && d !== void 0 ? d : 0, this.y = d1 !== null && d1 !== void 0 ? d1 : 0, this.z = d2 !== null && d2 !== void 0 ? d2 : 0;
    }
    Vector3.prototype.add = function (dx, dy, dz) {
        this.x += dx, this.y += dy, this.z += dz;
        return this;
    };
    Vector3.prototype.subtract = function (dx, dy, dz) {
        this.x -= dx, this.y -= dy, this.z -= dz;
        return this;
    };
    Vector3.prototype.multiply = function (fx, fy, fz) {
        this.x *= fx, this.y *= fy, this.z *= fz;
        return this;
    };
    Vector3.prototype.multiplyXYZ = function (f) {
        return this.multiply(f, f, f);
    };
    Vector3.prototype.mag = function () {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
    };
    Vector3.prototype.normalize = function () {
        var d = this.mag();
        if (d != 0) {
            this.multiplyXYZ(1 / d);
        }
        return this;
    };
    Vector3.prototype.floor = function () {
        this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z);
        return this;
    };
    Vector3.prototype.rotate = function (angle, axis) {
        var norm = axis.copy().normalize();
        new Quat().setAroundAxis(norm.x, norm.y, norm.z, angle).rotate(this);
        return this;
    };
    Vector3.prototype.copy = function () {
        return new Vector3(this.x, this.y, this.z);
    };
    Vector3.fromEntity = function (ent) {
        var pos = Entity.getPosition(ent);
        return new Vector3(pos.x, pos.y, pos.z);
    };
    return Vector3;
}());
var Cuboid6 = (function () {
    function Cuboid6() {
        this.min = new Vector3(), this.max = new Vector3();
    }
    Cuboid6.prototype.add = function (vec) {
        this.min.add(vec.x, vec.y, vec.z);
        this.max.add(vec.x, vec.y, vec.z);
        return this;
    };
    Cuboid6.prototype.expand = function (dx, dy, dz) {
        this.min.subtract(dx, dy, dz);
        this.max.add(dx, dy, dz);
        return this;
    };
    Cuboid6.prototype.expandXYZ = function (d) {
        return this.expand(d, d, d);
    };
    Cuboid6.prototype.aabb = function () {
        return [this.min.x, this.min.y, this.min.z, this.max.x, this.max.y, this.max.z];
    };
    return Cuboid6;
}());
var TileEntityImplementation = (function () {
    function TileEntityImplementation(defaultValues) {
        this.defaultValues = defaultValues;
        this.useNetworkItemContainer = true;
    }
    TileEntityImplementation.prototype.selfDestroy = function () {
    };
    TileEntityImplementation.prototype.sendPacket = function (name, data) {
    };
    TileEntityImplementation.prototype.sendResponse = function (packetName, data) {
    };
    TileEntityImplementation.prototype.created = function () {
    };
    TileEntityImplementation.prototype.init = function () {
    };
    TileEntityImplementation.prototype.tick = function () {
    };
    TileEntityImplementation.prototype.click = function (id, count, data, coords, player, extra) {
    };
    TileEntityImplementation.prototype.destroyBlock = function (coords, player) {
    };
    TileEntityImplementation.prototype.redstone = function (params) {
    };
    TileEntityImplementation.prototype.projectileHit = function (coords, target) {
    };
    TileEntityImplementation.prototype.destroy = function () {
    };
    TileEntityImplementation.prototype.getGuiScreen = function () {
        return;
    };
    TileEntityImplementation.prototype.getScreenName = function (player, coords) {
        return;
    };
    TileEntityImplementation.prototype.getScreenByName = function (screenName) {
        return;
    };
    TileEntityImplementation.prototype.requireMoreLiquid = function (liquid, amount) {
    };
    return TileEntityImplementation;
}());
var MatterCluster;
(function (MatterCluster) {
    MatterCluster.capacity = 4096;
    MatterCluster.nextId = 0;
    MatterCluster.data = {};
    function areItemInstancesEqual(i1, i2) {
        if (i1.id == i2.id && i1.data == i2.data) {
            return i1.extra == null && i2.extra == null;
        }
        return false;
    }
    function compressItemsList(list) {
        var result = [];
        list.forEach(function (item) {
            var found = result.find(function (element) {
                return areItemInstancesEqual(element, item);
            });
            if (typeof found === "undefined") {
                result.push(item);
            } else {
                found.count += item.count;
            }
        });
        return result;
    }
    function makeClusters(list) {
        var returnData = [], cloned = compressItemsList(list);
        while (cloned.length != 0) {
            returnData.push(_makeCluster(cloned));
        }
        return returnData;
    }
    MatterCluster.makeClusters = makeClusters;
    function _makeCluster(list) {
        var count = 0, following = [];
        while (count < MatterCluster.capacity && list.length > 0) {
            var stack = list.pop();
            if (count + stack.count > MatterCluster.capacity) {
                var toPut = MatterCluster.capacity - count;
                list.push(__assign(__assign({}, stack), {count: stack.count - toPut}));
                following.push(__assign(__assign({}, stack), {count: toPut}));
                break;
            } else {
                count += stack.count;
                following.push(stack);
            }
        }
        MatterCluster.data[MatterCluster.nextId] = following;
        var extra = new ItemExtraData();
        extra.putInt("cluster_id", MatterCluster.nextId++);
        extra.putInt("item_count", count);
        return {id: ItemID.matter_cluster, count: 1, data: 0, extra: extra};
    }
    function makeCluster(list) {
        return _makeCluster(compressItemsList(list));
    }
    MatterCluster.makeCluster = makeCluster;
    function dropByStacks(item, region, x, y, z) {
        var stackSize = Item.getMaxStack(item.id);
        while (item.count != 0) {
            var toDrop = Math.min(stackSize, item.count);
            item.count -= toDrop;
            dropItemRandom(__assign(__assign({}, item), {count: toDrop}), region, x, y, z);
        }
    }
    function deconstructCluster(player) {
        var item = Entity.getCarriedItem(player), pos = Entity.getPosition(player);
        if (item.extra != null) {
            var clusterId = item.extra.getInt("cluster_id");
            var region_1 = BlockSource.getDefaultForActor(player), dropX_1 = Math.floor(pos.x), dropY_1 = Math.floor(pos.y), dropZ_1 = Math.floor(pos.z);
            MatterCluster.data[clusterId].forEach(function (drop) {
                return dropByStacks(drop, region_1, dropX_1, dropY_1, dropZ_1);
            });
            delete MatterCluster.data[clusterId];
        } else {
            Network.getClientForPlayer(player).sendMessage("This matter cluster item was obtained illegally! It doesn't contain any items inside!");
        }
        Entity.setCarriedItem(player, 0, 0, 0, null);
    }
    MatterCluster.deconstructCluster = deconstructCluster;
})(MatterCluster || (MatterCluster = {}));
Saver.addSavesScope("AvaritiaMatterClusters", function (scope) {
    if (typeof scope !== "undefined" && typeof scope.nextId === "number" && typeof scope.data !== "undefined") {
        MatterCluster.nextId = scope.nextId || 0;
        MatterCluster.data = JSON.parse(JSON.stringify(scope.data)) || {};
    }
}, function () {
    return {nextId: MatterCluster.nextId, data: MatterCluster.data};
});
IDRegistry.genItemID("matter_cluster");
Item.createItem("matter_cluster", "item.avaritia:matter_cluster.name", {name: "matter_cluster_empty", meta: 0}, {stack: 1, isTech: true});
Item.registerNameOverrideFunction(ItemID.matter_cluster, function (item, name) {
    if (item.extra == null) {
        return "BROKEN MATTER CLUSTER";
    }
    name = Translation.translate("item.avaritia:matter_cluster".concat(item.extra.getInt("item_count") == MatterCluster.capacity ? ".full" : "", ".name"));
    name += "\n\xa77".concat(item.extra.getInt("item_count"), "/4096 ").concat(Translation.translate("tooltip.matter_cluster.counter"));
    name += "\n\n\xa78".concat(Translation.translate("tooltip.matter_cluster.desc"));
    return name;
});
Item.registerIconOverrideFunction(ItemID.matter_cluster, function (item) {
    return {name: "matter_cluster_".concat(item.extra != null && item.extra.getInt("item_count") == MatterCluster.capacity ? "full" : "empty"), meta: 0};
});
Item.registerUseFunction(ItemID.matter_cluster, function (coords, item, block, player) {
    return Entity.getSneaking(player) && MatterCluster.deconstructCluster(player);
});
Item.registerNoTargetUseFunction(ItemID.matter_cluster, function (item, player) {
    return Entity.getSneaking(player) && MatterCluster.deconstructCluster(player);
});
["diamond_lattice", "crystal_matrix_ingot", "neutron_pile", "neutron_nugget", "neutronium_ingot", "infinity_catalyst", "infinity_ingot", "record_fragment"].forEach(function (id) {
    IDRegistry.genItemID(id);
    Item.createItem(id, "item.resource.".concat(id, ".name"), {name: id, meta: 0}, {stack: 64});
    AVA_STUFF.push(ItemID[id]);
    addTooltip(ItemID[id], "tooltip.item.resource.".concat(id, ".desc"));
});
Rarity.uncommon(ItemID.diamond_lattice);
Rarity.rare(ItemID.crystal_matrix_ingot);
Rarity.uncommon(ItemID.neutron_pile);
Rarity.uncommon(ItemID.neutron_nugget);
Rarity.rare(ItemID.neutronium_ingot);
Rarity.epic(ItemID.infinity_catalyst);
Rarity.cosmic(ItemID.infinity_ingot);
Rarity.cosmic(ItemID.record_fragment);
IAHelper.makeCommonAnim(ItemID.neutronium_ingot, "neutronium_ingot", 3, 3);
IAHelper.makeAdvancedAnim(ItemID.infinity_catalyst, "infinity_catalyst", 1, [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 4, 4, 5, 6, 7, 8, 7, 6, 5, 4, 4, 4, 3, 3, 2, 2, 2, 1, 1, 1]);
IAHelper.makeAdvancedAnim(ItemID.infinity_ingot, "infinity_ingot", 1, [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 4, 4, 5, 6, 7, 8, 7, 6, 5, 4, 4, 4, 3, 3, 2, 2, 2, 1, 1, 1]);
Callback.addCallback("PostLoaded", function () {
    addShaped(ItemID.diamond_lattice, 1, 0, ["d d", " d ", "d d"], ["d", VanillaItemID.diamond, 0]);
    addShaped(ItemID.crystal_matrix_ingot, 1, 0, ["lsl", "lsl"], ["l", ItemID.diamond_lattice, 0, "s", VanillaItemID.nether_star, 0]);
    addShaped(ItemID.neutron_nugget, 1, 0, ["ppp", "ppp", "ppp"], ["p", ItemID.neutron_pile, 0]);
    addShaped(ItemID.neutronium_ingot, 1, 0, ["nnn", "nnn", "nnn"], ["n", ItemID.neutron_nugget, 0]);
    addShapeless(ItemID.neutron_nugget, 9, 0, [[ItemID.neutronium_ingot, 0]]);
    addShapeless(ItemID.neutron_pile, 9, 0, [[ItemID.neutron_nugget, 0]]);
    [500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 759].forEach(function (disc) {
        return addShapeless(ItemID.record_fragment, 8, 0, [[disc, 0]]);
    });
});
var Gregorizer;
(function (Gregorizer) {
    Gregorizer.modifier = 0;
    Gregorizer.multiplier = 1;
    function balance() {
        __loaded_mods.Thaumcraft && (Gregorizer.modifier += 100);
        (__loaded_mods.TConstruct || __loaded_mods.HydCraft) && (Gregorizer.modifier += 100);
        (__loaded_mods.ThermalExpansion || __loaded_mods.TSteelworks || __loaded_mods.IC2 || __loaded_mods.ThaumicTinkerer) && (Gregorizer.modifier += 300);
        __loaded_mods.technom && (Gregorizer.modifier += 600);
        __loaded_mods.magicalcrops && Gregorizer.multiplier++;
        __loaded_mods.AgriCraft && Gregorizer.multiplier++;
        __loaded_mods.MineFactoryReloaded && (Gregorizer.multiplier += 9);
        __loaded_mods.BigReactors && (Gregorizer.modifier += 100);
        __loaded_mods.EE3 && Gregorizer.multiplier++;
        __loaded_mods.ProjectE && (Gregorizer.multiplier += 3);
        __loaded_mods.Botania && (Gregorizer.modifier += 50);
        __loaded_mods.ExtraUtilities && (Gregorizer.modifier += 500);
        __loaded_mods.appliedenergistics2 && (Gregorizer.modifier += 200);
        __loaded_mods.ImmersiveEngineering && (Gregorizer.modifier += 300);
        __loaded_mods.Mekanism && (Gregorizer.modifier += 500, Gregorizer.multiplier++);
        __loaded_mods.Torcherino && (Gregorizer.multiplier += 2);
        __loaded_mods.DraconicEvolution && (Gregorizer.modifier += 300, Gregorizer.multiplier++);
        if (debug_enabled) {
            var mods = Object.keys(__loaded_mods).filter(function (val) {
                return __loaded_mods[val];
            }).length;
            Logger.Log("Successfully performed Gregorizer.balance(), it has found ".concat(mods, " mods, that change quantity modifying values, and now modifier is ").concat(Gregorizer.modifier, " and multiplier is ").concat(Gregorizer.multiplier, "."), "AVARITIA DEBUG");
        }
    }
    Gregorizer.balance = balance;
    function balanceCost(cost) {
        return (cost + Gregorizer.modifier) * Gregorizer.multiplier;
    }
    Gregorizer.balanceCost = balanceCost;
})(Gregorizer || (Gregorizer = {}));
var Singularity;
(function (Singularity) {
    Singularity.colors = (function () {
        var result = FileTools.ReadJSON("".concat(__dir__, "/resources/res/singularities.json"));
        var modsDir = (function () {
            var _a;
            var preferencesPath = "".concat(__packdir__, "innercore/preferences.json");
            if (new File(preferencesPath).exists()) {
                var innerCoreDir = (_a = FileTools.ReadJSON(preferencesPath).pack_selected) !== null && _a !== void 0 ? _a : "".concat(__packdir__, "innercore");
                return "".concat(innerCoreDir, "/mods/");
            }
            return "".concat(__packdir__, "innercore/mods/");
        })();
        FileTools.GetListOfDirs(modsDir).forEach(function (mod) {
            var _a, _b;
            var modPath = mod.getAbsolutePath();
            if (modPath !== __dir__ && new File(mod, "build.config").exists()) {
                (_b = (_a = FileTools.ReadJSON("".concat(modPath, "/build.config"))) === null || _a === void 0 ? void 0 : _a.resources) === null || _b === void 0 ? void 0 : _b.forEach(function (res) {
                    if (res.resourceType === "resource") {
                        var singularitiesPath = "".concat(modPath, "/").concat(res.path, "/singularities.json");
                        if (new File(singularitiesPath).exists()) {
                            var singularitiesJSON = FileTools.ReadJSON(singularitiesPath);
                            for (var key in singularitiesJSON) {
                                if (Array.isArray(singularitiesJSON[key]) && singularitiesJSON[key].length === 2 && typeof singularitiesJSON[key][0] === "string" && typeof singularitiesJSON[key][1] === "string" && /^#[a-f\d]{6}$/i.test(singularitiesJSON[key][0]) && /^#[a-f\d]{6}$/i.test(singularitiesJSON[key][1])) {
                                    if (Array.isArray(result[key]) && result[key].length === 2 && (result[key][0] !== singularitiesJSON[key][0] || result[key][1] !== singularitiesJSON[key][1])) {
                                        Logger.Log("Color of singularity '".concat(key, "' is being overrided from [").concat(result[key].toString(), "] to [").concat(singularitiesJSON[key].toString(), "]"), "AVARITIA WARNING");
                                    }
                                    result[key] = singularitiesJSON[key];
                                }
                            }
                        }
                    }
                });
            }
        });
        Logger.Log("Verified ".concat(Object.keys(result).length - 15, " custom singularity colors specified by other mods"), "AVARITIA DEBUG");
        return result;
    })();
    Singularity.recipes = {};
    Singularity.singularities = [];
    function registerRecipeFor(singularity, materialId, materialCount, materialData, specific) {
        if (Singularity.recipes[materialId]) {
            return debug_enabled && Logger.Log("An error occured while creating singularity recipe. Another recipe has already been registered for the material ".concat(Item.getName(materialId, materialData)), "AVARITIA WARNING");
        }
        Singularity.recipes[materialId] = {id: singularity, countdata: [materialCount, materialData], specific: specific};
    }
    Singularity.registerRecipeFor = registerRecipeFor;
    Singularity.removeRecipeFor = function (materialId) {
        return Singularity.recipes[materialId] && delete Singularity.recipes[materialId];
    };
    function registerSingularity(key, materialId, materialCount, materialData) {
        if (!Singularity.colors[key]) {
            return debug_enabled && Logger.Log("No textures were generated for singularity '".concat(key, "', please specify two layer colors in '<resource directory>/singularities.json'"), "AVARITIA ERROR");
        }
        var id = "singularity_".concat(key);
        IDRegistry.genItemID(id);
        Item.createItem(id, "item.singularity.".concat(key, ".name"), {name: id, meta: 0}, {stack: 64});
        IAHelper.makeCommonAnim(ItemID[id], id, 1, 6);
        AVA_STUFF.push(ItemID[id]);
        Singularity.singularities.push(ItemID[id]);
        materialId != null && materialCount != null && materialData != null && registerRecipeFor(ItemID[id], materialId, materialCount, materialData, false);
    }
    Singularity.registerSingularity = registerSingularity;
    function isValidMaterial(id, data) {
        return typeof Singularity.recipes[id] !== "undefined" && (Singularity.recipes[id].countdata[1] == data || Singularity.recipes[id].countdata[1] == -1);
    }
    Singularity.isValidMaterial = isValidMaterial;
    function getRecipeResult(id) {
        var _a;
        return (_a = Singularity.recipes[id]) === null || _a === void 0 ? void 0 : _a.id;
    }
    Singularity.getRecipeResult = getRecipeResult;
    function getRequiredMaterialCount(id) {
        var _a;
        return (_a = Singularity.recipes[id]) === null || _a === void 0 ? void 0 : _a.countdata[0];
    }
    Singularity.getRequiredMaterialCount = getRequiredMaterialCount;
    function getRequiredMaterialData(id) {
        var _a;
        return (_a = Singularity.recipes[id]) === null || _a === void 0 ? void 0 : _a.countdata[1];
    }
    Singularity.getRequiredMaterialData = getRequiredMaterialData;
    function getMaterialForSingularity(id) {
        for (var key in Singularity.recipes) {
            if (Singularity.recipes[key].id == id) {
                debug_enabled && Logger.Log("Found material ".concat(Item.getName(parseInt(key), 0), " for singularity ").concat(Item.getName(id, 0)), "AVARITIA DEBUG");
                return parseInt(key);
            } else {
                debug_enabled && Logger.Log("Material for singularity ".concat(Item.getName(id, 0), " was not found"), "AVARITIA ERROR");
            }
        }
        return -1;
    }
    Singularity.getMaterialForSingularity = getMaterialForSingularity;
})(Singularity || (Singularity = {}));
[["iron", VanillaBlockID.iron_block, 400, 0], ["gold", VanillaBlockID.gold_block, 200, 0], ["lapis", VanillaBlockID.lapis_block, 200, 0], ["redstone", VanillaBlockID.redstone_block, 500, 0], ["quartz", VanillaBlockID.quartz_block, 200, 0], ["copper", null, null, null], ["tin", null, null, null], ["lead", null, null, null], ["silver", null, null, null], ["nickel", null, null, null], ["diamond", VanillaBlockID.diamond_block, 300, 0], ["emerald", VanillaBlockID.emerald_block, 200, 0], ["fluxed", null, null, null], ["platinum", null, null, null], ["iridium", null, null, null]].forEach(function (element) {
    return Singularity.registerSingularity.apply(Singularity, __spreadArray([], __read(element), false));
});
IDRegistry.genItemID("infinity_sword");
ToolAPI.addToolMaterial("INFINITY_SWORD", {level: 32, durability: 9999, efficiency: 9999, damage: -4, enchantability: 200});
Item.createSwordItem("infinity_sword", "item.avaritia:infinity_sword.name", {name: "infinity_sword", meta: 0}, {stack: 1, tier: "INFINITY_SWORD"});
Callback.addCallback("PlayerAttack", function (player, victim) {
    var item = Entity.getCarriedItem(player);
    if (item.id == ItemID.infinity_sword) {
        if (Entity.getType(victim) == EEntityType.PLAYER && check_armor(victim)) {
            return Game.prevent();
        }
        Entity.damageEntity(victim, Entity.getHealth(victim) + 1, 0, {attacker: player, bool1: false});
    }
});
IAHelper.makeAdvancedAnim(ItemID.infinity_sword, "infinity_sword", 1, INFINITY_ITEM_FRAMES);
AVA_STUFF.push(ItemID.infinity_sword);
Rarity.cosmic(ItemID.infinity_sword);
undestroyableItem(ItemID.infinity_sword);
IDRegistry.genItemID("infinity_bow");
Item.createItem("infinity_bow", "item.avaritia:infinity_bow.name", {name: "infinity_bow_idle", meta: 0}, {stack: 1});
Item.setToolRender(ItemID.infinity_bow, true);
Item.setMaxUseDuration(ItemID.infinity_bow, 72000);
Item.setUseAnimation(ItemID.infinity_bow, 4);
Item.setEnchantType(ItemID.infinity_bow, EEnchantType.BOW, 1);
var CURRENT_BOW_ICON_CLIENT_SIDE = 0;
var InfinityBow;
(function (InfinityBow) {
    InfinityBow.HEAVEN_ARROWS_TEMP = {};
    function checkArrow(player) {
        var actor = new PlayerActor(player);
        for (var i = 0; i < 36; ++i) {
            if (actor.getInventorySlot(i).id == VanillaItemID.arrow) {
                return i;
            }
        }
        return -1;
    }
    InfinityBow.checkArrow = checkArrow;
    function shoot(item, ticks, player) {
        var region = BlockSource.getDefaultForActor(player);
        var j = 13 - ticks;
        var f = j / 13;
        f = (f * f + f * 2) / 3;
        if (f < 0.1) {
            return;
        }
        if (f > 1) {
            f = 1;
        }
        var pos = Entity.getPosition(player);
        var arrowID = region.spawnEntity(pos.x, pos.y, pos.z, "minecraft", "arrow", "<>");
        var arrow = new EntityArrow(arrowID);
        arrow.setOwner(player);
        var look = Entity.getLookAngle(player);
        arrow.shoot(look.yaw / Math.PI * 180, look.pitch / Math.PI * 180, f * 3, 1, player);
        if (f == 1) {
            arrow.setIsCritical(true);
        }
        if (item.extra != null && item.extra.isEnchanted()) {
            var power = item.extra.getEnchantLevel(EEnchantment.POWER);
            if (power > 0) {
                arrow.setPower(power);
            }
            var punch = item.extra.getEnchantLevel(EEnchantment.PUNCH);
            if (punch > 0) {
                arrow.setKnockbackStrength(punch);
            }
            var flame = item.extra.getEnchantLevel(EEnchantment.FLAME);
            if (flame > 0) {
                arrow.setFire(flame);
            }
        }
        if ((item.extra != null && item.extra.isEnchanted() && item.extra.getEnchantLevel(EEnchantment.INFINITY) > 0) || new PlayerActor(player).getGameMode() == 1) {
            arrow.setIsCreative(true);
        }
        playSound(pos.x, pos.y, pos.z, Entity.getDimension(player), "random.bow", 1, 1 / (rand.nextFloat() * 0.4 + 1.2) + f * 0.5);
        InfinityBow.HEAVEN_ARROWS_TEMP[arrowID] = true;
    }
    InfinityBow.shoot = shoot;
    function barrage(coords, region, parentArrow) {
        for (var i = 0; i < 10; i++) {
            var angle = rand.nextDouble() * 2 * Math.PI;
            var dist = rand.nextGaussian() * 0.5;
            var x = Math.sin(angle) * dist + coords.x;
            var z = Math.cos(angle) * dist + coords.z;
            var y = coords.y + 25;
            var dangle = rand.nextDouble() * 2 + Math.PI;
            var ddist = rand.nextDouble() * 0.35;
            var dx = Math.sin(dangle) * ddist;
            var dz = Math.cos(dangle) * ddist;
            var entity = region.spawnEntity(x, y, z, "minecraft", "arrow", "<>");
            Entity.setVelocity(entity, dx, -(rand.nextDouble() * 1.85 + 0.15), dz);
            var arrow = new EntityArrow(entity);
            arrow.setOwner(parentArrow.getOwner());
            arrow.setIsCritical(true);
            arrow.setIsCreative(true);
        }
    }
    InfinityBow.barrage = barrage;
})(InfinityBow || (InfinityBow = {}));
Item.registerNoTargetUseFunction(ItemID.infinity_bow, function (item, player) {
    Updatable.addUpdatable({timer: 0, update: function () {
        if (this.timer == 72000) {
            this.remove = true;
        }
        this.timer++;
    }});
});
Item.registerUsingReleasedFunction(ItemID.infinity_bow, function (item, ticks, player) {
    return InfinityBow.shoot(item, Math.min(7200 - ticks, 13), player);
});
Callback.addCallback("ProjectileHit", function (projectile, item, target) {
    if (Entity.getType(projectile) == EEntityType.ARROW) {
        if (InfinityBow.HEAVEN_ARROWS_TEMP[projectile]) {
            delete InfinityBow.HEAVEN_ARROWS_TEMP[projectile];
            if (target.entity == -1 && target.coords != null) {
                InfinityBow.barrage(target.coords, BlockSource.getDefaultForActor(projectile), new EntityArrow(projectile));
            }
        }
    }
});
IAHelper.itemAnims.infinity_bow = {meta: 0, timer: 0, frameIndex: 0};
(function (interval, frames) {
    var obj = IAHelper.itemAnims.infinity_bow;
    Callback.addCallback("LocalTick", function () {
        if (obj.timer + 1 == interval) {
            if (obj.frameIndex < frames.length) {
                obj.frameIndex++;
            } else {
                obj.frameIndex = 0;
            }
            obj.meta = frames[obj.frameIndex];
        }
        if (obj.timer < interval) {
            obj.timer++;
        } else {
            obj.timer = 0;
        }
    });
})(1, INFINITY_ITEM_FRAMES);
Item.registerIconOverrideFunction(ItemID.infinity_bow, function (item) {
    var name = "infinity_bow_idle";
    if (KEX.GlobalContext.getLocalPlayer().isUsingItem()) {
        var progress = Math.min(72000 - new PlayerActor(Player.get()).getItemUseDuration(), 13) / 13;
        var meta = Math.max(Math.floor(progress * 3) - 1, 0);
        name = "infinity_bow_pull_".concat(meta);
    }
    return {name: name, data: IAHelper.itemAnims.infinity_bow.meta};
});
Item.registerNameOverrideFunction(ItemID.infinity_bow, function (item, name) {
    return name + " \xa7c[WIP]\xa7r";
});
AVA_STUFF.push(ItemID.infinity_bow);
Rarity.cosmic(ItemID.infinity_bow);
undestroyableItem(ItemID.infinity_bow);
IDRegistry.genItemID("infinity_pickaxe");
ToolAPI.addToolMaterial("INFINITY_PICKAXE", {level: 32, durability: 9999, efficiency: 9999, damage: 6, enchantability: 200});
Item.createPickaxeItem("infinity_pickaxe", "item.avaritia:infinity_pickaxe.name", {name: "infinity_pickaxe", meta: 0}, {stack: 1, tier: "INFINITY_PICKAXE"});
var switch_between_pickaxe_and_hammer = function (item, player, hammer) {
    var _a;
    (_a = item.extra) !== null && _a !== void 0 ? _a : (item.extra = new ItemExtraData());
    if (item.extra.getEnchantLevel(EEnchantment.FORTUNE) < 10) {
        item.extra.addEnchant(EEnchantment.FORTUNE, 10);
    }
    item.data = 0;
    if (Entity.getSneaking(player)) {
        Entity.setCarriedItem(player, ItemID["infinity_".concat(hammer ? "hammer" : "pickaxe")], item.count, 0, item.extra);
    }
};
Item.registerUseFunction(ItemID.infinity_pickaxe, function (coords, item, block, player) {
    return switch_between_pickaxe_and_hammer(item, player, true);
});
Item.registerNoTargetUseFunction(ItemID.infinity_pickaxe, function (item, player) {
    return switch_between_pickaxe_and_hammer(item, player, true);
});
IDRegistry.genItemID("infinity_hammer");
Item.createPickaxeItem("infinity_hammer", "item.avaritia:infinity_pickaxe.name", {name: "infinity_hammer", meta: 0}, {stack: 1, isTech: true, tier: "INFINITY_PICKAXE"});
Item.registerUseFunction(ItemID.infinity_hammer, function (coords, item, block, player) {
    if (Entity.getSneaking(player)) {
        var region_2 = BlockSource.getDefaultForActor(player);
        var drops_1 = [];
        region_2.setDestroyParticlesEnabled(false);
        for (var xx = coords.x - 8; xx < coords.x + 8; xx++) {
            for (var yy = coords.y - 8; yy < coords.y + 8; yy++) {
                for (var zz = coords.z - 8; zz < coords.z + 8; zz++) {
                    var state = region_2.getBlock(xx, yy, zz);
                    if (state.id == 0) {
                        continue;
                    }
                    var drop = region_2.breakBlockForJsResult(xx, yy, zz, 0, item).items;
                    if (Array.isArray(drop)) {
                        drop.forEach(function (d) {
                            return drops_1.push(d);
                        });
                    }
                }
            }
        }
        region_2.setDestroyParticlesEnabled(true);
        MatterCluster.makeClusters(drops_1).forEach(function (cluster) {
            return dropItemRandom(cluster, region_2, coords.x, coords.y, coords.z);
        });
    }
});
Item.registerNoTargetUseFunction(ItemID.infinity_hammer, function (item, player) {
    return switch_between_pickaxe_and_hammer(item, player, false);
});
Callback.addCallback("EntityHurt", function (attacker, victim, damageValue, damageType, b1, b2) {
    var stack = Entity.getCarriedItem(attacker);
    if (stack.id == ItemID.infinity_hammer) {
        if (!(Entity.getType(victim) == EEntityType.PLAYER && check_armor(victim))) {
            var angle = Entity.getLookAngle(attacker);
            Entity.addVelocity(victim, -Math.sin(angle.yaw) * 5, 2, Math.cos(angle.yaw) * 5);
        }
    }
});
IAHelper.makeAdvancedAnim(ItemID.infinity_pickaxe, "infinity_pickaxe", 1, INFINITY_ITEM_FRAMES);
IAHelper.makeAdvancedAnim(ItemID.infinity_hammer, "infinity_hammer", 1, INFINITY_ITEM_FRAMES);
AVA_STUFF.push(ItemID.infinity_pickaxe);
Rarity.cosmic(ItemID.infinity_pickaxe);
Rarity.cosmic(ItemID.infinity_hammer);
undestroyableItem(ItemID.infinity_pickaxe);
undestroyableItem(ItemID.infinity_hammer);
IDRegistry.genItemID("infinity_shovel");
ToolAPI.addToolMaterial("INFINITY_SHOVEL", {level: 32, durability: 9999, efficiency: 9999, damage: 7, enchantability: 200});
Item.createShovelItem("infinity_shovel", "item.avaritia:infinity_shovel.name", {name: "infinity_shovel", meta: 0}, {stack: 1, tier: "INFINITY_SHOVEL"});
var shovel_use_func = function (item, player, destroyer) {
    if (Entity.getSneaking(player)) {
        Entity.setCarriedItem(player, ItemID["infinity_".concat(destroyer ? "destroyer" : "shovel")], item.count, 0, item.extra);
    }
};
Item.registerUseFunction(ItemID.infinity_shovel, function (coords, item, block, player) {
    if (!Entity.getSneaking(player) && block.id == 2 && coords.side == 1) {
        BlockSource.getDefaultForActor(player).setBlock(coords.x, coords.y, coords.z, VanillaBlockID.grass_path, 0);
        playSound(coords.x, coords.y, coords.z, Entity.getDimension(player), "step.grass", 0.5, 0.8);
    }
    shovel_use_func(item, player, true);
});
Item.registerNoTargetUseFunction(ItemID.infinity_shovel, function (item, player) {
    shovel_use_func(item, player, true);
});
IDRegistry.genItemID("infinity_destroyer");
Item.createShovelItem("infinity_destroyer", "item.avaritia:infinity_shovel.name", {name: "destroyer", meta: 0}, {stack: 1, isTech: true, tier: "INFINITY_SHOVEL"});
Item.registerUseFunction(ItemID.infinity_destroyer, function (coords, item, block, player) {
    if (Entity.getSneaking(player)) {
        var region_3 = BlockSource.getDefaultForActor(player);
        var drops_2 = [];
        region_3.setDestroyParticlesEnabled(false);
        for (var xx = coords.x - 8; xx < coords.x + 8; xx++) {
            for (var yy = coords.y - 8; yy < coords.y + 8; yy++) {
                for (var zz = coords.z - 8; zz < coords.z + 8; zz++) {
                    var state = region_3.getBlock(xx, yy, zz);
                    if (state.id == 0) {
                        continue;
                    }
                    if (ToolAPI.getBlockMaterialName(state.id) != "dirt") {
                        continue;
                    }
                    var drop = region_3.breakBlockForJsResult(xx, yy, zz, 0, item).items;
                    if (Array.isArray(drop)) {
                        drop.forEach(function (d) {
                            return drops_2.push(d);
                        });
                    }
                }
            }
        }
        region_3.setDestroyParticlesEnabled(true);
        MatterCluster.makeClusters(drops_2).forEach(function (cluster) {
            return dropItemRandom(cluster, region_3, coords.x, coords.y, coords.z);
        });
    }
});
Item.registerNoTargetUseFunction(ItemID.infinity_destroyer, function (item, player) {
    return shovel_use_func(item, player, false);
});
IAHelper.makeAdvancedAnim(ItemID.infinity_shovel, "infinity_shovel", 1, INFINITY_ITEM_FRAMES);
AVA_STUFF.push(ItemID.infinity_shovel);
Rarity.cosmic(ItemID.infinity_shovel);
Rarity.cosmic(ItemID.infinity_destroyer);
undestroyableItem(ItemID.infinity_shovel);
undestroyableItem(ItemID.infinity_destroyer);
IDRegistry.genItemID("infinity_axe");
ToolAPI.addToolMaterial("INFINITY_AXE", {level: 32, durability: 9999, efficiency: 9999, damage: 20, enchantability: 200});
Item.createAxeItem("infinity_axe", "item.avaritia:infinity_axe.name", {name: "infinity_axe", meta: 0}, {stack: 1, tier: "INFINITY_AXE"});
var destroy_trees = function (coords, region, item, player) {
    var blocks_map = ["".concat(coords.x, ":").concat(coords.y, ":").concat(coords.z)];
    var sides = [[-1, 0, 0], [1, 0, 0], [0, -1, 0], [0, 1, 0], [0, 0, -1], [0, 0, 1]];
    var check = function (c, r) {
        return sides.forEach(function (side) {
            var id = r.getBlockId(c.x + side[0], c.y + side[1], c.z + side[2]);
            if (id == VanillaBlockID.log || id == VanillaBlockID.log2 || id == VanillaBlockID.leaves || id == VanillaBlockID.leaves2) {
                if (!~blocks_map.indexOf("".concat(c.x + side[0], ":").concat(c.y + side[1], ":").concat(c.z + side[2]))) {
                    blocks_map.push("".concat(c.x + side[0], ":").concat(c.y + side[1], ":").concat(c.z + side[2]));
                    check({x: c.x + side[0], y: c.y + side[1], z: c.z + side[2]}, region);
                }
            }
        });
    };
    check(coords, region);
    region.setDestroyParticlesEnabled(false);
    blocks_map.forEach(function (str) {
        var splitted = str.split(":").map(Number);
        var vec = {x: splitted[0], y: splitted[1], z: splitted[2]};
        region.destroyBlock(vec.x, vec.y, vec.z, true);
    });
    region.setDestroyParticlesEnabled(true);
};
var destroy_nature = function (coords, region, item, player) {
    var drops = [];
    var materialsToDestroy = ["wood", "plant", "fibre"];
    region.setDestroyParticlesEnabled(false);
    for (var xx = coords.x - 13; xx < coords.x + 13; xx++) {
        for (var yy = coords.y - 3; yy < coords.y + 23; yy++) {
            for (var zz = coords.z - 13; zz < coords.z + 13; zz++) {
                var state = region.getBlock(xx, yy, zz);
                if (state.id == 0) {
                    continue;
                }
                if (state.id == VanillaBlockID.grass || state.id == VanillaBlockID.podzol) {
                    region.setBlock(xx, yy, zz, VanillaBlockID.dirt, 0);
                    continue;
                }
                var materialName = ToolAPI.getBlockMaterialName(state.id);
                if (materialName != null) {
                    if (!!~materialsToDestroy.indexOf(materialName)) {
                        var drop = region.breakBlockForJsResult(xx, yy, zz, 0, item).items;
                        if (Array.isArray(drop)) {
                            drop.forEach(function (item) {
                                return drops.push(item);
                            });
                        }
                    }
                }
            }
        }
    }
    region.setDestroyParticlesEnabled(true);
    MatterCluster.makeClusters(drops).forEach(function (cluster) {
        return dropItemRandom(cluster, region, coords.x, coords.y, coords.z);
    });
};
Callback.addCallback("DestroyBlock", function (coords, block, player) {
    var item = Entity.getCarriedItem(player);
    if (item.id == ItemID.infinity_axe && (block.id == VanillaBlockID.log || block.id == VanillaBlockID.log2)) {
        destroy_trees(coords, BlockSource.getDefaultForActor(player), item, player);
    }
});
Item.registerUseFunction(ItemID.infinity_axe, function (coords, item, block, player) {
    if (Entity.getSneaking(player)) {
        destroy_nature(coords, BlockSource.getDefaultForActor(player), item, player);
    }
});
Item.registerNoTargetUseFunction(ItemID.infinity_axe, function (item, player) {
    if (Entity.getSneaking(player)) {
        var pos = Entity.getPosition(player);
        destroy_nature(__assign(__assign({}, pos), {relative: pos, side: 0}), BlockSource.getDefaultForActor(player), item, player);
    }
});
AVA_STUFF.push(ItemID.infinity_axe);
Rarity.cosmic(ItemID.infinity_axe);
undestroyableItem(ItemID.infinity_axe);
IDRegistry.genItemID("infinity_hoe");
ToolAPI.addToolMaterial("INFINITY_HOE", {level: 32, durability: 9999, efficiency: 9999, damage: 20, enchantability: 200});
Item.createHoeItem("infinity_hoe", "item.avaritia:infinity_hoe.name", {name: "infinity_hoe", meta: 0}, {stack: 1, tier: "INFINITY_HOE"});
Item.registerUseFunction(ItemID.infinity_hoe, function (coords, item, block, player) {
    var region = BlockSource.getDefaultForActor(player);
    if ((block.id == 2 || block.id == 3) && coords.side == 1) {
        playSound(coords.x, coords.y, coords.z, region.getDimension(), "step.gravel", 1, 0.8);
        if (Entity.getSneaking(player)) {
            region.setBlock(coords.x, coords.y, coords.z, VanillaBlockID.farmland, 0);
        } else {
            for (var xx = coords.x - 13; xx < coords.x + 13; xx++) {
                for (var zz = coords.z - 13; zz < coords.z + 13; zz++) {
                    var id = region.getBlockId(xx, coords.y, zz);
                    if (id == 2 || id == 3) {
                        region.setBlock(xx, coords.y, zz, VanillaBlockID.farmland, 0);
                        continue;
                    } else {
                        if (id == 0 || World.canTileBeReplaced(id, region.getBlockData(xx, coords.y, zz))) {
                            var up = region.getBlock(xx, coords.y + 1, zz);
                            if (World.canTileBeReplaced(up.id, up.data)) {
                                region.destroyBlock(xx, coords.y + 1, zz, true);
                            }
                            region.setBlock(coords.x, coords.y, coords.z, VanillaBlockID.farmland, 0);
                        }
                    }
                }
            }
        }
    }
});
IAHelper.makeAdvancedAnim(ItemID.infinity_hoe, "infinity_hoe", 1, INFINITY_ITEM_FRAMES);
AVA_STUFF.push(ItemID.infinity_hoe);
Rarity.cosmic(ItemID.infinity_hoe);
undestroyableItem(ItemID.infinity_hoe);
IDRegistry.genItemID("infinity_helmet");
Item.createArmorItem("infinity_helmet", "item.avaritia:infinity_helmet.name", {name: "infinity_helmet", meta: 0}, {type: "helmet", armor: 6, durability: 9999, texture: "armor/infinity_0.png"}).setEnchantability(EEnchantType.HELMET, 1000);
AVA_STUFF.push(ItemID.infinity_helmet);
Rarity.cosmic(ItemID.infinity_helmet);
undestroyableItem(ItemID.infinity_helmet);
var EYE_DATA = {};
var EYE_COLOR_RANDOM = new Random();
var EYE_MESH = new RenderMesh();
EYE_MESH.importFromFile("".concat(__dir__, "/resources/res/models/eyes.obj"), "obj", null);
EYE_MESH.translate(0, 29 / 64, 7 / 32);
EYE_MESH.scale(1.2, 1.2, 1.2);
var initEyesObject = function (player) {
    var mesh = new RenderMesh();
    var renderer = new ActorRenderer("helmet");
    renderer.getPart("head").clear();
    renderer.addPart("eyes", "head", mesh).endPart();
    var attachable = new AttachableRender(player).setMaterial("avaritia_coloring").setRenderer(renderer);
    EYE_DATA[player] = {isWearingHelmet: false, renderer: renderer, attachable: attachable, mesh: mesh};
};
var toggleEyes = function (player, bool) {
    var _a;
    (_a = EYE_DATA[player]) !== null && _a !== void 0 ? _a : initEyesObject(player);
    EYE_DATA[player].mesh.clear();
    if (bool && EYE_DATA[player].isWearingHelmet) {
        EYE_DATA[player].mesh.addMesh(EYE_MESH);
    }
};
Network.addClientPacket("avaritia.iswearinghelmet.client", function (data) {
    var _a;
    (_a = EYE_DATA[data.player]) !== null && _a !== void 0 ? _a : initEyesObject(data.player);
    EYE_DATA[data.player].isWearingHelmet = data.bool;
    toggleEyes(data.player, data.bool);
});
Callback.addCallback("ServerPlayerLoaded", function (player) {
    Network.sendToAllClients("avaritia.iswearinghelmet.client", {player: player, bool: new PlayerActor(player).getArmor(EArmorType.HELMET).id == ItemID.infinity_helmet});
    var client = Network.getClientForPlayer(player);
    var players = Network.getConnectedPlayers();
    for (var i in players) {
        client.send("avaritia.iswearinghelmet.client", {player: players[i], bool: new PlayerActor(players[i]).getArmor(EArmorType.HELMET).id == ItemID.infinity_helmet});
    }
});
Armor.registerOnTakeOnListener(ItemID.infinity_helmet, function (item, slot, player) {
    return Network.sendToAllClients("avaritia.iswearinghelmet.client", {player: player, bool: true});
});
Armor.registerOnTakeOffListener(ItemID.infinity_helmet, function (item, slot, player) {
    return Network.sendToAllClients("avaritia.iswearinghelmet.client", {player: player, bool: false});
});
Callback.addCallback("LocalTick", function () {
    if (World.getThreadTime() % EYE_COLOR_UPDATE_FREQUENCY == 0) {
        EYE_COLOR_RANDOM_SEED_CHANGING && EYE_COLOR_RANDOM.setSeed(Math.round(World.getThreadTime() / 3) * 1723609);
        CONNECTED_PLAYERS.filter(function (pl) {
            return EYE_DATA[pl] && EYE_DATA[pl].isWearingHelmet && (pl == Player.get() || (Entity.getDimension(pl) == Player.getDimension() && Entity.getDistanceToEntity(Player.get(), pl) <= 64));
        }).forEach(function (pl) {
            var rgb = hsv2rgb(EYE_COLOR_RANDOM.nextFloat() * 6, 1, 1);
            EYE_DATA[pl].attachable.getUniformSet().setUniformValue("Avaritia", "COLOR_R", rgb[0]).setUniformValue("Avaritia", "COLOR_G", rgb[1]).setUniformValue("Avaritia", "COLOR_B", rgb[2]);
        });
    }
});
Callback.addCallback("LevelLeft", function () {
    return Object.keys(EYE_DATA).forEach(function (k) {
        return delete EYE_DATA[k];
    });
});
Network.addClientPacket("avaritia.playerdisconnect.helmet", function (data) {
    return delete EYE_DATA[data.player];
});
Callback.addCallback("ServerPlayerLeft", function (player) {
    return Network.sendToAllClients("avaritia.playerdisconnect.helmet", {player: player});
});
Armor.registerOnTickListener(ItemID.infinity_helmet, function (item, slot, player) {
    var actor = new KEX.Player(player);
    actor.setAirSupply(actor.getMaxAirSupply());
    if (World.getThreadTime() % 20 == 0) {
        Entity.addEffect(player, EPotionEffect.NIGHT_VISION, 1, 300, false, false);
        actor.getHunger() < 20 && actor.setHunger(20);
        actor.getSaturation() < 20 && actor.setSaturation(20);
    }
});
IDRegistry.genItemID("infinity_chestplate");
Item.createArmorItem("infinity_chestplate", "item.avaritia:infinity_chestplate.name", {name: "infinity_chestplate", meta: 0}, {type: "chestplate", armor: 16, durability: 9999, texture: "armor/infinity_0.png"}).setEnchantability(EEnchantType.CHESTPLATE, 1000);
AVA_STUFF.push(ItemID.infinity_chestplate);
Rarity.cosmic(ItemID.infinity_chestplate);
undestroyableItem(ItemID.infinity_chestplate);
Network.addClientPacket("avaritia.toggleflying", function (data) {
    return ensureWorldLoaded(function () {
        return ensurePlayerInGame(function () {
            if (new PlayerActor(Player.get()).getGameMode() != 1) {
                Player.setFlyingEnabled(data.bool);
            }
        });
    });
});
var gm = 1;
Callback.addCallback("GameModeChanged", function (mode) {
    if (mode != 1 && isWearingChestplateClient) {
        ensureWorldLoaded(function () {
            return ensurePlayerInGame(function () {
                return Player.setFlyingEnabled(true);
            });
        });
    }
    if (mode != gm) {
        gm = mode;
    }
});
var FLYING_MAP = {};
Network.addServerPacket("avaritia.flyingupdate.server", function (client, data) {
    return Network.sendToAllClients("avaritia.flyingupdate.client", {player: client.getPlayerUid(), bool: data.bool});
});
Network.addClientPacket("avaritia.flyingupdate.client", function (data) {
    var _a;
    (_a = WINGS_DATA[data.player]) !== null && _a !== void 0 ? _a : initWingsObject(data.player);
    FLYING_MAP[data.player] = data.bool;
    toggleWings(data.player, data.bool);
});
Network.addClientPacket("avaritia.firstflyingrequest", function () {
    lastFlyingClient = KEX.GlobalContext.getLocalPlayer().isFlying();
    Network.sendToServer("avaritia.flyingupdate.server", {bool: lastFlyingClient});
    Network.sendToServer("avaritia.chestplatedatarequest.server", {});
});
Network.addClientPacket("avaritia.iswearingchestplate.client", function (data) {
    var _a;
    (_a = WINGS_DATA[data.player]) !== null && _a !== void 0 ? _a : initWingsObject(data.player);
    ensureWorldLoaded(function () {
        return WINGS_DATA[data.player].isWearingChestplate = data.bool;
    });
    typeof FLYING_MAP[data.player] !== "undefined" && toggleWings(data.player, FLYING_MAP[data.player]);
});
var WINGS_DATA = {};
var initWingsObject = function (player) {
    return ensureWorldLoaded(function () {
        var renderer = new ActorRenderer().addPart("body").endPart().addPart("wings", "body").setTextureSize(128, 32).setTexture("render/wings.png").endPart();
        var attachable = new AttachableRender(player).setRenderer(renderer);
        WINGS_DATA[player] = {isWearingChestplate: false, renderer: renderer, attachable: attachable};
    });
};
var toggleWings = function (player, bool) {
    return ensureWorldLoaded(function () {
        if (bool && WINGS_DATA[player].isWearingChestplate) {
            WINGS_DATA[player].renderer.getPart("wings").clear().addBox(-28, -10, 3.015, 56, 30, 0, 0, 0, 0).endPart();
        } else {
            WINGS_DATA[player].renderer.getPart("wings").clear();
        }
    });
};
Callback.addCallback("ServerPlayerLoaded", function (player) {
    return Network.getClientForPlayer(player).send("avaritia.firstflyingrequest", {});
});
Network.addServerPacket("avaritia.chestplatedatarequest.server", function (client) {
    var players = Network.getConnectedPlayers();
    for (var i in players) {
        client.send("avaritia.iswearingchestplate.client", {player: players[i], bool: new PlayerActor(players[i]).getArmor(EArmorType.CHESTPLATE).id == ItemID.infinity_chestplate});
    }
});
var isWearingChestplateClient = false;
Network.addClientPacket("avaritia.chestplate", function (data) {
    return isWearingChestplateClient = data.bool;
});
Armor.registerOnTakeOnListener(ItemID.infinity_chestplate, function (item, slot, player) {
    var client = Network.getClientForPlayer(player);
    client.send("avaritia.toggleflying", {bool: true});
    client.send("avaritia.chestplate", {bool: true});
    Network.sendToAllClients("avaritia.iswearingchestplate.client", {player: player, bool: true});
});
Armor.registerOnTakeOffListener(ItemID.infinity_chestplate, function (item, slot, player) {
    var client = Network.getClientForPlayer(player);
    client.send("avaritia.toggleflying", {bool: false});
    client.send("avaritia.chestplate", {bool: false});
    Network.sendToAllClients("avaritia.iswearingchestplate.client", {player: player, bool: false});
});
var lastFlyingClient = false;
Callback.addCallback("LocalTick", function () {
    var flying = Player.getFlying();
    if (lastFlyingClient == flying) {
        return;
    }
    lastFlyingClient = flying;
    Network.sendToServer("avaritia.flyingupdate.server", {bool: flying});
});
Callback.addCallback("LevelLeft", function () {
    Object.keys(FLYING_MAP).forEach(function (k) {
        return delete FLYING_MAP[k];
    });
    Object.keys(WINGS_DATA).forEach(function (k) {
        return delete WINGS_DATA[k];
    });
    isWearingChestplateClient = false;
    lastFlyingClient = false;
});
Network.addClientPacket("avaritia.playerdisconnect.chestplate", function (data) {
    delete FLYING_MAP[data.player];
    delete WINGS_DATA[data.player];
});
Callback.addCallback("ServerPlayerLeft", function (player) {
    return Network.sendToAllClients("avaritia.playerdisconnect.chestplate", {player: player});
});
Armor.registerOnTickListener(ItemID.infinity_chestplate, function (item, slot, player) {
    return new KEX.Actor(player).removeEffects(true, false);
});
IDRegistry.genItemID("infinity_leggings");
Item.createArmorItem("infinity_leggings", "item.avaritia:infinity_pants.name", {name: "infinity_leggings", meta: 0}, {type: "leggings", armor: 12, durability: 9999, texture: "armor/infinity_1.png"}).setEnchantability(EEnchantType.LEGGINGS, 1000);
AVA_STUFF.push(ItemID.infinity_leggings);
Rarity.cosmic(ItemID.infinity_leggings);
undestroyableItem(ItemID.infinity_leggings);
IDRegistry.genItemID("infinity_boots");
Item.createArmorItem("infinity_boots", "item.avaritia:infinity_boots.name", {name: "infinity_boots", meta: 0}, {type: "boots", armor: 6, durability: 9999, texture: "armor/infinity_0.png"}).setEnchantability(EEnchantType.BOOTS, 1000);
AVA_STUFF.push(ItemID.infinity_boots);
Rarity.cosmic(ItemID.infinity_boots);
undestroyableItem(ItemID.infinity_boots);
var isWearingBootsClient = false;
Network.addClientPacket("avaritia.iswearingboots.client", function (data) {
    return isWearingBootsClient = data.bool;
});
Armor.registerOnTakeOnListener(ItemID.infinity_boots, function (item, slot, player) {
    return Network.getClientForPlayer(player).send("avaritia.iswearingboots.client", {bool: true});
});
Armor.registerOnTakeOffListener(ItemID.infinity_boots, function (item, slot, player) {
    return Network.getClientForPlayer(player).send("avaritia.iswearingboots.client", {bool: false});
});
Callback.addCallback("LocalTick", function () {
    if (isWearingBootsClient) {
        var player = KEX.GlobalContext.getLocalPlayer();
        var flying = player.isFlying();
        var swimming = player.isInWater();
        if (player.isOnGround() || flying || swimming) {
            var sneaking = player.isSneaking();
            var speed = 0.15 * (flying ? 1.1 : 1) * (sneaking ? 0.1 : 1);
            var mih = player.getMoveInputHandler();
            var moveForward = mih.getMovingForward();
            var moveStrafing = mih.getMovingBackward();
            if (moveForward > 0) {
                player.moveRelative(0, 0, 1, speed);
            } else {
                if (moveForward < 0) {
                    player.moveRelative(0, 0, 1, -speed * 0.3);
                }
            }
            if (moveStrafing != 0) {
                player.moveRelative(1, 0, 0, speed * 0.5 * java.lang.Math.signum(moveStrafing));
            }
        }
    }
});
Network.addClientPacket("avaritia.bootsjumpboost", function () {
    return Entity.addVelocity(Player.get(), 0, 0.4, 0);
});
Callback.addCallback("PlayerJump", function (player) {
    var _a;
    if (Entity.getArmorSlot(player, 3).id == ItemID.infinity_boots) {
        (_a = Network.getClientForPlayer(player)) === null || _a === void 0 ? void 0 : _a.send("avaritia.bootsjumpboost", {});
    }
});
IDRegistry.genItemID("skullfire_sword");
Item.createSwordItem("skullfire_sword", "item.avaritia:skullfire_sword.name", {name: "skull_sword", meta: 0}, {stack: 1, tier: "diamond"});
addTooltip(ItemID.skullfire_sword, "tooltip.skullfire_sword.desc");
Rarity.epic(ItemID.skullfire_sword);
IAHelper.makeAdvancedAnim(ItemID.skullfire_sword, "skull_sword", 1, [0, 0, 0, 1, 1, 2, 2, 3, 2, 2, 1, 1]);
AVA_STUFF.push(ItemID.skullfire_sword);
undestroyableItem(ItemID.skullfire_sword);
(function () {
    var skullCallback = function (drops, context) {
        var player = context.getKillerPlayer();
        if (player != null && player.getCarriedItem().id == ItemID.skullfire_sword) {
            if (drops.isEmpty()) {
                drops.addItem(397, 1, 1);
            } else {
                var skulls = 0;
                for (var i = 0; i < drops.size(); ++i) {
                    var item = drops.get(i);
                    if (item.id == 397) {
                        if (item.data == 1) {
                            skulls++;
                        } else {
                            if (item.data == 0) {
                                item.data = 1;
                                drops.markChanged();
                                skulls++;
                            }
                        }
                    }
                }
                if (skulls == 0) {
                    drops.addItem(397, 1, 1);
                }
            }
        }
    };
    KEX.LootModule.addOnDropCallbackFor("entities/skeleton", skullCallback);
    KEX.LootModule.addOnDropCallbackFor("entities/wither_skeleton", skullCallback);
})();
IDRegistry.genItemID("endest_pearl");
Item.createThrowableItem("endest_pearl", "item.avaritia:endest_pearl.name", {name: "endest_pearl", meta: 0}, {stack: 16});
Item.registerNameOverrideFunction(ItemID.endest_pearl, function (item, name) {
    return name + " \xa7c[WIP]\xa7r";
});
Rarity.rare(ItemID.endest_pearl);
var GapingVoid;
(function (GapingVoid) {
    GapingVoid.maxLifetime = 186;
    GapingVoid.collapse = 0.95;
    GapingVoid.suckRange = 20;
    var MESH = new RenderMesh();
    MESH.importFromFile("".concat(__dir__, "/resources/res/models/gaping_void.obj"), "obj", null);
    function SUCK_PREDICATE(input) {
        if (!Entity.isExist(input)) {
            return false;
        }
        if (Entity.getType(input) == EEntityType.PLAYER) {
            return new PlayerActor(input).getGameMode() != 1;
        } else {
            return true;
        }
    }
    GapingVoid.SUCK_PREDICATE = SUCK_PREDICATE;
    function OMNOM_PREDICATE(input) {
        if (!Entity.isExist(input)) {
            return false;
        }
        if (Entity.getType(input) == EEntityType.PLAYER) {
            return new PlayerActor(input).getGameMode() != 1;
        } else {
            if (Entity.getType(input) == EEntityType.ITEM) {
                return !~INFINITY_TOOLS.indexOf(Entity.getDroppedItem(input).id);
            } else {
                return true;
            }
        }
    }
    GapingVoid.OMNOM_PREDICATE = OMNOM_PREDICATE;
    function summonServerSide(coords, region) {
        var age = 0;
        Updatable.addUpdatable({update: function () {
            if (age >= GapingVoid.maxLifetime) {
                region.explode(coords.x, coords.y, coords.z, 6, true);
                this.remove = true;
                return;
            } else {
                if (age == 0) {
                    playSound(coords.x, coords.y, coords.z, region.getDimension(), "mob.endermen.stare", 8, 1);
                }
            }
            age++;
            var pos = new Vector3(coords.x, coords.y, coords.z);
            var aabb = new Cuboid6().add(pos).expandXYZ(GapingVoid.suckRange).aabb();
            var radius = getVoidScale(age) * 0.5;
            region.listEntitiesInAABB(aabb[0], aabb[1], aabb[2], aabb[3], aabb[4], aabb[5], -1, true).filter(SUCK_PREDICATE).forEach(function (suckee) {
                var suckeePos = Entity.getPosition(suckee);
                var dx = coords.x - suckeePos.x;
                var dy = coords.y - suckeePos.y;
                var dz = coords.z - suckeePos.z;
                var len = Math.sqrt(dx * dx + dy * dy + dz * dz);
                var lenn = len / GapingVoid.suckRange;
                if (len <= GapingVoid.suckRange) {
                    var strength = Math.pow(1 - lenn, 2);
                    var power = 0.075 * radius;
                    Entity.addVelocity(suckee, (dx / len) * strength * power, (dy / len) * strength * power, (dz / len) * strength * power);
                }
            });
            var nomrange = radius * 0.95;
            aabb = new Cuboid6().add(pos).expandXYZ(nomrange).aabb();
            region.listEntitiesInAABB(aabb[0], aabb[1], aabb[2], aabb[3], aabb[4], aabb[5], -1, true).filter(OMNOM_PREDICATE).forEach(function (nommee) {
                var nomedPos = Vector3.fromEntity(nommee);
                var len = pos.copy().subtract(nomedPos.x, nomedPos.y, nomedPos.z).mag();
                if (len <= nomrange) {
                    Entity.damageEntity(nommee, 3, 12);
                }
            });
            if (age % 10 == 0) {
                var posFloor = pos.copy().floor();
                var blockrange = Math.round(nomrange);
                for (var y = -blockrange; y <= blockrange; y++) {
                    for (var z = -blockrange; z <= blockrange; z++) {
                        for (var x = -blockrange; x <= blockrange; x++) {
                            var pos2 = new Vector3(x, y, z);
                            var rPos = posFloor.copy().add(pos2.x, pos2.y, pos2.z);
                            if (rPos.y < 0 || rPos.y > 255) {
                                continue;
                            }
                            var dist = pos2.mag();
                            var bid = region.getBlockId(rPos.x, rPos.y, rPos.z);
                            if (dist <= nomrange && bid != 0) {
                                if (Block.getExplosionResistance(bid) <= 10) {
                                    region.destroyBlock(rPos.x, rPos.y, rPos.z, Math.random() <= 0.9);
                                }
                            }
                        }
                    }
                }
            }
        }});
    }
    GapingVoid.summonServerSide = summonServerSide;
    function summonClientSide(coords) {
        var particlespeed = 10;
        var anim = new Animation.Base(coords.x, coords.y, coords.z);
        anim.describe({mesh: MESH, material: "avaritia_coloring", skin: "render/pixel.png"});
        var age = 0;
        anim.loadCustom(function () {
            if (age >= GapingVoid.maxLifetime) {
                anim.destroy();
                this.remove = true;
                return;
            }
            age++;
            for (var i = 0; i < VOID_PARTICLES_PER_TICK; i++) {
                var particlePos = new Vector3(0, 0, getVoidScale(age) * 0.5 - 0.2);
                particlePos.rotate(rand.nextFloat() * 180, new Vector3(0, 1, 0));
                particlePos.rotate(rand.nextFloat() * 360, new Vector3(1, 0, 0));
                var velocity = particlePos.copy().normalize();
                velocity.multiplyXYZ(particlespeed);
                particlePos.add(coords.x, coords.y, coords.z);
                Particles.addParticle(21, particlePos.x, particlePos.y, particlePos.z, velocity.x, velocity.y, velocity.z);
            }
            var scale = getVoidScale(age) * 0.05 - 0.2;
            anim.transform().lock().clear().scale(scale, scale, scale).translate(2, 2, 2).unlock();
            var color = getVoidColor(age, 1);
            anim.getShaderUniforms().setUniformValue("Avaritia", "COLOR_R", color[0]).setUniformValue("Avaritia", "COLOR_G", color[1]).setUniformValue("Avaritia", "COLOR_B", color[2]);
            anim.refresh();
        });
        anim.setIgnoreLightMode();
        anim.setInterpolationEnabled(true);
        var initial_scale = getVoidScale(0);
        anim.transform().lock().clear().scale(initial_scale, initial_scale, initial_scale).translate(2, 2, 2).unlock();
        var initial_color = getVoidColor(0, 1);
        anim.getShaderUniforms().setUniformValue("Avaritia", "COLOR_R", initial_color[0]).setUniformValue("Avaritia", "COLOR_G", initial_color[1]).setUniformValue("Avaritia", "COLOR_B", initial_color[2]);
    }
    GapingVoid.summonClientSide = summonClientSide;
    function getVoidScale(age) {
        var life = age / GapingVoid.maxLifetime;
        var curve;
        if (life < GapingVoid.collapse) {
            curve = 0.005 + ease(1 - ((GapingVoid.collapse - life) / GapingVoid.collapse)) * 0.995;
        } else {
            curve = ease(1 - ((life - GapingVoid.collapse) / (1 - GapingVoid.collapse)));
        }
        return 10 * curve;
    }
    GapingVoid.getVoidScale = getVoidScale;
    function ease(d) {
        var t = d - 1;
        return Math.sqrt(1 - t * t);
    }
    function getVoidColor(age, alpha) {
        var life = age / GapingVoid.maxLifetime;
        var f = Math.max(0, (life - GapingVoid.collapse) / (1 - GapingVoid.collapse));
        f = Math.round(Math.max(f, 1 - (life * 30)));
        return [f, f, f, Math.round(alpha)];
    }
    GapingVoid.getVoidColor = getVoidColor;
})(GapingVoid || (GapingVoid = {}));
Network.addClientPacket("avaritia.gapingvoidclient", function (data) {
    return GapingVoid.summonClientSide(data);
});
var summon_gaping_void = function (coords, region) {
    GapingVoid.summonServerSide(coords, region);
    var iter = new NetworkConnectedClientList().setupDistancePolicy(coords.x, coords.y, coords.z, region.getDimension(), MAX_GAPING_VOID_VIEW_DISTANCE).iterator();
    while (iter.hasNext()) {
        iter.next().send("avaritia.gapingvoidclient", coords);
    }
};
Item.registerThrowableFunction(ItemID.endest_pearl, function (proj, item, target) {
    var _a;
    var coords = (_a = target.coords) !== null && _a !== void 0 ? _a : Entity.getPosition(target.entity);
    summon_gaping_void(coords, BlockSource.getDefaultForActor(proj));
    Entity.remove(proj);
});
IAHelper.makeAdvancedAnim(ItemID.endest_pearl, "endest_pearl", 1, [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 3, 4, 4, 3, 3, 2, 1, 1]);
AVA_STUFF.push(ItemID.endest_pearl);
IDRegistry.genItemID("ultimate_stew");
IDRegistry.genItemID("cosmic_meatballs");
Item.createFoodItem("ultimate_stew", "item.avaritia:ultimate_stew.name", {name: "ultimate_stew", meta: 0}, {stack: 64, food: 20, saturation_modifier: "normal", is_meat: false, effects: [{name: "regeneration", chance: 1, duration: 300, amplifier: 1}]});
Item.createFoodItem("cosmic_meatballs", "item.avaritia:cosmic_meatballs.name", {name: "cosmic_meatballs", meta: 0}, {stack: 64, food: 20, saturation_modifier: "normal", is_meat: false, effects: [{name: "strength", chance: 1, duration: 300, amplifier: 1}]});
IAHelper.makeCommonAnim(ItemID.ultimate_stew, "ultimate_stew", 2, 28);
IAHelper.makeAdvancedAnim(ItemID.cosmic_meatballs, "cosmic_meatballs", 1, [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 4, 4, 5, 6, 7, 6, 5, 4, 4, 3, 3, 2, 2, 2, 1, 1, 1]);
AVA_STUFF.push(ItemID.ultimate_stew, ItemID.cosmic_meatballs);
IDRegistry.genBlockID("compressed_crafting_table");
IDRegistry.genBlockID("double_compressed_crafting_table");
IDRegistry.genBlockID("extreme_crafting_table");
Block.createBlock("compressed_crafting_table", [{name: "tile.avaritia:compressed_crafting_table.name", texture: [["compressed_crafting_table", 0]], inCreative: true}], {destroytime: 4, sound: "wood"});
Block.createBlock("double_compressed_crafting_table", [{name: "tile.avaritia:double_compressed_crafting_table.name", texture: [["double_compressed_crafting_table", 0]], inCreative: true}], {destroytime: 20, sound: "wood"});
Block.createBlock("extreme_crafting_table", [{name: "tile.avaritia:extreme_crafting_table.name", texture: [["extreme_crafting_table_side", 0], ["extreme_crafting_table_top", 0], ["extreme_crafting_table_side", 0]], inCreative: true}], {destroytime: 50, explosionres: 2000, sound: "glass"});
ToolAPI.registerBlockMaterial(BlockID.compressed_crafting_table, "wood", 0, false);
ToolAPI.registerBlockMaterial(BlockID.double_compressed_crafting_table, "wood", 1, false);
ToolAPI.registerBlockMaterial(BlockID.extreme_crafting_table, "stone", 3, false);
AVA_STUFF.push(BlockID.compressed_crafting_table, BlockID.double_compressed_crafting_table, BlockID.extreme_crafting_table);
Callback.addCallback("PostLoaded", function () {
    addShaped(BlockID.compressed_crafting_table, 1, 0, ["ttt", "ttt", "ttt"], ["t", VanillaBlockID.crafting_table, 0]);
    addShaped(BlockID.double_compressed_crafting_table, 1, 0, ["ttt", "ttt", "ttt"], ["t", BlockID.compressed_crafting_table, 0]);
    addShaped(BlockID.extreme_crafting_table, 1, 0, ["iii", "iti", "iii"], ["i", ItemID.crystal_matrix_ingot, 0, "t", BlockID.double_compressed_crafting_table, 0]);
    addShapeless(VanillaBlockID.crafting_table, 9, 0, [[BlockID.compressed_crafting_table, 0]]);
    addShapeless(BlockID.compressed_crafting_table, 9, 0, [[BlockID.double_compressed_crafting_table, 0]]);
});
var ExtremeCraftingTable;
(function (ExtremeCraftingTable) {
    ExtremeCraftingTable.workbench_obj = new ((function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super.call(this, {columns: 9, rows: 9}) || this;
        }
        return class_1;
    }(RecipeTE.Workbench)))();
    var checkIfRecipeNameDoesNotExist = function (recipeName) {
        if (ExtremeCraftingTable.workbench_obj._recipes.findIndex(function (recipe) {
            return recipe.data == recipeName;
        }) !== -1) {
            throw new java.lang.IllegalArgumentException("Extreme crafting recipe with name ".concat(recipeName, " already exists, skipping..."));
        }
    };
    function addShaped(recipeName, result, mask, keys, func) {
        checkIfRecipeNameDoesNotExist(recipeName);
        if (keys.length % 3 != 0) {
            throw new java.lang.IllegalArgumentException("Key array in extreme crafting table shaped recipe must be like [char, number, number, ...]");
        }
        var ingredients = {};
        for (var i = 0; i < keys.length; i += 3) {
            if (typeof keys[i] === "string" && typeof keys[i + 1] === "number" && typeof keys[i + 2] === "number") {
                ingredients[keys[i]] = {id: keys[i + 1], data: keys[i + 2]};
            } else {
                throw new java.lang.IllegalArgumentException();
            }
        }
        ExtremeCraftingTable.workbench_obj.addShapeRecipe(result, mask, ingredients, recipeName, func);
    }
    ExtremeCraftingTable.addShaped = addShaped;
    function addShapeless(recipeName, result, items, func) {
        checkIfRecipeNameDoesNotExist(recipeName);
        if (items.length > 81) {
            throw new java.lang.IllegalArgumentException("Extreme crafting table has only 81 slots!");
        }
        var counts = {};
        items.forEach(function (element) {
            var key = "".concat(element[0], ":").concat(element[1]);
            if (!counts[key]) {
                counts[key] = 1;
            } else {
                counts[key]++;
            }
        });
        var uniqueIngredients = [];
        for (var key in counts) {
            var count = counts[key];
            var iddata = key.split(":");
            var id = parseInt(iddata[0]);
            var data = parseInt(iddata[1]);
            uniqueIngredients.push({id: id, count: count, data: data});
        }
        ExtremeCraftingTable.workbench_obj.addRecipe(result, uniqueIngredients, recipeName, func);
    }
    ExtremeCraftingTable.addShapeless = addShapeless;
    function remove(recipeName) {
        var index = ExtremeCraftingTable.workbench_obj._recipes.findIndex(function (recipe) {
            return recipe.data == recipeName;
        });
        if (index !== -1) {
            ExtremeCraftingTable.workbench_obj._recipes.splice(index, 1);
        }
    }
    ExtremeCraftingTable.remove = remove;
    function getAllSeparately() {
        var all = {shaped: [], shapeless: []};
        ExtremeCraftingTable.workbench_obj._recipes.forEach(function (recinst) {
            var output = {id: recinst.result.id, count: recinst.result.count, data: recinst.result.data};
            isGivenRecipeShapeless(recinst) ? all.shapeless.push({output: [output], input: getListForShapelessRecipe(recinst)}) : all.shaped.push({output: [output], input: getListForShapedRecipe(recinst)});
        });
        return all;
    }
    ExtremeCraftingTable.getAllSeparately = getAllSeparately;
    function isGivenRecipeShapeless(recipe) {
        for (var key in recipe.ingredients) {
            if (key.length > 1) {
                return true;
            }
        }
        return false;
    }
    function getListForShapelessRecipe(recipe) {
        var items = [];
        for (var key in recipe.ingredients) {
            var ingr = recipe.ingredients[key];
            var data = parseInt(key.split(":")[1]);
            for (var i = 0; i < ingr.count; ++i) {
                items.push({id: ingr.id, count: 1, data: data});
            }
        }
        return items;
    }
    function getListForShapedRecipe(recipe) {
        var items = [];
        __spreadArray([], __read(recipe.mask), false).map(function (str) {
            return str.length < 9 ? "".concat(str).concat(" ".repeat(9).substr(str.length)) : str;
        }).forEach(function (str) {
            var _a;
            for (var j = 0; j < str.length; j++) {
                var ingredient = recipe.ingredients[str[j]];
                if (ingredient) {
                    items.push({id: ingredient.id, count: 1, data: (_a = ingredient.data) !== null && _a !== void 0 ? _a : -1});
                } else {
                    items.push({id: 0, count: 0, data: 0});
                }
            }
        });
        return items;
    }
})(ExtremeCraftingTable || (ExtremeCraftingTable = {}));
var GUI_EXTREME_CRAFTING = new UI.Window({location: {width: 1000, height: UI.getScreenHeight(), x: 0, y: 0, scrollX: 1000, scrollY: 600}, drawing: [{type: "background", color: Color.argb(90, 0, 0, 0)}, {type: "bitmap", x: 262, y: 40, scale: 2, bitmap: "avaritia.extreme_crafting"}], elements: (function () {
    var elements = {textHeader: {type: "text", x: 500, y: 0, font: {alignment: UI.Font.ALIGN_CENTER}, text: Translation.translate("tile.avaritia:extreme_crafting_table.name")}, slotResult: {type: "slot", x: 680, y: 198, size: 36, isValid: function () {
        return false;
    }, visual: false, bitmap: "_default_slot_empty", isTransparentBackground: true}, close: {type: "closeButton", x: 697, y: 51, bitmap: "classic_close_button", bitmap2: "classic_close_button_down", scale: 2}};
    for (var i = 0; i < 81; i++) {
        elements["slotInput".concat(i)] = {type: "slot", x: 284 + (i % 9) * 36, y: 54 + Math.floor(i / 9) * 36, size: 36, visual: false};
    }
    for (var i = 9; i < 36; i++) {
        elements["slotInv".concat(i)] = {type: "invSlot", x: 338 + (i % 9) * 36, y: 386 + Math.floor((i - 9) / 9) * 36, size: 36, index: i};
    }
    for (var i = 0; i < 9; i++) {
        elements["slotInv".concat(i)] = {type: "invSlot", x: 338 + i * 36, y: 502, size: 36, index: i};
    }
    return elements;
})()});
GUI_EXTREME_CRAFTING.setInventoryNeeded(true);
GUI_EXTREME_CRAFTING.setCloseOnBackPressed(true);
var TileExtremeCraftingTable = (function (_super) {
    __extends(TileExtremeCraftingTable, _super);
    function TileExtremeCraftingTable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TileExtremeCraftingTable.prototype.getScreenName = function () {
        return "main";
    };
    TileExtremeCraftingTable.prototype.getScreenByName = function () {
        return GUI_EXTREME_CRAFTING;
    };
    TileExtremeCraftingTable.prototype.getInputSlots = function () {
        return "slotInput";
    };
    TileExtremeCraftingTable.prototype.getOutputSlot = function () {
        return "slotResult";
    };
    return TileExtremeCraftingTable;
}(RecipeTE.WorkbenchTileEntity));
TileEntity.registerPrototype(BlockID.extreme_crafting_table, new TileExtremeCraftingTable(ExtremeCraftingTable.workbench_obj));
["neutronium", "infinity", "crystal_matrix"].forEach(function (key) {
    var id = "".concat(key, "_block");
    IDRegistry.genBlockID(id);
    Block.createBlock(id, [{name: "tile.avaritia:block_resource.".concat(key, ".name.name"), texture: [[key, 0]], inCreative: true}], {sound: "metal", destroytime: 50, explosionres: 2000});
    ToolAPI.registerBlockMaterial(BlockID[id], "stone", 3, false);
    AVA_STUFF.push(BlockID[id]);
});
Callback.addCallback("PostLoaded", function () {
    ["neutronium", "infinity", "crystal_matrix"].forEach(function (key) {
        var block = BlockID["".concat(key, "_block")];
        var ingot = ItemID["".concat(key, "_ingot")];
        addShaped(block, 1, 0, ["mmm", "mmm", "mmm"], ["m", ingot, 0]);
        addShapeless(ingot, 9, 0, [[block, 0]]);
    });
});
IDRegistry.genBlockID("neutron_collector");
Block.createBlockWithRotation("neutron_collector", [{name: "tile.avaritia:neutron_collector.name", texture: [["avaritia_machine_side", 0], ["collector_top", 0], ["avaritia_machine_side", 0], ["collector_active", 0], ["avaritia_machine_side", 0], ["avaritia_machine_side", 0]], inCreative: true}], {sound: "metal", destroytime: 20});
ToolAPI.registerBlockMaterial(BlockID.neutron_collector, "stone", 3, false);
AVA_STUFF.push(BlockID.neutron_collector);
var GUI_COLLECTOR = new UI.Window({location: {x: 0, y: 0, width: 1000, height: UI.getScreenHeight()}, drawing: [{type: "background", color: Color.argb(90, 0, 0, 0)}, {type: "bitmap", x: 279.5, y: (UI.getScreenHeight() - 415) / 2, scale: 2.5, bitmap: "avaritia.collector"}], elements: (function () {
    var offset = (UI.getScreenHeight() - 415) / 2;
    var font = {alignment: UI.Font.ALIGN_CENTER, color: Color.BLACK};
    var elems = {textInventory: {type: "text", x: 365, y: offset + 193, font: font, text: Translation.translate("avaritia.inventory")}, textHeader: {type: "text", x: 500, y: offset + 20, font: font, text: Translation.translate("container.neutron_collector")}, slotOutput: {type: "slot", x: 476.5, y: offset + 84, size: 47, isValid: function () {
        return false;
    }, visual: false, bitmap: "_default_slot_empty", isTransparentBackground: true}, textProgress: {type: "text", x: 500, y: offset + 150, font: font, text: "Progress: 0.0%"}, closeButton: {type: "closeButton", x: 666.5, y: offset + 9, bitmap: "classic_close_button", bitmap2: "classic_close_button_down", scale: 3}};
    for (var i = 9; i < 36; i++) {
        elems["slotInv".concat(i)] = {type: "invSlot", x: 296.5 + (i % 9) * 45, y: offset + 207 + Math.floor((i - 9) / 9) * 45, index: i, size: 47};
    }
    for (var i = 0; i < 9; i++) {
        elems["slotInv".concat(i)] = {type: "invSlot", x: 296.5 + i * 45, y: offset + 352, index: i, size: 47};
    }
    return elems;
})()});
GUI_COLLECTOR.setInventoryNeeded(true);
GUI_COLLECTOR.setCloseOnBackPressed(true);
var CollectorTileEntity = (function (_super) {
    __extends(CollectorTileEntity, _super);
    function CollectorTileEntity() {
        return _super.call(this, {progress: 0}) || this;
    }
    CollectorTileEntity.prototype.getScreenByName = function () {
        return GUI_COLLECTOR;
    };
    CollectorTileEntity.prototype.tick = function () {
        StorageInterface.checkHoppers(this);
        var slot = this.container.getSlot("slotOutput");
        if (slot.id == 0 || (slot.id == ItemID.neutron_pile && slot.count < Item.getMaxStack(ItemID.neutron_pile))) {
            if (++this.data.progress >= COLLECTOR_PROCESS_TIME) {
                this.container.setSlot("slotOutput", ItemID.neutron_pile, slot.count + 1, slot.data, slot.extra);
                this.data.progress = 0;
                this.container.setText("textProgress", "Progress: 0.0%");
                this.container.sendChanges();
                return;
            }
            this.container.setText("textProgress", "Progress: ".concat((this.data.progress / COLLECTOR_PROCESS_TIME * 100).toFixed(1), "%"));
            this.container.sendChanges();
        }
    };
    CollectorTileEntity.prototype.click = function (id, count, data, coords, player) {
        if (!Entity.getSneaking(player)) {
            Game.prevent();
            this.container.openFor(Network.getClientForPlayer(player), "main");
            this.container.sendChanges();
        }
    };
    return CollectorTileEntity;
}(TileEntityImplementation));
TileEntity.registerPrototype(BlockID.neutron_collector, new CollectorTileEntity());
StorageInterface.createInterface(BlockID.neutron_collector, {slots: {slotOutput: {input: false, output: true}}, getOutputSlots: function () {
    return ["slotOutput"];
}});
VanillaSlots.registerForTile(BlockID.neutron_collector);
IDRegistry.genBlockID("neutronium_compressor");
Block.createBlockWithRotation("neutronium_compressor", [{name: "tile.avaritia:neutronium_compressor.name", texture: [["avaritia_machine_side", 0], ["compressor_top", 0], ["avaritia_machine_side", 0], ["compressor_active", 0], ["avaritia_machine_side", 0], ["avaritia_machine_side", 0]], inCreative: true}], {sound: "metal", destroytime: 20});
ToolAPI.registerBlockMaterial(BlockID.neutronium_compressor, "stone", 3, false);
AVA_STUFF.push(BlockID.neutronium_compressor);
var GUI_COMPRESSOR = new UI.Window({location: {x: 0, y: 0, width: 1000, height: UI.getScreenHeight()}, drawing: [{type: "background", color: Color.argb(90, 0, 0, 0)}, {type: "bitmap", x: 279.5, y: (UI.getScreenHeight() - 415) / 2, scale: 2.5, bitmap: "avaritia.compressor"}], elements: (function () {
    var offset = (UI.getScreenHeight() - 415) / 2;
    var font = {alignment: UI.Font.ALIGN_CENTER, color: Color.BLACK};
    var elems = {textInventory: {type: "text", x: 365, y: offset + 193, font: font, text: Translation.translate("avaritia.inventory")}, textHeader: {type: "text", x: 500, y: offset + 5, font: font, text: Translation.translate("container.neutronium_compressor")}, textAmount: {type: "text", x: 500, y: offset + 143, font: font, text: ""}, textInput: {type: "text", x: 330, y: offset + 45, font: font, text: ""}, textOutput: {type: "text", x: 670, y: offset + 45, font: font, text: ""}, slotInput: {type: "slot", x: 373.5, y: offset + 84, size: 47, isValid: function (id, count, data, container) {
        return Singularity.isValidMaterial(id, data) && Singularity.getRecipeResult(id) == container.getParent().data.resultId;
    }, visual: false}, slotOutput: {type: "slot", x: 569.5, y: offset + 84, size: 47, isValid: function () {
        return false;
    }, visual: false, bitmap: "_default_slot_empty", isTransparentBackground: true}, slotInputVisual: {type: "slot", x: 306.5, y: offset + 84, size: 47, bitmap: "_default_slot_empty", isTransparentBackground: true, visual: true, maxStackSize: 1}, slotOutputVisual: {type: "slot", x: 646.5, y: offset + 84, size: 47, bitmap: "_default_slot_empty", isTransparentBackground: true, visual: true, maxStackSize: 1}, arrowScale: {type: "scale", x: 434.5, y: offset + 86, scale: 2.5, bitmap: "avaritia.compressor_arrow", direction: 0, value: 0}, singularityScale: {type: "scale", x: 504.5, y: offset + 86, scale: 2.625, bitmap: "avaritia.compressor_singularity", direction: 1, value: 0}, closeButton: {type: "closeButton", x: 666.5, y: offset + 9, bitmap: "classic_close_button", bitmap2: "classic_close_button_down", scale: 3}};
    for (var i = 9; i < 36; i++) {
        elems["slotInv".concat(i)] = {type: "invSlot", x: 296.5 + (i % 9) * 45, y: offset + 207 + Math.floor((i - 9) / 9) * 45, index: i, size: 47};
    }
    for (var i = 0; i < 9; i++) {
        elems["slotInv".concat(i)] = {type: "invSlot", x: 296.5 + i * 45, y: offset + 352, index: i, size: 47};
    }
    return elems;
})()});
GUI_COMPRESSOR.setInventoryNeeded(true);
GUI_COMPRESSOR.setCloseOnBackPressed(true);
var CompressorTileEntity = (function (_super) {
    __extends(CompressorTileEntity, _super);
    function CompressorTileEntity() {
        return _super.call(this, {put: 0, toPut: 1, isActive: false, resultId: null}) || this;
    }
    CompressorTileEntity.prototype.getScreenByName = function () {
        return GUI_COMPRESSOR;
    };
    CompressorTileEntity.prototype.updateHints = function () {
        this.container.setText("textInput", "Input");
        this.container.setText("textOutput", "Output");
        var slot = this.container.getSlot("slotInput");
        if (slot.id == 0 && this.data.resultId !== null) {
            var material = Singularity.getMaterialForSingularity(this.data.resultId);
            material != -1 && this.container.setSlot("slotInputVisual", material, 1, 0, null);
        } else {
            this.container.setSlot("slotInputVisual", slot.id, 1, slot.data, null);
        }
        this.data.resultId !== null && this.container.setSlot("slotOutputVisual", this.data.resultId, 1, 0, null);
        this.container.setText("textAmount", "".concat(this.data.put, " / ").concat(this.data.toPut));
        var progress = this.data.put / this.data.toPut;
        this.container.setScale("arrowScale", progress);
        this.container.setScale("singularityScale", progress);
        this.container.sendChanges();
    };
    CompressorTileEntity.prototype.hideHints = function () {
        this.container.setText("textInput", "");
        this.container.setText("textOutput", "");
        this.container.clearSlot("slotInputVisual");
        this.container.clearSlot("slotOutputVisual");
        this.container.setText("textAmount", "");
        this.container.sendChanges();
    };
    CompressorTileEntity.prototype.decreaseMaterial = function (slin, slout) {
        this.container.setSlot("slotInput", slin.id, slin.count - 1, slin.data, slin.extra);
        this.container.validateSlot("slotInput");
        this.data.put++;
        if (this.data.put == this.data.toPut) {
            this.container.setSlot("slotOutput", this.data.resultId, slout.count + 1, slout.data, slout.extra);
            this.data.put = 0;
            this.data.toPut = 1;
            this.data.isActive = false;
            this.data.resultId = null;
            this.hideHints();
        } else {
            this.updateHints();
        }
    };
    CompressorTileEntity.prototype.tick = function () {
        StorageInterface.checkHoppers(this);
        var slin = this.container.getSlot("slotInput");
        var slout = this.container.getSlot("slotOutput");
        if (Singularity.isValidMaterial(slin.id, slin.data)) {
            if (this.data.isActive && this.data.resultId != null && Singularity.getRecipeResult(slin.id) == this.data.resultId && (slout.id == 0 || (slout.id == this.data.resultId && slout.count > 0 && slout.count < Item.getMaxStack(this.data.resultId)))) {
                return this.decreaseMaterial(slin, slout);
            }
            if (!this.data.isActive && slin.id != 0 && slin.count > 0 && (slout.id == 0 || slout.id == Singularity.getRecipeResult(slin.id))) {
                this.data.isActive = true;
                this.data.toPut = Singularity.getRequiredMaterialCount(slin.id);
                this.data.resultId = Singularity.getRecipeResult(slin.id);
                this.decreaseMaterial(slin, slout);
            }
        }
    };
    CompressorTileEntity.prototype.destroy = function () {
        this.container.clearSlot("slotInputVisual");
        this.container.clearSlot("slotOutputVisual");
        this.container.sendChanges();
        return false;
    };
    CompressorTileEntity.prototype.click = function (id, count, data, coords, player) {
        if (!Entity.getSneaking(player)) {
            Game.prevent();
            var progress = this.data.put / this.data.toPut;
            this.container.setScale("arrowScale", progress);
            this.container.setScale("singularityScale", progress);
            this.container.openFor(Network.getClientForPlayer(player), "main");
            this.container.sendChanges();
        }
    };
    return CompressorTileEntity;
}(TileEntityImplementation));
TileEntity.registerPrototype(BlockID.neutronium_compressor, new CompressorTileEntity());
StorageInterface.createInterface(BlockID.neutronium_compressor, {slots: {slotInput: {input: true, output: false, isValid: function (item) {
    return Singularity.isValidMaterial(item.id, item.data);
}}, slotOutput: {input: false, output: true, isValid: function () {
    return false;
}}}, getInputSlots: function () {
    return ["slotInput"];
}, getOutputSlots: function () {
    return ["slotOutput"];
}});
VanillaSlots.registerForTile(BlockID.neutronium_compressor);
Item.addCreativeGroup("AVARITIA", Translation.translate("itemGroup.avaritia"), AVA_STUFF);
ExtremeCraftingTable.addShaped("neutron_collector", {id: BlockID.neutron_collector, count: 1, data: 0}, ["IIQQQQQII", "I QQQQQ I", "I  RRR  I", "X RRRRR X", "I RRXRR I", "X RRRRR X", "I  RRR  I", "I       I", "IIIXIXIII"], ["X", ItemID.crystal_matrix_ingot, 0, "I", VanillaBlockID.iron_block, 0, "Q", VanillaBlockID.quartz_block, 0, "R", VanillaBlockID.redstone_block, 0]);
ExtremeCraftingTable.addShaped("neutronium_compressor", {id: BlockID.neutronium_compressor, count: 1, data: 0}, ["IIIHHHIII", "X N   N X", "I N   N I", "X N   N X", "RNN O NNR", "X N   N X", "I N   N I", "X N   N X", "IIIXIXIII"], ["X", ItemID.crystal_matrix_ingot, 0, "N", ItemID.neutronium_ingot, 0, "I", VanillaBlockID.iron_block, 0, "H", VanillaBlockID.hopper, 0, "R", VanillaBlockID.redstone_block, 0, "O", BlockID.neutronium_block, 0]);
ExtremeCraftingTable.addShaped("infinity_boots", {id: ItemID.infinity_boots, count: 1, data: 0}, [" NNN NNN ", " NIN NIN ", " NIN NIN ", "NNIN NINN", "NIIN NIIN", "NNNN NNNN"], ["I", ItemID.infinity_ingot, 0, "N", ItemID.neutronium_ingot, 0]);
ExtremeCraftingTable.addShaped("infinity_chestplate", {id: ItemID.infinity_chestplate, count: 1, data: 0}, [" NN   NN ", "NNN   NNN", "NNN   NNN", " NIIIIIN ", " NIIXIIN ", " NIIIIIN ", " NIIIIIN ", " NIIIIIN ", "  NNNNN  "], ["I", ItemID.infinity_ingot, 0, "X", BlockID.crystal_matrix_block, 0, "N", ItemID.neutronium_ingot, 0]);
ExtremeCraftingTable.addShaped("infinity_helmet", {id: ItemID.infinity_helmet, count: 1, data: 0}, ["  NNNNN  ", " NIIIIIN ", " N XIX N ", " NIIIIIN ", " NIIIIIN ", " NI I IN "], ["I", ItemID.infinity_ingot, 0, "X", ItemID.infinity_catalyst, 0, "N", ItemID.neutronium_ingot, 0]);
ExtremeCraftingTable.addShaped("infinity_pants", {id: ItemID.infinity_leggings, count: 1, data: 0}, ["NNNNNNNNN", "NIIIXIIIN", "NINNXNNIN", "NIN   NIN", "NCN   NCN", "NIN   NIN", "NIN   NIN", "NIN   NIN", "NNN   NNN"], ["I", ItemID.infinity_ingot, 0, "X", ItemID.infinity_catalyst, 0, "C", BlockID.crystal_matrix_block, 0, "N", ItemID.neutronium_ingot, 0]);
ExtremeCraftingTable.addShaped("infinity_axe", {id: ItemID.infinity_axe, count: 1, data: 0}, ["   I     ", "  IIIII  ", "   IIII  ", "     IN  ", "      N  ", "      N  ", "      N  ", "      N  ", "      N  "], ["I", ItemID.infinity_ingot, 0, "N", ItemID.neutronium_ingot, 0]);
ExtremeCraftingTable.addShaped("infinity_bow", {id: ItemID.infinity_bow, count: 1, data: 0}, ["   II    ", "  I W    ", " I  W    ", "I   W    ", "X   W    ", "I   W    ", " I  W    ", "  I W    ", "   II    "], ["I", ItemID.infinity_ingot, 0, "X", BlockID.crystal_matrix_block, 0, "W", VanillaBlockID.wool, -1]);
ExtremeCraftingTable.addShaped("infinity_hoe", {id: ItemID.infinity_hoe, count: 1, data: 0}, ["     N   ", " IIIIII  ", "IIIIIII  ", "I    II  ", "     N   ", "     N   ", "     N   ", "     N   ", "     N   "], ["I", ItemID.infinity_ingot, 0, "N", ItemID.neutronium_ingot, 0]);
ExtremeCraftingTable.addShaped("infinity_pickaxe", {id: ItemID.infinity_pickaxe, count: 1, data: 0}, [" IIIIIII ", "IIIICIIII", "II  N  II", "    N    ", "    N    ", "    N    ", "    N    ", "    N    ", "    N    "], ["I", ItemID.infinity_ingot, 0, "C", BlockID.crystal_matrix_block, 0, "N", ItemID.neutronium_ingot, 0], function (container) {
    var extra = new ItemExtraData();
    extra.addEnchant(EEnchantment.FORTUNE, 10);
    container.setSlot("slotResult", ItemID.infinity_pickaxe, 1, 0, extra);
    container.sendChanges();
});
ExtremeCraftingTable.addShaped("infinity_shovel", {id: ItemID.infinity_shovel, count: 1, data: 0}, ["      III", "     IIXI", "      III", "     N I ", "    N    ", "   N     ", "  N      ", " N       ", "N        "], ["I", ItemID.infinity_ingot, 0, "X", BlockID.infinity_block, 0, "N", ItemID.neutronium_ingot, 0]);
ExtremeCraftingTable.addShaped("infinity_sword", {id: ItemID.infinity_sword, count: 1, data: 0}, ["       II", "      III", "     III ", "    III  ", " C III   ", "  CII    ", "  NC     ", " N  C    ", "X        "], ["I", ItemID.infinity_ingot, 0, "X", ItemID.infinity_catalyst, 0, "C", ItemID.crystal_matrix_ingot, 0, "N", ItemID.neutronium_ingot, 0]);
for (var i = 0; i < 2; i++) {
    ExtremeCraftingTable.addShaped("skullfire_sword", {id: ItemID.skullfire_sword, count: 1, data: 0}, ["       IX", "      IXI", "     IXI ", "    IXI  ", " B IXI   ", "  BXI    ", "  WB     ", " W  B    ", "D        "], ["I", ItemID.crystal_matrix_ingot, 0, "X", VanillaItemID.blaze_powder, 0, "B", VanillaItemID.bone, 0, "D", VanillaItemID.nether_star, 0, "W", VanillaBlockID["log".concat(i == 1 ? 2 : "")], -1]);
}
ExtremeCraftingTable.addShaped("endest_pearl", {id: ItemID.endest_pearl, count: 1, data: 0}, ["   EEE   ", " EEPPPEE ", " EPPPPPE ", "EPPPNPPPE", "EPPNSNPPE", "EPPPNPPPE", " EPPPPPE ", " EEPPPEE ", "   EEE   "], ["E", VanillaBlockID.end_stone, 0, "P", VanillaItemID.ender_pearl, 0, "S", VanillaItemID.nether_star, 0, "N", ItemID.neutronium_ingot, 0]);
ExtremeCraftingTable.addShaped("infinity_ingot", {id: ItemID.infinity_ingot, count: 1, data: 0}, ["NNNNNNNNN", "NCXXCXXCN", "NXCCXCCXN", "NCXXCXXCN", "NNNNNNNNN"], ["C", ItemID.crystal_matrix_ingot, 0, "N", ItemID.neutronium_ingot, 0, "X", ItemID.infinity_catalyst, 0]);
if (BORING_FOOD || true) {
    ExtremeCraftingTable.addShapeless("ultimate_stew", {id: ItemID.ultimate_stew, count: 1, data: 0}, [[ItemID.neutron_pile, 0], [VanillaBlockID.wheat, 0], [VanillaItemID.carrot, 0], [VanillaItemID.potato, 0], [VanillaBlockID.beetroot, 0], [VanillaItemID.apple, 0], [VanillaItemID.melon, 0], [VanillaBlockID.pumpkin, 0], [VanillaBlockID.cactus, 0], [VanillaBlockID.red_mushroom, 0], [VanillaBlockID.brown_mushroom, 0]]);
    ExtremeCraftingTable.addShapeless("cosmic_meatballs", {id: ItemID.cosmic_meatballs, count: 1, data: 0}, [[ItemID.neutron_pile, 0], [VanillaItemID.beef, 0], [VanillaItemID.beef, 0], [VanillaItemID.chicken, 0], [VanillaItemID.chicken, 0], [VanillaItemID.porkchop, 0], [VanillaItemID.porkchop, 0], [VanillaItemID.rabbit, 0], [VanillaItemID.rabbit, 0], [VanillaItemID.cod, 0], [VanillaItemID.cod, 0]]);
}
Callback.addCallback("ModsLoaded", function () {
    var arr = [[ItemID.diamond_lattice, 0], [ItemID.crystal_matrix_ingot, 0], [ItemID.neutron_pile, 0], [ItemID.neutron_nugget, 0], [ItemID.neutronium_ingot, 0], [ItemID.ultimate_stew, 0], [ItemID.cosmic_meatballs, 0], [ItemID.endest_pearl, 0], [ItemID.record_fragment, 0], [ItemID.singularity_iron, 0], [ItemID.singularity_gold, 0], [ItemID.singularity_lapis, 0], [ItemID.singularity_redstone, 0], [ItemID.singularity_quartz, 0], [ItemID.singularity_diamond, 0], [ItemID.singularity_emerald, 0]];
    BlockID.blockCopper && (arr.push([ItemID.singularity_copper, 0]), Singularity.registerRecipeFor(ItemID.singularity_copper, BlockID.blockCopper, 400, 0, false));
    BlockID.blockTin && (arr.push([ItemID.singularity_tin, 0]), Singularity.registerRecipeFor(ItemID.singularity_tin, BlockID.blockTin, 400, 0, false));
    BlockID.blockLead && (arr.push([ItemID.singularity_lead, 0]), Singularity.registerRecipeFor(ItemID.singularity_lead, BlockID.blockLead, 300, 0, false));
    BlockID.blockSilver && (arr.push([ItemID.singularity_silver, 0]), Singularity.registerRecipeFor(ItemID.singularity_silver, BlockID.blockSilver, 300, 0, false));
    BlockID.blockNickel && (arr.push([ItemID.singularity_nickel, 0]), Singularity.registerRecipeFor(ItemID.singularity_nickel, BlockID.blockNickel, 400, 0, false));
    BlockID.blockElectrumFlux && (arr.push([ItemID.singularity_fluxed, 0]), Singularity.registerRecipeFor(ItemID.singularity_fluxed, BlockID.blockElectrumFlux, 100, 0, false));
    BlockID.blockEnderium && arr.push([BlockID.blockEnderium, 0]);
    BlockID.blockSteel && arr.push([BlockID.blockSteel, 0]);
    BlockID.blockDarkSteel && arr.push([BlockID.blockDarkSteel, 0]);
    BlockID.blockPlatinum && (arr.push([ItemID.singularity_platinum, 0]), Singularity.registerRecipeFor(ItemID.singularity_platinum, BlockID.blockPlatinum, 80, 0, false));
    BlockID.blockIridium && (arr.push([ItemID.singularity_iridium, 0]), Singularity.registerRecipeFor(ItemID.singularity_iridium, BlockID.blockIridium, 80, 0, false));
    ExtremeCraftingTable.addShapeless("infinity_catalyst", {id: ItemID.infinity_catalyst, count: 1, data: 0}, arr);
    Gregorizer.balance();
    for (var key in Singularity.recipes) {
        var recipe = Singularity.recipes[key];
        Singularity.recipes[key].countdata[0] = recipe.specific ? recipe.countdata[0] : Gregorizer.balanceCost(recipe.countdata[0]);
    }
});
ModAPI.registerAPI("AvaritiaAPI", {addExtremeShapedRecipe: function (recipeName, result, mask, keys, func) {
    return ExtremeCraftingTable.addShaped(recipeName, result, mask, keys, func);
}, addExtremeShapelessRecipe: function (recipeName, result, items, func) {
    return ExtremeCraftingTable.addShapeless(recipeName, result, items, func);
}, removeExtremeRecipe: function (recipeName) {
    return ExtremeCraftingTable.remove(recipeName);
}, addCompressorRecipe: function (outputId, inputId, inputCount, inputData, specific) {
    return Singularity.registerRecipeFor(outputId, inputId, inputCount, inputData, specific);
}, removeCompressorRecipe: function (inputId) {
    return Singularity.removeRecipeFor(inputId);
}, registerSingularity: function (key, materialId, materialCount, materialData) {
    return Singularity.registerSingularity(key, materialId, materialCount, materialData);
}, requireGlobal: function (command) {
    return eval(command);
}});
ModAPI.addAPICallback("RecipeViewer", function (RecipeViewer) {
    var button_win = function (key) {
        return new UI.Window({location: {x: 872, y: UI.getScreenHeight() - 96, width: 64, height: 64}, elements: {button: {type: "button", x: 0, y: 0, scale: 62.5, bitmap: "default_button_up", bitmap2: "default_button_down", clicker: {onClick: function () {
            return RecipeViewer.RecipeTypeRegistry.openRecipePage(key);
        }}}, text: {type: "text", x: 300, y: 120, z: 1, text: "R", font: {color: Color.WHITE, size: 600, shadow: 0.5}}}});
    };
    var addButtonTo = function (gui, key) {
        return gui.addAdjacentWindow(button_win(key));
    };
    Callback.addCallback("LevelPreLoaded", function () {
        var all_workbench = ExtremeCraftingTable.getAllSeparately();
        var extreme_contents = {drawing: [{type: "bitmap", x: 217.5, y: 40, bitmap: "avaritia.extreme_rv", scale: 3}], elements: (function () {
            var elements = {output0: {type: "slot", x: 704.5, y: 246, size: 78, bitmap: "_default_slot_empty"}};
            for (var i = 0; i < 81; i++) {
                elements["input".concat(i)] = {type: "slot", x: 219.5 + (i % 9) * 54, y: 42 + Math.floor(i / 9) * 54, size: 54, bitmap: "_default_slot_empty"};
            }
            return elements;
        })()};
        var ExtremeCraftingShapedRecipe = (function (_super) {
            __extends(ExtremeCraftingShapedRecipe, _super);
            function ExtremeCraftingShapedRecipe() {
                var _this = _super.call(this, Translation.translate("crafting.extreme"), BlockID.extreme_crafting_table, extreme_contents) || this;
                _this.getAllList = function () {
                    return all_workbench.shaped;
                };
                return _this;
            }
            return ExtremeCraftingShapedRecipe;
        }(RecipeViewer.RecipeType));
        var ExtremeCraftingShapelessRecipe = (function (_super) {
            __extends(ExtremeCraftingShapelessRecipe, _super);
            function ExtremeCraftingShapelessRecipe() {
                var _this = _super.call(this, Translation.translate("crafting.extreme.shapeless"), BlockID.extreme_crafting_table, extreme_contents) || this;
                _this.getAllList = function () {
                    return all_workbench.shapeless;
                };
                return _this;
            }
            return ExtremeCraftingShapelessRecipe;
        }(RecipeViewer.RecipeType));
        var CompressorRecipe = (function (_super) {
            __extends(CompressorRecipe, _super);
            function CompressorRecipe() {
                return _super.call(this, Translation.translate("tile.avaritia:neutronium_compressor.name"), BlockID.neutronium_compressor, {drawing: [{type: "bitmap", x: 200, y: 155.5, scale: 6, bitmap: "avaritia.compressor_rv"}], elements: {input0: {type: "slot", x: 200, y: 179.5, bitmap: "_default_slot_empty", isTransparentBackground: true, size: 108}, output0: {type: "slot", x: 665, y: 179.5, bitmap: "_default_slot_empty", isTransparentBackground: true, size: 108}, arrow: {type: "scale", x: 344, y: 183.5, bitmap: "avaritia.compressor_arrow", direction: 0, value: 1, scale: 6}, singularity: {type: "scale", x: 512, y: 183.5, bitmap: "avaritia.compressor_singularity", direction: 1, value: 1, scale: 6}, textAmount: {type: "text", x: 500, y: 320.5, width: 600, height: 120, font: {alignment: UI.Font.ALIGN_CENTER, color: Color.BLACK, size: 40}}}}) || this;
            }
            CompressorRecipe.prototype.getAllList = function () {
                var result = [];
                for (var i in Singularity.recipes) {
                    var r = Singularity.recipes[i];
                    result.push({input: [{id: parseInt(i), count: 1, data: r.countdata[1]}], output: [{id: r.id, count: 1, data: 0}], requiredAmount: r.countdata[0]});
                }
                return result;
            };
            CompressorRecipe.prototype.onOpen = function (elements, recipe) {
                elements.get("textAmount").setBinding("text", JString.format(Translation.translate("avaritia.rv.compressor.amount"), [Integer.valueOf(recipe.requiredAmount)]));
            };
            return CompressorRecipe;
        }(RecipeViewer.RecipeType));
        RecipeViewer.RecipeTypeRegistry.register("avaritia_extreme_shaped", new ExtremeCraftingShapedRecipe());
        RecipeViewer.RecipeTypeRegistry.register("avaritia_extreme_shapeless", new ExtremeCraftingShapelessRecipe());
        RecipeViewer.RecipeTypeRegistry.register("avaritia_compressor", new CompressorRecipe());
        addButtonTo(GUI_EXTREME_CRAFTING, ["avaritia_extreme_shaped", "avaritia_extreme_shapeless"]);
        addButtonTo(GUI_COMPRESSOR, "avaritia_compressor");
    });
});

