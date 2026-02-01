/*
BUILD INFO:
  dir: dev
  target: main.js
  files: 18
*/



// file: header.js

IMPORT('StorageInterface');
const ScriptableObjectHelper = WRAP_JAVA('com.zhekasmirnov.innercore.api.mod.ScriptableObjectHelper');
const JavaFONT = WRAP_JAVA('com.zhekasmirnov.innercore.api.mod.ui.types.Font');

var _players = [];
Callback.addCallback('ServerPlayerLoaded', function(player__){
	_players =  Network.getConnectedPlayers();
});

function chatMessage(client, text){
	if(typeof(client) == 'string'){
		Game.message(client);
	} else {
		if(typeof(client) == "number") client = Network.getClientForPlayer(client);
		client.send("Utils.chatMessage", {text: text});
	}
}

function tipMessage(client, text){
	if(typeof(client) == 'string'){
		Network.sendToAllClients('Utils.tipMessage', {text: client});
	} else {
		if(typeof(client) == "number") client = Network.getClientForPlayer(client);
		client.send("Utils.tipMessage", {text: text});
	}
}

Network.addClientPacket('Utils.tipMessage', function(packetData){
	Game.tipMessage(packetData.text);
});

Network.addClientPacket('Utils.chatMessage', function(packetData){
	Game.message(packetData.text);
});




// file: commands.js

/* Callback.addCallback("NativeCommand", function(str) {
    if (str.substr(0, 6) == '/utils') {
		Game.prevent();
        var commands = str.substr(7).split(" ");
        if (commands[0] == "execute") {
            if (commands.length == 1) return Game.message("/utils execute [command]");
            eval(str.substr(15));
        } else if (commands[0] == "get") {
            if (commands[1] == "death_items") {
                if (!__config__.getBool("grave")) return Game.message("grave is disabled");
                if (commands.length == 2) return Game.message("/utils get death_items [id]");
                if (!title_death_datas[+commands[2]]) return Game.message("§cWrong params!");
                var pos = Player.getPosition();
                pos.y -= 1;
                World.setBlock(pos.x, pos.y, pos.z, BlockID.grave, 0);
                World.addTileEntity(pos.x, pos.y, pos.z)
                for (var i in title_death_datas[+commands[2]].items) {
                    var Item = title_death_datas[+commands[2]].items[i];
                    World.getContainer(pos.x, pos.y, pos.z).getSlot("slot" + i).id = Item.id;
                    World.getContainer(pos.x, pos.y, pos.z).getSlot("slot" + i).count = Item.count;
                    World.getContainer(pos.x, pos.y, pos.z).getSlot("slot" + i).data = Item.data;
                    World.getContainer(pos.x, pos.y, pos.z).getSlot("slot" + i).extra = Item.extra;
                }
            } else {
                Game.message("death_items");
            }
        } else {
            Game.message("execute, get");
        }
    }
}); */




// file: other.js

const BitmapFactory = android.graphics.BitmapFactory;
const Bitmap = android.graphics.Bitmap;

const Timer = java.util.Timer;
const TimerTask = java.util.TimerTask;

const JAVA_ANIMATOR = android.animation.ValueAnimator;
const JAVA_HANDLER = android.os.Handler;
const LOOPER_THREAD = android.os.Looper;
const JAVA_HANDLER_THREAD = new JAVA_HANDLER(LOOPER_THREAD.getMainLooper());
const JavaFONT_ = WRAP_JAVA('com.zhekasmirnov.innercore.api.mod.ui.types.Font');

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
		id: Number(splits[0]),
		data: Number(splits[1]),
		extra: splits[2] ? Number(splits[2]) : null
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

function getTextElementWidth(_textElement, drawScale){
	var _font = new JavaFONT_(_textElement.font);
	var width = _font.getBounds(_textElement.text, _textElement.x * drawScale, _textElement.y * drawScale, parseFloat(1.0)).width();
	return width;
}




// file: translate.js

Translation.addTranslation("XP Storage", {ru: "Хранилище опыта"});
Translation.addTranslation("Builder wand", {ru: "Палочка строителя"});
Translation.addTranslation("World Clock", {ru: "Мировые часы"});
Translation.addTranslation("Magnet", {ru: "Магнит"});
Translation.addTranslation("Item Collector", {ru: "Сборщик предметов"});
Translation.addTranslation("Concentrated dust", {ru: "Концентрированная пыль"});
Translation.addTranslation("Hammer", {ru: "Молот"});
Translation.addTranslation("Flacon for souls", {ru: "Флакон для душ"});
Translation.addTranslation("Flacon with soul", {ru: "Флакон с душой"});
Translation.addTranslation("Description of death", {ru: "Описание смерти"});
Translation.addTranslation("Update frequency (in ticks)", {ru: "Частота обновления (в тиках)"});
Translation.addTranslation("Extraction pipe", {ru: "Извлекающая труба"});
Translation.addTranslation("Item pipe", {ru: "Предметная труба"});
Translation.addTranslation("Wrench", { ru: "Гаечный ключ" });
Translation.addTranslation("1 second = 20 ticks", { ru: "1 секунда = 20 тиков" });
Translation.addTranslation("Angel Ring", {"cs":"Andělský prsten","de":"Engelsring","es":"Aureola de Ángel","fr":"Anneau d'Ange ","ko":"천사의 고리","pl":"Anielski pierścień","pt":"Anel de Anjo","ru":"Ангельское кольцо","zh":"天使指环"});
Translation.addTranslation("Invisible Wings", {"cs":"Neviditelná křídla","de":"Unsichtbare Flügel","es":"Alas Invisibles","fr":"Ailes invisibles ","ko":"투명 날개","pl":"Niewidzialne skrzydła","pt":"Asas Invisíveis","ru":"Невидимые крылья","zh":"隐形翅膀"});
Translation.addTranslation("Feathery Wings", {"cs":"Pírková křídla","de":"Federartige Flügel","es":"Alas con Plumas","fr":"Ailes d'Icare ","ko":"깃털 날개","pl":"Piórowe skrzydła","pt":"Asas com Penas","ru":"Пернатые крылья","zh":"羽翼"});
Translation.addTranslation("Fairy Wings", {"cs":"Vílí křídla","de":"Feenflügel","es":"Alas de Hada","fr":"Ailes féeriques ","ko":"요정의 날개","pl":"Wróżkowe skrzydła","pt":"Asas de Fada","ru":"Волшебные крылья","zh":"精灵之翼"});
Translation.addTranslation("Dragon Wings", {"cs":"Dračí křídla","de":"Drachenflügel","es":"Alas de Dragón","fr":"Ailes dragoniques ","ko":"용의 날개","pl":"Smocze skrzydła","pt":"Asas de Dragão","ru":"Драконьи крылья","zh":"龙翼"});
Translation.addTranslation("Golden Wings", {"cs":"Zlatá křídla","de":"Goldene Flügel","es":"Alas Doradas","fr":"Ailes dorées ","ko":"황금 날개","pl":"Złote skrzydła","pt":"Asas de Ouro","ru":"Золотые крылья","zh":"黄金之翼"});
Translation.addTranslation("Dark Wings", {"cs":"Tmavá křídla","de":"Dunkle Flügel","es":"Alas Oscuras","fr":"Ailes sombres ","ko":"어둠의 날개","pl":"Ciemne skrzydła","pt":"Asas Negras","ru":"Тёмные крылья","zh":"暗之翼"});




// file: items/angelRing.js

IDRegistry.genItemID("angelRing");
Item.createItem("angelRing", "Angel ring", {
	name: "angelRing"
}, {
	stack: 1,
	isTech: true
});
mod_tip(ItemID.angelRing);
var baubleEquip = false;
var ringEquiped = false;

var ringVariations = [
	{
		name: 'Invisible Wings',
		texture: 'wings/wing0'
	},
	{
		name: 'Feathery Wings',
		texture: 'wings/wing1'
	},
	{
		name: 'Fairy Wings',
		texture: 'wings/wing2'
	},
	{
		name: 'Dragon Wings',
		texture: 'wings/wing3'
	},
	{
		name: 'Golden Wings',
		texture: 'wings/wing4'
	},
	{
		name: 'Dark Wings',
		texture: 'wings/wing5'
	}
];
var netherStarId = InnerCore_pack.packVersionCode > 108  ? 763 : VanillaItemID.netherstar;
var dyeId5 = InnerCore_pack.packVersionCode > 108 ? 825 : VanillaItemID.dye;
var dyeId9 = InnerCore_pack.packVersionCode > 108 ? 837 : VanillaItemID.dye;
var isrequiredDyeData = dyeId5 == 351;
Recipes.addShaped({
	id: ItemID.angelRing,
	count: 1,
	data: 0
}, [
	"g#g",
	"#s#",
	" # "
], ['s', netherStarId, 0, '#', VanillaItemID.gold_ingot, 0, 'g', 20, 0]);

Recipes.addShaped({
	id: ItemID.angelRing,
	count: 1,
	data: 1
}, [
	"g#g",
	"#s#",
	" # "
], ['s', netherStarId, 0, '#', VanillaItemID.gold_ingot, 0, 'g', 288, 0]);

Recipes.addShaped({
	id: ItemID.angelRing,
	count: 1,
	data: 2
}, [
	"g#c",
	"#s#",
	" # "
], ['s', netherStarId, 0, '#', VanillaItemID.gold_ingot, 0, 'g', dyeId5, isrequiredDyeData ? 5 : 0, 'c', dyeId9, isrequiredDyeData ? 9 : 0]);

Recipes.addShaped({
	id: ItemID.angelRing,
	count: 1,
	data: 3
}, [
	"g#g",
	"#s#",
	" # "
], ['s', netherStarId, 0, '#', VanillaItemID.gold_ingot, 0, 'g', 334, 0]);

Recipes.addShaped({
	id: ItemID.angelRing,
	count: 1,
	data: 4
}, [
	"g#g",
	"#s#",
	" # "
], ['s', netherStarId, 0, '#', VanillaItemID.gold_ingot, 0, 'g', 371, 0]);

Recipes.addShaped({
	id: ItemID.angelRing,
	count: 1,
	data: 5
}, [
	"g#c",
	"#s#",
	" # "
], ['s', netherStarId, 0, '#', VanillaItemID.gold_ingot, 0, 'g', 263, 0, 'c', 263, 1]);

Item.addCreativeGroup("angelRings", Translation.translate("Angel Rings"), [ItemID.angelRing]);

for(var i in ringVariations)Item.addToCreative(ItemID.angelRing, 1, i);

Item.registerNameOverrideFunction(ItemID.angelRing, function(item, name){
	return name + (ringVariations[item.data] ? '\n§7' + Translation.translate(ringVariations[item.data].name) : "");
});

Item.registerIconOverrideFunction(ItemID.angelRing, function(item){
	return {name: 'angelRing', data: ringVariations[item.data] ? item.data : 0};
});

(function(){
	var superTempPlayerSetFlyingEnabled = Player.setFlyingEnabled;
	var superTempPlayerSetFlying = Player.setFlying;
	Player.setFlyingEnabled = function(enabled, forced){
		if(enabled || !ringEquiped || forced)superTempPlayerSetFlyingEnabled(enabled);
	}
	Player.setFlying = function(enabled, forced){
		if(enabled || !ringEquiped || forced)superTempPlayerSetFlying(enabled);
	}
})();

var EntityDataAPI = ModAPI.requireGlobal('EntityDataRegistry');

var wingVertexData = [[0,0,0,0,0],[0,0,1,16,0],[0,-1,0,0,16],[0,-1,1,16,16],[0,0,1,16,0],[0,-1,0,0,16]];
var tickTime = 0;
Callback.addCallback("LocalTick", function() {
	tickTime++;
	var threadTime = World.getThreadTime();
	if(threadTime%2 == 0 && (playerRingData = playerRenders[Player.get()])) {
		playerRingData.inRange = true;
		playerRingData.isFlying = Player.getFlying();
		if (!ringEquiped) {
			if (item = searchItem(ItemID.angelRing)) {
				if(InnerCore_pack.packVersionCode > 108 && playerRingData.lastTexture != (playerRingData.lastTexture = (playerRingData.texture = ringVariations[item.data].texture))){
					playerRingData.render.setTexture(playerRingData.texture);
				}
				Player.setFlyingEnabled(true);
				ringEquiped = true;
				playerRingData.ringEquiped = true;
			}
		} else if (ringEquiped/*  && !baubleEquip */) {
			if (!(item = searchItem(ItemID.angelRing))) {
				ringEquiped = false;
				playerRingData.ringEquiped = false;
				if(Game.getGameMode() != 1){
					Player.setFlyingEnabled(false);
					Player.setFlying(false);
				}
			} else {
				if(!Player.getFlyingEnabled())Player.setFlyingEnabled(true);
				if(InnerCore_pack.packVersionCode > 108 && playerRingData.lastTexture != (playerRingData.lastTexture = (playerRingData.texture = ringVariations[item.data].texture))){
					playerRingData.render.setTexture(playerRingData.texture);
				}
			}
		}
	}
	if(InnerCore_pack.packVersionCode <= 108) return;
	var settings_ = playerRenders[Player.get()];
	if(!settings_) return;
	var xRotate = (1 + Math.cos((tickTime) / 4)) * (settings_.isFlying ? 20 : 2) + 25;
	var wing1 = settings_.wing1;
	var wing2 = settings_.wing2;
	wing1.clear();
	wing2.clear();
	if(settings_.ringEquiped && settings_.texture != 'wings/wing0'){
		wing1.setNormal(0, 0, 1);
		wing2.setNormal(0, 0, 1);
		/* wing1.setColor(1, 1, 1, 1);
		wing2.setColor(1, 1, 1, 1); */
		for(var i in wingVertexData){
			wing1.addVertex(wingVertexData[i][0],wingVertexData[i][1],wingVertexData[i][2],wingVertexData[i][3],wingVertexData[i][4]);
			wing2.addVertex(wingVertexData[i][0],wingVertexData[i][1],wingVertexData[i][2],wingVertexData[i][3],wingVertexData[i][4]);
		}
		wing1.rotate(0,1,0,0, -xRotate * Math.PI/180 - (settings_.isFlying ? 0 : 0.5), 0);
		wing2.rotate(0,1,0,0, xRotate * Math.PI/180 + (settings_.isFlying ? 0 : 0.5), 0);
	}
	wing1.invalidate();
	wing2.invalidate();
});

Callback.addCallback("LocalTick", function() {
	if(InnerCore_pack.packVersionCode > 108)for(var i in _players){
		if(_players[i] == Player.get()) continue;
		var settings_ = playerRenders[_players[i]];
		if(!settings_ || !settings_.inRange) continue;
		var xRotate = (1 + Math.cos((tickTime) / 4)) * (settings_.isFlying ? 20 : 2) + 25;
		var wing1 = settings_.wing1;
		var wing2 = settings_.wing2;
		wing1.clear();
		wing2.clear();
		if(settings_.ringEquiped && settings_.texture != 'wings/wing0'){
			wing1.setNormal(0, 0, 1);
			wing2.setNormal(0, 0, 1);
			/* wing1.setColor(1, 1, 1, 1);
			wing2.setColor(1, 1, 1, 1); */
			for(var i in wingVertexData){
				wing1.addVertex(wingVertexData[i][0],wingVertexData[i][1],wingVertexData[i][2],wingVertexData[i][3],wingVertexData[i][4]);
				wing2.addVertex(wingVertexData[i][0],wingVertexData[i][1],wingVertexData[i][2],wingVertexData[i][3],wingVertexData[i][4]);
			}
			wing1.rotate(0,1,0,0, -xRotate * Math.PI/180 - (settings_.isFlying ? 0 : 0.5), 0);
			wing2.rotate(0,1,0,0, xRotate * Math.PI/180 + (settings_.isFlying ? 0 : 0.5), 0);
		}
		wing1.invalidate();
		wing2.invalidate();
	}
}, -100);


