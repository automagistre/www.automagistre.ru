<?php

declare(strict_types=1);

namespace App\Controller\Service;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @author Konstantin Grachev <me@grachevko.ru>
 */
final class PrivacyPolicyController extends AbstractController
{
    /**
     * @Route("/privacy-policy", name="privacy-policy")
     */
    public function __invoke(): Response
    {
        return $this->render('privacy_policy.html.twig', [
        ]);
    }
}
