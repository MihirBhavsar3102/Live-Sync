document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const credentials = {
        email: email,
        password: password
    };

    try {
        const response = await fetch('http://localhost:8080/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (response.ok) {
            const user = await response.json();
            // Redirect to index page or do other actions on successful login
            // window.location.href = `/index.html?name=${user.userName}&email=${user.email}&photo=${user.photo}`;
        } else {
            const errorMessage = await response.text();
            if (errorMessage === "New User!! SignUp First") {
                // Show message to the user
                alert("You are a new user. Please sign up first.");
                // Redirect to signup page after showing the message
                window.location.href ="../html/signup.html";
            } else {
                // Handle other login errors
                alert(errorMessage);
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

