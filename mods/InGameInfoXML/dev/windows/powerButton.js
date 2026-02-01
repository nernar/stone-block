let PowerButton = {
    isEnabled: false,
    container: new UI.Container(),
    window: new UI.Window({
        location: {
            x: 1000-getHeight/14,
            y: 0,
            width: getHeight/14,
            height: getHeight/14 
        },
        drawing:[{
            type: 'background', color: 0//android.graphics.Color.parseColor('#c6c6c6')
            }],
        elements:{
              'button': {type: 'button', bitmap: 'buttonPower', x: 0, y: 0, scale: 59, clicker: { 
                    onClick: function(container){ 
                         for(let j = 0; j<4; j++)
                            if(arrayBoolens[j][0]==1) arrayBoolens[j][1]=!arrayBoolens[j][1];
                            //alert('click: '+arrayBoolens[2][1]+', клік: '+arrayBoolens[1][1]);
                    }
               }
          }
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

PowerButton.window.setAsGameOverlay(true);
PowerButton.window.setTouchable(true);

