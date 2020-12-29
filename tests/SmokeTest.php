<?php

declare(strict_types=1);

namespace App\Tests;

use App\Service\Constants;
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
     * @dataProvider gone
     */
    public function testPages(string $url, int $statusCode): void
    {
        $client = self::createClient();
        $client->setServerParameter('HTTP_HOST', 'www.automagistre.ru');

        $client->request('GET', $url);
        $response = $client->getResponse();

        static::assertSame($statusCode, $response->getStatusCode());
    }

    public function pagesProvider(): Generator
    {
        yield ['/', 200];
        yield ['/shop/', 200];
        yield ['/garage/', 200];
        yield ['/privacy-policy', 200];

        foreach ($this->servicesPages() as $page) {
            $path = $page[0];
            foreach (Constants::BRANDS as $brand) {
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

    public function redirects(): Generator
    {
        yield ['/manuals', 301];
        yield ['/manuals/', 301];
        yield ['/news/', 301];
        yield ['/news', 301];
        yield ['/video', 301];
        yield ['/video/', 301];
        yield ['/articles', 301];
        yield ['/articles/', 301];
        yield ['/promo/', 301];
        yield ['/reviews', 301];
        yield ['/reviews/', 301];
    }

    public function gone(): Generator
    {
        yield ['/clean_your_engine/', 410];
        yield ['/clubs', 410];
        yield ['/promo', 410];
        yield ['/diagnostika-podveski', 410];
        yield ['/diagnostika-dvigatelya', 410];
        yield ['/diagnostika-tex-jidkostei', 410];
        yield ['/remont-rulevogo-upravlenija', 410];
        yield ['/prodazha-avtozapchastej', 410];
        yield ['/manuals/fuck', 410];
        yield ['/news/fuck', 410];
        yield ['/video/fuck', 410];
        yield ['/zapchasti/', 410];
        yield ['/articles/some-shit', 410];
        yield ['/promo/promomo', 410];
        yield ['/reviews/some-shit', 410];
        yield ['/reviews/some-shit/deeper-shit', 410];
    }

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
    }
}
