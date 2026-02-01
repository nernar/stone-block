LIBRARY({
	name: "workbench",
	version: 3,
	shared: false,
	api: "AdaptedScript"
});

/**
 * Workbench for Horizon
 * Created by ToxesFoxes
 * 由@CuiZhenhang修改成库
 * 介绍：导入本库后，您可使用Workbench_open()打开工作台UI
 */

Translation.addTranslation("container.crafting", {bg: "Изработване", cs: "Výroba", da: "Fremstilling", de: "Handwerk", el: "Κατασκευή", en: "Crafting", es: "Fabricar", fi: "Nikkarointi", fr: "Fabrication", hu: "Barkácsolás", id: "Pembuatan", it: "Fabbricazione", ja: "クラフト", ko: "제작", nb: "Utforming", nl: "Vervaardiging", pl: "Konstruowanie", pt: "Criação", ru: "Создание", sk: "Výroba", sv: "Tillverkning", tr: "Eşya Yapma", uk: "Крафтинг", zh: "合成", })
var DP = UI.getScreenHeight() // 1000
var Workbench = {
	colors: {
		_197: android.graphics.Color.rgb(197, 197, 197),
		_177: android.graphics.Color.rgb(177, 177, 177),
		_96: android.graphics.Color.rgb(96, 96, 96),
		_60: android.graphics.Color.rgb(60, 60, 60),
		_30: android.graphics.Color.rgb(30, 30, 30)
	},
	p: {
		/* paddings */
		all: DP * 0.05,
		bottom: DP * 0.05,
		top: DP * 0.05,
		right: DP * 0.05,
		left: DP * 0.05,
		inner: DP * 0.02,
		outer: DP * 0.02,
		/* positions */
		center: 500,
		/* params */
		width: DP * 0.05,
		height: DP * 0.05,
		scale: 2,
		slotSizes: 140,
		defaultSlotSizes: 160,
		scroll: 70
	},
	gridPos: {
		x: 260, y: 100
	},
	Fonts: {
		default: {
			size: 40,
			// shadow: 0.5,
			color: android.graphics.Color.rgb(60, 60, 60),
			align: 0
		},
		defaultCenter: {
			size: 40,
			// shadow: 0.5,
			color: android.graphics.Color.rgb(60, 60, 60),
			align: 1
		},
		defaultCenterLarge: {
			size: 50,
			shadow: 0,
			color: android.graphics.Color.rgb(60, 60, 60),
			align: 1
		},
		defaultEnd: {
			size: 50,
			// shadow: 0.5,
			color: android.graphics.Color.rgb(60, 60, 60),
			align: 2
		}
	},
	isRefreshNeededAfterCraft: true,
	Screens: {
		Slots: {
			elements: {}
		}
	},
	Group: new UI.WindowGroup(),
	Container: new UI.Container()
}

Workbench.Group.setCloseOnBackPressed(true);

