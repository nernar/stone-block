var Torch = Block.createSpecialType({
	opaque: false,
	lightlevel: 13,
	lightopacity: 0,
	destroytime: 0.05,
	renderlayer: 3,
	rendertype: 2
});

IDRegistry.genBlockID("interdiction_torch");
Block.createBlock("interdiction_torch", [
    {name: "Interdiction Torch", texture: [["interdiction_torch", 0]], inCreative: true},
    {name: "Interdiction Torch", texture: [["interdiction_torch", 1]], inCreative: false}
], Torch);
SetDescription(BlockID.interdiction_torch, Translation.translate("§3Click or use the red stone to charge the block."));
Block.setBlockShape(BlockID.interdiction_torch, {x: 7/16, y: 0, z: 7/16}, {x: 9/16, y: 9/16, z: 9/16});


Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.interdiction_torch, count: 2, data: 0}, 
	["ada", 
	 "dcd",
	 "bbb"],
	["a", 76, 0, "b", 348, 0, "c", ItemID.philosophersStone, 0, "d", 264, 0],
	function(api, field, result){
		for (var i in field) if(field[i].id != ItemID.philosophersStone) api.decreaseFieldSlot(i);
	});
});

TileEntity.registerPrototype(BlockID.interdiction_torch, {
    defaultValues: {work: false, redstone: false},
    init: function(){
    	if(this.data.work || this.data.redstone){
    		World.setBlock(this.x, this.y, this.z, BlockID.interdiction_torch, 0);
    	}else{
    		World.setBlock(this.x, this.y, this.z, BlockID.interdiction_torch, 1);
    	};
    },
    click: function(){
    	if(Entity.getSneaking(Player.get()) && Player.getCarriedItem().id != 0) return false;
    	if(this.data.work){
    		this.data.work = false;
    		World.setBlock(this.x, this.y, this.z, BlockID.interdiction_torch, 1);
    		Game.message("§c"+Translation.translate("Interdiction Torch")+": "+Translation.translate("false"));
    	}else{
    		this.data.work = true;
    		World.setBlock(this.x, this.y, this.z, BlockID.interdiction_torch, 0);
    		Game.message("§9"+Translation.translate("Interdiction Torch")+": "+Translation.translate("true"));
    	}
    	return true;
    },
    tick: function(){
    	if(this.data.work || this.data.redstone){
    		for(j in evilList) this.work(evilList[j], true);
    		this.work(102);
    		this.work(94);
    		this.work(91);
    		this.work(89);
    		this.work(87);
    		this.work(86);
    		this.work(85);
    		this.work(82);
    		this.work(81);
    		this.work(80);
    		this.work(79);
    		this.work(76);
    		this.work(73);
    	};
    },
    redstone: function(params){
    	if(this.data.redstone == params.power>0) return;
    	else if(params.power<=0){
    		this.data.redstone = false;
    		World.setBlock(this.x, this.y, this.z, BlockID.interdiction_torch, 1);
    	}else{
    		this.data.redstone = true;
    		World.setBlock(this.x, this.y, this.z, BlockID.interdiction_torch, 0);
    	}
    },
    work: function(id, speed_down){
    	let ent = Entity.getAllInRange(this, 6, id);
    	for(i in ent){
    		let X=this.x, Y=this.y, Z=this.z;
    		let x=Entity.getPosition(ent[i]).x-X;
    		let y=Entity.getPosition(ent[i]).y-Y;
    		let z=Entity.getPosition(ent[i]).z-Z;
    		let dis=Math.sqrt(x*x+y*y+z*z);
    		let vel=(6-dis) / (speed_down ? 3 : 1);
    		if(vel>0) Entity.addVelocity(ent[i], vel*x/dis, vel*y/dis, vel*z/dis);
    	}
    }
});
