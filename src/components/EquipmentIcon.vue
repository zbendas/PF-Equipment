<template>
    <div class="item_icon" v-bind:class="item_type" @dragstart.prevent>
        <img v-if="item_type === 'Unarmed'" src="../assets/icons/unarmed.svg" alt="Unarmed"/>
        <img v-else-if="item_type === 'Light'" src="../assets/icons/light_melee.svg" alt="Light weapon"/>
        <img v-else-if="item_type === 'One-handed'" src="../assets/icons/one-handed.svg" alt="One-handed weapon"/>
        <img v-else-if="item_type === 'Two-handed'" src="../assets/icons/two-handed.svg" alt="Two-handed weapon"/>
        <img v-else-if="item_type === 'Ranged'" src="../assets/icons/ranged.svg" alt="Ranged weapon"/>
        <img v-else-if="item_type === 'Ammunition'" src="../assets/icons/ammunition.svg" alt="Ammunition"/>
    </div>

</template>

<script>
    /**
     * @module EquipmentIcon
     */
    export default {
        name: "equipment-icon",
        props: {
            "item_type": String
        }
    }
</script>

<style scoped lang="sass">
    .item_icon
        user-select: none
        width: 1.5em
        display: flex
        justify-content: center
        align-items: center
    img
        height: 28px
</style>