/*
BUILD INFO:
  dir: dev
  target: main.js
  files: 4
*/



// file: Translation.js

Translation.addTranslation( "Shears", { zh : "剪刀" , ru : "Ножницы" } );
Translation.addTranslation( "Enhanced Shears", { zh : "特制剪刀" , ru : "Усиленный Ножницы" } );

Translation.addTranslation( "Wooden Shears", { zh : "木剪刀" , ru : "дерево Ножницы" } );
Translation.addTranslation( "Flint Shears", { zh : "燧石剪刀" , ru : "Кремень Ножницы" } );
Translation.addTranslation( "Stone Shears", { zh : "石剪刀" , ru : "Камень Ножницы" } );
Translation.addTranslation( "Bone Shears", { zh : "骨剪刀" , ru : "Кость Ножницы" } );
Translation.addTranslation( "Gold Shears", { zh : "金剪刀" , ru : "Золотой Ножницы" } );
Translation.addTranslation( "Quartz Shears", { zh : "下界石英剪刀" , ru : "Кварц Нижнего мира Ножницы" } );
Translation.addTranslation( "Diamond Shears", { zh : "钻石剪刀" , ru : "Алмаз Ножницы" } );
Translation.addTranslation( "Emerald Shears", { zh : "绿宝石剪刀" , ru : "Изумруд Ножницы" } );
Translation.addTranslation( "Obsidian Shears", { zh : "黑曜石剪刀" , ru : "Обсидиан Ножницы" } );

Translation.addTranslation( "Bronze Shears", { zh : "青铜剪刀" , ru : "Бронзовый Ножницы" } );

Translation.addTranslation( "Copper Shears", { zh : "铜剪刀" , ru : "Медный Ножницы" } );
Translation.addTranslation( "Tin Shears", { zh : "锡剪刀" , ru : "Оловянный Ножницы" } );
Translation.addTranslation( "Silver Shears", { zh : "银剪刀" , ru : "Серебряный Ножницы" } );
Translation.addTranslation( "Lead Shears", { zh : "铅剪刀" , ru : "Свинцовый Ножницы" } );
Translation.addTranslation( "Aluminum Shears", { zh : "铝剪刀" , ru : "Алюминиевая Ножницы" } );
Translation.addTranslation( "Nickel Shears", { zh : "镍剪刀" , ru : "Никелевая Ножницы" } );
Translation.addTranslation( "Platinum Shears", { zh : "铂剪刀" , ru : "Платиновая Ножницы" } );
Translation.addTranslation( "Steel Shears", { zh : "钢剪刀" , ru : "Стальной Ножницы" } );
Translation.addTranslation( "Electrum Shears", { zh : "琥珀金剪刀" , ru : "Электрумовая Ножницы" } );
Translation.addTranslation( "Invar Shears", { zh : "因瓦合金剪刀" , ru : "Инваровая Ножницы" } );
Translation.addTranslation( "Constantan Shears", { zh : "康铜剪刀" , ru : "Константановая Ножницы" } );

Translation.addTranslation( "Ruby Shears", { zh : "红宝石剪刀" , ru : "Рубиновая Ножницы" } );
Translation.addTranslation( "Sapphire Shears", { zh : "蓝宝石剪刀" , ru : "Сапфировая Ножницы" } );
Translation.addTranslation( "Green Sapphire Shears", { zh : "绿色蓝宝石剪刀" , ru : "зелёного сапфира Ножницы" } );

Translation.addTranslation( "Antimony Shears", { zh : "锑剪刀" , ru : "Сурьмяный Ножницы" } );
Translation.addTranslation( "Copper Shears", { zh : "铜剪刀" , ru : "Медный Ножницы" } );
Translation.addTranslation( "Lead Shears", { zh : "铅剪刀" , ru : "Свинцовый Ножницы" } );
Translation.addTranslation( "Steel Shears", { zh : "钢剪刀" , ru : "Стальной Ножницы" } );
Translation.addTranslation( "Tin Shears", { zh : "锡剪刀" , ru : "Оловянный Ножницы" } );
Translation.addTranslation( "Tungscten Shears", { zh : "钨剪刀" , ru : "Вольфрамовый Ножницы" } );




// file: Shears API.js

function CreateShears ( ID , Name ) {
IDRegistry.genItemID( ID + "_shears" );
Item.createItem( ID + "_shears" , Name + " Shears", { name : ID + "_shears" } , { stack : 1 } );
Item.addCreativeGroup( "shears" , Translation.translate("Shears") , [ ItemID[ ID + "_shears" ] ] );
};

var ShearsList = [];

