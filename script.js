// Set Date
const today = new Date();
console.log(today);

const timeHeading = document.getElementById("time");
const options = {
  weekday: "long",
  month: "short",
  day: "numeric",
};
const formattedDate = today.toLocaleDateString("en-US", options);

timeHeading.textContent = formattedDate;

// Calculate total number of tasks in card
function calculateTasks() {
  totalTasks = document.getElementsByClassName("individual-tasks").length;
  return totalTasks;
}
// Get the task progress heading and append totalTasks
const getTaskProgress = document.getElementById("task-progress");
const taskProgressHeading = getTaskProgress.getElementsByTagName("h4");
taskProgressHeading[0].textContent = `2 out of ${calculateTasks()} tasks completed`;

// Add Tasks to card
const taskInput = document.getElementById("input");
const addButton = document.getElementById("add-button");
const taskCard = document.getElementById("tasks");

addButton.addEventListener("click", () => {
  const task = taskInput.value;
  if (task.trim() === "") return;

  // Create main task div
  const taskDiv = document.createElement("div");
  taskDiv.className = "individual-tasks";

  // Left info
  const infoLeft = document.createElement("div");
  infoLeft.id = "info-left";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const taskTitle = document.createElement("h4");
  taskTitle.textContent = task;

  infoLeft.appendChild(checkbox);
  infoLeft.appendChild(taskTitle);

  // Right info
  const info = document.createElement("div");
  info.id = "info";

  const date = document.createElement("h5");
  date.textContent = "Today";

  // Delete button with SVG
  const deleteButton = document.createElement("button");
  deleteButton.id = "delete-button";
  deleteButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
    </svg>
  `;
  deleteButton.addEventListener("click", () => {
    taskDiv.remove();
  });

  info.appendChild(date);
  info.appendChild(deleteButton);

  // Build and append
  taskDiv.appendChild(infoLeft);
  taskDiv.appendChild(info);
  taskCard.appendChild(taskDiv);

  taskInput.value = "";
  console.log("Task added successfully");
});

//
const totalIndividualTasks = document.getElementsByClassName("individual-tasks");

const deleteButton = document.querySelectorAll("#delete-button");

deleteButton.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".individual-tasks");
    if (card) {
      card.remove();
    }
  });
});

const clearButton = document.getElementById('clear');
const getAllCheckBoxes = document.querySelectorAll('input[type=checkbox]')

clearButton.addEventListener('click', () => {
  getAllCheckBoxes.forEach(
  (checkbox) => {
    console.log(checkbox.checked)
    if (checkbox.checked) {
      const card = checkbox.closest(".individual-tasks");
      if (card) {
      card.remove();
    }
    }
  }
)
})
