
const params = new URLSearchParams(window.location.search);
const articleId = params.get("id");

const articleContainer = document.getElementById("article-container");
const commentsContainer = document.getElementById("comments-container");

// جلب المقال
fetch(`http://127.0.0.1:8000/api/articles/${articleId}`)
  .then(res => res.json())
  .then(response => {
    const article = response.data;

    articleContainer.innerHTML = `
      <div class="card">
        <div class="card-header">
          <h4>${article.title}</h4>
          <small>${new Date(article.created_at).toLocaleDateString()}</small>
        </div>
        <div class="card-body">
          <p>${article.content}</p>
        </div>
      </div>
    `;
  })
  .catch(err => console.error("Error fetching article:", err));
fetch(`http://127.0.0.1:8000/api/articles/${articleId}/comments`)
  .then(res => res.json())
  .then(response => {
    commentsContainer.innerHTML = `<h5>Comments</h5>`;
    response.data.forEach(comment => {
      const commentEl = document.createElement("div");
      commentEl.className = "card p-2 mb-2";
      commentEl.innerHTML = `<strong>${comment.user?.name ?? "Anon"}:</strong> <span>${comment.content}</span>`;
      commentsContainer.appendChild(commentEl);
    });
  })
  .catch(err => console.error("Error fetching comments:", err));
