<template>
    <div class="app-body">
        <form @submit.prevent>
            <div class="search search-container">
                <input class="search search-box" type="text" title="Search" aria-label="Search"
                       placeholder="Search by typing here, e.g.: dagger, gauntlet, longspear"
                       v-model="search_text"
                       v-on:focus="collapseAll"
                />
                <div class="search clear-button" v-on:click="search_text = ''">
                    <img src="./assets/icons/closed.svg"
                         @dragstart.prevent
                         aria-label="Clear search field"
                         title="Clear"
                    />
                </div>
            </div>
        </form>
        <search-settings
                v-show="resultsAvailable()"
                v-bind:categories="categories"
                v-on:apply-filter="setFilter"
                v-on:clear-filters="clearFilter"
                v-on:reset-complete="clearResetFlags"

        />
        <equipment-result
                v-for="item in items" :key="item.name"
                v-bind:item="item"
                v-bind:search_text="search_text"
                v-bind:is_result="isResult(item)"
                v-bind:current_filter="current_filter"
                v-bind:expanded="expanded_equipment[item.name]"
                v-bind:filtered="isFiltered(item, current_filter)"
                v-on:expand-equipment="(key) => { expanded_equipment[key] = !expanded_equipment[key] }"
        />
        <div class="no-results"
             v-show="!resultsAvailable()"
        >
            No results found.
        </div>
    </div>
</template>

<!--suppress JSUnusedGlobalSymbols -->
<script>

    import EquipmentResult from "./components/EquipmentResult.vue";
    import SearchSettings from "./components/SearchSettings.vue";
    import ItemDataSet from "./assets/item_data.js";
    import equipmentCompare from "./assets/EquipmentCompare.js";

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
            filtered_equipment_func: function () {
                let equipment_out = {};
                this.items.forEach((value) => {
                    equipment_out[value.name] = false;
                });
                return equipment_out;
            },
            result_equipment_func: function (){
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
            this.filtered_equipment = this.filtered_equipment_func;
            this.result_equipment = this.result_equipment_func;
            this.categories = this.categories_func;
        },
        data: function () {
            return {
                categories: [],
                current_filter: {
                    "classification": [],
                    "item_type": [],
                    "damage_type": [],
                    "range": []
                },
                damage_categories: [
                    "B",
                    "P",
                    "S",
                ],
                expanded_equipment: {},
                filtered_equipment: {},
                result_equipment: {},
                /**
                 * @type Array.<ItemObject> items - Array of ItemObjects
                 */
                items: ItemDataSet.sort(equipmentCompare),
                range_categories: [
                    10, 20, 30, 40, 50, 100
                ],
                search_text: ""
            }
        },
        methods: {
            resultsAvailable: function () {
                for (let item in this.result_equipment) {
                    if (this.result_equipment[item]) {
                        return true;
                    }
                }
                return false;
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
                    if (this.categories[index]["category_key"] === category_key) {
                        this.categories[index]["reset"] = false;
                    }
                }
            },
            collapseAll: function () {
                for (let key in this.expanded_equipment) {
                    // noinspection JSUnfilteredForInLoop
                    this.expanded_equipment[key] = false;
                }
            },
            isFiltered: function (item, current_filter) {
                let classification_flag = false, item_type_flag = false, damage_type_flag = false, range_flag = false;
                if (current_filter["classification"].includes(item.classification) || current_filter["classification"].length === 0) {
                    classification_flag = true;
                }
                if (current_filter["item_type"].includes(item.item_type) || current_filter["item_type"].length === 0) {
                    item_type_flag = true;
                }
                if (current_filter["damage_type"].length === 0) {
                    damage_type_flag = true;
                }
                else {
                    current_filter["damage_type"].forEach((value) => {
                        if (item.hasOwnProperty("damage_type")) {
                            if (item.damage_type.includes(value)) {
                                damage_type_flag = true;
                            }
                        }
                    });
                }
                if (current_filter["range"].length === 0) {
                    range_flag = true;
                }
                else {
                    current_filter["range"].forEach((value) => {
                        if (item.hasOwnProperty("range")) {
                            if (item.range >= value) {
                                range_flag = true;
                            }
                        }
                    });
                }
                this.filtered_equipment[item.name] = classification_flag && item_type_flag && damage_type_flag && range_flag;
                return this.filtered_equipment[item.name];
            },
            setFilter: function (category_key, checkedItems) {
                this.current_filter[category_key] = checkedItems;
            },
            isResult: function (item) {
                let re = new RegExp(this.search_text, 'gi');
                if (item.hasOwnProperty('alt_name')) {
                    this.result_equipment[item.name] = (re.test(item.name) || re.test(item.alt_name));
                    return this.result_equipment[item.name];
                }
                else {
                    this.result_equipment[item.name] = re.test(item.name);
                    return this.result_equipment[item.name];
                }
            },
        }
    };
</script>

<style lang="sass">
    @import url('https://fonts.googleapis.com/css?family=Lato:400,700|Montserrat:500')
    @import /assets/variables

    \:root
        background-color: $body-background

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

    .search
        height: 2em
        background: $search-background
        border: none
        color: $search-text

    .search-container
        display: flex
        flex-flow: row nowrap
        justify-content: space-between
        align-items: center

    .search-box
        width: 95%
        height: 100%
        padding: 0 4px
        &::placeholder
            font-style: italic

    .clear-button
        cursor: pointer
        width: 32px
        img
            height: 24px
            position: relative
            top: 4px
            left: 4px

    .no-results
        text-align: center
        width: 100%
        padding: 2% 0
        font: normal 2em 'Montserrat', sans-serif

    .icon-attribution
        color: white
        font-size: 0.75em
        opacity: 0.5
        flex-shrink: 0
        a
            text-decoration: none
            color: darken(white, 50%)
</style>
