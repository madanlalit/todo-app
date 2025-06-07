// Set Date
const today = new Date();
const timeHeading = document.getElementById("time");
const options = { weekday: "long", month: "short", day: "numeric" };
const formattedDate = today.toLocaleDateString("en-US", options);
timeHeading.textContent = formattedDate;

// Task progress update
const getTaskProgress = document.getElementById("task-progress");
const taskProgressHeading = getTaskProgress.getElementsByTagName("h4");

function updateTaskProgress() {
  const total = document.getElementsByClassName("individual-tasks").length;
  const completed = document.querySelectorAll('.individual-tasks input[type="checkbox"]:checked').length;
  taskProgressHeading[0].textContent = `${completed} out of ${total} tasks completed`;
}

// Add Tasks to card
const taskInput = document.getElementById("input");
const addButton = document.getElementById("add-button");
const taskCard = document.getElementById("tasks");

function createTaskElement(taskText) {
  // Main task div
  const taskDiv = document.createElement("div");
  taskDiv.className = "individual-tasks";

  // Left info
  const infoLeft = document.createElement("div");
  infoLeft.className = "info-left";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener('change', updateTaskProgress);

  const taskTitle = document.createElement("h4");
  taskTitle.textContent = taskText;

  infoLeft.appendChild(checkbox);
  infoLeft.appendChild(taskTitle);

  // Right info
  const info = document.createElement("div");
  info.className = "info";

  const date = document.createElement("h5");
  date.textContent = "Today";

  // Delete button with SVG
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
    </svg>
  `;
  deleteButton.addEventListener("click", () => {
    taskDiv.remove();
    updateTaskProgress();
  });

  info.appendChild(date);
  info.appendChild(deleteButton);

  // Build and append
  taskDiv.appendChild(infoLeft);
  taskDiv.appendChild(info);

  return taskDiv;
}

addButton.addEventListener("click", () => {
  const task = taskInput.value;
  if (task.trim() === "") return;
  const taskDiv = createTaskElement(task);
  taskCard.appendChild(taskDiv);
  taskInput.value = "";
  updateTaskProgress();
});

// Initialize existing tasks (if any in HTML)
document.querySelectorAll('.individual-tasks').forEach(taskDiv => {
  const checkbox = taskDiv.querySelector('input[type="checkbox"]');
  if (checkbox) checkbox.addEventListener('change', updateTaskProgress);

  const deleteButton = taskDiv.querySelector('.delete-button');
  if (deleteButton) {
    deleteButton.addEventListener('click', () => {
      taskDiv.remove();
      updateTaskProgress();
    });
  }
});

// Clear Completed
const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => {
  document.querySelectorAll('.individual-tasks input[type="checkbox"]:checked').forEach(checkbox => {
    const card = checkbox.closest(".individual-tasks");
    if (card) card.remove();
  });
  updateTaskProgress();
});

// Filter Buttons
const optionButtons = document.querySelectorAll('.individual-options');
optionButtons.forEach(button => {
  button.addEventListener('click', () => {
    optionButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

const activeButton = document.getElementById('activeButton');
activeButton.addEventListener('click', () => {
  document.querySelectorAll('.individual-tasks').forEach(task => {
    const checkbox = task.querySelector('input[type="checkbox"]');
    if (checkbox && checkbox.checked) {
      task.classList.add('hidden');
    } else {
      task.classList.remove('hidden');
    }
  });
});

const allButton = document.getElementById('allButton');
allButton.addEventListener('click', () => {
  document.querySelectorAll('.individual-tasks').forEach(task => {
    task.classList.remove('hidden');
  });
});

const completeButton = document.getElementById('completeButton');
completeButton.addEventListener('click', () => {
  document.querySelectorAll('.individual-tasks').forEach(task => {
    const checkbox = task.querySelector('input[type="checkbox"]');
    if (checkbox && !checkbox.checked) {
      task.classList.add('hidden');
    } else {
      task.classList.remove('hidden');
    }
  });
});

// Initial progress update
updateTaskProgress();

