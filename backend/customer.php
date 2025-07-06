<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
include 'config.php';

// 根据用户角色连接数据库
$conn = connectToDatabase('customer');

// 通用响应函数
function sendResponse($status, $message, $data = []) {
    header('Content-Type: application/json');
    echo json_encode([
        'status' => $status,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}

// 函数：生成车辆选配映射
function generateVehicleMapping() {
    $vehicleMapping = [];
    
    // 定义配置选项
    $models = ['model1', 'model2', 'model3'];
    $colors = ['black', 'white', 'red', 'blue', 'silver'];
    $Tires = ['Passenger Tires', 'Off-Road Tires', 'Sport Tires', 'Winter Tires'];
    $Seats = ['Leather Seats', 'Sport Seats', 'Luxury Seats', 'Fabric Seats'];
    $Navigations = ['GPS', 'GLONASS', 'Galileo', 'Beidou'];
    $trims = ['Minimalist Style', 'Luxury Style', 'Sporty Style'];

    // 生成车辆ID映射
    $vehicleId = 100000;  // 起始ID，确保每个ID都是唯一的

    foreach ($models as $modelIdx => $model) {
        foreach ($colors as $colorIdx => $color) {
            foreach ($Tires as $tireIdx => $tire) {
                foreach ($Seats as $seatIdx => $seat) {
                    foreach ($Navigations as $navIdx => $navigation) {
                        foreach ($trims as $trimIdx => $trim) {
                            // 创建一个唯一的键，使用各配置项的索引
                            $key = "{$model}_{$color}_{$tire}_{$seat}_{$navigation}_{$trim}";
                            
                            // 生成唯一ID，使用一个简单的组合（模型索引 + 配置项索引）
                            $uniqueId = ($modelIdx + 1) * 100000 + ($colorIdx + 1) * 10000 + ($tireIdx + 1) * 1000 
                                      + ($seatIdx + 1) * 100 + ($navIdx + 1) * 10 + ($trimIdx + 1);
                            
                            // 将唯一ID映射到配置项
                            $vehicleMapping[$key] = $uniqueId;
                        }
                    }
                }
            }
        }
    }
    return $vehicleMapping;
}

function getVehicleId($configLevel, $color, $Tire, $seat, $navigation, $trim) {
    // 获取车辆ID映射
    $vehicleMapping = generateVehicleMapping();
    
    // 生成唯一的键来查找ID
    $key = "{$configLevel}_{$color}_{$Tire}_{$seat}_{$navigation}_{$trim}";

    // 返回对应的车辆ID，如果存在的话
    if (isset($vehicleMapping[$key])) {
        return $vehicleMapping[$key];
    } else {
        sendResponse('error', 'Invalid selection information');
    }
}


// 函数：展示车辆列表
function showVehicleList($store_location) {
    global $conn;

    // 使用 PDO 进行插入操作
    $stmt = $conn->prepare("SELECT * FROM CustomerCarPurchaseView WHERE store_location = ?");
    $stmt->execute([$store_location]);
    $vehiclelist = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($vehiclelist) {
        sendResponse('success', 'Order information query succeeded', $vehiclelist);
    } else {
        sendResponse('success', 'No order information available');
    }
}

// 函数：查询订单
function getOrdersByCustomer($customerId) {
    global $conn;

    // 使用 PDO 进行查询操作
    $stmt = $conn->prepare("SELECT * FROM CustomerOrderDetails WHERE customer_id = ?");
    $stmt->execute([$customerId]);
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($orders) {
        sendResponse('success', 'Order information query succeeded', $orders);
    } else {
        sendResponse('success', 'No order information available');
    }
}

// 主要路由处理
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$pathSegments = explode('/', trim($path, '/'));

// // 先分割路径和查询字符串
// $parsed_url = parse_url($_SERVER['REQUEST_URI']);
// // 解析查询字符串部分
// parse_str($parsed_url['query'], $query_params);
// $customerId = $query_params['customer_id'];
$customerId = $pathSegments[3]??null;

// 处理路由
try {
    switch ($method) {
        case 'GET':
            // 获取车辆列表
            if ($pathSegments[1] === 'vehicle' && isset($pathSegments[2])) {
                $store_location = urldecode($pathSegments[2]);
                showVehicleList($store_location);
            } 
            // 获取客户订单
            elseif ($pathSegments[1] === 'orders' && $pathSegments[2] === 'customer' && $customerId) {
                getOrdersByCustomer($customerId);
            } 
            else {
                sendResponse('error', '无效的请求路径');
            }
            break;

        case 'POST':
            sendResponse('error', 'POST请求不支持该操作');

        case 'PUT':
            sendResponse('error', 'PUT请求不支持该操作');

        case 'DELETE':
            sendResponse('error', 'DELETE请求不支持该操作');

        default:
            sendResponse('error', '不支持的请求方法');
    }
} catch (Exception $e) {
    sendResponse('error', $e->getMessage());
}
?>
