<?php
header('Content-Type: application/json; charset=utf-8');
// require_once 'config_origin.php';
include 'config.php';
$conn = connectToDatabase('supplier');

// 处理跨域请求
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// 响应函数
function sendResponse($status, $message, $data = null) {
    $response = [
        'status' => $status,
        'message' => $message
    ];
    if ($data !== null) {
        $response['data'] = $data;
    }
    echo json_encode($response);
    exit;
}

// // 获取原材料库存数据
// function getMaterialInventory($conn) {
//     try {
//         $inventory = $conn->query("SELECT * FROM MaterialInventory")->fetchAll(PDO::FETCH_ASSOC);
//         return ['inventory_data' => $inventory];
//     } catch (PDOException $e) {
//         throw new Exception('获取原材料库存失败: ' . $e->getMessage());
//     }
// }

// 获取原材料库存数据函数，添加过滤条件
function getMaterialInventory($conn, $filters = []) {
    try {
        // 构建基础查询
        $sql = "SELECT * FROM Material_Inventory_View WHERE 1=1";
        $params = [];
        
        // 添加过滤条件
        if (isset($filters['material_id'])) {
            $sql .= " AND (material_id = ? OR ? IS NULL)";
            $params[] = $filters['material_id'];
            $params[] = $filters['material_id'];
        }
        
        if (isset($filters['quantity_in_stock'])) {
            $sql .= " AND (quantity_in_stock = ? OR ? IS NULL)";
            $params[] = $filters['quantity_in_stock'];
            $params[] = $filters['quantity_in_stock'];
        }
        
        if (isset($filters['warehouse_location'])) {
            $sql .= " AND (warehouse_location LIKE ? OR ? IS NULL)";
            $params[] = "%{$filters['warehouse_location']}%";
            $params[] = $filters['warehouse_location'];
        }
        
        if (isset($filters['last_updated'])) {
            $sql .= " AND (last_updated = ? OR ? IS NULL)";
            $params[] = $filters['last_updated'];
            $params[] = $filters['last_updated'];
        }
        
        if (isset($filters['location'])) {
            $sql .= " AND (location LIKE ? OR ? IS NULL)";
            $params[] = "%{$filters['location']}%";
            $params[] = $filters['location'];
        }
        
        $stmt = $conn->prepare($sql);
        $stmt->execute($params);
        return ['inventory_data' => $stmt->fetchAll(PDO::FETCH_ASSOC)];
    } catch (PDOException $e) {
        throw new Exception('获取原材料库存失败: ' . $e->getMessage());
    }
}

