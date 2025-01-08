let filters = {};

function loadPetListing(filters = {}) {
    console.log(filters);
    let query = Object.keys(filters).length > 0
        ? `?${Object.keys(filters).map(key => `${key}=${encodeURIComponent(filters[key])}`).join('&')}`
        : '';
    var request = new XMLHttpRequest();
    request.open("GET", query ? `/view-all-listing${query}` : '/view-all-listing', true);
    request.setRequestHeader('Content-type', 'application/json');

    request.onload = function () {
        console.log("Response status:", request.status); // Debugging output
        console.log("Response text:", request.responseText); // Debugging output

        var response = JSON.parse(request.responseText);
        
        function viewMore(petId) {
            window.location.href = `details.html?id=${petId}`;
        }

        console.log(response.id)
        var html = '';
        for (var i = 0; i < response.length; i++) {
            html += '<div id="petListing">' +
                '<img src="' + response[i].picture + '"id="picture"><br>' +
                '<div id="name"><img id="petNameImg" src="images/id-card.png"><p id="petName">' + response[i].name + '</p></div><br>' +
                '<div id="age"><img id="petAgeImg" src="images/age.png"><p id= "petAge">' + response[i].age + ' MONTHS</p></div><br>' +
                '<div id="breedDiv"><img id="breedImg" src="images/footprint.png"><p id="petBreed">' + response[i].breed + '<p></div><br>' +
                '<div id="gender"><img id="petGenderImg" src="/images/equality.png"><p id= "petGender">' + response[i].gender + '</p></div><br>' +
                '<div id="price"><img id="petPriceImg" src="images/price-tag.png"><p id= "petPrice">' + response[i].price + ' SGD</p></div><br>' +
                '<button id="petid" onclick = "viewMore('+response[i].id+')">View More</button>'
                '</div>';
        }
        document.getElementById("container").innerHTML = html;
    };
    request.send();

}

function viewMore(petId) {
    window.location.href = `details.html?id=${petId}`;
}

function openFilterModal() {
    document.getElementById('filterModal').style.display = "flex";
}

function closeFilterModal() {
    document.getElementById('filterModal').style.display = "none";
}

function applyFilter() {
    const type = document.querySelector('#typeButton button.active')?.innerText;
    const breed = document.querySelector('#breedSelect')?.value;
    const age = document.querySelector('#ageButton button.active')?.innerText;
    const gender = document.querySelector('#genderButton button.active')?.innerText;
    const minPriceInput = document.getElementById('minPrice')
    const minPrice = minPriceInput.value;
    const maxPriceInput = document.getElementById('maxPrice')
    const maxPrice = maxPriceInput.value;

    const isMinPriceValid = minPrice === '' || validatePrice(minPriceInput);
    const isMaxPriceValid = maxPrice === '' || validatePrice(maxPriceInput);
    if (!isMinPriceValid || !isMaxPriceValid) {
        alert("Please enter valid numeric values for price.");
        return;
    }

    if (type && type != 'ALL') {
        filters.type = type;
    } else if (type === 'ALL') {
        delete filters.type;
    }

    if (breed && breed != 'ALL') {
        filters.breed = breed;
    } else if (breed === 'ALL') {
        delete filters.breed;
    }

    if (age && age != 'ANY') {
        filters.age = age;
    } else if (age === 'ANY') {
        delete filters.age;
    }
    if (gender && gender != 'ANY') {
        filters.gender = gender;
    } else if (gender === 'ANY') {
        delete filters.gender;
    }

    if (minPrice && !isNaN(minPrice) & minPrice > 0) {
        filters.minPrice = parseInt(minPrice);
    } else {
        delete filters.minPrice;
    }
    if (maxPrice && !isNaN(maxPrice) && maxPrice > 0) {
        filters.maxPrice = parseInt(maxPrice);
    } else {
        delete filters.maxPrice;
    }
    if (filters) {
        closeFilterModal();
        loadPetListing(filters);
        console.log(filters);
    } else {
        console.log("Error fetching filters.");
        console.log(filters);
    }
}
function validatePrice(price) {
    if (/[^0-9]/g.test(price.value)) {
        document.getElementById('priceError').textContent = "Please enter a valid numeric value";
        return false;
    } else if (price.value <= 0) {
        document.getElementById('priceError').textContent = "Please enter a number greater than zero";
        return false;
    }
    document.getElementById('priceError').textContent = "";
    return true;
}
const breeds = {
    DOG: [
        "Labrador", "Beagle", "Bulldog", "Poodle", "German Shepherd",
        "Golden Retriever", "Dachshund", "Pug", "Boxer", "Chihuahua",
        "Shih Tzu", "Siberian Husky", "Cocker Spaniel", "Great Dane",
        "Border Collie", "Rottweiler"
    ],
    CAT: [
        "Siamese", "Persian", "Maine Coon", "Bengal", "Ragdoll",
        "British Shorthair", "Sphynx", "Scottish Fold", "Abyssinian",
        "American Shorthair", "Birman", "Savannah", "Russian Blue",
        "Norwegian Forest Cat", "Oriental Shorthair"
    ],
    FISH: [
        "Goldfish", "Betta", "Guppy", "Angelfish", "Tetra",
        "Molly", "Oscar", "Swordtail", "Zebra Danio", "Platy",
        "Discus", "Corydoras", "Neon Tetra", "Koi", "Clownfish",
        "Gourami"
    ]
};
function updateBreeds(breedType) {
    console.log(breedType)
    const breedSelect = document.getElementById('breedSelect');
    breedSelect.innerHTML = '<option value="ALL">ALL</option>';
        breeds[breedType].forEach(breed => {
            const option = document.createElement('option');
            console.log(breed)
            option.value = breed;
            console.log(option.value);
            option.textContent = breed;
            console.log(option)
            breedSelect.appendChild(option);
        });
}
function selectedFilter(button, filterType) {
    document.querySelectorAll(`#${filterType}Button button`).forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    console.log(button, filterType)
    if (filterType == 'type') {
        if (button.innerText === "ALL") {
            document.getElementById('breed').style.display = 'none';
            filters.type = "ALL";
            delete filters.breed;
            updateBreeds("ALL")
        } else {
            document.getElementById('breed').style.display = "block"
            console.log(button.textContent)
            updateBreeds(button.textContent)


        }
    }
}

function updatePrice(value) {
    document.getElementById('priceValue').innerText = value;
}