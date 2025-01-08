
function addEvents() {
    var response = "";
    var jsonData = new Object();
    jsonData.title = document.getElementById("title").value;
    jsonData.description = document.getElementById("description").value;
    jsonData.location = document.getElementById("location").value;
    jsonData.date = document.getElementById("date").value;
    jsonData.time = document.getElementById("time").value;
    jsonData.instruction = document.getElementById("instruction").value;

    if (jsonData.title == "" || jsonData.location == "" || jsonData.description == "" || jsonData.date == "" || jsonData.time == "" || jsonData.instruction == "") {
        alert('All fields are required!');
        document.getElementById("message").innerHTML = 'All fields are required!';
        document.getElementById("message").setAttribute("class", "text-danger");
        return;
    }

    var request = new XMLHttpRequest();
    request.open("POST", "/add-events", true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        var response = JSON.parse(request.responseText);
        console.log(response);
        if (response.message) {
            alert(response.message);
            if (response.message === 'Event created successfully!') {
                // Clear form fields after success
                
                document.getElementById("title").value = "";
                document.getElementById("description").value = "";
                document.getElementById("location").value = "";
                document.getElementById("date").value = "";
                document.getElementById("time").value = "";
                document.getElementById("instruction").value = "";
                // Redirect to view event page or reload events
                setTimeout(function() {
                    window.location.href="viewevent.html"; // Update the event list 
                }, 2000);
            }
            
        } else {
            alert('Unable to add resource!');
        }
    };
    request.send(JSON.stringify(jsonData));
}

// js/view-event.js
function viewEvents() {
    var request = new XMLHttpRequest();
    request.open('GET', '/viewEvents', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {

        response = JSON.parse(request.responseText);
        var html = ''

        for (var i = 0; i < response.length; i++) {
            html += '<tr>' +
                '<td>' + (i + 1) + '</td>' +
                '<td>' + response[i].title + '</td>' +
                '<td>' + response[i].description + '</td>' +
                '<td>' + response[i].location + '</td>' +
                '<td>' + response[i].date + '</td>' +
                '<td>' + response[i].time + '</td>' +
                '<td>' + response[i].instruction + '</td>' +


                '<td>' +
                '<button type="button" class="btn btn-warning" onclick="editResource(\'' + JSON.stringify(response[i]).replaceAll('\"', '&quot;') +
                '\')">Edit </button> ' +
                '<button type="button" class="btn btn-danger"onclick="deleteResource(' + response[i].id + ')"> Delete</button>' +
                '</td>' +
                '</tr>'
        }
        document.getElementById('tableContent').innerHTML = html;
    };
    request.send();

}


