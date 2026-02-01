//black
IDRegistry.genItemID("ex_slimeBallBlack");
Item.createItem("ex_slimeBallBlack", "Black Slime Ball", {
    name: "ex_BlackSlimeBall",
    meta: 0
});
/*
IDRegistry.genItemID("emeraldBlack");
Item.createItem("emeraldBlack","Black Emerald",
{name:"ex_BlackEmerald", meta:   0  });
IDRegistry.genBlockID("emeraldBlack"); 
Block.createBlock("emeraldBlack", [
{name: "", texture: 
[["黑色绿宝石", 0]], inCreative: false}
]);
Block.setShape(BlockID.emeraldBlack, 7.5/16, c0, c0, 8.5/16, c16, c16);
Item.registerUseFunction("emeraldBlack", function(coords, item, block){
var place = coords.relative;
if(GenerationUtils.isTransparentBlock(World.getBlockID(place.x, place.y, place.z))){
World.setBlock(place.x, place.y, place.z, BlockID.emeraldBlack);
Player.setCarriedItem(item.id, item.count - 1, item.data);
World.addTileEntity(place.x, place.y, place.z);
}
});

Callback.addCallback("Explosion", function(coords, params){
var x = coords.x;
var y = coords.y;
var z = coords.z;
if(World.getBlockID(x,y,z)===BlockID.emeraldBlack&&
World.getBlockID(x,y+1,z)!==0&&World.getBlockID(x+1,y,z)!==0&&World.getBlockID(x,y,z+1)!==0&&World.getBlockID(x,y-1,z)!==0&&World.getBlockID(x-1,y,z)!==0&&World.getBlockID(x,y,z-1)!==0){
Particles.line(ParticleType.flame,x+1,x-1,0.2,1,0);
Particles.line(ParticleType.flame,y+1,y-1,0.2,1,0);
Particles.line(ParticleType.flame,z+1,z-1,0.2,1,0);
Particles.line(ParticleType.flame,x+1,y-1,0.2,1,0);
Particles.line(ParticleType.flame,x+1,z-1,0.2,1,0);
Particles.line(ParticleType.flame,y+1,x-1,0.2,1,0);
Particles.line(ParticleType.flame,y+1,z-1,0.2,1,0);
Particles.line(ParticleType.flame,z+1,x-1,0.2,1,0);
Particles.line(ParticleType.flame,z+1,y-1,0.2,1,0);
Player.setCarriedItem(264,count+2,0);
}
});
*/
EXCore.defineAllSalts("Copper","ore_salts_copper");
EXCore.defineAllSalts("Tin","ore_salts_tin");
EXCore.defineAllSalts("Lead","ore_salts_lead");
EXCore.defineAllSalts("Silver","ore_salts_silver");
EXCore.defineAllSalts("Iron","ore_salts_Iron");
EXCore.defineAllSalts("Gold","ore_salts_gold");
EXCore.defineAllSalts("Nickel","ore_salts_nickel");
EXCore.defineAllSalts("Platinum","ore_salts_platinum");


/*var Graphics = android.graphics;
var Drawable = Graphics.drawable;
var BitmapDrawable = Drawable.BitmapDrawable;
var Color = android.graphics.Color;

function average(color, color2, f) {
    //fuck code
    var r1 = color >> 16 & 0xff;
    var g1 = color >> 8 & 0xff;
    var b1 = color & 0xff;
    var r2 = color2 >> 16 & 0xff;
    var g2 = color2 >> 8 & 0xff;
    var b2 = color2 & 0xff;
    var r = r1 + (r2 - r1) * f;
    var g = g1 + (g2 - g1) * f;
    var b = b1 + (b2 - b1) * f;
    return Color.rgb(r, g, b);
}

for(var a = 0;a<=20;a++){

var paint = new android.graphics.Paint();
var options = new android.graphics.BitmapFactory.Options();
options.inScaled = false;
var bitmap_1 = new android.graphics.BitmapFactory.decodeFile("/storage/emulated/0/bluetooth/" + "dirt.png", options);
var bitmap_2 = new android.graphics.BitmapFactory.decodeFile("/storage/emulated/0/bluetooth/" + "ex_"+a+"_0.png", options);
for(var i=0;i<=100;i++){
var PutBitmap = new android.graphics.Bitmap.createBitmap(16, 16, android.graphics.Bitmap.Config.ARGB_8888);
var PutCanvas = new android.graphics.Canvas(PutBitmap);
for (var width = 0; width < 16; width++) {
    for (var height = 0; height < 16; height++) {
        var pixels_1 = bitmap_1.getPixel(width, height);
        var pixels_2 = bitmap_2.getPixel(width, height);
        var mixColor = average(pixels_1, pixels_2, i / 100);
        paint.setARGB(255, mixColor >> 16 & 0xff, mixColor >> 8 & 0xff, mixColor & 0xff);
        PutCanvas.drawPoint( width, height, paint);
    };
};
var bos = new java.io.ByteArrayOutputStream();
PutBitmap.compress(android.graphics.Bitmap.CompressFormat.PNG, 100, bos);
var fileOutputStream = new java.io.FileOutputStream("/storage/emulated/0/bluetooth/"+"_"+a+"_"+(100-i)+".png");
fileOutputStream.write(bos.toByteArray());
}

}*/