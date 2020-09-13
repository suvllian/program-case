<?php

$dirPath = "./img";
$i = 1;
$newFirstName = "/军训-";

$dir = dir($dirPath);
var_dump($dir);	

while (($fileName = $dir->read()) != false) {
	echo $fileName."<br/>";
  if ($fileName !== "." && $fileName !== "..") {
    $oldName = $dirPath . "/" . $fileName;
   	$newName = $dirPath.$newFirstName.$i.".jpg";
    $result = rename(iconv('UTF-8', 'GBK', $oldName),  iconv('UTF-8', 'GBK', $newName));

    echo $result ? "Success<br/><br/>" : "Failed<br/><br/>";

    ++$i;
  }
}