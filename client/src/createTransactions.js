
const form = document.getElementById('transactions');
const recipient = document.querySelector('#recipient');
const amount = document.querySelector('#amount');
const btn = document.querySelector('#listAllTransactions')
const mineBtn = document.querySelector('#mineTransactions')
const initApp = () => {
    const token = localStorage.getItem('jwt');
    if (!token) {
        alert('du måste logga in!!');
        location.href = './login.html';
    }
};

const addTransaction = async (transaction) => {
    const token = localStorage.getItem('jwt');

    try {
        const response = await fetch('http://localhost:3000/api/v1/wallet/transactions', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transaction),
        });

        const data = await response.json();

        return {
            ok: response.ok,
            data,
        };

    } catch (error) {
        throw new Error('Något blev galet');
    }
};

const listAllTransactions = async () => {
    const token = localStorage.getItem('jwt');

    try {
        const response = await fetch('http://localhost:3000/api/v1/wallet/transactions', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        });

        const data = await response.json();
        console.log(data)

        return {
            ok: response.ok,
            data,
        };


    } catch (error) {
        throw new Error('Något blev galet');
    }

}

const mineTransactions = async () => {
    const token = localStorage.getItem('jwt');

    try {
        const response = await fetch('http://localhost:3000/api/v1/wallet/transactions/mine', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        });

        const data = await response.json();
        console.log(data)

        return {
            ok: response.ok,
            data,
        };


    } catch (error) {
        throw new Error('Något blev galet');
    }
}

const handleCreateTransaction = async (e) => {
    e.preventDefault();

    const transaction = {
        recipient: recipient.value.trim(),
        amount: amount.value,
    };


    if (!transaction.recipient || isNaN(transaction.amount)) {
        alert('Please enter a valid recipient and amount.');
        return;
    }

    try {
        const result = await addTransaction(transaction);

        if (result.ok) {
            console.log('Transaction successful:', result.data);
            alert('Transaction successful!');
            form.reset();
        }
    } catch (error) {
        console.error('Error:', error.message);
        alert('Something went wrong. Please try again.');
    }
};

document.addEventListener('DOMContentLoaded', initApp);
form.addEventListener('submit', handleCreateTransaction);
btn.addEventListener('click', listAllTransactions)
mineBtn.addEventListener('click', mineTransactions)