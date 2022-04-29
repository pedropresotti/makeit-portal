const culture_usa = require('./culture_usa.js');
const crypto_classes = require('./crypto_classes.js');



const get_dashboard_by_customer_exchange_and_currency = async (conn, dashboard_base_table_name) => {


    let distinct = await conn.query('SELECT DISTINCT customer_name, exchange FROM ' + dashboard_base_table_name);

    let dashboard = await conn.query("CALL get_dashboard_by_customer_exchange_and_currency(?)", [dashboard_base_table_name]);

    dashboard = dashboard[0];
    
    const values = [];
    
    
    const unique_customers = [...new Set(dashboard.map(p => p.customer_name))];
    for (let i = 0; i < unique_customers.length; i++) {
        
        
        let customer_name = unique_customers[i];
        let crypto_group_by_customer_and_exchange = new crypto_classes.CryptoGroupBy_Customer_And_Exchange();
        crypto_group_by_customer_and_exchange.customer_name = customer_name;


        let dist = distinct.filter(x => x.customer_name == customer_name);
        

        for (let j = 0; j < dist.length; j++) {
            let exchange = dist[j].exchange;

            let crypto_group_by_exchange = new crypto_classes.CryptoGroupByExchange();
            crypto_group_by_exchange.exchange = exchange;

            let filtered = dashboard.filter(x => x.customer_name == customer_name && x.exchange == exchange);
            let crypto_group = new crypto_classes.CryptoGroup();
            
            for (let k = 0; k < filtered.length; k++) {
                let filt = filtered[k];


                if (filt.currency.toUpperCase() === 'BTC') {
                    crypto_group.balance_current_btc = culture_usa.formatValue(filt.balance_current);
                    crypto_group.balance_change_btc = culture_usa.formatValue(filt.balance_change);
                    crypto_group.trading_volume_total_btc = culture_usa.formatValue(filt.trading_volume_total);
                    crypto_group.trading_volume_change_btc = culture_usa.formatValue(filt.trading_volume_change);
                    crypto_group.PNL_total_btc = culture_usa.formatValue(filt.PNL_total);
                    crypto_group.PNL_change_btc = culture_usa.formatValue(filt.PNL_change);

                    crypto_group.trading_volume_usdt_total_btc = culture_usa.formatValue(filt.trading_volume_usdt_total);
                    crypto_group.trading_volume_usdt_change_btc = culture_usa.formatValue(filt.trading_volume_usdt_change);
                    crypto_group.PNL_usdt_total_btc = culture_usa.formatValue(filt.PNL_usdt_total);
                    crypto_group.PNL_usdt_change_btc = culture_usa.formatValue(filt.PNL_usdt_change);

                }
                if (filt.currency.toUpperCase() === 'ETH') {
                    crypto_group.balance_current_eth = culture_usa.formatValue(filt.balance_current);
                    crypto_group.balance_change_eth = culture_usa.formatValue(filt.balance_change);
                    crypto_group.trading_volume_total_eth = culture_usa.formatValue(filt.trading_volume_total);
                    crypto_group.trading_volume_change_eth = culture_usa.formatValue(filt.trading_volume_change);
                    crypto_group.PNL_total_eth = culture_usa.formatValue(filt.PNL_total);
                    crypto_group.PNL_change_eth = culture_usa.formatValue(filt.PNL_change);



                    crypto_group.trading_volume_usdt_total_eth = culture_usa.formatValue(filt.trading_volume_usdt_total);
                    crypto_group.trading_volume_usdt_change_eth = culture_usa.formatValue(filt.trading_volume_usdt_change);
                    crypto_group.PNL_usdt_total_eth = culture_usa.formatValue(filt.PNL_usdt_total);
                    crypto_group.PNL_usdt_change_eth = culture_usa.formatValue(filt.PNL_usdt_change);



                }
                if (filt.currency.toUpperCase() === 'EUR') {
                    crypto_group.balance_current_eur = culture_usa.formatValue(filt.balance_current);
                    crypto_group.balance_change_eur = culture_usa.formatValue(filt.balance_change);
                    crypto_group.trading_volume_total_eur = culture_usa.formatValue(filt.trading_volume_total);
                    crypto_group.trading_volume_change_eur = culture_usa.formatValue(filt.trading_volume_change);
                    crypto_group.PNL_total_eur = culture_usa.formatValue(filt.PNL_total);
                    crypto_group.PNL_change_eur = culture_usa.formatValue(filt.PNL_change);


                    crypto_group.trading_volume_usdt_total_eur = culture_usa.formatValue(filt.trading_volume_usdt_total);
                    crypto_group.trading_volume_usdt_change_eur = culture_usa.formatValue(filt.trading_volume_usdt_change);
                    crypto_group.PNL_usdt_total_eur = culture_usa.formatValue(filt.PNL_usdt_total);
                    crypto_group.PNL_usdt_change_eur = culture_usa.formatValue(filt.PNL_usdt_change);


                }

                if (filt.currency.toUpperCase() === 'TOKEN') {
                    crypto_group.balance_current_token = culture_usa.formatValue(filt.balance_current);
                    crypto_group.balance_change_token = culture_usa.formatValue(filt.balance_change);
                    crypto_group.trading_volume_total_token = culture_usa.formatValue(filt.trading_volume_total);
                    crypto_group.trading_volume_change_token = culture_usa.formatValue(filt.trading_volume_change);
                    crypto_group.PNL_total_token = culture_usa.formatValue(filt.PNL_total);
                    crypto_group.PNL_change_token = culture_usa.formatValue(filt.PNL_change);



                    crypto_group.trading_volume_usdt_total_token = culture_usa.formatValue(filt.trading_volume_usdt_total);
                    crypto_group.trading_volume_usdt_change_token = culture_usa.formatValue(filt.trading_volume_usdt_change);
                    crypto_group.PNL_usdt_total_token = culture_usa.formatValue(filt.PNL_usdt_total);
                    crypto_group.PNL_usdt_change_token = culture_usa.formatValue(filt.PNL_usdt_change);





                }

                if (filt.currency.toUpperCase() === 'USDT') {
                    crypto_group.balance_current_usdt = culture_usa.formatValue(filt.balance_current);
                    crypto_group.balance_change_usdt = culture_usa.formatValue(filt.balance_change);
                    crypto_group.trading_volume_total_usdt = culture_usa.formatValue(filt.trading_volume_total);
                    crypto_group.trading_volume_change_usdt = culture_usa.formatValue(filt.trading_volume_change);
                    crypto_group.PNL_total_usdt = culture_usa.formatValue(filt.PNL_total);
                    crypto_group.PNL_change_usdt = culture_usa.formatValue(filt.PNL_change);



                    crypto_group.trading_volume_usdt_total_usdt = culture_usa.formatValue(filt.trading_volume_usdt_total);
                    crypto_group.trading_volume_usdt_change_usdt = culture_usa.formatValue(filt.trading_volume_usdt_change);
                    crypto_group.PNL_usdt_total_usdt = culture_usa.formatValue(filt.PNL_usdt_total);
                    crypto_group.PNL_usdt_change_usdt = culture_usa.formatValue(filt.PNL_usdt_change);







                }

            }
            crypto_group_by_exchange.crypto_group = crypto_group;

            crypto_group_by_customer_and_exchange.CryptoGroupByExchange.push(crypto_group_by_exchange);


        }

        values.push(crypto_group_by_customer_and_exchange);




    }



    return values;

};


