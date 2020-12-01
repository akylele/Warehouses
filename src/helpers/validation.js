const validator = (value) => {
    switch (typeof value) {
        case 'string':
            return value.length > 0;
        case 'number':
            return value > 0;
        default:
            return false
    }
}

export default validator