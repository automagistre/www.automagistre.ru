<?php

declare(strict_types=1);

namespace App\Blog\Routing;

use App\Blog\Controller\BlogShowController;
use LogicException;
use Symfony\Component\Config\Loader\FileLoader;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;

final class BlogLoader extends FileLoader
{
    private bool $isLoaded = false;

    /**
     * {@inheritdoc}
     */
    public function load($resource, string $type = null): RouteCollection
    {
        if (true === $this->isLoaded) {
            throw new \RuntimeException('Do not add the "blog" loader twice');
        }

        $dir = $this->locator->locate($resource);
        if (!\is_string($dir) || !\is_dir($dir)) {
            throw new LogicException('Blog loader expect directory as a resource');
        }

        $routes = new RouteCollection();

        $slugs = [];
        foreach (Finder::create()->in($resource)->files() as $file) {
            $blog = \str_replace('.html.twig', '', $file->getFilename());
            if ('index' === $blog) {
                continue;
            }

            $slugs[] = \str_replace('_', '-', $blog);
        }

        $path = '/blog/{slug}';
        $defaults = [
            '_controller' => BlogShowController::class,
        ];
        $requirements = [
            'slug' => \implode('|', $slugs),
        ];

        $route = new Route($path, $defaults, $requirements);
        $routes->add('blog_show', $route);

        $this->isLoaded = true;

        return $routes;
    }

    /**
     * {@inheritdoc}
     */
    public function supports($resource, string $type = null): bool
    {
        return 'blog' === $type;
    }
}
