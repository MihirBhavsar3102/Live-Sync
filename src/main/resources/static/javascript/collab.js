const inputField = document.querySelector('.input-fld');
const joinbtn = document.querySelector('.sub-btn');
const startcollabbtn=document.querySelector('.cta-btn');

inputField.addEventListener('input', function () {
    if (inputField.value.trim() !== '') {
        submitButton.removeAttribute('disabled');
    } else {
        submitButton.setAttribute('disabled', true);
    }
});


function validateInput() {

    const input=document.querySelector('.input-fld').value;

    var ipPortPattern = /^(\d{1,3}\.){3}\d{1,3}:\d{1,5}$/;

    if (ipPortPattern.test(input)) {
        
        var parts = input.split(':');

        alert(parts[0]+" "+parts[1]);
        window.location.href = 'player.html';
    }

    else{
        alert("Enter a proper link");
    }


}

startcollabbtn.addEventListener('click',function(){
    // Fetch IP address and port
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;
            const port = window.location.port || '80'; // Use default port 80 if not specified
            console.log('IP Address: ' + ipAddress + '\nPort: ' + port);
            const url = `player.html?ip=${ipAddress}&port=${port}`;


            // Call Server API
            fetch(`http://localhost:8080/Server`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Port: port })
            })
                .then(response => response.text())
                .then(serverResponse => {
                    console.log('Server Response:', serverResponse);
                })
                .catch(error => {
                    console.error('Error starting server:', error);
                });

            // Call Client API
            fetch(`http://localhost:8080/Client`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ip: ipAddress, Username: 'Harshvardhan', port: port })
            })
                .then(response => response.text())
                .then(clientResponse => {
                    console.log('Client Response:', clientResponse);
                })
                .catch(error => {
                    console.error('Error starting client:', error);
                });

            window.location.href = url;

        })
        .catch(error => {
            console.error('Error fetching IP address:', error);
        });

})



    joinbtn.addEventListener('click', function() {

        fetch(`http://localhost:8080/Client`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ip: parts[0],
                port: parts[1],
                username: "Harshvardhan"
            })
        })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Failed to start client');
                }
            })
            .then(message => {
                console.log('Response from server:', message);
                alert('Client started successfully!');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to start client. Please check console for details.');
            });
    });

