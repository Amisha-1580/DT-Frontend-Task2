let tasks = [];
const container = document.getElementById("task-container");
const countEl = document.getElementById("task-count");

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    tasks = data.tasks;
    renderTasks("all");
  });

function renderTasks(filter){
  container.innerHTML = "";

  let filtered = tasks;
  if (filter === "active") filtered = tasks.filter(t => !t.completed);
  if (filter === "completed") filtered = tasks.filter(t => t.completed);

  filtered.forEach(task => {
    const card = document.createElement("div");
    card.className = "task-card " + (task.completed ? "completed" : "");
    card.innerHTML = `
      <h4>${task.title}</h4>
      <button class="complete-btn" onclick="toggleComplete(${task.id})">
        ${task.completed ? "Undo" : "Complete"}
      </button>
    `;
    container.appendChild(card);
  });

  countEl.textContent = `Showing ${filtered.length} of ${tasks.length} tasks`;
}

function toggleComplete(id){
  tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  const activeBtn = document.querySelector(".filter-btn.active");
  renderTasks(activeBtn.dataset.filter);
}

// Filters
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderTasks(btn.dataset.filter);
  });
});
