// --- Registration Form Handler ---
function handleRegister(event) {
    event.preventDefault();
    const regUsername = document.getElementById('regUsername').value;
    const regEmail = document.getElementById('regEmail').value;
    const regPassword = document.getElementById('regPassword').value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(regEmail)) {
        alert('Please enter a valid email address.');
        return;
    }

    localStorage.setItem('username', regUsername);
    localStorage.setItem('email', regEmail);
    localStorage.setItem('password', regPassword);

    alert('Registration successful! You can now log in.');
    window.location.href = 'login.html';
}

// --- Login Form Handler ---
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
        localStorage.setItem('loggedInUser', storedUsername);
        alert('Login successful!');
        window.location.href = 'index.html';
    } else {
        alert('Incorrect username or password. Please try again.');
    }
}

// --- Car Return Submission Handler ---
function submitReturn(event) {
    event.preventDefault();
    const carImage = document.getElementById('carImage').files[0];
    if (!carImage) {
        alert('Please upload a picture of the car before submitting.');
        return;
    }
    // Show a success popup message
    alert("Car return submission successful! Thank you.");
    document.getElementById("returnForm").reset();
}

// --- Prices for different car types ---
const carPrices = {
    "SUV": 150,
    "Sedan": 250,
    "Sports": 450,
    "Compact": 60
};

const rentalPrices = {
    "1": 100,
    "2": 200,
    "3": 700 
}
const damageCosts = {   
    "No Damage": 0,
    "Minor Damage": 100,
    "Major Damage": 500
}
// --- Submit Reservation ---
function submitReservation(event) {
    event.preventDefault();
    
    const carType = document.getElementById("carType").value;
    const rentalPeriod = document.getElementById("rentalPeriod").value;
    const reservationId = generateReservationId();
    
    const carPrice = carPrices[carType];
    const rentalPrice = rentalPrices[rentalPeriod];

    
    const reservationDetails = {
        reservationId,
        carType,
        rentalPeriod,
        carPrice,
        rentalPrice,
        status: "Reserved"
    };
    
    localStorage.setItem(reservationId, JSON.stringify(reservationDetails));
    localStorage.setItem("currentReservationId", reservationId);
    
    alert("Reservation successful! Your Reservation ID is: " + reservationId);
    document.getElementById("reservationForm").reset();
}

// --- Generate a unique Reservation ID ---
function generateReservationId() {
    return 'AZR' + Math.floor(Math.random() * 10000);
}

// --- Submit Inspection ---

function submitInspection(event) {
    event.preventDefault();

    const reservationId = document.getElementById("inspectionReservationId").value;
    const carCondition = document.getElementById("inspectionCarCondition").value;

    const reservationData = localStorage.getItem(reservationId);
    if (!reservationData) {
        alert("Reservation ID not found. Please check and try again.");
        return;
    }

    // Show alert that inspection is complete
    alert(`Inspection complete for Reservation ID ${reservationId}. Condition: ${carCondition}`);
}


// --- Payment Handler ---
function processPayment(event) {
    event.preventDefault();
    
    const creditCardNumber = document.getElementById("creditCardNumber").value;
    const expiryDate = document.getElementById("expiryDate").value;
    const cvv = document.getElementById("cvv").value;

    // Validate payment details
    if (creditCardNumber.length < 16 || cvv.length < 3) {
        alert('Please enter valid payment details.');
        return;
    }

    alert('Payment successful! Thank you for your transaction.');
}

