document.addEventListener("DOMContentLoaded", () => {
    // Check if we are on the reservation page
    if (window.location.pathname.endsWith("reservation.html")) {
        initializeReservationPage();
    }

    // Initialize the register form event listener if on the registration page
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Initialize the login form event listener if on the login page
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Initialize the return form event listener if on the return page
    const returnForm = document.getElementById('returnForm');
    if (returnForm) {
        returnForm.addEventListener('submit', submitReturn);
    }
});

// --- Reservation Page Initialization ---
function initializeReservationPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const carType = urlParams.get("carType");

    if (carType && carPrices[carType]) {
        const selectedCarTypeElement = document.getElementById("selectedCarType");
        const carPriceElement = document.getElementById("carPrice");

        if (selectedCarTypeElement && carPriceElement) {
            selectedCarTypeElement.textContent = carType;
            carPriceElement.textContent = carPrices[carType];
        }
    } else {
        alert("Car type not specified. Returning to car selection page.");
        window.location.href = "cars.html";
    }
}

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
    const rentalPeriod = "1 day"; // Can be dynamic based on user input

    if (!carImage) {
        alert('Please upload a picture of the car before submitting.');
        return;
    }

    const finalBill = calculateFinalBill(rentalPeriod, carCondition);
    document.getElementById('finalBillDisplay').style.display = 'block';
    document.getElementById('finalBillAmount').innerText = `Your final bill is $${finalBill}.`;
    alert('Car return submitted successfully. Final bill calculated.');
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
}
