ModAPI.addAPICallback("ENR",
function(api) {
	api.Crucible.dataSet("oak_crucible", {
		"6:0": {
			addworktime: 125,
			addwater: 0.001
		},
		"6:1": {
			addworktime: 125,
			addwater: 0.001
		},
		"6:2": {
			addworktime: 125,
			addwater: 0.001
		},
		"6:3": {
			addworktime: 125,
			addwater: 0.001
		},
		"6:4": {
			addworktime: 125,
			addwater: 0.001
		},
		"6:5": {
			addworktime: 125,
			addwater: 0.001
		},
		"18:0": {
			addworktime: 250,
			addwater: 0.001
		},
		"18:1": {
			addworktime: 250,
			addwater: 0.001
		},
		"18:2": {
			addworktime: 250,
			addwater: 0.001
		},
		"18:3": {
			addworktime: 250,
			addwater: 0.001
		},
		"161:0": {
			addworktime: 250,
			addwater: 0.001
		},
		"161:1": {
			addworktime: 250,
			addwater: 0.001
		}
	});
	CrucibleAPI.registerCrucible("ex_crucible_oak", "Oak Crucible", "log_oak", api);
	CrucibleAPI.registerCrucible("ex_crucible_spruce", "Spruce Crucible", "log_spruce", api);
	CrucibleAPI.registerCrucible("ex_crucible_birch", "Birch Crucible", "log_birch", api);
	CrucibleAPI.registerCrucible("ex_crucible_jungle", "Jungle Crucible", "log_jungle", api);
	CrucibleAPI.registerCrucible("ex_crucible_acacia", "Acacia Crucible", "log_acacia", api);
	CrucibleAPI.registerCrucible("ex_crucible_big_oak", "Dark Oak Crucible", "log_big_oak", api);
});