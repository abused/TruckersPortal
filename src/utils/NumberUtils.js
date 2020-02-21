function converToMoney(money) {
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    return formatter.format(money);
}

export {converToMoney};