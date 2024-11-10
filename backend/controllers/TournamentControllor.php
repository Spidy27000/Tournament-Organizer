<?php
require_once "database/TournamentModel.php";
require_once "database/UserModel.php";
class TournamentControllor
{
    private static $tournamentModel;

    public static function init(){
        self::$tournamentModel = new TournamentModel();
    }

    public static function create(){
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        $name = $data['name'] ?? null;
        $type = $data['type'] ?? null;
        $userId = $data['user_id'] ?? null;
        $visibility = $data['visibility'] ?? null;
        $maxSize = $data['max_size'] ?? null;
        $singleOrTeam = $data['single_or_team'] ?? null; //value single or team
        $noOfMatches = $data['no_of_matches'] ?? null;
        $id = 0;

        $res = self::$tournamentModel->isNameTaken($name);
        if($res){
            echo json_encode([
                'status' => 'Failed',
                'error' => 'Name is already taken'
            ]);
            return;

        }

        if ($type == "ladder"){
            $id = self::$tournamentModel->createLadder($name, $userId, $visibility, $maxSize, $singleOrTeam, $noOfMatches);
        }

        echo json_encode([
            'status' => 'Success',
            'id' => $id
        ]);
    }

    public static function join(){
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        
        $id = $data['id'] ?? null;
        $teamId = $data['team_id'] ??null;
        $username = $data['username'] ?? null;
        $members = $data['members'] ?? null;
        $userModel = new UserModel();
        
        $tournamentType = self::$tournamentModel->getTournamentType($id);

        if($tournamentType == "Single"){
            $userId = $userModel->getUserId($username);
            self::$tournamentModel->addPlayer($id, $userId);
        }else{
            $membersId = [];
            foreach ($members as $el){
                $temp = $userModel->getUserId($el);
                array_push($membersId, $temp);
            }
            self::$tournamentModel->addTeam($id,$teamId, $membersId);
        }

    }

}

TournamentControllor::init();
