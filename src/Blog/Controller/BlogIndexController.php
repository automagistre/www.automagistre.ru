<?php

declare(strict_types=1);

namespace App\Blog\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

final class BlogIndexController extends AbstractController
{
    /**
     * @Route("/blog", name="blog_index")
     */
    public function __invoke(): Response
    {
        return $this->render('blog/index.html.twig', [
        ]);
    }
}
