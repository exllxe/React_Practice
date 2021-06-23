<?php
// all-users.php is to fetch all users that exist in the database.
// Method: GET - http://localhost/php-react/all-users.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';
$data = json_decode(file_get_contents("php://input"));

$allOrders = mysqli_query($db_connection, "SELECT * FROM `orderdetail`
                                            Where orderdetail.OrderId = '$data' ORDER BY `orderdetail`.`seq` ASC ");
if (mysqli_num_rows($allOrders) > 0) {
    $all_Orders = mysqli_fetch_all($allOrders, MYSQLI_ASSOC);
    // json_encode([],JSON_UNESCAPED_UNICODE) 參數一定要加才會正確顯示中文
    echo json_encode(["success" => 1, "detail" => $all_Orders], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(["success" => 0]);
}
?>