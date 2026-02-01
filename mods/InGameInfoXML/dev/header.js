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
