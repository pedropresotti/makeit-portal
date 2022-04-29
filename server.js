require('dotenv').config();
const express = require('express');
const pooling = require('./pooling.js');
const PORT = process.env.PORT || 8080;
const query =  require('./query.js');
const culture_usa = require('./culture_usa.js');


const app = express();
app.set('trust proxy', true);

let pool;
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.get('/', async (req, res) => {

       
    pool = pool || await pooling.getPool();
    let conn = await pool.getConnection();
    const dashboard_base_table_name = 'dashboard_base_24h';
    
    
    const dashboard_by_customer_exchange_and_currency = await query.get_dashboard_by_customer_exchange_and_currency(conn, dashboard_base_table_name);
   
    
    const dashboard_by_exchange_and_currency = await query.get_dashboard_by_exchange_and_currency(conn, dashboard_base_table_name);


    const dashboard_by_currency = await query.get_dashboard_by_currency(conn, dashboard_base_table_name);

    
        


    let last_changed_balance_at = await conn.query('SELECT MAX(balance_changed_at) AS last_changed_balance_at FROM balances_current');
    last_changed_balance_at = culture_usa.formatValue(last_changed_balance_at[0].last_changed_balance_at) + ' UTC';




    
    


    
    conn.release();

    res.render('pages/index', {
        dashboard_by_exchange_and_currency: dashboard_by_exchange_and_currency,
        dashboard_by_currency: dashboard_by_currency,
        dashboard_by_customer_exchange_and_currency: dashboard_by_customer_exchange_and_currency,
        last_changed_balance_at: last_changed_balance_at,
        
    });

}).listen(PORT, () => console.log(`Listening on ${PORT}`));

