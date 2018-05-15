<template>
    <div class="search_category">
        <div class="category_name">{{ category_name }}</div>
        <form @submit.prevent>
            <div v-for="(item, key) in category_items" :key="item + key.toString()">
                <input type="checkbox"
                       :title="item" :aria-label="item + ' checkbox'"
                       :value="item"
                       v-model="checkedItems"
                       v-on:change="prepareFilter"
                />

                {{ item }}
            </div>
            <input type="button" @click.prevent v-on:click="() => { this.checkedItems = []; prepareFilter()}" value="Reset">
        </form>
    </div>
</template>

<script>
    export default {
        name: "search-category",
        props: {
            "category_name": String,
            "category_key": String,
            "category_items": Array,
        },
        data() {
            return {
                checkedItems: []
            }
        },
        methods: {
            prepareFilter: function () {
                console.log(`prepareFilter(${this.category_key}, [${this.checkedItems.join(', ')}])`);
                this.$emit('prepared-filter', this.category_key, this.checkedItems);
            },
        }
    }
</script>

<style scoped lang="sass">
    .search_category
        font-size: 0.75em
        .category_name
            font-weight: bold
    input[type="button"]
        font-size: 0.75em
        width: 50%
        background: transparent
        border: solid darkgray 1px
    input[type="checkbox"]:checked
        background: darkblue
        border: solid darkgray 1px

</style>