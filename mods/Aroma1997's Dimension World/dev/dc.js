var mdc = {
    isEnabled: false,
    container: new UI.Container(),
    windowContainer: new UI.Container(),
    dc: new UI.Window({
        location: {
            x: 1000,
            y: 245,
            width: 50,
            height: 50
        },
        drawing:[
            {type: "background", color: 0}
        ],
        elements:{
            "dc":{type: "button", scale: 50, bitmap: "dc", clicker:{onClick:function(){
                      }},
					}
				}
			}),
    open:function(){
        if(!this.isEnabled){
            this.container.openAs(this.dc);
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
    

mdc.dc.setAsGameOverlay(true);

Callback.addCallback("NativeGuiChanged", function (screenName) {
    if(screenName == "in_game_play_screen" && screenName != "hud_screen" && Player.getCarriedItem().id==ItemID.dimensionchanger) {
        mdc.open();
    }else if(mdc.isEnabled){
        mdc.close();
    }
});


var ch = 0;
/*var pgd = Player.getDimension();*/
var setRequiresIconOverride = ModAPI.requireGlobal("Item.setRequiresIconOverride");
var tpm = mineworld.getTeleporter();
var tpb = mineworld.getTeleporterBack();

Item.registerIconOverrideFunction(ItemID.dimensionchanger, function(item, texture){
return {name: "dimensionchanger", meta: ch}
});
setRequiresIconOverride(ItemID.dimensionchanger, true);

Callback.addCallback("tick", function(){
	let time = World.getThreadTime()%20;
	if(time == 0 || time == 20){
		let item = Player.getCarriedItem();
		if(item.id == ItemID.dimensionchanger){
			mdc.open();
			if(mdc.container.isElementTouched("dc")){
				if(ch < 4){
					ch++;
					}else{
						if(Player.getDimension()==mineworld){
							tpb.enter();
						}else{
						if(Player.getDimension()==0){
							tpm.enter();
						}}
						ch = 0;
						}
						}
						}else{
							mdc.close();
          
	   }
	}
});
