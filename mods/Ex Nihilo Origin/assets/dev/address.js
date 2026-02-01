Callback.addCallback("NativeGuiChanged", function(name) {
    if (name == "toast_screen") {
        Game.message(Translation.translate("§fMany new items have been added to the game, \nand the acquisition methods of these items should also be added in this mod. \nIf you have any reasonable suggestions, \nplease send them to the email"));
        Game.message(Translation.translate("§3Ex Nihilo Rebirth has now been renamed Ex Nihilo Origin"));
        Game.message(Translation.translate("§9Ex Nihilo Origin version: " + ExNihiloOriginVERSION));
        Game.message(Translation.translate("§6This version is not the final version. \nIf you find bugs, please send detailed information to \n3022504358@qq.com or 2584300846@qq.com"));
        Game.message(Translation.translate("§3If you can provide us with translation or texture, please also send it to email"));
    }
});
Translation.addTranslation("§3Ex Nihilo Rebirth has now been renamed Ex Nihilo Origin", {
    zh: "§3无中生有·重生 现已，更名为 无中生有·起源",
    en: "§3Ex Nihilo Rebirth has now been renamed Ex Nihilo Origin"
})
Translation.addTranslation("§9Ex Nihilo Origin version: " + ExNihiloOriginVERSION, {
    zh: "§9无中生有·起源 版本：" + ExNihiloOriginVERSION,
    en: "§9Ex Nihilo Origin version: " + ExNihiloOriginVERSION
})
Translation.addTranslation("§6This version is not the final version. \nIf you find bugs, please send detailed information to \n3022504358@qq.com or 2584300846@qq.com", {
    zh: "§6本版本非最终版本，\n如果你发现了bug，请讲详情信息发送到 \n3022504358@qq.com 或 2584300846@qq.com",
    en: "§6This version is not the final version. \nIf you find bugs, please send detailed information to \n3022504358@qq.com or 2584300846@qq.com"
})
Translation.addTranslation("§3If you can provide us with translation or texture, please also send it to email", {
    zh: "§3如果你可以为我们提供翻译或者是材质，也请发送到邮箱",
    en: "§3If you can provide us with translation or texture, please also send it to email."
})
Translation.addTranslation("§fMany new items have been added to the game, \nand the acquisition methods of these items should also be added in this mod. \nIf you have any reasonable suggestions, \nplease send them to the email", {
    zh: "§3游戏中增添了许多新的物品，\n本模组也应当添加这些物品的获取方式，\n如果你有什么合理的建议的话，\n请发送到邮箱",
    en: "§3Many new items have been added to the game, \nand the acquisition methods of these items should also be added in this mod. \nIf you have any reasonable suggestions, \nplease send them to the email"
})