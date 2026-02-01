/*
BUILD INFO:
  dir: dev
  target: main.js
  files: 76
*/



// file: Header.js

// import values
function randomInt(min, max) {

  return Math.floor(Math.random() * (max - min + 1)) + min;

}

var Color = android.graphics.Color;
var PotionEffect = Native.PotionEffect;
var ParticleType = Native.ParticleType;
var BlockSide = Native.BlockSide;
var EntityType = Native.EntityType;
// RECIPE VIEWER SUPPORT
var RV;
//var RecipeViewer;
// load lib
alert("EnderIO BE \n Remake By KanzakiMiner");
var DataGroup = ICRender.getGroup("data-conduit");

IMPORT("ConnectedTexture");
IMPORT("SoundAPI");
IMPORT("UIAPI")
IMPORT("BlockEngine");
IMPORT("StorageInterface");
IMPORT("flags");
IMPORT("BlockEngine");
IMPORT("EnergyNet");
IMPORT("ChargeItem");
IMPORT("MachineRender");
IMPORT("TileRender");
IMPORT("LiquidLib");
IMPORT("ToolLib");
IMPORT("PipesAPI");
//IMPORT("bakeModel");
IMPORT("Pipe");

ICRender.addGroupFor = function(id, groups, data) {
  for (let i in groups) ICRender.getGroup(groups[i]).add(id, data || -1);
}

canTileBeReplaced = ModAPI.requireGlobal("canTileBeReplaced");

World.getRelativeCoords = function(x, y, z, side) {
  var dir = [[0, -1, 0], [0, 1, 0], [0, 0, -1], [0, 0, 1], [-1, 0, 0], [1, 0, 0]];
  return { x: x + dir[side][0], y: y + dir[side][1], z: z + dir[side][2], side: side }
}

World.isAirBlock = function(x, y, z) {
  if (World.getBlockID(x, y, z) == 0) return true;
  return false;
}




// file: Info.js

const BitmapFactory = android.graphics.BitmapFactory;
const Bitmap = android.graphics.Bitmap;

const Timer = java.util.Timer;
const TimerTask = java.util.TimerTask;

const JAVA_ANIMATOR = android.animation.ValueAnimator;
const JAVA_HANDLER = android.os.Handler;
const LOOPER_THREAD = android.os.Looper;
const JAVA_HANDLER_THREAD = new JAVA_HANDLER(LOOPER_THREAD.getMainLooper());
const JavaFONT_ = WRAP_JAVA('com.zhekasmirnov.innercore.api.mod.ui.types.Font');

var InnerCore_pack = FileTools.ReadJSON(__packdir__ + 'manifest.json');

Callback['com.ulalald.asd'] = Callback['com.ulalald.asd'] || [];
Callback['com.ulalald.asd.ddd'] = false;
const mod = FileTools.ReadJSON(__dir__ + 'mod.info');
Callback['com.ulalald.asd'].push(mod);
Callback.addCallback("LevelDisplayed", function () {
	//Game.tipMessage('§c' + mod.name + '\n§a' + mod.version)
	if (!Callback['com.ulalald.asd.ddd']) {
		Game.tipMessage(Callback['com.ulalald.asd'].map(function (elem) {
			return '§e' + elem.name + '   §b' + elem.version;
		}).join('\n'))
		Callback['com.ulalald.asd.ddd'] = true;
	}
});
Callback.addCallback("LevelLeft", function () {
	Callback['com.ulalald.asd.ddd'] = false;
});
/*
var _inventory_open = false;
Callback.addCallback('NativeGuiChanged', function (screenName) {
	if (screenName == 'inventory_screen' || screenName == 'inventory_screen_pocket')
		_inventory_open = true;
	else
		_inventory_open = false;
});

const mod_tip = function (id) {
	if (BlockID[id]) id = Block.convertBlockToItemId(id);
	Callback.addCallback('PostLoaded', function () {
		var _func = Item.nameOverrideFunctions[id];
		Item.registerNameOverrideFunction(id, function (item, name) {
			if (_func) name = _func(item, name);
			if (_inventory_open) name += "\n§9" + mod.name;
			return name;
		})
	});
}

const endergy_tip = function (id) {
	if (BlockID[id]) id = Block.convertBlockToItemId(id);
	Callback.addCallback('PostLoaded', function () {
		var _func = Item.nameOverrideFunctions[id];
		Item.registerNameOverrideFunction(id, function (item, name) {
			if (_func) name = _func(item, name);
			if (_inventory_open) name += "\n§9" + mod.name + ": Endergy";
			return name;
		})
	});
}

const machine_tip = function (id) {
	if (BlockID[id]) id = Block.convertBlockToItemId(id);
	Callback.addCallback('PostLoaded', function () {
		var _func = Item.nameOverrideFunctions[id];
		Item.registerNameOverrideFunction(id, function (item, name) {
			if (_func) name = _func(item, name);
			if (_inventory_open) name += "\n§9" + mod.name + ": Machine";
			return name;
		})
	});
}
*/




// file: ModInfo.js

/*
//Machine;
mod_tip(BlockID.sagmill);
mod_tip(BlockID.alloySmelter);
//Conduit;
mod_tip(BlockID.fluidConduit);
mod_tip(BlockID.energyConduit);
mod_tip(BlockID.itemConduit);
//Generator;
mod_tip(BlockID.photovoltaicCell);
mod_tip(BlockID.advancedPhotovoltaicCell);
mod_tip(BlockID.vibrantPhotovoltaicCell);
mod_tip(BlockID.stirlingGen);
//Glass
mod_tip(BlockID.fusedGlass);
mod_tip(BlockID.fusedQuartz);
//Items
mod_tip(ItemID.basicGear);
mod_tip(ItemID.binderComposite);
mod_tip(ItemID.conduitBinder);
//Ingots
mod_tip(ItemID.itemYetaWrench);
mod_tip(ItemID.conductiveIron);
mod_tip(ItemID.silicon);
mod_tip(ItemID.vibrantAlloy);
mod_tip(ItemID.soulariumIngot);
mod_tip(ItemID.electricalSteel);
mod_tip(ItemID.darkSteel);
mod_tip(ItemID.energeticAlloy);
mod_tip(ItemID.vibrantNugget);
mod_tip(ItemID.vibrantCrystal);
mod_tip(ItemID.enderCrystal);
// Skulls
mod_tip(ItemID.endermanSkull);
mod_tip(ItemID.zombieSkull);
mod_tip(ItemID.skullZombieController);
mod_tip(ItemID.creeperSkull);
mod_tip(ItemID.skeletonSkull);
//Capacitor
mod_tip(ItemID.basicCapacitor);
mod_tip(ItemID.doublelayerCapacitor);
mod_tip(ItemID.octadicCapacitor);
*/
// END \__*__/





// file: Base/core/Machine/./painter.js

/*const CrafterCore = {
  addBlock: function(type) {
    for (let i in BlockID) {
      var tile = TileEntity.getPrototype(BlockID[i]);
      if (!tile) {
        let id = type + BlockID[i]
        
      }
    }
  }
}
*/




// file: Base/core/Machine/./recipe.js

var RecipeRegistry = {
   crusher: [],
   smelter: [],
   sliceAndSplice: [],
   theVat: [],
   soulBinder: [],

   addSliceAndSplice: function(obj) {
      this.sliceAndSplice.push(obj);
   },
   addSmelter: function(obj) {
      this.smelter.push(obj);
   },
   addCrusher: function(obj) {
      this.crusher.push(obj);
   },
   addVat: function(obj) {
      this.theVat.push(obj)
   },
   isIngr1: function(id, data) {
      for (let i in RecipeRegistry.smelter) {
         var Recipe = RecipeRegistry.smelter[i];
         var ingre1 = Recipe.ingredient1;
         if (id == ingre1.id && data == ingre1.data) {
            return true;
         }
      }
   },

   isIngr2: function(id, data) {
      for (let i in RecipeRegistry.smelter) {
         var Recipe = RecipeRegistry.smelter[i];
         var ingre2 = Recipe.ingredient2;
         if (id == ingre2.id && data == ingre2.data) {
            return true
         }
      }
   },
   isIngr3: function(id, data) {
      for (let i in RecipeRegistry.smelter) {
         var Recipe = RecipeRegistry.smelter[i];
         var ingre3 = Recipe.ingredient3;
         if (id == ingre3.id && data == ingre3.data) {
            return true
         }
      }
   },
   getInCrusher: function(id, data) {
      for (let i in RecipeRegistry.crusher) {
         var Recipe = RecipeRegistry.crusher[i];
         var ingre = Recipe.ingredient;
         if (id == ingre.id && data == ingre.data) {
            return true
         }
      }
   },
   getInVat1: function(id, data) {
      for (let i in RecipeRegistry.theVat) {
         var Recipe = RecipeRegistry.theVat[i];
         var ingre1 = Recipe.input1;
         if (id == ingre1.id && data == ingre1.data) {
            return true
         }
      }
   },
   getInVat2: function(id, data) {
      for (let i in RecipeRegistry.theVat) {
         var Recipe = RecipeRegistry.theVat[i];
         var ingre2 = Recipe.input2;
         if (id == ingre2.id && data == ingre2.data) {
            return true
         }
      }
   },
   getLiquidVat1: function(liquid) {
      for (let i in RecipeRegistry.theVat) {
         var Recipe = RecipeRegistry.theVat[i];
         var liquidIn = Recipe.inputLiquid;
         if (liquid == liquidIn) {
            return true
         }
      }
   },
   getLiquidVat2: function(liquid) {
      for (let i in RecipeRegistry.theVat) {
         var Recipe = RecipeRegistry.theVat[i];
         var liquidOut = Recipe.outputLiquid;
         if (liquid == liquidOut) {
            return true
         }
      }
   }
};
/*
RecipeRegistry.addCrusher({
    ingredient: { id: 296, data: 0 },
    result0: { id: ItemID.dustWheat, data: 0, chance: 1 },
    result1: { id: VanillaItemID.wheat_seed, data: 0, chance: 0.45 },
    result2: { id: 0, data: 0, chance: 0 },
    result3: { id: 0, data: 0, chance: 0 },
    time: 100,
    by: "EnderIO"
  });

isValid: function(item) {
        return RecipeRegistry.getInCrusher(item.id); 
      }

RecipeRegistry.addSmelter({
    ingredient1: { id: 331, data: 0, count: 1 },
    ingredient2: { id: ItemID.silicon, data: 0 },
    ingredient3: { id: 0, data: 0, count: 0, count: 1 },
    result: { id: ItemID.redstoneAlloy, count: 1, data: 0 },
    time: 250
  });
*/




// file: Base/core/Machine/./defined.js

// constants
var GUI_SCALE = 3.2;
var GUI_ENER = 0.6;
// API Machine
var RF = EnergyTypeRegistry.assureEnergyType("Rf", 0.25);
var EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);
var RF_type2 = EnergyTypeRegistry.assureEnergyType("RF", 0.25);

var MachineRegistry = {
  machineIDs: {},

  isMachine: function(id) {
    return this.machineIDs[id];
  },

  // Machine Base
  registerPrototype: function(id, Prototype) {
    // register ID
    this.machineIDs[id] = true;
    
    // audio
    if (Prototype.getStartSoundFile) {
      if (!Prototype.getStartingSoundFile) {
        Prototype.getStartingSoundFile = function() { return null; }
      }
      if (!Prototype.getInterruptSoundFile) {
        Prototype.getInterruptSoundFile = function() { return null; }
      }
      Prototype.startPlaySound = Prototype.startPlaySound || function() {
        if (!Config.machineSoundEnabled) { return; }
        let audio = this.audioSource;
        if (audio && audio.isFinishing) {
          audio.stop();
          audio.media = audio.startingSound || audio.startSound;
          audio.start();
          audio.isFinishing = false;
        }
        else if (!this.remove && (!audio || !audio.isPlaying()) && this.dimension == Player.getDimension()) {
          this.audioSource = SoundAPI.createSource([this.getStartingSoundFile(), this.getStartSoundFile(), this.getInterruptSoundFile()], this, 16);
        }
      }
      Prototype.stopPlaySound = Prototype.stopPlaySound || function(playInterruptSound) {
        let audio = this.audioSource;
        if (audio) {
          if (!audio.isPlaying()) {
            this.audioSource = null;
          }
          else if (!audio.isFinishing) {
            audio.stop();
            if (playInterruptSound) {
              audio.playFinishingSound();
            }
          }
        }
      }
    }
    else {
      Prototype.startPlaySound = Prototype.startPlaySound || function(name) {
        if (!Config.machineSoundEnabled) { return; }
        let audio = this.audioSource;
        if (!this.remove && (!audio || !audio.isPlaying()) && this.dimension == Player.getDimension()) {
          let sound = SoundAPI.playSoundAt(this, name, true, 16);
          this.audioSource = sound;
        }
      }
      Prototype.stopPlaySound = Prototype.stopPlaySound || function() {
        if (this.audioSource && this.audioSource.isPlaying()) {
          this.audioSource.stop();
          this.audioSource = null;
        }
      }
    }

    // machine activation
    if (Prototype.defaultValues && Prototype.defaultValues.isActive !== undefined) {
      if (!Prototype.renderModel) {
        Prototype.renderModel = this.renderModelWithRotation;
      }

      Prototype.setActive = Prototype.setActive || this.setActive;

      Prototype.activate = Prototype.activate || function() {
        this.setActive(true);
      }
      Prototype.deactivate = Prototype.deactivate || function() {
        this.setActive(false);
      }
      Prototype.destroy = Prototype.destroy || function() {
        BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
        this.stopPlaySound();
      }
    }

    if (!Prototype.init && Prototype.renderModel) {
      Prototype.init = Prototype.renderModel;
    }

    ToolAPI.registerBlockMaterial(id, "stone", 1, true);
    Block.setDestroyTime(id, 3);
    TileEntity.registerPrototype(id, Prototype);
  },

  registerElectricPrototype: function(id, Prototype) {
    // wire connection
    ICRender.getGroup("rf-wire").add(id, -1);
    ICRender.getGroup("ic-wire").add(id, -1);

    // setup energy values
    if (Prototype.defaultValues) {
      Prototype.defaultValues.energy = 0;
    }
    else {
      Prototype.defaultValues = {
        energy: 0
      };
    }

    if (!Prototype.defaultValues.energy) {
      Prototype.defaultValues.energy = 0;
    }

    Prototype.getTier = Prototype.getTier || function() {
      return 1;
    }


    if (!Prototype.getMaxPacketSize) {
      Prototype.getMaxPacketSize = function(tier) {
        return 8 << this.getTier() * 2;
      }
    }
        
    
    Prototype.energyReceive = Prototype.energyReceive || this.basicEnergyReceiveFunc;

    if (!Prototype.getEnergyStorage) {
      Prototype.getEnergyStorage = function() {
        return 0;
      };
    }

    this.registerPrototype(id, Prototype);
    // register for energy net
    EnergyTileRegistry.addEnergyTypeForId(id, RF);
    EnergyTileRegistry.addEnergyTypeForId(id, EU);
    EnergyTileRegistry.addEnergyTypeForId(id, RF_type2);
  },
  registerElectricMachine: function(id, Prototype) {
    this.registerElectricPrototype(id, Prototype);


    Prototype.canReceiveEnergy = function() {
        return true;
      },

      Prototype.canExtractEnergy = function() {
        return false;
      }

  },
  /*
    // RF machines
    registerElectricMachine: function(id, Prototype) {
      // wire connection
      ICRender.getGroup("rf-wire").add(id, -1);
    //  ICRender.getGroup("ic-wire").add(id, -1);

      // setup energy values
      if (Prototype.defaultValues) {
        Prototype.defaultValues.energy = 0;
      }
      else {
        Prototype.defaultValues = {
          energy: 0
        };
      }
      
      if (!Prototype.defaultValues.energy) {
         Prototype.defaultValues.energy = 0;
       }

      Prototype.getTier = Prototype.getTier || function() {
        return 1;
      },
      
      Prototype.canReceiveEnergy = function() {
          return true;
        },

      Prototype.canExtractEnergy = function () {
          return false;
        }

      if (!Prototype.getEnergyStorage) {
        Prototype.getEnergyStorage = function() {
          return 0;
        };
      }
      if (!Prototype.getMaxPacketSize) {
        Prototype.getMaxPacketSize = function(tier) {
          return 8 << this.getTier() * 2;
        }
      }

      Prototype.energyReceive = Prototype.energyReceive || this.basicEnergyReceiveFunc;

      this.registerPrototype(id, Prototype);
      // register for energy net
      EnergyTileRegistry.addEnergyTypeForId(id, RF);

    },*/

  registerGenerator(id, Prototype) {
    this.registerElectricPrototype(id, Prototype);
    Prototype.canReceiveEnergy = function() {
        return false;
      },

      Prototype.canExtractEnergy = function() {
        return true;
      },

      Prototype.energyTick = Prototype.energyTick || function(type, src) {
        var output = Math.min(this.data.energy, this.getMaxPacketSize());
        this.data.energy += src.add(output) - output;
      }


  },

  registerRFStorage(id, Prototype) {
    this.registerElectricPrototype(id, Prototype);
    
    Prototype.canExtractEnergy = function() {
        return true;
      },

      Prototype.energyTick = Prototype.energyTick || function(type, src) {
        var output = Math.min(this.data.energy, this.getMaxPacketSize());
        this.data.energy += src.add(output) - output;
      },

      Prototype.canReceiveEnergy = function() {
        return true;
      }

    //Prototype.energyTick = Prototype.energyTick || this.basicEnergyOut
  },

  // standard functions
  setStoragePlaceFunction: function(id, fullRotation) {
    Block.registerPlaceFunction(BlockID[id], function(coords, item, block) {
      var place = World.canTileBeReplaced(block.id, block.data) ? coords : coords.relative;
      World.setBlock(place.x, place.y, place.z, item.id, 0);
      World.playSound(place.x, place.y, place.z, "dig.stone", 1, 0.8)
      var rotation = TileRenderer.getBlockRotation(fullRotation);
      var tile = World.addTileEntity(place.x, place.y, place.z);
      tile.data.meta = rotation;
      TileRenderer.mapAtCoords(place.x, place.y, place.z, item.id, rotation);
      if (item.extra) {
        tile.data.energy = item.extra.getInt("energy");
      }
    });
  },

  setFacing: function(coords) {
    if (Entity.getSneaking(player)) {
      var facing = coords.side ^ 1;
    } else {
      var facing = coords.side;
    }
    if (facing != this.data.meta) {
      this.data.meta = facing;
      this.renderModel();
      return true;
    }
    return false;
  },

  renderModel: function() {
    if (this.data.isActive) {
      TileRenderer.mapAtCoords(this.x, this.y, this.z, this.blockID, 0);
    } else {
      BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
    }
  },

  renderModelWithRotation: function() {
    TileRenderer.mapAtCoords(this.x, this.y, this.z, this.blockID, this.data.meta + (this.data.isActive ? 4 : 0));
  },

  renderModelWith6Sides: function() {
    TileRenderer.mapAtCoords(this.x, this.y, this.z, this.blockID, this.data.meta + (this.data.isActive ? 6 : 0));
  },

  setActive: function(isActive) {
    if (this.data.isActive != isActive) {
      this.data.isActive = isActive;
      this.renderModel();
    }
  },
  /*
    basicEnergyOutFunc: function(type, src) {
      this.data.last_energy_receive = this.data.energy_receive;
      this.data.energy_receive = 0;
      this.data.last_voltage = this.data.voltage;
      this.data.voltage = 0;
      var output = this.getMaxPacketSize();
      if (this.data.energy >= output) {
        this.data.energy += src.add(output) - output;
      }
    },*/

  basicEnergyReceiveFunc: function(type, amount, voltage) {
    var maxVoltage = this.getMaxPacketSize();
    if (voltage > maxVoltage) {
      amount = Math.min(amount, maxVoltage);
    }
    var add = Math.min(amount, this.getEnergyStorage() - this.data.energy);
    this.data.energy += add;
    //this.data.energy_receive += add;
    //this.data.voltage = Math.max(this.data.voltage, voltage);
    return add;
  },

  getLiquidFromItem: function(liquid, inputItem, outputItem, hand) {
    if (hand) outputItem = { id: 0, count: 0, data: 0 };
    var empty = LiquidLib.getEmptyItem(inputItem.id, inputItem.data);
    if (empty && (!liquid && this.interface.canReceiveLiquid(empty.liquid) || empty.liquid == liquid) && !this.liquidStorage.isFull(empty.liquid)) {
      if (outputItem.id == empty.id && outputItem.data == empty.data && outputItem.count < Item.getMaxStack(empty.id) || outputItem.id == 0) {
        var liquidLimit = this.liquidStorage.getLimit(empty.liquid);
        var storedAmount = this.liquidStorage.getAmount(liquid).toFixed(3);
        var count = Math.min(hand ? inputItem.count : 1, parseInt((liquidLimit - storedAmount) / empty.amount));
        if (count > 0) {
          this.liquidStorage.addLiquid(empty.liquid, empty.amount * count);
          inputItem.count -= count;
          outputItem.id = empty.id;
          outputItem.data = empty.data;
          outputItem.count += count;
          if (!hand) this.container.validateAll();
        }
        else if (inputItem.count == 1 && empty.storage) {
          var amount = Math.min(liquidLimit - storedAmount, empty.amount);
          this.liquidStorage.addLiquid(empty.liquid, amount);
          inputItem.data += amount * 1000;
        }
        if (hand) {
          if (outputItem.id) {
            Player.addItemToInventory(outputItem.id, outputItem.count, outputItem.data);
          }
          if (inputItem.count == 0) inputItem.id = inputItem.data = 0;
          Player.setCarriedItem(inputItem.id, inputItem.count, inputItem.data);
          return true;
        }
      }
    }
  },

  addLiquidToItem: function(liquid, inputItem, outputItem) {
    var amount = this.liquidStorage.getAmount(liquid).toFixed(3);
    if (amount > 0) {
      var full = LiquidLib.getFullItem(inputItem.id, inputItem.data, liquid);
      if (full && (outputItem.id == full.id && outputItem.data == full.data && outputItem.count < Item.getMaxStack(full.id) || outputItem.id == 0)) {
        if (amount >= full.amount) {
          this.liquidStorage.getLiquid(liquid, full.amount);
          inputItem.count--;
          outputItem.id = full.id;
          outputItem.data = full.data;
          outputItem.count++;
          this.container.validateAll();
        }
        else if (inputItem.count == 1 && full.storage) {
          if (inputItem.id == full.id) {
            amount = this.liquidStorage.getLiquid(liquid, full.amount);
            inputItem.data -= amount * 1000;
          } else {
            amount = this.liquidStorage.getLiquid(liquid, full.storage);
            inputItem.id = full.id;
            inputItem.data = (full.storage - amount) * 1000;
          }
        }
      }
    }
  },

  isValidRFItem: function(id, count, data, container) {
    var level = container.tileEntity.getTier();
    return ChargeItemRegistry.isValidItem(id, "Rf", level);
  },

  isValidRFStorage: function(id, count, data, container) {
    var level = container.tileEntity.getTier();
    return ChargeItemRegistry.isValidStorage(id, "Rf", level);
  },

  updateGuiHeader: function(gui, text) {
    var header = gui.getWindow("header");
    header.contentProvider.drawing[2].text = Translation.translate(text);
  }
}

var transferByTier = {
  1: 1280,
  2: 5120,
  3: 20480,
  4: 8192
}

// base

Block.createSpecialType({
  base: 1,
  solid: true,
  destroytime: 5,
  explosionres: 30,
  lightopacity: 15,
  renderlayer: 2,
  sound: "stone"
}, "machine");




// file: Base/core/Machine/./upgradeAPI.js

var UpgradeAPI = {
  data: {},

  getUpgradeData: function(id) {
    return this.data[id];
  },

  isUpgrade: function(id) {
    return UpgradeAPI.data[id] ? true : false;
  },

  isValidUpgrade: function(id, count, data, container) {
    var upgrades = container.tileEntity.upgrades;
    var upgradeData = UpgradeAPI.getUpgradeData(id);
    if (upgradeData && (!upgrades || upgrades.indexOf(upgradeData.type) != -1)) {
      return true;
    }
    return false;
  },

  registerUpgrade: function(id, type, func) {
    this.data[id] = { type: type, func: func };
  },

  callUpgrade: function(item, machine, container, data) {
    var upgrades = machine.upgrades;
    var upgrade = this.getUpgradeData(item.id);
    if (upgrade && (!upgrades || upgrades.indexOf(upgrade.type) != -1)) {
      upgrade.func(item, machine, container, data);
    }
  },

  getUpgrades: function(machine, container) {
    var upgrades = [];
    for (var slotName in container.slots) {
      if (slotName.match(/Capacitor/)) {
        var slot = container.getSlot(slotName);
        if (slot.id > 0) {
          var find = false;
          for (var i in upgrades) {
            var item = upgrades[i];
            if (item.id == slot.id && item.data == slot.data) {
              item.count += slot.count;
              find = true;
              break;
            }
          }
          if (!find) {
            item = { id: slot.id, count: slot.count, data: slot.data };
            upgrades.push(item);
          }
        }
      }
    }
    return upgrades;
  },

  executeUpgrades: function(machine) {
    var container = machine.container;
    var data = machine.data;
    var upgrades = this.getUpgrades(machine, container);
    for (var i in upgrades) {
      this.callUpgrade(upgrades[i], machine, container, data);
    }
    StorageInterface.checkHoppers(machine);
  },
}




// file: Base/core/Machine/./SAG Core.js

var GrindingBall = {
   idBall: {},

   regItem: function(id, name) {
      // id sample: conductive_iron
      let texture = "item_alloy_ball_" + id;
      let iID = "ball_" + id;
      IDRegistry.genItemID(iID);
      Item.createItem(iID, name + " Grinding Ball", { name: texture }, { stack: 64 });
   },

   regModBall: function(id, name, main, bonus, powUse, dura, recipe) {
      this.regItem(id, name);

      this.idBall[ItemID["ball_" + id]] = { main: (main - 100) / 100, bonus: bonus / 100, use: powUse / 100, durability: dura / 2400 };

      if (recipe) {
         Callback.addCallback("PreLoaded", function() {
            Recipes.addShaped({ id: ItemID["ball_" + id], count: 24, data: 0 }, [
      	" a ",
      	"aaa",
	     " a "
    ], ['a', ItemID[recipe.id], recipe.data]);
         })
      };
   },

   regBall: function(id, main, bonus, powUse, dura) {
      this.idBall[id] = { main: (main - 100) / 100, bonus: bonus / 100, use: powUse / 100, durability: dura / 2400 }
   },

   getBallID: function(id) {
      if (GrindingBall.idBall[id]) {
         return GrindingBall.idBall[id];
      }
      /*else {
              return alert("Undefined id")
           }*/
   }
};
// ender io resource
GrindingBall.regBall(VanillaItemID.flint, 120, 125, 85, 24000)
GrindingBall.regModBall("dark_steel", "Dark Steel", 135, 200, 70, 124800, { id: "darkSteel", data: 0 })
GrindingBall.regModBall("conductive_iron", "Conductive Iron", 135, 100, 100, 40800, { id: "conductiveIron", data: 0 })
GrindingBall.regModBall("electrical_steel", "Electrical Steel", 120, 165, 80, 40800, { id: "electricalSteel", data: 0 })
GrindingBall.regModBall("energetic_alloy", "Energetic Alloy", 160, 110, 110, 81600, { id: "energeticAlloy", data: 0 })
GrindingBall.regModBall("vibrant_alloy", "Vibrant Alloy", 175, 135, 135, 81600, { id: "vibrantAlloy", data: 0 })
GrindingBall.regModBall("redstone_alloy", "Redstone Alloy", 100, 100, 35, 31200, { id: "redstoneAlloy", data: 0 })
GrindingBall.regModBall("pulsating_iron", "Pulsating Iron", 100, 185, 100, 100800, { id: "pulsatingIron", data: 0 })
GrindingBall.regModBall("soularium", "Soularium", 120, 215, 90, 81600, { id: "soularium", data: 0 })
// thermal resource
/*
The grinding balls from Thermal's resources are registered at: dev/Base/Integration/thermal.js
*/
// endergy
GrindingBall.regModBall("crude_steel", "Crude Steel", 120, 125, 85, 24000, { id: "crudeSteel", data: 0 })
GrindingBall.regModBall("crystalline_alloy", "Crude Steel", 180, 140, 145, 81600, { id: "crystalline", data: 0 })
GrindingBall.regModBall("vivid_alloy", "Vivid Alloy", 175, 135, 135, 81600, { id: "vividAlloy", data: 0 })




// file: Base/core/Conduit/api.js

let ConduitRegistry = {

   registerCable: function(nameID, maxVoltage) {
      let blockID = BlockID[nameID];
      RF.registerWire(blockID, maxVoltage);
      RF_type2.registerWire(blockID, maxVoltage);
      Item.registerNameOverrideFunction(blockID, function(item, name) {
         return name + "\n§7" + Translation.translate("Max Tranfer: ") + maxVoltage + " RF/t";
      });
   },

   setupModel: function(id, width, groupConduit) {
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
    ]

      var group = ICRender.getGroup(groupConduit);
      group.add(id, -1);


      for (var i in boxes) {
         var box = boxes[i];

         var model = BlockRenderer.createModel();
         model.addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5], id, 0);
         model.addBox(0.5 - 0.3125 / 2, 0.5 - 0.3125 / 2, 0.5 - 0.3125 / 2, 0.5 + 0.3125 / 2, 0.5 + 0.3125 / 2, 0.5 + 0.3125 / 2, id, 0);
         render.addEntry(model).asCondition(box.side[0], box.side[1], box.side[2], group, 0);
      }
      // BlockRenderer.setCustomCollisionShape(id, 0, shape);

      var model = BlockRenderer.createModel();
      model.addBox(0.5 - 0.3125 / 2, 0.5 - 0.3125 / 2, 0.5 - 0.3125 / 2, 0.5 + 0.3125 / 2, 0.5 + 0.3125 / 2, 0.5 + 0.3125 / 2, id, 0);
      render.addEntry(model);

      width = Math.max(width, 0.5);
      Block.setBlockShape(id, { x: 0.5 - width / 2, y: 0.5 - width / 2, z: 0.5 - width / 2 }, { x: 0.5 + width / 2, y: 0.5 + width / 2, z: 0.5 + width / 2 });
   }
}

var ConduitWidth = 0.2 //0.1875//0.375

var blocksCheck = [
	{x: 0, y: -1, z: 0},
	{x: 0, y: 1, z: 0},
	{x: -1, y: 0, z: 0},
	{x: 1, y: 0, z: 0},
	{x: 0, y: 0, z: -1},
	{x: 0, y: 0, z: 1},
];





// file: Base/core/dev/./genFuel.js

var GenFuel = {
   coolFuel: [],
   heatFuel: [],

   addHeatFuel: function(id, RF, cool, cost, time) {
      // id: id heat liquid; RF: RF per tick; coolCost = cool liquid use / cool amout,example: water: 12, hootch use: 32 => cool cost: 8/3; cost: heat liquid use per tick; time: burn time(t/mb)
      this.heatFuel.push({ id: id, product: RF, coolCost: cool, amount: cost, time: time })
   },

   addCoolFuel: function(id, time) {
      // id: id cool liquid; time: time to burn 1 mb
      this.coolFuel.push({ id: id, time: time });
   },

   getHeat: function(liquid) {
      for (let i in this.heatFuel) {
         var recipe = this.heatFuel[i];
         var id = recipe.id;
         if (liquid == id) {
            return recipe
         }
      }
   },
   
   getCool: function(liquid) {
      for (let i in this.coolFuel) {
         var recipe = this.coolFuel[i];
         var id = recipe.id;
         if (liquid == id) {
            return recipe
         }
      }
   }
   
}

GenFuel.addCoolFuel("water", 12);
GenFuel.addHeatFuel("hootch", 60, 8 / 3, 1 / 6, 6);
GenFuel.addHeatFuel("fireWater", 80, 2, 1 / 15, 15);
GenFuel.addHeatFuel("rocketFuel", 160, 1, 1 / 7, 7);





// file: Base/core/dev/./item_name.js

var ItemName = {
	
	showBlockStorage: function(item, name, capacity){
		//var tierText = "§7" + Translation.translate("Power Tier: ") + tier;
		
		var energy = 0;
		if(item.extra){
			energy = item.extra.getInt("energy");
		}
		var energyText = this.displayEnergy(energy) + "/" + capacity + " RF";
		
		return name +/* "\n" + tierText + */ "\n" +energyText;
	},
	
	getTooltip: function(name, tooltip){
		return "\n" + tooltip;
	},
	
	getItemStorageText: function(item){
		var capacity = ChargeItemRegistry.getMaxCharge(item.id);
		var energy = ChargeItemRegistry.getEnergyStored(item);
		return "§e" + this.displayEnergy(energy) + "/" + this.displayEnergy(capacity) + " RF";
	},
	
	displayEnergy: function(energy){
		if(!Config.debugMode){
			if(energy >= 1e6){
				return Math.floor(energy / 1e5) / 10 + "M";
			}
			if(energy >= 1000){
				return Math.floor(energy / 100) / 10 + "K";
			}
		}
		return energy;
	}
}




// file: Base/core/dev/./config.js

let Config = {
	reload: function(){
		this.debugMode = __config__.getBool("debug_mode") || false;
		this.soundEnabled = __config__.getBool("sound_enabled");
		this.machineSoundEnabled = __config__.getBool("machine_sounds");
		
		var lang = FileTools.ReadKeyValueFile("games/com.mojang/minecraftpe/options.txt").game_language;
		this.language = (lang || "en_US").substring(0, 2);
	}
}

Config.reload();

var player;
Callback.addCallback("LevelLoaded", function(){
	Config.reload();
	player = Player.get();
});

isLevelDisplayed = false;
Callback.addCallback("LevelDisplayed", function(){
	isLevelDisplayed = true;
});
Callback.addCallback("LevelLeft", function(){
	isLevelDisplayed = false;
});




// file: Base/core/dev/./tool.js