// function createFramedButton(coords, w, h, clicker) {
// 	var buttonUp = UI.FrameTextureSource.get("default_frame_3").expandAndScale(w, h, 3 * 3, Workbench.colors._197)
// 	var buttonDown = UI.FrameTextureSource.get("default_frame_2").expandAndScale(w, h, 3 * 3, Workbench.colors._177)
// 	var name1 = "_btntex1_" + w + "x" + h
// 	var name2 = "_btntex2_" + w + "x" + h
// 	UI.TextureSource.put(name1, buttonUp)
// 	UI.TextureSource.put(name2, buttonDown)
// 	return {
// 		type: "button", x: coords.x, y: coords.y, z: coords.z,
// 		bitmap: name1, bitmap2: name2, _forceUpdate: Math.random(),
// 		clicker: clicker
// 	}
// }
function updateCenter() {
	Workbench.gridPos.x = (1000 - (Workbench.p.slotSizes * 3)) / 2
	Workbench.Group.invalidateAllContent()
}
function updateFrameHeights() {
	var h = WorkbenchMainUI.getLocation().getWindowHeight()
	var drawing = WorkbenchMainUI.getContent().drawing
	drawing[2].height = h - 8
	drawing[3].height = h
	drawing[4].height = h
	drawing[5].height = h - 24
}
updateCenter()
Workbench.Screens.Main = {
	location: {
		padding: {
			left: Workbench.p.left,
			right: Workbench.p.right,
			bottom: Workbench.p.bottom,
			top: Workbench.p.top
		}
	},
	elements: {
		close: {
			type: "closeButton", global: true, scale: 2.4, bitmap: "X", bitmap2: "XPress", x: 945, y: 10
		}
	},
	drawing: [
		{type: "color", color: 0},
		{type: "frame", bitmap: "workbench_frame2", scale: Workbench.p.scale, width: (Workbench.p.height * 3), height: (Workbench.p.height * 2.8), color: Workbench.colors._96, x: 1000 - Workbench.p.width * 3, y: 0},
		{type: "frame", bitmap: "workbench_frame3", scale: Workbench.p.scale, width: 40, height: 1000, x: 480, y: 4},
		{type: "frame", bitmap: "workbench_frame1", scale: Workbench.p.scale, width: 495, height: 1000, color: Workbench.colors._197},
		{type: "frame", bitmap: "workbench_frame1", scale: Workbench.p.scale, width: (507 - Workbench.p.width * 3), height: 1000, color: Workbench.colors._197, x: 505},
		{type: "frame", bitmap: "workbench_frame4", scale: Workbench.p.scale, width: 471, height: 1000, x: 12, y: 12},
	]
}
Workbench.Screens.Slots = {
	location: {
		padding: {
			left: Workbench.p.left,
			right: 512,
			bottom: Workbench.p.bottom + 24,
			top: Workbench.p.top + 24
		},
		scrollY: 100
	},
	drawing: [{type: "color", color: android.graphics.Color.argb(0, 256, 0, 0)}],
	elements: {"fps": {type: "fps", z: 100, x: 70}}
}
Workbench.Screens.Grid = {
	location: {
		padding: {
			left: 500 + 24,
			right: Workbench.p.right + (Workbench.p.height * 2.8),
			bottom: Workbench.p.bottom + 12,
			top: Workbench.p.top + 12
		}
	},
	drawing: [{type: "color", color: android.graphics.Color.argb(0, 256, 0, 0)}],
	elements: {
		slot0: {
			type: "slot", visual: true,
			size: Workbench.p.slotSizes,
			x: Workbench.gridPos.x,
			y: Workbench.gridPos.y,
		},
		slot1: {
			type: "slot", visual: true,
			size: Workbench.p.slotSizes,
			x: Workbench.gridPos.x + (Workbench.p.slotSizes),
			y: Workbench.gridPos.y,
		},
		slot2: {
			type: "slot", visual: true,
			size: Workbench.p.slotSizes,
			x: Workbench.gridPos.x + (Workbench.p.slotSizes * 2),
			y: Workbench.gridPos.y,
		},
		slot3: {
			type: "slot", visual: true,
			size: Workbench.p.slotSizes,
			x: Workbench.gridPos.x,
			y: Workbench.gridPos.y + (Workbench.p.slotSizes),
		},
		slot4: {
			type: "slot", visual: true,
			size: Workbench.p.slotSizes,
			x: Workbench.gridPos.x + (Workbench.p.slotSizes),
			y: Workbench.gridPos.y + (Workbench.p.slotSizes),
		},
		slot5: {
			type: "slot", visual: true,
			size: Workbench.p.slotSizes,
			x: Workbench.gridPos.x + (Workbench.p.slotSizes * 2),
			y: Workbench.gridPos.y + (Workbench.p.slotSizes),
		},
		slot6: {
			type: "slot", visual: true,
			size: Workbench.p.slotSizes,
			x: Workbench.gridPos.x,
			y: Workbench.gridPos.y + (Workbench.p.slotSizes * 2),
		},
		slot7: {
			type: "slot", visual: true,
			size: Workbench.p.slotSizes,
			x: Workbench.gridPos.x + (Workbench.p.slotSizes),
			y: Workbench.gridPos.y + (Workbench.p.slotSizes * 2),
		},
		slot8: {
			type: "slot", visual: true,
			size: Workbench.p.slotSizes,
			x: Workbench.gridPos.x + (Workbench.p.slotSizes * 2),
			y: Workbench.gridPos.y + (Workbench.p.slotSizes * 2),
		},
		text_craft_table: {
			type: "text",
			x: 500,
			y: Workbench.gridPos.y - 95,
			font: Workbench.Fonts.defaultCenter,
			z: 1,
			text: Translation.translate("container.crafting")
		},
		text_name: {
			type: "text",
			x: 500,
			y: Workbench.gridPos.y + (Workbench.p.slotSizes * 3.025),
			font: Workbench.Fonts.defaultCenter,
			text: "", z: 1
		},
		// craft_button: createFramedButton({
		// 	x: Workbench.gridPos.x,
		// 	y: Workbench.gridPos.y + (Workbench.p.slotSizes * 3.5)
		// }, Workbench.p.slotSizes * 3, Workbench.p.slotSizes * 1.3, {

		text_count: {
			type: "text",
			x: 500,
			y: Workbench.gridPos.y + (Workbench.p.slotSizes * 3.90),
			z: 1,
			font: Workbench.Fonts.defaultEnd,
			text: ""
		},
		result_icon: {
			type: "slot", visual: true,
			x: Workbench.gridPos.x + (Workbench.p.slotSizes),
			y: Workbench.gridPos.y + (Workbench.p.slotSizes * 3.75),
			z: 1,
			size: Workbench.p.slotSizes + 10,
			clicker: {
				onClick: function () {
					var result = Recipes.provideRecipe(Workbench.Container, "")
					if (result) {
						if (result.id != 0 && result.count > 0) {
							Callback.invokeCallback("VanillaWorkbenchCraft", result, Workbench.Container)
							MCSystem.runOnMainThread({
								run: function () {
									Player.addItemInventory(result.id, result.count, result.data != -1 ? result.data : 0, true, result.extra)
									Callback.invokeCallback("VanillaWorkbenchPostCraft", result, Workbench.Container)
									refreshRecipeList()
								}
							})
							Workbench.Handler.refreshAsync()
						}
					} else {}
				}, onLongClick: function () {
					var resultItems = []
					try {
						while (true) {
							var result = Recipes.provideRecipe(Workbench.Container, "")
							if (result && result.id != 0 && result.count > 0) {
								Callback.invokeCallback("VanillaWorkbenchCraft", result, Workbench.Container)
								resultItems.push(result)
							} else {
								break
							}
						}
					} catch (e) {print(e)}

					if (resultItems.length > 0) {
						MCSystem.runOnMainThread({
							run: function () {
								for (var i in resultItems) {
									var result = resultItems[i]
									Player.addItemInventory(result.id, result.count, result.data != -1 ? result.data : 0, true, result.extra)
									Callback.invokeCallback("VanillaWorkbenchPostCraft", result, Workbench.Container)
								}
								refreshRecipeList()
							}
						})

						Workbench.Handler.refreshAsync()
					}
				}
			}
		}
	}
}

