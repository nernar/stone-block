/*
BUILD INFO:
  dir: dev
  target: main.js
  files: 44
*/



// file: header.js

//ProjectE by Toncho (c) 2018 do not distribute.
//CuiZhenhang 12th revision in August, 2021.

var helps="<ProjectE> Aviable commands: \n"+
"§3/projecte set <id> <data> <value>    §r(Set EMC value for item)\n"+
"§3/project sethand <value>    §r(Set EMC value for item that you are holding)\n"+
"§3/projecte reload    §r(Reload EMC value)\n"+
"§3/projecte clear    §r(Clear all custom EMC value)\n"+
"§3/projecte getui    §r(Get the location of showing EMC)\n"+
"§3/projecte setui <x> <y> <size>    §r(Change the location of showing EMC)\n",
helps_zh=
"<ProjectE> 可使用的命令: \n"+
"§3/projecte set <id> <data> <value>    §r(设置物品的EMC值)\n"+
"§3/project sethand <value>    §r(设置您手持的物品的EMC值)\n"+
"§3/projecte reload    §r(重新加载EMC值)\n"+
"§3/projecte clear    §r(清除所有自定义EMC值)\n"+
"§3/projecte getui    §r(获取显示EMC的位置)\n"+
"§3/projecte setui <x> <y> <size>    §r(更改显示EMC的位置)\n";

IMPORT("ChargeItem");
IMPORT("SoundAPI");
IMPORT("StorageInterface");
if(Game.getEngineVersion().split(".")[0]=="2") IMPORT("workbench");

var fallVelocity = -0.0785;
var DIRS=[{x: 0, y: 1, z: 0}, {x: 0, y: -1, z: 0}, {x: 1, y: 0, z: 0}, {x: -1, y: 0, z: 0}, {x: 0, y: 0, z: 1}, {x: 0, y: 0, z: -1}];

var hard_mode = __config__.getBool("困难模式");
if(__config__.getBool("强制屏幕长宽比.开/关")){
var 屏幕长宽比 = __config__.getNumber("强制屏幕长宽比.长") / __config__.getNumber("强制屏幕长宽比.宽");
}else{
var 屏幕长宽比_display = UI.getContext().getWindowManager().getDefaultDisplay();
var 屏幕长宽比 = 屏幕长宽比_display.getWidth() / 屏幕长宽比_display.getHeight();
};

var dropItem = ModAPI.requireGlobal("Level.dropItem");

Recipes.addCraftToolRecipeItem = function(result, data, tool){
	data.push({id: tool, data: -1});
	Recipes.addShapeless(result, data, function(api, field, result){
	   for(var i in field){
			   if(field[i].id!=tool){
				    api.decreaseFieldSlot(i);
			   }
		  }
	 });
};

var GuiName;
Callback.addCallback("NativeGuiChanged", function(screenName){GuiName = screenName;});


//friendly
var friendlyList = [10/*鸡*/,11/*牛*/,12/*猪*/,13/*羊*/,14/*狼*/,15/*村民*/,16/*哞菇*/,17/*鱿鱼*/,
18/*兔子*/,19/*蝙蝠*/,20/*铁傀儡*/,21/*雪傀儡*/,22/*豹猫*/,23/*马*/,24/*驴*/,25/*骡*/,26/*骷髅马*/,27/*僵尸马*/,28/*北极熊*/,29/*羊驼*/,
30/*鹦鹉*/,31/*海豚*/,74/*海龟*/,75/*流浪猫*/,108/*河豚*/,109/*鲑鱼*/,111/*热带鱼*/,112/*鳕鱼*/,113/*熊猫*/,115/*村民*/,118/*流浪商人*/,121,122,125];

//evil
var evilList = [32/*僵尸*/,33/*苦力怕*/,34/*骷髅*/,35/*蜘蛛*/,36/*僵尸猪人*/,37/*史莱姆*/,38/*末影人*/,
39/*蠹虫*/,40/*洞穴蜘蛛*/,41/*恶魂*/,42/*岩浆怪*/,43/*烈焰人*/,44/*僵尸村民*/,45/*女巫*/,46/*流浪者*/,47/*尸壳*/,48/*凋灵骷髅*/,
49/*守卫者*/,50/*远古守卫者*//*,52*//*凋灵*//*,53*//*末影龙*/,54/*潜影贝*/,55/*末影螨*/,57/*卫道士*/,58/*幻翼*/,59/*劫掠兽*/,104/*唤魔者*/,
105/*恼鬼*/,110/*溺尸*/,114/*掠夺者*/,116/*僵尸村民*/,123,124,126,127];

//all
var allMobs = [71/*末影水晶*/,32/*僵尸*/,33/*苦力怕*/,34/*骷髅*/,35/*蜘蛛*/,36/*僵尸猪人*/,37/*史莱姆*/,38/*末影人*/,
39/*蠹虫*/,40/*洞穴蜘蛛*/,41/*恶魂*/,42/*岩浆怪*/,43/*烈焰人*/,44/*僵尸村民*/,45/*女巫*/,46/*流浪者*/,47/*尸壳*/,48/*凋灵骷髅*/,
49/*守卫者*/,50/*远古守卫者*/,52/*凋灵*/,53/*末影龙*/,54/*潜影贝*/,55/*末影螨*/,57/*卫道士*/,58/*幻翼*/,59/*劫掠兽*/,104/*唤魔者*/,
105/*恼鬼*/,110/*溺尸*/,114/*掠夺者*/,116/*僵尸村民*/,123,124,126,127,10/*鸡*/,11/*牛*/,12/*猪*/,13/*羊*/,14/*狼*/,15/*村民*/,16/*哞菇*/,17/*鱿鱼*/,
18/*兔子*/,19/*蝙蝠*/,20/*铁傀儡*/,21/*雪傀儡*/,22/*豹猫*/,23/*马*/,24/*驴*/,25/*骡*/,26/*骷髅马*/,27/*僵尸马*/,28/*北极熊*/,29/*羊驼*/,
30/*鹦鹉*/,31/*海豚*/,74/*海龟*/,75/*流浪猫*/,108/*河豚*/,109/*鲑鱼*/,111/*热带鱼*/,112/*鳕鱼*/,113/*熊猫*/,115/*村民*/,118/*流浪商人*/,121,122,125];

var ToolType={};

ToolAPI.breakCarriedTool = function(damage){
	var item = Player.getCarriedItem();
	item.data += damage;
	if(item.data > Item.getMaxDamage(item.id)){
		item.id = item.data = item.count = 0;
	}
	Player.setCarriedItem(item.id, item.count, item.data, item.extra);
};

ToolAPI.setTool = function(id, toolMaterial, toolType, brokenId){
	Item.setToolRender(id, true);
	toolMaterial = ToolAPI.toolMaterials[toolMaterial] || toolMaterial;
	if(toolType.blockTypes){
		toolProperties = {brokenId: brokenId || 0};
		for(var i in toolType){
		toolProperties[i] = toolType[i];}
		if(!toolMaterial.durability){
			var maxDmg = Item.getMaxDamage(id)
			toolMaterial.durability = maxDmg;
		}
		ToolAPI.registerTool(id, toolMaterial, toolType.blockTypes, toolProperties);
	}
	else{
		Item.setMaxDamage(id, toolMaterial.durability);
	}
	if(toolType.enchantType){
		Item.setEnchantType(id, toolType.enchantType, toolMaterial.enchantability);
	}
	if(toolType.useItem){
		Item.registerUseFunctionForID(id, toolType.useItem);
	}
	if(toolType.destroyBlock){
		Callback.addCallback("DestroyBlock", function(coords, block, player){
			var item = Player.getCarriedItem();
			if(item.id == id){
				toolType.destroyBlock(coords, coords.side, item, block);
			}
		});
	}
};

ToolType.pickaxe = {
	isWeapon: false,
	damage: 0,
	baseDamage: 0,
	blockTypes: ["stone"],
	onDestroy: function(item){
	item.data=0;
	},
	onBroke: function(item){
	item.data=0;
	return true;
	},
	onAttack: function(item, mob){
	item.data=0;
	}
};

ToolType.axe = {
	isWeapon: false,
	damage: 0,
	baseDamage: 0,
	blockTypes: ["wood"],
	onDestroy: function(item){
	item.data=0;
	},
	onBroke: function(item){
	item.data=0;
	return true;
	},
	onAttack: function(item, mob){
	item.data=0;
	}
};

ToolType.shovel = {
	isWeapon: false,
	damage: 0,
	baseDamage: 0,
	blockTypes: ["dirt"],
	onDestroy: function(item){
	item.data=0;
	},
	onBroke: function(item){
	item.data=0;
	return true;
	},
	onAttack: function(item, mob){
	item.data=0;
	}
};

ToolType.sword = {
	isWeapon: true,
	damage: 3,
	baseDamage: 4,
	blockTypes: ["fibre","plant"],
	onDestroy: function(item){
	item.data=0;
	},
	onBroke: function(item){
	item.data=0;
	return true;
	},
	onAttack: function(item, mob){
	item.data=0;
	}
};

//From the library CustomChest.
var CustomChest = {};
CustomChest.setChestRender = function(id){
    for (var data = 0; data < 4; data++) {
        Block.setShape(id, 1 / 16, 0, 1 / 16, 15 / 16, 14 / 16, 15 / 16, data);
        var render = new ICRender.Model();
        var model = BlockRenderer.createModel();
        model.addBox(1 / 16, 0, 1 / 16, 15 / 16, 14 / 16, 15 / 16, id, data);
        if (data == 0)
            model.addBox(7 / 16, 7 / 16, 15 / 16, 9 / 16, 11 / 16, 1, id, data);
        if (data == 1)
            model.addBox(7 / 16, 7 / 16, 0, 9 / 16, 11 / 16, 1 / 16, id, data);
        if (data == 2)
            model.addBox(15 / 16, 7 / 16, 7 / 16, 1, 11 / 16, 9 / 16, id, data);
        if (data == 3)
            model.addBox(0, 7 / 16, 7 / 16, 1 / 16, 11 / 16, 9 / 16, id, data);
        render.addEntry(model);
        BlockRenderer.setStaticICRender(id, data, render);
    }
};


function rnd(min, max){
	 return Math.floor(Math.random() * (max - min + 1)) + min;
}

function choose(arr){
  let res = arr[rnd(0, arr.length)];
  if(res){
    return res;
  } return arr[0];
}

Armor.onHurt = function(armor, func){
  Callback.addCallback("EntityHurt", function(a, v, h){
    let slot = Entity.getArmorSlot(Player.get(), armor.slot);
    if(slot.id == armor.id){
      if(v == Player.get()) func(a, v, slot, h);
    }
  });
}

Armor.onTick = function(armor, func){
  Callback.addCallback("tick", function(){
    let slot = Entity.getArmorSlot(Player.get(), armor.slot);
    if(slot.id == armor.id){
      func(slot);
    }
  });
}

function SetDescription(id, string){
	Item.registerNameOverrideFunction(id, function(item, name){
		if(Entity.getSneaking(Player.get())) return name+"\n"+string;
		else return name+"\n"+Translation.translate("§3Sneak to read more...");
	});
}


Callback.addCallback("LevelLoaded", function (){
  if(!System.getValue(ItemID.harvestRing, 0)){
  Game.message(ChatColor.YELLOW+Translation.translate("<ProjectE> EMC calculated wrong. Type command /projecte reload."))
  }
});




// file: ic_func.js

if(Game.getEngineVersion().split(".")[0]!="2"){

Item.addCreativeGroup = function(){return null};
Item.isValid = function(){return true};
World.getGameMode = ModAPI.requireGlobal("Level.getGameMode");
Workbench_open=function(){Game.message(Translation.translate("You can't open this GUI"))};

};




// file: translation.js

//translation
//items
Translation.addTranslation("Philosopher's stone", {zh:"贤者之石"});
Translation.addTranslation("Interdiction Torch", {zh:"禁止火把"});
Translation.addTranslation("Alchemical fuel", {zh:"炼金煤炭"});
Translation.addTranslation("Mobius fuel", {zh:"莫比乌斯燃料"});
Translation.addTranslation("Astral fuel", {zh:"永恒燃料"});
Translation.addTranslation("Dark matter", {zh:"暗物质"});
Translation.addTranslation("Red matter", {zh:"红物质"});
Translation.addTranslation("Iron band", {zh:"铁指环"});
Translation.addTranslation("Covalence dust Low", {zh:"低等共价粉"});
Translation.addTranslation("Covalence dust Medium", {zh:"中等共价尘"});
Translation.addTranslation("Covalence dust High", {zh:"高等共价尘"});
Translation.addTranslation("Divining rod low", {zh:"探知之杖(初级)"});
Translation.addTranslation("Divining rod medium", {zh:"探知之杖(中级)"});
Translation.addTranslation("Divining rod high", {zh:"探知之杖(高级)"});
Translation.addTranslation("Dark matter pickaxe", {zh:"暗物质镐"});
Translation.addTranslation("Dark matter axe", {zh:"暗物质斧"});
Translation.addTranslation("Dark matter shovel", {zh:"暗物质铲"});
Translation.addTranslation("Dark matter sword", {zh:"暗物质剑"});
Translation.addTranslation("Dark matter helmet", {zh:"暗物质头盔"});
Translation.addTranslation("Dark matter chestplate", {zh:"暗物质胸甲"});
Translation.addTranslation("Dark matter leggings", {zh:"暗物质护腿"});
Translation.addTranslation("Dark matter boots", {zh:"暗物质靴子"});
Translation.addTranslation("Red matter pickaxe", {zh:"红物质镐"});
Translation.addTranslation("Red matter axe", {zh:"红物质斧"});
Translation.addTranslation("Red matter shovel", {zh:"红物质铲"});
Translation.addTranslation("Red matter sword", {zh:"红物质剑"});
Translation.addTranslation("Red matter helmet", {zh:"红物质头盔"});
Translation.addTranslation("Red matter chestplate", {zh:"红物质胸甲"});
Translation.addTranslation("Red matter leggings", {zh:"红物质护腿"});
Translation.addTranslation("Red matter boots", {zh:"红物质靴子"});
Translation.addTranslation("Red Matter Katar", {zh:"红物质拳剑"});
Translation.addTranslation("Red Matter Morning Star", {zh:"红物质钉头锤"});
Translation.addTranslation("Alchemy bag", {zh:"炼金术之袋"});
Translation.addTranslation("Klein star I", {zh:"一级卡莱恩能量之星"});
Translation.addTranslation("Klein star II", {zh:"二级卡莱恩能量之星"});
Translation.addTranslation("Klein star III", {zh:"三级卡莱恩能量之星"});
Translation.addTranslation("Klein star IV", {zh:"四级卡莱恩能量之星"});
Translation.addTranslation("Klein star V", {zh:"五级卡莱恩能量之星"});
Translation.addTranslation("Klein star VI", {zh:"六级卡莱恩能量之星"});
Translation.addTranslation("Dark matter hammer", {zh:"暗物质锤"});
Translation.addTranslation("Red matter hammer", {zh:"红物质锤"});
Translation.addTranslation("Gem of eternal destiny", {zh:"以太密度宝石"});
Translation.addTranslation("Transmute tablet", {zh:"便携式转换桌"});
Translation.addTranslation("Tome of knowledge", {zh:"炼金术秘卷"});
Translation.addTranslation("Talisman of repair", {zh:"修复护符"});
Translation.addTranslation("Watch of flowing time", {zh:"时间洪流怀表"});
Translation.addTranslation("Alchemical fuel block", {zh:"炼金煤炭块"});
Translation.addTranslation("Mobius fuel block", {zh:"莫比乌斯燃料块"});
Translation.addTranslation("Astral fuel block", {zh:"永恒燃料块"});
Translation.addTranslation("Dark matter block", {zh:"暗物质块"});
Translation.addTranslation("Red matter block", {zh:"红物质块"});
Translation.addTranslation("Transmutation Table", {zh:"转化桌"});
Translation.addTranslation("Energy Collector I", {zh:"能量收集器 Ⅰ"});
Translation.addTranslation("Energy Collector II", {zh:"能量收集器 Ⅱ"});
Translation.addTranslation("Energy Collector III", {zh:"能量收集器 Ⅲ"});
Translation.addTranslation("Anti-matter Relay I", {zh:"反物质继电器 Ⅰ"});
Translation.addTranslation("Anti-matter Relay II", {zh:"反物质继电器 Ⅱ"});
Translation.addTranslation("Anti-matter Relay III", {zh:"反物质继电器 Ⅲ"});
Translation.addTranslation("Alchemical chest", {zh:"炼金术箱子"});
Translation.addTranslation("Energy Condenser I", {zh:"能量凝聚器 Ⅰ"});
Translation.addTranslation("Energy Condenser II", {zh:"能量凝聚器 Ⅱ"});
Translation.addTranslation("Dark matter furnace", {zh:"暗物质熔炉"});
Translation.addTranslation("Red matter furnace", {zh:"红物质熔炉"});
Translation.addTranslation("Matter pedestal", {zh:"暗物质台座"});
Translation.addTranslation("Astral catalyst", {zh:"灾难新星"});
Translation.addTranslation("Nova catalyst", {zh:"爆破新星"});
Translation.addTranslation("Abyss Helmet", {zh:"深渊头盔"});
Translation.addTranslation("Grid Infernal Armor", {zh:"炼狱胸甲"});
Translation.addTranslation("Gravity Greaves", {zh:"重力护腿"});
Translation.addTranslation("Hurricane Boots", {zh:"飓风长靴"});
Translation.addTranslation("Ring of Zero", {zh: "零度戒指"});
Translation.addTranslation("Void ring", {zh: "虚空戒指"});
Translation.addTranslation("Body stone", {zh: "身之宝石"});
Translation.addTranslation("Soul stone", {zh: "灵魂宝石"});
Translation.addTranslation("Vulcanite Amulet", {zh: "熔焰护符"});
Translation.addTranslation("Evertide Amulet", {zh: "潮汐护符"});
Translation.addTranslation("Swift Wolf's Rending Gale", {zh: "疾风之戒"});
Translation.addTranslation("Ring of harvest goodness", {zh: "丰收女神戒指"});
//groups
Translation.addTranslation("Klein Stars", {zh: "卡莱恩能量之星"});
Translation.addTranslation("Anti-matter Relays", {zh: "反物质继电器"});
Translation.addTranslation("EMC Collectors", {zh: "能量收集器"});
Translation.addTranslation("Rings and Amulets", {zh: "戒指和护身符"});
//description
Translation.addTranslation(helps, {zh: helps_zh});
Translation.addTranslation("[WIP]", {zh: "[未完成]"});
Translation.addTranslation("open", {zh: "开启"});
Translation.addTranslation("close", {zh: "关闭"});
Translation.addTranslation("true", {zh: "开启"});
Translation.addTranslation("false", {zh: "关闭"});
Translation.addTranslation("<ProjectE> EMC calculated wrong. Type command /projecte reload.", {zh: "<ProjectE> EMC加载错误. 请输入/projecte reload以重新加载EMC."});
Translation.addTranslation("Please bring the red stone to transfer the mobs.", {zh: "请携带红石粉以转换生物。"});
Translation.addTranslation("Catalyst will explode! Run away!", {zh: "炸弹将在3秒后爆炸！"});
Translation.addTranslation("Total EMC in this area: ", {zh: "此区域的EMC总数："});
Translation.addTranslation("You got all transmutation knowledges", {zh: "您掌握了所有的转换知识。"});
Translation.addTranslation("You can't open this GUI", {zh: "您无法打开此GUI"});
Translation.addTranslation("Excavation Range: ", {zh: "挖掘范围："});
Translation.addTranslation("Succesfully setted value for ", {zh: "成功为该物品设置EMC："});
Translation.addTranslation("Please enter the correct number", {zh: "请输入正确的数字"});
Translation.addTranslation("Succesfully cleared all custom EMC value", {zh: "已成功清除所有自定义EMC值。"});
Translation.addTranslation("Custom values was updated", {zh: "自定义EMC值已更新。"});
Translation.addTranslation("Please make sure you opened showing EMC.", {zh: "请确认您打开了EMC显示。"});
Translation.addTranslation("Successfully changed the location of showing EMC", {zh: "成功更改显示EMC的位置。"});
Translation.addTranslation("Ring activated!", {zh: "戒指开启！"});
Translation.addTranslation("Ring disabled!", {zh: "戒指关闭！"});
Translation.addTranslation("§3Sneak to read more...", {zh: "§3潜行以查看更多......"});
Translation.addTranslation("§3Collect EMC from the brighter air.", {zh: "§3从较高亮度的空气中收集EMC。"});
Translation.addTranslation("§3Convert the items you put into it into EMC.", {zh: "§3将放入其中的物品转化为EMC。"});
Translation.addTranslation("§3Draw the EMC from the adjacent energy collector.", {zh: "§3吸取相邻的能量收集器中的EMC。"});
Translation.addTranslation("§3Convert EMC into a specific item.", {zh: "§3将EMC转化为特定物品。"});
Translation.addTranslation("§3Draw EMC from the adjacent energy collector and antimatter relay.", {zh: "§3吸收相邻的能量收集器和反物质继电器中的EMC。"});
Translation.addTranslation("§3Convert the items placed on the left side of it into EMC.", {zh: "§3将放入其中左侧的物品转化为EMC。"});
Translation.addTranslation("§3Sneak click to make the Ring work.", {zh: "§3潜行点击以使戒指工作。"});
Translation.addTranslation("§3Click to transform blocks or mobs.", {zh: "§3点击以转换方块或生物。"});
Translation.addTranslation("§3Click or use the red stone to charge the block.", {zh: "§3点击或使用红石来充能该方块。"});
Translation.addTranslation("§3Click to mine by range.", {zh: "§3单击以进行范围挖掘。"});
Translation.addTranslation("§3Attack with AoE while sneaking.", {zh: "§3潜行时使用AOE攻击。"});
Translation.addTranslation("§3Click to trim the leaves.", {zh: "§3点击以修剪树叶。"});
Translation.addTranslation("§3Dress in full suit to unlock stronger effects.", {zh: "§3穿上全套衣服以解锁更强的效果。"});
Translation.addTranslation("§3allow you to walk on water.", {zh: "§3允许你在水上行走。"});
Translation.addTranslation("§3night vision and restore health.", {zh: "§3夜视 和 恢复健康。"});
Translation.addTranslation("§3allow you to walk on lava.", {zh: "§3允许你在岩浆上行走。"});
Translation.addTranslation("§3saturation.", {zh: "§3饱和。"});
Translation.addTranslation("§3repel mobs while sneaking.", {zh: "§3在潜行时排斥怪物。"});
Translation.addTranslation("§3increase the speed of descent.", {zh: "§3提高下降速度。"});
Translation.addTranslation("§3allow you to fly.", {zh: "§3允许飞行。"});
Translation.addTranslation("§3 storing items, similar to Ender box but not Shulker box.", {zh: "§3存放物品，类似于末影箱而不是潜影箱。"});
Translation.addTranslation("§3In inventory: allow you to walk on the water.\n§3On pedestal: make the weather rainy.\n§3Be used: place a block of water.", {zh: "§3在背包中：允许您在水上行走。\n§3在台座上：使天气下雨。\n§3被使用：放置一格水。"});
Translation.addTranslation("§3In inventory: allow you to walk on the lava.\n§3On pedestal: make the weather clear.\n§3Be used: place a block of lava.", {zh: "§3在背包中：允许您在岩浆上行走。\n§3在台座上：使天气晴朗。\n§3被使用：放置一格岩浆。"});
Translation.addTranslation("§3In inventory: suck near items into your inventory.\n§4Inactive", {zh: "§3在背包中：将附近的物品吸入到您的背包中。\n§4关闭"});
Translation.addTranslation("§3In inventory: suck near items into your inventory.\n§2Active", {zh: "§3在背包中：将附近的物品吸入到您的背包中。\n§2开启"});
Translation.addTranslation("§3On pedestal/In inventory: restores hunger to player.", {zh: "§3在台座上/在背包中：恢复玩家饥饿值。"});
Translation.addTranslation("§3On pedestal/In inventory: instantly growths plants.", {zh: "§3在台座上/在背包中：加速作物生长。"});
Translation.addTranslation("§3On pedestal/In inventory: restores health to player.", {zh: "§3在台座上/在背包中：恢复玩家生命值。"});
Translation.addTranslation("§3On pedestal: shoots ligthning into nearest hostle creature.\n§3In inventory: allow players to fly.", {zh: "§3在台座上：向最近的怪物发射闪电。\n§3在物品栏中：允许玩家飞行。"});
Translation.addTranslation("§3In inventory: fix the durability of some items in the player's inventory.", {zh: "§3在背包中：修复玩家物品背包中一些物品的耐久度。"});
Translation.addTranslation("Speed of passage of time: ", {zh: "时间流逝的速度："});
Translation.addTranslation("§3Be used: Change the speed of time passage.\n§3On pedestal: speed up some machines.\n§3Acceleration range: ", {zh: "§3被使用：改变时间流逝的速度。§3在台座上：提高一些机器的速度。\n§3加速范围："});
Translation.addTranslation("§3On pedestal: harm nearest hostle creature.\n§3On pedestal/In inventory: Freezes water\n§4Inactive", {zh: "§3在台座上：攻击最近的怪物。\n§3在台座上/在背包中：冻结水。\n§4关闭"});
Translation.addTranslation("§3On pedestal: harm nearest hostle creature.\n§3On pedestal/In inventory: Freezes water\n§2Active", {zh: "§3在台座上：攻击最近的怪物。\n§3在台座上/在背包中：冻结水。\n§2开启"});
//ui
Translation.addTranslation("Energy collector", {zh: "能量收集器"});
Translation.addTranslation("Alchemical Storage", {zh: "炼金术仓库"});
Translation.addTranslation("Energy condenser", {zh: "能量凝聚器"});
Translation.addTranslation("Anti-matter relay", {zh: "反物质继电器"});
Translation.addTranslation("Transmutation tablet", {zh: "转换桌"});
Translation.addTranslation("Furnace", {zh: "熔炉"});
Translation.addTranslation("Pedestal", {zh: "暗物质台座"});
Translation.addTranslation("Page: ", {zh: "页数："});
Translation.addTranslation("Learned!", {zh: "已学习！"});
Translation.addTranslation("Text", {zh: "文本"});
Translation.addTranslation("Please enter what to search for", {zh: "请输入搜索内容"});
Translation.addTranslation("Search", {zh: "搜索"});
Translation.addTranslation("Search mode: ", {zh: "搜索模式: "});
Translation.addTranslation("cost EMC: ", {zh: "消耗 EMC: "});




// file: api.js

var EMCUIa = {
    enabled: __config__.getBool("显示EMC.是否显示"),
    size: __config__.getNumber("显示EMC.size"),
    X: __config__.getNumber("显示EMC.X"),
    Y: __config__.getNumber("显示EMC.Y")
};

