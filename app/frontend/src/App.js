import "./App.css";
import Login from "./login";
import Dashboard from "./pages/dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import CodeEditor from "./pages/codeeditor";
import AdminPanel from "./pages/AdminPanel";
import LoginPage from "./pages/loginPage";
import SmartChat from "./pages/smartchat";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editor" element={<CodeEditor />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/smartchat" element={<SmartChat />} />
      </Routes>
    </Router>
  );
}

export default App;
