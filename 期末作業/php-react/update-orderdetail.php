<?php
// update-user.php is for updating an existing user.
// Method: POST - http://localhost/php-react/update-user.php
// Required Fields: id --> EmpId, user_name --> EmpName, user_email --> JobTitle

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));


$seq = mysqli_real_escape_string($db_connection, trim($data->seq));
$orderid = mysqli_real_escape_string($db_connection, trim($data->OrderId));
$prodid = mysqli_real_escape_string($db_connection, trim($data->ProdId));
$qty = mysqli_real_escape_string($db_connection, trim($data->Qty));
$discount = mysqli_real_escape_string($db_connection, trim($data->Discount));

$have_pid = mysqli_query($db_connection, "SELECT ProdID FROM `product` WHERE product.ProdID = '$prodid'");

if (mysqli_num_rows($have_pid) > 0) {

    $have_orderid = mysqli_query($db_connection, "SELECT * FROM `salesorder` WHERE salesorder.OrderId = '$orderid'");
    if(mysqli_num_rows($have_orderid) > 0){

        $updateOrder = mysqli_query($db_connection, "UPDATE `orderdetail` SET`OrderId`='$orderid',`ProdId`='$prodid',`Qty`='$qty',`Discount`='$discount'
        WHERE orderdetail.seq ='$seq'");
        if ($updateOrder) {
            echo json_encode(["success" => 1, "msg" => "Order Updated."]);
        } else {
            echo json_encode(["success" => 0, "msg" => "Order Not Updated!"]);
        }
    } else {
        echo json_encode(["success" => 0, "msg" => "訂單編號錯誤!"]);
        
    }
} else {
    echo json_encode(["success" => 0, "msg" => "商品編號錯誤!"]);
}


?>