const System = {
    values: {}, stars: {}, collector: {}, collector_transfer: {}, PS_recipes: {}, speed_up: {},
    setStar: function(id, storage, speed){
    	this.stars[id] = true;
    	Item.addToCreative(id, 1, 27);
    	ChargeItemRegistry.registerExtraItem(id, "EMC", storage, speed, 1, "storage", true, true);
    	Item.registerNameOverrideFunction(id, function(item, name){
    		return name+"\n§7EMC: "+ChargeItemRegistry.getEnergyStored(item, "EMC")
    		    +"/"+ChargeItemRegistry.getMaxCharge(item.id, "EMC");
    	});
    },
    getStarMaxCharge: function(id){
    	return ChargeItemRegistry.getMaxCharge(id, "EMC");
    },
    isStar: function(id){
    	return this.stars[id] || false;
    },
    chargeStar: function (cont, data){
    	var star = cont.getSlot("charge");
    	itemdata = ChargeItemRegistry.getItemData(star.id);
    	itemcharge = ChargeItemRegistry.getEnergyStored(star, "EMC");
    	maxcharge = ChargeItemRegistry.getMaxCharge(star.id, "EMC");
    	
    	if(this.isStar(star.id)){
    		if(data === true){
    			var transfer = Math.min(itemdata.transferLimit, TABLET_EMC, maxcharge - itemcharge);
    			ChargeItemRegistry.setEnergyStored(star, (itemcharge + transfer) );
    			TABLET_EMC -= transfer;
    		} else {
    			var transfer = Math.min(itemdata.transferLimit, data.emc, maxcharge - itemcharge);
    			ChargeItemRegistry.setEnergyStored(star, (itemcharge + transfer) );
    			data.emc -= transfer;
    		}
    	}
    },
    unchargeStar: function (cont, data){
    	var star = cont.getSlot("uncharge");
    	itemdata = ChargeItemRegistry.getItemData(star.id);
    	itemcharge = ChargeItemRegistry.getEnergyStored(star, "EMC");
    	maxcharge = ChargeItemRegistry.getMaxCharge(star.id, "EMC");
    	
    	if(this.isStar(star.id)){
    		if(data === true){
    			var transfer = Math.min(itemdata.transferLimit, itemcharge);
    			ChargeItemRegistry.setEnergyStored(star, (itemcharge - transfer) );
    			TABLET_EMC += transfer;
    		} else {
    			var transfer = Math.min(itemdata.transferLimit, data.max - data.emc, itemcharge);
    			ChargeItemRegistry.setEnergyStored(star, (itemcharge - transfer) );
    			data.emc += transfer;
    		}
    	}
    },
    getValue: function(id, data){
    	if(!data) data=0;
    	if(this.values[id+":"+data] != 0){
    		return this.values[id+":"+data] ? this.values[id+":"+data] : this.values[id+":"+"-1"];
    	}
    },
    setValue: function(id, data, value, isblock){
    	if(!id) return;
    	if(typeof(value) != "number") return;
    	if(isblock && id>255){
    		this.values[255-id+":"+data] = value;
    	}else{
    		this.values[id+":"+data] = value;
    	};
    },
    regRecipe: function(arg){
    	this.collector[arg.ing.id+":"+arg.ing.data] = {id: arg.out.id, emc: arg.out.emc};
    	this.collector_transfer[arg.ing.id+":"+arg.ing.data] = true;
    },
    getRecipe: function(id,data){
    	return this.collector[id+":"+data];
    },
    getCanRecipe: function(id,data){
    	return this.collector_transfer[id+":"+data];
    },
    isEnchanted: function(item){
    	if(item.extra){
    		let itemextra = item.extra.getEnchants();
    		for(i in itemextra){
    			if(itemextra[i]) return true;
    		}
    	}else return false;
    },
    PS_regRecipe: function(input, output, isSneaking){
    	this.PS_recipes[input+":"+isSneaking] = output;
    },
    PS_getRecipe: function(input, isSneaking){
    	return this.PS_recipes[input+":"+isSneaking];
    },
    addspeed_up: function(id){
    	this.speed_up[id] = true;
    },
    getspeed_up: function(id){
    	return this.speed_up[id] || false;
    },
    transfer: function(self, tile){
    	if(tile && tile.data && tile.data.emc>0 && self.data.emc<self.data.max){
    		var transfer=Math.min(self.data.max-self.data.emc, tile.data.emc,
    		    self.emc_out ? self.emc_out*(self.times2 || self.times) : Infinity,
    		    tile.emc_out ? tile.emc_out*(tile.times2 || tile.times) : Infinity);
    		self.data.emc += transfer;
    		tile.data.emc -= transfer;
    	}
    },
    getAllKnowledge: function(){
    	for(i in System.values){
    		var itm = i.split(":");
    		if(Item.isValid(itm[0], itm[1]) && !TABLET_LIST[itm[0]+":"+itm[1]]){
    			TABLET_LIST[itm[0]+":"+itm[1]] = true;
    			TABLET_ITEMS.push({id: itm[0], data: itm[1]});
    		}
    	}
    	Game.message(Translation.translate("You got all transmutation knowledges"));
    }
};


//物品UI
setUI_ = {};
var setUI = function(item, x, y, texture, func){
	this.ui = {
	    window: new UI.Window({
	        location: {x: x, y: y, width: 50, height: 50},
	        drawing: [{type: "bitmap", bitmap: "button0", x: 0, y: 0, width: 1000, height: 1000}],
	        elements: {
	            "main": {type: "slot", x: 0, y: 0, isTransparentBackground: true, visual: true, size: 1000, bitmap: texture,
	                source: {id: item.id, count: 1, data: item.data || 0}, clicker: {onClick: function(){func()} }},
	        },
	    }),
	    open: function(){
	        this.window.setAsGameOverlay(true);
	        this.window.open();
	    },
	    close: function(){this.window.close();}
	};
};


//EMC显示
if(EMCUIa.enabled){
	var EMCUI = {
	    window: new UI.Window({
	        location: {x: EMCUIa.X, y: EMCUIa.Y, width: EMCUIa.size, height: EMCUIa.size*2/3},
	        drawing: [{type: "background", color: android.graphics.Color.TRANSPARENT}],
	        elements: {
	            "close": {type: "button", x: 0, y: 0, bitmap: "clear", scale: 64, clicker: {onLongClick: function(){Game.message(Translation.translate(helps))}}},
	            "id": {type: "text", x: 0, y: 0, width: 200, height: 300, text: "ID:", font: {color: android.graphics.Color.WHITE, size: 120}},
	            "data": {type: "text", x: 0, y: 125, width: 200, height: 300, text: "data:", font: {color: android.graphics.Color.WHITE, size: 120}},
	            "emc": {type: "text", x: 0, y: 250, width: 200, height: 300, text: "emc:", font: {color: android.graphics.Color.WHITE, size: 120}},
	            "stackemc": {type: "text", x: 0, y: 375, width: 200, height: 300, text: "stack emc:", font: {color: android.graphics.Color.WHITE, size: 120}},
	            "stackemc2" :{type: "text", x: 0, y: 500, width: 200, height: 300, text: " ", font: {color: android.graphics.Color.WHITE, size: 120}},
	        },
	    }),
	    open: function(){
	    	this.window.setAsGameOverlay(true);
	    	this.window.open();
	    },
	    close: function(){this.window.close()},
	};
	
	Callback.addCallback("NativeGuiChanged", function(screenName){
		if(screenName=="in_game_play_screen" || screenName=="hud_screen"){
			EMCUI.open();
		}else{
			EMCUI.close();
		};
	});
	
	Callback.addCallback("tick", function(){
		carried = Player.getCarriedItem();
		carriedemc = System.getValue(carried.id , carried.data)||0;
		EMCUI.window.elements.get("id").onBindingUpdated("text", "ID:" + carried.id);
		EMCUI.window.elements.get("data").onBindingUpdated("text", "data:" + carried.data);
		EMCUI.window.elements.get("emc").onBindingUpdated("text", "emc:" + carriedemc);
		EMCUI.window.elements.get("stackemc2").onBindingUpdated("text", "" + carriedemc * carried.count);
	});
	
};

//能量收集器配方
Callback.addCallback("PostLoaded", function(){
	System.regRecipe({ing: {id:263,data:1}, out: {id:331,emc:32}});//木炭/红石粉
	if(VanillaItemID) System.regRecipe({ing: {id:VanillaItemID.charcoal,data:0}, out: {id:331,emc:32}});//木炭/红石粉
	if(VanillaItemID) System.regRecipe({ing: {id:VanillaItemID.charcoal,data:1}, out: {id:331,emc:32}});//木炭/红石粉
	System.regRecipe({ing: {id:331,data:0}, out: {id:263,emc:64}});//红石粉/煤炭
	System.regRecipe({ing: {id:263,data:0}, out: {id:289,emc:64}});//煤炭/火药
	System.regRecipe({ing: {id:289,data:0}, out: {id:348,emc:192}});//火药/萤石粉
	System.regRecipe({ing: {id:348,data:0}, out: {id:ItemID.fuelAlchemical,emc:128}});//萤石粉/炼金煤炭
	System.regRecipe({ing: {id:ItemID.fuelAlchemical,data:0}, out: {id:152,emc:64}});//炼金煤炭/红石块
	System.regRecipe({ing: {id:152,data:0}, out: {id:377,emc:192}});//红石块/烈焰粉
	System.regRecipe({ing: {id:377,data:0}, out: {id:173,emc:384}});//烈焰粉/煤炭块
	System.regRecipe({ing: {id:173,data:0}, out: {id:89,emc:384}});//煤炭块/萤石
	System.regRecipe({ing: {id:89,data:0}, out: {id:ItemID.fuelMobius,emc:512}});//萤石/莫比乌斯燃料
	System.regRecipe({ing: {id:ItemID.fuelMobius,data:0}, out: {id:BlockID.blockAlchemicalFuel,emc:2560}});//莫比乌斯燃料/炼金煤炭块
	System.regRecipe({ing: {id:BlockID.blockAlchemicalFuel,data:0}, out: {id:ItemID.fuelAstral,emc:3584}});//炼金煤炭块/永恒燃料
	System.regRecipe({ing: {id:ItemID.fuelAstral,data:0}, out: {id:BlockID.blockMobiusFuel,emc:10240}});//永恒燃料/莫比乌斯燃料块
	System.regRecipe({ing: {id:BlockID.blockMobiusFuel,data:0}, out: {id:BlockID.blockAstralFuel,emc:55296}});//莫比乌斯燃料块/永恒燃料块
});

//EMC计算
var THINGS_FROM_MODS = [];
for(let i in ItemID) THINGS_FROM_MODS.push(ItemID[i]);
for(let i in BlockID) THINGS_FROM_MODS.push(BlockID[i]);

var DefineEmcFromRecipe = function(){
	if(__config__.getBool("自动计算EMC")){
		for(t in THINGS_FROM_MODS){
			for(tt=0; tt<=Math.min(Item.getMaxDamage(THINGS_FROM_MODS[t]), 30); tt++){
				if(!System.getValue(THINGS_FROM_MODS[t], tt)){
					var array = Recipes.getWorkbenchRecipesByResult(THINGS_FROM_MODS[t], -1, tt);
					if(array) for(i = 0; i < array.size(); i ++){
						var arr = array.toArray()[i];
						if(arr){
							let ing = arr.getSortedEntries();
							let res = arr.result;
							var value = 0;
							if(!System.getValue(res.id, res.data) && !arr.getCallback()){
								for(s=0; s<9; s++) try{
									if(ing[s].id) value += System.getValue(ing[s].id, ing[s].data);
								}catch(e){};
								if(value) System.setValue(res.id, res.data, Math.round(value/res.count));
							}
						}
					}
				}
			}
		}
	}
};


Callback.addCallback("LevelLoaded", function (){
	DefineEmcFromRecipe();
});

Callback.addCallback("LevelSelected", function (){
	DefineEmcFromRecipe();
});

ModAPI.registerAPI("EquivalentAPI", {
	System: System,
	Rings: Rings,
	execute: function(c){return eval(c)}
});




// file: emc.js

(function LoadEMC(){
	var vanilla_item = FileTools.ReadKeyValueFile(__dir__ + "/emc/vanilla_item.js", "===");
	var vanilla_block = FileTools.ReadKeyValueFile(__dir__ + "/emc/vanilla_block.js", "===");
	for(i in vanilla_item){
		let item = i.split(":");
		if(item[0] && item[1] && vanilla_item[i]){
			if(isNaN(Number(item[0]))){
				System.setValue(VanillaItemID[item[0]], item[1]-0, eval(vanilla_item[i]));
			}else{
				System.setValue(Number(item[0]), item[1]-0, eval(vanilla_item[i]));
			}
		}
	};
	for(i in vanilla_block){
		let item = i.split(":");
		if(item[0] && item[1] && vanilla_block[i]){
			if(isNaN(Number(item[0]))){
				System.setValue(VanillaBlockID[item[0]], item[1]-0, eval(vanilla_block[i]), true);
			}else{
				System.setValue(Number(item[0]), item[1]-0, eval(vanilla_block[i]), true);
			}
		}
	};
})();

Callback.addCallback("PostLoaded", function(){
	var innercore_item = FileTools.ReadKeyValueFile(__dir__ + "/emc/innercore_item.js", "===");
	var innercore_block = FileTools.ReadKeyValueFile(__dir__ + "/emc/innercore_block.js", "===");
	for(i in innercore_item){
		let item = i.split(":");
		if(item[0] && item[1] && innercore_item[i]){
			System.setValue(ItemID[item[0]], item[1]-0, eval(innercore_item[i]));
		}
	};
	for(i in innercore_block){
		let item = i.split(":");
		if(item[0] && item[1] && innercore_block[i]){
			System.setValue(BlockID[item[0]], item[1]-0, eval(innercore_block[i]));
		}
	};
});




// file: integration/RecipeViewer.js

ModAPI.addAPICallback("RecipeViewer", function(api){
var RecipeViewer=api.Core;
RecipeViewer.registerRecipeType("Energy collector", {
    title: Translation.translate("Energy collector"),
    contents: {
        icon: BlockID.energyCollector1,
        drawing: [
        {type: "bitmap", x: 485, y: 100, bitmap: "emcBarShort_0", scale: 5},
        {type: "bitmap", x: 600, y: 200, bitmap: "collectorProgress_01", scale: 3.5},
        {type: "bitmap", x: 800, y: 200, bitmap: "collectSun_1", scale: 4},
        ],
        elements: {
        "output0": {type: "slot", x: 350, y: 240},
        "output1": {type: "slot", x: 410, y: 240},
        "output2": {type: "slot", x: 470, y: 240},
        "output3": {type: "slot", x: 530, y: 240},
        "output4": {type: "slot", x: 350, y: 300},
        "output5": {type: "slot", x: 410, y: 300},
        "output6": {type: "slot", x: 470, y: 300},
        "output7": {type: "slot", x: 530, y: 300},
        "input0": {type: "slot", x: 700, y: 300},
        "progScale": {type: "scale", x: 600, y: 200, bitmap: "collectorProgress_11", scale: 3.5, direction: 2},
        "charge": {type: "slot", x: 350, y: 100, bitmap: "starCharge"},
        "uncharge": {type: "slot", x: 410, y: 100, bitmap: "unstarCharge" },
        "emcScale": {type: "scale", x: 485, y: 100, bitmap: "emcBarShort_1", scale: 5},
        "txt": {type: "text", x: 352, y: 35, multiline: true, width: 100, height: 30, text: Translation.translate("cost EMC: ")}
        }
    },
    getList: function(id, data, isUsage){
        if(isUsage){
          return System.getCanRecipe(id, data) ? [{
            input: [{id: id, count: 1, data: data}],
            output: [{id: System.getRecipe(id, data).id, count: 1, data: 0}],
          }] : [];
        }else if(data==0){
          try{
            for(ii in System.collector){
              if(System.collector[ii].id==id){
                let item=ii.split(":");
                return [{
                  input: [{id: Number(item[0]), count: 1, data: Number(item[1])}],
                  output: [{id: id, count: 1, data: 0}],
                }];
              };
            };
          }catch(e){};
          return [];
        }else{return []};
    },/*
    onOpen: function(elements, recipe){
        this.emc=System.getRecipe(recipe.input.id, recipe.input.data).emc;
        elements.get("txt").onBindingUpdated("text", Translation.translate("cost EMC: ")+emc);
    }*/
});

RecipeViewer.registerRecipeType("emc", {
    title: "EMC",
    contents: {
        icon: ItemID.transmute_tablet,
        description: "emc",
        drawing: [],
        elements: {
            input0: {x: 280, y: 260, size: 120},
            text: {type: "text", x: 250, y: 200, multiline: true, font: {size: 40, color: android.graphics.Color.WHITE}}
        }
    },
    getList: function(id, data, isUsage){
        return System.getValue(id, data) ? [{input: [{id: id, count: 1, data: data}]}] : [];
    },
    onOpen: function(elements, recipe){
        const item = recipe.input[0];
        const emc = System.getValue(item.id, item.data);
        elements.get("text").onBindingUpdated("text", "EMC: "+emc);
    }
});

});




// file: rings/helper.js

var Rings = {
  pedestal: {},
  inventory: {},
  activateadble: {},
  addRingFunction: function(ring, func){
    this.inventory[ring] = func;
  },
  addPedestalFunction: function(ring, func){
    this.pedestal[ring] = func;
  },
  getPedestalFunction: function(ring){
    return this.pedestal[ring]
  },
  getRingFunction: function(ring){
    return {
      inv: this.inventory[ring]
    };
  },
  get: function(id){
    for(i = 0; i <= 36; i ++){
      if(Player.getInventorySlot(i).id == id){
        obj = Player.getInventorySlot(i);
        return obj;
      }
    }
  },
  getHotbar: function(id){
    for(i = 0; i <= 9; i ++){
      if(Player.getInventorySlot(i).id == id){
        obj = Player.getInventorySlot(i);
        return obj;
      }
    }
  },
  float: function(id, func){
    var float_fly=false;
    Callback.addCallback("tick", function(){
      this.p = Player.getPosition();
      if(func() && !Entity.getSneaking(Player.get()) &&
        World.getBlockID(this.p.x, this.p.y-0.8, this.p.z) == 0 &&
        World.getBlockID(this.p.x, this.p.y-1.8, this.p.z) == id
      ){
        if(!float_fly){float_fly=true};
        Player.setFlying(true);
        Player.setVelocity(Player.getVelocity().x, 0, Player.getVelocity().z);
      }else if(float_fly){
        float_fly=false;
        if(!Player.getFlyingEnabled() && Game.getGameMode()!==1){
          Player.setFlying(false);
        };
      };
    });
  },
};

Rings.activateRing = function(a,b,sound){
  Rings.activateable = {a: b};
  Callback.addCallback("ItemUse",function(){
  item = Player.getCarriedItem();
    if(item.id==a){
      Player.setCarriedItem(b,1,0);
      if(sound) PlaySoundFile("pecharge.ogg");
    }
    if(item.id==b){
      Player.setCarriedItem(a,1,0);
      if(sound) PlaySoundFile("peuncharge.ogg");
    }
  });
};




// file: custom.js

var CUSTOM_DIR = __dir__+"/emc/custom.json";

Callback.addCallback("PostLoaded", function(){
	if(FileTools.isExists(__dir__+"/custom.json") && !FileTools.isExists(CUSTOM_DIR)){
		var temp = FileTools.ReadJSON(__dir__+"/custom.json");
		FileTools.WriteJSON(CUSTOM_DIR, temp, true);
	};
	if(FileTools.isExists(CUSTOM_DIR)){
		var arr = FileTools.ReadJSON(CUSTOM_DIR);
		arr.map(function(i){
			System.setValue(eval(i.id), i.data, i.emc);
		});
	}else{
		FileTools.WriteJSON(CUSTOM_DIR, [], true);
	};
});

Callback.addCallback("LevelLoaded", function(){
	if(FileTools.isExists(CUSTOM_DIR)){
		var arr = FileTools.ReadJSON(CUSTOM_DIR);
		arr.map(function(i){
			System.setValue(eval(i.id), i.data, i.emc);
		});
	}else{
		FileTools.WriteJSON(CUSTOM_DIR, [], true);
	};
});


var command={
  set: function(id, data, emc){
      var arr = FileTools.ReadJSON(CUSTOM_DIR);
      var success = false;
      if(isNaN(Number(id))==isNaN(Number(data))==isNaN(Number(emc))==false){
        System.setValue(id, data, Number(emc));
        if(2048 <= id < 8192){
          for(i in ItemID){
            if(ItemID[i] == id){
              id = "ItemID."+i;
              break;
            }
          }
        };
        if(id >= 8192){
          for(i in BlockID){
            if(BlockID[i] == id){
              id = "BlockID."+i;
              break;
            }
          }
        };
        arr.map(function(i1, i2){
          if(success == false && i1.id == id && i1.data == data){
            arr[i2].emc = Number(emc);
            success = true;
          };
        });
        if(success == false){
          arr.push({id: id, data: Number(data), emc: Number(emc)});
        };
        FileTools.WriteJSON(CUSTOM_DIR, arr, true);
        Game.message(Translation.translate("Succesfully setted value for ")+Item.getName(Number(id), Number(data)));
      } else Game.message(Translation.translate("Please enter the correct number"));
  },
};

Callback.addCallback("NativeCommand", function(str){
  var arr = FileTools.ReadJSON(CUSTOM_DIR);
  var need_help = true;
  cmd = str.split(" ");
  
  if(cmd[0] == "/projecte"){
    if(cmd[1] == "set"){
      need_help = false;
      command.set(cmd[2], cmd[3], cmd[4]);
    };
    
    if(cmd[1] == "sethand"){
      need_help = false;
      let item = Player.getCarriedItem();
      command.set(item.id, item.data, cmd[2]);
    };
    
    if(cmd[1] == "reload"){
      need_help = false;
      var arr = FileTools.ReadJSON(CUSTOM_DIR);
      arr.map(function(i){System.setValue(eval(i.id), i.data, i.emc)});
      DefineEmcFromRecipe();
      Game.message(Translation.translate("Custom values was updated"));
    };
    
    if(cmd[1] == "clear"){
      need_help = false;
      FileTools.WriteJSON(CUSTOM_DIR, [], true);
      Game.message(Translation.translate("Succesfully cleared all custom EMC value"));
    };
    
    if(cmd[1] == "getui"){
      need_help = false;
      if(EMCUIa.enabled){
        Game.message("x: §3"+EMCUIa.X+"\n§ry: §3"+EMCUIa.Y+"\n§rsize: §3"+EMCUIa.size);
      } else Game.message(Translation.translate("Please make sure you opened showing EMC."));
    };
    
    if(cmd[1] == "setui"){
      need_help = false;
      if(EMCUIa.enabled){
        if(isNaN(Number(cmd[2]))==isNaN(Number(cmd[3]))==isNaN(Number(cmd[4]))==false){
          if(0 <= Number(cmd[2]) <= 1000 && 0 <= Number(cmd[3]) <= 1000 && 0 < Number(cmd[4]) <=300){
            EMCUIa.X = Number(cmd[2]);    __config__.set("显示EMC.X", Number(cmd[2]));
            EMCUIa.Y = Number(cmd[3]);    __config__.set("显示EMC.Y", Number(cmd[3]));
            EMCUIa.size = Number(cmd[4]);    __config__.set("显示EMC.size", Number(cmd[4]));
            __config__.save();
            EMCUI.window.getLocation().set(Number(cmd[2]), Number(cmd[3]), Number(cmd[4]), Number(cmd[4])*2/3);
            Game.message(Translation.translate("Successfully changed the location of showing EMC"));
          } else Game.message(Translation.translate("Please enter the correct number")+"x: 0~1000, y: 0~1000, size: 0~1000");
        } else Game.message(Translation.translate("Please enter the correct number")+"x: 0~1000, y: 0~1000, size: 0~1000");
      } else Game.message(Translation.translate("Please make sure you opened showing EMC."));
    };
    
    if(need_help){Game.message(Translation.translate(helps))};
    Game.prevent();
  }
});




// file: philosophers stone.js

IDRegistry.genItemID("philosophersStone");
Item.createItem("philosophersStone", "Philosopher's stone", {name: "philosophers_stone"}, {stack: 1});
SetDescription(ItemID.philosophersStone, Translation.translate("§3Click to transform blocks or mobs."))


Callback.addCallback("PostLoaded", function(){
Recipes.addShaped({id: ItemID.philosophersStone, count: 1, data: 0}, 
["rgr", 
"gdg",
"rgr"],
["r", 331, 0, "g", 348, 0, "d", 264, 0]);
});

function addPhilosophersStoneRecipe(item, input){
  let ingridients = [];
  for(i = 0; i < input.count; i++){
    ingridients.push({id: input.id, data: input.data});
  }
  
  Recipes.addCraftToolRecipeItem(
    {id: item.id, count: item.count, data: item.data}, ingridients, ItemID.philosophersStone
  );
}

Callback.addCallback("PostLoaded", function(){
Recipes.addCraftToolRecipeItem(
  {id: ItemID.fuelAlchemical, count: 1, data: 0}, [
    {id: 263, data: 0},
    {id: 263, data: 0},
    {id: 263, data: 0},
    {id: 263, data: 0},
  ], ItemID.philosophersStone
);

Recipes.addCraftToolRecipeItem(
  {id: ItemID.fuelMobius, count: 1, data: 0}, [
    {id: ItemID.fuelAlchemical, data: 0},
    {id: ItemID.fuelAlchemical, data: 0},
    {id: ItemID.fuelAlchemical, data: 0},
    {id: ItemID.fuelAlchemical, data: 0},
  ], ItemID.philosophersStone
);

Recipes.addCraftToolRecipeItem(
  {id: ItemID.fuelAstral, count: 1, data: 0}, [
    {id: ItemID.fuelMobius, data: 0},
    {id: ItemID.fuelMobius, data: 0},
    {id: ItemID.fuelMobius, data: 0},
    {id: ItemID.fuelMobius, data: 0},
  ], ItemID.philosophersStone
);

addPhilosophersStoneRecipe({id: 263, data: 0, count: 4}, {id: ItemID.fuelAlchemical, count: 1, data: 0});
addPhilosophersStoneRecipe({id: ItemID.fuelAlchemical, data: 0, count: 4}, {id: ItemID.fuelMobius, count: 1, data: 0});
addPhilosophersStoneRecipe({id: ItemID.fuelMobius, data: 0, count: 4}, {id: ItemID.fuelAstral, count: 1, data: 0});

addPhilosophersStoneRecipe({id: 368, data: 0, count: 1}, {id: 265, count: 4, data: 0});
addPhilosophersStoneRecipe({id: 263, data: 1, count: 4}, {id: 263, count: 1, data: 0});
if(VanillaItemID) addPhilosophersStoneRecipe({id: VanillaItemID.charcoal, data: 0, count: 4}, {id: 263, count: 1, data: 0});
addPhilosophersStoneRecipe({id: 263, data: 0, count: 1}, {id: 263, count: 4, data: 1});
if(VanillaItemID) addPhilosophersStoneRecipe({id: 263, data: 0, count: 1}, {id: VanillaItemID.charcoal, count: 4, data: -1});
addPhilosophersStoneRecipe({id: 266, data: 0, count: 1}, {id: 265, count: 8, data: 0});
addPhilosophersStoneRecipe({id: 265, data: 0, count: 8}, {id: 266, count: 1, data: 0});
addPhilosophersStoneRecipe({id: 264, data: 0, count: 1}, {id: 266, count: 4, data: 0});
addPhilosophersStoneRecipe({id: 266, data: 0, count: 4}, {id: 264, count: 1, data: 0});
addPhilosophersStoneRecipe({id: 388, data: 0, count: 1}, {id: 264, count: 2, data: 0});
addPhilosophersStoneRecipe({id: 264, data: 0, count: 2}, {id: 388, count: 1, data: 0});
});

//workbench
setUI_.philosophersStone = new setUI({id: ItemID.philosophersStone}, 700, 250, "crafting", function(){
Workbench_open();
});

Callback.addCallback("tick", function(){
try{
	if(Player.getCarriedItem().id==ItemID.philosophersStone && (GuiName=="in_game_play_screen"||GuiName=="hud_screen") )
		setUI_.philosophersStone.ui.open();
	else setUI_.philosophersStone.ui.close();
}catch(e){};
});
Callback.addCallback("LevelLeft", function(){try{setUI_.philosophersStone.ui.close()}catch(e){}});

//blocks
System.PS_regRecipe(1, 4, false);
System.PS_regRecipe(4, 1, false);
System.PS_regRecipe(2, 12, false);
System.PS_regRecipe(3, 12, false);
System.PS_regRecipe(12, 2, false);
System.PS_regRecipe(49, 10, false);
System.PS_regRecipe(79, 8, false);
System.PS_regRecipe(13, 24, false);
System.PS_regRecipe(24, 13, false);
System.PS_regRecipe(1, 2, true);
System.PS_regRecipe(4, 2, true);
System.PS_regRecipe(2, 4, true);
System.PS_regRecipe(12, 4, true);

