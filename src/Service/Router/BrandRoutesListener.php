<?php

declare(strict_types=1);

namespace App\Service\Router;

use App\Router\RoutePreGenerate;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouterInterface;

/**
 * @author Konstantin Grachev <me@grachevko.ru>
 */
final class BrandRoutesListener implements EventSubscriberInterface
{
    /**
     * @var RequestStack
     */
    private $requestStack;

    public function __construct(RequestStack $requestStack)
    {
        $this->requestStack = $requestStack;
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents(): array
    {
        return [
            RoutePreGenerate::class => 'onRouterPreGenerate',
        ];
    }

    public function onRouterPreGenerate(RoutePreGenerate $event): void
    {
        $router = $event->getSubject();

        ['name' => $name, 'parameters' => $parameters, 'referenceType' => $referenceType] = $event->getArguments();

        $route = $router->getRouteCollection()->get($name);

        if (!$route instanceof Route) {
            return;
        }

        if (\array_key_exists('brand', $parameters)) {
            return;
        }

        if (!$route->hasRequirement('brand')) {
            return;
        }

        $request = $this->requestStack->getCurrentRequest();
        if (null === $request) {
            return;
        }

        $brand = $request->attributes->get('brand');
        if (null === $brand) {
            $name = 'switch';
            $parameters = [];
            $referenceType = RouterInterface::ABSOLUTE_PATH;
        } else {
            $parameters['brand'] = $brand;
        }

        $event->setArguments(\compact('name', 'parameters', 'referenceType'));
    }
}