Callback.addCallback("tick", function() {
	var threadTime = World.getThreadTime();
	if(InnerCore_pack.packVersionCode <= 108) return;
	if(threadTime%30 == 0){
		//var tipText = "";
		//tipText += 'allPlayers: ' + _players + '\n';
		for(var i in _players){
			var sendUpdate = false;
			var playerUid = _players[i];
			var playerSettings = serverPlayerRenders[playerUid];
			//tipText += '-----Player: ' + playerUid + '\n';
			if(!playerSettings) continue;
			var tag = Entity.getCompoundTag(playerUid);
			if(tag){
				var tagAbilities = tag.getCompoundTag('abilities');
				if(playerSettings.lastIsFlying != (playerSettings.lastIsFlying = (playerSettings.isFlying = (tagAbilities ? !!tagAbilities.getByte('flying') : false)))) sendUpdate = true;
				//tipText += "tagAbilities: " + !!tagAbilities/* (tagAbilities ? JSON.stringify(tagAbilities.toScriptable()) : null) */ + '\n';
				if(tagAbilities){
					//tipText += 'flying: ' + tagAbilities.getByte('flying') + '\n';
				}
			}
			if (!playerSettings.ringEquiped) {
				if (item = searchItem(ItemID.angelRing, -1, -1, false, false, playerUid)) {
					playerSettings.lastTexture = playerSettings.texture = ringVariations[item.data].texture;
					playerSettings.ringEquiped = true;
					sendUpdate = true;
				}
			} else if (playerSettings.ringEquiped/*  && !baubleEquip */) {
				if (!(item = searchItem(ItemID.angelRing, -1, -1, false, false, playerUid))) {
					playerSettings.ringEquiped = false;
					sendUpdate = true;
				} else {
					if(playerSettings.lastTexture != (playerSettings.lastTexture = (playerSettings.texture = ringVariations[item.data].texture))){
						sendUpdate = true;
					}
				}
			}
			if(sendUpdate) {
				var _PlayerActor = new PlayerActor(playerUid);
				for(var pl in _players){
					var playerUid2 = _players[pl];
					if(playerUid2 == playerUid) continue;
					var __PlayerActor = new PlayerActor(playerUid2);
					var distance = Entity.getDistanceToEntity(playerUid, playerUid2);
					if(distance >= 128 || _PlayerActor.getDimension() != __PlayerActor.getDimension()){
						if(playerSettings.inRange) playerSettings.inRange = false;
						else continue;
					} else playerSettings.inRange = true;
					var client = Network.getClientForPlayer(playerUid2);
					if(client)client.send('Utils.updatePlayerServerData', {player: playerUid, serverData: playerSettings});
				}
			}
			//tipText += 'playerSettings: ' + JSON.stringify(playerSettings) + '\n';
		}
	}
}, -10);

/* ModAPI.addAPICallback("BaublesAPI", function(api) {
	api.Baubles.registerBauble({
		id: ItemID.angelRing,
		type: "ring",
		onEquip: function() {
			Player.setFlyingEnabled(true);
			ringEquiped = true;
			baubleEquip = true;
		},
		onTakeOff: function() {
			ringEquiped = false;
			baubleEquip = false;
			Player.setFlyingEnabled(false);
			Player.setFlying(false);
		}
	});
}) */

Callback.addCallback("EntityHurt", function(attacker, victim, damage, damageType) {
	if (serverPlayerRenders[victim] && serverPlayerRenders[victim].ringEquiped && damageType == 5) {
		Game.prevent();
	}
});

Callback.addCallback('LevelLeft', function(){
	baubleEquip = false;
	ringEquiped = false;
	_players = [];
	playerRenders = {};
	serverPlayerRenders = {};
});

var playerRenders = {};
var serverPlayerRenders = {};

Callback.addCallback('ServerPlayerLoaded', function(player__){
	serverPlayerRenders[player__] = {
		ringEquiped: false,
		isFlying: false,
		lastIsFlying: false,
		texture: '',
		lastTexture: '',
		inRange: false
	}
	Network.sendToAllClients('Utils.updatePlayers', {players: Network.getConnectedPlayers(), player: player__, serverPlayersData: serverPlayerRenders});
});

function createWingsObject(_player){
	//if(!EntityDataAPI.entityData[_player]) return false;
	var __object = playerRenders[_player] = {};
	__object.ringEquiped = false;
	__object.isFlying = false;
	__object.lastTexture = '';
	__object.texture = '';
	if(InnerCore_pack.packVersionCode <= 108) return true;
	__object.wing1 = new RenderMesh();
	__object.wing2 = new RenderMesh();
	__object.render = new ActorRenderer();
	__object.attachable = new AttachableRender(_player);
	__object.render.addPart('body').endPart().addPart('wing1', 'body', __object.wing1).setOffset(1, -4, 1.5).endPart().addPart('wing2', 'body', __object.wing2).setOffset(-1, -4, 1.5).endPart();
	__object.attachable.setRenderer(__object.render);
	return true;
}

Network.addClientPacket('Utils.updatePlayers', function(packetData){
	_players = packetData.players;
	var serverPlayersData = packetData.serverPlayersData;
	for(var i in _players){
		if(!playerRenders[_players[i]]){
			createWingsObject(_players[i])
		}
		if(_players[i] != Player.get() && serverPlayersData[_players[i]]){
			Object.assign(playerRenders[_players[i]], serverPlayersData[_players[i]])
		}
	}
});

Network.addClientPacket('Utils.updatePlayerServerData', function(packetData){
	var serverData = packetData.serverData;
	var _player = packetData.player;
	if(_player != Player.get() && playerRenders[_player]){
		Object.assign(playerRenders[_player], serverData);
		if(InnerCore_pack.packVersionCode > 108)playerRenders[_player].render.setTexture(serverData.texture);
	}
});




// file: items/builderWand.js

IDRegistry.genItemID("builderWand");
Item.createItem("builderWand", "Builder wand", {name: "builderWand"}, {stack: 1});
mod_tip(ItemID.builderWand);

Recipes.addShaped({id: ItemID.builderWand, count: 1, data: 0}, [
	" gg",
	" sg",
	"s  "
], ['s', 280, 0, 'g', 266, 0]);

var BWCoordsMap = [
	[1, 0, 1],
	[1, 0, 1],
	[1, 1, 0],
	[1, 1, 0],
	[0, 1, 1],
	[0, 1, 1]
];

var num_to_xyz = ['x','y','z'];
var _builderWandBlockLimit = __config__.getNumber('builderWandBlockLimit');

function justFunc1(_coords, _side, _block, _blockSource, _player){
	var _playerActor = new PlayerActor(_player);
	var temp_array = [];
	var blocksPlaced = 0;
	var gamemode = _playerActor.getGameMode();
	var builderWandBlockLimit = gamemode == 1 ? _builderWandBlockLimit*2 : _builderWandBlockLimit;
	var item;
	var itemCount = 0;
	if(gamemode != 1){
		item = searchItem(_block.id, _block.data);
		if(!item)return;
		itemCount = item.count + 0;
	}
	//Logger.Log('StartLine -----------------------------------------------------------------', 'UTILS+');
	function justFunc(array_of_coords, outcoords){
		var coords_array = [];
		for(var s in array_of_coords){
			var coords = array_of_coords[s];
			if(temp_array.indexOf(cts(coords)) != -1) continue
			temp_array.push(cts(coords));
			coords.relative = World.getRelativeCoords(coords.x, coords.y, coords.z, _side);
			var block1 = _blockSource.getBlock(coords.x, coords.y, coords.z);
			var blockOnThisCoords = _blockSource.getBlock(coords.relative.x, coords.relative.y, coords.relative.z);
			if(blocksPlaced >= builderWandBlockLimit || (gamemode != 1 && (!item || !item.count || itemCount <= 0))) return;
			if((blockOnThisCoords.id != 0 || !World.canTileBeReplaced(blockOnThisCoords.id, blockOnThisCoords.data)) || block1.id != _block.id || block1.data != _block.data) continue;
			blocksPlaced++;
			_blockSource.setBlock(coords.relative.x, coords.relative.y, coords.relative.z, _block.id, _block.data);
			if(gamemode != 1){
				itemCount--;
				_playerActor.setInventorySlot(item.slot, item.id, itemCount, item.data, item.extra);
				if(!item.count || itemCount <= 0){
					item = searchItem(_block.id, _block.data);
				}
			}
			var temp_coords = {};
			//Logger.Log('Coords map: ' + BWCoordsMap[_side], 'UTILS+');
			for(var i = 0; i < 3; i++){
				//Logger.Log('Call on ' + num_to_xyz[i] + ' side', 'UTILS+');
				if(BWCoordsMap[_side][i] == 0)continue;
				temp_coords.x = coords.x + 0;
				temp_coords.y = coords.y + 0;
				temp_coords.z = coords.z + 0;
				temp_coords[num_to_xyz[i]] = coords[num_to_xyz[i]] + BWCoordsMap[_side][i];
				coords_array.push(Object.assign({}, temp_coords));
				temp_coords[num_to_xyz[i]] = coords[num_to_xyz[i]] - BWCoordsMap[_side][i];
				coords_array.push(Object.assign({}, temp_coords));
			}
		}
		//Logger.Log('searching: ' + JSON.stringify(coords_array), 'UTILS+');
		if(coords_array.length == 0) return;
		justFunc(coords_array);
	}
	justFunc([_coords]);
}

Item.registerUseFunction("builderWand", function(coords, item, block, player){
	justFunc1(coords, coords.side, block, BlockSource.getDefaultForActor(player), player);
});




// file: items/magnet.js

IDRegistry.genItemID("magnet");
Item.createItem("magnet", "Magnet", {
	name: "magnet"
}, {
	stack: 1
});
mod_tip(ItemID.magnet);
/* IDRegistry.genItemID("enabled_magnet");
Item.createItem("enabled_magnet", "Magnet", {
	name: "magnet"
}, {
	stack: 1
});
mod_tip(ItemID.enabled_magnet);
Item.setGlint('enabled_magnet', true); */
Recipes.addShaped({
	id: ItemID.magnet,
	count: 1,
	data: 0
}, [
	"iir",
	"  i",
	"iib"
], ['i', 265, 0, 'r', 35, 14, 'b', 35, 11]);

/* ModAPI.addAPICallback("BaublesAPI", function(api) {
	Baubles = api.Baubles;
	api.Baubles.registerBauble({
		id: ItemID.magnet,
		type: "ring",
		onEquip: function() {
			baubleEquipMagnet = true;
			baubleDescMagnet = api.Baubles.getDesc(ItemID.magnet);
		},
		onTakeOff: function() {
			baubleEquipMagnet = false;
			baubleDescMagnet = false;
		}
	});
}) */

Item.registerUseFunction("magnet", function(coords, item, block, player) {
	var _playerActor = new PlayerActor(player);
	var selectedSlot = _playerActor.getSelectedSlot();
	var extra = item.extra || new ItemExtraData();
	if (extra.getBoolean('active', false)) {
		Game.tipMessage(Native.Color.GREEN + 'Power: ' + Native.Color.WHITE + 'Off');
		extra.removeEnchant(-134);
		extra.putBoolean('active', false);
		_playerActor.setInventorySlot(selectedSlot, ItemID.magnet, 1, 0, extra);
	} else {
		Game.tipMessage(Native.Color.GREEN + 'Power: ' + Native.Color.WHITE + 'On');
		extra.addEnchant(-134, 0);
		extra.putBoolean('active', true);
		_playerActor.setInventorySlot(selectedSlot, ItemID.magnet, 1, 0, extra);
	}
});

Callback.addCallback("tick", function() {
	if (World.getThreadTime()%10 == 0) {
		for(var i in _players){
			var _player = _players[i];
			var item = searchItem(ItemID.magnet, -1, false, false, _player);
			if (item) {
				var extra = item.extra || new ItemExtraData();
				if (extra.getBoolean("active", false)) {
					var position = Entity.getPosition(_player);
					var entity = Entity.getAllInRange(position, 15, 64);
					for (var k in entity) {
						if(!entity[k]) continue;
						Entity.moveToTarget(entity[k], position, {
							speed: 0.5,
							denyY: false,
							jumpVel: 0.5
						})
					}
				}
			}
		}
	}
});




// file: items/craftingItems.js

/* IDRegistry.genItemID("concentratedDust");
Item.createItem("concentratedDust", "Concentrated dust", {
    name: "conc_dust"
}, {
    stack: 64
});
mod_tip(ItemID.concentratedDust);

Callback.addCallback("PostLoaded", function () {
    Combiner.addCraft({
        item1: {
            id: 331,
            data: -1
        },
        item2: {
            id: 348,
            data: -1
        },
        result: {
            id: ItemID.concentratedDust,
            data: 0
        }
    })
}); */




// file: items/flacon.js

IDRegistry.genItemID("flacon_for_souls");
Item.createItem("flacon_for_souls", "Flacon for souls", {
	name: "flacon_for_souls"
}, {
	stack: 1
});
mod_tip(ItemID.flacon_for_souls);

IDRegistry.genItemID("flacon_with_soul");
Item.createItem("flacon_with_soul", "Flacon with soul", {
	name: "flacon_with_soul"
}, {
	stack: 1,
	isTech: true
});
mod_tip(ItemID.flacon_with_soul);

Recipes.addShaped({
	id: ItemID.flacon_for_souls,
	count: 1,
	data: 0
}, [
	" s ",
	"g g",
	" g "
], ['s', 158, -1, 'g', 20, 0]);

function createMobData(tag){
	var isListTag = !tag.getAllKeys;
	//Logger.Log('IsListTag: ' + isListTag, 'UtilsDebug');
	var mobData = isListTag ? [] : {};
	var keys = !isListTag ? tag.getAllKeys() : false;
	var length_ = keys ? keys.length : tag.length();
	if (keys != null) {
		for (var _key = 0; _key < length_; _key++) {
			var key = keys ? keys[_key] : _key;
			//Logger.Log('Key: ' + key, 'UtilsDebug');
			var keyType =  tag.getValueType(key);
			var _data = {type: keyType};
			switch (keyType) {
				case 1:
					_data.value = Number(tag.getByte(key));
					break;
				case 2:
					_data.value = Number(tag.getShort(key));
					break;
				case 3:
					_data.value = Number(tag.getInt(key));
					break;
				case 4:
					_data.value = Number(tag.getInt64(key));
					break;
				case 5:
					_data.value = Number(tag.getFloat(key));
					break;
				case 6:
					_data.value = Number(tag.getDouble(key));
					break;
				case 7:
					_data.value = '';
					break;
				case 8:
					_data.value = tag.getString(key) + "";
					break;
				case 9:
					var listTag = tag.getListTag(key);
					if (listTag != null) {
						_data.value = createMobData(listTag)
					} else {
						_data.value = [];
					}
					break;
				case 10:
					var compoundTag = tag.getCompoundTag(key);
					if (compoundTag != null) {
						_data.value = createMobData(compoundTag)
					} else {
						_data.value = {};
					}
					break;
				case 11:
					_data.value = '';
					break;
			}
			//Logger.Log('Data: ' + JSON.stringify(_data), 'UtilsDebug');
			mobData[key] = _data;
		}
	}
	return mobData;
}

function createMobTag(tag_json){
	var isListTag = Array.isArray(tag_json);
	var tag = isListTag ? new NBT.ListTag() : new NBT.CompoundTag();
	for (var key in tag_json) {
		if(isListTag) key = Number(key);
		var _data = tag_json[key];
		switch (_data.type) {
			case 1:
				tag.putByte(key, _data.value);
				//Logger.Log(key + " : " + _data.type + " : " + JSON.stringify(_data.value));
				break;
			case 2:
				tag.putShort(key, _data.value);
				//Logger.Log(key + " : " + _data.type + " : " + JSON.stringify(_data.value));
				break;
			case 3:
				tag.putInt(key, _data.value);
				//Logger.Log(key + " : " + _data.type + " : " + JSON.stringify(_data.value));
				break;
			case 4:
				tag.putInt64(key, _data.value);
				//Logger.Log(key + " : " + _data.type + " : " + JSON.stringify(_data.value));
				break;
			case 5:
				tag.putFloat(key, _data.value);
				//Logger.Log(key + " : " + _data.type + " : " + JSON.stringify(_data.value));
				break;
			case 6:
				tag.putDouble(key, _data.value);
				//Logger.Log(key + " : " + _data.type + " : " + JSON.stringify(_data.value));
				break;
			case 8:
				tag.putString(key, _data.value);
				//Logger.Log(key + " : " + _data.type + " : " + JSON.stringify(_data.value));
				break;
			case 9:
				var newTag = createMobTag(_data.value);
				//Logger.Log(key + " : " + _data.type + " : " + JSON.stringify(newTag.toScriptable()));
				tag.putListTag(key, newTag);
				break;
			case 10:
				var newTag = createMobTag(_data.value);
				//Logger.Log(key + " : " + _data.type + " : " + JSON.stringify(tag.toScriptable()));
				tag.putCompoundTag(key, newTag);
				break;
		}
	}
	return tag;
};

