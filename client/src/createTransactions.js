
const createTransForm = document.querySelector('#transaction')
const recipient = document.querySelector('#recipient')
const amount = document.querySelector('#amount')

const initApp = async () => {

}



const handleCreateTransaction = async (e) => {
    e.preventDefault();
    try {
        const transactions = {
            recipient: recipient.value,
            amount: amount.value

        }
        const response = await fetch('http://localhost:3000/api/wallet/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',

            },
            body: JSON.stringify(transactions)
        }
        )
        if (response.ok) {
            const result = await response.json()
            console.log(result)
        }
    } catch (error) {
        console.error('du har som vanligt gjort fel'
        )
    }
}




document.addEventListener('DOMContentLoaded', initApp)
createTransForm.addEventListener('submit', handleCreateTransaction)