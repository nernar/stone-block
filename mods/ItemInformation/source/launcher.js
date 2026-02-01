ConfigureMultiplayer({
	isClientOnly: false
});
IMPORT("DependenceHelper");
Translation.addTranslation("• Requires api CoreUtility {version}, current {now}", {
	ru: "• Требуется api CoreUtility {version}, текущее {now}",
});
const version = 2;
Launch();
new Dependence(__name__)
	.addDependence("CoreUtility", "https://icmods.mineprogramming.org/mod?id=871", null, function(api){
		return api.version >= version;
	}, function(api){
		if(api)
			return Translation.translate("• Requires api CoreUtility {version}, current {now}").replace("{version}", version).replace("{now}", api.version||1);
		return "• CoreUtility";
	})
	.setLaunch(function(all_api,api) {
		
	});
