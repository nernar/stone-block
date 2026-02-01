/*

   Copyright 2022 Nernar (https://github.com/nernar)
   
   Licensed under the Apache License, Version 2.0(the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
   
	 http://www.apache.org/licenses/LICENSE-2.0
   
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

*/

LIBRARY({
	name: "BetterQuesting",
	version: 1,
	api: "CoreEngine",
	shared: true
});

ItemExtraData = ModAPI.requireGlobal("ItemExtraData");
MCSystem = ModAPI.requireGlobal("MCSystem");
let isHorizon = (function() {
	let version = MCSystem.getInnerCoreVersion();
	return parseInt(version.toString()[0]) >= 2;
})();

let $ = new JavaImporter();
if (isHorizon) {
	$.importPackage(Packages.com.zhekasmirnov.innercore.utils);
	$.importPackage(Packages.com.zhekasmirnov.innercore.api.mod.ui.types);
	$.importPackage(Packages.com.zhekasmirnov.innercore.api.mod.ui);
} else {
	$.importPackage(Packages.zhekasmirnov.innercore.utils);
	$.importPackage(Packages.zhekasmirnov.innercore.api.mod.ui.types);
	$.importPackage(Packages.zhekasmirnov.innercore.api.mod.ui);
}

let recolorBitmap = (function() {
	let canvas = new android.graphics.Canvas();
	let paint = new android.graphics.Paint();
	return function(bitmap, color) {
		let source = android.graphics.Bitmap.createBitmap(bitmap.getWidth(), bitmap.getHeight(), android.graphics.Bitmap.Config.ARGB_8888);
		canvas.setBitmap(source);
		paint.setColorFilter(new android.graphics.PorterDuffColorFilter(color, android.graphics.PorterDuff.Mode.SRC_ATOP));
		canvas.drawBitmap(bitmap, 0, 0, paint);
		return source;
	};
})();

let recolorTextureSource = function(proto, name, color) {
	if (proto == "missing_texture") {
		Logger.Log("BetterQuesting: input texture not specified, please make sure that you're included it into gui directory", "WARNING");
		return;
	}
	let source = $.TextureSource.instance.get(proto);
	if (source == null) {
		Logger.Log("BetterQuesting: not found " + proto + " texture, please make sure that you're included it into gui directory", "WARNING");
		return;
	}
	let colored = $.TextureSource.instance.get(name);
	if (colored != null && colored != source) {
		colored.recycle();
	}
	if (color == 0) {
		// If you're miss colored slots, please make sure that you're theme parses properties before bindings
		$.TextureSource.instance.put(name, source);
		return;
	}
	$.TextureSource.instance.put(name, recolorBitmap(source, color));
};

let rescaleBitmap = (function() {
	let canvas = new android.graphics.Canvas();
	return function(bitmap, width, height) {
		let source = android.graphics.Bitmap.createBitmap(width, height, android.graphics.Bitmap.Config.ARGB_8888);
		canvas.setBitmap(source);
		let patch = new android.graphics.NinePatch(bitmap, bitmap.getNinePatchChunk());
		patch.draw(canvas, new android.graphics.Rect(0, 0, width, height));
		return source;
	};
})();

let rescaleTextureSource = function(proto, name, width, height) {
	if (proto == "missing_texture") {
		Logger.Log("BetterQuesting: input texture not specified, please make sure that you're included it into gui directory", "WARNING");
		return;
	}
	if (typeof width != "number" || typeof height != "number") {
		Logger.Log("BetterQuesting: both width and height must be actual bitmap size", "WARNING");
		return;
	}
	let source = $.TextureSource.instance.get(proto);
	if (source == null) {
		Logger.Log("BetterQuesting: not found " + proto + " texture, please make sure that you're included it into gui directory", "WARNING");
		return;
	}
	let rescaled = $.TextureSource.instance.get(name);
	if (rescaled != null && rescaled != source) {
		rescaled.recycle();
	}
	if (width <= 0 || height <= 0) {
		// If you're miss correctly rescaled pictures, please make sure that you're theme overrides putBinding(binding: string)
		$.TextureSource.instance.put(name, source);
		return;
	}
	$.TextureSource.instance.put(name, rescaleBitmap(source, width, height));
};

let BetterQuestingDescriptor = function(id) {
	if (id === undefined || id === null) {
		MCSystem.throwException("BetterQuesting: descriptor id is null");
	}
	this.id = id;
	this.getQuestIds = function() {
		MCSystem.throwException("Stub");
	};
	this.getQuestName = function(id) {
		MCSystem.throwException("Stub");
	};
	this.getQuestDescription = function(id) {
		MCSystem.throwException("Stub");
	};
	this.getQuestSlot = function(id) {
		MCSystem.throwException("Stub");
	};
	this.getQuestRequires = function(id) {
		MCSystem.throwException("Stub");
	};
	this.getQuestRewards = function(id) {
		MCSystem.throwException("Stub");
	};
	this.getLineIds = function() {
		MCSystem.throwException("Stub");
	};
	this.getLineName = function(page) {
		MCSystem.throwException("Stub");
	};
	this.getLineDescription = function(page) {
		MCSystem.throwException("Stub");
	};
	this.getLineQuests = function(page) {
		MCSystem.throwException("Stub");
	};
};

