<template>
    <div class="item_icon" v-bind:class="item_type" @dragstart.prevent>
        <img v-if="item_type === 'Unarmed'" src="../assets/icons/fist.svg" alt="Unarmed"/>
        <img v-else-if="item_type === 'Light'"  src="../assets/icons/dagger.svg" alt="Light weapon"/>
        <img v-else-if="item_type === 'One-handed'" src="../assets/icons/swords.svg" alt="One-handed weapon"/>
        <img v-else-if="item_type === 'Two-handed'" src="../assets/icons/axe.svg" alt="Two-handed weapon"/>
        <img v-else-if="item_type === 'Ranged'" src="../assets/icons/hawkeye-bow-and-arrow.svg" alt="Ranged weapon"/>
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
        height: 32px
        user-select: none
    img
        height: 28px
        margin: 4px 10px
</style>