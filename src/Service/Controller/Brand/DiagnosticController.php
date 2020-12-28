<?php

declare(strict_types=1);

namespace App\Service\Controller\Brand;

use LogicException;
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
final class DiagnosticController extends AbstractController
{
    /**
     * @Route("/diagnostics/{type}", name="diagnostics", requirements={"type": "free|comp"})
     */
    public function __invoke(Request $request, MailerInterface $mailer, string $type): Response
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
                ->subject(\sprintf('Запись на %s диагностику', [
                    'free' => 'бесплатную',
                    'comp' => 'компьютерную',
                ][$type]))
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

        if ('comp' === $type) {
            return $this->render('diagnostics_comp.html.twig', [
                'form' => $form->createView(),
            ]);
        }

        if ('free' === $type) {
            return $this->render('diagnostics_free.html.twig', [
                'form' => $form->createView(),
            ]);
        }

        throw new LogicException('Unreachable statement');
    }
}
