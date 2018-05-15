<template>
    <div class="search_settings">
        <search-category v-bind:category_name="category_name"
                         v-bind:category_items="category_items"
                         v-bind:category_key="category_key"
                         v-on:prepared-filter="applyFilter"
        />
    </div>
</template>

<script>
    import SearchCategory from "./SearchCategory";

    export default {
        components: {SearchCategory},
        name: "search-settings",
        props: {
            category_name: String,
            category_key: String,
            category_items: Array
        },
        data() {
            return {}
        },
        methods: {
            applyFilter: function (category_key, checkedItems) {
                console.log(`applyFilter(${category_key}, [${checkedItems.join(', ')}])`);
                this.$emit('apply-filter', category_key, checkedItems);
            }
        }
    }
</script>

<style scoped lang="sass">
    .search_settings
        font: normal 1em 'Lato', sans-serif
        padding: 2px 0
        border-bottom: dashed darkgray 2px
        display: flex
        flex-flow: row nowrap
        justify-content: center
        align-items: center
</style>