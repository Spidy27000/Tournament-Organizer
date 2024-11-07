<?php
require "database/TeamModel.php";

class TeamControllor
{
    private static $teamModel;

    public static function init(){
        self::$teamModel = new TeamModel();
    }

}