var WorkbenchMainUI = new UI.Window(Workbench.Screens.Main)
var WorkbenchSlotsUI = new UI.Window(Workbench.Screens.Slots)
var WorkbenchGridUI = new UI.Window(Workbench.Screens.Grid)
updateFrameHeights()

WorkbenchMainUI.setDynamic(true)
WorkbenchSlotsUI.setDynamic(true)
WorkbenchGridUI.setDynamic(true)

Workbench.Group.addWindowInstance("Main", WorkbenchMainUI)
Workbench.Group.addWindowInstance("Slots", WorkbenchSlotsUI)
Workbench.Group.addWindowInstance("Grid", WorkbenchGridUI)
Workbench.Group.setBlockingBackground(true)
Workbench.Handler = new Recipes.WorkbenchUIHandler(Workbench.Screens.Slots.elements, Workbench.Container, Workbench.Container)

function deselectCurrentRecipe() {
	Workbench.Screens.Grid.elements.text_name.text = ""
	// Workbench.Screens.Grid.elements.text_count.text = ""
	Workbench.Container.setSlot("result_icon", 0, 0, 0)
	Workbench.Handler.deselectCurrentRecipe()
}

function refreshRecipeList() {
	var time1 = java.lang.System.currentTimeMillis()
	var amount = Workbench.Handler.refresh()
	var time2 = java.lang.System.currentTimeMillis()
	log("workbench recipes (" + amount + ") refreshed in " + (time2 - time1) + " ms")
	updateLocation(amount)
}

function updateLocation(amount) {
	var location = WorkbenchSlotsUI.getLocation()
	var height = (Math.ceil(amount / 6)) * Workbench.p.scroll + 80
	location.setScroll(0, height)
}

Workbench.Handler.setOnSelectionListener({
	onRecipeSelected: function (recipe) {
		var result = recipe.getResult()
		var name = Item.getName(result.id, result.data, result.extra) + ""
		name = name.replace(/§./g, "")
		Callback.invokeCallback("VanillaWorkbenchRecipeSelected", recipe, result, Workbench.Container)
		Workbench.Screens.Grid.elements.text_name.text = name.split("\n")[0]
		// Workbench.Screens.Grid.elements.text_count.text = result.count + " x"
		Workbench.Container.setSlot("result_icon", result.id, result.count, result.data, result.extra)
		Workbench.isRefreshNeededAfterCraft = true
	}
})

var timeStart = 0

Workbench.Handler.setOnRefreshListener({
	onRefreshStarted: function () {
		timeStart = java.lang.System.currentTimeMillis()
	},

	onRefreshCompleted: function (count) {
		var timeEnd = java.lang.System.currentTimeMillis()
		log("workbench recipes (" + count + ") refreshed in " + (timeEnd - timeStart) + " ms")
		updateLocation(count)
	}
})

Workbench.Container.setOnCloseListener({
	onClose: function () {
		deselectCurrentRecipe()
	}
})


Workbench_open=function(){
new java.lang.Thread(function () {
	refreshRecipeList()
	java.lang.Thread.sleep(16)
	Workbench.Container.openAs(Workbench.Group)
}).start()
};
/*
Callback.addCallback("ItemUseLocalServer", function (coords, item, block) {
	if (block.id == 58) {
		if (!Entity.isSneaking(getPlayerEnt())) {
			preventDefault()
			Workbench_open()
		}
	}
})
*/
/*
Callback.addCallback("MinecraftActivityStopped", function () {
	deselectCurrentRecipe()
	Workbench.Container.close()
})
*/
EXPORT("Workbench_open", Workbench_open);