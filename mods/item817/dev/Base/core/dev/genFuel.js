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

