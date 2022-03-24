USE makeit;

DROP TEMPORARY TABLE IF EXISTS tmp_token;
CREATE TEMPORARY TABLE tmp_token
AS
(
SELECT change_24h FROM overall_change_24h
WHERE currency NOT IN ('BTC', 'ETH', 'EUR', 'USDT')
);

SELECT currency, change_24h FROM overall_change_24h WHERE currency IN ('BTC', 'ETH', 'EUR', 'USDT')
UNION ALL
SELECT 'TOKEN', SUM(change_24h) AS change_24h FROM tmp_token;