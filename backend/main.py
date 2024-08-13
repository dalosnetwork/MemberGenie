from fastapi import FastAPI, HTTPException, Request
import uvicorn

from Controller import Controller

controller = Controller()

app = FastAPI()

@app.get("/is_payed")
def is_payed(walletAddress: str):
    result = controller.is_payed(walletAddress)

    return {"data": result}

@app.post("/payment_done")
async def payment_done(request: Request):
    body = await request.json()
    walletAddress = body.get("walletAddress")

    if not walletAddress:
        raise HTTPException(status_code=400, detail="walletAddress is required")

    result = Controller.payment_done(walletAddress)

    if result:
        return {"message": "Payment status updated successfully"}
    else:
        raise HTTPException(status_code=400, detail="Failed to update payment status")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=4125)
