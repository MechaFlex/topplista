<?php
if($_FILES["file"]["name"] != '')
{
    $test = explode('.', $_FILES["file"]["name"]);
    $ext = end($test);
    $start = $test[0];
    $name = $start . '.' . $ext;
    $location = './img/' . $name;  
    move_uploaded_file($_FILES["file"]["tmp_name"], $location);
    echo $location;
}
?>