var ignoreList = [63, 53, 52, 89, 91, 65, 84, 98, 100, 96, 69, 68, 70, 66, 85, 71, 87, 82, 64, 73, 86, 81, 94, 79, 72, 103, 80, 61, 95, 93, 83];

Callback.addCallback("EntityHurt", function(attacker, victim, damage, damageType) {
	if (_players.indexOf(attacker) != -1 && damageType == 2 && victim && Entity.getCarriedItem(attacker).id == ItemID.flacon_for_souls && (entityType = (Entity.getType(victim) || Entity.getTypeAddon(victim))) && ignoreList.indexOf(entityType) == -1) {
		Game.prevent();
		if(InnerCore_pack.packVersionCode <= 125) return alert('Please update innecore pack');
		var mobData = createMobData(Entity.getCompoundTag(victim));
		//Debug.big(mobData);
		Entity.remove(victim);
		var extra = new ItemExtraData();
		if(mobData.identifier)extra.putString("name", mobData.identifier.value);
		extra.putString("entity", JSON.stringify(mobData));
		typeof entityType == 'number' ? extra.putInt('type', entityType) : extra.putString('type', entityType);
		runOnMainThread(function(){
			Entity.setCarriedItem(attacker, ItemID.flacon_with_soul, 1, 0, extra);
		});
	}
});

Item.registerUseFunction("flacon_with_soul", function(coords, item, block, player) {
	if(InnerCore_pack.packVersionCode <= 125) return alert('Please update innecore pack');
	if(!item.extra) return;
	if (!(entityTag = createMobTag(JSON.parse(item.extra.getString("entity"))))) return;
	_playerActor = new PlayerActor(player);
	var newCoords = {
		x: coords.relative.x + 0.5,
		y: coords.relative.y,
		z: coords.relative.z + 0.5
	}
	var _blockSource = BlockSource.getDefaultForActor(player);
	var entityType = item.extra.getInt('type') || item.extra.getString('type');
	var newEntity = _blockSource.spawnEntity(newCoords.x, newCoords.y, newCoords.z, entityType);
	entityTag.putInt64('UniqueID', newEntity);
	var posListTag = new NBT.ListTag();
	posListTag.putFloat(0, newCoords.x);
	posListTag.putFloat(1, newCoords.y);
	posListTag.putFloat(2, newCoords.z);
	entityTag.putListTag('Pos', posListTag);
	Entity.setCompoundTag(newEntity, entityTag);
	_playerActor.setInventorySlot(_playerActor.getSelectedSlot(), ItemID.flacon_for_souls, 1, 0, null);
});

Item.registerNameOverrideFunction("flacon_with_soul", function(item, name){
	if(item.extra && (mobName = item.extra.getString('name'))){
		name += "\n§7Mob: " + mobName;
		name += "\n§7Type: " + (item.extra.getInt('type') || item.extra.getString('type'));
	}
	return name;
});




// file: items/utilsHammer.js

IDRegistry.genItemID("utilsHammer");
Item.createItem("utilsHammer", "Hammer", {
    name: "utilsHammer"
}, {
    stack: 1
});
Item.setMaxDamage(ItemID.utilsHammer, 100);
mod_tip(ItemID.utilsHammer);

Recipes.addShaped({ id: ItemID.utilsHammer, count: 1, data: 0 }, [
    " is",
    " si",
    "s  "
], ['s', 280, 0, 'i', 265, 0]);




// file: blocks/XPStorage.js

IDRegistry.genBlockID("XPStorage");

Block.createBlock("XPStorage", [
    {
        name: "XP Storage",
        texture: [
            ["XPStorage", 0]
        ],
        inCreative: true
    }
], 'opaque');
Block.setTempDestroyTime(BlockID.XPStorage, 3);
mod_tip(BlockID.XPStorage);

Recipes.addShaped({ id: BlockID.XPStorage, count: 1, data: 0 }, [
    "ibi",
    "b#b",
    "ibi"
], ['b', 42, 0, 'g', 266, 0, 'i', 265, 0]);

function XPtoLVL(xp) { // https://minecraft.gamepedia.com/Experience
    var currentLevel = 0;
    var remainingXP = xp;

    while (true) {
        var requiredForNextLevel;
        if (currentLevel <= 16) {
            requiredForNextLevel = (2 * currentLevel) + 7;
        } else if (currentLevel >= 17 && currentLevel <= 31) {
            requiredForNextLevel = (5 * currentLevel) - 38;
        } else {
            requiredForNextLevel = (9 * currentLevel) - 158;
        }

        if (remainingXP >= requiredForNextLevel) {
            remainingXP -= requiredForNextLevel;
            currentLevel++;
        } else break;
    }
   
    return {lvl: currentLevel, rem: remainingXP};
}

function LVLtoXP(lvl) { // https://minecraft.gamepedia.com/Experience
    if (lvl <= 16) {
        requiredXP = Math.pow(lvl,2) + 6 * lvl;
    } else if (lvl >= 17 && lvl <= 31) {
        requiredXP = 2.5 *  Math.pow(lvl, 2) - 40.5 * lvl + 360
    } else {
        requiredXP = 4.5 * Math.pow(lvl, 2) - 162.5 * lvl + 2220
    }
   
    return requiredXP;
}

Block.registerPlaceFunction("XPStorage", function (coords, item, block, _player, blockSource) {
    if(!World.canTileBeReplaced(block.id, block.data)){
		var relBlock = blockSource.getBlock(coords.relative.x, coords.relative.y, coords.relative.z);
		if (World.canTileBeReplaced(relBlock.id, relBlock.data)){
			coords = coords.relative;
		} else return;
	}
    var player = new PlayerActor(_player);
    player.setInventorySlot(player.getSelectedSlot(), item.id, item.count - 1, item.data, item.extra);
    blockSource.setBlock(coords.x, coords.y, coords.z, item.id, item.data);
    var tile = World.addTileEntity(coords.x, coords.y, coords.z, blockSource);
    if (item.extra && item.extra.getInt('xp') && tile.data) {
        tile.data.XP = item.extra.getInt('xp');
    };
});

Block.registerDropFunction("XPStorage", function (coords, id, data, diggingLevel, toolLevel, player, _blockSource) {
    var drop = [];
	var tile = World.getTileEntity(coords.x, coords.y, coords.z, _blockSource);
	if(tile){
        var extra = new ItemExtraData();
        extra.putInt('xp', tile.data.XP);
        drop.push([BlockID['XPStorage'], 1, 0, extra]);
    }
    return drop;
});

var XPStorage_elements = {};
function InitXPStorage_elements() {
    var xpStorageButtonSettings = {
        x1 : 375,//525
        x2 : 625,//775
        y: 110/575.5*UI.getScreenHeight(),
        scale : 3,
        padding: 5
    }
    xpStorageButtonSettings.x1 -= xpStorageButtonSettings.scale*20;
    XPStorage_elements["text"] = {
        type: "text",
        x: 1000/2,
        y: xpStorageButtonSettings.y + 20*xpStorageButtonSettings.scale + 20*xpStorageButtonSettings.scale/2,
        z: 10,
        text: "0",
        font: {
            color: android.graphics.Color.rgb(127, 255, 0),
            shadow: 0.5,
            size: 30
        }
    }
    XPStorage_elements["text"].y -= XPStorage_elements["text"].font.size/2;
    XPStorage_elements["playerxp"] = {
        type: "text",
        x: 1000/2,
        y: 0,
        z: 10,
        text: "0",
        font: {
            color: android.graphics.Color.rgb(127, 255, 0),
            shadow: 0.5,
            size: 20
        }
    }
    XPStorage_elements["playerxp"].y = UI.getScreenHeight() - XPStorage_elements["playerxp"].font.size - 20 - 80;
    XPStorage_elements["xpall"] = {
        type: "button",
        x: xpStorageButtonSettings.x1,
        y: xpStorageButtonSettings.y,
        bitmap: "RS_empty_button",
        bitmap2: 'RS_empty_button_pressed',
        scale: xpStorageButtonSettings.scale,
        clicker: {
            onClick: function (itemContainerUiHandler, container, element) {
                container.sendEvent("xpall", {});
            }
        }
    }
    XPStorage_elements["xp-all"] = {
        type: "button",
        x: xpStorageButtonSettings.x2,
        y: xpStorageButtonSettings.y,
        bitmap: "RS_empty_button",
        bitmap2: 'RS_empty_button_pressed',
        scale: xpStorageButtonSettings.scale,
        clicker: {
            onClick: function (itemContainerUiHandler, container, element) {
                container.sendEvent("xp-all", {});
            }
        }
    }
    XPStorage_elements["xp5"] = {
        type: "button",
        x: xpStorageButtonSettings.x1,
        y: XPStorage_elements["xpall"].y + XPStorage_elements["xpall"].scale*20 + xpStorageButtonSettings.padding,
        bitmap: "RS_empty_button",
        bitmap2: 'RS_empty_button_pressed',
        scale: xpStorageButtonSettings.scale,
        clicker: {
            onClick: function (itemContainerUiHandler, container, element) {
                container.sendEvent("xp5", {});
            }
        }
    }
    XPStorage_elements["xp-5"] = {
        type: "button",
        x: xpStorageButtonSettings.x2,
        y: XPStorage_elements["xp-all"].y + XPStorage_elements["xp-all"].scale*20 + xpStorageButtonSettings.padding,
        bitmap: "RS_empty_button",
        bitmap2: 'RS_empty_button_pressed',
        scale: xpStorageButtonSettings.scale,
        clicker: {
            onClick: function (itemContainerUiHandler, container, element) {
                container.sendEvent("xp-5", {});
            }
        }
    }
    XPStorage_elements["xp1"] = {
        type: "button",
        x: xpStorageButtonSettings.x1,
        y: XPStorage_elements["xp5"].y + XPStorage_elements["xp5"].scale*20 + xpStorageButtonSettings.padding,
        bitmap: "RS_empty_button",
        bitmap2: 'RS_empty_button_pressed',
        scale: xpStorageButtonSettings.scale,
        clicker: {
            onClick: function (itemContainerUiHandler, container, element) {
                container.sendEvent("xp1", {});
            }
        }
    }
    XPStorage_elements["xp-1"] = {
        type: "button",
        x: xpStorageButtonSettings.x2,
        y: XPStorage_elements["xp-5"].y + XPStorage_elements["xp-5"].scale*20 + xpStorageButtonSettings.padding,
        bitmap: "RS_empty_button",
        bitmap2: 'RS_empty_button_pressed',
        scale: xpStorageButtonSettings.scale,
        clicker: {
            onClick: function (itemContainerUiHandler, container, element) {
                container.sendEvent("xp-1", {});
            }
        }
    }
    XPStorage_elements["xp_bar"] = {
        type: "scale",
        x: (1000 - 185 * 3.5) / 2,
        y: XPStorage_elements["xp1"].y + XPStorage_elements["xp1"].scale*20 + 30,
        direction: 0,
        bitmap: "xp_scale_full",
        background: "xp_scale",
        value: 0,
        scale: 3.5,
    }
    var xp_storage_map = ['all', '5', '1', '-all', '-5', '-1'];
    for(var i = 0; i < 6; i++){
        XPStorage_elements['xp'+xp_storage_map[i]+'_image'] = {
            type: "image",
            x: XPStorage_elements['xp'+xp_storage_map[i]].x,
            y: XPStorage_elements['xp'+xp_storage_map[i]].y,
            z: 10,
            bitmap: "xpstorage"+xp_storage_map[i],
            scale: XPStorage_elements['xp'+xp_storage_map[i]].scale,
        }
    }
}
InitXPStorage_elements();

var guiXPS = new UI.StandartWindow({
    standart: {
        header: {
            text: {
                text: "XP Storage"
            }
        },
        background: {
            standart: true
        }
    },

    drawing: [],

    elements: XPStorage_elements
});

var elementsMap = guiXPS.getElements();
TileEntity.registerPrototype(BlockID.XPStorage, {
    defaultValues: {
        XP: 0,
        ticks: 0
    },
    useNetworkItemContainer: true,
    click: function (id, count, data, coords, player, extra) {
        if(Entity.getSneaking(Player.get())) return false;
        var client = Network.getClientForPlayer(player);
        if(!client) return true;
        if (this.container.getNetworkEntity().getClients().contains(client)) return true;
        this.container.openFor(client, "main");
        this.updateText();
        return true;
    },
    updateText: function(){
        var xp_data = XPtoLVL(this.data.XP);
        this.container.setText('text', "" + xp_data.lvl);
        var next_xp = LVLtoXP(xp_data.lvl + 1);
        var this_xp = LVLtoXP(xp_data.lvl);
        var other_xp_data = {
            xp: this.data.XP - this_xp,
            next_xp: next_xp - this_xp
        }
        this.container.setScale('xp_bar', other_xp_data.xp/other_xp_data.next_xp);
        this.container.sendChanges();
    },
    getScreenByName: function(screenName) {
        if(screenName == 'main')return guiXPS;
    },
    tick: function(){
        this.data.ticks++
        if (this.data.ticks < 5) return;
        this.data.ticks = 0;
        var needUpdate = false;
        var startCoords = {x:this.x+0.5,y:this.y+0.5,z:this.z+0.5};
        var ents = Entity.getAllInRange(startCoords, 10, 69);
        for (var i in ents) {
            var ent = ents[i];
            if (!ent) continue;
            var tag = Entity.getCompoundTag(ent);
            var exp_value = tag.getInt('experience value');
            if(exp_value > 0){
                this.data.XP += exp_value;
                needUpdate = true;
            }
            Entity.remove(ent);
        }
        if(needUpdate)this.updateText();
    },
    client:{

    },
    containerEvents: {
        'xp-1': function(eventData, connectedClient) {
            if (this.data.XP == 0) return;
            var player = new PlayerActor(connectedClient.getPlayerUid());
            var xp = Math.min(this.data.XP, LVLtoXP(player.getLevel() + 1) - player.getExperience() + 1);
            this.data.XP -= xp;
            player.addExperience(xp);
            //Game.tipMessage(Native.Color.GREEN + '+1 lvl');
            this.updateText();
        },
        'xp1': function(eventData, connectedClient) {
            var player = new PlayerActor(connectedClient.getPlayerUid());
            var player_lvl = player.getLevel();
            if (player_lvl == 0) return;
            var xp = player.getExperience();
            player.setLevel(player_lvl - 1);
            this.data.XP += xp - player.getExperience();
            //Game.tipMessage(Native.Color.RED + '-1 lvl');
            this.updateText();
        },
        'xp-5': function(eventData, connectedClient) {
            if (this.data.XP == 0) return;
            var player = new PlayerActor(connectedClient.getPlayerUid());
            var xp = Math.min(this.data.XP, LVLtoXP(player.getLevel() + 5) - player.getExperience() + 1);
            this.data.XP -= xp;
            player.addExperience(xp);
            //Game.tipMessage(Native.Color.GREEN + '+5 lvl');
            this.updateText();
        },
        'xp5': function(eventData, connectedClient) {
            var player = new PlayerActor(connectedClient.getPlayerUid());
            var player_lvl = player.getLevel();
            if (player_lvl == 0) return;
            var xp = player.getExperience();
            var setLvl = Math.min(player_lvl, 5);
            player.setLevel(player_lvl - setLvl);
            this.data.XP += xp - player.getExperience();
            //Game.tipMessage(Native.Color.RED + '-5 lvl');
            this.updateText();
        },
        'xpall': function(eventData, connectedClient) {
            var player = new PlayerActor(connectedClient.getPlayerUid());
            this.data.XP += player.getExperience();
            //Game.tipMessage(Native.Color.RED + '-' + Player.getLevel() + ' lvl');
            player.setLevel(0);
            player.setExperience(0);
            this.updateText();
        },
        'xp-all': function(eventData, connectedClient) {
            var player = new PlayerActor(connectedClient.getPlayerUid());
            player.addExperience(this.data.XP);
            //Game.tipMessage(Native.Color.GREEN + '+' + tile.data.XP + ' lvl');
            this.data.XP = 0;
            this.updateText();
        }
    }
});

