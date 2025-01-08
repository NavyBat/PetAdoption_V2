async function loadPetDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const petId = urlParams.get('id');

    if (!petId) {
        alert('No pet ID specified.');
        return;
    }

    try {
        const response = await fetch(`/getPet/${petId}`);
        const pet = await response.json();

        // Populate the form fields with pet data
        document.getElementById('name').value = pet.name;
        document.getElementById('breed').value = pet.breed;
        document.getElementById('age').value = pet.age;
        document.getElementById('gender').value = pet.gender;
        document.getElementById('price').value = pet.price;
        document.getElementById('picture').value = pet.picture;
        
    } catch (error) {
        console.error('Error loading pet details:', error);
    }
}

async function updatePet() {
    const urlParams = new URLSearchParams(window.location.search);
    const petId = urlParams.get('id');

    const petData = {
        name: document.getElementById('name').value,
        breed: document.getElementById('breed').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        price: document.getElementById('price').value,
        picture: document.getElementById('picture').value
    };

    try {
        const response = await fetch(`/updatePet/${petId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(petData)
        });

        if (response.ok) {
            alert('Pet updated successfully!');
            window.location.href = '/';
        } else {
            alert('Failed to update pet.');
        }
    } catch (error) {
        console.error('Error updating pet:', error);
        alert('An error occurred. Please try again later.');
    }
}

document.addEventListener('DOMContentLoaded', loadPetDetails);
