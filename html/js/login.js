const loginBtn = document.getElementById("loginBtn");
const loginMsg = document.getElementById("loginMsg");

loginBtn.addEventListener("click", doLogin);

async function doLogin() {
  loginMsg.textContent = "";

  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (username === "" || password === "") {
    loginMsg.textContent = "Please enter username and password.";
    return;
  }

  const payload = {
    login: username,
    password: password
  };

  try {
    const res = await fetch("/API/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    // login.php: success => userId > 0 and error == ""
    if (data.userId && Number(data.userId) > 0 && data.error === "") {
      localStorage.setItem("userId", String(data.userId));
      localStorage.setItem("firstName", data.firstName || "");
      localStorage.setItem("lastName", data.lastName || "");

      window.location.href = "/contacts.html";
      return;
    }

    // fail
    loginMsg.textContent = data.error || "Login failed.";
  } catch (err) {
    loginMsg.textContent = "Network error. Please try again.";
    console.error(err);
  }
}