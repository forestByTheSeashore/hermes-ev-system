<?php
// 数据库连接信息
$host = "hermesdatabase.ccsdu4zzqcb7.us-east-1.rds.amazonaws.com"; // RDS Endpoint
$port = 3306; // MySQL 默认端口
$dbname = "HermesDatabase"; // 数据库名称
$dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";

function connectAsAuthUser(){
    global $dsn;
    $username = "admin"; // RDS 用户名
    $password = "20222022"; // RDS 密码
    try {
        // 使用 PDO 连接数据库
        $conn = new PDO($dsn, $username, $password);
        // 设置 PDO 错误模式为异常
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn; // 返回连接对象
    } catch (PDOException $e) {
        echo "数据库连接失败: " . $e->getMessage();
        return null; // 如果连接失败，返回 null
    }
}

function connectToDatabase($role) {
    global $dsn;
    // 根据角色动态连接数据库
    switch ($role) {
        case 'manager':
            $username = 'manager_root';
            $password = '123';
            break;
        case 'salesman':
            $username = 'salesman_root';
            $password = '123';
            break;
        case 'customer':
            $username = 'customer_root';
            $password = '123';
            break;
        case 'supplier':
            $username = 'supplier_root';
            $password = '123';
            break;
        default:
            die('无效角色，无法连接数据库');
    }

    try {
        // 使用 PDO 连接数据库
        $conn = new PDO($dsn, $username, $password);
        // 设置 PDO 错误模式为异常
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn; // 返回连接对象
    } catch (PDOException $e) {
        echo "数据库连接失败: " . $e->getMessage();
        return null; // 如果连接失败，返回 null
    }
}
?>
