/**
 * An item object, containing various different properties
 * @typedef {Object} ItemObject
 * @property {string} item_type - Item category
 * @property {string} classification - Simple, Martial, Exotic, etc.
 * @property {string} name - Item name, as listed in PRD
 * @property {string} [alt_name] - Item name, alternate
 * @property {string} [cost] - Item cost, as listed
 * @property {string} [amount] - Amount per cost
 * @property {string} [damage_small] - Damage dealt when wielded by Small character
 * @property {string} [damage_medium] - Damage dealt when wielded by Medium character
 * @property {string} [critical_range] - Critical threat range
 * @property {number} [critical_multiplier] - Critical damage multiplier
 * @property {number} [range] - Range of weapon, as a number. 'ft.' will be appended where appropriate.
 * @property {number|string} [weight] - Weight of weapon, as a number. 'lb.' or 'lbs.' will be appended where appropriate.
 * @property {string} [damage_type] - String describing the type of damage dealt
 * @property {Array.<string>} [special] - Array containing special qualities of the weapon
 */

let ItemDataSet = [];
let CoreRulebookSet = [
    // ********
    // CORE RULEBOOK WEAPONS
    // ********
    // ****
    // SIMPLE WEAPONS
    // ****
    // Unarmed
    // WARNING: Gauntlet was altered in PF:UE to be considered a light weapon
    // {
    //     item_type: "Unarmed",
    //     classification: "Simple",
    //     name: "Gauntlet",
    //     cost: "2 gp",
    //     damage_small: "1d2",
    //     damage_medium: "1d3",
    //     critical_multiplier: 2,
    //     weight: 1,
    //     damage_type: "B",
    // },
    {
        item_type: "Unarmed",
        classification: "Simple",
        name: "Unarmed strike",
        damage_small: "1d2",
        damage_medium: "1d3",
        critical_multiplier: 2,
        damage_type: "B",
        special: ["nonlethal",]
    },
    // Light
    {
        item_type: "Light",
        classification: "Simple",
        name: "Dagger",
        cost: "2 gp",
        damage_small: "1d3",
        damage_medium: "1d4",
        critical_range: "19-20",
        critical_multiplier: 2,
        range: 10,
        weight: 1,
        damage_type: "P or S"
    },
    {
        item_type: "Light",
        classification: "Simple",
        name: "Dagger, punching",
        alt_name: "Punching dagger",
        cost: "2 gp",
        damage_small: "1d3",
        damage_medium: "1d4",
        critical_multiplier: 3,
        weight: 1,
        damage_type: "P"
    },
    {
        item_type: "Light",
        classification: "Simple",
        name: "Gauntlet, spiked",
        alt_name: "Spiked gauntlet",
        cost: "5 gp",
        damage_small: "1d3",
        damage_medium: "1d4",
        critical_multiplier: 2,
        weight: 1,
        damage_type: "P"
    },
    {
        item_type: "Light",
        classification: "Simple",
        name: "Mace, light",
        alt_name: "Light mace",
        cost: "5 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_multiplier: 2,
        weight: 4,
        damage_type: "B",
    },
    {
        item_type: "Light",
        classification: "Simple",
        name: "Sickle",
        cost: "6 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_multiplier: 2,
        weight: 2,
        damage_type: "S",
        special: ["trip",]
    },
    // One-handed
    {
        item_type: "One-handed",
        classification: "Simple",
        name: "Club",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_multiplier: 2,
        range: 10,
        weight: 3,
        damage_type: "B"
    },
    {
        item_type: "One-handed",
        classification: "Simple",
        name: "Mace, heavy",
        alt_name: "Heavy mace",
        cost: "12 gp",
        damage_small: "1d6",
        damage_medium: "1d8",
        critical_multiplier: 2,
        weight: 8,
        damage_type: "B"
    },
    {
        item_type: "One-handed",
        classification: "Simple",
        name: "Morningstar",
        cost: "8 gp",
        damage_small: "1d6",
        damage_medium: "1d8",
        critical_multiplier: 2,
        weight: 6,
        damage_type: "B and P"
    },
    {
        item_type: "One-handed",
        classification: "Simple",
        name: "Shortspear",
        cost: "1 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_multiplier: 2,
        range: 20,
        weight: 3,
        damage_type: "P"
    },
    // Two-handed
    {
        item_type: "Two-handed",
        classification: "Simple",
        name: "Longspear",
        cost: "5 gp",
        damage_small: "1d6",
        damage_medium: "1d8",
        critical_multiplier: 3,
        weight: 9,
        damage_type: "P",
        special: ["brace", "reach"]
    },
    {
        item_type: "Two-handed",
        classification: "Simple",
        name: "Quarterstaff",
        damage_small: "1d4/1d4",
        damage_medium: "1d6/1d6",
        critical_multiplier: 2,
        weight: 4,
        damage_type: "B",
        special: ["double", "monk",]
    },
    {
        item_type: "Two-handed",
        classification: "Simple",
        name: "Spear",
        cost: "2 gp",
        damage_small: "1d6",
        damage_medium: "1d8",
        critical_multiplier: 3,
        range: 20,
        weight: 6,
        damage_type: "P",
        special: ["brace",]
    },
    // Ranged
    {
        item_type: "Ranged",
        classification: "Simple",
        name: "Blowgun",
        cost: "2 gp",
        damage_small: "1",
        damage_medium: "1d2",
        critical_multiplier: 2,
        range: 20,
        weight: 1,
        damage_type: "P"
    },
    {
        item_type: "Ammunition",
        classification: "Simple",
        name: "Darts, blowgun",
        alt_name: "Blowgun darts",
        cost: "5 sp",
        amount: "10"
    },
    {
        item_type: "Ranged",
        classification: "Simple",
        name: "Crossbow, heavy",
        alt_name: "Heavy crossbow",
        cost: "50 gp",
        damage_small: "1d8",
        damage_medium: "1d10",
        critical_range: "19-20",
        critical_multiplier: 2,
        range: 120,
        weight: 8,
        damage_type: "P"
    },
    {
        item_type: "Ammunition",
        classification: "Simple",
        name: "Bolts, crossbow",
        alt_name: "Crossbow bolts",
        cost: "1 gp",
        amount: "10",
        weight: 1
    },
    {
        item_type: "Ranged",
        classification: "Simple",
        name: "Crossbow, light",
        alt_name: "Light crossbow",
        cost: "35 gp",
        damage_small: "1d6",
        damage_medium: "1d8",
        critical_range: "19-20",
        critical_multiplier: 2,
        range: 80,
        weight: 4,
        damage_type: "P"
    },
    {
        item_type: "Ranged",
        classification: "Simple",
        name: "Dart",
        cost: "5 sp",
        damage_small: "1d3",
        damage_medium: "1d4",
        critical_multiplier: 2,
        range: 20,
        weight: 0.5,
        damage_type: "P"
    },
    {
        item_type: "Ranged",
        classification: "Simple",
        name: "Javelin",
        cost: "1 gp",
        damage_small: "1d3",
        damage_medium: "1d4",
        critical_multiplier: 2,
        range: 30,
        weight: 2,
        damage_type: "P"
    },
    {
        item_type: "Ranged",
        classification: "Simple",
        name: "Sling",
        damage_small: "1d3",
        damage_medium: "1d4",
        critical_multiplier: 2,
        range: 50,
        damage_type: "B"
    },
    {
        item_type: "Ammunition",
        classification: "Simple",
        name: "Bullets, sling",
        alt_name: "Sling bullets",
        cost: "1 sp",
        amount: "10",
        weight: 5
    },
    // ****
    // MARTIAL WEAPONS
    // ****
    // Unarmed
    // Light
    {
        item_type: "Light",
        classification: "Martial",
        name: "Axe, throwing",
        alt_name: "Throwing axe",
        cost: "8 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_multiplier: 2,
        range: 10,
        weight: 2,
        damage_type: "S"
    },
    {
        item_type: "Light",
        classification: "Martial",
        name: "Hammer, light",
        alt_name: "Light hammer",
        cost: "1 gp",
        damage_small: "1d3",
        damage_medium: "1d4",
        critical_multiplier: 2,
        range: 20,
        weight: 2,
        damage_type: "B"
    },
    {
        item_type: "Light",
        classification: "Martial",
        name: "Handaxe",
        cost: "6 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_multiplier: 3,
        weight: 3,
        damage_type: "S"
    },
    {
        item_type: "Light",
        classification: "Martial",
        name: "Kukri",
        cost: "8 gp",
        damage_small: "1d3",
        damage_medium: "1d4",
        critical_range: "18-20",
        critical_multiplier: 2,
        weight: 2,
        damage_type: "S"
    },
    {
        item_type: "Light",
        classification: "Martial",
        name: "Pick, light",
        alt_name: "Light pick",
        cost: "4 gp",
        damage_small: "1d3",
        damage_medium: "1d4",
        critical_multiplier: 4,
        weight: 3,
        damage_type: "P",
    },
    {
        item_type: "Light",
        classification: "Martial",
        name: "Sap",
        cost: "1 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_multiplier: 2,
        weight: 2,
        damage_type: "B",
        special: ["nonlethal",]
    },
    {
        item_type: "Light",
        classification: "Martial",
        name: "Shield, light",
        alt_name: "Light shield",
        cost: "special",
        damage_small: "1d2",
        damage_medium: "1d3",
        critical_multiplier: 2,
        weight: "special",
        damage_type: "B"
    },
    {
        item_type: "Light",
        classification: "Martial",
        name: "Spiked armor",
        cost: "special",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_multiplier: 2,
        weight: "special",
        damage_type: "P"
    },
    {
        item_type: "Light",
        classification: "Martial",
        name: "Spiked shield, light",
        alt_name: "Light spiked shield",
        cost: "special",
        damage_small: "1d3",
        damage_medium: "1d4",
        critical_multiplier: 2,
        weight: "special",
        damage_type: "P"
    },
    {
        item_type: "Light",
        classification: "Martial",
        name: "Starknife",
        cost: "24 gp",
        damage_small: "1d3",
        damage_medium: "1d4",
        critical_multiplier: 3,
        range: 20,
        weight: 3,
        damage_type: "P"
    },
    {
        item_type: "Light",
        classification: "Martial",
        name: "Sword, short",
        alt_name: "Short sword",
        cost: "10 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_range: "19-20",
        critical_multiplier: 2,
        weight: 2,
        damage_type: "P"
    },
    // One-handed
    {
        item_type: "One-handed",
        classification: "Martial",
        name: "Battleaxe",
        cost: "10 gp",
        damage_small: "1d6",
        damage_medium: "1d8",
        critical_multiplier: 3,
        weight: 6,
        damage_type: "S"
    },
    {
        item_type: "One-handed",
        classification: "Martial",
        name: "Flail",
        cost: "8 gp",
        damage_small: "1d6",
        damage_medium: "1d8",
        critical_multiplier: 2,
        weight: 5,
        damage_type: "B",
        special: ["disarm", "trip",]
    },
    {
        item_type: "One-handed",
        classification: "Martial",
        name: "Longsword",
        cost: "15 gp",
        damage_small: "1d6",
        damage_medium: "1d8",
        critical_range: "19-20",
        critical_multiplier: 2,
        weight: 4,
        damage_type: "S"
    },
    {
        item_type: "One-handed",
        classification: "Martial",
        name: "Pick, heavy",
        alt_name: "Heavy pick",
        cost: "8 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_multiplier: 4,
        weight: 6,
        damage_type: "P"
    },
    {
        item_type: "One-handed",
        classification: "Martial",
        name: "Rapier",
        cost: "20 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_range: "18-20",
        critical_multiplier: 2,
        weight: 2,
        damage_type: "P"
    },
    {
        item_type: "One-handed",
        classification: "Martial",
        name: "Scimitar",
        cost: "15 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_range: "18-20",
        critical_multiplier: 2,
        weight: 4,
        damage_type: "S"
    },
    {
        item_type: "One-handed",
        classification: "Martial",
        name: "Shield, heavy",
        alt_name: "Heavy shield",
        cost: "special",
        damage_small: "1d3",
        damage_medium: "1d4",
        critical_multiplier: 2,
        weight: "special",
        damage_type: "B"
    },
    {
        item_type: "One-handed",
        classification: "Martial",
        name: "Spiked shield, heavy",
        alt_name: "Heavy spiked shield",
        cost: "special",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_multiplier: 2,
        weight: "special",
        damage_type: "P"
    },
    {
        item_type: "One-handed",
        classification: "Martial",
        name: "Trident",
        cost: "15 gp",
        damage_small: "1d6",
        damage_medium: "1d8",
        critical_multiplier: 2,
        range: 10,
        weight: 4,
        damage_type: "P",
        special: ["brace",]
    },
    {
        item_type: "One-handed",
        classification: "Martial",
        name: "Warhammer",
        cost: "12 gp",
        damage_small: "1d6",
        damage_medium: "1d8",
        critical_multiplier: 3,
        weight: 5,
        damage_type: "B"
    },
    // Two-handed
    {
        item_type: "Two-handed",
        classification: "Martial",
        name: "Falchion",
        cost: "75 gp",
        damage_small: "1d6",
        damage_medium: "2d4",
        critical_range: "18-20",
        critical_multiplier: 2,
        weight: 8,
        damage_type: "S"
    },
    {
        item_type: "Two-handed",
        classification: "Martial",
        name: "Glaive",
        cost: "8 gp",
        damage_small: "1d8",
        damage_medium: "1d10",
        critical_multiplier: 3,
        weight: 10,
        damage_type: "S",
        special: ["reach",]
    },
    {
        item_type: "Two-handed",
        classification: "Martial",
        name: "Greataxe",
        cost: "20 gp",
        damage_small: "1d10",
        damage_medium: "1d12",
        critical_multiplier: 3,
        weight: 12,
        damage_type: "S"
    },
    {
        item_type: "Two-handed",
        classification: "Martial",
        name: "Greatclub",
        cost: "5 gp",
        damage_small: "1d8",
        damage_medium: "1d10",
        critical_multiplier: 2,
        weight: 8,
        damage_type: "B"
    },
    {
        item_type: "Two-handed",
        classification: "Martial",
        name: "Flail, heavy",
        alt_name: "Heavy flail",
        cost: "15 gp",
        damage_small: "1d8",
        damage_medium: "1d10",
        critical_range: "19-20",
        critical_multiplier: 2,
        weight: 10,
        damage_type: "B",
        special: ["disarm", "trip"]
    },
    {
        item_type: "Two-handed",
        classification: "Martial",
        name: "Greatsword",
        cost: "50 gp",
        damage_small: "1d10",
        damage_medium: "2d6",
        critical_range: "19-20",
        critical_multiplier: 2,
        weight: 8,
        damage_type: "S"
    },
    {
        item_type: "Two-handed",
        classification: "Martial",
        name: "Guisarme",
        cost: "9 gp",
        damage_small: "1d6",
        damage_medium: "2d4",
        critical_multiplier: 3,
        weight: 12,
        damage_type: "S",
        special: ["reach", "trip"]
    },
    {
        item_type: "Two-handed",
        classification: "Martial",
        name: "Halberd",
        cost: "10 gp",
        damage_small: "1d8",
        damage_medium: "1d10",
        critical_multiplier: 3,
        weight: 12,
        damage_type: "P or S",
        special: ["brace", "trip"]
    },
    {
        item_type: "Two-handed",
        classification: "Martial",
        name: "Lance",
        cost: "10 gp",
        damage_small: "1d6",
        damage_medium: "1d8",
        critical_multiplier: 3,
        weight: 10,
        damage_type: "P",
        special: ["reach",]
    },
    {
        item_type: "Two-handed",
        classification: "Martial",
        name: "Ranseur",
        cost: "10 gp",
        damage_small: "1d6",
        damage_medium: "2d4",
        critical_multiplier: 3,
        weight: 12,
        damage_type: "P",
        special: ["disarm", "reach",]
    },
    {
        item_type: "Two-handed",
        classification: "Martial",
        name: "Scythe",
        cost: "18 gp",
        damage_small: "1d6",
        damage_medium: "2d4",
        critical_multiplier: 4,
        weight: 10,
        damage_type: "P or S",
        special: ["trip",]
    },
    // Ranged
    {
        item_type: "Ranged",
        classification: "Martial",
        name: "Longbow",
        cost: "75 gp",
        damage_small: "1d6",
        damage_medium: "1d8",
        critical_multiplier: 3,
        range: 100,
        weight: 3,
        damage_type: "P"
    },
    {
        item_type: "Ammunition",
        classification: "Martial",
        name: "Arrows",
        cost: "1 gp",
        amount: "20",
        weight: 3
    },
    {
        item_type: "Ranged",
        classification: "Martial",
        name: "Longbow, composite",
        alt_name: "Composite longbow",
        cost: "100 gp",
        damage_small: "1d6",
        damage_medium: "1d8",
        critical_multiplier: 3,
        range: 110,
        weight: 3,
        damage_type: "P"
    },
    {
        item_type: "Ranged",
        classification: "Martial",
        name: "Shortbow",
        cost: "30 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_multiplier: 3,
        range: 60,
        weight: 2,
        damage_type: "P"
    },
    {
        item_type: "Ranged",
        classification: "Martial",
        name: "Shortbow, composite",
        alt_name: "Composite shortbow",
        cost: "75 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_multiplier: 3,
        range: 70,
        weight: 2,
        damage_type: "P"
    },
    // ****
    // EXOTIC
    // ****
    // Light
    {
        item_type: "Light",
        classification: "Exotic",
        name: "Nunchaku",
        cost: "2 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_multiplier: 2,
        weight: 2,
        damage_type: "B",
        special: ["disarm", "monk",]
    },
    {
        item_type: "Light",
        classification: "Exotic",
        name: "Sai",
        cost: "1 gp",
        damage_small: "1d3",
        damage_medium: "1d4",
        critical_multiplier: 2,
        weight: 1,
        damage_type: "B",
        special: ["disarm", "monk",]
    },
    {
        item_type: "Light",
        classification: "Exotic",
        name: "Siangham",
        cost: "3 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_multiplier: 2,
        weight: 1,
        damage_type: "P",
        special: ["monk",]
    },
    // One-handed
    {
        item_type: "One-handed",
        classification: "Exotic",
        name: "Sword, bastard",
        alt_name: "Bastard sword",
        cost: "35 gp",
        damage_small: "1d8",
        damage_medium: "1d10",
        critical_range: "19-20",
        critical_multiplier: 2,
        weight: 6,
        damage_type: "S"
    },
    {
        item_type: "One-handed",
        classification: "Exotic",
        name: "Waraxe, dwarven",
        alt_name: "Dwarven waraxe",
        cost: "30 gp",
        damage_small: "1d8",
        damage_medium: "1d10",
        critical_multiplier: 3,
        weight: 8,
        damage_type: "S"
    },
    {
        item_type: "One-handed",
        classification: "Exotic",
        name: "Whip",
        cost: "1 gp",
        damage_small: "1d2",
        damage_medium: "1d3",
        critical_multiplier: 2,
        weight: 2,
        damage_type: "S",
        special: ["disarm", "nonlethal", "reach", "trip",]
    },
    // Two-handed
    {
        item_type: "Two-handed",
        classification: "Exotic",
        name: "Axe, orc double",
        alt_name: "Orc double axe",
        cost: "60 gp",
        damage_small: "1d6/1d6",
        damage_medium: "1d8/1d8",
        critical_multiplier: 3,
        weight: 15,
        damage_type: "S",
        special: ["double",]
    },
    {
        item_type: "Two-handed",
        classification: "Exotic",
        name: "Chain, spiked",
        alt_name: "Spiked chain",
        cost: "25 gp",
        damage_small: "1d6",
        damage_medium: "2d4",
        critical_multiplier: 2,
        weight: 10,
        damage_type: "P",
        special: ["disarm", "trip",]
    },
    {
        item_type: "Two-handed",
        classification: "Exotic",
        name: "Curve blade, elven",
        alt_name: "Elven curve blade",
        cost: "80 gp",
        damage_small: "1d8",
        damage_medium: "1d10",
        critical_range: "18-20",
        critical_multiplier: 2,
        weight: 7,
        damage_type: "S",
    },
    {
        item_type: "Two-handed",
        classification: "Exotic",
        name: "Flail, dire",
        alt_name: "Dire flail",
        cost: "90 gp",
        damage_small: "1d6/1d6",
        damage_medium: "1d8/1d8",
        critical_multiplier: 2,
        weight: 10,
        damage_type: "B",
        special: ["disarm", "double", "trip",]
    },
    {
        item_type: "Two-handed",
        classification: "Exotic",
        name: "Hammer, gnome hooked",
        alt_name: "Gnome hooked hammer",
        cost: "20 gp",
        damage_small: "1d6/1d6",
        damage_medium: "1d8/1d8",
        critical_multiplier: [3, 4],
        weight: 6,
        damage_type: "B or P",
        special: ["double", "trip"]
    },
    {
        item_type: "Two-handed",
        classification: "Exotic",
        name: "Sword, two-bladed",
        alt_name: "Two-bladed sword",
        cost: "100 gp",
        damage_small: "1d6/1d6",
        damage_medium: "1d8/1d8",
        critical_range: "19-20",
        critical_multiplier: 2,
        weight: 10,
        damage_type: "S",
        special: ["double",]
    },
    {
        item_type: "Two-handed",
        classification: "Exotic",
        name: "Urgrosh, dwarven",
        alt_name: "Dwarven urgrosh",
        cost: "50 gp",
        damage_small: "1d6/1d4",
        damage_medium: "1d8/1d6",
        critical_multiplier: 3,
        weight: 12,
        damage_type: "P or S",
        special: ["brace", "double",]
    },
    // Ranged
    {
        item_type: "Ranged",
        classification: "Exotic",
        name: "Bolas",
        cost: "5 gp",
        damage_small: "1d3",
        damage_medium: "1d4",
        critical_multiplier: 2,
        range: 10,
        weight: 2,
        damage_type: "B",
        special: ["nonlethal", "trip",]
    },
    {
        item_type: "Ranged",
        classification: "Exotic",
        name: "Crossbow, hand",
        alt_name: "Hand crossbow",
        cost: "100 gp",
        damage_small: "1d3",
        damage_medium: "1d4",
        critical_range: "19-20",
        critical_multiplier: 2,
        range: 30,
        weight: 2,
        damage_type: "P"
    },
    {
        item_type: "Ranged",
        classification: "Exotic",
        name: "Crossbow, repeating heavy",
        alt_name: "Repeating heavy crossbow",
        cost: "400 gp",
        damage_small: "1d8",
        damage_medium: "1d10",
        critical_range: "19-20",
        critical_multiplier: 2,
        range: 120,
        weight: 12,
        damage_type: "P"
    },
    {
        item_type: "Ammunition",
        classification: "Exotic",
        name: "Bolts, repeating crossbow",
        alt_name: "Repeating crossbow bolts",
        cost: "1 gp",
        amount: 5
    },
    {
        item_type: "Ranged",
        classification: "Exotic",
        name: "Crossbow, repeating light",
        alt_name: "Light repeating crossbow",
        cost: "250 gp",
        damage_small: "1d6",
        damage_medium: "1d8",
        critical_range: "19-20",
        critical_multiplier: 2,
        range: 80,
        weight: 6,
        damage_type: "P"
    },
    {
        item_type: "Ranged",
        classification: "Exotic",
        name: "Net",
        cost: "20 gp",
        range: 10,
        weight: 6
    },
    {
        item_type: "Ranged",
        classification: "Exotic",
        name: "Shuriken",
        amount: 5,
        cost: "1 gp",
        damage_small: "1",
        damage_medium: "1d2",
        critical_multiplier: 2,
        range: 10,
        weight: 0.5,
        damage_type: "P",
        special: ["monk",]
    },
    {
        item_type: "Ranged",
        classification: "Exotic",
        name: "Sling staff, halfling",
        alt_name: "Halfling sling staff",
        cost: "20 gp",
        damage_small: "1d6",
        damage_medium: "1d8",
        critical_multiplier: 3,
        range: 80,
        weight: 3,
        damage_type: "B"
    },
];
/**
 *
 * @type {ItemObject[]}
 */
