<template>
    <div class="app-body">
        <form @submit.prevent>
            <input class="search-box" type="text" title="Search" aria-label="Search"
                   placeholder="Filter by typing here, e.g.: dagger, gauntlet, longspear"
                   v-model="search_text"
                   v-on:focus="collapseAll"
            />
        </form>
        <search-settings
                v-bind:categories="categories"
                v-on:apply-filter="setFilter"
        />
        <equipment-result
                v-for="item in items" :key="item.name"
                v-bind:item="item"
                v-bind:search_text="search_text"
                v-bind:current_filter="current_filter"
                v-bind:expanded="expanded_equipment[item.name]"
                v-on:expand-equipment="(key) => { expanded_equipment[key] = !expanded_equipment[key] }"
        />
    </div>
</template>

<script>
    /**
     * An item object, containing various different properties
     * @typedef {Object} ItemObject
     * @property {string} item_type - Item category
     * @property {string} name - Item name, as listed in PRD
     * @property {string} [alt_name] - Item name, alternate
     * @property {string} [cost] - Item cost, as listed
     * @property {string} [amount] - Amount per cost
     * @property {string} [damage_small] - Damage dealt when wielded by Small character
     * @property {string} [damage_medium] - Damage dealt when wielded by Medium character
     * @property {string} [critical_range] - Critical threat range
     * @property {number} [critical_multiplier] - Critical damage multiplier
     * @property {number} [range] - Range of weapon, ending in 'ft.'
     * @property {number|string} [weight] - Weight of weapon, ending in 'lb.' or 'lbs.'
     * @property {Array.<string>} [damage_type] - Array containing the types of damage dealt
     * @property {Array.<string>} [special] - Array containing special qualities of the weapon
     */

    import EquipmentResult from "./components/EquipmentResult.vue"
    import SearchSettings from "./components/SearchSettings";

    export default {
        name: "app",
        components: {
            SearchSettings,
            EquipmentResult,
        },
        computed: {
            categories: function () {
                return [
                    {
                        "category_name": "Item Type",
                        "category_key": "item_type",
                        "category_items": this.item_categories
                    },
                    {
                        "category_name": "Damage Type",
                        "category_key": "damage_type",
                        "category_items": this.damage_categories
                    },
                    {
                        "category_name": "Range (≥)",
                        "category_key": "range",
                        "category_items": this.range_categories,
                        "additional_label": "ft."
                    }
                ];
            },
            expanded_equipment_func: function () {
                let equipment_out = {};
                this.items.forEach((value) => {
                    equipment_out[value.name] = false;
                });
                return equipment_out;
            },
            item_categories: function () {
                let item_array = [];
                this.items.forEach((value) => {
                    item_array.push(value.item_type)
                });
                item_array = item_array.filter((item, index) => {
                    return item_array.indexOf(item) === index;
                });
                return item_array;
            },
        },
        created: function () {
            // After creation, both computed values and data values become available, so we can re-assign
            // the data version of expanded_equipment to be equal to the dynamically computed object
            this.expanded_equipment = this.expanded_equipment_func;
        },
        data: function () {
            return {
                damage_categories: [
                    "B",
                    "P",
                    "S",
                ],
                expanded_equipment: {},
                /**
                 * @type Array.<ItemObject> items - Array of ItemObjects
                 */
                items: [
                    // ****
                    // SIMPLE WEAPONS
                    // ****
                    // Unarmed
                    {
                        "item_type": "Unarmed",
                        "classification": "Simple",
                        "name": "Gauntlet",
                        "cost": "2 gp",
                        "damage_small": "1d2",
                        "damage_medium": "1d3",
                        "critical_multiplier": 2,
                        "weight": 1,
                        "damage_type": ["B",],
                    },
                    {
                        "item_type": "Unarmed",
                        "classification": "Simple",
                        "name": "Unarmed strike",
                        "damage_small": "1d2",
                        "damage_medium": "1d3",
                        "critical_multiplier": 2,
                        "damage_type": ["B",],
                        "special": ["nonlethal",]
                    },
                    // Light
                    {
                        "item_type": "Light",
                        "classification": "Simple",
                        "name": "Dagger",
                        "cost": "2 gp",
                        "damage_small": "1d3",
                        "damage_medium": "1d4",
                        "critical_range": "19-20",
                        "critical_multiplier": 2,
                        "range": 10,
                        "weight": 1,
                        "damage_type": ["P or S",]
                    },
                    {
                        "item_type": "Light",
                        "classification": "Simple",
                        "name": "Dagger, punching",
                        "alt_name": "Punching dagger",
                        "cost": "2 gp",
                        "damage_small": "1d3",
                        "damage_medium": "1d4",
                        "critical_multiplier": 3,
                        "weight": 1,
                        "damage_type": ["P",]
                    },
                    {
                        "item_type": "Light",
                        "classification": "Simple",
                        "name": "Gauntlet, spiked",
                        "alt_name": "Spiked gauntlet",
                        "cost": "5 gp",
                        "damage_small": "1d3",
                        "damage_medium": "1d4",
                        "critical_multiplier": 2,
                        "weight": 1,
                        "damage_type": ["P",]
                    },
                    {
                        "item_type": "Light",
                        "classification": "Simple",
                        "name": "Mace, light",
                        "alt_name": "Light mace",
                        "cost": "5 gp",
                        "damage_small": "1d4",
                        "damage_medium": "1d6",
                        "critical_multiplier": 2,
                        "weight": 4,
                        "damage_type": ["B",],
                    },
                    {
                        "item_type": "Light",
                        "classification": "Simple",
                        "name": "Sickle",
                        "cost": "6 gp",
                        "damage_small": "1d4",
                        "damage_medium": "1d6",
                        "critical_multiplier": 2,
                        "weight": 2,
                        "damage_type": ["S",],
                        "special": ["trip",]
                    },
                    // One-handed
                    {
                        "item_type": "One-handed",
                        "classification": "Simple",
                        "name": "Club",
                        "damage_small": "1d4",
                        "damage_medium": "1d6",
                        "critical_multiplier": 2,
                        "range": 10,
                        "weight": 3,
                        "damage_type": ["B",]
                    },
                    {
                        "item_type": "One-handed",
                        "classification": "Simple",
                        "name": "Mace, heavy",
                        "alt_name": "Heavy mace",
                        "cost": "12 gp",
                        "damage_small": "1d6",
                        "damage_medium": "1d8",
                        "critical_multiplier": 2,
                        "weight": 8,
                        "damage_type": ["B",]
                    },
                    {
                        "item_type": "One-handed",
                        "classification": "Simple",
                        "name": "Morningstar",
                        "cost": "8 gp",
                        "damage_small": "1d6",
                        "damage_medium": "1d8",
                        "critical_multiplier": 2,
                        "weight": 6,
                        "damage_type": ["B and P",]
                    },
                    {
                        "item_type": "One-handed",
                        "classification": "Simple",
                        "name": "Shortspear",
                        "cost": "1 gp",
                        "damage_small": "1d4",
                        "damage_medium": "1d6",
                        "critical_multiplier": 2,
                        "range": 20,
                        "weight": 3,
                        "damage_type": ["P",]
                    },
                    // Two-handed
                    {
                        "item_type": "Two-handed",
                        "classification": "Simple",
                        "name": "Longspear",
                        "cost": "5 gp",
                        "damage_small": "1d6",
                        "damage_medium": "1d8",
                        "critical_multiplier": 3,
                        "weight": 9,
                        "damage_type": ["P",],
                        "special": ["brace", "reach"]
                    },
                    {
                        "item_type": "Two-handed",
                        "classification": "Simple",
                        "name": "Quarterstaff",
                        "damage_small": "1d4/1d4",
                        "damage_medium": "1d6/1d6",
                        "critical_multiplier": 2,
                        "weight": 4,
                        "damage_type": ["B",],
                        "special": ["double", "monk",]
                    },
                    {
                        "item_type": "Two-handed",
                        "classification": "Simple",
                        "name": "Spear",
                        "cost": "2 gp",
                        "damage_small": "1d6",
                        "damage_medium": "1d8",
                        "critical_multiplier": 3,
                        "range": 20,
                        "weight": 6,
                        "damage_type": ["P",],
                        "special": ["brace",]
                    },
                    // Ranged
                    {
                        "item_type": "Ranged",
                        "classification": "Simple",
                        "name": "Blowgun",
                        "cost": "2 gp",
                        "damage_small": "1",
                        "damage_medium": "1d2",
                        "critical_multiplier": 2,
                        "range": 20,
                        "weight": 1,
                        "damage_type": ["P",]
                    },
                    {
                        "item_type": "Ammunition",
                        "classification": "Simple",
                        "name": "Darts, blowgun",
                        "alt_name": "Blowgun darts",
                        "cost": "5 sp",
                        "amount": "10"
                    },
                    {
                        "item_type": "Ranged",
                        "classification": "Simple",
                        "name": "Crossbow, heavy",
                        "alt_name": "Heavy crossbow",
                        "cost": "50 gp",
                        "damage_small": "1d8",
                        "damage_medium": "1d10",
                        "critical_range": "19-20",
                        "critical_multiplier": 2,
                        "range": 120,
                        "weight": 8,
                        "damage_type": ["P",]
                    },
                    {
                        "item_type": "Ammunition",
                        "classification": "Simple",
                        "name": "Bolts, crossbow",
                        "alt_name": "Crossbow bolts",
                        "cost": "1 gp",
                        "amount": "10",
                        "weight": 1
                    },
                    {
                        "item_type": "Ranged",
                        "classification": "Simple",
                        "name": "Crossbow, light",
                        "alt_name": "Light crossbow",
                        "cost": "35 gp",
                        "damage_small": "1d6",
                        "damage_medium": "1d8",
                        "critical_range": "19-20",
                        "critical_multiplier": 2,
                        "range": 80,
                        "weight": 4,
                        "damage_type": ["P",]
                    },
                    {
                        "item_type": "Ranged",
                        "classification": "Simple",
                        "name": "Dart",
                        "cost": "5 sp",
                        "damage_small": "1d3",
                        "damage_medium": "1d4",
                        "critical_multiplier": 2,
                        "range": 20,
                        "weight": 0.5,
                        "damage_type": ["P",]
                    },
                    {
                        "item_type": "Ranged",
                        "classification": "Simple",
                        "name": "Javelin",
                        "cost": "1 gp",
                        "damage_small": "1d3",
                        "damage_medium": "1d4",
                        "critical_multiplier": 2,
                        "range": 30,
                        "weight": 2,
                        "damage_type": ["P",]
                    },
                    {
                        "item_type": "Ranged",
                        "classification": "Simple",
                        "name": "Sling",
                        "damage_small": "1d3",
                        "damage_medium": "1d4",
                        "critical_multiplier": 2,
                        "range": 50,
                        "damage_type": ["B",]
                    },
                    {
                        "item_type": "Ammunition",
                        "classification": "Simple",
                        "name": "Bullets, sling",
                        "alt_name": "Sling bullets",
                        "cost": "1 sp",
                        "amount": "10",
                        "weight": 5
                    },
                    // ****
                    // MARTIAL WEAPONS
                    // ****
                    // Unarmed
                    // Light
                    {
                        "item_type": "Light",
                        "classification": "Martial",
                        "name": "Axe, throwing",
                        "alt_name": "Throwing axe",
                        "cost": "8 gp",
                        "damage_small": "1d4",
                        "damage_medium": "1d6",
                        "critical_multiplier": 2,
                        "range": 10,
                        "weight": 2,
                        "damage_type": ["S",]
                    },
                    {
                        "item_type": "Light",
                        "classification": "Martial",
                        "name": "Hammer, light",
                        "alt_name": "Light hammer",
                        "cost": "1 gp",
                        "damage_small": "1d3",
                        "damage_medium": "1d4",
                        "critical_multiplier": 2,
                        "range": 20,
                        "weight": 2,
                        "damage_type": ["B",]
                    },
                    {
                        "item_type": "Light",
                        "classification": "Martial",
                        "name": "Handaxe",
                        "cost": "6 gp",
                        "damage_small": "1d4",
                        "damage_medium": "1d6",
                        "critical_multiplier": 3,
                        "weight": 3,
                        "damage_type": ["S",]
                    },
                    {
                        "item_type": "Light",
                        "classification": "Martial",
                        "name": "Kukri",
                        "cost": "8 gp",
                        "damage_small": "1d3",
                        "damage_medium": "1d4",
                        "critical_range": "18-20",
                        "critical_multiplier": 2,
                        "weight": 2,
                        "damage_type": ["S",]
                    },
                    {
                        "item_type": "Light",
                        "classification": "Martial",
                        "name": "Pick, light",
                        "alt_name": "Light pick",
                        "cost": "4 gp",
                        "damage_small": "1d3",
                        "damage_medium": "1d4",
                        "critical_multiplier": 4,
                        "weight": 3,
                        "damage_type": ["P"],
                    },
                    {
                        "item_type": "Light",
                        "classification": "Martial",
                        "name": "Sap",
                        "cost": "1 gp",
                        "damage_small": "1d4",
                        "damage_medium": "1d6",
                        "critical_multiplier": 2,
                        "weight": 2,
                        "damage_type": ["B",],
                        "special": ["nonlethal",]
                    },
                    {
                        "item_type": "Light",
                        "classification": "Martial",
                        "name": "Shield, light",
                        "alt_name": "Light shield",
                        "cost": "special",
                        "damage_small": "1d2",
                        "damage_medium": "1d3",
                        "critical_multiplier": 2,
                        "weight": "special",
                        "damage_type": ["B",]
                    },
                    {
                        "item_type": "Light",
                        "classification": "Martial",
                        "name": "Spiked armor",
                        "cost": "special",
                        "damage_small": "1d4",
                        "damage_medium": "1d6",
                        "critical_multiplier": 2,
                        "weight": "special",
                        "damage_type": ["P",]
                    },
                    {
                        "item_type": "Light",
                        "classification": "Martial",
                        "name": "Spiked shield, light",
                        "alt_name": "Light spiked shield",
                        "cost": "special",
                        "damage_small": "1d3",
                        "damage_medium": "1d4",
                        "critical_multiplier": 2,
                        "weight": "special",
                        "damage_type": ["P",]
                    },
                    {
                        "item_type": "Light",
                        "classification": "Martial",
                        "name": "Starknife",
                        "cost": "24 gp",
                        "damage_small": "1d3",
                        "damage_medium": "1d4",
                        "critical_multiplier": 3,
                        "range": 20,
                        "weight": 3,
                        "damage_type": ["P",]
                    },
                    {
                        "item_type": "Light",
                        "classification": "Martial",
                        "name": "Sword, short",
                        "alt_name": "Short sword",
                        "cost": "10 gp",
                        "damage_small": "1d4",
                        "damage_medium": "1d6",
                        "critical_range": "19-20",
                        "critical_multiplier": 2,
                        "weight": 2,
                        "damage_type": ["P",]
                    }
                ],
                category_name: "Item Type",
                current_filter: {
                    "item_type": [],
                    "damage_type": [],
                    "range": []
                },
                range_categories: [
                    10, 20, 30, 40, 50, 100
                ],
                search_text: ""
            }
        },
        methods: {
            collapseAll: function () {
                for (let key in this.expanded_equipment) {
                    // noinspection JSUnfilteredForInLoop
                    this.expanded_equipment[key] = false;
                }
            },
            setFilter: function (category_key, checkedItems) {
                this.current_filter[category_key] = checkedItems;
            },
        }
    };
</script>

<style lang="sass">
    @import url('https://fonts.googleapis.com/css?family=Lato:400,700|Montserrat:500')

    \:root
        background-color: #141414

    body
        height: 100vh
        display: flex
        flex-direction: column

    #app
        width: 100vw
        height: 100vw

    .app-body
        flex: 1 0 auto
        min-height: 20vh
        width: 60vw
        background-color: white
        margin: 5vh 20vw
        box-shadow: 25px 25px 19px -1px rgba(0, 0, 0, 0.5)
        -webkit-box-shadow: 25px 25px 19px -1px rgba(0, 0, 0, 05)
        -moz-box-shadow: 25px 25px 19px -1px rgba(0, 0, 0, 0.5)

    input:focus
        outline: white auto 5px

    .search-box
        width: calc(100% - 8px)
        height: 2em
        background: #333333
        border: none
        color: #eeeeee
        padding: 4px
        &::placeholder
            font-style: italic

    .icon-attribution
        color: white
        font-size: 0.75em
        opacity: 0.5
        flex-shrink: 0
        a
            text-decoration: none
            color: darken(white, 50%)
</style>