let ICTool = {
	wrenchData: {},
	
	registerWrench: function(id, chance, energyOnUse){
		this.wrenchData[id] = {chance: chance, energy: energyOnUse}
	},
	
	getWrenchData: function(id){
		return this.wrenchData[id];
	},
	
	isValidWrench: function(item, damage){
		let wrench = this.getWrenchData(item.id);
		if(wrench){
			let energyStored = ChargeItemRegistry.getEnergyStored(item);
			if(!wrench.energy || energyStored >= wrench.energy * damage){
				return true;
			}
		}
		return false;
	},
	
	useWrench: function(item, damage){
		let wrench = this.getWrenchData(item.id);
		if(!wrench.energy){
			ToolAPI.breakCarriedTool(damage);
		} else {
			this.useElectricItem(item, wrench.energy * damage);
		}
		SoundAPI.playSound("Tools/Wrench.ogg");
	},
	
	addRecipe: function(result, data, tool){
		data.push({id: tool, data: -1});
		Recipes.addShapeless(result, data, function(api, field, result){
			for (let i in field){
				if (field[i].id == tool){
					field[i].data++;
					if (field[i].data >= Item.getMaxDamage(tool)){
						field[i].id = field[i].count = field[i].data = 0;
					}
				}
				else {
					api.decreaseFieldSlot(i);
				}
			}
		});
	},
	
	dischargeItem: function(item, consume){
		let player = Player.get();
		let energy = 0;
		let armor = Entity.getArmorSlot(player, 1);
		let itemChargeLevel = ChargeItemRegistry.getItemData(item.id).level;
		let armorChargeData = ChargeItemRegistry.getItemData(armor.id);
		if(armorChargeData && armorChargeData.level >= itemChargeLevel){
			energy = ChargeItemRegistry.getEnergyFrom(armor, "Rf", consume, consume, 100);
			consume -= energy;
		}
		let energyStored = ChargeItemRegistry.getEnergyStored(item);
		if(energyStored >= consume){
			if(energy > 0){
				Entity.setArmorSlot(player, 1, armor.id, 1, armor.data, armor.extra);
			}
			ChargeItemRegistry.setEnergyStored(item, energyStored - consume);
			return true;
		}
		return false;
	},
	
	useElectricItem: function(item, consume){
		if(this.dischargeItem(item, consume)){
			Player.setCarriedItem(item.id, 1, item.data, item.extra);
			return true;
		}
		return false;
	},
	
	registerElectricHoe: function(nameID){
		Item.registerUseFunction(nameID, function(coords, item, block){
			if((block.id==2 || block.id==3 || block.id==110 || block.id==243) && coords.side==1 && ICTool.useElectricItem(item, 50)){ 
				World.setBlock(coords.x, coords.y, coords.z, 60);
				World.playSoundAtEntity(Player.get(), "step.gravel", 1, 0.8);
			}
		});
	},
	
	registerElectricTreerap: function(nameID){
		Item.registerUseFunction(nameID, function(coords, item, block){
			if(block.id == BlockID.rubberTreeLogLatex && block.data - 2 == coords.side && ICTool.useElectricItem(item, 50)){
				SoundAPI.playSound("Tools/Treetap.ogg");
				World.setBlock(coords.x, coords.y, coords.z, BlockID.rubberTreeLogLatex, block.data - 4);
				Entity.setVelocity(
					World.drop(
						coords.relative.x + 0.5,
						coords.relative.y + 0.5,
						coords.relative.z + 0.5,
						ItemID.latex, 1 + parseInt(Math.random() * 3), 0
					),
					(coords.relative.x - coords.x) * 0.25,
					(coords.relative.y - coords.y) * 0.25,
					(coords.relative.z - coords.z) * 0.25
				);
			}
		});
	}
}

Callback.addCallback("DestroyBlockStart", function(coords, block){
	if(MachineRegistry.isMachine(block.id)){
		let item = Player.getCarriedItem();
		if(ICTool.isValidWrench(item, 10)){
			Block.setTempDestroyTime(block.id, 0);
		}
	}
});




// file: Base/core/dev/./ui_buttons.js

var currentUIscreen;
Callback.addCallback("NativeGuiChanged", function(screenName) {
  currentUIscreen = screenName;
  if (screenName != "in_game_play_screen" && UIbuttons.container) {
    UIbuttons.container.close();
  }
});

var fallVelocity = -0.0784;
var button_scale = 55 //__config__.getNumber("button_scale");
var UIbuttons = {
  funcs: 0,
  data: {},
  onSwitch: {},
  onUpdate: {},
  isEnabled: false,
  container: null,
  Window: new UI.Window({
    location: {
      x: 1000 - button_scale,
      y: UI.getScreenHeight() / 2 - button_scale * 2,
      width: button_scale,
      height: button_scale * 5
    },
    drawing: [{ type: "background", color: 0 }],
    elements: {}
  }),

  setArmorButton: function(id, name) {
    var data = { type: 0, name: name };
    if (!this.data[id]) {
      this.data[id] = [data]
    } else {
      this.data[id].push(data);
    }
  },

  setToolButton: function(id, name, notHidden) {
    var data = { type: 1, name: name, hidden: !notHidden };
    if (!this.data[id]) {
      this.data[id] = [data]
    } else {
      this.data[id].push(data);
    }
  },

  getButtons: function(id) {
    return this.data[id];
  },

  registerButton: function(name, properties) {
    buttonContent[name] = properties;
    buttonMap[name] = false;
  },

  registerSwitchFunction: function(id, func) {
    this.onSwitch[id] = func;
  },

  onButtonUpdate: function(name, func) {
    this.onUpdate[name] = func;
  }
}

var buttonMap = {
  button_nightvision: false,
  button_fly: false,
  button_jump: false,
  button_function: false,
  button_tele: false,
}

var buttonContent = {
  button_nightvision: {
    y: 0,
    type: "button",
    bitmap: "button_nightvision_on",
    bitmap2: "button_nightvision_off",
    scale: 50,
    clicker: {
      onClick: function() {
        var armor = Player.getArmorSlot(0);
        var extra = armor.extra;
        if (extra) {
          var nightvision = extra.getBoolean("nv");
        }
        else {
          var nightvision = false;
          extra = new ItemExtraData();
        }
        if (nightvision) {
          extra.putBoolean("nv", false);
          Game.message("§4" + Translation.translate("Nightvision mode disabled"));
        }
        else {
          extra.putBoolean("nv", true);
          Game.message("§2" + Translation.translate("Nightvision mode enabled"));
        }
        Player.setArmorSlot(0, armor.id, 1, armor.data, extra);
      }
    }
  },
  button_fly: {
    y: 1000,
    type: "button",
    bitmap: "button_fly_on",
    bitmap2: "button_fly_off",
    scale: 50
  },
  
  button_jump: {
    y: 3000,
    type: "button",
    bitmap: "button_jump_on",
    bitmap2: "button_jump_off",
    scale: 50,
    clicker: {
      onClick: function() {
        var armor = Player.getArmorSlot(3);
        var energyStored = ChargeItemRegistry.getEnergyStored(armor);
        var vel = Entity.getVelocity(Player.get());
        if (energyStored >= 4000 && Math.abs(vel.y - fallVelocity) < 0.0001) {
          Player.addVelocity(vel.x * 3.5, 1.3, vel.z * 3.5);
          ChargeItemRegistry.setEnergyStored(armor, energyStored - 4000);
          Player.setArmorSlot(3, armor.id, 1, armor.data, armor.extra);
        }
      }
    }
  },
  button_switch: {
    y: 4000,
    type: "button",
    bitmap: "button_switch",
    bitmap2: "button_switch_touched",
    scale: 25,
    clicker: {
      onClick: function() {
        var item = Player.getCarriedItem();
        if (UIbuttons.onSwitch[item.id]) {
          UIbuttons.onSwitch[item.id](item);
        }
      }
    }
  },
  button_tele: {
    y: 2000,
    type: "button",
    bitmap: "button_tele",
    bitmap2: "empty_button_up",
    scale: 50,
    clicker: {
      onClick: function() {
        var item = Player.getCarriedItem();
        let energyStored = ChargeItemRegistry.getEnergyStored(item);
        if (energyStored >= 15000) {
          let pos = Player.getPosition();
          let vec = Entity.getLookVector(Player.get());
          let crd = {};
          for (let t = 1; t <= 16; t++) {
            crd.x = pos.x + vec.x * t;
            crd.y = pos.y + vec.y * t;
            crd.z = pos.z + vec.z * t;
           // if (!GenerationUtils.isTransparentBlock(World.getBlockID(crd.x, crd.y, crd.z))) {
              Game.tipMessage("Teleport at: X: " + Math.round(crd.x) + " Y: " + Math.round(crd.y) + " Z: " + Math.round(crd.z));
              ChargeItemRegistry.setEnergyStored(item, energyStored - 15000);

              Entity.setPosition(Player.get(), crd.x, crd.y, crd.z);
           
           // }
          }
        } 
      }
    }
  },
  button_function: {
		y: 5000,
		type: "button",
		bitmap: "armor_f_off",
		bitmap2: "armor_f_on",
		scale: 25,
		clicker: {
			onClick: function(){
				UIbuttons.funcs = (UIbuttons.funcs+1)%2;
			switch(UIbuttons.funcs){
			case 0:
				Game.message("Armor Functions Diasbled");
			break;
			case 1:
				Game.message("Armor Functions Enabled");
			break;
}}}}

}

UIbuttons.Window.setAsGameOverlay(true);

function updateUIbuttons() {
  var elements = UIbuttons.Window.content.elements;
  for (var name in buttonMap) {
    if (buttonMap[name]) {
      if (!elements[name]) {
        elements[name] = buttonContent[name];
      }
      var element = elements[name];
      var func = UIbuttons.onUpdate[name];
      if (func) func(element);
      element.x = 0;
      buttonMap[name] = false;
    }
    else {
      elements[name] = null;
    }
  }
}

Callback.addCallback("LocalTick", function() {
  var armor = [Player.getArmorSlot(0), Player.getArmorSlot(1), Player.getArmorSlot(2), Player.getArmorSlot(3)];
  for (var i in armor) {
    var buttons = UIbuttons.getButtons(armor[i].id);
    for (var i in buttons) {
      var button = buttons[i];
      if (button.type == 0) {
        buttonMap[button.name] = true;
        UIbuttons.isEnabled = true;
      }
    }
  }
  var item = Player.getCarriedItem();
  var buttons = UIbuttons.getButtons(item.id);
  for (var i in buttons) {
    var button = buttons[i];
    if (button.type == 1 && (!button.hidden || Entity.getSneaking(Player.get()))) {
      buttonMap[button.name] = true;
      UIbuttons.isEnabled = true;
    }
  }
  if (UIbuttons.isEnabled && currentUIscreen == "in_game_play_screen") {
    updateUIbuttons();
    if (!UIbuttons.container || !UIbuttons.container.isOpened()) {
      UIbuttons.container = new UI.Container();
      UIbuttons.container.openAs(UIbuttons.Window);
    }

  }
  else if (UIbuttons.container) {
    UIbuttons.container.close();
    UIbuttons.container = null;
  }
  UIbuttons.isEnabled = false;
});





// file: Base/core/dev/./ender_ui.js

/**/




// file: Base/core/Liquid.js

LiquidRegistry.registerLiquid("nutrientDistillation", "Nutrient Distillation", ["nutrientDistillation_fluid"]);
LiquidRegistry.registerLiquid("hootch", "Hootch", ["hootch_fluid"]);
LiquidRegistry.registerLiquid("rocketFuel", "Rocket fuel", ["rocketFuel_fluid"]);
LiquidRegistry.registerLiquid("fireWater", "Fire Water", ["fireWater_fluid"]);

IDRegistry.genItemID("bucketHootch");
Item.createItem("bucketHootch", "Hootch Bucket Bucket", { name: "bucketHootch" }, { stack: 1 });
LiquidRegistry.registerItem("hootch", { id: 325, data: 0 }, { id: ItemID.bucketHootch, data: 0 });

IDRegistry.genItemID("bucketNutrient_distillation");
Item.createItem("bucketNutrient_distillation", "Nutrient Distillation Bucket", { name: "bucketNutrient_distillation" }, { stack: 1 });
LiquidRegistry.registerItem("nutrientDistillation", { id: 325, data: 0 }, { id: ItemID.bucketNutrient_distillation, data: 0 });

IDRegistry.genItemID("bucketFire_water");
Item.createItem("bucketFire_water", "Fire Water Bucket", { name: "bucketFire_water" }, { stack: 1 });
LiquidRegistry.registerItem("fireWater", { id: 325, data: 0 }, { id: ItemID.bucketFire_water, data: 0 });

IDRegistry.genItemID("bucketRocket_fuel");
Item.createItem("bucketRocket_fuel", "Rocket Fuel bucket", { name: "bucketRocket_fuel" }, { stack: 1 });
LiquidRegistry.registerItem("rocketFuel", { id: 325, data: 0 }, { id: ItemID.bucketRocket_fuel, data: 0 });

function clearAll(from) {
  from.id = 0;
  from.count = 0;
  from.data = 0;
}

var EnderIOLiquid = [
     "nutrientDistillation",
     "hootch",
     "rocketFuel",
     "fireWater"
]




// file: Base/core/debug.js

IDRegistry.genItemID("EIODebug");
Item.createItem("EIODebug", "Debug Tool?", { name: "itemConduitProbe" }, { stack: 1 });

Item.registerUseFunction("EIODebug", function(coords, item, block) {
   for (let i in RecipeRegistry.theVat) {
      let recipe = RecipeRegistry.theVat[i]
      Game.message("Recipe:" + recipe.input1.id + ":" + recipe.input1.data + " and " + recipe.input2.id + ":" + recipe.input2.data + " .Liquid:" + recipe.inputLiquid + ":" + recipe.inputAmount + " and " + recipe.outputLiquid + ":" + recipe.outputAmount);

   }
});




// file: Base/core/Book.js

/*var EnderBook = {
  SagMill: function() {
    for (let i = 1; i <= a.length; i++) {
    IDRegistry.genItemID("enderBook0");
    Item.createItem("enderBook0", "SAGMill's Guide", { name: "book", meta: 0 }, { stack: 1 });
    var container = new UI.Container();

    Callback.addCallback("ItemUse", function(coords, item) {
      if (item.id == ItemID.enderBook0) {
        container.openAs(SagHelp1);
      }
    });
      let next = i + 1;
      let pre = i - 1;
      var SagHelp + i = new UI.Window({
        standart: {
          header: { text: { text: "SAG Mill" } },
          inventory: { standart: false },
          background: { standart: true }
        },
        elements: {
          "progressScale": {
            type: "scale",
            x: 595,
            y: 250,
            direction: 3,
            bitmap: "bar_progress_down1",
            scale: 4.2,
            clicker: {
              onClick: function(container) {
                RV && RV.RecipeTypeRegistry.openRecipePage("enderio_sag", container);
              }
            }
          },
          "ingredient": { type: "slot", x: 602, y: 170, source: { id: 0, count: 1 } },
          "result0": { type: "slot", x: 505, y: 340, source: { id: 0, count: 1 } },
          "result1": { type: "slot", x: 570, y: 340, source: { id: 0, count: 1 } },
          "result2": { type: "slot", x: 635, y: 340, source: { id: 0, count: 1 } },
          "result3": { type: "slot", x: 700, y: 340, source: { id: 0, count: 1 } },
          "textChance0": { type: "text", x: 505, y: 300 },
          "textChance1": { type: "text", x: 570, y: 300 },
          "textChance3": { type: "text", x: 635, y: 300 },
          "textChance4": { type: "text", x: 700, y: 300 },
          "textTime": { type: "text", x: 700, y: 200 },
          "btnNext": {
            type: "button",
            x: 860,
            y: 620,
            bitmap: "btn_achievements_next",
            scale: 3,
            clicker: {
              onClick: function() {
                container.openAs(SagHelp + next);
              }
            }
          },
          "btnPrevious": {
            type: "button",
            x: 640,
            y: 620,
            bitmap: "btn_achievements_previous",
            scale: 3,
            clicker: {
              onClick: function() {
                container.openAs(SagHelp + pre);
              }
            }
          }
        }
      });
      let elements = getElements();
      let elem;
      //var TimeContainer = new UI.Container();
      var rec = RecipeRegistry.reqCrusher(true)
      let a = i - 1;
      let recipe = rec[a];
      let input = recipe.ingredient;
      let result0 = recipe.result0;
      let result1 = recipe.result1;
      let result2 = recipe.result2;
      let result3 = recipe.result3;

      elem = elements.get("textChance0");
      elem.onBindingUpdated("textChance0", result0.chance * 100 + "%");
      elem = elements.get("textChance1");
      elem.onBindingUpdated("textChance1", result1.chance * 100 + "%");
      elem = elements.get("textChance2");
      elem.onBindingUpdated("textChance2", result2.chance * 100 + "%");
      elem = elements.get("textChance3");
      elem.onBindingUpdated("textChance3", result3.chance * 100 + "%");

      elem = elements.get("ingredient");
      elem.source.id = input.id;
      elem = elements.get("result0");
      elem.source.id = result0.id;
      elem = elements.get("result1");
      elem.source.id = result1.id;
      elem = elements.get("result2");
      elem.source.id = result2.id;
      elem = elements.get("result3");
      elem.source.id = result3.id;
    }
    
  }
}

EnderBook.SagMill();*/




// file: Base/core/Renderer.js

var Renderer = {
  models: {},

  initRenderModel: function(id, data, model) {
    if (!this.models[id]) {
      this.models[id] = {};
    }
    BlockRenderer.enableCoordMapping(id, (data ? data : -1), model);
  },

  registerRenderModel: function(id, data, model) {
    if (!this.models[id]) {
      this.initRenderModel(id, data, model);
    }
    this.models[id][data] = model;
  },

  getRenderModel: function(id, data) {
    var renderer = this.models[id];
    if (renderer) {
      return renderer[data];
    }
    return 0;
  },

  mapAtCoords: function(x, y, z, id, data) {
    var render = this.getRenderModel(id, data);
    if (render) {
      BlockRenderer.mapAtCoords(x, y, z, render);
    }
  }
}




// file: Base/Items/Upgrade/Filter.js

Item.createUpgradeItem = function(id, name, res) {

  IDRegistry.genItemID(id);
  Item.createItem(id, name, { name: res }, { stack: 16 });

 // mod_tip(ItemID[id]);
};
//

Item.createUpgradeItem("itemFilter", "Basic Item Filter", "basic_item_filter");




// file: Base/Items/Upgrade/speed.js


Item.createUpgradeItem("extractSpeed", "Extract Speed Upgrade", "extract_speed_upgrade");




// file: Base/Items/SoulVessel.js

IDRegistry.genItemID("soulVesselEmpty");
Item.createItem("soulVesselEmpty", "Soul Vessel", { name: "itemSoulVessel" }, { stack: 1 });
var SoulVessel = {
  values: {},
  addVesselMob: function(id, mob) {
    this.values[id] = mob
  },
  getVesselMob: function(id) {
    return this.values[id]
  }
}

var setVessel = function(arg) {

  IDRegistry.genItemID("soulVessel" + arg.id);
  Item.createItem("soulVessel" + arg.id, "Soul Vessel ", { name: "itemSoulVesselFull" }, { stack: 1, isTech: false });
  Item.setGlint(ItemID["soulVessel" + arg.id], true);

  Item.registerNameOverrideFunction(ItemID["soulVessel" + arg.id], function(item, name) {
    return name + "\n§7" + arg.id;
  });

  SoulVessel.addVesselMob(ItemID["soulVessel" + arg.id], arg.mob.id)

  Callback.addCallback("PlayerAttack", function(player, victim) {
    item = Player.getCarriedItem();
    if (item.id == ItemID.soulVesselEmpty && Entity.getType(victim) == arg.mob.id) {
      Entity.remove(victim);
      Player.setCarriedItem(ItemID["soulVessel" + arg.id], 1, 0);
    }
  });

  Callback.addCallback("ItemUse", function(coords) {
    item = Player.getCarriedItem();
    if (item.id == ItemID["soulVessel" + arg.id]) {
      Entity.spawn(coords.relative.x + .5, coords.relative.y + .5, coords.relative.z + .5, arg.mob.id);
      Player.setCarriedItem(ItemID.soulVesselEmpty, 1, 0);
    }
  });

  Item.addCreativeGroup("SoulVessel", Translation.translate("Soul Vessel"), [
    ItemID["soulVessel" + arg.id]
]);
  //mod_tip(ItemID["soulVessel" + arg.id])
}
setVessel({ id: "Chicken", mob: { id: 10 } });
setVessel({ id: "Cow", mob: { id: 11 } });
setVessel({ id: "Pig", mob: { id: 12 } });
setVessel({ id: "Sheep", mob: { id: 13 } });
setVessel({ id: "Wolf", mob: { id: 14 } });
setVessel({ id: "Villager", mob: { id: 15 } });
setVessel({ id: "Moooshrom", mob: { id: 16 } });
setVessel({ id: "Squid", mob: { id: 17 } });
setVessel({ id: "Rabbit", mob: { id: 18 } });
setVessel({ id: "Bat", mob: { id: 19 } });
setVessel({ id: "Golem", mob: { id: 20 } });
setVessel({ id: "Snowman", mob: { id: 21 } });
setVessel({ id: "Ocelot", mob: { id: 22 } });
setVessel({ id: "Skeleton-horse", mob: { id: 26 } });
setVessel({ id: "Zombie-horse", mob: { id: 27 } });
setVessel({ id: "Zombie", mob: { id: 32 } });
setVessel({ id: "Creeper", mob: { id: 33 } });
setVessel({ id: "Skeleton", mob: { id: 34 } });
setVessel({ id: "Spider", mob: { id: 35 } });
setVessel({ id: "Pigman", mob: { id: 36 } });
setVessel({ id: "Slime", mob: { id: 37 } });
setVessel({ id: "Enderman", mob: { id: 38 } });
setVessel({ id: "Silverfish", mob: { id: 39 } });
setVessel({ id: "CaveSpider", mob: { id: 40 } });
setVessel({ id: "Ghast", mob: { id: 41 } });
setVessel({ id: "Magmacube", mob: { id: 42 } });
setVessel({ id: "Blaze", mob: { id: 43 } });
setVessel({ id: "Zombie-villager", mob: { id: 44 } });
setVessel({ id: "Husk", mob: { id: 47 } });
setVessel({ id: "Wither-skeleton", mob: { id: 48 } });
setVessel({ id: "Guardian", mob: { id: 49 } });
setVessel({ id: "Elder-guardian", mob: { id: 50 } });
setVessel({ id: "Shulker", mob: { id: 54 } });
setVessel({ id: "Endermite", mob: { id: 55 } });




// file: Base/Items/Tools/darkSteel.js

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
ItemRegistry.createTool("swordDarkSteel", { name: "dark_steel_sword", icon: "darkSteel_sword", material: "darkSteel" }, ToolType.SWORD);
/*
IDRegistry.genItemID("swordDarkSteel");
Item.createItem("swordDarkSteel", "The Ender", { name: "darkSteel_sword" }, { stack: 1 });
ToolAPI.setTool(ItemID.swordDarkSteel, "darkSteel", ToolType.sword);

IDRegistry.genItemID("pickaxeDarkSteel");
Item.createItem("pickaxeDarkSteel", "Dark Pick", { name: "darkSteel_pickaxe" }, { stack: 1 });
ToolAPI.setTool(ItemID.pickaxeDarkSteel, "darkSteel", ToolType.pickaxe);
*/
Item.registerNameOverrideFunction(ItemID.pickaxeDarkSteel, function(item, name) {
   return name + "\n" + "§7You can empower this\nwith Vibrant Crystal in Dark Anvil"
});

//empowered
/*
IDRegistry.genItemID("pickaxeDarkSteelEmpowered1");
Item.createItem("pickaxeDarkSteelEmpowered1", "Dark Pick", { name: "darkSteel_pickaxe" }, { isTech: true, stack: 1 });
ToolAPI.setTool(ItemID.pickaxeDarkSteelEmpowered1, "darkSteel", ToolType.darkPick);

ChargeItemRegistry.registerItem(ItemID.pickaxeDarkSteelEmpowered1, "Rf", 100000, 100, 2, true, true);

Item.registerNameOverrideFunction(ItemID.pickaxeDarkSteelEmpowered1, function(item, name) {
   return name + "\n" + "§7Empowered: Breaks obisdian faster.\n§a Explosive: §cNot Empowered \n  " + ItemName.getItemStorageText(item)
});
*/

//THE ENDER

Item.registerNameOverrideFunction(ItemID.swordDarkSteel, function(item, name) {
   return name + "\n" + "§7Increased skull and ender pearl drops"
});

Callback.addCallback("EntityDeath", function(ent, attacker, damageType) {
   let c = Entity.getPosition(ent);
   let item = Player.getCarriedItem();
   if (item.id == ItemID.swordDarkSteel && Entity.getType(attacker) == 63) {
      if (Entity.getType(ent) == 32 && Math.random() <= 0.4) {
         World.drop(c.x + .5, c.y + .5, c.z + .5, ItemID.zombieSkull, 1, 0);
      }
      if (Entity.getType(ent) == 33 && Math.random() <= 0.4) {
         World.drop(c.x + .5, c.y + .5, c.z + .5, ItemID.creeperSkull, 1, 0);
      }
      if (Entity.getType(ent) == 34 && Math.random() <= 0.4) {
         World.drop(c.x + .5, c.y + .5, c.z + .5, ItemID.skeletonSkull, 1, 0);
      }
      if (Entity.getType(ent) == 38 && Math.random() <= 0.8) {
         World.drop(c.x + .5, c.y + .5, c.z + .5, ItemID.endermanSkull, 1, 0);
         World.drop(c.x + .5, c.y + .5, c.z + .5, 368, 1 + Math.floor(Math.random() * 3), 0);
      }
      if (Entity.getType(ent) == 48 && Math.random() <= 0.6) {
         World.drop(c.x + .5, c.y + .5, c.z + .5, 397, 1, 1);
      }
   }
});




// file: Base/Items/uprDev/staffoftraveling.js

IDRegistry.genItemID("itemTravelStaff");
Item.createItem("itemTravelStaff", "Staff of Traveling", { name: "itemTravelStaff" }, { isTech: true, stack: 1 });

ChargeItemRegistry.registerExtraItem(ItemID.itemTravelStaff, "Rf", 250000, 100, 1, true, true);

Item.registerNameOverrideFunction(ItemID.itemTravelStaff, function(item, name) {
  return name + "\n" + ItemName.getItemStorageText(item);
});


UIbuttons.setToolButton(ItemID.itemTravelStaff, "button_tele");




// file: Base/Items/Armor/darkSteel.js

IDRegistry.genItemID("darkSteelHelmet");
IDRegistry.genItemID("darkSteelChestplate");
IDRegistry.genItemID("darkSteelLeggings");
IDRegistry.genItemID("darkSteelBoots");

Item.createArmorItem("darkSteelHelmet", "Dark steel helmet", {name: "darkSteel_helmet", meta: 0}, {type: "helmet", armor: 3, durability: 753, texture: "armor/darkSteel_layer_1.png"});
Item.createArmorItem("darkSteelChestplate", "Dark steel chestplate", {name: "darkSteel_chestplate", meta: 0}, {type: "chestplate", armor: 8, durability: 865, texture: "armor/darkSteel_layer_1.png"});
Item.createArmorItem("darkSteelLeggings", "Dark steel leggings", {name: "darkSteel_leggings", meta: 0}, {type: "leggings", armor: 6, durability: 798, texture: "armor/darkSteel_layer_2.png"});
Item.createArmorItem("darkSteelBoots", "Dark steel boots", {name: "darkSteel_boots", meta: 0}, {type: "boots", armor: 3, durability: 763, texture: "armor/darkSteel_layer_1.png"});





// file: Base/Items/powder.js

Item.createDyeItem = function(id, name, type) {
  var res = "item_material_organic_" + type + "_dye";
  IDRegistry.genItemID(id);
  Item.createItem(id, name, { name: res }, { stack: 64 });

 // mod_tip(ItemID[id]);
};

Item.createPowderItem = function(id, name, type) {
  var res = "item_material_powder_" + type;
  var nam = name + " Powder";
  IDRegistry.genItemID(id);
  Item.createItem(id, nam, { name: res }, { stack: 64 });

 // mod_tip(ItemID[id]);
};
Item.createPowderItem("dustLapis", "Lapis Lazuli", "lapis_lazuli")
Item.createPowderItem("dustQuarzt", "Quartz", "quartz")
Item.createDyeItem("greenDye", "Organic Green Dye", "green");
Item.createDyeItem("blackDye", "Organic Black Dye", "black");
Item.createDyeItem("brownDye", "Organic Brown Dye", "brown");

IDRegistry.genItemID("clipAndTrim");
Item.createItem("clipAndTrim", "Clippings and Trimmings", { name: "item_material_plantgreen" }, { stack: 64 });
IDRegistry.genItemID("twigAndPrun");
Item.createItem("twigAndPrun", "Twigs and Prunings", { name: "item_material_plantbrown" }, { stack: 64 });

IDRegistry.genItemID("machineDye");
Item.createItem("machineDye", "Industrial Dye Blend", { name: "item_material_machine_dye" }, { stack: 64 });

IDRegistry.genItemID("soulMachineDye");
Item.createItem("soulMachineDye", "Soul Attuned Powder Coating", { name: "item_material_soul_machine_dye" }, { stack: 64 });



Callback.addCallback("PreLoaded", function() {

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
    ingredient: { id: 263, data: 0 },
    result0: { id: ItemID.dustCoal, data: 0, chance: 1 },
    result1: { id: 0, data: 0, chance: 0 },
    result2: { id: 264, data: 0, chance: 0.001 },
    result3: { id: 0, data: 0, chance: 0 },
    time: 180,
    by: "EnderIO"
  });
  
  RecipeRegistry.addCrusher({
  	isGrinding: true,
    ingredient: { id: 2, data: 0 },
    result0: { id: ItemID.clipAndTrim, data: 0, chance: 0.75 },
    result1: { id: ItemID.clipAndTrim, data: 0, chance: 0.55 },
    result2: { id: 0, data: 0, chance: 0 },
    result3: { id: 0, data: 0, chance: 0 },
    time: 100,
    by: "EnderIO"
  });
  RecipeRegistry.addCrusher({
  	isGrinding: true,
    ingredient: { id: VanillaTileID.tallgrass, data: 0 },
    result0: { id: ItemID.clipAndTrim, data: 0, chance: 0.95 },
    result1: { id: ItemID.clipAndTrim, data: 0, chance: 0.6 },
    result2: { id: 0, data: 0, chance: 0 },
    result3: { id: 0, data: 0, chance: 0 },
    time: 100,
    by: "EnderIO"
  });
  
    RecipeRegistry.addCrusher({
  	isGrinding: true,
    ingredient: { id: VanillaTileID.tallgrass, data: 2 },
    result0: { id: ItemID.clipAndTrim, data: 0, chance: 0.95 },
    result1: { id: ItemID.clipAndTrim, data: 0, chance: 0.6 },
    result2: { id: 0, data: 0, chance: 0 },
    result3: { id: 0, data: 0, chance: 0 },
    time: 100,
    by: "EnderIO"
  });
  
  RecipeRegistry.addCrusher({
  	isGrinding: true,
    ingredient: { id: VanillaTileID.double_plant, data: 0 },
    result0: { id: ItemID.clipAndTrim, data: 0, chance: 1 },
    result1: { id: ItemID.clipAndTrim, data: 0, chance: 0.9 },
    result2: { id: ItemID.clipAndTrim, data: 0, chance: 0.7 },
    result3: { id: 0, data: 0, chance: 0 },
    time: 100,
    by: "EnderIO"
  });
  
  RecipeRegistry.addCrusher({
  	isGrinding: true,
    ingredient: { id: VanillaTileID.double_plant, data: 3 },
    result0: { id: ItemID.clipAndTrim, data: 0, chance: 1 },
    result1: { id: ItemID.clipAndTrim, data: 0, chance: 0.9 },
    result2: { id: ItemID.clipAndTrim, data: 0, chance: 0.7 },
    result3: { id: 0, data: 0, chance: 0 },
    time: 100,
    by: "EnderIO"
  });
  
  RecipeRegistry.addCrusher({
  	isGrinding: true,
    ingredient: { id: 38, data: 0 },
    result0: { id: VanillaItemID.red_dye, data: 0, chance: 1 },
    result1: { id: VanillaItemID.red_dye, data: 0, chance: 1 },
    result2: { id: VanillaItemID.red_dye, data: 0, chance: 0.95 },
    result3: { id: ItemID.clipAndTrim, data: 0, chance: 0.15 },
    time: 100,
    by: "EnderIO"
  });
  RecipeRegistry.addCrusher({
  	isGrinding: true,
    ingredient: { id: 37, data: 0 },
    result0: { id: VanillaItemID.yellow_dye, data: 0, chance: 1 },
    result1: { id: VanillaItemID.yellow_dye, data: 0, chance: 1 },
    result2: { id: VanillaItemID.yellow_dye, data: 0, chance: 0.95 },
    result3: { id: ItemID.clipAndTrim, data: 0, chance: 0.15 },
    time: 100,
    by: "EnderIO"
  });
  RecipeRegistry.addCrusher({
  	isGrinding: true,
    ingredient: { id: 32, data: 0 },
    result0: { id: ItemID.twigAndPrun, data: 0, chance: 0.7 },
    result1: { id: ItemID.twigAndPrun, data: 0, chance: 0.3 },
    result2: { id: ItemID.twigAndPrun, data: 0, chance: 0.1 },
    result3: { id: 0, data: 0, chance: 0 },
    time: 100,
    by: "EnderIO"
  });

  RecipeRegistry.addSmelter({
    ingredient1: { id: VanillaItemID.green_dye, data: 0, count: 6 },
    ingredient2: { id: VanillaItemID.egg, data: 0 },
    ingredient3: { id: 0, data: 0, count: 0 },
    result: { id: ItemID.greenDye, count: 2, data: 0 },
    time: 500,
    by: "EnderIO"
  });

  RecipeRegistry.addSmelter({
    ingredient1: { id: ItemID.clipAndTrim, data: 0, count: 12 },
    ingredient2: { id: VanillaItemID.slime_ball, data: 0 },
    ingredient3: { id: 0, data: 0, count: 0 },
    result: { id: ItemID.greenDye, count: 2, data: 0 },
    time: 500,
    by: "EnderIO"
  });

  RecipeRegistry.addSmelter({
    ingredient1: { id: ItemID.twigAndPrun, data: 0, count: 12 },
    ingredient2: { id: VanillaItemID.slime_ball, data: 0 },
    ingredient3: { id: 0, data: 0, count: 0 },
    result: { id: ItemID.brownDye, count: 2, data: 0 },
    time: 500,
    by: "EnderIO"
  });

  RecipeRegistry.addSmelter({
    ingredient1: { id: ItemID.dustCoal, data: 0, count: 6 },
    ingredient2: { id: VanillaItemID.slime_ball, data: 0 },
    ingredient3: { id: 0, data: 0, count: 0 },
    result: { id: ItemID.blackDye, count: 2, data: 0 },
    time: 500,
    by: "EnderIO"
  });

  RecipeRegistry.addSmelter({
    ingredient1: { id: BlockID.machineChassiSimple, data: 0, count: 1 },
    ingredient2: { id: ItemID.machineDye, data: 0 },
    ingredient3: { id: 0, data: 0, count: 0 },
    result: { id: BlockID.machineChassi, count: 1, data: 0 },
    time: 250,
    by: "EnderIO"
  });

  RecipeRegistry.addSmelter({
    ingredient1: { id: BlockID.machineChassiSimple, data: 0, count: 1 },
    ingredient2: { id: ItemID.soulMachineDye, data: 0 },
    ingredient3: { id: 0, data: 0, count: 0 },
    result: { id: BlockID.machineChassiSoul, count: 1, data: 0 },
    time: 250,
    by: "EnderIO"
  });

});




// file: Base/Items/Item.js

Item.setItems = function(id, types) {
  for (i in types) {
    IDRegistry.genItemID(id + types[i]);
    Item.createItem(id + types[i], types[i] + " " + id, { name: id + types[i] }, { stack: 64 });
    var this_id = id + types[i];
    //mod_tip(ItemID[this_id])
  }
}

Item.createResourceItem = function(id, name) {
  var nugg = name + " Nugget";
  var ingot = name + " Ingot";
  var nug = id + "Nugget";
  IDRegistry.genItemID(id);
  Item.createItem(id, ingot, { name: id }, { stack: 64 });

  IDRegistry.genItemID(nug);
  Item.createItem(nug, nugg, { name: nug }, { stack: 64 });

  Callback.addCallback("PreLoaded", function() {
    Recipes.addShaped({ id: ItemID[id], count: 1, data: 0 }, [
	  "bbb",
	  "bbb",
	  "bbb"
  ], ['b', ItemID[nug], 0]);
    Recipes.addShapeless({ id: ItemID[nug], count: 9, data: 0 }, [{ id: ItemID[id], data: 0 }]);
  });
  //mod_tip(ItemID[id]);
  //mod_tip(ItemID[nug]);
};

