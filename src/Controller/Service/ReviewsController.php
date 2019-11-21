<?php

declare(strict_types=1);

namespace App\Controller\Service;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Cache;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @author Konstantin Grachev <me@grachevko.ru>
 */
final class ReviewsController extends AbstractController
{
    private const REVIEWS_PER_PAGE = 9;

    /**
     * @Route("/reviews", name="reviews")
     *
     * @Cache(vary={"X-Requested-With"})
     */
    public function __invoke(Request $request): Response
    {
        $page = $request->query->getInt('page', 1);
        $manufacturer = $request->query->getAlnum('manufacturer', 'all');

        return new Response('', Response::HTTP_NO_CONTENT);

        /*
        if ($request->isXmlHttpRequest()) {
            return $this->render('Service/Reviews/reviews.html.twig', [
                'reviews' => $reviews,
            ]);
        }

        return $this->render('Service/Reviews/index.html.twig', [
            'reviews' => $reviews,
            'manufacturer' => $manufacturer,
            'reviewsCount' => $this->reviewsCount($em),
        ]);
        */
    }

    public function section(Request $request): Response
    {
        $brand = $request->attributes->getAlnum('brand');

        return new Response();
        /*
        return $this->render('Service/Reviews/section.html.twig', [
            'reviews' => $reviews,
            'brand' => $brand,
            'reviewsCount' => $this->reviewsCount($em),
        ]);
        */
    }
}
