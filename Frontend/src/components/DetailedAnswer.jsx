import React from "react";

const DetailedAnswer = ({ question, correctAnswer, explanation, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative animate-fadeIn">
        
        <button 
          className="absolute top-2 right-3 text-gray-600 hover:text-gray-900 text-xl"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold text-[#2b275d] text-center mb-4">🧠 Question Review</h2>
        <p className="text-md text-gray-700 text-center mb-6">{question}</p>

        <div className="bg-green-100 text-green-800 p-4 rounded-lg text-lg font-semibold shadow-md text-center">
          ✅ Correct Answer: <span className="font-bold">{correctAnswer}</span>
        </div>

        <div className="mt-6 p-4 bg-gray-100 rounded-lg text-gray-700 text-sm shadow">
          <h3 className="font-semibold text-gray-800 mb-2">📖 Explanation:</h3>
          <p>{explanation}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailedAnswer;


