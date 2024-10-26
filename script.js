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

// --- Car Return Submission with Final Bill Calculation ---
function submitReturn(event) {
    event.preventDefault();
    const carImage = document.getElementById('carImage').files[0];
    const carCondition = document.getElementById('carCondition').value;
    const rentalPeriod = document.getElementById('rentalPeriod').value;

    if (!carImage) {
        alert('Please upload a picture of the car before submitting.');
        return;
    }

}

// --- Utility to Calculate Final Bill ---
function calculateFinalBill(rentalPeriod, carCondition) {
    let baseCost = 0;
    switch (rentalPeriod) {
        case "12 hours": baseCost = 50; break;
        case "1 day": baseCost = 100; break;
        case "1 week": baseCost = 600; break;
    }

    const damageCost = carCondition === "Minor Damage" ? 100 : carCondition === "Major Damage" ? 500 : 0;
    return baseCost + damageCost;

    const finalBill = calculateFinalBill(rentalPeriod, carCondition);
    document.getElementById('finalBillDisplay').style.display = 'block';
    document.getElementById('finalBillAmount').innerText = `Your final bill is $${finalBill}.`;
    alert('Car return submitted successfully. Final bill calculated.');
}

// Prices for different car types
const carPrices = {
    "SUV": 150,
    "Sedan": 250,
    "Sports": 450,
    "Compact": 60
};

// Function to submit reservation
function submitReservation(event) {
    event.preventDefault();

    const carType = document.getElementById("carType").value;
    const pickupBranch = document.getElementById("pickupBranch").value;
    const reservationId = generateReservationId();

    const reservationDetails = {
        reservationId,
        carType,
        pickupBranch,
        pricePerDay: carPrices[carType],
        status: "Reserved"
    };

    localStorage.setItem(reservationId, JSON.stringify(reservationDetails));
    alert("Reservation successful! Your Reservation ID is: " + reservationId);
}

// Generate a unique Reservation ID
function generateReservationId() {
    return 'AZR' + Math.floor(Math.random() * 10000);
}

// Function to submit inspection
function submitInspection(event) {
    event.preventDefault();

    const reservationId = document.getElementById("inspectionReservationId").value;
    const carCondition = document.getElementById("inspectionCarCondition").value;

    const reservationData = localStorage.getItem(reservationId);
    if (!reservationData) {
        alert("Reservation ID not found. Please check and try again.");
        return;
    }

    const reservationDetails = JSON.parse(reservationData);

    let damageCost = 0;
    if (carCondition === "Minor Damage") {
        damageCost = 100;
    } else if (carCondition === "Major Damage") {
        damageCost = 500;
    }

    const finalBill = reservationDetails.pricePerDay + damageCost;

    alert(`Inspection complete. Final bill for Reservation ID ${reservationId} is $${finalBill}.`);
    document.getElementById('finalBillAmount').innerText = `Your final bill is $${finalBill}.`;

    reservationDetails.status = "Inspected";
    reservationDetails.finalBill = finalBill;
    reservationDetails.carCondition = carCondition;
    localStorage.setItem(reservationId, JSON.stringify(reservationDetails));

     // Display success message and final bill
     document.getElementById("inspectionSuccessMessage").innerText = `Inspection submission complete. Final bill for Reservation ID ${reservationId} is $${finalBill}.`;
     document.getElementById("inspectionSuccessMessage").style.display = "block";
}
