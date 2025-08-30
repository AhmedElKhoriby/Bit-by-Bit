<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ArticleController extends Controller
{
    public function index(): JsonResponse
    {
        $articles = Article::with(['user', 'comments.user'])
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $articles
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'user_id' => 'required|exists:users,id'
        ]);

        $article = Article::create([
            'title' => $request->title,
            'content' => $request->input('content'),
            'user_id' => $request->user_id
        ]);

        $article->load(['user', 'comments']);

        return response()->json([
            'success' => true,
            'message' => 'Article created successfully',
            'data' => $article
        ], 201);
    }

    public function show(Article $article): JsonResponse
    {
        $article->load(['user', 'comments.user']);
        
        return response()->json([
            'success' => true,
            'data' => $article
        ]);
    }

    public function update(Request $request, Article $article): JsonResponse
    {
        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
        ]);

        $article->update($request->only(['title', 'content']));
        $article->load(['user', 'comments']);

        return response()->json([
            'success' => true,
            'message' => 'Article updated successfully',
            'data' => $article
        ]);
    }

    public function destroy(Article $article): JsonResponse
    {
        $article->delete();

        return response()->json([
            'success' => true,
            'message' => 'Article deleted successfully'
        ]);
    }

    public function userArticles($userId): JsonResponse
    {
        $articles = Article::where('user_id', $userId)
            ->with(['user', 'comments.user'])
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $articles
        ]);
    }
}