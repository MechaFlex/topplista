<?php
    $my_file = 'data.txt';
    $handle = fopen($my_file, 'a') or die('Cannot open file:  '.$my_file);
    $data = $_POST['olContent'];

    if($data !== ""){
        fwrite($handle, $data);
    }
?>