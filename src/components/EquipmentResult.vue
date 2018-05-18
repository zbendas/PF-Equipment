<template>
    <div class="equipment_result"
         v-on:click="showItem"
         v-show="isShown(item, search_text) && filtered"
    >
        <div class="equipment_result_title">
            <div class="item_name"
                 v-bind:class="{expanded: expanded}"
            >
                {{ item.name }}
            </div>
            <equipment-icon v-bind:item_type="item.item_type"/>
        </div>
        <transition name="grow">
            <equipment-detail v-show="expanded" v-bind:item="item"/>
        </transition>
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
            expanded: Boolean,
            filtered: Boolean,
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
        }
    }
</script>

<style scoped lang="sass">
    @import ../assets/variables

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

    .grow-enter-active, .grow-leave-active
        overflow: hidden
        max-height: 600px
        +transition(max-height 0.25s ease-out)

    .grow-enter, .grow-leave-to
        max-height: 0

</style>