document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.querySelector(".new-task input");
  const addButton = document.querySelector(".add-task");
  const taskList = document.querySelector(".tasks");

  function addTask() {
    const taskText = inputField.value.trim();
    if (taskText === "") return; // Prevents adding empty tasks

    // Create task container
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-item-container");

    // Create move buttons container (side by side)
    const moveButtons = document.createElement("div");
    moveButtons.classList.add("move-buttons");

    // Create task item
    const listItem = document.createElement("div");
    listItem.classList.add("task-item");

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    taskSpan.classList.add("task-text");

    // Create buttons
    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-task");
    completeButton.innerHTML = `<img src="images/completed.png" alt="Complete">`;
    completeButton.setAttribute("data-tooltip", "Mark as Completed");

    const editButton = document.createElement("button");
    editButton.classList.add("edit-task");
    editButton.innerHTML = `<img src="images/edit.png" alt="Edit">`;
    editButton.setAttribute("data-tooltip", "Edit Task");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-task");
    deleteButton.innerHTML = `<img src="images/delete.png" alt="Delete">`;
    deleteButton.setAttribute("data-tooltip", "Delete Task");

    const upButton = document.createElement("button");
    upButton.classList.add("move-up");
    upButton.innerHTML = `<img src="images/up.png" alt="Move Up">`;
    upButton.setAttribute("data-tooltip", "Move Up");

    const downButton = document.createElement("button");
    downButton.classList.add("move-down");
    downButton.innerHTML = `<img src="images/down.png" alt="Move Down">`;
    downButton.setAttribute("data-tooltip", "Move Down");

    // Event Listener: Mark Task as Completed (Toggle Strikethrough)
    completeButton.addEventListener("click", () => {
      taskSpan.classList.toggle("completed");
    });

    // Event Listener: Edit Task
    editButton.addEventListener("click", () => {
      const newText = prompt("Edit task:", taskSpan.textContent);
      if (newText !== null && newText.trim() !== "") {
        taskSpan.textContent = newText.trim();
      }
    });

    // Event Listener: Delete Task
    deleteButton.addEventListener("click", () => {
      taskContainer.remove();
    });

    // Event Listener: Move Task Up
    upButton.addEventListener("click", () => {
      if (taskContainer.previousElementSibling) {
        taskList.insertBefore(
          taskContainer,
          taskContainer.previousElementSibling
        );
      }
    });

    // Event Listener: Move Task Down
    downButton.addEventListener("click", () => {
      if (taskContainer.nextElementSibling) {
        taskList.insertBefore(taskContainer.nextElementSibling, taskContainer);
      }
    });

    // Append buttons to the move-buttons container
    moveButtons.appendChild(upButton);
    moveButtons.appendChild(downButton);

    // Append elements to the task container
    listItem.append(taskSpan, completeButton, editButton, deleteButton);
    taskContainer.append(listItem, moveButtons);
    taskList.appendChild(taskContainer);

    // Clear input field after adding task
    inputField.value = "";
    inputField.focus(); // Keeps focus on input field for new entries
  }

  // Add event listeners for adding tasks on both button click & Enter key
  addButton.addEventListener("click", addTask);
  inputField.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });
});
