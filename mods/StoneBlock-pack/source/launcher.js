const launchModification = function(additionalScope) {
	if (additionalScope !== undefined) {
		__mod__.RunMod(additionalScope);
		return;
	}
	Launch();
};
(function() {
	try {
		ConfigureMultiplayer({
			name: "StoneBlock",
			version: "1.0",
			isClientOnly: false
		});
	} catch (e) {
		launchModification({
			isOutdated: true
		});
		return;
	}
	launchModification();
})();
