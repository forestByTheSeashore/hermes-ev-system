<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
include 'config.php';

function sendResponse($status, $message)
{
    header('Content-Type: application/json');
    echo json_encode(['status' => $status, 'message' => $message]);
    exit;
}

// 获取请求方法和URL路径
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$pathSegments = explode('/', trim($path, '/'));

switch ($method) {
    case 'GET':
        // 你可以根据需要处理 GET 请求，假设没有需要处理的 GET 请求
        sendResponse('error', '不支持的请求方法');
        break;

    case 'POST':
        // 路由分发，获取登录类型
        switch ($pathSegments[1] ?? '') {
            case 'employee':
                // 雇员登录
                $employee_id = $_POST['employee_id'];
                $password = $_POST['password'];

                // 使用最低权限的认证用户连接数据库
                $authConn = connectAsAuthUser();
                $stmt = $authConn->prepare("SELECT employee_id, position FROM Employee WHERE employee_id = ? AND employee_password = ?");
                $stmt->bindValue(1, $employee_id, PDO::PARAM_STR);
                $stmt->bindValue(2, $password, PDO::PARAM_STR);
                $stmt->execute();
                $user = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($user) {
                    // 根据用户角色跳转到对应页面
                    switch ($user['position']) {
                        case 'Manager':
                            $message = [
                                'employee_id' => $user['employee_id'],
                                'position' => $user['position']
                            ];
                            sendResponse('success', $message);
                            break;
                        case 'Salesman':
                            $message = [
                                'employee_id' => $user['employee_id'],
                                'position' => $user['position']
                            ];
                            sendResponse('success', $message);
                            break;
                        case 'buyer':
                            $message = [
                                'employee_id' => $user['employee_id'],
                                'position' => $user['position']
                            ];
                            sendResponse('success', $message);
                            break;
                        default:
                            sendResponse('error', '无效角色');
                            break;
                    }
                } else {
                    sendResponse('error', '用户名或密码错误');
                }
                break;

            case 'customer':
                // 顾客登录
                $customer_id = $_POST['customer_id'];
                $password = $_POST['password'];

                // 使用最低权限的认证用户连接数据库
                $authConn = connectAsAuthUser();
                $stmt = $authConn->prepare("SELECT customer_id FROM Customer WHERE customer_id = ? AND customer_password = ?");
                $stmt->bindValue(1, $customer_id, PDO::PARAM_STR);
                $stmt->bindValue(2, $password, PDO::PARAM_STR);
                $stmt->execute();
                $user = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($user) {
                    sendResponse('success', $user['customer_id']);
                } else {
                    sendResponse('error', '用户名或密码错误');
                }
                break;

            default:
                sendResponse('error', '无效的登录类型');
                break;
        }
        break;

    default:
        sendResponse('error', '不支持的请求方法');
        break;
}
?>