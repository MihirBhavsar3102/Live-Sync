// Inside worker.js

self.onmessage = function(event) {
    const fetchInterval = event.data;

    function fetchMessage() {
        fetch(`http://localhost:8080/receive_msg`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Failed to fetch message from server');
                }
            })
            .then(message => {
                // Send the received message back to the main thread
                self.postMessage({ message });
            })
            .catch(error => {
                // Send error message back to the main thread
                self.postMessage({ error: error.message });
            });
    }

    // Fetch message initially and every specified interval thereafter
    fetchMessage();
    setInterval(fetchMessage, fetchInterval);
};
