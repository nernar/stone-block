var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/*
        _        _     _                                     _          _    ____ ___
       / \   ___| |__ (_) _____   _____ _ __ ___   ___ _ __ | |_ ___   / \  |  _ \_ _|
      / _ \ / __| '_ \| |/ _ \ \ / / _ \ '_ ` _ \ / _ \ '_ \| __/ __| / _ \ | |_) | |
     / ___ \ (__| | | | |  __/\ V /  __/ | | | | |  __/ | | | |_\__ \/ ___ \|  __/| |
    /_/   \_\___|_| |_|_|\___| \_/ \___|_| |_| |_|\___|_| |_|\__|___/_/   \_\_|  |___|

    Docs: https://wiki.mineprogramming.org/index.php/InnerCore/Mods/AchievementsAPI
    Github Repository: https://github.com/DDCompany/AchievementsAPI_PE
    Issues Tracker: https://github.com/DDCompany/AchievementsAPI_PE/issues

    Terms of use:
     - Forbidden to distribute the mod on third-party sources
       without links to the official group (https://vk.com/forestry_pe)
     - Forbidden to change the code of this mod
     - Forbidden to copy the code to other mods or libraries
     - Allowed to use the mod in any packs
     - Using the mod you automatically agree to the conditions described above

    + Textures belongs to Mojang
    © DDCompany (https://vk.com/forestry_pe)
 */
var DimensionType = Native.Dimension;
var EntityType = Native.EntityType;
var ChatColor = Native.Color;
var simulateBackPressed = ModAPI.requireGlobal("MCSystem.simulateBackPressed");
var IllegalArgumentException = java.lang.IllegalArgumentException;
var LOG_TAG = "ACHIEVEMENTS-API";
function getPlayerByTag(tag) {
    var clients = Network.getServer().getConnectedClients();
    for (var i = 0; i < clients.size(); i++) {
        var client = clients.get(i);
        if (Entity.getNameTag(client.getPlayerUid()) === tag) {
            return client.getPlayerUid();
        }
    }
    return null;
}
function getPlayerName() {
    return Entity.getNameTag(Player.get());
}
Translation.addTranslation("achievements_api.complete", {
    en: "Achievement Made!",
    ru: "Достижение выполнено",
});
Translation.addTranslation("achievements_api.challenge_complete", {
    en: "Challenge Made!",
    ru: "Испытание выполнено",
});
Translation.addTranslation("achievements_api.goal_complete", {
    en: "Goal Completed",
    ru: "Цель выполнена",
});
Translation.addTranslation("achievements_api.achievements", {
    en: "Advancements",
    ru: "Достижения",
});
Translation.addTranslation("achievements_api.nothing", {
    en: "Nothing to Show :(",
    ru: "Здесь ничего нет :(",
});
Translation.addTranslation("achievements_api.made", {
    en: "has made the achievement",
    ru: "выполнил достижение",
});
//Commands
Translation.addTranslation("achievements_api.commands_only_on_host", {
    en: "Commands allowed only on host player",
    ru: "Команды доступны только на строне хоста",
});
Translation.addTranslation("achievements_api.player_not_found", {
    en: "Player not found",
    ru: "Игрок не найден",
});
Translation.addTranslation("achievements_api.player_with_nick_not_found", {
    en: "Player with nickname %1 not found",
    ru: "Игрок '%1' не найден",
});
Translation.addTranslation("achievements_api.given", {
    en: "Achievements given",
    ru: "Достижения выданы",
});
Translation.addTranslation("achievements_api.invalid_group", {
    en: "Invalid group uid",
    ru: "Неверное название группы",
});
Translation.addTranslation("achievements_api.group_not_found", {
    en: "Group with name %1 not found",
    ru: "Группа '%1' не найдена",
});
Translation.addTranslation("achievements_api.revoked", {
    en: "Achievements revoked",
    ru: "Достижения изъяты",
});
//Story
Translation.addTranslation("achievements.story", { en: "Minecraft", ru: "Minecraft" });
Translation.addTranslation("achievements.story.root.title", { en: "Minecraft", ru: "Minecraft" });
Translation.addTranslation("achievements.story.root.description", {
    en: "The heart and story of the game",
    ru: "Главная история игры",
});
Translation.addTranslation("achievements.story.mine_stone.title", { en: "Stone Age", ru: "Каменный век" });
Translation.addTranslation("achievements.story.mine_stone.description", {
    en: "Mine stone with your new pickaxe",
    ru: "Добудьте камень новой киркой",
});
Translation.addTranslation("achievements.story.upgrade_tools.title", { en: "Getting an Upgrade", ru: "Обновка!" });
Translation.addTranslation("achievements.story.upgrade_tools.description", {
    en: "Construct a better pickaxe",
    ru: "Сделайте кирку попрочней",
});
Translation.addTranslation("achievements.story.obtain_armor.title", { en: "Suit Up", ru: "Дресс-код" });
Translation.addTranslation("achievements.story.obtain_armor.description", {
    en: "Protect yourself with a piece of iron armor",
    ru: "Защитите себя железной бронёй",
});
Translation.addTranslation("achievements.story.lava_bucket.title", { en: "Hot Stuff", ru: "Горячая штучка" });
Translation.addTranslation("achievements.story.lava_bucket.description", {
    en: "Drain a bucket with lava",
    ru: "Вылейте ведро лавы",
});
Translation.addTranslation("achievements.story.iron_tools.title", {
    en: "Isn't It Iron Pick",
    ru: "И кирка без дела ржавеет",
});
Translation.addTranslation("achievements.story.iron_tools.description", {
    en: "Upgrade your pickaxe",
    ru: "Обновите свою кирку",
});
Translation.addTranslation("achievements.story.form_obsidian.title", { en: "Ice Bucket Challenge", ru: "Две стихии" });
Translation.addTranslation("achievements.story.form_obsidian.description", {
    en: "Form and mine a block of Obsidian",
    ru: "Сформируйте и добудьте блок обсидиана",
});
Translation.addTranslation("achievements.story.enter_the_nether.title", {
    en: "We Need to Go Deeper",
    ru: "Огненные недра",
});
Translation.addTranslation("achievements.story.enter_the_nether.description", {
    en: "Build, light and enter a Nether Portal",
    ru: "Постройте, зажгите и войдите в портал Нижнего мира",
});
Translation.addTranslation("achievements.story.follow_ender_eye.title", { en: "Eye Spy", ru: "Недреманное око" });
Translation.addTranslation("achievements.story.follow_ender_eye.description", {
    en: "Follow an Ender Eye",
    ru: "Следуйте за оком Края",
});
Translation.addTranslation("achievements.story.enter_the_end.title", { en: "The End?", ru: "Конец?" });
Translation.addTranslation("achievements.story.enter_the_end.description", {
    en: "Enter the End Portal",
    ru: "Войдите в портал Края",
});
Translation.addTranslation("achievements.story.mine_diamond.title", { en: "Diamonds!", ru: "Алмазы!" });
Translation.addTranslation("achievements.story.mine_diamond.description", {
    en: "Acquire diamonds",
    ru: "Добудьте алмазы",
});
Translation.addTranslation("achievements.story.shiny_gear.title", {
    en: "Cover Me With Diamonds",
    ru: "Осыпь меня алмазами",
});
Translation.addTranslation("achievements.story.shiny_gear.description", {
    en: "Diamond armor saves lives",
    ru: "Алмазная броня спасает жизни",
});
//Nether
Translation.addTranslation("achievements.nether", { en: "Nether", ru: "Нижний мир" });
Translation.addTranslation("achievements.nether.root.title", { en: "Nether", ru: "Нижний мир" });
Translation.addTranslation("achievements.nether.root.description", {
    en: "Bring summer clothes",
    ru: "Захватите летнюю одежду",
});
Translation.addTranslation("achievements.nether.fast_travel.title", { ru: "Кротовая нора" });
Translation.addTranslation("achievements.nether.fast_travel.description", {
    ru: "Воспользуйтесь Нижним миром, чтобы переместиться на 7 км в обычном мире",
});
Translation.addTranslation("achievements.nether.find_fortress.title", {
    en: "A Terrible Fortress",
    ru: "Чертоги страха",
});
Translation.addTranslation("achievements.nether.find_fortress.description", {
    en: "Find the nether fortress and break nether bricks",
    ru: "Найдите адскую крепость и добудте адский кирпичи",
});
Translation.addTranslation("achievements.nether.return_to_sender.title", {
    en: "Return to Sender",
    ru: "Вернуть отправителю",
});
Translation.addTranslation("achievements.nether.return_to_sender.description", {
    en: "Destroy a Ghast with a fireball",
    ru: "Убейте гаста его же огненным шаром",
});
Translation.addTranslation("achievements.nether.obtain_blaze_rod.title", { en: "Into Fire", ru: "В полымя" });
Translation.addTranslation("achievements.nether.obtain_blaze_rod.description", {
    en: "Relieve a Blaze of its rod",
    ru: "Добудьте огненный стержень",
});
Translation.addTranslation("achievements.nether.kill_wither_skeleton.title", {
    en: "Spooky Scary Skeleton",
    ru: "Бедный Йорик!",
});
Translation.addTranslation("achievements.nether.kill_wither_skeleton.description", {
    en: "Kill Wither Skeleton",
    ru: "Убейте скелета-иссушителя",
});
Translation.addTranslation("achievements.nether.summon_wither.title", { en: "Withering Heights", ru: "Чудо-юдо" });
Translation.addTranslation("achievements.nether.summon_wither.description", {
    en: "Summon the Wither",
    ru: "Призовите иссушителя",
});
Translation.addTranslation("achievements.nether.brew_potion.title", { en: "Local Brewery", ru: "Местный зельевар" });
Translation.addTranslation("achievements.nether.brew_potion.description", {
    en: "Drink potion",
    ru: "Приготовьте и выпейте зелье",
});
Translation.addTranslation("achievements.nether.uneasy_alliance.title", { en: "Uneasy Alliance", ru: "Война миров" });
Translation.addTranslation("achievements.nether.uneasy_alliance.description", {
    en: "Rescue a Ghast from the Nether, bring it safely home to the Overworld... and then kill it",
    ru: "Заманите гаста в обычный мир… а затем убейте его",
});
Translation.addTranslation("achievements.story.kill_dragon.title", { en: "Free the End", ru: "Освободите Край" });
Translation.addTranslation("achievements.story.kill_dragon.description", {
    en: "Good luck",
    ru: "Удачи!",
});
/**
 * Class for managing popups on the screen
 */
