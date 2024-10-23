<?php 
class Database{
    private static $inst;

    private static $conn;
    private function __construct($conf){ 
        self::$conn = new mysqli(
            $conf['hostname'],
            $conf['username'],
            $conf['password'],
            $conf['database']
        );
        if (self::$conn->connect_error) {
            echo "connection Failed due to " . self::$conn->connect_error;
        }
    }
    public static function getInst(){
        if(self::$inst == null){
            $conf = require 'config.php';
            self::$inst = new Database($conf);
        }

        return self::$inst;
    }
}