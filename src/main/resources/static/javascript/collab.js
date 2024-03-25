const inputField = document.querySelector('.input-fld');
const submitButton = document.querySelector('.sub-btn');
const start_collab=document.querySelector('.cta-btn');

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

        var ipAddress = parts[0];
        var portNumber = parts[1];

        var info= {
            ip: ipAddress,
            port: portNumber
        };

        console.log(info);
        alert(parts[0]+" "+parts[1]);
        window.location.href = 'player.html';
    }

    else{
        alert("Enter a proper link");
    }


}

document.querySelector('.cta-btn').addEventListener('click',function(){
    // Fetch IP address and port
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;
            const port = window.location.port || '80'; // Use default port 80 if not specified
            console.log('IP Address: ' + ipAddress + '\nPort: ' + port);
            const url = `player.html?ip=${ipAddress}&port=${port}`;
            window.location.href = url;
        })
        .catch(error => {
            console.error('Error fetching IP address:', error);
        });

})

