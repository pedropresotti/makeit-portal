require('dotenv').config();
const express = require('express');
const pooling = require('./pooling.js');
const util = require('util');
const fs = require('fs');
const PORT = process.env.PORT || 8080;
const readFile = util.promisify(fs.readFile);
require('dotenv').config()


const app = express();
app.set('trust proxy', true);

let pool;
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.get('/', async (req, res) => {


    pool = pool || await pooling.getPool();
    let conn = await pool.getConnection();


    let last_changed_balance_at = await conn.query('SELECT MAX(balance_changed_at) AS last_changed_balance_at FROM balances_current');
    last_changed_balance_at = formatValue(last_changed_balance_at[0].last_changed_balance_at) + ' UTC';



    let _24_change = await conn.query(await readFile('./get_24h_change.sql', 'utf8'));
    _24_change = _24_change[6];


    const crypto_change_24_h = {
        btc: '0.00',
        eth: '0.00',
        eur: '0.00',
        token: '0.00',
        usdt: '0.00',
    };

    for (let i = 0; i < _24_change.length; i++) {

        let _24 = _24_change[i];

        if (_24.currency.toUpperCase() == 'BTC') {
            crypto_change_24_h.btc = formatValue(_24.change_24h);
        }
        if (_24.currency.toUpperCase() == 'ETH') {
            crypto_change_24_h.eth = formatValue(_24.change_24h);
        }
        if (_24.currency.toUpperCase() == 'EUR') {
            crypto_change_24_h.eur = formatValue(_24.change_24h);
        }

        if (_24.currency.toUpperCase() == 'TOKEN') {
            crypto_change_24_h.token = formatValue(_24.change_24h);
        }

        if (_24.currency.toUpperCase() == 'USDT') {
            crypto_change_24_h.usdt = formatValue(_24.change_24h);
        }



    };


    const crypto = {
        btc: '0.00',
        eth: '0.00',
        eur: '0.00',
        token: '0.00',
        usdt: '0.00',
    }

    let balances = await conn.query(await readFile('./get_balances_current.sql', 'utf8'));
    balances = balances[3];

    for (let i = 0; i < balances.length; i++) {

        let balance = balances[i];

        if (balance.currency.toUpperCase() == 'BTC') {
            crypto.btc = formatValue(balance.overall);
        }
        if (balance.currency.toUpperCase() == 'ETH') {
            crypto.eth = formatValue(balance.overall);
        }
        if (balance.currency.toUpperCase() == 'EUR') {
            crypto.eur = formatValue(balance.overall);
        }

        if (balance.currency.toUpperCase() == 'TOKEN') {
            crypto.token = formatValue(balance.overall);
        }

        if (balance.currency.toUpperCase() == 'USDT') {
            crypto.usdt = formatValue(balance.overall);
        }



    };


    
    conn.release();

    res.render('pages/index', {
        crypto: crypto,
        last_changed_balance_at: last_changed_balance_at,
        crypto_change_24_h: crypto_change_24_h
    });

}).listen(PORT, () => console.log(`Listening on ${PORT}`));




const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});


function formatValue(value) {
    if (typeof value === 'number') {
        let number = Number(value).toFixed(2);
        number = formatter.format(number).replace('$', '');
        return number;
    }

    if (Object.prototype.toString.call(value) === "[object Date]") {
        return formatDate(value);
    }

    return value;
}


function formatDate(value) {
    let day = ("0" + value.getDate()).slice(-2);
    let month = ("0" + (value.getMonth() + 1)).slice(-2);
    let year = value.getFullYear();
    let hours = ("0" + value.getHours()).slice(-2);
    let minutes = ("0" + value.getMinutes()).slice(-2);
    let seconds = ("0" + value.getSeconds()).slice(-2);

    const datestring = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    return datestring;
}