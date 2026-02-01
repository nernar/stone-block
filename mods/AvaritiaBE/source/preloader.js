var File = java.io.File;
var Bitmap = android.graphics.Bitmap;
var BitmapFactory = android.graphics.BitmapFactory;
var FileOutputStream = java.io.FileOutputStream;
var BufferedReader = java.io.BufferedReader;
var FileReader = java.io.FileReader;
var JavaString = java.lang.String;
var Canvas = android.graphics.Canvas;
var Paint = android.graphics.Paint;
var PorterDuffColorFilter = android.graphics.PorterDuffColorFilter;
var Color = android.graphics.Color;
var PorterDuff = android.graphics.PorterDuff;
var IllegalStateException = java.lang.IllegalStateException;
var FileUtil;
(function (FileUtil) {
    function isExist(path) {
        return new File(path).exists();
    }
    FileUtil.isExist = isExist;
    function readImage(path) {
        var options = new BitmapFactory.Options();
        options.inScaled = false;
        return BitmapFactory.decodeFile(path, options);
    }
    FileUtil.readImage = readImage;
    function writeImage(path, bitmap) {
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, new FileOutputStream(path));
    }
    FileUtil.writeImage = writeImage;
    function readFileText(path) {
        var reader = new BufferedReader(new FileReader(new File(path)));
        var text = "";
        while (true) {
            var readLine = reader.readLine();
            var line = readLine;
            if (readLine != null) {
                text += "".concat(line, "\n");
            } else {
                reader.close();
                return text;
            }
        }
    }
    function readJSON(path) {
        var textFile = readFileText(path);
        try {
            return JSON.parse(textFile) || {};
        }
        catch (e) {
            return {};
        }
    }
    FileUtil.readJSON = readJSON;
    function getListOfFiles(path, extension) {
        var dir = new File(path);
        var list = [];
        var files = dir.listFiles();
        if (!files) {
            return list;
        }
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (!file.isDirectory() && (!extension || file.getName().endsWith(extension))) {
                list.push(file);
            }
        }
        return list;
    }
    FileUtil.getListOfFiles = getListOfFiles;
    function getListOfDirs(path) {
        var dir = new File(path);
        var list = [];
        var files = dir.listFiles();
        if (!files) {
            return list;
        }
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (file.isDirectory()) {
                list.push(file);
            }
        }
        return list;
    }
    FileUtil.getListOfDirs = getListOfDirs;
})(FileUtil || (FileUtil = {}));
var TextureWorker;
(function (TextureWorker) {
    function changeBitmapColor(bitmap, color) {
        var newbmp = Bitmap.createBitmap(bitmap.getWidth(), bitmap.getHeight(), Bitmap.Config.ARGB_8888);
        var canvas = new Canvas(newbmp);
        var paint = new Paint();
        paint.setColorFilter(new PorterDuffColorFilter(Color.rgb(color[0], color[1], color[2]), PorterDuff.Mode.MULTIPLY));
        canvas.drawBitmap(bitmap, 0, 0, paint);
        return newbmp;
    }
    function fromModDir(textureSource) {
        if (textureSource.path.startsWith(__dir__)) {
            return textureSource;
        }
        return {name: textureSource.name, path: "".concat(__dir__, "/").concat(textureSource.path), color: textureSource.color};
    }
    function createTextureWithOverlays(args, fallback) {
        var _a;
        if (FileUtil.isExist("".concat(args.result.path).concat(args.result.name, ".png"))) {
            return;
        }
        var bmp = Bitmap.createBitmap(args.bitmap.width, args.bitmap.height, (_a = args.bitmap.config) !== null && _a !== void 0 ? _a : Bitmap.Config.ARGB_8888);
        var cvs = new Canvas(bmp);
        args.overlays.forEach(function (over) {
            var tex = FileUtil.readImage("".concat(over.path).concat(over.name, ".png"));
            cvs.drawBitmap(over.color ? changeBitmapColor(tex, over.color) : tex, 0, 0, null);
        });
        FileUtil.writeImage("".concat(args.result.path).concat(args.result.name, ".png"), bmp);
        if (fallback) {
            return bmp;
        }
    }
    function createTextureWithOverlaysModDir(args, fallback) {
        args.result = fromModDir(args.result);
        args.overlays = args.overlays.map(fromModDir);
        return createTextureWithOverlays(args, fallback);
    }
    TextureWorker.createTextureWithOverlaysModDir = createTextureWithOverlaysModDir;
})(TextureWorker || (TextureWorker = {}));
var IAHelper;
(function (IAHelper) {
    function convertTexture(srcPath, srcName, resultPath, resultName) {
        if (FileUtil.isExist("".concat(__dir__, "/").concat(resultPath).concat(resultName, "_0.png"))) {
            return;
        }
        var anim = FileUtil.readImage("".concat(__dir__, "/").concat(srcPath).concat(srcName, ".png"));
        if (anim.getHeight() % anim.getWidth() !== 0) {
            throw new IllegalStateException("The bitmap height must be a multiple of its width!");
        }
        for (var i = 0; i < anim.getHeight() / anim.getWidth(); i++) {
            var bmp = Bitmap.createBitmap(anim.getWidth(), anim.getWidth(), Bitmap.Config.ARGB_8888);
            for (var x = 0; x < anim.getWidth(); x++) {
                for (var y = 0; y < anim.getWidth(); y++) {
                    bmp.setPixel(x, y, anim.getPixel(x, y + anim.getWidth() * i));
                }
            }
            FileUtil.writeImage("".concat(__dir__, "/").concat(resultPath).concat(resultName, "_").concat(i, ".png"), bmp);
        }
    }
    IAHelper.convertTexture = convertTexture;
})(IAHelper || (IAHelper = {}));
(function () {
    var hex2rgb = function (hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
    };
    var gen = function (id, rgb1, rgb2) {
        TextureWorker.createTextureWithOverlaysModDir({bitmap: {width: 16, height: 96}, overlays: [{path: "resources/res/texture_source/", name: "singularity_back", color: rgb2}, {path: "resources/res/texture_source/", name: "singularity_front", color: rgb1}], result: {path: "resources/res/animated_items/", name: id}});
    };
    var colors = (function () {
        var result = FileUtil.readJSON("".concat(__dir__, "/resources/res/singularities.json"));
        var modsDir = (function () {
            var _a;
            var preferencesPath = "".concat(__packdir__, "innercore/preferences.json");
            if (new File(preferencesPath).exists()) {
                var innerCoreDir = (_a = FileUtil.readJSON(preferencesPath).pack_selected) !== null && _a !== void 0 ? _a : "".concat(__packdir__, "innercore");
                return "".concat(innerCoreDir, "/mods/");
            }
            return "".concat(__packdir__, "innercore/mods/");
        })();
        FileUtil.getListOfDirs(modsDir).forEach(function (mod) {
            var _a, _b;
            var modPath = mod.getAbsolutePath();
            if (modPath !== __dir__ && new File(mod, "build.config").exists()) {
                (_b = (_a = FileUtil.readJSON("".concat(modPath, "/build.config"))) === null || _a === void 0 ? void 0 : _a.resources) === null || _b === void 0 ? void 0 : _b.forEach(function (res) {
                    if (res.resourceType === "resource") {
                        var singularitiesPath = "".concat(modPath, "/").concat(res.path, "/singularities.json");
                        if (new File(singularitiesPath).exists()) {
                            var singularitiesJSON = FileUtil.readJSON(singularitiesPath);
                            for (var key in singularitiesJSON) {
                                if (Array.isArray(singularitiesJSON[key]) && singularitiesJSON[key].length === 2 && typeof singularitiesJSON[key][0] === "string" && typeof singularitiesJSON[key][1] === "string" && /^#[a-f\d]{6}$/i.test(singularitiesJSON[key][0]) && /^#[a-f\d]{6}$/i.test(singularitiesJSON[key][1])) {
                                    result[key] = singularitiesJSON[key];
                                }
                            }
                        }
                    }
                });
            }
        });
        return result;
    })();
    Object.keys(colors).forEach(function (key) {
        var arr = colors[key];
        gen("singularity_".concat(key), hex2rgb(arr[0]), hex2rgb(arr[1]));
    });
})();
FileUtil.getListOfFiles("".concat(__dir__, "/resources/res/animated_items/"), "png").forEach(function (file) {
    var fileName = new JavaString(file.getName()).replaceFirst("[.][^.]+$", "");
    IAHelper.convertTexture("resources/res/animated_items/", fileName, "resources/res/items-opaque/", fileName);
});

