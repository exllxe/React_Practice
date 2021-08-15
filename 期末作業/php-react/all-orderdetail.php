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


$all_Orders = mysqli_query($db_connection, "SELECT orderdetail.seq,orderdetail.OrderId,orderdetail.ProdId,orderdetail.Qty,orderdetail.Discount,product.ProdName FROM `orderdetail`,`product`
                                            Where orderdetail.ProdId = product.ProdID and orderdetail.OrderId = '$data' ORDER BY `orderdetail`.`seq` ASC ");
if (mysqli_num_rows($all_Orders) >= 0) {
    $result = mysqli_fetch_all($all_Orders, MYSQLI_ASSOC);
    // json_encode([],JSON_UNESCAPED_UNICODE) 參數一定要加才會正確顯示中文
    echo json_encode(["success" => 1, "detail" => $result], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(["success" => 0]);
}
?>