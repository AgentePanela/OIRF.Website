document.getElementById('userForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    console.log("Connecting...")

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');

    try {
        const response = await fetch('https://oirf.online/app/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }) 
        });

        const data = await response.json();

        if (response.ok) {
            messageDiv.innerHTML = `<p style="color: green;">${data.message}</p>`;
        } else {
            messageDiv.innerHTML = `<p style="color: red;">${data.error}</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        messageDiv.innerHTML = `<p style="color: red;">Error connecting to the server!.</p>`;
    }
});
