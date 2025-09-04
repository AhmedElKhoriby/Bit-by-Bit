fetch("http://127.0.0.1:8000/api/users")
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          const users = response.data;
          const tableBody = document.getElementById("usersTableBody");
          tableBody.innerHTML = "";

          users.forEach(user => {
            const row = `
              <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                  <button class="btn btn-sm btn-warning" onclick="editUser(${user.id})">Edit</button>
                  <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">Delete</button>
                </td>
              </tr>
            `;
            tableBody.innerHTML += row;
          });
        } else {
          document.getElementById("errorBox").innerHTML =
            `<div class="alert alert-danger">Failed to load users!</div>`;
        }
      })
      .catch(err => {
        console.error(err);
        document.getElementById("errorBox").innerHTML =
          `<div class="alert alert-danger">Error: ${err.message}</div>`;
      });
    function deleteUser(userId) {
      if (confirm("Are you sure you want to delete this user?")) {
        fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        })
        .then(res => res.json())
        .then(response => {
          if (response.success) {
            alert("User deleted successfully");
            location.reload();
          } else {
            alert("Failed to delete user");
          }
        })
        .catch(err => alert("Error: " + err.message));
      }
    }
 function editUser(userId) {
    window.location.href = `edituser.html?id=${userId}`;
  }
