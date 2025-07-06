<?php
// 原来部分
// header('Content-Type: application/json; charset=utf-8');
// require_once 'config_origin.php';
include 'config.php';
$conn = connectToDatabase('manager');

// 处理跨域请求
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');

// 任何内容输出前得到头部
// if (ob_get_length()) ob_clean();

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

// 获取销售数据概览
function getSalesData($conn) {
    try {
        // 使用视图获取按车型统计的销售数据
        $salesData = $conn->query("SELECT * FROM ModelAnnualSales")->fetchAll(PDO::FETCH_ASSOC);
        return [
            'sales_by_model' => $salesData
        ];
    } catch (PDOException $e) {
        throw new Exception('获取销售数据失败: ' . $e->getMessage());
    }
}

// 获取工厂产量数据
function getProductionData($conn) {
    try {
        // 使用视图获取工厂产量数据
        $productionData = $conn->query("SELECT * FROM FactoryProductionSummary")->fetchAll(PDO::FETCH_ASSOC);
        return [
            'production_share' => $productionData
        ];
    } catch (PDOException $e) {
        throw new Exception('获取生产数据失败: ' . $e->getMessage());
    }
}

// 获取车辆库存数据
// function getVehicleInventory($conn, $location = null) {
//     try {
//         if ($location) {
//             // 调用存储过程获取特定位置的库存
//             $stmt = $conn->prepare("CALL GetModelStockByLocation(?)");
//             $stmt->execute([$location]);
//         } else {
//             // 使用视图获取所有库存
//             $stmt = $conn->query("SELECT * FROM ModelStock");
//         }
        
//         return [
//             'inventory_data' => $stmt->fetchAll(PDO::FETCH_ASSOC)
//         ];
//     } catch (PDOException $e) {
//         throw new Exception('获取车辆库存数据失败: ' . $e->getMessage());
//     }
// }
function getVehicleInventory($conn) {
    try {
        // 直接调用存储过程
        $stmt = $conn->prepare("SELECT * FROM ALL_Inventory");
        $stmt->execute();  // 如果location为null则传入'ALL'
        
        return [
            'inventory_data' => $stmt->fetchAll(PDO::FETCH_ASSOC)
        ];
    } catch (PDOException $e) {
        throw new Exception('获取车辆库存数据失败: ' . $e->getMessage());
    }
}

// 获取员工信息
function getEmployeeInfo($conn) {
    try {
        // 使用视图获取员工信息
        return $conn->query("SELECT * FROM EmployeeDetails")->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        throw new Exception('获取员工信息失败: ' . $e->getMessage());
    }
}

// 更新员工信息
function updateEmployee($conn, $employeeId, $name, $phone, $salary, $branchId, $departmentId) {
    try {
        $stmt = $conn->prepare("
            UPDATE EmployeeUpdate
            SET 
                name = ?,
                phone = ?,
                salary = ?,
                branch_id = ?,
                department_id = ?
            WHERE employee_id = ?
        ");
        
        $stmt->bindValue(1, $name, PDO::PARAM_STR);
        $stmt->bindValue(2, $phone, PDO::PARAM_STR);
        $stmt->bindValue(3, $salary, PDO::PARAM_STR);
        $stmt->bindValue(4, $branchId, PDO::PARAM_INT);
        $stmt->bindValue(5, $departmentId, PDO::PARAM_INT);
        $stmt->bindValue(6, $employeeId, PDO::PARAM_INT);
        
        return $stmt->execute();
    } catch (PDOException $e) {
        throw new Exception('更新员工信息失败: ' . $e->getMessage());
    }
}

// 删除员工信息
function deleteEmployee($conn, $employeeId) {
    try {
        $stmt = $conn->prepare("DELETE FROM EmployeeDelete WHERE employee_id = ?");
        // return $stmt->execute([$employeeId]);
        return $stmt->bindValue(1, $employeeId, PDO::PARAM_INT) && $stmt->execute();
    } catch (PDOException $e) {
        throw new Exception('删除员工失败: ' . $e->getMessage());
    }
}

// 主要路由处理
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$pathSegments = explode('/', trim($path, '/'));

//print path segments
// echo "Path segments: " . print_r($pathSegments, true);

try {
    // checkManagerAuth();
    switch ($method) {
        case 'GET':
            switch ($pathSegments[1] ?? '') {
                case 'sales':
                    $data = getSalesData($conn);
                    sendResponse('success', '获取销售数据成功', $data);
                    break;
                    
                case 'production':
                    $data = getProductionData($conn);
                    sendResponse('success', '获取生产数据成功', $data);
                    break;
                    
                case 'inventory':
                    // $location = isset($pathSegments[2]);
                    $data = getVehicleInventory($conn);
                    sendResponse('success', '获取库存数据成功', $data);
                    break;
                    
                case 'employees':
                    $data = getEmployeeInfo($conn);
                    sendResponse('success', '获取员工信息成功', $data);
                    break;
                    
                default:
                    sendResponse('error', '无效的请求路径');
            }
            break;
            
        case 'PUT':
            if ($pathSegments[1] === 'employees' && isset($pathSegments[2])) {
                $rawData = file_get_contents('php://input');
                error_log("Received raw data: " . $rawData); // 添加调试日志
                
                $data = json_decode($rawData, true);
                if ($data === null) {
                    error_log("JSON decode error: " . json_last_error_msg());
                    sendResponse('error', 'Invalid JSON data');
                    exit;
                }
                
                if (isset($data['name'], $data['phone'], $data['salary'], 
                    $data['branch_id'], $data['department_id'])) {
                    try {
                        $result = updateEmployee(
                            $conn,
                            $pathSegments[2],
                            $data['name'],
                            $data['phone'],
                            $data['salary'],
                            $data['branch_id'],
                            $data['department_id']
                        );
                        sendResponse('success', '员工信息更新成功');
                    } catch (Exception $e) {
                        sendResponse('error', $e->getMessage());
                    }
                } else {
                    sendResponse('error', '缺少必要参数');
                }
            }
            break;
            
        case 'DELETE':
            if ($pathSegments[1] === 'employees' && isset($pathSegments[2])) {
                $employeeId = $pathSegments[2];
                if (deleteEmployee($conn, $employeeId)) {
                    sendResponse('success', '员工删除成功');
                } else {
                    sendResponse('error', '员工删除失败');
                }
            }
            break;
            
        default:
            sendResponse('error', '不支持的请求方法');
    }
} catch (Exception $e) {
    sendResponse('error', $e->getMessage());
}
?>