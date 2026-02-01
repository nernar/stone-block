IDRegistry.genBlockID("transmutationTablet");
Block.createBlock("transmutationTablet", [
    {name: "Transmutation Table", texture: [
        ["table_bottom",0], ["table_top",0], ["table_side",0],
    ], inCreative: __config__.getBool("物品方块.转换桌")}
], Block.createSpecialType({base: 1, renderlayer: 3}));
(function SetTablet(id){
	Block.setBlockShape(id, {x: 0, y: 0, z: 0}, {x: 1, y: 1/4, z: 1}, 0);
	var render = new ICRender.Model();
	var model = BlockRenderer.createModel();
	model.addBox(0, 0, 0, 1, 1/4, 1, id, 0);
	render.addEntry(model);
	BlockRenderer.setStaticICRender(id, 0, render);
})(BlockID.transmutationTablet);


Callback.addCallback("PostLoaded", function(){
if(__config__.getBool("物品方块.转换桌")){
	if(hard_mode){
		Recipes.addShaped({id: BlockID.transmutationTablet, count: 1, data: 0}, 
		["kpk", 
		 "rcr",
		 "ddd"],
		["k", ItemID.kleinStar5, 0, "p", ItemID.philosophersStone, 0, "d", BlockID.rmBlock, 0,
		    "r", BlockID.antimatterRelay3, 0, "c", BlockID.energyCondenser2, 0],
		function(api, field, result){
			for (var i in field) if(field[i].id != ItemID.philosophersStone) api.decreaseFieldSlot(i);
		});
		// 24576*512+(466944*4)*3+(681281+24576*42-32*6)*2+(9741339+681281+24576*106-32*6-139264*4*2)=33526174

		Recipes.addShaped({id: ItemID.transmute_tablet, count: 1, data: 0}, 
		["ddd", 
		 "ktk",
		 "ddd"],
		["d", BlockID.rmBlock, 0, "k", ItemID.kleinStar6, 0, "t", BlockID.transmutationTablet, 0]);
		// 24576*2048+(466944*4)*6+33526174=95064478
	}else{
		Recipes.addShapeless({id: BlockID.transmutationTablet, count: 1, data: 0}, [
			{id: 49, data: 0}, {id: 1, data: 0}, {id: 49, data: 0}, 
			{id: 1, data: 0}, {id: ItemID.philosophersStone, data: 0}, {id: 1, data: 0}, 
			{id: 49, data: 0}, {id: 1, data: 0}, {id: 49, data: 0}
		], function(api, field, result){
			for (var i in field) if(field[i].id != ItemID.philosophersStone) api.decreaseFieldSlot(i);
		});

		Recipes.addShaped({id: ItemID.transmute_tablet, count: 1, data: 0}, 
		["odo", 
		 "dcd",
		 "odo"],
		["o", BlockID.dmBlock, 0, "d", 1, 0, "c", BlockID.transmutationTablet, 0]);
	}
}
});


TABLET_ITEMS2 = [];
var tablet_search = false;
var TABLET_PAGE_max = 0;
var Tablet_slot = function(x, y, num){
	return {
	    type: "slot",
	    bitmap: "nothing",
	    isTransparentBackground: true,
	    visual: true,
	    x: x,
	    y: y,
	    clicker: {
	        onClick: function(container, tile) {
	            let slot = container.getSlot("learn"+String(num));
	            if (TABLET_EMC >= System.getValue(slot.id, slot.data)) {
	                TABLET_EMC -= System.getValue(slot.id, slot.data);
	                Player.addItemToInventory(slot.id, 1, slot.data);
	            }
	        },
	        onLongClick: function(container, tile) {
	            let slot = container.getSlot("learn"+String(num));
	            if (TABLET_EMC >= System.getValue(slot.id, slot.data) * Item.getMaxStack(slot.id, slot.data)) {
	                TABLET_EMC -= System.getValue(slot.id, slot.data) * Item.getMaxStack(slot.id, slot.data);
	                Player.addItemToInventory(slot.id, Item.getMaxStack(slot.id, slot.data), slot.data);
	            } else if (TABLET_EMC >= System.getValue(slot.id, slot.data)) {
	                var count = Math.floor(TABLET_EMC / System.getValue(slot.id, slot.data));
	                TABLET_EMC -= System.getValue(slot.id, slot.data) * count;
	                Player.addItemToInventory(slot.id, count, slot.data);
	            }
	        }
	    }
	};
};