Item.createResourceItem("endSteel", "End Steel");
Item.createResourceItem("darkSteel", "Dark Steel");
Item.createResourceItem("conductiveIron", "Conductive Iron");
Item.createResourceItem("pulsatingIron", "Pulsating Iron");
Item.createResourceItem("soularium", "Soularium Alloy");
Item.createResourceItem("electricalSteel", "Electrical Steel");
Item.createResourceItem("energeticAlloy", "Energetic Alloy");
Item.createResourceItem("redstoneAlloy", "Redstone Alloy");

IDRegistry.genItemID("dustPulsating");
Item.createItem("dustPulsating", "Grains of Piezallity", { name: "dustPulsating" }, { stack: 64 });

IDRegistry.genItemID("dustInfinity");
Item.createItem("dustInfinity", "Grains of Infinity", { name: "dustInfinity" }, { stack: 64 });

KEX.ItemsModule.setFireResistant(ItemID.dustInfinity, true);

IDRegistry.genItemID("pulsatingCrystal");
Item.createItem("pulsatingCrystal", "Pulsating Crustal", { name: "pulsatingCrystal" }, { stack: 64 });


IDRegistry.genItemID("basicCapacitor");
Item.createItem("basicCapacitor", "Basic Capacitor", { name: "basicCapacitor" }, { stack: 64 });

Item.setItems("dust", ["Copper", "Wheat", "Iron", "Tin", "Coal", "Gold", "Ender", "Obsidian"]);

Recipes.addIngotRecipe = function(src, out) {
  if (ItemID[out]) {
    Recipes.addFurnace(src, ItemID[out], 0);
  }
}

IDRegistry.genItemID("binderComposite");
Item.createItem("binderComposite", "Binder Composite", { name: "binderComposite" }, { stack: 64 });

IDRegistry.genItemID("conduitBinder");
Item.createItem("conduitBinder", "Conduit Binder", { name: "conduitBinder" }, { stack: 64 });

IDRegistry.genItemID("itemYetaWrench");
Item.createItem("itemYetaWrench", "Yeta Wrench", { name: "itemYetaWrench" }, { stack: 1 });

IDRegistry.genItemID("silicon");
Item.createItem("silicon", "Silicon", { name: "silicon" }, { stack: 64 });
/*
IDRegistry.genItemID("soulariumIngot");
Item.createItem("soulariumIngot", "Soularium", { name: "soularium" }, { stack: 64 });
IDRegistry.genItemID("conductiveIron");
Item.createItem("conductiveIron", "Conductive Iron", { name: "conductiveIron" }, { stack: 64 });
IDRegistry.genItemID("");
Item.createItem("pulsatingIron", "Pulsating Iron", { name: "pulsatingIron" }, { stack: 64 });

IDRegistry.genItemID("darkSteel");
Item.createItem("darkSteel", "Dark Steel", { name: "darkSteel" }, { stack: 64 });
*/

IDRegistry.genItemID("vibrantAlloy");
Item.createItem("vibrantAlloy", "Vibrant Alloy", { name: "vibrantAlloy" }, { stack: 64 });

IDRegistry.genItemID("vibrantNugget");
Item.createItem("vibrantNugget", "Vibrant Nugget", { name: "vibrantNugget" }, { stack: 64 });

IDRegistry.genItemID("vibrantCrystal");
Item.createItem("vibrantCrystal", "Vibrant Crystal", { name: "vibrantCrystal" }, { stack: 64 });

IDRegistry.genItemID("enderCrystal");
Item.createItem("enderCrystal", "Ender Crystal", { name: "enderCrystal" }, { stack: 64 });
Item.setGlint(ItemID.enderCrystal, true);

IDRegistry.genItemID("zombieSkull");
Item.createItem("zombieSkull", "Zombie Skull", { name: "zombieSkull" }, { stack: 64 });

IDRegistry.genItemID("endermanSkull");
Item.createItem("endermanSkull", "Enderman Skull", { name: "endermanSkull" }, { stack: 64 });

IDRegistry.genItemID("creeperSkull");
Item.createItem("creeperSkull", "Creeper Skull", { name: "creeperSkull" }, { stack: 64 });

IDRegistry.genItemID("skeletonSkull");
Item.createItem("skeletonSkull", "Skeleton Skull", { name: "skeletonSkull" }, { stack: 64 });

IDRegistry.genItemID("doublelayerCapacitor");
Item.createItem("doublelayerCapacitor", "Double-layer Capacitor", { name: "doublelayerCapacitor" }, { stack: 64 });

IDRegistry.genItemID("octadicCapacitor");
Item.createItem("octadicCapacitor", "Octadic Capacitor", { name: "octadicCapacitor" }, { stack: 64 });

IDRegistry.genItemID("enderCapacitor");
Item.createItem("enderCapacitor", "Ender Capacitor", { name: "enderface" }, { stack: 64 });
var capacitorObj = [];

function regUpgrade(id, type, storage, usage, speed, bonus, range, mutil_bonus) {
   UpgradeAPI.registerUpgrade(id, type, function(item, machine, container, data) {
      data.energy_storage += storage;
      data.speed = data.speed * speed;
      data.energy_consumption += usage;
      if (data.bonus) {
         data.bonus = bonus;
      }
      if (data.range) {
         data.range += range;
      }
      if (data.mutil_bonus) {
         data.mutil_bonus == mutil_bonus || 1
      }
   });

   capacitorObj.push(id);
   Item.registerNameOverrideFunction(id, function(item, name) {
      if (Entity.getSneaking(Player.get())) {
         return name + "\n§7" + Translation.translate("Energy Storage: + ") + storage + " RF" + "\n§7" + Translation.translate("Energy Use: + ") + usage + " RF/t" + "\n§7" + Translation.translate("Speed: x") + speed + "\n§7" + Translation.translate("Bonus: x") + bonus + " (Only Generator)"/* + "\n§7" + Translation.translate("Fuel Bonus: x") + mutil_bonus + " (Only Combustion Generator)"*/;
      } else {
         return name + "\n" + Translation.translate("§fPress §dSneak §ffor Capacitor description...");
      }
   });
}

regUpgrade(ItemID.basicCapacitor, "capacitor", 100000, 40, 1, 1, 4, 1);
regUpgrade(ItemID.doublelayerCapacitor, "capacitor", 200000, 80, 2, 1.25, 8, 1.25);
regUpgrade(ItemID.octadicCapacitor, "capacitor", 400000, 160, 4, 1.75, 12, 1.5);
regUpgrade(ItemID.enderCapacitor, "capacitor", 0, 0, 4, 30, 100);


/*
UpgradeAPI.registerUpgradeItem(ItemID.doublelayerCapacitor, {
  speed: 2, storage: 200000, usage: 80, energyBonus: 2
});

UpgradeAPI.registerUpgradeItem(ItemID.octadicCapacitor, {
  speed: 4, storage: 500000, usage: 160, energyBonus: 4
});
*/
Callback.addCallback("PreLoaded", function() {

  Recipes.addShapeless({ id: 397, count: 1, data: 0 }, [{ id: ItemID.skeletonSkull, data: 0 }]);
  Recipes.addShapeless({ id: 397, count: 1, data: 2 }, [{ id: ItemID.zombieSkull, data: 0 }]);
  Recipes.addShapeless({ id: 397, count: 1, data: 4 }, [{ id: ItemID.creeperSkull, data: 0 }]);

  Recipes.addShapeless({ id: ItemID.skeletonSkull, count: 1, data: 0 }, [{ id: 397, data: 0 }]);
  Recipes.addShapeless({ id: ItemID.zombieSkull, count: 1, data: 0 }, [{ id: 397, data: 2 }]);
  Recipes.addShapeless({ id: ItemID.creeperSkull, count: 1, data: 0 }, [{ id: 397, data: 4 }]);



  Recipes.addShapeless({ id: ItemID.vibrantNugget, count: 9, data: 0 }, [{ id: ItemID.vibrantAlloy, data: 0 }]);

  Recipes.addShaped({ id: ItemID.vibrantCrystal, count: 1, data: 0 }, [
  	"aaa",
  	"aea",
	 "aaa"
], ['a', ItemID.vibrantNugget, 0, 'e', 388, 0]);

  Recipes.addShaped({ id: ItemID.pulsatingCrystal, count: 1, data: 0 }, [
  	"aaa",
  	"aea",
	 "aaa"
], ['a', ItemID.pulsatingIronNugget, 0, 'e', VanillaItemID.diamond, 0]);

  Recipes.addShaped({ id: ItemID.vibrantAlloy, count: 1, data: 0 }, [
  	"aaa",
  	"aaa",
	 "aaa"
], ['a', ItemID.vibrantNugget, 0]);

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

  Recipes.addIngotRecipe(ItemID.dustCopper, "ingotCopper");
  Recipes.addIngotRecipe(ItemID.dustTin, "ingotTin");
  Recipes.addFurnace(ItemID.dustIron, 265, 0);
  Recipes.addFurnace(ItemID.dustGold, 266, 0);

});

IDRegistry.genItemID("skullZombieController");
Item.createItem("skullZombieController", "Zombie Controller", { name: "skullZombieController" }, { stack: 64 });

IDRegistry.genItemID("skullZombieElectrode");
Item.createItem("skullZombieElectrode", "Zombie Electrode", { name: "skullZombieElectrode" }, { stack: 64 });

IDRegistry.genItemID("itemXpTransfer");
Item.createItem("itemXpTransfer", "Experience Rod", { name: "item_xp_transfer" }, { stack: 64 });

Callback.addCallback("ItemUse", function(coords, item, block) {
  if (World.getBlockID(coords.x, coords.y, coords.z) == VanillaBlockID.bedrock && item.id == 259) {
    if (Math.random() >= 0.5) {
      World.drop(coords.x + .5, coords.y + 1, coords.z, ItemID.dustInfinity, 1);
      //World.setBlock(coords.x, coords.y, coords.z, 0, 0);
    }
  }
});




// file: Base/Items/gear.js

Item.createGearItem = function(id, name, type) {
  var res = "item_material_gear_" + type
  IDRegistry.genItemID(id);
  Item.createItem(id, name, { name: res }, { stack: 64 });

  //mod_tip(ItemID[id]);
};

