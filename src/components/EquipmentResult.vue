<template>
    <div class="equipment_result"
         v-on:mouseover="onHover"
         v-on:click="showItem"
         v-show="isShown(item, filter)"
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
        name: "EquipmentResult",
        components: {
            EquipmentDetail,
            EquipmentIcon
        },
        props: {
            item: Object,
            filter: String,
            expanded: Boolean
        },
        computed: {},
        data: function () {
            return {};
        },
        methods: {
            onHover: function (event) {
            },
            showItem: function (event) {
                this.$emit('show-equipment', this.item.name);
            },
            isShown: function (item, filter) {
                let re = new RegExp(filter, 'gi');
                if (item.hasOwnProperty('alt_name')) {
                    return (re.test(item.name) || re.test(item.alt_name))
                }
                else {
                    return re.test(item.name)
                }
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