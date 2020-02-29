<?php

declare(strict_types=1);

namespace App\Router;

use Symfony\Component\EventDispatcher\GenericEvent;
use Symfony\Component\Routing\RouterInterface;

/**
 * @method RouterInterface getSubject()
 *
 * @author Konstantin Grachev <me@grachevko.ru>
 */
final class RoutePreGenerate extends GenericEvent
{
    /**
     * @param array<mixed, mixed> $arguments
     */
    public function __construct(RouterInterface $subject = null, array $arguments = [])
    {
        parent::__construct($subject, $arguments);
    }
}
