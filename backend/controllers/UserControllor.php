<?php
require "database/UserModel.php";

class UserControllor
{
    private static $userModel;

    public static function init()
    {
        self::$userModel = new UserModel();
    }
    //todo: make the methord to post
    public static function login() {
        $json = file_get_contents('php://input');

        //reading raw json cuz the default reads form data only
        $data = json_decode($json, true);

        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;
        $res = self::$userModel->emailExists($email);
        if(!$res){
            echo json_encode([
                'status' => 'Failed',
                'error' => 'Email not found'
            ]);
            return;
        }
        
        $res = self::$userModel->verifyUser($email, $password);
        if($res == 0) {
            echo json_encode([
                'status' => 'Failed',
                'error' => 'Incorrect Password'
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

        $data = json_decode($json, true);

        $email = $data['email'] ?? null;
        $username = $data['username'] ?? null;
        $name = $data['name'] ?? null;
        $password = $data['password'] ?? null;

        if (self::$userModel->usernameExists($username)) {
            echo json_encode([
                'status' => 'failed',
                'errorCode' => 'Username Already Exists'
            ]);
            return;
        }
        if (self::$userModel->emailExists($email)) {
            echo json_encode([
                'status' => 'failed',
                'errorCode' => 'Email already exists'
            ]);
            return;
        }
        $res = self::$userModel->createUser($name, $username, $email, $password); echo json_encode([
            'status' => 'success',
            'id' => $res
        ]);
    }
    public static function viewUser($id){
        var_dump($id["id"]);
        $data = self::$userModel->getUserData($id['id']);
        $isTeamLeader = self::$userModel->isTeamLeader($id);
        if($isTeamLeader){
            $data['team_leader'] = true;
        }else{
            $data['team_leader'] = false;
        }
        echo json_encode($data);

    }
}

UserControllor::init();
