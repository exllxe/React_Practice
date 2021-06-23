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
    true
) {
    $orderid = mysqli_real_escape_string($db_connection, trim($data->OrderId));
    $empid = mysqli_real_escape_string($db_connection, trim($data->EmpId));
    $custid = mysqli_real_escape_string($db_connection, trim($data->CustId));
    $orderdate = mysqli_real_escape_string($db_connection, trim($data->OrderDate));
    $descript = mysqli_real_escape_string($db_connection, trim($data->Descript));
    $updateOrder = mysqli_query($db_connection, "UPDATE `salesorder` SET`EmpId`='$empid',`CustId`='$custid',`OrderDate`='$orderdate',`Descript`='$descript'
                                                  WHERE salesorder.OrderId ='$orderid'");
    
    if ($updateOrder) {
        echo json_encode(["success" => 1, "msg" => "Order Updated."]);
    } else {
        echo json_encode(["success" => 0, "msg" => "Order Not Updated!",$orderid]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>