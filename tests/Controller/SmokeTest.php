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
     * @dataProvider blogs
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

        foreach ($this->servicesPages() as $page) {
            $path = $page[0];
            foreach (['nissan', 'lexus', 'infiniti', 'toyota'] as $brand) {
                $page[0] = \sprintf('/service/%s', $brand.$path);

                yield $page;
            }
        }
    }

    public function blogs(): Generator
    {
        yield ['/blog', 200];
        yield ['/blog/head-of-mr20de-problem', 200];
        yield ['/blog/qashgai-podveska-epicfail', 200];
        yield ['/blog/micra-k12-note-e10-maintenance', 200];
        yield ['/blog/murano-chain', 200];
        yield ['/blog/adjustment-of-valves-and-gbo-kaput', 200];
        yield ['/blog/nissan-qashgai-xtrail-maintenance', 200];
        yield ['/blog/nissan-almera-classic-maintenance', 200];
        yield ['/blog/break-timing-belt-2jzge', 200];
        yield ['/blog/samodiagnostika-nissan', 200];
        yield ['/blog/obuchenie-drosselja-nissan', 200];
        yield ['/blog/obuchenie-drosselja-toyota', 200];
        yield ['/blog/fuck', 404];
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
        yield ['/corporates', 200];
        yield ['/price-list', 200];
        yield ['/maintenance', 200];
        yield ['/contacts', 200];
        yield ['/privacy-policy', 200];
    }
}
