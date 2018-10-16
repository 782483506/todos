<?php
$params = json_decode(file_get_contents('php://input'),true);//获取前端通过POST传递的原始数据，然后转换为数组
$name=$params['name'];
$age=$params['age'];
echo '{"name":"'.$name.'","age":'.$age.',"sex":"男"}';
?>