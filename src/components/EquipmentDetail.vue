<template xmlns="http://www.w3.org/1999/html">
    <div class="wrapper" v-bind:class="item.item_type.toLowerCase()">
        <div class="equipment_info">
            <div>
                <span class="field_label">Type: </span><span class="field_datum">{{ item.item_type }}</span>
                <span v-if="!item.amount"><span class="field_label">Cost: </span>
                    <span class="field_datum">{{ item.cost ? item.cost : "—" }}</span>
                </span>
                <span v-else><span class="field_label">Cost per {{item.amount}}: </span>
                    <span class="field_datum">{{item.cost ? item.cost : "—" }}</span>
                </span>
                <span class="field_label">Weight: </span>{{ computed_weight }}
            </div>
            <div v-if="item.item_type !== 'Ammunition' && item.hasOwnProperty('amount')">
                <span class="field_label">Amount: </span>{{ item.amount }}
            </div>
            <div v-if="item.item_type !== 'Ammunition'">
                <span class="field_label">Damage: </span>
                <span class="damage">{{ item.damage_small ? item.damage_small : "—" }}<sup title="Small">S</sup></span>
                <span class="damage">{{ item.damage_medium ? item.damage_medium : "—" }}<sup title="Medium">M</sup></span>
            </div>
            <div v-if="item.item_type !== 'Ammunition'">
                <span class="field_label">Critical: </span>{{ item.critical_range ? item.critical_range + "/" : "" }}
                {{ item.critical_multiplier ? "×" + computed_critical : "—" }}
            </div>
            <div v-if="item.item_type !== 'Ammunition'">
                <span class="field_label">Range: </span>{{ item.range ? item.range + " ft." : "—" }}
            </div>
            <div v-if="item.item_type !== 'Ammunition'">
                <span class="field_label">Damage Type: </span>{{ item.damage_type ? item.damage_type : '—' }}
            </div>
            <div v-if="item.item_type !== 'Ammunition'">
                <span class="field_label">Special: </span>{{ item.special ? item.special.join(', ') : "—" }}
            </div>
        </div>
        <div class="extra_description">{{ item.see_text }}</div>
        <!-- TODO Add @media queries that instead throw a button and pop-up in place of the text whenever the screen gets too small. Or maybe a link to the item in the PRD. -->
        <div class="classification"
             v-bind:class="item.item_type.toLowerCase()"
             v-if="!(item.item_type === 'Ammunition')"
        >{{ this.item["classification"] }}</div>
    </div>
</template>

<script>
    /**
     * @module EquipmentDetail
     */
    export default {
        name: "equipment-detail",
        computed: {
            computed_weight: function () {
                let weight = this.item["weight"];
                return weight === "special" ? weight : (weight ? (weight > 1 ? weight + " lbs." : weight + " lb.") : "—")
            },
            computed_critical: function () {

                if (this.item["critical_multiplier"].constructor === Array) {
                    return this.item["critical_multiplier"].join(' / ×');
                }
                return this.item["critical_multiplier"];
            }
        },
        props: {
            item: Object,
        }
    }
</script>

<style scoped lang="sass">
    @import ../assets/variables

    .wrapper
        border-bottom: 3px solid darkgray
        display: flex
        flex-flow: row nowrap
        justify-content: space-between
        font-family: 'Lato', sans-serif
        font-weight: normal
        font-size: 0.75em
        .classification.unarmed
            color: darken($unarmed, 40%)
        .classification.light
            color: darken($light_melee, 40%)
        .classification.one-handed
            color: darken($one-handed, 40%)
        .classification.two-handed
            color: darken($two-handed, 40%)
        .classification.ranged
            color: darken($ranged, 40%)
        .classification.ammunition
            color: darken($ammunition, 40%)

    .equipment_info
        padding: 1%
        display: flex
        flex-flow: column nowrap
        justify-content: space-evenly
        flex-basis: 27.25%

    .extra_description
        flex-basis: 60%
        font-size: 0.8em
        align-self: center
        padding: 2%


    .classification
        writing-mode: vertical-lr
        text-align: center
        font-size: 1.5em
        flex-basis: 5.75%
        text-transform: uppercase

    .field_label
        font-weight: bold

    .field_datum
        margin-right: 1.5vw

    .damage
        & + .damage:before
            opacity: 0.5
            content: " / "
            font-size: 1.25rem
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