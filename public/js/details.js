let petId;

window.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    petId = urlParams.get('id');

    if (petId) {
        try {
            const response = await fetch(`/getPet/${petId}`);
            console.log(response)
            if (response.ok) {
                const pet = await response.json();

                // Update HTML elements with the fetched data
                document.getElementById('pet-picture').src = pet.picture;
                document.getElementById('pet-name').textContent = pet.name;
                document.getElementById('pet-breed').textContent = pet.breed;
                document.getElementById('pet-age').textContent = pet.age;
                document.getElementById('pet-gender').textContent = pet.gender;
                document.getElementById('pet-price').textContent = pet.price;


                // Display the edit button and set its href with petId
                const editButton = document.getElementById('edit-button');
                editButton.style.display = 'block';
                editButton.onclick = function () {
                    window.location.href = `edit.html?id=${petId}`;
                };
            } else {
                console.error('Pet not found.');
            }
        } catch (error) {
            console.error('Error fetching pet details:', error);
        }
    } else {
        console.error('No pet ID found in the URL.');
    }
});
