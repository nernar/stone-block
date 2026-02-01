/*
BUILD INFO:
  dir: dev
  target: main.js
  files: 8
*/



// file: header.js

/*/igi reload - Перезагрузить мод
/igi load <название файла> - Загрузить конфигурацию из файла
/igi save - Сохранить текущую конфигурацию
/igi enable - Отключить графический интерфейс
/igi disable - Включить графический интерфейс*/

/*
        config
{ 
    "enabled":true, 
    
    "sizeElements":60,
    "powerButton":true,
    
    "WorldInfo":{
        "enabled":true
        },n
        "Light":{
            "enabled":true,
            "position":3
            },
        "Biome":{
            "enabled":true,
            "position":4
        },
        "Fps":{
            "enabled":true,
            "position":5
        },
        "Time":{
            "enabled":true,
            "position":1
        },
        "Experience":{
            "enabled":true,
            "position":2
        },
        "Coordinates":{
            "enabled":true,
            "position":8
        },
    "ArmorInfo":{
        "enabled":true
    },
    "ItemCarriedInfo":{
        "enabled":true 
    }
}


            config.info
            
{
    "properties": {
      
      
        "enabled": {
            "name": {
                "en": "Enable modification"
            }
        },
       "sizeElements":{
           "name":{
               "en": "Size"
           },
           "description":{
             "en": "Size of window elements"
           }
       },
        "powerButton":{
           "name":{
               "en": "Power button"
           },
           "description":{
             "en": "Button that close or open all confirmed windos when you click"
           }
        },
        
        "WorldInfo":{
            "name":{
               "en": "World Information"
           },
           collapsible:false
        },
        "WorldInfo.enabled":{
            "name":{
               "en": "Enabled window"
           },
           "description":{
             "en": "Window with parametres that showinhg information about world"
           }
        },
        
        "Light":{
            "name":{
               "en": "Light parametr"
           }
        },
        "Light.enabled":{
            "name":{
               "en": "Enabled parametr"
           }
        },
        "Light.position":{
            "name":{
               "en": "Position of parametr"
           }
        },
        
        "Biome":{
            "name":{
               "en": "Biome parametr"
           }
        },
        "Biome.enabled":{
            "name":{
               "en": "Enabled parametr"
           }
        },
        "Biome.position":{
            "name":{
               "en": "Position of parametr"
           }
        },
        
        "Fps":{
            "name":{
               "en": "FPS parametr"
           }
        },
        "Fps.enabled":{
            "name":{
               "en": "Enabled parametr"
           }
        },
        "Fps.position":{
            "name":{
               "en": "Position of parametr"
           }
        },
        
        "Time":{
            "name":{
               "en": "Time parametr"
           }
        },
        "Time.enabled":{
            "name":{
               "en": "Enabled parametr"
           }
        },
        "Time.position":{
            "name":{
               "en": "Position of parametr"
           }
        },
        
        "Experience":{
            "name":{
               "en": "Expirience parametr"
           }
        },
        "Experience.enabled":{
            "name":{
               "en": "Enabled parametr"
           }
        },
        "Experience.position":{
            "name":{
               "en": "Position of parametr"
           }
        },
        
        "Coordinates":{
            "name":{
               "en": "Coordinates parametr"
           }
        },
        "Coordinates.enabled":{
            "name":{
               "en": "Enabled parametr"
           }
        },
        "Coordinates.position":{
            "name":{
               "en": "Position of parametr"
           }
        },
        
        "ArmorInfo":{
          "name":{
            "en": "Armor information"
          },
          collapsible:false
        },
        "ArmorInfo.enabled":{
          "name":{
               "en": "Enabled window"
           },
           "description":{
             "en": "Window that showing information about equippied armor"
           }
        },
        
        "ItemCarriedInfo":{
          "name":{
               "en": "Item carried information"
           },
        collapsible:false
        },
        "ItemCarriedInfo.enabled":{
          "name":{
            "en": "Enabled window"
          },
          "description":{
             "en": "Window that showing information about carried item in hand (name/damage)"
           }
        }
        
    }
}
*/


