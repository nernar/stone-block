LIBRARY({
    name: "CustomChest",
    version: 2,
    shared: false,
    api: "CoreEngine"
});
var JAVA_ANIMATOR = android.animation.ValueAnimator;
var JAVA_HANDLER = android.os.Handler;
var LOOPER_THREAD = android.os.Looper;
var JAVA_HANDLER_THREAD = new JAVA_HANDLER(LOOPER_THREAD.getMainLooper());
function createAnim(_values, _duration, _updateFunc){
	var animation = JAVA_ANIMATOR.ofFloat(_values);
	animation.setDuration(_duration);
	if(_updateFunc)animation.addUpdateListener({
		onAnimationUpdate : function(updatedAnim){
			_updateFunc(updatedAnim.getAnimatedValue(), updatedAnim);
		}
	});
	JAVA_HANDLER_THREAD.post({
		run: function(){
			animation.start();
		}
	})
	return animation;
};
function defaultChestData(){
    return {
        container: null,
        start: false,
        item: {
            maxCount: 0,
            count: 0
        },
        barData: {
            name: "",
            x: 0,
            y: 0
        },
        pre_selectedSlot: null,
        selectedSlot: null,
        selectedSlotType: null,
        lastClickTime: 0,
        anim: {
            pos1: {
                slotSize: 0,
                window: null,
                x: 0,
                y: 0
            },
            pos2: {
                x: 0,
                y: 0
            }
        }
    }
}
function startAnim(window, slot, size){
    var content = window.getContent();
    var slot_id = '$slot' + parseInt(Math.random()*10000000);
    var pos1 = {x: chestData.anim.pos1.x, y: chestData.anim.pos1.y};
    var pos2 = {x: chestData.anim.pos2.x, y: chestData.anim.pos2.y};
    content.elements[slot_id] = {
        type: "slot",
        x: pos1.x - 75/2,
        y: pos1.y - 75/2,
        size: size || 70,
        bitmap: "_default_slot_empty",
        visual: true
    };
    window.forceRefresh();
    chestData.container.setSlot(slot_id, slot.id, 1, slot.data, slot.extra);
    delete chestData.container.slots[slot_id];
    var elements = window.getElements();
    var animation = pos1.y != pos2.y ? createAnim([pos1.y, pos2.y], 300, function(value){
        if(!window.isOpened()) return;
        var percent = Math.abs((value - pos1.y)/(pos2.y - pos1.y));
        elements.get(slot_id).setPosition(pos1.x + (pos2.x - pos1.x)*percent - content.elements[slot_id].size/2, value - content.elements[slot_id].size/2);
    }) : createAnim([pos1.x, pos2.x], 300, function(value){
        if(!window.isOpened()) return;
        elements.get(slot_id).setPosition(value - content.elements[slot_id].size/2, pos2.y - content.elements[slot_id].size/2);
    })
    animation.addListener({
        onAnimationEnd: function(){
            delete content.elements[slot_id];
            if(!window.isOpened()) return;
            var elementProvider = window.getElementProvider();
            elementProvider.removeElement(elements.get(slot_id));
            window.forceRefresh();
        }
    });
}
function getScrollY(window){
    let view = window.layout;
    var scrollY = 0;
    try {
        while(true) {
            scrollY += view.getScrollY();
            view = view.getChildAt(0);
        }
    } catch(errr) {};
    return scrollY;
}
var chestData = defaultChestData();
var CustomChest = {
    setChestRender: function (id) {
        for (var data = 0; data < 4; data++) {
            Block.setShape(id, 1 / 16, 0, 1 / 16, 15 / 16, 14 / 16, 15 / 16, data);
            var render = new ICRender.Model();
            var model = BlockRenderer.createModel();
            model.addBox(1 / 16, 0, 1 / 16, 15 / 16, 14 / 16, 15 / 16, id, data);
            if (data == 0)
                model.addBox(7 / 16, 7 / 16, 15 / 16, 9 / 16, 11 / 16, 1, id, data);
            if (data == 1)
                model.addBox(7 / 16, 7 / 16, 0, 9 / 16, 11 / 16, 1 / 16, id, data);
            if (data == 2)
                model.addBox(15 / 16, 7 / 16, 7 / 16, 1, 11 / 16, 9 / 16, id, data);
            if (data == 3)
                model.addBox(0, 7 / 16, 7 / 16, 1 / 16, 11 / 16, 9 / 16, id, data);
            render.addEntry(model);
            BlockRenderer.setStaticICRender(id, data, render);
        }
    },
    createGuiSlotSet: function (count, inRow, slotSize) {
        var startX = (1000 - inRow * slotSize) / 2;
        var elements = {};
        elements['scale1'] = {
            type: "scale",
            x: -100,
            y: -100,
            z: 20,
            direction: 0,
            bitmap: "transferBarFull",
            background: "transferBar",
            value: 0,
            scale: 60/108*slotSize/15
        };
        elements["selection1"] = {
            type: "image",
            x: -1000,
            y: -1000,
            z: 9,
            bitmap: "_selection",
            width: slotSize,
            height: slotSize
        }
        for (var i = 0; i < count; i++) {
            var x = i % inRow;
            var y = Math.floor(i / inRow);
            elements["slot" + i] = {
                type: "slot", i: i, x: startX + x * slotSize, y: y * slotSize, size: slotSize, visual: true,
                onTouchEvent: function(element, event){
                    var slot_id = 'slot' + this.i;
                    var item = chestData.container.getSlot(slot_id);
                    var uiAdapter = chestData.container.getUiAdapter();
                    event_type = event.type;
                    if(event.type == 'CLICK' && chestData.selectedSlot != null){
                        if(chestData.selectedSlot == slot_id) {
                            chestData.selectedSlot = null;
                            chestData.selectedSlotType = null;
                            if(java.lang.System.currentTimeMillis() - chestData.lastClickTime <= 500){
                                var maxStack = Item.getMaxStack(item.id);
                                if(item.count < maxStack){
                                    var needCount = maxStack - item.count;
                                    var slots = chestData.container.slots;
                                    var scrollY = getScrollY(element.window);
                                    chestData.anim.pos2 = {
                                        x: element.window.location.windowToGlobal(this.x + slotSize/2) + element.window.location.x,
                                        y: element.window.location.windowToGlobal((this.y + slotSize/2) - scrollY/element.window.getScale()) + element.window.location.y
                                    }
                                    var overlayWindow = element.window.getParentWindow().getWindow('overlay');
                                    var contentWindow = element.window;
                                    var _elements_ = element.window.getContent().elements;
                                    for(var i in slots){
                                        if(i[0] == '$') continue;
                                        var item2 = slots[i];
                                        if(!item2 || i == slot_id || item2.id != item.id || item2.data != item.data || (item2.extra != item.extra && ((!item2.extra || item2.extra.getAllCustomData()) != (!item.extra || item.extra.getAllCustomData())))) continue;
                                        var _count = Math.min(item2.count, needCount);
                                        needCount -= _count;
                                        chestData.container.sendEvent("SlotToSlot", {slot1: i, slot2: slot_id, count: _count});
                                        if(!_elements_[i])continue;
                                        chestData.anim.pos1 = {
                                            x: contentWindow.location.windowToGlobal(_elements_[i].x + _elements_[i].size/2) + contentWindow.location.x,
                                            y: contentWindow.location.windowToGlobal((_elements_[i].y + _elements_[i].size/2) - scrollY/contentWindow.getScale()) + contentWindow.location.y
                                        }
                                        startAnim(overlayWindow, chestData.container.getSlot(i), element.window.location.windowToGlobal(this.size));
                                        if(needCount <= 0) break;
                                    }
                                    if(needCount > 0){
                                        var inventoryWindow = element.window.getParentWindow().getWindow('inventory');
                                        var _elements = inventoryWindow.getContent().elements;
                                        var _scrollY = getScrollY(inventoryWindow);
                                        for (var i = 0; i <= 35; i++){
                                            var item2 = Player.getInventorySlot(i);
                                            if(!item2 || item2.id != item.id || item2.data != item.data || (item2.extra != item.extra && ((!item2.extra || item2.extra.getAllCustomData()) != (!item.extra || item.extra.getAllCustomData())))) continue;
                                            var _count = Math.min(item2.count, needCount);
                                            needCount -= _count;
                                            chestData.container.sendEvent("InventorySlotToContainerSlot", {slot1: i, slot2: slot_id, count: _count});
                                            chestData.anim.pos1 = {
                                                x: inventoryWindow.location.windowToGlobal(_elements['__invSlot' + i].x + 125) + inventoryWindow.location.x,
                                                y: inventoryWindow.location.windowToGlobal(((_elements['__invSlot' + i].y + 125)*inventoryWindow.getScale() - _scrollY)/inventoryWindow.getScale()) + inventoryWindow.location.y
                                            }
                                            startAnim(overlayWindow, Player.getInventorySlot(i), element.window.location.windowToGlobal(this.size));
                                            if(needCount <= 0) break;
                                        }
                                    }
                                }
                            }
                            uiAdapter.getElement("scale2").setPosition(-100, -100);
                            chestData.container.setScale('scale2', 0);
                            uiAdapter.getElement("scale1").setPosition(-100, -100);
                            chestData.container.setScale('scale1', 0);
                            uiAdapter.getElement("selection1").setPosition(-1000, -1000);
                            uiAdapter.getElement("selection2").setPosition(-1000, -1000);
                            return;
                        }
                        chestData.item.count = Math.min(Math.floor(chestData.item.count), chestData.item.maxCount);
                        if(chestData.selectedSlotType == 0){
                            chestData.container.sendEvent("InventorySlotToContainerSlot", {slot1: chestData.selectedSlot, slot2: slot_id, count: chestData.item.count});
                            //chestData.container.sendInventoryToSlotTransaction(chestData.selectedSlot, slot_id, chestData.item.count);
                        } else {
                            chestData.container.sendEvent("SlotToSlot", {slot1: chestData.selectedSlot, slot2: slot_id, count: chestData.item.count});
                            //chestData.container.sendSlotToSlotTransaction(chestData.selectedSlot, slot_id, chestData.item.count);
                        }
                        var scrollY = getScrollY(element.window);
                        chestData.anim.pos2 = {
                            x: element.window.location.windowToGlobal(this.x + slotSize/2) + element.window.location.x,
                            y: element.window.location.windowToGlobal((this.y + slotSize/2) - scrollY/element.window.getScale()) + element.window.location.y
                        }
                        if(chestData.selectedSlotType){
                            chestData.anim.pos1.x = element.window.location.windowToGlobal(chestData.anim.pos1.pre_x + slotSize/2) + element.window.location.x;
                            chestData.anim.pos1.y = element.window.location.windowToGlobal(((chestData.anim.pos1.pre_y + slotSize/2)*element.window.getScale() - scrollY)/element.window.getScale()) + element.window.location.y;
                        } else {
                            var __window = chestData.anim.pos1.window;
                            var _scrollY = getScrollY(__window);
                            chestData.anim.pos1.x = __window.location.windowToGlobal(Math.floor(chestData.anim.pos1.pre_x/250)*250 + 125) + __window.location.x;
                            chestData.anim.pos1.y = __window.location.windowToGlobal(((Math.floor(chestData.anim.pos1.pre_y/250)*250 + 125)*__window.getScale() - _scrollY)/__window.getScale()) + __window.location.y;
                        }
                        var overlayWindow = element.window.getParentWindow().getWindow('overlay');
                        startAnim(overlayWindow, chestData.selectedSlotType ? chestData.container.getSlot(chestData.selectedSlot) : Player.getInventorySlot(chestData.selectedSlot), element.window.location.windowToGlobal(this.size));
                        var _pos2 = {
                            x: chestData.anim.pos2.x,
                            y: chestData.anim.pos2.y
                        };
                        chestData.anim.pos2 = chestData.anim.pos1;
                        chestData.anim.pos1 = _pos2;
                        var item2 = chestData.selectedSlotType ? chestData.container.getSlot(chestData.selectedSlot) : Player.getInventorySlot(chestData.selectedSlot);
                        if(item2.id != 0 && (item2.id != item.id || item2.count > Item.getMaxStack(item.id) - item.count))startAnim(overlayWindow, item,chestData.selectedSlotType ? element.window.location.windowToGlobal(this.size) : chestData.anim.pos2.window.location.windowToGlobal(251));
                        uiAdapter.getElement("scale2").setPosition(-100, -100);
                        chestData.container.setScale('scale2', 0);
                        uiAdapter.getElement("scale1").setPosition(-100, -100);
                        chestData.container.setScale('scale1', 0);
                        uiAdapter.getElement("selection1").setPosition(-1000, -1000);
                        uiAdapter.getElement("selection2").setPosition(-1000, -1000);
                        chestData.selectedSlot = null;
                        chestData.selectedSlotType = null;
                        return;
                    }
                    if(event.type == 'CANCEL'){
                        event_type = 'UP';
                    }
                    if(event.type == 'CLICK')event_type = 'UP';
                    if(event_type == 'DOWN'){
                        if(item.id == 0 || chestData.selectedSlot != null)return;
                        chestData.item = {
                            maxCount: item.count,
                            count: 1
                        }
                        chestData.pre_selectedSlot = slot_id;
                        chestData.start = World.getThreadTime() + 10;
                        chestData.tickStarted = false;
                        chestData.barData = {
                            name: "scale1",
                            x: this.x + (slotSize - elements['scale1'].scale*15)/2,
                            y: this.y
                        }
                        uiAdapter.getElement("selection1").setPosition(this.x, this.y);
                        chestData.lastClickTime = java.lang.System.currentTimeMillis();
                        chestData.anim.pos1 = {
                            window: element.window,
                            slotSize: this.size,
                            pre_x: this.x,
                            pre_y: this.y
                        }
                    }
                    if(event_type == 'UP'){
                        if(chestData.selectedSlot != null || !chestData.start) return;
                        chestData.start = false;
                        chestData.selectedSlot = slot_id;
                        chestData.selectedSlotType = 1;
                        chestData.pre_selectedSlot = null;
                        if(!chestData.tickStarted) chestData.item.count = chestData.item.maxCount;
                    }
                }
            };
        }
        return elements;
    },
    createChestGui: function (title, count, inRow, slotSize) {
        var inRow = inRow || 9;
        var slotSize = slotSize || 108;
        var elements = this.createGuiSlotSet(count, inRow, slotSize);
        var window = new UI.StandardWindow({
            standard: {
                header: { text: { text: Translation.translate(title) } },
                inventory: { standard: true },
                background: { standard: true },
                minHeight: Math.ceil(count / inRow) * slotSize
            },
            elements: elements
        });
        var window2 = window.addWindow('overlay', {
            location: {
                x: 0,
                y: 0,
                width: 1000,
                height: UI.getScreenHeight()
            },
            drawing: [{type: 'color', color: android.graphics.Color.TRANSPARENT}],
            elements: {

            }
        });
        window2.setAsGameOverlay(true);
        window2.setTouchable(false);
        var inv_elements = window.getWindow('inventory').getContent();
        inv_elements.elements['scale2'] = {
            type: "scale",
            x: -100,
            y: -100,
            z: 20,
            direction: 0,
            bitmap: "transferBarFull",
            background: "transferBar",
            value: 0,
            scale: 60/108*251/15
        };
        inv_elements.elements["selection2"] = {
            type: "image",
            x: -1000,
            y: -1000,
            z: 9,
            bitmap: "_selection",
            width: 251,
            height: 251
        }
        inv_elements.elements["_CLICKFRAME_"] = {
            type: "frame",
            x: 0,
            y: 0,
            z: -100,
            width: 1000,
            height: 251*9,
            bitmap: "_default_slot_empty",
            scale: 1,
            onTouchEvent: function(element, event){
                var slot_id = Math.floor(event.x/251)+Math.floor(event.y/250)*4;
                var item = Player.getInventorySlot(slot_id);
                var uiAdapter = chestData.container.getUiAdapter();
                event_type = event.type;
                if(event.type == 'CLICK' && chestData.selectedSlot != null){
                    if(chestData.selectedSlot == slot_id) {
                        chestData.selectedSlot = null;
                        chestData.selectedSlotType = null;
                        if(java.lang.System.currentTimeMillis() - chestData.lastClickTime <= 500){
                            var maxStack = Item.getMaxStack(item.id);
                            if(item.count < maxStack){
                                var needCount = maxStack - item.count;
                                var inventoryWindow = element.window;
                                var _elements = inventoryWindow.getContent().elements;
                                var _scrollY = getScrollY(inventoryWindow);
                                var overlayWindow = element.window.getParentWindow().getWindow('overlay');
                                chestData.anim.pos2 = {
                                    x: element.window.location.windowToGlobal(Math.floor(event.x/250)*250 + 125) + element.window.location.x,
                                    y: element.window.location.windowToGlobal(((Math.floor(event.y/250)*250 + 125)*element.window.getScale() - _scrollY)/element.window.getScale()) + element.window.location.y
                                }
                                for (var i = 0; i <= 35; i++){
                                    var item2 = Player.getInventorySlot(i);
                                    if(!item2 || i == slot_id || item2.id != item.id || item2.data != item.data || (item2.extra != item.extra && ((!item2.extra || item2.extra.getAllCustomData()) != (!item.extra || item.extra.getAllCustomData())))) continue;
                                    var _count = Math.min(item2.count, needCount);
                                    needCount -= _count;
                                    chestData.container.sendEvent("InventorySlotToSlot", {slot1: i, slot2: slot_id, count: _count});
                                    chestData.anim.pos1 = {
                                        x: inventoryWindow.location.windowToGlobal(_elements['__invSlot' + i].x + 125) + inventoryWindow.location.x,
                                        y: inventoryWindow.location.windowToGlobal(((_elements['__invSlot' + i].y + 125)*inventoryWindow.getScale() - _scrollY)/inventoryWindow.getScale()) + inventoryWindow.location.y
                                    }
                                    startAnim(overlayWindow, Player.getInventorySlot(i), element.window.location.windowToGlobal(251));
                                    if(needCount <= 0) break;
                                }
                                if(needCount > 0){
                                    var contentWindow = element.window.getParentWindow().getWindow('content');
                                    var _elements_ = contentWindow.getContent().elements;
                                    var scrollY = getScrollY(contentWindow);
                                    var slots = chestData.container.slots;
                                    for(var i in slots){
                                        if(i[0] == '$') continue;
                                        var item2 = slots[i];
                                        if(!item2 || item2.id != item.id || item2.data != item.data || (item2.extra != item.extra && ((!item2.extra || item2.extra.getAllCustomData()) != (!item.extra || item.extra.getAllCustomData())))) continue;
                                        var _count = Math.min(item2.count, needCount);
                                        needCount -= _count;
                                        chestData.container.sendEvent("SlotToInventorySlot", {slot1: i, slot2: slot_id, count: _count});
                                        if(!_elements_[i])continue;
                                        chestData.anim.pos1 = {
                                            x: contentWindow.location.windowToGlobal(_elements_[i].x + _elements_[i].size/2) + contentWindow.location.x,
                                            y: contentWindow.location.windowToGlobal((_elements_[i].y + _elements_[i].size/2) - scrollY/contentWindow.getScale()) + contentWindow.location.y
                                        }
                                        startAnim(overlayWindow, chestData.container.getSlot(i), element.window.location.windowToGlobal(251));
                                        if(needCount <= 0) break;
                                    }
                                }
                            }
                        }
                        uiAdapter.getElement("scale2").setPosition(-100, -100);
                        chestData.container.setScale('scale2', 0);
                        uiAdapter.getElement("scale1").setPosition(-100, -100);
                        chestData.container.setScale('scale1', 0);
                        uiAdapter.getElement("selection1").setPosition(-1000, -1000);
                        uiAdapter.getElement("selection2").setPosition(-1000, -1000);
                        return;
                    }
                    chestData.item.count = Math.min(Math.floor(chestData.item.count), chestData.item.maxCount);
                    if(chestData.selectedSlotType == 0){
                        chestData.container.sendEvent("InventorySlotToSlot", {slot1: chestData.selectedSlot, slot2: slot_id, count: chestData.item.count});
                    } else {
                        chestData.container.sendEvent("SlotToInventorySlot", {slot1: chestData.selectedSlot, slot2: slot_id, count: chestData.item.count});
                    }
                    var scrollY = getScrollY(element.window);
                    chestData.anim.pos2 = {
                        x: element.window.location.windowToGlobal(Math.floor(event.x/250)*250 + 125) + element.window.location.x,
                        y: element.window.location.windowToGlobal(((Math.floor(event.y/250)*250 + 125)*element.window.getScale() - scrollY)/element.window.getScale()) + element.window.location.y
                    }
                    if(chestData.selectedSlotType){
                        var __window = chestData.anim.pos1.window;
                        var slotSize = chestData.anim.pos1.slotSize;
                        var _scrollY = getScrollY(__window);
                        chestData.anim.pos1.x = __window.location.windowToGlobal(chestData.anim.pos1.pre_x + slotSize/2) + __window.location.x;
                        chestData.anim.pos1.y = __window.location.windowToGlobal(((chestData.anim.pos1.pre_y + slotSize/2)*__window.getScale() - _scrollY)/__window.getScale()) + __window.location.y;
                    } else {
                        chestData.anim.pos1.x = element.window.location.windowToGlobal(Math.floor(chestData.anim.pos1.pre_x/250)*250 + 125) + element.window.location.x;
                        chestData.anim.pos1.y = element.window.location.windowToGlobal(((Math.floor(chestData.anim.pos1.pre_y/250)*250 + 125)*element.window.getScale() - scrollY)/element.window.getScale()) + element.window.location.y;
                    }
                    var overlayWindow = element.window.getParentWindow().getWindow('overlay');
                    startAnim(overlayWindow, chestData.selectedSlotType ? chestData.container.getSlot(chestData.selectedSlot) : Player.getInventorySlot(chestData.selectedSlot), element.window.location.windowToGlobal(251));
                    var _pos2 = {
                        x: chestData.anim.pos2.x,
                        y: chestData.anim.pos2.y
                    };
                    chestData.anim.pos2 = chestData.anim.pos1;
                    chestData.anim.pos1 = _pos2;
                    var item2 = chestData.selectedSlotType ? chestData.container.getSlot(chestData.selectedSlot) : Player.getInventorySlot(chestData.selectedSlot);
                    if(item2.id != 0 && (item2.id != item.id || item2.count > Item.getMaxStack(item.id) - item.count))startAnim(overlayWindow, item, chestData.selectedSlotType ? chestData.anim.pos2.window.location.windowToGlobal(chestData.anim.pos2.slotSize) : element.window.location.windowToGlobal(251));
                    uiAdapter.getElement("scale2").setPosition(-100, -100);
                    chestData.container.setScale('scale2', 0);
                    uiAdapter.getElement("scale1").setPosition(-100, -100);
                    chestData.container.setScale('scale1', 0);
                    uiAdapter.getElement("selection1").setPosition(-1000, -1000);
                    uiAdapter.getElement("selection2").setPosition(-1000, -1000);
                    chestData.selectedSlot = null;
                    chestData.selectedSlotType = null;
                    return;
                }
                if(event.type == 'CANCEL' || (event.type == 'MOVE' && chestData.pre_selectedSlot && chestData.pre_selectedSlot != slot_id)){
                    event_type = 'UP';
                }
                if(event.type == 'CLICK')event_type = 'UP';
                if(event_type == 'DOWN'){
                    if(item.id == 0 || chestData.selectedSlot != null)return;
                    chestData.item = {
                        maxCount: item.count,
                        count: 1
                    }
                    chestData.pre_selectedSlot = slot_id;
                    chestData.start = World.getThreadTime() + 10;
                    chestData.tickStarted = false;
                    chestData.barData = {
                        name: "scale2",
                        x: Math.floor(event.x/250)*250 + (250 - inv_elements.elements['scale2'].scale*15)/2,
                        y: Math.floor(event.y/250)*250
                    }
                    uiAdapter.getElement("selection2").setPosition(Math.floor(event.x/250)*250, Math.floor(event.y/250)*250);
                    chestData.lastClickTime = java.lang.System.currentTimeMillis();
                    chestData.anim.pos1 = {
                        window: element.window,
                        pre_x: event.x,
                        pre_y: event.y
                    }
                }
                if(event_type == 'UP'){
                    if(chestData.selectedSlot != null || !chestData.start) return;
                    chestData.start = false;
                    chestData.selectedSlot = slot_id;
                    chestData.selectedSlotType = 0;
                    chestData.pre_selectedSlot = null;
                    if(!chestData.tickStarted) chestData.item.count = chestData.item.maxCount;
                }
            }
        }
        window.refreshAll();
        return window;
    }
};
var ChestTileEntity = /** @class */ (function () {
    function ChestTileEntity(guiScreen) {
        this.useNetworkItemContainer = true;
        this.guiScreen = guiScreen;
    }
    ChestTileEntity.prototype.getScreenName = function (player, coords) {
        return "main";
    };
    ChestTileEntity.prototype.getScreenByName = function (screenName, container) {
        chestData = defaultChestData();
        chestData.container = container;
        return this.guiScreen;
    };
    ChestTileEntity.prototype.getGuiScreen = function () {
        return this.guiScreen;
    };
    ChestTileEntity.prototype.clearContainer = function () {
        for (var name in this.container.slots) {
            this.container.clearSlot(name);
        }
    };
    ChestTileEntity.prototype.tick = function () {
        // TODO: check hoppers
    };
    ChestTileEntity.prototype.containerEvents = {
        SlotToSlot: function(eventData, connectedClient) {
            var slot1 = this.container.getSlot(eventData.slot1);
            var slot2 = this.container.getSlot(eventData.slot2);
            if((slot2.id != slot1.id || slot2.data != slot1.data || (slot2.extra != slot1.extra && ((!slot2.extra || slot2.extra.getAllCustomData()) != (!slot1.extra || slot1.extra.getAllCustomData())))) && slot2.id != 0){
                slot1 = slot1.asScriptable();
                this.container.setSlot(eventData.slot1, slot2.id, slot2.count, slot2.data, slot2.extra);
                this.container.setSlot(eventData.slot2, slot1.id, slot1.count, slot1.data, slot1.extra);
                this.container.sendChanges();
                return;
            }
            var _count = slot2.id != 0 ? Math.min(eventData.count, Item.getMaxStack(slot2.id) - slot2.count) : eventData.count;
            if(_count == 0) return;
            this.container.setSlot(eventData.slot2, slot1.id, slot2.id != 0 ? slot2.count + _count : _count, slot1.data, slot1.extra);
            this.container.setSlot(eventData.slot1, slot1.id, slot1.count - _count, slot1.data, slot1.extra);
            slot1.validate();
            this.container.sendChanges();
        },
        InventorySlotToSlot: function(eventData, connectedClient) {
            var player = new PlayerActor(connectedClient.getPlayerUid());
            var slot1 = player.getInventorySlot(eventData.slot1);
            var slot2 = player.getInventorySlot(eventData.slot2);
            if((slot2.id != slot1.id || slot2.data != slot1.data || (slot2.extra != slot1.extra && ((!slot2.extra || slot2.extra.getAllCustomData()) != (!slot1.extra || slot1.extra.getAllCustomData())))) && slot2.id != 0){
                player.setInventorySlot(eventData.slot1, slot2.id, slot2.count, slot2.data, slot2.extra);
                player.setInventorySlot(eventData.slot2, slot1.id, slot1.count, slot1.data, slot1.extra);
                return;
            }
            var _count = slot2.id != 0 ? Math.min(eventData.count, Item.getMaxStack(slot2.id) - slot2.count) : eventData.count;
            if(_count == 0) return;
            player.setInventorySlot(eventData.slot1, slot1.id, slot1.count - _count, slot1.data, slot1.extra);
            player.setInventorySlot(eventData.slot2, slot1.id, slot2.id != 0 ? slot2.count + _count : _count, slot1.data, slot1.extra);
        },
        SlotToInventorySlot: function(eventData, connectedClient) {
            var player = new PlayerActor(connectedClient.getPlayerUid());
            var slot1 = this.container.getSlot(eventData.slot1);
            var slot2 = player.getInventorySlot(eventData.slot2);
            if((slot2.id != slot1.id || slot2.data != slot1.data || (slot2.extra != slot1.extra && ((!slot2.extra || slot2.extra.getAllCustomData()) != (!slot1.extra || slot1.extra.getAllCustomData())))) && slot2.id != 0){
                player.setInventorySlot(eventData.slot2, slot1.id, slot1.count, slot1.data, slot1.extra);
                this.container.setSlot(eventData.slot1, slot2.id, slot2.count, slot2.data, slot2.extra);
                this.container.sendChanges();
                return;
            }
            var _count = slot2.id != 0 ? Math.min(eventData.count, Item.getMaxStack(slot2.id) - slot2.count) : eventData.count;
            if(_count == 0) return;
            player.setInventorySlot(eventData.slot2, slot1.id, slot2.id != 0 ? slot2.count + _count : _count, slot1.data, slot1.extra);
            this.container.setSlot(eventData.slot1, slot1.id, slot1.count - _count, slot1.data, slot1.extra);
            slot1.validate();
            this.container.sendChanges();
        },
        InventorySlotToContainerSlot: function(eventData, connectedClient) {
            var player = new PlayerActor(connectedClient.getPlayerUid());
            var slot1 = player.getInventorySlot(eventData.slot1);
            var slot2 = this.container.getSlot(eventData.slot2);
            if((slot2.id != slot1.id || slot2.data != slot1.data || (slot2.extra != slot1.extra && ((!slot2.extra || slot2.extra.getAllCustomData()) != (!slot1.extra || slot1.extra.getAllCustomData())))) && slot2.id != 0){
                player.setInventorySlot(eventData.slot1, slot2.id, slot2.count, slot2.data, slot2.extra);
                this.container.setSlot(eventData.slot2, slot1.id, slot1.count, slot1.data, slot1.extra);
                this.container.sendChanges();
                return;
            }
            var _count = slot2.id != 0 ? Math.min(eventData.count, Item.getMaxStack(slot2.id) - slot2.count) : eventData.count;
            if(_count == 0) return;
            player.setInventorySlot(eventData.slot1, slot1.id, slot1.count - _count, slot1.data, slot1.extra);
            this.container.setSlot(eventData.slot2, slot1.id, slot2.id != 0 ? slot2.count + _count : _count, slot1.data, slot1.extra);
            slot2.validate();
            this.container.sendChanges();
        },
    };
    return ChestTileEntity;
}());
Callback.addCallback('LocalTick', function(){
    if(chestData.start && World.getThreadTime() >= chestData.start && chestData.item.count < chestData.item.maxCount){
        if(World.getThreadTime() == chestData.start){
            var uiAdapter = chestData.container.getUiAdapter();
            uiAdapter.getElement(chestData.barData.name).setPosition(chestData.barData.x, chestData.barData.y);
        }
        chestData.tickStarted = true;
        chestData.item.count += chestData.item.maxCount/25;
        chestData.container.setScale(chestData.barData.name, chestData.item.maxCount > 15 ? chestData.item.count/chestData.item.maxCount : Math.floor(chestData.item.count)/chestData.item.maxCount);
    }
});
EXPORT("CustomChest", CustomChest);
EXPORT("ChestTileEntity", ChestTileEntity);