var _getTextWidth1 = function(){};
(function(){
    var _font = new JavaFONT(XPStorage_elements['text'].font);
    var drawScale = guiXPS.getWindow('main').location.getDrawingScale();
    _getTextWidth1 = function(text){
        return _font.getBounds(text, XPStorage_elements['text'].x * drawScale, XPStorage_elements['text'].y * drawScale, parseFloat(1.0)).width()
    }
})();

var _getTextWidth2 = function(){};
(function(){
    var _font = new JavaFONT(XPStorage_elements['playerxp'].font);
    var drawScale = guiXPS.getWindow('main').location.getDrawingScale();
    _getTextWidth2 = function(text){
        return _font.getBounds(text, XPStorage_elements['playerxp'].x * drawScale, XPStorage_elements['playerxp'].y * drawScale, parseFloat(1.0)).width()
    }
})();

Callback.addCallback('LocalTick', function(){
    if (guiXPS.isOpened()) {
        elementsMap.get('playerxp').setBinding('text', "" + Player.getLevel());
        var elementText1 = elementsMap.get('text');
        elementText1.setPosition(500 - _getTextWidth1(elementText1.getBinding('text'))/2, XPStorage_elements['text'].y);
        var elementText2 = elementsMap.get('playerxp');
        elementText2.setPosition(500 - _getTextWidth2(elementText2.getBinding('text'))/2, XPStorage_elements['playerxp'].y);
    }
});

ModAPI.addAPICallback("WailaAPI", function (api) {
    api.Waila.addExtension(BlockID.XPStorage, function (id, data, elements, tile, yPos) {
        if(!tile)return yPos;
        elements["XPs"] = {
            type: "text",
            text: "XP: " + tile.data.XP,
            x: 200,
            y: yPos,
            font: { color: api.Style.DEF, size: 40 }
        };
        yPos += 60;
        elements["LVLs"] = {
            type: "text",
            text: "LVLs: " + XPtoLVL(tile.data.XP).lvl,
            x: 200,
            y: yPos,
            font: { color: api.Style.DEF, size: 40 }
        };
        yPos += 60;

        api.Waila.requireHeight(40);
        return yPos;
    })
})




// file: blocks/WorldT.js

IDRegistry.genBlockID("worldClock");

Block.createBlock("worldClock", [
	{
		name: "World Clock",
		texture: [
			["worldClock", 0]
		],
		inCreative: true
	}
], 'opaque');
Block.setTempDestroyTime(BlockID.worldClock, 3);
mod_tip(BlockID.worldClock);

Recipes.addShaped({ id: BlockID.worldClock, count: 1, data: 0 }, [
	"dbd",
	"bcb",
	"dbd"
], ['c', 347, 0, 'b', 42, 0, 'd', 264, 0]);

TileEntity.registerPrototype(BlockID.worldClock, {
	defaultValues: {
		redstones: 0,
		redstoneSignal: false
	},
	redstone: function (params) {
		//devLog(JSON.stringify(params));
		if (params.onLoad) return;
		if (params.power > 0)
			this.data.redstones++;
		else
			this.data.redstones--;
		if (this.data.redstones == 0)
			this.data.redstoneSignal = false;
		else
			this.data.redstoneSignal = true;

	},
	tick: function () {
		if (this.data.redstoneSignal) {
			World.setWorldTime(World.getWorldTime() + 50);
		}
	}
});





// file: blocks/grave.js

var title_death_datas = [];

