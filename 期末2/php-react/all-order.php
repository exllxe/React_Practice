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

$order_id = mysqli_real_escape_string($db_connection, trim($data));
if($order_id != ""){
    $Orders = mysqli_query($db_connection, "SELECT * FROM `salesorder` Where salesorder.OrderId = '$order_id' ORDER BY `salesorder`.`OrderId` ASC ");
}else{
    $Orders = mysqli_query($db_connection, "SELECT * FROM `salesorder` ORDER BY `salesorder`.`OrderId` ASC ");
}

if (mysqli_num_rows($Orders) > 0) {
    $Orders = mysqli_fetch_all($Orders, MYSQLI_ASSOC);
    // json_encode([],JSON_UNESCAPED_UNICODE) 參數一定要加才會正確顯示中文
    echo json_encode(["success" => 1, "orders" => $Orders], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(["success" => 0, "msg" => "查無資料", "111" => $Orders]);
}


?>