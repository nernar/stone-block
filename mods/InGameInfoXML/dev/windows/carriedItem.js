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