function asd() {
	IDRegistry.genBlockID("grave");

	Block.createBlock("grave", [{
		name: "Grave",
		texture: [
			["stone", 0]
		],
		inCreative: false
	}]);
	mod_tip(BlockID.grave);

	TileEntity.registerPrototype(BlockID.grave, {
		container: new UI.Container()
	});
	var Dmodel = new ICRender.CollisionShape();
	var entry = Dmodel.addEntry();

	var render = new ICRender.Model();
	BlockRenderer.setStaticICRender(BlockID.grave, 0, render);

	var boxes = [{
			box: [0, 0, 0, 1, 0.05, 1],
			material: {
				id: 3,
				data: 1
			}
		},
		{
			box: [0.05, 0.05, 0.05, 0.95, 0.1, 0.95],
			material: {
				id: 3,
				data: 1
			}
		},
		{
			box: [0.1, 0.1, 0.15, 0.13, 0.85, 0.85],
			material: {
				id: 4,
				data: 0
			}
		},
		{
			box: [0.1, 0.85, 0.20, 0.13, 0.9, 0.8],
			material: {
				id: 4,
				data: 0
			}
		}
	]

	for (var i in boxes) {
		var box = boxes[i].box;
		var material = boxes[i].material;

		var model = BlockRenderer.createModel();

		model.addBox(box[0], box[1], box[2], box[3], box[4], box[5], material.id, material.data);

		render.addEntry(model);
	}
	entry.addBox(0, 0, 0, 1, 0.2, 1);

	BlockRenderer.setCustomCollisionShape(BlockID.grave, 0, Dmodel)

	//BlockRenderer.setStaticICRender(BlockID.grave, -1, icRenderModel)

	Block.setTempDestroyTime(BlockID.grave, 1);

	Block.registerDropFunction(BlockID.grave, function() {
		return [];
	})

	IDRegistry.genItemID("title_death");
	Item.createItem("title_death", "Description of death", {
		name: "descOfDeath"
	}, {
		stack: 1
	});
	mod_tip(ItemID.title_death);

	Saver.addSavesScope("UtilsGrave",
		function read(scope) {
			title_death_datas = scope.title_death_datas;
			if (!title_death_datas) title_death_datas = [];
		},
		function save() {
			var data = {
				title_death_datas: title_death_datas
			}
			return data;
		}
	);

	Callback.addCallback("LevelLeft", function () {
		title_death_datas = [];
	});

	Item.registerNameOverrideFunction(ItemID.title_death, function(item, name) {
		name = "§b" + name;
		if (!title_death_datas[item.data]) return name;
		name += " #" + item.data;
		var items = title_death_datas[item.data].items;
		var length = (items.length > 10) ? 10 : items.length;
		for (var i = 0; i < length; i++) {
			name += "\n§7" + Item.getName(items[i].id, items[i].data) + " * " + items[i].count;
		}
		if (items.length > 10) name += "\n§7and " + (items.length - length) + " more...";
		return name
	})

	Item.registerUseFunction("title_death", function(coords, item, block) {
		if (!title_death_datas[item.data]) {
			return Game.message("§cWrong data!");
		}
		var data = title_death_datas[item.data];
		var gui = new UI.Window({
			location: {
				x: 200,
				y: 75,
				width: 600,
				height: 400
			},
			drawing: [{
				type: "color",
				color: android.graphics.Color.TRANSPARENT
			}],
			elements: {
				"frame": {
					type: "frame",
					x: 0,
					y: 0,
					width: 1000,
					height: 670,
					bitmap: "frame",
					scale: 5,
				}
			}
		})
		gui.setAsGameOverlay(true);
		var container = new UI.Container();
		container.openAs(gui);
		var items = data.items;
		var content = container.getGuiContent();
		var x = 10,
			y = 10;
		content.elements["date"] = {
			type: "text",
			x: 600,
			y: 20,
			text: "Date: " + data.date,
			font: {
				color: android.graphics.Color.WHITE,
				shadow: 0.5,
				size: 20
			}
		}
		content.elements["dim"] = {
			type: "text",
			x: 600,
			y: 50,
			text: "Dimension: " + data.dimension,
			font: {
				color: android.graphics.Color.WHITE,
				shadow: 0.5,
				size: 20
			}
		}
		var length = 10;
		var pages = [];
		var z = [];
		var f = 0;
		var b = 0;
		for (var i = 1; i <= items.length; i++) {
			z[f] = i - 1;
			f++;
			if (("" + i / length).indexOf(".") == -1 && i / length != 0) {
				pages[b] = z;
				z = [];
				f = 0;
				b++;
			}
		}
		pages[b] = z;
		var page = 1;
		for (var i = 0; i < length; i++) {
			content.elements["slot_item" + i] = {
				type: "slot",
				x: x,
				y: y,
				bitmap: "_default_slot_empty",
				isTransparentBackground: true,
				visual: true
			};
			container.getSlot("slot_item" + i).id = 0;
			container.getSlot("slot_item" + i).data = 0;
			container.getSlot("slot_item" + i).count = 0;
			container.getSlot("slot_item" + i).extra = null;
			content.elements["text_item" + i] = {
				type: "text",
				x: x + 60,
				y: y + 15,
				text: "",
				font: {
					color: android.graphics.Color.WHITE,
					shadow: 0.5,
					size: 20
				}
			}
			y += 54;
		}
		content.elements["frame2"] = {
			type: "frame",
			x: 0,
			y: y,
			width: 1000,
			height: content.elements["frame"].height - y,
			bitmap: "frame",
			scale: 5,
		}
		content.elements["pages"] = {
			type: "text",
			x: 390,
			y: 580,
			text: "Page: " + page + "/" + pages.length,
			font: {
				color: android.graphics.Color.WHITE,
				shadow: 0.5,
				size: 41
			}
		}
		content.elements["closeButton"] = {
			type: "closeButton",
			x: 900,
			y: 0,
			bitmap: "close_button",
			bitmap2: "close_button",
			scale: 5
		}

		function clearSlots() {
			for (var i = 0; i < length; i++) {
				container.getSlot("slot_item" + i).id = 0;
				container.getSlot("slot_item" + i).data = 0;
				container.getSlot("slot_item" + i).count = 0;
				container.getSlot("slot_item" + i).extra = null;
				content.elements["text_item" + i].text = "";
			}
		}

		function switchPage(p) {
			if (p < 1 || p > pages.length) return
			page = p;
			content.elements["pages"].text = "Page: " + page + "/" + pages.length;
			clearSlots();
			var g = 0;
			for (var i = 0; i < pages[p - 1].length; i++) {
				container.getSlot("slot_item" + g).id = items[pages[p - 1][i]].id;
				container.getSlot("slot_item" + g).data = items[pages[p - 1][i]].data;
				container.getSlot("slot_item" + g).count = items[pages[p - 1][i]].count;
				container.getSlot("slot_item" + g).extra = items[pages[p - 1][i]].extra;
				var name = Item.getName(items[pages[p - 1][i]].id, items[pages[p - 1][i]].data).replace(/§./g, "").split("\n")[0];
				content.elements["text_item" + g].text = (name.length > 30) ? name.substr(0, 30) + "..." : name;
				g++;
			}
		}
		switchPage(1);
		content.elements["arrow_left"] = {
			type: "image",
			x: 20,
			y: 570,
			bitmap: "arrow_left",
			scale: 5,
			clicker: {
				onClick: function(position, container, tileEntity, window, canvas, scale) {
					switchPage(page - 1);
				},
				onLongClick: function(position, container, tileEntity, window, canvas, scale) {

				}
			}
		}
		content.elements["arrow_right"] = {
			type: "image",
			x: 900,
			y: 570,
			bitmap: "arrow_right",
			scale: 5,
			clicker: {
				onClick: function(position, container, tileEntity, window, canvas, scale) {
					switchPage(page + 1);
				},
				onLongClick: function(position, container, tileEntity, window, canvas, scale) {

				}
			}
		}
	})
	Callback.addCallback("EntityDeath", function(entity) {
		if (entity == Player.get()) {
			var items = [];
			var pos = Player.getPosition();
			pos.y -= 1;
			World.setBlock(pos.x, pos.y, pos.z, BlockID.grave, 0);
			World.addTileEntity(pos.x, pos.y, pos.z);
			var container = World.getContainer(pos.x, pos.y, pos.z);
			for (var i = 0; i <= 35; i++) {
				var Item = Player.getInventorySlot(i);
				container.setSlot("slot" + i, Item.id, Item.count, Item.data, Item.extra);
				Player.setInventorySlot(i, 0, 0, 0, null);
				if (Item.id != 0) items.push({
					id: Item.id,
					data: Item.data,
					extra: Item.extra,
					count: Item.count
				});
			}
			for (var i = 0; i <= 3; i++) {
			  var Item = Player.getArmorSlot(i);
			  var _i = i + 36
			  container.setSlot("slot" + _i, Item.id, Item.count, Item.data, Item.extra);
				Player.setArmorSlot(i, 0, 0, 0, null);
				if (Item.id != 0) items.push({
					id: Item.id,
					data: Item.data,
					extra: Item.extra,
					count: Item.count
				});
		  }
		  var Item = Player.getOffhandItem();
			 var _i = 40;
			 container.setSlot("slot" + _i, Item.id, Item.count, Item.data, Item.extra);
			Player.setOffhandItem(0, 0, 0, null);
			if (Item.id != 0) items.push({
				id: Item.id,
				data: Item.data,
				extra: Item.extra,
				count: Item.count
			});
			//Commands.exec("clear @a");
			var date = new Date();
			var datemonth = date.getMonth() + 1;
			date = ((date.getHours() < 10) ? "0" + date.getHours() : date.getHours()) + ":" + ((date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes()) + ":" + ((date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds()) + " " + ((date.getDate() < 10) ? "0" + date.getDate() : date.getDate()) + "." + ((datemonth < 10) ? "0" + datemonth : datemonth) + "." + date.getFullYear();
			var dim = Player.getDimension();
			setTimeout(function() {
				Player.addItemToInventory(ItemID.title_death, 1, title_death_datas.length);
				var full_data = {
					items: items,
					date: date,
					dimension: dim
				}
				title_death_datas[title_death_datas.length] = full_data
			}, 10);
		}
	});
}
// if (__config__.getBool("grave")) {
// 	asd()
// }




// file: blocks/itemCollector.js

IDRegistry.genBlockID("itemCollector");

Block.createBlock("itemCollector", [{
    name: "Item Collector",
    texture: [
        ["itemCollector", 0]
    ],
    inCreative: true
}], 'opaque');
mod_tip(BlockID.itemCollector);

Recipes.addShaped({
    id: BlockID.itemCollector,
    count: 1,
    data: 0
}, [
    "cpc",
    "php",
    "cpc"
], ['h', 410, 0, 'p', 381, 0, 'c', 54, 0]);

const itemColRad = 10;

TileEntity.registerPrototype(BlockID.itemCollector, {
    defaultValues: {
        ticks: 0
    },
	useNetworkItemContainer: true,
    getTransportSlots: function() {
        return {
            //input: ["slot"],
            output: ["slot"]
        };
    },
    click: function(id, count, data, coords, player, extra) {
        var container_slot = this.container.getSlot("slot");
        if (container_slot.id == 0) return Game.message('Not available');
        chatMessage(player, Item.getName(container_slot.id, container_slot.data).split('\n')[0] + ' * ' + container_slot.count);
    },
    tick: function() {
        this.data.ticks++
        if (this.data.ticks >= 5) {
            var startCoords = {x:this.x+0.5,y:this.y+0.5,z:this.z+0.5};
            this.data.ticks = 0;
            var container_slot = this.container.getSlot("slot");
            if (container_slot.id != 0 && container_slot.count > 0)for (var i in newSides) {
                var _coords = {
                    x: this.x + newSides[i][0],
                    y: this.y + newSides[i][1],
                    z: this.z + newSides[i][2]
                }
                var tile = StorageInterface.getStorage(this.blockSource, _coords.x, _coords.y, _coords.z);
                if(tile){
                    //tile.addItem(container_slot, i, Item.getMaxStack(container_slot.id));
                    var side = reverseSides[i];
                    var slots = tile.getInputSlots(side);
                    var maxStack = Item.getMaxStack(container_slot.id);
                    for(var k in slots){
                        var slot = tile.container.getSlot(slots[k]);
                        if((!tile.isValidInput || tile.isValidInput(container_slot, side, this)) && (!tile.isValidSlotInput || tile.isValidSlotInput(slots[k], container_slot, side)) && (slot.id == 0 || (compareSlots(slot, container_slot, true) && slot.count < maxStack))){
                            var decount = Math.min(maxStack - slot.count, container_slot.count);
                            tile.container.setSlot(slots[k], container_slot.id, slot.count + decount, container_slot.data, container_slot.extra);
                            this.container.setSlot("slot", container_slot.id, container_slot.count - decount, container_slot.data, container_slot.extra);
                            container_slot.validate();
                        }
                    }
                }
            }
            var ents = Entity.getAllInRange(startCoords, itemColRad, 64);
            for (var i in ents) {
                var ent = ents[i];
                if (!ent) continue;
                var item = Entity.getDroppedItem(ent);
                if(!item) continue;
                var entityPos = Entity.getPosition(ent);
                var distanceToEnt = Entity.getDistanceBetweenCoords(startCoords, entityPos);
                Entity.moveToTarget(ent, startCoords, {
                    speed: 1/distanceToEnt
                });
                if(distanceToEnt > 1.5) continue;
                var max_stack = Item.getMaxStack(item.id);
                if (item.id == container_slot.id && item.data == container_slot.data && item.extra == container_slot.extra) {
                    var count = Math.min(container_slot.count + item.count, max_stack);
                    var other = Math.max(container_slot.count + item.count - max_stack, 0);
                    if(other == 0)
                        Entity.remove(ent);
                    else
                        Entity.setDroppedItem(ent, item.id, other, item.data, item.extra);
                    container_slot.count = count;
                    if (container_slot.count <= 0) {
                        container_slot.id = 0;
                    }
                } else if (container_slot.id == 0) {
                    var other = Math.max(container_slot.count + item.count - max_stack, 0);
                    this.container.setSlot("slot", item.id, Math.min(item.count, max_stack), item.data, item.extra || null);
                    if(other == 0)
                        Entity.remove(ent);
                    else
                        Entity.setDroppedItem(ent, item.id, other, item.data, item.extra);
                }
            }
        }
    }
});

ModAPI.addAPICallback("WailaAPI", function(api) {
    api.Waila.addExtension(BlockID.itemCollector, function(id, data, elements, tile, yPos) {
        if(!tile)return yPos;
        var item = tile.container.getSlot("slot");
        var name = item.id != 0 && item.count > 0 ? Item.getName(item.id, item.data) + " * " + item.count : "Not available";
        elements["itemCollector_slot"] = {
            type: "text",
            text: "Item: " + name,
            x: 200,
            y: yPos,
            font: {
                color: api.Style.DEF,
                size: 40
            }
        };
        yPos += 60;

        api.Waila.requireHeight(20);
        return yPos;
    })
});

StorageInterface.createInterface(BlockID.itemCollector, {
	slots: {
		"slot": {output: true}
	}
});




// file: blocks/wire.js

var allGroups = {};
var ignored = {}

var regionGroups = {};
var networkTiles = {};
const regionChunkSize = 3;

var BlocksAddToGroup = [];
var NewBlocksAddToGroup = [];
var updateBlocksAddToGroup = false;

var wireTextureSet = [
	["utilsWire", 0],
	["utilsWire", 0],
	["utilsWire", 0],
	["utilsWire", 0],
	["utilsWire", 0],
	["utilsWire", 0]
];
var fixedWireTextureSet = [
	["utilsWire", 0],
	["utilsWire", 0],
	["utilsWireSide", 0],
	["utilsWire", 0],
	["utilsWire", 0],
	["utilsWireSide", 0]
];

IDRegistry.genBlockID("utilsWire");
Block.createBlock("utilsWire", [{
	name: "Pipe",
	texture: wireTextureSet,
	inCreative: true
}]);
mod_tip(BlockID.utilsWire);

IDRegistry.genBlockID("utilsItemGetter");
Block.createBlock("utilsItemGetter", [{
	name: "Extraction pipe",
	texture: [
		["stone", 0]
	],
	inCreative: false
}, //left
{
	name: "Extraction pipe",
	texture: [
		["stone", 0]
	],
	inCreative: false
}, //right
{
	name: "Extraction pipe",
	texture: [
		["stone", 0]
	],
	inCreative: true
}, //forward
{
	name: "Extraction pipe",
	texture: [
		["stone", 0]
	],
	inCreative: false
}, //back
{
	name: "Extraction pipe",
	texture: [
		["stone", 0]
	],
	inCreative: false
}, //up
{
	name: "Extraction pipe",
	texture: [
		["stone", 0]
	],
	inCreative: false
} //down
]);
mod_tip(BlockID.utilsItemGetter);

function calculateCentre(coords, notignoreY){
    var _object = {
		x: coords.x - coords.x%(regionChunkSize*16) + (coords.x >= 0 ?  0.5 + (regionChunkSize*16)/2 : - 0.5 - (regionChunkSize*16)/2), 
		z: coords.z - coords.z%(regionChunkSize*16) + (coords.z >= 0 ?  0.5 + (regionChunkSize*16)/2 : - 0.5 - (regionChunkSize*16)/2)
	};
	if(notignoreY) _object.y = coords.y;
	return _object;
}

var checkClients = {};
const wireNetworkEntityType = new NetworkEntityType('utils.wire');
wireNetworkEntityType.setClientListSetupListener(function(list, target, networkEntity){
	//Logger.Log('SetupNetworkEntity on: ' + cts(target.coords));
	list.setupDistancePolicy(target.coords.x, target.coords.y || 70, target.coords.z, target.blockSource.getDimension(), 128, 128, 1000);
}).addClientPacketListener("updateBlock", function(target, networkEntity, packetData){
	if(!target) {
		networkEntity.send("fixTarget", {});
		return ;//Logger.Log('No target: ' + JSON.stringify(target));
	}
	if(packetData.ignored) ignored = packetData.ignored;
	if(packetData.regionGroup)target.regionGroup = packetData.regionGroup;
	if(packetData.updateGroup)for(var i in packetData.updateGroup)target.regionGroup[i] = packetData.updateGroup[i];
	var coords = packetData.coords;
	if(packetData.groupAdd){
		for(var i in packetData.groupAdd){
			var name = packetData.groupAdd[i][0];
			var blockId = Network.serverToLocalId(packetData.groupAdd[i][1]);
			ICRender.getGroup(name).add(blockId, -1);
		}
	}
	//alert('updateBlock: ' + JSON.stringify(packetData.updateGroup) + " : " + JSON.stringify(target.regionGroup));
	if(!packetData.destroy)mapGetter(coords, packetData.meta, target.regionGroup, true);
	else {
		BlockRenderer.unmapAtCoords(coords.x, coords.y, coords.z);
		BlockRenderer.unmapCollisionAndRaycastModelAtCoords(target.dim, coords.x, coords.y, coords.z);
	}
}).addServerPacketListener("fixTarget", function(target, networkEntity, client, packetData, _str){
	//Logger.Log('Server get fixTarget packet');
	var __type = networkEntity.getType();
	var netName = networkEntity.getName();
	var data = __type.newClientAddPacket(networkEntity, client);
	var clientsArray = checkClients[netName] || (checkClients[netName] = []);
	if(clientsArray.indexOf(client) == -1)clientsArray.push(client);
	networkEntity.send(client, "fixTarget", data);
}).addServerPacketListener("successChecked", function(target, networkEntity, client, packetData, _str){
	//Logger.Log('Server get successChecked| Client: ' + client);
	var netName = networkEntity.getName();
	if(!checkClients[netName] || checkClients[netName].indexOf(client) == -1) return;
	checkClients[netName].splice(checkClients[netName].indexOf(client), 1);
}).addClientPacketListener("fixTarget", function(target, networkEntity, packetData, _str){
	//Logger.Log('Client get fixTarget packet');
	var __type = networkEntity.getType();
	__type.onClientEntityAdded(networkEntity, packetData);
}).addClientPacketListener("checkTarget", function(target, networkEntity, packetData, _str){
	//Logger.Log('Client get checkTarget packet');
	if(!target) {
		networkEntity.send("fixTarget", {});
		return ;//Logger.Log('No target: ' + JSON.stringify(target));
	} else {
		networkEntity.send("successChecked", {});
	}
}).setClientAddPacketFactory(function(target, networkEntity, client){
	//Logger.Log('SendInitPacketToClient| Client: ' + client + " |data: " + JSON.stringify({coords: target.coords, dim: target.blockSource.getDimension(), regionGroup: (regionGroups['d'+target.blockSource.getDimension()] || {})[cts(target.coords)]}));
	//checkClients.push({time: World.getThreadTime() + 40, networkEntity: networkEntity});
	var netName = networkEntity.getName();
	var clientsArray = checkClients[netName] || (checkClients[netName] = []);
	if(clientsArray.indexOf(client) == -1)clientsArray.push(client);
	return {coords: target.coords, dim: target.blockSource.getDimension(), regionGroup: (regionGroups['d'+target.blockSource.getDimension()] || {})[cts(target.coords)]};
}).setClientEntityRemovedListener(function(target, networkEntity){
	//Logger.Log('ClientEntityRemoved: ' + JSON.stringify(packetData));
	for (var i in target.regionGroup) {
		var splited = i.split(",");
		var coords = {
			x: Number(splited[0]),
			y: Number(splited[1]),
			z: Number(splited[2])
		};
		BlockRenderer.unmapAtCoords(coords.x, coords.y, coords.z);
		BlockRenderer.unmapCollisionAndRaycastModelAtCoords(target.dim, coords.x, coords.y, coords.z);
	}
}).setClientEntityAddedListener(function(networkEntity, packetData){
	//Logger.Log('ClientEntityAdded: ' + JSON.stringify(packetData));
	for (var i in packetData.regionGroup) {
		if(!packetData.regionGroup) continue;
		var splited = i.split(",");
		var coords = {
			x: Number(splited[0]),
			y: Number(splited[1]),
			z: Number(splited[2])
		};
		if (packetData.regionGroup[i].not) {
			for (var d in packetData.regionGroup[i].not) {
				ICRender.getGroup("not" + coords.x + "," + coords.y + "," + coords.z + ":" + packetData.regionGroup[i].not[d].x + "," + packetData.regionGroup[i].not[d].y + "," + packetData.regionGroup[i].not[d].z + "utilsWire" + packetData.dim).add(World.getBlock(packetData.regionGroup[i].not[d].x, packetData.regionGroup[i].not[d].y, packetData.regionGroup[i].not[d].z).id, -1);
			}
		};
		mapGetter(coords, packetData.regionGroup[i].meta, packetData.regionGroup, true);
	}
	return packetData;
});

Callback.addCallback('tick', function(){
	if(World.getThreadTime()%100 == 0)for(var i in checkClients){
		//alert('Network entity: ' + i);
		for(var k in checkClients[i]){
			var client = checkClients[i][k];
			//alert('Player: ' + client.getPlayerUid());
			client.send("system.entity.packet#" + i + "#" + "checkTarget", {});
		}
	}
	if(World.getThreadTime()%40 != 0) return;
	for(var dim in networkTiles){
		if(!networkTiles[dim]) continue;
		for(var i in networkTiles[dim]){
			var networkTile = networkTiles[dim][i]
			if(!networkTile) continue;
			networkTile.refreshClients();
		}
	}
}, -50);

function createTargetData(coords, blockSource){
	var returnData = {
		coords: {x: coords.x, z: coords.z},
		blockSource: blockSource || coords.blockSource
	}
	if(coords.y != undefined) returnData.coords.y = coords.y;
	return returnData;
}

Saver.addSavesScope("UtilsWire",
	function read(scope) {
		allGroups = scope ? scope.allGroups || {} : {};
	},
	function save() {
		return {allGroups: allGroups || {}};
	}
);

function getDataOnSide(side) {
	var blockDaata = [4, 5, 1, 0, 2, 3];
	return blockDaata[side];
}

function getSideOnData(data) {
	var blockDaata = [4, 5, 1, 0, 2, 3];
	return blockDaata.indexOf(data);
}

Callback.addCallback("LevelLeft", function () {
	allGroups = {};
	ignored = {}
	regionGroups = {};
	networkTiles = {};
});

Callback.addCallback('LevelLoaded', function(){
	for(var dim in allGroups){
		var fixedDim = Number(dim.substr(1));
		if(!fixedDim && fixedDim != 0) continue;
		var groups = allGroups[dim] || (allGroups[dim] = {});
		var blockSource = BlockSource.getDefaultForDimension(fixedDim);
		var createNetworkTiles = [];
		for (var i in groups) {
			var splited = i.split(",");
			var coords = {
				x: Number(splited[0]),
				y: Number(splited[1]),
				z: Number(splited[2])
			};
			var regionCentreCoords = calculateCentre(coords);
			var string_regionCentreCoords = cts(regionCentreCoords);
			((_regionGroup = (regionGroups[dim] || (regionGroups[dim] = {})))[string_regionCentreCoords] || (_regionGroup[string_regionCentreCoords] = {}))[i] = groups[i];
			createNetworkTiles.push([string_regionCentreCoords, regionCentreCoords]);
			mapGetter(coords, groups[i].meta, groups, true, blockSource);
		}
		if(!networkTiles[dim])networkTiles[dim] = {};
		for(var k in createNetworkTiles){
			var string_regionCentreCoords = createNetworkTiles[k][0];
			var regionCentreCoords = createNetworkTiles[k][1];
			if(!networkTiles[dim][string_regionCentreCoords]){
				networkTiles[dim][string_regionCentreCoords] = new NetworkEntity(wireNetworkEntityType, createTargetData(regionCentreCoords, blockSource));
			}
		}
	}
});

Block.registerPlaceFunction('utilsItemGetter', function (coords, item, block, _player, blockSource){
	//Game.prevent();
	var set_coords = coords;
    if(!World.canTileBeReplaced(block.id, block.data)){
		var relBlock = blockSource.getBlock(coords.relative.x, coords.relative.y, coords.relative.z);
		if (World.canTileBeReplaced(relBlock.id, relBlock.data)){
			set_coords = coords.relative;
		} else return;
	}
	blockData = getDataOnSide(coords.side);
	blockSource.setBlock(set_coords.x, set_coords.y, set_coords.z, BlockID.utilsItemGetter, blockData);
	World.addTileEntity(set_coords.x, set_coords.y, set_coords.z, blockSource);
	if(item.count == 0) item = {id:0,count:1,data:0,extra:null}
	Entity.setCarriedItem(_player, item.id, item.count - 1, item.data, item.extra);
});
Block.registerPlaceFunction('utilsWire', function (coords, item, block, _player, blockSource){
	//Game.prevent();
	var set_coords = coords;
    if(!World.canTileBeReplaced(block.id, block.data)){
		var relBlock = blockSource.getBlock(coords.relative.x, coords.relative.y, coords.relative.z);
		if (World.canTileBeReplaced(relBlock.id, relBlock.data)){
			set_coords = coords.relative;
		} else return;
	}
	blockSource.setBlock(set_coords.x, set_coords.y, set_coords.z, BlockID.utilsWire, 0);
	if(item.count == 0) item = {id:0,count:1,data:0,extra:null}
	Entity.setCarriedItem(_player, item.id, item.count - 1, item.data, item.extra);
});

function onItemGetterWireCreated(coords, blockSource, blockData){
	var currentDimension = blockSource.getDimension();
	var idcurrentDimension = 'd' + currentDimension;
	if(!allGroups[idcurrentDimension]) allGroups[idcurrentDimension] = {};
	var groups = allGroups[idcurrentDimension];
	var regionCentreCoords = calculateCentre(coords);
	var string_regionCentreCoords = cts(regionCentreCoords);
	var _regionGroup = ((_regionDimGroup = (regionGroups[idcurrentDimension] || (regionGroups[idcurrentDimension] = {})))[string_regionCentreCoords] || (_regionDimGroup[string_regionCentreCoords] = {}));
	var groupCoordsId = cts(coords);
	var updateGroup = {};
	groups[groupCoordsId] = updateGroup[groupCoordsId] = _regionGroup[groupCoordsId] = {
		meta: blockData
	};
	if(!networkTiles[idcurrentDimension])networkTiles[idcurrentDimension] = {};
	if(!(_networkTile = networkTiles[idcurrentDimension][string_regionCentreCoords])){
		_networkTile = networkTiles[idcurrentDimension][string_regionCentreCoords] = new NetworkEntity(wireNetworkEntityType, createTargetData(regionCentreCoords, blockSource));
	}
	_networkTile.send("updateBlock", {coords: coords, meta: blockData, updateGroup: updateGroup});
	mapGetter(coords, blockData, groups, true, blockSource);
};
function onWireCreated(coords, blockSource){
	var currentDimension = blockSource.getDimension();
	var idcurrentDimension = 'd' + currentDimension;
	if(!allGroups[idcurrentDimension]) allGroups[idcurrentDimension] = {};
	var groups = allGroups[idcurrentDimension];
	var regionCentreCoords = calculateCentre(coords);
	var string_regionCentreCoords = cts(regionCentreCoords);
	var _regionGroup = ((_regionDimGroup = (regionGroups[idcurrentDimension] || (regionGroups[idcurrentDimension] = {})))[string_regionCentreCoords] || (_regionDimGroup[string_regionCentreCoords] = {}));
	var groupCoordsId = cts(coords);
	var updateGroup = {};
	groups[groupCoordsId] = updateGroup[groupCoordsId] = _regionGroup[groupCoordsId] = {};
	if(!networkTiles[idcurrentDimension])networkTiles[idcurrentDimension] = {};
	if(!(_networkTile = networkTiles[idcurrentDimension][string_regionCentreCoords])){
		_networkTile = networkTiles[idcurrentDimension][string_regionCentreCoords] = new NetworkEntity(wireNetworkEntityType, createTargetData(regionCentreCoords, blockSource));
	}
	_networkTile.send("updateBlock", {coords: coords, updateGroup: updateGroup});
	mapGetter(coords, undefined, groups, true, blockSource);
	Threading.initThread('searchContainersThread', function(){
		searchContainers(coords, coords, blockSource);
	}, -1);
};
function onDestroyWireBlock(coords, blockSource){
	var regionCentreCoords = calculateCentre(coords);
	var string_regionCentreCoords = cts(regionCentreCoords);
	var groupCoordsId = cts(coords);
	var currentDimension = blockSource.getDimension();
	var idcurrentDimension = 'd' + currentDimension;
	if(!allGroups[idcurrentDimension]) allGroups[idcurrentDimension] = {};
	if(!regionGroups[idcurrentDimension]) regionGroups[idcurrentDimension] = {};
	delete allGroups[idcurrentDimension][groupCoordsId];
	if(regionGroups[idcurrentDimension][string_regionCentreCoords])delete regionGroups[idcurrentDimension][string_regionCentreCoords][groupCoordsId];
	BlockRenderer.unmapCollisionAndRaycastModelAtCoords(blockSource.getDimension(), coords.x, coords.y, coords.z);
	if(!networkTiles[idcurrentDimension])networkTiles[idcurrentDimension] = {};
	if(!(_networkTile = networkTiles[idcurrentDimension][string_regionCentreCoords])){
		_networkTile = networkTiles[idcurrentDimension][string_regionCentreCoords] = new NetworkEntity(wireNetworkEntityType, createTargetData(regionCentreCoords, blockSource));
	}
	var updateGroup = {};
	updateGroup[groupCoordsId] = undefined;
	_networkTile.send("updateBlock", {coords: coords, updateGroup: updateGroup, destroy: true});
}; 
World.registerBlockChangeCallback([BlockID.utilsWire, BlockID.utilsItemGetter], function(coords, oldBlock, newBlock, blockSource){
	if(oldBlock.id == newBlock.id) return;
	if(oldBlock.id == BlockID.utilsWire || oldBlock.id == BlockID.utilsItemGetter)onDestroyWireBlock(coords, blockSource);
	if(newBlock.id == BlockID.utilsWire)onWireCreated(coords, blockSource);
	if(newBlock.id == BlockID.utilsItemGetter)onItemGetterWireCreated(coords, blockSource, newBlock.data);
});
Recipes.addShaped({
	id: BlockID.utilsWire,
	count: 16,
	data: 0
}, [
	"sss",
	"iii",
	"sss"
], ['i', 265, 0, 's', 1, 0]);
Recipes.addShaped({
	id: BlockID.utilsItemGetter,
	count: 1,
	data: 2
}, [
	"ssi",
	"iih",
	"ssi"
], ['i', 265, 0, 's', 1, 0, 'h', 410, 0]);


const width = 0.1875;
const centerWidth = 0.3125;
const sideSize = 0.03;

var boxesWire = [
	[0.5 - width / 2, 0.5 - width / 2, 0 + sideSize, 0.5 + width / 2, 0.5 + width / 2, 0.5 - width / 2], //left
	[0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, 1 - sideSize], //right
	[0.5 + width / 2, 0.5 - width / 2, 0.5 - width / 2, 1 - sideSize, 0.5 + width / 2, 0.5 + width / 2], //forward
	[0 + sideSize, 0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2], //back
	[0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2, 1 - sideSize, 0.5 + width / 2], //up
	[0.5 - width / 2, 0 + sideSize, 0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2] //down
];

var boxes1 = [{
	side: [1, 0, 0],
	box: [0.5 + width / 2, 0.5 - width / 2, 0.5 - width / 2, 1, 0.5 + width / 2, 0.5 + width / 2]
},
{
	side: [-1, 0, 0],
	box: [0, 0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2]
},
{
	side: [0, 1, 0],
	box: [0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2, 1, 0.5 + width / 2]
},
{
	side: [0, -1, 0],
	box: [0.5 - width / 2, 0, 0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2]
},
{
	side: [0, 0, 1],
	box: [0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, 1]
},
{
	side: [0, 0, -1],
	box: [0.5 - width / 2, 0.5 - width / 2, 0, 0.5 + width / 2, 0.5 + width / 2, 0.5 - width / 2]
}];

var clickBoxes = [{
	side: 5,
	box: [0.5 + centerWidth / 2, 0.5 - centerWidth / 2, 0.5 - centerWidth / 2, 1, 0.5 + centerWidth / 2, 0.5 + centerWidth / 2]
},
{
	side: 4,
	box: [0, 0.5 - centerWidth / 2, 0.5 - centerWidth / 2, 0.5 - centerWidth / 2, 0.5 + centerWidth / 2, 0.5 + centerWidth / 2]
},
{
	side: 1,
	box: [0.5 - centerWidth / 2, 0.5 + centerWidth / 2, 0.5 - centerWidth / 2, 0.5 + centerWidth / 2, 1, 0.5 + centerWidth / 2]
},
{
	side: 0,
	box: [0.5 - centerWidth / 2, 0, 0.5 - centerWidth / 2, 0.5 + centerWidth / 2, 0.5 - centerWidth / 2, 0.5 + centerWidth / 2]
},
{
	side: 3,
	box: [0.5 - centerWidth / 2, 0.5 - centerWidth / 2, 0.5 + centerWidth / 2, 0.5 + centerWidth / 2, 0.5 + centerWidth / 2, 1]
},
{
	side: 2,
	box: [0.5 - centerWidth / 2, 0.5 - centerWidth / 2, 0, 0.5 + centerWidth / 2, 0.5 + centerWidth / 2, 0.5 - centerWidth / 2]
}];

(function () {

	var group = ICRender.getGroup("utilsWire");
	group.add(BlockID.utilsItemGetter, -1);
	group.add(BlockID.utilsWire, -1);

	var boxes = [
		[
			[0.2, 0.2, 0, 0.8, 0.8, sideSize] //left
		],
		[
			[0.8, 0.8, 1 - sideSize, 0.2, 0.2, 1] //right
		],
		[
			[1 - sideSize, 0.8, 0.8, 1, 0.2, 0.2] //forward
		],
		[
			[0, 0.2, 0.2, sideSize, 0.8, 0.8] //back
		],
		[
			[0.8, 1 - sideSize, 0.8, 0.2, 1, 0.2] //up
		],
		[
			[0.2, 0, 0.2, 0.8, sideSize, 0.8] //down
		]
	];

	for (var meta = 0; meta < 6; meta++) {
		var boxe = boxes[meta];
		var wire = boxesWire[meta]

		var Dmodel = new ICRender.CollisionShape();
		var render = new ICRender.Model();
		var model = BlockRenderer.createModel();
		for (var n in boxe) {
		  var box = boxe[n];
		  //var model = BlockRenderer.createModel();
		  model.addBox(box[0], box[1], box[2], box[3], box[4], box[5], 155, 0);
		  //render.addEntry(model);
		}
		model.addBox(wire[0], wire[1], wire[2], wire[3], wire[4], wire[5], wireTextureSet);
		model.addBox(0.5 - centerWidth / 2, 0.5 - centerWidth / 2, 0.5 - centerWidth / 2, 0.5 + centerWidth / 2, 0.5 + centerWidth / 2, 0.5 + centerWidth / 2, wireTextureSet);
		render.addEntry(model);

		var entry = Dmodel.addEntry();
		entry.addBox(0.2, 0.2, 0.2, 0.8, 0.8, 0.8);
		BlockRenderer.setCustomCollisionShape(BlockID.utilsItemGetter, meta, Dmodel)
		BlockRenderer.enableCoordMapping(BlockID.utilsItemGetter, meta, render);
	}
	var Dmodel = new ICRender.CollisionShape();
	var render = new ICRender.Model();
	var model = BlockRenderer.createModel();
	model.addBox(0.5 - centerWidth / 2, 0.5 - centerWidth / 2, 0.5 - centerWidth / 2, 0.5 + centerWidth / 2, 0.5 + centerWidth / 2, 0.5 + centerWidth / 2, wireTextureSet);
	render.addEntry(model);
	var entry = Dmodel.addEntry();
	entry.addBox(0.5 - centerWidth / 2, 0.5 - centerWidth / 2, 0.5 - centerWidth / 2, 0.5 + centerWidth / 2, 0.5 + centerWidth / 2, 0.5 + centerWidth / 2);
	BlockRenderer.setCustomCollisionShape(BlockID.utilsWire, -1, Dmodel);
	BlockRenderer.enableCoordMapping(BlockID.utilsWire, -1, render);
})();

function mapGetter(coords, meta, groups, atach, blockSource) {
	coords.x = Number(coords.x);
	coords.y = Number(coords.y);
	coords.z = Number(coords.z);

	var boxes = [
		[
			[0.2, 0.2, 0, 0.8, 0.8, sideSize] //left
		],
		[
			[0.8, 0.8, 1 - sideSize, 0.2, 0.2, 1] //right
		],
		[
			[1 - sideSize, 0.8, 0.8, 1, 0.2, 0.2] //forward
		],
		[
			[0, 0.2, 0.2, sideSize, 0.8, 0.8] //back
		],
		[
			[0.8, 1 - sideSize, 0.8, 0.2, 1, 0.2] //up
		],
		[
			[0.2, 0, 0.2, 0.8, sideSize, 0.8] //down
		]
	];

	var boxe = [];
	if (meta >= 0) {
		boxe = boxes[meta];
		var wire = boxesWire[meta]
	}

	var Dmodel = new ICRender.CollisionShape();
	var render = new ICRender.Model();
	var model = BlockRenderer.createModel();
	var _entry = Dmodel.addEntry();
	for (var n in boxe) {
		var box = boxe[n];
		//var model = BlockRenderer.createModel();
		if(!blockSource)model.addBox(box[0], box[1], box[2], box[3], box[4], box[5], 155, 0);
		_entry.addBox(box[0], box[1], box[2], box[3], box[4], box[5]);
		//render.addEntry(model);
	}
	if (meta >= 0 && !blockSource) model.addBox(wire[0], wire[1], wire[2], wire[3], wire[4], wire[5], wireTextureSet);
	if (meta >= 0) _entry.addBox(wire[0], wire[1], wire[2], wire[3], wire[4], wire[5]);
	if(!blockSource)model.addBox(0.5 - centerWidth / 2, 0.5 - centerWidth / 2, 0.5 - centerWidth / 2, 0.5 + centerWidth / 2, 0.5 + centerWidth / 2, 0.5 + centerWidth / 2, wireTextureSet);
	render.addEntry(model);
	_entry.addBox(0.5 - centerWidth / 2, 0.5 - centerWidth / 2, 0.5 - centerWidth / 2, 0.5 + centerWidth / 2, 0.5 + centerWidth / 2, 0.5 + centerWidth / 2);
	var _dimension = blockSource ? blockSource.getDimension() : Player.getDimension();
	for (var l in boxes1) {
		var box = boxes1[l];
		var blockg = groups[(coords.x + box.side[0]) + "," + (coords.y + box.side[1]) + "," + (coords.z + box.side[2])];
		if (!atach && blockg) {
			//if(!blockSource)BlockRenderer.unmapAtCoords(coords.x + box.side[0], coords.y + box.side[1], coords.z + box.side[2]);
			var crds = {
				x: coords.x + box.side[0],
				y: coords.y + box.side[1],
				z: coords.z + box.side[2]
			}
			mapGetter(crds, blockg.meta, groups, true, blockSource)
		}
		if(!blockSource)var model = BlockRenderer.createModel();
		if(!blockSource)model.addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5], fixedWireTextureSet);
		var gp = "not" + coords.x + "," + coords.y + "," + coords.z + ":" + (coords.x + box.side[0]) + "," + (coords.y + box.side[1]) + "," + (coords.z + box.side[2]) + "utilsWire" + _dimension;
		//var gp2 = "not" + (coords.x + box.side[0]) + "," + (coords.y + box.side[1]) + "," + (coords.z + box.side[2]) + ":" + coords.x + "," + coords.y + "," + coords.z + "utilsWire";
		if(!blockSource)render.addEntry(model).setCondition(ICRender.AND(ICRender.BLOCK(box.side[0], box.side[1], box.side[2], ICRender.getGroup(gp + (ignored[gp] >= 0 ? ignored[gp] : '')), true), ICRender.BLOCK(box.side[0], box.side[1], box.side[2], ICRender.getGroup("utilsWire"), false)));
		var entry = Dmodel.addEntry();
		entry.addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5]);
		entry.setCondition(ICRender.AND(ICRender.BLOCK(box.side[0], box.side[1], box.side[2], ICRender.getGroup(gp + (ignored[gp] >= 0 ? ignored[gp] : '')), true), ICRender.BLOCK(box.side[0], box.side[1], box.side[2], ICRender.getGroup("utilsWire"), false)));
	}
	if(!blockSource)BlockRenderer.mapAtCoords(coords.x, coords.y, coords.z, render);
	BlockRenderer.mapCollisionAndRaycastModelAtCoords(_dimension, coords.x, coords.y, coords.z, Dmodel);
}

