import React, { useState } from "react";
import "./PopQuiz.css";

const questions = [
  { question: "Which planet is closest to the Sun?", options: ["Earth", "Mercury", "Venus", "Mars"], answer: "Mercury" },
  { question: "Which planet is known as the Red Planet?", options: ["Mars", "Jupiter", "Saturn", "Venus"], answer: "Mars" },
  { question: "Which planet has the strongest gravity in the solar system?", options: ["Earth", "Jupiter", "Neptune", "Saturn"], answer: "Jupiter" },
  { question: "Which planet is known for its rings?", options: ["Uranus", "Saturn", "Neptune", "Mars"], answer: "Saturn" },
  { question: "Which planet has the fastest rotation?", options: ["Jupiter", "Earth", "Mercury", "Venus"], answer: "Jupiter" },
  { question: "Which planet is farthest from the Sun?", options: ["Neptune", "Pluto", "Uranus", "Saturn"], answer: "Neptune" },
  { question: "Which planet is known as the Earth's twin?", options: ["Venus", "Mars", "Mercury", "Jupiter"], answer: "Venus" },
  { question: "Which planet has the largest number of moons?", options: ["Saturn", "Jupiter", "Neptune", "Mars"], answer: "Saturn" },
  { question: "Which planet has a Great Red Spot?", options: ["Mars", "Jupiter", "Venus", "Saturn"], answer: "Jupiter" },
  { question: "Which planet rotates on its side?", options: ["Uranus", "Neptune", "Saturn", "Earth"], answer: "Uranus" },
];

export default function PopQuiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (option) => {
    if (answered) return; // prevent multiple clicks
    setSelected(option);
    setAnswered(true);

    if (option === questions[current].answer) setScore(score + 1);

    // Move to next question after delay
    setTimeout(() => {
      setSelected(null);
      setAnswered(false);
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        setShowResult(true);
      }
    }, 1000); // 1s delay to show feedback
  };

  return (
    <div className="quiz-container">
      {!showResult ? (
        <div className="quiz-card">
          <h2>Question {current + 1} of {questions.length}</h2>
          <p className="question">{questions[current].question}</p>
          <div className="options">
            {questions[current].options.map((opt) => {
              let className = "";
              if (answered) {
                if (opt === questions[current].answer) className = "correct";
                else if (opt === selected) className = "wrong";
              }
              return (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  className={className}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="result-card">
          <h2>Quiz Completed!</h2>
          <p>You scored {score} out of {questions.length}</p>
        </div>
      )}
    </div>
  );
}
