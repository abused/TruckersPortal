function converToMoney(money) {
    if(money) {
        let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });

        return formatter.format(money);
    }

    return '$0.00'
}

export {converToMoney};