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