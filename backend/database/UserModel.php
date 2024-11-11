<?php
require_once "Database.php";
class UserModel
{
    private static $db;
    public function __construct()
    {
        self::$db = Database::getInst();
    }

    public function getUserId($username){
        $sql = "SELECT `id` FROM `Users` WHERE `username`=?;";
        $args = [$username];
        $result = self::$db->executeQuery($sql, $args, 's');
        $res = self::$db->getResult($result, count:1);
        if (!$res){
           return 0;
        }
        return $res['id'];
    }
    public function usernameExists($username)
    {
        $sql = "SELECT COUNT(*) FROM users WHERE username = ?";
        $result = self::$db->executeQuery($sql, [$username], 's');
        $count = self::$db->getResult($result, isCount: true);
        return $count[0] > 0;
    }
    public function emailExists($email)
    {
        $sql = "SELECT COUNT(*) FROM users WHERE email = ?";
        $result = self::$db->executeQuery($sql, [$email], 's');
        $count = self::$db->getResult($result, isCount: true);
        return $count[0] > 0;
    }
    public function isTeamLeader($id)
    {
        $sql = "SELECT COUNT(*) FROM team WHERE team_leader_id = ?;";
        $result = self::$db->executeQuery($sql, [$id], 'i');
        $count = self::$db->getResult($result, isCount: true);
        return $count[0] > 0;
    }

    public function createUser($name, $username, $email, $password)
    {
        $sql = "INSERT INTO `users`(`name`, `username`, `email`, `password_hash`) VALUES (?,?,?,?);";
        $args = [$name, $username, $email, $password];
        $id = self::$db->executeInsert($sql, $args, 'ssss');
        return $id;
    }
    public function verifyUser($email, $password)
    {
        $sql = "SELECT `id` FROM `Users` WHERE `email`=? AND `password_hash`=?;";
        $args = [$email, $password];
        $result = self::$db->executeQuery($sql, $args, 'ss');
        $res = self::$db->getResult($result, count:1);
        if ($res == null){
           return 0;
        }
        return $res['id'];
    }
    public function getUserData($id){
        $sql = "SELECT `name`, `username`, `email`, `team_id` FROM `Users` WHERE `id` = ?";
        $result = self::$db->executeQuery($sql,[$id],'i');
        $res = self::$db->getResult($result, 1);
        if (!$res){
           return 0;
        }
        return $res;
    }
    public function getUserName($id){

        $sql = "SELECT `username` FROM `Users` WHERE `id`=?;";
        $args = [$id];
        $result = self::$db->executeQuery($sql, $args, 's');
        $res = self::$db->getResult($result, count:1);
        return $res['username'];
    }
}