function SetShears ( ID , Durability ) {
ShearsList.push( ItemID[ ID + "_shears" ] );
Item.setToolRender( ItemID[ ID + "_shears" ] , __config__.getBool( "Tool_Render" ) );
ToolAPI.registerTool( ItemID[ ID + "_shears" ] , { durability : Durability } , [] , {
    calcDestroyTime : function ( tool , coords , block , timeData , defaultTime , enchantData ) {
        if ( block.id == 18 ) return 0.03;
        if ( block.id == 161 ) return 0.03;
        if ( block.id == 30 ) return 0.08;
        if ( block.id == 35 ) return 0.25;
        return defaultTime;
    } ,
    onDestroy : function ( item , coords , block ) {
        if ( Game.getGameMode( ) == 1 ) {
            return false;
        }
    }
});
Item.registerUseFunction( ItemID[ ID + "_shears" ]  , function ( coords , item , block , player ) {
    if ( World.getBlockID( coords.x , coords.y , coords.z ) == 86 ) {
        World.setBlock( coords.x , coords.y , coords.z , 410 , 0 );
        World.drop( coords.x , coords.y + 1 , coords.z , 361 , 4 , 0 );
        Entity.setCarriedItem( player , item.id , 1 , item.data + 1 );
    }
} );
};


function CheckShear ( ID ) {
    for ( let i in ShearsList ) {
        if ( ID == ShearsList[ i ] ) return true;
    };
    if ( ID == 359 ) return true;
    return false;
};

function setBlockDroping ( ID , newFunction ) {
var old = Block.getDropFunction( ID );
Block.registerDropFunction( ID , function ( coords , id , data , diggingLevel , enchant , item , region ) {
    var a = old( coords , id , data , diggingLevel , enchant , item , region ) || [];
    var b = newFunction( coords , id , data , diggingLevel , enchant , item , region ) || [];
    a.forEach( function ( DropData ) {
        b.push( DropData );
    } );
    return b;
} );
};

Callback.addCallback( "PostLoaded" , function () {
    setBlockDroping( 18 , function ( coords , id , data , diggingLevel , enchant , item , region ) {
        if ( CheckShear( item.id ) ) {
            switch ( data ) {
              case 0 :
              case 4 :
              case 8 :
              case 12 : return [ [ id , 1 , 0 ] ];
    
              case 1 :
              case 5 :
              case 9 :
              case 13 : return [ [ id , 1 , 1 ] ];
    
              case 2 :
              case 6 :
              case 10 :
              case 14 : return [ [ id , 1 , 2 ] ];
            
    
              case 3 :
              case 7 :
              case 11 :
              case 15 : return [ [ id , 1 , 3 ] ];
            }
        }
    } );
    setBlockDroping( 161 , function ( coords , id , data , diggingLevel , enchant , item , region ) {
        if ( CheckShear( item.id ) ) {
            switch ( data ) {
              case 0 :
              case 4 :
              case 8 :
              case 12 : return [ [ id , 1 , 0 ] ];
      
              case 1 :
              case 5 :
              case 9 :
              case 13 : return [ [ id , 1 , 1 ] ];
          }
        }
    } );
    setBlockDroping( 31 , function ( coords , id , data , diggingLevel , enchant , item , region ) {
        if ( CheckShear( item.id ) ) return [ [ id , 1 , data ] ];
    } );
    setBlockDroping( 385 , function ( coords , id , data , diggingLevel , enchant , item , region ) {
        if ( CheckShear( item.id ) ) return [ [ -130 , 1 , data ] ];
    } );
    setBlockDroping( 32 , function ( coords , id , data , diggingLevel , enchant , item , region ) {
        if ( CheckShear( item.id ) ) return [ [ id , 1 , data ] ];
    } );
    setBlockDroping( 106 , function ( coords , id , data , diggingLevel , enchant , item , region ) {
        if ( CheckShear( item.id ) ) return [ [ id , 1 , data ] ];
    } );
    setBlockDroping( 175 , function ( coords , id , data , diggingLevel , enchant , item , region ) {
        if ( CheckShear( item.id ) ) {
            if ( data == 2 ) {
                return [ [ 31 , 2 , 1 ] ];
            }
            else if ( data == 3 ) {
                return [ [ 31 , 2 , 2 ] ];
            }
        }
    } );
} );
ModAPI.addAPICallback( "ICore" , function ( api ) {
    setBlockDroping( "rubberTreeLeaves" , function ( coords , id , data , diggingLevel , enchant , item , region ) {
        if ( CheckShear( item.id ) ) return [ [ id , 1 , 2 ] ];
    } );
} );


function ShearsRecipe ( ID , Material , MaterialData ) {
Recipes.addShaped({ id : ItemID[ ID + "_shears" ] , count : 1 , data : 0 } ,
  [ " s" , "s " ] ,
[ 's' , Material , MaterialData ]
);
Item.addRepairItemIds( ItemID[ ID + "_shears" ] , [ ItemID[ ID + "_shears" ] , Material ] );
};




// file: Shears.js

CreateShears( "wood" , "Wooden" );
SetShears( "wood" , 59 );

CreateShears( "flint" , "Flint" );
SetShears( "flint" , 84 );

CreateShears( "stone" , "Stone" );
SetShears( "stone" , 131 );

CreateShears( "bone" , "Bone" );
SetShears( "bone" , 150 );

CreateShears( "gold" , "Gold" );
SetShears( "gold" , 32 );

CreateShears( "quartz" , "Quartz" );
SetShears( "quartz" , 250 );

CreateShears( "diamond" , "Diamond" );
SetShears( "diamond" , 1561 );

