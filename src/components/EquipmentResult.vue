<template>
    <div class="equipment_result"
         v-on:mouseover="onHover"
         v-on:click="showItem"
         v-bind:class="{expanded: expanded}"
         v-show=" item.name.toLowerCase() === filter.toLowerCase() || filter === ''"
    >
        <div>{{ item.name }}</div>
        <div class="equipment_info" v-show="expanded" v-bind:class="[item.item_type.toLowerCase()]">
            <div>
                Type: {{ item.item_type }}
                Cost: {{ item.cost ? item.cost : "—" }}
            </div>
            <div>
                Damage (S/M): {{ item.damage_small ? item.damage_small : "—" }} / {{ item.damage_medium ?
                item.damage_medium : "—" }}
            </div>
            <div>
                Critical: {{ item.critical_range ? item.critical_range + "/" : "" }}{{ "×" + item.critical_multiplier }}
            </div>
            <div>
                Range: {{ item.range ? item.range : "—" }}
            </div>
            <div>
                Weight: {{ item.weight ? item.weight : "—" }}
            </div>
            <div>
                Damage Type: {{ item.damage_type.join(', ') }}
            </div>
            <div>
                Special: {{ item.special ? item.special.join(', ') : "—" }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EquipmentResult",
        props: {
            item: Object,
            filter: String,
        },
        data: function () {
            return {
                expanded: false
            }
        },
        methods: {
            onHover: function (event) {
                //console.log(this.item_name + " was hovered!");
            },
            showItem: function (event) {
                //console.log("This item's name is " + this.item_name);
                this.expanded ? this.expanded = false : this.expanded = true;
            }
        }
    }
</script>

<style scoped lang="sass">
    .equipment_result
        font-family: Montserrat, sans-serif
        font-weight: 500
        font-size: 1.5em
        padding: 5px
        border-bottom: solid 1px lightgray
        .equipment_info
            font-family: sans-serif
            font-weight: normal
            font-size: 0.75em
        .unarmed
            background-color: palegoldenrod

        .light
            background-color: palegreen

        .two-handed
            background-color: palevioletred
</style>