var AchievementPopup = /** @class */ (function () {
    function AchievementPopup() {
    }
    /**
     * Initialize the window
     */
    AchievementPopup.init = function () {
        this.setupClientSide();
        this.popupUI.setAsGameOverlay(true);
        this.popupUI.setTouchable(false);
    };
    /**
     * Display notification
     * @param popup - popup for display
     */
    AchievementPopup.show = function (popup) {
        this.popupQueue.push(popup);
    };
    AchievementPopup.showFor = function (client, popup) {
        client.send("achievements_api.show_popup", popup);
    };
    /**
     * @return last popup in queue
     */
    AchievementPopup.popQueue = function () {
        return this.popupQueue.pop() || null;
    };
    /**
     * Remove all popup from queue
     */
    AchievementPopup.clearQueue = function () {
        this.popupQueue = [];
    };
    AchievementPopup.setupClientSide = function () {
        var _this = this;
        Network.addClientPacket("achievements_api.show_popup", function (popup) { return _this.show(popup); });
        Callback.addCallback("NativeGuiChanged", function (screen) {
            _this.validScreen = screen === "hud_screen" || screen === "in_game_play_screen";
        });
        Callback.addCallback("CustomWindowOpened", function (window) {
            if (!window["isNotFocusable"] //WindowGroup
                || !(window.equals(_this.popupUI) && window["isNotFocusable"]())) {
                _this.openedScreens.push(window);
            }
        });
        Callback.addCallback("CustomWindowClosed", function (window) {
            var index = _this.openedScreens.indexOf(window);
            if (index !== -1) {
                _this.openedScreens.splice(index, 1);
            }
        });
    };
    AchievementPopup.canBeShown = function () {
        return this.validScreen && !this.openedScreens.length;
    };
    /**
     * The default color of popup title
     */
    AchievementPopup.DEFAULT_TITLE_COLOR = android.graphics.Color.YELLOW;
    /**
     * The default time in ticks that popup will be on the screen
     */
    AchievementPopup.DEFAULT_DELAY = 80;
    /**
     * Queue of popups to be displayed. Use <i>AchievementPopup.popQueue</i> to get last popup in the queue and
     * <i>AchievementPopup</i> to add new one
     */
    AchievementPopup.popupQueue = [];
    /**
     * Container of popup window
     */
    AchievementPopup.container = new UI.Container();
    /**
     * Popup window
     */
    AchievementPopup.popupUI = new UI.Window({
        location: {
            x: 700,
            y: 0,
            width: 300,
            height: 60,
        },
        drawing: [
            { type: "color", color: android.graphics.Color.rgb(33, 33, 33) },
            {
                type: "frame",
                x: 0,
                y: 0,
                width: 1000,
                height: 200,
                bitmap: "achievements_api.frames.achievement",
                scale: 5,
            },
        ],
        elements: {
            "title": {
                type: "text",
                text: "",
                x: 190,
                y: 30,
                font: { color: android.graphics.Color.YELLOW, size: 50 },
            },
            "description": {
                type: "text",
                text: "",
                x: 190,
                y: 100,
                font: { color: android.graphics.Color.WHITE, size: 50 },
            },
            "slot": {
                type: "slot",
                x: 5,
                y: 5,
                size: 190,
                bitmap: "_default_slot_empty",
                isTransparentBackground: true,
                visual: true,
            },
        },
    });
    /**
     * Time that popup showed on the screen. If the field more than 0, each tick decreased until becomes 0, after which
     * popup disappear
     */
    AchievementPopup.delay = 0;
    AchievementPopup.validScreen = false;
    AchievementPopup.openedScreens = [];
    return AchievementPopup;
}());
AchievementPopup.init();
Callback.addCallback("LocalTick", function () {
    var _a, _b, _c;
    if (!AchievementPopup.delay) {
        var popup = AchievementPopup.popQueue();
        if (popup) {
            var content = AchievementPopup.popupUI.getContent();
            var container = AchievementPopup.container;
            var elements = content.elements;
            var item = popup.item;
            var slot = container.getSlot("slot");
            elements.title.text = popup.title;
            elements.title.font.color = popup.color || AchievementPopup.DEFAULT_TITLE_COLOR;
            elements.description.text = popup.description;
            slot.id = (_a = item === null || item === void 0 ? void 0 : item.id) !== null && _a !== void 0 ? _a : 0;
            slot.data = (_b = item === null || item === void 0 ? void 0 : item.data) !== null && _b !== void 0 ? _b : 0;
            slot.count = (_c = item === null || item === void 0 ? void 0 : item.count) !== null && _c !== void 0 ? _c : 1;
            AchievementPopup.delay = popup.delay || AchievementPopup.DEFAULT_DELAY;
        }
        return;
    }
    if (AchievementPopup.canBeShown()) {
        if (!AchievementPopup.popupUI.isOpened()) {
            AchievementPopup.container.openAs(AchievementPopup.popupUI);
        }
    }
    else {
        if (AchievementPopup.popupUI.isOpened()) {
            AchievementPopup.container.close();
        }
    }
    if (--AchievementPopup.delay <= 0) {
        AchievementPopup.delay = 0;
        AchievementPopup.container.close();
    }
});
Callback.addCallback("LevelLeft", function () {
    AchievementPopup.delay = 0;
    AchievementPopup.clearQueue();
});
//WARNING: NOT RECOMMENDED USE METHODS FROM THIS CLASS BECAUSE OF IT WILL BE CHANGED IN FUTURE VERSIONS
var AchievementsUI = /** @class */ (function () {
    function AchievementsUI() {
    }
    AchievementsUI.init = function () {
        this.windowParent.setBlockingBackground(true);
        this.setupClientSide();
        this.setupServerSide();
    };
    AchievementsUI.setupServerSide = function () {
        Network.addServerPacket("achievements_api.open_ui", function (client, data) {
            var _a, _b, _c, _d;
            var children = AchievementAPI.getGroup(data.uid).children;
            var dat = {};
            for (var key in children) {
                var player = client.getPlayerUid();
                var child = children[key].for(player);
                dat[key] = {
                    isCompleted: child.isCompleted,
                    isUnlocked: child.isUnlocked,
                    isParentCompleted: (_d = (_c = (_b = (_a = child.achievement) === null || _a === void 0 ? void 0 : _a.parent) === null || _b === void 0 ? void 0 : _b.for(player)) === null || _c === void 0 ? void 0 : _c.isCompleted) !== null && _d !== void 0 ? _d : true,
                    progress: child.progress,
                    texture: child.texture,
                };
            }
            client.send("achievements_api.open_ui_client", dat);
        });
    };
    AchievementsUI.setupClientSide = function () {
        var _this = this;
        Network.addClientPacket("achievements_api.open_ui_client", function (data) {
            _this._openAchievementsWindow(data);
        });
    };
    AchievementsUI.initGroupForWindow = function (group) {
        var parentElements = this.windowParent.getContent().elements;
        parentElements["textPageIndex"].text = (this.currentIndex + 1) + "/" + this.groupNames.length;
        parentElements["textGroupName"].text = Translation.translate(group.name);
        var slotIcon = this.parentContainer.getSlot("slotGroupIcon");
        var groupIcon = group.icon;
        if (groupIcon) {
            slotIcon.id = groupIcon.id || 0;
            slotIcon.data = groupIcon.data || 0;
        }
        else {
            slotIcon.id = 0;
            slotIcon.data = 0;
        }
        slotIcon.count = 1;
    };
    AchievementsUI.initAchievementsForWindow = function (group, size, elements, packet) {
        var _a, _b;
        var contentExist;
        var _loop_1 = function (key) {
            var achievement = group.getChild(key);
            if (!achievement) {
                return "continue";
            }
            var achievementData = packet[key];
            if (!achievementData.isParentCompleted && achievement.hidden) {
                return "continue";
            }
            contentExist = true;
            var x = this_1.getAchievementX(achievement.prototype, size);
            var y = this_1.getAchievementY(achievement.prototype, size);
            elements[key] = {
                type: "slot",
                x: x,
                y: y,
                size: size,
                visual: true,
                bitmap: achievementData.texture,
                isTransparentBackground: true,
                clicker: {
                    onClick: function () {
                        AchievementsUI.showInformationToast(achievement, achievementData);
                    },
                },
            };
            var item = achievement.icon || { id: 0, data: 0 };
            var slot = this_1.container.getSlot(key);
            slot.id = (_a = item === null || item === void 0 ? void 0 : item.id) !== null && _a !== void 0 ? _a : 0;
            slot.data = (_b = item === null || item === void 0 ? void 0 : item.data) !== null && _b !== void 0 ? _b : 0;
            slot.count = 1;
        };
        var this_1 = this;
        for (var key in packet) {
            _loop_1(key);
        }
        return contentExist;
    };
    AchievementsUI.showInformationToast = function (achievement, data) {
        var info = Translation.translate(achievement.name);
        if (achievement.prototype.progressMax) {
            info += "(".concat(data.progress, "/").concat(achievement.prototype.progressMax, ")");
        }
        var description = achievement.description;
        if (description) {
            info += "\n" + description;
        }
        alert(info);
    };
    AchievementsUI.initConditionsForWindow = function (group, packet, size, elements) {
        var halfOfSize = size / 2;
        //noinspection JSUnusedGlobalSymbols
        elements["lines"] = {
            type: "custom",
            custom: {},
            x: 0,
            y: 0,
            z: -1,
            onSetup: function () {
                this.paint = new android.graphics.Paint();
                this.paint.setARGB(255, 255, 255, 255);
                this.paint.setStyle(android.graphics.Paint.Style.STROKE);
                this.paint2 = new android.graphics.Paint();
                this.paint2.setARGB(255, 0, 0, 0);
                this.paint2.setStyle(android.graphics.Paint.Style.STROKE);
            },
            onDraw: function (self, canvas, scale) {
                try {
                    if (!this.path) {
                        this.path = new android.graphics.Path();
                        for (var key in packet) {
                            var achievementData = packet[key];
                            var achievement = group.getChild(key);
                            if (!achievement) {
                                continue;
                            }
                            var parent = achievement.parent;
                            if (achievement.prototype.connection === Connection.NONE) {
                                continue;
                            }
                            if (!parent || parent.group.uid !== group.uid ||
                                (!achievementData.isParentCompleted && achievement.hidden)) {
                                continue;
                            }
                            var parentItem = group.getChild(parent.uid);
                            if (parentItem) {
                                var x = AchievementsUI.getAchievementX(achievement.prototype, size);
                                var y = AchievementsUI.getAchievementY(achievement.prototype, size);
                                var _x = (x + halfOfSize) * scale;
                                var _y = (y + halfOfSize) * scale;
                                var parentX = AchievementsUI.getAchievementX(parentItem.prototype, size);
                                var parentY = AchievementsUI.getAchievementY(parentItem.prototype, size);
                                var _parentX = (parentX + halfOfSize) * scale;
                                var _parentY = (parentY + halfOfSize) * scale;
                                if (parentX === x || parentY === y) {
                                    this.path.moveTo(_x, _y);
                                    this.path.lineTo(_parentX, _parentY);
                                }
                                else {
                                    var x2 = _x + ((parentX < x ? -(halfOfSize + 5) : halfOfSize + 5) * scale);
                                    this.path.moveTo(_x, _y);
                                    this.path.lineTo(x2, _y);
                                    switch (achievement.prototype.connection) {
                                        case Connection.HORIZONTAL:
                                            this.path.lineTo(x2, _parentY);
                                            this.path.lineTo(_parentX, _parentY);
                                            break;
                                        case Connection.VERTICAL:
                                            this.path.lineTo(_parentX, _y);
                                            this.path.lineTo(_parentX, _parentY);
                                            break;
                                        default:
                                    }
                                }
                            }
                        }
                    }
                    this.paint.setStrokeWidth(6 * scale);
                    this.paint2.setStrokeWidth(14 * scale);
                    canvas.drawPath(this.path, this.paint2);
                    canvas.drawPath(this.path, this.paint);
                }
                catch (e) {
                    alert(e);
                }
            },
        };
    };
    AchievementsUI.initBackgroundForWindow = function (drawing, bgTexture) {
        drawing.push({
            type: "custom",
            onDraw: function (canvas, scale) {
                var bitmap = android.graphics.Bitmap.createScaledBitmap(UI.TextureSource.get(bgTexture), 80 * scale, 80 * scale, false);
                var paint = new android.graphics.Paint();
                paint.setShader(new android.graphics.BitmapShader(bitmap, android.graphics.Shader.TileMode.REPEAT, android.graphics.Shader.TileMode.REPEAT));
                canvas.drawRect(0, 0, canvas.getWidth(), canvas.getHeight(), paint);
                bitmap.recycle();
            },
        });
    };
    AchievementsUI.openAchievementsWindow = function () {
        var groupsAmount = this.groupNames.length;
        if (this.currentIndex < 0) {
            this.currentIndex = groupsAmount - 1;
        }
        else if (this.currentIndex >= groupsAmount) {
            this.currentIndex = 0;
        }
        Network.sendToServer("achievements_api.open_ui", { uid: this.groupNames[this.currentIndex] });
    };
    AchievementsUI._openAchievementsWindow = function (packet) {
        var group = AchievementAPI.groups[this.groupNames[AchievementsUI.currentIndex]];
        var width = group.width || 600;
        var height = group.height || 250;
        var elements = {};
        var drawing = [{ type: "color", color: android.graphics.Color.rgb(0, 0, 0) }];
        this.initGroupForWindow(group);
        var size = group.nodeSize || 100;
        var contentExist = this.initAchievementsForWindow(group, size, elements, packet);
        if (contentExist) {
            this.initConditionsForWindow(group, packet, size, elements);
            if (group.backgroundTexture) {
                this.initBackgroundForWindow(drawing, group.backgroundTexture);
            }
        }
        else {
            width = 432;
            height = 260;
            var translated = Translation.translate("achievements_api.nothing");
            elements["nothing"] = {
                type: "text",
                x: 0,
                y: 200,
                text: translated,
                font: { size: 40, color: android.graphics.Color.WHITE },
            };
        }
        if (this.windowArea) {
            this.windowArea.close();
        }
        this.windowArea = new UI.Window({
            location: {
                x: 284,
                y: (UI.getScreenHeight() - 370) / 2 + 50,
                width: 432,
                height: 260,
                scrollX: width,
                scrollY: height,
            },
            drawing: drawing,
            elements: elements,
        });
        AchievementsUI.container.openAs(this.windowArea);
        if (!contentExist) {
            elements["nothing"].x = (1000 - AchievementsUI.container.getElement("nothing").elementRect.width()) / 2;
        }
    };
    AchievementsUI.getAchievementY = function (achievement, size) {
        return achievement.y || achievement.row * (size + 10);
    };
    AchievementsUI.getAchievementX = function (achievement, size) {
        return achievement.x || achievement.column * (size + 10);
    };
    AchievementsUI.groupNames = [];
    AchievementsUI.container = new UI.Container();
    AchievementsUI.parentContainer = new UI.Container();
    AchievementsUI.currentIndex = 0;
    AchievementsUI.windowArea = null;
    AchievementsUI.windowParent = new UI.Window({
        location: {
            x: 244,
            y: (UI.getScreenHeight() - 370) / 2,
            width: 512,
            height: 370,
        },
        drawing: [
            { type: "frame", x: 0, y: 0, width: 1000, height: 725, bitmap: "achievements_api.frames.window", scale: 5 },
            {
                type: "text",
                text: Translation.translate("achievements_api.achievements"),
                x: 80,
                y: 65,
                font: { size: 35, color: android.graphics.Color.DKGRAY },
            },
        ],
        elements: {
            "slotGroupIcon": {
                type: "slot",
                x: 75,
                y: 605,
                size: 100,
                visual: true,
                bitmap: "_default_slot_empty",
                isTransparentBackground: true,
            },
            "textGroupName": {
                type: "text",
                x: 180,
                y: 630,
                text: "",
                font: { size: 40, color: android.graphics.Color.DKGRAY },
            },
            "btnClose": {
                type: "button",
                x: 910,
                y: 15,
                bitmap: "achievements_api.btn.close",
                bitmap2: "achievements_api.btn.close_hover",
                scale: 5,
                clicker: {
                    onClick: function () {
                        AchievementsUI.windowParent.close();
                        AchievementsUI.windowArea.close();
                    },
                },
            },
            "textPageIndex": {
                type: "text",
                x: 730,
                y: 630,
                text: "",
                font: { size: 40, color: android.graphics.Color.DKGRAY },
            },
            "btnNext": {
                type: "button",
                x: 860,
                y: 620,
                bitmap: "achievements_api.btn.next",
                bitmap2: "achievements_api.btn.next_hover",
                scale: 3,
                clicker: {
                    onClick: function () {
                        AchievementsUI.currentIndex++;
                        AchievementsUI.openAchievementsWindow();
                    },
                },
            },
            "btnPrevious": {
                type: "button",
                x: 640,
                y: 620,
                bitmap: "achievements_api.btn.previous",
                bitmap2: "achievements_api.btn.previous_hover",
                scale: 3,
                clicker: {
                    onClick: function () {
                        AchievementsUI.currentIndex--;
                        AchievementsUI.openAchievementsWindow();
                    },
                },
            },
        },
    });
    return AchievementsUI;
}());
AchievementsUI.init();
Callback.addCallback("NativeGuiChanged", function (screenName) {
    if (screenName == "xbl_optional_signin_screen - gui.achievements" || screenName === "/achievements") {
        simulateBackPressed(); //close popup
        AchievementsUI.currentIndex = 0;
        AchievementsUI.parentContainer.openAs(AchievementsUI.windowParent);
        AchievementsUI.openAchievementsWindow();
    }
});
var AchievementType;
(function (AchievementType) {
    AchievementType["default"] = "default";
    AchievementType["challenge"] = "challenge";
    AchievementType["goal"] = "goal";
})(AchievementType || (AchievementType = {}));
var Connection;
(function (Connection) {
    Connection["NONE"] = "none";
    Connection["VERTICAL"] = "vertical";
    Connection["HORIZONTAL"] = "horizontal";
})(Connection || (Connection = {}));
var AchievementGroup = /** @class */ (function () {
    function AchievementGroup(_prototype) {
        this._prototype = _prototype;
        this._children = {};
        if (!_prototype.uid) {
            throw new IllegalArgumentException("Invalid uid");
        }
        if (typeof _prototype.icon === "number") {
            _prototype.icon = {
                id: _prototype.icon,
            };
        }
    }
    Object.defineProperty(AchievementGroup.prototype, "uid", {
        get: function () {
            return this._prototype.uid;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AchievementGroup.prototype, "children", {
        get: function () {
            return this._children;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AchievementGroup.prototype, "prototype", {
        get: function () {
            return this._prototype;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AchievementGroup.prototype, "width", {
        get: function () {
            return this._prototype.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AchievementGroup.prototype, "height", {
        get: function () {
            return this._prototype.height;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AchievementGroup.prototype, "name", {
        get: function () {
            return this._prototype.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AchievementGroup.prototype, "icon", {
        get: function () {
            return this._prototype.icon;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AchievementGroup.prototype, "nodeSize", {
        get: function () {
            return this._prototype.size;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AchievementGroup.prototype, "backgroundTexture", {
        get: function () {
            return this._prototype.background;
        },
        enumerable: false,
        configurable: true
    });
    AchievementGroup.prototype.give = function (player, uid) {
        var achievement = this.getChild(uid);
        if (!achievement) {
            throw new IllegalArgumentException("Invalid achievement uid");
        }
        achievement.for(player).give();
    };
    AchievementGroup.prototype.addChild = function (child) {
        if (this._children[child.uid]) {
            throw new IllegalArgumentException("Achievement with uid '".concat(child.uid, "' already registered"));
        }
        this._children[child.uid] = child;
    };
    /**
     * Give all achievements of the group
     */
    AchievementGroup.prototype.giveAll = function (player) {
        for (var key in this._children) {
            this._children[key].for(player).give();
        }
    };
    AchievementGroup.prototype.getChild = function (uid) {
        return this._children[uid];
    };
    return AchievementGroup;
}());
var Achievement = /** @class */ (function () {
    function Achievement(_group, _description) {
        this._group = _group;
        this._dataFor = {};
        var parent = _description.parent;
        if (parent) {
            var parts = parent.split(":");
            this._parent =
                this.findParent(parts.length > 1 ? parts[0] : undefined, parts.length > 1 ? parts[1] : parts[0]);
        }
        if (typeof _description.icon === "number") {
            _description.icon = {
                id: _description.icon,
            };
        }
        _description.connection = _description.connection || Connection.HORIZONTAL;
        this._prototype = _description;
    }
    Object.defineProperty(Achievement.prototype, "allData", {
        get: function () {
            return this._dataFor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Achievement.prototype, "hidden", {
        get: function () {
            return this._prototype.hidden;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Achievement.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Achievement.prototype, "uid", {
        get: function () {
            return this._prototype.uid;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Achievement.prototype, "prototype", {
        get: function () {
            return this._prototype;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Achievement.prototype, "icon", {
        get: function () {
            return this._prototype.icon;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Achievement.prototype, "group", {
        get: function () {
            return this._group;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Achievement.prototype, "name", {
        get: function () {
            return Translation.translate(this._prototype.name);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Achievement.prototype, "description", {
        get: function () {
            return Translation.translate(this._prototype.description);
        },
        enumerable: false,
        configurable: true
    });
    Achievement.prototype.for = function (player) {
        var data = this._dataFor[player];
        if (!data) {
            return this._dataFor[player]
                = new AchievementsData(player, this, null);
        }
        return data;
    };
    Achievement.prototype.reset = function () {
        this._dataFor = {};
    };
    Achievement.prototype.deserialize = function (data) {
        this.reset();
        for (var key in data) {
            this._dataFor[key] = new AchievementsData(+key, this, data[key]);
        }
    };
    Achievement.prototype.serialize = function () {
        var json = {};
        for (var key in this._dataFor) {
            json[key] = this._dataFor[key].serialize();
        }
        return json;
    };
    Achievement.prototype.findParent = function (groupUID, uid) {
        var child = null;
        if (!groupUID || groupUID == this.group.uid) {
            child = this.group.getChild(uid);
        }
        else {
            var otherGroup = AchievementAPI.groups[groupUID];
            if (otherGroup) {
                child = otherGroup.getChild(uid);
            }
            else {
                throw new IllegalArgumentException("Parent not found: group uid is invalid (".concat(groupUID, ":").concat(uid, ")"));
            }
        }
        if (child) {
            return child;
        }
        else {
            throw new IllegalArgumentException("Parent not found: achievement uid is invalid (".concat(groupUID, ":").concat(uid, ")"));
        }
    };
    return Achievement;
}());
var AchievementsData = /** @class */ (function () {
    function AchievementsData(player, _achievement, data) {
        this.player = player;
        this._achievement = _achievement;
        this._fullData = data !== null && data !== void 0 ? data : {
            progress: 0,
            custom: {},
            completed: false,
        };
    }
    Object.defineProperty(AchievementsData.prototype, "isCompleted", {
        get: function () {
            return this._fullData.completed;
        },
        set: function (value) {
            this._fullData.completed = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AchievementsData.prototype, "isUnlocked", {
        get: function () {
            var _a, _b, _c;
            return (_c = (_b = (_a = this._achievement.parent) === null || _a === void 0 ? void 0 : _a.for(this.player)) === null || _b === void 0 ? void 0 : _b.isCompleted) !== null && _c !== void 0 ? _c : true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AchievementsData.prototype, "texture", {
        get: function () {
            var type;
            if (this.isCompleted) {
                type = "completed";
            }
            else if (this.isUnlocked) {
                type = "unlocked";
            }
            else {
                type = "locked";
            }
            return "achievements_api.textures." + (this._achievement.prototype.type || "default") + "_" + type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AchievementsData.prototype, "progress", {
        get: function () {
            return this._fullData.progress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AchievementsData.prototype, "achievement", {
        get: function () {
            return this._achievement;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AchievementsData.prototype, "fullData", {
        get: function () {
            return this._fullData;
        },
        enumerable: false,
        configurable: true
    });
    AchievementsData.prototype.data = function () {
        return this._fullData.custom;
    };
    AchievementsData.prototype.revoke = function () {
        this._fullData.completed = false;
    };
    AchievementsData.prototype.give = function () {
        var _a;
        if (this.isCompleted) {
            return;
        }
        var parent = this._achievement.parent;
        if (parent && !parent.for(this.player).isCompleted) {
            return;
        }
        var description = this._achievement.prototype;
        if (description.progressMax && ++this._fullData.progress < description.progressMax) {
            return;
        }
        if (description.showPopup !== false) {
            var item = description.icon;
            var title = void 0;
            var color = void 0;
            switch (description.type) {
                case "challenge":
                    title = Translation.translate("achievements_api.challenge_complete");
                    color = android.graphics.Color.MAGENTA;
                    break;
                case "goal":
                    title = Translation.translate("achievements_api.goal_complete");
                    color = android.graphics.Color.YELLOW;
                    break;
                default:
                    title = Translation.translate("achievements_api.complete");
                    color = android.graphics.Color.YELLOW;
            }
            AchievementPopup.showFor(Network.getClientForPlayer(this.player), {
                title: title,
                color: color,
                description: Translation.translate(description.name) || "",
                item: {
                    id: item.id || 1,
                    data: item.data || 0,
                    count: 1,
                },
            });
        }
        if ((_a = description.announce) !== null && _a !== void 0 ? _a : true) {
            Network.sendServerMessage("".concat(Entity.getNameTag(this.player), " ").concat(Translation.translate("achievements_api.made"), " ").concat(Native.Color.GREEN, "[").concat(this.achievement.name, "]"));
        }
        this.isCompleted = true;
        Callback.invokeCallback("onAchievementCompleted", this);
    };
    AchievementsData.prototype.serialize = function () {
        return this._fullData;
    };
    return AchievementsData;
}());
var AchievementAPI = /** @class */ (function () {
    function AchievementAPI() {
    }
    /**
     * Register new group
     * @param description - description object
     */
    AchievementAPI.registerGroup = function (description) {
        var group = new AchievementGroup(description);
        if (this.groups[group.uid]) {
            throw new IllegalArgumentException("Group with uid \"${uid}\" already registered");
        }
        this.groups[group.uid] = group;
        AchievementsUI.groupNames.push(description.uid);
        return group;
    };
    /**
     * Register new achievement
     * @param uid - group unique identifier
     * @param description - description object
     */
    AchievementAPI.register = function (uid, description) {
        var group = this.groups[uid];
        if (!group) {
            throw new IllegalArgumentException("Invalid group uid");
        }
        var achievement = new Achievement(group, description);
        group.addChild(achievement);
        return achievement;
    };
    /**
     * Register array of achievements
     * @param uid - group unique identifier
     * @param descriptions - descriptions array
     */
    AchievementAPI.registerAll = function (uid, descriptions) {
        var e_1, _a;
        try {
            for (var descriptions_1 = __values(descriptions), descriptions_1_1 = descriptions_1.next(); !descriptions_1_1.done; descriptions_1_1 = descriptions_1.next()) {
                var description = descriptions_1_1.value;
                AchievementAPI.register(uid, description);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (descriptions_1_1 && !descriptions_1_1.done && (_a = descriptions_1.return)) _a.call(descriptions_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    //noinspection JSUnusedGlobalSymbols
    /**
     * Load groups and achievements from JSON file
     * @param path - path to JSON
     * @example <i>AchievementAPI.loadFrom(\_\_dir\_\_ + "/achievements.json")</i>
     */
    AchievementAPI.loadFrom = function (path) {
        var content = FileTools.ReadText(path);
        if (content) {
            var parsed = JSON.parse(content);
            var groups = parsed.groups;
            if (groups) {
                for (var key in groups) {
                    AchievementAPI.registerGroup(groups[key]);
                }
            }
            var achievements = parsed.achievements;
            if (achievements) {
                for (var key in achievements) {
                    var group = achievements[key];
                    AchievementAPI.registerAll(key, group);
                }
            }
            return;
        }
        Logger.Log("Error loading file " + path, "ERROR");
    };
    //noinspection JSUnusedGlobalSymbols
    /**
     * @param groupUID - group identifier in which achievement contains
     * @param uid - achievement identifier
     * @param player - player uid
     * @returns Is the achievement unlocked?
     */
    AchievementAPI.isUnlocked = function (groupUID, uid, player) {
        var group = this.groups[groupUID];
        if (!group) {
            throw new IllegalArgumentException("Group with uid '".concat(groupUID, "' not found"));
        }
        var achievement = group.getChild(uid);
        if (!achievement) {
            throw new IllegalArgumentException("Achievement with uid '".concat(groupUID, "' not found"));
        }
        return achievement.for(player).isUnlocked;
    };
    /**
     * Give all achievements
     */
    AchievementAPI.giveAll = function (player) {
        for (var key in this.groups) {
            this.groups[key].giveAll(player);
        }
    };
    AchievementAPI.revokeAll = function (player) {
        for (var groupKey in AchievementAPI.groups) {
            var group = AchievementAPI.groups[groupKey];
            for (var key in group.children) {
                var child = group.getChild(key);
                child.for(player).revoke();
            }
        }
    };
    /**
     * @param groupUID - group identifier in which achievement contains
     * @param uid - achievement identifier
     * @param player - player uid
     * @returns Is the achievement completed?
     */
    AchievementAPI.isCompleted = function (groupUID, uid, player) {
        return this.groups[groupUID].getChild(uid).for(player).isCompleted;
    };
    /**
     * Give the achievement
     * @param player - player uid
     * @param groupUID - group identifier
     * @param uid - achievement identifier
     */
    AchievementAPI.give = function (player, groupUID, uid) {
        var group = this.groups[groupUID];
        if (!group) {
            throw new IllegalArgumentException("Group with uid '".concat(groupUID, "' not found"));
        }
        group.give(player, uid);
    };
    AchievementAPI.resetAll = function () {
        for (var groupKey in this.groups) {
            var group = this.groups[groupKey];
            for (var key in group.children) {
                var child = group.getChild(key);
                child.reset();
            }
        }
    };
    AchievementAPI.getGroup = function (uid) {
        return this.groups[uid] || null;
    };
    /**
     * Array of registered groups by <i>AchievementAPI.registerGroup</i>
     */
    AchievementAPI.groups = {};
    return AchievementAPI;
}());
Callback.addCallback("LevelLeft", function () { return AchievementAPI.resetAll(); });
Saver.addSavesScope("AchievementsScope", function read(scope) {
    var _a;
    var groups = {};
    if (!scope._format) {
        Logger.Log("Old saves detected. Converting...", LOG_TAG);
        for (var groupKey in scope) {
            var group = {};
            var data = scope[groupKey];
            for (var key in data) {
                group[key] = (_a = {},
                    _a[Player.get()] = data[key],
                    _a);
            }
            groups[groupKey] = group;
        }
    }
    else {
        groups = scope.data;
    }
    for (var groupKey in groups) {
        var group = AchievementAPI.getGroup(groupKey);
        if (!group) {
            Logger.Log("Group with uid '".concat(groupKey, "' not found. Skipping..."), "WARNING");
            continue;
        }
        var data = groups[groupKey];
        for (var achievementKey in data) {
            var child = group.getChild(achievementKey);
            if (!child) {
                Logger.Log("Achievement with uid '".concat(achievementKey, "' not found. Skipping..."), "WARNING");
                continue;
            }
            child.deserialize(data[achievementKey]);
        }
    }
}, function save() {
    var data = {};
    for (var groupKey in AchievementAPI.groups) {
        var group = AchievementAPI.groups[groupKey];
        var saved = {};
        for (var childKey in group.children) {
            saved[childKey] = group.children[childKey].serialize();
        }
        data[groupKey] = saved;
    }
    return {
        data: data,
        _format: 1,
    };
});
AchievementAPI.loadFrom(__dir__ + "achievements/story.json");
AchievementAPI.loadFrom(__dir__ + "achievements/nether.json");
Callback.addCallback("ItemUse", function (coords, item, block, isExternal, player) {
    switch (item.id) {
        case VanillaBlockID.crafting_table:
            AchievementAPI.give(player, "story", "root");
            break;
        case VanillaItemID.bucket:
            if (item.data === 10) { //lava_bucket
                AchievementAPI.give(player, "story", "lava_bucket");
            }
            break;
        case VanillaItemID.ender_eye:
            AchievementAPI.give(player, "story", "follow_ender_eye");
            break;
        case VanillaItemID.potion:
            AchievementAPI.give(player, "nether", "brew_potion");
            break;
    }
});
Callback.addCallback("DestroyBlock", function (coords, block, player) {
    switch (block.id) {
        case VanillaBlockID.stone:
            AchievementAPI.give(player, "story", "mine_stone");
            break;
        case VanillaBlockID.obsidian:
            AchievementAPI.give(player, "story", "form_obsidian");
            break;
        case VanillaBlockID.diamond_ore:
            AchievementAPI.give(player, "story", "mine_diamond");
            break;
        case VanillaBlockID.nether_brick:
            AchievementAPI.give(player, "nether", "find_fortress");
            break;
    }
});
Callback.addCallback("PlayerChangedDimension", function (player, dimension) {
    if (dimension === DimensionType.NETHER) {
        AchievementAPI.give(player, "story", "enter_the_nether");
        AchievementAPI.give(player, "nether", "root");
    }
    else if (dimension === DimensionType.END) {
        AchievementAPI.give(player, "story", "enter_the_end");
    }
});
Callback.addCallback("EntityHurt", function (attacker, victim) {
    var typeOfAttacker = Entity.getType(attacker);
    if (typeOfAttacker !== 1) {
        return;
    }
    var typeOfVictim = Entity.getType(victim);
    if (typeOfVictim === EntityType.FIREBALL) {
        AchievementAPI.give(attacker, "nether", "return_to_sender");
    }
});
Callback.addCallback("EntityDeath", function (entity, attacker) {
    var typeOfAttacker = Entity.getType(attacker);
    if (typeOfAttacker !== 1) {
        return;
    }
    var typeOfVictim = Entity.getType(entity);
    switch (typeOfVictim) {
        case EntityType.WHITHER_SKELETON:
            if (Player.getDimension() === DimensionType.NETHER) {
                AchievementAPI.give(attacker, "nether", "kill_wither_skeleton");
            }
            break;
        case EntityType.GHAST:
            if (Player.getDimension() === DimensionType.NORMAL) {
                AchievementAPI.give(attacker, "nether", "uneasy_alliance");
            }
            break;
        case EntityType.BLAZE:
            AchievementAPI.give(attacker, "nether", "obtain_blaze_rod");
            break;
        case EntityType.ENDER_DRAGON:
            AchievementAPI.give(attacker, "story", "kill_dragon");
            break;
    }
});
Callback.addCallback("EntityAdded", function (entity) {
    if (Entity.getType(entity) === EntityType.WHITHER) {
        var source = BlockSource.getDefaultForActor(entity);
        var pos = Entity.getPosition(entity);
        var range = 40;
        source.fetchEntitiesInAABB(pos.x - range, pos.y - range, pos.z - range, pos.x + range, pos.y + range, pos.z + range, EntityType.PLAYER, false)
            .forEach(function (player) {
            return AchievementAPI.give(player, "nether", "summon_wither");
        });
    }
});
Callback.addCallback("VanillaWorkbenchCraft", function (result, container, player) {
    switch (result.id) {
        case VanillaItemID.stone_pickaxe:
            AchievementAPI.give(player, "story", "upgrade_tools");
            break;
        case VanillaItemID.iron_helmet:
        case VanillaItemID.iron_chestplate:
        case VanillaItemID.iron_leggings:
        case VanillaItemID.iron_boots:
            AchievementAPI.give(player, "story", "obtain_armor");
            break;
        case VanillaItemID.diamond_helmet:
        case VanillaItemID.diamond_chestplate:
        case VanillaItemID.diamond_leggings:
        case VanillaItemID.diamond_boots:
            AchievementAPI.give(player, "story", "shiny_gear");
            break;
        case VanillaItemID.iron_pickaxe:
            AchievementAPI.give(player, "story", "iron_tools");
            break;
    }
});
Callback.addCallback("NativeCommand", function (cmd) {
    var parts = cmd.substr(1).split(" ");
    if (parts[0] !== "ach" && parts[0] !== "achievement") {
        return;
    }
    switch (parts[1]) {
        case "giveAll":
            Network.sendToServer("achievements_api.handle_command", { type: "giveAll", player: parts[2] ? parts[2] : getPlayerName() });
            break;
        case "give":
            Network.sendToServer("achievements_api.handle_command", { type: "give", player: parts[3] ? parts[3] : getPlayerName(), group: parts[2] });
            break;
        case "revokeAll":
            Network.sendToServer("achievements_api.handle_command", { type: "revokeAll", player: parts[2] ? parts[2] : getPlayerName() });
            break;
        default:
            return;
    }
    Game.prevent();
});
Network.addServerPacket("achievements_api.handle_command", function (client, data) {
    if (client.getPlayerUid() != Player.get()) { //require != because !== return false for same values
        client.sendMessage(ChatColor.RED + Translation.translate("achievements_api.commands_only_on_host"));
        return;
    }
    if (!data.player) {
        client.sendMessage(ChatColor.RED + Translation.translate("achievements_api.player_not_found"));
    }
    var player = getPlayerByTag(data.player);
    if (!player) {
        client.sendMessage(ChatColor.RED +
            Translation.translate("achievements_api.player_with_nick_not_found").replace("%1", data.player));
        return;
    }
    switch (data.type) {
        case "giveAll": {
            AchievementAPI.giveAll(player);
            client.sendMessage(Translation.translate("achievements_api.given"));
            return;
        }
        case "give": {
            if (!data.group) {
                client.sendMessage(ChatColor.RED + Translation.translate("achievements_api.invalid_group"));
                break;
            }
            var group = AchievementAPI.getGroup(data.group);
            if (!group) {
                client.sendMessage(ChatColor.RED +
                    Translation.translate("achievements_api.group_not_found".replace("%1", data.group)));
                break;
            }
            group.giveAll(player);
            client.sendMessage(Translation.translate("achievements_api.given"));
            return;
        }
        case "revokeAll": {
            AchievementAPI.revokeAll(player);
            client.sendMessage(Translation.translate("achievements_api.revoked"));
            return;
        }
    }
});
ModAPI.registerAPI("AchievementsAPI", {
    Achievement: Achievement,
    AchievementAPI: AchievementAPI,
    AchievementGroup: AchievementGroup,
    AchievementsData: AchievementsData,
    AchievementsUI: AchievementsUI,
    AchievementType: AchievementType,
    AchievementPopup: AchievementPopup,
    Connection: Connection,
    requireGlobal: function (command) {
        return eval(command);
    },
});
Logger.Log("AchievementsAPI shared with name AchievementsAPI", "API");
