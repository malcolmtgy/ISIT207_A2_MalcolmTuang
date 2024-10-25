// --- Registration Form ---
const registerForm = document.getElementById('registerForm');

if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const regUsername = document.getElementById('regUsername').value;
        const regEmail = document.getElementById('regEmail').value;
        const regPassword = document.getElementById('regPassword').value;

        // Email validation regex (basic validation)
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(regEmail)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Store registration data in localStorage
        localStorage.setItem('username', regUsername);
        localStorage.setItem('email', regEmail);
        localStorage.setItem('password', regPassword);

        alert('Registration successful! You can now log in.');
        // Redirect to login page after successful registration
        window.location.href = 'login.html';
    });
}

// --- Login Form ---
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form submission
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Check if entered username and password match stored values
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');

        // --- Change: Added check for registered user credentials ---
        if (username === storedUsername && password === storedPassword) {
            localStorage.setItem('loggedInUser', storedUsername);
            alert('Login successful using stored credentials!');
            window.location.href = 'index.html'; // Redirect after login
        } else {
            // Check if entered username and password match any predefined user
            const matchedUser = users.find(user => user.username === username && user.password === password);

            if (matchedUser) {
                localStorage.setItem('loggedInUser', username);
                alert('Login successful! Welcome, ' + username);
                window.location.href = 'index.html'; // Redirect after login
            } else {
                alert('Incorrect username or password. Please try again.');
            }
        }
    });
    function checkStoredCredentials() {
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');
    
        if (storedUsername && storedPassword) {
            alert(`Stored Username: ${storedUsername}\nStored Password: ${storedPassword}`);
        } else {
            alert('No credentials stored in localStorage.');
        }
    }
}

//Function to check if user is registered 
function registerUser(event) {
    event.preventDefault(); // Prevent form submission

    // Get the input values
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    // Simple validation (make sure all fields are filled)
    if (username && email && password) {
        // Store the values in localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);

        alert('Registration successful!');
        // Optionally, redirect to the login page
        window.location.href = 'login.html';
    } else {
        alert('Please fill in all the fields.');
    }
}

// Function to calculate final bill
function calculateFinalBill(rentalPeriod, carCondition) {
    let baseCost = 0;

    // Calculate base cost based on rental period
    if (rentalPeriod === "12 hours") {
        baseCost = 50;
    } else if (rentalPeriod === "1 day") {
        baseCost = 100;
    } else if (rentalPeriod === "1 week") {
        baseCost = 600;
    }

    // Add damage penalties
    let damageCost = 0;
    if (carCondition === "Minor Damage") {
        damageCost = 100;
    } else if (carCondition === "Major Damage") {
        damageCost = 500;
    }

    return baseCost + damageCost;
}

// Car return submission logic with billing
function submitReturn(event) {
    event.preventDefault();

    const carImage = document.getElementById('carImage').files[0];
    const carCondition = document.getElementById('carCondition').value;

    // Simulate rental period retrieval (you could dynamically retrieve this from user input)
    const rentalPeriod = "1 day"; // Hardcoded for example, can be dynamic from earlier selection

    // Check if image is uploaded
    if (!carImage) {
        alert('Please upload a picture of the car before submitting.');
        return;
    }

    // Calculate the final bill
    const finalBill = calculateFinalBill(rentalPeriod, carCondition);

    // Display final bill to user
    document.getElementById('finalBillDisplay').style.display = 'block';
    document.getElementById('finalBillAmount').innerText = `Your final bill is $${finalBill}.`;
    
    alert('Car return submitted successfully. Final bill is being calculated.');
}

// Reservation submission function
function submitReservation(event) {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const carType = urlParams.get("carType");
    const pickupBranch = document.getElementById("pickupBranch").value;
    const reservationId = generateReservationId();

    const reservationDetails = {
        reservationId,
        carType,
        pricePerDay: carPrices[carType],
        pickupBranch,
        status: "Reserved"
    };

    localStorage.setItem(reservationId, JSON.stringify(reservationDetails));
    alert("Reservation successful! Your Reservation ID is: " + reservationId);
}

// Utility to generate a random reservation ID
function generateReservationId() {
    return 'AZR' + Math.floor(Math.random() * 10000);
}