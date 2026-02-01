let Creative = __config__.getBool("in_creative");

var Compress = { 
    
    addBlock: function(id,params,props){
        
        if(!params.textureData) params.textureData = 0;
        if(!props.destroyTime) props.destroyTime = 6;
        if(!props.level) props.level = 1;
        if(!props.material) props.material = "stone";
        IDRegistry.genBlockID(id);
        Block.createBlock(id,
        [{name:params.name,
        texture:[[params.texture,params.textureData]],
        inCreative:Creative}],"opaque");
        let ID = BlockID[id];
        ToolAPI.registerBlockMaterial(ID,props.material,props.level,true);
        Block.setDestroyTime(ID,props.destroyTime);
        Block.setDestroyLevel(ID,props.level);
    },
    
    addCraft: function(item,material){
        if(!material.data) material.data = 0;
        if(!material.count) material.count = 9;
        if(!item.count) item.count = 1;
        if(!item.data) item.data = 0;
        Recipes.addShaped({id:item.id,count:item.count,data:item.data},[
        "aaa",
        "aaa",
        "aaa"
        ],["a",material.id,material.data]);
        Recipes.addShapeless({id:material.id,count:material.count,data:material.data},[{id:item.id,data:item.data}]);
    },
    
    Local: {
        RU: function(str,RU){
        Translation.addTranslation(str,{ru:RU});
        }
    }
    
};