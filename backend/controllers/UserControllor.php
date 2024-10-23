<?php
require "database/database.php";

class UserController{
    private static $db;

    public static function init(){
        self::$db = Database::getInst();


    }
    //TODO: Make the methord to post
    public static function login($name){
        $username = filter_input(INPUT_GET, 'email',FILTER_SANITIZE_EMAIL);
        $password = filter_input(INPUT_GET, 'password', FILTER_SANITIZE_STRING);

        echo $username . ' ' . $password;
        var_dump($name);
    }
    public static function signin($email,$password,$username)
    {

    }
}

UserController::init();