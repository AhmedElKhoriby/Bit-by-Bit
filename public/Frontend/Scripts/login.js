const form = document.getElementById("loginForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.token) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data));
                if (username.toLowerCase() === "admin") {
                    localStorage.setItem("role", "admin");
                    window.location.href = "dashboard.html";
                } else {
                    localStorage.setItem("role", "user");
                    window.location.href = "index.html";
                }
            } else {
                alert("Invalid credentials!");
            }
        })
        .catch((err) => {
            console.error("Login error:", err);
            alert("Something went wrong. Please try again.");
        });
});
