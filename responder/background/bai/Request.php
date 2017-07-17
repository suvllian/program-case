<?php
require_once("./db.class.php"); 

class Request
{
	private $Value;
	private $dataBaseHandle;

	public function __construct($service)
	{
		$this->Value   = $service;
	}

	public function getService()
	{
		return $this->Value;
	}

	public function getDataBaseHandle(){
		$this->dataBaseHandle = new DB("localhost","root","","baiji","utf8");
		return $this->dataBaseHandle;
	}
}