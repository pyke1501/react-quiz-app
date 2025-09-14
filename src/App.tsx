import { Navigate, Route, Routes } from "react-router"
import Dashboard from "./pages/dashboard"
import Question from "./pages/question"
import FinalScore from "./pages/final-score"
import Leaderboard from "./pages/leaderboard"
import Template from "./layouts/Template"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Template><Dashboard /></Template>} />
        <Route path="/question" element={<Template><Question /></Template>} />
        <Route path="/final-score" element={<Template><FinalScore /></Template>} />
        <Route path="/leaderboard" element={<Template><Leaderboard /></Template>} />
      </Routes>
    </>
  )
}

export default App
