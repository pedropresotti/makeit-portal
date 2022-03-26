USE makeit;

DROP TEMPORARY TABLE IF EXISTS change_24;
CREATE TEMPORARY TABLE change_24
AS
(
SELECT currency, overall_before_24h, overall_current, 

CASE 
WHEN (overall_before_24h = 0 AND overall_current > 0) THEN 100
WHEN (overall_before_24h = 0 AND overall_current = 0) THEN 0
ELSE (overall_current/overall_before_24h - 1) * 100 
END AS change_24h FROM overall_change_24h

				 
WHERE currency IN ('BTC', 'ETH', 'EUR', 'USDT')
);

DROP TEMPORARY TABLE IF EXISTS tmp_token;
CREATE TEMPORARY TABLE tmp_token
AS
(
SELECT 'TOKEN' AS currency, SUM(overall_before_24h) AS overall_before_24h, SUM(overall_current) AS overall_current,

CASE 
WHEN (SUM(overall_before_24h) = 0 AND SUM(overall_current) > 0) THEN 100
WHEN (SUM(overall_before_24h) = 0 AND SUM(overall_current) = 0) THEN 0
ELSE (SUM(overall_current)/SUM(overall_before_24h) - 1) * 100 
END AS change_24h FROM overall_change_24h


WHERE currency NOT IN ('BTC', 'ETH', 'EUR', 'USDT')
);

INSERT INTO change_24
SELECT currency, overall_before_24h, overall_current, change_24h FROM tmp_token;



SELECT currency, overall_before_24h, overall_current, change_24h FROM change_24;