let BetterQuestingJsonDescriptor = function(id, json) {
	BetterQuestingDescriptor.call(this, id);
	
	let quests = {};
	this.putQuest = function(id, descriptor) {
		if (descriptor == null || typeof descriptor != "object") {
			MCSystem.throwException("BetterQuesting: quest object must be passed like {name:\"Quest\"}");
		}
		quests[id] = descriptor;
	};
	this.addQuests = function(quests) {
		if (quests == null || typeof quests != "object") {
			MCSystem.throwException("BetterQuesting: quests object must be passed like {\"0\":{...}}");
		}
		for (let id in quests) {
			this.putQuest(id, quests[id]);
		}
	};
	this.hasQuest = function(id) {
		return quests[id] !== undefined;
	};
	this.removeQuest = function(id) {
		delete quests[id];
	};
	
	this.getQuestIds = function() {
		return Object.keys(quests);
	};
	this.getQuestName = function(id) {
		let quest = quests[id];
		return (quest ? Translation.translate(quest.name) : undefined) || "";
	};
	this.getQuestDescription = function(id) {
		let quest = quests[id];
		return (quest ? Translation.translate(quest.description) : undefined) || "";
	};
	this.getQuestSlot = function(id) {
		let quest = quests[id];
		return (quest ? quest.slot : undefined) || {
			id: "missing"
		};
	};
	this.isQuestMain = function(id) {
		let quest = quests[id];
		return quest ? !!quest.main : false;
	};
	this.getQuestRequires = function(id) {
		let quest = quests[id];
		return (quest ? quest.requires : undefined) || [];
	};
	this.getQuestRewards = function(id) {
		let quest = quests[id];
		return (quest ? quest.rewards : undefined) || [];
	};
	
	let lines = {};
	this.putLine = function(id, descriptor) {
		if (descriptor == null || typeof descriptor != "object") {
			MCSystem.throwException("BetterQuesting: line object must be passed like {x:0,y:0}");
		}
		lines[id] = descriptor;
	};
	this.addLines = function(lines) {
		if (lines == null || typeof lines != "object") {
			MCSystem.throwException("BetterQuesting: lines object must be passed like {\"0\":{quests:[]}}");
		}
		for (let id in lines) {
			this.putLine(id, lines[id]);
		}
	};
	this.hasLine = function(id) {
		return quests[id] !== undefined;
	};
	this.removeLine = function(id) {
		delete lines[id];
	};
	
	this.getLineIds = function() {
		return Object.keys(lines);
	};
	this.getLineName = function(page) {
		let line = lines[page];
		return (line ? Translation.translate(line.name) : undefined) || "";
	};
	this.getLineDescription = function(page) {
		let line = lines[page];
		return (line ? Translation.translate(line.description) : undefined) || "";
	};
	this.getLineQuests = function(page) {
		let line = lines[page];
		return (line ? line.quests : undefined) || {};
	};
	
	this.parseJson = function(json) {
		if (json.quests !== undefined) {
			this.addQuests(json.quests);
		}
		if (json.lines !== undefined) {
			this.addLines(json.lines);
		}
	};
	this.toJson = function() {
		return {
			quests: quests,
			lines: lines
		};
	};
	if (json != null && typeof json == "object") {
		this.parseJson(json);
	}
};

BetterQuestingJsonDescriptor.prototype = new BetterQuestingDescriptor("proto");

let UiCachedContentMap = function(prefix, content, who) {
	let array = Array.isArray(content);
	if (array) {
		prefix = "";
		this.index = content.length;
	} else {
		prefix = prefix + "_";
		this.index = 0;
	}
	let elements = [];
	this.next = function() {
		while (content[prefix + this.index] !== undefined) {
			if (elements[this.index] === undefined) {
				MCSystem.throwException("BetterQuesting: illegal cached content parsing. Please, make sure that you're mods not changing content without cache instance.");
			}
			this.index++;
		}
		let instance = ModAPI.cloneObject(who, true);
		elements.push(instance);
		content[prefix + this.index] = instance;
		return instance;
	};
	this.shrink = function(fixed) {
		if (typeof fixed != "number") {
			fixed = array ? content.length : 0;
		}
		for (let i = fixed;; i++) {
			if (content[prefix + i] !== undefined) {
				if (array) {
					content.splice(i, 1);
					i--;
				} else {
					delete content[prefix + i];
				}
				continue;
			}
			break;
		}
		this.index = fixed;
	};
	this.name = function() {
		return prefix + this.index;
	};
	this.size = function() {
		return elements.length;
	};
};

