<?php

// @TODO: SELECT rows from a TABLE of Quiz definitions stored in a MySQL DB

QuizDirFileRead();


function QuizDirFileRead() {
    $fptr = fopen('../fixtures/list.json', 'rt');
    $data = fread($fptr, 8192);
    fclose($fptr);

    echo "{$data}";
}

?>