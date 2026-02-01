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