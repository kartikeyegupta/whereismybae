'use client';
import { useState } from "react";

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      question: "1. What is the most common stress factor for college students?",
      options: ["Academic pressure", "Financial concerns", "Social life", "Time management"]
    },
    {
      question: "2. How many hours does the average college student sleep per night?",
      options: ["6-7 hours", "7-8 hours", "5-6 hours", "8-9 hours"]
    },
    {
      question: "3. What percentage of college students work while studying?",
      options: ["43%", "67%", "81%", "52%"]
    },
    {
      question: "4. What is the most popular major among college students?",
      options: ["Business", "Psychology", "Engineering", "Computer Science"]
    },
    {
      question: "5. What percentage of college students live on campus?",
      options: ["48%", "35%", "22%", "15%"]
    }
  ];

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen p-8 flex justify-center items-center bg-black">
      <main className="max-w-2xl w-full bg-gray-900 rounded-lg shadow-lg p-8 border border-pink-500/20">
        <h1 className="text-3xl font-bold mb-12 text-center text-pink-500">
          College Student Quiz
        </h1>
        
        <div className="relative min-h-[400px] flex flex-col justify-between">
          <div className="space-y-6 animate-fadeIn">
            <p className="font-medium mb-6 text-xl text-white">
              {questions[currentQuestion].question}
            </p>
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <label 
                  key={index} 
                  className="flex items-center p-4 border border-pink-500/20 rounded-lg hover:bg-pink-500/10 transition-all cursor-pointer group"
                >
                  <input 
                    type="radio" 
                    name={`q${currentQuestion}`} 
                    className="mr-3 accent-pink-500"
                  />
                  <span className="text-white group-hover:text-pink-500 transition-colors">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-8 pt-6 border-t border-pink-500/20">
            <button 
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className="px-6 py-2 rounded-lg bg-gray-800 text-white hover:bg-pink-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {currentQuestion === questions.length - 1 ? (
              <button 
                type="submit" 
                className="px-6 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition-colors"
              >
                Submit Quiz
              </button>
            ) : (
              <button 
                onClick={nextQuestion}
                className="px-6 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
