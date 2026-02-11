const registerBtn = document.getElementById("registerBtn");
const registerMsg = document.getElementById("registerMsg");

registerBtn.addEventListener("click", doRegister);

async function doRegister() {
  registerMsg.textContent = "";

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const username = document.getElementById("regUsername").value.trim();
  const password = document.getElementById("regPassword").value;

  if (!firstName || !lastName || !username || !password) {
    registerMsg.textContent = "Please fill in all fields.";
    return;
  }

  const payload = {
    firstName,
    lastName,
    login: username,
    password
  };

  try {
    const res = await fetch("/API/registration.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (data.error === "") {
      registerMsg.textContent = "Account created! Go to login...";
      setTimeout(() => {
        window.location.href = "/login.html";
      }, 800);
      return;
    }

    registerMsg.textContent = data.error || "Registration failed.";
  } catch (err) {
    registerMsg.textContent = "Network error. Please try again.";
    console.error(err);
  }
}