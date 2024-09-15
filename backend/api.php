<?php
    header("Access-Control-Allow-Origin: http://localhost:3000");
    $user = $_POST['name'];
    $fruits = array();
    $fruits[0] = "w";
    $fruits[1] = "wd";
    $fruits[2] = "wdq";
    $fruits[3] = "wdqd";
    echo (json_encode($fruits));
?>