<?php
//数据库操作类
class DB{
    public $dbHost = "localhost";
    public $dbUser = "root";
    public $dbPwd = "";
    public $dbName = "baiji";
    public $dbCharset = "utf8";
    public $link = "";
    function __construct($dbHost,$dbUser,$dbPwd,$dbName,$dbCharset){
        $this->dbHost = $dbHost;
        $this->dbUser = $dbUser;
        $this->dbPwd = $dbPwd;
        $this->dbName = $dbName;
        $this->dbCharset = $dbCharset;

        $this->link = @new mysqli($dbHost,$dbUser,$dbPwd,$dbName);
        if ($this->link->connect_error) {
            die('Connect Error (' . $this->link->connect_errno . ') '
                . $this->link->connect_error);
        }
        $this->link->query("set names ".$this->dbCharset);
        $this->link->select_db($this->dbName);
    }
    function query($sql){
        return $this->link->query($sql);
    }
    //统计查询记录数
    function numRows($sql){
        $result = $this->query($sql);
        return $result->num_rows;
    }

    function IDA($sql){
        $result = $this->query($sql);
        return $result;
    }
    //增删改语句影响行数
    function affectedRows(){
        return $this->link->affected_rows;
    }
    //一条记录结果集
    function fetchOne($sql){
        $result = $this->query($sql);
        $rs = $result->fetch_assoc();
        return $rs;
    }
    //多条记录
    function fetchAll($sql){
        $result = $this->query($sql);
        $rows = array();
        while ($rs = $result->fetch_assoc()){
            $rows[] = $rs;
        }
        return $rows;
    }
    function __destruct()
    {
        $this->dbHost = null;
        $this->dbUser = null;
        $this->dbPwd = null;
        $this->dbName = null;
        $this->dbCharset = null;
        $this->link->close();
    }
}