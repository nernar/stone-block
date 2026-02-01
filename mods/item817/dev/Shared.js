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
