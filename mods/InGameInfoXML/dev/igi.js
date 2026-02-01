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