function coordsOnBlockData(blockData, coords) {
	var retCoords = [{
		x: coords.x,
		y: coords.y,
		z: coords.z - 1
	},
	{
		x: coords.x,
		y: coords.y,
		z: coords.z + 1
	},
	{
		x: coords.x + 1,
		y: coords.y,
		z: coords.z
	},
	{
		x: coords.x - 1,
		y: coords.y,
		z: coords.z
	},
	{
		x: coords.x,
		y: coords.y + 1,
		z: coords.z
	},
	{
		x: coords.x,
		y: coords.y - 1,
		z: coords.z
	}]

	return retCoords[blockData];
}

Network.addClientPacket('Utils.updateGroups', function(packetData){
	for(var i in packetData.NewBlocksAddToGroup){
		ICRender.getGroup("utilsWire").add(Network.serverToLocalId(packetData.NewBlocksAddToGroup[i]), -1);
	}
});

Callback.addCallback('tick', function(){
	if(updateBlocksAddToGroup){
		updateBlocksAddToGroup = false;
		Network.sendToAllClients('Utils.updateGroups', {NewBlocksAddToGroup: NewBlocksAddToGroup});
		NewBlocksAddToGroup = [];
	}
});

Callback.addCallback('ServerPlayerLoaded', function(player__){
	var client = Network.getClientForPlayer(player__);
	if(client)client.send('Utils.updateGroups', {NewBlocksAddToGroup: BlocksAddToGroup})
});

