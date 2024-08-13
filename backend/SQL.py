import sqlite3

class SQL():
    def __init__(self):
        conn = sqlite3.connect('managenie.db')
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS is_payed (
                walletAddress TEXT PRIMARY KEY,
                payed INT
            )
        ''')
        conn.commit()
        conn.close()

    def is_payed(self, walletAddress):
        conn = sqlite3.connect('payments.db')
        cursor = conn.cursor()
        cursor.execute("SELECT payed FROM is_payed WHERE walletAddress = ?", (walletAddress,))
        result = cursor.fetchone()
        conn.close()

        if result is None:
            return False
        elif result[0] == 0:
            return False
        elif result[0] == 1:
            return True
        else:
            return False

    def payment_done(self, walletAddress):
        conn = sqlite3.connect('managenie.db')
        cursor = conn.cursor()

        cursor.execute("UPDATE is_payed SET payed = 1 WHERE walletAddress = ?", (walletAddress,))
        conn.commit()

        if cursor.rowcount > 0:
            conn.close()
            return True
        else:
            conn.close()
            return False