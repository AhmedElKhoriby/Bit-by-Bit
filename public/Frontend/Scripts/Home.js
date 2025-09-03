const postsContainer = document.getElementById("posts-container");

fetch("http://127.0.0.1:8000/api/articles")
    .then((res) => res.json())
    .then((response) => {
        postsContainer.innerHTML = "";
        response.data.forEach((article) => {
            const card = document.createElement("div");
            card.className = "card mb-4 shadow-sm";

            card.innerHTML = `
        <div class="card-header d-flex justify-content-between">
            <div>
                <strong class="text-white">${article.user?.name ?? "Unknown User"}</strong>
            </div>
            <small class="text-white" >
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
  <a href="article.html?id=${article.id}" class="text-primary">Read More</a>
</div>


        <div class="card-footer  bg-white">
        <!-- input field -->
        <div class="input-group mb-2">
            <input type="text" class="form-control" placeholder="Write your comment..." />
            <button class="btn btn-primary" type="button" onclick="redirectToLogin()">Send</button>
        </div>
        <button class="btn btn-sm btn-link text-primary" id="btnComment" onclick="toggleComments(${
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

function redirectToLogin() {
    window.location.href = "login.html";
}
