IMPORT("ToolType");
IMPORT("ToolLib");
IMPORT("BaublesAPI");
//baublefunctions
Baubles.registerBauble({
    id: ItemID.goldanklets,
    type: "charm",
    onEquip: function () {
        Entity.addEffect(Player.get(), Native.PotionEffect.movementSpeed, 1, 9999999999, false, false)
    },

    onTakeOff: function () {
        Entity.clearEffect(Player.get(), 1);
    }
});

Baubles.registerBauble({
    id: ItemID.diamondanklets,
    type: "charm",
    onEquip: function () {
        Entity.addEffect(Player.get(), Native.PotionEffect.movementSpeed, 2, 9999999999, false, false)
    },

    onTakeOff: function () {
        Entity.clearEffect(Player.get(), 1);
    }
});

Baubles.registerBauble({
    id: ItemID.rubyanklets,
    type: "charm",
    onEquip: function () {
        Entity.addEffect(Player.get(), Native.PotionEffect.movementSpeed, 3, 9999999999, false, false)
    },

    onTakeOff: function () {
        Entity.clearEffect(Player.get(), 1);
    }
});

Baubles.registerBauble({
    id: ItemID.saphireanklets,
    type: "charm",
    onEquip: function () {
        Entity.addEffect(Player.get(), Native.PotionEffect.movementSpeed, 3, 9999999999, false, false)
    },

    onTakeOff: function () {
        Entity.clearEffect(Player.get(), 1);
    }
});

Baubles.registerBauble({
    id: ItemID.goldnecklace,
    type: "amulet",
    onEquip: function () {
        Entity.addEffect(Player.get(), Native.PotionEffect.healthBoost, 1, 9999999999, false, false)
    },

    onTakeOff: function () {
        Entity.clearEffect(Player.get(), 21);
    }
});

Baubles.registerBauble({
    id: ItemID.diamondnecklace,
    type: "amulet",
    onEquip: function () {
        Entity.addEffect(Player.get(), Native.PotionEffect.healthBoost, 2, 9999999999, false, false)
    },

    onTakeOff: function () {
        Entity.clearEffect(Player.get(), 21);
    }
});

Baubles.registerBauble({
    id: ItemID.rubynecklace,
    type: "amulet",
    onEquip: function () {
        Entity.addEffect(Player.get(), Native.PotionEffect.healthBoost, 3, 9999999999, false, false)
    },

    onTakeOff: function () {
        Entity.clearEffect(Player.get(), 21);
    }
});

Baubles.registerBauble({
    id: ItemID.saphirenecklace,
    type: "amulet",
    onEquip: function () {
        Entity.addEffect(Player.get(), Native.PotionEffect.healthBoost, 3, 9999999999, false, false)
    },

    onTakeOff: function () {
        Entity.clearEffect(Player.get(), 21);
    }
});

Baubles.registerBauble({
    id: ItemID.goldcrown,
    type: "head",
    onEquip: function () {
        Entity.addEffect(Player.get(), Native.PotionEffect.waterBreathing, 1, 9999999999, false, false)
    },

    onTakeOff: function () {
        Entity.clearEffect(Player.get(), 13);
    }
});


Baubles.registerBauble({
    id: ItemID.diamondcrown,
    type: "head",
    onEquip: function () {
        Entity.addEffect(Player.get(), Native.PotionEffect.waterBreathing, 2, 99999999, false, false)
    },

    onTakeOff: function () {
        Entity.clearEffect(Player.get(), 13);
    }
});

Baubles.registerBauble({
    id: ItemID.rubycrown,
    type: "head",
    onEquip: function () {
        Entity.addEffect(Player.get(), Native.PotionEffect.waterBreathing, 3, 99999999, false, false)
    },

    onTakeOff: function () {
        Entity.clearEffect(Player.get(), 13);
    }
});

Baubles.registerBauble({
    id: ItemID.saphirecrown,
    type: "head",
    onEquip: function () {
        Entity.addEffect(Player.get(), Native.PotionEffect.waterBreathing, 3, 99999999, false, false)
    },

    onTakeOff: function () {
        Entity.clearEffect(Player.get(), 13);
    }
});

