// بيانات اليوزر (تتجاب من API أو localStorage)
const user = {
  id: 1,
  name: "Lily Habib",
  email: "lily@example.com"
};

// عرض البيانات
document.getElementById("user-name").textContent = user.name;
document.getElementById("user-email").textContent = user.email;

// جلب بوستات اليوزر
const postsContainer = document.getElementById("user-posts-container");

fetch(`http://127.0.0.1:8000/api/users/${user.id}/articles`)
  .then(res => res.json())
  .then(response => {
    const articles = response.data;

    articles.forEach(article => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <div class="card-header d-flex justify-content-between">
          <span>${user.name}</span>
          <small>${new Date(article.created_at).toLocaleDateString()}</small>
        </div>

        <div class="card-body">
          <h5 class="card-title">${article.title}</h5>
          <p class="card-text">${article.content}</p>
          <button class="btn btn-sm btn-link text-primary" onclick="toggleComments(${article.id})">
            💬 Show Comments
          </button>
          <div id="comments-${article.id}" class="mt-2" style="display:none;">
            <p class="text-muted">Loading comments...</p>
          </div>
        </div>

        <div class="card-footer">
          <button class="btn btn-sm btn-edit" onclick="editPost(${article.id})">Edit</button>
          <button class="btn btn-sm btn-delete" onclick="deletePost(${article.id})">Delete</button>
        </div>
      `;

      postsContainer.appendChild(card);
    });
  })
  .catch(err => console.error("Error fetching user posts:", err));

// دالة الكومنتات
function toggleComments(articleId) {
  const commentsContainer = document.getElementById(`comments-${articleId}`);

  if (commentsContainer.style.display === "none") {
    fetch(`http://127.0.0.1:8000/api/articles/${articleId}/comments`)
      .then(res => res.json())
      .then(response => {
        commentsContainer.innerHTML = "";
        response.data.forEach(comment => {
          const commentEl = document.createElement("div");
          commentEl.className = "border-top pt-2";
          commentEl.innerHTML = `<strong>${comment.user?.name ?? "Anon"}:</strong> <span>${comment.content}</span>`;
          commentsContainer.appendChild(commentEl);
        });
      });
    commentsContainer.style.display = "block";
  } else {
    commentsContainer.style.display = "none";
  }
}

// دوال الإيديت وديليت (placeholder)
function editPost(id) {
  alert("Edit post with ID: " + id);
}
function deletePost(id) {
  alert("Delete post with ID: " + id);
}
