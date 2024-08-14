from SQL import SQL
from Blockchain import Blockchain

Blockchain = Blockchain()
SQL = SQL()

class Controller():
    def is_payed(self, walletAddress):
        result = SQL.is_payed(walletAddress)

        return result

    def payment_done(self, walletAddress):
        addPayed = Blockchain.add_payed(walletAddress)
        
        if addPayed:
            result = SQL.payment_done(walletAddress)

            return result
        else:
            return False