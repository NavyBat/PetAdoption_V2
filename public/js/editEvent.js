document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get("id");

    if (eventId) {
        fetchEventDetails(eventId);
    }
    else {
    console.error("Event ID not found in URL");
}
});

async function fetchEventDetails(eventId) {
    try {
        const response = await fetch(`/getEventById?id=${eventId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch event details: ${response.status}`);
        }
        const event = await response.json();

        // Populate the form fields with event details
        document.getElementById("eventId").value = event.id;
        document.getElementById("title").value = event.title;
        document.getElementById("description").value = event.description;
        document.getElementById("location").value = event.location;
        document.getElementById("date").value = event.date;
        document.getElementById("time").value = event.time;
        document.getElementById("instruction").value = event.instruction;
    } catch (error) {
        console.error("Failed to load event details:", error);
    }
}

async function updateEvent() {
    const eventId = document.getElementById("eventId").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const location = document.getElementById("location").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const instruction = document.getElementById("instruction").value;

    try {
        const response = await fetch(`/updateEvent`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: eventId, title, description, location, date, time, instruction })
        });

        if (response.ok) {
            alert("Event updated successfully!");
            window.location.href = "viewevent.html";
        } else {

            console.error("Failed to update event:", await response.text());
            alert("Failed to update event. Please try again.");
        }
    } catch (error) {
        console.error("Error updating event:", error);
        alert("An error occurred while updating the event. Please try again.");
    }
}


