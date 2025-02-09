import React from "react";

const QuizRules = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md border-l-4 border-[#158e8c]">
      <h2 className="text-2xl font-bold text-[#158e8c] flex items-center gap-2">
        📜 Quiz Rules
      </h2>
      <ul className="mt-4 space-y-3 text-gray-700">
        <li className="flex items-start gap-2">
          ✅ <span>You have limited time for each question.</span>
        </li>
        <li className="flex items-start gap-2">
          ✅ <span>Each correct answer awards you points.</span>
        </li>
        <li className="flex items-start gap-2">
          ❌ <span>No second attempts for a question.</span>
        </li>
        <li className="flex items-start gap-2">
          ⏩ <span>Skipping a question won’t deduct points.</span>
        </li>
        <li className="flex items-start gap-2">
          📖 <span>Check detailed answers after answering.</span>
        </li>
      </ul>
    </div>
  );
};

export default QuizRules;
