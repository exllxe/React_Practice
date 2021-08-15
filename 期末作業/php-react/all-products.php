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

$product_id = mysqli_real_escape_string($db_connection, trim($data));
if($product_id != ""){
    $products = mysqli_query($db_connection, "SELECT product.ProdName ,product.ProdID, product.UnitPrice,product.Cost,product.Edit FROM  `product` Where product.ProdID = '$product_id'");
}else{
    $products = mysqli_query($db_connection, "SELECT product.ProdName ,product.ProdID, product.UnitPrice,product.Cost,product.Edit FROM  `product`");
}

if (mysqli_num_rows($products) > 0) {
    $products_result = mysqli_fetch_all($products, MYSQLI_ASSOC);
    //json_encode([],JSON_UNESCAPED_UNICODE) 參數一定要加才會正確顯示中文
    echo json_encode(["success" => 1, "products" => $products_result], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(["success" => 0,"msg" => "查無資料"]);
}    


?>
