<?php
header('Access-Control-Allow-Origin:*');   
header('Access-Control-Allow-Headers:x-requested-with,content-type');  

function __autoload($ClassName)
{
	include $ClassName.".php";
}

class Client
{
	private $queryNow;
	private $doType;

	public function __construct()
	{
		// 判断请求类型
		if(isset($_POST["concrete"])){
			$this->doType = addslashes(trim($_POST["concrete"]));
		}else if(isset($_GET["concrete"])){
			$this->doType = addslashes(trim($_GET["concrete"]));
		}else{
			return false;
		}

		$image = new Home();
	
		// 生成处理器加载请求
		$LoadUp = new Request($this->doType);
		$image->handleRequest($LoadUp);
	}
}

$MakeRequest = new Client();