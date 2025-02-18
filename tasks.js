document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.querySelector(".new-task input");
  const addButton = document.querySelector(".add-task");
  const taskList = document.querySelector(".tasks");
  const noTaskMessage = document.createElement("div");

  noTaskMessage.classList.add("no-task-message");
  noTaskMessage.innerHTML = `There are no tasks to complete—relax and enjoy your day! 
  <img src="images/confetti.png" alt="Confetti" width=0px>`;
  taskList.parentElement.appendChild(noTaskMessage);

  function updateMoveButtonsState() {
    const tasks = document.querySelectorAll(".task-item-container");
    noTaskMessage.style.display = tasks.length === 0 ? "inline-block" : "none";

    tasks.forEach((task) => {
      const upButton = task.querySelector(".move-up");
      const downButton = task.querySelector(".move-down");

      upButton.style.display = "inline-block";
      downButton.style.display = "inline-block";
    });
  }

  function createButtons(taskSpan, taskContainer) {
    const buttons = [
      {
        classList: "complete-task",
        innerHTML: `<img src="images/completed.png" alt="Complete">`,
        attribute: "Mark as Completed",
        event: () => taskSpan.classList.toggle("completed"),
      },
      {
        classList: "edit-task",
        innerHTML: `<img src="images/edit.png" alt="Edit">`,
        attribute: "Edit task",
        event: () => {
          const newText = prompt("Edit task:", taskSpan.textContent);
          if (newText?.trim()) taskSpan.textContent = newText.trim();
        },
      },
      {
        classList: "delete-task",
        innerHTML: `<img src="images/delete.png" alt="Delete">`,
        attribute: "Delete task",
        event: () => {
          taskContainer.remove();
          updateMoveButtonsState();
        },
      },
    ];

    return buttons.map((element) => {
      const button = document.createElement("button");
      button.classList.add(element.classList);
      button.innerHTML = element.innerHTML;
      button.setAttribute("data-tooltip", element.attribute);
      button.addEventListener("click", element.event);
      return button;
    });
  }

  function createMoveButtons(taskContainer) {
    const moveButtonsContainer = document.createElement("div");
    moveButtonsContainer.classList.add("move-buttons");

    const upButton = document.createElement("button");
    upButton.classList.add("move-up");
    upButton.innerHTML = `<img src="images/up.png" alt="Move Up">`;
    upButton.setAttribute("data-tooltip", "Move Up");
    upButton.addEventListener("click", () => {
      if (taskContainer.previousElementSibling) {
        taskList.insertBefore(
          taskContainer,
          taskContainer.previousElementSibling
        );
        updateMoveButtonsState();
      }
    });

    const downButton = document.createElement("button");
    downButton.classList.add("move-down");
    downButton.innerHTML = `<img src="images/down.png" alt="Move Down">`;
    downButton.setAttribute("data-tooltip", "Move Down");
    downButton.addEventListener("click", () => {
      if (taskContainer.nextElementSibling) {
        taskList.insertBefore(taskContainer.nextElementSibling, taskContainer);
        updateMoveButtonsState();
      }
    });

    moveButtonsContainer.appendChild(upButton);
    moveButtonsContainer.appendChild(downButton);
    taskContainer.appendChild(moveButtonsContainer);
    return moveButtonsContainer;
  }

  function addTask() {
    const taskText = inputField.value.trim();
    if (!taskText) return;

    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-item-container");

    const listItem = document.createElement("div");
    listItem.classList.add("task-item");

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    taskSpan.classList.add("task-text");

    listItem.appendChild(taskSpan);
    createButtons(taskSpan, taskContainer).forEach((button) =>
      listItem.appendChild(button)
    );
    taskContainer.appendChild(listItem);

    const moveButtonsContainer = createMoveButtons(taskContainer);
    taskContainer.appendChild(moveButtonsContainer);
    taskList.appendChild(taskContainer);

    inputField.value = "";
    inputField.focus();
    updateMoveButtonsState();
  }

  addButton.addEventListener("click", addTask);
  inputField.addEventListener("keypress", (event) => {
    if (event.key === "Enter") addTask();
  });

  updateMoveButtonsState();
});
