const loadBtn = document.getElementById('load-users');
const filterInput = document.getElementById('filter-input');
const statusEl = document.getElementById('status');
const usersListEl = document.getElementById('users-list');

let allUsers = [];

async function loadUsers() {
  statusEl.textContent = 'Loading...';
  loadBtn.disabled = true;
  usersListEl.innerHTML = '';

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();
    allUsers = users;

    renderUsers(allUsers);
    statusEl.textContent = `Loaded ${allUsers.length} users successfully.`;

  } catch (error) {
    statusEl.textContent = `Error loading users: ${error.message}`;
    allUsers = [];
  } finally {
    loadBtn.disabled = false;
  }
}

function renderUsers(list) {
  usersListEl.innerHTML = '';

  if (list.length === 0 && allUsers.length > 0) {
    statusEl.textContent = 'No users match your filter.';
    return;
  }

  if (list.length === 0 && allUsers.length === 0) {
    return;
  }

  list.forEach(user => {
    const li = document.createElement('li');

    const nameEl = document.createElement('strong');
    nameEl.textContent = user.name;

    const emailEl = document.createElement('div');
    emailEl.textContent = `Email: ${user.email}`;

    const cityEl = document.createElement('div');
    cityEl.textContent = `City: ${user.address.city}`;

    const companyEl = document.createElement('div');
    companyEl.textContent = `Company: ${user.company.name}`;

    li.appendChild(nameEl);
    li.appendChild(emailEl);
    li.appendChild(cityEl);
    li.appendChild(companyEl);

    usersListEl.appendChild(li);
  });
}

function handleFilter() {
  const query = filterInput.value.toLowerCase().trim();

  if (query === '') {
    renderUsers(allUsers);
    if (allUsers.length > 0) {
      statusEl.textContent = `Loaded ${allUsers.length} users successfully.`;
    }
    return;
  }

  const filtered = allUsers.filter(user => 
    user.name.toLowerCase().includes(query)
  );

  renderUsers(filtered);
}

loadBtn.addEventListener('click', loadUsers);
filterInput.addEventListener('input', handleFilter);
