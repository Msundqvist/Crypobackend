const form = document.getElementById('login')
const userEmail = document.querySelector('#username')
const userPassword = document.querySelector('#password')


const initApp = async () => {
}

const loginUser = async (e) => {

    e.preventDefault();
    try {
        const user = {
            email: username.value,
            password: password.value
        }

        const response = await fetch('http://localhost:3000/api/v1/auth', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)

        })

        if (response.ok) {
            const result = await response.json();
            console.log(result)
            localStorage.setItem('jwt', result.data.token)
        }
          location.href = './blockchainTransactions.html'

    } catch (error) {
        console.error(error);
    }
}


document.addEventListener('DOMContentLoaded', initApp)
form.addEventListener('submit', loginUser)