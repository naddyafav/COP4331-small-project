// ===============================
// CONTACTS.JS FULL VERSION 
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
    firstName,
    lastName,
    email,
    phone,
    userId: Number(userId)
  };

  try {
    const res = await fetch("API/AddContact.php", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
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

  } catch {
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
document.getElementById("searchText").addEventListener("keydown", e => {
  if (e.key === "Enter") searchContacts();
});

async function searchContacts() {
  const searchText = document.getElementById("searchText").value.trim();
  const msg = document.getElementById("searchMsg");
  const tbody = document.getElementById("contactsBody");

  msg.textContent = "";
  tbody.innerHTML = "";

  // PHP expects: searchName, userId
  const payload = {
    searchName: searchText,
    userId: Number(userId)
  };

  try {
    const res = await fetch("API/SearchContacts.php", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    // PHP returns error "No Records Found" when empty
    if (data.error !== "") {
      if (data.error === "No Records Found") {
        msg.textContent = "No contacts found.";
        return;
      }
      msg.textContent = data.error;
      return;
    }

    if (!data.results.length) {
      msg.textContent = "No contacts found.";
      return;
    }

    data.results.forEach(contact => {
      const row = document.createElement("tr");
      const id = contact.contactId; // PHP returns contactId

      row.innerHTML = `
        <td>${escapeHtml(contact.firstName)}</td>
        <td>${escapeHtml(contact.lastName)}</td>
        <td>${escapeHtml(contact.email)}</td>
        <td>${escapeHtml(contact.phone)}</td>
        <td>
          <button onclick="startEdit(${id}, this)">Edit</button>
          <button onclick="deleteContact(${id})">Delete</button>
        </td>
      `;

      tbody.appendChild(row);
    });

  } catch {
    msg.textContent = "Server error.";
  }
}

// ---------- DELETE ----------
async function deleteContact(id) {
  if (!confirm("Delete this contact?")) return;

  // PHP expects: contactId, userId
  const res = await fetch("API/DeleteContact.php", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ contactId: id, userId: Number(userId) })
  });

  const data = await res.json();
  if (data.error !== "") alert(data.error);
  else searchContacts();
}

// ---------- EDIT ----------
function startEdit(id, btn) {
  const row = btn.closest("tr");
  const cells = row.querySelectorAll("td");

  const first = cells[0].textContent;
  const last  = cells[1].textContent;
  const email = cells[2].textContent;
  const phone = cells[3].textContent;

  row.innerHTML = `
    <td><input id="editFirst${id}" value="${first}"></td>
    <td><input id="editLast${id}" value="${last}"></td>
    <td><input id="editEmail${id}" value="${email}"></td>
    <td><input id="editPhone${id}" value="${phone}"></td>
    <td>
      <button onclick="saveEdit(${id})">Save</button>
      <button onclick="searchContacts()">Cancel</button>
    </td>
  `;
}

async function saveEdit(id) {
  // PHP expects: contactId, userId, firstName, lastName, email, phone
  const payload = {
    contactId: id,
    userId: Number(userId),
    firstName: document.getElementById(`editFirst${id}`).value.trim(),
    lastName: document.getElementById(`editLast${id}`).value.trim(),
    email: document.getElementById(`editEmail${id}`).value.trim(),
    phone: document.getElementById(`editPhone${id}`).value.trim()
  };

  const res = await fetch("API/UpdateContact.php", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  if (data.error !== "") alert(data.error);
  else searchContacts();
}

// ---------- SAFETY ----------
function escapeHtml(text) {
  return text
    ?.replaceAll("&","&amp;")
    ?.replaceAll("<","&lt;")
    ?.replaceAll(">","&gt;")
    ?.replaceAll('"',"&quot;")
    ?.replaceAll("'","&#039;");
}

// Auto load contacts on page open
document.addEventListener("DOMContentLoaded", searchContacts);
