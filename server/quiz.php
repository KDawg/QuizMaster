<?php

// @TODO: SELECT rows from a TABLE of Quiz definitions stored in a MySQL DB

QuizFileRead();
LogWrite();


function QuizFileRead() {
    if (isset($_REQUEST['quizName'])) {
        $quizFn = $_REQUEST['quizName'];
        $quizPath = '../fixtures/' . $quizFn;

        $fptr = fopen($quizPath, 'rt');
        $data = fread($fptr, 8192);
        fclose($fptr);

        echo "{$data}";
    }
}


function LogWrite() {
    $fptr = fopen('./runtime.log', 'wt');
    fwrite($fptr, 'tickled');
    fclose($fptr);
}

?>