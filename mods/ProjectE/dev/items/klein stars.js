IDRegistry.genItemID("kleinStar1");
Item.createItem("kleinStar1", "Klein star I", {name: "klein_star", meta: 0}, {stack: 1, isTech: true});
System.setStar(ItemID.kleinStar1, 5000, 50);

IDRegistry.genItemID("kleinStar2");
Item.createItem("kleinStar2", "Klein star II", {name: "klein_star", meta: 1}, {stack: 1, isTech: true});
System.setStar(ItemID.kleinStar2, 20000, 200);

IDRegistry.genItemID("kleinStar3");
Item.createItem("kleinStar3", "Klein star III", {name: "klein_star", meta: 2}, {stack: 1, isTech: true});
System.setStar(ItemID.kleinStar3, 80000, 800);

IDRegistry.genItemID("kleinStar4");
Item.createItem("kleinStar4", "Klein star IV", {name: "klein_star", meta: 3}, {stack: 1, isTech: true});
System.setStar(ItemID.kleinStar4, 320000, 3200);

IDRegistry.genItemID("kleinStar5");
Item.createItem("kleinStar5", "Klein star V", {name: "klein_star", meta: 4}, {stack: 1, isTech: true});
System.setStar(ItemID.kleinStar5, 1280000, 12800);

IDRegistry.genItemID("kleinStar6");
Item.createItem("kleinStar6", "Klein star VI", {name: "klein_star", meta: 5}, {stack: 1, isTech: true});
System.setStar(ItemID.kleinStar6, 5120000, 51200);

Callback.addCallback("PostLoaded", function (){
Recipes.addShaped({id: ItemID.kleinStar1, count: 1, data: 27}, ["aaa", "aba", "aaa"], ["a", ItemID.fuelMobius, 0, "b", 264, 0]);
Recipes.addShaped({id: ItemID.kleinStar2, count: 1, data: 27}, ["aa", "aa"], ["a", ItemID.kleinStar1, 27]);
Recipes.addShaped({id: ItemID.kleinStar3, count: 1, data: 27}, ["aa", "aa"], ["a", ItemID.kleinStar2, 27]);
Recipes.addShaped({id: ItemID.kleinStar4, count: 1, data: 27}, ["aa", "aa"], ["a", ItemID.kleinStar3, 27]);
Recipes.addShaped({id: ItemID.kleinStar5, count: 1, data: 27}, ["aa", "aa"], ["a", ItemID.kleinStar4, 27]);
Recipes.addShaped({id: ItemID.kleinStar6, count: 1, data: 27}, ["aa", "aa"], ["a", ItemID.kleinStar5, 27]);
});