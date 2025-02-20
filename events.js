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

  let currentEventItem = null; // Stores event being edited

  // Open modal for new or existing event
  function openModal(eventItem = null) {
    currentEventItem = eventItem;
    if (eventItem) {
      // Editing existing event
      eventNameInput.value =
        eventItem.querySelector(".event-title").textContent;
      eventCategoryInput.value = eventItem.dataset.category;
      eventDateInput.value = eventItem.querySelector(".event-date").textContent;
      eventNoteInput.value =
        eventItem.querySelector(".event-note")?.textContent || "";
    } else {
      resetForm();
      eventNameInput.value = eventInputField.value.trim();
    }
    modal.style.display = "block";
    overlay.style.display = "block";
  }

  // Close modal & reset form
  function closeModal() {
    modal.style.display = "none";
    overlay.style.display = "none";
    resetForm();
  }

  function resetForm() {
    eventNameInput.value = "";
    eventCategoryInput.value = "birthday";
    eventDateInput.value = "";
    eventNoteInput.value = "";
  }

  function getEventIcon(category) {
    return `images/${category}.png`;
  }

  // Save event (New or Edited)
  function saveEvent() {
    const name = eventNameInput.value.trim();
    const category = eventCategoryInput.value;
    const date = eventDateInput.value;
    const note = eventNoteInput.value.trim();

    if (!name || !date) {
      alert("Please enter an event name and select a date.");
      return;
    }

    if (currentEventItem) {
      updateEvent(currentEventItem, name, category, date, note);
    } else {
      addEvent(name, category, date, note);
    }

    closeModal();
    eventInputField.value = "";
    eventInputField.placeholder = "Add event";
  }

  // Add event in sorted order
  function addEvent(name, category, date, note) {
    const eventItem = createEventItem(name, category, date, note);
    insertSortedEvent(eventItem);
  }

  // Update existing event and reinsert it
  function updateEvent(eventItem, name, category, date, note) {
    eventItem.dataset.category = category;
    eventItem.querySelector(".event-title").textContent = name;
    eventItem.querySelector(".event-date").textContent = date;
    eventItem.querySelector(".event-info p")?.remove(); // Remove old note

    if (note) {
      const noteElement = document.createElement("p");
      noteElement.classList.add("event-note");
      noteElement.textContent = note;
      eventItem.querySelector(".event-info").appendChild(noteElement);
    }

    eventItem.querySelector(".event-icon").src = getEventIcon(category);
    insertSortedEvent(eventItem, true);
  }

  // Delete event
  function deleteEvent(eventItem) {
    eventItem.remove();
  }

  // Create event item element
  function createEventItem(name, category, date, note) {
    const eventItem = document.createElement("div");
    eventItem.classList.add("event-item-container");
    eventItem.dataset.category = category;

    eventItem.innerHTML = `
      <img src="${getEventIcon(category)}" class="event-icon">
      <div class="event-info">
        <strong class="event-title">${name}</strong> - ${category.toUpperCase()}<br>
        <span class="event-date">${date}</span>
        ${note ? `<p class="event-note">${note}</p>` : ""}
      </div>
      <div class="event-actions">
        <button class="edit-event"><img src="images/edit.png"></button>
        <button class="delete-event"><img src="images/delete.png"></button>
      </div>
    `;

    eventItem
      .querySelector(".edit-event")
      .addEventListener("click", () => openModal(eventItem));
    eventItem
      .querySelector(".delete-event")
      .addEventListener("click", () => deleteEvent(eventItem));

    return eventItem;
  }

  // Insert event in correct order
  function insertSortedEvent(eventItem, isUpdate = false) {
    if (isUpdate) eventList.removeChild(eventItem);

    const eventItems = [...eventList.querySelectorAll(".event-item-container")];
    const eventDate = new Date(
      eventItem.querySelector(".event-date").textContent
    );

    let inserted = false;
    for (const existingEvent of eventItems) {
      const existingDate = new Date(
        existingEvent.querySelector(".event-date").textContent
      );
      if (eventDate < existingDate) {
        eventList.insertBefore(eventItem, existingEvent);
        inserted = true;
        break;
      }
    }

    if (!inserted) eventList.appendChild(eventItem);
  }

  // Event Listeners
  addEventButton.addEventListener("click", () => openModal());
  eventInputField.addEventListener("keypress", (event) => {
    if (event.key === "Enter") openModal();
  });
  closeModalButton.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
  saveEventButton.addEventListener("click", saveEvent);
});
