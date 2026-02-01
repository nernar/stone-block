/*
     ____              _     _                    _____ _____
    |  _ \            | |   | |             /\   |  __ \_   _|
    | |_) | __ _ _   _| |__ | | ___  ___   /  \  | |__) || |
    |  _ < / _` | | | | '_ \| |/ _ \/ __| / /\ \ |  ___/ | |
    | |_) | (_| | |_| | |_) | |  __/\__ \/ ____ \| |    _| |_
    |____/ \__,_|\__,_|_.__/|_|\___||___/_/    \_\_|   |_____|
                                         
    BaublesAPI library
     
    Условия использования:
      - Запрещено распространение библиотеки на сторонних источниках
        без ссылки на официальное сообщество(https://vk.com/forestry_pe)
      - Запрещено изменение кода библиотеки
      - Запрещено явное копирование кода в другие библиотеки или моды
      - Используя библиотеку вы автоматически соглашаетесь с описанными
        выше условиями
             
    ©DDCompany (https://vk.com/forestry_pe)
*/
LIBRARY({
    name: "BaublesAPI",
    version: 0,
    shared: true,
    api: "CoreEngine"
});
var GUI = new UI.StandartWindow({
    standart: {
        header: {
            text: {
                text: "Baubles"
            }
        },
        inventory: {
            standart: true
        },
        background: {
            standart: true
        }
    },
    drawing: [],
    elements: {
        "player": {
            type: "image",
            bitmap: "baubles.player",
            scale: 1,
            x: 550,
            y: 80
        },
        "amulet": {
            type: "slot", x: 550 - 65, y: 85, bitmap: "baubles.slot.amulet",
            isValid: function (id) {
                return Baubles.getType(id) === BaubleType.amulet;
            }
        },
        "ring0": {
            type: "slot", x: 550 - 65, y: 80 + 173 - 65, bitmap: "baubles.slot.ring",
            isValid: function (id) {
                return Baubles.getType(id) === BaubleType.ring;
            }
        },
        "ring1": {
            type: "slot", x: 550 + 144 + 5, y: 80 + 173 - 65, bitmap: "baubles.slot.ring",
            isValid: function (id) {
                return Baubles.getType(id) === BaubleType.ring;
            }
        },
        "belt": {
            type: "slot", x: 550 + 38 + 4, y: 80 + 175 + 15, bitmap: "baubles.slot.belt",
            isValid: function (id) {
                return Baubles.getType(id) === BaubleType.belt;
            }
        },
        "head": {
            type: "slot", x: 550 + 144 + 5, y: 85, bitmap: "baubles.slot.head",
            isValid: function (id) {
                return Baubles.getType(id) === BaubleType.head;
            }
        },
        "body": {
            type: "slot", x: 550 + 38 + 4, y: 80 + 55 + 5, bitmap: "baubles.slot.body",
            isValid: function (id) {
                return Baubles.getType(id) === BaubleType.body;
            }
        },
        "charm": {
            type: "slot", x: 550 + 38 + 4, y: 80 + 55 + 5 + 60, bitmap: "baubles.slot.charm",
            isValid: function (id) {
                return Baubles.getType(id) === BaubleType.charm;
            }
        }
    }
});
var BUTTON_GUI = new UI.Window({
    location: {
        x: 10,
        y: UI.getScreenHeight() - 70,
        width: 60,
        height: 60
    },
    drawing: [],
    elements: {
        "btn": {
            type: "button",
            x: 0,
            y: 0,
            bitmap: "baubles.open_btn",
            bitmap2: "baubles.open_btn_pressed",
            scale: 1000 / 26,
            clicker: {
                onClick: function () {
                    Baubles.openGui();
                }
            }
        }
    }
});
var BaubleType;
(function (BaubleType) {
    BaubleType["amulet"] = "amulet";
    BaubleType["ring"] = "ring";
    BaubleType["belt"] = "belt";
    BaubleType["head"] = "head";
    BaubleType["body"] = "body";
    BaubleType["charm"] = "charm";
})(BaubleType || (BaubleType = {}));
var Baubles = /** @class */ (function () {
    function Baubles() {
    }
    Baubles.registerBauble = function (obj) {
        this.descriptions[obj.id] = obj;
    };
    Baubles.tick = function () {
        for (var i in this.baubles) {
            var bauble = this.baubles[i];
            if (!bauble) {
                continue;
            }
            if (bauble.tick) {
                bauble.tick();
            }
        }
    };
    Baubles.cache = function () {
        var baubles = this.baubles;
        var baubles_old = {
            amulet: baubles.amulet,
            ring0: baubles.ring0,
            ring1: baubles.ring1,
            belt: baubles.belt,
            head: baubles.head,
            body: baubles.body,
            charm: baubles.charm
        };
        baubles.amulet = this.getDesc(this.container.getSlot("amulet").id);
        baubles.ring0 = this.getDesc(this.container.getSlot("ring0").id);
        baubles.ring1 = this.getDesc(this.container.getSlot("ring1").id);
        baubles.belt = this.getDesc(this.container.getSlot("belt").id);
        baubles.head = this.getDesc(this.container.getSlot("head").id);
        baubles.body = this.getDesc(this.container.getSlot("body").id);
        baubles.charm = this.getDesc(this.container.getSlot("charm").id);
        for (var i in baubles) {
            var bauble = baubles[i];
            var bauble_old = baubles_old[i];
            if ((bauble === null || bauble === void 0 ? void 0 : bauble.id) !== (bauble_old === null || bauble_old === void 0 ? void 0 : bauble_old.id)) {
                if (bauble === null || bauble === void 0 ? void 0 : bauble.onEquip) {
                    bauble.onEquip();
                }
                if (bauble_old === null || bauble_old === void 0 ? void 0 : bauble_old.onTakeOff) {
                    bauble_old.onTakeOff();
                }
            }
        }
    };
    Baubles.openGui = function () {
        this.container.openAs(GUI);
    };
    Baubles.getDesc = function (id) {
        return this.descriptions[id];
    };
    Baubles.getType = function (id) {
        var desc = this.descriptions[id];
        if (!desc) {
            return null;
        }
        return desc.type;
    };
    Baubles.container = new UI.Container();
    Baubles.btnContainer = new UI.Container();
    Baubles.descriptions = {};
    Baubles.baubles = {};
    return Baubles;
}());
Callback.addCallback("tick", function () {
    Baubles.cache();
    Baubles.tick();
});
Callback.addCallback("LevelLeft", function () {
    Baubles.baubles = {};
});
Callback.addCallback("EntityDeath", function (entity) {
    if (Entity.getType(entity) === 1) {
        var pos = Player.getPosition();
        for (var i in Baubles.baubles) {
            var bauble = Baubles.baubles[i];
            if (bauble) {
                alert("drop " + i);
                Baubles.container.dropSlot(i, pos.x, pos.y, pos.z);
                if (bauble.onTakeOff) {
                    bauble.onTakeOff();
                }
            }
        }
    }
});
Callback.addCallback("NativeGuiChanged", function (screenName) {
    if (screenName === "inventory_screen_pocket" || screenName === "inventory_screen") {
        Baubles.btnContainer.openAs(BUTTON_GUI);
    }
    else {
        Baubles.btnContainer.close();
    }
});
EXPORT("Baubles", Baubles);
EXPORT("BaubleType", BaubleType);
Saver.addSavesScope("Baubles", function read(scope) {
    if (scope.container) {
        Baubles.container = scope.container;
        Baubles.cache();
    }
    else {
        Baubles.container = new UI.Container();
    }
}, function save() {
    return { container: Baubles.container };
});
