const initApp = async () => { };


export const updateWalletInfo = async () => {

    try {
        const response = await fetch('http://localhost:3000/api/v1/wallet/info', {
            method: 'GET',
            headers: {

            }
        })
        const result = await response.json();

        if (response.ok) {
            const walletAddress = document.getElementById('walletAdress');
            const walletBalance = document.getElementById('walletBalanse')

            if (walletAddress) {
                walletAddress.textContent = result.data.adress.substring(0, 20) + '...';
            }
        }

    } catch (error) {

    }

}














document.addEventListener('DOMContentLoaded', initApp)