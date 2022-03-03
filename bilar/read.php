<?php
    $lines = file('data.txt', FILE_SKIP_EMPTY_LINES);
    for($i = 0; $i < count($lines); $i++){
        echo $lines[$i];
    } 
?>