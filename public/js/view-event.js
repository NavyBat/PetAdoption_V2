
console.log("view-events.js loaded");

async function loadEvents() {
    try {
        const response = await fetch('/viewEvents');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const events = await response.json();
        const tableBody = document.getElementById("eventTableBody");
        tableBody.innerHTML = ""; // Clear any existing rows

        events.forEach((event, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${event.title}</td>
                <td>${event.description}</td>
                <td>${event.location}</td>
                <td>${event.date}</td>
                <td>${event.time}</td>
                <td>${event.instruction}</td>
                <td><button onclick="editEvent('${event.id}')">Edit</button></td>
            `;
            tableBody.appendChild(row);
        });


    } catch (error) {
        console.error("Failed to load events:", error);
    }
}
// Function to navigate to the event editing page
function editEvent(eventId) {
    window.location.href = `eventEdit.html?id=${eventId}`;
}
document.addEventListener("DOMContentLoaded", loadEvents);
