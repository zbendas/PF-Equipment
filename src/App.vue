<template>
    <div class="app-body">
        <form @submit.prevent>
            <input class="search-box" type="text" title="Search" placeholder="e.g.: dagger, gauntlet, longspear"
                   v-model="search_text"/>
        </form>
        <equipment-result v-for="item in items" :key="item.name"
                          v-bind:item="item"
                          v-bind:filter="search_text"
        />
    </div>
</template>

<script>
    import EquipmentResult from "./components/EquipmentResult.vue"

    export default {
        name: "app",
        components: {
            EquipmentResult,
        },
        data: function () {
            return {
                items: [
                    {
                        "item_type": "Unarmed",
                        "name": "Gauntlet",
                        "cost": "2gp",
                        "damage_small": "1d2",
                        "damage_medium": "1d3",
                        "critical_multiplier": "2",
                        "weight": "1 lb.",
                        "damage_type": ["B"],
                    },
                    {
                        "item_type": "Light",
                        "name": "Dagger",
                        "cost": "2gp",
                        "damage_small": "1d3",
                        "damage_medium": "1d4",
                        "critical_range": "19-20",
                        "critical_multiplier": "2",
                        "range": "10 ft.",
                        "weight": "1 lb.",
                        "damage_type": ["P or S"]
                    },
                    {
                        "item_type": "Two-handed",
                        "name": "Longspear",
                        "cost": "5gp",
                        "damage_small": "1d6",
                        "damage_medium": "1d8",
                        "critical_multiplier": "3",
                        "weight": "9 lbs.",
                        "damage_type": ["P"],
                        "special": ["brace", "reach"]
                    }
                ],
                search_text: ""
            }
        }
    };
</script>

<style lang="sass">
    @import url('https://fonts.googleapis.com/css?family=Montserrat:500')
    \:root
        background-color: darkslategray

    #app
        width: 100vw
        height: 100vw

    .app-body
        background-color: white
        margin: 5vh 20vw

    .search-box
        width: calc(100% - 8px)
        height: 2em
        background: #333333
        border: none
        color: #eeeeee
        padding: 4px
</style>
