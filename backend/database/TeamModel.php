<?php
require_once "DataBase.php";

class TeamModel
{
    private static $db;

    public function __construct(){
        self::$db = Database::getInst();
    }

    public function teamNameExists($name){
        $sql = "SELECT COUNT(*) FROM team WHERE name = ?";
        $result = self::$db->executeQuery($sql, [$name], 's');
        $count = self::$db->getResult($result, isCount: true);
        return $count[0] > 0;
    }
    public function createTeam($name, $user_id){
        $sql = "INSERT INTO team(name, team_leader_id) VALUES (?,?);";
        $args = [$name, $user_id];
        $id = self::$db->executeInsert($sql,$args,'sd');
        $sql = "UPDATE users SET team_id = ? WHERE id = ?;";
        $args = [$id, $user_id];
        $res = self::$db->executeQuery($sql,$args,'dd');
        $res->close();
        return $id;
    }
    public function getUserId($username){
        $sql = "SELECT `id` FROM `Users` WHERE `username`=?;";
        $args = [$username];
        $result = self::$db->executeQuery($sql, $args, 's');
        $res = self::$db->getResult($result, count:1);
        if (!$res){
           return 0;
        }
        return $res[0];
    }
    public function addMember($user_id, $team_id){
        //set team_id in user
        $sql = "UPDATE users SET team_id = ? WHERE id = ?;";
        $args = [$team_id, $user_id];
        $res = self::$db->executeQuery($sql,$args,'dd');
        //update no_of_members
        $sql = "UPDATE team SET no_of_member = no_of_member + 1 WHERE id = ?;";
        $args = [$team_id];
        $res = self::$db->executeQuery($sql,$args,'d');
        $res->close();
    }
    public function getTeamName($team_id){
        $sql = "SELECT `name` FROM `team` WHERE `id`=?;";
        $args = [$team_id];
        $result = self::$db->executeQuery($sql, $args, 'd');
        $res = self::$db->getResult($result, count:1);
        return $res[0];

    }

    public function getMembers($team_id){
        $sql = "SELECT username, name".
                "FROM users".
                " WHERE team_id = ?";
        $args = [$team_id, $team_id];
        $res = self::$db->executeQuery($sql,$args,'dd');
        $res = self::$db->getResult($res);
        return $res;
    }
    
}