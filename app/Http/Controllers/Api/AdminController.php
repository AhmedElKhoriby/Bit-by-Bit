<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\JsonResponse;

class AdminController extends Controller
{
    public function dashboard(): JsonResponse
    {
        $stats = [
            'total_users' => User::count(),
            'total_articles' => Article::count(),
            'total_comments' => Comment::count(),
            'recent_articles' => Article::with(['user', 'comments'])
                ->latest()
                ->take(5)
                ->get(),
            'recent_comments' => Comment::with(['user', 'article'])
                ->latest()
                ->take(5)
                ->get()
        ];

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }

    public function users(): JsonResponse
    {
        $users = User::with(['articles', 'comments'])->get();
        
        return response()->json([
            'success' => true,
            'data' => $users
        ]);
    }

    public function articles(): JsonResponse
    {
        $articles = Article::with(['user', 'comments.user'])->latest()->get();
        
        return response()->json([
            'success' => true,
            'data' => $articles
        ]);
    }

    public function comments(): JsonResponse
    {
        $comments = Comment::with(['user', 'article'])->latest()->get();
        
        return response()->json([
            'success' => true,
            'data' => $comments
        ]);
    }
}