const get_dashboard_by_currency = async (conn, dashboard_base_table_name) => {

    let dashboard = await conn.query("CALL get_dashboard_by_currency(?)", dashboard_base_table_name);
    dashboard = dashboard[0];


    const crypto_group = new crypto_classes.CryptoGroup();

    for (let i = 0; i < dashboard.length; i++) {


        if (dashboard[i].currency.toUpperCase() === 'BTC') {
            crypto_group.balance_current_btc = culture_usa.formatValue(dashboard[i].balance_current);
            crypto_group.balance_change_btc = culture_usa.formatValue(dashboard[i].balance_change);
            crypto_group.trading_volume_total_btc = culture_usa.formatValue(dashboard[i].trading_volume_total);
            crypto_group.trading_volume_change_btc = culture_usa.formatValue(dashboard[i].trading_volume_change);
            crypto_group.PNL_total_btc = culture_usa.formatValue(dashboard[i].PNL_total);
            crypto_group.PNL_change_btc = culture_usa.formatValue(dashboard[i].PNL_change);


            crypto_group.trading_volume_usdt_total_btc = culture_usa.formatValue(dashboard[i].trading_volume_usdt_total);
            crypto_group.trading_volume_usdt_change_btc = culture_usa.formatValue(dashboard[i].trading_volume_usdt_change);
            crypto_group.PNL_usdt_total_btc = culture_usa.formatValue(dashboard[i].PNL_usdt_total);
            crypto_group.PNL_usdt_change_btc = culture_usa.formatValue(dashboard[i].PNL_usdt_change);


        }
        if (dashboard[i].currency.toUpperCase() === 'ETH') {
            crypto_group.balance_current_eth = culture_usa.formatValue(dashboard[i].balance_current);
            crypto_group.balance_change_eth = culture_usa.formatValue(dashboard[i].balance_change);
            crypto_group.trading_volume_total_eth = culture_usa.formatValue(dashboard[i].trading_volume_total);
            crypto_group.trading_volume_change_eth = culture_usa.formatValue(dashboard[i].trading_volume_change);
            crypto_group.PNL_total_eth = culture_usa.formatValue(dashboard[i].PNL_total);
            crypto_group.PNL_change_eth = culture_usa.formatValue(dashboard[i].PNL_change);


            crypto_group.trading_volume_usdt_total_eth = culture_usa.formatValue(dashboard[i].trading_volume_usdt_total);
            crypto_group.trading_volume_usdt_change_eth = culture_usa.formatValue(dashboard[i].trading_volume_usdt_change);
            crypto_group.PNL_usdt_total_eth = culture_usa.formatValue(dashboard[i].PNL_usdt_total);
            crypto_group.PNL_usdt_change_eth = culture_usa.formatValue(dashboard[i].PNL_usdt_change);

        }
        if (dashboard[i].currency.toUpperCase() === 'EUR') {
            crypto_group.balance_current_eur = culture_usa.formatValue(dashboard[i].balance_current);
            crypto_group.balance_change_eur = culture_usa.formatValue(dashboard[i].balance_change);
            crypto_group.trading_volume_total_eur = culture_usa.formatValue(dashboard[i].trading_volume_total);
            crypto_group.trading_volume_change_eur = culture_usa.formatValue(dashboard[i].trading_volume_change);
            crypto_group.PNL_total_eur = culture_usa.formatValue(dashboard[i].PNL_total);
            crypto_group.PNL_change_eur = culture_usa.formatValue(dashboard[i].PNL_change);

            crypto_group.trading_volume_usdt_total_eur = culture_usa.formatValue(dashboard[i].trading_volume_usdt_total);
            crypto_group.trading_volume_usdt_change_eur = culture_usa.formatValue(dashboard[i].trading_volume_usdt_change);
            crypto_group.PNL_usdt_total_eur = culture_usa.formatValue(dashboard[i].PNL_usdt_total);
            crypto_group.PNL_usdt_change_eur = culture_usa.formatValue(dashboard[i].PNL_usdt_change);


        }

        if (dashboard[i].currency.toUpperCase() === 'TOKEN') {
            crypto_group.balance_current_token = culture_usa.formatValue(dashboard[i].balance_current);
            crypto_group.balance_change_token = culture_usa.formatValue(dashboard[i].balance_change);
            crypto_group.trading_volume_total_token = culture_usa.formatValue(dashboard[i].trading_volume_total);
            crypto_group.trading_volume_change_token = culture_usa.formatValue(dashboard[i].trading_volume_change);
            crypto_group.PNL_total_token = culture_usa.formatValue(dashboard[i].PNL_total);
            crypto_group.PNL_change_token = culture_usa.formatValue(dashboard[i].PNL_change);

            crypto_group.trading_volume_usdt_total_token = culture_usa.formatValue(dashboard[i].trading_volume_usdt_total);
            crypto_group.trading_volume_usdt_change_token = culture_usa.formatValue(dashboard[i].trading_volume_usdt_change);
            crypto_group.PNL_usdt_total_token = culture_usa.formatValue(dashboard[i].PNL_usdt_total);
            crypto_group.PNL_usdt_change_token = culture_usa.formatValue(dashboard[i].PNL_usdt_change);



        }

        if (dashboard[i].currency.toUpperCase() === 'USDT') {
            crypto_group.balance_current_usdt = culture_usa.formatValue(dashboard[i].balance_current);
            crypto_group.balance_change_usdt = culture_usa.formatValue(dashboard[i].balance_change);
            crypto_group.trading_volume_total_usdt = culture_usa.formatValue(dashboard[i].trading_volume_total);
            crypto_group.trading_volume_change_usdt = culture_usa.formatValue(dashboard[i].trading_volume_change);
            crypto_group.PNL_total_usdt = culture_usa.formatValue(dashboard[i].PNL_total);
            crypto_group.PNL_change_usdt = culture_usa.formatValue(dashboard[i].PNL_change);


            crypto_group.trading_volume_usdt_total_usdt = culture_usa.formatValue(dashboard[i].trading_volume_usdt_total);
            crypto_group.trading_volume_usdt_change_usdt = culture_usa.formatValue(dashboard[i].trading_volume_usdt_change);
            crypto_group.PNL_usdt_total_usdt = culture_usa.formatValue(dashboard[i].PNL_usdt_total);
            crypto_group.PNL_usdt_change_usdt = culture_usa.formatValue(dashboard[i].PNL_usdt_change);

        }



    };

    return crypto_group;

};