let BetterQuestingUiHandler = function(ui, style) {
	if (!ui instanceof BetterQuestingUi) {
		MCSystem.throwException("BetterQuesting: ui handler must accept BetterQuesting.Ui");
	}
	if (!style instanceof BetterQuestingTheme) {
		MCSystem.throwException("BetterQuesting: base style must be defined");
	}
	this.getUi = function() {
		return ui;
	};
	this.setTheme = function(theme) {
		if (!theme instanceof BetterQuestingTheme) {
			MCSystem.throwException("BetterQuesting: theme " + theme + " must be instance of BetterQuesting.Theme");
		}
		style = theme;
		let instance = theme.getStyle();
		backgroundWindow.setStyle(instance);
		homeWindow.setStyle(instance);
		storyControllerWindow.setStyle(instance);
		lineAuxWindow.setStyle(instance);
		storyWindow.setStyle(instance);
		panelWindow.setStyle(instance);
		questWindow.setStyle(instance);
		partyWindow.setStyle(instance);
		themeWindow.setStyle(instance);
		this.updateControllerTheme();
	};
	
	let container = new UI.Container();
	this.getContainer = function() {
		return container;
	};
	let backgroundWindow = ui.newBackgroundWindow();
	backgroundWindow.setBlockingBackground(true);
	this.getBackgroundWindow = function() {
		return backgroundWindow;
	};
	let homeWindow = ui.newHomeWindow();
	homeWindow.setCloseOnBackPressed(true);
	this.getHomeWindow = function() {
		return homeWindow;
	};
	let storyControllerWindow = ui.newStoryWindow();
	this.getStoryControllerWindow = function() {
		return storyControllerWindow;
	};
	let lineAuxWindow = ui.newLineAuxWindow();
	this.getLineAuxWindow = function() {
		return lineAuxWindow;
	};
	let storyWindow = new UI.WindowGroup();
	storyWindow.addWindowInstance("controller", storyControllerWindow);
	storyWindow.addWindowInstance("aux", lineAuxWindow);
	storyWindow.setCloseOnBackPressed(true);
	let panelWindow = ui.newPanelWindow();
	this.getPanelWindow = function() {
		return panelWindow;
	};
	let questWindow = ui.newQuestWindow();
	questWindow.setCloseOnBackPressed(true);
	this.getQuestWindow = function() {
		return questWindow;
	};
	let partyWindow = ui.newPartyWindow();
	partyWindow.setCloseOnBackPressed(true);
	this.getPartyWindow = function() {
		return partyWindow;
	};
	let themeWindow = ui.newThemeWindow();
	themeWindow.setCloseOnBackPressed(true);
	this.getThemeWindow = function() {
		return themeWindow;
	};
	
	let foregroundFont = ui.newForegroundFont();
	homeWindow.content.elements.button_text_leave.font = foregroundFont;
	homeWindow.content.elements.button_text_story.font = foregroundFont;
	homeWindow.content.elements.button_text_party.font = foregroundFont;
	homeWindow.content.elements.button_text_theme.font = foregroundFont;
	questWindow.content.elements.reward_text.font = foregroundFont;
	questWindow.content.elements.button_text_previous.font = foregroundFont;
	questWindow.content.elements.button_text_action.font = foregroundFont;
	questWindow.content.elements.button_text_next.font = foregroundFont;
	
	let headerFont = ui.newHeaderFont();
	questWindow.content.elements.quest_title.font = headerFont;
	
	let descriptionFont = ui.newDescriptionFont();
	storyControllerWindow.content.elements.story_description_title.font = descriptionFont;
	storyControllerWindow.content.elements.story_description.font = descriptionFont;
	questWindow.content.elements.quest_description.font = descriptionFont;
	questWindow.content.elements.requirements_text.font = descriptionFont;
	questWindow.content.elements.requirements_consume.font = descriptionFont;
	
	let statusLockedFont = ui.newDescriptionFont();
	let statusForegoingFont = ui.newDescriptionFont();
	let statusDoneFont = ui.newDescriptionFont();
	this.getStatusColoredFont = function(status) {
		return [statusLockedFont, statusForegoingFont, statusDoneFont][status] || descriptionFont;
	};
	let checkableFont = ui.newCheckableFont();
	let panelFont = ui.newPanelFont();
	panelWindow.content.elements.panel_title.font = panelFont;
	panelWindow.content.elements.panel_message.font = panelFont;
	
	this.registerMenuReceiver = function() {
		for (let i = 0; i < arguments.length; i += 2) {
			if (homeWindow.content.elements["button_" + arguments[i]]) {
				homeWindow.content.elements["button_" + arguments[i]].onClick = arguments[i + 1];
			} else {
				Logger.Log("BetterQuesting: missing receiver " + arguments[i], "INFO");
			}
		}
	};
	this.updateControllerTheme = function() {
		foregroundFont.color = style.getColor("text_main");
		headerFont.color = style.getColor("text_header");
		descriptionFont.color = style.getColor("text_aux");
		checkableFont.color = style.getColor("text_main");
		panelFont.color = style.getColor("text_aux");
		statusLockedFont.color = style.getColor("status_locked");
		statusForegoingFont.color = style.getColor("status_foregoing");
		statusDoneFont.color = style.getColor("status_done");
		for (let i = 1; i < questWindow.content.drawing.length; i++) {
			questWindow.content.drawing[i].color = style.getColor("page_divider");
		}
		this.updateControllerInternalImageStyle(backgroundWindow.content);
		this.updateControllerInternalImageStyle(homeWindow.content);
		this.updateControllerInternalImageStyle(storyControllerWindow.content);
		this.updateControllerInternalImageStyle(lineAuxWindow.content);
		this.updateControllerInternalImageStyle(panelWindow.content);
		this.updateControllerInternalImageStyle(questWindow.content);
		this.updateControllerInternalImageStyle(partyWindow.content);
		this.updateControllerInternalImageStyle(themeWindow.content);
	};
	this.updateControllerInternalImageStyle = function(who) {
		if (Array.isArray(who.drawing)) {
			for (let i = 0; i < who.drawing.length; i++) {
				if (who.drawing[i].type == "image") {
					who.drawing[i].bitmap = style.getStyle().getBitmapName(who.drawing[i].bitmapSelf);
				}
			}
		}
		for (let element in who.elements) {
			if (who.elements[element].type == "image") {
				who.elements[element].bitmap = style.getStyle().getBitmapName(who.elements[element].bitmapSelf);
			}
		}
	};
	this.updateControllerLocale = function() {
		container.setText("button_text_leave", Translation.translate("Exit"));
		container.setText("button_text_story", Translation.translate("Quests"));
		container.setText("button_text_party", Translation.translate("Party"));
		container.setText("button_text_theme", Translation.translate("Theme"));
		container.setText("reward_text", Translation.translate("Rewards"));
		container.setText("requirements_text", Translation.translate("Requirements"));
	};
	this.handlePanelMessage = function(title, message) {
		container.setText("panel_title", title);
		container.setText("panel_message", message);
	};
	
	let lineButtons = new UiCachedContentMap("line_button", storyControllerWindow.content.elements, ui.LineButton);
	let lineButtonTexts = new UiCachedContentMap("line_button_text", storyControllerWindow.content.elements, ui.LineButtonText);
	this.removeLineButtons = function() {
		lineButtonTexts.shrink();
		lineButtons.shrink();
	};
	this.addLineButton = function(id, name, when) {
		let button = lineButtons.next();
		button.y = ui.LineButton.y + lineButtons.index * ui.LineButtonOffset;
		button.onClick = function() {
			when && when(id);
		};
		button.linePointer = id;
		let title = lineButtonTexts.next();
		title.y = ui.LineButtonText.y + lineButtonTexts.index * ui.LineButtonOffset;
		title.font = checkableFont;
		container.setText(lineButtonTexts.name(), name);
	};
	
	let lineQuestConnectors = new UiCachedContentMap(null, lineAuxWindow.content.drawing, ui.LineQuestConnector);
	let lineQuestSlots = new UiCachedContentMap("quest_slot", lineAuxWindow.content.elements, ui.LineQuestSlot);
	this.removeAuxLineQuests = function() {
		lineQuestConnectors.shrink();
		lineQuestSlots.shrink();
	};
	this.getAuxLineQuestSpotColor = function(status) {
		return status == 0 ? style.getColor("quest_line_locked")
			: status == 1 ? style.getColor("quest_line_unlocked")
			: status == 2 ? style.getColor("quest_line_pending")
			: status == 3 ? style.getColor("quest_line_complete") : 0;
	};
	this.getAuxLineColoredSlot = function(main, status) {
		return main ? "style:quest_main" : "style:quest_normal" +
			(status == 0 ? "_locked" : status == 1 ? "_unlocked"
			: status == 2 ? "_pending" : status == 3 ? "_complete" : "");
	};
	this.addAuxLineQuest = function(id, location, slot, when, main, status) {
		let visual = lineQuestSlots.next();
		visual.x = ui.LineQuestSlot.x + location.x * ui.LineQuestOffset;
		visual.y = ui.LineQuestSlot.y + location.y * ui.LineQuestOffset;
		if (isHorizon && slot.extra) {
			container.setSlot(lineQuestSlots.name(), slot.id, slot.data, slot.count, ItemExtraData.unwrapValue(slot.extra));
		} else {
			container.setSlot(lineQuestSlots.name(), slot.id, slot.data, slot.count);
		}
		visual.onClick = function() {
			when && when(id);
		};
		visual.bitmap = this.getAuxLineColoredSlot(main, status);
		visual.questPointer = id;
		for (let i = 6; i < arguments.length; i++) {
			let spot = lineQuestConnectors.next();
			spot.x1 = arguments[i].x * ui.LineQuestOffset + ui.LineQuestSlot.size / 2;
			spot.x2 = visual.x + ui.LineQuestSlot.size / 2;
			spot.y1 = arguments[i].y * ui.LineQuestOffset + ui.LineQuestSlot.size / 2;
			spot.y2 = visual.y + ui.LineQuestSlot.size / 2;
			spot.color = this.getAuxLineQuestSpotColor(arguments[i].status);
		}
	};
	this.handleLineDescription = function(name, description) {
		container.setText("story_description_title", name);
		container.setText("story_description", description);
	};
	this.requestLineSelection = function(line) {
		for (let id in questWindow.content.elements) {
			let element = questWindow.content.elements[id];
			if (element.type == "button" && element.linePointer !== undefined) {
				element.bitmap = element.linePointer == line ? element.bitmap2 : element.bitmapSelf;
			}
		}
	};
	
	let questRewardSlots = new UiCachedContentMap("reward_slot", questWindow.content.elements, ui.QuestRewardSlot);
	let questRewardNames = new UiCachedContentMap("reward_name", questWindow.content.elements, ui.QuestRewardName);
	this.removeQuestRewards = function() {
		questRewardSlots.shrink();
		questRewardNames.shrink();
	};
	this.addQuestReward = function(slot, name) {
		let visual = questRewardSlots.next();
		visual.y = ui.QuestRewardSlot.y + questRewardSlots.index * ui.QuestRewardOffset;
		if (isHorizon && slot.extra) {
			container.setSlot(questRewardSlots.name(), slot.id, slot.data, slot.count, ItemExtraData.unwrapValue(slot.extra));
		} else {
			container.setSlot(questRewardSlots.name(), slot.id, slot.data, slot.count);
		}
		let title = questRewardNames.next();
		title.y = ui.QuestRewardName.y + questRewardNames.index * ui.QuestRewardOffset;
		title.font = descriptionFont;
		container.setText(questRewardNames.name(), name);
	};
	let questRequirementSlots = new UiCachedContentMap("requirement_slot", questWindow.content.elements, ui.QuestRequirementSlot);
	let questRequirementNames = new UiCachedContentMap("requirement_name", questWindow.content.elements, ui.QuestRequirementName);
	let questRequirementStatuses = new UiCachedContentMap("requirement_status", questWindow.content.elements, ui.QuestRequirementStatus);
	this.removeQuestRequirements = function() {
		questRequirementSlots.shrink();
		questRequirementNames.shrink();
		questRequirementStatuses.shrink();
	};
	this.getRequirementStatusText = function(status) {
		return status == 0 ? Translation.translate("NOT COMPLETED")
			: status == 1 ? Translation.translate("FOREGOING")
			: status == 2 ? Translation.translate("COMPLETED") : null;
	};
	this.addQuestRequirement = function(slot, name, status) {
		let visual = questRequirementSlots.next();
		visual.y = ui.QuestRequirementSlot.y + questRewardSlots.index * ui.QuestRequirementOffset;
		if (isHorizon && slot.extra) {
			container.setSlot(questRewardSlots.name(), slot.id, slot.data, slot.count, ItemExtraData.unwrapValue(slot.extra));
		} else {
			container.setSlot(questRewardSlots.name(), slot.id, slot.data, slot.count);
		}
		let title = questRequirementNames.next();
		title.y = ui.QuestRequirementName.y + questRequirementNames.index * ui.QuestRequirementOffset;
		title.font = descriptionFont;
		container.setText(questRequirementNames.name(), name);
		let subtitle = questRequirementStatuses.next();
		subtitle.y = ui.QuestRequirementStatus.y + questRequirementStatuses.index * ui.QuestRequirementOffset;
		subtitle.font = this.getStatusColoredFont(status);
		container.setText(questRequirementStatuses.name(), this.getRequirementStatusText(status));
	};
	this.handleQuestDescription = function(title, description, consume, status, previous, next) {
		container.setText("quest_title", title);
		container.setText("quest_description", description);
		questWindow.content.elements.requirements_consume.font = consume ? statusDoneFont : statusLockedFont;
		container.setText("requirements_consume", Translation.translate("Consume: ") + Translation.translate(consume ? "Yes" : "No"));
		questWindow.content.elements.button_text_previous.bitmap = previous ? questWindow.content.elements.button_text_previous.bitmap2 : questWindow.content.elements.button_text_previous.bitmapSelf;
		questWindow.content.elements.button_text_action.bitmap = status > 1 ? questWindow.content.elements.button_text_action.bitmap2 : questWindow.content.elements.button_text_action.bitmapSelf;
		container.setText("button_text_action", status == 1 ? Translation.translate("Collect") : Translation.translate("Check"));
		questWindow.content.elements.button_text_next.bitmap = next ? questWindow.content.elements.button_text_next.bitmap2 : questWindow.content.elements.button_text_next.bitmapSelf;
	};
	
	this.handleHomeWindow = function() {
		if (!backgroundWindow.isOpened()) {
			backgroundWindow.open();
		}
		container.openAs(homeWindow);
	};
	this.handleStoryWindow = function() {
		if (!backgroundWindow.isOpened()) {
			backgroundWindow.open();
		}
		container.openAs(storyWindow);
	};
	this.handleQuestWindow = function() {
		if (!backgroundWindow.isOpened()) {
			backgroundWindow.open();
		}
		container.openAs(questWindow);
	};
	this.handlePartyWindow = function() {
		if (!backgroundWindow.isOpened()) {
			backgroundWindow.open();
		}
		container.openAs(partyWindow);
	};
	this.handleThemeWindow = function() {
		if (!backgroundWindow.isOpened()) {
			backgroundWindow.open();
		}
		container.openAs(themeWindow);
	};
	this.forceClose = function() {
		container.close();
		backgroundWindow.close();
	};
	
	this.setTheme(style);
	this.updateControllerLocale();
};

