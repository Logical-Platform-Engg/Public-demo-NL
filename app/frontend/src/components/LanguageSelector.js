import React from "react";

const LanguageSelector = ({ setLanguage }) => {
  return (
    <select onChange={(e) => setLanguage(e.target.value)}>
      <option value="cpp">C++</option>
      <option value="java">Java</option>
      <option value="python">Python</option>
      <option value="go">Go</option> {/* Add Go language option */}
    </select>
  );
};

export default LanguageSelector;