Item.registerUseFunction("philosophersStone", function(crd, i, b){
var block = System.PS_getRecipe(b.id, Entity.getSneaking(Player.get()));
if(block){
World.setBlock(crd.x, crd.y, crd.z, block);
PlaySoundFile("petransmute.ogg");
}else{
if(Entity.getSneaking(Player.get())){
if(b.id==35&&b.data!==0){World.setBlock(crd.x, crd.y, crd.z, b.id, b.data-1);PlaySoundFile("petransmute.ogg");}else
if(b.id==35&&b.data==0){World.setBlock(crd.x, crd.y, crd.z, b.id, 15);PlaySoundFile("petransmute.ogg");}else
if(b.id==6&&b.data!==0){World.setBlock(crd.x, crd.y, crd.z, b.id, b.data-1);PlaySoundFile("petransmute.ogg");}else
if(b.id==6&&b.data==0){World.setBlock(crd.x, crd.y, crd.z, b.id, 5);PlaySoundFile("petransmute.ogg");}else
if(b.id==17&&b.data!==0){World.setBlock(crd.x, crd.y, crd.z, b.id, b.data-1);PlaySoundFile("petransmute.ogg");}else
if(b.id==17&&b.data==0){World.setBlock(crd.x, crd.y, crd.z, 162, 1);PlaySoundFile("petransmute.ogg");}else
if(b.id==162&&b.data!==0){World.setBlock(crd.x, crd.y, crd.z, b.id, b.data-1);PlaySoundFile("petransmute.ogg");}else
if(b.id==162&&b.data==0){World.setBlock(crd.x, crd.y, crd.z, 17, 3);PlaySoundFile("petransmute.ogg");}else
if(b.id==18&&b.data!==0){World.setBlock(crd.x, crd.y, crd.z, b.id, b.data-1);PlaySoundFile("petransmute.ogg");}else
if(b.id==18&&b.data==0){World.setBlock(crd.x, crd.y, crd.z, 161, 1);PlaySoundFile("petransmute.ogg");}else
if(b.id==161&&b.data!==0){World.setBlock(crd.x, crd.y, crd.z, b.id, b.data-1);PlaySoundFile("petransmute.ogg");}else
if(b.id==161&&b.data==0){World.setBlock(crd.x, crd.y, crd.z, 18, 3);PlaySoundFile("petransmute.ogg");}
}else{
if(b.id==35&&b.data!==15){World.setBlock(crd.x, crd.y, crd.z, b.id, b.data+1);PlaySoundFile("petransmute.ogg");}else
if(b.id==35&&b.data==15){World.setBlock(crd.x, crd.y, crd.z, b.id, 0);PlaySoundFile("petransmute.ogg");}else
if(b.id==6&&b.data!==5){World.setBlock(crd.x, crd.y, crd.z, b.id, b.data+1);PlaySoundFile("petransmute.ogg");}else
if(b.id==6&&b.data==5){World.setBlock(crd.x, crd.y, crd.z, b.id, 0);PlaySoundFile("petransmute.ogg");}else
if(b.id==17&&b.data!==3){World.setBlock(crd.x, crd.y, crd.z, b.id, b.data+1);PlaySoundFile("petransmute.ogg");}else
if(b.id==17&&b.data==3){World.setBlock(crd.x, crd.y, crd.z, 162, 0);PlaySoundFile("petransmute.ogg");}else
if(b.id==162&&b.data!==1){World.setBlock(crd.x, crd.y, crd.z, b.id, b.data+1);PlaySoundFile("petransmute.ogg");}else
if(b.id==162&&b.data==1){World.setBlock(crd.x, crd.y, crd.z, 17, 0);PlaySoundFile("petransmute.ogg");}else
if(b.id==18&&b.data!==3){World.setBlock(crd.x, crd.y, crd.z, b.id, b.data+1);PlaySoundFile("petransmute.ogg");}else
if(b.id==18&&b.data==3){World.setBlock(crd.x, crd.y, crd.z, 161, 0);PlaySoundFile("petransmute.ogg");}else
if(b.id==161&&b.data!==1){World.setBlock(crd.x, crd.y, crd.z, b.id, b.data+1);PlaySoundFile("petransmute.ogg");}else
if(b.id==161&&b.data==1){World.setBlock(crd.x, crd.y, crd.z, 18, 0);PlaySoundFile("petransmute.ogg");}
}}
});

//mobs
var transfer_mob=function(victim){
  for(h in evilList){
    if(Entity.getType(victim)==evilList[h]){
      Entity.spawn(Entity.getPosition(victim).x, Entity.getPosition(victim).y, Entity.getPosition(victim).z, choose(evilList));
      Entity.remove(victim);
      PlaySoundFile("phiball.ogg");
      return true;
    }
  }
  for(a in friendlyList){
     if(Entity.getType(victim)==friendlyList[a]){
     Entity.spawn(Entity.getPosition(victim).x, Entity.getPosition(victim).y, Entity.getPosition(victim).z, choose(friendlyList));
     Entity.remove(victim);
     PlaySoundFile("phiball.ogg");
     return true;
    }
  }
};

var dec_item=function(id){
  for(i = 0; i <= 36; i ++){
    let item=Player.getInventorySlot(i);
    if(item.id == id){
      Player.setInventorySlot(i, item.id, item.count-1, item.data, item.extra);
      return;
    }
  }
};

Callback.addCallback("PlayerAttack", function(player,victim){
  let item = Player.getCarriedItem();
  if(item.id==ItemID.philosophersStone){
    let redstone=Rings.get(331);
    if(redstone){
      if(transfer_mob(victim)){
      dec_item(331);
      }
    }else{
      Game.message(Translation.translate("Please bring the red stone to transfer the mobs."));
    }
  }
});




// file: interdiction_torch.js

var Torch = Block.createSpecialType({
	opaque: false,
	lightlevel: 13,
	lightopacity: 0,
	destroytime: 0.05,
	renderlayer: 3,
	rendertype: 2
});

IDRegistry.genBlockID("interdiction_torch");
Block.createBlock("interdiction_torch", [
    {name: "Interdiction Torch", texture: [["interdiction_torch", 0]], inCreative: true},
    {name: "Interdiction Torch", texture: [["interdiction_torch", 1]], inCreative: false}
], Torch);
SetDescription(BlockID.interdiction_torch, Translation.translate("§3Click or use the red stone to charge the block."));
Block.setBlockShape(BlockID.interdiction_torch, {x: 7/16, y: 0, z: 7/16}, {x: 9/16, y: 9/16, z: 9/16});


Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.interdiction_torch, count: 2, data: 0}, 
	["ada", 
	 "dcd",
	 "bbb"],
	["a", 76, 0, "b", 348, 0, "c", ItemID.philosophersStone, 0, "d", 264, 0],
	function(api, field, result){
		for (var i in field) if(field[i].id != ItemID.philosophersStone) api.decreaseFieldSlot(i);
	});
});

TileEntity.registerPrototype(BlockID.interdiction_torch, {
    defaultValues: {work: false, redstone: false},
    init: function(){
    	if(this.data.work || this.data.redstone){
    		World.setBlock(this.x, this.y, this.z, BlockID.interdiction_torch, 0);
    	}else{
    		World.setBlock(this.x, this.y, this.z, BlockID.interdiction_torch, 1);
    	};
    },
    click: function(){
    	if(Entity.getSneaking(Player.get()) && Player.getCarriedItem().id != 0) return false;
    	if(this.data.work){
    		this.data.work = false;
    		World.setBlock(this.x, this.y, this.z, BlockID.interdiction_torch, 1);
    		Game.message("§c"+Translation.translate("Interdiction Torch")+": "+Translation.translate("false"));
    	}else{
    		this.data.work = true;
    		World.setBlock(this.x, this.y, this.z, BlockID.interdiction_torch, 0);
    		Game.message("§9"+Translation.translate("Interdiction Torch")+": "+Translation.translate("true"));
    	}
    	return true;
    },
    tick: function(){
    	if(this.data.work || this.data.redstone){
    		for(j in evilList) this.work(evilList[j], true);
    		this.work(102);
    		this.work(94);
    		this.work(91);
    		this.work(89);
    		this.work(87);
    		this.work(86);
    		this.work(85);
    		this.work(82);
    		this.work(81);
    		this.work(80);
    		this.work(79);
    		this.work(76);
    		this.work(73);
    	};
    },
    redstone: function(params){
    	if(this.data.redstone == params.power>0) return;
    	else if(params.power<=0){
    		this.data.redstone = false;
    		World.setBlock(this.x, this.y, this.z, BlockID.interdiction_torch, 1);
    	}else{
    		this.data.redstone = true;
    		World.setBlock(this.x, this.y, this.z, BlockID.interdiction_torch, 0);
    	}
    },
    work: function(id, speed_down){
    	let ent = Entity.getAllInRange(this, 6, id);
    	for(i in ent){
    		let X=this.x, Y=this.y, Z=this.z;
    		let x=Entity.getPosition(ent[i]).x-X;
    		let y=Entity.getPosition(ent[i]).y-Y;
    		let z=Entity.getPosition(ent[i]).z-Z;
    		let dis=Math.sqrt(x*x+y*y+z*z);
    		let vel=(6-dis) / (speed_down ? 3 : 1);
    		if(vel>0) Entity.addVelocity(ent[i], vel*x/dis, vel*y/dis, vel*z/dis);
    	}
    }
});




// file: items/alchemical.js

IDRegistry.genItemID("fuelAlchemical");
IDRegistry.genItemID("fuelMobius");
IDRegistry.genItemID("fuelAstral");
IDRegistry.genItemID("darkMatter");
IDRegistry.genItemID("redMatter");

Item.createItem("fuelAlchemical", "Alchemical fuel", {name: "fuelAlchemical"}, {stack: 64});
Item.createItem("fuelMobius", "Mobius fuel", {name: "fuelMobius"}, {stack: 64});
Item.createItem("fuelAstral", "Astral fuel", {name: "fuelAstral"}, {stack: 64});
Item.createItem("darkMatter", "Dark matter", {name: "darkMatter", meta: 0}, {stack: 64});
Item.createItem("redMatter", "Red matter", {name: "redMatter", meta: 0}, {stack: 64});

Recipes.addFurnaceFuel(ItemID.fuelAlchemical,0,6400);
Recipes.addFurnaceFuel(ItemID.fuelMobius,0,25600);
Recipes.addFurnaceFuel(ItemID.fuelAstral,0,102400);

IDRegistry.genBlockID("blockAlchemicalFuel");
IDRegistry.genBlockID("blockMobiusFuel");
IDRegistry.genBlockID("blockAstralFuel");
IDRegistry.genBlockID("dmBlock");
IDRegistry.genBlockID("rmBlock");

Block.createBlock("blockAlchemicalFuel", [{name: "Alchemical fuel block", texture: [["fuelAlchemical",0]], inCreative: true}],"opaque");
Block.createBlock("blockMobiusFuel", [{name: "Mobius fuel block", texture: [["fuelMobius",0]], inCreative: true}],"opaque");
Block.createBlock("blockAstralFuel", [{name: "Astral fuel block", texture: [["fuelAstral",0]], inCreative: true}],"opaque");
Block.createBlock("dmBlock", [{name: "Dark matter block", texture: [["dmBlock",0]], inCreative: true}],"opaque");
Block.createBlock("rmBlock", [{name: "Red matter block", texture: [["rmBlock",0]], inCreative: true}],"opaque");

Recipes.addFurnaceFuel(BlockID.blockAlchemicalFuel, 0, 6400*9);
Recipes.addFurnaceFuel(BlockID.blockMobiusFuel, 0, 518400);
Recipes.addFurnaceFuel(BlockID.blockAstralFuel, 0, 518400*9);


Callback.addCallback("PostLoaded", function(){
Recipes.addShaped({id: ItemID.darkMatter, count: 1, data: 0}, ["aaa", "aba", "aaa"],["a", ItemID.fuelAstral, 0, "b", 57, 0]);
Recipes.addShaped({id: ItemID.redMatter, count: 1, data: 0}, ["aaa", "bbb", "aaa"],["a", ItemID.fuelAstral, 0, "b", ItemID.darkMatter, 0]);
});


IDRegistry.genItemID("covDust1");
IDRegistry.genItemID("covDust2");
IDRegistry.genItemID("covDust3");
IDRegistry.genItemID("rodDivining1");
IDRegistry.genItemID("rodDivining2");
IDRegistry.genItemID("rodDivining3");

Item.createItem("covDust1", "Covalence dust Low", {name: "dustCovalenceLow", meta: 0}, {stack: 64});
Item.createItem("covDust2", "Covalence dust Medium", {name: "dustCovalenceMedium", meta: 0}, {stack: 64});
Item.createItem("covDust3", "Covalence dust High", {name: "dustCovalenceHigh", meta: 0}, {stack: 64});
Item.createItem("rodDivining1", "Divining rod low", {name: "rodDivining", meta: 0}, {stack: 1});
Item.createItem("rodDivining2", "Divining rod medium", {name: "rodDivining", meta: 1}, {stack: 1});
Item.createItem("rodDivining3", "Divining rod high", {name: "rodDivining", meta: 2}, {stack: 1});


Callback.addCallback("PostLoaded", function(){
Recipes.addShaped({id: ItemID.covDust1, count: 40, data: 0}, ["sii", "iii", "iii"],["s", 263, 1, "i", 4, 0]);
if(VanillaItemID) Recipes.addShaped({id: ItemID.covDust1, count: 40, data: 0}, ["sii", "iii", "iii"],["s", VanillaItemID.charcoal, 0, "i", 4, 0]);
if(VanillaItemID) Recipes.addShaped({id: ItemID.covDust1, count: 40, data: 0}, ["sii", "iii", "iii"],["s", VanillaItemID.charcoal, 1, "i", 4, 0]);
Recipes.addShapeless({id: ItemID.covDust2, count: 40, data: 0}, [{id: 265, data: 0},{id: 331, data: 0}]);
Recipes.addShapeless({id: ItemID.covDust3, count: 40, data: 0}, [{id: 264, data: 0},{id: 263, data: 0}]);

Recipes.addShaped({id: ItemID.rodDivining1, count: 1, data: 0}, ["iii", "isi", "iii"],["s", 280, 0, "i", ItemID.covDust1, 0]);
Recipes.addShaped({id: ItemID.rodDivining2, count: 1, data: 0}, ["iii", "isi", "iii"],["s", ItemID.rodDivining1, 0, "i", ItemID.covDust2, 0]);
Recipes.addShaped({id: ItemID.rodDivining3, count: 1, data: 0}, ["iii", "isi", "iii"],["s", ItemID.rodDivining2, 0, "i", ItemID.covDust3, 0]);

Recipes.addShapeless({id: BlockID.dmBlock, count: 1, data: 0}, [{id: ItemID.darkMatter, data: 0}, {id: ItemID.darkMatter, data: 0}, {id: ItemID.darkMatter, data: 0}, {id: ItemID.darkMatter, data: 0}]);
Recipes.addShapeless({id: BlockID.rmBlock, count: 1, data: 0}, [{id: ItemID.redMatter, data: 0}, {id: ItemID.redMatter, data: 0}, {id: ItemID.redMatter, data: 0}, {id: ItemID.redMatter, data: 0}]);
Recipes.addShaped({id: BlockID.blockAlchemicalFuel, count: 1, data: 0}, ["aaa", "aaa", "aaa"],["a", ItemID.fuelAlchemical, 0]);
Recipes.addShaped({id: BlockID.blockMobiusFuel, count: 1, data: 0}, ["aaa", "aaa", "aaa"],["a", ItemID.fuelMobius, 0]);
Recipes.addShaped({id: BlockID.blockAstralFuel, count: 1, data: 0}, ["aaa", "aaa", "aaa"],["a", ItemID.fuelAstral, 0]);

Recipes.addShapeless({id: ItemID.darkMatter, count: 4, data: 0}, [{id: BlockID.dmBlock, data: 0}]);
Recipes.addShapeless({id: ItemID.redMatter, count: 4, data: 0}, [{id: BlockID.rmBlock, data: 0}]);
Recipes.addShapeless({id: ItemID.fuelAlchemical, count: 9, data: 0}, [{id: BlockID.blockAlchemicalFuel, data: 0}]);
Recipes.addShapeless({id: ItemID.fuelMobius, count: 9, data: 0}, [{id: BlockID.blockMobiusFuel, data: 0}]);
Recipes.addShapeless({id: ItemID.fuelAstral, count: 9, data: 0}, [{id: BlockID.blockAstralFuel, data: 0}]);
});


var ore_emc = {"1": 1, "14": 2048, "15": 256, "16": 128, "56": 8192, "129": 16384, "73": 64};

Item.registerUseFunction("rodDivining1", function(crd, b, i){
  let total = 0;
  c = crd.relative
  for(let xx = -1; xx <= 1; xx++){
    for(let yy = -1; yy <= 1; yy++){
      for(let zz = -1; zz <= 1; zz++){
        let val = ore_emc[World.getBlockID(c.x+xx, c.y+yy, c.z+zz)];
        if(val){total+=val};
      }
    }
  }
  Game.message(Translation.translate("Total EMC in this area: ")+total);
});

Item.registerUseFunction("rodDivining2", function(crd, b, i){
  let total = 0;
  c = crd.relative
  for(let xx = -2; xx <= 2; xx++){
    for(let yy = -2; yy <= 2; yy++){
      for(let zz = -2; zz <= 2; zz++){
        let val = ore_emc[World.getBlockID(c.x+xx, c.y+yy, c.z+zz)];
        if(val){total+=val};
      }
    }
  }
  Game.message(Translation.translate("Total EMC in this area: ")+total);
});

Item.registerUseFunction("rodDivining3", function(crd, b, i){
  let total = 0;
  c = crd.relative
  for(let xx = -3; xx <= 3; xx++){
    for(let yy = -2; yy <= 2; yy++){
      for(let zz = -3; zz <= 3; zz++){
        let val = ore_emc[World.getBlockID(c.x+xx, c.y+yy, c.z+zz)];
        if(val){total+=val};
      }
    }
  }
  Game.message(Translation.translate("Total EMC in this area: ")+total);
});




// file: items/bags.js

var BAG_CONTAINERS = {};
Saver.addSavesScope("EE2Bags",
function read(scope){
	if(scope && scope.cont){
		for(i=0; i<16; i++) BAG_CONTAINERS["bag"+i] = scope.cont["bag"+i] || new UI.Container();
	} else for(i=0; i<16; i++) BAG_CONTAINERS["bag"+i] = new UI.Container();
},
function save(){
	return {cont: BAG_CONTAINERS};
});

var setupBag = function(index){
	IDRegistry.genItemID("alchemyBag"+index);
	Item.createItem("alchemyBag"+index, "Alchemy bag", {name: "alchemy_bag", meta: index},
	    {isTech: !(__config__.getBool("物品方块.炼金术之袋")), stack: 1});
	SetDescription(ItemID["alchemyBag"+index],
	    Translation.translate("§3 storing items, similar to Ender box but not Shulker box."));
	if(__config__.getBool("物品方块.炼金术之袋"))
	    Item.addCreativeGroup("EE2bags", Translation.translate("Alchemy bag"), [ItemID["alchemyBag"+i]]);
	Callback.addCallback("ItemUse", function (c, i, b){
		if(i.id == ItemID["alchemyBag"+index])
		    BAG_CONTAINERS["bag"+index].openAs(alchChestUI);
	});
};

for(i=0; i<16; i++)setupBag(i);

if(__config__.getBool("物品方块.炼金术之袋")) Callback.addCallback("PostLoaded", function(){
	for(i=0; i<16; i++) Recipes.addShaped({id: ItemID["alchemyBag"+i], count: 1, data: 0},
	    ["mmm", "aca", "aaa"], ["a", 35, i, "m", ItemID.covDust3, 0, "c", BlockID.alchChest, 0]);
});




// file: items/klein stars.js

IDRegistry.genItemID("kleinStar1");
Item.createItem("kleinStar1", "Klein star I", {name: "klein_star", meta: 0}, {stack: 1, isTech: true});
System.setStar(ItemID.kleinStar1, 5000, 50);

IDRegistry.genItemID("kleinStar2");
Item.createItem("kleinStar2", "Klein star II", {name: "klein_star", meta: 1}, {stack: 1, isTech: true});
System.setStar(ItemID.kleinStar2, 20000, 200);

IDRegistry.genItemID("kleinStar3");
Item.createItem("kleinStar3", "Klein star III", {name: "klein_star", meta: 2}, {stack: 1, isTech: true});
System.setStar(ItemID.kleinStar3, 80000, 800);

IDRegistry.genItemID("kleinStar4");
Item.createItem("kleinStar4", "Klein star IV", {name: "klein_star", meta: 3}, {stack: 1, isTech: true});
System.setStar(ItemID.kleinStar4, 320000, 3200);

IDRegistry.genItemID("kleinStar5");
Item.createItem("kleinStar5", "Klein star V", {name: "klein_star", meta: 4}, {stack: 1, isTech: true});
System.setStar(ItemID.kleinStar5, 1280000, 12800);

IDRegistry.genItemID("kleinStar6");
Item.createItem("kleinStar6", "Klein star VI", {name: "klein_star", meta: 5}, {stack: 1, isTech: true});
System.setStar(ItemID.kleinStar6, 5120000, 51200);

Callback.addCallback("PostLoaded", function (){
Recipes.addShaped({id: ItemID.kleinStar1, count: 1, data: 27}, ["aaa", "aba", "aaa"], ["a", ItemID.fuelMobius, 0, "b", 264, 0]);
Recipes.addShaped({id: ItemID.kleinStar2, count: 1, data: 27}, ["aa", "aa"], ["a", ItemID.kleinStar1, 27]);
Recipes.addShaped({id: ItemID.kleinStar3, count: 1, data: 27}, ["aa", "aa"], ["a", ItemID.kleinStar2, 27]);
Recipes.addShaped({id: ItemID.kleinStar4, count: 1, data: 27}, ["aa", "aa"], ["a", ItemID.kleinStar3, 27]);
Recipes.addShaped({id: ItemID.kleinStar5, count: 1, data: 27}, ["aa", "aa"], ["a", ItemID.kleinStar4, 27]);
Recipes.addShaped({id: ItemID.kleinStar6, count: 1, data: 27}, ["aa", "aa"], ["a", ItemID.kleinStar5, 27]);
});




// file: items/hammers.js

const dirtBlocksDrop = {"2": 3, "3": 3, "60": 3, "61": 3, "198": 3, "243": 3, "110": 3};

function getBlockDrop(coords, id, data, level){
	 let dropFunc = Block.dropFunctions[id];
	 
	 if(dropFunc){
	   	return dropFunc(coords, id, data, level, {});
  	}
  	
  	if(dirtBlocksDrop[id]){
		  return [[dirtBlocksDrop[id], 1, 0]];
  	}
  	
  	return [[id, 1, data]];
}

var UNBREAKABLE = {0: true, 7: true, 8: true, 9: true, 10: true, 11: true,
 34: true, 51: true, 90: true, 95: true, 119: true, 120: true, 122: true,
 137: true, 188: true, 189: true, 192: true, 199: true, 205: true, 209: true,
 217: true, 218: true, 415: true, 416: true, 466: true, 470: true, 472: true};

var dmHammercount = 0;var rmHammercount =0;var morningStarcount = 0;


IDRegistry.genItemID("dmHammer");
Item.createItem("dmHammer", "Dark matter hammer", {name: "dm_hammer", meta: 0}, {stack: 1});
ToolAPI.setTool(ItemID.dmHammer, {level: 5, efficiency: 10, damage: 16, durability: 10000000, enchantability: 30}, ToolType.pickaxe);
SetDescription(ItemID.dmHammer, Translation.translate("§3Click to mine by range."));

Item.registerUseFunction("dmHammer", function(coords, item, block){
  let x=coords.x; y=coords.y; z=coords.z;
  let rr = 2-dmHammercount;
  
  if(!Entity.getSneaking(Player.get())){
    for(xx = -rr; xx <= rr; xx++){
      for(yy = -rr; yy <= rr; yy++){
        for(zz = -rr; zz <= rr; zz++){
          let block = World.getBlock(x + xx, y + yy, z + zz);
          if(!UNBREAKABLE[block.id]){
            var block_drop = Block.getBlockDropViaItem(block, {id: ItemID.dmHammer, data:0}, i) || [];
            var pp = Player.getPosition();
            block_drop.map(function(ii){
              World.drop(pp.x, pp.y, pp.z, ii[0], ii[1], ii[2])
            })
            World.setBlock(x + xx, y + yy, z + zz, 0);
          }
        }
      }
    }
  }
});

setUI_.dmHammer = new setUI({id: ItemID.dmHammer}, 700, 250, "change", function(){
if(dmHammercount<2){dmHammercount=dmHammercount+1} else
if(dmHammercount>=2){dmHammercount=0};
Game.message(Translation.translate("Excavation Range: ")+(5-2*dmHammercount))
});

Callback.addCallback("tick", function(){
try{
if(Player.getCarriedItem().id==ItemID.dmHammer && (GuiName=="in_game_play_screen"||GuiName=="hud_screen") ){
setUI_.dmHammer.ui.open()}else{setUI_.dmHammer.ui.close()};
}catch(e){};
});
Callback.addCallback("LevelLeft", function(){try{setUI_.dmHammer.ui.close()}catch(e){}});


IDRegistry.genItemID("rmHammer");
Item.createItem("rmHammer", "Red matter hammer", {name: "rm_hammer", meta: 0}, {stack: 1});
ToolAPI.setTool(ItemID.rmHammer, {level: 5, efficiency: 14, damage: 30, durability: 10000000, enchantability: 30}, ToolType.pickaxe);
SetDescription(ItemID.rmHammer, Translation.translate("§3Click to mine by range."));

Item.registerUseFunction("rmHammer", function(coords, item, block){
  let x=coords.x; y=coords.y; z=coords.z;
  let rr = 4-rmHammercount;
  
  if(!Entity.getSneaking(Player.get())){
    for(xx = -rr; xx <= rr; xx++){
      for(yy = -rr; yy <= rr; yy++){
        for(zz = -rr; zz <= rr; zz++){
          let block = World.getBlock(x + xx, y + yy, z + zz);
          if(!UNBREAKABLE[block.id]){
            var block_drop = Block.getBlockDropViaItem(block, {id: ItemID.rmHammer, data:0}, i) || [];
            var pp = Player.getPosition();
            block_drop.map(function(ii){
              World.drop(pp.x, pp.y, pp.z, ii[0], ii[1], ii[2])
            })
            World.setBlock(x + xx, y + yy, z + zz, 0);
          }
        }
      }
    }
  }
});

setUI_.rmHammer = new setUI({id: ItemID.rmHammer}, 700, 250, "change", function(){
if(rmHammercount<4){rmHammercount=rmHammercount+1} else
if(rmHammercount>=4){rmHammercount=0};
Game.message(Translation.translate("Excavation Range: ")+(9-2*rmHammercount))
});

Callback.addCallback("tick", function(){
try{
if(Player.getCarriedItem().id==ItemID.rmHammer && (GuiName=="in_game_play_screen"||GuiName=="hud_screen") ){
setUI_.rmHammer.ui.open()}else{setUI_.rmHammer.ui.close()};
}catch(e){};
});
Callback.addCallback("LevelLeft", function(){try{setUI_.rmHammer.ui.close()}catch(e){}});


Callback.addCallback("PostLoaded", function (){
Recipes.addShaped({id: ItemID.dmHammer, count: 1, data: 0}, ["mdm", " d", " d"], ["m", ItemID.darkMatter, 0, "d", 264, 0]);
Recipes.addShaped({id: ItemID.rmHammer, count: 1, data: 0}, ["mhm", " d", " d"], ["m", ItemID.redMatter, 0, "d", ItemID.darkMatter, 0, "h", ItemID.dmHammer, -1]);
});




// file: items/matter.js

IDRegistry.genItemID("dmPickaxe");
Item.createItem("dmPickaxe", "Dark matter pickaxe", {name: "dm_pickaxe", meta: 0}, {stack: 1});
IDRegistry.genItemID("dmAxe");
Item.createItem("dmAxe", "Dark matter axe", {name: "dm_axe", meta: 0}, {stack: 1});
IDRegistry.genItemID("dmShovel");
Item.createItem("dmShovel", "Dark matter shovel", {name: "dm_shovel", meta: 0}, {stack: 1});
IDRegistry.genItemID("dmSword");
Item.createItem("dmSword", "Dark matter sword", {name: "dm_sword", meta: 0}, {stack: 1});

ToolAPI.setTool(ItemID.dmPickaxe, {level: 5, efficiency: 10, damage: 10, durability: 10000000, enchantability: 30}, ToolType.pickaxe);
ToolAPI.setTool(ItemID.dmAxe, {level: 5, efficiency: 10, damage: 16, durability: 10000000, enchantability: 30}, ToolType.axe);
ToolAPI.setTool(ItemID.dmShovel, {level: 5, efficiency: 10, damage: 10, durability: 10000000, enchantability: 30}, ToolType.shovel);
ToolAPI.setTool(ItemID.dmSword, {level: 5, efficiency: 10, damage: 20, durability: 10000000, enchantability: 30}, ToolType.sword);

IDRegistry.genItemID("dmHelm");
IDRegistry.genItemID("dmChest");
IDRegistry.genItemID("dmLegg");
IDRegistry.genItemID("dmBoots");

