DELIMITER $$
CREATE PROCEDURE `get_dashboard_by_exchange_and_currency`(IN dashboard_base_table_name VARCHAR(45))
BEGIN


DROP TEMPORARY TABLE IF EXISTS tmp;
SET @t1 =CONCAT('CREATE TEMPORARY TABLE tmp AS (SELECT * FROM ', dashboard_base_table_name, ')');
 PREPARE stmt3 FROM @t1;
 EXECUTE stmt3;
 DEALLOCATE PREPARE stmt3;
 DROP TEMPORARY TABLE IF EXISTS overall;


CREATE TEMPORARY TABLE overall
AS
(
SELECT exchange, currency, SUM(balance_before) AS balance_before, SUM(balance_current) AS balance_current, 

CASE 
WHEN (SUM(balance_before) = 0 AND SUM(balance_current) > 0) THEN 100
WHEN (SUM(balance_before) = 0 AND SUM(balance_current) < 0) THEN -100
WHEN (SUM(balance_before) = 0 AND SUM(balance_current) = 0) THEN 0
ELSE (SUM(balance_current)/SUM(balance_before) - 1) * 100 
END AS balance_change,


SUM(trading_volume_total) AS trading_volume_total, 
SUM(trading_volume_before) AS trading_volume_before, 
SUM(trading_volume_current) AS trading_volume_current,
SUM(PNL_total) AS PNL_total,
SUM(PNL_before) AS PNL_before,
SUM(PNL_current) AS PNL_current,

SUM(trading_volume_usdt_total) AS trading_volume_usdt_total, 
SUM(trading_volume_usdt_before) AS trading_volume_usdt_before, 
SUM(trading_volume_usdt_current) AS trading_volume_usdt_current,
SUM(PNL_usdt_total) AS PNL_usdt_total,
SUM(PNL_usdt_before) AS PNL_usdt_before,
SUM(PNL_usdt_current) AS PNL_usdt_current,


CASE 
WHEN (SUM(trading_volume_before) = 0 AND SUM(trading_volume_current) > 0) THEN 100
WHEN (SUM(trading_volume_before) = 0 AND SUM(trading_volume_current) < 0) THEN -100
WHEN (SUM(trading_volume_before) = 0 AND SUM(trading_volume_current) = 0) THEN 0
ELSE (SUM(trading_volume_current)/SUM(trading_volume_before) - 1) * 100 
END AS trading_volume_change,

CASE 
WHEN (SUM(PNL_before) = 0 AND SUM(PNL_current) > 0) THEN 100
WHEN (SUM(PNL_before) = 0 AND SUM(PNL_current) < 0) THEN -100
WHEN (SUM(PNL_before) = 0 AND SUM(PNL_current) = 0) THEN 0
ELSE (SUM(PNL_current)-SUM(PNL_before))/abs(SUM(PNL_before)) * 100 
END AS PNL_change,


CASE 
WHEN (SUM(trading_volume_usdt_before) = 0 AND SUM(trading_volume_usdt_current) > 0) THEN 100
WHEN (SUM(trading_volume_usdt_before) = 0 AND SUM(trading_volume_usdt_current) < 0) THEN -100
WHEN (SUM(trading_volume_usdt_before) = 0 AND SUM(trading_volume_usdt_current) = 0) THEN 0
ELSE (SUM(trading_volume_usdt_current)/SUM(trading_volume_usdt_before) - 1) * 100 
END AS trading_volume_usdt_change,

CASE 
WHEN (SUM(PNL_usdt_before) = 0 AND SUM(PNL_usdt_current) > 0) THEN 100
WHEN (SUM(PNL_usdt_before) = 0 AND SUM(PNL_usdt_current) < 0) THEN -100
WHEN (SUM(PNL_usdt_before) = 0 AND SUM(PNL_usdt_current) = 0) THEN 0
ELSE (SUM(PNL_usdt_current)-SUM(PNL_usdt_before))/abs(SUM(PNL_usdt_before)) * 100 
END AS PNL_usdt_change



FROM tmp				 
WHERE currency IN ('BTC', 'ETH', 'EUR', 'USDT')

GROUP BY exchange, currency
);

