<?php
require "database/UserModel.php";

class UserControllor
{
    private static $usermodel;

    public static function init()
    {
        self::$usermodel = new UserModel();
    }
    //todo: make the methord to post
    public static function login()
    {
        //reading raw json cuz the default reads form data only
        $json = file_get_contents('php://input');

        //converting the data into php array
        $data = json_decode($json, true);

        //getting email and password from the json data
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;
        $res = self::$usermodel->verifyUser($email, $password);

        if (count($res) <= 0) {
            echo json_encode([
                'status' => 'Failed',
            ]);
            return;
        }
        echo json_encode([
            'status' => "Success",
            'id' => $res
        ]);
    }
    public static function signUp()
    {
        $json = file_get_contents('php://input');

        //reading raw json cuz the default reads form data only
        $data = json_decode($json, true);

        //getting email and password from the json data
        $email = $data['email'] ?? null;
        $username = $data['username'] ?? null;
        $name = $data['name'] ?? null;
        $password = $data['password'] ?? null;
        if (self::$usermodel->usernameExists($username)) {
            echo json_encode([
                'status' => 'failed',
                'errorCode' => 'Username not available'
            ]);
            return;
        }
        if (self::$usermodel->emailExists($email)) {
            echo json_encode([
                'status' => 'failed',
                'errorCode' => 'email aready exists'
            ]);
            return;
        }
        $res = self::$usermodel->createUser($name, $username, $email, $password);
        echo json_encode([
            'status' => 'success',
            'id' => $res
        ]);
    }
}

UserControllor::init();
