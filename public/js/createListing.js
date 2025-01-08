function addPet() {

    const jsonData = {
        name: document.getElementById("name").value,
        type: document.getElementById("type").value,
        breed: document.getElementById("breed").value,
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        price: document.getElementById("price").value,
        picture: document.getElementById("imageUrl").value, // Uncomment if picture handling is needed
    };


    // Validate form data
    if (!jsonData.name || !jsonData.type || !jsonData.breed || !jsonData.age || !jsonData.gender || !jsonData.price || !jsonData.picture) {
        document.getElementById("message").innerHTML = 'All fields are required!';
        document.getElementById("message").setAttribute("class", "text-danger");
        return;
    }


    // Create and send the request
    var request = new XMLHttpRequest();
    request.open("POST", "/add-pet", true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);

        if (response.message) {
            document.getElementById("message").innerHTML = 'Added Pet: ' + jsonData.name + '!';
            document.getElementById("message").setAttribute("class", "text-success");

            // Clear the form fields
            document.getElementById("name").value = "";
            document.getElementById("type").value = "";
            document.getElementById("breed").value = "";
            document.getElementById("age").value = "all";  // Reset age dropdown
            document.getElementById("gender").value = "";
            document.getElementById("price").value = "";
            document.getElementById("imageUrl").value = "";

            // Redirect to index.html
            window.location.href = 'index.html';
        } else {
            document.getElementById("message").innerHTML = 'Unable to add pet!';
            document.getElementById("message").setAttribute("class", "text-danger");
        }
    };

    // Send JSON data
    request.send(JSON.stringify(jsonData));
}

