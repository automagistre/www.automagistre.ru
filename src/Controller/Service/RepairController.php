<?php

declare(strict_types=1);

namespace App\Controller\Service;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @author Konstantin Grachev <me@grachevko.ru>
 */
final class RepairController extends AbstractController
{
    /**
     * @Route("/repair", name="repair")
     */
    public function __invoke(): Response
    {
        return $this->render('repair.html.twig', [
        ]);
    }
}
