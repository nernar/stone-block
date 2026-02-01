var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
IMPORT("ConnectedTexture");
IMPORT("BlockEngine");
IMPORT("StorageInterface");
IMPORT("BlockEngine");
IMPORT("EnergyNet");
IMPORT("ChargeItem");
IMPORT("TileRender");
// import values
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var Color = android.graphics.Color;
var PotionEffect = EPotionEffect;
var ParticleType = EParticleType;
var BlockSide = EBlockSide;
var EntityType = EEntityType;
// RECIPE VIEWER SUPPORT
var RV;
var startTime = Debug.sysTime();
var GUI_SCALE = 3.2;
var GUI_SCALE_NEW = 3;
function isPlayer(entity) {
    var type = Entity.getType(entity);
    return type == 1 || type == 63;
}
var BitmapFactory = android.graphics.BitmapFactory;
var Bitmap = android.graphics.Bitmap;
var Timer = java.util.Timer;
var TimerTask = java.util.TimerTask;
var JAVA_ANIMATOR = android.animation.ValueAnimator;
var JAVA_HANDLER = android.os.Handler;
var LOOPER_THREAD = android.os.Looper;
var JAVA_HANDLER_THREAD = new JAVA_HANDLER(LOOPER_THREAD.getMainLooper());
var JavaFONT_ = WRAP_JAVA('com.zhekasmirnov.innercore.api.mod.ui.types.Font');
var InnerCore_pack = FileTools.ReadJSON(__packdir__ + 'manifest.json');
Callback['com.ulalald.asd'] = Callback['com.ulalald.asd'] || [];
Callback['com.ulalald.asd.ddd'] = false;
var mod = FileTools.ReadJSON(__dir__ + 'mod.info');
Callback['com.ulalald.asd'].push(mod);
Callback.addCallback("LevelDisplayed", function () {
    //Game.tipMessage('§c' + mod.name + '\n§a' + mod.version)
    if (!Callback['com.ulalald.asd.ddd']) {
        Game.tipMessage(Callback['com.ulalald.asd'].map(function (elem) {
            return '§e' + elem.name + '   §b' + elem.version;
        }).join('\n'));
        Callback['com.ulalald.asd.ddd'] = true;
    }
});
Callback.addCallback("LevelLeft", function () {
    Callback['com.ulalald.asd.ddd'] = false;
});
/// <reference path="IWrench.ts" />
var Machine;
(function (Machine) {
    var _a;
    _a = BlockEngine.Decorators, Machine.ClientSide = _a.ClientSide, Machine.NetworkEvent = _a.NetworkEvent, Machine.ContainerEvent = _a.ContainerEvent;
    var MachineBase = /** @class */ (function (_super) {
        __extends(MachineBase, _super);
        function MachineBase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MachineBase.prototype.onInit = function () {
            this.networkData.putInt("blockId", this.blockID);
            this.networkData.putInt("facing", this.getFacing());
            this.networkData.sendChanges();
            this.setupContainer();
            delete this.liquidStorage;
        };
        MachineBase.prototype.setupContainer = function () { };
        MachineBase.prototype.addLiquidTank = function (name, limit, liquids) {
            var tank = new BlockEngine.LiquidTank(this, name, limit, liquids);
            var liquid = this.liquidStorage.getLiquidStored();
            if (liquid) {
                var amount = this.liquidStorage.getLiquid(liquid, tank.getLimit() / 1000);
                tank.addLiquid(liquid, Math.round(amount * 1000));
            }
            return tank;
        };
        MachineBase.prototype.canRotate = function (side) {
            return false;
        };
        MachineBase.prototype.onItemUse = function (coords, item, player) {
            var side = coords.side;
            if (Entity.getSneaking(player)) {
                side ^= 1;
            }
            if (this.canRotate(side) && EnderTool.isUseableWrench(item, 1)) {
                EnderTool.rotateMachine(this, side, item, player);
                return true;
            }
            return false;
        };
        MachineBase.prototype.setActive = function (isActive) {
            if (this.networkData.getBoolean("active") !== isActive) {
                this.networkData.putBoolean("active", isActive);
                this.networkData.sendChanges();
            }
        };
        MachineBase.prototype.renderModel = function () {
            if (this.networkData.getBoolean("active")) {
                var blockId = Network.serverToLocalId(this.networkData.getInt("blockId"));
                var facing = this.networkData.getInt("facing");
                TileRenderer.mapAtCoords(this.x, this.y, this.z, blockId, facing);
            }
            else {
                BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
            }
        };
        MachineBase.prototype.clientLoad = function () {
            var _this = this;
            this.renderModel();
            this.networkData.addOnDataChangedListener(function (data, isExternal) {
                _this.renderModel();
            });
        };
        MachineBase.prototype.clientUnload = function () {
            BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
        };
        MachineBase.prototype.getFacing = function () {
            return this.blockSource.getBlockData(this.x, this.y, this.z);
        };
        MachineBase.prototype.setFacing = function (side) {
            if (this.getFacing() != side) {
                this.blockSource.setBlock(this.x, this.y, this.z, this.blockID, side);
                this.networkData.putInt("blockData", side);
                this.networkData.sendChanges();
                return true;
            }
            return false;
        };
        MachineBase.prototype.decreaseSlot = function (slot, count) {
            slot.count -= count;
            slot.markDirty();
            slot.validate();
        };
        MachineBase.prototype.getDefaultDrop = function () {
            var _a;
            return (_a = this.defaultDrop) !== null && _a !== void 0 ? _a : this.blockID;
        };
        MachineBase.prototype.adjustDrop = function (item) {
            return item;
        };
        __decorate([
            Machine.ClientSide
        ], MachineBase.prototype, "renderModel", null);
        return MachineBase;
    }(TileEntityBase));
    Machine.MachineBase = MachineBase;
})(Machine || (Machine = {}));
/// <reference path="Base.ts" /> 
var Machine;
(function (Machine) {
    var ProgressingMachine = /** @class */ (function (_super) {
        __extends(ProgressingMachine, _super);
        function ProgressingMachine() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultValues = {
                energy: 0
            };
            return _this;
        }
        ProgressingMachine.prototype.getTier = function () {
            return this.tier || 1;
        };
        ProgressingMachine.prototype.getEnergyStorage = function () {
            return 0;
        };
        ProgressingMachine.prototype.getRelativeEnergy = function () {
            return this.data.energy / this.getEnergyStorage();
        };
        ProgressingMachine.prototype.getMaxIntake = function () {
            return this.getTier() * 15 + this.getTier();
        };
        ProgressingMachine.prototype.chargeSlot = function (slotName) {
            this.data.energy -= ChargeItemRegistry.addEnergyToSlot(this.container.getSlot(slotName), "Rf", this.data.energy, this.getTier());
        };
        ProgressingMachine.prototype.dischargeSlot = function (slotName) {
            var amount = this.getEnergyStorage() - this.data.energy;
            this.data.energy += ChargeItemRegistry.getEnergyFromSlot(this.container.getSlot(slotName), "Rf", amount, this.getTier());
        };
        ProgressingMachine.prototype.onItemUse = function (coords, item, player) {
            return _super.prototype.onItemUse.call(this, coords, item, player);
        };
        ProgressingMachine.prototype.energyTick = function (type, src) { };
        ProgressingMachine.prototype.energyReceive = function (type, amount, voltage) {
            return 0;
        };
        ProgressingMachine.prototype.canReceiveEnergy = function (side, type) {
            return true;
        };
        ProgressingMachine.prototype.canExtractEnergy = function (side, type) {
            return false;
        };
        ProgressingMachine.prototype.rebuildGrid = function () {
            this.energyNode.resetConnections();
            EnergyGridBuilder.buildGridForTile(this);
        };
        ProgressingMachine.prototype.isConductor = function (type) {
            return false;
        };
        return ProgressingMachine;
    }(Machine.MachineBase));
    Machine.ProgressingMachine = ProgressingMachine;
})(Machine || (Machine = {}));
var Machine;
(function (Machine) {
    var Generator = /** @class */ (function (_super) {
        __extends(Generator, _super);
        function Generator() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.tier = 1;
            return _this;
        }
        Generator.prototype.useCapacitor = function () {
            var upgrades = CapacitorAPI.useCapacitor(this);
            this.bonus = upgrades.getBonusGenerator(this.defaultBonus);
            this.energyStorage = upgrades.getEnergyStorage(this.defaultEnergyStorage);
            return upgrades;
        };
        Generator.prototype.setupContainer = function () {
            var _this = this;
            StorageInterface.setGlobalValidatePolicy(this.container, function (name, id, amount, data) {
                if (name.startsWith("slotCapacitor"))
                    return CapacitorAPI.isValidCapacitor(id, _this);
                return false;
            });
        };
        Generator.prototype.canReceiveEnergy = function () {
            return false;
        };
        Generator.prototype.canExtractEnergy = function () {
            return true;
        };
        Generator.prototype.energyTick = function (type, src) {
            var output = Math.min(this.data.energy, this.getMaxIntake());
            this.data.energy += src.add(output) - output;
        };
        Generator.prototype.getEnergyStorage = function () {
            return this.energyStorage;
        };
        Generator.prototype.canRotate = function (side) {
            return side > 1;
        };
        Generator.prototype.getRelativeEnergy = function () {
            return this.data.energy / this.getEnergyStorage();
        };
        return Generator;
    }(Machine.ProgressingMachine));
    Machine.Generator = Generator;
})(Machine || (Machine = {}));
/// <reference path="ProgressingMachine.ts" />
var TransferMode = {
    IN: 0,
    OUT: 1,
    NONE: 2
};
var Machine;
(function (Machine) {
    var CapacitorBlock = /** @class */ (function (_super) {
        __extends(CapacitorBlock, _super);
        function CapacitorBlock(tier, maxOutputPower, capacity, guiScreen) {
            var _this = _super.call(this) || this;
            _this.defaultValues = {
                energy: 0,
                config: 0
            };
            _this.tier = tier;
            _this.capacity = capacity;
            _this.maxOutputPower = maxOutputPower;
            _this.guiScreen = guiScreen;
            return _this;
        }
        CapacitorBlock.prototype.onInit = function () {
            this.networkData.putInt("config", this.data.config);
            _super.prototype.onInit.call(this);
        };
        CapacitorBlock.prototype.onItemUse = function (coords, item, playerUid) {
            var client = Network.getClientForPlayer(playerUid);
            if (Entity.getSneaking(playerUid)) {
                var config = this.getMode();
                config[coords.side]++;
                config[coords.side] %= 3;
                this.setMode(config);
                this.renderModel();
                BlockEngine.sendMessage(client, "".concat(["Input", "Output", "None"][config[coords.side]], " RF"));
                return true;
            }
            return _super.prototype.onItemUse.call(this, coords, item, playerUid);
        };
        CapacitorBlock.prototype.setMode = function (config) {
            var code = parseInt(config.join(""), 3);
            this.data.config = code;
            this.networkData.putInt("config", code);
        };
        CapacitorBlock.prototype.getMode = function () {
            var config = ("000000" + this.data.config.toString(3)).slice(-6);
            return [+config[0], +config[1], +config[2], +config[3], +config[4], +config[5]];
        };
        CapacitorBlock.prototype.getScreenByName = function () {
            return this.guiScreen;
        };
        CapacitorBlock.prototype.getTier = function () {
            return this.tier;
        };
        CapacitorBlock.prototype.canRotate = function () {
            return true;
        };
        CapacitorBlock.prototype.setFacing = function (side) {
            if (_super.prototype.setFacing.call(this, side)) {
                this.rebuildGrid();
                return true;
            }
            return false;
        };
        CapacitorBlock.prototype.onTick = function () {
            StorageInterface.checkHoppers(this);
            this.chargeSlot("slot1");
            this.chargeSlot("slot2");
            this.chargeSlot("slot3");
            this.chargeSlot("slot4");
            this.container.setScale("energyScale", this.getRelativeEnergy());
            this.container.setText("textInfo1", Math.floor(this.data.energy) + "/");
            this.container.setText("textInfo2", this.getEnergyStorage());
            this.container.sendChanges();
        };
        CapacitorBlock.prototype.energyTick = function (type, src) {
            var output = this.maxOutputPower;
            if (this.data.energy >= output) {
                this.data.energy += src.add(output) - output;
            }
        };
        CapacitorBlock.prototype.getEnergyStorage = function () {
            return this.capacity;
        };
        CapacitorBlock.prototype.energyReceive = function (type, amount, voltage) {
            var maxVoltage = this.maxOutputPower * 1.5;
            if (voltage > maxVoltage) {
                amount = Math.min(amount, maxVoltage);
            }
            var add = Math.min(amount, this.getEnergyStorage() - this.data.energy);
            this.data.energy += add;
            return add;
        };
        CapacitorBlock.prototype.canReceiveEnergy = function (side) {
            return this.getMode()[side] === TransferMode.IN;
        };
        CapacitorBlock.prototype.canExtractEnergy = function (side) {
            return this.getMode()[side] === TransferMode.OUT;
        };
        CapacitorBlock.prototype.adjustDrop = function (item) {
            if (item.id == this.blockID && this.data.energy > 0) {
                var extra = new ItemExtraData();
                item.extra = extra.putInt("energy", this.data.energy);
            }
            return item;
        };
        return CapacitorBlock;
    }(Machine.ProgressingMachine));
    Machine.CapacitorBlock = CapacitorBlock;
})(Machine || (Machine = {}));
function CapacitorBlockWindow(header) {
    return MachineRegistry.createInventoryWindow(header, {
        drawing: [
            { type: "bitmap", x: 335, y: 140, bitmap: "redflux_bar0", scale: 3.2 },
        ],
        elements: {
            "energyScale": { type: "scale", x: 335, y: 140, direction: 1, bitmap: "redflux_bar1", scale: 3.2 },
            "textInfo": { type: "text", x: 500, y: 140, width: 350, height: 30, text: "0/0 RF" },
            "slot1": { type: "slot", x: 480, y: 300, bitmap: "chargeSlot" },
            "slot2": { type: "slot", x: 580, y: 300, bitmap: "chargeSlot" },
            "slot3": { type: "slot", x: 680, y: 300, bitmap: "chargeSlot" },
            "slot4": { type: "slot", x: 780, y: 300, bitmap: "chargeSlot" },
        }
    });
}
/*
const CapacitorBlockInterface = {
  slots: {
    "slot1": {input: true, output: true,
      isValid: function(item: ItemStack, side: number, tileEntity: Machine.CapacitorBlock) {
        return side == 1 && ChargeItemRegistry.isValidItem(item.id, "Rf", tileEntity.getTier());
      },
      canOutput: function(item: ItemStack) {
        return ChargeItemRegistry.getEnergyStored(item) >= ChargeItemRegistry.getMaxCharge(item.id);
      }
    },
    "slot2": {input: true, output: true,
      isValid: function(item: ItemStack, side: number, tileEntity: Machine.CapacitorBlock) {
        return side > 1 && ChargeItemRegistry.isValidStorage(item.id, "Rf", tileEntity.getTier());
      },
      canOutput: function(item: ItemStack) {
        return ChargeItemRegistry.getEnergyStored(item) <= 0;
      }
    }
  }
}*/ 
/// <reference path="../../Machine/class/Base.ts" />
/// <reference path="../../Machine/class/ProgressingMachine.ts" />
/// <reference path="../../Machine/class/Generator.ts" />
var RF = EnergyTypeRegistry.assureEnergyType("Rf", 0.25);
var EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);
var RF_type2 = EnergyTypeRegistry.assureEnergyType("RF", 0.25);
var MachineRegistry;
(function (MachineRegistry) {
    var machineIDs = {};
    function isMachine(id) {
        return !!machineIDs[id];
    }
    MachineRegistry.isMachine = isMachine;
    function registerPrototype(id, Prototype) {
        var _a, _b, _c, _d, _e;
        // setup legacy prototypes
        if (!(Prototype instanceof Machine.MachineBase)) {
            var BasePrototype = Machine.MachineBase.prototype;
            Prototype.id = id;
            (_a = Prototype.getDefaultDrop) !== null && _a !== void 0 ? _a : (Prototype.getDefaultDrop = BasePrototype.getDefaultDrop);
            (_b = Prototype.adjustDrop) !== null && _b !== void 0 ? _b : (Prototype.adjustDrop = BasePrototype.adjustDrop);
            (_c = Prototype.setActive) !== null && _c !== void 0 ? _c : (Prototype.setActive = function (isActive) {
                if (this.data.isActive != isActive) {
                    this.data.isActive = isActive;
                    TileRenderer.mapAtCoords(this.x, this.y, this.z, this.blockID, this.data.meta + (isActive ? 4 : 0));
                }
            });
            (_d = Prototype.activate) !== null && _d !== void 0 ? _d : (Prototype.activate = function () {
                this.setActive(true);
            });
            (_e = Prototype.deactivate) !== null && _e !== void 0 ? _e : (Prototype.deactivate = function () {
                this.setActive(false);
            });
        }
        // register prototype
        machineIDs[id] = true;
        TileEntity.registerPrototype(id, Prototype);
        setMachineDrop(id, Prototype.defaultDrop);
        if (Prototype instanceof Machine.ProgressingMachine) {
            // wire connection
            ICRender.getGroup("ic-wire").add(id, -1);
            // register for energy net
            EnergyTileRegistry.addEnergyTypeForId(id, RF);
            EnergyTileRegistry.addEnergyTypeForId(id, EU);
            EnergyTileRegistry.addEnergyTypeForId(id, RF_type2);
        }
    }
    MachineRegistry.registerPrototype = registerPrototype;
    function createStorageInterface(blockID, descriptor) {
        var _a, _b, _c, _d;
        descriptor.liquidUnitRatio = 0.001;
        (_a = descriptor.getInputTank) !== null && _a !== void 0 ? _a : (descriptor.getInputTank = function () {
            return this.tileEntity.liquidTank;
        });
        (_b = descriptor.getOutputTank) !== null && _b !== void 0 ? _b : (descriptor.getOutputTank = function () {
            return this.tileEntity.liquidTank;
        });
        (_c = descriptor.canReceiveLiquid) !== null && _c !== void 0 ? _c : (descriptor.canReceiveLiquid = function (liquid) {
            return this.getInputTank().isValidLiquid(liquid);
        });
        (_d = descriptor.canTransportLiquid) !== null && _d !== void 0 ? _d : (descriptor.canTransportLiquid = function () { return true; });
        StorageInterface.createInterface(blockID, descriptor);
    }
    MachineRegistry.createStorageInterface = createStorageInterface;
    /**
     * For Energy Storage
     */
    function setStoragePlaceFunction(blockID, hasVerticalRotation) {
        Block.registerPlaceFunction(blockID, function (coords, item, block, player, blockSource) {
            var region = new WorldRegion(blockSource);
            var place = World.canTileBeReplaced(block.id, block.data) ? coords : coords.relative;
            var rotation = TileRenderer.getBlockRotation(player, hasVerticalRotation);
            region.setBlock(place, item.id, rotation);
            var tile = region.addTileEntity(place);
            if (item.extra) {
                tile.data.energy = item.extra.getInt("energy");
            }
        });
    }
    MachineRegistry.setStoragePlaceFunction = setStoragePlaceFunction;
    /**
     * For Liquid Storage
     */
    function setTankPlaceFunction(blockID, hasVerticalRotation) {
        Block.registerPlaceFunction(blockID, function (coords, item, block, player, blockSource) {
            var region = new WorldRegion(blockSource);
            var place = World.canTileBeReplaced(block.id, block.data) ? coords : coords.relative;
            var rotation = TileRenderer.getBlockRotation(player, hasVerticalRotation);
            region.setBlock(place, item.id, rotation);
            var tile = region.addTileEntity(place);
            if (item.extra) {
                var name_fluid = item.extra.getString("fluid");
                var amount_fluid = item.extra.getInt("amount");
                if (amount_fluid > 0) {
                    tile.liquidStorage.addLiquid(name_fluid, amount_fluid / 1000);
                }
            }
        });
    }
    MachineRegistry.setTankPlaceFunction = setTankPlaceFunction;
    function addTankTooltip(id) {
        Item.registerNameOverrideFunction(id, function (item, name) {
            if (item.extra) {
                var name_fluid = item.extra.getString("fluid");
                var amount_fluid = item.extra.getInt("amount");
                return name + "\n§7" + Translation.translate("Liquid: ") + name_fluid + "\n§7" + Translation.translate("Amount: ") + "§a" + amount_fluid + " mB";
            }
        });
    }
    MachineRegistry.addTankTooltip = addTankTooltip;
    /**@deprecated */
    function getMachineDrop(blockID, level) {
        var drop = [];
        if (level >= ToolAPI.getBlockDestroyLevel(blockID)) {
            var dropID = TileEntity.getPrototype(blockID).getDefaultDrop();
            drop.push([dropID, 1, 0]);
        }
        return drop;
    }
    MachineRegistry.getMachineDrop = getMachineDrop;
    function setMachineDrop(blockID, dropID) {
        dropID !== null && dropID !== void 0 ? dropID : (dropID = Block.getNumericId(blockID));
        BlockRegistry.registerDrop(blockID, function (coords, blockID, blockData, level) {
            var drop = [];
            if (level >= ToolAPI.getBlockDestroyLevel(blockID)) {
                drop.push([dropID, 1, 0]);
            }
            return drop;
        });
    }
    MachineRegistry.setMachineDrop = setMachineDrop;
    function fillTankOnClick(tank, item, playerUid) {
        var liquid = tank.getLiquidStored();
        var empty = LiquidItemRegistry.getEmptyItem(item.id, item.data);
        if (empty && (!liquid && tank.isValidLiquid(empty.liquid) || empty.liquid == liquid) && !tank.isFull()) {
            var player = new PlayerEntity(playerUid);
            var liquidLimit = tank.getLimit();
            var storedAmount = tank.getAmount(liquid);
            var count = Math.min(item.count, Math.floor((liquidLimit - storedAmount) / empty.amount));
            if (count > 0) {
                tank.addLiquid(empty.liquid, empty.amount * count);
                player.addItemToInventory(new ItemStack(empty.id, count, empty.data));
                item.count -= count;
                player.setCarriedItem(item);
            }
            else if (item.count == 1 && empty.storage) {
                var amount = Math.min(liquidLimit - storedAmount, empty.amount);
                tank.addLiquid(empty.liquid, amount);
                item.data += amount;
                player.setCarriedItem(item);
            }
            return true;
        }
        return false;
    }
    MachineRegistry.fillTankOnClick = fillTankOnClick;
    /** @deprecated */
    function isValidRFItem(id, count, data, container) {
        var level = container.tileEntity.getTier();
        return ChargeItemRegistry.isValidItem(id, "Rf", level);
    }
    MachineRegistry.isValidRFItem = isValidRFItem;
    /** @deprecated */
    function isValidRFStorage(id, count, data, container) {
        var level = container.tileEntity.getTier();
        return ChargeItemRegistry.isValidStorage(id, "Rf", level);
    }
    MachineRegistry.isValidRFStorage = isValidRFStorage;
    function updateGuiHeader(gui, text) {
        var header = gui.getWindow("header");
        header.contentProvider.drawing[2].text = Translation.translate(text);
    }
    MachineRegistry.updateGuiHeader = updateGuiHeader;
    function createInventoryWindow(header, uiDescriptor) {
        var gui = new UI.StandardWindow({
            standard: {
                header: { text: { text: Translation.translate(header) } },
                inventory: { standard: true },
                background: { standard: true }
            },
            drawing: uiDescriptor.drawing || [],
            elements: uiDescriptor.elements
        });
        Callback.addCallback("LevelLoaded", function () {
            MachineRegistry.updateGuiHeader(gui, header);
        });
        return gui;
    }
    MachineRegistry.createInventoryWindow = createInventoryWindow;
})(MachineRegistry || (MachineRegistry = {}));
BlockRegistry.createBlockType("machine", {
    extends: "stone",
    destroyTime: 3
});
BlockRegistry.createBlockType("other-machine", {
    solid: false,
    explosionResistance: 4,
    renderLayer: 2,
    translucency: 0,
    sound: "stone"
});
var CapacitorAPI;
(function (CapacitorAPI) {
    var data = {};
    function getCapacitor(id) {
        return data[id];
    }
    CapacitorAPI.getCapacitor = getCapacitor;
    function isCapacitor(id) {
        return !!data[id];
    }
    CapacitorAPI.isCapacitor = isCapacitor;
    function isValidCapacitor(id, machine) {
        var capacitor = getCapacitor(id);
        var validCapacitor = machine["upgrades"];
        if (capacitor && (!validCapacitor || validCapacitor.indexOf(capacitor.type) != -1)) {
            return true;
        }
        return false;
    }
    CapacitorAPI.isValidCapacitor = isValidCapacitor;
    function registerCapacitor(id, capacitor) {
        data[id] = capacitor;
    }
    CapacitorAPI.registerCapacitor = registerCapacitor;
    function useCapacitor(machine) {
        return new CapacitorSet(machine);
    }
    CapacitorAPI.useCapacitor = useCapacitor;
    var CapacitorSet = /** @class */ (function () {
        function CapacitorSet(tileEntity) {
            this.tileEntity = tileEntity;
            this.resetRates();
            this.useCapacitor();
        }
        CapacitorSet.prototype.resetRates = function () {
            this.bonusGeneratorMultiplier = 1;
            this.energyConsumeMultiplier = 1;
            this.extraEnergyStorage = 1;
            this.maxRangeMultiplier = 1;
        };
        CapacitorSet.prototype.useCapacitor = function () {
            var container = this.tileEntity.container;
            for (var slotName in container.slots) {
                if (slotName.match(/Capacitor/)) {
                    var slot = container.getSlot(slotName);
                    var capacitor = getCapacitor(slot.id);
                    if (capacitor && this.isValidCapacitor(capacitor)) {
                        this.executeUprade(capacitor, slot);
                    }
                }
            }
        };
        CapacitorSet.prototype.isValidCapacitor = function (capacitor) {
            var validCapacitor = this.tileEntity["upgrades"];
            return (!validCapacitor || validCapacitor.indexOf(capacitor.type) != -1);
        };
        CapacitorSet.prototype.executeUprade = function (capacitor, stack) {
            if (capacitor.type == "capacitor") {
                this.bonusGeneratorMultiplier *= capacitor.getBonusGenerator(stack, this.tileEntity);
                this.energyConsumeMultiplier += capacitor.getEnergyConsumeMultiplier(stack, this.tileEntity);
                this.extraEnergyStorage *= capacitor.getExtraEnergyStorage(stack, this.tileEntity);
                this.maxRangeMultiplier += capacitor.getRange(stack, this.tileEntity);
            }
            if ("onTick" in capacitor) {
                capacitor.onTick(stack, this.tileEntity);
            }
        };
        // get data from Tile Entity
        CapacitorSet.prototype.getBonusGenerator = function (defaultBonus) {
            return defaultBonus * this.bonusGeneratorMultiplier;
        };
        CapacitorSet.prototype.getEnergyConsume = function (defaultEnergy) {
            return defaultEnergy * this.energyConsumeMultiplier;
        };
        CapacitorSet.prototype.getEnergyStorage = function (defaultEnergyStorage) {
            var energyStorage = defaultEnergyStorage * this.extraEnergyStorage;
            var tileData = this.tileEntity.data;
            tileData.energy = Math.min(tileData.energy, energyStorage);
            return energyStorage;
        };
        CapacitorSet.prototype.getRange = function (defaultRange) {
            return defaultRange + this.maxRangeMultiplier;
        };
        return CapacitorSet;
    }());
    CapacitorAPI.CapacitorSet = CapacitorSet;
})(CapacitorAPI || (CapacitorAPI = {}));
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
var SmelterRecipe;
(function (SmelterRecipe) {
    /*export type FurnaceRecipeFormat = {
      result: ItemInstance,
      ingredient: string
    }
  */
    SmelterRecipe.recipes = [];
    function addRecipe(obj) {
        var inputArray = [obj.ingredient1];
        if (!!obj.ingredient2) {
            inputArray.push(obj.ingredient2);
        }
        if (!!obj.ingredient3) {
            inputArray.push(obj.ingredient3);
        }
        SmelterRecipe.recipes.push({
            result: obj.result,
            input: inputArray,
            energy: obj.energy
        });
    }
    SmelterRecipe.addRecipe = addRecipe;
    function getInput(container) {
        var inputItems = [];
        for (var i = 1; i <= 3; i++) {
            var slot = container.getSlot("ingredient" + i);
            if (slot.id > 0) {
                inputItems.push(new ItemStack(slot));
            }
        }
        return inputItems;
    }
    SmelterRecipe.getInput = getInput;
    function getRecipe(inputItems) {
        if (inputItems.length == 0)
            return null;
        for (var _i = 0, recipes_1 = SmelterRecipe.recipes; _i < recipes_1.length; _i++) {
            var recipe = recipes_1[_i];
            var valid = true;
            for (var _a = 0, _b = recipe.input; _a < _b.length; _a++) {
                var item = _b[_a];
                var count = 0;
                for (var _c = 0, inputItems_1 = inputItems; _c < inputItems_1.length; _c++) {
                    var slot = inputItems_1[_c];
                    if (item.id == slot.id && (item.data == -1 || item.data == slot.data)) {
                        count += slot.count;
                    }
                }
                if (count < item.count) {
                    valid = false;
                    break;
                }
            }
            if (valid) {
                return recipe;
            }
        }
        return null;
    }
    SmelterRecipe.getRecipe = getRecipe;
    function performRecipe(recipe, container) {
        var resultSlot = container.getSlot("slotResult");
        for (var _i = 0, _a = recipe.input; _i < _a.length; _i++) {
            var item = _a[_i];
            var count = item.count;
            for (var i = 1; i <= 3; i++) {
                var slot = container.getSlot("ingredient" + i);
                if (item.id == slot.id && (item.data == -1 || item.data == slot.data)) {
                    var dc = Math.min(count, slot.count);
                    count -= dc;
                    slot.setSlot(slot.id, slot.count - dc, slot.data);
                    slot.validate();
                }
            }
        }
        resultSlot.setSlot(recipe.result.id, resultSlot.count + recipe.result.count, recipe.result.data);
        container.validateAll();
    }
    SmelterRecipe.performRecipe = performRecipe;
    function getInputFurnace(container) {
        // input check
        var inputItems = {};
        for (var i = 1; i <= 3; i++) {
            var slot = container.getSlot("ingredient" + i);
            if (slot.id > 0 && slot.count > 0) {
                inputItems["ingredient" + i] = new ItemStack(slot);
            }
        }
        return inputItems;
    }
    SmelterRecipe.getInputFurnace = getInputFurnace;
    function getRecipeFurnace(input) {
        for (var slots in input) {
            var slot = input[slots];
            if (!Recipes.getFurnaceRecipeResult(slot.id, slot.data, "iron")) {
                continue;
            }
            else if (Recipes.getFurnaceRecipeResult(slot.id, slot.data, "iron")) {
                return {
                    result: Recipes.getFurnaceRecipeResult(slot.id, slot.data, "iron"),
                    ingredient: slots
                };
            }
        }
        return {
            result: null,
            ingredient: null
        };
    }
    SmelterRecipe.getRecipeFurnace = getRecipeFurnace;
})(SmelterRecipe || (SmelterRecipe = {}));
var CrusherRecipe;
(function (CrusherRecipe) {
    CrusherRecipe.recipes = [];
    function add(obj) {
        if (!obj.result0.count) {
            obj.result0.count = 1;
        }
        if (!obj.result1) {
            obj.result1 = { id: 0, data: 0, chance: 0 };
        }
        if (!obj.result2) {
            obj.result2 = { id: 0, data: 0, chance: 0 };
        }
        if (!obj.result3) {
            obj.result3 = { id: 0, data: 0, chance: 0 };
        }
        if (obj.isGrinding == undefined || obj.isGrinding == null) {
            obj.isGrinding = false;
        }
        CrusherRecipe.recipes.push(obj);
    }
    CrusherRecipe.add = add;
    function getRecipe(input) {
        // ItemContainerSlot
        var id = input.id;
        var data = input.data;
        var count = input.count;
        if (!id)
            return null;
        for (var _i = 0, recipes_2 = CrusherRecipe.recipes; _i < recipes_2.length; _i++) {
            var recipe = recipes_2[_i];
            var ingredient = recipe.ingredient;
            if (id == ingredient.id && (data == -1 || data == ingredient.data) && count >= 1)
                return recipe;
        }
        return null;
    }
    CrusherRecipe.getRecipe = getRecipe;
    function getInput(item) {
        var id = item.id;
        var data = item.data;
        for (var _i = 0, recipes_3 = CrusherRecipe.recipes; _i < recipes_3.length; _i++) {
            var recipe = recipes_3[_i];
            var ingredient = recipe.ingredient;
            if (id == ingredient.id && (data == -1 || data == ingredient.data)) {
                return true;
            }
            return false;
        }
    }
    CrusherRecipe.getInput = getInput;
})(CrusherRecipe || (CrusherRecipe = {}));
var VatRecipe;
(function (VatRecipe) {
    VatRecipe.recipes = [];
    function add(obj) {
        var newData = {};
        var newData2 = {};
        for (var key1 in obj.input1) {
            var newKey = void 0;
            if (key1.includes(":")) {
                var keyArray = key1.split(":");
                if (keyArray[0] == "minecraft") {
                    var stringID = keyArray[1];
                    var numericID = VanillaBlockID[stringID] || VanillaItemID[stringID];
                    if (!numericID) {
                        var source = IDConverter.getIDData(stringID);
                        newKey = source.id + ":" + source.data;
                    }
                    else {
                        newKey = numericID;
                        if (keyArray[2])
                            newKey += ":" + keyArray[2];
                    }
                }
                else {
                    newKey = eval(keyArray[0]) + ":" + keyArray[1];
                }
            }
            else {
                newKey = eval(key1);
            }
            if (newKey)
                newData[newKey] = obj.input1[key1];
        }
        for (var key2 in obj.input2) {
            var newKey2 = void 0;
            if (key2.includes(":")) {
                var keyArray = key2.split(":");
                if (keyArray[0] == "minecraft") {
                    var stringID = keyArray[1];
                    var numericID = VanillaBlockID[stringID] || VanillaItemID[stringID];
                    if (!numericID) {
                        var source = IDConverter.getIDData(stringID);
                        newKey2 = source.id + ":" + source.data;
                    }
                    else {
                        newKey2 = numericID;
                        if (keyArray[2])
                            newKey2 += ":" + keyArray[2];
                    }
                }
                else {
                    newKey2 = eval(keyArray[0]) + ":" + keyArray[1];
                }
            }
            else {
                newKey2 = eval(key2);
            }
            if (newKey2)
                newData2[newKey2] = obj.input2[key2];
        }
        obj.input1 = newData;
        obj.input2 = newData2;
        VatRecipe.recipes.push(obj);
    }
    VatRecipe.add = add;
    function getResult(i1, i2, inputTank) {
        var result;
        var liquidStorage = inputTank.getLiquidStored();
        var liquidAmount = inputTank.getAmount(liquidStorage);
        for (var _i = 0, recipes_4 = VatRecipe.recipes; _i < recipes_4.length; _i++) {
            var recipe = recipes_4[_i];
            var input1 = recipe.input1;
            var input2 = recipe.input2;
            var input2Check = !isEmpty(input2); // empty = false; non-empty = true
            var input1Multiplier = input1[i1.id + ":" + i1.data] || input1[i1.id];
            if (input1Multiplier && input2Check) {
                var input2Multiplier = input2[i2.id] || input2[i2.id + ":" + i2.data];
                var ingredientMultiplier = input1Multiplier * input2Multiplier;
                var inputVolume = ingredientMultiplier * 1000;
                if (liquidStorage == recipe.inputLiquid && liquidAmount >= inputVolume) {
                    var outputVolume = ingredientMultiplier * recipe.inputMutilplier * 1000;
                    result = {
                        type: 2,
                        liquidOut: recipe.outputLiquid,
                        amount: outputVolume,
                        energy: recipe.energy,
                        amount_input: inputVolume,
                        liquidIn: recipe.inputLiquid
                    };
                }
            }
            else if (input1Multiplier && !input2Check) {
                var ingredientMultiplier = input1Multiplier;
                var inputVolume = ingredientMultiplier * 1000;
                if (liquidStorage == recipe.inputLiquid && liquidAmount >= inputVolume) {
                    var outputVolume = ingredientMultiplier * recipe.inputMutilplier * 1000;
                    result = {
                        type: 1,
                        liquidOut: recipe.outputLiquid,
                        amount: outputVolume,
                        energy: recipe.energy,
                        amount_input: inputVolume,
                        liquidIn: recipe.inputLiquid
                    };
                }
            }
        }
        return result;
    }
    VatRecipe.getResult = getResult;
    function getLiquidOutput() {
        var outputLiquid = [];
        for (var i in VatRecipe.recipes) {
            outputLiquid.push(VatRecipe.recipes[i].outputLiquid);
        }
        return outputLiquid;
    }
    VatRecipe.getLiquidOutput = getLiquidOutput;
    function getLiquidInput() {
        var inputLiquid = [];
        for (var i in VatRecipe.recipes) {
            inputLiquid.push(VatRecipe.recipes[i].inputLiquid);
        }
        return inputLiquid;
    }
    VatRecipe.getLiquidInput = getLiquidInput;
    function performRecipe(result, tile) {
        var ingredient1 = tile.container.getSlot("slotInput0");
        var ingredient2 = tile.container.getSlot("slotInput1");
        if (result.type == 2) {
            ingredient1.count--;
            ingredient1.markDirty();
            ingredient2.count--;
            ingredient2.markDirty();
        }
        else if (result.type == 1) {
            ingredient1.count--;
            ingredient1.markDirty();
        }
        tile.outputTank.addLiquid(result.liquidOut, result.amount);
        tile.inputTank.getLiquid(result.liquidIn, result.amount_input);
        tile.container.validateAll();
        tile.data.progress = 0;
    }
    VatRecipe.performRecipe = performRecipe;
})(VatRecipe || (VatRecipe = {}));
var SoulRecipe;
(function (SoulRecipe) {
    SoulRecipe.recipes = [];
    function add(obj) {
        if (!(!obj.soul || !obj.lvl || !obj.ingredient)) {
            SoulRecipe.recipes.push(obj);
        }
    }
    SoulRecipe.add = add;
    function getRecipe(input, soul, lvl) {
        var id = input.id;
        var data = input.data;
        var count = input.count;
        if (!id)
            return null;
        for (var _i = 0, recipes_5 = SoulRecipe.recipes; _i < recipes_5.length; _i++) {
            var recipe = recipes_5[_i];
            var ingredient = recipe.ingredient;
            if ((id == ingredient.id &&
                (data == -1 || data == ingredient.data) && count >= 1) &&
                (soul == recipe.soul || recipe.soul == "all") &&
                lvl >= recipe.lvl)
                return recipe;
        }
        return null;
    }
    SoulRecipe.getRecipe = getRecipe;
    function getTypeSoul(item) {
        if (item.id == ItemID.soulVessel) {
            if (item.extra) {
                if (item.extra.getString('name')) {
                    return item.extra.getString('name');
                }
            }
        }
        return null;
    }
    SoulRecipe.getTypeSoul = getTypeSoul;
})(SoulRecipe || (SoulRecipe = {}));
var SliceAndSpliceRecipe;
(function (SliceAndSpliceRecipe) {
    // export interface ItemInstanceMissCount {
    SliceAndSpliceRecipe.recipes = [];
    function addRecipe(obj) {
        SliceAndSpliceRecipe.recipes.push(obj);
    }
    SliceAndSpliceRecipe.addRecipe = addRecipe;
    function getRecipe(container) {
        for (var i in SliceAndSpliceRecipe.recipes) {
            var recipe = SliceAndSpliceRecipe.recipes[i];
            var slot0 = container.getSlot("slotInput0");
            var slot1 = container.getSlot("slotInput1");
            var slot2 = container.getSlot("slotInput2");
            var slot3 = container.getSlot("slotInput3");
            var slot4 = container.getSlot("slotInput4");
            var slot5 = container.getSlot("slotInput5");
            var r_input0 = recipe["input0"];
            var r_input1 = recipe["input1"];
            var r_input2 = recipe["input2"];
            var r_input3 = recipe["input3"];
            var r_input4 = recipe["input4"];
            var r_input5 = recipe["input5"];
            if ((slot0.id == r_input0.id && slot0.data == r_input0.data && slot0.count >= 1) &&
                (slot1.id == r_input1.id && slot1.data == r_input1.data && slot1.count >= 1) &&
                (slot2.id == r_input2.id && slot2.data == r_input2.data && slot2.count >= 1) &&
                (slot3.id == r_input3.id && slot3.data == r_input3.data && slot3.count >= 1) &&
                (slot4.id == r_input4.id && slot4.data == r_input4.data && slot4.count >= 1) &&
                (slot5.id == r_input5.id && slot5.data == r_input5.data && slot5.count >= 1)) {
                return recipe;
            }
        }
        return null;
    }
    SliceAndSpliceRecipe.getRecipe = getRecipe;
    function getRecipeWithItem(item) {
        for (var i in SliceAndSpliceRecipe.recipes) {
            var recipe = SliceAndSpliceRecipe.recipes[i];
            var r_input0 = recipe["input0"];
            var r_input1 = recipe["input1"];
            var r_input2 = recipe["input2"];
            var r_input3 = recipe["input3"];
            var r_input4 = recipe["input4"];
            var r_input5 = recipe["input5"];
            if ((item.id == r_input0.id && item.data == r_input0.data && item.count >= 1) &&
                (item.id == r_input1.id && item.data == r_input1.data && item.count >= 1) &&
                (item.id == r_input2.id && item.data == r_input2.data && item.count >= 1) &&
                (item.id == r_input3.id && item.data == r_input3.data && item.count >= 1) &&
                (item.id == r_input4.id && item.data == r_input4.data && item.count >= 1) &&
                (item.id == r_input5.id && item.data == r_input5.data && item.count >= 1)) {
                return recipe;
            }
        }
        return null;
    }
    SliceAndSpliceRecipe.getRecipeWithItem = getRecipeWithItem;
    function isInput(item) {
        for (var i in SliceAndSpliceRecipe.recipes) {
            var recipe = SliceAndSpliceRecipe.recipes[i];
            var r_input0 = recipe["input0"];
            var r_input1 = recipe["input1"];
            var r_input2 = recipe["input2"];
            var r_input3 = recipe["input3"];
            var r_input4 = recipe["input4"];
            var r_input5 = recipe["input5"];
            switch (item) {
                case r_input0:
                case r_input1:
                case r_input2:
                case r_input3:
                case r_input4:
                case r_input5:
                    return true;
                    break;
                default:
                    return false;
                    break;
            }
        }
    }
    SliceAndSpliceRecipe.isInput = isInput;
})(SliceAndSpliceRecipe || (SliceAndSpliceRecipe = {}));
var RecipeRegistry;
(function (RecipeRegistry) {
    function addSmelter(obj) {
        SmelterRecipe.addRecipe(obj);
    }
    RecipeRegistry.addSmelter = addSmelter;
    function addCrusher(obj) {
        CrusherRecipe.add(obj);
    }
    RecipeRegistry.addCrusher = addCrusher;
    function addVat(obj) {
        VatRecipe.add(obj);
    }
    RecipeRegistry.addVat = addVat;
    function addSBinder(obj) {
        if (obj.soul === -1)
            obj.soul = "all";
        SoulRecipe.add(obj);
    }
    RecipeRegistry.addSBinder = addSBinder;
    function addSliceAndSplice(obj) {
        SliceAndSpliceRecipe.addRecipe(obj);
    }
    RecipeRegistry.addSliceAndSplice = addSliceAndSplice;
})(RecipeRegistry || (RecipeRegistry = {}));
var CombustionFuel;
(function (CombustionFuel) {
    CombustionFuel.fuel = {};
    CombustionFuel.coolant = {};
    function addFuel(liquid, perTick, ticks) {
        CombustionFuel.fuel[liquid] = {
            "perTick": perTick,
            "ticks": ticks
        };
    }
    CombustionFuel.addFuel = addFuel;
    function addCoolant(liquid, amount, temperature) {
        CombustionFuel.coolant[liquid] = {
            "amount": amount,
            "temperature": temperature
        };
    }
    CombustionFuel.addCoolant = addCoolant;
    function getFuelData(liquid) {
        return CombustionFuel.fuel[liquid];
    }
    CombustionFuel.getFuelData = getFuelData;
    function getCoolantData(liquid) {
        return CombustionFuel.coolant[liquid];
    }
    CombustionFuel.getCoolantData = getCoolantData;
    function getHeatArray() {
        var heat = [];
        for (var key in CombustionFuel.fuel) {
            var input = key.split(":");
            heat.push(input[0]);
        }
        return heat;
    }
    CombustionFuel.getHeatArray = getHeatArray;
    function getCoolArray() {
        var cool = [];
        for (var key in CombustionFuel.coolant) {
            var input = key.split(":");
            cool.push(input[0]);
        }
        return cool;
    }
    CombustionFuel.getCoolArray = getCoolArray;
    /*
    export function getData(data_type, liquid: string){
      return data_type[liquid];
    }
  */
    var CoolantImpl = /** @class */ (function () {
        function CoolantImpl(fluid, degreesCoolingPerMB) {
            if (fluid == null) {
                this.fluid = null;
                this.degreesCoolingPerMB = this.temperature = 0;
            }
            else {
                this.fluid = fluid;
                this.degreesCoolingPerMB = degreesCoolingPerMB || getCoolantData(fluid).amount;
                this.temperature = getCoolantData(fluid).temperature;
            }
        }
        CoolantImpl.prototype.getFluid = function () {
            return this.fluid;
        };
        /**
         * How much heat can one mB of the coolant absorb until it is evaporated completely?
         *
         */
        CoolantImpl.prototype.getDegreesCoolingPerMB = function () {
            return (273.25 + 100.0 - this.getTemperature()) * this.getDegreesCoolingPerMBPerK();
        };
        /**
         * How much heat can one mB of the coolant absorb until it heats up by 1 K?
         *
         */
        CoolantImpl.prototype.getDegreesCoolingPerMBPerK = function () {
            return this.degreesCoolingPerMB;
        };
        CoolantImpl.prototype.getTemperature = function () {
            return this.temperature;
        };
        return CoolantImpl;
    }());
    CombustionFuel.CoolantImpl = CoolantImpl;
    var FuelImpl = /** @class */ (function () {
        function FuelImpl(fluid, powerPerCycle, totalBurningTime) {
            if (fluid == null) {
                this.fluid = null;
                this.powerPerCycle = this.totalBurningTime = 0;
            }
            else {
                this.fluid = fluid;
                this.powerPerCycle = powerPerCycle || getFuelData(fluid).perTick;
                this.totalBurningTime = totalBurningTime || getFuelData(fluid).ticks;
            }
        }
        FuelImpl.prototype.getFluid = function () {
            return this.fluid;
        };
        /**
         * Total burn time of one bucket of fuel
         */
        FuelImpl.prototype.getTotalBurningTime = function () {
            return this.totalBurningTime;
        };
        /**
         * Amount of energy created per tick in a base-line machine
         */
        FuelImpl.prototype.getPowerPerCycle = function () {
            return this.powerPerCycle;
        };
        return FuelImpl;
    }());
    CombustionFuel.FuelImpl = FuelImpl;
})(CombustionFuel || (CombustionFuel = {}));
CombustionFuel.addFuel("hootch", 60, 6000); // name, mb/t, t
CombustionFuel.addFuel("fireWater", 80, 15000);
CombustionFuel.addFuel("rocketFuel", 160, 7000);
CombustionFuel.addCoolant("water", 0.0023, 300);
CombustionFuel.addCoolant("vaporOfLevity", 0.0314, 5);
CombustionFuel.addCoolant("enderDistillation", 0.0023, 175);
var HEAT_PER_RF = 0.00023 / 2;
var CombustionMath = /** @class */ (function () {
    function CombustionMath(coolant, fuel, capQuality, machineQuality) {
        if (coolant == null || fuel == null || capQuality == 0 || machineQuality == 0) {
            this.ticksPerCoolant = this.ticksPerFuel = this.energyPerTick = 0;
        }
        else {
            this.energyPerTick = Math.round(fuel.getPowerPerCycle() * capQuality * machineQuality);
            var cooling = coolant.getDegreesCoolingPerMB(); // heat absorbed per mB
            var toCool = HEAT_PER_RF * this.energyPerTick * machineQuality; // heat per tick
            this.ticksPerCoolant = Math.max(Math.round(cooling / toCool), 1);
            this.ticksPerFuel = Math.max((fuel.getTotalBurningTime() / capQuality / 1000), 1);
        }
    }
    CombustionMath.prototype.getTicksPerCoolant = function (amount) {
        if (amount)
            return this.ticksPerCoolant * amount;
        else
            return this.ticksPerCoolant;
    };
    CombustionMath.prototype.getTicksPerFuel = function (amount) {
        if (amount)
            return this.ticksPerFuel * amount;
        else
            return this.ticksPerFuel;
    };
    CombustionMath.prototype.getEnergyPerTick = function () {
        return this.energyPerTick;
    };
    // For RV
    CombustionMath.prototype.getEnergyGeneratorPerCycle = function (amount) {
        return this.getEnergyPerTick() * Math.min(this.getTicksPerCoolant(amount), this.getTicksPerFuel(amount));
    };
    return CombustionMath;
}());
var GrindingBall;
(function (GrindingBall) {
    GrindingBall.idBall = {};
    function regItem(id, name) {
        var texture = "item_alloy_ball_" + id;
        var iID = "ball_" + id;
        IDRegistry.genItemID(iID);
        Item.createItem(iID, name + " Grinding Ball", { name: texture }, { stack: 64 });
    }
    GrindingBall.regItem = regItem;
    function regModBall(id, name, main, bonus, powUse, dura, recipe) {
        regItem(id, name);
        GrindingBall.idBall[ItemID["ball_" + id]] = { main: (main - 100) / 100, bonus: bonus / 100, use: powUse / 100, durability: dura / 2400 };
        if (!!recipe) {
            Callback.addCallback("PreLoaded", function () {
                Recipes.addShaped({ id: ItemID["ball_" + id], count: 24, data: 0 }, [
                    " a ",
                    "aaa",
                    " a "
                ], ['a', ItemID[recipe.id], recipe.data]);
            });
        }
        ;
    }
    GrindingBall.regModBall = regModBall;
    function regBall(id, main, bonus, powUse, dura) {
        var n_id = id;
        if (typeof id == "string")
            n_id = ItemID[n_id];
        GrindingBall.idBall[id] = { main: (main - 100) / 100, bonus: bonus / 100, use: powUse / 100, durability: dura / 2400 };
    }
    GrindingBall.regBall = regBall;
    function isBallID(id) {
        var n_id = id;
        if (typeof id == "string")
            n_id = ItemID[id];
        return !!GrindingBall.idBall[n_id];
    }
    GrindingBall.isBallID = isBallID;
    function getBallID(id) {
        var n_id = id;
        if (typeof id == "string")
            n_id = ItemID[id];
        return GrindingBall.idBall[n_id];
    }
    GrindingBall.getBallID = getBallID;
})(GrindingBall || (GrindingBall = {}));
;
// ender io resource
GrindingBall.regBall(VanillaItemID.flint, 120, 125, 85, 24000);
GrindingBall.regModBall("dark_steel", "Dark Steel", 135, 200, 70, 124800, { id: "darkSteel", data: 0 });
GrindingBall.regModBall("conductive_iron", "Conductive Iron", 135, 100, 100, 40800, { id: "conductiveIron", data: 0 });
GrindingBall.regModBall("electrical_steel", "Electrical Steel", 120, 165, 80, 40800, { id: "electricalSteel", data: 0 });
GrindingBall.regModBall("energetic_alloy", "Energetic Alloy", 160, 110, 110, 81600, { id: "energeticAlloy", data: 0 });
GrindingBall.regModBall("vibrant_alloy", "Vibrant Alloy", 175, 135, 135, 81600, { id: "vibrantAlloy", data: 0 });
GrindingBall.regModBall("redstone_alloy", "Redstone Alloy", 100, 100, 35, 31200, { id: "redstoneAlloy", data: 0 });
GrindingBall.regModBall("pulsating_iron", "Pulsating Iron", 100, 185, 100, 100800, { id: "pulsatingIron", data: 0 });
GrindingBall.regModBall("soularium", "Soularium", 120, 215, 90, 81600, { id: "soularium", data: 0 });
// thermal resource
/*
The grinding balls from Thermal's resources are registered at: dev/Base/Integration/thermal.js
*/
// endergy
GrindingBall.regModBall("crude_steel", "Crude Steel", 120, 125, 85, 24000, { id: "crudeSteel", data: 0 });
GrindingBall.regModBall("crystalline_alloy", "Crude Steel", 180, 140, 145, 81600, { id: "crystalline", data: 0 });
GrindingBall.regModBall("vivid_alloy", "Vivid Alloy", 175, 135, 135, 81600, { id: "vividAlloy", data: 0 });
var ItemIconSource = WRAP_JAVA("com.zhekasmirnov.innercore.api.mod.ui.icon.ItemIconSource").instance;
var CraterHelper;
(function (CraterHelper) {
    function getIcon(item) {
        return ItemIconSource.getIconName(item.id, item.data);
    }
    CraterHelper.getIcon = getIcon;
})(CraterHelper || (CraterHelper = {}));
var EnderTool;
(function (EnderTool) {
    var wrenchData = {};
    function registerWrench(id, properties) {
        wrenchData[id] = properties;
    }
    EnderTool.registerWrench = registerWrench;
    function getWrenchData(id) {
        return wrenchData[id];
    }
    EnderTool.getWrenchData = getWrenchData;
    function isWrench(id) {
        return !!getWrenchData(id);
    }
    EnderTool.isWrench = isWrench;
    function isUseableWrench(item, damage) {
        if (damage === void 0) { damage = 1; }
        var wrench = getWrenchData(item.id);
        return wrench === null || wrench === void 0 ? void 0 : wrench.isUseable(item, damage);
    }
    EnderTool.isUseableWrench = isUseableWrench;
    function useWrench(item, damage, player) {
        var wrench = getWrenchData(item.id);
        wrench === null || wrench === void 0 ? void 0 : wrench.useItem(item, damage, player);
    }
    EnderTool.useWrench = useWrench;
    function rotateMachine(tileEntity, side, item, player) {
        if (tileEntity.setFacing(side)) {
            useWrench(item, 1, player);
            //SoundManager.playSoundAtBlock(tileEntity, "Wrench.ogg", 1);
        }
    }
    EnderTool.rotateMachine = rotateMachine;
    function addRecipe(result, data, tool) {
        data.push({ id: tool, data: -1 });
        Recipes.addShapeless(result, data, function (api, field, result) {
            for (var i = 0; i < field.length; i++) {
                if (field[i].id == tool) {
                    field[i].data++;
                    if (field[i].data >= Item.getMaxDamage(tool)) {
                        field[i].id = field[i].count = field[i].data = 0;
                    }
                }
                else {
                    api.decreaseFieldSlot(i);
                }
            }
        });
    }
    EnderTool.addRecipe = addRecipe;
    function dischargeItem(item, consume, player) {
        var energyGot = 0;
        var itemTier = ChargeItemRegistry.getItemData(item.id).tier;
        var armor = Entity.getArmorSlot(player, 1);
        var armorEnergy = ChargeItemRegistry.getEnergyStored(armor);
        var armorData = ChargeItemRegistry.getItemData(armor.id);
        if (armorEnergy > 0 && armorData.energy == RF.name && armorData.tier >= itemTier) {
            energyGot = Math.min(armorEnergy, consume);
        }
        var energyStored = ChargeItemRegistry.getEnergyStored(item) + energyGot;
        if (energyStored >= consume) {
            if (energyGot > 0) {
                ChargeItemRegistry.setEnergyStored(armor, armorEnergy - energyGot);
                Entity.setArmorSlot(player, 1, armor.id, 1, armor.data, armor.extra);
            }
            ChargeItemRegistry.setEnergyStored(item, energyStored - consume);
            return true;
        }
        return false;
    }
    EnderTool.dischargeItem = dischargeItem;
    function useElectricItem(item, consume, player) {
        if (dischargeItem(item, consume, player)) {
            Entity.setCarriedItem(player, item.id, 1, item.data, item.extra);
            return true;
        }
        return false;
    }
    EnderTool.useElectricItem = useElectricItem;
    Callback.addCallback("DestroyBlockStart", function (coords, block) {
        if (MachineRegistry.isMachine(block.id)) {
            var item = Player.getCarriedItem();
            if (EnderTool.isUseableWrench(item, 10)) {
                Network.sendToServer("EnderCore.demontageMachine", { x: coords.x, y: coords.y, z: coords.z });
            }
        }
    });
    Network.addServerPacket("EnderCore.demontageMachine", function (client, data) {
        var player = client.getPlayerUid();
        var region = WorldRegion.getForActor(player);
        var blockID = region.getBlockId(data);
        if (MachineRegistry.isMachine(blockID)) {
            var item = new ItemStack(Entity.getCarriedItem(player));
            if (EnderTool.isUseableWrench(item, 10)) {
                var tileEntity = (region.getTileEntity(data) || region.addTileEntity(data));
                if (!tileEntity)
                    return;
                var drop = tileEntity.adjustDrop(new ItemStack(tileEntity.blockID, 1, 0));
                TileEntity.destroyTileEntity(tileEntity);
                region.setBlock(data, 0, 0);
                region.dropAtBlock(data.x, data.y, data.z, drop);
                EnderTool.useWrench(item, 10, player);
            }
        }
    });
})(EnderTool || (EnderTool = {}));
var EnderConfig;
(function (EnderConfig) {
    function getBool(name) {
        return __config__.getBool(name);
    }
    EnderConfig.getBool = getBool;
    function getInt(name) {
        return __config__.getInteger(name);
    }
    EnderConfig.getInt = getInt;
    function getFloat(name) {
        return __config__.getFloat(name);
    }
    EnderConfig.getFloat = getFloat;
    EnderConfig.debugMode = getBool("debug_mode");
    EnderConfig.oldMode = getBool("old_mode");
})(EnderConfig || (EnderConfig = {}));
var isLevelDisplayed = false;
Callback.addCallback("LevelDisplayed", function () {
    isLevelDisplayed = true;
});
Callback.addCallback("LevelLeft", function () {
    isLevelDisplayed = false;
});
var ItemName;
(function (ItemName) {
    /**@deprecated */
    function setRarity(id, rarity) {
        ItemRegistry.setRarity(id, rarity);
    }
    ItemName.setRarity = setRarity;
    /**@deprecated */
    function getRarity(id) {
        return ItemRegistry.getRarity(id);
    }
    ItemName.getRarity = getRarity;
    function addTooltip(id, tooltip) {
        Item.registerNameOverrideFunction(id, function (item, name) {
            return ItemRegistry.getItemRarityColor(item.id) + name + "\n§7" + tooltip;
        });
    }
    ItemName.addTooltip = addTooltip;
    function addTierTooltip(blockID, tier) {
        addTooltip(Block.getNumericId(blockID), getPowerTierText(tier));
    }
    ItemName.addTierTooltip = addTierTooltip;
    function addStorageBlockTooltip(blockID, tier, capacity) {
        Item.registerNameOverrideFunction(Block.getNumericId(blockID), function (item, name) {
            var color = ItemRegistry.getItemRarityColor(item.id);
            return color + name + "\n§7" + getBlockStorageText(item, tier, capacity);
        });
    }
    ItemName.addStorageBlockTooltip = addStorageBlockTooltip;
    function getBlockStorageText(item, tier, capacity) {
        var energy = item.extra ? item.extra.getInt("energy") : 0;
        return "".concat(getPowerTierText(tier), "\n").concat(displayEnergy(energy), "/").concat(capacity, " RF");
    }
    ItemName.getBlockStorageText = getBlockStorageText;
    function getPowerTierText(tier) {
        return Translation.translate("tooltip.power_tier").replace("%s", tier.toString());
    }
    ItemName.getPowerTierText = getPowerTierText;
    function getItemStorageText(item) {
        var energy = ChargeItemRegistry.getEnergyStored(item);
        var capacity = ChargeItemRegistry.getMaxCharge(item.id);
        return "".concat(displayEnergy(energy), "/").concat(displayEnergy(capacity), " RF");
    }
    ItemName.getItemStorageText = getItemStorageText;
    function displayEnergy(energy, debug) {
        if (debug === void 0) { debug = Game.isDeveloperMode; }
        if (!debug) {
            if (energy >= 1e9) {
                return Math.floor(energy / 1e8) / 10 + "B";
            }
            if (energy >= 1e6) {
                return Math.floor(energy / 1e5) / 10 + "M";
            }
            if (energy >= 1000) {
                return Math.floor(energy / 100) / 10 + "K";
            }
        }
        return energy.toString();
    }
    ItemName.displayEnergy = displayEnergy;
})(ItemName || (ItemName = {}));
var ObeliskCore;
(function (ObeliskCore) {
    function registerModel(id, texture) {
        texture = texture || id;
        var mesh = new RenderMesh();
        var model = new BlockRenderer.Model(mesh);
        var render = new ICRender.Model();
        mesh.importFromFile(__dir__ + "resources/assets/terrain-atlas/Base/obelisk/experience_obelisk.obj", "obj", null);
        mesh.setBlockTexture(texture, 0);
        render.addEntry(model);
        BlockRenderer.setStaticICRender(BlockID[id], -1, render);
        ItemModel.getFor(BlockID[id], -1).setModel(render);
    }
    ObeliskCore.registerModel = registerModel;
    // xp
    ObeliskCore.LIQUID_RATIO = 20;
    function setPlayerXp(player, xp) {
        var lv = XPtoLVL(xp).lvl;
        var cap = xp - LVLtoXP(lv);
        player.setLevel(lv);
        player.setExperience(cap);
    }
    ObeliskCore.setPlayerXp = setPlayerXp;
    function XPtoLVL(xp) {
        var currentLevel = 0;
        var remainingXP = xp;
        while (true) {
            var requiredForNextLevel = void 0;
            if (currentLevel <= 15) {
                requiredForNextLevel = (2 * currentLevel) + 7;
            }
            else if (currentLevel >= 16 && currentLevel <= 30) {
                requiredForNextLevel = (5 * currentLevel) - 38;
            }
            else {
                requiredForNextLevel = (9 * currentLevel) - 158;
            }
            if (remainingXP >= requiredForNextLevel) {
                remainingXP -= requiredForNextLevel;
                currentLevel++;
            }
            else
                break;
        }
        return { lvl: currentLevel, rem: remainingXP };
    }
    ObeliskCore.XPtoLVL = XPtoLVL;
    function LVLtoXP(lvl) {
        var requiredXP;
        if (lvl <= 16) {
            requiredXP = Math.pow(lvl, 2) + 6 * lvl;
        }
        else if (lvl >= 17 && lvl <= 31) {
            requiredXP = 2.5 * Math.pow(lvl, 2) - 40.5 * lvl + 360;
        }
        else {
            requiredXP = 4.5 * Math.pow(lvl, 2) - 162.5 * lvl + 2220;
        }
        return requiredXP;
    }
    ObeliskCore.LVLtoXP = LVLtoXP;
    function XPtoLiquid(xp) {
        if (xp)
            return xp * ObeliskCore.LIQUID_RATIO;
        else
            return 0;
    }
    ObeliskCore.XPtoLiquid = XPtoLiquid;
    function LiquidtoXP(liquid) {
        if (liquid)
            return liquid / ObeliskCore.LIQUID_RATIO;
        else
            return 0;
    }
    ObeliskCore.LiquidtoXP = LiquidtoXP;
    // weather
    function getTypeWeather(tank) {
        var liquid = tank.getLiquidStored();
        switch (liquid) {
            case "sunshine":
                return {
                    rain: 0,
                    thunder: 0
                };
                break;
            case "cloudSeed":
                return {
                    rain: 10,
                    thunder: 0
                };
                break;
            case 'cloudSeedConcentrated':
                return {
                    rain: 10,
                    thunder: 10
                };
                break;
            default:
                return null;
        }
        return null;
    }
    ObeliskCore.getTypeWeather = getTypeWeather;
})(ObeliskCore || (ObeliskCore = {}));
BlockRegistry.createBlockType("conduit", {
    destroyTime: 0.125,
    explosionResistance: 1,
    renderLayer: 1,
});
var blocksCheck = [
    { x: 0, y: -1, z: 0 },
    { x: 0, y: 1, z: 0 },
    { x: -1, y: 0, z: 0 },
    { x: 1, y: 0, z: 0 },
    { x: 0, y: 0, z: -1 },
    { x: 0, y: 0, z: 1 },
];
var ConduitRegistry;
(function (ConduitRegistry) {
    ConduitRegistry.ConduitWidth = 0.2; //0.1875//0.375
    function registerCable(nameID, maxVoltage) {
        var blockID = BlockID[nameID];
        RF.registerWire(blockID, maxVoltage);
        RF_type2.registerWire(blockID, maxVoltage);
        Item.registerNameOverrideFunction(blockID, function (item, name) {
            return name + "\n§7" + Translation.translate("enderio.power.max_output") + " " + maxVoltage + " RF/t";
        });
    }
    ConduitRegistry.registerCable = registerCable;
    function setupModel(id, width, groupConduit) {
        var render = new ICRender.Model();
        var shape = new ICRender.CollisionShape();
        BlockRenderer.setStaticICRender(id, 0, render);
        var boxes = [
            { side: [1, 0, 0], box: [0.5 + width / 2, 0.5 - width / 2, 0.5 - width / 2, 1 - 0.03, 0.5 + width / 2, 0.5 + width / 2] }, //0
            { side: [-1, 0, 0], box: [0 + 0.03, 0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2] }, //1
            { side: [0, 1, 0], box: [0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2, 1 - 0.03, 0.5 + width / 2] }, //2
            { side: [0, -1, 0], box: [0.5 - width / 2, 0 + 0.03, 0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2] }, //3
            { side: [0, 0, 1], box: [0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, 1 - 0.03] }, //4
            { side: [0, 0, -1], box: [0.5 - width / 2, 0.5 - width / 2, 0 + 0.03, 0.5 + width / 2, 0.5 + width / 2, 0.5 - width / 2] }, //5
        ];
        var group = ICRender.getGroup(groupConduit);
        group.add(id, -1);
        for (var _i = 0, boxes_1 = boxes; _i < boxes_1.length; _i++) {
            var box = boxes_1[_i];
            var model_1 = BlockRenderer.createModel();
            model_1.addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5], id, 0);
            model_1.addBox(0.5 - 0.3125 / 2, 0.5 - 0.3125 / 2, 0.5 - 0.3125 / 2, 0.5 + 0.3125 / 2, 0.5 + 0.3125 / 2, 0.5 + 0.3125 / 2, id, 0);
            render.addEntry(model_1).asCondition(box.side[0], box.side[1], box.side[2], group, 0);
        }
        // BlockRenderer.setCustomCollisionShape(id, 0, shape);
        var model = BlockRenderer.createModel();
        model.addBox(0.5 - 0.3125 / 2, 0.5 - 0.3125 / 2, 0.5 - 0.3125 / 2, 0.5 + 0.3125 / 2, 0.5 + 0.3125 / 2, 0.5 + 0.3125 / 2, id, 0);
        render.addEntry(model);
        width = Math.max(width, 0.5);
        Block.setBlockShape(id, { x: 0.5 - width / 2, y: 0.5 - width / 2, z: 0.5 - width / 2 }, { x: 0.5 + width / 2, y: 0.5 + width / 2, z: 0.5 + width / 2 });
    }
    ConduitRegistry.setupModel = setupModel;
})(ConduitRegistry || (ConduitRegistry = {}));
var EnderCore;
(function (EnderCore) {
    EnderCore.ender_io_block = [];
    EnderCore.ender_io_ingot = [];
    EnderCore.ender_io_nugget = [];
    function registerDust(types) {
        for (var i in types) {
            var name_types = types[i];
            var name = "item.item_material.powder_" + name_types.charAt(0).toLowerCase() + name_types.slice(1) + ".name";
            ItemRegistry.createItem("dust" + types[i], { name: name, icon: "dust" + types[i], stack: 64 });
        }
    }
    EnderCore.registerDust = registerDust;
    function createResourceItem(id, name) {
        name = name.toLowerCase();
        while (name.indexOf(" ") > 0) {
            name = name.replace(" ", "_");
        }
        var ingot_name = "item.item_alloy_ingot_" + name + ".name";
        var nugget_name = "item.item_alloy_nugget_" + name + ".name";
        var nug_id = id + "Nugget";
        ItemRegistry.createItem(id, { name: ingot_name, icon: id, stack: 64 });
        ItemRegistry.createItem(nug_id, { name: nugget_name, icon: nug_id, stack: 64 });
        Callback.addCallback("PreLoaded", function () {
            Recipes.addShaped({ id: ItemID[id], count: 1, data: 0 }, [
                "bbb",
                "bbb",
                "bbb"
            ], ['b', ItemID[nug_id], 0]);
            Recipes.addShapeless({ id: ItemID[nug_id], count: 9, data: 0 }, [{ id: ItemID[id], data: 0 }]);
        });
    }
    EnderCore.createResourceItem = createResourceItem;
    function createResourceBlock(id, name) {
        var block_id = "block" + id.charAt(0).toUpperCase() + id.substr(1);
        name = name.toLowerCase();
        while (name.indexOf(" ") > 0) {
            name = name.replace(" ", "_");
        }
        var block_name = "tile.block_alloy." + name + ".name";
        BlockRegistry.createBlock(block_id, [
            {
                name: block_name,
                texture: [[id + "Block", 0]],
                inCreative: true
            }
        ], "machine");
        Callback.addCallback("PreLoaded", function () {
            Recipes.addShaped({ id: BlockID[block_id], count: 1, data: 0 }, [
                "bbb",
                "bbb",
                "bbb"
            ], ['b', ItemID[id], 0]);
            Recipes.addShapeless({ id: ItemID[id], count: 9, data: 0 }, [{ id: BlockID[block_id], data: 0 }]);
        });
    }
    EnderCore.createResourceBlock = createResourceBlock;
    function addIngotRecipe(src, out) {
        if (ItemID[out] && typeof out == "string") {
            Recipes.addFurnace(src, ItemID[out], 0);
        }
        else if (typeof out == "number") {
            Recipes.addFurnace(src, out, 0);
        }
    }
    EnderCore.addIngotRecipe = addIngotRecipe;
})(EnderCore || (EnderCore = {}));
// from Avaritia
(function () {
    var _a;
    var _b, _c;
    var all_translation_keys = {};
    var readFile = function (name) {
        return FileTools.ReadText("".concat(__dir__, "/lang/").concat(name, ".lang"))
            .split("\n")
            .filter(function (element) { return element.length > 0 && !element.startsWith("#"); })
            .forEach(function (line) {
            var _a;
            var _b;
            var kv = line.split("=");
            (_a = all_translation_keys[_b = kv[0]]) !== null && _a !== void 0 ? _a : (all_translation_keys[_b] = {});
            all_translation_keys[kv[0]][name] = kv[1];
        });
    };
    FileTools.GetListOfFiles("".concat(__dir__, "/lang"), "lang")
        .forEach(function (file) { return readFile(new java.lang.String(file.getName()).replaceFirst("[.][^.]+$", "")); });
    for (var key in all_translation_keys) {
        (_a = (_b = all_translation_keys[key])[_c = Translation.getLanguage()]) !== null && _a !== void 0 ? _a : (_b[_c] = all_translation_keys[key].en);
        Translation.addTranslation(key, all_translation_keys[key]);
    }
})();
LiquidRegistry.registerLiquid("nutrientDistillation", "Nutrient Distillation", ["nutrientDistillation_fluid"]);
LiquidRegistry.registerLiquid("hootch", "Hootch", ["hootch_fluid"]);
LiquidRegistry.registerLiquid("rocketFuel", "Rocket fuel", ["rocketFuel_fluid"]);
LiquidRegistry.registerLiquid("fireWater", "Fire Water", ["fireWater_fluid"]);
// next update
// non-bucket
LiquidRegistry.registerLiquid("xpjuice", "XP Juice", ["xpjuice_fluid"]);
//
LiquidRegistry.registerLiquid("cloudSeed", "Cloud Seed", ["cloudSeed_fluid"]);
LiquidRegistry.registerLiquid("cloudSeedConcentrated", "Cloud Seed Concentrated", ["cloudSeedConcentrated_fluid"]);
LiquidRegistry.registerLiquid("enderDistillation", "Dew of the Void", ["enderDistillation_fluid"]);
LiquidRegistry.registerLiquid("sunshine", "Liquid Sunshine", ["sunshine_fluid"]);
LiquidRegistry.registerLiquid("vaporOfLevity", "Vapor Of Levity", ["vaporOfLevity_fluid"]);
var ItemLiquidBucket = /** @class */ (function (_super) {
    __extends(ItemLiquidBucket, _super);
    function ItemLiquidBucket(stringID, liquid) {
        var _this = this;
        var liquid_name = LiquidRegistry.getLiquidName(liquid);
        _this = _super.call(this, stringID, "".concat(liquid_name, " Bucket"), "bucket_".concat(liquid)) || this;
        LiquidItemRegistry.registerItem(liquid, 325, _this.id, 1000);
        return _this;
    }
    ItemLiquidBucket.prototype.onNameOverride = function (item, name) {
        return name + "\n§7" + (1000 - item.data) + " mB";
    };
    return ItemLiquidBucket;
}(ItemCommon));
ItemRegistry.registerItem(new ItemLiquidBucket("bucketHootch", "hootch"));
ItemRegistry.registerItem(new ItemLiquidBucket("bucketNutrientDistillation", "nutrientDistillation"));
ItemRegistry.registerItem(new ItemLiquidBucket("bucketFireWater", "fireWater"));
ItemRegistry.registerItem(new ItemLiquidBucket("bucketRocketFuel", "rocketFuel"));
ItemRegistry.registerItem(new ItemLiquidBucket("bucketVaporOfLevity", "vaporOfLevity"));
ItemRegistry.registerItem(new ItemLiquidBucket("bucketCloudSeed", "cloudSeed"));
ItemRegistry.registerItem(new ItemLiquidBucket("bucketSunshine", "sunshine"));
ItemRegistry.registerItem(new ItemLiquidBucket("bucketCloudSeedConcentrated", "cloudSeedConcentrated"));
ItemRegistry.registerItem(new ItemLiquidBucket("bucketEnderDistillation", "enderDistillation"));
EnderCore.registerDust(["Copper", "Wheat", "Iron", "Tin", "Coal", "Gold", "Ender", "Obsidian", "Sulfur"]);
EnderCore.createResourceItem("endSteel", "End Steel");
EnderCore.createResourceItem("darkSteel", "Dark Steel");
EnderCore.createResourceItem("conductiveIron", "Conductive Iron");
EnderCore.createResourceItem("pulsatingIron", "Pulsating Iron");
EnderCore.createResourceItem("soularium", "Soularium Alloy");
EnderCore.createResourceItem("electricalSteel", "Electrical Steel");
EnderCore.createResourceItem("energeticAlloy", "Energetic Alloy");
EnderCore.createResourceItem("redstoneAlloy", "Redstone Alloy");
ItemRegistry.createItem("pulsatingCrystal", { name: "item.item_material.pulsating_crystal.name", icon: "pulsatingCrystal", stack: 64 });
ItemRegistry.createItem("dustPulsating", { name: "item.item_material.pulsating_powder.name", icon: "pulsatingPowder", stack: 64 });
ItemRegistry.createItem("dustInfinity", { name: "item.item_material.powder_infinity.name", icon: "dustInfinity", stack: 64 });
// ModAPI.addAPICallback("KernelExtension", function (api: KEXAPI) {
//   if (typeof api.getKEXVersionCode === "function" && api.getKEXVersionCode() >= 300) {
//     KEX.ItemsModule.setFireResistant(ItemID.dustInfinity, true);
//   }
// });
ItemRegistry.createItem("binderComposite", { name: "item.item_material.binder_composite.name", icon: "binderComposite", stack: 64 });
ItemRegistry.createItem("conduitBinder", { name: "item.item_material.conduit_binder.name", icon: "conduitBinder", stack: 64 });
ItemRegistry.createItem("silicon", { name: "item.item_material.silicon.name", icon: "silicon", stack: 64 });
EnderCore.createResourceItem("vibrantAlloy", "Vibrant Alloy");
ItemRegistry.createItem("vibrantCrystal", { name: "item.item_material.vibrant_crystal.name", icon: "vibrantCrystal", stack: 64 });
ItemRegistry.createItem("dustVibrant", { name: "item.item_material.vibrant_powder.name", icon: "vibrantPowder", stack: 64 });
ItemRegistry.createItem("enderCrystal", { name: "item.item_material.ender_crystal.name", icon: "enderCrystal", stack: 64, glint: true });
ItemRegistry.createItem("dustEnderCrystal", { name: "item.item_material.ender_crystal_powder.name", icon: "enderCrystalPowder", stack: 64, glint: true });
ItemRegistry.createItem("weatherCrystal", { name: "item.item_material.weather_crystal.name", icon: "weatherCrystal", stack: 64, glint: true });
ItemRegistry.createItem("zombieSkull", { name: "Zombie Skull", icon: "zombieSkull", stack: 64 });
ItemRegistry.createItem("endermanSkull", { name: "Enderman Skull", icon: "endermanSkull", stack: 64 });
ItemRegistry.createItem("creeperSkull", { name: "Creeper Skull", icon: "creeperSkull", stack: 64 });
ItemRegistry.createItem("skeletonSkull", { name: "Skeleton Skull", icon: "skeletonSkull", stack: 64 });
Callback.addCallback("PreLoaded", function () {
    Recipes.addShapeless({ id: VanillaBlockID.skull, count: 1, data: 0 }, [{ id: ItemID.skeletonSkull, data: 0 }]);
    Recipes.addShapeless({ id: VanillaBlockID.skull, count: 1, data: 2 }, [{ id: ItemID.zombieSkull, data: 0 }]);
    Recipes.addShapeless({ id: VanillaBlockID.skull, count: 1, data: 4 }, [{ id: ItemID.creeperSkull, data: 0 }]);
    Recipes.addShapeless({ id: ItemID.skeletonSkull, count: 1, data: 0 }, [{ id: VanillaBlockID.skull, data: 0 }]);
    Recipes.addShapeless({ id: ItemID.zombieSkull, count: 1, data: 0 }, [{ id: VanillaBlockID.skull, data: 2 }]);
    Recipes.addShapeless({ id: ItemID.creeperSkull, count: 1, data: 0 }, [{ id: VanillaBlockID.skull, data: 4 }]);
    Recipes.addShaped({ id: ItemID.itemYetaWrench, count: 1, data: 0 }, [
        "e e",
        " a ",
        " e "
    ], ['a', ItemID.stoneGear, 0, 'e', ItemID.electricalSteel, 0]);
    Recipes.addShaped({ id: ItemID.weatherCrystal, count: 1, data: 0 }, [
        " a ",
        "beb",
        " a "
    ], ['a', ItemID.pulsatingCrystal, 0, 'e', ItemID.enderCrystal, 0, 'b', ItemID.vibrantCrystal, 0]);
    Recipes.addShaped({ id: ItemID.vibrantCrystal, count: 1, data: 0 }, [
        "aaa",
        "aea",
        "aaa"
    ], ['a', ItemID.vibrantAlloyNugget, 0, 'e', 388, 0]);
    Recipes.addShaped({ id: ItemID.pulsatingCrystal, count: 1, data: 0 }, [
        "aaa",
        "aea",
        "aaa"
    ], ['a', ItemID.pulsatingIronNugget, 0, 'e', VanillaItemID.diamond, 0]);
    Recipes.addShaped({ id: ItemID.basicCapacitor, count: 1, data: 0 }, [
        " rn",
        "rir",
        "nr "
    ], ['r', VanillaItemID.gold_nugget, 0, 'n', ItemID.dustInfinity, 0, 'i', VanillaItemID.redstone, 0]);
    Recipes.addShaped({ id: ItemID.doublelayerCapacitor, count: 1, data: 0 }, [
        " a ",
        "cpc",
        " a "
    ], ['a', ItemID.energeticAlloy, 0, 'c', ItemID.basicCapacitor, 0, 'p', ItemID.dustCoal, 0]);
    Recipes.addShaped({ id: ItemID.octadicCapacitor, count: 1, data: 0 }, [
        " a ",
        "cpc",
        " a "
    ], ['a', ItemID.vibrantAlloy, 0, 'c', ItemID.doublelayerCapacitor, 0, 'p', 89, 0]);
    Recipes.addShaped({ id: ItemID.binderComposite, count: 8, data: 0 }, [
        "csc",
        "scs",
        "csc"
    ], ['c', 337, 0, 's', 12, 0]);
    Recipes.addFurnace(ItemID.binderComposite, ItemID.conduitBinder, 0);
    EnderCore.addIngotRecipe(ItemID.dustCopper, "ingotCopper");
    EnderCore.addIngotRecipe(ItemID.dustTin, "ingotTin");
    EnderCore.addIngotRecipe(ItemID.dustIron, 265);
    EnderCore.addIngotRecipe(ItemID.dustGold, 266);
});
ItemRegistry.createItem("skullZombieController", { name: "item.item_material.skull_zombie_controller.name", icon: "skullZombieController", stack: 64 });
ItemRegistry.createItem("skullZombieElectrode", { name: "item.item_material.skull_zombie_electrode.name", icon: "skullZombieElectrode", stack: 64 });
Callback.addCallback("ItemUse", function (coords, item, block, isExternal, player) {
    var region = BlockSource.getDefaultForActor(player);
    if (region.getBlockId(coords.x, coords.y, coords.z) == VanillaBlockID.bedrock && item.id == VanillaItemID.flint_and_steel && coords.side == EBlockSide.UP) {
        if (Math.random() <= 0.5) {
            region.spawnDroppedItem(coords.x, coords.y + 1, coords.z, ItemID.dustInfinity, 1, 0);
        }
    }
});
var XpTransfer = /** @class */ (function (_super) {
    __extends(XpTransfer, _super);
    function XpTransfer() {
        var _this = _super.call(this, "itemXpTransfer", "item.item_xp_transfer.name", "item_xp_transfer") || this;
        _this.max_store = 10000; // xp
        _this.setMaxStack(1);
        return _this;
    }
    XpTransfer.prototype.onNameOverride = function (item, name) {
        var extra = item.extra;
        if (extra) {
            name += "\n\u00A77Xp stored: ".concat(extra.getInt("xp_stored"));
        }
        return name;
    };
    XpTransfer.prototype.onItemUse = function (coords, item, block, player) {
        var xp_stored = 0;
        var extra = item.extra || null;
        if (!extra) {
            extra = new ItemExtraData();
        }
        var tileEntity = WorldRegion.getForActor(player).getTileEntity(coords.x, coords.y, coords.z);
        if (tileEntity)
            return;
        if (!Entity.getSneaking(player)) { // add xp
            var playerActor = new PlayerActor(player);
            var player_xp = playerActor.getExperience();
            var old_xp = extra.getInt("xp_stored");
            var need_xp = this.max_store - old_xp;
            var xp = Math.min(Math.min(player_xp, this.max_store), need_xp);
            ObeliskCore.setPlayerXp(playerActor, player_xp - xp);
            extra.putInt("xp_stored", xp);
        }
        else { // take xp
            var playerActor = new PlayerActor(player);
            var player_xp = playerActor.getExperience();
            var xp = extra.getInt("xp_stored");
            if (!xp)
                return;
            ObeliskCore.setPlayerXp(playerActor, player_xp + xp);
            extra.putInt("xp_stored", 0);
        }
        Entity.setCarriedItem(player, item.id, item.count, item.data, extra);
    };
    return XpTransfer;
}(ItemCommon));
ItemRegistry.registerItem(new XpTransfer());
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: ItemID.itemXpTransfer, count: 1, data: 0 }, [
        "  e",
        " a ",
        "e"
    ], ['a', ItemID.energeticAlloy, 0, 'e', ItemID.soularium, 0]);
});
var EnderCore;
(function (EnderCore) {
    function createGearItem(id, name, type) {
        var res = "item_material_gear_" + type;
        ItemRegistry.createItem(id, { name: name, icon: res });
    }
    EnderCore.createGearItem = createGearItem;
})(EnderCore || (EnderCore = {}));
var GearName = {
    gear_energized: "Energized Bimetal Gear",
    gear_iron: "Infinity Bimetal Gear",
    gear_stone: "Stone Compound Gear",
    gear_vibrant: "Vibrant Bimetal Gear",
    gear_wood: "Wooden Gear",
    gear_darksteel: "Dark Bimetal Gear"
};
EnderCore.createGearItem("woodGear", GearName.gear_wood, "wood");
EnderCore.createGearItem("stoneGear", GearName.gear_stone, "stone");
EnderCore.createGearItem("ironGear", GearName.gear_iron, "iron");
EnderCore.createGearItem("darkSteelGear", GearName.gear_darksteel, "darksteel");
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: ItemID.darkSteelGear, count: 1, data: 0 }, [
        "bbb",
        "bab",
        "bbb"
    ], ['b', ItemID.darkSteelNugget, 0, 'a', ItemID.ironGear, 0]);
    // Iron
    Recipes.addShaped({ id: ItemID.ironGear, count: 1, data: 0 }, [
        "cbc",
        "bab",
        "cbc"
    ], ['b', VanillaItemID.iron_ingot, 0, 'a', ItemID.stoneGear, 0, 'c', VanillaItemID.iron_nugget, 0]);
    Recipes.addShaped({ id: ItemID.ironGear, count: 1, data: 0 }, [
        "cbc",
        "bab",
        "cbc"
    ], ['b', VanillaItemID.iron_ingot, 0, 'a', ItemID.dustInfinity, 0, 'c', VanillaItemID.iron_nugget, 0]);
    // Stone
    Recipes.addShaped({ id: ItemID.stoneGear, count: 1, data: 0 }, [
        " b ",
        "bab",
        " b "
    ], ['b', 4, 0, 'a', ItemID.woodGear, 0]);
    Recipes.addShaped({ id: ItemID.stoneGear, count: 1, data: 0 }, [
        "cbc",
        "b b",
        "cbc"
    ], ['b', 4, 0, 'c', VanillaItemID.stick, 0]);
    // Wooden
    Recipes.addShaped({ id: ItemID.woodGear, count: 1, data: 0 }, [
        " b ",
        "b b",
        " b "
    ], ['b', VanillaItemID.stick, 0]);
});
var EnderCore;
(function (EnderCore) {
    function createDyeItem(id, name, type) {
        var res = "item_material_organic_" + type + "_dye";
        ItemRegistry.createItem(id, { name: name, icon: res });
    }
    EnderCore.createDyeItem = createDyeItem;
    function createPowderItem(id, name, type) {
        var res = "item_material_powder_" + type;
        ItemRegistry.createItem(id, { name: name + " Powder", icon: res });
    }
    EnderCore.createPowderItem = createPowderItem;
    ;
})(EnderCore || (EnderCore = {}));
EnderCore.createPowderItem("dustLapis", "Lapis Lazuli", "lapis_lazuli");
EnderCore.createPowderItem("dustQuarzt", "Quartz", "quartz");
EnderCore.createDyeItem("greenDye", "Organic Green Dye", "green");
EnderCore.createDyeItem("blackDye", "Organic Black Dye", "black");
EnderCore.createDyeItem("brownDye", "Organic Brown Dye", "brown");
ItemRegistry.createItem("clipAndTrim", { name: "Clippings and Trimmings", icon: "item_material_plantgreen" });
ItemRegistry.createItem("twigAndPrun", { name: "Twigs and Prunings", icon: "item_material_plantbrown" });
ItemRegistry.createItem("machineDye", { name: "Industrial Dye Blend", icon: "item_material_machine_dye" });
ItemRegistry.createItem("soulMachineDye", { name: "Soul Attuned Powder Coating", icon: "item_material_soul_machine_dye" });
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: ItemID.soulMachineDye, count: 6, data: 0 }, [
        " pi",
        "pmp",
        "ip "
    ], ['i', ItemID.brownDye, 0, "m", ItemID.blackDye, 0, "p", ItemID.dustQuarzt, 0]);
    Recipes.addShaped({ id: ItemID.machineDye, count: 6, data: 0 }, [
        "fpi",
        "pmp",
        "ipf"
    ], ['i', ItemID.greenDye, 0, 'f', ItemID.dustLapis, 0, "m", ItemID.blackDye, 0, "p", ItemID.dustQuarzt, 0]);
    RecipeRegistry.addCrusher({
        isGrinding: true,
        ingredient: { id: VanillaTileID.tallgrass, data: 0 },
        result0: { id: ItemID.clipAndTrim, data: 0, chance: 0.6 },
        result1: { id: ItemID.clipAndTrim, data: 0, chance: 0.3 },
        result2: { id: ItemID.clipAndTrim, data: 0, chance: 0.1 },
        result3: { id: ItemID.twigAndPrun, data: 0, chance: 0.05 },
        energy: 1200,
        by: "EnderIO"
    });
    RecipeRegistry.addCrusher({
        isGrinding: true,
        ingredient: { id: VanillaTileID.tallgrass, data: 2 },
        result0: { id: ItemID.clipAndTrim, data: 0, chance: 0.6 },
        result1: { id: ItemID.clipAndTrim, data: 0, chance: 0.3 },
        result2: { id: ItemID.clipAndTrim, data: 0, chance: 0.1 },
        result3: { id: ItemID.twigAndPrun, data: 0, chance: 0.05 },
        energy: 1200,
        by: "EnderIO"
    });
    RecipeRegistry.addCrusher({
        isGrinding: true,
        ingredient: { id: VanillaTileID.double_plant, data: 0 },
        result0: { id: ItemID.clipAndTrim, data: 0, chance: 0.7 },
        result1: { id: ItemID.clipAndTrim, data: 0, chance: 0.3 },
        result2: { id: ItemID.clipAndTrim, data: 0, chance: 0.1 },
        result3: { id: ItemID.twigAndPrun, data: 0, chance: 0.05 },
        energy: 900,
        by: "EnderIO"
    });
    RecipeRegistry.addCrusher({
        isGrinding: true,
        ingredient: { id: VanillaTileID.double_plant, data: 3 },
        result0: { id: ItemID.clipAndTrim, data: 0, chance: 0.7 },
        result1: { id: ItemID.clipAndTrim, data: 0, chance: 0.3 },
        result2: { id: ItemID.clipAndTrim, data: 0, chance: 0.1 },
        result3: { id: ItemID.twigAndPrun, data: 0, chance: 0.05 },
        energy: 900,
        by: "EnderIO"
    });
    RecipeRegistry.addCrusher({
        isGrinding: true,
        ingredient: { id: 38, data: 0 },
        result0: { id: VanillaItemID.red_dye, data: 0, chance: 0.8 },
        result1: { id: VanillaItemID.red_dye, data: 0, chance: 0.6 },
        result2: { id: VanillaItemID.red_dye, data: 0, chance: 0.3 },
        result3: { id: ItemID.clipAndTrim, data: 0, chance: 0.1 },
        energy: 900,
        by: "EnderIO"
    });
    RecipeRegistry.addCrusher({
        isGrinding: true,
        ingredient: { id: 37, data: 0 },
        result0: { id: VanillaItemID.yellow_dye, data: 0, chance: 0.8 },
        result1: { id: VanillaItemID.yellow_dye, data: 0, chance: 0.6 },
        result2: { id: VanillaItemID.yellow_dye, data: 0, chance: 0.3 },
        result3: { id: ItemID.clipAndTrim, data: 0, chance: 0.1 },
        energy: 900,
        by: "EnderIO"
    });
    RecipeRegistry.addCrusher({
        isGrinding: true,
        ingredient: { id: 32, data: 0 },
        result0: { id: ItemID.twigAndPrun, data: 0, chance: 0.7 },
        result1: { id: ItemID.twigAndPrun, data: 0, chance: 0.3 },
        result2: { id: ItemID.twigAndPrun, data: 0, chance: 0.1 },
        result3: { id: 0, data: 0, chance: 0 },
        energy: 900,
        by: "EnderIO"
    });
    // Green
    SmelterRecipe.addRecipe({
        ingredient1: { id: VanillaItemID.green_dye, data: 0, count: 6 },
        ingredient2: { id: VanillaItemID.egg, data: 0, count: 1 },
        //ingredient3: { id: 0, data: 0, count: 0 },
        result: { id: ItemID.greenDye, count: 2, data: 0 },
        energy: 1500,
        by: "EnderIO"
    });
    SmelterRecipe.addRecipe({
        ingredient1: { id: VanillaItemID.green_dye, data: 0, count: 6 },
        ingredient2: { id: VanillaItemID.slime_ball, data: 0, count: 1 },
        //ingredient3: { id: 0, data: 0, count: 0 },
        result: { id: ItemID.greenDye, count: 2, data: 0 },
        energy: 2000,
        by: "EnderIO"
    });
    SmelterRecipe.addRecipe({
        ingredient1: { id: ItemID.clipAndTrim, data: 0, count: 12 },
        ingredient2: { id: VanillaItemID.slime_ball, data: 0, count: 1 },
        //ingredient3: { id: 0, data: 0, count: 0 },
        result: { id: ItemID.greenDye, count: 2, data: 0 },
        energy: 2000,
        by: "EnderIO"
    });
    SmelterRecipe.addRecipe({
        ingredient1: { id: ItemID.clipAndTrim, data: 0, count: 12 },
        ingredient2: { id: VanillaItemID.egg, data: 0, count: 1 },
        //ingredient3: { id: 0, data: 0, count: 0 },
        result: { id: ItemID.greenDye, count: 2, data: 0 },
        energy: 1500,
        by: "EnderIO"
    });
    // Brown
    SmelterRecipe.addRecipe({
        ingredient1: { id: VanillaItemID.brown_dye, data: 0, count: 6 },
        ingredient2: { id: VanillaItemID.slime_ball, data: 0, count: 1 },
        ingredient3: { id: 0, data: 0, count: 0 },
        result: { id: ItemID.brownDye, count: 2, data: 0 },
        energy: 2000,
        by: "EnderIO"
    });
    SmelterRecipe.addRecipe({
        ingredient1: { id: VanillaItemID.brown_dye, data: 0, count: 6 },
        ingredient2: { id: VanillaItemID.egg, data: 0, count: 1 },
        //ingredient3: { id: 0, data: 0, count: 0 },
        result: { id: ItemID.brownDye, count: 2, data: 0 },
        energy: 1500,
        by: "EnderIO"
    });
    SmelterRecipe.addRecipe({
        ingredient1: { id: ItemID.twigAndPrun, data: 0, count: 12 },
        ingredient2: { id: VanillaItemID.egg, data: 0, count: 1 },
        //ingredient3: { id: 0, data: 0, count: 0 },
        result: { id: ItemID.brownDye, count: 2, data: 0 },
        energy: 1500,
        by: "EnderIO"
    });
    SmelterRecipe.addRecipe({
        ingredient1: { id: ItemID.twigAndPrun, data: 0, count: 12 },
        ingredient2: { id: VanillaItemID.slime_ball, data: 0, count: 1 },
        ingredient3: { id: 0, data: 0, count: 0 },
        result: { id: ItemID.brownDye, count: 2, data: 0 },
        energy: 2000,
        by: "EnderIO"
    });
    SmelterRecipe.addRecipe({
        ingredient1: { id: ItemID.twigAndPrun, data: 0, count: 12 },
        ingredient2: { id: VanillaItemID.egg, data: 0, count: 1 },
        //ingredient3: { id: 0, data: 0, count: 0 },
        result: { id: ItemID.brownDye, count: 2, data: 0 },
        energy: 1500,
        by: "EnderIO"
    });
    // Black
    SmelterRecipe.addRecipe({
        ingredient1: { id: ItemID.dustCoal, data: 0, count: 6 },
        ingredient2: { id: VanillaItemID.slime_ball, data: 0, count: 1 },
        //ingredient3: { id: 0, data: 0, count: 0 },
        result: { id: ItemID.blackDye, count: 2, data: 0 },
        energy: 2000,
        by: "EnderIO"
    });
    SmelterRecipe.addRecipe({
        ingredient1: { id: ItemID.dustCoal, data: 0, count: 6 },
        ingredient2: { id: VanillaItemID.egg, data: 0, count: 1 },
        //ingredient3: { id: 0, data: 0, count: 0 },
        result: { id: ItemID.blackDye, count: 2, data: 0 },
        energy: 1500,
        by: "EnderIO"
    });
    SmelterRecipe.addRecipe({
        ingredient1: { id: VanillaItemID.black_dye, data: 0, count: 6 },
        ingredient2: { id: VanillaItemID.slime_ball, data: 0, count: 1 },
        //ingredient3: { id: 0, data: 0, count: 0 },
        result: { id: ItemID.blackDye, count: 2, data: 0 },
        energy: 2000,
        by: "EnderIO"
    });
    SmelterRecipe.addRecipe({
        ingredient1: { id: VanillaItemID.black_dye, data: 0, count: 6 },
        ingredient2: { id: VanillaItemID.egg, data: 0, count: 1 },
        //ingredient3: { id: 0, data: 0, count: 0 },
        result: { id: ItemID.blackDye, count: 2, data: 0 },
        energy: 1500,
        by: "EnderIO"
    });
    // chassis 
    SmelterRecipe.addRecipe({
        ingredient1: { id: BlockID.machineChassiSimple, data: 0, count: 1 },
        ingredient2: { id: ItemID.machineDye, data: 0, count: 1 },
        //ingredient3: { id: 0, data: 0, count: 0 },
        result: { id: BlockID.machineChassi, count: 1, data: 0 },
        energy: 250,
        by: "EnderIO"
    });
    SmelterRecipe.addRecipe({
        ingredient1: { id: BlockID.machineChassiSimple, data: 0, count: 1 },
        ingredient2: { id: ItemID.soulMachineDye, data: 0, count: 1 },
        //ingredient3: { id: 0, data: 0, count: 0 },
        result: { id: BlockID.machineChassiSoul, count: 1, data: 0 },
        energy: 250,
        by: "EnderIO"
    });
});
IDRegistry.genItemID("soulVesselEmpty");
Item.createItem("soulVesselEmpty", "Soul Vessel", { name: "itemSoulVessel" }, { stack: 1 });
IDRegistry.genItemID("soulVessel");
Item.createItem("soulVessel", "Soul Vessel ", { name: "itemSoulVesselFull" }, { stack: 1, isTech: false });
Item.setGlint(ItemID["soulVessel"], true);
//var InnerCore_pack = FileTools.ReadJSON(__packdir__ + 'manifest.json'); 
function createMobData(tag) {
    var isListTag = !tag.getAllKeys;
    var mobData = isListTag ? [] : {};
    var keys = !isListTag ? tag.getAllKeys() : false;
    var length_ = keys ? keys.length : tag.length();
    if (keys != null) {
        for (var _key = 0; _key < length_; _key++) {
            var key = keys ? keys[_key] : _key;
            var keyType = tag.getValueType(key);
            var _data = { type: keyType };
            switch (keyType) {
                case 1:
                    _data.value = Number(tag.getByte(key));
                    break;
                case 2:
                    _data.value = Number(tag.getShort(key));
                    break;
                case 3:
                    _data.value = Number(tag.getInt(key));
                    break;
                case 4:
                    _data.value = Number(tag.getInt64(key));
                    break;
                case 5:
                    _data.value = Number(tag.getFloat(key));
                    break;
                case 6:
                    _data.value = Number(tag.getDouble(key));
                    break;
                case 7:
                    _data.value = '';
                    break;
                case 8:
                    _data.value = tag.getString(key) + "";
                    break;
                case 9:
                    var listTag = tag.getListTag(key);
                    if (listTag != null) {
                        _data.value = createMobData(listTag);
                    }
                    else {
                        _data.value = [];
                    }
                    break;
                case 10:
                    var compoundTag = tag.getCompoundTag(key);
                    if (compoundTag != null) {
                        _data.value = createMobData(compoundTag);
                    }
                    else {
                        _data.value = {};
                    }
                    break;
                case 11:
                    _data.value = '';
                    break;
            }
            mobData[key] = _data;
        }
    }
    return mobData;
}
function createMobTag(tag_json) {
    var isListTag = Array.isArray(tag_json);
    var tag = isListTag ? new NBT.ListTag() : new NBT.CompoundTag();
    for (var key in tag_json) {
        if (isListTag)
            key = Number(key);
        var _data = tag_json[key];
        switch (_data.type) {
            case 1:
                tag.putByte(key, _data.value);
                break;
            case 2:
                tag.putShort(key, _data.value);
                break;
            case 3:
                tag.putInt(key, _data.value);
                break;
            case 4:
                tag.putInt64(key, _data.value);
                break;
            case 5:
                tag.putFloat(key, _data.value);
                break;
            case 6:
                tag.putDouble(key, _data.value);
                break;
            case 8:
                tag.putString(key, _data.value);
                break;
            case 9:
                var newTag = createMobTag(_data.value);
                tag.putListTag(key, newTag);
                break;
            case 10:
                var newTag = createMobTag(_data.value);
                tag.putCompoundTag(key, newTag);
                break;
        }
    }
    return tag;
}
;
var ignoreList = [63, 53, 52, 89, 91, 65, 84, 98, 100, 96, 69, 68, 70, 66, 85, 71, 87, 82, 64, 73, 86, 81, 94, 79, 72, 103, 80, 61, 95, 93, 83];
var playersArray = [];
Callback.addCallback('ServerPlayerLoaded', function (player__) {
    playersArray = Network.getConnectedPlayers();
});
Callback.addCallback("EntityHurt", function (attacker, victim, damage, damageType) {
    if (playersArray.indexOf(attacker) != -1 && damageType == 2 && victim && Entity.getCarriedItem(attacker).id == ItemID.soulVesselEmpty && (entityType = (Entity.getType(victim) || Entity.getTypeAddon(victim))) && ignoreList.indexOf(entityType) == -1) {
        if (InnerCore_pack.packVersionCode <= 125)
            return alert('Please Update Your Innecore Pack');
        var mobData = createMobData(Entity.getCompoundTag(victim)); // debug
        Debug.big(mobData);
        Entity.remove(victim);
        var extra = new ItemExtraData();
        if (mobData.identifier)
            extra.putString("name", mobData.identifier.value);
        extra.putString("entity", JSON.stringify(mobData));
        typeof entityType == 'number' ? extra.putInt('type', entityType) : extra.putString('type', entityType);
        runOnMainThread(function () {
            Entity.setCarriedItem(attacker, ItemID.soulVessel, 1, 0, extra);
        });
    }
});
Item.registerUseFunction("soulVessel", function (coords, item, block, player) {
    if (InnerCore_pack.packVersionCode <= 125)
        return alert('Please Update Your Innecore Pack');
    if (!item.extra)
        return;
    if (!(entityTag = createMobTag(JSON.parse(item.extra.getString("entity")))))
        return;
    var playerActor = new PlayerActor(player);
    var newCoords = {
        x: coords.relative.x + 0.5,
        y: coords.relative.y,
        z: coords.relative.z + 0.5
    };
    var blockSource = BlockSource.getDefaultForActor(player);
    var entityType = item.extra.getInt('type') || item.extra.getString('type');
    var newEntity = blockSource.spawnEntity(newCoords.x, newCoords.y, newCoords.z, entityType);
    entityTag.putInt64('UniqueID', newEntity);
    var posListTag = new NBT.ListTag();
    posListTag.putFloat(0, newCoords.x);
    posListTag.putFloat(1, newCoords.y);
    posListTag.putFloat(2, newCoords.z);
    entityTag.putListTag('Pos', posListTag);
    Entity.setCompoundTag(newEntity, entityTag);
    playerActor.setInventorySlot(playerActor.getSelectedSlot(), ItemID.soulVesselEmpty, 1, 0, null);
});
Item.registerNameOverrideFunction("soulVessel", function (item, name) {
    if (item.extra) {
        var mobName = item.extra.getString('name');
        name += "\n§7Mob: " + mobName;
        name += "\n§7Type: " + (item.extra.getInt('type') || item.extra.getString('type'));
    }
    return name;
});
var CapacitorModule = /** @class */ (function (_super) {
    __extends(CapacitorModule, _super);
    function CapacitorModule(stringID, name, type) {
        var _this = this;
        var texture = name.toLowerCase();
        while (texture.indexOf("_") > 0) {
            texture = texture.split("_").join("");
        }
        _this = _super.call(this, stringID, "".concat(name, " Capacitor"), "".concat(texture, "Capacitor")) || this;
        if (type)
            _this.type = type;
        CapacitorAPI.registerCapacitor(_this.id, _this);
        return _this;
    }
    return CapacitorModule;
}(ItemCommon));
var CapacitorCraft = /** @class */ (function (_super) {
    __extends(CapacitorCraft, _super);
    function CapacitorCraft(stringID, name, value) {
        var _this = _super.call(this, stringID, name, "capacitor") || this;
        _this.type = "capacitor";
        _this.bonus = value.bonus;
        _this.consume = value.consume;
        _this.storage = value.storage;
        _this.range = value.range;
        return _this;
    }
    /*
  
    */
    CapacitorCraft.prototype.getBonusGenerator = function (item) {
        return this.bonus;
    };
    CapacitorCraft.prototype.getEnergyConsumeMultiplier = function (item) {
        return this.consume;
    };
    CapacitorCraft.prototype.getExtraEnergyStorage = function (item) {
        return this.storage;
    };
    CapacitorCraft.prototype.getRange = function (item) {
        return this.range;
    };
    CapacitorCraft.prototype.onNameOverride = function (item, name) {
        return name + "§7\nGenerator Bonus: x" + this.getBonusGenerator() + "\nEnergy Consume Multiplier: x" + this.getEnergyConsumeMultiplier() + "\nExtra Energy Storage: +" + this.getExtraEnergyStorage() + "\nRange: +" + this.getRange();
    };
    return CapacitorCraft;
}(CapacitorModule));
ItemRegistry.registerItem(new CapacitorCraft("basicCapacitor", "Basic", {
    consume: 1,
    storage: 1,
    bonus: 1,
    range: 2
}));
ItemRegistry.registerItem(new CapacitorCraft("doublelayerCapacitor", "Double-layer", {
    consume: 3,
    storage: 3,
    bonus: 1.5,
    range: 6
}));
ItemRegistry.registerItem(new CapacitorCraft("octadicCapacitor", "Octadic", {
    consume: 5,
    storage: 5,
    bonus: 2,
    range: 10
}));
var ItemElectric = /** @class */ (function (_super) {
    __extends(ItemElectric, _super);
    function ItemElectric(stringID, name, maxCharge, transferLimit, tier, inCreative) {
        var _this = _super.call(this, stringID, name, name, false) || this;
        _this.energy = "Rf";
        _this.canProvideEnergy = false;
        _this.setMaxStack(1);
        _this.setCategory(ItemCategory.EQUIPMENT);
        _this.maxCharge = maxCharge;
        _this.transferLimit = transferLimit;
        _this.tier = tier || 1;
        ChargeItemRegistry.registerItem(_this.id, _this, inCreative);
        return _this;
    }
    ItemElectric.prototype.onNameOverride = function (item, name) {
        //return `${name}\n§7${ItemName.getPowerTierText(this.tier)}\n${ItemName.getItemStorageText(item)}`;
        return "".concat(name, "\n").concat(ItemName.getItemStorageText(item));
    };
    return ItemElectric;
}(ItemCommon));
var ToolWrench = /** @class */ (function (_super) {
    __extends(ToolWrench, _super);
    function ToolWrench(stringID, name, icon) {
        var _this = _super.call(this, stringID, name, icon) || this;
        _this.setMaxStack(1);
        _this.setMaxDamage(161);
        _this.setCategory(ItemCategory.EQUIPMENT);
        EnderTool.registerWrench(_this.id, _this);
        return _this;
    }
    ToolWrench.prototype.isUseable = function (item, damage) {
        return true;
    };
    ToolWrench.prototype.useItem = function (item, damage, player) {
        //item.applyDamage(damage);
        Entity.setCarriedItem(player, item.id, 1, item.data, item.extra);
        if (item.id == 0) {
            var region = WorldRegion.getForActor(player);
            region.playSoundAtEntity(player, "random.break");
        }
    };
    return ToolWrench;
}(ItemCommon));
ItemRegistry.registerItem(new ToolWrench("itemYetaWrench", "Yeta Wrench", "itemYetaWrench"));
//Pickaxe
//enchantType: Native.EnchantType.pickaxe,
/*
ToolType.darkPick = {

   isWeapon: false,
   damage: 2,
   baseDamage: 4,
   enchantability: 14,
   blockTypes: ["stone", "dirt"],
   onDestroy: function(item) {
      let energyStored = ChargeItemRegistry.getEnergyStored(item);
      if (energyStored >= 80) {
         if (Block.getDestroyTime(block.id) > 0) {
            ChargeItemRegistry.setEnergyStored(item, energyStored - 80);
         }
         return true;
      } else {
         return false;
      }
   },

   onAttack: function(item, mob) {
      let energyStored = ChargeItemRegistry.getEnergyStored(item);
      if (energyStored >= 80) {
         if (Block.getDestroyTime(block.id) > 0) {
            ChargeItemRegistry.setEnergyStored(item, energyStored - 80);
            return true;
         }
      } else {
         return false;
      }
   },

   onBroke: function(item) {
      return true;
   },
   calcDestroyTime: function(item, coords, block, params, destroyTime, enchant) {
      let energyStored = ChargeItemRegistry.getEnergyStored(item);
      if (energyStored >= 80) {
         if (block.id == 49) {
            return 1
         }
         let material = ToolAPI.getBlockMaterial(block.id) || {};
         material = material.name;
         if (material == "stone") {
            return destroyTime * 5
         }
      }
      return params.base / 5
   }
};
*/
ItemRegistry.addToolMaterial("darkSteel", {
    durability: 765,
    level: 4,
    efficiency: 8,
    damage: 5,
    enchantability: 15,
    repairMaterial: ItemID.darkSteel
});
ItemRegistry.createTool("pickaxeDarkSteel", { name: "dark_steel_pickaxe", icon: "darkSteel_pickaxe", material: "darkSteel" }, ToolType.PICKAXE);
ItemRegistry.createTool("swordDarkSteel", { name: "The Ender", icon: "darkSteel_sword", material: "darkSteel" }, ToolType.SWORD);
Item.registerNameOverrideFunction(ItemID.pickaxeDarkSteel, function (item, name) {
    return name + "\n" + "§7You can empower this\nwith Vibrant Crystal in Dark Anvil";
});
Item.registerNameOverrideFunction(ItemID.swordDarkSteel, function (item, name) {
    return name + "\n" + "§7Increased skull and ender pearl drops";
});
Callback.addCallback("PlayerAttack", function (attacker, victim) {
    var playerEntity = new PlayerEntity(attacker);
    var c = Entity.getPosition(victim);
    var item = playerEntity.getCarriedItem();
    var region = BlockSource.getDefaultForActor(attacker);
    if (item.id == ItemID.swordDarkSteel) {
        if (Entity.getType(victim) == 32 && Math.random() <= 0.4) {
            region.spawnDroppedItem(c.x + .5, c.y + .5, c.z + .5, ItemID.zombieSkull, 1, 0);
        }
        if (Entity.getType(victim) == 33 && Math.random() <= 0.4) {
            region.spawnDroppedItem(c.x + .5, c.y + .5, c.z + .5, ItemID.creeperSkull, 1, 0);
        }
        if (Entity.getType(victim) == 34 && Math.random() <= 0.4) {
            region.spawnDroppedItem(c.x + .5, c.y + .5, c.z + .5, ItemID.skeletonSkull, 1, 0);
        }
        if (Entity.getType(victim) == 38 && Math.random() <= 0.8) {
            region.spawnDroppedItem(c.x + .5, c.y + .5, c.z + .5, ItemID.endermanSkull, 1, 0);
            region.spawnDroppedItem(c.x + .5, c.y + .5, c.z + .5, 368, 1 + Math.floor(Math.random() * 3), 0);
        }
        if (Entity.getType(victim) == 48 && Math.random() <= 0.6) {
            region.spawnDroppedItem(c.x + .5, c.y + .5, c.z + .5, 397, 1, 1);
        }
    }
});
//empowered
IDRegistry.genItemID("pickaxeDarkSteelEmpowered1");
Item.createItem("pickaxeDarkSteelEmpowered1", "Dark Pick", { name: "darkSteel_pickaxe" }, { isTech: true, stack: 1 }); /*
ToolAPI.setTool(ItemID.pickaxeDarkSteelEmpowered1, "darkSteel", ToolType.darkPick);

ChargeItemRegistry.registerItem(ItemID.pickaxeDarkSteelEmpowered1, "Rf", 100000, 100, 2, true, true);

Item.registerNameOverrideFunction(ItemID.pickaxeDarkSteelEmpowered1, function(item, name) {
   return name + "\n" + "§7Empowered: Breaks obisdian faster.\n§a Explosive: §cNot Empowered \n  " + ItemName.getItemStorageText(item)
});
*/
//THE ENDER
EnderCore.createResourceBlock("conductiveIron", "Conductive Iron");
EnderCore.createResourceBlock("darkSteel", "Dark Steel");
EnderCore.createResourceBlock("electricalSteel", "Electrical Steel");
EnderCore.createResourceBlock("soularium", "Soularium Alloy");
EnderCore.createResourceBlock("redstoneAlloy", "Redstone Alloy");
EnderCore.createResourceBlock("endSteel", "End Steel");
EnderCore.createResourceBlock("energeticAlloy", "Energetic Alloy");
EnderCore.createResourceBlock("pulsatingIron", "Pulsating Iron");
var GLASS_TYPE_ANTI_EXPLO = Block.createSpecialType({
    destroytime: 1,
    explosionres: 3600000.8,
    sound: "glass"
});
IDRegistry.genBlockID("fusedGlass");
Block.createBlock("fusedGlass", [
    {
        name: "Quite Clear Glass",
        texture: [
            ["fusedGlass", 0]
        ],
        inCreative: true
    }
], GLASS_TYPE_ANTI_EXPLO);
ConnectedTexture.setModelForGlass(BlockID.fusedGlass, -1, "fusedGlass");
IDRegistry.genBlockID("fusedQuartz");
Block.createBlock("fusedQuartz", [
    {
        name: "Fused Quartz",
        texture: [
            ["fusedQuartzItem", 0]
        ],
        inCreative: true
    }
], GLASS_TYPE_ANTI_EXPLO);
ConnectedTexture.setModelForGlass(BlockID.fusedQuartz, -1, "fusedQuartzItem");
Item.addCreativeGroup("glass_modded", Translation.translate("Glass"), [
    BlockID.fusedGlass,
    BlockID.fusedQuartz
]);
Callback.addCallback("PreLoaded", function () {
    SmelterRecipe.addRecipe({
        ingredient1: { id: 12, data: 0, count: 1 },
        ingredient2: { id: 12, data: 0, count: 1 },
        ingredient3: { id: 12, data: 0, count: 1 },
        result: { id: BlockID.fusedGlass, count: 3, data: 0 },
        energy: 5000
    });
    SmelterRecipe.addRecipe({
        ingredient1: { id: 406, data: 0, count: 1 },
        ingredient2: { id: 406, data: 0, count: 1 },
        ingredient3: { id: 406, data: 0, count: 1 },
        result: { id: BlockID.fusedQuartz, count: 3, data: 0 },
        energy: 5000
    });
});
var ChassisBlock = /** @class */ (function (_super) {
    __extends(ChassisBlock, _super);
    function ChassisBlock(id, name, texture, miningLevel) {
        if (miningLevel === void 0) { miningLevel = 1; }
        var _this = _super.call(this, id, "other-machine") || this;
        _this.addVariation(name, texture, true);
        _this.setBlockMaterial("stone", miningLevel);
        _this.setDestroyTime(3);
        return _this;
    }
    return ChassisBlock;
}(BlockBase));
BlockRegistry.registerBlock(new ChassisBlock("machineChassi", "Industrial Machine Chassis", [["machineChassi", 0]]));
BlockRegistry.registerBlock(new ChassisBlock("machineChassiSimple", "Simple Machine Chassis", [["machineChassiSimple", 0]]));
BlockRegistry.registerBlock(new ChassisBlock("machineChassiSoul", "Soul Machine Chassis", [["machineChassiSoul", 0]]));
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: BlockID.machineChassiSimple, count: 1, data: 0 }, [
        "aba",
        "bcb",
        "aba"
    ], ['a', VanillaBlockID.iron_bars, 0, 'b', VanillaItemID.iron_ingot, 0, 'c', ItemID.dustInfinity, 0]);
});
ModAPI.addAPICallback("ICore", function (api) {
    Callback.addCallback("PreLoaded", function () {
        Recipes.addShaped({ id: BlockID.machineChassiSimple, count: 1, data: 0 }, [
            "aba",
            "bcb",
            "aba"
        ], ['a', VanillaBlockID.iron_bars, 0, 'b', ItemID.ingotCopper, 0, 'c', ItemID.dustInfinity, 0]);
    });
});
// BlockRegistry.createBlockType("BLOCK_TYPE_ANVIL", {
//   destroyTime: 20,
//   explosionResistance: 999999999,
//   baseBlock: 7,
//   sound: "anvil"
// });
// BlockRegistry.createBlock("darkSteelAnvil", [
//   { name: "Dark Stell Anvil", texture: [["darkSteelBlock", 0]], inCreative: true },
// ], "BLOCK_TYPE_ANVIL");
// function setDarkAnvilRender(id, tex) {
//   let anvilRender = new ICRender.Model();
//   BlockRenderer.setStaticICRender(id, 0, anvilRender);
//   let model = BlockRenderer.createModel();
//   model.addBox(2 / 16, 0 / 16, 1 / 16, 14 / 16, 4 / 16, 15 / 16, tex, 0);
//   model.addBox(4 / 16, 4 / 16, 2 / 16, 12 / 16, 5 / 16, 14 / 16, tex, 0);
//   model.addBox(7 / 16, 5 / 16, 3 / 16, 10 / 16, 10 / 16, 13 / 16, tex, 0);
//   model.addBox(3 / 16, 10 / 16, 0 / 16, 13 / 16, 16 / 16, 16 / 16, tex, 0);
//   anvilRender.addEntry(model);
// }
// setDarkAnvilRender(BlockID.darkSteelAnvil, "darkSteelBlock");
// let darkAnvilGUI = MachineRegistry.createInventoryWindow("Dark Anvil", {
//   drawing: [
//     { type: "bitmap", x: 500, y: 180, bitmap: "anvil_plus", scale: 3.2 },
//     { type: "bitmap", x: 700, y: 180, bitmap: "bar_progress1", scale: 3.2 }
// 	],
//   elements: {
//     "slotItem": { type: "slot", x: 400, y: 180 },
//     "slotSecond": { type: "slot", x: 600, y: 180 },
//     "slotOutput": { type: "slot", x: 800, y: 180 },
//   }
// });
// namespace Anvil {
//   export let repairValues = {};
//   export let toolMaterials = {};
//   export let recipes = {};
//   export function addRepairItem(id, data, value, material) {
//     repairValues[id + ":" + data] = { value: value, material: material }
//   }
//   export function getRepairValue(id, data) {
//     return repairValues[id + ":" + data]
//   }
//   export function registerToolMaterial(id, material) {
//     toolMaterials[id] = material
//   }
//   export function getToolMaterial(id) {
//     return toolMaterials[id]
//   }
//   export function addRecipe(input: string, item: number, result: number, data) {
//     let new_input = Item.getNumericId(input);
//     recipes[new_input] = { item: item, result: result, data: data }
//   }
//   export function getRecipe(id) {
//     return recipes[id]
//   }
// };
// Anvil.addRepairItem(280, 0, 5, "wood");
// Anvil.addRepairItem(264, 0, 80, "diamond");
// Anvil.addRepairItem(265, 0, 70, "iron");
// Anvil.addRepairItem(266, 0, 30, "gold");
// Anvil.addRepairItem(ItemID.darkSteel, 0, 200, "dark_steel");
// Anvil.addRecipe("pickaxeDarkSteel", ItemID.vibrantCrystal, ItemID.pickaxeDarkSteelEmpowered1, Item.getMaxDamage(ItemID.pickaxeDarkSteelEmpowered) - 1);
// let woodenTools = [268, 269, 270, 271, 290];
// for (let i in woodenTools) {
//   Anvil.registerToolMaterial(woodenTools[i], "wood");
// }
// let stoneTools = [272, 273, 274, 275, 291];
// for (let i in stoneTools) {
//   Anvil.registerToolMaterial(stoneTools[i], "stone");
// }
// let ironTools = [256, 257, 258, 267, 292];
// for (let i in ironTools) {
//   Anvil.registerToolMaterial(ironTools[i], "iron");
// }
// let goldenTools = [283, 284, 285, 286, 294];
// for (let i in goldenTools) {
//   Anvil.registerToolMaterial(goldenTools[i], "gold");
// }
// let diamondTools = [276, 277, 278, 279, 293];
// for (let i in diamondTools) {
//   Anvil.registerToolMaterial(diamondTools[i], "diamond");
// }
// namespace Machine {
//   export class DarkSteelAnvil extends MachineBase {
//     canTake = false
//     getScreenByName(): UI.IWindow {
//       return darkAnvilGUI;
//     }
//     onTick(): void {
//       let slotItem = this.container.getSlot("slotItem");
//       let slotSecond = this.container.getSlot("slotSecond");
//       let slotOutput = this.container.getSlot("slotOutput");
//       let toolMaterial = Anvil.getToolMaterial(slotItem.id);
//       let repair = Anvil.getRepairValue(slotSecond.id, slotSecond.data);
//       // repair...
//       if (toolMaterial && repair && slotOutput.id == 0 && slotItem.count > 0 && slotItem.data + repair.value <= Item.getMaxDamage(slotItem.id) && toolMaterial == repair.material && !this.canTake) {
//         slotOutput.id = slotItem.id
//         slotOutput.count = 1;
//         slotOutput.data = slotItem.data - repair.value
//         this.canTake = true;
//       } else {
//         slotOutput.id = 0;
//         slotOutput.count = 0;
//         slotOutput.data = 0;
//         this.container.validateAll();
//       }
//       if (toolMaterial && repair && slotOutput.count == 0 && this.canTake) {
//         slotItem.id = 0;
//         slotSecond.count--;
//         this.container.validateAll();
//         this.canTake = false;
//       }
//       // recipe
//       let recipe = Anvil.getRecipe(slotItem)
//       if (recipe) {
//         if (slotSecond.id == recipe.item && slotOutput.id == 0 && !this.canTake) {
//           this.canTake = true
//           slotOutput.id = recipe.id
//           slotOutput.count = 1
//           slotOutput.data = recipe.data
//         }
//         if (World.getThreadTime() % 2 == 0 && (slotOutput.id != recipe.id || slotOutput.id == 0) && this.canTake) {
//           slotItem.id = 0;
//           slotSecond.count--;
//           this.container.validateAll();
//           this.canTake = false;
//         }
//       } else {
//         slotOutput.id = 0;
//         slotOutput.count = 0;
//         slotOutput.data = 0;
//         this.container.validateAll();
//       }
//       //
//       if (slotOutput.data < 0) {
//         slotOutput.data = 0
//       }
//     }
//     destroyBlock(coords, player): void {
//       let region = BlockSource.getDefaultForActor(player)
//       this.container.clearSlot("slotOutput");
//       region.spawnDroppedItem(coords.x + .5, coords.y + .5, coords.z + .5, BlockID.darkSteelAnvil, 1, 0);
//     }
//   }
//   MachineRegistry.registerPrototype(BlockID.darkSteelAnvil, new DarkSteelAnvil());
// }
BlockRegistry.createBlock("energyConduit", [
    { name: "enderio.item_power_conduit.name", texture: [["powerConduitCore", 0]], inCreative: true }
], "conduit");
BlockRegistry.createBlock("energyConduitAdv", [
    { name: "enderio.item_power_conduit_enhanced.name", texture: [["powerConduitCoreEnhanced", 0]], inCreative: true }
], "conduit");
BlockRegistry.createBlock("energyConduitEnd", [
    { name: "enderio.item_power_conduit_ender.name", texture: [["powerConduitCoreEnder", 0]], inCreative: true }
], "conduit");
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: BlockID.energyConduit, count: 8, data: 0 }, [
        "bbb",
        "ccc",
        "bbb"
    ], ['b', ItemID.conduitBinder, 0, 'c', ItemID.conductiveIron, 0]);
    Recipes.addShaped({ id: BlockID.energyConduitAdv, count: 8, data: 0 }, [
        "bbb",
        "ccc",
        "bbb"
    ], ['b', ItemID.conduitBinder, 0, 'c', ItemID.energeticAlloy, 0]);
    Recipes.addShaped({ id: BlockID.energyConduitEnd, count: 8, data: 0 }, [
        "bbb",
        "ccc",
        "bbb"
    ], ['b', ItemID.conduitBinder, 0, 'c', ItemID.vibrantAlloy, 0]);
});
ConduitRegistry.registerCable("energyConduit", 1280);
ConduitRegistry.setupModel(BlockID.energyConduit, ConduitRegistry.ConduitWidth, "rf-wire");
ConduitRegistry.registerCable("energyConduitAdv", 5120);
ConduitRegistry.setupModel(BlockID.energyConduitAdv, ConduitRegistry.ConduitWidth, "rf-wire");
ConduitRegistry.registerCable("energyConduitEnd", 20480);
ConduitRegistry.setupModel(BlockID.energyConduitEnd, ConduitRegistry.ConduitWidth, "rf-wire");
IDRegistry.genBlockID("fluidConduit");
Block.createBlock("fluidConduit", [
    { name: "Fluid Conduit", texture: [["liquidConduitCore", 0]], inCreative: true }
]);
IDRegistry.genBlockID("fluidConduitEx");
Block.createBlock("fluidConduitEx", [
    { name: "Fluid Conduit Extractor", texture: [["liquidConduitExtract", 0]], inCreative: false }
]);
IDRegistry.genBlockID("fluidConduitIn");
Block.createBlock("fluidConduitIn", [
    { name: "Fluid Conduit Input", texture: [["liquidConduitInput", 0]], inCreative: false }
]);
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: BlockID.fluidConduit, count: 8, data: 0 }, [
        "bbb",
        "ccc",
        "bbb"
    ], ['b', ItemID.conduitBinder, 0, 'c', BlockID.fusedGlass, 0]);
});
Callback.addCallback("ItemUse", function (coords, item, block, isExternal, player) {
    if (item.id == ItemID.itemYetaWrench && block.id == BlockID.fluidConduit && Entity.getSneaking(player)) {
        var region = BlockSource.getDefaultForActor(player);
        region.setBlock(coords.x, coords.y, coords.z, BlockID.fluidConduitEx, 0);
    }
});
Callback.addCallback("ItemUse", function (coords, item, block, isExternal, player) {
    if (item.id == ItemID.itemYetaWrench && block.id == BlockID.fluidConduitEx && Entity.getSneaking(player)) {
        var region = BlockSource.getDefaultForActor(player);
        region.setBlock(coords.x, coords.y, coords.z, BlockID.fluidConduitIn, 0);
    }
});
Callback.addCallback("ItemUse", function (coords, item, block, isExternal, player) {
    if (item.id == ItemID.itemYetaWrench && block.id == BlockID.fluidConduitIn && Entity.getSneaking(player)) {
        var region = BlockSource.getDefaultForActor(player);
        region.setBlock(coords.x, coords.y, coords.z, BlockID.fluidConduit, 0);
    }
});
Block.registerDropFunction("fluidConduitEx", function (blockCoords, blockID, blockData, diggingLevel, enchant, item, region) {
    return [[BlockID.fluidConduit, 1, 0]];
});
Block.registerDropFunction("fluidConduitEx", function (blockCoords, blockID, blockData, diggingLevel, enchant, item, region) {
    return [[BlockID.fluidConduit, 1, 0]];
});
// global group 
/*for (let i in BlockID) {
   var tile = TileEntity.getPrototype(BlockID[i]);
   if (tile && BlockID[i] != BlockId.fluidConduit && tile.liquidStorage ) {
      
   }

}
ICRender.getGroup("liquid_pipe").add(BlockID.fluidConduitEx, -1);
ICRender.getGroup("liquid_pipe").add(BlockID.fluidConduitIn, -1);
*/
// only conduit
/*
ICRender.getGroup("eio_liquid_conduit").add(BlockID.fluidConduit, -1);
ICRender.getGroup("eio_liquid_conduit").add(BlockID.fluidConduitEx, -1);
ICRender.getGroup("eio_liquid_conduit").add(BlockID.fluidConduitIn, -1);
*/
ConduitRegistry.setupModel(BlockID.fluidConduit, ConduitRegistry.ConduitWidth, "liquid_pipe");
ConduitRegistry.setupModel(BlockID.fluidConduitEx, ConduitRegistry.ConduitWidth, "liquid_pipe");
ConduitRegistry.setupModel(BlockID.fluidConduitIn, ConduitRegistry.ConduitWidth, "liquid_pipe");
TileEntity.registerPrototype(BlockID.fluidConduit, {
    defaultValues: {
        check: false
    }, useNetworkItemContainer: true,
    tick: function () {
        if (World.getThreadTime() % 6 == 0)
            this.data.check = false;
    },
    click: function (id, count, data, coords, player) {
        if (!Entity.getSneaking(player) && id == ItemID.itemYetaWrench) {
            this.blockSource.spawnDroppedItem(this.x + .5, this.y + .5, this.z + .5, BlockID.fluidConduit, 1, 0);
            this.blockSource.destroyBlock(this.x, this.y, this.z, false);
        }
    }
});
MachineRegistry.registerPrototype(BlockID.fluidConduitIn, {
    defaultValues: {
        isActive: true
    },
    useNetworkItemContainer: true,
    onClick: function (item, coords, player) {
        if (!Entity.getSneaking(player) && item.id == ItemID.itemYetaWrench) {
            this.blockSource.spawnDroppedItem(this.x + .5, this.y + .5, this.z + .5, BlockID.fluidConduit, 1, 0);
            this.blockSource.destroyBlock(this.x, this.y, this.z, false);
        }
    }
});
MachineRegistry.registerPrototype(BlockID.fluidConduitEx, {
    defaultValues: {
        isActive: true
    },
    useNetworkItemContainer: true,
    getBlocks: function (x, y, z, arr) {
        for (var i in blocksCheck) {
            var pos = blocksCheck[i];
            var block = this.blockSource.getBlock(x + pos.x, y + pos.y, z + pos.z);
            if (block.id == BlockID.fluidConduit) {
                var tile = TileEntity.getTileEntity(x + pos.x, y + pos.y, z + pos.z, this.blockSource);
                if (tile && !tile.data.check) {
                    tile.data.check = true;
                    this.getBlocks(x + pos.x, y + pos.y, z + pos.z, arr);
                }
            }
            else if (block.id == BlockID.fluidConduitIn) {
                arr.push({ x: x + pos.x, y: y + pos.y, z: z + pos.z });
            }
        }
        return arr;
    },
    input: function (tile, output, pos) {
        var block = TileEntity.getTileEntity(pos.x, pos.y, pos.z, this.blockSource);
        for (var w in blocksCheck) {
            var ip = blocksCheck[w];
            if (block.data.active || block.data.isActive) {
                var input = TileEntity.getTileEntity(pos.x + ip.x, pos.y + ip.y, pos.z + ip.z, this.blockSource);
                if (input) {
                    try {
                        var liquids = Object.keys(tile.liquidStorage.liquidAmounts);
                        for (var i in liquids)
                            if (output.canTransportLiquid(liquids[i], 0))
                                StorageInterface.transportLiquid(liquids[i], 50, output, StorageInterface.getLiquidStorage(this.blockSource, pos.x + ip.x, pos.y + ip.y, pos.z + ip.z), 0);
                    }
                    catch (e) {
                        StorageInterface.extractLiquid(null, 50, StorageInterface.getLiquidStorage(this.blockSource, pos.x + ip.x, pos.y + ip.y, pos.z + ip.z), output, 0);
                    }
                }
            }
        }
    },
    pump: function () {
        var blocks = this.getBlocks(this.x, this.y, this.z, []);
        for (var q in blocksCheck) {
            var op = blocksCheck[q];
            var tile = TileEntity.getTileEntity(this.x + op.x, this.y + op.y, this.z + op.z, this.blockSource);
            if (tile) {
                var output = StorageInterface.getLiquidStorage(this.blockSource, this.x + op.x, this.y + op.y, this.z + op.z);
                for (var a in blocks)
                    this.input(tile, output, blocks[a]);
            }
        }
    },
    onClick: function (item, coords, player) {
        if (!Entity.getSneaking(player) && item.id == ItemID.itemYetaWrench) {
            this.blockSource.spawnDroppedItem(this.x + .5, this.y + .5, this.z + .5, BlockID.fluidConduit, 1, 0);
            this.blockSource.destroyBlock(this.x, this.y, this.z, false);
        }
    },
    onTick: function () {
        try {
            if (World.getThreadTime() % 20 == 0) {
                this.pump();
            }
        }
        catch (e) {
            Game.message(e);
        }
    }
});
BlockRegistry.createBlock("experience_obelisk", [
    {
        name: "tile.block_experience_obelisk.name",
        texture: [["experience_obelisk", 0]],
        inCreative: true
    }
], "other-machine");
Block.setShape(BlockID.experience_obelisk, 1 / 16, 0, 1 / 16, 15 / 16, 0.5, 15 / 16);
Block.setDestroyTime(BlockID.experience_obelisk, 5);
ToolAPI.registerBlockMaterial(BlockID.experience_obelisk, "stone");
ObeliskCore.registerModel("experience_obelisk", "experience_obelisk");
Block.registerPlaceFunction("experience_obelisk", function (coords, item, block, _player, blockSource) {
    var region = new WorldRegion(blockSource);
    var place = World.canTileBeReplaced(block.id, block.data) ? coords : coords.relative;
    var rotation = TileRenderer.getBlockRotation(_player, false);
    region.setBlock(place, item.id, rotation);
    var tile = region.addTileEntity(place);
    if (item.extra) {
        var name_fluid = item.extra.getString("fluid");
        var amount_fluid = item.extra.getInt("amount");
        if (amount_fluid > 0) {
            tile.liquidStorage.addLiquid(name_fluid, amount_fluid);
        }
    }
});
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: BlockID.experience_obelisk, count: 1, data: 0 }, [
        " e ",
        " a ",
        "aba"
    ], ['a', ItemID.soularium, 0, 'e', ItemID.itemXpTransfer, 0, 'b', BlockID.machineChassiSoul, 0] // function (api: Recipes.WorkbenchFieldAPI, field: com.zhekasmirnov.innercore.api.mod.ui.container.Slot[], result: ItemInstance) {
    //   let xp = new ItemExtraData();
    //   for (let i = 0; i < field.length; i++) {
    //     if (field[i].id == ItemID.itemXpTransfer && field[i].extra) {
    //       if (field[i].extra.getInt("xp_stored") > 0) {
    //         xp.putString("fluid", "xpjuice")
    //         xp.putInt("amount", this.liquidTank.getAmount(field[i].extra.getInt("xp_stored")))
    //       }
    //       api.decreaseFieldSlot(i);
    //     }
    //   }
    //   result.extra = xp;
    //}
    );
});
var ExperienceObelisk_elements = {};
function ExpObeliskUICreate() {
    var ExperienceObeliskButtonSettings = {
        x1: 375, //525
        x2: 625, //775
        y: 110 / 575.5 * UI.getScreenHeight(),
        scale: 3,
        padding: 5
    };
    ExperienceObeliskButtonSettings.x1 -= ExperienceObeliskButtonSettings.scale * 20;
    ExperienceObelisk_elements["text"] = {
        type: "text",
        x: 1000 / 2,
        y: ExperienceObeliskButtonSettings.y + 20 * ExperienceObeliskButtonSettings.scale + 20 * ExperienceObeliskButtonSettings.scale / 2,
        z: 10,
        text: "0",
        font: {
            color: android.graphics.Color.rgb(127, 255, 0),
            shadow: 0.5,
            size: 30
        }
    };
    ExperienceObelisk_elements["text"].y -= ExperienceObelisk_elements["text"].font.size / 2;
    ExperienceObelisk_elements["playerxp"] = {
        type: "text",
        x: 1000 / 2,
        y: 0,
        z: 10,
        text: "0",
        font: {
            color: android.graphics.Color.rgb(127, 255, 0),
            shadow: 0.5,
            size: 20
        }
    };
    ExperienceObelisk_elements["playerxp"].y = UI.getScreenHeight() - ExperienceObelisk_elements["playerxp"].font.size - 20 - 80;
    ExperienceObelisk_elements["xpall"] = {
        type: "button",
        x: ExperienceObeliskButtonSettings.x1,
        y: ExperienceObeliskButtonSettings.y,
        bitmap: "RS_empty_button",
        bitmap2: "RS_empty_button_pressed",
        scale: ExperienceObeliskButtonSettings.scale,
        clicker: {
            onClick: function (itemContainerUiHandler, container, element) {
                container.sendEvent("xpall", {});
            }
        }
    };
    ExperienceObelisk_elements["xp-all"] = {
        type: "button",
        x: ExperienceObeliskButtonSettings.x2,
        y: ExperienceObeliskButtonSettings.y,
        bitmap: "RS_empty_button",
        bitmap2: "RS_empty_button_pressed",
        scale: ExperienceObeliskButtonSettings.scale,
        clicker: {
            onClick: function (itemContainerUiHandler, container, element) {
                container.sendEvent("xp-all", {});
            }
        }
    };
    ExperienceObelisk_elements["xp10"] = {
        type: "button",
        x: ExperienceObeliskButtonSettings.x1,
        y: ExperienceObelisk_elements["xpall"].y + ExperienceObelisk_elements["xpall"].scale * 20 + ExperienceObeliskButtonSettings.padding,
        bitmap: "RS_empty_button",
        bitmap2: "RS_empty_button_pressed",
        scale: ExperienceObeliskButtonSettings.scale,
        clicker: {
            onClick: function (itemContainerUiHandler, container, element) {
                container.sendEvent("xp10", {});
            }
        }
    };
    ExperienceObelisk_elements["xp-10"] = {
        type: "button",
        x: ExperienceObeliskButtonSettings.x2,
        y: ExperienceObelisk_elements["xp-all"].y + ExperienceObelisk_elements["xp-all"].scale * 20 + ExperienceObeliskButtonSettings.padding,
        bitmap: "RS_empty_button",
        bitmap2: "RS_empty_button_pressed",
        scale: ExperienceObeliskButtonSettings.scale,
        clicker: {
            onClick: function (itemContainerUiHandler, container, element) {
                container.sendEvent("xp-10", {});
            }
        }
    };
    ExperienceObelisk_elements["xp1"] = {
        type: "button",
        x: ExperienceObeliskButtonSettings.x1,
        y: ExperienceObelisk_elements["xp10"].y + ExperienceObelisk_elements["xp10"].scale * 20 + ExperienceObeliskButtonSettings.padding,
        bitmap: "RS_empty_button",
        bitmap2: "RS_empty_button_pressed",
        scale: ExperienceObeliskButtonSettings.scale,
        clicker: {
            onClick: function (itemContainerUiHandler, container, element) {
                container.sendEvent("xp1", {});
            }
        }
    };
    ExperienceObelisk_elements["xp-1"] = {
        type: "button",
        x: ExperienceObeliskButtonSettings.x2,
        y: ExperienceObelisk_elements["xp-10"].y + ExperienceObelisk_elements["xp-10"].scale * 20 + ExperienceObeliskButtonSettings.padding,
        bitmap: "RS_empty_button",
        bitmap2: "RS_empty_button_pressed",
        scale: ExperienceObeliskButtonSettings.scale,
        clicker: {
            onClick: function (itemContainerUiHandler, container, element) {
                container.sendEvent("xp-1", {});
            }
        }
    };
    ExperienceObelisk_elements["xp_bar"] = {
        type: "scale",
        x: (1000 - 185 * 3.5) / 2,
        y: ExperienceObelisk_elements["xp1"].y + ExperienceObelisk_elements["xp1"].scale * 20 + 30,
        direction: 0,
        bitmap: "xp_scale_full",
        background: "xp_scale",
        value: 0,
        scale: 3.5,
    };
    var xp_storage_map = ["all", "10", "1", "-all", "-10", "-1"];
    for (var i = 0; i < 6; i++) {
        ExperienceObelisk_elements["xp" + xp_storage_map[i] + "_image"] = {
            type: "image",
            x: ExperienceObelisk_elements["xp" + xp_storage_map[i]].x,
            y: ExperienceObelisk_elements["xp" + xp_storage_map[i]].y,
            z: 10,
            bitmap: "ExperienceObelisk" + xp_storage_map[i],
            scale: ExperienceObelisk_elements["xp" + xp_storage_map[i]].scale,
        };
    }
}
ExpObeliskUICreate();
var guiEObelisk = new UI.StandardWindow({
    standard: {
        header: {
            text: {
                text: Translation.translate("tile.block_experience_obelisk.name")
            }
        },
        background: {
            standard: true
        }
    },
    drawing: [],
    elements: ExperienceObelisk_elements
});
var Machine;
(function (Machine) {
    var XP_Obelisk = /** @class */ (function (_super) {
        __extends(XP_Obelisk, _super);
        function XP_Obelisk() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultValues = {};
            _this.containerEvents = {
                "xp-1": function (eventData, connectedClient) {
                    if (!this.liquidTank.getAmount("xpjuice"))
                        return;
                    var player = new PlayerActor(connectedClient.getPlayerUid());
                    var player_lvl = player.getLevel();
                    var player_xp = player.getExperience();
                    var xp = Math.min(ObeliskCore.LiquidtoXP(this.liquidTank.getAmount("xpjuice")), ObeliskCore.LVLtoXP(player_lvl + 1) - player_xp);
                    ObeliskCore.setPlayerXp(player, player_xp + xp);
                    this.liquidTank.getLiquid("xpjuice", ObeliskCore.XPtoLiquid(xp));
                },
                "xp1": function (eventData, connectedClient) {
                    var player = new PlayerActor(connectedClient.getPlayerUid());
                    var player_lvl = player.getLevel();
                    if (player_lvl == 0)
                        return;
                    var player_xp = player.getExperience();
                    var xp = player_xp - ObeliskCore.LVLtoXP(player_lvl - 1);
                    ObeliskCore.setPlayerXp(player, player_xp - xp);
                    this.liquidTank.addLiquid("xpjuice", ObeliskCore.XPtoLiquid(xp));
                },
                "xp-10": function (eventData, connectedClient) {
                    if (!this.liquidTank.getAmount("xpjuice"))
                        return;
                    var player = new PlayerActor(connectedClient.getPlayerUid());
                    var player_lvl = player.getLevel();
                    var player_xp = player.getExperience();
                    var xp = Math.min(ObeliskCore.LiquidtoXP(this.liquidTank.getAmount("xpjuice")), ObeliskCore.LVLtoXP(player_lvl + 10) - player_xp);
                    ObeliskCore.setPlayerXp(player, player_xp + xp);
                    this.liquidTank.getLiquid("xpjuice", ObeliskCore.XPtoLiquid(xp));
                },
                "xp10": function (eventData, connectedClient) {
                    var player = new PlayerActor(connectedClient.getPlayerUid());
                    var player_lvl = player.getLevel();
                    if (player_lvl == 0)
                        return;
                    var player_xp = player.getExperience();
                    var xp = player_xp - ObeliskCore.LVLtoXP(player_lvl - 10);
                    ObeliskCore.setPlayerXp(player, player_xp - xp);
                    this.liquidTank.addLiquid("xpjuice", ObeliskCore.XPtoLiquid(xp));
                },
                "xpall": function (eventData, connectedClient) {
                    var player = new PlayerActor(connectedClient.getPlayerUid());
                    this.liquidTank.addLiquid("xpjuice", ObeliskCore.XPtoLiquid(player.getExperience()));
                    player.setLevel(0);
                    player.setExperience(0);
                },
                "xp-all": function (eventData, connectedClient) {
                    var player = new PlayerActor(connectedClient.getPlayerUid());
                    player.addExperience(ObeliskCore.LiquidtoXP(this.liquidTank.getAmount("xpjuice")));
                    this.liquidTank.getLiquid("xpjuice", this.liquidTank.getAmount("xpjuice"));
                }
            };
            return _this;
        }
        XP_Obelisk.prototype.getScreenByName = function () {
            return guiEObelisk;
        };
        XP_Obelisk.prototype.setupContainer = function () {
            this.liquidTank = this.addLiquidTank("fluid", 2000000000, ["xpjuice"]);
        };
        XP_Obelisk.prototype.clientLoad = function () {
            this.anim = new Animation.Item(this.x + 0.5, this.y + 1, this.z + 0.5);
            this.anim.setSkylightMode();
            this.anim.describeItem({ id: Network.serverToLocalId(ItemID.itemXpTransfer), count: 1, data: 0 });
            this.anim.loadCustom(function () {
                var transform = this.transform();
                transform && transform.rotate(0, Math.PI / 60, 0);
            });
        };
        XP_Obelisk.prototype.clientUnload = function () {
            this.anim && this.anim.destroy();
        };
        XP_Obelisk.prototype.onItemUse = function (coords, item, player) {
            if (item.id == ItemID.itemXpTransfer) {
                this.preventClick();
                var playerActor = new PlayerActor(player);
                playerActor.addExperience(ObeliskCore.LiquidtoXP(this.liquidTank.getAmount("xpjuice")));
                this.liquidTank.getLiquid("xpjuice", this.liquidTank.getAmount("xpjuice"));
                return true;
            }
            else if (item.id == ItemID.itemXpTransfer && Entity.getSneaking(player)) {
                this.preventClick();
                var playerActor = new PlayerActor(player);
                this.liquidTank.addLiquid("xpjuice", ObeliskCore.XPtoLiquid(playerActor.getExperience()));
                playerActor.setLevel(0);
                playerActor.setExperience(0);
                return true;
            }
            return _super.prototype.onItemUse.call(this, coords, item, player);
        };
        XP_Obelisk.prototype.onTick = function () {
            var xp_data = ObeliskCore.XPtoLVL(ObeliskCore.LiquidtoXP(this.liquidTank.getAmount("xpjuice")));
            this.container.setText("text", "" + xp_data.lvl);
            var next_xp = ObeliskCore.LVLtoXP(xp_data.lvl + 1);
            var this_xp = ObeliskCore.LVLtoXP(xp_data.lvl);
            var other_xp_data = {
                xp: Math.max(ObeliskCore.LiquidtoXP(this.liquidTank.getAmount("xpjuice")) - this_xp, 0),
                next_xp: Math.max(next_xp - this_xp, 0)
            };
            this.container.setScale("xp_bar", other_xp_data.xp / other_xp_data.next_xp || 0);
            this.container.sendChanges();
            var startCoords = { x: this.x + 0.5, y: this.y + 0.5, z: this.z + 0.5 };
            var ents = Entity.getAllInRange(startCoords, 10, 69);
            for (var i in ents) {
                var ent = ents[i];
                if (!ent)
                    continue;
                var tag = Entity.getCompoundTag(ent);
                var exp_value = tag.getInt("experience value");
                if (exp_value > 0) {
                    this.liquidTank.addLiquid("xpjuice", ObeliskCore.XPtoLiquid(exp_value));
                }
                Entity.remove(ent);
            }
        };
        XP_Obelisk.prototype.destroyBlock = function (coords, player) {
            var extra = null;
            var region = BlockSource.getDefaultForActor(player);
            var liquid = this.liquidTank.getLiquidStored();
            if (liquid == "xpjuice") {
                extra = new ItemExtraData();
                extra.putString("fluid", liquid);
                extra.putInt("amount", this.liquidTank.getAmount(liquid));
            }
            region.spawnDroppedItem(coords.x + .5, coords.y + .5, coords.z + .5, BlockID.experience_obelisk, 1, 0, extra);
        };
        return XP_Obelisk;
    }(Machine.MachineBase));
    Machine.XP_Obelisk = XP_Obelisk;
    MachineRegistry.registerPrototype(BlockID.experience_obelisk, new XP_Obelisk());
    MachineRegistry.setTankPlaceFunction("experience_obelisk");
    StorageInterface.createInterface(BlockID.experience_obelisk, {
        canReceiveLiquid: function () { return true; },
        canTransportLiquid: function () { return true; },
    });
})(Machine || (Machine = {}));
BlockRegistry.createBlock("weather_obelisk", [
    {
        name: "tile.block_weather_obelisk.name",
        texture: [["weather_obelisk", 0]],
        inCreative: true
    }
], "other-machine");
Block.setShape(BlockID.weather_obelisk, 1 / 16, 0, 1 / 16, 15 / 16, 0.5, 15 / 16);
Block.setDestroyTime(BlockID.weather_obelisk, 5);
ToolAPI.registerBlockMaterial(BlockID.weather_obelisk, "stone");
ObeliskCore.registerModel("weather_obelisk", "experience_obelisk");
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: BlockID.weather_obelisk, count: 1, data: 0 }, [
        " e ",
        "cac",
        "aba"
    ], ['a', ItemID.soularium, 0, 'e', ItemID.weatherCrystal, 0, 'b', BlockID.bankBasic, 0, 'c', ItemID.energeticAlloy, 0,] // function (api: Recipes.WorkbenchFieldAPI, field: com.zhekasmirnov.innercore.api.mod.ui.container.Slot[], result: ItemInstance) {
    //   let xp = new ItemExtraData();
    //   for (let i = 0; i < field.length; i++) {
    //     if (field[i].id == ItemID.itemXpTransfer && field[i].extra) {
    //       if (field[i].extra.getInt("xp_stored") > 0) {
    //         xp.putString("fluid", "xpjuice")
    //         xp.putInt("amount", this.liquidTank.getAmount(field[i].extra.getInt("xp_stored")))
    //       }
    //       api.decreaseFieldSlot(i);
    //     }
    //   }
    //   result.extra = xp;
    //}
    );
});
var weatherObeliskGUI = MachineRegistry.createInventoryWindow(Translation.translate("tile.block_weather_obelisk.name"), {
    drawing: [
        { type: "bitmap", x: 360, y: 140, bitmap: "redflux_bar0", scale: 3.2 },
        { type: "bitmap", x: 630, y: 230, bitmap: "bar_progress_down0", scale: 3.2 }
    ],
    elements: {
        "energyScale": { type: "scale", x: 360, y: 140, direction: 1, bitmap: "redflux_bar1", scale: 3.2 },
        "progressScale": { type: "scale", x: 630, y: 230, bitmap: "bar_progress_down1", direction: 3, scale: 3.2 },
        "slot0": { type: "slot", x: 510, y: 140 },
        "slot1": { type: "slot", x: 510, y: 290 },
        "slotInput1": { type: "slot", x: 630, y: 140 },
        "setWeather": {
            type: "button",
            x: 630,
            y: 330,
            scale: 3.0,
            bitmap: "RS_empty_button",
            bitmap2: "RS_empty_button_pressed",
            clicker: {
                onClick: function (_, container) {
                    container.sendEvent("activeObelisk", {});
                }
            }
        },
        "liquidScale": {
            type: "scale",
            x: 430,
            y: 140,
            direction: 1,
            bitmap: "tankOverlay",
            overlay: "tankOverlay",
            scale: 3.2,
            value: 1
        },
    }
});
var Machine;
(function (Machine) {
    var WeatherObelisk = /** @class */ (function (_super) {
        __extends(WeatherObelisk, _super);
        function WeatherObelisk() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultValues = {
                energy: 0,
                progress: 0,
                activeObelisk: false
            };
            return _this;
        }
        WeatherObelisk.prototype.setupContainer = function () {
            this.liquidTank = this.addLiquidTank("fluid", 6000, ["sunshine", "cloudSeedConcentrated", "cloudSeed"]);
        };
        WeatherObelisk.prototype.getScreenByName = function () {
            return weatherObeliskGUI;
        };
        WeatherObelisk.prototype.clientLoad = function () {
            this.anim = new Animation.Item(this.x + 0.5, this.y + 1, this.z + 0.5);
            this.anim.setSkylightMode();
            this.anim.describeItem({ id: Network.serverToLocalId(VanillaItemID.firework_rocket), count: 1, data: 0 });
            this.anim.loadCustom(function () {
                var transform = this.transform();
                transform && transform.rotate(0, Math.PI / 60, 0);
            });
        };
        WeatherObelisk.prototype.clientUnload = function () {
            this.anim && this.anim.destroy();
        };
        WeatherObelisk.prototype.getTier = function () {
            return 2;
        };
        WeatherObelisk.prototype.onTick = function () {
            var newActive = false;
            var slot0 = this.container.getSlot("slot0");
            var slot1 = this.container.getSlot("slot1");
            var input1 = this.container.getSlot("slotInput1");
            if (this.data.activeObelisk) {
                var weather_type = ObeliskCore.getTypeWeather(this.liquidTank);
                if (input1.id == VanillaItemID.firework_rocket && input1.count >= 1 && (input1.data == 0 || input1.data == -1) && !!weather_type && this.liquidTank.getAmount() >= 1000) {
                    if (this.data.energy >= 50) {
                        newActive = true;
                        this.data.progress += 50;
                        this.data.energy -= 50;
                    }
                    if (this.data.progress >= 5000) {
                        input1.count--;
                        input1.markDirty();
                        World.setWeather(weather_type);
                        this.liquidTank.getLiquid(1000);
                        this.container.validateAll();
                        this.data.progress = 0;
                        this.data.activeObelisk = false;
                    }
                }
            }
            this.setActive(newActive);
            this.liquidTank.getLiquidFromItem(slot0, slot1);
            this.container.setScale("energyScale", this.getRelativeEnergy());
            this.container.setScale("progressScale", this.data.progress / 5000 || 0);
            this.liquidTank.updateUiScale("liquidScale");
            this.container.sendChanges();
        };
        WeatherObelisk.prototype.getEnergyStorage = function () {
            return 100000;
        };
        WeatherObelisk.prototype.getRelativeEnergy = function () {
            return this.data.energy / this.getEnergyStorage();
        };
        WeatherObelisk.prototype.destroyBlock = function (coords, player) {
            var extra = null;
            var region = BlockSource.getDefaultForActor(player);
            var liquid = this.liquidTank.getLiquidStored();
            if (liquid) {
                extra = new ItemExtraData();
                extra.putString("fluid", liquid);
                extra.putInt("amount", this.liquidTank.getAmount(liquid));
            }
            region.spawnDroppedItem(coords.x + .5, coords.y + .5, coords.z + .5, BlockID.experience_obelisk, 1, 0, extra);
        };
        WeatherObelisk.prototype.energyReceive = function (type, amount, voltage) {
            if (voltage > 55) {
                amount = Math.min(amount, 55);
            }
            var add = Math.min(amount, this.getEnergyStorage() - this.data.energy);
            this.data.energy += add;
            return add;
        };
        WeatherObelisk.prototype.activeObelisk = function () {
            this.data.activeObelisk = this.data.activeObelisk ? false : true;
        };
        __decorate([
            Machine.ContainerEvent(Side.Server)
        ], WeatherObelisk.prototype, "activeObelisk", null);
        return WeatherObelisk;
    }(Machine.ProgressingMachine));
    Machine.WeatherObelisk = WeatherObelisk;
    MachineRegistry.registerPrototype(BlockID.weather_obelisk, new WeatherObelisk());
    MachineRegistry.setTankPlaceFunction("weather_obelisk");
    StorageInterface.createInterface(BlockID.weather_obelisk, {
        canReceiveLiquid: function () { return true; },
        canTransportLiquid: function () { return true; },
    });
})(Machine || (Machine = {}));
ItemRegistry.createItem("platePhotovoltaic", {
    name: "item.item_material.plate_photovoltaic.name",
    icon: "item_material_plate_photovoltaic"
});
ItemRegistry.createItem("dustPhotovoltaic", {
    name: "item.item_material.powder_photovoltaic.name",
    icon: "item_material_powder_photovoltaic"
});
var BlockPhotovoltaic = /** @class */ (function (_super) {
    __extends(BlockPhotovoltaic, _super);
    function BlockPhotovoltaic(id, name, texture, miningLevel) {
        var _this = this;
        miningLevel = miningLevel || 1;
        _this = _super.call(this, id, "other-machine") || this;
        _this.addVariation(name, texture, true);
        _this.setBlockMaterial("stone", miningLevel);
        _this.setDestroyTime(3);
        _this.setShape(0, 0, 0, 1, 0.2, 1, -1);
        Item.registerNameOverrideFunction(Block.getNumericId(id), function (item, translation, name) {
            return name + "\n" + Translation.translate("tile.block_solar_panel.tooltip.common.line1") + "\n" + Translation.translate("tile.block_solar_panel.tooltip.detailed.line1") + "\n" + Translation.translate("tile.block_solar_panel.tooltip.detailed.line2");
        });
        return _this;
    }
    return BlockPhotovoltaic;
}(BlockBase));
BlockRegistry.registerBlock(new BlockPhotovoltaic("photovoltaicCell", "tile.block_solar_panel.name", [["solarPanelSide", 0], ["solarPanelTop", 0], ["solarPanelSide", 0]]));
BlockRegistry.registerBlock(new BlockPhotovoltaic("advancedPhotovoltaicCell", "tile.block_solar_panel.advanced.name", [["solarPanelAdvancedSide", 0], ["solarPanelAdvancedTop", 0], ["solarPanelAdvancedSide", 0]]));
BlockRegistry.registerBlock(new BlockPhotovoltaic("vibrantPhotovoltaicCell", "tile.block_solar_panel.vibrant.name", [["solarPanelVibrantSide", 0], ["solarPanelVibrantTop", 0], ["solarPanelVibrantSide", 0]]));
Item.addCreativeGroup("photovoltaicCeil", Translation.translate("tile.block_solar_panel.name"), [
    BlockID.photovoltaicCell,
    BlockID.advancedPhotovoltaicCell,
    BlockID.vibrantPhotovoltaicCell
]);
Callback.addCallback("PreLoaded", function () {
    if (!EnderConfig.oldMode) {
        Recipes.addShaped({ id: BlockID.advancedPhotovoltaicCell, count: 1, data: 0 }, ["aga",
            "sbs",
            "epe"], ['e', ItemID.basicCapacitor, 0, 'a', ItemID.pulsatingIron, 0, 's', ItemID.energeticAlloy, 0, 'p', BlockID.photovoltaicCell, 0, 'g', BlockID.fusedQuartz, 0, 'b', ItemID.dustCoal, 0]);
        Recipes.addShaped({ id: BlockID.photovoltaicCell, count: 1, data: 0 }, ["aga",
            "ppp",
            "ese"], ['e', ItemID.basicCapacitor, 0, 'a', ItemID.energeticAlloy, 0, 's', 151, 0, 'p', ItemID.platePhotovoltaic, 0, 'g', BlockID.fusedQuartz, 0]);
        Recipes.addShaped({ id: BlockID.photovoltaicCell, count: 1, data: 0 }, ["aga",
            " p ",
            "ese"], ['e', ItemID.basicCapacitor, 0, 'a', ItemID.energeticAlloy, 0, 's', 151, 0, 'p', BlockID.simplePhotovoltaicCell, 0, 'g', BlockID.fusedQuartz, 0]);
        Recipes.addShaped({ id: ItemID.dustPhotovoltaic, count: 1, data: 0 }, ["   ",
            "sgp",
            "   "], ['s', ItemID.silicon, 0, 'p', ItemID.dustLapis, 0, 'g', ItemID.dustCoal, 0]);
        SmelterRecipe.addRecipe({
            ingredient1: { id: ItemID.dustPhotovoltaic, data: 0, count: 2 },
            //ingredient2: { id: 0, data: 0 },
            //ingredient3: { id: 0, data: 0, count: 0 },
            result: { id: ItemID.platePhotovoltaic, count: 6, data: 0 },
            energy: 15000
        });
    }
    else {
        Recipes.addShaped({ id: BlockID.photovoltaicCell, count: 1, data: 0 }, ["aga",
            "pgp",
            "ese"], ['e', ItemID.electricalSteel, 0, 'a', ItemID.energeticAlloy, 0, 's', 151, 0, 'p', ItemID.silicon, 0, 'g', BlockID.fusedQuartz, 0]);
        Recipes.addShaped({ id: BlockID.advancedPhotovoltaicCell, count: 1, data: 0 }, ["aga",
            "pgp",
            "ese"], ['e', ItemID.pulsatingIron, 0, 'a', ItemID.vibrantAlloy, 0, 's', 151, 0, 'p', ItemID.vibrantCrystal, 0, 'g', BlockID.fusedQuartz, 0]);
    }
});
var Machine;
(function (Machine) {
    var PhotovoltaicCell = /** @class */ (function (_super) {
        __extends(PhotovoltaicCell, _super);
        function PhotovoltaicCell() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultValues = {
                energy: 0,
                canSeeSky: false
            };
            return _this;
        }
        PhotovoltaicCell.prototype.getScreenByName = function () {
            return null;
        };
        PhotovoltaicCell.prototype.onInit = function () {
            this.data.canSeeSky = this.region.canSeeSky(this.x, this.y + 1, this.z);
        };
        PhotovoltaicCell.prototype.onTick = function () {
            var energyStorage = this.getEnergyStorage();
            this.data.energy = Math.min(this.data.energy, energyStorage);
            if (World.getThreadTime() % 100 == 0) {
                this.data.canSeeSky = this.region.canSeeSky(this.x, this.y + 1, this.z);
            }
            if (this.data.canSeeSky && this.region.getLightLevel(this.x, this.y + 1, this.z) >= 14) {
                this.data.energy += 40;
            }
        };
        PhotovoltaicCell.prototype.getEnergyStorage = function () {
            return 40;
        };
        PhotovoltaicCell.prototype.energyTick = function (type, src) {
            var output = Math.min(this.data.energy, 40);
            this.data.energy += src.add(output) - output;
        };
        return PhotovoltaicCell;
    }(Machine.Generator));
    Machine.PhotovoltaicCell = PhotovoltaicCell;
    MachineRegistry.registerPrototype(BlockID.photovoltaicCell, new PhotovoltaicCell());
})(Machine || (Machine = {}));
(function (Machine) {
    var AdvancePhotovoltaicCell = /** @class */ (function (_super) {
        __extends(AdvancePhotovoltaicCell, _super);
        function AdvancePhotovoltaicCell() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultValues = {
                energy: 0,
                canSeeSky: false
            };
            return _this;
        }
        AdvancePhotovoltaicCell.prototype.getScreenByName = function () {
            return null;
        };
        AdvancePhotovoltaicCell.prototype.onInit = function () {
            this.data.canSeeSky = this.region.canSeeSky(this.x, this.y + 1, this.z);
        };
        AdvancePhotovoltaicCell.prototype.onTick = function () {
            var energyStorage = this.getEnergyStorage();
            this.data.energy = Math.min(this.data.energy, energyStorage);
            if (World.getThreadTime() % 100 == 0) {
                this.data.canSeeSky = this.region.canSeeSky(this.x, this.y + 1, this.z);
            }
            if (this.data.canSeeSky && this.region.getLightLevel(this.x, this.y + 1, this.z) >= 14) {
                this.data.energy += 80;
            }
        };
        AdvancePhotovoltaicCell.prototype.getEnergyStorage = function () {
            return 80;
        };
        AdvancePhotovoltaicCell.prototype.energyTick = function (type, src) {
            var output = Math.min(this.data.energy, 80);
            this.data.energy += src.add(output) - output;
        };
        return AdvancePhotovoltaicCell;
    }(Machine.Generator));
    Machine.AdvancePhotovoltaicCell = AdvancePhotovoltaicCell;
    MachineRegistry.registerPrototype(BlockID.advancedPhotovoltaicCell, new AdvancePhotovoltaicCell());
})(Machine || (Machine = {}));
(function (Machine) {
    var VibrabtPhotovoltaicCell = /** @class */ (function (_super) {
        __extends(VibrabtPhotovoltaicCell, _super);
        function VibrabtPhotovoltaicCell() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultValues = {
                energy: 0,
                canSeeSky: false
            };
            return _this;
        }
        VibrabtPhotovoltaicCell.prototype.getScreenByName = function () {
            return null;
        };
        VibrabtPhotovoltaicCell.prototype.onInit = function () {
            this.data.canSeeSky = this.region.canSeeSky(this.x, this.y + 1, this.z);
        };
        VibrabtPhotovoltaicCell.prototype.onTick = function () {
            var energyStorage = this.getEnergyStorage();
            this.data.energy = Math.min(this.data.energy, energyStorage);
            if (World.getThreadTime() % 100 == 0) {
                this.data.canSeeSky = this.region.canSeeSky(this.x, this.y + 1, this.z);
            }
            if (this.data.canSeeSky && this.region.getLightLevel(this.x, this.y + 1, this.z) >= 14) {
                this.data.energy += 160;
            }
        };
        VibrabtPhotovoltaicCell.prototype.getEnergyStorage = function () {
            return 160;
        };
        VibrabtPhotovoltaicCell.prototype.energyTick = function (type, src) {
            var output = Math.min(this.data.energy, 160);
            this.data.energy += src.add(output) - output;
        };
        return VibrabtPhotovoltaicCell;
    }(Machine.Generator));
    Machine.VibrabtPhotovoltaicCell = VibrabtPhotovoltaicCell;
    MachineRegistry.registerPrototype(BlockID.vibrantPhotovoltaicCell, new VibrabtPhotovoltaicCell());
})(Machine || (Machine = {}));
/*
MachineRegistry.createPhotovoltaicCell = function(id, energyCre, lightMax) {
  var blockID
  var LightReq
  if (typeof id == "string") {
    blockID = BlockID[id]
  } else if (typeof id == "number") {
    blockID = id
  } else {
    return
  }
  if (lightMax) {
    LightReq = lightMax
  } else {
    LightReq = 15
  }

  MachineRegistry.registerGenerator(blockID, {
    defaultValues: {
      energy: 0,
      canSeeSky: false
    },

    onInit: function() {
      this.data.canSeeSky = this.region.canSeeSky(this.x, this.y + 1, this.z)
    },

    onTick: function() {
      var energyStorage = this.getEnergyStorage()
      this.data.energy = Math.min(this.data.energy, energyStorage)
      if (World.getThreadTime() % 100 == 0) {
        this.data.canSeeSky = this.region.canSeeSky(this.x, this.y + 1, this.z)
      }
      if (this.data.canSeeSky && this.region.getLightLevel(this.x, this.y + 1, this.z) == LightReq) {
        this.data.energy += energyCre
      }
    },

    getEnergyStorage: function() {
      return energyCre
    },

    energyTick: function(type, src) {
      this.data.energy += src.add(energyCre) - energyCre
    }
  })

}
*/ 
BlockRegistry.createBlock("stirlingGen", [
    {
        name: "tile.block_stirling_generator.name",
        texture: [
            ["machineBottom", 0], ["machineTop", 0], ["machineSide", 0],
            ["stirlingGenFront", 0], ["machineSide", 0], ["machineSide", 0]
        ],
        inCreative: true
    }
], "machine");
TileRenderer.setStandardModelWithRotation(BlockID.stirlingGen, 2, [["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["stirlingGenFront", 0], ["machineSide", 0], ["machineSide", 0]]);
TileRenderer.registerModelWithRotation(BlockID.stirlingGen, 2, [["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["stirlingGenFrontOn", 0], ["machineSide", 0], ["machineSide", 0]]);
TileRenderer.setRotationFunction(BlockID.stirlingGen);
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: BlockID.stirlingGen, count: 1, data: 0 }, ["   ",
        "sfs",
        "gpg"], ['s', ItemID.darkSteel, 0, 'f', BlockID.machineChassi, 0, 'g', ItemID.darkSteelGear, 0, "p", BlockID.simpleStirlingGen, 0]);
});
var stirlingGenGUI = MachineRegistry.createInventoryWindow(Translation.translate("tile.block_stirling_generator.name"), {
    drawing: [
        { type: "bitmap", x: 450, y: 135, bitmap: "fire_scale0", scale: 3.2 },
        { type: "bitmap", x: 335, y: 140, bitmap: "redflux_bar0", scale: 3.2 },
    ],
    elements: {
        "energyScale": { type: "scale", x: 335, y: 140, direction: 1, value: 0.5, bitmap: "redflux_bar1", scale: 3.2 },
        "textInstall": { type: "text", font: { size: 20, color: Color.YELLOW }, x: 325, y: 50, width: 50, height: 30, text: "" },
        "burningScale": {
            type: "scale",
            x: 450,
            y: 135,
            direction: 1,
            bitmap: "fire_scale1",
            scale: 3.2
        },
        "slotFuel": { type: "slot", x: 441, y: 160 },
        //"text": { type: "text", x: 400, y: 100, width: 100, height: 30, text: "RF" },
        "slotCapacitor": { type: "slot", x: 325, y: 320 }
    }
});
var Machine;
(function (Machine) {
    var StirlingGenerator = /** @class */ (function (_super) {
        __extends(StirlingGenerator, _super);
        function StirlingGenerator() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultValues = {
                energy: 0,
                burn: 0,
                burnMax: 0
            };
            _this.defaultBonus = 1;
            _this.defaultEnergyStorage = 100000;
            return _this;
        }
        StirlingGenerator.prototype.getScreenByName = function () {
            return stirlingGenGUI;
        };
        StirlingGenerator.prototype.setupContainer = function () {
            var _this = this;
            StorageInterface.setGlobalValidatePolicy(this.container, function (name, id, amount, data) {
                if (name.startsWith("slotCapacitor"))
                    return !!CapacitorAPI.isValidCapacitor(id, _this);
                return false;
            });
            StorageInterface.setSlotValidatePolicy(this.container, "slotFuel", function (name, id, count, data) {
                return Recipes.getFuelBurnDuration(id, data) > 0;
            });
        };
        StirlingGenerator.prototype.consumeFuel = function (slotName) {
            var fuelSlot = this.container.getSlot(slotName);
            if (fuelSlot.id > 0) {
                var burn = Recipes.getFuelBurnDuration(fuelSlot.id, fuelSlot.data);
                if (burn && !LiquidRegistry.getItemLiquid(fuelSlot.id, fuelSlot.data)) {
                    this.decreaseSlot(fuelSlot, 1);
                    return burn;
                }
            }
            return 0;
        };
        StirlingGenerator.prototype.run = function () {
            var newActive = false;
            var energyStorage = this.getEnergyStorage();
            if (this.data.energy + 60 <= energyStorage) {
                if (this.data.burn <= 0) {
                    this.data.burn = this.data.burnMax = this.consumeFuel("slotFuel") / 4;
                }
                if (this.data.burn > 0) {
                    this.data.energy = Math.min(this.data.energy + 60, energyStorage);
                    this.data.burn--;
                    newActive = true;
                }
            }
            this.setActive(newActive);
        };
        StirlingGenerator.prototype.onTick = function () {
            this.useCapacitor();
            StorageInterface.checkHoppers(this);
            var capacitor = this.container.getSlot("slotCapacitor");
            if (!!CapacitorAPI.isValidCapacitor(capacitor.id, this)) {
                this.container.setText("textInstall", "Installed");
                this.run();
            }
            else {
                this.container.setText("textInstall", "Please put Capacitor in slot capacitor to install function for machine");
            }
            this.container.setScale("burningScale", this.data.burn / this.data.burnMax || 0);
            this.container.setScale("energyScale", this.getRelativeEnergy());
            //this.container.setText("text", "RF: " + this.data.energy + "/" + this.getEnergyStorage() + ". Produce " + this.bonus * 60 + " RF/t")
            this.container.sendChanges();
        };
        StirlingGenerator.prototype.energyTick = function (type, src) {
            var output = Math.min(this.data.energy, 60);
            this.data.energy += src.add(output) - output;
        };
        StirlingGenerator.prototype.canRotate = function (side) {
            return side > 1;
        };
        return StirlingGenerator;
    }(Machine.Generator));
    Machine.StirlingGenerator = StirlingGenerator;
    MachineRegistry.registerPrototype(BlockID.stirlingGen, new StirlingGenerator());
    StorageInterface.createInterface(BlockID.stirlingGen, {
        slots: {
            "slotFuel": { input: true }
        },
        isValidInput: function (item) { return Recipes.getFuelBurnDuration(item.id, item.data) > 0; }
    });
})(Machine || (Machine = {}));
BlockRegistry.createBlock("combustionGenerator", [
    {
        name: "tile.block_combustion_generator.name",
        texture: [
            ["machineBottom", 0], ["machineTop", 0], ["machineSide", 0],
            ["combustion_gen_front", 0], ["machineSide", 0], ["machineSide", 0]
        ],
        inCreative: true
    }
], "other-machine");
Block.setBlockShape(BlockID.combustionGenerator, { x: 0.1, y: 0, z: 0 }, { x: 0.95, y: 0.95, z: 0.95 });
/*
 * ```js
 * texture: [
 *   ["название1", индекс1], // bottom (Y: -1)
 *   ["название2", индекс2], // top (Y: +1)
 *   ["название3", индекс3], // back (X: -1) West
 *   ["название4", индекс4], // front (X: +1) East
 *   ["название5", индекс5], // left (Z: -1) North
 *   ["название6", индекс6]  // right (Z: +1) South
 * ]
 * ```
 */
function setCombustionRender() {
    var combustionRender = new ICRender.Model();
    BlockRenderer.setStaticICRender(BlockID.combustionGenerator, 0, combustionRender);
    var model = BlockRenderer.createModel();
    model.addBox(5.75 / 16, 13.75 / 16, 2 / 16, 10.25 / 16, 15 / 16, 6 / 16, "combustion_gen_front", 0); //undefined
    model.addBox(5.75 / 16, 13.75 / 16, 10 / 16, 10.25 / 16, 15 / 16, 14 / 16, "combustion_gen_front", 0); //undefined
    model.addBox(0 / 16, 0 / 16, 15 / 16, 1 / 16, 16 / 16, 16 / 16, "combustion_gen_front", 0); //tmp1 x32
    model.addBox(1 / 16, 15 / 16, 15 / 16, 6 / 16, 16 / 16, 16 / 16, "combustion_gen_front", 0); //tmp1 x32
    model.addBox(1 / 16, 0 / 16, 15 / 16, 6 / 16, 1 / 16, 16 / 16, "combustion_gen_front", 0); //tmp1 x32
    model.addBox(5 / 16, 13 / 16, 15 / 16, 6 / 16, 15 / 16, 16 / 16, "combustion_gen_front", 0); //tmp1 x32
    model.addBox(5 / 16, 1 / 16, 15 / 16, 6 / 16, 3 / 16, 16 / 16, "combustion_gen_front", 0); //tmp1 x32
    model.addBox(6 / 16, 13 / 16, 15 / 16, 11 / 16, 14 / 16, 16 / 16, "combustion_gen_front", 0); //tmp1 x32
    model.addBox(6 / 16, 2 / 16, 15 / 16, 11 / 16, 3 / 16, 16 / 16, "combustion_gen_front", 0); //tmp1 x32
    model.addBox(10 / 16, 14 / 16, 15 / 16, 11 / 16, 16 / 16, 16 / 16, "combustion_gen_front", 0); //tmp1 x32
    model.addBox(10 / 16, 0 / 16, 15 / 16, 11 / 16, 2 / 16, 16 / 16, "combustion_gen_front", 0); //tmp1 x32
    model.addBox(11 / 16, 15 / 16, 15 / 16, 16 / 16, 16 / 16, 16 / 16, "combustion_gen_front", 0); //tmp1 x32
    model.addBox(11 / 16, 0 / 16, 15 / 16, 16 / 16, 1 / 16, 16 / 16, "combustion_gen_front", 0); //tmp1 x32
    model.addBox(15 / 16, 1 / 16, 15 / 16, 16 / 16, 15 / 16, 16 / 16, "combustion_gen_front", 0); //tmp1 x32
    model.addBox(0 / 16, 0 / 16, 0 / 16, 1 / 16, 16 / 16, 1 / 16, "combustion_gen_front", 0); //tmp1 x32*
    model.addBox(1 / 16, 15 / 16, 0 / 16, 6 / 16, 16 / 16, 1 / 16, "combustion_gen_front", 0); //tmp1 x32*
    model.addBox(1 / 16, 0 / 16, 0 / 16, 6 / 16, 1 / 16, 1 / 16, "combustion_gen_front", 0); //tmp1 x32*
    model.addBox(5 / 16, 13 / 16, 0 / 16, 6 / 16, 15 / 16, 1 / 16, "combustion_gen_front", 0); //tmp1 x32*
    model.addBox(5 / 16, 1 / 16, 0 / 16, 6 / 16, 3 / 16, 1 / 16, "combustion_gen_front", 0); //tmp1 x32*
    model.addBox(6 / 16, 13 / 16, 0 / 16, 11 / 16, 14 / 16, 1 / 16, "combustion_gen_front", 0); //tmp1 x32*
    model.addBox(6 / 16, 2 / 16, 0 / 16, 11 / 16, 3 / 16, 1 / 16, "combustion_gen_front", 0); //tmp1 x32*
    model.addBox(10 / 16, 14 / 16, 0 / 16, 11 / 16, 16 / 16, 1 / 16, "combustion_gen_front", 0); //tmp1 x32*
    model.addBox(10 / 16, 0 / 16, 0 / 16, 11 / 16, 2 / 16, 1 / 16, "combustion_gen_front", 0); //tmp1 x32*
    model.addBox(11 / 16, 15 / 16, 0 / 16, 16 / 16, 16 / 16, 1 / 16, "combustion_gen_front", 0); //tmp1 x32*
    model.addBox(11 / 16, 0 / 16, 0 / 16, 16 / 16, 1 / 16, 1 / 16, "combustion_gen_front", 0); //tmp1 x32*
    model.addBox(15 / 16, 1 / 16, 0 / 16, 16 / 16, 15 / 16, 1 / 16, "combustion_gen_front", 0); //tmp1 x32*
    model.addBox(0 / 16, 0 / 16, 1 / 16, 1 / 16, 1 / 16, 15 / 16, "machineSide", 0); //undefined
    model.addBox(15 / 16, 15 / 16, 1 / 16, 16 / 16, 16 / 16, 15 / 16, "machineSide", 0); //undefined
    model.addBox(0 / 16, 15 / 16, 1 / 16, 1 / 16, 16 / 16, 15 / 16, "machineSide", 0); //undefined
    model.addBox(15 / 16, 0 / 16, 1 / 16, 16 / 16, 1 / 16, 15 / 16, "machineSide", 0); //undefined
    model.addBox(0.25 / 16, 0.25 / 16, 0.25 / 16, 5.75 / 16, 15.75 / 16, 15.75 / 16, [["machineBottom", 0], ["combustion_gen_front", 0], ["machineBack", 0], ["machineSide", 0]]); //undefined
    model.addBox(10.25 / 16, 0.25 / 16, 0.25 / 16, 15.75 / 16, 15.75 / 16, 15.75 / 16, [["machineBottom", 0], ["combustion_gen_front", 0], ["machineBack", 0], ["machineSide", 0]]); //undefined
    model.addBox(5.75 / 16, 2.25 / 16, 0.25 / 16, 10.25 / 16, 13.75 / 16, 15.75 / 16, [["machineBottom", 0], ["machineSide", 0], ["machineBack", 0]]); //undefined
    model.addBox(1 / 16, 1 / 16, 14.75 / 16, 3 / 16, 15 / 16, 15.75 / 16, "combustion_gen_front", 0); //tmp x32
    model.addBox(3 / 16, 12 / 16, 14.75 / 16, 5 / 16, 15 / 16, 15.75 / 16, "combustion_gen_front", 0); //tmp x32
    model.addBox(3 / 16, 7 / 16, 14.75 / 16, 15 / 16, 9 / 16, 15.75 / 16, "combustion_gen_front", 0); //tmp x32
    model.addBox(3 / 16, 1 / 16, 14.75 / 16, 5 / 16, 4 / 16, 15.75 / 16, "combustion_gen_front", 0); //tmp x32
    model.addBox(5 / 16, 9 / 16, 14.75 / 16, 6 / 16, 13 / 16, 15.75 / 16, "combustion_gen_front", 0); //tmp x32
    model.addBox(5 / 16, 3 / 16, 14.75 / 16, 15 / 16, 4 / 16, 15.75 / 16, "combustion_gen_front", 0); //tmp x32
    model.addBox(6 / 16, 12 / 16, 14.75 / 16, 15 / 16, 13 / 16, 15.75 / 16, "combustion_gen_front", 0); //tmp x32
    model.addBox(7.5 / 16, 9 / 16, 14.75 / 16, 8.5 / 16, 12 / 16, 15.75 / 16, "combustion_gen_front", 0); //tmp x32
    model.addBox(10 / 16, 9 / 16, 14.75 / 16, 11 / 16, 12 / 16, 15.75 / 16, "combustion_gen_front", 0); //tmp x32
    model.addBox(11 / 16, 13 / 16, 14.75 / 16, 15 / 16, 15 / 16, 15.75 / 16, "combustion_gen_front", 0); //tmp x32
    model.addBox(11 / 16, 1 / 16, 14.75 / 16, 15 / 16, 3 / 16, 15.75 / 16, "combustion_gen_front", 0); //tmp x32
    model.addBox(13 / 16, 9 / 16, 14.75 / 16, 15 / 16, 12 / 16, 15.75 / 16, "combustion_gen_front", 0); //tmp x32
    model.addBox(13 / 16, 4 / 16, 14.75 / 16, 15 / 16, 7 / 16, 15.75 / 16, "combustion_gen_front", 0); //tmp x32
    model.addBox(1 / 16, 4 / 16, 13.75 / 16, 15 / 16, 12.5 / 16, 14.75 / 16, "combustion_gen_front", 0); //undefined
    model.addBox(10.25 / 16, 0.25 / 16, 0.25 / 16, 11.25 / 16, 2.75 / 16, 15.75 / 16, "machineBottom", 0); //undefined
    model.addBox(4.75 / 16, 0.25 / 16, 0.25 / 16, 5.75 / 16, 2.75 / 16, 15.75 / 16, "machineBottom", 0); //undefined
    model.addBox(10.25 / 16, 13.25 / 16, 0.25 / 16, 11.25 / 16, 15.75 / 16, 15.75 / 16, "machineSide", 0); //undefined
    model.addBox(4.75 / 16, 13.25 / 16, 0.25 / 16, 5.75 / 16, 15.75 / 16, 15.75 / 16, "machineSide", 0); //undefined
    model.addBox(10 / 16, 15 / 16, 1 / 16, 11 / 16, 16 / 16, 15 / 16, "machineSide", 0); //undefined
    model.addBox(5 / 16, 15 / 16, 1 / 16, 6 / 16, 16 / 16, 15 / 16, "machineSide", 0); //undefined
    model.addBox(10 / 16, 0 / 16, 1 / 16, 11 / 16, 1 / 16, 15 / 16, "machineSide", 0); //undefined
    model.addBox(5 / 16, 0 / 16, 1 / 16, 6 / 16, 1 / 16, 15 / 16, "machineSide", 0); //undefined
    combustionRender.addEntry(model);
}
setCombustionRender();
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: BlockID.combustionGenerator, count: 1, data: 0 }, [
        "ici",
        "rmr",
        "gfg"
    ], ['i', ItemID.electricalSteel, 0, 'c', ItemID.darkSteel, 0, "r", BlockID.eioTank, 0, 'm', BlockID.machineChassi, 0, "f", VanillaBlockID.piston, 0, "g", ItemID.darkSteelGear, 0
    ]);
});
var combustionGenUI = MachineRegistry.createInventoryWindow(Translation.translate("tile.block_combustion_generator.name"), {
    drawing: [
        { type: "bitmap", x: 520, y: 230, bitmap: "fire_scale0", scale: 3.2 },
        { type: "bitmap", x: 330, y: 110, bitmap: "redflux_bar0", scale: 3.2 },
    ],
    elements: {
        "textInstall": { type: "text", font: { size: 20, color: Color.YELLOW }, x: 325, y: 50, width: 100, height: 30, text: "" },
        "text": { type: "text", x: 400, y: 100, width: 100, height: 30, text: "RF" },
        // in
        "slot3": { type: "slot", x: 600, y: 300, bitmap: "slot_fluid_full" },
        "slot1": { type: "slot", x: 430, y: 300, bitmap: "slot_fluid_full" },
        // out
        "slot4": { type: "slot", x: 600, y: 360, bitmap: "slot_fluid_empty" },
        "slot2": { type: "slot", x: 430, y: 360, bitmap: "slot_fluid_empty" },
        // slot capacitor
        "slotCapacitor": { type: "slot", x: 330, y: 290 },
        // scale
        "energyScale": { type: "scale", x: 330, y: 110, direction: 1, bitmap: "redflux_bar1", scale: 3.2, value: 1 },
        "burningScale": { type: "scale", x: 520, y: 230, direction: 1, bitmap: "fire_scale1", scale: 3.2, value: 1 },
        "liquidCool": {
            type: "scale",
            x: 600,
            y: 120,
            direction: 1,
            bitmap: "tankOverlay",
            overlay: "tankOverlay",
            scale: 3.2,
            value: 1
        },
        "liquidHeat": {
            type: "scale",
            x: 430,
            y: 120,
            direction: 1,
            bitmap: "tankOverlay",
            overlay: "tankOverlay",
            scale: 3.2,
            value: 1
        },
    }
});
/*
StorageInterface.createInterface(BlockID.combustionGenerator, {
  slots: {
    "slot1": { input: true },
    "slot2": { output: true },
    "slot3": { input: true },
    "slot4": { output: true },
  },
  canReceiveLiquid: function(liquid, side) { return true; },
  canTransportLiquid: function(liquid, side) { return true; }
});
*/
var Machine;
(function (Machine) {
    var CombustionGenerator = /** @class */ (function (_super) {
        __extends(CombustionGenerator, _super);
        function CombustionGenerator() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultValues = {
                energy: 0,
                /*
                      mutil_bonus: 1,
                        isActive: false,*/
                burn_time: 0,
                cool_time: 0
            };
            _this.max_output = 0;
            _this.defaultBonus = 1;
            _this.defaultEnergyStorage = 100000;
            _this.generated = 0;
            return _this;
        }
        CombustionGenerator.prototype.getScreenByName = function () {
            return combustionGenUI;
        };
        ;
        CombustionGenerator.prototype.setupContainer = function () {
            this.coolTank = this.addLiquidTank("coolTank", 5000, CombustionFuel.getCoolArray());
            this.heatTank = this.addLiquidTank("heatTank", 5000, CombustionFuel.getHeatArray());
        };
        ;
        CombustionGenerator.prototype.useCapacitor = function () {
            var upgrades = CapacitorAPI.useCapacitor(this);
            this.bonus = upgrades.getBonusGenerator(this.defaultBonus);
            this.energyStorage = upgrades.getEnergyStorage(this.defaultEnergyStorage);
            return upgrades;
        };
        CombustionGenerator.prototype.generateEnergy = function () {
            this.generated = 0;
            // Check: We have no ticks remaining and cannot refill or We are full?
            if ((this.data.cool_time <= 0 && this.coolTank.isEmpty()) || (this.data.burn_time <= 0 && this.heatTank.isEmpty()) || this.data.energy >= this.getEnergyStorage()) {
                return false;
            }
            var math = new CombustionMath(new CombustionFuel.CoolantImpl(this.coolTank.getLiquidStored()), new CombustionFuel.FuelImpl(this.heatTank.getLiquidStored()), this.bonus, 2);
            if (this.inPause) {
                var powerPerCycle = math.getEnergyPerTick();
                if (this.data.energy >= (this.getEnergyStorage() - (powerPerCycle * 200)) && this.data.energy > (this.getEnergyStorage() / 8)) {
                    return false;
                }
            }
            this.inPause = false;
            // Use old ticks
            if (this.data.cool_time > 0 && this.data.burn_time > 0 && math.getEnergyPerTick()) {
                var powerPerCycle = math.getEnergyPerTick();
                this.data.burn_time--;
                this.data.cool_time--;
                this.data.energy += powerPerCycle;
                this.max_output = powerPerCycle;
                return true;
            }
            // re-fill
            if (this.data.cool_time <= 0 && math.getTicksPerCoolant(this.coolTank.getLiquid(this.coolTank.getLiquidStored(), 100)) > 0) {
                this.data.cool_time += math.getTicksPerCoolant(this.coolTank.getLiquid(this.coolTank.getLiquidStored(), 100));
            }
            if (this.data.burn_time <= 0 && math.getTicksPerFuel(this.heatTank.getLiquid(this.heatTank.getLiquidStored(), 100)) > 0) {
                this.data.burn_time += math.getTicksPerFuel(this.heatTank.getLiquid(this.heatTank.getLiquidStored(), 100));
            }
            math = new CombustionMath(new CombustionFuel.CoolantImpl(this.coolTank.getLiquidStored()), new CombustionFuel.FuelImpl(this.heatTank.getLiquidStored()), this.bonus, 1);
            // last sanity check, then generate energy
            if (this.data.cool_time > 0 && this.data.burn_time > 0) {
                this.data.burn_time--;
                this.data.cool_time--;
                this.generated = math.getEnergyPerTick();
                this.data.energy += this.generated;
                return true;
            }
            return false;
        };
        CombustionGenerator.prototype.run = function () {
            var newActive = false;
            newActive = this.generateEnergy();
            if (this.data.energy >= this.getEnergyStorage()) {
                this.inPause = true;
            }
            this.setActive(newActive);
        };
        ;
        CombustionGenerator.prototype.onTick = function () {
            this.useCapacitor();
            StorageInterface.checkHoppers(this);
            var capacitor = this.container.getSlot("slotCapacitor");
            if (CapacitorAPI.isValidCapacitor(capacitor.id, this)) {
                this.container.setText("textInstall", "Installed");
                this.run();
            }
            else {
                this.container.setText("textInstall", "Please put Capacitor in slot capacitor to install function for machine");
            }
            var slot1 = this.container.getSlot("slot1");
            var slot2 = this.container.getSlot("slot2");
            this.heatTank.getLiquidFromItem(slot1, slot2);
            var slot3 = this.container.getSlot("slot3");
            var slot4 = this.container.getSlot("slot4");
            this.coolTank.getLiquidFromItem(slot3, slot4);
            this.heatTank.updateUiScale("liquidHeat");
            this.coolTank.updateUiScale("liquidCool");
            this.container.setScale("energyScale", this.getRelativeEnergy());
            this.container.sendChanges();
        };
        ;
        CombustionGenerator.prototype.energyTick = function (type, src) {
            var output = Math.min(this.data.energy, this.max_output);
            this.data.energy += src.add(output) - output;
        };
        ;
        return CombustionGenerator;
    }(Machine.Generator));
    Machine.CombustionGenerator = CombustionGenerator;
    ;
    MachineRegistry.registerPrototype(BlockID.combustionGenerator, new CombustionGenerator());
    MachineRegistry.createStorageInterface(BlockID.combustionGenerator, {
        slots: {
            "slot1": {
                input: true,
            },
            "slot2": {
                output: true,
                isValid: function (item) {
                    return item.id == VanillaItemID.bucket;
                }
            },
            "slot3": {
                input: true,
                isValid: function (item) {
                    return item.id == VanillaItemID.bucket;
                }
            },
            "slot4": {
                output: true
            },
        },
        canReceiveLiquid: function () { return true; },
        canTransportLiquid: function () { return true; },
        getInputTank: function (side) {
            if (side == EBlockSide.WEST)
                return this.tileEntity.coolTank;
            else if (side == EBlockSide.EAST)
                return this.tileEntity.heatTank;
            return;
        }
    });
})(Machine || (Machine = {}));
;
BlockRegistry.createBlock("zombieGen", [
    {
        name: "tile.block_zombie_generator.name",
        texture: [["darkSteelBlock", 0]],
        inCreative: true,
    },
], "other-machine");
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: BlockID.zombieGen, count: 1, data: 0 }, ["iii", "rmr", "rrr"], [
        "i",
        ItemID.electricalSteel,
        0,
        "r",
        BlockID.fusedQuartz,
        0,
        "m",
        ItemID.skullZombieElectrode,
        0,
    ]);
});
var zombieGenRender = new ICRender.Model();
var model = BlockRenderer.createModel();
model.addBox(1 / 16, 0 / 16, 1 / 16, 15 / 16, 1 / 16, 15 / 16, "darkSteelBlock", 0);
model.addBox(1 / 16, 1 / 16, 14 / 16, 2 / 16, 13 / 16, 15 / 16, "darkSteelBlock", 0);
model.addBox(14 / 16, 1 / 16, 14 / 16, 15 / 16, 13 / 16, 15 / 16, "darkSteelBlock", 0);
model.addBox(14 / 16, 1 / 16, 1 / 16, 15 / 16, 13 / 16, 2 / 16, "darkSteelBlock", 0);
model.addBox(1 / 16, 1 / 16, 1 / 16, 2 / 16, 13 / 16, 2 / 16, "darkSteelBlock", 0);
model.addBox(1 / 16, 13 / 16, 1 / 16, 15 / 16, 14 / 16, 15 / 16, "darkSteelBlock", 0);
model.addBox(4 / 16, 2 / 16, 3 / 16, 13 / 16, 12 / 16, 13 / 16, "killerJoeZombieOther", 0);
model.addBox(3 / 16, 2 / 16, 3 / 16, 4 / 16, 12 / 16, 13 / 16, "killerJoeZombie", 0);
model.addBox(1 / 16, 1 / 16, 2 / 16, 2 / 16, 13 / 16, 14 / 16, 20, 0);
model.addBox(2 / 16, 1 / 16, 1 / 16, 14 / 16, 13 / 16, 2 / 16, 20, 0);
model.addBox(2 / 16, 1 / 16, 14 / 16, 14 / 16, 13 / 16, 15 / 16, 20, 0);
model.addBox(14 / 16, 1 / 16, 2 / 16, 15 / 16, 13 / 16, 14 / 16, 20, 0);
zombieGenRender.addEntry(model);
BlockRenderer.setStaticICRender(BlockID.zombieGen, -1, zombieGenRender);
Block.setBlockShape(BlockID.zombieGen, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 });
var guiZombieGen = MachineRegistry.createInventoryWindow(Translation.translate("tile.block_zombie_generator.name"), {
    drawing: [
        { type: "bitmap", x: 470, y: 66, bitmap: "fluid_scale", scale: 3.2 },
        { type: "bitmap", x: 66, y: 135, bitmap: "fire_scale0", scale: 3.2 },
        { type: "bitmap", x: 335, y: 140, bitmap: "redflux_bar0", scale: 3.2 },
    ],
    elements: {
        text: { type: "text", x: 400, y: 100, width: 100, height: 30, text: "RF" },
        energyScale: {
            type: "scale",
            x: 335,
            y: 140,
            direction: 1,
            value: 0.5,
            bitmap: "redflux_bar1",
            scale: 3.2,
        },
        slotCapacitor: { type: "slot", x: 325, y: 320 },
        textInstall: {
            type: "text",
            font: { size: 20, color: Color.YELLOW },
            x: 325,
            y: 50,
            width: 100,
            height: 30,
            text: "",
        },
        burningScale: {
            type: "scale",
            x: 660,
            y: 135,
            direction: 1,
            bitmap: "fire_scale1",
            scale: 3.2,
        },
        liquidScale: {
            type: "scale",
            x: 470,
            y: 275,
            direction: 1,
            bitmap: "fluid_scale",
            scale: 3.2,
        },
        slotLiquid0: { type: "slot", x: 600, y: 240 },
        slotLiquid1: { type: "slot", x: 600, y: 180 },
    },
});
//
var Machine;
(function (Machine) {
    var ZombieGenerator = /** @class */ (function (_super) {
        __extends(ZombieGenerator, _super);
        function ZombieGenerator() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultValues = {
                energy: 0,
                burn: 0,
                burn_max: 0,
            };
            _this.defaultEnergyStorage = 100000;
            _this.defaultBonus = 1;
            return _this;
        }
        ZombieGenerator.prototype.getScreenByName = function (screenName) {
            return guiZombieGen;
        };
        ZombieGenerator.prototype.setupContainer = function () {
            this.liquidTank = this.addLiquidTank("fluid", 4000, ["nutrientDistillation"]);
        };
        ZombieGenerator.prototype.useCapacitor = function () {
            var upgrades = CapacitorAPI.useCapacitor(this);
            this.bonus = upgrades.getBonusGenerator(this.defaultBonus);
            this.energyStorage = upgrades.getEnergyStorage(this.defaultEnergyStorage);
            return upgrades;
        };
        ZombieGenerator.prototype.onItemUse = function (coords, item, player) {
            if (Entity.getSneaking(player)) {
                if (MachineRegistry.fillTankOnClick(this.liquidTank, item, player)) {
                    this.preventClick();
                    return true;
                }
            }
            return _super.prototype.onItemUse.call(this, coords, item, player);
        };
        ZombieGenerator.prototype.onTick = function () {
            var slot0 = this.container.getSlot("slotLiquid0");
            var slot1 = this.container.getSlot("slotLiquid1");
            var capacitor = this.container.getSlot("slotCapacitor");
            this.liquidTank.updateUiScale("liquidScale");
            if (CapacitorAPI.isValidCapacitor(capacitor.id, this)) {
                this.container.setText("textInstall", "Installed");
                if (this.liquidTank.getAmount("nutrientDistillation") >= 1400 && this.data.energy <= this.getEnergyStorage() + 80 * this.bonus) {
                    this.data.energy += 80 * this.bonus;
                    this.liquidTank.getLiquid("nutrientDistillation", 0.08);
                    this.setActive(true);
                }
                else {
                    this.setActive(false);
                }
            }
            else {
                this.container.setText("textInstall", "Please put Capacitor in slot capacitor to install function for machine");
            }
            this.liquidTank.getLiquidFromItem(slot0, slot1);
            var energyStorage = this.getEnergyStorage();
            this.data.energy = Math.min(this.data.energy, energyStorage);
            this.container.setText("text", "RF: " + this.data.energy + "/" + this.getEnergyStorage() + ".Bonus energy: x" + this.bonus + ".0");
            this.container.setScale("energyScale", this.data.energy / this.getEnergyStorage());
            this.container.sendChanges();
        };
        ZombieGenerator.prototype.getEnergyStorage = function () {
            return this.energyStorage;
        };
        ZombieGenerator.prototype.energyTick = function (type, src) {
            var output = Math.min(80 * this.bonus, this.data.energy);
            this.data.energy += src.add(output) - output;
        };
        return ZombieGenerator;
    }(Machine.Generator));
    Machine.ZombieGenerator = ZombieGenerator;
    TileEntity.registerPrototype(BlockID.zombieGen, new ZombieGenerator());
    MachineRegistry.createStorageInterface(BlockID.zombieGen, {
        slots: {
            slotLiquid0: { input: true },
            slotLiquid1: { output: true },
        },
        isValidInput: function (item, side, tileEntity) {
            return LiquidItemRegistry.getItemLiquid(item.id, item.data) == "nutrientDistillation";
        },
        canReceiveLiquid: function (liquid, side) {
            return liquid == "nutrientDistillation";
        },
        canTransportLiquid: function (liquid, side) {
            return false;
        }
    });
})(Machine || (Machine = {}));
var Machine;
(function (Machine) {
    var BasicMachine = /** @class */ (function (_super) {
        __extends(BasicMachine, _super);
        function BasicMachine() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultValues = {
                energy: 0,
                progress: 0
            };
            _this.defaultTier = 2;
            _this.defaultEnergyStorage = 100000;
            return _this;
        }
        BasicMachine.prototype.getTier = function () {
            return this.tier;
        };
        BasicMachine.prototype.getEnergyStorage = function () {
            return this.energyStorage;
        };
        BasicMachine.prototype.setupContainer = function () {
            var _this = this;
            StorageInterface.setGlobalValidatePolicy(this.container, function (name, id, amount, data) {
                if (name.startsWith("slotCapacitor"))
                    return CapacitorAPI.isValidCapacitor(id, _this);
                return false;
            });
        };
        BasicMachine.prototype.useCapacitor = function () {
            var upgrades = CapacitorAPI.useCapacitor(this);
            this.energyConsume = upgrades.getEnergyConsume(this.defaultEnergyConsume);
            this.energyStorage = upgrades.getEnergyStorage(this.defaultEnergyStorage);
            return upgrades;
        };
        BasicMachine.prototype.getRelativeEnergy = function () {
            return this.data.energy / this.getEnergyStorage();
        };
        BasicMachine.prototype.canRotate = function (side) {
            return side > 1;
        };
        BasicMachine.prototype.energyReceive = function (type, amount, voltage) {
            var maxVoltage = this.energyConsume > this.getMaxIntake() ? this.energyConsume : this.getMaxIntake();
            if (voltage > maxVoltage) {
                amount = Math.min(amount, maxVoltage);
            }
            var add = Math.min(amount, this.getEnergyStorage() - this.data.energy);
            this.data.energy += add;
            return add;
        };
        return BasicMachine;
    }(Machine.ProgressingMachine));
    Machine.BasicMachine = BasicMachine;
})(Machine || (Machine = {}));
BlockRegistry.createBlock("alloySmelter", [
    {
        name: "tile.block_alloy_smelter.name",
        texture: [
            ["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["alloySmelterFront", 0], ["machineSide", 0], ["machineSide", 0]
        ],
        inCreative: true
    }
], "machine");
TileRenderer.setHandAndUiModel(BlockID.alloySmelter, 0, [
    ["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["alloySmelterFront", 0], ["machineSide", 0], ["machineSide", 0]
]);
TileRenderer.setStandardModelWithRotation(BlockID.alloySmelter, 2, [["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["alloySmelterFront", 0], ["machineSide", 0], ["machineSide", 0]]);
TileRenderer.registerModelWithRotation(BlockID.alloySmelter, 2, [["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["alloySmelterFrontOn", 0], ["machineSide", 0], ["machineSide", 0]]);
TileRenderer.setRotationFunction(BlockID.alloySmelter);
var smelterGUI = MachineRegistry.createInventoryWindow(Translation.translate("tile.block_alloy_smelter.name"), {
    drawing: [
        { type: "bitmap", x: 527, y: 235, bitmap: "fire_scale0", scale: 3.2 },
        { type: "bitmap", x: 687, y: 235, bitmap: "fire_scale0", scale: 3.2 },
        { type: "bitmap", x: 335, y: 140, bitmap: "redflux_bar0", scale: 3.2 },
        //{ type: "bitmap", x: 527, y: 235, bitmap: "fire_scale0", scale: 3.2 },
        //{ type: "bitmap", x: 600, y: 170, bitmap: "bar_alloy", scale: 4.5 },
    ],
    elements: {
        "progressScale0": {
            type: "scale",
            x: 527,
            y: 235,
            direction: 1,
            bitmap: "fire_scale1",
            scale: 3.2,
            clicker: {
                onClick: function () {
                    RV === null || RV === void 0 ? void 0 : RV.RecipeTypeRegistry.openRecipePage("enderio_alloy");
                }
            }
        },
        "progressScale1": {
            type: "scale",
            x: 687,
            y: 235,
            direction: 1,
            bitmap: "fire_scale1",
            scale: 3.2,
            clicker: {
                onClick: function () {
                    RV === null || RV === void 0 ? void 0 : RV.RecipeTypeRegistry.openRecipePage("enderio_alloy");
                }
            }
        },
        "energyScale": {
            type: "scale",
            x: 335,
            y: 140,
            direction: 1,
            bitmap: "redflux_bar1",
            scale: 3.2
        },
        "ingredient1": {
            type: "slot",
            x: 520,
            y: 170
        },
        "ingredient2": {
            type: "slot",
            x: 600,
            y: 140
        },
        "ingredient3": {
            type: "slot",
            x: 680,
            y: 170
        },
        "slotCapacitor": { type: "slot", x: 325, y: 320 },
        "textInstall": { type: "text", font: { size: 20, color: Color.YELLOW }, x: 325, y: 50, width: 100, height: 30, text: "" },
        "slotResult": { type: "slot", x: 600, y: 320 },
        "changeMode": {
            type: "button",
            x: 787,
            y: 300,
            bitmap: "alloy0",
            scale: 2.2,
            clicker: {
                onClick: function (_, container) {
                    container.sendEvent("switchMode", {});
                }
            }
        }
    }
});
Callback.addCallback("PreLoaded", function () {
    Recipes.addFurnace(ItemID.dustLapis, VanillaItemID.lapis_lazuli, 0);
    Recipes.addFurnace(ItemID.dustQuarzt, VanillaItemID.quartz, 0);
    SmelterRecipe.addRecipe({
        ingredient1: { id: 331, data: 0, count: 1 },
        ingredient2: { id: 265, data: 0, count: 1 },
        //ingredient3: { id: 0, data: 0, count: 0 },
        result: { id: ItemID.conductiveIron, count: 1, data: 0 },
        energy: 10000
    });
    SmelterRecipe.addRecipe({
        ingredient1: { id: VanillaItemID.gold_ingot, data: 0, count: 1 },
        ingredient2: { id: VanillaBlockID.soul_sand, data: 0, count: 1 },
        //ingredient3: { id: 0, data: 0, count: 0 },
        result: { id: ItemID.soularium, count: 1, data: 0 },
        energy: 10000
    });
    SmelterRecipe.addRecipe({
        ingredient1: { id: 266, data: 0, count: 1 },
        ingredient2: { id: 331, data: 0, count: 1 },
        ingredient3: { id: 348, data: 0, count: 1 },
        result: { id: ItemID.energeticAlloy, count: 1, data: 0 },
        energy: 10000
    });
    SmelterRecipe.addRecipe({
        ingredient1: { id: ItemID.energeticAlloy, data: 0, count: 1 },
        ingredient2: { id: 368, data: 0, count: 1 },
        //ingredient3: { id: 0, data: 0, count: 0 },
        result: { id: ItemID.vibrantAlloy, count: 1, data: 0 },
        energy: 10000
    });
    SmelterRecipe.addRecipe({
        ingredient1: { id: 265, data: 0, count: 1 },
        ingredient2: { id: 368, data: 0, count: 1 },
        //ingredient3: { id: 0, data: 0, count: 0 },
        result: { id: ItemID.pulsatingIron, count: 1, data: 0 },
        energy: 10000
    });
    SmelterRecipe.addRecipe({
        ingredient1: { id: VanillaItemID.iron_ingot, data: 0, count: 1 },
        ingredient2: { id: ItemID.dustCoal, data: 0, count: 1 },
        ingredient3: { id: 49, data: 0, count: 1 },
        result: { id: ItemID.darkSteel, count: 1, data: 0 },
        energy: 20000
    });
    SmelterRecipe.addRecipe({
        ingredient1: { id: VanillaItemID.iron_ingot, data: 0, count: 1 },
        ingredient2: { id: ItemID.dustCoal, data: 0, count: 1 },
        ingredient3: { id: ItemID.silicon, data: 0, count: 1 },
        result: { id: ItemID.electricalSteel, count: 1, data: 0 },
        energy: 10000
    });
    SmelterRecipe.addRecipe({
        ingredient1: { id: 331, data: 0, count: 1 },
        ingredient2: { id: ItemID.silicon, data: 0, count: 1 },
        //ingredient3: { id: 0, data: 0, count: 0, count: 1 },
        result: { id: ItemID.redstoneAlloy, count: 1, data: 0 },
        energy: 10000
    });
    /*
    Recipes.addShaped({ id: BlockID.alloySmelter, count: 1, data: 0 }, [
          "ifi",
          "fmf",
         "ici"
      ], ['i', 265, 0, 'f', 61, 0, "m", BlockID.machineChassi, 0, "c", 380, 0])
     */
    // Machine Addon :>
    Recipes.addShaped({ id: BlockID.alloySmelter, count: 1, data: 0 }, [
        "i i",
        "amf",
        "c c"
    ], ['i', ItemID.darkSteel, 0, 'f', BlockID.simpleAlloySmelter, 0, "m", BlockID.machineChassi, 0, "c", ItemID.darkSteelGear, 0, "a", BlockID.simplePoweredFurnace, 0]);
});
var Machine;
(function (Machine) {
    var AlloySmelter_Basic = /** @class */ (function (_super) {
        __extends(AlloySmelter_Basic, _super);
        function AlloySmelter_Basic() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultValues = {
                energy: 0,
                progress: 0,
                mode: 0
            };
            _this.defaultEnergyStorage = 100000;
            _this.defaultEnergyConsume = 30;
            return _this;
        }
        AlloySmelter_Basic.prototype.setupContainer = function () {
            var _this = this;
            StorageInterface.setGlobalValidatePolicy(this.container, function (name, id, amount, data) {
                if (name.startsWith("slotCapacitor"))
                    return CapacitorAPI.isValidCapacitor(id, _this);
                if (name.startsWith("ingredient"))
                    return true;
                return false;
            });
        };
        AlloySmelter_Basic.prototype.getScreenByName = function () {
            return smelterGUI;
        };
        AlloySmelter_Basic.prototype.alloy = function () {
            var newActive = false;
            var input = SmelterRecipe.getInput(this.container);
            var recipe = SmelterRecipe.getRecipe(input);
            if (recipe) {
                var resultSlot = this.container.getSlot("slotResult");
                if (resultSlot.id == recipe.result.id && resultSlot.count + recipe.result.count <= 64 || !resultSlot.id) {
                    this.processTime = recipe.energy;
                    if (this.data.energy >= this.energyConsume) {
                        this.data.energy -= this.energyConsume;
                        this.data.progress += this.energyConsume;
                        newActive = true;
                    }
                    if (this.data.progress >= this.processTime) {
                        SmelterRecipe.performRecipe(recipe, this.container);
                        this.data.progress = 0;
                    }
                }
            }
            else {
                this.data.progress = 0;
            }
            this.setActive(newActive);
            this.container.setScale("progressScale0", this.data.progress / this.processTime || 0);
            this.container.setScale("progressScale1", this.data.progress / this.processTime || 0);
            this.container.sendChanges();
        };
        AlloySmelter_Basic.prototype.furnace = function () {
            var newActive = false;
            var input = SmelterRecipe.getInputFurnace(this.container);
            var recipe = SmelterRecipe.getRecipeFurnace(input);
            var resultSlot = this.container.getSlot("slotResult");
            if (!!recipe.result && !!recipe.ingredient && ((resultSlot.id == recipe.result.id && resultSlot.data == recipe.result.data && resultSlot.count <= 64 - recipe.result.count) || !resultSlot.id)) {
                if (this.data.energy >= this.energyConsume) {
                    this.data.energy -= this.energyConsume;
                    this.data.progress += this.energyConsume;
                    newActive = true;
                }
                ;
                if (this.data.progress >= 3000) {
                    var inputSlot = this.container.getSlot(recipe.ingredient);
                    var count = Math.min(inputSlot.count, 3);
                    inputSlot.count -= count;
                    inputSlot.validate();
                    inputSlot.markDirty();
                    resultSlot.setSlot(recipe.result.id, resultSlot.count + Math.min(count * recipe.result.count, 3 * recipe.result.count), recipe.result.data || 0);
                    this.container.validateAll();
                    this.data.progress = 0;
                }
            }
            else {
                this.data.progress = 0;
            }
            this.setActive(newActive);
            this.container.setScale("progressScale0", this.data.progress / 3000 || 0);
            this.container.setScale("progressScale1", this.data.progress / 3000 || 0);
            this.container.sendChanges();
        };
        AlloySmelter_Basic.prototype.run = function () {
            if (this.data.mode === 0)
                this.alloy();
            else if (this.data.mode === 1)
                this.furnace();
        };
        AlloySmelter_Basic.prototype.onTick = function () {
            this.useCapacitor();
            this.container.sendEvent("setModeIcon", { mode: this.data.mode });
            StorageInterface.checkHoppers(this);
            var capacitor = this.container.getSlot("slotCapacitor");
            if (CapacitorAPI.isValidCapacitor(capacitor.id, this)) {
                this.container.setText("textInstall", "Installed");
                this.run();
            }
            else if (!CapacitorAPI.isValidCapacitor(capacitor.id, this)) {
                this.container.setText("textInstall", "Please put Capacitor in slot capacitor to install function for machine");
            }
            this.container.setScale("energyScale", this.getRelativeEnergy());
            this.container.sendChanges();
        };
        AlloySmelter_Basic.prototype.switchMode = function () {
            this.data.mode = (this.data.mode + 1) % 2;
            this.data.progress = this.processTime = 0;
            this.container.sendEvent("setModeIcon", { mode: this.data.mode });
        };
        AlloySmelter_Basic.prototype.setModeIcon = function (container, window, content, data) {
            if (content) {
                var element = content.elements["changeMode"];
                var texture = "alloy" + data.mode;
                if (element.bitmap != texture) {
                    element.bitmap = texture;
                    element.visual = data.mode % 3 > 0;
                }
            }
        };
        __decorate([
            Machine.ContainerEvent(Side.Server)
        ], AlloySmelter_Basic.prototype, "switchMode", null);
        __decorate([
            Machine.ContainerEvent(Side.Client)
        ], AlloySmelter_Basic.prototype, "setModeIcon", null);
        return AlloySmelter_Basic;
    }(Machine.BasicMachine));
    Machine.AlloySmelter_Basic = AlloySmelter_Basic;
    MachineRegistry.registerPrototype(BlockID.alloySmelter, new AlloySmelter_Basic());
    StorageInterface.createInterface(BlockID.alloySmelter, {
        slots: {
            "ingredient1": { input: true },
            "ingredient2": { input: true },
            "ingredient3": { input: true },
            "slotResult": { output: true }
        }
    });
})(Machine || (Machine = {}));
BlockRegistry.createBlock("sagmill", [
    {
        name: "tile.block_sag_mill.name",
        texture: [
            ["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["crusherFront", 0], ["machineSide", 0], ["machineSide", 0]
        ],
        inCreative: true
    }
], "machine");
TileRenderer.setHandAndUiModel(BlockID.sagmill, 0, [
    ["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["crusherFront", 0], ["machineSide", 0], ["machineSide", 0]
]);
TileRenderer.setStandardModelWithRotation(BlockID.sagmill, 2, [["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["crusherFront", 0], ["machineSide", 0], ["machineSide", 0]]);
TileRenderer.registerModelWithRotation(BlockID.sagmill, 2, [["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["crusherFrontOn", 0], ["machineSide", 0], ["machineSide", 0]]);
TileRenderer.setRotationFunction(BlockID.sagmill);
/*
ICRender.getGroup("bc-container").add(BlockID.sagmill, -1);
ICRender.getGroup("item-pipe").add(BlockID.sagmill, -1);

*/
var SAGGui = MachineRegistry.createInventoryWindow(Translation.translate("tile.block_sag_mill.name"), {
    drawing: [
        { type: "bitmap", x: 335, y: 140, bitmap: "redflux_bar0", scale: 3.2 },
        { type: "bitmap", x: 595, y: 250, bitmap: "bar_progress_down0", scale: 4.2 },
        { type: "bitmap", x: 765, y: 165, bitmap: "bar_silicon0", scale: 6.8 },
    ],
    elements: {
        "progressScale": {
            type: "scale",
            x: 595,
            y: 250,
            direction: 3,
            bitmap: "bar_progress_down1",
            scale: 4.2,
            clicker: {
                onClick: function () {
                    RV === null || RV === void 0 ? void 0 : RV.RecipeTypeRegistry.openRecipePage("enderio_sag");
                }
            }
        },
        "energyScale": {
            type: "scale",
            x: 335,
            y: 140,
            direction: 1,
            value: 0.5,
            bitmap: "redflux_bar1",
            scale: 3.2,
        },
        "grindingScale": {
            type: "scale",
            x: 765,
            y: 165,
            direction: 1,
            value: 0.5,
            bitmap: "bar_silicon1",
            scale: 6.8
        },
        "ingredient": {
            type: "slot",
            x: 602,
            y: 170
        },
        "slotGrinding": { type: "slot", x: 700, y: 170 },
        "slotCapacitor": { type: "slot", x: 325, y: 310 },
        "textInstall": { type: "text", font: { size: 20, color: Color.YELLOW }, x: 325, y: 50, width: 100, height: 30, text: "" },
        "result0": { type: "slot", x: 505, y: 340 },
        "result1": { type: "slot", x: 570, y: 340 },
        "result2": { type: "slot", x: 635, y: 340 },
        "result3": { type: "slot", x: 700, y: 340 }
    }
});
Callback.addCallback("PreLoaded", function () {
    // Ifn't have Machine Addon
    /*
  Recipes.addShaped({ id: BlockID.sagmill, count: 1, data: 0 }, [
        "fff",
        "imi",
         " p "
    ], ['i', ItemID.darkSteel, 0, 'f', VanillaItemID.flint 0, "m", BlockID.machineChassi, 0, "p", VanillaItemID.piston, 0]);
    */
    Recipes.addShaped({ id: BlockID.sagmill, count: 1, data: 0 }, [
        "fff",
        "ipi",
        "ama"
    ], ['i', ItemID.darkSteel, 0, 'f', VanillaItemID.flint, 0, "m", BlockID.simplesagmill, 0, "p", BlockID.machineChassi, 0, 'a', ItemID.darkSteelGear, 0]);
    Recipes.addShaped({ id: BlockID.sagmill, count: 1, data: 0 }, [
        "fff",
        "ipi",
        "ama"
    ], ['i', ItemID.darkSteel, 0, 'f', VanillaItemID.flint, 0, "m", VanillaBlockID.piston, 0, "p", BlockID.machineChassi, 0, 'a', ItemID.darkSteelGear, 0]);
    RecipeRegistry.addCrusher({
        isGrinding: false,
        ingredient: { id: 49, data: 0 },
        result0: { id: ItemID.dustObsidian, data: 0, chance: 1, count: 4 },
        energy: 4020,
        by: "EnderIO"
    });
    RecipeRegistry.addCrusher({
        isGrinding: true,
        ingredient: { id: VanillaBlockID.gold_ore, data: 0 },
        result0: { id: ItemID.dustGold, data: 0, chance: 1, count: 2 },
        result1: { id: VanillaBlockID.cobblestone, data: 0, chance: 0.15 },
        result2: { id: ItemID.dustCopper, data: 0, chance: 0.2 },
        //id: ItemID.dustSilver, data: 0, chance: 0.4 
        energy: 3600,
        by: "EnderIO"
    });
    RecipeRegistry.addCrusher({
        ingredient: { id: VanillaBlockID.iron_ore, data: 0 },
        result0: { id: ItemID.dustIron, data: 0, chance: 1, count: 2 },
        result1: { id: VanillaBlockID.cobblestone, data: 0, chance: 0.15 },
        result2: { id: ItemID.dustTin, data: 0, chance: 0.05 },
        result3: { id: ItemID.dustNickel, data: 0, chance: 1 },
        energy: 3600,
        isGrinding: true,
        by: "EnderIO"
    });
    RecipeRegistry.addCrusher({
        ingredient: { id: VanillaBlockID.coal_ore, data: 0 },
        result0: { id: 263, data: 0, chance: 1, count: 3 },
        result1: { id: ItemID.dustCoal, data: 0, chance: 0.6 },
        result2: { id: 264, data: 0, chance: 0.001 },
        result3: { id: VanillaBlockID.cobblestone, data: 0, chance: 0.15 },
        energy: 3600,
        isGrinding: true,
        by: "EnderIO"
    });
    RecipeRegistry.addCrusher({
        ingredient: { id: VanillaBlockID.redstone_ore, data: 0 },
        result0: { id: VanillaItemID.redstone, data: 0, chance: 1, count: 8 },
        result1: { id: VanillaItemID.redstone, data: 0, chance: 0.2 },
        result2: { id: ItemID.silicon, data: 0, chance: 0.8 },
        result3: { id: VanillaBlockID.cobblestone, data: 0, chance: 0.15 },
        energy: 3600,
        isGrinding: true,
        by: "EnderIO"
    });
    RecipeRegistry.addCrusher({
        ingredient: { id: VanillaBlockID.diamond_ore, data: 0 },
        result0: { id: 264, data: 0, chance: 1, count: 2 },
        result1: { id: 264, data: 0, chance: 0.25 },
        result2: { id: 263, data: 0, chance: 0.05 },
        result3: { id: VanillaBlockID.cobblestone, data: 0, chance: 0.15 },
        energy: 3600,
        isGrinding: true,
        by: "EnderIO"
    });
    RecipeRegistry.addCrusher({
        ingredient: { id: VanillaBlockID.emerald_ore, data: 0 },
        result0: { id: VanillaItemID.emerald, data: 0, chance: 1, count: 2 },
        result1: { id: VanillaItemID.emerald, data: 0, chance: 0.25 },
        result2: { id: VanillaBlockID.cobblestone, data: 0, chance: 0.15 },
        energy: 3600,
        isGrinding: true,
        by: "EnderIO"
    });
    RecipeRegistry.addCrusher({
        ingredient: { id: VanillaBlockID.lapis_ore, data: 0 },
        result0: { id: VanillaItemID.lapis_lazuli, data: 0, chance: 1, count: 8 },
        result1: { id: ItemID.dustLapis, data: 0, chance: 0.2 },
        result2: { id: 4, data: 0, chance: 0.15 },
        result3: { id: VanillaItemID.lapis_lazuli, data: 0, chance: 0.2 },
        energy: 3600,
        isGrinding: true,
        by: "EnderIO"
    });
    RecipeRegistry.addCrusher({
        ingredient: { id: VanillaBlockID.quartz_ore, data: 0 },
        result0: { id: VanillaItemID.quartz, data: 0, chance: 1, count: 2 },
        result1: { id: ItemID.dustQuarzt, data: 0, chance: 0.1 },
        result2: { id: VanillaBlockID.netherrack, data: 0, chance: 0.15 },
        //result3: { id: VanillaItemID.quartz, data: 0, chance: 0.5 },
        energy: 3600,
        isGrinding: true,
        by: "EnderIO"
    });
    RecipeRegistry.addCrusher({
        ingredient: { id: VanillaBlockID.sand, data: 0 },
        result0: { id: ItemID.silicon, data: 0, chance: 0.5 },
        energy: 720,
        isGrinding: true,
        by: "EnderIO"
    });
    RecipeRegistry.addCrusher({
        isGrinding: true,
        ingredient: { id: 4, data: 0 },
        result0: { id: 13, data: 0, chance: 1 },
        result1: { id: 12, data: 0, chance: 0.35 },
        result2: { id: VanillaItemID.flint, data: 0, chance: 0.1 },
        result3: { id: 0, data: 0, chance: 0 },
        energy: 3600,
        by: "EnderIO"
    });
    RecipeRegistry.addCrusher({
        isGrinding: false,
        ingredient: { id: 13, data: 0 },
        result0: { id: 12, data: 0, chance: 1 },
        result1: { id: VanillaItemID.flint, data: 0, chance: 0.5 },
        result2: { id: 0, data: 0, chance: 0 },
        result3: { id: 0, data: 0, chance: 0 },
        energy: 3600,
        by: "EnderIO"
    });
    RecipeRegistry.addCrusher({
        ingredient: { id: VanillaItemID.quartz, data: 0 },
        result0: { id: ItemID.dustQuarzt, data: 0, chance: 1 },
        result1: { id: ItemID.dustQuarzt, data: 0, chance: 0.1 },
        result2: { id: 0, data: 0, chance: 0 },
        result3: { id: 0, data: 0, chance: 0 },
        energy: 120,
        isGrinding: false,
        by: "EnderIO"
    });
    RecipeRegistry.addCrusher({
        ingredient: { id: VanillaItemID.lapis_lazuli, data: 0 },
        result0: { id: ItemID.dustLapis, data: 0, chance: 1 },
        result1: { id: ItemID.dustLapis, data: 0, chance: 0.1 },
        result2: { id: 0, data: 0, chance: 0 },
        result3: { id: 0, data: 0, chance: 0 },
        energy: 120,
        isGrinding: false,
        by: "EnderIO"
    });
    RecipeRegistry.addCrusher({
        isGrinding: true,
        ingredient: { id: VanillaItemID.coal, data: 0 },
        result0: { id: ItemID.dustCoal, data: 0, chance: 1 },
        result1: { id: ItemID.dustSulfur, data: 0, chance: 0.1 },
        result2: { id: ItemID.dustCoal, data: 0, chance: 0.1 },
        result3: { id: 0, data: 0, chance: 0 },
        energy: 3600,
        by: "EnderIO"
    });
    RecipeRegistry.addCrusher({
        ingredient: { id: VanillaItemID.ender_pearl, data: 0 },
        result0: { id: ItemID.dustEnder, data: 0, chance: 1, count: 1 },
        energy: 1800,
        isGrinding: true,
        by: "EnderIO"
    });
    RecipeRegistry.addCrusher({
        ingredient: { id: 296, data: 0 },
        result0: { id: ItemID.dustWheat, data: 0, chance: 1 },
        result1: { id: VanillaItemID.wheat_seeds, data: 0, chance: 0.45 },
        energy: 1200,
        isGrinding: true,
        by: "EnderIO"
    });
    RecipeRegistry.addCrusher({
        ingredient: { id: ItemID.pulsatingCrystal, data: 0 },
        result0: { id: ItemID.dustPulsating, data: 0, chance: 1, count: 1 },
        energy: 1800,
        isGrinding: false,
        by: "EnderIO"
    });
});
var Machine;
(function (Machine) {
    var SagMill_Basic = /** @class */ (function (_super) {
        __extends(SagMill_Basic, _super);
        function SagMill_Basic() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultValues = {
                energy: 0,
                progress: 0,
                // new feature
                durability: 0,
                maxDurability: 1,
                sag_bonus: 0,
                main: 0,
                pwUse: 0,
            };
            _this.defaultEnergyStorage = 100000;
            _this.defaultEnergyConsume = 30;
            return _this;
        }
        SagMill_Basic.prototype.getScreenByName = function () {
            return SAGGui;
        };
        SagMill_Basic.prototype.setupContainer = function () {
            var _this = this;
            StorageInterface.setGlobalValidatePolicy(this.container, function (name, id, amount, data) {
                if (name.startsWith("slotCapacitor"))
                    return CapacitorAPI.isValidCapacitor(id, _this);
                if (name == "ingredient")
                    return true; // CrusherRecipe.getInput(new ItemStack(id, amount, data));
                if (name.startsWith("slotGrinding"))
                    return GrindingBall.isBallID(id);
                return false;
            });
        };
        SagMill_Basic.prototype.executeBall = function () {
            if (this.data.durability <= 0) {
                this.data.durability = this.data.main = this.data.sag_bonus = this.data.pwUse = 0;
                this.data.maxDurability = 1;
            }
            var slot = this.container.getSlot("slotGrinding");
            if (GrindingBall.isBallID(slot.id) && this.data.durability == 0) {
                var grindingBall = GrindingBall.getBallID(slot.id);
                slot.count--;
                this.data.maxDurability = this.data.durability = grindingBall.durability;
                this.data.main = grindingBall.main;
                this.data.sag_bonus = grindingBall.bonus;
                this.data.pwUse = grindingBall.use;
                this.container.validateAll();
            }
        };
        SagMill_Basic.prototype.run = function () {
            var input = this.container.getSlot("ingredient");
            var res0 = this.container.getSlot("result0");
            var res1 = this.container.getSlot("result1");
            var res2 = this.container.getSlot("result2");
            var res3 = this.container.getSlot("result3");
            var newActive = false;
            var grinding = this.container.getSlot("slotGrinding");
            // cơ chế mài bóng
            this.executeBall();
            // let recipe = CrusherRecipe.getRecipe(input.id, input.data);
            var recipe = CrusherRecipe.getRecipe(input);
            if (recipe) {
                var isGrinding = recipe.isGrinding;
                var ingredient = recipe.ingredient;
                var result0 = recipe.result0;
                var result1 = recipe.result1;
                var result2 = recipe.result2;
                var result3 = recipe.result3;
                var time = recipe.energy;
                if (((res0.id == result0.id && res0.data == result0.data && res0.count + result0.count <= 64) || (res0.id == 0)) &&
                    ((res1.id == result1.id && res1.data == result1.data && res1.count < 64) || (res1.id == 0)) &&
                    ((res2.id == result2.id && res2.data == result2.data && res2.count < 64) || (res2.id == 0)) &&
                    ((res3.id == result3.id && res3.data == result3.data && res3.count < 64) || (res3.id == 0))) {
                    this.processTime = time;
                    var canUseGrinding = isGrinding && this.data.durability > 0;
                    var pw_consump = canUseGrinding ? Math.floor(this.energyConsume * this.data.pwUse) : this.energyConsume;
                    if (this.data.energy >= pw_consump) {
                        newActive = true;
                        this.data.progress += this.energyConsume;
                        this.data.energy -= pw_consump;
                    }
                    if (this.data.progress >= this.processTime) {
                        input.count--;
                        input.markDirty();
                        var outputRandom = Math.random();
                        var outputBonusRandom = canUseGrinding ? (outputRandom * this.data.sag_bonus) : outputRandom;
                        var countOutput = 1;
                        var mainCountIuput = result0.count;
                        if (canUseGrinding && (Math.random() <= this.data.main)) {
                            countOutput = 2;
                            mainCountIuput = result0.count * 2;
                        }
                        if (outputRandom <= result0.chance) {
                            res0.id = result0.id;
                            res0.data = result0.data;
                            res0.count += mainCountIuput;
                            res0.markDirty();
                        }
                        if (outputBonusRandom <= result1.chance) {
                            res1.id = result1.id;
                            res1.data = result1.data;
                            res1.count += countOutput;
                            res1.markDirty();
                        }
                        if (outputBonusRandom <= result2.chance) {
                            res2.id = result2.id;
                            res2.data = result2.data;
                            res2.count += countOutput;
                            res2.markDirty();
                        }
                        if (outputBonusRandom <= result3.chance) {
                            res3.id = result3.id;
                            res3.data = result3.data;
                            res3.count += countOutput;
                            res3.markDirty();
                        }
                        this.container.validateAll();
                        this.data.progress = 0;
                        if (canUseGrinding)
                            this.data.durability--;
                    }
                }
            }
            else {
                this.data.progress = 0;
            }
            this.setActive(newActive);
        };
        SagMill_Basic.prototype.onTick = function () {
            this.useCapacitor();
            StorageInterface.checkHoppers(this);
            var capacitor = this.container.getSlot("slotCapacitor");
            if (CapacitorAPI.isValidCapacitor(capacitor.id, this)) {
                this.container.setText("textInstall", "Installed");
                this.run();
            }
            else {
                this.container.setText("textInstall", "Please put Capacitor in slot capacitor to install function for machine");
            }
            var grindingDura = this.data.durability / this.data.maxDurability;
            this.container.setScale("grindingScale", grindingDura || 0);
            this.container.setScale("progressScale", this.data.progress / this.processTime || 0);
            this.container.setScale("energyScale", this.getRelativeEnergy());
            this.container.sendChanges();
        };
        return SagMill_Basic;
    }(Machine.BasicMachine));
    Machine.SagMill_Basic = SagMill_Basic;
    MachineRegistry.registerPrototype(BlockID.sagmill, new SagMill_Basic());
    StorageInterface.createInterface(BlockID.sagmill, {
        slots: {
            "ingredient": { input: true },
            "result0": { output: true },
            "result1": { output: true },
            "result2": { output: true },
            "result3": { output: true }
        },
        isValidInput: function (item) {
            return !!CrusherRecipe.getInput(item);
        }
    });
})(Machine || (Machine = {}));
BlockRegistry.createBlock("eioTank", [
    {
        name: "tile.block_tank.name",
        texture: [
            ["basic_tank", 0]
        ],
        inCreative: true
    }
], "other-machine");
ICRender.getGroup("liquid_pipe").add(BlockID.eioTank, -1);
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: BlockID.eioTank, count: 1, data: 0 }, [
        "iri",
        "rmr",
        "iri"
    ], ['i', VanillaItemID.iron_ingot, 0, "r", VanillaTileID.iron_bars, 0, "m", VanillaBlockID.glass, -1
    ]);
});
var guiTank = MachineRegistry.createInventoryWindow(Translation.translate("enderio.gui.tank.tank"), {
    drawing: [
        { type: "bitmap", x: 100 + 70 * GUI_SCALE, y: 50 + 16 * GUI_SCALE, bitmap: "liquid_bar", scale: GUI_SCALE },
    ],
    elements: {
        "liquidScale": { type: "scale", x: 100 + 70 * GUI_SCALE, y: 50 + 16 * GUI_SCALE, direction: 1, value: 0.5, bitmap: "gui_water_scale", overlay: "gui_liquid_storage_overlay", scale: GUI_SCALE },
        "slotLiquid1": {
            type: "slot",
            x: 100 + 94 * GUI_SCALE,
            y: 50 + 16 * GUI_SCALE,
            /* isValid: function(id, count, data) {
               return !!LiquidItemRegistry.getEmptyItem(item.id, item.data);
             }*/
        },
        "slotLiquid2": {
            type: "slot",
            x: 170 + 94 * GUI_SCALE,
            y: 50 + 16 * GUI_SCALE,
            /* isValid: function(id, count, data) {
               return !!LiquidItemRegistry.getFullItem(item.id, item.data, "water");
             }*/
        },
        "slotOut": {
            type: "slot",
            x: 100 + 94 * GUI_SCALE,
            y: 50 + 40 * GUI_SCALE,
        },
    }
});
MachineRegistry.createStorageInterface(BlockID.tank, {
    slots: {
        "slotLiquid2": {
            input: true,
            isValid: function (item) {
                return !!LiquidItemRegistry.getFullItem(item.id, item.data, "water");
            }
        },
        "slotLiquid1": {
            input: true,
            isValid: function (item) {
                return !!LiquidItemRegistry.getEmptyItem(item.id, item.data);
            }
        },
        "slotOut": {
            output: true,
        },
    },
    canReceiveLiquid: function () { return true; },
    canTransportLiquid: function () { return true; }
});
var Machine;
(function (Machine) {
    var Tank = /** @class */ (function (_super) {
        __extends(Tank, _super);
        function Tank() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Tank.prototype.getScreenByName = function () {
            return guiTank;
        };
        Tank.prototype.setupContainer = function () {
            this.liquidTank = this.addLiquidTank("fluid", 16000);
            StorageInterface.setGlobalValidatePolicy(this.container, function (name, id, amount, data) {
                if (name == "slotLiquid1")
                    return !!LiquidItemRegistry.getEmptyItem(id, data);
                if (name == "slotLiquid2")
                    return !!LiquidRegistry.getFullItem(id, data, "water");
                if (name == "slotOutput")
                    return false;
                return false;
            });
        };
        Tank.prototype.onItemUse = function (coords, item, player) {
            if (Entity.getSneaking(player)) {
                MachineRegistry.fillTankOnClick(this.liquidTank, item, player);
                this.preventClick();
                return true;
            }
            return _super.prototype.onItemUse.call(this, coords, item, player);
        };
        Tank.prototype.onTick = function () {
            var slot1 = this.container.getSlot("slotLiquid1");
            var slot2 = this.container.getSlot("slotLiquid2");
            var out = this.container.getSlot("slotOut");
            this.liquidTank.getLiquidFromItem(slot1, out);
            this.liquidTank.addLiquidToItem(slot2, out);
            this.liquidTank.updateUiScale("liquidScale");
            this.container.sendChanges();
        };
        Tank.prototype.destroyBlock = function (coords, player) {
            var extra = null;
            var region = BlockSource.getDefaultForActor(player);
            var liquid = this.liquidTank.getLiquidStored();
            if (liquid) {
                extra = new ItemExtraData();
                extra.putString("fluid", liquid);
                extra.putInt("amount", this.liquidTank.getAmount(liquid));
            }
            BlockSource.getDefaultForActor(player).spawnDroppedItem(coords.x + .5, coords.y + .5, coords.z + .5, BlockID.eioTank, 1, 0, extra);
        };
        return Tank;
    }(Machine.MachineBase));
    Machine.Tank = Tank;
    MachineRegistry.registerPrototype(BlockID.eioTank, new Tank());
    MachineRegistry.setTankPlaceFunction("eioTank");
    MachineRegistry.addTankTooltip(BlockID.eioTank);
})(Machine || (Machine = {}));
BlockRegistry.createBlock("killerJoe", [
    {
        name: "tile.block_killer_joe.name",
        texture: [["machineBottom", 0]],
        inCreative: true
    }
], "other-machine");
function setKillerJoeRender() {
    var killerJoeRender = new ICRender.Model();
    var model = BlockRenderer.createModel();
    model.addBox(1 / 16, 0 / 16, 1 / 16, 15 / 16, 1 / 16, 15 / 16, "machineBottom", 0);
    model.addBox(1 / 16, 1 / 16, 14 / 16, 2 / 16, 13 / 16, 15 / 16, "machineBottom", 0);
    model.addBox(14 / 16, 1 / 16, 14 / 16, 15 / 16, 13 / 16, 15 / 16, "machineBottom", 0);
    model.addBox(14 / 16, 1 / 16, 1 / 16, 15 / 16, 13 / 16, 2 / 16, "machineBottom", 0);
    model.addBox(1 / 16, 1 / 16, 1 / 16, 2 / 16, 13 / 16, 2 / 16, "machineBottom", 0);
    model.addBox(1 / 16, 13 / 16, 1 / 16, 15 / 16, 14 / 16, 15 / 16, "machineBottom", 0);
    model.addBox(4 / 16, 2 / 16, 3 / 16, 13 / 16, 12 / 16, 13 / 16, "killerJoeZombieOther", 0);
    model.addBox(3 / 16, 2 / 16, 3 / 16, 4 / 16, 12 / 16, 13 / 16, "killerJoeZombie", 0);
    model.addBox(1 / 16, 1 / 16, 2 / 16, 2 / 16, 13 / 16, 14 / 16, 20, 0);
    model.addBox(2 / 16, 1 / 16, 1 / 16, 14 / 16, 13 / 16, 2 / 16, 20, 0);
    model.addBox(2 / 16, 1 / 16, 14 / 16, 14 / 16, 13 / 16, 15 / 16, 20, 0);
    model.addBox(14 / 16, 1 / 16, 2 / 16, 15 / 16, 13 / 16, 14 / 16, 20, 0);
    killerJoeRender.addEntry(model);
    BlockRenderer.setStaticICRender(BlockID.killerJoe, -1, killerJoeRender);
}
setKillerJoeRender();
/*
Block.setBlockShape(BlockID.killerJoe, { "x": 0, "y": 0, "z": 0 }, { "x": 1, "y": 1, "z": 1 });
*/
var guiKillerJoe = MachineRegistry.createInventoryWindow(Translation.translate("tile.block_killer_joe.name"), {
    drawing: [
        { type: "bitmap", x: 470, y: 66, bitmap: "fluid_scale", scale: 3.2 },
    ],
    elements: {
        "liquidScale": { type: "scale", x: 470, y: 66, direction: 1, bitmap: "fluid_scale", scale: 3.2 },
        "slotSword": { type: "slot", x: 600, y: 60 },
        "slotLiquid1": { type: "slot", x: 600, y: 240 },
        "slotLiquid0": { type: "slot", x: 600, y: 180 },
    }
});
var MOBS = [EEntityType.BAT, EEntityType.CHICKEN, EEntityType.COW, EEntityType.MUSHROOM_COW, EEntityType.OCELOT, EEntityType.PIG, EEntityType.RABBIT, EEntityType.SHEEP, EEntityType.SNOW_GOLEM, EEntityType.SQUID, EEntityType.VILLAGER, EEntityType.WOLF, 23, 24, 25, 26, 27, EEntityType.BLAZE, EEntityType.CAVE_SPIDER, EEntityType.CREEPER, EEntityType.ENDERMAN, EEntityType.GHAST, EEntityType.IRON_GOLEM, EEntityType.LAVA_SLIME, EEntityType.PIG_ZOMBIE, EEntityType.SILVERFISH, EEntityType.SKELETON, EEntityType.SLIME, EEntityType.SPIDER, EEntityType.ZOMBIE, EEntityType.ZOMBIE_VILLAGER, 45, 46, 47, 48, 49, 52, 55];
var Machine;
(function (Machine) {
    var KillerJoe = /** @class */ (function (_super) {
        __extends(KillerJoe, _super);
        function KillerJoe() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KillerJoe.prototype.getScreenByName = function () {
            return guiKillerJoe;
        };
        KillerJoe.prototype.setupContainer = function () {
            this.liquidTank = this.addLiquidTank("fluid", 16000, ["nutrientDistillation"]);
        };
        KillerJoe.prototype.onItemUse = function (coords, item, player) {
            if (Entity.getSneaking(player)) {
                MachineRegistry.fillTankOnClick(this.liquidTank, item, player);
            }
            else if (Entity.getSneaking(player) && item.id == ItemID.itemYetaWrench) {
                var extra = void 0;
                var liquid = this.liquidTank.getLiquidStored();
                if (liquid == "nutrientDistillation") {
                    extra = new ItemExtraData();
                    extra.putString("fluid", liquid);
                    extra.putInt("amount", this.liquidTank.getAmount(liquid));
                    return true;
                }
                this.blockSource.spawnDroppedItem(this.x + .5, this.y + .5, this.z + .5, BlockID.killerJoe, 1, 0);
                this.blockSource.destroyBlock(this.x, this.y, this.z, false);
            }
            return false;
        };
        KillerJoe.prototype.applyDamage = function (slot) {
            var damage = 1;
            if (ChargeItemRegistry.isValidItem(slot.id, "Rf", 5)) {
                ChargeItemRegistry.getEnergyFrom(slot.id, "Rf", 500, 5);
            }
            else if (ChargeItemRegistry.isValidItem(slot.id, "Eu", 5)) {
                ChargeItemRegistry.getEnergyFrom(slot.id, "Eu", 500, 5);
            }
            else if (slot.extra && (!ChargeItemRegistry.isValidItem(slot.id, "Rf", 5) && !ChargeItemRegistry.isValidItem(slot.id, "Eu", 5))) {
                var unbreakingLevel = slot.extra.getEnchantLevel(EEnchantment.UNBREAKING);
                if (Math.random() < (1 / (unbreakingLevel + 1))) {
                    slot.data += damage;
                }
            }
            else {
                slot.data += damage;
            }
            if (slot.data >= Item.getMaxDamage(slot.id) && (!ChargeItemRegistry.isValidItem(slot.id, "Rf", 5) && !ChargeItemRegistry.isValidItem(slot.id, "Eu", 5))) {
                slot.id = slot.data = slot.count = 0;
                slot.extra = null;
            }
        };
        KillerJoe.prototype.onTick = function () {
            var storage = this.liquidTank;
            var slot1 = this.container.getSlot("slotLiquid0");
            var slot2 = this.container.getSlot("slotLiquid1");
            this.liquidTank.getLiquidFromItem(slot1, slot2);
            this.liquidTank.updateUiScale("liquidScale");
            var slotSword = this.container.getSlot("slotSword");
            if (slotSword.id) {
                var dataTool = ToolAPI.getToolData(slotSword.id);
                if (dataTool) {
                    var damageTool = dataTool.damage + dataTool.toolMaterial.damage;
                    if (damageTool > 0) {
                        for (var i in MOBS) {
                            var ent = Entity.findNearest({ x: this.x, y: this.y, z: this.z }, MOBS[i], 7);
                            if (ent && storage.getAmount("nutrientDistillation") >= 0.02 && World.getThreadTime() % 10 == 0) {
                                Entity.damageEntity(ent, damageTool);
                                this.applyDamage(slotSword);
                                storage.getLiquid("nutrientDistillation", 250);
                            }
                        }
                    }
                }
            }
            this.container.sendChanges();
        };
        KillerJoe.prototype.destroyBlock = function (coords, player) {
            var extra;
            var _region = BlockSource.getDefaultForActor(player);
            var liquid = this.liquidTank.getLiquidStored();
            if (liquid == "nutrientDistillation") {
                extra = new ItemExtraData();
                extra.putString("fluid", liquid);
                extra.putInt("amount", this.liquidTank.getAmount(liquid));
            }
            if (extra)
                _region.spawnDroppedItem(coords.x + .5, coords.y + .5, coords.z + .5, BlockID.killerJoe, 1, 0, extra);
            else
                _region.spawnDroppedItem(coords.x + .5, coords.y + .5, coords.z + .5, BlockID.killerJoe, 1, 0);
            //debug;
        };
        return KillerJoe;
    }(Machine.MachineBase));
    Machine.KillerJoe = KillerJoe;
    MachineRegistry.registerPrototype(BlockID.killerJoe, new KillerJoe());
    MachineRegistry.setTankPlaceFunction("killerJoe");
    MachineRegistry.addTankTooltip(BlockID.eioTank);
})(Machine || (Machine = {}));
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: BlockID.killerJoe, count: 1, data: 0 }, [
        "sss",
        "qzq",
        "qqq"
    ], ['s', ItemID.darkSteel, 0, 'q', 20, 0, "z", ItemID.skullZombieController, 0]);
});
// @ts-nocheck
BlockRegistry.createBlock("crafter", [
    {
        name: "tile.block_crafter.name",
        texture: [
            ["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["block_crafter_solid", 0], ["machineSide", 0], ["machineSide", 0]
        ],
        inCreative: true
    }
], "machine");
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: BlockID.crafter, count: 1, data: 0 }, [
        "iai",
        "imi",
        "ici"
    ], ['i', VanillaItemID.iron_ingot, 0, "m", BlockID.machineChassi, 0, "c", ItemID.skullZombieController, 0, "a", VanillaBlockID.crafting_table, 0]);
});
var craftUI = MachineRegistry.createInventoryWindow(Translation.translate("tile.block_crafter.name"), {
    drawing: [
        { type: "bitmap", x: 370, y: 60, bitmap: "redflux_bar0", scale: 3.2 },
    ],
    elements: {
        "textInstall": { type: "text", font: { size: 20, color: Color.YELLOW }, x: 325, y: 50, width: 100, height: 30, text: "" },
        "energyScale": { type: "scale", x: 370, y: 60, direction: 1, bitmap: "redflux_bar1", scale: 3.2 },
        // Capacitor
        "slotCapacitor": { type: "slot", x: 370, y: 230, size: 60 },
        // Input
        "slot0": { type: "slot", x: 470, y: 110, size: 60 },
        "slot1": { type: "slot", x: 530, y: 110, size: 60 },
        "slot2": { type: "slot", x: 590, y: 110, size: 60 },
        "slot3": { type: "slot", x: 470, y: 170, size: 60 },
        "slot4": { type: "slot", x: 530, y: 170, size: 60 },
        "slot5": { type: "slot", x: 590, y: 170, size: 60 },
        "slot6": { type: "slot", x: 470, y: 230, size: 60 },
        "slot7": { type: "slot", x: 530, y: 230, size: 60 },
        "slot8": { type: "slot", x: 590, y: 230, size: 60 },
        "slotInput": {
            type: "slot",
            x: 660,
            y: 170,
            size: 60,
            clicker: {
                onClick: function (position, container, tileEntity) {
                    return;
                },
                onLongClick: function (position, container, tileEntity) {
                    this.onClick(position, container, tileEntity);
                }
            }
        },
        /*
        "iconResult": {
          type: "button",
          x: 575,
          y: 207,
           
          scale: 3.2,
          clicker: {
            onClick: function(_, container: ItemContainer) {}
          }
        },
        "textResult": { type: "text", font: { size: 20, color: Color.YELLOW }, x: 570, y: 214, width: 100, height: 30, text: "" },
    */
        // Output
        "slotI1": { type: "slot", x: 730, y: 110, size: 60 },
        "slotI2": { type: "slot", x: 790, y: 110, size: 60 },
        "slotI3": { type: "slot", x: 850, y: 110, size: 60 },
        "slotI4": { type: "slot", x: 730, y: 170, size: 60 },
        "slotI5": { type: "slot", x: 790, y: 170, size: 60 },
        "slotI6": { type: "slot", x: 850, y: 170, size: 60 },
        "slotI7": { type: "slot", x: 730, y: 230, size: 60 },
        "slotI8": { type: "slot", x: 790, y: 230, size: 60 },
        "slotI9": { type: "slot", x: 850, y: 230, size: 60 },
        "slotResult": { type: "slot", x: 920, y: 170, size: 60 },
    }
});
var Machine;
(function (Machine) {
    var Crafter = /** @class */ (function (_super) {
        __extends(Crafter, _super);
        function Crafter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultValues = {
                energy: 0,
                progress: 0,
            };
            _this.defaultEnergyConsume = 125;
            return _this;
        }
        Crafter.prototype.getScreenByName = function () {
            return craftUI;
        };
        Crafter.prototype.setupContainer = function () {
            var _this = this;
            StorageInterface.setGlobalValidatePolicy(this.container, function (name, id, amount, data) {
                if (name.startsWith("slotCapacitor"))
                    return CapacitorAPI.isValidCapacitor(id, _this);
                if (name.startsWith("slot"))
                    return true;
                return false;
            });
        };
        Crafter.prototype.isProgress = function (res, slot) {
            return this.data.progress <= 2500 && res && this.data.energy >= this.energyConsume && ((slot.id == res.id && slot.data == res.data && slot.count + res.count <= Item.getMaxStack(res.id)) || slot.count <= 0) && this.isInventoryInRecipe();
        };
        Crafter.prototype.getPattern = function () {
            var obj = {};
            for (var i = 0; i < 9; i++) {
                var item = this.container.getSlot("slot" + i);
                if (item.id != 0)
                    obj[item.id + ":" + item.data] = (obj[item.id + ":" + item.data] || 0) + 1;
            }
            return obj;
        };
        Crafter.prototype.getInventory = function () {
            var obj = {};
            for (var i = 1; i <= 9; i++) {
                var item = this.container.getSlot("slotI" + i);
                if (item.id != 0)
                    obj[item.id + ":" + item.data] = (obj[item.id + ":" + item.data] || 0) + item.count;
            }
            return obj;
        };
        Crafter.prototype.isInventoryInRecipe = function () {
            var recipe = this.getPattern();
            var inventory = this.getInventory();
            var keys = Object.keys(recipe);
            for (var i in keys) {
                if (!inventory[keys[i]] || recipe[keys[i]] > inventory[keys[i]])
                    return false;
            }
            return true;
        };
        Crafter.prototype.craft = function () {
            var recipe = this.getPattern();
            var keys = Object.keys(recipe);
            for (var a in keys) {
                var count = recipe[keys[a]];
                for (var i = 1; i <= 10; i++) {
                    var item = this.container.getSlot("slotI" + i);
                    var keys__ = keys[a].split(":");
                    if (count <= 0 || (item.id != parseInt(keys__[0]) && item.data != parseInt(keys__[1])))
                        continue;
                    item.count -= count;
                    count = 0;
                    if (item.count < 0)
                        count -= item.count;
                    this.container.setSlot("slotI" + i, item.id, item.count, item.data, item.extra);
                }
            }
        };
        Crafter.prototype.run = function () {
            var newActive = false;
            this.container.setWorkbenchFieldPrefix("slot");
            var res = Recipes.getRecipeResult(this.container);
            if (res) {
                // this.container.setSlot("slotInput", res.id, res.count, res.data);
                this.container.sendEvent("setIcon", { item: res });
            }
            else {
                // this.container.setSlot("slotInput", 0, 0, 0);
                this.container.sendEvent("setIcon", { item: null });
            }
            var resultSlot = this.container.getSlot("slotResult");
            if (this.isProgress(res, resultSlot)) {
                this.data.progress += this.energyConsume;
                this.data.energy -= this.energyConsume;
                newActive = true;
                if (this.data.progress >= 2500) {
                    resultSlot.id = res.id;
                    resultSlot.data = res.data;
                    resultSlot.count += res.count;
                    this.container.setSlot("slotResult", resultSlot.id, resultSlot.count, resultSlot.data);
                    this.craft();
                    this.data.progress = 0;
                    this.container.validateAll();
                }
            }
            else
                this.data.progress = 0;
            this.setActive(newActive);
        };
        Crafter.prototype.onTick = function () {
            this.useCapacitor();
            StorageInterface.checkHoppers(this);
            var capacitor = this.container.getSlot("slotCapacitor");
            if (CapacitorAPI.isValidCapacitor(capacitor.id, this)) {
                this.container.setText("textInstall", "Installed");
                this.run();
            }
            else {
                this.container.setText("textInstall", "Please put Capacitor in slot capacitor to install function for machine");
            }
            //this.container.setScale("progressScale", this.data.progress / this.processTime || 0);
            this.container.setScale("energyScale", this.getRelativeEnergy());
            this.container.sendChanges();
        };
        Crafter.prototype.destroyBlock = function (coords, player) {
            var region = BlockSource.getDefaultForActor(player);
            this.container.clearSlot("slotInput");
            region.spawnDroppedItem(coords.x + .5, coords.y + .5, coords.z + .5, BlockID.crafter, 1, 0);
        };
        Crafter.prototype.setIcon = function (container, window, content, data) {
            if (content) {
                var gui = container.getUiAdapter();
                if (gui) {
                    gui.setBinding("slotInput", "source", data.item ? { id: data.item.id, count: 1, data: data.item.data } : { id: 0, count: 1, data: 0 });
                }
                // let element = content.elements["iconResult"]
                // let text_e = content.elements["textResult"]
                // if (!!data.item) {
                //   let texture = CraterHelper.getIcon(data.item);
                //   if (element.bitmap != texture) {
                //     element.bitmap = texture
                //     element.visual = true
                //     text_e.text = `${data.item.count}`
                //   }
                // } else {
                //   element.bitmap = "empty"
                //   text_e.text = "0"
                // }
            }
        };
        __decorate([
            Machine.ContainerEvent(Side.Client)
        ], Crafter.prototype, "setIcon", null);
        return Crafter;
    }(Machine.BasicMachine));
    Machine.Crafter = Crafter;
    MachineRegistry.registerPrototype(BlockID.crafter, new Crafter());
})(Machine || (Machine = {}));
StorageInterface.createInterface(BlockID.crafter, {
    slots: {
        "slotI1": { input: true },
        "slotI2": { input: true },
        "slotI3": { input: true },
        "slotI4": { input: true },
        "slotI5": { input: true },
        "slotI6": { input: true },
        "slotI7": { input: true },
        "slotI8": { input: true },
        "slotI9": { input: true },
        "slotResult": { output: true }
    }
});
IDRegistry.genBlockID("theVat");
Block.createBlock("theVat", [{ "name": "tile.block_vat.name", "texture": [["machineBottom", 0]], "inCreative": true }]);
ICRender.getGroup("liquid_pipe").add(BlockID.theVat, -1);
function setVatRender() {
    var vatRender = new ICRender.Model();
    BlockRenderer.setStaticICRender(BlockID.theVat, 0, vatRender);
    var model = BlockRenderer.createModel();
    model.addBox(0.25 / 16, 0.25 / 16, 0.25 / 16, 15.75 / 16, 4 / 16, 15.75 / 16, [["machineBottom", 0], ["machineBottom", 0], ["base", 0], ["base", 0], ["base", 0], ["base", 0]]); //base
    model.addBox(0.25 / 16, 4 / 16, 0.25 / 16, 6.75 / 16, 15.75 / 16, 15.75 / 16, [["machineBottom", 0], ["tank_top_front", 0], ["machineBottom", 0], ["tank_top_front", 1], ["vat_tank_side", 0], ["vat_tank_side", 0]]); //rightTank
    model.addBox(9.25 / 16, 4 / 16, 0.25 / 16, 15.75 / 16, 15.75 / 16, 15.75 / 16, [["machineBottom", 0], ["tank_top_front", 0], ["machineBottom", 0], ["tank_top_front", 1], ["vat_tank_side", 0], ["vat_tank_side", 0]]); //leftTank
    model.addBox(6.75 / 16, 5 / 16, 4 / 16, 9.25 / 16, 12 / 16, 12 / 16, "machineBottom", 0); //center
    model.addBox(6.75 / 16, 13 / 16, 4 / 16, 9.25 / 16, 15 / 16, 12 / 16, "machineBottom", 0); //centerTop
    model.addBox(7.5 / 16, 12 / 16, 1.5 / 16, 8.5 / 16, 13 / 16, 5.5 / 16, "machineBottom", 0); //spout
    model.addBox(7.5 / 16, 12 / 16, 0.4 / 16, 8.5 / 16, 13 / 16, 2.4 / 16, "machineBottom", 0); //spoutTip
    model.addBox(0 / 16, 0 / 16, 0 / 16, 1 / 16, 16 / 16, 1 / 16, "machineBottom", 0); //undefined
    model.addBox(15 / 16, 0 / 16, 0 / 16, 16 / 16, 16 / 16, 1 / 16, "machineBottom", 0); //undefined
    model.addBox(15 / 16, 0 / 16, 15 / 16, 16 / 16, 16 / 16, 16 / 16, "machineBottom", 0); //undefined
    model.addBox(0 / 16, 0 / 16, 15 / 16, 1 / 16, 16 / 16, 16 / 16, "machineBottom", 0); //undefined
    model.addBox(1 / 16, 0 / 16, 0 / 16, 15 / 16, 1 / 16, 1 / 16, "machineBottom", 0); //undefined
    model.addBox(10 / 16, 15 / 16, 0 / 16, 15 / 16, 16 / 16, 1 / 16, "machineBottom", 0); //undefined
    model.addBox(1 / 16, 0 / 16, 15 / 16, 15 / 16, 1 / 16, 16 / 16, "machineBottom", 0); //undefined
    model.addBox(10 / 16, 15 / 16, 15 / 16, 15 / 16, 16 / 16, 16 / 16, "machineBottom", 0); //undefined
    model.addBox(0 / 16, 0 / 16, 1 / 16, 1 / 16, 1 / 16, 15 / 16, "machineBottom", 0); //undefined
    model.addBox(0 / 16, 15 / 16, 1 / 16, 1 / 16, 16 / 16, 15 / 16, "machineBottom", 0); //undefined
    model.addBox(15 / 16, 0 / 16, 1 / 16, 16 / 16, 1 / 16, 15 / 16, "machineBottom", 0); //undefined
    model.addBox(15 / 16, 15 / 16, 1 / 16, 16 / 16, 16 / 16, 15 / 16, "machineBottom", 0); //undefined
    model.addBox(1 / 16, 15 / 16, 15 / 16, 6 / 16, 16 / 16, 16 / 16, "machineBottom", 0); //undefined
    model.addBox(1 / 16, 15 / 16, 0 / 16, 6 / 16, 16 / 16, 1 / 16, "machineBottom", 0); //undefined
    model.addBox(9 / 16, 4.5 / 16, 0 / 16, 10 / 16, 16 / 16, 1 / 16, "machineBottom", 0); //undefined
    model.addBox(6 / 16, 4.5 / 16, 0 / 16, 7 / 16, 16 / 16, 1 / 16, "machineBottom", 0); //undefined
    model.addBox(6 / 16, 4.5 / 16, 15 / 16, 7 / 16, 16 / 16, 16 / 16, "machineBottom", 0); //undefined
    model.addBox(9 / 16, 4.5 / 16, 15 / 16, 10 / 16, 16 / 16, 16 / 16, "machineBottom", 0); //undefined
    model.addBox(6 / 16, 15 / 16, 1 / 16, 7 / 16, 16 / 16, 15 / 16, "machineBottom", 0); //undefined
    model.addBox(9 / 16, 15 / 16, 1 / 16, 10 / 16, 16 / 16, 15 / 16, "machineBottom", 0); //undefined
    model.addBox(6 / 16, 3.5 / 16, 0 / 16, 10 / 16, 4.5 / 16, 1 / 16, "machineBottom", 0); //undefined
    model.addBox(6 / 16, 3.5 / 16, 15 / 16, 10 / 16, 4.5 / 16, 16 / 16, "machineBottom", 0); //undefined
    vatRender.addEntry(model);
}
Block.setBlockShape(BlockID.theVat, { "x": 0, "y": 0, "z": 0 }, { "x": 1, "y": 1, "z": 1 });
setVatRender();
var VatGUI = MachineRegistry.createInventoryWindow(Translation.translate("tile.block_vat.name"), {
    drawing: [
        { type: "bitmap", x: 350, y: -80, bitmap: "backgroundVat", scale: 3.4 },
    ],
    elements: {
        "energyScale": { type: "scale", x: 412, y: 143, direction: 1, bitmap: "redflux_bar1", scale: 2.8 },
        "slotCapacitor": { type: "slot", x: 398, y: 302, size: 60, bitmap: "empty" },
        "slotInput0": {
            type: "slot",
            x: 560,
            y: 140,
            size: 60,
            bitmap: "empty",
            isTransparentBackground: true
        },
        "slotInput1": {
            type: "slot",
            x: 728,
            y: 140,
            size: 60,
            bitmap: "empty",
            isTransparentBackground: true
        },
        "textInstall": { type: "text", font: { size: 20, color: Color.YELLOW }, x: 325, y: 50, width: 100, height: 30, text: "" },
        "liquidScale1": { type: "scale", x: 473, y: 132, direction: 1, bitmap: "fluid_scale", scale: 2.9 },
        "liquidScale2": { type: "scale", x: 824, y: 132, direction: 1, bitmap: "fluid_scale", scale: 2.9 },
        "progressScale": {
            type: "scale",
            x: 646,
            y: 317,
            direction: 1,
            bitmap: "fire_scale1",
            scale: 3.3,
            clicker: {
                onClick: function () {
                    RV === null || RV === void 0 ? void 0 : RV.RecipeTypeRegistry.openRecipePage("ender_vat");
                }
            }
        },
        "slot1": { type: "slot", x: 470, y: 320, size: 60, bitmap: "slot_fluid_full" },
        "slot3": { type: "slot", x: 820, y: 320, size: 60, bitmap: "slot_fluid_empty", },
        "slot2": { type: "slot", x: 470, y: 380, size: 60, bitmap: "slot_fluid_empty" },
        "slot4": { type: "slot", x: 820, y: 380, size: 60, bitmap: "slot_fluid_full" },
    }
});
/*
Vat recipes take two item inputs and one fluid input, and output a fluid.
The various values are calculated like this:
  For:
  ingredient multiplier(IM) = slot0.multiplier * slot1.multiplier;
input fluid volume(mb) = IM * 1000
Produce:
  output fluid volume(mb) = IM * inputFluid.multiplier * 1000.
*/
VatRecipe.add({
    input1: {
        "minecraft:rotten_flesh": 1.5,
        "minecraft:chicken": 0.75,
        "minecraft:beef": 0.75,
        "minecraft:porkchop": 0.75,
        "minecraft:rabbit": 0.75,
        "minecraft:mutton": 0.75
    },
    input2: {
        "minecraft:sugar": 1,
        "minecraft:brown_mushroom": 1.5,
        "minecraft:red_mushroom": 1.5,
        "minecraft:nether_wart": 1.5,
        "minecraft:fermented_spider_eye": 2
    },
    inputLiquid: "water",
    inputMutilplier: 0.25,
    outputLiquid: "nutrientDistillation",
    energy: 10000
});
VatRecipe.add({
    input1: {
        "ItemID.dustPulsating": 2
    },
    input2: {
        "ItemID.dustEnderCrystal": 2
    },
    inputLiquid: "nutrientDistillation",
    inputMutilplier: 0.25,
    outputLiquid: "enderDistillation",
    energy: 15000
});
VatRecipe.add({
    input1: {
        "minecraft:poisonous_potato": "8.0",
        "minecraft:potato": "4.0",
        "minecraft:apple": "3.5",
        "minecraft:wheat": "3.0",
        "ItemID.dustWheat": "3.0",
        "minecraft:wheat_seeds": "2.0",
        "minecraft:pumpkin_seeds": "1.6",
        "minecraft:melon_seeds": "1.6",
        "minecraft:beetroot_seeds": "1.4",
    },
    input2: {
        "minecraft:melon": 0.2,
        "minecraft:sugar": 1
    },
    inputLiquid: "water",
    inputMutilplier: 0.25,
    outputLiquid: "hootch",
    energy: 10000
});
VatRecipe.add({
    input1: {
        "minecraft:gunpowder": 1,
    },
    input2: {
        "minecraft:redstone": 1
    },
    inputLiquid: "hootch",
    inputMutilplier: 1,
    outputLiquid: "rocketFuel",
    energy: 10000
});
VatRecipe.add({
    input1: {
        "minecraft:gunpowder": 1,
    },
    input2: {
        "minecraft:blaze_powder": 1
    },
    inputLiquid: "hootch",
    inputMutilplier: 1,
    outputLiquid: "fireWater",
    energy: 10000
});
VatRecipe.add({
    input1: {
        "minecraft:glowstone_dust": 0.25,
        "minecraft:glowstone": 1,
    },
    input2: {
        "minecraft:double_plant:0": 1
    },
    inputLiquid: "fireWater",
    inputMutilplier: 1,
    outputLiquid: "sunshine",
    energy: 10000
});
VatRecipe.add({
    input1: {
        "ItemID.dustSilver": 2.5,
        "ItemID.dustSalt": 1.5,
        "ItemID.dustElectrum": 3.5,
        "minecraft:clay_ball": 0.25,
        "minecraft:clay": 1
    },
    input2: {},
    inputLiquid: "cloudSeed",
    inputMutilplier: 0.5,
    outputLiquid: "cloudSeedConcentrated",
    energy: 10000
});
VatRecipe.add({
    input1: {
        "ItemID.dustSilver": 3.5,
        "ItemID.dustSalt": 2.5,
        "minecraft:clay_ball": 0.5,
        "minecraft:clay": 2
    },
    input2: {
        "minecraft:packed_ice": 1.5,
        "minecraft:ice": 1,
        "minecraft:snowball": 0.1,
        "minecraft:snow": 0.5
    },
    inputLiquid: "water",
    inputMutilplier: 1,
    outputLiquid: "cloudSeed",
    energy: 10000
});
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: BlockID.theVat, count: 1, data: 0 }, [
        "ici",
        "rmr",
        "gfg"
    ], ['i', ItemID.electricalSteel, 0, 'c', 380, 0, "r", BlockID.eioTank, 0, 'f', VanillaBlockID.furnace, 0, "m", BlockID.machineChassi, 0, "g", ItemID.darkSteel, 0
    ]);
});
var Machine;
(function (Machine) {
    var TheVat_Basic = /** @class */ (function (_super) {
        __extends(TheVat_Basic, _super);
        function TheVat_Basic() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultValues = {
                energy: 0,
                progress: 0,
                mode: 0
            };
            _this.defaultEnergyStorage = 100000;
            _this.defaultEnergyConsume = 30;
            return _this;
        }
        TheVat_Basic.prototype.getScreenByName = function () {
            return VatGUI;
        };
        TheVat_Basic.prototype.setupContainer = function () {
            var _this = this;
            this.inputTank = this.addLiquidTank("inputTank", 5000, VatRecipe.getLiquidInput());
            this.outputTank = this.addLiquidTank("outputTank", 5000, VatRecipe.getLiquidOutput());
            StorageInterface.setGlobalValidatePolicy(this.container, function (name, id, amount, data) {
                if (name.startsWith("slotCapacitor"))
                    return CapacitorAPI.isValidCapacitor(id, _this);
                if (name.startsWith("slot"))
                    return true;
                return false;
            });
        };
        ;
        TheVat_Basic.prototype.run = function () {
            var newActive = false;
            var ingredient1 = this.container.getSlot("slotInput0");
            var ingredient2 = this.container.getSlot("slotInput1");
            var result = VatRecipe.getResult(ingredient1, ingredient2, this.inputTank);
            if (result) {
                var time = result.energy;
                var outputID = result.liquidOut;
                var outputAmount = result.amount;
                this.processTime = time;
                if ((this.outputTank.getLiquidStored() == outputID &&
                    this.outputTank.getAmount(outputID) <= (this.outputTank.getLimit() - outputAmount)) ||
                    !this.outputTank.getLiquidStored()) {
                    if (this.data.energy >= this.energyConsume) {
                        this.data.progress += this.energyConsume;
                        this.data.energy -= this.energyConsume;
                        newActive = true;
                        if (this.data.progress >= this.processTime) {
                            VatRecipe.performRecipe(result, this);
                        }
                    }
                }
            }
            else {
                this.data.progress = 0;
            }
            this.setActive(newActive);
        };
        TheVat_Basic.prototype.onTick = function () {
            this.useCapacitor();
            StorageInterface.checkHoppers(this);
            var capacitor = this.container.getSlot("slotCapacitor");
            if (CapacitorAPI.isValidCapacitor(capacitor.id, this)) {
                this.container.setText("textInstall", "Installed");
                this.run();
            }
            else {
                this.container.setText("textInstall", "Please put Capacitor in slot capacitor to install function for machine");
            }
            var slot1 = this.container.getSlot("slot1");
            var slot2 = this.container.getSlot("slot2");
            this.inputTank.getLiquidFromItem(slot1, slot2);
            var slot3 = this.container.getSlot("slot3");
            var slot4 = this.container.getSlot("slot4");
            this.outputTank.addLiquidToItem(slot3, slot4);
            this.inputTank.updateUiScale("liquidScale1");
            this.outputTank.updateUiScale("liquidScale2");
            this.container.setScale("progressScale", this.data.progress / this.processTime || 0);
            this.container.setScale("energyScale", this.getRelativeEnergy());
            this.container.sendChanges();
        };
        return TheVat_Basic;
    }(Machine.BasicMachine));
    Machine.TheVat_Basic = TheVat_Basic;
    MachineRegistry.registerPrototype(BlockID.theVat, new TheVat_Basic());
    MachineRegistry.createStorageInterface(BlockID.theVat, {
        slots: {
            "slotInput0": {
                input: true,
            },
            "slotInput1": {
                input: true,
            },
            "slot1": {
                input: true,
            },
            "slot2": {
                output: true,
                isValid: function (item) {
                    return item.id == VanillaItemID.bucket;
                }
            },
            "slot3": {
                input: true,
                isValid: function (item) {
                    return item.id == VanillaItemID.bucket;
                }
            },
            "slot4": {
                output: true
            },
        },
        canReceiveLiquid: function () { return true; },
        canTransportLiquid: function () { return true; },
        getInputTank: function (side) {
            return this.tileEntity.inputTank;
        },
        getOutputTank: function () {
            return this.tileEntity.outputTank;
        }
    });
})(Machine || (Machine = {}));
BlockRegistry.createBlock("soulBinder", [
    {
        name: "tile.block_soul_binder.name",
        texture: [
            ["blockSoulMachineBottom", 0], ["blockSoulMachineTop", 0], ["blockSoulBinder", 0], ["blockSoulBinder", 1], ["blockSoulBinder", 2], ["blockSoulBinder", 3]
        ],
        inCreative: true
    }
], "machine");
TileRenderer.setHandAndUiModel(BlockID.soulBinder, 0, [
    ["blockSoulMachineBottom", 0], ["blockSoulMachineTop", 0], ["blockSoulBinder", 0], ["blockSoulBinder", 1], ["blockSoulBinder", 2], ["blockSoulBinder", 3]
]);
TileRenderer.setStandardModelWithRotation(BlockID.soulBinder, 2, [["blockSoulMachineBottom", 0], ["blockSoulMachineTop", 0], ["blockSoulBinder", 0], ["blockSoulBinder", 1], ["blockSoulBinder", 2], ["blockSoulBinder", 3]]);
TileRenderer.registerModelWithRotation(BlockID.soulBinder, 2, [
    ["blockSoulMachineBottom", 0], ["blockSoulMachineTop", 0], ["blockSoulBinder", 0], ["blockSoulBinder", 1], ["blockSoulBinder", 2], ["blockSoulBinder", 3]
]);
TileRenderer.setRotationFunction(BlockID.soulBinder);
var soulBinderGUI = MachineRegistry.createInventoryWindow(Translation.translate("tile.block_soul_binder.name"), {
    drawing: [
        { type: "bitmap", x: 335, y: 140, bitmap: "redflux_bar0", scale: 3.2 },
        { type: "bitmap", x: 600, y: 205, bitmap: "bar_progress0", scale: 3.2 },
    ],
    elements: {
        "textInstall": { type: "text", font: { size: 20, color: Color.YELLOW }, x: 325, y: 50, width: 100, height: 30, text: "" },
        "energyScale": { type: "scale", x: 335, y: 140, direction: 1, bitmap: "redflux_bar1", scale: 3.2 },
        "progressScale": {
            type: "scale",
            x: 600,
            y: 205,
            bitmap: "bar_progress1",
            scale: 3.2,
            clicker: {
                onClick: function () {
                    RV === null || RV === void 0 ? void 0 : RV.RecipeTypeRegistry.openRecipePage("ender_soulbinder");
                }
            }
        },
        "slotInput0": { type: "slot", x: 450, y: 200 },
        "slotInput1": { type: "slot", x: 510, y: 200 },
        "slotOutput0": { type: "slot", x: 700, y: 200 },
        "slotOutput1": { type: "slot", x: 760, y: 200 },
        "slotCapacitor": { type: "slot", x: 325, y: 320 },
        // xp
        "xp-1": {
            type: "button",
            x: 460,
            y: 320,
            bitmap: "RS_empty_button",
            bitmap2: "RS_empty_button_pressed",
            scale: 2.2,
            clicker: {
                onClick: function (_, container) {
                    container.sendEvent("addXP", {});
                }
            }
        },
        "xp-1_image": { type: "image", x: 460, y: 320, z: 10, bitmap: "ExperienceObelisk-1", scale: 2.2 },
        "xp": { type: "text", x: 560, y: 330, z: 10, text: "0", font: { color: Color.GREEN, shadow: 0.5, size: 20 } }
    }
});
Callback.addCallback("PreLoaded", function () {
    RecipeRegistry.addSBinder({
        soul: "minecraft:enderman",
        lvl: 8,
        ingredient: { id: ItemID.vibrantCrystal, data: 0, count: 1 },
        result0: { id: ItemID.enderCrystal, data: 0, count: 1 },
        //result1 : { id: number, data: number, count: number },
        energy: 150000
    });
});
var Machine;
(function (Machine) {
    var SoulBinder = /** @class */ (function (_super) {
        __extends(SoulBinder, _super);
        function SoulBinder() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultValues = {
                energy: 0,
                progress: 0
            };
            _this.defaultEnergyStorage = 100000;
            _this.defaultEnergyConsume = 30;
            return _this;
        }
        SoulBinder.prototype.setupContainer = function () {
            var _this = this;
            this.liquidTank = this.addLiquidTank("fluid", 2000000000, ["xpjuice"]);
            StorageInterface.setGlobalValidatePolicy(this.container, function (name, id, amount, data) {
                if (name.startsWith("slotCapacitor"))
                    return CapacitorAPI.isValidCapacitor(id, _this);
                if (name.startsWith("slotInput"))
                    return true;
                return false;
            });
        };
        SoulBinder.prototype.getScreenByName = function () {
            return soulBinderGUI;
        };
        SoulBinder.prototype.run = function () {
            var newActive = false;
            var input0 = this.container.getSlot("slotInput0");
            var input1 = this.container.getSlot("slotInput1");
            var output0 = this.container.getSlot("slotOutput0");
            var output1 = this.container.getSlot("slotOutput1");
            var soul_type = SoulRecipe.getTypeSoul(input0);
            if (!!soul_type) {
                var cur_level = ObeliskCore.XPtoLVL(ObeliskCore.LiquidtoXP(this.liquidTank.getAmount("xpjuice"))).lvl;
                var recipe = SoulRecipe.getRecipe(input1, soul_type, cur_level);
                if (recipe) {
                    var r_soul = recipe.soul;
                    var r_lvl = recipe.lvl;
                    var r_ingredient = recipe.ingredient;
                    var r_result = recipe.result0;
                    var r_energy = recipe.energy;
                    if ((output0.id == r_result.id && (output0.data == r_result.data || output0.data == -1) && output0.count >= r_result.count) || !output0.id && ((output1.id == ItemID.soulVesselEmpty && output1.count < 64) || !output1.id)) {
                        this.processTime = r_energy;
                        if (this.data.energy >= this.energyConsume) {
                            newActive = true;
                            this.data.progress += this.energyConsume;
                            this.data.energy -= this.energyConsume;
                        }
                        if (this.data.progress >= this.processTime) {
                            input0.count--;
                            input0.markDirty();
                            input1.count--;
                            input1.markDirty();
                            output0.id = r_result.id;
                            output0.data = r_result.data;
                            output0.count += r_result.count;
                            output0.extra = r_result.extra ? r_result.extra : null;
                            output0.markDirty();
                            output1.id = ItemID.soulVesselEmpty;
                            output1.data = 0;
                            output1.count++;
                            output1.extra = null;
                            output1.markDirty();
                            this.liquidTank.getLiquid("xpjuice", ObeliskCore.XPtoLiquid(r_lvl));
                            this.container.validateAll();
                            this.data.progress = 0;
                        }
                    }
                }
                else {
                    this.data.progress = 0;
                }
            }
            this.setActive(newActive);
        };
        SoulBinder.prototype.onTick = function () {
            this.useCapacitor();
            StorageInterface.checkHoppers(this);
            var capacitor = this.container.getSlot("slotCapacitor");
            if (CapacitorAPI.isValidCapacitor(capacitor.id, this)) {
                this.container.setText("textInstall", "Installed");
                this.run();
            }
            else {
                this.container.setText("textInstall", "Please put Capacitor in slot capacitor to install function for machine");
            }
            var xp_data = ObeliskCore.XPtoLVL(ObeliskCore.LiquidtoXP(this.liquidTank.getAmount("xpjuice")));
            this.container.setText("xp", "LV:" + xp_data.lvl + " |Remain XP: " + xp_data.rem);
            this.container.setScale("energyScale", this.getRelativeEnergy());
            this.container.setScale("progressScale", this.data.progress / this.processTime || 0);
            this.container.sendChanges();
        };
        SoulBinder.prototype.destroyBlock = function (coords, player) {
            var extra;
            var region = BlockSource.getDefaultForActor(player);
            var liquid = this.liquidTank.getLiquidStored();
            if (liquid == "xpjuice") {
                extra = new ItemExtraData();
                extra.putString("fluid", liquid);
                extra.putInt("amount", this.liquidTank.getAmount(liquid));
            }
            region.spawnDroppedItem(coords.x + .5, coords.y + .5, coords.z + .5, BlockID.experience_obelisk, 1, 0, extra);
        };
        SoulBinder.prototype.addXP = function (eventData, connectedClient) {
            var player = new PlayerActor(connectedClient.getPlayerUid());
            var player_lvl = player.getLevel();
            if (player_lvl == 0)
                return;
            var player_xp = player.getExperience();
            var xp = player_xp - ObeliskCore.LVLtoXP(player_lvl - 1);
            ObeliskCore.setPlayerXp(player, player_xp - xp);
            this.liquidTank.addLiquid("xpjuice", ObeliskCore.XPtoLiquid(xp));
        };
        __decorate([
            Machine.ContainerEvent(Side.Server)
        ], SoulBinder.prototype, "addXP", null);
        return SoulBinder;
    }(Machine.BasicMachine));
    Machine.SoulBinder = SoulBinder;
    MachineRegistry.registerPrototype(BlockID.soulBinder, new SoulBinder());
    MachineRegistry.setTankPlaceFunction("soulBinder");
    MachineRegistry.addTankTooltip(BlockID.soulBinder);
})(Machine || (Machine = {}));
BlockRegistry.createBlock("sliceAndSplice", [
    {
        name: "tile.block_slice.name",
        texture: [["blockSoulMachineBottom", 0], ["blockSoulMachineTop", 0], ["blockSoulMachineSide", 0], ["sliceAndSpliceFront", 0], ["blockSoulMachineSide", 0], ["blockSoulMachineSide", 0]],
        inCreative: true
    }
], "machine");
TileRenderer.setHandAndUiModel(BlockID.sliceAndSplice, 0, [["blockSoulMachineBottom", 0], ["blockSoulMachineTop", 0], ["blockSoulMachineSide", 0], ["sliceAndSpliceFront", 0], ["blockSoulMachineSide", 0], ["blockSoulMachineSide", 0]]);
TileRenderer.setStandardModelWithRotation(BlockID.sliceAndSplice, 2, [["blockSoulMachineBottom", 0], ["blockSoulMachineTop", 0], ["blockSoulMachineSide", 0], ["sliceAndSpliceFront", 0], ["blockSoulMachineSide", 0], ["blockSoulMachineSide", 0]]);
TileRenderer.registerModelWithRotation(BlockID.sliceAndSplice, 2, [["blockSoulMachineBottom", 0], ["blockSoulMachineTop", 0], ["blockSoulMachineSide", 0], ["sliceAndSpliceFrontOn", 0], ["blockSoulMachineSide", 0], ["blockSoulMachineSide", 0]]);
TileRenderer.setRotationFunction(BlockID.sliceAndSplice);
var SliceAndSpliceGUI = MachineRegistry.createInventoryWindow(Translation.translate("tile.block_slice.name"), {
    drawing: [
        { type: "bitmap", x: 335, y: 140, bitmap: "redflux_bar0", scale: 3.2 },
        { type: "bitmap", x: 630, y: 235, bitmap: "bar_progress0", scale: 3.2 },
    ],
    elements: {
        "textInstall": { type: "text", font: { size: 20, color: Color.YELLOW }, x: 325, y: 50, width: 100, height: 30, text: "" },
        "energyScale": { type: "scale", x: 335, y: 140, direction: 1, bitmap: "redflux_bar1", scale: 3.2 },
        "progressScale": {
            type: "scale",
            x: 630,
            y: 235,
            bitmap: "bar_progress2",
            scale: 3.2,
            clicker: {
                onClick: function () {
                    RV && RV.RecipeTypeRegistry.openRecipePage("enderio_sas");
                }
            }
        },
        "slotInput0": { type: "slot", x: 400, y: 200 },
        "slotInput1": { type: "slot", x: 460, y: 200 },
        "slotInput2": { type: "slot", x: 520, y: 200 },
        "slotInput3": { type: "slot", x: 400, y: 260 },
        "slotInput4": { type: "slot", x: 460, y: 260 },
        "slotInput5": { type: "slot", x: 520, y: 260 },
        "slotOutput": { type: "slot", x: 720, y: 230 },
        "slotAxe": { type: "slot", x: 430, y: 140 },
        "slotShears": { type: "slot", x: 490, y: 140 },
        "slotCapacitor": { type: "slot", x: 325, y: 320 },
        "text": { type: "text", x: 400, y: 100, width: 100, height: 30, text: "RF" },
    }
});
var accept_axe = {};
var accept_shear = {};
Callback.addCallback("PreLoaded", function () {
    for (var id in VanillaItemID) {
        if (id.endsWith("_axe") && !id.startsWith("wooden") && !id.startsWith("stone")) {
            accept_axe[id] = true;
        }
    }
    for (var id in ItemID) {
        if (id.endsWith("Axe")) {
            accept_axe[id] = true;
        }
    }
    for (var id in ItemID) {
        if (id.endsWith("Shear")) {
            accept_shear[id] = true;
        }
    }
    accept_shear[VanillaItemID.shears] = true;
    Recipes.addShaped({ id: BlockID.sliceAndSplice, count: 1, data: 0 }, [
        "shs",
        "amc",
        "sss"
    ], ['s', ItemID.soularium, 0, 'h', 397, -1, "a", 258, 0, "c", 359, 0, "m", BlockID.machineChassiSoul, 0]);
    RecipeRegistry.addSliceAndSplice({
        input0: { id: ItemID.soularium, data: 0, count: 1 },
        input1: { id: ItemID.zombieSkull, data: 0, count: 1 },
        input2: { id: ItemID.soularium, data: 0, count: 1 },
        input3: { id: ItemID.silicon, data: 0, count: 1 },
        input4: { id: 331, data: 0, count: 1 },
        input5: { id: ItemID.silicon, data: 0, count: 1 },
        result: { id: ItemID.skullZombieController, data: 0, count: 1 },
        energy: 20000
    });
    RecipeRegistry.addSliceAndSplice({
        input0: { id: ItemID.energeticAlloy, data: 0, count: 1 },
        input1: { id: ItemID.zombieSkull, data: 0, count: 1 },
        input2: { id: ItemID.energeticAlloy, data: 0, count: 1 },
        input3: { id: ItemID.silicon, data: 0, count: 1 },
        input4: { id: ItemID.basicCapacitor, data: 0, count: 1 },
        input5: { id: ItemID.silicon, data: 0, count: 1 },
        result: { id: ItemID.skullZombieElectrode, data: 0, count: 1 },
        energy: 20000
    });
    /*
    MachineRecipe.addSliceAndSpliceRecipe(
    [ItemID.soulariumIngot, , ItemID.soulariumIngot,
     ItemID.silicon, 331, ItemID.silicon], {}
    );*/
});
var Machine;
(function (Machine) {
    var SliceAndSplice = /** @class */ (function (_super) {
        __extends(SliceAndSplice, _super);
        function SliceAndSplice() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultValues = {
                energy: 0,
                progress: 0
            };
            _this.defaultEnergyStorage = 100000;
            _this.defaultEnergyConsume = 80;
            _this.processTime = 250;
            return _this;
        }
        SliceAndSplice.prototype.getScreenByName = function () {
            return SliceAndSpliceGUI;
        };
        SliceAndSplice.prototype.setupContainer = function () {
            var _this = this;
            StorageInterface.setGlobalValidatePolicy(this.container, function (name, id, amount, data) {
                if (name.startsWith("slotCapacitor"))
                    return CapacitorAPI.isValidCapacitor(id, _this);
                if (name == "slotInput")
                    return SliceAndSpliceRecipe.getRecipeWithItem({ id: id, data: data, count: amount });
                if (name.startsWith("slotAxe"))
                    return accept_axe[id];
                if (name.startsWith("slotShear"))
                    return accept_shear[id];
                return false;
            });
        };
        SliceAndSplice.prototype.getAxe = function () {
            var slotAxe = this.container.getSlot("slotAxe");
            if (accept_axe[slotAxe.id])
                return !!accept_axe[slotAxe.id];
        };
        SliceAndSplice.prototype.getShears = function () {
            var slotShears = this.container.getSlot("slotShears");
            if (accept_shear[slotShears.id])
                return !!accept_shear[slotShears.id];
        };
        SliceAndSplice.prototype.applyDamage = function (slot) {
            var unbreakingLevel = slot.extra.getEnchantLevel(EEnchantment.UNBREAKING);
            if (Math.random() < (1 / (unbreakingLevel + 1))) {
                slot.data += 1;
            }
            if (slot.data >= Item.getMaxDamage(slot.id)) {
                slot.id = slot.data = slot.count = 0;
                slot.extra = null;
            }
        };
        SliceAndSplice.prototype.decreaseAllSlot = function (count) {
            var slot0 = this.container.getSlot("slotInput0");
            var slot1 = this.container.getSlot("slotInput1");
            var slot2 = this.container.getSlot("slotInput2");
            var slot3 = this.container.getSlot("slotInput3");
            var slot4 = this.container.getSlot("slotInput4");
            var slot5 = this.container.getSlot("slotInput5");
            this.decreaseSlot(slot0, count);
            this.decreaseSlot(slot1, count);
            this.decreaseSlot(slot2, count);
            this.decreaseSlot(slot3, count);
            this.decreaseSlot(slot4, count);
            this.decreaseSlot(slot5, count);
        };
        SliceAndSplice.prototype.run = function () {
            var newActive = false;
            var output = this.container.getSlot("slotOutput");
            var slotShears = this.container.getSlot("slotShears");
            var recipe = SliceAndSpliceRecipe.getRecipe(this.container);
            var slotAxe = this.container.getSlot("slotAxe");
            if (recipe && this.getAxe() && this.getShears() && ((output.id == recipe.result.id && output.count < 64 + recipe.result.count && output.data == recipe.result.data) || output.id == 0)) {
                if (this.data.energy >= this.energyConsume) {
                    this.data.progress += this.energyConsume;
                    this.data.energy -= this.energyConsume;
                    this.processTime = recipe.energy;
                    newActive = true;
                    if (this.data.progress >= this.processTime) {
                        this.decreaseAllSlot(1);
                        output.id = recipe.result.id;
                        output.data = recipe.result.data;
                        output.count++;
                        output.markDirty();
                        newActive = false;
                        this.applyDamage(slotShears);
                        this.applyDamage(slotAxe);
                        this.data.progress = 0;
                        this.container.validateAll();
                    }
                }
            }
            else {
                this.data.progress = 0;
            }
            this.setActive(newActive);
        };
        SliceAndSplice.prototype.onTick = function () {
            this.useCapacitor();
            StorageInterface.checkHoppers(this);
            var capacitor = this.container.getSlot("slotCapacitor");
            if (CapacitorAPI.isValidCapacitor(capacitor.id, this)) {
                this.container.setText("textInstall", "Installed");
                this.run();
            }
            else {
                this.container.setText("textInstall", "Please put Capacitor in slot capacitor to install function for machine");
            }
            var energyStorage = this.getEnergyStorage();
            this.data.energy = Math.min(this.data.energy, energyStorage);
            this.container.setScale("energyScale", this.data.energy / energyStorage);
            this.container.setScale("progressScale", this.data.progress / this.processTime || 0);
            this.container.setText("text", "RF: " + this.data.energy + "/" + energyStorage);
            this.container.sendChanges();
        };
        SliceAndSplice.prototype.getEnergyStorage = function () {
            return this.energyStorage;
        };
        return SliceAndSplice;
    }(Machine.BasicMachine));
    Machine.SliceAndSplice = SliceAndSplice;
})(Machine || (Machine = {}));
/*
TileRenderer.setHandAndUiModel(BlockID.bankBasic, 0, [["capacitorBank", 0], ["capacitorBank", 0], ["capacitorBank", 0], ["capacitorBankFront", 0], ["capacitorBank", 0], ["capacitorBank", 0]]);
TileRenderer.setStandardModel(BlockID.bankBasic, 0, [["capacitorBank", 0], ["capacitorBank", 0], ["capacitorBank", 0], ["capacitorBankFront", 0], ["capacitorBank", 0], ["capacitorBank", 0]]);
TileRenderer.setStandardModelWithRotation(BlockID.bankBasic, 2, ["capacitorBank", 0], ["capacitorBank", 0], ["capacitorBank", 0], ["capacitorBankFront", 0], ["capacitorBank", 0], ["capacitorBank", 0]);
*/
BlockRegistry.createBlock("bankBasic", [
    { name: "tile.block_cap_bank.simple.name", texture: [["capacitorBank", 0], ["capacitorBank", 0], ["capacitorBank", 0], ["capacitorBankFront", 0], ["capacitorBank", 0], ["capacitorBank", 0]], inCreative: true }
], "machine");
BlockRegistry.setBlockMaterial(BlockID.bankBasic, "stone");
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: BlockID.bankBasic, count: 1, data: 0 }, [
        "ici",
        "crc",
        "ici"
    ], ['i', 265, 0, 'c', ItemID.basicCapacitor, 0, "r", BlockID.machineChassi, 0]);
});
var guiBasicCapacitor = CapacitorBlockWindow(Translation.translate("tile.block_cap_bank.simple.name"));
var Machine;
(function (Machine) {
    var BasicCapcitor = /** @class */ (function (_super) {
        __extends(BasicCapcitor, _super);
        function BasicCapcitor() {
            return _super.call(this, 1, 500, 1000000, guiBasicCapacitor) || this;
        }
        return BasicCapcitor;
    }(Machine.CapacitorBlock));
    MachineRegistry.registerPrototype(BlockID.bankBasic, new BasicCapcitor());
    MachineRegistry.setStoragePlaceFunction("bankBasic", true);
})(Machine || (Machine = {}));
BlockRegistry.createBlock("bankVibrant", [
    { name: "tile.block_cap_bank.vibrant.name", texture: [["capacitorBankVibrant", 0], ["capacitorBankVibrant", 0], ["capacitorBankVibrant", 0], ["capacitorBankVibrantFront", 0], ["capacitorBankVibrant", 0], ["capacitorBankVibrant", 0]], inCreative: true }
], "machine");
BlockRegistry.setBlockMaterial(BlockID.bankVibrant, "stone");
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: BlockID.bankVibrant, count: 1, data: 0 }, [
        "scs",
        "crc",
        "scs"
    ], ['s', ItemID.electricalSteel, 0, 'c', ItemID.octadicCapacitor, 0, "r", 152, 0]);
});
var guiVibrantCapacitor = CapacitorBlockWindow(Translation.translate("tile.block_cap_bank.vibrant.name"));
var Machine;
(function (Machine) {
    var VibrantCapcitor = /** @class */ (function (_super) {
        __extends(VibrantCapcitor, _super);
        function VibrantCapcitor() {
            return _super.call(this, 4, 1280, 25000000, guiVibrantCapacitor) || this;
        }
        return VibrantCapcitor;
    }(Machine.CapacitorBlock));
    MachineRegistry.registerPrototype(BlockID.bankVibrant, new VibrantCapcitor());
    MachineRegistry.setStoragePlaceFunction("bankVibrant", true);
})(Machine || (Machine = {}));
var Machine;
(function (Machine) {
    var SimpleMachine = /** @class */ (function (_super) {
        __extends(SimpleMachine, _super);
        function SimpleMachine() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultValues = {
                energy: 0,
                progress: 0
            };
            _this.tier = 1;
            _this.energyStorage = 2000;
            _this.energyConsume = 15;
            return _this;
        }
        SimpleMachine.prototype.getTier = function () {
            return 1;
        };
        SimpleMachine.prototype.getEnergyStorage = function () {
            return 2000;
        };
        SimpleMachine.prototype.getRelativeEnergy = function () {
            return this.data.energy / 2000;
        };
        SimpleMachine.prototype.lossEnergy = function (value) {
            if (value === void 0) { value = 0.1; }
            if (this.data.energy >= value)
                this.data.energy -= value;
        };
        SimpleMachine.prototype.canRotate = function (side) {
            return side > 1;
        };
        SimpleMachine.prototype.energyReceive = function (type, amount, voltage) {
            var maxVoltage = 15 * 1.2;
            if (voltage > maxVoltage) {
                amount = Math.min(amount, maxVoltage);
            }
            var add = Math.min(amount, this.getEnergyStorage() - this.data.energy);
            this.data.energy += add;
            return add;
        };
        return SimpleMachine;
    }(Machine.ProgressingMachine));
    Machine.SimpleMachine = SimpleMachine;
})(Machine || (Machine = {}));
BlockRegistry.registerBlock(new BlockPhotovoltaic("simplePhotovoltaicCell", "tile.block_solar_panel.simple.name", [["solar_panel_simple_side", 0], ["solar_panel_simple_top", 0], ["solar_panel_simple_side", 0]]));
var Machine;
(function (Machine) {
    var SimplePhotovoltaicCell = /** @class */ (function (_super) {
        __extends(SimplePhotovoltaicCell, _super);
        function SimplePhotovoltaicCell() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultValues = {
                energy: 0,
                canSeeSky: false
            };
            return _this;
        }
        SimplePhotovoltaicCell.prototype.getScreenByName = function () {
            return;
        };
        ;
        SimplePhotovoltaicCell.prototype.onInit = function () {
            this.data.canSeeSky = this.region.canSeeSky(this.x, this.y + 1, this.z);
        };
        SimplePhotovoltaicCell.prototype.onTick = function () {
            var energyStorage = this.getEnergyStorage();
            this.data.energy = Math.min(this.data.energy, energyStorage);
            if (World.getThreadTime() % 100 == 0) {
                this.data.canSeeSky = this.region.canSeeSky(this.x, this.y + 1, this.z);
            }
            if (this.data.canSeeSky && this.region.getLightLevel(this.x, this.y + 1, this.z) >= 14) {
                this.data.energy += 20;
            }
        };
        SimplePhotovoltaicCell.prototype.getEnergyStorage = function () {
            return 20;
        };
        return SimplePhotovoltaicCell;
    }(Machine.Generator));
    Machine.SimplePhotovoltaicCell = SimplePhotovoltaicCell;
    MachineRegistry.registerPrototype(BlockID.simplePhotovoltaicCell, new SimplePhotovoltaicCell());
})(Machine || (Machine = {}));
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: BlockID.simplePhotovoltaicCell, count: 1, data: 0 }, ["aga",
        "sss",
        "epe"], ['e', ItemID.dustInfinity, 0, 'a', ItemID.electricalSteel, 0, 's', ItemID.platePhotovoltaic, 0, 'p', ItemID.ironGear, 0, 'g', BlockID.fusedQuartz, 0]);
});
BlockRegistry.createBlock("simpleStirlingGen", [
    {
        name: "tile.block_simple_stirling_generator.name",
        texture: [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["block_stirling_gen_simple_front_off", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]],
        inCreative: true
    }
], "machine");
TileRenderer.setHandAndUiModel(BlockID.simpleStirlingGen, 0, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["block_stirling_gen_simple_front_off", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);
TileRenderer.setStandardModelWithRotation(BlockID.simpleStirlingGen, 2, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["block_stirling_gen_simple_front_off", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);
TileRenderer.registerModelWithRotation(BlockID.simpleStirlingGen, 2, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["block_stirling_gen_simple_front_on", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);
TileRenderer.setRotationFunction(BlockID.simpleStirlingGen);
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: BlockID.simpleStirlingGen, count: 1, data: 0 }, ["sas",
        "sfs",
        "gpg"], ['s', VanillaBlockID.stonebrick, 0, 'f', BlockID.machineChassiSimple, 0, 'g', ItemID.ironGear, 0, "p", VanillaBlockID.piston, 0, "a", 61, 0]);
});
var simpleStirlingGenGUI = MachineRegistry.createInventoryWindow("Simple Stirling Generator", {
    drawing: [
        { type: "bitmap", x: 450, y: 135, bitmap: "fire_scale0", scale: 3.2 },
        { type: "bitmap", x: 335, y: 140, bitmap: "redflux_bar0", scale: 3.2 },
    ],
    elements: {
        "energyScale": { type: "scale", x: 335, y: 140, direction: 1, value: 0.5, bitmap: "redflux_bar1", scale: 3.2 },
        "burningScale": { type: "scale", x: 450, y: 135, direction: 1, bitmap: "fire_scale1", scale: 3.2 },
        "slotFuel": { type: "slot", x: 441, y: 180 },
        //  "text": { type: "text", x: 400, y: 100, width: 100, height: 30, text: "RF" }
    }
});
var Machine;
(function (Machine) {
    var SimpleStirlingGenerator = /** @class */ (function (_super) {
        __extends(SimpleStirlingGenerator, _super);
        function SimpleStirlingGenerator() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultValues = {
                energy: 0,
                burn: 0,
                burnMax: 0
            };
            _this.bonus = 1;
            _this.energyStorage = 2000;
            return _this;
        }
        SimpleStirlingGenerator.prototype.getScreenByName = function () {
            return simpleStirlingGenGUI;
        };
        ;
        SimpleStirlingGenerator.prototype.setupContainer = function () {
            StorageInterface.setSlotValidatePolicy(this.container, "slotFuel", function (name, id, count, data) {
                return Recipes.getFuelBurnDuration(id, data) > 0;
            });
        };
        ;
        SimpleStirlingGenerator.prototype.consumeFuel = function (slotName) {
            var fuelSlot = this.container.getSlot(slotName);
            if (fuelSlot.id > 0) {
                var burn = Recipes.getFuelBurnDuration(fuelSlot.id, fuelSlot.data);
                if (burn && !LiquidRegistry.getItemLiquid(fuelSlot.id, fuelSlot.data)) {
                    this.decreaseSlot(fuelSlot, 1);
                    return burn;
                }
                ;
            }
            ;
            return 0;
        };
        ;
        SimpleStirlingGenerator.prototype.onTick = function () {
            StorageInterface.checkHoppers(this);
            if (this.data.energy >= 0.1)
                this.data.energy -= 0.1;
            var newActive = false;
            var energyStorage = 2000;
            if (this.data.energy + 30 <= energyStorage) {
                if (this.data.burn <= 0) {
                    this.data.burn = this.data.burnMax = this.consumeFuel("slotFuel") / 4;
                }
                ;
                if (this.data.burn > 0) {
                    this.data.energy = Math.min(this.data.energy + 30, energyStorage);
                    this.data.burn--;
                    newActive = true;
                }
                ;
            }
            ;
            this.setActive(newActive);
            this.container.setScale("burningScale", this.data.burn / this.data.burnMax || 0);
            this.container.setScale("energyScale", this.data.energy / 2000);
            this.container.sendChanges();
        };
        ;
        return SimpleStirlingGenerator;
    }(Machine.Generator));
    Machine.SimpleStirlingGenerator = SimpleStirlingGenerator;
    ;
    MachineRegistry.registerPrototype(BlockID.simpleStirlingGen, new SimpleStirlingGenerator());
    StorageInterface.createInterface(BlockID.simpleStirlingGen, {
        slots: {
            "slotFuel": { input: true }
        },
        isValidInput: function (item) { return Recipes.getFuelBurnDuration(item.id, item.data) > 0; }
    });
})(Machine || (Machine = {}));
;
BlockRegistry.createBlock("simpleAlloySmelter", [
    {
        name: "tile.block_simple_alloy_smelter.name",
        texture: [
            ["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["alloy_smelter_simple_front", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]
        ],
        inCreative: true
    }
], "machine");
TileRenderer.setHandAndUiModel(BlockID.simpleAlloySmelter, 0, [
    ["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["alloy_smelter_simple_front", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]
]);
TileRenderer.setStandardModelWithRotation(BlockID.simpleAlloySmelter, 2, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["alloy_smelter_simple_front", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);
TileRenderer.registerModelWithRotation(BlockID.simpleAlloySmelter, 2, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["alloy_smelter_front_on_simple", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);
TileRenderer.setRotationFunction(BlockID.simpleAlloySmelter);
/*
function setSimpleAlloyRender() {
  var simpleAlloyRender = new ICRender.Model();
  BlockRenderer.setStaticICRender(BlockID.simpleAlloySmelter, 0, simpleAlloyRender);
  var model = BlockRenderer.createModel();
  //model.addBox(x, y, z, x, y, z, texture, 0);
  model.addBox(1 / 16, 12 / 16, 14.75 / 16, 15 / 16, 15 / 16, 15.75 / 16, "machineBottom", 0);
  model.addBox(9 / 16, 4 / 16, 0 / 16, 16 / 16, 16 / 16, 16 / 16, "machineBottom", 0);
  model.addBox(0 / 16, 4 / 16, 0 / 16, 7 / 16, 16 / 16, 16 / 16, "machineBottom", 0);
  model.addBox(7 / 16, 4 / 16, 4 / 16, 9 / 16, 11 / 16, 12 / 16, "machineBottom", 0);
  model.addBox(7 / 16, 8 / 16, 4 / 16, 9 / 16, 10 / 16, 18 / 16, "machineBottom", 0);
  model.addBox(7 / 16, 12 / 16, 4 / 16, 9 / 16, 14 / 16, 12 / 16, "machineBottom", 0);

  simpleAlloyRender.addEntry(model);
}

setSimpleAlloyRender();*/
var simpleAlloyUI = MachineRegistry.createInventoryWindow("Simple Alloy Smelter", {
    drawing: [
        { type: "bitmap", x: 527, y: 235, bitmap: "fire_scale0", scale: 3.2 },
        { type: "bitmap", x: 687, y: 235, bitmap: "fire_scale0", scale: 3.2 },
        { type: "bitmap", x: 335, y: 140, bitmap: "redflux_bar0", scale: 3.2 },
        // { type: "bitmap", x: 600, y: 170, bitmap: "bar_alloy", scale: 4.5 },
    ],
    elements: {
        "progressScale0": {
            type: "scale",
            x: 527,
            y: 235,
            direction: 1,
            bitmap: "fire_scale1",
            scale: 3.2,
            clicker: {
                onClick: function () {
                    RV === null || RV === void 0 ? void 0 : RV.RecipeTypeRegistry.openRecipePage("enderio_alloy");
                }
            }
        },
        "progressScale1": {
            type: "scale",
            x: 687,
            y: 235,
            direction: 1,
            bitmap: "fire_scale1",
            scale: 3.2,
            clicker: {
                onClick: function () {
                    RV === null || RV === void 0 ? void 0 : RV.RecipeTypeRegistry.openRecipePage("enderio_alloy");
                }
            }
        },
        "energyScale": { type: "scale", x: 335, y: 140, direction: 1, bitmap: "redflux_bar1", scale: 3.2 },
        "ingredient1": { type: "slot", x: 520, y: 170 },
        "ingredient2": { type: "slot", x: 600, y: 140 },
        "ingredient3": { type: "slot", x: 680, y: 170 },
        //"text": { type: "text", x: 400, y: 100, width: 100, height: 30, text: "RF" },
        "slotResult": { type: "slot", x: 600, y: 320 }
    }
});
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: BlockID.simpleAlloySmelter, count: 1, data: 0 }, [
        "bbb",
        "fmf",
        "ici"
    ], ['i', ItemID.stoneGear, 0, 'f', 61, 0, "m", BlockID.machineChassiSimple, 0, "c", VanillaItemID.bucket, 0, "b", VanillaItemID.iron_ingot, 0]);
});
var Machine;
(function (Machine) {
    var AlloySmelter_Simple = /** @class */ (function (_super) {
        __extends(AlloySmelter_Simple, _super);
        function AlloySmelter_Simple() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultValues = {
                energy: 0,
                progress: 0,
            };
            return _this;
        }
        AlloySmelter_Simple.prototype.getScreenByName = function () {
            return simpleAlloyUI;
        };
        AlloySmelter_Simple.prototype.onTick = function () {
            this.lossEnergy();
            StorageInterface.checkHoppers(this);
            var newActive = false;
            var input = SmelterRecipe.getInput(this.container);
            var recipe = SmelterRecipe.getRecipe(input);
            if (recipe) {
                var resultSlot = this.container.getSlot("slotResult");
                if (resultSlot.id == recipe.result.id && resultSlot.count + recipe.result.count <= 64 || !resultSlot.id) {
                    this.processTime = recipe.energy;
                    if (this.data.energy >= this.energyConsume) {
                        this.data.energy -= this.energyConsume;
                        this.data.progress += this.energyConsume;
                        newActive = true;
                    }
                    if (this.data.progress >= this.processTime) {
                        SmelterRecipe.performRecipe(recipe, this.container);
                        this.data.progress = 0;
                    }
                }
            }
            else {
                this.data.progress = 0;
            }
            this.setActive(newActive);
            this.container.setScale("progressScale0", this.data.progress / this.processTime || 0);
            this.container.setScale("progressScale1", this.data.progress / this.processTime || 0);
            this.container.setScale("energyScale", this.getRelativeEnergy());
            this.container.sendChanges();
        };
        return AlloySmelter_Simple;
    }(Machine.SimpleMachine));
    Machine.AlloySmelter_Simple = AlloySmelter_Simple;
    MachineRegistry.registerPrototype(BlockID.simpleAlloySmelter, new AlloySmelter_Simple());
})(Machine || (Machine = {}));
BlockRegistry.createBlock("simplePoweredFurnace", [
    {
        name: "tile.block_simple_furnace.name",
        texture: [
            ["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["furnace_simple_front", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]
        ],
        inCreative: true
    }
], "machine");
TileRenderer.setHandAndUiModel(BlockID.simplePoweredFurnace, 0, [
    ["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["furnace_simple_front", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]
]);
TileRenderer.setStandardModelWithRotation(BlockID.simplePoweredFurnace, 2, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["furnace_simple_front", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);
TileRenderer.registerModelWithRotation(BlockID.simplePoweredFurnace, 2, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["furnace_simple_front_on", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);
TileRenderer.setRotationFunction(BlockID.simplePoweredFurnace);
/*
function setSimpleAlloyRender() {
  let simpleAlloyRender = new ICRender.Model();
  BlockRenderer.setStaticICRender(BlockID.simplePoweredFurnace, 0, simpleAlloyRender);
  let model = BlockRenderer.createModel();
  //model.addBox(x, y, z, x, y, z, texture, 0);
  model.addBox(1 / 16, 12 / 16, 14.75 / 16, 15 / 16, 15 / 16, 15.75 / 16, "machineBottom", 0);
  model.addBox(9 / 16, 4 / 16, 0 / 16, 16 / 16, 16 / 16, 16 / 16, "machineBottom", 0);
  model.addBox(0 / 16, 4 / 16, 0 / 16, 7 / 16, 16 / 16, 16 / 16, "machineBottom", 0);
  model.addBox(7 / 16, 4 / 16, 4 / 16, 9 / 16, 11 / 16, 12 / 16, "machineBottom", 0);
  model.addBox(7 / 16, 8 / 16, 4 / 16, 9 / 16, 10 / 16, 18 / 16, "machineBottom", 0);
  model.addBox(7 / 16, 12 / 16, 4 / 16, 9 / 16, 14 / 16, 12 / 16, "machineBottom", 0);

  simpleAlloyRender.addEntry(model);
}

setSimpleAlloyRender();*/
var simpleFurnaceUI = MachineRegistry.createInventoryWindow("Simple Powered Furnace", {
    drawing: [
        { type: "bitmap", x: 527, y: 235, bitmap: "fire_scale0", scale: 3.2 },
        { type: "bitmap", x: 687, y: 235, bitmap: "fire_scale0", scale: 3.2 },
        { type: "bitmap", x: 335, y: 140, bitmap: "redflux_bar0", scale: 3.2 },
        //{type: "bitmap", x: 600, y: 170, bitmap: "bar_alloy", scale: 4.5},
    ],
    elements: {
        "progressScale0": {
            type: "scale",
            x: 527,
            y: 235,
            direction: 1,
            bitmap: "fire_scale1",
            scale: 3.2,
            clicker: {
                onClick: function () {
                    RV === null || RV === void 0 ? void 0 : RV.RecipeTypeRegistry.openRecipePage("furnace");
                }
            }
        },
        "progressScale1": {
            type: "scale",
            x: 687,
            y: 235,
            direction: 1,
            bitmap: "fire_scale1",
            scale: 3.2,
            clicker: {
                onClick: function () {
                    RV === null || RV === void 0 ? void 0 : RV.RecipeTypeRegistry.openRecipePage("furnace");
                }
            }
        },
        "energyScale": { type: "scale", x: 335, y: 140, direction: 1, bitmap: "redflux_bar1", scale: 3.2 },
        "sourceSlot": { type: "slot", x: 600, y: 140 },
        //"text": { type: "text", x: 400, y: 100, width: 100, height: 30, text: "RF" },
        "slotResult": { type: "slot", x: 600, y: 320 }
    }
});
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: BlockID.simplePoweredFurnace, count: 1, data: 0 }, [
        "ibi",
        "fmf",
        "aca"
    ], ['i', 265, 0, 'f', 98, 0, "m", BlockID.machineChassiSimple, 0, "c", VanillaItemID.bucket, 0, "a", ItemID.stoneGear, 0, "b", 61, 0]);
});
var Machine;
(function (Machine) {
    var PoweredFurnace_Simple = /** @class */ (function (_super) {
        __extends(PoweredFurnace_Simple, _super);
        function PoweredFurnace_Simple() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultValues = {
                energy: 0,
                progress: 0,
            };
            return _this;
        }
        PoweredFurnace_Simple.prototype.getScreenByName = function () {
            return simpleFurnaceUI;
        };
        PoweredFurnace_Simple.prototype.onTick = function () {
            this.lossEnergy();
            StorageInterface.checkHoppers(this);
            var newActive = false;
            var slot = this.container.getSlot("sourceSlot");
            var result = Recipes.getFurnaceRecipeResult(slot.id, slot.data, "iron");
            if (result) {
                var resultSlot = this.container.getSlot("slotResult");
                if (resultSlot.id == result.id && resultSlot.count + result.count <= 64 || !resultSlot.id) {
                    if (this.data.energy >= this.energyConsume) {
                        this.data.energy -= this.energyConsume;
                        this.data.progress += this.energyConsume;
                        newActive = true;
                    }
                    if (this.data.progress >= 3000) {
                        slot.setSlot(slot.id, slot.count - 1, slot.data);
                        slot.validate();
                        resultSlot.setSlot(result.id, resultSlot.count + 1, result.data);
                        this.container.validateAll();
                        this.data.progress = 0;
                    }
                }
            }
            else {
                this.data.progress = 0;
            }
            this.setActive(newActive);
            this.container.setScale("progressScale0", this.data.progress / 3000 || 0);
            this.container.setScale("progressScale1", this.data.progress / 3000 || 0);
            this.container.setScale("energyScale", this.data.energy / 2000);
            this.container.sendChanges();
        };
        return PoweredFurnace_Simple;
    }(Machine.SimpleMachine));
    Machine.PoweredFurnace_Simple = PoweredFurnace_Simple;
    MachineRegistry.registerPrototype(BlockID.simplePoweredFurnace, new PoweredFurnace_Simple());
})(Machine || (Machine = {}));
BlockRegistry.createBlock("simplesagmill", [
    {
        name: "tile.block_simple_sag_mill.name",
        texture: [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["block_simple_sagmill_front", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]
        ],
        inCreative: true
    }
], "machine");
TileRenderer.setHandAndUiModel(BlockID.simplesagmill, 0, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["block_simple_sagmill_front", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]
]);
TileRenderer.setStandardModelWithRotation(BlockID.simplesagmill, 2, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["block_simple_sagmill_front", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]
]);
TileRenderer.registerModelWithRotation(BlockID.simplesagmill, 2, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["block_simple_sagmill_front_on", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);
TileRenderer.setRotationFunction(BlockID.simplesagmill);
Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({ id: BlockID.simplesagmill, count: 1, data: 0 }, [
        "fff",
        "ipi",
        "ama"
    ], ['i', VanillaItemID.iron_ingot, 0, 'f', VanillaItemID.flint, 0, "m", VanillaBlockID.piston, 0, "p", BlockID.machineChassiSimple, 0, 'a', ItemID.woodGear, 0]);
});
var simpleSAGGui = MachineRegistry.createInventoryWindow("Simple SAG Mill", {
    drawing: [
        { type: "bitmap", x: 335, y: 140, bitmap: "redflux_bar0", scale: 3.2 },
        { type: "bitmap", x: 595, y: 250, bitmap: "bar_progress_down0", scale: 4.2 },
    ],
    elements: {
        "progressScale": {
            type: "scale",
            x: 595,
            y: 250,
            direction: 3,
            bitmap: "bar_progress_down1",
            scale: 4.2,
            clicker: {
                onClick: function () {
                    RV === null || RV === void 0 ? void 0 : RV.RecipeTypeRegistry.openRecipePage("enderio_sag");
                }
            }
        },
        "energyScale": { type: "scale", x: 335, y: 140, direction: 1, bitmap: "redflux_bar1", scale: 3.2 },
        "ingredient": { type: "slot", x: 602, y: 170 },
        "result0": { type: "slot", x: 505, y: 340 },
        "result1": { type: "slot", x: 570, y: 340 },
        "result2": { type: "slot", x: 635, y: 340 },
        "result3": { type: "slot", x: 700, y: 340 }
    }
});
var Machine;
(function (Machine) {
    var SagMill_Simple = /** @class */ (function (_super) {
        __extends(SagMill_Simple, _super);
        function SagMill_Simple() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultValues = {
                energy: 0,
                progress: 0,
            };
            return _this;
        }
        SagMill_Simple.prototype.getScreenByName = function () {
            return simpleSAGGui;
        };
        SagMill_Simple.prototype.onTick = function () {
            this.lossEnergy();
            StorageInterface.checkHoppers(this);
            var newActive = false;
            var input = this.container.getSlot("ingredient");
            var res0 = this.container.getSlot("result0");
            var res1 = this.container.getSlot("result1");
            var res2 = this.container.getSlot("result2");
            var res3 = this.container.getSlot("result3");
            var recipe = CrusherRecipe.getRecipe(input);
            if (recipe) {
                var isGrinding = recipe.isGrinding;
                var ingredient = recipe.ingredient;
                var result0 = recipe.result0;
                var result1 = recipe.result1;
                var result2 = recipe.result2;
                var result3 = recipe.result3;
                var time = recipe.energy;
                if (((res0.id == result0.id && res0.data == result0.data && res0.count + result0.count <= 64) || (res0.id == 0)) &&
                    ((res1.id == result1.id && res1.data == result1.data && res1.count < 64) || (res1.id == 0)) &&
                    ((res2.id == result2.id && res2.data == result2.data && res2.count < 64) || (res2.id == 0)) &&
                    ((res3.id == result3.id && res3.data == result3.data && res3.count < 64) || (res3.id == 0))) {
                    this.processTime = time;
                    if (this.data.energy >= this.energyConsume) {
                        newActive = true;
                        this.data.progress += this.energyConsume;
                        this.data.energy -= this.energyConsume;
                    }
                    if (this.data.progress >= this.processTime) {
                        input.count--;
                        input.markDirty();
                        var outputRandom = Math.random();
                        if (outputRandom <= result0.chance) {
                            res0.id = result0.id;
                            res0.data = result0.data;
                            res0.count += result0.count;
                            res0.markDirty();
                        }
                        if (outputRandom <= result1.chance) {
                            res1.id = result1.id;
                            res1.data = result1.data;
                            res1.count += 1;
                            res1.markDirty();
                        }
                        if (outputRandom <= result2.chance) {
                            res2.id = result2.id;
                            res2.data = result2.data;
                            res2.count += 1;
                            res2.markDirty();
                        }
                        if (outputRandom <= result3.chance) {
                            res3.id = result3.id;
                            res3.data = result3.data;
                            res3.count += 1;
                            res3.markDirty();
                        }
                        this.container.validateAll();
                        this.data.progress = 0;
                    }
                }
            }
            this.setActive(newActive);
            this.container.setScale("progressScale", this.data.progress / this.processTime || 0);
            this.container.setScale("energyScale", this.data.energy / 2000);
            this.container.sendChanges();
        };
        return SagMill_Simple;
    }(Machine.SimpleMachine));
    Machine.SagMill_Simple = SagMill_Simple;
    MachineRegistry.registerPrototype(BlockID.simplesagmill, new SagMill_Simple());
})(Machine || (Machine = {}));
EnderCore.createResourceBlock("crudeSteel", "Crude Steel");
EnderCore.createResourceBlock("crystalline", "Crystalline");
EnderCore.createResourceBlock("energeticSilver", "Energetic Silver");
EnderCore.createResourceBlock("vividAlloy", "Vivid Alloy");
ItemRegistry.registerItem(new CapacitorCraft("silverCapacitor", "Silver", {
    consume: 1,
    storage: 1,
    bonus: 1,
    range: 2
}));
//endergy_tip(ItemID.silverCapacitor);
EnderCore.createResourceItem("crudeSteel", "Crude Steel");
EnderCore.createResourceItem("crystalline", "Crystalline");
EnderCore.createResourceItem("energeticSilver", "Energetic Silver");
EnderCore.createResourceItem("vividAlloy", "Vivid Alloy");
/*
endergy_tip(ItemID.crudeSteel);
endergy_tip(ItemID.crudeSteelNugget);
endergy_tip(ItemID.vividAlloy);
endergy_tip(ItemID.vividAlloyNugget)
*/
ItemRegistry.createItem("ingotSilver", { name: "Silver Ingot", icon: "ingot_silver" });
ItemRegistry.createItem("ingotLead", { name: "Lead Ingot", icon: "ingot_lead" });
ItemRegistry.createItem("nuggetSilver", { name: "Silver Ingot", icon: "nugget_silver" });
ItemRegistry.createItem("nuggetLead", { name: "Lead Nugget", icon: "nugget_lead" });
ItemRegistry.createItem("dustSilver", { name: "Silver Ingot", icon: "dust_silver" });
ItemRegistry.createItem("dustLead", { name: "Lead Dust", icon: "dust_lead" });
function addRecipeIngot(id, nug) {
    Callback.addCallback("PreLoaded", function () {
        Recipes.addShaped({ id: ItemID[id], count: 1, data: 0 }, [
            "bbb",
            "bbb",
            "bbb"
        ], ['b', ItemID[nug], 0]);
        Recipes.addShapeless({ id: ItemID[nug], count: 9, data: 0 }, [{ id: ItemID[id], data: 0 }]);
    });
}
;
addRecipeIngot("ingotSilver", "nuggetSilver");
addRecipeIngot("ingotLead", "nuggetLead");
var IC2Integration = false;
Callback.addCallback("PreLoaded", function () {
    Recipes.addFurnace(ItemID.dustLead, ItemID.ingotLead, 0);
    Recipes.addFurnace(ItemID.dustSilver, ItemID.ingotSilver, 0);
    ModAPI.addAPICallback("ICore", function (api) {
        IC2Integration = true;
    });
    if (IC2Integration) {
        Recipes.addShaped({ id: ItemID.silverCapacitor, count: 1, data: 0 }, [
            " ab",
            "aca",
            "ba"
        ], ['b', ItemID.dustInfinity, 0, "a", ItemID.nuggetSilver, 0, "c", ItemID.ingotLead, 0]);
    }
    else {
        Recipes.addShaped({ id: ItemID.silverCapacitor, count: 1, data: 0 }, [
            " ab",
            "aca",
            "ba"
        ], ['b', ItemID.dustInfinity, 0, "a", ItemID.nuggetSilver, 0, "c", ItemID.electricalSteel, 0]);
    }
});
Callback.addCallback("PreLoaded", function () {
    SmelterRecipe.addRecipe({
        ingredient1: { id: 13, data: 0, count: 1 },
        ingredient2: { id: 318, data: 0, count: 1 },
        ingredient3: { id: 4, data: 0, count: 1 },
        result: { id: ItemID.crudeSteel, count: 1, data: 0 },
        energy: 5000
    });
    SmelterRecipe.addRecipe({
        ingredient1: { id: ItemID.dustPulsating, data: 0, count: 1 },
        ingredient2: { id: VanillaItemID.gold_ingot, data: 0, count: 1 },
        // ingredient3: { id: 0, data: 0, count: 0 },
        result: { id: ItemID.crystalline, count: 1, data: 0 },
        energy: 10000
    });
    SmelterRecipe.addRecipe({
        ingredient1: { id: VanillaItemID.redstone, data: 0, count: 1 },
        ingredient2: { id: ItemID.ingotSilver, data: 0, count: 1 },
        ingredient3: { id: VanillaItemID.glowstone_dust, data: 0, count: 1 },
        result: { id: ItemID.energeticSilver, count: 1, data: 0 },
        energy: 10000
    });
    SmelterRecipe.addRecipe({
        ingredient1: { id: VanillaItemID.ender_pearl, data: 0, count: 1 },
        ingredient2: { id: ItemID.energeticSilver, data: 0, count: 1 },
        result: { id: ItemID.vividAlloy, count: 1, data: 0 },
        energy: 10000
    });
});
ModAPI.addAPICallback("FoundationAPI", function (Thermal) {
    GrindingBall.regModBall("signalum", "Signalum", 120, 165, 35, 100800, { id: "ingotSignalum", data: 0 });
    GrindingBall.regModBall("enderium", "Enderium", 165, 145, 125, 120000, { id: "ingotEnderium", data: 0 });
    GrindingBall.regModBall("lumium", "Lumium", 110, 215, 90, 100800, { id: "ingotLumium", data: 0 });
});
ModAPI.addAPICallback("ICore", function (api) {
    CombustionFuel.addFuel("biogas", 16, 10);
    CombustionFuel.addFuel("ethanol", 16, 10);
    CombustionFuel.addFuel("oil", 8, 10);
    CombustionFuel.addFuel("biomass", 8, 20);
    Callback.addCallback("PreLoaded", function () {
        ICRender.getGroup("liquid_pipe").add(BlockID.semifluidGenerator, -1);
        ICRender.getGroup("liquid_pipe").add(BlockID.icFermenter, -1);
        ICRender.getGroup("liquid_pipe").add(BlockID.oreWasher, -1);
        ICRender.getGroup("liquid_pipe").add(BlockID.pump, -1);
        ICRender.getGroup("liquid_pipe").add(BlockID.solidCanner, -1);
        ICRender.getGroup("liquid_pipe").add(BlockID.canner, -1);
        ICRender.getGroup("liquid_pipe").add(BlockID.tank, -1);
        SmelterRecipe.addRecipe({
            ingredient1: { id: ItemID.ingotCopper, data: 0, count: 3 },
            ingredient2: { id: ItemID.ingotTin, data: 0, count: 1 },
            result: { id: ItemID.ingotBronze, count: 4, data: 0 },
            energy: 4000
        });
        SmelterRecipe.addRecipe({
            ingredient1: { id: VanillaItemID.iron_ingot, data: 0, count: 1 },
            ingredient2: { id: VanillaItemID.coal, data: 0, count: 1 },
            ingredient3: { id: ItemID.dustCoal, data: 0, count: 1 },
            result: { id: ItemID.ingotSteel, count: 1, data: 0 },
            energy: 10000
        });
        RecipeRegistry.addCrusher({
            isGrinding: true,
            ingredient: { id: BlockID.oreCopper, data: 0 },
            result0: { id: ItemID.dustCopper, data: 0, chance: 1 },
            result1: { id: ItemID.dustCopper, data: 0, chance: 1 },
            result2: { id: ItemID.dustGold, data: 0, chance: 0.1 },
            result3: { id: 4, data: 0, chance: 0.15 },
            energy: 3600,
            by: "IC2"
        });
        /*
            RecipeRegistry.addCrusher({
              isGrinding: true,
              ingredient: { id: BlockID.oreUranium, data: 0 },
              result0: { id: ItemID.uranium238, data: 0, chance: 1 },
              result1: { id: ItemID.smallUranium235, data: 0, chance: 1 },
              result2: { id: ItemID.dustLead, data: 0, chance: 0.1 },
              result3: { id: 4, data: 0, chance: 0.15 },
              energy: 3600,
              by: "IC2"
            });
        */
        RecipeRegistry.addCrusher({
            isGrinding: true,
            ingredient: { id: BlockID.oreTin, data: 0 },
            result0: { id: ItemID.dustTin, data: 0, chance: 1, count: 2 },
            result1: { id: ItemID.dustSilver, data: 0, chance: 0.1 },
            result2: { id: 4, data: 0, chance: 0.15 },
            energy: 3600,
            by: "IC2"
        });
        RecipeRegistry.addCrusher({
            isGrinding: true,
            ingredient: { id: BlockID.oreLead, data: 0 },
            result0: { id: ItemID.dustLead, data: 0, chance: 1, count: 2 },
            result1: { id: ItemID.dustSilver, data: 0, chance: 0.1 },
            result2: { id: 4, data: 0, chance: 0.15 },
            energy: 3600,
            by: "IC2"
        });
    });
});
ModAPI.addAPICallback("RecipeViewer", function (api) {
    RV = api;
    var RecipeType = api.RecipeType;
    var Bitmap = android.graphics.Bitmap;
    var AlloySmelterRecipe = /** @class */ (function (_super) {
        __extends(AlloySmelterRecipe, _super);
        function AlloySmelterRecipe() {
            var _this = _super.call(this, "Alloy Smelter", BlockID.alloySmelter, {
                drawing: [
                    { type: "bitmap", x: 527, y: 235, bitmap: "fire_scale0", scale: 3.2 },
                    { type: "bitmap", x: 687, y: 235, bitmap: "fire_scale0", scale: 3.2 },
                ],
                elements: {
                    input0: { type: "slot", x: 520, y: 170 },
                    input1: { type: "slot", x: 600, y: 140 },
                    input2: { type: "slot", x: 680, y: 170 },
                    output0: { type: "slot", x: 600, y: 320 },
                    textTime: { type: "text", x: 750, y: 200 }
                }
            }) || this;
            _this.setDescription("Alloy");
            return _this;
        }
        AlloySmelterRecipe.prototype.getAllList = function () {
            var list = [];
            for (var i in SmelterRecipe.recipes) {
                var recipe = SmelterRecipe.recipes[i];
                list.push({
                    input: recipe.input,
                    output: [recipe.result],
                    energy: recipe.energy
                });
            }
            return list;
        };
        AlloySmelterRecipe.prototype.onOpen = function (elements, recipe) {
            elements.get("textTime").setBinding("text", Translation.translate("Energy: ") + recipe.energy + " RF");
        };
        return AlloySmelterRecipe;
    }(RecipeType));
    api.RecipeTypeRegistry.register("enderio_alloy", new AlloySmelterRecipe());
    var SAGMillRecipe = /** @class */ (function (_super) {
        __extends(SAGMillRecipe, _super);
        function SAGMillRecipe() {
            var _this = _super.call(this, "SAG Mill", BlockID.sagmill, {
                drawing: [
                    { type: "bitmap", x: 595, y: 250, bitmap: "bar_progress_down0", scale: 4.2 }
                ],
                elements: {
                    input0: { type: "slot", x: 602, y: 170, size: 65 },
                    output0: { type: "slot", x: 505, y: 340, size: 65 },
                    output1: { type: "slot", x: 570, y: 340, size: 65 },
                    output2: { type: "slot", x: 635, y: 340, size: 65 },
                    output3: { type: "slot", x: 700, y: 340, size: 65 }
                }
            }) || this;
            _this.setDescription("Crusher");
            return _this;
        }
        SAGMillRecipe.prototype.getAllList = function () {
            var list = [];
            var recipe = CrusherRecipe.recipes;
            for (var i in recipe) {
                var input = recipe[i].ingredient;
                var result0 = recipe[i].result0;
                var result1 = recipe[i].result1;
                var result2 = recipe[i].result2;
                var result3 = recipe[i].result3;
                list.push({
                    input: [{ id: input.id, count: 1, data: input.data }],
                    output: [
                        { id: result0.id || 0, count: result0.count || 1, data: result0.data || 0, tips: { chance: result0.chance * 100 } },
                        { id: result1.id || 0, count: 1, data: result1.data || 0, tips: { chance: result1.chance * 100 } },
                        { id: result2.id || 0, count: 1, data: result2.data || 0, tips: { chance: result2.chance * 100 } },
                        { id: result3.id || 0, count: 1, data: result3.data || 0, tips: { chance: result3.chance * 100 } },
                    ]
                });
            }
            return list;
        };
        SAGMillRecipe.prototype.slotTooltip = function (name, item, tips) {
            if (tips)
                return name + "\n Chance: " + tips.chance + " %";
        };
        return SAGMillRecipe;
    }(RecipeType));
    api.RecipeTypeRegistry.register("enderio_sag", new SAGMillRecipe());
    var TheVatRecipe = /** @class */ (function (_super) {
        __extends(TheVatRecipe, _super);
        function TheVatRecipe() {
            var _this = _super.call(this, "The Vat", BlockID.theVat, {
                drawing: [
                    { type: "bitmap", x: 350, y: -80, bitmap: "backgroundVat", scale: 3.4 },
                    { type: "bitmap", x: 646, y: 317, bitmap: "fire_scale1", scale: 3.4 },
                ],
                elements: {
                    input0: { type: "slot", x: 560, y: 140, size: 60 },
                    input1: { type: "slot", x: 728, y: 140, size: 60 },
                    inputLiq0: { x: 502, y: 130, width: 50, height: 200 },
                    outputLiq0: { x: 824, y: 132, width: 50, height: 200 },
                    textTime: { type: "text", x: 325, y: 50, width: 100, height: 30 }
                },
            }) || this;
            _this.setTankLimit(5000);
            return _this;
        }
        TheVatRecipe.prototype.getAllList = function () {
            var list = [];
            for (var _i = 0, _a = VatRecipe.recipes; _i < _a.length; _i++) {
                var recipe = _a[_i];
                if (!isEmpty(recipe.input2)) {
                    for (var prop1 in recipe.input1) {
                        var input1 = prop1.split(":");
                        for (var prop2 in recipe.input2) {
                            var input2 = prop2.split(":");
                            var input1Multiplier = recipe.input1[input1[0] + ":" + input1[1]] || recipe.input1[input1[0]];
                            var input2Multiplier = recipe.input2[input2[0]] || recipe.input2[input2[0] + ":" + input2[1]];
                            var ingredientMultiplier = input1Multiplier * input2Multiplier;
                            list.push({
                                input: [
                                    { id: +input1[0], data: +input1[1] || 0, count: 1, tips: { multi: input1Multiplier } },
                                    { id: +input2[0], data: +input2[1] || 0, count: 1, tips: { multi: input2Multiplier } }
                                ],
                                inputLiq: [{
                                        liquid: recipe.inputLiquid,
                                        amount: ingredientMultiplier * 1000,
                                        tips: { amount: ingredientMultiplier * 1000 }
                                    }],
                                outputLiq: [{
                                        liquid: recipe.outputLiquid,
                                        amount: recipe.inputMutilplier * ingredientMultiplier * 1000,
                                        tips: { amount: recipe.inputMutilplier * ingredientMultiplier * 1000 }
                                    }],
                                energy: recipe.energy
                            });
                        }
                    }
                }
                else {
                    for (var prop1 in recipe.input1) {
                        var input1 = prop1.split(":");
                        var input1Multiplier = recipe.input1[input1[0] + ":" + input1[1]] || recipe.input1[input1[0]];
                        list.push({
                            input: [
                                { id: +input1[0], data: +input1[1] || 0, count: 1, tips: { multi: input1Multiplier } },
                                { id: 0, data: 0, count: 0 }
                            ],
                            inputLiq: [{
                                    liquid: recipe.inputLiquid,
                                    amount: input1Multiplier * 1000,
                                    tips: { amount: input1Multiplier * 1000 }
                                }],
                            outputLiq: [{
                                    liquid: recipe.outputLiquid,
                                    amount: recipe.inputMutilplier * input1Multiplier * 1000,
                                    tips: { amount: recipe.inputMutilplier * input1Multiplier * 1000 }
                                }],
                            energy: recipe.energy
                        });
                    }
                }
            }
            return list;
        };
        TheVatRecipe.prototype.tankTooltip = function (name, liquid, tips) {
            return name + ": " + tips.amount + " mB";
        };
        TheVatRecipe.prototype.slotTooltip = function (name, item, tips) {
            if (tips)
                return name + "\n x:" + tips.multi;
        };
        return TheVatRecipe;
    }(RecipeType));
    api.RecipeTypeRegistry.register("ender_vat", new TheVatRecipe());
    var SoulBinderRecipe = /** @class */ (function (_super) {
        __extends(SoulBinderRecipe, _super);
        function SoulBinderRecipe() {
            return _super.call(this, "Soul Binder", BlockID.soulBinder, {
                drawing: [
                    { type: "bitmap", x: 600, y: 205, bitmap: "bar_progress1", scale: 3.2 }
                ],
                elements: {
                    input0: { type: "slot", x: 450, y: 200 },
                    input1: { type: "slot", x: 510, y: 200 },
                    output0: { type: "slot", x: 700, y: 200 },
                    output1: { type: "slot", x: 760, y: 200 },
                },
            }) || this;
        }
        SoulBinderRecipe.prototype.getAllList = function () {
            var list = [];
            for (var i in SoulRecipe.recipes) {
                var recipe = SoulRecipe.recipes[i];
                var r_soul = recipe.soul;
                var r_lvl = recipe.lvl;
                var r_ingredient = recipe.ingredient;
                var r_result = recipe.result0;
                var r_energy = recipe.energy;
                list.push({
                    input: [{ id: ItemID.soulVessel, count: 1, data: 0, tips: { soul: r_soul, lvl: r_lvl } },
                        { id: r_ingredient.id, data: r_ingredient.data || 1, count: r_ingredient.count || 1, tips: { energy: r_energy } }],
                    output: [
                        { id: r_result.id || 0, count: r_result.count || 1, data: r_result.data || 0 },
                        { id: ItemID.soulVesselEmpty, count: 1, data: 0 }
                    ]
                });
            }
            return list;
        };
        SoulBinderRecipe.prototype.slotTooltip = function (name, item, tips) {
            if (tips)
                if (tips.soul)
                    return name + "\n Soul: " + tips.soul;
                else if (tips.energy)
                    return name + "\n Energy Use: " + tips.energy;
                else if (tips.lvl)
                    return name + "\n Level Require: " + tips.lvl + ".Experience Need: " + ObeliskCore.LVLtoXP(tips.lvl);
        };
        return SoulBinderRecipe;
    }(RecipeType));
    api.RecipeTypeRegistry.register("ender_soulbinder", new SoulBinderRecipe());
    var SliceNSpliceRecipe = /** @class */ (function (_super) {
        __extends(SliceNSpliceRecipe, _super);
        function SliceNSpliceRecipe() {
            return _super.call(this, "Slice 'n' splice", BlockID.sliceAndSplice, {
                drawing: [
                    { type: "bitmap", x: 600, y: 205, bitmap: "bar_progress1", scale: 3.2 }
                ],
                elements: {
                    input0: { type: "slot", x: 400, y: 200 },
                    input1: { type: "slot", x: 460, y: 200 },
                    input2: { type: "slot", x: 520, y: 200 },
                    input3: { type: "slot", x: 400, y: 260 },
                    input4: { type: "slot", x: 460, y: 260 },
                    input5: { type: "slot", x: 520, y: 260 },
                    output: { type: "slot", x: 720, y: 230 },
                },
            }) || this;
        }
        SliceNSpliceRecipe.prototype.getAllList = function () {
            var list = [];
            for (var i in SliceAndSpliceRecipe.recipes) {
                var recipe = SliceAndSpliceRecipe.recipes[i];
                var r_input0 = recipe["input0"];
                var r_input1 = recipe["input1"];
                var r_input2 = recipe["input2"];
                var r_input3 = recipe["input3"];
                var r_input4 = recipe["input4"];
                var r_input5 = recipe["input5"];
                var r_result = recipe.result;
                var r_energy = recipe.energy;
                list.push({
                    input: [{ id: r_input0.id, count: r_input0.count, data: r_input0.data },
                        { id: r_input1.id, count: r_input1.count, data: r_input1.data },
                        { id: r_input2.id, count: r_input2.count, data: r_input2.data },
                        { id: r_input3.id, count: r_input3.count, data: r_input3.data },
                        { id: r_input4.id, count: r_input4.count, data: r_input4.data },
                        { id: r_input5.id, count: r_input5.count, data: r_input5.data }],
                    output: [
                        { id: r_result.id || 0, count: r_result.count || 1, data: r_result.data || 0 }
                    ]
                });
            }
            return list;
        };
        return SliceNSpliceRecipe;
    }(RecipeType));
    api.RecipeTypeRegistry.register("ender_snads", new SliceNSpliceRecipe());
    var CombustionProduct = /** @class */ (function (_super) {
        __extends(CombustionProduct, _super);
        function CombustionProduct() {
            var _this = _super.call(this, "Combustion Fuel", BlockID.combustionGenerator, {
                drawing: [{ type: "bitmap", x: 120, y: 230, bitmap: "fire_scale1", scale: 3.2 }],
                elements: {
                    inputLiq0: { type: "scale", x: 200, y: 120, width: 60, height: 200 },
                    inputLiq1: { type: "scale", x: 30, y: 120, width: 60, height: 200 },
                    textWarn: { type: "text", x: 350, y: 200 },
                }
            }) || this;
            _this.setTankLimit(1000);
            return _this;
        }
        CombustionProduct.prototype.getAllList = function () {
            var list = [];
            var coolants = CombustionFuel.getCoolArray();
            var heats = CombustionFuel.getHeatArray();
            for (var _i = 0, coolants_1 = coolants; _i < coolants_1.length; _i++) {
                var coolant_fluid = coolants_1[_i];
                for (var _a = 0, heats_1 = heats; _a < heats_1.length; _a++) {
                    var heat_fluid = heats_1[_a];
                    var heat_impl = new CombustionFuel.FuelImpl(heat_fluid);
                    var coolant_impl = new CombustionFuel.CoolantImpl(coolant_fluid);
                    var math = new CombustionMath(coolant_impl, heat_impl, 1, 1);
                    list.push({
                        inputLiq: [
                            { liquid: coolant_fluid, amount: 100, tips: { amount: 100, burn_time: math.getTicksPerCoolant(100), power: math.getEnergyGeneratorPerCycle(100), powerTick: math.getEnergyPerTick() } },
                            { liquid: heat_fluid, amount: 100, tips: { amount: 100, burn_time: math.getTicksPerFuel(100), power: math.getEnergyGeneratorPerCycle(100), powerTick: math.getEnergyPerTick() } }
                        ]
                    });
                }
            }
            return list;
        };
        CombustionProduct.prototype.tankTooltip = function (name, liquid, tips) {
            return name + "100 mB <=> Burn Time: " + tips.burn_time / 20 + "s\n Energy Per Tick: " + tips.powerTick + " RF/tick\n Energy Per Cycle: " + tips.power + " RF";
        };
        CombustionProduct.prototype.onOpen = function (elements, recipe) {
            var _a;
            (_a = elements.get("textWarn")) === null || _a === void 0 ? void 0 : _a.setBinding("text", "Data from normal tier with Basic Capacitor");
        };
        return CombustionProduct;
    }(RecipeType));
    api.RecipeTypeRegistry.register("ender_combustion", new CombustionProduct());
});
//@ts-ignore
var KEX;
ModAPI.addAPICallback("KernelExtension", function (api) {
    if (typeof api.getKEXVersionCode === "function" && api.getKEXVersionCode() >= 300) {
        //@ts-ignore
        KEX = api;
        KEX.ItemsModule.setFireResistant(ItemID.dustInfinity, true);
    }
});
var EnderAPI = {
    MachineRegistry: MachineRegistry,
    Recipe: RecipeRegistry,
    Conduit: ConduitRegistry,
    CapacitorAPI: CapacitorAPI,
    Machine: Machine,
    //Capacitor: regUpgrade,
    requireGlobal: function (command) {
        return eval(command);
    }
};
Logger.Log("EnderIO loading finished in ".concat((Debug.sysTime() - startTime), " ms"), "INFO");
ModAPI.registerAPI("EnderAPI", EnderAPI);
Logger.Log("EnderIO API was shared with name: EnderAPI", "API");
