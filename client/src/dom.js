export const generateWalletInfo = (wallet) => {
    const walletInfoDetails = document.querySelector('#walletInfo');

    if (!walletInfoDetails) {
        console.error('walletInfo container not found in DOM');
        return;
    }

    if (!wallet || !wallet.address || wallet.balance == null) {
        walletInfoDetails.innerHTML = '<p>Plånboksinformation kunde inte visas.</p>';
        return;
    }

    walletInfoDetails.innerHTML = `
  <div class="wallet-info">
    <p><strong>Adress:</strong> <small>${wallet.address}</small></p>
    <p><strong>Saldo:</strong> <small id="walletBalance">${wallet.balance}</small></p>
  </div>
`;
};
export const updateWalletBalance = (balance) => {
    const balanceElem = document.querySelector('#walletBalance');
    if (balanceElem) {
        balanceElem.textContent = balance;
    } else {
        console.warn('Balance element not found in DOM');
    }
};