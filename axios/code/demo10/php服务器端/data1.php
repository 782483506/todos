<?php
header("Access-Control-Allow-Origin: * ");//http头报文header中的跨域处理
$name=$_POST['name'];
$age=$_POST['age'];
echo '{"name":"'.$name.'","age":'.$age.',"sex":"男"}';
?>