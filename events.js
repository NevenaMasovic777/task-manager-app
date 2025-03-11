document.addEventListener("DOMContentLoaded", function () {
  const addEventButton = document.querySelector(".add-event");
  const eventInputField = document.querySelector(".new-event input");

  // Select existing modal elements
  const modal = document.querySelector(".event-modal");
  const overlay = document.querySelector(".modal-overlay");
  const closeModalButton = document.querySelector(".close-modal");
  const saveEventButton = document.querySelector(".save-event");

  // Show modal & pre-fill event name
  addEventButton.addEventListener("click", function () {
    document.getElementById("event-name").value = eventInputField.value.trim(); // Pre-fill
    modal.style.display = "block";
    overlay.style.display = "block";
  });

  // Close modal when clicking cancel or overlay
  closeModalButton.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  function closeModal() {
    modal.style.display = "none";
    overlay.style.display = "none";
    clearModalFields();
  }

  function clearModalFields() {
    document.getElementById("event-name").value = "";
    document.getElementById("event-category").value = "birthday";
    document.getElementById("event-date").value = "";
    document.getElementById("event-note").value = "";
  }

  // Placeholder for future functionality when saving event
  saveEventButton.addEventListener("click", function () {
    alert(
      "Event creation functionality will be implemented in another branch."
    );
    closeModal();
  });
});
