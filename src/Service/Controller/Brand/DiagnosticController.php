<?php

declare(strict_types=1);

namespace App\Service\Controller\Brand;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @author Konstantin Grachev <me@grachevko.ru>
 */
final class DiagnosticController extends AbstractController
{
    /**
     * @Route("/diagnostics/free", name="diagnostic_free")
     */
    public function free(): Response
    {
        return $this->render('diagnostics_free.html.twig', [
        ]);
    }

    /**
     * @Route("/diagnostics/comp", name="diagnostic_comp")
     */
    public function comp(): Response
    {
        return $this->render('diagnostics_comp.html.twig', [
        ]);
    }
}
