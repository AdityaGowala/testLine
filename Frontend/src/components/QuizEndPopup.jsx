import React from "react";

const QuizEndPopup = ({ restartQuiz, solved, missed, skipped, totalQuestions }) => {
  const points = solved * 10; // Points calculation

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="card w-96 bg-base-100 shadow-2xl border border-gray-200 p-6 text-center">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-[#158e8c] flex items-center justify-center gap-2">
          🎉 Quiz Completed!
        </h2>
        <p className="text-gray-500 mt-2 text-lg">Here’s your performance summary:</p>

        {/* Performance Stats */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="stat bg-green-100 text-green-700 p-3 rounded-lg shadow">
            <span className="text-xl font-semibold">✔ {solved}</span>
            <p className="text-sm">Correct</p>
          </div>
          <div className="stat bg-red-100 text-red-700 p-3 rounded-lg shadow">
            <span className="text-xl font-semibold">❌ {missed}</span>
            <p className="text-sm">Missed</p>
          </div>
          <div className="stat bg-yellow-100 text-yellow-700 p-3 rounded-lg shadow">
            <span className="text-xl font-semibold">⏭ {skipped}</span>
            <p className="text-sm">Skipped</p>
          </div>
        </div>

        <p className="mt-4 text-gray-600 font-medium">
          📊 Total Questions: <span className="font-semibold text-gray-800">{totalQuestions}</span>
        </p>

        <p className="mt-2 text-gray-700 text-lg font-semibold">
          🏆 Your Score: <span className="text-[#158e8c]">{points} points</span>
        </p>

        <div className="flex justify-center mt-6">
          <button 
            onClick={restartQuiz} 
            className="btn w-full text-lg font-semibold tracking-wide bg-[#158e8c] text-white hover:bg-[#127b78] transition"
          >
            🔄 Restart Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizEndPopup; 