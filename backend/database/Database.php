<?php
class Database
{
    private static $inst;

    private static $conn;
    private function __construct($conf)
    {
        self::$conn = new mysqli(
            $conf['hostname'],
            $conf['username'],
            $conf['password'],
            $conf['database']
        );
        if (self::$conn->connect_error) {
            echo "connection Failed due to " . self::$conn->connect_error;
        }
    }
    public static function getInst()
    {
        if (self::$inst == null) {
            $conf = require 'config.php';
            self::$inst = new Database($conf);
        }

        return self::$inst;
    }
    public function executeQuery($sql, $args = [], $format = '')
    {
        $stmt = self::$conn->prepare($sql);
        if (!$args) {
            $stmt->bind_param($format, ...$args);
        }
        $stmt->execute();
        return $stmt;
    }
    public function getResult($stmt, $count = null, $isCount = false)
    {
        $result = $stmt->get_result();
        $res = [];
        if ($isCount) {
            $res = $result->fetch_row();
        } else if ($count == null) {
            $res = $result->fetch_all(MYSQLI_ASSOC);
        } else if ($count == 1) {
            $res = $result->fetch_assoc();
        } else {
            $i = 0;
            while ($i < $count && $row = $result->fetch_assoc()) {
                $res[$i] = $row;
                $i++;
            }
        }
        $stmt->close();
        $result->close();
        return $res;
    }
    public function executeInsert($sql, $args, $format)
    {
        $result = $this->executeQuery($sql, $args, $format);
        $result->close();
        return self::$conn->insert_id;
    }
}