let BetterQuestingProcessor = function(id, descriptor, handler) {
	if (id === undefined || id === null) {
		MCSystem.throwException("BetterQuesting: processor id is null");
	}
	if (!descriptor instanceof BetterQuestingDescriptor) {
		MCSystem.throwException("BetterQuesting: processor descriptor must be instance of BetterQuesting.Descriptor");
	}
	if (!handler instanceof BetterQuestingUiHandler) {
		MCSystem.throwException("BetterQuesting: processor handler must be instance of BetterQuesting.UiHandler");
	}
	let self = this;
	this.id = id;
	this.getDescriptor = function() {
		return descriptor;
	};
	this.getUiHandler = function() {
		return handler;
	};
	this.parseIdentifier = function(id) {
		if (typeof id == "number") {
			return id;
		}
		return ItemID[id] || BlockID[id] || isHorizon ?
			(VanillaItemID[id] || VanillaBlockID[id] || 0) : 0;
	};
	let placeholderSlot = {
		id: 0,
		data: 0,
		count: 0
	};
	this.parseSlot = function(slot) {
		if (typeof slot == "number") {
			Logger.Log("BetterQuesting: please, parse slots as objects to lower memory usage coverage", "INFO");
			return {
				id: this.parseIdentifier(slot),
				data: 0,
				count: 1
			};
		}
		if (slot == null || typeof slot != "object") {
			return placeholderSlot;
		}
		slot.id = this.parseIdentifier(slot.id);
		slot.data = slot.data || 0;
		slot.count = slot.count >= 0 ? slot.count : 1;
		return slot;
	};
	this.requestStoryController = function() {
		handler.removeLineButtons();
		let lines = descriptor.getLineIds();
		for (let id in lines) {
			handler.addLineButton(lines[id], descriptor.getLineName(lines[id]), function(line) {
				self.requestLineDescription(line);
			});
		}
	};
	let spotsCache = {};
	this.requestLineDescription = function(line) {
		handler.removeAuxLineQuests();
		handler.handleLineDescription(descriptor.getLineName(line), descriptor.getLineDescription(line));
		let quests = descriptor.getLineQuests(line);
		for (let id in quests) {
			let args = [id, quests[id], this.parseSlot(descriptor.getQuestSlot(id)), function(id) {
				self.handleQuestWindow(id);
			}, descriptor.isQuestMain(id), 0];
			if (Array.isArray(quests[id].requires)) {
				for (let i = 0; i < quests[id].requires.length; i++) {
					let quest = quests[id].requires[i];
					if (!quests.hasOwnProperty(quest)) {
						// Quests in different lines
						continue;
					}
					if (!spotsCache.hasOwnProperty(line + ":" + id + ":" + i)) {
						spotsCache[line + ":" + id + ":" + i] = {
							x: quests[quest].x,
							y: quests[quest].y
						};
					}
					spotsCache[line + ":" + id + ":" + i].status = 0;
					args.push(spotsCache[line + ":" + id + ":" + i]);
				}
			}
			handler.addAuxLineQuest.apply(handler, args);
		}
		handler.requestLineSelection(line);
	};
	this.requestQuestDescription = function(id) {
		handler.removeQuestRewards();
		handler.removeQuestRequirements();
		handler.handleQuestDescription(descriptor.getQuestName(id), descriptor.getQuestDescription(id), false, 0, false, false);
		let rewards = descriptor.getQuestRewards(id);
		for (let i = 0; i < rewards.length; i++) {
			if (rewards[i] == null || typeof rewards[i] != "object") {
				Logger.Log("BetterQuesting: reward " + i + " in quest id " + id + " must be object", "WARNING");
				continue;
			}
			let slot = this.parseSlot(rewards[i]);
			handler.addQuestReward(slot, Item.getName(slot.id, slot.data, slot.extra));
		}
		let requirements = descriptor.getQuestRequires(id);
		for (let i = 0; i < requirements.length; i++) {
			if (requirements[i] == null || typeof requirements[i] != "object") {
				Logger.Log("BetterQuesting: requirement " + i + " in quest id " + id + " must be object", "WARNING");
				continue;
			}
			let slot = this.parseSlot(requirements[i]);
			handler.addQuestRequirement(slot, Item.getName(slot.id, slot.data, slot.extra), 0);
		}
	};
	this.handleHomeWindow = function() {
		handler.handleHomeWindow();
	};
	this.handleStoryWindow = function(prefferedLine) {
		if (prefferedLine !== undefined) {
			this.requestLineDescription(prefferedLine);
		}
		handler.handleStoryWindow();
	};
	this.handleQuestWindow = function(questId) {
		if (questId !== undefined) {
			this.requestQuestDescription(questId);
		}
		handler.handleQuestWindow();
	};
	this.handlePartyWindow = function() {
		handler.handlePartyWindow();
	};
	this.handleThemeWindow = function() {
		handler.handleThemeWindow();
	};
	this.close = function() {
		handler.forceClose();
	};
	handler.registerMenuReceiver("leave", function() {
		self.close();
	}, "story", function() {
		self.handleStoryWindow();
	}, "party", function() {
		self.handlePartyWindow();
	}, "theme", function() {
		self.handleThemeWindow();
	});
	this.requestStoryController();
	Callback.addCallback("CustomWindowClosed", function(who) {
		if (who == handler.getHomeWindow()) {
			self.close();
		} else if (who == handler.getStoryControllerWindow() || who == handler.getPartyWindow() || who == handler.getThemeWindow()) {
			self.handleHomeWindow();
		} else if (who == handler.getQuestWindow()) {
			self.handleStoryWindow();
		}
	});
};

