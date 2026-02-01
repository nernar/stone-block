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