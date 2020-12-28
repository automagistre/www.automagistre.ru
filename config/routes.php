<?php

declare(strict_types=1);

use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;

return static function (RoutingConfigurator $routes): void {
    $routes
        ->import(__DIR__.'/routes/old_redirects.php')
    ;

    $routes
        ->import(__DIR__.'/../src/Service/Controller/Brand', 'annotation')
        ->prefix('/service/{brand}')
        ->requirements([
            'brand' => \implode('|', App\Service\Constants::BRANDS),
        ])
    ;

    $routes
        ->import(__DIR__.'/../src/Shop/Controller', 'annotation')
        ->namePrefix('shop_')
        ->prefix('/shop')
    ;

    $routes
        ->import(__DIR__.'/../src/Blog/Controller', 'annotation')
    ;
    $routes
        ->import(__DIR__.'/../templates/blog/articles', 'blog')
    ;

    $routes
        ->import(__DIR__.'/../src/Garage/Controller')
        ->namePrefix('garage_')
        ->prefix('/garage')
    ;

    $routes
        ->import(__DIR__.'/../src/Service/Controller/SwitchController.php', 'annotation')
    ;
};
