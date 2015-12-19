<?php

	$tmpfname = tempnam("./tmp", "FOO");

	$handle = fopen($tmpfname, "r+");

	fwrite($handle, $_POST["date"] );

	fclose($handle);

	// ‚±‚±‚Å‰½‚©s‚¤


/*
	$file = "test.txt"
	header("Content-type: text/plain");
	header("Content-Disposition: attachment; filename=test.txt");
	readfile($tmpfname);
*/

	//unlink($tmpfname);

	//header("Content-type: text/plain; charset=UTF-8");
	//header("Content-Disposition: attachment; filename=test.txt");

	
	$str_file = basename($tmpfname,'.tmp');
	$str_file_ori = "./tmp/" . basename($tmpfname);
	$str_file_copy = "./tmp/" . $str_file . ".txt";

	copy( $str_file_ori , $str_file_copy );

	$str_file_link = "./export/tmp/" . $str_file . ".txt";

	echo $str_file_link;

?>