Item.createArmorItem("dmHelm", "Dark matter helmet", {name: "dm_armor", meta: 2}, {type: "helmet", armor: 7, durability: 10000000, texture: "armor/dm_0.png"});
Item.createArmorItem("dmChest", "Dark matter chestplate", {name: "dm_armor", meta: 0}, {type: "chestplate", armor: 14, durability: 10000000, texture: "armor/dm_0.png"});
Item.createArmorItem("dmLegg", "Dark matter leggings", {name: "dm_armor", meta: 3}, {type: "leggings", armor: 12, durability: 10000000, texture: "armor/dm_1.png"});
Item.createArmorItem("dmBoots", "Dark matter boots", {name: "dm_armor", meta: 1}, {type: "boots", armor: 7, durability: 10000000, texture: "armor/dm_0.png"});

Callback.addCallback("PostLoaded", function(){
Recipes.addShaped({id: ItemID.dmHelm, count: 1, data: 0}, ["aaa", "a a", "   "], ["a", ItemID.darkMatter, 0]);
Recipes.addShaped({id: ItemID.dmChest, count: 1, data: 0}, ["a a", "aaa", "aaa"], ["a", ItemID.darkMatter, 0]);
Recipes.addShaped({id: ItemID.dmLegg, count: 1, data: 0}, ["aaa", "a a", "a a"], ["a", ItemID.darkMatter, 0]);
Recipes.addShaped({id: ItemID.dmBoots, count: 1, data: 0}, ["a a", "a a", "   "], ["a", ItemID.darkMatter, 0]);

Recipes.addShaped({id: ItemID.dmPickaxe, count: 1, data: 0}, ["aaa", " d ", " d "], ["a", ItemID.darkMatter, 0, "d", 264, 0]);
Recipes.addShaped({id: ItemID.dmAxe, count: 1, data: 0}, ["aa", "ad", " d"], ["a", ItemID.darkMatter, 0, "d", 264, 0]);
Recipes.addShaped({id: ItemID.dmShovel, count: 1, data: 0}, ["a", "d", "d"], ["a", ItemID.darkMatter, 0, "d", 264, 0]);
Recipes.addShaped({id: ItemID.dmSword, count: 1, data: 0}, ["a", "a", "d"], ["a", ItemID.darkMatter, 0, "d", 264, 0]);
});


IDRegistry.genItemID("rmPickaxe");
Item.createItem("rmPickaxe", "Red matter pickaxe", {name: "rm_pickaxe", meta: 0}, {stack: 1});
IDRegistry.genItemID("rmAxe");
Item.createItem("rmAxe", "Red matter axe", {name: "rm_axe", meta: 0}, {stack: 1});
IDRegistry.genItemID("rmShovel");
Item.createItem("rmShovel", "Red matter shovel", {name: "rm_shovel", meta: 0}, {stack: 1});
IDRegistry.genItemID("rmSword");
Item.createItem("rmSword", "Red matter sword", {name: "rm_sword", meta: 0}, {stack: 1});
SetDescription(ItemID.rmSword, Translation.translate("§3Attack with AoE while sneaking."));

ToolAPI.setTool(ItemID.rmPickaxe, {level: 5, efficiency: 14, damage: 20, durability: 10000000, enchantability: 30}, ToolType.pickaxe);
ToolAPI.setTool(ItemID.rmAxe, {level: 5, efficiency: 14, damage: 30, durability: 10000000, enchantability: 30}, ToolType.axe);
ToolAPI.setTool(ItemID.rmShovel, {level: 5, efficiency: 14, damage: 20, durability: 10000000, enchantability: 30}, ToolType.shovel);
ToolAPI.setTool(ItemID.rmSword, {level: 5, efficiency: 14, damage: 100, durability: 10000000, enchantability: 30}, ToolType.sword);

IDRegistry.genItemID("rmHelm");
IDRegistry.genItemID("rmChest");
IDRegistry.genItemID("rmLegg");
IDRegistry.genItemID("rmBoots");

Item.createArmorItem("rmHelm", "Red matter helmet", {name: "rm_armor", meta: 2}, {type: "helmet", armor: 7, durability: 10000000, texture: "armor/rm_0.png"});
Item.createArmorItem("rmChest", "Red matter chestplate", {name: "rm_armor", meta: 0}, {type: "chestplate", armor: 14, durability: 10000000, texture: "armor/rm_0.png"});
Item.createArmorItem("rmLegg", "Red matter leggings", {name: "rm_armor", meta: 3}, {type: "leggings", armor: 12, durability: 10000000, texture: "armor/rm_1.png"});
Item.createArmorItem("rmBoots", "Red matter boots", {name: "rm_armor", meta: 1}, {type: "boots", armor: 7, durability: 10000000, texture: "armor/rm_0.png"});

SetDescription(ItemID.rmHelm, Translation.translate("§3Dress in full suit to unlock stronger effects."));
SetDescription(ItemID.rmChest, Translation.translate("§3Dress in full suit to unlock stronger effects."));
SetDescription(ItemID.rmLegg, Translation.translate("§3Dress in full suit to unlock stronger effects."));
SetDescription(ItemID.rmBoots, Translation.translate("§3Dress in full suit to unlock stronger effects."));

Callback.addCallback("PostLoaded", function(){
Recipes.addShaped({id: ItemID.rmHelm, count: 1, data: 0}, ["aaa", "ada", "   "], ["a", ItemID.redMatter, 0, "d", ItemID.dmHelm, -1]);
Recipes.addShaped({id: ItemID.rmChest, count: 1, data: 0}, ["ada", "aaa", "aaa"], ["a", ItemID.redMatter, 0, "d", ItemID.dmChest, -1]);
Recipes.addShaped({id: ItemID.rmLegg, count: 1, data: 0}, ["aaa", "ada", "a a"], ["a", ItemID.redMatter, 0, "d", ItemID.dmLegg, -1]);
Recipes.addShaped({id: ItemID.rmBoots, count: 1, data: 0}, ["ada", "a a", "   "], ["a", ItemID.redMatter, 0, "d", ItemID.dmBoots, -1]);
Recipes.addShaped({id: ItemID.rmPickaxe, count: 1, data: 0}, ["aaa", " m ", " d "], ["a", ItemID.redMatter, 0, "d", ItemID.darkMatter, 0, "m", ItemID.dmPickaxe, -1]);
Recipes.addShaped({id: ItemID.rmAxe, count: 1, data: 0}, ["aa", "am", " d"], ["a", ItemID.redMatter, 0, "d", ItemID.darkMatter, 0, "m", ItemID.dmAxe, -1]);
Recipes.addShaped({id: ItemID.rmShovel, count: 1, data: 0}, ["a", "m", "d"], ["a", ItemID.redMatter, 0, "d", ItemID.darkMatter, 0, "m", ItemID.dmShovel, -1]);
Recipes.addShaped({id: ItemID.rmSword, count: 1, data: 0}, ["a", "m", "d"], ["a", ItemID.redMatter, 0, "d", ItemID.darkMatter, 0, "m", ItemID.dmSword, -1]);
});

var rm_fly=false;
Callback.addCallback("tick", function(){
  if(
    Entity.getArmorSlot(Player.get(), 0).id == ItemID.rmHelm &&
    Entity.getArmorSlot(Player.get(), 1).id == ItemID.rmChest &&
    Entity.getArmorSlot(Player.get(), 2).id == ItemID.rmLegg &&
    Entity.getArmorSlot(Player.get(), 3).id == ItemID.rmBoots
  ){
  Player.setHunger(20);
  if(!rm_fly){rm_fly=true};
  Player.setFlyingEnabled(true);
  }else if(rm_fly && Game.getGameMode()!==1){
    rm_fly=false;
    Player.setFlyingEnabled(false);
    Player.setFlying(false);
  };
});

ToolType.katar = {
  isWeapon: true,
  damage: 8,
  baseDamage: 16,
  blockTypes: ["fibre", "wood", "plant"],
  onDestroy: function(item){
    item.data=0;
  },
  onBroke: function(item){
    item.data=0;
    return true;
  },
  onAttack: function(item, mob){
    item.data=0;
  },
  useItem: function(c, i, b){
    if(b.id == 17 || b.id == 162){
      var rad = 24;
      for(x = -rad; x <= rad; x ++){
        for(y = -2; y <= rad; y ++){
          for(z = -rad; z <= rad; z ++){
            let block = World.getBlock(c.x+x, c.y+y, c.z+z);
            if(block.id == b.id){
              World.setBlock(c.x+x, c.y+y, c.z+z, 0);
              Player.addItemToInventory(block.id, 1, block.data);
            }
          }
        }
      }
    }
  }
};

ToolType.morningStar = {
  isWeapon: true,
  damage: 8,
  baseDamage: 12,
  blockTypes: ["stone", "wood", "dirt", "plant", "fibre"],
  onDestroy: function(item){
    item.data=0;
  },
  onBroke: function(item){
    item.data=0;
    return true;
  },
  onAttack: function(item, mob){
    item.data=0;
  },
  calcDestroyTime: function(i, c, b, p, d, e){
    var material = ToolAPI.getBlockMaterial(b.id) || {};
    if(d<=0.05){return d}
    if((material.name&&material.name!=="unbreaking")||d>=10000){return 0.05}
    return d;
  },
  useItem: function(coords, item, block){
    let x=coords.x; y=coords.y; z=coords.z;
    let rr = 6-morningStarcount;
    
    if(!Entity.getSneaking(Player.get())){
      for(xx = -rr; xx <= rr; xx++){
        for(yy = -rr; yy <= rr; yy++){
          for(zz = -rr; zz <= rr; zz++){
            let block = World.getBlock(x + xx, y + yy, z + zz);
            if(!UNBREAKABLE[block.id]){
            var block_drop = Block.getBlockDropViaItem(block, {id: ItemID.rmMorningStar, data:0}, i) || [];
            var pp = Player.getPosition();
            block_drop.map(function(ii){
              World.drop(pp.x, pp.y, pp.z, ii[0], ii[1], ii[2])
            })
            World.setBlock(x + xx, y + yy, z + zz, 0);
            }
          }
        }
      }
    }
  }
};

IDRegistry.genItemID("rmKatar");
Item.createItem("rmKatar", "Red Matter Katar", {name: "katar", meta: 0}, {stack: 1});
SetDescription(ItemID.rmKatar, Translation.translate("§3Attack with AoE while sneaking.")+"\n"+Translation.translate("§3Click to trim the leaves."));

IDRegistry.genItemID("rmMorningStar");
Item.createItem("rmMorningStar", "Red Matter Morning Star", {name: "morning_star", meta: 0}, {stack: 1});
SetDescription(ItemID.rmMorningStar, Translation.translate("§3Click to mine by range."));


ToolAPI.setTool(ItemID.rmKatar, {level: 5, efficiency: 20, damage: 1000, durability: 10000000, enchantability: 30}, ToolType.katar);
ToolAPI.setTool(ItemID.rmMorningStar, {level: 5, efficiency: 30, damage: 30, durability: 10000000, enchantability: 30}, ToolType.morningStar);

Callback.addCallback("PostLoaded", function(){
	if(hard_mode){
		Recipes.addShaped({id: ItemID.rmKatar, count: 1, data: 0},
		    ["sak", "rrr", "rrr"],
		    ["k", ItemID.kleinStar6, -1, "s", ItemID.rmSword, -1, "a", ItemID.rmAxe, -1, "r", ItemID.redMatter, -1]);
		Recipes.addShaped({id: ItemID.rmMorningStar, count: 1, data: 0},
		    ["sak", "hrr", "rrr"],
		    ["k", ItemID.kleinStar6, -1, "h", ItemID.rmHammer, -1, "s", ItemID.rmShovel, -1, "a", ItemID.rmPickaxe, -1, "r", ItemID.redMatter, -1]);
	}else{
		Recipes.addShaped({id: ItemID.rmKatar, count: 1, data: 0},
		    ["sar", "rrr", "rrr"],
		    ["s", ItemID.rmSword, -1, "a", ItemID.rmAxe, -1, "r", ItemID.redMatter, -1]);
		Recipes.addShaped({id: ItemID.rmMorningStar, count: 1, data: 0},
		    ["sar", "hrr", "rrr"],
		    ["h", ItemID.rmHammer, -1, "s", ItemID.rmShovel, -1, "a", ItemID.rmPickaxe, -1, "r", ItemID.redMatter, -1]);
	}
});

setUI_.rmMorningStar = new setUI({id: ItemID.rmMorningStar}, 700, 250, "change", function(){
if(morningStarcount<6){morningStarcount = morningStarcount+1} else
if(morningStarcount>=6){morningStarcount = 0};
Game.message(Translation.translate("Excavation Range: ")+(13-2*morningStarcount))
});

Callback.addCallback("tick", function(){
try{
if(Player.getCarriedItem().id==ItemID.rmMorningStar && (GuiName=="in_game_play_screen"||GuiName=="hud_screen") ){
setUI_.rmMorningStar.ui.open()}else{setUI_.rmMorningStar.ui.close()};
}catch(e){};
});
Callback.addCallback("LevelLeft", function(){try{setUI_.rmMorningStar.ui.close()}catch(e){}});


Callback.addCallback("EntityHurt", function(a, v, d){
  item = Player.getCarriedItem();
  if(a == Player.get() && (item.id == ItemID.rmKatar) && Entity.getSneaking(Player.get())==true){
    var pos = Entity.getPosition(v);
    for(m in allMobs){
      var mobs = Entity.getAllInRange(pos, 6, allMobs[m]);
      for(i in mobs){
        var mob = mobs[i];
        Entity.damageEntity(mob, 1000, Player.get());
      }
    }
  }
});//潜行秒杀1
Callback.addCallback("EntityHurt", function(a, v, d){
  item = Player.getCarriedItem();
  if(a == Player.get() && (item.id == ItemID.rmSword) && Entity.getSneaking(Player.get())==true){
    var pos = Entity.getPosition(v);
    for(m in allMobs){
      var mobs = Entity.getAllInRange(pos, 3, allMobs[m]);
      for(i in mobs){
        var mob = mobs[i];
        Entity.damageEntity(mob, 100, Player.get());
      }
    }
  }
});//潜行秒杀2




// file: items/gem.js

IDRegistry.genItemID("gemHelm");
IDRegistry.genItemID("gemChest");
IDRegistry.genItemID("gemLegg");
IDRegistry.genItemID("gemBoots");

Item.createArmorItem("gemHelm", "Abyss Helmet", {name: "gem_armor", meta: 2}, {type: "helmet", armor: 4, durability: 10000000, texture: "armor/gem_0.png"});
Item.createArmorItem("gemChest", "Grid Infernal Armor", {name: "gem_armor", meta: 0}, {type: "chestplate", armor: 14, durability: 10000000, texture: "armor/gem_0.png"});
Item.createArmorItem("gemLegg", "Gravity Greaves", {name: "gem_armor", meta: 3}, {type: "leggings", armor: 12, durability: 10000000, texture: "armor/gem_1.png"});
Item.createArmorItem("gemBoots", "Hurricane Boots", {name: "gem_armor", meta: 1}, {type: "boots", armor: 7, durability: 10000000, texture: "armor/gem_0.png"});

SetDescription(ItemID.gemHelm, Translation.translate("§3allow you to walk on water.")+"\n"+
    Translation.translate("§3night vision and restore health."));
SetDescription(ItemID.gemChest, Translation.translate("§3allow you to walk on lava.")+"\n"+
    Translation.translate("§3saturation."));
SetDescription(ItemID.gemLegg, Translation.translate("§3repel mobs while sneaking.")+"\n"+
    Translation.translate("§3increase the speed of descent."));
SetDescription(ItemID.gemBoots, Translation.translate("§3allow you to fly."));

Callback.addCallback("PostLoaded", function(){
	Recipes.addShapeless({id: ItemID.gemHelm, count: 1, data: 0}, [
	    {id: ItemID.rmHelm, data: -1}, {id: ItemID.kleinStar6, data: -1},
	    {id: ItemID.evertideAmulet, data: 0}, {id: ItemID.soulStone, data: 0}
	]);

	Recipes.addShapeless({id: ItemID.gemChest, count: 1, data: 0}, [
	    {id: ItemID.rmChest, data: -1}, {id: ItemID.kleinStar6, data: -1},
	    {id: ItemID.vulcaniteAmulet, data: 0}, {id: ItemID.bodyStone, data: 0}
	]);

	Recipes.addShapeless({id: ItemID.gemLegg, count: 1, data: 0}, [
	    {id: ItemID.rmLegg, data: -1}, {id: ItemID.kleinStar6, data: -1},
	    {id: ItemID.watchTime, data: 0}, {id: ItemID.ringBlackHoleInactive, data: 0}
	]);

	Recipes.addShapeless({id: ItemID.gemBoots, count: 1, data: 0}, [
	    {id: ItemID.rmBoots, data: -1}, {id: ItemID.kleinStar6, data: -1},
	    {id: ItemID.swiftWolfRendingGale, data: 0}, {id: ItemID.swiftWolfRendingGale, data: 0}
	]);
});


Armor.onTick({id: ItemID.gemHelm, slot: 0}, function (s){
  Entity.addEffect(Player.get(), 16, 0, 160, false, false);
  p = Player.getPosition();
  if(World.getBlockID(p.x, p.y, p.z) == 9){
    Entity.addEffect(Player.get(), 13, 0, 160, false, false);
  }
  if(World.getThreadTime()%10 == 0 && Entity.getHealth(Player.get()) < Entity.getMaxHealth(Player.get())){
    Entity.setHealth(Player.get(), Entity.getHealth(Player.get())+1);
  }
});

Rings.float(8, function(){return Entity.getArmorSlot(Player.get(), 0).id==ItemID.gemHelm});
Rings.float(9, function(){return Entity.getArmorSlot(Player.get(), 0).id==ItemID.gemHelm});

Armor.onTick({id: ItemID.gemChest, slot: 1}, function (a, v, s){
  Entity.setFire(Player.get(), 0);
  Entity.addEffect(Player.get(), 12, 0, 160, false, false);
  if(World.getThreadTime()%10 == 0){
    Player.setHunger(Player.getHunger()+1);
  }
});

Rings.float(10, function(){return Entity.getArmorSlot(Player.get(), 1).id==ItemID.gemChest});
Rings.float(11, function(){return Entity.getArmorSlot(Player.get(), 1).id==ItemID.gemChest});

Armor.onTick({id: ItemID.gemLegg, slot: 2}, function (s){
  if(Entity.getSneaking(Player.get())){
    for(j in allMobs){
      ent = Entity.getAllInRange(Player.getPosition(), 6, allMobs[j]);
      for(i in ent){
        let x=Entity.getPosition(ent[i]).x-Player.getPosition().x;
        let y=Entity.getPosition(ent[i]).y-Player.getPosition().y;
        let z=Entity.getPosition(ent[i]).z-Player.getPosition().z;
        let dis=Math.sqrt(x*x+y*y+z*z);
        let vel=(6-dis)/3;
        if(vel>0) Entity.addVelocity(ent[i], vel*x/dis, vel*y/dis, vel*z/dis);
       }
    }
    if(Entity.getVelocity(Player.get()).y <= fallVelocity){
      Entity.setVelocity(Player.get(), Entity.getVelocity(Player.get()).x, -2, Entity.getVelocity(Player.get()).z);
    }
  }
});

Armor.onTick({id: ItemID.gemBoots, slot: 3}, function (s){
  Entity.addEffect(Player.get(), 1, 0, 160, false, false);
});

var gem_fly=false;
Callback.addCallback("tick", function(){
  if(Entity.getArmorSlot(Player.get(), 3).id==ItemID.gemBoots){
   if(!gem_fly){gem_fly=true};
   Player.setFlyingEnabled(true);
  }else if(gem_fly && Game.getGameMode()!==1){
    gem_fly=false;
    Player.setFlyingEnabled(false);
    Player.setFlying(false);
  };
});


Armor.onHurt({id: ItemID.gemHelm, slot: 0}, function (a, v, s){
  Armor.preventDamaging(ItemID.gemHelm);
});

Armor.onHurt({id: ItemID.gemChest, slot: 1}, function (a, v, s, h){
  Armor.preventDamaging(ItemID.gemChest);
});

Armor.onHurt({id: ItemID.gemLegg, slot: 2}, function (a, v, s){
  Armor.preventDamaging(ItemID.gemLegg);
});

Armor.onHurt({id: ItemID.gemBoots, slot: 3}, function (a, v, s){
  Armor.preventDamaging(ItemID.gemBoots);
});

Callback.addCallback("EntityHurt", function(a, v, h){
if(v == Player.get()){
  if(
    Entity.getArmorSlot(Player.get(), 0).id == ItemID.gemHelm &&
    Entity.getArmorSlot(Player.get(), 1).id == ItemID.gemChest &&
    Entity.getArmorSlot(Player.get(), 2).id == ItemID.gemLegg &&
    Entity.getArmorSlot(Player.get(), 3).id == ItemID.gemBoots
  ){
    Game.prevent();
  }
};
});




// file: items/mercurial_eye.js





// file: items/destiny.js





// file: rings/iron band.js

IDRegistry.genItemID("ironBand");
Item.createItem("ironBand", "Iron band", {name: "ironBand", meta: 0}, {stack: 64});

Callback.addCallback("PostLoaded", function(){
if(hard_mode){
	Recipes.addShaped({id: ItemID.ironBand, count: 1, data: 0}, 
	["iri", 
	 "rxr",
	 "iri"],
	["x", 399, 0, "i", 42, 0, "r", ItemID.darkMatter, 0]);
	Recipes.addShaped({id: ItemID.ironBand, count: 1, data: 0}, 
	["iri", 
	 "rxr",
	 "iri"],
	["x", 466, 0, "i", 42, 0, "r", ItemID.darkMatter, 0]);
	//EMC: 139264+4*2304+4*139264=705536
}else{
	Recipes.addShaped({id: ItemID.ironBand, count: 1, data: 0}, 
	["iii", 
	 "ili",
	 "iii"],
	["l", 325, 10, "i", 265, 0]);
	if(VanillaItemID) Recipes.addShaped({id: ItemID.ironBand, count: 1, data: 0}, 
	["iii", 
	 "ili",
	 "iii"],
	["l", VanillaItemID.lava_bucket, 0, "i", 265, 0]);
};
});




// file: rings/black hole.js

IDRegistry.genItemID("ringBlackHoleInactive");
Item.createItem("ringBlackHoleInactive", "Void ring", {name: "ringBlackHole", meta: 0}, {stack: 1});
SetDescription(ItemID.ringBlackHoleInactive, Translation.translate("§3In inventory: suck near items into your inventory.\n§4Inactive"));

IDRegistry.genItemID("ringBlackHole");
Item.createItem("ringBlackHole", "Void ring", {name: "ringBlackHole", meta: 1}, {stack: 1, isTech: true});
SetDescription(ItemID.ringBlackHole, Translation.translate("§3In inventory: suck near items into your inventory.\n§2Active"));

Callback.addCallback("PostLoaded", function(){
if(hard_mode){
	Recipes.addShaped({id: ItemID.ringBlackHoleInactive, count: 1, data: 0}, 
	["sss", 
	 "dbd",
	 "sss"],
	["b", ItemID.ironBand, 0, "d", ItemID.redMatter, 0, "s", 287, 0]);
}else{
	Recipes.addShaped({id: ItemID.ringBlackHoleInactive, count: 1, data: 0}, 
	["sss", 
	 "dbd",
	 "sss"],
	["b", ItemID.ironBand, 0, "d", ItemID.darkMatter, 0, "s", 287, 0]);
}
});

Rings.activateRing(ItemID.ringBlackHoleInactive, ItemID.ringBlackHole, true);

Rings.addRingFunction(ItemID.ringBlackHole, function(){
  let player = Player.getPosition();
  let _item = Entity.getAllInRange({x: player.x, y: player.y, z: player.z}, 7, 64);
    for(var i = 0; i < _item.length; i++){
      Entity.moveToTarget(_item[i], player, {
       speed: 0.5,
       denyY: false,
       jumpVel: 0.5
      })
    }
});

/*
function getEmptyContainerSlot(cont){
  if(!cont.tileEntity){
    for(i = 0; i <= cont.getSize(); i ++){
      return true;
      break;
    }
  }
  return false;
}

Rings.addPedestalFunction(ItemID.ringBlackHoleInactive, function(tile){
  var dirs = [
    {x: 0, y: 1, z: 0},
    {x: 0, y:-1, z: 0},
    {x: 1, y: 0, z: 0},
    {x:-1, y: 0, z: 0},
    {x: 0, y: 0, z: 1},
    {x: 0, y: 0, z:-1},
  ];
  
  for(_d in dirs){
    let d = dirs[_d];
    let cont = World.getContainer(tile.x+d.x, tile.y+d.y, tile.z+d.z);
    if(cont && !cont.tileEntity){
      for(i = 0; i <= cont.getSize(); i ++){
        let _item = Entity.getAllInRange({x: tile.x, y: tile.y, z: tile.z}, 7, 64);
        for(i in _item){
          item = Entity.getDroppedItem(_item[i]);
          slot = cont.getSlot(i);
          if(!slot.id && item && getEmptyContainerSlot(cont)){
            slot.id = item.id;
            slot.count = item.count;
            slot.data = item.data;
            cont.setSlot(i, slot.id, slot.count, slot.data);
            Entity.remove(_item[i]);
            break
          } else if(slot.id == item.id && slot.count+item.count <= 64) {
            slot.count+=item.count;
            cont.setSlot(i, slot.id, slot.count, slot.data);
            Entity.remove(_item[i]);
            break
          }
        }
      }
    }
  }
});
*/
Callback.addCallback("tick", function(){
  if(Rings.get(ItemID.ringBlackHole)){
    Rings.getRingFunction(ItemID.ringBlackHole).inv();
  }
});




// file: rings/talisman of repair.js

IDRegistry.genItemID("talismanRepair");
Item.createItem("talismanRepair", "Talisman of repair", {name: "talismanRepair", meta: 0}, {stack: 1});
SetDescription(ItemID.talismanRepair, Translation.translate("§3In inventory: fix the durability of some items in the player's inventory."));

Callback.addCallback("PostLoaded", function(){
Recipes.addShaped({id: ItemID.talismanRepair, count: 1, data: 0}, 
["abc", 
 "pps",
 "abc"],
["a", ItemID.covDust1, 0, "b", ItemID.covDust2, 0, "c", ItemID.covDust3, 0, "p", 339, 0, "s", 287, 0]);
});

var toolList = {
  //其它
  259: true, 261: true, 346: true, 359: true, 398: true, 444: true, 455: true, 469: true, 513: true,
  //铁
  256: true, 257: true, 258: true, 267: true, 292: true,
  //木
  268: true, 269: true, 270: true, 271: true, 290: true, 
  //石
  272: true, 273: true, 274: true, 275: true, 291: true,
  //钻石
  276: true, 277: true, 278: true, 279: true, 293: true, 
  //金
  283: true, 284: true, 285: true, 286: true, 294: true,
  //皮革
  298: true, 299: true, 300: true, 301: true,
  //锁链
  302: true, 303: true, 304: true, 305: true,
  //铁
  306: true, 307: true, 308: true, 309: true,
  //金
  314: true, 315: true, 316: true, 317: true,
  //钻石
  310: true, 311: true, 312: true, 313: true,
};


Rings.addRingFunction(ItemID.talismanRepair, function(){
if(World.getThreadTime()%20 == 0){
  for(i = 0; i < 36; i ++){
    let item = Player.getInventorySlot(i);
    if(item.data > 0&&toolList[item.id]&&(GuiName=="in_game_play_screen"||GuiName=="hud_screen")){
      Player.setInventorySlot(i, item.id, item.count, item.data-4<0?0:item.data-4, item.extra);
    }
  }
  for(i = 0; i < 4; i ++){
    let armor = Player.getArmorSlot(i);
    if(armor.data > 0&&toolList[armor.id]&&(GuiName=="in_game_play_screen"||GuiName=="hud_screen")){
      Player.setArmorSlot(i, armor.id, armor.count, armor.data-4<0?0:armor.data-4, armor.extra);
    }
  }
};
});

Callback.addCallback("tick", function(){
  if(Rings.get(ItemID.talismanRepair)){
    Rings.getRingFunction(ItemID.talismanRepair).inv();
  }
});




// file: rings/pedestal.js

IDRegistry.genBlockID("pedestalMatter");
Block.createBlock("pedestalMatter", [
	 {name: "Matter pedestal", texture: [
	   ["dmBlock",0],
  ],inCreative: __config__.getBool("物品方块.暗物质台座")}
], Block.createSpecialType({base: 1, renderlayer: 3}));
SetDescription(BlockID.pedestalMatter, Translation.translate("§3Sneak click to make the Ring work."));

