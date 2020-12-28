<?php

declare(strict_types=1);

namespace App\Service\Controller\Brand;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @author Konstantin Grachev <me@grachevko.ru>
 */
final class TireController extends AbstractController
{
    /**
     * @Route("/tire", name="tire")
     */
    public function __invoke(): Response
    {
        return $this->render('tire_service.html.twig', [
        ]);
    }
}
