"use client";

import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const inter = Inter({ weight: "700", subsets: ["latin"] });
const inter1 = Inter({ weight: "300", subsets: ["latin"] });

export default function Maincontent() {
  const [data, setData] = useState({
    question: ["What is the maximum amount offered by Baroda Agri Gold Loan?"],
    options: [["2 lakhs", "5 lakhs", "10 lakhs", "50 lakhs"]],
    correct_answer: ["50 lakhs"],
  });

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAnswerOptionClick = (option) => {
    setShowAnswer(true);

    if (option === data.correct_answer[currentQuestion]) {
      setScore(score + 1);
    }

    setTimeout(() => {
      handleNextQuestion();
    }, 5000); // 5 seconds timeout
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < data.question.length) {
      setCurrentQuestion(nextQuestion);
      setShowAnswer(false);
    } else {
      setShowScore(true);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000); // Show confetti for 5 seconds
    }
  };

  return (
    <div className="text-black bg-white p-4 min-h-screen flex flex-col items-center">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <div className="bg-white flex flex-col items-center rounded-xl shadow-indigo-500 shadow-2xl p-6 w-1/2">
        <span className="text-center text-3xl flex flex-row p-1">
          <span style={inter.style} className="">
            Enter the Quiz Mania
          </span>
        </span>
        <span className="text-center text-xl flex flex-row p-2.5 border-b-4">
          <span style={inter1.style} className="font-thin">
            Question No {currentQuestion + 1}
          </span>
        </span>

        {showScore ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold">
              You scored {score} out of {data.question.length}
            </h1>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <h1 className="text-2xl font-bold mb-4">
                {data.question[currentQuestion]}
              </h1>
              {data.options[currentQuestion].map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswerOptionClick(option)}
                  className="w-full p-2 mb-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  {option}
                </button>
              ))}
            </div>
            {showAnswer && (
              <div className="mb-4">
                <p className="text-xl">
                  Correct Answer: {data.correct_answer[currentQuestion]}
                </p>
                <button
                  onClick={handleNextQuestion}
                  className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-700"
                >
                  Next Question
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
