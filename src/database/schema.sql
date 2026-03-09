CREATE TABLE `users`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `created_at` DATE NOT NULL,
    `last_seen_at` DATE NOT NULL,
    `username` TEXT NOT NULL,
    `name` TEXT NOT NULL,
    `biography` TEXT NOT NULL,
    `email` TEXT NOT NULL,
    `password` TEXT NOT NULL,
    `avatar` TEXT NOT NULL,
    `is_banned` BOOLEAN NOT NULL,
    `warn` INT NOT NULL
);
CREATE TABLE `messages`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `created_at` DATE NOT NULL,
    `from_user_id` BIGINT NOT NULL,
    `to_user_id` BIGINT NOT NULL,
    `content` TEXT NOT NULL,
    `attachment` TEXT NOT NULL,
    `is_read` BOOLEAN NOT NULL
);
CREATE TABLE `friends`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `is_pending` BOOLEAN NOT NULL,
    `friend_at` DATE NOT NULL
);
ALTER TABLE
    `users` ADD CONSTRAINT `users_id_foreign` FOREIGN KEY(`id`) REFERENCES `messages`(`to_user_id`);
ALTER TABLE
    `users` ADD CONSTRAINT `users_id_foreign` FOREIGN KEY(`id`) REFERENCES `messages`(`from_user_id`);
ALTER TABLE
    `friends` ADD CONSTRAINT `friends_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);