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


if ( isset($data->seq)
    &&isset($data->OrderId)
    && isset($data->EmpId)
    && isset($data->CustId)
    && isset($data->OrderDate)

) {
    $seq = mysqli_real_escape_string($db_connection, trim($data->seq));
    $orderid = mysqli_real_escape_string($db_connection, trim($data->OrderId));
    $empid = mysqli_real_escape_string($db_connection, trim($data->EmpId));
    $custid = mysqli_real_escape_string($db_connection, trim($data->CustId));
    $orderdate = mysqli_real_escape_string($db_connection, trim($data->OrderDate));
    $descript = mysqli_real_escape_string($db_connection, trim($data->Descript));

    $update_order = null;
    $have_cusid = null;
    $have_change_orderId = mysqli_query($db_connection, "SELECT OrderId FROM `salesorder` Where salesorder.OrderId = '$orderid' and salesorder.seq = '$seq'");
    $have_orderId = mysqli_query($db_connection, "SELECT OrderId FROM `salesorder` Where salesorder.OrderId = '$orderid'");

    
    if (mysqli_num_rows($have_change_orderId) == 1) { //未更動ID
        $have_cusid = mysqli_query($db_connection, "SELECT CustId FROM `customer` Where customer.CustId = '$custid'"); //檢查客戶代號
        if(mysqli_num_rows($have_cusid) > 0){
            $update_order = mysqli_query($db_connection, "UPDATE `salesorder` SET `EmpId`='$empid',`CustId`='$custid',`OrderDate`='$orderdate',`Descript`='$descript'
            WHERE salesorder.seq ='$seq'");
            if ($update_order) {
                echo json_encode(["success" => 1, "msg" => "Order Updated."]);
            } else {
                echo json_encode(["success" => 0, "msg" => "Order Not Updated!",$orderid]);
            }
        }else{
            echo json_encode(["success" => 0, "msg" => "客戶代號錯誤"]);
        }
    }else if(mysqli_num_rows($have_orderId) == 0){ //沒跟其他ID重複
        $have_cusid = mysqli_query($db_connection, "SELECT CustId FROM `customer` Where customer.CustId = '$custid'"); //檢查客戶代號
        if(mysqli_num_rows($have_cusid) > 0){
            $org_orderId = mysqli_query($db_connection, "SELECT OrderId FROM `salesorder` Where salesorder.seq = '$seq'"); //抓取原本ID
            $org_id = null;
            if (mysqli_num_rows($org_orderId) > 0) {
                $org_id = mysqli_fetch_all($org_orderId, MYSQLI_ASSOC);
            } else {
                echo json_encode(["success" => 0, "msg" => "Select Old ID Error."]);
            }
            $update_order = mysqli_query($db_connection, "UPDATE `salesorder` SET `OrderId`='$orderid',`EmpId`='$empid',`CustId`='$custid',`OrderDate`='$orderdate',`Descript`='$descript'
            WHERE salesorder.seq ='$seq'");
            if ($update_order) {
                $target_id = $org_id[0]['OrderId'];
                $update_order_detail = mysqli_query($db_connection, "UPDATE `orderdetail` SET `OrderId`='$orderid' WHERE orderdetail.OrderId ='$target_id'");
                if($update_order_detail){
                    echo json_encode(["success" => 1, "msg" => "Order and Detail Updated."]);
                }else{
                    echo json_encode(["success" => 0, "msg" => "Order Detail Not Updated!"]);
                }    
            } else {
                echo json_encode(["success" => 0, "msg" => "Order Not Updated!"]);
            }
        }else{
            echo json_encode(["success" => 0, "msg" => "客戶代號錯誤"]);
        }
    }else if(mysqli_num_rows($have_orderId) != 0){
        echo json_encode(["success" => 0, "msg" => "ID have existed!"]);
    }


} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}


?>