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
