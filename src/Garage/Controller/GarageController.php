<?php

declare(strict_types=1);

namespace App\Garage\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @author Konstantin Grachev <me@grachevko.ru>
 */
final class GarageController extends AbstractController
{
    /**
     * @Route(name="index")
     */
    public function index(): Response
    {
        return $this->render('garage/index.html.twig', [
        ]);
    }
}
