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