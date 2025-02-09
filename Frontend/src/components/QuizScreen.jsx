import React from "react";

const QuizScreen = ({
  question,
  selectedAnswer,
  answerStatus,
  handleOptionSelect,
  currentIndex,
  totalQuestions,
  navigateQuestion,
  timer,
  isLocked,
}) => (
  <div className="flex flex-col justify-between h-full">
    
    <div className="text-white font-semibold flex flex-col items-center justify-center text-center rounded-lg px-6 h-32">
      <span className="text-[clamp(1.8rem, 3vw, 2.6rem)] leading-snug break-words whitespace-normal overflow-visible">
        {question.description}
      </span>
    </div>

    
    <div className="text-[#2b275d] p-5 mt-4 flex flex-col items-center space-y-3">
      {question.options.map((option, index) => (
        <button
          key={index}
          className={`text-lg font-medium w-80 h-12 rounded-full shadow-lg transition-all duration-300 
            ${selectedAnswer === option.description ? (answerStatus ? "bg-green-500 text-white" : "bg-red-500 text-white") : "bg-white hover:bg-gray-300"}
            ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => handleOptionSelect(option)}
          disabled={isLocked}
        >
          {option.description}
        </button>
      ))}
    </div>

   
    <div className="flex justify-center mt-6 px-8">
      <button
        className="text-white text-xl font-bold bg-yellow-500 px-4 py-1 rounded-lg shadow-md hover:bg-yellow-600"
        onClick={() => navigateQuestion("next")}
        
      >
        Skip Question ▶▶
      </button>
    </div>
  </div>
);

export default QuizScreen;
