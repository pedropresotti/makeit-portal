USE makeit;

DROP TEMPORARY TABLE IF EXISTS tmp_token;
CREATE TEMPORARY TABLE tmp_token
AS
(
SELECT currency, SUM(balance) AS overall FROM balances_current WHERE currency NOT IN ('BTC', 'ETH', 'EUR', 'USDT') GROUP BY currency
);

SELECT currency, SUM(balance) AS overall FROM balances_current WHERE currency IN ('BTC', 'ETH', 'EUR', 'USDT') GROUP BY currency

UNION ALL 
SELECT 'TOKEN' as currency, SUM(overall) AS overall FROM tmp_token;