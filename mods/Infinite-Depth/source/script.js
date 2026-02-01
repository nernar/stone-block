const InfiniteDepth = WRAP_NATIVE("InfiniteDepth");

if (InfiniteDepth == null) {
	LowLevelUtils.throwException("Infinite Depth: Cpp dependency is not found, please make sure that mod is installed properly!");
}

InfiniteDepth.getDimensionId = function(dimension) {
	if (dimension == "overworld" || dimension == "nether" || dimension == "end") {
		dimension = EDimension[dimension.toUpperCase()];
	} else if (typeof dimension == "string") {
		let limbo = Dimensions.getDimensionByName(dimension);
		dimension = limbo != null ? limbo.id : parseInt(dimension);
	}
	if (dimension == null || typeof dimension != "number" || isNaN(dimension)) {
		throw "Dimension " + JSON.stringify(dimension) + " does not exists or transferred incorrectly!";
	}
	return dimension;
};

InfiniteDepth.fromJson = function(json) {
	if (json == null || typeof json != "object") {
		LowLevelUtils.throwException("Infinite Depth: fromJson(json == null)");
	}
	for (let dimension in json) {
		let property = json[dimension];
		if (property == null || typeof property != "object") {
			continue;
		}
		try {
			dimension = InfiniteDepth.getDimensionId(dimension);
		} catch (e) {
			Logger.Log("Infinite Depth: " + e, "INFO");
			continue;
		}
		try {
			if (Array.isArray(property)) {
				if (property.length == 2) {
					Logger.Log("Infinite Depth: Dimension " + dimension + " array range should be in format [min; max], skipping it...", "WARNING");
					continue;
				}
				InfiniteDepth.setDimensionHeightRange(dimension, property[0], property[1]);
			} else if (property.hasOwnProperty("height")) {
				InfiniteDepth.setDimensionBounds(dimension, property.onset || 0, property.height);
			} else if (property.hasOwnProperty("max")) {
				InfiniteDepth.setDimensionHeightRange(dimension, property.min || 0, property.max);
			} else {
				Logger.Log("Infinite Depth: Dimension " + dimension + " have malformed object, it should be in format [min; max], { onset?; height } or { min?; max }, ignoring it...", "ERROR");
			}
		} catch (e) {
			Logger.Log("Infinite Depth: Dimension " + dimension + " json object malformed, registration failed: " + e, "ERROR");
		}
	}
};

InfiniteDepth.fromConfig = function(config) {
	if (config == null || config.getNames == null) {
		LowLevelUtils.throwException("Infinite Depth: fromConfig(config == null)");
	}
	let depths = config.getNames();
	for (let dimension, offset = 0, size = depths.size(); offset < size; offset++) {
		dimension = depths.get(offset);
		let property = config.get(dimension);
		if (property == null || property == false || property == true || property <= 0 || property >= 0) {
			continue;
		}
		try {
			dimension = InfiniteDepth.getDimensionId(dimension);
		} catch (e) {
			Logger.Log("Infinite Depth: " + e, "INFO");
			continue;
		}
		let height = property.getInteger("height");
		if (height > 0) {
			InfiniteDepth.setDimensionBounds(dimension, property.getInteger("onset"), height);
		} else {
			InfiniteDepth.setDimensionHeightRange(dimension, property.getInteger("min"), property.getInteger("max"));
		}
	}
};

try {
	InfiniteDepth.fromConfig(__config__);
} catch (e) {
	Logger.Log("Infinite Depth: Config malformed, registration failed: " + e, "ERROR");
}

ModAPI.registerAPI("InfiniteDepth", {
	fromJson(json) {
		InfiniteDepth.fromJson(json);
	},
	fromConfig(config) {
		InfiniteDepth.fromConfig(config);
	},
	getDimensionMinY(dimension) {
		dimension = InfiniteDepth.getDimensionId(dimension);
		return InfiniteDepth.getDimensionMinY(dimension);
	},
	setDimensionHeightRange(dimension, min, max) {
		dimension = InfiniteDepth.getDimensionId(dimension);
		InfiniteDepth.setDimensionHeightRange(dimension, min, max);
	},
	setDimensionBounds(dimension, onset, height) {
		dimension = InfiniteDepth.getDimensionId(dimension);
		InfiniteDepth.setDimensionBounds(dimension, onset, height);
	}
});
