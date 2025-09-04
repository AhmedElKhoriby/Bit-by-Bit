const API_URL = "http://127.0.0.1:3000"; // dummy JSON server

// يجيب اليوزر اللي عامل لوج ان (من API أو sessionStorage)
const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

if (!loggedInUser) {
  // لو مفيش يوزر عامل لوج ان → رجّعه على صفحة اللوج ان
  window.location.href = "login.html";
} else {
  // عرض بيانات المستخدم
  document.getElementById("user-name").textContent = loggedInUser.name;
  document.getElementById("user-email").textContent = loggedInUser.email;

  // عرض المقالات بتاعته
  fetch(`${API_URL}/users/${loggedInUser.id}/articles`)
    .then(res => res.json())
    .then(articles => {
      const postsContainer = document.getElementById("user-posts-container");

      articles.forEach(article => {
        const card = document.createElement("div");
        card.className = "card mb-3";

        card.innerHTML = `
          <div class="card-header d-flex justify-content-between">
            <span>${loggedInUser.name}</span>
            <small>${new Date(article.created_at).toLocaleDateString()}</small>
          </div>

          <div class="card-body">
            <h5 class="card-title">${article.title}</h5>
            <p class="card-text">${article.content}</p>
            <button class="btn btn-sm btn-link text-primary" onclick="toggleComments(${article.id})">
              💬 Show Comments
            </button>
            <div id="comments-${article.id}" class="mt-2" style="display:none;"></div>
          </div>

          <div class="card-footer">
            <button class="btn btn-sm btn-warning" onclick="editPost(${article.id})">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deletePost(${article.id})">Delete</button>
          </div>
        `;

        postsContainer.appendChild(card);
      });
    })
    .catch(err => console.error("Error fetching articles:", err));
}

// جلب الكومنتات
function toggleComments(articleId) {
  const commentsContainer = document.getElementById(`comments-${articleId}`);

  if (commentsContainer.style.display === "none") {
    fetch(`${API_URL}/articles/${articleId}/comments`)
      .then(res => res.json())
      .then(comments => {
        commentsContainer.innerHTML = "";
        comments.forEach(comment => {
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

function editPost(id) {
  alert("Edit post with ID: " + id);
}

function deletePost(id) {
  alert("Delete post with ID: " + id);
}
