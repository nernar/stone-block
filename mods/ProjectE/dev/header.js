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
