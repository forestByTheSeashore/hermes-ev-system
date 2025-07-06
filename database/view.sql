-- view


-- customer main page
CREATE VIEW CustomerCarPurchaseView AS
SELECT 
    m.model_id,                                
    m.model_name,        	      
    m.base_price,                        
    i.quantity_in_stock,                   -- (might be NULL）
    s.location AS store_location           -- 
FROM 
    Model m
CROSS JOIN 
    Store s                                -- ensure every store show all model
LEFT JOIN 
    Inventory i ON s.model_id = i.model_id AND s.location = i.warehouse_location;
    
-- customer order
CREATE VIEW CustomerOrderDetails AS
SELECT 
    co.store_id,                    -- 交付店名
    co.customer_id,
    co.order_date,                  -- 下单时间
    co.delivery_date,               -- 送达时间
    otm.model_id,                    -- 车选配信息 
    v.vehicle_id					-- 车辆编号
FROM 
    Customer_Order co
JOIN 
    OrderToModel otm ON co.order_id = otm.order_id
LEFT JOIN 
    Vehicle v ON co.customer_id = v.owner_id;
    
    
-- for salesman: all order in a store
CREATE VIEW ALL_Order AS
SELECT 
    co.order_id,  
    co.store_id
FROM 
    Customer_Order co;
  
  
  
-- all order imformation in a store
CREATE VIEW Customer_Order_View AS
SELECT 
    co.order_id,               
    co.order_date,                
    co.delivery_date,        -- 多久送达     
    co.total_amount,              
    co.customer_id,               
    c.name AS customer_name       
FROM 
    Customer_Order co
JOIN 
    Customer c ON co.customer_id = c.customer_id;    


-- model information
CREATE VIEW Vehicle_Model_View AS
SELECT
    v.vehicle_id,
    v.model_id,
    m.total_price
FROM
    Vehicle v
JOIN
    Model m ON v.model_id = m.model_id;
    
    
-- rawmaterial inventory
CREATE VIEW Material_Inventory_With_History AS
SELECT 
    location,
    quantity_in_stock,
    history_record    -- 
FROM 
    Material_Inventory;
    
    
    
    
 -- rawmaterial order
CREATE VIEW Supplier_Purchase_Details AS
SELECT
    sp.material_id,
    sp.purchase_id,
    sp.supplier_id,
    sp.order_date,
    sp.delivery_date,
    sp.quantity,
    r.unit_price,
    sp.total_cost,
    sp.status
FROM 
    Supplier_Purchase sp
JOIN 
    SupplierToMaterial stm ON sp.material_id = stm.material_id
JOIN 
    RawMaterial r ON stm.material_id = r.material_id;
    
CREATE INDEX idx_supplier_to_material_supplier_id ON SupplierToMaterial(supplier_id);
CREATE INDEX idx_supplier_to_material_material_id ON SupplierToMaterial(material_id);



CREATE VIEW Supplier_Purchase_Summary AS
SELECT 
    SUM(sp.total_cost) AS total_cost_sum,    -- amount of total_coust
    COUNT(CASE WHEN sp.status != 'delivered' THEN 1 END) AS non_delivered_count,  -- amount that status is not 'delivered'
    (SELECT sp2.order_date
     FROM Supplier_Purchase sp2
     ORDER BY sp2.order_date DESC
     LIMIT 1) AS latest_order  --  order_date of newest order
FROM 
    Supplier_Purchase sp;
    
    
    
-- update rawmaterial order
DELIMITER //

CREATE PROCEDURE UpdateSupplierPurchase(
    IN p_purchase_id INT,               -- 订单 ID
    IN p_order_date DATE,               -- 订单日期
    IN p_delivery_date DATE,            -- 交货日期
    IN p_quantity INT,                  -- 数量
    IN p_total_cost DECIMAL(10, 2),     -- 总成本
    IN p_status VARCHAR(50)             -- 状态
)
BEGIN
    -- 动态更新字段，根据输入参数的不同来决定是否更新
    UPDATE Supplier_Purchase
    SET 
        order_date = IFNULL(p_order_date, order_date),         -- 如果传入空值，保持原值
        delivery_date = IFNULL(p_delivery_date, delivery_date),
        quantity = IFNULL(p_quantity, quantity),
        total_cost = IFNULL(p_total_cost, total_cost),
        status = IFNULL(p_status, status)
    WHERE purchase_id = p_purchase_id;
END //

DELIMITER ;


-- supplier information
CREATE VIEW SupplierPurchaseDetails AS
SELECT 
  s.name,
  s.contact_info,
  s.location
FROM 
  Supplier s
JOIN SupplierToMaterial stm ON s.supplier_id = stm.supplier_id   
JOIN Supplier_Purchase sp ON sp.supplier_id = stm.supplier_id;
    
    
    
-- rawmaterial information
CREATE VIEW RawMaterialInventory AS
SELECT 
  r.name,               
  r.unit_price,         
  r.annual_demand,      
  mi.location           
FROM 
  RawMaterial r
JOIN 
  Material_Inventory mi ON mi.material_id = r.material_id;
  
  
 -- model annual sale
 CREATE VIEW ModelAnnualSales AS
SELECT 
  model_name,
  annual_sales
FROM
  Model;



-- summary of all facotry's product
CREATE VIEW FactoryProductionSummary AS
SELECT 
    f.name AS factory_name,
    SUM(ftm.quantity_produced) AS total_quantity_produced
FROM 
    Factory f
JOIN 
    FactoryToModel ftm ON f.factory_id = ftm.factory_id
GROUP BY 
    f.name;
    
   
   
   -- search inventory by locaion
DELIMITER //

CREATE PROCEDURE GetModelStockByLocation(
    IN warehouseLocation VARCHAR(100)
)
BEGIN
    SELECT 
        model_id,
        SUM(quantity_in_stock) AS total_stock
    FROM 
        Inventory
    WHERE 
        warehouse_location = warehouseLocation -- 使用参数
    GROUP BY 
        model_id;
END //

DELIMITER ;



CREATE VIEW EmployeeDetails AS
SELECT 
    e.employee_id AS EmployeeID,
    e.name AS EmployeeName,
    d.name AS DepartmentName, 
    b.name AS BranchName,     
    e.phone AS PhoneNumber,
    e.salary AS Salary
FROM 
    Employee e
JOIN 
    Department d ON e.department_id = d.department_id
JOIN 
    Branch b ON e.branch_id = b.branch_id
ORDER BY 
    e.name DESC;