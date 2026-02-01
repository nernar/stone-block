/*
BUILD INFO:
  dir: dev
  target: main.js
  files: 18
*/



// file: other.js

const BitmapFactory = android.graphics.BitmapFactory;
const Bitmap = android.graphics.Bitmap;

const Timer = java.util.Timer;
const TimerTask = java.util.TimerTask;

const JAVA_ANIMATOR = android.animation.ValueAnimator;
const JAVA_HANDLER = android.os.Handler;
const LOOPER_THREAD = android.os.Looper;
const JAVA_HANDLER_THREAD = new JAVA_HANDLER(LOOPER_THREAD.getMainLooper());

var InnerCore_pack = FileTools.ReadJSON(__packdir__ + 'manifest.json');

Callback['com.ulalald.asd'] = Callback['com.ulalald.asd'] || [];
Callback['com.ulalald.asd.ddd'] = false;
const mod = FileTools.ReadJSON(__dir__ + 'mod.info');
Callback['com.ulalald.asd'].push(mod);
Callback.addCallback("LevelDisplayed", function () {
	//Game.tipMessage('§c' + mod.name + '\n§a' + mod.version)
	if (!Callback['com.ulalald.asd.ddd']) {
		Game.tipMessage(Callback['com.ulalald.asd'].map(function (elem) {
			return '§c' + elem.name + '   §a' + elem.version;
		}).join('\n'))
		Callback['com.ulalald.asd.ddd'] = true;
	}
});
Callback.addCallback("LevelLeft", function () {
	Callback['com.ulalald.asd.ddd'] = false;
});

var levelloaded = false;

const searchItem = function (id, data, extra, list, reverse, playerUid) {
	var player = playerUid ? new PlayerActor(playerUid) : Player;
	if(typeof(data) != "number")data = -1;
	if(typeof(id) != "number")id = -1;
	if(typeof(extra) == "boolean"){
		playerUid = reverse; reverse = list; list = extra;
		extra = -1;
	}
	if(reverse){
		if(list){
			var itemsList = [];
			for (var i = 35; i >= 0; i--) {
				var item = player.getInventorySlot(i);
				if ((item.id == id || (id == -1 && item.id != 0)) && (item.data == data || data == -1) && (extra == -1 || item.extra == extra || (item.extra && extra && fullExtraToString(item.extra) == fullExtraToString(extra)))) {
					itemsList.push({
						id: item.id,
						data: item.data,
						extra: item.extra,
						count: item.count,
						slot: i
					})
				}
			}
			return itemsList;
		} else for (var i = 35; i >= 0; i--) {
			var item = player.getInventorySlot(i);
			if ((item.id == id || (id == -1 && item.id != 0)) && (item.data == data || data == -1) && (extra == -1 || item.extra == extra || (item.extra && extra && fullExtraToString(item.extra) == fullExtraToString(extra)))) {
				return {
					id: item.id,
					data: item.data,
					extra: item.extra,
					count: item.count,
					slot: i
				}
			}
		}
	} else {
		if(list){
			var itemsList = [];
			for (var i = 0; i <= 35; i++) {
				var item = player.getInventorySlot(i);
				if ((item.id == id || (id == -1 && item.id != 0)) && (item.data == data || data == -1) && (extra == -1 || item.extra == extra || (item.extra && extra && fullExtraToString(item.extra) == fullExtraToString(extra)))) {
					itemsList.push({
						id: item.id,
						data: item.data,
						extra: item.extra,
						count: item.count,
						slot: i
					})
				}
			}
			return itemsList;
		} else for (var i = 0; i <= 35; i++) {
			var item = player.getInventorySlot(i);
			if ((item.id == id || (id == -1 && item.id != 0)) && (item.data == data || data == -1) && (extra == -1 || item.extra == extra || (item.extra && extra && fullExtraToString(item.extra) == fullExtraToString(extra)))) {
				return {
					id: item.id,
					data: item.data,
					extra: item.extra,
					count: item.count,
					slot: i
				}
			}
		}
	}
}

const getPointed = ModAPI.requireGlobal("Player.getPointed");

/*const setTimeout = function (func, ticks) {
	var upd = {
		ticks: 0,
		update: function () {
			this.ticks++
			if (this.ticks >= ticks) {
				func();
				this.remove = true
			}
		}
	};
	Updatable.addUpdatable(upd);
}

const setInterval = function (func, ticks, _first) {
	if (_first && func()) return;
	var upd = {
		ticks: 0,
		update: function () {
			this.ticks++
			if (this.ticks >= ticks) {
				this.ticks = 0;
				if (func()) this.remove = true;
			}
		}
	};
	Updatable.addUpdatable(upd);
	return upd;
}

const clearInterval = function (upd) {
	if (upd && upd == {} && upd.remove) {
		upd.remove = true;
	}
}*/

const log = function (text) {
	if (levelloaded) {
		Game.message(text);
	};
	Logger.Log(text, mod.name + " Log");
}

//const devLogs = [];
var __dev = __config__.getBool("dev");
const devLog = function (text) {
	if (!__dev) return;
	if (levelloaded) {
		Game.message(text);
	};
	Logger.Log(text, mod.name + " devLog");
}

Callback.addCallback("LevelLoaded", function () {
	levelloaded = true
})

Callback.addCallback("LevelLeft", function () {
	levelloaded = false
});

var _LevelDisplayed = false;
Callback.addCallback("LevelDisplayed", function () {
	_LevelDisplayed = true;
});
Callback.addCallback("LevelLeft", function () {
	_LevelDisplayed = false;
});

var _inventory_open = false;
Callback.addCallback('NativeGuiChanged', function (screenName) {
	if (screenName == 'inventory_screen' || screenName == 'inventory_screen_pocket')
		_inventory_open = true;
	else
		_inventory_open = false;
});

const mod_tip = function (id) {
	if (BlockID[id]) id = Block.convertBlockToItemId(id);
	Callback.addCallback('PostLoaded', function () {
		var _func = Item.nameOverrideFunctions[id];
		Item.registerNameOverrideFunction(id, function (item, name) {
			if (_func) name = _func(item, name);
			if (_inventory_open) name += "\n§9" + mod.name;
			return name;
		})
	});
}

const items_vanilla = [6, 27, 28, 30, 32, 37, 38, 39, 40, 50, 69, 76, 102, 106, 111, 126, 175, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511];

const blocks_vanilla = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255];

const items_and_blocks_vanilla = items_vanilla.concat(blocks_vanilla);

var all_items = items_vanilla;

var all_blocks = blocks_vanilla;

var all_items_and_blocks;


Callback.addCallback("ModsLoaded", function () {
	for (var i in ItemID) {
		all_items.push(ItemID[i]);
	};
	for (var i in BlockID) {
		all_blocks.push(BlockID[i]);
	};
	all_items_and_blocks = all_items.concat(all_blocks);
	//log(all_items_and_blocks);
});

const allParams = function (json, fullParams) {
	if (typeof (json) != "object") return json;
	var params = '{\n';
	for (var key in json) {
		if (fullParams) {
			params += key + ' : ' + allParams(json[key], true) + '\n';
		} else {
			params += key + ' : ' + json[key] + '\n';
		}
	}
	params += '}';
	return params;
}

const JSONlength = function (json) {
	var length = 0;
	for (var i in json) {
		length++
	}
	return length;
}

const setCharAt = function (str, index, chr) {
	if (index > str.length - 1) return str;
	return str.substr(0, index) + chr + str.substr(index + chr.length);
}

const jSetInterval = function (__fun, __mil) {
	var timer = new Timer();
	var task = new TimerTask({
		run: function () {
			if (__fun()) timer.cancel();
		}
	})
	timer.scheduleAtFixedRate(task, 0, __mil);
	return timer;
}

const jSetTimeout = function (__fun, __mil) {
	var timer = new Timer();
	var task = new TimerTask({
		run: function () {
			__fun();
		}
	})
	timer.schedule(task, __mil);
	return timer;
}

const jClearInterval = function (__interval) {
	if (__interval && __interval.cancel) __interval.cancel();
}

const sides = [
	[1, 0, 0],
	[-1, 0, 0],
	[0, 0, 1],
	[0, 0, -1],
	[0, 1, 0],
	[0, -1, 0]
];

/*const drop = function (x, y, z, id, count, data, extra) {
	var container = new UI.Container();
	var item = container.getSlot("asd");
	item.id = Number(id);
	item.count = Number(count);
	item.data = Number(data);
	item.extra = extra;
	container.dropAt(x, y, z);
}*/

const onCallbacks = {};

function onCallback(name, func) {
	if (!onCallbacks[name]) {
		onCallbacks[name] = [];
		Callback.addCallback(name, function (a, b, c, d, e, f, g, h) {
			for (var i in onCallbacks[name]) {
				var res = onCallbacks[name][i](a, b, c, d, e, f, g, h);
				if (res == "delete") onCallbacks[name].splice(i, 1);
			}
		});
	}
	onCallbacks[name].push(func);
	return onCallbacks[name].length - 1;
}

const setTimeout = function (func, _ticks) {
	var ticks__ = 0;
	return {
		id: onCallback('tick', function () {
			ticks__++;
			if (ticks__ >= _ticks) {
				func()
				return 'delete';
			}
		}),
		name: 'tick'
	}
}

const setInterval = function (func, _ticks, _first) {
	if (_first && func()) return;
	var ticks__ = 0;
	return {
		id: onCallback('tick', function () {
			ticks__++;
			if (ticks__ >= _ticks) {
				ticks__ = 0;
				if (func()) return 'delete';
			}
		}),
		name: 'tick'
	}
}

const setTimeoutLocal = function (func, _ticks) {
	var ticks__ = 0;
	return {
		id: onCallback('LocalTick', function () {
			ticks__++;
			if (ticks__ >= _ticks) {
				func()
				return 'delete';
			}
		}),
		name: 'LocalTick'
	}
}

const setIntervalLocal = function (func, _ticks, _first) {
	if (_first && func()) return;
	var ticks__ = 0;
	return {
		id: onCallback('LocalTick', function () {
			ticks__++;
			if (ticks__ >= _ticks) {
				if (func()) return 'delete';
			}
		}),
		name: 'LocalTick'
	}
}

const clearInterval = function (upd) {
	if (upd && upd.id >= 0) {
		onCallbacks[upd.name].splice(upd.id, 1);
		upd = false;
	}
}

function _randomInt(min, max) {
	return Math.floor(min + Math.random() * (max + 1 - min));
}

function _random(min, max) {
	return Math.random() * (max - min) + min;
}

function _find_block_y(coords) {
	for (var i = coords.y; i >= 0; i--) {
		if (World.getBlock(coords.x, i, coords.z).id != 0) return i;
	}
}

function rotateBitmap(__bitmap, __angle) {
	var matrix = new android.graphics.Matrix();
	matrix.postRotate(__angle);
	if (typeof (__bitmap) == 'string') {
		var options = new BitmapFactory.Options();
		options.inPreferredConfig = Bitmap.Config.ARGB_8888;
		__bitmap = BitmapFactory.decodeFile(__dir__ + __bitmap, options);
	}
	return Bitmap.createBitmap(__bitmap, 0, 0, __bitmap.getWidth(), __bitmap.getHeight());
}

const cts = function (coords) {
	return coords.x + (coords.y != undefined ? "," + coords.y : "") + "," + coords.z;
}

const createBitmap = function(__bitmap){
	if (typeof (__bitmap) == 'string') {
		var options = new BitmapFactory.Options();
		options.inPreferredConfig = Bitmap.Config.ARGB_8888;
		__bitmap = BitmapFactory.decodeFile(__dir__ + __bitmap, options);
		return Bitmap.createBitmap(__bitmap, 0, 0, __bitmap.getWidth(), __bitmap.getHeight());
	}
}

const cutBitmap = function(__bitmap, x, y, width, height){
	if (typeof (__bitmap) == 'string') {
		var options = new BitmapFactory.Options();
		options.inPreferredConfig = Bitmap.Config.ARGB_8888;
		__bitmap = BitmapFactory.decodeFile(__dir__ + __bitmap, options);
	}
	return Bitmap.createBitmap(__bitmap, x, y, width, height);
}

if (!Object.assign) {
	Object.defineProperty(Object, 'assign', {
		enumerable: false,
		configurable: true,
		writable: true,
		value: function (target, firstSource) {
			'use strict';
			if (target === undefined || target === null) {
				throw new TypeError('Cannot convert first argument to object');
			}

			var to = Object(target);
			for (var i = 1; i < arguments.length; i++) {
				var nextSource = arguments[i];
				if (nextSource === undefined || nextSource === null) {
					continue;
				}

				var keysArray = Object.keys(Object(nextSource));
				for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
					var nextKey = keysArray[nextIndex];
					var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
					if (desc !== undefined && desc.enumerable) {
						to[nextKey] = nextSource[nextKey];
					}
				}
			}
			return to;
		}
	});
}

const newSides = [
	[0, -1, 0],
	[0, 1, 0],
	[0, 0, -1],
	[0, 0, 1],
	[-1, 0, 0],
	[1, 0, 0]
]

const reverseSides = [1,0,3,2,5,4];

const newSides_ = [
	'0_-1_0',
	'0_1_0',
	'0_0_-1',
	'0_0_1',
   	'-1_0_0',
	'1_0_0'
]

const createAnim = function(_values, _duration, _updateFunc){
	var animation = JAVA_ANIMATOR.ofInt(_values);
	animation.setDuration(_duration);
	if(_updateFunc)animation.addUpdateListener({
		onAnimationUpdate : function(updatedAnim){
			_updateFunc(updatedAnim.getAnimatedValue(), updatedAnim);
		}
	});
	JAVA_HANDLER_THREAD.post({
		run: function(){
			animation.start();
		}
	})
	return animation;
}

const stopAnim = function(_animation){
	if(_animation && _animation.end && _animation.isStarted())JAVA_HANDLER_THREAD.post({
		run: function(){
			_animation.end();
		}
	})
}

const numberWithCommas = function(_num) {
    return _num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getItemUid(item){
	return item.id + '_' + item.data + (item.extra && item.extra.getValue() != 0 ? '_' + item.extra.getValue() : '');
}

function parseItemUid(itemUid){
	var splits = itemUid.split('_');
	return {
		id: splits[0],
		data: splits[1],
		extra: splits[2] || null
	}
}

function eventToScriptable(_event){
	return {y:_event.y, x: _event.x, type: _event.type + "", _x: _event._x, _y:_event._y, localY: _event.localY, localX: _event.localX};
}

function compareSlots(slot1, slot2, extraToString){
	if(slot1.id == slot2.id && slot1.data == slot2.data && slot1.count == slot2.count && (extraToString && slot1.extra && slot2.extra ? fullExtraToString(slot1.extra) == fullExtraToString(slot2.extra) : slot1.extra == slot2.extra)) return true;
	return false;
}

function compareCoords(_coords1, _coords2){
	if(_coords1.x == _coords2.x && _coords1.y == _coords2.y && _coords1.z == _coords2.z) return true;
	return false;
}

function cutNumber(num, forGrid){
	return num > 999 ? (num > 999999 ? (num > 999999999 ? ((num3 = (num/1000000000))%1 && (!forGrid || num3 <= 9.95) ? num3.toFixed(1) : Math.round(num3)) + 'B' : ((num2 = (num/1000000))%1 && (!forGrid || num2 <= 9.95) ? num2.toFixed(1) : Math.round(num2)) + 'M') : ((num2 = (num/1000))%1 && (!forGrid || num2 <= 9.95) ? num2.toFixed(1) : Math.round(num2)) + 'K') : num;
}

var mineColorsMap = {
	'0': android.graphics.Color.rgb(0, 0, 0),
	'1': android.graphics.Color.rgb(0, 0, 170),
	'2': android.graphics.Color.rgb(0, 170, 0),
	'3': android.graphics.Color.rgb(0, 170, 170),
	'4': android.graphics.Color.rgb(170, 0, 0),
	'5': android.graphics.Color.rgb(170, 0, 170),
	'6': android.graphics.Color.rgb(255, 170, 0),
	'7': android.graphics.Color.rgb(170, 170, 170),
	'8': android.graphics.Color.rgb(85, 85, 85),
	'9': android.graphics.Color.rgb(85, 85, 255),
	'a': android.graphics.Color.rgb(85, 255, 85),
	'b': android.graphics.Color.rgb(85, 255, 255),
	'c': android.graphics.Color.rgb(255, 85, 85),
	'd': android.graphics.Color.rgb(255, 85, 255),
	'e': android.graphics.Color.rgb(255, 255, 85),
	'f': android.graphics.Color.rgb(255, 255, 255),
	'g': android.graphics.Color.rgb(221, 214, 5)
}
function parseMineColor(symbol){
	if(symbol[0] == '§') symbol = symbol[1];
	var answ = mineColorsMap[symbol] || android.graphics.Color.WHITE;
	return answ;
}

function fullExtraToString(extra, usenbt){
	if(!extra) return "";
	var str = "";
	if(jsonExtra = extra.asJson()){
		if((_value = jsonExtra.opt('data')) && _value.length() == 0) jsonExtra.remove('data');
		if((_value = jsonExtra.opt('name')) && _value.length() == 0) jsonExtra.remove('name');
		str += jsonExtra.toString();
	}
	//if(usenbt && (tag__1 = extra.getCompoundTag()))str += JSON.stringify(tag__1.toScriptable());
	return str;
}

function checkBlocksOnSides(_blockSource, _coords, _blocks, _toList, _func){
	if(typeof(_coords) != "object"){
		_func = _toList;
		_toList = _blocks;
		_blocks = _coords;
		_coords = _blockSource;
		_blockSource = _coords._blockSource;
	}
	var list = [];
	for (var i in newSides) {
		var coords = {
			x: _coords.x + newSides[i][0],
			y: _coords.y + newSides[i][1],
			z: _coords.z + newSides[i][2]
		}
		var block = _blockSource.getBlock(coords.x, coords.y, coords.z);
		if((!_func || _func(_blockSource, coords, block, _toList ? list : undefined)) && (Array.isArray(_blocks) ? _blocks.indexOf(block.id) != -1 : _blocks == block.id || (_blocks == -1 && block.id != 0)))
			if(_toList)
				list.push(coords); 
			else 
				return coords;
	}
	return _toList ? list : false;
}




// file: getModById.js

/* var ModLoadingOverlay = WRAP_JAVA('com.zhekasmirnov.innercore.ui.ModLoadingOverlay');
//var fps_element = MainGUI.getContentProvider().elementMap.get("fps");
ModLoadingOverlay = new ModLoadingOverlay(UI.getContext());
alert(ModLoadingOverlay);
var clazz = ModLoadingOverlay.getClass();
var field = clazz.getDeclaredField("overlayInstances");
field.setAccessible(true);
var overlayInstances = field.get(ModLoadingOverlay);
var it = overlayInstances.iterator();
var getCurrentText = function(){};
while(it.hasNext()){
    var newOverlay = it.next();
    var _clazz = newOverlay.getClass();
    var _field = _clazz.getDeclaredField("drawable");
    _field.setAccessible(true);
    var drawable = _field.get(newOverlay);
    alert(drawable);
    if (drawable != null) {
        var __clazz = drawable.getClass();
        var __field = __clazz.getDeclaredField("text");
        __field.setAccessible(true);
        getCurrentText = function(){
            return __field.get(drawable);
        }
        alert(getCurrentText());
        break;
    }
}
alert(overlayInstances);
var ModLoader = WRAP_JAVA('com.zhekasmirnov.innercore.mod.build.ModLoader');
ModLoader = ModLoader.instance;
alert(ModLoader.modsList);
function getCurrentMod(){
    var _text = getCurrentText();
    if(_text.indexOf('Running Mods') != -1){
        var _index = Number(_text.substr(14, _text.indexOf('/') - 14)) - 1;
        var _mod = ModLoader.modsList.get(_index);
        return _mod.getName();
    }
}
alert(getCurrentMod()); */




// file: header.js

const DISPLAY = UI.getContext().getWindow().getWindowManager().getDefaultDisplay();
const WorkbenchRecipes = WRAP_JAVA('com.zhekasmirnov.innercore.api.mod.recipes.workbench.WorkbenchRecipeRegistry');
const WorkbenchFieldAPI = WRAP_JAVA('com.zhekasmirnov.innercore.api.mod.recipes.workbench.WorkbenchFieldAPI');
const zhekaCompiler = WRAP_JAVA('com.zhekasmirnov.innercore.mod.executable.Compiler');
const ScriptableObjectHelper = WRAP_JAVA('com.zhekasmirnov.innercore.api.mod.ScriptableObjectHelper');
const JavaFONT = WRAP_JAVA('com.zhekasmirnov.innercore.api.mod.ui.types.Font');
const JavaRect = android.graphics.Rect;
const _setTip = ModAPI.requireGlobal("MCSystem.setLoadingTip");
var RSJava = WRAP_JAVA('com.bot12381.refined.Main');
RSJava = new RSJava();


//Callback.addCallback('LevelLoaded', function(){
	/* var hashSet = new java.util.HashSet();
	WorkbenchRecipes.addRecipesThatContainItem(5, 0, hashSet);
	var it = hashSet.iterator();
	while (it.hasNext()) {
		var jRecipe = it.next();
		var result = jRecipe.getResult();
		alert(Item.getName(result.id, result.data) + ' : ' + result.id + ' : ' + RSJava.isDarkenSlot(jRecipe, {5: [0, 1], 158: [0]}, ['5_0', '158_0']));
	} */
	/* var container = new ItemContainer();
	var items = {};
	var itemsMap = [];
	var onlyItemsMap = {};
	for(var i = 1000; i >= 1; i--){
		var uid = i + '_0';
		items[uid] = {id: i, data: 0, count: 50, extra: null};
		itemsMap.push(uid);
		onlyItemsMap[i] = [0];
		container.setSlot(uid, i, 10, 0);
	} */
	//alert(itemsMap);
	/* var millis = java.lang.System.currentTimeMillis();
	var sorted = RSJava.sortCrafts(items, "-1nullfalse", onlyItemsMap);
	alert('Array sorted on: ' + (java.lang.System.currentTimeMillis() - millis));
	alert(sorted.length);
	var array = ScriptableObjectHelper.createArray(sorted); */
	/* alert(itemsMap);
	var millis = java.lang.System.currentTimeMillis();
	RSJava.sortItems(0, false, container, itemsMap);
	alert('Array sorted on: ' + (java.lang.System.currentTimeMillis() - millis));
	alert(ScriptableObjectHelper.createArray(itemsMap)); */
	/* alert(itemsMap.map(function(value){
		var item_ = container.getSlot(value);
		return Item.getName(item_.id, item_.data);
	}));
	var millis = java.lang.System.currentTimeMillis();
	var sorted = RSJava.sortItems(0, false, 'a', container, itemsMap);
	alert('Array sorted on: ' + (java.lang.System.currentTimeMillis() - millis));
	var array = ScriptableObjectHelper.createArray(sorted);
	alert(array.map(function(value){
		var item_ = container.getSlot(value);
		return Item.getName(item_.id, item_.data);
	})); */
//})

IMPORT("EnergyNet");
IMPORT("StorageInterface");

var Config = {
	reload: function () {
		var reload = Config.reload;
		var write = Config.write;
		Config = FileTools.ReadJSON(__dir__ + 'config.json');
		Config.reload = reload;
		Config.write = write;
	},
	write: function(){
		FileTools.WriteJSON(__dir__ + 'config.json', this, true);
	}
}
Config.reload();

const FE = EnergyTypeRegistry.assureEnergyType("FE", 0.25);
const EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);
const RF = EnergyTypeRegistry.assureEnergyType("RF", 0.25);

const RSgroup = ICRender.getGroup("RefinedStoragePECable");

const GUIs = [];

const runOnUiThread = function(func_, _interval){
	if(_interval)return function(){
		return UI.getContext().runOnUiThread(new java.lang.Runnable({
			run: func_
		}));
	};
	return UI.getContext().runOnUiThread(new java.lang.Runnable({
		run: func_
	}));
}

/* var EMPTY_SAVER = Saver.registerObjectSaver('THIS_IS_EMPTY_SAVER', {
	read: function(){return null},
	save: function(){return null}
}); */

const searchController = function (_coords, _self, _blockSource) {
	if(!_blockSource) _blockSource = _coords.blockSource;
	var outCoords = [];
	outCoords.push(cts(_coords));
	var s = false;
	function _search(coords) {
		var coordss = {};
		for (var i in sides) {
			coordss.x = coords.x + sides[i][0];
			coordss.y = coords.y + sides[i][1];
			coordss.z = coords.z + sides[i][2];
			if (outCoords.indexOf(cts(coordss)) != -1) continue;
			outCoords.push(cts(coordss));
			var bck = _blockSource.getBlock(coordss.x, coordss.y, coordss.z);
			if (bck.id == BlockID.RS_controller) {
				s = coordss;
				return;
			} else if (RS_blocks.indexOf(bck.id) != -1) {
				_search(coordss);
			}
		}
	}
	if(_self){
		var bck = _blockSource.getBlock(_coords.x, _coords.y, _coords.z);
		if (bck.id == BlockID.RS_controller) {
			s = _coords;
			return s;
		}
	}
	_search(_coords);
	return s;
}

const searchController_net = function (net_id) {
	if (net_id == 'f') return false;
	for (var i in RSNetworks[net_id]) {
		if (i != 'info' && RSNetworks[net_id][i].id == BlockID.RS_controller) return RSNetworks[net_id][i].coords;
	}
}

function set_net_for_blocks(_coords, net_id, _self, _first, _defaultActive, _forced, _func) {
	if(Config.dev)Logger.Log('Set net for blocks: coords: ' + cts(_coords) + ' ; net_id: ' + net_id + ' ; _self: ' + _self + ' ; _first: ' + _first + ' ; _defaultActive: ' + _defaultActive + ' ; _forced: ' + _forced, 'RefinedStorageDebug');
	var blockSource_ = _coords.blockSource;
	var outCoords = [];
	outCoords.push(cts(_coords));
	var cableDeleting = [];
	function _search(coords) {
		for (var i in sides) {
			var coordss = {};
			coordss.x = coords.x + sides[i][0];
			coordss.y = coords.y + sides[i][1];
			coordss.z = coords.z + sides[i][2];
			if (outCoords.indexOf(cts(coordss)) != -1) continue;
			outCoords.push(cts(coordss));
			var bck = blockSource_.getBlock(coordss.x, coordss.y, coordss.z);
			var isRsBlock = (RS_blocks.indexOf(bck.id) != -1);
			if (bck.id == BlockID.RS_controller) {
				if(net_id == 'f') continue;
				if(InnerCore_pack.packVersionCode < 120) blockSource_.destroyBlock(coordss.x, coordss.y, coordss.z, true);
				else blockSource_.breakBlock(coordss.x, coordss.y, coordss.z, true);
                if(InnerCore_pack.packVersionCode <= 110)Block.onBlockDestroyed(coordss, bck, false, Player.get());
				continue;
			} else if (bck.id == BlockID.RS_cable) {
				if(net_id != 'f' && RSNetworks[net_id]){
					RSNetworks[net_id][cts(coordss)] = {
						id: BlockID.RS_cable,
						coords: coordss,
						isActive: true
					}
				} else {
					cableDeleting.push(cts(coordss));
				}
				_search(coordss);
			} else if (isRsBlock) {
				var tile = World.getTileEntity(coordss.x, coordss.y, coordss.z, blockSource_) || World.addTileEntity(coordss.x, coordss.y, coordss.z, blockSource_);
				if (tile) {
					if(!_forced && net_id == 'f' && !compareCoords(_coords, tile.data.controller_coords || {})) continue;
					tile.data.controller_coords = {x: _coords.x, y: _coords.y, z: _coords.z};
					tile.update_network(net_id, _first || (_defaultActive != undefined));
					if(_defaultActive)tile.setActive(_defaultActive);
				}
				_search(coordss);
			}
		}
	}
	if(_self){
		var bck = {id: blockSource_.getBlockId(_coords.x, _coords.y, _coords.z)};
		var isRsBlock = RS_blocks.indexOf(bck.id) != -1;
		if (isRsBlock && bck.id != BlockID.RS_controller) {
			if (bck.id == BlockID.RS_cable) {
				if(net_id != 'f' && RSNetworks[net_id]){
					RSNetworks[net_id][cts(_coords)] = {
						id: BlockID.RS_cable,
						coords: _coords,
						isActive: true
					}
				} else {
					cableDeleting.push(cts(_coords));
				}
			} else {
				var tile = World.getTileEntity(_coords.x, _coords.y, _coords.z, blockSource_) || World.addTileEntity(_coords.x, _coords.y, _coords.z, blockSource_);
				if (tile) {
					tile.data.controller_coords = {x: _coords.x, y: _coords.y, z: _coords.z};
					tile.update_network(net_id, _first || (_defaultActive != undefined));
					if(_defaultActive)tile.setActive(_defaultActive);
				}
			}
		}
	}
	_search(_coords);
	if(cableDeleting.length > 0){
		for(var i in RSNetworks){
			for(var k in cableDeleting){
				if(RSNetworks[i][cableDeleting[k]]) delete RSNetworks[i][cableDeleting[k]];
			}
		}
	}
}

function set_is_active_for_blocks(_coords, _state, isController) {
	var blockSource_ = _coords.blockSource;
	var outCoords = [];
	outCoords.push(cts(_coords));
	function _search(coords) {
		for (var i in sides) {
			var coordss = {};
			coordss.x = coords.x + sides[i][0];
			coordss.y = coords.y + sides[i][1];
			coordss.z = coords.z + sides[i][2];
			if (outCoords.indexOf(cts(coordss)) != -1) continue;
			outCoords.push(cts(coordss));
			var bck = {id: blockSource_.getBlockId(coordss.x, coordss.y, coordss.z)};
			if (bck.id == BlockID.RS_controller) {
				continue;
			} else if (RS_blocks.indexOf(bck.id) != -1) {
				var tile = World.getTileEntity(coordss.x, coordss.y, coordss.z, blockSource_);
				if (tile) {
					if(isController && !_state) 
						tile.data.controllerOff = true;
					else
						tile.data.controllerOff = false;
					tile.setActive(_state);
				}
				_search(coordss);
			}
		}
	}
	_search(_coords);
}

function set_is_active_for_blocks_net(net_id, _state, isController, _blockSource) {
	for(var i in RSNetworks[net_id]){
		if(i != 'info' && RSNetworks[net_id][i].id != BlockID.RS_controller){
			var tile = World.getTileEntity(RSNetworks[net_id][i].coords.x, RSNetworks[net_id][i].coords.y, RSNetworks[net_id][i].coords.z, _blockSource);
			if (tile) {
				if(isController) tile.data.controllerOff = !_state;
				tile.setActive(_state);
			}
		}
	}
}

function checkAndSetNetOnCoords(coords, update){
	if(!(controllerCoords = searchController(coords, true)))set_net_for_blocks(coords, 'f', true, false, undefined, true);
	if(update && controllerCoords && (tile = coords.blockSource.getTileEntity(controllerCoords.x, controllerCoords.y, controllerCoords.z)))tile.updateControllerNetwork();
}

function searchBlocksInNetwork(net_id, id){
	var res = [];
	if(!RSNetworks[net_id]) return res;
	for(var i in RSNetworks[net_id]){
		if(RSNetworks[net_id][i] && RSNetworks[net_id][i].id == id){
			res.push(RSNetworks[net_id][i]);
		}
	}
	return res;
}

var DiskData = [false];
Saver.addSavesScope("RSDiskData",
	function read(scope){
		DiskData = scope && scope.DiskData ? scope.DiskData.map(function(elem){
			if(elem){
				if(elem.storage == 'Infinity')elem.storage = Infinity;
				var itemsReplacing = [];
				for(var i in elem.items){
					if(elem.items[i].extra){
						itemsReplacing.push([i, getItemUid(elem.items[i]), elem.items[i]]);
					}
				}
				for(var i in itemsReplacing){
					elem.items[itemsReplacing[i][1]] = itemsReplacing[i][2];
					delete elem.items[itemsReplacing[i][0]];
				}
			}
			return elem;
		}) : [false];
	},

	function save(){
		return {DiskData: DiskData.map(function(elem){
			if(elem && elem.storage == Infinity){
				elem = Object.assign({}, elem);
				elem.storage = 'Infinity';
			}
			return elem;
		})};
	}
);
Callback.addCallback("LevelLeft", function(){
	DiskData = [false];
});

const Disk = {
	getDiskData: function(item){
		if(!this.items[item.id]) return;
		if(!DiskData)DiskData = [false];
		if(item.data && !DiskData[item.data]) DiskData[item.data] = this.getDefaultData(this.items[item.id].storage);
		return DiskData[item.data];
	},
	getDefaultData: function(storage){
		var data = {
			storage: storage,
			items_stored: 0,
			items: {}
		}
		return data;
	},
	getDefaultExtra: function(storage){
		var extra = new ItemExtraData();
		var data = {
			storage: storage,
			items_stored: 0,
			items: {}
		}
		extra.putSerializable('disk_data', data);
		return extra;
	},
	items: {},
	register: function (name, texture, storage, registerItem) {
		for (var i in this.items) {
			if (this.items[i].storage == storage) {
				log('Disk with such storage already exists');
				return  -1;
			}
		}
		var itemIDName = registerItem ? registerItem : "storageDisk" + storage;
		if(registerItem == undefined){
			IDRegistry.genItemID(itemIDName);
			Item.createItem(itemIDName, name, {
				name: texture,
			}, {
				//isTech: true,
				stack: 1
			});
			mod_tip(ItemID[itemIDName]);
		}
		Item.registerNameOverrideFunction(ItemID[itemIDName], function (item, name) {
			var disk_data = DiskData[item.data];
			if(!disk_data) return '§b' + name + "\n§7" + Translation.translate('Stored') + (storage != Infinity ? ': 0/' + storage : ': 0');
			name += "\n§7" + Translation.translate('Stored') + ': ' + disk_data.items_stored + (disk_data.storage != Infinity ? '/' + disk_data.storage : '');
			return name;
		});
		this.items[ItemID[itemIDName]] = { name: name, texture: texture, storage: storage };
		return ItemID[itemIDName];
	},
	update: function (item) {
		var diskData = this.getDiskData(item);
		var items_stored = 0;
		for (var i in diskData.items) {
			var item = diskData.items[i];
			if (!item) return alert('Wow, this is a bad disk');
			items_stored += item.count;
		}
		diskData.items_stored = items_stored;
	},
	freeSpace: function (item) {
		var diskData = this.getDiskData(item);
		return diskData.storage - diskData.items_stored;
	}
}

const UpgradeRegistry = {
	upgrades: {},
	stringIDUpgrades: {},
	/**
	 * Register new upgrade
	 * @param {string} name name of upgrade, used as item name, used if registerItem is not defined
	 * @param {string} nameID string id of the item
	 * @param {string} texture texture name, used if registerItem is not defined
	 * @param {object} params upgrade params
	 * @param {number=} params.maxStack maximum amount of this upgrades in mechanism, if not defined then amount is infinity
	 * @param {function(TileEntity, {id: number, count: number, data: number, extra: object}, ItemContainer, string, number)} params.addFunc Called on upgrade added to slot
	 * @param {function(TileEntity, {id: number, count: number, data: number, extra: object}, ItemContainer, string, number)} params.deleteFunc Called on upgrade deleted from slot 
	 * @param {string} usage energy usage
	 * @param {string} registerItem if this parameter is defined then item not created, use it if you want to create your item
	 * @returns {number} return item id
	 */
	register: function(name, nameID, texture, params, usage, registerItem){
		var itemIDName = registerItem ? registerItem : nameID;
		if(!registerItem){
			IDRegistry.genItemID(itemIDName);
			Item.createItem(itemIDName, name, {
				name: texture,
			}, {
				//isTech: true,
				stack: 64
			});
			mod_tip(ItemID[itemIDName]);
		}
		params.nameID = itemIDName;
		params.usage = usage || 0;
		this.upgrades[ItemID[itemIDName]] = params;
		this.stringIDUpgrades[itemIDName] = params;
		return ItemID[itemIDName];
	},
	/**
	 * Get upgrade data
	 * @param {number|string} id item id or string id(nameID) of upgrade
	 * @returns {object|undefined} return upgrade data or undefined if upgrade with this id is not registered
	 */
	getData: function(id){
		var upgrade = this.upgrades[id] || this.stringIDUpgrades[id];
		if(upgrade) return upgrade;
	},
	/**
	 * Get item string id
	 * @param {number|string} id item id or string id(nameID) of upgrade
	 * @returns {string|undefined} return item string id or undefined if upgrade with this id is not registered
	 */
	getNameID: function(id){
		var upgrade = this.upgrades[id] || this.stringIDUpgrades[id];
		if(upgrade) return upgrade.nameID;
	},
	/**
	 * Get upgrade energy usage
	 * @param {number|string} id item id or string id(nameID) of upgrade
	 * @returns {object|undefined} return upgrade energy usage or undefined if upgrade with this id is not registered
	 */
	getEnergyUsage: function(id){
		var upgrade = this.upgrades[id] || this.stringIDUpgrades[id];
		if(upgrade) return upgrade.usage;
		return 0;
	}
}

var itemsNamesMap = {};

const getItemName = function(id, data, extra){
	var item = {id: id, data: data, extra: extra};
	var itemUid = getItemUid(item);
	if(!itemsNamesMap[itemUid]) itemsNamesMap[itemUid] = Item.getName(id, data, extra);
	return itemsNamesMap[itemUid];
}

var RSNetworks = [];

var RSbannedItems = [0];

const RS_blocks = [];
Callback.addCallback('PostLoaded', function(){
	for(var i in RS_blocks)World.setBlockChangeCallbackEnabled(RS_blocks[i], true);
})
World.setBlockChangeCallbackEnabled(535, true);
World.setBlockChangeCallbackEnabled(250, true);
World.setBlockChangeCallbackEnabled(34, true);
var pistonsPoss = [
	[0, -1, 0],
	[0, 1, 0],
	[0, 0, 1],
	[0, 0, -1],
	[1, 0, 0],
	[-1, 0, 0]
]
var pistonsMove__ = {};
var ignoredParams = ['NETWORK_ID','LAST_NETWORK_ID','controller_coords','createdCalled'];
Callback.addCallback('BlockChanged', function(coords, oldBlock, newBlock, _blockSource){
	//alert('Block changed from: ' + oldBlock.id + "|" + oldBlock.data + " ; to: " + newBlock.id + "|" + newBlock.data);
	_blockSource = BlockSource.getDefaultForDimension(_blockSource);
	coords.blockSource = _blockSource;
	if(oldBlock.id == 535 || newBlock.id == 535 || newBlock.id == 34) {
		var pistonBlockData = newBlock.id == 535 || newBlock.id == 34 ? newBlock.data : oldBlock.data;
		var pistonPos = pistonsPoss[pistonBlockData];
		var from_coords = oldBlock.id == 535 ? {
			x: coords.x + pistonPos[0],
			y: coords.y + pistonPos[1],
			z: coords.z + pistonPos[2]
		} : coords;
		var to_coords = newBlock.id == 535 || newBlock.id == 34 ? {
			x: coords.x + pistonPos[0],
			y: coords.y + pistonPos[1],
			z: coords.z + pistonPos[2]
		} : coords;
		var __tile = World.getTileEntity(from_coords.x, from_coords.y, from_coords.z, _blockSource);
		if(__tile){
			pistonsMove__[cts(to_coords)] = __tile;
		}
	}
	if(oldBlock.id == 250) {
		if((oldTileData = pistonsMove__[cts(coords)]) && (newTileData = World.addTileEntity(coords.x, coords.y, coords.z, _blockSource))){
			for(var i in newTileData.data){
				if(ignoredParams.indexOf(i) == -1){
					newTileData.data[i] = oldTileData.data[i];
				}
			}
			var unsaveableSlotsArray = Array.isArray(oldTileData.unsaveableSlots) ? oldTileData.unsaveableSlots : [];
			if(!oldTileData.unsaveableSlots || unsaveableSlotsArray.length > 0)for(var i in oldTileData.container.slots){
				if(unsaveableSlotsArray.length > 0 && unsaveableSlotsArray.indexOf(i) != -1) continue;
				var _slot = oldTileData.container.slots[i];
				newTileData.container.setSlot(i, _slot.id, _slot.count, _slot.data, _slot.extra);
				oldTileData.container.setSlot(i, 0,0,0,null);
			}
			TileEntity.destroyTileEntity(oldTileData);
			delete pistonsMove__[cts(coords)];
		}
	}
	if (oldBlock.id == BlockID.RS_cable) {
		for(var i in RSNetworks){
			if(RSNetworks[i][cts(coords)]) delete RSNetworks[i][cts(coords)];
		}
	}
	var isOldBlock = RS_blocks.indexOf(oldBlock.id) != -1;
	var isNewBlock = RS_blocks.indexOf(newBlock.id) != -1;
	/* if(isNewBlock && newBlock.id != BlockID.RS_cable){
		var _newTile = World.getTileEntity(coords.x, coords.y, coords.z, _blockSource) || World.addTileEntity(coords.x, coords.y, coords.z, _blockSource);
		if(newBlock.id == BlockID.RS_controller && newBlock.data == 3 && _newTile){
			_newTile.data.isCreative = true;
			_newTile.data.energy = Config.controller.energyCapacity;
		}
	} */
	if(oldBlock.id != BlockID.RS_controller && isOldBlock)for(var i in sides){
		var zCoords = {
			x: coords.x + sides[i][0],
			y: coords.y + sides[i][1],
			z: coords.z + sides[i][2],
			blockSource: _blockSource
		}
		checkAndSetNetOnCoords(zCoords);
	}
	if(newBlock.id == BlockID.RS_cable){
		if((controllerCoords = searchController(coords, true)) && (tile = World.getTileEntity(controllerCoords.x, controllerCoords.y, controllerCoords.z, _blockSource)))tile.updateControllerNetwork();
	}
});

const EnergyUse = {}

var temp_data = {};

Callback.addCallback("LevelLeft", function () {
	temp_data = {};
	RSNetworks = [];
});

const RefinedStorage = {
	paramsMap: {},
	createTile: function (id, params) {
		RSgroup.add(id, -1);
		if(!params.defaultValues) params.defaultValues = {};
		params.defaultValues.NETWORK_ID = 'f';
		params.defaultValues.last_redstone_event = {power: 0};
		params.blockInfo = {
			id: id
		}
		if(!params.client) params.client = {};
		if(!params.client.load) params.client.load = function(){
			if(this.pre_load)this.pre_load();
			if(this.refreshModel)this.refreshModel();
			if(this.post_load)this.pre_load();
		}
		if(!params.client.unload) params.client.unload = function(){
			if(this.pre_unload)this.pre_unload();
			BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
			if(this.post_unload)this.pre_unload();
		}
		if(!params.defaultValues.upgrades)params.defaultValues.upgrades = {};
		if(!params.upgradesSlots)params.upgradesSlots = [];
		if(!params.init){
			params.init = function () {
				//alert(cts(this) + ' : init');
				if(this.pre_init)this.pre_init();
				if(this.data.energy || this.data.energy === 0)this.networkData.putInt('energy', this.data.energy);
				if(!this.data.createdCalled) {
					this.data.NETWORK_ID = 'f';
					this.setActive(false);
				} else {
					var controller = searchController(this, false);
					if (controller) {
						var tile = World.getTileEntity(controller.x, controller.y, controller.z, this.data.blockSource);
						if (tile) {
							tile.data.updateControllerNetwork = true;
							//tile.updateControllerNetwork();
							//if (this.post_created) this.post_created();
						}
					}
				}
				this.networkData.putInt('NETWORK_ID', this.data.NETWORK_ID >= 0 ? this.data.NETWORK_ID : -1);
				this.data.block_data = this.blockSource.getBlockData(this.x, this.y, this.z);
				this.blockInfo.data = this.data.block_data;
				this.networkData.putInt('block_data', this.data.block_data);
				this.networkData.putBoolean('isActive', this.data.isActive || false);
				//if(this.refreshModel)this.refreshModel();
				var tile = this;
				this.container.addServerOpenListener({
					onOpen: function(container, client){
						if(tile.onWindowOpen){
							tile.onWindowOpen(container, client);
						}
					}
				});
				this.container.addServerCloseListener({
					onClose: function(container, client){
						if(tile.onWindowClose){
							tile.onWindowClose(container, client);
						}
					}
				});
				if(this.unsaveableSlots && InnerCore_pack.packVersionCode >= 120){
					if(Array.isArray(this.unsaveableSlots)){
						for(var i in this.unsaveableSlots)this.container.setSlotSavingEnabled(this.unsaveableSlots[i], false);
					} else {
						this.container.setGlobalSlotSavingEnabled(false);
					}
				}
				if(this.upgradesSlots)for(var i in this.upgradesSlots){
					this.container.setSlotAddTransferPolicy(this.upgradesSlots[i], {
						transfer: function(itemContainer, slot, id, count, data, extra, player){
							count = 1;
							if(!(upgrade = UpgradeRegistry.upgrades[id]) || itemContainer.getSlot(slot).id != 0) return 0
							if(tile.data.upgrades[upgrade.nameID]){
								if(upgrade.maxStack && tile.data.upgrades[upgrade.nameID] >= upgrade.maxStack) return 0;
								tile.data.upgrades[upgrade.nameID]++;
							} else {
								tile.data.upgrades[upgrade.nameID] = 1;
							}
							//var networkTile = tile.getNetworkTile();
							//if(networkTile)networkTile.upgrades = tile.data.upgrades;
							if(upgrade.addFunc)upgrade.addFunc(tile, {id: id, count: count, data: data, extra: extra}, itemContainer, slot, player);
							return count;
						}
					})
					this.container.setSlotGetTransferPolicy(this.upgradesSlots[i], {
						transfer: function(itemContainer, slot, id, count, data, extra, player){
							if(!(upgrade = UpgradeRegistry.upgrades[id])) return 0
							if(tile.data.upgrades[upgrade.nameID])tile.data.upgrades[upgrade.nameID]--
							//var networkTile = tile.getNetworkTile();
							//if(networkTile)networkTile.upgrades = tile.data.upgrades;
							if(upgrade.deleteFunc)upgrade.deleteFunc(tile, {id: id, count: count, data: data, extra: extra}, itemContainer, slot, player);
							return count;
						}
					})
				}
				if(this.post_init)this.post_init();
				this.data.createdCalled = false;
				this.networkData.sendChanges();
			}
		}
		if (!params.update_network) {
			params.update_network = function (net_id, _first) {
				if (this.pre_update_network) if(this.pre_update_network(net_id)) return true;
				if(net_id == 'f' && RSNetworks[this.data.NETWORK_ID] && (netElement = RSNetworks[this.data.NETWORK_ID][cts(this)]) && netElement.id == this.blockInfo.id) delete RSNetworks[this.data.NETWORK_ID][cts(this)];
				this.data.LAST_NETWORK_ID = this.data.NETWORK_ID;
				this.data.NETWORK_ID = net_id;
				this.networkData.putInt('NETWORK_ID', net_id != 'f' ? net_id : -1);
				if (net_id != "f" && RSNetworks[net_id]) {
					var coords_this = {
						x: this.x,
						y: this.y,
						z: this.z
					}
					RSNetworks[net_id][cts(this)] = {
						id: this.blockInfo.id,
						coords: coords_this,
						upgrades: this.data.upgrades,
						isActive: this.data.isActive || false
					}
				}
				if(!_first)this.setActive(net_id != "f");
				this.networkData.sendChanges();
				if (this.post_update_network) this.post_update_network(net_id);
			}
		}
		if (!params.created) {
			params.created = function () {
				if(!this.blockSource)this.blockSource = BlockSource.getDefaultForDimension(this.dimension);
				//alert(cts(this) + ' : created');
				//this.data.block_data = this.blockSource.getBlockData(this.x, this.y, this.z);
				this.data.upgrades = {};
				this.data.createdCalled = true;
				if (this.pre_created) this.pre_created();
			}
		}
		if (!params.setActive) {
			params.setActive = function (state, forced, preventRefreshModel) {
				state = this.data.NETWORK_ID != "f" ? !!state : false;
				if(this.data.isActive == state) return false;
				if (this.pre_setActive) if(this.pre_setActive(state)) return false;
				if(state && !this.redstoneAllowActive(this.data.last_redstone_event)) return false;
				if(state == false || (forced || (!this.data.controllerOff && this.data.allowSetIsActive != false))){
					this.data.isActive = state;
					this.networkData.putBoolean('isActive', state);
					if(this.data.NETWORK_ID != "f")RSNetworks[this.data.NETWORK_ID][this.coords_id()].isActive = state
					this.networkData.sendChanges();
					if(this.refreshModel && !preventRefreshModel)this.refreshModel();
					if (this.post_setActive) this.post_setActive(state);
					if(this.refreshGui && !this.setActiveNotUpdateGui)this.refreshGui();
					return true;
				}
			}
		}
		if(!params.redstone){
			params.redstone = function (params) {
				this.data.last_redstone_event = params;
				if(!this.data.redstone_mode) return;
				if(this.redstoneAllowActive(params)){
					this.setActive(true);
				} else {
					this.setActive(false);
				}
				if (this.post_redstone) this.post_redstone(state);
			}
		}
		if(!params.redstoneAllowActive){
			params.redstoneAllowActive = function (params) {
				if(!this.data.redstone_mode) return true;
				if (params.power > 0){
					if(this.data.redstone_mode == 1){
						return true;
					} else if(this.data.redstone_mode == 2){
						return false;
					}
				} else {
					if(this.data.redstone_mode == 1){
						return false;
					} else if(this.data.redstone_mode == 2){
						return true;
					}
				}
			}
		}
		if(!params.refreshRedstoneMode){
			params.refreshRedstoneMode = function () {
				if(this.data.redstone_mode == 0){
					return this.setActive(true);
				} else if(this.redstoneAllowActive(this.data.last_redstone_event)){
					return this.setActive(true);
				} else {
					return this.setActive(false);
				}
			}
		}
		if(!params.coords_id){
			params.coords_id = function () {
				return this.x + ',' + this.y + ',' + this.z;
			}
		}
		if(!params.destroy){
			params.destroy = function(param1){
				if(this.pre_destroy) this.pre_destroy(param1);
				if(this.data.NETWORK_ID != 'f' && RSNetworks[this.data.NETWORK_ID]) delete RSNetworks[this.data.NETWORK_ID][cts(this)];
				this.data.LAST_NETWORK_ID = this.data.NETWORK_ID;
				this.data.NETWORK_ID = 'f';
				//BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
				if(this.post_destroy) this.post_destroy(param1);
			}
		}
		if(!params.isWorkAllowed){
			params.isWorkAllowed = function(){
				if(this.data.NETWORK_ID == "f" || !RSNetworks[this.data.NETWORK_ID] || !this.data.isActive) return false;
				return true;
			}
		}
		if(!params.containerEvents) params.containerEvents = {};
		if(!params.containerEvents.updateRedstoneMode)params.containerEvents.updateRedstoneMode = function(eventData, connectedClient) {
			if(this.data.redstone_mode == undefined) this.data.redstone_mode = 0;
			this.data.redstone_mode = this.data.redstone_mode >= 2 ? 0 : this.data.redstone_mode + 1;
			if(!this.refreshRedstoneMode() && this.refreshGui) this.refreshGui();
		}
		if(!params.getNetworkTile){
			params.getNetworkTile = function () {
				if(this.data.NETWORK_ID != "f" && RSNetworks[this.data.NETWORK_ID] && (answ = RSNetworks[this.data.NETWORK_ID][this.coords_id()])) return answ;
			}
		}
		this.paramsMap[id] = params;
		TileEntity.registerPrototype(id, params);
	},
	copy: function(id1, id2, params){
		RSgroup.add(id2, -1);
		if(!this.paramsMap[id1]) throw '[RefinedStorageError - RefinedStorage.copy] TileEntity with this id is not registered';
		var params1 = Object.assign({}, this.paramsMap[id1]);
		delete params1.tick;
		TileEntity.registerPrototype(id2, Object.assign(params1, params));
	},
	mapTexture: function (coords, texture, meta) {
		meta = meta || 0;
		if (typeof (texture) == 'string') {
			var _texture = [];
			for (var i = 0; i < 6; i++) _texture.push([texture, meta]);
			texture = _texture;
		}
		var render = new ICRender.Model();
		var model = BlockRenderer.createTexturedBlock(texture);
		render.addEntry(model);
		BlockRenderer.mapAtCoords(coords.x, coords.y, coords.z, render);
	},
	createMapBlock: function (name, params, types) {
		Block.createBlock(name, params, types);
		for (var i in params) {
			var texture = params[i].texture;
			var render = new ICRender.Model();
			var model = BlockRenderer.createTexturedBlock(texture);
			render.addEntry(model);
			ItemModel.getFor(BlockID[name], i).setModel(render);
			BlockRenderer.enableCoordMapping(BlockID[name], i, render);
		}
	}
}

function testButtons(elementsS_, initFunc_){
	if(!Config.dev) return;
	var UIHeight = Number(UI.getScreenHeight());
	var y = 20;//562-80-50;
	var start_x = 630;//400 + 200;
	elementsS_['fps'] = {
		type: "fps", 
		x: 10,
		y: 10,
		z: 5
	}
	elementsS_["testButton0"] = {
		type: "button",
		x: start_x,
		y: y,
		z: 100,
		bitmap: 'RS_empty_button',
		bitmap2: 'RS_empty_button_pressed',
		scale:2,
		clicker: {
			onClick: function (itemContainerUiHandler, itemContainer, element) {
				UIHeight -= 100;
				//elementsS_['testText2'].text = UIHeight + '';
				itemContainerUiHandler.setBinding('testText2', 'text', UIHeight + '');
				UI.getScreenHeight = function(){
					return UIHeight;
				}
				initFunc_();
			},
			onLongClick: function (itemContainerUiHandler, itemContainer, element) {
			}
		}
	}
	elementsS_["testButton1"] = {
		type: "button",
		x: start_x + 50,
		y: y,
		z: 100,
		bitmap: 'RS_empty_button',
		bitmap2: 'RS_empty_button_pressed',
		scale:2,
		clicker: {
			onClick: function (itemContainerUiHandler, itemContainer, element) {
				UIHeight -= 10;
				itemContainerUiHandler.setBinding('testText2', 'text', UIHeight + '');
				UI.getScreenHeight = function(){
					return UIHeight;
				}
				initFunc_();
			},
			onLongClick: function (itemContainerUiHandler, itemContainer, element) {
			}
		}
	}
	elementsS_['testText2'] = {
		type: "text",
		x: start_x + 100,
		y: y + 5,
		z: 100,
		text: UI.getScreenHeight() + ''
	}
	elementsS_["testButton3"] = {
		type: "button",
		x: start_x + 180,
		y: y,
		z: 100,
		bitmap: 'RS_empty_button',
		bitmap2: 'RS_empty_button_pressed',
		scale:2,
		clicker: {
			onClick: function (itemContainerUiHandler, itemContainer, element) {
				UIHeight += 10;
				itemContainerUiHandler.setBinding('testText2', 'text', UIHeight + '');
				UI.getScreenHeight = function(){
					return UIHeight;
				}
				initFunc_();
			},
			onLongClick: function (itemContainerUiHandler, itemContainer, element) {
			}
		}
	}
	elementsS_["testButton4"] = {
		type: "button",
		x: start_x + 230,
		y: y,
		z: 100,
		bitmap: 'RS_empty_button',
		bitmap2: 'RS_empty_button_pressed',
		scale:2,
		clicker: {
			onClick: function (itemContainerUiHandler, itemContainer, element) {
				UIHeight += 100;
				itemContainerUiHandler.setBinding('testText2', 'text', UIHeight + '');
				UI.getScreenHeight = function(){
					return UIHeight;
				}
				initFunc_();
			},
			onLongClick: function (itemContainerUiHandler, itemContainer, element) {
			}
		}
	}
};




// file: debugWindow.js

if(Config.dev)(function(){
    var MainGUIElements = {};
    //alert('Pid: ' + android.os.Process.myPid());
    var context = UI.getContext();
    var activityManager = context.getSystemService(context.ACTIVITY_SERVICE);
    var memoryInfo = activityManager.getProcessMemoryInfo([android.os.Process.myPid()]);
    var _X_ = 5;
    (function(){
        MainGUIElements['fps'] = {
            type: "fps", 
            x: _X_,
            z: 100
        };
        MainGUIElements['ram'] = {
            type: "text",
            x: _X_,
            y: 40,
            text: 'RAM Used: 0',
            z: 10,
            font: {
                color: android.graphics.Color.WHITE,
                size: 30,
                shadow: 0.5
            }
        };
        MainGUIElements['tps'] = {
            type: "text",
            x: _X_,
            y: 80,
            text: 'Server TPS: 0',
            z: 10,
            font: {
                color: android.graphics.Color.WHITE,
                size: 30,
                shadow: 0.5
            }
        };
        MainGUIElements['localtps'] = {
            type: "text",
            x: _X_,
            y: 120,
            text: 'Client TPS: 0',
            z: 10,
            font: {
                color: android.graphics.Color.WHITE,
                size: 30,
                shadow: 0.5
            }
        };
        MainGUIElements['ping'] = {
            type: "text",
            x: _X_,
            y: 160,
            text: 'Ping: Infinity',
            z: 10,
            font: {
                color: android.graphics.Color.WHITE,
                size: 30,
                shadow: 0.5
            }
        };
        jSetInterval(function(){
            memoryInfo = activityManager.getProcessMemoryInfo([android.os.Process.myPid()]);
            MainGUIElements['ram'].text = 'RAM Used: ' + (memoryInfo[0].getTotalPss()/1024).toFixed(2) + ' mb';
            //alert(memoryInfo[0].getTotalPss());
        }, 300);
        var lasttime = -1;
        var frame = 0;
        var lasttps = 0
        setInterval(function(){
            var t = Debug.sysTime();
            if (frame++ % 20 == 0) {
                if (lasttime != -1) {
                    tps = Math.round(1000 / (t - lasttime) * 20);
                    //Game.tipMessage(Math.round(tps * 10) / 10 + "tps");
                    if(lasttps != (lasttps = tps))Network.sendToAllClients("RefinedStoragePE.debugTPSmeter", {
                        tps: tps
                    });
                }
                lasttime = t
            }
        }, 1);
        var responseGetted = true;
        Network.addClientPacket("RefinedStoragePE.debugTPSmeter", function(packetData) {
            MainGUIElements['tps'].text = 'Server TPS: ' + (Math.round(packetData.tps * 10) / 10)
        });
        Network.addClientPacket("RefinedStoragePE.pingResponse", function(packetData) {
            MainGUIElements['ping'].text = 'Ping: ' + (Debug.sysTime() - packetData.startTime) + ' ms';
            responseGetted = true;
        });
        Network.addServerPacket("RefinedStoragePE.ping", function(client, packetData) {
            client.send('RefinedStoragePE.pingResponse', {startTime: packetData.startTime});
        });
        jSetInterval(function(){
            if(responseGetted && _LevelDisplayed){
                Network.sendToServer("RefinedStoragePE.ping", {startTime: Debug.sysTime()});
                responseGetted = false;
            } else {
                MainGUIElements['ping'].text = 'Ping: Infinity';
            }
        }, 1500);
        var lasttime1 = -1;
        var frame1 = 0;
        setIntervalLocal(function(){
            var t = Debug.sysTime();
            if (frame1++ % 20 == 0) {
                if (lasttime1 != -1) {
                    tps = Math.round(1000 / (t - lasttime1) * 20);
                    //Game.tipMessage(Math.round(tps * 10) / 10 + "tps")
                    MainGUIElements['localtps'].text = 'Client TPS: ' + Math.round(tps * 10) / 10
                }
                lasttime1 = t
            }
        }, 1)
    })();
    var MainGUI = new UI.Window({
        location: { 
            x: 100, 
            y: 0, 
            width: 300, 
            height: 60
        }, 
        drawing: [{type: 'color', color: android.graphics.Color.argb(76, 76, 76, 100)}/* , {type: "line", x1: 500, y1: 0, x2: 500, y2: 200, width: 2.5, color: android.graphics.Color.WHITE} */],
        elements: MainGUIElements
    });
    //var maxHeight = 1000*MainGUI.getLocation().getWindowHeight/MainGUI.getLocation().getWindowWidth;
    Callback.addCallback("LevelLeft", function () {
        MainGUIElements['tps'].text = 'Server TPS: 0';
        MainGUIElements['localtps'].text = 'Client TPS: 0';
        MainGUIElements['ping'].text = 'Ping: Infinity';
    });
    MainGUI.setAsGameOverlay(true);
    MainGUI.setTouchable(false);
    var fps_element = MainGUI.getContentProvider().elementMap.get("fps");
    var clazz = fps_element.getClass().getSuperclass();
    var field = clazz.getDeclaredField("font");
    field.setAccessible(true);
    var fontParam = field.get(fps_element);
    fontParam.size = parseFloat(30);
    MainGUI.open();
})();




// file: translate.js

Translation.addTranslation("Search", { ru: "Поиск" });
Translation.addTranslation("Type here item name", { ru: "Введите название предмета" });
Translation.addTranslation("Please type the keywords", { ru: "Введите ключевое слово" });
Translation.addTranslation("Refined Storage", {"de":"Refined Storage","fr":"Refined Storage","ko":"Refined Storage","nl":"Refined Storage","pt":"Refined Storage","ru":"Refined Storage","zh":"Refined Storage"});
Translation.addTranslation("Refined Storage Covers", {"de":"Refined Storage Fassaden","ru":"Refined Storage: Крышки","zh":"Refined Storage: 伪装板"});
Translation.addTranslation("Focus Grid Search Bar", {"de":"Konsolensuchleiste Selektieren","es":"Panel de búsqueda Centrada ","fr":"bar de recherche de la grille","ko":"그리드 검색","pt":"Ir para a barra de pesquisa da grade.","ru":"Фокусировка на панели поиска","zh":"跳转终端搜索条"});
Translation.addTranslation("Clear Grid Crafting Matrix", {"de":"Werkbank in der Konsole leeren","es":"Limpiar Matriz del Panel de Fabricación","ru":"Очистить сетку создания","zh":"清空合成网格"});
Translation.addTranslation("Controller", {"de":"Kontrollblock","es":"Controlador","fr":"Contrôleur","ko":"컨트롤러","nl":"Controller","pt":"Controlador","ru":"Контроллер","zh":"控制器"});
Translation.addTranslation("Creative Controller", {"de":"Kreativ-Kontrollblock","es":"Controlador Creativo","fr":"Contrôleur","ko":"크리에이티브 컨트롤러","nl":"Creative Controller","pt":"Controlador (Modo Criativo)","ru":"Творческий контроллер","zh":"创造控制器"});
Translation.addTranslation("Grid", {"de":"Konsole","es":"Panel","fr":"Grille","ko":"그리드","nl":"Rooster","pt":"Grade","ru":"Терминал","zh":"终端"});
Translation.addTranslation("Craft", {"de":"Herstellen","es":"Fabricar","fr":"Craft","ko":"제작","nl":"Craft","pt":"Fabricar","ru":"+","zh":"合成"});
Translation.addTranslation("Crafting Grid", {"de":"Fertigungskonsole","es":"Panel de Fabricación","fr":"Grille pour les crafts","pt":"Grade de Fabricações","ru":"Терминал","zh":"合成终端"});
Translation.addTranslation("Pattern Grid", {"de":"Vorlagenkonsole","es":"Panel de Patrones","fr":"Grille de modèle","pt":"Grade de Padrões","ru":"Терминал","zh":"模板终端"});
Translation.addTranslation("Create", {"de":"Vorlage herstellen","es":"Crear Patrón","fr":"Créer des modèles","ko":"패턴 제작","nl":"Patroon maken","pt":"Criar Padrão","ru":"Создать шаблон","zh":"写入磁盘"});
Translation.addTranslation("Fluid Grid", {"de":"Flüssigkeitskonsole","es":"Panel de Fluidos","fr":"Grille des fluides","ko":"액체 그리드","nl":"Vloeistof Rooster","pt":"Grade de Fluidos","ru":"Терминал","zh":"流体终端"});
Translation.addTranslation("Item amount", {"de":"Menge an Items","ru":"Количество предмета","zh":"物品数量"});
Translation.addTranslation("Fluid amount in mB", {"de":"Flüssigkeitsmenge in mB","ru":"Количество жидкости в mB","zh":"流体量以mB为单位"});
Translation.addTranslation("Drive", {"de":"Laufwerk","es":"Deposito","fr":"Lecteur de disques","ko":"디스크 드라이브","nl":"Schijf","pt":"Drive","ru":"Привод","zh":"驱动器"});
Translation.addTranslation("Disks", {"de":"Speicherplatten","es":"Depósitos","fr":"Disques","ko":"디스크","pt":"Discos","ru":"Диски","zh":"磁盘"});
Translation.addTranslation("External Storage", {"de":"Externer Speicher","es":"Almacén Externo","fr":"Stockage externe","ko":"외부 저장 포트","nl":"Externe Opslag","pt":"Armazenamento Externo","ru":"Внешнее хранилище","zh":"外部存储总线"});
Translation.addTranslation("Importer", {"de":"Importierer","es":"Importador","fr":"Importeur","ko":"입력 포트","nl":"Importeur","pt":"Importador","ru":"Импортер","zh":"输入总线"});
Translation.addTranslation("Exporter", {"de":"Exportierer","es":"Exportador","fr":"Exporteur","ko":"출력 포트","nl":"Exporteur","pt":"Exportador","ru":"Экспортер","zh":"输出总线"});
Translation.addTranslation("Detector", {"de":"Detektor","es":"Detector","fr":"Detecteur","ko":"감지기","nl":"Detector","pt":"Detector","ru":"Датчик","zh":"网络物品检测器"});
Translation.addTranslation("Destructor", {"de":"Destruktor","es":"Destructor","fr":"Destructeur","ko":"파괴기","nl":"Destructor","pt":"Destruidor","ru":"Разрушитель","zh":"破坏面板"});
Translation.addTranslation("Constructor", {"de":"Konstruktor","es":"Constructor","fr":"Constructeur","ko":"설치기","nl":"Constructor","pt":"Construtor","ru":"Строитель","zh":"成型面板"});
Translation.addTranslation("Relay", {"de":"Relais","es":"Relé","fr":"Relais","ko":"중계기","nl":"Relais","pt":"Retransmissor","ru":"Реле","zh":"继电器"});
Translation.addTranslation("Interface Import", {"de":"Importschnittstelle","es":"Interfaz de Entrada","fr":"Interface d'import","ko":"인터페이스 입력","nl":"Interface Import","pt":"Importação da Interface","ru":"Импорт","zh":"输入端"});
Translation.addTranslation("Interface Export", {"de":"Exportschnittstelle","es":"Interfaz de Salida","fr":"Interface d'export","ko":"인터페이스 출력","nl":"Interface Export","pt":"Exportação da Interface","ru":"Экспорт","zh":"输出端"});
Translation.addTranslation("Crafting Monitor", {"de":"Fertigungsmonitor","es":"Monitor de fabricación","fr":"Moniteur de craft","ko":"조합 모니터","nl":"Crafting Monitor","pt":"Monitor de Fabricações","ru":"Монитор создания","zh":"合成监控处理器"});
Translation.addTranslation("Wireless Crafting Monitor", {"de":"Mobile Fertigungskonsole","es":"Monitor Remoto de Fabricación","fr":"Moniteur de craft sans-fil","ko":"무선 조합 모니터","pt":"Monitor de Fabricações Wireless","ru":"Беспроводной монитор создания","zh":"无线合成监控处理器"});
Translation.addTranslation("Requested", {"de":"angefragt","ru":"Требует","zh":"需要"});
Translation.addTranslation("Stored", {"de":"Gespeichert","ru":"Запасено","zh":"已存储"});
Translation.addTranslation("Missing", {"de":"Fehlt","ru":"Отсутствует","zh":"缺失"});
Translation.addTranslation("Processing", {"de":"Verarbeitung","ru":"Обработка","zh":"处理中"});
Translation.addTranslation("Scheduled", {"de":"Geplant","ru":"Запланировано","zh":"已调度"});
Translation.addTranslation("Crafting", {"de":"Fertigung","ru":"Создание","zh":"合成中"});
Translation.addTranslation("Machine doesn't accept item", {"de":"Maschine akzeptiert Item nicht","ru":"Машина не принимает предмет","zh":"机器不接受物品"});
Translation.addTranslation("Machine doesn't accept fluid", {"de":"Maschine akzeptiert Flüssigkeit nicht","ru":"Машина не принимает жидкость","zh":"机器不接受流体"});
Translation.addTranslation("No machine found", {"de":"Keine Maschine gefunden","es":"Maquina no Hallada","fr":"Pas de machine disponible","ko":"기계를 찾을 수 없음","nl":"Geen machine gevonden","pt":"Nenhuma máquina encontrada","ru":"Машина не найдена","zh":"找不到机器"});
Translation.addTranslation("Crafter is locked", {"de":"Fertiger ist gesperrt","ru":"Крафтер заблокирован","zh":"合成被锁定"});
Translation.addTranslation("Wireless Transmitter", {"de":"Funksender","es":"Emisor inalámbrico","fr":"Emetteur sans-fil","ko":"무선 송신기","nl":"Draadloze Zender","pt":"Transmissor Wireless","ru":"Беспроводной передатчик","zh":"无线访问点"});
Translation.addTranslation("block(s)", {"de":"Blöcke","es":"bloque(s)","fr":"bloc(s)","ko":"블럭","nl":"blokken","pt":"Blocos","ru":"блок(ов)","zh":"方块"});
Translation.addTranslation("Crafter", {"de":"Fertigungseinheit","es":"Fabricador","fr":"Crafteur","ko":"조합기","nl":"Crafter","pt":"Fabricador","ru":"Крафтер","zh":"装配室"});
Translation.addTranslation("Filter", {"de":"Filter","es":"Filtro","fr":"Filtre","ko":"필터","nl":"Filter","pt":"Filtro","ru":"Фильтр","zh":"终端过滤"});
Translation.addTranslation("Damage", {"de":"Schaden","es":"Daño","fr":"Dommage","ko":"데미지","nl":"Schade","pt":"Dano","ru":"Урон","zh":"耐久"});
Translation.addTranslation("NBT", {"de":"NBT","es":"NBT","fr":"NBT","ko":"NBT","nl":"NBT","pt":"NBT","ru":"NBT","zh":"NBT"});
Translation.addTranslation("Mod filter", {"de":"Mod Filter","es":"Filtro de Mods","fr":"Filtre de mod","ko":"모드 필터","pt":"Filtrar Mod","ru":"Фильтр по моду","zh":"Mod过滤"});
Translation.addTranslation("Network Transmitter", {"de":"Netzwerksender","es":"Emisor de Red","fr":"Emetteur réseau","ko":"네트워크 송신기","nl":"Netwerkzender","pt":"Transmissor de Rede","ru":"Сетевой передатчик","zh":"网络变送器"});
Translation.addTranslation("block(s)", {"de":"Blöcke","es":"bloque(s)","fr":"bloc(s)","ko":"블럭","nl":"blokken","pt":"Blocos","ru":"блоков","zh":"个方块"});
Translation.addTranslation("Dimension", {"de":"Dimension","es":"Dimensión","fr":"Dimension","ko":"월드","nl":"Dimensie","pt":"Dimensão","ru":"Измерение","zh":"维度"});
Translation.addTranslation("Missing Network Card", {"de":"Fehlende Netzwerk Karte","es":"Falta Tarjeta de Red","fr":"Carte réseau manquante","ko":"부족한 네트워크 카드","nl":"Geen Netwerkkaart","pt":"Ausência de Cartão de Rede","ru":"Не найдена сетевая карта","zh":"缺失网卡"});
Translation.addTranslation("Fluid Interface", {"de":"Flüssigkeitsschnittstelle","es":"Interfaz de Fluidos","fr":"Interface de fluides","ko":"액체 인터페이스","nl":"Vloeistof Interface","pt":"Interface de Fluidos","ru":"Жидкостный интерфейс","zh":"流体面板"});
Translation.addTranslation("In", {"de":"Ein","es":"Entrada","fr":"Entrée","ko":"입력","nl":"In","pt":"Entrada","ru":"В","zh":"输入"});
Translation.addTranslation("Out", {"de":"Aus","es":"Salida","fr":"Sortie","ko":"출력","nl":"Uit","pt":"Saída","ru":"Из","zh":"输出"});
Translation.addTranslation("Crafting Preview", {"de":"Fertigungsvorschau","es":"Avance de Fabricación","fr":"Aperçu de craft","ko":"제작 미리보기","pt":"Pré-visualização da Fabricação","ru":"Предварительный просмотр","zh":"合成预览"});
Translation.addTranslation("To craft", {"de":"Herzustellen","es":"Para fabricar","fr":"A craft","ko":"제작할 아이템","pt":"Para fabricar","ru":"Создать","zh":"制作："});
Translation.addTranslation("Available", {"de":"Verfügbar","es":"Disponible","fr":"Disponible","ko":"사용 가능","pt":"Disponível","ru":"Доступно","zh":"可用："});
Translation.addTranslation("Missing", {"de":"Fehlt","es":"Falta","fr":"Manquant","ko":"부족","pt":"Ausência de","ru":"Отсутствует","zh":"缺失："});
Translation.addTranslation("Request failed", {"de":"Anfrage fehlgeschlagen","es":"No puede fabricar","ru":"Не удается создать","zh":"请求失败"});
Translation.addTranslation("One of the crafting ingredients ended up needing", {"de":"Eine benötigte Resource braucht","es":"Uno de los objetos de creación termino faltando","ru":"Один из ингредиентов для крафта оказался нуждающимся","zh":"其中一种制作成分最终需要"});
Translation.addTranslation("itself.", {"de":"sich selbst.","es":"sí mismo.","ru":"в себе.","zh":"自己."});
Translation.addTranslation("You need to remove the pattern or make sure", {"de":"Entferne diese Vorlage um sicherzugehen","es":"Necesita remover el patrón o revisarlo","ru":"Вам нужно удалить шаблон или убедиться, что","zh":"您需要删除该模式或确保"});
Translation.addTranslation("the pattern is not used during crafting.", {"de":"dass sie nicht zur Herstellung verwendet wird.","es":"el patrón no se usa para la fabricación.","ru":"шаблон не используется во время обработки.","zh":"在制作过程中不使用模式."});
Translation.addTranslation("Offending pattern:", {"de":"Fehlerhafte Vorlage:","es":"Patrón ofensivo:","ru":"Нарушение шаблона:","zh":"违规模式:"});
Translation.addTranslation("The crafting task calculation was too complex", {"de":"Die Berechnung der Fertigung war zu komplex","ru":"Расчет крафтовой задачи был слишком сложным","zh":"制作任务计算过于复杂，"});
Translation.addTranslation("and was stopped to avoid server strain.", {"de":"und wurde angehalten um Serverleistung zu sparen.","ru":"и был остановлен, чтобы избежать нагрузки на сервер.","zh":"并且已停止以缓解服务器压力。"});
Translation.addTranslation("Reader", {"de":"Lesegerät","es":"Lector","fr":"Scanneur","ko":"수신기","pt":"Leitor","ru":"Устройство чтения","zh":"读取器"});
Translation.addTranslation("Writer", {"de":"Schreibgerät","es":"Escritor","fr":"Imprimeur","ko":"송신기","pt":"Escritor","ru":"Устройство записи","zh":"写入器"});
Translation.addTranslation("Security Manager", {"de":"Sicherheitsmanager","es":"Centro de Seguridad","fr":"Poste de sécurité","ko":"보안 관리자","pt":"Gerente de Segurança","ru":"Менеджер безопасности","zh":"权限管理器"});
Translation.addTranslation("Configure", {"de":"Konfiguriere","es":"Configurar","fr":"Configure","ko":"설정","pt":"Configurar","ru":"Конфигурировать","zh":"配置"});
Translation.addTranslation("Insert", {"de":"Einfügen","es":"Insertar","fr":"Insère","ko":"보관하기","pt":"Inserir","ru":"Вставить","zh":"输入"});
Translation.addTranslation("Inserting items to the network", {"de":"Items in das Netzwerk einfügen","es":"Insertar objetos a la red","fr":"Insertion d'items dans le réseau","ko":"네트워크에 아이템 넣기","pt":"Inserindo itens na rede","ru":"Вставка предметов в сеть","zh":"向网络中输入物品"});
Translation.addTranslation("Extract", {"de":"Extrahieren","es":"Extraer","fr":"Extrait","ko":"꺼내기","pt":"Extrair","ru":"Извлечь","zh":"输出"});
Translation.addTranslation("Extracting items from the network", {"de":"Items aus dem Netz herausholen","es":"Extraer objetos de la red","fr":"Extraction d'items du réseau","ko":"네트워크에서 아이템 가져오기","pt":"Extraindo itens da rede","ru":"Извлечение предметов из сети","zh":"从网络中输出物品"});
Translation.addTranslation("Autocrafting", {"de":"Automatisches Herstellen","es":"Autofabricar","fr":"Autocraft","ko":"자동 조합하기","pt":"Auto-fabricação","ru":"Автосоздание","zh":"自动合成"});
Translation.addTranslation("Starting, cancelling and viewing crafting tasks", {"de":"Fertigungsprozesse starten, abbrechen und überwachen","es":"Comenzar, cancelar y ver tareas de fabricación","fr":"Lance, annule et voit les taches de crafts","ko":"자동 조합 시작, 중지 및 현재 작업 보기","pt":"Iniciando, cancelando e visualizando tarefas de fabricação","ru":"Запуск, отмена и просмотр задач создания","zh":"开始、取消、预览合成任务"});
Translation.addTranslation("Modify", {"de":"Modifizieren","es":"Modificar","fr":"Modifie","ko":"수정","pt":"Modificar","ru":"Изменять","zh":"修改"});
Translation.addTranslation("Opening block GUIs", {"de":"Auf Block GUIs zugreifen","es":"Abrir Interfaz de bloque","fr":"Ouvre l'interface des blocks","ko":"네트워크 상의 GUI 열기","pt":"Abrindo interfaces do bloco","ru":"Открытие блока интерфейсов","zh":"打开方块的GUI"});
Translation.addTranslation("Build", {"de":"Bauen","es":"Construir","fr":"Construit","ko":"조작","pt":"Fabricar","ru":"Строить","zh":"操纵"});
Translation.addTranslation("Adding or removing devices to or from the network", {"de":"Geräte zum Netzwerk hinzufügen oder entfernen","es":"Añadir o remover disposotivos de o desde la red","fr":"Ajoute ou enlève des appareils sur le réseau","ko":"네트워크에 장치를 추가하거나 제거하기","pt":"Adicionando ou removendo dispositivos para ou a partir da rede","ru":"Добавление или удаление устройств в сеть или из сети","zh":"向网络中添加、移除设备"});
Translation.addTranslation("Security", {"de":"Sicherheit","es":"Seguridad","fr":"Securité","ko":"보안","pt":"Segurança","ru":"Безопасность","zh":"安全"});
Translation.addTranslation("Ability to change security options", {"de":"Sicherheitseinstellungen ändern","es":"Abilidad de cambiar opciones de seguridad","fr":"Capable de modifier les options de sécurité","ko":"보안 옵션 조정하기","pt":"Capacidade de alterar as opções de segurança","ru":"Возможность изменения параметров безопасности","zh":"改变安全选项"});
Translation.addTranslation("Storage Monitor", {"de":"Lagermonitor","es":"Monitor de Almacén","fr":"Storage Moniteur","ko":"저장 모니터","pt":"Monitor de Armazenamento","ru":"Монитор хранения","zh":"存储监控器"});
Translation.addTranslation("Portable Grid", {"de":"Mobile Konsole","es":"Panel Portátil","fr":"Grille portable","ko":"휴대용 그리드","pt":"Grade Portátil","ru":"Портативный терминал","zh":"便携式终端"});
Translation.addTranslation("Crafter Manager", {"de":"Vorlagenmanager","ru":"Менеджер создания","zh":"合成管理器"});
Translation.addTranslation("Usage", {"de":"Verbrauch","es":"Uso","fr":"Usage","ko":"사용","nl":"Vebruik","pt":"Uso","ru":"Используется","zh":"使用"});
Translation.addTranslation("Stored", {"de":"Belegt","es":"Guardado","fr":"Stored","ko":"저장량","nl":"Opgeslagen","pt":"Stored","ru":"Запасено","zh":"已存储"});
Translation.addTranslation("full", {"de":"belegt","es":"lleno","fr":"plein","ko":"가득 참","nl":"vol","pt":"Cheio","ru":"полный","zh":"已使用"});
Translation.addTranslation("Linked to", {"de":"Verbungen mit","es":"Enlazado a","fr":"Linked to","ko":"로 연결됨","nl":"Gelinkt aan","pt":"Ligado a","ru":"Привязано к","zh":"连接到"});
Translation.addTranslation("There is no Wireless Transmitter in range.", {"de":"Kein Funksender in Reichweite","es":"No hay Emisor de Red en rango.","fr":"Pas d'émetteur sans-fil à portée.","ko":"근방에 무선 송신기가 없습니다.","nl":"Er is geen Draadloze Zender binnen bereik.","pt":"Não há Transmissor Wireless no alcance.","ru":"В диапазоне нет беспроводного передатчика.","zh":"在范围内没有可以接入的无线访问点."});
Translation.addTranslation("Controller not found.", {"de":"Kontrollblock nicht gefunden.","es":"No se encontró un Controlador.","fr":"Controlleur introuvable.","ko":"컨트롤러를 찾을 수 없습니다.","nl":"Controller niet gevonden.","pt":"Controlador não encontrado.","ru":"Контроллер не найден.","zh":"没寻找到控制器."});
Translation.addTranslation("Linked to", {"de":"Verbunden mit","es":"Enlazado a","fr":"Linked to","ko":"로 연결됨","nl":"Gelinkt aan","pt":"Ligado a","ru":"Привязано к","zh":"连接到"});
Translation.addTranslation("Inputs", {"de":"Ausgangsmaterialien","es":"Entradas","fr":"Entrée","ko":"입력","nl":"Inputs","pt":"Entradas","ru":"Входы","zh":"输入"});
Translation.addTranslation("Outputs", {"de":"Ergebnis","es":"Salidas","fr":"Sortie","ko":"출력","nl":"Outputs","pt":"Saídas","ru":"Выходы","zh":"输出"});
Translation.addTranslation("Invalid pattern", {"de":"Ungültige Vorlage","es":"patrón invalido","fr":"Modèle invalide","ko":"잘못된 패턴","nl":"Ongeldig patroon","pt":"Padrão inválido","ru":"Недопустимый шаблон","zh":"无效模式"});
Translation.addTranslation("Uses ore dictionary", {"de":"Benutze Ore-Dictionary","es":"Usar diccionario de minerales","fr":"Utilise l'ore dictionary","ko":"Ore Dictionary 사용","nl":"Gebruikt de ore dictionary","pt":"Usar Ore dictionary","ru":"Использует рудный словарь","zh":"使用矿物辞典"});
Translation.addTranslation("You have no permission to perform that action.", {"de":"Du hast keine Berechtigung dafür.","es":"No tienes permiso de realizar esa acción.","fr":"Vous n'avez pas l'autorisation de faire cette action.","ko":"해당 작업을 실행할 권한이 없습니다.","pt":"Você não tem permissão para executar essa ação.","ru":"У вас нет разрешения на выполнение этого действия.","zh":"你没有权限进行此操作"});
Translation.addTranslation("Start", {"de":"Start","es":"Empezar","fr":"Commencer","ko":"시작","nl":"Start","pt":"Começar","ru":"Начать","zh":"开始"});
Translation.addTranslation("Clear", {"de":"Löschen","es":"Limpiar","fr":"Vider","ko":"초기화","nl":"Legen","pt":"Esvaziar","ru":"Очистить","zh":"清除"});
Translation.addTranslation("Set", {"de":"Setzen","es":"Poner","fr":"Fixer","ko":"설정","pt":"Definir","ru":"Установить","zh":"设置"});
Translation.addTranslation("Cancel All", {"de":"Alles Anhalten","es":"Cancelar todo","fr":"Tout annuler","ko":"모두 취소","nl":"Annuleer alles","pt":"Cancelar tudo","ru":"Отменить все","zh":"取消所有"});
Translation.addTranslation("Priority", {"de":"Priorität","es":"Prioridad","fr":"Priorité","ko":"우선 순위","nl":"Prioriteit","pt":"Prioridade","ru":"Приоритет","zh":"优先级"});
Translation.addTranslation("Oredict", {"de":"Ore-Dictionary","es":"Diccionario de minerales","fr":"Oredict","ko":"Ore Dictionary","pt":"Oredict","ru":"Словарь руды","zh":"矿物辞典"});
Translation.addTranslation("Processing", {"de":"Verarbeitung","es":"Procesándose","fr":"En Traitement","pt":"Processamento","ru":"Обработка","zh":"进行中"});
Translation.addTranslation("Redstone strength", {"de":"Redstone Stärke","es":"Fuerza de señal","fr":"Redstone strength","ko":"레드스톤 강도","pt":"Força de redstone","ru":"Сила красного камня","zh":"红石强度："});
Translation.addTranslation("total", {"de":"insgesamt","es":"total","ru":"всего","zh":"总共"});
Translation.addTranslation("Last modified just now by", {"de":"Zuletzt geändert: Gerade eben von","es":"Último cambio justo ahora por","ru":"Последнее изменение только что","zh":"刚刚被操作"});
Translation.addTranslation("Last modifiedsecond ago by", {"de":"Zuletzt geändert: VorSekunde von","es":"Último cambiohace un segundo por","ru":"Последнее изменениесекунду назад","zh":"秒前被操作"});
Translation.addTranslation("Last modifiedseconds ago by", {"de":"Zuletzt geändert: VorSekunden von","es":"Último cambiohace unos segundos por","ru":"Последнее изменениесекунд назад","zh":"秒前被操作"});
Translation.addTranslation("Last modifiedminute ago by", {"de":"Zuletzt geändert: VorMinute von","es":"Último cambiohace un minuto por","ru":"Последнее изменениеминуту назад","zh":"分钟前被操作"});
Translation.addTranslation("Last modifiedminutes ago by", {"de":"Zuletzt geändert: VorMinuten von","es":"Último cambiohace unos minutos por","ru":"Последнее изменениеминут назад","zh":"分钟前被操作"});
Translation.addTranslation("Last modifiedhour ago by", {"de":"Zuletzt geändert: VorStunde von","es":"Último cambiohace una hora por","ru":"Последнее изменениечас назад","zh":"小时前被操作"});
Translation.addTranslation("Last modifiedhours ago by", {"de":"Zuletzt geändert: VorStunden von","es":"Último cambiohace unas horas por","ru":"Последнее изменениечасов назад","zh":"小时前被操作"});
Translation.addTranslation("Last modifiedday ago by", {"de":"Zuletzt geändert: VorTag von","es":"Último cambiohace una día por","ru":"Последнее изменениедень назад","zh":"天前被操作"});
Translation.addTranslation("Last modifieddays ago by", {"de":"Zuletzt geändert: VorTagen von","es":"Último cambiohace unos días por","ru":"Последнее изменениедней назад","zh":"天前被操作"});
Translation.addTranslation("Last modifiedweek ago by", {"de":"Zuletzt geändert: VorWoche von","es":"Último cambiohace una semana por","ru":"Последнее изменениенеделю назад","zh":"周前被操作"});
Translation.addTranslation("Last modifiedweeks ago by", {"de":"Zuletzt geändert: VorWochen von","es":"Último cambiohace semanas por","ru":"Последнее изменениенедель назад","zh":"周前被操作"});
Translation.addTranslation("Last modifiedyear ago by", {"de":"Zuletzt geändert: VorJahr von","es":"Último cambiohace un año por","ru":"Последнее изменениегод назад","zh":"年前被操作"});
Translation.addTranslation("Last modifiedyears ago by", {"de":"Zuletzt geändert: VorJahren von","es":"Último cambiohace años por","ru":"Последнее изменениелет назад","zh":"年前被操作"});
Translation.addTranslation("Use damage", {"de":"Beachte Schaden","es":"Comparar daño","fr":"Compare les dommages","ko":"데미지 비교","nl":"Vergelijken op schade","pt":"Comparar Danos","ru":"Использовать урон","zh":"耐久匹配"});
Translation.addTranslation("Use NBT", {"de":"Beachte NBT","es":"Compare NBT","fr":"Compare la NBT","ko":"NBT 데이터 비교","nl":"Vergelijken op NBT","pt":"Comparar NBT","ru":"Использовать NBT","zh":"NBT匹配"});
Translation.addTranslation("Redstone mode", {"de":"Redstone Modus","es":"Modo de señal","fr":"Mode Redstone ","ko":"레드스톤 모드","nl":"Redstone Mode","pt":"Modo de redstone","ru":"Режим редстоуна","zh":"红石模式"});
Translation.addTranslation("Ignore redstone signal", {"de":"Ignoriere Redstone Signal","es":"Ignorar señal de redstone","fr":"Ignore le signal de redstone","ko":"신호와 상관 없이 작동","nl":"Redstone negeren","pt":"Ignorar o sinal de redstone","ru":"Игнорировать редстоун сигнал","zh":"忽略红石信号"});
Translation.addTranslation("Only work with redstone signal", {"de":"Nur mit Redstone Signal","es":"Trabajar solo con señal de redstone","fr":"Actif seulement avec signal de redstone","ko":"신호를 받을 때 작동","nl":"Alleen werken met redstone signaal","pt":"Apenas funcionar com sinal de redstone","ru":"Работать только с редстоун сигналом","zh":"有红石信号时工作"});
Translation.addTranslation("Only work without redstone signal", {"de":"Nur ohne Redstone Signal","es":"Trabajar solo sin señal de redstone","fr":"Actif seulement sans signal de redstone","ko":"신호를 받지 않을 때 작동","nl":"Alleen werken zonder redstone signaal","pt":"Apenas funcionar sem sinal de redstone","ru":"Работать только без редстоун сигнала","zh":"无红石信号时工作"});
Translation.addTranslation("Crafter mode", {"de":"Redstone Modus","ru":"Режим создания","zh":"合成模式"});
Translation.addTranslation("Ignore redstone signal", {"de":"Ignoriere Redstone Signal","ru":"Игнорировать сигнал редстоун","zh":"无视红石信号"});
Translation.addTranslation("Redstone signal unlocks autocrafting", {"de":"Redstone Signal schaltet Autofertigung frei","ru":"Сигнал редстоун разблокирует автосоздание","zh":"红石信号解锁自动合成"});
Translation.addTranslation("Redstone signal locks autocrafting", {"de":"Redstone Signal sperrt Autofertigung","ru":"Сигнал редстоун блокирует автосоздание","zh":"红石信号锁定自动合成"});
Translation.addTranslation("Redstone pulse inserts next set", {"de":"Redstone Impuls fügt nächstes Rezept ein","ru":"Импульс редстоун вставляет следующий набор","zh":"红石脉冲插入下一组"});
Translation.addTranslation("Display", {"de":"Anzeige","es":"Pantalla","fr":"Affiche","ko":"표시","nl":"Weergave","pt":"Exibição","ru":"Отображение","zh":"显示"});
Translation.addTranslation("Normal", {"de":"Normal","es":"Normal","fr":"Normal","ko":"일반","nl":"Normaal","pt":"Normal","ru":"Обычное","zh":"默认"});
Translation.addTranslation("No craftables", {"de":"Keine Vorlagen","es":"No fabricable","fr":"Pas de craftables","ko":"제작 가능 아이템 숨김","nl":"Geen craftables","pt":"Apenas não fabricáveis","ru":"Нельзя скрафтить","zh":"隐藏合成"});
Translation.addTranslation("Only craftables", {"de":"Nur Vorlagen","es":"Solo fabricable","fr":"Seulement les craftables","ko":"제작 가능 아이템만 표시","nl":"Alleen craftables","pt":"Apenas fabricáveis","ru":"Можно скрафтить","zh":"只有合成"});
Translation.addTranslation("Sorting direction", {"de":"Sortierung","es":"Dirección de Orden","fr":"Ordre de tri","ko":"정렬","nl":"Sorteer Richting","pt":"Direção da classificação","ru":"Направление сортировки","zh":"排序方式"});
Translation.addTranslation("Ascending", {"de":"Aufsteigend","es":"Ascendente","fr":"Croissant","ko":"오름차순","nl":"Oplopend","pt":"Ascendente","ru":"По возрастанию","zh":"上升"});
Translation.addTranslation("Descending", {"de":"Absteigend","es":"Descendente","fr":"Décroissant","ko":"내림차순","nl":"Aflopend","pt":"Descendente","ru":"По убыванию","zh":"下降"});
Translation.addTranslation("Sorting type", {"de":"Sortieren Nach","es":"Tipo de Orden","fr":"Type de tri","ko":"정렬 기준","nl":"Sorteer Type","pt":"Tipo da classificação","ru":"Тип сортировки","zh":"排序按"});
Translation.addTranslation("Quantity", {"de":"Menge","es":"Cantidad","fr":"Quantité","ko":"수량","nl":"Hoeveelheid","pt":"Quantidade","ru":"Количество","zh":"数量"});
Translation.addTranslation("Name", {"de":"Name","es":"Nombre","fr":"Nom","ko":"이름","nl":"Naam","pt":"Nome","ru":"Название","zh":"名字"});
Translation.addTranslation("ID", {"de":"ID","es":"ID","fr":"ID","ko":"ID","pt":"Id","ru":"ID","zh":"ID"});
Translation.addTranslation("InventoryTweaks", {"de":"InventoryTweaks","es":"InventoryTweaks","pt":"InventoryTweaks","ru":"Inventory Tweaks","zh":"InventoryTweaks"});
Translation.addTranslation("Last modified", {"de":"Zuletzt Geändert","es":"Último cambio","ru":"Последнее изменение","zh":"最后修改时间"});
Translation.addTranslation("Search box mode", {"de":"Suchleistenmodus","es":"Modo de caja de búsqueda","fr":"Mode de la barre de recherche","ko":"검색 모드","nl":"Zoekbalk Mode","pt":"Modo da caixa de pesquisa","ru":"Режим строки поиска","zh":"搜索框模式"});
Translation.addTranslation("Normal", {"de":"Normal","es":"Normal","fr":"Normal","ko":"일반","nl":"Normaal","pt":"Normal","ru":"Обычный","zh":"标准搜索"});
Translation.addTranslation("Normal (autoselected)", {"de":"Normal (Autoselektiert)","es":"Normal (autoselección)","fr":"Normal (sélection auto)","ko":"일반 (자동 선택됨)","nl":"Normaal (autogeselecteerd)","pt":"Normal (Auto-seleção)","ru":"Обычный (автовыбор)","zh":"自动搜索"});
Translation.addTranslation("JEI synchronized", {"de":"JEI synchronisiert","es":"Sincronizado con JEI","fr":"Synchronisé JEI ","ko":"JEI 통합","nl":"JEI gesynchronizeerd","pt":"Sincronizado com Jei","ru":"Синхронизированный с JEI","zh":"JEI 标准同步"});
Translation.addTranslation("JEI synchronized (autoselected)", {"de":"JEI synchronisiert (Autoselektiert)","es":"Sincronizado con JEI (autoselección)","fr":"Synchronisé JEI (sélection auto)","ko":"JEI 통합 (자동 선택됨)","nl":"JEI gesynchronizeerd (autogeselecteerd)","pt":"Sincronizado com Jei (Auto-seleção)","ru":"Синхронизированный с JEI (автовыбор)","zh":"JEI 自动同步"});
Translation.addTranslation("Size", {"de":"Größe","es":"Tamaño","fr":"Taille","ko":"크기","pt":"Tamanho","ru":"Размер","zh":"大小"});
Translation.addTranslation("Stretch", {"de":"Auto","es":"Tramo","fr":"Etendu","ko":"맞춤","pt":"Esticado","ru":"Вытянутый","zh":"自适应"});
Translation.addTranslation("Small", {"de":"Klein","es":"Pequeño","fr":"Petit","ko":"작음","pt":"Pequeno","ru":"Маленький","zh":"小"});
Translation.addTranslation("Medium", {"de":"Mittel","es":"Mediano","fr":"Moyen","ko":"중간","pt":"Médio","ru":"Средний","zh":"中"});
Translation.addTranslation("Large", {"de":"Groß","es":"largo","fr":"Grand","ko":"큼","pt":"Grande","ru":"Большой","zh":"大"});
Translation.addTranslation("Mode", {"de":"Modus","es":"Modo","fr":"Mode","ko":"모드","nl":"Mode","pt":"Modo","ru":"Режим","zh":"模式"});
Translation.addTranslation("Whitelist", {"de":"Whitelist","es":"Permitido","fr":"Liste blanche","ko":"화이트리스트","nl":"Whitelist","pt":"Lista branca","ru":"Белый список","zh":"白名单"});
Translation.addTranslation("Blacklist", {"de":"Blacklist","es":"No permitido","fr":"Liste noire","ko":"블랙리스트","nl":"Blacklist","pt":"Lista negra","ru":"Черный список","zh":"黑名单"});
Translation.addTranslation("IO mode", {"de":"IO Modus","es":"Modo de E/S","fr":"IO mode","ko":"입출력 모드","nl":"IO Mode","pt":"Modo IO ","ru":"IO режим","zh":"IO模式"});
Translation.addTranslation("Insert into network", {"de":"In Netzwerk importieren","es":"Insertar a la red","fr":"Insère dans le réseau","ko":"네트워크로 입력","nl":"In netwerk steken","pt":"Inserir na rede","ru":"Вставить в сеть","zh":"输入到网络"});
Translation.addTranslation("Extract from network", {"de":"Aus Netzwerk exportieren","es":"Extraer de la red","ko":"네트워크에서 출력","nl":"Uit netwerk halen","pt":"Extrair da rede","ru":"Извлечь из сети","zh":"从网络输出"});
Translation.addTranslation("Type", {"de":"Typ","es":"Tipo","fr":"Type","ko":"종류","nl":"Type","pt":"Tipo","ru":"Тип","zh":"类型"});
Translation.addTranslation("Items", {"de":"Items","es":"Objetos","fr":"Items","ko":"아이템","nl":"Items","pt":"Itens","ru":"Предметы","zh":"物品"});
Translation.addTranslation("Fluids", {"de":"Flüssigkeiten","es":"Fluidos","fr":"Fluides","ko":"액체","nl":"Vloeistoffen","pt":"Fluidos","ru":"Жидкости","zh":"流体"});
Translation.addTranslation("Mode", {"de":"Modus","es":"Modo","fr":"Mode","ko":"모드","nl":"Mode","pt":"Modo","ru":"Режим","zh":"模式"});
Translation.addTranslation("Emit signal when under the amount", {"de":"Signal Wenn Weniger","es":"Emitir señal si hay menos de lo indicado","fr":"Emet un signal quand la quantité est inférieure","ko":"수량 이하일 때 신호 출력","nl":"Redstone signaal aan wanneer onder het aantal","pt":"Emite um sinal quando estiver abaixo do valor","ru":"Выдача сигнала, если количество меньше","zh":"物品数量小于输入数量时输出信号"});
Translation.addTranslation("Emit signal when on the amount", {"de":"Signal Wenn Gleich","es":"Emitir señal si la cantidad se alcanza","fr":"Emet un signal quand la quantité est égale","ko":"수량과 일치할 때 신호 출력","nl":"Redstone signaal aan wanneer op het aantal","pt":"Emite um sinal quando estiver no valor","ru":"Выдача сигнала, если количество равно","zh":"物品数量等于输入数量时输出信号"});
Translation.addTranslation("Emit signal when above the amount", {"de":"Signal Wenn Mehr","es":"Emitir señal si esta más de lo indicado","fr":"Emet un signal quand la quantité est supérieure","ko":"수량 이상일 때 신호 출력","nl":"Redstone signaal aan wanneer boven het aantal","pt":"Emite sinal quando acima do valor","ru":"Выдача сигнала, если количество больше","zh":"物品数量大于于输入数量时输出信号"});
Translation.addTranslation("Drop blocks instead of placing", {"de":"Blöcke fallen lassen anstatt zu platzieren","es":"Soltar bloques en lugar de colocar","fr":"Laisse tomber les blocs au lieu de les placer","ko":"블럭을 설치하지 않고 떨어트림","pt":"Solte os blocos em vez de colocar","ru":"Выкидывать блоки вместо размещения","zh":"将物品以掉落物形式抛出"});
Translation.addTranslation("Pickup items instead of breaking", {"de":"Items einsammeln anstatt abzubauen","es":"Recoger objetos en lugar de romper","fr":"Ramasse les items au lieu de les casser","ko":"블럭을 파괴하지 않고 주움","pt":"Pegue os itens em vez de quebrar","ru":"Подбирать предметы, а не ломать","zh":"拾取物品模式"});
Translation.addTranslation("Access type", {"de":"Zugriffsmodus","es":"Tipo de acceso","fr":"Type d'accès","ko":"액세스 종류","pt":"Tipo de acesso","ru":"Тип доступа","zh":"访问类型"});
Translation.addTranslation("Insert and extract", {"de":"Importieren und Exportieren","es":"Insertar y extraer","fr":"Insère and extrait","ko":"입출력","pt":"Inserir e extrair","ru":"Вставить и извлечь","zh":"输入输出"});
Translation.addTranslation("Insert only", {"de":"Nur Importieren","es":"Solo insertar","fr":"Insère seulement","ko":"입력","pt":"Inserir apenas","ru":"Только вставить","zh":"仅输入"});
Translation.addTranslation("Extract only", {"de":"Nur Exportieren","es":"solo extraer","fr":"Extrait seulement","ko":"출력","pt":"Extrair apenas","ru":"Только извлечь","zh":"仅输出"});
Translation.addTranslation("Controller", {"de":"Kontrollblock","es":"Controlador","fr":"Controlleur","ko":"컨트롤러","nl":"Controller","pt":"Controlador","ru":"Контроллер","zh":"控制器"});
Translation.addTranslation("Creative Controller", {"de":"Kreativ-Kontrollblock","es":"Controlador Creativo","fr":"Controlleur créatif","ko":"크리에이티브 컨트롤러","nl":"Creative Controller","pt":"Controlador (Modo Criativo)","ru":"Творческий контроллер","zh":"创造控制器"});
Translation.addTranslation("Cable", {"de":"Kabel","es":"Cable","fr":"Cable","ko":"케이블","nl":"Kabel","pt":"Cabo","ru":"Кабель","zh":"线缆"});
Translation.addTranslation("Grid", {"de":"Konsole","es":"Panel","fr":"Grille","ko":"그리드","nl":"Rooster","pt":"Grade","ru":"Терминал","zh":"终端"});
Translation.addTranslation("Crafting Grid", {"de":"Fertigungskonsole","es":"Panel de Fabricación","fr":"Grille de craft","ko":"조합 그리드","nl":"Crafting Rooster","pt":"Grade de Fabricações","ru":"Терминал с верстаком","zh":"合成终端"});
Translation.addTranslation("Pattern Grid", {"de":"Vorlagenkonsole","es":"Panel de Patrones","fr":"Grille de modèle","ko":"패턴 그리드","nl":"Patroon Rooster","pt":"Grade de Padrões","ru":"Терминал с кодировщиком шаблонов","zh":"样板终端"});
Translation.addTranslation("Fluid Grid", {"de":"Flüssigkeitskonsole","es":"Panel de Fluidos","fr":"Grille de fluide","ko":"액체 그리드","nl":"Vloeistof Rooster","pt":"Grade de Fluidos","ru":"Жидкостный терминал","zh":"流体终端"});
Translation.addTranslation("Disk Drive", {"de":"Laufwerk","es":"Almacén de Discos","fr":"Lecteur de disque","ko":"디스크 드라이브","nl":"Schijf","pt":"Unidade de Disco","ru":"Привод","zh":"磁盘驱动器"});
Translation.addTranslation("Disk Manipulator", {"de":"Speichermanipulator","es":"Manipulador de Discos","fr":"Manipulateur de disque","ko":"디스크 조작기","nl":"Schijf Manipulator","pt":"Manipulador de Disco","ru":"Дисковый манипулятор","zh":"磁盘操纵器"});
Translation.addTranslation("External Storage", {"de":"Externer Speicher","es":"Almacén Externo","fr":"Stockage externe","ko":"외부 저장 포트","nl":"Externe Opslag","pt":"Armazenamento Externo","ru":"Внешнее хранилище","zh":"外部存储总线"});
Translation.addTranslation("Importer", {"de":"Importierer","es":"Importador","fr":"Importeur","ko":"입력 포트","nl":"Importeur","pt":"Importador","ru":"Импортер","zh":"输入总线"});
Translation.addTranslation("Exporter", {"de":"Exportierer","es":"Exportador","fr":"Exporteur","ko":"출력 포트","nl":"Exporteur","pt":"Exportador","ru":"Экспортер","zh":"输出总线"});
Translation.addTranslation("Detector", {"de":"Detektor","es":"Detector","fr":"Detecteur","ko":"감지기","nl":"Detector","pt":"Detector","ru":"Датчик","zh":"标准发信器"});
Translation.addTranslation("Machine Casing", {"de":"Gehäuse","es":"Estructura de maquina","fr":"Boitier de machine","ko":"기계 케이싱","nl":"Machine-omhulsel","pt":"Gabinete de Máquina","ru":"Корпус машины","zh":"机器外壳"});
Translation.addTranslation("Destructor", {"de":"Destruktor","es":"Destructor","fr":"Destructeur","ko":"파괴기","nl":"Destructor","pt":"Destruidor","ru":"Разрушитель","zh":"破坏面板"});
Translation.addTranslation("Constructor", {"de":"Konstruktor","es":"Constructor","fr":"Constructeur","ko":"설치기","nl":"Constructor","pt":"Construtor","ru":"Строитель","zh":"成型面板"});
Translation.addTranslation("1k Storage Block", {"de":"1k Speicherblock","es":"Bloque de Memoria de 1k","fr":"Bloc de stockage 1k","ko":"1k 저장 공간","nl":"1k Opslagblok","pt":"Bloco de Armazenamento 1k","ru":"Блок хранения 1Кб","zh":"1k 存储方块"});
Translation.addTranslation("4k Storage Block", {"de":"4k Speicherblock","es":"Bloque de Memoria de 4k","fr":"Bloc de stockage 4k","ko":"4k 저장 공간","nl":"4k Opslagblok","pt":"Bloco de Armazenamento 4k","ru":"Блок хранения 4Кб","zh":"4k 存储方块"});
Translation.addTranslation("16k Storage Block", {"de":"16k Speicherblock","es":"Bloque de Memoria de 16k","fr":"Bloc de stockage 16k","ko":"16k 저장 공간","nl":"16k Opslagblok","pt":"Bloco de Armazenamento 16k","ru":"Блок хранения 16Кб","zh":"16k 存储方块"});
Translation.addTranslation("64k Storage Block", {"de":"64k Speicherblock","es":"Bloque de Memoria de 64k","fr":"Bloc de stockage 64k","ko":"64k 저장 공간","nl":"64k Opslagblok","pt":"Bloco de Armazenamento 64k","ru":"Блок хранения 64Кб","zh":"64k 存储方块"});
Translation.addTranslation("Creative Storage Block", {"de":"Kreativ-Speicherblock","es":"Bloque de Memoria Creativo","fr":"Bloc de stockage créatif","ko":"크리에이티브 저장 공간","nl":"Creative Opslagblok","pt":"Bloco de Armazenamento (Modo Criativo)","ru":"Творческий блок хранения","zh":"创造存储方块"});
Translation.addTranslation("Relay", {"de":"Relais","es":"Relé","fr":"Relais","ko":"중계기","nl":"Relais","pt":"Retransmissor","ru":"Реле","zh":"继电器"});
Translation.addTranslation("Interface", {"de":"Schnittstelle","es":"Interfaz","fr":"Interface","ko":"인터페이스","nl":"Interface","pt":"Interface","ru":"Интерфейс","zh":"物品传输接口"});
Translation.addTranslation("Crafting Monitor", {"de":"Fertigungsmonitor","es":"Monitor de Fabricación","fr":"Moniteur de craft","ko":"조합 모니터","nl":"Crafting Monitor","pt":"Monitor de Fabricações","ru":"Монитор создания","zh":"合成监控处理器"});
Translation.addTranslation("Wireless Transmitter", {"de":"Funksender","es":"Transmisor Inalámbrico","fr":"Emetteur sans fil","ko":"무선 송신기","nl":"Draadloze Zender","pt":"Transmissor Wireless","ru":"Беспроводной передатчик","zh":"无线访问点"});
Translation.addTranslation("Must be placed on", {"de":"Muss anplatziert werden.","es":"Necesita ser puesto en","fr":"A besoin d'être placé sur","ko":"에 설치되어야 합니다.","pt":"Precisa ser colocado em","ru":"Необходимо разместить на","zh":"需要放置在上。"});
Translation.addTranslation("Crafter", {"de":"Fertiger","es":"Fabricador","fr":"Crafteur","ko":"조합기","nl":"Crafter","pt":"Fabricador","ru":"Крафтер","zh":"装配室"});
Translation.addTranslation("Network Receiver", {"de":"Netzwerkempfänger","es":"Receptor de Red","fr":"Récepteur réseau","ko":"네트워크 수신기","nl":"Netwerkontvanger","pt":"Receptor de Rede","ru":"Сетевой приемник","zh":"网络接收器"});
Translation.addTranslation("Network Transmitter", {"de":"Netzwerksender","es":"Transmisor de red","fr":"Transmetteur réseau","ko":"네트워크 송신기","nl":"Netwerkzender","pt":"Transmissor de Rede","ru":"Сетевой передатчик","zh":"网络变送器"});
Translation.addTranslation("Fluid Interface", {"de":"Flüssigkeitsschnittstelle","es":"Interfaz de Fluidos","fr":"Interface de fluides","ko":"액체 인터페이스","nl":"Vloeistof Interface","pt":"Interface de Fluidos","ru":"Жидкостный интерфейс","zh":"流体面板"});
Translation.addTranslation("64k Fluid Storage Block", {"de":"64k Flüssigspeicherblock","es":"Bloque de Memoria de Fluidos de 64k ","fr":"Bloc de stockage de fluides de 64k","ko":"64k 액체 저장 공간","nl":"64k Vloeistof Opslagblok","pt":"Bloco de Armazenamento de Fluidos 64k","ru":"Жидкостный блок хранения 64Кб","zh":"64k 流体存储方块"});
Translation.addTranslation("256k Fluid Storage Block", {"de":"256k Flüssigspeicherblock","es":"Bloque de Memoria de Fluidos de 256k","fr":"Bloc de stockage de fluides de 256k","ko":"256k 액체 저장 공간","nl":"256k Vloeistof Opslagblok","pt":"Bloco de Armazenamento de Fluidos 256k","ru":"Жидкостный блок хранения 256Кб","zh":"256k 流体存储方块"});
Translation.addTranslation("1024k Fluid Storage Block", {"de":"1024k Flüssigspeicherblock","es":"Bloque de Memoria de Fluidos de 1024k","fr":"Bloc de stockage de fluides de 1024k","ko":"1024k 액체 저장 공간","nl":"1024k Vloeistof Opslagblok","pt":"Bloco de Armazenamento de Fluidos 1024k","ru":"Жидкостный блок хранения 1024Кб","zh":"1024k 流体存储方块"});
Translation.addTranslation("4096k Fluid Storage Block", {"de":"4096k Flüssigspeicherblock","es":"Bloque de Memoria de Fluidos de 4096k","fr":"Bloc de stockage de fluides de 4096k","ko":"4096k 액체 저장 공간","nl":"4096k Vloeistof Opslagblok","pt":"Bloco de Armazenamento de Fluidos 4096k","ru":"Жидкостный блок хранения 4096Кб","zh":"4096k 流体存储方块"});
Translation.addTranslation("Creative Fluid Storage Block", {"de":"Kreativ-Flüssigspeicherblock","es":"Bloque de Memoria de Fluidos Creativo","fr":"Bloc de stockage de fluides créatif","ko":"크리에이티브 액체 저장 공간","nl":"Creative Vloeistof Opslagblok","pt":"Bloco de Armazenamento de Fluidos (Modo Criativo)","ru":"Творческий жидкостный блок хранения","zh":"创造流体存储方块"});
Translation.addTranslation("Reader", {"de":"Lesegerät","es":"Lector","fr":"Scanneur","ko":"수신기","pt":"Leitor","ru":"Устройство чтения","zh":"读取器"});
Translation.addTranslation("Writer", {"de":"Schreibgerät","es":"Escritor","fr":"Imprimeur","ko":"송신기","pt":"Escritor","ru":"Устройство записи","zh":"写入器"});
Translation.addTranslation("Security Manager", {"de":"Sicherheitsmanager","es":"Centro de Seguridad","fr":"Poste de sécurité","ko":"보안 관리자","pt":"Gerente de Segurança","ru":"Менеджер безопасности","zh":"权限管理器"});
Translation.addTranslation("Block of Quartz Enriched Iron", {"de":"Quarzangereicherter Eisenblock","es":"Bloque de Hierro Enriquecido con Cuarzo","fr":"Bloc de Quartz enrichi au fer","ko":"석영 강화 철 블럭","pt":"Bloco de Ferro Enriquecido com Quartzo","ru":"Блок из обогащенного кварцем железа","zh":"富石英块"});
Translation.addTranslation("Storage Monitor", {"de":"Speichermonitor","es":"Monitor de Almacén","fr":"Moniteur de stockage","ko":"저장 모니터","pt":"Monitor de Armazenamento","ru":"Монитор хранения","zh":"存储监控器"});
Translation.addTranslation("Portable Grid", {"de":"Mobile Konsole","es":"Panel Portátil","fr":"Grille portative","ko":"휴대용 그리드","pt":"Grade Portátil","ru":"Портативный терминал","zh":"便携式终端"});
Translation.addTranslation("Creative Portable Grid", {"de":"Mobile Kreativ-Konsole","es":"Panel Portátil Creativo","fr":"Grille portative créatif","ko":"크리에이티브 휴대용 그리드","pt":"Grade Portátil (Modo Criativo)","ru":"Творческий портативный терминал","zh":"创造便携式终端"});
Translation.addTranslation("Sneak to place in the world.", {"de":"Schleiche um das in der Welt zu platzieren","es":"Agáchate para colocarlo.","fr":"S'accroupir pour placer dans le monde.","ko":"웅크리기로 설치할 수 있습니다.","pt":"Esgueirar-se para colocar no mundo.","ru":"Присесть для размещения в мире.","zh":"Shift进行放置"});
Translation.addTranslation("Crafter Manager", {"de":"Fertigungsmanager","ru":"Менеджер создания","zh":"合成管理器"});
Translation.addTranslation("1k Storage Disk", {"de":"1k Speicherzelle","es":"Disco Duro de 1k","fr":"Disque de stockage 1K","ko":"1k 저장 디스크","nl":"1k Opslagschijf","pt":"Disco de Armazenamento 1k","ru":"Диск хранения 1Кб","zh":"1k 存储磁盘"});
Translation.addTranslation("4k Storage Disk", {"de":"4k Speicherzelle","es":"Disco Duro de 4k","fr":"Disque de stockage 4K","ko":"4k 저장 디스크","nl":"4k Opslagschijf","pt":"Disco de Armazenamento 4k","ru":"Диск хранения 4Кб","zh":"4k 存储磁盘"});
Translation.addTranslation("16k Storage Disk", {"de":"16k Speicherzelle","es":"Disco Duro de 16k","fr":"Disque de stockage 16K","ko":"16k 저장 디스크","nl":"16k Opslagschijf","pt":"Disco de Armazenamento 16k","ru":"Диск хранения 16Кб","zh":"16k 存储磁盘"});
Translation.addTranslation("64k Storage Disk", {"de":"64k Speicherzelle","es":"Disco Duro de 64k","fr":"Disque de stockage 64K","ko":"64k 저장 디스크","nl":"64k Opslagschijf","pt":"Disco de Armazenamento 64k","ru":"Диск хранения 64Кб","zh":"64k 存储磁盘"});
Translation.addTranslation("Creative Storage Disk", {"de":"Kreativ-Speicherzelle","es":"Disco Duro Creativo","fr":"Disque de stockage créatif","ko":"크리에이티브 저장 디스크","nl":"Creative Opslagschijf","pt":"Disco de Armazenamento (Modo Criativo)","ru":"Творческий диск хранения","zh":"创造存储磁盘"});
Translation.addTranslation("Debug Storage Disk", {"de":"Debug Speicherzelle","es":"Disco Duro de depuración","fr":"Disque de stockage de débogage","ko":"디버그 저장 디스크","nl":"Debug Opslagschijf","pt":"Disco de Armazenamento de Depuração","ru":"Диск хранения отладки","zh":"调试用存储磁盘"});
Translation.addTranslation("64k Fluid Storage Disk", {"de":"64k Flüssigspeicherzelle","es":"Disco Duro de Fluidos de 64k","fr":"Disque de stockage de fluides 64K","ko":"64k 액체 저장 디스크","nl":"64k Vloeistof Opslagschijf","pt":"Disco de Armazenamento de Fluidos 64k","ru":"Диск хранения жидкости 64Кб","zh":"64k 流体存储磁盘"});
Translation.addTranslation("256k Fluid Storage Disk", {"de":"256k Flüssigspeicherzelle","es":"Disco Duro de Fluidos de 256k","fr":"Disque de stockage de fluides 256K","ko":"256k 액체 저장 디스크","nl":"256k Vloeistof Opslagschijf","pt":"Disco de Armazenamento de Fluidos 256k","ru":"Диск хранения жидкости 256Кб","zh":"256k 流体存储磁盘"});
Translation.addTranslation("1024k Fluid Storage Disk", {"de":"1024k Flüssigspeicherzelle","es":"Disco Duro de Fluidos de 1024k","fr":"Disque de stockage de fluides 1024K","ko":"1024k 액체 저장 디스크","nl":"1024k Vloeistof Opslagschijf","pt":"Disco de Armazenamento de Fluidos 1024k","ru":"Диск хранения жидкости 1024Кб","zh":"1024k 流体存储磁盘"});
Translation.addTranslation("4096k Fluid Storage Disk", {"de":"4096k Flüssigspeicherzelle","es":"Disco Duro de Fluidos de 4096k","fr":"Disque de stockage de fluides 4096K","ko":"4096k 액체 저장 디스크","nl":"4096k Vloeistof Opslagschijf","pt":"Disco de Armazenamento de Fluidos 4096k","ru":"Диск хранения жидкости 4096Кб","zh":"4096k 流体存储磁盘"});
Translation.addTranslation("Creative Fluid Storage Disk", {"de":"Kreativ-Flüssigspeicherzelle","es":"Disco Duro de Fluidos Creativo","fr":"Disque de stockage de fluides créatif","ko":"크리에이티브 액체 저장 디스크","nl":"Creative Vloeistof Opslagschijf","pt":"Disco de Armazenamento de Fluidos (Modo Criativo)","ru":"Творческий диск хранения жидкости","zh":"创造流体存储磁盘"});
Translation.addTranslation("Debug Fluid Storage Disk", {"de":"Debug Flüssigspeicherzelle","es":"Disco Duro de Fluido de depuración","fr":"Disque de stockage de fluides de débogage","ko":"디버그 액체 저장 디스크","nl":"Debug Vloeistof Opslagschijf","pt":"Disco de Armazenamento de Fluidos de Depuração","ru":"Жидкостный диск хранения отладки","zh":"调试用流体存储磁盘"});
Translation.addTranslation("Wireless Grid", {"de":"Mobile Konsole","es":"Panel Inalámbrico","fr":"Grille sans fil","ko":"무선 그리드","nl":"Draadloos Rooster","pt":"Grade Wireless","ru":"Беспроводной терминал","zh":"无线终端"});
Translation.addTranslation("Creative Wireless Grid", {"de":"Mobile Kreativkonsole","es":"Panel Inalámbrico Creativo","fr":"Grille sans fil créative","ko":"크리에이티브 무선 그리드","nl":"Creative Draadloos Rooster","pt":"Grade Wireless (Modo Criativo)","ru":"Творческий беспроводной терминал","zh":"创造无线终端"});
Translation.addTranslation("Wireless Fluid Grid", {"de":"Mobile Flüssigkeitskonsole","es":"Panel de Fluidos Inalámbrico","fr":"Grille de liquide sans fil","ko":"무선 액체 그리드","pt":"Grade de Fluidos Wireless","ru":"Беспроводной жидкостный терминал","zh":"无线流体终端"});
Translation.addTranslation("Creative Wireless Fluid Grid", {"de":"Mobile Kreative-Flüssigkeitskonsole","es":"Panel de Fluidos Inalámbrico Creativo","fr":"Grille liquide sans fil créative","ko":"크리에이티브 무선 액체 그리드","pt":"Grade de Fluidos Wireless (Modo Criativo)","ru":"Творческий беспроводной жидкостный терминал","zh":"创造无线流体终端"});
Translation.addTranslation("Wireless Crafting Monitor", {"de":"Mobile Fertigungskonsole","es":"Monitor de Fabricación Inalámbrico","fr":"Moniteur de craft sans fil","ko":"무선 제작 모니터","pt":"Monitor de Fabricações Wireless","ru":"Беспроводной монитор создания","zh":"无线合成监控器"});
Translation.addTranslation("Creative Wireless Crafting Monitor", {"de":"Mobile Kreativ-Fertigungskonsole","es":"Monitor de Fabricación Inalámbrico Creativo","fr":"Moniteur de craft sans fil créatif","ko":"크리에이티브 무선 제작 모니터","pt":"Monitor de Fabricações Wireless (Modo Criativo)","ru":"Творческий беспроводной монитор создания","zh":"创造无线合成监控器"});
Translation.addTranslation("Quartz Enriched Iron", {"de":"Quarzangereichertes Eisen","es":"Hierro Enriquecido con Cuarzo","fr":"Quartz enrichi au fer","ko":"석영 강화 철","nl":"Quartz Verrijkte IJzerstaaf","pt":"Ferro Enriquecido com Quartzo","ru":"Кварцевое обогащенное железо","zh":"富石英铁"});
Translation.addTranslation("Construction Core", {"de":"Konstruktionskern","es":"Núcleo de Construcción","fr":"Coeur de construction","ko":"형성 코어","nl":"Constructiekern","pt":"Núcleo de Construção","ru":"Ядро созидания","zh":"成型核心"});
Translation.addTranslation("Destruction Core", {"de":"Destruktionskern","es":"Núcleo de Destrucción","fr":"Coeur de destruction","ko":"파괴 코어","nl":"Destructiekern","pt":"Núcleo de Destruição","ru":"Ядро разрушения","zh":"破坏核心"});
Translation.addTranslation("Silicon", {"de":"Silizium","es":"Silicio","fr":"Silicone","ko":"실리콘","nl":"Siliconen","pt":"Silício","ru":"Кремний","zh":"硅"});
Translation.addTranslation("Raw Basic Processor", {"de":"Basisrohprozessor","ru":"Необработанный базовый процессор","zh":"原始基础处理器"});
Translation.addTranslation("Raw Improved Processor", {"de":"Verbesserter Rohprozessor","ru":"Необработанный улучшенный процессор","zh":"原始进阶处理器"});
Translation.addTranslation("Raw Advanced Processor", {"de":"Fortschrittlicher Rohprozessor","ru":"Необработанный продвинутый процессор","zh":"原始高级处理器"});
Translation.addTranslation("Basic Processor", {"de":"Basisprozessor","es":"Procesador Básico","fr":"Processeur basique","ko":"기본 프로세서","nl":"Basis Processor","pt":"Processador Básico","ru":"Базовый процессор","zh":"基础处理器"});
Translation.addTranslation("Improved Processor", {"de":"Verbesserter Prozessor","es":"Procesador Mejorado","fr":"Processeur amélioré","ko":"강화 프로세서","nl":"Verbeterde Processor","pt":"Processador Melhorado","ru":"Улучшенный процессор","zh":"进阶处理器"});
Translation.addTranslation("Advanced Processor", {"de":"Fortschrittlicher Prozessor","es":"Procesador Avanzado","fr":"Processeur avancé","ko":"고급 프로세서","nl":"Uitgebreide Processor","pt":"Processador Avançado","ru":"Продвинутый процессор","zh":"高级处理器"});
Translation.addTranslation("1k Storage Part", {"de":"1k Speicherkern","es":"Parte de Memoria de 1k","fr":"Pièce de stockage 1k","ko":"1k 저장 파트","nl":"1k Opslagdeel","pt":"Parte de Armazenamento 1k","ru":"Часть хранения 1К","zh":"1k 存储元件"});
Translation.addTranslation("4k Storage Part", {"de":"4k Speicherkern","es":"Parte de Memoria de 4k","fr":"Pièce de stockage 4k","ko":"4k 저장 파트","nl":"4k Opslagdeel","pt":"Parte de Armazenamento 4k","ru":"Часть хранения 4К","zh":"4k 存储元件"});
Translation.addTranslation("16k Storage Part", {"de":"16k Speicherkern","es":"Parte de Memoria de 16k","fr":"Pièce de stockage 16k","ko":"16k 저장 파트","nl":"16k Opslagdeel","pt":"Parte de Armazenamento 16k","ru":"Часть хранения 16К","zh":"16k 存储元件"});
Translation.addTranslation("64k Storage Part", {"de":"64k Speicherkern","es":"Parte de Memoria de 64k","fr":"Pièce de stockage 64k","ko":"64k 저장 파트","nl":"64k Opslagdeel","pt":"Parte de Armazenamento 64k","ru":"Часть хранения 64К","zh":"64k 存储元件"});
Translation.addTranslation("64k Fluid Storage Part", {"de":"64k Flüssigspeicherkern","es":"Parte de Memoria de Fluidos de 64k","fr":"Pièce de stockage de fluides 64k","ko":"64k 액체 저장 파트","nl":"64k Vloeistof Opslagdeel","pt":"Parte de armazenamento de Fluidos 64k","ru":"Жидкостная часть хранения 64Кб","zh":"64k 流体存储原件"});
Translation.addTranslation("256k Fluid Storage Part", {"de":"256k Flüssigspeicherkern","es":"Parte de Memoria de Fluidos de 256k","fr":"Pièce de stockage de fluides 256k","ko":"256k 액체 저장 파트","nl":"256k Vloeistof Opslagdeel","pt":"Parte de armazenamento de Fluidos 256k","ru":"Жидкостная часть хранения 256Кб","zh":"256k 流体存储原件"});
Translation.addTranslation("1024k Fluid Storage Part", {"de":"1024k Flüssigspeicherkern","es":"Parte de Memoria de Fluidos de 1024k","fr":"Pièce de stockage de fluides 1024k","ko":"1024k 액체 저장 파트","nl":"1024k Vloeistof Opslagdeel","pt":"Parte de armazenamento de Fluidos 1024k","ru":"Жидкостная часть хранения 1024Кб","zh":"1024k 流体存储原件"});
Translation.addTranslation("4096k Fluid Storage Part", {"de":"4096k Flüssigspeicherkern","es":"Parte de Memoria de Fluidos de 4096k","fr":"Pièce de stockage de fluides 4096k","ko":"4096k 액체 저장 파트","nl":"4096k Vloeistof Opslagdeel","pt":"Parte de armazenamento de Fluidos 4096k","ru":"Жидкостная часть хранения 4096Кб","zh":"4096k 流体存储原件"});
Translation.addTranslation("Pattern", {"de":"Vorlage","es":"Patrón","fr":"Modèle","ko":"패턴","nl":"Patroon","pt":"Padrão","ru":"Шаблон","zh":"模板"});
Translation.addTranslation("Upgrade", {"de":"Upgrade","es":"Mejora","fr":"Amélioration","ko":"업그레이드","nl":"Upgrade","pt":"Aprimoramento","ru":"Улучшение","zh":"空白升级"});
Translation.addTranslation("Range Upgrade", {"de":"Reichweitenupgrade","es":"Mejora de Rango","fr":"Amélioration de portée","ko":"범위 업그레이드","nl":"Afstand Upgrade","pt":"Aprimoramento de Alcance","ru":"Улучшение: \"Радиус\"","zh":"范围升级"});
Translation.addTranslation("Speed Upgrade", {"de":"Geschwindigkeitsupgrade","es":"Mejora de Rapidez","fr":"Amélioration de vitesse","ko":"속도 업그레이드","nl":"Snelheid Upgrade","pt":"Aprimoramento de Velocidade","ru":"Улучшение: \"Скорость\"","zh":"速度升级"});
Translation.addTranslation("Crafting Upgrade", {"de":"Fertigungsupgrade","es":"Mejora de Fabricación","fr":"Amélioration de craft","ko":"제작 업그레이드","nl":"Crafting Upgrade","pt":"Aprimoramento de Fabricação","ru":"Улучшение: \"Крафт\"","zh":"合成升级"});
Translation.addTranslation("Stack Upgrade", {"de":"Stapelupgrade","es":"Mejora de Apilación","fr":"Amélioration de stack","ko":"세트 업그레이드","nl":"Stack Upgrade","pt":"Aprimoramento de Pilha","ru":"Улучшение: \"Стак\"","zh":"堆叠升级"});
Translation.addTranslation("Silk Touch Upgrade", {"de":"Behutsamkeitsupgrade","es":"Mejora de Toque de Seda","fr":"Amélioration Touché de soie","ko":"섬세한 손길 업그레이드","pt":"Aprimoramento de Toque Suave","ru":"Улучшение: \"Шёлковое касание\"","zh":"精准采集升级"});
Translation.addTranslation("Fortune Upgrade", {"de":"Glücksupgrade","es":"Mejora de Fortuna","fr":"Amélioration Fortune","ko":"행운 업그레이드","pt":"Aprimoramento de Fortuna","ru":"Улучшение: \"Удача\"","zh":"时运升级"});
Translation.addTranslation("Fortune Upgrade", {"de":"Glücksupgrade","es":"Mejora de Fortuna","pt":"Aprimoramento de Fortuna","ru":"Улучшение: \"Удача\"","zh":"时运升级"});
Translation.addTranslation("Fortune Upgrade", {"de":"Glücksupgrade","es":"Mejora de Fortuna","pt":"Aprimoramento de Fortuna","ru":"Улучшение: \"Удача\"","zh":"时运升级"});
Translation.addTranslation("Storage Housing", {"de":"Speichergehäuse","es":"Carcasa","fr":"Boitier de stockage","ko":"빈 저장 디스크","nl":"Opslagomhulsel","pt":"Alojamento de Armazenação","ru":"Хранилище корпуса","zh":"磁盘外壳"});
Translation.addTranslation("Filter", {"de":"Filter","es":"Filtro","fr":"Filtre","ko":"필터","nl":"Filter","pt":"Filtro","ru":"Фильтр","zh":"过滤升级"});
Translation.addTranslation("Network Card", {"de":"Netzwerkkarte","es":"Tarjeta de Red","fr":"Carte réseau","ko":"네트워크 카드","nl":"Netwerk Kaart","pt":"Cartão de Rede","ru":"Сетевая карта","zh":"网卡"});
Translation.addTranslation("Wrench", {"de":"Schraubenschlüssel","es":"Llave inglesa","fr":"Clé","ko":"렌치","pt":"Chave Inglesa","ru":"Гаечный ключ","zh":"扳手"});
Translation.addTranslation("Security Card", {"de":"Sicherheitskarte","es":"Tarjeta de Seguridad","fr":"Carte de sécurité","ko":"보안 카드","pt":"Cartão de Segurança","ru":"Карточка безопасности","zh":"权限卡"});
Translation.addTranslation("Bound to", {"de":"Besitzer","es":"Designado a","fr":"Bound to","ko":"플레이어","pt":"Ligado a","ru":"Связано с","zh":"绑定至："});
Translation.addTranslation("Cutting Tool", {"de":"Schnittwerkzeug","ru":"Режущий инструмент","zh":"切割工具"});
Translation.addTranslation("Cover", {"de":"Fassade","ru":"Крышка","zh":"伪装板"});
Translation.addTranslation("Hollow Cover", {"de":"Hohle Fassade","ru":"Полая крышка","zh":"空心伪装板"});
Translation.addTranslation("Processor Binding", {"de":"Prozessor Rohmaterial","ru":"Связанный процессор","zh":"处理器粘合物"});
Translation.addTranslation("/createdisk <player> <item> <metadata> <id>", {"de":"/createdisk <Spieler> <Item> <Metadaten> <ID>","ru":"/createdisk <player> <item> <metadata> <id>","zh":"/createdisk <玩家> <物品> <metadata> <id>"});
Translation.addTranslation("The given disk item is not a disk.", {"de":"Das Item ist keine Speicherzelle.","ru":"Данный предмет диска не является диском.","zh":"该物品不是磁盘."});
Translation.addTranslation("Diskwas not found.", {"de":"Speicherzellekonnte nicht gefunden werden.","ru":"Дискне был найден.","zh":"磁盘未找到."});
Translation.addTranslation("Successfully gave diskto", {"de":"Speicherzelleerfolgreich angegeben.","ru":"Успешно дал дискк","zh":"成功把磁盘给了"});
Translation.addTranslation("Craft a Controller", {"de":"Stelle einen Kontrollblock her","es":"Haz un Controlador","fr":"Craft d'un controlleur","pt":"Fabrique um Controlador.","ru":"Создать контроллер","zh":"合成了控制器"});
Translation.addTranslation("Connecting", {"de":"Verbinden","es":"conectándose","fr":"En cours de connexion","pt":"Conectando!","ru":"Соединение","zh":"连接"});
Translation.addTranslation("You can place all the devices next to each other to connect them up, or, use Cable", {"de":"Platziere zwei Geräte nebeneinander oder verwende ein Kabel um sie zu verbinden","es":"Puedes poner todos los dispositivos juntos para conectarlos, o, usa Cable","fr":"Vous pouvez placer chaque appareil côte à côte pour les connecter ensemble, ou utiliser un cable.","pt":"Você pode colocar todos os dispositivos próximos uns dos outros para conectá-los, ou pode usar os cabos.","ru":"Вы можете разместить все устройства рядом друг с другом, чтобы подключить их, или, используя кабель","zh":"您可以将所有设备放在一起或者使用【线缆】以将它们连接起来"});
Translation.addTranslation("Conditional connecting", {"de":"Bedingte Verbindung","es":"Conexión condicional","fr":"Connexion conditionnelle","pt":"Conexão condicional!","ru":"Условное подключение","zh":"条件连接"});
Translation.addTranslation("Craft a Relay to control if a network signal can pass with redstone", {"de":"Stelle ein Relais her, um eine Verbindung per Redstone zu steuern","es":"Haz un relé para controlar si señal de red pasa con redstone","fr":"Crafter un relais pour controller si le signal du réseau peut passer avec un signal de redstone","pt":"Fabrique um Retransmissor, você pode passar o sinal de rede usando sinal de redstone.","ru":"Изготовить реле для управления, если сигнал сети может пройти с редстоун","zh":"制作一个【继电器】来控制网络信号是否可以通过红石"});
Translation.addTranslation("Drives", {"de":"Laufwerke","es":"Almacén","fr":"Lecteur de disques","pt":"Drives!","ru":"Приводы","zh":"驱动器"});
Translation.addTranslation("Craft a Disk Drive to be able to store your disks", {"de":"Stelle ein Laufwerk her um Speicherzellen zu lagern","es":"Haz un Almacén de Discos para almacenar tus discos","fr":"Crafter un lecteur de disques pour pouvoir stocker vos disques","pt":"Fabrique uma Unidade de Disco para poder armazenar seus discos.","ru":"Создайте дисковый привод, чтобы иметь возможность хранить ваши диски","zh":"制作【磁盘驱动器】以便能够存储磁盘"});
Translation.addTranslation("Manipulating disks", {"de":"Speichermanipulation","es":"Manipulando discos","fr":"Disque manipulateur","pt":"Manipulando discos!","ru":"Манипулирование дисками","zh":"磁盘操纵器"});
Translation.addTranslation("Use a Disk Manipulator to easily modify contents of disks", {"de":"Benutze einen Speichermanipulator, um Speicherzellen einfach zu bearbeiten","es":"Use un Manipulador de Discos Para modificar los datos en discos","fr":"Utiliser un disque manipulateur pour modifier facilement le contenu des disques","pt":"Use um Manipulador de Disco para modificar facilmente conteúdos de discos.","ru":"Используйте Манипулятор для простого изменения содержимого дисков","zh":"使用【磁盘操纵器】可以轻松修改磁盘内容"});
Translation.addTranslation("Storing items", {"de":"Items Speichern","es":"Almacenando objetos","fr":"Stocker les items","pt":"Armazenando itens!","ru":"Хранение предметов","zh":"存储物品"});
Translation.addTranslation("Craft a Storage Disk and put it in your Disk Drive", {"de":"Stelle eine Speicherzelle her und lege sie in ein Laufwerk","es":"Haz un Disco Duro y colocalo en el almacén","fr":"Crafter un disque et le mettre dans un lecteur","pt":"Fabrique um Disco de Armazenamento e coloque em sua unidade de disco.","ru":"Создайте диск для хранения и поместите его на свой дисковый привод.","zh":"制作【存储磁盘】并将其放入【磁盘驱动器】中"});
Translation.addTranslation("Viewing items", {"de":"Items Betrachten","es":"Viendo Objetos","fr":"Voir les items","pt":"Visualizando itens!","ru":"Просмотр предметов","zh":"浏览物品"});
Translation.addTranslation("Craft a Grid to interact with your item storage", {"de":"Stelle eine Konsole her, um mit deinem Speicher zu interagieren","es":"Haz un Panel para interactuar con tus objetos almacenados","fr":"Crafter une grille pour intéragir avec votre stockage d'item","pt":"Fabrique uma Grade para interagir com seu armazenamento de itens.","ru":"Создайте терминал для взаимодействия с хранилищем предметов","zh":"制作网格以与您的物品存储进行交互"});
Translation.addTranslation("Portable storage", {"de":"Tragbarer Speicher","es":"Almacén Portátil","fr":"Stockage portatif","pt":"Armazenamento portátil!","ru":"Портативное хранение","zh":"便携式存储"});
Translation.addTranslation("Craft a Portable Grid to access items and fluids in disks without being in a network", {"de":"Stelle einen Tragbaren Speicher her, um Items außerhalb eines Netzwerks zu speichern","ru":"Создайте переносимый терминал для доступа к предметам на дисках без подключения к сети","zh":"制作【便携式网格】，以便在不在网络中的情况下访问磁盘中的项目和流体"});
Translation.addTranslation("Upgrading your Grid", {"de":"Konsolenupgrade","es":"Mejorando el Panel","fr":"Améliorer votre grille","pt":"Aprimorando sua grade!","ru":"Обновление терминала","zh":"升级你的网络"});
Translation.addTranslation("Upgrade your Grid to a Crafting Grid to get crafting abilities in your Grid", {"de":"Erweitere eine Konsole zu einer Fertigungskonsole um eine Werkbank in der Konsole zu erhalten","es":"Mejora tu panel a uno de Panel de Fabricación Para fabricar y ver objetos","fr":"Améliorer votre grille vers une grille de craft pour pouvoir crafter dans votre grille","pt":"Aprimore sua grade para uma Grade de Fabricações para obter habilidades de fabricar na sua grade.","ru":"Обновите терминал до терминала создания, чтобы получить способности создания в терминале","zh":"将网络升级到合成网络以获得网络中的制作能力"});
Translation.addTranslation("Storing fluids", {"de":"Flüssigkeiten Speichern","es":"Guardando Fluidos","fr":"Stocker des fluides","pt":"Armazenando fluidos!","ru":"Хранение жидкостей","zh":"储存液体"});
Translation.addTranslation("Craft a Fluid Storage Disk and put it in your Disk Drive", {"de":"Stelle eine Flüssigspeicherzelle her und lege sie in ein Laufwerk","es":"Haz un Disco Duro de Fluidos y colocalo en el Almacén de Discos","fr":"Crafte un disque de fluide et le mettre dans un lecteur","pt":"Fabrique um Disco de Armazenamento de Fluidos e coloque em sua unidade de disco.","ru":"Создайте диск с жидкостью и поместите его на свой диск","zh":"制作一个【流体存储磁盘】并将其放入【磁盘驱动器】中"});
Translation.addTranslation("Viewing fluids", {"de":"Flüssigkeiten Betrachten","es":"Viendo Flujo","fr":"Voir les fluides","pt":"Visualizando fluidos!","ru":"Просмотр жидкостей","zh":"浏览液体"});
Translation.addTranslation("Craft a Fluid Grid to interact with your fluid storage", {"de":"Stelle eine Flüssigkeitskonsole her, um mit Flüssigkeiten in deinem Speicher zu interagieren","es":"Haz un Panel de Fluidos para interactuar con tu almacén de fluidos","fr":"Crafter une grille pour intéragir avec votre stockage de fluides","pt":"Fabrique uma Grade De Fluidos para interagir com o seu armazenamento de fluidos.","ru":"Создайте идкостный терминал для взаимодействия с жидкостью","zh":"制作网格以与您的液体存储进行交互"});
Translation.addTranslation("Better than a barrel", {"de":"Besser als ein Fass","es":"Mejor que un barril","fr":"Mieux qu'un barril","pt":"Melhor do que um barril!","ru":"Лучше, чем бочка","zh":"比桶更好"});
Translation.addTranslation("Craft a Storage Monitor to view, insert or extract items of a network", {"de":"Stelle einen Speichermonitor her, um mit Items in deinem Speicher abzulegen oder herauszunehmen","es":"Haz un Monitor de Almacén para ver, insertar o extraer objetos de la red","fr":"Crafter un moniteur de stockage pour voir, insérer ou extraire des items de votre réseau","pt":"Fabrique um Monitor de Armazenamento para visualizar, inserir ou extrair itens de uma rede.","ru":"Создайте монитор хранилища для просмотра, вставки или извлечения предметов в сети","zh":"制作【存储监视器】以查看，插入或提取网络项"});
Translation.addTranslation("Autocrafting", {"de":"Automatische Fertigung","es":"Autofabricación","fr":"Autocrafter","pt":"Auto-fabricação!","ru":"Автосоздание","zh":"自动合成"});
Translation.addTranslation("Craft a Crafter", {"de":"Stelle eine Fertigungseinheit her","es":"Fabrica un Fabricador","fr":"Crafter un crafteur","pt":"Fabrique um Fabricador.","ru":"Создайте крафтер","zh":"制作一个【装配室】"});
Translation.addTranslation("Pattern creation", {"de":"Vorlagen","es":"Creación de Patrones","fr":"Création de modèle","pt":"Criação de padrões!","ru":"Создание шаблонов","zh":"模式创建"});
Translation.addTranslation("Create patterns with a Pattern Grid and a Pattern", {"de":"Stelle eine Vorlage mit einer Vorlagenkonsole her","es":"Crea patrones usando un panel de patrones y un patrón","fr":"Créer des modèles avec la grille de modèle et un modèle","pt":"Crie padrões com uma Grade de Padrões e um Padrão.","ru":"Создайте шаблоны с помощью терминала шаблонов и шаблона","zh":"使用模式网络和模式创建模式"});
Translation.addTranslation("Monitoring", {"de":"Überwachung","es":"Monitoreo","fr":"Controller","pt":"Monitoramento!","ru":"Мониторинг","zh":"监控器！"});
Translation.addTranslation("Check the status of your crafting tasks with a Crafting Monitor", {"de":"Überprüfe den Fortschritt deiner automatischen Fertigung mit einem Fertigungsmonitor","es":"Verifica el estado de las tareas de fabricación con un Monitor de Fabricación","fr":"Vérifier le statut de vos tâches de crafts avec le moniteur de crafts","pt":"Verifique os status das suas tarefas de fabricação com um Monitor de Fabricações.","ru":"Проверьте состояние вашей задачи крафта, с помощью монитора создания","zh":"使用【合成监控器】检查制作任务的状态"});
Translation.addTranslation("Managing patterns", {"de":"Vorlagen Ordnen","ru":"Управление шаблонами","zh":"管理模式"});
Translation.addTranslation("Craft a Crafter Manager to manage your patterns in a better way", {"de":"Stelle einen Vorlagenmanager her, um deine Vorlagen zu sortieren","ru":"Создайте крафтер менеджер, чтобы лучше управлять своими шаблонами","zh":"制作【合成管理器】以更好的方式管理您的模式"});
Translation.addTranslation("Importing", {"de":"Importieren","es":"Importando","fr":"Importer","pt":"Importação!","ru":"Импорт","zh":"输入总线"});
Translation.addTranslation("Get items or fluids into the storage network with an Importer", {"de":"Importiere Items oder Flüssigkeiten mit einem Importierer","es":"Inserta objetos o fluidos a la red con un importador","fr":"Amener des items ou fluides dans le réseau de stockage avec un importeur","pt":"Obtenha itens ou fluidos da rede de armazenamento com um Importador.","ru":"Получите предметы или жидкости в сеть хранения с помощью импортера","zh":"使用【输入总线】将物品或流体输入存储网络"});
Translation.addTranslation("Destruction", {"de":"Zerstörung","es":"Destrucción","fr":"Destruction","pt":"Destruição!","ru":"Уничтожение","zh":"破坏面板"});
Translation.addTranslation("Get blocks or fluids into the storage network with a Destructor", {"de":"Benutze einen Destruktor, um Blöcke oder Flüssigkeiten in den Speicher zu importieren","es":"Inserta bloques o fluidos a la red con un destructor","fr":"Amener des blocs ou fluides dans le réseau de stockage avec un destructeur","pt":"Obtenha blocos ou fluidos da rede de armazenamento com um Destruidor.","ru":"Получите блоки или жидкости в сеть хранения с уничтожителя","zh":"使用【破坏面板】将块或流体存储到存储网络中"});
Translation.addTranslation("Exporting", {"de":"Exportieren","es":"Exportando","fr":"Exporter","pt":"Exportação!","ru":"Экспорт","zh":"输出总线"});
Translation.addTranslation("Get items or fluids out of the storage network with an Exporter", {"de":"Exportiere Items oder Flüssigkeiten mit einem Exportierer","es":"Saca objetos o fluidos de la red con un exportador","fr":"Sortir des items ou fluides du réseau de stockage avec un exporteur","pt":"Obtenha itens ou fluidos fora da rede de armazenamento com um Exportador.","ru":"Получите предметы или жидкости из сети хранения с помощью экспортера","zh":"使用【输出总线】将物品或流体输出存储网络"});
Translation.addTranslation("Construction", {"de":"Konstruktion","es":"Construcción","fr":"Construction","pt":"Construção!","ru":"Строительство","zh":"成型面板"});
Translation.addTranslation("Get blocks or fluids out of the storage network with a Constructor", {"de":"Benutze einen Konstruktor, um Blöcke oder Flüssigkeitne aus dem Speicher zu exportieren","es":"Saca bloques o fluidos de la red con un constructor","fr":"Sortir des blocs ou fluides du réseau de stockage avec un constructeur","pt":"Obtenha blocos ou fluidos fora da rede de armazenamento com um Construtor.","ru":"Получите блоки или жидкости из сети хранения с помощью строителя","zh":"使用【成型面板】将物品或流体从存储网络放置出来"});
Translation.addTranslation("Security", {"de":"Sicherheit","es":"Seguridad","fr":"Sécurité","pt":"Segurança!","ru":"Безопасность","zh":"安保"});
Translation.addTranslation("Secure your network with a Security Manager and a Security Card", {"de":"Sichere dein Netzwerk mit einem Sicherheitsmanager und einer Sicherheitskarte","es":"Asegura tu red con un Centro de Seguridad y una Tarjeta de Seguridad","fr":"Securisez votre réseau avec un poste de sécurité et une carte de sécurité","pt":"Proteja sua rede com um Gerente de Segurança e um Cartão de Segurança.","ru":"Защитите сеть с помощью менеджера безопасности и карты безопасности","zh":"使用【安全管理器】和【安全卡】保护您的网络"});
Translation.addTranslation("Wireless", {"de":"Drahtlos","es":"Wi-FI","fr":"Sans fil","pt":"Wireless!","ru":"Беспроводной","zh":"无线"});
Translation.addTranslation("Transmit a network signal with a Wireless Transmitter", {"de":"Übertrage ein Netzwerksignal mit einem Funksender","es":"Transmite la señal de tu red con un Transmisor de red","fr":"Transmettez un signal réseau avec un émetteur sans fil","pt":"Transmita um sinal de rede com um Transmissor Wireless.","ru":"Передайте сетевой сигнал с помощью беспроводного передатчика","zh":"使用【无线发射器】传输网络信号"});
Translation.addTranslation("Wireless items", {"de":"Drahtlose Items","es":"Objetos Inalámbrico","fr":"Items sans fil","pt":"Itens Wireless!","ru":"Беспроводные предметы","zh":"无线传输物品"});
Translation.addTranslation("Interact with your item storage wirelessly with a Wireless Grid", {"de":"Interagiere mit deinen Items über eine mobile Konsole","es":"Interactua con tus objetos guardados inalámbricamente con tu Panel Inalámbrico","fr":"Interagissez avec votre stockage d'items a distance avec votre grille sans fil","pt":"Interaja com o seu armazenamento de itens wireless com uma Grade Wireless.","ru":"Взаимодействуйте с Вашим устройством хранения данных беспроводным способом с помощью беспроводного терминала","zh":"使用【无线终端】以无线方式与您的物品存储进行交互"});
Translation.addTranslation("Wireless fluids", {"de":"Drahtlose Flüssigkeit","es":"Fluidos Inalámbricos","fr":"Fluides sans fils","pt":"Fluidos Wireless!","ru":"Беспроводные жидкости","zh":"无线传输液体"});
Translation.addTranslation("Interact with your fluid storage wirelessly with a Wireless Fluid Grid", {"de":"Interagiere mit deinem Flüssigkeitsspeicher über eine mobile Flüssigkeitskonsole","es":"Interactua con tus fluidos guardados inalámbricamente con tu Panel de Fluidos Inalámbrico","fr":"Interagissez avec votre stockage de fluide à distance avec une grille de fluides sans fil","pt":"Interaja com o seu armazenamento de fluidos wireless com uma Grade de Fluidos Wireless.","ru":"Взаимодействуйте с Вашим жидкостным устройством хранения данных беспроводным способом с помощью жидкостного беспроводного терминала","zh":"使用【无线液体终端】以无线方式与您的液体存储进行交互"});
Translation.addTranslation("Wireless monitoring", {"de":"Drahtlose Überwachung","es":"Ojos en la Red","fr":"Controller","pt":"Monitoramento Wireless!","ru":"Беспроводной мониторинг","zh":"无线监控器"});
Translation.addTranslation("Check the status of your crafting tasks wirelessly with a Wireless Crafting Monitor", {"de":"Überprüfe drahtlos den Fertigungsfortschritt über einen mobilen Fertigungsmonitor","es":"Verifica el estado de las tareas de fabricación inalámbricamente con el Monitor de Fabricación Inalámbrico","fr":"Controller le statut de vos taches de craft à distance avec un moniteur de crafts sans fil","pt":"Verifique o status de suas tarefas de fabricação wireless com um Monitor de Fabricações Wireless.","ru":"Проверьте состояние ваших задач по управлению беспроводным способом с помощью беспроводного монитора создания","zh":"使用【无线合成监控器】以无线方式检查制作任务的状态"});
Translation.addTranslation("No cables required", {"de":"Kabellos","es":"¿para qué cables?","fr":"Aucun cable demandé","pt":"Não são necessários cabos!","ru":"Не требуется никаких кабелей","zh":"无需电缆"});
Translation.addTranslation("Add extra components to your network without using cables by using a Network Transmitter, Network Receiver and Network Card", {"de":"Füge neue Geräte deinem Netzwerk hinzu, indem du einen Netzwerkempfänger, einen Netzwerksender und eine Netzwerkkarte benutzt","es":"Añade más componentes a la red sin usar cables, solo usando un Transmisor de Red, Receptor de Red y una Tarjeta de Red","fr":"Ajoutez des composants supplémentaires à votre réseau sans utiliser un emetteur réseau, un recepteur réseau ou une carte réseau","pt":"Adicione componentes adicionais à sua rede sem usar cabos usando um Transmissor de Rede, Receptor de Rede e Cartão de Rede.","ru":"Добавьте дополнительные компоненты в свою сеть без использования кабелей с помощью сетевого передатчика, сетевого приемника и сетевой карты","zh":"使用【网络发送器】，【网络接收器】和【网卡】，无需使用电缆即可为网络添加额外组件"});
Translation.addTranslation("Upgrading", {"de":"Upgrades","es":"Mejorando","fr":"Amélioration","pt":"Aprimorando!","ru":"Модернизация","zh":"升级组件！"});
Translation.addTranslation("Craft an Upgrade to improve various devices", {"de":"Stelle ein beliebiges Upgrade her","es":"Haz una Mejora","fr":"Craftez une amélioration","pt":"Fabrique um Aprimoramento.","ru":"Создайте обновление","zh":"制作升级组件以改进各种设备"});
Translation.addTranslation("Crafting on demand", {"de":"Fertigung auf Befehl","es":"Pedido a domicilio","fr":"Crafter à la demande","pt":"Fabrique sob demanda!","ru":"Создание по требованию","zh":"按需制作"});
Translation.addTranslation("Use a Crafting Upgrade in a Interface, Exporter or Constructor to craft items and blocks on demand", {"de":"Benutze ein Fertigungsupgrade in einer Schnittstelle, einem Exportierer oder einem Konstruktor um Items nach Bedarf herzustellen","es":"Usa la Mejora de Fabricación en una Interfaz, Exportador o Constructor para fabricar objetos y bloques en demanda","fr":"Utilisez une amélioration de craft dans une interface, un exporteur ou un constructeur pour crafter des items ou blocs à la demande","pt":"Use um Aprimoramento de Fabricação em uma Interface, Exportador ou Construtor para fabricar itens e blocos sob demanda.","ru":"Используйте обновление создания в интерфейсе, экспортере или строителе для создания предметов и блоков по требованию","zh":"使用【合成升级】在接口、输出总线或成型面板按需合成物品或实体"});
Translation.addTranslation("More than just storage", {"de":"Mehr als nur Speicher","es":"Mas que almacenamiento","fr":"Plus qu'un simple stockage","pt":"Mais do que apenas o armazenamento!","ru":"Больше, чем просто хранение","zh":"不仅仅是存储"});
Translation.addTranslation("Transfer items, fluids, energy and redstone from a Reader to a Writer", {"de":"Übertrage Items, Flüssigkeiten, Energie und Redstone zwischen einem Schreibgerät und einem Lesegerät","es":"Transfiere Objetos, fluidos, energía y redstone desde un Lector a un Escritor","fr":"Transférer des items, fluides, energie et redstone d'un lecteur vers un imprimeur","pt":"Transfira itens, fluidos, energia e redstone de um Leitor para um Escritor.","ru":"Перенесите предметы, жидкости, энергию и редстоун из чтения в запись","zh":"将物品，液体，能量和红石从【读取器】转移到【写入器】"});
Translation.addTranslation("Detecting", {"de":"Erfassung","es":"Detectando","fr":"Detection","pt":"Detecção!","ru":"Обнаружение","zh":"检测"});
Translation.addTranslation("Detect items or fluids in the network with the Detector", {"de":"Benutze einen Detektor um Items oder Flüssigkeiten in einem Netzwerk zu erfassen","es":"Detecta objetos o fluidos en la red con el Detector","fr":"Detectez les items ou fluides dans le réseau avec un détecteur","pt":"Detectar itens ou fluidos da rede com o Detector.","ru":"Обнаружьте предметы или жидкости в сети с помощью детектора","zh":"使用【检测器】检测网络中的项目或流体"});
Translation.addTranslation("Interface to the world", {"de":"Schnittstelle zur Welt","es":"Interfaz al Mundo","fr":"Interface vers le monde","pt":"Interface para o mundo!","ru":"Интерфейс к миру","zh":"与世界的接口"});
Translation.addTranslation("Export and import items at the same time with an Interface", {"de":"Benutze ein Interface, um gleichzeitig Items zu exportieren und zu importieren","ru":"Сделайте свою систему хранения доступной в качестве обычного инвентаря для всего мира, используя интерфейс","zh":"使用接口同时导出和导入物品"});
Translation.addTranslation("Storing externally", {"de":"Speicher auslagern","es":"Almacén externo","fr":"Stocker éternellement","pt":"Armazenando externamente!","ru":"Внешнее хранение","zh":"外部存储"});
Translation.addTranslation("Use an External Storage to provide the network with storage from an external block like a chest", {"de":"Benutze einen externen Speicher um externe Itemquellen wie zum Beispiel Kisten anzubinden","es":"Usa un Almacén Externo para que la red tenga almacenamiento desde un bloque externo como un cofre","fr":"Utilisez un stockage externe pour fournir au réseau un stockage à partir d'un bloc externe comme un coffre","pt":"Use um Armazenamento Externo para fornecer à rede o armazenamento de um bloco externo como um baú.","ru":"Используя внешнее хранение, обеспечьте сети хранения из внешнего блока, например, сундука","zh":"使用【外部存储总线】为网络提供来自外部实体的存储"});
Translation.addTranslation("Covering", {"de":"Verstecken","ru":"Покрытие","zh":"伪装板"});
Translation.addTranslation("Craft a Cover to hide cables", {"de":"Verstecke Kabel hinter einer Fassade","ru":"Создайте крышку, чтобы скрыть кабели","zh":"合成【伪装板】来隐藏线缆"});
Translation.addTranslation("Hollow covering", {"de":"Hohle Fassaden","ru":"Полое покрытие","zh":"空心伪装板"});
Translation.addTranslation("Craft a Hollow Cover to hide cables, but still let cable through", {"de":"Stelle eine hohle Fassade her um Kabel zu verstecken, aber weiterhin durchleiten zu können","ru":"Создайте полый корпус, чтобы скрыть кабели, но все же пропустите кабель","zh":"合成【空心伪装板】来隐藏线缆并不阻碍线缆穿过"});
Translation.addTranslation("Binding", {"de":"Verbundsstoff","ru":"Связка","zh":"粘合物"});
Translation.addTranslation("Craft Processor Binding to craft the various processors", {"de":"Stelle Prozessor Rohmaterial her, um Prozessoren zu bauen.","ru":"Создайте связанный процессор, чтобы обрабатывать различные процессоры","zh":"合成【处理器粘合物】来制作各种处理器"});
/* Translation.addTranslation("Open Wireless Grid", {});
Translation.addTranslation("Open Wireless Fluid Grid", {});
Translation.addTranslation("Open Portable Grid", {});
Translation.addTranslation("Open Wireless Crafting Monitor", {}); */
Translation.addTranslation('Hey, new version is available, please, update', {ru:'Доступна новая версия, пожалуйста, обновитесь'});
Translation.addTranslation('Information', {ru:'Информация'});
Translation.addTranslation('Changelog', {ru:'Обновления'});
Translation.addTranslation('Top donaters', {ru:'Топ донатеры'});




// file: items/disk.js

EnergyUse['disk'] = Config.energy_uses.diskDrivePerDisk;
Disk.register('1k Storage Disk', '1Kdisk', 1000);
/* if(Config.dev)Item.registerUseFunction("storageDisk1000", function (coords, item, block) {
    if(item.data == 0) item.data = DiskData.length;
    disk_data = Disk.getDiskData(item);
    for(var i = 1; i <= 5000; i++){
        var item1 = {id: i, data: 0, count: i*100000, extra: null};
        disk_data.items[i + '_0'] = item1;
    }
    disk_data.items_stored = 1000;
}) */
Disk.register('4k Storage Disk', '4Kdisk', 4000);
Disk.register('16k Storage Disk', '16Kdisk', 16000);
Disk.register('64k Storage Disk', '64Kdisk', 64000);
Disk.register('Creative Storage Disk', 'creativeDisk', Infinity);




// file: items/craftItems.js

IDRegistry.genItemID("1k_storage_part");
Item.createItem("1k_storage_part", '1k Storage Part', {
	name: '1k_storage_part'
}, {
	stack: 64
});
mod_tip(ItemID["1k_storage_part"]);

IDRegistry.genItemID("4k_storage_part");
Item.createItem("4k_storage_part", '4k Storage Part', {
	name: '4k_storage_part'
}, {
	stack: 64
});
mod_tip(ItemID["4k_storage_part"]);

IDRegistry.genItemID("16k_storage_part");
Item.createItem("16k_storage_part", '16k Storage Part', {
	name: '16k_storage_part'
}, {
	stack: 64
});
mod_tip(ItemID["16k_storage_part"]);

IDRegistry.genItemID("64k_storage_part");
Item.createItem("64k_storage_part", '64k Storage Part', {
	name: '64k_storage_part'
}, {
	stack: 64
});
mod_tip(ItemID["64k_storage_part"]);

IDRegistry.genItemID("silicon");
Item.createItem("silicon", 'Silicon', {
	name: 'silicon'
}, {
	stack: 64
});
mod_tip(ItemID["silicon"]);

IDRegistry.genItemID("processor_binding");
Item.createItem("processor_binding", 'Processor Binding', {
	name: 'processor_binding'
}, {
	stack: 64
});
mod_tip(ItemID["processor_binding"]);

IDRegistry.genItemID("quartz_enriched_iron");
Item.createItem("quartz_enriched_iron", 'Quartz Enriched Iron', {
	name: 'quartz_enriched_iron'
}, {
	stack: 64
});
mod_tip(ItemID["quartz_enriched_iron"]);

IDRegistry.genItemID("raw_basic_processor");
Item.createItem("raw_basic_processor", 'Raw Basic Processor', {
	name: 'raw_basic_processor'
}, {
	stack: 64
});
mod_tip(ItemID["raw_basic_processor"]);

IDRegistry.genItemID("raw_improved_processor");
Item.createItem("raw_improved_processor", 'Raw Improved Processor', {
	name: 'raw_improved_processor'
}, {
	stack: 64
});
mod_tip(ItemID["raw_improved_processor"]);

IDRegistry.genItemID("raw_advanced_processor");
Item.createItem("raw_advanced_processor", 'Raw Advanced Processor', {
	name: 'raw_advanced_processor'
}, {
	stack: 64
});
mod_tip(ItemID["raw_advanced_processor"]);

IDRegistry.genItemID("basic_processor");
Item.createItem("basic_processor", 'Basic Processor', {
	name: 'basic_processor'
}, {
	stack: 64
});
mod_tip(ItemID["basic_processor"]);

IDRegistry.genItemID("improved_processor");
Item.createItem("improved_processor", 'Improved Processor', {
	name: 'improved_processor'
}, {
	stack: 64
});
mod_tip(ItemID["improved_processor"]);

IDRegistry.genItemID("advanced_processor");
Item.createItem("advanced_processor", 'Advanced Processor', {
	name: 'advanced_processor'
}, {
	stack: 64
});
mod_tip(ItemID["advanced_processor"]);

IDRegistry.genItemID("construction_core");
Item.createItem("construction_core", 'Construction Core', {
	name: 'construction_core'
}, {
	stack: 64
});
mod_tip(ItemID["construction_core"]);

IDRegistry.genItemID("destruction_core");
Item.createItem("destruction_core", 'Destruction Core', {
	name: 'destruction_core'
}, {
	stack: 64
});
mod_tip(ItemID["destruction_core"]);

IDRegistry.genItemID("storage_housing");
Item.createItem("storage_housing", 'Storage Housing', {
	name: 'storage_housing'
}, {
	stack: 64
});
mod_tip(ItemID["storage_housing"]);

IDRegistry.genItemID("rs_upgrade");
Item.createItem("rs_upgrade", 'Upgrade', {
	name: 'rs_upgrade'
}, {
	stack: 64
});
mod_tip(ItemID["rs_upgrade"]);




// file: items/upgrades.js

UpgradeRegistry.register('Speed Upgrade', 'RSSpeedUpgrade', 'rs_speed_upgrade', {
    addFunc: function(tileEntity, item, container, slot, player){
        tileEntity.data.speed -= 2;
    },
    deleteFunc: function(tileEntity, item, container, slot, player){
        tileEntity.data.speed += 2;
    }
}, Config.energy_uses.upgrades['speed']);
UpgradeRegistry.register('Stack Upgrade', 'RSStackUpgrade', 'rs_stack_upgrade', {
    maxStack: 1,
    addFunc: function(tileEntity, item, container, slot, player){
        tileEntity.data.count = 64;
    },
    deleteFunc: function(tileEntity, item, container, slot, player){
        tileEntity.data.count = 1;
    }
}, Config.energy_uses.upgrades['stack']);




// file: blocks/diskDrive.js

IDRegistry.genBlockID("diskDrive");
Block.createBlockWithRotation("diskDrive", [
	{
		name: "Disk Drive",
		texture: [
			["disk_drive_bottom", 0], // bottom
			["disk_drive_top", 0], // top
			["disk_drive_side", 0], // back
			["disk_drive", 0], // front
			["disk_drive_side", 0], // left
			["disk_drive_side", 0]  // right
		],
		inCreative: true
	}
]);
mod_tip(BlockID['diskDrive']);
RS_blocks.push(BlockID.diskDrive);
EnergyUse[BlockID['diskDrive']] = Config.energy_uses.diskDrive;

const diskDriveTexture = [
	["disk_drive_bottom", 0], // bottom
	["disk_drive_top", 0], // top
	["disk_drive_side", 0], // back
	["disk_drive", 0], // front
	["disk_drive_side", 0], // left
	["disk_drive_side", 0]  // right
];
const diskDriveTextures = [[diskDriveTexture[0], [diskDriveTexture[1][0], 0], diskDriveTexture[2], diskDriveTexture[3], diskDriveTexture[4], diskDriveTexture[5]], [diskDriveTexture[0], [diskDriveTexture[1][0], 1], diskDriveTexture[3], diskDriveTexture[2], diskDriveTexture[5], diskDriveTexture[4]], [diskDriveTexture[0], [diskDriveTexture[1][0], 2], diskDriveTexture[5], diskDriveTexture[4], diskDriveTexture[2], diskDriveTexture[3]], [diskDriveTexture[0], [diskDriveTexture[1][0], 3], diskDriveTexture[4], diskDriveTexture[5], diskDriveTexture[3], diskDriveTexture[2]]];

const diskDriveLedTextures = function(index, block_data){
	block_data = block_data || 0;
	var sideTexture = "disk_drive_disks";
	if(block_data == 1 || block_data == 3)sideTexture = "reverse_disk_drive_disks";
	return [
		["disk_drive_disks_top", 0], // bottom
		["disk_drive_disks_top", 0], // top
		[sideTexture, index], // back
		[sideTexture, index], // front
		[sideTexture, index], // left
		[sideTexture, index]  // right
	]
}

const diskDriveLedBoxes = [
	[
		[2*(1/16), 14*(1/16), 1, 7*(1/16), 12*(1/16), 1+1*(1/16)],
		[9*(1/16), 14*(1/16), 1, 14*(1/16), 12*(1/16), 1+1*(1/16)],
		[2*(1/16), 11*(1/16), 1, 7*(1/16), 9*(1/16), 1+1*(1/16)],
		[9*(1/16), 11*(1/16), 1, 14*(1/16), 9*(1/16), 1+1*(1/16)],
		[2*(1/16), 8*(1/16), 1, 7*(1/16), 6*(1/16), 1+1*(1/16)],
		[9*(1/16), 8*(1/16), 1, 14*(1/16), 6*(1/16), 1+1*(1/16)],
		[2*(1/16), 5*(1/16), 1, 7*(1/16), 3*(1/16), 1+1*(1/16)],
		[9*(1/16), 5*(1/16), 1, 14*(1/16), 3*(1/16), 1+1*(1/16)]
	],
	[
		[9*(1/16), 14*(1/16), 0, 14*(1/16), 12*(1/16), 0-1*(1/16)],
		[2*(1/16), 14*(1/16), 0, 7*(1/16), 12*(1/16), 0-1*(1/16)],
		[9*(1/16), 11*(1/16), 0, 14*(1/16), 9*(1/16), 0-1*(1/16)],
		[2*(1/16), 11*(1/16), 0, 7*(1/16), 9*(1/16), 0-1*(1/16)],
		[9*(1/16), 8*(1/16), 0, 14*(1/16), 6*(1/16), 0-1*(1/16)],
		[2*(1/16), 8*(1/16), 0, 7*(1/16), 6*(1/16), 0-1*(1/16)],
		[9*(1/16), 5*(1/16), 0, 14*(1/16), 3*(1/16), 0-1*(1/16)],
		[2*(1/16), 5*(1/16), 0, 7*(1/16), 3*(1/16), 0-1*(1/16)]
	],
	[
		[1, 14*(1/16), 9*(1/16), 1+1*(1/16), 12*(1/16), 14*(1/16)],
		[1, 14*(1/16), 2*(1/16), 1+1*(1/16), 12*(1/16), 7*(1/16)],
		[1, 11*(1/16), 9*(1/16), 1+1*(1/16), 9*(1/16), 14*(1/16)],
		[1, 11*(1/16), 2*(1/16), 1+1*(1/16), 9*(1/16), 7*(1/16)],
		[1, 8*(1/16), 9*(1/16), 1+1*(1/16), 6*(1/16), 14*(1/16)],
		[1, 8*(1/16), 2*(1/16), 1+1*(1/16), 6*(1/16), 7*(1/16)],
		[1, 5*(1/16), 9*(1/16), 1+1*(1/16), 3*(1/16), 14*(1/16)],
		[1, 5*(1/16), 2*(1/16), 1+1*(1/16), 3*(1/16), 7*(1/16)]
	],
	[
		[0, 14*(1/16), 2*(1/16), 0-1*(1/16), 12*(1/16), 7*(1/16)],
		[0, 14*(1/16), 9*(1/16), 0-1*(1/16), 12*(1/16), 14*(1/16)],
		[0, 11*(1/16), 2*(1/16), 0-1*(1/16), 9*(1/16), 7*(1/16)],
		[0, 11*(1/16), 9*(1/16), 0-1*(1/16), 9*(1/16), 14*(1/16)],
		[0, 8*(1/16), 2*(1/16), 0-1*(1/16), 6*(1/16), 7*(1/16)],
		[0, 8*(1/16), 9*(1/16), 0-1*(1/16), 6*(1/16), 14*(1/16)],
		[0, 5*(1/16), 2*(1/16), 0-1*(1/16), 3*(1/16), 7*(1/16)],
		[0, 5*(1/16), 9*(1/16), 0-1*(1/16), 3*(1/16), 14*(1/16)]
	]
]

for (var ibc = 0; ibc < 4; ibc++) {
	var render = new ICRender.Model();
	var model = BlockRenderer.createTexturedBlock(diskDriveTextures[ibc]);
	render.addEntry(model);
	BlockRenderer.enableCoordMapping(BlockID["diskDrive"], ibc, render);
}

function getDiskState(stored, capacity) {
	if (stored >= capacity) {
		return 2;
	} else if (stored / capacity >= 0.75) {
		return 1;
	} else {
		return 0;
	}
}

function mapDisks(coords, block_data, disks_data, _off){
	var render = new ICRender.Model();
	var model = BlockRenderer.createTexturedBlock(diskDriveTextures[block_data]);
	for(var k = 0; k < 8; k++){
		if(Disk.items[disks_data[k].id]){
			var led_index = !_off ? 3 : getDiskState(disks_data[k].items_stored, disks_data[k].storage);
			model.addBox(diskDriveLedBoxes[block_data][k][0], diskDriveLedBoxes[block_data][k][1], diskDriveLedBoxes[block_data][k][2], diskDriveLedBoxes[block_data][k][3], diskDriveLedBoxes[block_data][k][4], diskDriveLedBoxes[block_data][k][5], diskDriveLedTextures(led_index, block_data));
		}
	}
	render.addEntry(model);
	BlockRenderer.mapAtCoords(coords.x, coords.y, coords.z, render);
}

var elementsGUI_dd = {};
function initDDelements() {
	var x = 650;
	var y = 90;
	var _y = y + 0;

	elementsGUI_dd["scale"] = {
		type: "scale",
		x: 350,
		y: y,
		direction: 1,
		bitmap: "storage_scale_full",
		overlay: "storage_scale_empty",
		value: 0,
		scale: UI.getScreenHeight()*0.576/72,
		overlayScale: 4,
		onTouchEvent: function(element, event){
			if(event.type != 'CLICK') return;
			var tile = element.window.getContainer().tileEntity;
			alert(numberWithCommas(tile.data.stored) + (tile.data.storage != Infinity ? ' / ' + numberWithCommas(tile.data.storage) : ''));
		}
	};
	elementsGUI_dd["scale"].overlayScale = elementsGUI_dd["scale"].scale;

	var asd = 0;
	var cons = UI.getScreenHeight()*0.576/5;//60;
	y += cons/2;
	for (var k = 0; k < 4; k++) {
		x = 650;
		for (var i = 0; i < 2; i++) {
			elementsGUI_dd['slot' + asd] = {
				type: "slot",
				id: asd,
				x: x,
				y: y,
				z: 10,
				isValid: function (id, count, data, container) {
					var answer = !!Disk.items[id+''];
					return answer;
				},
				size: cons + 1
			}
			asd++;
			x += cons;
		}
		y += cons;
	}

	elementsGUI_dd['items'] = {
		type: "text",
		x: elementsGUI_dd["scale"].x + elementsGUI_dd["scale"].scale*18/2,
		y: 0,
		text: "0/0",
		font: {
			color: android.graphics.Color.WHITE,
			shadow: 0.5,
			size: 20
		}
	}
	elementsGUI_dd['items'].start_x = elementsGUI_dd['items'].x + 0;
	elementsGUI_dd['items'].x -= elementsGUI_dd['items'].font.size*3/2;
	elementsGUI_dd['items'].y = elementsGUI_dd["scale"].y - 10 - elementsGUI_dd['items'].font.size;
	elementsGUI_dd['percents'] = {
		type: "text",
		x: 0,
		y: 0,
		text: "0%",
		font: {
			color: android.graphics.Color.WHITE,
			shadow: 0.45,
			size: 17
		}
	}
	elementsGUI_dd['percents'].x = elementsGUI_dd["scale"].x + elementsGUI_dd["scale"].scale*18/2 - elementsGUI_dd['percents'].font.size;
	elementsGUI_dd['percents'].y = elementsGUI_dd["scale"].y + elementsGUI_dd["scale"].scale*72 + 10;
	var settings_cons = 10;
	elementsGUI_dd["redstone_button"] = {
		type: "button",
		x: 0,
		y: elementsGUI_dd['slot0'].y,
		bitmap: 'RS_empty_button',
		bitmap2: 'RS_empty_button_pressed',
		scale: cons*0.7/20,
		clicker: {
			onClick: function (itemContainerUiHandler, container, element) {
				container.sendEvent("updateRedstoneMode", {});
			},
			onLongClick: function (itemContainerUiHandler, container, element) {
			}
		}
	}
	elementsGUI_dd["redstone_button"].x = elementsGUI_dd['slot0'].x - settings_cons - (20 * elementsGUI_dd["redstone_button"].scale);

	elementsGUI_dd["image_redstone"] = {
		type: "image",
		x: elementsGUI_dd["redstone_button"].x,
		y: elementsGUI_dd["redstone_button"].y,
		z: 1000,
		bitmap: "redstone_GUI_0",
		scale: elementsGUI_dd["redstone_button"].scale*20/16,
	}

	elementsGUI_dd["access_type_button"] = {
		type: "button",
		x: elementsGUI_dd["redstone_button"].x,
		y: 0,
		bitmap: 'RS_empty_button',
		bitmap2: 'RS_empty_button_pressed',
		scale: cons*0.7/20,
		clicker: {
			onClick: function (position, container, tileEntity, window, canvas, scale) {
				/* tileEntity.data.access_type = tileEntity.data.access_type >= 2 ? 0 : tileEntity.data.access_type + 1;
				elementsGUI_dd["image_access_type"].bitmap = 'RS_dd_access_' + tileEntity.data.access_type;
				tileEntity.refreshRedstoneMode(); */
			},
			onLongClick: function (position, container, tileEntity, window, canvas, scale) {
			}
		}
	}
	elementsGUI_dd["access_type_button"].y = elementsGUI_dd['redstone_button'].y + (20 * elementsGUI_dd["redstone_button"].scale) + settings_cons;

	elementsGUI_dd["image_access_type"] = {
		type: "image",
		x: elementsGUI_dd["access_type_button"].x,
		y: elementsGUI_dd["access_type_button"].y,
		z: 1000,
		bitmap: "RS_dd_access_0",
		scale: elementsGUI_dd["access_type_button"].scale*20/16,
	}
}
initDDelements();

var diskDriveGUI = new UI.StandartWindow({
	standart: {
		header: {
			text: {
				text: Translation.translate("Disk Drive")
			}
		},
		inventory: {
			standart: true
		},
		background: {
			standart: true
		}
	},

	drawing: [],

	elements: elementsGUI_dd
});
GUIs.push(diskDriveGUI);
testButtons(diskDriveGUI.getWindow('header').getContent().elements, initDDelements);

var _ddfont = new JavaFONT(elementsGUI_dd['items'].font);
var getDiskDriveTextItemsWidth = function(){
	var drawScale = diskDriveGUI.getWindow('main').location.getDrawingScale();
	return _ddfont.getBounds(diskDriveGUI.getWindow('main').getElements().get('items').getBinding('text'), elementsGUI_dd['items'].x * drawScale, elementsGUI_dd['items'].y * drawScale, parseFloat(1.0)).width();
};

RefinedStorage.createTile(BlockID.diskDrive, {
	defaultValues: {
		storage: 0,
		stored: 0,
		NETWORK_ID: 'f',
		LAST_NETWORK_ID: 'f',
		disks: 0,
		items: {},
		disks_percents: [],
		block_data: 0,
		refreshModel: false,
		access_type: 0
	},
	useNetworkItemContainer: true,
	post_init: function(){
		if(!this.data.disks_percents)this.data.disks_percents = [];
		this.data.iinit = true;
		this.networkData.putString('slots', JSON.stringify(this.getDiskDatas()));
		this.container.setGlobalAddTransferPolicy({
			transfer: function(itemContainer, slot, id, count, data, extra, player){
				if(!Disk.items[id]) count = 0;
				return count;
			}
		});
	},
	post_setActive: function(state){
		if(this.data.NETWORK_ID != "f")RSNetworks[this.data.NETWORK_ID].info.updateItems();
	},
	click: function (id, count, data, coords, player, extra) {
		if (Entity.getSneaking(player)) return false;
		var client = Network.getClientForPlayer(player);
		if(!client) return true;
		if (this.container.getNetworkEntity().getClients().contains(client)) return true;
		this.container.openFor(client, "main");
		var _data = {
			name: this.networkData.getName() + '', 
			isActive: this.data.isActive, 
			redstone_mode: this.data.redstone_mode, 
			access_type: this.data.access_type
		};
		this.container.sendEvent(client, "openGui", _data); 
		return true;
	},
	getScreenByName: function(screenName) {
		if(screenName == 'main')return diskDriveGUI;
	},
	getDiskDatas: function(){
		var diskDatas = [];
		for (var i = 0; i < 8; i++) {
			var item = this.container.getSlot('slot' + i);
			if (!Disk.items[item.id]) {
				diskDatas.push({id: 0, data: 0, storage: 0, items_stored: 0});
				continue;
			}
			if (item.data == 0) item.data = DiskData.length;
			var disk_data = Disk.getDiskData(item);
			diskDatas.push({id: item.id, data: item.data, storage: disk_data.storage + "", items_stored: disk_data.items_stored});
		}
		return diskDatas;
	},
	tick: function () {
		StorageInterface.checkHoppers(this);
		if(this.data.refreshModel){
			this.refreshModel();
			this.data.refreshModel = false;
		}
		var storage = 0;
		var disks = 0;
		var stored = 0;
		var diskDatas = [];
		for (var i = 0; i < 8; i++) {
			var item = this.container.getSlot('slot' + i);
			var lastDiskPercent = this.data.disks_percents[i];
			if (!Disk.items[item.id]) {
				if(lastDiskPercent != undefined)this.data.refreshModel = true;
				delete this.data.disks_percents[i];
				diskDatas.push({id: 0, data: 0, storage: 0, items_stored: 0});
				continue;
			}
			if (item.data == 0) item.data = DiskData.length;
			var disk_data = Disk.getDiskData(item);
			diskDatas.push({id: item.id, data: item.data, storage: disk_data.storage + "", items_stored: disk_data.items_stored});
			var diskPercent = disk_data.items_stored/disk_data.storage;
			if(lastDiskPercent == undefined || ((lastDiskPercent < 0.75 && diskPercent >= 0.75) || (lastDiskPercent >= 0.75 && diskPercent < 0.75) || (lastDiskPercent < 1 && diskPercent >= 1)))this.data.refreshModel = true;
			disks++;
			storage += disk_data.storage;
			stored += disk_data.items_stored;
			this.data.disks_percents[i] = diskPercent;
		}
		if(this.data.disks != disks || this.data.storage != storage || this.data.stored != stored) {
			if(this.isWorkAllowed() && this.data.disks != disks)RSNetworks[this.data.NETWORK_ID].info.updateItems();
			this.networkData.putString('slots', JSON.stringify(diskDatas));
			this.networkData.sendChanges();
		}
		this.data.disks = disks;
		this.data.storage = String(storage);
		this.data.stored = stored;
		if (this.container.getNetworkEntity().getClients().iterator().hasNext()) {
			this.container.setScale('scale', stored == 0 ? 0 : stored / storage);
			this.container.setText('percents', stored == 0 ? '0%' : Math.ceil(stored / (storage / 100)) + '%');
			this.container.setText('items', cutNumber(stored) + (storage != Infinity ? '/' + cutNumber(storage) : ''));
			this.container.sendChanges();
		}
		return;
	},
	post_update_network: function(net_id){
		if(RSNetworks && RSNetworks[this.data.LAST_NETWORK_ID] && RSNetworks[this.data.LAST_NETWORK_ID].info)RSNetworks[this.data.LAST_NETWORK_ID].info.updateItems();
		if(this.data.iinit && this.isWorkAllowed()){
			RSNetworks[this.data.NETWORK_ID].info.updateItems();
			this.data.iinit = false;
		}
	},
	refreshModel: function(){
		if(!this.networkEntity) return Logger.Log(Item.getName(this.blockInfo.id, this.blockInfo.data) + ' model on: ' + cts(this) + ' cannot be displayed');
		this.sendPacket("refreshModel", {block_data: this.data.block_data, isActive: this.data.isActive, coords: {x: this.x, y: this.y, z: this.z, dimension: this.dimension}});
	},
	refreshGui: function(){
		var _data = {
			name: this.networkData.getName() + '', 
			isActive: this.data.isActive, 
			redstone_mode: this.data.redstone_mode, 
			access_type: this.data.access_type
		};
		this.container.sendEvent("refreshGui", _data);
	},
	getItems: function () {
		if (!this.isWorkAllowed()) return {};
		var items = {};
		for (var i = 0; i < 8; i++) {
			var item2 = this.container.getSlot('slot' + i);
			if (!Disk.items[item2.id+''] || !item2.extra) continue;
			var disk_data = Disk.getDiskData(item2);
			for(var i in disk_data.items){
				items['' + disk_data.items[i].id] = { data: disk_data.items[i].data, count: disk_data.items[i].count, name: Item.getName(disk_data.items[i].id, 0) };
			}
		}
		return items;
	},
	post_destroy: function(){
		if(RSNetworks && RSNetworks[this.data.LAST_NETWORK_ID] && RSNetworks[this.data.LAST_NETWORK_ID].info)RSNetworks[this.data.LAST_NETWORK_ID].info.updateItems();
	},
	client: {
		refreshModel: function(){
			var disks_data = (_data = this.networkData.getString('slots', 'null')) != 'null' ? JSON.parse(_data).map(function(elem){
				if(elem)elem.storage = Number(elem.storage);
				return elem;
			}) : [{id: 0, data: 0, storage: 0, items_stored: 0},{id: 0, data: 0, storage: 0, items_stored: 0},{id: 0, data: 0, storage: 0, items_stored: 0},{id: 0, data: 0, storage: 0, items_stored: 0},{id: 0, data: 0, storage: 0, items_stored: 0},{id: 0, data: 0, storage: 0, items_stored: 0},{id: 0, data: 0, storage: 0, items_stored: 0},{id: 0, data: 0, storage: 0, items_stored: 0}];
			if(Config.dev)Logger.Log('Local refreshing DiskDrive model: block_data: ' + this.networkData.getInt('block_data') + ' ; isActive: ' + this.networkData.getBoolean('isActive') + ' ; disks_data: ' + JSON.stringify(disks_data), 'RefinedStorageDebug');
			mapDisks(this, this.networkData.getInt('block_data') || 0, disks_data, this.networkData.getBoolean('isActive'));
		},
		events: {
			refreshModel: function(eventData, connectedClient){
				var disks_data = (_data = this.networkData.getString('slots', 'null')) != 'null' ? JSON.parse(_data).map(function(elem){
					if(elem)elem.storage = Number(elem.storage);
					return elem;
				}) : [{id: 0, data: 0, storage: 0, items_stored: 0},{id: 0, data: 0, storage: 0, items_stored: 0},{id: 0, data: 0, storage: 0, items_stored: 0},{id: 0, data: 0, storage: 0, items_stored: 0},{id: 0, data: 0, storage: 0, items_stored: 0},{id: 0, data: 0, storage: 0, items_stored: 0},{id: 0, data: 0, storage: 0, items_stored: 0},{id: 0, data: 0, storage: 0, items_stored: 0}];
				if(Config.dev)Logger.Log('Event refreshing DiskDrive model: block_data: ' + eventData.block_data + ' ; isActive: ' + eventData.isActive + ' ; disks_data: ' + JSON.stringify(disks_data), 'RefinedStorageDebug');
				mapDisks(eventData.coords, eventData.block_data, disks_data, eventData.isActive);
			}
		},
		containerEvents: {
			openGui: function(container, window, content, eventData){
				if(!content || !window || !window.isOpened()) return;
				content.elements["image_redstone"].bitmap = 'redstone_GUI_' + (eventData.redstone_mode || 0);
				content.elements["image_access_type"].bitmap = 'RS_dd_access_' + eventData.access_type;
			},
			refreshGui:function(container, window, content, eventData){
				if(!content || !window || !window.isOpened()) return;
				content.elements["image_redstone"].bitmap = 'redstone_GUI_' + (eventData.redstone_mode || 0);
				content.elements["image_access_type"].bitmap = 'RS_dd_access_' + eventData.access_type;
			}
		}
	},
	containerEvents: {

	}
});

Callback.addCallback('LocalTick', function(){
	if(!diskDriveGUI.isOpened()) return;
	var element = diskDriveGUI.getWindow('main').getElements().get('items');
	element.setPosition(Math.max(elementsGUI_dd['items'].start_x - getDiskDriveTextItemsWidth()/2, elementsGUI_dd['scale'].x), elementsGUI_dd['items'].y);
});

StorageInterface.createInterface(BlockID.diskDrive, {
	slots: {
		"slot0": {input: true},
		"slot1": {input: true},
		"slot2": {input: true},
		"slot3": {input: true},
		"slot4": {input: true},
		"slot5": {input: true},
		"slot6": {input: true},
		"slot7": {input: true}
	},
	isValidInput: function(item){
		return !!Disk.items[item.id];
	}
});




// file: blocks/controller.js

IDRegistry.genBlockID("RS_controller");
RefinedStorage.createMapBlock("RS_controller", [
	{
		name: "Controller",
		texture: [
			["controller_off", 0]
		],
		inCreative: true
	},
	{
		name: "Controller",
		texture: [
			["controller_nearly_off", 0]
		],
		inCreative: false
	},
	{
		name: "Controller",
		texture: [
			["controller_on", 0]
		],
		inCreative: false
	},
	{
		name: "Creative Controller",
		texture: [
			["controller_on", 0]
		],
		inCreative: false
	}
]);
mod_tip(BlockID['RS_controller']);
RS_blocks.push(BlockID.RS_controller);
ICRender.getGroup("ic-wire").add(BlockID.RS_controller, -1);

var Controller_2_extra = new ItemExtraData();
Controller_2_extra.putInt('energy', Config.controller.energyCapacity);
Item.addToCreative(BlockID['RS_controller'], 1, 2, Controller_2_extra);
Item.addToCreative(BlockID['RS_controller'], 1, 3);

Item.registerNameOverrideFunction(BlockID['RS_controller'], function (item, name) {
	if(item.data == 3) return name;
	if (!item.extra) return name + '\n§70 / ' + Config.controller.energyCapacity;
	var energy = item.extra.getInt('energy', 0);
	return name + '\n§7' + energy + ' / ' + Config.controller.energyCapacity;
})

Item.registerIconOverrideFunction(BlockID['RS_controller'], function(item, isModUi){
	if(isModUi){
		if(item.data == 1){
			return {name:'controllerTempOff', data: World.getThreadTime()%12};
		} else if(item.data == 2 || item.data == 3){
			return {name:'controllerTempOn', data: parseInt(World.getThreadTime()%24/2)};
		}
	}
})

Block.registerDropFunction("RS_controller", function (coords, id, data, diggingLevel, toolLevel, player, _blockSource) {
	return [];
});

Block.registerPlaceFunction("RS_controller", function (coords, item, block, player, blockSource) {
    if(!World.canTileBeReplaced(block.id, block.data)){
		var relBlock = blockSource.getBlock(coords.relative.x, coords.relative.y, coords.relative.z);
		if (World.canTileBeReplaced(relBlock.id, relBlock.data)){
			coords = coords.relative;
		} else return;
	}
	blockSource.setBlock(coords.x, coords.y, coords.z, item.id, item.data);
	var tile = World.addTileEntity(coords.x, coords.y, coords.z, blockSource) || World.getTileEntity(coords.x, coords.y, coords.z, blockSource);
	var energy = 0;
	if(item.data == 3 && tile && tile.data){
		tile.data.isCreative = true;
		tile.data.energy = Config.controller.energyCapacity;
		//tile.setActive(true);
		return;
	}
	if (item.extra && item.extra.getInt('energy') && tile && tile.data) {
		energy = item.extra.getInt('energy');
		tile.data.energy = energy;
	}
	Entity.setCarriedItem(player, item.id, item.count - 1, item.data, item.extra);
});
var elementsGUI_controller = {};
var controller_other_data = {
	net_map:{},
	isActive: false,
	max_y: 0,
	lastPage: -1
};
var controllerSwitchPage = function(num, container, data, ignore){
	if(!data.isActive){
		for (var i = 0; i < 4; i++) {
			container.clearSlot("slot" + i);
			container.setText('block_info' + i, '');
			container.setText('block_count' + i, '');
			container.setText('block_energy_use' + i, '');
		}
		return false;
	}
	num = num || 1;
	var aray_net_map = Object.keys(data.net_map);
	var pages1 = controllerFuncs.getPages(aray_net_map.length);
	var pages = Math.max(1, pages1 - 1);
	num = Math.max(1, Math.min(num, pages)) - 1;
	if(num == data.lastPage && !ignore) return false;
	data.lastPage = num;
	if(aray_net_map.length == 0){
		for (var i = 0; i < 4; i++) {
			container.clearSlot("slot" + i);
			container.setText('block_info' + i, '');
			container.setText('block_count' + i, '');
			container.setText('block_energy_use' + i, '');
		}
	} else {
		for (var i = num * 2; i < num * 2 + 4; i++) {
			var a = i - (num * 2);
			var item = aray_net_map[i] ? data.net_map[aray_net_map[i]] : {};
			var _id = item.id ? Network.serverToLocalId(item.id) : 0;
			container.setSlot("slot" + a, _id, 1, item.data || 0, item.extra || null);
			var name = item.id ? Item.getName(_id, item.data || 0, item.extra).split('\n')[0] : '';
			if(name.length > controller_other_data['max_sym']) name = name.substr(0, controller_other_data['max_sym'] - 1) + '...';
			container.setText('block_info' + a, name);
			container.setText('block_count' + a, _id ? item.count + 'x' : '');
			container.setText('block_energy_use' + a, _id ? item.energy_use + ' FE/t' : '');
		}
	}
	return true;
}
function initControllerElements() {
	var moving = false;
	var swipe_y;
	var swipe_sum = 0;
	var max_y = 0;

	elementsGUI_controller["click_frame"] = {
		type: "frame",
		x: 0,
		y: 0,
		z: -50,
		width: 1000,
		height: UI.getScreenHeight(),
		bitmap: "empty",
		scale: 1,
		onTouchEvent: function (element, event) {
			var content = {elements:elementsGUI_controller};/* element.window.getContent(); *///getContainer().getGuiContent();
			var itemContainer = element.window.getContainer().getParent();
			if (event.type == "DOWN" && !swipe_y && event.x > content.elements["mesh"].x && event.x < (content.elements["mesh"].x + content.elements["mesh"].width) && event.y > content.elements["mesh"].y && event.y < (content.elements["mesh"].y + content.elements["mesh"].height)) {
				swipe_y = event.y;
			} else if (swipe_y && event.type == "MOVE") {
				var distance = Math.abs(event.y - swipe_y);
				function moveSwitchPage_(_n){
					_n = (_n ? 1 : -1);
					var pages = controllerFuncs.getPages(Object.keys(controller_other_data.net_map).length);
					if(!controllerSwitchPage(controller_other_data.lastPage + _n, itemContainer, controller_other_data)) return;
					var ___y = controllerFuncs.getCoordsFromPage(controller_other_data.lastPage + _n, pages);
					element.window.getContentProvider().elementMap.get("slider_button").setPosition(elementsGUI_controller['slider_button'].x, ___y);
				}
				if (distance > 7) {
					if (event.y > swipe_y) moveSwitchPage_(false);
					if (event.y < swipe_y) moveSwitchPage_(true);
					swipe_sum = 0;
				} else {
					swipe_sum += distance;
					if (swipe_sum > 15) {
						if (event.y > swipe_y) moveSwitchPage_(false);
						if (event.y < swipe_y) moveSwitchPage_(true);
						swipe_sum = 0;
					}
				}
				swipe_y = event.y;
			} else if (swipe_y && (event.type == "UP" || event.type == "CLICK")) {
				swipe_y = false;
			}
			if (!moving) return;
			event.y -= content.elements["slider_button"].scale * 15 / 2;
			if (event.type != 'UP' && event.type != "CLICK") {
				var page = controllerFuncs.getPageFromCoords(event, controllerFuncs.getPages(Object.keys(controller_other_data.net_map).length));
				controllerSwitchPage(page, itemContainer, controller_other_data);
				element.window.getContentProvider().elementMap.get("slider_button").setPosition(content.elements['slider_button'].x, Math.max(Math.min(event.y, max_y), content.elements["slider_button"].start_y));
			}
			if (event.type == "UP" || event.type == "CLICK") {
				moving = false;
				var pages = controllerFuncs.getPages(Object.keys(controller_other_data.net_map).length);
				var page = controllerFuncs.getPageFromCoords(event, pages);
				controllerSwitchPage(page, itemContainer, controller_other_data);
				var ___y = controllerFuncs.getCoordsFromPage(page, pages);
				element.window.getContentProvider().elementMap.get("slider_button").setPosition(elementsGUI_controller['slider_button'].x, ___y);
			}
		}
	}

	var y = 110;
	var percents = 0.5;

	elementsGUI_controller["scale"] = {
		type: "scale",
		x: 50,
		y: y,
		direction: 1,
		bitmap: "storage_scale_full",
		overlay: "storage_scale_empty",
		value: 0,
		scale: Math.min(UI.getScreenHeight()*percents/72, 4.5),
		overlayScale: 0
	};
	elementsGUI_controller["scale"].overlayScale = elementsGUI_controller["scale"].scale;
	elementsGUI_controller['usage'] = {
		type: "text",
		x: 50,
		y: elementsGUI_controller["scale"].y - 40,
		text: Translation.translate('Usage')+": 0 FE/t",
		font: {
			color: android.graphics.Color.WHITE,
			shadow: 0.5,
			size: 20
		}
	}
	elementsGUI_controller['storage'] = {
		type: "text",
		x: 50,
		y: elementsGUI_controller["scale"].y + elementsGUI_controller["scale"].scale*72 + 20,
		text: "0/0 FE",
		font: {
			color: android.graphics.Color.WHITE,
			shadow: 0.5,
			size: 18
		}
	}
	elementsGUI_controller['mesh'] = {
		type: "image", 
		x: 0, 
		y: y,
		scale: elementsGUI_controller["scale"].scale*72/61,
		bitmap: "controllerMesh"
	}
	elementsGUI_controller['mesh'].x = 900 - elementsGUI_controller['mesh'].scale*123;
	
	elementsGUI_controller['mesh'].height = elementsGUI_controller['mesh'].scale*61;
	elementsGUI_controller['mesh'].width = elementsGUI_controller['mesh'].scale*123;

	var mesh_width = Math.floor(elementsGUI_controller['mesh'].width);
	var mesh_height = Math.floor(elementsGUI_controller['mesh'].height);
	var slot_padding = mesh_height/2*0.1;
	var slot_size = (mesh_height/2-slot_padding*2)*0.6;
	var asd = 0;
	for(var h = elementsGUI_controller['mesh'].y; h < elementsGUI_controller['mesh'].y + mesh_height; h += mesh_height/2){
		for(var w = elementsGUI_controller['mesh'].x; w < elementsGUI_controller['mesh'].x + mesh_width; w += mesh_width/2){
			elementsGUI_controller['block_info' + asd] = {
				type: "text",
				num: asd,
				x: w + slot_padding,
				y: h + slot_padding/2 + ((mesh_height/2-slot_padding*2)*0.4)/2,
				z: 10,
				text: "This is block " + mesh_width + ' : ' + mesh_height,
				font: {
					color: android.graphics.Color.DKGRAY,
					shadow: 0.15,
					size: Math.ceil((mesh_height/2-slot_padding*2)*0.2)
				}
			}
			elementsGUI_controller['block_info' + asd].y -= elementsGUI_controller['block_info' + asd].font.size/2
			elementsGUI_controller['block_count' + asd] = {
				type: "text",
				num: asd,
				x: w + slot_padding*2 + slot_size,
				y: h + (mesh_height/2 - slot_padding - slot_size/2),
				z: 10,
				text: "1x",
				font: {
					color: android.graphics.Color.DKGRAY,
					shadow: 0.15,
					size: Math.ceil(slot_size*0.25)
				}
			}
			elementsGUI_controller['block_count' + asd].y -= elementsGUI_controller['block_count' + asd].font.size/2
			elementsGUI_controller['block_energy_use' + asd] = {
				type: "text",
				num: asd,
				x: w + slot_padding*2 + slot_size*2,
				y: h + (mesh_height/2 - slot_padding - slot_size/2),
				z: 10,
				text: "0 FE/t",
				font: {
					color: android.graphics.Color.DKGRAY,
					shadow: 0.15,
					size: Math.ceil(slot_size*0.3)
				}
			}
			elementsGUI_controller['block_energy_use' + asd].y -= elementsGUI_controller['block_energy_use' + asd].font.size/2
			elementsGUI_controller['slot' + asd] = {
				type: "slot",
				num: asd,
				x: w + slot_padding,
				y: h + (mesh_height/2 - slot_padding - slot_size),
				z: 10,
				bitmap: "empty",
				isTransparentBackground: true,
				needClean: true,
				clicker: {
					onClick: function (position, container, tileEntity, window, canvas, scale) {
					},
					onLongClick: function (position, container, tileEntity, window, canvas, scale) {
						
					}
				},
				size: Math.ceil(slot_size)
			}
			asd++;
		}
	}
	controller_other_data['max_sym'] = Math.round((mesh_width/2 - slot_padding*2)/(elementsGUI_controller['block_info0'].font.size*(5/7)));

	var slider_frame_cons = 25;
	var slider_frame_border = 7;
	elementsGUI_controller["slider_frame"] = {
		type: "frame",
		x: 900 + slider_frame_cons,
		y: y,
		width: (1000 - (900 + slider_frame_cons) - slider_frame_cons),
		height: elementsGUI_controller["scale"].scale*72,
		bitmap: "slider",
		scale: 1,
		onTouchEvent: function (element, event) {
			//var itemContainer = element.window.getContainer().getParent();
			if (event.type == 'DOWN') {
				moving = true;
			}
			if (event.type == 'CLICK') {
				var pages = controllerFuncs.getPages(Object.keys(controller_other_data.net_map).length);
				var page = controllerFuncs.getPageFromCoords(event, pages);
				var ___y = controllerFuncs.getCoordsFromPage(page, pages);
				element.window.getContentProvider().elementMap.get("slider_button").setPosition(elementsGUI_controller['slider_button'].x, ___y);
			}
		}
	}

	elementsGUI_controller["slider_button"] = {
		type: "button",
		x: elementsGUI_controller["slider_frame"].x + slider_frame_border,
		start_y: elementsGUI_controller["slider_frame"].y + slider_frame_border,
		y: elementsGUI_controller["slider_frame"].y + slider_frame_border,
		z: 10,
		bitmap: 'slider_buttonOff',
		scale: (elementsGUI_controller["slider_frame"].width - slider_frame_border * 2) / 12
	}
	max_y = (elementsGUI_controller["slider_frame"].y + elementsGUI_controller["slider_frame"].height) - 7 - elementsGUI_controller["slider_button"].scale * 15;
	var settings_cons = 10;
	elementsGUI_controller["redstone_button"] = {
		type: "button",
		x: 0,
		y: elementsGUI_controller['mesh'].y,
		bitmap: 'RS_empty_button',
		bitmap2: 'RS_empty_button_pressed',
		scale: mesh_height*0.17/20,
		clicker: {
			onClick: function (itemContainerUiHandler, container, element) {
				container.sendEvent("updateRedstoneMode", {});
			},
			onLongClick: function (itemContainerUiHandler, container, element) {
			}
		}
	}
	elementsGUI_controller["redstone_button"].x = elementsGUI_controller['mesh'].x - settings_cons - (20 * elementsGUI_controller["redstone_button"].scale);

	elementsGUI_controller["image_redstone"] = {
		type: "image",
		x: elementsGUI_controller["redstone_button"].x,
		y: elementsGUI_controller["redstone_button"].y,
		z: 1000,
		bitmap: "redstone_GUI_0",
		scale: elementsGUI_controller["redstone_button"].scale*20/16,
	}
	controller_other_data.max_y = max_y;
};
initControllerElements();

const CONTROLLER_GUI = new UI.StandartWindow({
	standart: {
		header: {
			text: {
				text: Translation.translate("Controller")
			}
		},
		background: {
			standart: true
		}
	},

	drawing: [],

	elements: elementsGUI_controller
});
GUIs.push(CONTROLLER_GUI);
testButtons(CONTROLLER_GUI.getWindow('header').getContent().elements, initControllerElements);

var controllerFuncs = {
	getNewTexture: function (energyScaled, isActive) {
		if (energyScaled <= 0 || !isActive) {
			return 'controller_off';
		} else if (energyScaled <= 20) {
			return 'controller_nearly_off';
		}
		return 'controller_on';
	},
	getEnergyScaled: function (scale, energy) {
		if(!energy && energy != 0){
			var energy = scale;
			var scale = 100;
		}
		return Math.floor(energy / Config.controller.energyCapacity * scale);
	},
	getPages: function(_length){
		if(_length == 0) return 1;
		_length = Math.ceil(_length / 2);
		return _length;//Math.max(_length - Math.min(_length, 4) + 1, 0) || 1;
	},
	getPageFromCoords: function(_coords, pages){
		pages -= 1;
		var max_y = controller_other_data.max_y;
		var interval = (pages - 1) > 0 ? (max_y - elementsGUI_controller["slider_button"].start_y) / (pages - 1) : 0;
		function __getY(i) {
			return ((interval * i) + elementsGUI_controller["slider_button"].start_y);
		}
		var least_dec = 10001;
		var finish_i = 0;
		for (var i = 0; i < pages; i++) {
			var dec = Math.abs(Math.round(_coords.y - __getY(i)));
			if (dec < least_dec) {
				least_dec = dec;
				finish_i = i;
			}
		};
		var page = finish_i;
		return page + 1;
	},
	getCoordsFromPage: function(page, pages){
		pages -= 1;
		var max_y = controller_other_data.max_y;
		var interval = (pages - 1) > 0 ? (max_y - elementsGUI_controller["slider_button"].start_y) / (pages - 1) : 0;
		function __getY(i) {
			return ((interval * i) + elementsGUI_controller["slider_button"].start_y);
		}
		if (page > pages) page = pages;
		if (page < 1) page = 1;
		return __getY(page - 1);
	}
}

RefinedStorage.createTile(BlockID.RS_controller, {
	defaultValues: {
		NETWORK_ID: "f",
		energy: 0,
		usage: 0,
		lastTexture: '',
		page_switched: false,
		net_map: {},
		page: 1,
		redstone_mode: 0,
		isCreative: false,
		networkDataUpdate: false,
		containerUpdate: false,
		ticks: 0,
		updateControllerNetwork: false,
		updateModel: false,
		lastTexture: ''
	},
	unsaveableSlots: true,
	useNetworkItemContainer: true,
	created: function () {
        if(!this.blockSource)this.blockSource = BlockSource.getDefaultForDimension(this.dimension);
		while (controller = searchController(this, false, this.blockSource)) {
			for (var i in sides) {
				var coordss = {};
				coordss.x = this.x + sides[i][0];
				coordss.y = this.y + sides[i][1];
				coordss.z = this.z + sides[i][2];
				var bck = this.blockSource.getBlock(coordss.x, coordss.y, coordss.z);
				if (RS_blocks.indexOf(bck.id) != -1) {
					if(bck.id == BlockID.RS_cable){
						for(var i in RSNetworks){
							if(RSNetworks[i][cts(coordss)]){
								delete RSNetworks[i][cts(coordss)];
								if(InnerCore_pack.packVersionCode < 120) this.blockSource.destroyBlock(coordss.x, coordss.y, coordss.z, true);
								else this.blockSource.breakBlock(coordss.x, coordss.y, coordss.z, true);
								if(InnerCore_pack.packVersionCode < 120)Block.onBlockDestroyed(coordss, bck, false, Player.get());
								if(InnerCore_pack.packVersionCode < 120)Callback.invokeCallback('BlockChanged', coordss, {id:bck.id, data:bck.data}, {id:0, data:0}, this.dimension);
							}
						}
					} else {
						var tile = World.getTileEntity(coordss.x, coordss.y, coordss.z, this.blockSource);
						if (tile && tile.data.NETWORK_ID != 'f' && tile.data.NETWORK_ID != this.data.NETWORK_ID) {
							if(InnerCore_pack.packVersionCode < 120) this.blockSource.destroyBlock(coordss.x, coordss.y, coordss.z, true);
							else this.blockSource.breakBlock(coordss.x, coordss.y, coordss.z, true);
							if(InnerCore_pack.packVersionCode < 120)Block.onBlockDestroyed(coordss, bck, false, Player.get());
							if(InnerCore_pack.packVersionCode < 120)Callback.invokeCallback('BlockChanged', coordss, {id:bck.id, data:bck.data}, {id:0, data:0}, this.dimension);
						}
					}
				}
			}
		}
	},
	setActive: function(state, forced, preventRefreshModel){
		state = this.data.NETWORK_ID != "f" ? !!state : false;
		if(this.data.isActive == state && !forced) return false;
		if (this.pre_setActive) if(this.pre_setActive(state)) return false;
		if(state && !this.redstoneAllowActive(this.data.last_redstone_event)) return false;
		if(state && this.data.energy < this.data.usage) return false;
		if(state == false || (forced || this.data.allowSetIsActive != false)){
			this.data.isActive = state;
			this.networkData.putBoolean('isActive', state);
			if(this.data.NETWORK_ID != "f")RSNetworks[this.data.NETWORK_ID][this.coords_id()].isActive = state;
		}
		this.networkData.sendChanges();
		if(!preventRefreshModel)this.refreshModel();
		if (this.post_setActive) this.post_setActive(state);
		return true;
	},
	init: function () {
		//if (this.data.NETWORK_ID == "f" || !RSNetworks[this.data.NETWORK_ID]) {
			this.data.NETWORK_ID = RSNetworks.length;
			var controllerTile = this;
			this.networkData.putInt('energy', this.data.energy);
			this.networkData.putInt('NETWORK_ID', RSNetworks.length);
			this.networkData.putBoolean('isActive', this.data.isActive || false);
			if(this.unsaveableSlots && InnerCore_pack.packVersionCode >= 120){
				if(Array.isArray(this.unsaveableSlots)){
					for(var i in this.unsaveableSlots)this.container.setSlotSavingEnabled(this.unsaveableSlots[i], false);
				} else {
					this.container.setGlobalSlotSavingEnabled(false);
				}
			}
			var _data = {};
			_data[cts(this)] = {
				id: BlockID.RS_controller,
				coords: { x: this.x, y: this.y, z: this.z },
				upgrades: {},
				isActive: false
			}
			_data['info'] = {
				net_id: RSNetworks.length,
				//disk_items_map: {},
				disk_map: [],
				just_items_map: {},
				just_items_map_extra: {},
				items_map: [],
				items: [],
				openedGrids: [],
				storage: 0,
				stored: 0,
				refreshOpenedGrids: function(_full){
					for(var i in this.openedGrids){
						var __coords = this.openedGrids[i];
						var tile = World.getTileEntity(__coords.x, __coords.y, __coords.z, controllerTile.blockSource);
						tile.data.fullRefreshPage = _full;
						tile.data.refreshCurPage = true;
					}
				},
				updateItems: function(){
					if(Config.dev)Logger.Log('Updating items', 'RefinedStorageDebug');
					var diskDrives = searchBlocksInNetwork(this.net_id, BlockID['diskDrive']);
					var disk_map = [];
					var items_map = [];
					var items = [];
					var storage = 0;
					var stored = 0;
					var just_items_map = {};
					var just_items_map_extra = {};
					//var disk_items_map = {};
					for(var i in diskDrives){
						var tile = World.getTileEntity(diskDrives[i].coords.x, diskDrives[i].coords.y, diskDrives[i].coords.z, controllerTile.blockSource);
						if(!tile || !tile.data.isActive) continue;
						var newDiskData = [];
						//newDiskData.id = cts(diskDrives[i].coords);
						for (var k = 0; k < 8; k++) {
							var item = tile.container.getSlot('slot' + k);
							if (!Disk.items[item.id]) continue;
							if (item.data == 0) item.data = DiskData.length;
							var disk_data = Disk.getDiskData(item);
							//alert(JSON.stringify(disk_data));
							storage += disk_data.storage;
							stored += disk_data.items_stored;
							for(var s in disk_data.items){
								var diskItem = disk_data.items[s];
								var itemUid = getItemUid(diskItem);
								if((index = items_map.indexOf(itemUid)) != -1){
									items[index].count += diskItem.count;
								} else {
									items.push(Object.assign({}, diskItem));
									items_map.push(itemUid);
								}
								if(just_items_map[diskItem.id]){
									just_items_map[diskItem.id].push(diskItem.data);
								} else if(!just_items_map[diskItem.id]){
									just_items_map[diskItem.id] = [diskItem.data];
								}
								if(diskItem.extra){
									if(just_items_map_extra[diskItem.id+'_'+diskItem.data] && just_items_map_extra[diskItem.id+'_'+diskItem.data].indexOf(diskItem.extra) == -1){
										just_items_map_extra[diskItem.id+'_'+diskItem.data].push(diskItem.extra);
									} else if(!just_items_map_extra[diskItem.id+'_'+diskItem.data]){
										just_items_map_extra[diskItem.id+'_'+diskItem.data] = [diskItem.extra];
									}
								}
							}
							newDiskData.push(disk_data);
						}
						if(newDiskData.length == 0) continue;
						disk_map.push(newDiskData);
					}
					this.disk_map = disk_map;
					this.items_map = items_map;
					this.items = items;
					this.storage = storage;
					this.stored = stored;
					this.just_items_map = just_items_map;
					this.just_items_map_extra = just_items_map_extra;
					this.refreshOpenedGrids();
					//this.disk_items_map = disk_items_map;
				},
				itemCanBePushed: function(item, count){
					return Math.min(this.storage - this.stored, count || item.count);
				},
				pushItem: function(item, count, nonUpdate){
					count = count || item.count;
					if(RSbannedItems.indexOf(item.id) != -1){
						if(Config.dev)Logger.Log('Hey you shouldn t push this item:   id: ' + item.id + ', count: ' + count + ' (' + item.count + '), data: ' + item.data + (item.extra ? ', extra: ' + item.extra.getValue() : '') + ', uid: ' + itemUid + ', storage: ' + this.storage + ', stored: ' + this.stored + ' (' + (this.stored + count) + ')' + ', freespace: ' + (this.storage - this.stored) + ' (' + ((this.storage - this.stored) - count) + ')', 'RefinedStorageDebug');
						return count;
					}
					if(!this.itemCanBePushed(item, count)) return count;
					var itemUid = getItemUid(item);
					//var count1 = Math.min(count, this.storage - this.stored);
					/* if((itemsDisks = this.disk_items_map[itemUid]) && ((index = this.items_map.indexOf(itemUid)) != -1)){
						for(var i in itemsDisks){
							if(itemsDisks[i][1].items_stored >= itemsDisks[i][1].storage) continue;
							var freeSpace = itemsDisks[i][1].storage - itemsDisks[i][1].items_stored;
							if(count >= freeSpace){
								count -= freeSpace;
								this.items[index].count += freeSpace;
								this.stored += freeSpace;
								itemsDisks[i][1].items_stored += freeSpace;
								itemsDisks[i][0].count += freeSpace;
							} else {
								this.items[index].count += count;
								this.stored += count;
								itemsDisks[i][1].items_stored += count;
								itemsDisks[i][0].count += count;
								return 0;
							}
						}
					} else {
						//if(!item.name)item.name = Item.getName(item.id, item.data, item.extra);
						this.items.push({
							id: item.id,
							data: item.data,
							count: Math.min(count, this.storage - this.stored),
							extra: item.extra,
							//name: item.name
						});
						this.items_map.push(itemUid);
						if(this.just_items_map[item.id] && this.just_items_map[item.id].indexOf(item.data) == -1){
							this.just_items_map[item.id].push(item.data);
						} else if(!this.just_items_map[item.id]){
							this.just_items_map[item.id] = [item.data];
						}
					}
					//this.stored += count1;
					for(var i in this.disk_map){
						for(var k in this.disk_map[i]){
							if(count == 0 || this.storage - this.stored == 0) return count;
							if(!this.disk_map[i][k]) continue;
							var freeSpace = this.disk_map[i][k].storage - this.disk_map[i][k].items_stored;
							if(freeSpace == 0) continue;
							if(count >= freeSpace){
								count -= freeSpace;
								this.stored += freeSpace;
								this.disk_map[i][k].items[itemUid] = {
									id: item.id,
									data: item.data,
									count: freeSpace,
									extra: item.extra,
									//name: item.name
								}
								this.disk_map[i][k].items_stored += freeSpace;
								this.disk_items_map[itemUid].push(this.disk_map[i][k].items[itemUid], this.disk_map[i][k]);
							} else {
								this.stored += count;
								this.disk_map[i][k].items[itemUid] = {
									id: item.id,
									data: item.data,
									count: count,
									extra: item.extra,
									//name: item.name
								}
								this.disk_map[i][k].items_stored += count;
								this.disk_items_map[itemUid].push(this.disk_map[i][k].items[itemUid], this.disk_map[i][k]);
								return 0;
							}
						}
					}
					return count; */
					if(Config.dev)Logger.Log('Pushing item:  id: ' + item.id + ', count: ' + count + ' (' + item.count + '), data: ' + item.data + (item.extra ? ', extra: ' + item.extra.getValue() + "_" + fullExtraToString(item.extra, true) : '') + ', uid: ' + itemUid + ', storage: ' + this.storage + ', stored: ' + this.stored + ' (' + (this.stored + count) + ')' + ', freespace: ' + (this.storage - this.stored) + ' (' + ((this.storage - this.stored) - count) + ')', 'RefinedStorageDebug');
					for(var i in _data){
						if(_data[i].pushItemFunc)count = ((__answ = _data[i].pushItemFunc(item, count)) != undefined ? __answ : count);
						if(count <= 0) return 0;
					}
					var index = this.items_map.indexOf(itemUid);
					var itemUidExtra = item.id+'_'+item.data;
					if(item.extra && index == -1 && this.just_items_map_extra[itemUidExtra])for(var iasd in this.just_items_map_extra[itemUidExtra]){
						var ___extra = this.just_items_map_extra[itemUidExtra][iasd];
						//if(Config.dev)Logger.Log('Comparing extra: ' + fullExtraToString(item.extra, true) + " with: " + fullExtraToString(___extra, true), 'RefinedStorageDebug');
						if(fullExtraToString(item.extra, true) == fullExtraToString(___extra, true)){
							item.extra = ___extra;
							itemUid = getItemUid(item);
							index = this.items_map.indexOf(itemUid);
							break;
						}
					}
					if(index != -1){
						for(var i in this.disk_map){
							for(var k in this.disk_map[i]){
								if(count == 0 || this.storage - this.stored == 0){
									if(!nonUpdate)this.refreshOpenedGrids();
									return count;
								};
								if(disk_item = this.disk_map[i][k].items[itemUid]){
									var freeSpace = this.disk_map[i][k].storage - this.disk_map[i][k].items_stored;
									if(freeSpace == 0) continue;
									if(count >= freeSpace){
										count -= freeSpace;
										this.items[index].count += freeSpace;
										this.stored += freeSpace;
										this.disk_map[i][k].items_stored += freeSpace;
										disk_item.count += freeSpace;
									} else {
										this.items[index].count += count;
										this.stored += count;
										this.disk_map[i][k].items_stored += count;
										disk_item.count += count;
										if(!nonUpdate)this.refreshOpenedGrids();
										return 0;
									}
								};
							}
						}
					} else {
						//if(!item.name)item.name = Item.getName(item.id, item.data, item.extra);
						this.items.push({
							id: item.id,
							data: item.data,
							count: Math.min(count, this.storage - this.stored),
							extra: item.extra/* ,
							name: item.name */
						});
						this.items_map.push(itemUid);
						if(this.just_items_map[item.id]){
							this.just_items_map[item.id].push(item.data);
						} else if(!this.just_items_map[item.id]){
							this.just_items_map[item.id] = [item.data];
						}
						if(item.extra){
							if(this.just_items_map_extra[itemUidExtra]){
								this.just_items_map_extra[itemUidExtra].push(item.extra);
							} else if(!this.just_items_map_extra[itemUidExtra]){
								this.just_items_map_extra[itemUidExtra] = [item.extra];
							}
						}
					}
					//if(!item.name)item.name = Item.getName(item.id, item.data, item.extra);
					//this.stored += count1;
					for(var i in this.disk_map){
						for(var k in this.disk_map[i]){
							if(count == 0 || this.storage - this.stored == 0) {
								if(!nonUpdate)this.refreshOpenedGrids(true);
								return count;
							}
							if(!this.disk_map[i][k]) continue;
							var freeSpace = this.disk_map[i][k].storage - this.disk_map[i][k].items_stored;
							if(freeSpace == 0) continue;
							if(count >= freeSpace){
								count -= freeSpace;
								this.stored += freeSpace;
								this.disk_map[i][k].items[itemUid] = {
									id: item.id,
									data: item.data,
									count: freeSpace,
									extra: item.extra/* ,
									name: item.name */
								}
								this.disk_map[i][k].items_stored += freeSpace;
							} else {
								this.stored += count;
								this.disk_map[i][k].items[itemUid] = {
									id: item.id,
									data: item.data,
									count: count,
									extra: item.extra/* ,
									name: item.name */
								}
								this.disk_map[i][k].items_stored += count;
								if(!nonUpdate)this.refreshOpenedGrids(true);
								return 0;
							}
						}
					};
					//}
					if(!nonUpdate)this.refreshOpenedGrids();
				},
				itemCanBeDeleted: function(item, count){
					count = count || item.count;
					if(count > this.stored) return false;
					var itemUid = getItemUid(item);
					if((iItem = this.items_map.indexOf(itemUid)) != -1){
						return true;
					} else {
						return false;
					}
				},
				deleteItem: function(item, count, nonUpdate){
					count = count || item.count;
					if(!this.itemCanBeDeleted(item, count)) return count;
					if((!item.data && item.data != 0) || item.data == -1) item.data = this.just_items_map[item.id][0];
					if(item.extra === undefined)item.extra = null;
					if((!item.extra && item.extra != null) || item.extra == -1) item.extra = this.just_items_map_extra[item.id+'_'+item.data][0] || null;
					var itemUid = getItemUid(item);
					if(Config.dev)Logger.Log('Deleting item:  id: ' + item.id + ', count: ' + count + ' (' + item.count + '), data: ' + item.data + (item.extra ? ', extra: ' + item.extra.getValue() + "_" + fullExtraToString(item.extra, true) : '') + ', uid: ' + itemUid + ', storage: ' + this.storage + ', stored: ' + this.stored + ' (' + (this.stored - count) + ')' + ', freespace: ' + (this.storage - this.stored) + ' (' + ((this.storage - this.stored) + count) + ')', 'RefinedStorageDebug');
					for(var i in _data){
						if(_data[i].deleteItemFunc)count = _data[i].deleteItemFunc(item, count) || count;
						if(count <= 0) return 0;
					}
					var num = this.items_map.indexOf(itemUid);
					var itemUidExtra = item.id+'_'+item.data;
					if(item.extra && num == -1 && this.just_items_map_extra[itemUidExtra])for(var iasd in this.just_items_map_extra[itemUidExtra]){
						var ___extra = this.just_items_map_extra[itemUidExtra][iasd];
						if(Config.dev)Logger.Log('Comparing extra: ' + fullExtraToString(item.extra, true) + " with: " + fullExtraToString(___extra, true), 'RefinedStorageDebug');
						if(fullExtraToString(item.extra, true) == fullExtraToString(___extra, true)){
							item.extra = ___extra;
							itemUid = getItemUid(item);
							num = this.items_map.indexOf(itemUid);
							break;
						}
					}
					if(num != -1){
						var count1 = Math.min(count, this.stored, this.items[num].count);
						if(count >= this.items[num].count){
							this.items_map.splice(num, 1);
							this.items.splice(num, 1);
							if((justIMap = this.just_items_map[item.id].indexOf(item.data)) != -1)this.just_items_map[item.id].splice(justIMap, 1);
							if(this.just_items_map[item.id].length == 0)delete this.just_items_map[item.id];
							if(item.extra){
								if(this.just_items_map_extra[itemUidExtra] && (justIMap = this.just_items_map_extra[itemUidExtra].indexOf(item.extra) != -1)) this.just_items_map_extra[itemUidExtra].splice(justIMap, 1);
								if(this.just_items_map_extra[itemUidExtra] && this.just_items_map_extra[itemUidExtra].length == 0) delete this.just_items_map_extra[itemUidExtra];
							}
							for(var i in this.disk_map){
								for(var k in this.disk_map[i]){
									if(!this.disk_map[i][k] || !this.disk_map[i][k].items) continue;
									if(disk_item = this.disk_map[i][k].items[itemUid]) {
										this.stored -= disk_item.count;
										this.disk_map[i][k].items_stored -= disk_item.count;
										delete this.disk_map[i][k].items[itemUid];
										if(!nonUpdate)this.refreshOpenedGrids(true);
										return count - count1;
									}
								}
							}
						} else {
							this.items[num].count -= count1;
							for(var i in this.disk_map){
								for(var k in this.disk_map[i]){
									if(count == 0 || this.stored == 0) {
										if(!nonUpdate)this.refreshOpenedGrids();
										return count;
									};
									if(!this.disk_map[i][k] || !this.disk_map[i][k].items) continue;
									if(disk_item = this.disk_map[i][k].items[itemUid]){
										if(count >= disk_item.count){
											count -= disk_item.count;
											this.stored -= disk_item.count;
											this.disk_map[i][k].items_stored -= disk_item.count;
											delete this.disk_map[i][k].items[itemUid];
										} else {
											this.stored -= count;
											this.disk_map[i][k].items_stored -= count;
											disk_item.count -= count;
											if(!nonUpdate)this.refreshOpenedGrids();
											return 0;
										}
									};
								}
							}
							if(!nonUpdate)this.refreshOpenedGrids();
							return count;
						}
					} else {
						//alert('Hey are you doing something wrong');
						return count;
					}
					if(!nonUpdate)this.refreshOpenedGrids();
				}
			}
			RSNetworks.push(_data);
			this.networkData.sendChanges();
			this.data.ticks = 0;
			this.data.timer = 20;
		//}
	},
	updateItems: function(){
		if(this.data.NETWORK_ID != 'f'){
			RSNetworks[this.data.NETWORK_ID].info.updateItems();
		}
	},
	updateControllerNetwork: function(_first){
		set_net_for_blocks(this, this.data.NETWORK_ID, false, _first, _first ? undefined : this.data.isActive);
	},
	click: function (id, count, data, coords, player, extra) {
		if(Entity.getSneaking(player)) return false;
		var client = Network.getClientForPlayer(player);
		if(!client) return true;
		if (this.container.getNetworkEntity().getClients().contains(client)) return true;
		this.container.openFor(client, "main");
		var _data = {
			name: this.networkData.getName() + '', 
			isActive: this.data.isActive, 
			capacity: this.getCapacity(), 
			redstone_mode: this.data.redstone_mode, 
			usage: this.data.usage, 
			energy: this.data.energy, 
			isCreative: this.data.isCreative, 
			net_map: this.data.net_map
		};
		this.container.sendEvent(client, "openGui", _data); 
		this.container.setScale('scale', this.data.energy / this.getCapacity());
		this.container.setText('usage', Translation.translate('Usage')+": " + this.data.usage + " FE/t");
		this.container.setText('storage', this.data.energy + '/' + this.getCapacity() + ' FE');
		this.container.sendChanges();
		return true;
	},
	post_setActive: function(state){
		set_is_active_for_blocks_net(this.data.NETWORK_ID, state, true, this.blockSource);
		if(!state){
			this.data.net_map = {};
			this.data.usage = 0;
			this.container.setText('usage', Translation.translate('Usage') + ": 0 FE/t");
			this.container.sendChanges();
		} else {
			this.updateNetMap();
			this.container.setText('usage', Translation.translate('Usage')+": " + this.data.usage + " FE/t");
			this.container.sendChanges();
		}
		this.refreshGui();
	},
	pages: function () {
		if (this.container.getNetworkEntity().getClients().iterator().hasNext() && this.data.NETWORK_ID != "f" && this.data.isActive) {
			var aray_net_map = Object.keys(this.data.net_map);
			return controllerFuncs.getPages(aray_net_map.length);
		} else {
			return 1;
		}
	},
	getCapacity: function () {
		return Config.controller.energyCapacity;
	},
	canReceiveEnergy: function (side, type) {
		return true;
	},
	isEnergySource: function () {
		return true;
	},
	updateNetMap: function(_ignoreIsActive){
		var usage = 0;
		var net_map = {};
		for (var i in RSNetworks[this.data.NETWORK_ID]) {
			if (!RSNetworks[this.data.NETWORK_ID][i] || i == "info" || RSNetworks[this.data.NETWORK_ID][i].id == BlockID.RS_controller || (!RSNetworks[this.data.NETWORK_ID][i].isActive && !_ignoreIsActive)) continue;
			var networkTile = RSNetworks[this.data.NETWORK_ID][i];
			var id_ = networkTile.id;
			if(!net_map[String(id_)])
				net_map[String(id_)] = {id: id_, energy_use: 0, count: 1};
			else
				net_map[String(id_)].count++;
			if (id_ == BlockID.diskDrive) {
				var tile = World.getTileEntity(networkTile.coords.x, networkTile.coords.y, networkTile.coords.z, this.blockSource);
				if (!tile) continue;
				var __usage = EnergyUse['disk']*tile.data.disks;
				usage += __usage;
				net_map[String(id_)].energy_use += __usage;
			} else {
				var __usage = EnergyUse[id_] || 0;
				for(var j in networkTile.upgrades)__usage += UpgradeRegistry.getEnergyUsage(j)*networkTile.upgrades[j];
				usage += __usage;
				net_map[String(id_)].energy_use += __usage;
			}
		}
		this.data.net_map = net_map;
		this.data.usage = usage;
	},
	energyReceive: function (type, amount, voltage) {
		amount = Math.min(amount * EnergyTypeRegistry.getValueRatio(type, 'FE'), Config.controller.controllerMaxReceive);
		var add = Math.min(amount, this.getCapacity() - this.data.energy);
		if(!this.data.isActive && this.data.allowSetIsActive != false)this.setActive(true);
		this.data.energy += add;
		this.networkData.putInt('energy', this.data.energy);
		this.data.networkDataUpdate = true;
		this.data.updateModel = true;
		return type == 'Eu' ? add / 4 : add;
	},
	pre_setActive: function(state){
		if(state && this.data.energy <= 0) return true;
	},
	tick: function () {
		if(this.data.timer){
			this.data.ticks++;
			if(this.data.ticks >= this.data.timer) {
				this.updateControllerNetwork(true);
				this.updateItems();
				this.updateNetMap(true);
				this.setActive(this.data.energy > this.data.usage, true, true);
				this.refreshModel();
				this.data.timer = false;
				this.data.ticks = 0;
			}
		}
		if (this.container.getNetworkEntity().getClients().iterator().hasNext()) {
			this.container.setScale('scale', this.data.energy / this.getCapacity());
			this.container.setText('storage', this.data.energy + '/' + this.getCapacity() + ' FE');
			this.data.containerUpdate = true;
		}
		if(!this.isWorkAllowed()) {
			if(this.data.containerUpdate){
				this.container.sendChanges();
				this.data.containerUpdate = false;
			}
			return;
		}
		if(this.data.updateControllerNetwork){
			this.updateControllerNetwork();
			this.data.updateControllerNetwork = false;
		}
		this.updateNetMap();
		if (this.data.energy >= this.data.usage && this.data.energy != 0){
			this.setActive(true);
			if(Config.controller.usesEnergy && !this.data.isCreative){
				this.data.energy -= this.data.usage;
				this.networkData.putInt('energy', this.data.energy);
				this.data.networkDataUpdate = true;
				this.data.updateModel = true;
			}
		} else {
			this.setActive(false);
		}
		if(this.data.networkDataUpdate){
			this.networkData.sendChanges();
			this.data.networkDataUpdate = false;
		}
		if(this.data.containerUpdate){
			this.container.sendChanges();
			this.data.containerUpdate = false;
		}
		if(this.data.updateModel){
			var texture = controllerFuncs.getNewTexture(controllerFuncs.getEnergyScaled(this.data.energy), this.data.isActive);
			if(this.data.lastTexture != (this.data.lastTexture = texture)) this.refreshModel();
			this.data.updateModel = false;
		}
	},
	refreshModel: function(){
		if(!this.networkEntity) return Logger.Log(Item.getName(this.blockInfo.id, this.blockInfo.data) + ' model on: ' + cts(this) + ' cannot be displayed');
		this.sendPacket("refreshModel", {energy: this.data.energy, isActive: this.data.isActive, coords: {x: this.x, y: this.y, z: this.z}});
	},
	destroy: function (param1, isDropAllowed) {
		if (this.data.NETWORK_ID != "f" && RSNetworks[this.data.NETWORK_ID]) {
			set_net_for_blocks(this, 'f');
			delete RSNetworks[this.data.NETWORK_ID];
		}
		if(!isDropAllowed && isDropAllowed !== undefined) return;
		this.data.LAST_NETWORK_ID = this.data.NETWORK_ID;
		this.data.NETWORK_ID == "f";
		if(this.data.isCreative){
			this.blockSource.spawnDroppedItem(this.x + 0.5, this.y + 0.5, this.z + 0.5, BlockID['RS_controller'], 1, 3, null);
			return;
		}
		var extra = null;
		if (this.data.energy > 0) {
			extra = new ItemExtraData();
			extra.putInt('energy', this.data.energy);
		}
		var block_data = 0;
		var energyScaled = controllerFuncs.getEnergyScaled(100, this.data.energy);
		if (energyScaled <= 0) {
			block_data = 0;
		} else if (energyScaled <= 20) {
			block_data = 1;
		} else {
			block_data = 2;
		}
		this.blockSource.spawnDroppedItem(this.x + 0.5, this.y + 0.5, this.z + 0.5, BlockID['RS_controller'], 1, block_data, extra);
	},
	getScreenByName: function(screenName) {
		if(screenName == 'main')return CONTROLLER_GUI;
	},
	refreshGui: function(){
		this.container.sendEvent("refreshGui", {isActive: this.data.isActive, capacity: this.getCapacity(), redstone_mode: this.data.redstone_mode, usage: this.data.usage, energy: this.data.energy, isCreative: this.data.isCreative, net_map: this.data.net_map});
	},
	client: {
		load: function(){
			if(Config.dev)Logger.Log('Loaded Controller client tile: energy: ' + this.networkData.getInt('energy') + ' ; isActive: ' + this.networkData.getBoolean('isActive'), 'RefinedStorageDebug');
			if(this.refreshModel)this.refreshModel();
		},
		refreshModel: function(eventData, connectedClient){
			if(Config.dev)Logger.Log('Local refreshing Controller model: energy: ' + this.networkData.getInt('energy') + ' ; isActive: ' + this.networkData.getBoolean('isActive'), 'RefinedStorageDebug');
			var newTexture = controllerFuncs.getNewTexture(controllerFuncs.getEnergyScaled(100, this.networkData.getInt('energy')), this.networkData.getBoolean('isActive'));
			RefinedStorage.mapTexture(this, newTexture);
		},
		events: {
			refreshModel: function(eventData, connectedClient){
				if(Config.dev)Logger.Log('Event refreshing Controller model: energy: ' + eventData.energy + ' ; isActive: ' + eventData.isActive, 'RefinedStorageDebug');
				var newTexture = controllerFuncs.getNewTexture(controllerFuncs.getEnergyScaled(100, eventData.energy), eventData.isActive);
				RefinedStorage.mapTexture(eventData.coords, newTexture);
			}
		},
		containerEvents: {
			openGui: function(container, window, windowContent, eventData){
				if(!windowContent || !window || !window.isOpened()) return;
				var networkData = SyncedNetworkData.getClientSyncedData(eventData.name);
				controller_other_data.networkData = networkData;
				controller_other_data.net_map = eventData.net_map;
				controller_other_data.isActive = eventData.isActive;
				var headerWindow = window.getWindow('header')
				headerWindow.getContent().drawing[2].text = eventData.isCreative ? Translation.translate("Creative Controller") : Translation.translate("Controller");
				headerWindow.forceRefresh();
				windowContent.elements["slider_button"].y = windowContent.elements["slider_button"].start_y;
				windowContent.elements["image_redstone"].bitmap = 'redstone_GUI_' + (eventData.redstone_mode || 0);
				controllerSwitchPage(1, container, controller_other_data, true);
			},
			refreshGui:function(container, window, windowContent, eventData){
				if(!windowContent || !window || !window.isOpened()) return;
				controller_other_data.net_map = eventData.net_map;
				controller_other_data.isActive = eventData.isActive;
				windowContent.elements["image_redstone"].bitmap = 'redstone_GUI_' + (eventData.redstone_mode || 0);
				controllerSwitchPage(controller_other_data.lastPage, container, controller_other_data, true);

			}
		}
	},
	containerEvents: {
		updateRedstoneMode: function(eventData, connectedClient) {
			if(this.data.redstone_mode == undefined) this.data.redstone_mode = 0;
			this.data.redstone_mode = this.data.redstone_mode >= 2 ? 0 : this.data.redstone_mode + 1;
			if(!this.refreshRedstoneMode()) this.refreshGui();
		}
	}
})
EnergyTileRegistry.addEnergyTypeForId(BlockID.RS_controller, FE);
EnergyTileRegistry.addEnergyTypeForId(BlockID.RS_controller, EU);
EnergyTileRegistry.addEnergyTypeForId(BlockID.RS_controller, RF);




// file: blocks/grid.js



const _gridTexture = [
	["disk_drive_bottom", 0], // bottom
	["grid_top", 0], // top
	["grid_back", 0], // back
	["grid_front", 0], // front
	["grid_left", 0], // left
	["grid_right", 0]  // right
];

function getGridTexture(variation, _active){
	variation = variation || 0;
	var i = _active ? 1 : 0;
	return [[_gridTexture[0], [_gridTexture[1][0], 0], _gridTexture[2], [_gridTexture[3][0], i], _gridTexture[4], _gridTexture[5]], [_gridTexture[0], [_gridTexture[1][0], 1], [_gridTexture[3][0], i], _gridTexture[2], _gridTexture[5], _gridTexture[4]], [_gridTexture[0], [_gridTexture[1][0], 2], _gridTexture[5], _gridTexture[4], _gridTexture[2], [_gridTexture[3][0], i]], [_gridTexture[0], [_gridTexture[1][0], 3], _gridTexture[4], _gridTexture[5], [_gridTexture[3][0], i], _gridTexture[2]]][variation];
}

IDRegistry.genBlockID("RS_grid");
Block.createBlockWithRotation("RS_grid", [
	{
		name: "Grid",
		texture: getGridTexture(),
		inCreative: true
	}
]);
mod_tip(BlockID['RS_grid']);
RS_blocks.push(BlockID['RS_grid']);
EnergyUse[BlockID['RS_grid']] = Config.energy_uses.grid;

for (var izxc = 0; izxc < 4; izxc++) {
	var render = new ICRender.Model();
	var model = BlockRenderer.createTexturedBlock(getGridTexture(izxc));
	render.addEntry(model);
	BlockRenderer.enableCoordMapping(BlockID["RS_grid"], izxc, render);
}

var filter_size_map = [24, 36, 32];//6,9,8  *4

var gridData = {
	maxY: 0,
	lastPage: -1,
	textSearch: false,
	lowPriority: false,
	slotsKeys: [],
	updateGui: function(){}
}

function gridSwitchPage(page, container, ignore, dontMoveSlider){
	if(Config.dev)Logger.Log('Switch grid Page; page: ' + page + ' ; ignore: ' + ignore + ' ; dontMoveSlider: ' + dontMoveSlider + ' ; container: ' + container, 'RefinedStorageDebug');
	if(!container.getUiAdapter() || !container.getUiAdapter().getWindow() || !container.getUiAdapter().getWindow().isOpened()) return false;
	var slots = container.slots;
	var slotsKeys = gridData.slotsKeys;
	var slots_count = gridData.slots_count;
	var x_count = gridData.x_count;
	var pages1 = gridFuncs.getPages(slotsKeys.length);
	var pages = Math.max(1, pages1 + 1 - gridData.y_count);
	page = Math.max(1, Math.min(page, pages)) - 1;
	if(page == gridData.lastPage - 1 && !ignore) return false;
	gridData.lastPage = page + 1;
	var pages = gridFuncs.getPages(slotsKeys.length);
	var ___y = gridFuncs.getCoordsFromPage(page + 1, pages);
	if(!dontMoveSlider)container.getUiAdapter().getElement("slider_button").setPosition(_elementsGUI_grid['slider_button'].x, ___y);
	if (!gridData.isWorkAllowed) {
		for (var i = 0; i < slots_count; i++) {
			container.setSlot("slot" + i, 0, 0, 0, null);
			container.setText("slot" + i, "0");
		}
		return false;
	}
	var elements_ = container.getUiAdapter().getWindow().getWindow('main').getElements();
	for (var i = page * x_count; i < page * x_count + slots_count; i++) {
		var a = i - (page * x_count);
		var item = slots[slotsKeys[i]] || { id: 0, data: 0, count: 0, extra: null };
		//container.markSlotDirty("slot" + a);
		container.markSlotDirty("slot" + a);
		elements_.get("slot" + a).setBinding('text', cutNumber(item.count, true) + "");
		//container.setText("slot" + a, cutNumber(item.count));
		container.setSlot("slot" + a, item.id, item.count, item.data, item.extra || null);
	}
	return true;
}
var _gridSwitchPage__ = gridSwitchPage;

function grid_set_elements(x, y, cons, limit, elementsGUI_grid, grid_Data, _window, __gridSwitchPage) {
	var gridSwitchPage = __gridSwitchPage || _gridSwitchPage__;
	var gridData = grid_Data || {
		maxY: 0,
		lastPage: -1,
		textSearch: false,
		updateGui: function(){}
	};
	var moving = false;
	var max_y = 0;
	var swipe_y;
	var swipe_sum = 0;
	elementsGUI_grid.clickFrameTouchEvents = [];
	elementsGUI_grid["click_frame"] = {
		type: "frame",
		x: -100,
		y: -100,
		z: -100,
		width: 1200,
		height: 1200,
		bitmap: "empty",
		scale: 1,
		onTouchEvent: function (element, event) {
			for(var i in elementsGUI_grid.clickFrameTouchEvents){
				elementsGUI_grid.clickFrameTouchEvents[i](element, event);
			}
		}
	};
	var headerWindow = _window.getWindow('header');
	var headerElements = headerWindow.getContent().elements;
	headerElements['itemInfoFrame'] = {
        type: "frame",
        x: 100,
        y: 15,
        width: 300,
        height: 50,
        bitmap: "itemInfoFrame",
        scale: 2
	}
	headerElements['itemInfoSlot'] = {
        type: "slot",
        x: headerElements['itemInfoFrame'].x + 5,
		y: headerElements['itemInfoFrame'].y + 5,
		z: 100,
		size: 40,
		bitmap: "_default_slot_empty",
		isTransparentBackground: true,
		visual: true
	}
	headerElements['itemInfoName'] = {
		type: "text",
		x: headerElements['itemInfoSlot'].x + headerElements['itemInfoSlot'].size + 3,
		y: headerElements['itemInfoSlot'].y + 1,
		z: 100,
		text: "",
		font: {
			color: android.graphics.Color.WHITE,
			shadow: 0,
			size: 11
		}
	}
	headerElements['itemInfoDescription'] = {
		type: "text",
		x: headerElements['itemInfoSlot'].x + headerElements['itemInfoSlot'].size + 3,
		y: headerElements['itemInfoName'].y + Math.round(headerElements['itemInfoName'].font.size*1.1) + 2,
		z: 100,
		text: "",
		multiline: true,
		font: {
			color: android.graphics.Color.GRAY,
			shadow: 0,
			size: 9
		}
	}
	var _font = new JavaFONT(headerElements['itemInfoName'].font);
	var _font2 = new JavaFONT(headerElements['itemInfoDescription'].font);
	function setItemInfoSlot(_item, container){
		gridData.selectedItemInfoSlot = _item;
		var item = container.getSlot(_item);
		container.setSlot('itemInfoSlot', item.id, 1, item.data, item.extra);
		var fullName = Item.getName(item.id, item.data, item.extra).replace(/§./g, '');
		var splitedName = fullName.split('\n');
		//if(splitedName[0][0] == '§') headerElements['itemInfoName'].font.color = parseMineColor(splitedName[0][1]);
		var text = (splitedName[0].length > 40 ? splitedName[0].substr(0, 40) + '...' : splitedName[0]) + ' (' + numberWithCommas(item.count) + ')';
		if(Config.dev)splitedName.push('id: ' + item.id + '  data: ' + item.data);
		container.setText('itemInfoName', text);
		container.setText('itemInfoDescription', splitedName.slice(1).join('\n'));
		var frameWidth = 0;
		var drawScale = headerWindow.location.getDrawingScale();
		var nameWidth = _font.getBounds(text, headerElements['itemInfoName'].x * drawScale, headerElements['itemInfoName'].y * drawScale, parseFloat(1.0)).width();
		frameWidth = nameWidth;
		var newSplitedName = splitedName.slice(1);
		for(var i in newSplitedName){
			var descrWidth = _font2.getBounds(newSplitedName[i], headerElements['itemInfoDescription'].x * drawScale, headerElements['itemInfoDescription'].y * drawScale, parseFloat(1.0)).width();
			if(descrWidth > frameWidth) frameWidth = descrWidth;
		}
		//alert(headerElements['itemInfoName'].x + " + " + frameWidth + " + " + 5 + " = " + (headerElements['itemInfoName'].x + frameWidth + 5));
		headerElements['itemInfoFrame'].width = 50 + frameWidth + 10;
		headerWindow.forceRefresh();
	}
	gridData.setItemInfoSlot = setItemInfoSlot;
	elementsGUI_grid.clickFrameTouchEvents.push(function (element, event) {
		var content = {elements:elementsGUI_grid};/* element.window.getContent(); *///getContainer().getGuiContent();
		var itemContainerUiHandler = element.window.getContainer();
		var itemContainer = itemContainerUiHandler.getParent();
		if (event.type == "DOWN" && !swipe_y && event.x > elementsGUI_grid["x_start"] && event.x < elementsGUI_grid["x_end"] && event.y > elementsGUI_grid["y_start"] && event.y < elementsGUI_grid["y_end"]) {
			swipe_y = event.y;
		} else if (swipe_y && event.type == "MOVE") {
			var distance = Math.abs(event.y - swipe_y);
			function moveSwitchPage_(_n){
				_n = (_n ? 1 : -1);
				gridSwitchPage(gridData.lastPage + _n, itemContainer);
			}
			if (distance > 7) {
				if (event.y > swipe_y) moveSwitchPage_(false);
				if (event.y < swipe_y) moveSwitchPage_(true);
				swipe_sum = 0;
			} else {
				swipe_sum += distance;
				if (swipe_sum > 15) {
					if (event.y > swipe_y) moveSwitchPage_(false);
					if (event.y < swipe_y) moveSwitchPage_(true);
					swipe_sum = 0;
				}
			}
			swipe_y = event.y;
		} else if (swipe_y && (event.type == "UP" || event.type == "CLICK")) {
			swipe_y = false;
		}
		if (!moving) return;
		event.y -= content.elements["slider_button"].scale * 15 / 2;
		if (event.type != 'UP' && event.type != "CLICK") {
			var page = gridFuncs.getPageFromCoords(event, gridFuncs.getPages(gridData.slotsKeys.length));
			itemContainerUiHandler.getElement("slider_button").setPosition(content.elements['slider_button'].x, Math.max(Math.min(event.y, max_y), content.elements["slider_button"].start_y));
			gridSwitchPage(page, itemContainer, false, true);
		}
		if (event.type == "UP" || event.type == "CLICK") {
			moving = false;
			var pages = gridFuncs.getPages(gridData.slotsKeys.length);
			var page = gridFuncs.getPageFromCoords(event, pages);
			gridSwitchPage(page, itemContainer);
		}
	})

	var x_count = Math.round((910 - x) / cons);
	var y_count = limit || Math.round((UI.getScreenHeight()- 60 - y - cons) / cons);

	elementsGUI_grid["search_frame"] = {
		type: "frame",
		x: x,
		y: 30,
		width: x_count*cons,
		height: 30,
		bitmap: "search_bar",
		scale: 0.8,
		clicker: {
			onClick: function (itemContainerUiHandler, itemContainer, element) {
				UI.getContext().runOnUiThread(new java.lang.Runnable({// I take this from Recipe Viewer https://icmods.mineprogramming.org/mod?id=455 :D
					run: function () {
						try {
							var editText = new android.widget.EditText(UI.getContext());
							//editText.setHint(Translation.translate("Type here item name"));
							new android.app.AlertDialog.Builder(UI.getContext())
								.setTitle(Translation.translate("Please type the keywords"))
								.setView(editText)
								.setPositiveButton(Translation.translate("Search"), {
									onClick: function () {
										if (!itemContainerUiHandler.getWindow().isOpened()) return;
										var keyword = editText.getText() + "";
										gridData.textSearch = keyword.length ? keyword : false;
										gridData.updateGui(true, true, gridData.isCrafting);
									}
								}).show();
							//UI.getContext().getActionBar().hide();
						} catch (e) {
							alert(e);
						}
					}
				}));
			}
		}
	}

	elementsGUI_grid["search_text"] = {
		type: "text",
		x: x + 10,
		y: 30 + 1,
		z: 100,
		text: Translation.translate('Search'),
		font: {
			color: android.graphics.Color.WHITE,
			shadow: 0.5,
			size: 20
		}
	}

	var asd = 0;
	var _y = y;
	var _x = x;
	for (var i = 0; i < y_count; i++) {
		_x = x;
		for (var k = 0; k < x_count; k++) {
			elementsGUI_grid['slot' + asd] = {
				type: "slot",
				num: asd,
				x: _x,
				y: _y,
				visual: true,
				onTouchEvent: function(element, event){
					var itemContainerUiHandler = element.window.getContainer();
					var itemContainer = itemContainerUiHandler.getParent();
					var _num = this.num + (gridData.lastPage - 1) * x_count;
					var slot = gridData.slotsKeys[_num];
					if(!slot)return;
					setItemInfoSlot(slot, itemContainer);
				},
				clicker: {
					onClick: function (itemContainerUiHandler, itemContainer, element) {
						var itemContainer = itemContainer.slots ? itemContainer : element;
						if (!gridData.isWorkAllowed) return;
						var _num = this.num + (gridData.lastPage - 1) * x_count;
						var slot = gridData.slotsKeys[_num];
						var slotItem = itemContainer.slots[slot];
						if(!slotItem || slotItem.id == 0) return;
						var _count = 1;
						var updateFull = false;
						if(Config.dev)Logger.Log('Deleting slot: ' + slot + ' ; num: ' + this.num + '(' + _num + ') ; lastPage: ' + gridData.lastPage + ' ; count: ' + _count + ' ; x_count: ' + x_count, 'RefinedStorageDebug');
						var elements_ = itemContainer.getUiAdapter().getWindow().getWindow('main').getElements();
						if(slotItem.count == _count) {
							itemContainer.setSlot(slot, 0, 0, 0);
							gridData.slotsKeys.splice(_num, 1);
							updateFull = true;
							gridData.updateGui(true, true);
						} else {
							if(gridData.sort == 0){
								if(_num > 0 && slotItem.count - _count <= itemContainer.slots[gridData.slotsKeys[_num - 1]].count){
									itemContainer.setSlot(slot, slotItem.id, slotItem.count - _count, slotItem.data, slotItem.extra);
									updateFull = true;
									gridData.updateGui(true, true);
								} else {
									itemContainer.markSlotDirty('slot' + this.num);
									elements_.get('slot' + this.num).setBinding('text', cutNumber(slotItem.count - _count, true) + "");
									itemContainer.setSlot('slot' + this.num, slotItem.id, slotItem.count - _count, slotItem.data, slotItem.extra);
									//itemContainer.setText('slot' + this.num, cutNumber(slotItem.count - _count));
									itemContainer.setSlot(slot, slotItem.id, slotItem.count - _count, slotItem.data, slotItem.extra);
								}
							} else {
								itemContainer.markSlotDirty('slot' + this.num);
								elements_.get('slot' + this.num).setBinding('text', cutNumber(slotItem.count - _count, true) + "");
								itemContainer.setSlot('slot' + this.num, slotItem.id, slotItem.count - _count, slotItem.data, slotItem.extra);
								//itemContainer.setText('slot' + this.num, cutNumber(slotItem.count - _count));
								itemContainer.setSlot(slot, slotItem.id, slotItem.count - _count, slotItem.data, slotItem.extra);
							}
						}
						setItemInfoSlot(slot, itemContainer);
						var map = (asdgfasdasddsad = gridData.networkData.getString('deleteItemsMap', 'null')) != 'null' ? JSON.parse(asdgfasdasddsad) : [];
						if(map.indexOf(slot) == -1){
							map.push(slot);
							gridData.networkData.putString('deleteItemsMap', JSON.stringify(map));
						}
						gridData.lowPriority = true;
						var currentCount = gridData.networkData.getInt(slot, 0);
						gridData.networkData.putInt(slot, currentCount + _count);
						gridData.networkData.putBoolean('update', true);
						gridData.networkData.putBoolean('updateFull'+slot, updateFull);
					},
					onLongClick: function (itemContainerUiHandler, itemContainer, element) {
						var itemContainer = itemContainer.slots ? itemContainer : element;
						if (!gridData.isWorkAllowed) return;
						var _num = this.num + (gridData.lastPage - 1) * x_count;
						var slot = gridData.slotsKeys[_num];
						var slotItem = itemContainer.slots[slot];
						if(!slotItem || slotItem.id == 0) return;
						var maxStack = Item.getMaxStack(slotItem.id);
						var this_item = searchItem(slotItem.id, slotItem.data, false, true);
						var _count = this_item && this_item.count < maxStack && this_item.extra == slotItem.extra ? Math.min(slotItem.count, maxStack - this_item.count) : Math.min(slotItem.count, maxStack);
						var updateFull = false;
						if(Config.dev)Logger.Log('Deleting slot: ' + slot + ' ; num: ' + this.num + '(' + _num + ') ; lastPage: ' + gridData.lastPage + ' ; count: ' + _count + ' ; x_count: ' + x_count, 'RefinedStorageDebug');
						var elements_ = itemContainer.getUiAdapter().getWindow().getWindow('main').getElements();
						if(slotItem.count <= _count) {
							itemContainer.setSlot(slot, 0, 0, 0);
							gridData.slotsKeys.splice(_num, 1);
							updateFull = true;
							gridData.updateGui(true, true);
						} else {
							if(gridData.sort == 0){
								if(_num > 0 && slotItem.count - _count <= itemContainer.slots[gridData.slotsKeys[_num - 1]].count){
									itemContainer.setSlot(slot, slotItem.id, slotItem.count - _count, slotItem.data, slotItem.extra);
									updateFull = true;
									gridData.updateGui(true, true);
								} else {
									itemContainer.markSlotDirty('slot' + this.num);
									elements_.get('slot' + this.num).setBinding('text', cutNumber(slotItem.count - _count, true) + "");
									itemContainer.setSlot('slot' + this.num, slotItem.id, slotItem.count - _count, slotItem.data, slotItem.extra);
									//itemContainer.setText('slot' + this.num, cutNumber(slotItem.count - _count));
									itemContainer.setSlot(slot, slotItem.id, slotItem.count - _count, slotItem.data, slotItem.extra);
								}
							} else {
								itemContainer.markSlotDirty('slot' + this.num);
								elements_.get('slot' + this.num).setBinding('text', cutNumber(slotItem.count - _count, true) + "");
								itemContainer.setSlot('slot' + this.num, slotItem.id, slotItem.count - _count, slotItem.data, slotItem.extra);
								//itemContainer.setText('slot' + this.num, cutNumber(slotItem.count - _count));
								itemContainer.setSlot(slot, slotItem.id, slotItem.count - _count, slotItem.data, slotItem.extra);
							}
						}
						setItemInfoSlot(slot, itemContainer);
						gridData.lowPriority = true;
						var map = (asdgfasdasddsad = gridData.networkData.getString('deleteItemsMap', 'null')) != 'null' ? JSON.parse(asdgfasdasddsad) : [];
						if(map.indexOf(slot) == -1){
							map.push(slot);
							gridData.networkData.putString('deleteItemsMap', JSON.stringify(map));
						}
						var currentCount = gridData.networkData.getInt(slot, 0);
						gridData.networkData.putInt(slot, currentCount + _count);
						gridData.networkData.putBoolean('update', true);
						gridData.networkData.putBoolean('updateFull'+slot, updateFull);
					}
				},
				size: cons + 1
			}
			asd++;
			_x += cons;
		}
		_y += cons;
	}
	elementsGUI_grid["slots_count"] = asd;
	elementsGUI_grid["x_count"] = x_count;
	elementsGUI_grid["y_count"] = y_count;
	elementsGUI_grid["x_start"] = x;
	elementsGUI_grid["x_end"] = _x;
	elementsGUI_grid["y_start"] = y;
	elementsGUI_grid["y_end"] = _y;
	elementsGUI_grid["cons"] = cons;

	gridData.slots_count = asd;
	gridData.x_count = x_count;
	gridData.y_count = y_count;
	gridData.cons = cons;

	var slider_frame_cons = 20;
	var slider_frame_border = 7;
	elementsGUI_grid["slider_frame"] = {
		type: "frame",
		x: 0,//_x + slider_frame_cons,
		y: y,
		width: 50,//(1000 - (_x + slider_frame_cons) - slider_frame_cons),
		height: y_count * cons,
		bitmap: "slider",
		scale: 1,
		onTouchEvent: function (element, event) {
			if (event.type == 'DOWN') {
				moving = true;
			}
			if (event.type == 'CLICK') {
				var itemContainerUiHandler = element.window.getContainer();
				var itemContainer = itemContainerUiHandler.getParent();
				var pages = gridFuncs.getPages(gridData.slotsKeys.length);
				var page = gridFuncs.getPageFromCoords(event, pages);
				gridSwitchPage(page, itemContainer);
			}
		}
	}
	elementsGUI_grid["slider_frame"].x = _x + (1000 - _x - elementsGUI_grid["slider_frame"].width) / 2;
	elementsGUI_grid["slider_button"] = {
		type: "button",
		x: elementsGUI_grid["slider_frame"].x + slider_frame_border,
		start_y: elementsGUI_grid["slider_frame"].y + slider_frame_border,
		y: elementsGUI_grid["slider_frame"].y + slider_frame_border,
		bitmap: 'slider_buttonOff',
		scale: (elementsGUI_grid["slider_frame"].width - slider_frame_border * 2) / 12
	}
	elementsGUI_grid["button_up"] = {
		type: "button",
		x: 0,
		y: 0,
		bitmap: 'but_up',
		bitmap2: 'but_upPressed',
		scale: elementsGUI_grid["slider_frame"].width/25,//Math.min((1000 - _x - slider_frame_cons * 2) / 25, (y - 30 - 10) / 15),
		clicker: {
			onClick: function (itemContainerUiHandler, itemContainer, element) {
				gridSwitchPage(gridData.lastPage - 1, itemContainer);
			},
			onLongClick: function (itemContainerUiHandler, container, element) {
			}
		}
	}
	elementsGUI_grid["slider_frame"].height -= 20 + elementsGUI_grid["button_up"].scale * 15;

	elementsGUI_grid["button_up"].x = _x + (1000 - _x - elementsGUI_grid["button_up"].scale * 25) / 2;
	elementsGUI_grid["button_up"].y = 20 + (50 - elementsGUI_grid["button_up"].scale * 15) / 2;

	elementsGUI_grid["button_down"] = {
		type: "button",
		x: _x + slider_frame_cons,
		y: y + elementsGUI_grid["slider_frame"].height + 20,
		bitmap: 'but_down',
		bitmap2: 'but_downPressed',
		scale: elementsGUI_grid["button_up"].scale,
		clicker: {
			onClick: function (itemContainerUiHandler, itemContainer, element) {
				gridSwitchPage(gridData.lastPage + 1, itemContainer);
			},
			onLongClick: function (itemContainerUiHandler, itemContainer, element) {
			}
		}
	}
	elementsGUI_grid["button_down"].x = _x + (1000 - _x - elementsGUI_grid["button_down"].scale * 25) / 2;
	elementsGUI_grid["button_down"].y = y + elementsGUI_grid["slider_frame"].height + (50 - elementsGUI_grid["button_down"].scale * 15) / 2;

	var settings_cons = 10;
	elementsGUI_grid.settings_cons = settings_cons;
	elementsGUI_grid["redstone_button"] = {
		type: "button",
		x: 0,
		y: y,
		bitmap: 'RS_empty_button',
		bitmap2: 'RS_empty_button_pressed',
		scale: 2,
		clicker: {
			onClick: function (itemContainerUiHandler, container, element) {
				container.sendEvent("updateRedstoneMode", {});
			},
			onLongClick: function (itemContainerUiHandler, container, element) {

			}
		}
	}
	elementsGUI_grid["redstone_button"].x = x - settings_cons - (20 * elementsGUI_grid["redstone_button"].scale);

	elementsGUI_grid["image_redstone"] = {
		type: "image",
		x: elementsGUI_grid["redstone_button"].x,
		y: elementsGUI_grid["redstone_button"].y,
		z: 100,
		bitmap: "redstone_GUI_0",
		scale: elementsGUI_grid["redstone_button"].scale*20/16,
	}

	elementsGUI_grid["filter_button"] = {
		type: "button",
		x: 0,
		y: elementsGUI_grid["redstone_button"].y + (elementsGUI_grid["redstone_button"].scale * 20) + settings_cons,
		bitmap: 'RS_empty_button',
		bitmap2: 'RS_empty_button_pressed',
		scale: 2,
		clicker: {
			onClick: function (itemContainerUiHandler, container, element) {
				container.sendEvent("updateFilter", {});
			},
			onLongClick: function (itemContainerUiHandler, container, element) {
				
			}
		}
	}
	elementsGUI_grid["filter_button"].x = x - settings_cons - (20 * elementsGUI_grid["filter_button"].scale);

	elementsGUI_grid["image_filter"] = {
		type: "image",
		x: elementsGUI_grid["filter_button"].x + (elementsGUI_grid["filter_button"].scale * 20 - 24) / 2,
		y: elementsGUI_grid["filter_button"].y + (elementsGUI_grid["filter_button"].scale * 20 - 24) / 2,
		z: 1000,
		bitmap: "RS_filter1",
		scale: 4,
	}

	elementsGUI_grid["reverse_filter_button"] = {
		type: "button",
		x: 0,
		y: elementsGUI_grid["filter_button"].y + (elementsGUI_grid["filter_button"].scale * 20) + settings_cons,
		bitmap: 'RS_empty_button',
		bitmap2: 'RS_empty_button_pressed',
		scale: 2,
		clicker: {
			onClick: function (itemContainerUiHandler, container, element) {
				container.sendEvent("updateReverseFilter", {});
			},
			onLongClick: function (itemContainerUiHandler, container, element) {
				
			}
		}
	}
	elementsGUI_grid["reverse_filter_button"].x = x - settings_cons - (20 * elementsGUI_grid["reverse_filter_button"].scale);

	elementsGUI_grid["image_reverse_filter"] = {
		type: "image",
		x: 0,
		y: 0,
		z: 1000,
		bitmap: "RS_arrow_down",
		scale: 3.5,
	}
	elementsGUI_grid["image_reverse_filter"].x = elementsGUI_grid["reverse_filter_button"].x + (elementsGUI_grid["reverse_filter_button"].scale * 20 - (elementsGUI_grid["image_reverse_filter"].scale * 8)) / 2
	elementsGUI_grid["image_reverse_filter"].y = elementsGUI_grid["reverse_filter_button"].y + (elementsGUI_grid["reverse_filter_button"].scale * 20 - (elementsGUI_grid["image_reverse_filter"].scale * 10)) / 2

	max_y = (elementsGUI_grid["slider_frame"].y + elementsGUI_grid["slider_frame"].height) - 7 - elementsGUI_grid["slider_button"].scale * 15;
	elementsGUI_grid["max_y"] = max_y;
	gridData.maxY = max_y;
};
var _elementsGUI_grid = {};

var gridGUI = new UI.StandartWindow({
	standart: {
		header: {
			text: {
				text: Translation.translate("Grid")
			}
		},
		inventory: {
			padding: 20,
			width: 300 / 4 * 3
		},
		background: {
			standart: true
		}
	},

	drawing: [],

	elements: _elementsGUI_grid
});
GUIs.push(gridGUI);

var gridConsPercents = 50/(575.5 - 60);
grid_set_elements(315, 70, gridConsPercents*(UI.getScreenHeight() - 60), 0, _elementsGUI_grid, gridData, gridGUI);
gridGUI.getWindow('main').forceRefresh();

testButtons(gridGUI.getWindow('header').getContent().elements, function(){
	grid_set_elements(315, 70, gridConsPercents*(UI.getScreenHeight() - 60), 0, _elementsGUI_grid, gridData);
});

var inv_elements = gridGUI.getWindow('inventory').getContent();
inv_elements.elements["_CLICKFRAME_"] = {
	type: "frame",
	x: 0,
	y: 0,
	z: -100,
	width: 1000,
	height: 251*9,
	bitmap: "empty",
	scale: 1,
	onTouchEvent: function(element, event){
		if(event.type == 'CLICK' || event.type == 'LONG_CLICK'){
			if (!gridData.isWorkAllowed) return;
			var itemContainerUiHandler = element.window.getContainer();
			var itemContainer = itemContainerUiHandler.getParent();
			var slot_id = Math.floor(event.x/251)+Math.floor(event.y/250)*4;
			var updateFull = false;
			var item = Player.getInventorySlot(slot_id);
			if(item.id == 0)return;
			//alert(JSON.stringify(item));
			if(gridData.disksStored >= gridData.disksStorage) return
			if(event.type == 'CLICK'){
				var count = 1;
			} else {
				var count = Math.min(Item.getMaxStack(item.id), gridData.disksStorage - gridData.disksStored, item.count);
			}
			if(Config.dev)Logger.Log('Grid local pushing item: ' + getItemUid(item) + ' ; count: ' + count + ' ; slot: ' + slot_id + " ; extra: " + fullExtraToString(item.extra), 'RefinedStorageDebug');
			var slotFounded = false;
			for(var i in gridData.slotsKeys){
				var _slotName = gridData.slotsKeys[i];
				var _slot = itemContainer.slots[_slotName];
				//if(Config.dev)Logger.Log('Checking item: ' + getItemUid(_slot) + " ; extra: " + fullExtraToString(_slot.extra), 'RefinedStorageDebug');
				if(_slot && (_slot.id == 0 || (_slot.id == item.id && _slot.data == item.data && (item.extra == _slot.extra || (item.extra && _slot.extra && fullExtraToString(item.extra) == fullExtraToString(_slot.extra)))))){
					item.extra = _slot.extra;
					if(Config.dev)Logger.Log('Founded slot: ' + _slotName + ' : ' + JSON.stringify(_slot.asScriptable()), 'RefinedStorageDebug');
					slotFounded = true;
					itemContainer.setSlot(_slotName, item.id, _slot.count + count, item.data, item.extra || null);
					gridData.setItemInfoSlot(_slotName, itemContainer);
					if(gridData.sort == 0) updateFull = true;
					gridData.updateGui(true, updateFull);
					gridData.lowPriority = true;
					break
				}
			}
			if(!slotFounded){
				var _slotName = gridData.slotsKeys.length + 'slot';
				if(Config.dev)Logger.Log('Slot not founded, new slot name: ' + _slotName, 'RefinedStorageDebug');
				gridData.slotsKeys.push(_slotName);
				itemContainer.setSlot(_slotName, item.id, count, item.data, item.extra || null);
				gridData.setItemInfoSlot(_slotName, itemContainer);
				updateFull = true;
				gridData.updateGui(true, updateFull);
				gridData.lowPriority = true;
			}
			var map = (asdgfasdasddsad = gridData.networkData.getString('pushItemsMap', 'null')) != 'null' ? JSON.parse(asdgfasdasddsad) : [];
			if(map.indexOf(slot_id) == -1){
				map.push(slot_id);
				gridData.networkData.putString('pushItemsMap', JSON.stringify(map));
			}
			var currentCount = gridData.networkData.getInt(slot_id, 0);
			gridData.networkData.putInt(slot_id, currentCount + count);
			gridData.networkData.putBoolean('update', true);
			gridData.networkData.putBoolean('updateFull'+slot_id, updateFull);
		}
	}
}
function least_sort(a, b) { return a - b; };

function error(message) {
	alert(message);
	return false;
}

var gridFuncs = {
	getPages: function(_length){
		if(_length == 0) return 1;
		_length = Math.ceil(_length / _elementsGUI_grid["x_count"]);
		return _length;
	},
	getPageFromCoords: function(_coords, pages){
		pages -= _elementsGUI_craftingGrid['y_count'] - 1;
		var interval = (pages - 1) > 0 ? (_elementsGUI_grid["max_y"] - _elementsGUI_grid["slider_button"].start_y) / (pages - 1) : 0;
		function __getY(i) {
			return ((interval * i) + _elementsGUI_grid["slider_button"].start_y);
		}
		var least_dec = 10001;
		var finish_i = 0;
		for (var i = 0; i < pages; i++) {
			var dec = Math.abs(Math.round(_coords.y - __getY(i)));
			if (dec < least_dec) {
				least_dec = dec;
				finish_i = i;
			}
		};
		var page = finish_i;
		return page + 1;
	},
	getCoordsFromPage: function(page, pages){
		pages -= _elementsGUI_craftingGrid['y_count'] - 1;
		var interval = (pages - 1) > 0 ? (_elementsGUI_grid["max_y"] - _elementsGUI_grid["slider_button"].start_y) / (pages - 1) : 0;
		function __getY(i) {
			return ((interval * i) + _elementsGUI_grid["slider_button"].start_y);
		}
		if (page > pages) page = pages;
		if (page < 1) page = 1;
		return __getY(page - 1);
	},
	sort: function (type, reverse, slots) {
		if (reverse) {
			if (type == 2) {
				return function (a, b) { 
					return slots[b].id - slots[a].id 
				};
			} else if (type == 0) {
				return function (a, b) {
					var slot1 = slots[a], slot2 = slots[b];
					return slot1.count == 0 || slot2.count == 0 ? slot2.count - slot1.count : slot1.count - slot2.count;
				};
			} else if (type == 1) {
				return function (a, b) {
					var slot1 = slots[a], slot2 = slots[b];
					if(slot1.id == 0 || slot2.id == 0) return slot2.id - slot1.id;
					var name1 = getItemName(slot1.id, slot1.data, slot1.extra);
					var name2 = getItemName(slot2.id, slot2.data, slot2.extra);
					if (name1 > name2) {
						return 1;
					}
					if (name1 < name2) {
						return -1;
					}
					return 0;
				};
			}
		} else {
			if (type == 2) {
				return function (a, b) {
					var slot1 = slots[a], slot2 = slots[b];
					return slot1.id == 0 || slot2.id == 0 ? slot2.id - slot1.id : slot1.id - slot2.id 
				};
			} else if (type == 0) {
				return function (a, b) { 
					return slots[b].count - slots[a].count 
				};
			} else if (type == 1) {
				return function (a, b) {
					var slot1 = slots[a], slot2 = slots[b];
					if(slot1.id == 0 || slot2.id == 0) return slot2.id - slot1.id;
					var name1 = getItemName(slot1.id, slot1.data, slot1.extra);
					var name2 = getItemName(slot2.id, slot2.data, slot2.extra);
					if (name2 > name1) {
						return 1;
					}
					if (name2 < name1) {
						return -1;
					}
					return 0;
				};
			}
		}
	}
}

RefinedStorage.createTile(BlockID.RS_grid, {
	defaultValues: {
		NETWORK_ID: 'f',
		LAST_NETWORK_ID: 0,
		block_data: 0,
		page: 1,
		items: [],
		event: { x: 0, y: 0 },
		sort: 0,
		sort_map: ['count', 'name', 'id'],
		reverse_filter: false,
		page_switched: false,
		controller_coords: { x: 0, y: 0, z: 0 },
		slots_count: 0,
		textSearch: false,
		privateRemaked: false,
		pushDeleteEvents: {},
		firstOpen: false,
		firstOpenClients: [],
		fullRefreshPage: false
	},
	unsaveableSlots: true,
	useNetworkItemContainer: true,
	setActiveNotUpdateGui: true,
	click: function (id, count, data, coords, player, extra) {
		if(Entity.getSneaking(player)) return false;
		var client = Network.getClientForPlayer(player);
		if (!client || this.container.getNetworkEntity().getClients().contains(client)) return true;
		this.items();
		this.container.openFor(client, "main");
		/* this.data.firstOpen = World.getThreadTime() + 40;
		this.data.firstOpenClients.push(client); */
		/* var ths = this;
		setTimeout(function(){
			ths.refreshGui(true, client);
		},40); */
		if(InnerCore_pack.packVersionCode < 119)this.refreshGui(true, client); 
		return true;
	},
	onWindowClose: function(){
		if(this.data.NETWORK_ID == 'f') return;
		var coords_id = this.coords_id();
		RSNetworks[this.data.NETWORK_ID][coords_id].isOpenedGrid = false;
		if((iIndex = RSNetworks[this.data.NETWORK_ID].info.openedGrids.findIndex(function(element){return cts(element) == coords_id})) != -1) RSNetworks[this.data.NETWORK_ID].info.openedGrids.splice(iIndex, 1);
	},
	onWindowOpen: function(container, client){
		if(InnerCore_pack.packVersionCode >= 119)this.refreshGui(true, client); 
		if(this.data.NETWORK_ID == 'f') return;
		var coords_id = this.coords_id();
		RSNetworks[this.data.NETWORK_ID][coords_id].isOpenedGrid = true;
		if(RSNetworks[this.data.NETWORK_ID].info.openedGrids.findIndex(function(element){return cts(element) == coords_id}) == -1) RSNetworks[this.data.NETWORK_ID].info.openedGrids.push({x: this.x, y: this.y, z: this.z});
	},
	pre_init: function(){
		this.container.setGlobalGetTransferPolicy({
			transfer: function(itemContainer, slot, id, count, data, extra, player){
				return 0;
			}
		})
	},
	post_init: function(){
		/* this.data.firstOpen = false;
		this.data.firstOpenClients = []; */
		this.data.pushDeleteEvents = {};
	},
	tick: function () {
		/* if(this.data.firstOpen && this.data.firstOpen == World.getThreadTime()){
			for(var i in this.data.firstOpenClients){
				this.refreshGui(true, this.data.firstOpenClients[i]);
			}
			this.data.firstOpenClients = [];
			this.data.firstOpen = false;
		} */
		if (this.container.getNetworkEntity().getClients().iterator().hasNext()) {
			if(this.data.refreshCurPage){
				this.items();
				this.refreshGui(false, false, this.data.fullRefreshPage);
				this.data.refreshCurPage = false;
				this.data.fullRefreshPage = false;
			}
		}
		for(var p in this.data.pushDeleteEvents){
			var player = new PlayerActor(Number(p));
			//alert('Checking event of: ' + p);
			for(var i in this.data.pushDeleteEvents[p]){
				var event = this.data.pushDeleteEvents[p][i];
				//alert('Event: ' + JSON.stringify(event));
				if(!event) {
					delete this.data.pushDeleteEvents[p][i];
					continue;
				}
				if(event.type == 'push'){
					var item = player.getInventorySlot(event.slot);
					if(item.id == 0) return;
					var count = Math.min(event.count, item.count);
					var pushed = this.pushItem(item, count, true);
					if(pushed < count){
						player.setInventorySlot(event.slot, item.id, item.count - (count - pushed), item.data, item.extra);
					}
					if((_index = this.originalItemsMap().indexOf(getItemUid(item))) != -1)this.container.markSlotDirty(_index+'slot');
					this.items();
					this.refreshGui(false, false, item.count <= count || event.updateFull);
					delete this.data.pushDeleteEvents[p][i];
				}
				if(event.type == 'delete'){
					var item = this.container.getSlot(i);//event.item;
					var itemMaxStack = Item.getMaxStack(item.id);
					var this_item = searchItem(item.id, item.data, item.extra, false, true, p);
					var count = this_item && this_item.count < itemMaxStack ? Math.min(event.count, item.count, itemMaxStack - this_item.count) : Math.min(event.count, item.count/* , itemMaxStack*emptySlots.length */);
					if((res = this.deleteItem(item, count, true)) < count) {
						var _extra = (this_item ? this_item.extra : item.extra);
						player.addItemToInventory(item.id, count - res, item.data, _extra || null, true);
						this.items();
						this.refreshGui(false, false, item.count <= count || event.updateFull);
					}
					delete this.data.pushDeleteEvents[p][i];
				}
			}
			delete this.data.pushDeleteEvents[p];
		}
	},
	post_update_network: function () {
		this.data.controller_coords = searchController_net(this.data.NETWORK_ID);
		this.refreshGui(false, false, true);
	},
	post_setActive: function(){
		this.items();
		this.refreshGui(false, false, true, true);
	},
	controller_id: function () {
		if (this.data.NETWORK_ID == "f") return '0,0,0';
		return this.data.controller_coords.x + ',' + this.data.controller_coords.y + ',' + this.data.controller_coords.z;
	},
	pages: function () {
		if (this.container.getNetworkEntity().getClients().iterator().hasNext() && this.data.NETWORK_ID != "f") {
			return gridFuncs.getPages(this.originalItems().length)
		} else {
			return 1;
		}
	},
	items: function (forced) {
		if (!this.isWorkAllowed()) {
			return [];
		}
		var items = this.originalItems();
		var slotsKeys = Object.keys(this.container.slots);
		for(var i = 0; i < Math.max(slotsKeys.length, items.length); i++){
			var slot = this.container.getSlot(i+'slot');
			var slot2 = items[i] || {id:0, data:0, count:0, extra: null};
			if(forced || !compareSlots(slot, slot2)){
				this.container.setSlot(i+'slot', slot2.id, slot2.count, slot2.data, slot2.extra || null);
			}
		}
		this.container.sendChanges();
		return items;
	},
	originalItems: function(){
		if (!this.isWorkAllowed()) {
			return [];
		}
		return RSNetworks[this.data.NETWORK_ID].info.items;
	},
	originalItemsMap: function(){
		if (!this.isWorkAllowed()) {
			return [];
		}
		return RSNetworks[this.data.NETWORK_ID].info.items_map;
	},
	originalOnlyItemsMap: function(){
		if (!this.isWorkAllowed()) {
			return {};
		}
		return RSNetworks[this.data.NETWORK_ID].info.just_items_map;
	},
	originalOnlyItemsExtraMap: function(){
		if (!this.isWorkAllowed()) {
			return {};
		}
		return RSNetworks[this.data.NETWORK_ID].info.just_items_map_extra;
	},
	getDisksStorage: function(){
		if (!this.isWorkAllowed()) {
			return 0;
		}
		return RSNetworks[this.data.NETWORK_ID].info.storage;
	},
	getDisksStored: function(){
		if (!this.isWorkAllowed()) {
			return 0;
		}
		return RSNetworks[this.data.NETWORK_ID].info.stored;
	},
	pushItem: function (item, count, nonUpdate) {
		count = count || item.count;
		if (!this.isWorkAllowed()) return count;
		var res = RSNetworks[this.data.NETWORK_ID].info.pushItem(item, count, nonUpdate);
		if(this.post_pushItem)this.post_pushItem(item, count, res);
		return res;
	},
	deleteItem: function (item, count, nonUpdate) {
		count = count || item.count;
		if (!this.isWorkAllowed()) return count;
		var res = RSNetworks[this.data.NETWORK_ID].info.deleteItem(item, count, nonUpdate);
		if(this.post_deleteItem)this.post_deleteItem(item, count, res);
		return res;
	},
	post_destroy: function () {
		delete temp_data[this.coords_id()];
		for(var i in this.container.slots){
			this.container.clearSlot(i);
		}
	},
	refreshModel: function(){
		if(!this.networkEntity) return Logger.Log(Item.getName(this.blockInfo.id, this.blockInfo.data) + ' model on: ' + cts(this) + ' cannot be displayed');
		this.sendPacket("refreshModel", {block_data: this.data.block_data, isActive: this.data.isActive, coords: {x: this.x, y: this.y, z: this.z, dimension: this.dimension}});
	},
	refreshGui: function(first, client, updateFilters){
		var _data = {
			name: this.networkData.getName() + '', 
			isActive: this.data.isActive, 
			NETWORK_ID: this.data.NETWORK_ID,
			redstone_mode: this.data.redstone_mode,
			sort: this.data.sort,
			reverse_filter: this.data.reverse_filter,
			refresh: !first,
			updateFilters: first || updateFilters,
			disksStorage: this.getDisksStorage() + "",
			disksStored: this.getDisksStored(),
			isWorkAllowed: this.isWorkAllowed()
			//slotsLength: Object.keys(this.container.slots).length
		};
		if(client){
			this.container.sendEvent(client, "openGui", _data);
		} else {
			this.container.sendEvent("openGui", _data);
		}
	},
	getScreenByName: function(screenName) {
		if(screenName == 'main')return gridGUI;
	},
	client: {
		refreshModel: function(){
			if(Config.dev)Logger.Log('Local refreshing Grid model: block_data: ' + this.networkData.getInt('block_data') + ' ; isActive: ' + this.networkData.getBoolean('isActive'), 'RefinedStorageDebug');
			var render = new ICRender.Model();
			var model = BlockRenderer.createTexturedBlock(getGridTexture(this.networkData.getInt('block_data'), this.networkData.getBoolean('isActive')));
			render.addEntry(model);
			BlockRenderer.mapAtCoords(this.x, this.y, this.z, render);
		},
		tick: function(){
			if(this.networkData.getBoolean('update', false)){
				this.networkData.putBoolean('update', false);
				var pushDeleteEvents = {};
				var map = (asdgfasdasddsad = this.networkData.getString('deleteItemsMap', 'null')) != 'null' ? JSON.parse(asdgfasdasddsad) : [];
				for(var i in map){
					pushDeleteEvents[map[i]] = {
						type: 'delete',
						count: Number(this.networkData.getInt(map[i], 0)),
						updateFull: this.networkData.getBoolean('updateFull'+map[i], false)
					}
					this.networkData.putInt(map[i], 0);
				}
				this.networkData.putString('deleteItemsMap', 'null');
				var map = (asdgfasdasddsad = this.networkData.getString('pushItemsMap', 'null')) != 'null' ? JSON.parse(asdgfasdasddsad) : [];
				for(var i in map){
					pushDeleteEvents[map[i]] = {
						type: 'push',
						count: Number(this.networkData.getInt(map[i], 0)),
						slot: map[i],
						updateFull: this.networkData.getBoolean('updateFull'+map[i], false)
					}
					this.networkData.putInt(map[i], 0);
				}
				this.networkData.putString('pushItemsMap', 'null');
				this.sendPacket("pushDeleteEvents", {pushDeleteEvents: pushDeleteEvents})
			}
		},
		events: {
			refreshModel: function(eventData, packetExtra) {
				if(Config.dev)Logger.Log('Event refreshing Grid model: block_data: ' + this.networkData.getInt('block_data') + ' ; isActive: ' + this.networkData.getBoolean('isActive') + ' ; eventIsActive: ' + eventData.isActive, 'RefinedStorageDebug');
				var render = new ICRender.Model();
				var model = BlockRenderer.createTexturedBlock(getGridTexture(eventData.block_data, eventData.isActive));
				render.addEntry(model);
				BlockRenderer.mapAtCoords(eventData.coords.x, eventData.coords.y, eventData.coords.z, render);
			}
		},
		containerEvents: {
			openGui: function(container, window, content, eventData){
				if(!content || !window || !window.isOpened()) return;
				eventData.disksStorage = Number(eventData.disksStorage);
				Object.assign(gridData, eventData);
				gridData.updateGui = function(refresh, updateFilters, nonlocal){
					if(Config.dev)Logger.Log((nonlocal ? 'Server ' : 'Local ') + (refresh ? 'Updating' : 'Openning') + ' window: refresh:' + refresh + ' updateFilters:' + updateFilters + ' eventdata:' + JSON.stringify(eventData), 'RefinedStorageDebug');
					delete container.slots.bindings;
					delete container.slots.slots;
					gridData.networkData = SyncedNetworkData.getClientSyncedData(eventData.name);
					if(updateFilters){
						var _slotKeys = [];
						for(var i in container.slots)if(i[0] >= 0 && container.slots[i].id != 0)_slotKeys.push(i);
						gridData.slotsKeys = _slotKeys;
						if(!refresh)gridData.textSearch = false;
						var millis = 0;
						if(Config.dev)millis = java.lang.System.currentTimeMillis();
						gridData.slotsKeys = ScriptableObjectHelper.createArray(RSJava.sortItems(eventData.sort, eventData.reverse_filter, gridData.textSearch ? gridData.textSearch : null, container, gridData.slotsKeys));
						if(Config.dev)Logger.Log('Items array sorted on: ' + (java.lang.System.currentTimeMillis() - millis), "RefinedStorageDebug");
						if(gridData.selectedItemInfoSlot)gridData.setItemInfoSlot(gridData.selectedItemInfoSlot, container);
					}
					content.elements["image_filter"].bitmap = 'RS_filter' + (eventData.sort + 1);
					content.elements["image_filter"].x = content.elements["filter_button"].x + (content.elements["filter_button"].scale * 20 - filter_size_map[eventData.sort]) / 2;
					if (eventData.reverse_filter) {
						content.elements["image_reverse_filter"].bitmap = 'RS_arrow_up';
					} else {
						content.elements["image_reverse_filter"].bitmap = 'RS_arrow_down';
					}
					content.elements["search_text"].text = gridData.textSearch ? gridData.textSearch : Translation.translate('Search');
					content.elements["image_redstone"].bitmap = 'redstone_GUI_' + (eventData.redstone_mode || 0);
					var slots_count = content.elements.slots_count;
					content.elements["slider_button"].bitmap = gridData.slotsKeys.length <= gridData.slots_count ? 'slider_buttonOff' : 'slider_buttonOn';
					//if(refresh)window.getWindow('main').getElements().get("slider_button").setPosition(content.elements['slider_button'].x, gridFuncs.getCoordsFromPage(gridData.lastPage, gridFuncs.getPages(gridData.slotsKeys.length)));
					if (!eventData.isWorkAllowed) {
						for (var i = 0; i < slots_count; i++) {
							content.elements['slot' + i].bitmap = 'classic_darken_slot';
						}
						content.elements["slider_button"].bitmap = 'slider_buttonOff';
					} else if (content.elements['slot0'].bitmap == 'classic_darken_slot') {
						for (var i = 0; i < slots_count; i++) {
							content.elements['slot' + i].bitmap = 'classic_slot';
						}
					}
					gridSwitchPage(refresh ? gridData.lastPage : 1, container, true);
				}
				if(gridData.lowPriority){
					gridData.lowPriority = false;
					var craftsThread = java.lang.Thread({
						run: function(){
							try {
								gridData.updateGui(eventData.refresh, eventData.updateFilters, true);
							} catch(err){
								alert('Sorry, i broke :_(' + JSON.stringify(err));
							}
						}
					});
					craftsThread.setPriority(java.lang.Thread.MIN_PRIORITY);
					craftsThread.start();
				} else {
					gridData.updateGui(eventData.refresh, eventData.updateFilters, true);
				}
			}
		}
	},
	containerEvents: {
		updateFilter: function(eventData, connectedClient) {
			if(this.data.sort == undefined) this.data.sort = 0;
			this.data.sort = this.data.sort >= 2 ? 0 : this.data.sort + 1;
			this.refreshGui(false, false, true);
		},
		updateReverseFilter: function(eventData, connectedClient) {
			this.data.reverse_filter = !this.data.reverse_filter;
			this.refreshGui(false, false, true);
		}
	},
	events: {
		pushDeleteEvents: function(packetData, packetExtra, connectedClient) {
			this.data.pushDeleteEvents[connectedClient.getPlayerUid()] = packetData.pushDeleteEvents;
			if(Config.dev)Logger.Log('Getted pushDeleteEvents from: ' + connectedClient.getPlayerUid() + ' : ' + JSON.stringify(packetData.pushDeleteEvents), 'RefinedStorageDebug');
		}
	}
})




// file: blocks/crafting_grid.js

const _craftingGridTexture = [
	["disk_drive_bottom", 0], // bottom
	["grid_top", 0], // top
	["grid_back", 0], // back
	["crafting_grid_front", 0], // front
	["grid_left", 0], // left
	["grid_right", 0]  // right
];

function getCraftingGridTexture(variation, _active){
	variation = variation || 0;
	var i = _active ? 1 : 0;
	return [[_craftingGridTexture[0], [_craftingGridTexture[1][0], 0], _craftingGridTexture[2], [_craftingGridTexture[3][0], i], _craftingGridTexture[4], _craftingGridTexture[5]], [_craftingGridTexture[0], [_craftingGridTexture[1][0], 1], [_craftingGridTexture[3][0], i], _craftingGridTexture[2], _craftingGridTexture[5], _craftingGridTexture[4]], [_craftingGridTexture[0], [_craftingGridTexture[1][0], 2], _craftingGridTexture[5], _craftingGridTexture[4], _craftingGridTexture[2], [_craftingGridTexture[3][0], i]], [_craftingGridTexture[0], [_craftingGridTexture[1][0], 3], _craftingGridTexture[4], _craftingGridTexture[5], [_craftingGridTexture[3][0], i], _craftingGridTexture[2]]][variation];
}

IDRegistry.genBlockID("RS_crafting_grid");
Block.createBlockWithRotation("RS_crafting_grid", [
	{
		name: "Crafting Grid",
		texture: [
            ['stone', 0]
        ],
		inCreative: true
	}
])
mod_tip(BlockID['RS_crafting_grid']);
RS_blocks.push(BlockID['RS_crafting_grid']);
EnergyUse[BlockID['RS_crafting_grid']] = Config.energy_uses.craftingGrid;


var craftingGridData = Object.assign({}, gridData);
craftingGridData.lastCraftsPage = -1;
craftingGridData.darkenSlots = {};
craftingGridData.isCrafting = true;

var _elementsGUI_craftingGrid = {};

var _drawingGUI_craftingGrid = [];
var craftingGridGUI = new UI.StandartWindow({
	standart: {
		header: {
			text: {
				text: Translation.translate("Crafting Grid")
			}
		},
		inventory: {
			padding: 20,
			width: 300 / 4 * 3
		},
		background: {
			standart: true
		}
	},

	drawing: _drawingGUI_craftingGrid,

	elements: _elementsGUI_craftingGrid
});
GUIs.push(craftingGridGUI);

function craftingGridSwitchPage(page, container, ignore, dontMoveSlider){
	if(Config.dev)Logger.Log('Switch crafting grid Page; page: ' + page + ' ; ignore: ' + ignore + ' ; dontMoveSlider: ' + dontMoveSlider + ' ; container: ' + container + ' ; craftingGridData: '/*  + JSON.stringify(asd1, null, '\t') */, 'RefinedStorageDebug');
	if(!container.getUiAdapter() || !container.getUiAdapter().getWindow() || !container.getUiAdapter().getWindow().isOpened()) return false;
	var slots = container.slots;
	var slotsKeys = craftingGridData.slotsKeys;
	var slots_count = craftingGridData.slots_count;
	var x_count = craftingGridData.x_count;
	var pages1 = craftingGridFuncs.getPages(slotsKeys.length);
	var pages = Math.max(1, pages1 + 1 - craftingGridData.y_count);
	page = Math.max(1, Math.min(page, pages)) - 1;
	if(page == craftingGridData.lastPage - 1 && !ignore) return false;
	craftingGridData.lastPage = page + 1;
	if(!dontMoveSlider){
		var pages = craftingGridFuncs.getPages(slotsKeys.length);
		var ___y = craftingGridFuncs.getCoordsFromPage(page + 1, pages);
		container.getUiAdapter().getElement("slider_button").setPosition(_elementsGUI_craftingGrid['slider_button'].x, ___y);
	}
	if (!craftingGridData.isWorkAllowed) {
		for (var i = 0; i < slots_count; i++) {
			container.setSlot("slot" + i, 0, 0, 0, null);
			container.setText("slot" + i, "0");
		}
		return false;
	}
	var elements_ = container.getUiAdapter().getWindow().getWindow('main').getElements();
	for (var i = page * x_count; i < page * x_count + slots_count; i++) {
		var a = i - (page * x_count);
		var item = slots[slotsKeys[i]] || { id: 0, data: 0, count: 0, extra: null };
		container.markSlotDirty("slot" + a);
		elements_.get("slot" + a).setBinding('text', cutNumber(item.count, true) + "");
		//container.setText("slot" + a, cutNumber(item.count));
		container.setSlot("slot" + a, item.id, item.count, item.data, item.extra || null);
	}
	return true;
}

function craftingGridSwitchCraftsPage(page, container, ignore, dontMoveSlider){
	//var asd1 = Object.assign(craftingGridData);
	//delete asd1.networkData;
	if(Config.dev)Logger.Log('Switch Crafts Page; page: ' + page + ' ; ignore: ' + ignore + ' ; dontMoveSlider: ' + dontMoveSlider + ' ; container: ' + container + ' ; craftingGridData: '/*  + JSON.stringify(asd1, null, '\t') */, 'RefinedStorageDebug');
	if(!container.getUiAdapter() || !container.getUiAdapter().getWindow() || !container.getUiAdapter().getWindow().isOpened()) return false;
	var crafts = craftingGridData.crafts;
	var slots_count = craftingGridData.crafts_slots_count;
	var x_count = craftingGridData.crafts_x_count;
	var pages1 = craftingGridFuncs.craftsPages(crafts.length);
	var pages = Math.max(1, pages1 + 1 - craftingGridData.crafts_y_count);
	page = Math.max(1, Math.min(page, pages)) - 1;
	if(page == craftingGridData.lastCraftsPage - 1 && !ignore) return false;
	craftingGridData.lastCraftsPage = page + 1;
	var uiAdapter = container.getUiAdapter();
	if(!dontMoveSlider){
		var ___y = craftingGridFuncs.getCraftsCoordsFromPage(page + 1, pages1);
		uiAdapter.getElement("crafts_slider").setPosition(_elementsGUI_craftingGrid['crafts_slider'].x, ___y);
	}
	if (!craftingGridData.isWorkAllowed) {
		for (var i = 0; i < slots_count; i++) {
			container.setSlot("item_craft_slot" + i, 0, 0, 0, null);
		}
		return false;
	}
	var window = uiAdapter.getWindow();
	var content = window.getContent();
	var window1 = window.getWindow('main');
	var contentProvider = window1.getContentProvider();
	for (var i = 0; i < slots_count; i++) {
		var a = i + (page * x_count);
		var item = crafts[a] ? crafts[a].getResult() : { id: 0, data: 0, count: 0, extra: null };
		container.setSlot("item_craft_slot" + i, item.id, item.count, item.data > 0 ? item.data : 0, item.extra || null);
		if(crafts[a])content.elements["item_craft_slot" + i].darken = craftingGridData.isDarkenMap["e" + crafts[a].getRecipeUid()];//craftingGridFuncs.isDarkenSlot(crafts[a], craftingGridData.originalOnlyItemsMap, craftingGridData.originalItemsMap, a);
	}
	contentProvider.refreshElements();
	return true;
}

testButtons(craftingGridGUI.getWindow('header').getContent().elements, function(){
	grid_set_elements(360 + 109, 70, CgridConsPercents*(UI.getScreenHeight() - 60), 0, _elementsGUI_craftingGrid, craftingGridData, craftingGridGUI, craftingGridSwitchPage);
});

var CgridConsPercents = 49/(575.5 - 60);
grid_set_elements(360 + 109, 70, CgridConsPercents*(UI.getScreenHeight() - 60), 0, _elementsGUI_craftingGrid, craftingGridData, craftingGridGUI, craftingGridSwitchPage);

(function(){
	_elementsGUI_craftingGrid["reverse_filter_button"].y = _elementsGUI_craftingGrid["search_frame"].y;
	_elementsGUI_craftingGrid["reverse_filter_button"].x = 245 + ((_elementsGUI_craftingGrid["search_frame"].x - 245)/2 + _elementsGUI_craftingGrid["reverse_filter_button"].scale*10 + _elementsGUI_craftingGrid.settings_cons);
	_elementsGUI_craftingGrid["image_reverse_filter"].x = _elementsGUI_craftingGrid["reverse_filter_button"].x + (_elementsGUI_craftingGrid["reverse_filter_button"].scale * 20 - (_elementsGUI_craftingGrid["image_reverse_filter"].scale * 8)) / 2
	_elementsGUI_craftingGrid["image_reverse_filter"].y = _elementsGUI_craftingGrid["reverse_filter_button"].y + (_elementsGUI_craftingGrid["reverse_filter_button"].scale * 20 - (_elementsGUI_craftingGrid["image_reverse_filter"].scale * 10)) / 2
	_elementsGUI_craftingGrid["filter_button"].y = _elementsGUI_craftingGrid["reverse_filter_button"].y;
	_elementsGUI_craftingGrid["filter_button"].x = _elementsGUI_craftingGrid["reverse_filter_button"].x - _elementsGUI_craftingGrid["reverse_filter_button"].scale*20 - _elementsGUI_craftingGrid.settings_cons;
	_elementsGUI_craftingGrid["image_filter"].y = _elementsGUI_craftingGrid["filter_button"].y + (_elementsGUI_craftingGrid["filter_button"].scale * 20 - 24) / 2;
	_elementsGUI_craftingGrid["image_filter"].x = _elementsGUI_craftingGrid["filter_button"].x + (_elementsGUI_craftingGrid["filter_button"].scale * 20 - 24) / 2;
	_elementsGUI_craftingGrid["redstone_button"].y = _elementsGUI_craftingGrid["filter_button"].y;
	_elementsGUI_craftingGrid["redstone_button"].x = _elementsGUI_craftingGrid["filter_button"].x - _elementsGUI_craftingGrid["filter_button"].scale*20 - _elementsGUI_craftingGrid.settings_cons;
	_elementsGUI_craftingGrid["image_redstone"].y = _elementsGUI_craftingGrid["redstone_button"].y;
	_elementsGUI_craftingGrid["image_redstone"].x = _elementsGUI_craftingGrid["redstone_button"].x;

	var windowHeight = UI.getScreenHeight() - 60;
	var craftingPadding = 10;
	var craftingY = _elementsGUI_craftingGrid["redstone_button"].y + _elementsGUI_craftingGrid["redstone_button"].scale*20 + 10;
	var craftSlotsPercents = 37/(575.5 - 60);
	var craftSlotsSize = craftSlotsPercents*windowHeight;
	var craftResultPercents = (37+10)/37;
	var craftResultSize = craftResultPercents*craftSlotsSize;
	_elementsGUI_craftingGrid['craft_result'] = {
		type: "slot",
		x: _elementsGUI_craftingGrid["x_start"] - craftingPadding - 50 - 20,
		y: craftingY + craftSlotsSize*1.5 - craftResultSize/2,
		clicker: {
			onClick: function (itemContainerUiHandler, itemContainer, element) {
				if(!craftingGridData.selectedRecipe || !craftingGridData.selectedRecipe.craftable) return;
				craftingGridFuncs.provideCraft(craftingGridData.selectedRecipe.result.count);
			},
			onLongClick: function (itemContainerUiHandler, itemContainer, element) {
				if(!craftingGridData.selectedRecipe || !craftingGridData.selectedRecipe.craftable) return;
				var result = craftingGridData.selectedRecipe.result;
				var maxStack = Item.getMaxStack(result.id);
				craftingGridFuncs.provideCraft(maxStack);
			}
		},
		size: craftResultSize
	}

	_elementsGUI_craftingGrid['craft_cleaner'] = {
		type: "button",
		x: _elementsGUI_craftingGrid['craft_result'].x + _elementsGUI_craftingGrid['craft_result'].size/4,
		y: _elementsGUI_craftingGrid['craft_result'].y - 5 - _elementsGUI_craftingGrid['craft_result'].size/2,
		bitmap: 'RS_empty_button',
		bitmap2: 'RS_empty_button_pressed',
		clicker: {
			onClick: function (itemContainerUiHandler, itemContainer, element) {
				craftingGridData.selectedRecipe = null;
				itemContainer.setSlot('craft_result', 0, 0, 0);
				for(i = 0; i < 9; i++){
					itemContainer.setSlot('craft_slot' + i, 0, 0, 0);
					itemContainer.setSlot('WB_craft_slot' + i, 0, 0, 0);
				}
			},
			onLongClick: function (itemContainerUiHandler, itemContainer, element) {
			}
		},
		scale: _elementsGUI_craftingGrid['craft_result'].size/2/20
	}

	
	_elementsGUI_craftingGrid["image_craft_cleaner"] = {
		type: "image",
		x: _elementsGUI_craftingGrid["craft_cleaner"].x,
		y: _elementsGUI_craftingGrid["craft_cleaner"].y,
		z: 100,
		bitmap: "RS_close_button_icon",
		scale: _elementsGUI_craftingGrid['craft_cleaner'].scale,
	}

	var asd = 0;
	for(var y = 0; y < 3; y += 1){
		for(var x = 0; x < 3; x += 1){
			_elementsGUI_craftingGrid['craft_slot' + asd] = {
				id: 'craft_slot' + asd,
				type: "slot",
				x: 245 + craftingPadding + craftSlotsSize*x,
				y: craftingY + craftSlotsSize*y,
				clicker: {
					onClick: function (itemContainerUiHandler, itemContainer, element) {
						if(!this.parent) return;
						craftingGridData.setItemInfoSlot(this.parent, itemContainer);
					},
					onLongClick: function (itemContainerUiHandler, itemContainer, element) {
						
					}
				},
				size: craftSlotsSize
			}
			asd++;
		}
	}
	x = 245 + craftingPadding + craftSlotsSize*3;
	y = craftingY + craftSlotsSize*3;
	var craftSlotsEnd = y;

	var craftsSlotsXSettings = {
		count: 5,
		start: 245 + craftingPadding,
		end: _elementsGUI_craftingGrid['x_start'] - craftingPadding - 20
	}
	var craftsSlotsCons = (craftsSlotsXSettings.end - craftsSlotsXSettings.start)/craftsSlotsXSettings.count;
	var craftsSlotsYSettings = {
		start: craftSlotsEnd + 30,
		end: windowHeight - 20 - craftsSlotsCons
	}

	_elementsGUI_craftingGrid["search_frame_crafts"] = {
		type: "frame",
		x: craftsSlotsXSettings.start,
		y: craftSlotsEnd + 5,
		width: craftsSlotsXSettings.end - craftsSlotsXSettings.start,
		height: 20,
		bitmap: "search_bar",
		scale: 0.8,
		clicker: {
			onClick: function (itemContainerUiHandler, itemContainer, element) {
				UI.getContext().runOnUiThread(new java.lang.Runnable({// I take this from Recipe Viewer https://icmods.mineprogramming.org/mod?id=455 :D
					run: function () {
						try {
							var editText = new android.widget.EditText(UI.getContext());
							new android.app.AlertDialog.Builder(UI.getContext())
								.setTitle(Translation.translate("Please type the keywords"))
								.setView(editText)
								.setPositiveButton(Translation.translate("Search"), {
									onClick: function () {
										var keyword = editText.getText() + "";
										craftingGridData.craftsTextSearch = keyword.length ? keyword : false;
										itemContainerUiHandler.setBinding('search_text_crafts', 'text', keyword.length ? keyword : Translation.translate('Search'));
										craftingGridData.crafts = craftingGridFuncs.updateCrafts(craftingGridData.slotsKeys, craftingGridData.craftsTextSearch, craftingGridData.originalOnlyItemsMap, itemContainer.slots);
										craftingGridData.darkenSlots = {};
										craftingGridSwitchCraftsPage(1, itemContainer, true);
									}
								}).show();
						} catch (e) {
							alert(e);
						}
					}
				}));
			}
		}
	}

	_elementsGUI_craftingGrid["search_text_crafts"] = {
		type: "text",
		x: _elementsGUI_craftingGrid["search_frame_crafts"].x + 10,
		y: _elementsGUI_craftingGrid["search_frame_crafts"].y + 1,
		z: 100,
		text: Translation.translate('Search')/*'Search'*/,
		font: {
			color: android.graphics.Color.WHITE,
			shadow: 0.5,
			size: _elementsGUI_craftingGrid["search_frame_crafts"].height - 8
		}
	}
	
	var asdd = 0;
	for(var y = craftsSlotsYSettings.start; y < craftsSlotsYSettings.end; y += craftsSlotsCons){
		for(var x = craftsSlotsXSettings.start; x < craftsSlotsXSettings.end; x += craftsSlotsCons){
			_elementsGUI_craftingGrid['item_craft_slot' + asdd] = {
				type: "slot",
				num: asdd,
				x: x,
				y: y,
				clicker: {
					onClick: function (itemContainerUiHandler, itemContainer, element) {
						try{
						var craft_ident = this.num + ((craftingGridData.lastCraftsPage || 1) - 1) * _elementsGUI_craftingGrid['crafts_x_count'];
						var craft = craftingGridData.crafts[craft_ident];
						craftingGridFuncs.selectRecipe(craft, itemContainer, craftingGridData.originalOnlyItemsExtraMap, craftingGridData.originalOnlyItemsMap, craftingGridData.originalItemsMap);
						}catch(eer){alert(JSON.stringify(eer))};
					},
					onLongClick: function (itemContainerUiHandler, itemContainer, element) {
						
					}
				},
				size: craftsSlotsCons
			}
			asdd++;
		}
	}
	craftingGridData.crafts_slots_count = _elementsGUI_craftingGrid['crafts_slots_count'] = asdd;
	craftingGridData.crafts_x_count = _elementsGUI_craftingGrid['crafts_x_count'] = Math.ceil((craftsSlotsXSettings.end - craftsSlotsXSettings.start)/craftsSlotsCons);
	craftingGridData.crafts_y_count = _elementsGUI_craftingGrid['crafts_y_count'] = Math.ceil((craftsSlotsYSettings.end - craftsSlotsYSettings.start)/craftsSlotsCons);
	
	craftingGridData.crafts_x_start = _elementsGUI_craftingGrid['crafts_x_start'] = craftsSlotsXSettings.start;
	craftingGridData.crafts_y_start = _elementsGUI_craftingGrid['crafts_y_start'] = craftsSlotsYSettings.start;
	craftingGridData.crafts_x_end = _elementsGUI_craftingGrid['crafts_x_end'] = craftsSlotsXSettings.end;
	craftingGridData.crafts_y_end = _elementsGUI_craftingGrid['crafts_y_end'] = y - 1;

	_drawingGUI_craftingGrid.push({
		type: "line", 
		x1: craftsSlotsXSettings.end + 30/2, 
		y1: craftsSlotsYSettings.start, 
		x2: craftsSlotsXSettings.end + 30/2, 
		y2: y - 1, 
		width: 3, 
		color: android.graphics.Color.BLACK
	})

	var moving = false;
	var max_y = 0;
	var swipe_y;
	var swipe_sum = 0;

	_elementsGUI_craftingGrid.clickFrameTouchEvents.push(function (element, event) {
		var content = {elements:_elementsGUI_craftingGrid};/* element.window.getContent(); *///getContainer().getGuiContent();
		var itemContainerUiHandler = element.window.getContainer();
		var itemContainer = itemContainerUiHandler.getParent();
		if (event.type == "DOWN" && !swipe_y && event.x > _elementsGUI_craftingGrid["crafts_x_start"] && event.x < _elementsGUI_craftingGrid["crafts_x_end"] && event.y > _elementsGUI_craftingGrid["crafts_y_start"] && event.y < _elementsGUI_craftingGrid["crafts_y_end"]) {
			swipe_y = event.y;
		} else if (swipe_y && event.type == "MOVE") {
			var distance = Math.abs(event.y - swipe_y);
			function moveSwitchPage_(_n){
				_n = (_n ? 1 : -1);
				craftingGridSwitchCraftsPage(craftingGridData.lastCraftsPage + _n, itemContainer);
			}
			if (distance > 7) {
				if (event.y > swipe_y) moveSwitchPage_(false);
				if (event.y < swipe_y) moveSwitchPage_(true);
				swipe_sum = 0;
			} else {
				swipe_sum += distance;
				if (swipe_sum > 15) {
					if (event.y > swipe_y) moveSwitchPage_(false);
					if (event.y < swipe_y) moveSwitchPage_(true);
					swipe_sum = 0;
				}
			}
			swipe_y = event.y;
		} else if (swipe_y && (event.type == "UP" || event.type == "CLICK")) {
			swipe_y = false;
		}
		if (!moving) return;
		event.y -= content.elements["crafts_slider"].scale * 15 / 2;
		if (event.type != 'UP' && event.type != "CLICK") {
			var page = craftingGridFuncs.getCraftsPageFromCoords(event, craftingGridFuncs.craftsPages(craftingGridData.crafts.length));
			itemContainerUiHandler.getElement("crafts_slider").setPosition(content.elements['crafts_slider'].x, Math.max(Math.min(event.y, max_y), content.elements["crafts_slider"].start_y));
			craftingGridSwitchCraftsPage(page, itemContainer, false, true);
		}
		if (event.type == "UP" || event.type == "CLICK") {
			moving = false;
			var pages = craftingGridFuncs.craftsPages(craftingGridData.crafts.length);
			var page = craftingGridFuncs.getCraftsPageFromCoords(event, pages);
			craftingGridSwitchCraftsPage(page, itemContainer);
			var ___y = craftingGridFuncs.getCraftsCoordsFromPage(page, pages);
			itemContainerUiHandler.getElement("crafts_slider").setPosition(_elementsGUI_craftingGrid['crafts_slider'].x, ___y);
		}
	})

	_elementsGUI_craftingGrid["crafts_slider"] = {
		type: "button",
		start_y: craftsSlotsYSettings.start,
		x: craftsSlotsXSettings.end + 30/2,
		y: craftsSlotsYSettings.start,
		z: 1,
		scale: 2,
		bitmap: 'craftsSlider',
		bitmap2: 'craftsSliderOn'
	}

	_elementsGUI_craftingGrid["crafts_slider_frame"] = {
		type: "frame",
		x: craftsSlotsXSettings.end,
		y: craftsSlotsYSettings.start - 10,
		width: 30,
		height: y - 1 - craftsSlotsYSettings.start + 20,
		z: -1,
		bitmap: 'empty1',
		onTouchEvent: function (element, event) {
			if (event.type == 'DOWN') {
				moving = true;
			}
			if (event.type == 'CLICK') {
				var itemContainerUiHandler = element.window.getContainer();
				var itemContainer = itemContainerUiHandler.getParent();
				var pages = craftingGridFuncs.craftsPages(craftingGridData.crafts.length);
				var page = craftingGridFuncs.getCraftsPageFromCoords(event, pages);
				craftingGridSwitchCraftsPage(page, itemContainer);
			}
		}
	}

	_elementsGUI_craftingGrid["crafts_slider"].x -= _elementsGUI_craftingGrid["crafts_slider"].scale*10/2;
	max_y = y - 1 - _elementsGUI_craftingGrid["crafts_slider"].scale*15;
	_elementsGUI_craftingGrid.crafts_max_y = max_y;
})();

var craftsInv_elements = craftingGridGUI.getWindow('inventory').getContent();
craftsInv_elements.elements["_CLICKFRAME_"] = {
	type: "frame",
	x: 0,
	y: 0,
	z: -100,
	width: 1000,
	height: 251*9,
	bitmap: "empty",
	scale: 1,
	onTouchEvent: function(element, event){
		if(event.type == 'CLICK' || event.type == 'LONG_CLICK'){
			if (!craftingGridData.isWorkAllowed) return;
			var itemContainerUiHandler = element.window.getContainer();
			var itemContainer = itemContainerUiHandler.getParent();
			var slot_id = Math.floor(event.x/251)+Math.floor(event.y/250)*4;
			var updateFull = false;
			var item = Player.getInventorySlot(slot_id);
			if(item.id == 0)return;
			//alert(JSON.stringify(item));
			if(craftingGridData.disksStored >= craftingGridData.disksStorage) return
			if(event.type == 'CLICK'){
				var count = 1;
			} else {
				var count = Math.min(Item.getMaxStack(item.id), craftingGridData.disksStorage - craftingGridData.disksStored, item.count);
			}
			if(Config.dev)Logger.Log('Grid local pushing item: ' + getItemUid(item) + ' ; count: ' + count + ' ; slot: ' + slot_id + " ; extra: " + fullExtraToString(item.extra), 'RefinedStorageDebug');
			var slotFounded = false;
			for(var i in craftingGridData.slotsKeys){
				var _slotName = craftingGridData.slotsKeys[i];
				var _slot = itemContainer.slots[_slotName];
				//if(Config.dev)Logger.Log('Checking item: ' + _slotName + " ; UID: " + getItemUid(_slot) + " ; extra: " + fullExtraToString(_slot.extra), 'RefinedStorageDebug');
				if(_slot && (_slot.id == 0 || (_slot.id == item.id && _slot.data == item.data && (item.extra == _slot.extra || (item.extra && _slot.extra && fullExtraToString(item.extra) == fullExtraToString(_slot.extra)))))){
					item.extra = _slot.extra;
					if(Config.dev)Logger.Log('Founded slot: ' + _slotName + ' : ' + JSON.stringify(_slot.asScriptable()), 'RefinedStorageDebug');
					slotFounded = true;
					itemContainer.setSlot(_slotName, item.id, _slot.count + count, item.data, item.extra || null);
					craftingGridData.setItemInfoSlot(_slotName, itemContainer);
					if(craftingGridData.sort == 0) updateFull = true;
					craftingGridData.updateGui(true, updateFull);
					craftingGridData.lowPriority = true;
					break
				}
			}
			if(!slotFounded){
				var _slotName = craftingGridData.slotsKeys.length + 'slot';
				if(Config.dev)Logger.Log('Slot not founded, new slot name: ' + _slotName, 'RefinedStorageDebug');
				craftingGridData.slotsKeys.push(_slotName);
				itemContainer.setSlot(_slotName, item.id, count, item.data, item.extra || null);
				craftingGridData.setItemInfoSlot(_slotName, itemContainer);
				updateFull = true;
				craftingGridData.updateGui(true, updateFull);
				craftingGridData.lowPriority = true;
			}
			var map = (asdgfasdasddsad = craftingGridData.networkData.getString('pushItemsMap', 'null')) != 'null' ? JSON.parse(asdgfasdasddsad) : [];
			if(map.indexOf(slot_id) == -1){
				map.push(slot_id);
				craftingGridData.networkData.putString('pushItemsMap', JSON.stringify(map));
			}
			var currentCount = craftingGridData.networkData.getInt(slot_id, 0);
			craftingGridData.networkData.putInt(slot_id, currentCount + count);
			craftingGridData.networkData.putBoolean('update', true);
			craftingGridData.networkData.putBoolean('updateFull'+slot_id, updateFull);
		}
	}
};
craftingGridGUI.getWindow('main').forceRefresh();

for (var izxc = 0; izxc < 4; izxc++) {
	var render = new ICRender.Model();
	var model = BlockRenderer.createTexturedBlock(getCraftingGridTexture(izxc));
	render.addEntry(model);
	BlockRenderer.enableCoordMapping(BlockID["RS_crafting_grid"], izxc, render);
}

var craftingGridFuncs = {
	getPages: function(_length){
		if(_length == 0) return 1;
		_length = Math.ceil(_length / _elementsGUI_craftingGrid["x_count"]);
		return _length;
	},
	getPageFromCoords: function(_coords, pages){
		pages -= _elementsGUI_craftingGrid['y_count'] - 1;
		var interval = (pages - 1) > 0 ? (_elementsGUI_craftingGrid["max_y"] - _elementsGUI_craftingGrid["slider_button"].start_y) / (pages - 1) : 0;
		function __getY(i) {
			return ((interval * i) + _elementsGUI_craftingGrid["slider_button"].start_y);
		}
		var least_dec = 10001;
		var finish_i = 0;
		for (var i = 0; i < pages; i++) {
			var dec = Math.abs(Math.round(_coords.y - __getY(i)));
			if (dec < least_dec) {
				least_dec = dec;
				finish_i = i;
			}
		};
		var page = finish_i;
		return page + 1;
	},
	getCoordsFromPage: function(page, pages){
		pages -= _elementsGUI_craftingGrid['y_count'] - 1;
		var interval = (pages - 1) > 0 ? (_elementsGUI_craftingGrid["max_y"] - _elementsGUI_craftingGrid["slider_button"].start_y) / (pages - 1) : 0;
		function __getY(i) {
			return ((interval * i) + _elementsGUI_craftingGrid["slider_button"].start_y);
		}
		if (page > pages) page = pages;
		if (page < 1) page = 1;
		return __getY(page - 1);
	},
	craftsPages: function(_length){
		if(_length == 0) return 1;
		_length = Math.ceil(_length / _elementsGUI_craftingGrid["crafts_x_count"]);
		return _length;
	},
	getCraftsPageFromCoords: function(_coords, pages){
		pages -= _elementsGUI_craftingGrid['crafts_y_count'] - 1;
		var interval = (pages - 1) > 0 ? (_elementsGUI_craftingGrid["crafts_max_y"] - _elementsGUI_craftingGrid["crafts_slider"].start_y) / (pages - 1) : 0;
		if(Config.dev)Logger.Log('interval: ' + interval + ' ; pages: ' + pages + ' ; _coords_y: ' + _coords.y + ' ; crafts_slider_start_y: ' + _elementsGUI_craftingGrid["crafts_slider"].start_y + ' ; crafts_max_y: ' + _elementsGUI_craftingGrid["crafts_max_y"] + ' ; crafts_x_count: ' + _elementsGUI_craftingGrid["crafts_x_count"], 'RefinedStorageDebug');
		function __getY(i) {
			return ((interval * i) + _elementsGUI_craftingGrid["crafts_slider"].start_y);
		}
		var least_dec = 10001;
		var finish_i = 0;
		for (var i = 0; i < pages; i++) {
			var dec = Math.abs(Math.round(_coords.y - __getY(i)));
			if (dec < least_dec) {
				least_dec = dec;
				finish_i = i;
			}
		};
		var page = finish_i;
		return page + 1;
	},
	getCraftsCoordsFromPage: function(page, pages){
		pages -= _elementsGUI_craftingGrid['crafts_y_count'] - 1;
		var interval = (pages - 1) > 0 ? (_elementsGUI_craftingGrid["crafts_max_y"] - _elementsGUI_craftingGrid["crafts_slider"].start_y) / (pages - 1) : 0;
		if(Config.dev)Logger.Log('interval: ' + interval + ' ; pages: ' + pages + ' ; page: ' + page + ' ; crafts_slider_start_y: ' + _elementsGUI_craftingGrid["crafts_slider"].start_y + ' ; crafts_max_y: ' + _elementsGUI_craftingGrid["crafts_max_y"] + ' ; crafts_x_count: ' + _elementsGUI_craftingGrid["crafts_x_count"], 'RefinedStorageDebug');
		function __getY(i) {
			return ((interval * i) + _elementsGUI_craftingGrid["crafts_slider"].start_y);
		}
		if (page > pages) page = pages;
		if (page < 1) page = 1;
		return __getY(page - 1);
	},
	sort: function (type, reverse, slots) {
		if (reverse) {
			if (type == 2) {
				return function (a, b) { 
					return slots[b].id - slots[a].id 
				};
			} else if (type == 0) {
				return function (a, b) {
					var slot1 = slots[a], slot2 = slots[b];
					return slot1.count == 0 || slot2.count == 0 ? slot2.count - slot1.count : slot1.count - slot2.count;
				};
			} else if (type == 1) {
				return function (a, b) {
					var slot1 = slots[a], slot2 = slots[b];
					if(slot1.id == 0 || slot2.id == 0) return slot2.id - slot1.id;
					var name1 = getItemName(slot1.id, slot1.data, slot1.extra);
					var name2 = getItemName(slot2.id, slot2.data, slot2.extra);
					if (name1 > name2) {
						return 1;
					}
					if (name1 < name2) {
						return -1;
					}
					return 0;
				};
			}
		} else {
			if (type == 2) {
				return function (a, b) {
					var slot1 = slots[a], slot2 = slots[b];
					return slot1.id == 0 || slot2.id == 0 ? slot2.id - slot1.id : slot1.id - slot2.id 
				};
			} else if (type == 0) {
				return function (a, b) { 
					return slots[b].count - slots[a].count 
				};
			} else if (type == 1) {
				return function (a, b) {
					var slot1 = slots[a], slot2 = slots[b];
					if(slot1.id == 0 || slot2.id == 0) return slot2.id - slot1.id;
					var name1 = getItemName(slot1.id, slot1.data, slot1.extra);
					var name2 = getItemName(slot2.id, slot2.data, slot2.extra);
					if (name2 > name1) {
						return 1;
					}
					if (name2 < name1) {
						return -1;
					}
					return 0;
				};
			}
		}
	},
	isDarkenSlot: function(javaRecipe, originalOnlyItemsMap, originalItemsMap, slot){
		if(!javaRecipe) return true;
		if(slot && craftingGridData.darkenSlots[slot] != null) return craftingGridData.darkenSlots[slot];
		var values = javaRecipe.getEntryCollection().iterator();
        while (values.hasNext()) {
			item = values.next();
			if(item.data == -1 ? !originalOnlyItemsMap[item.id] : originalItemsMap.indexOf(getItemUid(item)) == -1) {
				if(slot) craftingGridData.darkenSlots[slot] = true;
				return true;
			}
		}
		if(slot) craftingGridData.darkenSlots[slot] = false;
		return false;
	},
	updateCrafts: function(items, craftsTextSearch, onlyItemsMap, _object){
		var millis = java.lang.System.currentTimeMillis();
		var inventoryItems = searchItem(-1, -1, true);
		var inventoryOnlyItemsMap = {};
		for(var i in inventoryItems){
			if(inventoryOnlyItemsMap[inventoryItems[i].id])
				inventoryOnlyItemsMap[inventoryItems[i].id].push(inventoryItems[i].data);
			else
				inventoryOnlyItemsMap[inventoryItems[i].id] = [inventoryItems[i].data];
		}
		var sorted = ScriptableObjectHelper.createArray(RSJava.sortCrafts(items, craftsTextSearch ? craftsTextSearch : null, Object.assign(inventoryOnlyItemsMap, onlyItemsMap), _object, inventoryItems, craftingGridData.isDarkenMap));
		if(Config.dev)Logger.Log('Crafts array sorted on: ' + (java.lang.System.currentTimeMillis() - millis), "RefinedStorageDebug");
		return sorted;
	},
	selectRecipe: function(javaRecipe, container, originalOnlyItemsExtraMap, originalOnlyItemsMap, originalItemsMap){
		if (!javaRecipe) return false;
		var result_item = javaRecipe.getResult();
		if(!result_item) return false;
		container.setSlot('craft_result', result_item.id, result_item.count, result_item.data, result_item.extra || null);
		var items = javaRecipe.getSortedEntries();
		if(!items) return false;
		var smallItemsMap = {};
		var fixedItemsMap = {};
		var craftable = true;
		for(i = 0; i < 9; i++){
			if(!items[i] || !items[i].id){
				container.setSlot('craft_slot' + i, 0, 0, 0);
				_elementsGUI_craftingGrid['craft_slot' + i].parent = null;
				continue;
			};
			var item = items[i];
			itemData = item.data != -1 ? item.data : ((originalItem = originalOnlyItemsMap[item.id]) ? originalItem[0] : 0);
			var itemUid = item.id+'_'+itemData;
			var itemExtra = (itemExtraExist = originalOnlyItemsExtraMap[itemUid]) ? itemExtraExist[0] : null;
			if(itemExtra) itemUid += '_' + itemExtra.getValue();
			if(smallItemsMap[itemUid])
				smallItemsMap[itemUid]++;
			else
				smallItemsMap[itemUid] = 1;
			var itemCount = ((itemI = originalItemsMap.indexOf(itemUid)) != -1 && container.getSlot(craftingGridData.slotsKeys[itemI]).count >= smallItemsMap[itemUid]) ? 1 : 0;
			if(!itemCount) {
				var playerItem = searchItem(item.id, itemData, itemExtra);
				if(playerItem && playerItem.count >= smallItemsMap[itemUid] - (itemI != -1 ? container.getSlot(craftingGridData.slotsKeys[itemI]).count : 0)){
					itemExtra = playerItem.extra;
					itemCount = 1;
				} else {
					craftable = false;
				}
			}
			if(itemCount){
				if(fixedItemsMap[itemUid])
					fixedItemsMap[itemUid]++;
				else
					fixedItemsMap[itemUid] = 1;
			}
			container.setSlot('craft_slot' + i, item.id, itemCount, itemData, itemExtra);
			_elementsGUI_craftingGrid['craft_slot' + i].parent = craftingGridData.slotsKeys[itemI];
		}
		craftingGridData.selectedRecipe = {
			result: result_item,
			//items: smallItemsMap,
			//fixedItems: fixedItemsMap,
			javaRecipe: javaRecipe,
			craftable: craftable,
			//craftSlotsItems: craftSlotsItems,
			uid: javaRecipe.getRecipeUid()
		}
		//container.sendEvent('selectRecipe', {uid: javaRecipe.getRecipeUid()});
		return true;
	},
	provideCraft: function(count){
		if(!craftingGridData.selectedRecipe) return false;
		var _data = Object.assign({}, craftingGridData.selectedRecipe);
		_data.count = count;
		delete _data.javaRecipe;
		delete _data.result;
		craftingGridData.container.sendEvent('provideCraft', _data);
		return true;
	}
}

RefinedStorage.copy(BlockID.RS_grid, BlockID.RS_crafting_grid, {
	blockInfo: {
		id: BlockID.RS_crafting_grid
	},
	click: function (id, count, data, coords, player, extra) {
		if(Entity.getSneaking(player)) return false;
		var client = Network.getClientForPlayer(player);
		if (!client || this.container.getNetworkEntity().getClients().contains(client)) return true;
		this.items();
		this.container.openFor(client, "main");
		if(InnerCore_pack.packVersionCode < 119)this.refreshGui(true, client); 
		return true;
	},
	refreshModel: function(){
		if(!this.networkEntity) return Logger.Log(Item.getName(this.blockInfo.id, this.blockInfo.data) + ' model on: ' + cts(this) + ' cannot be displayed');
		this.sendPacket("refreshModel", {block_data: this.data.block_data, isActive: this.data.isActive, coords: {x: this.x, y: this.y, z: this.z, dimension: this.dimension}});
	},
	provideCraft: function(player){
		if(!this.isWorkAllowed() || !this.data.selectedRecipe || !this.data.selectedRecipe.craftable) return false;
		if(Config.dev)Logger.Log('Providing craft: result: ' + JSON.stringify(this.data.selectedRecipe.result), 'RefinedStorageDebug');
		var netFuncs = RSNetworks[this.data.NETWORK_ID].info;
		var selectedRecipe = this.data.selectedRecipe;
		var javaRecipe = selectedRecipe.javaRecipe;
		var items = javaRecipe.getSortedEntries();
		var smallItemsMap = {};
		for(i = 0; i < 9; i++){
			if(!items[i] || !items[i].id) {
				this.container.setSlot('WB_craft_slot' + i, 0,0,0);
				continue;
			}
			var item = items[i];
			itemData = item.data != -1 ? item.data : ((originalItem = this.originalOnlyItemsMap()[item.id]) ? originalItem[0] : 0);
			var itemUid = item.id+'_'+itemData;
			var itemExtra = (itemExtraExist = this.originalOnlyItemsExtraMap()[itemUid]) ? itemExtraExist[0] : null;
			if(itemExtra) {
				itemUid += '_' + itemExtra.getValue();
			}
			if(smallItemsMap[itemUid])
				smallItemsMap[itemUid].count++;
			else
				smallItemsMap[itemUid] = {id: item.id, count: 1, data: itemData, extra: itemExtra};
			this.container.setSlot('WB_craft_slot' + i, item.id, 1, itemData, itemExtra);
		}
		var playerSlots = {};
		for(var i in smallItemsMap){
			if(!netFuncs.itemCanBeDeleted(smallItemsMap[i]) && (!(playerSlots[i] = searchItem(smallItemsMap[i].id, smallItemsMap[i].data, smallItemsMap[i].extra, false, false, player)) || playerSlots[i].count < smallItemsMap[i].count)) return false;
		}
		var result = javaRecipe.provideRecipeForPlayer(this.container, player);
		if(!result) return false;
		if(result.data == -1)result.data = 0;
		var fixedEntries = this.container.asScriptableField();
		var __PlayerActor = new PlayerActor(player);
		for(var i in smallItemsMap){
			var ndeleted = netFuncs.deleteItem(smallItemsMap[i], smallItemsMap[i].count, true);
			if(ndeleted > 0 && (playerSlotData = playerSlots[i])){
				__PlayerActor.setInventorySlot(playerSlotData.slot, playerSlotData.id, playerSlotData.count - ndeleted, playerSlotData.data, playerSlotData.extra);
			}
		};
		var cbkUsedFunc = function(){
			for(var i = 0; i < 9; i++){
				var slot_ = fixedEntries[i];
				if(slot_.count != 0){
					var answ = this.pushItem(slot_, slot_.count, true);
					if(answ != 0){
						__PlayerActor.addItemToInventory(slot_.id, answ, slot_.data, null, true);
					}
				}
			}
		};
		cbkUsedFunc.apply(this);
		Callback.invokeCallback("VanillaWorkbenchCraft", result, this.container);
		__PlayerActor.addItemToInventory(result.id, result.count, result.data, result.extra || null, true);
		Callback.invokeCallback("VanillaWorkbenchPostCraft", result, this.container);
		return true;
	},
	tick: function () {
		/* if(this.data.firstOpen && this.data.firstOpen == World.getThreadTime()){
			for(var i in this.data.firstOpenClients){
				this.refreshGui(true, this.data.firstOpenClients[i]);
			}
			this.data.firstOpenClients = [];
			this.data.firstOpen = false;
		} */
		if (this.container.getNetworkEntity().getClients().iterator().hasNext()) {
			if(this.data.refreshCurPage){
				this.items();
				this.refreshGui(false, false, this.data.fullRefreshPage, this.data.fullRefreshPage);
				this.data.refreshCurPage = false;
				this.data.fullRefreshPage = false;
			}
		}
		for(var p in this.data.pushDeleteEvents){
			var player = new PlayerActor(Number(p));
			for(var i in this.data.pushDeleteEvents[p]){
				var event = this.data.pushDeleteEvents[p][i];
				if(!event) {
					delete this.data.pushDeleteEvents[p][i];
					continue;
				}
				if(event.type == 'push'){
					var item = player.getInventorySlot(event.slot);
					if(item.id == 0) return;
					var count = Math.min(event.count, item.count);
					var pushed = this.pushItem(item, count, true);
					if(pushed < count){
						player.setInventorySlot(event.slot, item.id, item.count - (count - pushed), item.data, item.extra);
					}
					if((_index = this.originalItemsMap().indexOf(getItemUid(item))) != -1)this.container.markSlotDirty(_index+'slot');
					this.items();
					this.refreshGui(false, false, item.count <= count || event.updateFull);
					delete this.data.pushDeleteEvents[p][i];
				}
				if(event.type == 'delete'){
					var item = this.container.getSlot(i);//event.item;
					var itemMaxStack = Item.getMaxStack(item.id);
					var this_item = searchItem(item.id, item.data, item.extra, false, true, p);
					var count = this_item && this_item.count < itemMaxStack ? Math.min(event.count, item.count, itemMaxStack - this_item.count) : Math.min(event.count, item.count/* , itemMaxStack*emptySlots.length */);
					if((res = this.deleteItem(item, count, true)) < count) {
						var _extra = (this_item ? this_item.extra : item.extra);
						player.addItemToInventory(item.id, count - res, item.data, _extra || null, true);
						this.items();
						this.refreshGui(false, false, item.count <= count || event.updateFull);
					}
					delete this.data.pushDeleteEvents[p][i];
				}
			}
			delete this.data.pushDeleteEvents[p];
		}
	},
	post_init: function () {
		this.container.setWorkbenchFieldPrefix('WB_craft_slot');
		this.data.pushDeleteEvents = {};
	},
	refreshGui: function(first, client, updateFilters, updateCrafts){
		var _data = {
			name: this.networkData.getName() + '', 
			isActive: this.data.isActive, 
			NETWORK_ID: this.data.NETWORK_ID,
			redstone_mode: this.data.redstone_mode,
			sort: this.data.sort,
			reverse_filter: this.data.reverse_filter,
			refresh: !first,
			updateFilters: first || updateFilters,
			updateCrafts: first || updateCrafts,
			disksStorage: this.getDisksStorage() + "",
			disksStored: this.getDisksStored(),
			isWorkAllowed: this.isWorkAllowed(),
			craftsTextSearch: this.data.craftsTextSearch,
			first: first
			//slotsLength: Object.keys(this.container.slots).length
		};
		if(client){
			this.container.sendEvent(client, "openGui", _data);
		} else {
			this.container.sendEvent("openGui", _data);
		}
	},
	getScreenByName: function(screenName) {
		if(screenName == 'main')return craftingGridGUI;
	},
	client: {
		refreshModel: function(){
			if(Config.dev)Logger.Log('Local refreshing CraftingGrid model: block_data: ' + this.networkData.getInt('block_data') + ' ; isActive: ' + this.networkData.getBoolean('isActive'), 'RefinedStorageDebug');
			var render = new ICRender.Model();
			var model = BlockRenderer.createTexturedBlock(getCraftingGridTexture(this.networkData.getInt('block_data'), this.networkData.getBoolean('isActive')));
			render.addEntry(model);
			BlockRenderer.mapAtCoords(this.x, this.y, this.z, render);
		},
		ticks: 0,
		tick: function(){
			this.ticks++;
			if(this.networkData.getBoolean('update', false)){
				this.updateCrafts = true;
				this.networkData.putBoolean('update', false);
				var pushDeleteEvents = {};
				var map = (asdgfasdasddsad = this.networkData.getString('deleteItemsMap', 'null')) != 'null' ? JSON.parse(asdgfasdasddsad) : [];
				for(var i in map){
					pushDeleteEvents[map[i]] = {
						type: 'delete',
						count: Number(this.networkData.getInt(map[i], 0)),
						updateFull: this.networkData.getBoolean('updateFull'+map[i], false)
					}
					this.networkData.putInt(map[i], 0);
				}
				this.networkData.putString('deleteItemsMap', 'null');
				var map = (asdgfasdasddsad = this.networkData.getString('pushItemsMap', 'null')) != 'null' ? JSON.parse(asdgfasdasddsad) : [];
				for(var i in map){
					pushDeleteEvents[map[i]] = {
						type: 'push',
						count: Number(this.networkData.getInt(map[i], 0)),
						slot: map[i],
						updateFull: this.networkData.getBoolean('updateFull'+map[i], false)
					}
					this.networkData.putInt(map[i], 0);
				}
				this.networkData.putString('pushItemsMap', 'null');
				this.sendPacket("pushDeleteEvents", {pushDeleteEvents: pushDeleteEvents})
			}
			if(this.updateCrafts && this.ticks%20 == 0){
				this.updateCrafts = false;
				craftingGridData.updateGui(true, false, true);
			}
		},
		events: {
			refreshModel: function(eventData, packetExtra) {
				if(Config.dev)Logger.Log('Event refreshing CraftingGrid model: block_data: ' + this.networkData.getInt('block_data') + ' ; isActive: ' + this.networkData.getBoolean('isActive') + ' ; eventIsActive: ' + eventData.isActive, 'RefinedStorageDebug');
				var render = new ICRender.Model();
				var model = BlockRenderer.createTexturedBlock(getCraftingGridTexture(eventData.block_data, eventData.isActive));
				render.addEntry(model);
				BlockRenderer.mapAtCoords(eventData.coords.x, eventData.coords.y, eventData.coords.z, render);
			}
		},
		containerEvents: {
			reselectRecipe: function(container, window, content, eventData){
				craftingGridFuncs.selectRecipe(craftingGridData.selectedRecipe.javaRecipe, container, craftingGridData.originalOnlyItemsExtraMap, craftingGridData.originalOnlyItemsMap, craftingGridData.originalItemsMap);
			},
			openGui: function(container, window, content, eventData){
				if(!content || !window || !window.isOpened()) return;
				eventData.disksStorage = Number(eventData.disksStorage);
				Object.assign(craftingGridData, eventData);
				craftingGridData.container = container;
				craftingGridData.updateGui = function(refresh, updateFilters, updateCrafts, nonlocal){
					if(!content || !window || !window.isOpened()) return;
					if(Config.dev)Logger.Log((nonlocal ? 'Server ' : 'Local ') + (refresh ? 'Updating' : 'Openning') + ' window: refresh:' + refresh + ' updateFilters:' + updateFilters + ' updateCrafts:' + updateCrafts + ' eventdata:' + JSON.stringify(eventData), 'RefinedStorageDebug');
					delete container.slots.bindings;
					delete container.slots.slots;
					craftingGridData.networkData = SyncedNetworkData.getClientSyncedData(eventData.name);
					var _slotKeys = [];
					if(updateFilters){
						var originalOnlyItemsExtraMap = {};
						var originalOnlyItemsMap = {};
						//var originalItemsMap = [];
						for(var i in container.slots)if(i[0] >= 0 && container.slots[i].id != 0){
							_slotKeys.push(i);
							var item_ = container.slots[i];
							if(originalOnlyItemsMap[item_.id] && originalOnlyItemsMap[item_.id].indexOf(item_.data) == -1){
								originalOnlyItemsMap[item_.id].push(item_.data);
							} else if(!originalOnlyItemsMap[item_.id]){
								originalOnlyItemsMap[item_.id] = [item_.data];
							}
							if(originalOnlyItemsExtraMap[item_.id+'_'+item_.data] && originalOnlyItemsExtraMap[item_.id+'_'+item_.data].indexOf(item_.extra) == -1){
								originalOnlyItemsExtraMap[item_.id+'_'+item_.data].push(item_.extra);
							} else if(!originalOnlyItemsExtraMap[item_.id+'_'+item_.data]){
								originalOnlyItemsExtraMap[item_.id+'_'+item_.data] = [item_.extra];
							}
							//originalItemsMap.push(getItemUid(item_));
						}
						craftingGridData.originalOnlyItemsExtraMap = originalOnlyItemsExtraMap;
						craftingGridData.originalOnlyItemsMap = originalOnlyItemsMap;
						craftingGridData.slotsKeys = _slotKeys;
						craftingGridData.crafts = [];
						if(!refresh)craftingGridData.textSearch = false;
						var millis = 0;
						if(Config.dev)millis = java.lang.System.currentTimeMillis();
						craftingGridData.slotsKeys = ScriptableObjectHelper.createArray(RSJava.sortItems(eventData.sort, eventData.reverse_filter, craftingGridData.textSearch ? craftingGridData.textSearch : null, container, craftingGridData.slotsKeys));
						if(Config.dev)Logger.Log('Items array sorted on: ' + (java.lang.System.currentTimeMillis() - millis), "RefinedStorageDebug");
						var originalItemsMap = craftingGridData.slotsKeys.map(function(__slot) {
							return getItemUid(container.slots[__slot]);
						});
						craftingGridData.originalItemsMap = originalItemsMap;
						if(craftingGridData.selectedItemInfoSlot)craftingGridData.setItemInfoSlot(craftingGridData.selectedItemInfoSlot, container);
					}
					content.elements["image_filter"].bitmap = 'RS_filter' + (eventData.sort + 1);
					content.elements["image_filter"].x = content.elements["filter_button"].x + (content.elements["filter_button"].scale * 20 - filter_size_map[eventData.sort]) / 2;
					if (eventData.reverse_filter) {
						content.elements["image_reverse_filter"].bitmap = 'RS_arrow_up';
					} else {
						content.elements["image_reverse_filter"].bitmap = 'RS_arrow_down';
					}
					content.elements["search_text"].text = craftingGridData.textSearch ? craftingGridData.textSearch : Translation.translate('Search');
					content.elements["image_redstone"].bitmap = 'redstone_GUI_' + (eventData.redstone_mode || 0);
					var slots_count = content.elements.slots_count;
					content.elements["slider_button"].bitmap = craftingGridData.slotsKeys.length <= craftingGridData.slots_count ? 'slider_buttonOff' : 'slider_buttonOn';
					var crafts_slots_count = content.elements.crafts_slots_count;
					if (!eventData.isWorkAllowed) {
						for (var i = 0; i < slots_count; i++) {
							content.elements['slot' + i].bitmap = 'classic_darken_slot';
						}
						content.elements["slider_button"].bitmap = 'slider_buttonOff';
						for (var i = 0; i < crafts_slots_count; i++) {
							content.elements['item_craft_slot' + i].bitmap = 'classic_darken_slot';
						}
					} else if (content.elements['slot0'].bitmap == 'classic_darken_slot') {
						for (var i = 0; i < slots_count; i++) {
							content.elements['slot' + i].bitmap = 'classic_slot';
						}
						content.elements["slider_button"].bitmap = 'slider_buttonOn';
						for (var i = 0; i < crafts_slots_count; i++) {
							content.elements['item_craft_slot' + i].bitmap = 'classic_slot';
						}
					}
					craftingGridSwitchPage(refresh ? craftingGridData.lastPage : 1, container, true);
					if(updateCrafts){
						var crafts2Thread = java.lang.Thread({
							run: function(){
								try {
									craftingGridData.isDarkenMap = {};
									craftingGridData.crafts = craftingGridFuncs.updateCrafts(craftingGridData.slotsKeys, craftingGridData.craftsTextSearch, craftingGridData.originalOnlyItemsMap, container.slots);
									craftingGridData.darkenSlots = {};
									craftingGridSwitchCraftsPage(refresh ? craftingGridData.lastCraftsPage : 1, container, true);
								} catch(err){
									alert('Error on sorting crafts: ' + JSON.stringify(err));
								}
							}
						});
						crafts2Thread.setPriority(java.lang.Thread.MIN_PRIORITY);
						crafts2Thread.start();
					}
				}
				if(!eventData.refresh)craftingGridData.selectedRecipe = null;
				for(var s = 0; s < 9; s++)content.elements['craft_slot' + s].parent = null;
				if(craftingGridData.lowPriority){
					craftingGridData.lowPriority = false;
					var craftsThread = java.lang.Thread({
						run: function(){
							try {
								craftingGridData.updateGui(eventData.refresh, eventData.updateFilters, eventData.updateCrafts, true);
							} catch(err){
								alert('Sorry, i broke :_(' + JSON.stringify(err));
							}
						}
					});
					craftsThread.setPriority(java.lang.Thread.MIN_PRIORITY);
					craftsThread.start();
				} else {
					craftingGridData.updateGui(eventData.refresh, eventData.updateFilters, eventData.updateCrafts, true);
				}
			}
		}
	},
	containerEvents: {
		updateRedstoneMode: function(eventData, connectedClient) {
			if(this.data.redstone_mode == undefined) this.data.redstone_mode = 0;
			this.data.redstone_mode = this.data.redstone_mode >= 2 ? 0 : this.data.redstone_mode + 1;
			if(!this.refreshRedstoneMode() && this.refreshGui) this.refreshGui();
		},
		updateFilter: function(eventData, connectedClient) {
			if(this.data.sort == undefined) this.data.sort = 0;
			this.data.sort = this.data.sort >= 2 ? 0 : this.data.sort + 1;
			this.refreshGui(false, false, true);
		},
		updateReverseFilter: function(eventData, connectedClient) {
			this.data.reverse_filter = !this.data.reverse_filter;
			this.refreshGui(false, false, true);
		},
		selectRecipe: function(eventData, connectedClient){
			//var javaRecipe = Recipes.getRecipeByUid(eventData.uid);
			//Callback.invokeCallback("VanillaWorkbenchRecipeSelected", javaRecipe, javaRecipe.getResult(), this.container);
		},
		provideCraft: function(eventData, connectedClient){
			this.data.selectedRecipe = eventData;
			this.data.selectedRecipe.javaRecipe = Recipes.getRecipeByUid(eventData.uid);
			this.data.selectedRecipe.result = this.data.selectedRecipe.javaRecipe.getResult();
			/* for(var i in eventData.craftSlotsItems){
				var item = eventData.craftSlotsItems[i];
				this.container.setSlot('WB_craft_slot' + i, item.id, item.count, item.data, item.extra);
			} */
			var result = this.data.selectedRecipe.result;
			for(var count = 0; count < eventData.count; count += result.count){
				if(!this.provideCraft(connectedClient.getPlayerUid())) break;
			}
			this.items();
			this.refreshGui(false, false, true, true);
			this.container.sendResponseEvent("reselectRecipe", {});
		}
	},
	events: {
		pushDeleteEvents: function(packetData, packetExtra, connectedClient) {
			/* for(var i in packetData.pushDeleteEvents){
				if(packetData.pushDeleteEvents[i].type == 'delete')packetData.pushDeleteEvents[i].item = this.container.getSlot(i).asScriptable();
			} */
			this.data.pushDeleteEvents[connectedClient.getPlayerUid()] = packetData.pushDeleteEvents;
			if(Config.dev)Logger.Log('Getted pushDeleteEvents from: ' + connectedClient.getPlayerUid() + '(' + Entity.getNameTag(connectedClient.getPlayerUid()) + ') : ' + JSON.stringify(packetData.pushDeleteEvents), 'RefinedStorageDebug');
		}
	}
});




// file: blocks/cable.js

IDRegistry.genBlockID("RS_cable");
Block.createBlock("RS_cable", [
	{
		name: "Cable",
		texture: [
            ['cable', 0]
        ],
		inCreative: true
	}
], {
	renderlayer: 1
})
mod_tip(BlockID['RS_cable']);
RS_blocks.push(BlockID['RS_cable']);
EnergyUse[BlockID['RS_cable']] = Config.energy_uses.cable;

/* Block.registerPlaceFunction('RS_cable', function(coords, item, block){
	var coords = World.canTileBeReplaced(block.id, block.data) ? coords : coords.relative;
	var relBlock = World.getBlock(coords.x, coords.y, coords.z);
	if (relBlock.id != 0 && relBlock.id != 9 && relBlock.id != 11) return;
    World.setBlock(coords.x, coords.y, coords.z, BlockID.RS_cable, 0);
	Player.decreaseCarriedItem(1);
	if(_controllerCoords_ = searchController(coords)){
		var tile  = World.getTileEntity(_controllerCoords_.x, _controllerCoords_.y, _controllerCoords_.z);
		if(tile){
			tile.updateControllerNetwork();
		}
	}
}); */

(function () {
	var width = 1/4;

	RSgroup.add(BlockID.RS_cable, -1);

	var boxes = [
		{side: [1, 0, 0], box: [0.5 + width / 2, 0.5 - width / 2, 0.5 - width / 2, 1, 0.5 + width / 2, 0.5 + width / 2]},
		{side: [-1, 0, 0], box: [0, 0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2]},
		{side: [0, 1, 0], box: [0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2, 1, 0.5 + width / 2]},
		{side: [0, -1, 0], box: [0.5 - width / 2, 0, 0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2]},
		{side: [0, 0, 1], box: [0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, 1]},
		{side: [0, 0, -1], box: [0.5 - width / 2, 0.5 - width / 2, 0, 0.5 + width / 2, 0.5 + width / 2, 0.5 - width / 2]}
	];

	var Dmodel = new ICRender.CollisionShape();
	var render = new ICRender.Model();
	for (var i in boxes) {
		var wire = boxes[i].box;
		var side = boxes[i].side;
		render.addEntry(new BlockRenderer.Model(wire[0], wire[1], wire[2], wire[3], wire[4], wire[5], BlockID.RS_cable, 0)).setCondition(new ICRender.BLOCK(side[0], side[1], side[2], RSgroup, false));
		var entry = Dmodel.addEntry();
		entry.addBox(wire[0], wire[1], wire[2], wire[3], wire[4], wire[5]);
		entry.setCondition(new ICRender.BLOCK(side[0], side[1], side[2], RSgroup, false));
	}
	render.addEntry(new BlockRenderer.Model(0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, BlockID.RS_cable, 0));
	var entry = Dmodel.addEntry();
	entry.addBox(0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2);
	BlockRenderer.setCustomCollisionShape(BlockID.RS_cable, -1, Dmodel);
	BlockRenderer.setCustomRaycastShape(BlockID.RS_cable, -1, Dmodel);
	BlockRenderer.setStaticICRender(BlockID.RS_cable, -1, render);
})();

(function(){
	var width = 1/4;

	var boxes = [
		[0.5 + width / 2, 0.5 - width / 2, 0.5 - width / 2, 1, 0.5 + width / 2, 0.5 + width / 2],
		[0, 0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2],
		[0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2]
	]
	var render = new ICRender.Model();
	for(var i in boxes){
		render.addEntry(new BlockRenderer.Model(boxes[i][0], boxes[i][1], boxes[i][2], boxes[i][3], boxes[i][4], boxes[i][5], BlockID.RS_cable, 0));
	}
	ItemModel.getFor(BlockID.RS_cable, 0).setModel(render);
})();




// file: blocks/craftBlocks.js

IDRegistry.genBlockID("RSmachine_casing");
Block.createBlock("RSmachine_casing", [
	{
		name: "Machine Casing",
		texture: [
            ['RSmachine_casing', 0]
        ],
		inCreative: true
	}
], 'opaque');
mod_tip(BlockID['RSmachine_casing']);




// file: blocks/interface.js

IDRegistry.genBlockID("RS_interface");
RefinedStorage.createMapBlock("RS_interface", [
	{
		name: "Interface",
		texture: [
			["interface_off", 0]
		],
		inCreative: true
	}
]);
mod_tip(BlockID['RS_interface']);
RS_blocks.push(BlockID.RS_interface);
EnergyUse[BlockID['RS_interface']] = Config.energy_uses.interface;

var elementsGUI_interface = {};
var interfaceData = {
	getSelectedSlot: function(){}
};
function initInterfaceElements(){

	var slotsSize = 60;
	var x = 375

	var screenHeight = UI.getScreenHeight() - 120;
	var freeSpace = screenHeight - slotsSize*3;
	var numFreeSpace = freeSpace*0.53;
	var num1Space = numFreeSpace/2;
	var arrowSpace = freeSpace*0.47;

	elementsGUI_interface["interface_import_text"] = {
		type: "text",
		x: x,
		y: 20 + num1Space*0.3125,
		text: Translation.translate('Interface Import'),
		z: 10,
		font: {
			color: android.graphics.Color.DKGRAY,
			size: num1Space*0.4375/1.1,
			shadow: 0
		}
	}

	for(var i = 0; i < 9; i++){
		elementsGUI_interface["slot_input" + i] = {
			type: "slot",
			num: i,
			name: "slot_input" + i,
			x: x + i*slotsSize,
			y: 20 + num1Space,
			size: slotsSize
		}
	}

	elementsGUI_interface["interface_export_text"] = {
		type: "text",
		x: x,
		y: elementsGUI_interface["slot_input" + 0].y + slotsSize + num1Space*0.3125,
		text: Translation.translate('Interface Export'),
		z: 10,
		font: {
			color: android.graphics.Color.DKGRAY,
			size: num1Space*0.4375/1.1,
			shadow: 0
		}
	}

	for(var i = 0; i < 9; i++){
		elementsGUI_interface["slot_import" + i] = {
			type: "slot",
			num: i,
			name: "slot_import" + i,
			x: x + i*slotsSize,
			y: elementsGUI_interface["slot_input" + 0].y + slotsSize + num1Space,
			size: slotsSize
		}
	}

	elementsGUI_interface["arrow_image"] = {
		type: "image",
		x: x + slotsSize * 4.5,
		y: elementsGUI_interface["slot_import" + 0].y + slotsSize,
		z: 10,
		bitmap: "RS_arrow",
		scale: Math.min((arrowSpace * 0.8)/44, 2.5)
	}
	elementsGUI_interface["arrow_image"].y += (arrowSpace - elementsGUI_interface["arrow_image"].scale*44)/2;
	elementsGUI_interface["arrow_image"].x -= elementsGUI_interface["arrow_image"].scale*30/2;

	for(var i = 0; i < 9; i++){
		elementsGUI_interface["slot_output" + i] = {
			type: "slot",
			num: i,
			name: "slot_output" + i,
			x: x + i*slotsSize,
			y: elementsGUI_interface["slot_import" + 0].y + slotsSize + arrowSpace,
			size: slotsSize
		}
	}

	var settings_cons = 10;
	elementsGUI_interface["redstone_button"] = {
		type: "button",
		x: 225 + 20 + settings_cons,
		y: 40,
		bitmap: 'RS_empty_button',
		bitmap2: 'RS_empty_button_pressed',
		scale: 2,
		clicker: {
			onClick: function (itemContainerUiHandler, container, element) {
				container.sendEvent("updateRedstoneMode", {});
			},
			onLongClick: function (itemContainerUiHandler, container, element) {

			}
		}
	}

	elementsGUI_interface["image_redstone"] = {
		type: "image",
		x: elementsGUI_interface["redstone_button"].x,
		y: elementsGUI_interface["redstone_button"].y,
		z: 1000,
		bitmap: "redstone_GUI_0",
		scale: elementsGUI_interface["redstone_button"].scale*20/16
	}

	elementsGUI_interface["damage_button"] = {
		type: "button",
		x: elementsGUI_interface["redstone_button"].x,
		y: elementsGUI_interface["redstone_button"].y + elementsGUI_interface["redstone_button"].scale*20 + settings_cons,
		bitmap: 'RS_empty_button',
		bitmap2: 'RS_empty_button_pressed',
		scale: 2,
		clicker: {
			onClick: function (itemContainerUiHandler, container, element) {
				container.sendEvent("updateDamage", {});
			},
			onLongClick: function (itemContainerUiHandler, container, element) {
			}
		}
	}

	elementsGUI_interface["image_damage"] = {
		type: "image",
		x: elementsGUI_interface["damage_button"].x,
		y: elementsGUI_interface["damage_button"].y,
		z: 1000,
		bitmap: "RS_damage_on",
		scale: elementsGUI_interface["damage_button"].scale*20/16
	}

	elementsGUI_interface["nbt_button"] = {
		type: "button",
		x: elementsGUI_interface["damage_button"].x,
		y: elementsGUI_interface["damage_button"].y + elementsGUI_interface["damage_button"].scale*20 + settings_cons,
		bitmap: 'RS_empty_button',
		bitmap2: 'RS_empty_button_pressed',
		scale: 2,
		clicker: {
			onClick: function (itemContainerUiHandler, container, element) {
				container.sendEvent("updateUseNbt", {});
			},
			onLongClick: function (itemContainerUiHandler, container, element) {
			}
		}
	}

	elementsGUI_interface["image_nbt"] = {
		type: "image",
		x: elementsGUI_interface["nbt_button"].x,
		y: elementsGUI_interface["nbt_button"].y,
		z: 1000,
		bitmap: "RS_nbt_on",
		scale: elementsGUI_interface["nbt_button"].scale*20/16
	}

	var upgradesYstart = elementsGUI_interface["nbt_button"].y + elementsGUI_interface["nbt_button"].scale*20 + slotsSize*0.25;
	var upgradesYend = elementsGUI_interface["slot_output0"].y + slotsSize*0.75;
	var upgradesSlotsSize = (upgradesYend - upgradesYstart)/4;
	for(var i = 0; i < 4; i++){
		elementsGUI_interface["slot_upgrades" + i] = {
			type: "slot",
			num: i,
			name: "slot_upgrades" + i,
			x: elementsGUI_interface["nbt_button"].x,
			y: upgradesYstart + i*upgradesSlotsSize,
			size: upgradesSlotsSize + 1
		}
	}
};
initInterfaceElements();

var interfaceGUI = new UI.StandartWindow({
	standart: {
		header: {
			text: {
				text: Translation.translate("Interface")
			}
		},
		inventory: {
			width: 300 / 4 * 3
		},
		background: {
			standart: true
		}
	},

	drawing: [],

	elements: elementsGUI_interface
});
GUIs.push(interfaceGUI);

testButtons(interfaceGUI.getWindow('header').getContent().elements, initInterfaceElements);

importSlotsMap = {};
for(var asdl = 0; asdl < 9; asdl++){
	importSlotsMap['slot_import'+asdl] = asdl;
	importSlotsMap[asdl] = 'slot_import'+asdl;
}

var inv_elements_interfaceGUI = interfaceGUI.getWindow('inventory').getContent();

RefinedStorage.createTile(BlockID.RS_interface, {
	defaultValues: {
		ticks: 0,
		currentSlot: 0,
		useDamage: true,
		useNbt: true,
		upgrades: {},
		speed: 9,
		count: 1,
		importItems: [{id:0,data:0,extra:null},{id:0,data:0,extra:null},{id:0,data:0,extra:null},{id:0,data:0,extra:null},{id:0,data:0,extra:null},{id:0,data:0,extra:null},{id:0,data:0,extra:null},{id:0,data:0,extra:null},{id:0,data:0,extra:null}]
	},
	upgradesSlots: ["slot_upgrades0", "slot_upgrades1", "slot_upgrades2", "slot_upgrades3"],
	useNetworkItemContainer: true,
	click: function (id, count, data, coords, player, extra) {
		if(Entity.getSneaking(player)) return false;
		var client = Network.getClientForPlayer(player);
		if (!client || this.container.getNetworkEntity().getClients().contains(client)) return true;
		this.container.openFor(client, "main");
		this.refreshGui(true, client); 
		return true;
	},
	tick: function(){
		StorageInterface.checkHoppers(this);
		for(var k in this.data.importItems){
			var importItem = this.data.importItems[k];
			if(importItem.id == 0) continue;
			var slotItem = this.container.getSlot('slot_output' + k);
			var item = {id: importItem.id, count: importItem.count - slotItem.count, data: this.data.useDamage ? importItem.data : -1, extra: this.data.useNbt ? importItem.extra : -1};
			if(item.count <= 0 || (slotItem.id != importItem.id && slotItem.id != 0) || (slotItem.data != importItem.data && this.data.useDamage) || (slotItem.extra != importItem.extra && this.data.useNbt)) continue;
			var deleted = this.deleteItem(item);
			if(deleted < item.count){
				var count = item.count - deleted;
				this.container.setSlot('slot_output' + k, item.id, slotItem.count + count, item.data, item.extra);
			}
		}
		this.data.ticks++
		if(this.data.ticks%this.data.speed == 0){
			var slot = this.container.getSlot('slot_input' + this.data.currentSlot);
			if(slot.id == 0){
				this.data.currentSlot++;
				if(this.data.currentSlot > 8) this.data.currentSlot = 0;
			} else {
				slot = slot.asScriptable();
				var count = Math.min(slot.count, this.data.count);
				var pushed = this.itemCanBePushed(slot, count, true);
				if(pushed == 0){
					this.container.setSlot('slot_input' + this.data.currentSlot, slot.id, slot.count - count, slot.data, slot.extra);
				} else if(pushed < count){
					this.container.setSlot('slot_input' + this.data.currentSlot, slot.id, slot.count - (count - pushed), slot.data, slot.extra);
				} else {
					this.data.currentSlot++;
					if(this.data.currentSlot > 8) this.data.currentSlot = 0;
					return;
				}
				if(slot.count <= (count - pushed)) this.container.clearSlot('slot_input' + this.data.currentSlot);
				this.pushItem(slot, count);
			}
		}
		this.container.sendChanges();
	},
	/* post_update_network: function(net_id){
		if(net_id == 'f') return;
		var ths = this;
		RSNetworks[net_id][this.coords_id()].pushItemFunc = function(item, count){
			return ths.pushItemFunc(item, count);
		}
	},
	pushItemFunc: function(item, count){
		if(Config.dev)Logger.Log('Redirection item to interface: id: ' + item.id + ', count: ' + count + ' (' + item.count + '), data: ' + item.data + (item.extra ? ', extra: ' + item.extra.getValue() : ''), 'RefinedStorageDebug');
		for(var i in this.data.importItems){
			var _item = this.data.importItems[i];
			if(!_item || _item.id == 0) continue;
			var maxStack = Math.min(Item.getMaxStack(item.id), _item.count);
			var slot = this.container.getSlot('slot_output' + i);
			if(slot.count < maxStack && (item.id == _item.id && (!this.data.useDamage ? true : item.data == _item.data) && (!this.data.useNbt ? true : item.extra == _item.extra) && (slot.id == 0 || (slot.id == item.id && slot.data == item.data && slot.extra == item.extra)))){
				var _count = Math.min(maxStack - count, count);
				if(_count <= 0) continue;
				count -= _count;
				this.container.setSlot('slot_output' + i, item.id, slot.count + _count, item.data, item.extra);
			}
		}
		return count;
	}, */
	pre_created: function(){
		this.data.importItems = [{id:0,data:0,extra:null},{id:0,data:0,extra:null},{id:0,data:0,extra:null},{id:0,data:0,extra:null},{id:0,data:0,extra:null},{id:0,data:0,extra:null},{id:0,data:0,extra:null},{id:0,data:0,extra:null},{id:0,data:0,extra:null}];
	},
	itemCanBePushed: function(item, count, _inverted){
		count = count || item.count;
		if (!this.isWorkAllowed()) return _inverted ? count : 0;
		var res = RSNetworks[this.data.NETWORK_ID].info.itemCanBePushed(item, count);
		return _inverted ? count - res : res;
	},
	pushItem: function (item, count) {
		count = count || item.count;
		if (!this.isWorkAllowed()) return count;
		var res = RSNetworks[this.data.NETWORK_ID].info.pushItem(item, count);
		if(this.post_pushItem)this.post_pushItem(item, count, res);
		return res;
	},
	deleteItem: function (item, count) {
		count = count || item.count;
		if (!this.isWorkAllowed()) return count;
		var res = RSNetworks[this.data.NETWORK_ID].info.deleteItem(item, count);
		if(this.post_deleteItem)this.post_deleteItem(item, count, res);
		return res;
	},
	originalItems: function(){
		if (!this.isWorkAllowed()) {
			return [];
		}
		return RSNetworks[this.data.NETWORK_ID].info.items;
	},
	originalItemsMap: function(){
		if (!this.isWorkAllowed()) {
			return [];
		}
		return RSNetworks[this.data.NETWORK_ID].info.items_map;
	},
	originalOnlyItemsMap: function(){
		if (!this.isWorkAllowed()) {
			return {};
		}
		return RSNetworks[this.data.NETWORK_ID].info.just_items_map;
	},
	originalOnlyItemsExtraMap: function(){
		if (!this.isWorkAllowed()) {
			return {};
		}
		return RSNetworks[this.data.NETWORK_ID].info.just_items_map_extra;
	},
    refreshModel: function(){
		if(!this.networkEntity) return Logger.Log(Item.getName(this.blockInfo.id, this.blockInfo.data) + ' model on: ' + cts(this) + ' cannot be displayed');
		this.sendPacket("refreshModel", {isActive: this.data.isActive});
	},
	destroy: function(){
		for(var i = 0; i < 9; i++)this.container.clearSlot('slot_import' + i);
	},
	refreshGui: function(first, client){
		var _data = {
			name: this.networkData.getName() + '', 
			isActive: this.data.isActive, 
			NETWORK_ID: this.data.NETWORK_ID,
			redstone_mode: this.data.redstone_mode,
			refresh: !first,
			isWorkAllowed: this.isWorkAllowed(),
			useNbt: this.data.useNbt,
			useDamage: this.data.useDamage
		};
		if(client){
			this.container.sendEvent(client, "openGui", _data);
		} else {
			this.container.sendEvent("openGui", _data);
		}
	},
	getScreenByName: function(screenName) {
		if(screenName == 'main')return interfaceGUI;
	},
	post_init: function(){
		for(var i = 0; i < 9; i++){
			var ths = this;
			this.container.setSlotAddTransferPolicy('slot_import' + i, {
				transfer: function(itemContainer, slot, id, count, data, extra, player){
					var thisSlot = itemContainer.getSlot(slot);
					ths.data.importItems[importSlotsMap[slot]] = {id: id, count: thisSlot.count + count, data: data, extra: extra};
					itemContainer.setSlot(slot, id, Math.min(thisSlot.count + count, Item.getMaxStack(id)), data, extra);
					return 0;
				}
			})
			this.container.setSlotGetTransferPolicy('slot_import' + i, {
				transfer: function(itemContainer, slot, id, count, data, extra, player){
					ths.data.importItems[importSlotsMap[slot]] = {id:0, count:0, data: 0, extra: null};
					itemContainer.setSlot(slot, 0, 0, 0, null);
					return 0;
				}
			})
			this.container.setSlotAddTransferPolicy('slot_output' + i, {
				transfer: function(itemContainer, slot, id, count, data, extra, player){
					return 0;
				}
			})
		}
	},
	client:{
		refreshModel: function(eventData, packetExtra) {
			if(Config.dev)Logger.Log('Local refreshing Interface model: isActive: ' + this.networkData.getBoolean('isActive'), 'RefinedStorageDebug');
			RefinedStorage.mapTexture(this, this.networkData.getBoolean('isActive') ? 'interface_on' : 'interface_off');
		},
		events: {
			refreshModel: function(eventData, packetExtra) {
				if(Config.dev)Logger.Log('Event refreshing Interface model: isActive: ' + eventData.isActive, 'RefinedStorageDebug');
				RefinedStorage.mapTexture(this, eventData.isActive ? 'interface_on' : 'interface_off');
			}
		},
		containerEvents: {
			openGui: function(container, window, content, eventData){
				if(!content || !window || !window.isOpened()) return;
				content.elements["image_redstone"].bitmap = 'redstone_GUI_' + (eventData.redstone_mode || 0);
				content.elements["image_damage"].bitmap = eventData.useDamage ? 'RS_damage_on' : 'RS_damage_off';
				content.elements["image_nbt"].bitmap = eventData.useNbt ? 'RS_nbt_on' : 'RS_nbt_off';
				/* var elementIns = window.getElements().get('slot_input0'); 
				var clazz = elementIns.getClass(); 
				var field = clazz.getDeclaredField("currentSelectedSlot");
				field.setAccessible(true);
				interfaceData.getSelectedSlot = function(name){
					return name ? field.get(elementIns).description.name : field.get(elementIns);
				} */
			}
		}
	},
	containerEvents:{
		updateUseNbt: function(eventData, connectedClient) {
			this.data.useNbt = !this.data.useNbt;
			this.refreshGui();
		},
		updateDamage: function(eventData, connectedClient) {
			this.data.useDamage = !this.data.useDamage;
			this.refreshGui();
		}
	}
})

StorageInterface.createInterface(BlockID.RS_interface, {
	slots: {
		"slot_input0": {input: true},
		"slot_input1": {input: true},
		"slot_input2": {input: true},
		"slot_input3": {input: true},
		"slot_input4": {input: true},
		"slot_input5": {input: true},
		"slot_input6": {input: true},
		"slot_input7": {input: true},
		"slot_input8": {input: true},
		"slot_output0": {output: true},
		"slot_output1": {output: true},
		"slot_output2": {output: true},
		"slot_output3": {output: true},
		"slot_output4": {output: true},
		"slot_output5": {output: true},
		"slot_output6": {output: true},
		"slot_output7": {output: true},
		"slot_output8": {output: true}
	}
});




// file: crafts.js

Callback.addCallback("PreLoaded", function () {
	Recipes.addFurnace(406, 0, ItemID.silicon, 0);
	Recipes.addFurnace(ItemID.raw_basic_processor, 0, ItemID.basic_processor, 0);
	Recipes.addFurnace(ItemID.raw_improved_processor, 0, ItemID.improved_processor, 0);
	Recipes.addFurnace(ItemID.raw_advanced_processor, 0, ItemID.advanced_processor, 0);


	Recipes.addShapeless({id: ItemID.construction_core, count: 1, data: 0}, [{id: ItemID.basic_processor, count: 1, data: -1}, {id: 348, count: 1, data: -1}]);
	Recipes.addShapeless({id: ItemID.destruction_core, count: 1, data: 0}, [{id: ItemID.basic_processor, count: 1, data: -1}, {id: 406, count: 1, data: -1}]);
	Recipes.addShapeless({id: ItemID['storageDisk1000'], count: 1, data: 0}, [{id: ItemID.storage_housing, count: 1, data: -1}, {id: ItemID['1k_storage_part'], count: 1, data: -1}]);
	Recipes.addShapeless({id: ItemID['storageDisk4000'], count: 1, data: 0}, [{id: ItemID.storage_housing, count: 1, data: -1}, {id: ItemID['4k_storage_part'], count: 1, data: -1}]);
	Recipes.addShapeless({id: ItemID['storageDisk16000'], count: 1, data: 0}, [{id: ItemID.storage_housing, count: 1, data: -1}, {id: ItemID['16k_storage_part'], count: 1, data: -1}]);
	Recipes.addShapeless({id: ItemID['storageDisk64000'], count: 1, data: 0}, [{id: ItemID.storage_housing, count: 1, data: -1}, {id: ItemID['64k_storage_part'], count: 1, data: -1}]);


	Recipes.addShaped({id: ItemID.processor_binding, count: 8, data: 0}, [
		"   ",
		"sbs",
		"   "
	], ['s', 287, -1, 'b', 341, -1]);
	Recipes.addShaped({id: ItemID.quartz_enriched_iron, count: 4, data: 0}, [
		"ii ",
		"iq ",
		"   "
	], ['i', 265, -1, 'q', 406, -1]);
	Recipes.addShaped({id: ItemID.raw_basic_processor, count: 1, data: 0}, [
		"bi ",
		"sr ",
		"   "
	], ['i', 265, -1, 'b', ItemID.processor_binding, -1, 's', ItemID.silicon, -1, 'r', 331, -1]);
	Recipes.addShaped({id: ItemID.raw_improved_processor, count: 1, data: 0}, [
		"bg ",
		"sr ",
		"   "
	], ['g', 266, -1, 'b', ItemID.processor_binding, -1, 's', ItemID.silicon, -1, 'r', 331, -1]);
	Recipes.addShaped({id: ItemID.raw_advanced_processor, count: 1, data: 0}, [
		"bd ",
		"sr ",
		"   "
	], ['d', 264, -1, 'b', ItemID.processor_binding, -1, 's', ItemID.silicon, -1, 'r', 331, -1]);
	Recipes.addShaped({id: ItemID.raw_advanced_processor, count: 1, data: 0}, [
		"bd ",
		"sr ",
		"   "
	], ['d', 264, -1, 'b', ItemID.processor_binding, -1, 's', ItemID.silicon, -1, 'r', 331, -1]);
	Recipes.addShaped({id: ItemID.storage_housing, count: 1, data: 0}, [
		"grg",
		"r r",
		"qqq"
	], ['g', 20, -1, 'q', ItemID.quartz_enriched_iron, -1, 'r', 331, -1]);
	Recipes.addShaped({id: ItemID.storage_housing, count: 1, data: 0}, [
		"grg",
		"r r",
		"qqq"
	], ['g', 241, -1, 'q', ItemID.quartz_enriched_iron, -1, 'r', 331, -1]);
	Recipes.addShaped({id: ItemID['storageDisk1000'], count: 1, data: 0}, [
		"grg",
		"rdr",
		"qqq"
	], ['d', ItemID['1k_storage_part'], -1, 'g', 20, -1, 'q', ItemID.quartz_enriched_iron, -1, 'r', 331, -1]);
	Recipes.addShaped({id: ItemID['storageDisk1000'], count: 1, data: 0}, [
		"grg",
		"rdr",
		"qqq"
	], ['d', ItemID['1k_storage_part'], -1, 'g', 241, -1, 'q', ItemID.quartz_enriched_iron, -1, 'r', 331, -1]);
	Recipes.addShaped({id: ItemID['storageDisk4000'], count: 1, data: 0}, [
		"grg",
		"rdr",
		"qqq"
	], ['d', ItemID['4k_storage_part'], -1, 'g', 20, -1, 'q', ItemID.quartz_enriched_iron, -1, 'r', 331, -1]);
	Recipes.addShaped({id: ItemID['storageDisk4000'], count: 1, data: 0}, [
		"grg",
		"rdr",
		"qqq"
	], ['d', ItemID['4k_storage_part'], -1, 'g', 241, -1, 'q', ItemID.quartz_enriched_iron, -1, 'r', 331, -1]);
	Recipes.addShaped({id: ItemID['storageDisk16000'], count: 1, data: 0}, [
		"grg",
		"rdr",
		"qqq"
	], ['d', ItemID['16k_storage_part'], -1, 'g', 20, -1, 'q', ItemID.quartz_enriched_iron, -1, 'r', 331, -1]);
	Recipes.addShaped({id: ItemID['storageDisk16000'], count: 1, data: 0}, [
		"grg",
		"rdr",
		"qqq"
	], ['d', ItemID['16k_storage_part'], -1, 'g', 241, -1, 'q', ItemID.quartz_enriched_iron, -1, 'r', 331, -1]);
	Recipes.addShaped({id: ItemID['storageDisk64000'], count: 1, data: 0}, [
		"grg",
		"rdr",
		"qqq"
	], ['d', ItemID['64k_storage_part'], -1, 'g', 20, -1, 'q', ItemID.quartz_enriched_iron, -1, 'r', 331, -1]);
	Recipes.addShaped({id: ItemID['storageDisk64000'], count: 1, data: 0}, [
		"grg",
		"rdr",
		"qqq"
	], ['d', ItemID['64k_storage_part'], -1, 'g', 241, -1, 'q', ItemID.quartz_enriched_iron, -1, 'r', 331, -1]);
	Recipes.addShaped({id: ItemID['1k_storage_part'], count: 1, data: 0}, [
		"sqs",
		"grg",
		"sgs"
	], ['q', ItemID.quartz_enriched_iron, -1, 'g', 20, -1, 's', ItemID.silicon, -1, 'r', 331, -1]);
	Recipes.addShaped({id: ItemID['1k_storage_part'], count: 1, data: 0}, [
		"sqs",
		"grg",
		"sgs"
	], ['q', ItemID.quartz_enriched_iron, -1, 'g', 241, -1, 's', ItemID.silicon, -1, 'r', 331, -1]);
	Recipes.addShaped({id: ItemID['4k_storage_part'], count: 1, data: 0}, [
		"sqs",
		"grg",
		"sgs"
	], ['q', ItemID.quartz_enriched_iron, -1, 'g', ItemID['1k_storage_part'], -1, 's', ItemID.basic_processor, -1, 'r', 331, -1]);
	Recipes.addShaped({id: ItemID['16k_storage_part'], count: 1, data: 0}, [
		"sqs",
		"grg",
		"sgs"
	], ['q', ItemID.quartz_enriched_iron, -1, 'g', ItemID['4k_storage_part'], -1, 's', ItemID.improved_processor, -1, 'r', 331, -1]);
	Recipes.addShaped({id: ItemID['64k_storage_part'], count: 1, data: 0}, [
		"sqs",
		"grg",
		"sgs"
	], ['q', ItemID.quartz_enriched_iron, -1, 'g', ItemID['16k_storage_part'], -1, 's', ItemID.advanced_processor, -1, 'r', 331, -1]);
	Recipes.addShaped({id: ItemID['rs_upgrade'], count: 1, data: 0}, [
		"igi",
		"isi",
		"igi"
	], ['s', ItemID['improved_processor'], 0, 'g', 331, -1, 'i', ItemID['quartz_enriched_iron'], -1]);
	Recipes.addShaped({id: ItemID['RSSpeedUpgrade'], count: 1, data: 0}, [
		"igi",
		"gsg",
		"iii"
	], ['s', ItemID['rs_upgrade'], 0, 'g', 353, 0, 'i', ItemID['quartz_enriched_iron'], -1]);
	Recipes.addShaped({id: ItemID['RSStackUpgrade'], count: 1, data: 0}, [
		"sgs",
		"gsg",
		"sgs"
	], ['g', ItemID['RSSpeedUpgrade'], 0, 's', 353, 0]);


	Recipes.addShaped({id: BlockID['RS_controller'], count: 1, data: 0}, [
		"sqs",
		"grg",
		"sgs"
	], ['q', ItemID.advanced_processor, -1, 'g', ItemID.silicon, -1, 's', ItemID.quartz_enriched_iron, -1, 'r', BlockID['RSmachine_casing'], -1]);
	Recipes.addShaped({id: BlockID['RS_grid'], count: 1, data: 0}, [
		"pog",
		"qcg",
		"plg"
	], ['q', ItemID.quartz_enriched_iron, -1, 'c', BlockID['RSmachine_casing'], -1, 'g', 20, -1, 'o', ItemID.construction_core, -1, 'l', ItemID.destruction_core, -1, 'p', ItemID.improved_processor, -1]);
	Recipes.addShaped({id: BlockID['RS_grid'], count: 1, data: 0}, [
		"pog",
		"qcg",
		"plg"
	], ['q', ItemID.quartz_enriched_iron, -1, 'c', BlockID['RSmachine_casing'], -1, 'g', 241, -1, 'o', ItemID.construction_core, -1, 'l', ItemID.destruction_core, -1, 'p', ItemID.improved_processor, -1]);
	Recipes.addShaped({id: BlockID['RS_crafting_grid'], count: 1, data: 0}, [
		"ga",
		"c  ",
		"   "
	], ['a', ItemID.advanced_processor, -1, 'c', BlockID['RS_grid'], -1, 'g', 58, -1]);
	Recipes.addShaped({id: BlockID['diskDrive'], count: 1, data: 0}, [
		"ihi",
		"ici",
		"iai"
	], ['a', ItemID.advanced_processor, -1, 'c', BlockID['RSmachine_casing'], -1, 'i', 265, -1, 'h', 54, -1]);
	Recipes.addShaped({id: BlockID['diskDrive'], count: 1, data: 0}, [
		"ihi",
		"ici",
		"iai"
	], ['a', ItemID.advanced_processor, -1, 'c', BlockID['RSmachine_casing'], -1, 'i', 265, -1, 'h', 130, -1]);
	Recipes.addShaped({id: BlockID['RS_cable'], count: 12, data: 0}, [
		"iii",
		"grg",
		"iii"
	], ['g', 20, -1, 'r', 331, -1, 'i', ItemID.quartz_enriched_iron, -1]);
	Recipes.addShaped({id: BlockID['RS_cable'], count: 12, data: 0}, [
		"iii",
		"grg",
		"iii"
	], ['g', 241, -1, 'r', 331, -1, 'i', ItemID.quartz_enriched_iron, -1]);
	Recipes.addShaped({id: BlockID['RSmachine_casing'], count: 1, data: 0}, [
		"iii",
		"isi",
		"iii"
	], ['s', 1, 0, 'i', ItemID.quartz_enriched_iron, -1]);
	Recipes.addShaped({id: BlockID['RS_interface'], count: 1, data: 0}, [
		"ihi",
		"rsr",
		"ihi"
	], ['s', BlockID['RSmachine_casing'], 0, 'i', ItemID.quartz_enriched_iron, -1, 'h', 410, -1, 'r', 331, -1]);//TODO: remake craft
});




// file: modInfo.js

(function(){
    var MODID = 638;

    var JAVA_URL = java.net.URL;
    var BufferedReader = java.io.BufferedReader;
    var InputStreamReader = java.io.InputStreamReader;
    var Uri = android.net.Uri;
    var Intent = android.content.Intent;
    
    var changelogEnabled = false;

    function getUrlContent(_url, _parse){
        var isError = {data: undefined};
        try {
            var input;
            var inputOpened = true;
            result = '';
            /* jSetTimeout(function(){//522;
                if(result.length == 0 && !isError.data){
                    alert('[RefinedStoragePE] Your internet connection is very slow\nIf you do not want to see this message and want make loading faster then change "changelogEnabled" to "false" in RefinedStoragePE config file');
                }
            }, 5000); */
            var _URL_ = new JAVA_URL(_url);
            input = new BufferedReader(new InputStreamReader(_URL_.openStream()));
            while (inputOpened) {
                inputLine = input.readLine();
                if (inputLine) {
                    result += inputLine + '\n';
                } else {
                    input.close();
                    var data = result.substr(0, result.length - 1);
                    if(_parse) data = JSON.parse(data);
                    return {data: data};
                }
            }
            return {error:'408 Request Timeout'};
        } catch (e) {
            isError.data = e;
            Logger.Log('getUrlContent Error: ' + JSON.stringify(e), 'RefinedStoragePE');
            return {error: e};
        }
    }
    
    var padding = 40;
    var thisWindows = {};
    var mainWindows = ['main'];//['close_tab', 'main', 'tabs'];
    var infoWindows = ['info', 'donations'];
    var changelogWindows = ['changelog'];
    var allWindows = mainWindows.concat(infoWindows).concat(changelogWindows);
    var controllerIconAnim = [];
    for(var i = 0; i < 12; i++){
        controllerIconAnim.push('controllerImage_' + i);
    }
    var controllerIconAnimWithoutShadow = [];
    for(var i = 0; i < 12; i++){
        controllerIconAnimWithoutShadow.push('controllerImageWithoutShadow_' + i);
    }
    controllerIconAnim.delay = controllerIconAnimWithoutShadow.delay = 2;

    var tabImageSettings = {
        padding : 15,
        size: 35
    }
    var closeButton = {
        percents: 0.6,
        size: 60
    }
    closeButton.buttonSize = closeButton.size*closeButton.percents;
    closeButton.buttonPadding = (closeButton.size-closeButton.buttonSize)/2;
    var tabsSettings = {
        width: 300,
        height: 56
    }
    var mainLocation = { x: padding, y: padding, width: 1000 - padding*2, height: UI.getScreenHeight() - padding*2 };
    ModInfoUI_changelog_height = mainLocation.height*1000/mainLocation.width;
    var mainElements = {
        "upTabCloseButton": {
            type: "image",
            x: 1000-closeButton.size,
            y: 0,
            z: -10,
            width: closeButton.size,
            height: closeButton.size,
            bitmap: "tab_up_close_button",
            scale: 2,
        },
        "closeButton": {
            type: "button", 
            x: 1000 - closeButton.buttonSize - closeButton.buttonPadding, 
            y: closeButton.buttonPadding, 
            z: 10, 
            scale: closeButton.buttonSize/15, 
            bitmap: "classic_close_button", 
            bitmap2: "classic_close_button_down",
            clicker: {
                onClick: function(){
                    for(var i in allWindows)if(thisWindows[allWindows[i]].isOpened())thisWindows[allWindows[i]].close();
                }
            }
        },
        "upTabInfo": {
            type: "frame",
            x: 0,
            y: 0,
            z: 1,
            width: tabsSettings.width,
            height: tabsSettings.height,
            isTab: true,
            isSelected: true,
            bitmap: "classic_tab_up_light_left",
            scale: 2,
            onTouchEvent: function(element, event){
                if(event.type == 'CLICK' && !this.isSelected){
                    switchPage('info');
                }
            }
        },
        "upTabInfo_text": {
            type: "text",
            x: tabImageSettings.size + tabImageSettings.padding*2,
            y: tabsSettings.height/2 - 11,
            z: 10,
            text: Translation.translate('Information'),
            font: {
                color: android.graphics.Color.DKGRAY,
                shadow: 0
            }
        },
        "upTabInfo_image": {
            type: "image",
            x: tabImageSettings.padding,
            y: (tabsSettings.height - tabImageSettings.size)/2,
            z: 10,
            bitmap: controllerIconAnim,
            scale: tabImageSettings.size/17 
        },
        "upTabChangelog": {
            type: "frame",
            x: tabsSettings.width,
            y: 0,
            z: -1,
            width: tabsSettings.width,
            height: tabsSettings.height,
            isTab: true,
            isSelected: false,
            bitmap: "classic_tab_up_dark",
            scale: 2,
            onTouchEvent: function(element, event){
                if(event.type == 'CLICK' && !this.isSelected){
                    switchPage('changelog');
                }
            }
        },
        "upTabChangelog_text": {
            type: "text",
            x: tabsSettings.width + tabImageSettings.size + tabImageSettings.padding*2,
            y: tabsSettings.height/2 - 11,
            z: 10,
            text: Translation.translate('Changelog'),
            font: {
                color: android.graphics.Color.DKGRAY,
                shadow: 0
            }
        },
        "upTabChangelog_image": {
            type: "image",
            z: 10,
            x: tabsSettings.width + tabImageSettings.padding,
            y: (tabsSettings.height - tabImageSettings.size)/2,
            bitmap: 'changelogImage',
            scale: tabImageSettings.size/16 
        },
        "frame": {
            type: "frame",
            x: 0,
            y: 50,
            width: 1000,
            height: ModInfoUI_changelog_height - 50,
            bitmap: "changelog_frame",
            scale: 2,
        }
    }
    thisWindows["main"] = new UI.Window({
        location: mainLocation, 
        drawing: [{
            type: "color",
            color: android.graphics.Color.TRANSPARENT
        }],
        elements: mainElements
    });

    var skipButton = false;
    var ModInfoUI_Button = new UI.Window({
        location: { x: DISPLAY.getWidth()*0.12107/*0.335*/*(1000/DISPLAY.getWidth()) - 70/2/* - UI.getScreenHeight()*0.0087962*/, y: UI.getScreenHeight()*0.4375, z: -1, width: 70, height: 70 }, 
        elements: {
            "button": {
                type: "button", x: 0, y: 0, scale: 1000/111, bitmap: "NativeButton", bitmap2: "NativeButtonPressed",
                clicker: {
                    onClick: function(){
                        switchPage('info');
                    }
                }
            },
            "image": {
                type: "image", x: 200, y: 200, z: 10, scale: 600/17, bitmap: controllerIconAnim
            }
        }
    });
    ModInfoUI_Button.setAsGameOverlay(true);
    var ModInfoUI_Button_Container = new UI.Container();

    var uisPadding = 40;
    var uisSidePadding = 20;
    var infoWindowLocation = { x: padding + uisPadding + uisSidePadding, y: padding + uisPadding + mainLocation.height/UI.getScreenHeight()*mainElements.frame.y, width: 1000 - padding*2 - uisPadding*2 - uisSidePadding*2, height: UI.getScreenHeight() - padding*2 - uisPadding*2 - (ModInfoUI_changelog_height/mainLocation.width*tabsSettings.height) };
    var infoWindowHeight = infoWindowLocation.height*1000/infoWindowLocation.width;
    var infoWindowSettins = {
        top: {
            height: infoWindowHeight*1.5/3,
            textPadding: 40
        }
    }
    var infoElements = {
        'image': {
            type: "image", 
            x: 0, 
            y: 0, 
            z: 10, 
            //scale: 14, 
            width: 224,
            height: 224,
            bitmap: FileTools.ReadImage(__dir__ + 'mod_icon.png')//controllerIconAnimWithoutShadow
        },
        'modName': {
            type: "text",
            x: 272,
            y: 23,
            text: mod.name,
            z: 10,
            font: {
                color: android.graphics.Color.WHITE,
                size: 40/562.5*UI.getScreenHeight(),//40,
                shadow: 0
            }
        },
        'modAuthor': {
            type: "text",
            x: 272,
            y: 0,
            text: Translation.translate('Author') + ' : ' + mod.author,
            z: 10,
            font: {
                color: android.graphics.Color.LTGRAY,
                size: 28/562.5*UI.getScreenHeight(),
                shadow: 0
            }
        },
        'modVersion': {
            type: "text",
            x: 272,
            y: 0,
            text: Translation.translate('Version') + ' : ' + mod.version,
            z: 10,
            font: {
                color: android.graphics.Color.LTGRAY,
                size: 20/562.5*UI.getScreenHeight(),
                shadow: 0
            }
        },
        'modLinks': {
            type: "text",
            x: 272,
            y: 0,
            text: Translation.translate('Links') + ' : ',
            z: 10,
            font: {
                color: android.graphics.Color.LTGRAY,
                size: 20/562.5*UI.getScreenHeight(),
                shadow: 0
            }
        },
        'modLink1': {
            type: "text",
            x: 0,
            y: 0,
            text: 'Original',
            z: 10,
            clicker: {
                onClick: function(){
                    var openURL = Intent(android.content.Intent.ACTION_VIEW);
                    openURL.data = Uri.parse("https://refinedmods.com/refined-storage/");
                    UI.getContext().startActivity(openURL);
                }
            },
            font: {
                color: android.graphics.Color.argb(255, 70, 70, 255),
                bold: true,
                underline: true,
                size: 20/562.5*UI.getScreenHeight(),
                shadow: 0
            }
        },
        'modLink2': {
            type: "text",
            x: 0,
            y: 0,
            text: 'DonationAlerts',
            z: 10,
            clicker: {
                onClick: function(){
                    var openURL = Intent(android.content.Intent.ACTION_VIEW);
                    openURL.data = Uri.parse("https://www.donationalerts.com/r/bot1023123123123");
                    UI.getContext().startActivity(openURL);
                }
            },
            font: {
                color: android.graphics.Color.argb(255, 70, 70, 255),
                bold: true,
                underline: true,
                size: 20/562.5*UI.getScreenHeight(),
                shadow: 0
            }
        },
        'modLink3': {
            type: "text",
            x: 0,
            y: 0,
            text: 'GitHub',
            z: 10,
            clicker: {
                onClick: function(){
                    var openURL = Intent(android.content.Intent.ACTION_VIEW);
                    openURL.data = Uri.parse("https://github.com/bot17171661/Refined-Storage");
                    UI.getContext().startActivity(openURL);
                }
            },
            font: {
                color: android.graphics.Color.argb(255, 70, 70, 255),
                bold: true,
                underline: true,
                size: 20/562.5*UI.getScreenHeight(),
                shadow: 0
            }
        },
        'credits': {
            type: "text",
            x: 272,
            y: 0,
            text: Translation.translate('Credits') + ' : Zero, DeimoN, Asasen, BANER, Hunabis, Dray',
            z: 10,
            font: {
                color: android.graphics.Color.LTGRAY,
                size: 16/562.5*UI.getScreenHeight(),
                shadow: 0
            }
        }
    }
    var infoWindowModInfoPadding = 10;
    infoElements['modAuthor'].y = infoElements['modName'].y + infoElements['modName'].font.size*1.1 + infoWindowModInfoPadding;
    infoElements['modVersion'].y = infoElements['modAuthor'].y + infoElements['modAuthor'].font.size*1.1 + infoWindowModInfoPadding;
    infoElements['modLinks'].y = infoElements['modVersion'].y + infoElements['modVersion'].font.size*1.1 + infoWindowModInfoPadding;
    infoElements['credits'].y = infoElements['modLinks'].y + infoElements['modLinks'].font.size*1.1 + infoWindowModInfoPadding;
    thisWindows["info"] = new UI.Window({
        location: infoWindowLocation, 
        drawing: [{
            type: "color",
            color: android.graphics.Color.TRANSPARENT
        }],
        elements: infoElements
    });
    thisWindows["info"].forceRefresh();

    var firstOpen = true;
    var textsArray = ['modLinks', 'modLink1', 'modLink2', 'modLink3'];
    var textsPadding = 15;
    thisWindows["info"].setEventListener({
        onOpen: function(window12){
            if(!firstOpen) return;
            firstOpen = false;
            for(var i = 0; i <= textsArray.length; i++){
                /* var elementIns = window12.getElements().get(textsArray[i]);
                var clazz = elementIns.getClass();
                var field = clazz.getDeclaredField("textBounds");
                field.setAccessible(true);
                var value = field.get(elementIns).width(); */
                var drawScale = window12.location.getDrawingScale();
                var _font = new JavaFONT(infoElements[textsArray[i]].font);
                var value = _font.getBounds(infoElements[textsArray[i]].text, infoElements[textsArray[i]].x * drawScale, infoElements[textsArray[i]].y * drawScale, parseFloat(1.0)).width();
                infoElements[textsArray[i]].textWidth = value;
                if(i == 0) continue;
                infoElements[textsArray[i]].x = infoElements[textsArray[i - 1]].x + infoElements[textsArray[i - 1]].textWidth + textsPadding;
                infoElements[textsArray[i]].y = infoElements[textsArray[i - 1]].y;
            }
        }
    })

    var changelogTexts = [];
    var changelogElements = {
        last: -1
    }
    var changelogWindowLocation = Object.assign({}, infoWindowLocation);
    //changelogWindowLocation.scrollY = 100;
    thisWindows["changelog"] = new UI.Window({
        location: changelogWindowLocation, 
        drawing: [{
            type: "color",
            color: android.graphics.Color.TRANSPARENT
        }],
        elements: changelogElements
    });
    thisWindows["changelog"].forceRefresh();

    var donationsWindowLocation = Object.assign({}, infoWindowLocation);
    donationsWindowLocation.x += donationsWindowLocation.width*0.7;
    donationsWindowLocation.width *= 0.3;
    donationsWindowLocation.height = thisWindows["info"].location.windowToGlobal(224);
    var donationsWindowHeight = donationsWindowLocation.height*1000/donationsWindowLocation.width;
    var _yoffset = (donationsWindowHeight - 70)/5.5;
    var donationsElements = {
        'header': {
            type: "text",
            x: 100,
            y: 10,
            text: Translation.translate('Top donaters'),
            needWidth: 900,
            z: 10,
            font: {
                color: android.graphics.Color.argb(255, 251, 140, 43),//android.graphics.Color.argb(255, 225, 225, 0),
                bold: true,
                size: 1,
                shadow: 0
            }
        }
    }
    thisWindows["donations"] = new UI.Window({
        location: donationsWindowLocation, 
        drawing: [{
            type: "color",
            color: /* android.graphics.Color.argb(76, 76, 76, 100) */android.graphics.Color.TRANSPARENT
        }],
        elements: donationsElements
    });
    thisWindows["donations"].forceRefresh();
    var firstOpen2 = true;
    var textsArray2 = ['header'];
    thisWindows["donations"].setEventListener({
        onOpen: function(window12){
            if(!firstOpen2) return;
            firstOpen2 = false;
            for(var i = 0; i < textsArray2.length; i++){
                var _name = textsArray2[i];
                var drawScale = window12.location.getDrawingScale();
                var _font = new JavaFONT(donationsElements[_name].font);
                var value = _font.getBounds(donationsElements[_name].text, donationsElements[_name].x * drawScale, donationsElements[_name].y * drawScale, parseFloat(1.0)).width();
                donationsElements[_name].font.size = Math.min(parseFloat(donationsElements[_name].needWidth/value), 70);
                //alert(donationsElements[_name].font.size);
                var _font = new JavaFONT(donationsElements[_name].font);
                var value = _font.getBounds(donationsElements[_name].text, donationsElements[_name].x * drawScale, donationsElements[_name].y * drawScale, parseFloat(1.0)).width();
                donationsElements[_name].x = 500 - value/2;
            }
            window12.forceRefresh();
        }
    });
    
    var donaters = getUrlContent('https://raw.githubusercontent.com/bot17171661/RefinedStorageDon/main/info.json', true).data;
    if(donaters)for(var k in donaters){
        donationsElements['d' + k] = {
            type: "text",
            x: 100,
            y: 10 + _yoffset*(Number(k) + 1),
            text: donaters[k].username + "  -  " + donaters[k].amount + " " + donaters[k].currency,
            needWidth: 900,
            z: 10,
            font: {
                color: android.graphics.Color.argb(255, 251, 140, 43),//android.graphics.Color.argb(255, 225, 225, 0),
                //bold: true,
                size: 1,
                shadow: 0
            }
        }
        textsArray2.push('d' + k);
    }
    thisWindows["donations"].forceRefresh();

    Callback.addCallback('NativeGuiChanged', function(name, lastName, isPushEvent){
        if(name == 'start_screen' && !thisWindows['main'].isOpened())
            ModInfoUI_Button_Container.openAs(ModInfoUI_Button);
        else if(ModInfoUI_Button_Container.isOpened())
            ModInfoUI_Button_Container.close();
    })
    Callback.addCallback('PostLoaded', function(){
        if(skipButton) return;
        ModInfoUI_Button_Container.openAs(ModInfoUI_Button);
    }, -10000);

    function switchPage(name){
        for(var i in mainWindows){
            if(!thisWindows[mainWindows[i]].isOpened())thisWindows[mainWindows[i]].open();
        }
        switch(name){
            case 'info' || 'upTabInfo':
                for(var i in mainElements){
                    if(i == 'upTabInfo' || !mainElements[i].isTab) continue;
                    mainElements[i].isSelected = false;
                    mainElements[i].z = -1;
                    mainElements[i].bitmap = 'classic_tab_up_dark';
                }
                mainElements['upTabInfo'].isSelected = true;
                mainElements['upTabInfo'].z = 1;
                mainElements['upTabInfo'].bitmap = 'classic_tab_up_light';
                mainElements['upTabInfo'].bitmap = 'classic_tab_up_light_left';

                for(var i in changelogWindows)if(thisWindows[changelogWindows[i]].isOpened())thisWindows[changelogWindows[i]].close();
                for(var i in infoWindows)if(!thisWindows[infoWindows[i]].isOpened())thisWindows[infoWindows[i]].open();
            break;
            case 'changelog' || 'upTabChangelog':
                for(var i in mainElements){
                    if(i == 'upTabChangelog' || !mainElements[i].isTab) continue;
                    mainElements[i].isSelected = false;
                    mainElements[i].z = -1;
                    if(i == 'upTabInfo'){
                        mainElements[i].bitmap = 'classic_tab_up_dark_left';
                        continue
                    }
                    mainElements[i].bitmap = 'classic_tab_up_dark';
                }
                mainElements['upTabChangelog'].isSelected = true;
                mainElements['upTabChangelog'].z = 1;
                mainElements['upTabChangelog'].bitmap = 'classic_tab_up_light';

                for(var i in infoWindows)if(thisWindows[infoWindows[i]].isOpened())thisWindows[infoWindows[i]].close();
                for(var i in changelogWindows)if(!thisWindows[changelogWindows[i]].isOpened())thisWindows[changelogWindows[i]].open();
            break;
        }
    }

    if(!Config.changelogEnabled) return;
    _setTip('[RefinedStoragePE] Getting versions info');

    var versionsMap = getUrlContent('https://raw.githubusercontent.com/bot17171661/RefinedStorageChangelog/master/map.txt');
    if(versionsMap.data)versionsMap = JSON.parse(versionsMap.data);
    else return;

    function getNewestVersion(){
        /* var data = getUrlContent('https://icmods.mineprogramming.org/mod?id=' + MODID);
        if(data.error)alert("Error: " + JSON.stringify(data.error));
        if(data.error) return 0;
        var _code = '<span class="version">';
        var index1 = data.data.indexOf(_code) + _code.length + 1;
        var string = data.data.substr(index1, data.data.indexOf(']', index1) - index1);
        return string.replace(/[^A-Za-z0-9_\s\.]/g, ''); */
        return versionsMap[0];
    }
    
    function parseVersion(_version){
        if(versionsMap.indexOf(_version) == -1) return false;
        var _version_data = getUrlContent('https://raw.githubusercontent.com/bot17171661/RefinedStorageChangelog/master/' + _version + '.txt');
        if(_version_data.error) return false;
        _version_data = _version_data.data;
        var texts = {};
        var splited = _version_data.split('\n\n');
        for(var i in splited){
            var _index = splited[i].indexOf(':');
            texts[splited[i].substr(0, _index).replace(/(\n|\t|﻿)+/g, '')] = splited[i].substr(_index + 1);
        }
        changelogTexts.push(texts.en);
        Translation.addTranslation(texts.en, texts);
        return true;
    }
    function nextChangelog(){
        if(!goToChangelog(changelogElements.last + 1)) return false;
    }

    function goToChangelog(_id){
        if(changelogTexts[_id]) return false;
        if(!parseVersion(versionsMap[_id])) return false;
        var _y = changelogEnabled ? 100 : 0;
        if(_id > 0){
            _y = changelogElements["frame" + (_id - 1)].y + changelogElements["frame" + (_id - 1)].height + 5;
        }
        if(_id == 0 && changelogEnabled){
            changelogElements["newVersionNotification"] = {
                type: "text",
                id: _id,
                x: 30,
                y: 30,
                text: Translation.translate('Hey, new version is available, please, update'),
                z: 10,
                multiline: true,
                font: {
                    color: android.graphics.Color.WHITE,
                    size: 35/562.5*UI.getScreenHeight(),
                    shadow: 0
                }
            }
        }
        changelogElements["frame" + _id] = {
            type: "frame",
            id: _id,
            x: 0,
            y: _y,
            z: -1,
            width: 1000,
            height: 125,
            bitmap: "grayFrame",
            scale: 3,
            onTouchEvent: function(element, event){
                if(event.type == 'MOVE' && !this.moving){
                    this.moving = true;
                    var __id = changelogElements.last + 1;
                    if(changelogTexts[__id]) return false;
                    if(!versionsMap[_id]) return false;
                    var craftsThread = java.lang.Thread({
                        run: function(){
                            try {
                                for(var i = 0; i < 3; i++)nextChangelog();
                            } catch(err){
                                alert('Sorry, i broke :_(' + JSON.stringify(err));
                            }
                        }
                    });
                    craftsThread.setPriority(java.lang.Thread.MIN_PRIORITY);
                    craftsThread.start();

                }
            }
        }
        thisWindows["changelog"].location.setScroll(0, thisWindows["changelog"].location.windowToGlobal(_y + 125));
        if(thisWindows["changelog"].isOpened())thisWindows["changelog"].updateWindowLocation();
        changelogElements["versionText" + _id] = {
            type: "text",
            id: _id,
            x: changelogElements["frame" + _id].x + 15,
            y: changelogElements["frame" + _id].y + 15,
            text: versionsMap[_id] + ':',
            z: 10,
            multiline: true,
            font: {
                color: android.graphics.Color.WHITE,
                size: 30,
                shadow: 0
            }
        }
        var descrText = Translation.translate(changelogTexts[_id]);
        var symbolsLength = 50;
		descrText = descrText.split('\n').map(function(value){
            var last_sim = 0; 
            if(value.length > symbolsLength)for (var i = 0; i < Math.trunc(value.length / symbolsLength); i++) {
                var indexOf = value.substr(last_sim, symbolsLength).lastIndexOf(" ");
                value = setCharAt(value, indexOf + last_sim, "\n");
                last_sim += indexOf;
            }
            return value;
        }).join('\n');
        changelogElements["descriptionText" + _id] = {
            type: "text",
            id: _id,
            x: changelogElements["frame" + _id].x + 50,
            y: changelogElements["frame" + _id].y + 65,
            text: descrText,
            z: 10,
            multiline: true,
            font: {
                color: android.graphics.Color.WHITE,
                size: 20,
                shadow: 0
            }
        }
        changelogElements["frame" + _id].height += (descrText.split('\n').length - 1) * (changelogElements["descriptionText" + _id].font.size*1.1 + 2);
        changelogElements.last = _id;
        thisWindows["changelog"].location.setScroll(0, thisWindows["changelog"].location.windowToGlobal(_y + changelogElements["frame" + _id].height));
        if(thisWindows["changelog"].isOpened())thisWindows["changelog"].updateWindowLocation();
        return true;
    }

    function initMainChangelogVersions(){
        for(var i = 0; i < 5; i++)nextChangelog();
    }

    var newest_version = getNewestVersion();
    if(newest_version == 0)return initMainChangelogVersions();
    if(mod.version == newest_version) return initMainChangelogVersions();
    changelogEnabled = true;
    initMainChangelogVersions();

    mainElements['newVersionImage'] = {
        type: "image",
        x: tabsSettings.width + tabImageSettings.padding + tabImageSettings.size/3,
        y: (tabsSettings.height - tabImageSettings.size)/2 + tabImageSettings.size/3,
        z: 12,
        bitmap: ['newVersionImage', 'newVersionImage2', 'newVersionImage3', 'newVersionImage4', 'newVersionImage5', 'newVersionImage4', 'newVersionImage3', 'newVersionImage2'],
        scale: tabImageSettings.size*(2/3)/21 
    }
    skipButton = true;
    var jinterval;
    thisWindows['main'].setEventListener({
        onClose: function(){
            if(skipButton){
                ModInfoUI_Button_Container.openAs(ModInfoUI_Button);
                skipButton = false;
            }
            jClearInterval(jinterval);
        },
        onOpen: function(){
            jinterval = jSetInterval(runOnUiThread(function(){
                var element = thisWindows['main'].getElements().get("newVersionImage");
                if(element)createAnim([0, 5, 0], 200, function(value){
                    element.setPosition(mainElements['newVersionImage'].x, mainElements['newVersionImage'].y - value);
                })
            }, true), 3000)
        }
    })
    Callback.addCallback('PostLoaded', function(){
        switchPage('changelog');
    }, -10001);
    return;

})()




// file: shared.js

ModAPI.registerAPI("RefinedStorageAPI", {
    requireGlobal: function (command) {
        return eval(command);
    },
    RefinedStorage: RefinedStorage,
    Disk: Disk,
    controllerAPI: controllerFuncs,
    gridAPI: gridFuncs,
    craftingGridAPI: craftingGridFuncs
});
Logger.Log("RefinedStorageAPI Loaded", "API");




