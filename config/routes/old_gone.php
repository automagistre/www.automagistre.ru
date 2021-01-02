<?php

use App\Gone\GoneController;
use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;

return static function (RoutingConfigurator $routes): void {
    foreach ([
        '/clean_your_engine/',
        '/clubs',
        '/diagnostika-podveski',
        '/diagnostika-dvigatelya',
        '/diagnostika-tex-jidkostei',
        '/remont-rulevogo-upravlenija',
        '/prodazha-avtozapchastej',
        '/comrades',
        '/promo',
        '/service/lexus/faq',
        '/service/infiniti/faq',
        '/service/nissan/faq',
        '/service/toyota/faq',
    ] as $old) {
        $routes
            ->add('old_gone_'.\md5($old), $old)
            ->controller(GoneController::class);
    }

    foreach ([
        '/manuals/{tail}',
        '/news/{tail}',
        '/video/{tail}',
        '/zapchasti{tail}',
        '/articles/{tail}',
        '/promo/{tail}',
        '/reviews/{tail}',
    ] as $old) {
        $routes
            ->add('old_gone_'.\md5($old), $old)
            ->controller(GoneController::class)
            ->requirements([
                'tail' => '.+',
            ]);
    }
};
