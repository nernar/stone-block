/*
 *  ___               _            ___ ___
 * | __|__ _ _ ___ __| |_ _ _ _  _| _ \ __|
 * | _/ _ \ '_/ -_|_-<  _| '_| || |  _/ _|
 * |_|\___/_| \___/__/\__|_|  \_, |_| |___|
 *                            |__/
 *
 * Github Repository: https://github.com/DDCompany/ForestryPE
 * Issues Tracker: https://github.com/DDCompany/ForestryPE/issues
 *
 * Terms of use:
 *  - Forbidden to distribute the library on third-party sources
      without links to the official group (https://vk.com/forestry_pe)
 *  - Forbidden to change the code of this mod
 *  - Forbidden to explicitly copy the code to other libraries or mods
 *  - Using the mod you automatically agree to the conditions described above
 *
 * Warning!
 * All ideas and textures belong to the original author - https://github.com/ForestryMC/ForestryMC
 *
 * Port by DDCompany (https://vk.com/forestry_pe)
 */
IMPORT("EnergyNet");
IMPORT("flags");
IMPORT("ToolLib");
IMPORT("BackpackAPI");
IMPORT("StorageInterface");
var LOG_TAG = "ForestryPE";
var GROUP_ITEM_PIPE = ICRender.getGroup("item-pipe");
var startTime = java.lang.System.currentTimeMillis();
var APATITE_GEN_BIOMES = [3, 131, 34, 162];
var EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);
var RF = EnergyTypeRegistry.assureEnergyType("RF", 0.25);
var setLoadingTip = ModAPI.requireGlobal("MCSystem.setLoadingTip");
var COMBS = [];
function log(msg, tag) {
    Logger.Log("[" + LOG_TAG + "] " + msg, tag);
}
function summonException(msg) {
    throw new Error(msg);
}
Translation.addTranslation("Drones", { ru: "Трутни" });
Translation.addTranslation("Princesses", { ru: "Принцессы" });
Translation.addTranslation("Queens", { ru: "Королевы" });
Translation.addTranslation("Ores", { ru: "Руды" });
Translation.addTranslation("Blocks", { ru: "Блоки из руд" });
Translation.addTranslation("Ingots", { ru: "Слитки" });
Translation.addTranslation("Comb Blocks", { ru: "Блоки из сот" });
Translation.addTranslation("Beehives", { ru: "Ульи" });
Translation.addTranslation("Combs", { ru: "Соты" });
Translation.addTranslation("Frames", { ru: "Рамки" });
Translation.addTranslation("Propolis", { ru: "Прополис" });
Translation.addTranslation("Pollen", { ru: "Пыльца" });
Translation.addTranslation("Alveary", { ru: "Огромный улей" });
Translation.addTranslation("Gears", { ru: "Шестерёнки" });
Translation.addTranslation("Casings", { ru: "Корпуса" });
Translation.addTranslation("Tubes", { ru: "Электронные лампы" });
Translation.addTranslation("Chipsets", { ru: "Печатные платы" });
Translation.addTranslation("Machines", { ru: "Механизмы" });
Translation.addTranslation("Engines", { ru: "Движки" });
Translation.addTranslation("Backpacks", { ru: "Рюкзаки" });
Translation.addTranslation("Woven Backpacks", { ru: "Сотканные рюкзаки" });
Translation.addTranslation("Wax Capsules", { ru: "Восковые капсулы" });
Translation.addTranslation("Cans", { ru: "Капсулы" });
Translation.addTranslation("Refractory Capsules", { ru: "Огнеупорные капсулы" });
Translation.addTranslation("Buckets", { ru: "Вёдра" });
Translation.addTranslation("Crates", { ru: "Бочки" });
var GROUP_DRONES = "forestry_drones";
var GROUP_DRONES_NAME = Translation.translate("Drones");
var GROUP_PRINCESSES = "forestry_princesses";
var GROUP_PRINCESSES_NAME = Translation.translate("Princesses");
var GROUP_QUEENS = "forestry_queens";
var GROUP_QUEENS_NAME = Translation.translate("Queens");
var GROUP_ORES = "forestry_ores";
var GROUP_ORES_NAME = Translation.translate("Ores");
var GROUP_ORE_BLOCKS = "forestry_ore_blocks";
var GROUP_ORE_BLOCKS_NAME = Translation.translate("Blocks");
var GROUP_INGOTS = "forestry_ingots";
var GROUP_INGOTS_NAME = Translation.translate("Ingots");
var GROUP_COMB_BLOCKS = "forestry_comb_blocks";
var GROUP_COMB_BLOCKS_NAME = Translation.translate("Comb Blocks");
var GROUP_BEEHIVES = "forestry_beehives";
var GROUP_BEEHIVES_NAME = Translation.translate("Beehives");
var GROUP_COMBS = "forestry_combs";
var GROUP_COMBS_NAME = Translation.translate("Combs");
var GROUP_FRAMES = "forestry_frames";
var GROUP_FRAMES_NAME = Translation.translate("Frames");
var GROUP_PROPOLIS = "forestry_propolis";
var GROUP_PROPOLIS_NAME = Translation.translate("Propolis");
var GROUP_POLLEN = "forestry_pollen";
var GROUP_POLLEN_NAME = Translation.translate("Pollen");
var GROUP_ALVEARY = "forestry_alveary";
var GROUP_ALVEARY_NAME = Translation.translate("Alveary");
var GROUP_GEARS = "forestry_gears";
var GROUP_GEARS_NAME = Translation.translate("Gears");
var GROUP_CASINGS = "forestry_casings";
var GROUP_CASINGS_NAME = Translation.translate("Casings");
var GROUP_TUBES = "forestry_tubes";
var GROUP_TUBES_NAME = Translation.translate("Tubes");
var GROUP_CHIPSETS = "forestry_chipsets";
var GROUP_CHIPSETS_NAME = Translation.translate("Chipsets");
var GROUP_MACHINES = "forestry_machines";
var GROUP_MACHINES_NAME = Translation.translate("Machines");
var GROUP_ENGINES = "forestry_engines";
var GROUP_ENGINES_NAME = Translation.translate("Engines");
var GROUP_BACKPACKS = "forestry_backpacks";
var GROUP_BACKPACKS_NAME = Translation.translate("Backpacks");
var GROUP_WOVEN_BACKPACKS = "forestry_woven_backpacks";
var GROUP_WOVEN_BACKPACKS_NAME = Translation.translate("Woven Backpacks");
var GROUP_WAX_CAPSULES = "forestry_wax_capsules";
var GROUP_WAX_CAPSULES_NAME = Translation.translate("Wax Capsules");
var GROUP_CANS = "forestry_cans";
var GROUP_CANS_NAME = Translation.translate("Cans");
var GROUP_REFRACTORY_CAPSULES = "forestry_refractory_capsules";
var GROUP_REFRACTORY_CAPSULES_NAME = Translation.translate("Refractory Capsules");
var GROUP_BUCKETS = "forestry_buckets";
var GROUP_BUCKETS_NAME = Translation.translate("Buckets");
var GROUP_CRATES = "forestry_crates";
var GROUP_CRATES_NAME = Translation.translate("Crates");
var ForestryConfig = /** @class */ (function () {
    function ForestryConfig() {
    }
    /* ----- BEEHIVES GEN ----- */
    ForestryConfig.genBeehivesDebug = __config__.getBool("gen.beehives.debug");
    ForestryConfig.genForestChance = __config__.getDouble("gen.beehives.forest");
    ForestryConfig.genMeadowsChance = __config__.getDouble("gen.beehives.meadows");
    ForestryConfig.genModestChance = __config__.getDouble("gen.beehives.modest");
    ForestryConfig.genTropicalChance = __config__.getDouble("gen.beehives.tropical");
    ForestryConfig.genWintryChance = __config__.getDouble("gen.beehives.wintry");
    ForestryConfig.genMarshyChance = __config__.getDouble("gen.beehives.marshy");
    ForestryConfig.genEnderChance = __config__.getDouble("gen.beehives.ender");
    /* ----- ORE GEN ----- */
    ForestryConfig.genApatite = __config__.getBool("gen.apatite.enabled");
    ForestryConfig.genApatiteSize = __config__.getInteger("gen.apatite.size");
    ForestryConfig.genApatiteMinY = __config__.getInteger("gen.apatite.minY");
    ForestryConfig.genApatiteMaxY = __config__.getInteger("gen.apatite.maxY");
    ForestryConfig.genCopper = __config__.getBool("gen.copper.enabled");
    ForestryConfig.genCopperInChunk = __config__.getInteger("gen.copper.inChunk");
    ForestryConfig.genCopperSize = __config__.getInteger("gen.copper.size");
    ForestryConfig.genCopperMinY = __config__.getInteger("gen.copper.minY");
    ForestryConfig.genCopperMaxY = __config__.getInteger("gen.copper.maxY");
    ForestryConfig.genTin = __config__.getBool("gen.tin.enabled");
    ForestryConfig.genTinInChunk = __config__.getInteger("gen.tin.inChunk");
    ForestryConfig.genTinSize = __config__.getInteger("gen.tin.size");
    ForestryConfig.genTinMinY = __config__.getInteger("gen.tin.minY");
    ForestryConfig.genTinMaxY = __config__.getInteger("gen.tin.maxY");
    /* ----- BEEKEEPING ----- */
    ForestryConfig.beekeepingMode = __config__.getInteger("beekeeping.mode");
    ForestryConfig.secondPrincessChance = __config__.getDouble("beekeeping.secondPrincessChance");
    ForestryConfig.hiveDamageOnAttack = __config__.getBool("beekeeping.hiveDamageOnAttack");
    ForestryConfig.hiveDamageOnPeaceful = __config__.getBool("beekeeping.hiveDamageOnPeaceful");
    /* ----- RECIPES ----- */
    ForestryConfig.recipeBronzeIngot = __config__.getBool("recipes.bronzeIngot");
    /* ----- PARTICLES ----- */
    ForestryConfig.particlesBeeHives = __config__.getBool("particles.beeHives");
    /* ----- MACHINES ----- */
    ForestryConfig.rainTankEnabled = __config__.getBool("machines.rainTank");
    /* ----- BLOCKS ----- */
    ForestryConfig.combsBlocksEnabled = __config__.getBool("blocks.combsEnabled");
    ForestryConfig.oresBlocksEnabled = __config__.getBool("blocks.oresEnabled");
    /* ----- OTHER ----- */
    ForestryConfig.crateEnabled = __config__.getBool("crateEnabled");
    ForestryConfig.reusableCapsules = __config__.getBool("reusableCapsules");
    return ForestryConfig;
}());
setLoadingTip("Common Api Loading...");
var ContainerHelper = /** @class */ (function () {
    function ContainerHelper() {
    }
    ContainerHelper.putInSlots = function (toPut, container, slots) {
        for (var key in toPut) {
            var count = toPut[key][2];
            for (var key2 in slots) {
                if (!count)
                    break;
                var slotName = slots[key2];
                var slot = container.getSlot(slotName);
                if (slot.id === toPut[key][0] && slot.data === toPut[key][1] && slot.count < Item.getMaxStack(slot.id)) {
                    var f = Math.min(count, Item.getMaxStack(slot.id) - slot.count);
                    count -= f;
                    container.setSlot(slotName, slot.id, slot.count + f, slot.data);
                }
                else if (slot.id === 0) {
                    container.setSlot(slotName, toPut[key][0], toPut[key][2], toPut[key][1]);
                    count = 0;
                }
            }
        }
    };
    ContainerHelper.putInSlot = function (container, slotName, item) {
        var count = item.count || 1;
        var slot = container.getSlot(slotName);
        if (slot.id === 0) {
            container.setSlot(slotName, item.id, count, item.data);
            return true;
        }
        else if (slot.id === item.id && slot.data === item.data && slot.count + count <= Item.getMaxStack(item.id)) {
            container.setSlot(slotName, slot.id, slot.count + count, slot.data);
            return true;
        }
        return false;
    };
    /**
     * Наполнение предмета определённой жидкостью из TileEntity
     * @param liquid жидкость, которой необходимо наполнить предмет
     * @param tile TileEntity
     * @param slotEmptyName идентификатор слота для пустых контейнеров
     * @param slotFullName идентификатор слота для заполненных контейнеров
     */
    ContainerHelper.fillContainer = function (liquid, tile, slotEmptyName, slotFullName) {
        if (!liquid)
            return;
        if (tile.liquidStorage.getAmount(liquid) < 1)
            return;
        var container = tile.container;
        var slotEmpty = container.getSlot(slotEmptyName);
        var full = LiquidRegistry.getFullItem(slotEmpty.id, slotEmpty.data, liquid);
        if (full) {
            if (!ContainerHelper.putInSlot(container, slotFullName, full))
                return;
            container.setSlot(slotEmptyName, slotEmpty.id, slotEmpty.count - 1, slotEmpty.data);
            tile.liquidStorage.getLiquid(liquid, 1);
            container.validateSlot(slotEmptyName);
            return liquid;
        }
    };
    /**
     * Извлечение жидкости из контейнера и перемещение ёё в TileEntity
     * @param liquid жидкость, которую необходимо извлечь
     * @param tile TileEntity
     * @param slotFullName идентификатор слота с наполненными контейнерами
     */
    ContainerHelper.drainContainer = function (liquid, tile, slotFullName) {
        var slot = tile.container.getSlot(slotFullName);
        var empty = LiquidRegistry.getEmptyItem(slot.id, slot.data);
        if (!empty)
            return;
        var _liquid = empty.liquid;
        if (!liquid || liquid === _liquid) {
            if (tile.liquidStorage.getAmount(_liquid) + 1 > 10)
                return;
            if (slot.count - 1 === 0) {
                if (!this.isReusable(empty.id)) {
                    tile.container.clearSlot(slotFullName);
                }
                else {
                    tile.container.setSlot(slotFullName, empty.id, 1, empty.data);
                }
            }
            else {
                tile.container.setSlot(slotFullName, slot.id, slot.count - 1, slot.data);
            }
            tile.liquidStorage.addLiquid(_liquid, 1);
            return _liquid || liquid || undefined;
        }
    };
    ContainerHelper.drainContainer2 = function (liquid, tile, slotFullName, slotEmptyName) {
        var container = tile.container;
        var slotFull = container.getSlot(slotFullName);
        var empty = LiquidRegistry.getEmptyItem(slotFull.id, slotFull.data);
        if (!empty)
            return;
        var _liquid = empty.liquid;
        if (!liquid || liquid === _liquid) {
            if (tile.liquidStorage.getAmount(_liquid) + 1 > 10)
                return;
            if (!this.isReusable(empty.id) || this.putInSlot(container, slotEmptyName, empty)) {
                container.setSlot(slotFullName, slotFull.id, slotFull.count - 1, slotFull.data);
                tile.liquidStorage.addLiquid(_liquid, 1);
                container.validateSlot(slotFullName);
                return _liquid;
            }
        }
    };
    ContainerHelper.isReusable = function (id) {
        if (ForestryConfig.reusableCapsules)
            return true;
        switch (id) {
            case ItemID.waxCapsuleEmpty:
            case ItemID.canEmpty:
            case ItemID.refractoryEmpty:
                return false;
            default:
                return true;
        }
    };
    ContainerHelper.equals = function (item1, item2) {
        if (!item1 && !item2)
            return true;
        if (!item1 || !item2)
            return false;
        return item1.id === item2.id && ((item1.data || 0) === (item2.data || 0) || item1.data === -1 || item2.data === -1);
    };
    ContainerHelper.setMaxStackPolicy = function (container, slotName, limit) {
        container.setSlotAddTransferPolicy(slotName, function (name, slotName, id, count) {
            var maxStack = Item.getMaxStack(id);
            var current = container.getSlot(slotName).count;
            return Math.min(count, maxStack - current, limit);
        });
    };
    return ContainerHelper;
}());
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
var MachineRegistry = /** @class */ (function () {
    function MachineRegistry() {
    }
    MachineRegistry.registerConsumer = function (id, prototype, energyType) {
        energyType = energyType || RF;
        if (!prototype.energyTick) {
            prototype.energyTick = function () {
            };
        }
        if (!prototype.energyReceive) {
            prototype.energyReceive = function (type, amount) {
                var add = Math.min(this.getMaxTransfer(), amount, this.getEnergyStorage() - this.data.energy);
                this.data.energy += add;
                return add;
            };
        }
        this.register(id, prototype, energyType);
    };
    MachineRegistry.registerGenerator = function (id, prototype, energyType) {
        energyType = energyType || RF;
        if (!prototype.energyTick) {
            prototype.energyTick = function (type, src) {
                var out = Math.min(32, this.data.energy);
                this.data.energy -= out;
                this.data.energy += src.add(out);
            };
        }
        prototype.canReceiveEnergy = function () { return false; };
        prototype.isEnergySource = function () { return true; };
        this.register(id, prototype, energyType);
    };
    MachineRegistry.register = function (id, prototype, energyType) {
        energyType = energyType || RF;
        this.machines[id] = prototype;
        if (prototype.defaultValues) {
            prototype.defaultValues.energy = 0;
        }
        else {
            prototype.defaultValues = { energy: 0 };
        }
        if (!prototype.getMaxTransfer)
            prototype.getMaxTransfer = function () { return 1100; };
        if (!prototype.getEnergyStorage) {
            prototype.getEnergyStorage = function () { return 0; };
        }
        this.setupDefaults(prototype);
        this.setupWireConnection(id, energyType);
        ToolAPI.registerBlockMaterial(id, "stone", 1, true);
        Block.setDestroyTime(id, 1.5);
        TileEntity.registerPrototype(id, prototype);
        EnergyTileRegistry.addEnergyTypeForId(id, energyType);
    };
    MachineRegistry.registerDefault = function (blockId, prototype) {
        this.setupDefaults(prototype);
        TileEntity.registerPrototype(blockId, prototype);
    };
    MachineRegistry.setupDefaults = function (prototype) {
        if (!prototype.getScreenName) {
            prototype.getScreenName = function () { return "main"; };
        }
        if (!prototype.client) {
            prototype.client = {};
        }
        if (!prototype.client.containerEvents) {
            prototype.client.containerEvents = {};
        }
        if (prototype.updateLiquidScale) {
            throw new Error("updateLiquidScale is reserved by MachineRegistry");
        }
        prototype.updateLiquidScale = function (elementName, liquidName) {
            this.container.sendEvent("__updateLiquidScale", {
                elementName: elementName,
                liquidName: liquidName,
                amount: this.liquidStorage.getRelativeAmount(liquidName)
            });
        };
        prototype.client.containerEvents.__updateLiquidScale = this.updateUiScaleEvent;
    };
    MachineRegistry.setupWireConnection = function (id, energyType) {
        switch (energyType.name) {
            case EU.name:
                ICRender.getGroup("ic-wire").add(id, -1);
                return;
            case RF.name:
                ICRender.getGroup("rf-wire").add(id, -1);
                return;
            default:
                summonException("Energy type not supported");
        }
    };
    MachineRegistry.addUiTitleTranslation = function (ui) {
        if (this.uis.indexOf(ui) === -1) {
            this.uis.push(ui);
        }
    };
    MachineRegistry.updateUiScaleEvent = function (container, _, __, data) {
        var ui = container.getUiAdapter();
        var elementRect = ui.getBinding(data.elementName, "element_rect");
        if (elementRect) {
            var texture = LiquidRegistry.getLiquidUITexture(data.liquidName, elementRect.width(), elementRect.height());
            ui.setBinding(data.elementName, "texture", texture);
            ui.setBinding(data.elementName, "value", data.amount);
        }
    };
    MachineRegistry.machines = {};
    MachineRegistry.uis = [];
    return MachineRegistry;
}());
Callback.addCallback("LocalLevelLoaded", function () {
    var e_1, _a;
    var _b, _c, _d, _e, _f, _g, _h;
    try {
        for (var _j = __values(MachineRegistry.uis), _k = _j.next(); !_k.done; _k = _j.next()) {
            var ui = _k.value;
            var headerWindow = ui.getWindow("header");
            if (!headerWindow) {
                throw new Error("Header window not found");
            }
            // @ts-ignore
            var textDrawing = (_b = headerWindow.getContentProvider().drawing) === null || _b === void 0 ? void 0 : _b[2];
            if (!textDrawing) {
                throw new Error("Text drawing not found");
            }
            // @ts-ignore
            var headerText = ((_e = (_d = (_c = ui.getContent().standard) === null || _c === void 0 ? void 0 : _c.header) === null || _d === void 0 ? void 0 : _d.text) === null || _e === void 0 ? void 0 : _e.text) || ((_h = (_g = (_f = ui.getContent().standart) === null || _f === void 0 ? void 0 : _f.header) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.text);
            if (!headerText) {
                throw new Error("Title not set");
            }
            textDrawing.text = Translation.translate(headerText);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_k && !_k.done && (_a = _j.return)) _a.call(_j);
        }
        finally { if (e_1) throw e_1.error; }
    }
});
var ModelHelper = /** @class */ (function () {
    function ModelHelper() {
    }
    ModelHelper.createEngineModel = function (blockID) {
        Block.setBlockShape(blockID, { x: 0, y: 0, z: 0 }, { x: 1, y: 0.374, z: 1 });
        var render = new ICRender.Model();
        BlockRenderer.setStaticICRender(blockID, 0, render);
        var model = BlockRenderer.createModel();
        model.addBox(0, 0, 0, 1, 0.374, 1, blockID, 0);
        model.addBox(0.125, 0.374, 0.125, 0.875, 0.624, 0.875, blockID, 0);
        model.addBox(0.25, 0.624, 0.25, 0.75, 0.999, 0.75, blockID, 0);
        render.addEntry(model);
    };
    return ModelHelper;
}());
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.objectUnion = function () {
        var objects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            objects[_i] = arguments[_i];
        }
        var obj = {};
        for (var key in objects) {
            var n = objects[key];
            if (typeof n !== "object" && !Array.isArray(n)) {
                continue;
            }
            for (var key2 in n) {
                // @ts-ignore
                if (typeof n[key2] === "object" && !Array.isArray(n[key2])) {
                    // @ts-ignore
                    obj[key2] = this.objectUnion(obj, n[key2]);
                    continue;
                }
                // @ts-ignore
                obj[key2] = n[key2];
            }
        }
        return obj;
    };
    Util.random = function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    return Util;
}());
var ChestManager = /** @class */ (function () {
    function ChestManager() {
    }
    ChestManager.register = function (unique, name, textures, inCreative, slots, tile, specType) {
        Block.createBlockWithRotation(unique, [
            { name: name, texture: textures, inCreative: inCreative }
        ], specType);
        this.createModel(BlockID[unique]);
        if (tile.init) {
            summonException("init is reserved by ChestManager");
        }
        tile.useNetworkItemContainer = true;
        tile.init = function () {
            var _this = this;
            this.container.setGlobalAddTransferPolicy(function (name, slotName, id, count, data) {
                return _this.isValid(id, data) ? count : 0;
            });
        };
        var elements = {};
        for (var i = 0; i < slots; i++) {
            elements[i] = {
                type: "slot",
                x: 350 + i % 10 * 61,
                y: 40 + Math.floor(i / 10) * 61,
                isValid: tile.isValid,
            };
        }
        var gui = new UI.StandartWindow({
            standard: {
                header: {
                    text: {
                        text: name
                    }
                },
                inventory: {
                    standard: true
                },
                background: {
                    standard: true
                },
                minHeight: 110 + slots / 10 * 61,
            },
            drawing: [],
            elements: elements,
        });
        MachineRegistry.addUiTitleTranslation(gui);
        tile.getGuiScreen = function () { return gui; };
        TileEntity.registerPrototype(BlockID[unique], tile);
        var slotList = {};
        for (var i = 0; i < slots; i++) {
            slotList[i] = {
                input: true,
                output: true,
                isValid: function (item) {
                    return tile.isValid(item.id, item.data);
                },
            };
        }
        StorageInterface.createInterface(BlockID[unique], { slots: slotList });
    };
    ChestManager.createModel = function (blockID) {
        for (var i = 0; i < 4; i++) {
            var render = new ICRender.Model();
            var model = BlockRenderer.createModel();
            model.addBox(0.07, 0, 0.07, 0.93, 0.87, 0.93, blockID, i);
            BlockRenderer.setStaticICRender(blockID, i, render);
            switch (i) {
                case 0:
                    model.addBox(0.43, 0.45, 0.93, 0.55, 0.7, 1, 42, 0);
                    break;
                case 1:
                    model.addBox(0.44, 0.45, 0, 0.57, 0.7, 0.07, 42, 0);
                    break;
                case 2:
                    model.addBox(0.93, 0.45, 0.45, 1, 0.7, 0.55, 42, 0);
                    break;
                case 3:
                    model.addBox(0, 0.45, 0.44, 0.07, 0.7, 0.55, 42, 0);
                    break;
            }
            render.addEntry(model);
        }
        Block.setBlockShape(blockID, { x: 0.07, y: 0, z: 0.07 }, { x: 0.93, y: 0.87, z: 0.93 });
    };
    return ChestManager;
}());
var ItemUtils = /** @class */ (function () {
    function ItemUtils() {
    }
    ItemUtils.addStaticTooltip = function (id, tooltip) {
        Item.registerNameOverrideFunction(id, function (item, name) {
            return "".concat(name, "\n\u00A77").concat(Translation.translate(tooltip));
        });
    };
    ItemUtils.addContainsTooltip = function (id, provider) {
        Item.registerNameOverrideFunction(id, function (item, name) {
            var container = provider(item);
            if (!container) {
                return name;
            }
            var tooltip = "";
            for (var slotName in container.slots) {
                var containedItem = container.getSlot(slotName);
                if (containedItem.count > 0) {
                    var itemName = Translation.translate(Item.getName(containedItem.id, containedItem.data));
                    tooltip += "\n\u00A77".concat(itemName, " x").concat(containedItem.count);
                }
            }
            return name + tooltip;
        });
    };
    return ItemUtils;
}());
var PlayerUtils = /** @class */ (function () {
    function PlayerUtils() {
    }
    PlayerUtils.decreaseCarriedItem = function (player, count) {
        if (count === void 0) { count = 1; }
        var actor = new PlayerActor(player);
        var slotId = actor.getSelectedSlot();
        var slot = actor.getInventorySlot(slotId);
        if (slot.count > count) {
            actor.setInventorySlot(slotId, slot.id, slot.count - count, slot.data, null);
        }
        else {
            actor.setInventorySlot(slotId, 0, 0, 0, null);
        }
    };
    return PlayerUtils;
}());
setLoadingTip("Core Module Loading...");
Block.setPrototype("humus", {
    type: Block.TYPE_BASE,
    getVariations: function () {
        return [
            { name: "Humus", texture: [["humus", 0]], inCreative: true },
        ];
    },
    getMaterial: function (a) {
        return "dirt";
    },
    getDrop: function () {
        return [[3, 1, 0]];
    }
});
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: BlockID.humus, count: 8, data: 0 }, [
        "ddd",
        "dmd",
        "ddd"
    ], ['d', 3, 0, 'm', ItemID.mulch, 0]);
    Recipes.addShaped({ id: BlockID.humus, count: 8, data: 0 }, [
        "ddd",
        "dmd",
        "ddd"
    ], ['d', 3, 0, 'm', ItemID.fertilizerBio, 0]);
});
Block.setPrototype("bog", {
    type: Block.TYPE_BASE,
    getVariations: function () {
        return [
            { name: "Bog Earth", texture: [["bog", 0]], inCreative: true },
        ];
    }
});
ToolAPI.registerBlockMaterial(BlockID.bog, "dirt");
Block.setPrototype("blockPeat", {
    type: Block.TYPE_BASE,
    getVariations: function () {
        return [
            { name: "Peat", texture: [["blockPeat", 0]], inCreative: true },
        ];
    },
    getDrop: function () {
        return [[ItemID.peat, 2, 0], [3, 1, 0]];
    }
});
ToolAPI.registerBlockMaterial(BlockID.blockPeat, "dirt");
IDRegistry.genItemID("peat");
Item.createItem("peat", "Peat", { name: "peat", meta: 0 }, {});
IDRegistry.genItemID("bituminousPeat");
Item.createItem("bituminousPeat", "Bituminous Peat", { name: "bituminousPeat", meta: 0 }, {});
Callback.addCallback("PostLoaded", function () {
    Recipes.addFurnace(ItemID.peat, ItemID.ash, 0);
    Recipes.addFurnaceFuel(ItemID.peat, 0, 2000);
    Recipes.addFurnaceFuel(ItemID.bituminousPeat, 0, 4200);
    Recipes.addShaped({ id: ItemID.bituminousPeat, count: 1, data: 0 }, [
        " a ",
        "pgp",
        " a "
    ], ['a', ItemID.ash, 0, 'g', ItemID.propolis, 0, 'p', ItemID.peat, 0]);
    for (var key in LiquidRegistry.FullByEmpty) {
        if (key.split(":")[2] === "water") {
            var obj = LiquidRegistry.FullByEmpty[key];
            Recipes.addShaped({ id: BlockID.bog, count: 8, data: 0 }, [
                "dsd",
                "scs",
                "dsd"
            ], ['d', 3, 0, 's', 12, 0, 'c', obj.id, obj.data]);
        }
    }
});
TileEntity.registerPrototype(BlockID.bog, {
    useNetworkItemContainer: true,
    defaultValues: {
        maturity: 0
    },
    increaseMaturity: function () {
        if (!this.isMoistened()) {
            return;
        }
        this.data.maturity++;
        if (this.data.maturity >= 3) {
            this.blockSource.setBlock(this.x, this.y, this.z, BlockID.blockPeat, 0);
        }
    },
    isMoistened: function () {
        for (var xx = this.x - 1; xx <= this.x + 1; xx++) {
            for (var zz = this.z - 1; zz <= this.z + 1; zz++) {
                var blockId = this.blockSource.getBlockId(xx, this.y, zz);
                if (blockId === 8 || blockId === 9) {
                    return true;
                }
            }
        }
        return false;
    }
});
Block.setRandomTickCallback(BlockID.bog, function (x, y, z, id, data, blockSource) {
    var tile = World.getTileEntity(x, y, z, blockSource);
    if (tile === null)
        tile = TileEntity.addTileEntity(x, y, z, blockSource);
    tile.increaseMaturity();
});
IDRegistry.genBlockID("oreCopper");
Block.createBlock("oreCopper", [
    { name: "Copper Ore", texture: [["oreCopper", 0]], inCreative: true }
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.oreCopper, "stone", 1, true);
Block.setDestroyTime(BlockID.oreCopper, 1);
Block.setDestroyLevel("oreCopper", 2);
IDRegistry.genBlockID("oreTin");
Block.createBlock("oreTin", [
    { name: "Tin Ore", texture: [["oreTin", 0]], inCreative: true }
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.oreTin, "stone", 1, true);
Block.setDestroyTime(BlockID.oreTin, 1);
Block.setDestroyLevel("oreTin", 2);
IDRegistry.genBlockID("oreApatite");
Block.createBlock("oreApatite", [
    { name: "Apatite Ore", texture: [["oreApatite", 0]], inCreative: true }
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.oreApatite, "stone", 1, true);
Block.setDestroyTime(BlockID.oreApatite, 1);
Block.setDestroyLevel("oreApatite", 2);
Item.addCreativeGroup(GROUP_ORES, GROUP_ORES_NAME, [BlockID.oreCopper, BlockID.oreTin, BlockID.oreApatite]);
Block.registerDropFunction("oreApatite", function (coords, id, data, diggingLevel) {
    if (diggingLevel > 1) {
        ToolAPI.dropOreExp(coords, 1, 4, 1);
        return [[ItemID.apatite, 1 + Math.random() * 5, 0]];
    }
    return [];
});
Callback.addCallback("PostLoaded", function () {
    Recipes.addFurnace(BlockID.oreCopper, ItemID.ingotCopper, 0);
    Recipes.addFurnace(BlockID.oreTin, ItemID.ingotTin, 0);
});
function generateOre(blockId, chunkX, chunkZ, inChunk, size, minY, maxY, biomes) {
    for (var i = 0; i < inChunk; i++) {
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, minY, maxY);
        if (!biomes || biomes.indexOf(World.getBiome(coords.x, coords.z)) > -1) {
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, blockId, 0, Util.random(1, size));
        }
    }
}
if (ForestryConfig.genCopper) {
    Flags.addUniqueAction("oreGenCopper", function () {
        Callback.addCallback("GenerateChunk", function (chunkX, chunkZ) {
            generateOre(BlockID.oreCopper, chunkX, chunkZ, ForestryConfig.genCopperInChunk, ForestryConfig.genCopperSize, ForestryConfig.genCopperMinY, ForestryConfig.genCopperMaxY);
        });
    });
}
if (ForestryConfig.genTin) {
    Flags.addUniqueAction("oreGenTin", function () {
        Callback.addCallback("GenerateChunk", function (chunkX, chunkZ) {
            generateOre(BlockID.oreTin, chunkX, chunkZ, ForestryConfig.genTinInChunk, ForestryConfig.genTinSize, ForestryConfig.genTinMinY, ForestryConfig.genTinMaxY);
        });
    });
}
if (ForestryConfig.genApatite) {
    Flags.addUniqueAction("oreGenApatite", function () {
        Callback.addCallback("GenerateChunk", function (chunkX, chunkZ) {
            if (Math.random() < 0.8)
                generateOre(BlockID.oreApatite, chunkX, chunkZ, 1, ForestryConfig.genApatiteSize, ForestryConfig.genApatiteMinY, ForestryConfig.genApatiteMaxY, APATITE_GEN_BIOMES);
        });
    });
}
Block.setPrototype("blockCharcoal", {
    type: Block.TYPE_BASE,
    getVariations: function () {
        return [
            {
                name: "Block of Charcoal",
                texture: [["block_charcoal", 0]],
                inCreative: true
            }
        ];
    }
});
Block.setBlockMaterial(BlockID.blockCharcoal, "stone", 1);
Block.setPrototype("blockAsh", {
    type: Block.TYPE_BASE,
    getVariations: function () {
        return [
            {
                name: "Ash Block",
                texture: [["block_ash", 0]],
                inCreative: true
            }
        ];
    }
});
Block.setBlockMaterial(BlockID.blockAsh, "dirt", 1);
Block.setPrototype("ashBricks", {
    type: Block.TYPE_BASE,
    getVariations: function () {
        return [
            {
                name: "Ash Bricks",
                texture: [["brick_ash", 0]],
                inCreative: true
            }
        ];
    }
});
Block.setBlockMaterial(BlockID.ashBricks, "stone", 1);
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: BlockID.blockAsh, count: 1, data: 0 }, [
        "iii",
        "iii",
        "iii"
    ], ['i', ItemID.ash, 0]);
    Recipes.addShapeless({ id: ItemID.ash, count: 9, data: 0 }, [{ id: BlockID.blockAsh, data: 0 }]);
    Recipes.addShaped({ id: BlockID.ashBricks, count: 1, data: 0 }, [
        "A#A",
        "# #",
        "A#A",
    ], ['A', ItemID.ash, 0, '#', 336, 0]);
    Recipes.addShaped({ id: BlockID.blockCharcoal, count: 1, data: 0 }, [
        "iii",
        "iii",
        "iii"
    ], ['i', 263, 1]);
    Recipes.addShapeless({ id: 263, count: 9, data: 1 }, [{ id: BlockID.blockCharcoal, data: 0 }]);
});
if (ForestryConfig.oresBlocksEnabled) {
    Block.setPrototype("blockCopper", {
        type: Block.TYPE_BASE,
        getVariations: function () {
            return [
                {
                    name: "Block of Copper",
                    texture: [["block_copper", 0]],
                    inCreative: true
                }
            ];
        }
    });
    Block.setBlockMaterial(BlockID.blockCopper, "stone", 1);
    Block.setPrototype("blockTin", {
        type: Block.TYPE_BASE,
        getVariations: function () {
            return [
                {
                    name: "Block of Tin",
                    texture: [["block_tin", 0]],
                    inCreative: true
                }
            ];
        }
    });
    Block.setBlockMaterial(BlockID.blockTin, "stone", 1);
    Block.setPrototype("blockBronze", {
        type: Block.TYPE_BASE,
        getVariations: function () {
            return [
                {
                    name: "Block of Bronze",
                    texture: [["block_bronze", 0]],
                    inCreative: true
                }
            ];
        }
    });
    Block.setBlockMaterial(BlockID.blockBronze, "stone", 1);
    Block.setPrototype("blockApatite", {
        type: Block.TYPE_BASE,
        getVariations: function () {
            return [
                {
                    name: "Block of Apatite",
                    texture: [["block_apatite", 0]],
                    inCreative: true
                }
            ];
        }
    });
    Block.setBlockMaterial(BlockID.blockApatite, "stone", 1);
    Item.addCreativeGroup(GROUP_ORE_BLOCKS, GROUP_ORE_BLOCKS_NAME, [BlockID.blockCopper, BlockID.blockTin, BlockID.blockBronze, BlockID.blockApatite]);
    Callback.addCallback("PostLoaded", function () {
        Recipes.addShaped({ id: BlockID.blockCopper, count: 1, data: 0 }, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.ingotCopper, 0]);
        Recipes.addShaped({ id: BlockID.blockTin, count: 1, data: 0 }, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.ingotTin, 0]);
        Recipes.addShaped({ id: BlockID.blockBronze, count: 1, data: 0 }, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.ingotBronze, 0]);
        Recipes.addShaped({ id: BlockID.blockApatite, count: 1, data: 0 }, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.apatite, 0]);
        Recipes.addShapeless({ id: ItemID.ingotCopper, count: 9, data: 0 }, [{ id: BlockID.blockCopper, data: 0 }]);
        Recipes.addShapeless({ id: ItemID.ingotTin, count: 9, data: 0 }, [{ id: BlockID.blockTin, data: 0 }]);
        Recipes.addShapeless({ id: ItemID.ingotBronze, count: 9, data: 0 }, [{ id: BlockID.blockBronze, data: 0 }]);
        Recipes.addShapeless({ id: ItemID.apatite, count: 9, data: 0 }, [{ id: BlockID.blockApatite, data: 0 }]);
    });
}
IDRegistry.genItemID("ingotCopper");
Item.createItem("ingotCopper", "Copper Ingot", { name: "ingotCopper", meta: 0 }, {});
IDRegistry.genItemID("ingotTin");
Item.createItem("ingotTin", "Tin Ingot", { name: "ingotTin", meta: 0 }, {});
IDRegistry.genItemID("ingotBronze");
Item.createItem("ingotBronze", "Bronze Ingot", { name: "ingotBronze", meta: 0 }, {});
IDRegistry.genItemID("apatite");
Item.createItem("apatite", "Apatite", { name: "apatite", meta: 0 }, {});
Item.addCreativeGroup(GROUP_INGOTS, GROUP_INGOTS_NAME, [ItemID.ingotCopper, ItemID.ingotTin, ItemID.ingotBronze]);
if (ForestryConfig.recipeBronzeIngot) {
    Callback.addCallback("PostLoaded", function () {
        Recipes.addShapeless({ id: ItemID.ingotBronze, count: 4, data: 0 }, [{
                id: ItemID.ingotCopper,
                data: 0
            }, { id: ItemID.ingotCopper, data: 0 }, { id: ItemID.ingotCopper, data: 0 }, { id: ItemID.ingotTin, data: 0 }]);
    });
}
ToolAPI.addToolMaterial("bronze", { durability: 201, level: 3, efficiency: 6, damage: 0, enchantability: 0 });
ToolAPI.addToolMaterial("scoop", { durability: 10, level: 4, efficiency: 12, damage: 0, enchantability: 0 });
ToolType.scoop = {
    blockTypes: ["beehive"]
};
IDRegistry.genItemID("kitPickaxe");
Item.createItem("kitPickaxe", "Pickaxe Kit", { name: "kitPickaxe", meta: 0 }, { stack: 24 });
IDRegistry.genItemID("kitShovel");
Item.createItem("kitShovel", "Shovel Kit", { name: "kitShovel", meta: 0 }, { stack: 24 });
IDRegistry.genItemID("brokenBronzePickaxe");
Item.createItem("brokenBronzePickaxe", "Broken Pickaxe", { name: "brokenBronzePickaxe", meta: 0 }, { stack: 1 });
IDRegistry.genItemID("brokenBronzeShovel");
Item.createItem("brokenBronzeShovel", "Broken Shovel", { name: "brokenBronzeShovel", meta: 0 }, { stack: 1 });
IDRegistry.genItemID("forestryBronzePickaxe");
Item.createItem("forestryBronzePickaxe", "Survivalist's Pickaxe", { name: "forestryBronzePickaxe", meta: 0 }, { stack: 1 });
ToolAPI.setTool(ItemID.forestryBronzePickaxe, "bronze", ToolType.pickaxe, ItemID.brokenBronzePickaxe);
IDRegistry.genItemID("forestryBronzeShovel");
Item.createItem("forestryBronzeShovel", "Survivalist's Shovel", { name: "forestryBronzeShovel", meta: 0 }, { stack: 1 });
ToolAPI.setTool(ItemID.forestryBronzeShovel, "bronze", ToolType.shovel, ItemID.brokenBronzeShovel);
IDRegistry.genItemID("scoop");
Item.createItem("scoop", "Scoop", { name: "scoop", meta: 0 }, { stack: 1 });
ToolAPI.setTool(ItemID.scoop, "scoop", ToolType.scoop);
function crateUseKitCallback(itemId) {
    return function (coords, item, block, player) {
        var blockSource = BlockSource.getDefaultForActor(player);
        if (blockSource) {
            var relative = coords.relative;
            blockSource.spawnDroppedItem(relative.x + 0.5, relative.y + 0.1, relative.z + 0.5, itemId, 1, 0);
            PlayerUtils.decreaseCarriedItem(player);
        }
    };
}
Item.registerUseFunction("kitPickaxe", crateUseKitCallback(ItemID.forestryBronzePickaxe));
Item.registerUseFunction("kitShovel", crateUseKitCallback(ItemID.forestryBronzeShovel));
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: ItemID.scoop, count: 1, data: 0 }, [
        "sws",
        "sss",
        " s "
    ], ['w', 35, -1, 's', 280, -1]);
    Recipes.addShaped({ id: ItemID.forestryBronzePickaxe, count: 1, data: 0 }, [
        " s ",
        " s ",
        "bbb"
    ], ['s', 280, 0, 'b', ItemID.ingotBronze, 0]);
    Recipes.addShaped({ id: ItemID.forestryBronzeShovel, count: 1, data: 0 }, [
        "s",
        "s",
        "b"
    ], ['s', 280, 0, 'b', ItemID.ingotBronze, 0]);
    Recipes.addShaped({ id: ItemID.kitPickaxe, count: 1, data: 0 }, [
        "pc",
    ], ['p', ItemID.forestryBronzePickaxe, 0, 'c', ItemID.carton, -1]);
    Recipes.addShaped({ id: ItemID.kitShovel, count: 1, data: 0 }, [
        "pc",
    ], ['p', ItemID.forestryBronzeShovel, 0, 'c', ItemID.carton, -1]);
});
IDRegistry.genItemID("fertilizerBio");
Item.createItem("fertilizerBio", "Compost", { name: "fertilizerBio", meta: 0 }, {});
IDRegistry.genItemID("mouldyWheat");
Item.createItem("mouldyWheat", "Mouldy Wheat", { name: "mouldyWheat", meta: 0 }, {});
IDRegistry.genItemID("decayingWheat");
Item.createItem("decayingWheat", "Decaying Wheat", { name: "decayingWheat", meta: 0 }, {});
IDRegistry.genItemID("mulch");
Item.createItem("mulch", "Mulch", { name: "mulch", meta: 0 }, {});
IDRegistry.genItemID("woodPulp");
Item.createItem("woodPulp", "Wood Pulp", { name: "woodPulp", meta: 0 }, {});
IDRegistry.genItemID("carton");
Item.createItem("carton", "Carton", { name: "carton", meta: 0 }, {});
IDRegistry.genItemID("fertilizerCompound");
Item.createItem("fertilizerCompound", "Fertilizer", { name: "fertilizerCompound", meta: 0 }, {});
IDRegistry.genItemID("ash");
Item.createItem("ash", "Ash", { name: "ash", meta: 0 }, {});
IDRegistry.genItemID("iodineCapsule");
Item.createItem("iodineCapsule", "Iodine Capsule", { name: "iodineCapsule", meta: 0 }, {});
ItemUtils.addStaticTooltip(ItemID.iodineCapsule, "item.iodine_capsule.tooltip");
IDRegistry.genItemID("dissipationCharge");
Item.createItem("dissipationCharge", "Dissipation Charge", { name: "dissipationCharge", meta: 0 }, {});
ItemUtils.addStaticTooltip(ItemID.dissipationCharge, "item.dissipation_charge.tooltip");
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: ItemID.fertilizerBio, count: 4, data: 0 }, [
        " w ",
        "wdw",
        " w "
    ], ['w', 296, -1, 'd', 3, -1]);
    Recipes.addShaped({ id: ItemID.fertilizerBio, count: 1, data: 0 }, [
        " w ",
        "wdw",
        " w "
    ], ['w', ItemID.ash, -1, 'd', 3, -1]);
    Recipes.addShaped({ id: ItemID.fertilizerCompound, count: 8, data: 0 }, [
        " s ",
        " w ",
        " s "
    ], ['w', ItemID.apatite, -1, 's', 12, -1]);
    Recipes.addShaped({ id: ItemID.fertilizerCompound, count: 16, data: 0 }, [
        "sss",
        "sws",
        "sss"
    ], ['w', ItemID.apatite, -1, 's', ItemID.ash, -1]);
    Recipes.addFurnace(263, ItemID.ash, 0);
});
IDRegistry.genItemID("debugForestryClimate");
Item.createItem("debugForestryClimate", "forestry.item.debug_climate", { name: "stick" });
Item.setGlint(ItemID.debugForestryClimate, true);
Item.setToolRender(ItemID.debugForestryClimate, true);
Item.registerUseFunction("debugForestryClimate", function (_a, item, block, player) {
    var x = _a.x, y = _a.y, z = _a.z;
    var blockSource = BlockSource.getDefaultForActor(player);
    if (!blockSource) {
        return;
    }
    var biomeId = blockSource.getBiome(x, z);
    var temperature = Habitat.localizeTemperature(Habitat.getTemperatureAt(blockSource, x, y, z));
    var humidity = Habitat.localizeHumidity(Habitat.getHumidityAt(blockSource, x, y, z));
    var splitter = "-".repeat(10);
    Debug.message(splitter);
    Debug.message("BiomeID: ".concat(biomeId));
    Debug.message("DimensionId: ".concat(blockSource.getDimension()));
    Debug.message("Humidity: ".concat(humidity, " / ").concat(blockSource.getBiomeDownfallAt(x, y, z).toFixed(2)));
    Debug.message("Temperature: ".concat(temperature, " / ").concat(blockSource.getBiomeTemperatureAt(x, y, z).toFixed(2)));
    Debug.message(splitter);
});
LiquidRegistry.registerLiquid("appleJuice", "Juice", ["forestry.liquids.juice_16x58"]);
LiquidRegistry.registerLiquid("honey", "Honey", ["forestry.liquids.honey_16x58"]);
LiquidRegistry.registerLiquid("seedOil", "Seed Oil", ["forestry.liquids.seedOil_16x58"]);
LiquidRegistry.registerLiquid("biomass", "Biomass", ["forestry.liquids.biomass_16x58"]);
LiquidRegistry.registerLiquid("ethanol", "Ethanol", ["forestry.liquids.ethanol_16x58"]);
LiquidRegistry.registerLiquid("forestryGlass", "Glass", ["forestry.liquids.glass_16x16"]);
//Ores
Translation.addTranslation("Apatite Ore", { ru: "Апатитовая руда", pt: "minério de apatite" });
Translation.addTranslation("Copper Ore", { ru: "Медная руда", pt: "minério de cobre" });
Translation.addTranslation("Tin Ore", { ru: "Оловянная руда", pt: "minério de estanho" });
//Ingots
Translation.addTranslation("Copper Ingot", { ru: "Медный слиток", pt: "barra de cobre" });
Translation.addTranslation("Tin Ingot", { ru: "Оловянный слиток", pt: "barra de estanho" });
Translation.addTranslation("Bronze Ingot", { ru: "Бронзовый слиток", pt: "barra de bronze" });
//Storage
Translation.addTranslation("Block of Charcoal", { ru: "Блок угля", pt: "bloco de carvão vegetal" });
Translation.addTranslation("Ash Block", { ru: "Кучка золы", pt: "bloco de cinza" });
Translation.addTranslation("Ash Bricks", { ru: "Кирпичи из золы", pt: "tijolos de cinz" });
Translation.addTranslation("Block of Apatite", { ru: "Апатитовый блок", pt: "bloco de apatite" });
//Other
Translation.addTranslation("Ash", { ru: "Пепел", pt: "cinza" });
Translation.addTranslation("Mulch", { ru: "Мульча", pt: "adubo" });
Translation.addTranslation("Wood Pulp", { ru: "Древесная масса", pt: "polpa de madeira" });
Translation.addTranslation("Carton", { ru: "Картон", pt: "cartão" });
Translation.addTranslation("Pickaxe Kit", { ru: "Сборная кирка", pt: "conjunto de picareta" });
Translation.addTranslation("Shovel Kit", { ru: "Сборная лопата", pt: "conjunto de pá" });
Translation.addTranslation("Fertilizer", { ru: "Минеральное удобрение", pt: "fertilizador" });
Translation.addTranslation("Apatite", { ru: "Апатит", pt: "apatite" });
Translation.addTranslation("Mouldy Wheat", { ru: "Плесневелая пшеница", pt: "trigo mofado" });
Translation.addTranslation("Decaying Wheat", { ru: "Загнивающая пшеница", pt: "trigo em decomposição" });
Translation.addTranslation("Bog Earth", { ru: "Болотная земля", pt: "terra pantanosa" });
Translation.addTranslation("Humus", { ru: "Гумус", pt: "húmus" });
Translation.addTranslation("Peat", { ru: "Торф", pt: "turfa" });
Translation.addTranslation("Bituminous Peat", { ru: "Смолистый торф", pt: "turfa betuminosa" });
Translation.addTranslation("Compost", { ru: "Компост", pt: "composto" });
Translation.addTranslation("Survivalist's Pickaxe", { ru: "Кирка выживающего", pt: "picareta de sobrevivente" });
Translation.addTranslation("Survivalist's Shovel", { ru: "Лопата выживающего", pt: "pá de sobrevivente" });
Translation.addTranslation("Broken Pickaxe", { ru: "Сломанная кирка", pt: "picareta quebrada" });
Translation.addTranslation("Broken Shovel", { ru: "Сломанная лопата", pt: "pá quebrada" });
Translation.addTranslation("Iodine Capsule", { ru: "Капсула с йодом" });
Translation.addTranslation("item.iodine_capsule.tooltip", {
    en: "Use on a Rainmaker to make it rain.",
    ru: "Используйте на вызывателе дождя, чтобы вызвать дождь.",
    pt: "Use no rainmaker para chover."
});
Translation.addTranslation("Dissipation Charge", { ru: "Рассеивающий заряд" });
Translation.addTranslation("item.dissipation_charge.tooltip", {
    en: "Use on a Rainmaker to stop the rain.",
    ru: "Используйте на вызывателе дождя, чтобы прекратить дождь.",
    pt: "Use no rainmaker para parar a chuva."
});
Translation.addTranslation("forestry.item.debug_climate", {
    ru: "Палка для отладки (Среда обитания)",
    en: "Debug Stick (Habitat)"
});
setLoadingTip("Apiculture Module Loading...");
/**
 * @param {string} type
 * @param {number} princessID
 * @param {number} droneID
 * @param {number} queenID
 * @param {Array} flowers
 * @param {number} humidity
 * @param {number} climate
 * @constructor
 */
function BeeType(type, princessID, droneID, queenID, flowers, humidity, climate) {
    this.chromosomes_list = {};
    this.type = type;
    this.princessID = princessID;
    this.droneID = droneID;
    this.queenID = queenID;
    this.dominant = false;
    this.produce = [];
    this.specialty = [];
    this.flowers = flowers;
    this.humidity = humidity;
    this.climate = climate;
    this.isValidTemperature = function (temperature) {
        return Habitat.isWithinLimit(temperature, this.climate, this.getChromosome("TEMPERATURE_TOLERANCE"));
    };
    this.isValidHumidity = function (humidity) {
        return Habitat.isWithinLimit(humidity, this.humidity, this.getChromosome("HUMIDITY_TOLERANCE"));
    };
    this.getChromosome = function (name) {
        return (typeof this.chromosomes_list[name] !== "undefined" && this.chromosomes_list[name] !== null) ? this.chromosomes_list[name] : BeeRegistry.chromosomes_list[name];
    };
}
var ApiaryRegistry = /** @class */ (function () {
    function ApiaryRegistry() {
    }
    ApiaryRegistry.register = function (id) {
        this.blockIDs.push(id);
        Item.addCreativeGroup(GROUP_ALVEARY, GROUP_ALVEARY_NAME, [id]);
    };
    ApiaryRegistry.isApiaryComponent = function (id) {
        return this.blockIDs.indexOf(id) > -1;
    };
    ApiaryRegistry.addAllSlabs = function () {
        var e_2, _a;
        var ids = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            ids[_i] = arguments[_i];
        }
        try {
            for (var ids_1 = __values(ids), ids_1_1 = ids_1.next(); !ids_1_1.done; ids_1_1 = ids_1.next()) {
                var id = ids_1_1.value;
                this.slabIDs.push(id);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (ids_1_1 && !ids_1_1.done && (_a = ids_1.return)) _a.call(ids_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    ApiaryRegistry.isValidStructure = function (blockSource, x, y, z) {
        for (var xx = 0; xx < 3; xx++) {
            for (var yy = 0; yy < 3; yy++) {
                for (var zz = 0; zz < 3; zz++) {
                    var block = blockSource.getBlockId(xx + x, yy + y, zz + z);
                    if (!this.isApiaryComponent(block)) {
                        return false;
                    }
                }
            }
        }
        for (var xx = 0; xx < 3; xx++) {
            for (var zz = 0; zz < 3; zz++) {
                var block = blockSource.getBlockId(xx + x, y + 3, zz + z);
                if (this.slabIDs.indexOf(block) == -1) {
                    return false;
                }
            }
        }
        return true;
    };
    ApiaryRegistry.blockIDs = [];
    ApiaryRegistry.slabIDs = [];
    return ApiaryRegistry;
}());
ApiaryRegistry.addAllSlabs(VanillaTileID.blackstone_slab, VanillaTileID.crimson_slab, VanillaTileID.polished_blackstone_brick_slab, VanillaTileID.polished_blackstone_slab, VanillaTileID.stone_slab, VanillaTileID.stone_slab2, VanillaTileID.stone_slab3, VanillaTileID.stone_slab4, VanillaTileID.warped_slab, VanillaTileID.wooden_slab);
/**
 * @param species вид пчелы
 * @param beetype тип пчелы
 * @param save сохранять ли данные о ней
 * @param inactive_species неактивный вид
 * @constructor
 */
function Bee(species, beetype, save, inactive_species) {
    this.type = species;
    this.beetype = beetype;
    this.analyzed = false;
    this.unique = 0;
    this.active_chromosomes_list = {};
    this.inactive_chromosomes_list = {};
    this.pristine = true;
    this.generation = 0;
    /**
     * Добавляет пчелу в список сохранения
     * @type {Bee}
     */
    this.save = function () {
        if (this.isSaved())
            return;
        this.unique = BeeRegistry.getBeeNextUniqueID();
        BeeSaver.bees["b" + this.unique] = this;
    };
    /**
     * Возвращает продукцию пчелы
     * @return {Array}
     */
    this.getProduce = function () {
        var arr = this.getBeeType().produce;
        var arr2 = this.getInactiveBeeType().produce;
        for (var key in arr2) {
            if (arr2[key]) {
                var skip = false;
                for (var key2 in arr) {
                    if (arr[key2]) {
                        if (arr[key2][0] == arr2[key][0] && arr[key2][1] == arr2[key][1]) {
                            skip = true;
                        }
                    }
                }
                if (!skip) {
                    arr.push(arr2[key]);
                }
            }
        }
        return arr;
    };
    /**
     * @return {Array} Массив цветов для активного вида
     */
    this.getFlowers = function () {
        return this.getBeeType().flowers;
    };
    /**
     * @return {Array} Массив цветов для неактивного вида
     */
    this.getInactiveFlowers = function () {
        return this.getInactiveBeeType().flowers;
    };
    /**
     * @return {number} Необходимую влажность для активного вида
     */
    this.getHumidity = function () {
        return this.getBeeType().humidity;
    };
    /**
     * @return {number} Необходимую влажность для неактивного вида
     */
    this.getInactiveHumidity = function () {
        return this.getInactiveBeeType().humidity;
    };
    /**
     * @return {number} Необходимую температуру для активного вида
     */
    this.getClimate = function () {
        return this.getBeeType().climate;
    };
    /**
     * @return {number} Необходимую температуру для неактивного вида
     */
    this.getInactiveClimate = function () {
        return this.getInactiveBeeType().climate;
    };
    /**
     * @return {number} Устойчивость к температуре для активного вида
     */
    this.getClimateTolValue = function () {
        return BeeRegistry.getToleranceValue(this.getActiveChromosome("TEMPERATURE_TOLERANCE"));
    };
    /**
     * @return {number} Устойчивость к температуре для неактивного вида
     */
    this.getInactiveClimateTolValue = function () {
        return BeeRegistry.getToleranceValue(this.getInactiveChromosome("TEMPERATURE_TOLERANCE"));
    };
    /**
     * @return {number} Устойчивость к влажности для активного вида
     */
    this.getHumidityTolValue = function () {
        return BeeRegistry.getToleranceValue(this.getActiveChromosome("HUMIDITY_TOLERANCE"));
    };
    /**
     * @return {number} Возвращает устойчивость к влажности для неактивного вида
     */
    this.getInactiveHumidityTolValue = function () {
        return BeeRegistry.getToleranceValue(this.getInactiveChromosome("HUMIDITY_TOLERANCE"));
    };
    /**
     * @return {BeeType} Тип пчелы для активного вида
     */
    this.getBeeType = function () {
        return BeeRegistry.getBeeByType(this.type);
    };
    /**
     * @return {BeeType} Тип пчелы для неактивного вида
     */
    this.getInactiveBeeType = function () {
        return BeeRegistry.getBeeByType(this.inactive_chromosomes_list["SPECIES"]);
    };
    /**
     * @return {Array} Спец. продукция
     */
    this.getSpecialty = function () {
        return this.getBeeType().specialty;
    };
    /**
     * @return {number} Сохраняются ли данные о пчеле
     */
    this.isSaved = function () {
        return this.unique !== 0;
    };
    /**
     * @param name Имя хромосомы
     * @return {*} Значение хромосомы для активного вида
     */
    this.getActiveChromosome = function (name) {
        return (typeof this.active_chromosomes_list[name] !== "undefined" && this.active_chromosomes_list[name] !== null) ? this.active_chromosomes_list[name] : BeeRegistry.bees[this.type].getChromosome(name);
    };
    /**
     * @param name Имя хромосомы
     * @return {*} Значение хромосомы для неактивного вида
     */
    this.getInactiveChromosome = function (name) {
        return (typeof this.inactive_chromosomes_list[name] !== "undefined" && this.inactive_chromosomes_list[name] !== null) ? this.inactive_chromosomes_list[name] : BeeRegistry.bees[this.inactive_chromosomes_list.SPECIES].getChromosome(name);
    };
    /**
     * @return {number} Продолжительность жизни(В циклах)
     */
    this.getMaxHealth = function () {
        return this.getActiveChromosome("LIFESPAN");
    };
    /**
     * @return {number}
     */
    this.getItemID = function () {
        switch (this.beetype) {
            case BeeRegistry.BEETYPE_QUEEN:
                return BeeRegistry.getQueenByType(this.type);
            case BeeRegistry.BEETYPE_DRONE:
                return BeeRegistry.getDroneByType(this.type);
            case BeeRegistry.BEETYPE_PRINCESS:
                return BeeRegistry.getPrincessByType(this.type);
        }
        throw new Error("Unknown bee type");
    };
    this.getSaveScope = function () {
        var scope = {};
        scope["type"] = this.type;
        scope["beetype"] = this.beetype;
        scope["analyzed"] = this.analyzed;
        scope["unique"] = this.unique;
        scope["active_chromosomes_list"] = this.active_chromosomes_list;
        scope["inactive_chromosomes_list"] = this.inactive_chromosomes_list;
        scope["pristine"] = this.pristine;
        scope["generation"] = this.generation;
        scope["health"] = this.health;
        if (this.mate) {
            scope["mate"] = this.mate;
        }
        return scope;
    };
    /**
     * Удаляет информацию о пчеле из сохранений
     */
    this.destroy = function () {
        if (!this.isSaved())
            return;
        delete BeeSaver.bees["b" + this.unique];
    };
    /**
     * @param value климат
     * @return {boolean} пригоден ли климат для пчелы
     */
    this.isValidClimate = function (value) {
        return Habitat.isWithinLimit(value, this.getBeeType().climate, this.getActiveChromosome("TEMPERATURE_TOLERANCE"));
    };
    /**
     * @param value влажность
     * @return {boolean} пригодна ли влажность для пчелы
     */
    this.isValidHumidity = function (value) {
        return Habitat.isWithinLimit(value, this.getBeeType().humidity, this.getActiveChromosome("HUMIDITY_TOLERANCE"));
    };
    if (species) {
        this.active_chromosomes_list["SPECIES"] = species;
        this.inactive_chromosomes_list["SPECIES"] = inactive_species ? inactive_species : species;
        if (save || typeof save === "undefined") {
            this.save();
        }
        this.health = this.getMaxHealth();
    }
}
var BeeEffects = /** @class */ (function () {
    function BeeEffects() {
    }
    BeeEffects.registerEffect = function (unique, effect) {
        this.effects[unique] = effect;
    };
    BeeEffects.getApiaristArmorWearValue = function (entity) {
        var count = 0;
        if (Entity.getArmorSlot(entity, 0).id === ItemID.helmetApiarist)
            count++;
        if (Entity.getArmorSlot(entity, 1).id === ItemID.chestApiarist)
            count++;
        if (Entity.getArmorSlot(entity, 2).id === ItemID.leggingsApiarist)
            count++;
        if (Entity.getArmorSlot(entity, 3).id === ItemID.bootsApiarist)
            count++;
        return count;
    };
    BeeEffects.doEffect = function (unique, beeHouse, blockSource, coords, range) {
        var _a;
        var effect = this.effects[unique];
        if (!effect) {
            return;
        }
        var requireWorking = (_a = effect.requireWorking) !== null && _a !== void 0 ? _a : true;
        var isWorking = !beeHouse.error && beeHouse.queen;
        if (requireWorking && !isWorking) {
            return;
        }
        if (isWorking) {
            var data = beeHouse.tile.data;
            var delay = data.delay || 0;
            if (delay >= effect.delay) {
                effect.doEffect(blockSource, coords, range, beeHouse);
                data.delay = 0;
            }
            else
                data.delay = delay + 1;
        }
    };
    BeeEffects.getLocalizedName = function (unique) {
        var effect = this.effects[unique];
        return Translation.translate((effect === null || effect === void 0 ? void 0 : effect.name) || "bees.effect.none");
    };
    BeeEffects.isDominant = function (unique) {
        var effect = this.effects[unique];
        return (effect === null || effect === void 0 ? void 0 : effect.isDominant) || false;
    };
    BeeEffects.effects = {};
    return BeeEffects;
}());
var BeeFrame = /** @class */ (function () {
    function BeeFrame() {
    }
    BeeFrame.registerFrame = function (obj) {
        if (!obj.codeName) {
            summonException("CodeName is undefined! (Frames Registration)");
            return;
        }
        if (!obj.localize) {
            summonException("Localize is undefined! (Frames Registration)");
            return;
        }
        if (!obj.durability) {
            summonException("Durability is undefined! (Frames Registration)");
            return;
        }
        if (!obj.modifier) {
            summonException("Modifier is undefined! (Frames Registration)");
            return;
        }
        if (!obj.texture) {
            obj.texture = {
                name: obj.codeName,
                meta: 0
            };
        }
        IDRegistry.genItemID(obj.codeName);
        Item.createItem(obj.codeName, obj.localize.en, obj.texture, { stack: 1 });
        Translation.addTranslation(obj.localize.en, obj.localize);
        Item.setToolRender(ItemID[obj.codeName], true);
        Item.setMaxDamage(ItemID[obj.codeName], obj.durability);
        this.frames[ItemID[obj.codeName]] = obj;
    };
    BeeFrame.isFrame = function (id) {
        return this.frames[id];
    };
    BeeFrame.frames = {};
    return BeeFrame;
}());
var BeeHouse = /** @class */ (function () {
    function BeeHouse(tile, slots, houseModifierList) {
        if (houseModifierList === void 0) { houseModifierList = ModifierList.EMPTY; }
        this.tile = tile;
        this.slots = slots;
        this.houseModifierList = houseModifierList;
        this.queen = null;
        this.error = null;
        this.data = tile.data;
    }
    BeeHouse.prototype.tick = function (modifiersList) {
        var slotPrincess = this.getPrincessSlot();
        var slotDrone = this.getDroneSlot();
        if (!this.data)
            this.data = this.tile.data;
        if (slotPrincess.count > 1) {
            this.tile.blockSource.spawnDroppedItem(this.tile.x, this.tile.y + 1, this.tile.z, slotPrincess.id, slotPrincess.count - 1, slotPrincess.data);
            this.tile.container.setSlot(this.slots.slotPrincess, slotPrincess.id, 1, slotPrincess.data);
        }
        if (BeeRegistry.getBeeTypeByID(slotPrincess.id) === BeeRegistry.BEETYPE_PRINCESS
            && BeeRegistry.getBeeTypeByID(slotDrone.id) === BeeRegistry.BEETYPE_DRONE) {
            this.tickBreeding();
        }
        else if (BeeRegistry.getBeeTypeByID(slotPrincess.id) === BeeRegistry.BEETYPE_QUEEN) {
            var queen = this.queen;
            if (!queen) {
                queen = BeeRegistry.getBeeFromItem(slotPrincess.id, slotPrincess.data);
                this.queen = queen;
            }
            BeeEffects.doEffect(queen.getActiveChromosome("EFFECT"), this, this.tile.blockSource, {
                x: this.tile.x,
                y: this.tile.y,
                z: this.tile.z
            }, BeeRegistry.rangeToObject(queen.getActiveChromosome("TERRITORY")));
            this.tickQueenWork(modifiersList);
        }
        else {
            this.data.progress = 0;
            this.data.progressMax = 0;
            this.queen = null;
            if (this.tile.data.delay) {
                this.tile.data.delay = 0;
            }
        }
        this.getContainer().validateAll();
    };
    BeeHouse.prototype.tickBreeding = function () {
        var slotPrincessName = this.slots.slotPrincess;
        var slotDroneName = this.slots.slotDrone;
        var slotPrincess = this.getPrincessSlot();
        var slotDrone = this.getDroneSlot();
        this.data.progress++;
        this.data.progressMax = BeeHouse.TOTAL_BREEDING_TIME;
        if (this.data.progress >= this.data.progressMax) {
            this.queen = BeeLogic.mate(BeeRegistry.getBeeFromItem(slotPrincess.id, slotPrincess.data), BeeRegistry.getBeeFromItem(slotDrone.id, slotDrone.data));
            var container = this.tile.container;
            container.setSlot(slotPrincessName, this.queen.getItemID(), 1, this.queen.unique);
            container.setSlot(slotDroneName, slotDrone.id, slotDrone.count - 1, slotDrone.data);
        }
    };
    BeeHouse.prototype.tickQueenWork = function (modifiersList) {
        if (!this.queen) {
            throw new Error("Queen is null");
        }
        if (World.getThreadTime() % 128 === 0) {
            var tileCoords = { x: this.tile.x, y: this.tile.y, z: this.tile.z };
            if (!BeeLogic.findFlowers(this.tile.blockSource, this.queen, tileCoords)) {
                this.error = Translation.translate("apiary.error.flowers");
            }
            else if (!this.queen.isValidClimate(this.getClimate())) {
                this.error = Translation.translate("apiary.error.climate");
            }
            else if (!this.queen.isValidHumidity(this.getHumidity())) {
                this.error = Translation.translate("apiary.error.humidity");
            }
            else if (this.tile.blockSource.getDimension() !== EDimension.NETHER
                && !this.canSeeSky()
                && !modifiersList.isSelfLighted(this)
                && !this.houseModifierList.isSelfLighted(this)
                && !this.queen.getActiveChromosome("CAVE_DWELLING")) {
                this.error = Translation.translate("apiary.error.sky");
            }
            else if (World.getWeather().rain > 0
                && !modifiersList.isSealed(this)
                && !this.houseModifierList.isSealed(this)
                && !this.queen.getActiveChromosome("TOLERATES_RAIN")) {
                this.error = Translation.translate("apiary.error.rain");
            }
            else if (!(World.getWorldTime() % 24000 >= 1000 && World.getWorldTime() % 24000 <= 13000)
                && !this.queen.getActiveChromosome("NEVER_SLEEPS")) {
                this.error = Translation.translate("apiary.error.night");
            }
            else {
                this.error = null;
            }
        }
        if (this.error)
            return;
        if (!this.data.progressMax)
            this.data.progressMax = this.queen.getMaxHealth() * BeeHouse.CYCLE_TIME;
        if (!this.queen.isSaved()) {
            // @ts-ignore
            this.queen.save();
            this.setSlot(this.slots.slotPrincess, { id: this.queen.getItemID(), data: this.queen.unique, count: 1 });
        }
        this.data.progress = this.queen.health * BeeHouse.CYCLE_TIME;
        this.data.progressCycle++;
        if (this.data.progressCycle >= BeeHouse.CYCLE_TIME * modifiersList.getLifespanModifier(this) * this.houseModifierList.getLifespanModifier(this) * BM_LIFESPAN_MODIFIER) {
            this.queen.health--;
            this.data.progressCycle = 0;
            ContainerHelper.putInSlots(BeeLogic.produce(this.queen, modifiersList.getProductionModifier(this), this.houseModifierList.getProductionModifier(this)), this.getContainer(), this.slots.produceSlots);
            if (this.queen.health <= 0) {
                ContainerHelper.putInSlots(BeeRegistry.convertToItemArray(BeeLogic.spawnAll(this.queen, modifiersList, this.houseModifierList, this)), this.getContainer(), this.slots.slotDronesOut);
                this.setSlot(this.slots.slotPrincess, { id: 0, data: 0, count: 0 });
                Callback.invokeCallback("onQueenDeath", this);
                this.queen.destroy();
                this.queen = null;
            }
        }
        else {
            Callback.invokeCallback("onQueenCycle", this);
        }
    };
    ;
    BeeHouse.prototype.getPrincessSlot = function () {
        return this.getContainer().getSlot(this.slots.slotPrincess);
    };
    BeeHouse.prototype.getDroneSlot = function () {
        return this.getContainer().getSlot(this.slots.slotDrone);
    };
    BeeHouse.prototype.getHumidity = function () {
        return Habitat.getHumidityAt(this.tile.blockSource, this.tile.x, this.tile.y, this.tile.z);
    };
    BeeHouse.prototype.getClimate = function () {
        return Habitat.getTemperatureAt(this.tile.blockSource, this.tile.x, this.tile.y, this.tile.z);
    };
    BeeHouse.prototype.canSeeSky = function () {
        return this.tile.blockSource.canSeeSky(this.tile.x, this.tile.y + 1, this.tile.z);
    };
    BeeHouse.prototype.setSlot = function (name, item) {
        this.getContainer().setSlot(name, item.id, item.count, item.data);
    };
    ;
    BeeHouse.prototype.getContainer = function () {
        return this.tile.container;
    };
    BeeHouse.CYCLE_TIME = 550;
    BeeHouse.TOTAL_BREEDING_TIME = 100;
    return BeeHouse;
}());
var BeeLogic = {
    /**
     * Спаривает принцессу и дрона
     * @param {Bee} princess
     * @param {Bee} drone
     * @return {Bee} королева
     */
    mate: function (princess, drone) {
        var queen = new Bee(princess.type, BeeRegistry.BEETYPE_QUEEN);
        queen.active_chromosomes_list = princess.active_chromosomes_list;
        queen.inactive_chromosomes_list = princess.inactive_chromosomes_list;
        queen.mate = {
            type: drone.type,
            active_chromosomes_list: drone.active_chromosomes_list,
            inactive_chromosomes_list: drone.inactive_chromosomes_list
        };
        queen.generation = princess.generation;
        queen.pristine = princess.pristine || drone.pristine;
        return queen;
    },
    /**
     * @param {Bee} queen
     * @param {number} productionModifier Модификатор продукции
     * @param {number} houseModifier Модификатор продукции пасеки
     * @return {Array} Произведенная продукция
     */
    produce: function (queen, productionModifier, houseModifier) {
        var produce = queen.getProduce();
        var specialty = queen.getSpecialty();
        var speed = queen.getActiveChromosome("SPEED") * productionModifier * houseModifier * BM_SPEED_MODIFIER;
        var result = [];
        for (var key in produce) {
            if (Math.random() < produce[key][2] * speed) {
                result.push([produce[key][0], produce[key][1], 1]);
            }
        }
        for (var key2 in specialty) {
            if (Math.random() < specialty[key2][2] * speed) {
                result.push([specialty[key2][0], specialty[key2][1], 1]);
            }
        }
        return result;
    },
    /**
     * @param {Bee} bee
     * @param {Object} coords
     * @param {BlockSource} blockSource
     * @return {boolean} Найдены ли подходящие цветы для пчелы
     */
    findFlowers: function (blockSource, bee, coords) {
        var flowers = bee.getFlowers();
        var territory = BeeRegistry.rangeToObject(bee.getActiveChromosome("TERRITORY"));
        for (var xx = coords.x - territory.x; xx < coords.x + territory.x; xx++) {
            for (var yy = coords.y - territory.y; yy < coords.y + territory.y; yy++) {
                for (var zz = coords.z - territory.z; zz < coords.z + territory.z; zz++) {
                    var block = blockSource.getBlock(xx, yy, zz);
                    if (flowers.indexOf(block.id + ":" + block.data) > -1 || flowers.indexOf(block.id + ":-1") > -1) {
                        return true;
                    }
                }
            }
        }
        return false;
    },
    spawnAll: function (bee, modifierList, houseModifierList, house) {
        var arr = [];
        if (BM_CAN_FATIGUE) {
            if (!bee.pristine && bee.generation > 96 + Util.random(0, 6) + Util.random(0, 6) && Math.random() < 0.02 * houseModifierList.getGeneticDecay(house) * modifierList.getGeneticDecay(house))
                return [];
        }
        this.spawnPrincess(bee, modifierList, houseModifierList, house, arr);
        this.spawnDrones(bee, modifierList, houseModifierList, house, arr);
        return arr;
    },
    /**
     * Возвращает потомства(принцессы)
     * @param {Bee} bee королева
     * @param {ModifierList} modifierList
     * @param {ModifierList} houseModifierList
     * @param {BeeHouse} house
     * @return {Array}
     */
    spawnPrincess: function (bee, modifierList, houseModifierList, house, arr) {
        var count = Math.random() < ForestryConfig.secondPrincessChance ? 2 : 1;
        for (var i = 0; i < count; i++) {
            arr.push(this.createOffspring(bee, BeeRegistry.BEETYPE_PRINCESS, modifierList, houseModifierList, house));
        }
    },
    /**
     * Возвращает потомства(дроны)
     * @param {Bee} bee королева
     * @param {ModifierList} modifierList
     * @param {ModifierList} houseModifierList
     * @param {BeeHouse} house
     * @return {Array}
     */
    spawnDrones: function (bee, modifierList, houseModifierList, house, arr) {
        var toCreate = parseInt(bee.getActiveChromosome("FERTILITY"));
        if (BM_REDUCES_FERTILITY)
            toCreate = Util.random(1, toCreate);
        for (var i = 0; i < toCreate; i++) {
            arr.push(this.createOffspring(bee, BeeRegistry.BEETYPE_DRONE, modifierList, houseModifierList, house));
        }
    },
    createOffspring: function (bee, bee_type, modifierList, houseModifierList, house) {
        if (!bee.mate) {
            return null;
        }
        var species1 = bee.type;
        var species2 = bee.mate.type;
        var parent1in = null;
        var parent1act = null;
        var parent2in = null;
        var parent2act = null;
        var mutated1 = this.mutateSpecies(bee, bee.mate, modifierList, houseModifierList, house);
        if (mutated1) {
            species1 = mutated1.type;
            parent1in = mutated1.chromosomes;
            parent1act = mutated1.chromosomes;
        }
        else {
            parent1in = Util.objectUnion(BeeRegistry.chromosomes_list, BeeRegistry.getBeeByType(species1).chromosomes_list, bee.active_chromosomes_list);
            parent1act = Util.objectUnion(BeeRegistry.chromosomes_list, BeeRegistry.getBeeByType(species1).chromosomes_list, bee.inactive_chromosomes_list);
        }
        var mutated2 = this.mutateSpecies(bee, bee.mate, modifierList, houseModifierList, house);
        if (mutated2) {
            species2 = mutated2.type;
            parent2in = mutated2.chromosomes;
            parent2act = mutated2.chromosomes;
        }
        else {
            parent2in = Util.objectUnion(BeeRegistry.chromosomes_list, BeeRegistry.getBeeByType(species2).chromosomes_list, bee.mate.active_chromosomes_list);
            parent2act = Util.objectUnion(BeeRegistry.chromosomes_list, BeeRegistry.getBeeByType(species2).chromosomes_list, bee.mate.inactive_chromosomes_list);
        }
        var princess = new Bee(species1, bee_type, true, species2);
        for (var key in parent1act) {
            var ch = this.inheritChromosome({
                active: parent1act[key],
                inactive: parent1in[key]
            }, { active: parent2act[key], inactive: parent2in[key] });
            princess.active_chromosomes_list[key] = ch.active;
            princess.inactive_chromosomes_list[key] = ch.inactive;
            if (key === "SPECIES")
                princess.type = ch.active;
        }
        princess.generation = bee.generation;
        princess.generation++;
        princess.pristine = bee.pristine;
        return princess;
    },
    inheritChromosome: function (chromosomes1, chromosomes2) {
        var ch = null;
        if (Math.random() < 0.5) {
            ch = chromosomes1.active;
        }
        else {
            ch = chromosomes1.inactive;
        }
        var ch2 = null;
        if (Math.random() < 0.5) {
            ch2 = chromosomes2.active;
        }
        else {
            ch2 = chromosomes2.inactive;
        }
        if (Math.random() <= 0.5) {
            return { active: ch, inactive: ch2 };
        }
        else {
            return { active: ch2, inactive: ch };
        }
    },
    mutateSpecies: function (parent1, parent2, modifierList, houseModifierList, house) {
        var combinations = BeeRegistry.getMutations(parent1.type, parent2.type);
        for (var key in combinations) {
            if (Math.random() < combinations[key].chance * modifierList.getMutationModifier(house) * houseModifierList.getMutationModifier(house) * BM_MUTATION_MODIFIER && combinations[key].onMutate(house)) {
                var mut = BeeRegistry.getBeeByType(combinations[key].result);
                return { type: mut.type, chromosomes: Util.objectUnion(mut.chromosomes_list, { SPECIES: mut.type }) };
            }
        }
        return null;
    }
};
var BeeRegistry = {
    bees: {},
    FLOWERS_FLOWERS: ["Flowers", "38:-1", "37:-1", " 175:1", "175:4", " 175:5"],
    FLOWERS_WHEAT: ["Wheat", "59:0"],
    FLOWERS_NETHER: ["Nether", "115:0"],
    FLOWERS_ENDS: ["Ends", "122:0"],
    FLOWERS_CACTI: ["Cacti", "81:0"],
    FLOWERS_MUSHROOMS: ["Mushrooms", "39:0", "40:0"],
    FLOWERS_JUNGLE: ["Jungle", "106:-1", "175:2"],
    FLOWERS_GOURD: ["Gourd", "104:0", "105:0"],
    BEETYPE_NONE: -1,
    BEETYPE_PRINCESS: 0,
    BEETYPE_DRONE: 1,
    BEETYPE_QUEEN: 2,
    LIFESPAN_SHORTEST: 10,
    LIFESPAN_SHORTER: 20,
    LIFESPAN_SHORT: 30,
    LIFESPAN_SHORTENED: 35,
    LIFESPAN_NORMAL: 40,
    LIFESPAN_ELONGATED: 45,
    LIFESPAN_LONG: 50,
    LIFESPAN_LONGER: 60,
    LIFESPAN_LONGEST: 70,
    SPEED_FASTEST: 1.7,
    SPEED_FASTER: 1.4,
    SPEED_FAST: 1.2,
    SPEED_NORMAL: 1,
    SPEED_SLOW: 0.8,
    SPEED_SLOWER: 0.6,
    SPEED_SLOWEST: 0.3,
    TOLERANCE_BOTH_1: 1,
    TOLERANCE_BOTH_2: 2,
    TOLERANCE_BOTH_3: 3,
    TOLERANCE_BOTH_4: 4,
    TOLERANCE_BOTH_5: 5,
    TOLERANCE_UP_1: 6,
    TOLERANCE_UP_2: 7,
    TOLERANCE_UP_3: 8,
    TOLERANCE_UP_4: 9,
    TOLERANCE_UP_5: 10,
    TOLERANCE_DOWN_1: 11,
    TOLERANCE_DOWN_2: 12,
    TOLERANCE_DOWN_3: 13,
    TOLERANCE_DOWN_4: 14,
    TOLERANCE_DOWN_5: 15,
    TOLERANCE_NONE: 0,
    TOLERANCE_BOTH: 1,
    TOLERANCE_UP: 2,
    TOLERANCE_DOWN: 3,
    chromosomes_list: {},
    mutations: {},
    init: function () {
        this.chromosomes_list["SPEED"] = this.SPEED_SLOWEST;
        this.chromosomes_list["LIFESPAN"] = this.LIFESPAN_SHORTER;
        this.chromosomes_list["FERTILITY"] = 2;
        this.chromosomes_list["TEMPERATURE_TOLERANCE"] = this.TOLERANCE_NONE;
        this.chromosomes_list["NEVER_SLEEPS"] = false;
        this.chromosomes_list["HUMIDITY_TOLERANCE"] = this.TOLERANCE_NONE;
        this.chromosomes_list["TOLERATES_RAIN"] = false;
        this.chromosomes_list["CAVE_DWELLING"] = false;
        this.chromosomes_list["TERRITORY"] = "9x6x9";
        this.chromosomes_list["EFFECT"] = null;
    },
    getBeeFromScope: function (scope) {
        var bee = new Bee();
        for (var key in scope) {
            bee[key] = scope[key];
        }
        return bee;
    },
    rangeToObject: function (range) {
        return {
            x: parseInt(range.split("x")[0]),
            y: parseInt(range.split("x")[1]),
            z: parseInt(range.split("x")[2])
        };
    },
    convertToItemArray: function (bees) {
        var arr = [];
        for (var key in bees) {
            arr.push([bees[key].getItemID(), bees[key].unique, 1]);
        }
        return arr;
    },
    addMutation: function (arg) {
        if (!arg.species1) {
            summonException("Species1 is undefined! (Bee Mutation Registration)");
            return;
        }
        if (!arg.species2) {
            summonException("Species2 is undefined! (Bee Mutation Registration)");
            return;
        }
        if (!arg.chance) {
            summonException("Chance is undefined or equals zero! (Bee Mutation Registration)");
            return;
        }
        if (!arg.result) {
            summonException("Result is undefined! (Bee Mutation Registration)");
            return;
        }
        if (!arg.onMutate) {
            arg.onMutate = function () { return true; };
        }
        if (!this.mutations[arg.result]) {
            this.mutations[arg.result] = [];
        }
        this.mutations[arg.result].push(arg);
    },
    getMutations: function (species1, species2) {
        var muts = [];
        if (species2) {
            for (var key in this.mutations) {
                for (var key2 in this.mutations[key]) {
                    var mut = this.mutations[key][key2];
                    if ((mut.species1 === species1 && mut.species2 === species2) || (mut.species2 === species1 && mut.species1 === species2)) {
                        muts.push(mut);
                    }
                }
            }
        }
        else {
            for (var i in this.mutations) {
                var speciesMutations = this.mutations[i];
                for (var k in speciesMutations) {
                    var mutation = speciesMutations[k];
                    if (mutation.species1 === species1 || mutation.species2 === species1)
                        muts.push(mutation);
                }
            }
        }
        return muts;
    },
    getMutationsByResult: function (species) {
        return this.mutations[species];
    },
    getBeeNextUniqueID: function () {
        if (!BeeSaver.uniqueID) {
            BeeSaver.uniqueID = 0;
        }
        return ++BeeSaver.uniqueID;
    },
    getPrincessByType: function (type) {
        return ItemID["princess" + type];
    },
    getDroneByType: function (type) {
        return ItemID["drone" + type];
    },
    getQueenByType: function (type) {
        return ItemID["queen" + type];
    },
    getToleranceValue: function (value) {
        return value === 0 ? 0 : (value < 6 ? value : (value < 11 ? value - 5 : value - 10));
    },
    getTolerance: function (tol) {
        return tol === this.TOLERANCE_NONE ? 0 : (tol < 6 ? this.TOLERANCE_BOTH : (tol < 11 ? this.TOLERANCE_UP : this.TOLERANCE_DOWN));
    },
    registerBee: function (arg) {
        if (!arg.localize) {
            summonException("Localize is undefined! (Bee Registration)");
            return;
        }
        if (!arg.chromosomes) {
            summonException("Chromosomes is undefined! (Bee Registration)");
            return;
        }
        if (!arg.species) {
            summonException("Species is undefined! (Bee Registration)");
            return;
        }
        if (!arg.flowers) {
            arg.flowers = BeeRegistry.FLOWERS_FLOWERS;
        }
        if (!arg.humidity) {
            arg.humidity = Humidity.NORMAL;
        }
        if (!arg.climate) {
            arg.climate = Temperature.NORMAL;
        }
        if (!arg.dominant) {
            arg.dominant = false;
        }
        if (!arg.produce) {
            arg.produce = [];
        }
        if (!arg.specialty) {
            arg.specialty = [];
        }
        if (!arg.textures) {
            arg.textures = {
                princess: "princess" + arg.species,
                drone: "drone" + arg.species,
                queen: "queen" + arg.species
            };
        }
        if (!arg.textures.princess) {
            arg.textures.princess = "princess" + arg.species;
        }
        if (!arg.textures.drone) {
            arg.textures.drone = "drone" + arg.species;
        }
        if (!arg.textures.queen) {
            arg.textures.queen = "queen" + arg.species;
        }
        if (arg.mutations) {
            for (var key in arg.mutations) {
                arg.mutations[key]["result"] = arg.species;
                this.addMutation(arg.mutations[key]);
            }
        }
        IDRegistry.genItemID("princess" + arg.species);
        Item.createItem("princess" + arg.species, arg.localize.princess.en, {
            name: arg.textures.princess,
            meta: 0
        }, { stack: 1 });
        Translation.addTranslation(arg.localize.princess.en, arg.localize.princess);
        IDRegistry.genItemID("drone" + arg.species);
        Item.createItem("drone" + arg.species, arg.localize.drone.en, { name: arg.textures.drone, meta: 0 }, { stack: 1 });
        Translation.addTranslation(arg.localize.drone.en, arg.localize.drone);
        IDRegistry.genItemID("queen" + arg.species);
        Item.createItem("queen" + arg.species, arg.localize.queen.en, { name: arg.textures.queen, meta: 0 }, { stack: 1 });
        Translation.addTranslation(arg.localize.queen.en, arg.localize.queen);
        if (arg.hasGlint) {
            Item.setGlint(ItemID["princess" + arg.species], true);
            Item.setGlint(ItemID["drone" + arg.species], true);
            Item.setGlint(ItemID["queen" + arg.species], true);
        }
        var bee_type = new BeeType(arg.species, ItemID["princess" + arg.species], ItemID["drone" + arg.species], ItemID["queen" + arg.species], arg.flowers, arg.humidity, arg.climate);
        bee_type.chromosomes_list = arg.chromosomes;
        bee_type.dominant = arg.dominant;
        bee_type.produce = arg.produce;
        bee_type.specialty = arg.specialty;
        this.bees[arg.species] = bee_type;
        var NAME_OVERRIDE = function (item, name) {
            var beeType = BeeRegistry.getBeeTypeByID(item.id);
            var bee = BeeSaver.bees["b" + item.data];
            if (beeType !== BeeRegistry.BEETYPE_DRONE) {
                name += "§e\n" + (!bee ? "Pristine Stock" : "Ignoble Stock");
            }
            if (bee && bee.analyzed) {
                var climateTol = bee.getActiveChromosome("TEMPERATURE_TOLERANCE");
                var humidityTol = bee.getActiveChromosome("HUMIDITY_TOLERANCE");
                name += "§7\n" + BeeRegistry.getChromosomeValueName("LIFESPAN", bee.getActiveChromosome("LIFESPAN")) + " Life";
                name += "\n" + BeeRegistry.getChromosomeValueName("SPEED", bee.getActiveChromosome("SPEED")) + " Worker";
                name += "§a\nT: " + BeeRegistry.getChromosomeValueName("CLIMATE", bee.getClimate()) + "/" + bee.getClimateTolValue() + (climateTol === 0 ? "" : (climateTol < 6 ? " B" : (climateTol < 11 ? " U" : " D")));
                name += "\nH: " + BeeRegistry.getChromosomeValueName("HUMIDITY", bee.getHumidity()) + "/" + bee.getClimateTolValue() + (humidityTol === 0 ? "" : (humidityTol < 6 ? " B" : (humidityTol < 11 ? " U" : " D")));
                name += "§7\n" + BeeRegistry.getChromosomeValueName("FLOWERS", bee.getFlowers());
            }
            else
                name += "§7\n<unknown genome>";
            return name;
        };
        Item.registerNameOverrideFunction(ItemID["princess" + arg.species], NAME_OVERRIDE);
        Item.registerNameOverrideFunction(ItemID["drone" + arg.species], NAME_OVERRIDE);
        Item.registerNameOverrideFunction(ItemID["queen" + arg.species], NAME_OVERRIDE);
        Item.addCreativeGroup(GROUP_PRINCESSES, GROUP_PRINCESSES_NAME, [ItemID["princess" + arg.species]]);
        Item.addCreativeGroup(GROUP_DRONES, GROUP_DRONES_NAME, [ItemID["drone" + arg.species]]);
        Item.addCreativeGroup(GROUP_QUEENS, GROUP_QUEENS_NAME, [ItemID["queen" + arg.species]]);
    },
    getBeeTypeByID: function (id) {
        if (id > 0) {
            for (var key in this.bees) {
                var bee = this.bees[key];
                switch (id) {
                    case bee.princessID:
                        return BeeRegistry.BEETYPE_PRINCESS;
                    case bee.droneID:
                        return BeeRegistry.BEETYPE_DRONE;
                    case bee.queenID:
                        return BeeRegistry.BEETYPE_QUEEN;
                }
            }
        }
        return BeeRegistry.BEETYPE_NONE;
    },
    getSpeciesByID: function (id) {
        for (var key in this.bees) {
            var bee = this.bees[key];
            if (bee.princessID === id || bee.droneID === id || bee.queenID === id) {
                return key;
            }
        }
        return null;
    },
    getBeeByType: function (type) {
        return this.bees[type];
    },
    getBeeFromItem: function (id, data) {
        var bee = null;
        if (!BeeSaver.bees["b" + data]) {
            var species = BeeRegistry.getSpeciesByID(id);
            var beetype = BeeRegistry.getBeeTypeByID(id);
            bee = new Bee(species, beetype, false);
            if (beetype === BeeRegistry.BEETYPE_QUEEN) {
                bee.mate = {
                    type: species,
                    active_chromosomes_list: Util.objectUnion(this.bees[species].chromosomes_list, { "SPECIES": species }),
                    inactive_chromosomes_list: Util.objectUnion(this.bees[species].chromosomes_list, { "SPECIES": species })
                };
            }
            return bee;
        }
        bee = BeeSaver.bees["b" + data];
        return bee;
    },
    isBee: function (id) {
        return BeeRegistry.getSpeciesByID(id) !== null;
    },
    getChromosomeValueName: function (name, value) {
        if (name === "LIFESPAN") {
            switch (value) {
                case BeeRegistry.LIFESPAN_SHORTER:
                    return Translation.translate("bees.lifespan.shorted");
                case BeeRegistry.LIFESPAN_SHORTENED:
                    return Translation.translate("bees.lifespan.shortened");
                case BeeRegistry.LIFESPAN_SHORTEST:
                    return Translation.translate("bees.lifespan.shortest");
                case BeeRegistry.LIFESPAN_SHORT:
                    return Translation.translate("bees.lifespan.short");
                case BeeRegistry.LIFESPAN_NORMAL:
                    return Translation.translate("bees.lifespan.normal");
                case BeeRegistry.LIFESPAN_ELONGATED:
                    return Translation.translate("bees.lifespan.elongated");
                case BeeRegistry.LIFESPAN_LONG:
                    return Translation.translate("bees.lifespan.long");
                case BeeRegistry.LIFESPAN_LONGER:
                    return Translation.translate("bees.lifespan.longer");
                case BeeRegistry.LIFESPAN_LONGEST:
                    return Translation.translate("bees.lifespan.longest");
            }
        }
        else if (name === "SPEED") {
            switch (value) {
                case BeeRegistry.SPEED_FAST:
                    return Translation.translate("bees.speed.fast");
                case BeeRegistry.SPEED_FASTER:
                    return Translation.translate("bees.speed.faster");
                case BeeRegistry.SPEED_FASTEST:
                    return Translation.translate("bees.speed.fastest");
                case BeeRegistry.SPEED_NORMAL:
                    return Translation.translate("bees.speed.normal");
                case BeeRegistry.SPEED_SLOW:
                    return Translation.translate("bees.speed.slow");
                case BeeRegistry.SPEED_SLOWER:
                    return Translation.translate("bees.speed.slower");
                case BeeRegistry.SPEED_SLOWEST:
                    return Translation.translate("bees.speed.slowest");
            }
        }
        else if (name === "FLOWERS") {
            return Translation.translate(value[0]);
        }
        else if (name === "EFFECT") {
            if (!value) {
                return Translation.translate("bees.effect.none");
            }
            return BeeEffects.getLocalizedName(value);
        }
        else if (name === "CLIMATE") {
            return Habitat.localizeTemperature(value);
        }
        else if (name === "HUMIDITY") {
            return Habitat.localizeHumidity(value);
        }
        return value;
    },
    isDominant: function (name, value) {
        if (name === "FERTILITY") {
            return value === 1 || value === 2;
        }
        else if (name === "SPEED") {
            return value === BeeRegistry.SPEED_SLOWEST || value === BeeRegistry.SPEED_SLOWER || value === BeeRegistry.SPEED_SLOW || value === BeeRegistry.SPEED_FAST;
        }
        else if (name === "FLOWERS") {
            return value === BeeRegistry.FLOWERS_FLOWERS || value === BeeRegistry.FLOWERS_WHEAT || value === BeeRegistry.FLOWERS_GOURD;
        }
        else if (name === "EFFECT") {
            if (!value) {
                return true;
            }
            return BeeEffects.isDominant(value);
        }
        else if (name === "TEMPERATURE_TOLERANCE" || name === "HUMIDITY_TOLERANCE" || name === "TOLERANCE") {
            return value === this.TOLERANCE_BOTH_1 || value === this.TOLERANCE_UP_1 || value === this.TOLERANCE_DOWN_1;
        }
        return false;
    },
    integrateWithRecipeViewer: function (api) {
        function bakeBeeMutations(mutations) {
            if (!mutations)
                return [];
            return mutations.map(function (mutation) {
                var princessId = BeeRegistry.getPrincessByType(mutation.species1);
                var droneId = BeeRegistry.getDroneByType(mutation.species2);
                var resultId = BeeRegistry.getPrincessByType(mutation.result);
                return {
                    input: [
                        { id: princessId, data: 0, count: 1 },
                        { id: droneId, data: 0, count: 1 }
                    ],
                    chance: mutation.chance * 100,
                    output: [{ id: resultId, data: 0, count: 1 }]
                };
            });
        }
        api.registerRecipeType("fpe_bee_mutation", {
            contents: {
                icon: ItemID.queenMeadows,
                description: "Mutation",
                drawing: [
                    { type: "bitmap", x: 300, y: 100, scale: 5, bitmap: "forestry.for.apiary.bg_left" },
                    { type: "bitmap", x: 325, y: 130, scale: 5, bitmap: "forestry.for.apiary.scale_green" },
                    { type: "bitmap", x: 500, y: 220, scale: 5, bitmap: "forestry.scales.furnace_empty" }
                ],
                elements: {
                    input0: { type: "slot", x: 355, y: 125, size: 110, bitmap: "_default_slot_empty", needClean: true },
                    input1: { type: "slot", x: 355, y: 255, size: 110, bitmap: "_default_slot_empty", needClean: true },
                    output0: { type: "slot", x: 620, y: 200, size: 120 },
                    textChance: { type: "text", x: 620, y: 330, font: { size: 30 } },
                }
            },
            getList: function (id, data, isUsage) {
                var species = BeeRegistry.getSpeciesByID(id);
                if (!species)
                    return [];
                if (isUsage) {
                    return bakeBeeMutations(BeeRegistry.getMutations(species));
                }
                else
                    return bakeBeeMutations(BeeRegistry.getMutationsByResult(species));
            },
            onOpen: function (elements, data) {
                elements.get("textChance")
                    .onBindingUpdated("text", data ? "Chance: " + data.chance + "%" : "%");
            }
        });
        api.registerRecipeType("fpe_bee_product", {
            contents: {
                icon: ItemID.queenForest,
                description: "Product",
                drawing: [
                    { type: "bitmap", x: 500, y: 100, scale: 4, bitmap: "forestry.for.recipeViewer.bee_produce" },
                    { type: "bitmap", x: 380, y: 230, scale: 4, bitmap: "forestry.scales.furnace_empty" }
                ],
                elements: {
                    input0: { type: "slot", x: 240, y: 200, size: 120 },
                    output0: { type: "slot", x: 603, y: 119, size: 90, bitmap: "_default_slot_empty", needClean: true },
                    output1: { type: "slot", x: 519, y: 171, size: 90, bitmap: "_default_slot_empty", needClean: true },
                    output2: { type: "slot", x: 691, y: 171, size: 90, bitmap: "_default_slot_empty", needClean: true },
                    output3: { type: "slot", x: 603, y: 223, size: 90, bitmap: "_default_slot_empty", needClean: true },
                    output4: { type: "slot", x: 519, y: 275, size: 90, bitmap: "_default_slot_empty", needClean: true },
                    output5: { type: "slot", x: 603, y: 327, size: 90, bitmap: "_default_slot_empty", needClean: true },
                    output6: { type: "slot", x: 691, y: 275, size: 90, bitmap: "_default_slot_empty", needClean: true }
                }
            },
            getList: function (id, data, isUsage) {
                if (isUsage) {
                    var beeType = BeeRegistry.getBeeByType(BeeRegistry.getSpeciesByID(id));
                    return beeType ? [{
                            input: [{ id: beeType.queenID, data: 0, count: 1 }],
                            output: beeType.produce
                                .map(function (item) { return ({
                                id: item[0],
                                data: item[1],
                                count: 1
                            }); })
                        }] : [];
                }
                else {
                    var recipes = [];
                    for (var i in BeeRegistry.bees) {
                        var beeType = BeeRegistry.bees[i];
                        var produce = beeType.produce;
                        var isOk = produce.find(function (item) { return item[0] === id && (data === -1 || item[1] === data); }) !== undefined;
                        if (isOk) {
                            recipes.push({
                                input: [{ id: beeType.queenID, data: 0, count: 1 }],
                                output: produce
                                    .map(function (item) { return ({
                                    id: item[0],
                                    data: item[1],
                                    count: 1
                                }); })
                            });
                        }
                    }
                    return recipes;
                }
            }
        });
    },
};
BeeRegistry.init();
var BeeSaver = {
    uniqueID: 0,
    bees: {}
};
Saver.addSavesScope("BeeSaverScope", function (scope) {
    BeeSaver.uniqueID = scope.uniqueID;
    for (var key in scope["bees"]) {
        BeeSaver.bees[key] = BeeRegistry.getBeeFromScope(scope["bees"][key]);
    }
}, function () {
    var scope = {
        uniqueID: BeeSaver.uniqueID,
        bees: {}
    };
    for (var key in BeeSaver.bees) {
        scope["bees"][key] = BeeSaver.bees[key].getSaveScope();
    }
    return scope;
});
var Temperature;
(function (Temperature) {
    Temperature[Temperature["ICY"] = 1] = "ICY";
    Temperature[Temperature["COLD"] = 2] = "COLD";
    Temperature[Temperature["NORMAL"] = 3] = "NORMAL";
    Temperature[Temperature["WARM"] = 4] = "WARM";
    Temperature[Temperature["HOT"] = 5] = "HOT";
    Temperature[Temperature["HELLISH"] = 6] = "HELLISH";
})(Temperature || (Temperature = {}));
var Humidity;
(function (Humidity) {
    Humidity[Humidity["ARID"] = 1] = "ARID";
    Humidity[Humidity["NORMAL"] = 2] = "NORMAL";
    Humidity[Humidity["DAMP"] = 3] = "DAMP";
})(Humidity || (Humidity = {}));
var Habitat = /** @class */ (function () {
    function Habitat() {
    }
    Habitat.getTemperatureAt = function (blockSource, x, y, z) {
        if (blockSource.getDimension() === EDimension.NETHER) {
            return Temperature.HELLISH;
        }
        var temperature = blockSource.getBiomeTemperatureAt(x, y, z);
        if (temperature > 1) {
            return Temperature.HOT;
        }
        else if (temperature > .85) {
            return Temperature.WARM;
        }
        else if (temperature > .35) {
            return Temperature.NORMAL;
        }
        else if (temperature > 0) {
            return Temperature.COLD;
        }
        return Temperature.ICY;
    };
    Habitat.getHumidityAt = function (blockSource, x, y, z) {
        //The humidity of the swamp is different in Bedrock Edition and Java Edition (0.5 and 0.9 respectively).
        //Damp is required for swamp hives to spawn and marshy bees to work.
        //Differences in other biomes are insignificant.
        var biome = blockSource.getBiome(x, z);
        if (biome === 6) {
            return Humidity.DAMP;
        }
        var downfall = blockSource.getBiomeDownfallAt(x, y, z);
        if (downfall > .85) {
            return Humidity.DAMP;
        }
        else if (downfall >= .3) {
            return Humidity.NORMAL;
        }
        return Humidity.ARID;
    };
    Habitat.isWithinLimit = function (current, base, tolerance) {
        var up = 0;
        var down = 0;
        var side = BeeRegistry.getTolerance(tolerance);
        var value = BeeRegistry.getToleranceValue(tolerance);
        if (side === BeeRegistry.TOLERANCE_BOTH) {
            up = value;
            down = value;
        }
        else if (side === BeeRegistry.TOLERANCE_UP) {
            up = value;
        }
        else if (side === BeeRegistry.TOLERANCE_DOWN) {
            down = value;
        }
        return current <= base + up && current >= base - down;
    };
    Habitat.localizeTemperature = function (value) {
        return Translation.translate("forestry.gui.temperature.".concat(value));
    };
    Habitat.localizeHumidity = function (value) {
        return Translation.translate("forestry.gui.humidity.".concat(value));
    };
    return Habitat;
}());
var ModifierList = /** @class */ (function () {
    function ModifierList(modifiers) {
        this.modifiers = modifiers;
    }
    ModifierList.prototype.getProductionModifier = function (house) {
        return this.modifiers.reduce(function (prev, modifier) {
            return modifier.getProductionModifier ? prev * modifier.getProductionModifier(house) : prev;
        }, 1);
    };
    ModifierList.prototype.getMutationModifier = function (house) {
        return this.modifiers.reduce(function (prev, modifier) {
            return modifier.getMutationModifier ? prev * modifier.getMutationModifier(house) : prev;
        }, 1);
    };
    //Игнорировать ли дождь
    ModifierList.prototype.isSealed = function (house) {
        return this.modifiers.some(function (modifier) { return modifier.isSealed && modifier.isSealed(house); });
    };
    //Игнорировать ли отсутствие неба
    ModifierList.prototype.isSelfLighted = function (house) {
        return this.modifiers.some(function (modifier) { return modifier.isSelfLighted && modifier.isSelfLighted(house); });
    };
    //Модификатор шанса смерти Ignoble пчелы
    ModifierList.prototype.getGeneticDecay = function (house) {
        return this.modifiers.reduce(function (prev, modifier) {
            return modifier.getGeneticDecay ? prev * modifier.getGeneticDecay(house) : prev;
        }, 1);
    };
    ModifierList.prototype.getLifespanModifier = function (house) {
        return this.modifiers.reduce(function (prev, modifier) {
            return modifier.getLifespanModifier ? prev * modifier.getLifespanModifier(house) : prev;
        }, 1);
    };
    ModifierList.EMPTY = new ModifierList([]);
    return ModifierList;
}());
var HiveGenerator = /** @class */ (function () {
    function HiveGenerator() {
    }
    HiveGenerator.register = function (generator) {
        if (generator.chance <= 0) {
            summonException("Chance is not correct! (Hive Generator Registration)");
            return;
        }
        if (!generator.generate) {
            summonException("Generate function is not correct! (Hive Generator Registration)");
            return;
        }
        if (generator.species && !BeeRegistry.getBeeByType(generator.species)) {
            summonException("Species is not correct! (Hive Generator Registration)");
            return;
        }
        this.generators.push(generator);
    };
    HiveGenerator.genChunk = function (blockSource, chunkX, chunkZ, dimension) {
        var hivesAmount = this.generators.length;
        for (var tries = 0; tries < hivesAmount / 2; tries++) {
            var coords = GenerationUtils.randomXZ(chunkX, chunkZ);
            var temperature = Habitat.getTemperatureAt(blockSource, coords.x, 0, coords.z);
            var humidity = Habitat.getHumidityAt(blockSource, coords.x, 0, coords.z);
            for (var key in HiveGenerator.generators) {
                var generator = HiveGenerator.generators[key];
                var requiredDimension = generator.dimension || EDimension.NORMAL;
                if (requiredDimension !== dimension) {
                    continue;
                }
                if (generator.species) {
                    var species = BeeRegistry.getBeeByType(generator.species);
                    if (!species) {
                        continue;
                    }
                    if (!species.isValidTemperature(temperature) || !species.isValidHumidity(humidity)) {
                        continue;
                    }
                }
                if (generator.chance * hivesAmount / 8 >= Math.random() * 100 && generator.generate(coords.x, coords.z)) {
                    return;
                }
            }
        }
    };
    HiveGenerator.genHive = function (x, z, blockId, blockData, grounds) {
        var y = GenerationUtils.findHighSurface(x, z).y;
        if (World.getBlockID(x, y + 1, z) !== 0)
            return;
        if (grounds) {
            var validGround = false;
            var block = World.getBlock(x, y, z);
            for (var key in grounds) {
                var ground = grounds[key];
                if (ground[0] === block.id && (ground[1] === -1 || ground[1] === block.data)) {
                    validGround = true;
                    break;
                }
            }
            if (!validGround)
                return;
        }
        World.setBlock(x, y + 1, z, blockId, blockData || 0);
    };
    HiveGenerator.genTreeHive = function (x, z, blockId, blockData) {
        var y = 128;
        var prevIsTreeBlock = false;
        while (y > 20) {
            var id = World.getBlockID(x, y, z);
            var isTreeBlock = this.isTreeBlock(id);
            if (prevIsTreeBlock && !isTreeBlock) {
                World.setBlock(x, y, z, blockId, blockData);
                return true;
            }
            else
                prevIsTreeBlock = isTreeBlock;
            y--;
        }
        return false;
    };
    HiveGenerator.isTreeBlock = function (blockId) {
        switch (blockId) {
            case 17:
            case 18:
            case 161:
            case 162:
                return true;
        }
        return false;
    };
    HiveGenerator.generators = [];
    return HiveGenerator;
}());
Callback.addCallback("GenerateChunk", function (chunkX, chunkZ) {
    var region = BlockSource.getCurrentWorldGenRegion();
    if (!region)
        return;
    HiveGenerator.genChunk(region, chunkX, chunkZ, EDimension.NORMAL);
});
Callback.addCallback("GenerateEndChunk", function (chunkX, chunkZ) {
    var region = BlockSource.getCurrentWorldGenRegion();
    if (!region)
        return;
    HiveGenerator.genChunk(region, chunkX, chunkZ, EDimension.END);
});
Callback.addCallback("GenerateNetherChunk", function (chunkX, chunkZ) {
    var region = BlockSource.getCurrentWorldGenRegion();
    if (!region)
        return;
    HiveGenerator.genChunk(region, chunkX, chunkZ, EDimension.NETHER);
});
if (ForestryConfig.beekeepingMode > 4 || ForestryConfig.beekeepingMode < 0) {
    ForestryConfig.beekeepingMode = 1;
    log("Invalid beekeeping mode. Switched to '1'", "ERROR");
}
var BM_MUTATION_MODIFIER = 0;
var BM_LIFESPAN_MODIFIER = 0;
var BM_SPEED_MODIFIER = 0;
var BM_REDUCES_FERTILITY = true;
var BM_CAN_FATIGUE = true;
switch (ForestryConfig.beekeepingMode) {
    case 0:
        BM_MUTATION_MODIFIER = 2.0;
        BM_LIFESPAN_MODIFIER = 1.0;
        BM_SPEED_MODIFIER = 1.0;
        BM_REDUCES_FERTILITY = false;
        BM_CAN_FATIGUE = false;
        break;
    case 1:
        BM_MUTATION_MODIFIER = 1.0;
        BM_LIFESPAN_MODIFIER = 1.0;
        BM_SPEED_MODIFIER = 1.0;
        BM_REDUCES_FERTILITY = false;
        BM_CAN_FATIGUE = true;
        break;
    case 2:
        BM_MUTATION_MODIFIER = 0.75;
        BM_LIFESPAN_MODIFIER = 1.5;
        BM_SPEED_MODIFIER = 1.0;
        BM_REDUCES_FERTILITY = false;
        BM_CAN_FATIGUE = true;
        break;
    case 3:
        BM_MUTATION_MODIFIER = 0.5;
        BM_LIFESPAN_MODIFIER = 5.0;
        BM_SPEED_MODIFIER = 0.8;
        BM_REDUCES_FERTILITY = true;
        BM_CAN_FATIGUE = true;
        break;
    case 4:
        BM_MUTATION_MODIFIER = 0.2;
        BM_LIFESPAN_MODIFIER = 10.0;
        BM_SPEED_MODIFIER = 0.6;
        BM_REDUCES_FERTILITY = true;
        BM_CAN_FATIGUE = true;
}
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Суровая принцесса",
            en: "Austere princess",
            zh: "[FR]苦行公主蜂"
        },
        drone: {
            ru: "Суровый трутень",
            en: "Austere drone",
            zh: "[FR]苦行雄蜂"
        },
        queen: {
            ru: "Суровая королева",
            en: "Austere queen",
            zh: "[FR]苦行蜂后"
        }
    },
    mutations: [
        {
            species1: "Modest",
            species2: "Frugal",
            chance: 0.08,
            onMutate: function (house) {
                var climate = house.getClimate();
                return (climate === Temperature.HOT || climate === Temperature.HELLISH)
                    && house.getHumidity() === Humidity.ARID;
            }
        }
    ],
    species: "Austere",
    hasGlint: true,
    humidity: Humidity.ARID,
    climate: Temperature.HOT,
    flowers: BeeRegistry.FLOWERS_CACTI,
    produce: [[ItemID.combParched, 0, 0.2], [ItemID.combPowdery, 0, 0.5]],
    chromosomes: {
        EFFECT: "creeper",
        HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_UP_1,
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_2,
        NEVER_SLEEPS: true
    }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Карающая принцесса",
            en: "Avenging princess",
            zh: "[FR]复仇公主蜂"
        },
        drone: {
            ru: "Карающий трутень",
            en: "Avenging drone",
            zh: "[FR]复仇雄蜂"
        },
        queen: {
            ru: "Карающая королева",
            en: "Avenging queen",
            zh: "[FR]复仇蜂后"
        }
    },
    mutations: [
        {
            species1: "Vengeful",
            species2: "Vindictive",
            chance: 0.04
        }
    ],
    species: "Avenging",
    hastGlint: true,
    produce: [[ItemID.combIrradiated, 0, 0.4]],
    chromosomes: { EFFECT: "radiactive", TERRITORY: "15x13x15", LIFESPAN: BeeRegistry.LIFESPAN_LONGEST }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Обычная принцесса",
            en: "Common princess", zh: "[FR]寻常公主蜂"
        },
        drone: {
            ru: "Обычный трутень",
            en: "Common drone", zh: "[FR]寻常雄蜂"
        },
        queen: {
            ru: "Обычная королева",
            en: "Common queen", zh: "[FR]寻常蜂后"
        }
    },
    species: "Common",
    produce: [[ItemID.combHoney, 0, 0.35]],
    chromosomes: { LIFESPAN: BeeRegistry.LIFESPAN_SHORTER }
});
var mut1 = ["Forest", "Meadows", "Modest", "Tropical", "Wintry", "Marshy"];
for (var key in mut1) {
    for (var key2 in mut1) {
        if (mut1[key] !== mut1[key2]) {
            BeeRegistry.addMutation({
                species1: mut1[key],
                species2: mut1[key2],
                result: "Common",
                chance: 0.15
            });
        }
    }
}
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Культивируемая принцесса",
            en: "Cultivated princess",
            zh: "[FR]田野公主蜂"
        },
        drone: {
            ru: "Культивируемый трутень",
            en: "Cultivated drone",
            zh: "[FR]田野雄蜂"
        },
        queen: {
            ru: "Культивируемая королева",
            en: "Cultivated queen",
            zh: "[FR]田野蜂后"
        }
    },
    species: "Cultivated",
    produce: [[ItemID.combHoney, 0, 0.4]],
    chromosomes: { LIFESPAN: BeeRegistry.LIFESPAN_SHORTEST, TOLERATES_RAIN: true }
});
for (var key in mut1) {
    BeeRegistry.addMutation({
        species1: mut1[key],
        species2: "Common",
        result: "Cultivated",
        chance: 0.12
    });
}
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Демоническая принцесса",
            en: "Demonic princess",
            zh: "[FR]恶魔公主蜂"
        },
        drone: {
            ru: "Демонический трутень",
            en: "Demonic drone",
            zh: "[FR]恶魔雄蜂"
        },
        queen: {
            ru: "Демоническая королева",
            en: "Demonic queen",
            zh: "[FR]恶魔蜂后"
        }
    },
    species: "Demonic",
    hasGlint: true,
    produce: [[ItemID.combSimmering, 0, 0.45], [348, 0, 0.15]],
    humidity: Humidity.ARID,
    climate: Temperature.HELLISH,
    flowers: BeeRegistry.FLOWERS_NETHER,
    mutations: [
        {
            species1: "Sinister",
            species2: "Fiendish",
            chance: 0.25,
            onMutate: function (house) {
                return house.getClimate() === Temperature.HELLISH;
            }
        }
    ],
    chromosomes: {
        NEVER_SLEEPS: true,
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_2,
        EFFECT: "ignition",
        LIFESPAN: BeeRegistry.LIFESPAN_LONGER,
        TOLERATES_RAIN: true,
        SPEED: BeeRegistry.SPEED_SLOWER
    }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Добросовестная принцесса",
            en: "Diligent princess",
            zh: "[FR]勤奋公主蜂"
        },
        drone: {
            ru: "Добросовестный трутень",
            en: "Diligent drone",
            zh: "[FR]勤奋雄蜂"
        },
        queen: {
            ru: "Добросовестная королева",
            en: "Diligent queen",
            zh: "[FR]勤奋蜂后"
        }
    },
    species: "Diligent",
    produce: [[ItemID.combStringy, 0, 0.2]],
    mutations: [
        {
            species1: "Common",
            species2: "Cultivated",
            chance: 0.1
        }
    ],
    chromosomes: { SPEED: BeeRegistry.SPEED_SLOWER, LIFESPAN: BeeRegistry.LIFESPAN_SHORT }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Райская принцесса",
            en: "Edenic princess",
            zh: "[FR]伊甸公主蜂"
        },
        drone: {
            ru: "Райский трутень",
            en: "Edenic drone",
            zh: "[FR]伊甸雄蜂"
        },
        queen: {
            ru: "Райская королева",
            en: "Edenic queen",
            zh: "[FR]伊甸蜂后"
        }
    },
    species: "Edenic",
    mutations: [
        {
            species1: "Tropical",
            species2: "Exotic",
            chance: 0.08
        }
    ],
    produce: [[ItemID.combSilky, 0, 0.2]],
    hasGlint: true,
    humidity: Humidity.DAMP,
    climate: Temperature.WARM,
    flowers: BeeRegistry.FLOWERS_JUNGLE,
    chromosomes: {
        HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_1,
        SPEED: BeeRegistry.SPEED_SLOWEST,
        LIFESPAN: BeeRegistry.LIFESPAN_LONGER,
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_BOTH_2,
        EFFECT: "exploration"
    }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Принцесса края",
            en: "Ender princess",
            zh: "[FR]末影公主蜂"
        },
        drone: {
            ru: "Трутень края",
            en: "Ender drone",
            zh: "[FR]末影雄蜂"
        },
        queen: {
            ru: "Королева края",
            en: "Ender queen",
            zh: "[FR]末影蜂后"
        }
    },
    species: "Ender",
    produce: [[ItemID.combMysterious, 0, 0.3]],
    climate: Temperature.COLD,
    flowers: BeeRegistry.FLOWERS_ENDS,
    chromosomes: {
        EFFECT: "misanthrope",
        TERRITORY: "11x8x11",
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_UP_1
    }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Экзотическая принцесса",
            en: "Exotic princess",
            zh: "[FR]异国公主蜂"
        },
        drone: {
            ru: "Экзотический трутень",
            en: "Exotic drone",
            zh: "[FR]异国雄蜂"
        },
        queen: {
            ru: "Экзотическая королева",
            en: "Exotic queen",
            zh: "[FR]异国蜂后"
        }
    },
    species: "Exotic",
    produce: [[ItemID.combSilky, 0, 0.3]],
    climate: Temperature.WARM,
    humidity: Humidity.DAMP,
    flowers: BeeRegistry.FLOWERS_JUNGLE,
    mutations: [
        {
            species1: "Austere",
            species2: "Tropical",
            chance: 0.12
        }
    ],
    chromosomes: {
        HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_1,
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_1,
        LIFESPAN: BeeRegistry.LIFESPAN_LONG
    }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Дьявольская принцесса",
            en: "Fiendish princess",
            zh: "[FR]残忍公主蜂"
        },
        drone: {
            ru: "Дьявольский трутень",
            en: "Fiendish drone",
            zh: "[FR]残忍雄蜂"
        },
        queen: {
            ru: "Дьявольская королева",
            en: "Fiendish queen",
            zh: "[FR]残忍蜂后"
        }
    },
    species: "Fiendish",
    produce: [[ItemID.combSimmering, 0, 0.55], [ItemID.ash, 0, 0.15]],
    climate: Temperature.HELLISH,
    humidity: Humidity.ARID,
    flowers: BeeRegistry.FLOWERS_NETHER,
    mutations: [
        {
            species1: "Modest",
            species2: "Sinister",
            chance: 0.4,
            onMutate: function (house) {
                return house.getClimate() === Temperature.HELLISH;
            }
        },
        {
            species1: "Tropical",
            species2: "Sinister",
            chance: 0.4,
            onMutate: function (house) {
                return house.getClimate() === Temperature.HELLISH;
            }
        },
        {
            species1: "Cultivated",
            species2: "Sinister",
            chance: 0.4,
            onMutate: function (house) {
                return house.getClimate() === Temperature.HELLISH;
            }
        }
    ],
    chromosomes: {
        NEVER_SLEEPS: true,
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_2,
        LIFESPAN: BeeRegistry.LIFESPAN_LONG,
        EFFECT: "aggress"
    }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Лесная принцесса",
            en: "Forest princess",
            zh: "[FR]森林公主蜂"
        },
        drone: {
            ru: "Лесной трутень",
            en: "Forest drone",
            zh: "[FR]森林雄蜂"
        },
        queen: {
            ru: "Лесная королева",
            en: "Forest queen",
            zh: "[FR]森林蜂后"
        }
    },
    species: "Forest",
    produce: [[ItemID.combHoney, 0, 0.3]],
    chromosomes: { FERTILITY: 3 }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Умеренная принцесса",
            en: "Frugal princess",
            zh: "[FR]节俭公主蜂"
        },
        drone: {
            ru: "Умеренный трутень",
            en: "Frugal drone",
            zh: "[FR]节俭雄蜂"
        },
        queen: {
            ru: "Умеренная королева",
            en: "Frugal queen",
            zh: "[FR]节俭蜂后"
        }
    },
    species: "Frugal",
    produce: [[ItemID.combParched, 0, 0.3]],
    climate: Temperature.HOT,
    humidity: Humidity.ARID,
    flowers: BeeRegistry.FLOWERS_CACTI,
    mutations: [
        {
            species1: "Modest",
            species2: "Sinister",
            chance: 0.16,
            onMutate: function (house) {
                return house.getClimate() === Temperature.HOT;
            }
        },
        {
            species1: "Modest",
            species2: "Fiendish",
            chance: 0.1,
            onMutate: function (house) {
                return house.getClimate() === Temperature.HOT;
            }
        }
    ],
    chromosomes: { TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_1, LIFESPAN: BeeRegistry.LIFESPAN_LONG }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Ледниковая принцесса",
            en: "Glacial princess",
            zh: "[FR]冰河公主蜂"
        },
        drone: {
            ru: "Ледниковый трутень",
            en: "Glacial drone",
            zh: "[FR]冰河雄蜂"
        },
        queen: {
            ru: "Ледниковая королева",
            en: "Glacial queen",
            zh: "[FR]冰河蜂后"
        }
    },
    species: "Glacial",
    hasGlint: true,
    produce: [[ItemID.combFrozen, 0, 0.2], [ItemID.iceShard, 0, 0.4]],
    climate: Temperature.ICY,
    mutations: [
        {
            species1: "Wintry",
            species2: "Icy",
            chance: 0.08
        }
    ],
    chromosomes: {
        EFFECT: "glacial",
        LIFESPAN: BeeRegistry.LIFESPAN_SHORT,
        SPEED: BeeRegistry.SPEED_SLOWER
    }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Отшельническая принцесса",
            en: "Hermitic princess",
            zh: "[FR]遁世公主蜂"
        },
        drone: {
            ru: "Отшельнический трутень",
            en: "Hermitic drone",
            zh: "[FR]遁世雄蜂"
        },
        queen: {
            ru: "Отшельническая королева",
            en: "Hermitic queen",
            zh: "[FR]遁世蜂后"
        }
    },
    species: "Hermitic",
    hasGlint: true,
    produce: [[ItemID.combMellow, 0, 0.2]],
    flowers: BeeRegistry.FLOWERS_WHEAT,
    chromosomes: { HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_BOTH_1, TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_1 }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Ледяная принцесса",
            en: "Icy princess",
            zh: "[FR]严寒公主蜂"
        },
        drone: {
            ru: "Ледяной трутень",
            en: "Icy drone",
            zh: "[FR]严寒雄蜂"
        },
        queen: {
            ru: "Ледяная королева",
            en: "Icy queen",
            zh: "[FR]严寒蜂后"
        }
    },
    species: "Icy",
    produce: [[ItemID.combFrozen, 0, 0.2], [ItemID.iceShard, 0, 0.2]],
    climate: Temperature.ICY,
    mutations: [
        {
            species1: "Industrious",
            species2: "Wintry",
            chance: 0.12
        }
    ],
    chromosomes: {
        EFFECT: "glacial",
        SPEED: BeeRegistry.SPEED_SLOW,
        LIFESPAN: BeeRegistry.LIFESPAN_SHORT
    }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Трудолюбивая принцесса",
            en: "Industrious princess",
            zh: "[FR]敬业公主蜂"
        },
        drone: {
            ru: "Трудолюбивый трутень",
            en: "Industrious drone",
            zh: "[FR]敬业雄蜂"
        },
        queen: {
            ru: "Трудолюбивая королева",
            en: "Industrious queen",
            zh: "[FR]敬业蜂后"
        }
    },
    species: "Industrious",
    hasGlint: true,
    produce: [[ItemID.combStringy, 0, 0.2], [ItemID.pollen1, 0, 0.15]],
    mutations: [
        {
            species1: "Diligent",
            species2: "Unweary",
            chance: 0.08
        }
    ],
    chromosomes: { SPEED: BeeRegistry.SPEED_SLOWER }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Заячья принцесса",
            en: "Leporine princess",
            zh: "[FR]狂野公主蜂"
        },
        drone: {
            ru: "Заячий трутень",
            en: "Leporine drone",
            zh: "[FR]狂野雄蜂"
        },
        queen: {
            ru: "Заячья королева",
            en: "Leporine queen",
            zh: "[FR]狂野蜂后"
        }
    },
    species: "Leporine",
    hasGlint: true,
    produce: [[ItemID.combSilky, 0, 0.3], [344, 0, 0.1]],
    mutations: [
        {
            species1: "Meadows",
            species2: "Forest",
            chance: 0.01
        }
    ],
    chromosomes: { HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_BOTH_1, TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_2 }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Величественная принцесса",
            en: "Majestic princess",
            zh: "[FR]庄严公主蜂"
        },
        drone: {
            ru: "Величественный трутень",
            en: "Majestic drone",
            zh: "[FR]庄严雄蜂"
        },
        queen: {
            ru: "Величественная королева",
            en: "Majestic queen",
            zh: "[FR]庄严蜂后"
        }
    },
    species: "Majestic",
    produce: [[ItemID.combDripping, 0, 0.3]],
    mutations: [
        {
            species1: "Cultivated",
            species2: "Noble",
            chance: 0.08
        }
    ],
    chromosomes: { LIFESPAN: BeeRegistry.LIFESPAN_SHORTENED, FERTILITY: 4 }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Болотная принцесса",
            en: "Marshy princess",
            zh: "[FR]沼泽公主蜂"
        },
        drone: {
            ru: "Болотный трутень",
            en: "Marshy drone",
            zh: "[FR]沼泽雄蜂"
        },
        queen: {
            ru: "Болотная королева",
            en: "Marshy queen",
            zh: "[FR]沼泽蜂后"
        }
    },
    species: "Marshy",
    produce: [[ItemID.combMossy, 0, 0.3]],
    humidity: Humidity.DAMP,
    flowers: BeeRegistry.FLOWERS_MUSHROOMS,
    chromosomes: {},
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Луговая принцесса",
            en: "Meadows princess",
            zh: "[FR]草原公主蜂"
        },
        drone: {
            ru: "Луговой трутень",
            en: "Meadows drone",
            zh: "[FR]草原雄蜂"
        },
        queen: {
            ru: "Луговая королева",
            en: "Meadows queen",
            zh: "[FR]草原蜂后"
        }
    },
    species: "Meadows",
    produce: [[ItemID.combHoney, 0, 0.3]],
    chromosomes: {}
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Веселенькая принцесса",
            en: "Merry princess",
            zh: "[FR]欢乐公主蜂"
        },
        drone: {
            ru: "Веселенький трутень",
            en: "Merry drone",
            zh: "[FR]欢乐雄蜂"
        },
        queen: {
            ru: "Веселенькая королева",
            en: "Merry queen",
            zh: "[FR]欢乐蜂后"
        }
    },
    species: "Merry",
    hasGlint: true,
    produce: [[ItemID.combFrozen, 0, 0.3], [ItemID.iceShard, 0, 0.2]],
    climate: Temperature.ICY,
    chromosomes: {
        EFFECT: "glacial",
        HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_BOTH_1,
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_2,
        NEVER_SLEEPS: true
    }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Скромная принцесса",
            en: "Modest princess",
            zh: "[FR]温和公主蜂"
        },
        drone: {
            ru: "Скромный трутень",
            en: "Modest drone",
            zh: "[FR]温和雄蜂"
        },
        queen: {
            ru: "Скромная королева",
            en: "Modest queen",
            zh: "[FR]温和蜂后"
        }
    },
    species: "Modest",
    produce: [[ItemID.combParched, 0, 0.2]],
    climate: Temperature.HOT,
    humidity: Humidity.ARID,
    flowers: BeeRegistry.FLOWERS_CACTI,
    chromosomes: {
        NEVER_SLEEPS: true,
        HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_UP_1,
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_1,
        SPEED: BeeRegistry.SPEED_SLOWER,
        LIFESPAN: BeeRegistry.LIFESPAN_SHORT
    }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Монашеская принцесса",
            en: "Monastic princess",
            zh: "[FR]僧侣公主蜂"
        },
        drone: {
            ru: "Монашеский трутень",
            en: "Monastic drone",
            zh: "[FR]僧侣雄蜂"
        },
        queen: {
            ru: "Монашеская королева",
            en: "Monastic queen",
            zh: "[FR]僧侣蜂后"
        }
    },
    species: "Monastic",
    produce: [[ItemID.combWheaten, 0, 0.3], [ItemID.combMellow, 0, 0.1]],
    specialty: [[ItemID.combMellow, 0, 0.1]],
    flowers: BeeRegistry.FLOWERS_WHEAT,
    chromosomes: { HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_BOTH_1, TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_1 }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Благородная принцесса",
            en: "Noble princess",
            zh: "[FR]高尚公主蜂"
        },
        drone: {
            ru: "Благородный трутень",
            en: "Noble drone",
            zh: "[FR]高尚雄蜂"
        },
        queen: {
            ru: "Благородная королева",
            en: "Noble queen",
            zh: "[FR]高尚蜂后"
        }
    },
    species: "Noble",
    produce: [[ItemID.combDripping, 0, 0.2]],
    mutations: [
        {
            species1: "Common",
            species2: "Cultivated",
            chance: 0.1
        }
    ],
    chromosomes: { SPEED: BeeRegistry.SPEED_SLOWER, LIFESPAN: BeeRegistry.LIFESPAN_SHORT }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Призрачная принцесса",
            en: "Phantasmal princess",
            zh: "[FR]幻影公主蜂"
        },
        drone: {
            ru: "Призрачный трутень",
            en: "Phantasmal drone",
            zh: "[FR]幻影雄蜂"
        },
        queen: {
            ru: "Призрачная королева",
            en: "Phantasmal queen",
            zh: "[FR]幻影蜂后"
        }
    },
    species: "Phantasmal",
    hasGlint: true,
    produce: [[ItemID.combMysterious, 0, 0.4]],
    climate: Temperature.COLD,
    flowers: BeeRegistry.FLOWERS_ENDS,
    chromosomes: { TERRITORY: "11x8x11", SPEED: BeeRegistry.SPEED_SLOWEST, LIFESPAN: BeeRegistry.LIFESPAN_LONGEST }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Сельская принцесса",
            en: "Rural princess",
            zh: "[FR]田园公主蜂"
        },
        drone: {
            ru: "Сельский трутень",
            en: "Rural drone",
            zh: "[FR]田园雄蜂"
        },
        queen: {
            ru: "Сельская королева",
            en: "Rural queen",
            zh: "[FR]田园蜂后"
        }
    },
    species: "Rural",
    produce: [[ItemID.combWheaten, 0, 0.2]],
    flowers: BeeRegistry.FLOWERS_WHEAT,
    mutations: [
        {
            species1: "Meadows",
            species2: "Diligent",
            chance: 0.12
        }
    ],
    chromosomes: {}
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Укромная принцесса",
            en: "Secluded princess",
            zh: "[FR]归隐公主蜂"
        },
        drone: {
            ru: "Укромный трутень",
            en: "Secluded drone",
            zh: "[FR]归隐雄蜂"
        },
        queen: {
            ru: "Укромная королева",
            en: "Secluded queen",
            zh: "[FR]归隐蜂后"
        }
    },
    species: "Secluded",
    produce: [[ItemID.combMellow, 0, 0.2]],
    flowers: BeeRegistry.FLOWERS_WHEAT,
    chromosomes: { HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_BOTH_1, TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_1 }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Зловещая принцесса",
            en: "Sinister princess",
            zh: "[FR]邪恶公主蜂"
        },
        drone: {
            ru: "Зловещий трутень",
            en: "Sinister drone",
            zh: "[FR]邪恶雄蜂"
        },
        queen: {
            ru: "Зловещая королева",
            en: "Sinister queen",
            zh: "[FR]邪恶蜂后"
        }
    },
    species: "Sinister",
    produce: [[ItemID.combSimmering, 0, 0.45]],
    climate: Temperature.HELLISH,
    humidity: Humidity.ARID,
    flowers: BeeRegistry.FLOWERS_NETHER,
    mutations: [
        {
            species1: "Modest",
            species2: "Cultivated",
            chance: 0.6,
            onMutate: function (house) {
                return house.getClimate() === Temperature.HELLISH;
            }
        },
        {
            species1: "Tropical",
            species2: "Cultivated",
            chance: 0.6,
            onMutate: function (house) {
                return house.getClimate() === Temperature.HELLISH;
            }
        }
    ],
    chromosomes: {
        NEVER_SLEEPS: true,
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_2,
        SPEED: BeeRegistry.SPEED_SLOWER,
        EFFECT: "aggress"
    }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Спектральная принцесса",
            en: "Spectral princess",
            zh: "[FR]幽灵公主蜂"
        },
        drone: {
            ru: "Спектральный трутень",
            en: "Spectral drone",
            zh: "[FR]幽灵雄蜂"
        },
        queen: {
            ru: "Спектральная королева",
            en: "Spectral queen",
            zh: "[FR]幽灵蜂后"
        }
    },
    species: "Spectral",
    produce: [[ItemID.combMysterious, 0, 0.5]],
    climate: Temperature.COLD,
    flowers: BeeRegistry.FLOWERS_ENDS,
    chromosomes: { TERRITORY: "11x8x11", SPEED: BeeRegistry.SPEED_SLOWER, EFFECT: "aggress" }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Пьяная принцесса",
            en: "Tipsy princess",
            zh: "[FR]醉酒公主蜂"
        },
        drone: {
            ru: "Пьяный трутень",
            en: "Tipsy drone",
            zh: "[FR]醉酒雄蜂"
        },
        queen: {
            ru: "Пьяная королева",
            en: "Tipsy queen",
            zh: "[FR]醉酒蜂后"
        }
    },
    species: "Tipsy",
    hasGlint: true,
    produce: [[ItemID.combFrozen, 0, 0.3], [ItemID.iceShard, 0, 0.2]],
    climate: Temperature.ICY,
    chromosomes: {
        HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_BOTH_1,
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_2,
        NEVER_SLEEPS: true,
        EFFECT: "drunkard"
    }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Тропическая принцесса",
            en: "Tropical princess",
            zh: "[FR]热带公主蜂"
        },
        drone: {
            ru: "Тропический трутень",
            en: "Tropical drone",
            zh: "[FR]热带雄蜂"
        },
        queen: {
            ru: "Тропическая королева",
            en: "Tropical queen",
            zh: "[FR]热带蜂后"
        }
    },
    species: "Tropical",
    produce: [[ItemID.combSilky, 0, 0.2]],
    climate: Temperature.WARM,
    humidity: Humidity.DAMP,
    flowers: BeeRegistry.FLOWERS_JUNGLE,
    chromosomes: {
        HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_UP_1,
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_UP_1,
        SPEED: BeeRegistry.SPEED_SLOWER,
        LIFESPAN: BeeRegistry.LIFESPAN_SHORT
    }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Неутомимая принцесса",
            en: "Unweary princess",
            zh: "[FR]不倦公主蜂"
        },
        drone: {
            ru: "Неутомимый трутень",
            en: "Unweary drone",
            zh: "[FR]不倦雄蜂"
        },
        queen: {
            ru: "Неутомимая королева",
            en: "Unweary queen",
            zh: "[FR]不倦蜂后"
        }
    },
    species: "Unweary",
    produce: [[ItemID.combSilky, 0, 0.2]],
    mutations: [
        {
            species1: "Cultivated",
            species2: "Diligent",
            chance: 0.08
        }
    ],
    chromosomes: { LIFESPAN: BeeRegistry.LIFESPAN_SHORTENED }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Доблестная принцесса",
            en: "Valiant princess",
            zh: "[FR]勇者公主蜂"
        },
        drone: {
            ru: "Доблестный трутень",
            en: "Valiant drone",
            zh: "[FR]勇者雄蜂"
        },
        queen: {
            ru: "Доблестная королева",
            en: "Valiant queen",
            zh: "[FR]勇者蜂后"
        }
    },
    species: "Valiant",
    produce: [[ItemID.combCocoa, 0, 0.3], [353, 0, 0.15]],
    specialty: [[353, 0, 0.15]],
    chromosomes: {
        LIFESPAN: BeeRegistry.LIFESPAN_LONG,
        SPEED: BeeRegistry.SPEED_SLOW,
        NEVER_SPLEEPS: true,
        CAVE_DWELLING: true
    }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Мстительная принцесса",
            en: "Vengeful princess",
            zh: "[FR]报仇公主蜂"
        },
        drone: {
            ru: "Мстительный трутень",
            en: "Vengeful drone",
            zh: "[FR]报仇雄蜂"
        },
        queen: {
            ru: "Мстительная королева",
            en: "Vengeful queen",
            zh: "[FR]报仇蜂后"
        }
    },
    species: "Vengeful",
    produce: [[ItemID.combIrradiated, 0, 0.4]],
    chromosomes: { EFFECT: "radiactive", TERRITORY: "15x13x15", LIFESPAN: BeeRegistry.LIFESPAN_LONGER }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Злопамятная принцесса",
            en: "Vindictive princess",
            zh: "[FR]记恨公主蜂"
        },
        drone: {
            ru: "Злопамятный трутень",
            en: "Vindictive drone",
            zh: "[FR]记恨雄蜂"
        },
        queen: {
            ru: "Злопамятная королева",
            en: "Vindictive queen",
            zh: "[FR]记恨蜂后"
        }
    },
    species: "Vindictive",
    produce: [[ItemID.combIrradiated, 0, 0.25]],
    chromosomes: { EFFECT: "radiactive", TERRITORY: "15x13x15", SPEED: BeeRegistry.SPEED_SLOWER }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Зимняя принцесса",
            en: "Wintry princess",
            zh: "[FR]凛冬公主蜂"
        },
        drone: {
            ru: "Зимний трутень",
            en: "Wintry drone",
            zh: "[FR]凛冬雄蜂"
        },
        queen: {
            ru: "Зимняя королева",
            en: "Wintry queen",
            zh: "[FR]凛冬蜂后"
        }
    },
    species: "Wintry",
    produce: [[ItemID.combFrozen, 0, 0.3]],
    climate: Temperature.ICY,
    chromosomes: {
        EFFECT: "glacial",
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_UP_1,
        SPEED: BeeRegistry.SPEED_SLOWER,
        LIFESPAN: BeeRegistry.LIFESPAN_SHORT,
        FERTILITY: 4
    }
});
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Императорская принцесса",
            en: "Imperial princess",
            zh: "[FR]帝皇公主蜂"
        },
        drone: {
            ru: "Императорский трутень",
            en: "Imperial drone",
            zh: "[FR]帝皇雄蜂"
        },
        queen: {
            ru: "Императорская королева",
            en: "Imperial queen",
            zh: "[FR]帝皇蜂后"
        }
    },
    species: "Imperial",
    hasGlint: true,
    produce: [[ItemID.combDripping, 0, 0.2], [ItemID.royalJelly, 0, 0.15]],
    mutations: [
        {
            species1: "Noble",
            species2: "Majestic",
            chance: 0.08
        }
    ],
    chromosomes: { SPEED: BeeRegistry.SPEED_SLOWER, EFFECT: "beatific" }
});
function listEntitiesInRange(blockSource, coords, range, entityType) {
    if (entityType === void 0) { entityType = 0; }
    return blockSource.listEntitiesInAABB(coords.x - range.x / 2, coords.y - range.y / 2, coords.z - range.z / 2, coords.x + range.x / 2, coords.y + range.y / 2, coords.z + range.z / 2, entityType, entityType === 0);
}
function getBlocksInRange(blockSource, coords, range, blockId, limit) {
    if (limit === void 0) { limit = -1; }
    var blocks = [];
    for (var x = coords.x - range.x / 2; x < coords.x + range.x / 2; x++) {
        for (var y = coords.y - range.y / 2; y < coords.y + range.y / 2; y++) {
            for (var z = coords.z - range.z / 2; z < coords.z + range.z / 2; z++) {
                var id = blockSource.getBlockId(x, y, z);
                if (id === blockId) {
                    blocks.push({ x: x, y: y, z: z });
                    if (blocks.length === limit)
                        return blocks;
                }
            }
        }
    }
    return blocks;
}
function getRandomPositionInRange(blockSource, coords, range) {
    return {
        x: Math.floor(coords.x + (Math.random() - 0.5) * range.x * 2),
        y: Math.floor(coords.y + (Math.random() - 0.5) * range.y * 2),
        z: Math.floor(coords.z + (Math.random() - 0.5) * range.z * 2),
    };
}
BeeEffects.registerEffect("aggress", {
    name: "bees.effect.aggress",
    delay: 40,
    requireWorking: false,
    isDominant: true,
    doEffect: function (blockSource, coords, range) {
        var e_3, _a;
        var all = listEntitiesInRange(blockSource, coords, range);
        try {
            for (var all_1 = __values(all), all_1_1 = all_1.next(); !all_1_1.done; all_1_1 = all_1.next()) {
                var entity = all_1_1.value;
                Entity.damageEntity(entity, 4 - BeeEffects.getApiaristArmorWearValue(entity));
                if (Entity.getHealth(entity) <= 0) {
                    Entity.remove(entity);
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (all_1_1 && !all_1_1.done && (_a = all_1.return)) _a.call(all_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
    }
});
BeeEffects.registerEffect("beatific", {
    name: "bees.effect.beatific",
    delay: 20,
    doEffect: function (blockSource, coords, range) {
        var e_4, _a;
        var all = listEntitiesInRange(blockSource, coords, range);
        try {
            for (var all_2 = __values(all), all_2_1 = all_2.next(); !all_2_1.done; all_2_1 = all_2.next()) {
                var entity = all_2_1.value;
                Entity.addEffect(entity, EPotionEffect.REGENERATION, 100, 1, true, true);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (all_2_1 && !all_2_1.done && (_a = all_2.return)) _a.call(all_2);
            }
            finally { if (e_4) throw e_4.error; }
        }
    }
});
BeeEffects.registerEffect("creeper", {
    name: "bees.effect.creeper",
    delay: 20,
    requireWorking: false,
    isDominant: true,
    doEffect: function (blockSource, coords, range) {
        var e_5, _a;
        var all = listEntitiesInRange(blockSource, coords, range);
        try {
            for (var all_3 = __values(all), all_3_1 = all_3.next(); !all_3_1.done; all_3_1 = all_3.next()) {
                var entity = all_3_1.value;
                //TODO: wtf?
                World.explode(coords.x, coords.y, coords.z, 3, false);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (all_3_1 && !all_3_1.done && (_a = all_3.return)) _a.call(all_3);
            }
            finally { if (e_5) throw e_5.error; }
        }
    }
});
BeeEffects.registerEffect("exploration", {
    name: "bees.effect.explorer",
    delay: 80,
    doEffect: function (blockSource, coords, range) {
        var e_6, _a;
        var all = listEntitiesInRange(blockSource, coords, range, EEntityType.PLAYER);
        try {
            for (var all_4 = __values(all), all_4_1 = all_4.next(); !all_4_1.done; all_4_1 = all_4.next()) {
                var entity = all_4_1.value;
                var actor = new PlayerActor(entity);
                actor.addExperience(2);
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (all_4_1 && !all_4_1.done && (_a = all_4.return)) _a.call(all_4);
            }
            finally { if (e_6) throw e_6.error; }
        }
    }
});
BeeEffects.registerEffect("glacial", {
    name: "bees.effect.freezing",
    delay: 200,
    doEffect: function (blockSource, coords, range, house) {
        switch (house.getClimate()) {
            case Temperature.HELLISH:
            case Temperature.HOT:
            case Temperature.WARM:
                return;
        }
        for (var i = 0; i < 10; i++) {
            var pos = getRandomPositionInRange(blockSource, coords, range);
            var id = blockSource.getBlockId(pos.x, pos.y, pos.z);
            var aboveId = blockSource.getBlockId(pos.x, pos.y + 1, pos.z);
            if (id === VanillaBlockID.water && aboveId === 0) {
                blockSource.setBlock(pos.x, pos.y, pos.z, VanillaBlockID.ice, 0);
            }
        }
    }
});
BeeEffects.registerEffect("heroic", {
    name: "bees.effect.heroic",
    delay: 40,
    doEffect: function (blockSource, coords, range) {
        var e_7, _a;
        var all = listEntitiesInRange(blockSource, coords, range);
        try {
            for (var all_5 = __values(all), all_5_1 = all_5.next(); !all_5_1.done; all_5_1 = all_5.next()) {
                var entity = all_5_1.value;
                Entity.damageEntity(entity, 2);
                if (Entity.getHealth(entity) <= 0) {
                    Entity.remove(entity);
                }
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (all_5_1 && !all_5_1.done && (_a = all_5.return)) _a.call(all_5);
            }
            finally { if (e_7) throw e_7.error; }
        }
    }
});
BeeEffects.registerEffect("ignition", {
    name: "bees.effect.flammable",
    delay: 20,
    requireWorking: false,
    doEffect: function (blockSource, coords, range) {
        var e_8, _a;
        var all = listEntitiesInRange(blockSource, coords, range, EEntityType.PLAYER);
        try {
            for (var all_6 = __values(all), all_6_1 = all_6.next(); !all_6_1.done; all_6_1 = all_6.next()) {
                var entity = all_6_1.value;
                var duration = 500;
                var chance = .5;
                switch (BeeEffects.getApiaristArmorWearValue(entity)) {
                    case 3:
                        chance = .05;
                        duration = 50;
                        break;
                    case 2:
                        chance = .2;
                        duration = 200;
                        break;
                    case 1:
                        chance = .35;
                        duration = 350;
                        break;
                }
                if (Math.random() < chance) {
                    Entity.setFire(entity, duration, false);
                }
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (all_6_1 && !all_6_1.done && (_a = all_6.return)) _a.call(all_6);
            }
            finally { if (e_8) throw e_8.error; }
        }
    }
});
BeeEffects.registerEffect("miasmic", {
    name: "bees.effect.poison",
    delay: 100,
    doEffect: function (blockSource, coords, range) {
        var e_9, _a;
        var all = listEntitiesInRange(blockSource, coords, range, EEntityType.PLAYER);
        try {
            for (var all_7 = __values(all), all_7_1 = all_7.next(); !all_7_1.done; all_7_1 = all_7.next()) {
                var entity = all_7_1.value;
                var duration = 600;
                switch (BeeEffects.getApiaristArmorWearValue(entity)) {
                    case 3:
                        duration = 150;
                        break;
                    case 2:
                        duration = 300;
                        break;
                    case 1:
                        duration = 450;
                        break;
                }
                Entity.addEffect(entity, EPotionEffect.POISON, duration, 1, true, true);
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (all_7_1 && !all_7_1.done && (_a = all_7.return)) _a.call(all_7);
            }
            finally { if (e_9) throw e_9.error; }
        }
    }
});
BeeEffects.registerEffect("misanthrope", {
    name: "bees.effect.ends",
    delay: 20,
    requireWorking: false,
    isDominant: true,
    doEffect: function (blockSource, coords, range) {
        var e_10, _a;
        var all = listEntitiesInRange(blockSource, coords, range, EEntityType.PLAYER);
        try {
            for (var all_8 = __values(all), all_8_1 = all_8.next(); !all_8_1.done; all_8_1 = all_8.next()) {
                var entity = all_8_1.value;
                var damage = 4 - BeeEffects.getApiaristArmorWearValue(entity);
                Entity.damageEntity(entity, damage);
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (all_8_1 && !all_8_1.done && (_a = all_8.return)) _a.call(all_8);
            }
            finally { if (e_10) throw e_10.error; }
        }
    }
});
BeeEffects.registerEffect("radiactive", {
    name: "bees.effect.radiact",
    delay: 40,
    requireWorking: false,
    isDominant: true,
    doEffect: function (blockSource, coords, range) {
        var e_11, _a, e_12, _b;
        var all = listEntitiesInRange(blockSource, coords, range);
        try {
            for (var all_9 = __values(all), all_9_1 = all_9.next(); !all_9_1.done; all_9_1 = all_9.next()) {
                var ent = all_9_1.value;
                Entity.damageEntity(ent, 8 - BeeEffects.getApiaristArmorWearValue(ent) * 2);
                if (Entity.getHealth(ent) <= 0) {
                    Entity.remove(ent);
                }
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (all_9_1 && !all_9_1.done && (_a = all_9.return)) _a.call(all_9);
            }
            finally { if (e_11) throw e_11.error; }
        }
        var blocks = getBlocksInRange(blockSource, coords, range, VanillaBlockID.water, 20);
        try {
            for (var blocks_1 = __values(blocks), blocks_1_1 = blocks_1.next(); !blocks_1_1.done; blocks_1_1 = blocks_1.next()) {
                var block = blocks_1_1.value;
                blockSource.setBlock(block.x, block.y, block.z, 0, 0);
            }
        }
        catch (e_12_1) { e_12 = { error: e_12_1 }; }
        finally {
            try {
                if (blocks_1_1 && !blocks_1_1.done && (_b = blocks_1.return)) _b.call(blocks_1);
            }
            finally { if (e_12) throw e_12.error; }
        }
    }
});
BeeEffects.registerEffect("drunkard", {
    name: "bees.effect.drunkard",
    delay: 20,
    doEffect: function (blockSource, coords, range) {
        var e_13, _a;
        var all = listEntitiesInRange(blockSource, coords, range, EEntityType.PLAYER);
        try {
            for (var all_10 = __values(all), all_10_1 = all_10.next(); !all_10_1.done; all_10_1 = all_10.next()) {
                var entity = all_10_1.value;
                Entity.addEffect(entity, EPotionEffect.CONFUSION, 500, 1, true, true);
            }
        }
        catch (e_13_1) { e_13 = { error: e_13_1 }; }
        finally {
            try {
                if (all_10_1 && !all_10_1.done && (_a = all_10.return)) _a.call(all_10);
            }
            finally { if (e_13) throw e_13.error; }
        }
    }
});
IDRegistry.genBlockID("apiaristChest");
ChestManager.register("apiaristChest", "Apiarist's Chest", [["apiaristchest", 1], ["apiaristchest", 0], ["apiaristchest", 2], ["apiaristchest", 3], ["apiaristchest", 2], ["apiaristchest", 2]], true, 126, {
    isValid: function (id) {
        return BeeRegistry.isBee(id);
    }
});
Callback.addCallback("PostLoaded", function () {
    for (var i in COMBS) {
        Recipes.addShaped({ id: BlockID.apiaristChest, count: 1, data: 0 }, [
            " g ",
            "cbc",
            "ccc"
        ], ['g', 20, 0, 'c', COMBS[i], 0, 'b', 54, 0]);
    }
});
GROUP_ITEM_PIPE.add(BlockID.apiaristChest, -1);
Block.setPrototype("apiary", {
    type: Block.TYPE_BASE,
    getVariations: function () {
        return [{
                name: "Apiary",
                texture: [["apiary", 0], ["apiary", 0], ["apiary", 1], ["apiary", 1], ["apiary", 1], ["apiary", 1]],
                inCreative: true
            }];
    }
});
Block.setBlockMaterial(BlockID.apiary, "wood", 1);
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: BlockID.apiary, count: 1, data: 0 }, [
        "ppp",
        "sgs",
        "sss"
    ], ['s', 5, -1, 'p', 158, -1, 'g', ItemID.impregnatedCasing, 0]);
});
GROUP_ITEM_PIPE.add(BlockID.apiary, -1);
var apiaryGUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: "Apiary"
            }
        },
        inventory: {
            standard: true
        },
        background: {
            standard: true
        }
    },
    drawing: [
        { type: "bitmap", x: 335, y: 90, bitmap: "forestry.for.apiary.bg_left", scale: 3.2 },
        { type: "bitmap", x: 462, y: 50, bitmap: "forestry.for.apiary.bg_right", scale: 3.2 }
    ],
    elements: {
        "progressScale": {
            type: "scale",
            x: 351,
            y: 109,
            direction: 1,
            value: 0,
            invert: true,
            bitmap: "forestry.for.apiary.scale_green",
            scale: 3.2
        },
        "slot1": {
            type: "slot",
            x: 370,
            y: 106,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "slot2": {
            type: "slot",
            x: 370,
            y: 189.2,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "slotProduct0": {
            type: "slot",
            x: 628.4,
            y: 64,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "slotProduct1": {
            type: "slot",
            x: 561.2,
            y: 107.6,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "slotProduct2": {
            type: "slot",
            x: 695.2,
            y: 107.6,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "slotProduct3": {
            type: "slot",
            x: 628.2,
            y: 149.2,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "slotProduct4": {
            type: "slot",
            x: 561.2,
            y: 190.8,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "slotProduct5": {
            type: "slot",
            x: 628.4,
            y: 232.4,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "slotProduct6": {
            type: "slot",
            x: 695.6,
            y: 190.8,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "error": {
            type: "text",
            x: 345,
            y: 320,
            width: 500,
            height: 30,
            text: "",
        },
        "slotFrame0": { type: "slot", x: 478, y: 66, size: 51, bitmap: "forestry.slots.gray" },
        "slotFrame1": { type: "slot", x: 478, y: 159, size: 51, bitmap: "forestry.slots.gray" },
        "slotFrame2": { type: "slot", x: 478, y: 252, size: 51, bitmap: "forestry.slots.gray" },
    }
});
MachineRegistry.addUiTitleTranslation(apiaryGUI);
TileEntity.registerPrototype(BlockID.apiary, {
    useNetworkItemContainer: true,
    OUTPUT_SLOTS: ["slotProduct0", "slotProduct1", "slotProduct2", "slotProduct3", "slotProduct4", "slotProduct5", "slotProduct6"],
    defaultValues: {
        progress: 0,
        progressMax: 0,
        progressCycle: 0
    },
    init: function () {
        ContainerHelper.setMaxStackPolicy(this.container, "slot1", 1);
    },
    tick: function () {
        if (!this.house) {
            this.house = new BeeHouse(this, {
                slotPrincess: "slot1",
                slotDrone: "slot2",
                produceSlots: this.OUTPUT_SLOTS,
                slotPrincessOut: this.OUTPUT_SLOTS,
                slotDronesOut: this.OUTPUT_SLOTS
            }, new ModifierList([{
                    getProductionModifier: function () {
                        return 0.1;
                    }
                }]));
        }
        var modifiers = new ModifierList([]);
        if (this.house.queen && !this.house.error) {
            for (var i = 0; i < 3; i++) {
                var slotName = "slotFrame".concat(i);
                var slot = this.container.getSlot(slotName);
                if (slot.id && BeeFrame.isFrame(slot.id)) {
                    var frame = BeeFrame.frames[slot.id];
                    modifiers.modifiers.push(frame.modifier);
                    if (this.data.progressCycle === 0) {
                        slot.data++;
                        if (slot.data > frame.durability) {
                            this.container.setSlot(slotName, 0, 0, 0);
                        }
                        else {
                            this.container.setSlot(slotName, slot.id, slot.count, slot.data);
                        }
                    }
                }
            }
        }
        this.house.tick(modifiers);
        var progressTexture;
        if (this.data.progress > this.data.progressMax * .8) {
            progressTexture = "forestry.for.apiary.scale_green";
        }
        else if (this.data.progress > this.data.progressMax * .5) {
            progressTexture = "forestry.for.apiary.scale_yellow";
        }
        else if (this.data.progress > this.data.progressMax * .3) {
            progressTexture = "forestry.for.apiary.scale_orange";
        }
        else {
            progressTexture = "forestry.for.apiary.scale_red";
        }
        this.container.setBinding("progressScale", "texture", progressTexture);
        this.container.setBinding("error", "text", this.house.error || "");
        this.container.setScale("progressScale", (this.data.progress / this.data.progressMax) || 0);
        this.container.validateAll();
        this.container.sendChanges();
    },
    getScreenName: function () {
        return "main";
    },
    getScreenByName: function () {
        return apiaryGUI;
    },
});
{
    var slots = {
        "slot1": {
            input: true,
            isValid: function (item) {
                var type = BeeRegistry.getBeeTypeByID(item.id);
                return type === BeeRegistry.BEETYPE_PRINCESS || type === BeeRegistry.BEETYPE_QUEEN;
            }
        },
        "slot2": {
            input: true,
            isValid: function (item) {
                return BeeRegistry.getBeeTypeByID(item.id) === BeeRegistry.BEETYPE_DRONE;
            }
        },
    };
    for (var i = 0; i < 7; i++) {
        slots["slotProduct".concat(i)] = {
            output: true
        };
    }
    StorageInterface.createInterface(BlockID.apiary, { slots: slots });
}
Block.setPrototype("beeHouse", {
    type: Block.TYPE_BASE,
    getVariations: function () {
        return [{
                name: "Bee House",
                texture: [["bee_house", 0], ["bee_house", 0], ["bee_house", 1], ["bee_house", 1], ["bee_house", 1], ["bee_house", 1]],
                inCreative: true
            }];
    }
});
Block.setBlockMaterial(BlockID.beeHouse, "wood", 1);
Callback.addCallback("PostLoaded", function () {
    for (var i in COMBS) {
        Recipes.addShaped({ id: BlockID.beeHouse, count: 1, data: 0 }, [
            "ppp",
            "sgs",
            "sss"
        ], ['s', 5, -1, 'p', 158, -1, 'g', COMBS[i], 0]);
    }
});
TileEntity.registerPrototype(BlockID.beeHouse, {
    useNetworkItemContainer: true,
    OUTPUT_SLOTS: ["slotProduct0", "slotProduct1", "slotProduct2", "slotProduct3", "slotProduct4", "slotProduct5", "slotProduct6"],
    defaultValues: {
        progress: 0,
        progressMax: 0,
        progressCycle: 0
    },
    tick: function () {
        if (!this.house) {
            this.house = new BeeHouse(this, {
                slotPrincess: "slot1",
                slotDrone: "slot2",
                produceSlots: this.OUTPUT_SLOTS,
                slotPrincessOut: this.OUTPUT_SLOTS,
                slotDronesOut: this.OUTPUT_SLOTS
            }, new ModifierList([{
                    getProductionModifier: function () {
                        return 0.25;
                    },
                    getMutationModifier: function () {
                        return 0;
                    },
                    getGeneticDecay: function () {
                        return 0;
                    },
                    getLifespanModifier: function () {
                        return 3;
                    }
                }]));
        }
        this.house.tick(ModifierList.EMPTY);
        var progressTexture;
        if (this.data.progress > this.data.progressMax * .8) {
            progressTexture = "forestry.for.apiary.scale_green";
        }
        else if (this.data.progress > this.data.progressMax * .5) {
            progressTexture = "forestry.for.apiary.scale_yellow";
        }
        else if (this.data.progress > this.data.progressMax * .3) {
            progressTexture = "forestry.for.apiary.scale_orange";
        }
        else {
            progressTexture = "forestry.for.apiary.scale_red";
        }
        this.container.setBinding("progressScale", "texture", progressTexture);
        this.container.setBinding("error", "text", this.house.error || "");
        this.container.setScale("progressScale", (this.data.progress / this.data.progressMax) || 0);
        this.container.validateAll();
        this.container.sendChanges();
    },
    getScreenName: function () {
        return "main";
    },
    getScreenByName: function () {
        return alvearyGUI;
    }
});
Block.setPrototype("blockWax", {
    type: Block.TYPE_BASE,
    getVariations: function () {
        return [
            {
                name: "Wax Block",
                texture: [["block_wax", 0]],
                inCreative: true
            }
        ];
    }
});
Block.setBlockMaterial(BlockID.blockWax, "dirt", 1);
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: BlockID.blockWax, count: 1, data: 0 }, [
        "iii",
        "iii",
        "iii"
    ], ['i', ItemID.beeswax, 0]);
    Recipes.addShapeless({ id: ItemID.beeswax, count: 9, data: 0 }, [{ id: BlockID.blockWax, data: 0 }]);
});
if (ForestryConfig.combsBlocksEnabled) {
    Block.setPrototype("blockComb", {
        type: Block.TYPE_BASE,
        getVariations: function () {
            return [
                {
                    name: "Cocoa Comb Block",
                    texture: [["comb_block_cocoa", 0]],
                    inCreative: true
                },
                {
                    name: "Dripping Comb Block",
                    texture: [["comb_block_dripping", 0]],
                    inCreative: true
                },
                {
                    name: "Honey Comb Block",
                    texture: [["comb_block_honey", 0]],
                    inCreative: true
                },
                {
                    name: "Frozen Comb Block",
                    texture: [["comb_block_frozen", 0]],
                    inCreative: true
                },
                {
                    name: "Mellow Comb Block",
                    texture: [["comb_block_mellow", 0]],
                    inCreative: true
                },
                {
                    name: "Mossy Comb Block",
                    texture: [["comb_block_mossy", 0]],
                    inCreative: true
                },
                {
                    name: "Mysterious Comb Block",
                    texture: [["comb_block_mysterious", 0]],
                    inCreative: true
                },
                {
                    name: "Parched Comb Block",
                    texture: [["comb_block_parched", 0]],
                    inCreative: true
                },
                {
                    name: "Powdery Comb Block",
                    texture: [["comb_block_powdery", 0]],
                    inCreative: true
                },
                {
                    name: "Silky Comb Block",
                    texture: [["comb_block_silky", 0]],
                    inCreative: true
                },
                {
                    name: "Simmering Comb Block",
                    texture: [["comb_block_simmering", 0]],
                    inCreative: true
                },
                {
                    name: "Stringy Comb Block",
                    texture: [["comb_block_stringy", 0]],
                    inCreative: true
                },
                {
                    name: "Wheaten Comb Block",
                    texture: [["comb_block_wheaten", 0]],
                    inCreative: true
                },
                {
                    name: "Irradiated Comb Block",
                    texture: [["comb_block_irradiated", 0]],
                    inCreative: true
                },
            ];
        }
    });
    Block.setBlockMaterial(BlockID.blockComb, "stone", 1);
    Item.addCreativeGroup(GROUP_COMB_BLOCKS, GROUP_COMB_BLOCKS_NAME, [BlockID.blockComb]);
    Callback.addCallback("PostLoaded", function () {
        Recipes.addShaped({ id: BlockID.blockComb, count: 1, data: 0 }, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.combCocoa, 0]);
        Recipes.addShapeless({ id: ItemID.combCocoa, count: 9, data: 0 }, [{ id: BlockID.blockComb, data: 0 }]);
        Recipes.addShaped({ id: BlockID.blockComb, count: 1, data: 1 }, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.combDripping, 0]);
        Recipes.addShapeless({ id: ItemID.combDripping, count: 9, data: 0 }, [{ id: BlockID.blockComb, data: 1 }]);
        Recipes.addShaped({ id: BlockID.blockComb, count: 1, data: 2 }, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.combHoney, 0]);
        Recipes.addShapeless({ id: ItemID.combHoney, count: 9, data: 0 }, [{ id: BlockID.blockComb, data: 2 }]);
        Recipes.addShaped({ id: BlockID.blockComb, count: 1, data: 3 }, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.combFrozen, 0]);
        Recipes.addShapeless({ id: ItemID.combFrozen, count: 9, data: 0 }, [{ id: BlockID.blockComb, data: 3 }]);
        Recipes.addShaped({ id: BlockID.blockComb, count: 1, data: 4 }, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.combMellow, 0]);
        Recipes.addShapeless({ id: ItemID.combMellow, count: 9, data: 0 }, [{ id: BlockID.blockComb, data: 4 }]);
        Recipes.addShaped({ id: BlockID.blockComb, count: 1, data: 5 }, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.combMossy, 0]);
        Recipes.addShapeless({ id: ItemID.combMossy, count: 9, data: 0 }, [{ id: BlockID.blockComb, data: 5 }]);
        Recipes.addShaped({ id: BlockID.blockComb, count: 1, data: 6 }, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.combMysterious, 0]);
        Recipes.addShapeless({ id: ItemID.combMysterious, count: 9, data: 0 }, [{ id: BlockID.blockComb, data: 6 }]);
        Recipes.addShaped({ id: BlockID.blockComb, count: 1, data: 7 }, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.combParched, 0]);
        Recipes.addShapeless({ id: ItemID.combParched, count: 9, data: 0 }, [{ id: BlockID.blockComb, data: 7 }]);
        Recipes.addShaped({ id: BlockID.blockComb, count: 1, data: 8 }, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.combPowdery, 0]);
        Recipes.addShapeless({ id: ItemID.combPowdery, count: 9, data: 0 }, [{ id: BlockID.blockComb, data: 8 }]);
        Recipes.addShaped({ id: BlockID.blockComb, count: 1, data: 9 }, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.combSilky, 0]);
        Recipes.addShapeless({ id: ItemID.combSilky, count: 9, data: 0 }, [{ id: BlockID.blockComb, data: 9 }]);
        Recipes.addShaped({ id: BlockID.blockComb, count: 1, data: 10 }, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.combSimmering, 0]);
        Recipes.addShapeless({ id: ItemID.combSimmering, count: 9, data: 0 }, [{ id: BlockID.blockComb, data: 10 }]);
        Recipes.addShaped({ id: BlockID.blockComb, count: 1, data: 11 }, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.combStringy, 0]);
        Recipes.addShapeless({ id: ItemID.combStringy, count: 9, data: 0 }, [{ id: BlockID.blockComb, data: 11 }]);
        Recipes.addShaped({ id: BlockID.blockComb, count: 1, data: 12 }, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.combWheaten, 0]);
        Recipes.addShapeless({ id: ItemID.combWheaten, count: 9, data: 0 }, [{ id: BlockID.blockComb, data: 12 }]);
        Recipes.addShaped({ id: BlockID.blockComb, count: 1, data: 13 }, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.combIrradiated, 0]);
        Recipes.addShapeless({ id: ItemID.combIrradiated, count: 9, data: 0 }, [{ id: BlockID.blockComb, data: 13 }]);
    });
}
function attackByBeehive() {
    if (!ForestryConfig.hiveDamageOnAttack)
        return;
    if (!Game.getDifficulty() && !ForestryConfig.hiveDamageOnPeaceful)
        return;
    if (Util.random(0, 4) >= BeeEffects.getApiaristArmorWearValue(Player.get())) {
        Entity.damageEntity(Player.get(), (Math.random() / 2.0 + 0.5) * 10);
    }
}
ToolAPI.addBlockMaterial("beehive", 1.5);
Block.setPrototype("beehiveForestry", {
    type: Block.TYPE_BASE,
    getVariations: function () {
        return [
            {
                name: "Forest Hive",
                texture: [["beehiveForest", 0], ["beehiveForest", 0], ["beehiveForest", 1]],
                inCreative: true
            },
            {
                name: "Meadows Hive",
                texture: [["beehiveMeadows", 0], ["beehiveMeadows", 0], ["beehiveMeadows", 1]],
                inCreative: true
            },
            {
                name: "Modest Hive",
                texture: [["beehiveModest", 0], ["beehiveModest", 0], ["beehiveModest", 1]],
                inCreative: true
            },
            {
                name: "Tropical Hive",
                texture: [["beehiveTropical", 0], ["beehiveTropical", 0], ["beehiveTropical", 1]],
                inCreative: true
            },
            {
                name: "Wintry Hive",
                texture: [["beehiveWintry", 0], ["beehiveWintry", 0], ["beehiveWintry", 1]],
                inCreative: true
            },
            {
                name: "Marshy Hive",
                texture: [["beehiveMarshy", 0], ["beehiveMarshy", 0], ["beehiveMarshy", 1]],
                inCreative: true
            },
            {
                name: "Ender Hive",
                texture: [["beehiveEnder", 0], ["beehiveEnder", 0], ["beehiveEnder", 1]],
                inCreative: true
            }
        ];
    }
});
Item.addCreativeGroup(GROUP_BEEHIVES, GROUP_BEEHIVES_NAME, [BlockID.beehiveForestry]);
Block.registerDropFunction("beehiveForestry", function (coords, id, data, diggingLevel) {
    attackByBeehive();
    if (diggingLevel) {
        var drop = [];
        var rand = Math.random();
        if (rand < 0.3) {
            drop.push([ItemID.princessValiant, 1, 0]);
        }
        else if (Math.random() < 0.8) {
            switch (parseInt(data)) {
                case 0:
                    if (Math.random() < 0.08) {
                        var bee = new Bee("Forest", BeeRegistry.BEETYPE_PRINCESS, true);
                        bee.inactive_chromosomes_list["TOLERATES_RAIN"] = true;
                        drop.push([bee.getItemID(), 1, bee.unique]);
                    }
                    else {
                        drop.push([ItemID.princessForest, 1, 0]);
                    }
                    break;
                case 1:
                    drop.push([ItemID.princessMeadows, 1, 0]);
                    break;
                case 2:
                    drop.push([ItemID.princessModest, 1, 0]);
                    break;
                case 3:
                    drop.push([ItemID.princessTropical, 1, 0]);
                    break;
                case 4:
                    drop.push([ItemID.princessWintry, 1, 0]);
                    break;
                case 5:
                    drop.push([ItemID.princessMarshy, 1, 0]);
                    break;
                case 6:
                    drop.push([ItemID.princessEnder, 1, 0]);
                    break;
            }
        }
        switch (parseInt(data)) {
            case 0:
                if (Math.random() < 0.8) {
                    drop.push([ItemID.combHoney, 1, 0]);
                }
                break;
            case 1:
                if (Math.random() < 0.8) {
                    drop.push([ItemID.combHoney, 1, 0]);
                }
                break;
            case 2:
                if (Math.random() < 0.8) {
                    drop.push([ItemID.combParched, 1, 0]);
                }
                break;
            case 3:
                if (Math.random() < 0.8) {
                    drop.push([ItemID.combSilky, 1, 0]);
                }
                break;
            case 4:
                if (Math.random() < 0.8) {
                    drop.push([ItemID.combFrozen, 1, 0]);
                }
                break;
            case 5:
                if (Math.random() < 0.8) {
                    drop.push([ItemID.combMossy, 1, 0]);
                }
                break;
            case 6:
                if (Math.random() < 0.9) {
                    drop.push([ItemID.combMysterious, 1, 0]);
                }
                break;
        }
        if (rand < 0.03) {
            drop.push([ItemID.droneValiant, 1, 0]);
        }
        else if (rand < 0.8) {
            var droneCount = Math.floor(1 + Math.random() * 2);
            switch (parseInt(data)) {
                case 0:
                    if (Math.random() < 0.08) {
                        var bee = new Bee("Forest", BeeRegistry.BEETYPE_DRONE, true);
                        bee.inactive_chromosomes_list["TOLERATES_RAIN"] = true;
                        drop.push([bee.getItemID(), 1, bee.unique]);
                    }
                    else {
                        drop.push([ItemID.droneForest, droneCount, 0]);
                    }
                    break;
                case 1:
                    drop.push([ItemID.droneMeadows, droneCount, 0]);
                    break;
                case 2:
                    drop.push([ItemID.droneModest, droneCount, 0]);
                    break;
                case 3:
                    drop.push([ItemID.droneTropical, droneCount, 0]);
                    break;
                case 4:
                    drop.push([ItemID.droneWintry, droneCount, 0]);
                    break;
                case 5:
                    drop.push([ItemID.droneMarshy, droneCount, 0]);
                    break;
                case 6:
                    drop.push([ItemID.droneEnder, droneCount, 0]);
                    break;
            }
        }
        return drop;
    }
    return [];
});
Block.setBlockMaterial(BlockID.beehiveForestry, "beehive", 1);
HiveGenerator.register({
    chance: ForestryConfig.genForestChance,
    species: "Forest",
    generate: function (x, z) {
        return HiveGenerator.genTreeHive(x, z, BlockID.beehiveForestry, 0);
    }
});
HiveGenerator.register({
    chance: ForestryConfig.genMeadowsChance,
    species: "Meadows",
    generate: function (x, z) {
        HiveGenerator.genHive(x, z, BlockID.beehiveForestry, 1, [[2, 0], [3, 0]]);
        return true;
    }
});
HiveGenerator.register({
    chance: ForestryConfig.genModestChance,
    species: "Modest",
    generate: function (x, z) {
        HiveGenerator.genHive(x, z, BlockID.beehiveForestry, 2, [[2, 0], [3, 0], [12, -1], [24, -1]]);
        return true;
    }
});
HiveGenerator.register({
    chance: ForestryConfig.genTropicalChance,
    species: "Tropical",
    generate: function (x, z) {
        return HiveGenerator.genTreeHive(x, z, BlockID.beehiveForestry, 3);
    }
});
HiveGenerator.register({
    chance: ForestryConfig.genWintryChance,
    species: "Wintry",
    generate: function (x, z) {
        HiveGenerator.genHive(x, z, BlockID.beehiveForestry, 4, [[2, 0], [3, 0]]);
        return true;
    }
});
HiveGenerator.register({
    chance: ForestryConfig.genMarshyChance,
    species: "Marshy",
    generate: function (x, z) {
        HiveGenerator.genHive(x, z, BlockID.beehiveForestry, 5);
        return true;
    }
});
HiveGenerator.register({
    chance: ForestryConfig.genEnderChance,
    dimension: EDimension.END,
    generate: function (x, z) {
        HiveGenerator.genHive(x, z, BlockID.beehiveForestry, 6);
        return true;
    }
});
if (ForestryConfig.particlesBeeHives) {
    var beesParticleEmitter_1 = new Particles.ParticleEmitter(0, 0, 0);
    var BeeParticles_1 = [
        //forest
        Particles.registerParticleType({
            texture: "bee",
            size: [0.5, 0.5],
            lifetime: [80, 80],
            render: 2
        }),
        //meadows
        Particles.registerParticleType({
            texture: "bee",
            size: [0.5, 0.5],
            lifetime: [80, 80],
            color: [1, 0.7, 0.7, 1],
            render: 2
        }),
        //modest
        Particles.registerParticleType({
            texture: "bee",
            size: [0.5, 0.5],
            lifetime: [80, 80],
            color: [1, 1, 0.7, 1],
            render: 2
        }),
        //tropical
        Particles.registerParticleType({
            texture: "bee",
            size: [0.5, 0.5],
            lifetime: [80, 80],
            color: [0.1, 0.3, 0, 0.2],
            render: 2
        }),
        //wintry
        Particles.registerParticleType({
            texture: "bee",
            size: [0.5, 0.5],
            lifetime: [80, 80],
            color: [0.4, 1, 1, 0.8],
            render: 2
        }),
        //marshy
        Particles.registerParticleType({
            texture: "bee",
            size: [0.5, 0.5],
            lifetime: [80, 80],
            color: [0.1, 0.3, 0, 0.7],
            render: 2
        }),
        //ender
        Particles.registerParticleType({
            texture: "bee",
            size: [0.5, 0.5],
            lifetime: [80, 80],
            color: [0.8, 0, 1, 1],
            render: 2
        })
    ];
    function spawnBeeParticles(type, x, y, z) {
        var amount = Util.random(2, 4);
        for (; amount > 0; amount--) {
            var xa = Math.random() <= 0.5 ? 0.02 : 0;
            var ya = Math.random() <= 0.5 ? 0.02 : 0;
            var za = Math.random() <= 0.5 ? 0.02 : 0;
            if (Math.random() <= 0.5) {
                xa = -xa;
                za = -za;
            }
            beesParticleEmitter_1.emit(type, 0, x + .5, y + .5, z + .5, xa, ya, za);
        }
    }
    Block.setAnimateTickCallback(BlockID.beehiveForestry, function (x, y, z, id, data) {
        spawnBeeParticles(BeeParticles_1[data], x, y, z);
    });
}
var COLUMN_0 = 340;
var COLUMN_1 = 535;
var COLUMN_2 = 735;
var ANALYZER_FONT = { color: android.graphics.Color.WHITE, size: 20, shadow: 0.5 };
var ANALYZER_FONT_BLUE = { color: android.graphics.Color.rgb(40, 133, 226), size: 20, shadow: 0.5 };
var ANALYZER_FONT_RED = { color: android.graphics.Color.rgb(241, 58, 104), size: 20, shadow: 0.5 };
var ANALYZER_FONT_GREEN = { color: android.graphics.Color.GREEN, size: 20, shadow: 0.5 };
var AnalyzerPage;
(function (AnalyzerPage) {
    AnalyzerPage[AnalyzerPage["GENOME"] = 1] = "GENOME";
    AnalyzerPage[AnalyzerPage["HABITAT"] = 2] = "HABITAT";
    AnalyzerPage[AnalyzerPage["PRODUCTION"] = 3] = "PRODUCTION";
})(AnalyzerPage || (AnalyzerPage = {}));
var AnalyzerUi = /** @class */ (function () {
    function AnalyzerUi() {
    }
    AnalyzerUi.setup = function () {
        this.window = new UI.StandartWindow({
            standard: {
                header: { text: { text: "Portable Analyzer" } },
                inventory: { standard: true },
                background: { standard: true }
            },
            drawing: [
                { type: "bitmap", x: 335, y: 40, bitmap: "forestry.for.alyzer.bg", scale: 2.8 }
            ],
            elements: {
                "slotHoney": { type: "slot", x: 938, y: 40, size: 51, bitmap: "forestry.slots.honey" },
                "slotScanning": { type: "slot", x: 938, y: 91, size: 51, bitmap: "forestry.for.alyzer.slot_q" },
                "slotPhase1": { type: "slot", x: 938, y: 178.4, size: 51, bitmap: "forestry.for.alyzer.slot_1" },
                "slotPhase2": { type: "slot", x: 938, y: 178.4 + 51, size: 51, bitmap: "forestry.for.alyzer.slot_2" },
                "slotPhase3": { type: "slot", x: 938, y: 178.4 + 2 * 51, size: 51, bitmap: "forestry.for.alyzer.slot_3" },
            }
        });
        MachineRegistry.addUiTitleTranslation(this.window);
    };
    AnalyzerUi.clearPages = function () {
        var blackList = ["slotHoney", "slotScanning", "slotPhase1", "slotPhase2", "slotPhase3"];
        var elements = this.window.getContent().elements;
        for (var key in elements) {
            if (blackList.indexOf(key) == -1) {
                // @ts-ignore
                elements[key] = null;
            }
        }
    };
    AnalyzerUi.drawPage = function (page, bee, container) {
        this.clearPages();
        switch (page) {
            case AnalyzerPage.GENOME:
                this.drawGenomePage(bee, container);
                break;
            case AnalyzerPage.HABITAT:
                this.drawHabitatPage(bee);
                break;
            case AnalyzerPage.PRODUCTION:
                this.drawProductionPage(bee, container);
                break;
            default:
                throw new Error("Unknown analyzer page");
        }
    };
    AnalyzerUi.drawGenomePage = function (bee, container) {
        var active = Translation.translate("analyzer.active");
        var inactive = Translation.translate("analyzer.inactive");
        var elements = this.window.getContent().elements;
        var LINE = 50;
        elements["textActive"] = {
            type: "text",
            x: COLUMN_1,
            y: LINE,
            width: (active.length + 1) * (ANALYZER_FONT.size / 2) + 10,
            height: 32,
            font: ANALYZER_FONT,
            text: active
        };
        elements["slotActiveSpecies"] = {
            type: "slot",
            x: COLUMN_1 + ((active.length + 1) * (ANALYZER_FONT.size / 2)) + 10,
            y: LINE - 15,
            visual: true,
            size: 50,
            bitmap: "_default_slot_empty"
        };
        elements["textInactive"] = {
            type: "text",
            x: COLUMN_2,
            y: LINE,
            width: (inactive.length + 1) * (ANALYZER_FONT.size / 2) + 10,
            height: 32,
            font: ANALYZER_FONT,
            text: inactive
        };
        elements["slotInactiveSpecies"] = {
            type: "slot",
            x: COLUMN_2 + ((inactive.length + 1) * (ANALYZER_FONT.size / 2)) + 10,
            y: LINE - 15,
            visual: true,
            size: 50,
            bitmap: "_default_slot_empty"
        };
        LINE += 32;
        elements["textSpecies0"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT,
            text: Translation.translate("analyzer.species")
        };
        elements["textSpecies1"] = {
            type: "text",
            x: COLUMN_1,
            y: LINE,
            width: 200,
            height: 32,
            font: bee.getBeeType().dominant ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: bee.getActiveChromosome("SPECIES")
        };
        elements["textSpecies2"] = {
            type: "text",
            x: COLUMN_2,
            y: LINE,
            width: 200,
            height: 32,
            font: bee.getInactiveBeeType().dominant ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: bee.getInactiveChromosome("SPECIES")
        };
        LINE += 32;
        elements["textLifespan0"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT,
            text: Translation.translate("analyzer.lifespan")
        };
        elements["textLifespan1"] = {
            type: "text",
            x: COLUMN_1,
            y: LINE,
            width: 200,
            height: 32,
            font: BeeRegistry.isDominant("SPECIES", bee.getActiveChromosome("LIFESPAN")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: BeeRegistry.getChromosomeValueName("LIFESPAN", bee.getActiveChromosome("LIFESPAN"))
        };
        elements["textLifespan2"] = {
            type: "text",
            x: COLUMN_2,
            y: LINE,
            width: 200,
            height: 32,
            font: BeeRegistry.isDominant("SPECIES", bee.getInactiveChromosome("LIFESPAN")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: BeeRegistry.getChromosomeValueName("LIFESPAN", bee.getInactiveChromosome("LIFESPAN"))
        };
        LINE += 32;
        elements["textProduction0"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT,
            text: Translation.translate("analyzer.speed")
        };
        elements["textProduction1"] = {
            type: "text",
            x: COLUMN_1,
            y: LINE,
            width: 200,
            height: 32,
            font: BeeRegistry.isDominant("SPEED", bee.getActiveChromosome("SPEED")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: BeeRegistry.getChromosomeValueName("SPEED", bee.getActiveChromosome("SPEED"))
        };
        elements["textProduction2"] = {
            type: "text",
            x: COLUMN_2,
            y: LINE,
            width: 200,
            height: 32,
            font: BeeRegistry.isDominant("SPEED", bee.getInactiveChromosome("SPEED")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: BeeRegistry.getChromosomeValueName("SPEED", bee.getInactiveChromosome("SPEED"))
        };
        LINE += 32;
        elements["textFlowers0"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT,
            text: Translation.translate("analyzer.flowers")
        };
        elements["textFlowers1"] = {
            type: "text",
            x: COLUMN_1,
            y: LINE,
            width: 200,
            height: 32,
            font: BeeRegistry.isDominant("FLOWERS", bee.getFlowers()) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: BeeRegistry.getChromosomeValueName("FLOWERS", bee.getFlowers())
        };
        elements["textFlowers2"] = {
            type: "text",
            x: COLUMN_2,
            y: LINE,
            width: 200,
            height: 32,
            font: BeeRegistry.isDominant("FLOWERS", bee.getInactiveFlowers()) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: BeeRegistry.getChromosomeValueName("FLOWERS", bee.getInactiveFlowers())
        };
        LINE += 32;
        elements["textFertility0"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT,
            text: Translation.translate("analyzer.fertility")
        };
        elements["textFertility1"] = {
            type: "text",
            x: COLUMN_1,
            y: LINE,
            width: 35,
            height: 32,
            font: BeeRegistry.isDominant("FERTILITY", bee.getActiveChromosome("FERTILITY")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: "".concat(bee.getActiveChromosome("FERTILITY"), " x ")
        };
        elements["imageFertility"] = {
            type: "image",
            x: COLUMN_1 + 40,
            y: LINE,
            bitmap: "forestry.for.alyzer.bee",
            scale: 2.5
        };
        elements["textFertility2"] = {
            type: "text",
            x: COLUMN_2,
            y: LINE,
            width: 35,
            height: 32,
            font: BeeRegistry.isDominant("FERTILITY", bee.getInactiveChromosome("FERTILITY")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: "".concat(bee.getInactiveChromosome("FERTILITY"), " x ")
        };
        elements["imageFertility2"] = {
            type: "image",
            x: COLUMN_2 + 40,
            y: LINE,
            bitmap: "forestry.for.alyzer.bee",
            scale: 2.5
        };
        LINE += 32;
        elements["textTerritory0"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT,
            text: Translation.translate("analyzer.territory")
        };
        elements["textTerritory1"] = {
            type: "text",
            x: COLUMN_1,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT_BLUE,
            text: bee.getActiveChromosome("TERRITORY")
        };
        elements["textTerritory2"] = {
            type: "text",
            x: COLUMN_2,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT_BLUE,
            text: bee.getActiveChromosome("TERRITORY")
        };
        LINE += 32;
        elements["textEffect0"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT,
            text: Translation.translate("analyzer.effect")
        };
        elements["textEffect1"] = {
            type: "text",
            x: COLUMN_1,
            y: LINE,
            width: 200,
            height: 32,
            font: BeeRegistry.isDominant("EFFECT", bee.getActiveChromosome("EFFECT")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: BeeRegistry.getChromosomeValueName("EFFECT", bee.getActiveChromosome("EFFECT"))
        };
        elements["textEffect2"] = {
            type: "text",
            x: COLUMN_2,
            y: LINE,
            width: 200,
            height: 32,
            font: BeeRegistry.isDominant("EFFECT", bee.getInactiveChromosome("EFFECT")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: BeeRegistry.getChromosomeValueName("EFFECT", bee.getInactiveChromosome("EFFECT"))
        };
        container.setSlot("slotActiveSpecies", bee.getBeeType().droneID, 1, 0);
        container.setSlot("slotInactiveSpecies", bee.getInactiveBeeType().droneID, 1, 0);
    };
    AnalyzerUi.drawHabitatPage = function (bee) {
        var elements = this.window.getContent().elements;
        var LINE = 50;
        elements["textActive"] = {
            type: "text",
            x: COLUMN_1,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT,
            text: Translation.translate("analyzer.active")
        };
        elements["textInactive"] = {
            type: "text",
            x: COLUMN_2,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT,
            text: Translation.translate("analyzer.inactive")
        };
        LINE += 32;
        elements["textClimate0"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT,
            text: Translation.translate("analyzer.climate")
        };
        elements["textClimate1"] = {
            type: "text",
            x: COLUMN_1,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT_BLUE,
            text: BeeRegistry.getChromosomeValueName("CLIMATE", bee.getClimate())
        };
        elements["textClimate2"] = {
            type: "text",
            x: COLUMN_2,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT_BLUE,
            text: BeeRegistry.getChromosomeValueName("CLIMATE", bee.getInactiveClimate())
        };
        LINE += 32;
        elements["textClimateTol0"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 180,
            height: 32,
            font: ANALYZER_FONT,
            text: "   ".concat(Translation.translate("analyzer.tolerance"))
        };
        elements["textClimateTol1"] = {
            type: "text",
            x: COLUMN_1 + 38,
            y: LINE,
            width: 162,
            height: 32,
            font: BeeRegistry.isDominant("TOLERANCE", bee.getActiveChromosome("TEMPERATURE_TOLERANCE")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: bee.getClimateTolValue().toString(),
        };
        elements["imageClimateActive"] = {
            type: "image",
            x: COLUMN_1,
            y: LINE,
            bitmap: bee.getActiveChromosome("TEMPERATURE_TOLERANCE") === 0 ? "forestry.for.alyzer.tolerance_none" : (bee.getActiveChromosome("TEMPERATURE_TOLERANCE") < 6 ? "forestry.for.alyzer.tolerance_both" : (bee.getActiveChromosome("TEMPERATURE_TOLERANCE") < 11 ? "forestry.for.alyzer.tolerance_up" : "forestry.for.alyzer.tolerance_down")),
            scale: 2.5
        };
        elements["textClimateTol2"] = {
            type: "text",
            x: COLUMN_2 + 38,
            y: LINE,
            width: 162,
            height: 32,
            font: BeeRegistry.isDominant("TOLERANCE", bee.getInactiveChromosome("TEMPERATURE_TOLERANCE")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: bee.getInactiveClimateTolValue().toString(),
        };
        elements["imageClimateInactive"] = {
            type: "image",
            x: COLUMN_2,
            y: LINE,
            bitmap: bee.getInactiveChromosome("TEMPERATURE_TOLERANCE") === 0 ? "forestry.for.alyzer.tolerance_none" : (bee.getInactiveChromosome("TEMPERATURE_TOLERANCE") < 6 ? "forestry.for.alyzer.tolerance_both" : (bee.getInactiveChromosome("TEMPERATURE_TOLERANCE") < 11 ? "forestry.for.alyzer.tolerance_up" : "forestry.for.alyzer.tolerance_down")),
            scale: 2.5
        };
        LINE += 32;
        elements["textHumidity0"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT,
            text: Translation.translate("analyzer.humidity")
        };
        elements["textHumidity1"] = {
            type: "text",
            x: COLUMN_1,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT_BLUE,
            text: BeeRegistry.getChromosomeValueName("HUMIDITY", bee.getHumidity())
        };
        elements["textHumidity2"] = {
            type: "text",
            x: COLUMN_2,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT_BLUE,
            text: BeeRegistry.getChromosomeValueName("HUMIDITY", bee.getInactiveHumidity())
        };
        LINE += 32;
        elements["textHumidityTol0"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 180,
            height: 32,
            font: ANALYZER_FONT,
            text: "  ".concat(Translation.translate("analyzer.tolerance"))
        };
        elements["textHumidityTol1"] = {
            type: "text",
            x: COLUMN_1 + 38,
            y: LINE,
            width: 162,
            height: 32,
            font: BeeRegistry.isDominant("TOLERANCE", bee.getActiveChromosome("HUMIDITY_TOLERANCE")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: bee.getHumidityTolValue().toString(),
        };
        elements["imageHumidityActive"] = {
            type: "image",
            x: COLUMN_1,
            y: LINE,
            bitmap: bee.getActiveChromosome("HUMIDITY_TOLERANCE") === 0 ? "forestry.for.alyzer.tolerance_none" : (bee.getActiveChromosome("HUMIDITY_TOLERANCE") < 6 ? "forestry.for.alyzer.tolerance_both" : (bee.getActiveChromosome("HUMIDITY_TOLERANCE") < 11 ? "forestry.for.alyzer.tolerance_up" : "forestry.for.alyzer.tolerance_down")),
            scale: 2.5
        };
        elements["textHumidityTol2"] = {
            type: "text",
            x: COLUMN_2 + 38,
            y: LINE,
            width: 162,
            height: 32,
            font: BeeRegistry.isDominant("TOLERANCE", bee.getInactiveChromosome("HUMIDITY_TOLERANCE")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: bee.getInactiveHumidityTolValue().toString(),
        };
        elements["imageHumidityInactive"] = {
            type: "image",
            x: COLUMN_2,
            y: LINE,
            bitmap: bee.getInactiveChromosome("HUMIDITY_TOLERANCE") === 0 ? "forestry.for.alyzer.tolerance_none" : (bee.getInactiveChromosome("HUMIDITY_TOLERANCE") < 6 ? "forestry.for.alyzer.tolerance_both" : (bee.getInactiveChromosome("HUMIDITY_TOLERANCE") < 11 ? "forestry.for.alyzer.tolerance_up" : "forestry.for.alyzer.tolerance_down")),
            scale: 2.5
        };
        LINE += 32;
        elements["textDiurnal0"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT,
            text: Translation.translate("analyzer.diurnal")
        };
        elements["textDiurnal1"] = {
            type: "text",
            x: COLUMN_1,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT_BLUE,
            text: Translation.translate("analyzer.yes")
        };
        elements["textDiurnal2"] = {
            type: "text",
            x: COLUMN_2,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT_BLUE,
            text: Translation.translate("analyzer.no")
        };
        LINE += 32;
        elements["textNocturnal0"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT,
            text: Translation.translate("analyzer.nocturnal")
        };
        elements["textNocturnal1"] = {
            type: "text",
            x: COLUMN_1,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT_BLUE,
            text: bee.getActiveChromosome("NEVER_SLEEPS") === true ? Translation.translate("analyzer.yes") : Translation.translate("analyzer.no")
        };
        elements["textNocturnal2"] = {
            type: "text",
            x: COLUMN_2,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT_BLUE,
            text: bee.getInactiveChromosome("NEVER_SLEEPS") === true ? Translation.translate("analyzer.yes") : Translation.translate("analyzer.no")
        };
        LINE += 32;
        elements["textFlyer0"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT,
            text: Translation.translate("analyzer.flyer")
        };
        elements["textFlyer1"] = {
            type: "text",
            x: COLUMN_1,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT_BLUE,
            text: bee.getActiveChromosome("TOLERATES_RAIN") === true ? Translation.translate("analyzer.yes") : Translation.translate("analyzer.no")
        };
        elements["textFlyer2"] = {
            type: "text",
            x: COLUMN_2,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT_BLUE,
            text: bee.getInactiveChromosome("TOLERATES_RAIN") === true ? Translation.translate("analyzer.yes") : Translation.translate("analyzer.no")
        };
        LINE += 32;
        elements["textCave0"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT,
            text: Translation.translate("analyzer.cave")
        };
        elements["textCave1"] = {
            type: "text",
            x: COLUMN_1,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT_BLUE,
            text: bee.getActiveChromosome("CAVE_DWELLING") === true ? Translation.translate("analyzer.yes") : Translation.translate("analyzer.no")
        };
        elements["textCave2"] = {
            type: "text",
            x: COLUMN_2,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT_BLUE,
            text: bee.getInactiveChromosome("CAVE_DWELLING") === true ? Translation.translate("analyzer.yes") : Translation.translate("analyzer.no")
        };
        LINE += 32;
        var stock = bee.pristine ? Translation.translate("analyzer.pristine") : Translation.translate("analyzer.ignoble");
        var generation = "".concat(bee.generation, " ").concat(Translation.translate("analyzer.generation"));
        elements["textStock"] = {
            type: "text",
            x: 335 + ((590 - stock.length * (ANALYZER_FONT_GREEN.size / 2)) / 2),
            y: LINE,
            width: stock.length * (ANALYZER_FONT_GREEN.size / 2) + 50,
            height: 32,
            font: ANALYZER_FONT_GREEN,
            text: stock
        };
        LINE += 32;
        elements["textGeneration"] = {
            type: "text",
            x: 335 + (590 - generation.length * (ANALYZER_FONT_GREEN.size / 2)) / 2,
            y: LINE,
            width: generation.length * (ANALYZER_FONT_GREEN.size / 2) + 50,
            height: 32,
            font: ANALYZER_FONT_GREEN,
            text: generation
        };
    };
    AnalyzerUi.drawProductionPage = function (bee, container) {
        var elements = this.window.getContent().elements;
        var LINE = 50;
        elements["textProduce"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 500,
            height: 32,
            font: ANALYZER_FONT,
            text: "".concat(Translation.translate("analyzer.produce"), ":")
        };
        LINE += 32;
        var produce = bee.getProduce();
        var t = 0;
        for (var key in produce) {
            elements["slotProduce".concat(t)] = {
                type: "slot",
                x: COLUMN_0 + (t * 60),
                y: LINE,
                size: 50,
                visual: true,
                bitmap: "_default_slot_empty"
            };
            t++;
        }
        LINE = 250;
        elements["textSpecialty"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 500,
            height: 32,
            font: ANALYZER_FONT,
            text: "".concat(Translation.translate("analyzer.specialty"), ":")
        };
        LINE += 32;
        var specialty = bee.getSpecialty();
        t = 0;
        for (var key in specialty) {
            elements["slotSpecialty".concat(t)] = {
                type: "slot",
                x: COLUMN_0 + (t * 60),
                y: LINE,
                size: 50,
                visual: true,
                bitmap: "_default_slot_empty"
            };
            t++;
        }
        t = 0;
        for (var key in produce) {
            container.setSlot("slotProduce".concat(t), produce[key][0], 1, produce[key][1]);
            t++;
        }
        t = 0;
        for (var key in specialty) {
            container.setSlot("slotSpecialty".concat(t), specialty[key][0], 1, specialty[key][1]);
            t++;
        }
    };
    return AnalyzerUi;
}());
AnalyzerUi.setup();
var AnalyzerManager = /** @class */ (function () {
    function AnalyzerManager() {
    }
    AnalyzerManager.setupClient = function () {
        ItemContainer.registerScreenFactory("forestry_pe.analyzer", function () {
            return AnalyzerUi.window;
        });
        ItemContainer.addClientEventListener("forestry_pe.analyzer", "clearUi", function () {
            AnalyzerUi.clearPages();
        });
        ItemContainer.addClientEventListener("forestry_pe.analyzer", "drawPage", function (container, window, content, data) {
            var bee = BeeRegistry.getBeeFromScope(data.bee);
            AnalyzerUi.drawPage(data.page, bee, container);
        });
    };
    /**
     * Opens the analyzer interface for the {@link player} if they are holding an analyzer.
     */
    AnalyzerManager.openUiFor = function (player) {
        var actor = new PlayerActor(player);
        var selectedSlot = actor.getSelectedSlot();
        var item = actor.getInventorySlot(selectedSlot);
        if (item.id !== ItemID.analyzer) {
            return;
        }
        //The item's data is used as unique id for the container
        //Zero if id has not been generated yet
        if (!item.data) {
            item.data = this.nextId++;
            actor.setInventorySlot(selectedSlot, item.id, item.count, item.data, item.extra);
        }
        //InnerCore does not support storing keys as numbers in save files
        var container = this.containers["c".concat(item.data)];
        if (!container) {
            container = new ItemContainer();
            this.setupContainer(container);
            this.containers["c".concat(item.data)] = container;
        }
        var client = Network.getClientForPlayer(player);
        if (client) {
            container.openFor(client, "main");
        }
    };
    AnalyzerManager.getContainer = function (analyzerId) {
        return this.containers["c".concat(analyzerId)];
    };
    AnalyzerManager.getState = function () {
        return {
            nextId: this.nextId,
            containers: this.containers,
        };
    };
    AnalyzerManager.resetState = function () {
        this.nextId = 1;
        this.containers = {};
    };
    AnalyzerManager.restoreState = function (scope) {
        this.nextId = scope.nextId;
        this.containers = scope.containers;
        for (var key in this.containers) {
            this.setupContainer(this.containers[key]);
        }
    };
    AnalyzerManager.setupContainer = function (container) {
        container.setClientContainerTypeName("forestry_pe.analyzer");
        var pageBySlot = {
            slotPhase1: AnalyzerPage.GENOME,
            slotPhase2: AnalyzerPage.HABITAT,
            slotPhase3: AnalyzerPage.PRODUCTION,
        };
        container.addServerOpenListener(function () {
            var e_14, _a;
            try {
                for (var _b = __values(Object.keys(pageBySlot)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    var slot = container.getSlot(key);
                    if (slot.id) {
                        var bee = BeeRegistry.getBeeFromItem(slot.id, slot.data);
                        if (bee.analyzed) {
                            container.sendEvent("drawPage", { page: pageBySlot[key], bee: bee.getSaveScope() });
                        }
                        return;
                    }
                }
            }
            catch (e_14_1) { e_14 = { error: e_14_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_14) throw e_14.error; }
            }
        });
        container.setGlobalAddTransferPolicy(function (container, name, id, count) {
            var e_15, _a;
            if (name !== "slotHoney") {
                //Only allow one item to be scanned at a time
                var slots = ["slotScanning", "slotPhase1", "slotPhase2", "slotPhase3"];
                try {
                    for (var slots_1 = __values(slots), slots_1_1 = slots_1.next(); !slots_1_1.done; slots_1_1 = slots_1.next()) {
                        var slotName = slots_1_1.value;
                        if (container.getSlot(slotName).id !== 0) {
                            return 0;
                        }
                    }
                }
                catch (e_15_1) { e_15 = { error: e_15_1 }; }
                finally {
                    try {
                        if (slots_1_1 && !slots_1_1.done && (_a = slots_1.return)) _a.call(slots_1);
                    }
                    finally { if (e_15) throw e_15.error; }
                }
            }
            var slot = container.getSlot(name);
            return Math.min(slot.count + count, Item.getMaxStack(id)) - slot.count;
        });
        container.setGlobalDirtySlotListener(function (container, name, slot) {
            var id = slot.id, data = slot.data;
            if (!id) { //If player consume item from slot
                if (name !== "slotHoney") {
                    container.sendEvent("clearUi", {});
                }
                return;
            }
            else if (name === "slotHoney") {
                container.validateSlot("slotHoney");
                return;
            }
            if (name === "slotScanning") {
                AnalyzerManager.tryScan(container);
                return;
            }
            var bee = BeeRegistry.getBeeFromItem(id, data);
            if (!bee.analyzed) {
                return;
            }
            var page = pageBySlot[name];
            if (!page) {
                throw new Error("Page not found for '".concat(name, "'"));
            }
            container.sendEvent("drawPage", { page: page, bee: bee.getSaveScope() });
        });
    };
    AnalyzerManager.tryScan = function (container) {
        var _a = container.getSlot("slotScanning"), id = _a.id, count = _a.count, data = _a.data, extra = _a.extra;
        if (!id || !BeeRegistry.isBee(id)) {
            return;
        }
        var bee = BeeRegistry.getBeeFromItem(id, data);
        if (!bee.analyzed) {
            if (this.consumeHoney(container)) {
                bee.analyzed = true;
                bee.save();
            }
            else
                return;
        }
        container.setSlot("slotScanning", 0, 0, 0);
        container.setSlot("slotPhase1", id, count, bee.unique, extra);
        container.sendChanges();
    };
    AnalyzerManager.consumeHoney = function (container) {
        var slot = container.getSlot("slotHoney");
        if (slot.id !== ItemID.honeyDrop && slot.id !== ItemID.honeydew) {
            return false;
        }
        container.setSlot("slotHoney", slot.id, slot.count - 1, slot.data, slot.extra);
        container.validateSlot("slotHoney");
        return true;
    };
    AnalyzerManager.nextId = 1;
    AnalyzerManager.containers = {};
    return AnalyzerManager;
}());
Callback.addCallback("LevelLeft", function () {
    AnalyzerManager.resetState();
});
Saver.addSavesScope("ForestryPEAnalyzers", function read(scope) {
    if (scope) {
        AnalyzerManager.restoreState(scope);
    }
}, function save() {
    return AnalyzerManager.getState();
});
AnalyzerManager.setupClient();
Item.registerUseFunction(ItemID.analyzer, function (coords, item, block, player) {
    AnalyzerManager.openUiFor(player);
});
IDRegistry.genItemID("analyzer");
Item.createItem("analyzer", "Portable Analyzer", { name: "analyzer", meta: 0 }, { stack: 1 });
ItemUtils.addContainsTooltip(ItemID.analyzer, function (item) {
    return AnalyzerManager.getContainer(item.data);
});
IDRegistry.genItemID("helmetApiarist");
Item.createArmorItem("helmetApiarist", "Apiarist's Hat", { name: "apiarist_helmet" }, {
    type: "helmet",
    armor: 1,
    durability: 100,
    texture: "armor/apiarist_armor_1.png"
});
IDRegistry.genItemID("chestApiarist");
Item.createArmorItem("chestApiarist", "Apiarist's Shirt", { name: "apiarist_chest" }, {
    type: "chestplate",
    armor: 3,
    durability: 100,
    texture: "armor/apiarist_armor_1.png"
});
IDRegistry.genItemID("leggingsApiarist");
Item.createArmorItem("leggingsApiarist", "Apiarist's Pants", { name: "apiarist_legs" }, {
    type: "leggings",
    armor: 2,
    durability: 100,
    texture: "armor/apiarist_armor_2.png"
});
IDRegistry.genItemID("bootsApiarist");
Item.createArmorItem("bootsApiarist", "Apiarist's Shoes", { name: "apiarist_boots" }, {
    type: "boots",
    armor: 1,
    durability: 100,
    texture: "armor/apiarist_armor_1.png"
});
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: ItemID.helmetApiarist, count: 1, data: 0 }, [
        "www",
        "w w",
        "   "
    ], ['w', ItemID.wovenSilk, -1]);
    Recipes.addShaped({ id: ItemID.chestApiarist, count: 1, data: 0 }, [
        "w w",
        "www",
        "www"
    ], ['w', ItemID.wovenSilk, -1]);
    Recipes.addShaped({ id: ItemID.leggingsApiarist, count: 1, data: 0 }, [
        "www",
        "w w",
        "w w"
    ], ['w', ItemID.wovenSilk, -1]);
    Recipes.addShaped({ id: ItemID.bootsApiarist, count: 1, data: 0 }, [
        "   ",
        "w w",
        "w w"
    ], ['w', ItemID.wovenSilk, -1]);
});
IDRegistry.genItemID("combCocoa");
Item.createItem("combCocoa", "Cocoa Comb", { name: "combCocoa", meta: 0 }, {});
IDRegistry.genItemID("combDripping");
Item.createItem("combDripping", "Dripping Comb", { name: "combDripping", meta: 0 }, {});
IDRegistry.genItemID("combHoney");
Item.createItem("combHoney", "Honey Comb", { name: "combHoney", meta: 0 }, {});
IDRegistry.genItemID("combFrozen");
Item.createItem("combFrozen", "Frozen Comb", { name: "combFrozen", meta: 0 }, {});
IDRegistry.genItemID("combMellow");
Item.createItem("combMellow", "Mellow Comb", { name: "combMellow", meta: 0 }, {});
IDRegistry.genItemID("combMossy");
Item.createItem("combMossy", "Mossy Comb", { name: "combMossy", meta: 0 }, {});
IDRegistry.genItemID("combMysterious");
Item.createItem("combMysterious", "Mysterious Comb", { name: "combMysterious", meta: 0 }, {});
IDRegistry.genItemID("combParched");
Item.createItem("combParched", "Parched Comb", { name: "combParched", meta: 0 }, {});
IDRegistry.genItemID("combPowdery");
Item.createItem("combPowdery", "Powdery Comb", { name: "combPowdery", meta: 0 }, {});
IDRegistry.genItemID("combSilky");
Item.createItem("combSilky", "Silky Comb", { name: "combSilky", meta: 0 }, {});
IDRegistry.genItemID("combSimmering");
Item.createItem("combSimmering", "Simmering Comb", { name: "combSimmering", meta: 0 }, {});
IDRegistry.genItemID("combStringy");
Item.createItem("combStringy", "Stringy Comb", { name: "combStringy", meta: 0 }, {});
IDRegistry.genItemID("combWheaten");
Item.createItem("combWheaten", "Wheaten Comb", { name: "combWheaten", meta: 0 }, {});
IDRegistry.genItemID("combIrradiated");
Item.createItem("combIrradiated", "Irradiated Comb", { name: "combIrradiated", meta: 0 }, {});
COMBS.push(ItemID.combCocoa);
COMBS.push(ItemID.combDripping);
COMBS.push(ItemID.combHoney);
COMBS.push(ItemID.combFrozen);
COMBS.push(ItemID.combMellow);
COMBS.push(ItemID.combMossy);
COMBS.push(ItemID.combMysterious);
COMBS.push(ItemID.combParched);
COMBS.push(ItemID.combPowdery);
COMBS.push(ItemID.combSilky);
COMBS.push(ItemID.combSimmering);
COMBS.push(ItemID.combStringy);
COMBS.push(ItemID.combWheaten);
COMBS.push(ItemID.combIrradiated);
Item.addCreativeGroup(GROUP_COMBS, GROUP_COMBS_NAME, COMBS);
BeeFrame.registerFrame({
    codeName: "frameUntreated",
    localize: { en: "Untreated Frame", ru: "Необработанная рамка" },
    modifier: {
        getProductionModifier: function () {
            return 2;
        },
        getGeneticDecay: function () {
            return 0.9;
        }
    },
    durability: 80
});
Item.registerNameOverrideFunction(ItemID.frameUntreated, function (item, name) { return name + "§7\nProduction: 2.0x\nGenetic Decay: 0.9x\nDurability: " + (80 - item.data); });
BeeFrame.registerFrame({
    codeName: "frameImpregnated",
    localize: { en: "Impregnated Frame", ru: "Пропитанная рамка" },
    modifier: {
        getProductionModifier: function () {
            return 2;
        },
        getGeneticDecay: function () {
            return 0.4;
        }
    },
    durability: 240
});
Item.registerNameOverrideFunction(ItemID.frameImpregnated, function (item, name) { return name + "§7\nProduction: 2.0x\nGenetic Decay: 0.4x\nDurability: " + (240 - item.data); });
BeeFrame.registerFrame({
    codeName: "frameProven",
    localize: { en: "Proven Frame", ru: "Проверенная рамка" },
    modifier: {
        getProductionModifier: function () {
            return 2;
        },
        getGeneticDecay: function () {
            return 0.3;
        }
    },
    durability: 720
});
Item.registerNameOverrideFunction(ItemID.frameProven, function (item, name) { return name + "§7\nProduction: 2.0x\nGenetic Decay: 0.3x\nDurability: " + (720 - item.data); });
Item.addCreativeGroup(GROUP_FRAMES, GROUP_FRAMES_NAME, [ItemID.frameUntreated, ItemID.frameImpregnated, ItemID.frameProven]);
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: ItemID.frameUntreated, count: 1, data: 0 }, [
        "sss",
        "sws",
        "sss"
    ], ['w', 287, -1, 's', 280, -1]);
    Recipes.addShaped({ id: ItemID.frameImpregnated, count: 1, data: 0 }, [
        "sss",
        "sws",
        "sss"
    ], ['w', 287, -1, 's', ItemID.stickImpregnated, -1]);
});
IDRegistry.genItemID("honeyedSlice");
Item.createFoodItem("honeyedSlice", "Honeyed Slice", { name: "honeyedSlice", meta: 0 }, { food: 10 });
IDRegistry.genItemID("honeyPot");
Item.createFoodItem("honeyPot", "Honey Pot", { name: "honeyPot", meta: 0 }, { food: 2 });
IDRegistry.genItemID("ambrosia");
Item.createFoodItem("ambrosia", "Ambrosia", { name: "ambrosia", meta: 0 }, { food: 8 });
Callback.addCallback("FoodEaten", function (food, ratio, player) {
    var actor = new PlayerActor(player);
    var carriedItem = actor.getInventorySlot(actor.getSelectedSlot());
    if (carriedItem.id === ItemID.ambrosia) {
        Entity.addEffect(Player.get(), EPotionEffect.REGENERATION, 40, 1, true, true);
    }
});
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: ItemID.honeyPot, count: 1, data: 0 }, [
        "h h",
        " m ",
        "h h"
    ], ['h', ItemID.honeyDrop, 0, 'm', ItemID.waxCapsuleEmpty, 0]);
    Recipes.addShaped({ id: ItemID.ambrosia, count: 1, data: 0 }, [
        "wcw",
        "hhh",
        "www"
    ], ['w', ItemID.royalJelly, 0, 'h', ItemID.honeydew, 0, 'c', ItemID.waxCapsuleEmpty, 0]);
    Recipes.addShaped({ id: ItemID.honeyedSlice, count: 4, data: 0 }, [
        "sss",
        "sws",
        "sss"
    ], ['w', 297, -1, 's', ItemID.honeyDrop, -1]);
});
IDRegistry.genItemID("honeyDrop");
Item.createItem("honeyDrop", "Honey Drop", { name: "honeyDrop", meta: 0 }, {});
IDRegistry.genItemID("beeswax");
Item.createItem("beeswax", "Beeswax", { name: "beeswax", meta: 0 }, {});
IDRegistry.genItemID("honeydew");
Item.createItem("honeydew", "Honeydew", { name: "honeydew", meta: 0 }, {});
IDRegistry.genItemID("propolis");
Item.createItem("propolis", "Propolis", { name: "propolis", meta: 0 }, {});
IDRegistry.genItemID("propolisSilky");
Item.createItem("propolisSilky", "Silky Propolis", { name: "propolis", meta: 1 }, {});
IDRegistry.genItemID("propolisPulse");
Item.createItem("propolisPulse", "Pulsating Propolis", { name: "propolis", meta: 2 }, {});
IDRegistry.genItemID("refractoryWax");
Item.createItem("refractoryWax", "Refractory Wax", { name: "refractoryWax", meta: 0 }, {});
IDRegistry.genItemID("phosphor");
Item.createItem("phosphor", "Phosphor", { name: "phosphor", meta: 0 }, {});
IDRegistry.genItemID("pollen");
Item.createItem("pollen", "Crystalline Pollen Cluster", { name: "pollen", meta: 0 }, {});
IDRegistry.genItemID("pollen1");
Item.createItem("pollen1", "Pollen Cluster", { name: "pollen", meta: 1 }, {});
IDRegistry.genItemID("royalJelly");
Item.createItem("royalJelly", "Royal Jelly", { name: "royalJelly", meta: 0 }, {});
IDRegistry.genItemID("iceShard");
Item.createItem("iceShard", "Ice Shard", { name: "iceShard", meta: 0 }, {});
IDRegistry.genItemID("silkWisp");
Item.createItem("silkWisp", "Silk Wisp", { name: "silkWisp", meta: 0 }, {});
IDRegistry.genItemID("wovenSilk");
Item.createItem("wovenSilk", "Woven Silk", { name: "wovenSilk", meta: 0 }, {});
IDRegistry.genItemID("waxCast");
Item.createItem("waxCast", "Wax Cast", { name: "waxCast", meta: 0 }, {});
IDRegistry.genItemID("pulsatingMesh");
Item.createItem("pulsatingMesh", "Pulsating Mesh", { name: "pulsatingMesh", meta: 0 }, {});
IDRegistry.genItemID("stickImpregnated");
Item.createItem("stickImpregnated", "Impregnated Stick", { name: "stickImpregnated", meta: 0 }, {});
IDRegistry.genItemID("scentedPaneling");
Item.createItem("scentedPaneling", "Scented Paneling", { name: "scentedPaneling", meta: 0 }, {});
Item.addCreativeGroup(GROUP_PROPOLIS, GROUP_PROPOLIS_NAME, [ItemID.propolis, ItemID.propolisSilky, ItemID.propolisPulse]);
Item.addCreativeGroup(GROUP_POLLEN, GROUP_POLLEN_NAME, [ItemID.pollen, ItemID.pollen1]);
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: 382, count: 1, data: 0 }, [
        "hdh",
        "hmh",
        "hdh"
    ], ['h', ItemID.honeyDrop, 0, 'd', ItemID.honeydew, 0, 'm', 360, 0]);
    Recipes.addShaped({ id: 341, count: 1, data: 0 }, [
        "pdp",
        "pdp",
        "pdp"
    ], ['p', ItemID.propolis, 0, 'd', ItemID.pollen1, 0]);
    Recipes.addShaped({ id: 287, count: 1, data: 0 }, [
        " w ",
        " w ",
        " w "
    ], ['w', ItemID.silkWisp, 0]);
    Recipes.addShaped({ id: ItemID.pulsatingMesh, count: 1, data: 0 }, [
        "w w",
        " w ",
        "w w"
    ], ['w', ItemID.propolisPulse, -1]);
    Recipes.addShaped({ id: ItemID.waxCast, count: 1, data: 0 }, [
        "www",
        "w w",
        "www"
    ], ['w', ItemID.beeswax, -1]);
    Recipes.addShaped({ id: 50, count: 1, data: 0 }, [
        " W ",
        " W ",
        " S "
    ], ['W', ItemID.beeswax, -1, 'S', 280, -1]);
});
IDRegistry.genBlockID("alveary");
Block.createBlock("alveary", [
    { name: "Alveary", texture: [["alveary_bottom", 0], ["alveary_bottom", 0], ["alveary_plain", 0]], inCreative: true }
]);
ToolAPI.registerBlockMaterial(BlockID.alveary_misc, "wood");
ApiaryRegistry.register(BlockID.alveary);
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: BlockID.alveary, count: 1, data: 0 }, [
        "ddd",
        "dmd",
        "ddd"
    ], ['m', ItemID.impregnatedCasing, 0, 'd', ItemID.scentedPaneling, 0]);
});
IDRegistry.genBlockID("alvearyFan");
Block.createBlock("alvearyFan", [
    { name: "Alveary Fan", texture: [["alveary_fan", 0]], inCreative: true }
]);
ToolAPI.registerBlockMaterial(BlockID.alvearyFan, "wood");
ApiaryRegistry.register(BlockID.alvearyFan);
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: BlockID.alvearyFan, count: 1, data: 0 }, [
        "i i",
        " m ",
        "igi"
    ], ['i', 265, 0, 'm', BlockID.alveary, 0, 'g', ItemID.thermionicTubeGold, 0]);
});
MachineRegistry.registerConsumer(BlockID.alvearyFan, {
    useNetworkItemContainer: true,
    defaultValues: {},
    alvearyTick: function (tile) {
        if (this.data.energy >= 10 && tile.climate !== undefined) {
            this.data.energy -= 10;
            tile.climate = Math.max(Temperature.ICY, Math.round(tile.climate - (tile.climate * 0.2)));
        }
    },
    getEnergyStorage: function () {
        return 40;
    },
});
IDRegistry.genBlockID("alvearyHeater");
Block.createBlock("alvearyHeater", [
    { name: "Alveary Heater", texture: [["alveary_heater", 0]], inCreative: true }
]);
ToolAPI.registerBlockMaterial(BlockID.alvearyHeater, "wood");
ApiaryRegistry.register(BlockID.alvearyHeater);
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: BlockID.alvearyHeater, count: 1, data: 0 }, [
        "gig",
        " m ",
        "sss"
    ], ['i', 265, 0, 'm', BlockID.alveary, 0, 'g', ItemID.thermionicTubeGold, 0, 's', 1, 0]);
});
MachineRegistry.registerConsumer(BlockID.alvearyHeater, {
    useNetworkItemContainer: true,
    defaultValues: {},
    alvearyTick: function (tile) {
        if (this.data.energy >= 10 && tile.climate !== undefined) {
            this.data.energy -= 10;
            tile.climate = Math.max(Temperature.HELLISH, parseInt(tile.climate + (tile.climate * 0.2)));
        }
    },
    getEnergyStorage: function () {
        return 40;
    },
});
IDRegistry.genBlockID("alvearyHygroregulator");
Block.createBlock("alvearyHygroregulator", [
    { name: "Alveary Hygroregulator", texture: [["alveary_valve", 0]], inCreative: true }
]);
ToolAPI.registerBlockMaterial(BlockID.alvearyHygroregulator, "wood");
ApiaryRegistry.register(BlockID.alvearyHygroregulator);
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: BlockID.alvearyHygroregulator, count: 1, data: 0 }, [
        "gig",
        "gmg",
        "gig"
    ], ['i', 265, 0, 'm', BlockID.alveary, 0, 'g', 20, 0]);
});
var alvearyHygroregulatorGUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: "Alveary Hygroregulator"
            }
        },
        inventory: {
            standard: true
        },
        background: {
            standard: true
        }
    },
    drawing: [
        { type: "bitmap", x: 335, y: 40, bitmap: "forestry.bgs.liquid_1", scale: 3.2 },
    ],
    elements: {
        "liquidScale": {
            type: "scale",
            x: 338.2,
            y: 43.2,
            direction: 1,
            value: 0,
            bitmap: "forestry.bgs.liquid_2",
            scale: 3.2
        },
        "slotLiquid": { type: "slot", x: 400, y: 65, bitmap: "forestry.slots.liquid" },
        "slotContainer": { type: "slot", x: 400, y: 150, bitmap: "forestry.slots.container" }
    }
});
MachineRegistry.addUiTitleTranslation(alvearyHygroregulatorGUI);
MachineRegistry.registerDefault(BlockID.alvearyHygroregulator, {
    useNetworkItemContainer: true,
    defaultValues: {
        time: 0,
        humidity: 0,
        climate: 0
    },
    init: function () {
        this.liquidStorage.setLimit(null, 10);
    },
    tick: function () {
        var liquidStored = this.liquidStorage.getLiquidStored();
        if (this.data.time <= 0) {
            if (this.liquidStorage.getAmount(liquidStored)) {
                this.liquidStorage.getLiquid(liquidStored, 0.001);
                if (liquidStored === "water") {
                    this.data.time = 1;
                    this.data.humidity = 2;
                    this.data.climate = -1;
                }
                else {
                    this.data.time = 10;
                    this.data.humidity = -1;
                    this.data.climate = 2;
                }
            }
        }
        else {
            this.data.time--;
        }
        var slotContainerFull = this.container.getSlot("slotLiquid");
        if (slotContainerFull.id) {
            ContainerHelper.drainContainer2(liquidStored, this, "slotLiquid", "slotContainer");
        }
        this.updateLiquidScale("liquidScale", liquidStored);
        this.container.validateAll();
        this.container.sendChanges();
    },
    alvearyTick: function (tile) {
        if (this.data.time && tile.humidity !== undefined) {
            tile.humidity = Math.min(Humidity.DAMP, tile.humidity + this.data.humidity);
        }
        if (this.data.time && tile.climate !== undefined) {
            tile.climate = Math.min(Temperature.HELLISH, tile.climate + this.data.climate);
        }
    },
    getScreenByName: function () {
        return alvearyHygroregulatorGUI;
    },
});
IDRegistry.genBlockID("alveary_misc");
Block.createBlock("alveary_misc", [
    { name: "misc", texture: [["alveary_misc", 0]], inCreative: false }
]);
IDRegistry.genBlockID("alveary_misc_center");
Block.createBlock("alveary_misc_center", [
    { name: "Alveary Controller", texture: [["alveary_heater", 0]], inCreative: true }
]);
ToolAPI.registerBlockMaterial(BlockID.alveary_misc, "unbreaking");
ToolAPI.registerBlockMaterial(BlockID.alveary_misc, "wood");
ApiaryRegistry.register(BlockID.alveary_misc_center);
ApiaryRegistry.register(BlockID.alveary_misc);
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: BlockID.alveary_misc_center, count: 1, data: 0 }, [
        "ggg",
        "sss",
        "ggg"
    ], ['g', ItemID.thermionicTubeGold, 0, 's', 1, 0]);
});
var alvearyGUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: "Apiary"
            }
        },
        inventory: {
            standard: true
        },
        background: {
            standard: true
        }
    },
    drawing: [
        { type: "bitmap", x: 335, y: 50, bitmap: "forestry.for.alveary.bg", scale: 3.2 }
    ],
    elements: {
        "progressScale": {
            type: "scale",
            x: 351,
            y: 109,
            direction: 1,
            value: 0,
            invert: true,
            bitmap: "forestry.for.apiary.scale_green",
            scale: 3.2
        },
        "slot1": {
            type: "slot",
            x: 370,
            y: 106,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "slot2": {
            type: "slot",
            x: 370,
            y: 189.2,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "slotProduct0": {
            type: "slot",
            x: 648.4,
            y: 64,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "slotProduct1": {
            type: "slot",
            x: 581.2,
            y: 107.6,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "slotProduct2": {
            type: "slot",
            x: 715.2,
            y: 107.6,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "slotProduct3": {
            type: "slot",
            x: 648.2,
            y: 149.2,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "slotProduct4": {
            type: "slot",
            x: 581.2,
            y: 190.8,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "slotProduct5": {
            type: "slot",
            x: 648.4,
            y: 232.4,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "slotProduct6": {
            type: "slot",
            x: 715.6,
            y: 190.8,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "error": {
            type: "text",
            x: 345,
            y: 320,
            width: 500,
            height: 30,
            text: "",
        },
    }
});
MachineRegistry.addUiTitleTranslation(alvearyGUI);
var directions = [
    { x: 1, y: 0, z: 0 },
    { x: -1, y: 0, z: 0 },
    { x: 0, y: 0, z: 1 },
    { x: 0, y: 0, z: -1 }
];
TileEntity.registerPrototype(BlockID.alveary_misc_center, {
    useNetworkItemContainer: true,
    OUTPUT_SLOTS: ["slotProduct0", "slotProduct1", "slotProduct2", "slotProduct3", "slotProduct4", "slotProduct5", "slotProduct6"],
    defaultValues: {
        progress: 0,
        progressMax: 0,
        progressCycle: 0
    },
    tick: function () {
        var e_16, _a, e_17, _b;
        var _this = this;
        if (World.getThreadTime() % 40 === 0
            && ApiaryRegistry.isValidStructure(this.blockSource, this.x - 1, this.y - 2, this.z - 1)) {
            if (!this.data.valid) {
                try {
                    for (var directions_1 = __values(directions), directions_1_1 = directions_1.next(); !directions_1_1.done; directions_1_1 = directions_1.next()) {
                        var dir = directions_1_1.value;
                        this.blockSource.setBlock(this.x + dir.x, this.y + dir.y, this.z + dir.z, BlockID.alveary_misc, 0);
                    }
                }
                catch (e_16_1) { e_16 = { error: e_16_1 }; }
                finally {
                    try {
                        if (directions_1_1 && !directions_1_1.done && (_a = directions_1.return)) _a.call(directions_1);
                    }
                    finally { if (e_16) throw e_16.error; }
                }
            }
            this.data.valid = true;
        }
        else if (World.getThreadTime() % 40 === 0) {
            if (this.data.valid) {
                try {
                    for (var directions_2 = __values(directions), directions_2_1 = directions_2.next(); !directions_2_1.done; directions_2_1 = directions_2.next()) {
                        var dir = directions_2_1.value;
                        var x = this.x + dir.x;
                        var y = this.y + dir.y;
                        var z = this.z + dir.z;
                        if (this.blockSource.getBlockId(x, y, z) !== 0) {
                            this.blockSource.setBlock(x, y, z, BlockID.alveary, 0);
                        }
                    }
                }
                catch (e_17_1) { e_17 = { error: e_17_1 }; }
                finally {
                    try {
                        if (directions_2_1 && !directions_2_1.done && (_b = directions_2.return)) _b.call(directions_2);
                    }
                    finally { if (e_17) throw e_17.error; }
                }
            }
            this.data.valid = false;
        }
        if (this.data.valid) {
            if (!this.house) {
                this.house = new BeeHouse(this, {
                    slotPrincess: "slot1",
                    slotDrone: "slot2",
                    produceSlots: this.OUTPUT_SLOTS,
                    slotPrincessOut: this.OUTPUT_SLOTS,
                    slotDronesOut: this.OUTPUT_SLOTS
                }, ModifierList.EMPTY);
                this.house.getHumidity = function () { return _this.humidity; };
                this.house.getClimate = function () { return _this.climate; };
                this.house.canSeeSky = function () {
                    return _this.blockSource.canSeeSky(_this.x, _this.y + 2, _this.z);
                };
            }
            var Modifiers = new ModifierList([]);
            for (var xx = this.x - 1; xx < this.x + 3; xx++) {
                for (var yy = this.y - 2; yy < this.y + 3; yy++) {
                    for (var zz = this.z - 1; zz < this.z + 3; zz++) {
                        var block = this.blockSource.getBlockId(xx, yy, zz);
                        if (ApiaryRegistry.isApiaryComponent(block) && block !== BlockID.alveary_misc_center) {
                            var tile = World.getTileEntity(xx, yy, zz, this.blockSource);
                            if (tile) {
                                if (tile.getModifiers)
                                    Modifiers.modifiers.push(tile.getModifiers(this));
                                if (tile.alvearyTick)
                                    tile.alvearyTick(this);
                            }
                        }
                    }
                }
            }
            if (this.humidity !== undefined && this.climate !== undefined)
                this.house.tick(Modifiers);
            this.humidity = Habitat.getHumidityAt(this.blockSource, this.x, this.y, this.z);
            this.climate = Habitat.getTemperatureAt(this.blockSource, this.x, this.y, this.z);
            var progressTexture = void 0;
            if (this.data.progress > this.data.progressMax * .8) {
                progressTexture = "forestry.for.apiary.scale_green";
            }
            else if (this.data.progress > this.data.progressMax * .5) {
                progressTexture = "forestry.for.apiary.scale_yellow";
            }
            else if (this.data.progress > this.data.progressMax * .3) {
                progressTexture = "forestry.for.apiary.scale_orange";
            }
            else {
                progressTexture = "forestry.for.apiary.scale_red";
            }
            this.container.setBinding("progressScale", "texture", progressTexture);
            this.container.setBinding("error", "text", this.house.error || "");
            this.container.setScale("progressScale", (this.data.progress / this.data.progressMax) || 0);
            this.container.validateAll();
            this.container.sendChanges();
        }
    },
    getScreenByName: function () {
        return alvearyGUI;
    }
});
TileEntity.registerPrototype(BlockID.alveary_misc, {
    useNetworkItemContainer: true,
    click: function (id, count, data, coords, player) {
        var e_18, _a;
        if (Entity.getSneaking(player)) {
            return false;
        }
        var blockSource = BlockSource.getDefaultForActor(player);
        if (!blockSource) {
            return false;
        }
        try {
            for (var directions_3 = __values(directions), directions_3_1 = directions_3.next(); !directions_3_1.done; directions_3_1 = directions_3.next()) {
                var dir = directions_3_1.value;
                var x = this.x + dir.x;
                var y = this.y + dir.y;
                var z = this.z + dir.z;
                if (this.blockSource.getBlockID(x, y, z) === BlockID.alveary_misc_center) {
                    var tile = World.getTileEntity(x, y, z, blockSource);
                    if (tile) {
                        var client = Network.getClientForPlayer(player);
                        tile.container.openFor(client, "main");
                        break;
                    }
                }
            }
        }
        catch (e_18_1) { e_18 = { error: e_18_1 }; }
        finally {
            try {
                if (directions_3_1 && !directions_3_1.done && (_a = directions_3.return)) _a.call(directions_3);
            }
            finally { if (e_18) throw e_18.error; }
        }
        return true;
    }
});
IDRegistry.genBlockID("alvearyStabiliser");
Block.createBlock("alvearyStabiliser", [
    { name: "Alveary Stabiliser", texture: [["alveary_stabiliser", 0]], inCreative: true }
]);
ToolAPI.registerBlockMaterial(BlockID.alvearyStabiliser, "wood");
ApiaryRegistry.register(BlockID.alvearyStabiliser);
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: BlockID.alvearyStabiliser, count: 1, data: 0 }, [
        "g g",
        "gmg",
        "g g"
    ], ['m', BlockID.alveary, 0, 'g', 406, 0]);
});
TileEntity.registerPrototype(BlockID.alvearyStabiliser, {
    useNetworkItemContainer: true,
    defaultValues: {},
    getModifiers: function () {
        return {
            getMutationModifier: function () {
                return 0;
            }
        };
    }
});
//Machines
Translation.addTranslation("Apiary", { ru: "Пасека" });
Translation.addTranslation("Bee House", { ru: "Пчелиный домик" });
Translation.addTranslation("Apiarist's Chest", { ru: "Сундук пчеловода" });
Translation.addTranslation("Alveary", { ru: "Пчелиный улей" });
Translation.addTranslation("Alveary Fan", { ru: "Вентилятор улья" });
Translation.addTranslation("Alveary Heater", { ru: "Обогреватель улья" });
Translation.addTranslation("Alveary Hygroregulator", { ru: "Кондиционер улья" });
Translation.addTranslation("Alveary Stabiliser", { ru: "Стабилизатор улья" });
Translation.addTranslation("Alveary Controller", { ru: "Котроллер огромного улья" });
//Beehives
Translation.addTranslation("Forest Hive", { ru: "Лесной улей" });
Translation.addTranslation("Meadows Hive", { ru: "Луговой улей" });
Translation.addTranslation("Modest Hive", { ru: "Пустынный улей" });
Translation.addTranslation("Tropical Hive", { ru: "Тропический улей" });
Translation.addTranslation("Wintry Hive", { ru: "Снежный улей" });
Translation.addTranslation("Marshy Hive", { ru: "Болотный улей" });
Translation.addTranslation("Ender Hive", { ru: "Улей Края" });
//Tools
Translation.addTranslation("Scoop", { ru: "Сачок" });
//Storage
Translation.addTranslation("Wax Block", { ru: "Блок воска" });
//Combs
Translation.addTranslation("Cocoa Comb", { ru: "Какао-соты" });
Translation.addTranslation("Dripping Comb", { ru: "Капающие соты" });
Translation.addTranslation("Honey Comb", { ru: "Медовые соты" });
Translation.addTranslation("Frozen Comb", { ru: "Морозные соты" });
Translation.addTranslation("Mellow Comb", { ru: "Выдержанные соты" });
Translation.addTranslation("Mossy Comb", { ru: "Замшелые соты" });
Translation.addTranslation("Mysterious Comb", { ru: "Таинственные соты" });
Translation.addTranslation("Parched Comb", { ru: "Пересохшие соты" });
Translation.addTranslation("Powdery Comb", { ru: "Рыхлые соты" });
Translation.addTranslation("Silky Comb", { ru: "Шелковые соты" });
Translation.addTranslation("Simmering Comb", { ru: "Кипящие соты" });
Translation.addTranslation("Stringy Comb", { ru: "Вязкие соты" });
Translation.addTranslation("Wheaten Comb", { ru: "Пшеничные соты" });
Translation.addTranslation("Irradiated Comb", { ru: "Облученные соты" });
Translation.addTranslation("Cocoa Comb Block", { ru: "Блок какао-сот" });
Translation.addTranslation("Dripping Comb Block", { ru: "Блок капающих сот" });
Translation.addTranslation("Honey Comb Block", { ru: "Блок медовых сот" });
Translation.addTranslation("Frozen Comb Block", { ru: "Блок морозных сот" });
Translation.addTranslation("Mellow Comb Block", { ru: "Блок выдержанных сот" });
Translation.addTranslation("Mossy Comb Block", { ru: "Блок замшелых сот" });
Translation.addTranslation("Mysterious Comb Block", { ru: "Блок таинственных сот" });
Translation.addTranslation("Parched Comb Block", { ru: "Блок пересохших сот" });
Translation.addTranslation("Powdery Comb Block", { ru: "Блок рыхлых сот" });
Translation.addTranslation("Silky Comb Block", { ru: "Блок шелковых сот" });
Translation.addTranslation("Simmering Comb Block", { ru: "Блок кипящих сот" });
Translation.addTranslation("Stringy Comb Block", { ru: "Блок вязких сот" });
Translation.addTranslation("Wheaten Comb Block", { ru: "Блок пшеничных сот" });
Translation.addTranslation("Irradiated Comb Block", { ru: "Блок облученных сот" });
//Frames
Translation.addTranslation("Impregnated Frame", { ru: "Пропитанная рамка" });
Translation.addTranslation("Untreated Frame", { ru: "Необработанная рамка" });
Translation.addTranslation("Proven Frame", { ru: "Проверенная рамка" });
//Armor
Translation.addTranslation("Apiarist's Hat", { ru: "Защитная маска пчеловода" });
Translation.addTranslation("Apiarist's Shirt", { ru: "Куртка пчеловода" });
Translation.addTranslation("Apiarist's Pants", { ru: "Штаны пчеловода" });
Translation.addTranslation("Apiarist's Shoes", { ru: "Ботинки пчеловода" });
//Other
Translation.addTranslation("Honey Drop", { ru: "Капля мёда" });
Translation.addTranslation("Beeswax", { ru: "Пчелиный воск" });
Translation.addTranslation("Honeydew", { ru: "Медвяная роса" });
Translation.addTranslation("Propolis", { ru: "Прополис" });
Translation.addTranslation("Refractory Wax", { ru: "Огнеупорный воск" });
Translation.addTranslation("Phosphor", { ru: "Фосфор" });
Translation.addTranslation("Crystalline Pollen Cluster", { ru: "Скопление кристаллической пыльцы" });
Translation.addTranslation("Silky Propolis", { ru: "Липкий прополис" });
Translation.addTranslation("Pulsating Propolis", { ru: "Пульсирующий прополис" });
Translation.addTranslation("Royal Jelly", { ru: "Маточное молочко" });
Translation.addTranslation("Pollen Cluster", { ru: "Скопление пыльцы" });
Translation.addTranslation("Ice Shard", { ru: "Осколок льда" });
Translation.addTranslation("Silk Wisp", { ru: "Клочок шёлка" });
Translation.addTranslation("Wax Cast", { ru: "Восковая форма" });
Translation.addTranslation("Pulsating Mesh", { ru: "Пульсирующая сеть" });
Translation.addTranslation("Honeyed Slice", { ru: "Бутерброд с мёдом" });
Translation.addTranslation("Impregnated Stick", { ru: "Полированная палка" });
Translation.addTranslation("Woven Silk", { ru: "Тканый шёлк" });
Translation.addTranslation("Portable Analyzer", { ru: "Портативный анализатор" });
Translation.addTranslation("Honey Pot", { ru: "Горшочек мёда" });
Translation.addTranslation("Scented Paneling", { ru: "Пропитанная обшивка" });
Translation.addTranslation("Ambrosia", { ru: "Амброзия" });
Translation.addTranslation("apiary.error.flowers", { en: "No flowers found", ru: "Цветы не найдены" });
Translation.addTranslation("apiary.error.climate", { en: "Incorrect temperature", ru: "Некорректная температура" });
Translation.addTranslation("apiary.error.humidity", { en: "Incorrect humidity", ru: "Некорректная влажность" });
Translation.addTranslation("apiary.error.sky", { en: "Can't see sky", ru: "Не видно неба" });
Translation.addTranslation("apiary.error.night", {
    en: "These bees do not work at night",
    ru: "Эти пчёлы не работают ночью"
});
Translation.addTranslation("apiary.error.rain", {
    en: "These bees do not work during the rain",
    ru: "Эти пчёлы не работают во время дождя"
});
Translation.addTranslation("bees.lifespan.shorted", { en: "Shorted", ru: "Кратчайший" });
Translation.addTranslation("bees.lifespan.shortest", { en: "Shortest", ru: "Наикратчайший" });
Translation.addTranslation("bees.lifespan.short", { en: "Short", ru: "Краткий" });
Translation.addTranslation("bees.lifespan.shortened", { en: "Shortened", ru: "Короткий" });
Translation.addTranslation("bees.lifespan.normal", { en: "Normal", ru: "Обычный" });
Translation.addTranslation("bees.lifespan.elongated", { en: "Elongated", ru: "Продлённый" });
Translation.addTranslation("bees.lifespan.long", { en: "Long", ru: "Длинный" });
Translation.addTranslation("bees.lifespan.longer", { en: "Longer", ru: "Очень длинный" });
Translation.addTranslation("bees.lifespan.longest", { en: "Longest", ru: "Длиннейший" });
Translation.addTranslation("bees.speed.slowest", { en: "Slowest", ru: "Очень медленная" });
Translation.addTranslation("bees.speed.slower", { en: "Slower", ru: "Медленная" });
Translation.addTranslation("bees.speed.slow", { en: "Slow", ru: "Неторопливая" });
Translation.addTranslation("bees.speed.normal", { en: "Normal", ru: "Обычная" });
Translation.addTranslation("bees.speed.fast", { en: "Fast", ru: "Быстрая" });
Translation.addTranslation("bees.speed.faster", { en: "Faster", ru: "Очень быстрая" });
Translation.addTranslation("bees.speed.fastest", { en: "Fastest", ru: "Наибыстрейшая" });
Translation.addTranslation("bees.effect.none", { en: "None", ru: "Нет" });
Translation.addTranslation("bees.effect.aggress", { en: "Aggress", ru: "Агрессивность" });
Translation.addTranslation("bees.effect.beatific", { en: "Beatific", ru: "Блаженность" });
Translation.addTranslation("bees.effect.creeper", { en: "Creeper", ru: "Крипер" });
Translation.addTranslation("bees.effect.explorer", { en: "Explorer", ru: "Исследовательность" });
Translation.addTranslation("bees.effect.freezing", { en: "Freezing", ru: "Замораживание" });
Translation.addTranslation("bees.effect.heroic", { en: "Heroic", ru: "Геройство" });
Translation.addTranslation("bees.effect.flammable", { en: "Flammable", ru: "Воспламенение" });
Translation.addTranslation("bees.effect.drunkard", { en: "Drunkard", ru: "Опьянение" });
Translation.addTranslation("bees.effect.radiact", { en: "Radioact", ru: "Радиоактивность" });
Translation.addTranslation("bees.effect.poison", { en: "Poison", ru: "Отвращение" });
Translation.addTranslation("bees.effect.ends", { en: "Ends", ru: "Окончание" });
Translation.addTranslation("forestry.gui.temperature.1", { en: "Icy", ru: "Ледяная" });
Translation.addTranslation("forestry.gui.temperature.2", { en: "Cold", ru: "Холодная" });
Translation.addTranslation("forestry.gui.temperature.3", { en: "Normal", ru: "Обычная" });
Translation.addTranslation("forestry.gui.temperature.4", { en: "Warm", ru: "Тёплая" });
Translation.addTranslation("forestry.gui.temperature.5", { en: "Hot", ru: "Горячая" });
Translation.addTranslation("forestry.gui.temperature.6", { en: "Hellish", ru: "Адская" });
Translation.addTranslation("forestry.gui.humidity.1", { en: "Arid", ru: "Сухая" });
Translation.addTranslation("forestry.gui.humidity.2", { en: "Normal", ru: "Обычная" });
Translation.addTranslation("forestry.gui.humidity.3", { en: "Damp", ru: "Сырая" });
Translation.addTranslation("analyzer.active", { en: "Active", ru: "Активный" });
Translation.addTranslation("analyzer.speed", { en: "Speed", ru: "Скорость" });
Translation.addTranslation("analyzer.inactive", { en: "Inactive", ru: "Неактивный" });
Translation.addTranslation("analyzer.climate", { en: "Climate", ru: "Климат" });
Translation.addTranslation("analyzer.tolerance", { en: "Tolerance", ru: "Устойчивость" });
Translation.addTranslation("analyzer.humidity", { en: "Humidity", ru: "Влажность" });
Translation.addTranslation("analyzer.diurnal", { en: "Diurnal", ru: "Дневная" });
Translation.addTranslation("analyzer.nocturnal", { en: "Nocturnal", ru: "Ночная" });
Translation.addTranslation("analyzer.flyer", { en: "Flyer", ru: "Летун" });
Translation.addTranslation("analyzer.cave", { en: "Cave", ru: "Пещерная" });
Translation.addTranslation("analyzer.pristine", { en: "Pristine Stock", ru: "Чистая порода" });
Translation.addTranslation("analyzer.ignoble", { en: "Ignoble Stock", ru: "Низкая порода" });
Translation.addTranslation("analyzer.generation", { en: "Generations in Captivity", ru: "Поколение в неволе" });
Translation.addTranslation("analyzer.produce", { en: "Possible produce", ru: "Возможная продукция" });
Translation.addTranslation("analyzer.specialty", { en: "Possible specialty", ru: "Возможная специальная продукция" });
Translation.addTranslation("analyzer.species", { en: "Species", ru: "Вид" });
Translation.addTranslation("analyzer.lifespan", { en: "Lifespan", ru: "Срок жизни" });
Translation.addTranslation("analyzer.flowers", { en: "Flowers type", ru: "Цветы" });
Translation.addTranslation("analyzer.fertility", { en: "Fertility", ru: "Плодовитость" });
Translation.addTranslation("analyzer.territory", { en: "Territory", ru: "Территория" });
Translation.addTranslation("analyzer.effect", { en: "Effect", ru: "Эффект" });
Translation.addTranslation("analyzer.yes", { en: "Yes", ru: "Да" });
Translation.addTranslation("analyzer.no", { en: "No", ru: "Нет" });
var FactoryManager = /** @class */ (function () {
    function FactoryManager() {
    }
    FactoryManager.register = function (unique, name, textures, inCreative, specType) {
        Block.createBlockWithRotation(unique, [
            { name: name, texture: textures, inCreative: inCreative }
        ], specType);
        this.createModel(BlockID[unique], textures);
        Item.addCreativeGroup(GROUP_MACHINES, GROUP_MACHINES_NAME, [BlockID[unique]]);
    };
    FactoryManager.createModel = function (blockId, textures) {
        var texturesFlipped = [
            [textures[0][0], 1], [textures[0][0], 1], [textures[5][0], 0],
            [textures[5][0], 0], [textures[3][0], 0], [textures[3][0], 0],
        ];
        for (var i = 0; i < 4; i++) {
            var render = new ICRender.Model();
            var model = BlockRenderer.createModel();
            switch (i) {
                case 0:
                case 1:
                    model.addBox(0, 0, 0, 1, 1, 0.23, blockId, 0);
                    model.addBox(0.14, 0.125, 0.23, 0.88, 0.88, 0.77, blockId, 0);
                    model.addBox(0, 0, 0.77, 1, 1, 1, blockId, 0);
                    break;
                case 2:
                case 3:
                    model.addBox(0, 0, 0, 0.23, 1, 1, texturesFlipped);
                    model.addBox(0.23, 0.1, 0.1, 0.77, 0.9, 0.9, texturesFlipped);
                    model.addBox(0.77, 0, 0, 1, 1, 1, texturesFlipped);
                    break;
            }
            render.addEntry(model);
            BlockRenderer.setStaticICRender(blockId, i, render);
        }
        Block.setBlockShape(blockId, { x: .0625, y: .0625, z: .0625 }, { x: .9375, y: .9375, z: .9375 });
    };
    return FactoryManager;
}());
setLoadingTip("Factory Module Loading...");
var CarpenterManager = /** @class */ (function () {
    function CarpenterManager() {
    }
    CarpenterManager.registerRecipe = function (recipe) {
        var input = recipe.input;
        if (!input) {
            summonException("Input is not correct! (Carpenter Recipe Registration)");
            return;
        }
        var result = recipe.result;
        if (!result || result.id <= 0) {
            summonException("Result is not correct! (Carpenter Recipe Registration)");
            return;
        }
        this.recipes.push(recipe);
    };
    CarpenterManager.getRecipe = function (pattern) {
        return this.recipes.find(function (recipe) {
            for (var k = 0; k < 9; k++) {
                var recipePattern = recipe.input[k] || { id: 0, data: 0 };
                var input = pattern[k] || { id: 0, data: 0 };
                if (!ContainerHelper.equals(recipePattern, input))
                    return false;
            }
            return true;
        });
    };
    CarpenterManager.getRecipesByIngredient = function (id, data) {
        if (data === void 0) { data = 0; }
        var ingredient = { id: id, data: data };
        return this.recipes.filter(function (recipe) {
            var input = recipe.input;
            for (var key in input) {
                var item = input[key];
                if (ContainerHelper.equals(item, ingredient))
                    return true;
            }
            return false;
        });
    };
    CarpenterManager.getRecipesByLiquid = function (liquid) {
        return this.recipes.filter(function (recipe) { return recipe.liquid === liquid; });
    };
    CarpenterManager.getRecipesByResult = function (id, data) {
        if (data === void 0) { data = 0; }
        var item = { id: id, data: data };
        return this.recipes.filter(function (recipe) { return ContainerHelper.equals(item, recipe.result); });
    };
    CarpenterManager.integrateWithRecipeViewer = function (api) {
        function bakeCarpenterRecipes(recipes) {
            return recipes.map(function (recipe) {
                var result = recipe.result;
                var input = [];
                for (var i = 0; i < 9; i++) {
                    var item = recipe.input[i];
                    if (item)
                        input.push({ id: item.id, data: item.data || 0, count: 1 });
                    else
                        input.push({ id: 0, data: 0, count: 0 });
                }
                if (recipe.special) {
                    var special = recipe.special;
                    input.push({ id: special.id, data: special.data || 0, count: special.count || 1 });
                }
                return {
                    input: input,
                    output: [{ id: result.id, data: result.data || 0, count: result.count || 1 }],
                    liquid: recipe.liquid,
                    liquidAmount: recipe.liquidAmount,
                    energy: (recipe.time || 50) * 204
                };
            });
        }
        api.registerRecipeType("fpe_carpenter", {
            contents: {
                icon: BlockID.carpenter,
                drawing: [
                    { type: "bitmap", x: 450, y: 100, scale: 5, bitmap: "forestry.for.recipeViewer.carpenter" }
                ],
                elements: {
                    input0: { type: "slot", x: 170, y: 110, size: 90 },
                    input1: { type: "slot", x: 260, y: 110, size: 90 },
                    input2: { type: "slot", x: 350, y: 110, size: 90 },
                    input3: { type: "slot", x: 170, y: 200, size: 90 },
                    input4: { type: "slot", x: 260, y: 200, size: 90 },
                    input5: { type: "slot", x: 350, y: 200, size: 90 },
                    input6: { type: "slot", x: 170, y: 290, size: 90 },
                    input7: { type: "slot", x: 260, y: 290, size: 90 },
                    input8: { type: "slot", x: 350, y: 290, size: 90 },
                    input9: { type: "slot", x: 540, y: 110, size: 90 },
                    output0: { type: "slot", x: 530, y: 275, size: 80 },
                    scaleLiquid: {
                        type: "scale",
                        x: 730,
                        y: 105,
                        scale: 5,
                        direction: 1,
                        bitmap: "forestry.bgs.liquid_2",
                        overlay: "forestry.bgs.liquid_2"
                    },
                    textLiquid: { type: "text", x: 730, y: 30, font: { size: 30 }, multiline: true }
                }
            },
            getList: function (id, data, isUsage) {
                if (isUsage) {
                    if (id === BlockID.carpenter) {
                        return bakeCarpenterRecipes(CarpenterManager.recipes);
                    }
                    else {
                        var recipes = bakeCarpenterRecipes(CarpenterManager.getRecipesByIngredient(id, data));
                        var empty = LiquidRegistry.getEmptyItem(id, data === -1 ? 0 : data);
                        if (empty)
                            recipes = recipes.concat(bakeCarpenterRecipes(CarpenterManager.getRecipesByLiquid(empty.liquid)));
                        return recipes;
                    }
                }
                else {
                    return bakeCarpenterRecipes(CarpenterManager.getRecipesByResult(id, data));
                }
            },
            onOpen: function (elements, data) {
                if (!data)
                    return;
                var scaleLiquid = elements.get("scaleLiquid");
                var textLiquid = elements.get("textLiquid");
                scaleLiquid.onBindingUpdated("texture", LiquidRegistry.getLiquidUITexture(data.liquid, 16, 58));
                scaleLiquid.onBindingUpdated("value", data.liquid ? data.liquidAmount / 10 : 0);
                textLiquid.onBindingUpdated("text", data.liquid ? LiquidRegistry.getLiquidName(data.liquid) + "\n" + (data.liquidAmount * 1000) + " mB" : "");
            }
        });
        api.registerRecipeType("fpe_fabricator", {
            contents: {
                icon: BlockID.fabricator,
                drawing: [
                    { type: "bitmap", x: 140, y: 110, scale: 5, bitmap: "forestry.for.fabricator.bg" },
                    { type: "bitmap", x: 315, y: 115, scale: 5, bitmap: "forestry.for.fabricator.scale" }
                ],
                elements: {
                    slotGlass: {
                        type: "slot",
                        x: 170,
                        y: 135,
                        size: 80,
                        visual: true,
                        source: { id: 264, count: 1, data: 0 }
                    },
                    scaleGlass: {
                        type: "scale",
                        x: 170,
                        y: 270,
                        scale: 5,
                        direction: 1,
                        bitmap: "forestry.liquids.glass_16x16"
                    },
                    input0: { type: "slot", x: 390, y: 110, size: 90 },
                    input1: { type: "slot", x: 480, y: 110, size: 90 },
                    input2: { type: "slot", x: 570, y: 110, size: 90 },
                    input3: { type: "slot", x: 390, y: 200, size: 90 },
                    input4: { type: "slot", x: 480, y: 200, size: 90 },
                    input5: { type: "slot", x: 570, y: 200, size: 90 },
                    input6: { type: "slot", x: 390, y: 290, size: 90 },
                    input7: { type: "slot", x: 480, y: 290, size: 90 },
                    input8: { type: "slot", x: 570, y: 290, size: 90 },
                    input9: { type: "slot", x: 790, y: 110, size: 90 },
                    output0: { type: "slot", x: 790, y: 290, size: 90 },
                }
            },
            getList: function (id, data, isUsage) {
                if (isUsage)
                    if (id === BlockID.fabricator) {
                        return bakeCarpenterRecipes(FabricatorManager.recipes);
                    }
                    else
                        return bakeCarpenterRecipes(FabricatorManager.getRecipesByIngredient(id, data));
                else
                    return bakeCarpenterRecipes(FabricatorManager.getRecipesByResult(id, data));
            },
            onOpen: function (elements) {
                var glass = FabricatorManager.smeltingList[Math.round(Math.random() * FabricatorManager.smeltingList.length)].input;
                var slotGlass = elements.get("slotGlass");
                slotGlass.onBindingUpdated("source", { id: glass.id, count: 1, data: glass.data });
            }
        });
    };
    CarpenterManager.recipes = [];
    return CarpenterManager;
}());
var CentrifugeManager = /** @class */ (function () {
    function CentrifugeManager() {
    }
    CentrifugeManager.registerRecipe = function (recipe) {
        var input = recipe.input;
        var result = recipe.result;
        if (!input) {
            summonException("Result is not correct! (Centrifuge Recipe Registration)");
            return;
        }
        if (!result) {
            summonException("Input is not correct! (Centrifuge Recipe Registration)");
            return;
        }
        input.data = input.data || 0;
        for (var i in result) {
            var item = result[i];
            item.data = item.data || 0;
        }
        this.recipes.push(recipe);
    };
    CentrifugeManager.getRecipe = function (id, data) {
        if (data === void 0) { data = 0; }
        var item = { id: id, data: data };
        return this.recipes.find(function (recipe) { return ContainerHelper.equals(item, recipe.input); });
    };
    CentrifugeManager.getRecipeByIngredient = function (id, data) {
        if (data === void 0) { data = 0; }
        var item = { id: id, data: data };
        return this.recipes.find(function (recipe) { return ContainerHelper.equals(item, recipe.input); });
    };
    CentrifugeManager.getRecipesByResult = function (id, data) {
        if (data === void 0) { data = 0; }
        var item = { id: id, data: data };
        return this.recipes.filter(function (recipe) {
            return recipe.result.find(function (result) { return ContainerHelper.equals(item, result); }) !== undefined;
        });
    };
    CentrifugeManager.integrateWithRecipeViewer = function (api) {
        function bakeCentrifugeRecipes(recipes) {
            return recipes.map(function (recipe) {
                var input = recipe.input;
                return {
                    input: [{ id: input.id, data: input.data || 0, count: 1 }],
                    output: recipe.result.map(function (item) { return ({ id: item.id, data: item.data || 0, count: item.count || 1 }); })
                };
            });
        }
        api.registerRecipeType("fpe_centrifuge", {
            contents: {
                icon: BlockID.centrifuge,
                drawing: [
                    { type: "bitmap", x: 240, y: 130, scale: 5, bitmap: "forestry.for.recipeViewer.centrifuge" },
                    { type: "bitmap", x: 280, y: 220, scale: 5, bitmap: "forestry.for.centrifuge.scale" },
                    { type: "bitmap", x: 400, y: 220, scale: 5, bitmap: "forestry.for.centrifuge.scale" },
                ],
                elements: {
                    input0: { type: "slot", x: 310, y: 225, size: 80 },
                    output0: { type: "slot", x: 570, y: 130, size: 90 },
                    output1: { type: "slot", x: 660, y: 130, size: 90 },
                    output2: { type: "slot", x: 750, y: 130, size: 90 },
                    output3: { type: "slot", x: 570, y: 220, size: 90 },
                    output4: { type: "slot", x: 660, y: 220, size: 90 },
                    output5: { type: "slot", x: 750, y: 220, size: 90 },
                    output6: { type: "slot", x: 570, y: 310, size: 90 },
                    output7: { type: "slot", x: 660, y: 310, size: 90 },
                    output8: { type: "slot", x: 750, y: 310, size: 90 }
                }
            },
            getList: function (id, data, isUsage) {
                if (isUsage) {
                    if (id === BlockID.centrifuge) {
                        return bakeCentrifugeRecipes(CentrifugeManager.recipes);
                    }
                    else {
                        var recipe = CentrifugeManager.getRecipeByIngredient(id, data);
                        if (recipe)
                            return bakeCentrifugeRecipes([recipe]);
                        return [];
                    }
                }
                else
                    return bakeCentrifugeRecipes(CentrifugeManager.getRecipesByResult(id, data));
            }
        });
    };
    CentrifugeManager.recipes = [];
    return CentrifugeManager;
}());
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var FabricatorManager = /** @class */ (function () {
    function FabricatorManager() {
    }
    FabricatorManager.registerRecipe = function (recipe) {
        if (!recipe.input) {
            summonException("Input is not correct! (Fabricator Recipe Registration)");
            return;
        }
        var result = recipe.result;
        if (!result || result.id <= 0) {
            summonException("Result is not correct! (Fabricator Recipe Registration)");
            return;
        }
        this.recipes.push(__assign(__assign({}, recipe), { amount: recipe.amount || .5 }));
    };
    FabricatorManager.addSmelting = function (smelting) {
        var input = smelting.input;
        if (!input || input.id <= 0) {
            summonException("Input is not correct! (Fabricator Smelting Registration)");
            return;
        }
        if (!smelting.amount) {
            summonException("Amount of Liquid Glass is not correct! (Fabricator Smelting Registration)");
            return;
        }
        smelting.temperature = smelting.temperature || 0;
        input.data = input.data || 0;
        this.smeltingList.push(__assign(__assign({}, smelting), { temperature: smelting.temperature || 0 }));
    };
    FabricatorManager.getSmelting = function (id, data) {
        if (data === void 0) { data = 0; }
        var item = { id: id, data: data };
        return this.smeltingList.find(function (smelting) { return ContainerHelper.equals(smelting.input, item); });
    };
    FabricatorManager.getRecipe = function (pattern) {
        return this.recipes.find(function (recipe) {
            for (var i = 0; i < 9; i++) {
                var recipePattern = recipe.input[i] || { id: 0, data: 0 };
                var input = pattern[i] || { id: 0, data: 0 };
                if (!ContainerHelper.equals(recipePattern, input))
                    return false;
            }
            return true;
        });
    };
    FabricatorManager.getRecipesByIngredient = function (id, data) {
        if (data === void 0) { data = 0; }
        var ingredient = { id: id, data: data };
        return this.recipes.filter(function (recipe) {
            var input = recipe.input;
            for (var key in input) {
                var item = input[key];
                if (ContainerHelper.equals(ingredient, item))
                    return true;
            }
            return false;
        });
    };
    FabricatorManager.getRecipesByResult = function (id, data) {
        if (data === void 0) { data = 0; }
        var item = { id: id, data: data };
        return this.recipes.filter(function (recipe) { return ContainerHelper.equals(item, recipe.result); });
    };
    FabricatorManager.recipes = [];
    FabricatorManager.smeltingList = [];
    return FabricatorManager;
}());
var fermenterLiquids = { "appleJuice": 1.5, "honey": 1.5, "water": 1 };
var FermenterManager = /** @class */ (function () {
    function FermenterManager() {
    }
    FermenterManager.addRecipe = function (recipe) {
        if (recipe.id <= 0) {
            summonException("Id is not correct! (Fermenter Recipe Registration)");
            return;
        }
        if (!recipe.inputLiquid) {
            summonException("Input Liquid is not correct! (Fermenter Recipe Registration)");
            return;
        }
        if (!recipe.liquid) {
            summonException("Liquid is not correct! (Fermenter Recipe Registration)");
            return;
        }
        if (!recipe.liquidAmount) {
            summonException("Liquid Amount is not correct! (Fermenter Recipe Registration)");
            return;
        }
        recipe.data = recipe.data || 0;
        this.recipes.push(recipe);
    };
    FermenterManager.addFuel = function (fuel) {
        if (fuel.id <= 0) {
            summonException("Id is not correct! (Fermenter Fuel Registration)");
            return;
        }
        if (fuel.perCycle <= 0) {
            summonException("'perCycle' value is not correct! (Fermenter Fuel Registration)");
            return;
        }
        if (fuel.cycles <= 0) {
            summonException("'cycles' is not correct! (Fermenter Fuel Registration)");
            return;
        }
        fuel.data = fuel.data || 0;
        this.fuels.push(fuel);
    };
    FermenterManager.getRecipe = function (id, data, inputLiquid) {
        var item = { id: id, data: data };
        return this.recipes.find(function (recipe) {
            return ContainerHelper.equals(item, recipe) && inputLiquid === recipe.inputLiquid;
        });
    };
    FermenterManager.getRecipeByItem = function (id, data) {
        if (data === void 0) { data = 0; }
        var item = { id: id, data: data };
        return this.recipes.find(function (recipe) { return ContainerHelper.equals(item, recipe); });
    };
    FermenterManager.getRecipeByInputLiquid = function (liquid) {
        return this.recipes.filter(function (recipe) { return recipe.inputLiquid === liquid; });
    };
    FermenterManager.getRecipeByResultLiquid = function (liquid) {
        return this.recipes.filter(function (recipe) { return recipe.liquid === liquid; });
    };
    FermenterManager.getFuel = function (id, data) {
        if (data === void 0) { data = 0; }
        var item = { id: id, data: data };
        return this.fuels.find(function (fuel) { return ContainerHelper.equals(item, fuel); });
    };
    FermenterManager.integrateWithRecipeViewer = function (api) {
        function bakeFuelRecipes(list) {
            return list.map(function (recipe) { return ({
                input: [
                    { id: recipe.id, data: recipe.data || 0, count: 1 }
                ],
                output: [],
                value: recipe.perCycle,
                cycles: recipe.cycles
            }); });
        }
        function bakeRecipes(list) {
            return list.map(function (recipe) { return ({
                input: [
                    { id: recipe.id, data: recipe.data || 0, count: 1 }
                ],
                output: [],
                recipe: recipe
            }); });
        }
        api.registerRecipeType("fpe_fermenter_fuel", {
            contents: {
                icon: BlockID.fermenter,
                description: "Fuel",
                drawing: [],
                elements: {
                    input0: { type: "slot", x: 355, y: 125, size: 110, needClean: true },
                    textValue: { type: "text", x: 485, y: 140, font: { size: 30 } },
                    textCycles: { type: "text", x: 485, y: 185, font: { size: 30 } },
                }
            },
            getList: function (id, data, isUsage) {
                if (isUsage) {
                    if (id === BlockID.fermenter) {
                        return bakeFuelRecipes(FermenterManager.fuels);
                    }
                    else {
                        var fuel = FermenterManager.getFuel(id, data);
                        if (fuel)
                            return bakeFuelRecipes([fuel]);
                        else
                            return [];
                    }
                }
                else
                    return [];
            },
            onOpen: function (elements, data) {
                elements.get("textValue")
                    .onBindingUpdated("text", data ? "Value: " + data.value : "0");
                elements.get("textCycles")
                    .onBindingUpdated("text", data ? "Cycles: " + data.cycles : "0");
            }
        });
        api.registerRecipeType("fpe_fermenter", {
            contents: {
                icon: BlockID.fermenter,
                drawing: [
                    { type: "bitmap", x: 300, y: 80, scale: 5, bitmap: "forestry.bgs.liquid_1" },
                    { type: "bitmap", x: 520, y: 200, scale: 5, bitmap: "forestry.scales.furnace_full" },
                    { type: "bitmap", x: 640, y: 80, scale: 5, bitmap: "forestry.bgs.liquid_1" },
                ],
                elements: {
                    input0: { type: "slot", x: 400, y: 180, size: 110, needClean: true },
                    textInputLiquid: { type: "text", x: 280, y: 10, font: { size: 30 }, multiline: true },
                    scaleInputLiquid: {
                        type: "scale",
                        x: 305,
                        y: 85,
                        scale: 5,
                        direction: 1,
                        bitmap: "forestry.bgs.liquid_2",
                        overlay: "forestry.bgs.liquid_2"
                    },
                    textResultLiquid: { type: "text", x: 620, y: 10, font: { size: 30 }, multiline: true },
                    scaleResultLiquid: {
                        type: "scale",
                        x: 645,
                        y: 85,
                        scale: 5,
                        direction: 1,
                        bitmap: "forestry.bgs.liquid_2",
                        overlay: "forestry.bgs.liquid_2"
                    },
                }
            },
            getList: function (id, data, isUsage) {
                if (isUsage) {
                    if (id === BlockID.fermenter) {
                        return bakeRecipes(FermenterManager.recipes);
                    }
                    else {
                        var fuel = FermenterManager.getRecipeByItem(id, data);
                        var empty = LiquidRegistry.getEmptyItem(id, data === -1 ? 0 : data);
                        var recipes = [];
                        if (fuel)
                            recipes = bakeRecipes([fuel]);
                        if (empty)
                            recipes = recipes.concat(bakeRecipes(FermenterManager.getRecipeByInputLiquid(empty.liquid)));
                        return recipes;
                    }
                }
                else {
                    var empty = LiquidRegistry.getEmptyItem(id, data === -1 ? 0 : data);
                    if (empty)
                        return bakeRecipes(FermenterManager.getRecipeByResultLiquid(empty.liquid));
                    return [];
                }
            },
            onOpen: function (elements, data) {
                if (!data)
                    return;
                var scaleInputLiquid = elements.get("scaleInputLiquid");
                var scaleResultLiquid = elements.get("scaleResultLiquid");
                var recipe = data.recipe;
                scaleInputLiquid.onBindingUpdated("texture", LiquidRegistry.getLiquidUITexture(recipe.inputLiquid, 16, 58));
                scaleInputLiquid.onBindingUpdated("value", recipe.liquidAmount / 10);
                scaleResultLiquid.onBindingUpdated("texture", LiquidRegistry.getLiquidUITexture(recipe.liquid, 16, 58));
                scaleResultLiquid.onBindingUpdated("value", recipe.liquidAmount / 10);
                elements.get("textInputLiquid").onBindingUpdated("text", LiquidRegistry.getLiquidName(recipe.inputLiquid) + "\n" + "Modifier: " + recipe.modifier + "x");
                elements.get("textResultLiquid").onBindingUpdated("text", LiquidRegistry.getLiquidName(recipe.liquid));
            }
        });
    };
    FermenterManager.recipes = [];
    FermenterManager.fuels = [];
    return FermenterManager;
}());
var SqueezerManager = /** @class */ (function () {
    function SqueezerManager() {
    }
    SqueezerManager.registerRecipe = function (recipe) {
        var input = recipe.input;
        if (!input) {
            summonException("Input is not correct! (Squeezer Recipe Registration)");
            return;
        }
        if (!recipe.liquid) {
            summonException("Liquid is not correct! (Squeezer Recipe Registration)");
            return;
        }
        if (!recipe.liquidAmount) {
            summonException("Amount of Liquid is not correct! (Squeezer Recipe Registration)");
            return;
        }
        for (var i in input) {
            var item = input[i];
            item.data = item.data || 0;
            item.count = item.count || 1;
        }
        this.recipes.push(__assign(__assign({}, recipe), { time: recipe.time || 10 }));
    };
    SqueezerManager.getRecipesByInput = function (id, data) {
        if (data === void 0) { data = 0; }
        var item = { id: id, data: data };
        return this.recipes.filter(function (recipe) {
            return recipe.input.find(function (input) { return ContainerHelper.equals(input, item); });
        });
    };
    SqueezerManager.getRecipesBySpecial = function (id, data) {
        if (data === void 0) { data = 0; }
        var item = { id: id, data: data };
        return this.recipes.filter(function (recipe) {
            var special = recipe.special;
            return special && ContainerHelper.equals(special, item);
        });
    };
    SqueezerManager.getRecipesByLiquid = function (liquid) {
        return this.recipes.filter(function (recipe) { return recipe.liquid === liquid; });
    };
    SqueezerManager.getRecipes = function () {
        return this.recipes;
    };
    SqueezerManager.integrateWithRecipeViewer = function (api) {
        function bakeRecipes(recipes) {
            return recipes.map(function (recipe) {
                var output = [];
                if (recipe.special) {
                    var special = recipe.special;
                    output.push({ id: special.id, data: special.data || 0, count: special.count || 1 });
                }
                return {
                    input: recipe.input.map(function (item) { return ({ id: item.id, data: item.data || 0, count: item.count || 1 }); }),
                    output: output,
                    recipe: recipe
                };
            });
        }
        api.registerRecipeType("fpe_squeezer", {
            contents: {
                icon: BlockID.squeezer,
                drawing: [
                    { type: "bitmap", x: 500, y: 200, scale: 5, bitmap: "forestry.scales.furnace_full" },
                    { type: "bitmap", x: 625, y: 90, scale: 5, bitmap: "forestry.bgs.liquid_1" }
                ],
                elements: {
                    input0: { type: "slot", x: 210, y: 110, size: 90 },
                    input1: { type: "slot", x: 300, y: 110, size: 90 },
                    input2: { type: "slot", x: 390, y: 110, size: 90 },
                    input3: { type: "slot", x: 210, y: 200, size: 90 },
                    input4: { type: "slot", x: 300, y: 200, size: 90 },
                    input5: { type: "slot", x: 390, y: 200, size: 90 },
                    input6: { type: "slot", x: 210, y: 290, size: 90 },
                    input7: { type: "slot", x: 300, y: 290, size: 90 },
                    input8: { type: "slot", x: 390, y: 290, size: 90 },
                    output0: { type: "slot", x: 505, y: 280, size: 90 },
                    scaleLiquid: {
                        type: "scale",
                        x: 630,
                        y: 95,
                        scale: 5,
                        direction: 1,
                        bitmap: "forestry.bgs.liquid_2",
                        overlay: "forestry.bgs.liquid_2"
                    },
                    textLiquid: { type: "text", x: 630, y: 25, font: { size: 30 }, multiline: true },
                    textChance: { type: "text", x: 510, y: 380, font: { size: 30 }, multiline: true }
                }
            },
            getList: function (id, data, isUsage) {
                if (isUsage) {
                    if (id === BlockID.squeezer) {
                        return bakeRecipes(SqueezerManager.recipes);
                    }
                    else
                        return bakeRecipes(SqueezerManager.getRecipesByInput(id, data));
                }
                else {
                    var recipes = bakeRecipes(SqueezerManager.getRecipesBySpecial(id, data));
                    var empty = LiquidRegistry.getEmptyItem(id, data === -1 ? 0 : data);
                    if (empty)
                        recipes = recipes.concat(bakeRecipes(SqueezerManager.getRecipesByLiquid(empty.liquid)));
                    return recipes;
                }
            },
            onOpen: function (elements, data) {
                if (!data)
                    return;
                var recipe = data.recipe;
                var scaleLiquid = elements.get("scaleLiquid");
                var textLiquid = elements.get("textLiquid");
                var textChance = elements.get("textChance");
                if (recipe.special) {
                    textChance.onBindingUpdated("text", recipe.special.chance * 100 + "%");
                }
                else {
                    textChance.onBindingUpdated("text", "");
                }
                if (recipe.liquid) {
                    scaleLiquid.onBindingUpdated("texture", LiquidRegistry.getLiquidUITexture(recipe.liquid, 16, 58));
                    scaleLiquid.onBindingUpdated("value", recipe.liquidAmount / 10);
                    textLiquid.onBindingUpdated("text", LiquidRegistry.getLiquidName(recipe.liquid) + "\n" + (recipe.liquidAmount * 1000) + " mB");
                }
                else {
                    scaleLiquid.onBindingUpdated("texture", null);
                    scaleLiquid.onBindingUpdated("value", 0);
                    textLiquid.onBindingUpdated("text", "");
                }
            }
        });
    };
    SqueezerManager.recipes = [];
    return SqueezerManager;
}());
var StillManager = /** @class */ (function () {
    function StillManager() {
    }
    StillManager.registerRecipe = function (recipe) {
        var inputLiquid = recipe.inputLiquid;
        if (!inputLiquid) {
            summonException("Input Liquid is not correct! (Still Recipe Registration)");
            return;
        }
        if (recipe.inputAmount <= 0) {
            summonException("Amount of input liquids is not correct! (Still Recipe Registration)");
            return;
        }
        if (!recipe.outputLiquid) {
            summonException("Output Liquid is not correct! (Still Recipe Registration)");
            return;
        }
        if (recipe.outputAmount <= 0) {
            summonException("Amount of output liquids is not correct! (Still Recipe Registration)");
            return;
        }
        if (!recipe.cycles) {
            summonException("'cycles' value is not correct! (Still Recipe Registration)");
            return;
        }
        this.recipes.push(recipe);
    };
    StillManager.getRecipe = function (liquid) {
        return this.recipes.find(function (recipe) { return recipe.inputLiquid === liquid; });
    };
    StillManager.getRecipeByResult = function (liquid) {
        return this.recipes.find(function (recipe) { return recipe.outputLiquid === liquid; });
    };
    StillManager.integrateWithRecipeViewer = function (api) {
        function bakeRecipes(list) {
            return list.map(function (recipe) { return ({
                input: [],
                output: [],
                recipe: recipe
            }); });
        }
        api.registerRecipeType("fpe_still", {
            contents: {
                icon: BlockID.still,
                drawing: [
                    { type: "bitmap", x: 260, y: 100, scale: 5, bitmap: "forestry.for.recipeViewer.still" },
                ],
                elements: {
                    textInputLiquid: { type: "text", x: 260, y: 30, font: { size: 30 }, multiline: true },
                    scaleInputLiquid: {
                        type: "scale",
                        x: 265,
                        y: 105,
                        scale: 5,
                        direction: 1,
                        bitmap: "forestry.bgs.liquid_2",
                        overlay: "forestry.bgs.liquid_2"
                    },
                    textResultLiquid: { type: "text", x: 715, y: 30, font: { size: 30 }, multiline: true },
                    scaleResultLiquid: {
                        type: "scale",
                        x: 715,
                        y: 105,
                        scale: 5,
                        direction: 1,
                        bitmap: "forestry.bgs.liquid_2",
                        overlay: "forestry.bgs.liquid_2"
                    },
                }
            },
            getList: function (id, data, isUsage) {
                var empty = LiquidRegistry.getEmptyItem(id, data === -1 ? 0 : data);
                if (isUsage) {
                    if (id === BlockID.still) {
                        return bakeRecipes(StillManager.recipes);
                    }
                    else {
                        var empty_1 = LiquidRegistry.getEmptyItem(id, data === -1 ? 0 : data);
                        if (empty_1) {
                            var recipe = StillManager.getRecipe(empty_1.liquid);
                            if (recipe) {
                                return bakeRecipes([recipe]);
                            }
                        }
                    }
                }
                else {
                    if (empty) {
                        var recipe = StillManager.getRecipeByResult(empty.liquid);
                        if (recipe) {
                            return bakeRecipes([recipe]);
                        }
                    }
                }
                return [];
            },
            onOpen: function (elements, data) {
                if (!data)
                    return;
                var scaleInputLiquid = elements.get("scaleInputLiquid");
                var scaleResultLiquid = elements.get("scaleResultLiquid");
                var recipe = data.recipe;
                scaleInputLiquid.onBindingUpdated("texture", LiquidRegistry.getLiquidUITexture(recipe.inputLiquid, 16, 58));
                scaleInputLiquid.onBindingUpdated("value", recipe.inputAmount * recipe.cycles / 10);
                scaleResultLiquid.onBindingUpdated("texture", LiquidRegistry.getLiquidUITexture(recipe.outputLiquid, 16, 58));
                scaleResultLiquid.onBindingUpdated("value", recipe.outputAmount * recipe.cycles / 10);
                elements.get("textInputLiquid").onBindingUpdated("text", LiquidRegistry.getLiquidName(recipe.inputLiquid) + "\n" + recipe.inputAmount * recipe.cycles * 1000 + " mB");
                elements.get("textResultLiquid").onBindingUpdated("text", LiquidRegistry.getLiquidName(recipe.outputLiquid) + "\n" + recipe.outputAmount * recipe.cycles * 1000 + " mB");
            }
        });
    };
    StillManager.recipes = [];
    return StillManager;
}());
var MoistenerManager = /** @class */ (function () {
    function MoistenerManager() {
    }
    MoistenerManager.registerFuel = function (fuel) {
        var inputItem = fuel.inputItem;
        var outputItem = fuel.outputItem;
        if (!inputItem || inputItem.id <= 0) {
            summonException("Input is not correct! (Moistener Fuel Registration)");
            return;
        }
        if (!outputItem || outputItem.id <= 0) {
            summonException("Output is not correct! (Moistener Fuel Registration)");
            return;
        }
        inputItem.data = inputItem.data || 0;
        outputItem.data = outputItem.data || 0;
        outputItem.count = 1;
        this.fuels.push(fuel);
    };
    MoistenerManager.registerRecipe = function (recipe) {
        var inputItem = recipe.inputItem;
        var outputItem = recipe.outputItem;
        if (!inputItem || inputItem.id <= 0) {
            summonException("Input is not correct! (Moistener Recipe Registration)");
            return;
        }
        if (!outputItem || outputItem.id <= 0) {
            summonException("Output is not correct! (Moistener Recipe Registration)");
            return;
        }
        inputItem.data = inputItem.data || 0;
        outputItem.data = outputItem.data || 0;
        outputItem.count = 1;
        this.recipes.push(recipe);
    };
    MoistenerManager.getFuelInfo = function (id, data) {
        if (data === void 0) { data = 0; }
        var item = { id: id, data: data };
        return this.fuels.find(function (fuel) { return ContainerHelper.equals(item, fuel.inputItem); });
    };
    MoistenerManager.getFuelByResult = function (id, data) {
        if (data === void 0) { data = 0; }
        var item = { id: id, data: data };
        return this.fuels.find(function (fuel) { return ContainerHelper.equals(item, fuel.outputItem); });
    };
    MoistenerManager.getRecipe = function (id, data) {
        if (data === void 0) { data = 0; }
        var item = { id: id, data: data };
        return this.recipes.find(function (recipe) { return ContainerHelper.equals(item, recipe.inputItem); });
    };
    MoistenerManager.getRecipeByResult = function (id, data) {
        if (data === void 0) { data = 0; }
        var item = { id: id, data: data };
        return this.recipes.find(function (recipe) { return ContainerHelper.equals(item, recipe.outputItem); });
    };
    MoistenerManager.integrateWithRecipeViewer = function (api) {
        function bakeRecipes(list) {
            return list.map(function (recipe) {
                var input = recipe.inputItem;
                var output = recipe.outputItem;
                return {
                    input: [{ id: input.id, data: input.data || 0, count: 1 }],
                    output: [{ id: output.id, data: output.data || 0, count: 1 }],
                };
            });
        }
        api.registerRecipeType("fpe_moistener_fuel", {
            contents: {
                icon: BlockID.moistener,
                description: "Fuel",
                drawing: [
                    { type: "bitmap", x: 470, y: 140, scale: 5, bitmap: "forestry.scales.furnace_full" },
                ],
                elements: {
                    input0: { type: "slot", x: 355, y: 125, size: 110, needClean: true },
                    output0: { type: "slot", x: 585, y: 125, size: 110, needClean: true }
                }
            },
            getList: function (id, data, isUsage) {
                var fuel = MoistenerManager.getFuelByResult(id, data);
                if (isUsage) {
                    if (id === BlockID.moistener) {
                        return bakeRecipes(MoistenerManager.fuels);
                    }
                    else {
                        var fuel_1 = MoistenerManager.getFuelInfo(id, data);
                        if (fuel_1)
                            return bakeRecipes([fuel_1]);
                        else
                            return [];
                    }
                }
                else {
                    if (fuel)
                        return bakeRecipes([fuel]);
                    else
                        return [];
                }
            }
        });
        api.registerRecipeType("fpe_moistener", {
            contents: {
                icon: BlockID.moistener,
                drawing: [
                    { type: "bitmap", x: 470, y: 140, scale: 5, bitmap: "forestry.scales.furnace_full" },
                ],
                elements: {
                    input0: { type: "slot", x: 355, y: 125, size: 110, needClean: true },
                    output0: { type: "slot", x: 585, y: 125, size: 110, needClean: true }
                }
            },
            getList: function (id, data, isUsage) {
                var fuel = MoistenerManager.getRecipeByResult(id, data);
                if (isUsage) {
                    if (id === BlockID.moistener) {
                        return bakeRecipes(MoistenerManager.recipes);
                    }
                    else {
                        var fuel_2 = MoistenerManager.getRecipe(id, data);
                        if (fuel_2)
                            return bakeRecipes([fuel_2]);
                        else
                            return [];
                    }
                }
                else {
                    if (fuel)
                        return bakeRecipes([fuel]);
                    else
                        return [];
                }
            }
        });
    };
    MoistenerManager.fuels = [];
    MoistenerManager.recipes = [];
    return MoistenerManager;
}());
var RainMakerRenderer = /** @class */ (function () {
    function RainMakerRenderer() {
    }
    RainMakerRenderer.setStaticRender = function (blockId) {
        var render = this.bakeRender(0, 0);
        BlockRenderer.setStaticICRender(blockId, 0, render);
        BlockRenderer.enableCoordMapping(blockId, 0, render);
    };
    RainMakerRenderer.mapAtCoords = function (x, y, z, progress, charge) {
        var render = this.bakeRender(progress, charge);
        BlockRenderer.mapAtCoords(x, y, z, render);
    };
    RainMakerRenderer.bakeRender = function (progress, charge) {
        var key = progress + ":" + charge;
        if (this.pool[key]) {
            return this.pool[key];
        }
        var render = new ICRender.Model();
        var model = BlockRenderer.createModel();
        render.addEntry(model);
        this.pool[key] = render;
        //region Model Parts
        //Pedestal
        model.addBox(0, 0, 0, 1, 1 / 16, 1, [
            ["rainmaker_pedestal", 1], ["rainmaker_pedestal", 0], ["rainmaker_pedestal", 2], ["rainmaker_pedestal", 2],
            ["rainmaker_pedestal", 3],
        ]);
        //Column
        var columnIndex = 2 + charge;
        model.addBox(6 / 16, 1 / 16, 6 / 16, 10 / 16, 1, 10 / 16, [
            ["rainmaker_column", 0], ["rainmaker_column", 0], ["rainmaker_column", columnIndex], ["rainmaker_column", columnIndex],
            ["rainmaker_column", 1],
        ]);
        //Extension
        model.addBox(1 / 16, 7 / 16, 7 / 16, 15 / 16, 9 / 16, 9 / 16, [
            ["rainmaker_extension", 0], ["rainmaker_extension", 0], ["rainmaker_extension", 1], ["rainmaker_extension", 1],
            ["rainmaker_extension", 0],
        ]);
        var bladeOffset;
        if (progress < .5) {
            bladeOffset = progress * 8 / 16;
        }
        else {
            bladeOffset = (1 - progress) * 8 / 16;
        }
        //Left Blade
        model.addBox(5 / 16 - bladeOffset, 2 / 16, 4 / 16, 6 / 16 - bladeOffset, 14 / 16, 12 / 16, [
            ["rainmaker_blade", 0], ["rainmaker_blade", 0], ["rainmaker_blade", 0], ["rainmaker_blade", 0],
            ["rainmaker_blade", 1], ["rainmaker_blade", 2],
        ]);
        //Right Blade
        model.addBox(10 / 16 + bladeOffset, 2 / 16, 4 / 16, 11 / 16 + bladeOffset, 14 / 16, 12 / 16, [
            ["rainmaker_blade", 0], ["rainmaker_blade", 0], ["rainmaker_blade", 0], ["rainmaker_blade", 0],
            ["rainmaker_blade", 2], ["rainmaker_blade", 1],
        ]);
        //endregion
        return render;
    };
    RainMakerRenderer.pool = {};
    return RainMakerRenderer;
}());
var RainSubstrateRecipes = /** @class */ (function () {
    function RainSubstrateRecipes() {
    }
    RainSubstrateRecipes.addSubstrate = function (substrate) {
        if (substrate.id <= 0) {
            summonException("Invalid substrate id");
        }
        if (substrate.speed < 0 || substrate.speed > 1) {
            summonException("Invalid substrate speed");
        }
        this.substrates.push(substrate);
    };
    RainSubstrateRecipes.findById = function (id) {
        return this.substrates.find(function (recipe) { return recipe.id === id; });
    };
    RainSubstrateRecipes.substrates = [];
    return RainSubstrateRecipes;
}());
IDRegistry.genItemID("gearCopper");
Item.createItem("gearCopper", "Copper Gear", { name: "gearCopper", meta: 0 }, {});
IDRegistry.genItemID("gearTin");
Item.createItem("gearTin", "Tin Gear", { name: "gearTin", meta: 0 }, {});
IDRegistry.genItemID("gearBronze");
Item.createItem("gearBronze", "Bronze Gear", { name: "gearBronze", meta: 0 }, {});
Item.addCreativeGroup(GROUP_GEARS, GROUP_GEARS_NAME, [ItemID.gearCopper, ItemID.gearTin, ItemID.gearBronze]);
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: ItemID.gearCopper, count: 1, data: 0 }, [
        " W ",
        "WWW",
        " W "
    ], ['W', ItemID.ingotCopper, -1]);
    Recipes.addShaped({ id: ItemID.gearTin, count: 1, data: 0 }, [
        " W ",
        "WXW",
        " W "
    ], ['W', ItemID.ingotTin, -1, 'X', ItemID.ingotCopper, -1]);
    Recipes.addShaped({ id: ItemID.gearBronze, count: 1, data: 0 }, [
        " W ",
        "WXW",
        " W "
    ], ['W', ItemID.ingotBronze, -1, 'X', ItemID.ingotCopper, -1]);
});
IDRegistry.genItemID("impregnatedCasing");
Item.createItem("impregnatedCasing", "Impregnated Casing", { name: "impregnatedCasing", meta: 0 }, {});
IDRegistry.genItemID("hardenedMachine");
Item.createItem("hardenedMachine", "Hardened Casing", { name: "hardenedMachine", meta: 0 }, {});
IDRegistry.genItemID("sturdyMachine");
Item.createItem("sturdyMachine", "Sturdy Casing", { name: "sturdyMachine", meta: 0 }, {});
Item.addCreativeGroup(GROUP_CASINGS, GROUP_CASINGS_NAME, [ItemID.impregnatedCasing, ItemID.hardenedMachine, ItemID.sturdyMachine]);
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: ItemID.sturdyMachine, count: 1, data: 0 }, [
        "WWW",
        "W W",
        "WWW"
    ], ['W', ItemID.ingotBronze, -1]);
});
IDRegistry.genItemID("thermionicTubeDiamond");
Item.createItem("thermionicTubeDiamond", "Diamond Thermionic Tube", { name: "thermionicTubeDiamond", meta: 0 }, {});
IDRegistry.genItemID("thermionicTubeGold");
Item.createItem("thermionicTubeGold", "Gold Thermionic Tube", { name: "thermionicTubeGold", meta: 0 }, {});
IDRegistry.genItemID("thermionicTubeBronze");
Item.createItem("thermionicTubeBronze", "Bronze Thermionic Tube", { name: "thermionicTubeBronze", meta: 0 }, {});
IDRegistry.genItemID("thermionicTubeCopper");
Item.createItem("thermionicTubeCopper", "Copper Thermionic Tube", { name: "thermionicTubeCopper", meta: 0 }, {});
IDRegistry.genItemID("thermionicTubeIron");
Item.createItem("thermionicTubeIron", "Iron Thermionic Tube", { name: "thermionicTubeIron", meta: 0 }, {});
IDRegistry.genItemID("thermionicTubeTin");
Item.createItem("thermionicTubeTin", "Tin Thermionic Tube", { name: "thermionicTubeTin", meta: 0 }, {});
IDRegistry.genItemID("thermionicTubeObsidian");
Item.createItem("thermionicTubeObsidian", "Obsidian Thermionic Tube", { name: "thermionicTubeObsidian", meta: 0 }, {});
IDRegistry.genItemID("thermionicTubeBlaze");
Item.createItem("thermionicTubeBlaze", "Blaze Thermionic Tube", { name: "thermionicTubeBlaze", meta: 0 }, {});
IDRegistry.genItemID("thermionicTubeRubber");
Item.createItem("thermionicTubeRubber", "Rubber Thermionic Tube", { name: "thermionicTubeRubber", meta: 0 }, {});
IDRegistry.genItemID("thermionicTubeEmerald");
Item.createItem("thermionicTubeEmerald", "Emerald Thermionic Tube", { name: "thermionicTubeEmerald", meta: 0 }, {});
IDRegistry.genItemID("thermionicTubeApatite");
Item.createItem("thermionicTubeApatite", "Apatite Thermionic Tube", { name: "thermionicTubeApatite", meta: 0 }, {});
IDRegistry.genItemID("thermionicTubeLapis");
Item.createItem("thermionicTubeLapis", "Lapis Thermionic Tube", { name: "thermionicTubeLapis", meta: 0 }, {});
Item.addCreativeGroup(GROUP_TUBES, GROUP_TUBES_NAME, [
    ItemID.thermionicTubeDiamond,
    ItemID.thermionicTubeGold,
    ItemID.thermionicTubeBronze,
    ItemID.thermionicTubeCopper,
    ItemID.thermionicTubeIron,
    ItemID.thermionicTubeTin,
    ItemID.thermionicTubeObsidian,
    ItemID.thermionicTubeBlaze,
    ItemID.thermionicTubeRubber,
    ItemID.thermionicTubeEmerald,
    ItemID.thermionicTubeApatite,
    ItemID.thermionicTubeLapis
]);
IDRegistry.genItemID("chipsetBasic");
Item.createItem("chipsetBasic", "Basic Circuit Board", { name: "chipsetBasic", meta: 0 }, {});
IDRegistry.genItemID("chipsetEnhanced");
Item.createItem("chipsetEnhanced", "Enhanced Circuit Board", { name: "chipsetEnhanced", meta: 0 }, {});
IDRegistry.genItemID("chipsetIntricate");
Item.createItem("chipsetIntricate", "Intricate Circuit Board", { name: "chipsetIntricate", meta: 0 }, {});
IDRegistry.genItemID("chipsetRefined");
Item.createItem("chipsetRefined", "Refined Circuit Board", { name: "chipsetRefined", meta: 0 }, {});
Item.addCreativeGroup(GROUP_CHIPSETS, GROUP_CHIPSETS_NAME, [ItemID.chipsetBasic, ItemID.chipsetEnhanced, ItemID.chipsetIntricate, ItemID.chipsetRefined]);
IDRegistry.genBlockID("carpenter");
FactoryManager.register("carpenter", "Carpenter", [["carpenter_top", 0], ["carpenter_top", 0], ["carpenter", 0], ["carpenter", 0], ["carpenter_side", 0], ["carpenter_side", 0]], true);
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: BlockID.carpenter, count: 1, data: 0 }, [
        "bgb",
        "bfb",
        "bgb"
    ], ['b', ItemID.ingotBronze, 0, 'g', 20, 0, 'f', ItemID.sturdyMachine, 0]);
});
//ICRenderLib.addConnectionBlock("bc-container", BlockID.carpenter);
GROUP_ITEM_PIPE.add(BlockID.carpenter, -1);
var carpenterGUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: "Carpenter"
            }
        },
        inventory: {
            standard: true
        },
        background: {
            standard: true
        }
    },
    drawing: [
        { type: "bitmap", x: 335, y: 100, bitmap: "forestry.scales.energy_empty", scale: 3.2 },
        { type: "bitmap", x: 556, y: 70, bitmap: "forestry.for.carpenter.bg", scale: 3.2 }
    ],
    elements: {
        "energyScale": {
            type: "scale",
            x: 335,
            y: 100,
            direction: 1,
            value: 0,
            bitmap: "forestry.scales.energy_full",
            scale: 3.2
        },
        "progressScale": {
            type: "scale",
            x: 665,
            y: 179,
            direction: 1,
            value: 0,
            bitmap: "forestry.for.carpenter.scale",
            scale: 3.2
        },
        "liquidScale": {
            type: "scale",
            x: 828,
            y: 73,
            direction: 1,
            value: 0,
            bitmap: "forestry.bgs.liquid_2",
            scale: 3.2
        },
        "slotRecipe": { type: "slot", x: 606, y: 182, size: 51, visual: true },
        "slotSpecial": { type: "slot", x: 612, y: 79 },
        "slotOutput": { type: "slot", x: 727, y: 193 },
        "slotContainer": { type: "slot", x: 727, y: 79, bitmap: "forestry.slots.liquid" },
    }
});
{
    var content = carpenterGUI.getContent();
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            content.elements["slotInput" + (i * 3 + j)] = { type: "slot", x: 385 + j * 60, y: 75 + i * 60 };
        }
    }
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 9; j++) {
            content.elements["slotResources" + (i * 9 + j)] = { type: "slot", x: 335 + j * 60, y: 281 + i * 60 };
        }
    }
}
MachineRegistry.addUiTitleTranslation(carpenterGUI);
{
    var vanillaWood = [
        {
            id: 17,
            variations: 4
        },
        {
            id: 162,
            variations: 2
        }
    ];
    for (var i in vanillaWood) {
        var wood = vanillaWood[i];
        var woodId = wood.id;
        for (var j = 0; j < wood.variations; j++) {
            CarpenterManager.registerRecipe({
                input: { 4: { id: woodId, data: j } },
                liquid: "water",
                liquidAmount: 0.25,
                time: 5,
                result: {
                    id: ItemID.woodPulp,
                    count: 4,
                    data: 0
                }
            });
            if (ForestryConfig.crateEnabled) {
                CarpenterManager.registerRecipe({
                    input: {
                        1: { id: woodId, data: j },
                        3: { id: woodId, data: j },
                        5: { id: woodId, data: j },
                        7: { id: woodId, data: j }
                    },
                    liquid: "water",
                    liquidAmount: 1,
                    time: 5,
                    result: {
                        id: ItemID.crate,
                        count: 24,
                        data: 0
                    }
                });
            }
            CarpenterManager.registerRecipe({
                input: {
                    0: { id: woodId, data: j },
                    1: { id: woodId, data: j },
                    2: { id: woodId, data: j },
                    3: { id: woodId, data: j },
                    5: { id: woodId, data: j },
                    6: { id: woodId, data: j },
                    7: { id: woodId, data: j },
                    8: { id: woodId, data: j }
                },
                liquid: "seedOil",
                liquidAmount: 0.25,
                time: 50,
                result: {
                    id: ItemID.impregnatedCasing,
                    count: 1,
                    data: 0
                }
            });
            CarpenterManager.registerRecipe({
                input: { 4: { id: woodId, data: j }, 7: { id: woodId, data: j } },
                liquid: "seedOil",
                liquidAmount: 0.1,
                time: 10,
                result: {
                    id: ItemID.stickImpregnated,
                    count: 2,
                    data: 0
                }
            });
        }
    }
}
CarpenterManager.registerRecipe({
    input: {
        0: { id: ItemID.ingotTin, data: 0 },
        1: { id: 102, data: 0 },
        2: { id: ItemID.ingotTin, data: 0 },
        3: { id: ItemID.ingotTin, data: 0 },
        4: { id: 102, data: 0 },
        5: { id: ItemID.ingotTin, data: 0 },
        6: { id: 331, data: 0 },
        7: { id: 264, data: 0 },
        8: { id: 331, data: 0 }
    },
    liquid: "water",
    liquidAmount: 2,
    result: {
        id: ItemID.analyzer,
        count: 1,
        data: 0
    }
});
CarpenterManager.registerRecipe({
    input: {
        0: { id: 331, data: 0 }, 2: { id: 331, data: 0 },
        3: { id: 331, data: 0 }, 4: { id: ItemID.ingotTin, data: 0 }, 5: { id: 331, data: 0 },
        6: { id: 331, data: 0 }, 8: { id: 331, data: 0 }
    },
    liquid: "water",
    liquidAmount: 1,
    result: {
        id: ItemID.chipsetBasic,
        count: 1,
        data: 0
    }
});
CarpenterManager.registerRecipe({
    input: {
        0: { id: 331, data: 0 }, 1: { id: ItemID.ingotBronze, data: 0 }, 2: { id: 331, data: 0 },
        3: { id: 331, data: 0 }, 4: { id: ItemID.ingotBronze, data: 0 }, 5: { id: 331, data: 0 },
        6: { id: 331, data: 0 }, 7: { id: ItemID.ingotBronze, data: 0 }, 8: { id: 331, data: 0 }
    },
    liquid: "water",
    liquidAmount: 1,
    result: {
        id: ItemID.chipsetEnhanced,
        count: 1,
        data: 0
    }
});
CarpenterManager.registerRecipe({
    input: {
        0: { id: 331, data: 0 }, 1: { id: 265, data: 0 }, 2: { id: 331, data: 0 },
        3: { id: 331, data: 0 }, 4: { id: 265, data: 0 }, 5: { id: 331, data: 0 },
        6: { id: 331, data: 0 }, 7: { id: 265, data: 0 }, 8: { id: 331, data: 0 }
    },
    liquid: "water",
    liquidAmount: 1,
    result: {
        id: ItemID.chipsetIntricate,
        count: 1,
        data: 0
    }
});
CarpenterManager.registerRecipe({
    input: {
        0: { id: 331, data: 0 }, 1: { id: 266, data: 0 }, 2: { id: 331, data: 0 },
        3: { id: 331, data: 0 }, 4: { id: 266, data: 0 }, 5: { id: 331, data: 0 },
        6: { id: 331, data: 0 }, 7: { id: 266, data: 0 }, 8: { id: 331, data: 0 }
    },
    liquid: "water",
    liquidAmount: 1,
    result: {
        id: ItemID.chipsetRefined,
        count: 1,
        data: 0
    }
});
CarpenterManager.registerRecipe({
    input: { 4: { id: ItemID.woodPulp, data: 0 }, 7: { id: ItemID.woodPulp, data: 0 } },
    liquid: "water",
    liquidAmount: 0.25,
    result: {
        id: 339,
        count: 1,
        data: 0
    }
});
CarpenterManager.registerRecipe({
    input: { 4: { id: ItemID.brokenBronzePickaxe, data: 0 } },
    result: {
        id: ItemID.ingotBronze,
        count: 2,
        data: 0
    }
});
CarpenterManager.registerRecipe({
    input: { 4: { id: ItemID.brokenBronzeShovel, data: 0 } },
    result: {
        id: ItemID.ingotBronze,
        count: 1,
        data: 0
    }
});
CarpenterManager.registerRecipe({
    input: {
        0: { id: ItemID.silkWisp, data: 0 },
        1: { id: ItemID.silkWisp, data: 0 },
        2: { id: ItemID.silkWisp, data: 0 },
        3: { id: ItemID.silkWisp, data: 0 },
        4: { id: ItemID.silkWisp, data: 0 },
        5: { id: ItemID.silkWisp, data: 0 },
        6: { id: ItemID.silkWisp, data: 0 },
        7: { id: ItemID.silkWisp, data: 0 },
        8: { id: ItemID.silkWisp, data: 0 }
    },
    liquid: "water",
    liquidAmount: 0.5,
    result: {
        id: ItemID.wovenSilk,
        count: 1,
        data: 0
    }
});
CarpenterManager.registerRecipe({
    input: {
        0: { id: ItemID.honeyDrop, data: 0 },
        1: { id: ItemID.royalJelly, data: 0 },
        2: { id: ItemID.honeyDrop, data: 0 },
        3: { id: ItemID.royalJelly, data: 0 },
        4: { id: ItemID.canEmpty, data: 0 },
        5: { id: ItemID.royalJelly, data: 0 },
        6: { id: 289, data: 0 },
        7: { id: ItemID.royalJelly, data: 0 },
        8: { id: 289, data: 0 }
    },
    liquid: "water",
    liquidAmount: 1,
    result: {
        id: ItemID.dissipationCharge,
        count: 1,
        data: 0
    }
});
CarpenterManager.registerRecipe({
    input: {
        0: { id: ItemID.honeyDrop, data: 0 },
        1: { id: ItemID.pollen1, data: 0 },
        2: { id: ItemID.honeyDrop, data: 0 },
        3: { id: ItemID.pollen1, data: 0 },
        4: { id: ItemID.canEmpty, data: 0 },
        5: { id: ItemID.pollen1, data: 0 },
        6: { id: 289, data: 0 },
        7: { id: ItemID.pollen1, data: 0 },
        8: { id: 289, data: 0 }
    },
    liquid: "water",
    liquidAmount: 1,
    result: {
        id: ItemID.iodineCapsule,
        count: 1,
        data: 0
    }
});
CarpenterManager.registerRecipe({
    input: {
        0: { id: 3, data: 0 }, 1: { id: 12, data: 0 }, 2: { id: 3, data: 0 },
        3: { id: 12, data: 0 }, 4: { id: ItemID.mulch, data: 0 }, 5: { id: 12, data: 0 },
        6: { id: 3, data: 0 }, 7: { id: 12, data: 0 }, 8: { id: 3, data: 0 }
    },
    liquid: "water",
    liquidAmount: 1,
    result: {
        id: BlockID.bog,
        count: 8,
        data: 0
    }
});
CarpenterManager.registerRecipe({
    input: {
        0: { id: ItemID.wovenSilk, data: 0 },
        1: { id: 264, data: 0 },
        2: { id: ItemID.wovenSilk, data: 0 },
        3: { id: ItemID.wovenSilk, data: 0 },
        4: { id: ItemID.backpackAdventurer, data: 0 },
        5: { id: ItemID.wovenSilk, data: 0 },
        6: { id: ItemID.wovenSilk, data: 0 },
        7: { id: ItemID.wovenSilk, data: 0 },
        8: { id: ItemID.wovenSilk, data: 0 }
    },
    liquid: "water",
    liquidAmount: 1,
    result: {
        id: ItemID.backpackAdventurerT2,
        count: 1,
        data: 0
    }
});
CarpenterManager.registerRecipe({
    input: {
        0: { id: ItemID.wovenSilk, data: 0 },
        1: { id: 264, data: 0 },
        2: { id: ItemID.wovenSilk, data: 0 },
        3: { id: ItemID.wovenSilk, data: 0 },
        4: { id: ItemID.backpackMiners, data: 0 },
        5: { id: ItemID.wovenSilk, data: 0 },
        6: { id: ItemID.wovenSilk, data: 0 },
        7: { id: ItemID.wovenSilk, data: 0 },
        8: { id: ItemID.wovenSilk, data: 0 }
    },
    liquid: "water",
    liquidAmount: 1,
    result: {
        id: ItemID.backpackMinersT2,
        count: 1,
        data: 0
    }
});
CarpenterManager.registerRecipe({
    input: {
        0: { id: ItemID.wovenSilk, data: 0 },
        1: { id: 264, data: 0 },
        2: { id: ItemID.wovenSilk, data: 0 },
        3: { id: ItemID.wovenSilk, data: 0 },
        4: { id: ItemID.backpackBuilder, data: 0 },
        5: { id: ItemID.wovenSilk, data: 0 },
        6: { id: ItemID.wovenSilk, data: 0 },
        7: { id: ItemID.wovenSilk, data: 0 },
        8: { id: ItemID.wovenSilk, data: 0 }
    },
    liquid: "water",
    liquidAmount: 1,
    result: {
        id: ItemID.backpackBuilderT2,
        count: 1,
        data: 0
    }
});
CarpenterManager.registerRecipe({
    input: {
        0: { id: ItemID.wovenSilk, data: 0 },
        1: { id: 264, data: 0 },
        2: { id: ItemID.wovenSilk, data: 0 },
        3: { id: ItemID.wovenSilk, data: 0 },
        4: { id: ItemID.backpackDigger, data: 0 },
        5: { id: ItemID.wovenSilk, data: 0 },
        6: { id: ItemID.wovenSilk, data: 0 },
        7: { id: ItemID.wovenSilk, data: 0 },
        8: { id: ItemID.wovenSilk, data: 0 }
    },
    liquid: "water",
    liquidAmount: 1,
    result: {
        id: ItemID.backpackDiggerT2,
        count: 1,
        data: 0
    }
});
CarpenterManager.registerRecipe({
    input: {
        0: { id: ItemID.wovenSilk, data: 0 },
        1: { id: 264, data: 0 },
        2: { id: ItemID.wovenSilk, data: 0 },
        3: { id: ItemID.wovenSilk, data: 0 },
        4: { id: ItemID.backpackForester, data: 0 },
        5: { id: ItemID.wovenSilk, data: 0 },
        6: { id: ItemID.wovenSilk, data: 0 },
        7: { id: ItemID.wovenSilk, data: 0 },
        8: { id: ItemID.wovenSilk, data: 0 }
    },
    liquid: "water",
    liquidAmount: 1,
    result: {
        id: ItemID.backpackForesterT2,
        count: 1,
        data: 0
    }
});
CarpenterManager.registerRecipe({
    input: {
        0: { id: ItemID.wovenSilk, data: 0 },
        1: { id: 264, data: 0 },
        2: { id: ItemID.wovenSilk, data: 0 },
        3: { id: ItemID.wovenSilk, data: 0 },
        4: { id: ItemID.backpackHunter, data: 0 },
        5: { id: ItemID.wovenSilk, data: 0 },
        6: { id: ItemID.wovenSilk, data: 0 },
        7: { id: ItemID.wovenSilk, data: 0 },
        8: { id: ItemID.wovenSilk, data: 0 }
    },
    liquid: "water",
    liquidAmount: 1,
    result: {
        id: ItemID.backpackHunterT2,
        count: 1,
        data: 0
    }
});
CarpenterManager.registerRecipe({
    input: {
        0: { id: 3, data: 0 }, 1: { id: 3, data: 0 }, 2: { id: 3, data: 0 },
        3: { id: 3, data: 0 }, 4: { id: ItemID.mulch, data: 0 }, 5: { id: 3, data: 0 },
        6: { id: 3, data: 0 }, 7: { id: 3, data: 0 }, 8: { id: 3, data: 0 }
    },
    liquid: "water",
    liquidAmount: 1,
    result: {
        id: BlockID.humus,
        count: 9,
        data: 0
    }
});
CarpenterManager.registerRecipe({
    input: {
        1: { id: ItemID.woodPulp, data: 0 },
        3: { id: ItemID.woodPulp, data: 0 },
        5: { id: ItemID.woodPulp, data: 0 },
        7: { id: ItemID.woodPulp, data: 0 }
    },
    liquid: "water",
    liquidAmount: 1,
    result: {
        id: ItemID.carton,
        count: 2,
        data: 0
    }
});
CarpenterManager.registerRecipe({
    input: {
        0: { id: ItemID.ingotBronze, data: 0 },
        1: { id: ItemID.ingotBronze, data: 0 },
        2: { id: ItemID.ingotBronze, data: 0 },
        4: { id: 280, data: 0 },
        7: { id: 280, data: 0 }
    },
    special: {
        id: ItemID.carton,
        data: 0,
        dec: true
    },
    result: {
        id: ItemID.kitPickaxe,
        count: 1,
        data: 0
    }
});
CarpenterManager.registerRecipe({
    input: {
        1: { id: ItemID.royalJelly, data: 0 },
        3: { id: 5, data: 0 },
        4: { id: 5, data: 0 },
        5: { id: 5, data: 0 },
        6: { id: ItemID.beeswax, data: 0 },
        7: { id: ItemID.pollen1, data: 0 },
        8: { id: ItemID.beeswax, data: 0 }
    },
    liquid: "honey",
    liquidAmount: 0.5,
    result: {
        id: ItemID.scentedPaneling,
        count: 1,
        data: 0
    }
});
CarpenterManager.registerRecipe({
    input: { 1: { id: ItemID.ingotBronze, data: 0 }, 4: { id: 280, data: 0 }, 7: { id: 280, data: 0 } },
    special: {
        id: ItemID.carton,
        data: 0,
        dec: true
    },
    result: {
        id: ItemID.kitShovel,
        count: 1,
        data: 0
    }
});
CarpenterManager.registerRecipe({
    input: {
        1: { id: ItemID.pulsatingMesh, data: 0 },
        3: { id: ItemID.pulsatingMesh, data: 0 },
        4: { id: ItemID.pulsatingMesh, data: 0 },
        5: { id: ItemID.pulsatingMesh, data: 0 },
        7: { id: ItemID.pulsatingMesh, data: 0 }
    },
    result: {
        id: 368,
        count: 1,
        data: 0
    }
});
CarpenterManager.registerRecipe({
    input: {
        0: { id: 264, data: 0 },
        2: { id: 264, data: 0 },
        4: { id: ItemID.sturdyMachine, data: 0 },
        6: { id: 264, data: 0 },
        8: { id: 264, data: 0 }
    },
    liquid: "water",
    liquidAmount: 5,
    result: {
        id: ItemID.hardenedMachine,
        count: 1,
        data: 0
    }
});
MachineRegistry.registerConsumer(BlockID.carpenter, {
    useNetworkItemContainer: true,
    defaultValues: {
        progress: 0,
        progressMax: 0
    },
    init: function () {
        this.liquidStorage.setLimit(null, 10);
        var container = this.container;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var slotName = "slotInput" + (i * 3 + j);
                container.setSlotAddTransferPolicy(slotName, function (name, slotName, id, count, data, extra) {
                    container.setSlot(slotName, id, count, data, extra);
                    return 0;
                });
                container.setSlotGetTransferPolicy(slotName, function (name, slotName) {
                    container.clearSlot(slotName);
                    return 0;
                });
            }
        }
    },
    findWork: function () {
        var pattern = [];
        for (var i = 0; i < 9; i++) {
            pattern[i] = this.container.getSlot("slotInput".concat(i));
        }
        var recipe = CarpenterManager.getRecipe(pattern);
        if (recipe) {
            var liquid = recipe.liquid;
            var liquidAmount = recipe.liquidAmount || 1;
            if (liquid && this.liquidStorage.getAmount(liquid) < liquidAmount) {
                return;
            }
            var slotSpecial = this.container.getSlot("slotSpecial");
            var special = recipe.special;
            if (special) {
                if (slotSpecial.id !== special.id || slotSpecial.data != (special.data || 0))
                    return;
            }
            var slots = {};
            for (var i = 0; i < 9; i++) {
                var item = this.container.getSlot("slotInput".concat(i));
                if (!item.id)
                    continue;
                for (var k = 0; k < 18; k++) {
                    var slot = this.container.getSlot("slotResources".concat(k));
                    if (slot.id && ContainerHelper.equals(slot, item)) {
                        var count = slots[k];
                        if (!count) {
                            slots[k] = 1;
                        }
                        else {
                            if (slot.count < count + 1) {
                                if (k === 17)
                                    return;
                                continue;
                            }
                            slots[k] = count + 1;
                        }
                        break;
                    }
                    else if (k === 17) {
                        return;
                    }
                }
            }
            for (var i in slots) {
                var slot = this.container.getSlot("slotResources".concat(i));
                this.container.setSlot("slotResources".concat(i), slot.id, slot.count - slots[i], slot.data);
            }
            this.liquidStorage.getLiquid(liquid, liquidAmount);
            if (special && special.dec) {
                this.container.setSlot("slotSpecial", special.id, slotSpecial.count - 1, special.data);
            }
            this.data.progress = 1;
            this.data.progressMax = recipe.time || 50;
            var output = recipe.result;
            this.container.setSlot("slotRecipe", output.id, output.count || 1, output.data || 0);
            this.container.validateAll();
        }
    },
    tick: function () {
        if (World.getThreadTime() % 5 !== 0)
            return;
        ContainerHelper.drainContainer(null, this, "slotContainer");
        if (this.data.energy >= 204) {
            if (this.data.progress) {
                if (this.data.progress > this.data.progressMax) {
                    var item = this.container.getSlot("slotRecipe");
                    if (ContainerHelper.putInSlot(this.container, "slotOutput", item)) {
                        this.container.clearSlot("slotRecipe");
                        this.data.progress = 0;
                    }
                }
                else {
                    this.data.progress++;
                    this.data.energy -= 204;
                }
            }
            else
                this.findWork();
        }
        this.container.setScale("progressScale", (this.data.progress / this.data.progressMax) || 0);
        this.container.setScale("energyScale", this.data.energy / this.getEnergyStorage());
        this.updateLiquidScale("liquidScale", this.liquidStorage.getLiquidStored());
        this.container.validateAll();
        this.container.sendChanges();
    },
    getEnergyStorage: function () {
        return 4000;
    },
    destroy: function () {
        for (var i = 0; i < 9; i++) {
            this.container.clearSlot("slotInput".concat(i));
        }
    },
    getScreenByName: function () {
        return carpenterGUI;
    }
});
{
    var slots = {
        "slotSpecial": {
            input: true,
            isValid: function (item, side) {
                return side === EBlockSide.UP;
            }
        },
        "slotOutput": {
            output: true
        },
    };
    for (var i = 0; i < 18; i++) {
        slots["slotResources".concat(i)] = {
            input: true
        };
    }
    StorageInterface.createInterface(BlockID.carpenter, {
        slots: slots,
        canReceiveLiquid: function (liquid) {
            var liquidStored = this.tileEntity.liquidStorage.getLiquidStored();
            return !liquidStored || liquidStored === liquid;
        }
    });
}
IDRegistry.genBlockID("centrifuge");
FactoryManager.register("centrifuge", "Centrifuge", [["centrifuge_top", 0], ["centrifuge_top", 0], ["centrifuge", 0], ["centrifuge", 0], ["centrifuge_side", 0], ["centrifuge_side", 0]], true);
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: BlockID.centrifuge, count: 1, data: 0 }, [
        "cgc",
        "cmc",
        "cgc"
    ], ['c', ItemID.ingotCopper, -1, 'g', 20, -1, 'm', ItemID.sturdyMachine, -1]);
});
GROUP_ITEM_PIPE.add(BlockID.centrifuge, -1);
var centrifugeGUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: "Centrifuge"
            }
        },
        inventory: {
            standard: true
        },
        background: {
            standard: true
        }
    },
    drawing: [
        { type: "bitmap", x: 335, y: 140, bitmap: "forestry.scales.energy_empty", scale: 3.2 },
        { type: "bitmap", x: 385, y: 120, bitmap: "forestry.for.centrifuge.bg", scale: 3.2 },
    ],
    elements: {
        "progressScale": {
            type: "scale",
            x: 487,
            y: 178,
            direction: 1,
            value: 0,
            bitmap: "forestry.for.centrifuge.scale",
            scale: 3.2
        },
        "progressScale2": {
            type: "scale",
            x: 564,
            y: 178,
            direction: 1,
            value: 0,
            bitmap: "forestry.for.centrifuge.scale",
            scale: 3.2
        },
        "energyScale": {
            type: "scale",
            x: 335,
            y: 140,
            direction: 1,
            value: 0,
            bitmap: "forestry.scales.energy_full",
            scale: 3.2
        },
        "slotInput": { type: "slot", x: 398, y: 181, size: 52 },
        "slotRecipe": { type: "slot", x: 505, y: 181, size: 52, visual: true }
    }
});
MachineRegistry.addUiTitleTranslation(centrifugeGUI);
{
    var content = centrifugeGUI.getContent();
    var x = 620;
    var y = 116;
    for (var i = 0; i < 9; i++) {
        content.elements["slotOutput".concat(i)] = { type: "slot", x: x, y: y };
        x += 61;
        if (x >= 800) {
            x = 620;
            y += 61;
        }
    }
}
CentrifugeManager.registerRecipe({
    input: {
        id: ItemID.propolisSilky
    },
    result: [
        {
            id: ItemID.propolis,
            chance: 0.8
        },
        {
            id: ItemID.silkWisp,
            chance: 0.6
        }
    ]
});
CentrifugeManager.registerRecipe({
    input: {
        id: ItemID.combCocoa
    },
    result: [
        {
            id: ItemID.beeswax
        },
        {
            id: VanillaItemID.cocoa_beans,
            chance: 0.9
        }
    ]
});
CentrifugeManager.registerRecipe({
    input: {
        id: ItemID.combDripping
    },
    result: [
        {
            id: ItemID.honeyDrop,
            chance: 0.4
        },
        {
            id: ItemID.honeydew
        }
    ]
});
CentrifugeManager.registerRecipe({
    input: {
        id: ItemID.combHoney
    },
    result: [
        {
            id: ItemID.beeswax
        },
        {
            id: ItemID.honeyDrop,
            chance: 0.9
        }
    ]
});
CentrifugeManager.registerRecipe({
    input: {
        id: ItemID.combFrozen
    },
    result: [
        {
            id: ItemID.beeswax,
            chance: 0.8
        },
        {
            id: ItemID.honeyDrop,
            chance: 0.7
        },
        {
            id: 332,
            chance: 0.2
        },
        {
            id: ItemID.pollen,
            chance: 0.2
        }
    ]
});
CentrifugeManager.registerRecipe({
    input: {
        id: ItemID.combMellow
    },
    result: [
        {
            id: ItemID.beeswax,
            chance: 0.2
        },
        {
            id: 406,
            chance: 0.3
        },
        {
            id: ItemID.honeydew,
            chance: 0.6
        }
    ]
});
CentrifugeManager.registerRecipe({
    input: {
        id: ItemID.combMossy
    },
    result: [
        {
            id: ItemID.beeswax
        },
        {
            id: ItemID.honeyDrop,
            chance: 0.9
        }
    ]
});
CentrifugeManager.registerRecipe({
    input: {
        id: ItemID.combMysterious
    },
    result: [
        {
            id: ItemID.honeyDrop,
            chance: 0.4
        },
        {
            id: ItemID.propolisPulse
        }
    ]
});
CentrifugeManager.registerRecipe({
    input: {
        id: ItemID.combParched
    },
    result: [
        {
            id: ItemID.beeswax
        },
        {
            id: ItemID.honeyDrop,
            chance: 0.9
        }
    ]
});
CentrifugeManager.registerRecipe({
    input: {
        id: ItemID.combPowdery
    },
    result: [
        {
            id: 289,
            chance: 0.9
        },
        {
            id: ItemID.beeswax,
            chance: 0.2
        },
        {
            id: ItemID.honeyDrop,
            chance: 0.2
        }
    ]
});
CentrifugeManager.registerRecipe({
    input: {
        id: ItemID.combSilky
    },
    result: [
        {
            id: ItemID.honeyDrop
        },
        {
            id: ItemID.propolisSilky,
            chance: 0.8
        }
    ]
});
CentrifugeManager.registerRecipe({
    input: {
        id: ItemID.combSimmering
    },
    result: [
        {
            id: ItemID.refractoryWax
        },
        {
            id: ItemID.phosphor,
            chance: 0.9
        }
    ]
});
CentrifugeManager.registerRecipe({
    input: {
        id: ItemID.combStringy
    },
    result: [
        {
            id: ItemID.honeyDrop,
            chance: 0.4
        },
        {
            id: ItemID.propolis
        }
    ]
});
CentrifugeManager.registerRecipe({
    input: {
        id: ItemID.combWheaten
    },
    result: [
        {
            id: 296,
            chance: 0.8
        },
        {
            id: ItemID.honeyDrop,
            chance: 0.2
        },
        {
            id: ItemID.beeswax,
            chance: 0.2
        }
    ]
});
MachineRegistry.registerConsumer(BlockID.centrifuge, {
    useNetworkItemContainer: true,
    defaultValues: {
        progress: 0,
        progressMax: 0,
        outputIDs: []
    },
    findWork: function () {
        var slot = this.container.getSlot("slotInput");
        var recipe = CentrifugeManager.getRecipe(slot.id, slot.data);
        if (recipe) {
            this.container.setSlot("slotRecipe", slot.id, 1, slot.data);
            this.data.progress = 1;
            this.data.progressMax = recipe.time || 20;
            var result = recipe.result;
            var newResult = [];
            for (var i in result) {
                var item = result[i];
                if (!item.chance || Math.random() < item.chance)
                    newResult.push(item);
            }
            this.data.outputIDs = newResult;
            this.container.setSlot("slotInput", slot.id, slot.count - 1, slot.data);
            this.container.validateSlot("slotInput");
        }
    },
    putResult: function () {
        var result = this.data.outputIDs;
        var notAdded = [];
        for (var i in result) {
            var item = result[i];
            var added = false;
            for (var j = 0; j < 9; j++) {
                var slotName = "slotOutput".concat(j);
                var slot = this.container.getSlot(slotName);
                if (!slot.id) {
                    this.container.setSlot(slotName, item.id, 1, item.data);
                    added = true;
                    break;
                }
                else if (slot.id === item.id && slot.data === item.data && slot.count < Item.getMaxStack(slot.id)) {
                    this.container.setSlot(slotName, slot.id, slot.count + 1, slot.data);
                    added = true;
                    break;
                }
            }
            if (!added)
                notAdded.push(item);
        }
        this.data.outputIDs = notAdded;
        return !notAdded.length;
    },
    tick: function () {
        if (World.getThreadTime() % 5 !== 0)
            return;
        if (this.data.energy >= 160) {
            if (this.data.progress) {
                if (this.data.progress >= this.data.progressMax) {
                    if (this.putResult()) {
                        this.container.clearSlot("slotRecipe");
                        this.data.progress = 0;
                    }
                }
                else {
                    this.data.progress++;
                    this.data.energy -= 160;
                }
            }
            else
                this.findWork();
        }
        var progress = (this.data.progress / this.data.progressMax) || 0;
        this.container.setScale("progressScale", progress);
        this.container.setScale("progressScale2", progress);
        this.container.setScale("energyScale", this.data.energy / this.getEnergyStorage());
        this.container.sendChanges();
    },
    getEnergyStorage: function () {
        return 5000;
    },
    getMaxTransfer: function () {
        return 800;
    },
    getScreenByName: function () {
        return centrifugeGUI;
    }
});
{
    var slots = {
        "slotInput": {
            input: true
        }
    };
    for (var i = 0; i < 9; i++) {
        slots["slotOutput".concat(i)] = {
            output: true
        };
    }
    StorageInterface.createInterface(BlockID.centrifuge, {
        slots: slots
    });
}
Block.setPrototype("fabricator", {
    type: Block.TYPE_ROTATION,
    getVariations: function () {
        return [{
                name: "Thermionic Fabricator",
                texture: [["fabricator_bottom", 0], ["fabricator_top", 0], ["fabricator_side", 0], ["fabricator_front", 0], ["fabricator_side", 0], ["fabricator_side", 0]],
                inCreative: true
            }];
    }
});
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: BlockID.fabricator, count: 1, data: 0 }, [
        "cgc",
        "g g",
        "cbc"
    ], ['c', 266, -1, 'g', 20, -1, 'b', 54, -1]);
});
GROUP_ITEM_PIPE.add(BlockID.fabricator, -1);
Item.addCreativeGroup(GROUP_MACHINES, GROUP_MACHINES_NAME, [BlockID.fabricator]);
var fabricatorGUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: "Thermionic Fabricator"
            }
        },
        inventory: {
            standard: true
        },
        background: {
            standard: true
        }
    },
    drawing: [
        { type: "bitmap", x: 335, y: 100, bitmap: "forestry.scales.energy_empty", scale: 3.2 },
        { type: "bitmap", x: 385, y: 88, bitmap: "forestry.for.fabricator.bg", scale: 3.2 }
    ],
    elements: {
        "energyScale": {
            type: "scale",
            x: 335,
            y: 100,
            direction: 1,
            value: 0,
            bitmap: "forestry.scales.energy_full",
            scale: 3.2
        },
        "smeltingScale": {
            type: "scale",
            x: 404,
            y: 189,
            direction: 1,
            value: 0,
            bitmap: "forestry.slots.gray",
            scale: 3.2
        },
        "temperatureScale": {
            type: "scale",
            x: 497,
            y: 90,
            direction: 1,
            value: 0,
            bitmap: "forestry.for.fabricator.scale",
            scale: 3.2
        },
        "slotGlass": { type: "slot", x: 402, y: 104, bitmap: "forestry.slots.gray", size: 51 },
        "slotSpecial": { type: "slot", x: 787, y: 88 },
        "slotResult": { type: "slot", x: 787, y: 203 }
    }
});
MachineRegistry.addUiTitleTranslation(fabricatorGUI);
{
    var content = fabricatorGUI.getContent();
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            content.elements["slotInput".concat(i * 3 + j)] = { type: "slot", x: 541 + j * 60, y: 88 + i * 60 };
        }
    }
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 9; j++) {
            content.elements["slotResources".concat(i * 9 + j)] = { type: "slot", x: 335 + j * 60, y: 281 + i * 60 };
        }
    }
}
//Smelting
FabricatorManager.addSmelting({
    input: {
        id: 20
    },
    amount: 1,
    temperature: 1000
});
FabricatorManager.addSmelting({
    input: {
        id: 12
    },
    amount: 1,
    temperature: 3000
});
FabricatorManager.addSmelting({
    input: {
        id: 12,
        data: 1
    },
    amount: 1,
    temperature: 3000
});
FabricatorManager.addSmelting({
    input: {
        id: 102
    },
    amount: 0.375,
    temperature: 1000
});
FabricatorManager.addSmelting({
    input: {
        id: 24
    },
    amount: 4,
    temperature: 4800
});
FabricatorManager.addSmelting({
    input: {
        id: 24,
        data: 1
    },
    amount: 4,
    temperature: 4800
});
FabricatorManager.addSmelting({
    input: {
        id: 24,
        data: 2
    },
    amount: 4,
    temperature: 4800
});
//Recipes
function registerTubeRecipe(itemId, materialId, materialData) {
    if (materialData === void 0) { materialData = 0; }
    FabricatorManager.registerRecipe({
        input: {
            1: { id: materialId, data: materialData },
            3: { id: 331, data: 0 },
            4: { id: materialId, data: materialData },
            5: { id: 331, data: 0 },
            6: { id: materialId, data: materialData },
            7: { id: materialId, data: materialData },
            8: { id: materialId, data: materialData }
        },
        result: {
            id: itemId,
            count: 4,
            data: 0
        },
    });
}
registerTubeRecipe(ItemID.thermionicTubeCopper, ItemID.ingotCopper);
registerTubeRecipe(ItemID.thermionicTubeTin, ItemID.ingotTin);
registerTubeRecipe(ItemID.thermionicTubeBronze, ItemID.ingotBronze);
registerTubeRecipe(ItemID.thermionicTubeDiamond, 264);
registerTubeRecipe(ItemID.thermionicTubeGold, 266);
registerTubeRecipe(ItemID.thermionicTubeIron, 265);
registerTubeRecipe(ItemID.thermionicTubeObsidian, 49);
registerTubeRecipe(ItemID.thermionicTubeBlaze, 377);
registerTubeRecipe(ItemID.thermionicTubeEmerald, 388);
registerTubeRecipe(ItemID.thermionicTubeApatite, ItemID.apatite);
registerTubeRecipe(ItemID.thermionicTubeLapis, VanillaItemID.lapis_lazuli);
MachineRegistry.registerConsumer(BlockID.fabricator, {
    useNetworkItemContainer: true,
    TEMPERATURE_MAX: 5000,
    defaultValues: {
        temperature: 0,
        glassAmount: 0,
        output: null
    },
    init: function () {
        this.liquidStorage.setLimit(null, 8);
        var container = this.container;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var slotName = "slotInput" + (i * 3 + j);
                container.setSlotAddTransferPolicy(slotName, function (name, slotName, id, count, data, extra) {
                    container.setSlot(slotName, id, count, data, extra);
                    return 0;
                });
                container.setSlotGetTransferPolicy(slotName, function (name, slotName) {
                    container.clearSlot(slotName);
                    return 0;
                });
            }
        }
    },
    decreaseTemperature: function () {
        var temperature = this.data.temperature;
        if (temperature > 2500)
            this.data.temperature -= 2;
        else
            this.data.temperature--;
    },
    findWork: function () {
        var pattern = [];
        for (var i = 0; i < 9; i++) {
            pattern[i] = this.container.getSlot("slotInput".concat(i));
        }
        var recipe = FabricatorManager.getRecipe(pattern);
        if (recipe) {
            var slotSpecial = this.container.getSlot("slotSpecial");
            var special = recipe.special;
            if (special) {
                // noinspection EqualityComparisonWithCoercionJS
                if (slotSpecial.id !== special.id || slotSpecial.data != (special.data || 0))
                    return;
            }
            var slots = {};
            for (var i = 0; i < 9; i++) {
                var item = this.container.getSlot("slotInput".concat(i));
                if (!item.id)
                    continue;
                for (var k = 0; k < 18; k++) {
                    var slot = this.container.getSlot("slotResources".concat(k));
                    if (slot.id && ContainerHelper.equals(slot, item)) {
                        var count = slots[k];
                        if (!count) {
                            slots[k] = 1;
                        }
                        else {
                            if (slot.count < count + 1) {
                                if (k === 17)
                                    return;
                                continue;
                            }
                            slots[k] = count + 1;
                        }
                        break;
                    }
                    else if (k === 17) {
                        return;
                    }
                }
            }
            for (var i in slots) {
                var slot = this.container.getSlot("slotResources".concat(i));
                this.container.setSlot("slotResources".concat(i), slot.id, slot.count - slots[i], slot.data);
            }
            if (special && special.dec) {
                this.container.setSlot("slotSpecial", slotSpecial.id, slotSpecial.count - 1, slotSpecial.data);
            }
            this.data.output = recipe.result;
            this.data.glassAmount = recipe.amount;
            this.container.validateAll();
        }
    },
    trySmelt: function () {
        var slot = this.container.getSlot("slotGlass");
        var smelting = FabricatorManager.getSmelting(slot.id, slot.data);
        if (smelting && this.data.temperature >= smelting.temperature) {
            if (this.liquidStorage.getAmount("forestryGlass") + smelting.amount <= 2) {
                this.liquidStorage.addLiquid("forestryGlass", smelting.amount);
                this.container.setSlot("slotGlass", slot.id, slot.count - 1, slot.data);
                this.container.validateSlot("slotGlass");
            }
        }
    },
    heat: function () {
        this.data.temperature = Math.min(this.TEMPERATURE_MAX, this.data.temperature + 10);
    },
    tick: function () {
        if (World.getThreadTime() % 5 !== 0)
            return;
        if (this.data.energy >= 200) {
            if (this.data.output) {
                this.heat();
                this.trySmelt();
                if (this.liquidStorage.getAmount("forestryGlass") >= this.data.glassAmount
                    && ContainerHelper.putInSlot(this.container, "slotResult", this.data.output)) {
                    this.liquidStorage.getLiquid("forestryGlass", this.data.glassAmount);
                    this.data.output = null;
                }
                this.data.energy -= 200;
            }
            else {
                this.findWork();
            }
        }
        if (this.data.temperature > 0) {
            this.decreaseTemperature();
        }
        else if (this.liquidStorage.getAmount("forestryGlass")) {
            this.liquidStorage.getLiquid("forestryGlass", 0.05);
        }
        this.container.setScale("temperatureScale", this.data.temperature / this.TEMPERATURE_MAX);
        this.container.setScale("energyScale", this.data.energy / this.getEnergyStorage());
        this.updateLiquidScale("smeltingScale", "forestryGlass");
        this.container.sendChanges();
    },
    getEnergyStorage: function () {
        return 3300;
    },
    destroy: function () {
        for (var i = 0; i < 9; i++) {
            this.container.clearSlot("slotInput".concat(i));
        }
    },
    getScreenByName: function () {
        return fabricatorGUI;
    }
});
{
    var slots = {
        "slotGlass": {
            input: true,
            isValid: function (item, side) {
                return side === EBlockSide.UP;
            }
        },
        "slotResult": {
            output: true
        },
    };
    for (var i = 0; i < 18; i++) {
        slots["slotResources".concat(i)] = {
            input: true
        };
    }
    StorageInterface.createInterface(BlockID.fabricator, {
        slots: slots
    });
}
IDRegistry.genBlockID("fermenter");
FactoryManager.register("fermenter", "Fermenter", [["fermenter_top", 0], ["fermenter_top", 0], ["fermenter", 0], ["fermenter", 0], ["fermenter_side", 0], ["fermenter_side", 0]], true);
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: BlockID.fermenter, count: 1, data: 0 }, [
        "cgc",
        "gmg",
        "cgc"
    ], ['c', ItemID.gearBronze, -1, 'g', 20, -1, 'm', ItemID.sturdyMachine, -1]);
});
GROUP_ITEM_PIPE.add(BlockID.fermenter, -1);
var fermenterGUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: "Fermenter"
            }
        },
        inventory: {
            standard: true
        },
        background: {
            standard: true
        }
    },
    drawing: [
        { type: "bitmap", x: 335, y: 160, bitmap: "forestry.scales.energy_empty", scale: 3.2 },
        { type: "bitmap", x: 385, y: 122, bitmap: "forestry.for.fermenter.bg", scale: 3.2 },
    ],
    elements: {
        "energyScale": {
            type: "scale",
            x: 335,
            y: 160,
            direction: 1,
            value: 0,
            bitmap: "forestry.scales.energy_full",
            scale: 3.2
        },
        "progressScale": {
            type: "scale",
            x: 532,
            y: 166,
            direction: 1,
            value: 0,
            bitmap: "forestry.for.fermenter.scale_green",
            scale: 3.2
        },
        "reagentScale": {
            type: "scale",
            x: 609,
            y: 211,
            direction: 1,
            value: 0,
            bitmap: "forestry.for.fermenter.scale_red",
            scale: 3.2
        },
        "liquidInputScale": {
            type: "scale",
            x: 455.2,
            y: 125,
            direction: 1,
            value: 0,
            bitmap: "forestry.bgs.liquid_2",
            scale: 3.2
        },
        "liquidOutputScale": {
            type: "scale",
            x: 646.2,
            y: 125,
            direction: 1,
            value: 0,
            bitmap: "forestry.bgs.liquid_2",
            scale: 3.2
        },
        "slotInput": { type: "slot", x: 567, y: 138, bitmap: "forestry.slots.gray", size: 51.2 },
        "slotFuel": { type: "slot", x: 535, y: 246, bitmap: "forestry.slots.gray", size: 51.2 },
        "slotInputContainer": { type: "slot", x: 385, y: 186, bitmap: "forestry.slots.liquid" },
        "slotContainer": { type: "slot", x: 711, y: 131, bitmap: "forestry.slots.container" },
        "slotFilledContainer": { type: "slot", x: 711, y: 246 },
    }
});
MachineRegistry.addUiTitleTranslation(fermenterGUI);
FermenterManager.addFuel({
    id: ItemID.fertilizerBio,
    perCycle: 250,
    cycles: 45,
});
FermenterManager.addFuel({
    id: ItemID.fertilizerCompound,
    perCycle: 200,
    cycles: 56,
});
for (var i in fermenterLiquids) {
    var modifier = fermenterLiquids[i];
    FermenterManager.addRecipe({
        id: 6,
        inputLiquid: i,
        liquidAmount: 0.25,
        modifier: modifier,
        liquid: "biomass"
    });
    FermenterManager.addRecipe({
        id: 81,
        inputLiquid: i,
        liquidAmount: 0.05,
        modifier: modifier,
        liquid: "biomass"
    });
    FermenterManager.addRecipe({
        id: 296,
        inputLiquid: i,
        liquidAmount: 0.05,
        modifier: modifier,
        liquid: "biomass"
    });
    FermenterManager.addRecipe({
        id: 338,
        inputLiquid: i,
        liquidAmount: 0.05,
        modifier: modifier,
        liquid: "biomass"
    });
    FermenterManager.addRecipe({
        id: 392,
        inputLiquid: i,
        liquidAmount: 0.05,
        modifier: modifier,
        liquid: "biomass"
    });
    FermenterManager.addRecipe({
        id: 39,
        inputLiquid: i,
        liquidAmount: 0.05,
        modifier: modifier,
        liquid: "biomass"
    });
    FermenterManager.addRecipe({
        id: 40,
        inputLiquid: i,
        liquidAmount: 0.05,
        modifier: modifier,
        liquid: "biomass"
    });
}
MachineRegistry.registerConsumer(BlockID.fermenter, {
    useNetworkItemContainer: true,
    defaultValues: {
        progress: 0,
        progressMax: 1,
        modifier: 1,
        fuelBurnTime: 0,
        fuelBurnMax: 0,
        fuelFerment: 0,
        resultFluid: null,
        containerFluid: null,
        inputFluid: null
    },
    init: function () {
        this.liquidStorage.setLimit(null, 10);
    },
    findWork: function () {
        var slot = this.container.getSlot("slotInput");
        var recipe = FermenterManager.getRecipe(slot.id, slot.data, this.data.inputFluid);
        if (recipe) {
            if (this.data.containerFluid && this.data.containerFluid !== recipe.liquid)
                return;
            this.data.modifier = recipe.modifier;
            this.data.resultFluid = recipe.liquid;
            this.data.progress = this.data.progressMax = recipe.liquidAmount * 1000;
            this.container.setSlot("slotInput", slot.id, slot.count - 1, slot.data);
            this.container.validateSlot("slotInput");
        }
    },
    findFuel: function () {
        if (!this.data.fuelBurnTime) {
            var slot = this.container.getSlot("slotFuel");
            var fuel = FermenterManager.getFuel(slot.id, slot.data);
            if (fuel) {
                this.data.fuelBurnTime = this.data.fuelBurnMax = fuel.cycles || 1;
                this.data.fuelFerment = fuel.perCycle || 1;
                this.container.setSlot("slotFuel", slot.id, slot.count - 1, slot.data);
                this.container.validateSlot("slotFuel");
                return true;
            }
            return false;
        }
        return true;
    },
    tick: function () {
        if (World.getThreadTime() % 5 !== 0)
            return;
        var inputFluid = ContainerHelper.drainContainer(this.data.inputFluid, this, "slotInputContainer");
        if (inputFluid)
            this.data.inputFluid = inputFluid;
        if (ContainerHelper.fillContainer(this.data.containerFluid, this, "slotContainer", "slotFilledContainer")) {
            if (this.liquidStorage.getAmount(this.data.containerFluid) <= 0) {
                this.data.containerFluid = null;
            }
        }
        if (this.data.energy >= 150) {
            if (this.data.progress > 0) {
                if (this.findFuel()) {
                    var fermented = Math.min(this.data.fuelFerment, this.data.progress) * this.data.modifier;
                    var _fermented = fermented / 1000;
                    var inputFluid_1 = this.data.inputFluid;
                    var resultFluid = this.data.resultFluid;
                    if (this.liquidStorage.getAmount(inputFluid_1) >= _fermented
                        && this.liquidStorage.getAmount(resultFluid) + _fermented <= 10) {
                        this.data.progress -= fermented;
                        this.data.fuelBurnTime--;
                        this.data.containerFluid = resultFluid;
                        this.liquidStorage.addLiquid(resultFluid, _fermented);
                        this.liquidStorage.getLiquid(inputFluid_1, _fermented);
                        this.data.energy -= 150;
                    }
                }
            }
            else
                this.findWork();
        }
        this.container.setScale("energyScale", this.data.energy / this.getEnergyStorage());
        this.container.setScale("reagentScale", (this.data.fuelBurnTime / this.data.fuelBurnMax) || 0);
        this.container.setScale("progressScale", (this.data.progress / this.data.progressMax) || 0);
        this.updateLiquidScale("liquidInputScale", inputFluid || this.data.inputFluid);
        this.updateLiquidScale("liquidOutputScale", this.data.containerFluid);
        this.container.sendChanges();
    },
    getEnergyStorage: function () {
        return 8000;
    },
    getMaxTransfer: function () {
        return 2000;
    },
    getScreenByName: function () {
        return fermenterGUI;
    }
});
StorageInterface.createInterface(BlockID.fermenter, {
    slots: {
        "slotInput": {
            input: true,
            isValid: function (item) {
                return !!FermenterManager.getRecipeByItem(item.id, item.data);
            },
        },
        "slotFuel": {
            input: true,
            isValid: function (item) {
                return !!FermenterManager.getFuel(item.id, item.data);
            },
        },
        "slotFilledContainer": {
            output: true
        },
        "slotInputContainer": {
            input: true,
            output: true,
            canOutput: function (item) {
                return LiquidRegistry.getEmptyItem(item.id, item.data) == null;
            },
            isValid: function (item) {
                return LiquidRegistry.getEmptyItem(item.id, item.data) != null;
            },
        },
        "slotContainer": {
            input: true,
            isValid: function (item) {
                return !LiquidRegistry.getEmptyItem(item.id, item.data);
            },
        },
    },
    canReceiveLiquid: function (liquid) {
        if (!this.tileEntity.inputFluid && this.tileEntity.getLiquidModifier(liquid) > 0) {
            this.tileEntity.inputFluid = liquid;
            return true;
        }
        return this.tileEntity.inputFluid === liquid;
    },
    canTransportLiquid: function (liquid) {
        return this.tileEntity.data.resultFluid === liquid;
    },
});
IDRegistry.genBlockID("moistener");
FactoryManager.register("moistener", "Moistener", [["moistener_top", 0], ["moistener_top", 0], ["moistener", 0], ["moistener", 0], ["moistener_side", 0], ["moistener_side", 0]], true);
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: BlockID.moistener, count: 1, data: 0 }, [
        "gsg",
        "sbs",
        "gsg"
    ], ['b', BlockID.fermenter, -1, 'g', ItemID.gearCopper, -1, 's', 20, -1]);
});
GROUP_ITEM_PIPE.add(BlockID.moistener, -1);
var moistenerGUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: "Moistener"
            }
        },
        inventory: {
            standard: true
        },
        background: {
            standard: true
        }
    },
    drawing: [
        { type: "bitmap", x: 418, y: 90, bitmap: "forestry.for.moistener.bg", scale: 3.2 },
        { type: "bitmap", x: 335, y: 90, bitmap: "forestry.bgs.liquid_1", scale: 3.2 }
    ],
    elements: {
        "liquidScale": {
            type: "scale",
            x: 339,
            y: 94,
            direction: 1,
            value: 0,
            bitmap: "forestry.bgs.liquid_2",
            scale: 3.2
        },
        "progressScale": {
            type: "scale",
            x: 655,
            y: 215,
            direction: 1,
            value: 0,
            bitmap: "forestry.for.moistener.arrow_0",
            scale: 3.2
        },
        "progressScale2": {
            type: "scale",
            x: 656,
            y: 99,
            direction: 1,
            value: 0,
            bitmap: "forestry.for.moistener.arrow_1",
            scale: 3.2
        },
        "progressScale3": {
            type: "scale",
            x: 745,
            y: 160,
            value: 0,
            bitmap: "forestry.for.moistener.arrow_2",
            scale: 3.2
        },
        "slotOutput_00": { type: "slot", x: 469, y: 90, size: 59 },
        "slotOutput_01": { type: "slot", x: 529, y: 90, size: 59 },
        "slotOutput_02": { type: "slot", x: 589, y: 90, size: 59 },
        "slotOutput_03": { type: "slot", x: 469, y: 150, size: 59 },
        "slotOutput_04": { type: "slot", x: 529, y: 150, size: 59 },
        "slotOutput_05": { type: "slot", x: 589, y: 150, size: 59 },
        "slotOutput_10": { type: "slot", x: 469, y: 224, size: 59 },
        "slotOutput_11": { type: "slot", x: 529, y: 224, size: 59 },
        "slotOutput_12": { type: "slot", x: 589, y: 224, size: 59 },
        "slotOutput_20": { type: "slot", x: 681, y: 157, size: 59 },
        "slotContainer": { type: "slot", x: 402, y: 102, size: 59, bitmap: "forestry.slots.liquid" },
        "slotEmptyContainer": { type: "slot", x: 402, y: 218, size: 59, bitmap: "forestry.slots.container" },
        "slotRecipe": { type: "slot", x: 799, y: 99, size: 59 },
        "slotResult": { type: "slot", x: 799, y: 214, size: 59 }
    }
});
MachineRegistry.addUiTitleTranslation(moistenerGUI);
//Fuel
MoistenerManager.registerFuel({
    inputItem: { id: 296 },
    outputItem: { id: ItemID.mouldyWheat },
    time: 300,
});
MoistenerManager.registerFuel({
    inputItem: { id: ItemID.mouldyWheat },
    outputItem: { id: ItemID.decayingWheat },
    time: 600,
});
MoistenerManager.registerFuel({
    inputItem: { id: ItemID.decayingWheat },
    outputItem: { id: ItemID.mulch },
    time: 900,
});
//Recipes
MoistenerManager.registerRecipe({
    inputItem: { id: 295 },
    outputItem: { id: 110 },
    time: 5000,
});
MoistenerManager.registerRecipe({
    inputItem: { id: 4 },
    outputItem: { id: 48 },
    time: 20000,
});
MoistenerManager.registerRecipe({
    inputItem: { id: 98 },
    outputItem: { id: 98, data: 1 },
    time: 20000,
});
MoistenerManager.registerRecipe({
    inputItem: { id: 18, data: 1 },
    outputItem: { id: 3 },
    time: 5000,
});
var MOISTENER_SLOTS = [
    {
        prefix: "slotOutput_0",
        amount: 5
    },
    {
        prefix: "slotOutput_1",
        amount: 2
    },
    {
        prefix: "slotOutput_2",
        amount: 0
    }
];
MachineRegistry.registerDefault(BlockID.moistener, {
    useNetworkItemContainer: true,
    defaultValues: {
        progress: 0,
        progressMax: 0,
        progressRecipe: 0,
        progressRecipeMax: 0,
        outputBurn: null,
        outputRecipe: null,
        slots: null,
        recipeSlot: 0
    },
    init: function () {
        this.liquidStorage.setLimit("water", 10);
    },
    getSpeed: function () {
        var light = this.blockSource.getLightLevel(this.x, this.y + 1, this.z);
        return light >= 9 ? 1 : (light >= 7 ? 2 : (light >= 5 ? 3 : 4));
    },
    enoughSpace: function (prefix, amount, id, data) {
        for (; amount >= 0; amount--) {
            var slot = this.container.getSlot(prefix + amount);
            if (!slot.id)
                return true;
            if (slot.id === id && slot.data === data && slot.count < Item.getMaxStack(id))
                return true;
        }
        return false;
    },
    findRecipe: function () {
        if (!this.data.progressRecipe) {
            var slot = this.container.getSlot("slotRecipe");
            var recipe = MoistenerManager.getRecipe(slot.id, slot.data);
            if (recipe) {
                this.data.progressRecipe = 1;
                this.data.progressRecipeMax = recipe.time;
                this.data.outputRecipe = recipe.outputItem;
                this.container.setSlot("slotRecipe", slot.id, slot.count - 1, slot.data);
                this.container.validateSlot("slotRecipe");
            }
            else
                return false;
        }
        return true;
    },
    startBurning: function () {
        var length = MOISTENER_SLOTS.length;
        for (var i = 0; i < length; i++) {
            var slots = MOISTENER_SLOTS[i];
            var nextSlots = void 0;
            if (i === length - 1)
                nextSlots = MOISTENER_SLOTS[0];
            else
                nextSlots = MOISTENER_SLOTS[i + 1];
            var data = this.getForGroup(slots.prefix, slots.amount, nextSlots.prefix, nextSlots.amount);
            if (data) {
                var fuelData = data.fuelData;
                this.data.progress = 1;
                this.data.progressMax = fuelData.time;
                this.data.slots = { prefix: nextSlots.prefix, amount: nextSlots.amount };
                this.data.outputBurn = fuelData.outputItem;
                this.data.recipeSlot = slots.prefix + data.slot;
            }
        }
    },
    getForGroup: function (prefix, amount, outPrefix, outAmount) {
        for (; amount >= 0; amount--) {
            var slot = this.container.getSlot(prefix + amount);
            var fuelData = MoistenerManager.getFuelInfo(slot.id, slot.data);
            if (fuelData) {
                var output = fuelData.outputItem;
                if (this.enoughSpace(outPrefix, outAmount, output.id, output.data))
                    return { fuelData: fuelData, slot: amount };
            }
        }
        return null;
    },
    putToSlots: function (amount, prefix, item) {
        for (; amount >= 0; amount--) {
            if (ContainerHelper.putInSlot(this.container, prefix + amount, item))
                return true;
        }
        return false;
    },
    tick: function () {
        if (World.getThreadTime() % 20 === 0)
            ContainerHelper.drainContainer2("water", this, "slotContainer", "slotEmptyContainer");
        if (this.findRecipe()) {
            if (this.data.progressRecipe >= this.data.progressRecipeMax) {
                if (ContainerHelper.putInSlot(this.container, "slotResult", this.data.outputRecipe)) {
                    this.data.progressRecipe = 0;
                }
            }
            else if (this.data.progress) {
                var slot = this.container.getSlot(this.data.recipeSlot);
                if (!MoistenerManager.getFuelInfo(slot.id, slot.data)) {
                    this.data.progress = 0;
                    return;
                }
                if (this.data.progress >= this.data.progressMax) {
                    var output = this.data.outputBurn;
                    var slots = this.data.slots;
                    if (this.putToSlots(slots.amount, slots.prefix, output)) {
                        this.container.setSlot(this.data.recipeSlot, slot.id, slot.count - 1, slot.data);
                        this.container.validateSlot(this.data.recipeSlot);
                    }
                    this.data.progress = 0;
                }
                else {
                    if (this.liquidStorage.getAmount("water") >= 0.001) {
                        var speed = this.getSpeed();
                        this.data.progress += speed;
                        this.data.progressRecipe += speed;
                        this.liquidStorage.getLiquid("water", 0.001);
                    }
                }
            }
            else {
                this.startBurning();
            }
        }
        var progress = (this.data.progress / this.data.progressMax) || 0;
        this.container.setScale("progressScale2", progress);
        this.container.setScale("progressScale", progress);
        this.container.setScale("progressScale3", (this.data.progressRecipe / this.data.progressRecipeMax) || 0);
        this.updateLiquidScale("liquidScale", "water");
        this.container.sendChanges();
    },
    getScreenByName: function () {
        return moistenerGUI;
    },
});
{
    var slots = {
        "slotContainer": {
            input: true,
            isValid: function (item) {
                return LiquidRegistry.getEmptyItem(item.id, item.data) != null;
            },
        },
        "slotRecipe": {
            input: true,
            isValid: function (item) {
                return !!MoistenerManager.getRecipe(item.id, item.data);
            },
        },
        "slotResult": {
            output: true
        },
        "slotEmptyContainer": {
            output: true
        }
    };
    for (var i = 0; i < 11; i++) {
        var number = "";
        if (i < 6) {
            number = "0" + i;
        }
        else if (i < 10) {
            number = "1" + (i - 6);
        }
        else
            number = "20";
        slots["slotOutput_" + i] = {
            input: true,
            output: true,
            isValid: function (item) {
                return !!MoistenerManager.getFuelInfo(item.id, item.data);
            },
            canOutput: function (item) {
                return !MoistenerManager.getFuelInfo(item.id, item.data);
            }
        };
    }
    StorageInterface.createInterface(BlockID.moistener, {
        slots: slots,
        canReceiveLiquid: function (liquid) {
            return liquid === "water";
        }
    });
}
if (ForestryConfig.rainTankEnabled) {
    Block.setPrototype("rainTank", {
        type: Block.TYPE_BASE,
        getVariations: function () {
            return [{
                    name: "Rain Tank",
                    texture: [["rainTank", 0], ["rainTank", 0], ["rainTank", 1]],
                    inCreative: true
                }];
        }
    });
    Callback.addCallback("PostLoaded", function () {
        Recipes.addShaped({ id: BlockID.rainTank, count: 1, data: 0 }, [
            "igi",
            "isi",
            "igi"
        ], ['i', 265, 0, 'g', 20, 0, 's', ItemID.sturdyMachine, 0]);
    });
    GROUP_ITEM_PIPE.add(BlockID.rainTank, -1);
}
var raintankGUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: "Rain Tank"
            }
        },
        inventory: {
            standard: true
        },
        background: {
            standard: true
        }
    },
    drawing: [
        { type: "bitmap", x: 335, y: 90, bitmap: "forestry.for.raintank.bg", scale: 3.2 },
    ],
    elements: {
        "liquidScale": {
            type: "scale",
            x: 338.2,
            y: 93.2,
            direction: 1,
            value: 0,
            bitmap: "forestry.bgs.liquid_3",
            scale: 3.2
        },
        "slotContainer": { type: "slot", x: 536.6, y: 96.4, bitmap: "forestry.slots.container" },
        "slotFullContainer": { type: "slot", x: 536.6, y: 211.6, bitmap: "forestry.slots.liquid" },
    }
});
if (ForestryConfig.rainTankEnabled) {
    MachineRegistry.registerDefault(BlockID.rainTank, {
        useNetworkItemContainer: true,
        defaultValues: {},
        init: function () {
            this.liquidStorage.setLimit(null, 15);
        },
        tick: function () {
            this.updateLiquidScale("liquidScale", "water");
            ContainerHelper.fillContainer("water", this, "slotContainer", "slotFullContainer");
            if (!(World.getThreadTime() % 20) && this.blockSource.canSeeSky(this.x, this.y + 1, this.z) && World.getWeather().rain) {
                this.liquidStorage.addLiquid("water", 0.01);
            }
            this.container.sendChanges();
        },
        getScreenByName: function () {
            return raintankGUI;
        }
    });
    StorageInterface.createInterface(BlockID.rainTank, {
        slots: {
            "slotContainer": {
                input: true
            },
            "slotFullContainer": {
                output: true
            }
        },
        canTransportLiquid: function () {
            return true;
        },
    });
}
IDRegistry.genBlockID("squeezer");
FactoryManager.register("squeezer", "Squeezer", [["squeezer_top", 0], ["squeezer_top", 0], ["squeezer", 0], ["squeezer", 0], ["squeezer_side", 0], ["squeezer_side", 0]], true);
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: BlockID.squeezer, count: 1, data: 0 }, [
        "cgc",
        "cmc",
        "cgc"
    ], ['c', ItemID.ingotTin, -1, 'g', 20, -1, 'm', ItemID.sturdyMachine, -1]);
});
GROUP_ITEM_PIPE.add(BlockID.squeezer, -1);
var squeezerGUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: "Squeezer"
            }
        },
        inventory: {
            standard: true
        },
        background: {
            standard: true
        }
    },
    drawing: [
        { type: "bitmap", x: 335, y: 110, bitmap: "forestry.scales.energy_empty", scale: 3.2 },
        { type: "bitmap", x: 400, y: 75, bitmap: "forestry.for.squeezer.bg", scale: 3.2 },
        { type: "bitmap", x: 610, y: 145, bitmap: "forestry.scales.furnace_empty", scale: 3.2 },
        { type: "bitmap", x: 696, y: 80, bitmap: "forestry.bgs.liquid_1", scale: 3.2 },
        { type: "bitmap", x: 765, y: 155, bitmap: "forestry.for.squeezer.arrow", scale: 3.2 }
    ],
    elements: {
        "energyScale": {
            type: "scale",
            x: 335,
            y: 110,
            direction: 1,
            value: 0,
            bitmap: "forestry.scales.energy_full",
            scale: 3.2
        },
        "progressScale": {
            type: "scale",
            x: 610,
            y: 145,
            value: 0,
            bitmap: "forestry.scales.furnace_full",
            scale: 3.2
        },
        "liquidScale": {
            type: "scale",
            x: 699,
            y: 84,
            direction: 1,
            value: 0,
            bitmap: "forestry.bgs.liquid_2",
            scale: 3.2
        },
        "slotSpecial": { type: "slot", x: 615, y: 205 },
        "slotEmptyContainer": { type: "slot", x: 760, y: 80, bitmap: "forestry.slots.container" },
        "slotContainer": { type: "slot", x: 760, y: 210, bitmap: "forestry.slots.liquid" }
    }
});
MachineRegistry.addUiTitleTranslation(squeezerGUI);
{
    var content = squeezerGUI.getContent();
    var x = 412;
    var y = 87;
    for (var i = 0; i < 9; i++) {
        content.elements["slot".concat(i)] = { type: "slot", x: x, y: y, bitmap: "forestry.slots.gray", size: 54 };
        x += 60;
        if (x >= 560) {
            x = 412;
            y += 60;
        }
    }
}
SqueezerManager.registerRecipe({
    input: [{ id: 260 }],
    special: {
        id: ItemID.mulch,
        chance: 0.4
    },
    liquid: "appleJuice",
    liquidAmount: 0.2
});
SqueezerManager.registerRecipe({
    input: [{ id: 391 }],
    special: {
        id: ItemID.mulch,
        chance: 0.4
    },
    liquid: "appleJuice",
    liquidAmount: 0.2
});
SqueezerManager.registerRecipe({
    input: [{ id: 295 }],
    liquid: "seedOil",
    liquidAmount: 0.01
});
SqueezerManager.registerRecipe({
    input: [{ id: 361 }],
    liquid: "seedOil",
    liquidAmount: 0.01
});
SqueezerManager.registerRecipe({
    input: [{ id: 362 }],
    liquid: "seedOil",
    liquidAmount: 0.01
});
SqueezerManager.registerRecipe({
    input: [{ id: 458 }],
    liquid: "seedOil",
    liquidAmount: 0.01
});
SqueezerManager.registerRecipe({
    input: [{ id: 81 }],
    liquid: "water",
    liquidAmount: 0.5
});
SqueezerManager.registerRecipe({
    input: [
        { id: ItemID.phosphor, count: 2 },
        { id: 4 },
    ],
    liquid: "lava",
    liquidAmount: 1.6
});
SqueezerManager.registerRecipe({
    input: [{ id: ItemID.honeyDrop }],
    special: {
        id: ItemID.propolis,
        chance: 0.05
    },
    liquid: "honey",
    liquidAmount: 0.1
});
SqueezerManager.registerRecipe({
    input: [{ id: ItemID.honeydew }],
    liquid: "honey",
    liquidAmount: 0.1
});
MachineRegistry.registerConsumer(BlockID.squeezer, {
    useNetworkItemContainer: true,
    defaultValues: {
        energy: 0,
        progress: 0,
        special: null,
        progressMax: 0,
        recipe: null
    },
    init: function () {
        this.liquidStorage.setLimit(null, 10);
    },
    findRecipe: function () {
        var container = this.container;
        var slots = {};
        for (var i = 0; i < 9; i++) {
            var slotName = "slot".concat(i);
            slots[slotName] = container.getSlot(slotName);
        }
        var recipes = SqueezerManager.getRecipes();
        var recipeSlots;
        for (var i in recipes) {
            recipeSlots = [];
            var recipe = recipes[i];
            var ingredients = recipe.input;
            for (var k in ingredients) {
                var item = ingredients[k];
                for (var j in slots) {
                    var slot = slots[j];
                    var count = item.count || 1;
                    if (ContainerHelper.equals(item, slot) && slot.count >= count) {
                        recipeSlots.push(j);
                        break;
                    }
                }
            }
            if (ingredients.length === recipeSlots.length) {
                for (var i_1 in recipeSlots) {
                    var slotName = recipeSlots[i_1];
                    var slot = slots[slotName];
                    this.container.setSlot(slotName, slot.id, slot.count - (ingredients[i_1].count || 1), slot.data);
                    container.validateSlot(slotName);
                }
                this.data.progress = 1;
                this.data.progressMax = recipe.time;
                this.data.recipe = recipe;
                var special = recipe.special;
                if (special) {
                    if (!special.chance || Math.random() < special.chance) {
                        this.data.special = special;
                        return;
                    }
                }
                this.data.special = null;
                return;
            }
        }
    },
    tick: function () {
        if (World.getThreadTime() % 5 !== 0)
            return;
        var liquidStored = this.liquidStorage.getLiquidStored();
        ContainerHelper.fillContainer(liquidStored, this, "slotEmptyContainer", "slotContainer");
        if (this.data.energy >= 200) {
            if (this.data.progress) {
                if (this.data.progress >= this.data.progressMax) {
                    var recipe = this.data.recipe;
                    var liquid = recipe.liquid;
                    if ((!liquidStored || liquidStored === liquid) && this.liquidStorage.getAmount(liquidStored) + recipe.liquidAmount <= 10) {
                        var special = this.data.special;
                        if (!special || ContainerHelper.putInSlot(this.container, "slotSpecial", special)) {
                            this.liquidStorage.addLiquid(liquid, recipe.liquidAmount);
                            this.data.progress = 0;
                        }
                    }
                }
                else {
                    this.data.progress++;
                    this.data.energy -= 200;
                }
            }
            else
                this.findRecipe();
        }
        this.container.setScale("progressScale", (this.data.progress / this.data.progressMax) || 0);
        this.container.setScale("energyScale", this.data.energy / this.getEnergyStorage());
        this.updateLiquidScale("liquidScale", liquidStored);
        this.container.sendChanges();
    },
    getEnergyStorage: function () {
        return 5000;
    },
    getScreenByName: function () {
        return squeezerGUI;
    }
});
{
    var slots = {
        "slotSpecial": {
            output: true
        },
        "slotContainer": {
            output: true
        },
    };
    for (var i = 0; i < 9; i++) {
        slots["slot".concat(i)] = {
            input: true
        };
    }
    StorageInterface.createInterface(BlockID.squeezer, {
        slots: slots,
        canTransportLiquid: function () {
            return true;
        }
    });
}
IDRegistry.genBlockID("still");
FactoryManager.register("still", "Still", [["still_top", 0], ["still_top", 0], ["still", 0], ["still", 0], ["still_side", 0], ["still_side", 0]], true);
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: BlockID.still, count: 1, data: 0 }, [
        "cgc",
        "gbg",
        "cgc"
    ], ['c', 331, -1, 'g', 20, -1, 'b', ItemID.sturdyMachine, -1]);
});
GROUP_ITEM_PIPE.add(BlockID.still, -1);
var stillGUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: "Still"
            }
        },
        inventory: {
            standard: true
        },
        background: {
            standard: true
        }
    },
    drawing: [
        { type: "bitmap", x: 335, y: 140, bitmap: "forestry.scales.energy_empty", scale: 3.2 },
        { type: "bitmap", x: 385, y: 110, bitmap: "forestry.for.still.bg", scale: 3.2 }
    ],
    elements: {
        "progressEnergyScale": {
            type: "scale",
            x: 335,
            y: 140,
            direction: 1,
            value: 0,
            bitmap: "forestry.scales.energy_full",
            scale: 3.2
        },
        "progressScale": {
            type: "scale",
            x: 625,
            y: 119.6,
            direction: 1,
            value: 0,
            bitmap: "forestry.for.still.scale",
            scale: 3.2
        },
        "liquidInputScale": {
            type: "scale",
            x: 467,
            y: 114,
            direction: 1,
            value: 0,
            bitmap: "forestry.bgs.liquid_2",
            scale: 3.2
        },
        "liquidOutputScale": {
            type: "scale",
            x: 755,
            y: 114,
            direction: 1,
            value: 0,
            bitmap: "forestry.bgs.liquid_2",
            scale: 3.2
        },
        "slotInputContainer": { type: "slot", x: 385, y: 165, bitmap: "forestry.slots.liquid" },
        "slotOutputContainer": { type: "slot", x: 833, y: 119.6, bitmap: "forestry.slots.container" },
        "slotOutputContainerFilled": { type: "slot", x: 833, y: 234.8, bitmap: "forestry.slots.liquid" },
    }
});
MachineRegistry.addUiTitleTranslation(stillGUI);
StillManager.registerRecipe({
    inputLiquid: "biomass",
    inputAmount: 0.010,
    outputLiquid: "ethanol",
    outputAmount: 0.003,
    cycles: 100
});
MachineRegistry.registerConsumer(BlockID.still, {
    useNetworkItemContainer: true,
    defaultValues: {
        progress: 0,
        progressMax: 0,
        outputAmount: 0,
        inputLiquid: null,
        outputLiquid: null,
    },
    init: function () {
        this.liquidStorage.setLimit(null, 10);
    },
    findWork: function () {
        var liquid = this.data.inputLiquid;
        var recipe = StillManager.getRecipe(liquid);
        if (!recipe)
            return false;
        var required = recipe.inputAmount * recipe.cycles;
        if (this.liquidStorage.getAmount(liquid) < required)
            return false;
        var outputLiquid = this.data.outputLiquid;
        if (!outputLiquid ||
            (outputLiquid === recipe.outputLiquid && this.liquidStorage.getAmount(outputLiquid) + (recipe.outputAmount * recipe.cycles) <= 10)) {
            this.liquidStorage.getLiquid(liquid, required);
            this.data.outputAmount = recipe.outputAmount || 1;
            this.data.outputLiquid = recipe.outputLiquid;
            this.data.progress = this.data.progressMax = recipe.cycles || 100;
            return true;
        }
        return false;
    },
    tick: function () {
        var threadTime = World.getThreadTime();
        if (threadTime % 20 === 0) {
            var inputLiquid = ContainerHelper.drainContainer(this.data.inputLiquid, this, "slotInputContainer");
            var outputLiquid = ContainerHelper.fillContainer(this.data.outputLiquid, this, "slotOutputContainer", "slotOutputContainerFilled");
            if (inputLiquid)
                this.data.inputLiquid = inputLiquid;
            if (outputLiquid)
                this.data.outputLiquid = outputLiquid;
            this.container.validateSlot("slotInputContainer");
            this.container.validateSlot("slotOutputContainer");
        }
        if (threadTime % 5 === 0) {
            if (this.data.progressMax || this.findWork()) {
                if (this.data.progress <= 0) {
                    this.liquidStorage.addLiquid(this.data.outputLiquid, this.data.outputAmount * this.data.progressMax);
                    this.data.progressMax = 0;
                }
                else if (this.data.energy >= 200) {
                    this.data.energy -= 200;
                    this.data.progress--;
                }
            }
        }
        this.updateLiquidScale("liquidInputScale", this.data.inputLiquid);
        this.updateLiquidScale("liquidOutputScale", this.data.outputLiquid);
        this.container.setScale("progressScale", (this.data.progress / this.data.progressMax) || 0);
        this.container.setScale("progressEnergyScale", this.data.energy / this.getEnergyStorage());
        this.container.sendChanges();
    },
    getEnergyStorage: function () {
        return 8000;
    },
    getScreenByName: function () {
        return stillGUI;
    },
});
StorageInterface.createInterface(BlockID.still, {
    slots: {
        "slotInputContainer": {
            input: true,
            output: true,
            canOutput: function (item) {
                return LiquidRegistry.getEmptyItem(item.id, item.data) == null;
            },
            isValid: function (item) {
                return !!LiquidRegistry.getEmptyItem(item.id, item.data);
            },
        },
        "slotOutputContainer": {
            input: true
        },
        "slotOutputContainerFilled": {
            output: true
        }
    },
    canTransportLiquid: function (liquid) {
        return this.tileEntity.data.outputLiquid === liquid;
    },
    canReceiveLiquid: function (liquid) {
        var inputLiquid = this.tileEntity.data.inputLiquid;
        if (!inputLiquid || inputLiquid === liquid || !this.tileEntity.liquidStorage.getAmount(liquid)) {
            this.tileEntity.data.inputLiquid = liquid;
            return true;
        }
        return false;
    }
});
IDRegistry.genBlockID("rainmaker");
Block.createBlock("rainmaker", [
    { name: "Rainmaker", texture: [["rainmaker_pedestal", 0]], inCreative: true }
]);
RainMakerRenderer.setStaticRender(BlockID.rainmaker);
GROUP_ITEM_PIPE.add(BlockID.rainmaker, 0);
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: BlockID.rainmaker, count: 1, data: 0 }, [
        "tgt",
        "gcg",
        "tgt"
    ], ['t', ItemID.gearTin, 0, 'g', 20, 0, 'c', ItemID.hardenedMachine, 0]);
});
TileEntity.registerPrototype(BlockID.rainmaker, {
    useNetworkItemContainer: true,
    defaultValues: {
        progress: 0,
        charge: 0,
        recipe: null,
        isCharged: false,
    },
    tick: function () {
        var data = this.data;
        var recipe = data.recipe;
        if (recipe) {
            data.progress += recipe.speed;
            if (data.progress >= .5 && !data.isCharged) {
                data.charge++;
                data.isCharged = true;
            }
            if (data.progress >= 1) {
                data.progress = 0;
                data.isCharged = false;
                if (data.charge === 7) {
                    data.charge = 0;
                    data.progress = 0;
                    data.recipe = null;
                    if (recipe.isReverse) {
                        World.setWeather({
                            rain: 0,
                            thunder: 0
                        });
                    }
                    else {
                        World.setWeather({
                            rain: 1,
                            thunder: 0
                        });
                    }
                    for (var i = 0; i < 5; i++) {
                        var dx = .5 + Math.random() - .5;
                        var dz = .5 + Math.random() - .5;
                        Debug.addParticle(EParticleType.SMOKE2, this.x + dx, this.y + .1, this.z + dz, 0, 0, 0, 0);
                    }
                }
            }
            this.sendPacket("updateRender", { progress: data.progress, charge: data.charge });
        }
        else {
            var slot = this.container.getSlot("slotSubstrate");
            if (slot.id > 0 && this.tryUseItem(slot.id)) {
                this.container.setSlot("slotSubstrate", slot.id, slot.count - 1, slot.data);
                this.container.validateSlot("slotSubstrate");
            }
        }
        this.container.sendChanges();
    },
    click: function (id, count, data, coords, player) {
        if (this.data.recipe || Entity.getDimension(player) !== EDimension.NORMAL) {
            return;
        }
        if (this.tryUseItem(id)) {
            PlayerUtils.decreaseCarriedItem(player);
        }
    },
    tryUseItem: function (id) {
        var recipe = RainSubstrateRecipes.findById(id);
        if (recipe) {
            this.data.recipe = recipe;
            this.data.charge = 1;
            return true;
        }
        return false;
    },
    client: {
        events: {
            updateRender: function (payload) {
                RainMakerRenderer.mapAtCoords(this.x, this.y, this.z, payload.progress, payload.charge);
            }
        }
    },
});
StorageInterface.createInterface(BlockID.rainmaker, {
    slots: {
        "slotSubstrate": {
            input: true,
            isValid: function (item) { return RainSubstrateRecipes.findById(item.id) !== null; }
        }
    }
});
RainSubstrateRecipes.addSubstrate({
    id: ItemID.iodineCapsule,
    speed: .01,
    isReverse: false,
});
RainSubstrateRecipes.addSubstrate({
    id: ItemID.dissipationCharge,
    speed: .075,
    isReverse: true,
});
//Factories
Translation.addTranslation("Carpenter", { ru: "Плотник" });
Translation.addTranslation("Centrifuge", { ru: "Центрифуга" });
Translation.addTranslation("Thermionic Fabricator", { ru: "Электроламповый завод" });
Translation.addTranslation("Fermenter", { ru: "Бродильный аппарат" });
Translation.addTranslation("Squeezer", { ru: "Соковыжималка" });
Translation.addTranslation("Moistener", { ru: "Увлажнитель" });
Translation.addTranslation("Still", { ru: "Дистиллятор" });
Translation.addTranslation("Rain Tank", { ru: "Сборщик дождя" });
Translation.addTranslation("Rainmaker", { ru: "Вызыватель дождя" });
//Other
Translation.addTranslation("Copper Gear", { ru: "Медная шестерня" });
Translation.addTranslation("Tin Gear", { ru: "Оловянная шестерня" });
Translation.addTranslation("Bronze Gear", { ru: "Бронзовая шестерня" });
Translation.addTranslation("Impregnated Casing", { ru: "Пропитанный корпус" });
Translation.addTranslation("Hardened Casing", { ru: "Укреплённый корпус" });
Translation.addTranslation("Sturdy Casing", { ru: "Прочный корпус" });
Translation.addTranslation("Diamond Thermionic Tube", { ru: "Алмазная электронная лампа" });
Translation.addTranslation("Gold Thermionic Tube", { ru: "Золотая электронная лампа" });
Translation.addTranslation("Bronze Thermionic Tube", { ru: "Бронзовая электронная лампа" });
Translation.addTranslation("Copper Thermionic Tube", { ru: "Медная электронная лампа" });
Translation.addTranslation("Iron Thermionic Tube", { ru: "Железная электронная лампа" });
Translation.addTranslation("Tin Thermionic Tube", { ru: "Оловянная электронная лампа" });
Translation.addTranslation("Obsidian Thermionic Tube", { ru: "Обсидиановая электронная лампа" });
Translation.addTranslation("Blaze Thermionic Tube", { ru: "Огненная электронная лампа" });
Translation.addTranslation("Rubber Thermionic Tube", { ru: "Прорезиненные электронные лампы" });
Translation.addTranslation("Emerald Thermionic Tube", { ru: "Изумрудные электронные лампы" });
Translation.addTranslation("Apatite Thermionic Tube", { ru: "Апатитовые электронные лампы" });
Translation.addTranslation("Lapis Thermionic Tube", { ru: "Лазуритовые электронные лампы" });
Translation.addTranslation("Basic Circuit Board", { ru: "Базовая печатная плата" });
Translation.addTranslation("Enhanced Circuit Board", { ru: "Продвинутая печатная плата" });
Translation.addTranslation("Intricate Circuit Board", { ru: "Усовершенствованная печатная плата" });
Translation.addTranslation("Refined Circuit Board", { ru: "Усложнённая печатная плата" });
setLoadingTip("Energy Module Loading...");
var BioGeneratorManager = /** @class */ (function () {
    function BioGeneratorManager() {
    }
    BioGeneratorManager.addFuel = function (fluid, fuel) {
        this.fuel.push(__assign(__assign({}, fuel), { fluid: fluid }));
    };
    BioGeneratorManager.getFuel = function (fluid) {
        return this.fuel.find(function (fuel) { return fuel.fluid === fluid; });
    };
    BioGeneratorManager.integrateWithRecipeViewer = function (api) {
        function bakeFuelRecipes(list) {
            return list.map(function (recipe) { return ({
                input: [],
                output: [],
                totalEnergy: recipe.ticks * recipe.energy,
                burnTime: recipe.ticks,
                fluid: recipe.fluid
            }); });
        }
        api.registerRecipeType("fpe_bio_generator_fuel", {
            contents: {
                icon: BlockID.biogenerator,
                description: "Fuel",
                drawing: [
                    {
                        type: "bitmap",
                        x: 300,
                        y: 100,
                        scale: 5,
                        bitmap: "forestry.bgs.liquid_1"
                    }
                ],
                elements: {
                    scaleFluid: {
                        type: "scale",
                        x: 305,
                        y: 105,
                        scale: 5,
                        direction: 1,
                        bitmap: "forestry.bgs.liquid_2",
                        overlay: "forestry.bgs.liquid_2"
                    },
                    textTotalEnergy: { type: "text", x: 435, y: 190, font: { size: 30 } },
                    textBurnTime: { type: "text", x: 435, y: 235, font: { size: 30 } },
                }
            },
            getList: function (id, data, isUsage) {
                if (isUsage) {
                    if (id === BlockID.biogenerator)
                        return bakeFuelRecipes(BioGeneratorManager.fuel);
                    else {
                        var empty = LiquidRegistry.getEmptyItem(id, data === -1 ? 0 : data);
                        if (empty) {
                            var recipe = BioGeneratorManager.getFuel(empty.liquid);
                            if (recipe)
                                return bakeFuelRecipes([recipe]);
                        }
                    }
                }
                return [];
            },
            onOpen: function (elements, data) {
                var scaleFluid = elements.get("scaleFluid");
                elements.get("textTotalEnergy")
                    .onBindingUpdated("text", "Total Energy: " + data.totalEnergy);
                elements.get("textBurnTime")
                    .onBindingUpdated("text", "Burn Time: " + data.burnTime);
                scaleFluid.onBindingUpdated("texture", LiquidRegistry.getLiquidUITexture(data.fluid, 16, 58));
                scaleFluid.onBindingUpdated("value", 1);
            }
        });
    };
    BioGeneratorManager.fuel = [];
    return BioGeneratorManager;
}());
var PeatFiredManager = /** @class */ (function () {
    function PeatFiredManager() {
    }
    PeatFiredManager.addFuel = function (id, energy, burnTime) {
        if (energy <= 0) {
            summonException("Energy must be > 0! (Peat Fired Fuel Registration)");
            return;
        }
        if (burnTime <= 0) {
            summonException("Burn time must be > 0! (Peat Fired Fuel Registration)");
            return;
        }
        this.fuel.push({
            id: id,
            energy: energy,
            burnTime: burnTime
        });
    };
    PeatFiredManager.getFuel = function (id) {
        return this.fuel.find(function (recipe) { return recipe.id === id; });
    };
    PeatFiredManager.integrateWithRecipeViewer = function (api) {
        function bakeFuelRecipes(list) {
            return list.map(function (recipe) { return ({
                input: [
                    { id: recipe.id, data: 0, count: 1 }
                ],
                output: [],
                totalEnergy: recipe.burnTime * recipe.energy,
                burnTime: recipe.burnTime
            }); });
        }
        api.registerRecipeType("fpe_peat_engine_fuel", {
            contents: {
                icon: BlockID.enginePeat,
                description: "Fuel",
                drawing: [],
                elements: {
                    input0: { type: "slot", x: 295, y: 125, size: 110, needClean: true },
                    textTotalEnergy: { type: "text", x: 425, y: 140, font: { size: 30 } },
                    textBurnTime: { type: "text", x: 425, y: 185, font: { size: 30 } },
                }
            },
            getList: function (id, data, isUsage) {
                if (isUsage) {
                    if (id === BlockID.enginePeat) {
                        return bakeFuelRecipes(PeatFiredManager.fuel);
                    }
                    else {
                        var fuel = PeatFiredManager.getFuel(id);
                        if (fuel)
                            return bakeFuelRecipes([fuel]);
                        else
                            return [];
                    }
                }
                else
                    return [];
            },
            onOpen: function (elements, data) {
                elements.get("textTotalEnergy")
                    .onBindingUpdated("text", "Total Energy: " + data.totalEnergy);
                elements.get("textBurnTime")
                    .onBindingUpdated("text", "Burn Time: " + data.burnTime);
            }
        });
    };
    PeatFiredManager.fuel = [];
    return PeatFiredManager;
}());
Block.setPrototype("engineBiogas", {
    type: Block.TYPE_BASE,
    getVariations: function () {
        return [{
                name: "Biogas Engine",
                texture: [["engine_biogas", 0], ["engine_biogas", 2], ["engine_biogas", 1]],
                inCreative: true
            }];
    }
});
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: BlockID.engineBiogas, count: 1, data: 0 }, [
        "bbb",
        "0s0",
        "gpg"
    ], ['b', ItemID.ingotBronze, 0, 'g', ItemID.gearBronze, 0, 'p', 33, 0, 's', 20, 0]);
});
GROUP_ITEM_PIPE.add(BlockID.engineBiogas, -1);
ModelHelper.createEngineModel(BlockID.engineBiogas);
Item.addCreativeGroup(GROUP_ENGINES, GROUP_ENGINES_NAME, [BlockID.engineBiogas]);
var guiBiogasEngine = new UI.StandartWindow({
    standard: {
        header: { text: { text: "Biogas Engine" } },
        inventory: { standard: true },
        background: { standard: true }
    },
    drawing: [
        { type: "bitmap", x: 335, y: 140, bitmap: "forestry.scales.energy_empty", scale: 3.2 },
        { type: "bitmap", x: 385, y: 110, bitmap: "forestry.for.biogas.bg", scale: 3.2 },
    ],
    elements: {
        "progressEnergyScale": {
            type: "scale",
            x: 335,
            y: 140,
            direction: 1,
            bitmap: "forestry.scales.energy_full",
            scale: 3.2
        },
        "lavaScale": {
            type: "scale",
            x: 650,
            y: 113,
            direction: 1,
            value: 0,
            bitmap: "forestry.bgs.liquid_2",
            scale: 3.2
        },
        "liquidScale": {
            type: "scale",
            x: 593,
            y: 112,
            direction: 1,
            value: 0,
            bitmap: "forestry.bgs.liquid_2",
            scale: 3.2
        },
        "burnScale": {
            type: "scale",
            x: 442.6,
            y: 186.8,
            direction: 1,
            value: 0,
            bitmap: "forestry.scales.green_flame_full",
            scale: 3.2
        },
        "warmUpScale": { type: "scale", x: 477.8, y: 202.8, direction: 1, value: 0, bitmap: "biogas_scale", scale: 3.2 },
        "slotContainer": { type: "slot", x: 714.6, y: 126, bitmap: "forestry.slots.liquid" },
        "slotEmptyContainer": { type: "slot", x: 714.6, y: 234.8, bitmap: "forestry.slots.container" }
    }
});
MachineRegistry.addUiTitleTranslation(guiBiogasEngine);
MachineRegistry.registerGenerator(BlockID.engineBiogas, {
    useNetworkItemContainer: true,
    defaultValues: {
        liquidStored: 0,
        energyOut: 0,
        burnTime: 0,
        temperature: false,
        liquidNow: 0,
        burnMax: 0,
        temperatureRem: 0
    },
    init: function () {
        this.liquidStorage.setLimit(null, 10);
    },
    getBurnTimeForLiquid: function (liq) {
        return liq === "biomass" ? 1250 :
            (liq === "seedOil" ? 2500 :
                (liq === "appleJuice" ? 2500 :
                    (liq === "honey" ? 2500 : 0)));
    },
    getEnergyOutForLiquid: function (liq) {
        return liq === "biomass" ? 50 :
            (liq === "seedOil" ? 30 :
                (liq === "appleJuice" ? 10 :
                    (liq === "honey" ? 20 : 0)));
    },
    addEmptyContainer: function (empty) {
        var slot = this.container.getSlot("slotEmptyContainer");
        if (slot.id === 0) {
            this.container.setSlot("slotEmptyContainer", empty.id, 1, empty.data);
            return true;
        }
        else if (slot.id == empty.id && slot.data == empty.data && slot.count + 1 != Item.getMaxStack(slot.id)) {
            this.container.setSlot("slotEmptyContainer", slot.id, slot.count + 1, slot.data);
            return true;
        }
        return false;
    },
    tick: function () {
        if (this.data.liquidStored) {
            this.updateLiquidScale("liquidScale", this.data.liquidStored);
        }
        if (this.data.temperature && !this.data.liquidNow) {
            if (this.data.temperatureRem >= 200) {
                this.data.temperatureRem = 0;
                this.data.temperature = false;
            }
            else {
                this.data.temperatureRem++;
            }
        }
        var slotContainer = this.container.getSlot("slotContainer");
        if (slotContainer.id && this.liquidStorage.getAmount("lava") + 1 <= 10) {
            var empty = LiquidRegistry.getEmptyItem(slotContainer.id, slotContainer.data);
            if (empty && empty.liquid === "lava" && this.addEmptyContainer(empty)) {
                this.liquidStorage.addLiquid("lava", 1);
                this.container.setSlot("slotContainer", slotContainer.id, slotContainer.count - 1, slotContainer.data);
            }
        }
        if (!this.data.liquidStored || (this.data.liquidStored && this.liquidStorage.getAmount(this.data.liquidStored) + 1 <= 10)) {
            var empty = LiquidRegistry.getEmptyItem(slotContainer.id, slotContainer.data);
            if (empty) {
                var liq = void 0;
                if (empty.liquid === "biomass") {
                    liq = "biomass";
                }
                else if (empty.liquid === "seedOil") {
                    liq = "seedOil";
                }
                else if (empty.liquid === "appleJuice") {
                    liq = "appleJuice";
                }
                else if (empty.liquid === "honey") {
                    liq = "honey";
                }
                if (liq && (!this.data.liquidStored || this.data.liquidStored === liq)) {
                    if (this.addEmptyContainer(empty)) {
                        this.liquidStorage.addLiquid(liq, 1);
                        this.data.liquidStored = liq;
                        this.container.setSlot("slotContainer", slotContainer.id, slotContainer.count - 1, slotContainer.data);
                    }
                }
            }
        }
        if (this.data.liquidNow) {
            if (this.data.temperature) {
                if (this.data.burnTime <= 0) {
                    this.data.liquidNow = 0;
                    this.data.burnTime = 0;
                }
                else {
                    if (this.data.energy + this.data.energyOut <= this.getEnergyStorage()) {
                        this.data.energy += this.data.energyOut;
                    }
                    else if (this.data.energy !== this.getEnergyStorage()) {
                        this.data.energy = this.getEnergyStorage() - this.data.energy;
                    }
                    this.data.burnTime--;
                }
            }
            else if (this.liquidStorage.getAmount("lava") >= 0.25) {
                this.liquidStorage.getLiquid("lava", 0.25);
                this.data.temperature = true;
            }
        }
        else if (this.liquidStorage.getAmount("lava") >= 0.25 && this.data.energy < this.getEnergyStorage() && !this.data.liquidNow && this.data.liquidStored && this.liquidStorage.getAmount(this.data.liquidStored) >= 1) {
            this.liquidStorage.getLiquid(this.data.liquidStored, 1);
            this.data.liquidNow = this.data.liquidStored;
            this.data.burnTime = this.getBurnTimeForLiquid(this.data.liquidNow);
            this.data.burnMax = this.getBurnTimeForLiquid(this.data.liquidNow);
            this.data.energyOut = this.getEnergyOutForLiquid(this.data.liquidNow);
        }
        this.updateLiquidScale("lavaScale", "lava");
        this.container.setScale("progressEnergyScale", this.data.energy / this.getEnergyStorage());
        this.container.setScale("burnScale", (this.data.burnTime / this.data.burnMax) || 0);
        this.container.validateAll();
        this.container.sendChanges();
    },
    getEnergyStorage: function () {
        return 300000;
    },
    getScreenByName: function () {
        return guiBiogasEngine;
    }
});
StorageInterface.createInterface(BlockID.engineBiogas, {
    slots: {
        "slotContainer": {
            input: true
        },
        "slotEmptyContainer": {
            output: true
        },
    },
    // canReceiveLiquid: function (liquid) {
    //     if (liquid === "lava") {
    //         alert("0");
    //         return true;
    //     }
    //
    //     let tileData = this.tileEntity.data;
    //
    //     if (tileData.liquidStored
    //         && this.tileEntity.liquidStorage.getAmount(tileData.liquidStored)) {
    //         alert("1");
    //         return tileData.liquidStored === liquid;
    //     } else if (this.tileEntity.getBurnTimeForLiquid(liquid) > 0) {
    //         tileData.liquidStored = liquid;
    //         alert("2");
    //         return true;
    //     }
    //
    //     return false;
    // }, //TODO: add after StorageInterface update
});
IDRegistry.genBlockID("biogenerator");
FactoryManager.register("biogenerator", "Bio Generator", [["biogenerator_top", 0], ["biogenerator_top", 0], ["biogenerator", 0], ["biogenerator", 0], ["biogenerator_side", 0], ["biogenerator_side", 0]], true);
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: BlockID.biogenerator, count: 1, data: 0 }, [
        "ghg",
        "gmg",
        "ghg"
    ], ['g', 266, 0, 'h', 20, 0, 'm', ItemID.sturdyMachine, 0,]);
});
BioGeneratorManager.addFuel("biomass", {
    ticks: 1,
    energy: 8
});
BioGeneratorManager.addFuel("ethanol", {
    ticks: 2,
    energy: 16
});
GROUP_ITEM_PIPE.add(BlockID.biogenerator, -1);
var biogeneratorGUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: "Bio Generator"
            }
        },
        inventory: {
            standard: true
        },
        background: {
            standard: true
        }
    },
    drawing: [
        { type: "bitmap", x: 456, y: 110, bitmap: "forestry.for.biogen.bg", scale: 3.2 },
    ],
    elements: {
        "progressEnergyScale": {
            type: "scale",
            x: 647,
            y: 180.4,
            bitmap: "forestry.for.biogen.energy_scale",
            scale: 3.2
        },
        "liquidScale": { type: "scale", x: 459, y: 114, direction: 1, bitmap: "forestry.bgs.liquid_2", scale: 3.2 },
        "slotContainer": { type: "slot", x: 385, y: 180, bitmap: "forestry.slots.liquid" },
    }
});
MachineRegistry.addUiTitleTranslation(biogeneratorGUI);
MachineRegistry.registerGenerator(BlockID.biogenerator, {
    useNetworkItemContainer: true,
    defaultValues: {
        progress: 0
    },
    init: function () {
        this.liquidStorage.setLimit(null, 10);
    },
    tick: function () {
        ContainerHelper.drainContainer(null, this, "slotContainer");
        var stored = this.liquidStorage.getLiquidStored();
        var fuel = BioGeneratorManager.getFuel(stored);
        if (fuel && this.liquidStorage.getAmount(stored) >= 0.001) {
            if (this.data.energy + fuel.energy <= this.getEnergyStorage()) {
                this.data.energy += fuel.energy;
                this.data.progress++;
                if (this.data.progress > fuel.ticks) {
                    this.data.progress = 0;
                    this.liquidStorage.getLiquid(stored, 0.001);
                }
            }
        }
        this.updateLiquidScale("liquidScale", stored);
        this.container.setScale("progressEnergyScale", this.data.energy / this.getEnergyStorage());
        this.container.validateAll();
        this.container.sendChanges();
    },
    getEnergyStorage: function () {
        return 30000;
    },
    getScreenByName: function () {
        return biogeneratorGUI;
    },
}, EU);
StorageInterface.createInterface(BlockID.biogenerator, {
    slots: {
        "slotContainer": {
            input: true,
            output: true,
            canOutput: function (item) {
                return LiquidRegistry.getEmptyItem(item.id, item.data) != null;
            }
        },
    },
    canReceiveLiquid: function (liquid) {
        return !!BioGeneratorManager.getFuel(liquid);
    }
});
Block.setPrototype("engineClockwork", {
    type: Block.TYPE_BASE,
    getVariations: function () {
        return [{
                name: "Clockwork Engine",
                texture: [["engine_clock", 0], ["engine_clock", 2], ["engine_clock", 1]],
                inCreative: true
            }];
    }
});
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: BlockID.engineClockwork, count: 1, data: 0 }, [
        "bbb",
        "0m0",
        "spt"
    ], ['b', 5, -1, 'm', 20, 0, 's', ItemID.gearCopper, 0, 't', 347, 0, 'p', 33, 0]);
});
ModelHelper.createEngineModel(BlockID.engineClockwork);
Item.addCreativeGroup(GROUP_ENGINES, GROUP_ENGINES_NAME, [BlockID.engineClockwork]);
MachineRegistry.registerGenerator(BlockID.engineClockwork, {
    useNetworkItemContainer: true,
    defaultValues: {
        heat: 0,
        delay: 40
    },
    click: function (id, count, data, coords, player) {
        this.data.delay = 40;
        this.data.heat = Math.min(this.data.heat + 100, 800);
        var actor = new PlayerActor(player);
        actor.setExhaustion(actor.getExhaustion() + 0.05);
        this.container.sendEvent("onHeatChange", { heat: this.data.heat });
        if (this.data.heat > 700) {
            Entity.damageEntity(player, 4);
        }
    },
    tick: function () {
        if (this.data.heat) {
            if (this.data.delay) {
                this.data.delay--;
                return;
            }
            this.data.heat -= 100;
            this.data.energy += 2;
        }
        this.container.sendChanges();
    },
    getEnergyStorage: function () {
        return 10;
    },
    client: {
        containerEvents: {
            onHeatChange: function (container, window, windowContent, data) {
                Debug.message("Heat:" + data.heat);
            }
        }
    },
});
Block.setPrototype("enginePeat", {
    type: Block.TYPE_BASE,
    getVariations: function () {
        return [{
                name: "Peat-fired Engine",
                texture: [["engine_peat", 0], ["engine_peat", 2], ["engine_peat", 1]],
                inCreative: true
            }];
    }
});
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: BlockID.enginePeat, count: 1, data: 0 }, [
        "bbb",
        "0s0",
        "gpg"
    ], ['b', ItemID.ingotCopper, 0, 'g', ItemID.gearCopper, 0, 'p', 33, 0, 's', 20, 0]);
});
GROUP_ITEM_PIPE.add(BlockID.enginePeat, -1);
ModelHelper.createEngineModel(BlockID.enginePeat);
Item.addCreativeGroup(GROUP_ENGINES, GROUP_ENGINES_NAME, [BlockID.enginePeat]);
var guiPeatFiredEngine = new UI.StandartWindow({
    standard: {
        header: { text: { text: "Peat-fired Engine" } },
        inventory: { standard: true },
        background: { standard: true }
    },
    drawing: [
        { type: "bitmap", x: 335, y: 140, bitmap: "forestry.scales.energy_empty", scale: 3.2 },
        { type: "bitmap", x: 385, y: 110, bitmap: "forestry.for.peat-fired.bg", scale: 3.2 },
    ],
    elements: {
        "progressEnergyScale": {
            type: "scale",
            x: 335,
            y: 140,
            direction: 1,
            bitmap: "forestry.scales.energy_full",
            scale: 3.2
        },
        "burnScale": {
            type: "scale",
            x: 394.6,
            y: 142,
            direction: 1,
            bitmap: "forestry.scales.green_flame_full",
            scale: 3.2
        },
        "slotFuel": { type: "slot", x: 385, y: 196.4 },
        "slotAsh0": { type: "slot", x: 557, y: 161 },
        "slotAsh1": { type: "slot", x: 615, y: 161 },
        "slotAsh2": { type: "slot", x: 557, y: 218 },
        "slotAsh3": { type: "slot", x: 615, y: 218 },
    }
});
MachineRegistry.addUiTitleTranslation(guiPeatFiredEngine);
MachineRegistry.registerGenerator(BlockID.enginePeat, {
    useNetworkItemContainer: true,
    defaultValues: {
        burn: 0,
        burnMax: 0,
        ashValue: 0,
        energyOut: 0
    },
    addAsh: function () {
        for (var i = 0; i < 4; i++) {
            var slotName = "slotAsh".concat(i);
            var slot = this.container.getSlot(slotName);
            if (slot.id === 0) {
                this.container.setSlot(slotName, ItemID.ash, 1, 0);
                return true;
            }
            else if (slot.id === ItemID.ash && slot.data === 0 && slot.count < 64) {
                this.container.setSlot(slotName, ItemID.ash, slot.count + 1, 0);
                return true;
            }
        }
        return false;
    },
    tick: function () {
        var slotFuel = this.container.getSlot("slotFuel");
        if (this.data.burn) {
            if (this.data.burn >= this.data.burnMax) {
                this.data.burnMax = 0;
                this.data.burn = 0;
                this.data.energyOut = 0;
            }
            else {
                if (this.data.energy + this.data.energyOut <= this.getEnergyStorage()) {
                    this.data.energy += this.data.energyOut;
                }
                if (this.data.ashValue >= 7500) {
                    this.addAsh();
                    this.data.ashValue = 0;
                }
                else
                    this.data.ashValue++;
                this.data.burn++;
            }
        }
        else if (this.data.energy < this.getEnergyStorage()) {
            var fuel = PeatFiredManager.getFuel(slotFuel.id);
            if (fuel) {
                this.data.energyOut = fuel.energy;
                this.data.burnMax = fuel.burnTime;
                this.data.burn++;
                this.container.setSlot("slotFuel", slotFuel.id, slotFuel.count - 1, slotFuel.data);
                this.container.validateAll();
            }
        }
        this.container.setScale("burnScale", ((this.data.burnMax - this.data.burn) / this.data.burnMax) || 0);
        this.container.setScale("progressEnergyScale", this.data.energy / this.getEnergyStorage());
        this.container.sendChanges();
    },
    getEnergyStorage: function () {
        return 200000;
    },
    getScreenByName: function () {
        return guiPeatFiredEngine;
    },
});
StorageInterface.createInterface(BlockID.enginePeat, {
    slots: {
        "slotFuel": {
            input: true
        },
        "slotAsh0": {
            output: true
        },
        "slotAsh1": {
            output: true
        },
        "slotAsh2": {
            output: true
        },
        "slotAsh3": {
            output: true
        },
    }
});
PeatFiredManager.addFuel(ItemID.peat, 10, 5000);
PeatFiredManager.addFuel(ItemID.bituminousPeat, 20, 6000);
Translation.addTranslation("Peat-fired Engine", { ru: "Торфяной двигатель" });
Translation.addTranslation("Biogas Engine", { ru: "Биотопливный двигатель" });
Translation.addTranslation("Clockwork Engine", { ru: "Часовой двигатель" });
Translation.addTranslation("Bio Generator", { ru: "Биогенератор" });
setLoadingTip("Storage Module Loading...");
IDRegistry.genItemID("backpackMiners");
Item.createItem("backpackMiners", "Mining Backpack", { name: "backpackMiners", meta: 0 }, { stack: 1 });
BackpackRegistry.register(ItemID.backpackMiners, {
    slots: 15,
    inRow: 5,
    items: [
        "^ore.+",
        "^dust.+",
        "^gem.+",
        "^ingot.+",
        "^nugget.+",
        "^oreCrushed.+",
        "^dustSmall.+",
        "^dustTiny.+",
        "^apatite$",
        VanillaItemID.lapis_lazuli,
        263,
        15,
        14,
        388,
        264,
        406,
        129,
        21,
        73,
        56,
        153,
        265,
        266
    ]
});
IDRegistry.genItemID("backpackDigger");
Item.createItem("backpackDigger", "Digging Backpack", { name: "backpackDigger", meta: 0 }, { stack: 1 });
BackpackRegistry.register(ItemID.backpackDigger, {
    slots: 15,
    inRow: 5,
    items: [
        "^stone.+",
        1,
        3,
        4,
        12,
        24,
        13,
        318,
        337,
        87,
        88
    ]
});
IDRegistry.genItemID("backpackForester");
Item.createItem("backpackForester", "Foresting Backpack", { name: "backpackForester", meta: 0 }, { stack: 1 });
BackpackRegistry.register(ItemID.backpackForester, {
    slots: 15,
    inRow: 5,
    items: [
        "^sapling.+",
        "^seed.+",
        "^leaves.+",
        "^log.+",
        {
            id: 17,
            data: -1
        },
        {
            id: 162,
            data: -1
        },
        {
            id: 6,
            data: -1
        },
        {
            id: 39,
            data: -1
        },
        {
            id: 40,
            data: -1
        },
        {
            id: 175,
            data: 3
        },
        {
            id: 38,
            data: -1
        },
        {
            id: 175,
            data: -1
        },
        {
            id: 18,
            data: -1
        },
        106,
        260,
        37,
        161,
        81
    ]
});
IDRegistry.genItemID("backpackHunter");
Item.createItem("backpackHunter", "Hunting Backpack", { name: "backpackHunter", meta: 0 }, { stack: 1 });
BackpackRegistry.register(ItemID.backpackHunter, {
    slots: 15,
    inRow: 5,
    items: [
        "^fish.+",
        "^egg.+",
        "^leather.+",
        "^bone.+",
        VanillaItemID.lapis_lazuli,
        {
            id: 35,
            data: -1
        },
        288,
        289,
        377,
        370,
        371,
        367,
        262,
        363,
        319,
        365,
        334,
        344,
        368
    ]
});
IDRegistry.genItemID("backpackBuilder");
Item.createItem("backpackBuilder", "Building Backpack", { name: "backpackBuilder", meta: 0 }, { stack: 1 });
BackpackRegistry.register(ItemID.backpackBuilder, {
    slots: 15,
    inRow: 5,
    items: [
        "^glass.+",
        "^chest.+",
        "^block.+",
        {
            id: 98,
            data: -1
        },
        {
            id: 5,
            data: -1
        },
        {
            id: 43,
            data: 5
        },
        {
            id: 45,
            data: 5
        },
        1,
        112,
        113,
        53,
        67,
        108,
        109,
        114,
        128,
        134,
        135,
        136,
        156,
        163,
        164,
        180,
        20,
        85,
        107,
        101,
        50,
        44,
        183,
        184,
        185,
        186,
        187,
        188,
        189,
        190,
        191,
        192
    ]
});
//Woven
IDRegistry.genItemID("backpackMinersT2");
Item.createItem("backpackMinersT2", "Woven Mining Backpack", { name: "backpackMinersT2", meta: 0 }, { stack: 1 });
BackpackRegistry.register(ItemID.backpackMinersT2, {
    slots: 45,
    inRow: 9,
    isValidItem: function (id, count, data) {
        return !BackpackRegistry.isBackpack(id) &&
            BackpackRegistry.isValidFor(id, data, BackpackRegistry.prototypes[ItemID.backpackMiners].items);
    }
});
IDRegistry.genItemID("backpackDiggerT2");
Item.createItem("backpackDiggerT2", "Woven Digging Backpack", { name: "backpackDiggerT2", meta: 0 }, { stack: 1 });
BackpackRegistry.register(ItemID.backpackDiggerT2, {
    slots: 45,
    inRow: 9,
    isValidItem: function (id, count, data) {
        return !BackpackRegistry.isBackpack(id) &&
            BackpackRegistry.isValidFor(id, data, BackpackRegistry.prototypes[ItemID.backpackDigger].items);
    }
});
IDRegistry.genItemID("backpackForesterT2");
Item.createItem("backpackForesterT2", "Woven Foresting Backpack", { name: "backpackForesterT2", meta: 0 }, { stack: 1 });
BackpackRegistry.register(ItemID.backpackForesterT2, {
    slots: 45,
    inRow: 9,
    isValidItem: function (id, count, data) {
        return !BackpackRegistry.isBackpack(id) &&
            BackpackRegistry.isValidFor(id, data, BackpackRegistry.prototypes[ItemID.backpackForester].items);
    }
});
IDRegistry.genItemID("backpackHunterT2");
Item.createItem("backpackHunterT2", "Woven Hunting Backpack", { name: "backpackHunterT2", meta: 0 }, { stack: 1 });
BackpackRegistry.register(ItemID.backpackHunterT2, {
    slots: 45,
    inRow: 9,
    isValidItem: function (id, count, data) {
        return !BackpackRegistry.isBackpack(id) &&
            BackpackRegistry.isValidFor(id, data, BackpackRegistry.prototypes[ItemID.backpackHunter].items);
    }
});
IDRegistry.genItemID("backpackBuilderT2");
Item.createItem("backpackBuilderT2", "Woven Building Backpack", { name: "backpackBuilderT2", meta: 0 }, { stack: 1 });
BackpackRegistry.register(ItemID.backpackBuilderT2, {
    slots: 45,
    inRow: 9,
    isValidItem: function (id, count, data) {
        return !BackpackRegistry.isBackpack(id) &&
            BackpackRegistry.isValidFor(id, data, BackpackRegistry.prototypes[ItemID.backpackBuilder].items);
    }
});
IDRegistry.genItemID("backpackApiarist");
Item.createItem("backpackApiarist", "Apiarist's Backpack", { name: "backpackApiarist", meta: 0 }, { stack: 1 });
BackpackRegistry.register(ItemID.backpackApiarist, {
    slots: 125,
    inRow: 10,
    isValidItem: function (id) {
        return BeeRegistry.isBee(id);
    }
});
Item.addCreativeGroup(GROUP_BACKPACKS, GROUP_BACKPACKS_NAME, [
    ItemID.backpackMiners,
    ItemID.backpackDigger,
    ItemID.backpackForester,
    ItemID.backpackHunter,
    ItemID.backpackBuilder,
    ItemID.backpackApiarist
]);
Item.addCreativeGroup(GROUP_WOVEN_BACKPACKS, GROUP_WOVEN_BACKPACKS_NAME, [
    ItemID.backpackMinersT2,
    ItemID.backpackDiggerT2,
    ItemID.backpackForesterT2,
    ItemID.backpackHunterT2,
    ItemID.backpackBuilderT2
]);
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: ItemID.backpackMiners, count: 1, data: 0 }, [
        "sws",
        "ici",
        "sws"
    ], ['s', 287, 0, 'w', 35, 0, 'c', 54, 0, 'i', 265, 0]);
    Recipes.addShaped({ id: ItemID.backpackDigger, count: 1, data: 0 }, [
        "sws",
        "ici",
        "sws"
    ], ['s', 287, 0, 'w', 35, 0, 'c', 54, 0, 'i', 1, 0]);
    Recipes.addShaped({ id: ItemID.backpackForester, count: 1, data: 0 }, [
        "sws",
        "ici",
        "sws"
    ], ['s', 287, 0, 'w', 35, 0, 'c', 54, 0, 'i', 17, 0]);
    Recipes.addShaped({ id: ItemID.backpackHunter, count: 1, data: 0 }, [
        "sws",
        "ici",
        "sws"
    ], ['s', 287, 0, 'w', 35, 0, 'c', 54, 0, 'i', 288, 0]);
    Recipes.addShaped({ id: ItemID.backpackBuilder, count: 1, data: 0 }, [
        "sws",
        "ici",
        "sws"
    ], ['s', 287, 0, 'w', 35, 0, 'c', 54, 0, 'i', 337, 0]);
    Recipes.addShaped({ id: ItemID.backpackApiarist, count: 1, data: 0 }, [
        "sws",
        "ici",
        "sws"
    ], ['s', 287, 0, 'w', 35, -1, 'c', BlockID.apiaristChest, 0, 'i', 280, 0]);
    Recipes.addShaped({ id: ItemID.backpackApiarist, count: 1, data: 0 }, [
        "sws",
        "ici",
        "sws"
    ], ['s', 287, 0, 'w', 35, -1, 'c', BlockID.apiaristChest, 0, 'i', 352, 0]);
});
IDRegistry.genItemID("waxCapsuleEmpty");
Item.createItem("waxCapsuleEmpty", "Wax Capsule", { name: "waxCapsuleEmpty", meta: 0 });
Item.setLiquidClip(ItemID.waxCapsuleEmpty, true);
Item.addCreativeGroup(GROUP_WAX_CAPSULES, GROUP_WAX_CAPSULES_NAME, [ItemID.waxCapsuleEmpty]);
IDRegistry.genItemID("canEmpty");
Item.createItem("canEmpty", "Can", { name: "canEmpty", meta: 0 });
Item.setLiquidClip(ItemID.canEmpty, true);
Item.addCreativeGroup(GROUP_CANS, GROUP_CANS_NAME, [ItemID.canEmpty]);
IDRegistry.genItemID("refractoryEmpty");
Item.createItem("refractoryEmpty", "Refractory Capsule", { name: "refractoryEmpty", meta: 0 });
Item.setLiquidClip(ItemID.refractoryEmpty, true);
Item.addCreativeGroup(GROUP_REFRACTORY_CAPSULES, GROUP_REFRACTORY_CAPSULES_NAME, [ItemID.refractoryEmpty]);
function registerLiquidContainer(suffix, liquid, food, isNative, isHot) {
    if (food === void 0) { food = 0; }
    if (!isNative) {
        var unique = "bucket".concat(suffix);
        IDRegistry.genItemID(unique);
        Item.createItem(unique, "".concat(suffix, " Bucket"), { name: unique, meta: 0 }, { stack: 1 });
        LiquidRegistry.registerItem(liquid, { id: 325, data: 0 }, { id: ItemID[unique], data: 0 });
        Item.addCreativeGroup(GROUP_BUCKETS, GROUP_BUCKETS_NAME, [ItemID[unique]]);
    }
    if (food) {
        if (!isHot) {
            var unique = "waxCapsule".concat(suffix);
            IDRegistry.genItemID(unique);
            Item.createFoodItem(unique, "Capsule (".concat(suffix, ")"), {
                name: unique,
                meta: 0
            }, { food: food });
            LiquidRegistry.registerItem(liquid, {
                id: ItemID.waxCapsuleEmpty,
                data: 0
            }, { id: ItemID[unique], data: 0 });
        }
        var canUnique = "can".concat(suffix);
        IDRegistry.genItemID(canUnique);
        Item.createFoodItem(canUnique, "Can (".concat(suffix, ")"), { name: canUnique, meta: 0 }, { food: food });
        var refractoryUnique = "refractory".concat(suffix);
        IDRegistry.genItemID(refractoryUnique);
        Item.createFoodItem(refractoryUnique, "Capsule (".concat(suffix, ")"), {
            name: refractoryUnique,
            meta: 0
        }, { food: food });
    }
    else {
        if (!isHot) {
            var unique = "waxCapsule".concat(suffix);
            IDRegistry.genItemID(unique);
            Item.createItem(unique, "Capsule (".concat(suffix, ")"), { name: unique, meta: 0 });
            LiquidRegistry.registerItem(liquid, {
                id: ItemID.waxCapsuleEmpty,
                data: 0
            }, { id: ItemID[unique], data: 0 });
        }
        var canUnique = "can".concat(suffix);
        IDRegistry.genItemID(canUnique);
        Item.createItem(canUnique, "Can (".concat(suffix, ")"), { name: canUnique, meta: 0 });
        var refractoryUnique = "refractory".concat(suffix);
        IDRegistry.genItemID(refractoryUnique);
        Item.createItem(refractoryUnique, "Capsule (".concat(suffix, ")"), { name: refractoryUnique, meta: 0 });
    }
    LiquidRegistry.registerItem(liquid, { id: ItemID.canEmpty, data: 0 }, { id: ItemID["can".concat(suffix)], data: 0 });
    LiquidRegistry.registerItem(liquid, { id: ItemID.refractoryEmpty, data: 0 }, {
        id: ItemID["refractory".concat(suffix)],
        data: 0
    });
    if (!isHot)
        Item.addCreativeGroup(GROUP_WAX_CAPSULES, GROUP_WAX_CAPSULES_NAME, [ItemID["waxCapsule".concat(suffix)]]);
    Item.addCreativeGroup(GROUP_CANS, GROUP_CANS_NAME, [ItemID["can".concat(suffix)]]);
    Item.addCreativeGroup(GROUP_REFRACTORY_CAPSULES, GROUP_REFRACTORY_CAPSULES_NAME, [ItemID["refractory".concat(suffix)]]);
}
registerLiquidContainer("Water", "water", 0, true);
registerLiquidContainer("Lava", "lava", 0, true, true);
registerLiquidContainer("Biomass", "biomass");
registerLiquidContainer("Ethanol", "ethanol");
registerLiquidContainer("Milk", "milk", 0, true);
registerLiquidContainer("Juice", "appleJuice", 2);
registerLiquidContainer("Honey", "honey", 2);
registerLiquidContainer("SeedOil", "seedOil", 0);
function pickupLiquidFromWorld(waterCanId, lavaCanId) {
    return function (coords, item, block, player) {
        var pos = Entity.getPosition(player);
        var blockSource = BlockSource.getDefaultForActor(player);
        if (!blockSource)
            return;
        var blockID = blockSource.getBlockId(coords.x, coords.y, coords.z);
        var capsuleId = {
            9: waterCanId,
            11: lavaCanId,
        }[blockID];
        if (!capsuleId)
            return;
        blockSource.spawnDroppedItem(pos.x, pos.y + 0.3, pos.z, capsuleId, 1, 0);
        blockSource.setBlock(coords.x, coords.y, coords.z, 0, 0);
        PlayerUtils.decreaseCarriedItem(player);
    };
}
Item.registerUseFunction("canEmpty", pickupLiquidFromWorld(ItemID.canWater, ItemID.canLava));
Item.registerUseFunction("refractoryEmpty", pickupLiquidFromWorld(ItemID.refractoryWater, ItemID.refractoryLava));
Item.registerUseFunction("waxCapsuleEmpty", function (coords, item, block, player) {
    var blockSource = BlockSource.getDefaultForActor(player);
    if (blockSource && blockSource.getBlockId(coords.x, coords.y, coords.z) === 9) {
        var pos = Entity.getPosition(player);
        blockSource.spawnDroppedItem(pos.x, pos.y + 0.3, pos.z, ItemID.waxCapsuleWater, 1, 0);
        blockSource.setBlock(coords.x, coords.y, coords.z, 0, 0);
        PlayerUtils.decreaseCarriedItem(player);
    }
});
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: ItemID.waxCapsuleEmpty, count: 4, data: 0 }, [
        "xxx",
    ], ['x', ItemID.beeswax, 0]);
    Recipes.addShaped({ id: ItemID.canEmpty, count: 12, data: 0 }, [
        " x ",
        "x x",
    ], ['x', ItemID.ingotTin, 0]);
    Recipes.addShaped({ id: ItemID.refractoryEmpty, count: 4, data: 0 }, [
        "xxx",
    ], ['x', ItemID.refractoryWax, 0]);
    var milkCapsules = [ItemID.canMilk, ItemID.refractoryMilk, ItemID.waxCapsuleMilk];
    for (var key in milkCapsules) {
        var capsuleId = milkCapsules[key];
        Recipes.addShaped({ id: 354, count: 1, data: 0 }, [
            "AAA",
            "BEB",
            "CCC"
        ], ['A', capsuleId, 0, 'B', 353, 0, 'C', 296, 0, 'E', 344, 0]);
    }
});
IDRegistry.genItemID("crate");
Item.createItem("crate", "Crate", { name: "crate", meta: 0 }, {});
Item.addCreativeGroup(GROUP_CRATES, GROUP_CRATES_NAME, [ItemID.crate]);
/**
 * Register a new crate containing the given item with {@link id} and {@link data}.
 */
function registerCrate(id, itemName, texture, data) {
    data = data || 0;
    var crateId = "crate" + id + "_" + data;
    IDRegistry.genItemID(crateId);
    Item.createItem(crateId, "Crate (" + itemName + ")", { name: texture, meta: 0 }, {});
    Item.addCreativeGroup(GROUP_CRATES, GROUP_CRATES_NAME, [ItemID[crateId]]);
    CarpenterManager.registerRecipe({
        input: {
            0: { id: id, data: data }, 1: { id: id, data: data }, 2: { id: id, data: data },
            3: { id: id, data: data }, 4: { id: id, data: data }, 5: { id: id, data: data },
            6: { id: id, data: data }, 7: { id: id, data: data }, 8: { id: id, data: data }
        },
        liquid: "water",
        liquidAmount: 0.1,
        special: {
            id: ItemID.crate,
            data: 0,
            dec: true
        },
        result: {
            id: ItemID[crateId],
            count: 1,
            data: 0
        }
    });
    CarpenterManager.registerRecipe({
        input: { 4: { id: ItemID[crateId], data: 0 } },
        result: {
            id: id,
            count: 9,
            data: data
        }
    });
    Item.registerUseFunction(crateId, function (coords, item, block, player) {
        var blockSource = BlockSource.getDefaultForActor(player);
        if (blockSource) {
            var relative = coords.relative;
            blockSource.spawnDroppedItem(relative.x + 0.5, relative.y + 0.1, relative.z + 0.5, id, 9, 0);
            PlayerUtils.decreaseCarriedItem(player);
        }
    });
}
if (ForestryConfig.crateEnabled) {
    registerCrate(3, "Dirt", "crateDirt");
    registerCrate(87, "Netherrack", "crateNetherrack");
    registerCrate(112, "Netherbrick", "crateNetherbricks");
    registerCrate(372, "Nether wart", "crateNetherWart");
    registerCrate(ItemID.apatite, "Apatite", "crateApatite");
    registerCrate(BlockID.bog, "Bog", "crateBog");
    registerCrate(ItemID.ingotBronze, "Bronze ingot", "crateBronzeIngot");
    registerCrate(4, "Cobblestone", "crateCobblestone");
    registerCrate(ItemID.combStringy, "Stringy comb", "crateStringyComb");
    registerCrate(ItemID.combCocoa, "Cocoa comb", "crateCocoaComb");
    registerCrate(ItemID.combDripping, "Dripping comb", "crateDrippingComb");
    registerCrate(ItemID.combHoney, "Honey comb", "crateHoneyComb");
    registerCrate(ItemID.combFrozen, "Frozen comb", "crateFrozenComb");
    registerCrate(ItemID.combMellow, "Mellow comb", "crateMellowComb");
    registerCrate(ItemID.combMossy, "Mossy comb", "crateMossyComb");
    registerCrate(ItemID.combMysterious, "Mysterious comb", "crateMysteriousComb");
    registerCrate(ItemID.combParched, "Parched comb", "crateParchedComb");
    registerCrate(ItemID.combSilky, "Silky comb", "crateSilkyComb");
    registerCrate(ItemID.combSimmering, "Simmering comb", "crateSimmeringComb");
    registerCrate(ItemID.combWheaten, "Wheaten comb", "crateWheatenComb");
    registerCrate(ItemID.combIrradiated, "Irradiated comb", "crateIrradiatedComb");
    registerCrate(337, "Clay", "crateClay");
    registerCrate(13, "Gravel", "crateGravel");
    registerCrate(BlockID.humus, "Humus", "crateHumus");
    registerCrate(17, "Oak wood", "crateOakWood");
    registerCrate(263, "Charcoal", "crateCharcoal", 1);
    registerCrate(ItemID.ash, "Ash", "crateAsh");
    registerCrate(81, "Cactus", "crateCactus");
    registerCrate(1, "Stone", "crateStone");
    registerCrate(336, "Brick", "crateBrick");
    registerCrate(331, "Redstone", "crateRedstone");
    registerCrate(260, "Apple", "crateApple");
    registerCrate(VanillaItemID.lapis_lazuli, "Lapis lazuli", "crateLapisLazuli");
    registerCrate(ItemID.royalJelly, "Royal jelly", "crateRoyalJelly");
    registerCrate(ItemID.honeydew, "Honey dew", "crateHoneydew");
    registerCrate(110, "Mycelium", "crateMycelium");
    registerCrate(ItemID.mulch, "Mulch", "crateMulch");
    registerCrate(ItemID.refractoryWax, "Refractory wax", "crateRefractoryWax");
    registerCrate(ItemID.ingotTin, "Tin ingot", "crateTinIngot");
    registerCrate(12, "Sand", "crateSand");
    registerCrate(88, "Soul sand", "crateSoulSand");
    registerCrate(24, "Sandstone", "crateSandstone");
    registerCrate(357, "Cookie", "crateCookie");
    registerCrate(ItemID.propolis, "Propolis", "cratePropolis");
    registerCrate(ItemID.beeswax, "Wax", "crateWax");
    registerCrate(296, "Wheat", "crateWheat");
    registerCrate(ItemID.pollen1, "Pollen", "cratePollen");
    registerCrate(6, "Sapling", "crateSapling");
    registerCrate(348, "Glowstone dust", "crateGlowstone");
    registerCrate(295, "Seeds", "crateSeeds");
    registerCrate(ItemID.peat, "Peat", "cratePeat");
    registerCrate(338, "Sugar cane", "crateSugarCane");
    registerCrate(ItemID.phosphor, "Phosphor", "cratePhosphor");
    registerCrate(263, "Coal", "crateCoal");
}
//Crates
Translation.addTranslation("Crate", { ru: "Бочка" });
//Capsules
Translation.addTranslation("Wax Capsule", { ru: "Восковая капсула" });
Translation.addTranslation("Can", { ru: "Банка" });
Translation.addTranslation("Refractory Capsule", { ru: "Огнеупорная капсула" });
Translation.addTranslation("Capsule (Water)", { ru: "Капсула (Вода)" });
Translation.addTranslation("Capsule (Lava)", { ru: "Капсула (Лава)" });
Translation.addTranslation("Capsule (Juice)", { ru: "Капсула (Фруктовый сок)" });
Translation.addTranslation("Capsule (Honey)", { ru: "Капсула (Мёд)" });
Translation.addTranslation("Capsule (SeedOil)", { ru: "Капсула (Масло)" });
Translation.addTranslation("Capsule (Biomass)", { ru: "Капсула (Биомасса)" });
Translation.addTranslation("Capsule (Ethanol)", { ru: "Капсула (Биотопливо)" });
Translation.addTranslation("Capsule (Milk)", { ru: "Капсула (Молоко)" });
Translation.addTranslation("Can (Water)", { ru: "Банка (Вода)" });
Translation.addTranslation("Can (Lava)", { ru: "Банка (Лава)" });
Translation.addTranslation("Can (Juice)", { ru: "Банка (Фруктовый сок)" });
Translation.addTranslation("Can (Honey)", { ru: "Банка (Мёд)" });
Translation.addTranslation("Can (SeedOil)", { ru: "Банка (Масло)" });
Translation.addTranslation("Can (Biomass)", { ru: "Банка (Биомасса)" });
Translation.addTranslation("Can (Ethanol)", { ru: "Банка (Биотопливо)" });
Translation.addTranslation("Can (Milk)", { ru: "Банка (Молоко)" });
Translation.addTranslation("Ethanol Bucket", { ru: "Ведро с биотопливом" });
Translation.addTranslation("Biomass Bucket", { ru: "Ведро с биомассой" });
Translation.addTranslation("Juice Bucket", { ru: "Ведро с фруктовым соком" });
Translation.addTranslation("SeedOil Bucket", { ru: "Ведро с маслом" });
Translation.addTranslation("Honey Bucket", { ru: "Ведро с мёдом" });
//Backpacks
Translation.addTranslation("Mining Backpack", { ru: "Рюкзак шахтера" });
Translation.addTranslation("Foresting Backpack", { ru: "Рюкзак лесника" });
Translation.addTranslation("Digging Backpack", { ru: "Рюкзак землекопа" });
Translation.addTranslation("Hunting Backpack", { ru: "Рюкзак охотника" });
Translation.addTranslation("Building Backpack", { ru: "Рюкзак строителя" });
Translation.addTranslation("Woven Mining Backpack", { ru: "Сотканный рюкзак шахтёра" });
Translation.addTranslation("Woven Digging Backpack", { ru: "Сотканный рюкзак землекопа" });
Translation.addTranslation("Woven Foresting Backpack", { ru: "Сотканный рюкзак лесника" });
Translation.addTranslation("Woven Hunting Backpack", { ru: "Сотканный рюкзак охотника" });
Translation.addTranslation("Woven Building Backpack", { ru: "Сотканный рюкзак строителя" });
Translation.addTranslation("Adventurer's woven backpack", { ru: "Сотканный рюкзак авантюриста" });
Translation.addTranslation("Apiarist's Backpack", { ru: "Рюкзак пчеловода" });
ModAPI.addAPICallback("ICore", function (api) {
    var blacklist = api.requireGlobal("recyclerBlacklist");
    for (var key in BeeRegistry.bees) {
        var bee = BeeRegistry.bees[key];
        blacklist.push(bee.princessID);
        blacklist.push(bee.droneID);
        blacklist.push(bee.queenID);
    }
    CentrifugeManager.registerRecipe({
        input: {
            id: ItemID.propolis
        },
        result: [
            {
                id: ItemID.latex
            }
        ]
    });
    for (var key in fermenterLiquids) {
        FermenterManager.addRecipe({
            id: ItemID.rubberSapling,
            inputLiquid: key,
            liquidAmount: 0.25,
            modifier: fermenterLiquids[key],
            liquid: "biomass"
        });
    }
    registerTubeRecipe(ItemID.thermionicTubeRubber, ItemID.rubber);
    registerCrate(ItemID.latex, "Latex", "crateLatex");
    registerCrate(ItemID.scrap, "Scrap", "crateScrap");
    log("IC Integration Activated", "INFO");
});
ModAPI.addAPICallback("HarvestAPI", function () {
    var list = [
        {
            //berries
            juiceAmount: 0.008,
            list: [
                "cranberry",
                "blackberry",
                "blueberry",
                "raspberry",
                "strawberry"
            ]
        },
        {
            //fruits
            juiceAmount: 0.2,
            list: [
                "pineapple",
                "cactusfruit",
                "cantaloupe",
                "grape",
                "kiwi",
                "chili_pepper"
            ]
        },
        {
            //Tree Fruits
            juiceAmount: 0.2,
            list: [
                "banana",
                "dragonfruit",
                "lemon",
                "lime",
                "orange",
                "papaya",
                "peach",
                "pear",
                "plum",
                "pomegranate",
                "starfruit",
                "apricot",
                "date",
                "fig",
                "grapefruit",
                "persimmon",
                "avocado",
                "coconut",
            ]
        },
        {
            //Vegetables
            juiceAmount: 0.1,
            list: [
                "asparagus",
                "bean",
                "beet",
                "broccoli",
                "cauliflower",
                "celery",
                "leek",
                "lettuce",
                "onion",
                "parsnip",
                "radish",
                "rutabaga",
                "scallion",
                "soybean",
                "sweetpotato",
                "turnip",
                "artichoke",
                "bellpepper",
                "brusselsprout",
                "cabbage",
                "corn",
                "cucumber",
                "eggplant",
                "okra",
                "peas",
                "rhubarb",
                "tomato",
                "wintersquash",
                "zucchini",
                "bambooshoot",
                "spinach"
            ]
        }
    ];
    var plants = [];
    for (var i in list) {
        var listItem = list[i];
        for (var k in listItem.list) {
            var crop = listItem.list[k];
            SqueezerManager.registerRecipe({
                input: [
                    {
                        id: ItemID[crop]
                    }
                ],
                liquid: "appleJuice",
                liquidAmount: listItem.juiceAmount
            });
            if (ItemID[crop + "_seed"]) {
                SqueezerManager.registerRecipe({
                    input: [
                        {
                            id: ItemID[crop + "_seed"]
                        }
                    ],
                    liquid: "seedOil",
                    liquidAmount: 0.01
                });
            }
            plants.push(crop);
        }
    }
    var grains = [
        "barley",
        "oats",
        "rye"
    ];
    for (var i in grains) {
        var grain = grains[i];
        MoistenerManager.registerFuel({
            inputItem: {
                id: ItemID[grain]
            },
            outputItem: {
                id: ItemID.mouldyWheat
            },
            time: 300
        });
        MoistenerManager.registerFuel({
            inputItem: {
                id: ItemID[grain + "_seed"]
            },
            outputItem: {
                id: 110
            },
            time: 5000
        });
        SqueezerManager.registerRecipe({
            input: [
                {
                    id: ItemID[grain + "_seed"]
                }
            ],
            liquid: "seedOil",
            liquidAmount: 0.01
        });
        plants.push(grain);
    }
    var nuts = [
        {
            seedOilAmount: 0.12,
            list: [
                "cropnut"
            ]
        },
        {
            seedOilAmount: 0.15,
            list: [
                "almond",
                "cashew",
                "cherry"
            ]
        }
    ];
    for (var i in nuts) {
        var listItem = nuts[i];
        for (var k in listItem) {
            var nut = listItem[k];
            SqueezerManager.registerRecipe({
                input: [
                    {
                        id: ItemID[nut]
                    }
                ],
                liquid: "seedOil",
                time: 20,
                liquidAmount: listItem.seedOilAmount
            });
            if (ItemID[nut + "_seed"]) {
                SqueezerManager.registerRecipe({
                    input: [
                        {
                            id: ItemID[nut + "_seed"]
                        }
                    ],
                    liquid: "seedOil",
                    time: 20,
                    liquidAmount: 0.01
                });
            }
        }
    }
    for (var i in plants) {
        for (var i_2 in fermenterLiquids) {
            FermenterManager.addRecipe({
                id: ItemID[plants[i_2]],
                inputLiquid: i_2,
                modifier: fermenterLiquids[i_2],
                liquidAmount: 0.5,
                liquid: "biomass"
            });
        }
    }
    log("HC Integration Activated", "INFO");
});
ModAPI.addAPICallback("RecipeViewer", function (api) {
    var RecipeViewer = api.Core;
    CarpenterManager.integrateWithRecipeViewer(RecipeViewer);
    CentrifugeManager.integrateWithRecipeViewer(RecipeViewer);
    BeeRegistry.integrateWithRecipeViewer(RecipeViewer);
    FermenterManager.integrateWithRecipeViewer(RecipeViewer);
    MoistenerManager.integrateWithRecipeViewer(RecipeViewer);
    PeatFiredManager.integrateWithRecipeViewer(RecipeViewer);
    BioGeneratorManager.integrateWithRecipeViewer(RecipeViewer);
    StillManager.integrateWithRecipeViewer(RecipeViewer);
    SqueezerManager.integrateWithRecipeViewer(RecipeViewer);
    log("Recipe Viewer Integration Activated", "INFO");
});
ModAPI.registerAPI("ForestryAPI", {
    Bee: Bee,
    BeeEffects: BeeEffects,
    BeeFrame: BeeFrame,
    BeeHouse: BeeHouse,
    BeeLogic: BeeLogic,
    BeeRegistry: BeeRegistry,
    BeeType: BeeType,
    ModifierList: ModifierList,
    MachineRegistry: MachineRegistry,
    Habitat: Habitat,
    HiveGenerator: HiveGenerator,
    Config: ForestryConfig,
    ContainerHelper: ContainerHelper,
    ModelHelper: ModelHelper,
    Util: Util,
    ApiaryRegistry: ApiaryRegistry,
    ChestManager: ChestManager,
    PeatFiredManager: PeatFiredManager,
    BioGeneratorManager: BioGeneratorManager,
    CarpenterManager: CarpenterManager,
    CentrifugeManager: CentrifugeManager,
    FabricatorManager: FabricatorManager,
    FermenterManager: FermenterManager,
    SqueezerManager: SqueezerManager,
    FactoryManager: FactoryManager,
    StillManager: StillManager,
    MoistenerManager: MoistenerManager,
    RainSubstrateRecipes: RainSubstrateRecipes,
    Combs: COMBS,
    registerCrate: registerCrate,
    requireGlobal: function (command) {
        return eval(command);
    }
});
log("API shared with name ForestryAPI", "API");
log("Load time: " + ((java.lang.System.currentTimeMillis() - startTime) / 1000) + "s", "INFO");
