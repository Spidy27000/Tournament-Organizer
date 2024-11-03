<?php
require_once "Database.php";
class UserModel
{
    private static $db;
    public function __construct()
    {
        self::$db = Database::getInst();
    }

    public function create($name, $username, $email, $password)
    {
        $sql = "INSERT INTO `users`(`name`, `username`, `email`, `password_hash`); VALUES (?,?,?,?);";
        $args = [$name, $username, $email, $password];
        $id = self::$db->executeInsert($sql, $args, 'ssss');
        return $id;
    }
    public function verify_user($email, $password){
        $sql = "SELECT id, name, email, username FROM `Users` WHERE `email`=? AND `password_hash`=?;";
        $password_hash = password_hash($password, PASSWORD_DEFAULT);
        $args = [$email, $password];
        $result = self::$db->executeQuery($sql, $args, 'ss');
        $res = self::$db->getResult($result);
        return $res;
    }
}