document.addEventListener("DOMContentLoaded", function () {
  const addEventButton = document.querySelector(".add-event");
  const eventInputField = document.querySelector(".new-event input");
  const eventList = document.querySelector(".events");

  // Modal elements
  const modal = document.querySelector(".event-modal");
  const overlay = document.querySelector(".modal-overlay");
  const closeModalButton = document.querySelector(".close-modal");
  const saveEventButton = document.querySelector(".save-event");

  // Form fields
  const eventNameInput = document.getElementById("event-name");
  const eventCategoryInput = document.getElementById("event-category");
  const eventDateInput = document.getElementById("event-date");
  const eventNoteInput = document.getElementById("event-note");

  // Open modal
  function openModal() {
    eventNameInput.value = eventInputField.value.trim();
    modal.style.display = "block";
    overlay.style.display = "block";
  }

  // Close modal
  function closeModal() {
    modal.style.display = "none";
    overlay.style.display = "none";
    resetForm();
  }

  // Reset form fields
  function resetForm() {
    eventNameInput.value = "";
    eventCategoryInput.value = "birthday";
    eventDateInput.value = "";
    eventNoteInput.value = "";
  }

  // Get event icon based on category
  function getEventIcon(category) {
    return `images/${category}.png`;
  }

  // Save event
  function saveEvent() {
    const name = eventNameInput.value.trim();
    const category = eventCategoryInput.value;
    const date = eventDateInput.value;
    const note = eventNoteInput.value.trim();

    if (!name || !date) {
      alert("Please enter an event name and select a date.");
      return;
    }

    addEvent(name, category, date, note);
    closeModal();
    eventInputField.value = "";
    eventInputField.placeholder = "Add event";
  }

  // Add event in sorted order
  function addEvent(name, category, date, note) {
    const eventItem = document.createElement("div");
    eventItem.classList.add("event-item-container");

    eventItem.innerHTML = `
      <img src="${getEventIcon(category)}" class="event-icon">
      <div class="event-info">
        <strong>${name}</strong> - ${category.toUpperCase()}<br>
        <span class="event-date">${date}</span>
        ${note ? `<p>${note}</p>` : ""}
      </div>
      <div class="event-actions">
        <button class="edit-event"><img src="images/edit.png"></button>
        <button class="delete-event"><img src="images/delete.png"></button>
      </div>
    `;

    // Insert event at the correct position based on date
    let inserted = false;
    const eventItems = eventList.querySelectorAll(".event-item-container");

    for (const existingEvent of eventItems) {
      const existingDate =
        existingEvent.querySelector(".event-date").textContent;
      if (new Date(date) < new Date(existingDate)) {
        eventList.insertBefore(eventItem, existingEvent);
        inserted = true;
        break;
      }
    }

    if (!inserted) {
      eventList.appendChild(eventItem);
    }
  }

  // Event Listeners
  addEventButton.addEventListener("click", openModal);
  eventInputField.addEventListener("keypress", (event) => {
    if (event.key === "Enter") openModal();
  });
  closeModalButton.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
  saveEventButton.addEventListener("click", saveEvent);
});
