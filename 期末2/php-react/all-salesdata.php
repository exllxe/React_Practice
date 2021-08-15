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

$customer_id = mysqli_real_escape_string($db_connection, trim($data));
if($customer_id == ""){
    $sales_data = mysqli_query(
        $db_connection, 
        "SELECT customer.CustName,customer.CustId,
        ROUND(SUM(orderdetail.Qty*orderdetail.Discount*product.UnitPrice),0) as 'sales_amount',
        ROUND(SUM(orderdetail.Qty*orderdetail.Discount*(product.UnitPrice-product.Cost)),0) as 'profit'
        FROM `customer`,`orderdetail`,`product`,`salesorder` 
            WHERE customer.CustId = salesorder.CustId
                AND orderdetail.OrderId = salesorder.OrderId
                AND product.ProdID = orderdetail.ProdId
            GROUP BY customer.CustId
            ORDER BY customer.CustId ASC");    
}else{
    $sales_data = mysqli_query(
        $db_connection, 
        "SELECT customer.CustName,customer.CustId,
        ROUND(SUM(orderdetail.Qty*orderdetail.Discount*product.UnitPrice),0) as 'sales_amount',
        ROUND(SUM(orderdetail.Qty*orderdetail.Discount*(product.UnitPrice-product.Cost)),0) as 'profit'
        FROM `customer`,`orderdetail`,`product`,`salesorder` 
            WHERE customer.CustId = salesorder.CustId
                AND orderdetail.OrderId = salesorder.OrderId
                AND product.ProdID = orderdetail.ProdId
                AND customer.CustId Like '%$customer_id%'
            GROUP BY customer.CustId
            ORDER BY customer.CustId ASC");    
}



if (mysqli_num_rows($sales_data) > 0) {
    $result = mysqli_fetch_all($sales_data, MYSQLI_ASSOC);

    echo json_encode(["success" => 1, "salesData" => $result, "id" => $customer_id], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(["success" => 0,"msg" => "查無資料", "id" => $customer_id]);
}    


?>
