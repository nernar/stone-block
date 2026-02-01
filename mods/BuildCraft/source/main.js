var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * I use "private type" instead generic because we cant
 * correctly translate generic to ES5
 */
var ClientFactory = /** @class */ (function () {
    function ClientFactory(type) {
        this.type = type;
    }
    ClientFactory.prototype.instantiate = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new ((_a = this.type).bind.apply(_a, __spread([void 0], args)))();
    };
    return ClientFactory;
}());
IMPORT("StorageInterface");
IMPORT("EnergyNet");
// you can see this files in
// BuildCraft/lib/
// !only bundle folder should contain lib files
/// <reference path="importLib.ts" />
var RF = EnergyTypeRegistry.assureEnergyType("RF", .25);
var EngineHeat;
(function (EngineHeat) {
    EngineHeat["BLUE"] = "BLUE";
    EngineHeat["GREEN"] = "GREEN";
    EngineHeat["ORANGE"] = "ORANGE";
    EngineHeat["RED"] = "RED";
    EngineHeat["OVERHEAT"] = "OVERHEAT";
    EngineHeat["BLACK"] = "BLACK";
})(EngineHeat || (EngineHeat = {}));
var HeatOrder = [
    EngineHeat.BLUE,
    EngineHeat.GREEN,
    EngineHeat.ORANGE,
    EngineHeat.RED,
    EngineHeat.BLACK
];
var EngineRotation;
(function (EngineRotation) {
    EngineRotation[EngineRotation["X"] = 1] = "X";
    EngineRotation[EngineRotation["Y"] = 0] = "Y";
    EngineRotation[EngineRotation["Z"] = 2] = "Z";
})(EngineRotation || (EngineRotation = {}));
var EngineItemModelTexture = /** @class */ (function () {
    function EngineItemModelTexture(textureName) {
        this.textureName = textureName;
        this.trunkTextureName = "engine_trunk";
        this.chamberTextureName = "chamber";
    }
    Object.defineProperty(EngineItemModelTexture.prototype, "BaseBoxTextureSet", {
        get: function () {
            return [
                [this.textureName, 0],
                [this.textureName, 0],
                [this.textureName, 1],
                [this.textureName, 1],
                [this.textureName, 1],
                [this.textureName, 1]
            ];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EngineItemModelTexture.prototype, "TrunkBoxTextureSet", {
        get: function () {
            return [
                [this.trunkTextureName, 1],
                [this.trunkTextureName, 1],
                [this.trunkTextureName, 0],
                [this.trunkTextureName, 0],
                [this.trunkTextureName, 0],
                [this.trunkTextureName, 0]
            ];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EngineItemModelTexture.prototype, "PistonBoxTextureSet", {
        get: function () {
            return [
                [this.textureName, 0],
                [this.textureName, 0],
                [this.textureName, 2],
                [this.textureName, 2],
                [this.textureName, 2],
                [this.textureName, 2]
            ];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EngineItemModelTexture.prototype, "ChamberBoxTextureSet", {
        get: function () {
            return [
                [this.chamberTextureName, 0],
                [this.chamberTextureName, 0],
                [this.chamberTextureName, 0],
                [this.chamberTextureName, 0],
                [this.chamberTextureName, 0],
                [this.chamberTextureName, 0]
            ];
        },
        enumerable: false,
        configurable: true
    });
    return EngineItemModelTexture;
}());
/// <reference path="../../EngineHeat.ts" />
/// <reference path="../EngineRotation.ts" />
/// <reference path="ITexture.ts" />
/// <reference path="../../components/model/EngineItemModelTexture.ts" />
var STANDART_TEXTURE = "model/buildcraft_engine_atlas.png";
var STANDART_SIZE = { width: 512, height: 512 };
var EngineTexture = /** @class */ (function () {
    function EngineTexture(itemModelTexture, name, baseOffset, size) {
        this.name = name;
        this.baseOffset = baseOffset;
        this.size = size;
        this.engineItemModelTexture = new EngineItemModelTexture(itemModelTexture);
    }
    EngineTexture.prototype.getTrunkUV = function (heat, rotation) {
        return { x: 64 * rotation, y: 32 * HeatOrder.indexOf(heat) };
    };
    EngineTexture.prototype.getBaseUV = function (rotation) {
        return { x: this.baseOffset.x + 64 * rotation, y: this.baseOffset.y };
    };
    EngineTexture.prototype.getChamberUV = function () {
        return { x: 192, y: 0 };
    };
    EngineTexture.prototype.getItemModelTexture = function () {
        return this.engineItemModelTexture;
    };
    return EngineTexture;
}());
/// <reference path="model/texture/EngineTexture.ts" />
var EngineTextures = /** @class */ (function () {
    function EngineTextures() {
    }
    EngineTextures.wood = new EngineTexture("engine_wood", STANDART_TEXTURE, { x: 256, y: 0 }, STANDART_SIZE);
    EngineTextures.creative = new EngineTexture("engine_creative", STANDART_TEXTURE, { x: 256, y: 96 }, STANDART_SIZE);
    return EngineTextures;
}());
var PowerMode;
(function (PowerMode) {
    PowerMode[PowerMode["M2"] = 20] = "M2";
    PowerMode[PowerMode["M4"] = 40] = "M4";
    PowerMode[PowerMode["M8"] = 80] = "M8";
    PowerMode[PowerMode["M16"] = 160] = "M16";
    PowerMode[PowerMode["M32"] = 320] = "M32";
    PowerMode[PowerMode["M64"] = 640] = "M64";
    PowerMode[PowerMode["M128"] = 1280] = "M128";
    PowerMode[PowerMode["M256"] = 2560] = "M256";
})(PowerMode || (PowerMode = {}));
;
var PowerModeOrder = [
    PowerMode.M2,
    PowerMode.M4,
    PowerMode.M8,
    PowerMode.M16,
    PowerMode.M32,
    PowerMode.M64,
    PowerMode.M128,
    PowerMode.M256
];
var BlockTypeEngine = {
    base: 1,
    destroytime: 1.5
};
var EngineBlock = /** @class */ (function () {
    function EngineBlock(registryId) {
        this.registryId = registryId;
        this.stringId = "engine_" + this.registryId;
        this.registerBlock();
        this.id = BlockID[this.stringId];
    }
    EngineBlock.prototype.registerBlock = function () {
        IDRegistry.genBlockID(this.stringId);
        Block.createBlock(this.stringId, [
            { name: this.stringId, texture: [["empty", 0]], inCreative: false },
            { name: this.stringId, texture: [["empty", 0]], inCreative: true }
        ], BlockTypeEngine);
    };
    return EngineBlock;
}());
/// <reference path="../IEnginePartModel.ts" />
/// <reference path="../ModelBox.ts" />
var EngineBaseModelPart = /** @class */ (function () {
    function EngineBaseModelPart(textureSet) {
        this.textureSet = textureSet;
    }
    EngineBaseModelPart.prototype.requireModelBox = function () {
        return {
            x1: 0, y1: 0, z1: 0,
            x2: 1, y2: .25, z2: 1,
            descr: this.textureSet
        };
    };
    return EngineBaseModelPart;
}());
/// <reference path="../IEnginePartModel.ts" />
/// <reference path="../ModelBox.ts" />
var EngineTrunkModelPart = /** @class */ (function () {
    function EngineTrunkModelPart(textureSet) {
        this.textureSet = textureSet;
    }
    EngineTrunkModelPart.prototype.requireModelBox = function () {
        return {
            x1: .25, y1: 0, z1: .25,
            x2: .75, y2: 1, z2: .75,
            descr: this.textureSet
        };
    };
    return EngineTrunkModelPart;
}());
/// <reference path="../IEnginePartModel.ts" />
/// <reference path="../ModelBox.ts" />
var EnginePistonModelPart = /** @class */ (function () {
    function EnginePistonModelPart(textureSet) {
        this.textureSet = textureSet;
    }
    EnginePistonModelPart.prototype.requireModelBox = function () {
        return {
            x1: 0, y1: .5, z1: 0,
            x2: 1, y2: .75, z2: 1,
            descr: this.textureSet
        };
    };
    return EnginePistonModelPart;
}());
/// <reference path="../IEnginePartModel.ts" />
/// <reference path="../ModelBox.ts" />
var EngineChamberModelPart = /** @class */ (function () {
    function EngineChamberModelPart(textureSet) {
        this.textureSet = textureSet;
    }
    EngineChamberModelPart.prototype.requireModelBox = function () {
        return {
            x1: .125, y1: 0, z1: .125,
            x2: .875, y2: .5, z2: .875,
            descr: this.textureSet
        };
    };
    return EngineChamberModelPart;
}());
/// <reference path="parts/EngineBaseModelPart.ts" />
/// <reference path="parts/EngineTrunkModelPart.ts" />
/// <reference path="parts/EnginePistonModelPart.ts" />
/// <reference path="parts/EngineChamberModelPart.ts" />
var EngineItemModel = /** @class */ (function () {
    function EngineItemModel(engineTexture) {
        var e_1, _a;
        this.engineTexture = engineTexture;
        this.model = new BlockRenderer.Model();
        this.setupModels();
        try {
            for (var _b = __values(this.Boxes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var box = _c.value;
                var x1 = box.x1, y1 = box.y1, z1 = box.z1, x2 = box.x2, y2 = box.y2, z2 = box.z2, descr = box.descr;
                this.model.addBox(x1, y1, z1, x2, y2, z2, descr);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    Object.defineProperty(EngineItemModel.prototype, "Boxes", {
        get: function () {
            return [
                this.baseModel.requireModelBox(),
                this.trunkModel.requireModelBox(),
                this.pistonModel.requireModelBox(),
                this.chamberModel.requireModelBox()
            ];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EngineItemModel.prototype, "Model", {
        get: function () {
            return this.model;
        },
        enumerable: false,
        configurable: true
    });
    EngineItemModel.prototype.setupModels = function () {
        var texture = this.engineTexture.getItemModelTexture();
        this.baseModel = new EngineBaseModelPart(texture.BaseBoxTextureSet);
        this.trunkModel = new EngineTrunkModelPart(texture.TrunkBoxTextureSet);
        this.pistonModel = new EnginePistonModelPart(texture.PistonBoxTextureSet);
        this.chamberModel = new EngineChamberModelPart(texture.ChamberBoxTextureSet);
    };
    return EngineItemModel;
}());
var EngineIngredients = /** @class */ (function () {
    function EngineIngredients(gear, ingot) {
        this.gear = gear;
        this.ingot = ingot;
    }
    return EngineIngredients;
}());
/// <reference path="EngineIngredients.ts" />
var EngineRecipe = /** @class */ (function () {
    function EngineRecipe(ingredients) {
        this.gear = ingredients.gear;
        this.ingot = ingredients.ingot;
    }
    EngineRecipe.prototype.registerFor = function (item) {
        Recipes.addShaped(item, this.Pattern, this.PatternData);
    };
    Object.defineProperty(EngineRecipe.prototype, "Pattern", {
        get: function () {
            return [
                "aaa",
                " b ",
                "oxo"
            ];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EngineRecipe.prototype, "PatternData", {
        get: function () {
            return [
                "x", VanillaBlockID.piston, -1,
                "a", this.ingot.id, this.ingot.data,
                "b", VanillaBlockID.glass, -1,
                "o", this.gear.id, this.gear.data
            ];
        },
        enumerable: false,
        configurable: true
    });
    return EngineRecipe;
}());
var RenderManager = /** @class */ (function () {
    function RenderManager() {
    }
    RenderManager.getRender = function (groupName) {
        return this.renders.pop();
    };
    RenderManager.store = function (render) {
        this.renders.push(render);
    };
    RenderManager.renders = [];
    return RenderManager;
}());
/// <reference path="../texture/EngineTexture.ts" />
/// <reference path="RenderManager.ts" />
var EngineRender = /** @class */ (function () {
    function EngineRender(engineTexture) {
        this.engineTexture = engineTexture;
        this.boxes = [];
        this.render = RenderManager.getRender() || new Render({ skin: this.engineTexture.name });
    }
    EngineRender.prototype.refresh = function () {
        this.render.setPart("head", this.getModelData(), this.engineTexture.size);
    };
    EngineRender.prototype.stash = function () {
        RenderManager.store(this.render);
    };
    EngineRender.prototype.getID = function () {
        return this.render.getId();
    };
    EngineRender.prototype.getModelData = function () {
        return this.boxes;
    };
    return EngineRender;
}());
/// <reference path="../../model/render/EngineRender.ts" />
var AnimationComponent = /** @class */ (function () {
    function AnimationComponent(pos, render) {
        this.render = render;
        this.coords = { x: pos.x + .5, y: pos.y + 15 / 16, z: pos.z + .5 };
        this.animation = new Animation.Base(this.coords.x, this.coords.y, this.coords.z);
        this.animation.describe({ render: this.render.getID() });
        this.animation.load();
    }
    AnimationComponent.prototype.updateRender = function (render) {
        this.render.stash();
        this.render = render;
        this.animation.describe({ render: this.render.getID() });
        this.animation.refresh();
    };
    AnimationComponent.prototype.destroy = function () {
        this.render.stash();
        this.animation.destroy();
    };
    return AnimationComponent;
}());
/// <reference path="./AnimationComponent.ts" />
var PistonAnimation = /** @class */ (function (_super) {
    __extends(PistonAnimation, _super);
    function PistonAnimation(pos, engineTexture) {
        var _this = this;
        var render = new PistonRender(engineTexture);
        _this = _super.call(this, pos, render) || this;
        var isInterpolationEnabled = __config__.getBool("animation_movement_interpolation");
        _this.animation.setInterpolationEnabled(isInterpolationEnabled);
        return _this;
    }
    PistonAnimation.prototype.setPosition = function (pistonPosition) {
        var move = {
            x: this.rotation === EngineRotation.X ? pistonPosition * this.direction : 0,
            y: this.rotation === EngineRotation.Y ? pistonPosition * -this.direction : 0,
            z: this.rotation === EngineRotation.Z ? pistonPosition * -this.direction : 0
        }; // !dont touch -1 or fix root of evil
        this.animation.setPos(this.coords.x + move.x, this.coords.y + move.y, this.coords.z + move.z);
    };
    return PistonAnimation;
}(AnimationComponent));
/// <reference path="./AnimationComponent.ts" />
/// <reference path="../../EngineHeat.ts" />
/// <reference path="../../model/texture/EngineTexture.ts" />
var BaseAnimation = /** @class */ (function (_super) {
    __extends(BaseAnimation, _super);
    function BaseAnimation(pos, engineTexture) {
        var _this = this;
        var render = new BaseRender(engineTexture);
        _this = _super.call(this, pos, render) || this;
        return _this;
    }
    return BaseAnimation;
}(AnimationComponent));
/// <reference path="../EngineHeat.ts" />
/// <reference path="../model/EngineRotation.ts" />
/// <reference path="animation/PistonAnimation.ts" />
/// <reference path="animation/BaseAnimation.ts" />
var EngineAnimation = /** @class */ (function () {
    function EngineAnimation(position, heatStage, engineTexture) {
        this.position = position;
        this.heatStage = heatStage;
        this.engineTexture = engineTexture;
        this.yOffset = 31; // magic const
        this.side = null; // connected side index
        this.directions = [
            { rotation: EngineRotation.Y, direction: -1 },
            { rotation: EngineRotation.Y, direction: 1 },
            { rotation: EngineRotation.Z, direction: -1 },
            { rotation: EngineRotation.Z, direction: 1 },
            { rotation: EngineRotation.X, direction: 1 },
            { rotation: EngineRotation.X, direction: -1 }
        ];
        this.piston = new PistonAnimation(position, engineTexture);
        this.base = new BaseAnimation(position, engineTexture);
    }
    Object.defineProperty(EngineAnimation.prototype, "ConnectionSide", {
        get: function () {
            return this.side;
        },
        set: function (value) {
            var rotate = false;
            if (this.side != value)
                rotate = true;
            this.side = value;
            if (rotate)
                this.rotateByMeta();
        },
        enumerable: false,
        configurable: true
    });
    EngineAnimation.prototype.update = function (progress, heat) {
        if (progress > 0.5)
            progress = 1 - progress;
        this.updateTrunkHeat(heat);
        this.piston.setPosition(progress);
        // *will be finished coming soon
        // this.updateChamberPosition(progress);
    };
    EngineAnimation.prototype.updateTrunkHeat = function (heat) {
        if (this.heatStage !== heat) {
            this.heatStage = heat;
            this.base.render.trunkUV = this.engineTexture.getTrunkUV(this.heatStage, this.directions[this.ConnectionSide].rotation);
            this.base.render.refresh();
        }
    };
    EngineAnimation.prototype.updateChamberPosition = function (progress) {
        // progress : [0, .5]
        var realPos = 5 + -Math.ceil(10 * progress);
        this.base.render.chamberCoords = {
            x: this.coords.x * realPos,
            y: this.yOffset + this.coords.y * realPos,
            z: this.coords.z * realPos
        };
        this.base.render.chamberSize = {
            x: 4 + (this.coords.x ? 2 * Math.ceil(10 * progress) * Math.abs(this.coords.x) : 6),
            y: 4 + (this.coords.y ? 2 * Math.ceil(10 * progress) * Math.abs(this.coords.y) : 6),
            z: 4 + (this.coords.z ? 2 * Math.ceil(10 * progress) * Math.abs(this.coords.z) : 6)
        };
        this.base.render.refreshChamber();
    };
    EngineAnimation.prototype.rotateByMeta = function () {
        var data = this.directions[this.ConnectionSide];
        this.createPiston(data.rotation, data.direction);
    };
    EngineAnimation.prototype.destroy = function () {
        this.base.destroy();
        this.piston.destroy();
    };
    // Legacy, but it still work
    EngineAnimation.prototype.createPiston = function (rotation, direction) {
        var coords = { x: 0, y: 0, z: 0 };
        switch (rotation) {
            case EngineRotation.X:
                coords.x = direction;
                break;
            case EngineRotation.Y:
                coords.y = direction;
                break;
            case EngineRotation.Z:
                coords.z = direction;
                break;
        }
        ;
        this.coords = coords;
        this.setupBaseBoxes(coords);
        var baseRender = this.base.render;
        baseRender.baseUV = this.engineTexture.getBaseUV(rotation);
        this.setupTrunkBoxes(coords);
        baseRender.trunkUV = this.engineTexture.getTrunkUV(this.heatStage, rotation);
        baseRender.refresh();
        // *will be finished coming soon
        // baseRender.chamberUV = this.engineTexture.getChamberUV();
        // baseRender.refreshChamber();
        this.setupPistonBoxes(coords);
        var pistonRender = this.piston.render;
        pistonRender.pistonUV = this.engineTexture.getBaseUV(rotation);
        pistonRender.refresh();
        // piston Move Vector setup
        this.piston.direction = -direction;
        this.piston.rotation = rotation;
    };
    EngineAnimation.prototype.setupBaseBoxes = function (coords) {
        this.base.render.baseCoords = {
            x: coords.x * 6,
            y: this.yOffset + coords.y * 6,
            z: coords.z * 6
        };
        this.base.render.baseSize = {
            x: 4 + 12 * (1 - Math.abs(coords.x)),
            y: 4 + 12 * (1 - Math.abs(coords.y)),
            z: 4 + 12 * (1 - Math.abs(coords.z))
        };
    };
    EngineAnimation.prototype.setupTrunkBoxes = function (coords) {
        this.base.render.trunkCoords = {
            x: -coords.x * .1,
            y: this.yOffset - coords.y * .1,
            z: -coords.z * .1
        };
        this.base.render.trunkSize = {
            x: 8 + 8 * (Math.abs(coords.x)),
            y: 8 + 8 * (Math.abs(coords.y)),
            z: 8 + 8 * (Math.abs(coords.z))
        };
    };
    EngineAnimation.prototype.setupPistonBoxes = function (coords) {
        this.piston.render.pistonCoords = {
            x: coords.x * 2,
            y: this.yOffset + coords.y * 2,
            z: coords.z * 2
        };
        this.piston.render.pistonSize = {
            x: 4 + 12 * (1 - Math.abs(coords.x)),
            y: 4 + 12 * (1 - Math.abs(coords.y)),
            z: 4 + 12 * (1 - Math.abs(coords.z))
        };
    };
    return EngineAnimation;
}());
/// <reference path="../components/EngineAnimation.ts" />
/// <reference path="../../energy.ts" />
/// <reference path="../interface/IHeatable.ts" />
/// <reference path="../interface/IEngine.ts" />
/**
 * !WARNING
 * this code adapted from JAVA source of PC mod
 * this structure created not by me
 * dont punch me pls
 */
var BCEngineTileEntity = /** @class */ (function () {
    function BCEngineTileEntity(texture) {
        this.texture = texture;
        this.MIN_HEAT = 20;
        this.IDEAL_HEAT = 100;
        this.MAX_HEAT = 250;
        this.currentOutput = 0;
        this.isRedstonePowered = false;
        this.energyStage = EngineHeat.BLUE;
        this.progressPart = 0;
        this.isPumping = false; // Used for SMP synch // ?WTF is SMP
        this.checkOrientation = false;
        // How many ticks ago it gave out power, capped to 4.
        this.lastTick = 0;
        this.data = {
            meta: null,
            energy: 0,
            heat: this.MIN_HEAT,
            progress: 0
        };
        this.defaultValues = {
            meta: null,
            energy: 0,
            heat: this.MIN_HEAT,
            progress: 0
        };
        this.isEngine = true;
        this.engineAnimation = null;
        this.client = {
            orientation: null,
            energyStage: null,
            isPumping: false,
            progress: 0,
            progressPart: 0,
            engineAnimation: null,
            // !TileEntity event
            load: function () {
                var _this = this;
                this.orientation = this.networkData.getInt("orientation");
                this.energyStage = HeatOrder[this.networkData.getInt("energyStageIndex")];
                this.isPumping = this.networkData.getBoolean("isPumping");
                this.progress = this.networkData.getFloat("progress");
                this.engineAnimation = new EngineAnimation(this, this.getTrunkTexture(this.energyStage, this.progress), this.getEngineTexture());
                this.engineAnimation.ConnectionSide = this.orientation;
                this.networkData.addOnDataChangedListener(function (networkData, isExternalChange) {
                    _this.orientation = networkData.getInt("orientation");
                    _this.energyStage = HeatOrder[networkData.getInt("energyStageIndex")];
                    _this.isPumping = _this.networkData.getBoolean("isPumping");
                    _this.engineAnimation.ConnectionSide = _this.orientation;
                });
            },
            // !TileEntity event
            unload: function () {
                this.engineAnimation.destroy();
            },
            // !TileEntity event
            tick: function () {
                if (!this.engineAnimation)
                    return;
                if (this.progressPart != 0) {
                    this.progress += this.getPistonSpeed(this.energyStage);
                    if (this.progress > 1) {
                        this.progressPart = 0;
                        this.progress = 0;
                    }
                }
                else if (this.isPumping) {
                    this.progressPart = 1;
                }
                this.engineAnimation.update(this.progress, this.getTrunkTexture(this.energyStage, this.progress));
            },
            // ? please override in derived class
            getEngineTexture: function (stage) {
                return null;
            },
            getTrunkTexture: function (stage, progress) {
                return stage;
            },
            getPistonSpeed: function (energyStage) {
                switch (energyStage) {
                    case EngineHeat.BLUE:
                        return 0.02;
                    case EngineHeat.GREEN:
                        return 0.04;
                    case EngineHeat.ORANGE:
                        return 0.08;
                    case EngineHeat.RED:
                        return 0.16;
                    default:
                        return 0;
                }
            }
        };
    }
    /*
     ! I use old get set methods because Core Engine has special errors in runtime
     ! during I use new get set methods
     */
    BCEngineTileEntity.prototype.getOrientation = function () {
        var _a;
        return (_a = this.blockSource) === null || _a === void 0 ? void 0 : _a.getBlockData(this.x, this.y, this.z);
    };
    BCEngineTileEntity.prototype.setOrientation = function (value) {
        if (typeof (value) == "number") {
            var _a = this, x = _a.x, y = _a.y, z = _a.z;
            this.blockSource.setBlock(x, y, z, this.blockSource.getBlockId(x, y, z), value);
            this.updateClientOrientation();
        }
    };
    BCEngineTileEntity.prototype.updateClientOrientation = function () {
        this.networkData.putInt("orientation", this.blockSource.getBlockData(this.x, this.y, this.z));
        this.networkData.sendChanges();
    };
    BCEngineTileEntity.prototype.setProgress = function (value) {
        this.data.progress = value;
        this.networkData.putFloat("progress", value);
    };
    BCEngineTileEntity.prototype.getProgress = function () {
        return this.data.progress;
    };
    BCEngineTileEntity.prototype.setProgressPart = function (value) {
        this.progressPart = value;
    };
    BCEngineTileEntity.prototype.getProgressPart = function () {
        return this.progressPart;
    };
    BCEngineTileEntity.prototype.setEnergyStage = function (value) {
        this.energyStage = value;
        this.networkData.putInt("energyStageIndex", HeatOrder.indexOf(this.energyStage));
        this.networkData.sendChanges();
    };
    BCEngineTileEntity.prototype.getPumping = function () {
        return this.isPumping;
    };
    BCEngineTileEntity.prototype.setPumping = function (value) {
        if (this.isPumping == value)
            return;
        this.isPumping = value;
        this.lastTick = 0;
        this.networkData.putBoolean("isPumping", value);
        this.networkData.sendChanges();
    };
    // !TileEntity event
    BCEngineTileEntity.prototype.init = function () {
        this.checkOrientation = true;
    };
    // !TileEntity event
    BCEngineTileEntity.prototype.redstone = function (params) {
        this.isRedstonePowered = params.signal > 0;
    };
    // !TileEntity event
    BCEngineTileEntity.prototype.tick = function () {
        if (this.checkOrientation)
            this.updateConnectionSide();
        if (this.lastTick < 4)
            this.lastTick++;
        this.updateHeat();
        this.getEnergyStage();
        if (this.getEnergyStage() === EngineHeat.OVERHEAT) {
            this.data.energy = Math.max(this.data.energy - 50, 0);
            return;
        }
        this.engineUpdate();
        var tile = this.getEnergyProvider(this.getOrientation());
        if (this.getProgressPart() != 0) {
            this.setProgress(this.getProgress() + this.getPistonSpeed());
            if (this.getProgress() > 0.5 && this.getProgressPart() == 1) {
                this.setProgressPart(2);
            }
            else if (this.getProgress() >= 1) {
                this.setProgress(0);
                this.setProgressPart(0);
            }
        }
        else if (this.isRedstonePowered && this.isActive()) {
            if (this.isPoweredTile(tile, this.getOrientation())) {
                this.setProgressPart(1);
                this.setPumping(true);
                if (this.getPowerToExtract() > 0) {
                    this.setProgressPart(1);
                    this.setPumping(true);
                }
                else {
                    this.setPumping(false);
                }
            }
            else {
                this.setPumping(false);
            }
        }
        else {
            this.setPumping(false);
        }
        this.burn();
        if (!this.isRedstonePowered) {
            this.currentOutput = 0;
        }
        else if (this.isRedstonePowered && this.isActive()) {
            this.sendPower();
        }
    };
    BCEngineTileEntity.prototype.click = function (id, count, data) {
        if (id != ItemID.bc_wrench)
            return false;
        if (this.getEnergyStage() == EngineHeat.OVERHEAT) {
            this.setEnergyStage(this.computeEnergyStage());
        }
        this.setOrientation(this.getConnectionSide(true));
        return true;
    };
    BCEngineTileEntity.prototype.isActive = function () {
        return true;
    };
    // ! @MineExplorer PLEASE make EnergyTileRegistry BlockSource support
    // TODO move to blockSource getConnectionSide
    /** @param findNext - use true value if you want to rerotate engine like a wrench */
    BCEngineTileEntity.prototype.getConnectionSide = function (findNext) {
        if (findNext === void 0) { findNext = false; }
        // * In common situation ends when i gets max in 5 index
        // * But if fhis function calling by wrench index can go beyound
        // * I think this code is poor, but maybe i fix it in future
        var orientation = this.getOrientation();
        for (var t = 0; t < 12; t++) {
            var i = t % 6;
            if (findNext) {
                if (orientation == t)
                    findNext = false;
                continue;
            }
            var _a = World.getRelativeCoords(this.x, this.y, this.z, i), x = _a.x, y = _a.y, z = _a.z;
            // * ?. is new ESNext feature. Its amazing!
            var node = EnergyNet.getNodeOnCoords(this.blockSource, x, y, z);
            var thisNode = EnergyNet.getNodeOnCoords(this.blockSource, this.x, this.y, this.z);
            if (node && thisNode.isCompatible(node)) {
                return i;
            }
        }
        return null;
    };
    BCEngineTileEntity.prototype.updateConnectionSide = function () {
        this.checkOrientation = false;
        var orientation = this.getOrientation();
        if (!this.isPoweredTile(this.getEnergyProvider(orientation), orientation)) {
            var side = this.getConnectionSide();
            if (typeof (side) == "number") {
                this.setOrientation(side);
            }
            else
                this.updateClientOrientation();
        }
        else
            this.updateClientOrientation();
    };
    // ! @MineExplorer PLEASE make EnergyTileRegistry BlockSource support
    // TODO move to blockSource getEnergyProvider
    BCEngineTileEntity.prototype.getEnergyProvider = function (orientation) {
        var _a = World.getRelativeCoords(this.x, this.y, this.z, orientation), x = _a.x, y = _a.y, z = _a.z;
        return World.getTileEntity(x, y, z, this.blockSource);
    };
    BCEngineTileEntity.prototype.sendPower = function () {
        var tile = this.getEnergyProvider(this.getOrientation());
        if (this.isPoweredTile(tile, this.getOrientation())) {
            var extracted = this.getPowerToExtract();
            if (extracted <= 0) {
                this.setPumping(false);
                return;
            }
            this.setPumping(true);
            var oppositeSide = World.getInverseBlockSide(this.getOrientation());
            if (tile.isEngine) {
                var neededRF = tile.receiveEnergyFromEngine(oppositeSide, extracted, false);
                this.extractEnergy(neededRF, true);
            }
            else if (tile.canReceiveEnergy(oppositeSide, "RF")) {
                var neededRF = tile.energyReceive("RF", extracted, this.data.energy);
                this.extractEnergy(neededRF, true);
            }
        }
    };
    BCEngineTileEntity.prototype.getPowerToExtract = function () {
        var tile = this.getEnergyProvider(this.getOrientation());
        if (!tile)
            return 0;
        var oppositeSide = World.getInverseBlockSide(this.getOrientation());
        var canExtract = Math.min(this.getCurrentOutputLimit(), this.data.energy);
        if (tile.isEngine) {
            var maxEnergy = tile.receiveEnergyFromEngine(oppositeSide, canExtract, true);
            return this.extractEnergy(maxEnergy, false);
        }
        else if (tile.canReceiveEnergy(oppositeSide, "RF")) {
            var maxEnergy = Math.min(this.getCurrentOutputLimit(), tile.getMaxEnergyStored() - tile.data.energy);
            return this.extractEnergy(maxEnergy, false);
        }
        return 0;
    };
    BCEngineTileEntity.prototype.isPoweredTile = function (tile, side) {
        if (!tile)
            return false;
        var oppositeSide = World.getInverseBlockSide(this.getOrientation());
        if (tile.isEngine) {
            return tile.canReceiveFromEngine(oppositeSide);
        }
        else if (tile.canReceiveEnergy(oppositeSide, "RF")) {
            // return ((IEnergyConnection) tile).canConnectEnergy(side.getOpposite()); // ? is next line correct
            return tile.canReceiveEnergy(oppositeSide, "RF");
        }
        return false;
    };
    BCEngineTileEntity.prototype.getPistonSpeed = function () {
        return Math.max(0.16 * this.getHeatLevel(), 0.01);
    };
    BCEngineTileEntity.prototype.getEnergyStage = function () {
        if (this.energyStage == EngineHeat.OVERHEAT)
            return this.energyStage;
        var newStage = this.computeEnergyStage();
        if (this.energyStage !== newStage) {
            this.setEnergyStage(newStage);
            if (newStage == EngineHeat.OVERHEAT)
                this.overheat();
        }
        return this.energyStage;
    };
    BCEngineTileEntity.prototype.addEnergy = function (addition) {
        if (this.getEnergyStage() == EngineHeat.OVERHEAT)
            return;
        this.data.energy += addition;
        if (this.data.energy > this.getMaxEnergy()) {
            this.data.energy = this.getMaxEnergy();
        }
    };
    BCEngineTileEntity.prototype.computeEnergyStage = function () {
        var energyLevel = this.getHeatLevel();
        if (energyLevel < 0.25) {
            return EngineHeat.BLUE;
        }
        else if (energyLevel < 0.5) {
            return EngineHeat.GREEN;
        }
        else if (energyLevel < 0.75) {
            return EngineHeat.ORANGE;
        }
        else if (energyLevel < 1) {
            return EngineHeat.RED;
        }
        return EngineHeat.OVERHEAT;
    };
    BCEngineTileEntity.prototype.getEnergyStored = function () {
        return this.data.energy;
    };
    BCEngineTileEntity.prototype.getMaxEnergyStored = function () {
        return this.getMaxEnergy();
    };
    BCEngineTileEntity.prototype.canConnectEnergy = function (from) {
        return from == this.getOrientation();
    };
    BCEngineTileEntity.prototype.getEnergyLevel = function () {
        return this.data.energy / this.getMaxEnergy();
    };
    BCEngineTileEntity.prototype.extractEnergy = function (energyMax, doExtract) {
        var max = Math.min(energyMax, this.getCurrentOutputLimit());
        var extracted;
        var energy = this.data.energy;
        if (energy >= max) {
            extracted = max;
            if (doExtract) {
                this.data.energy -= max;
            }
        }
        else {
            extracted = energy;
            if (doExtract) {
                this.data.energy = 0;
            }
        }
        return extracted;
    };
    BCEngineTileEntity.prototype.getCurrentOutputLimit = function () {
        return Number.MAX_VALUE;
    };
    BCEngineTileEntity.prototype.engineUpdate = function () {
        if (!this.isRedstonePowered) {
            if (this.data.energy >= 10) {
                this.data.energy -= 10;
            }
            else if (this.data.energy < 10) {
                this.data.energy = 0;
            }
        }
    };
    BCEngineTileEntity.prototype.getHeatLevel = function () {
        return (this.data.heat - this.MIN_HEAT) / (this.MAX_HEAT - this.MIN_HEAT);
    };
    BCEngineTileEntity.prototype.updateHeat = function () {
        this.data.heat = ((this.MAX_HEAT - this.MIN_HEAT) * this.getEnergyLevel()) + this.MIN_HEAT;
    };
    BCEngineTileEntity.prototype.overheat = function () {
        this.isPumping = false;
        this.blockSource.explode(this.x, this.y, this.z, 3, true);
    };
    // ? why we need it? ask PC author about it. Maybe it should be overrided in future
    BCEngineTileEntity.prototype.burn = function () { };
    // IEngine
    BCEngineTileEntity.prototype.canReceiveFromEngine = function (side) {
        return side == World.getInverseBlockSide(this.getOrientation());
    };
    BCEngineTileEntity.prototype.receiveEnergyFromEngine = function (side, amount, simulate) {
        if (this.canReceiveFromEngine(side)) {
            var targetEnergy = Math.min(this.getMaxEnergy() - this.data.energy, amount);
            if (!simulate) {
                this.data.energy += targetEnergy;
            }
            return targetEnergy;
        }
        return 0;
    };
    // IHeatable
    BCEngineTileEntity.prototype.getMinHeatValue = function () {
        return this.MIN_HEAT;
    };
    BCEngineTileEntity.prototype.getIdealHeatValue = function () {
        return this.IDEAL_HEAT;
    };
    BCEngineTileEntity.prototype.getMaxHeatValue = function () {
        return this.MAX_HEAT;
    };
    BCEngineTileEntity.prototype.getCurrentHeatValue = function () {
        return this.data.heat;
    };
    return BCEngineTileEntity;
}());
/// <reference path="../components/EngineBlock.ts" />
/// <reference path="../components/model/EngineItemModel.ts" />
/// <reference path="../components/recipe/EngineRecipe.ts" />
/// <reference path="../components/recipe/EngineIngredients.ts" />
/// <reference path="../EngineHeat.ts" />
/// <reference path="../model/texture/EngineTexture.ts" />
/// <reference path="BCEngineTileEntity.ts" />
var BCEngine = /** @class */ (function () {
    function BCEngine() {
        this.block = new EngineBlock(this.engineType);
        this.engineItemModel = new EngineItemModel(this.texture);
        this.recipe = this.getRecipe(this.getIngredientsForRecipe());
        this.recipe.registerFor({ id: this.block.id, count: 1, data: 1 });
        Block.setupAsRedstoneReceiver(this.block.stringId, true);
        TileEntity.registerPrototype(this.block.id, this.requireTileEntity());
        EnergyTileRegistry.addEnergyTypeForId(this.block.id, RF);
        this.registerHandModel();
        this.registerDrop();
        this.registerNeighbourChangeFunction();
    }
    Object.defineProperty(BCEngine.prototype, "engineType", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BCEngine.prototype, "texture", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * it a method because we need this in constructor
     */
    BCEngine.prototype.getRecipe = function (ingredients) {
        return new EngineRecipe(ingredients);
    };
    BCEngine.prototype.registerHandModel = function () {
        ItemModel.getFor(this.block.id, 1).setModel(this.engineItemModel.Model);
    };
    BCEngine.prototype.registerNeighbourChangeFunction = function () {
        Block.registerNeighbourChangeFunctionForID(this.block.id, function (coords, block, changeCoords, region) {
            var tile = World.getTileEntity(coords.x, coords.y, coords.z, region);
            if (tile)
                tile.checkOrientation = true;
        });
    };
    BCEngine.prototype.registerDrop = function () {
        var _this = this;
        Block.registerDropFunction(this.block.stringId, function () {
            return [[_this.block.id, 1, 1]];
        });
    };
    return BCEngine;
}());
/**
 * @deprecated
 */
var EngineItem = /** @class */ (function () {
    function EngineItem(registryId, engineBlock) {
        this.registryId = registryId;
        this.engineBlock = engineBlock;
        this.stringId = "engine_" + this.registryId;
        this.registerItem();
        this.id = ItemID[this.stringId];
    }
    EngineItem.prototype.registerItem = function () {
        IDRegistry.genItemID(this.stringId);
        Item.createItem(this.stringId, this.stringId, { name: "engine_" + this.registryId });
    };
    return EngineItem;
}());
/// <reference path="../components/recipe/EngineRecipe.ts" />
/// <reference path="../components/recipe/EngineIngredients.ts" />
var CreativeEngineRecipe = /** @class */ (function (_super) {
    __extends(CreativeEngineRecipe, _super);
    function CreativeEngineRecipe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CreativeEngineRecipe, "Recipe", {
        get: function () {
            if (!this.staticRecipe) {
                this.staticRecipe = new CreativeEngineRecipe(this.ingredients);
            }
            return this.staticRecipe;
        },
        enumerable: false,
        configurable: true
    });
    CreativeEngineRecipe.prototype.registerFor = function (item) { };
    CreativeEngineRecipe.staticRecipe = null;
    CreativeEngineRecipe.ingredients = new EngineIngredients({ id: 0, count: 0, data: 0 }, { id: 0, count: 0, data: 0 });
    return CreativeEngineRecipe;
}(EngineRecipe));
/// <reference path="../PowerMode.ts" />
var BCCreativeEngineTileEntity = /** @class */ (function (_super) {
    __extends(BCCreativeEngineTileEntity, _super);
    function BCCreativeEngineTileEntity(texture) {
        var _this = _super.call(this, texture) || this;
        _this.texture = texture;
        _this.energyStage = EngineHeat.BLACK;
        _this.defaultValues.powerMode = PowerMode.M2;
        _this.client.getEngineTexture = function (stage) {
            return EngineTextures.creative;
        };
        _this.client.getPistonSpeed = function (energyStage) {
            return 0.02 * (this.powerModeIndex + 1);
        };
        // @ts-ignore
        _this.client._load = _this.client.load;
        _this.client.load = function () {
            var _this = this;
            this._load();
            this.powerModeIndex = 0;
            this.networkData.addOnDataChangedListener(function (networkData, isExternalChange) {
                _this.powerModeIndex = networkData.getInt("powerModeIndex");
            });
        };
        return _this;
    }
    BCCreativeEngineTileEntity.prototype.init = function () {
        _super.prototype.init.call(this);
        this.syncPowerMode();
    };
    BCCreativeEngineTileEntity.prototype.click = function (id, count, data) {
        if (id != ItemID.bc_wrench)
            return false;
        if (Entity.getSneaking(Player.get())) {
            this.data.energy = 0;
            var currentModeIndex = PowerModeOrder.indexOf(this.data.powerMode);
            this.data.powerMode = PowerModeOrder[++currentModeIndex % PowerModeOrder.length];
            this.syncPowerMode();
            Game.tipMessage("Mode switched to " + this.data.powerMode + "RF");
            return true;
        }
        this.setOrientation(this.getConnectionSide(true));
        return false;
    };
    BCCreativeEngineTileEntity.prototype.syncPowerMode = function () {
        this.networkData.putInt("powerModeIndex", PowerModeOrder.indexOf(this.data.powerMode));
        this.networkData.sendChanges();
    };
    BCCreativeEngineTileEntity.prototype.computeEnergyStage = function () {
        return EngineHeat.BLACK;
    };
    BCCreativeEngineTileEntity.prototype.updateHeat = function () { };
    BCCreativeEngineTileEntity.prototype.getPistonSpeed = function () {
        return 0.02 * (PowerModeOrder.indexOf(this.data.powerMode) + 1);
    };
    BCCreativeEngineTileEntity.prototype.engineUpdate = function () {
        _super.prototype.engineUpdate.call(this);
        if (this.isRedstonePowered) {
            this.addEnergy(this.getIdealOutput());
        }
    };
    BCCreativeEngineTileEntity.prototype.isBurning = function () {
        return this.isRedstonePowered;
    };
    BCCreativeEngineTileEntity.prototype.getMaxEnergy = function () {
        return this.getIdealOutput();
    };
    BCCreativeEngineTileEntity.prototype.getIdealOutput = function () {
        return this.data.powerMode;
    };
    return BCCreativeEngineTileEntity;
}(BCEngineTileEntity));
/// <reference path="../PowerMode.ts" />
/// <reference path="../EngineHeat.ts" />
var BCWoodEngineTileEntity = /** @class */ (function (_super) {
    __extends(BCWoodEngineTileEntity, _super);
    function BCWoodEngineTileEntity(texture) {
        var _this = _super.call(this, texture) || this;
        _this.texture = texture;
        _this.hasSent = false;
        _this.client.getEngineTexture = function (stage) {
            return EngineTextures.wood;
        };
        _this.client.getTrunkTexture = function (stage, progress) {
            return stage == EngineHeat.RED && progress < 0.5 ? EngineHeat.ORANGE : stage;
        };
        _this.client.getPistonSpeed = function (energyStage) {
            switch (energyStage) {
                case EngineHeat.GREEN:
                    return 0.02;
                case EngineHeat.ORANGE:
                    return 0.04;
                case EngineHeat.RED:
                    return 0.08;
                default:
                    return 0.01;
            }
        };
        return _this;
    }
    BCWoodEngineTileEntity.prototype.computeEnergyStage = function () {
        var energyLevel = this.getEnergyLevel();
        if (energyLevel < 0.33) {
            return EngineHeat.BLUE;
        }
        else if (energyLevel < 0.66) {
            return EngineHeat.GREEN;
        }
        else if (energyLevel < 0.75) {
            return EngineHeat.ORANGE;
        }
        return EngineHeat.RED;
    };
    BCWoodEngineTileEntity.prototype.getPistonSpeed = function () {
        return Math.max(0.08 * this.getHeatLevel(), 0.01);
    };
    BCWoodEngineTileEntity.prototype.engineUpdate = function () {
        _super.prototype.engineUpdate.call(this);
        if (this.isRedstonePowered && World.getThreadTime() % 16 == 0) {
            this.addEnergy(10);
        }
    };
    BCWoodEngineTileEntity.prototype.sendPower = function () {
        if (this.progressPart == 2 && !this.hasSent) {
            this.hasSent = true;
            var tile = this.getEnergyProvider(this.getOrientation());
            if (tile && tile.canReceiveEnergy(World.getInverseBlockSide(this.getOrientation()), "RF") &&
                tile.canConnectRedstoneEngine && tile.canConnectRedstoneEngine()) {
                _super.prototype.sendPower.call(this);
            }
            else {
                this.data.energy = 0;
            }
        }
        else if (this.progressPart != 2) {
            this.hasSent = false;
        }
    };
    BCWoodEngineTileEntity.prototype.isBurning = function () {
        return this.isRedstonePowered;
    };
    BCWoodEngineTileEntity.prototype.getCurrentOutputLimit = function () {
        return 10;
    };
    BCWoodEngineTileEntity.prototype.getMaxEnergy = function () {
        return 1000;
    };
    BCWoodEngineTileEntity.prototype.getIdealOutput = function () {
        return 10;
    };
    BCWoodEngineTileEntity.prototype.canConnectEnergy = function (from) {
        return false;
    };
    BCWoodEngineTileEntity.prototype.getEnergyStored = function () {
        return 0;
    };
    BCWoodEngineTileEntity.prototype.getMaxEnergyStored = function () {
        return 0;
    };
    return BCWoodEngineTileEntity;
}(BCEngineTileEntity));
IDRegistry.genItemID("gear_wood");
Item.createItem("gear_wood", "gear_wood", { name: "gear_wood" });
IDRegistry.genItemID("gear_stone");
Item.createItem("gear_stone", "gear_stone", { name: "gear_stone" });
IDRegistry.genItemID("gear_iron");
Item.createItem("gear_iron", "gear_iron", { name: "gear_iron" });
IDRegistry.genItemID("gear_gold");
Item.createItem("gear_gold", "gear_gold", { name: "gear_gold" });
IDRegistry.genItemID("gear_diamond");
Item.createItem("gear_diamond", "gear_diamond", { name: "gear_diamond" });
Recipes.addShaped({ id: ItemID.gear_wood, count: 1, data: 0 }, [
    " x ",
    "x x",
    " x "
], ["x", 280, 0]);
Recipes.addShaped({ id: ItemID.gear_stone, count: 1, data: 0 }, [
    " x ",
    "xox",
    " x "
], ["x", 4, -1, "o", ItemID.gear_wood, 0]);
Recipes.addShaped({ id: ItemID.gear_iron, count: 1, data: 0 }, [
    " x ",
    "xox",
    " x "
], ["x", 265, 0, "o", ItemID.gear_stone, 0]);
Recipes.addShaped({ id: ItemID.gear_gold, count: 1, data: 0 }, [
    " x ",
    "xox",
    " x "
], ["x", 266, 0, "o", ItemID.gear_iron, 0]);
Recipes.addShaped({ id: ItemID.gear_diamond, count: 1, data: 0 }, [
    " x ",
    "xox",
    " x "
], ["x", 264, 0, "o", ItemID.gear_gold, 0]);
Callback.addCallback("BC-ICore", function (ICore) {
    IDRegistry.genItemID("gear_tin");
    Item.createItem("gear_tin", "Tin Gear", { name: "gear_tin" });
    Recipes.addShaped({ id: ItemID.gear_tin, count: 1, data: 0 }, [
        " x ",
        "xox",
        " x "
    ], ["x", ItemID.ingotTin, 0, "o", ItemID.gear_stone, 0]);
});
/// <reference path="../abstract/BCEngine.ts" />
/// <reference path="../components/recipe/EngineRecipe.ts" />
/// <reference path="../components/recipe/EngineIngredients.ts" />
/// <reference path="WoodEngineTileEntity.ts" />
/// <reference path="../EngineTextures.ts" />
/// <reference path="../../../item/gears.ts" />
var WoodEngine = /** @class */ (function (_super) {
    __extends(WoodEngine, _super);
    function WoodEngine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(WoodEngine.prototype, "engineType", {
        get: function () {
            return "wooden";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WoodEngine.prototype, "texture", {
        get: function () {
            return EngineTextures.wood;
        },
        enumerable: false,
        configurable: true
    });
    WoodEngine.prototype.requireTileEntity = function () {
        return new BCWoodEngineTileEntity(this.texture);
    };
    WoodEngine.prototype.getIngredientsForRecipe = function () {
        return new EngineIngredients({ id: ItemID.gear_wood, count: 1, data: 0 }, { id: VanillaBlockID.planks, count: 1, data: -1 });
    };
    return WoodEngine;
}(BCEngine));
var woodenEngine = new WoodEngine();
/// <reference path="../abstract/BCEngine.ts" />
/// <reference path="CreativeEngineRecipe.ts" />
/// <reference path="../components/recipe/EngineIngredients.ts" />
/// <reference path="CreativeEngineTileEntity.ts" />
/// <reference path="../EngineTextures.ts" />
// * only for engine order in creative tab
/// <reference path="../wood/WoodEngine.ts" />
var CreativeEngine = /** @class */ (function (_super) {
    __extends(CreativeEngine, _super);
    function CreativeEngine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CreativeEngine.prototype, "engineType", {
        get: function () {
            return "creative";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CreativeEngine.prototype, "texture", {
        get: function () {
            return EngineTextures.creative;
        },
        enumerable: false,
        configurable: true
    });
    CreativeEngine.prototype.getRecipe = function (ingredients) {
        return CreativeEngineRecipe.Recipe;
    };
    CreativeEngine.prototype.requireTileEntity = function () {
        return new BCCreativeEngineTileEntity(EngineTextures.creative);
    };
    CreativeEngine.prototype.getIngredientsForRecipe = function () {
        return null;
    };
    return CreativeEngine;
}(BCEngine));
var creativeEngine = new CreativeEngine();
/// <reference path="EngineRender.ts" />
var BaseRender = /** @class */ (function (_super) {
    __extends(BaseRender, _super);
    function BaseRender() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.boxes = [{
                type: "box",
                uv: null,
                coords: null,
                size: null
            },
            {
                type: "box",
                uv: null,
                coords: null,
                size: null
            }];
        _this.chamberBoxes = [{
                type: "box",
                uv: null,
                coords: null,
                size: null
            }];
        return _this;
    }
    Object.defineProperty(BaseRender.prototype, "baseCoords", {
        // Base
        set: function (value) {
            this.boxes[0].coords = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseRender.prototype, "baseUV", {
        set: function (value) {
            this.boxes[0].uv = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseRender.prototype, "baseSize", {
        set: function (value) {
            this.boxes[0].size = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseRender.prototype, "trunkCoords", {
        // Trunk
        set: function (value) {
            this.boxes[1].coords = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseRender.prototype, "trunkSize", {
        set: function (value) {
            this.boxes[1].size = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseRender.prototype, "trunkUV", {
        set: function (value) {
            this.boxes[1].uv = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseRender.prototype, "chamberCoords", {
        // Chamber
        set: function (value) {
            this.chamberBoxes[0].coords = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseRender.prototype, "chamberSize", {
        set: function (value) {
            this.chamberBoxes[0].size = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseRender.prototype, "chamberUV", {
        set: function (value) {
            this.chamberBoxes[0].uv = value;
        },
        enumerable: false,
        configurable: true
    });
    BaseRender.prototype.refreshChamber = function () {
        this.render.setPart("head.chamber", this.chamberBoxes, this.engineTexture.size);
    };
    ;
    BaseRender.prototype.getModelData = function () {
        return this.boxes;
    };
    return BaseRender;
}(EngineRender));
/// <reference path="EngineRender.ts" />
var PistonRender = /** @class */ (function (_super) {
    __extends(PistonRender, _super);
    function PistonRender() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.boxes = [{
                type: "box",
                uv: null,
                coords: null,
                size: null
            }];
        return _this;
    }
    Object.defineProperty(PistonRender.prototype, "pistonCoords", {
        set: function (value) {
            this.boxes[0].coords = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PistonRender.prototype, "pistonUV", {
        set: function (value) {
            this.boxes[0].uv = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PistonRender.prototype, "pistonSize", {
        set: function (value) {
            this.boxes[0].size = value;
        },
        enumerable: false,
        configurable: true
    });
    PistonRender.prototype.getModelData = function () {
        return this.boxes;
    };
    return PistonRender;
}(EngineRender));
var PipeSpeed = /** @class */ (function () {
    function PipeSpeed(target, delta) {
        this.target = target;
        this.delta = delta;
    }
    Object.defineProperty(PipeSpeed.prototype, "Target", {
        get: function () {
            return this.target;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PipeSpeed.prototype, "Delta", {
        get: function () {
            return this.delta;
        },
        enumerable: false,
        configurable: true
    });
    return PipeSpeed;
}());
var BlockTypePipe = {
    base: 1,
    destroytime: 0.2,
    explosionres: 0.5
};
var PipeBlock = /** @class */ (function () {
    function PipeBlock(material, transportType, texture) {
        this.material = material;
        this.transportType = transportType;
        this.texture = texture;
        this.stringId = "pipe_" + this.transportType + "_" + this.material;
        this.registerBlock();
        this.id = BlockID[this.stringId];
        this.registerShape();
    }
    PipeBlock.prototype.registerBlock = function () {
        IDRegistry.genBlockID(this.stringId);
        Block.createBlock(this.stringId, [{ name: this.stringId, texture: [[this.texture.block.name, this.texture.block.data]], inCreative: true }], BlockTypePipe);
    };
    PipeBlock.prototype.registerShape = function () {
        Block.setBlockShape(this.id, { x: .25, y: .25, z: .25 }, { x: 0.75, y: 0.75, z: 0.75 });
    };
    return PipeBlock;
}());
var PipeTexture = /** @class */ (function () {
    function PipeTexture(block, connection, containerConnection) {
        if (containerConnection === void 0) { containerConnection = connection; }
        this.block = block;
        this.connection = connection;
        this.containerConnection = containerConnection;
    }
    return PipeTexture;
}());
var PipeRecipe = /** @class */ (function () {
    function PipeRecipe(ingredient) {
        this.ingredient = ingredient;
    }
    PipeRecipe.prototype.registerFor = function (item) {
        Recipes.addShaped(item, this.Pattern, this.PatternData);
    };
    Object.defineProperty(PipeRecipe.prototype, "Pattern", {
        get: function () {
            return [
                "aba"
            ];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PipeRecipe.prototype, "PatternData", {
        get: function () {
            return [
                "b", VanillaBlockID.glass, -1,
                "a", this.ingredient.id, this.ingredient.data
            ];
        },
        enumerable: false,
        configurable: true
    });
    return PipeRecipe;
}());
/// <reference path="../abstract/BCPipe.ts" />
var PipeIdMap = /** @class */ (function () {
    function PipeIdMap() {
    }
    PipeIdMap.assignIdAsClass = function (id, cls) {
        this.map[id] = cls;
    };
    PipeIdMap.getClassById = function (id) {
        return this.map[id] || null;
    };
    PipeIdMap.map = {};
    return PipeIdMap;
}());
var PipeConnector = /** @class */ (function () {
    function PipeConnector() {
    }
    /**
     * For vanila block ID
     */
    PipeConnector.prototype.getBlacklistConnectedBlock = function () {
        return [
            { id: VanillaTileID.ender_chest, data: -1 }
        ];
    };
    PipeConnector.prototype.hasBlacklistBlockID = function (id, data) {
        var e_2, _a;
        try {
            for (var _b = __values(this.getBlacklistConnectedBlock()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var bl = _c.value;
                if (id == bl.id && (bl.data < 0 || bl.data == data)) {
                    return true;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return false;
    };
    PipeConnector.prototype.canConnectToPipe = function (target) {
        var e_3, _a;
        var targetGroups = target.renderGroups;
        try {
            for (var _b = __values(this.getConnectionRules()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var rule = _c.value;
                if (rule.name == targetGroups.main.getName()) {
                    if (rule.exclude)
                        return false;
                }
                var secondary = targetGroups.addition;
                if (secondary && rule.name == secondary.getName()) {
                    if (rule.exclude)
                        return false;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return true;
    };
    return PipeConnector;
}());
/// <reference path="../components/PipeBlock.ts" />
/// <reference path="../components/PipeTexture.ts" />
/// <reference path="../components/PipeRecipe.ts" />
/// <reference path="../components/PipeIdMap.ts" />
/// <reference path="../PipeSpeed.ts" />
/// <reference path="PipeConnector.ts" />
var BCPipe = /** @class */ (function () {
    function BCPipe() {
        this.pipeSpeed = BCPipe.StandartPipeSpeed;
        this.block = new PipeBlock(this.material, this.transportType, this.pipeTexture);
        this.renderer = new PipeRenderer(this.pipeConnector, this.pipeTexture, this.renderGroups.main);
        this.recipe = this.getRecipe(this.getIngredientForRecipe());
        this.recipe.registerFor({ id: this.block.id, count: 1, data: 0 });
        this.registerBlockToGroup();
        this.renderer.enableRender(this.block.id, 0);
        PipeIdMap.assignIdAsClass(this.block.id, this);
    }
    /**
     * it a method because we need this in constructor
     */
    BCPipe.prototype.getRecipe = function (ingredient) {
        return new PipeRecipe(ingredient);
    };
    BCPipe.prototype.registerBlockToGroup = function () {
        var groups = this.renderGroups;
        groups.main.add(this.block.id, -1);
        if (groups.addition)
            groups.addition.add(this.block.id, -1);
    };
    Object.defineProperty(BCPipe.prototype, "ICRenderGroup", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BCPipe.prototype, "pipeConnector", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BCPipe.prototype, "renderGroups", {
        get: function () {
            return {
                main: ICRender.getGroup("BCPipe")
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BCPipe.prototype, "pipeTexture", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BCPipe.prototype, "pipeRenderer", {
        get: function () {
            return this.renderer;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BCPipe.prototype, "material", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BCPipe.prototype, "transportType", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BCPipe.prototype, "PipeSpeed", {
        get: function () {
            return this.pipeSpeed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BCPipe, "StandartPipeSpeed", {
        get: function () {
            return this.standartSpeed;
        },
        enumerable: false,
        configurable: true
    });
    BCPipe.standartSpeed = new PipeSpeed(0.01, 0.02);
    return BCPipe;
}());
var PipeDoubleRecipe = /** @class */ (function (_super) {
    __extends(PipeDoubleRecipe, _super);
    function PipeDoubleRecipe(ingredient0, ingredient1) {
        var _this = _super.call(this, ingredient0) || this;
        _this.ingredient0 = ingredient0;
        _this.ingredient1 = ingredient1;
        return _this;
    }
    Object.defineProperty(PipeDoubleRecipe.prototype, "Pattern", {
        get: function () {
            return [
                "abc"
            ];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PipeDoubleRecipe.prototype, "PatternData", {
        get: function () {
            return [
                "b", VanillaBlockID.glass, -1,
                "a", this.ingredient0.id, this.ingredient0.data,
                "c", this.ingredient1.id, this.ingredient1.data,
            ];
        },
        enumerable: false,
        configurable: true
    });
    return PipeDoubleRecipe;
}(PipeRecipe));
/// <reference path="../abstract/PipeConnector.ts" />
var PipeRenderer = /** @class */ (function () {
    function PipeRenderer(connector, texture, renderGroup) {
        this.connector = connector;
        this.texture = texture;
        this.renderGroup = renderGroup;
        this.width = .5;
    }
    Object.defineProperty(PipeRenderer.prototype, "standartICrender", {
        get: function () {
            var render = new ICRender.Model();
            return render;
        },
        enumerable: false,
        configurable: true
    });
    PipeRenderer.prototype.getICrenderAtCoords = function (coords) {
    };
    PipeRenderer.prototype.enableRender = function (id, data) {
        var render = this.standartModel;
        BlockRenderer.setStaticICRender(id, data, render);
        BlockRenderer.enableCoordMapping(id, data, render);
    };
    PipeRenderer.prototype.getBoxes = function (width) {
        return [
            { side: [0, -1, 0], box: [0.5 - width / 2, 0, 0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2] },
            { side: [0, 1, 0], box: [0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2, 1, 0.5 + width / 2] },
            { side: [0, 0, -1], box: [0.5 - width / 2, 0.5 - width / 2, 0, 0.5 + width / 2, 0.5 + width / 2, 0.5 - width / 2] },
            { side: [0, 0, 1], box: [0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, 1] },
            { side: [-1, 0, 0], box: [0, 0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2] },
            { side: [1, 0, 0], box: [0.5 + width / 2, 0.5 - width / 2, 0.5 - width / 2, 1, 0.5 + width / 2, 0.5 + width / 2] }
        ];
    };
    Object.defineProperty(PipeRenderer.prototype, "standartModel", {
        get: function () {
            var e_4, _a, e_5, _b;
            var width = this.width;
            var render = new ICRender.Model();
            var boxes = this.getBoxes(width);
            try {
                for (var boxes_1 = __values(boxes), boxes_1_1 = boxes_1.next(); !boxes_1_1.done; boxes_1_1 = boxes_1.next()) {
                    var box = boxes_1_1.value;
                    var renderModel = BlockRenderer.createModel();
                    var texture = this.texture.connection;
                    var condition = ICRender.BLOCK(box.side[0], box.side[1], box.side[2], this.renderGroup, false);
                    var groupRules = this.connector.getConnectionRules();
                    try {
                        for (var groupRules_1 = (e_5 = void 0, __values(groupRules)), groupRules_1_1 = groupRules_1.next(); !groupRules_1_1.done; groupRules_1_1 = groupRules_1.next()) {
                            var rule = groupRules_1_1.value;
                            var newGroup = ICRender.getGroup(rule.name);
                            var additionCondition = ICRender.BLOCK(box.side[0], box.side[1], box.side[2], newGroup, rule.exclude);
                            if (rule.isANDrule) {
                                condition = ICRender.AND(condition, additionCondition);
                            }
                            else {
                                condition = ICRender.OR(condition, additionCondition);
                            }
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (groupRules_1_1 && !groupRules_1_1.done && (_b = groupRules_1.return)) _b.call(groupRules_1);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                    renderModel.addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5], texture.name, texture.data);
                    render.addEntry(renderModel).setCondition(condition);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (boxes_1_1 && !boxes_1_1.done && (_a = boxes_1.return)) _a.call(boxes_1);
                }
                finally { if (e_4) throw e_4.error; }
            }
            // standart box
            var model = BlockRenderer.createModel();
            var p0 = 0.5 - width / 2;
            var p1 = 0.5 + width / 2;
            model.addBox(p0, p0, p0, p1, p1, p1, this.texture.block.name, this.texture.block.data);
            render.addEntry(model);
            return render;
        },
        enumerable: false,
        configurable: true
    });
    return PipeRenderer;
}());
/// <reference path="../../abstract/PipeConnector.ts" />
var TransportPipeConnector = /** @class */ (function (_super) {
    __extends(TransportPipeConnector, _super);
    function TransportPipeConnector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TransportPipeConnector.prototype.canConnectToGroup = function (groupName) {
        return groupName == "ItemMachine";
    };
    TransportPipeConnector.prototype.canPipesConnect = function (coords0, coords1) {
        return false;
    };
    TransportPipeConnector.prototype.getConnectionRules = function () {
        return [
            { name: "ItemMachine", exclude: false, isANDrule: false }
        ];
    };
    return TransportPipeConnector;
}(PipeConnector));
var e_6, _a;
/// <reference path="abstract/TransportPipeConnector.ts" />
var ITEM_MACHINES = [{ id: 54, data: -1 }];
var transportConnector = new TransportPipeConnector();
var basicRule = transportConnector.getConnectionRules()[0];
try {
    for (var ITEM_MACHINES_1 = __values(ITEM_MACHINES), ITEM_MACHINES_1_1 = ITEM_MACHINES_1.next(); !ITEM_MACHINES_1_1.done; ITEM_MACHINES_1_1 = ITEM_MACHINES_1.next()) {
        var instance = ITEM_MACHINES_1_1.value;
        ICRender.getGroup(basicRule.name).add(instance.id, instance.data);
    }
}
catch (e_6_1) { e_6 = { error: e_6_1 }; }
finally {
    try {
        if (ITEM_MACHINES_1_1 && !ITEM_MACHINES_1_1.done && (_a = ITEM_MACHINES_1.return)) _a.call(ITEM_MACHINES_1);
    }
    finally { if (e_6) throw e_6.error; }
}
Callback.addCallback("PostLoaded", function () {
    // For StorageInterface containers
    // @ts-ignore
    for (var blockID in StorageInterface.data) {
        // @ts-ignore
        ICRender.getGroup(basicRule.name).add(blockID, -1);
    }
});
/// <reference path="../../abstract/BCPipe.ts" />
/// <reference path="../../abstract/PipeConnector.ts" />
var BCTransportPipe = /** @class */ (function (_super) {
    __extends(BCTransportPipe, _super);
    function BCTransportPipe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BCTransportPipe.prototype, "pipeConnector", {
        get: function () {
            if (!this.connector)
                this.connector = new TransportPipeConnector();
            return this.connector;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BCTransportPipe.prototype, "renderGroups", {
        get: function () {
            return {
                main: ICRender.getGroup("BCTransportPipe")
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BCTransportPipe.prototype, "transportType", {
        get: function () {
            return "item";
        },
        enumerable: false,
        configurable: true
    });
    return BCTransportPipe;
}(BCPipe));
/// <reference path="../abstract/TransportPipeConnector.ts" />
var CobblePipeConnector = /** @class */ (function (_super) {
    __extends(CobblePipeConnector, _super);
    function CobblePipeConnector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CobblePipeConnector.prototype.getConnectionRules = function () {
        var old = _super.prototype.getConnectionRules.call(this);
        old.push({ name: "BCPipeStone", exclude: true, isANDrule: true });
        old.push({ name: "BCPipeQuartz", exclude: true, isANDrule: true });
        return old;
    };
    return CobblePipeConnector;
}(TransportPipeConnector));
/// <reference path="../abstract/BCTransportPipe.ts" />
/// <reference path="CobblePipeConnector.ts" />
var PipeCobble = /** @class */ (function (_super) {
    __extends(PipeCobble, _super);
    function PipeCobble() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PipeCobble.prototype, "material", {
        get: function () {
            return "cobble";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PipeCobble.prototype, "pipeConnector", {
        get: function () {
            if (!this.connector)
                this.connector = new CobblePipeConnector();
            return this.connector;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PipeCobble.prototype, "renderGroups", {
        get: function () {
            return {
                main: ICRender.getGroup("BCTransportPipe"),
                addition: ICRender.getGroup("BCPipeCobble")
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PipeCobble.prototype, "pipeTexture", {
        get: function () {
            var textureName = "pipe_" + this.transportType + "_" + this.material;
            if (!this.texture)
                this.texture = new PipeTexture({ name: textureName, data: 0 }, { name: textureName, data: 1 });
            return this.texture;
        },
        enumerable: false,
        configurable: true
    });
    PipeCobble.prototype.getIngredientForRecipe = function () {
        return { id: VanillaBlockID.cobblestone, count: 1, data: 0 };
    };
    return PipeCobble;
}(BCTransportPipe));
var cobblePipe = new PipeCobble();
var DIAMOND_PIPE_COLORS = [
    "green",
    "yellow",
    "white",
    "black",
    "blue",
    "red"
];
var diamondPipeUIContext = {
    standard: {
        header: {
            text: { text: "Diamond Transporting Pipe" }
        },
        background: {
            standard: true,
        },
        inventory: {
            standard: true
        }
    },
    elements: {}
};
var diamondPipeUI = new UI.StandartWindow(diamondPipeUIContext);
for (var i = 0; i < 6; i++) {
    var color = DIAMOND_PIPE_COLORS[i];
    for (var j = 0; j < 9; j++) {
        diamondPipeUI.content.elements["slot_" + i + "_" + j] = {
            type: "slot",
            bitmap: "diamond_pipe_slot_" + color,
            x: 370 + j * 65, y: 80 + i * 65
        };
    }
    ;
}
/// <reference path="../../components/PipeRenderer.ts" />
var DiamondPipeRenderer = /** @class */ (function (_super) {
    __extends(DiamondPipeRenderer, _super);
    function DiamondPipeRenderer(connector, texture, renderGroup) {
        var _this = _super.call(this, connector, texture, renderGroup) || this;
        _this.connector = connector;
        _this.texture = texture;
        _this.renderGroup = renderGroup;
        return _this;
    }
    Object.defineProperty(DiamondPipeRenderer.prototype, "standartModel", {
        get: function () {
            var e_7, _a;
            var width = this.width;
            var render = new ICRender.Model();
            var boxes = this.getBoxes(width);
            for (var i = 0; i < 6; i++) {
                var box = boxes[i];
                var renderModel = BlockRenderer.createModel();
                var texture = this.texture.connection;
                var condition = ICRender.BLOCK(box.side[0], box.side[1], box.side[2], this.renderGroup, false);
                var groupRules = this.connector.getConnectionRules();
                try {
                    for (var groupRules_2 = (e_7 = void 0, __values(groupRules)), groupRules_2_1 = groupRules_2.next(); !groupRules_2_1.done; groupRules_2_1 = groupRules_2.next()) {
                        var rule = groupRules_2_1.value;
                        var newGroup = ICRender.getGroup(rule.name);
                        var additionCondition = ICRender.BLOCK(box.side[0], box.side[1], box.side[2], newGroup, rule.exclude);
                        if (rule.isANDrule) {
                            condition = ICRender.AND(condition, additionCondition);
                        }
                        else {
                            condition = ICRender.OR(condition, additionCondition);
                        }
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (groupRules_2_1 && !groupRules_2_1.done && (_a = groupRules_2.return)) _a.call(groupRules_2);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
                renderModel.addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5], texture.name, i + 1);
                render.addEntry(renderModel).setCondition(condition);
            }
            // standart box
            var model = BlockRenderer.createModel();
            var p0 = 0.5 - width / 2;
            var p1 = 0.5 + width / 2;
            model.addBox(p0, p0, p0, p1, p1, p1, this.texture.block.name, this.texture.block.data);
            render.addEntry(model);
            return render;
        },
        enumerable: false,
        configurable: true
    });
    return DiamondPipeRenderer;
}(PipeRenderer));
/// <reference path="DiamondPipeGUI.ts" />
var DiamondPipeTileEntity = /** @class */ (function () {
    function DiamondPipeTileEntity(renderer, texture) {
        this.renderer = renderer;
        this.texture = texture;
        this.useNetworkItemContainer = true;
        // !TileEntity event
        this.getScreenName = function (player, coords) { return "main"; };
        // !TileEntity event
        this.getScreenByName = function (screenName) { return diamondPipeUI; };
    }
    DiamondPipeTileEntity.prototype.canItemGoToSide = function (item, index) {
        var hasFilter = false;
        for (var i = 0; i < 9; i++) {
            var slot = this.container.getSlot("slot_" + index + "_" + i);
            if (slot.id == 0)
                continue;
            if (!hasFilter)
                hasFilter = true;
            if (slot.id == item.id && slot.data == item.data)
                return true;
        }
        return !hasFilter;
    };
    return DiamondPipeTileEntity;
}());
/// <reference path="../abstract/BCTransportPipe.ts" />
/// <reference path="DiamondPipeTileEntity.ts" />
/// <reference path="DiamondPipeRenderer.ts" />
var PipeDiamond = /** @class */ (function (_super) {
    __extends(PipeDiamond, _super);
    function PipeDiamond() {
        var _this = _super.call(this) || this;
        _this.renderer = new DiamondPipeRenderer(_this.pipeConnector, _this.pipeTexture, _this.renderGroups.main);
        _this.renderer.enableRender(_this.block.id, 0);
        TileEntity.registerPrototype(_this.block.id, new DiamondPipeTileEntity(_this.pipeRenderer, _this.texture));
        StorageInterface.createInterface(_this.block.id, {
            isValidInput: function (item) { return false; }
        });
        return _this;
    }
    Object.defineProperty(PipeDiamond.prototype, "material", {
        get: function () {
            return "diamond";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PipeDiamond.prototype, "pipeTexture", {
        get: function () {
            var textre = "pipe_" + this.transportType + "_" + this.material;
            if (!this.texture) {
                this.texture = new PipeTexture({ name: textre, data: 0 }, { name: textre, data: 1 });
            }
            return this.texture;
        },
        enumerable: false,
        configurable: true
    });
    PipeDiamond.prototype.getIngredientForRecipe = function () {
        return { id: VanillaItemID.diamond, count: 1, data: 0 };
    };
    return PipeDiamond;
}(BCTransportPipe));
var diamondPipe = new PipeDiamond();
/// <reference path="../abstract/BCTransportPipe.ts" />
var PipeGold = /** @class */ (function (_super) {
    __extends(PipeGold, _super);
    function PipeGold() {
        var _this = _super.call(this) || this;
        _this.pipeSpeed = new PipeSpeed(0.25, 0.07);
        return _this;
    }
    Object.defineProperty(PipeGold.prototype, "material", {
        get: function () {
            return "gold";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PipeGold.prototype, "pipeTexture", {
        get: function () {
            var textureName = "pipe_" + this.transportType + "_" + this.material;
            if (!this.texture)
                this.texture = new PipeTexture({ name: textureName, data: 0 }, { name: textureName, data: 1 });
            return this.texture;
        },
        enumerable: false,
        configurable: true
    });
    PipeGold.prototype.getIngredientForRecipe = function () {
        return { id: VanillaItemID.gold_ingot, count: 1, data: 0 };
    };
    return PipeGold;
}(BCTransportPipe));
var goldPipe = new PipeGold();
var IronPipeClient = /** @class */ (function () {
    function IronPipeClient(renderer, texture, connector) {
        this.renderer = renderer;
        this.texture = texture;
        this.connector = connector;
    }
    IronPipeClient.prototype.load = function () {
        var _this = this;
        var id = BlockSource.getDefaultForDimension(this.dimension).getBlockId(this.x, this.y, this.z);
        var pipe = PipeIdMap.getClassById(id);
        this.renderConnector = new IronPipeRenderConnector(pipe, this, this.renderer, this.connector, this.texture);
        this.renderConnector.ConnectionSide = this.networkData.getInt("orientation");
        this.networkData.addOnDataChangedListener(function (networkData, isExternalChange) {
            _this.renderConnector.ConnectionSide = networkData.getInt("orientation");
        });
    };
    IronPipeClient.prototype.unload = function () {
        this.renderConnector.destroy();
    };
    return IronPipeClient;
}());
var IronPipeRenderConnector = /** @class */ (function () {
    function IronPipeRenderConnector(pipeClass, coords, renderer, connector, texture) {
        this.pipeClass = pipeClass;
        this.coords = coords;
        this.renderer = renderer;
        this.connector = connector;
        this.texture = texture;
    }
    Object.defineProperty(IronPipeRenderConnector.prototype, "ConnectionSide", {
        get: function () {
            return this.side;
        },
        set: function (value) {
            this.side = value;
            this.updateConnections();
        },
        enumerable: false,
        configurable: true
    });
    IronPipeRenderConnector.prototype.updateConnections = function () {
        var e_8, _a;
        var width = this.renderer.width;
        var render = new ICRender.Model();
        var boxes = this.renderer.getBoxes(width);
        for (var i = 0; i < 6; i++) {
            var box = boxes[i];
            var renderModel = BlockRenderer.createModel();
            var condition = ICRender.BLOCK(box.side[0], box.side[1], box.side[2], this.pipeClass.renderGroups.main, false);
            var groupRules = this.connector.getConnectionRules();
            try {
                for (var groupRules_3 = (e_8 = void 0, __values(groupRules)), groupRules_3_1 = groupRules_3.next(); !groupRules_3_1.done; groupRules_3_1 = groupRules_3.next()) {
                    var rule = groupRules_3_1.value;
                    var newGroup = ICRender.getGroup(rule.name);
                    var additionCondition = ICRender.BLOCK(box.side[0], box.side[1], box.side[2], newGroup, rule.exclude);
                    if (rule.isANDrule) {
                        condition = ICRender.AND(condition, additionCondition);
                    }
                    else {
                        condition = ICRender.OR(condition, additionCondition);
                    }
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (groupRules_3_1 && !groupRules_3_1.done && (_a = groupRules_3.return)) _a.call(groupRules_3);
                }
                finally { if (e_8) throw e_8.error; }
            }
            var texture = void 0;
            if (this.ConnectionSide != i) {
                texture = this.texture.containerConnection;
            }
            else {
                texture = this.texture.connection;
            }
            renderModel.addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5], texture.name, texture.data);
            render.addEntry(renderModel).setCondition(condition);
        }
        // standart box
        var model = BlockRenderer.createModel();
        var p0 = 0.5 - width / 2;
        var p1 = 0.5 + width / 2;
        model.addBox(p0, p0, p0, p1, p1, p1, this.texture.block.name, this.texture.block.data);
        render.addEntry(model);
        BlockRenderer.mapAtCoords(this.coords.x, this.coords.y, this.coords.z, render);
    };
    IronPipeRenderConnector.prototype.destroy = function () {
        BlockRenderer.unmapAtCoords(this.coords.x, this.coords.y, this.coords.z);
    };
    return IronPipeRenderConnector;
}());
/// <reference path="IronPipeClient.ts" />
var IronPipeTileEntity = /** @class */ (function () {
    function IronPipeTileEntity(renderer, pipeConnector, texture) {
        this.renderer = renderer;
        this.pipeConnector = pipeConnector;
        this.texture = texture;
        this.clientFactory = new ClientFactory(IronPipeClient);
        this.data = {};
        this.defaultValues = {
            connectionSide: -1
        };
        this.client = this.clientFactory.instantiate(renderer, texture, pipeConnector);
    }
    IronPipeTileEntity.prototype.changeOrientation = function () {
        // ? if connection side is null put < 0 to syncData
        this.networkData.putInt("orientation", this.data.connectionSide);
        this.networkData.sendChanges();
    };
    // !TileEntity event
    IronPipeTileEntity.prototype.init = function () {
        this.checkConnection();
    };
    // !TileEntity event
    IronPipeTileEntity.prototype.click = function (id, count, data) {
        if (id != ItemID.bc_wrench)
            return false;
        this.updateConnectionSide(true);
        return true;
    };
    IronPipeTileEntity.prototype.updateConnectionSide = function (findNext) {
        if (findNext === void 0) { findNext = false; }
        this.data.connectionSide = this.getConnectionSide(findNext);
        this.changeOrientation();
    };
    IronPipeTileEntity.prototype.canItemGoToSide = function (item, index) {
        return index == this.data.connectionSide;
    };
    /** @param findNext - use true value if you want to rerotate pipe like a wrench */
    IronPipeTileEntity.prototype.getConnectionSide = function (findNext) {
        if (findNext === void 0) { findNext = false; }
        // * In common situation ends when i gets max in 5 index
        // * But if fhis function calling by wrench index can go beyound
        // * I think this code is poor, but maybe i fix it in future
        for (var t = 0; t < 12; t++) {
            var i = t % 6;
            if (findNext) {
                if (this.data.connectionSide == t) {
                    findNext = false;
                }
                continue;
            }
            var relCoords = World.getRelativeCoords(this.x, this.y, this.z, i);
            if (this.canConnectTo(relCoords))
                return i;
        }
        // default value
        return -1;
    };
    IronPipeTileEntity.prototype.checkConnection = function () {
        if (this.data.connectionSide < 0) {
            this.updateConnectionSide();
        }
        else {
            var coords = World.getRelativeCoords(this.x, this.y, this.z, this.data.connectionSide);
            if (!this.canConnectTo(coords)) {
                this.updateConnectionSide();
            }
            else {
                this.changeOrientation();
            }
        }
    };
    IronPipeTileEntity.prototype.canConnectTo = function (coords) {
        var x = coords.x, y = coords.y, z = coords.z;
        var blockID = this.blockSource.getBlockId(x, y, z);
        var relativePipe = PipeIdMap.getClassById(blockID);
        if (relativePipe) {
            return this.pipeConnector.canConnectToPipe(relativePipe);
        }
        var container = World.getContainer(x, y, z, this.blockSource);
        return this.isValidContainer(container);
    };
    IronPipeTileEntity.prototype.isValidContainer = function (container) {
        if (!container)
            return false;
        // ? if NativeTileEntity is NullObject
        if (container.getSlot(0) == null)
            return false;
        // ! container.slots contain not only slots. It containt saverID too.
        // ! container.slots.length = 1 means that container has 0 slots
        if (!container.slots || container.slots.length > 1)
            return true;
    };
    return IronPipeTileEntity;
}());
/// <reference path="../abstract/BCTransportPipe.ts" />
/// <reference path="IronPipeTileEntity.ts" />
var PipeIron = /** @class */ (function (_super) {
    __extends(PipeIron, _super);
    function PipeIron() {
        var _this = _super.call(this) || this;
        TileEntity.registerPrototype(_this.block.id, new IronPipeTileEntity(_this.pipeRenderer, _this.connector, _this.texture));
        Block.registerNeighbourChangeFunctionForID(_this.block.id, function (coords, block, changeCoords, region) {
            var tile = World.getTileEntity(coords.x, coords.y, coords.z, region);
            if (tile && TileEntity.isTileEntityLoaded(tile)) {
                tile.checkConnection();
            }
        });
        return _this;
    }
    Object.defineProperty(PipeIron.prototype, "material", {
        get: function () {
            return "iron";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PipeIron.prototype, "pipeTexture", {
        get: function () {
            var textre = "pipe_" + this.transportType + "_" + this.material;
            if (!this.texture) {
                this.texture = new PipeTexture({ name: textre, data: 0 }, { name: textre, data: 1 }, { name: textre, data: 2 });
            }
            return this.texture;
        },
        enumerable: false,
        configurable: true
    });
    PipeIron.prototype.getIngredientForRecipe = function () {
        return { id: VanillaItemID.iron_ingot, count: 1, data: 0 };
    };
    return PipeIron;
}(BCTransportPipe));
var ironPipe = new PipeIron();
var AxisBoxes = /** @class */ (function () {
    function AxisBoxes() {
    }
    Object.defineProperty(AxisBoxes, "X", {
        get: function () {
            return {
                start: {
                    x: 0,
                    y: -1,
                    z: -1
                },
                end: {
                    x: 1,
                    y: 2,
                    z: 2
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisBoxes, "Y", {
        get: function () {
            return {
                start: {
                    x: -1,
                    y: 0,
                    z: -1
                },
                end: {
                    x: 2,
                    y: 1,
                    z: 2
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisBoxes, "Z", {
        get: function () {
            return {
                start: {
                    x: -1,
                    y: -1,
                    z: 0
                },
                end: {
                    x: 2,
                    y: 2,
                    z: 1
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    return AxisBoxes;
}());
/// <reference path="../abstract/TransportPipeConnector.ts" />
var ObsidianPipeConnector = /** @class */ (function (_super) {
    __extends(ObsidianPipeConnector, _super);
    function ObsidianPipeConnector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ObsidianPipeConnector.prototype.getConnectionRules = function () {
        var old = _super.prototype.getConnectionRules.call(this);
        old.push({ name: "BCPipeObsidian", exclude: true, isANDrule: true });
        return old;
    };
    return ObsidianPipeConnector;
}(TransportPipeConnector));
/// <reference path="AxisBoxes.ts" />
var OBSIDIAN_PIPE_DROP_VELOCITY = +__config__.getNumber("obsidian_pipe_drop_velocity");
var ObsidianPipeItemAccelerator = /** @class */ (function () {
    function ObsidianPipeItemAccelerator(region, coords) {
        this.region = region;
        this.coords = coords;
        this.side = null;
    }
    Object.defineProperty(ObsidianPipeItemAccelerator.prototype, "ConnectionSide", {
        get: function () {
            return this.side;
        },
        set: function (value) {
            this.side = value;
        },
        enumerable: false,
        configurable: true
    });
    ObsidianPipeItemAccelerator.prototype.accelerate = function (count) {
        var e_9, _a;
        if (this.ConnectionSide === null || count <= 0)
            return;
        var target = this.coords;
        var side = this.ConnectionSide;
        var box = this.getMovedAxisBoxBySide(target, side);
        var entities = this.getItems(box, this.region);
        try {
            for (var entities_1 = __values(entities), entities_1_1 = entities_1.next(); !entities_1_1.done; entities_1_1 = entities_1.next()) {
                var entity = entities_1_1.value;
                Entity.moveToTarget(entity, this.getMoveTarget(), { speed: OBSIDIAN_PIPE_DROP_VELOCITY });
                return;
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (entities_1_1 && !entities_1_1.done && (_a = entities_1.return)) _a.call(entities_1);
            }
            finally { if (e_9) throw e_9.error; }
        }
    };
    ObsidianPipeItemAccelerator.prototype.getItems = function (box, region) {
        var _a = box.start, x = _a.x, y = _a.y, z = _a.z;
        var end = box.end;
        return region.listEntitiesInAABB(x, y, z, end.x, end.y, end.z, 64, false);
    };
    ObsidianPipeItemAccelerator.prototype.getMoveTarget = function () {
        var x = this.coords.x + .5;
        var y = this.coords.y + .5;
        var z = this.coords.z + .5;
        return { x: x, y: y, z: z };
    };
    ObsidianPipeItemAccelerator.prototype.getStandartBoxPoints = function (side) {
        switch (side) {
            case 0:
            case 1:
                return AxisBoxes.Y;
            case 2:
            case 3:
                return AxisBoxes.Z;
            case 4:
            case 5:
                return AxisBoxes.X;
        }
    };
    ObsidianPipeItemAccelerator.prototype.getMovedAxisBoxBySide = function (target, side) {
        var box = this.getStandartBoxPoints(side);
        var movVector = this.getVectorBySide(side);
        box = {
            start: {
                x: target.x + movVector.x + box.start.x,
                y: target.y + movVector.y + box.start.y,
                z: target.z + movVector.z + box.start.z
            },
            end: {
                x: target.x + movVector.x + box.end.x,
                y: target.y + movVector.y + box.end.y,
                z: target.z + movVector.z + box.end.z
            }
        };
        return box;
    };
    ObsidianPipeItemAccelerator.prototype.getVectorBySide = function (side) {
        var invertedSide = World.getInverseBlockSide(side);
        return World.getRelativeCoords(0, 0, 0, invertedSide);
    };
    return ObsidianPipeItemAccelerator;
}());
var ObsidianPipeItemEjector = /** @class */ (function () {
    function ObsidianPipeItemEjector(region, coords) {
        this.region = region;
        this.coords = coords;
        this.side = null;
    }
    Object.defineProperty(ObsidianPipeItemEjector.prototype, "ConnectionSide", {
        get: function () {
            return this.side;
        },
        set: function (value) {
            this.side = value;
        },
        enumerable: false,
        configurable: true
    });
    ObsidianPipeItemEjector.prototype.collectEntities = function (maxCount) {
        var e_10, _a;
        var boxEnd = {
            x: this.coords.x + 1,
            y: this.coords.y + 1,
            z: this.coords.z + 1
        };
        var _b = this.coords, x = _b.x, y = _b.y, z = _b.z;
        var entitiesToCollect = this.region.listEntitiesInAABB(x, y, z, boxEnd.x, boxEnd.y, boxEnd.z, 64, false);
        try {
            for (var entitiesToCollect_1 = __values(entitiesToCollect), entitiesToCollect_1_1 = entitiesToCollect_1.next(); !entitiesToCollect_1_1.done; entitiesToCollect_1_1 = entitiesToCollect_1.next()) {
                var entity = entitiesToCollect_1_1.value;
                if (!Entity.isExist(entity))
                    return;
                var item = Entity.getDroppedItem(entity);
                if (item.count <= maxCount) {
                    var speed = this.getItemSpeed(entity);
                    this.extractItem(item, speed);
                    Entity.remove(entity);
                }
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (entitiesToCollect_1_1 && !entitiesToCollect_1_1.done && (_a = entitiesToCollect_1.return)) _a.call(entitiesToCollect_1);
            }
            finally { if (e_10) throw e_10.error; }
        }
    };
    ObsidianPipeItemEjector.prototype.extractItem = function (item, speed) {
        var _a;
        var offsetVector = World.getRelativeCoords(0, 0, 0, this.ConnectionSide);
        // ? should I add offsetDistance to config?
        var offsetDistance = (_a = +__config__.getNumber("travelingItem_offset_distance")) !== null && _a !== void 0 ? _a : 0.01;
        var itemCoords = {
            x: this.coords.x + 0.5 + offsetDistance * offsetVector.x,
            y: this.coords.y + 0.5 + offsetDistance * offsetVector.y,
            z: this.coords.z + 0.5 + offsetDistance * offsetVector.z,
        };
        var travelingItem = new TravelingItem(itemCoords, this.region.getDimension(), item, this.ConnectionSide, speed);
    };
    ObsidianPipeItemEjector.prototype.getItemSpeed = function (entity) {
        var distance = Entity.getDistanceToCoords(entity, this.coords);
        return Math.max(distance / 50, BCPipe.StandartPipeSpeed.Target);
    };
    return ObsidianPipeItemEjector;
}());
var ObsidianPipeTargetConnector = /** @class */ (function () {
    function ObsidianPipeTargetConnector(region, coords, pipeConnector) {
        this.region = region;
        this.coords = coords;
        this.pipeConnector = pipeConnector;
    }
    ObsidianPipeTargetConnector.prototype.getTargetSide = function () {
        var findedTarget = null;
        for (var side = 0; side < 6; side++) {
            var _a = World.getRelativeCoords(this.coords.x, this.coords.y, this.coords.z, side), x = _a.x, y = _a.y, z = _a.z;
            var targetPipe = PipeIdMap.getClassById(this.region.getBlockId(x, y, z));
            var isContainer = this.isValidContainerAtCoords(this.region, x, y, z);
            var isValidPipe = false;
            if (targetPipe && this.pipeConnector.canConnectToPipe(targetPipe))
                isValidPipe = true;
            if (isContainer || isValidPipe) {
                if (findedTarget == null) {
                    findedTarget = side;
                }
                else {
                    return null;
                }
            }
        }
        return findedTarget;
    };
    ObsidianPipeTargetConnector.prototype.isValidContainerAtCoords = function (region, x, y, z) {
        var container = World.getContainer(x, y, z, region);
        if (!container)
            return false;
        // ! container.slots contain not only slots. It containt saverID too.
        // ! container.slots.length = 1 means that container has 0 slots
        if (!container.slots || container.slots.length > 1)
            return true;
    };
    return ObsidianPipeTargetConnector;
}());
/// <reference path="ObsidianPipeTargetConnector.ts" />
/// <reference path="ObsidianPipeItemEjector.ts" />
/// <reference path="ObsidianPipeItemAccelerator.ts" />
var ObsidianPipeTileEntity = /** @class */ (function () {
    function ObsidianPipeTileEntity(pipeConnector) {
        this.pipeConnector = pipeConnector;
        // * it will be rewriten during runtime
        this.data = {};
        this.defaultValues = {
            connectionSide: null,
            energy: 0
        };
    }
    // !TileEntity event
    ObsidianPipeTileEntity.prototype.init = function () {
        var pipe = PipeIdMap.getClassById(this.blockSource.getBlockId(this.x, this.y, this.z));
        this.targetConnector = new ObsidianPipeTargetConnector(this.blockSource, this, this.pipeConnector);
        this.ejector = new ObsidianPipeItemEjector(this.blockSource, this);
        this.accelerator = new ObsidianPipeItemAccelerator(this.blockSource, this);
        this.updateConnection();
    };
    // !TileEntity event
    ObsidianPipeTileEntity.prototype.tick = function () {
        if ((this.ejector && this.data.connectionSide !== null)) {
            this.ejector.collectEntities(this.maxEntitiesToCollect());
            this.accelerator.accelerate(this.maxEntitiesToPull());
        }
        this.data.energy = 0;
    };
    // !TileEntity event
    ObsidianPipeTileEntity.prototype.destroy = function () {
        this.ejector = null;
    };
    // !EnergyNet event
    ObsidianPipeTileEntity.prototype.energyReceive = function (type, amount, voltage) {
        var storage = this.getMaxEnergyStored();
        var readyToReceive = Math.min(storage - amount, this.getMaxEnergyReceive());
        var received = Math.min(readyToReceive, amount);
        this.data.energy += received;
        return received;
    };
    ObsidianPipeTileEntity.prototype.updateConnection = function () {
        this.data.connectionSide = this.targetConnector.getTargetSide();
        this.ejector.ConnectionSide = this.data.connectionSide;
        this.accelerator.ConnectionSide = this.data.connectionSide;
    };
    ObsidianPipeTileEntity.prototype.maxEntitiesToCollect = function () {
        return 64;
    };
    ObsidianPipeTileEntity.prototype.maxEntitiesToPull = function () {
        return Math.floor(this.data.energy / 10);
    };
    ObsidianPipeTileEntity.prototype.canConnectRedstoneEngine = function () {
        return true;
    };
    ObsidianPipeTileEntity.prototype.getMaxEnergyStored = function () {
        return 2560;
    };
    ObsidianPipeTileEntity.prototype.getMaxEnergyReceive = function () {
        return 640;
    };
    return ObsidianPipeTileEntity;
}());
/// <reference path="../abstract/BCTransportPipe.ts" />
/// <reference path="ObsidianPipeConnector.ts" />
/// <reference path="ObsidianPipeTileEntity.ts" />
var PipeObsidian = /** @class */ (function (_super) {
    __extends(PipeObsidian, _super);
    function PipeObsidian() {
        var _this = _super.call(this) || this;
        TileEntity.registerPrototype(_this.block.id, new ObsidianPipeTileEntity(_this.pipeConnector));
        EnergyTileRegistry.addEnergyTypeForId(_this.block.id, RF);
        Block.registerNeighbourChangeFunctionForID(_this.block.id, function (coords, block, changeCoords, region) {
            var tile = World.getTileEntity(coords.x, coords.y, coords.z, region);
            if (tile && tile.targetConnector) {
                tile.updateConnection();
            }
        });
        return _this;
    }
    Object.defineProperty(PipeObsidian.prototype, "material", {
        get: function () {
            return "obsidian";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PipeObsidian.prototype, "pipeConnector", {
        get: function () {
            if (!this.connector)
                this.connector = new ObsidianPipeConnector();
            return this.connector;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PipeObsidian.prototype, "renderGroups", {
        get: function () {
            return {
                main: ICRender.getGroup("BCTransportPipe"),
                addition: ICRender.getGroup("BCPipeObsidian"),
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PipeObsidian.prototype, "pipeTexture", {
        get: function () {
            var textureName = "pipe_" + this.transportType + "_" + this.material;
            if (!this.texture)
                this.texture = new PipeTexture({ name: textureName, data: 0 }, { name: textureName, data: 1 });
            return this.texture;
        },
        enumerable: false,
        configurable: true
    });
    PipeObsidian.prototype.getIngredientForRecipe = function () {
        return { id: VanillaBlockID.obsidian, count: 1, data: 0 };
    };
    return PipeObsidian;
}(BCTransportPipe));
var obsidianPipe = new PipeObsidian();
/// <reference path="../abstract/TransportPipeConnector.ts" />
var QuartzPipeConnector = /** @class */ (function (_super) {
    __extends(QuartzPipeConnector, _super);
    function QuartzPipeConnector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QuartzPipeConnector.prototype.getConnectionRules = function () {
        var old = _super.prototype.getConnectionRules.call(this);
        old.push({ name: "BCPipeStone", exclude: true, isANDrule: true });
        old.push({ name: "BCPipeCobble", exclude: true, isANDrule: true });
        return old;
    };
    return QuartzPipeConnector;
}(TransportPipeConnector));
/// <reference path="../abstract/BCTransportPipe.ts" />
/// <reference path="QuartzPipeConnector.ts" />
var PipeQuartz = /** @class */ (function (_super) {
    __extends(PipeQuartz, _super);
    function PipeQuartz() {
        var _this = _super.call(this) || this;
        _this.pipeSpeed = new PipeSpeed(0.01, 0.002);
        return _this;
    }
    Object.defineProperty(PipeQuartz.prototype, "material", {
        get: function () {
            return "quartz";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PipeQuartz.prototype, "pipeConnector", {
        get: function () {
            if (!this.connector)
                this.connector = new QuartzPipeConnector();
            return this.connector;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PipeQuartz.prototype, "renderGroups", {
        get: function () {
            return {
                main: ICRender.getGroup("BCTransportPipe"),
                addition: ICRender.getGroup("BCPipeQuartz")
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PipeQuartz.prototype, "pipeTexture", {
        get: function () {
            var textureName = "pipe_" + this.transportType + "_" + this.material;
            if (!this.texture)
                this.texture = new PipeTexture({ name: textureName, data: 0 }, { name: textureName, data: 1 });
            return this.texture;
        },
        enumerable: false,
        configurable: true
    });
    PipeQuartz.prototype.getIngredientForRecipe = function () {
        return { id: VanillaItemID.quartz, count: 1, data: 0 };
    };
    return PipeQuartz;
}(BCTransportPipe));
var quartzPipe = new PipeQuartz();
/// <reference path="../abstract/TransportPipeConnector.ts" />
/// <reference path="../ItemMachines.ts" />
var SandstonePipeConnector = /** @class */ (function (_super) {
    __extends(SandstonePipeConnector, _super);
    function SandstonePipeConnector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SandstonePipeConnector.prototype.getConnectionRules = function () {
        return [];
    };
    SandstonePipeConnector.prototype.getBlacklistConnectedBlock = function () {
        return ITEM_MACHINES;
    };
    return SandstonePipeConnector;
}(TransportPipeConnector));
/// <reference path="../abstract/BCTransportPipe.ts" />
/// <reference path="SandstonePipeConnector.ts" />
var PipeSandstone = /** @class */ (function (_super) {
    __extends(PipeSandstone, _super);
    function PipeSandstone() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PipeSandstone.prototype, "material", {
        get: function () {
            return "sandstone";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PipeSandstone.prototype, "pipeConnector", {
        get: function () {
            if (!this.connector)
                this.connector = new SandstonePipeConnector();
            return this.connector;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PipeSandstone.prototype, "pipeTexture", {
        get: function () {
            var textureName = "pipe_" + this.transportType + "_" + this.material;
            if (!this.texture)
                this.texture = new PipeTexture({ name: textureName, data: 0 }, { name: textureName, data: 1 });
            return this.texture;
        },
        enumerable: false,
        configurable: true
    });
    PipeSandstone.prototype.getIngredientForRecipe = function () {
        return { id: VanillaBlockID.sandstone, count: 1, data: 0 };
    };
    return PipeSandstone;
}(BCTransportPipe));
var sandstonePipe = new PipeSandstone();
/// <reference path="../abstract/TransportPipeConnector.ts" />
var StonePipeConnector = /** @class */ (function (_super) {
    __extends(StonePipeConnector, _super);
    function StonePipeConnector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StonePipeConnector.prototype.getConnectionRules = function () {
        var old = _super.prototype.getConnectionRules.call(this);
        old.push({ name: "BCPipeCobble", exclude: true, isANDrule: true });
        old.push({ name: "BCPipeQuartz", exclude: true, isANDrule: true });
        return old;
    };
    return StonePipeConnector;
}(TransportPipeConnector));
/// <reference path="../abstract/BCTransportPipe.ts" />
/// <reference path="StonePipeConnector.ts" />
var PipeStone = /** @class */ (function (_super) {
    __extends(PipeStone, _super);
    function PipeStone() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PipeStone.prototype, "material", {
        get: function () {
            return "stone";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PipeStone.prototype, "pipeConnector", {
        get: function () {
            if (!this.connector)
                this.connector = new StonePipeConnector();
            return this.connector;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PipeStone.prototype, "renderGroups", {
        get: function () {
            return {
                main: ICRender.getGroup("BCTransportPipe"),
                addition: ICRender.getGroup("BCPipeStone")
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PipeStone.prototype, "pipeTexture", {
        get: function () {
            var textureName = "pipe_" + this.transportType + "_" + this.material;
            if (!this.texture)
                this.texture = new PipeTexture({ name: textureName, data: 0 }, { name: textureName, data: 1 });
            return this.texture;
        },
        enumerable: false,
        configurable: true
    });
    PipeStone.prototype.getIngredientForRecipe = function () {
        return { id: VanillaBlockID.stone, count: 1, data: 0 };
    };
    return PipeStone;
}(BCTransportPipe));
var stonePipe = new PipeStone();
/// <reference path="TravelingItemMoveData.ts" />
var IS_INTERPOLATION_ENABLED = __config__.getBool("animation_movement_interpolation");
var AVERAGE_PING = +__config__.getNumber("relative_max_ping");
var TravelingItemAnimation = /** @class */ (function () {
    function TravelingItemAnimation(coords, item) {
        var _this = this;
        this.coords = coords;
        this.randomOffset = Math.random() / 100;
        this.remove = false;
        this.update = function () {
            if (_this.time < _this.targetPos2.time) {
                if (_this.time < _this.targetPos1.time) {
                    // go to targetPos1
                    var progress = Math.min(_this.time / _this.targetPos1.time, 1);
                    _this.updateCoords(_this.interpolateBetweenPositions(_this.startPos, _this.targetPos1, progress));
                }
                else {
                    // go to targetPos2
                    var progress = Math.min(1, (_this.time - _this.targetPos1.time) / (_this.targetPos2.time - _this.targetPos1.time));
                    _this.updateCoords(_this.interpolateBetweenPositions(_this.targetPos1, _this.targetPos2, progress));
                }
            }
            _this.time++;
            var _a = _this.Coords, x = _a.x, y = _a.y, z = _a.z;
            _this.animation.setPos(x, y, z);
        };
        this.animation = new Animation.Item(coords.x, coords.y, coords.z);
        this.describe(item);
        this.animation.load();
        this.animation.setInterpolationEnabled(IS_INTERPOLATION_ENABLED);
    }
    Object.defineProperty(TravelingItemAnimation.prototype, "Coords", {
        get: function () {
            return this.coords;
        },
        enumerable: false,
        configurable: true
    });
    TravelingItemAnimation.prototype.updateMoveData = function (packet) {
        var moveVector = this.getVectorBySide(packet.vectorIndex);
        this.time = 0;
        this.startPos = this.Coords;
        var totalTime = Math.min(packet.time * 1.5, packet.time + AVERAGE_PING);
        // axis is "x", "y" or "z"
        var axis = this.getAxisByIndex(packet.vectorIndex);
        var distance = Math.abs(packet.coordsFrom[axis] - this.startPos[axis]);
        // dis1To2 is always 1
        var speed = (distance + 1) / totalTime;
        var time1 = distance / speed / 50;
        this.targetPos1 = {
            x: packet.coordsFrom.x,
            y: packet.coordsFrom.y,
            z: packet.coordsFrom.z,
            time: time1,
        };
        var time2 = totalTime / 50;
        this.targetPos2 = {
            x: this.targetPos1.x + moveVector.x,
            y: this.targetPos1.y + moveVector.y,
            z: this.targetPos1.z + moveVector.z,
            time: time2,
        };
    };
    /**
     * Thanks Zheka2304
     */
    TravelingItemAnimation.prototype.interpolateBetweenPositions = function (pos1, pos2, f) {
        f = Math.min(Math.max(0, f), 1);
        return {
            x: pos1.x * (1 - f) + pos2.x * f,
            y: pos1.y * (1 - f) + pos2.y * f,
            z: pos1.z * (1 - f) + pos2.z * f,
        };
    };
    TravelingItemAnimation.prototype.describe = function (item) {
        this.animation.describeItem({
            id: Network.serverToLocalId(item.id),
            count: 1,
            data: item.data,
            notRandomize: true,
            size: 0.3,
        });
    };
    TravelingItemAnimation.prototype.updateCoords = function (coords) {
        // removing visual collisions
        this.coords = {
            x: coords.x + this.randomOffset,
            y: coords.y + this.randomOffset,
            z: coords.z + this.randomOffset,
        };
    };
    // *Heh-heh cunning Nikolai won
    TravelingItemAnimation.prototype.getVectorBySide = function (side) {
        return World.getRelativeCoords(0, 0, 0, side);
    };
    TravelingItemAnimation.prototype.getAxisByIndex = function (side) {
        switch (side) {
            case 0:
            case 1:
                return "y";
            case 2:
            case 3:
                return "z";
            case 4:
            case 5:
                return "x";
        }
    };
    TravelingItemAnimation.prototype.destroy = function () {
        this.animation.destroy();
        this.remove = true;
    };
    return TravelingItemAnimation;
}());
/// <reference path="../../PipeSpeed.ts" />
var TravelingItemMover = /** @class */ (function () {
    function TravelingItemMover(initialCoords, progressPart, moveVectorIndex, item, pipeSpeed, moveSpeed) {
        if (pipeSpeed === void 0) { pipeSpeed = BCPipe.StandartPipeSpeed; }
        this.progressPart = progressPart;
        this.moveVectorIndex = moveVectorIndex;
        this.item = item;
        this.pipeSpeed = pipeSpeed;
        this.moveSpeed = moveSpeed;
        this.coords = this.coordsToFixed(initialCoords);
        if (!this.moveSpeed) {
            this.moveSpeed = this.pipeSpeed.Target;
        }
        this.updateCoordsTime();
        this.updatePrevCoords();
    }
    Object.defineProperty(TravelingItemMover.prototype, "Coords", {
        get: function () {
            return this.coords;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TravelingItemMover.prototype, "PrevCoords", {
        get: function () {
            return this.prevCoords;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TravelingItemMover.prototype, "NextCoords", {
        get: function () {
            var prev = this.PrevCoords;
            var vec = this.getVectorBySide(this.MoveVectorIndex);
            prev.x += vec.x;
            prev.y += vec.y;
            prev.z += vec.z;
            return prev;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TravelingItemMover.prototype, "ProgressPart", {
        get: function () {
            return this.progressPart;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TravelingItemMover.prototype, "Time", {
        get: function () {
            return java.lang.System.currentTimeMillis();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TravelingItemMover.prototype, "TravelTime", {
        get: function () {
            return this.nextCoordsTime - this.prevCoordsTime;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TravelingItemMover.prototype, "PipeSpeed", {
        get: function () {
            return this.pipeSpeed;
        },
        set: function (speed) {
            this.pipeSpeed = speed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TravelingItemMover.prototype, "MoveSpeed", {
        get: function () {
            return this.moveSpeed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TravelingItemMover.prototype, "MoveVectorIndex", {
        get: function () {
            return this.moveVectorIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TravelingItemMover.prototype, "AbsoluteCoords", {
        get: function () {
            var _a = this.Coords, x = _a.x, y = _a.y, z = _a.z;
            return {
                x: Math.floor(x),
                y: Math.floor(y),
                z: Math.floor(z),
            };
        },
        enumerable: false,
        configurable: true
    });
    TravelingItemMover.prototype.hasReached = function () {
        return this.Time >= this.nextCoordsTime;
    };
    TravelingItemMover.prototype.move = function () {
        if (this.moveSpeed <= 0 || this.moveVectorIndex == null)
            return;
        var moveVector = this.getVectorBySide(this.MoveVectorIndex);
        var moveTime = this.nextCoordsTime - this.prevCoordsTime;
        var timePassed = this.Time - this.prevCoordsTime;
        this.progressPart = Math.min(timePassed / moveTime, 1);
        var newCoords = {
            x: this.prevCoords.x + moveVector.x * this.ProgressPart,
            y: this.prevCoords.y + moveVector.y * this.ProgressPart,
            z: this.prevCoords.z + moveVector.z * this.ProgressPart
        };
        this.coords = this.coordsToFixed(newCoords);
    };
    TravelingItemMover.prototype.findNewMoveVector = function (region) {
        var relativePaths = this.getRelativePaths(region);
        if (relativePaths === null) {
            return -1;
        }
        var nextPipes = this.filterPaths(relativePaths, region);
        var keys = Object.keys(nextPipes);
        if (keys.length > 0) {
            var keyIndex = this.random(keys.length);
            this.moveVectorIndex = parseInt(keys[keyIndex]);
            // ? should I delete fitCoords?
            this.fitCoordsToCenter();
            this.prevCoords = this.Coords;
            this.updateMoveSpeed(region);
            this.updateCoordsTime();
            return 1;
        }
        return 0;
    };
    /**
     * @param progressPart use only saves reading
     */
    TravelingItemMover.prototype.updateCoordsTime = function (progressPart) {
        if (progressPart === void 0) { progressPart = 0; }
        var speedInMs = this.MoveSpeed / 50;
        var totalTimeInMs = 1 / speedInMs;
        this.prevCoordsTime = this.Time - totalTimeInMs * progressPart;
        this.nextCoordsTime = this.Time + totalTimeInMs * (1 - progressPart);
    };
    /**
     * use only saves reading
     */
    TravelingItemMover.prototype.updatePrevCoords = function () {
        var moveVector = this.getVectorBySide(this.MoveVectorIndex);
        var relativePrevCoords = {
            x: this.Coords.x - moveVector.x * this.ProgressPart,
            y: this.Coords.y - moveVector.y * this.ProgressPart,
            z: this.Coords.z - moveVector.z * this.ProgressPart
        };
        this.prevCoords = this.coordsToFixed(relativePrevCoords);
    };
    TravelingItemMover.prototype.updateMoveSpeed = function (region) {
        // update pipeSpeed
        this.pipeSpeed = this.getClassOfCurrentPipe(region).PipeSpeed;
        if (this.MoveSpeed < this.PipeSpeed.Target) {
            this.moveSpeed += this.PipeSpeed.Delta;
        }
        else if (this.MoveSpeed > this.PipeSpeed.Target) {
            this.moveSpeed -= this.PipeSpeed.Delta;
        }
    };
    /**
     * @returns {object} which looks like {"sideIndex": pipeClass | container} or null if chunk unloaded
     */
    TravelingItemMover.prototype.getRelativePaths = function (region) {
        var _a;
        var targets = {};
        for (var i = 0; i < 6; i++) {
            var backVectorIndex = World.getInverseBlockSide(this.moveVectorIndex);
            if (i != backVectorIndex) {
                var curX = this.AbsoluteCoords.x;
                var curY = this.AbsoluteCoords.y;
                var curZ = this.AbsoluteCoords.z;
                var _b = World.getRelativeCoords(curX, curY, curZ, i), x = _b.x, y = _b.y, z = _b.z;
                if (!region.isChunkLoadedAt(x, z))
                    return null;
                var pipeBlockID = region.getBlockId(x, y, z);
                var pipeBlockData = region.getBlockData(x, y, z);
                var relativePipeClass = PipeIdMap.getClassById(pipeBlockID);
                var currentConnector = (_a = this.getClassOfCurrentPipe(region)) === null || _a === void 0 ? void 0 : _a.pipeConnector;
                if (relativePipeClass != null && (currentConnector === null || currentConnector === void 0 ? void 0 : currentConnector.canConnectToPipe(relativePipeClass))) {
                    targets[i] = relativePipeClass;
                    continue;
                }
                var tile = TileEntity.getTileEntity(x, y, z, region);
                if ((tile === null || tile === void 0 ? void 0 : tile.__initialized) === false)
                    return null;
                var storage = StorageInterface.getStorage(region, x, y, z);
                if (this.isValidStorage(storage, World.getInverseBlockSide(i)) && !(currentConnector === null || currentConnector === void 0 ? void 0 : currentConnector.hasBlacklistBlockID(pipeBlockID, pipeBlockData))) {
                    targets[i] = storage;
                }
            }
        }
        return targets;
    };
    TravelingItemMover.prototype.isValidStorage = function (storage, side) {
        var slots = storage === null || storage === void 0 ? void 0 : storage.getInputSlots(side);
        if (!slots)
            return false;
        var trueSlotsLength = slots.length;
        if (trueSlotsLength > 0 && slots[0] == "_json_saver_id") {
            // ! tileEntity container has jsonSaverId in slots[0]
            trueSlotsLength -= 1;
        }
        return trueSlotsLength > 0;
    };
    /**
     * @param {object} is returnable from getRelativePaths
     */
    TravelingItemMover.prototype.filterPaths = function (paths, region) {
        var _a = this.AbsoluteCoords, x = _a.x, y = _a.y, z = _a.z;
        var tileEntity = World.getTileEntity(x, y, z, region);
        if (tileEntity && tileEntity.canItemGoToSide) {
            var keys = Object.keys(paths);
            for (var t in keys) {
                var index = keys[t];
                // ? canItemGoToSide(item: ItemInstance, index: number): boolean
                if (!tileEntity.canItemGoToSide(this.item, index)) {
                    delete paths[index];
                }
            }
        }
        return paths;
    };
    TravelingItemMover.prototype.fitCoordsToCenter = function () {
        var absCoords = this.AbsoluteCoords;
        this.coords = {
            x: absCoords.x + .5,
            y: absCoords.y + .5,
            z: absCoords.z + .5
        };
    };
    TravelingItemMover.prototype.getClassOfCurrentPipe = function (region) {
        var _a = this.AbsoluteCoords, x = _a.x, y = _a.y, z = _a.z;
        var blockID = region.getBlockId(x, y, z);
        return PipeIdMap.getClassById(blockID);
    };
    TravelingItemMover.prototype.isInsidePipe = function (region) {
        var _a = this.Coords, x = _a.x, y = _a.y, z = _a.z;
        var isChunkLoaded = region.isChunkLoaded(Math.floor(x / 16), Math.floor(z / 16));
        return !isChunkLoaded || this.getClassOfCurrentPipe(region) != null;
    };
    TravelingItemMover.prototype.random = function (max) {
        return Math.floor(Math.random() * max);
    };
    // *Heh-heh cunning Nikolai won
    TravelingItemMover.prototype.getVectorBySide = function (side) {
        return World.getRelativeCoords(0, 0, 0, side);
    };
    TravelingItemMover.prototype.isInCoordsCenter = function () {
        var coords = this.Coords;
        var isInCenterByX = coords.x % 0.5 == 0 && coords.x % 1 != 0;
        var isInCenterByY = coords.y % 0.5 == 0 && coords.y % 1 != 0;
        var isInCenterByZ = coords.z % 0.5 == 0 && coords.z % 1 != 0;
        return isInCenterByX && isInCenterByY && isInCenterByZ;
    };
    TravelingItemMover.prototype.coordsToFixed = function (coords) {
        return {
            x: Math.round(coords.x * 100) / 100,
            y: Math.round(coords.y * 100) / 100,
            z: Math.round(coords.z * 100) / 100,
        };
    };
    return TravelingItemMover;
}());
/// <reference path="TravelingItemAnimation.ts" />
/// <reference path="TravelingItem.ts" />
/// <reference path="TravelingItemMoveData.ts" />
var TravelingItemNetworkType = new NetworkEntityType("bc.item")
    .setClientListSetupListener(function (list, target, entity) {
    var _a = target.Coords, x = _a.x, y = _a.y, z = _a.z;
    list.setupDistancePolicy(x, y, z, target.blockSource.getDimension(), 32);
})
    .setClientEntityAddedListener(function (entity, packet) {
    var target = new TravelingItemAnimation(packet.coords, packet.item);
    target.updateMoveData(packet.moveData);
    Updatable.addLocalUpdatable(target);
    return target;
})
    .setClientEntityRemovedListener(function (target, entity) {
    target.destroy();
})
    .setClientAddPacketFactory(function (target, entity, client) {
    return { coords: target.Coords, item: target.VisualItem, moveData: target.MoveData };
})
    .addClientPacketListener("moveData", function (target, entity, packetData) {
    target.updateMoveData(packetData);
});
/// <reference path="TravelingItemAnimation.ts" />
/// <reference path="TravelingItemMover.ts" />
/// <reference path="../../components/PipeIdMap.ts" />
/// <reference path="TravelingItemNetworkEntity.ts" />
var ITEM_DROP_VELOCITY = +__config__.getNumber("item_drop_velocity");
var ITEM_COOLDOWN_TIME = 100;
var DESTROY_CHECK_FREQUENCY = 3;
var TravelingItem = /** @class */ (function () {
    function TravelingItem(coords, dimension, item, moveVectorIndex, moveSpeed, pipeSpeed, progressPart) {
        var _this = this;
        if (moveSpeed === void 0) { moveSpeed = null; }
        if (pipeSpeed === void 0) { pipeSpeed = BCPipe.StandartPipeSpeed; }
        if (progressPart === void 0) { progressPart = 0; }
        this.dimension = dimension;
        this.item = item;
        // ! its just a Updatable flag
        this.remove = false;
        this.cooldown = 0;
        // * We need this to pass this["update"] existing
        this.update = function () {
            if (_this.cooldown-- > 0) {
                return;
            }
            if (!_this.blockSource) {
                _this.blockSource = BlockSource.getDefaultForDimension(_this.dimension);
                if (!_this.blockSource) {
                    _this.cooldown = ITEM_COOLDOWN_TIME;
                    return;
                }
                else {
                    _this.networkEntity = new NetworkEntity(TravelingItemNetworkType, _this);
                    _this.updateMoveData();
                }
            }
            var _a = _this.itemMover.AbsoluteCoords, x = _a.x, y = _a.y, z = _a.z;
            /**
             * If an object moves in an unloaded chunk,
             * then it can exit its pipe network and fall into another
             * that is not connected to the past
             */
            if (!_this.blockSource.isChunkLoaded(Math.floor(x / 16), Math.floor(z / 16))) {
                _this.cooldown = ITEM_COOLDOWN_TIME;
                return;
            }
            if (_this.itemMover.hasReached()) {
                /*
                * checking for block destroy
                * I think this way is more convenient than array of travelingItems
                * and DestroyBlock check
                */
                if (_this.blockSource.getBlockId(x, y, z) == 0) {
                    _this.destroy(true);
                    return;
                }
                var tileEntity = World.getTileEntity(x, y, z, _this.blockSource);
                if ((tileEntity === null || tileEntity === void 0 ? void 0 : tileEntity.__initialized) === false) {
                    _this.cooldown = ITEM_COOLDOWN_TIME;
                    return;
                }
                if (_this.modifyByPipe()) {
                    _this.destroy();
                    return;
                }
                var storage = StorageInterface.getStorage(_this.blockSource, x, y, z);
                if (_this.itemMover.isValidStorage(storage, World.getInverseBlockSide(_this.itemMover.MoveVectorIndex))) {
                    var pushedCount = storage.addItem(_this.item, World.getInverseBlockSide(_this.itemMover.MoveVectorIndex));
                    if (pushedCount > 0) {
                        _this.destroy();
                        return;
                    }
                }
                _this.networkEntity.getClients().setupDistancePolicy(x, y, z, _this.blockSource.getDimension(), 32);
                var findResult = _this.itemMover.findNewMoveVector(_this.blockSource);
                if (findResult > 0) {
                    _this.updateMoveData();
                }
                else if (findResult < 0) {
                    _this.cooldown = ITEM_COOLDOWN_TIME;
                }
                else {
                    _this.destroy(true);
                    return;
                }
            }
            _this.itemMover.move();
        };
        this.itemMover = new TravelingItemMover(coords, progressPart, moveVectorIndex, this.item, pipeSpeed, moveSpeed);
        Saver.registerObject(this, TravelingItem.saverId);
        Updatable.addUpdatable(this);
    }
    Object.defineProperty(TravelingItem.prototype, "Coords", {
        get: function () {
            return this.itemMover.Coords;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TravelingItem.prototype, "VisualItem", {
        get: function () {
            return {
                id: this.item.id,
                count: this.item.count,
                data: this.item.data
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TravelingItem.prototype, "MoveData", {
        get: function () {
            return {
                coordsFrom: this.itemMover.PrevCoords,
                vectorIndex: this.itemMover.MoveVectorIndex,
                time: this.itemMover.TravelTime
            };
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @returns {boolean} should destroy item
     */
    TravelingItem.prototype.modifyByPipe = function () {
        var _a = this.itemMover.AbsoluteCoords, x = _a.x, y = _a.y, z = _a.z;
        var tile = World.getTileEntity(x, y, z, this.blockSource);
        if (!tile)
            return false;
        // ? modifyTravelingItem(item: TravelingItem): boolean
        return tile.modifyTravelingItem ? tile.modifyTravelingItem(this) : false;
    };
    TravelingItem.prototype.updateMoveData = function () {
        this.networkEntity.send("moveData", this.MoveData);
    };
    TravelingItem.prototype.destroy = function (drop) {
        if (drop === void 0) { drop = false; }
        if (drop)
            this.drop();
        this.remove = true;
        this.networkEntity.remove();
    };
    TravelingItem.prototype.drop = function () {
        var _a = this.itemMover.Coords, x = _a.x, y = _a.y, z = _a.z;
        var _b = this.item, id = _b.id, count = _b.count, data = _b.data, extra = _b.extra;
        var entity = this.blockSource.spawnDroppedItem(x, y, z, id, count, data, extra || null);
        var speed = ITEM_DROP_VELOCITY;
        var velVec = this.itemMover.getVectorBySide(this.itemMover.MoveVectorIndex);
        Entity.addVelocity(entity, velVec.x * speed, velVec.y * speed, velVec.z * speed);
    };
    TravelingItem.saverId = Saver.registerObjectSaver("TravelingItemSaver", {
        save: function (travelingItem) {
            var dataToSave = {
                dimension: travelingItem.dimension,
                coords: travelingItem.itemMover.Coords,
                moveIndex: travelingItem.itemMover.MoveVectorIndex,
                moveSpeed: travelingItem.itemMover.MoveSpeed,
                targetSpeed: travelingItem.itemMover.PipeSpeed.Target,
                deltaSpeed: travelingItem.itemMover.PipeSpeed.Delta,
                progressPart: travelingItem.itemMover.ProgressPart,
                item: travelingItem.item,
            };
            return dataToSave;
        },
        read: function (scope) {
            var item = new TravelingItem(scope.coords, scope.dimension, scope.item, scope.moveIndex, scope.moveSpeed, new PipeSpeed(scope.targetSpeed, scope.deltaSpeed), scope.progressPart);
        }
    });
    return TravelingItem;
}());
/// <reference path="../travelingItem/TravelingItem.ts" />
var VoidPipeTileEntity = /** @class */ (function () {
    function VoidPipeTileEntity() {
    }
    VoidPipeTileEntity.prototype.modifyTravelingItem = function (travelingItem) {
        return true;
    };
    return VoidPipeTileEntity;
}());
/// <reference path="../abstract/BCTransportPipe.ts" />
/// <reference path="../../components/PipeDoubleRecipe.ts" />
/// <reference path="VoidPipeTileEntity.ts" />
var PipeVoid = /** @class */ (function (_super) {
    __extends(PipeVoid, _super);
    function PipeVoid() {
        var _this = _super.call(this) || this;
        TileEntity.registerPrototype(_this.block.id, new VoidPipeTileEntity());
        return _this;
    }
    Object.defineProperty(PipeVoid.prototype, "material", {
        get: function () {
            return "void";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PipeVoid.prototype, "pipeTexture", {
        get: function () {
            var textureName = "pipe_" + this.transportType + "_" + this.material;
            if (!this.texture)
                this.texture = new PipeTexture({ name: textureName, data: 0 }, { name: textureName, data: 1 });
            return this.texture;
        },
        enumerable: false,
        configurable: true
    });
    PipeVoid.prototype.getRecipe = function (ingredient) {
        var ingredients = this.Ingredients;
        return new PipeDoubleRecipe(ingredients[0], ingredients[1]);
    };
    Object.defineProperty(PipeVoid.prototype, "Ingredients", {
        get: function () {
            return [
                { id: VanillaItemID.redstone, count: 1, data: 0 },
                { id: VanillaItemID.dye, count: 1, data: 0 }
            ];
        },
        enumerable: false,
        configurable: true
    });
    PipeVoid.prototype.getIngredientForRecipe = function () {
        return null;
    };
    return PipeVoid;
}(BCTransportPipe));
var voidPipe = new PipeVoid();
/// <reference path="../abstract/TransportPipeConnector.ts" />
var WoodenPipeConnector = /** @class */ (function (_super) {
    __extends(WoodenPipeConnector, _super);
    function WoodenPipeConnector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WoodenPipeConnector.prototype.getConnectionRules = function () {
        var old = _super.prototype.getConnectionRules.call(this);
        old.push({ name: "BCPipeWooden", exclude: true, isANDrule: true });
        return old;
    };
    return WoodenPipeConnector;
}(TransportPipeConnector));
var WoodenPipeStorageConnector = /** @class */ (function () {
    function WoodenPipeStorageConnector(coords, renderer, texture) {
        this.coords = coords;
        this.renderer = renderer;
        this.texture = texture;
        this.side = null; // connected side index
    }
    Object.defineProperty(WoodenPipeStorageConnector.prototype, "ConnectionSide", {
        get: function () {
            return this.side;
        },
        set: function (value) {
            this.side = value;
            this.renderConnections();
        },
        enumerable: false,
        configurable: true
    });
    WoodenPipeStorageConnector.prototype.renderConnections = function () {
        var boxes = this.renderer.getBoxes(this.renderer.width);
        var standartModel = this.renderer.standartModel;
        if (this.ConnectionSide >= 0) {
            for (var i = 0; i < 6; i++) {
                var box = boxes[i];
                var renderModel = BlockRenderer.createModel();
                if (i == this.ConnectionSide) {
                    var textre = this.texture.containerConnection;
                    renderModel.addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5], textre.name, textre.data);
                }
                standartModel.addEntry(renderModel);
            }
        }
        BlockRenderer.mapAtCoords(this.coords.x, this.coords.y, this.coords.z, standartModel);
    };
    WoodenPipeStorageConnector.prototype.destroy = function () {
        BlockRenderer.unmapAtCoords(this.coords.x, this.coords.y, this.coords.z);
    };
    return WoodenPipeStorageConnector;
}());
/// <reference path="../travelingItem/TravelingItem.ts" />
var WoodenPipeItemEjector = /** @class */ (function () {
    function WoodenPipeItemEjector(region, x, y, z) {
        this.region = region;
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Object.defineProperty(WoodenPipeItemEjector.prototype, "connectionSide", {
        get: function () {
            return this.side;
        },
        set: function (value) {
            this.side = value;
            if (value >= 0) {
                var coords = World.getRelativeCoords(this.x, this.y, this.z, this.connectionSide);
                // update to BlockSource
                var storage = StorageInterface.getStorage(this.region, coords.x, coords.y, coords.z);
                this.containerData = {
                    source: storage,
                    slots: storage.getOutputSlots(),
                };
            }
            else {
                this.containerData = null;
            }
        },
        enumerable: false,
        configurable: true
    });
    WoodenPipeItemEjector.prototype.getExtractionTargetsCount = function (maxItems) {
        var e_11, _a;
        if (!this.containerData)
            return -1;
        var id = 0;
        var data = null;
        var count = 0;
        try {
            for (var _b = __values(this.containerData.slots), _c = _b.next(); !_c.done; _c = _b.next()) {
                var i = _c.value;
                var slot = this.containerData.source.getSlot(i);
                if (slot.id == 0)
                    continue;
                if (id == 0 && slot.id != 0) {
                    id = slot.id;
                    data = slot.data;
                }
                if (id == slot.id && data == slot.data && count < maxItems) {
                    count = Math.min(count + slot.count, maxItems);
                }
                if (count == maxItems)
                    break;
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_11) throw e_11.error; }
        }
        return count;
    };
    WoodenPipeItemEjector.prototype.extractItems = function (count) {
        var item = this.getExtractionPack(this.containerData, count);
        var containerCoords = World.getRelativeCoords(this.x, this.y, this.z, this.connectionSide);
        var vectorIndex = World.getInverseBlockSide(this.connectionSide);
        var offsetVector = World.getRelativeCoords(0, 0, 0, vectorIndex);
        // ? should I add offsetDistance to config?
        var offsetDistance = +__config__.getNumber("travelingItem_offset_distance");
        /*
            If you want to create items not on source block center
            change "travelingItem_offset_distance" in config
        */
        var itemCoords = {
            x: containerCoords.x + 0.5 + offsetDistance * offsetVector.x,
            y: containerCoords.y + 0.5 + offsetDistance * offsetVector.y,
            z: containerCoords.z + 0.5 + offsetDistance * offsetVector.z,
        };
        var travelingItem = new TravelingItem(itemCoords, this.region.getDimension(), item, vectorIndex);
    };
    WoodenPipeItemEjector.prototype.getExtractionPack = function (containerData, count) {
        var e_12, _a;
        var gettedItem = {
            id: 0,
            count: 0,
            data: 0,
            extra: null,
        };
        var source = containerData.source, slots = containerData.slots;
        try {
            for (var slots_1 = __values(slots), slots_1_1 = slots_1.next(); !slots_1_1.done; slots_1_1 = slots_1.next()) {
                var i = slots_1_1.value;
                var slot = source.getSlot(i);
                if (slot.id == 0)
                    continue;
                if (gettedItem.extra != null)
                    break;
                var needToAdd = count - gettedItem.count;
                if (needToAdd > 0) {
                    // * MineExplorer thanks for StorageInterface
                    StorageInterface.addItemToSlot(slot, gettedItem, needToAdd);
                    source.setSlot(i, slot.id, slot.count, slot.data, slot.extra);
                }
                else
                    break;
            }
        }
        catch (e_12_1) { e_12 = { error: e_12_1 }; }
        finally {
            try {
                if (slots_1_1 && !slots_1_1.done && (_a = slots_1.return)) _a.call(slots_1);
            }
            finally { if (e_12) throw e_12.error; }
        }
        return gettedItem;
    };
    return WoodenPipeItemEjector;
}());
var WoodenPipeClient = /** @class */ (function () {
    function WoodenPipeClient(renderer, texture) {
        this.renderer = renderer;
        this.texture = texture;
    }
    WoodenPipeClient.prototype.load = function () {
        var _this = this;
        this.storageConnector = new WoodenPipeStorageConnector(this, this.renderer, this.texture);
        this.storageConnector.ConnectionSide = this.networkData.getInt("orientation");
        this.networkData.addOnDataChangedListener(function (networkData, isExternalChange) {
            _this.storageConnector.ConnectionSide = networkData.getInt("orientation");
        });
    };
    WoodenPipeClient.prototype.unload = function () {
        this.storageConnector.destroy();
    };
    return WoodenPipeClient;
}());
/// <reference path="WoodenPipeStorageConnector.ts" />
/// <reference path="WoodenPipeItemEjector.ts" />
/// <reference path="WoodenPipeClient.ts" />
var WoodenPipeTileEntity = /** @class */ (function () {
    function WoodenPipeTileEntity(renderer, texture) {
        this.renderer = renderer;
        this.texture = texture;
        this.clientFactory = new ClientFactory(WoodenPipeClient);
        // * it will be rewriten during runtime
        this.data = {};
        this.defaultValues = {
            // ? I use -1 because we cant put null into java.int in SyncedData
            connectionSide: -1,
            energy: 0
        };
        this.ticksSincePull = 0;
        this.client = this.clientFactory.instantiate(renderer, texture);
    }
    WoodenPipeTileEntity.prototype.changeOrientation = function () {
        this.itemEjector.connectionSide = this.data.connectionSide;
        // ? if connection side is null put < 0 to syncData
        this.networkData.putInt("orientation", this.data.connectionSide);
        this.networkData.sendChanges();
    };
    // !TileEntity event
    WoodenPipeTileEntity.prototype.tick = function () {
        this.ticksSincePull++;
        if (this.shouldTick()) {
            var maxExtractable = this.maxExtractable();
            var targets = this.itemEjector.getExtractionTargetsCount(maxExtractable);
            if (targets > 0) {
                // * EXTRACT
                this.itemEjector.extractItems(this.maxExtractable());
            }
            this.data.energy = 0;
            this.ticksSincePull = 0;
        }
    };
    // !TileEntity event
    WoodenPipeTileEntity.prototype.init = function () {
        this.itemEjector = new WoodenPipeItemEjector(this.blockSource, this.x, this.y, this.z);
        this.checkConnection();
    };
    // !TileEntity event
    WoodenPipeTileEntity.prototype.click = function (id, count, data) {
        if (id != ItemID.bc_wrench)
            return false;
        this.updateConnectionSide(true);
        return true;
    };
    // !EnergyNet event
    WoodenPipeTileEntity.prototype.energyReceive = function (type, amount, voltage) {
        var storage = this.getMaxEnergyStored();
        var readyToReceive = Math.min(storage - amount, this.getMaxEnergyReceive());
        var received = Math.min(readyToReceive, amount);
        this.data.energy += received;
        return received;
    };
    WoodenPipeTileEntity.prototype.shouldTick = function () {
        if (this.ticksSincePull < 8) {
            return false;
        }
        else if (this.ticksSincePull < 16) {
            // !Check if we have just enough energy for the next stack.
            if (this.data.connectionSide <= 5) {
                var stackSize = this.itemEjector.getExtractionTargetsCount(this.maxExtractable());
                if (stackSize > 0 && this.data.energy >= stackSize * 10) {
                    return true;
                }
            }
        }
        return this.ticksSincePull >= 16 && this.data.energy >= 10;
    };
    WoodenPipeTileEntity.prototype.updateConnectionSide = function (findNext) {
        if (findNext === void 0) { findNext = false; }
        this.data.connectionSide = this.getConnectionSide(findNext);
        this.changeOrientation();
    };
    /** @param findNext - use true value if you want to rerotate pipe like a wrench */
    WoodenPipeTileEntity.prototype.getConnectionSide = function (findNext) {
        if (findNext === void 0) { findNext = false; }
        // * In common situation ends when i gets max in 5 index
        // * But if fhis function calling by wrench index can go beyound
        // * I think this code is poor, but maybe i fix it in future
        for (var t = 0; t < 12; t++) {
            var i = t % 6;
            if (findNext) {
                if (this.data.connectionSide == t) {
                    findNext = false;
                }
                continue;
            }
            var _a = World.getRelativeCoords(this.x, this.y, this.z, i), x = _a.x, y = _a.y, z = _a.z;
            if (this.canConnectTo(x, y, z, this.blockSource, i))
                return i;
        }
        // default value
        return -1;
    };
    WoodenPipeTileEntity.prototype.checkConnection = function () {
        if (this.data.connectionSide < 0) {
            this.updateConnectionSide();
        }
        else {
            var _a = World.getRelativeCoords(this.x, this.y, this.z, this.data.connectionSide), x = _a.x, y = _a.y, z = _a.z;
            if (!this.canConnectTo(x, y, z, this.blockSource, this.data.connectionSide)) {
                this.updateConnectionSide();
            }
            else {
                this.changeOrientation();
            }
        }
    };
    WoodenPipeTileEntity.prototype.canConnectTo = function (x, y, z, region, side) {
        var storage = StorageInterface.getStorage(region, x, y, z);
        var slots = storage === null || storage === void 0 ? void 0 : storage.getOutputSlots(side);
        if (!slots)
            return false;
        var trueSlotsLength = slots.length;
        if (trueSlotsLength > 0 && slots[0] == "_json_saver_id") {
            // ! tileEntity container has jsonSaverId in slots[0]
            trueSlotsLength -= 1;
        }
        return trueSlotsLength > 0;
    };
    WoodenPipeTileEntity.prototype.maxExtractable = function () {
        return Math.floor(this.data.energy / 10);
    };
    WoodenPipeTileEntity.prototype.canConnectRedstoneEngine = function () {
        return true;
    };
    WoodenPipeTileEntity.prototype.getMaxEnergyStored = function () {
        return 2560;
    };
    WoodenPipeTileEntity.prototype.getMaxEnergyReceive = function () {
        return 80;
    };
    return WoodenPipeTileEntity;
}());
/// <reference path="../abstract/BCTransportPipe.ts" />
/// <reference path="WoodenPipeConnector.ts" />
/// <reference path="WoodenPipeTileEntity.ts" />
var PipeWooden = /** @class */ (function (_super) {
    __extends(PipeWooden, _super);
    function PipeWooden() {
        var _this = _super.call(this) || this;
        TileEntity.registerPrototype(_this.block.id, new WoodenPipeTileEntity(_this.pipeRenderer, _this.texture));
        EnergyTileRegistry.addEnergyTypeForId(_this.block.id, RF);
        Block.registerNeighbourChangeFunctionForID(_this.block.id, function (coords, block, changeCoords, region) {
            var tile = World.getTileEntity(coords.x, coords.y, coords.z, region);
            if (tile && tile.itemEjector) {
                tile.checkConnection();
            }
        });
        return _this;
    }
    Object.defineProperty(PipeWooden.prototype, "material", {
        get: function () {
            return "wood";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PipeWooden.prototype, "pipeConnector", {
        get: function () {
            if (!this.connector)
                this.connector = new WoodenPipeConnector();
            return this.connector;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PipeWooden.prototype, "renderGroups", {
        get: function () {
            return {
                main: ICRender.getGroup("BCTransportPipe"),
                addition: ICRender.getGroup("BCPipeWooden"),
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PipeWooden.prototype, "pipeTexture", {
        get: function () {
            var textre = "pipe_" + this.transportType + "_" + this.material;
            if (!this.texture) {
                this.texture = new PipeTexture({ name: textre, data: 0 }, { name: textre, data: 1 }, { name: textre, data: 2 });
            }
            return this.texture;
        },
        enumerable: false,
        configurable: true
    });
    PipeWooden.prototype.getIngredientForRecipe = function () {
        return { id: VanillaBlockID.planks, count: 1, data: 0 };
    };
    return PipeWooden;
}(BCTransportPipe));
var woodPipe = new PipeWooden();
ItemModel.setCurrentCacheGroup("buildcraft", FileTools.ReadJSON(__dir__ + "mod.info").version);
IDRegistry.genItemID("bc_wrench");
Item.createItem("bc_wrench", "bc_wrench", { name: "bc_wrench" }, { stack: 1 });
Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({ id: ItemID.bc_wrench, count: 1, data: 0 }, [
        "x x",
        " o ",
        " x "
    ], ["x", VanillaItemID.iron_ingot, 0, "o", ItemID.gear_stone, 0]);
});
Translation.addTranslation("engine_creative", { ru: "Двигатель для творческого режима", en: "Creative Engine" });
Translation.addTranslation("engine_wooden", { ru: "Двигатель на красном камне", en: "Wooden Engine" });
Translation.addTranslation("pipe_item_cobble", { ru: "Булыжниковая транспортная труба", en: "Cobblestone Transport Pipe" });
Translation.addTranslation("pipe_item_stone", { ru: "Каменная транспортная труба", en: "Stone Transport Pipe" });
Translation.addTranslation("pipe_item_sandstone", { ru: "Песчаниковая транспортная труба", en: "Sandstone Transport Pipe" });
Translation.addTranslation("pipe_item_quartz", { ru: "Кварцевая транспортная труба", en: "Quartz Transport Pipe" });
Translation.addTranslation("pipe_item_gold", { ru: "Золотая транспортная труба", en: "Golden Transport Pipe" });
Translation.addTranslation("pipe_item_wood", { ru: "Деревянная транспортная труба", en: "Wooden Transport Pipe" });
Translation.addTranslation("pipe_item_void", { ru: "Пустотная транспортная труба", en: "Void Transport Pipe" });
Translation.addTranslation("pipe_item_iron", { ru: "Железная транспортная труба", en: "Iron Transport Pipe" });
Translation.addTranslation("pipe_item_diamond", { ru: "Алмазная транспортная труба", en: "Diamond Transport Pipe" });
Translation.addTranslation("pipe_item_obsidian", { ru: "Обсидиановая транспортная труба", en: "Obsidian Transport Pipe" });
Translation.addTranslation("gear_diamond", { ru: "Алмазная шестерня", en: "Diamond Gear" });
Translation.addTranslation("gear_gold", { ru: "Золотая шестерня", en: "Gold Gear" });
Translation.addTranslation("gear_iron", { ru: "Железная шестерня", en: "Iron Gear" });
Translation.addTranslation("gear_stone", { ru: "Каменная шестерня", en: "Stone Gear" });
Translation.addTranslation("gear_wood", { ru: "Деревянная шестерня", en: "Wood Gear" });
Translation.addTranslation("bc_wrench", { ru: "Гаечный ключ", en: "Wrench" });
