ModAPI.addAPICallback("RoostAPI", function(api){
  Launch({
    ChickenClass: api.ChickenClass,
    ChickenRegistry: api.ChickenRegistry
  });
});