
const form = document.getElementById('transactions')
const recipient = document.querySelector('#recipient')
const amount = document.querySelector('#amount')

const initApp = async () => {

}

const addtransaction = async (transaction) => {
    //console.log(booking);

    const response = await fetch('http://localhost:3000/api/v1/wallet/transactions', { method: 'POST', body: transaction });
    console.log(response);
    const data = await response.json();
    //console.log(data);
    if (data) {
        console.log(data);
        return data;
    }
};


const handleCreateTransaction = async (e) => {

    e.preventDefault();
    const formData = new FormData(e.target)
    try {

        const response = await addtransaction(formData)
        if (response.ok) {
            const result = await response.json(formData)
            console.log(result.data)
        }
        console.log(result.data)
    } catch (error) {
        console.error('du har som vanligt gjort fel'
        )
    }
}




document.addEventListener('DOMContentLoaded', initApp)
form.addEventListener('submit', handleCreateTransaction)