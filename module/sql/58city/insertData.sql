CREATE TABLE IF NOT EXISTS `58city_test` (
       `id` INT(8) AUTO_INCREMENT PRIMARY KEY NOT NULL,
       `title` VARCHAR(256),
       `link` VARCHAR(256),
       `type` VARCHAR(256),
       `direction` VARCHAR(256),
       `square` VARCHAR(256),
       `traffic` VARCHAR(256),
       `address` VARCHAR(256),
       `lng` VARCHAR(256),
       `lat` VARCHAR(256),
       `price` VARCHAR(256)
);

insert into `58city_test` (title,link,`type`,direction,square,traffic,`address`,lng,lat,price)
values ("{$title}","{$link}","{$type}","{$direction}","{$square}","{$traffic}","{$address}","{$lng}","{$lat}",
"{$price}");