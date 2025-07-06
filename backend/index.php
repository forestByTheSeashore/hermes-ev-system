<?php
// 处理API请求
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $pathSegments = explode('/', trim($path, '/'));

    // 根据路径加载对应控制器
    switch($pathSegments[0]) {
        case 'login.php':
            require_once 'login.php';
            break;
        case 'manager.php':
            require_once 'manager.php';
            break;
        case 'supplier.php': 
            require_once 'supplier.php';
            break;
        case 'customer.php':
            require_once 'customer.php';
            break;
        case 'salesman.php':
            require_once 'salesman.php';
            break;
        default:
            http_response_code(404);
            exit;
    }
} else {
?>
<!doctype html>
<html>
<head>
    <title>Hermes Backend Service</title>
    <meta charset="utf-8">
</head>
<body>
    <h1>Welcome to Hermes Backend Service</h1>
    <p>Running PHP version <?= phpversion() ?></p>
</body>
</html>
<?php
}
?>