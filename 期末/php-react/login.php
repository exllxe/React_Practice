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
$userId = mysqli_real_escape_string($db_connection, trim($data->user_name));
$userPwd = mysqli_real_escape_string($db_connection, trim($data->user_email));


$allUsers = mysqli_query($db_connection, "SELECT EmpId as id, EmpName,JobTitle,DeptName ,Phone as pwd FROM employee,dept Where employee.DeptId = dept.DeptId and EmpId='$userId'");
if (mysqli_num_rows($allUsers) > 0) {
    $all_users = mysqli_fetch_all($allUsers, MYSQLI_ASSOC);
    if($all_users[0]['pwd'] === $userPwd){
        // json_encode([],JSON_UNESCAPED_UNICODE) 參數一定要加才會正確顯示中文
        echo json_encode(["success" => 1, "id" => $all_users[0]['id'], "Name" =>$all_users[0]['EmpName'], "Job" =>$all_users[0]['JobTitle'], "DeptName" =>$all_users[0]['DeptName']], JSON_UNESCAPED_UNICODE);
    } else{
        echo json_encode(["success" => 0]);
    }
    
    
} else {
    echo json_encode(["success" => 0]);
}
?>

