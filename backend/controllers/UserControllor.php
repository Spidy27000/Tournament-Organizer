<?php
require "database/UserModel.php";

class UserControllor{
    private static $usermodel;

    public static function init(){
        self::$usermodel = new usermodel();
    }
    //todo: make the methord to post
    public static function login(){
        $email = filter_input(INPUT_GET, 'email');
        $password = filter_input(INPUT_GET, 'password');
        $res = self::$usermodel -> verify_user($email,$password);
        if (count($res) <= 0){
            echo json_encode([
                'status' => 'Failed',
            ]);
            return;
        }
        echo json_encode([
            'status' => "Success",
            'data' => $res[0]
        ]); 

    }
    public static function signUp()
    {

    }
}

UserControllor::init();