Baubles.registerBauble({
    id: ItemID.goldring,
    type: "ring",
    onEquip: function () {
        Entity.addEffect(Player.get(), Native.PotionEffect.regeneration, 1, 9999999999, false, false)
    },

    onTakeOff: function () {
        Entity.clearEffect(Player.get(), 10);
    }
});

Baubles.registerBauble({
    id: ItemID.diamondring,
    type: "ring",
    onEquip: function () {
        Entity.addEffect(Player.get(), Native.PotionEffect.regeneration, 2, 99999999, false, false)
    },

    onTakeOff: function () {
        Entity.clearEffect(Player.get(), 10);
    }
});

Baubles.registerBauble({
    id: ItemID.rubyring,
    type: "ring",
    onEquip: function () {
        Entity.addEffect(Player.get(), Native.PotionEffect.regeneration, 3, 99999999, false, false)
    },

    onTakeOff: function () {
        Entity.clearEffect(Player.get(), 10);
    }
});

Baubles.registerBauble({
    id: ItemID.saphirering,
    type: "ring",
    onEquip: function () {
        Entity.addEffect(Player.get(), Native.PotionEffect.regeneration, 3, 99999999, false, false)
    },

    onTakeOff: function () {
        Entity.clearEffect(Player.get(), 10);
    }
});

Baubles.registerBauble({
    id: ItemID.specialanklets,
    type: "charm",
    onEquip: function () {
        Entity.addEffect(Player.get(), Native.PotionEffect.saturation, 2, 99999999, false, false)
    },

    onTakeOff: function () {
        Entity.clearEffect(Player.get(), 23);
    }
});


Baubles.registerBauble({
    id: ItemID.goldshinguard,
    type: "body",
    onEquip: function () {
        Entity.addEffect(Player.get(), Native.PotionEffect.damageBoost, 1, 9999999999, false, false)
    },

    onTakeOff: function () {
        Entity.clearEffect(Player.get(), 5);
    }
});


Baubles.registerBauble({
    id: ItemID.diamondshinguard,
    type: "body",
    onEquip: function () {
        Entity.addEffect(Player.get(), Native.PotionEffect.damageBoost, 2, 9999999999, false, false)
    },

    onTakeOff: function () {
        Entity.clearEffect(Player.get(), 5);
    }
});

Baubles.registerBauble({
    id: ItemID.rubyshinguard,
    type: "body",
    onEquip: function () {
        Entity.addEffect(Player.get(), Native.PotionEffect.damageBoost, 3, 9999999999, false, false)
    },

    onTakeOff: function () {
        Entity.clearEffect(Player.get(), 5);
    }
});

Baubles.registerBauble({
    id: ItemID.saphireshinguard,
    type: "body",
    onEquip: function () {
        Entity.addEffect(Player.get(), Native.PotionEffect.damageBoost, 3, 9999999999, false, false)
    },

    onTakeOff: function () {
        Entity.clearEffect(Player.get(), 5);
    }
});

Baubles.registerBauble({
    id: ItemID.specialcrown,
    type: "head",
    onEquip: function () {
        Entity.addEffect(Player.get(), Native.PotionEffect.movementSpeed, 6, 99999999, false, false)
    },

    onTakeOff: function () {
        Entity.clearEffect(Player.get(), 1);
    }
});

Baubles.registerBauble({
    id: ItemID.specialnecklace,
    type: "amulet",
    onEquip: function () {
        Entity.addEffect(Player.get(), Native.PotionEffect.fireResistance, 1, 99999999, false, false)
    },

    onTakeOff: function () {
        Entity.clearEffect(Player.get(), 12);
    }
});

Baubles.registerBauble({
    id: ItemID.specialshinguard,
    type: "body",
    onEquip: function () {
        Entity.addEffect(Player.get(), Native.PotionEffect.damageResistance, 4, 99999999, false, false)
    },

    onTakeOff: function () {
        Entity.clearEffect(Player.get(), 11);
    }
});

Baubles.registerBauble({
    id: ItemID.specialring,
    type: "ring",
    onEquip: function () {
        Entity.addEffect(Player.get(), Native.PotionEffect.nightVision, 1, 99999999, false, false)
    },

    onTakeOff: function () {
        Entity.clearEffect(Player.get(), 3);
    }
});