let BetterQuestingDatabase = function() {
	MCSystem.throwException("Not supported yet");
};

let BetterQuestingUi = function() {
	this.newBackgroundWindow = function() {
		return new UI.Window(ModAPI.cloneObject(this.Background, true));
	};
	this.newHomeWindow = function() {
		return new UI.Window(ModAPI.cloneObject(this.Home, true));
	};
	this.newStoryWindow = function() {
		return new UI.Window(ModAPI.cloneObject(this.Story, true));
	};
	this.newLineAuxWindow = function() {
		return new UI.Window(ModAPI.cloneObject(this.LineAux, true));
	};
	this.newPanelWindow = function() {
		return new UI.Window(ModAPI.cloneObject(this.Panel, true));
	};
	this.newQuestWindow = function() {
		return new UI.Window(ModAPI.cloneObject(this.Quest, true));
	};
	this.newPartyWindow = function() {
		return new UI.Window();
	};
	this.newThemeWindow = function() {
		return new UI.Window();
	};
	this.newForegroundFont = function() {
		return ModAPI.cloneObject(this.ForegroundFont, true);
	};
	this.newHeaderFont = function() {
		return ModAPI.cloneObject(this.HeaderFont, true);
	};
	this.newDescriptionFont = function() {
		return ModAPI.cloneObject(this.DescriptionFont, true);
	};
	this.newCheckableFont = function() {
		return ModAPI.cloneObject(this.CheckableFont, true);
	};
	this.newPanelFont = function() {
		return ModAPI.cloneObject(this.PanelFont, true);
	};
};

