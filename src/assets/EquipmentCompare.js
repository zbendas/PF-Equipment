function nameCompare(a, b) {
    if (a.name < b.name) {
        return -1;
    }
    else if (a.name > b.name) {
        return 1;
    }
    else {
        return 0;
    }
}

function equipmentCompare(a, b) {
    if (!a.hasOwnProperty("item_type") || !b.hasOwnProperty("item_type")) {
        throw `{a} cannot be compared to {b}, as one of the two operands does not define property 'item_type'.`;
    }
    else {
        if (a.item_type === "Unarmed") {
            if (b.item_type === "Unarmed") {
                return nameCompare(a, b);
            }
            else {
                return -1;
            }
        }
        else if (a.item_type === "Light") {
            if (b.item_type === "Unarmed") {
                return 1;
            }
            else if (b.item_type === "Light") {
                return nameCompare(a, b);
            }
            else {
                return -1;
            }
        }
        else if (a.item_type === "One-handed") {
            if (b.item_type === "Unarmed" || b.item_type === "Light") {
                return 1;
            }
            else if (b.item_type === "One-handed") {
                return nameCompare(a, b);
            }
            else {
                return -1;
            }
        }
        else if (a.item_type === "Two-handed") {
            if (b.item_type === "Unarmed" || b.item_type === "Light"
                || b.item_type === "One-handed") {
                return 1;
            }
            else if (b.item_type === "Two-handed") {
                return nameCompare(a, b);
            }
            else {
                return -1;
            }
        }
        else if (a.item_type === "Ranged") {
            if (b.item_type === "Unarmed" || b.item_type === "Light"
                || b.item_type === "One-handed" || b.item_type === "Two-handed") {
                return 1;
            }
            else if (b.item_type === "Ranged") {
                return nameCompare(a, b);
            }
            else {
                return -1;
            }
        }
        else if (a.item_type === "Ammunition") {
            if (b.item_type === "Unarmed" || b.item_type === "Light"
                || b.item_type === "One-handed" || b.item_type === "Two-handed"
                || b.item_type === "Ranged") {
                return 1;
            }
            else if (b.item_type === "Ammunition") {
                return nameCompare(a, b);
            }
            else {
                return -1;
            }
        }
        else {
            throw `Unable to find established comparison for '${a.item_type}' to '${b.item_type}'. Please revise this function if such comparison is desired.`
        }
    }

}

export default equipmentCompare;