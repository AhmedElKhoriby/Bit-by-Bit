<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;
use App\Models\User;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();

        $articles = [
            [
                'title' => 'Introduction to Laravel',
                'content' => 'Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling.',
                'user_id' => $users->random()->id
            ],
            [
                'title' => 'Understanding PHP 8 Features',
                'content' => 'PHP 8 comes with many new features and improvements that make development faster and more efficient. Let\'s explore some of the key features.',
                'user_id' => $users->random()->id
            ],
            [
                'title' => 'Building APIs with Laravel',
                'content' => 'Creating robust APIs is essential for modern web development. Laravel provides excellent tools for building RESTful APIs.',
                'user_id' => $users->random()->id
            ],
            [
                'title' => 'Database Design Best Practices',
                'content' => 'Good database design is crucial for application performance and maintainability. Here are some best practices to follow.',
                'user_id' => $users->random()->id
            ],
            [
                'title' => 'Frontend and Backend Integration',
                'content' => 'Modern web applications require seamless integration between frontend and backend systems. Let\'s explore how to achieve this.',
                'user_id' => $users->random()->id
            ]
        ];

        foreach ($articles as $article) {
            Article::create($article);
        }
    }
}