(function Setpedestal(id){
	var Collision = new ICRender.CollisionShape();
	Collision.addEntry()
		.addBox(3/16, 0, 3/16, 13/16, 2/16, 13/16)
		.addBox(6/16, 2/16, 6/16, 10/16, 9/16, 10/16)
		.addBox(5/16, 9/16, 5/16, 11/16, 10/16, 11/16);
	BlockRenderer.setCustomCollisionShape(id, 0, Collision);

	var render = new ICRender.Model();
	var model = BlockRenderer.createModel();
	model.addBox(3/16, 0, 3/16, 13/16, 2/16, 13/16, id, 0);
	model.addBox(6/16, 2/16, 6/16, 10/16, 9/16, 10/16, id, 0);
	model.addBox(5/16, 9/16, 5/16, 11/16, 10/16, 11/16, id, 0);
	render.addEntry(model);
	BlockRenderer.setStaticICRender(id, 0, render);
})(BlockID.pedestalMatter);


Callback.addCallback("PostLoaded", function (){
if(__config__.getBool("物品方块.暗物质台座")){
	if(hard_mode){
		Recipes.addShaped({id: BlockID.pedestalMatter, count: 1, data: 0}, 
		["rir", 
		 "rir",
		 "iii"],
		["r", BlockID.rmBlock, 0, "i", BlockID.dmBlock, 0]);
	}else{
		Recipes.addShaped({id: BlockID.pedestalMatter, count: 1, data: 0}, 
		["rir", 
		 "rir",
		 "iii"],
		["r", ItemID.redMatter, 0, "i", BlockID.dmBlock, 0]);
	}
}
});

var pedestalUI = new UI.StandartWindow({
    standart: {
        header: {text: {text: Translation.translate("Pedestal")}},
        inventory: {standart: true},
        background: {standart: true}
    },
    elements: {
        "ring": {type: "slot", x: 550, y: 200},
    }
});

TileEntity.registerPrototype(BlockID.pedestalMatter, {
    defaultValues: {active: false},
    initAnimation: function(){
    	var ths = this;
    	if(ths.container){
    		ths.animation.describeItem({
    		    id: ths.container.getSlot("ring").id,
    		    data: ths.container.getSlot("ring").data,
    		    count: 1, rotation: "y", size: 6/16
    		});
    		ths.animation.load();
    	}
    },
    init: function(){
    	this.animation = new Animation.Item(this.x+0.5, this.y+13/16, this.z+0.5);
    	this.initAnimation();
    },
    destroy: function(){
    	if(this.animation) this.animation.destroy();
    },
    getGuiScreen: function(){
    	return pedestalUI;
    },
    click: function(){
    	if(Entity.getSneaking(Player.get()) && Rings.getPedestalFunction(this.container.getSlot("ring").id)){
    		this.data.active = !this.data.active;
    		if(this.data.active){
    			Game.message("§9"+Translation.translate("Ring activated!"));
    			PlaySoundFile("pecharge.ogg");
    			return true;
    		} else {
    			Game.message("§c"+Translation.translate("Ring disabled!"));
    			PlaySoundFile("peuncharge.ogg");
    			return true;
    		}
    	}
    },
    redstone: function(params){
    	if(params.power>0 && Rings.getPedestalFunction(this.container.getSlot("ring").id)){
    		this.data.active = !this.data.active;
    		if(this.data.active){
    			Game.message("§9"+Translation.translate("Ring activated!"));
    			PlaySoundFile("pecharge.ogg");
    		} else {
    			Game.message("§c"+Translation.translate("Ring disabled!"));
    			PlaySoundFile("peuncharge.ogg");
    		}
    	}
    },
    tick: function(){
    	let ring = this.container.getSlot("ring");
    	let coords = {x: this.x, y: this.y, z: this.z};
    	if(World.getThreadTime()%10 == 0) this.initAnimation();
    	if(this.data.active && Rings.getPedestalFunction(ring.id)){
    		Rings.getPedestalFunction(ring.id)(this, coords);
    	};
    	if(this.data.active&&this.container.getSlot("ring").id==0){
    		this.data.active=false;
    		Game.message("§c"+Translation.translate("Ring disabled!"));
    		PlaySoundFile("peuncharge.ogg");
    	};
    }
});




// file: rings/time watch.js

IDRegistry.genItemID("watchTime");
Item.createItem("watchTime", "Watch of flowing time", {name: "timeWatch", meta: 0}, {stack: 1});

Callback.addCallback("PostLoaded", function(){
if(hard_mode){
	Recipes.addShaped({id: ItemID.watchTime, count: 1, data: 0}, 
	["dsd", 
	 "gcg",
	 "dsd"],
	["c", 351, 4, "g", 89, 0, "c", 347, 0, "d", ItemID.redMatter, 0, "s", 49, 0]);
}else{
	Recipes.addShaped({id: ItemID.watchTime, count: 1, data: 0}, 
	["dsd", 
	 "gcg",
	 "dsd"],
	["c", 351, 4, "g", 89, 0, "c", 347, 0, "d", ItemID.darkMatter, 0, "s", 49, 0]);
}
});

var watchTime={}, watch_portal={}, watch_mode=1;
var watchTime2={
    "time":__config__.getNumber("时间洪流怀表.刷新时间"),
    "x":__config__.getNumber("时间洪流怀表.X范围"),
    "y":__config__.getNumber("时间洪流怀表.Y范围"),
    "z":__config__.getNumber("时间洪流怀表.Z范围")
};

SetDescription(ItemID.watchTime, Translation.translate("§3Be used: Change the speed of time passage.\n§3On pedestal: speed up some machines.\n§3Acceleration range: ")+(watchTime2.x*2+1)+"(x)*"+(watchTime2.y*2+1)+"(y)*"+(watchTime2.z*2+1)+"(z)");

Item.registerUseFunction("watchTime", function (crd, i, b){
	if(!Entity.getSneaking(Player.get())){
		switch(watch_mode){
		case 1:
			watch_mode = 2;
			Game.message(Translation.translate("Speed of passage of time: ")+"×"+(watch_mode));
		break;
		case 2:
			watch_mode = 10;
			Game.message(Translation.translate("Speed of passage of time: ")+"×"+(watch_mode));
		break;
		case 10:
			watch_mode = 60;
			Game.message(Translation.translate("Speed of passage of time: ")+"×"+(watch_mode));
		break;
		case 60:
			watch_mode = -60;
			Game.message(Translation.translate("Speed of passage of time: ")+"× "+(watch_mode));
		break;
		case -60:
			watch_mode = -10;
			Game.message(Translation.translate("Speed of passage of time: ")+"× "+(watch_mode));
		break;
		case -10:
			watch_mode = -2;
			Game.message(Translation.translate("Speed of passage of time: ")+"× "+(watch_mode));
		break;
		case -2:
			watch_mode = -1;
			Game.message(Translation.translate("Speed of passage of time: ")+"× "+(watch_mode));
		break;
		case -1:
			watch_mode = 0;
			Game.message(Translation.translate("Speed of passage of time: ")+"× "+(watch_mode));
		break;
		case 0:
			watch_mode = 1;
			Game.message(Translation.translate("Speed of passage of time: ")+"× "+(watch_mode));
		break;
		};
	}else{
		watch_mode = 1;
		Game.message(Translation.translate("Speed of passage of time: ")+"× "+(watch_mode));
	}
});

Callback.addCallback("tick", function(){
	if(watch_mode==1) return;
	var time=World.getWorldTime();
	World.setWorldTime(0-(0-time-(watch_mode-1)));
});


Rings.addPedestalFunction(ItemID.watchTime, function(tile, coords){
if(World.getThreadTime()%watchTime2.time==Math.abs(Math.floor(coords.x+coords.y+coords.z))%watchTime2.time){
	watchTime[coords.x+":"+coords.y+":"+coords.z]=[];
	for(xx = -Math.floor(watchTime2.x); xx <= Math.floor(watchTime2.x); xx++){
		for(yy = -Math.floor(watchTime2.y); yy <= Math.floor(watchTime2.y); yy++){
			for(zz = -Math.floor(watchTime2.z); zz <= Math.floor(watchTime2.z); zz++){
				if(System.getspeed_up(World.getBlock(coords.x+xx, coords.y+yy, coords.z+zz).id)){
					watchTime[coords.x+":"+coords.y+":"+coords.z].push({"x":coords.x+xx, "y":coords.y+yy, "z":coords.z+zz});
				}else if(World.getBlock(coords.x+xx, coords.y+yy, coords.z+zz).id==90 &&
				    World.getBlock(coords.x+xx, coords.y+yy-1, coords.z+zz).id==49){
					watch_portal[(coords.x+xx)+":"+(coords.y+yy)+":"+(coords.z+zz)] = (watch_portal[(coords.x+xx)+":"+(coords.y+yy)+":"+(coords.z+zz)] || 1) * 18;
				};
			}
		}
	}
};
if(watchTime[coords.x+":"+coords.y+":"+coords.z]){
	watchTime[coords.x+":"+coords.y+":"+coords.z].map(function(i){
		try{
		World.getTileEntity(i.x, i.y, i.z).times=(World.getTileEntity(i.x, i.y, i.z).times||1)*18;
		}catch(e){};
	});
};
});

Callback.addCallback("tick", function(){
if(Math.random()<1/4){
	for(i in watch_portal){
		if(Math.random()<watch_portal[i]/1000){
			var p = i.split(":");
			var ent = Entity.spawn(p[0]-(0-0.5), p[1]-(0-0.1), p[2]-(0-0.5), 36);
		}
	}
}
if(World.getThreadTime()%watchTime2.time==0) watch_portal={};
});

Callback.addCallback("LevelLeft", function(){
watchTime={};
watch_mode=1;
});




// file: rings/body stone.js

IDRegistry.genItemID("bodyStone");
Item.createItem("bodyStone", "Body stone", {name: "bodyStone", meta: 0}, {stack: 1});
SetDescription(ItemID.bodyStone, Translation.translate("§3On pedestal/In inventory: restores hunger to player."));

Callback.addCallback("PostLoaded", function(){
if(hard_mode){
	Recipes.addShaped({id: ItemID.bodyStone, count: 1, data: 0}, 
	["sss", 
	 "dbd",
	 "sss"],
	["b", 351, 4, "d", BlockID.rmBlock, 0, "s", 353, 0]);
	if(VanillaItemID) Recipes.addShaped({id: ItemID.bodyStone, count: 1, data: 0}, 
	["sss", 
	 "dbd",
	 "sss"],
	["b", VanillaItemID.lapis_lazuli, 0, "d", BlockID.rmBlock, 0, "s", 353, 0]);
}else{
	Recipes.addShaped({id: ItemID.bodyStone, count: 1, data: 0}, 
	["sss", 
	 "dbd",
	 "sss"],
	["b", 351, 4, "d", ItemID.redMatter, 0, "s", 353, 0]);
	if(VanillaItemID) Recipes.addShaped({id: ItemID.bodyStone, count: 1, data: 0}, 
	["sss", 
	 "dbd",
	 "sss"],
	["b", VanillaItemID.lapis_lazuli, 0, "d", ItemID.redMatter, 0, "s", 353, 0]);
}
});

Rings.addPedestalFunction(ItemID.bodyStone, function(tile){
  if(World.getThreadTime()%5 == 0){
    let player = Entity.findNearest({x: tile.x, y: tile.y, z: tile.z}, Player.get(), 11);
    Player.setHunger(Player.getHunger()+1);
  }
});

Callback.addCallback("tick", function(){
  if(Rings.get(ItemID.bodyStone)){
    if(World.getThreadTime()%10 == 0){
      Player.setHunger(Player.getHunger()+1);
    }
  }
});




// file: rings/soul stone.js

IDRegistry.genItemID("soulStone");
Item.createItem("soulStone", "Soul stone", {name: "soulStone", meta: 0}, {stack: 1});
SetDescription(ItemID.soulStone, Translation.translate("§3On pedestal/In inventory: restores health to player."));

Callback.addCallback("PostLoaded", function(){
if(hard_mode){
	Recipes.addShaped({id: ItemID.soulStone, count: 1, data: 0}, 
	["sss", 
	 "dbd",
	 "sss"],
	["b", 351, 4, "d", BlockID.rmBlock, 0, "s", 348, 0]);
}else{
	Recipes.addShaped({id: ItemID.soulStone, count: 1, data: 0}, 
	["sss", 
	 "dbd",
	 "sss"],
	["b", 351, 4, "d", ItemID.redMatter, 0, "s", 348, 0]);
};
});

Rings.addPedestalFunction(ItemID.soulStone, function(tile){
  if(World.getThreadTime()%5 == 0 && Entity.getHealth(Player.get()) < Entity.getMaxHealth(Player.get())){
    let player = Entity.findNearest({x: tile.x, y: tile.y, z: tile.z}, Player.get(), 11);
    Entity.setHealth(Player.get(), Entity.getHealth(Player.get())+1);
  }
});

Callback.addCallback("tick", function(){
  if(Rings.get(ItemID.bodyStone)){
    if(World.getThreadTime()%10 == 0 && Entity.getHealth(Player.get()) < Entity.getMaxHealth(Player.get())){
      Entity.setHealth(Player.get(), Entity.getHealth(Player.get())+1);
    }
  }
});




// file: rings/harvest ring.js

IDRegistry.genItemID("harvestRing");
Item.createItem("harvestRing", "Ring of harvest goodness", {name: "harvestRing", meta: 0}, {stack: 1});
SetDescription(ItemID.harvestRing, Translation.translate("§3On pedestal/In inventory: instantly growths plants."));

Callback.addCallback("PostLoaded", function(){
if(hard_mode){
	Recipes.addShaped({id: ItemID.harvestRing, count: 1, data: 0}, 
	["sfs", 
	 "dbd",
	 "sfs"],
	["b", ItemID.ironBand, 0, "d", ItemID.redMatter, 0, "s", 6, 0, "f", 38, 0]);
}else{
	Recipes.addShaped({id: ItemID.harvestRing, count: 1, data: 0}, 
	["sfs", 
	 "dbd",
	 "sfs"],
	["b", ItemID.ironBand, 0, "d", ItemID.darkMatter, 0, "s", 6, 0, "f", 38, 0]);
}
});

var PLANT_LIST = {
  141: 7, 142: 7, 244: 7, 59: 7, 127: 3
}

Rings.addRingFunction(ItemID.harvestRing, function(){
  if(World.getThreadTime()%20 == 0){
    for(xx = -4; xx <= 4; xx ++){
      for(zz = -4; zz <= 4; zz ++){
        let block = World.getBlock(Player.getPosition().x+xx, Player.getPosition().y-1, Player.getPosition().z+zz);
        if(PLANT_LIST[block.id]){
          World.setBlock(Player.getPosition().x+xx, Player.getPosition().y-1, Player.getPosition().z+zz, block.id, PLANT_LIST[block.id]);
        }
      }
    }
  }
});

Callback.addCallback("tick", function(){
  if(Rings.get(ItemID.harvestRing)){
    Rings.getRingFunction(ItemID.harvestRing).inv();
  }
});

Rings.addPedestalFunction(ItemID.harvestRing, function(tile){
  if(World.getThreadTime()%10 == 0){
    for(xx = -4; xx <= 4; xx ++){
      for(zz = -4; zz <= 4; zz ++){
        let block = World.getBlock(tile.x+xx, tile.y, tile.z+zz);
        if(PLANT_LIST[block.id]){
          World.setBlock(tile.x+xx, tile.y, tile.z+zz, block.id, PLANT_LIST[block.id]);
        }
      }
    }
  }
});




// file: rings/zero.js

IDRegistry.genItemID("ringZero");
Item.createItem("ringZero", "Ring of Zero", {name: "ringZero", meta: 0}, {stack: 1});
SetDescription(ItemID.ringZero, Translation.translate("§3On pedestal: harm nearest hostle creature.\n§3On pedestal/In inventory: Freezes water\n§4Inactive"));

IDRegistry.genItemID("ringZeroActivated");
Item.createItem("ringZeroActivated", "Ring of Zero", {name: "ringZero", meta: 1}, {stack: 1, isTech: true});
SetDescription(ItemID.ringZeroActivated, Translation.translate("§3On pedestal: harm nearest hostle creature.\n§3On pedestal/In inventory: Freezes water\n§2Active"));

Callback.addCallback("PostLoaded", function(){
if(hard_mode){
	Recipes.addShaped({id: ItemID.ringZero, count: 1, data: 0}, 
	["sas", 
	 "dbd",
	 "sas"],
	["b", ItemID.ironBand, 0, "d", ItemID.redMatter, 0, "s", 80, 0, "a", 332, 0]);
}else{
	Recipes.addShaped({id: ItemID.ringZero, count: 1, data: 0}, 
	["sas", 
	 "dbd",
	 "sas"],
	["b", ItemID.ironBand, 0, "d", ItemID.darkMatter, 0, "s", 80, 0, "a", 332, 0]);
}
});

Rings.activateRing(ItemID.ringZero, ItemID.ringZeroActivated, true);

var ringzero=function(tile){
  if(Math.random()<1/20){
    for(i in evilList){
      let entity = Entity.findNearest({x: tile.x, y: tile.y, z: tile.z}, evilList[i], 20);
      if(entity){
        Entity.damageEntity(entity, 7);
        break;
      };
    };
    for(xx = -4; xx <= 4; xx ++){
      for(zz = -4; zz <= 4; zz ++){
        if(World.getBlock(tile.x+xx, tile.y, tile.z+zz).id == 0){
          let block = World.getBlock(tile.x+xx, tile.y-2, tile.z+zz);
          if(block.id == 9 && block.data == 0){
            World.setBlock(tile.x+xx, tile.y-1, tile.z+zz, 79, 0);
          }
        }
      }
    };
  }
};

Rings.addPedestalFunction(ItemID.ringZero, ringzero);
Rings.addPedestalFunction(ItemID.ringZeroActivated, ringzero);

Rings.addRingFunction(ItemID.ringZeroActivated, function(){
  let tile = Player.getPosition();
  if(Math.random()<1/5){
    for(xx = -2; xx <= 2; xx ++){
      for(zz = -2; zz <= 2; zz ++){
        if(World.getBlock(tile.x+xx, tile.y-1, tile.z+zz).id == 0){
          let block = World.getBlock(tile.x+xx, tile.y-2, tile.z+zz);
          if(block.id == 9 && block.data == 0){
            World.setBlock(tile.x+xx, tile.y-2, tile.z+zz, 79, 0);
          }
        }
      }
    }
  }
});

Callback.addCallback("tick", function(){
  if(Rings.get(ItemID.ringZeroActivated)){
    Rings.getRingFunction(ItemID.ringZeroActivated).inv();
  }
});




// file: rings/swift.js

IDRegistry.genItemID("swiftWolfRendingGale");
Item.createItem("swiftWolfRendingGale", "Swift Wolf's Rending Gale", {name: "swiftWolfRendingGale", meta: 0}, {stack: 1});
SetDescription(ItemID.swiftWolfRendingGale, Translation.translate("§3On pedestal: shoots ligthning into nearest hostle creature.\n§3In inventory: allow players to fly."));

Callback.addCallback("PostLoaded", function(){
if(hard_mode){
	Recipes.addShaped({id: ItemID.swiftWolfRendingGale, count: 1, data: 0}, 
	["sfs", 
	 "fbf",
	 "sfs"],
	["b", ItemID.ironBand, 0, "f", ItemID.redMatter, 0, "s", 288, 0]);
}else{
	Recipes.addShaped({id: ItemID.swiftWolfRendingGale, count: 1, data: 0}, 
	["sfs", 
	 "fbf",
	 "sfs"],
	["b", ItemID.ironBand, 0, "f", ItemID.darkMatter, 0, "s", 288, 0]);
}
});

Rings.addPedestalFunction(ItemID.swiftWolfRendingGale, function(tile){
  if(Math.random()<1/15){
    for(i in evilList){
      let entity = Entity.findNearest({x: tile.x, y: tile.y, z: tile.z}, evilList[i], 20);
      if(entity){
        let crd = Entity.getPosition(entity);
        Entity.spawn(crd.x, crd.y, crd.z, 93);
        Entity.damageEntity(entity, 8);
      }
    }
  }
});

var swift_fly=false;
Callback.addCallback("tick", function(){
  if(Rings.get(ItemID.swiftWolfRendingGale)){
   if(!swift_fly){swift_fly=true};
   Player.setFlyingEnabled(true);
  }else if(swift_fly&&Game.getGameMode()!==1){
    swift_fly=false;
    Player.setFlyingEnabled(false);
    Player.setFlying(false);
  };
});




// file: rings/amulets.js

IDRegistry.genItemID("evertideAmulet");
Item.createItem("evertideAmulet", "Evertide Amulet", {name: "evertideAmulet", meta: 0}, {stack: 1});
SetDescription(ItemID.evertideAmulet, Translation.translate("§3In inventory: allow you to walk on the water.\n§3On pedestal: make the weather rainy.\n§3Be used: place a block of water."));

IDRegistry.genItemID("vulcaniteAmulet");
Item.createItem("vulcaniteAmulet", "Vulcanite Amulet", {name: "vulcaniteAmulet", meta: 0}, {stack: 1});
SetDescription(ItemID.vulcaniteAmulet, Translation.translate("§3In inventory: allow you to walk on the lava.\n§3On pedestal: make the weather clear.\n§3Be used: place a block of lava."));

Callback.addCallback("PostLoaded", function (){
if(hard_mode){
	  Recipes.addShaped({id: ItemID.evertideAmulet, count: 1, data: 0}, 
	     ["www", 
	      "mmm",
	      "www"],
	    ["w", 325, 8, "m", ItemID.redMatter, 0]);
	  if(VanillaItemID) Recipes.addShaped({id: ItemID.evertideAmulet, count: 1, data: 0}, 
	     ["www", 
	      "mmm",
	      "www"],
	    ["w", VanillaItemID.water_bucket, 0, "m", ItemID.redMatter, 0]);
	  
	  Recipes.addShaped({id: ItemID.vulcaniteAmulet, count: 1, data: 0}, 
	     ["www", 
	      "mmm",
	      "www"],
	    ["w", 325, 10, "m", ItemID.redMatter, 0]);
	  if(VanillaItemID) Recipes.addShaped({id: ItemID.vulcaniteAmulet, count: 1, data: 0}, 
	     ["www", 
	      "mmm",
	      "www"],
	    ["w", VanillaItemID.lava_bucket, 0, "m", ItemID.redMatter, 0]);
	}else{
	  Recipes.addShaped({id: ItemID.evertideAmulet, count: 1, data: 0}, 
	     ["www", 
	      "mmm",
	      "www"],
	    ["w", 325, 8, "m", ItemID.darkMatter, 0]);
	  if(VanillaItemID) Recipes.addShaped({id: ItemID.evertideAmulet, count: 1, data: 0}, 
	     ["www", 
	      "mmm",
	      "www"],
	    ["w", VanillaItemID.water_bucket, 0, "m", ItemID.darkMatter, 0]);
	  
	  Recipes.addShaped({id: ItemID.vulcaniteAmulet, count: 1, data: 0}, 
	     ["www", 
	      "mmm",
	      "www"],
	    ["w", 325, 10, "m", ItemID.darkMatter, 0]);
	  if(VanillaItemID) Recipes.addShaped({id: ItemID.vulcaniteAmulet, count: 1, data: 0}, 
	     ["www", 
	      "mmm",
	      "www"],
	    ["w", VanillaItemID.lava_bucket, 0, "m", ItemID.darkMatter, 0]);
	};
});

Item.registerUseFunction("evertideAmulet", function (crd, i, b){
  var c = crd.relative;
  if(World.getBlockID(c.x, c.y, c.z) == 0 || World.getBlockID(c.x, c.y, c.z) == 8 || World.getBlockID(c.x, c.y, c.z) == 9){
    World.setBlock(c.x, c.y, c.z, 8, 0);
  }
});

Item.registerUseFunction("vulcaniteAmulet", function (crd, i, b){
  var c = crd.relative;
  if(World.getBlockID(c.x, c.y, c.z) == 0 || World.getBlockID(c.x, c.y, c.z) == 10 || World.getBlockID(c.x, c.y, c.z) == 11){
    World.setBlock(c.x, c.y, c.z, 10, 0);
  }
});

Rings.float(8, function(){return Rings.get(ItemID.evertideAmulet)});
Rings.float(9, function(){return Rings.get(ItemID.evertideAmulet)});
Callback.addCallback("tick", function(){
  if(Rings.get(ItemID.evertideAmulet)){
    let p=Player.getPosition();
    if(World.getBlockID(p.x, p.y, p.z) == 9){
      Entity.addEffect(Player.get(), 13, 0, 160, false, false);
    }
  }
});
Rings.addPedestalFunction(ItemID.evertideAmulet, function(tile, coords){
World.setWeather({rain: 10});
tile.data.active=false;
});

Rings.float(10, function(){return Rings.get(ItemID.vulcaniteAmulet)});
Rings.float(11, function(){return Rings.get(ItemID.vulcaniteAmulet)});
Callback.addCallback("tick", function(){
  if(Rings.get(ItemID.vulcaniteAmulet)){
    Entity.setFire(Player.get(), 0);
    Entity.addEffect(Player.get(), 12, 0, 160, false, false);
  }
});
Rings.addPedestalFunction(ItemID.vulcaniteAmulet, function(tile, coords){
World.setWeather({rain: 0});
tile.data.active=false;
});




// file: tablet/learner.js

var TABLET_ITEMS = [], TABLET_LIST = {}, TABLET_EMC = 0, TABLET_PAGE = 0, TABLET_CONTAINER = new UI.Container();

Saver.addSavesScope("EE2Tablet",
function read(scope){
  TABLET_ITEMS = [];
  TABLET_LIST = {};
  TABLET_EMC = 0;
  TABLET_PAGE = 0;
  TABLET_CONTAINER = new UI.Container();
  
  if(scope && scope.items && scope.learned){
    for(i in scope.items){
      TABLET_ITEMS.push(scope.items[i]);
    }
	TABLET_LIST = scope.learned;
	TABLET_EMC = Number(scope.emc);
	TABLET_CONTAINER = scope.cont;
  }
},
function save(){
  return {
    items: TABLET_ITEMS,
    learned: TABLET_LIST,
    emc: String(TABLET_EMC),
    cont: TABLET_CONTAINER
  };
});




// file: tablet/main.js

IDRegistry.genBlockID("transmutationTablet");
Block.createBlock("transmutationTablet", [
    {name: "Transmutation Table", texture: [
        ["table_bottom",0], ["table_top",0], ["table_side",0],
    ], inCreative: __config__.getBool("物品方块.转换桌")}
], Block.createSpecialType({base: 1, renderlayer: 3}));
(function SetTablet(id){
	Block.setBlockShape(id, {x: 0, y: 0, z: 0}, {x: 1, y: 1/4, z: 1}, 0);
	var render = new ICRender.Model();
	var model = BlockRenderer.createModel();
	model.addBox(0, 0, 0, 1, 1/4, 1, id, 0);
	render.addEntry(model);
	BlockRenderer.setStaticICRender(id, 0, render);
})(BlockID.transmutationTablet);


Callback.addCallback("PostLoaded", function(){
if(__config__.getBool("物品方块.转换桌")){
	if(hard_mode){
		Recipes.addShaped({id: BlockID.transmutationTablet, count: 1, data: 0}, 
		["kpk", 
		 "rcr",
		 "ddd"],
		["k", ItemID.kleinStar5, 0, "p", ItemID.philosophersStone, 0, "d", BlockID.rmBlock, 0,
		    "r", BlockID.antimatterRelay3, 0, "c", BlockID.energyCondenser2, 0],
		function(api, field, result){
			for (var i in field) if(field[i].id != ItemID.philosophersStone) api.decreaseFieldSlot(i);
		});
		// 24576*512+(466944*4)*3+(681281+24576*42-32*6)*2+(9741339+681281+24576*106-32*6-139264*4*2)=33526174

		Recipes.addShaped({id: ItemID.transmute_tablet, count: 1, data: 0}, 
		["ddd", 
		 "ktk",
		 "ddd"],
		["d", BlockID.rmBlock, 0, "k", ItemID.kleinStar6, 0, "t", BlockID.transmutationTablet, 0]);
		// 24576*2048+(466944*4)*6+33526174=95064478
	}else{
		Recipes.addShapeless({id: BlockID.transmutationTablet, count: 1, data: 0}, [
			{id: 49, data: 0}, {id: 1, data: 0}, {id: 49, data: 0}, 
			{id: 1, data: 0}, {id: ItemID.philosophersStone, data: 0}, {id: 1, data: 0}, 
			{id: 49, data: 0}, {id: 1, data: 0}, {id: 49, data: 0}
		], function(api, field, result){
			for (var i in field) if(field[i].id != ItemID.philosophersStone) api.decreaseFieldSlot(i);
		});

		Recipes.addShaped({id: ItemID.transmute_tablet, count: 1, data: 0}, 
		["odo", 
		 "dcd",
		 "odo"],
		["o", BlockID.dmBlock, 0, "d", 1, 0, "c", BlockID.transmutationTablet, 0]);
	}
}
});


