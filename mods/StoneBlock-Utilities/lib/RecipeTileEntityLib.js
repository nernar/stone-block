var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
     ____             _            _____ _ _       _____       _   _ _
    |  _ \  ___   ___(_)_ __   ___|_   _(_) | ___ | ____|_ __ | |_(_) |_ _   _
    | |_) |/ _ \ / __| | '_ \ / _ \ | | | | |/ _ \|  _| | '_ \| __| | __| | | |
    |  _ <|  __/| (__| | |_) |  __/ | | | | |  __/| |___| | | | |_| | |_| |_| |
    |_| \_\\___| \___|_| .__/ \___| |_| |_|_|\___||_____|_| |_|\__|_|\__|\__, |
                       |_|                                               |___/
                                                                
    RecipeTileEntity v3.0 ©WolfTeam
    GitHub: https://github.com/Wolf-Team
            https://github.com/Wolf-Team/RecipeTileEntity
    VK: https://vk.com/wolf___team
*/
/*ChangeLog:
    v.3.0.1
        - Fixed calculation of the number of crafting results
    v.3.0
        - Rename
        - Rewrite in TypeScript
        - Support Multiplayer
        - Remove integration with RecipeViewer
    v.2.1
        - Fix errors
        - Shared
        - Integration with RecipeViewer
        - Fix recipe with mod's items
        - The setWorkbench method was added to the tileentity of the workbench
    v.2.0
        - The library has been rewritten
        - Added the ability to create shapeless recipes
    v.1.2
        - Fix change of craft with the same ingredients
        - Removed method registerTimerGridCraftTable
        - Removed method registerTimerCraftTable
        - Removed method getTickResipes
    v.1.1
        - Merge methods registerGridCraftTable and registerTimerGridCraftTable
        - Merge methods registerCraftTable and registerTimerCraftTable
        - Fixed method name from getTickResipes to getTickRecipes
        - Added the ability to use your item IDs.
        - For recipes, the time multiplier parameter has been added.
    v.1
        - release
*/
LIBRARY({
    name: "RecipeTileEntity",
    version: 301,
    api: "CoreEngine",
    shared: true
});
var RecipeTE;
(function (RecipeTE) {
    RecipeTE.AIR_ITEM = { id: 0, count: 0 };
})(RecipeTE || (RecipeTE = {}));
var RecipeTE;
(function (RecipeTE) {
    function defaultCraftFunction(container, workbench, TE) {
        for (var i = 0; i < workbench.countSlot; i++) {
            var input_slot_name = TE.getInputSlots();
            if (Array.isArray(input_slot_name))
                input_slot_name = input_slot_name[i];
            else
                input_slot_name = input_slot_name + i;
            var slot = container.getSlot(input_slot_name);
            if (slot.count > 0) {
                slot.count--;
                if (slot.count == 0)
                    slot.data = slot.id = slot.count;
            }
            container.setSlot(input_slot_name, slot.id, slot.count, slot.data, slot.extra);
        }
    }
    RecipeTE.defaultCraftFunction = defaultCraftFunction;
    ;
})(RecipeTE || (RecipeTE = {}));
/// <reference path="WorkbenchInfo.ts" />
var RecipeTE;
(function (RecipeTE) {
    var Workbench = /** @class */ (function () {
        function Workbench(info, defaultRecipeData) {
            if (defaultRecipeData === void 0) { defaultRecipeData = null; }
            this.rows = 1;
            this.countSlot = 1;
            this._recipes = [];
            if (typeof info == "number") {
                this.countSlot = this.cols = info;
            }
            else {
                this.cols = info.columns;
                if (info.rows)
                    this.rows = info.rows;
                this.countSlot = this.cols * this.rows;
            }
            this.defaultRecipeData = defaultRecipeData;
        }
        Workbench.prototype.getDataForRecipe = function (data) {
            var data2 = JSON.parse(JSON.stringify(this.defaultRecipeData));
            if (data) {
                if (typeof data2 == "object")
                    for (var i in data)
                        data2[i] = data[i];
            }
            return data2;
        };
        Workbench.prototype.getObjRecipe = function (result, ingredients, data, craftFunction) {
            if (craftFunction === void 0) { craftFunction = RecipeTE.defaultCraftFunction; }
            if (result.count === undefined)
                result.count = 1;
            if (result.data === undefined)
                result.data = 0;
            var count = 0;
            var outputIngredients = {};
            ingredients.forEach(function (item) {
                if (item.count === undefined)
                    item.count = 1;
                if (item.data === undefined)
                    item.data = -1;
                count += item.count;
                outputIngredients["".concat(item.id, ":").concat(item.data)] = item;
            });
            if (count > this.countSlot)
                throw new RangeError("Ingredients must be <= ".concat(this.countSlot, "(columns * rows)"));
            return {
                result: result,
                ingredients: outputIngredients,
                craft: craftFunction,
                mask: null,
                data: this.getDataForRecipe(data)
            };
        };
        Workbench.prototype.getObjShapeRecipe = function (result, mask, ingredients, data, craftFunction) {
            if (craftFunction === void 0) { craftFunction = RecipeTE.defaultCraftFunction; }
            if (result.count === undefined)
                result.count = 1;
            if (result.data === undefined)
                result.data = 0;
            var length = mask.length;
            if (ingredients["#"])
                throw new SyntaxError("Ingredient cannot be registered to char #");
            if (ingredients[" "])
                throw new SyntaxError("Ingredient cannot be registered to chas \"space\"");
            ingredients["#"] = RecipeTE.AIR_ITEM;
            if (Array.isArray(mask)) {
                if (length > this.rows)
                    throw new RangeError("Length of the mask must be <= ".concat(this.rows));
                else if (length < 1)
                    throw new RangeError("Length of the mask must be >= 1");
                var l = mask[0].length;
                if (l > this.cols)
                    throw new RangeError("Length of the mask line must be <= ".concat(this.cols));
                else if (l < 1)
                    throw new RangeError("Length of the mask line must be >= 1");
                for (var i = length - 1; i >= 0; i--) {
                    var ll = mask[i].length;
                    if (ll == 0)
                        mask[i] = "".padStart(l, "#");
                    else if (ll != l)
                        throw new RangeError("Mask lines must be the same size.");
                    else
                        mask[i] = mask[i].replace(/\s/g, "#");
                    for (var ii = l - 1; ii >= 0; ii--)
                        if (ingredients[mask[i][ii]] == undefined)
                            throw new SyntaxError("Unknown ingredient " + mask[i][ii]);
                }
            }
            else if (length > this.countSlot)
                throw new RangeError("Length of the mask must be <= ".concat(this.countSlot));
            else if (length < 1)
                throw new RangeError("Length of the mask must be >= 1");
            else {
                mask = mask.replace(/\s/g, "#");
                for (var i = length - 1; i >= 0; i--)
                    if (ingredients[mask[i]] == undefined)
                        throw new SyntaxError("Unknown ingredient " + mask[i]);
            }
            return {
                result: result,
                mask: mask,
                ingredients: ingredients,
                craft: craftFunction,
                data: this.getDataForRecipe(data)
            };
        };
        Workbench.prototype.addRecipe = function (result, ingredients, data, craftFunction) {
            if (craftFunction === void 0) { craftFunction = RecipeTE.defaultCraftFunction; }
            this._recipes.push(this.getObjRecipe(result, ingredients, data, craftFunction));
            return this;
        };
        Workbench.prototype.addShapeRecipe = function (result, mask, ingredients, data, craftFunction) {
            if (craftFunction === void 0) { craftFunction = RecipeTE.defaultCraftFunction; }
            this._recipes.push(this.getObjShapeRecipe(result, mask, ingredients, data, craftFunction));
            return this;
        };
        Workbench.prototype.getRecipe = function (inputs) {
            var _this = this;
            if (inputs.length != this.countSlot)
                throw new RangeError("Length 'inputs' != " + this.countSlot);
            return this._recipes.find(function (recipe) {
                var select = false;
                if (Array.isArray(recipe.mask)) {
                    var rowLength = _this.rows - recipe.mask.length, colLength = _this.cols - recipe.mask[0].length, rowOffset = 0, colOffset = 0;
                    for (var row = 0; row < _this.rows; row++) {
                        if (row > rowLength && !select)
                            return false;
                        for (var col = 0; col < _this.cols; col++) {
                            if (row > rowLength && !select)
                                return false;
                            var input = inputs[row * _this.cols + col];
                            if (col > colLength && !select)
                                if (input.id != RecipeTE.AIR_ITEM.id)
                                    return false;
                            if (!select) {
                                var ingredient = recipe.ingredients[recipe.mask[0][0]];
                                if (ingredient.data == undefined)
                                    ingredient.data = -1;
                                if (ingredient.id == input.id && (ingredient.data == -1 || ingredient.data == input.data)) {
                                    rowOffset = row;
                                    colOffset = col;
                                    select = true;
                                }
                                else if (input.id != 0) {
                                    return false;
                                }
                            }
                            else {
                                var ingredient = RecipeTE.AIR_ITEM;
                                var _row = recipe.mask[row - rowOffset];
                                if (_row) {
                                    var _col = _row[col - colOffset];
                                    if (_col)
                                        ingredient = recipe.ingredients[_col];
                                }
                                if (input.id != ingredient.id) {
                                    if (recipe.ingredients[recipe.mask[0][0]].id == 0) {
                                        select = false;
                                        row = rowOffset;
                                        col = colOffset;
                                    }
                                    else {
                                        return false;
                                    }
                                }
                            }
                        }
                    }
                }
                else if (recipe.mask) {
                    var iLength = _this.countSlot - recipe.mask.length, iOffset = 0;
                    for (var i = 0; i < _this.countSlot; i++) {
                        if (i > iLength && !select)
                            return false;
                        var input = inputs[i];
                        if (!select) {
                            var ingredient = recipe.ingredients[recipe.mask[0]];
                            if (input.id == ingredient.id) {
                                iOffset = i;
                                select = true;
                            }
                            else if (input.id != 0) {
                                return false;
                            }
                        }
                        else {
                            var ingredient = RecipeTE.AIR_ITEM;
                            var col = recipe.mask[i - iOffset];
                            if (col)
                                ingredient = recipe.ingredients[col];
                            if (input.id != ingredient.id)
                                return false;
                        }
                    }
                }
                else {
                    var currentRecipe = {};
                    for (var i = _this.countSlot - 1; i >= 0; i--) {
                        var input = inputs[i];
                        var key = "".concat(input.id, ":").concat(input.data);
                        if (!recipe.ingredients["".concat(input.id, ":").concat(input.data)])
                            key = "".concat(input.id, ":-1");
                        if (recipe.ingredients[key]) {
                            if (!currentRecipe[key])
                                currentRecipe[key] = 0;
                            currentRecipe[key]++;
                        }
                        else if (input.id != 0)
                            return false;
                    }
                    for (var i in recipe.ingredients)
                        if (recipe.ingredients[i].count != currentRecipe[i])
                            return false;
                    return true;
                }
                return select;
            }, this);
        };
        return Workbench;
    }());
    RecipeTE.Workbench = Workbench;
})(RecipeTE || (RecipeTE = {}));
/// <reference path="../Workbench/WorkbenchInfo.ts" />
/// <reference path="../Workbench/Workbench.ts" />
/// <reference path="TimerWorkbenchInfo.ts" />
var RecipeTE;
(function (RecipeTE) {
    ;
    var TimerWorkbench = /** @class */ (function (_super) {
        __extends(TimerWorkbench, _super);
        function TimerWorkbench(info, defaultRecipeData) {
            var _this = _super.call(this, info, defaultRecipeData) || this;
            _this.timer = info.timer;
            return _this;
        }
        return TimerWorkbench;
    }(RecipeTE.Workbench));
    RecipeTE.TimerWorkbench = TimerWorkbench;
})(RecipeTE || (RecipeTE = {}));
var RecipeTE;
(function (RecipeTE) {
    var TransferPolicyList = /** @class */ (function () {
        function TransferPolicyList() {
            this.list = [];
            this.count = 0;
        }
        TransferPolicyList.prototype.add = function (policy) {
            this.count++;
            return this.list.push(policy);
        };
        TransferPolicyList.prototype.remove = function (policy) {
            if (typeof policy != "number")
                policy = this.list.findIndex(function (e) { return e == policy; });
            delete this.list[policy];
        };
        TransferPolicyList.prototype.invoke = function (container, name, id, amount, data, extra, playerUid) {
            var returnAmount = Number.MAX_SAFE_INTEGER;
            for (var i = 0; i < this.count; i++) {
                var policy = this.list[i];
                if (policy == null)
                    continue;
                var _amount = policy(container, name, id, amount, data, extra, playerUid);
                if (_amount == 0)
                    return 0;
                if (_amount < returnAmount)
                    returnAmount = _amount;
            }
            return returnAmount;
        };
        return TransferPolicyList;
    }());
    var WorkbenchTileEntity = /** @class */ (function () {
        function WorkbenchTileEntity(workbench, state) {
            if (state === void 0) { state = true; }
            this.useNetworkItemContainer = true;
            this.GlobalAddPolicy = new TransferPolicyList();
            this.GlobalGetPolicy = new TransferPolicyList();
            this.addGlobalAddTransferPolicy = this.GlobalAddPolicy.add.bind(this.GlobalAddPolicy);
            this.addGlobalGetTransferPolicy = this.GlobalGetPolicy.add.bind(this.GlobalGetPolicy);
            this.setWorkbench(workbench);
            this.defaultValues = {
                enabled: state
            };
        }
        WorkbenchTileEntity.prototype.setWorkbench = function (workbench) {
            this.workbench = workbench;
        };
        WorkbenchTileEntity.prototype.takeResult = function (container, name, id, amount, data, extra, playerUid) {
            for (var i = 0; i < amount; i++)
                this.currentRecipe.craft(container, this.workbench, this);
            return amount;
        };
        WorkbenchTileEntity.prototype.setTransferPolicy = function () {
            this.container.setGlobalAddTransferPolicy(function (container, name, id, amount, data, extra, playerUid) {
                var self = container.getParent();
                if (self.getOutputSlot() == name)
                    return 0;
                if (self.hasInputSlot(name)) {
                    self.validRecipe(name, {
                        id: id,
                        data: data,
                        count: container.getSlot(name).count + amount,
                        extra: extra
                    });
                }
                var _a = self.GlobalAddPolicy.invoke(container, name, id, amount, data, extra, playerUid);
                return _a < amount ? _a : amount;
            });
            this.container.setGlobalGetTransferPolicy(function (container, name, id, amount, data, extra, playerUid) {
                var self = container.getParent();
                if (self.getOutputSlot() == name) {
                    return self.takeResult(container, name, id, amount, data, extra, playerUid);
                }
                if (self.hasInputSlot(name)) {
                    var item = {
                        id: id,
                        data: data,
                        count: container.getSlot(name).count - amount,
                        extra: extra
                    };
                    if (item.count == 0)
                        item = { id: 0, data: 0, count: 0 };
                    self.validRecipe(name, item);
                }
                var _a = self.GlobalGetPolicy.invoke(container, name, id, amount, data, extra, playerUid);
                return _a < amount ? _a : amount;
            });
        };
        WorkbenchTileEntity.prototype.getItems = function (slotName, item) {
            var slots = [];
            var slotsName = this.getInputSlots();
            for (var i = 0, l = this.workbench.countSlot; i < l; i++) {
                var key = void 0;
                if (Array.isArray(slotsName))
                    key = slotsName[i];
                else
                    key = slotsName + i;
                slots.push(slotName == key ? item : this.container.getSlot(key));
            }
            return slots;
        };
        WorkbenchTileEntity.prototype.validRecipe = function (slotName, item) {
            var outputSlotName = this.getOutputSlot();
            if (!this.isEnabled()) {
                this.currentRecipe = null;
                return this.container.clearSlot(outputSlotName);
            }
            var inputs = this.getItems(slotName, item);
            var recipe = this.workbench.getRecipe(inputs);
            var result = RecipeTE.AIR_ITEM;
            if (recipe)
                result = recipe.result;
            if (result.count === undefined)
                result.count = 1;
            if (result.data === undefined)
                result.data = 0;
            var count = 1;
            if (result.id != 0) {
                count = 0;
                for (var i = inputs.length - 1; i >= 0 && count != 1; i--)
                    if (inputs[i].count != 0 && (count == 0 || count > inputs[i].count))
                        count = inputs[i].count;
            }
            this.currentRecipe = recipe;
            this.container.setSlot(outputSlotName, result.id, result.count * count, result.data);
        };
        //TileEntity
        WorkbenchTileEntity.prototype.init = function () {
            this.container.setParent(this);
            this.setTransferPolicy();
        };
        WorkbenchTileEntity.prototype.hasInputSlot = function (name) {
            var slots = this.getInputSlots();
            if (Array.isArray(slots))
                return slots.indexOf(name) != -1;
            var i = parseInt(name.match(new RegExp(slots + "([0-9]+)"))[1]);
            return i >= 0 && i < this.workbench.countSlot;
        };
        WorkbenchTileEntity.prototype.setEnabled = function (state) {
            this.data.enabled = state;
            this.validRecipe();
        };
        WorkbenchTileEntity.prototype.enable = function () {
            this.setEnabled(true);
        };
        WorkbenchTileEntity.prototype.disable = function () {
            this.setEnabled(false);
        };
        WorkbenchTileEntity.prototype.isEnabled = function () {
            return this.data.enabled;
        };
        return WorkbenchTileEntity;
    }());
    RecipeTE.WorkbenchTileEntity = WorkbenchTileEntity;
})(RecipeTE || (RecipeTE = {}));
/// <reference path="../Workbench/WorkbenchTileEntity.ts" />
/// <reference path="TimerWorkbench.ts" />
var RecipeTE;
(function (RecipeTE) {
    var TimerWorkbenchTileEntity = /** @class */ (function (_super) {
        __extends(TimerWorkbenchTileEntity, _super);
        function TimerWorkbenchTileEntity() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.ticks = 0;
            return _this;
        }
        TimerWorkbenchTileEntity.prototype.setEnabled = function (state) {
            if (!state)
                this.container.setScale(this.getScale(), this.ticks = 0);
            _super.prototype.setEnabled.call(this, state);
        };
        TimerWorkbenchTileEntity.prototype.takeResult = function (container, name, id, amount, data, extra, playerUid) {
            var item = {
                id: id,
                data: data,
                count: container.getSlot(name).count - amount,
                extra: extra
            };
            if (item.count == 0)
                item = { id: 0, data: 0, count: 0 };
            this.validRecipe(name, item);
            return amount;
        };
        TimerWorkbenchTileEntity.prototype.validRecipe = function (slotName, item) {
            var inputs = this.getItems(slotName, item);
            var recipe = this.workbench.getRecipe(inputs);
            if (!recipe) {
                this.container.setScale(this.getScale(), this.ticks = 0);
                return this.currentRecipe = null;
            }
            var output = (slotName && slotName == this.getOutputSlot()) ? item : this.container.getSlot(slotName);
            if (output.id == 0 || output.id == recipe.result.id)
                this.currentRecipe = recipe;
            else
                this.currentRecipe = null;
        };
        //TileEntity
        TimerWorkbenchTileEntity.prototype.tick = function () {
            if (this.currentRecipe && this.isEnabled()) {
                this.ticks += 1 * this.currentRecipe.data.multiply;
                this.container.setScale(this.getScale(), this.ticks / this.workbench.timer);
                var outputSlotName = this.getOutputSlot();
                if (this.ticks >= this.workbench.timer) {
                    var output = this.container.getSlot(outputSlotName);
                    this.currentRecipe.craft(this.container, this.workbench, this);
                    this.container.setSlot(outputSlotName, this.currentRecipe.result.id, output.count + this.currentRecipe.result.count, this.currentRecipe.result.data);
                    this.validRecipe();
                    this.ticks = 0;
                }
            }
            this.container.sendChanges();
        };
        return TimerWorkbenchTileEntity;
    }(RecipeTE.WorkbenchTileEntity));
    RecipeTE.TimerWorkbenchTileEntity = TimerWorkbenchTileEntity;
})(RecipeTE || (RecipeTE = {}));
EXPORT("RecipeTE", RecipeTE);