let UltimateEquipmentSet = [
    // ********
    // ULTIMATE EQUIPMENT WEAPONS
    // ********
    // ****
    // SIMPLE WEAPONS
    // ****
    // Light
    {
        item_type: "Light",
        classification: "Simple",
        name: "Battle aspergillum",
        cost: "5 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_multiplier: 2,
        weight: 4,
        damage_type: "B",
        special: ["see text"]
        // TODO: Add description field so that 'see text' doesn't suck so much
    },
    {
        item_type: "Light",
        classification: "Simple",
        name: "Brass knuckles",
        cost: "1 gp",
        damage_small: "1d2",
        damage_medium: "1d3",
        critical_multiplier: 2,
        weight: 1,
        damage_type: "B",
        special: ["monk", "see text"]
    },
    {
        item_type: "Light",
        classification: "Simple",
        name: "Cestus",
        cost: "5 gp",
        damage_small: "1d3",
        damage_medium: "1d4",
        critical_range: "19-20",
        critical_multiplier: 2,
        weight: 1,
        damage_type: "B or P",
        special: ["monk", "see text"]
    },
    {
        item_type: "Light",
        classification: "Simple",
        name: "Gauntlet",
        cost: "2 gp",
        damage_small: "1d2",
        damage_medium: "1d3",
        critical_multiplier: 2,
        weight: 1,
        damage_type: "B",
    },
    {
        item_type: "Light",
        classification: "Simple",
        name: "Wooden Stake",
        damage_small: "1d3",
        damage_medium: "1d4",
        critical_multiplier: 2,
        range: 10,
        weight: 1,
        damage_type: "P"
    },
    // One-handed
    {
        item_type: "One-handed",
        classification: "Simple",
        name: "Mere club",
        alt_name: "Club, mere",
        damage_small: "1d3",
        damage_medium: "1d4",
        critical_multiplier: 2,
        weight: 2,
        damage_type: "B or P",
        special: ["fragile"]
    },
    // Two-handed
    {
        item_type: "Two-handed",
        classification: "Simple",
        name: "Bayonet",
        cost: "5 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_multiplier: 2,
        weight: 1,
        damage_type: "P"
    },
    {
        item_type: "Two-handed",
        classification: "Simple",
        name: "Boar spear",
        cost: "5 gp",
        damage_small: "1d6",
        damage_medium: "1d8",
        critical_multiplier: 2,
        weight: 8,
        damage_type: "P",
        special: ["brace", "see text"]
    },
    // Ranged
    {
        item_type: "Ranged",
        classification: "Simple",
        name: "Crossbow, underwater heavy",
        alt_name: "Underwater heavy crossbow",
        cost: "100 gp",
        damage_small: "1d8",
        damage_medium: "1d10",
        critical_range: "19-20",
        critical_multiplier: 2,
        range: 120,
        weight: 8,
        damage_type: "P"
    },
    {
        item_type: "Ranged",
        classification: "Simple",
        name: "Crossbow, underwater light",
        alt_name: "Underwater light crossbow",
        cost: "70 gp",
        damage_small: "1d6",
        damage_medium: "1d8",
        critical_range: "19-20",
        critical_multiplier: 2,
        range: 80,
        weight: 4,
        damage_type: "P"
    },
    // ****
    // MARTIAL
    // ****
    {
        item_type: "Light",
        classification: "Martial",
        name: "Butterfly sword",
        cost: "20 gp",
        amount: 2,
        damage_small: "1d3",
        damage_medium: "1d4",
        critical_range: "19-20",
        critical_multiplier: 2,
        weight: 1,
        damage_type: "S",
        special: ["monk"]
    },
    {
        item_type: "Light",
        classification: "Martial",
        name: "Dogslicer",
        cost: "8 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_range: "19-20",
        critical_multiplier: 2,
        weight: 1,
        damage_type: "S",
        special: ["fragile"]
    },
    {
        item_type: "Light",
        classification: "Martial",
        name: "Gladius",
        cost: "15 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_range: "19-20",
        critical_multiplier: 2,
        weight: 3,
        damage_type: "P or S",
        special: ["performance"]
    },
    {
        item_type: "Light",
        classification: "Martial",
        name: "Iron brush",
        cost: "2 gp",
        damage_small: "1d2",
        damage_medium: "1d3",
        critical_multiplier: 2,
        range: 10,
        damage_type: "P"
    },
    {
        item_type: "Light",
        classification: "Martial",
        name: "Jutte",
        cost: "8 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_multiplier: 2,
        weight: 1,
        damage_type: "B",
        special: ["disarm", "monk"]
    },
    {
        item_type: "Light",
        classification: "Martial",
        name: "Kerambit",
        cost: "2 gp",
        damage_small: "1d2",
        damage_medium: "1d3",
        critical_multiplier: 3,
        damage_type: "S"
    },
    {
        item_type: "Light",
        classification: "Martial",
        name: "Lungchuan tamo",
        cost: "5 gp",
        damage_small: "1d3",
        damage_medium: "1d4",
        critical_multiplier: 2,
        weight: "special",
        damage_type: "P or S",
        special: ["monk"]
    },
    {
        item_type: "Light",
        classification: "Martial",
        name: "Shang gou",
        cost: "6 gp",
        damage_small: "1d3",
        damage_medium: "1d4",
        critical_multiplier: 2,
        weight: 1,
        damage_type: "S",
        special: ["disarm or trip", "monk"]
    },
    {
        item_type: "Light",
        classification: "Martial",
        name: "Tonfa",
        cost: "1 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_multiplier: 2,
        weight: 1,
        damage_type: "B",
        special: ["blocking", "monk"]
    },
    {
        item_type: "Light",
        classification: "Martial",
        name: "Wushu Dart",
        cost: "2 sp",
        damage_small: "1d2",
        damage_medium: "1d3",
        critical_multiplier: 2,
        range: 10,
        damage_type: "P",
        special: ["monk"]
    },
    // One-handed
    {
        item_type: "One-handed",
        classification: "Martial",
        name: "Double chicken saber",
        cost: "12 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_range: "19-20",
        critical_multiplier: 2,
        weight: 3,
        damage_type: "S",
        special: ["disarm", "monk"]
    },
    {
        item_type: "One-handed",
        classification: "Martial",
        name: "Klar",
        cost: "12 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_multiplier: 2,
        weight: 6,
        damage_type: "S",
        special: ["see text"]
    },
    {
        item_type: "One-handed",
        classification: "Martial",
        name: "Nine-ring broadsword",
        cost: "15 gp",
        damage_small: "1d6",
        damage_medium: "1d8",
        critical_multiplier: 3,
        weight: 4,
        damage_type: "S",
        special: ["monk"]
    },
    {
        item_type: "One-handed",
        classification: "Martial",
        name: "Scizore",
        cost: "20 gp",
        damage_small: "1d8",
        damage_medium: "1d10",
        critical_multiplier: 2,
        weight: 3,
        damage_type: "P",
        special: ["performance"]
    },
    {
        item_type: "One-handed",
        classification: "Martial",
        name: "Sibat",
        cost: "2 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_multiplier: 3,
        range: 10,
        weight: 2,
        damage_type: "P or S",
        special: ["grapple"]
    },
    {
        item_type: "One-handed",
        classification: "Martial",
        name: "Sword cane",
        cost: "45 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_multiplier: 2,
        weight: 4,
        damage_type: "P"
    },
    {
        item_type: "One-handed",
        classification: "Martial",
        name: "Terbutje",
        cost: "5 gp",
        damage_small: "1d6",
        damage_medium: "1d8",
        critical_range: "19-20",
        critical_multiplier: 2,
        weight: 2,
        damage_type: "S",
        special: ["fragile"]
    },
    // Two-handed
    {
        item_type: "Two-handed",
        classification: "Martial",
        name: "Bardiche",
        cost: "13 gp",
        damage_small: "1d8",
        damage_medium: "1d10",
        critical_range: "19-20",
        critical_multiplier: "2",
        weight: 14,
        damage_type: "S",
        special: ["brace", "reach", "see text"]
    },
    {
        item_type: "Two-handed",
        classification: "Martial",
        name: "Bec de corbin",
        cost: "15 gp",
        damage_small: "1d8",
        damage_medium: "1d10",
        critical_multiplier: 3,
        weight: 12,
        damage_type: "B or P",
        special: ["brace", "reach", "see text"]
    },
    {
        item_type: "Two-handed",
        classification: "Martial",
        name: "Bill",
        cost: "11 gp",
        damage_small: "1d6",
        damage_medium: "1d8",
        critical_multiplier: 3,
        weight: 11,
        damage_type: "S",
        special: ["brace", "disarm", "reach", "see text"]
    },
    {
        item_type: "Two-handed",
        classification: "Martial",
        name: "Earth breaker",
        cost: "40 gp",
        damage_small: "1d10",
        damage_medium: "2d6",
        critical_multiplier: 3,
        weight: 14,
        damage_type: "B"
    },
    {
        item_type: "Two-handed",
        classification: "Martial",
        name: "Glaive-guisarme",
        cost: "12 gp",
        damage_small: "1d8",
        damage_medium: "1d10",
        critical_multiplier: 3,
        weight: 10,
        damage_type: "S",
        special: ["brace", "reach", "see text"]
    },
    {
        item_type: "Two-handed",
        classification: "Martial",
        name: "Lance, hooked",
        alt_name: "Hoooked lance",
        cost: "3 gp",
        damage_small: "1d6",
        damage_medium: "1d8",
        critical_multiplier: 4,
        weight: 10,
        damage_type: "P",
        special: ["reach", "trip"]
    },
    {
        item_type: "Two-handed",
        classification: "Martial",
        name: "Horsechopper",
        cost: "10 gp",
        damage_small: "1d8",
        damage_medium: "1d10",
        critical_multiplier: 3,
        weight: 12,
        damage_type: "P or S",
        special: ["reach", "trip"]
    },
    {
        item_type: "Two-handed",
        classification: "Martial",
        name: "Lucerne hammer",
        alt_name: "Hammer, lucerne",
        cost: "15 gp",
        damage_small: "1d10",
        damage_medium: "1d12",
        critical_multiplier: 2,
        weight: 12,
        damage_type: "B or P",
        special: ["brace", "reach", "see text"]
    },
    {
        item_type: "Two-handed",
        classification: "Martial",
        name: "Mattock",
        cost: "12 gp",
        damage_small: "1d6",
        damage_medium: "2d4",
        critical_multiplier: 4,
        weight: 12,
        damage_type: "P",
        special: ["fragile"]
    },
    {
        item_type: "Two-handed",
        classification: "Martial",
        name: "Monk's spade",
        cost: "20 gp",
        damage_small: "1d4/1d4",
        damage_medium: "1d6/1d6",
        critical_multiplier: 2,
        weight: 12,
        damage_type: "B or P or S",
        special: ["double", "monk"]
    },
    {
        item_type: "Two-handed",
        classification: "Martial",
        name: "Naginata",
        cost: "35 gp",
        damage_small: "1d6",
        damage_medium: "1d8",
        critical_multiplier: 4,
        weight: 9,
        damage_type: "S",
        special: ["reach"]
    },
    {
        item_type: "Two-handed",
        classification: "Martial",
        name: "Nodachi",
        cost: "60 gp",
        damage_small: "1d8",
        damage_medium: "1d10",
        critical_range: "18-20",
        critical_multiplier: 2,
        weight: 8,
        damage_type: "S or P",
        special: ["brace"]
    },
    {
        item_type: "Two-handed",
        classification: "Martial",
        name: "Ogre hook",
        cost: "24 gp",
        damage_small: "1d8",
        damage_medium: "1d10",
        critical_multiplier: 3,
        weight: 10,
        damage_type: "P",
        special: ["trip"]
    },
    {
        item_type: "Two-handed",
        classification: "Martial",
        name: "Rhomphaia",
        cost: "15 gp",
        damage_small: "1d6",
        damage_medium: "2d4",
        critical_multiplier: 3,
        weight: 10,
        damage_type: "P or S",
        special: ["brace", "fragile", "reach"]
    },
    {
        item_type: "Two-handed",
        classification: "Martial",
        name: "Sansetsukon",
        cost: "8 gp",
        damage_small: "1d8",
        damage_medium: "1d10",
        critical_range: "19-20",
        critical_multiplier: 2,
        weight: 3,
        damage_type: "B",
        special: ["blocking", "disarm", "monk"]
    },
    {
        item_type: "Two-handed",
        classification: "Martial",
        name: "Tepoztopilli",
        cost: "8 gp",
        damage_small: "1d8",
        damage_medium: "1d10",
        critical_range: "19-20",
        critical_multiplier: 2,
        weight: 8,
        damage_type: "P or S",
        special: ["fragile", "reach"]
    },
    {
        item_type: "Two-handed",
        classification: "Martial",
        name: "Tiger fork",
        cost: "5 gp",
        damage_small: "1d6",
        damage_medium: "1d8",
        critical_multiplier: 2,
        weight: 8,
        damage_type: "P",
        special: ["brace", "monk"]
    },
    {
        item_type: "Two-handed",
        classification: "Martial",
        name: "Tri-point double-edged sword",
        cost: "12 gp",
        damage_small: "1d8",
        damage_medium: "1d10",
        critical_multiplier: 3,
        weight: 14,
        damage_type: "P",
        special: ["reach"]
    },
    // Ranged
    {
        item_type: "Ranged",
        classification: "Martial",
        name: "Amentum",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_multiplier: 2,
        range: 50,
        weight: 1,
        damage_type: "P",
        special: ["performance"]
    },
    {
        item_type: "Ranged",
        classification: "Martial",
        name: "Atlatl",
        cost: "2 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_multiplier: 2,
        range: 50,
        weight: 2,
        damage_type: "P"
    },
    {
        item_type: "Ranged",
        classification: "Martial",
        name: "Chakram",
        cost: "1 gp",
        damage_small: "1d6",
        damage_medium: "1d8",
        critical_multiplier: 2,
        range: 3,
        weight: 1,
        damage_type: "S"
    },
    {
        item_type: "Ranged",
        classification: "Martial",
        name: "Hunga munga",
        cost: "4 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_multiplier: 2,
        range: 15,
        weight: 3,
        damage_type: "P"
    },
    {
        item_type: "Ranged",
        classification: "Martial",
        name: "Pilum",
        cost: "5 gp",
        damage_small: "1d6",
        damage_medium: "1d8",
        critical_multiplier: 2,
        range: 20,
        weight: 4,
        damage_type: "P",
        special: ["see text"]
    },
    {
        item_type: "Ranged",
        classification: "Martial",
        name: "Poisoned sand tube",
        cost: "1 gp",
        damage_small: "special",
        damage_medium: "special",
        weight: 1,
        special: ["see text"]
    },
    {
        item_type: "Ranged",
        classification: "Martial",
        name: "Tube arrow shooter",
        cost: "3 gp",
        damage_small: "1d3",
        damage_medium: "1d4",
        critical_multiplier: 2,
        range: 40,
        weight: 0.5,
        damage_type: "P"
    },
    // ****
    // EXOTIC
    // ****
    // Light
    {
        item_type: "Light",
        classification: "Exotic",
        name: "Aklys",
        cost: "5 gp",
        damage_small: "1d6",
        damage_medium: "1d8",
        critical_multiplier: 2,
        range: 20,
        weight: 2,
        damage_type: "B",
        special: ["performance", "trip"]
    },
    {
        item_type: "Light",
        classification: "Exotic",
        name: "Dan bong",
        cost: "1 sp",
        damage_small: "1d2",
        damage_medium: "1d3",
        critical_range: "19-20",
        critical_multiplier: 2,
        range: 10,
        damage_type: "B",
        special: ["blocking", "monk", "see text"]
    },
    {
        item_type: "Light",
        classification: "Exotic",
        name: "Emei piercer",
        cost: "3 gp",
        damage_small: "1d2",
        damage_medium: "1d3",
        critical_range: "19-20",
        critical_multiplier: 2,
        damage_type: "P",
        special: ["see text"]
    },
    {
        item_type: "Light",
        classification: "Exotic",
        name: "Fighting fan",
        cost: "5 gp",
        damage_small: "1d3",
        damage_medium: "1d4",
        critical_multiplier: 3,
        damage_type: "P",
        special: ["distracting", "monk"]
    },
    {
        item_type: "Light",
        classification: "Exotic",
        name: "Kama",
        cost: "2 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_multiplier: 2,
        weight: 2,
        damage_type: "S",
        special: ["monk", "trip"]
    },
    {
        item_type: "Light",
        classification: "Exotic",
        name: "Knuckle Axe",
        alt_name: "Axe, knuckle",
        cost: "9 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_multiplier: 3,
        weight: 2,
        damage_type: "S",
        special: ["monk", "performance"]
    },
    // Madu is originally listed as a single item with "leather/steel", here these are presented separately
    {
        item_type: "Light",
        classification: "Exotic",
        name: "Madu, leather",
        alt_name: "Leather madu",
        cost: "40 gp",
        damage_small: "1d3",
        damage_medium: "1d4",
        critical_multiplier: 2,
        weight: 5,
        damage_type: "P",
        special: ["performance"]
    },
    {
        item_type: "Light",
        classification: "Exotic",
        name: "Madu, steel",
        alt_name: "Steel madu",
        cost: "50 gp",
        damage_small: "1d3",
        damage_medium: "1d4",
        critical_multiplier: 2,
        weight: 6,
        damage_type: "P",
        special: ["performance"]
    },
    {
        item_type: "Light",
        classification: "Exotic",
        name: "Pata",
        cost: "14 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_multiplier: 3,
        weight: 3,
        damage_type: "P",
        special: ["performance"]
    },
    {
        item_type: "Light",
        classification: "Exotic",
        name: "Quadrens",
        cost: "8 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_range: "19-20",
        critical_multiplier: 2,
        weight: 2,
        damage_type: "P",
        special: ["performance"]
    },
    {
        item_type: "Light",
        classification: "Exotic",
        name: "Scorpion whip",
        cost: "5 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_multiplier: 2,
        weight: 3,
        damage_type: "S",
        special: ["performance"]
    },
    {
        item_type: "Light",
        classification: "Exotic",
        name: "Sica",
        cost: "10 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_multiplier: 2,
        weight: 3,
        special: ["performance"]
    },
    {
        item_type: "Light",
        classification: "Exotic",
        name: "Swordbreaker dagger",
        alt_name: "Dagger, swordbreaker",
        cost: "10 gp",
        damage_small: "1d3",
        damage_medium: "1d4",
        critical_multiplier: 2,
        weight: 3,
        damage_type: "S",
        special: ["disarm", "see text"]
    },
    {
        item_type: "Light",
        classification: "Exotic",
        name: "Tekko-kagi",
        cost: "2 gp",
        damage_small: "1d2",
        damage_medium: "1d3",
        critical_multiplier: 2,
        damage_type: "P",
        special: ["disarm", "see text"]
    },
    {
        item_type: "Light",
        classification: "Exotic",
        name: "Wakizashki",
        cost: "35 gp",
        damage_small: "1d4",
        damage_medium: "1d6",
        critical_range: "18-20",
        critical_multiplier: 2,
        weight: 2,
        damage_type: "P or S",
        special: ["deadly"]
    }
];


ItemDataSet.push(...CoreRulebookSet);
ItemDataSet.push(...UltimateEquipmentSet);
export default ItemDataSet;