TABLET_ITEMS2 = [];
var tablet_search = false;
var TABLET_PAGE_max = 0;
var Tablet_slot = function(x, y, num){
	return {
	    type: "slot",
	    bitmap: "nothing",
	    isTransparentBackground: true,
	    visual: true,
	    x: x,
	    y: y,
	    clicker: {
	        onClick: function(container, tile) {
	            let slot = container.getSlot("learn"+String(num));
	            if (TABLET_EMC >= System.getValue(slot.id, slot.data)) {
	                TABLET_EMC -= System.getValue(slot.id, slot.data);
	                Player.addItemToInventory(slot.id, 1, slot.data);
	            }
	        },
	        onLongClick: function(container, tile) {
	            let slot = container.getSlot("learn"+String(num));
	            if (TABLET_EMC >= System.getValue(slot.id, slot.data) * Item.getMaxStack(slot.id, slot.data)) {
	                TABLET_EMC -= System.getValue(slot.id, slot.data) * Item.getMaxStack(slot.id, slot.data);
	                Player.addItemToInventory(slot.id, Item.getMaxStack(slot.id, slot.data), slot.data);
	            } else if (TABLET_EMC >= System.getValue(slot.id, slot.data)) {
	                var count = Math.floor(TABLET_EMC / System.getValue(slot.id, slot.data));
	                TABLET_EMC -= System.getValue(slot.id, slot.data) * count;
	                Player.addItemToInventory(slot.id, count, slot.data);
	            }
	        }
	    }
	};
};

//(   ,   ),(500, 80),(560, 80),(620, 80),(   ,   )
//(440,140),(   ,   ),(   ,   ),(   ,   ),(680,140)
//(440,200),(   ,   ),(560,200),(   ,   ),(680,200)
//(440,260),(   ,   ),(   ,   ),(   ,   ),(680,260)
//(   ,   ),(500,320),(560,320),(620,320),(   ,   )

var tabletUI = new UI.StandartWindow({
    standart: {
        header: {text: {text: Translation.translate("Transmutation tablet")}},
        inventory: {standart: true},
        background: {standart: true},
        minHeight: 1000/16*9*1.5-500/屏幕长宽比-90
    },
    elements: {
        "burn": {type: "slot", x: 550, y: 420, bitmap: "burn"},
        "learn0": Tablet_slot(560, 200, 0),
        "learn1": Tablet_slot(500, 80, 1),
        "learn2": Tablet_slot(560, 80, 2),
        "learn3": Tablet_slot(620, 80, 3),
        "learn4": Tablet_slot(680, 140, 4),
        "learn5": Tablet_slot(680, 200, 5),
        "learn6": Tablet_slot(680, 260, 6),
        "learn7": Tablet_slot(620, 320, 7),
        "learn8": Tablet_slot(560, 320, 8),
        "learn9": Tablet_slot(500, 320, 9),
        "learn10": Tablet_slot(440, 260, 10),
        "learn11": Tablet_slot(440, 200, 11),
        "learn12": Tablet_slot(440, 140, 12),
        "charge": {type: "slot", x: 750, y: 80, bitmap: "starCharge"},
        "uncharge": {type: "slot", x: 750, y: 140, bitmap: "unstarCharge" },
        "text": {type: "text", x: 325, y: 35, width: 50, height: 15, text: "EMC"},
        "buttonNxt": {type: "button", x: 610, y: 420, bitmap: "btnNext0", scale: 3.2,
            clicker: {
                onClick: function(container, tile) {
                    if (TABLET_PAGE < TABLET_PAGE_max - 1) {
                        TABLET_PAGE++
                    } else TABLET_PAGE = 0;
                }
            }
        },
        "text_page": {type: "text", x: 550, y: 380, width: 100, height: 30, text: Translation.translate("Page: ") + "0/1"},
        "buttonBck": {type: "button", x: 490, y: 420, bitmap: "btnPrev0", scale: 3.2,
            clicker: {
                onClick: function(container, tile) {
                    if (TABLET_PAGE > 0) {
                        TABLET_PAGE--
                    } else TABLET_PAGE = TABLET_PAGE_max - 1;
                }
            }
        },
        "search": {type: "button", x: 700, y: 30, bitmap: "search", scale: 2.0,
            clicker: {
                onClick: function(container, tile) {
                    if (!tablet_search) {
                        tablet_search = true;
                        TABLET_PAGE = 0;
                    } else if (tablet_search) {
                        tablet_search = false;
                        TABLET_PAGE = 0;
                    }
                }
            }
        },
        "textSearch": {type: "text", x: 750, y: 35, z: 1, text: Translation.translate("Search"),
            font: {color: android.graphics.Color.WHITE, size: 20}},
        "TABLET_search": {type: "text", x: 325, y: 55, text: Translation.translate("Search mode: "),
            font: {color: android.graphics.Color.RED, size: 20}},
        "buttonSearch": {type: "button", x: 740, y: 30, scale: 3.2, bitmap: "textBox",
            clicker: {
                onClick: function() {
                    TABLET_ITEMS2 = [];
                    UI.getContext()
                        .runOnUiThread(new java.lang.Runnable({
                        run: function() {
                            try {
                                const editText = new android.widget.EditText(UI.getContext());
                                editText.setHint(Translation.translate("Text"));
                                new android.app.AlertDialog.Builder(UI.getContext())
                                    .setTitle(Translation.translate("Please enter what to search for"))
                                    .setView(editText)
                                    .setPositiveButton(Translation.translate("Search"), new android.content.DialogInterface.OnClickListener() {
                                    onClick: function() {
                                        const keyword = editText.getText() + "";
                                        tabletUI.elements.get("textSearch")
                                            .onBindingUpdated("text", keyword.length ? keyword : Translation.translate("Search"));
                                        if (keyword) {
                                            for (let i in TABLET_ITEMS) {
                                                if (Item.getName(TABLET_ITEMS[i].id, TABLET_ITEMS[i].data)
                                                    .match(new RegExp(keyword, "i")) || Number(keyword) == TABLET_ITEMS[i].id) {
                                                    TABLET_ITEMS2.push({
                                                        id: TABLET_ITEMS[i].id,
                                                        data: TABLET_ITEMS[i].data
                                                    })
                                                }
                                            };
                                        };
                                        if (tablet_search) TABLET_PAGE = 0;
                                    }
                                })
                                    .show();
                            } catch (e) {}
                        }
                    }));
                }
            }
        },
    }
});


TileEntity.registerPrototype(BlockID.transmutationTablet, {
  getGuiScreen: function(){
    return tabletUI;
  },
  init: function (){
    this.container = TABLET_CONTAINER;
  },
  tick: function(){
      let content = this.container.getGuiContent();
      if(!content) for(i = 0; i <= 12; i ++){
          this.container.setSlot("learn"+i, 0, 0, 0);
      }
  },
  destroy: function(){
    this.container = new UI.Container();
  }
});

IDRegistry.genItemID("transmute_tablet");
Item.createItem("transmute_tablet", "Transmute tablet", {name: "transmute_tablet"}, {stack: 1, isTech: !__config__.getBool("物品方块.转换桌")});


Item.registerUseFunction("transmute_tablet", function(c, b, i){
	TABLET_CONTAINER.openAs(tabletUI);
});

Callback.addCallback("tick", function (){
	if(TABLET_CONTAINER.isOpened()){
		if(!tablet_search){TABLET_PAGE_max = Math.ceil(TABLET_ITEMS.length/13) || 1} else
		if(tablet_search){TABLET_PAGE_max = Math.ceil(TABLET_ITEMS2.length/13) || 1};
		container = TABLET_CONTAINER;
		container.setText("text", "EMC: "+TABLET_EMC);
		container.setText("text_page", Translation.translate("Page: ")+(TABLET_PAGE+1)+"/"+TABLET_PAGE_max);
		container.setText("TABLET_search", Translation.translate("Search mode: ")+Translation.translate(String(tablet_search)));
		let slotBurn = container.getSlot("burn");
		let value = System.getValue(slotBurn.id, slotBurn.data);
		
		if(slotBurn.id == ItemID.tomeKnowledge){
			System.getAllKnowledge();
		};
		
		if(value && !System.isEnchanted(slotBurn)){
			if(!TABLET_LIST[slotBurn.id+":"+slotBurn.data]){
				TABLET_LIST[slotBurn.id+":"+slotBurn.data] = true;
				TABLET_ITEMS.push({id: slotBurn.id, data: slotBurn.data});
				alert(Translation.translate("Learned!"));
			}
			
			TABLET_EMC += value*slotBurn.count;
			slotBurn.count -= slotBurn.count;
			container.validateAll();
		}
		
		try{
			if(!tablet_search){
				if(TABLET_ITEMS[0]) for(i = 0; i <= 12; i ++){
					if(TABLET_ITEMS[13*TABLET_PAGE+i]){
						container.setSlot("learn"+i, TABLET_ITEMS[13*TABLET_PAGE+i].id, 1, TABLET_ITEMS[13*TABLET_PAGE+i].data);
					}else if(!TABLET_ITEMS[13*TABLET_PAGE+i]){
						container.setSlot("learn"+i, 0, 1, 0);
					}
				}
			}else if(TABLET_ITEMS2[0]){
				for(i = 0; i <= 12; i ++){
					if(TABLET_ITEMS2[13*TABLET_PAGE+i]){
						container.setSlot("learn"+i, TABLET_ITEMS2[13*TABLET_PAGE+i].id, 1, TABLET_ITEMS2[13*TABLET_PAGE+i].data);
					}else if(!TABLET_ITEMS2[13*TABLET_PAGE+i]){
						container.setSlot("learn"+i, 0, 1, 0);
					}
				}
			}else for(i=0; i<=12; i++) container.setSlot("learn"+i, 0, 1, 0);
		}catch(e){}
	}
System.chargeStar(TABLET_CONTAINER, true);
System.unchargeStar(TABLET_CONTAINER, true);
});


IDRegistry.genItemID("tomeKnowledge");
Item.createItem("tomeKnowledge", "Tome of knowledge", {name: "tomeKnowledge"}, {stack: 1, isTech: !__config__.getBool("物品方块.转换桌")});

Item.registerUseFunction("tomeKnowledge", function (c, item){
System.getAllKnowledge();
});




// file: collector/tier 1.js

Block.createSpecialType({
	destroytime: 2,
	explosionres: 0.5,
	opaque: false,
	lightopacity: 0,
	renderlayer: 3,
	lightlevel: 10
}, "light");

IDRegistry.genBlockID("energyCollector1");
Block.createBlockWithRotation("energyCollector1", [
	 {name: "Energy Collector I", texture: [
	   ["collectorOther",0],
	   ["collectorTop",0],
	   ["collectorOther",0],
	   ["collectorFront",0],
	   ["collectorOther",0],
	   ["collectorOther",0],
  ], inCreative: __config__.getBool("物品方块.能量收集器")}
], "light");
SetDescription(BlockID.energyCollector1, Translation.translate("§3Collect EMC from the brighter air."));

Callback.addCallback("PostLoaded",function(){
if(__config__.getBool("物品方块.能量收集器")){
	if(hard_mode){
		Recipes.addShaped({id: BlockID.energyCollector1, count: 1, data: 0},
		["glg",
		 "kdk",
		 "gfg"],
		['k', ItemID.kleinStar1, 0, 'g', 89, 0, 'd', 57, 0, 'f', 61, 0, 'l', 20, 0]);
	}else{
		Recipes.addShaped({id: BlockID.energyCollector1, count: 1, data: 0},
		["glg",
		 "gdg",
		 "gfg"],
		['g', 89, 0, 'd', 57, 0, 'f', 61, 0, 'l', 20, 0]);
	}
};
});

var collectorUI = new UI.StandartWindow({
	standart: {
		header: {text: {text: Translation.translate("Energy collector")}},
		inventory: {standart: true},
		background: {standart: true},
		minHeight: 1000/16*9*1.5-500/屏幕长宽比-90
	},
	 drawing: [
    {type: "bitmap", x: 485, y: 100, bitmap: "emcBarShort_0", scale: 5},
    {type: "bitmap", x: 600, y: 200, bitmap: "collectorProgress_01", scale: 3.5},
    {type: "bitmap", x: 800, y: 200, bitmap: "collectSun_0", scale: 4},
  ],
        elements: {
        "output0": {type: "slot", x: 350, y: 240},
        "output1": {type: "slot", x: 410, y: 240},
        "output2": {type: "slot", x: 470, y: 240},
        "output3": {type: "slot", x: 530, y: 240},
        "output4": {type: "slot", x: 350, y: 300},
        "output5": {type: "slot", x: 410, y: 300},
        "output6": {type: "slot", x: 470, y: 300},
        "output7": {type: "slot", x: 530, y: 300},
       "input": {type: "slot", x: 700, y: 300},
      "progScale": {type: "scale", x: 600, y: 200, bitmap: "collectorProgress_11", scale: 3.5, direction: 2},
         "charge": {type: "slot", x: 350, y: 100, bitmap: "starCharge"},
       "uncharge": {type: "slot", x: 410, y: 100, bitmap: "unstarCharge" },
      "emcScale": {type: "scale", x: 485, y: 100, bitmap: "emcBarShort_1", scale: 5},
            "Sun": {type: "scale", x: 800, y: 200, bitmap: "collectSun_1", scale: 4},
            "text": {type: "text", x: 325, y: 35, width: 100, height: 30, text: "EMC"}
  	}
});


System.addspeed_up(BlockID.energyCollector1);
TileEntity.registerPrototype(BlockID.energyCollector1, {
  defaultValues: {
    emc: 0, max: __config__.getBool("无存储上限") ? 1e16 : 200000
  },
  times: 1, times2: 1,
  getGuiScreen: function(){
    return collectorUI;
  },
  getTransportSlots: function(){
    var inputC=["input"], outputC=[];
    for(i=0; i<8; i++){outputC.push("output"+i)};
    return {input: inputC, output: outputC};
  },
  tick: function(){
    this.times2=this.times;
    StorageInterface.checkHoppers(this);

    var val,res,light;
    slotInput = this.container.getSlot("input");
    slotOutput = [];
    slotOutput[0] = this.container.getSlot("output0");
    slotOutput[1] = this.container.getSlot("output1");
    slotOutput[2] = this.container.getSlot("output2");
    slotOutput[3] = this.container.getSlot("output3");
    slotOutput[4] = this.container.getSlot("output4");
    slotOutput[5] = this.container.getSlot("output5");
    slotOutput[6] = this.container.getSlot("output6");
    slotOutput[7] = this.container.getSlot("output7");
    
    this.container.setScale("emcScale", this.data.emc/this.data.max);
    this.container.setText("text", "EMC: "+Math.floor(this.data.emc));
    
    light=Math.max(World.getLightLevel(this.x+1, this.y, this.z),World.getLightLevel(this.x, this.y+1, this.z),World.getLightLevel(this.x, this.y, this.z+1),
    World.getLightLevel(this.x-1, this.y, this.z),World.getLightLevel(this.x, this.y-1, this.z),World.getLightLevel(this.x, this.y, this.z-1));
    if(light>=2){
        this.container.setScale("Sun", 1);
      if(this.data.emc <= this.data.max-4*this.times/20){
        this.data.emc=this.data.emc+4*this.times/20;
      } else if(this.data.emc > this.data.max-4*this.times/20 && this.data.emc < this.data.max){this.data.emc=this.data.max}
    } else this.container.setScale("Sun", 0);
    
    System.chargeStar(this.container, this.data);
    System.unchargeStar(this.container, this.data);
    
    if(System.getRecipe(slotInput.id,slotInput.data)){
     res = System.getRecipe(slotInput.id,slotInput.data).id;
     val = System.getRecipe(slotInput.id,slotInput.data).emc;
    };

    if(val && res){
     this.container.setScale("progScale", this.data.emc/val);
    } else	this.container.setScale("progScale", 0);
    
    for(i=0; i<8; i++){
      if(val && res && this.data.emc > val && slotOutput[i].count<Item.getMaxStack(slotOutput[i].id,slotOutput[i].data) &&
        (slotOutput[i].id==0 || (slotOutput[i].id==res && slotOutput[i].data==0 && !slotOutput[i].extra))){
        this.data.emc-=val;
        slotOutput[i].id=res;
        slotOutput[i].count++;
        slotInput.count--;
        this.container.validateAll();
        break;
    }};
    
    for(i=0; i<8; i++){
      if(slotInput.count<64 && System.getCanRecipe(slotOutput[i].id, slotOutput[i].data) && slotOutput[i].id!==0 &&
        (slotInput.id==0 || (slotInput.id==slotOutput[i].id && slotInput.data==slotOutput[i].data && !slotOutput[i].extra))){
        let transfer = Math.min(slotOutput[i].count, 64-slotInput.count);
        slotInput.id=slotOutput[i].id;
        slotInput.data=slotOutput[i].data;
        slotInput.count += transfer;
        slotOutput[i].count -= transfer;
        this.container.validateAll();
        break;
    }};
    
    this.times=1;
  }
});

StorageInterface.createInterface(BlockID.energyCollector1, {
	slots: {
		"input": {input: true},
		"output0": {output: true},
		"output1": {output: true},
		"output2": {output: true},
		"output3": {output: true},
		"output4": {output: true},
		"output5": {output: true},
		"output6": {output: true},
		"output7": {output: true},
	},
	isValidInput: function(item){
		return System.getCanRecipe(item.id, item.data);
	}
});




// file: collector/tier 2.js

IDRegistry.genBlockID("energyCollector2");
Block.createBlockWithRotation("energyCollector2", [
	 {name: "Energy Collector II", texture: [
	   ["collectorOther",0],
	   ["collectorTop",1],
	   ["collectorOther",0],
	   ["collectorFront",0],
	   ["collectorOther",0],
	   ["collectorOther",0],
  ], inCreative: __config__.getBool("物品方块.能量收集器")}
], "light");
SetDescription(BlockID.energyCollector2, Translation.translate("§3Collect EMC from the brighter air."));

Callback.addCallback("PostLoaded",function(){
if(__config__.getBool("物品方块.能量收集器")){
	if(hard_mode){
		Recipes.addShaped({id: BlockID.energyCollector2, count: 1, data: 0}, 
		  ["gmg",
		   "kck",
		   "ggg"],
		  ['k', ItemID.kleinStar2, 0, 'g', 89, 0, 'm', ItemID.darkMatter, 0, 'c', BlockID.energyCollector1, 0]);
	}else{
		Recipes.addShaped({id: BlockID.energyCollector2, count: 1, data: 0}, 
		  ["gmg",
		   "gcg",
		   "ggg"],
		  ['g', 89, 0, 'm', ItemID.darkMatter, 0, 'c', BlockID.energyCollector1, 0]);
	}
};
});

System.addspeed_up(BlockID.energyCollector2);
TileEntity.registerPrototype(BlockID.energyCollector2, {
  defaultValues: {
    emc: 0, max: __config__.getBool("无存储上限") ? 1e16 : 600000
  },
  times: 1, times2: 1,
  getGuiScreen: function(){
    return collectorUI;
  },
  getTransportSlots: function(){
    var inputC=["input"], outputC=[];
    for(i=0; i<8; i++){outputC.push("output"+i)};
    return {input: inputC, output: outputC};
  },
  tick: function(){
    this.times2=this.times;
    StorageInterface.checkHoppers(this);

    var val,res,light;
    slotInput = this.container.getSlot("input");
    slotOutput = [];
    slotOutput[0] = this.container.getSlot("output0");
    slotOutput[1] = this.container.getSlot("output1");
    slotOutput[2] = this.container.getSlot("output2");
    slotOutput[3] = this.container.getSlot("output3");
    slotOutput[4] = this.container.getSlot("output4");
    slotOutput[5] = this.container.getSlot("output5");
    slotOutput[6] = this.container.getSlot("output6");
    slotOutput[7] = this.container.getSlot("output7");
    
    this.container.setScale("emcScale", this.data.emc/this.data.max);
    this.container.setText("text", "EMC: "+Math.floor(this.data.emc));
    
    light=Math.max(World.getLightLevel(this.x+1, this.y, this.z),World.getLightLevel(this.x, this.y+1, this.z),World.getLightLevel(this.x, this.y, this.z+1),
    World.getLightLevel(this.x-1, this.y, this.z),World.getLightLevel(this.x, this.y-1, this.z),World.getLightLevel(this.x, this.y, this.z-1));
    if(light>=6){
        this.container.setScale("Sun", 1);
      if(this.data.emc <= this.data.max-12*this.times/20){
        this.data.emc=this.data.emc+12*this.times/20;
      } else if(this.data.emc > this.data.max-12*this.times/20 && this.data.emc < this.data.max){this.data.emc=this.data.max}
    } else this.container.setScale("Sun", 0);
    
    System.chargeStar(this.container, this.data);
    System.unchargeStar(this.container, this.data);
    
    if(System.getRecipe(slotInput.id,slotInput.data)){
     res = System.getRecipe(slotInput.id,slotInput.data).id;
     val = System.getRecipe(slotInput.id,slotInput.data).emc;
    };

    if(val && res){
     this.container.setScale("progScale", this.data.emc/val);
    } else	this.container.setScale("progScale", 0);
    
    for(i=0; i<8; i++){
      if(val && res && this.data.emc > val && slotOutput[i].count<Item.getMaxStack(slotOutput[i].id,slotOutput[i].data) &&
        (slotOutput[i].id==0 || (slotOutput[i].id==res && slotOutput[i].data==0 && !slotOutput[i].extra))){
        this.data.emc-=val;
        slotOutput[i].id=res;
        slotOutput[i].count++;
        slotInput.count--;
        this.container.validateAll();
        break;
    }};
    
    for(i=0; i<8; i++){
      if(slotInput.count<64 && System.getCanRecipe(slotOutput[i].id, slotOutput[i].data) && slotOutput[i].id!==0 &&
        (slotInput.id==0 || (slotInput.id==slotOutput[i].id && slotInput.data==slotOutput[i].data && !slotOutput[i].extra))){
        let transfer = Math.min(slotOutput[i].count, 64-slotInput.count);
        slotInput.id=slotOutput[i].id;
        slotInput.data=slotOutput[i].data;
        slotInput.count += transfer;
        slotOutput[i].count -= transfer;
        this.container.validateAll();
        break;
    }};
    
    this.times=1;
  }
});

StorageInterface.createInterface(BlockID.energyCollector2, {
	slots: {
		"input": {input: true},
		"output0": {output: true},
		"output1": {output: true},
		"output2": {output: true},
		"output3": {output: true},
		"output4": {output: true},
		"output5": {output: true},
		"output6": {output: true},
		"output7": {output: true},
	},
	isValidInput: function(item){
		return System.getCanRecipe(item.id, item.data);
	}
});




// file: collector/tier 3.js

IDRegistry.genBlockID("energyCollector3");
Block.createBlockWithRotation("energyCollector3", [
	 {name: "Energy Collector III", texture: [
	   ["collectorOther",0],
	   ["collectorTop",2],
	   ["collectorOther",0],
	   ["collectorFront",0],
	   ["collectorOther",0],
	   ["collectorOther",0],
  ], inCreative: __config__.getBool("物品方块.能量收集器")}
], "light");
SetDescription(BlockID.energyCollector3, Translation.translate("§3Collect EMC from the brighter air."));

Callback.addCallback("PostLoaded",function(){
if(__config__.getBool("物品方块.能量收集器")){
	if(hard_mode){
		Recipes.addShaped({id: BlockID.energyCollector3, count: 1, data: 0}, 
		  ["gmg",
		   "kck",
		   "ggg"],
		  ['k', ItemID.kleinStar3, 0, 'g', 89, 0, 'm', ItemID.redMatter, 0, 'c', BlockID.energyCollector2, 0]);
	}else{
		Recipes.addShaped({id: BlockID.energyCollector3, count: 1, data: 0}, 
		  ["gmg",
		   "gcg",
		   "ggg"],
		  ['g', 89, 0, 'm', ItemID.redMatter, 0, 'c', BlockID.energyCollector2, 0]);
	}
};
});

System.addspeed_up(BlockID.energyCollector3);
TileEntity.registerPrototype(BlockID.energyCollector3, {
  defaultValues: {
    emc: 0, max: __config__.getBool("无存储上限") ? 1e16 : 2000000
  },
  times: 1, times2: 1,
  getGuiScreen: function(){
    return collectorUI;
  },
  getTransportSlots: function(){
    var inputC=["input"], outputC=[];
    for(i=0; i<8; i++){outputC.push("output"+i)};
    return {input: inputC, output: outputC};
  },
  tick: function(){
    this.times2=this.times;
    StorageInterface.checkHoppers(this);

    var val,res,light;
    slotInput = this.container.getSlot("input");
    slotOutput = [];
    slotOutput[0] = this.container.getSlot("output0");
    slotOutput[1] = this.container.getSlot("output1");
    slotOutput[2] = this.container.getSlot("output2");
    slotOutput[3] = this.container.getSlot("output3");
    slotOutput[4] = this.container.getSlot("output4");
    slotOutput[5] = this.container.getSlot("output5");
    slotOutput[6] = this.container.getSlot("output6");
    slotOutput[7] = this.container.getSlot("output7");
    
    this.container.setScale("emcScale", this.data.emc/this.data.max);
    this.container.setText("text", "EMC: "+Math.floor(this.data.emc));
    
    light=Math.max(World.getLightLevel(this.x+1, this.y, this.z),World.getLightLevel(this.x, this.y+1, this.z),World.getLightLevel(this.x, this.y, this.z+1),
    World.getLightLevel(this.x-1, this.y, this.z),World.getLightLevel(this.x, this.y-1, this.z),World.getLightLevel(this.x, this.y, this.z-1));
    if(light>=12){
        this.container.setScale("Sun", 1);
      if(this.data.emc <= this.data.max-40*this.times/20){
        this.data.emc=this.data.emc+40*this.times/20;
      } else if(this.data.emc > this.data.max-40*this.times/20 && this.data.emc < this.data.max){this.data.emc=this.data.max}
    } else this.container.setScale("Sun", 0);
    
    System.chargeStar(this.container, this.data);
    System.unchargeStar(this.container, this.data);
    
    if(System.getRecipe(slotInput.id,slotInput.data)){
     res = System.getRecipe(slotInput.id,slotInput.data).id;
     val = System.getRecipe(slotInput.id,slotInput.data).emc;
    };

    if(val && res){
     this.container.setScale("progScale", this.data.emc/val);
    } else	this.container.setScale("progScale", 0);
    
    for(i=0; i<8; i++){
      if(val && res && this.data.emc > val && slotOutput[i].count<Item.getMaxStack(slotOutput[i].id,slotOutput[i].data) &&
        (slotOutput[i].id==0 || (slotOutput[i].id==res && slotOutput[i].data==0 && !slotOutput[i].extra))){
        this.data.emc-=val;
        slotOutput[i].id=res;
        slotOutput[i].count++;
        slotInput.count--;
        this.container.validateAll();
        break;
    }};
    
    for(i=0; i<8; i++){
      if(slotInput.count<64 && System.getCanRecipe(slotOutput[i].id, slotOutput[i].data) && slotOutput[i].id!==0 &&
        (slotInput.id==0 || (slotInput.id==slotOutput[i].id && slotInput.data==slotOutput[i].data && !slotOutput[i].extra))){
        let transfer = Math.min(slotOutput[i].count, 64-slotInput.count);
        slotInput.id=slotOutput[i].id;
        slotInput.data=slotOutput[i].data;
        slotInput.count += transfer;
        slotOutput[i].count -= transfer;
        this.container.validateAll();
        break;
    }};
    
    this.times=1;
  }
});

StorageInterface.createInterface(BlockID.energyCollector3, {
	slots: {
		"input": {input: true},
		"output0": {output: true},
		"output1": {output: true},
		"output2": {output: true},
		"output3": {output: true},
		"output4": {output: true},
		"output5": {output: true},
		"output6": {output: true},
		"output7": {output: true},
	},
	isValidInput: function(item){
		return System.getCanRecipe(item.id, item.data);
	}
});




// file: relay/tier 1.js

