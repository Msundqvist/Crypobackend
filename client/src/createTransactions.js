
import { URL } from './config/api.js';
import { generateWalletInfo, updateWalletBalance } from './dom.js';
const form = document.getElementById('transactions');
const recipient = document.querySelector('#recipient');
const amount = document.querySelector('#amount');
const btn = document.querySelector('#listAllTransactions');
const mineBtn = document.querySelector('#mineTransactions');
const addBlockBtn = document.querySelector('#addBlock');
const listBlockBtn = document.querySelector('#listBlocks')


const initApp = async () => {
    const token = localStorage.getItem('jwt');
    if (!token) {
        alert('Du måste logga in!');
        location.href = './login.html';
        return;
    }

    await updateWalletInfo();

};

const addTransaction = async (transaction) => {
    const token = localStorage.getItem('jwt');

    try {
        const response = await fetch(`${URL}wallet/transactions`, {
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

const addBlock = async (block) => {
    const token = localStorage.getItem('jwt');

    try {
        const response = await fetch(`${URL}blocks/mine`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(block),
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
        const response = await fetch(`${URL}wallet/transactions`, {
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
const listAllBlocks = async () => {
    const token = localStorage.getItem('jwt');

    try {
        const response = await fetch(`${URL}blocks`, {
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


const updateWalletInfo = async () => {
    const token = localStorage.getItem('jwt');

    try {
        const response = await fetch(`${URL}wallet/info`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        });

        const json = await response.json();

        if (response.ok && json.success) {
            const wallet = json.data;
            generateWalletInfo(wallet);
            return wallet;
        } else {
            console.error('Could not fetch wallet info:', json);
        }
    } catch (error) {
        console.error('Error fetching wallet info:', error);
    }
};

const mineTransactions = async () => {
    const token = localStorage.getItem('jwt');

    try {
        const response = await fetch(`${URL}wallet/transactions/mine`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        });

        const data = await response.json();
        console.log(data)
        if (response.ok) {
            await updateWalletInfo();
        }

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
            if (result.data.newBalance) {
                updateWalletBalance(result.data.newBalance);
            } else {
                await updateWalletInfo();
            }
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
addBlockBtn.addEventListener('click', addBlock)
listBlockBtn.addEventListener('click', listAllBlocks)
