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
        $id = self::$db->executeInsert($sql,$args,'si');
        $sql = "UPDATE users SET team_id = ? WHERE id = ?;";
        $args = [$id, $user_id];
        $res = self::$db->executeQuery($sql,$args,'ii');
        $res->close();
        return $id;
    }
    public function addMember($user_id, $team_id){
        //set team_id in user
        $sql = "UPDATE users SET team_id = ? WHERE id = ?;";
        $args = [$team_id, $user_id];
        $res = self::$db->executeQuery($sql,$args,'ii');
        //update no_of_members
        $sql = "UPDATE team SET no_of_members = no_of_members + 1 WHERE id = ?;";
        $args = [$team_id];
        $res = self::$db->executeQuery($sql,$args,'i');
        $res->close();
    }
    public function getTeamName($team_id){
        $sql = "SELECT `name` FROM `team` WHERE `id`=?;";
        $args = [$team_id];
        $result = self::$db->executeQuery($sql, $args, 'i');
        $res = self::$db->getResult($result, count:1);
        return $res['name'];
    }
    public function getNoOfMembers($team_id){
        $sql = "SELECT `no_of_members` FROM `team` WHERE `id`=?;";
        $args = [$team_id];
        $result = self::$db->executeQuery($sql, $args, 'i');
        $res = self::$db->getResult($result, count:1);
        return $res['no_of_members'];
    }

    public function getMembers($team_id){
        $sql = "SELECT username, name FROM users WHERE team_id = ?";
        $args = [$team_id];
        $res = self::$db->executeQuery($sql,$args,'i');
        $res = self::$db->getResult($res);
        return $res;
    }
    public function deleteMember($team_id, $username){
        $sql = "UPDATE users SET team_id = NULL WHERE username = ? AND team_id = ?;";
        $args = [$username, $team_id];
        $res = self::$db->executeQuery($sql, $args, "si");
        $res->close();
        $sql = "UPDATE team SET no_of_members = no_of_members - 1 WHERE id = ?;";
        $args = [$team_id];
        $res = self::$db->executeQuery($sql, $args, "i");
        $res->close();
    }
}