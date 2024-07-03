from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_community.llms import Ollama

model = Ollama(model="llama3")
# Define your desired data structure.
class Question(BaseModel):
    question: list[str] = Field(description="5 trivia questions related to bank loan")
    options: list[list[str]] = Field(description="5 options for each trivia question related to bank loan")
    correct_answer: list[str] = Field(description="5 correct answers to the trivia question related to bank loan")

question_query = "tell ne a trivia question"

# Set up a parser + inject instructions into the prompt template.
parser = JsonOutputParser(pydantic_object=Question)

prompt = PromptTemplate(
    template="""Answer the user query.\n{format_instructions}\n{query}\n""",
    input_variables=["query"],
    partial_variables={"format_instructions": parser.get_format_instructions()},
)

chain = prompt | model | parser


# Function to generate trivia questions
def generate_trivia_questions():
    # Generate the output from the language model
    trivia_output = chain.invoke({"query": question_query})
    return trivia_output
