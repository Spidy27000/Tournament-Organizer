<?php

require_once "Database.php";
require_once "UserModel.php";
require_once "TeamModel.php";


class TournamentModel{
    private static $db;
    public function __construct()
    {
        self::$db = Database::getInst();
    } 
    public function getTournamentType($id){
        $sql = "SELECT `player_type` FROM `Tournament` WHERE `id`=?;";
        $args = [$id];
        $result = self::$db->executeQuery($sql, $args, 'i');
        $res = self::$db->getResult($result, count:1);
        return $res['player_type'];
    }
    public function isNameTaken($name){
        $sql = "SELECT COUNT(*) FROM tournament WHERE name = ?;";
        $result = self::$db->executeQuery($sql, [$name], 's');
        $count = self::$db->getResult($result, isCount: true);
        return $count[0] > 0;
    }
    public function createLadder($name,$userId, $visibility, $maxSize, $singleOrTeam, $noOfMatches){
        $sql = "INSERT INTO tournament(name, status, type, visibility, player_type, max_teams, total_matches, organizer_id) VALUES (?,'Not Started', 'Ladder', ?, ?, ?, ?, ?);";
        $playerType = $singleOrTeam == 'team' ? 'Team' : 'Single'; 
        $args = [$name, $visibility, $playerType, $maxSize, $noOfMatches, $userId];
        $id = self::$db->executeInsert($sql, $args, 'sssiii');
        return $id;
    }
    public function getName($id){
        $sql = "SELECT `name` FROM `Tournament` WHERE `id`=?;";
        $args = [$id];
        $result = self::$db->executeQuery($sql, $args, 'i');
        $res = self::$db->getResult($result, count:1);
        return $res['name'];
    }
    public function getMaxSize($id){
        $sql = "SELECT `max_teams` FROM `Tournament` WHERE `id`=?;";
        $args = [$id];
        
        $result = self::$db->executeQuery($sql, $args, 'i');
        $res = self::$db->getResult($result, count:1);
        return $res['max_teams'];
    }
    
    public function setStatus($id, $value){
        $sql = "UPDATE tournament SET status = ? WHERE id = ?;";
        $args = [$value,$id];
        $result = self::$db->executeQuery($sql, $args, 'si');
        $result->close();
    }

    public function getVisibility($id){
        $sql = "SELECT `visibility` FROM `Tournament` WHERE `id`=?;";
        $args = [$id];
        $result = self::$db->executeQuery($sql, $args, 'i');
        $res = self::$db->getResult($result, count:1);
        return $res['visibility'];
    }

    public function getStatus($id){
        $sql = "SELECT `status` FROM `Tournament` WHERE `id`=?;";
        $args = [$id];
        $result = self::$db->executeQuery($sql, $args, 'i');
        $res = self::$db->getResult($result, count:1);
        return $res['status'];
    }
    public function getAllTournamentIds(){
        $sql = "SELECT id FROM `Tournament`;";
        $result = self::$db->executeQuery($sql);
        $res = self::$db->getResult($result);
        return $res;
    }
    
    public function getCurrentCount($id){
        $sql = "SELECT COUNT(*) FROM `Tournament_Teams` WHERE `tournament_id`=?;";
        $args = [$id];
        $result = self::$db->executeQuery($sql, $args, 'i');
        $res = self::$db->getResult($result, isCount:true);
        return $res[0];
    }
    public function tournamentExists($id){
        $sql = "SELECT COUNT(*) FROM tournament WHERE id = ?;";
        $result = self::$db->executeQuery($sql, [$id], 'i');
        $count = self::$db->getResult($result, isCount: true);
        return $count[0] > 0;
    }
    public function addPlayer($tournamentId, $userId){
        $sql = "INSERT INTO tournament_teams(tournament_id, user_id, type) VALUES (?,?,'Single'); ";
        $args = [$tournamentId ,$userId];
        $id = self::$db->executeInsert($sql, $args, 'ii');
        return $id;
    }
    public function addTeam($tournamentId,$teamId, $membersId){
        $sql = "INSERT INTO tournament_teams(tournament_id, team_id, type) VALUES (?,?,'Team'); ";
        $args = [$tournamentId ,$teamId];
        $id = self::$db->executeInsert($sql, $args, 'ii');
        foreach ($membersId as $memberId){
            $sql = "INSERT INTO team_players(user_id, team_id) VALUES (?,?); ";
            $args = [$memberId ,$teamId];
            self::$db->executeInsert($sql, $args, 'ii');
        }
        return $id;
    }
    public function leavePlayer($id){
        $sql = "DELETE FROM tournament_teams WHERE id = ?;";
        $args = [$id];
        $res = self::$db->executeQuery($sql, $args, 'ii');
        $res->close();
    }

