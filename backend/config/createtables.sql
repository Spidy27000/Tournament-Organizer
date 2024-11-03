CREATE TABLE `Users` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `team_id` INT DEFAULT NULL
);

CREATE TABLE `Team` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL UNIQUE,
    `no_of_members` INT DEFAULT 1,
    `team_leader_id` INT ,
    FOREIGN KEY (`team_leader_id`) REFERENCES `Users`(`id`) ON DELETE SET NULL
);


CREATE TABLE `Tournament` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL UNIQUE,
    `start_date` DATE NOT NULL,
    `status` ENUM('On Going', 'Finished', 'Not Started') NOT NULL,
    `type` ENUM('Single Elm', 'Double Elm', 'Ladder') NOT NULL,
    `visibility` ENUM('Public', 'Private') NOT NULL,
    `organizer_id` INT NOT NULL,
    FOREIGN KEY (`organizer_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE
);

CREATE TABLE `Tournament_Teams` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `tournament_id` INT NOT NULL,
    `team_id` INT,
    `user_id` INT,
    `type` ENUM('Team', 'Individual') NOT NULL,
    FOREIGN KEY (`tournament_id`) REFERENCES `Tournament`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`team_id`) REFERENCES `Team`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE
);

CREATE TABLE `Team_Players` (
    `user_id` INT,
    `team_id` INT,
    PRIMARY KEY (`user_id`, `team_id`),
    FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`team_id`) REFERENCES `Team`(`id`) ON DELETE CASCADE
);

CREATE TABLE `Bracket_Match` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `tournament_id` INT NOT NULL,
    `team1_id` INT,
    `team2_id` INT,
    `winner_id` INT,
    `loser_id` INT,
    `winner_next_id` INT,
    `loser_next_id` INT,
    `match_number` INT NOT NULL,
    `round_number` INT NOT NULL,
    `score` INT NOT NULL,
    `is_bye` TINYINT(1) NOT NULL DEFAULT 0,
    `status` ENUM('On Going', 'Finished', 'Not Started') NOT NULL,
    FOREIGN KEY (`tournament_id`) REFERENCES `Tournament`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`team1_id`) REFERENCES `Tournament_Teams`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`team2_id`) REFERENCES `Tournament_Teams`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`winner_id`) REFERENCES `Tournament_Teams`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`loser_id`) REFERENCES `Tournament_Teams`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`winner_next_id`) REFERENCES `Bracket_Match`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`loser_next_id`) REFERENCES `Bracket_Match`(`id`) ON DELETE SET NULL
);

CREATE TABLE `Ladder_Match` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `tournament_id` INT,
    `match_number` INT NOT NULL,
    `status` ENUM('On Going', 'Finished', 'Not Started') NOT NULL,
    FOREIGN KEY (`tournament_id`) REFERENCES `Tournament`(`id`) ON DELETE SET NULL
);

CREATE TABLE `Bracket_Match_Points` (
    `team_id` INT NOT NULL,
    `points` INT NOT NULL,
    PRIMARY KEY (`team_id`),
    FOREIGN KEY (`team_id`) REFERENCES `Tournament_Teams`(`id`) ON DELETE CASCADE
);

CREATE TABLE `Ladder_Match_Points` (
    `team_id` INT NOT NULL,
    `match_id` INT NOT NULL,
    `points` INT NOT NULL,
    PRIMARY KEY (`team_id`, `match_id`),
    FOREIGN KEY (`team_id`) REFERENCES `Tournament_Teams`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`match_id`) REFERENCES `Ladder_Match`(`id`) ON DELETE CASCADE
);