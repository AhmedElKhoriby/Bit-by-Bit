document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const role = document.getElementById("role").value;

  fetch("http://127.0.0.1:8000/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
      role: role,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Signup failed with status " + res.status);
      }
      return res.json();
    })
    .then((data) => {
      console.log("Signup response:", data);

      // ✅ خزن بيانات اليوزر في localStorage عشان تقدر تعرضها بعدين في البروفايل
      localStorage.setItem("user", JSON.stringify(data.user ?? data));
      localStorage.setItem("role", role);

      alert("Signup successful! Redirecting...");

      // ✅ حوله على حسب الدور بتاعه
      if (role === "admin") {
        window.location.href = "dashboard.html";
      } else {
        window.location.href = "index.html";
      }
    })
    .catch((err) => {
      console.error("Signup error:", err);
      alert("Something went wrong. Please try again.");
    });
});
