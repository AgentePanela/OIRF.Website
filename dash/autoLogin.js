console.log("AutoLogin module enabled!")
//this make login using localstorage data
export async function autoLogin() {
    const logged = localStorage.getItem("logged") // is logged (can be true or false), just for control the localstorage
    const username = localStorage.getItem("username");
    const password = atob(localStorage.getItem("password"));

    if(!logged) {
        const data = JSON.stringify({"code": 0, "message": "Dont have a account logged!"})
        return(data);
    }
    try {
        const response = await fetch('https://oirf.online/app/api/validate-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (response.status === 200) {
            data.code = 200
            console.log("sucess!");
            return(data);
        } else if (response.status === 400) {
            data.code = 400
            console.error(data.message);
            return(data);
        }
    } catch (error) {
        data.code = -1
        data.message = "Error connecting to the server!"
        console.error('Error:', error);
        return(data);
    }
}

export function logoutAccount(){
    localStorage.removeItem("logged");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    location.reload();
}