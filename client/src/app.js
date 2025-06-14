const form = document.getElementById(loginUserForm)
const userEmail = document.getElementById(userName)
const userPassword = document.getElementById(password)

const initApp = async () => {
}

const loginUser = async (e) => {

    e.preventDefault();
    try {
        const user = {
            email: userName.value,
            password: password.value
        }

        const response = await fetch('http://localhost:3000/api/v1/auth', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

                body: JSON.stringify(user)
            }

        })

        if (response.ok) {
            const result = await response.json();
            console.log(result)
        }

    } catch (error) {
        console.error(error);
    }




}


document.addEventListener('DOMContentLoaded', initApp)
form.addEventListener('submit', loginUser)