var GearName = {
  gear_energized: "Energized Bimetal Gear",
  gear_iron: "Infinity Bimetal Gear",
  gear_stone: "Stone Compound Gear",
  gear_vibrant: "Vibrant Bimetal Gear",
  gear_wood: "Wooden Gear",
  gear_darksteel: "Dark Bimetal Gear"
};
Item.createGearItem("woodGear", GearName.gear_wood, "wood");
Item.createGearItem("stoneGear", GearName.gear_stone, "stone");
Item.createGearItem("ironGear", GearName.gear_iron, "iron");
Item.createGearItem("darkSteelGear", GearName.gear_darksteel, "darksteel");
Callback.addCallback("PreLoaded", function() {
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




// file: Base/Items/advCapacitor.js

IDRegistry.genItemID("advCapacitor");
Item.createItem("advCapacitor", "Adv Capacitor", { name: "item_basic_capacitor_special2" }, { stack: 64 });
["stronghold_corridor", "village/village_toolsmith", "end_city_treasure", "bastion_bridge", "nether_bridge", "abandoned_mineshaft", "desert_pyramid", "jungle_temple", "pillager_outpost"].forEach(function(chestName) {
  KEX.LootModule.createLootTableModifier("chests/" + chestName)
    .addItem(ItemID.advCapacitor, 1, 0, 0.135, 3);
});




// file: Base/Integration/./pje.js

ModAPI.addAPICallback("EquivalentAPI", function(api) {
	// Recipe to Calc: Input Item EMC + (Work Time/4) (For Machine recipe)
  let System = api.System;
  Callback.addCallback("PreLoaded", function() {
  	//Other
  	System.setValue(ItemID.silicon, 0, 2);
      System.setValue(ItemID.dustInfinity, 0, 4);
      System.setValue(ItemID.binderComposite, 0, 84);
      System.setValue(ItemID.conduitBinder, 0, 92);
      //Ingot
      //System.setValue(ItemID.conduitBinder, 0, 92);
      System.setValue(ItemID.conductiveIron, 0, 382);
  });
});




// file: Base/Integration/./enr.js

ModAPI.addAPICallback("ENR", function (Ex) {
 Ex.Sieve.addSieved(13, ItemID.dustInfinity, 0, 1, 3, 25);
 Ex.Sieve.addSieved(13, ItemID.dustPulsating, 0, 1, 2, 5);
 Ex.Crucible.dataSet("energy", {
    "BloclID.blockEndSteel": {
        energy: 15
    },
    
     "BloclID.blockSoularium": {
        energy: 10
    }
});

 
Callback.addCallback("PreLoaded", function() {

    RecipeRegistry.addCrusher({
    	isGrinding: true,
      ingredient: { id: 4, data: 0 },
      result0: { id: 13, data: 0, chance: 1 },
      result1: { id: 12, data: 0, chance:0.35 },
      result2: { id: VanillaItemID.flint, data: 0, chance: 0.1 },
      result3: { id: 0, data: 0, chance: 0 },
      time: 180,
      by: "Ex Nihilo Origin"
    });

    RecipeRegistry.addCrusher({
    	isGrinding: false,
      ingredient: { id: 13, data: 0 },
      result0: { id: 12, data: 0, chance: 1 },
      result1: { id: BlockID.ex_dust, data: 0, chance: 0.5 },
      result2: { id: 0, data: 0, chance: 0 },
      result3: { id: 0, data: 0, chance: 0 },
      time: 180,
      by: "Ex Nihilo Origin"
    });
    
    RecipeRegistry.addCrusher({
    	isGrinding: false,
      ingredient: { id: 12, data: 0 },
      result0: { id: BlockID.ex_dust, data: 0, chance: 1 },
      result1: { id: 0, data: 0, chance: 0 },
      result2: { id: 0, data: 0, chance: 0 },
      result3: { id: 0, data: 0, chance: 0 },
      time: 180,
      by: "Ex Nihilo Origin"
    });
    
    RecipeRegistry.addCrusher({
    	isGrinding: false,
      ingredient: { id: 87, data: 0 },
      result0: { id: BlockID.ex_gravelNether, data: 0, chance: 1 },
      result1: { id: 0, data: 0, chance: 0 },
      result2: { id: 0, data: 0, chance: 0 },
      result3: { id: 0, data: 0, chance: 0 },
      time: 180,
      by: "Ex Nihilo Origin"
    });
    
    RecipeRegistry.addCrusher({
    	isGrinding: false,
      ingredient: { id: 121, data: 0 },
      result0: { id: BlockID.ex_gravelEnder, data: 0, chance: 1 },
      result1: { id: 0, data: 0, chance: 0 },
      result2: { id: 0, data: 0, chance: 0 },
      result3: { id: 0, data: 0, chance: 0 },
      time: 180,
      by: "Ex Nihilo Origin"
    });

  });

});




// file: Base/Integration/./so.js

/*

ModAPI.addAPICallback("SkyOrchard", function(api) {
  const IntegrationSO = {
    crushSap: function(key, c1, c2, c3) {
      let Input1 = "ore_sapling_" + key;
      let Output1 = "ore_leaf_" + key;
      let Output2 = "ore_acorn_" + key;
      let Output3 = "ore_resin_" + key;
      RecipeRegistry.addCrusher({
        ingredient: { id: Input1, data: 0 },
        result0: { id: Output1, data: 0, chance: c1 },
        result1: { id: Output2, data: 0, chance: c2 },
        result2: { id: Output3, data: 0, chance: c3 },
        result3: { id: 0, data: 0, chance: 0 },
        time: 180
      });

    },

    crushLeave: function(key, c1, c2) {
      let Input1 = "ore_leaf_" + key;
      let Output1 = "ore_sapling_" + key;
      let Output2 = "ore_acorn_" + key;
      RecipeRegistry.addCrusher({
        ingredient: { id: Input1, data: 0 },
        result0: { id: Output1, data: 0, chance: c1 }, // Max: 0.75
        result1: { id: Output2, data: 0, chance: c2 }, // Min: 0.95
        result2: { id: 0, data: 0, chance: 0 },
        result3: { id: 0, data: 0, chance: 0 },
        time: 180
      });

    },
    crushLog: function(key, c2) {
      let Input1 = "log_ore_" + key;
      let Output1 = "ore_resin_" + key;
      RecipeRegistry.addCrusher({
        ingredient: { id: Input1, data: 0 },
        result0: { id: Output1, data: 0, chance: 1 },
        result1: { id: 16, data: 0, chance: c2 }, // Max: 0.8
        result2: { id: 0, data: 0, chance: 0 },
        result3: { id: 0, data: 0, chance: 0 },
        time: 180
      });

    }

  }
  Callback.addCallback("PostLoaded", function() {
    IntegrationSO.crushSap("dirt", 0.75, 1, 1);
    IntegrationSO.crushLeave("dirt", 0.7, 0.99);
    IntegrationSO.crushLog("dirt", 0.7);
    IntegrationSO.crushSap("petrified", 0.7, 1, 1);
    IntegrationSO.crushLeave("petrified", 0.5, 0.99);
    IntegrationSO.crushLog("petrified", 0.7);
    IntegrationSO.crushSap("gravel", 0.5, 1, 1)
    IntegrationSO.crushLeave("gravel", 0.5, 1)
    IntegrationSO.crushLog("gravel", 0.8);
  });
});
*/




// file: Base/Integration/./tcon.js

ModAPI.addAPICallback("TConAPI", function(Tcon) {
  /*
  ModAPI.registerAPI("TConAPI", {
      MatValue: MatValue,
      MoltenLiquid: MoltenLiquid,
      SmelteryFuel: SmelteryFuel,
      MeltingRecipe: MeltingRecipe,
      AlloyRecipe: AlloyRecipe,
      Tcon.CastingRecipe: Tcon.CastingRecipe,
      BlockModel: BlockModel,
      Sound: Sound
  });

  */
  var MeltingRecipe = Tcon.MeltingRecipe;
  var AlloyRecipe = Tcon.AlloyRecipe;
  var MatValue = Tcon.MatValue
  Callback.addCallback("PreLoaded", function() {
    Tcon.MoltenLiquid.createAndRegister("molten_redstone", "Molten Redstone", 340, "#ff0808");
    Tcon.MoltenLiquid.createAndRegister("molten_pulsating_iron", "Molten Pulsating Iron", 769, "#ff9e9e");
    MeltingRecipe.addRecipe(331, "molten_redstone", MatValue.INGOT);
    MeltingRecipe.addRecipe(152, "molten_redstone", MatValue.BLOCK);
    MeltingRecipe.addRecipe(VanillaBlockID.redstone_ore, "molten_redstone", MatValue.INGOT * 5);
    AlloyRecipe.addRecipe({ liquid: "molten_pulsating_iron", amount: 4 }, { liquid: "molten_redstone", amount: 2 }, { liquid: "molten_iron", amount: 2 });
  });

  /*
  Item.registerUseFunction("skullZombieElectrode", function(coords, item, block) {
    Game.message(block.id + ":" + block.data);
    for (let i in Tcon.CastingRecipe.table) {
      Game.message("Recipe: " +
        Tcon.CastingRecipe.table[i]);

    }
    Game.message("crusher:" + RecipeRegistry.crusher);

  });

*/
});




// file: Base/Integration/./thermal.js

ModAPI.addAPICallback("ThermalFoundationAPI", function(Thermal) {
   GrindingBall.regModBall("signalum", "Signalum", 120, 165, 35, 100800, { id: "ingotSignalum", data: 0 })
   GrindingBall.regModBall("enderium", "Enderium", 165, 145, 125, 120000, { id: "ingotEnderium", data: 0 })
   GrindingBall.regModBall("lumium", "Lumium", 110, 215, 90, 100800, { id: "ingotLumium", data: 0 })
});




// file: Base/Integration/./Minechemistry.js

ModAPI.addAPICallback("ChemCore", function(Chem) {
   var DecomposeRecipe = Chem.Decompose;
   var SynthesisRecipe = Chem.Synthesis;
   var MolID = Chem.MolID
  Callback.addCallback("PreLoaded", function() {

    DecomposeRecipe.add(ItemID.electricalSteel, [
      { id: "C", count: 1 },
      { id: "Si", count: 1 },
      { id: "Fe", count: 1 }
  ]);

    DecomposeRecipe.add(ItemID.conductiveIron, [
      { id: MolID.iron_oxide, count: 1 },
      { id: MolID.strontium_carbonate, count: 1 },
      { id: "Fe", count: 1 }
  ]);
  })
});




// file: Base/Integration/./avaritia.js

/*
let AvaritiaAPI;
ModAPI.addAPICallback("AvaritiaAPI", function(api) {
   AvaritiaAPI = api;
});
Callback.addCallback("PostLoaded", function() {
   AvaritiaAPI.addExtremeShapedRecipe("test", { id: VanillaBlockID.end_portal_frame, count: 1, data: 0 }, [
"iiddiddii",
"idsssssdi",
"dsssssssd",
"dsssnsssd",
"issnnnssi",
"dsssnsssd",
"dsssssssd",
"idsssssdi",
"iiddiddii",
], ["i", ItemID.infinity_ingot, 0, "n", ItemID.neutronium_ingot, 0, "s", VanillaBlockID.sand, 0, "d", BlockID.dmBlock, 0]);
});

ModAPI.addAPICallback("AvaritiaAPI", function(api) {
   api.addExtremeShapedRecipe("neutronium_capacitor", {
      id: ItemID.neutroniumCapacitor,
      count: 1,
      data: 0
   }, [
        " NNNNNNN ",
        "NVNNNNNVN",
        "NVNNONNVN",
        "NVNNNNNVN",
        "NVNNONNVN",
        "  V   V  ",
        "  C   C  ",
        "  C   C  ",
        "  I   I  "
    ], [
        'I', ItemID.infinityIngot, 0,
        'V', ItemID.vibrantAlloy, 0,
        'N', ItemID.neutroniumIngot, 0,
        'O', ItemID.octadicCapacitor, 0,
        'C', ItemID.infinityCatalyst, 0
    ]);
});

// neutroniumCapacitor.png

IDRegistry.genItemID("neutroniumCapacitor");
Item.createItem("neutroniumCapacitor", "Neutronium Capacitor", { name: "neutroniumCapacitor" }, { stack: 64 });
regUpgrade(ItemID.neutroniumCapacitor, "capacitor", 700000, 320, 8, 8, 16);

IDRegistry.genItemID("infinityCapacitor");
Item.createItem("infinityCapacitor", "Infinity Capacitor", { name: "infinityCapacitor.png" }, { stack: 64 });
regUpgrade(ItemID.infinityCapacitor, "capacitor", 1400000, 480, 15, 10, 32);

ModAPI.addAPICallback("AvaritiaAPI", function(api) {
    api.addExtremeShapedRecipe("infinity_capacitor", {
        id: ItemID.infinityCapacitor, count: 1, data: 0
    }, [
        " IIIIIII ",
        "IVNNNNNVI",
        "IVNNONNVI",
        "IVNNNNNVI",
        "IVNNONNVI",
        "  VVVVV  ",
        "  C   C  ",
        "  C   C  ",
        "  I   I  "
    ], [
        'I', ItemID.infinityIngot, 0,
        'V', ItemID.vibrantAlloy, 0,
        'N', ItemID.neutroniumIngot, 0,
        'O', ItemID.octadicCapacitor, 0,
        'C', ItemID.infinityCatalyst, 0
    ]);
});
*/




// file: Base/Integration/./rv.js

/*var RecipeViewerSupport = {
	info: [],
	
	addInfo: function(obj) {
		let input = obj
	    let item = obj.item;
        if (!item || !item.id)
            return;

        item.data = item.data || 0;
        input.line3 = input.line3 || " ";
        input.line4 = input.line4 || " ";
        
       this.info.push(obj);
  }
}

RecipeViewerSupport.addInfo({
	item: { id: ItemID.dustInfinity },
	line1: "Grain Of Infinity is an indispensable item ",
	line2: "when starting Ender IO. To get it, use",
	line3: "Flint and Steel to burn Bedrock",
	line4: "Note: It can't Anti-Fire"
});
*/
ModAPI.addAPICallback("RecipeViewer", function(api) {

   RV = api.Core;

   /* const Bitmap = android.graphics.Bitmap;
    const Canvas = android.graphics.Canvas;
    const Rect = android.graphics.Rect;

    let bmp, cvs, source;*/
   let x = y = 0;
   /*
   
     RV.registerRecipeType("enderio_info", {
       title: "Infomation",
       contents: {
         icon: ItemID.enderCapacitor,
         description: "Infomation",
         drawing: [],
         elements: {
           input0: { type: "slot", x: 520, y: 170 },
           line1: { type: "text", x: 200, y: 200, font: { size: 10, color: Color.WHITE, shadow: 0.25 } },
           line2: { type: "text", x: 200, y: 230, font: { size: 10, color: Color.WHITE, shadow: 0.25 } },
           line3: { type: "text", x: 200, y: 260, font: { size: 10, color: Color.WHITE, shadow: 0.25 } },
           line4: { type: "text", x: 200, y: 290, font: { size: 10, color: Color.WHITE, shadow: 0.25 } },
         }
       },
       getList: function(id, data, isUsage) {
         let list = [];
         if (isUsage) {
           for (let i in RecipeViewerSupport.info) {
             let info = RecipeViewerSupport.info[i];
             let Item = info.item
             if (Item.id == id) {
               list.push({
                 input: [{ id: item.id, count: 1, data: item.data }],
                 line: [
                 info.line1,
                 info.line2,
                 info.line3,
                 info.line4
               ]
               });
             }
           }
         }
         return list;
       },
       getAllList: function() {
         const list = [];

         for (let i in RecipeViewerSupport.info) {
           let info = RecipeViewerSupport.info[i];
           let Item = info.item
           if (Item.id == id) {
             list.push({
               input: [{ id: item.id, count: 1, data: item.data }],
               line: [
                         info.line1,
                         info.line2,
                         info.line3,
                         info.line4
                       ]
             });
           }
         }
         return list;
       },
       onOpen: function(elements, data) {
         let line1 = elements.get("line1");
         line1.onBindingUpdated("text", data ? data.line[0] : "");

         let line2 = elements.get("line2");
         line2.onBindingUpdated("text", data ? data.line[1] : "");

         let line3 = elements.get("line3");
         line3.onBindingUpdated("text", data ? data.line[2] : "");

         let line4 = elements.get("line4");
         line4.onBindingUpdated("text", data ? data.line[3] : "");

       }
     });*/


   RV.registerRecipeType("enderio_alloy", {
      title: "Alloy Smelter",
      contents: {
         icon: BlockID.alloySmelter,
         description: "alloy",
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
         },
         moveItems: {
            x: 630,
            y: 330,
            slots: ["ingredient1", "ingredient2", "ingredient3"]
         }
      },
      getList: function(id, data, isUsage) {
         let list = [];
         if (isUsage) {
            var rec = RecipeRegistry.smelter
            for (let i in rec) {
               let recipe = rec[i]
               let result0 = recipe.result;
               let input0 = recipe.ingredient1;
               let input1 = recipe.ingredient2;
               let input2 = recipe.ingredient3;
               if (input1.id == id || input0.id == id || input2.id == id) {
                  list.push({
                     input: [
                        { id: input0.id, data: input0.data, count: input0.count || 1 },
                        { id: input1.id, data: input1.data, count: 1 },
                        { id: input2.id, data: input2.data, count: input2.count || 1 }
                 ],
                     output: [{ id: result0.id, data: result0.data, count: result0.count }],
                     time: recipe.time
                  });
               } else if (result0.id == id) {
                  list.push({
                     input: [
                        { id: input0.id, data: input0.data, count: input0.count || 1 },
                        { id: input1.id, data: input1.data, count: 1 },
                        { id: input2.id, data: input2.data, count: input2.count || 1 }
                                         ],
                     output: [{ id: result0.id, data: result0.data, count: result0.count }],
                     time: recipe.time
                  });
               }
            }
         } else {
            var rec = RecipeRegistry.smelter
            for (let i in rec) {
               let recipe = rec[i]
               let result0 = recipe.result;
               let input0 = recipe.ingredient1;
               let input1 = recipe.ingredient2;
               let input2 = recipe.ingredient3;
               if (result0.id == id) {
                  list.push({
                     input: [
                        { id: input0.id, data: input0.data, count: input0.count || 1 },
                        { id: input1.id, data: input1.data, count: 1 },
                        { id: input2.id, data: input2.data, count: input2.count || 1 }
                               ],
                     output: [{ id: result0.id, data: result0.data, count: result0.count }],
                     time: recipe.time
                  });
               }
            }

         }
         return list;
      },
      getAllList: function() {
         const list = [];

         var rec = RecipeRegistry.smelter
         for (let i in rec) {
            let recipe = rec[i]
            let result0 = recipe.result;
            let input0 = recipe.ingredient1;
            let input1 = recipe.ingredient2;
            let input2 = recipe.ingredient3;
            list.push({
               input: [
                  { id: input0.id, data: input0.data, count: input1.count || 1 },
                  { id: input1.id, data: input1.data, count: 1 },
                  { id: input2.id, data: input2.data, count: input2.count || 1 }
                               ],
               output: [{ id: result0.id, data: result0.data, count: result0.count }],
               time: recipe.time
            });

         }
         return list;
      },
      onOpen: function(elements, data) {
         let elem = elements.get("textTime");
         elem.onBindingUpdated("text", data ? Translation.translate("Time: ") + data.time : "");
      }
   });
   //RecipeRegistry.showCrusher(RV);
   //RecipeRegistry.show(RV);
   RV.registerRecipeType("enderio_sag", {
      title: "SAG Mill",
      contents: {
         icon: BlockID.sagmill,
         drawing: [
            { type: "bitmap", x: 595, y: 250, bitmap: "bar_progress_down0", scale: 4.2 },
			],
         elements: {
            input0: { type: "slot", x: 602, y: 170, size: 65 },
            output0: { type: "slot", x: 505, y: 340, size: 65 },
            output1: { type: "slot", x: 570, y: 340, size: 65 },
            output2: { type: "slot", x: 635, y: 340, size: 65 },
            output3: { type: "slot", x: 700, y: 340, size: 65 },
            textChance0: { type: "text", x: 505, y: 300, font: { size: 10, color: Color.WHITE, shadow: 0.25 } },
            textChance1: { type: "text", x: 570, y: 300, font: { size: 10, color: Color.WHITE, shadow: 0.25 } },
            textChance2: { type: "text", x: 635, y: 300, font: { size: 10, color: Color.WHITE, shadow: 0.25 } },
            textChance3: { type: "text", x: 700, y: 300, font: { size: 10, color: Color.WHITE, shadow: 0.25 } },
            textBy: { type: "text", x: 600, y: 420, font: { size: 15, color: Color.WHITE, shadow: 0.25 } }
         },
         moveItems: {
            x: 730,
            y: 375,
            slots: ["ingredient"]
         }
      },
      getList: function(id, data, isUsage) {
         let list = [];

         if (isUsage) {
            var rec = RecipeRegistry.crusher
            for (let i in rec) {
               let recipe = rec[i];
               let input = recipe.ingredient;
               let result0 = recipe.result0;
               let result1 = recipe.result1;
               let result2 = recipe.result2;
               let result3 = recipe.result3;
               if (input.id == id) {
                  list.push({
                     input: [{ id: input.id, count: 1, data: input.data }],
                     output: [
                        { id: result0.id || 0, count: 1, data: result0.data || 0 },
                        { id: result1.id || 0, count: 1, data: result1.data || 0 },
                        { id: result2.id || 0, count: 1, data: result2.data || 0 },
                        { id: result3.id || 0, count: 1, data: result3.data || 0 },
					],

                     chance: [
                result0.chance,
                result1.chance,
                result2.chance,
                result3.chance
                                  ],
                     by: recipe.by
                  });
               }
            }
         } else {
            var rec = RecipeRegistry.crusher
            for (let i in rec) {
               let recipe = rec[i];
               let input = recipe.ingredient;
               let result0 = recipe.result0;
               let result1 = recipe.result1;
               let result2 = recipe.result2;
               let result3 = recipe.result3;
               if (result0.id == id || result1.id == id || result2.id == id || result3.id == id) {
                  list.push({
                     input: [{ id: input.id, count: 1, data: input.data }],
                     output: [
                        { id: result0.id || 0, count: 1, data: result0.data || 0 },
                        { id: result1.id || 0, count: 1, data: result1.data || 0 },
                        { id: result2.id || 0, count: 1, data: result2.data || 0 },
                        { id: result3.id || 0, count: 1, data: result3.data || 0 },
					],

                     chance: [
                result0.chance,
                result1.chance,
                result2.chance,
                result3.chance
                                  ],
                     by: recipe.by
                  });
               }
            }
         }
         return list;

      },

      getAllList: function() {
         const list = [];
         var rec = RecipeRegistry.crusher
         for (let i in rec) {
            let recipe = rec[i];
            let input = recipe.ingredient;
            let result0 = recipe.result0;
            let result1 = recipe.result1;
            let result2 = recipe.result2;
            let result3 = recipe.result3;
            list.push({
               input: [{ id: input.id, count: 1, data: input.data }],
               output: [
                  { id: result0.id || 0, count: 1, data: result0.data || 0 },
                  { id: result1.id || 0, count: 1, data: result1.data || 0 },
                  { id: result2.id || 0, count: 1, data: result2.data || 0 },
                  { id: result3.id || 0, count: 1, data: result3.data || 0 },
					],

               chance: [
                result0.chance,
                result1.chance,
                result2.chance,
                result3.chance
                                 ],
               by: recipe.by
            });
         }
         return list;

      },

      onOpen: function(elements, data) {
         let elem = elements.get("textChance2");
         elem.onBindingUpdated("text", data ? data.chance[2] * 100 + "%" : "");

         let elem2 = elements.get("textChance3");
         elem2.onBindingUpdated("text", data ? data.chance[3] * 100 + "%" : "");

         let elem3 = elements.get("textChance0");
         elem3.onBindingUpdated("text", data ? data.chance[0] * 100 + "%" : "");

         let elem4 = elements.get("textChance1");
         elem4.onBindingUpdated("text", data ? data.chance[1] * 100 + "%" : "");

         let by = elements.get("textBy");
         by.onBindingUpdated("text", data ? Translation.translate("Recipe add by: ") + data.by : "");
      }
   });


   RV.registerRecipeType("enderio_vat", {
      title: "The Vat",
      contents: {
         icon: BlockID.theVat,
         drawing: [
            { type: "bitmap", x: 281, y: -190, bitmap: "backgroundVatRV", scale: 3.3 },
            { type: "bitmap", x: 679, y: 304, bitmap: "fire_scale1", scale: 3.3 },
   			],
         elements: {
            input0: { type: "slot", x: 590, y: 130, size: 65 },
            input1: { type: "slot", x: 753, y: 130, size: 65 },

            inputLiq0: { x: 502, y: 130, width: 50, height: 200 },
            outputLiq0: { x: 842, y: 130, width: 50, height: 200 },
            textIn: { type: "text", x: 502, y: 350, font: { size: 25, color: Color.WHITE, shadow: 0.25 } },
            textOut: { type: "text", x: 842, y: 350, font: { size: 25, color: Color.WHITE, shadow: 0.25 } },
         },
         tankLimit: 10000 * 4,
      },


      getList: function(id, data, isUsage) {
         let list = [];
         if (isUsage) {
            for (var i in RecipeRegistry.theVat) {
               let recipe = RecipeRegistry.theVat[i];
               let input1 = recipe.input1;
               let input2 = recipe.input2;
               let liqIn = recipe.inputLiquid;
               let liqOut = recipe.outputLiquid;
               let amountIn = recipe.inputAmount;
               let amountOut = recipe.outputAmount;
               let time = recipe.time;
               if (input1.id == id || input2.id == id) {
                  list.push({
                     input: [{ id: input1.id, count: 1, data: input1.data || 0 },
                        { id: input2.id || 0, count: 1, data: input2.data || 0 }
                 ],
                     inputLiq: [{ liquid: liqIn, amount: amountIn * 1000 }],
                     outputLiq: [{ liquid: liqOut, amount: amountOut * 1000 }],
                     amountLiqIn: amountIn * 1000,
                     amountLiqOut: amountOut * 1000,
                  });
               } else if (liqIn == id) {
                  list.push({
                     input: [{ id: input1.id, count: 1, data: input1.data || 0 },
                        { id: input2.id || 0, count: 1, data: input2.data || 0 }
                 ],
                     inputLiq: [{ liquid: liqIn, amount: amountIn * 1000 }],
                     outputLiq: [{ liquid: liqOut, amount: amountOut * 1000 }],
                     amountLiqIn: amountIn * 1000,
                     amountLiqOut: amountOut * 1000,
                  });
               }
            }
         } else {
            for (var i in RecipeRegistry.theVat) {
               let recipe = RecipeRegistry.theVat[i];
               let input1 = recipe.input1;
               let input2 = recipe.input2;
               let liqIn = recipe.inputLiquid;
               let liqOut = recipe.outputLiquid;
               let amountIn = recipe.inputAmount;
               let amountOut = recipe.outputAmount;
               let time = recipe.time;
               if (liqOut == id) {
                  list.push({
                     input: [
                        { id: input1.id, count: 1, data: input1.data || 0 },
                        { id: input2.id || 0, count: 1, data: input2.data || 0 }
                      ],
                     inputLiq: [{ liquid: liqIn, amount: amountIn * 1000 }],
                     outputLiq: [{ liquid: liqOut, amount: amountOut * 1000 }],
                     amountLiqIn: amountIn * 1000,
                     amountLiqOut: amountOut * 1000,
                  });
               }
            }
         }
         return list;
      },

      getAllList: function() {
         const list = [];
         for (var i in RecipeRegistry.theVat) {
            let recipe = RecipeRegistry.theVat[i];
            let input1 = recipe.input1;
            let input2 = recipe.input2;
            let liqIn = recipe.inputLiquid;
            let liqOut = recipe.outputLiquid;
            let amountIn = recipe.inputAmount;
            let amountOut = recipe.outputAmount;
            let time = recipe.time;
            list.push({
               input: [{ id: input1.id, count: 1, data: input1.data || 0 },
                  { id: input2.id || 0, count: 1, data: input2.data || 0 }
                 ],
               inputLiq: [{ liquid: liqIn, amount: amountIn * 1000 }],
               outputLiq: [{ liquid: liqOut, amount: amountOut * 1000 }],
               amountLiqIn: amountIn * 1000,
               amountLiqOut: amountOut * 1000,
            });
         }
         return list
      },

      onOpen: function(elements, data) {
         /*amountLiqIn: amountIn * 1000,
            amountLiqOut: amountOut * 1000,*/
         let elem1 = elements.get("textIn");
         elem1.onBindingUpdated("text", data ? data.amountLiqIn + "mB" : "");
         let elem2 = elements.get("textOut");
         elem2.onBindingUpdated("text", data ? data.amountLiqOut + "mB" : "");
      }
   });

   RV.registerRecipeType("enderio_sas", {
      title: "Slice And Splice",
      contents: {
         icon: BlockID.sliceAndSplice,
         drawing: [
            { type: "bitmap", x: 630, y: 235, bitmap: "bar_progress2", scale: 3.2 },
			],
         elements: {
            input0: { type: "slot", x: 400, y: 200 },
            input1: { type: "slot", x: 460, y: 200 },
            input2: { type: "slot", x: 520, y: 200 },
            input3: { type: "slot", x: 400, y: 260 },
            input4: { type: "slot", x: 460, y: 260 },
            input5: { type: "slot", x: 520, y: 260 },
            output0: { type: "slot", x: 720, y: 230 },
            //slotAxe: { type: "slot", x: 430, y: 140 },
            //slotShears: { type: "slot", x: 490, y: 140 },
         }
         /*
               moveItems: {
                 x: 730,
                 y: 375,
                 slots: ["ingredient"]
               }*/
      },
      getList: function(id, data, isUsage) {
         let list = [];

         if (isUsage) {
            var rec = RecipeRegistry.sliceAndSplice
            for (let i in rec) {
               let recipe = rec[i]
               let output0 = recipe.output;
               let input0 = recipe.input0
               let input1 = recipe.input1
               let input2 = recipe.input2
               let input3 = recipe.input3
               let input4 = recipe.input4
               let input5 = recipe.input5
               if (input1.id == id || input0.id == id || input2.id == id || input3.id == id || input4.id == id || input5.id == id) {
                  list.push({
                     input: [
                        { id: input0.id, data: input0.data, count: 1 },
                        { id: input1.id, data: input1.data, count: 1 },
                        { id: input2.id, data: input2.data, count: 1 },
                        { id: input3.id, data: input3.data, count: 1 },
                        { id: input4.id, data: input4.data, count: 1 },
                        { id: input5.id, data: input5.data, count: 1 }
                 ],
                     output: [{ id: output0.id, data: output0.data, count: output0.count || 1 }],
                     //     time: recipe.time
                  });
               }
            }
         } else {
            var rec = RecipeRegistry.sliceAndSplice
            for (let i in rec) {
               let recipe = rec[i]
               let output0 = recipe.output;
               let input0 = recipe.input0
               let input1 = recipe.input1
               let input2 = recipe.input2
               let input3 = recipe.input3
               let input4 = recipe.input4
               let input5 = recipe.input5
               if (output0.id == id) {
                  list.push({
                     input: [
                        { id: input0.id, data: input0.data, count: 1 },
                        { id: input1.id, data: input1.data, count: 1 },
                        { id: input2.id, data: input2.data, count: 1 },
                        { id: input3.id, data: input3.data, count: 1 },
                        { id: input4.id, data: input4.data, count: 1 },
                        { id: input5.id, data: input5.data, count: 1 }
                 ],
                     output: [{ id: output0.id, data: output0.data, count: 1 }],
                     //    time: recipe.time
                  });
               }
            }

         }
         return list;
      },
      getAllList: function() {
         const list = [];
         var rec = RecipeRegistry.sliceAndSplice
         for (let i in rec) {
            let recipe = rec[i]
            let output0 = recipe.output;
            let input0 = recipe.input0
            let input1 = recipe.input1
            let input2 = recipe.input2
            let input3 = recipe.input3
            let input4 = recipe.input4
            let input5 = recipe.input5
            list.push({
               input: [
                  { id: input0.id, data: input0.data, count: 1 },
                  { id: input1.id, data: input1.data, count: 1 },
                  { id: input2.id, data: input2.data, count: 1 },
                  { id: input3.id, data: input3.data, count: 1 },
                  { id: input4.id, data: input4.data, count: 1 },
                  { id: input5.id, data: input5.data, count: 1 }
                 ],
               output: [{ id: output0.id, data: output0.data, count: 1 }],

            });
         }
         return list;
      }
   });

});




// file: Base/Integration/./forestry.js





// file: Base/Integration/./ic2.js

ModAPI.addAPICallback("ICore", function(api) {
   
   Callback.addCallback("PostLoaded", function() {
      /*
  SWORD_DAMAGE["ItemID.nanoSaberActive"] = 20;
  SWORD_DAMAGE["ItemID.bronzeSword"] = 6;// maybe 4 :))))
  SWORD_DAMAGE["ItemID.chainsaw"] = 4;
*/;
      ICRender.getGroup("liquid_pipe").add(BlockID.semifluidGenerator, -1);
      ICRender.getGroup("liquid_pipe").add(BlockID.icFermenter, -1);
      ICRender.getGroup("liquid_pipe").add(BlockID.oreWasher, -1);
      ICRender.getGroup("liquid_pipe").add(BlockID.pump, -1);
      ICRender.getGroup("liquid_pipe").add(BlockID.solidCanner, -1);
      ICRender.getGroup("liquid_pipe").add(BlockID.canner, -1);
      ICRender.getGroup("liquid_pipe").add(BlockID.tank, -1);
      RecipeRegistry.addSmelter({
         ingredient1: { id: ItemID.ingotCopper, data: 0, count: 3 },
         ingredient2: { id: ItemID.ingotTin, data: 0 },
         ingredient3: { id: 0, data: 0, count: 0 },
         result: { id: ItemID.ingotBronze, count: 4, data: 0 },
         time: 500
      });

      RecipeRegistry.addSmelter({
         ingredient1: { id: VanillaItemID.iron_ingot, data: 0, count: 1 },
         ingredient2: { id: VanillaItemID.coal, data: 0 },
         ingredient3: { id: 0, data: 0, count: 0 },
         result: { id: ItemID.ingotSteel, count: 1, data: 0 },
         time: 800
      });

      RecipeRegistry.addCrusher({
         isGrinding: true,
         ingredient: { id: BlockID.oreCopper, data: 0 },
         result0: { id: ItemID.dustCopper, data: 0, chance: 1 },
         result1: { id: ItemID.dustCopper, data: 0, chance: 1 },
         result2: { id: ItemID.dustGold, data: 0, chance: 0.1 },
         result3: { id: 4, data: 0, chance: 0.15 },
         time: 180,
         by: "IC2"
      });

      RecipeRegistry.addCrusher({
         isGrinding: true,
         ingredient: { id: BlockID.oreUranium, data: 0 },
         result0: { id: ItemID.uranium238, data: 0, chance: 1 },
         result1: { id: ItemID.smallUranium235, data: 0, chance: 1 },
         result2: { id: ItemID.dustLead, data: 0, chance: 0.1 },
         result3: { id: 4, data: 0, chance: 0.15 },
         time: 180,
         by: "IC2"
      });


      RecipeRegistry.addCrusher({
         isGrinding: true,
         ingredient: { id: BlockID.oreTin, data: 0 },
         result0: { id: ItemID.dustTin, data: 0, chance: 1 },
         result1: { id: ItemID.dustTin, data: 0, chance: 1 },
         result2: { id: ItemID.dustSilver, data: 0, chance: 0.1 },
         result3: { id: 4, data: 0, chance: 0.15 },
         time: 180,
         by: "IC2"
      });

      RecipeRegistry.addCrusher({
         isGrinding: true,
         ingredient: { id: BlockID.oreLead, data: 0 },
         result0: { id: ItemID.dustLead, data: 0, chance: 1 },
         result1: { id: ItemID.dustLead, data: 0, chance: 1 },
         result2: { id: ItemID.dustSilver, data: 0, chance: 0.1 },
         result3: { id: 4, data: 0, chance: 0.15 },
         time: 180,
         by: "IC2"
      });

   });
});




// file: Base/Integration/./rs.js

ModAPI.addAPICallback("RefinedStorageAPI", function(api) {
IDRegistry.genBlockID("RS_cable");
Block.createBlock("RS_cable", [
  { name: "Refined Storage Cable", texture: [["rsCable", 0]], inCreative: true }
]);

ConduitRegistry.setupModel(BlockID.RS_cable, 0.25);

});




// file: Base/Blocks/Conduit/./Liquid/Liquid.js

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

Callback.addCallback("PreLoaded", function() {
    Recipes.addShaped({ id: BlockID.fluidConduit, count: 8, data: 0 }, [
	  "bbb",
	  "ccc",
	  "bbb"
  ], ['b', ItemID.conduitBinder, 0, 'c', BlockID.fusedGlass, 0 ]);
});

Callback.addCallback("ItemUse", function(coords, item, block) {
   if (item.id == ItemID.itemYetaWrench && block.id == BlockID.fluidConduit && Entity.getSneaking(Player.get())) {

      World.setBlock(coords.x, coords.y, coords.z, BlockID.fluidConduitEx, 0);

   }
});;
/*
Callback.addCallback("ItemUse", function(coords, item, block) {
   if (item.id == ItemID.itemYetaWrench && block.id == BlockID.fluidConduitEx && Entity.getSneaking(Player.get())) {

      World.setBlock(coords.x, coords.y, coords.z, BlockID.fluidConduit, 0);

   }
});
*/
Callback.addCallback("ItemUse", function(coords, item, block) {
   if (item.id == ItemID.itemYetaWrench && block.id == BlockID.fluidConduitEx && Entity.getSneaking(Player.get())) {

      World.setBlock(coords.x, coords.y, coords.z, BlockID.fluidConduitIn, 0);

   }
});
Callback.addCallback("ItemUse", function(coords, item, block) {
   if (item.id == ItemID.itemYetaWrench && block.id == BlockID.fluidConduitIn && Entity.getSneaking(Player.get())) {

      World.setBlock(coords.x, coords.y, coords.z, BlockID.fluidConduit, 0);

   }
});

Block.registerDropFunction("fluidConduitEx", function() {
   return [[BlockID.fluidConduit, 1, 0]];
});

Block.registerDropFunction("fluidConduitIn", function() {
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
ConduitRegistry.setupModel(BlockID.fluidConduit, ConduitWidth, "liquid_pipe");
ConduitRegistry.setupModel(BlockID.fluidConduitEx, ConduitWidth, "liquid_pipe");
ConduitRegistry.setupModel(BlockID.fluidConduitIn, ConduitWidth, "liquid_pipe");

TileEntity.registerPrototype(BlockID.fluidConduit, {
   defaultValues: {
      check: false
   },
   tick() {
      if (World.getThreadTime() % 6 == 0)
         this.data.check = false;
   },
   click(id, count, data, coords, player) {
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
   getScreenName() {
      return false;
   },
   click(id, count, data, coords, player) {
      if (!Entity.getSneaking(player) && id == ItemID.itemYetaWrench) {
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
   getScreenName() {
      return;
   },
   getBlocks(x, y, z, arr) {
      for (let i in blocksCheck) {
         let pos = blocksCheck[i];
         let block = this.blockSource.getBlock(x + pos.x, y + pos.y, z + pos.z);
         if (block.id == BlockID.fluidConduit) {
            let tile = TileEntity.getTileEntity(x + pos.x, y + pos.y, z + pos.z, this.blockSource);
            if (tile && !tile.data.check) {
               tile.data.check = true;
               this.getBlocks(x + pos.x, y + pos.y, z + pos.z, arr);
            }
         } else if (block.id == BlockID.fluidConduitIn) {
            arr.push({ x: x + pos.x, y: y + pos.y, z: z + pos.z });
         }
      }
      return arr;
   },
   input(tile, output, pos) {
      let block = TileEntity.getTileEntity(pos.x, pos.y, pos.z, this.blockSource);
      for (let w in blocksCheck) {
         let ip = blocksCheck[w];
         if (block.data.active || block.data.isActive) {
            let input = TileEntity.getTileEntity(pos.x + ip.x, pos.y + ip.y, pos.z + ip.z, this.blockSource);
            if (input) {

               try {
                  let liquids = Object.keys(tile.liquidStorage.liquidAmounts);
                  for (let i in liquids)
                     if (output.canTransportLiquid(liquids[i], 0))
                        StorageInterface.transportLiquid(liquids[i], 50, output, StorageInterface.getLiquidStorage(this.blockSource, pos.x + ip.x, pos.y + ip.y, pos.z + ip.z), 0);
               } catch (e) {
                  StorageInterface.extractLiquid(null, 50, StorageInterface.getLiquidStorage(this.blockSource, pos.x + ip.x, pos.y + ip.y, pos.z + ip.z), output, 0);
               }
            }
         }
      }
   },
   pump() {
      let blocks = this.getBlocks(this.x, this.y, this.z, []);
      for (let q in blocksCheck) {
         let op = blocksCheck[q];
         let tile = TileEntity.getTileEntity(this.x + op.x, this.y + op.y, this.z + op.z, this.blockSource);
         if (tile) {
            let output = StorageInterface.getLiquidStorage(this.blockSource, this.x + op.x, this.y + op.y, this.z + op.z);
            for (let a in blocks)
               this.input(tile, output, blocks[a]);
         }
      }
   },
   click(id, count, data, coords, player) {
      if (!Entity.getSneaking(player) && id == ItemID.itemYetaWrench) {
         this.blockSource.spawnDroppedItem(this.x + .5, this.y + .5, this.z + .5, BlockID.fluidConduit, 1, 0);
         this.blockSource.destroyBlock(this.x, this.y, this.z, false);
      }
   },
   tick() {
      try {
         if (World.getThreadTime() % 20 == 0) {
            this.pump();
         }
      } catch (e) {
         Game.message(e)
      }
   }
});




// file: Base/Blocks/Conduit/./data.js

IDRegistry.genBlockID("dataConduit");
Block.createBlock("dataConduit", [
  { name: "Data Conduit", texture: [["dataConduit", 0]], inCreative: true }
]);

ConduitRegistry.setupModel(BlockID.dataConduit, ConduitWidth, "data-conduit");
//DataGroup.add(BlockID.dataConduit, -1);
/*
MachineRegistry.registerPrototype(BlockID.energyPlug, {
  defaultValues: {
    containerData: false
  },
  
  tick: function() {

    let direct = [
      { x: 0, y: 1, z: 0 },
      { x: 0, y: -1, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: -1, y: 0, z: 0 },
      { x: 0, y: 0, z: 1 },
      { x: 0, y: 0, z: -1 },
	   	];
    for (i in direct) {
      let dir = direct[i];
      let tile = World.getTileEntity(this.x + dir.x, this.y + dir.y, this.z + dir.z);
      
      if (tile && tile.data.containerData) {
        this.data.containerData = true
      } else {
        this.data.containerData = false
      }
      if(World.getBlockID(this.x + dir.x, this.y + dir.y, this.z + dir.z) == 54){
        this.data.containerData = true
      } else {
        this.data.containerData = false
      }
    }
  }

});*/




// file: Base/Blocks/Conduit/./Group.js

Item.addCreativeGroup("enderConduit", Translation.translate("Ender IO Conduit"), [
	BlockID.energyConduit,
	BlockID.energyConduitAdv,
	BlockID.energyConduitEnd,
	BlockID.dataConduit,
	BlockID.fluidConduit,
	//BlockID.fluidConduitEx,
	//BlockID.itemConduit,
    //BlockID.itemConduitExtract
]);




// file: Base/Blocks/Conduit/./Energy.js

IDRegistry.genBlockID("energyConduit");
Block.createBlock("energyConduit", [
  { name: "Conductive Iron Conduit", texture: [["powerConduitCore", 0]], inCreative: true }
]);
/*
RF.registerWire(BlockID.energyConduit);

setupConduitRender(BlockID.energyConduit, "conduitOther", "rf-wire", 0.15);

Block.setBlockShape(BlockID.energyConduit, { x: 0.2, y: 0.2, z: 0.2 }, { x: 0.8, y: 0.8, z: 0.8 });
*/
IDRegistry.genBlockID("energyConduitAdv");
Block.createBlock("energyConduitAdv", [
  { name: "Enhanced Energy Conduit", texture: [["powerConduitCoreEnhanced", 0]], inCreative: true }
]);

IDRegistry.genBlockID("energyConduitEnd");
Block.createBlock("energyConduitEnd", [
  { name: "Ender Power Conduit", texture: [["powerConduitCoreEnder", 0]], inCreative: true }
]);

Callback.addCallback("PreLoaded", function() {
    Recipes.addShaped({ id: BlockID.energyConduit, count: 8, data: 0 }, [
	  "bbb",
	  "ccc",
	  "bbb"
  ], ['b', ItemID.conduitBinder, 0, 'c', ItemID.conductiveIron, 0 ]);
  
  Recipes.addShaped({ id: BlockID.energyConduitAdv, count: 8, data: 0 }, [
	  "bbb",
	  "ccc",
	  "bbb"
  ], ['b', ItemID.conduitBinder, 0, 'c', ItemID.energeticAlloy, 0 ]);
 
 Recipes.addShaped({ id: BlockID.energyConduitEnd, count: 8, data: 0 }, [
	  "bbb",
	  "ccc",
	  "bbb"
  ], ['b', ItemID.conduitBinder, 0, 'c', ItemID.vibrantAlloy, 0 ]);

});

ConduitRegistry.registerCable("energyConduit", 1280);
ConduitRegistry.setupModel(BlockID.energyConduit, ConduitWidth, "rf-wire");

ConduitRegistry.registerCable("energyConduitAdv", 5120);
ConduitRegistry.setupModel(BlockID.energyConduitAdv, ConduitWidth, "rf-wire");

ConduitRegistry.registerCable("energyConduitEnd", 20480);
ConduitRegistry.setupModel(BlockID.energyConduitEnd, ConduitWidth, "rf-wire");
/*
Item.registerNameOverrideFunction(BlockID.energyConduit, function(item, name) {
  return name + "\n§7" + Translation.translate("Max Tranfer: ") + 640 + " RF/t";
});
Item.registerNameOverrideFunction(BlockID.energyConduitAdv, function(item, name) {
  return name + "\n§7" + Translation.translate("Max Tranfer: ") + 2560 + " RF/t";
});
Item.registerNameOverrideFunction(BlockID.energyConduitEnd, function(item, name) {
  return name + "\n§7" + Translation.translate("Max Tranfer: ") + 10240 + " RF/t";
});
*/




// file: Base/Blocks/Fix Bug/./Reinforced.js

var BLOCK_TYPE_ANTI_EXPLO = Block.createSpecialType({
  destroytime: 100,
  explosionres: 3600000*3,
  renderlayer: 3,
  rendertype: 0,
  translucency: 0,
  lightopacity: 15,
//  base: 99,
  lightlevel: 6,
  sound: "anvil"
});

IDRegistry.genBlockID("darkSteelBars");
Block.createBlock("darkSteelBars", [
  { name: "Dark Bars", texture: [["darkSteelBars", 0]], inCreative: true }
]);

Callback.addCallback("PostLoaded", function() {
  Recipes.addShaped({ id: BlockID.darkSteelBars, count: 1, data: 0 }, [
	"bcb",
	"cac",
	"bcb"
], ['a', ItemID.darkSteel, 0]);
});

//Block.setExplosionResistance(BlockID.darkSteelBars, 999999);

function setBarsRender(id, groupName, xsize, zsize) {
  var render = new ICRender.Model();
  BlockRenderer.setStaticICRender(id, 0, render);
  var boxes = [
    { side: [1, 0, 0], box: [xsize, 0, zsize, 1, 1, xsize] },
    { side: [-1, 0, 0], box: [0, 0, zsize, zsize, 1, xsize] },
    { side: [0, 0, 1], box: [zsize, 0, xsize, xsize, 1, 1] },
    { side: [0, 0, -1], box: [zsize, 0, 0, xsize, 1, zsize] },
    ];
  ICRender.getGroup(groupName).add(id, -1);
  for (var i in boxes) {
    var box = boxes[i];
    var model = BlockRenderer.createModel();
    model.addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5], "darkSteelBars", 0);
    render.addEntry(model).asCondition(box.side[0], box.side[1], box.side[2], ICRender.getGroup(groupName), 0);
  }
  var model = BlockRenderer.createModel();
  render.addEntry(model);
}

setBarsRender(BlockID.darkSteelBars, "ender-bars", 0.54, 0.46);
/*
Callback.addCallback("PostLoaded", function() {
  for(let i in BlockID){
		var tile = TileEntity.getPrototype(BlockID[i]);
		if(!tile) {
			ICRender.getGroup("ender-bars").add(BlockID[i], -1);
		}
	}
});*/

IDRegistry.genBlockID("reinforcedObsidian");
Block.createBlock("reinforcedObsidian", [
  { name: "Reinforced Obsidian", texture: [["reinforcedObsidian", 0]], inCreative: true }
], BLOCK_TYPE_ANTI_EXPLO)
ToolAPI.registerBlockMaterial(BlockID.reinforcedObsidian, "stone")
Recipes.addShaped({ id: BlockID.reinforcedObsidian, count: 1, data: 0 }, [
	"bab",
	"aca",
	"bab"
], ['a', ItemID.darkSteel, 0, 'b', BlockID.darkSteelBars, 0, 'c', 49, 0]);
Block.registerDropFunction("reinforcedObsidian", function(coords, blockID, blockData, level) {
  if (level > 3) {
    return [[BlockID.reinforcedObsidian, 1, 0]]
  }
  return [];
}, 2);




// file: Base/Blocks/Generator/./PhotoCeil.js

IDRegistry.genItemID("platePhotovoltaic");
Item.createItem("platePhotovoltaic", "Photovoltaic Plate", { name: "item_material_plate_photovoltaic" }, { stack: 64 });

IDRegistry.genItemID("dustPhotovoltaic");
Item.createItem("dustPhotovoltaic", "Photovoltaic Composite", { name: "item_material_powder_photovoltaic" }, { stack: 64 });

IDRegistry.genBlockID("photovoltaicCell");
Block.createBlock("photovoltaicCell", [
  {
    name: "Photovoltaic Cell",
    texture: [
	["solarPanelSide", 0], ["solarPanelTop", 0], ["solarPanelSide", 0]],
    inCreative: true
  }
]);
Block.setBlockShape(BlockID.photovoltaicCell, { x: 0, y: 0, z: 0 }, { x: 1, y: 0.2, z: 1 });

Callback.addCallback("PreLoaded", function() {
  Recipes.addShaped({ id: BlockID.advancedPhotovoltaicCell, count: 1, data: 0 },
    ["aga",
     "sgs",
     "epe"],
  ['e', ItemID.energeticAlloy, 0, 'a', ItemID.vibrantCrystal, 0, 's', ItemID.pulsatingIron, 0, 'p', 151, 0, 'g', BlockID.fusedQuartz, 0]);

  Recipes.addShaped({ id: BlockID.photovoltaicCell, count: 1, data: 0 },
    ["aga",
     "ppp",
     "ese"],
  ['e', ItemID.basicCapacitor, 0, 'a', ItemID.energeticAlloy, 0, 's', 151, 0, 'p', ItemID.platePhotovoltaic, 0, 'g', BlockID.fusedQuartz, 0]);

  Recipes.addShaped({ id: BlockID.photovoltaicCell, count: 1, data: 0 },
    ["aga",
     " p ",
     "ese"],
  ['e', ItemID.basicCapacitor, 0, 'a', ItemID.energeticAlloy, 0, 's', 151, 0, 'p', BlockID.simplePhotovoltaicCell, 0, 'g', BlockID.fusedQuartz, 0]);

  Recipes.addShaped({ id: ItemID.dustPhotovoltaic, count: 1, data: 0 },
    ["   ",
     "sgp",
     "   "],
  ['s', ItemID.silicon, 0, 'p', ItemID.dustLapis, 0, 'g', ItemID.dustCoal, 0]);
  RecipeRegistry.addSmelter({
    ingredient1: { id: ItemID.dustPhotovoltaic, data: 0, count: 2 },
    ingredient2: { id: 0, data: 0 },
    ingredient3: { id: 0, data: 0, count: 0 },
    result: { id: ItemID.platePhotovoltaic, count: 6, data: 0 },
    time: 500
  });
});

MachineRegistry.registerGenerator(BlockID.photovoltaicCell, {
  defaultValues: {
    canSeeSky: false
  },

  tick: function() {
    var energyStorage = this.getEnergyStorage();
    this.data.energy = Math.min(this.data.energy, energyStorage);
    if (World.getThreadTime() % 100 == 0) {
      this.data.canSeeSky = GenerationUtils.canSeeSky(this.x, this.y + 1, this.z);
    }
    if (this.data.canSeeSky && World.getLightLevel(this.x, this.y + 1, this.z) == 15) {
      this.data.energy += 40;
    }
  },

  getEnergyStorage: function() {
    return 400;
  },
  energyTick: function(type, src) {
    let output = Math.min(40, this.data.energy);
    this.data.energy += src.add(output) - output;
  }
});


IDRegistry.genBlockID("advancedPhotovoltaicCell");
Block.createBlock("advancedPhotovoltaicCell", [
  {
    name: "Advanced Photovoltaic Cell",
    texture: [
	["solarPanelAdvancedSide", 0], ["solarPanelAdvancedTop", 0], ["solarPanelAdvancedSide", 0]],
    inCreative: true
  }
]);
Block.setBlockShape(BlockID.advancedPhotovoltaicCell, { x: 0, y: 0, z: 0 }, { x: 1, y: 0.2, z: 1 });

MachineRegistry.registerGenerator(BlockID.advancedPhotovoltaicCell, {
  defaultValues: {
    canSeeSky: false
  },

  tick: function() {
    var energyStorage = this.getEnergyStorage();
    this.data.energy = Math.min(this.data.energy, energyStorage);
    if (World.getThreadTime() % 100 == 0) {
      this.data.canSeeSky = GenerationUtils.canSeeSky(this.x, this.y + 1, this.z);
    }
    if (this.data.canSeeSky && World.getLightLevel(this.x, this.y + 1, this.z) == 15) {
      this.data.energy += 80;
    }
  },

  getEnergyStorage: function() {
    return 800;
  },

  energyTick: function(type, src) {
    let output = Math.min(80, this.data.energy);
    this.data.energy += src.add(output) - output;
  }
});





IDRegistry.genBlockID("vibrantPhotovoltaicCell");
Block.createBlock("vibrantPhotovoltaicCell", [
  {
    name: "Vibrant Photovoltaic Cell",
    texture: [
	["solarPanelVibrantSide", 0], ["solarPanelVibrantTop", 0], ["solarPanelVibrantSide", 0]],
    inCreative: true
  }
]);
Block.setBlockShape(BlockID.vibrantPhotovoltaicCell, { x: 0, y: 0, z: 0 }, { x: 1, y: 0.2, z: 1 });


MachineRegistry.registerGenerator(BlockID.vibrantPhotovoltaicCell, {
  defaultValues: {
    canSeeSky: false
  },

  tick: function() {
    var energyStorage = this.getEnergyStorage();
    this.data.energy = Math.min(this.data.energy, energyStorage);
    if (World.getThreadTime() % 100 == 0) {
      this.data.canSeeSky = GenerationUtils.canSeeSky(this.x, this.y + 1, this.z);
    }
    if (this.data.canSeeSky && World.getLightLevel(this.x, this.y + 1, this.z) == 15) {
      this.data.energy += 160;
    }
  },

  getEnergyStorage: function() {
    return 1600;
  },

  energyTick: function(type, src) {
    let output = Math.min(160, this.data.energy);
    this.data.energy += src.add(output) - output;
  }
});

// Export API 
function CreatePhotovoltaicCell(id, energyCre, Stor, lightMax) {
  var LightReq;
  if (lightMax) {
    LightReq = lightMax
  } else {
    LightReq = 15
  }
  Block.setBlockShape(BlockID[id], { x: 0, y: 0, z: 0 }, { x: 1, y: 0.2, z: 1 });


  MachineRegistry.registerGenerator(BlockID[id], {
    defaultValues: {
      canSeeSky: false
    },

    tick: function() {
      var energyStorage = this.getEnergyStorage();
      this.data.energy = Math.min(this.data.energy, energyStorage);
      if (World.getThreadTime() % 100 == 0) {
        this.data.canSeeSky = GenerationUtils.canSeeSky(this.x, this.y + 1, this.z);
      }
      if (this.data.canSeeSky && World.getLightLevel(this.x, this.y + 1, this.z) == LightReq) {
        this.data.energy += energyCre;
      }
    },

    getEnergyStorage: function() {
      return Stor;
    },

    energyTick: function(type, src) {
      let output = Math.min(energyCre, this.data.energy);
      this.data.energy += src.add(output) - output;
    }
  });

}




// file: Base/Blocks/Generator/./combustion.js

function setCombustionRender(blockID) {
   Block.setBlockShape(blockID, { x: 0.1, y: 0, z: 0 }, { x: 0.95, y: 0.95, z: 0.95 });
   BlockRenderer.addRenderCallback(blockID, function(api, coords, block) {
      api.renderBoxId(coords.x, coords.y, coords.z, 0, 0, 0, 0.4, 1, 1, blockID, 0);
      api.renderBoxId(coords.x, coords.y, coords.z, 0.4, 0.125, 0, 0.6, 0.875, 1, blockID, 0);
      api.renderBoxId(coords.x, coords.y, coords.z, 0.6, 0, 0, 1, 1, 1, blockID, 0);
   });

   BlockRenderer.enableCustomRender(blockID);
}



IDRegistry.genBlockID("combustionGenerator");
Block.createBlockWithRotation("combustionGenerator", [
   {
      name: "Combustion Generator",
      texture: [
	["machineBottom", 0], ["combustion_gen_top", 0], ["machineSide", 0],
	["combustion_gen_front", 0], ["machineSide", 0], ["machineSide", 0]],
      inCreative: true
  }
]);

Callback.addCallback("PreLoaded", function() {
   Recipes.addShaped({ id: BlockID.combustionGenerator, count: 1, data: 0 }, [
         	"ici",
         	"rmr",
   	     "gfg"
       ], ['i', ItemID.electricalSteel, 0, 'c', ItemID.darkSteel, 0, "r", BlockID.eioTank, 0, 'm', BlockID.machineChassi, 0, "f", VanillaBlockID.piston, 0, "g", ItemID.darkSteelGear, 0
     ]);
});
setCombustionRender(BlockID.combustionGenerator);

var combustionGenUI = new UI.StandartWindow({
   standart: {
      header: { text: { text: "Combustion Generator" } },
      inventory: { standart: true },
      background: { standart: true }
   },

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
         value: 1,
         clicker: {
            onClick: function(container, tile) {
               let amount = tile.liquidStorage.getAmount(tile.data.cool_fluid) * 1000
               if (amount.toFixed(4)) {
                  alert(amount.toFixed(4) + " mb");
               } else {
                  alert("0 mb");
               }
            }
            /*
                        onLongClick: function() {
                           RV && RV.openRecipePage("enderio_alloy");
                        }*/
         }
      },
      "liquidHeat": {
         type: "scale",
         x: 430,
         y: 120,
         direction: 1,
         bitmap: "tankOverlay",
         overlay: "tankOverlay",
         scale: 3.2,
         value: 1,
         clicker: {
            onClick: function(container, tile) {
               let amount = tile.liquidStorage.getAmount(tile.data.heat_fluid) * 1000
               if (amount.toFixed(4)) {
                  alert(amount.toFixed(4) + " mb");
               } else {
                  alert("0 mb");
               }
            }
            /*
                        onLongClick: function() {
                           RV && RV.openRecipePage("enderio_alloy");
                        }*/
         }
      },
   }
});


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


MachineRegistry.registerGenerator(BlockID.combustionGenerator, {
   defaultValues: {
      //time: 0,
      //progress: 0,
      mutil_bonus: 1,
      isActive: false,
      heat_fluid: null,
      cool_fluid: null
   },
   oldValues: {
      mutil_bonus: 1
   },

   //upgrades: ["capacitor"],

   getGuiScreen: function() {
      return combustionGenUI;
   },

   getLiquidFromItem: MachineRegistry.getLiquidFromItem,
   addLiquidToItem: MachineRegistry.addLiquidToItem,

   resetValues: function() {
      this.data.mutil_bonus = this.oldValues.mutil_bonus
   },

   init: function() {
      // for (let i in EnderIOLiquid){
      this.liquidStorage.setLimit("water", 5);
      this.liquidStorage.setLimit("hootch", 5);
      this.liquidStorage.setLimit("fireWater", 5);
   },

   MachineRun: function() {
      // Run;
      /* 
      var cooler_liquid = GenFuel.getCooler(this.data.cool_fluid);
      var heater_liquid = GenFuel.getHeater(this.data.heat_fluid);
      if (cooler_liquid && heater_liquid) {
         let cool_time_burn = GenFuel.getTimeToBurnCool(this.data.heat_fluid, this.data.cool_fluid);
         let cool_cost_per_tick = 1 / cool_time_burn;
         if (this.liquidStorage.getAmount(this.data.heat_fluid) >= heater_liquid.amount &&
            this.liquidStorage.getAmount(this.data.cool_fluid) >= cool_cost_per_tick &&
            (this.data.energy + heater_liquid.product * this.data.mutil_bonus) <= energyStorage) {

            this.data.energy += heater_liquid.product * this.data.mutil_bonus;
            this.liquidStorage.getLiquid(cooler_liquid.id, cool_cost_per_tick);
            this.liquidStorage.getLiquid(heater_liquid.id, heater_liquid.amount);
            this.activate();
         } else {
            this.deactivate();
         }
      }
      */
      
      var energyStorage = this.getEnergyStorage();
      
      for (let i in GenFuel.coolFuel) {
         for (let e in GenFuel.heatFuel) {
            let cooler_liquid = GenFuel.coolFuel[i]
            let heater_liquid = GenFuel.heatFuel[e]
            // check  fuel
            if ((this.data.heat_fluid == heater_liquid.id && this.liquidStorage.getAmount(this.data.heat_fluid) >= heater_liquid.amount / 1000) && (this.data.cool_fluid == cooler_liquid.id && this.liquidStorage.getAmount(this.data.cool_fluid) >= (1 / (cooler_liquid.time * heater_liquid.coolCost)) / 1000)) {

               let cool_time_burn = cooler_liquid.time * heater_liquid.coolCost;
               let cool_cost_per_tick = 1 / cool_time_burn / 1000;
               if (this.data.energy + heater_liquid.product < energyStorage) {
                  this.data.energy += heater_liquid.product * this.data.mutil_bonus;
                  this.liquidStorage.getLiquid(cooler_liquid.id, cool_cost_per_tick);
                  this.liquidStorage.getLiquid(heater_liquid.id, heater_liquid.amount / 1000);
                  this.activate();
                  this.container.setScale("burningScale", 1);
               } else {
                  this.deactivate();
                  this.container.setScale("burningScale", 0);
               }
            } else {
               this.deactivate();
               this.container.setScale("burningScale", 0);
            }
            if (!this.data.heat_fluid || (this.data.heat_fluid == heater_liquid.id && this.liquidStorage.getAmount(this.data.heat_fluid) <= 4)) {
               var slot1 = this.container.getSlot("slot1");
               var slot2 = this.container.getSlot("slot2");
               this.getLiquidFromItem(heater_liquid.id, slot1, slot2);
               this.data.heat_fluid = heater_liquid.id
            }

            if (!this.data.cool_fluid || (this.data.cool_fluid == cooler_liquid.id && this.liquidStorage.getAmount(this.data.cool_fluid) <= 4)) {
               var slot3 = this.container.getSlot("slot3");
               var slot4 = this.container.getSlot("slot4");
               this.getLiquidFromItem(cooler_liquid.id, slot3, slot4);
               this.data.cool_fluid = cooler_liquid.id
            }
            this.liquidStorage.updateUiScale("liquidHeat", this.data.heat_fluid);
            this.liquidStorage.updateUiScale("liquidCool", this.data.cool_fluid);
         }
      }

      if (this.data.cool_fluid && this.liquidStorage.getAmount(this.data.cool_fluid) <= 0) {
         this.data.cool_fluid = null
      }

      if (this.data.heat_fluid && this.liquidStorage.getAmount(this.data.heat_fluid) <= 0) {
         this.data.heat_fluid = null
      }

   },
   tick: function() {
      /*
            this.resetValues();
            UpgradeAPI.executeUpgrades(this);
            */
      var energyStorage = this.getEnergyStorage();
      this.data.energy = Math.min(this.data.energy, energyStorage);
      this.container.setText("text", "RF: " + this.data.energy + "/" + this.getEnergyStorage() + "\n Bonus energy: x" + this.data.mutil_bonus);

      let capacitor = this.container.getSlot("slotCapacitor");
      for (let i in capacitorObj) {
         if (capacitor.id == capacitorObj[i]) {
            this.container.setText("textInstall", "Installed");
            this.MachineRun();
         } else {
            this.container.setText("textInstall", "Please put Capacitor in slot capacitor to install function for machine");
         }
      }


      this.container.setScale("energyScale", this.data.energy / energyStorage);
   },
   getEnergyStorage: function() {
      return 100000;
   },
   energyTick: function(type, src) {
      let output = Math.min(60, this.data.energy);
      this.data.energy += src.add(output) - output;
   }
});




// file: Base/Blocks/Generator/./Stirling.js

IDRegistry.genBlockID("stirlingGen");
Block.createBlockWithRotation("stirlingGen", [
   {
      name: "Stirling Generator",
      texture: [
	["machineBottom", 0], ["machineTop", 0], ["machineSide", 0],
	["stirlingGenFront", 0], ["machineSide", 0], ["machineSide", 0]],
      inCreative: true
  }
], "opaque");

TileRenderer.setStandartModel(BlockID.stirlingGen, [["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["stirlingGenFront", 0], ["machineSide", 0], ["machineSide", 0]]);
TileRenderer.registerRotationModel(BlockID.stirlingGen, 0, [["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["stirlingGenFront", 0], ["machineSide", 0], ["machineSide", 0]]);
TileRenderer.registerRotationModel(BlockID.stirlingGen, 4, [["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["stirlingGenFrontOn", 0], ["machineSide", 0], ["machineSide", 0]]);

TileRenderer.setRotationPlaceFunction(BlockID.stirlingGen);

Callback.addCallback("PreLoaded", function() {

   Recipes.addShaped({ id: BlockID.stirlingGen, count: 1, data: 0 },
    ["   ",
     "sfs",
     "gpg"],
    ['s', ItemID.darkSteel, 0, 'f', BlockID.machineChassi, 0, 'g', ItemID.darkSteelGear, 0, "p", BlockID.simpleStirlingGen, 0]);

});

var stirlingGenGUI = new UI.StandartWindow({
   standart: {
      header: { text: { text: "Stirling Generator" } },
      inventory: { standart: true },
      background: { standart: true }
   },

   drawing: [
      { type: "bitmap", x: 450, y: 135, bitmap: "fire_scale0", scale: 3.2 },
      { type: "bitmap", x: 335, y: 140, bitmap: "redflux_bar0", scale: 3.2 },
	],

   elements: {
      "energyScale": { type: "scale", x: 335, y: 140, direction: 1, value: 0.5, bitmap: "redflux_bar1", scale: 3.2 },
      "textInstall": { type: "text", font: { size: 20, color: Color.YELLOW }, x: 325, y: 50, width: 50, height: 30, text: "" },
      "burningScale": { type: "scale", x: 450, y: 135, direction: 1, bitmap: "fire_scale1", scale: 3.2 },
      "slotFuel": { type: "slot", x: 441, y: 180 },
      "text": { type: "text", x: 400, y: 100, width: 100, height: 30, text: "RF" },
      "slotCapacitor": { type: "slot", x: 325, y: 320 }
   }
});



MachineRegistry.registerGenerator(BlockID.stirlingGen, {
   defaultValues: {
      burn: 0,
      burnMax: 0,
      bonus: 1,
      isActive: false
   },
   oldValues: {
      bonus: 1
   },

   upgrades: ["capacitor"],

   getGuiScreen: function() {
      return stirlingGenGUI;
   },

   getFuel: function(slotName) {
      var fuelSlot = this.container.getSlot(slotName);
      if (fuelSlot.id > 0) {
         var burn = Recipes.getFuelBurnDuration(fuelSlot.id, fuelSlot.data);
         if (burn && !LiquidRegistry.getItemLiquid(fuelSlot.id, fuelSlot.data)) {
            fuelSlot.count--;
            this.container.validateSlot(slotName);

            return burn;
         }
      }
      return 0;
   },

   resetValues: function() {
      this.data.bonus = this.oldValues.bonus
   },

   MachineRun: function() {
      let energyStorage = this.getEnergyStorage();
      if (this.data.burn <= 0 && this.data.energy + 80 * this.data.bonus < energyStorage) {
         this.data.burn = this.data.burnMax = this.getFuel("slotFuel") / 4;
      }
      if (this.data.burn > 0 && this.data.energy + 80 * this.data.bonus < energyStorage) {
         Particles.addFarParticle(Native.ParticleType.smoke, this.x - .5, this.y + 1.1, this.z + .5)
         this.data.energy += 80 * this.data.bonus;
         this.data.burn--;
         this.activate();
      } else {
         this.deactivate();
      }

      for (let xx = -2; xx++; xx <= 2) {
         for (let yy = -2; yy++; yy <= 2) {
            for (let zz = -2; zz++; zz <= 2) {
               var tempBlockList = {
                  10: 2.5,
                  11: 3,
                  50: 1,
                  51: 1.5,
                  213: 2
               }
               var tempAccess = tempBlockList[World.getBlockID(this.x + xx, this.y + yy, this.z + zz)]
               if (tempAccess) {
                  this.data.energy += 20 * this.data.bonus * tempAccess;
               }

            }
         }
      }

   },

   tick: function() {
      this.resetValues();
      UpgradeAPI.executeUpgrades(this);
      /*  let slotCapacitor = this.container.getSlot("slotCapacitor");
		for(let i in capacitorObj){
			var capac = capacitorObj[i];
    if (slotCapacitor.id != capac) {
      this.data.bonus = this.oldValues.bonus
    }
    }*/
      var energyStorage = this.getEnergyStorage();
      this.data.energy = Math.min(this.data.energy, energyStorage);
      this.container.setText("text", "RF: " + this.data.energy + "/" + this.getEnergyStorage() + ". Bonus energy: x" + this.data.bonus + ".0");

      let capacitor = this.container.getSlot("slotCapacitor");
      for (var i in capacitorObj) {
         if (capacitor.id == capacitorObj[i]) {
            this.container.setText("textInstall", "Installed");
            this.MachineRun();
         } else {
            this.container.setText("textInstall", "Please put Capacitor in slot capacitor to install function for machine");
         }

      }
      this.container.setScale("burningScale", this.data.burn / this.data.burnMax || 0);
      this.container.setScale("energyScale", this.data.energy / this.getEnergyStorage());
   },
   getEnergyStorage: function() {
      return 100000;
   },

   canReceiveEnergy: function() {
      return false;
   },

   energyTick: function(type, src) {
      let output = Math.min(80 * this.data.bonus, this.data.energy);
      this.data.energy += src.add(output) - output;
   }
});

StorageInterface.createInterface(BlockID.stirlingGen, {
   slots: {
      "slotFuel": { input: true }
   },
   isValidInput: function(item) {
      return Recipes.getFuelBurnDuration(item.id, item.data) > 0;
   }
});




// file: Base/Blocks/Generator/./zombie.js

IDRegistry.genBlockID("zombieGen");
Block.createBlock("zombieGen", [{ "name": "Zombie Generator", "texture": [["darkSteelBlock", 0]], "inCreative": true }]);

Callback.addCallback("PreLoaded", function() {
   Recipes.addShaped({ id: BlockID.zombieGen, count: 1, data: 0 }, [
         	"iii",
         	"rmr",
   	     "rrr"
       ], ['i', ItemID.electricalSteel, 0, "r", BlockID.fusedQuartz, 0, 'm', ItemID.skullZombieElectrode, 0
     ]);
});

function setZomGen() {
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
}
setZomGen()

Block.setBlockShape(BlockID.zombieGen, { "x": 0, "y": 0, "z": 0 }, { "x": 1, "y": 1, "z": 1 });

var guiZombieGen = new UI.StandartWindow({
   standart: {
      header: { text: { text: "Zombie Generator" } },
      inventory: { standart: true },
      background: { standart: true }
   },

   drawing: [
      { type: "bitmap", x: 470, y: 66, bitmap: "fluid_scale", scale: 3.2 },
      { type: "bitmap", x: 66, y: 135, bitmap: "fire_scale0", scale: 3.2 },
      { type: "bitmap", x: 335, y: 140, bitmap: "redflux_bar0", scale: 3.2 },
	],

   elements: {
      "text": { type: "text", x: 400, y: 100, width: 100, height: 30, text: "RF" },
      "energyScale": { type: "scale", x: 335, y: 140, direction: 1, value: 0.5, bitmap: "redflux_bar1", scale: 3.2 },
      "slotCapacitor": { type: "slot", x: 325, y: 320 },
      "textInstall": { type: "text", font: { size: 20, color: Color.YELLOW }, x: 325, y: 50, width: 100, height: 30, text: "" },
      "burningScale": { type: "scale", x: 660, y: 135, direction: 1, bitmap: "fire_scale1", scale: 3.2 },
      "liquidScale": { type: "scale", x: 470, y: 275, direction: 1, bitmap: "fluid_scale", scale: 3.2 },
      "slotLiquid0": { type: "slot", x: 600, y: 240 },
      "slotLiquid1": { type: "slot", x: 600, y: 180 },
   }
});

StorageInterface.createInterface(BlockID.geothermalGenerator, {
   slots: {
      "slotLiquid0": { input: true },
      "slotLiquid1": { output: true }
   },
   isValidInput: function(item) {
      return LiquidLib.getItemLiquid(item.id, item.data) == "nutrientDistillation";
   },
   canReceiveLiquid: function(liquid, side) { return liquid == "nutrientDistillation"; },
   canTransportLiquid: function(liquid, side) { return false; }
});

MachineRegistry.registerGenerator(BlockID.zombieGen, {
   defaultValues: {
      burn: 0,
      burnMax: 0,
      mutil_bonus: 1,
      isActive: false
   },
   oldValues: {
      mutil_bonus: 1
   },

   upgrades: ["capacitor"],

   getGuiScreen: function() {
      return guiZombieGen;
   },

   getLiquidFromItem: MachineRegistry.getLiquidFromItem,
   addLiquidToItem: MachineRegistry.addLiquidToItem,

   resetValues: function() {
      this.data.mutil_bonus = this.oldValues.mutil_bonus
   },

   tick: function() {
      this.resetValues();
      UpgradeAPI.executeUpgrades(this);


      let storage = this.liquidStorage;
      //let liquid = storage.getLiquidStored();
      let slot0 = this.container.getSlot("slotLiquid0");
      let slot1 = this.container.getSlot("slotLiquid1");
      let capacitor = this.container.getSlot("slotCapacitor");
      this.liquidStorage.updateUiScale("liquidScale", this.liquidStorage.getLiquidStored());
      for (let i in capacitorObj) {
         if (capacitor.id == capacitorObj[i]) {
            this.container.setText("textInstall", "Installed");
            if (this.liquidStorage.getAmount("nutrientDistillation") >= 1.4 && this.data.energy <= this.getEnergyStorage() + 80 * this.data.mutil_bonus) {
               var amount = 1 / 12
               var amount_mb = amount / 1000
               this.data.energy += 80 * this.data.mutil_bonus;
               storage.getLiquid("nutrientDistillation", amount_mb);
               this.activate();
            } else {
               this.deactivate();
            }

         } else {
            this.container.setText("textInstall", "Please put Capacitor in slot capacitor to install function for machine");
         }
      }
      
      this.getLiquidFromItem("nutrientDistillation", slot0, slot1);

      var energyStorage = this.getEnergyStorage();
      this.data.energy = Math.min(this.data.energy, energyStorage);
      this.container.setText("text", "RF: " + this.data.energy + "/" + this.getEnergyStorage() + ".Bonus energy: x" + this.data.mutil_bonus + ".0");
      this.container.setScale("energyScale", this.data.energy / this.getEnergyStorage());
   },
   getEnergyStorage: function() {
      return 100000;
   },
   energyTick: function(type, src) {
      let output = Math.min(80 * this.data.mutil_bonus, this.data.energy);
      this.data.energy += src.add(output) - output;
   }
});




// file: Base/Blocks/Machine/./sands.js

IDRegistry.genBlockID("sliceAndSplice");
Block.createBlockWithRotation("sliceAndSplice", [{ "name": "Slice 'n' splice", "texture": [["blockSoulMachineBottom", 0], ["blockSoulMachineTop", 0], ["blockSoulMachineSide", 0], ["sliceAndSpliceFront", 0], ["blockSoulMachineSide", 0], ["blockSoulMachineSide", 0]], "inCreative": true }]);

TileRenderer.setStandartModel(BlockID.sliceAndSplice, [["blockSoulMachineBottom", 0], ["blockSoulMachineTop", 0], ["blockSoulMachineSide", 0], ["sliceAndSpliceFront", 0], ["blockSoulMachineSide", 0], ["blockSoulMachineSide", 0]]);
TileRenderer.registerRotationModel(BlockID.sliceAndSplice, 0, [["blockSoulMachineBottom", 0], ["blockSoulMachineTop", 0], ["blockSoulMachineSide", 0], ["sliceAndSpliceFront", 0], ["blockSoulMachineSide", 0], ["blockSoulMachineSide", 0]]);
TileRenderer.registerRotationModel(BlockID.sliceAndSplice, 4, [["blockSoulMachineBottom", 0], ["blockSoulMachineTop", 0], ["blockSoulMachineSide", 0], ["sliceAndSpliceFrontOn", 0], ["blockSoulMachineSide", 0], ["blockSoulMachineSide", 0]]);

TileRenderer.setRotationPlaceFunction(BlockID.sliceAndSplice);

var SliceAndSpliceGUI = new UI.StandartWindow({
   standart: {
      header: { text: { text: "Slice 'n' splice" } },
      inventory: { standart: true },
      background: { standart: true }
   },
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
            onClick: function() {
               RV && RV.openRecipePage("enderio_sas");
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

Callback.addCallback("PreLoaded", function() {
   Recipes.addShaped({ id: BlockID.sliceAndSplice, count: 1, data: 0 }, [
    	"shs",
    	"amc",
	   "sss"
  ], ['s', ItemID.soularium, 0, 'h', 397, -1, "a", 258, 0, "c", 359, 0, "m", BlockID.machineChassiSoul, 0]);

   RecipeRegistry.addSliceAndSplice({
      input0: { id: ItemID.soularium, data: 0 },
      input1: { id: ItemID.zombieSkull, data: 0 },
      input2: { id: ItemID.soularium, data: 0 },
      input3: { id: ItemID.silicon, data: 0 },
      input4: { id: 331, data: 0 },
      input5: { id: ItemID.silicon, data: 0 },
      output: { id: ItemID.skullZombieController, data: 0 },
      time: 250
   });

   RecipeRegistry.addSliceAndSplice({
      input0: { id: ItemID.energeticAlloy, data: 0 },
      input1: { id: ItemID.zombieSkull, data: 0 },
      input2: { id: ItemID.energeticAlloy, data: 0 },
      input3: { id: ItemID.silicon, data: 0 },
      input4: { id: ItemID.basicCapacitor, data: 0 },
      input5: { id: ItemID.silicon, data: 0 },
      output: { id: ItemID.skullZombieElectrode, data: 0 },
      time: 250
   });
   /*                   
   MachineRecipe.addSliceAndSpliceRecipe(
   [ItemID.soulariumIngot, , ItemID.soulariumIngot,
    ItemID.silicon, 331, ItemID.silicon], {}
   );*/
});

var AXES = {
   258: true,
   271: true,
   274: true,
   279: true,
   286: true,
   "VanillaItemID.netherite_axe": true,
   "ItemID.bronzeAxe": true
}

MachineRegistry.registerElectricMachine(BlockID.sliceAndSplice, {
   defaultValues: {
      power_tier: 2,
      progress: 0,
      work_time: 1000,
      speed: 1,
      energy_consumption: 80,
      energy_storage: 100000,
      isActive: false
   },
   oldValues: {
      speed: 1,
      energy_consumption: 80,
      energy_storage: 100000,
   },
   getGuiScreen: function() {
      return SliceAndSpliceGUI;
   },
   upgrades: ["capacitor"],

   getTier: function() {
      return this.data.power_tier;
   },

   resetValues: function() {
      this.data.energy_storage = this.oldValues.energy_storage;
      this.data.energy_consumption = this.oldValues.energy_consumption;
      this.data.speed = this.oldValues.speed;
   },

   MachineRun: function() {
      let newActive = false;
      let input0 = this.container.getSlot("slotInput0");
      let input1 = this.container.getSlot("slotInput1");
      let input2 = this.container.getSlot("slotInput2");
      let input3 = this.container.getSlot("slotInput3");
      let input4 = this.container.getSlot("slotInput4");
      let input5 = this.container.getSlot("slotInput5");
      let output = this.container.getSlot("slotOutput");
      let slotAxe = this.container.getSlot("slotAxe");
      let slotShears = this.container.getSlot("slotShears");

      let run = false
      for (let i in RecipeRegistry.sliceAndSplice) {
         var recipe = RecipeRegistry.sliceAndSplice[i];
         var in0 = recipe.input0
         var in1 = recipe.input1
         var in2 = recipe.input2
         var in3 = recipe.input3
         var in4 = recipe.input4
         var in5 = recipe.input5
         var out = recipe.output
         var time = recipe.time

         if (input0.id == in0.id && input1.id == in1.id && input2.id == in2.id && input3.id == in3.id && input4.id == in4.id && input5.id == in5.id) {
            run = true;
         }
         this.container.setScale("progressScale", this.data.progress / time)
         if (run && AXES[slotAxe.id] && slotShears.id == 359 && ((output.id == out.id && output.count < 64 && output.data == out.data) || output.id == 0)) {
            if (this.data.energy >= this.data.energy_consumption) {
               this.data.progress += this.data.speed;
               this.data.energy -= this.data.energy_consumption;
               newActive = true;
               this.data.work_time = time;
               if (this.data.progress >= this.data.work_time) {
                  input0.count--;
                  input1.count--;
                  input2.count--;
                  input3.count--;
                  input4.count--;
                  input5.count--;
                  output.id = out.id;
                  output.data = out.data;
                  output.count++;
                  slotAxe.data++;
                  slotShears.data++;
                  this.data.progress = 0;
                  /*
                  if (Math.random() <= 0.05) {
                     if (randomInt(0, 1) == 0) {
                        slotAxe.id = 0
                     } else slotShears.id = 0;
                  }*/
                  this.container.validateAll();

               }

            } else {
               this.data.progress = 0;
            }
         }
      }
      if (!newActive)
         // this.stopPlaySound(true);
         this.setActive(newActive);
   },

   tick: function() {
      this.resetValues();
      UpgradeAPI.executeUpgrades(this);

      let capacitor = this.container.getSlot("slotCapacitor");
      for (let i in capacitorObj) {
         if (capacitor.id == capacitorObj[i]) {
            this.container.setText("textInstall", "Installed");
            this.MachineRun();

         } else {
            this.container.setText("textInstall", "Please put Capacitor in slot capacitor to install function for machine");
         }
      }

      var energyStorage = this.getEnergyStorage();
      this.data.energy = Math.min(this.data.energy, energyStorage);
      this.container.setScale("energyScale", this.data.energy / energyStorage);

      this.container.setText("text", "RF: " + this.data.energy + "/" + energyStorage);
   },
   getEnergyStorage: function() {
      return this.data.energy_storage;
   }
});




// file: Base/Blocks/Machine/./alloyMelter.js

IDRegistry.genBlockID("alloySmelter");
Block.createBlockWithRotation("alloySmelter", [
   {
      name: "Alloy Smelter",
      texture: [
	   ["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["alloySmelterFront", 0], ["machineSide", 0], ["machineSide", 0]
	 ],
      inCreative: true
  }
], "opaque");

TileRenderer.setStandartModel(BlockID.alloySmelter, [["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["alloySmelterFront", 0], ["machineSide", 0], ["machineSide", 0]]);
TileRenderer.registerRotationModel(BlockID.alloySmelter, 0, [["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["alloySmelterFront", 0], ["machineSide", 0], ["machineSide", 0]]);
TileRenderer.registerRotationModel(BlockID.alloySmelter, 4, [["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["alloySmelterFrontOn", 0], ["machineSide", 0], ["machineSide", 0]]);

TileRenderer.setRotationPlaceFunction(BlockID.alloySmelter);

/*
 // Generated With Model Converter - Json To ICModel
var render = new ICRender.Model();
var model = BlockRenderer.createModel();
	model.addBox(1/16, 1/16, 14.75/16, 2/16, 15/16, 15.75/16, [, ["block_alloy_smelter_front", 0], ["block_alloy_smelter_front", 0]]); //undefined
	model.addBox(2/16, 12/16, 14.75/16, 15/16, 15/16, 15.75/16, ["block_alloy_smelter_front", 0], ["block_alloy_smelter_front", 0]]); //undefined
	model.addBox(2/16, 1/16, 14.75/16, 5/16, 9/16, 15.75/16, [, ["block_alloy_smelter_front", 0], ["block_alloy_smelter_front", 0], ["block_alloy_smelter_front", 0]]); //undefined
	model.addBox(5/16, 7/16, 14.75/16, 6/16, 12/16, 15.75/16, ["block_alloy_smelter_front", 0], ["block_alloy_smelter_front", 0], ["block_alloy_smelter_front", 0], ["block_alloy_smelter_front", 0]]); //undefined
	model.addBox(5/16, 1/16, 14.75/16, 15/16, 2/16, 15.75/16, [, ["block_alloy_smelter_front", 0], ["block_alloy_smelter_front", 0]]); //undefined
	model.addBox(6/16, 7/16, 14.75/16, 15/16, 9/16, 15.75/16, ["block_alloy_smelter_front", 0], ["block_alloy_smelter_front", 0], ["block_alloy_smelter_front", 0]]); //undefined
	model.addBox(10/16, 9/16, 14.75/16, 11/16, 12/16, 15.75/16, [, ["block_alloy_smelter_front", 0], ["block_alloy_smelter_front", 0], ["block_alloy_smelter_front", 0]]); //undefined
	model.addBox(11/16, 2/16, 14.75/16, 15/16, 7/16, 15.75/16, [, ["block_alloy_smelter_front", 0], ["block_alloy_smelter_front", 0]]); //undefined
	model.addBox(14/16, 9/16, 14.75/16, 15/16, 12/16, 15.75/16, [, ["block_alloy_smelter_front", 0], ["block_alloy_smelter_front", 0]]); //undefined
	model.addBox(1/16, 1/16, 13.75/16, 15/16, 15/16, 14.75/16, [, ["block_alloy_smelter_front", 0]]); //undefined
render.addEntry(model);
BlockRenderer.setStaticICRender(BlockID.block_rendered, 0, render);
//Model generated with block id block_rendered, please change id before copy pasting to your code!
*/

var smelterGUI = new UI.StandartWindow({
   standart: {
      header: { text: { text: "Alloy Smelter" } },
      inventory: { standart: true },
      background: { standart: true }
   },
   drawing: [
      { type: "bitmap", x: 527, y: 235, bitmap: "fire_scale0", scale: 3.2 },
      { type: "bitmap", x: 687, y: 235, bitmap: "fire_scale0", scale: 3.2 },
      { type: "bitmap", x: 335, y: 140, bitmap: "redflux_bar0", scale: 3.2 },
        //{type: "bitmap", x: 600, y: 170, bitmap: "bar_alloy", scale: 4.5},
    ],
   elements: {
      "progressBack0": {
         type: "bitmap",
         x: 527,
         y: 235,
         direction: 1,
         bitmap: "fire_scale0",
         scale: 3.2,
         clicker: {
            onClick: function() {
               RV && RV.openRecipePage("enderio_alloy");
            }
         }
      },
      "progressScale0": {
         type: "scale",
         x: 527,
         y: 235,
         direction: 1,
         bitmap: "fire_scale1",
         scale: 3.2,
         clicker: {
            onClick: function(container, tile) {
               let percent = (tile.data.progress / tile.data.work_time) * 100
               if (percent) {
                  alert(percent + " %");
               } else {
                  alert("0 %");
               }
            },
            onLongClick: function() {
               RV && RV.openRecipePage("enderio_alloy");
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
            onClick: function(container, tile) {
               let percent = (tile.data.progress / tile.data.work_time) * 100
               if (percent) {
                  alert(percent + " %");
               } else {
                  alert("0 %");
               }
            },
            onLongClick: function() {
               RV && RV.openRecipePage("enderio_alloy");
            }
         }
      },
      "energyScale": {
         type: "scale",
         x: 335,
         y: 140,
         direction: 1,
         bitmap: "redflux_bar1",
         scale: 3.2,
         clicker: {
            onClick: function(container, tile) {
               alert(tile.data.energy + " / " + tile.data.energy_storage + " RF");
            },
            onLongClick: function(container, tile) {
               alert("Energy Use: " + tile.data.energy_consumption + " RF/t")
            }
         }
      },
      "ingredient1": {
         type: "slot",
         x: 520,
         y: 170,
         isValid: function(id, count, data) {
            return RecipeRegistry.isIngr1(id, data) || Recipes.getFurnaceRecipeResult(id, "iron") ? true : false;
         }
      },
      "ingredient2": {
         type: "slot",
         x: 600,
         y: 140,
         isValid: function(id, count, data) {
            return RecipeRegistry.isIngr2(id, data)
         }
      },
      "ingredient3": {
         type: "slot",
         x: 680,
         y: 170,
         isValid: function(id, count, data) {
            return RecipeRegistry.isIngr3(id, data)
         }
      },
      //"text": { type: "text", x: 400, y: 100, width: 100, height: 30, text: "RF" },
      "slotCapacitor": { type: "slot", x: 325, y: 320 },
      "textInstall": { type: "text", font: { size: 20, color: Color.YELLOW }, x: 325, y: 50, width: 100, height: 30, text: "" },
      "resultSlot": { type: "slot", x: 600, y: 320 },
      "changeMode": {
         type: "button",
         x: 787,
         y: 300,
         bitmap: "alloy0",
         scale: 2.2,
         clicker: {
            onClick: function(container, tile) {
               tile.data.progress = 0;
               tile.data.work_time = 0;
               tile.data.mode = (tile.data.mode + 1) % 2;
            }
         }
      }
   }
});
Callback.addCallback("PreLoaded", function() {
   Recipes.addFurnace(ItemID.dustLapis, VanillaItemID.lapis_lazuli, 0);
   Recipes.addFurnace(ItemID.dustQuarzt, VanillaItemID.quartz, 0);
   RecipeRegistry.addSmelter({
      ingredient1: { id: ItemID.dustQuarzt, data: 0, count: 1 },
      ingredient2: { id: 0, data: 0 },
      ingredient3: { id: 0, data: 0, count: 0 },
      result: { id: VanillaItemID.quartz, count: 1, data: 0 },
      time: 120
   });
   RecipeRegistry.addSmelter({
      ingredient1: { id: ItemID.dustLapis, data: 0, count: 1 },
      ingredient2: { id: 0, data: 0 },
      ingredient3: { id: 0, data: 0, count: 0 },
      result: { id: VanillaItemID.lapis_lazuli, count: 1, data: 0 },
      time: 120
   });
   RecipeRegistry.addSmelter({
      ingredient1: { id: 331, data: 0, count: 1 },
      ingredient2: { id: 265, data: 0 },
      ingredient3: { id: 0, data: 0, count: 0 },
      result: { id: ItemID.conductiveIron, count: 1, data: 0 },
      time: 250
   });
   RecipeRegistry.addSmelter({
      ingredient1: { id: VanillaItemID.gold_ingot, data: 0, count: 1 },
      ingredient2: { id: VanillaBlockID.soul_sand, data: 0 },
      ingredient3: { id: 0, data: 0, count: 0 },
      result: { id: ItemID.soularium, count: 1, data: 0 },
      time: 250
   });
   /*
     RecipeRegistry.addSmelter({
       ingredient1: { id: 331, data: 0, count: 1 },
       ingredient2: { id: 265, data: 0 },
       ingredient3: { id: 0, data: 0, count: 0 },
       result: { id: ItemID.conductiveIron, count: 1, data: 0 },
       time: 500
     });*/
   RecipeRegistry.addSmelter({
      ingredient1: { id: 266, data: 0, count: 1 },
      ingredient2: { id: 331, data: 0 },
      ingredient3: { id: 348, data: 0, count: 1 },
      result: { id: ItemID.energeticAlloy, count: 1, data: 0 },
      time: 250
   });
   RecipeRegistry.addSmelter({
      ingredient1: { id: ItemID.energeticAlloy, data: 0, count: 1 },
      ingredient2: { id: 368, data: 0 },
      ingredient3: { id: 0, data: 0, count: 0 },
      result: { id: ItemID.vibrantAlloy, count: 1, data: 0 },
      time: 280
   });
   RecipeRegistry.addSmelter({
      ingredient1: { id: 265, data: 0, count: 1 },
      ingredient2: { id: 368, data: 0 },
      ingredient3: { id: 0, data: 0, count: 0 },
      result: { id: ItemID.pulsatingIron, count: 1, data: 0 },
      time: 250
   });
   RecipeRegistry.addSmelter({
      ingredient1: { id: VanillaItemID.iron_ingot, data: 0, count: 1 },
      ingredient2: { id: ItemID.dustCoal, data: 0 },
      ingredient3: { id: 49, data: 0, count: 1 },
      result: { id: ItemID.darkSteel, count: 1, data: 0 },
      time: 500
   });
   RecipeRegistry.addSmelter({
      ingredient1: { id: VanillaItemID.iron_ingot, data: 0, count: 1 },
      ingredient2: { id: ItemID.dustCoal, data: 0 },
      ingredient3: { id: ItemID.silicon, data: 0, count: 1 },
      result: { id: ItemID.electricalSteel, count: 1, data: 0 },
      time: 250
   });
   RecipeRegistry.addSmelter({
      ingredient1: { id: 331, data: 0, count: 1 },
      ingredient2: { id: ItemID.silicon, data: 0 },
      ingredient3: { id: 0, data: 0, count: 0, count: 1 },
      result: { id: ItemID.redstoneAlloy, count: 1, data: 0 },
      time: 250
   });
   // Under 1.12 PC/No have Machine Addon
   /*
   Recipes.addShaped({ id: BlockID.alloySmelter, count: 1, data: 0 }, [
       	"ifi",
       	"fmf",
   	   "ici"
     ], ['i', 265, 0, 'f', 61, 0, "m", BlockID.machineChassi, 0, "c", 380, 0]);
    */
   // Machine Addon :>
   Recipes.addShaped({ id: BlockID.alloySmelter, count: 1, data: 0 }, [
    	"i i",
    	"amf",
	   "c c"
  ], ['i', ItemID.darkSteel, 0, 'f', BlockID.simpleAlloySmelter, 0, "m", BlockID.machineChassi, 0, "c", ItemID.darkSteelGear, 0, "a", BlockID.simplePoweredFurnace, 0]);
});
MachineRegistry.registerElectricMachine(BlockID.alloySmelter, {
   defaultValues: {
      power_tier: 2,
      progress: 0,
      mode: 0,
      work_time: 0,
      speed: 1,
      energy_consumption: 30,
      energy_storage: 100000,
      isActive: false
   },
   oldValues: {
      speed: 1,
      energy_consumption: 30,
      energy_storage: 100000
   },

   upgrades: ["capacitor"],

   getTier: function() {
      return this.data.power_tier;
   },

   getGuiScreen: function() {
      return smelterGUI;
   },

   alloy: function() {
      let ingredient1 = this.container.getSlot("ingredient1");
      let ingredient2 = this.container.getSlot("ingredient2");
      let ingredient3 = this.container.getSlot("ingredient3");
      let resultSlot = this.container.getSlot("resultSlot");

      let newActive = false;
      for (let i in RecipeRegistry.smelter) {
         var Recipe = RecipeRegistry.smelter[i];
         var ingri1 = Recipe.ingredient1;
         var ingri2 = Recipe.ingredient2;
         var ingri3 = Recipe.ingredient3;
         var time = Recipe.time
         var result = Recipe.result

         if ((ingredient1.id == ingri1.id && (ingredient1.data == ingri1.data || ingredient1.data == 0) && (ingredient1.count >= ingri1.count || ingredient1.count >= 1)) &&
            (ingredient2.id == ingri2.id && (ingredient2.data == ingri2.data || ingredient2.data == 0) && ingredient2.count >= 1) &&
            (ingredient3.id == ingri3.id && (ingredient3.data == ingri3.data || ingredient3.data == 0) && (ingredient3.count >= ingri3.count || ingredient3.count >= 1))) {
            this.data.work_time = time;

            if ((resultSlot.id == result.id && resultSlot.count <= 64 - result.count && (!resultSlot || resultSlot.data == result.data)) || (resultSlot.id == 0)) {

               if (this.data.energy >= this.data.energy_consumption) {
                  this.data.energy -= this.data.energy_consumption;
                  this.data.progress += this.data.speed;
                  for (var i = 0; i < 4; i++) {
                     Particles.addParticle(Native.ParticleType.flame, this.x + Math.random(), this.y + 0.5, this.z + Math.random(), 0, 0, 0);
                  }
                  newActive = true;
               } else {
                  this.data.progress = 0;
               }
               /*
               Particles.addFarParticle(Native.ParticleType.smoke, this.x + .5, this.y + 1.1, this.z + .5)
               Particles.addFarParticle(Native.ParticleType.flame, this.x + .5, this.y + 1.1, this.z + .5)
               */
               if (this.data.progress >= this.data.work_time) {
                  resultSlot.id = result.id;
                  resultSlot.data = result.data;
                  resultSlot.count += result.count;
                  ingredient1.count -= ingri1.count;
                  ingredient2.count--;
                  ingredient3.count -= ingri3.count;
                  this.container.validateAll();
                  this.data.progress = 0;
               }
            }
         }

         if (!newActive) {
            // this.stopPlaySound(true);
            this.setActive(newActive);
         }
         this.container.setScale("progressScale0", this.data.progress / this.data.work_time || 0);
         this.container.setScale("progressScale1", this.data.progress / this.data.work_time || 0);
      }

   },

   furnace: function() {
      let ingredient1 = this.container.getSlot("ingredient1");
      let ingredient2 = this.container.getSlot("ingredient2");
      let ingredient3 = this.container.getSlot("ingredient3");
      let result = this.container.getSlot("resultSlot");
      let rec = Recipes.getFurnaceRecipeResult(ingredient1.id, "iron");

      let newActive = false;
      if (rec) {
         if ((result.id == rec.id && result.data == rec.data && result.count <= 64 || result.id == 0)) {
            this.data.work_time = 100
            if (this.data.energy >= this.data.energy_consumption) {

               this.data.energy -= this.data.energy_consumption;
               this.data.progress += this.data.speed;
               newActive = true;
            }
            if (this.data.progress >= 100) {
               result.id = rec.id;
               result.data = rec.data;
               result.count++;
               this.data.progress = 0;
               ingredient1.count--;
               this.container.validateAll();
            }
         }
      } else {
         this.data.progress = 0;
      }
      if (!newActive) {
         // this.stopPlaySound(true);
         this.setActive(newActive);
      }
      this.container.setScale("progressScale0", this.data.progress / 100 || 0);
      this.container.setScale("progressScale1", this.data.progress / 100 || 0);
   },

   resetValues: function() {
      this.data.energy_storage = this.oldValues.energy_storage;
      this.data.energy_consumption = this.oldValues.energy_consumption;
      this.data.speed = this.oldValues.speed;
   },

   tick: function() {
      this.resetValues();
      UpgradeAPI.executeUpgrades(this);

      let capacitor = this.container.getSlot("slotCapacitor");
      for (let i in capacitorObj) {
         if (capacitor.id == capacitorObj[i]) {
            this.container.setText("textInstall", "Installed");

            if (this.data.mode === 0) this.alloy();
            if (this.data.mode === 1) this.furnace();
         } else if (capacitor.id != capacitorObj[i]) {
            this.container.setText("textInstall", "Please put Capacitor in slot capacitor to install function for machine");
         }
      }


      // if (this.data.mode === 2) {
      // this.furnace();
      // this.alloy();
      // }

      if (this.container.getGuiContent()) {
         this.container.getGuiContent().elements["changeMode"].bitmap = "alloy" + this.data.mode;
      }


      var energyStorage = this.getEnergyStorage();
      this.data.energy = Math.min(this.data.energy, energyStorage);
      this.container.setScale("energyScale", this.data.energy / energyStorage);
      //this.container.setText("text", this.data.energy + "/" + energyStorage);
   },
   getEnergyStorage: function() {
      return this.data.energy_storage;
   }
});
StorageInterface.createInterface(BlockID.alloySmelter, {
   slots: {
      "ingredient1": {
         input: true,
         isValid: function(item, side, tileEntity) {
            return RecipeRegistry.isIngr1(item.id, item.data) || Recipes.getFurnaceRecipeResult(item.id, "iron") ? true : false;
         }
      },
      "ingredient2": {
         input: true,
         isValid: function(item, side, tileEntity) {
            return RecipeRegistry.isIngr2(item.id, item.data);
         }
      },
      "ingredient3": {
         input: true,
         isValid: function(item, side, tileEntity) {
            return RecipeRegistry.isIngr3(item.id, item.data);
         }
      },
      "resultSlot": { output: true }
   }
});




// file: Base/Blocks/Machine/./killer.js

IDRegistry.genBlockID("killerJoe");
Block.createBlock("killerJoe", [{ "name": "Killer Joe", "texture": [["machineBottom", 0]], "inCreative": true }]);

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
setKillerJoeRender()

Block.setBlockShape(BlockID.killerJoe, { "x": 0, "y": 0, "z": 0 }, { "x": 1, "y": 1, "z": 1 });

var guiKillerJoe = new UI.StandartWindow({
  standart: {
    header: { text: { text: "Killer Joe" } },
    inventory: { standart: true },
    background: { standart: true }
  },

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

var SWORD_DAMAGE = {
  "267": 6,
  "268": 4,
  "272": 5,
  "276": 7,
  "283": 4,
  "VanillaItemID.netherite_sword": 9
}

var MOBS = [Native.EntityType.BAT, Native.EntityType.CHICKEN, Native.EntityType.COW, Native.EntityType.MUSHROOM_COW, Native.EntityType.OCELOT, Native.EntityType.PIG, Native.EntityType.RABBIT, Native.EntityType.SHEEP, Native.EntityType.SNOW_GOLEM, Native.EntityType.SQUID, Native.EntityType.VILLAGER, Native.EntityType.WOLF, 23, 24, 25, 26, 27, Native.EntityType.BLAZE, Native.EntityType.CAVE_SPIDER, Native.EntityType.CREEPER, Native.EntityType.ENDERMAN, Native.EntityType.GHAST, Native.EntityType.IRON_GOLEM, Native.EntityType.LAVA_SLIME, Native.EntityType.PIG_ZOMBIE, Native.EntityType.SILVERFISH, Native.EntityType.SKELETON, Native.EntityType.SLIME, Native.EntityType.SPIDER, Native.EntityType.ZOMBIE, Native.EntityType.ZOMBIE_VILLAGER, 45, 46, 47, 48, 49, 52, 55];



TileEntity.registerPrototype(BlockID.killerJoe, {
  getGuiScreen: function() {
    return guiKillerJoe;
  },
  init: function() {
    this.liquidStorage.setLimit("nutrientDistillation", 16);
  },
  tick: function() {
    this.liquidStorage.updateUiScale("liquidScale", this.liquidStorage.getLiquidStored());
    let storage = this.liquidStorage;
    let liquid = storage.getLiquidStored();
    let slot0 = this.container.getSlot("slotLiquid0");
    let slot1 = this.container.getSlot("slotLiquid1");
    let slotSword = this.container.getSlot("slotSword");

    if (slot0.id == ItemID.bucketNutrient_distillation && storage.getAmount("nutrientDistillation") < 16 && (slot1.id == 325 && slot1.count < 16 || slot1.id == 0)) {
      slot1.id = 325
      slot1.count++
      slot0.count--;
      this.container.validateAll();
      storage.addLiquid("nutrientDistillation", 1);
    }

    if (slotSword.data >= Item.getMaxDamage(slotSword.id)) {
      slotSword.id = 0;
    }

    if (slotSword.id > 0) {
      var dataTool = ToolAPI.getToolData(slotSword.id);
      if (dataTool) {
        var damageTool = dataTool.damage + dataTool.toolMaterial.damage;
        if (damageTool > 0) {
          for (i in MOBS) {
            let ent = Entity.findNearest({ x: this.x, y: this.y, z: this.z }, MOBS[i], 7);
            if (ent && storage.getAmount("nutrientDistillation") >= 0.02 && World.getThreadTime() % 10 == 0) {
              Entity.damageEntity(ent, damageTool);
              slotSword.data++;
              storage.getLiquid("nutrientDistillation", 0.025);
            }
          }
        }
      }
    }
  }
});


Callback.addCallback("PreLoaded", function() {
  Recipes.addShaped({ id: BlockID.killerJoe, count: 1, data: 0 }, [
    	"sss",
    	"qzq",
	   "qqq"
  ], ['s', ItemID.darkSteel, 0, 'q', 20, 0, "z", ItemID.skullZombieController, 0]);
});




// file: Base/Blocks/Machine/./tank.js

IDRegistry.genBlockID("eioTank");
Block.createBlock("eioTank", [
   { name: "Fluid Tank", texture: [["basic_tank", 0]], inCreative: true }
], "machine");
ICRender.getGroup("liquid_pipe").add(BlockID.eioTank, -1);
Item.registerNameOverrideFunction(BlockID.eioTank, function(item, name) {
   if (item.extra) {
      let name_fluid = item.extra.getString("fluid")
      let amount_fluid = item.extra.getInt("amount")
      return name + "\n§7" + Translation.translate("Liquid: ") + name_fluid + "\n§7" + Translation.translate("Amount: ") + "§a" + amount_fluid * 1000 + " mB";
   }
});
let EIOTank = {
   setStoragePlaceFunction: function(id) {

      Block.registerPlaceFunction(BlockID[id], function(coords, item, block) {
         var place = World.canTileBeReplaced(block.id, block.data) ? coords : coords.relative;
         World.setBlock(place.x, place.y, place.z, item.id, 0);
         World.playSound(place.x, place.y, place.z, "dig.stone", 1, 0.8)
         var tile = World.addTileEntity(place.x, place.y, place.z);
         if (item.extra) {
            let name_fluid = item.extra.getString("fluid")
            let amount_fluid = item.extra.getInt("amount")
            if (amount_fluid > 0) {
               tile.liquidStorage.addLiquid(name_fluid, amount_fluid);
            }
         }
      });
   }
}

Callback.addCallback("PreLoaded", function() {
   Recipes.addShaped({ id: BlockID.eioTank, count: 1, data: 0 }, [
      	"iri",
      	"rmr",
	     "iri"
    ], ['i', VanillaItemID.iron_ingot, 0, "r", VanillaTileID.iron_bars, 0, "m", VanillaBlockID.glass, -1
  ]);
});
var guiTank = new UI.StandartWindow({
   standart: {
      header: { text: { text: Translation.translate("Fluid Tank") } },
      inventory: { standart: true },
      background: { standart: true }
   },

   drawing: [
      { type: "bitmap", x: 611, y: 88, bitmap: "liquid_bar", scale: GUI_SCALE },
	],

   elements: {
      "liquidScale": { type: "scale", x: 400 + 70 * GUI_SCALE, y: 50 + 16 * GUI_SCALE, direction: 1, value: 0.5, bitmap: "gui_water_scale", overlay: "gui_liquid_storage_overlay", scale: GUI_SCALE },
      "slotLiquid1": {
         type: "slot",
         x: 400 + 94 * GUI_SCALE,
         y: 50 + 16 * GUI_SCALE,
         isValid: function(id, count, data) {
            return (LiquidRegistry.getFullItem(id, data, "water") || LiquidLib.getEmptyItem(id, data)) ? true : false;
         }
      },
      "slotLiquid2": { type: "slot", x: 470 + 94 * GUI_SCALE, y: 50 + 16 * GUI_SCALE },
      "slotOut": { type: "slot", x: 400 + 94 * GUI_SCALE, y: 50 + 40 * GUI_SCALE, isValid: function() { return false; } },

   }
});

StorageInterface.createInterface(BlockID.eioTank, {
   slots: {
      "slotLiquid1": { input: true },
      "slotLiquid2": { input: true },
      "slotOut": { output: true }
   },
   isValidInput: function(item) {
      return LiquidRegistry.getFullItem(item.id, item.data, "water") || LiquidLib.getEmptyItem(item.id, item.data);
   },
   canReceiveLiquid: function(liquid, side) { return true; },
   canTransportLiquid: function(liquid, side) { return true; }
});

MachineRegistry.registerPrototype(BlockID.eioTank, {


   getGuiScreen: function() {
      return guiTank;
   },

   init: function() {
      this.liquidStorage.setLimit(null, 16);
   },


   getLiquidFromItem: MachineRegistry.getLiquidFromItem,
   addLiquidToItem: MachineRegistry.addLiquidToItem,


   click: function(id, count, data, coords) {
      if (Entity.getSneaking(Player.get())) {
         var liquid = this.liquidStorage.getLiquidStored();
         return this.getLiquidFromItem(liquid, { id: id, count: count, data: data }, null, true);
      } else if (Entity.getSneaking(Player.get()) && id == ItemID.itemYetaWrench) {
         var extra;
         var liquid = this.liquidStorage.getLiquidStored()
         if (liquid) {
            extra = new ItemExtraData();
            extra.putString("fluid", liquid);
            extra.putInt("amount", this.liquidStorage.getAmount(liquid));
         }
         this.blockSource.spawnDroppedItem(this.x + .5, this.y + .5, this.z + .5, BlockID.eioTank, 1, 0);
         this.blockSource.destroyBlock(this.x, this.y, this.z, false);
      }
   },

   tick: function() {
      UpgradeAPI.executeUpgrades(this);

      var storage = this.liquidStorage;
      var liquid = storage.getLiquidStored();
      var slot1 = this.container.getSlot("slotLiquid1");
      var slot2 = this.container.getSlot("slotLiquid2");
      var out = this.container.getSlot("slotOut");
      this.getLiquidFromItem(liquid, slot1, out);
      if (liquid) {
         this.addLiquidToItem(liquid, slot2, out);
      }
      this.liquidStorage.updateUiScale("liquidScale", this.liquidStorage.getLiquidStored());
   },
   destroyBlock: function(coords, player) {
      var extra;
      var liquid = this.liquidStorage.getLiquidStored()
      if (liquid) {
         extra = new ItemExtraData();
         extra.putString("fluid", liquid);
         extra.putInt("amount", this.liquidStorage.getAmount(liquid));
         //alert(extra);
      }
      World.drop(coords.x + .5, coords.y + .5, coords.z + .5, BlockID.eioTank, 1, 0, extra);
      //debug;

   }

});

EIOTank.setStoragePlaceFunction("eioTank");




// file: Base/Blocks/Machine/./Crafter.js

// Helper (From Factory Craft)
MachineRegistry.machineContainer = {
  addItemToContainer: function(container, item, size, prefix, index) {
    if (!size) { s = 28 } else { s = size }!prefix ? prefix = "" : null;
    for (var index = index ? index : 1; index <= s; index++) {
      var slot = container.getSlot("slot" + prefix + index);
      if ((slot.id == item.id && slot.data == item.data) || slot.id == 0) {
        if (slot.count <= Item.getMaxStack(item.id)) {
          var maxcount = Item.getMaxStack(item.id) - slot.count;
          if (item.count <= maxcount) {
            container.setSlot("slot" + prefix + index, item.id, slot.count + item.count, item.data);
            container.validateAll();
            return false
          }
          if (item.count > maxcount) {
            container.setSlot("slot" + prefix + index, item.id, slot.count + maxcount, item.data);
            container.validateAll();
            item.count -= maxcount;
          }
        }
      }
    }
    return item.count
  },
  isItemInContainer: function(container, item, size, prefix, index) {
    if (!size) { s = 28 } else { s = size }!prefix ? prefix = "" : null;
    for (var index = index ? index : 1; index <= s; index++) {
      var slot = container.getSlot("slot" + prefix + index);
      if (slot.id == item.id && (slot.data == item.data || item.data == -1)) {
        item.count = Math.max(item.count - slot.count, 0)
      }
    }
    if (item.count == 0) return true
    return false
  },
  giveItemFromContainer: function(container, item, size, prefix, index) {
    if (!size) { s = 28 } else { s = size }!prefix ? prefix = "" : null;
    for (var index = index ? index : 1; index < s; index++) {
      var slot = container.getSlot("slot" + prefix + index);
      if (slot.id == item.id && (slot.data == item.data || item.data == -1)) {
        if (slot.count >= item.count) {
          container.setSlot("slot" + prefix + index, item.id, slot.count - item.count, item.data);
          container.validateAll();
          return true
        }
        if (slot.count < item.count) {
          item.count -= slot.count;
          container.setSlot("slot" + prefix + index, item.id, 0, item.data);
          container.validateAll();
        }
      }
    }
    return false
  }
}

// 
IDRegistry.genBlockID("crafter");
Block.createBlockWithRotation("crafter", [
  {
    name: "Crafter",
    texture: [
	   ["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["block_crafter_solid", 0], ["machineSide", 0], ["machineSide", 0]
	 ],
    inCreative: true
  }
], "opaque");

var craftUI = new UI.StandartWindow({
  standart: {
    header: { text: { text: "Crafter" } },
    background: { color: android.graphics.Color.parseColor("#b3b3b3") },
    inventory: { standart: true }
  },
  drawing: [
    { type: "bitmap", x: 120, y: -160, bitmap: "backgroundCrafter", scale: 2.4 },
	  ],
  elements: {
  	
    "textInstall": { type: "text", font: { size: 20, color: Color.YELLOW }, x: 325, y: 50, width: 100, height: 30, text: "" },
    "energyScale": { type: "scale", x: 297, y: 85, direction: 1, bitmap: "redflux_bar1", scale: 3.2 },
    // Capacitor
    "slotCapacitor": { type: "slot", x: 297, y: 298, size: 52, bitmap: "empty" },
    // Input
    "slot0": { type: "slot", x: 377, y: 146, size: 60, bitmap: "empty" },
    "slot1": { type: "slot", x: 437, y: 146, size: 60, bitmap: "empty" },
    "slot2": { type: "slot", x: 497, y: 146, size: 60, bitmap: "empty" },

    "slot3": { type: "slot", x: 377, y: 206, size: 60, bitmap: "empty" },
    "slot4": { type: "slot", x: 437, y: 206, size: 60, bitmap: "empty" },
    "slot5": { type: "slot", x: 497, y: 206, size: 60, bitmap: "empty" },

    "slot6": { type: "slot", x: 377, y: 266, size: 60, bitmap: "empty" },
    "slot7": { type: "slot", x: 437, y: 266, size: 60, bitmap: "empty" },
    "slot8": { type: "slot", x: 497, y: 266, size: 60, bitmap: "empty" },

    "slotInput": {
      type: "slot",
      x: 575,
      y: 207,
      size: 60,
      bitmap: "empty",
      clicker: {
        onClick: function(position, container, tileEntity) {
          return;
        },
        onLongClick: function(position, container, tileEntity) {
          this.onClick(position, container, tileEntity);
        }
      }
    },
    // Output
    "slotI1": { type: "slot", x: 654, y: 146, size: 60, bitmap: "empty" },
    "slotI2": { type: "slot", x: 714, y: 146, size: 60, bitmap: "empty" },
    "slotI3": { type: "slot", x: 774, y: 146, size: 60, bitmap: "empty" },
    "slotI4": { type: "slot", x: 654, y: 206, size: 60, bitmap: "empty" },
    "slotI5": { type: "slot", x: 714, y: 206, size: 60, bitmap: "empty" },
    "slotI6": { type: "slot", x: 774, y: 206, size: 60, bitmap: "empty" },
    "slotI7": { type: "slot", x: 654, y: 266, size: 60, bitmap: "empty" },
    "slotI8": { type: "slot", x: 714, y: 266, size: 60, bitmap: "empty" },
    "slotI9": { type: "slot", x: 774, y: 266, size: 60, bitmap: "empty" },

    "slotResult": { type: "slot", x: 852, y: 207, size: 60, bitmap: "empty" },
  }
});

MachineRegistry.registerElectricMachine(BlockID.crafter, {

  defaultValues: {
    importItems: [{ id: 0, data: 0, extra: null }, { id: 0, data: 0, extra: null }, { id: 0, data: 0, extra: null }, { id: 0, data: 0, extra: null }, { id: 0, data: 0, extra: null }, { id: 0, data: 0, extra: null }, { id: 0, data: 0, extra: null }, { id: 0, data: 0, extra: null }, { id: 0, data: 0, extra: null }],
    power_tier: 2,
    progress: 0,
    speed: 1,
    energy_consumption: 125,
    energy_storage: 100000,
    work_time: 20,
    isActive: false
  },
  oldValues: {
    speed: 1,
    energy_consumption: 125,
    energy_storage: 100000
  },

  upgrades: ["capacitor"],

  getGuiScreen: function() {
    return craftUI;
  },

  getTier: function() {
    return this.data.power_tier;
  },

  resetValues: function() {
    this.data.energy_storage = this.oldValues.energy_storage;
    this.data.energy_consumption = this.oldValues.energy_consumption;
    this.data.speed = this.oldValues.speed;
  },
  
  MachineRun: function(){
  	    let newActive = false;
  	    var res = Recipes.getRecipeResult(this.container);
    if (res) {
      this.container.setSlot("slotInput", res.id, res.count, res.data);
    } else {
      this.container.setSlot("slotInput", 0, 0, 0);
    }

    var resultSlot = this.container.getSlot("slotResult");

    var craft = this.canCraft();

    if (craft && res && this.data.energy >= 5 && ((res.id == resultSlot.id && res.data == resultSlot.data && resultSlot.count < 64 - res.count) || resultSlot.id == 0)) {
      newActive = true;
      this.data.energy -= 5;
      this.data.progress++;
      if (this.data.progress >= this.data.work_time) {
        resultSlot.id = res.id;
        resultSlot.data = res.data;
        resultSlot.count += res.count;

        for (var i in craft) {
          var it = craft[i];
          MachineRegistry.machineContainer.giveItemFromContainer(this.container, { id: it.id, data: it.data, count: it.count }, 11, "I");
        }

        this.container.validateAll();
        this.data.progress = 0;
      }

    } else {
      this.data.progress = 0;
    }
    if (!newActive) {
      // this.stopPlaySound(true);
      this.setActive(newActive);
    }
    
  },
  
  tick: function() {
    this.resetValues();
    UpgradeAPI.executeUpgrades(this);

    /*
    for (var k in this.data.importItems) {
      var importItem = this.data.importItems[k];
      if (importItem.id == 0) continue;
      var slotItem = this.container.getSlot('slot_output' + k);
      var item = { id: importItem.id, count: importItem.count - slotItem.count, data: this.data.useDamage ? importItem.data : -1, extra: this.data.useNbt ? importItem.extra : -1 };
      if (item.count <= 0 || (slotItem.id != importItem.id && slotItem.id != 0) || (slotItem.data != importItem.data && this.data.useDamage) || (slotItem.extra != importItem.extra && this.data.useNbt)) continue;
      var deleted = this.deleteItem(item);
      if (deleted < item.count) {
        var count = item.count - deleted;
        this.container.setSlot('slot_output' + k, item.id, slotItem.count + count, item.data, item.extra);
      }
    }
    */
    let capacitor = this.container.getSlot("slotCapacitor");
    for (let i in capacitorObj) {
      if (capacitor.id == capacitorObj[i]) {
    	this.container.setText("textInstall", "Installed");
       this.MachineRun();

      } else {
        this.container.setText("textInstall", "Please put Capacitor in slot capacitor to install function for machine");
      }
    }
    
    this.container.setScale("progressScale", this.data.progress / this.data.work_time);


    var energyStorage = this.getEnergyStorage();
    this.data.energy = Math.min(this.data.energy, energyStorage);
    this.container.setScale("energyScale", this.data.energy / energyStorage);

    this.container.setText("text", "RF: " + this.data.energy + "/" + energyStorage);

  },
  canCraft: function() {
    var ingredients = {}
    for (var i = 0; i < 9; i++) {
      var slot = this.container.getSlot("slot" + i);
      if (slot.id != 0) ingredients[slot.id + ":" + slot.data] = { id: slot.id, data: slot.data, count: this.getNativeCount(slot.id, slot.data) }
      if (slot.id != 0 && !MachineRegistry.machineContainer.isItemInContainer(this.container, { id: slot.id, data: slot.data, count: this.getNativeCount(slot.id, slot.data) }, 11, "I")) return false;
    }
    return ingredients;
  },

  getNativeCount: function(id, data) {
    var count = 0;
    for (var i = 0; i < 9; i++) {
      var slot = this.container.getSlot("slot" + i);
      if (slot.id == id && slot.data == data) count++;
    }
    return count
  },

  getEnergyStorage: function() {
    return this.data.energy_storage;
  },

  destroy: function(coords, player) {
    this.container.clearSlot("slotInput");
  }

});


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




// file: Base/Blocks/Machine/./SAGmill.js

IDRegistry.genBlockID("sagmill");
Block.createBlockWithRotation("sagmill", [
   {
      name: "SAG Mill",
      texture: [
	   ["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["crusherFront", 0], ["machineSide", 0], ["machineSide", 0]
	 ],
      inCreative: true
  }
], "opaque");

TileRenderer.setStandartModel(BlockID.sagmill, [["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["crusherFront", 0], ["machineSide", 0], ["machineSide", 0]]);
TileRenderer.registerRotationModel(BlockID.sagmill, 0, [["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["crusherFront", 0], ["machineSide", 0], ["machineSide", 0]]);
TileRenderer.registerRotationModel(BlockID.sagmill, 4, [["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["crusherFrontOn", 0], ["machineSide", 0], ["machineSide", 0]]);

TileRenderer.setRotationPlaceFunction(BlockID.sagmill);

/*
ICRender.getGroup("bc-container").add(BlockID.sagmill, -1);
ICRender.getGroup("item-pipe").add(BlockID.sagmill, -1);

*/
var SAGGui = new UI.StandartWindow({
   standart: {
      header: { text: { text: "SAG Mill" } },
      inventory: { standart: true },
      background: { standart: true }
   },
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
            onClick: function(container, tile) {
               let percent = (tile.data.progress / tile.data.work_time) * 100
               if (percent) {
                  alert(percent.toFixed(1) + " %");
               } else {
                  alert("0 %");
               }
            },
            onLongClick: function() {
               RV && RV.openRecipePage("enderio_sag");
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
         clicker: {
            onClick: function(container, tile) {
               alert(tile.data.energy + " / " + tile.data.energy_storage + " RF");
            },
            onLongClick: function(container, tile) {
               alert("Energy Use: " + tile.data.energy_consumption + " RF/t")
            }
         }
      },
      "grindingScale": {
         type: "scale",
         x: 765,
         y: 165,
         direction: 1,
         value: 0.5,
         bitmap: "bar_silicon1",
         scale: 6.8,
         clicker: {
            onClick: function(container, tile) {
               let percent = (tile.data.durability / tile.data.maxDurability) * 100
               if (percent >= 0) {
                  alert(percent.toFixed(1) + " %");
               } else {
                  alert("0 %");
               }
            }
         }
      },

      "text": { type: "text", x: 400, y: 100, width: 100, height: 30, text: "RF" },
      "ingredient": {
         type: "slot",
         x: 602,
         y: 170,
         isValid: function(id, count, data) {
            return RecipeRegistry.getInCrusher(id, data);
         }
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

MachineRegistry.registerElectricMachine(BlockID.sagmill, {

   defaultValues: {
      power_tier: 2,
      progress: 0,
      speed: 1,
      energy_consumption: 30,
      energy_storage: 100000,
      work_time: 0,
      // new feature
      durability: 0,
      maxDurability: 1,
      sag_bonus: 0,
      main: 0,
      pwUse: 0,
      // debug
      DEBUG_CONSUMP: 0,

      isActive: false
   },
   oldValues: {
      speed: 1,
      energy_consumption: 20,
      energy_storage: 100000
   },

   upgrades: ["capacitor"],

   getGuiScreen: function() {
      return SAGGui;
   },

   getTier: function() {
      return this.data.power_tier;
   },

   resetValues: function() {
      this.data.energy_storage = this.oldValues.energy_storage;
      this.data.energy_consumption = this.oldValues.energy_consumption;
      this.data.speed = this.oldValues.speed;
   },

   MachineRun: function() {

      let input = this.container.getSlot("ingredient");
      let res0 = this.container.getSlot("result0");
      let res1 = this.container.getSlot("result1");
      let res2 = this.container.getSlot("result2");
      let res3 = this.container.getSlot("result3");
      let newActive = false;
      let grinding = this.container.getSlot("slotGrinding");
      // cơ chế mài bóng
      let grindingBall = GrindingBall.getBallID(grinding.id);
      if (grindingBall && this.data.durability == 0) {
         grinding.count--;
         this.data.maxDurability = this.data.durability = grindingBall.durability;
         this.data.main = grindingBall.main;
         this.data.sag_bonus = grindingBall.bonus;
         this.data.pwUse = grindingBall.use;
         this.container.validateAll();
      }

      if (this.data.durability <= 0) {
         this.data.durability = this.data.main = this.data.sag_bonus = this.data.pwUse = 0;
         this.data.maxDurability = 1;
      }
      
      for (let i in RecipeRegistry.crusher) {
         let recipe = RecipeRegistry.crusher[i];
         var time = recipe.time;
         var isGrinding = recipe.isGrinding;
         var ingredient = recipe.ingredient;
         var result0 = recipe.result0;
         var result1 = recipe.result1;
         var result2 = recipe.result2;
         var result3 = recipe.result3;
         var time = recipe.time;
         if ((input.id == ingredient.id && input.data == ingredient.data && input.count >= 1) && (
               ((res0.id == result0.id && res0.data == result0.data && res0.count < 64) || (res0.id == 0)) &&
               ((res1.id == result1.id && res1.data == result1.data && res1.count < 64) || (res1.id == 0)) &&
               ((res2.id == result2.id && res2.data == result2.data && res2.count < 64) || (res2.id == 0)) &&
               ((res3.id == result3.id && res3.data == result3.data && res3.count < 64) || (res3.id == 0)))) {
            this.data.work_time = time;
            if (isGrinding && this.data.durability > 0) {
               let pw_consump = Math.floor(this.data.energy_consumption * this.data.pwUse);
               if (this.data.energy >= pw_consump) {
                  //Particles.addParticle(Native.ParticleType.itemBreak, this.x, this.y + .75, this.z, 0, 0, 0)
                  newActive = true;
                  this.data.progress += this.data.speed;
                 //for (var i = 0; i < 4; i++) {
                  Particles.addParticle(Native.ParticleType.crit, this.x + Math.random(), this.y + 0.75, this.z + Math.random(), 0, 0, 0);
       //   }
                  this.data.energy -= pw_consump;
                  this.data.DEBUG_CONSUMP = pw_consump;
               } else {
                  this.data.progress = 0;
               }
               if (this.data.progress >= this.data.work_time) {
                  input.count--;
                  var outputRandom = (Math.random() * 1);
                  var countOutput = 1
                  if (Math.random() * 1 <= (this.data.main)) {
                     countOutput = 2;
                  }
                  if (outputRandom <= result0.chance) {
                     res0.id = result0.id;
                     res0.data = result0.data;
                     res0.count += countOutput;
                  }
                  if ((outputRandom * (1 * this.data.sag_bonus)) <= result1.chance) {
                     res1.id = result1.id;
                     res1.data = result1.data;
                     res1.count += countOutput;
                  }
                  if ((outputRandom * (1 * this.data.sag_bonus)) <= result2.chance) {
                     res2.id = result2.id;
                     res2.data = result2.data;
                     res2.count += countOutput;
                  }
                  if ((outputRandom * (1 * this.data.sag_bonus)) <= result3.chance) {
                     res3.id = result3.id;
                     res3.data = result3.data;
                     res3.count += countOutput;
                  }
                  this.container.validateAll();
                  this.data.progress = 0;
                  this.data.durability--;
               }
               if (!newActive)
                  // this.stopPlaySound(true);
                  this.setActive(newActive);
               this.container.setScale("progressScale", this.data.progress / this.data.work_time);
            } else if ((!isGrinding) || (isGrinding && this.data.durability < 1)) {
               if (this.data.energy >= this.data.energy_consumption) {
                  //Particles.addParticle(Native.ParticleType.itemBreak, this.x, this.y + .75, this.z, 0, 0, 0)
                  this.data.progress += this.data.speed;
                  Particles.addParticle(Native.ParticleType.crit, this.x + Math.random(), this.y + 0.75, this.z + Math.random(), 0, 0, 0);
                  this.data.energy -= this.data.energy_consumption;
                  newActive = true;
               } else {
                  this.data.progress = 0;
               }
               if (this.data.progress >= this.data.work_time) {
                  input.count--;
                  var outputRandom = Math.random() * 1;
                  if (outputRandom <= result0.chance) {
                     res0.id = result0.id;
                     res0.data = result0.data;
                     res0.count++;
                  }
                  if (outputRandom <= result1.chance) {
                     res1.id = result1.id;
                     res1.data = result1.data;
                     res1.count++;
                  }
                  if (outputRandom <= result2.chance) {
                     res2.id = result2.id;
                     res2.data = result2.data;
                     res2.count++;
                  }
                  if (outputRandom <= result3.chance) {
                     res3.id = result3.id;
                     res3.data = result3.data;
                     res3.count++;
                  }
                  this.container.validateAll();
                  this.data.progress = 0;
               }
               if (!newActive)
                  // this.stopPlaySound(true);
                  this.setActive(newActive);

               this.container.setScale("progressScale", this.data.progress / this.data.work_time);
            }
         }
      }

   },

   tick: function() {
      this.resetValues();
      UpgradeAPI.executeUpgrades(this);

      let capacitor = this.container.getSlot("slotCapacitor");
      for (let i in capacitorObj) {
         if (capacitor.id == capacitorObj[i]) {
            this.container.setText("textInstall", "Installed");
            this.MachineRun();
         } else {
            this.container.setText("textInstall", "Please put Capacitor in slot capacitor to install function for machine");
         }
      }
      let grindingDura = this.data.durability / this.data.maxDurability;
      var energyStorage = this.getEnergyStorage();
      this.data.energy = Math.min(this.data.energy, energyStorage);
      this.container.setScale("energyScale", this.data.energy / energyStorage);
      this.container.setScale("grindingScale", grindingDura.toFixed(1));

      this.container.setText("text", "RF: " + this.data.energy + "/" + energyStorage);

   },
   getEnergyStorage: function() {
      return this.data.energy_storage;
   }

});

Callback.addCallback("PreLoaded", function() {
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
	     " m "
  ], ['i', ItemID.darkSteel, 0, 'f', VanillaItemID.flint, 0, "m", BlockID.simplesagmill, 0, "p", BlockID.machineChassi, 0]);
   /*
   RecipeRegistry.addCrusher({
     ingredient: { id: BlockID.oreAluminum, data: 0 },
     result0: { id: ItemID.dustAluminum, data: 0, chance: 1 },
     result1: { id: ItemID.dustAluminum, data: 0, chance: 1 },
     result2: { id: 0, data: 0, chance: 0 },
     result3: { id: 4, data: 0, chance: 0.15 },
     time: 180
    
   });
   */
   RecipeRegistry.addCrusher({
      isGrinding: true,
      ingredient: { id: 49, data: 0 },
      result0: { id: ItemID.dustObsidian, data: 0, chance: 1 },
      result1: { id: ItemID.dustObsidian, data: 0, chance: 1 },
      result2: { id: ItemID.dustObsidian, data: 0, chance: 1 },
      result3: { id: ItemID.dustObsidian, data: 0, chance: 1 },
      time: 200,
      by: "EnderIO"
   });

   RecipeRegistry.addCrusher({
      isGrinding: true,
      ingredient: { id: VanillaBlockID.gold_ore, data: 0 },
      result0: { id: ItemID.dustGold, data: 0, chance: 1 },
      result1: { id: ItemID.dustGold, data: 0, chance: 1 },
      result2: { id: ItemID.dustSilver, data: 0, chance: 0.4 },
      result3: { id: ItemID.dustCopper, data: 0, chance: 0.2 },
      time: 180,
      by: "EnderIO"
   });

   RecipeRegistry.addCrusher({
      ingredient: { id: VanillaBlockID.iron_ore, data: 0 },
      result0: { id: ItemID.dustIron, data: 0, chance: 1 },
      result1: { id: ItemID.dustIron, data: 0, chance: 1 },
      result2: { id: ItemID.dustTin, data: 0, chance: 0.05 },
      result3: { id: ItemID.dustNickel, data: 0, chance: 1 },
      time: 180,
      isGrinding: true,
      by: "EnderIO"
   });

   RecipeRegistry.addCrusher({
      ingredient: { id: ItemID.pulsatingCrystal, data: 0 },
      result0: { id: ItemID.dustPulsating, data: 0, chance: 1 },
      result1: { id: 0, data: 0, chance: 0 },
      result2: { id: 0, data: 0, chance: 0 },
      result3: { id: 0, data: 0, chance: 0 },
      time: 180,
      isGrinding: false,
      by: "EnderIO"
   });

   RecipeRegistry.addCrusher({
      ingredient: { id: VanillaBlockID.coal_ore, data: 0 },
      result0: { id: 263, data: 0, chance: 1 },
      result1: { id: 263, data: 0, chance: 1 },
      result2: { id: 264, data: 0, chance: 0.01 },
      result3: { id: ItemID.dustCoal, data: 0, chance: 0.75 },
      time: 180,
      isGrinding: true,
      by: "EnderIO"
   });

   RecipeRegistry.addCrusher({
      ingredient: { id: VanillaBlockID.sand, data: 0 },
      result0: { id: ItemID.silicon, data: 0, chance: 0.5 },
      result1: { id: 0, data: 0, chance: 1 },
      result2: { id: 0, data: 0, chance: 1 },
      result3: { id: 0, data: 0, chance: 1 },
      time: 80,
      isGrinding: true,
      by: "EnderIO"
   });

   RecipeRegistry.addCrusher({
      ingredient: { id: 4, data: 0 },
      result0: { id: 13, data: 0, chance: 0.7 },
      result1: { id: 13, data: 0, chance: 0.3 },
      result2: { id: 12, data: 0, chance: 0.1 },
      result3: { id: 318, data: 0, chance: 0.05 },
      time: 180,
      isGrinding: true,
      by: "EnderIO"
   });

   RecipeRegistry.addCrusher({
      ingredient: { id: VanillaBlockID.quartz_ore, data: 0 },
      result0: { id: ItemID.dustQuarzt, data: 0, chance: 1 },
      result1: { id: ItemID.dustQuarzt, data: 0, chance: 0.75 },
      result2: { id: VanillaBlockID.netherrack, data: 0, chance: 0.9 },
      result3: { id: VanillaItemID.quartz, data: 0, chance: 0.5 },
      time: 180,
      isGrinding: true,
      by: "EnderIO"
   });

   RecipeRegistry.addCrusher({
      ingredient: { id: VanillaItemID.quartz, data: 0 },
      result0: { id: ItemID.dustQuarzt, data: 0, chance: 1 },
      result1: { id: ItemID.dustQuarzt, data: 0, chance: 0.1 },
      result2: { id: 0, data: 0, chance: 0 },
      result3: { id: 0, data: 0, chance: 0 },
      time: 100,
      isGrinding: false,
      by: "EnderIO"
   });

   RecipeRegistry.addCrusher({
      ingredient: { id: VanillaBlockID.lapis_ore, data: 0 },
      result0: { id: ItemID.dustLapis, data: 0, chance: 1 },
      result1: { id: ItemID.dustLapis, data: 0, chance: 0.75 },
      result2: { id: 4, data: 0, chance: 0.6 },
      result3: { id: VanillaItemID.lapis_lazuli, data: 0, chance: 0.5 },
      time: 180,
      isGrinding: true,
      by: "EnderIO"
   });

   RecipeRegistry.addCrusher({
      ingredient: { id: VanillaItemID.lapis_lazuli, data: 0 },
      result0: { id: ItemID.dustLapis, data: 0, chance: 1 },
      result1: { id: ItemID.dustLapis, data: 0, chance: 0.1 },
      result2: { id: 0, data: 0, chance: 0 },
      result3: { id: 0, data: 0, chance: 0 },
      time: 100,
      isGrinding: false,
      by: "EnderIO"
   });

   RecipeRegistry.addCrusher({
      ingredient: { id: 296, data: 0 },
      result0: { id: ItemID.dustWheat, data: 0, chance: 1 },
      result1: { id: VanillaItemID.wheat_seed, data: 0, chance: 0.45 },
      result2: { id: 0, data: 0, chance: 0 },
      result3: { id: 0, data: 0, chance: 0 },
      time: 100,
      isGrinding: true,
      by: "EnderIO"
   });

});

StorageInterface.createInterface(BlockID.sagmill, {
   slots: {
      "ingredient": { input: true },
      "result0": { output: true },
      "result1": { output: true },
      "result2": { output: true }
   },
   isValidInput: function(item) {
      return RecipeRegistry.getInCrusher(item.id, item.data);
   }
});




// file: Base/Blocks/Machine/./vat.js

IDRegistry.genBlockID("theVat");
Block.createBlock("theVat", [{ "name": "The Vat", "texture": [["machineBottom", 0]], "inCreative": true }]);
ICRender.getGroup("liquid_pipe").add(BlockID.theVat, -1);
function setVatRender() {
   var vatRender = new ICRender.Model();
   BlockRenderer.setStaticICRender(BlockID.theVat, 0, vatRender);
   var model = BlockRenderer.createModel();

   model.addBox(0 / 16, 0 / 16, 0 / 16, 16 / 16, 4 / 16, 16 / 16, "machineBottom", 0);
   model.addBox(9 / 16, 4 / 16, 0 / 16, 16 / 16, 16 / 16, 16 / 16, "machineBottom", 0);
   model.addBox(0 / 16, 4 / 16, 0 / 16, 7 / 16, 16 / 16, 16 / 16, "machineBottom", 0);
   model.addBox(7 / 16, 4 / 16, 4 / 16, 9 / 16, 11 / 16, 12 / 16, "machineBottom", 0);
   model.addBox(7 / 16, 8 / 16, 4 / 16, 9 / 16, 10 / 16, 18 / 16, "machineBottom", 0);
   model.addBox(7 / 16, 12 / 16, 4 / 16, 9 / 16, 14 / 16, 12 / 16, "machineBottom", 0);

   vatRender.addEntry(model);
}

Block.setBlockShape(BlockID.theVat, { "x": 0, "y": 0, "z": 0 }, { "x": 1, "y": 1, "z": 1 });

setVatRender();

var VatGUI = new UI.StandartWindow({
   standart: {
      header: { text: { text: "The Vat" } },
      inventory: { standart: true },
      background: { standart: true }
   },
   drawing: [
      { type: "bitmap", x: 350, y: -80, bitmap: "backgroundVat", scale: 3.4 },
  ],
   elements: {
      "energyScale": { type: "scale", x: 412, y: 143, direction: 1, bitmap: "redflux_bar1", scale: 2.8 },
      "slotCapacitor": {type: "slot", x: 398, y: 302, size: 60, bitmap: "empty"},
      "slotInput0": {
         type: "slot",
         x: 560,
         y: 140,
         size: 60,
         bitmap: "empty",
         isTransparentBackground: true,
         isValid: function(id, count, data) {
            return RecipeRegistry.getInVat1(id, data);
         }
      },
      "slotInput1": {
         type: "slot",
         x: 728,
         y: 140,
         size: 60,
         bitmap: "empty",
         isTransparentBackground: true,
         isValid: function(id, count, data) {
            return RecipeRegistry.getInVat2(id, data);
         }
      },
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
            onClick: function() {
               RV && RV.openRecipePage("enderio_vat");
            }
         }
      },
      "slot1": { type: "slot", x: 470, y: 320, size: 60, bitmap: "slot_fluid_full" },
      "slot3": { type: "slot", x: 820, y: 320, size: 60, bitmap: "slot_fluid_empty", },
      "slot2": { type: "slot", x: 470, y: 380, size: 60, bitmap: "slot_fluid_empty" },
      "slot4": { type: "slot", x: 820, y: 380, size: 60, bitmap: "slot_fluid_full" },
   }
});

StorageInterface.createInterface(BlockID.theVat, {
   slots: {
      "slotInput0": {
         input: true,
         isValid: function(item) {
            return RecipeRegistry.getInVat1(item.id, item.data);
         }
      },
      "slotInput1": {
         input: true,
         isValid: function(item) {
            return RecipeRegistry.getInVat2(item.id, item.data);
         }
      },
      "slot1": {
         input: true,
         isValid: function(item) {
            var empty = LiquidLib.getEmptyItem(item.id, item.data);
            if (!empty) return false;
            return RecipeRegistry.getLiquidVat1(empty.liquid);;
         }
      },
      "slot2": {
         output: true,
         isValid: function(item) {
            return item.id == VanillaItemID.bucket;
         }
      },
      "slot3": {
         input: true,
         isValid: function(item) {
            return item.id == VanillaItemID.bucket;
         }
      },
      "slot4": {
         output: true
         /*
                  isValid: function(item) {
                     var empty = LiquidLib.getEmptyItem(item.id, item.data);
                     if (!empty) return false;
                   return RecipeRegistry.getLiquidVat2(empty.liquid);;
                  }*/
      },

      canReceiveLiquid: function(liquid, side) { return true; },
      canTransportLiquid: function(liquid, side) { return true; }
   }
});


Callback.addCallback("PreLoaded", function() {

   Recipes.addShaped({ id: BlockID.theVat, count: 1, data: 0 }, [
         	"ici",
         	"rmr",
   	     "gfg"
       ], ['i', ItemID.electricalSteel, 0, 'c', 380, 0, "r", BlockID.eioTank, 0, 'f', VanillaBlockID.furnace, 0, "m", BlockID.machineChassi, 0, "g", ItemID.darkSteel, 0
     ]);

   RecipeRegistry.addVat({
      input1: { id: 296, data: 0 }, //wheat
      input2: { id: VanillaItemID.sugar, data: 0 }, //sugar
      inputLiquid: "water",
      inputAmount: 3,
      outputLiquid: "hootch",
      outputAmount: 0.75,
      time: 300
   });

   RecipeRegistry.addVat({
      input1: { id: VanillaItemID.poisonous_potato, data: 0 }, //poison potato
      input2: { id: VanillaItemID.sugar, data: 0 }, //sugar
      inputLiquid: "water",
      inputAmount: 8,
      outputLiquid: "hootch",
      outputAmount: 2,
      time: 300
   });

   RecipeRegistry.addVat({
      input1: { id: VanillaItemID.potato, data: 0 }, //potato
      input2: { id: VanillaItemID.sugar, data: 0 }, //sugar
      inputLiquid: "water",
      inputAmount: 4,
      outputLiquid: "hootch",
      outputAmount: 1,
      time: 300
   });

   RecipeRegistry.addVat({
      input1: { id: VanillaItemID.rotten_flesh, data: 0 }, //rotten_flesh
      input2: { id: VanillaItemID.sugar, data: 0 }, //sugar
      inputLiquid: "water",
      inputAmount: 1.5, //1500mb
      outputLiquid: "nutrientDistillation",
      outputAmount: 0.375, //375mb
      time: 300
   });

   RecipeRegistry.addVat({
      input1: { id: VanillaItemID.rotten_flesh, data: 0 }, //rotten_flesh
      input2: { id: VanillaItemID.fermented_spider_eye, data: 0 }, //fermented_spider_eye
      inputLiquid: "water",
      inputAmount: 3, //3000mb
      outputLiquid: "nutrientDistillation",
      outputAmount: 0.75, //750mb
      time: 300
   });

   RecipeRegistry.addVat({
      input1: { id: VanillaItemID.rotten_flesh, data: 0 }, //rotten_flesh
      input2: { id: 372, data: 0 }, //nether_wart
      inputLiquid: "water",
      inputAmount: 2.25, //3000mb
      outputLiquid: "nutrientDistillation",
      outputAmount: 0.5625, //5625mb
      time: 300
   });

   RecipeRegistry.addVat({
      input1: { id: 397, data: 0 }, //skull
      input2: { id: VanillaItemID.sugar, data: 0 }, //sugar
      inputLiquid: "water",
      inputAmount: 2, //2000mb
      outputLiquid: "nutrientDistillation",
      outputAmount: 0.5, //500mb
      time: 300
   });

   RecipeRegistry.addVat({
      input1: { id: 397, data: 0 }, //skull
      input2: { id: VanillaItemID.fermented_spider_eye, data: 0 }, //sugar
      inputLiquid: "water",
      inputAmount: 4, //4000mb
      outputLiquid: "nutrientDistillation",
      outputAmount: 1, //100mb
      time: 300
   });


   /*
     RecipeRegistry.addVat({
       input1: { id: 296, data: 0 },
       input2: { id: 353, data: 0 },
       liquidOut: { id: "hootch", count: 1 },
       liquidIn: { id: "water", count: 1 },
       time: 100
     });

     RecipeRegistry.addVat({
       input1: { id: 295, data: 0 },
       input2: { id: 353, data: 0 },
       liquidOut: { id: "hootch", count: 1 },
       liquidIn: { id: "water", count: 1 },
       time: 100
     });

     RecipeRegistry.addVat({
       input1: { id: 392, data: 0 },
       input2: { id: 353, data: 0 },
       liquidOut: { id: "hootch", count: 1 },
       liquidIn: { id: "water", count: 1 },
       time: 100
     });
     
       MachineRecipe.addVatRecipe([[363, 0], [376, 0]], {liquid: "nutrientDistillation", usedLiquid: "water"});
       MachineRecipe.addVatRecipe([[365, 0], [376, 0]], {liquid: "nutrientDistillation", usedLiquid: "water"});
       MachineRecipe.addVatRecipe([[319, 0], [376, 0]], {liquid: "nutrientDistillation", usedLiquid: "water"});
       MachineRecipe.addVatRecipe([[367, 0], [353, 0]], {liquid: "nutrientDistillation", usedLiquid: "water"});
       
       MachineRecipe.addVatRecipe([[296, 0], [353, 0]], {liquid: "hootch", usedLiquid: "water"});
       MachineRecipe.addVatRecipe([[295, 0], [353, 0]], {liquid: "hootch", usedLiquid: "water"});
       MachineRecipe.addVatRecipe([[392, 0], [353, 0]], {liquid: "hootch", usedLiquid: "water"});
       
       MachineRecipe.addVatRecipe([[377, 0], [331, 0]], {liquid: "fireWater", usedLiquid: "hootch"});
       
       MachineRecipe.addVatRecipe([[289, 0], [331, 0]], {liquid: "rocketFuel", usedLiquid: "hootch"});
       */
});


MachineRegistry.registerElectricMachine(BlockID.theVat, {
   defaultValues: {
      power_tier: 2,
      progress: 0,
      mode: 0,
      work_time: 0,
      speed: 1,
      energy_consumption: 30,
      energy_storage: 100000,
      isActive: false,

      // Liquid :>

      outputLiquid: null,
      inputLiquid: null,



   },
   oldValues: {
      speed: 1,
      energy_consumption: 30,
      energy_storage: 100000
   },

   upgrades: ["capacitor"],

   getTier: function() {
      return this.data.power_tier;
   },

   getGuiScreen: function() {
      return VatGUI;
   },

   getLiquidFromItem: MachineRegistry.getLiquidFromItem,
   addLiquidToItem: MachineRegistry.addLiquidToItem,

   resetValues: function() {
      this.data.energy_storage = this.oldValues.energy_storage;
      this.data.energy_consumption = this.oldValues.energy_consumption;
      this.data.speed = this.oldValues.speed;
   },

   init: function() {
      this.liquidStorage.setLimit(null, 10);
   },

   tick: function() {
      let ingredient1 = this.container.getSlot("slotInput0");
      let ingredient2 = this.container.getSlot("slotInput1");
      let threadTime = World.getThreadTime();

      for (var i in RecipeRegistry.theVat) {
         let recipe = RecipeRegistry.theVat[i];
         let input1 = recipe.input1;
         let input2 = recipe.input2;
         let liqIn = recipe.inputLiquid;
         let liqOut = recipe.outputLiquid;
         let amountIn = recipe.inputAmount;
         let amountOut = recipe.outputAmount;
         let time = recipe.time;
         let newActive = false;

         if ((ingredient1.id == input1.id && ingredient1.data == input1.data && ingredient1.count >= 1) &&
            (ingredient2.id == input2.id && ingredient2.data == input2.data && ingredient2.count >= 1)) {
            if ((this.data.inputLiquid == liqIn && this.liquidStorage.getAmount(this.data.inputLiquid) >= amountIn) &&
               (!this.data.outputLiquid || (this.data.outputLiquid == liqOut && this.liquidStorage.getAmount(this.data.outputLiquid) <= 10 - amountOut))) {
               this.data.work_time = time;
               if (this.data.energy >= this.data.energy_consumption) {
                  this.data.progress += this.data.speed;
                  this.data.energy -= this.data.energy_consumption;
                  newActive = true;
                  if (this.data.progress >= this.data.work_time) {
                     ingredient1.count -= 1;
                     ingredient2.count -= 1;
                     this.data.outputLiquid = liqOut;
                     this.liquidStorage.addLiquid(liqOut, amountOut);

                     this.liquidStorage.getLiquid(this.data.inputLiquid, amountIn);

                     this.container.validateAll();
                     this.data.progress = 0;
                  }
               } else {
                  this.data.progress = 0;
               }
            }
         }
         if (!newActive)
            // this.stopPlaySound(true);
            this.setActive(newActive);


         if (!this.data.inputLiquid || this.data.inputLiquid == recipe.inputLiquid && this.liquidStorage.getAmount(this.data.inputLiquid) <= 9) {
            var slot1 = this.container.getSlot("slot1");
            var slot2 = this.container.getSlot("slot2");
            this.getLiquidFromItem(recipe.inputLiquid, slot1, slot2);
            this.data.inputLiquid = recipe.inputLiquid
         }
         if (this.data.outputLiquid && this.liquidStorage.getAmount(this.data.outputLiquid) >= 1) {
            var slot3 = this.container.getSlot("slot3");
            var slot4 = this.container.getSlot("slot4");
            this.addLiquidToItem(this.data.outputLiquid, slot3, slot4);
         }
         if (this.liquidStorage.getAmount(this.data.outputLiquid) <= 0) {
            this.data.outputLiquid = null
         }

         if (this.liquidStorage.getAmount(this.data.inputLiquid) <= 0) {
            this.data.inputLiquid = null
         }

         this.liquidStorage.updateUiScale("liquidScale1", this.data.inputLiquid);
         this.liquidStorage.updateUiScale("liquidScale2", this.data.outputLiquid);
      }
      this.container.setScale("progressScale", (this.data.progress / this.data.work_time) || 0);

      var energyStorage = this.getEnergyStorage();
      this.data.energy = Math.min(this.data.energy, energyStorage);
      this.container.setScale("energyScale", this.data.energy / energyStorage);
   },

   getEnergyStorage: function() {
      return this.data.energy_storage;
   }

});




// file: Base/Blocks/Storage/./vibrant.js

IDRegistry.genBlockID("vibrantCapacitorBank");
Block.createBlockWithRotation("vibrantCapacitorBank", [
	{name: "Vibrant Capacitor Bank", texture: [["capacitorBankVibrant", 0], ["capacitorBankVibrant", 0], ["capacitorBankVibrant", 0], ["capacitorBankVibrantFront", 0], ["capacitorBankVibrant", 0], ["capacitorBankVibrant", 0]], inCreative: true}
], "opaque");

Callback.addCallback("PreLoaded", function(){
  Recipes.addShaped({id: BlockID.vibrantCapacitorBank, count: 1, data: 0}, [
    	"scs",
    	"crc",
	   "scs"
  ], ['s', ItemID.electricalSteel, 0, 'c', ItemID.octadicCapacitor, 0, "r", 152, 0]);
});
var VibrantUI = new UI.StandartWindow({
  standart: {
    header: {text: {text: "Vibrant Capacitor Bank" }},
    inventory: {standart: true},
    background: {standart: true}
  },
  drawing: [
    {type: "bitmap", x: 335, y: 140, bitmap: "redflux_bar0", scale: 3.2},
  ],
  elements: {
    "energyScale": {type: "scale", x: 335, y: 140, direction: 1, bitmap: "redflux_bar1", scale: 3.2},
    "textInfo": {type: "text", x: 500, y: 140, width: 350, height: 30, text: "0/"},
    "slotCharge0": {type: "slot", x: 480, y: 300, bitmap: "chargeSlot"},
    "slotCharge1": {type: "slot", x: 580, y: 300, bitmap: "chargeSlot"},
    "slotCharge2": {type: "slot", x: 680, y: 300, bitmap: "chargeSlot"},
    "slotCharge3": {type: "slot", x: 780, y: 300, bitmap: "chargeSlot"},
  }
});

MachineRegistry.registerRFStorage(BlockID.vibrantCapacitorBank, {
  defaultValues: {
    meta: 0
  },
  getGuiScreen: function(){
    return VibrantUI;
  },
  tick: function(){
    this.container.setScale("energyScale", this.data.energy/this.getEnergyStorage());
    this.container.setText("textInfo", this.data.energy+"/"+this.getEnergyStorage()+" RF");
    
    this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slotCharge0"), "RF", this.data.energy, 2048, 1);
    this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slotCharge1"), "RF", this.data.energy, 2048, 1);
    this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slotCharge2"), "RF", this.data.energy, 2048, 1);
    this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slotCharge3"), "RF", this.data.energy, 2048, 1);
  },
  getEnergyStorage: function(){
    return 25000000;
  },
  energyTick: function(type, src){
		var output = Math.min(1280, this.data.energy);
		this.data.energy += src.add(output) - output;
	},
	destroyBlock: function(coords, player) {
	  var extra;
	  if (this.data.energy > 0) {
	    extra = new ItemExtraData();
	    extra.putInt("energy", this.data.energy);
	  }
	  World.drop(coords.x + .5, coords.y + .5, coords.z + .5, BlockID.vibrantCapacitorBank, 1, 0, extra);
	}
});




// file: Base/Blocks/Storage/./normal.js





// file: Base/Blocks/Storage/./basic.js

IDRegistry.genBlockID("storageCapacitorBank");
Block.createBlockWithRotation("storageCapacitorBank", [
	{name: "Basic Capacitor Bank", texture: [["capacitorBank", 0], ["capacitorBank", 0], ["capacitorBank", 0], ["capacitorBankFront", 0], ["capacitorBank", 0], ["capacitorBank", 0]], inCreative: true}
], "opaque");

var bankGUI = new UI.StandartWindow({
  standart: {
    header: {text: {text: "Basic Capacitor Bank" }},
    inventory: {standart: true},
    background: {standart: true}
  },
  drawing: [
    {type: "bitmap", x: 335, y: 140, bitmap: "redflux_bar0", scale: 3.2},
  ],
  elements: {
    "energyScale": {type: "scale", x: 335, y: 140, direction: 1, bitmap: "redflux_bar1", scale: 3.2},
    "textInfo": {type: "text", x: 500, y: 140, width: 350, height: 30, text: "0/"},
    "slotCharge0": {type: "slot", x: 480, y: 300, bitmap: "chargeSlot"},
    "slotCharge1": {type: "slot", x: 580, y: 300, bitmap: "chargeSlot"},
    "slotCharge2": {type: "slot", x: 680, y: 300, bitmap: "chargeSlot"},
    "slotCharge3": {type: "slot", x: 780, y: 300, bitmap: "chargeSlot"},
  }
});

Callback.addCallback("PreLoaded", function(){
  Recipes.addShaped({id: BlockID.storageCapacitorBank, count: 1, data: 0}, [
    	"ici",
    	"crc",
	   "ici"
  ], ['i', 265, 0, 'c', ItemID.basicCapacitor, 0, "r", BlockID.machineChassi, 0]);
});

MachineRegistry.registerRFStorage(BlockID.storageCapacitorBank, {
  defaultValues: {
    meta: 0
  },
  getTier: function(){
		return 1;
	},
  getGuiScreen: function(){
    return bankGUI;
  },
  tick: function(){
    this.container.setScale("energyScale", this.data.energy/this.getEnergyStorage());
    this.container.setText("textInfo", this.data.energy+"/"+this.getEnergyStorage()+" RF");
    
    this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slotCharge0"), "RF", this.data.energy, 2048, 1);
    this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slotCharge1"), "RF", this.data.energy, 2048, 1);
    this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slotCharge2"), "RF", this.data.energy, 2048, 1);
    this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slotCharge3"), "RF", this.data.energy, 2048, 1);
  },
  getEnergyStorage: function(){
    return 1000000;
  },
  energyTick: function(type, src){
		var output = Math.min(500, this.data.energy);
		this.data.energy += src.add(output) - output;
	},
	destroyBlock: function(coords, player) {
	  var extra;
	  if (this.data.energy > 0) {
	    extra = new ItemExtraData();
	    extra.putInt("energy", this.data.energy);
	  }
	  World.drop(coords.x + .5, coords.y + .5, coords.z + .5, BlockID.storageCapacitorBank, 1, 0, extra);
	}
});




// file: Base/Blocks/anvil.js

var BLOCK_TYPE_ANVIL = Block.createSpecialType({
  destroytime: 20,
  explosionres: 999,
  base: 99,
  sound: "anvil"
});
IDRegistry.genBlockID("darkSteelAnvil");
Block.createBlock("darkSteelAnvil", [{
    name: "Dark Anvil",
    texture: [
	 ["darkSteelBlock", 0]],
    inCreative: true
  }
], BLOCK_TYPE_ANVIL);

function setDarkAnvilRender(id, tex){
  var anvilRender = new ICRender.Model();
  BlockRenderer.setStaticICRender(id, 0, anvilRender);
  var model = BlockRenderer.createModel();
  
  model.addBox(2/16, 0/16, 1/16, 14/16, 4/16, 15/16, tex, 0);
  model.addBox(4/16, 4/16, 2/16, 12/16, 5/16, 14/16, tex, 0);
  model.addBox(7/16, 5/16, 3/16, 10/16, 10/16, 13/16, tex, 0);
  model.addBox(3/16, 10/16, 0/16, 13/16, 16/16, 16/16, tex, 0);
  
  anvilRender.addEntry(model);
}

setDarkAnvilRender(BlockID.darkSteelAnvil, "darkSteelBlock");

/**/

var darkAnvilGUI = new UIRegistry({
	standart: {
		header: {text: "Dark Anvil"}
	},
	
	drawing: [
	  	{type: "bitmap", x: 500, y: 180, bitmap: "anvil_plus", scale: 3.2},
	  	{type: "bitmap", x: 700, y: 180, bitmap: "bar_progress1", scale: 3.2}
	],
	
	elements: {
	   "slotItem": {type: "slot", x: 400, y: 180},
	   "slotSecond": {type: "slot", x: 600, y: 180},
	   "slotOutput": {type: "slot", x: 800, y: 180},
  	}
});

var Anvil = {
  repairValues: {},
  toolMaterials: {},
  recipes: [],
  addRepairItem: function(id, data, value, material){
    this.repairValues[id+":"+data] = {value: value, material: material}
  },
  getRepairValue: function(id, data){
    return this.repairValues[id+":"+data]
  },
  registerToolMaterial: function(id, material){
    this.toolMaterials[id] = material
  },
  getToolMaterial: function(id){
    return this.toolMaterials[id]
  },
  addRecipe: function(input, item, result, data){
    this.recipes.push({input: input, item: item, result: result, data: data})
  }/*
  getRecipe: function(id){
    return this.recipes[id]
  }*/
};

Anvil.addRepairItem(280, 0, 5, "wood");
Anvil.addRepairItem(264, 0, 80, "diamond");
Anvil.addRepairItem(265, 0, 70, "iron");
Anvil.addRepairItem(266, 0, 30, "gold");
Anvil.addRepairItem(ItemID.darkSteel, 0, 200, "dark_steel");
Anvil.addRecipe(ItemID.pickaxeDarkSteel, ItemID.vibrantCrystal, ItemID.pickaxeDarkSteelEmpowered1, Item.getMaxDamage(ItemID.pickaxeDarkSteelEmpowered)-1);
var woodenTools = [268, 269, 270, 271, 290];

for(let i in woodenTools){
  Anvil.registerToolMaterial(woodenTools[i], "wood");
}

var stoneTools = [272, 273, 274, 275, 291];

for(let i in stoneTools){
  Anvil.registerToolMaterial(stoneTools[i], "stone");
}

var ironTools = [256, 257, 258, 267, 292];

for(let i in ironTools){
  Anvil.registerToolMaterial(ironTools[i], "iron");
}

var goldenTools = [283, 284, 285, 286, 294];

for(let i in goldenTools){
  Anvil.registerToolMaterial(goldenTools[i], "gold");
}

var diamondTools = [276, 277, 278, 279, 293];

for(let i in diamondTools){
  Anvil.registerToolMaterial(diamondTools[i], "diamond");
}


TileEntity.registerPrototype(BlockID.darkSteelAnvil, {
  defaultValues: {
    canTake: false
  },
  getGuiScreen: function(){
    return darkAnvilGUI;
  },
  tick: function(){
    let slotItem = this.container.getSlot("slotItem");
    let slotSecond = this.container.getSlot("slotSecond");
    let slotOutput = this.container.getSlot("slotOutput");
    let toolMaterial = Anvil.getToolMaterial(slotItem.id);
    let repair = Anvil.getRepairValue(slotSecond.id, slotSecond.data);
    
    if(toolMaterial && repair && slotOutput.id == 0 && slotItem.count == 1 && slotItem.data + repair.value <= Item.getMaxDamage(slotItem.id) && toolMaterial == repair.material && !this.data.canTake){
      slotOutput.id = slotItem.id
      slotOutput.count = 1;
      slotOutput.data = slotItem.data-repair.value
      this.data.canTake = true;
    } else if(!recipe){
      slotOutput.id = 0
    }
    
    if(toolMaterial && repair && slotOutput.count == 0 && this.data.canTake){
      slotItem.id = 0;
      slotSecond.count--;
      this.container.validateAll();
      this.data.canTake = false;
    }
    
    if(slotOutput.data < 0){
      slotOutput.data = 0
    }
    for(let i in Anvil.recipes){
    	let recipe = Anvil.recipes[i]
    if(recipe){
      if(slotSecond.id == recipe.item && slotOutput.id == 0 && !this.data.canTake){
        this.data.canTake = true
        slotOutput.id = recipe.id
        slotOutput.count = 1
        slotOutput.data = recipe.data
      } else if(slotOutput.id!=0){
        slotOutput.id = 0
      }
      if(World.getThreadTime()%2 == 0 && (slotOutput.id != recipe.id || slotOutput.id == 0) && this.data.canTake){
        slotItem.id = 0;
        slotSecond.count--;
        this.container.validateAll();
        this.data.canTake = false;
      }
    }
    }
  }
});




// file: Base/Blocks/Glass.js

var GLASS_TYPE_ANTI_EXPLO = Block.createSpecialType({
  destroytime: 1,
  explosionres: 3600000*3,
  sound: "glass"
});

IDRegistry.genBlockID("fusedGlass");
Block.createBlock("fusedGlass", [
  {
    name: "Quite Clear Glass",
    texture: [
	 ["fusedGlass", 0]],
    inCreative: true
  }
], GLASS_TYPE_ANTI_EXPLO );

ConnectedTexture.setModelForGlass(BlockID.fusedGlass, -1, "fusedGlass");
//bakeModel(BlockID.fusedGlass, 0, "fusedGlassItem");

IDRegistry.genBlockID("fusedQuartz");
Block.createBlock("fusedQuartz", [
  {
    name: "Fused Quartz",
    texture: [
	 ["fusedQuartzItem", 0]],
    inCreative: true
  }
], GLASS_TYPE_ANTI_EXPLO);

ConnectedTexture.setModelForGlass(BlockID.fusedQuartz, -1, "fusedQuartzItem");

Item.addCreativeGroup("glass_modded", Translation.translate("Glass"), [
	BlockID.fusedGlass,
	BlockID.fusedQuartz
]);

//bakeModel(BlockID.fusedQuartz, 0, "fusedQuartzItem");
/*
IDRegistry.genBlockID("reinforcedGlass");
Block.createBlock("reinforcedGlass", [
  {
    name: "Fused Reinforced Glass",
    texture: [
	 ["reinforcedGlass", 0]],
    inCreative: true
  }
]);

bakeModel(BlockID.reinforcedGlass, 0, "reinforcedGlass");
*/
Callback.addCallback("PreLoaded", function() {
 /* RecipeRegistry.addSmelter({
    ingredient1: { id: BlockID.fusedGlass, data: 0, count: 2 },
    ingredient2: { id: 406, data: 0 },
    ingredient3: { id: ItemID.silicon, data: 0, count: 1 },
    result: { id: BlockID.reinforcedGlass, count: 1, data: 0 },
    time: 1200
  });
  */
  RecipeRegistry.addSmelter({
    ingredient1: { id: 12, data: 0, count: 1 },
    ingredient2: { id: 12, data: 0 },
    ingredient3: { id: 12, data: 0, count: 1 },
    result: { id: BlockID.fusedGlass, count: 3, data: 0 },
    time: 700
  });
  RecipeRegistry.addSmelter({
    ingredient1: { id: 406, data: 0, count: 1 },
    ingredient2: { id: 406, data: 0 },
    ingredient3: { id: 406, data: 0, count: 1 },
    result: { id: BlockID.fusedQuartz, count: 3, data: 0 },
    time: 700
  });
});




// file: Base/Blocks/Resources_block.js

Block.createResourceBlock = function(id, name) {
  var newID = id.charAt(0).toUpperCase() + id.substr(1);
  var bid = "block" + newID //id;
  IDRegistry.genBlockID(bid);
  Block.createBlock(bid, [
    { name: name + " Block", texture: [[id + "Block", 0]], inCreative: true }
	 ], "opaque");

  Callback.addCallback("PreLoaded", function() {
    Recipes.addShaped({ id: BlockID[bid], count: 1, data: 0 }, [
	  "bbb",
	  "bbb",
	  "bbb"
  ], ['b', ItemID[id], 0]);
    Recipes.addShapeless({ id: ItemID[id], count: 9, data: 0 }, [{ id: BlockID[bid], data: 0 }]);
  });
 // mod_tip(BlockID[bid])
};

Block.createResourceBlock("conductiveIron", "Conductive Iron");
Block.createResourceBlock("darkSteel", "Dark Steel");
Block.createResourceBlock("electricalSteel", "Electrical Steel");
Block.createResourceBlock("soularium", "Soularium Alloy");
Block.createResourceBlock("redstoneAlloy", "Redstone Alloy");

Block.createResourceBlock("endSteel", "End Steel");
Block.createResourceBlock("energeticAlloy", "Energetic Alloy");
Block.createResourceBlock("pulsatingIron", "Pulsating Iron");








// file: Base/Blocks/MachineChassis.js

Block.createChassisBlock = function(type, name) {
let id = "machine" + type;
IDRegistry.genBlockID(id);
Block.createBlock(id, [
  {
    name: name + " Chassis",
    texture: [
	   [id, 0]
  ],
    inCreative: true
  }
]);
//mod_tip(BlockID[id])
};
Block.createChassisBlock("Chassi", "Industrial Machine");
Block.createChassisBlock("ChassiSimple", "Simple Machine");
Block.createChassisBlock("ChassiSoul", "Soul Machine");
Callback.addCallback("PreLoaded", function() {
  Recipes.addShaped({ id: BlockID.machineChassiSimple, count: 1, data: 0 }, [
  	"aba",
  	"bcb",
	  "aba"
], ['a', VanillaBlockID.iron_bars, 0, 'b', VanillaItemID.iron_ingot, 0, 'c', ItemID.dustInfinity, 0]);

});

ModAPI.addAPICallback("ICore", function(api) {
Callback.addCallback("PreLoaded", function() {
  Recipes.addShaped({ id: BlockID.machineChassiSimple, count: 1, data: 0 }, [
  	"aba",
  	"bcb",
	  "aba"
], ['a', VanillaBlockID.iron_bars, 0, 'b', ItemID.ingotCopper, 0, 'c', ItemID.dustInfinity, 0]);

});

});




// file: Endergy/./API.js

/*const mod_endergy = function(id) {
  Callback.addCallback('PostLoaded', function() {
    var _func = Item.nameOverrideFunctions[id];
		Item.registerNameOverrideFunction(id, function (item, name) {
			if (_func) name = _func(item, name);
			if (_inventory_open) name += "\n§9" + "Endergy";
			return name;
  });
}

*/




// file: Endergy/./Block/Block.js

Block.createResourceBlock("crudeSteel", "Crude Steel");
Block.createResourceBlock("crystalline", "Crystalline");
Block.createResourceBlock("vividAlloy", "Vivid Alloy");
/*
endergy_tip(BlockID.crudeSteelBlock);
endergy_tip(BlockID.vividAlloyBlock);
endergy_tip(BlockID.crystallineBlock);
*/




// file: Endergy/./Recipe/Alloy.js

Callback.addCallback("PreLoaded", function() {
  RecipeRegistry.addSmelter({
    ingredient1: { id: 13, data: 0, count: 1 },
    ingredient2: { id: 318, data: 0 },
    ingredient3: { id: 4, data: 0, count: 1 },
    result: { id: ItemID.crudeSteel, count: 1, data: 0 },
    time: 250
  });
  RecipeRegistry.addSmelter({
    ingredient1: { id: ItemID.dustPulsating, data: 0, count: 1 },
    ingredient2: { id: VanillaItemID.gold_ingot, data: 0 },
    ingredient3: { id: 0, data: 0, count: 0 },
    result: { id: ItemID.crystalline, count: 1, data: 0 },
    time: 500
  });
});




// file: Endergy/./Item/capacitor.js

IDRegistry.genItemID("silverCapacitor");
Item.createItem("silverCapacitor", "Silver Capacitor", { name: "capacitorSilver" }, { stack: 64 });

regUpgrade(ItemID.silverCapacitor, "capacitor", 150000, 60, 1.5, 1);

//endergy_tip(ItemID.silverCapacitor);




// file: Endergy/./Item/items.js

Item.createResourceItem("crudeSteel", "Crude Steel");
Item.createResourceItem("crystalline", "Crystalline");
Item.createResourceItem("vividAlloy", "Vivid Alloy");
/*
endergy_tip(ItemID.crudeSteel);
endergy_tip(ItemID.crudeSteelNugget);
endergy_tip(ItemID.vividAlloy);
endergy_tip(ItemID.vividAlloyNugget)
*/
IDRegistry.genItemID("ingotSilver");
Item.createItem("ingotSilver", "Silver Ingot", {name: "ingot_silver"});
//Recipes.addFurnace(ItemID.dustSilver, ItemID.ingotSilver, 0);
IDRegistry.genItemID("ingotLead");
Item.createItem("ingotLead", "Lead Ingot", {name: "ingot_lead"});

IDRegistry.genItemID("nuggetSilver");
Item.createItem("nuggetSilver", "Silver Nugget", {name: "nugget_silver"});

IDRegistry.genItemID("nuggetLead");
Item.createItem("nuggetLead", "Lead Nugget", {name: "nugget_lead"});

IDRegistry.genItemID("dustSilver");
Item.createItem("dustSilver", "Silver Dust", {name: "dust_silver"});

IDRegistry.genItemID("dustLead");
Item.createItem("dustLead", "Lead Dust", {name: "dust_lead"})

function addRecipeIngot(id, nug){
	Callback.addCallback("PostLoaded", function() {
    Recipes.addShaped({ id: ItemID[id], count: 1, data: 0 }, [
	  "bbb",
	  "bbb",
	  "bbb"
  ], ['b', ItemID[nug], 0]);
    Recipes.addShapeless({ id: ItemID[nug], count: 9, data: 0 }, [{ id: ItemID[id], data: 0 }]);
  });
};

addRecipeIngot("ingotSilver", "nuggetSilver")
addRecipeIngot("ingotLead", "nuggetLead")
let IC2Integration = false ;
Callback.addCallback("PostLoaded", function() {
	Recipes.addFurnace(ItemID.dustLead, ItemID.ingotLead, 0);
	Recipes.addFurnace(ItemID.dustSilver, ItemID.ingotSilver, 0);
ModAPI.addAPICallback("ICore", function(api) {
	IC2Integration = true
});
if (IC2Integration){
	Recipes.addShaped({ id: ItemID.silverCapacitor, count: 1, data: 0 }, [
	  " ab",
	  "aca",
	  "ba"
  ], ['b', ItemID.dustInfinity, 0, "a", ItemID.nuggetSilver, 0, "c", ItemID.ingotLead, 0]);
} else {
	Recipes.addShaped({ id: ItemID.silverCapacitor, count: 1, data: 0 }, [
	  " ab",
	  "aca",
	  "ba"
  ], ['b', ItemID.dustInfinity, 0, "a", ItemID.nuggetSilver, 0, "c", ItemID.electricalSteel, 0]);
}
  });






// file: Zoo/./concussion.js

IDRegistry.genBlockID("confusion_charge");
Block.createBlock("confusion_charge", [
  { name: "confusion_charge", texture: [["block_confusion_charge_bot", 0], ["block_confusion_charge_top", 0], ["block_confusion_charge_side", 0], ["block_confusion_charge_side", 0], ["block_confusion_charge_side", 0], ["block_confusion_charge_side", 0]], inCreative: true }
]);

TileRenderer.setStandartModel(BlockID.confusion_charge, [["block_confusion_charge_bot", 0], ["block_confusion_charge_top", 0], ["block_confusion_charge_side", 0], ["block_confusion_charge_side", 0], ["block_confusion_charge_side", 0], ["block_confusion_charge_side", 0]]);
TileRenderer.registerRenderModel(BlockID.confusion_charge, 0, [["tnt_active", 0]]);

var AccesMobs = [
  EntityType.BAT,
  EntityType.CHICKEN,
  EntityType.COW,
  EntityType.MUSHROOM_COW,
  EntityType.OCELOT,
  EntityType.PIG,
  EntityType.RABBIT,
  EntityType.SHEEP,
  EntityType.SNOW_GOLEM,
  EntityType.SQUID,
  EntityType.VILLAGER,
  EntityType.WOLF,
  23,
  24,
  25,
  26,
  27,
  EntityType.BLAZE,
  EntityType.CAVE_SPIDER,
  EntityType.CREEPER,
  EntityType.ENDERMAN,
  EntityType.GHAST,
  EntityType.IRON_GOLEM,
  EntityType.LAVA_SLIME,
  EntityType.PIG_ZOMBIE,
  EntityType.PLAYER,
  //Player.get(),
  EntityType.SILVERFISH,
  EntityType.SKELETON,
  EntityType.SLIME,
  EntityType.SPIDER,
  EntityType.ZOMBIE,
  EntityType.ZOMBIE_VILLAGER,
  45,
  46,
  47,
  48,
  49,
  52,
  54,
  55,
  59,
  111,
  105
  ];
MachineRegistry.registerPrototype(BlockID.confusion_charge, {
  defaultValues: {
    activated: false,
    timer: 100
  },

  click: function(id) {
    if (id == VanillaItemID.flint_and_steel) {
      this.data.activated = true;
    }
  },

  explode: function() {
    let entities = AccesMobs
    for (i in entities) {
      let ent = Entity.findNearest({ x: this.x, y: this.y, z: this.z }, entities[i], 64);
      if (ent) {
        let pos = Entity.getPosition(ent)
        Entity.addEffect(ent, PotionEffect.confusion, 1, 15 * 20)
        var rdNav = randomInt(-1, 1)
        Entity.setPosition(ent, (rdNav * 1) + pos.x, 1 + pos.y, (rdNav * 1) + pos.z);
      }
    }
    let player = Player.get();
    if (player) {
      let pos = Entity.getPosition(player)
      Entity.addEffect(player, PotionEffect.confusion, 1, 15 * 20)
      var rdNav = randomInt(-1, 1)
      Entity.setPosition(player, (rdNav * 1) + pos.x, 1 + pos.y, (rdNav * 1) + pos.z);
      return
    }

  },

  tick: function() {
    if (this.data.activated) {
      if (this.data.timer <= 0) {
        this.explode();
        World.setBlock(this.x, this.y, this.z, 0, 0)
        return;
      }
      if (this.data.timer % 10 < 5) {
        TileRenderer.mapAtCoords(this.x, this.y, this.z, this.blockID, 0);
      } else {
        BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
      }
      this.data.timer--;
    }
  },

  redstone: function(signal) {
    if (signal.power > 0) {
      this.data.activated = true;
    }
  }
});




// file: Machine/./alloyMelter.js

IDRegistry.genBlockID("simpleAlloySmelter");
Block.createBlockWithRotation("simpleAlloySmelter", [
  {
    name: "Simple Alloy Smelter",
    texture: [
	   ["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["alloy_smelter_simple_front", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]
	 ],
    inCreative: true
  }
]);
TileRenderer.setStandartModel(BlockID.simpleAlloySmelter, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["alloy_smelter_simple_front", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);
TileRenderer.registerRotationModel(BlockID.simpleAlloySmelter, 0, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["alloy_smelter_simple_front", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);
TileRenderer.registerRotationModel(BlockID.simpleAlloySmelter, 4, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["alloy_smelter_front_on_simple", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);

TileRenderer.setRotationPlaceFunction(BlockID.simpleAlloySmelter);
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

var simpleAlloyUI = new UI.StandartWindow({
  standart: {
    header: { text: { text: "Simple Alloy Smelter" } },
    inventory: { standart: true },
    background: { standart: true }
  },
  drawing: [
    { type: "bitmap", x: 527, y: 235, bitmap: "fire_scale0", scale: 3.2 },
    { type: "bitmap", x: 687, y: 235, bitmap: "fire_scale0", scale: 3.2 },
    { type: "bitmap", x: 335, y: 140, bitmap: "redflux_bar0", scale: 3.2 },
        //{type: "bitmap", x: 600, y: 170, bitmap: "bar_alloy", scale: 4.5},
    ],
  elements: {
    "progressScale0": { type: "scale", x: 527, y: 235, direction: 1, bitmap: "fire_scale1", scale: 3.2, clicker: {
            onClick: function(){
                RV && RV.RecipeTypeRegistry.openRecipePage("enderio_alloy");
            }
        }},
    "progressScale1": { type: "scale", x: 687, y: 235, direction: 1, bitmap: "fire_scale1", scale: 3.2, clicker: {
            onClick: function(){
                RV && RV.RecipeTypeRegistry.openRecipePage("enderio_alloy");
            }
        }},
    "energyScale": { type: "scale", x: 335, y: 140, direction: 1, bitmap: "redflux_bar1", scale: 3.2 },
    "ingredient1": { type: "slot", x: 520, y: 170 },
    "ingredient2": { type: "slot", x: 600, y: 140 },
    "ingredient3": { type: "slot", x: 680, y: 170 },
    "text": { type: "text", x: 400, y: 100, width: 100, height: 30, text: "RF" },
    "resultSlot": { type: "slot", x: 600, y: 320 }
  }
});
Callback.addCallback("PreLoaded", function(){

Recipes.addShaped({ id: BlockID.simpleAlloySmelter, count: 1, data: 0 }, [
    	"bbb",
    	"fmf",
	   "ici"
  ], ['i', ItemID.stoneGear, 0, 'f', 61, 0, "m", BlockID.machineChassiSimple, 0, "c", VanillaItemID.bucket, 0, "b", VanillaItemID.iron_ingot, 0]);
  
  });
MachineRegistry.registerElectricMachine(BlockID.simpleAlloySmelter, {
  defaultValues: {
    power_tier: 1,
    progress: 0,
    mode: 0,
    work_time: 0,
    speed: 1,
    energy_consumption: 15,
    energy_storage: 3000,
    isActive: false
  },
  
  getGuiScreen: function() {
    return simpleAlloyUI;
  },

  tick: function() {
        let ingredient1 = this.container.getSlot("ingredient1");
    let ingredient2 = this.container.getSlot("ingredient2");
    let ingredient3 = this.container.getSlot("ingredient3");
    let resultSlot = this.container.getSlot("resultSlot");

    let newActive = false;
    for (let i in RecipeRegistry.smelter) {
      var Recipe = RecipeRegistry.smelter[i];
      var ingri1 = Recipe.ingredient1;
      var ingri2 = Recipe.ingredient2;
      var ingri3 = Recipe.ingredient3;
      var time = Recipe.time*2;
      var result = Recipe.result
      if (ingredient1.id == ingri1.id && ingredient1.data == ingri1.data && (ingredient1.count >= ingri1.count) && ingredient2.id == ingri2.id && ingredient2.data == ingri2.data && ingredient3.id == ingri3.id && ingredient3.data == ingri3.data && (ingredient3.count >= ingri3.count) && (resultSlot.id == result.id && resultSlot.count < 64 && resultSlot.data == result.data || resultSlot.id == 0)) {
        this.data.work_time = time;
        if (this.data.energy >= this.data.energy_consumption) {
          newActive = true;
          this.data.energy -= this.data.energy_consumption;
          this.data.progress += this.data.speed;
          Particles.addParticle(Native.ParticleType.smoke, this.x, this.y, this.z, 0, 0, 0);
        Particles.addParticle(Native.ParticleType.flame, this.x, this.y, this.z, 0, 0, 0);
          if (this.data.progress >= this.data.work_time) {
            resultSlot.id = result.id;
            resultSlot.data = result.data;
            resultSlot.count += result.count;
                        ingredient1.count -= ingri1.count;
            ingredient2.count--;
            ingredient3.count -= ingri3.count;
            this.container.validateAll();
            this.data.progress = 0;
          }
        } else {
          this.data.progress = 0;
        }
        if (!newActive)
          // this.stopPlaySound(true);
          this.setActive(newActive);
      }
      this.container.setScale("progressScale0", this.data.progress / time);
      this.container.setScale("progressScale1", this.data.progress / time);
    }
    
    var energyStorage = this.getEnergyStorage();
    this.data.energy = Math.min(this.data.energy, energyStorage);
    this.container.setScale("energyScale", this.data.energy / energyStorage);
    this.container.setText("text", this.data.energy + "/" + energyStorage);
  },
  getEnergyStorage: function() {
    return this.data.energy_storage;
  }
  

});




// file: Machine/./furnac3.js

IDRegistry.genBlockID("simplePoweredFurnace");
Block.createBlockWithRotation("simplePoweredFurnace", [
  {
    name: "Simple Powered Furnace",
    texture: [
	   ["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["furnace_simple_front", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]
	 ],
    inCreative: true
  }
]);
TileRenderer.setStandartModel(BlockID.simplePoweredFurnace, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["furnace_simple_front", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);
TileRenderer.registerRotationModel(BlockID.simplePoweredFurnace, 0, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["furnace_simple_front", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);
TileRenderer.registerRotationModel(BlockID.simplePoweredFurnace, 4, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["furnace_simple_front_on", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);

TileRenderer.setRotationPlaceFunction(BlockID.simplePoweredFurnace);
/*
function setSimpleAlloyRender() {
  var simpleAlloyRender = new ICRender.Model();
  BlockRenderer.setStaticICRender(BlockID.simplePoweredFurnace, 0, simpleAlloyRender);
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

var simpleFurnaceUI = new UI.StandartWindow({
  standart: {
    header: { text: { text: "Simple Powered Furnace" } },
    inventory: { standart: true },
    background: { standart: true }
  },
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
        onClick: function() {
          RV && RV.RecipeTypeRegistry.openRecipePage("enderio_alloy");
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
        onClick: function() {
          RV && RV.RecipeTypeRegistry.openRecipePage("enderio_alloy");
        }
      }
    },
    "energyScale": { type: "scale", x: 335, y: 140, direction: 1, bitmap: "redflux_bar1", scale: 3.2 },
    "ingredient1": { type: "slot", x: 600, y: 140 },
    "text": { type: "text", x: 400, y: 100, width: 100, height: 30, text: "RF" },
    "resultSlot": { type: "slot", x: 600, y: 320 }
  }
});
Callback.addCallback("PreLoaded", function() {

  Recipes.addShaped({ id: BlockID.simplePoweredFurnace, count: 1, data: 0 }, [
    	"ibi",
    	"fmf",
	   "aca"
  ], ['i', 265, 0, 'f', 98, 0, "m", BlockID.machineChassiSimple, 0, "c", VanillaItemID.bucket, 0, "a", ItemID.stoneGear, 0, "b", 61,0]);

});
MachineRegistry.registerElectricMachine(BlockID.simplePoweredFurnace, {
  defaultValues: {
    power_tier: 1,
    progress: 0,
    mode: 0,
    work_time: 0,
    speed: 0.5,
    energy_consumption: 15,
    energy_storage: 2000,
    isActive: false
  },

  getGuiScreen: function() {
    return simpleFurnaceUI;
  },

  tick: function() {
    let ingredient1 = this.container.getSlot("ingredient1");
    let result = this.container.getSlot("resultSlot");
    let rec = Recipes.getFurnaceRecipeResult(ingredient1.id, "iron");

    let newActive = false;
    if (rec) {
      if ((result.id == rec.id && result.data == rec.data && result.count <= 64 || result.id == 0)) {
        if (this.data.energy >= this.data.energy_consumption) {
          this.data.energy -= this.data.energy_consumption;
          this.data.progress += this.data.speed;
          Particles.addParticle(Native.ParticleType.smoke, this.x, this.y, this.z, 0, 0, 0);
          Particles.addParticle(Native.ParticleType.flame, this.x, this.y, this.z, 0, 0, 0);
          newActive = true;
        }
        if (this.data.progress >= 100) {
          result.id = rec.id;
          result.data = rec.data;
          result.count++;
          this.data.progress = 0;
          ingredient1.count--;
          this.container.validateAll();
        }

      } else {
        this.data.progress = 0;
      }
      if (!newActive) {
        // this.stopPlaySound(true);
        this.setActive(newActive);
      }
    }
    this.container.setScale("progressScale0", this.data.progress / 100 || 0);
    this.container.setScale("progressScale1", this.data.progress / 100 || 0);

    var energyStorage = this.getEnergyStorage();
    this.data.energy = Math.min(this.data.energy, energyStorage);
    this.container.setScale("energyScale", this.data.energy / energyStorage);
    this.container.setText("text", this.data.energy + "/" + energyStorage);
  },
  getEnergyStorage: function() {
    return this.data.energy_storage;
  }


});




// file: Machine/./wirelessTranfer.js

IDRegistry.genBlockID("simpleWirelessTranfer");
Block.createBlockWithRotation("simpleWirelessTranfer", [
  {
    name: "Simple Wireless Tranfer",
    texture: [
	   ["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["simpleWirelessTranfer", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]
	 ],
    inCreative: true
  }
], "opaque");

var swtGUI = new UI.StandartWindow({
  standart: {
    header: { text: { text: "Simple Wireless Tranfer" } },
    inventory: { standart: true },
    background: { standart: true }
  },
  drawing: [
    { type: "bitmap", x: 335, y: 140, bitmap: "redflux_bar0", scale: 3.2 },
  ],
  elements: {
    "energyScale": { type: "scale", x: 335, y: 140, direction: 1, bitmap: "redflux_bar1", scale: 3.2 },
    "textInfo": { type: "text", x: 500, y: 140, width: 350, height: 30, text: "0/" }
    /*
        "slotCharge0": {type: "slot", x: 480, y: 300, bitmap: "chargeSlot"},
        "slotCharge1": {type: "slot", x: 580, y: 300, bitmap: "chargeSlot"},
        "slotCharge2": {type: "slot", x: 680, y: 300, bitmap: "chargeSlot"},
        "slotCharge3": {type: "slot", x: 780, y: 300, bitmap: "chargeSlot"},*/
  }
});

Callback.addCallback("PreLoaded", function() {
  Recipes.addShaped({ id: BlockID.simpleWirelessTranfer, count: 1, data: 0 }, [
    	"ici",
    	"crc",
	   "ici"
  ], ['i', ItemID.conductiveIron, 0, 'c', ItemID.dustInfinity, 0, "r", BlockID.machineChassiSimple, 0]);
});

MachineRegistry.registerRFStorage(BlockID.simpleWirelessTranfer, {
  defaultValues: {
    meta: 0,
    x: -5,
    y: -5,
    z: -5
  },
  getTier: function() {
    return 1;
  },
  getGuiScreen: function() {
    return swtGUI;
  },
  scan: function() {
    this.data.x++;
    if (this.data.x > 5) {
      this.data.x = -5;
      this.data.z++;
      if (this.data.z > 5) {
        this.data.z = -5;
        this.data.y++;
        if (this.data.y > 5) {
          this.data.y = -5;
        }
      }
    }
    let tile = World.getTileEntity(this.x + this.data.x, this.y + this.data.y, this.z + this.data.z);
    if (tile && this.data.energy > 770 && tile.data.energy + 770 <= tile.getEnergyStorage()) {
      this.data.energy -= 770;
      tile.data.energy += 770;
    }
    let direct = [
      { x: 0, y: 1, z: 0 },
      { x: 0, y: -1, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: -1, y: 0, z: 0 },
      { x: 0, y: 0, z: 1 },
      { x: 0, y: 0, z: -1 },
      { x: 0, y: 2, z: 0 },
      { x: 0, y: -2, z: 0 },
      { x: 2, y: 0, z: 0 },
      { x: -2, y: 0, z: 0 },
      { x: 0, y: 0, z: 2 },
      { x: 0, y: 0, z: -2 },
	   	];
    for (i in direct) {
      let dir = direct[i];
      let tile = World.getTileEntity(this.x + dir.x, this.y + dir.y, this.z + dir.z);
      if (tile && this.data.energy >= 770 && tile.data.energy + 770 <= tile.getEnergyStorage()) {
        this.data.energy -= 770;
        tile.data.energy += 770;
      }
    }
  },

  tick: function() {
    this.container.setScale("energyScale", this.data.energy / this.getEnergyStorage());
    this.container.setText("textInfo", this.data.energy + "/" + this.getEnergyStorage() + " RF");
    if (this.data.energy >= 770) {
      this.scan();
    }

  },
  getEnergyStorage: function() {
    return 770000;
  },
  energyTick: function(type, src) {
    var output = Math.min(770, this.data.energy);
    this.data.energy += src.add(output) - output;
  },
  destroyBlock: function(coords, player) {
    var extra;
    if (this.data.energy > 0) {
      extra = new ItemExtraData();
      extra.putInt("energy", this.data.energy);
    }
    World.drop(coords.x + .5, coords.y + .5, coords.z + .5, BlockID.simpleWirelessTranfer, 1, 0, extra);
  }
});




// file: Machine/./Generator/PhotoCeil.js


IDRegistry.genBlockID("simplePhotovoltaicCell");
Block.createBlock("simplePhotovoltaicCell", [
  {
    name: "Simple Photovoltaic Cell",
    texture: [
	["solar_panel_simple_side", 0], ["solar_panel_simple_top", 0], ["solar_panel_simple_side", 0]],
    inCreative: true
  }
]);
CreatePhotovoltaicCell("simplePhotovoltaicCell", 20, 200);

Callback.addCallback("PreLoaded", function() {
	  Recipes.addShaped({ id: BlockID.simplePhotovoltaicCell, count: 1, data: 0 },
    ["aga",
     "sss",
     "epe"],
  ['e', ItemID.dustInfinity, 0, 'a', ItemID.electricalSteel, 0, 's', ItemID.platePhotovoltaic, 0, 'p', ItemID.ironGear, 0, 'g', BlockID.fusedQuartz, 0]);

});




// file: Machine/./Generator/Stirling.js

IDRegistry.genBlockID("simpleStirlingGen");
Block.createBlockWithRotation("simpleStirlingGen", [
  {
    name: "Simple Stirling Generator",
    texture: [
	["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["block_stirling_gen_simple_front_off", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]],
    inCreative: true
  }
], "opaque");

TileRenderer.setStandartModel(BlockID.simpleStirlingGen, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["block_stirling_gen_simple_front_off", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);
TileRenderer.registerRotationModel(BlockID.simpleStirlingGen, 0, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["block_stirling_gen_simple_front_off", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);
TileRenderer.registerRotationModel(BlockID.simpleStirlingGen, 4, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["block_stirling_gen_simple_front_on", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);

TileRenderer.setRotationPlaceFunction(BlockID.simpleStirlingGen);

Callback.addCallback("PreLoaded", function() {
	
  Recipes.addShaped({ id: BlockID.simpleStirlingGen, count: 1, data: 0 },
    ["sas",
     "sfs",
     "gpg"],
    ['s', VanillaBlockID.stonebrick, 0, 'f', BlockID.machineChassiSimple, 0, 'g', ItemID.ironGear, 0, "p", VanillaBlockID.piston, 0, "a", 61, 0]);
    
});

var SimpleStirlingGenGUI = new UI.StandartWindow({
  standart: {
    header: { text: { text: "Simple Stirling Generator" } },
    inventory: { standart: true },
    background: { standart: true }
  },

  drawing: [
    { type: "bitmap", x: 450, y: 135, bitmap: "fire_scale0", scale: 3.2 },
    { type: "bitmap", x: 335, y: 140, bitmap: "redflux_bar0", scale: 3.2 },
	],

  elements: {
    "energyScale": { type: "scale", x: 335, y: 140, direction: 1, value: 0.5, bitmap: "redflux_bar1", scale: 3.2 },
    "burningScale": { type: "scale", x: 450, y: 135, direction: 1, bitmap: "fire_scale1", scale: 3.2 },
    "slotFuel": { type: "slot", x: 441, y: 180 },
    "text": { type: "text", x: 400, y: 100, width: 100, height: 30, text: "RF" }
  }
});



MachineRegistry.registerGenerator(BlockID.simpleStirlingGen, {
  defaultValues: {
    burn: 0,
    burnMax: 0,
    bonus: 1,
    isActive: false
  },
  
  getGuiScreen: function() {
    return SimpleStirlingGenGUI;
  },
  
  getFuel: function(slotName){
		var fuelSlot = this.container.getSlot(slotName);
		if (fuelSlot.id > 0){
			var burn = Recipes.getFuelBurnDuration(fuelSlot.id, fuelSlot.data);
			if (burn && !LiquidRegistry.getItemLiquid(fuelSlot.id, fuelSlot.data)){
				fuelSlot.count--;
				this.container.validateSlot(slotName);
				
				return burn;
			}
		}
		return 0;
	},

  
	tick: function(){
    this.container.setText("text", "RF: " + this.data.energy + "/" + this.getEnergyStorage() + ". Bonus energy: x" + this.data.bonus + ".0");

    var energyStorage = this.getEnergyStorage();
    this.container.setScale("energyScale", this.data.energy / this.getEnergyStorage());
    if (this.data.burn <= 0 && this.data.energy + 20 * this.data.bonus < energyStorage) {
      this.data.burn = this.data.burnMax = this.getFuel("slotFuel") / 4;
    }
    if (this.data.burn > 0 && this.data.energy + 10 * this.data.bonus < energyStorage) {
    	Particles.addFarParticle(Native.ParticleType.smoke, this.x+.5,this.y+1.1,this.z+.5)
        this.data.energy += 20 * this.data.bonus;
            this.data.burn--;
      this.activate();
    } else{
    	this.deactivate();
    }
    this.container.setScale("burningScale", this.data.burn / this.data.burnMax || 0);
    this.container.setScale("energyScale", this.data.energy / this.getEnergyStorage());
  },
  getEnergyStorage: function() {
    return 5000;
  },
  energyTick: function(type, src) {
    let output = Math.min(20 * this.data.bonus, this.data.energy);
    this.data.energy += src.add(output) - output;
  }
});

StorageInterface.createInterface(BlockID.simpleStirlingGen, {
	slots: {
		"slotFuel": {input: true}
	},
	isValidInput: function(item){
		return Recipes.getFuelBurnDuration(item.id, item.data) > 0;
	}
});




// file: Machine/./SAGmill.js

IDRegistry.genBlockID("simplesagmill");
Block.createBlockWithRotation("simplesagmill", [
   {
      name: "Simple SAG Mill",
      texture: [
	   ["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["alloy_smelter_simple_front", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]
	 ],
      inCreative: true
  }
]);
TileRenderer.setStandartModel(BlockID.simplesagmill, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["block_simple_sagmill_front", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);
TileRenderer.registerRotationModel(BlockID.simplesagmill, 0, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["block_simple_sagmill_front", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);
TileRenderer.registerRotationModel(BlockID.simplesagmill, 4, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["block_simple_sagmill_front_on", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);

TileRenderer.setRotationPlaceFunction(BlockID.simplesagmill);
/*
ICRender.getGroup("bc-container").add(BlockID.simplesagmill, -1);
ICRender.getGroup("item-pipe").add(BlockID.simplesagmill, -1);

*/

var SimpleSAGGui = new UI.StandartWindow({
   standart: {
      header: { text: { text: "Simple SAG Mill" } },
      inventory: { standart: true },
      background: { standart: true }
   },
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
            onClick: function() {
               RV && RV.openRecipePage("enderio_sag");
            }
         }
      },
      "energyScale": { type: "scale", x: 335, y: 140, direction: 1, value: 0.5, bitmap: "redflux_bar1", scale: 3.2 },
      "text": { type: "text", x: 400, y: 100, width: 100, height: 30, text: "RF" },
      "ingredient": { type: "slot", x: 602, y: 170 },
      "result0": { type: "slot", x: 505, y: 340 },
      "result1": { type: "slot", x: 570, y: 340 },
      "result2": { type: "slot", x: 635, y: 340 },
      "result3": { type: "slot", x: 700, y: 340 }
   }
});

MachineRegistry.registerElectricMachine(BlockID.simplesagmill, {

   defaultValues: {
      power_tier: 1,
      progress: 0,
      speed: 0.5,
      energy_consumption: 15,
      energy_storage: 2000,
      work_time: 0,
      isActive: false
   },

   getGuiScreen: function() {
      return SimpleSAGGui;
   },

   getTier: function() {
      return this.data.power_tier;
   },

   tick: function() {

      let input = this.container.getSlot("ingredient");
      let res0 = this.container.getSlot("result0");
      let res1 = this.container.getSlot("result1");
      let res2 = this.container.getSlot("result2");
      let res3 = this.container.getSlot("result3");
      let newActive = false;

      
      for (let i in RecipeRegistry.crusher) {
         let recipe = RecipeRegistry.crusher[i];
         var time = recipe.time;
         // KTRA ĐIỆN NĂNG VÀ OUTPUT
         var ingredient = recipe.ingredient;
         var result0 = recipe.result0;
         var result1 = recipe.result1;
         var result2 = recipe.result2;
         var result3 = recipe.result3;
         var time = recipe.time;
         if ((input.id == ingredient.id && input.data == ingredient.data && input.count >= 1) && (
               ((res0.id == result0.id && res0.data == result0.data && res0.count < 64) || (res0.id == 0)) &&
               ((res1.id == result1.id && res1.data == result1.data && res1.count < 64) || (res1.id == 0)) &&
               ((res2.id == result2.id && res2.data == result2.data && res2.count < 64) || (res2.id == 0)) &&
               ((res3.id == result3.id && res3.data == result3.data && res3.count < 64) || (res3.id == 0)))) {
            this.data.work_time = time;
            if (this.data.energy >= this.data.energy_consumption) {
               Particles.addFarParticle(Native.ParticleType.itemBreak, this.x, this.y + .1, this.z)
               newActive = true;
               this.data.energy -= this.data.energy_consumption;
               this.data.progress += this.data.speed;
               if (this.data.progress >= this.data.work_time) {
                  input.count--;
                  var RDM = Math.random() * 1;
                  if (RDM <= recipe.result0.chance) {
                     res0.id = recipe.result0.id;
                     res0.data = recipe.result0.data;
                     res0.count++;
                  }
                  if (RDM <= recipe.result1.chance) {
                     res1.id = recipe.result1.id;
                     res1.data = recipe.result1.data;
                     res1.count++;
                  }
                  if (RDM <= recipe.result2.chance) {
                     res2.id = recipe.result2.id;
                     res2.data = recipe.result2.data;
                     res2.count++;
                  }
                  if (RDM <= recipe.result3.chance) {
                     res3.id = recipe.result3.id;
                     res3.data = recipe.result3.data;
                     res3.count++;
                  }

                  this.data.progress = 0;
                  this.container.validateAll();

               }
            } else {
               this.data.progress = 0;
            }
         }
         if (!newActive)
            // this.stopPlaySound(true);
            this.setActive(newActive);

         this.container.setScale("progressScale", this.data.progress / this.data.work_time);
      }

      var energyStorage = this.getEnergyStorage();
      this.data.energy = Math.min(this.data.energy, energyStorage);
      this.container.setScale("energyScale", this.data.energy / energyStorage);
      
      this.container.setText("text", "RF: " + this.data.energy + "/" + energyStorage);

   },
   getEnergyStorage: function() {
      return this.data.energy_storage;
   }

});

Callback.addCallback("PreLoaded", function() {
   Recipes.addShaped({ id: BlockID.simplesagmill, count: 1, data: 0 }, [
    	"fff",
    	"imi",
	     "apa"
  ], ['i', VanillaItemID.iron_ingot, 0, 'f', VanillaItemID.flint, 0, "m", BlockID.machineChassiSimple, 0, "p", VanillaBlockID.piston, 0, "a", ItemID.stoneGear, 0]);

});

StorageInterface.createInterface(BlockID.simplesagmill, {
   slots: {
      "ingredient": {
         input: true,
         isValid: function(item) {
            return RecipeRegistry.getInCrusher(item.id);
         }
      },
      "result0": { output: true },
      "result1": { output: true },
      "result2": { output: true }
   }
});




// file: Shared.js

ModAPI.registerAPI("EnderCore", {
  Machine: MachineRegistry,
  Recipe: RecipeRegistry,
  Conduit: ConduitRegistry,
  Upgrade: UpgradeAPI,
  Capacitor: regUpgrade,
  CustomPTVC: CreatePhotovoltaicCell,
  requireGlobal: function(command) {
    return eval(command);
  }

});
Logger.Log("EnderIO API was shared with name: EnderCore", "API");