INSERT INTO overall
SELECT exchange, 'TOKEN' AS currency, SUM(balance_before) AS balance_before, SUM(balance_current) AS balance_current, 

CASE 
WHEN (SUM(balance_before) = 0 AND SUM(balance_current) > 0) THEN 100
WHEN (SUM(balance_before) = 0 AND SUM(balance_current) < 0) THEN -100
WHEN (SUM(balance_before) = 0 AND SUM(balance_current) = 0) THEN 0
ELSE (SUM(balance_current)/SUM(balance_before) - 1) * 100 
END AS balance_change,


SUM(trading_volume_total) AS trading_volume_total, 
SUM(trading_volume_before) AS trading_volume_before, 
SUM(trading_volume_current) AS trading_volume_current,
SUM(PNL_total) AS PNL_total,
SUM(PNL_before) AS PNL_before,
SUM(PNL_current) AS PNL_current,

SUM(trading_volume_usdt_total) AS trading_volume_usdt_total, 
SUM(trading_volume_usdt_before) AS trading_volume_usdt_before, 
SUM(trading_volume_usdt_current) AS trading_volume_usdt_current,
SUM(PNL_usdt_total) AS PNL_usdt_total,
SUM(PNL_usdt_before) AS PNL_usdt_before,
SUM(PNL_usdt_current) AS PNL_usdt_current,



CASE 
WHEN (SUM(trading_volume_before) = 0 AND SUM(trading_volume_current) > 0) THEN 100
WHEN (SUM(trading_volume_before) = 0 AND SUM(trading_volume_current) < 0) THEN -100
WHEN (SUM(trading_volume_before) = 0 AND SUM(trading_volume_current) = 0) THEN 0
ELSE (SUM(trading_volume_current)/SUM(trading_volume_before) - 1) * 100 
END AS trading_volume_change,

CASE 
WHEN (SUM(PNL_before) = 0 AND SUM(PNL_current) > 0) THEN 100
WHEN (SUM(PNL_before) = 0 AND SUM(PNL_current) < 0) THEN -100
WHEN (SUM(PNL_before) = 0 AND SUM(PNL_current) = 0) THEN 0
ELSE (SUM(PNL_current)-SUM(PNL_before))/abs(SUM(PNL_before)) * 100 
END AS PNL_change,



CASE 
WHEN (SUM(trading_volume_usdt_before) = 0 AND SUM(trading_volume_usdt_current) > 0) THEN 100
WHEN (SUM(trading_volume_usdt_before) = 0 AND SUM(trading_volume_usdt_current) < 0) THEN -100
WHEN (SUM(trading_volume_usdt_before) = 0 AND SUM(trading_volume_usdt_current) = 0) THEN 0
ELSE (SUM(trading_volume_usdt_current)/SUM(trading_volume_usdt_before) - 1) * 100 
END AS trading_volume_usdt_change,

CASE 
WHEN (SUM(PNL_usdt_before) = 0 AND SUM(PNL_usdt_current) > 0) THEN 100
WHEN (SUM(PNL_usdt_before) = 0 AND SUM(PNL_usdt_current) < 0) THEN -100
WHEN (SUM(PNL_usdt_before) = 0 AND SUM(PNL_usdt_current) = 0) THEN 0
ELSE (SUM(PNL_usdt_current)-SUM(PNL_usdt_before))/abs(SUM(PNL_usdt_before)) * 100 
END AS PNL_usdt_change



FROM tmp				 
WHERE currency NOT IN ('BTC', 'ETH', 'EUR', 'USDT')
GROUP BY exchange;

DROP TEMPORARY TABLE IF EXISTS tmp;
SELECT * FROM overall ORDER BY exchange, currency;



END$$
DELIMITER ;
