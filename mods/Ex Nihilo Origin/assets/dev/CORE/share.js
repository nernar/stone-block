ModAPI.registerAPI("ENR", {
    EX: EXCore,
    Barrel: Barrel,
    Sieve: Sieve,
    Crucible: Crucible,
    ThreadHelper: threadHelper,
    ModVersion: ExNihiloOriginVERSION,
    requireGlobal: function(command) {
        return eval(command)
    }
});
Logger.Log("The API of Ex Nihilo Origin is named ENR.", "API");