let worldInfo = __config__.getBool('WorldInfo.enabled');

let lightInfo = __config__.getBool('Light.enabled');
let lightInfoPosition = __config__.getInteger('Light.position')-1;

let biomeInfo = __config__.getBool('Biome.enabled');
let biomeInfoPosition = __config__.getInteger('Biome.position')-1;

let fpsInfo = __config__.getBool('Fps.enabled');
let fpsInfoPosition = __config__.getInteger('Fps.position')-1;

let timeInfo = __config__.getBool('Time.enabled');
let timeInfoPosition = __config__.getInteger('Time.position')-1;

let expInfo = __config__.getBool('Experience.enabled');
let expInfoPosition = __config__.getInteger('Experience.position')-1;

let coordsInfo = __config__.getBool('Coordinates.enabled');
let coordsInfoPosition = __config__.getInteger('Coordinates.position')-1;

let playerHealthInfo = __config__.getBool('PlayerHealthInfo.enabled');;

let itemCarriedInfo = __config__.getBool('ItemCarriedInfo.enabled');

let armorInfo = __config__.getBool('ArmorInfo.enabled');


//let playerHealthInfo = __config__.getBool('PlayerHealth.enabled');

let buttonEnabled = __config__.getBool('powerButton');
let getHeight = UI.getScreenHeight();
let sizeElements = __config__.getInteger('sizeElements'), yElementPosition = sizeElements/5+sizeElements;
//alert(sizeElements);

let arrayBoolens= [
    [0, worldInfo],
    [0, itemCarriedInfo],
    [0, armorInfo],
    [0, playerHealthInfo]
    ];

for(let i=0; i<4; i++)
    if(arrayBoolens[i][1]==true)arrayBoolens[i][0]=1;
    
   // alert('armor is '+arrayBoolens[2][1]+' '+arrayBoolens[2][0]);




// file: biomes.js

let biomesNames = {
	//0: null,
	1: 'Plains',
	2: 'Desert',
	3: 'Extreme Hills',
	4: 'Forest',
	5: 'Taiga',
	6: 'Swampland',
	7: 'River',
	8: 'Nether Wastes',
	9: 'The End',
	10: 'Frozen Ocean',
	11: 'Frozen River',
	12: 'Snowy Tundra',
	13: 'Snowy Mountains',
	14: 'Mushroom Fields',
	15: 'Mushroom Field Shore', 
	16: 'Beach', 
	17: 'Desert Hills',
	18: 'Forest Hills',
	19: 'Taiga Hills',
	20: 'Extreme Hills Edge',
	21: 'Jungle',
	22: 'Jungle Hills',
	23: 'Jungle Edge',
	24: 'Deap Ocean',
	25: 'Stone Beach',
	26: 'Cold Beach',
	27: 'Birch Forest',
	28: 'Birch Forest Hills',
	29: 'Roofed Forest',
	30: 'Cold Taiga',
	31: 'Cold Taiga Hills',
	32: 'Mega Taiga',
	33: 'Mega Taiga Hills',
	34: 'Extreme Hills Plus Trees',
	35: 'Savanna',
	36: 'Savanna Plateau',
	37: 'Mesa',
	38: 'Mesa Plateau Stone',
	39: 'Mesa Plateau',

	42: 'Ocean',
	43: 'Legacy Frozen Ocean',
	44: 'Warm Ocean',
	45: 'Lucewarm Ocean',
	46: 'Cold Ocean',
	47: 'Deep Warm Ocean',
	48: 'Deep Lucewarm Ocean',
	49: 'Deep Cold Ocean',
	50: 'Deep Frozen Ocean',
	
	129: 'Sunflower Plains',
	130: 'Desert Mutated',
	131: 'Extreme Hills Mutated',
	132: 'Flower Forest',
	133: 'Taiga Mutated',
	134: 'Swampland Mutated',
		
	140: 'Ice Plains Spikes',
	
	149: 'Jungle Mutated',
	
	151: 'Jungle Edge Mutated',
	
	155: 'Birch Forest Mutated',
	156: 'Birch Forest Hills Mutated',
	157: 'Roofed Forest Mutated',
	158: 'Cold Taiga Mutated',
	
	160: 'Redwood Taiga Mutated',
	161: 'Redwood Taiga Hills Mutated',
	162: 'Extreme Hills plus Trees Mutated',
	163: 'Savanna Mutated',
	164: 'Savanna Plateau Mutated',
	165: 'Mesa Bruce',
	166: 'Mesa Plateau Stone Mutated',
	167: 'Mesa Plateau Mutated',
	168: 'Bamboo Jungle',
	169: 'Bamboo Jungle Hills',
	
	178: 'Sound Sand Valley',
	179: 'Crimson Forest',
	180: 'Warped Forest',
	181: 'Basalt Deltas',
	
	//new update
    182: 'Jagged Peaks',
    183: 'Frozen Peaks',
    184: 'Snowy Slopes',
    185: 'Grove',
    186: 'Meadow',
    187: 'Lush Caves',
    188: 'Dripstone Caves',
    189: 'Stony Peaks'

};




