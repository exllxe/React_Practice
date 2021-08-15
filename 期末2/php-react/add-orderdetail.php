<?php
// add-user.php is for inserting new users into the database.
// Method: POST - http://localhost/php-react/add-user.php
// Required Fields – user_name --> EmpName, user_email --> JobTitle

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';

// POST DATA
$data = json_decode(file_get_contents("php://input"));


if (
    isset($data->OrderId)
    && isset($data->ProdId)
    && isset($data->Qty)
    && isset($data->Discount)
    && is_numeric($data->Qty)
    && is_numeric($data->Discount)
) {
    
    $orderid = mysqli_real_escape_string($db_connection, trim($data->OrderId));
    $pid = mysqli_real_escape_string($db_connection, trim($data->ProdId));
    $qty = mysqli_real_escape_string($db_connection, trim($data->Qty));
    $discount = mysqli_real_escape_string($db_connection, trim($data->Discount));

    $have_pid = mysqli_query($db_connection, "SELECT product.ProdID FROM  `product` Where product.ProdID = '$pid'");
 
    if (mysqli_num_rows($have_pid) != 0) { //有找到ID
        $insert_orderdetail = mysqli_query($db_connection, "INSERT INTO `orderdetail`(`OrderId`,`ProdId`,`Qty`,`Discount`) VALUES('$orderid','$pid','$qty','$discount')");
        if ($insert_orderdetail) {
            echo json_encode(["success" => 1, "msg" => "orderdetail Inserted."]);
        } else {
            echo json_encode(["success" => 0, "msg" => "Not Inserted!"]);
        }
    }else{
        echo json_encode(["success" => 0, "msg" => "ID not existed!"]);
    }

    
    
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}

?>