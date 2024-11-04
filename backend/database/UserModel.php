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

    public function create($name, $username, $email, $password)
    {
        $sql = "INSERT INTO `users`(`name`, `username`, `email`, `password_hash`); VALUES (?,?,?,?);";
        $args = [$name, $username, $email, $password];
        $id = self::$db->executeInsert($sql, $args, 'ssss');

        return $id;
    }
    public function verifyUser($email, $password)
    {
        $sql = "SELECT COUNT(*) FROM `Users` WHERE `email`=? AND `password_hash`=?;";
        $password_hash = password_hash($password, PASSWORD_DEFAULT);
        $args = [$email, $password];
        $result = self::$db->executeQuery($sql, $args, 'ss');
        $res = self::$db->getResult($result, isCount: true);
        return $res[0] > 0;
    }
}
