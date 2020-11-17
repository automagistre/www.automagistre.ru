<?php

declare(strict_types=1);

namespace App\Tests\Controller;

use Generator;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

/**
 * @author Konstantin Grachev <me@grachevko.ru>
 */
final class SmokeTest extends WebTestCase
{
    /**
     * @dataProvider pagesProvider
     */
    public function testPages(string $url, int $statusCode): void
    {
        $client = self::createClient();
        $client->setServerParameter('HTTP_HOST', 'www.automagistre.ru');

        $client->request('GET', $url);
        $response = $client->getResponse();

        static::assertSame($statusCode, $response->getStatusCode());
    }

    /**
     * @return Generator<array>
     */
    public function pagesProvider(): Generator
    {
        yield ['/', 200];
        yield ['/shop/', 200];
        yield ['/garage/', 200];
        yield ['/blog/', 200];
        yield ['/blog/1', 200];

        foreach ($this->servicesPages() as $page) {
            $path = $page[0];
            foreach (['nissan', 'lexus', 'infiniti', 'toyota'] as $brand) {
                $page[0] = \sprintf('/service/%s', $brand.$path);

                yield $page;
            }
        }
    }

    /**
     * @return Generator<array>
     */
    private function servicesPages(): Generator
    {
        yield ['/repair', 200];
        yield ['/diagnostics/free', 200];
        yield ['/diagnostics/comp', 200];
        yield ['/tire', 200];
        yield ['/brands', 200];
        yield ['/corporates', 200];
        yield ['/price-list', 200];
        yield ['/maintenance', 200];
        yield ['/contacts', 200];
        yield ['/privacy-policy', 200];
    }
}
