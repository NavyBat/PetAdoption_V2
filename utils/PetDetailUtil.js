const { PetDetail } = require('../models/petDetail');
const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname, 'petDetail.json');


async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) { console.error(err); throw err; }
}


async function writeJSON(object, filename) {
    try {
        const allObjects = await readJSON(filename);
        allObjects.push(object);
        await fs.writeFile(filename, JSON.stringify(allObjects), 'utf8');
        return allObjects;
    } catch (err) { console.error(err); throw err; }
}

/*

async function viewAllListing(req, res) {
    try {
        const allResource = await readJSON(filePath);
        const query = req.query;
        let filteredListing = allResource;

        if (Object.keys(query).length > 0) {
            filteredListing = allResource.filter(item => {
                return Object.keys(query).every(key => {
                    if (key === 'minPrice' || key === 'maxPrice') {
                        const itemPrice = parseFloat(item.price);
                        const minPrice = query.minPrice ? parseFloat(query.minPrice) : null;
                        const maxPrice = query.maxPrice ? parseFloat(query.maxPrice) : null;
                        if (minPrice !== null && maxPrice !== null) {
                            return itemPrice >= minPrice && itemPrice <= maxPrice;
                        }
                        if (minPrice !== null) return itemPrice >= minPrice;
                        if (maxPrice !== null) return itemPrice <= maxPrice;
                        return true;
                    } else {
                        return item[key] && item[key].toString().toUpperCase() === query[key].toString().toUpperCase();
                    }
                });
            });
        }

        res.status(200).json(filteredListing);
    } catch (error) {
        console.error('Error in viewAllListing:', error);
        res.status(500).json({ message: error.message });

    }
}



async function getPetById(req, res) {
    const petId = req.params.id;
    try {
        const allPets = await readJSON(filePath);
        const pet = allPets.find(p => p.id === petId);
        if (pet) {
            res.status(200).json(pet);
        } else {
            res.status(400).json({ message: 'Pet not found' });
        }
    } catch (error) {
        console.error('Error fetching pet:', error);
        res.status(500).json({ message: 'Error fetching pet details' });
    }
}

async function updatePet(req, res) {
    const petId = req.params.id;
    const { name, breed, age, price, gender, picture } = req.body;
    try {
        const pets = await readJSON(filePath);
        const petIndex = pets.findIndex(pet => pet.id === petId);
        if (petIndex !== -1) {
            pets[petIndex] = { ...pets[petIndex], name, breed, age, price, gender, picture };
            await fs.writeFile(filePath, JSON.stringify(pets, null, 2));
            res.status(200).json({ message: 'Pet updated successfully', pet: pets[petIndex] });
        } else {
            res.status(400).json({ message: 'Pet not found' });
        }
    } catch (error) {
        console.error('Error updating pet:', error);
        res.status(500).json({ message: 'Failed to update pet' });
    }
}
*/
async function addPet(req, res) {
    try {
        const { name, type, age, breed, price, gender, picture } = req.body;

        const validationError = validatePetFields({ name, type, age, breed, price, gender, picture });
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }
        const newPet = { name, type, age, breed, price, gender, picture };

        // Save to JSON file and await the result
        const updatedPets = await writeJSON(newPet, filePath);

        return res.status(200).json({ message: 'Pet added successfully', pet: updatedPets });
    } catch (error) {
        console.error('Error adding pet:', error);
        return res.status(500).json({ message: 'Failed to add pet' });
    }
}



function validatePetFields(fields) {
    const { name, type, age, breed, price, gender, picture } = fields;

    if (!name || !type || !age || !breed || !price || !gender || !picture) {
        return 'All fields are required'; // Ensure all fields are present
    }

    // Validate that age is a number and is a positive integer
    // if (typeof age !== 'number' || age <= 0) {
    //     return 'Invalid data type for field: age'; // Invalid data type for age
    // }

    // Validate that price is a number and is a positive value
    // if (typeof price !== 'number' || price <= 0) {
    //     return 'Invalid data type for field: price';
    // }

    return null; // No validation errors
}

module.exports = {
    readJSON,
    writeJSON,
    //viewAllListing,
    //getPetById,
    //updatePet,
    PetDetail,
    addPet,
    validatePetFields
};