//(   ,   ),(500, 80),(560, 80),(620, 80),(   ,   )
//(440,140),(   ,   ),(   ,   ),(   ,   ),(680,140)
//(440,200),(   ,   ),(560,200),(   ,   ),(680,200)
//(440,260),(   ,   ),(   ,   ),(   ,   ),(680,260)
//(   ,   ),(500,320),(560,320),(620,320),(   ,   )

var tabletUI = new UI.StandartWindow({
    standart: {
        header: {text: {text: Translation.translate("Transmutation tablet")}},
        inventory: {standart: true},
        background: {standart: true},
        minHeight: 1000/16*9*1.5-500/屏幕长宽比-90
    },
    elements: {
        "burn": {type: "slot", x: 550, y: 420, bitmap: "burn"},
        "learn0": Tablet_slot(560, 200, 0),
        "learn1": Tablet_slot(500, 80, 1),
        "learn2": Tablet_slot(560, 80, 2),
        "learn3": Tablet_slot(620, 80, 3),
        "learn4": Tablet_slot(680, 140, 4),
        "learn5": Tablet_slot(680, 200, 5),
        "learn6": Tablet_slot(680, 260, 6),
        "learn7": Tablet_slot(620, 320, 7),
        "learn8": Tablet_slot(560, 320, 8),
        "learn9": Tablet_slot(500, 320, 9),
        "learn10": Tablet_slot(440, 260, 10),
        "learn11": Tablet_slot(440, 200, 11),
        "learn12": Tablet_slot(440, 140, 12),
        "charge": {type: "slot", x: 750, y: 80, bitmap: "starCharge"},
        "uncharge": {type: "slot", x: 750, y: 140, bitmap: "unstarCharge" },
        "text": {type: "text", x: 325, y: 35, width: 50, height: 15, text: "EMC"},
        "buttonNxt": {type: "button", x: 610, y: 420, bitmap: "btnNext0", scale: 3.2,
            clicker: {
                onClick: function(container, tile) {
                    if (TABLET_PAGE < TABLET_PAGE_max - 1) {
                        TABLET_PAGE++
                    } else TABLET_PAGE = 0;
                }
            }
        },
        "text_page": {type: "text", x: 550, y: 380, width: 100, height: 30, text: Translation.translate("Page: ") + "0/1"},
        "buttonBck": {type: "button", x: 490, y: 420, bitmap: "btnPrev0", scale: 3.2,
            clicker: {
                onClick: function(container, tile) {
                    if (TABLET_PAGE > 0) {
                        TABLET_PAGE--
                    } else TABLET_PAGE = TABLET_PAGE_max - 1;
                }
            }
        },
        "search": {type: "button", x: 700, y: 30, bitmap: "search", scale: 2.0,
            clicker: {
                onClick: function(container, tile) {
                    if (!tablet_search) {
                        tablet_search = true;
                        TABLET_PAGE = 0;
                    } else if (tablet_search) {
                        tablet_search = false;
                        TABLET_PAGE = 0;
                    }
                }
            }
        },
        "textSearch": {type: "text", x: 750, y: 35, z: 1, text: Translation.translate("Search"),
            font: {color: android.graphics.Color.WHITE, size: 20}},
        "TABLET_search": {type: "text", x: 325, y: 55, text: Translation.translate("Search mode: "),
            font: {color: android.graphics.Color.RED, size: 20}},
        "buttonSearch": {type: "button", x: 740, y: 30, scale: 3.2, bitmap: "textBox",
            clicker: {
                onClick: function() {
                    TABLET_ITEMS2 = [];
                    UI.getContext()
                        .runOnUiThread(new java.lang.Runnable({
                        run: function() {
                            try {
                                const editText = new android.widget.EditText(UI.getContext());
                                editText.setHint(Translation.translate("Text"));
                                new android.app.AlertDialog.Builder(UI.getContext())
                                    .setTitle(Translation.translate("Please enter what to search for"))
                                    .setView(editText)
                                    .setPositiveButton(Translation.translate("Search"), new android.content.DialogInterface.OnClickListener() {
                                    onClick: function() {
                                        const keyword = editText.getText() + "";
                                        tabletUI.elements.get("textSearch")
                                            .onBindingUpdated("text", keyword.length ? keyword : Translation.translate("Search"));
                                        if (keyword) {
                                            for (let i in TABLET_ITEMS) {
                                                if (Item.getName(TABLET_ITEMS[i].id, TABLET_ITEMS[i].data)
                                                    .match(new RegExp(keyword, "i")) || Number(keyword) == TABLET_ITEMS[i].id) {
                                                    TABLET_ITEMS2.push({
                                                        id: TABLET_ITEMS[i].id,
                                                        data: TABLET_ITEMS[i].data
                                                    })
                                                }
                                            };
                                        };
                                        if (tablet_search) TABLET_PAGE = 0;
                                    }
                                })
                                    .show();
                            } catch (e) {}
                        }
                    }));
                }
            }
        },
    }
});


