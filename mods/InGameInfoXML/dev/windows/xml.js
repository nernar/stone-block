let XML = {
    isEnabled: false,
    container: new UI.Container(),
    window: new UI.Window({
        location: {
            x: 0,
            y: 0,
            width: getHeight/2,
            height: getHeight/2
        },
        drawing:[{
            type: 'background', color: 0//android.graphics.Color.parseColor('#c6c6c6')
            }],
        elements:{
			'time': {type: 'text', x: 0, y: yElementPosition*timeInfoPosition, width: 800, height: 32, text: '', font:{color: android.graphics.Color.rgb(255, 255, 255), shadow: 0, size: sizeElements, alignment: 0}},
			'biome': {type: 'text', x: 0, y: yElementPosition*biomeInfoPosition, width: 800, height: 32, text: '', font:{color: android.graphics.Color.rgb(255, 255, 255), shadow: 0, size: sizeElements, alignment: 0}},
			'light': {type: 'text', x: 0, y: yElementPosition*lightInfoPosition, width: 800, height: 32, text: '', font:{color: android.graphics.Color.rgb(255, 255, 255), shadow: 0, size: sizeElements, alignment: 0}},
			'exp': {type: 'text', x: 0, y: yElementPosition*expInfoPosition, width: 800, height: 32, text: '', font:{color: android.graphics.Color.rgb(255, 255, 255), shadow: 0, size: sizeElements, alignment: 0}},
			'fps': {type: 'text', x: 0, y: yElementPosition*fpsInfoPosition, width: 800, height: 32, text: '', font:{color: android.graphics.Color.rgb(255, 255, 255), shadow: 0, size: sizeElements, alignment: 0}},
			
			'x': {type: 'text', x: 0, y: yElementPosition*coordsInfoPosition, width: 800, height: 32, text: '', font:{color: android.graphics.Color.rgb(255, 255, 255), shadow: 0, size: sizeElements, alignment: 0}},
			'z': {type: 'text', x: 0, y: yElementPosition*(coordsInfoPosition+1), width: 800, height: 32, text: '', font:{color: android.graphics.Color.rgb(255, 255, 255), shadow: 0, size: sizeElements, alignment: 0}},
			'y': {type: 'text', x: 0, y: yElementPosition*(coordsInfoPosition+2), width: 800, height: 32, text: '', font:{color: android.graphics.Color.rgb(255, 255, 255), shadow: 0, size: sizeElements, alignment: 0}},
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

XML.window.setAsGameOverlay(true);
XML.window.setTouchable(false);

