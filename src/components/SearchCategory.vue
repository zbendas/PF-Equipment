<template>
    <div class="search_category">
        <form @submit.prevent>
            <div class="category_name">{{ category_name }}</div>
            <div v-for="(item, key) in category_items" :key="item + key.toString()">
                <!--suppress HtmlFormInputWithoutLabel -->
                <input type="checkbox"
                       :title="item" :aria-label="item + ' checkbox'"
                       :id="item"
                       :value="item"
                       v-model="checkedItems"
                       v-on:change="prepareFilter"
                />
                <label for="item">{{ item + (additional_label ? " " + additional_label : '')}}</label>
            </div>
            <input type="button" @click.prevent v-on:click="() => { this.checkedItems = []; prepareFilter()}"
                   value="Reset">
        </form>
    </div>
</template>

<script>
    /**
     * @module SearchCategory
     * @desc Component that provides checkboxes for the user to interact with, then passes their status upward to
     * the parent. Additionally, these checkboxes can be reset to their unchecked state if the reset flag is set.
     */
    /**
     * @event module:SearchCategory#prepared-filter
     * @type {object}
     */
    /**
     * @event module:SearchCategory#reset-complete
     * @type {string}
     */
    export default {
        name: "search-category",
        props: {
            "category_name": String,
            "category_key": String,
            "category_items": Array,
            "additional_label": String,
            "reset": Boolean
        },
        data() {
            return {
                checkedItems: []
            }
        },
        watch: {
            reset: function () {
                /**
                 * @function reset
                 * @desc Signals to the parent that the previously-requested reset has been completed.
                 * @fires module:SearchCategory#reset-complete
                 */
                this.checkedItems = [];
                this.$emit('reset-complete', this.category_key);
            }
        },
        methods: {
            prepareFilter: function () {
                /**
                 * @function prepareFilter
                 * @fires module:SearchCategory#prepared-filter
                 * @desc Bubbles a the currently checked items in this category up to the parent.
                 */
                this.$emit('prepared-filter', this.category_key, this.checkedItems);
            },
        }
    }
</script>

<style scoped lang="sass">
    .search_category
        font-size: 0.75em
        margin: 0 2vw
        display: flex
        .category_name
            font-weight: bold

        input[type="button"]
            font-size: 0.75em
            min-width: 50%
            background: transparent
            border: solid darkgray 1px
            cursor: pointer

</style>