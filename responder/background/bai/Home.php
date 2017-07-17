<?php
header('Content-Type:application/json');

class Home extends Handler 
{
	public function setSuccessor($nextService)
	{
		$this->successor = $nextService;
	}

	public function handleRequest($request)
	{
		// 数据库操作句柄
		$this->dataBaseHandle = $request->getDataBaseHandle();

		switch ($request->getService()) {
			case "answer" :
				$this->answerQuestion();
				break;
		  case "getUsersData" :
		    $this->getUsersData();
		    break;
		  case "resetStore" :
		    $this->resetStore();
		    break;
			default: 
				break;
		}
	}

	public function getUsersData() {
		$pageCount = ($_GET["page"] - 1) * 8;

		$getUsersSql = "SELECT userNumber, userName, timeStamp FROM users ORDER BY id";
		$getUsersResult = $this->dataBaseHandle->fetchAll($getUsersSql);

		$getTotalCount = "SELECT COUNT(id) AS count FROM users";
		$getTotalResult = $this->dataBaseHandle->fetchOne($getTotalCount);

		$result = array(
      "data" => $getUsersResult,
      "count" => $getTotalResult["count"]
		);

		echo json_encode($result);
	}

	public function answerQuestion() {
    $userNumber = addslashes($_POST["userNumber"]);
    $userName = addslashes($_POST["userName"]);
    $timeStamp = addslashes($_POST["timeStamp"]);

		$sql = "INSERT INTO users(userNumber, userName, timeStamp) VALUES('$userNumber', '$userName', '$timeStamp') ";
		$result = $this->dataBaseHandle->IDA($sql);
		echo json_encode($result);
	}

	public function resetStore() {
		$sql = "DELETE FROM users";
		$result = $this->dataBaseHandle->IDA($sql);
		echo $result;
	}
}