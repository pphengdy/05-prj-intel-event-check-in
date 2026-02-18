// Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

// Track attendance
let count = 0;
const maxCount = 50;

// Update counter function
function updateCounter(counter) {
    counter.textContent = parseInt(counter.textContent) + 1;
}

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, team, teamName);

  // Increment count
  count++;
  console.log("Total check-ins: " + count);

  // Update attendee counter
  const attendeeCounter = document.getElementById("attendeeCount");
  if (count <= maxCount) {
    updateCounter(attendeeCounter);
  }

  // Update progress bar percentage
  const percentage = Math.round((count / maxCount) * 100) + "%";
  console.log(`Progress: ${percentage}`);

  // Update progress bar width
  const progressBar = document.getElementById("progressBar");
  if (progressBar) {
    progressBar.style.width = percentage;
  }

  // Update team counter
  const teamCounter = document.getElementById(team + "Count");
  if (count <= maxCount) {
    updateCounter(teamCounter);
  }

  // Show personalized greeting message
  const greeting = document.getElementById("greeting");
  const message = `🎉 Welcome, ${name} from ${teamName}!`;
  if (greeting && name && teamName) {
    greeting.textContent = message;
    greeting.classList.add("show");
  }

  form.reset();
});
