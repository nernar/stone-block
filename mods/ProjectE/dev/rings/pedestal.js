IDRegistry.genBlockID("pedestalMatter");
Block.createBlock("pedestalMatter", [
	 {name: "Matter pedestal", texture: [
	   ["dmBlock",0],
  ],inCreative: __config__.getBool("物品方块.暗物质台座")}
], Block.createSpecialType({base: 1, renderlayer: 3}));
SetDescription(BlockID.pedestalMatter, Translation.translate("§3Sneak click to make the Ring work."));

(function Setpedestal(id){
	var Collision = new ICRender.CollisionShape();
	Collision.addEntry()
		.addBox(3/16, 0, 3/16, 13/16, 2/16, 13/16)
		.addBox(6/16, 2/16, 6/16, 10/16, 9/16, 10/16)
		.addBox(5/16, 9/16, 5/16, 11/16, 10/16, 11/16);
	BlockRenderer.setCustomCollisionShape(id, 0, Collision);

	var render = new ICRender.Model();
	var model = BlockRenderer.createModel();
	model.addBox(3/16, 0, 3/16, 13/16, 2/16, 13/16, id, 0);
	model.addBox(6/16, 2/16, 6/16, 10/16, 9/16, 10/16, id, 0);
	model.addBox(5/16, 9/16, 5/16, 11/16, 10/16, 11/16, id, 0);
	render.addEntry(model);
	BlockRenderer.setStaticICRender(id, 0, render);
})(BlockID.pedestalMatter);


Callback.addCallback("PostLoaded", function (){
if(__config__.getBool("物品方块.暗物质台座")){
	if(hard_mode){
		Recipes.addShaped({id: BlockID.pedestalMatter, count: 1, data: 0}, 
		["rir", 
		 "rir",
		 "iii"],
		["r", BlockID.rmBlock, 0, "i", BlockID.dmBlock, 0]);
	}else{
		Recipes.addShaped({id: BlockID.pedestalMatter, count: 1, data: 0}, 
		["rir", 
		 "rir",
		 "iii"],
		["r", ItemID.redMatter, 0, "i", BlockID.dmBlock, 0]);
	}
}
});

var pedestalUI = new UI.StandartWindow({
    standart: {
        header: {text: {text: Translation.translate("Pedestal")}},
        inventory: {standart: true},
        background: {standart: true}
    },
    elements: {
        "ring": {type: "slot", x: 550, y: 200},
    }
});

TileEntity.registerPrototype(BlockID.pedestalMatter, {
    defaultValues: {active: false},
    initAnimation: function(){
    	var ths = this;
    	if(ths.container){
    		ths.animation.describeItem({
    		    id: ths.container.getSlot("ring").id,
    		    data: ths.container.getSlot("ring").data,
    		    count: 1, rotation: "y", size: 6/16
    		});
    		ths.animation.load();
    	}
    },
    init: function(){
    	this.animation = new Animation.Item(this.x+0.5, this.y+13/16, this.z+0.5);
    	this.initAnimation();
    },
    destroy: function(){
    	if(this.animation) this.animation.destroy();
    },
    getGuiScreen: function(){
    	return pedestalUI;
    },
    click: function(){
    	if(Entity.getSneaking(Player.get()) && Rings.getPedestalFunction(this.container.getSlot("ring").id)){
    		this.data.active = !this.data.active;
    		if(this.data.active){
    			Game.message("§9"+Translation.translate("Ring activated!"));
    			PlaySoundFile("pecharge.ogg");
    			return true;
    		} else {
    			Game.message("§c"+Translation.translate("Ring disabled!"));
    			PlaySoundFile("peuncharge.ogg");
    			return true;
    		}
    	}
    },
    redstone: function(params){
    	if(params.power>0 && Rings.getPedestalFunction(this.container.getSlot("ring").id)){
    		this.data.active = !this.data.active;
    		if(this.data.active){
    			Game.message("§9"+Translation.translate("Ring activated!"));
    			PlaySoundFile("pecharge.ogg");
    		} else {
    			Game.message("§c"+Translation.translate("Ring disabled!"));
    			PlaySoundFile("peuncharge.ogg");
    		}
    	}
    },
    tick: function(){
    	let ring = this.container.getSlot("ring");
    	let coords = {x: this.x, y: this.y, z: this.z};
    	if(World.getThreadTime()%10 == 0) this.initAnimation();
    	if(this.data.active && Rings.getPedestalFunction(ring.id)){
    		Rings.getPedestalFunction(ring.id)(this, coords);
    	};
    	if(this.data.active&&this.container.getSlot("ring").id==0){
    		this.data.active=false;
    		Game.message("§c"+Translation.translate("Ring disabled!"));
    		PlaySoundFile("peuncharge.ogg");
    	};
    }
});
