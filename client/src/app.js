const form = document.getElementById('login')
const userEmail = document.querySelector('#username')
const userPassword = document.querySelector('#password')
const btn = document.querySelector('#createNewUser')

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
            localStorage.setItem('jwt', result.data.token);
            location.href = './blockchainTransactions.html';
        } else {
            const errorData = await response.json();
            console.error('Login failed:', errorData.message || response.statusText);
            alert('Login failed. Please check your email and password.');
        }
    } catch (error) {
        console.error(error);
    }
}

const createUserForm = async () => {
    location.href = './createUser.html'
}


document.addEventListener('DOMContentLoaded', initApp)
form.addEventListener('submit', loginUser)
btn.addEventListener('click', createUserForm)