// file: windows/powerButton.js

let PowerButton = {
    isEnabled: false,
    container: new UI.Container(),
    window: new UI.Window({
        location: {
            x: 1000-getHeight/14,
            y: 0,
            width: getHeight/14,
            height: getHeight/14 
        },
        drawing:[{
            type: 'background', color: 0//android.graphics.Color.parseColor('#c6c6c6')
            }],
        elements:{
              'button': {type: 'button', bitmap: 'buttonPower', x: 0, y: 0, scale: 59, clicker: { 
                    onClick: function(container){ 
                         for(let j = 0; j<4; j++)
                            if(arrayBoolens[j][0]==1) arrayBoolens[j][1]=!arrayBoolens[j][1];
                            //alert('click: '+arrayBoolens[2][1]+', клік: '+arrayBoolens[1][1]);
                    }
               }
          }
        } 
    }),
    open:function(){
        if(!this.isEnabled){
            this.container.openAs(this.window);
            this.isEnabled = true;
        }
    },
    close:function(){
        if(this.isEnabled){
            this.container.close();
            this.isEnabled = false;
        }
    }
};

PowerButton.window.setAsGameOverlay(true);
PowerButton.window.setTouchable(true);





// file: windows/xml.js

let XML = {
    isEnabled: false,
    container: new UI.Container(),
    window: new UI.Window({
        location: {
            x: 0,
            y: 0,
            width: getHeight/2,
            height: getHeight/2
        },
        drawing:[{
            type: 'background', color: 0//android.graphics.Color.parseColor('#c6c6c6')
            }],
        elements:{
			'time': {type: 'text', x: 0, y: yElementPosition*timeInfoPosition, width: 800, height: 32, text: '', font:{color: android.graphics.Color.rgb(255, 255, 255), shadow: 0, size: sizeElements, alignment: 0}},
			'biome': {type: 'text', x: 0, y: yElementPosition*biomeInfoPosition, width: 800, height: 32, text: '', font:{color: android.graphics.Color.rgb(255, 255, 255), shadow: 0, size: sizeElements, alignment: 0}},
			'light': {type: 'text', x: 0, y: yElementPosition*lightInfoPosition, width: 800, height: 32, text: '', font:{color: android.graphics.Color.rgb(255, 255, 255), shadow: 0, size: sizeElements, alignment: 0}},
			'exp': {type: 'text', x: 0, y: yElementPosition*expInfoPosition, width: 800, height: 32, text: '', font:{color: android.graphics.Color.rgb(255, 255, 255), shadow: 0, size: sizeElements, alignment: 0}},
			'fps': {type: 'text', x: 0, y: yElementPosition*fpsInfoPosition, width: 800, height: 32, text: '', font:{color: android.graphics.Color.rgb(255, 255, 255), shadow: 0, size: sizeElements, alignment: 0}},
			
			'x': {type: 'text', x: 0, y: yElementPosition*coordsInfoPosition, width: 800, height: 32, text: '', font:{color: android.graphics.Color.rgb(255, 255, 255), shadow: 0, size: sizeElements, alignment: 0}},
			'z': {type: 'text', x: 0, y: yElementPosition*(coordsInfoPosition+1), width: 800, height: 32, text: '', font:{color: android.graphics.Color.rgb(255, 255, 255), shadow: 0, size: sizeElements, alignment: 0}},
			'y': {type: 'text', x: 0, y: yElementPosition*(coordsInfoPosition+2), width: 800, height: 32, text: '', font:{color: android.graphics.Color.rgb(255, 255, 255), shadow: 0, size: sizeElements, alignment: 0}},
		}
    }),
	open:function(){
        if(!this.isEnabled){
            this.container.openAs(this.window);
            this.isEnabled = true;
        }
    },
    close:function(){
        if(this.isEnabled){
            this.container.close();
            this.isEnabled = false;
        }
    }
};

