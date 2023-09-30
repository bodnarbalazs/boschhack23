from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import logic

app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/getinfo")
def get_info():
    chuncks = logic.get_map_chuncks()
    
    

    return {
        "ChunckMap": chuncks
    }

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