BetterQuestingUi.prototype.Background = {
	location: {
		width: 1000,
		height: 450
	},
	drawing: [
		{
			type: "background",
			color: 0
		},
		{
			type: "image",
			x: 104,
			y: 27,
			width: 748,
			height: 396,
			bitmapSelf: "style:background"
		}
	],
	elements: {}
};

BetterQuestingUi.prototype.ForegroundFont = {
	size: 16,
	alignment: 1
};

BetterQuestingUi.prototype.HeaderFont = ModAPI.cloneObject(BetterQuestingUi.prototype.ForegroundFont, true);

BetterQuestingUi.prototype.Home = {
	location: {
		width: 1000,
		height: 450
	},
	drawing: [
		{
			type: "background",
			color: 0
		}
	],
	elements: {
		logo: {
			type: "image",
			x: 129,
			y: 50,
			width: 696,
			height: 292,
			scale: 2.25,
			bitmapSelf: "style:logo"
		}
	}
};

(function() {
	let descriptor = ["leave", "story", "party", "theme"];
	for (let i = 0; i < descriptor.length; i++) {
		BetterQuestingUi.prototype.Home.elements["button_" + descriptor[i]] = {
			type: "button",
			x: 174 * i + 129,
			y: 342,
			width: 174,
			height: 56,
			bitmap: "style:button_normal_home",
			bitmap2: "style:button_normal_hover_home"
		};
		BetterQuestingUi.prototype.Home.elements["button_text_" + descriptor[i]] = {
			type: "text",
			x: 174 * i + 216,
			y: 370
		};
	}
})();

BetterQuestingUi.prototype.DescriptionFont = {
	size: 16
};

BetterQuestingUi.prototype.Story = {
	location: {
		width: 1000,
		height: 450
	},
	drawing: [
		{
			type: "background",
			color: 0
		}
	],
	elements: {
		story_description_title: {
			type: "text",
			x: 380,
			y: 320,
			formatMaxCharsPerLine: 31,
			format: true,
		},
		story_description: {
			type: "text",
			x: 380,
			y: 344,
			multiline: true,
			formatMaxCharsPerLine: 31,
			format: true
		}
	}
};

BetterQuestingUi.prototype.LineButtonOffset = 36;

BetterQuestingUi.prototype.LineButton = {
	type: "button",
	x: 131,
	y: 52,
	width: 236,
	height: 36,
	bitmap: "style:button_normal_story",
	bitmap2: "style:button_normal_hover_story",
	bitmapSelf: "style:button_normal_story"
};

