<?php

declare(strict_types=1);

namespace App\Controller\Service;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @author Konstantin Grachev <me@grachevko.ru>
 */
final class PriceListController extends AbstractController
{
    /**
     * @Route("/price-list", name="price-list")
     */
    public function __invoke(): Response
    {
        return $this->render('price_list.html.twig', [
        ]);
    }
}
