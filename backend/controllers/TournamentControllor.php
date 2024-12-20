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
        $res = self::$tournamentModel->tournamentExists($id);
        if ($res){
            echo json_encode([
                'status' => 'Failed',
                "error" => 'Tournament not Found'
            ]);
        }
        
        $tournamentType = self::$tournamentModel->getTournamentType($id);

        if($tournamentType == "Single"){
            $userId = $userModel->getUserId($username);
            $res = self::$tournamentModel->addPlayer($id, $userId);
        }else{
            $membersId = [];
            foreach ($members as $el){
                $temp = $userModel->getUserId($el);
                array_push($membersId, $temp);
            }
            $res= self::$tournamentModel->addTeam($id,$teamId, $membersId);
        }

        echo json_encode([
            'status' => 'success',
            'id' => $res
        ]);

    }
    
    ///leave/tournament
    public static function leave(){
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        
        $teamId = $data['teamId'] ?? null;
        
        $tournamentType = self::$tournamentModel->getTournamentType($teamId);

        if($tournamentType == "Single"){
            self::$tournamentModel->leavePlayer($teamId);
        }else{
            self::$tournamentModel->leaveTeam($teamId);
        }
        echo json_encode([
            'status' => 'success'
        ]);
    }
    ///view/tournament/{id:\d+}
    public static function view($id){
        // {
        //     "name" : "",
        //     "max_size" : "",
        //     "publicOrPrivate" :"",
        //     "status" : "",
        //     "currentCount": "",
        //     "SingleOrTeam" : ""
        // }
        $id = $id['id'];
        $res = [];
        $res['organizer_id'] = self::$tournamentModel->getOrganizer($id);
        $res['name'] = self::$tournamentModel->getName($id);
        $res['max_size'] = self::$tournamentModel->getMaxSize($id);
        $res['visibility'] = self::$tournamentModel->getVisibility($id);
        $res['status'] = self::$tournamentModel->getStatus($id);
        $res['current_count'] = self::$tournamentModel->getCurrentCount($id);
        $res['type'] = self::$tournamentModel->getTournamentType($id);
        echo json_encode($res);

    }

    ///view/mytournaments/{id:\d+}
    public static function viewMyTornaments($id){
        $id = $id['id'];
        $i = 0;

        $myTournaments = self::$tournamentModel->getMyTournament($id);
        foreach ($myTournaments as $torrId){
            $_res = [];
            $_res['id'] = $torrId["id"];
            $_res["oraganizer_id"] = self::$tournamentModel->getOrganizer($torrId["id"]);
            $_res['name'] = self::$tournamentModel->getName($torrId["id"]);
            $_res['max_size'] = self::$tournamentModel->getMaxSize($torrId["id"]);
            $_res['visibility'] = self::$tournamentModel->getVisibility($torrId["id"]);
            $_res['status'] = self::$tournamentModel->getStatus($torrId["id"]);
            $_res['current_count'] = self::$tournamentModel->getCurrentCount($torrId["id"]);
            $_res['type'] = self::$tournamentModel->getTournamentType($torrId["id"]);
            $res[$i] = $_res;
            $i++;

        }
        echo json_encode($res);

    }


    ///view/allTournament
    public static function viewAllTournaments(){
        $ids = self::$tournamentModel->getAllTournamentIds();
        $res = [];
        $i = 0;
        foreach ($ids as $id){
            $_res = [];
            $_res['id'] = $id['id'];
            $_res["oraganizer_id"] = self::$tournamentModel->getOrganizer($id['id']);
            $_res['name'] = self::$tournamentModel->getName($id['id']);
            $_res['max_size'] = self::$tournamentModel->getMaxSize($id['id']);
            $_res['visibility'] = self::$tournamentModel->getVisibility($id['id']);
            $_res['status'] = self::$tournamentModel->getStatus($id['id']);
            $_res['current_count'] = self::$tournamentModel->getCurrentCount($id['id']);
            $_res['type'] = self::$tournamentModel->getTournamentType($id['id']);
            $res[$i] = $_res;
            $i++;
        }
        echo json_encode($res);

    }

    ///init/tournament
    public static function initTournament(){
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        $id = $data['id'];
        self::$tournamentModel->setStatus($id, "On Going");
        self::$tournamentModel->initLadderTournament($id);
        
        echo json_encode([
            'status' => 'success'
        ]);
    }
    ///view/tournamentDetails/{id:\d+}
    public static function viewDetails($id){
        $id = $id['id'];
        // {
        //     "name":"",
        //     "currrentMatch":'',
        //     "totalMatch":'',
        //     "matches":[
        //         {
        //             "match_id" :''
        //             "teams": [
        //                 "team_id": "",
        //                 "username" : "",
        //                 "points" : ""
        //             ]
        //         }
        //     ],
        // }

        $res = [];
        $res['name'] = self::$tournamentModel->getName($id); 
        $res['curr_match'] = self::$tournamentModel->getCurrMatch($id);
        $res['total_match'] = self::$tournamentModel->getMaxSize($id);
        $_res = [];
        $matchIds = self::$tournamentModel->getMatchIds($id);
        $i = 0;
        foreach ($matchIds as $matchId){
            $_res = [];
            $_res['id'] = $matchId['id'];
            $_res['teams'] = self::$tournamentModel->getTeams($matchId['id']);
        }
        
        $res["matches"] = $_res; 
        echo json_encode($res);



    }    
    ///update/scores
    public static function updateScores(){
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        $matchId = $data['id'];
        $teams = $data['teams'];
        foreach ($teams as $team){
            self::$tournamentModel->updateScore($matchId, $team['id'],$team['points']);
        }
        self::$tournamentModel->setStatus($matchId,"Finshed");
        $nextMatchId = self::$tournamentModel->getNextMatchId($matchId);
        if ($nextMatchId == 0){
            echo json_encode([
                'status' => 'success',
                'message' => 'Tournament Has ended'
            ]);
            return;

        }
        self::$tournamentModel->setStatus($nextMatchId,"On Going");

        echo json_encode([
            'status' => 'success',
            'message' => 'Next Match has started'
        ]);

    }

}

TournamentControllor::init();
