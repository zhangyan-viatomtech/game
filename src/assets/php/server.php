<?php
$ret = array(
    'name' => isset($_POST['name'])? $_POST['name'] : '',
    'gender' => isset($_POST['gender'])? $_POST['gender'] : ''
);

header('content-type:application:json;charset=utf8');

$origin = isset($_SERVER['HTTP_ORIGIN'])? $_SERVER['HTTP_ORIGIN'] : '';

$allow_origin = array(
    'https://lfhealthkitapi.hwcloudtest.cn:18444',
    'http://www.client2.com'
);

if(in_array($origin, $allow_origin)){
    header('Access-Control-Allow-Origin:'.$origin);
    header('Access-Control-Allow-Methods:POST');
    header('Access-Control-Allow-Headers:x-requested-with,content-type');
}
echo json_encode($ret);
?>
