const Event = require('../models/Events');

// Create a new pet listing
const eventListing = async (req, res) => {
    const { title, description, location, date, time, instruction } = req.body;

    try {
        const newEvent = new Event({ title, description, location, date, time, instruction });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: 'Server error while creating listing' });
    }
};

module.exports = { eventListing };