<?php

declare(strict_types=1);

use App\Blog\Routing\BlogLoader;
use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use function Symfony\Component\DependencyInjection\Loader\Configurator\service;

return static function (ContainerConfigurator $configurator): void {
    $configurator->parameters()
        ->set('router.request_context.host', 'www.automagistre.ru')
        ->set('router.request_context.scheme', 'https')
    ;

    $services = $configurator->services();

    $services
        ->defaults()
        ->autowire()
        ->autoconfigure()
        ->bind('string $projectDir', '%kernel.project_dir%')
    ;

    $services
        ->load('App\\', \dirname(__DIR__).'/src')
        ->exclude(\dirname(__DIR__).'/src/**/config.php');

    $services
        ->get(App\Router\ListeningRouterDecorator::class)
        ->decorate('router');

    $services
        ->get(BlogLoader::class)
        ->args([
            service(Symfony\Component\HttpKernel\Config\FileLocator::class),
        ])
        ->tag('routing.loader');
};
