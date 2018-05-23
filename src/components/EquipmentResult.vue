<template>
    <div class="equipment_result"
         v-on:click="showItem"
         v-show="is_result && filtered"
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
    /**
     * @module EquipmentResult
     * @desc A line-item component that displays the name of a given item and can be expanded to show the
     * corresponding [EquipmentDetail]{@link module:EquipmentDetail} component. Also displays an
     * [EquipmentIcon]{@link module:EquipmentIcon} on the right of the component.
     */
    /**
     * @event module:EquipmentResult#expand-equipment
     * @type {string}
     */
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
            is_result: Boolean,
        },
        computed: {},
        data: function () {
            return {};
        },
        methods: {
            showItem: function () {
                /**
                 * @desc Alerts the parent component that this object needs to be re-rendered as expanded.
                 * @summary Fires event to expand component.
                 * @function showItem
                 * @fires module:EquipmentResult#expand-equipment
                 */
                this.$emit('expand-equipment', this.item.name);
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