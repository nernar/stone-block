/*
made by @桃乐丝 @非凡
*/
LIBRARY({
    name: "EMRenderAPI",
    version: 7,
    shared: true,
    api: "CoreEngine"
});
var EMRender = /** @class */ (function () {
    function EMRender() {
        this.model = [];
        this.icRender = new ICRender.Model();
        this.icCollision = new ICRender.CollisionShape();
    }
    EMRender.prototype.addBoxesWithObj = function (object) {
        var blockRender = BlockRenderer.Model();
        for (var texture in object) {
            var modelObj = object[texture];
            blockRender.addBox(modelObj.x1, modelObj.y1, modelObj.z1, modelObj.x2, modelObj.y2, modelObj.z2, texture);
            this.addCollisionBox(modelObj.x1, modelObj.y1, modelObj.z1, modelObj.x2, modelObj.y2, modelObj.z2);
        }
        this.model.push(blockRender);
    };
    EMRender.prototype.addBoxesWithObjById = function (id, data, object) {
        var blockRender = BlockRenderer.Model();
        for (var pair in object) {
            var modelObj = object[pair];
            blockRender.addBox(modelObj.x1, modelObj.y1, modelObj.z1, modelObj.x2, modelObj.y2, modelObj.z2, id, data);
            this.addCollisionBox(modelObj.x1, modelObj.y1, modelObj.z1, modelObj.x2, modelObj.y2, modelObj.z2);
        }
        this.model.push(blockRender);
    };
    EMRender.prototype.addBoxesWithArray = function (object) {
        var blockRender = BlockRenderer.Model();
        for (var texture in object) {
            var modelArray = object[texture];
            blockRender.addBox(modelArray[0], modelArray[1], modelArray[2], modelArray[3], modelArray[4], modelArray[5], texture);
            this.addCollisionBox(modelArray[0], modelArray[1], modelArray[2], modelArray[3], modelArray[4], modelArray[5]);
        }
        this.model.push(blockRender);
    };
    EMRender.prototype.addBoxesWithArrayById = function (id, data, object, type) {
        switch (type) {
            case "create":
                EMRenderTool.model[id + ":" + data] = {};
                var model = EMRenderTool.model[id + ":" + data];
                for (var pair in object) {
                    var modelArray = object[pair];
                    model[pair] = [modelArray[0], modelArray[1], modelArray[2], modelArray[3], modelArray[4], modelArray[5]];
                }
                var blockRender = BlockRenderer.Model();
                for (var pair in object) {
                    var modelArray = object[pair];
                    blockRender.addBox(modelArray[0], modelArray[1], modelArray[2], modelArray[3], modelArray[4], modelArray[5], id, data);
                    this.addCollisionBox(modelArray[0], modelArray[1], modelArray[2], modelArray[3], modelArray[4], modelArray[5]);
                }
                this.model.push(blockRender);
                break;
            default:
                var blockRender = BlockRenderer.Model();
                for (var pair in object) {
                    var modelArray = object[pair];
                    blockRender.addBox(modelArray[0], modelArray[1], modelArray[2], modelArray[3], modelArray[4], modelArray[5], id, data);
                    this.addCollisionBox(modelArray[0], modelArray[1], modelArray[2], modelArray[3], modelArray[4], modelArray[5]);
                }
                this.model.push(blockRender);
                break;
        }
    };
    EMRender.prototype.addModelBox = function (x1, y1, z1, x2, y2, z2, texture) {
        var blockRender = BlockRenderer.Model();
        blockRender.addBox(x1, y1, z1, x2, y2, z2, texture);
        this.addCollisionBox(x1, y1, z1, x2, y2, z2);
        this.model.push(blockRender);
    };
    EMRender.prototype.addModelBoxWithoutCollision = function (x1, y1, z1, x2, y2, z2, texture) {
        var blockRender = BlockRenderer.Model();
        blockRender.addBox(x1, y1, z1, x2, y2, z2, texture);
        this.model.push(blockRender);
    };
    EMRender.prototype.addCollisionBox = function (x1, y1, z1, x2, y2, z2, condition) {
        this.icCollision.addEntry().addBox(x1, y1, z1, x2, y2, z2);
    };
    EMRender.prototype.addFullModel = function () {
        self = this;
        this.model.forEach(function (value, index, array) {
            self.icRender.addEntry(value);
        });
    };
    EMRender.prototype.addConditionModel = function (x1, y1, z1, x2, y2, z2, texture, condition) {
        var model = BlockRenderer.Model();
        model.addBox(x1, y1, z1, x2, y2, z2, texture);
        this.icRender.addEntry(model).setCondition(condition);
        var entry = this.icCollision.addEntry();
        entry.addBox(x1, y1, z1, x2, y2, z2);
        entry.setCondition(condition);
    };
    EMRender.prototype.addToBlockStatic = function (id, data, disableCollision) {
        this.addFullModel();
        BlockRenderer.setStaticICRender(id, data, this.icRender);
        !disableCollision && BlockRenderer.setCustomCollisionShape(id, data, this.icCollision);
    };
    EMRender.prototype.addToBlockEnableCoordMapping = function (id, data, disableCollision) {
        this.addFullModel();
        BlockRenderer.enableCoordMapping(id, data, this.icRender);
        !disableCollision && BlockRenderer.setCustomCollisionShape(id, data, this.icCollision);
    };
    EMRender.prototype.relativeBlockCondition = function (x, y, z, group, exclude) {
        var condition = ICRender.BLOCK(x, y, z, group, exclude);
        return condition;
    };
    return EMRender;
}());
var EMRenderTool = /** @class */ (function () {
    function EMRenderTool() {
    }
    EMRenderTool.createModel = function (desc) {
        var em = new EMRender();
        desc.onCreate && desc.onCreate(em);
        switch (desc.type) {
            case "static":
                if (desc.blockID) {
                    var blockData = desc.blockData || -1;
                    em.addToBlockStatic(desc.blockID, blockData, desc.disableCollision);
                }
                break;
            case "coord":
                if (desc.blockID) {
                    var blockData = desc.blockData || -1;
                    em.addToBlockEnableCoordMapping(desc.blockID, blockData, desc.disableCollision);
                }
                break;
        }
        //this.namespace[desc.blockID] = em;
    };
    EMRenderTool.getHalfBlockModel = function (texture) {
        var emRender_up = new EMRender();
        emRender_up.addModelBox(0, 0, 0, 1, 0.5, 1, texture);
        var emRender_down = new EMRender();
        emRender_down.addModelBox(0, 0.5, 0, 1, 1, 1, texture);
        return {
            up: emRender_up,
            down: emRender_down
        };
    };
    EMRenderTool.createModeltoMemory = function (renderName) {
        this.namespace[renderName] = new EMRender();
    };
    EMRenderTool.getModelByRenderName = function (renderName) {
        return this.namespace[renderName];
    };
    EMRenderTool.namespace = {};
    EMRenderTool.model = {};
    EMRenderTool.updateBox = function (id, data) {
        var em = new EMRender();
        em.addBoxesWithArrayById(id, data, this.model[id + ":" + data]);
        return em;
    };
    return EMRenderTool;
}());
EXPORT("EMRenderTool", EMRenderTool);
