<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CommentController extends Controller
{
    public function index(): JsonResponse
    {
        $comments = Comment::with(['user', 'article'])
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $comments
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'content' => 'required|string',
            'user_id' => 'required|exists:users,id',
            'article_id' => 'required|exists:articles,id'
        ]);

        $comment = Comment::create([
            'content' => $request->input('content'),
            'user_id' => $request->input('user_id'),
            'article_id' => $request->input('article_id')
        ]);

        $comment->load(['user', 'article']);

        return response()->json([
            'success' => true,
            'message' => 'Comment created successfully',
            'data' => $comment
        ], 201);
    }

    public function show(Comment $comment): JsonResponse
    {
        $comment->load(['user', 'article']);
        
        return response()->json([
            'success' => true,
            'data' => $comment
        ]);
    }

    public function update(Request $request, Comment $comment): JsonResponse
    {
        $request->validate([
            'content' => 'required|string',
        ]);

        $comment->update([
            'content' => $request->input('content')
        ]);
        
        $comment->load(['user', 'article']);

        return response()->json([
            'success' => true,
            'message' => 'Comment updated successfully',
            'data' => $comment
        ]);
    }

    public function destroy(Comment $comment): JsonResponse
    {
        $comment->delete();

        return response()->json([
            'success' => true,
            'message' => 'Comment deleted successfully'
        ]);
    }

    public function articleComments($articleId): JsonResponse
    {
        $comments = Comment::where('article_id', $articleId)
            ->with(['user'])
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $comments
        ]);
    }

    public function userComments($userId): JsonResponse
    {
        $comments = Comment::where('user_id', $userId)
            ->with(['article', 'user'])
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $comments
        ]);
    }
}