IDRegistry.genBlockID("antimatterRelay1");
Block.createBlockWithRotation("antimatterRelay1", [{
    name: "Anti-matter Relay I",
    texture: [
        ["relayOther", 0],
        ["relayTop", 0],
        ["relayOther", 0],
        ["relayFront", 0],
        ["relayOther", 0],
        ["relayOther", 0],
    ],
    inCreative: true
}], "opaque");
SetDescription(BlockID.antimatterRelay1, Translation.translate("§3Convert the items you put into it into EMC.")+"\n"+
    Translation.translate("§3Draw the EMC from the adjacent energy collector."));

var relayUI = new UI.StandartWindow({
    standart: {
        header: {text: {text: Translation.translate("Anti-matter relay")}},
        inventory: {standart: true},
        background: {standart: true},
        minHeight: 1000/16*9*1.5-500/屏幕长宽比-90
    },
    drawing: [{type: "bitmap", x: 485, y: 100, bitmap: "emcBarShort_0", scale: 5}],
    elements: {
        "input0": {type: "slot", x: 400, y: 200},
        "input1": {type: "slot", x: 460, y: 200},
        "input2": {type: "slot", x: 520, y: 200},
        "input3": {type: "slot", x: 580, y: 200},
        "input4": {type: "slot", x: 640, y: 200},
        "input5": {type: "slot", x: 700, y: 200},
        "input6": {type: "slot", x: 760, y: 200},
        "input7": {type: "slot", x: 820, y: 200},
        "input8": {type: "slot", x: 400, y: 260},
        "input9": {type: "slot", x: 460, y: 260},
        "input10": {type: "slot", x: 520, y: 260},
        "input11": {type: "slot", x: 580, y: 260},
        "input12": {type: "slot", x: 640, y: 260},
        "input13": {type: "slot", x: 700, y: 260},
        "input14": {type: "slot", x: 760, y: 260},
        "input15": {type: "slot", x: 820, y: 260},
        "input16": {type: "slot", x: 400, y: 320},
        "input17": {type: "slot", x: 460, y: 320},
        "input18": {type: "slot", x: 520, y: 320},
        "input19": {type: "slot", x: 580, y: 320},
        "input20": {type: "slot", x: 640, y: 320},
        "input21": {type: "slot", x: 700, y: 320},
        "input22": {type: "slot", x: 760, y: 320},
        "input23": {type: "slot", x: 820, y: 320},
        "input24": {type: "slot", x: 400, y: 380},
        "input25": {type: "slot", x: 460, y: 380},
        "input26": {type: "slot", x: 520, y: 380},
        "input27": {type: "slot", x: 580, y: 380},
        "input28": {type: "slot", x: 640, y: 380},
        "input29": {type: "slot", x: 700, y: 380},
        "input30": {type: "slot", x: 760, y: 380},
        "input31": {type: "slot", x: 820, y: 380},
        "progScale": { type: "scale", x: 750, y: 200, bitmap: "relayProgress_1", scale: 3.5, direction: 1 },
        "charge": { type: "slot", x: 350, y: 100, bitmap: "starCharge" },
        "uncharge": { type: "slot", x: 410, y: 100, bitmap: "unstarCharge" },
        "emcScale": { type: "scale", x: 485, y: 100, bitmap: "emcBarShort_1", scale: 5 },
        "text": { type: "text", x: 325, y: 35, width: 100, height: 30, text: "EMC" }
    }
});


Callback.addCallback("PostLoaded", function() {
if(hard_mode){
	Recipes.addShaped({ id: BlockID.antimatterRelay1, count: 1, data: 0 },
	["odo",
	 "kfk",
	 "ooo"],
	["k", ItemID.kleinStar1, 0, "o", 49, 0, "f", 61, 0, "d", 57, 0]);
}else{
	Recipes.addShaped({ id: BlockID.antimatterRelay1, count: 1, data: 0 },
	["odo",
	 "ofo",
	 "ooo"],
	["o", 49, 0, "f", 61, 0, "d", 57, 0]);
}
});


System.addspeed_up(BlockID.antimatterRelay1);
TileEntity.registerPrototype(BlockID.antimatterRelay1, {
    defaultValues: {emc: 0, max: __config__.getBool("无存储上限") ? 1e16 : 300000 },
    getGuiScreen: function() { return relayUI; },
    emc_out: 8/20, times: 1, times2: 1,
    getTransportSlots: function(){
      let inputC = [];
      let outputC = [];
      for(i=0;i<32;i++){inputC.push("input"+i)};
      return {input: inputC, output: outputC};
    },
    tick: function(){
      this.times2=this.times;
      StorageInterface.checkHoppers(this);

      var ths=this;
      var coords={x: this.x, y: this.y, z: this.z};

      for(i = 0; i < 32; i++){
        let slotBurn = this.container.getSlot("input" + i);
        let value = System.getValue(slotBurn.id, slotBurn.data);
        while(value && this.data.emc+(value||0)<=this.data.max){
          this.data.emc += value;
          slotBurn.count--;
          this.container.validateAll();
          value = System.getValue(slotBurn.id, slotBurn.data);
        }
      };

      this.container.setScale("emcScale", this.data.emc / this.data.max);
      this.container.setText("text", "EMC: "+Math.floor(this.data.emc));
      System.chargeStar(this.container, this.data);
      System.unchargeStar(this.container, this.data);

      DIRS.map(function(dir){
        let tile = World.getTileEntity(coords.x+dir.x, coords.y+dir.y, coords.z+dir.z);
        let block = World.getBlock(coords.x+dir.x, coords.y+dir.y, coords.z+dir.z);
        if(block.id==BlockID.energyCollector1 || block.id==BlockID.energyCollector2 || block.id==BlockID.energyCollector3){
          System.transfer(ths, tile);
        };
      })

      this.times=1;
    }
});

StorageInterface.createInterface(BlockID.antimatterRelay1, {
	slots: {
		"input0": {input: true},
		"input1": {input: true},
		"input2": {input: true},
		"input3": {input: true},
		"input4": {input: true},
		"input5": {input: true},
		"input6": {input: true},
		"input7": {input: true},
		"input8": {input: true},
		"input9": {input: true},
		"input10": {input: true},
		"input11": {input: true},
		"input12": {input: true},
		"input13": {input: true},
		"input14": {input: true},
		"input15": {input: true},
		"input16": {input: true},
		"input17": {input: true},
		"input18": {input: true},
		"input19": {input: true},
		"input20": {input: true},
		"input21": {input: true},
		"input22": {input: true},
		"input23": {input: true},
		"input24": {input: true},
		"input25": {input: true},
		"input26": {input: true},
		"input27": {input: true},
		"input28": {input: true},
		"input29": {input: true},
		"input30": {input: true},
		"input31": {input: true},
	},
	isValidInput: function(item){
		return System.getValue(item.id, item.data);
	}
});




// file: relay/tier 2.js

IDRegistry.genBlockID("antimatterRelay2");
Block.createBlockWithRotation("antimatterRelay2", [
	 {name: "Anti-matter Relay II", texture: [
	   ["relayOther",0],
	   ["relayTop",1],
	   ["relayOther",0],
	   ["relayFront",0],
	   ["relayOther",0],
	   ["relayOther",0],
  ],inCreative: true}
], "opaque");
SetDescription(BlockID.antimatterRelay2, Translation.translate("§3Convert the items you put into it into EMC.")+"\n"+
    Translation.translate("§3Draw the EMC from the adjacent energy collector."));

Callback.addCallback("PostLoaded",function(){
if(hard_mode){
	Recipes.addShaped({id: BlockID.antimatterRelay2, count: 1, data: 0}, 
	["odo", 
	 "kfk",
	 "ooo"],
	["k", ItemID.kleinStar2, 0, "o", 49, 0, "f", BlockID.antimatterRelay1, 0, "d", ItemID.darkMatter, 0]);
}else{
	Recipes.addShaped({id: BlockID.antimatterRelay2, count: 1, data: 0}, 
	["odo", 
	 "ofo",
	 "ooo"],
	["o", 49, 0, "f", BlockID.antimatterRelay1, 0, "d", ItemID.darkMatter, 0]);
}
});

System.addspeed_up(BlockID.antimatterRelay2);
TileEntity.registerPrototype(BlockID.antimatterRelay2, {
    defaultValues: {emc: 0, max: __config__.getBool("无存储上限") ? 1e16 : 1200000 },
    getGuiScreen: function() { return relayUI; },
    emc_out: 36/20, times: 1, times2: 1,
    getTransportSlots: function(){
      let inputC = [];
      let outputC = [];
      for(i=0;i<32;i++){inputC.push("input"+i)};
      return {input: inputC, output: outputC};
    },
    tick: function(){
      this.times2=this.times;
      StorageInterface.checkHoppers(this);

      var ths=this;
      var coords={x: this.x, y: this.y, z: this.z};

      for(i = 0; i < 32; i++){
        let slotBurn = this.container.getSlot("input" + i);
        let value = System.getValue(slotBurn.id, slotBurn.data);
        while(value && this.data.emc+(value||0)<=this.data.max){
          this.data.emc += value;
          slotBurn.count--;
          this.container.validateAll();
          value = System.getValue(slotBurn.id, slotBurn.data);
        }
      };

      this.container.setScale("emcScale", this.data.emc / this.data.max);
      this.container.setText("text", "EMC: "+Math.floor(this.data.emc));
      System.chargeStar(this.container, this.data);
      System.unchargeStar(this.container, this.data);

      DIRS.map(function(dir){
        let tile = World.getTileEntity(coords.x+dir.x, coords.y+dir.y, coords.z+dir.z);
        let block = World.getBlock(coords.x+dir.x, coords.y+dir.y, coords.z+dir.z);
        if(block.id==BlockID.energyCollector1 || block.id==BlockID.energyCollector2 || block.id==BlockID.energyCollector3){
          System.transfer(ths, tile);
        };
      })

      this.times=1;
    }
});

StorageInterface.createInterface(BlockID.antimatterRelay2, {
	slots: {
		"input0": {input: true},
		"input1": {input: true},
		"input2": {input: true},
		"input3": {input: true},
		"input4": {input: true},
		"input5": {input: true},
		"input6": {input: true},
		"input7": {input: true},
		"input8": {input: true},
		"input9": {input: true},
		"input10": {input: true},
		"input11": {input: true},
		"input12": {input: true},
		"input13": {input: true},
		"input14": {input: true},
		"input15": {input: true},
		"input16": {input: true},
		"input17": {input: true},
		"input18": {input: true},
		"input19": {input: true},
		"input20": {input: true},
		"input21": {input: true},
		"input22": {input: true},
		"input23": {input: true},
		"input24": {input: true},
		"input25": {input: true},
		"input26": {input: true},
		"input27": {input: true},
		"input28": {input: true},
		"input29": {input: true},
		"input30": {input: true},
		"input31": {input: true},
	},
	isValidInput: function(item){
		return System.getValue(item.id, item.data);
	}
});




// file: relay/tier 3.js

IDRegistry.genBlockID("antimatterRelay3");
Block.createBlockWithRotation("antimatterRelay3", [
	 {name: "Anti-matter Relay III", texture: [
	   ["relayOther",0],
	   ["relayTop",2],
	   ["relayOther",0],
	   ["relayFront",0],
	   ["relayOther",0],
	   ["relayOther",0],
  ],inCreative: true}
], "opaque");
SetDescription(BlockID.antimatterRelay3, Translation.translate("§3Convert the items you put into it into EMC.")+"\n"+
    Translation.translate("§3Draw the EMC from the adjacent energy collector."));

Callback.addCallback("PostLoaded",function(){
if(hard_mode){
	Recipes.addShaped({id: BlockID.antimatterRelay3, count: 1, data: 0}, 
	["odo", 
	 "kfk",
	 "ooo"],
	["k", ItemID.kleinStar3, 0, "o", 49, 0, "f", BlockID.antimatterRelay2, 0, "d", ItemID.redMatter, 0]);
}else{
	Recipes.addShaped({id: BlockID.antimatterRelay3, count: 1, data: 0}, 
	["odo", 
	 "ofo",
	 "ooo"],
	["o", 49, 0, "f", BlockID.antimatterRelay2, 0, "d", ItemID.redMatter, 0]);
}
});

System.addspeed_up(BlockID.antimatterRelay3);
TileEntity.registerPrototype(BlockID.antimatterRelay3, {
    defaultValues: {emc: 0, max: __config__.getBool("无存储上限") ? 1e16 : 5000000 },
    getGuiScreen: function() { return relayUI; },
    emc_out: 80/20, times: 1, times2: 1,
    getTransportSlots: function(){
      let inputC = [];
      let outputC = [];
      for(i=0;i<32;i++){inputC.push("input"+i)};
      return {input: inputC, output: outputC};
    },
    tick: function(){
      this.times2=this.times;
      StorageInterface.checkHoppers(this);

      var ths=this;
      var coords={x: this.x, y: this.y, z: this.z};

      for(i = 0; i < 32; i++){
        let slotBurn = this.container.getSlot("input" + i);
        let value = System.getValue(slotBurn.id, slotBurn.data);
        while(value && this.data.emc+(value||0)<=this.data.max){
          this.data.emc += value;
          slotBurn.count--;
          this.container.validateAll();
          value = System.getValue(slotBurn.id, slotBurn.data);
        }
      };

      this.container.setScale("emcScale", this.data.emc / this.data.max);
      this.container.setText("text", "EMC: "+Math.floor(this.data.emc));
      System.chargeStar(this.container, this.data);
      System.unchargeStar(this.container, this.data);

      DIRS.map(function(dir){
        let tile = World.getTileEntity(coords.x+dir.x, coords.y+dir.y, coords.z+dir.z);
        let block = World.getBlock(coords.x+dir.x, coords.y+dir.y, coords.z+dir.z);
        if(block.id==BlockID.energyCollector1 || block.id==BlockID.energyCollector2 || block.id==BlockID.energyCollector3){
          System.transfer(ths, tile);
        };
      })

      this.times=1;
    }
});

StorageInterface.createInterface(BlockID.antimatterRelay3, {
	slots: {
		"input0": {input: true},
		"input1": {input: true},
		"input2": {input: true},
		"input3": {input: true},
		"input4": {input: true},
		"input5": {input: true},
		"input6": {input: true},
		"input7": {input: true},
		"input8": {input: true},
		"input9": {input: true},
		"input10": {input: true},
		"input11": {input: true},
		"input12": {input: true},
		"input13": {input: true},
		"input14": {input: true},
		"input15": {input: true},
		"input16": {input: true},
		"input17": {input: true},
		"input18": {input: true},
		"input19": {input: true},
		"input20": {input: true},
		"input21": {input: true},
		"input22": {input: true},
		"input23": {input: true},
		"input24": {input: true},
		"input25": {input: true},
		"input26": {input: true},
		"input27": {input: true},
		"input28": {input: true},
		"input29": {input: true},
		"input30": {input: true},
		"input31": {input: true},
	},
	isValidInput: function(item){
		return System.getValue(item.id, item.data);
	}
});




// file: condenser/chest.js

IDRegistry.genBlockID("alchChest");
Block.createBlockWithRotation("alchChest", [{
    name: "Alchemical chest",
    texture: [
        ["alchemicalChestBottom", 0],
        ["alchemicalChestBottom", 0],
        ["alchemicalChestSide", 0],
        ["alchemicalChestFront", 0],
        ["alchemicalChestSide", 0],
        ["alchemicalChestSide", 0]
    ],
    inCreative: true
}]);

CustomChest.setChestRender(BlockID.alchChest);

var alchChestUI_obj = {
  standart: {
    header: { text: { text: Translation.translate("Alchemical Storage") }},
    inventory: { standart: true},
    background: { standart: true},
    minHeight: 1000/16*9*1.5-500/屏幕长宽比-90
  },
  elements: {},
  transfer: {}
};
for(i=1;i<=104;i++){alchChestUI_obj.elements["slot"+String(i)]={type: "slot", x: 350+50*((i-1)%12), y: 40+50*Math.floor((i-1)/12), size: 50}};
for(i=1;i<=104;i++){alchChestUI_obj.transfer["slot"+String(i)]={input: true, output: true}};
var alchChestUI = new UI.StandartWindow(alchChestUI_obj);


Callback.addCallback("PostLoaded", function(){
Recipes.addShaped({ id: BlockID.alchChest, count: 1, data: 0},
["lmh", "sds", "ici"], ["l", ItemID.covDust1, 0, "m", ItemID.covDust2, 0, "h", ItemID.covDust3, 0, "s", 1, 0, "i", 265, 0, "c", 54, 0, "d", 264, 0]);
});

TileEntity.registerPrototype(BlockID.alchChest, {
  getGuiScreen: function(){
    return alchChestUI;
  },
  getTransportSlots: function(){
    let inputC = [];
    let outputC = [];
    for(i=1; i<=104; i++){
      inputC.push("slot" + i);
      outputC.push("slot" + i);
    };
    return {input: inputC, output: outputC}
  },
  tick: function(){
    StorageInterface.checkHoppers(this);
  }
});

StorageInterface.createInterface(BlockID.alchChest, {
	slots: alchChestUI_obj.transfer
});




// file: condenser/tier 1.js

IDRegistry.genBlockID("energyCondenser1");
Block.createBlockWithRotation("energyCondenser1", [
 {name: "Energy Condenser I", texture: [
   ["condenserBottom",0],
   ["condenserTop",0],
   ["condenserSide",0],
   ["condenserFront",0],
   ["condenserSide",0],
   ["condenserSide",0],
  ],inCreative: true}
]);
SetDescription(BlockID.energyCondenser1, Translation.translate("§3Convert EMC into a specific item.")+"\n"+
    Translation.translate("§3Draw EMC from the adjacent energy collector and antimatter relay."));

CustomChest.setChestRender(BlockID.energyCondenser1);

Callback.addCallback("PostLoaded",function(){
if(hard_mode){
	Recipes.addShaped({id: BlockID.energyCondenser1, count: 1, data: 0}, 
	["odo",
	 "dcd",
	 "kdk"],
	["k", ItemID.kleinStar3, 0, "o", 49, 0, "d", 264, 0, "c", BlockID.alchChest, 0]);
}else{
	Recipes.addShaped({id: BlockID.energyCondenser1, count: 1, data: 0}, 
	["odo",
	 "dcd",
	 "odo"],
	["o", 49, 0, "d", 264, 0, "c", BlockID.alchChest, 0]);
}
});

var condenserUI_1 = new UI.StandartWindow({
    standart: {
      header: {text: {text: Translation.translate("Energy condenser") }},
      inventory: {standart: true},
      background: {standart: true},
      minHeight: 1000/16*9*1.5-500/屏幕长宽比-90
    }, 
    drawing: [
      {type: "bitmap", x: 500, y: 100, bitmap: "emcBar_0", scale: 4},
    ],
    elements: {
      "item": {type: "slot", x: 430, y: 95},
      "charge": {type: "slot", x: 360, y: 70, size: 55, bitmap: "starCharge"},
      "uncharge": {type: "slot", x: 360, y: 125, size: 55, bitmap: "unstarCharge" },
      "emcScale": {type: "scale", x: 500, y: 100, bitmap: "emcBar_1", scale: 4},
      "text": {type: "text", x: 325, y: 35, width: 100, height: 30, text: "EMC"},
      "slotCatalyst0": {type: "slot", x: 400, y: 200},
      "slotCatalyst1": {type: "slot", x: 460, y: 200},
      "slotCatalyst2": {type: "slot", x: 520, y: 200},
      "slotCatalyst3": {type: "slot", x: 580, y: 200},
      "slotCatalyst4": {type: "slot", x: 640, y: 200},
      "slotCatalyst5": {type: "slot", x: 700, y: 200},
      "slotCatalyst6": {type: "slot", x: 760, y: 200},
      "slotCatalyst7": {type: "slot", x: 820, y: 200},
      "slotCatalyst8": {type: "slot", x: 400, y: 260},
      "slotCatalyst9": {type: "slot", x: 460, y: 260},
      "slotCatalyst10": {type: "slot", x: 520, y: 260},
      "slotCatalyst11": {type: "slot", x: 580, y: 260},
      "slotCatalyst12": {type: "slot", x: 640, y: 260},
      "slotCatalyst13": {type: "slot", x: 700, y: 260},
      "slotCatalyst14": {type: "slot", x: 760, y: 260},
      "slotCatalyst15": {type: "slot", x: 820, y: 260},
      "slotCatalyst16": {type: "slot", x: 400, y: 320},
      "slotCatalyst17": {type: "slot", x: 460, y: 320},
      "slotCatalyst18": {type: "slot", x: 520, y: 320},
      "slotCatalyst19": {type: "slot", x: 580, y: 320},
      "slotCatalyst20": {type: "slot", x: 640, y: 320},
      "slotCatalyst21": {type: "slot", x: 700, y: 320},
      "slotCatalyst22": {type: "slot", x: 760, y: 320},
      "slotCatalyst23": {type: "slot", x: 820, y: 320},
      "slotCatalyst24": {type: "slot", x: 400, y: 380},
      "slotCatalyst25": {type: "slot", x: 460, y: 380},
      "slotCatalyst26": {type: "slot", x: 520, y: 380},
      "slotCatalyst27": {type: "slot", x: 580, y: 380},
      "slotCatalyst28": {type: "slot", x: 640, y: 380},
      "slotCatalyst29": {type: "slot", x: 700, y: 380},
      "slotCatalyst30": {type: "slot", x: 760, y: 380},
      "slotCatalyst31": {type: "slot", x: 820, y: 380},
    }
});


System.addspeed_up(BlockID.energyCondenser1);
TileEntity.registerPrototype(BlockID.energyCondenser1, {
  defaultValues: {emc: 0, max: 0, work: false},
  emc_out: 6, times: 1, times2: 1,
  getGuiScreen: function(){
    return condenserUI_1;
  },
  getTransportSlots: function(){
    var slot=[];
    for(i=0; i<32; i++){
      slot.push("slotCatalyst"+i);
    };
    return {input: slot, output: slot};
  },
  tick: function(){
    this.times2=this.times;
    StorageInterface.checkHoppers(this);

    var ths=this, coords={x: this.x, y: this.y, z: this.z}, slot=[];
    var slotItem=this.container.getSlot("item");
    for(i=0; i<32; i++){slot[i]=this.container.getSlot("slotCatalyst"+String(i))};

    this.container.setText("text", "EMC: "+Math.floor(this.data.emc));
    System.chargeStar(this.container, this.data);
    System.unchargeStar(this.container, this.data);

    if(System.getValue(slotItem.id, slotItem.data)){
      this.data.max = System.getValue(slotItem.id, slotItem.data);
      this.container.setScale("emcScale", this.data.emc/this.data.max);
      if(!this.data.work){this.data.work=true};
    } else {
      this.data.max=0;
      this.container.setScale("emcScale", 0);
      if(this.data.work){this.data.work=false};
    };

    if(this.data.work){
      DIRS.map(function(dir){
        let tile = World.getTileEntity(coords.x+dir.x, coords.y+dir.y, coords.z+dir.z);
        let block = World.getBlock(coords.x+dir.x, coords.y+dir.y, coords.z+dir.z);
        if(block.id==BlockID.energyCollector1 || block.id==BlockID.energyCollector2 || block.id==BlockID.energyCollector3 ||
          block.id==BlockID.antimatterRelay1 || block.id==BlockID.antimatterRelay2 || block.id==BlockID.antimatterRelay3){
          System.transfer(ths, tile);
        };
      });
    };

    if(this.data.work){
      for(i=0; i<32; i++){
        if(this.data.emc>=this.data.max && slot[i].count<Item.getMaxStack(slot[i].id,slot[i].data) &&
          (slot[i].id==0 || (slot[i].id==slotItem.id && slot[i].data==slotItem.data && !slot[i].extra))){
          this.data.emc-=this.data.max;
          slot[i].id=slotItem.id;
          slot[i].data=slotItem.data;
          slot[i].count+=1;
          this.container.validateAll();
          break;
        };
      };
    };

    this.times=1;
  }
});

StorageInterface.createInterface(BlockID.energyCondenser1, {
	slots: {
		"slotCatalyst0": {output: true},
		"slotCatalyst1": {output: true},
		"slotCatalyst2": {output: true},
		"slotCatalyst3": {output: true},
		"slotCatalyst4": {output: true},
		"slotCatalyst5": {output: true},
		"slotCatalyst6": {output: true},
		"slotCatalyst7": {output: true},
		"slotCatalyst8": {output: true},
		"slotCatalyst9": {output: true},
		"slotCatalyst10": {output: true},
		"slotCatalyst11": {output: true},
		"slotCatalyst12": {output: true},
		"slotCatalyst13": {output: true},
		"slotCatalyst14": {output: true},
		"slotCatalyst15": {output: true},
		"slotCatalyst16": {output: true},
		"slotCatalyst17": {output: true},
		"slotCatalyst18": {output: true},
		"slotCatalyst19": {output: true},
		"slotCatalyst20": {output: true},
		"slotCatalyst21": {output: true},
		"slotCatalyst22": {output: true},
		"slotCatalyst23": {output: true},
		"slotCatalyst24": {output: true},
		"slotCatalyst25": {output: true},
		"slotCatalyst26": {output: true},
		"slotCatalyst27": {output: true},
		"slotCatalyst28": {output: true},
		"slotCatalyst29": {output: true},
		"slotCatalyst30": {output: true},
		"slotCatalyst31": {output: true},
	}
});




// file: condenser/tier 2.js

IDRegistry.genBlockID("energyCondenser2");
Block.createBlockWithRotation("energyCondenser2", [
 {name: "Energy Condenser II", texture: [
   ["condenserBottom",0],
   ["condenserTop",0],
   ["condenserSide",0],
   ["condenserFront",0],
   ["condenserSide",0],
   ["condenserSide",0],
  ],inCreative: true}
]);
SetDescription(BlockID.energyCondenser2, Translation.translate("§3Convert the items placed on the left side of it into EMC.")+"\n"+
    Translation.translate("§3Convert EMC into a specific item.")+"\n"+
    Translation.translate("§3Draw EMC from the adjacent energy collector and antimatter relay."));

CustomChest.setChestRender(BlockID.energyCondenser2);

Callback.addCallback("PostLoaded",function(){
if(hard_mode){
	Recipes.addShaped({id: BlockID.energyCondenser2, count: 1, data: 0}, 
	["oko",
	 "dcd",
	 "oro"],
	["k", ItemID.kleinStar4, 0, "r", BlockID.antimatterRelay3, 0, "o", BlockID.dmBlock, 0, "d", BlockID.rmBlock, 0, "c", BlockID.energyCondenser1, 0]);
}else{
	Recipes.addShaped({id: BlockID.energyCondenser2, count: 1, data: 0}, 
	["odo",
	 "dcd",
	 "odo"],
	["o", BlockID.dmBlock, 0, "d", BlockID.rmBlock, 0, "c", BlockID.energyCondenser1, 0]);
}
});

var condenserUI_2 = new UI.StandartWindow({
    standart: {
      header: {text: {text: Translation.translate("Energy condenser") }},
      inventory: {standart: true},
      background: {standart: true},
      minHeight: 1000/16*9*1.5-500/屏幕长宽比-90
    }, 
    drawing: [
      {type: "bitmap", x: 500, y: 100, bitmap: "emcBar_0", scale: 4},
    ],
    elements: {
      "item": {type: "slot", x: 430, y: 95},
      "charge": {type: "slot", x: 360, y: 70, size: 55, bitmap: "starCharge"},
      "uncharge": {type: "slot", x: 360, y: 125, size: 55, bitmap: "unstarCharge" },
      "emcScale": {type: "scale", x: 500, y: 100, bitmap: "emcBar_1", scale: 4},
      "text": {type: "text", x: 325, y: 35, width: 100, height: 30, text: "EMC"},
      "slotInput0": {type: "slot", x: 380, y: 200},
      "slotInput1": {type: "slot", x: 440, y: 200},
      "slotInput2": {type: "slot", x: 500, y: 200},
      "slotInput3": {type: "slot", x: 560, y: 200},
      "slotInput4": {type: "slot", x: 380, y: 260},
      "slotInput5": {type: "slot", x: 440, y: 260},
      "slotInput6": {type: "slot", x: 500, y: 260},
      "slotInput7": {type: "slot", x: 560, y: 260},
      "slotInput8": {type: "slot", x: 380, y: 320},
      "slotInput9": {type: "slot", x: 440, y: 320},
      "slotInput10": {type: "slot", x: 500, y: 320},
      "slotInput11": {type: "slot", x: 560, y: 320},
      "slotInput12": {type: "slot", x: 380, y: 380},
      "slotInput13": {type: "slot", x: 440, y: 380},
      "slotInput14": {type: "slot", x: 500, y: 380},
      "slotInput15": {type: "slot", x: 560, y: 380},
      "slotOutput0": {type: "slot", x: 660, y: 200},
      "slotOutput1": {type: "slot", x: 720, y: 200},
      "slotOutput2": {type: "slot", x: 780, y: 200},
      "slotOutput3": {type: "slot", x: 840, y: 200},
      "slotOutput4": {type: "slot", x: 660, y: 260},
      "slotOutput5": {type: "slot", x: 720, y: 260},
      "slotOutput6": {type: "slot", x: 780, y: 260},
      "slotOutput7": {type: "slot", x: 840, y: 260},
      "slotOutput8": {type: "slot", x: 660, y: 320},
      "slotOutput9": {type: "slot", x: 720, y: 320},
      "slotOutput10": {type: "slot", x: 780, y: 320},
      "slotOutput11": {type: "slot", x: 840, y: 320},
      "slotOutput12": {type: "slot", x: 660, y: 380},
      "slotOutput13": {type: "slot", x: 720, y: 380},
      "slotOutput14": {type: "slot", x: 780, y: 380},
      "slotOutput15": {type: "slot", x: 840, y: 380},
    }
});


