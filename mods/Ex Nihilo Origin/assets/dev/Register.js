(function() {
    var mesh = [
        ["Wood", 0.05, 10 * 13, "ex"],
        ["Silk", 0.8, 64 * 13, "ex"],
        ["Flint", 1.5, 128 * 13, "ex"],
        ["Iron", 5, 256 * 13, "ex"],
        ["Diamond", 8, 512 * 13, "ex"],
        ["coSilk", 0.8, 64 * 13 * 4, "co"],
        ["coFlint", 1.5, 128 * 13 * 4, "co"],
        ["coIron", 5, 256 * 13 * 4, "co"],
        ["coDiamond", 8, 512 * 13 * 4, "co"]
    ];
    mesh.forEach(function(value){
        EXCore.registerMesh(value[0], value[1], value[2], value[3]);
    });
})();
EXCore.register("Iron", 265, 0, 4);
EXCore.register("Gold", 266, 0, 4);
EXCore.register_1("Nickel");
EXCore.register_1("Platinum");
EXCore.register_1("Aluminum");
EXCore.registerIngot("ingotPlatinum", "Platinum Ingot");
EXCore.registerIngot("ingotAluminum", "Aluminum Ingot");
EXCore.registerIngot("ingotNickel", "Nickel Ingot");
EXCore.registerIngot("ingotCopper", "Copper Ingot");
EXCore.registerIngot("ingotLead", "Lead Ingot");
EXCore.registerIngot("ingotOsmium", "Osmium Ingot");
EXCore.registerIngot("ingotSilver", "Silver Ingot");
EXCore.registerIngot("ingotTin", "Tin Ingot");

LiquidRegistry.registerLiquid("waterwitch", "Witch Water", ["ex_waterwitch_0"]);
LiquidRegistry.registerLiquid("waterslime", "Slime Water", ["ex_waterslime_0"]);

/*EXCore.defineAllSalts("Copper", "ore_salts_copper");
EXCore.defineAllSalts("Tin", "ore_salts_tin");
EXCore.defineAllSalts("Lead", "ore_salts_lead");
EXCore.defineAllSalts("Silver", "ore_salts_silver");
EXCore.defineAllSalts("Iron", "ore_salts_Iron");
EXCore.defineAllSalts("Gold", "ore_salts_gold");
EXCore.defineAllSalts("Nickel", "ore_salts_nickel");
EXCore.defineAllSalts("Platinum", "ore_salts_platinum");*/