function searchContainers(coordsf, outCoordsf, blockSource) {
	var containers = [];
	var outCoords = [];
	var started = [];
	function asdds(coords) {
		if (started.indexOf(cts(coords)) != -1) return;
		started.push(cts(coords));
		var tc;
		var bon_wires = [];
		for (var i in newSides) {
			var coordss = {};
			var bonus;

			coordss.x = coords.x + newSides[i][0];
			coordss.y = coords.y + newSides[i][1];
			coordss.z = coords.z + newSides[i][2];
			coordss_string = cts(coordss);
			if(outCoords.indexOf(coordss_string) != -1) continue;
			var block = blockSource.getBlock(coordss.x, coordss.y, coordss.z);
			if (blockSource.getBlockId(coords.x, coords.y, coords.z) == BlockID.utilsItemGetter && (_bonusTile = World.getTileEntity(coords.x, coords.y, coords.z, blockSource))) bonus = _bonusTile.data.target;
			var not = false;
			if(!allGroups[0]) allGroups[0] = {};
			var groups = allGroups['d' + blockSource.getDimension()];
			if (groups && groups[cts(coords)] && groups[cts(coords)].not && groups[cts(coords)].not.map(function (d) {
				return d.x + ',' + d.y + ',' + d.z
			}).indexOf(coordss_string) != -1) not = true;
			if (coordss_string != (bonus ? cts(bonus) : '') && !not) {
				var cont = World.getContainer(coordss.x, coordss.y, coordss.z, blockSource);
				var tile = World.getTileEntity(coordss.x, coordss.y, coordss.z, blockSource) || World.addTileEntity(coordss.x, coordss.y, coordss.z, blockSource);
				if (cont) {
					//devLog("Tile found");
					tc = {
						container: cont,
						type: "vanilla",
						side: i
					};
					if (!tile) {
						//devLog("Vanilla tile");
						tc.size = cont.size;
						tc.slots = [];
						for (var k = 0; k < tc.size; k++) {
							tc.slots.push(k);
						}
					} else if (tile && ((tile.getTransportSlots && tile.getTransportSlots().input) || tile.interface)) {
						//devLog("Mod tile");
						tc.type = "modded";
						tc.TileEntity = tile;
						if (tile.interface) tc.SI = true;
						if (tc.SI) tc.slots = tile.interface.getInputSlots(reverseSides[i]);
						else if(tile.getTransportSlots) tc.slots = tile.getTransportSlots().input;
						tc.size = tc.slots.length;
					} else if (tile && !tile.getTransportSlots && !tile.interface) {
						//devLog("Container not have slots");
						tc = false;
					}
				}
				if (tc && (containers && !containers.find(function (element, index, array) {
					if (element.x == coordss.x && element.y == coordss.y && element.z == coordss.z) return index;
				}))) {
					tc.x = coordss.x;
					tc.y = coordss.y;
					tc.z = coordss.z;
					if (tc.size > 0) {
						if(block.id != 0 && BlocksAddToGroup.indexOf(block.id) == -1){
							BlocksAddToGroup.push(block.id);
							NewBlocksAddToGroup.push(block.id);
							updateBlocksAddToGroup = true;
						}
					}
					containers.push(tc);
					tc = false;
				}
				if (block.id == BlockID.utilsWire || block.id == BlockID.utilsItemGetter) {
					bon_wires.push({ coordss: coordss, out: coords });
				}
			}
		}
		for (var i in bon_wires) {
			outCoords.push(cts(bon_wires[i].out));
			asdds(bon_wires[i].coordss);
		}
	}
	outCoords.push(cts(outCoordsf));
	asdds(coordsf);
	return containers;

}

function targetIsContainer(coords, _item_data, blockSource) {
	var tc = false;
	var coordss = coords;
	var __container = World.getContainer(coordss.x, coordss.y, coordss.z, blockSource);
	var __tileentity = World.getTileEntity(coordss.x, coordss.y, coordss.z, blockSource) || World.addTileEntity(coordss.x, coordss.y, coordss.z, blockSource);
	if (__container) {
		//devLog("target found");
		var _side = getSideOnData(_item_data);
		tc = {
			container: __container,
			type: "vanilla",
			side: reverseSides[_side]
		};
		if (!__tileentity) {
			//devLog("target vanilla tile");
			tc.size = __container.size;
			tc.slots = [];
			for (var k = 0; k < tc.size; k++) {
				tc.slots.push(k);
			}
		} else if (__tileentity && ((__tileentity.getTransportSlots && __tileentity.getTransportSlots().output) || __tileentity.interface)) {
			//devLog("target mod tile");
			tc.type = "modded";
			tc.TileEntity = __tileentity;
			if (tc.TileEntity.interface) tc.SI = true;
			if (tc.SI) tc.slots = tc.TileEntity.interface.getOutputSlots(_side);
			else if(__tileentity.getTransportSlots) tc.slots = __tileentity.getTransportSlots().output;
			tc.size = tc.slots.length;
		} else if (__tileentity && !__tileentity.getTransportSlots && !__tileentity.interface) {
			tc = false;
		}
	}

	return tc;
}

function _whiteList(element) {
	if (element.id == this.item.id && (this.ignore_item_data || element.data == -1 || element.data == this.item.data)) return true;
}
function searchExportSlot(tile1, wireTile) {
	var container = tile1.container;
	var slots = tile1.slots;
	for (var i in slots) {
		if (container.getSlot(slots[i]).id != 0 && (!tile1.SI || !tile1.TileEntity.interface.slots[slots[i]].canOutput || tile1.TileEntity.interface.slots[slots[i]].canOutput(container.getSlot(slots[i]), tile1.side, tile1.TileEntity))) {
			//devLog("True slot: " + slots[i]);
			var item = container.getSlot(slots[i]);
			if ((wireTile.data.black_list.length == 0 || !wireTile.data.black_list.find(_whiteList, {item: item, ignore_item_data: wireTile.data.ignore_item_data})) && (wireTile.data.white_list.length == 0 || wireTile.data.white_list.find(_whiteList, {item: item, ignore_item_data: wireTile.data.ignore_item_data}))) 
				return slots[i];
			else
				continue;
		} else {
			//devLog("Slot not found");
			continue;
		}
	}
	return 'not found';
}

function searchImportSlot(containers, item) {
	for (var cont in containers) {
		for (var slot in containers[cont].slots) {
			var item2 = containers[cont].container.getSlot(containers[cont].slots[slot]);
			if ((item2.id == 0 || (item2.id == item.id && item2.extra == item.extra && item2.data == item.data && item2.count < Item.getMaxStack(item.id))) && (!containers[cont].SI || ((!containers[cont].TileEntity.interface.isValidInput || containers[cont].TileEntity.interface.isValidInput(item, containers[cont].side, containers[cont].TileEntity)) && (!containers[cont].TileEntity.interface.slots[containers[cont].slots[slot]].isValid || containers[cont].TileEntity.interface.slots[containers[cont].slots[slot]].isValid(item, containers[cont].side, containers[cont].TileEntity))))) {
				return {
					slot: containers[cont].slots[slot],
					container: containers[cont].container
				};
			} else {
				continue;
			}
		}
	}
	return false;
}

function pay(container1, container2, slot1, slot2, item) {
	var item1 = container1.getSlot(slot1);
	if (item1.count != item.count) return;
	var item2 = container2.getSlot(slot2);
	var count = Math.min(item2.count + item.count, 64);
	var other = Math.max(item2.count + item.count - 64, 0);
	container2.setSlot(slot2, item.id, count, item.data, item.extra || null);
	container1.setSlot(slot1, item1.id, other, item1.data, item1.extra || null)
	if (container1.validateSlot) container1.validateSlot(slot1);
	if (container2.validateSlot) container2.validateSlot(slot2);
}

function apply() {
	var target = targetIsContainer(this.data.target, this.data.blockData, this.blockSource);
	if (!target) return;//devLog("!target");
	var exportSlot = searchExportSlot(target, this);
	if (exportSlot == 'not found') return;//devLog("export slot not found");
	var containers = searchContainers(this, this.data.target, this.blockSource);
	if (containers.length == 0) return;// devLog("no containers");
	var importData = searchImportSlot(containers, target.container.getSlot(exportSlot));
	if (!importData) return;//devLog("no import slot");
	pay(target.container, importData.container, exportSlot, importData.slot, target.container.getSlot(exportSlot));
}

var wireGuiData = {
	list_mode: false,
	ignore_item_data: false
};

var wireGUI_elements = {};
function init_wireGUI_elements(){
	wireGUI_elements["DellayScroll"] = {
		type: "scroll",
		x: 100 + 225,
		y: 180/575.5*UI.getScreenHeight(),
		length: 800 - 225,
		min: 5,
		max: 120,
		isInt: true,
		value: 0,
		onNewValue: function (value, itemContainerUiHandler, element) {
			if(!itemContainerUiHandler || !wireGuiData.networkData || wireGuiData.networkData.getInt('updateFreq', 0) == value) return;
			wireGuiData.networkData.putInt('updateFreq', value);
			wireGuiData.networkData.putBoolean('update', true);
			itemContainerUiHandler.setBinding('text', 'text', Translation.translate("Update frequency (in ticks)") + " : " + value);
		}
	},
	wireGUI_elements["text"] = {
		type: "text",
		x: 420,
		y: 130/575.5*UI.getScreenHeight(),
		font: {
			size: 20/575.5*UI.getScreenHeight(),
			color: android.graphics.Color.DKGRAY
		},
		text: "Частота обновления (в тиках) : 0"
	},
	wireGUI_elements["text2"] = {
		type: "text",
		x: 1000 - 225,
		y: 30/575.5*UI.getScreenHeight(),
		font: {
			color: android.graphics.Color.DKGRAY,
			//shadow: 0.5,
			size: 15
		},
		text: Translation.translate("1 second = 20 ticks")
	}
	var slot_size = 60/575.5*UI.getScreenHeight();
	var slots_count = 20;
	var slotsXSstart = 350;
	var slotsYSstart = 300/575.5*UI.getScreenHeight()
	slot_size = Math.min(slot_size, (950 - slotsXSstart)/(slots_count/2));
	for(var i = 0; i < slots_count; i++){
		wireGUI_elements['slot'+i] = {
			id: i,
			type: "slot",
			x: slotsXSstart + slot_size*(i % (slots_count/2)),
			y: slotsYSstart + slot_size*Math.floor(i/(slots_count/2)),
			z: 100,
			size: slot_size
		}
	}
	wireGUI_elements["DellayScroll"].length = slotsXSstart + slot_size*parseInt(slots_count/2) - 25/575.5*UI.getScreenHeight() - wireGUI_elements["DellayScroll"].x;
	var filter_cons = 10/575.5*UI.getScreenHeight();
	var image_cons = 5/575.5*UI.getScreenHeight();
	wireGUI_elements["list_mode"] = {
		type: "button",
		x: 0,
		y: wireGUI_elements['slot0'].y,
		bitmap: 'RS_empty_button',
		bitmap2: 'RS_empty_button_pressed',
		scale: (slot_size*2 - filter_cons)/2/24,
		clicker: {
			onClick: function (itemContainerUiHandler, container, element) {
				container.sendEvent("updateListMode", {list_mode: wireGuiData.list_mode = !wireGuiData.list_mode});
			},
			onLongClick: function (itemContainerUiHandler, container, element) {
				
			}
		}
	}
	wireGUI_elements["list_mode"].x = wireGUI_elements['slot0'].x - filter_cons - (20 * wireGUI_elements["list_mode"].scale);

	wireGUI_elements["image_list_mode"] = {
		type: "image",
		x: 0,
		y: 0,
		z: 1000,
		bitmap: "wire_black_list",
		scale: 1,
	}
	wireGUI_elements["image_list_mode"].scale = (20*wireGUI_elements["list_mode"].scale - image_cons)/30/575.5*UI.getScreenHeight();
	wireGUI_elements["image_list_mode"].x = wireGUI_elements["list_mode"].x + image_cons;
	wireGUI_elements["image_list_mode"].y = wireGUI_elements["list_mode"].y + (wireGUI_elements["list_mode"].scale * 20 - wireGUI_elements["image_list_mode"].scale*24) / 2,

	wireGUI_elements["ignore_item_data"] = {
		type: "button",
		x: wireGUI_elements["list_mode"].x,
		y: wireGUI_elements["list_mode"].y + (wireGUI_elements["list_mode"].scale * 20) + filter_cons,
		bitmap: 'RS_empty_button',
		bitmap2: 'RS_empty_button_pressed',
		scale: wireGUI_elements["list_mode"].scale,
		clicker: {
			onClick: function (itemContainerUiHandler, container, element) {
				container.sendEvent("updateIgnoreItemData", {ignore_item_data: wireGuiData.ignore_item_data = !wireGuiData.ignore_item_data});
			},
			onLongClick: function (itemContainerUiHandler, container, element) {
				
			}
		}
	}

	wireGUI_elements["image_ignore_item_data"] = {
		type: "image",
		x: 0,
		y: 0,
		z: 1000,
		bitmap: "item_data_not_ignore",
		scale: 1/575.5*UI.getScreenHeight(),
	}
	wireGUI_elements["image_ignore_item_data"].scale = (20*wireGUI_elements["ignore_item_data"].scale - image_cons)/24/575.5*UI.getScreenHeight();
	wireGUI_elements["image_ignore_item_data"].x = wireGUI_elements["ignore_item_data"].x + (wireGUI_elements["ignore_item_data"].scale * 20 - wireGUI_elements["image_ignore_item_data"].scale * 24) / 2
	wireGUI_elements["image_ignore_item_data"].y = wireGUI_elements["ignore_item_data"].y + (wireGUI_elements["ignore_item_data"].scale * 20 - wireGUI_elements["image_ignore_item_data"].scale * 24) / 2
}
init_wireGUI_elements();

var wireGUI = new UI.StandartWindow({
	standart: {
		header: {
			text: {
				text: Translation.translate('Extraction pipe')
			}
		},
		inventory: {
			padding: 20,
			width: 225
		},
		background: {
			standart: true
		}
	},
	drawing: [],
	elements: wireGUI_elements
});
wireGUI.getWindow('main').forceRefresh();

