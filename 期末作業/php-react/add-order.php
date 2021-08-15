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
    && isset($data->CustId)
    && isset($data->EmpId)
    && isset($data->OrderDate)
    && isset($data->Descript)
) {

    //$lastSeq = mysqli_query($db_connection, "SELECT seq FROM `salesorder` Order by `salesorder`.`seq` desc LIMIT 0,1"); //目前最後一筆序號
    //$last_seq = mysqli_fetch_all($lastSeq, MYSQLI_ASSOC);
    //$new_seq = $last_seq[0]['seq']+1;

    $orderid = mysqli_real_escape_string($db_connection, trim($data->OrderId));
    $empid= mysqli_real_escape_string($db_connection, trim($data->EmpId));
    $cusid = mysqli_real_escape_string($db_connection, trim($data->CustId));
    $orderdate = mysqli_real_escape_string($db_connection, trim($data->OrderDate));
    $descript = mysqli_real_escape_string($db_connection, trim($data->Descript));


    $have_orderid = mysqli_query($db_connection, "SELECT OrderId FROM `salesorder` Where salesorder.OrderId = '$orderid'");
    if (mysqli_num_rows($have_orderid) == 0) {  //沒有重複ID
        $have_cusid = mysqli_query($db_connection, "SELECT CustId FROM `customer` Where customer.CustId = '$cusid'");
        if (mysqli_num_rows($have_cusid) == 1) {  //有客戶ID
            $insert_order = mysqli_query($db_connection, "INSERT INTO `salesorder`(`OrderId`,`EmpId`,`CustId`,`OrderDate`,`Descript`) VALUES('$orderid','$empid','$cusid','$orderdate','$descript')");
            if ($insert_order) {
                echo json_encode(["success" => 1, "msg" => "Order Inserted."]);
            } else {
                echo json_encode(["success" => 0, "msg" => "Not Inserted!"]);
            }        
        } else {
            echo json_encode(["success" => 0, "msg" => "CustId not existed!"]);
        }

    } else {
        echo json_encode(["success" => 0, "msg" => "ID existed!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>