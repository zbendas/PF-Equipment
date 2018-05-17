<template>
    <div class="app-body">
        <form @submit.prevent>
            <input class="search-box" type="text" title="Search" aria-label="Search"
                   placeholder="Search by typing here, e.g.: dagger, gauntlet, longspear"
                   v-model="search_text"
                   v-on:focus="collapseAll"
            />
        </form>
        <search-settings
                v-bind:categories="categories"
                v-on:apply-filter="setFilter"
                v-on:clear-filters="clearFilter"
                v-on:reset-complete="clearResetFlags"

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

<!--suppress JSUnusedGlobalSymbols -->
<script>

    import EquipmentResult from "./components/EquipmentResult.vue";
    import SearchSettings from "./components/SearchSettings.vue";
    import ItemDataSet from "./assets/item_data.js";

    export default {
        name: "app",
        components: {
            SearchSettings,
            EquipmentResult,
        },
        computed: {
            categories_func: function () {
                return [
                    {
                        "category_name": "Classification",
                        "category_key": "classification",
                        "category_items": this.classification_categories,
                        "reset": false
                    },
                    {
                        "category_name": "Item Type",
                        "category_key": "item_type",
                        "category_items": this.item_categories,
                        "reset": false
                    },
                    {
                        "category_name": "Damage Type",
                        "category_key": "damage_type",
                        "category_items": this.damage_categories,
                        "reset": false
                    },
                    {
                        "category_name": "Range (≥)",
                        "category_key": "range",
                        "category_items": this.range_categories,
                        "additional_label": "ft.",
                        "reset": false
                    }
                ];
            },
            classification_categories: function () {
                let classification_array = [];
                this.items.forEach((value) => {
                    classification_array.push(value.classification);
                });
                classification_array = classification_array.filter((item, index) => {
                    return classification_array.indexOf(item) === index;
                });
                return classification_array;
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
                    item_array.push(value.item_type);
                });
                item_array = item_array.filter((item, index) => {
                    return item_array.indexOf(item) === index;
                });
                return item_array;
            }
        },
        created: function () {
            // After creation, both computed values and data values become available, so we can re-assign
            // the data version of expanded_equipment to be equal to the dynamically computed object
            this.expanded_equipment = this.expanded_equipment_func;
            // TODO: Add sort function to alphabetically sort items
            this.categories = this.categories_func;
        },
        data: function () {
            return {
                categories: [],
                damage_categories: [
                    "B",
                    "P",
                    "S",
                ],
                expanded_equipment: {},
                /**
                 * @type Array.<ItemObject> items - Array of ItemObjects
                 */
                items: ItemDataSet,
                current_filter: {
                    "classification": [],
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
            clearFilter: function () {
                for (let key in this.current_filter) {
                    this.current_filter[key] = [];
                }
                for (let index in this.categories) {
                   this.categories[index]["reset"] = true;
                }
            },
            clearResetFlags: function (category_key) {
                for (let index in this.categories) {
                    if (this.categories[index]["category_key"] === category_key){
                        this.categories[index]["reset"] = false;
                    }
                }
            }
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
