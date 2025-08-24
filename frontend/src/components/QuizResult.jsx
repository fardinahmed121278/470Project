import React from "react";
import "./PopQuiz.css";

export default function QuizResult({ score, total }) {
  return (
    <div className="quiz-result">
      <h3>🎉 Quiz Result</h3>
      <p>
        You scored {score} out of {total}
      </p>
      <p>
        {score === total
          ? "Excellent! 🌟"
          : score > total / 2
          ? "Good job! 👍"
          : "Keep learning! 📚"}
      </p>
    </div>
  );
}
