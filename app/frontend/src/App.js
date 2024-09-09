import "./App.css";
import Login from "./login";
import Dashboard from "./pages/dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import CodeEditor from "./pages/codeeditor";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editor" element={<CodeEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
