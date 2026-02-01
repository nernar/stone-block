importLib("ToolType", "*");
importLib("energylib", "*");
IMPORT("HelperMod");

var DE_FUEL_MAP = {
	152: 8100,
	331: 900
};

Game.getGameMode = ModAPI.requireGlobal("Level.getGameMode");

var RF = EnergyTypeRegistry.assureEnergyType("RF", 1/4);

ToolAPI.registerBlockMaterial(175, "fibre");
ToolAPI.registerBlockMaterial(31, "plant");