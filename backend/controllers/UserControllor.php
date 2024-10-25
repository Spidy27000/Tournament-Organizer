<?php
require "database/usermodel.php";

class UserControllor{
    private static $usermodel;

    public static function init(){
        self::$usermodel = new usermodel();
    }
    //todo: make the methord to post
    public static function login(){
        $email = filter_input(input_get, 'email',filter_sanitize_email);
        $password = filter_input(input_get, 'password', filter_sanitize_string);
        $res = self::$usermodel -> verify_user($email,$password);
        if ($res < 0){
            echo json_encode([
                'status' => 'Failed',
            ]);
        }
        else{

        }

        echo $username . ' ' . $password;
    }
    public static function signin()
    {

    }
}

UserControllor::init();