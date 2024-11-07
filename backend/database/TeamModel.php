<?php
require_once "DataBase.php";

class TeamModel
{
    private static $db;

    public function __construct(){
        self::$db = Database::getInst();
    }

    
}