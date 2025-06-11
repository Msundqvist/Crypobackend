import { transactionPool, wallet, server, blockchain } from '../server.mjs'
import AppError from '../models/error/appError.mjs'
import Miner from '../models/miner/Miner.mjs';
import Wallet from '../models/wallet/Wallet.mjs';

export default class TransactionRepository {

    async add() {
        /*  const { amount, recipient } = req.body;
          let transaction = transactionPool.transactionExists({
              address: wallet.publicKey,
          });
          if (transaction) {
              transaction.update({ sender: wallet, recipient, amount });
          } else {
              transaction = wallet.createTransaction({ recipient, amount });
          }
  
          transactionPool.addTransaction(transaction);
  
          return await transaction;*/
    }

    async getWallet(adress, balance) {

    }
    async list() {

    }

    async mineTransaction() {

    }



}