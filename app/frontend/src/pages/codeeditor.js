import React, { useState, useEffect } from "react";
import axios from "axios";
import Editor from "../components/Editor";
import Output from "../components/Output";
import LanguageSelector from "../components/LanguageSelector";
import SdkModal from "../components/SdkModal";
import "./codeeditor.css";
import { useNavigate } from "react-router-dom";

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [interactive, setInteractive] = useState(false);
  const [currentInput, setCurrentInput] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [sdks, setSdks] = useState([]);
  /*   const { user } = useContext(AuthContext); */

  useEffect(() => {
    const getRuntimes = async () => {
      try {
        const response = await axios.get(
          "https://emkc.org/api/v2/piston/runtimes"
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getRuntimes();
  }, []);

  const getLanguageVersion = (lang) => {
    switch (lang) {
      case "python":
        return "3.10.0";
      case "cpp":
        return "10.2.0";
      case "java":
        return "15.0.2";
      default:
        return "latest";
    }
  };

  const handleCompile = async () => {
    setIsLoading(true);
    setError("");
    setOutput("");

    const files = [
      {
        name: `main.${
          language === "python" ? "py" : language === "java" ? "java" : "cpp"
        }`,
        content: code,
      },
    ];

    const config = {
      method: "post",
      url: "https://emkc.org/api/v2/piston/execute",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        language: language,
        version: getLanguageVersion(language),
        files: files,
        stdin: input,
      },
    };

    try {
      console.log("Request Config:", config);
      const response = await axios(config);
      console.log("Response Data:", response.data);
      setIsLoading(false);
      handleOutput(
        response.data.run.stdout ||
          response.data.run.stderr ||
          "No output received"
      );
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        console.error("Error Response:", err.response);
        setError(
          `Error: ${err.response.status} - ${JSON.stringify(err.response.data)}`
        );
      } else if (err.request) {
        console.error("Error Request:", err.request);
        setError("Error: No response received from server");
      } else {
        console.error("Error Message:", err.message);
        setError(`Error: ${err.message}`);
      }
    }
  };

  const handleOutput = (output) => {
    setOutput((prevOutput) => prevOutput + "\n" + output);
    if (output.includes("Enter")) {
      setInteractive(true);
    } else {
      setInteractive(false);
    }
  };

  const handleInput = async () => {
    setIsLoading(true);
    setError("");

    const config = {
      method: "post",
      url: "https://emkc.org/api/v2/piston/execute",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        language: language,
        version: getLanguageVersion(language),
        files: [
          {
            name: `main.${
              language === "python"
                ? "py"
                : language === "java"
                ? "java"
                : "cpp"
            }`,
            content: code,
          },
        ],
        stdin: currentInput,
      },
    };

    try {
      console.log("Request Config:", config);
      const response = await axios(config);
      console.log("Response Data:", response.data);
      setIsLoading(false);
      handleOutput(
        response.data.run.stdout ||
          response.data.run.stderr ||
          "No output received"
      );
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        console.error("Error Response:", err.response);
        setError(
          `Error: ${err.response.status} - ${JSON.stringify(err.response.data)}`
        );
      } else if (err.request) {
        console.error("Error Request:", err.request);
        setError("Error: No response received from server");
      } else {
        console.error("Error Message:", err.message);
        setError(`Error: ${err.message}`);
      }
    }
  };

  const handleSave = async () => {
    const newSdk = {
      name: language,
      language: language,
      code: code,
      description: description,
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/sdks", newSdk, {
        headers: {
          "x-auth-token": token,
        },
      });
      alert("SDK saved successfully");
      setCode("");
      setLanguage("cpp");
      setOutput("");
      setInput("");
      setDescription("");
    } catch (error) {
      console.error("Error adding SDK:", error);
      setError("Error adding SDK");
    }
  };

  const fetchSdks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/sdks", {
        headers: {
          "x-auth-token": token,
        },
      });
      setSdks(response.data);
    } catch (error) {
      console.log("Error fetching SDKs:", error);
    }
  };

  const handleShowSdks = () => {
    fetchSdks();
    setShowModal(true);
  };

  /* if (!user) {
    return <Login />;
  } */

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="CodeEditor">
      <button className="show-sdks-btn" onClick={handleShowSdks}>
        Show SDKs
      </button>
      <button
        onClick={handleButtonClick}
        className="go-back-btn"
        variant="contained"
      >
        Go Back
      </button>
      <h1>Online IDE</h1>
      <LanguageSelector setLanguage={setLanguage} />
      <Editor code={code} setCode={setCode} language={language} />
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter input for the program"
      />
      <button onClick={handleCompile} disabled={isLoading}>
        {isLoading ? "Running..." : "Run"}
      </button>
      {interactive && (
        <div>
          <textarea
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder="Enter input"
          />
          <button onClick={handleInput} disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Input"}
          </button>
        </div>
      )}
      {error && <p className="error">{error}</p>}
      <Output output={output} />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter description for the SDK"
      />
      <button onClick={handleSave}>Save</button>
      {showModal && (
        <SdkModal sdks={sdks} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default CodeEditor;
