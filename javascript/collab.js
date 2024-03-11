const inputField = document.querySelector('.input-fld');
const submitButton = document.querySelector('.sub-btn');

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

