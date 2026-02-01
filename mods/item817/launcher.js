ModAPI.addAPICallback("KernelExtension", function(api) {
   if (typeof api.getKEXVersionCode === "function" && api.getKEXVersionCode() >= 300) {
      Launch({ KEX: api });
   } else {
      Logger.Log("Failed to launch EnderIO. You must have at least 3.0 version of Kernel Extension", "ERROR");
   }
})
/*
ConfigureMultiplayer({
    name: "KEX-Dependent mod",
    version: "1.0",
    isClientOnly: false
});

ModAPI.addAPICallback("KernelExtension", function(api) {
    // checking if getKEXVersion function exists in API object, then calling it and checking if the version is applicable for your mod
    if(
        typeof api.getKEXVersion === "function" &&
        // in this case checking if the version is 3.0 or higher
        api.getKEXVersion() >= 300
    ) {
        // launching the mod adding the API object to its scope
        Launch({ KEX: api });
    }
});

*/