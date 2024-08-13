from SQL import SQL

SQL = SQL()

class Controller():
    def is_payed(self, walletAddress):
        result = SQL.is_payed(walletAddress)

        return result

    def payment_done(self, walletAddress):
        result = SQL.payment_done(walletAddress)

        return result