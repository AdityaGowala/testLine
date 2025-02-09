import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import QuizLayout from "./components/QuizLayout";
import QuizProgress from "./components/Quizprogress";
import QuizRules from "./components/QuizRules"; 

const App = () => {
  const [isStart, setStart] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [solved, setSolved] = useState(0);
  const [missed, setMissed] = useState(0);
  const [skipped, setSkipped] = useState(0);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch("http://localhost:2000/api/data");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Quiz data received:", data); 
        if (!data || !Array.isArray(data.questions)) {
          throw new Error("Invalid data format: Missing 'questions' array.");
        }
        setQuizData(data.questions);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizData();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>

              <div className="flex flex-wrap justify-center items-start mt-4 gap-10">
                {error ? (
                  <div className="text-red-600 text-xl font-semibold">{error}</div>
                ) : loading ? (
                  <span className="loading loading-spinner loading-lg"></span>
                ) : (
                  quizData.length > 0 && (
                    <QuizLayout
                      isStart={isStart}
                      setStart={setStart}
                      quizData={quizData}
                      setSolved={setSolved}
                      setMissed={setMissed}
                      setSkipped={setSkipped}
                    />
                  )
                )}

                <div className="flex flex-col items-center gap-6">
                  {isStart && <QuizRules />}
                  {isStart && <QuizProgress solved={solved} total={quizData.length} missed={missed} skipped={skipped} />}
                </div>
              </div>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
