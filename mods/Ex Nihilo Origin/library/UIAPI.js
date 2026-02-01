LIBRARY({
    name: "UIAPI",
    version: 4,
    shared: false,
    api: "CoreEngine"
});
//没有作者

var SCREENHEIGH = UI.getScreenHeight();
var UIHEIGH = SCREENHEIGH - 24;
var UIWIDTH = UIHEIGH * 1.05;
var SLOTSIZE = (UIWIDTH - 24) / 9;
var UISTAR_X = 500 - UIWIDTH * 0.5;
var UISTAR_Y = 12;
var invSLOTSTAR_X = UISTAR_X + 12;
var invSLOTSTAR_Y = SCREENHEIGH - SLOTSIZE * 5 - 28;
var COLOR = android.graphics.Color.rgb(197, 197, 197);

var UIRegistry = function(state) {
    var TEXT = state.standart.header.text || " "
    var DRAWING = state.drawing || []
    var element = state.elements || []
    var drawing = [{
        type: "background",
        color: android.graphics.Color.TRANSPARENT
    }, {
        type: "frame",
        bitmap: "classic_frame_bg_light",
        scale: 3,
        x: UISTAR_X,
        y: UISTAR_Y,
        width: UIWIDTH,
        height: UIHEIGH,
        color: COLOR
    }, {
        type: "text",
        x: UISTAR_X + 18,
        y: UISTAR_Y + 30,
        text: TEXT,
        font: {
            color: android.graphics.Color.rgb(74, 74, 74),
            size: 15
        }
    }];
    for (i = 0; i < DRAWING.length; i++) {
        drawing.push(DRAWING[i])
    };
    element["close"] = {
        type: "closeButton",
        global: true,
        scale: 2,
        bitmap: "classic_close_button",
        bitmap2: "classic_close_button_down",
        x: UISTAR_X + UIWIDTH - 40,
        y: UISTAR_Y + 12
    };
    for (var i = 9; i < 45; i++) {
        element["invSlot" + i] = {
            type: "invSlot",
            x: invSLOTSTAR_X + (i % 9) * SLOTSIZE,
            y: invSLOTSTAR_Y + Math.floor(i / 9) * SLOTSIZE + (i >= 36 ? 4 : 0),
            size: SLOTSIZE,
            index: i >= 36 ? (i - 36) : i
        };
    };
    var ClassicalUi = new UI.StandartWindow({
        params: {
            slot: "classic_slot",
            invSlot: "classic_slot"
        },
        standart: {
            inventory: {
                width: 300,
                padding: 600
            }
        },
        drawing: drawing,
        elements: element
    });
    ClassicalUi.setBlockingBackground(true);
    return ClassicalUi;
}

EXPORT("UIRegistry", UIRegistry);