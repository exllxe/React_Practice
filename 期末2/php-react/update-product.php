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

if (
    isset($data->ProdID)
    && isset($data->ProdName)
    && is_numeric($data->UnitPrice)
    && is_numeric($data->Cost)
) {
    $productid = mysqli_real_escape_string($db_connection, trim($data->ProdID));
    $productname = mysqli_real_escape_string($db_connection, trim($data->ProdName));
    $productprice = mysqli_real_escape_string($db_connection, trim($data->UnitPrice));
    $productcost = mysqli_real_escape_string($db_connection, trim($data->Cost));
    $updateUser = mysqli_query($db_connection, "UPDATE `product` SET`ProdName`='$productname',`UnitPrice`='$productprice',`Cost`='$productcost'
                                                 WHERE product.ProdID ='$productid'");
    if ($updateUser) {
        echo json_encode(["success" => 1, "msg" => "Product Updated."]);
    } else {
        echo json_encode(["success" => 0, "msg" => "Product Not Updated!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>