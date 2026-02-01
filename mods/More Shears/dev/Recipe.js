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