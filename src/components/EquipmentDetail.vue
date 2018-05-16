<template xmlns="http://www.w3.org/1999/html">
    <div class="equipment_info" v-show="expanded" v-bind:class="[item.item_type.toLowerCase(), expanded]">
        <div>
            <span class="field_label">Type: </span><span class="field_datum">{{ item.item_type }}</span>
            <span v-if="item.item_type !== 'Ammunition'"><span class="field_label">Cost: </span><span class="field_datum">{{ item.cost ? item.cost : "—" }}</span></span>
            <span v-else><span class="field_label">Cost per {{item.amount}}: </span><span class="field_datum">{{item.cost ? item.cost : "—" }}</span></span>
            <span class="field_label">Weight: </span>{{ computed_weight }}
        </div>
        <div v-if="item.item_type !== 'Ammunition'">
            <span class="field_label">Damage: </span>
            <span class="damage">{{ item.damage_small ? item.damage_small : "—" }}<sup title="Small">S</sup></span>
            <span class="damage">{{ item.damage_medium ? item.damage_medium : "—" }}<sup title="Medium">M</sup></span>
        </div>
        <div v-if="item.item_type !== 'Ammunition'">
            <span class="field_label">Critical: </span>{{ item.critical_range ? item.critical_range + "/" : "" }}{{ "×" + item.critical_multiplier }}
        </div>
        <div v-if="item.item_type !== 'Ammunition'">
            <span class="field_label">Range: </span>{{ item.range ? item.range + " ft." : "—" }}
        </div>
        <div v-if="item.item_type !== 'Ammunition'">
            <span class="field_label">Damage Type: </span>{{ item.damage_type ? item.damage_type.join(', ') : '' }}
        </div>
        <div v-if="item.item_type !== 'Ammunition'">
            <span class="field_label">Special: </span>{{ item.special ? item.special.join(', ') : "—" }}
        </div>
    </div>
</template>

<script>
    export default {
        name: "equipment-detail",
        computed: {
            computed_weight: function () {
                let weight = this.item["weight"];
                return weight === "special" ? weight : (weight ? (weight > 1 ? weight + " lbs." : weight + " lb.") : "—")
            }
        },
        props: {
            item: Object,
            expanded: Boolean,
        }
    }
</script>

<style scoped lang="sass">
    @import ../assets/variables

    .equipment_info
        font-family: 'Lato', sans-serif
        font-weight: normal
        font-size: 0.75em
        padding: 1%
        display: flex
        flex-flow: column nowrap
        justify-content: space-evenly
        border-bottom: 3px solid darkgray

    .field_label
        font-weight: bold

    .field_datum
        margin-right: 1.5vw

    .damage
        & + .damage:before
            opacity: 0.75
            content: " / "
        sup
            font-size: 0.75rem

    .unarmed
        background-color: $unarmed

    .light
        background-color: $light_melee

    .one-handed
        background-color: $one-handed

    .two-handed
        background-color: $two-handed

    .ranged
        background-color: $ranged

    .ammunition
        background-color: $ammunition
</style>