Baubles.registerBauble({
    id: ItemID.specialring2,
    type: "ring",
    onEquip: function () {
        Entity.addEffect(Player.get(), Native.PotionEffect.invisibility, 1, 99999999, false, false)
    },

    onTakeOff: function () {
        Entity.clearEffect(Player.get(), 14);
    }
});
//id:gemnstuff
IDRegistry.genItemID("magicessence");
IDRegistry.genItemID("saphiregem");
IDRegistry.genItemID("rubygem");
IDRegistry.genItemID("silveringot");
//id:generalbaubles
IDRegistry.genItemID("ironanklets");
IDRegistry.genItemID("ironnecklace");
IDRegistry.genItemID("ironcrown");
IDRegistry.genItemID("ironshinguard");
IDRegistry.genItemID("ironring");
IDRegistry.genItemID("goldanklets");
IDRegistry.genItemID("goldnecklace");
IDRegistry.genItemID("goldcrown");
IDRegistry.genItemID("goldshinguard");
IDRegistry.genItemID("goldring");
IDRegistry.genItemID("saphireanklets");
IDRegistry.genItemID("saphirenecklace");
IDRegistry.genItemID("saphirecrown");
IDRegistry.genItemID("saphireshinguard");
IDRegistry.genItemID("saphirering");
IDRegistry.genItemID("rubyanklets");
IDRegistry.genItemID("rubynecklace");
IDRegistry.genItemID("rubycrown");
IDRegistry.genItemID("rubyshinguard");
IDRegistry.genItemID("rubyring");
IDRegistry.genItemID("diamondanklets");
IDRegistry.genItemID("diamondnecklace");
IDRegistry.genItemID("diamondcrown");
IDRegistry.genItemID("diamondshinguard");
IDRegistry.genItemID("diamondring");
IDRegistry.genItemID("silveranklets");
IDRegistry.genItemID("silvernecklace");
IDRegistry.genItemID("silvercrown");
IDRegistry.genItemID("silvershinguard");
IDRegistry.genItemID("silverring");
//id:epicbaubles
IDRegistry.genItemID("specialanklets");
IDRegistry.genItemID("specialnecklace");
IDRegistry.genItemID("specialcrown");
IDRegistry.genItemID("specialshinguard");
IDRegistry.genItemID("specialring");
IDRegistry.genItemID("specialring2");
//items:gems
Item.createItem ("magicessence", "Essence", {name: "magic_essence", meta: 0}, {stack: 64});
Item.createItem ("saphiregem", "Saphire", {name: "saphire_gem", meta: 0}, {stack: 64});
Item.createItem ("rubygem", "Ruby", {name: "ruby_gem", meta: 0}, {stack: 64});
//items:baubles/gold
Item.createItem ("goldanklets", "Gold Bracelets", {name: "gold_anklets", meta: 0}, {stack: 1});
Item.createItem ("goldnecklace", "Gold Necklace", {name: "gold_necklace", meta: 0}, {stack: 1});
Item.createItem ("goldcrown", "Gold Crown", {name: "gold_crown", meta: 0}, {stack: 1});
Item.createItem ("goldshinguard", "Gold Wristbands", {name: "gold_shinguards", meta: 0}, {stack: 1});
Item.createItem ("goldring", "Gold Ring", {name: "gold_ring", meta: 0}, {stack: 1});
//items:baubles/diamond
Item.createItem ("diamondanklets", "Diamond Bracelets", {name: "diamond_anklets", meta: 0}, {stack: 1});
Item.createItem ("diamondnecklace", "Diamond Necklace", {name: "diamond_necklace", meta: 0}, {stack: 1});
Item.createItem ("diamondcrown", "Diamond Crown", {name: "diamond_crown", meta: 0}, {stack: 1});
Item.createItem ("diamondshinguard", "Diamond Wristbands", {name: "diamond_shinguards", meta: 0}, {stack: 1});
Item.createItem ("diamondring", "Diamond Ring", {name: "diamond_ring", meta: 0}, {stack: 1});
//items:baubles/ruby
Item.createItem ("rubyanklets", "Ruby Bracelets", {name: "ruby_anklets", meta: 0}, {stack: 1});
Item.createItem ("rubycrown", "Ruby Crown", {name: "ruby_crown", meta: 0}, {stack: 1});
Item.createItem ("rubynecklace", "Ruby Necklace", {name: "ruby_necklace", meta: 0}, {stack: 1});
Item.createItem ("rubyshinguard", "Ruby Wristbands", {name: "ruby_shinguards", meta: 0}, {stack: 1});
Item.createItem ("rubyring", "Ruby Ring", {name: "ruby_ring", meta: 0}, {stack: 1});
//items:baubles/saphire
Item.createItem ("saphireanklets", "Saphire Bracelets", {name: "saphire_anklets", meta: 0}, {stack: 1});
Item.createItem ("saphirecrown", "Saphire Crown", {name: "saphire_crown", meta: 0}, {stack: 1});
Item.createItem ("saphirenecklace", "Saphire Necklace", {name: "saphire_necklace", meta: 0}, {stack: 1});
Item.createItem ("saphireshinguard", "Saphire Wristbands", {name: "saphire_shinguards", meta: 0}, {stack: 1});
Item.createItem ("saphirering", "Saphire Ring", {name: "saphire_ring", meta: 0}, {stack: 1});
//items:baubles/legendary
Item.createItem ("specialanklets", "Zombie's Bracelets", {name: "special_anklets", meta: 0}, {stack: 1});
Item.createItem ("specialcrown", "Wither's Crown", {name: "special_crown", meta: 0}, {stack: 1});
Item.createItem ("specialnecklace", "Blaze's Necklace", {name: "special_necklace", meta: 0}, {stack: 1});
Item.createItem ("specialshinguard", "Golem's Wristbands", {name: "special_shinguards", meta: 0}, {stack: 1});
Item.createItem ("specialring", "Villager Ring", {name: "special_ring", meta: 0}, {stack: 1});
Item.createItem ("specialring2", "Withch's Ring", {name: "special_ring2", meta: 0}, {stack: 1});
//recipes:miscelaneous
Recipes.addShaped({id: ItemID.magicessence, count: 2, data: 0}, 
[" b ", 
 "aca",
 " b "],
["a", 377, 0, "b", 368, 0, "c", 1, 6]);
Recipes.addShaped({id: ItemID.rubygem, count: 1, data: 0}, 
[" b ", 
 "   ",
 " a "],
["a", 388, 0, "b", ItemID.magicessence, 0]);
Recipes.addShaped({id: ItemID.saphiregem, count: 1, data: 0}, 
[" b ", 
 "   ",
 " a "],
["a", 264, 0, "b", ItemID.magicessence, 0]);
//recipes:baubles:gold
Recipes.addShaped({id: ItemID.goldanklets, count: 1, data: 0}, 
["cac", 
 "b b",
 "a a"],
["a", 287, 0, "b", 266, 0, "c", ItemID.magicessence, 0]);
Recipes.addShaped({id: ItemID.goldnecklace, count: 1, data: 0}, 
["cac", 
 "b b",
 "bbb"],
["a", 287, 0, "b", 266, 0, "c", ItemID.magicessence, 0]);
Recipes.addShaped({id: ItemID.goldcrown, count: 1, data: 0}, 
["b b", 
 "aaa",
 " c "],
["a", 287, 0, "b", 266, 0, "c", ItemID.magicessence, 0]);
Recipes.addShaped({id: ItemID.goldshinguard, count: 1, data: 0}, 
["cac", 
 "b b",
 "aaa"],
["a", 287, 0, "b", 266, 0, "c", ItemID.magicessence, 0]);
Recipes.addShaped({id: ItemID.goldring, count: 1, data: 0}, 
["bbb", 
 "bab",
 "bbb"],
["a", ItemID.magicessence, 0, "b", 266, 0]);
//recipes:baubles:diamond
Recipes.addShaped({id: ItemID.diamondanklets, count: 1, data: 0}, 
["cac", 
 "b b",
 "a a"],
["a", 287, 0, "b", 264, 0, "c", ItemID.magicessence, 0]);
Recipes.addShaped({id: ItemID.diamondnecklace, count: 1, data: 0}, 
["cac", 
 "b b",
 "bbb"],
["a", 287, 0, "b", 264, 0, "c", ItemID.magicessence, 0]);
Recipes.addShaped({id: ItemID.diamondcrown, count: 1, data: 0}, 
["b b", 
 "aaa",
 " c "],
["a", 287, 0, "b", 264, 0, "c", ItemID.magicessence, 0]);
Recipes.addShaped({id: ItemID.diamondshinguard, count: 1, data: 0}, 
["cac", 
 "b b",
 "aaa"],
["a", 287, 0, "b", 264, 0, "c", ItemID.magicessence, 0]);
Recipes.addShaped({id: ItemID.diamondring, count: 1, data: 0}, 
["bbb", 
 "bab",
 "bbb"],
["a", ItemID.magicessence, 0, "b", 264, 0]);
//recipes:baubles:ruby
Recipes.addShaped({id: ItemID.rubyanklets, count: 1, data: 0}, 
["cac", 
 "b b",
 "a a"],
["a", 287, 0, "b", ItemID.rubygem, 0, "c", ItemID.magicessence, 0]);
Recipes.addShaped({id: ItemID.rubynecklace, count: 1, data: 0}, 
["cac", 
 "b b",
 "bbb"],
["a", 287, 0, "b", ItemID.rubygem, 0, "c", ItemID.magicessence, 0]);
Recipes.addShaped({id: ItemID.rubycrown, count: 1, data: 0}, 
["b b", 
 "aaa",
 " c "],
["a", 287, 0, "b", ItemID.rubygem, 0, "c", ItemID.magicessence, 0]);
Recipes.addShaped({id: ItemID.rubyshinguard, count: 1, data: 0}, 
["cac", 
 "b b",
 "aaa"],
["a", 287, 0, "b", ItemID.rubygem, 0, "c", ItemID.magicessence, 0]);
Recipes.addShaped({id: ItemID.rubyring, count: 1, data: 0}, 
["bbb", 
 "bab",
 "bbb"],
["a", ItemID.magicessence, 0, "b", ItemID.rubygem, 0]);
//recipes:baubles:saphire
Recipes.addShaped({id: ItemID.saphireanklets, count: 1, data: 0}, 
["cac", 
 "b b",
 "a a"],
["a", 287, 0, "b", ItemID.saphiregem, 0, "c", ItemID.magicessence, 0]);
Recipes.addShaped({id: ItemID.saphirenecklace, count: 1, data: 0}, 
["cac", 
 "b b",
 "bbb"],
["a", 287, 0, "b", ItemID.saphiregem, 0, "c", ItemID.magicessence, 0]);
Recipes.addShaped({id: ItemID.saphirecrown, count: 1, data: 0}, 
["b b", 
 "aaa",
 " c "],
["a", 287, 0, "b", ItemID.saphiregem, 0, "c", ItemID.magicessence, 0]);
Recipes.addShaped({id: ItemID.saphireshinguard, count: 1, data: 0}, 
["cac", 
 "b b",
 "aaa"],
["a", 287, 0, "b", ItemID.saphiregem, 0, "c", ItemID.magicessence, 0]);
Recipes.addShaped({id: ItemID.saphirering, count: 1, data: 0}, 
["bbb", 
 "bab",
 "bbb"],
["a", ItemID.magicessence, 0, "b", ItemID.saphiregem, 0]);
//recipes:baubles:special
Recipes.addShaped({id: ItemID.specialcrown, count: 1, data: 0}, 
[" b ", 
 "bab",
 " b "],
["a", ItemID.diamondshinguard, 0, "b", ItemID.magicessence, 0]);
Recipes.addShaped({id: ItemID.specialanklets, count: 1, data: 0}, 
[" b ", 
 "bab",
 " b "],
["a", ItemID.diamondanklets, 0, "b", ItemID.magicessence, 0]);
Recipes.addShaped({id: ItemID.specialnecklace, count: 1, data: 0}, 
[" b ", 
 "bab",
 " b "],
["a", ItemID.diamondnecklace, 0, "b", ItemID.magicessence, 0]);
Recipes.addShaped({id: ItemID.specialshinguard, count: 1, data: 0}, 
[" b ", 
 "bab",
 " b "],
["a", ItemID.diamondshinguard, 0, "b", ItemID.magicessence, 0]);
Recipes.addShaped({id: ItemID.specialring, count: 1, data: 0}, 
[" b ", 
 "bab",
 " b "],
["a", ItemID.diamondring, 0, "b", ItemID.magicessence, 0]);
Recipes.addShaped({id: ItemID.specialring2, count: 1, data: 0}, 
[" b ", 
 "bab",
 " b "],
["a", ItemID.diamondring, 0, "b", ItemID.magicessence, 0]);