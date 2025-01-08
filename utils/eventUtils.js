const { Events } = require('../models/Events');
const fs = require('fs').promises;
const path = require('path');

const eventsFilePath = path.join(__dirname, 'events.json');

async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
        return [];
    }
}


async function writeJSON(object, filename) {
    try {
        const allObjects = await readJSON(filename);
        allObjects.push(object);
        await fs.writeFile(filename, JSON.stringify(allObjects, null, 2), 'utf8');
        return object; // Return the newly added event object
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function addEvents(req, res) {
    try {
        const { title, description, location, date, time, instruction } = req.body;

        // Validation
        if (!title || !description || !location || !date || !time || !instruction) {
            alert("All fields are required!");
            return res.status(500).json({ message: 'All fields are required!' });

        }

        if (description.length > 100 || title.length > 50 || location.length > 50 || date.length > 50 || time.length > 50 || instruction.length > 100) {
            alert("Validation error: Field lengths exceeded");
            return res.status(500).json({ message: 'Validation error: Field lengths exceeded' });
        }

        // Create new event object
        const newEvent = new Events(title, description, location, date, time, instruction);

        // Save to JSON file
        const savedEvent = await writeJSON(newEvent, eventsFilePath);
        res.status(200).json({ message: 'Event created successfully!', event: savedEvent });

    } catch (error) {
        console.error("Error in addEvents:", error);
        res.status(500).json({ message: error.message });
    }
}


async function updateEvents(req, res) {
    const { id, title, description, location, date, time, instruction } = req.body;
    try {
        const events = JSON.parse(await fs.readFile(eventsFilePath, 'utf8'));
        const eventIndex = events.findIndex(event => event.id === id);

        if (eventIndex !== -1) {
            events[eventIndex] = { id, title, description, location, date, time, instruction };
            await fs.writeFile(eventsFilePath, JSON.stringify(events, null, 2));
            res.status(200).json({ message: 'Event updated successfully' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ message: 'Failed to update event' });
    }
}

module.exports = {
    readJSON, writeJSON, addEvents, updateEvents
};