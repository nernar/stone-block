var Rings = {
  pedestal: {},
  inventory: {},
  activateadble: {},
  addRingFunction: function(ring, func){
    this.inventory[ring] = func;
  },
  addPedestalFunction: function(ring, func){
    this.pedestal[ring] = func;
  },
  getPedestalFunction: function(ring){
    return this.pedestal[ring]
  },
  getRingFunction: function(ring){
    return {
      inv: this.inventory[ring]
    };
  },
  get: function(id){
    for(i = 0; i <= 36; i ++){
      if(Player.getInventorySlot(i).id == id){
        obj = Player.getInventorySlot(i);
        return obj;
      }
    }
  },
  getHotbar: function(id){
    for(i = 0; i <= 9; i ++){
      if(Player.getInventorySlot(i).id == id){
        obj = Player.getInventorySlot(i);
        return obj;
      }
    }
  },
  float: function(id, func){
    var float_fly=false;
    Callback.addCallback("tick", function(){
      this.p = Player.getPosition();
      if(func() && !Entity.getSneaking(Player.get()) &&
        World.getBlockID(this.p.x, this.p.y-0.8, this.p.z) == 0 &&
        World.getBlockID(this.p.x, this.p.y-1.8, this.p.z) == id
      ){
        if(!float_fly){float_fly=true};
        Player.setFlying(true);
        Player.setVelocity(Player.getVelocity().x, 0, Player.getVelocity().z);
      }else if(float_fly){
        float_fly=false;
        if(!Player.getFlyingEnabled() && Game.getGameMode()!==1){
          Player.setFlying(false);
        };
      };
    });
  },
};

Rings.activateRing = function(a,b,sound){
  Rings.activateable = {a: b};
  Callback.addCallback("ItemUse",function(){
  item = Player.getCarriedItem();
    if(item.id==a){
      Player.setCarriedItem(b,1,0);
      if(sound) PlaySoundFile("pecharge.ogg");
    }
    if(item.id==b){
      Player.setCarriedItem(a,1,0);
      if(sound) PlaySoundFile("peuncharge.ogg");
    }
  });
};