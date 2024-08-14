from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from Controller import Controller

controller = Controller()

app = FastAPI()

# CORS ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Belirli bir liste ile sınırlandırabilirsiniz: ["http://example.com"]
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST gibi belirli HTTP metodlarını da belirtebilirsiniz
    allow_headers=["*"],  # Belirli başlıkları izin vermek için sınırlandırabilirsiniz
)

@app.get("/is_payed")
def is_payed(walletAddress: str):
    result = controller.is_payed(walletAddress)
    print(result)
    return {"data": result}

@app.post("/payment_done")
async def payment_done(request: Request):
    body = await request.json()
    walletAddress = body.get("walletAddress")

    if not walletAddress:
        raise HTTPException(status_code=400, detail="walletAddress is required")

    result = controller.payment_done(walletAddress)

    if result:
        return {"message": "Payment status updated successfully"}
    else:
        raise HTTPException(status_code=400, detail="Failed to update payment status")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=4125)
