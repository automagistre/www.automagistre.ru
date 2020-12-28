<?php

use Symfony\Bundle\FrameworkBundle\Controller\RedirectController;
use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;

return static function (RoutingConfigurator $routes): void {
    foreach ([
        '/articles/Qashgai_podvesk_epicfail' => '/blog/qashgai-podveska-epicfail',
        '/articles/MR20DE_kapec' => '/blog/head-of-mr20de-problem',
        '/articles/funny-things/2JZGE_belt' => '/blog/break-timing-belt-2jzge',
        '/articles/nissan_micra_k12_note_e11' => '/blog/micra-k12-note-e10-maintenance',
        '/articles/avtoservis_o_qashqai_i_x-trail' => '/blog/nissan-qashgai-xtrail-maintenance',
        '/articles/nissan-almera-classic_opyt' => '/blog/nissan-almera-classic-maintenance',
        '/articles/238' => '/blog/adjustment-of-valves-and-gbo-kaput',
        '/articles/murano_chain' => '/blog/murano-chain',
        '/manuals/samodiagnostika-nissan' => '/blog/samodiagnostika-nissan',
        '/manuals/obuchenie-drosselja-nissan' => '/blog/obuchenie-drosselja-nissan',
        '/manuals/obuchenie-drosselja-toyota' => '/blog/obuchenie-drosselja-toyota',
        '/price/calculator/nissan' => '/service/nissan/maintenance',
        '/price/calculator/toyota' => '/service/toyota/maintenance',
        '/besplatnaja-diagnostika' => '/service/nissan/diagnostics/free',
        '/reviews' => '/service/nissan/reviews',
        '/shinomontazh-tekstilschiki' => '/service/nissan/tire',
        '/kompjuternaja-diagnostika-avto' => '/service/nissan/diagnostics/comp',
        '/online' => '/service/nissan/maintenance',
        '/contacts' => '/service/nissan/contacts',
        '/stoimost-comp-diagnostiki' => '/service/nissan/diagnostics/comp',
        '/manuals' => '/blog',
        '/video' => '/blog',
        '/review_us' => '/service/nissan/reviews',
        '/corporate' => '/service/nissan/corporates',
        '/price' => '/service/nissan/maintenance',
        '/parts/price' => '/service/nissan/maintenance',
        '/news' => '/blog',
        '/diagnostica-nissan' => '/service/nissan/diagnostics/free',
    ] as $old => $new) {
        $routes->add('old_redirect_'.\md5($old), $old)
            ->controller(RedirectController::class)
            ->defaults([
                'path' => $new,
                'permanent' => true,
            ]);
    }
};
