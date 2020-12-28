<?php

use Symfony\Component\Dotenv\Dotenv;
use Symfony\Component\ErrorHandler\Debug;

require \dirname(__DIR__).'/vendor/autoload.php';

if (\class_exists(Dotenv::class) && \file_exists($path = \dirname(__DIR__).'/.env')) {
    (new Dotenv(false))->loadEnv($path);
}

$_SERVER += $_ENV;
$_SERVER['APP_ENV'] = $_ENV['APP_ENV'] = ($_SERVER['APP_ENV'] ?? $_ENV['APP_ENV'] ?? null) ?: 'dev';
$_SERVER['APP_DEBUG'] = $_SERVER['APP_DEBUG'] ?? $_ENV['APP_DEBUG'] ?? 'prod' !== $_SERVER['APP_ENV'];
$_SERVER['APP_DEBUG'] = $_ENV['APP_DEBUG'] = (int) $_SERVER['APP_DEBUG'] || \filter_var($_SERVER['APP_DEBUG'], FILTER_VALIDATE_BOOLEAN) ? '1' : '0';

if ($_SERVER['APP_DEBUG']) {
    \umask(0000);
    if (\class_exists(Debug::class)) {
        Debug::enable();
    }
}
