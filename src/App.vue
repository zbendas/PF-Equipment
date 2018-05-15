<template>
    <div class="app-body">
        <form @submit.prevent>
            <input class="search-box" type="text" title="Search" aria-label="Search"
                   placeholder="Filter by typing here, e.g.: dagger, gauntlet, longspear"
                   v-model="search_text"
                   v-on:focus="collapseAll"
            />
        </form>
        <equipment-result v-for="item in items" :key="item.name"
                          v-bind:item="item"
                          v-bind:filter="search_text"
                          v-bind:expanded="expanded_equipment[item.name]"
                          v-on:show-equipment="(key) => { expanded_equipment[key] = !expanded_equipment[key] }"
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
     * @property {string} [critical_multiplier] - Critical damage multiplier
     * @property {string} [range] - Range of weapon, ending in 'ft.'
     * @property {string} [weight] - Weight of weapon, ending in 'lb.' or 'lbs.'
     * @property {Array.<string>} [damage_type] - Array containing the types of damage dealt
     * @property {Array.<string>} [special] - Array containing special qualities of the weapon
     */

    import EquipmentResult from "./components/EquipmentResult.vue"

    export default {
        name: "app",
        components: {
            EquipmentResult,
        },
        computed: {},
        data: function () {
            return {
                /**
                 * @type Array.<ItemObject> items - Array of ItemObjects
                 */
                items: [
                    {
                        "item_type": "Unarmed",
                        "name": "Gauntlet",
                        "cost": "2 gp",
                        "damage_small": "1d2",
                        "damage_medium": "1d3",
                        "critical_multiplier": "2",
                        "weight": "1 lb.",
                        "damage_type": ["B",],
                    },
                    {
                        "item_type": "Unarmed",
                        "name": "Unarmed strike",
                        "damage_small": "1d2",
                        "damage_medium": "1d3",
                        "critical_multiplier": "2",
                        "damage_type": ["B",],
                        "special": ["nonlethal",]
                    },
                    // Light
                    {
                        "item_type": "Light",
                        "name": "Dagger",
                        "cost": "2 gp",
                        "damage_small": "1d3",
                        "damage_medium": "1d4",
                        "critical_range": "19-20",
                        "critical_multiplier": "2",
                        "range": "10 ft.",
                        "weight": "1 lb.",
                        "damage_type": ["P or S",]
                    },
                    {
                        "item_type": "Light",
                        "name": "Dagger, punching",
                        "alt_name": "Punching dagger",
                        "cost": "2 gp",
                        "damage_small": "1d3",
                        "damage_medium": "1d4",
                        "critical_multiplier": "3",
                        "weight": "1 lb.",
                        "damage_type": ["P",]
                    },
                    {
                        "item_type": "Light",
                        "name": "Gauntlet, spiked",
                        "alt_name": "Spiked gauntlet",
                        "cost": "5 gp",
                        "damage_small": "1d3",
                        "damage_medium": "1d4",
                        "critical_multiplier": "2",
                        "weight": "1 lb.",
                        "type": ["P",]
                    },
                    {
                        "item_type": "Light",
                        "name": "Mace, light",
                        "alt_name": "Light mace",
                        "cost": "5 gp",
                        "damage_small": "1d4",
                        "damage_medium": "1d6",
                        "critical_multiplier": "2",
                        "weight": "4 lbs.",
                        "type": ["B",],
                    },
                    {
                        "item_type": "Light",
                        "name": "Sickle",
                        "cost": "6 gp",
                        "damage_small": "1d4",
                        "damage_medium": "1d6",
                        "critical_multiplier": "2",
                        "weight": "2 lbs.",
                        "type": ["S",],
                        "special": ["trip",]
                    },
                    // One-handed
                    {
                        "item_type": "One-handed",
                        "name": "Club",
                        "damage_small": "1d4",
                        "damage_medium": "1d6",
                        "critical_multiplier": "2",
                        "range": "10 ft.",
                        "weight": "3 lbs.",
                        "damage_type": ["B",]
                    },
                    {
                        "item_type": "One-handed",
                        "name": "Mace, heavy",
                        "alt_name": "Heavy mace",
                        "cost": "12 gp",
                        "damage_small": "1d6",
                        "damage_medium": "1d8",
                        "critical_multiplier": "2",
                        "weight": "8 lbs.",
                        "damage_type": ["B",]
                    },
                    {
                        "item_type": "One-handed",
                        "name": "Morningstar",
                        "cost": "8 gp",
                        "damage_small": "1d6",
                        "damage_medium": "1d8",
                        "critical_multiplier": "2",
                        "weight": "6 lbs.",
                        "damage_type": ["B and P",]
                    },
                    {
                        "item_type": "One-handed",
                        "name": "Shortspear",
                        "cost": "1 gp",
                        "damage_small": "1d4",
                        "damage_medium": "1d6",
                        "critical_multiplier": "2",
                        "range": "20 ft.",
                        "weight": "3 lbs.",
                        "damage_type": ["P",]
                    },
                    // Two-handed
                    {
                        "item_type": "Two-handed",
                        "name": "Longspear",
                        "cost": "5 gp",
                        "damage_small": "1d6",
                        "damage_medium": "1d8",
                        "critical_multiplier": "3",
                        "weight": "9 lbs.",
                        "damage_type": ["P",],
                        "special": ["brace", "reach"]
                    },
                    {
                        "item_type": "Two-handed",
                        "name": "Quarterstaff",
                        "damage_small": "1d4/1d4",
                        "damage_medium": "1d6/1d6",
                        "critical_multiplier": "2",
                        "weight": "4 lbs.",
                        "damage_type": ["B",],
                        "special": ["double", "monk",]
                    },
                    {
                        "item_type": "Two-handed",
                        "name": "Spear",
                        "cost": "2 gp",
                        "damage_small": "1d6",
                        "damage_medium": "1d8",
                        "critical_multiplier": "3",
                        "range": "20 ft.",
                        "weight": "6 lbs.",
                        "damage_type": ["P",],
                        "special": ["brace",]
                    },
                    // Ranged
                    {
                        "item_type": "Ranged",
                        "name": "Blowgun",
                        "cost": "2 gp",
                        "damage_small": "1",
                        "damage_medium": "1d2",
                        "critical_multiplier": "2",
                        "range": "20 ft.",
                        "weight": "1 lb.",
                        "damage_type": ["P",]
                    },
                    {
                        "item_type": "Ammunition",
                        "name": "Darts, blowgun",
                        "alt_name": "Blowgun darts",
                        "cost": "5 sp",
                        "amount": "10"
                    },
                    {
                        "item_type": "Ranged",
                        "name": "Crossbow, heavy",
                        "alt_name": "Heavy crossbow",
                        "cost": "50 gp",
                        "damage_small": "1d8",
                        "damage_medium": "1d10",
                        "critical_range": "19-20",
                        "critical_multiplier": "2",
                        "range": "120 ft.",
                        "weight": "8 lbs.",
                        "damage_type": ["P",]
                    },
                    {
                        "item_type": "Ammunition",
                        "name": "Bolts, crossbow",
                        "alt_name": "Crossbow bolts",
                        "cost": "1 gp",
                        "amount": "10",
                        "weight": "1 lb."
                    },
                    {
                        "item_type": "Ranged",
                        "name": "Crossbow, light",
                        "alt_name": "Light crossbow",
                        "cost": "35 gp",
                        "damage_small": "1d6",
                        "damage_medium": "1d8",
                        "critical_range": "19-20",
                        "critical_multiplier": "2",
                        "range": "80 ft.",
                        "weight": "4 lbs.",
                        "damage_type": ["P",]
                    },
                    {
                        "item_type": "Ranged",
                        "name": "Dart",
                        "cost": "5 sp",
                        "damage_small": "1d3",
                        "damage_medium": "1d4",
                        "critical_multiplier": "2",
                        "range": "20 ft.",
                        "weight": "1/2 lb.",
                        "damage_type": ["P",]
                    },
                    {
                        "item_type": "Ranged",
                        "name": "Javelin",
                        "cost": "1 gp",
                        "damage_small": "1d3",
                        "damage_medium": "1d4",
                        "critical_multiplier": "2",
                        "range": "30 ft.",
                        "weight": "2 lbs.",
                        "damage_type": ["P",]
                    },
                    {
                        "item_type": "Ranged",
                        "name": "Sling",
                        "damage_small": "1d3",
                        "damage_medium": "1d4",
                        "critical_multiplier": "2",
                        "range": "50 ft.",
                        "damage_type": ["B",]
                    },
                    {
                        "item_type": "Ammunition",
                        "name": "Bullets, sling",
                        "alt_name": "Sling bullets",
                        "cost": "1 sp",
                        "amount": "10",
                        "weight": "5 lbs."
                    }
                ],
                expanded_equipment: {
                    "Gauntlet": false,
                    "Unarmed strike": false,
                    "Dagger": false,
                    "Dagger, punching": false,
                    "Gauntlet, spiked": false,
                    "Mace, light": false,
                    "Sickle": false,
                    "Club": false,
                    "Mace, heavy": false,
                    "Morningstar": false,
                    "Shortspear": false,
                    "Longspear": false,
                    "Quarterstaff": false,
                    "Spear": false,
                    "Blowgun": false,
                    "Darts, blowgun": false,
                    "Crossbow, heavy": false,
                    "Bolts, crossbow": false,
                    "Crossbow, light": false,
                    "Dart": false,
                    "Javelin": false,
                    "Sling": false,
                    "Bullets, sling": false
                },
                search_text: ""
            }
        },
        methods: {
            collapseAll: function () {
                for(let key in this.expanded_equipment){
                    this.expanded_equipment[key] = false;
                }
            }
        }
    };
</script>

<style lang="sass">
    @import url('https://fonts.googleapis.com/css?family=Lato|Montserrat:500')

    \:root
        background-color: #141414

    #app
        width: 100vw
        height: 100vw

    .app-body
        min-height: 20vh
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
        a
            text-decoration: none
            color: darken(white, 50%)
</style>
