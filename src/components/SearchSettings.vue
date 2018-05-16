<template>
    <div class="wrapper">
        <h1 v-show="!collapsed">Filter By:</h1>
        <div class="search_settings" v-show="!collapsed">
            <search-category v-for="category in categories"
                             v-bind:category_name="category.category_name"
                             v-bind:category_items="category.category_items"
                             v-bind:category_key="category.category_key"
                             v-bind:additional_label="category.additional_label"
                             v-on:prepared-filter="applyFilter"
            />
        </div>
        <div class="expander" v-on:click="toggleCollapsed" >
            <i class="arrow" v-bind:class="!collapsed ? 'up' : 'down' "
               v-bind:title="!collapsed ? 'Click to collapse' : 'Click to expand'"
            ></i>
        </div>
    </div>
</template>

<script>
    import SearchCategory from "./SearchCategory";

    export default {
        components: {SearchCategory},
        name: "search-settings",
        props: {
            categories: Array,
        },
        data() {
            return {
                "collapsed": true
            }
        },
        methods: {
            applyFilter: function (category_key, checkedItems) {
                this.$emit('apply-filter', category_key, checkedItems);
            },
            toggleCollapsed: function () {
                this.collapsed = !this.collapsed;
            }
        }
    }
</script>

<style scoped lang="sass">
    .wrapper
        font: normal 1em 'Lato', sans-serif
        padding: 2px 0
        border-bottom: dashed darkgray 2px
        display: flex
        flex-flow: column nowrap
        align-items: center
        i.arrow
            cursor: pointer
            border: solid lighten(black, 30%)
            border-width: 0 3px 3px 0
            display: inline-block
            padding: 4px
            margin: 10px 0 4px 0
        .down
            -webkit-transform: rotate(45deg)
            -moz-transform: rotate(45deg)
            -ms-transform: rotate(45deg)
            -o-transform: rotate(45deg)
            transform: rotate(45deg)
        .up
            -webkit-transform: rotate(-135deg)
            -moz-transform: rotate(-135deg)
            -ms-transform: rotate(-135deg)
            -o-transform: rotate(-135deg)
            transform: rotate(-135deg)

    h1
        font: normal 1em 'Montserrat', sans-serif
        border-bottom: 1px solid darkgray
        margin: 4px 0

    .search_settings
        width: 100%
        display: flex
        flex-flow: row nowrap
        justify-content: center
        align-items: flex-start

    .expander
        cursor: pointer
        width: 100%
        display: flex
        flex-flow: column nowrap
        align-items: center

</style>