const get_dashboard_by_exchange_and_currency = async (conn, dashboard_base_table_name) => {


    let overall = await conn.query("CALL get_dashboard_by_exchange_and_currency(?)", [dashboard_base_table_name]);
    overall = overall[0];



    const unique_exchanges = [...new Set(overall.map(p => p.exchange))];
    const values = [];

    for (const exchange of unique_exchanges) {

        let crypto_group_by_exchange = new crypto_classes.CryptoGroupByExchange();
        crypto_group_by_exchange.exchange = exchange;

        let filtered = overall.filter(x => x.exchange === exchange);
        let crypto_group = new crypto_classes.CryptoGroup();
        for (let i = 0; i < filtered.length; i++) {

            let filt = filtered[i];

            if (filt.currency.toUpperCase() === 'BTC') {
                crypto_group.balance_current_btc = culture_usa.formatValue(filt.balance_current);
                crypto_group.balance_change_btc = culture_usa.formatValue(filt.balance_change);
                crypto_group.trading_volume_total_btc = culture_usa.formatValue(filt.trading_volume_total);
                crypto_group.trading_volume_change_btc = culture_usa.formatValue(filt.trading_volume_change);
                crypto_group.PNL_total_btc = culture_usa.formatValue(filt.PNL_total);
                crypto_group.PNL_change_btc = culture_usa.formatValue(filt.PNL_change);


                crypto_group.trading_volume_usdt_total_btc = culture_usa.formatValue(filt.trading_volume_usdt_total);
                crypto_group.trading_volume_usdt_change_btc = culture_usa.formatValue(filt.trading_volume_usdt_change);
                crypto_group.PNL_usdt_total_btc = culture_usa.formatValue(filt.PNL_usdt_total);
                crypto_group.PNL_usdt_change_btc = culture_usa.formatValue(filt.PNL_usdt_change);



            }
            if (filt.currency.toUpperCase() === 'ETH') {
                crypto_group.balance_current_eth = culture_usa.formatValue(filt.balance_current);
                crypto_group.balance_change_eth = culture_usa.formatValue(filt.balance_change);
                crypto_group.trading_volume_total_eth = culture_usa.formatValue(filt.trading_volume_total);
                crypto_group.trading_volume_change_eth = culture_usa.formatValue(filt.trading_volume_change);
                crypto_group.PNL_total_eth = culture_usa.formatValue(filt.PNL_total);
                crypto_group.PNL_change_eth = culture_usa.formatValue(filt.PNL_change);


                crypto_group.trading_volume_usdt_total_eth = culture_usa.formatValue(filt.trading_volume_usdt_total);
                crypto_group.trading_volume_usdt_change_eth = culture_usa.formatValue(filt.trading_volume_usdt_change);
                crypto_group.PNL_usdt_total_eth = culture_usa.formatValue(filt.PNL_usdt_total);
                crypto_group.PNL_usdt_change_eth = culture_usa.formatValue(filt.PNL_usdt_change);



            }
            if (filt.currency.toUpperCase() === 'EUR') {
                crypto_group.balance_current_eur = culture_usa.formatValue(filt.balance_current);
                crypto_group.balance_change_eur = culture_usa.formatValue(filt.balance_change);
                crypto_group.trading_volume_total_eur = culture_usa.formatValue(filt.trading_volume_total);
                crypto_group.trading_volume_change_eur = culture_usa.formatValue(filt.trading_volume_change);
                crypto_group.PNL_total_eur = culture_usa.formatValue(filt.PNL_total);
                crypto_group.PNL_change_eur = culture_usa.formatValue(filt.PNL_change);


                crypto_group.trading_volume_usdt_total_eur = culture_usa.formatValue(filt.trading_volume_usdt_total);
                crypto_group.trading_volume_usdt_change_eur = culture_usa.formatValue(filt.trading_volume_usdt_change);
                crypto_group.PNL_usdt_total_eur = culture_usa.formatValue(filt.PNL_usdt_total);
                crypto_group.PNL_usdt_change_eur = culture_usa.formatValue(filt.PNL_usdt_change);


            }

            if (filt.currency.toUpperCase() === 'TOKEN') {
                crypto_group.balance_current_token = culture_usa.formatValue(filt.balance_current);
                crypto_group.balance_change_token = culture_usa.formatValue(filt.balance_change);
                crypto_group.trading_volume_total_token = culture_usa.formatValue(filt.trading_volume_total);
                crypto_group.trading_volume_change_token = culture_usa.formatValue(filt.trading_volume_change);
                crypto_group.PNL_total_token = culture_usa.formatValue(filt.PNL_total);
                crypto_group.PNL_change_token = culture_usa.formatValue(filt.PNL_change);

                crypto_group.trading_volume_usdt_total_token = culture_usa.formatValue(filt.trading_volume_usdt_total);
                crypto_group.trading_volume_usdt_change_token = culture_usa.formatValue(filt.trading_volume_usdt_change);
                crypto_group.PNL_usdt_total_token = culture_usa.formatValue(filt.PNL_usdt_total);
                crypto_group.PNL_usdt_change_token = culture_usa.formatValue(filt.PNL_usdt_change);


            }

            if (filt.currency.toUpperCase() === 'USDT') {
                crypto_group.balance_current_usdt = culture_usa.formatValue(filt.balance_current);
                crypto_group.balance_change_usdt = culture_usa.formatValue(filt.balance_change);
                crypto_group.trading_volume_total_usdt = culture_usa.formatValue(filt.trading_volume_total);
                crypto_group.trading_volume_change_usdt = culture_usa.formatValue(filt.trading_volume_change);
                crypto_group.PNL_total_usdt = culture_usa.formatValue(filt.PNL_total);
                crypto_group.PNL_change_usdt = culture_usa.formatValue(filt.PNL_change);


                crypto_group.trading_volume_usdt_total_usdt = culture_usa.formatValue(filt.trading_volume_usdt_total);
                crypto_group.trading_volume_usdt_change_usdt = culture_usa.formatValue(filt.trading_volume_usdt_change);
                crypto_group.PNL_usdt_total_usdt = culture_usa.formatValue(filt.PNL_usdt_total);
                crypto_group.PNL_usdt_change_usdt = culture_usa.formatValue(filt.PNL_usdt_change);
            }
        }

        crypto_group_by_exchange.crypto_group = crypto_group;

        values.push(crypto_group_by_exchange);

    };



    return values;

};





module.exports.get_dashboard_by_currency = get_dashboard_by_currency;
module.exports.get_dashboard_by_exchange_and_currency = get_dashboard_by_exchange_and_currency;
module.exports.get_dashboard_by_customer_exchange_and_currency = get_dashboard_by_customer_exchange_and_currency;