TileEntity.registerPrototype(BlockID.utilsItemGetter, {
	defaultValues: {
		blockData: 0,
		target: { x: 0, y: 0, z: 0 },
		slot: null,
		ticks: 0,
		updateFreq: 60,
		value: 0,
		black_list: [],
		white_list: [],
		list_mode: 'black_list',
		ignore_item_data: false
	},
	useNetworkItemContainer: true,
	click: function (id, count, data, coords, player, extra) {
		if (wrenches.indexOf(id) != -1 || Entity.getSneaking(player)) return false;
        var client = Network.getClientForPlayer(player);
        if(!client) return true;
        if (this.container.getNetworkEntity().getClients().contains(client)) return true;
        this.container.openFor(client, "main");
		return true;
	},
    getScreenByName: function(screenName) {
        if(screenName == 'main')return wireGUI;
    },
	created: function () {
        if(!this.blockSource)this.blockSource = BlockSource.getDefaultForDimension(this.dimension);
		this.data.blockData = this.blockSource.getBlock(this.x, this.y, this.z).data;
		this.data.target = coordsOnBlockData(this.data.blockData, this);
	},
	update_list_mode: function(mode){
		if(mode == 'white_list'){
			this.data.white_list = this.data.black_list;
			this.data.black_list = [];
		} else {
			this.data.black_list = this.data.white_list;
			this.data.white_list = [];
		}
		this.data.list_mode = mode;
	},
	tick: function () {
		this.data.ticks++;
		if (this.data.ticks >= this.data.updateFreq) {
			this.data.ticks = 0;
			apply.apply(this);
		}
	},
	init: function () {
		if (!this.data.target) this.created();
		if (!this.data.black_list)this.data.black_list = [];
		if (!this.data.white_list)this.data.white_list = [];
		searchContainers(this, this.data.target, this.blockSource);
		this.data.updateFreq = Math.max(5, Math.min(this.data.updateFreq, 120));
		var tile = this;
		this.container.addServerOpenListener({
			onOpen: function(container, client){
				tile.updateWindow(client);
			}
		});
		this.container.setGlobalAddTransferPolicy({
			transfer: function(itemContainer, slot, id, count, data, extra, player){
				var thisSlot = itemContainer.getSlot(slot);
				if(thisSlot.id != 0) return 0;
				tile.data[tile.data.list_mode].push({id: id, data: data});
				itemContainer.setSlot(slot, id, 1, data, extra);
				return 0;
			}
		})
		this.container.setGlobalGetTransferPolicy({
			transfer: function(itemContainer, slot, id, count, data, extra, player){
				if(id == 0) return 0;
				var index = tile.data[tile.data.list_mode].findIndex(function(elem, index){
					if(elem.id == id && (elem.data == -1 || elem.data == data)) return true;
				});
				if(index >= 0){
					tile.data[tile.data.list_mode].splice(index, 1);
				}
				itemContainer.setSlot(slot, 0, 0, 0, null);
				return 0;
			}
		})
	},
	updateWindow: function(client){
		var _data = {
			name: this.networkData.getName() + '',
			list_mode: this.data.list_mode,
			ignore_item_data: this.data.ignore_item_data,
			updateFreq: this.data.updateFreq
		};
		if(client){
			if(typeof(client) == "number") client = Network.getClientForPlayer(client);
			this.container.sendEvent(client, "updateWindow", _data);
		} else {
			this.container.sendEvent("updateWindow", _data);
		}
	},
	destroy: function(){
		for(var i in this.container.slots){
			this.container.clearSlot(i);
		}
	},
	client: {
		tick: function(){
			if(this.networkData.getBoolean('update', false)){
				this.networkData.putBoolean('update', false);
				this.sendPacket("updateFreq", {updateFreq: this.networkData.getInt('updateFreq')})
			}
		},
		containerEvents: {
			updateWindow: function(container, window, content, eventData){
				wireGuiData.networkData = SyncedNetworkData.getClientSyncedData(eventData.name);
				if(!content)content = wireGUI.getWindow('main').getContent();
				content.elements["image_list_mode"].bitmap = 'wire_' + eventData.list_mode;
				content.elements["image_ignore_item_data"].bitmap = eventData.ignore_item_data ? 'item_data_ignore' : 'item_data_not_ignore';
				container.setText('text', Translation.translate("Update frequency (in ticks)") + " : " + eventData.updateFreq);
				wireGuiData.networkData.putInt('updateFreq', eventData.updateFreq);
				container.setScale('DellayScroll', eventData.updateFreq);
			}
		}
	},
    containerEvents: {
        'updateListMode': function(eventData, connectedClient) {
            this.update_list_mode(eventData.list_mode ? 'white_list' : 'black_list');
			this.updateWindow();
        },
        'updateIgnoreItemData': function(eventData, connectedClient) {
            this.data.ignore_item_data = !!eventData.ignore_item_data;
			this.updateWindow();
        }
	},
	events: {
		updateFreq: function(packetData, packetExtra, connectedClient) {
            this.data.updateFreq = packetData.updateFreq;
			var allClients = this.container.getNetworkEntity().getClients();
			var iterator = allClients.iterator();
			while(iterator.hasNext()){
				var client = iterator.next();
				if(client != connectedClient)this.updateWindow(client);
			}
		}
	}
})




// file: blocks/XPFarm.js

IDRegistry.genBlockID("XPFarm_core");
Block.createBlock("XPFarm_core", [{
    name: "XP Reactor Core",
    texture: [
        ["XPFarm_core", 0]
    ],
    inCreative: false
}], Block.createSpecialType({
    base: 49,
    destroytime: -1
}));
mod_tip(BlockID.XPFarm_core);

IDRegistry.genBlockID("XPFarm_block");
Block.createBlock("XPFarm_block", [{
    name: "XP Reactor Frame",
    texture: [
        ["XPFarmBlock", 0]
    ],
    inCreative: false
}], Block.createSpecialType({
    base: 49
}));
mod_tip(BlockID.XPFarm_block);

Block.registerDropFunctionForID(BlockID.XPFarm_core, function(coords, id, data, diggingLevel, toolLevel) {
    return [];
});

Block.registerDropFunctionForID(BlockID.XPFarm_block, function(coords, id, data, diggingLevel, toolLevel) {
    return [];
});

TileEntity.registerPrototype(BlockID.XPFarm_core, {
    defaultValues: {
        XP: 0,
        ticks: 0,
        tiicks: 0
    },
    tick: function() {
        if (!this.data) return;
        this.data.ticks++
        if (this.data.ticks >= 1200) {
            this.data.ticks = 0;
            this.data.XP += 30;
        }
        this.data.tiicks++
        if (this.data.tiicks >= 30) {
            this.data.tiicks = 0;
            for (var i in newSides) {
                var coords = {
                    x: this.x + newSides[i][0],
                    y: this.y + newSides[i][1],
                    z: this.z + newSides[i][2]
                }
                if (this.blockSource.isChunkLoadedAt(coords.x, coords.z) && this.blockSource.getBlock(coords.x, coords.y, coords.z).id != BlockID.XPFarm_block) {
                    this.blockSource.explode(this.x, this.y, this.z, 10, true);
                    return;
                }
            }
        }
    }
});

TileEntity.registerPrototype(BlockID.XPFarm_block, {
    defaultValues: {
        XPFarmCore: null,
        ticks: 0
    },
    tick: function() {
        this.data.ticks++;
        if (this.data.ticks >= 30) {
            this.data.ticks = 0;
            if (!this.data.XPFarmCore) {
                this.data.XPFarmCore = checkBlocksOnSides(this, BlockID.XPFarm_core);
                return;
            };
        }
    },
    click: function(id, count, data, coords, player, extra) {
        if (Entity.getSneaking(player) || !this.data.XPFarmCore) return false;
		var client = Network.getClientForPlayer(player);
        var _playerActor = new PlayerActor(player);
        var XPFarmCore = this.data.XPFarmCore;
        if(!XPFarmCore) return true;
        var tile = World.getTileEntity(XPFarmCore.x, XPFarmCore.y, XPFarmCore.z, this.blockSource);
        if (tile.data.XP == 0) return tipMessage(client,"§cExperience not available");
        _playerActor.addExperience(tile.data.XP);
        tipMessage(client, "§a" + tile.data.XP + " XP added");
        tile.data.XP = 0;
        return true;
    }
});

Callback.addCallback("ItemUse", function(coords, item, block, param1, player) {
    if (item.id != ItemID.utilsHammer) return;
    if (block.id != BlockID.worldClock && block.id != BlockID.XPStorage) return;
    var blockSource = BlockSource.getDefaultForActor(player);
    var DBCoords = checkBlocksOnSides(blockSource, coords, 57);
    if (!DBCoords) return;
    var ClocksBlocks = 0;
    var XPClocksCoords = checkBlocksOnSides(blockSource, DBCoords, [BlockID.worldClock, BlockID.XPStorage], true, function(_blockSource, _coords, _block, _list){
        if(_block.id == BlockID.worldClock) ClocksBlocks++;
        return true;
    });
    var client = Network.getClientForPlayer(player);
    if(!client) return;
    if (ClocksBlocks != 3 && XPClocksCoords.length != 6) return chatMessage(client, '§cIncorrect structure, requires 3 XPStorage and 3 WorldClock');
    blockSource.setBlock(DBCoords.x, DBCoords.y, DBCoords.z, BlockID.XPFarm_core, 0);
    for (var i in XPClocksCoords) {
        var crds = XPClocksCoords[i];
        World.removeTileEntity(crds.x, crds.y, crds.z, blockSource);
        blockSource.setBlock(crds.x, crds.y, crds.z, BlockID.XPFarm_block, 0);
        var newTile = World.addTileEntity(crds.x, crds.y, crds.z, blockSource);
        newTile.data.XPFarmCore = DBCoords;
    }
    World.addTileEntity(DBCoords.x, DBCoords.y, DBCoords.z, blockSource);
});

ModAPI.addAPICallback("WailaAPI", function(api) {
    api.Waila.addExtension(BlockID.XPFarm_block, function(id, data, elements, tile, yPos) {
        if (!tile) return yPos;
        if (!tile.data.XPFarmCore) return yPos;
        var coords = tile.data.XPFarmCore;
        var CoreTile = World.getTileEntity(coords.x, coords.y, coords.z);
        if (!CoreTile) return yPos;

        elements["XP"] = {
            type: "text",
            text: "XP: " + CoreTile.data.XP,
            x: 200,
            y: yPos,
            font: {
                color: api.Style.DEF,
                size: 40
            }
        };
        yPos += 60;

        api.Waila.requireHeight(20);
        return yPos;
    })
})




// file: items/wrench.js

IDRegistry.genItemID("utilsWrench");
Item.createItem("utilsWrench", "Wrench", {
	name: "wrench"
}, {
	stack: 1
});
mod_tip(ItemID.utilsWrench);

Recipes.addShaped({
	id: ItemID.utilsWrench,
	count: 1,
	data: 0
}, [
	"i i",
	"iii",
	" i "
], ['i', 265, 0]);

var wrenches = [ItemID.utilsWrench];

ModAPI.addAPICallback("ICore", function(api) {
	wrenches.push(ItemID.wrenchBronze);
});

Callback.addCallback("ItemUse", function (coords, item, _block, param1, player) {
	if ((_block.id == BlockID.utilsWire || _block.id == BlockID.utilsItemGetter) && wrenches.indexOf(item.id) != -1) {
		var touchCoords = coords.vec;
		for(var i in touchCoords){
			var absValue = Math.abs(touchCoords[i])
			touchCoords[i] = absValue - parseInt(absValue);
		}
		var side = null;
		for(var i in clickBoxes){
			var box = clickBoxes[i].box;
			if(touchCoords.x >= box[0] && touchCoords.x <= box[3] && touchCoords.y >= box[1] && touchCoords.y <= box[4] && touchCoords.z >= box[2] && touchCoords.z <= box[5]){
				side = clickBoxes[i].side;
				break;
			}
		}
		var blockSource = BlockSource.getDefaultForActor(player);
		var selectedWire = coords;
		var coords = World.getRelativeCoords(coords.x, coords.y, coords.z, side);
		var block = blockSource.getBlock(coords.x, coords.y, coords.z);
		if (block.id == 0 || side == null) return;
		var currentDimension = blockSource.getDimension();
		var idcurrentDimension = 'd' + currentDimension;
		if(!allGroups[idcurrentDimension]) allGroups[idcurrentDimension] = {};
		var groups = allGroups[idcurrentDimension];
		var updateGroup = {};
		if(!regionGroups[idcurrentDimension]) regionGroups[idcurrentDimension] = {};
		var sel = selectedWire.x + "," + selectedWire.y + "," + selectedWire.z;
		var crds = coords.x + "," + coords.y + "," + coords.z;
		var regionCentreCoords = calculateCentre(selectedWire);
		var string_regionCentreCoords = cts(regionCentreCoords);
		var _regionGroups = regionGroups[idcurrentDimension][string_regionCentreCoords];
		if(!networkTiles[idcurrentDimension])networkTiles[idcurrentDimension] = {};
		if(!(_networkTile = networkTiles[idcurrentDimension][string_regionCentreCoords])){
			_networkTile = networkTiles[idcurrentDimension][string_regionCentreCoords] = new NetworkEntity(wireNetworkEntityType, createTargetData(regionCentreCoords, blockSource));
		}
		if (!groups[sel]) return tipMessage(player, "§aERROR");
		if (groups[sel].not) groups_sel = groups[sel].not.map(function(d) {
			return d.x + ',' + d.y + ',' + d.z
		});
		if (groups[crds] && groups[crds].not) groups_crds = groups[crds].not.map(function(d) {
			return d.x + ',' + d.y + ',' + d.z
		});
		var a = groups[sel].not && groups[sel].not.length > 0 && groups_sel.indexOf(crds) != -1;
		var b = groups[crds] && groups[crds].not && groups[crds].not.length > 0 && groups_crds.indexOf(sel) != -1;
		var not_sel_string = 'not' + sel + ':' + crds + 'utilsWire' + currentDimension;
		var not_crds_string = 'not' + crds + ':' + sel + 'utilsWire' + currentDimension;
		if (a || b) {
			if (a) {
				groups[sel].not.splice(groups_sel.indexOf(crds), 1);
				ignored[not_sel_string] = ignored[not_sel_string] >= 0 ? ignored[not_sel_string] + 1 : 0;
				mapGetter(selectedWire, groups[sel].meta, groups, true, blockSource);
				updateGroup[sel] = _regionGroups[sel] = groups[sel];
				if(groups[crds])updateGroup[crds] = _regionGroups[crds] = groups[crds];
				_networkTile.send("updateBlock", {coords: selectedWire, meta: groups[sel].meta, updateGroup: updateGroup, ignored:ignored});
			};
			if (b) {
				groups[crds].not.splice(groups_crds.indexOf(sel), 1);
				ignored[not_crds_string] = ignored[not_crds_string] >= 0 ? ignored[not_crds_string] + 1 : 0;
				mapGetter(coords, groups[crds].meta, groups, true, blockSource);
				updateGroup[crds] = _regionGroups[crds] = groups[crds];
				if(groups[crds])updateGroup[crds] = _regionGroups[crds] = groups[crds];
				_networkTile.send("updateBlock", {coords: coords, meta: groups[sel].meta, updateGroup: updateGroup, ignored:ignored});
			};
		} else {
			var groupAdd = [];
			if (groups[sel].not) {
				groups[sel].not.push({
					x: coords.x,
					y: coords.y,
					z: coords.z
				});
			} else {
				groups[sel].not = [{
					x: coords.x,
					y: coords.y,
					z: coords.z
				}];
			}
			groupAdd.push([not_sel_string + (ignored[not_sel_string] >= 0 ? ignored[not_sel_string] : ''), block.id]);
			if ((block.id == BlockID.utilsWire || block.id == BlockID.utilsItemGetter) && groups[crds]) {
				if (groups[crds].not) {
					groups[crds].not.push({
						x: selectedWire.x,
						y: selectedWire.y,
						z: selectedWire.z
					});
				} else {
					groups[crds].not = [{
						x: selectedWire.x,
						y: selectedWire.y,
						z: selectedWire.z
					}];
				}
				groupAdd.push([not_crds_string + (ignored[not_crds_string] >= 0 ? ignored[not_crds_string] : ''), _block.id]);
			}
			mapGetter(selectedWire, groups[sel].meta, groups, true, blockSource);
			updateGroup[sel] = _regionGroups[sel] = groups[sel];
			if(groups[crds])updateGroup[crds] = _regionGroups[crds] = groups[crds];
			_networkTile.send("updateBlock", {groupAdd: groupAdd, coords: selectedWire, meta: groups[sel].meta, updateGroup: updateGroup, ignored:ignored});
		}
	}
});




// file: shared.js

ModAPI.registerAPI("UtilsAPI", {
    //Combiner: Combiner,
    ignoreList: ignoreList, //flacon.js
    requireGlobal: function (command) {
        return eval(command);
    }
});
Logger.Log("UtilsAPI Loaded", "API");




