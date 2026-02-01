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