XML.window.setAsGameOverlay(true);
XML.window.setTouchable(false);





// file: windows/armor.js

let Armor = {
    isEnabled: false,
    container: new UI.Container(),
    window: new UI.Window({
        location: {
            x: 850,
            y: getHeight-getHeight/4,
            width: 150,
            height: getHeight/4
        },
        drawing:[{
            type: 'background', color: 0//android.graphics.Color.parseColor('#c6c6c6')
            }],
        elements:{
            'armorName0': {type: 'text', x: 200, y: 35, width: 600, height: 64, text: '', font:{color: android.graphics.Color.rgb(255, 255, 255), shadow: 0, size: sizeElements*1.5, alignment: 0}},
            'armorSlot0': { type: 'slot', x: 0, y: 0, size: sizeElements*3 , visual: true, bitmap: 'transparent', needClean: false, isTransparentBackground: true },
            'armorName1': {type: 'text', x: 200, y: 235, width: 600, height: 64, text: '', font:{color: android.graphics.Color.rgb(255, 255, 255), shadow: 0, size: sizeElements*1.5, alignment: 0}},
            'armorSlot1': { type: 'slot', x: 0, y: 200, size: sizeElements*3, visual: true, bitmap: 'transparent', needClean: false, isTransparentBackground: true },
            'armorName2': {type: 'text', x: 200, y: 435, width: 600, height: 64, text: '', font:{color: android.graphics.Color.rgb(255, 255, 255), shadow: 0, size: sizeElements*1.5, alignment: 0}},
            'armorSlot2': { type: 'slot', x: 0, y: 400, size: sizeElements*3, visual: true, bitmap: 'transparent', needClean: false, isTransparentBackground: true },
            'armorName3': {type: 'text', x: 200, y: 635, width: 600, height: 64, text: '', font:{color: android.graphics.Color.rgb(255, 255, 255), shadow: 0, size: sizeElements*1.5, alignment: 0}},
            'armorSlot3': { type: 'slot', x: 0, y: 600, size: sizeElements*3, visual: true, bitmap: 'transparent', needClean: false, isTransparentBackground: true },
        }
    }),
    open:function(){
        if(!this.isEnabled){
            this.container.openAs(this.window);
            this.isEnabled = true;
        }
    },
    close:function(){
        if(this.isEnabled){
            this.container.close();
            this.isEnabled = false;
        }
    }
};

Armor.window.setAsGameOverlay(true);
Armor.window.setTouchable(false);





// file: windows/carriedItem.js

let ItemCarried = {
    isEnabled: false,
    container: new UI.Container(),
    window: new UI.Window({
        location: {
            x: 0,
            y: getHeight-getHeight/10,
            width: getHeight/2,
            height: getHeight/10
        },
        drawing:[{
            type: 'background', color: 0//android.graphics.Color.parseColor('#c6c6c6')
            }],
        elements:{
            'carriedItemName': {type: 'text', x: 200, y: yElementPosition, width: 300, height: 50, text: '', font:{color: android.graphics.Color.rgb(255, 255, 255), shadow: 0, size: sizeElements, alignment: 0}},
            'carriedItemTexture': { type: 'slot', x: 0, y: 0, size: sizeElements*3.6, visual: true, bitmap: 'transparent', needClean: false, isTransparentBackground: true },
        }
    }),
    open:function(){
        if(!this.isEnabled){
            this.container.openAs(this.window);
            this.isEnabled = true;
        }
    },
    close:function(){
        if(this.isEnabled){
            this.container.close();
            this.isEnabled = false;
        }
    }
};