CreateShears( "emerald" , "Emerald" );
SetShears( "emerald" , 2345 );

CreateShears( "obsidian" , "Obsidian" );
SetShears( "obsidian" , 2501 );


ModAPI.addAPICallback( "ICore" , function ( api )
{
CreateShears( "IC2_bronze" , "Bronze" );
SetShears( "IC2_bronze" , 350 );
});

ModAPI.addAPICallback( "ThermalExpansionAPI" , function ( api )
{
CreateShears( "TE_copper" , "Copper" );
SetShears( "TE_copper" , 175 );

CreateShears( "TE_tin" , "Tin" );
SetShears( "TE_tin" , 200 );

CreateShears( "TE_silver" , "Silver" );
SetShears( "TE_silver" , 200 );

CreateShears( "TE_lead" , "Lead" );
SetShears( "TE_lead" , 150 );

CreateShears( "TE_aluminum" , "Aluminum" );
SetShears( "TE_aluminum" , 225 );

CreateShears( "TE_nickel" , "Nickel" );
SetShears( "TE_nickel" , 300 );

CreateShears( "TE_platinum" , "Platinum" );
SetShears( "TE_platinum" , 1700 );

CreateShears( "TE_steel" , "Steel" );
SetShears( "TE_steel" , 500 );

CreateShears( "TE_electrum" , "Electrum" );
SetShears( "TE_electrum" , 100 );

CreateShears( "TE_invar" , "Invar" );
SetShears( "TE_invar" , 450 );

CreateShears( "TE_bronze" , "Bronze" );
SetShears( "TE_bronze" , 500 );

CreateShears( "TE_constantan" , "Constantan" );
SetShears( "TE_constantan" , 275 );
});

ModAPI.addAPICallback( "RedCore" , function ( api )
{
CreateShears( "RP_ruby" , "Ruby" );
SetShears( "RP_ruby" , 500 );

CreateShears( "RP_sapphire" , "Sapphire" );
SetShears( "RP_sapphire" , 500 );

CreateShears( "RP_green_sapphire" , "Green Sapphire" );
SetShears( "RP_green_sapphire" , 500 );
});

ModAPI.addAPICallback( "ETech" , function ( api )
{
CreateShears( "ET_antimony" , "Antimony" );
SetShears( "ET_antimony" , 104 );

CreateShears( "ET_bronze" , "Bronze" );
SetShears( "ET_bronze" , 80 );

CreateShears( "ET_copper" , "Copper" );
SetShears( "ET_copper" , 250 );

CreateShears( "ET_lead" , "Lead" );
SetShears( "ET_lead" , 474 );

CreateShears( "ET_steel" , "Steel" );
SetShears( "ET_steel" , 490 );

CreateShears( "ET_tin" , "Tin" );
SetShears( "ET_tin" , 235 );

CreateShears( "ET_tungsten" , "Tungscten" );
SetShears( "ET_tungsten" , 640 );
});




// file: Recipe.js

ShearsRecipe( "wood" , 5 , -1 );

ShearsRecipe( "stone" , 4 , 0 );

ShearsRecipe( "flint" , 318 , 0 );

ShearsRecipe( "bone" , 352 , 0 );

ShearsRecipe( "gold" , 266 , 0 );

ShearsRecipe( "quartz" , 406 , 0 );

ShearsRecipe( "diamond" , 264 , 0 );

ShearsRecipe( "emerald" , 388 , 0 );

ShearsRecipe( "obsidian" , 49 , 0 );



ModAPI.addAPICallback( "ICore" , function ( api )
{
ShearsRecipe( "IC2_bronze" , ItemID.ingotCopper , 0 );
});

ModAPI.addAPICallback( "ThermalExpansionAPI" , function ( api )
{
ShearsRecipe( "TE_copper" , ItemID.ingotCopper , 0 );

ShearsRecipe( "TE_tin" , ItemID.ingotTin , 0 );

ShearsRecipe( "TE_silver" , ItemID.ingotSilver , 0 );

ShearsRecipe( "TE_lead" , ItemID.ingotLead , 0 );

ShearsRecipe( "TE_aluminum" , ItemID.ingotAluminum , 0 );

ShearsRecipe( "TE_nickel" , ItemID.ingotNickel , 0 );

ShearsRecipe( "TE_platinum" , ItemID.ingotPlatinum , 0 );

ShearsRecipe( "TE_steel" , ItemID.ingotSteel , 0 );

ShearsRecipe( "TE_electrum" , ItemID.ingotElectrum , 0 );

ShearsRecipe( "TE_invar" , ItemID.ingotInvar , 0 );

ShearsRecipe( "TE_bronze" , ItemID.ingotBronze , 0 );

ShearsRecipe( "TE_constantan" , ItemID.ingotConstantan , 0 );
});

ModAPI.addAPICallback( "RedCore" , function ( api )
{
ShearsRecipe( "RP_ruby" , ItemID.gemRuby , 0 );

ShearsRecipe( "RP_sapphire" , ItemID.gemSapphire , 0 );

ShearsRecipe( "RP_green_sapphire" , ItemID.gemGreenSapphire , 0 );
});




