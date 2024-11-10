<?php
require_once "Database.php";
class TournamentModel{
    private static $db;
    public function __construct()
    {
        self::$db = Database::getInst();
    } 
    public function getTournamentType($team_id){
        $sql = "SELECT `player_type` FROM `Tournament` WHERE `id`=?;";
        $args = [$team_id];
        $result = self::$db->executeQuery($sql, $args, 'i');
        $res = self::$db->getResult($result, count:1);
        return $res['player_type'];
    }
    public function isNameTaken($name){
        $sql = "SELECT COUNT(*) FROM tournament WHERE name = ?";
        $result = self::$db->executeQuery($sql, [$name], 's');
        $count = self::$db->getResult($result, isCount: true);
        return $count[0] > 0;
    }
    public function createLadder($name,$userId, $visibility, $maxSize, $singleOrTeam, $noOfMatches){
        $sql = "INSERT INTO tournament(name, status, type, visibility, player_type, max_teams, total_matches, organizer_id) VALUES (?,'Not Started', 'Ladder', ?, ?, ?, ?); ";
        $playerType = $singleOrTeam == 'team' ? 'Team' : 'Single'; 
        $args = [$name, $visibility, $playerType, $maxSize, $noOfMatches, $userId];
        $id = self::$db->executeInsert($sql, $args, 'sssiii');
        return $id;
    }

}