<?php
require "database/UserModel.php";

class UserControllor{
    private static $usermodel;

    public static function init(){
        self::$usermodel = new UserModel();
    }
    //todo: make the methord to post
    public static function login(){
        //reading raw json cuz the default reads form data only
        $json = file_get_contents('php://input');

        //converting the data into php array
        $data = json_decode($json, true);
        
        //getting email and password from the json data
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;
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