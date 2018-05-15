<template>
    <div class="equipment_result"
         v-on:click="showItem"
         v-show="isShown(item, search_text) && isFiltered(item, current_filter)"
    >
        <div class="equipment_result_title">
            <div class="item_name"
                 v-bind:class="{expanded: expanded}"
            >
                {{ item.name }}
            </div>
            <equipment-icon v-bind:item_type="item.item_type"/>
        </div>
        <equipment-detail v-bind:item="item" v-bind:expanded="expanded"/>
    </div>
</template>

<script>
    import EquipmentDetail from "./EquipmentDetail.vue";
    import EquipmentIcon from "./EquipmentIcon.vue";

    export default {
        name: "equipment-result",
        components: {
            EquipmentDetail,
            EquipmentIcon
        },
        props: {
            current_filter: Object,
            expanded: Boolean,
            item: Object,
            search_text: String
        },
        computed: {},
        data: function () {
            return {};
        },
        methods: {
            showItem: function () {
                this.$emit('expand-equipment', this.item.name);
            },
            isShown: function (item, search_text) {
                let re = new RegExp(search_text, 'gi');
                if (item.hasOwnProperty('alt_name')) {
                    return (re.test(item.name) || re.test(item.alt_name))
                }
                else {
                    return re.test(item.name)
                }
            },
            isFiltered: function (item, current_filter) {
                let item_type_flag = false, damage_type_flag = false;
                if (current_filter["item_type"].includes(item.item_type) || current_filter["item_type"].length === 0) {
                    item_type_flag = true;
                }
                if (current_filter["damage_type"].includes(item.damage_type) || current_filter["damage_type"].length === 0) {
                    damage_type_flag = true;
                }
                return item_type_flag && damage_type_flag;
            }
        }
    }
</script>

<style scoped lang="sass">
    .equipment_result
        font-family: 'Montserrat', sans-serif
        font-weight: 500
        font-size: 1.5em
        .item_name
            padding: 5px
            user-select: none
        .equipment_result_title
            border-bottom: solid 1px lightgray
            display: flex
            flex-flow: row nowrap
            justify-content: space-between
            align-items: center
</style>