class CryptoGroup {
    constructor() {
        this.balance_current_btc = "0.00";
        this.balance_current_eth = "0.00";
        this.balance_current_usdt = "0.00";
        this.balance_current_eur = "0.00";
        this.balance_current_token = "0.00";
        
        this.balance_change_btc = "0.00";
        this.balance_change_eth = "0.00";
        this.balance_change_usdt = "0.00";
        this.balance_change_eur = "0.00";
        this.balance_change_token = "0.00";

        this.trading_volume_total_btc = "0.00";
        this.trading_volume_total_eth = "0.00";
        this.trading_volume_total_usdt = "0.00";
        this.trading_volume_total_eur = "0.00";
        this.trading_volume_total_token = "0.00";
        
        
        this.trading_volume_change_btc = "0.00";
        this.trading_volume_change_eth = "0.00";
        this.trading_volume_change_usdt = "0.00";
        this.trading_volume_change_eur = "0.00";
        this.trading_volume_change_token = "0.00";


        this.PNL_total_btc = "0.00";
        this.PNL_total_eth = "0.00";
        this.PNL_total_usdt = "0.00";
        this.PNL_total_eur = "0.00";
        this.PNL_total_token = "0.00";
        
        
        this.PNL_change_btc = "0.00";
        this.PNL_change_eth = "0.00";
        this.PNL_change_usdt = "0.00";
        this.PNL_change_eur = "0.00";
        this.PNL_change_token = "0.00";





        this.trading_volume_usdt_total_btc = "0.00";
        this.trading_volume_usdt_total_eth = "0.00";
        this.trading_volume_usdt_total_usdt = "0.00";
        this.trading_volume_usdt_total_eur = "0.00";
        this.trading_volume_usdt_total_token = "0.00";
        
        
        this.trading_volume_usdt_change_btc = "0.00";
        this.trading_volume_usdt_change_eth = "0.00";
        this.trading_volume_usdt_change_usdt = "0.00";
        this.trading_volume_usdt_change_eur = "0.00";
        this.trading_volume_usdt_change_token = "0.00";




        this.PNL_usdt_total_btc = "0.00";
        this.PNL_usdt_total_eth = "0.00";
        this.PNL_usdt_total_usdt = "0.00";
        this.PNL_usdt_total_eur = "0.00";
        this.PNL_usdt_total_token = "0.00";
        
        
        this.PNL_usdt_change_btc = "0.00";
        this.PNL_usdt_change_eth = "0.00";
        this.PNL_usdt_change_usdt = "0.00";
        this.PNL_usdt_change_eur = "0.00";
        this.PNL_usdt_change_token = "0.00";







    }

}



class CryptoGroupByExchange {

    constructor() {
        this.exchange = "";
        this.crypto_group = new CryptoGroup();

    }
};



class CryptoGroupBy_Customer_And_Exchange {

    constructor() {
        
        this.customer_name = "";
        this.CryptoGroupByExchange = [];
    }
};




module.exports.CryptoGroup = CryptoGroup;
module.exports.CryptoGroupByExchange = CryptoGroupByExchange;
module.exports.CryptoGroupBy_Customer_And_Exchange = CryptoGroupBy_Customer_And_Exchange;
