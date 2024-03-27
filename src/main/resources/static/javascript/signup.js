const passwordInput = document.getElementById('password');
//
// passwordInput.addEventListener('input', function() {
//     const password = passwordInput.value;
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#])(?=.{6,})/;
//     if (!passwordRegex.test(password)) {
//         passwordInput.setCustomValidity('Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, and one of the following special characters: @ or #');
//     } else {
//         passwordInput.setCustomValidity('');
//     }
// });
document.getElementById('signupForm').addEventListener('submit', async function(event) {
    console.log('Form submitted');

    // event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;

    const userData = {
        email: email,
        password: password,
        userName: username,
    };

    try {
        const response = await fetch('http://localhost:8080/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            const data = await response.json();
            // Handle successful signup
            alert('Signup successful!');
            // Optionally, you can redirect the user to another page after signup
            window.location.href = '../html/login.html'; // Replace 'success.html' with the actual path
        } else {
            const errorMessage = await response.text();
            // Handle signup error
            alert(errorMessage);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
