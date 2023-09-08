import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [password, setPassword] = useState("");
  const [lastPasswords, setLastPasswords] = useState([]);

  useEffect(() => {
    const storedPasswords = localStorage.getItem("passwords");
    if (storedPasswords) {
      setLastPasswords(JSON.parse(storedPasswords));
    }
  }, []);

  const generatePassword = () => {
    const newPassword = generateRandomPassword(true, true, true);
    setPassword(newPassword);
    setLastPasswords((prevPasswords) => {
      const updatedPasswords = [...prevPasswords, newPassword];
      if (updatedPasswords.length > 5) {
        updatedPasswords.shift();
      }
      return updatedPasswords;
    });
    localStorage.setItem("passwords", JSON.stringify(lastPasswords));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Password copied successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((error) => {
        console.error("Failed to copy password to clipboard:", error);
      });
  };

  const generateRandomPassword = (
    includeNumbers,
    includeAlphabets,
    includeSpecialChars
  ) => {
    let characters = "";
    if (includeNumbers) {
      characters += "0123456789";
    }
    if (includeAlphabets) {
      characters += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (includeSpecialChars) {
      characters += "!@#$%^&*()";
    }

    const passwordLength = 10; // Change this to the desired length of the password
    let password = "";

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }

    return password;
  };

  return (
    <div className="App">
      <header className="App-header">
        <ToastContainer /> {/* Initialize ToastContainer */}
        <h1>SecurePass - Password Generator</h1>
        <img src={logo} alt="App Logo" className="App-logo" />
        <div className="container">
          <div className="Password-Generator">
            <div className="Generated-Password">
              <h2>Your Strong Password</h2>
              <p>{password}</p>
              <button
                className="Copy-Button"
                onClick={() => copyToClipboard(password)}
              >
                Copy to Clipboard
              </button>
            </div>

            <div className="Generate-Button">
              <button onClick={generatePassword}>Generate Password</button>
            </div>
          </div>

          <div className="Password-History">
            <h2>Password History</h2>
            <ul>
              {lastPasswords.map((prevPassword, index) => (
                <li key={index}>
                  <span>{prevPassword}</span>
                  <button
                    className="Copy-Button"
                    onClick={() => copyToClipboard(prevPassword)}
                  >
                    Copy
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