BetterQuestingUi.prototype.CheckableFont = {
	size: 14,
	alignment: 1
};

BetterQuestingUi.prototype.LineButtonText = {
	type: "text",
	x: 249,
	y: 70
};

BetterQuestingUi.prototype.LineAux = {
	location: {
		x: 372,
		y: 54,
		width: 453,
		height: 258
	},
	drawing: [
		{
			type: "background",
			color: 0
		},
		{
			type: "image",
			width: 453,
			height: 258,
			bitmapSelf: "style:frame"
		}
	],
	elements: {}
};

BetterQuestingUi.prototype.LineQuestOffset = 80;

BetterQuestingUi.prototype.LineQuestConnector = {
	type: "line",
	width: 2
};

BetterQuestingUi.prototype.LineQuestSlot = {
	type: "slot",
	x: 629,
	y: 88,
	size: 60,
	visual: true
};

BetterQuestingUi.prototype.PanelFont = {
	size: 14
};

BetterQuestingUi.prototype.Panel = {
	location: {
		width: 195,
		height: 64
	},
	drawing: [
		{
			type: "background",
			color: 0
		},
		{
			type: "image",
			width: 195,
			height: 64,
			bitmapSelf: "style:panel",
		}
	],
	elements: {
		panel_title: {
			type: "text",
			x: 16,
			y: 12
		},
		panel_message: {
			type: "text",
			x: 16,
			y: 34
		}
	}
};

BetterQuestingUi.prototype.Quest = {
	location: {
		width: 1000,
		height: 450
	},
	drawing: [
		{
			type: "background",
			color: 0
		},
		{
			type: "line",
			x1: 493,
			y1: 83,
			x2: 493,
			y2: 388,
			width: 2
		},
		{
			type: "line",
			x1: 184,
			y1: 216,
			x2: 462,
			y2: 216,
			width: 2
		},
		{
			type: "line",
			x1: 528,
			y1: 106,
			x2: 806,
			y2: 106,
			width: 2
		}
	],
	elements: {
		quest_title: {
			type: "text",
			x: 477,
			y: 48
		},
		quest_description: {
			type: "text",
			x: 136,
			y: 80,
			multiline: true,
			formatMaxCharsPerLine: 22,
			format: true
		},
		requirements_text: {
			type: "text",
			x: 615,
			y: 80
		},
		reward_text: {
			type: "text",
			x: 323,
			y: 182
		},
		requirements_consume: {
			type: "text",
			x: 537,
			y: 132
		},
		button_previous: {
			type: "button",
			x: 510,
			y: 339,
			width: 56,
			height: 56,
			bitmap: "style:button_normal",
			bitmap2: "style:button_normal_hover",
			bitmapSelf: "style:button_normal"
		},
		button_text_previous: {
			type: "text",
			x: 538,
			y: 367,
			text: "<"
		},
		button_action: {
			type: "button",
			x: 566,
			y: 339,
			width: 202,
			height: 56,
			bitmap: "style:button_normal_action",
			bitmap2: "style:button_normal_hover_action",
			bitmapSelf: "style:button_normal_action"
		},
		button_text_action: {
			type: "text",
			x: 667,
			y: 367
		},
		button_next: {
			type: "button",
			x: 768,
			y: 339,
			width: 56,
			height: 56,
			bitmap: "style:button_normal",
			bitmap2: "style:button_normal_hover",
			bitmapSelf: "style:button_normal"
		},
		button_text_next: {
			type: "text",
			x: 796,
			y: 367,
			text: ">"
		}
	}
};

BetterQuestingUi.prototype.QuestRewardOffset = 40;

BetterQuestingUi.prototype.QuestRewardSlot = {
	type: "slot",
	x: 186,
	y: 219,
	size: 40,
	visual: true,
	bitmap: "style:frame_slot"
};

BetterQuestingUi.prototype.QuestRewardName = {
	type: "text",
	x: 235,
	y: 228
};

BetterQuestingUi.prototype.QuestRequirementOffset = 60;

BetterQuestingUi.prototype.QuestRequirementSlot = {
	type: "slot",
	x: 536,
	y: 159,
	size: 60,
	visual: true,
	bitmap: "style:frame_slot"
};

BetterQuestingUi.prototype.QuestRequirementName = {
	type: "text",
	x: 605,
	y: 169
};

BetterQuestingUi.prototype.QuestRequirementStatus = {
	type: "text",
	x: 605,
	y: 189
};

