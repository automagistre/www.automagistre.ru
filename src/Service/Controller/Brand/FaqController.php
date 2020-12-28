<?php

declare(strict_types=1);

namespace App\Service\Controller\Brand;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @author Konstantin Grachev <me@grachevko.ru>
 */
final class FaqController extends AbstractController
{
    /**
     * @Route("/faq", name="faq", methods={"POST"})
     */
    public function __invoke(Request $request, MailerInterface $mailer): Response
    {
        $form = $this->createFormBuilder(null, [
            'action' => $this->generateUrl('faq'),
        ])
            ->add('name')
            ->add('email', EmailType::class)
            ->add('question', TextareaType::class)
            ->getForm()
            ->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $data = (object) $form->getData();

            $message = (new Email())
                ->from(new Address('no-reply@automagistre.ru', 'Автомагистр'))
                ->replyTo($data->email)
                ->to('info@automagistre.ru')
                ->subject(\sprintf('FAQ Вопрос от %s', $data->name))
                ->text(<<<TEXT
                    Имя: {$data->name}
                    Почта: {$data->email}
                    Вопрос: {$data->question}
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

        return $this->render('_sections/faq.html.twig', [
            'form' => $form->createView(),
            'scroll' => $request->query->getBoolean('scroll'),
        ]);
    }
}
