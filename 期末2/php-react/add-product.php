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
    isset($data->ProdId)
    && isset($data->ProdName)
    && isset($data->UnitPrice)
    && isset($data->Cost)
    && !empty(trim($data->ProdId))
    && !empty(trim($data->ProdName))
    && !empty(trim($data->UnitPrice))
    && !empty(trim($data->Cost))
    && is_numeric($data->UnitPrice)
    && is_numeric($data->Cost)
) {
    $pid = mysqli_real_escape_string($db_connection, trim($data->ProdId));
    $pname = mysqli_real_escape_string($db_connection, trim($data->ProdName));
    $price = mysqli_real_escape_string($db_connection, trim($data->UnitPrice));
    $cost = mysqli_real_escape_string($db_connection, trim($data->Cost));
    
    
    $have_pid = mysqli_query($db_connection, "SELECT product.ProdID FROM  `product` Where product.ProdID = '$pid'");
 
    if (mysqli_num_rows($have_pid) == 0) {
        $insert_product = mysqli_query($db_connection, "INSERT INTO `product`(`ProdID`,`ProdName`,`UnitPrice`,`Cost`) VALUES('$pid','$pname','$price','$cost')");
        
        
        if ($insert_product) {
            //$last_id = mysqli_insert_id($db_connection);
            echo json_encode(["success" => 1, "msg" => "Product Inserted."]);
        } else {
            echo json_encode(["success" => 0, "msg" => "Product Not Inserted!"]);
        }
    }else{
        echo json_encode(["success" => 0, "msg" => "ID have existed!"]);
    }

} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>