// 获取原材料库存历史记录
function getMaterialInventoryHistory($conn, $materialId) {
    try {
        $stmt = $conn->prepare("
            SELECT *
            FROM Material_Inventory_With_History
            WHERE material_id = ?
        ");
        $stmt->execute([$materialId]);
        return ['history_data' => $stmt->fetchAll(PDO::FETCH_ASSOC)];
    } catch (PDOException $e) {
        throw new Exception('获取原材料库存历史失败: ' . $e->getMessage());
    }
}
// ORDER BY history_record ASC

// // 获取供应商采购信息
// function getSupplierPurchaseDetails($conn) {
//     try {
//         $details = $conn->query("SELECT * FROM Supplier_Purchase_Details")->fetchAll(PDO::FETCH_ASSOC);
//         return ['purchase_details' => $details];
//     } catch (PDOException $e) {
//         throw new Exception('获取供应商采购详情失败: ' . $e->getMessage());
//     }
// }

// 修改获取供应商采购信息函数
function getSupplierPurchaseDetails($conn) {
    try {
        $stmt = $conn->prepare("
            SELECT * FROM Supplier_Purchase_Details 
        ");
        $stmt->execute();
        return ['purchase_details' => $stmt->fetchAll(PDO::FETCH_ASSOC)];
    } catch (PDOException $e) {
        throw new Exception('获取供应商采购详情失败: ' . $e->getMessage());
    }
}

// // 获取供应商采购汇总
// function getSupplierPurchaseSummary($conn) {
//     try {
//         $summary = $conn->query("SELECT * FROM Supplier_Purchase_Summary")->fetch(PDO::FETCH_ASSOC);
//         return ['summary_data' => $summary];
//     } catch (PDOException $e) {
//         throw new Exception('获取供应商采购汇总失败: ' . $e->getMessage());
//     }
// }

// 修改获取供应商采购汇总函数
// function getSupplierPurchaseSummary($conn) {
//     try {
//         $supplierId = $_SESSION['user_id'];
        
//         $stmt = $conn->prepare("
//             SELECT 
//                 SUM(total_cost) AS total_cost_sum,
//                 COUNT(CASE WHEN status != 'delivered' THEN 1 END) AS non_delivered_count,
//                 MAX(order_date) AS latest_order
//             FROM Supplier_Purchase 
//             // WHERE supplier_id = ?
//         ");
//         $stmt->execute([$supplierId]);
//         return ['summary_data' => $stmt->fetch(PDO::FETCH_ASSOC)];
//     } catch (PDOException $e) {
//         throw new Exception('获取供应商采购汇总失败: ' . $e->getMessage());
//     }
// }
function getSupplierPurchaseSummary($conn) {
    try {
        $stmt = $conn->prepare("SELECT * FROM Supplier_Purchase_Summary");
        $stmt->execute();
        return ['summary_data' => $stmt->fetch(PDO::FETCH_ASSOC)];
    } catch (PDOException $e) {
        throw new Exception('获取供应商采购汇总失败: ' . $e->getMessage());
    }
}

// 添加新函数用于生成 purchase_id
function generateNewPurchaseId($conn) {
    $stmt = $conn->query("SELECT MAX(purchase_id) as max_id FROM Supplier_Purchase_Details");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    return ($result['max_id'] ?? 0) + 1;
}

// 创建原材料订单
function createMaterialPurchase($purchaseId, $supplierId, $materialId, $orderDate, $deliveryDate, $quantity, $totalCost, $status) {
    global $conn;

    $stmt = $conn->prepare("CALL InsertSupplierPurchase(?, ?, ?, ?, ?, ?, ?, ?)");
    
    $stmt->bindValue(1, $purchaseId, PDO::PARAM_INT);
    $stmt->bindValue(2, $supplierId, PDO::PARAM_INT);
    $stmt->bindValue(3, $materialId, PDO::PARAM_INT);
    $stmt->bindValue(4, $orderDate, PDO::PARAM_STR);
    $stmt->bindValue(5, $deliveryDate, PDO::PARAM_STR);
    $stmt->bindValue(6, $quantity, PDO::PARAM_INT);
    $stmt->bindValue(7, $totalCost, PDO::PARAM_STR);
    $stmt->bindValue(8, $status, PDO::PARAM_STR);

    if ($stmt->execute()) {
        sendResponse('success', '订单创建成功');
    } else {
        sendResponse('error', '订单创建失败: ' . $stmt->error);
    }
}

// 更新原材料订单
function updateMaterialPurchase($purchaseId, $orderDate, $deliveryDate, $quantity, $totalCost, $status) {
    global $conn;
    
    $stmt = $conn->prepare("CALL UpdateSupplierPurchase(?, ?, ?, ?, ?, ?)");

    $stmt->bindValue(1, $purchaseId, PDO::PARAM_INT);
    $stmt->bindValue(2, $orderDate, PDO::PARAM_STR);
    $stmt->bindValue(3, $deliveryDate, PDO::PARAM_STR);
    $stmt->bindValue(4, $quantity, PDO::PARAM_INT);
    $stmt->bindValue(5, $totalCost, PDO::PARAM_STR);
    $stmt->bindValue(6, $status, PDO::PARAM_STR);

    if ($stmt->execute()) {
        sendResponse('success', '订单更新成功');
    } else {
        sendResponse('error', '订单更新失败: ' . $stmt->error);
    }
}

// 删除原材料订单
function deleteMaterialPurchase($conn, $purchaseId) {
    try {
        $stmt = $conn->prepare("CALL deletePurchaseById(?)");
        // $stmt->execute([$purchaseId]);
        $stmt->bindValue(1, $purchaseId, PDO::PARAM_INT);
        $stmt->execute();
        return ['success' => true];
    } catch (PDOException $e) {
        throw new Exception('删除原材料订单失败: ' . $e->getMessage());
    }
}

// 获取订单信息
function getPurchaseDetails($conn, $purchaseId) {
    try {
        $stmt = $conn->prepare("
            SELECT name, contact_info, location 
            FROM SupplierPurchaseDetails 
            WHERE purchase_id = ?
        ");
        $stmt->execute([$purchaseId]);
        return ['supplier_info' => $stmt->fetch(PDO::FETCH_ASSOC)];
    } catch (PDOException $e) {
        throw new Exception('获取供应商信息失败: ' . $e->getMessage());
    }
}

// 获取原材料信息
function getRawMaterialInventory($conn) {
    try {
        $inventory = $conn->query("SELECT * FROM RawMaterialInventory")->fetchAll(PDO::FETCH_ASSOC);
        return ['raw_material_inventory' => $inventory];
    } catch (PDOException $e) {
        throw new Exception('获取原材料信息失败: ' . $e->getMessage());
    }
}

// 主要路由逻辑
$method = $_SERVER['REQUEST_METHOD'];
$urlPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$pathSegments = explode('/', trim($urlPath, '/'));
$input = json_decode(file_get_contents('php://input'), true);

try {
    // 验证供应商权限
    // checkSupplierAuth();
    switch ($method) {
        case 'GET':
            switch ($pathSegments[1] ?? '') {
                case 'inventory':
                    // 从查询字符串获取过滤参数
                    $filters = [
                        'material_id' => $input['material_id'] ?? null,
                        'quantity_in_stock' => $input['quantity_in_stock'] ?? null,
                        'last_updated' => $input['last_updated'] ?? null,
                        'location' => $input['location'] ?? null
                    ];
                    $data = getMaterialInventory($conn, $filters);
                    break;
                case 'inventory-history':
                    $materialId = $_GET['material_id'] ?? null;
                    if (!$materialId) {
                        throw new Exception('缺少material_id参数');
                    }
                    $data = getMaterialInventoryHistory($conn, $materialId);
                    break;
                case 'purchase&supplier-details':
                    $data = getSupplierPurchaseDetails($conn);
                    break;
                case 'purchase-summary':
                    $data = getSupplierPurchaseSummary($conn);
                    break;
                case 'supplier-details':
                    $data = getSupplierPurchaseDetails($conn);
                    break;
                case 'raw-material':
                    $data = getRawMaterialInventory($conn);
                    break;
                case 'purchase-details':
                    $purchaseId = $_GET['purchase_id'] ?? null;
                    if (!$purchaseId) {
                        throw new Exception('缺少purchase_id参数');
                    }
                    $data = getPurchaseDetails($conn, $purchaseId);
                    break;
                default:
                    throw new Exception('无效的请求路径');
            }
            sendResponse('success', '数据获取成功', $data);
            break;

        case 'POST':
            if ($pathSegments[1] === 'purchase') {
                $data = json_decode(file_get_contents('php://input'), true);
                if (isset($data['supplier_id'], $data['material_id'], 
                    $data['order_date'], $data['delivery_date'], $data['quantity'], 
                    $data['total_cost'], $data['status'])) {
                    
                    // 自动生成 purchase_id
                    $newPurchaseId = generateNewPurchaseId($conn);
                    
                    createMaterialPurchase(
                        $newPurchaseId,
                        $data['supplier_id'],
                        $data['material_id'],
                        $data['order_date'],
                        $data['delivery_date'],
                        $data['quantity'],
                        $data['total_cost'],
                        $data['status']
                    );
                } else {
                    sendResponse('error', '缺少必要参数');
                }
            }
            break;
            
        case 'PUT':
            if ($pathSegments[1] === 'purchase' && isset($pathSegments[2])) {
                $rawData = file_get_contents('php://input');
                error_log("Received raw data: " . $rawData); // 添加调试日志
                
                $data = json_decode($rawData, true);
                if ($data === null) {
                    error_log("JSON decode error: " . json_last_error_msg());
                    sendResponse('error', 'Invalid JSON data');
                }
                
                if (isset($data['order_date'], $data['delivery_date'], 
                    $data['quantity'], $data['total_cost'], $data['status'])) {
                    updateMaterialPurchase(
                        $pathSegments[2],
                        $data['order_date'],
                        $data['delivery_date'],
                        $data['quantity'],
                        $data['total_cost'],
                        $data['status']
                    );
                } else {
                    sendResponse('error', '缺少必要参数');
                }
            }
            break;

        case 'DELETE':
            if ($pathSegments[1] === 'purchase' && isset($pathSegments[2])) {
                $data = deleteMaterialPurchase($conn, $pathSegments[2]);
                sendResponse('success', '原材料订单删除成功', $data);
            }
            break;

        default:
            sendResponse('error', '不支持的请求方法');
    }
} catch (Exception $e) {
    sendResponse('error', $e->getMessage());
}
?>