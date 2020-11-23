<?php

declare(strict_types=1);

namespace App\Blog\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

final class BlogShowController extends AbstractController
{
    public function __invoke(string $slug): Response
    {
        $blog = \str_replace(['-'], ['_'], $slug);
        $template = "blog/{$blog}.html.twig";

        return $this->render($template, [
            'slug' => $slug,
        ]);
    }
}
