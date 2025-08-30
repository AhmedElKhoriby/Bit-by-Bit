# 📘 Articles API Documentation

This API allows the frontend to interact with the **Articles** resource in the blog application.

---

## Base URL

```
http://your-domain.com/api
```

---

## Endpoints

### 1. **Get All Articles**

-   **URL:** `/articles`
-   **Method:** `GET`
-   **Description:** Retrieve a list of all articles.
-   **Query Parameters (optional):**

    -   `page` _(integer)_ → for pagination
    -   `limit` _(integer)_ → number of articles per page

-   **Response (200):**

```json
{
    "data": [
        {
            "id": 1,
            "title": "First Article",
            "content": "This is the content of the first article.",
            "author": "John Doe",
            "created_at": "2025-08-30T12:00:00Z",
            "updated_at": "2025-08-30T12:00:00Z"
        }
    ],
    "meta": {
        "current_page": 1,
        "total": 50,
        "per_page": 10
    }
}
```

---

### 2. **Get Single Article**

-   **URL:** `/articles/{id}`
-   **Method:** `GET`
-   **Description:** Retrieve details of a single article by its ID.
-   **Path Parameter:**

    -   `id` _(integer, required)_

-   **Response (200):**

```json
{
    "id": 1,
    "title": "First Article",
    "content": "This is the content of the first article.",
    "author": "John Doe",
    "created_at": "2025-08-30T12:00:00Z",
    "updated_at": "2025-08-30T12:00:00Z"
}
```

-   **Response (404):**

```json
{
    "message": "Article not found"
}
```

---

### 3. **Create New Article**

-   **URL:** `/articles`
-   **Method:** `POST`
-   **Description:** Create a new article.
-   **Request Body:**

```json
{
    "title": "New Article",
    "content": "This is the content of the new article.",
    "author": "Jane Doe"
}
```

-   **Response (201):**

```json
{
    "message": "Article created successfully",
    "data": {
        "id": 51,
        "title": "New Article",
        "content": "This is the content of the new article.",
        "author": "Jane Doe",
        "created_at": "2025-08-30T12:30:00Z",
        "updated_at": "2025-08-30T12:30:00Z"
    }
}
```

-   **Response (422):**

```json
{
    "errors": {
        "title": ["The title field is required."],
        "content": ["The content field is required."]
    }
}
```

---

### 4. **Update Article**

-   **URL:** `/articles/{id}`
-   **Method:** `PUT`
-   **Description:** Update an existing article.
-   **Path Parameter:**

    -   `id` _(integer, required)_

-   **Request Body (example):**

```json
{
    "title": "Updated Article Title",
    "content": "Updated content goes here."
}
```

-   **Response (200):**

```json
{
    "message": "Article updated successfully",
    "data": {
        "id": 1,
        "title": "Updated Article Title",
        "content": "Updated content goes here.",
        "author": "John Doe",
        "created_at": "2025-08-30T12:00:00Z",
        "updated_at": "2025-08-30T12:45:00Z"
    }
}
```

---

### 5. **Delete Article**

-   **URL:** `/articles/{id}`
-   **Method:** `DELETE`
-   **Description:** Delete an article by ID.
-   **Path Parameter:**

    -   `id` _(integer, required)_

-   **Response (200):**

```json
{
    "message": "Article deleted successfully"
}
```

-   **Response (404):**

```json
{
    "message": "Article not found"
}
```

---

## Error Responses (Common)

-   **401 Unauthorized** → Authentication required.
-   **403 Forbidden** → You do not have permission to perform this action.
-   **404 Not Found** → Resource not found.
-   **500 Internal Server Error** → Unexpected server error.

---

⚡ **Next Steps:**

-   Backend dev should add the route in `routes/api.php`:

```php
Route::apiResource('articles', ArticleController::class);
```

---