let BetterQuestingTheme = function(parent) {
	let style = (function() {
		if (parent instanceof $.UIStyle) {
			let instance = parent.copy();
			instance.inherit(parent);
			return instance;
		}
		if (typeof parent == "string") {
			parent = BetterQuesting.requireTheme(parent);
		}
		if (parent instanceof BetterQuestingTheme) {
			let instance = parent.getStyle().copy();
			instance.inherit(parent.getStyle());
			return instance;
		}
		return new $.UIStyle();
	})();
	this.getStyle = function() {
		return style;
	};
	this.getColor = function(name) {
		let color = style.getStringProperty("" + name, null);
		if (color == null) {
			return 0;
		}
		try {
			color = style.getIntProperty("" + name, 0);
		} catch (e) {
			try {
				color = android.graphics.Color.parseColor(color);
			} catch (e) {
				Logger.Log("BetterQuesting: invalid color " + color, "INFO");
				return 0;
			}
		}
		return color;
	};
	this.putBinding = function(name, binding) {
		style.addBinding("" + name, "" + binding);
		if (name == "quest_normal" || name == "quest_main") {
			recolorTextureSource(binding, binding + "_locked", this.getColor("quest_icon_locked"));
			style.addBinding(name + "_locked", binding + "_locked");
			recolorTextureSource(binding, binding + "_unlocked", this.getColor("quest_icon_unlocked"));
			style.addBinding(name + "_unlocked", binding + "_unlocked");
			recolorTextureSource(binding, binding + "_pending", this.getColor("quest_icon_pending"));
			style.addBinding(name + "_pending", binding + "_pending");
			recolorTextureSource(binding, binding + "_complete", this.getColor("quest_icon_complete"));
			style.addBinding(name + "_complete", binding + "_complete");
		} else if (name == "background") {
			rescaleTextureSource(binding, binding, 748, 396);
		} else if (name == "frame") {
			rescaleTextureSource(binding, binding, 453, 258);
		} else if (name == "panel") {
			rescaleTextureSource(binding, binding, 195, 64);
		} else if (name == "button_normal" || name == "button_normal_hover") {
			rescaleTextureSource(binding, binding + "_home", 174, 56);
			style.addBinding(name + "_home", binding + "_home");
			rescaleTextureSource(binding, binding + "_story", 236, 36);
			style.addBinding(name + "_story", binding + "_story");
			rescaleTextureSource(binding, binding + "_action", 202, 56);
			style.addBinding(name + "_action", binding + "_action");
			rescaleTextureSource(binding, binding, 56, 56);
		}
	};
	this.putProperty = function(name, property) {
		style.setProperty("" + name, property);
	};
	this.getBinding = function(name) {
		return style.getBinding(name, "missing_texture");
	};
};

let BetterQuestingJsonTheme = function(json, parent) {
	if (json != null && typeof json == "object") {
		if (typeof json.parent == "string") {
			parent = json.parent;
		}
	}
	if (parent === undefined) {
		parent = "better_questing.dark";
	}
	BetterQuestingTheme.call(this, parent);
	
	this.addBindings = function(bindings) {
		if (bindings == null || typeof bindings != "object") {
			MCSystem.throwException("BetterQuesting: bindings object must be passed like {\"slot_extra\":\"mod.slot_extra\"}");
		}
		for (let name in bindings) {
			this.putBinding(name, bindings[name]);
		}
	};
	this.addProperties = function(properties) {
		if (properties == null || typeof properties != "object") {
			MCSystem.throwException("BetterQuesting: properties object must be passed like {\"property\":\"value\"}");
		}
		for (let name in properties) {
			this.putProperty(name, properties[name]);
		}
	};
	
	this.parseJson = function(json) {
		if (json.properties !== undefined) {
			this.addProperties(json.properties);
		}
		if (json.bindings !== undefined) {
			this.addBindings(json.bindings);
		}
	};
	this.toJson = function() {
		MCSystem.throwException("BetterQuesting: theme to json unsupported");
	};
	if (json != null && typeof json == "object") {
		this.parseJson(json);
	}
};

BetterQuestingJsonTheme.prototype = new BetterQuestingTheme;

let BetterQuesting = new (function() {
	let themes = {};
	this.registerTheme = function(id, theme) {
		if (!theme instanceof BetterQuestingTheme) {
			MCSystem.throwException("BetterQuesting: ui theme must be prototype of BetterQuesting.Theme");
		}
		if (themes.hasOwnProperty(id)) {
			Logger.Log("BetterQuesting: theme " + id + " is already registered", "WARNING");
			return;
		}
		themes[id] = theme;
	};
	this.requireTheme = function(id) {
		if (!themes.hasOwnProperty(id)) {
			if (["better_questing.light", "better_questing.dark", "better_questing.ender", "better_questing.nether", "better_questing.overworld", "better_questing.stronghold", "better_questing.vanilla"].indexOf(id) != -1) {
				MCSystem.throwException("BetterQuesting: required internal theme " + id + " not found. Are you sure that standard theme resources exists for required book?");
			}
			MCSystem.throwException("BetterQuesting: required theme " + id + " not found");
		}
		return themes[id];
	};
	this.findTheme = function(id) {
		return themes[id] || null;
	};
	this.fromJson = function(id, json, ui) {
		if (json === undefined) {
			json = id;
			id = null;
		}
		if (json == null || typeof json != "object") {
			MCSystem.throwException("BetterQuesting.fromJson associated null in json. Are you sure that one of resources not missed in void?");
		}
		for (let themeId in json.themes) {
			this.registerTheme(themeId, new BetterQuestingJsonTheme(json.themes[themeId]));
		}
		let descriptor = new BetterQuestingJsonDescriptor(id || json.id, json);
		let theme = this.findTheme(json.theme) || this.findTheme("better_questing.dark") || new BetterQuestingTheme();
		let handler = new BetterQuestingUiHandler(ui || new BetterQuestingUi(), theme);
		return new BetterQuestingProcessor(id || json.id, descriptor, handler);
	};
	
	this.Descriptor = BetterQuestingDescriptor;
	this.UiHandler = BetterQuestingUiHandler;
	this.Processor = BetterQuestingProcessor;
	this.Ui = BetterQuestingUi;
	this.Theme = BetterQuestingTheme;
	this.DescriptorJson = BetterQuestingJsonDescriptor;
	this.ThemeJson = BetterQuestingJsonTheme;
})();

(function() {
	try {
		let file = new java.io.File(__dir__ + "quests/themes.json");
		if (file.exists()) {
			let json = $.FileTools.readFileText(file.getPath());
			json = JSON.parse(json);
			for (let themeId in json) {
				BetterQuesting.registerTheme(themeId, new BetterQuestingJsonTheme(json[themeId], null));
			}
		} else {
			MCSystem.throwException("BetterQuesting: internal themes not found");
		}
	} catch (e) {
		Logger.Log("BetterQuesting: internal themes corrupted or not found, consider to use only self unique themes", "DEBUG");
		Logger.Log("BetterQuesting: " + e, "DEBUG");
	}
})();

EXPORT("BetterQuesting", BetterQuesting);
