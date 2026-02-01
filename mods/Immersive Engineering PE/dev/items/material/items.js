IDRegistry.genItemID("blueprint");
Item.createItem("blueprint", "Чертеж", {name: "blueprint", meta: 0}, {stack: 64});

IDRegistry.genItemID("coilCopper");
Item.createItem("coilCopper", "Катушка низковольтного провода", {name: "coilCopper", meta: 0}, {stack: 64});

IDRegistry.genItemID("coilElectrum");
Item.createItem("coilElectrum", "Катушка средневольтного провода", {name: "coilElectrum", meta: 0}, {stack: 64});

IDRegistry.genItemID("coilHV");
Item.createItem("coilHV", "Катушка высоковольтного провода", {name: "coilHV", meta: 0}, {stack: 64});

IDRegistry.genItemID("nuggetAluminum");
Item.createItem("nuggetAluminum", "Алюминиевый самородок", {name: "nuggetAluminum", meta: 0}, {stack: 64});

IDRegistry.genItemID("nuggetCopper");
Item.createItem("nuggetCopper", "Медный самородок", {name: "nuggetCopper", meta: 0}, {stack: 64});

IDRegistry.genItemID("nuggetLead");
Item.createItem("nuggetLead", "Свинцовый самородок", {name: "nuggetLead", meta: 0}, {stack: 64});

IDRegistry.genItemID("nuggetSilver");
Item.createItem("nuggetSilver", "Серебряный  самородок", {name: "nuggetSilver", meta: 0}, {stack: 64});

IDRegistry.genItemID("nuggetElectrum");
Item.createItem("nuggetElectrum", "Электруумный самородок", {name: "nuggetElectrum", meta: 0}, {stack: 64});

IDRegistry.genItemID("coalCoke ");
Item.createItem("coalCoke ", "Коксовый уголь", {name: "coalCoke", meta: 0}, {stack: 64});

IDRegistry.genItemID("stickAluminum");
Item.createItem("stickAluminum", "Алюминиевая палка", {name: "stickAluminum", meta: 0}, {stack: 64});

IDRegistry.genItemID("stickSteel");
Item.createItem("stickSteel", "Стальная палка", {name: "stickSteel", meta: 0}, {stack: 64});

IDRegistry.genItemID("stickIron");
Item.createItem("stickIron", "Железная палка", {name: "stickIron", meta: 0}, {stack: 64});

IDRegistry.genItemID("jerrycan");
Item.createItem("jerrycan", "Канистра", {name: "jerrycan", meta: 0}, {stack: 64});

IDRegistry.genItemID("materialSlag");
Item.createItem("materialSlag", "Шлаг", {name: "materialSlag", meta: 0}, {stack: 64});

IDRegistry.genItemID("waterwheelSegment");
Item.createItem("waterwheelSegment", "Часть колеса мельницы", {name: "waterwheelSegment", meta: 0}, {stack: 64});

IDRegistry.genItemID("drillheadIron");
Item.createItem("drillheadIron", "Железная часть бура", {name: "drillheadIron", meta: 0}, {stack: 64});

IDRegistry.genItemID("drillheadSteel");
Item.createItem("drillheadSteel", "Стальная часть бура", {name: "drillheadSteel", meta: 0}, {stack: 64});

Recipes.addShaped({id: ItemID. waterwheelSegment , count: 4, data: 0}, [
        "oxo",
        "xyx",
        "yxy"
    ], ['x', 280, 0, 'y', 5, 1]);