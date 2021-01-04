<?php

declare(strict_types=1);

namespace App\Page\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @author Kirill Sidorov <kirillsidorov@gmail.com>
 */
final class GuarantyPolicyController extends AbstractController
{
    /**
     * @Route("/gr", name="guaranty-policy")
     */
    public function __invoke(): Response
    {
        return $this->render('gr.html.twig', [
        ]);
    }
}
