var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
IMPORT("CustomChest");
IMPORT("StorageInterface");
// Translation
Translation.addTranslation("Iron Chest", { "cs_CZ": "Železná truhla", "da_DK": "Jern Kiste", "de_DE": "Eisentruhe", "el_GR": "Σιδερένιο Σεντούκι", "es_ES": "Cofre de Hierro", "et_EE": "Raudkirst", "fr_FR": "Coffre en Fer", "ko_KR": "철 상자", "nb_NO": "Jernkiste", "nl_NL": "Ijzeren Kist", "pl_PL": "Żelazna skrzynia", "pt_BR": "Baú de Ferro", "pt_PT": "Baú de Ferro", "ru_RU": "Железный сундук", "sv_SE": "Järnkista", "tr_TR": "Demir Sandık", "zh_CN": "铁箱子", "zh_TW": "鐵箱" });
Translation.addTranslation("Gold Chest", { "cs_CZ": "Zlatá truhla", "da_DK": "Guld Kiste", "de_DE": "Goldtruhe", "el_GR": "Χρυσό Σεντούκι", "es_ES": "Cofre de Oro", "et_EE": "Kuldkirst", "fr_FR": "Coffre en Or", "ko_KR": "금 상자", "nb_NO": "Gullkiste", "nl_NL": "Gouden Kist", "pl_PL": "Złota skrzynia", "pt_BR": "Baú de Ouro", "pt_PT": "Baú de Ouro", "ru_RU": "Золотой сундук", "sv_SE": "Guldkista", "tr_TR": "Altın Sandık", "zh_CN": "金箱子", "zh_TW": "黃金箱" });
Translation.addTranslation("Diamond Chest", { "cs_CZ": "Diamantová truhla", "da_DK": "Diamant Kiste", "de_DE": "Diamanttruhe", "el_GR": "Διαμαντένιο Σεντούκι", "es_ES": "Cofre de Diamante", "et_EE": "Teemantkirst", "fr_FR": "Coffre en Diamant", "ko_KR": "다이아몬드 상자", "nb_NO": "Diamantkiste", "nl_NL": "Diamanten Kist", "pl_PL": "Diamentowa skrzynia", "pt_BR": "Baú de Diamante", "pt_PT": "Baú de Diamante", "ru_RU": "Алмазный сундук", "sv_SE": "Diamantkista", "tr_TR": "Elmas Sandık", "zh_CN": "钻石箱子", "zh_TW": "鑽石箱" });
Translation.addTranslation("Copper Chest", { "cs_CZ": "Měděná truhla", "da_DK": "Kobber Kiste", "de_DE": "Kupfertruhe", "el_GR": "Χάλκινο Σεντούκι", "es_ES": "Cofre de Cobre", "et_EE": "Vaskkirst", "fr_FR": "Coffre en Cuivre", "ko_KR": "구리 상자", "nb_NO": "Kobberkiste", "nl_NL": "Koperen Kist", "pl_PL": "Miedziana skrzynia", "pt_BR": "Baú de Cobre", "pt_PT": "Baú de Cobre", "ru_RU": "Медный сундук", "sv_SE": "Kopparkista", "tr_TR": "Bakır Sandık", "zh_CN": "铜箱子", "zh_TW": "銅箱" });
Translation.addTranslation("Silver Chest", { "cs_CZ": "Stříbrná truhla", "da_DK": "Sølv Kiste", "de_DE": "Silbertruhe", "el_GR": "Ασημένιο Σεντούκι", "es_ES": "Cofre de Plata", "et_EE": "Hõbekirst", "fr_FR": "Coffre en Argent", "ko_KR": "은 상자", "nb_NO": "Sølvkiste", "nl_NL": "Zilveren Kist", "pl_PL": "Srebrna skrzynia", "pt_BR": "Baú de Prata", "pt_PT": "Baú de Prata", "ru_RU": "Серебряный сундук", "sv_SE": "Silverkista", "tr_TR": "Gümüş Sandık", "zh_CN": "银箱子", "zh_TW": "銀箱" });
Translation.addTranslation("Crystal Chest", { "cs_CZ": "Krystalová truhla", "da_DK": "Krystal Kiste", "de_DE": "Kristalltruhe", "el_GR": "Κρυστάλλινο Σεντούκι", "es_ES": "Cofre de Cristal", "et_EE": "Kristallkirst", "fr_FR": "Coffre en Cristal", "ko_KR": "수정 상자", "nb_NO": "Krystallkiste", "nl_NL": "Kristallen Kist", "pl_PL": "Kryształowa skrzynia", "pt_BR": "Baú de Cristal", "pt_PT": "Baú de Cristal", "ru_RU": "Кристальный сундук", "sv_SE": "Kristallkista", "tr_TR": "Kristal Sandık", "zh_CN": "水晶箱子", "zh_TW": "水晶箱" });
Translation.addTranslation("Obsidian Chest", { "cs_CZ": "Obsidiánová truhla", "da_DK": "Obsidian Kiste", "de_DE": "Obsidiantruhe", "el_GR": "Σεντούκι Οψιδιανού", "es_ES": "Cofre de Obsidiana", "et_EE": "Obsidiaankirst", "fr_FR": "Coffre en Obsidienne", "ko_KR": "흑요석 상자", "nb_NO": "Obsidiankiste", "nl_NL": "Obsidiaanen Kist", "pl_PL": "Obsydianowa skrzynia", "pt_BR": "Baú de Obsidiana", "pt_PT": "Baú de Obsidiana", "ru_RU": "Обсидиановый сундук", "sv_SE": "Obsidiankista", "tr_TR": "Obsidyen Sandık", "zh_CN": "黑曜石箱子", "zh_TW": "黑曜石箱" });
Translation.addTranslation("Iron to Gold Chest Upgrade", { "cs_CZ": "Vylepšení železné truhly na zlatou", "da_DK": "Jern til Guld Kiste Opgradering", "de_DE": "Eisen-zu-Goldtruhen-Upgrade", "el_GR": "Αναβάθμιση από Σιδερένιο σε Χρυσό Σεντούκι", "es_ES": "Mejora de Cofre de Hierro a Oro", "et_EE": "Raudkirst kuld kirstuks", "fr_FR": "Amélioration de coffre en fer à or", "ko_KR": "철 상자를 금 상자로 업그레이드", "nb_NO": "Jern til Gull Kisteoppgradering", "nl_NL": "Ijzeren naar Gouden Kist Transformatie", "pl_PL": "Ulepszenie żelaznej skrzyni na złotą", "pt_BR": "Aprimoramento de Baú de Ferro para Ouro", "pt_PT": "Melhoria de Baú de Ferro para Ouro", "ru_RU": "Улучшение из железного в золотой сундук", "sv_SE": "Järn till Guld Kistuppgradering", "tr_TR": "Demir Sandığı Altın Sandığa Yükselt", "zh_CN": "升级：铁>金", "zh_TW": "鐵箱升級成金箱" });
Translation.addTranslation("Gold to Diamond Chest Upgrade", { "cs_CZ": "Vylepšení zlaté truhly na diamantovou", "da_DK": "Guld til Diamant Kiste Opgradering", "de_DE": "Gold-zu-Diamanttruhen-Upgrade", "el_GR": "Αναβάθμιση από Χρυσό σε Διαμαντένιο Σεντούκι", "es_ES": "Mejora de Cofre de Oro a Diamante", "et_EE": "Kuldkirst teemandist kirstuks", "fr_FR": "Amélioration de coffre en or à diamant", "ko_KR": "금 상자를 다이아몬드 상자로 업그레이드", "nb_NO": "Gull til Diamant Kisteoppgradering", "nl_NL": "Gouden naar Diamanten Kist Transformatie", "pl_PL": "Ulepszenie złotej skrzyni na diamentową", "pt_BR": "Aprimoramento de Baú de Ouro para Diamante", "pt_PT": "Melhoria de Baú de Ouro para Diamante", "ru_RU": "Улучшение из золотого в алмазный сундук", "sv_SE": "Guld till Diamant Kistuppgradering", "tr_TR": "Altın Sandığı Elmas Sandığa Yükselt", "zh_CN": "升级：金>钻石", "zh_TW": "金箱升級成鑽石箱" });
Translation.addTranslation("Copper to Silver Chest Upgrade", { "cs_CZ": "Vylepšení měděné truhly na stříbrnou", "da_DK": "Kobber til Sølv Kiste Opgradering", "de_DE": "Kupfer-zu-Silbertruhen-Upgrade", "el_GR": "Αναβάθμιση από Χάλκινο σε Ασημένιο Σεντούκι", "es_ES": "Mejora de Cofre de Cobre a Plata", "et_EE": "Vaskkirst hõbedast kirstuks", "fr_FR": "Amélioration de coffre en cuivre à argent", "ko_KR": "구리 상자를 은 상자로 업그레이드", "nb_NO": "Kobber til Sølv Kisteoppgradering", "nl_NL": "Koperen naar Zilveren Kist Transformatie", "pl_PL": "Ulepszenie miedzianej skrzyni na srebrną", "pt_BR": "Aprimoramento de Baú de Cobre para Prata", "pt_PT": "Melhoria de Baú de Cobre para Prata", "ru_RU": "Улучшение из медного в серебряный сундук", "sv_SE": "Koppar till Silver Kistuppgradering", "tr_TR": "Bakır Sandığı Gümüş Sandığa Yükselt", "zh_CN": "升级：铜>银", "zh_TW": "銅箱升級成銀箱" });
Translation.addTranslation("Silver to Gold Chest Upgrade", { "cs_CZ": "Vylepšení stříbrné truhly na zlatou", "da_DK": "Sølv til Guld Kiste Opgradering", "de_DE": "Silber-zu-Goldtruhen-Upgrade", "el_GR": "Αναβάθμιση από Ασημένιο σε Χρυσό Σεντούκι", "es_ES": "Mejora de Cofre de Plata a Oro", "et_EE": "Hõbekirst kullast kirstuks", "fr_FR": "Amélioration de coffre en argent à or", "ko_KR": "은 상자를 금 상자로 업그레이드", "nb_NO": "Sølv til Gull Kisteoppgradering", "nl_NL": "Zilveren naar Gouden Kist Transformatie", "pl_PL": "Ulepszenie srebrnej skrzyni na złotą", "pt_BR": "Aprimoramento de Baú de Prata para Ouro", "pt_PT": "Melhoria de Baú de Prata para Ouro", "ru_RU": "Улучшение из серебряного в золотой сундук", "sv_SE": "Silver till Guld Kistuppgradering", "tr_TR": "Gümüş Sandığı Altın Sandığa Yükselt", "zh_CN": "升级：银>金", "zh_TW": "銀箱升級成金箱" });
Translation.addTranslation("Copper to Iron Chest Upgrade", { "cs_CZ": "Vylepšení měděné truhly na železnou", "da_DK": "Kobber til Jern Kiste Opgradering", "de_DE": "Kupfer-zu-Eisentruhen-Upgrade", "el_GR": "Αναβάθμιση από Χάλκινο σε Σιδερένιο Σεντούκι", "es_ES": "Mejora de Cofre de Cobre a Hierro", "et_EE": "Vaskkirst rauast kirstuks", "fr_FR": "Amélioration de coffre en cuivre à fer", "ko_KR": "구리 상자를 철 상자로 업그레이드", "nb_NO": "Kobber til Jern Kisteoppgradering", "nl_NL": "Koperen naar Ijzeren Kist Transformatie", "pl_PL": "Ulepszenie miedzianej skrzyni na żelazną", "pt_BR": "Aprimoramento de Baú de Cobre para Ferro", "pt_PT": "Melhoria de Baú de Cobre para Ferro", "ru_RU": "Улучшение из медного в железный сундук", "sv_SE": "Koppar till Järn Kistuppgradering", "tr_TR": "Bakır Sandığı Demir Sandığa Yükselt", "zh_CN": "升级：铜>铁", "zh_TW": "銅箱升級成鐵箱" });
Translation.addTranslation("Diamond to Crystal Chest Upgrade", { "cs_CZ": "Vylepšení diamantové truhly na krystalovou", "da_DK": "Diamant til Krystal Kiste Opgradering", "de_DE": "Diamant-zu-Kristalltruhen-Upgrade", "el_GR": "Αναβάθμιση από Διαμαντένιο σε Κρυστάλλινο Σεντούκι", "es_ES": "Mejora de Cofre de Diamante a Cristal", "et_EE": "Teemantkirst kristallist kirstuks", "fr_FR": "Amélioration de coffre en diamant à crital", "ko_KR": "다이아몬드 상자를 수정 상자로 업그레이드", "nb_NO": "Diamant til Krystall Kisteoppgradering", "nl_NL": "Diamanten naar Kristallen Kist Transformatie", "pl_PL": "Ulepszenie diamentowej skrzyni na kryształową", "pt_BR": "Aprimoramento de Baú de Diamante para Cristal", "pt_PT": "Melhoria de Baú de Diamante para Cristal", "ru_RU": "Улучшение из алмазного в кристальный сундук", "sv_SE": "Diamant till Kristal Kistuppgradering", "tr_TR": "Elmas Sandığı Kristal Sandığa Yükselt", "zh_CN": "升级：钻石>水晶", "zh_TW": "鑽石箱升級成水晶箱" });
Translation.addTranslation("Wood to Iron Chest Upgrade", { "cs_CZ": "Vylepšení dřevěné truhly na železnou", "da_DK": "Træ til Jern Kiste Opgradering", "de_DE": "Holz-zu-Eisentruhen-Upgrade", "el_GR": "Αναβάθμιση από Ξύλινο σε Σιδερένιο Σεντούκι", "es_ES": "Mejora de Cofre de Madera a Hierro", "et_EE": "Puukirst rauast kirstuks", "fr_FR": "Amélioration de coffre en bois à fer", "ko_KR": "나무 상자를 철 상자로 업그레이드", "nb_NO": "Tre til Jern Kisteoppgradering", "nl_NL": "Houten naar Ijzeren Kist Transformatie", "pl_PL": "Ulepszenie drewnianej skrzyni na żelazną", "pt_BR": "Aprimoramento de Baú de Madeira para Ferro", "pt_PT": "Melhoria de Baú de Madeira para Ferro", "ru_RU": "Улучшение из деревянного в железный сундук", "sv_SE": "Trä till Järn Kistuppgradering", "tr_TR": "Tahta Sandığı Demir Sandığa Yükselt", "zh_CN": "升级：木>铁", "zh_TW": "木箱升級成鐵箱" });
Translation.addTranslation("Wood to Copper Chest Upgrade", { "cs_CZ": "Vylepšení dřevěné truhly na měděnou", "da_DK": "Træ til Kobber Kiste Opgradering", "de_DE": "Holz-zu-Kupfertruhen-Upgrade", "el_GR": "Αναβάθμιση από Ξύλινο σε Χάλκινο Σεντούκι", "es_ES": "Mejora de Cofre de Madera a Cobre", "et_EE": "Puukirst vasest kirstuks", "fr_FR": "Amélioration de coffre en bois à cuivre", "ko_KR": "나무 상자를 구리 상자로 업그레이드", "nb_NO": "Tre til Kobber Kisteoppgradering", "nl_NL": "Houten naar Koperen Kist Transformatie", "pl_PL": "Ulepszenie drewnianej skrzyni na miedzianą", "pt_BR": "Aprimoramento de Baú de Madeira para Cobre", "pt_PT": "Melhoria de Baú de Madeira para Cobre", "ru_RU": "Улучшение из деревянного в медный сундук", "sv_SE": "Trä till Koppar Kistuppgradering", "tr_TR": "Tahta Sandığı Bakır Sandığa Yükselt", "zh_CN": "升级：木>铜", "zh_TW": "木箱升級成銅箱" });
Translation.addTranslation("Diamond to Obsidian Chest Upgrade", { "cs_CZ": "Vylepšení diamantové truhly na obsidiánovou", "da_DK": "Diamant til Obsidian Kiste Opgradering", "de_DE": "Diamant-zu-Obsidiantruhen-Upgrade", "el_GR": "Αναβάθμιση από Διαμαντένιο σε Σεντούκι Οψιδιανού", "es_ES": "Mejora de Cofre de Diamante a Obsidiana", "et_EE": "Teemantkirst obsidiaanist kirstuks", "fr_FR": "Amélioration de coffre en diamant à obsidienne", "ko_KR": "다이아몬드 상자를 흑요석 상자로 업그레이드", "nb_NO": "Diamant til Obsidian Kisteoppgradering", "nl_NL": "Diamanten naar Obsidiaanen Kist Transformatie", "pl_PL": "Ulepszenie diamentowej skrzyni na obsydianową", "pt_BR": "Aprimoramento de Baú de Diamante para Obsidiana", "pt_PT": "Melhoria de Baú de Diamante para Obsidiana", "ru_RU": "Улучшение из алмазного в обсидиановый сундук", "sv_SE": "Diamant till Obsidian Kistuppgradering", "tr_TR": "Elmas Sandığı Obsidyen Sandığa Yükselt", "zh_CN": "升级：钻石>黑曜石", "zh_TW": "鑽石箱升級成黑曜石箱" });
var AdvancedChestTE = /** @class */ (function (_super) {
    __extends(AdvancedChestTE, _super);
    function AdvancedChestTE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdvancedChestTE.prototype.upgrade = function (chestID, player) {
        var blockData = this.blockSource.getBlockData(this.x, this.y, this.z);
        this.blockSource.setBlock(this.x, this.y, this.z, chestID, blockData);
        var container = new ItemContainer(this.container.asLegacyContainer());
        this.clearContainer();
        this.selfDestroy();
        var tileEntity = TileEntity.addTileEntity(this.x, this.y, this.z, this.blockSource);
        tileEntity.container = container;
        Entity.setCarriedItem(player, 0, 0, 0);
    };
    AdvancedChestTE.prototype.tick = function () {
        StorageInterface.checkHoppers(this);
    };
    return AdvancedChestTE;
}(ChestTileEntity));
/// <reference path="./ChestTileEntity.js" />
Block.createSpecialType({
    base: 1,
    destroytime: 3,
    explosionres: 3,
    sound: "stone"
}, "iron_chest");
IDRegistry.genBlockID("copperChest");
Block.createBlockWithRotation("copperChest", [
    { name: "Copper Chest", texture: [["copper_chest", 0], ["copper_chest", 0], ["copper_chest", 2], ["copper_chest", 1], ["copper_chest", 2], ["copper_chest", 2]], inCreative: true }
], "iron_chest");
ToolAPI.registerBlockMaterial(BlockID.copperChest, "stone", 1, true);
Block.setDestroyLevel(BlockID.copperChest, 1, true);
CustomChest.setChestRender(BlockID.copperChest);
var guiCopperChest = CustomChest.createChestGui("Copper Chest", 45);
var CopperChestTE = /** @class */ (function (_super) {
    __extends(CopperChestTE, _super);
    function CopperChestTE() {
        return _super.call(this, guiCopperChest) || this;
    }
    CopperChestTE.prototype.click = function (id, count, data, coords, player, extra) {
        if (id == ItemID.copperIronUpgrade) {
            this.upgrade(BlockID.ironChest, player);
            return true;
        }
        if (id == ItemID.copperSilverUpgrade) {
            this.upgrade(BlockID.silverChest, player);
            return true;
        }
        return false;
    };
    return CopperChestTE;
}(AdvancedChestTE));
TileEntity.registerPrototype(BlockID.copperChest, new CopperChestTE());
StorageInterface.createInterface(BlockID.copperChest, {
    slots: {
        "slot^0-44": {
            input: true,
            output: true
        }
    }
});
IDRegistry.genBlockID("ironChest");
Block.createBlockWithRotation("ironChest", [
    { name: "Iron Chest", texture: [["iron_chest", 0], ["iron_chest", 0], ["iron_chest", 2], ["iron_chest", 1], ["iron_chest", 2], ["iron_chest", 2]], inCreative: true }
], "iron_chest");
ToolAPI.registerBlockMaterial(BlockID.ironChest, "stone", 1, true);
Block.setDestroyLevel(BlockID.ironChest, 1, true);
CustomChest.setChestRender(BlockID.ironChest);
var guiIronChest = CustomChest.createChestGui("Iron Chest", 54);
var IronChestTE = /** @class */ (function (_super) {
    __extends(IronChestTE, _super);
    function IronChestTE() {
        return _super.call(this, guiIronChest) || this;
    }
    IronChestTE.prototype.click = function (id, count, data, coords, player, extra) {
        if (id == ItemID.ironGoldUpgrade) {
            this.upgrade(BlockID.goldChest, player);
            return true;
        }
        return false;
    };
    return IronChestTE;
}(AdvancedChestTE));
TileEntity.registerPrototype(BlockID.ironChest, new IronChestTE());
StorageInterface.createInterface(BlockID.ironChest, {
    slots: {
        "slot^0-53": {
            input: true,
            output: true
        }
    }
});
IDRegistry.genBlockID("silverChest");
Block.createBlockWithRotation("silverChest", [
    { name: "Silver Chest", texture: [["silver_chest", 0], ["silver_chest", 0], ["silver_chest", 2], ["silver_chest", 1], ["silver_chest", 2], ["silver_chest", 2]], inCreative: true }
], "iron_chest");
ToolAPI.registerBlockMaterial(BlockID.silverChest, "stone", 1, true);
Block.setDestroyLevel(BlockID.silverChest, 1, true);
CustomChest.setChestRender(BlockID.silverChest);
var guiSilverChest = CustomChest.createChestGui("Silver Chest", 72);
var SilverChestTE = /** @class */ (function (_super) {
    __extends(SilverChestTE, _super);
    function SilverChestTE() {
        return _super.call(this, guiSilverChest) || this;
    }
    SilverChestTE.prototype.click = function (id, count, data, coords, player, extra) {
        if (id == ItemID.silverGoldUpgrade) {
            this.upgrade(BlockID.goldChest, player);
            return true;
        }
        return false;
    };
    return SilverChestTE;
}(AdvancedChestTE));
TileEntity.registerPrototype(BlockID.silverChest, new SilverChestTE());
StorageInterface.createInterface(BlockID.silverChest, {
    slots: {
        "slot^0-71": {
            input: true,
            output: true
        }
    }
});
IDRegistry.genBlockID("goldChest");
Block.createBlockWithRotation("goldChest", [
    { name: "Gold Chest", texture: [["gold_chest", 0], ["gold_chest", 0], ["gold_chest", 2], ["gold_chest", 1], ["gold_chest", 2], ["gold_chest", 2]], inCreative: true }
], "iron_chest");
ToolAPI.registerBlockMaterial(BlockID.goldChest, "stone", 1, true);
Block.setDestroyLevel(BlockID.goldChest, 1, true);
CustomChest.setChestRender(BlockID.goldChest);
var guiGoldChest = CustomChest.createChestGui("Gold Chest", 81);
var GoldChestTE = /** @class */ (function (_super) {
    __extends(GoldChestTE, _super);
    function GoldChestTE() {
        return _super.call(this, guiGoldChest) || this;
    }
    GoldChestTE.prototype.click = function (id, count, data, coords, player, extra) {
        if (id == ItemID.goldDiamondUpgrade) {
            this.upgrade(BlockID.diamondChest, player);
            return true;
        }
        return false;
    };
    return GoldChestTE;
}(AdvancedChestTE));
TileEntity.registerPrototype(BlockID.goldChest, new GoldChestTE());
StorageInterface.createInterface(BlockID.goldChest, {
    slots: {
        "slot^0-80": {
            input: true,
            output: true
        }
    }
});
IDRegistry.genBlockID("diamondChest");
Block.createBlockWithRotation("diamondChest", [
    { name: "Diamond Chest", texture: [["diamond_chest", 0], ["diamond_chest", 0], ["diamond_chest", 2], ["diamond_chest", 1], ["diamond_chest", 2], ["diamond_chest", 2]], inCreative: true }
], "iron_chest");
ToolAPI.registerBlockMaterial(BlockID.diamondChest, "stone", 1, true);
Block.setDestroyLevel(BlockID.diamondChest, 1, true);
CustomChest.setChestRender(BlockID.diamondChest);
var guiDiamondChest = CustomChest.createChestGui("Diamond Chest", 108);
var DiamondChestTE = /** @class */ (function (_super) {
    __extends(DiamondChestTE, _super);
    function DiamondChestTE() {
        return _super.call(this, guiDiamondChest) || this;
    }
    DiamondChestTE.prototype.click = function (id, count, data, coords, player, extra) {
        if (id == ItemID.diamondCrystalUpgrade) {
            this.upgrade(BlockID.crystalChest, player);
            return true;
        }
        if (id == ItemID.diamondObsidianUpgrade) {
            this.upgrade(BlockID.obsidianChest, player);
            return true;
        }
        return false;
    };
    return DiamondChestTE;
}(AdvancedChestTE));
TileEntity.registerPrototype(BlockID.diamondChest, new DiamondChestTE());
StorageInterface.createInterface(BlockID.diamondChest, {
    slots: {
        "slot^0-107": {
            input: true,
            output: true
        }
    }
});
IDRegistry.genBlockID("obsidianChest");
Block.createBlockWithRotation("obsidianChest", [
    { name: "Obsidian Chest", texture: [["obsidian_chest", 0], ["obsidian_chest", 0], ["obsidian_chest", 2], ["obsidian_chest", 1], ["obsidian_chest", 2], ["obsidian_chest", 2]], inCreative: true }
], {
    base: 1,
    destroytime: 3,
    explosionres: 10000,
    sound: "stone"
});
ToolAPI.registerBlockMaterial(BlockID.obsidianChest, "stone", 1, true);
Block.setDestroyLevel(BlockID.obsidianChest, 1, true);
CustomChest.setChestRender(BlockID.obsidianChest);
var guiObsidianChest = CustomChest.createChestGui("Obsidian Chest", 108);
var ObsidianChestTE = /** @class */ (function (_super) {
    __extends(ObsidianChestTE, _super);
    function ObsidianChestTE() {
        return _super.call(this, guiObsidianChest) || this;
    }
    return ObsidianChestTE;
}(AdvancedChestTE));
TileEntity.registerPrototype(BlockID.obsidianChest, new ObsidianChestTE());
StorageInterface.createInterface(BlockID.obsidianChest, {
    slots: {
        "slot^0-107": {
            input: true,
            output: true
        }
    }
});
IDRegistry.genBlockID("crystalChest");
Block.createBlockWithRotation("crystalChest", [
    { name: "Crystal Chest", texture: [["crystal_chest", 0], ["crystal_chest", 0], ["crystal_chest", 2], ["crystal_chest", 1], ["crystal_chest", 2], ["crystal_chest", 2]], inCreative: true }
], "iron_chest");
ToolAPI.registerBlockMaterial(BlockID.crystalChest, "stone", 1, true);
Block.setDestroyLevel(BlockID.crystalChest, 1, true);
CustomChest.setChestRender(BlockID.crystalChest);
var guiCrystalChest = CustomChest.createChestGui("Crystal Chest", 108);
var CrystalChestTE = /** @class */ (function (_super) {
    __extends(CrystalChestTE, _super);
    function CrystalChestTE() {
        return _super.call(this, guiCrystalChest) || this;
    }
    return CrystalChestTE;
}(AdvancedChestTE));
TileEntity.registerPrototype(BlockID.crystalChest, new CrystalChestTE());
StorageInterface.createInterface(BlockID.crystalChest, {
    slots: {
        "slot^0-107": {
            input: true,
            output: true
        }
    }
});
IDRegistry.genItemID("woodCopperUpgrade");
Item.createItem("woodCopperUpgrade", "Wood to Copper Chest Upgrade", { name: "wood_copper_upgrade" }, { stack: 1 });
IDRegistry.genItemID("woodIronUpgrade");
Item.createItem("woodIronUpgrade", "Wood to Iron Chest Upgrade", { name: "wood_iron_upgrade" }, { stack: 1 });
IDRegistry.genItemID("copperIronUpgrade");
Item.createItem("copperIronUpgrade", "Copper to Iron Chest Upgrade", { name: "copper_iron_upgrade" }, { stack: 1 });
IDRegistry.genItemID("copperSilverUpgrade");
Item.createItem("copperSilverUpgrade", "Copper to Silver Chest Upgrade", { name: "copper_silver_upgrade" }, { stack: 1 });
IDRegistry.genItemID("ironGoldUpgrade");
Item.createItem("ironGoldUpgrade", "Iron to Gold Chest Upgrade", { name: "iron_gold_upgrade" }, { stack: 1 });
IDRegistry.genItemID("silverGoldUpgrade");
Item.createItem("silverGoldUpgrade", "Silver to Gold Chest Upgrade", { name: "silver_gold_upgrade" }, { stack: 1 });
IDRegistry.genItemID("goldDiamondUpgrade");
Item.createItem("goldDiamondUpgrade", "Gold to Diamond Chest Upgrade", { name: "gold_diamond_upgrade" }, { stack: 1 });
IDRegistry.genItemID("diamondCrystalUpgrade");
Item.createItem("diamondCrystalUpgrade", "Diamond to Crystal Chest Upgrade", { name: "diamond_crystal_upgrade" }, { stack: 1 });
IDRegistry.genItemID("diamondObsidianUpgrade");
Item.createItem("diamondObsidianUpgrade", "Diamond to Obsidian Chest Upgrade", { name: "diamond_obsidian_upgrade" }, { stack: 1 });
function upgradeChest(x, y, z, player) {
    var region = BlockSource.getDefaultForActor(player);
    var item = Entity.getCarriedItem(player);
    var chestID;
    if (region.getBlockId(x, y, z) == 54) { // validation
        if (item.id == ItemID.woodCopperUpgrade) {
            chestID = BlockID.copperChest;
        }
        if (item.id == ItemID.woodIronUpgrade) {
            chestID = BlockID.ironChest;
        }
    }
    if (!chestID)
        return;
    // copy container
    var chest = region.getBlockEntity(x, y, z);
    var size = chest.getSize();
    if (size > 27)
        return;
    var container = new ItemContainer();
    for (var i = 0; i < size; i++) {
        var slot = chest.getSlot(i);
        container.setSlot("slot" + i, slot.id, slot.count, slot.data, slot.extra);
        chest.setSlot(i, 0, 0, 0);
    }
    // set block
    var rotation = (region.getBlockData(x, y, z) - 2) ^ 1;
    region.setBlock(x, y, z, chestID, rotation);
    var tileEntity = TileEntity.addTileEntity(x, y, z, region);
    tileEntity.container = container;
    // clear item in hand
    Entity.setCarriedItem(player, 0, 0, 0);
}
Callback.addCallback("ItemUseLocal", function (coords, item, block, player) {
    if (block.id == 54 && (item.id == ItemID.woodCopperUpgrade || item.id == ItemID.woodIronUpgrade)) {
        Network.sendToServer("IronChests.upgrade_wood_chest", { x: coords.x, y: coords.y, z: coords.z });
    }
});
Network.addServerPacket("IronChests.upgrade_wood_chest", function (client, data) {
    upgradeChest(data.x, data.y, data.z, client.getPlayerUid());
});
// Recipes
Callback.addCallback("PreLoaded", function () {
    // Chests
    if (ItemID.ingotCopper) {
        Recipes.addShaped({ id: BlockID.copperChest, count: 1, data: 0 }, [
            "xxx",
            "xax",
            "xxx"
        ], ['x', ItemID.ingotCopper, -1, 'a', 54, -1]);
    }
    Recipes.addShaped({ id: BlockID.ironChest, count: 1, data: 0 }, [
        "xxx",
        "xax",
        "xxx"
    ], ['x', 265, -1, 'a', 54, -1]);
    Recipes.addShaped({ id: BlockID.ironChest, count: 1, data: 0 }, [
        "xgx",
        "gag",
        "xgx"
    ], ['x', 265, -1, 'a', BlockID.copperChest, -1, 'g', 20, -1]);
    if (ItemID.ingotSilver) {
        Recipes.addShaped({ id: BlockID.silverChest, count: 1, data: 0 }, [
            "xxx",
            "xax",
            "xxx"
        ], ['x', ItemID.ingotSilver, -1, 'a', BlockID.copperChest, -1]);
        Recipes.addShaped({ id: BlockID.silverChest, count: 1, data: 0 }, [
            "xgx",
            "gag",
            "xgx"
        ], ['x', ItemID.ingotSilver, -1, 'a', BlockID.ironChest, -1, 'g', 20, -1]);
    }
    Recipes.addShaped({ id: BlockID.goldChest, count: 1, data: 0 }, [
        "xxx",
        "xax",
        "xxx"
    ], ['x', 266, -1, 'a', BlockID.ironChest, -1]);
    Recipes.addShaped({ id: BlockID.goldChest, count: 1, data: 0 }, [
        "xgx",
        "gag",
        "xgx"
    ], ['x', 266, -1, 'a', BlockID.silverChest, -1, 'g', 20, -1]);
    Recipes.addShaped({ id: BlockID.diamondChest, count: 1, data: 0 }, [
        "ggg",
        "xax",
        "ggg"
    ], ['x', 264, -1, 'a', BlockID.goldChest, -1, 'g', 20, -1]);
    Recipes.addShaped({ id: BlockID.diamondChest, count: 1, data: 0 }, [
        "ggg",
        "gag",
        "xxx"
    ], ['x', 264, -1, 'a', BlockID.silverChest, -1, 'g', 20, -1]);
    Recipes.addShaped({ id: BlockID.crystalChest, count: 1, data: 0 }, [
        "xxx",
        "xax",
        "xxx"
    ], ['x', 20, -1, 'a', BlockID.diamondChest, -1]);
    Recipes.addShaped({ id: BlockID.obsidianChest, count: 1, data: 0 }, [
        "xxx",
        "xax",
        "xxx"
    ], ['x', 49, -1, 'a', BlockID.diamondChest, -1]);
    // Upgrades
    if (ItemID.ingotCopper) {
        Recipes.addShaped({ id: ItemID.woodCopperUpgrade, count: 1, data: 0 }, [
            "xxx",
            "xax",
            "xxx"
        ], ['x', ItemID.ingotCopper, -1, 'a', 5, -1]);
        Recipes.addShaped({ id: ItemID.copperIronUpgrade, count: 1, data: 0 }, [
            "xgx",
            "gag",
            "xgx"
        ], ['x', 265, -1, 'a', ItemID.ingotCopper, -1, 'g', 20, -1]);
    }
    Recipes.addShaped({ id: ItemID.woodIronUpgrade, count: 1, data: 0 }, [
        "xxx",
        "xax",
        "xxx"
    ], ['x', 265, -1, 'a', 5, -1]);
    if (ItemID.ingotCopper && ItemID.ingotSilver) {
        Recipes.addShaped({ id: ItemID.copperSilverUpgrade, count: 1, data: 0 }, [
            "xxx",
            "xax",
            "xxx"
        ], ['x', ItemID.ingotSilver, -1, 'a', ItemID.ingotCopper, -1]);
    }
    Recipes.addShaped({ id: ItemID.ironGoldUpgrade, count: 1, data: 0 }, [
        "xxx",
        "xax",
        "xxx"
    ], ['x', 266, -1, 'a', 265, -1]);
    if (ItemID.ingotSilver) {
        Recipes.addShaped({ id: ItemID.silverGoldUpgrade, count: 1, data: 0 }, [
            "xgx",
            "gag",
            "xgx"
        ], ['x', 266, -1, 'a', ItemID.ingotSilver, -1, 'g', 20, -1]);
    }
    Recipes.addShaped({ id: ItemID.goldDiamondUpgrade, count: 1, data: 0 }, [
        "ggg",
        "xax",
        "ggg"
    ], ['x', 264, -1, 'a', 266, -1, 'g', 20, -1]);
    Recipes.addShaped({ id: ItemID.diamondCrystalUpgrade, count: 1, data: 0 }, [
        "xxx",
        "xax",
        "xxx"
    ], ['x', 20, -1, 'a', 49, -1]);
    Recipes.addShaped({ id: ItemID.diamondObsidianUpgrade, count: 1, data: 0 }, [
        "xxx",
        "xax",
        "xxx"
    ], ['x', 49, -1, 'a', 20, -1]);
});
