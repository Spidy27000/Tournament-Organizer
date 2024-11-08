<?php
require_once "Database.php";
class UserModel
{
    private static $db;
    public function __construct()
    {
        self::$db = Database::getInst();
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
        $sql = "SELECT COUNT(*) FROM team WHERE team_leader_id = ?";
        $result = self::$db->executeQuery($sql, [$id], 'd');
        $count = self::$db->getResult($result, isCount: true);
        return $count[0] > 0;
    }

    public function createUser($name, $username, $email, $password)
    {
        $sql = "INSERT INTO `users`(`name`, `username`, `email`, `password_hash`) VALUES (?,?,?,?);";
        $password_hash = password_hash($password, PASSWORD_DEFAULT);
        $args = [$name, $username, $email, $password_hash];
        $id = self::$db->executeInsert($sql, $args, 'ssss');
        return $id;
    }
    public function verifyUser($email, $password)
    {
        $sql = "SELECT `id` FROM `Users` WHERE `email`=? AND `password_hash`=?;";
        $password_hash = password_hash($password, PASSWORD_DEFAULT);
        $args = [$email, $password_hash];
        $result = self::$db->executeQuery($sql, $args, 'ss');
        $res = self::$db->getResult($result, count:1);
        if (!$res){
           return 0;
        }
        return $res[0];
    }
    public function getUserData($id){
        $sql = "SELECT `name`, `username`, `email`, `team_id` FROM `Users` WHERE `id` = ?";
        $result = self::$db->executeQuery($sql,[$id],'d');
        $res = self::$db->getResult($result, 1);
        if (!$res){
           return 0;
        }
        return $res;
    }
}
