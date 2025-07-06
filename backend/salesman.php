<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
include 'config.php';

// 根据用户角色连接数据库
//$conn = connectToDatabase('salesman');
$conn = connectAsAuthUser();

// 通用函数：发送 JSON 响应
function sendResponse($status, $message, $data = []) {
    header('Content-Type: application/json');
    echo json_encode(['status' => $status, 'message' => $message, 'data' => $data]);
    exit;
}

// 查询店里所有订单及其详细信息（根据 store_id）
function getAllInfor($storeId) {
    global $conn;

    $stmt = $conn->prepare("SELECT * FROM ALL_Info WHERE store_id = ?");
    $stmt->bindValue(1, $storeId, PDO::PARAM_INT);

    $stmt->execute();
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);  // 使用 fetchAll 来获取多个结果
    
    sendResponse('success', '获取店铺订单成功', $orders);
}

// 查询店里所有订单（根据 store_id）
function getAllOrdersByStoreId($storeId) {
    global $conn;

    $stmt = $conn->prepare("SELECT order_id FROM ALL_Order WHERE store_id = ?");
    $stmt->bindValue(1, $storeId, PDO::PARAM_INT);

    $stmt->execute();
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);  // 使用 fetchAll 来获取多个结果

    sendResponse('success', '获取店铺订单成功', $orders);
}

// 查询店里订单的所有信息（根据 order_id）
function getOrderDetailsByOrderId($orderId) {
    global $conn;

    $stmt = $conn->prepare("SELECT * FROM Customer_Order_View WHERE order_id = ?");
    $stmt->bindValue(1, $orderId, PDO::PARAM_INT);

    $stmt->execute();

    $orderDetails = $stmt->fetch(PDO::FETCH_ASSOC);  // 使用 fetch 来获取单一结果

    if ($orderDetails) {
        sendResponse('success', '获取订单详情成功', $orderDetails);
    } else {
        sendResponse('error', '未找到对应的订单详情');
    }
}

// 创建订单
function createOrder($orderId, $customerId, $storeId, $orderDate, $deliveryDate, $totalAmount, $status) {
    global $conn;

    $stmt = $conn->prepare("
    INSERT INTO CustomerOrderInsertView (order_id, customer_id, store_id, order_date, delivery_date, total_amount, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->bindValue(1, $orderId, PDO::PARAM_INT);
    $stmt->bindValue(2, $customerId, PDO::PARAM_INT);
    $stmt->bindValue(3, $storeId, PDO::PARAM_INT);
    $stmt->bindValue(4, $orderDate, PDO::PARAM_STR);
    $stmt->bindValue(5, $deliveryDate, PDO::PARAM_STR);
    $stmt->bindValue(6, $totalAmount, PDO::PARAM_STR);
    $stmt->bindValue(7, $status, PDO::PARAM_STR);

    if ($stmt->execute()) {
        sendResponse('success', '订单创建成功');
    } else {
        sendResponse('error', '订单创建失败: ' . $stmt->error);
    }
}

// 查询车型信息（根据 vehicle_id）
function getVehicleInfoByVehicleId($vehicleId) {
    global $conn;

    $stmt = $conn->prepare("SELECT * FROM Vehicle_Model_View WHERE vehicle_id = ?");
    $stmt->bindValue(1, $vehicleId, PDO::PARAM_INT);

    $stmt->execute();

    $vehicleInfo = $stmt->fetch(PDO::FETCH_ASSOC);  // 使用 fetch 来获取单一结果

    if ($vehicleInfo) {
        sendResponse('success', '获取车辆信息成功', $vehicleInfo);
    } else {
        sendResponse('error', '未找到对应的车型信息');
    }
}

function getCustomerIDList(){
    global $conn;
    $stmt = $conn->prepare("SELECT customer_id FROM Customer_Ids_View");
    $stmt->execute();
    $customerID = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if ($customerID) {
        sendResponse('success', '获取顾客IDList成功', $customerID);
    } else {
        sendResponse('error', '未获取顾客IDList');
    }
}

function getStoreIDList(){
    global $conn;
    $stmt = $conn->prepare("SELECT store_id FROM Store_Ids_View");
    $stmt->execute();
    $storeID = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if ($storeID) {
        sendResponse('success', '获取店铺IDList成功', $storeID);
    } else {
        sendResponse('error', '未获取店铺IDList');
    }
}

function getStoreId($salesmanId) {
    global $conn;

    $stmt = $conn->prepare("SELECT storeid FROM Employee_Store_View WHERE eplyid = ?");
    $stmt->bindValue(1, $salesmanId, PDO::PARAM_INT);
    $stmt->execute();

    $storeId = $stmt->fetchAll(PDO::FETCH_ASSOC);  // 使用 fetch 来获取单一结果

    if ($storeId) {
        return $storeId;
    } else {
        return null;
    }
}

// 路由分发
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$pathSegments = explode('/', trim($path, '/'));
$salesmanId = $pathSegments[2]??null;

// // 先分割路径和查询字符串
// $parsed_url = parse_url($_SERVER['REQUEST_URI']);
// // 解析查询字符串部分
// parse_str($parsed_url['query'], $query_params);
// $salesmanId = $query_params['salesman_id'];
$storeId = getStoreId($salesmanId);

switch ($method) {
    case 'GET':
        switch ($pathSegments[1] ?? '') {
            case 'orders':
                if (isset($pathSegments[2])) {
                    getOrderDetailsByOrderId($pathSegments[2]);
                }else {
                    sendResponse('error', '缺少 order_id 参数');
                }
                break;
            case 'storeOrders':
                if ($storeId) {
                    getAllOrdersByStoreId($storeId);
                } else {
                    sendResponse('error', '缺少 store_id 参数');
                }
                break;
            case 'storeAllInfo':
                if ($storeId) {
                    getAllInfor($storeId);
                } else {
                    sendResponse('error', '缺少 store_id 参数');
                }
                break;
            case 'vehicle':
                if (isset($pathSegments[2])) {
                    getVehicleInfoByVehicleId($pathSegments[2]);
                } else {
                    sendResponse('error', '缺少 vehicle_id 参数');
                }
                break;

            case 'customers':
                getCustomerIDList();
                break;

            case 'stores':
                getStoreIDList();
                break;

            default:
                sendResponse('error', '无效的请求路径');
        }
        break;

    case 'POST':
        if ($pathSegments[1] === 'createOrder') {
            $data = json_decode(file_get_contents('php://input'), true);
            if (isset($data['order_id'], $data['customer_id'], $data['store_id'], $data['order_date'], $data['delivery_date'], $data['total_amount'], $data['status'])) {
                createOrder(
                    $data['order_id'],
                    $data['customer_id'],
                    $data['store_id'],
                    $data['order_date'],
                    $data['delivery_date'],
                    $data['total_amount'],
                    $data['status']
                );
            } else {
                sendResponse('error', '缺少必要参数');
            }
        } else {
            sendResponse('error', '无效的 POST 请求');
        }
        break;

    default:
        sendResponse('error', '不支持的请求方法');
}
?>
