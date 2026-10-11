// Day 5 assignment fix
const API_URL = "https://jsonplaceholder.typicode.com/users"
const loadBtn = document.querySelector("#load-users")
const statusText = document.querySelector("#status")
const list = document.querySelector("#users-list")
const filterInput = document.querySelector("#filter-input")
let allUsers = []

function renderUsers(users) {
  list.innerHTML = ""
  if (users.length === 0) {
    const li = document.createElement("li")
    li.textContent = "No users match your filter."
    list.appendChild(li)
    return
  }
  users.forEach(user => {
    const li = document.createElement("li")
    li.textContent = `${user.name} - ${user.email} - ${user.address.city} - ${user.company.name}`
    list.appendChild(li)
  })
}

loadBtn.addEventListener("click", async () => {
  statusText.textContent = "Loading users..."
  loadBtn.disabled = true
  list.innerHTML = ""
  try {
    const response = await fetch(API_URL)
    if (!response.ok) throw new Error(`Status ${response.status}`)
    allUsers = await response.json()
    renderUsers(allUsers)
    statusText.textContent = `Loaded ${allUsers.length} users.`
  } catch (error) {
    statusText.textContent = "Could not load users."
    console.error(error)
  } finally {
    loadBtn.disabled = false
  }
})

filterInput.addEventListener("input", () => {
  const q = filterInput.value.toLowerCase()
  const filtered = allUsers.filter(u => u.name.toLowerCase().includes(q))
  renderUsers(filtered)
})
