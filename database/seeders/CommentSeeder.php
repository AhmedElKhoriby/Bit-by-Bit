<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Comment;
use App\Models\User;
use App\Models\Article;

class CommentSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $articles = Article::all();

        $comments = [
            'Great article! Very informative.',
            'Thanks for sharing this knowledge.',
            'I learned something new today.',
            'Could you provide more examples?',
            'This is exactly what I was looking for.',
            'Well explained and easy to understand.',
            'Looking forward to more content like this.',
            'Very helpful tutorial.',
            'This cleared up my confusion.',
            'Excellent work!'
        ];

        foreach ($articles as $article) {
            // Add 2-5 comments per article
            $commentCount = rand(2, 5);
            
            for ($i = 0; $i < $commentCount; $i++) {
                Comment::create([
                    'content' => $comments[array_rand($comments)],
                    'user_id' => $users->random()->id,
                    'article_id' => $article->id
                ]);
            }
        }
    }
}