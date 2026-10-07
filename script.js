const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");

let notes = JSON.parse(localStorage.getItem("quicknotes")) || [];

function saveNotes() {
  localStorage.setItem("quicknotes", JSON.stringify(notes));
}

function updateCount(count) {
  if (count === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (count === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${count} notes.`;
  }
}

function render(filtered = null) {
  const listToRender = filtered !== null ? filtered : notes;
  notesList.innerHTML = "";

  listToRender.forEach((note) => {
    const li = document.createElement("li");
    li.className = `category-${note.category.toLowerCase()}`;

    const span = document.createElement("span");
    span.textContent = `${note.text} [${note.category}]`;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "delete-btn";
    delBtn.addEventListener("click", () => {
      notes = notes.filter((n) => n.id !== note.id);
      saveNotes();
      render();
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    notesList.appendChild(li);
  });

  updateCount(notes.length);
}

noteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = noteInput.value.trim();
  const category = noteCategory.value;

  errorMessage.textContent = "";

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  const newNote = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toISOString(),
  };

  notes.push(newNote);
  saveNotes();
  render();
  noteInput.value = "";
  noteInput.focus();
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  if (query === "") {
    render();
    return;
  }
  const filtered = notes.filter((n) =>
    n.text.toLowerCase().includes(query)
  );
  render(filtered);
});

// Initial load
render();