<?php

declare(strict_types=1);

namespace App\Gone;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

final class GoneController extends AbstractController
{
    public function __invoke(): Response
    {
        return new Response('', Response::HTTP_GONE);
    }
}
