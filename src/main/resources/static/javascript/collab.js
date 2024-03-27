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
            const port = 3000; // Use default port 80 if not specified
            const Username='bhadrika';
            // const port=2000;
            console.log('IP Address: ' + ipAddress + '\nPort: ' + port);
            const url = `player.html?ip=${ipAddress}&port=${port}`;


            // Call Server API
            fetch('/Server', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(port)
            })
                // .then(response => response.text())
                // .then(serverResponse => {
                //     console.log('Server Response:', serverResponse);
                //     startClient(ipAddress,port);
                // })
                .catch(error => {
                    console.error('Error starting server:', error);
                });

            startClient(ipAddress,port,Username)
             window.location.href = url;

        })
        .catch(error => {
            console.error('Error fetching IP address:', error);
        });

})

function startClient(ipAddress, port,Username) {
    // Call Client API to start the client
    fetch(`http://localhost:8080/Client`, {
        method: 'POST',
        headers: {
            'Content-Type':  'application/x-www-form-urlencoded'
        },
        body: `ipAddress=${ipAddress}&port=${port}&username=${Username}`
    })
        .catch(error => {
            console.error('Error starting client:', error);
        });
}

    joinbtn.addEventListener('click', function() {

        startClient(parts[0], parts[1],'Harshvardhan')
    });

