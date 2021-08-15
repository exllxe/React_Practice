<?php
// delete-user.php is for deleting an existing user.
// Method: POST - http://localhost/php-react/delete-user.php
// Required Fields: id --> EmpId

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->id)) {

   $delid = $data->id;

    $delete_order = mysqli_query($db_connection, "DELETE FROM `salesorder` WHERE `OrderId`='$delid'");
    $delete_order_detail = mysqli_query($db_connection, "DELETE FROM `orderdetail` WHERE `OrderId`='$delid'");

    if ($delete_order && $delete_order_detail) {
        echo json_encode(["success" => 1, "msg" => "OK"]);
    }else{
        echo json_encode(["success" => 0, "msg" => "error"]);
    } 
} else {
    echo json_encode(["success" => 0, "msg" => "User Not Found!"]);
}
?>