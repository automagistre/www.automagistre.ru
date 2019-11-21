<?php

declare(strict_types=1);

namespace App\Controller\Service;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @author Konstantin Grachev <me@grachevko.ru>
 */
final class BrandsController extends AbstractController
{
    /**
     * @Route("/brands", name="brands")
     */
    public function __invoke(Request $request, MailerInterface $mailer): Response
    {
        $form = $this->createFormBuilder()
            ->add('name')
            ->add('telephone')
            ->add('date')
            ->add('checkbox', CheckboxType::class)
            ->getForm()
            ->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $data = (object) $form->getData();

            $message = (new Email())
                ->from(new Address('no-reply@automagistre.ru', 'Автомагистр'))
                ->to('info@automagistre.ru')
                ->subject('Запись на бесплатную диагностику')
                ->text(<<<TEXT
                    Имя: {$data->name}
                    Телефон: {$data->telephone}
                    Дата: {$data->date}
                    TEXT
                );

            $mailer->send($message);

            return new Response('OK');
        }

        if ($form->isSubmitted() && !$form->isValid()) {
            return $this->json([
                'error' => (string) $form->getErrors(),
            ]);
        }

        return $this->render('brands.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}
