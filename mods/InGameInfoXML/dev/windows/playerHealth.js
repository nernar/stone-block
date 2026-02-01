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

