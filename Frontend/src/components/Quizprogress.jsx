import React from "react";

const QuizProgress = ({ solved, missed, skipped, total }) => {
  const points = solved * 10; 
  return (
    <div className="w-[380px] bg-white shadow-lg rounded-xl p-4 flex justify-between items-center border border-gray-200">

      <div className="flex flex-col gap-3 w-2/3">
        <div>
          <p className="text-green-700 font-semibold text-sm">✅ Solved</p>
          <progress className="progress progress-success w-full" value={solved} max={total}></progress>
          <p className="text-gray-700 text-sm">{solved}/{total}</p>
        </div>

        <div>
          <p className="text-red-600 font-semibold text-sm">❌ Missed</p>
          <progress className="progress progress-error w-full" value={missed} max={total}></progress>
          <p className="text-gray-700 text-sm">{missed}/{total}</p>
        </div>

        <div>
          <p className="text-yellow-600 font-semibold text-sm">⏭️ Skipped</p>
          <progress className="progress progress-warning w-full" value={skipped} max={total}></progress>
          <p className="text-gray-700 text-sm">{skipped}/{total}</p>
        </div>
      </div>


      <div className="text-center flex flex-col items-center">
        <p className="text-4xl font-bold text-[#2b275d]">{points}</p>
        <p className="text-sm font-semibold text-gray-600 uppercase">pts</p>
      </div>
    </div>
  );
};

export default QuizProgress;
