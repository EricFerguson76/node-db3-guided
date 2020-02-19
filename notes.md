# Joins

```sql
SELECT orders.OrderId
	, orders.CustomerId
	, CustomerName
	, orders.OrderDate
  , shippers.ShipperName
  , shippers.Phone
FROM orders
INNER JOIN customers ON orders.customerId = customers.customerId
INNER JOIN shippers ON orders.ShipperId = shippers.ShipperId


SELECT o.OrderId
	, o.CustomerId
	, c.CustomerName
	, o.OrderDate
  , s.ShipperName
  , s.Phone
FROM orders as o
INNER JOIN customers as c ON o.customerId = c.customerId
INNER JOIN shippers as s ON o.ShipperId = s.ShipperId

-- order id, product name, quantiy, price, total (quantiy * price)

SELECT od.OrderID, p.ProductName, od.Quantity, p.Price, (od.Quantity * p.Price) AS Total
FROM OrderDetails as od
JOIN Products as p ON od.ProductID = p.ProductID;


```
