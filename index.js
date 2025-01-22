const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const fs = require('fs').promises;
const cors = require('cors'); // Added cors
//const { readJSON, writeJSON, addPet } = require('../path/to/createPet');




//const { viewAllListing, getPetById, updatePet } = require('./utils/PetDetailUtil');
const { addPet } = require('./utils/PetDetailUtil');

//const { addEvents, updateEvents } = require('./utils/eventUtils');


const app = express();
const PORT = process.env.PORT || 5050;
const startPage = "index.html";
const eventsFilePath = path.join(__dirname, 'utils', 'events.json');
const petsFilePath = path.join(__dirname, 'utils', 'petDetail.json');

// Middleware
app.use(cors()); // Allow CORS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join("./public")));
app.use(express.json());

const statusMonitor = require('express-status-monitor');
app.use(statusMonitor());


// Route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", startPage));
});

/*
app.get('/getPet/:id', getPetById);
app.put('/updatepet', updatePet)


app.get('/view-all-listing', viewAllListing);

app.put('/updatePet/:id', updatePet)

app.get('/viewEvents', async (req, res) => {
    try {
        const events = JSON.parse(await fs.readFile(eventsFilePath, 'utf8'));
        res.status(200).json(events);
    } catch (error) {
        console.error("Error reading events:", error);
        res.status(500).json({ message: "Failed to retrieve events." });
    }
});

app.post('/add-events', addEvents);

app.get('/getEventById', async (req, res) => {
    const { id } = req.query;
    try {
        const events = JSON.parse(await fs.readFile(eventsFilePath, 'utf8'));
        const event = events.find(e => e.id === id);
        if (event) {
            res.status(200).json(event);
        } else {
            console.error("Event not found for ID:", id);
            res.status(400).json({ message: "Event not found" });
        }
    } catch (error) {
        console.error("Error fetching event by ID:", error);
        res.status(500).json({ message: "Failed to retrieve event" });
    }
});


app.post('/updateEvent', updateEvents);
*/

app.post('/add-pet', addPet);




server = app.listen(PORT, function () {
    const address = server.address();
    const baseUrl = `http://${address.address == "::" ? 'localhost' :
        address.address}:${address.port}`;
    console.log(`Demo project at: ${baseUrl}`);
});

module.exports = { app, server }