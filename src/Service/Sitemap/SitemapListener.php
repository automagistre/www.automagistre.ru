<?php

declare(strict_types=1);

namespace App\Service\Sitemap;

use App\Service\Constants;
use Presta\SitemapBundle\Event\SitemapPopulateEvent;
use Presta\SitemapBundle\Sitemap\Url\UrlConcrete;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Routing\RouterInterface;

final class SitemapListener implements EventSubscriberInterface
{
    private const ROUTES = [
        'contacts',
        'corporates',
        'diagnostic_free',
        'diagnostic_comp',
        'maintenance',
        'reviews',
        'service',
        'tire',
    ];

    private RouterInterface $router;

    public function __construct(RouterInterface $router)
    {
        $this->router = $router;
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents(): array
    {
        return [
            SitemapPopulateEvent::ON_SITEMAP_POPULATE => 'onEvent',
        ];
    }

    public function onEvent(SitemapPopulateEvent $event): void
    {
        $urlContainer = $event->getUrlContainer();

        foreach (self::ROUTES as $route) {
            foreach (Constants::BRANDS as $brand) {
                $loc = $this->router->generate($route, [
                    'brand' => $brand,
                ], UrlGeneratorInterface::ABSOLUTE_URL);

                $urlContainer->addUrl(
                    new UrlConcrete(
                        $loc,
                        null,
                        UrlConcrete::CHANGEFREQ_WEEKLY,
                        1
                    ),
                    'service',
                );
            }
        }
    }
}