ItemCarried.window.setAsGameOverlay(true);
ItemCarried.window.setTouchable(false);





// file: windows/playerHealth.js

let PlayerHealth = {
    isEnabled: false,
    container: new UI.Container(),
    window: new UI.Window({
        location: {
            x: 500-getHeight/6.7,
            y: getHeight/16,
            width: getHeight/3,
            height: getHeight/10
        },
        drawing:[{
            type: 'background', color: 0//android.graphics.Color.parseColor('#c6c6c6')
            }],
        elements:{
            'playerName': {type: 'text', x: 350, y: 0, width: 350, height: 50, text: '', font:{color: android.graphics.Color.rgb(255, 255, 255), shadow: 0, size: sizeElements*1.5, alignment: 1}},//0,255,0
            'playerHealth': { type: 'text', x: 350, y: yElementPosition*2, width: 300, height: 50, text: '',  font:{color: android.graphics.Color.rgb(255, 255, 255), shadow: 0, size: sizeElements*1.5, alignment: 1}},//255,255,0 
        }
    }),
    open:function(){
        if(!this.isEnabled){
            this.container.openAs(this.window);
            this.isEnabled = true;
        }
    },
    close:function(){
        if(this.isEnabled){
            this.container.close();
            this.isEnabled = false;
        }
    }
};

PlayerHealth.window.setAsGameOverlay(true);
PlayerHealth.window.setTouchable(false);





// file: igi.js

let inGame = false;
Callback.addCallback('NativeGuiChanged', function(screenName){
    if(screenName == 'in_game_play_screen'){
        inGame = true;
        //alert('isItCarBool '+itemCarriedInfo);
        if(buttonEnabled) PowerButton.open();
        
		if(arrayBoolens[0][1]) XML.open();
		if(arrayBoolens[1][1]) ItemCarried.open();
		if(arrayBoolens[2][1]) Armor.open();
	    if(arrayBoolens[3][1]) PlayerHealth.open();
		}
	else {
        inGame = false;
        PowerButton.close();
        
		XML.close();
		ItemCarried.close();
		Armor.close();
	    PlayerHealth.close();
		}
});


let countDays = 0, getWorldTime=0, allHoursOfDay=0, allMinutesOfDay=0, hours = 0, minutes = 0; dayFase = null, getlvl = 0, getNextlvl = 0, k1 = 0, k2 = 0, previousMaxExp = 0, maxExp = 0, currentExp = 0, percentExp = 0, biomename = null, t = 0, lasttime = -1, frame = 0, getPosition = null;

