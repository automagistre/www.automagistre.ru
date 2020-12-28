<?php

declare(strict_types=1);

namespace App\Service\Controller\Brand;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @author Konstantin Grachev <me@grachevko.ru>
 */
final class CorporatesController extends AbstractController
{
    /**
     * @Route("/corporates", name="corporates")
     */
    public function __invoke(Request $request): Response
    {
        return $this->render('corporates.html.twig', [
        ]);
    }
}
