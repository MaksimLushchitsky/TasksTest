<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/todo", name="api_todo")
 */
class TodoController extends AbstractController
{
    private $entityManager;
    private $todoRepository;

    public function __construct(EntityManagerInterface $entityManager, TodoRepository $todoRepository)
    {
        $this->entityManager = $entityManager;
        $this->todoRepository = $todoRepository;
    }

    /**
     * @Route("/read", name="api_todo_read")
     */
    public function index()
    {
        $todos = $this->todoRepository->findAll();

        $arrayOfTodos = [];

        foreach ($todos as $todo) {
            $arrayOfTodos[] = $todo->toArray();
        }

        return $this->json($arrayOfTodos);
    }

    /**
     * @Route("/create", name="api_todo_create")
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        $content = json_decode($request->getContent());

        $todo = new Todo();

        $todo->setName($content->name);
        $todo->setDescription($content->description);
        $todo->setStatus($content->status);

        try {
            $this->entityManager->persist($todo);
            $this->entityManager->flush();
        } catch (Exception $exception) {
            return $this->json([
                'message' => ['text' => 'Could not submit To-Do to the database.', 'level' => 'error']
            ]);
        }

        return $this->json([
            'todo' => $todo->toArray(),
            'message' => ['text' => 'To-do has been created!', 'level' => 'success']
        ]);
    }

    /**
     * @Route("/update/{id}", name="api_todo_update")
     * @param Request $request
     * @param Todo $todo
     */
    public function update(Request $request, Todo $todo)
    {
        $content = json_decode($request->getContent());

        if ($todo->getName() === $content->name && $todo->getDescription() === $content->description && $todo->getStatus() === $content->status) {
            return $this->json([
                'message' => ['text' => 'There was no change to the To-Do.', 'level' => 'error']
            ]);
        }

        $todo->setName($content->name);
        $todo->setDescription($content->description);
        $todo->setStatus($content->status);

        try {
            $this->entityManager->flush();
        } catch (Exception $exception) {
            return $this->json([
                'message' => ['text' => 'Could not update To-Do in the database.', 'level' => 'error']
            ]);
        }

        return $this->json([
            'todo' => $todo->toArray(),
            'message' => ['text' => 'To-Do successfully updated.', 'level' => 'success']
        ]);
    }

    /**
     * @Route("/delete/{id}", name="api_todo_delete")
     * @param Todo $todo
     */
    public function delete(Todo $todo)
    {
        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        } catch (Exception $exception) {
            return $this->json([
                'message' => ['text' => 'Could not delete To-Do in the database.', 'level' => 'error']
            ]);
        }

        return $this->json([
            'message' => ['text' => 'To-Do successfully deleted from database.', 'level' => 'success']
        ]);
    }
}