Callback.addCallback('LocalTick', function(){
   // if(playerUid){
    if(arrayBoolens[0][1] && !XML.isEnabled && inGame) XML.open();
        else if(!arrayBoolens[0][1]) XML.close();
    if(XML.isEnabled){
        
        
			//BIOME
            
        if(biomeInfo){
            //getPosition = Entity.getPosition(playerUid);
			getPosition = Player.getPosition();
            getBiomeId = World.getBiome(getPosition.x, getPosition.z); 
            
            XML.window.container.setText('biome', 'Biome: ' + biomesNames[getBiomeId]);
        }else XML.window.container.setText('biiome', '');
	    
        
        
			//EXP
            
        if(expInfo){
	        getlvl = Player.getLevel();
	        getNextlvl = Player.getLevel()+1;
	
	        if(getlvl <= 16)previousMaxExp = Math.pow(getlvl, 2) + 6*getlvl;
	            else if(getlvl >= 17 && getlvl <= 31)previousMaxExp = 2.5*Math.pow(getlvl, 2) - 40.5*getlvl + 360;
	                else previousMaxExp = 4.5*Math.pow(getlvl, 2) - 162.5*getlvl + 2220;

	        if(getNextlvl <= 16)maxExp = Math.pow(getNextlvl, 2) + 6*getNextlvl;
	            else if(getNextlvl >= 17 && getNextlvl <= 31)maxExp = 2.5*Math.pow(getNextlvl, 2) - 40.5*getNextlvl + 360;
	                else maxExp = 4.5*Math.pow(getNextlvl, 2) - 162.5*getNextlvl + 2220;
	
	        k1 = maxExp-previousMaxExp;
	        k2 = currentExp-previousMaxExp;
	        currentExp = Player.getExperience();
	        percentExp = Math.round((k2/k1)*100);
	        //Game.tipMessage(previousMaxExp);
            //Game.tipMessage('start ' + currExp);
            
            XML.window.container.setText('exp', 'EXP: ' + currentExp + ' / ' + maxExp + ' (' + percentExp + '%)');
	    }else XML.window.container.setText('exp', '');
        
        
        
				//FPS
                
        if(fpsInfo){
            t = Debug.sysTime();
            if(frame++ % 20 == 0){
                if(lasttime != -1){
                    tps = 1000 / (t - lasttime) * 20;
                  
                    XML.window.container.setText('fps', 'FPS: ' + Math.round(tps * 10) / 10);
                }
                lasttime = t;
		    }
        }else XML.window.container.setText('fps', '');
	    
        
		
            //light
            
        if(lightInfo){
            //alert('light'+lightinfo);
            point = Player.​getPointed​().pos;
            //point = Entity.getLookVectorByAngle(playerUid);      NaN
	        //Game.tipMessage('x: '+point.x + ', ' + 'y: '+point.y + ', '+ 'z: '+point.z);
        //Game.tipMessage(point.x +' '+ point.y +' '+ point.z);
            XML.window.container.setText('light', 'Light: ' + World.getLightLevel(point.x, point.y+2, point.z) + ' (feet: ' + World.getLightLevel(getPosition.x, getPosition.y-1, getPosition.z) + ')');
		}else XML.window.container.setText('light', '');
        /*
        Entity.getLookVectorByAngle = function(angle) {return {"x":0,"y":0,"z":1};};
Entity.getLookVector = function(ent) {return {"x":0,"y":0,"z":1};};
Entity.getLookAt = function(ent, x, y, z) {return {"yaw":null,"pitch":null};};
Entity.lookAt = function(ent, x, y, z) {};
Entity.lookAtCoords = function(ent, coords) {};
        */
        
        
        
			//TIME

        if(timeInfo){
            getWorldTime = World.getWorldTime();
            //Game.tipMessage(getWorldTime);
			
            //hours
            if(getWorldTime<18000)
				hours = Math.trunc(getWorldTime/1000)+6;
			else if(getWorldTime>=18000 && getWorldTime<42000) hours= Math.trunc((getWorldTime-18000)/1000);
			else if(getWorldTime>= 42000)hours=Math.trunc(((getWorldTime-18000)%24000)/1000);
			
			if(hours>=24)hours=0;
            
            //minutes
            if(getWorldTime>1000) minutes = Math.trunc(getWorldTime%1000/(1000/60));
            else minutes = Math.trunc(getWorldTime/(1000/60));
            
            //add 0 to beg
            if(minutes<=9 && getWorldTime>(1000/60))minutes='0'+minutes;
            else if(getWorldTime<(1000/60))minutes = '00';
           
            if(hours<=9 && getWorldTime>1000)hours='0'+hours;
            else if(getWorldTime<1000)hours= '06';
            
            //days
	        countDays = Math.trunc(getWorldTime/ 24000);
            
            //day fases
	        if(getWorldTime  % 24000 <= 12000) dayFase = 'Day';
	            else dayFase = 'Night';
                
	        //if(getWorldTime%100==0) Game.tipMessage('Day time: ' + getWorldTime);
        
		    XML.window.container.setText('time', 'Day ' + countDays + ', ' + hours + ':' + minutes +  ' (' + dayFase + ' time)');
		}else XML.window.container.setText('time', '');
		
        
        
        //#COORDS
        
		if(coordsInfo){
            //getPosition = Entity.getPosition(playerUid);
			gegPosition = Player.getPosition();
			XML.window.container.setText('x', 'X: ' + parseInt(getPosition.x));
			XML.window.container.setText('z', 'Z: ' + parseInt(getPosition.z));
			XML.window.container.setText('y', 'Y: ' + parseInt(getPosition.y));
		    }else {
                XML.window.container.setText('x', '');
                XML.window.container.setText('y', '');
                XML.window.container.setText('z', '');
                }
    }
    
    
            //#ITEM CARRIED
            
    if(arrayBoolens[1][1] && !ItemCarried.isEnabled  && inGame) ItemCarried.open();
        else if(!arrayBoolens[1][1]) ItemCarried.close();
    if(ItemCarried.isEnabled){
        let carriedItemId = Player.getCarriedItem().id;
        let carriedItemData = Player.getCarriedItem().data;
        let carriedItemName = Item.getName(carriedItemId, carriedItemData);
           //Game.tipMessage(carriedItemName+' window is enabled: '+ItemCarried.isEnabled+', coords: '+coordsInfo);
           
            ItemCarried.window.container.setSlot('carriedItemTexture', carriedItemId, 1, carriedItemData);
            
            if(carriedItemId != 0){//if void
                if(Item.getMaxDamage(carriedItemId) !=0) ItemCarried.window.container.setText('carriedItemName', (Item.getMaxDamage(carriedItemId) - carriedItemData) + ' / ' + Item.getMaxDamage(carriedItemId));
                else ItemCarried.window.container.setText('carriedItemName', carriedItemName);//if dont tool
                }
            else ItemCarried.window.container.setText('carriedItemName', '');
        }    

    
    
             //#ARMOR
             
    if(arrayBoolens[2][1] && !Armor.isEnabled && inGame) Armor.open();
        else if(!arrayBoolens[2][1]) Armor.close();
    if(Armor.isEnabled){
        for(let i = 0 ; i < 4 ; i ++){
            let getDressedArmor = Player.getArmorSlot(i);
            if(getDressedArmor.id == 0){
                Armor.window.container.clearSlot('armorSlot' + i);
                Armor.window.container.setText('armorName' + i, '');
                }
            else {
                Armor.window.container.setSlot( 'armorSlot' + i , getDressedArmor.id , 1, 0);
                Armor.window.container.setText( 'armorName' + i , (Item.getMaxDamage(getDressedArmor.id) - getDressedArmor.data) + ' / ' + Item.getMaxDamage(getDressedArmor.id));
                }
            }
        }
        
        
        
                //#PLAYER HEALTH
       
    if(arrayBoolens[3][1] && !PlayerHealth.isEnabled && inGame) PlayerHealth.open();
        else if(!arrayBoolens[3][1]) PlayerHealth.close();
    if(PlayerHealth.isEnabled){
		PlayerHealth.window.container.setText('playerName', 'Player');// Player.getNameForEnt(Player.get()));
        PlayerHealth.window.container.setText('playerHealth', Player.getHealth()*50+'/1000');
      //  PlayerHealth.window.container.setText('playerName', Entity.getNameTag(playerUid));
       // PlayerHealth.window.container.setText('playerHealth', Entity.getHealth(playerUid)*50+'/'+Entity.getMaxHealth(playerUid)*50);
    }
    //Game.tipMessage(Entity.getNameTag(playerUid)+': '+Entity.getHealth(playerUid)+'/'+Entity.getMaxHealth(playerUid)); 
    //Player.getNameForEnt(Player.get()) - deprecated Entity.getNameTag
   /*ent. getHealth = function(ent) {return 6;};
Entity.getMaxHealth = function(ent) {return 6;};
    
    */
    //}
}); 




