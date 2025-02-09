import React, { useState, useEffect } from "react";
import DetailedAnswer from "./DetailedAnswer";
import StartScreen from "./StartScreen";
import QuizScreen from "./QuizScreen";
import QuizEndPopup from "./QuizEndPopup";

const QuizLayout = ({ isStart, setStart, quizData, setSolved, setMissed, setSkipped }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [answerStatus, setAnswerStatus] = useState({});
  const [timers, setTimers] = useState({ 0: 15 });
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [lockedQuestions, setLockedQuestions] = useState({});
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [missedRecorded, setMissedRecorded] = useState({});

  if (!quizData || quizData.length === 0) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  const currentQuestion = quizData[currentQuestionIndex];

  useEffect(() => {
    console.log("Current Index:", currentQuestionIndex);
    if (isQuizCompleted) {
      console.log("🎉 Quiz is completed! Showing end screen...");
    }
  }, [isQuizCompleted, currentQuestionIndex]);

  useEffect(() => {
    if (isStart && timers[currentQuestionIndex] === undefined) {
      setTimers((prev) => ({ ...prev, [currentQuestionIndex]: 15 }));
      setIsTimerRunning(true);
    }
  }, [isStart, currentQuestionIndex]);

  useEffect(() => {
    if (isTimerRunning && timers[currentQuestionIndex] > 0) {
      const countdown = setTimeout(() => {
        setTimers((prev) => ({
          ...prev,
          [currentQuestionIndex]: prev[currentQuestionIndex] - 1,
        }));
      }, 1000);
      return () => clearTimeout(countdown);
    }

    if (timers[currentQuestionIndex] === 0 && !isQuizCompleted) {
      if (!selectedAnswers[currentQuestionIndex] && !missedRecorded[currentQuestionIndex]) {
        setMissed((prev) => prev + 1);
        setMissedRecorded((prev) => ({ ...prev, [currentQuestionIndex]: true }));
      }
      setShowAnswer(true);
      setIsTimerRunning(false);
      setLockedQuestions((prev) => ({ ...prev, [currentQuestionIndex]: true }));
    }
  }, [timers, isTimerRunning, currentQuestionIndex, selectedAnswers, missedRecorded, isQuizCompleted]);

  const handleOptionSelect = (option) => {
    if (lockedQuestions[currentQuestionIndex]) return;

    setSelectedAnswers((prev) => ({ ...prev, [currentQuestionIndex]: option.description }));

    const correctOption = currentQuestion.options.find((opt) => opt.is_correct);
    if (!correctOption) return;

    const isCorrect = option.description === correctOption.description;
    setAnswerStatus((prev) => ({ ...prev, [currentQuestionIndex]: isCorrect }));

    if (isCorrect) {
      setSolved((prev) => prev + 1);
    } else {
      setMissed((prev) => prev + 1);
    }

    setMissedRecorded((prev) => ({ ...prev, [currentQuestionIndex]: true }));
    setIsTimerRunning(false);
    setLockedQuestions((prev) => ({ ...prev, [currentQuestionIndex]: true }));
    setShowAnswer(true);
  };

  const navigateNext = () => {
    console.log('🚀 navigateNext() triggered');
    console.log('Current Index:', currentQuestionIndex);
    console.log('Total Questions:', quizData.length);

    if (isQuizCompleted) {
        console.log('Quiz is already completed!');
        return;
    }

    if (
        !selectedAnswers[currentQuestionIndex] &&
        !missedRecorded[currentQuestionIndex]
    ) {
        setSkipped((prev) => prev + 1);
        setMissedRecorded((prev) => ({
            ...prev,
            [currentQuestionIndex]: true,
        }));
        setShowAnswer(true);
    } else {
        setShowAnswer(false);

    }

    if (currentQuestionIndex === quizData.length - 1) {
        // This will trigger quiz completion
        //console.log("🎉 Quiz completed! Showing end screen...");
        //setIsQuizCompleted(true);
    } else {
        //setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setIsTimerRunning(true);
    }
};
  

  const restartQuiz = () => {
    console.log("🔄 Restarting Quiz...");
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setAnswerStatus({});
    setTimers({ 0: 15 });
    setIsTimerRunning(false);
    setShowAnswer(false);
    setLockedQuestions({});
    setIsQuizCompleted(false);
    setStart(false);
    setSolved(0);
    setMissed(0);
    setSkipped(0);
    setMissedRecorded({});
  };

  return (
    <div className="">
      {!isStart ? (
        <div className="w-full flex justify-center">
        <StartScreen setStart={() => { setStart(true); setIsTimerRunning(true); }} />
      </div>
      ) : (
        <>
        <div className="bg-[#158e8c] h-auto w-[700px] mt-10 rounded-xl shadow-2xl flex flex-col p-6 relative">
          <div className="flex justify-between items-center px-4 mb-2">
            <div className="text-white text-xl font-bold bg-yellow-500 px-4 py-1 rounded-lg shadow-md">
              📊 Question {currentQuestionIndex + 1} / {quizData.length}
            </div>
            <div className="text-white text-xl font-bold bg-black/50 px-4 py-1 rounded-lg">
              ⏳ {timers[currentQuestionIndex] ?? 15}s
            </div>
          </div>
          <QuizScreen
            question={quizData[currentQuestionIndex]}
            selectedAnswer={selectedAnswers[currentQuestionIndex]}
            answerStatus={answerStatus[currentQuestionIndex]}
            handleOptionSelect={handleOptionSelect}
            currentIndex={currentQuestionIndex}
            totalQuestions={quizData.length}
            navigateQuestion={navigateNext}
            timer={timers[currentQuestionIndex] ?? 15}
            isLocked={lockedQuestions[currentQuestionIndex]}
          />
        </div>          
        </>
      )}

{showAnswer && (
                <DetailedAnswer
                    question={currentQuestion.question}
                    correctAnswer={
                        currentQuestion.options.find((opt) => opt.is_correct)
                            ?.description
                    }
                    explanation={
                        currentQuestion.explanation ||
                        'No explanation provided.'
                    }
                    onClose={() => {
                        setShowAnswer(false);

                        if (currentQuestionIndex >= quizData.length - 1) {
                            setIsQuizCompleted(true);
                        } else {
                            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                        }
                    }}
                />
            )}

      {isQuizCompleted && <QuizEndPopup
          restartQuiz={restartQuiz}
          solved={Object.values(answerStatus).filter((status) => status).length}
          missed={Object.values(answerStatus).filter((status) => status === false).length}
          skipped={Object.keys(missedRecorded).length - Object.keys(answerStatus).length}
          totalQuestions={quizData.length}
        />}
    </div>
  );
};

export default QuizLayout;
