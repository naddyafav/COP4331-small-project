// ===============================
// CONTACTS.JS FULL VERSION
// FAVORITE CONTACTS FEATURE ADDED
// ===============================

// ---------- LOGIN PROTECTION ----------
const userId = localStorage.getItem("userId");
if (!userId || Number(userId) <= 0) {
  window.location.href = "login.html";
}

const firstName = localStorage.getItem("firstName") || "";
const lastName = localStorage.getItem("lastName") || "";
document.getElementById("welcome").textContent = `Welcome, ${firstName} ${lastName}`;

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});

// ---------- FAVORITES FILTER STATE ----------
let favoritesOnly = false;

// ---------- ADD CONTACT ----------
document.getElementById("addBtn").addEventListener("click", addContact);

async function addContact() {
  const firstName = document.getElementById("addFirst").value.trim();
  const lastName = document.getElementById("addLast").value.trim();
  const email = document.getElementById("addEmail").value.trim();
  const phone = document.getElementById("addPhone").value.trim();
  const msg = document.getElementById("addMsg");

  msg.textContent = "";

  if (!firstName || !lastName || !email || !phone) {
    msg.textContent = "Please fill all fields.";
    return;
  }

  const payload = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    userId: Number(userId)
  };

  try {
    const res = await fetch("API/AddContact.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (data.error !== "") {
      msg.textContent = data.error;
      return;
    }

    msg.textContent = "Contact added!";
    clearAddFields();
    searchContacts();
  } catch (error) {
    msg.textContent = "Server error.";
  }
}

function clearAddFields() {
  document.getElementById("addFirst").value = "";
  document.getElementById("addLast").value = "";
  document.getElementById("addEmail").value = "";
  document.getElementById("addPhone").value = "";
}

// ---------- SEARCH CONTACTS ----------
document.getElementById("searchBtn").addEventListener("click", searchContacts);

document.getElementById("searchText").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    searchContacts();
  }
});

document.getElementById("toggleFavoritesBtn").addEventListener("click", function() {
  favoritesOnly = !favoritesOnly;

  if (favoritesOnly) {
    this.textContent = "Show All Contacts";
  } else {
    this.textContent = "Show Favorites Only";
  }

  searchContacts();
});

async function searchContacts() {
  const searchText = document.getElementById("searchText").value.trim();
  const msg = document.getElementById("searchMsg");
  const tbody = document.getElementById("contactsBody");

  msg.textContent = "";
  tbody.innerHTML = "";

  const payload = {
    searchName: searchText,
    userId: Number(userId)
  };

  try {
    const res = await fetch("API/SearchContacts.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (data.error !== "") {
      if (data.error === "No Records Found") {
        msg.textContent = "No contacts found.";
        return;
      }

      msg.textContent = data.error;
      return;
    }

    if (!data.results || data.results.length === 0) {
      msg.textContent = "No contacts found.";
      return;
    }

    let contactsToShow = data.results;

    if (favoritesOnly) {
      contactsToShow = contactsToShow.filter(function(contact) {
        return Number(contact.favorite) === 1;
      });
    }

    if (contactsToShow.length === 0) {
      msg.textContent = favoritesOnly
        ? "No favorite contacts found."
        : "No contacts found.";
      return;
    }

    contactsToShow.forEach(function(contact) {
      const row = document.createElement("tr");
      const id = contact.contactId;
      const isFavorite = Number(contact.favorite) === 1;

      row.innerHTML = `
        <td>
          <button type="button" onclick="toggleFavorite(${id}, ${isFavorite ? 1 : 0})">
            ${isFavorite ? "★" : "☆"}
          </button>
        </td>
        <td>${escapeHtml(contact.firstName)}</td>
        <td>${escapeHtml(contact.lastName)}</td>
        <td>${escapeHtml(contact.email)}</td>
        <td>${escapeHtml(contact.phone)}</td>
        <td>
          <button type="button" onclick="startEdit(${id}, this, ${isFavorite ? 1 : 0})">Edit</button>
          <button type="button" onclick="deleteContact(${id})">Delete</button>
        </td>
      `;

      tbody.appendChild(row);
    });

  } catch (error) {
    msg.textContent = "Server error.";
  }
}

// ---------- TOGGLE FAVORITE ----------
async function toggleFavorite(id, currentFavorite) {
  try {
    const payload = {
      contactId: id,
      userId: Number(userId),
      favorite: currentFavorite === 1 ? 0 : 1
    };

    const res = await fetch("API/ToggleFavorite.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (data.error !== "") {
      alert(data.error);
      return;
    }

    searchContacts();
  } catch (error) {
    alert("Server error.");
  }
}

// ---------- DELETE ----------
async function deleteContact(id) {
  if (!confirm("Delete this contact?")) {
    return;
  }

  try {
    const res = await fetch("API/DeleteContact.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contactId: id,
        userId: Number(userId)
      })
    });

    const data = await res.json();

    if (data.error !== "") {
      alert(data.error);
    } else {
      searchContacts();
    }
  } catch (error) {
    alert("Server error.");
  }
}

// ---------- EDIT ----------
function startEdit(id, btn, favoriteValue) {
  const row = btn.closest("tr");
  const cells = row.querySelectorAll("td");

  const first = cells[1].textContent;
  const last = cells[2].textContent;
  const email = cells[3].textContent;
  const phone = cells[4].textContent;

  row.innerHTML = `
    <td>
      <button type="button" onclick="toggleFavorite(${id}, ${favoriteValue})">
        ${favoriteValue === 1 ? "★" : "☆"}
      </button>
    </td>
    <td><input id="editFirst${id}" value="${escapeAttribute(first)}"></td>
    <td><input id="editLast${id}" value="${escapeAttribute(last)}"></td>
    <td><input id="editEmail${id}" value="${escapeAttribute(email)}"></td>
    <td><input id="editPhone${id}" value="${escapeAttribute(phone)}"></td>
    <td>
      <button type="button" onclick="saveEdit(${id})">Save</button>
      <button type="button" onclick="searchContacts()">Cancel</button>
    </td>
  `;
}

async function saveEdit(id) {
  const payload = {
    contactId: id,
    userId: Number(userId),
    firstName: document.getElementById(`editFirst${id}`).value.trim(),
    lastName: document.getElementById(`editLast${id}`).value.trim(),
    email: document.getElementById(`editEmail${id}`).value.trim(),
    phone: document.getElementById(`editPhone${id}`).value.trim()
  };

  try {
    const res = await fetch("API/UpdateContact.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (data.error !== "") {
      alert(data.error);
    } else {
      searchContacts();
    }
  } catch (error) {
    alert("Server error.");
  }
}

// ---------- SAFETY ----------
function escapeHtml(text) {
  if (text === null || text === undefined) {
    return "";
  }

  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(text) {
  if (text === null || text === undefined) {
    return "";
  }

  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

// Auto load contacts on page open
document.addEventListener("DOMContentLoaded", searchContacts);
