<?php
require "database/TeamModel.php";

class TeamControllor
{
    private static $teamModel;

    public static function init(){
        self::$teamModel = new TeamModel();
    }

    public static function createTeam(){
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        $name = $data['name'] ?? null;
        $user_id = $data['id'] ?? null;
        $res = self::$teamModel->teamNameExists($name);
        if ($res){
            echo json_encode([
                'status' => 'Failed',
                'error' => 'Team name already taken'
            ]);
            return;
        }

        $id = self::$teamModel->createTeam($name, $user_id);

        echo json_encode([
            'status' => 'Success',
            'id' => $id
        ]);
    }
    public static function addMember(){
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        $team_id = $data['team_id'] ?? null;
        $username = $data['username'] ?? null;
        $user_id = self::$teamModel->getUserId($username);
        if($user_id == 0){
            echo json_encode([
                'status' => 'Failed',
                'error' => 'User Does not Exists'
            ]);
            return;
        }

        self::$teamModel->addMember($user_id, $team_id);

        echo json_encode([
            'status' => 'Success',
        ]);
    }
    public static function viewTeam($args){
        $id = $args['id'];
        $res = [];
        $res['team_name'] = self::$teamModel->getTeamName($id);
        $res['members'] = self::$teamModel->getMembers($id);
        echo json_encode($res);
    }
    public static function removeMember(){
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        $team_id = $data['team_id'];
        $username = $data['username'];
        self::$teamModel->deleteMember($team_id, $username);
        echo json_encode([
            'status' => 'Success'

        ]);
    }

}

TeamControllor::init();