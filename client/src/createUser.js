const userForm = document.getElementById('newUserForm')
const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const email = document.querySelector('#email')
const role = document.querySelector('#role')
const password = document.querySelector('#password')


const initApp = async () => {

}



const createNewUser = async (e) => {
    e.preventDefault();

    try {
        const newUser = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            role: role.value,
            password: password.value
        }
        const response = await fetch('http://localhost:3000/api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('du lyckades skapa en användare', result)
            localStorage.setItem('user', result.data.token)
            alert('grattis du har skapat en ny användare')
            location.href = './loginUser.html'

        } else {
            const errorData = await response.json()
            console.error('did not create a user', errorData.message || response.statusText);
            alert('didnt create new user')
        }

    } catch (error) {
        console.error(error)
    }
}











document.addEventListener('DOMContentLoaded', initApp)
userForm.addEventListener('submit', createNewUser)