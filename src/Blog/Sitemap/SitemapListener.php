<?php

declare(strict_types=1);

namespace App\Blog\Sitemap;

use DateTimeImmutable;
use Presta\SitemapBundle\Event\SitemapPopulateEvent;
use Presta\SitemapBundle\Sitemap\Url\UrlConcrete;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Routing\RouterInterface;
use function Symfony\Component\String\u;

final class SitemapListener implements EventSubscriberInterface
{
    private string $projectDir;

    private RouterInterface $router;

    public function __construct(string $projectDir, RouterInterface $router)
    {
        $this->projectDir = $projectDir;
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

        foreach (Finder::create()->in($this->projectDir.'/templates/blog/articles')->files() as $file) {
            $slug = u($file->getFilename())
                ->replace('.html.twig', '')
                ->replace('_', '-')
                ->toString();

            $urlContainer->addUrl(
                new UrlConcrete(
                    $this->router->generate('blog_show', [
                        'slug' => $slug,
                    ], UrlGeneratorInterface::ABSOLUTE_URL),
                    new DateTimeImmutable('@'.$file->getMTime()),
                    UrlConcrete::CHANGEFREQ_WEEKLY,
                    0.9,
                ),
                'blog',
            );
        }
    }
}
