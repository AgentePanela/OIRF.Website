console.log("Session module enabled!")
export async function refreshSession() {
    const refreshToken = atob(localStorage.getItem("refreshToken"));

    if(!refreshToken)
        return;

    try {
        const response = await fetch('https://oirf.online/app/api/users/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-Refresh-Token' : `Bearer: ${refreshToken}` }
        });
		
        const result = await response.json();

        if (response.status === 200) {
            console.log("Session refreshed.")
            localStorage.setItem("sessionToken", btoa(result.sessionToken));
            return true;
        } else if (response.status === 403) {
            console.error(response.message);
            console.log("Your session is invalid or has expired. Try logging in again, please.")
            localStorage.removeItem("refreshToken");
            return false;
        }
    } catch (error) {
        data.code = -1
        data.message = "Error connecting to the server!"
        console.error('Error:', error);
        return(data);
    }
}

export async function isSessionValid() {
    const sessionToken = atob(localStorage.getItem("sessionToken"));

    const response = await fetch('https://oirf.online/app/api/user?fields=username', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${sessionToken}`},
    });

    if (response.status === 200)
        return true;

    return refreshSession();
}

export async function logout() {
    if (!isSessionValid())
        return;

    const sessionToken = atob(localStorage.getItem("sessionToken"));
    const refreshToken = atob(localStorage.getItem("refreshToken"));

    const response = await fetch('https://oirf.online/app/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${sessionToken}`, 'X-Refresh-Token': `${refreshToken}` },
    });

    if (response.status === 200) {
        alert("You logged out.")
        localStorage.removeItem("sessionToken");
        localStorage.removeItem("refreshToken");
    }
}

