importLib("ToolLib", "*");
importLib("SoundLib", "*");
importLib("UIAPI", "*");
importLib("StorageInterface", "*");
importLib("BlockModelLibs", "*");
importLib("BlockEngine", "*");
importLib("LiquidSet", "*");
importLib("BcuketRegister", "*");

var requireMethodFromNativeAPI = ModAPI.requireGlobal("requireMethodFromNativeAPI");
var Level = ModAPI.requireGlobal("Level");
var callRandomTick = requireMethodFromNativeAPI("api.NativeBlock", "onRandomTickCallback");
var EntityGetYaw = ModAPI.requireGlobal("Entity.getYaw");
var EntityGetPitch = ModAPI.requireGlobal("Entity.getPitch");
var c0 = 0 / 16, c1 = 1 / 16, c2 = 2 / 16, c3 = 3 / 16, c4 = 4 / 16, c5 = 5 / 16, c6 = 6 / 16, c7 = 7 / 16, c8 = 8 / 16, c9 = 9 / 16, c10 = 10 / 16, c11 = 11 / 16, c12 = 12 / 16, c13 = 13 / 16, c14 = 14 / 16, c15 = 15 / 16, c16 = 16 / 16;
ModelHelper.setModelDir("assets/dev/MODELS/");


    var outMetrics =  new android.util.DisplayMetrics();
    UI.getContext().getWindowManager().getDefaultDisplay().getRealMetrics(outMetrics);
    
   // alert(outMetrics.widthPixels)
   // alert(outMetrics.heightPixels)
  