System.addspeed_up(BlockID.energyCondenser2);
TileEntity.registerPrototype(BlockID.energyCondenser2, {
  defaultValues: {emc: 0, max: 0, work: false},
  emc_out: 12, times: 1, times2: 1,
  getGuiScreen: function(){
    return condenserUI_2;
  },
  getTransportSlots: function(){
    var slotInput=[], slotOutput=[];
    for(i=0; i<16; i++){
      slotInput.push("slotInput"+i);
      slotOutput.push("slotOutput"+i);
    };
    return {input: slotInput, output: slotOutput};
  },
  tick: function(){
    this.times2=this.times;
    StorageInterface.checkHoppers(this);

    var ths=this, coords={x: this.x, y: this.y, z: this.z};
    var slotItem=this.container.getSlot("item");
    var slotInput=[], slotOutput=[];
    for(i=0; i<16; i++){
      slotOutput[i]=this.container.getSlot("slotOutput"+String(i));
      slotInput[i]=this.container.getSlot("slotInput"+String(i));
    };

    this.container.setText("text", "EMC: "+Math.floor(this.data.emc));
    System.chargeStar(this.container, this.data);
    System.unchargeStar(this.container, this.data);

    if(System.getValue(slotItem.id, slotItem.data)){
      this.data.max = System.getValue(slotItem.id, slotItem.data);
      this.container.setScale("emcScale", this.data.emc/this.data.max);
      if(!this.data.work){this.data.work=true};
    } else {
      this.data.max=0;
      this.container.setScale("emcScale", 0);
      if(this.data.work){this.data.work=false};
    };

    if(this.data.work){
      DIRS.map(function(dir){
        let tile = World.getTileEntity(coords.x+dir.x, coords.y+dir.y, coords.z+dir.z);
        let block = World.getBlock(coords.x+dir.x, coords.y+dir.y, coords.z+dir.z);
        if(block.id==BlockID.energyCollector1 || block.id==BlockID.energyCollector2 || block.id==BlockID.energyCollector3 ||
          block.id==BlockID.antimatterRelay1 || block.id==BlockID.antimatterRelay2 || block.id==BlockID.antimatterRelay3){
          System.transfer(ths, tile);
        };
      });
    };

    if(this.data.work){
      for(i=0; i<16; i++){
        var value=System.getValue(slotInput[i].id, slotInput[i].data);
        while(value && this.data.emc<this.data.max){
          this.data.emc += value;
          slotInput[i].count--;
          this.container.validateAll();
          value=System.getValue(slotInput[i].id, slotInput[i].data);
        }
      };
    };

    if(this.data.work){
      for(i=0; i<16; i++){
        if(this.data.emc>=this.data.max && slotOutput[i].count<Item.getMaxStack(slotOutput[i].id,slotOutput[i].data) &&
          (slotOutput[i].id==0 || (slotOutput[i].id==slotItem.id && slotOutput[i].data==slotItem.data && !slotOutput[i].extra))){
          this.data.emc-=this.data.max;
          slotOutput[i].id=slotItem.id;
          slotOutput[i].data=slotItem.data;
          slotOutput[i].count+=1;
          this.container.validateAll();
          break;
        };
      };
    };

    this.times=1;
  }
});

StorageInterface.createInterface(BlockID.energyCondenser2, {
	slots: {
		"slotInput0": {input: true},
		"slotInput1": {input: true},
		"slotInput2": {input: true},
		"slotInput3": {input: true},
		"slotInput4": {input: true},
		"slotInput5": {input: true},
		"slotInput6": {input: true},
		"slotInput7": {input: true},
		"slotInput8": {input: true},
		"slotInput9": {input: true},
		"slotInput10": {input: true},
		"slotInput11": {input: true},
		"slotInput12": {input: true},
		"slotInput13": {input: true},
		"slotInput14": {input: true},
		"slotInput15": {input: true},
		"slotOutput0": {output: true},
		"slotOutput1": {output: true},
		"slotOutput2": {output: true},
		"slotOutput3": {output: true},
		"slotOutput4": {output: true},
		"slotOutput5": {output: true},
		"slotOutput6": {output: true},
		"slotOutput7": {output: true},
		"slotOutput8": {output: true},
		"slotOutput9": {output: true},
		"slotOutput10": {output: true},
		"slotOutput11": {output: true},
		"slotOutput12": {output: true},
		"slotOutput13": {output: true},
		"slotOutput14": {output: true},
		"slotOutput15": {output: true},
	},
	isValidInput: function(item){
		return System.getValue(item.id, item.data);
	}
});




// file: furnace/tier 1.js

IDRegistry.genBlockID("dmfurnace");
Block.createBlockWithRotation("dmfurnace", [
    {name: "Dark matter furnace", texture: [["dmBlock", 0], ["dmBlock", 0], ["dmBlock", 0],
        ["dmFurn", 0], ["dmBlock", 0], ["dmBlock", 0]], inCreative: true},
    {name: "Dark matter furnace", texture: [["dmBlock", 0], ["dmBlock", 0], ["dmBlock", 0],
        ["dmFurn", 1], ["dmBlock", 0], ["dmBlock", 0]], inCreative: false}
]);

Callback.addCallback("PostLoaded",function(){
if(hard_mode){
	Recipes.addShaped({id: BlockID.dmfurnace, count: 1, data: 0},
	["ddd",
	 "kfk",
	 "drd"],
	["k", ItemID.kleinStar2, 0, "r", BlockID.antimatterRelay1, 0, "d", ItemID.darkMatter, 0, "f", 61, 0]);
}else{
	Recipes.addShaped({id: BlockID.dmfurnace, count: 1, data: 0},
	["ddd",
	 "dfd",
	 "dfd"],
	["d", ItemID.darkMatter, 0, "f", 61, 0]);
}
});


var dmfurnUI = (function(){
	var bit = 600/170;
	var base = {x: 360, y: 90};
	var elem = {
	    "input": {type: "slot", x: base.x+bit*44, y: base.y+bit*12, size: bit*18, isTransparentBackground: true},
	    "output": {type: "slot", x: base.x+bit*100, y: base.y+bit*26, size: bit*26,
	        isTransparentBackground: true, isValid: function(){return false}},
	    "fuel": {type: "slot", x: base.x+bit*44, y: base.y+bit*48, size: bit*18, isTransparentBackground: true},
	    "charge": {type: "slot", x: base.x+bit*62, y: base.y+bit*48, bitmap: "starCharge", size: bit*18},
	    "uncharge": {type: "slot", x: base.x+bit*80, y: base.y+bit*48, bitmap: "unstarCharge", size: bit*18},
	    "progScale": {type: "scale", x: base.x+bit*67, y: base.y+bit*31, bitmap: "furnace_0", scale: bit, direction: 0},
	    "burn": {type: "scale", x: base.x+bit*46, y: base.y+bit*33, bitmap: "furnace_1", scale: bit, direction: 1},
	    "text": {type: "text", x: 325, y: 35, width: 100, height: 30, text: "EMC"}
	};
	for(i=0; i<8; i++){
		elem["input"+i] = {type: "slot", x: base.x+bit*(8+i%2*18), y: base.y+bit*(3+Math.floor(i/2)*18), size: bit*18,
		    isTransparentBackground: true};
		elem["output"+i] = {type: "slot", x: base.x+bit*(126+i%2*18), y: base.y+bit*(3+Math.floor(i/2)*18), size: bit*18,
		    isTransparentBackground: true, isValid: function(){return false}};
	};
	return new UI.StandartWindow({
	    standart: {
	        header: {text: {text: Translation.translate("Furnace")}},
	        inventory: {standart: true},
	        background: {standart: true},
	        minHeight: 1000/16*9*1.5-500/屏幕长宽比-90
	    },
	    params: {slot: "clear"},
	    drawing: [{type: "bitmap", x: base.x, y: base.y, bitmap: "dmfurnace", scale: bit}],
	    elements: elem
	});
})();


System.addspeed_up(BlockID.dmfurnace);
TileEntity.registerPrototype(BlockID.dmfurnace, {
    defaultValues: {
        prog: 0, emc: 0, max: __config__.getBool("无存储上限") ? 1e16 : 1200000
    },
    times: 1, times2: 1, fine: 20,
    getGuiScreen: function(){
    	return dmfurnUI;
    },
    getTransportSlots: function(){
    	var inputC=["input"], outputC=["output"];
    	for(i=0; i<8; i++){
    		inputC.push("input"+i);
    		outputC.push("output"+i);
    	};
    	return {input: inputC, output: outputC};
    },
    tick: function(){
    	this.times2 = this.times;
    	StorageInterface.checkHoppers(this);
    	System.chargeStar(this.container, this.data);
    	System.unchargeStar(this.container, this.data);

    	var ths=this, coords={x: this.x, y: this.y, z: this.z};
    	var res, slotInput = [], slotOutput = [];
    	var slotFuel = this.container.getSlot("fuel");
    	for(i=0; i<8; i++){
    		slotInput[i] = this.container.getSlot("input"+i);
    		slotOutput[i+1] = this.container.getSlot("output"+i);
    	}
    	slotInput[8] = this.container.getSlot("input");
    	slotOutput[0] = this.container.getSlot("output");
    	res = Recipes.getFurnaceRecipeResult(slotInput[8].id, slotInput[8].data);

    	this.container.setText("text", "EMC: "+Math.floor(this.data.emc));
    	this.container.setScale("progScale", this.data.prog/this.fine);
    	this.container.setScale("burn", this.data.emc<this.fine ? this.data.emc/this.fine : 1);

    	var value = System.getValue(slotFuel.id, slotFuel.data);
    	while(value && this.data.emc+value<=this.data.max && slotFuel.id != 0){
    		this.data.emc += value;
    		slotFuel.count--;
    		this.container.validateAll();
    	};

    	if(this.data.emc<this.data.max){
    		DIRS.map(function(dir){
    			let tile = World.getTileEntity(coords.x+dir.x, coords.y+dir.y, coords.z+dir.z);
    			let block = World.getBlock(coords.x+dir.x, coords.y+dir.y, coords.z+dir.z);
    			if(block.id==BlockID.energyCollector1 || block.id==BlockID.energyCollector2 || block.id==BlockID.energyCollector3 ||
    			    block.id==BlockID.antimatterRelay1 || block.id==BlockID.antimatterRelay2 || block.id==BlockID.antimatterRelay3){
    				System.transfer(ths, tile);
    			};
    		});
    	};

    	if(this.data.prog<this.fine && res && res.id){
    		let temp = this.data.prog;
    		temp += this.times2;
    		if(temp > this.fine) temp = temp%this.fine+this.fine;
    		if(this.data.emc >= (temp-this.data.prog)*Math.floor(20/this.fine)){
    			this.data.emc -= (temp-this.data.prog)*Math.floor(20/this.fine);
    			this.data.prog = temp;
    		}else{
    			this.data.prog += this.data.emc;
    			this.data.emc = 0;
    		};
    		temp = 0;
    	};

    	for(i=0; i<9; i++){
    		if(res && res.id && this.data.prog>=this.fine &&
    		    (slotOutput[i].id==0 || (slotOutput[i].id==res.id && slotOutput[i].data==res.data &&
    		         slotOutput[i].count<Item.getMaxStack(slotOutput[i].id, slotOutput[i].data) && !slotOutput[i].extra))){
    			this.data.prog=this.data.prog%this.fine;
    			slotOutput[i].id=res.id;
    			slotOutput[i].count++;
    			if(Math.random()<=0.5){
    				if(slotOutput[i].count<Item.getMaxStack(slotOutput[i].id, slotOutput[i].data)) slotOutput[i].count++;
    				else for(j=i+1; j<8; j++){
    					if(slotOutput[j].id==0 || (slotOutput[j].id==res.id && slotOutput[j].data==res.data &&
    					    slotOutput[j].count<Item.getMaxStack(slotOutput[j].id, slotOutput[j].data) && !slotOutput[j].extra)){
    						slotOutput[j].count++;
    						j = 8;
    					}
    				};
    			};
    			slotInput[8].count--;
    			this.container.validateAll();
    			break;
    		}
    	};

    	if(slotInput[8].id == 0 || (res && res.id && slotInput[8].count<Item.getMaxStack(slotInput[8].id, slotInput[8].data))){
    		if(!slotInput[8].extra) for(i=0; i<8; i++){
    			if(slotInput[i].id != 0 && (Recipes.getFurnaceRecipeResult(slotInput[i].id, slotInput[i].data) || {}).id &&
    			    (slotInput[8].id == 0 || (slotInput[i].id == slotInput[8].id && slotInput[i].data == slotInput[8].data && !slotInput[i].extra))){
    				let transfer = (slotInput[8].id==0) ? slotInput[i].count : Math.min(slotInput[i].count,
    				    Item.getMaxStack(slotInput[8].id, slotInput[8].data) - slotInput[8].count);
    				slotInput[8].id=slotInput[i].id;
    				slotInput[8].data=slotInput[i].data;
    				slotInput[8].count += transfer;
    				slotInput[i].count -= transfer;
    				this.container.validateAll();
    				break;
    			}
    		};
    	};

    	this.times = 1;
  }
});

StorageInterface.createInterface(BlockID.dmfurnace, {
	slots: {
		"input": {input: true},
		"input^0-7": {input: true},
		"output": {output: true},
		"output^0-7": {output: true},
	},
	isValidInput: function(item){
		return Boolean((Recipes.getFurnaceRecipeResult(item.id, item.data) || {}).id);
	}
});




// file: furnace/tier 2.js

IDRegistry.genBlockID("rmfurnace");
Block.createBlockWithRotation("rmfurnace", [
    {name: "Red matter furnace", texture: [["rmBlock", 0], ["rmBlock", 0], ["rmBlock", 0],
        ["rmFurn", 0], ["rmBlock", 0], ["rmBlock", 0]], inCreative: true},
    {name: "Dark matter furnace", texture: [["rmBlock", 0], ["rmBlock", 0], ["rmBlock", 0],
        ["rmFurn", 1], ["rmBlock", 0], ["rmBlock", 0]], inCreative: false}
]);

Callback.addCallback("PostLoaded",function(){
if(hard_mode){
	Recipes.addShaped({id: BlockID.rmfurnace, count: 1, data: 0},
	["krk",
	 "dfd"],
	["k", ItemID.kleinStar3, 0, "r", BlockID.antimatterRelay2, 0, "d", ItemID.redMatter, 0, "f", BlockID.dmfurnace, 0]);
}else{
	Recipes.addShaped({id: BlockID.rmfurnace, count: 1, data: 0},
	[" d ",
	 "dfd"],
	["d", ItemID.redMatter, 0, "f", BlockID.dmfurnace, 0]);
}
});


System.addspeed_up(BlockID.rmfurnace);
TileEntity.registerPrototype(BlockID.rmfurnace, {
    defaultValues: {
        prog: 0, emc: 0, max: __config__.getBool("无存储上限") ? 1e16 : 5000000
    },
    times: 1, times2: 1, fine: 4,
    getGuiScreen: function(){
    	return dmfurnUI;
    },
    getTransportSlots: function(){
    	var inputC=["input"], outputC=["output"];
    	for(i=0; i<8; i++){
    		inputC.push("input"+i);
    		outputC.push("output"+i);
    	};
    	return {input: inputC, output: outputC};
    },
    tick: function(){
    	this.times2 = this.times;
    	StorageInterface.checkHoppers(this);
    	System.chargeStar(this.container, this.data);
    	System.unchargeStar(this.container, this.data);

    	var ths=this, coords={x: this.x, y: this.y, z: this.z};
    	var res, slotInput = [], slotOutput = [];
    	var slotFuel = this.container.getSlot("fuel");
    	for(i=0; i<8; i++){
    		slotInput[i] = this.container.getSlot("input"+i);
    		slotOutput[i+1] = this.container.getSlot("output"+i);
    	}
    	slotInput[8] = this.container.getSlot("input");
    	slotOutput[0] = this.container.getSlot("output");
    	res = Recipes.getFurnaceRecipeResult(slotInput[8].id, slotInput[8].data);

    	this.container.setText("text", "EMC: "+Math.floor(this.data.emc));
    	this.container.setScale("progScale", this.data.prog/this.fine);
    	this.container.setScale("burn", this.data.emc<this.fine ? this.data.emc/this.fine : 1);

    	var value = System.getValue(slotFuel.id, slotFuel.data);
    	while(value && this.data.emc+value<=this.data.max && slotFuel.id != 0){
    		this.data.emc += value;
    		slotFuel.count--;
    		this.container.validateAll();
    	};

    	if(this.data.emc<this.data.max){
    		DIRS.map(function(dir){
    			let tile = World.getTileEntity(coords.x+dir.x, coords.y+dir.y, coords.z+dir.z);
    			let block = World.getBlock(coords.x+dir.x, coords.y+dir.y, coords.z+dir.z);
    			if(block.id==BlockID.energyCollector1 || block.id==BlockID.energyCollector2 || block.id==BlockID.energyCollector3 ||
    			    block.id==BlockID.antimatterRelay1 || block.id==BlockID.antimatterRelay2 || block.id==BlockID.antimatterRelay3){
    				System.transfer(ths, tile);
    			};
    		});
    	};

    	if(this.data.prog<this.fine && res && res.id){
    		let temp = this.data.prog;
    		temp += this.times2;
    		if(temp > this.fine) temp = temp%this.fine+this.fine;
    		if(this.data.emc >= (temp-this.data.prog)*Math.floor(20/this.fine)){
    			this.data.emc -= (temp-this.data.prog)*Math.floor(20/this.fine);
    			this.data.prog = temp;
    		}else{
    			this.data.prog += this.data.emc;
    			this.data.emc = 0;
    		};
    		temp = 0;
    	};

    	for(i=0; i<9; i++){
    		if(res && res.id && this.data.prog>=this.fine &&
    		    (slotOutput[i].id==0 || (slotOutput[i].id==res.id && slotOutput[i].data==res.data &&
    		         slotOutput[i].count<Item.getMaxStack(slotOutput[i].id, slotOutput[i].data) && !slotOutput[i].extra))){
    			this.data.prog=this.data.prog%this.fine;
    			slotOutput[i].id=res.id;
    			slotOutput[i].count++;
    				if(slotOutput[i].count<Item.getMaxStack(slotOutput[i].id, slotOutput[i].data)) slotOutput[i].count++;
    				else for(j=i+1; j<8; j++){
    					if(slotOutput[j].id==0 || (slotOutput[j].id==res.id && slotOutput[j].data==res.data &&
    					    slotOutput[j].count<Item.getMaxStack(slotOutput[j].id, slotOutput[j].data) && !slotOutput[j].extra)){
    						slotOutput[j].count++;
    						j = 8;
    					}
    				};
    			slotInput[8].count--;
    			this.container.validateAll();
    			break;
    		}
    	};

    	if(slotInput[8].id == 0 || (res && res.id && slotInput[8].count<Item.getMaxStack(slotInput[8].id, slotInput[8].data))){
    		if(!slotInput[8].extra) for(i=0; i<8; i++){
    			if(slotInput[i].id != 0 && (Recipes.getFurnaceRecipeResult(slotInput[i].id, slotInput[i].data) || {}).id &&
    			    (slotInput[8].id == 0 || (slotInput[i].id == slotInput[8].id && slotInput[i].data == slotInput[8].data && !slotInput[i].extra))){
    				let transfer = (slotInput[8].id==0) ? slotInput[i].count : Math.min(slotInput[i].count,
    				    Item.getMaxStack(slotInput[8].id, slotInput[8].data) - slotInput[8].count);
    				slotInput[8].id=slotInput[i].id;
    				slotInput[8].data=slotInput[i].data;
    				slotInput[8].count += transfer;
    				slotInput[i].count -= transfer;
    				this.container.validateAll();
    				break;
    			}
    		};
    	};

    	this.times = 1;
  }
});

StorageInterface.createInterface(BlockID.rmfurnace, {
	slots: {
		"input": {input: true},
		"input^0-7": {input: true},
		"output": {output: true},
		"output^0-7": {output: true},
	},
	isValidInput: function(item){
		return Boolean((Recipes.getFurnaceRecipeResult(item.id, item.data) || {}).id);
	}
});




// file: explosive.js

IDRegistry.genBlockID("explosive1");
Block.createBlock("explosive1", [
	 {name: "Nova catalyst", texture: [
	   ["explosiveTop",0],
	   ["explosiveBottom",0],
	   ["explosiveSide",0],
  ],inCreative: __config__.getBool("物品方块.催化剂(炸弹)")}
], "opaque");

IDRegistry.genBlockID("explosive2");
Block.createBlock("explosive2", [
	 {name: "Astral catalyst", texture: [
	   ["explosiveTop",0],
	   ["explosiveBottom",0],
	   ["explosiveSide",1],
  ],inCreative: __config__.getBool("物品方块.催化剂(炸弹)")}
], "opaque");

Callback.addCallback("PostLoaded", function(){
if(__config__.getBool("物品方块.催化剂(炸弹)")){
Recipes.addShapeless({id: BlockID.explosive1, count: 2, data: 0}, [{id: 46, data: 0}, {id: ItemID.fuelMobius, data: 0}]);
Recipes.addShapeless({id: BlockID.explosive2, count: 2, data: 0}, [{id: BlockID.explosive1, data: 0}, {id: ItemID.fuelAstral, data: 0}]);
}
});

Callback.addCallback("ItemUse", function (c, i, b){
  if(i.id == 259 && (b.id == BlockID.explosive1 || b.id == BlockID.explosive2)){
    try{
      World.getTileEntity(c.x, c.y, c.z).data.flame=1;
      ToolAPI.breakCarriedTool(1);
      Game.message(Translation.translate("Catalyst will explode! Run away!"));
      Game.prevent();
    }catch(e){};
  }
});

TileEntity.registerPrototype(BlockID.explosive1, {
  defaultValues: {
    flame: 0, time: 60
  },
  radius: 3,
  blocks: [],
  explode: function(){
    var coords={x: this.x, y: this.y, z: this.z};
    this.data.time=-1;
    for(x1 = -this.radius*2; x1 <= this.radius*2; x1 ++){
      for(y1 = -this.radius*2; y1 <= this.radius*2; y1 ++){
        for(z1 = -this.radius*2; z1 <= this.radius*2; z1 ++){
          if(x1*x1+y1*y1+z1*z1<1*this.radius*this.radius){this.blocks.push({x: this.x+x1, y: this.y+y1, z: this.z+z1})}else
          if(x1*x1+y1*y1+z1*z1<2.25*this.radius*this.radius && Math.random()<0.9){this.blocks.push({x: this.x+x1, y: this.y+y1, z: this.z+z1})}else
          if(x1*x1+y1*y1+z1*z1<4*this.radius*this.radius && Math.random()<0.3){this.blocks.push({x: this.x+x1, y: this.y+y1, z: this.z+z1})}
        }
      }
    }
    this.blocks = this.blocks.filter(function(item,index,self){return self.indexOf(item)===index});
    World.setBlock(this.x, this.y, this.z, 0);
    this.blocks.map(function(i){
      var block=World.getBlock(i.x, i.y, i.z);
      if(block.id==BlockID.explosive1 || block.id==BlockID.explosive2){
        if(World.getTileEntity(i.x, i.y, i.z).data.flame==0){
          World.getTileEntity(i.x, i.y, i.z).data.flame=1;
          World.getTileEntity(i.x, i.y, i.z).data.time=20;
        };
      }else if(System.getValue(block.id, block.data, true)){
        World.setBlock(i.x, i.y, i.z, 0);
        var block_drop = Block.getBlockDropViaItem(block, {id: 278, data:0}, i) || [];
        block_drop.map(function(ii){
          World.drop(coords.x, coords.y, coords.z, ii[0], ii[1], ii[2])
        })
      }
    });
  },
  tick: function(){
    if(this.data.flame && this.data.time>0){this.data.time-=1};
    if(this.data.time==0){
      this.explode()
    }
  },
  redstone: function(params){
    if(params.power>0) this.data.flame = 1;
  },
});

TileEntity.registerPrototype(BlockID.explosive2, {
  defaultValues: {
    flame: 0, time: 60
  },
  radius: 5,
  blocks: [],
  explode: function(){
    var coords={x: this.x, y: this.y, z: this.z};
    this.data.time=-1;
    for(x1 = -this.radius*2; x1 <= this.radius*2; x1 ++){
      for(y1 = -this.radius*2; y1 <= this.radius*2; y1 ++){
        for(z1 = -this.radius*2; z1 <= this.radius*2; z1 ++){
          if(x1*x1+y1*y1+z1*z1<1*this.radius*this.radius){this.blocks.push({x: this.x+x1, y: this.y+y1, z: this.z+z1})}else
          if(x1*x1+y1*y1+z1*z1<2.25*this.radius*this.radius && Math.random()<0.9){this.blocks.push({x: this.x+x1, y: this.y+y1, z: this.z+z1})}else
          if(x1*x1+y1*y1+z1*z1<4*this.radius*this.radius && Math.random()<0.3){this.blocks.push({x: this.x+x1, y: this.y+y1, z: this.z+z1})}
        }
      }
    }
    this.blocks = this.blocks.filter(function(item,index,self){return self.indexOf(item)===index});
    World.setBlock(this.x, this.y, this.z, 0);
    this.blocks.map(function(i){
      var block=World.getBlock(i.x, i.y, i.z);
      if(block.id==BlockID.explosive1 || block.id==BlockID.explosive2){
        if(World.getTileEntity(i.x, i.y, i.z).data.flame==0){
          World.getTileEntity(i.x, i.y, i.z).data.flame=1;
          World.getTileEntity(i.x, i.y, i.z).data.time=20;
        };
      }else if(System.getValue(block.id, block.data, true)){
        World.setBlock(i.x, i.y, i.z, 0);
        var block_drop = Block.getBlockDropViaItem(block, {id: 278, data:0}, i) || [];
        block_drop.map(function(ii){
          World.drop(coords.x, coords.y, coords.z, ii[0], ii[1], ii[2])
        })
      }
    });
  },
  tick: function(){
    if(this.data.flame && this.data.time>0){this.data.time-=1};
    if(this.data.time==0){
      this.explode()
    }
  },
  redstone: function(params){
    if(params.power>0) this.data.flame = 1;
  },
});




// file: other.js

//Creative Groups

Callback.addCallback("PostLoaded", function () {
	Item.addCreativeGroup("kleinstars", Translation.translate("Klein Stars"), [
		ItemID.kleinStar1,
		ItemID.kleinStar2,
		ItemID.kleinStar3,
		ItemID.kleinStar4,
		ItemID.kleinStar5,
		ItemID.kleinStar6
	]);
	
	Item.addCreativeGroup("emcrelays", Translation.translate("Anti-matter Relays"), [
		BlockID.antimatterRelay1,
		BlockID.antimatterRelay2,
		BlockID.antimatterRelay3
	]);
	
	Item.addCreativeGroup("emccollectors", Translation.translate("EMC Collectors"), [
		BlockID.energyCollector1,
		BlockID.energyCollector2,
		BlockID.energyCollector3
	]);
	
	Item.addCreativeGroup("ringsamulets", Translation.translate("Rings and Amulets"), [
		ItemID.ironBand,
		ItemID.watchTime,
		ItemID.ringZero,
		ItemID.talismanRepair,
		ItemID.swiftWolfRendingGale,
		ItemID.soulStone,
		ItemID.bodyStone,
		ItemID.harvestRing,
		ItemID.ringBlackHoleInactive,
		ItemID.vulcaniteAmulet,
		ItemID.evertideAmulet
	]);
});




