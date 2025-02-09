import React from "react";
import QuizRules from "./QuizRules";

const StartScreen = ({ setStart }) => (
  <div className="min-h-screen flex flex-col mt-10 bg-white p-6">
    
    
    <div className="w-full max-w-4xl text-center mb-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#158e8c]">
        Welcome to the TestLine Quiz! 🧬
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mt-3">
      Challenge yourself with exciting questions on genetics & evolution. Unlock new insights and prove your expertise!      </p>
    </div>

    <div className="w-full max-w-4xl bg-[#158e8c] text-white shadow-lg rounded-2xl p-10 flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
      
      <div className="md:w-1/2 text-center space-y-4">
        <h2 className="text-3xl font-bold">Ready to Test Your Knowledge? 🎯</h2>
        <p className="text-lg text-gray-200">
        Explore the wonders of DNA, evolution, and inheritance. Answer thought-provoking questions and learn as you go!
        </p>
        <button
          className="px-6 py-3 bg-white text-[#158e8c] text-lg font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300"
          onClick={() => setStart(true)}
        >
          Start the Quiz 🚀
        </button>
      </div>

      
      <div className="">
        <QuizRules />
      </div>
    </div>
  </div>
);

export default StartScreen;
