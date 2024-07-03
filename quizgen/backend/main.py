from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from llm import generate_trivia_questions
 
questions=generate_trivia_questions()
app = FastAPI()

# Allow all origins to access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    global questions
    return questions

@app.get("/questions")
def read_questions():
    global questions
    questions=generate_trivia_questions()
    return questions
