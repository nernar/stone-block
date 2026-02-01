ModAPI.addAPICallback("RecipeViewer", function(api){
var RecipeViewer=api.Core;
RecipeViewer.registerRecipeType("Energy collector", {
    title: Translation.translate("Energy collector"),
    contents: {
        icon: BlockID.energyCollector1,
        drawing: [
        {type: "bitmap", x: 485, y: 100, bitmap: "emcBarShort_0", scale: 5},
        {type: "bitmap", x: 600, y: 200, bitmap: "collectorProgress_01", scale: 3.5},
        {type: "bitmap", x: 800, y: 200, bitmap: "collectSun_1", scale: 4},
        ],
        elements: {
        "output0": {type: "slot", x: 350, y: 240},
        "output1": {type: "slot", x: 410, y: 240},
        "output2": {type: "slot", x: 470, y: 240},
        "output3": {type: "slot", x: 530, y: 240},
        "output4": {type: "slot", x: 350, y: 300},
        "output5": {type: "slot", x: 410, y: 300},
        "output6": {type: "slot", x: 470, y: 300},
        "output7": {type: "slot", x: 530, y: 300},
        "input0": {type: "slot", x: 700, y: 300},
        "progScale": {type: "scale", x: 600, y: 200, bitmap: "collectorProgress_11", scale: 3.5, direction: 2},
        "charge": {type: "slot", x: 350, y: 100, bitmap: "starCharge"},
        "uncharge": {type: "slot", x: 410, y: 100, bitmap: "unstarCharge" },
        "emcScale": {type: "scale", x: 485, y: 100, bitmap: "emcBarShort_1", scale: 5},
        "txt": {type: "text", x: 352, y: 35, multiline: true, width: 100, height: 30, text: Translation.translate("cost EMC: ")}
        }
    },
    getList: function(id, data, isUsage){
        if(isUsage){
          return System.getCanRecipe(id, data) ? [{
            input: [{id: id, count: 1, data: data}],
            output: [{id: System.getRecipe(id, data).id, count: 1, data: 0}],
          }] : [];
        }else if(data==0){
          try{
            for(ii in System.collector){
              if(System.collector[ii].id==id){
                let item=ii.split(":");
                return [{
                  input: [{id: Number(item[0]), count: 1, data: Number(item[1])}],
                  output: [{id: id, count: 1, data: 0}],
                }];
              };
            };
          }catch(e){};
          return [];
        }else{return []};
    },/*
    onOpen: function(elements, recipe){
        this.emc=System.getRecipe(recipe.input.id, recipe.input.data).emc;
        elements.get("txt").onBindingUpdated("text", Translation.translate("cost EMC: ")+emc);
    }*/
});

RecipeViewer.registerRecipeType("emc", {
    title: "EMC",
    contents: {
        icon: ItemID.transmute_tablet,
        description: "emc",
        drawing: [],
        elements: {
            input0: {x: 280, y: 260, size: 120},
            text: {type: "text", x: 250, y: 200, multiline: true, font: {size: 40, color: android.graphics.Color.WHITE}}
        }
    },
    getList: function(id, data, isUsage){
        return System.getValue(id, data) ? [{input: [{id: id, count: 1, data: data}]}] : [];
    },
    onOpen: function(elements, recipe){
        const item = recipe.input[0];
        const emc = System.getValue(item.id, item.data);
        elements.get("text").onBindingUpdated("text", "EMC: "+emc);
    }
});

});
