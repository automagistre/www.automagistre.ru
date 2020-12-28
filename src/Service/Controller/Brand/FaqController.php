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
final class FaqController extends AbstractController
{
    /**
     * @Route("/faq", name="faq", methods={"POST"})
     */
    public function __invoke(Request $request): Response
    {
        return $this->render('_sections/faq.html.twig', [
            'scroll' => $request->query->getBoolean('scroll'),
        ]);
    }
}