TileEntity.registerPrototype(BlockID.transmutationTablet, {
  getGuiScreen: function(){
    return tabletUI;
  },
  init: function (){
    this.container = TABLET_CONTAINER;
  },
  tick: function(){
      let content = this.container.getGuiContent();
      if(!content) for(i = 0; i <= 12; i ++){
          this.container.setSlot("learn"+i, 0, 0, 0);
      }
  },
  destroy: function(){
    this.container = new UI.Container();
  }
});

IDRegistry.genItemID("transmute_tablet");
Item.createItem("transmute_tablet", "Transmute tablet", {name: "transmute_tablet"}, {stack: 1, isTech: !__config__.getBool("物品方块.转换桌")});


Item.registerUseFunction("transmute_tablet", function(c, b, i){
	TABLET_CONTAINER.openAs(tabletUI);
});

Callback.addCallback("tick", function (){
	if(TABLET_CONTAINER.isOpened()){
		if(!tablet_search){TABLET_PAGE_max = Math.ceil(TABLET_ITEMS.length/13) || 1} else
		if(tablet_search){TABLET_PAGE_max = Math.ceil(TABLET_ITEMS2.length/13) || 1};
		container = TABLET_CONTAINER;
		container.setText("text", "EMC: "+TABLET_EMC);
		container.setText("text_page", Translation.translate("Page: ")+(TABLET_PAGE+1)+"/"+TABLET_PAGE_max);
		container.setText("TABLET_search", Translation.translate("Search mode: ")+Translation.translate(String(tablet_search)));
		let slotBurn = container.getSlot("burn");
		let value = System.getValue(slotBurn.id, slotBurn.data);
		
		if(slotBurn.id == ItemID.tomeKnowledge){
			System.getAllKnowledge();
		};
		
		if(value && !System.isEnchanted(slotBurn)){
			if(!TABLET_LIST[slotBurn.id+":"+slotBurn.data]){
				TABLET_LIST[slotBurn.id+":"+slotBurn.data] = true;
				TABLET_ITEMS.push({id: slotBurn.id, data: slotBurn.data});
				alert(Translation.translate("Learned!"));
			}
			
			TABLET_EMC += value*slotBurn.count;
			slotBurn.count -= slotBurn.count;
			container.validateAll();
		}
		
		try{
			if(!tablet_search){
				if(TABLET_ITEMS[0]) for(i = 0; i <= 12; i ++){
					if(TABLET_ITEMS[13*TABLET_PAGE+i]){
						container.setSlot("learn"+i, TABLET_ITEMS[13*TABLET_PAGE+i].id, 1, TABLET_ITEMS[13*TABLET_PAGE+i].data);
					}else if(!TABLET_ITEMS[13*TABLET_PAGE+i]){
						container.setSlot("learn"+i, 0, 1, 0);
					}
				}
			}else if(TABLET_ITEMS2[0]){
				for(i = 0; i <= 12; i ++){
					if(TABLET_ITEMS2[13*TABLET_PAGE+i]){
						container.setSlot("learn"+i, TABLET_ITEMS2[13*TABLET_PAGE+i].id, 1, TABLET_ITEMS2[13*TABLET_PAGE+i].data);
					}else if(!TABLET_ITEMS2[13*TABLET_PAGE+i]){
						container.setSlot("learn"+i, 0, 1, 0);
					}
				}
			}else for(i=0; i<=12; i++) container.setSlot("learn"+i, 0, 1, 0);
		}catch(e){}
	}
System.chargeStar(TABLET_CONTAINER, true);
System.unchargeStar(TABLET_CONTAINER, true);
});


IDRegistry.genItemID("tomeKnowledge");
Item.createItem("tomeKnowledge", "Tome of knowledge", {name: "tomeKnowledge"}, {stack: 1, isTech: !__config__.getBool("物品方块.转换桌")});

Item.registerUseFunction("tomeKnowledge", function (c, item){
System.getAllKnowledge();
});