    public function leaveTeam($id){
        $sql = "SELECT `team_id` FROM `tournament_team` WHERE `id`=?;";
        $args = [$id];
        $result = self::$db->executeQuery($sql, $args, 'i');
        $res = self::$db->getResult($result, count:1);
        $teamId = $res['team_id'];
        
        $sql = "DELETE FROM tournament_teams WHERE id = ?;";
        $args = [$id];
        $res = self::$db->executeQuery($sql, $args, 'ii');
        $res->close();

        $sql = "DELETE FROM team_players WHERE team_id = ?;";
        $args = [$teamId];
        $res = self::$db->executeQuery($sql, $args, 'ii');
        $res->close();
    }

    public function initLadderTournament($id){

        $sql = "SELECT total_matches FROM tournament WHERE id = ?;";
        $result = self::$db->executeQuery($sql, [$id], 'i');
        $count = self::$db->getResult($result, count:1);
        $count = $count['total_matches'];

        for($i = 1; $i > $count+1; $i++){
            $status = "Not Started";
            if($i == 1){
                $status = "On Going";
            }
            $sql = "INSERT INTO ladder_match(tournament_id, match_number, status) VALUES (?,?,?); ";
            $args = [$id ,$i, $status];
            $matchId = self::$db->executeInsert($sql, $args, 'iis');
            
            $sql = "SELECT id FROM tournament_teams WHERE tournament_id = ?;";
            $result = self::$db->executeQuery($sql, [$id], 'i');
            $res = self::$db->getResult($result);

            foreach($res as $_ => $teamID){
                $sql = "INSERT INTO ladder_match_points(tournament_id, match_number, points) VALUES (?,?,?); ";
                $args = [$id ,$teamID, 0];
                self::$db->executeInsert($sql, $args, 'iis');
            }
        }
    }
    public function getCurrMatch($id){
        $sql = "SELECT match_number FROM Ladder_match WHERE tournament_id = ? AND status = ?;";
        $args = [$id, "On Going"];
        $result = self::$db->executeQuery($sql, $args, 'is');
        $res = self::$db->getResult($result, count:1);
        return $res['match_number'];
    }
    public function getOrganizer($id){
        $sql = "SELECT organizer_id FROM tournament WHERE id = ?";
        $args = [$id];
        $result = self::$db->executeQuery($sql, $args, 'i');
        $res = self::$db->getResult($result, count:1);
        return $res['organizer_id'];
    }
    public function getMatchIds($id){
        $sql = "SELECT id FROM `ladder_match` WHERE tournament_id = ?;";
        $args = [$id];
        $result = self::$db->executeQuery($sql, $args, "i");
        $res = self::$db->getResult($result);
        return $res;
    }
    public function getTeams($id){
        $sql = "SELECT team_id, points FROM ladder_match_points where match_id = ?";
        $args = [$id];
        $result = self::$db->executeQuery($sql, $args, "i");
        $res = self::$db->getResult($result);
        foreach ($res as $it){
            $it["username"] = $this->getUsernameFromTournamentTeam($it['team_id']);
        }
        return $res;

    }

    private function getTypeFromTournamentTeam($id){
        $sql = "SELECT type FROM `tournament_teams` WHERE id = ?;";
        $args = [$id];
        $result = self::$db->executeQuery($sql, $args, "i");
        $res = self::$db->getResult($result ,count:1);
        return $res['type'];
    }    
    public function getUsernameFromTournamentTeam($id){
        $r = $this->getTypeFromTournamentTeam($id);
        if($r == "Team"){

            $sql = "SELECT team_id FROM `tournament_teams` WHERE id = ?;";
            $args = [$id];
            $result = self::$db->executeQuery($sql, $args, "i");
            $res = self::$db->getResult($result ,count:1);
            $teamId = $res['team_id'];
            $teamModel = new TeamModel();
            $name = $teamModel->getTeamName($id);
        }else{

            $sql = "SELECT user_id FROM `tournament_teams` WHERE id = ?;";
            $args = [$id];
            $result = self::$db->executeQuery($sql, $args, "i");
            $res = self::$db->getResult($result ,count:1);
            $userId = $res['team_id'];
            $userModel = new UserModel();
            $name = $userModel->getUserName($id);

        }
        return $name;
    }
    public function updateScore($matchId, $teamID, $points){
        $sql = "UPDATE ladder_match_points SET points = ? WHERE team_id = ? AND match_id = ?;";
        $args = [$points,$teamID, $matchId];
        $result = self::$db->executeQuery($sql, $args, 'iii');
        $result->close();       
        
    }
    public function getNextMatchId($matchId){
        $sql = "SELECT id FROM Ladder_Match WHERE tournament_id = ( SELECT tournament_id FROM Ladder_Match WHERE id = ?) AND match_number = ( SELECT match_number + 1 FROM Ladder_Match WHERE id = ? );";
        $args = [$matchId, $matchId];
        $result = self::$db->executeQuery($sql, $args, "ii");
        $res = self::$db->getResult($result ,count:1);
        if (count($res) == 0){
            return 0;
        }
        return $res['id'];
        
    }
    public function getMyTournament($userId){
        $sql = "SELECT id FROM `Tournament` WHERE organizer_id = ?;";
        $args = [$userId];
        $result = self::$db->executeQuery($sql, $args, "i");
        $res = self::$db->getResult($result);
        return $res;
    }
}