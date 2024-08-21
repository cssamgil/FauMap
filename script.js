let map;
let currentLocationMarker;
let destinationMarker;
let directionsService;
let directionsRenderer;
const locations = [
    { name: "Administration, Kenneth R. Williams", code: "10AD", lat: 26.373047, lng: -80.101702 },
    { name: "Alumni Center", code: "96AC", lat: 26.373447, lng: -80.102201 },
    { name: "Athletics, Schmidt Center", code: "91EC", lat: 26.373852, lng: -80.101672 },
    { name: "Behavioral Sciences", code: "12BS", lat: 26.373611, lng: -80.102222 },
    { name: "Biological Sciences", code: "50BS", lat: 26.374111, lng: -80.101917 },
    { name: "Bookstore", code: "76BK", lat: 26.3725, lng: -80.101111 },
    { name: "Breezeway", code: "34BW", lat: 26.373611, lng: -80.101889 },
    { name: "Business, College of (Fleming)", code: "86CO", lat: 26.373858, lng: -80.103751 },
    { name: "Business, T.A. Schmidt College of", code: "87CO", lat: 26.374302, lng: -80.104204 },
    { name: "Carole & Barry Kaye Auditorium", code: "31AUC", lat: 26.374444, lng: -80.102778 },
    { name: "Center for Complex Systems", code: "97CS", lat: 26.3732, lng: -80.1032 },
    { name: "Central Energy Plant", code: "64CE", lat: 26.373047, lng: -80.101702 },
    { name: "Chartwells", code: "61CA", lat: 26.374702, lng: -80.102159 },
    { name: "Culture and Society", code: "66CS", lat: 26.373588, lng: -80.102289 },
    { name: "Dining Services", code: "72DI", lat: 26.373911, lng: -80.102472 },
    { name: "Dorm 2", code: "20D2", lat: 26.374111, lng: -80.102667 },
    { name: "Dorm 3", code: "21D3", lat: 26.374444, lng: -80.102778 },
    { name: "Dorm 4", code: "22D4", lat: 26.374778, lng: -80.102889 },
    { name: "Dorm 5", code: "23D5", lat: 26.375111, lng: -80.103000 },
    { name: "Dorm 7", code: "24D7", lat: 26.375444, lng: -80.103111 },
    { name: "Education", code: "47ED", lat: 26.374778, lng: -80.102889 },
    { name: "Engineering West", code: "36EW", lat: 26.374111, lng: -80.102667 },
    { name: "FAU Foundation Building", code: "96FA", lat: 26.374444, lng: -80.102778 },
    { name: "Facilities", code: "91FA", lat: 26.374111, lng: -80.102667 },
    { name: "Graduate College", code: "31GC", lat: 26.374444, lng: -80.102778 },
    { name: "Gymnasium", code: "38GY", lat: 26.374722, lng: -80.101944 },
    { name: "Health Services", code: "35HS", lat: 26.374444, lng: -80.102778 },
    { name: "Honors College", code: "92HC", lat: 26.374111, lng: -80.102667 },
    { name: "Housing", code: "20HS", lat: 26.374111, lng: -80.102667 },
    { name: "Indian River Tower", code: "51IT", lat: 26.374111, lng: -80.102667 },
    { name: "Information Booth", code: "93IB", lat: 26.374111, lng: -80.102667 },
    { name: "Instructional Services", code: "80IS", lat: 26.374444, lng: -80.102778 },
    { name: "Library", code: "94LI", lat: 26.374111, lng: -80.102667 },
    { name: "Liberal Arts Building", code: "96LB", lat: 26.374444, lng: -80.102778 },
    { name: "Life Long Learning", code: "95LL", lat: 26.374111, lng: -80.102667 },
    { name: "Maintenance Building", code: "63MB", lat: 26.374444, lng: -80.102778 },
    { name: "Media Center", code: "50MC", lat: 26.374111, lng: -80.102667 },
    { name: "New Residence Hall", code: "60NH", lat: 26.374111, lng: -80.102667 },
    { name: "New Theatre", code: "68NT", lat: 26.374444, lng: -80.102778 },
    { name: "Nursing", code: "26NS", lat: 26.374111, lng: -80.102667 },
    { name: "Physical Science", code: "43PS", lat: 26.374111, lng: -80.102667 },
    { name: "Police", code: "69PO", lat: 26.374111, lng: -80.102667 },
    { name: "Recreation & Fitness Center", code: "58RC", lat: 26.374444, lng: -80.102778 },
    { name: "Research Support Facility", code: "90RS", lat: 26.374111, lng: -80.102667 },
    { name: "Schmidt Biomedical Science", code: "91SB", lat: 26.374111, lng: -80.102667 },
    { name: "Science and Engineering", code: "55SE", lat: 26.374444, lng: -80.102778 },
    { name: "Social Science", code: "47SS", lat: 26.374111, lng: -80.102667 },
    { name: "Student Activity Center", code: "31SA", lat: 26.374444, lng: -80.102778 },
    { name: "Student Housing Office", code: "62SO", lat: 26.374111, lng: -80.102667 },
    { name: "Student Support Services", code: "96SS", lat: 26.374111, lng: -80.102667 },
    { name: "Student Union", code: "31SU", lat: 26.374444, lng: -80.102778 },
    { name: "T-Building", code: "91TB", lat: 26.374111, lng: -80.102667 },
    { name: "Teaching Gym", code: "73TG", lat: 26.374111, lng: -80.102667 },
    { name: "Tennis Complex", code: "59TC", lat: 26.374111, lng: -80.102667 },
    { name: "Visual Arts & Art History", code: "41VA", lat: 26.374111, lng: -80.102667 },
    { name: "Wimberly Library", code: "94WL", lat: 26.374111, lng: -80.102667 },
];

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 26.374111, lng: -80.102667 }, // FAU center
        zoom: 15,
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };

            if (currentLocationMarker) {
                currentLocationMarker.setMap(null);
            }

            currentLocationMarker = new google.maps.Marker({
                position: userLocation,
                map: map,
                title: "You are here",
                icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            });

            map.setCenter(userLocation);
            watchUserLocation();
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showSuggestions(value) {
    const suggestions = document.getElementById("suggestions");
    suggestions.innerHTML = "";

    if (value.length === 0) {
        return;
    }

    const filteredLocations = locations.filter(loc => loc.name.toLowerCase().includes(value.toLowerCase()));

    filteredLocations.forEach(loc => {
        const div = document.createElement("div");
        div.textContent = loc.name;
        div.onclick = () => selectLocation(loc);
        suggestions.appendChild(div);
    });
}

function selectLocation(location) {
    document.getElementById("search").value = location.name;
    document.getElementById("suggestions").innerHTML = "";
    if (destinationMarker) {
        destinationMarker.setMap(null);
    }

    destinationMarker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        title: location.name,
    });

    map.setCenter({ lat: location.lat, lng: location.lng });
}

function getDirections() {
    if (currentLocationMarker && destinationMarker) {
        const request = {
            origin: currentLocationMarker.getPosition(),
            destination: destinationMarker.getPosition(),
            travelMode: google.maps.TravelMode.WALKING,
        };

        directionsService.route(request, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
            } else {
                alert("Could not calculate route.");
            }
        });
    } else {
        alert("Please select a destination first.");
    }
}

// Load the map when the window loads
window.onload = initMap;
