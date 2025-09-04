const user = JSON.parse(localStorage.getItem("user"));
const navbarContainer = document.getElementById("navbar-container");
const ctaButton = document.getElementById("cta-button");

if (user) {
    navbarContainer.innerHTML = `
    <nav class="navbar navbar-expand-lg bg-light shadow-sm">
      <div class="container-fluid">
        <img src="../Images/croppedblogslogo.png" alt="Logo" height="50" />
        <div>
            <a href="profile.html"
   class="d-inline-block rounded-circle bg-secondary"
   style="width:40px; height:40px; text-align:center; line-height:40px; color:white; text-decoration:none;">
   👤
</a>
            <a class="btn btn-outline-danger logout" href="#">Logout</a>
        </a>
        </div>
      </div>
    </nav>
  `;

    ctaButton.textContent = "Add New Post";
    ctaButton.href = "addPost.html";
} else {
    navbarContainer.innerHTML = `
    <nav class="navbar">
      <img src="../Images/croppedblogslogo.png" alt="Logo" height="50" />
      <div class="nav-links">
        <a class="login" href="login.html">Login</a>
        <a class="signup" href="signup.html">Sign Up</a>
      </div>
    </nav>
  `;
}
document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "logout-btn") {
        localStorage.clear();
        window.location.href = "homepage.html";
    }
});

const postsContainer = document.getElementById("posts-container");

fetch("http://127.0.0.1:8000/api/articles")
    .then((res) => res.json())
    .then((response) => {
        postsContainer.innerHTML = "";
        response.data.forEach((article) => {
            const card = document.createElement("div");
            card.className = "card mb-4 shadow-sm";

            card.innerHTML = `
        <div class="card-header d-flex justify-content-between bg-primary text-white">
          <div><strong>${article.user?.name ?? "Unknown User"}</strong></div>
          <small>
            ${new Date(article.created_at).toLocaleDateString()}
            ${new Date(article.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })}
          </small>
        </div>

        <div class="card-body">
          <h5 class="card-title">${article.title}</h5>
          <p class="card-text">${article.content.substring(0, 100)}...</p>
          <a href="article.html?id=${
              article.id
          }" class="text-primary">Read More</a>
        </div>

        <div class="card-footer bg-white">
          <div class="input-group mb-2">
            <input type="text" class="form-control" id="comment-input-${
                article.id
            }" placeholder="Write your comment..." />
            <button class="btn btn-primary" type="button" onclick="handleComment(${
                article.id
            })">
              Send
            </button>
          </div>
          <button class="btn btn-sm btn-link text-primary" onclick="toggleComments(${
              article.id
          })">
            💬 View All Comments
          </button>
          <div id="comments-${article.id}" class="mt-2" style="display:none;">
            <p class="text-muted">Loading comments...</p>
          </div>
        </div>
      `;
            postsContainer.appendChild(card);
        });
    });
function handleComment(articleId) {
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const input = document.getElementById(`comment-input-${articleId}`);
    const content = input.value.trim();
    if (!content) return alert("Comment cannot be empty!");

    fetch("http://127.0.0.1:8000/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            content,
            user_id: user.id,
            article_id: articleId,
        }),
    })
        .then((res) => res.json())
        .then(() => {
            input.value = "";
            toggleComments(articleId);
        })
        .catch((err) => console.error("Error posting comment:", err));
}

function toggleComments(articleId) {
    const commentsContainer = document.getElementById(`comments-${articleId}`);
    if (commentsContainer.style.display === "none") {
        fetch(`http://127.0.0.1:8000/api/articles/${articleId}/comments`)
            .then((res) => res.json())
            .then((response) => {
                commentsContainer.innerHTML = "";
                if (response.data.length === 0) {
                    commentsContainer.innerHTML = `<p class="text-muted">No comments yet.</p>`;
                    return;
                }
                response.data.forEach((comment) => {
                    const commentEl = document.createElement("div");
                    commentEl.className = "border-top pt-2";
                    commentEl.innerHTML = `<strong>${
                        comment.user?.name ?? "Anon"
                    }:</strong> <span>${comment.content}</span>`;
                    commentsContainer.appendChild(commentEl);
                });
            });
        commentsContainer.style.display = "block";
    } else {
        commentsContainer.style.display = "none";
    }
}
