from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend (port 3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to frontend URL in production
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Backend is up and running!"}

@app.post("/analyze/")
async def analyze_log(file: UploadFile = File(...)):
    content = await file.read()
    # Simple dummy "analysis"
    num_lines = len(content.decode().splitlines())
    return {"filename": file.filename, "lines": num_lines, "message": "Log analyzed successfully"}
