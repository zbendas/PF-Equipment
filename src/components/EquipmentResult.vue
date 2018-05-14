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
            Damage (S)/(M): {{ item.damage_small ? item.damage_small : "—" }} / {{ item.damage_medium ?
            item.damage_medium : "—" }}
            Critical: {{ item.critical_range ? item.critical_range + "/" : "" }}{{ "×" + item.critical_multiplier }}
            Range: {{ item.range ? item.range : "—" }}
            Weight: {{ item.weight ? item.weight : "—" }}
            Damage Type: {{ item.damage_type }}
            Special: {{ item.special ? item.special : "—" }}
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