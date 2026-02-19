// Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

// Store attendees
const attendees = [];

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

  // Show full message if max reached
  const greeting = document.getElementById("greeting");
  if (count >= maxCount) {
    if (greeting) {
      greeting.textContent = "Sorry, check-in is closed. The event is full!";
      greeting.classList.add("show");
    }
    form.reset();
    return;
  }

  // Add attendee to list
  attendees.push({ name: name, team: team, teamName: teamName });

  // Update attendee list display
  const attendeeList = document.getElementById("attendeeList");
  if (attendeeList) {
    attendeeList.innerHTML = attendees.map(function(att) {
      return `<li>${att.name} <span class="team-badge ${att.team}">${att.teamName}</span></li>`;
    }).join("");
  }

  console.log(name, team, teamName);

  // Increment count
  if (count < maxCount) {
    count++;
  }
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
  const message = `🎉 Welcome, ${name} from ${teamName}!`;
  if (greeting && name && teamName) {
    greeting.textContent = message;
    greeting.classList.add("show");
  }


  // Show celebration message and highlight winning team if count reaches maxCount
  const celebration = document.getElementById("celebration");
  const celebrationMessage = "🎊 All 50 attendees have checked in! The winning team is now highlighted! 🎊";
  if (celebration && count === maxCount) {
    celebration.textContent = celebrationMessage;
    celebration.classList.add("show");

    // Find the team with the most attendees
    const waterCount = parseInt(document.getElementById("waterCount").textContent);
    const zeroCount = parseInt(document.getElementById("zeroCount").textContent);
    const powerCount = parseInt(document.getElementById("powerCount").textContent);
    let max = Math.max(waterCount, zeroCount, powerCount);

    // Remove winner class from all
    document.querySelectorAll('.team-card').forEach(function(card) {
      card.classList.remove('winner');
    });

    // Highlight all teams that tie for max
    if (waterCount === max) {
      document.querySelector('.team-card.water').classList.add('winner');
    }
    if (zeroCount === max) {
      document.querySelector('.team-card.zero').classList.add('winner');
    }
    if (powerCount === max) {
      document.querySelector('.team-card.power').classList.add('winner');
    }

  } else if (celebration) {
    celebration.classList.remove("show");
    
    // Remove winner highlight if not celebrating
    document.querySelectorAll('.team-card').forEach(function(card) {
      card.classList.remove('winner');
    });
  }

  form.reset();
});
