const currency_usa = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const formatValue = (value) => {
    if (typeof value === 'number') {
        let number = Number(value).toFixed(2);
        number = currency_usa.format(number).replace('$', '');
        return number;
    }

    if (Object.prototype.toString.call(value) === "[object Date]") {
        return formatDate(value);
    }

    return value;
};

const formatDate = (value) => {
    let day = ("0" + value.getDate()).slice(-2);
    let month = ("0" + (value.getMonth() + 1)).slice(-2);
    let year = value.getFullYear();
    let hours = ("0" + value.getHours()).slice(-2);
    let minutes = ("0" + value.getMinutes()).slice(-2);
    let seconds = ("0" + value.getSeconds()).slice(-2);

    const datestring = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    return datestring;
};



module.exports.formatValue = formatValue;