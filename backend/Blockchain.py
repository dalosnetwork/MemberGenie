import os
from web3 import Web3

class Blockchain:
    def __init__(self):
        # Ortam değişkenlerinden bilgileri alıyoruz
        self.wallet_address = os.getenv('WALLET_ADDRESS', '0xE1bBA68d94f7Bd1aD4e360830A03Dce78bD4B536')
        self.contract_address = os.getenv('CONTRACT_ADDRESS', '0x8c0C5af8a0Ef0550B3C6ad4C1F7Bc6D86F1b506A')
        self.private_key = os.getenv('PRIVATE_KEY', 'eeda054b61ca069725b61dd56004bb08b0f90ae6ccfc1a85b75e69bfa58b77f1')
        
        # Web3 bağlantısını kuruyoruz
        self.web3 = Web3(Web3.HTTPProvider('https://sepolia-rollup.arbitrum.io/rpc'))

    def add_payed(self, systemWallet):
        try:
            # Kontratın ABI'si
            contract_abi = [
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_systemWallet",
                            "type": "address"
                        }
                    ],
                    "name": "addPayedWallet",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }
            ]

            # Kontrat örneği oluşturun
            contract = self.web3.eth.contract(address=self.contract_address, abi=contract_abi)

            # Nonce alın (bu, cüzdan adresinizin yaptığı işlem sayısıdır)
            nonce = self.web3.eth.get_transaction_count(self.wallet_address)

            # addPayedWallet fonksiyonu için işlem oluşturun
            transaction = contract.functions.addPayedWallet(systemWallet).build_transaction({
                'chainId': 421614,  # Arbitrum Sepolia Testnet için chainId 42170
                'gas': 3000000,
                'gasPrice': self.web3.to_wei('5', 'gwei'),  # Gas price, test ağları için düşük tutun
                'nonce': nonce,
            })

            # İşlemi imzalayın
            signed_txn = self.web3.eth.account.sign_transaction(transaction, private_key=self.private_key)

            # İşlemi gönderin
            tx_hash = self.web3.eth.send_raw_transaction(signed_txn.rawTransaction)

            # İşlemin tamamlanmasını bekleyin
            receipt = self.web3.eth.wait_for_transaction_receipt(tx_hash)

            return True if receipt['status'] == 1 else False
        except Exception as e:
            print(f'Error occurred: {e}')
            return False