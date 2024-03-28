const inputField = document.querySelector('.input-fld');
const joinbtn = document.querySelector('.sub-btn');
const startcollabbtn = document.querySelector('.cta-btn');

inputField.addEventListener('input', function () {
    if (inputField.value.trim() !== '') {
        joinbtn.removeAttribute('disabled');
    } else {
        joinbtn.setAttribute('disabled', true);
    }
});


function validateInput() {

    const input = document.querySelector('.input-fld').value;

    var ipPortPattern = /^(\d{1,3}\.){3}\d{1,3}:\d{1,5}$/;

    if (ipPortPattern.test(input)) {

        var parts = input.split(':');

        alert(parts[0] + " " + parts[1]);
        startClient(parts[0], parts[1], 'Harshvardhan')
        window.location.href = 'player.html';
    } else {
        alert("Enter a proper link");
    }


}

startcollabbtn.addEventListener('click', function () {

    fetch('http://localhost:8080/api/ipv4')
        .then(response => {
            if (response.ok) {
                return response.text(); // Assuming the backend returns the IPv4 address as plain text
            } else {
                throw new Error('Failed to fetch IPv4 address from backend');
            }
        })
        .then(ipv4Address => {
            const ipAddress = ipv4Address;
            const port = 3000; // Use default port 80 if not specified
            const urlParams = new URLSearchParams(window.location.search);
            const userName = urlParams.get('name');
            console.log('IP Address: ' + ipAddress + '\nPort: ' + port+'\nUsername:'+userName);

            const url = `player.html?ip=${ipAddress}&port=${port}&username=${userName}`;


            // Call Server API
            fetch('/Server', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(port)
            })
                .catch(error => {
                    console.error('Error starting server:', error);
                });

            startClient(ipAddress, port, userName)
            window.location.href = url;

        })
        .catch(error => {
            console.error('Error fetching IP address:', error);
        });


})

function startClient(ipAddress, port, Username) {
    console.log("oye");
    // Call Client API to start the client
    fetch(`http://localhost:8080/Client`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `ipAddress=${ipAddress}&port=${port}&username=${Username}`
    })
        .catch(error => {
            console.error('Error starting client:', error);
        });
}





