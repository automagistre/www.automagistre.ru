<?php

declare(strict_types=1);

namespace App\Service\Router;

use App\Service\Constants;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

/**
 * @author Konstantin Grachev <me@grachevko.ru>
 */
final class BrandListener implements EventSubscriberInterface
{
    private const BRAND_SESSION = '_brand';

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::REQUEST => 'onKernelRequest',
        ];
    }

    public function onKernelRequest(RequestEvent $event): void
    {
        $request = $event->getRequest();
        $session = $request->getSession();

        if (
            $request->query->has('brand')
            && \in_array($brand = $request->query->get('brand'), Constants::BRANDS, true)
        ) {
            $session->set(self::BRAND_SESSION, $brand);
            $request->attributes->set('brand', $brand);

            return;
        }

        $brand = $request->attributes->get('brand');
        $brandSession = $session->get(self::BRAND_SESSION);

        if (null !== $brand && $brandSession !== $brand) {
            $session->set(self::BRAND_SESSION, $brand);
        }

        if (null === $brand && null !== $brandSession) {
            $request->attributes->set('brand', $brandSession);
        }
    }
}
