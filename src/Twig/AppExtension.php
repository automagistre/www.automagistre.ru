<?php

declare(strict_types=1);

namespace App\Twig;

use LogicException;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

final class AppExtension extends AbstractExtension
{
    /**
     * {@inheritdoc}
     */
    public function getFunctions(): array
    {
        return [
            new TwigFunction('graphql_url', fn (): string => self::env('GRAPHQL_URL')),
            new TwigFunction('api_url', fn (): string => self::env('API_URL')),
            new TwigFunction('sentry_dsn', fn (): string => self::env('SENTRY_DSN_BROWSER')),
        ];
    }

    private static function env(string $name): string
    {
        $env = \getenv($name);
        if (false === $env) {
            throw new LogicException(\sprintf('"%s" env must be defined.', $name));
        }

        return $env;
    }
}
