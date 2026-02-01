IMPORT("ToolType");

IDRegistry.genItemID("certussword");
IDRegistry.genItemID("certuspickaxe");
IDRegistry.genItemID("certusaxe");
IDRegistry.genItemID("certusshovel");
IDRegistry.genItemID("certusknife");
Item.createItem("certussword", "Меч из кварца Нижнего мира", {name: "certus_quartz_sword", meta: 0}, {stack: 1});
Item.createItem("certuspickaxe", "Кирка из кварца Нижнего мира", {name: "certus_quartz_pickaxe", meta: 0}, {stack: 1});
Item.createItem("certusaxe", "Топор из кварца Нижнего мира", {name: "certus_quartz_axe", meta: 0}, {stack: 1});
Item.createItem("certusshovel", "Лопата из кварца Нижнего мира", {name: "certus_quartz_shovel", meta: 0}, {stack: 1});
Item.createItem("certusknife", "Кварцевый нож", {name: "certus_quartz_cutting_knife", meta: 0}, {stack: 1});


ToolAPI.addToolMaterial("certusingot", {durability: 3400, level: 4, efficiency: 4, damage: 5, enchantability: 14});
ToolAPI.setTool(ItemID.certussword, "certusingot", ToolType.sword);
ToolAPI.setTool(ItemID.certuspickaxe, "certusingot", ToolType.pickaxe);
ToolAPI.setTool(ItemID.certusaxe, "certusingot", ToolType.axe);
ToolAPI.setTool(ItemID.certusshovel, "certusingot", ToolType.shovel);

Recipes.addShaped({id: ItemID.certussword, count: 1, data: 0}, [ " a ", " a ", " b "], ['a', ItemID.certusingot, 0, 'b', 280, 0]);
Recipes.addShaped({id: ItemID.certuspickaxe, count: 1, data: 0}, [ "aaa", " b ", " b "], ['a', ItemID.certusingot, 0, 'b', 280, 0]);
Recipes.addShaped({id: ItemID.certusaxe, count: 1, data: 0}, [ "aa ", "ab ", " b "], ['a', ItemID.certusingot, 0, 'b', 280, 0]);
Recipes.addShaped({id: ItemID.certusshovel, count: 1, data: 0}, [ " a ", " b ", " b "], ['a', ItemID.certusingot, 0, 'b', 280, 0]);