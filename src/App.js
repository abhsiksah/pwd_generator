import "./styles.css";
import { useState } from "react";
import usePasswordGenerator from "./useGeneratePWD";

export default function App() {
  const checkboxes = [
    { title: "Include-Caps", status: false, direction: "checkbox" },
    { title: "Include-small", status: false, direction: "checkbox" },
    { title: "Include-special", status: false, direction: "checkbox" },
    { title: "Include-numbers", status: false, direction: "checkbox" }
  ];
  const {
    password,
    errorMessage,
    strength,
    generatePassword
  } = usePasswordGenerator();
  const [optionlist, setoptionslist] = useState(checkboxes);
  const [isCopied, setIsCopied] = useState(false);
  const [limit, setlimit] = useState(12);

  const handleCheckboxChange = (i) => {
    let updatedlist = optionlist.map((elem, index) => {
      if (index == i) {
        return { ...elem, status: !elem.status };
      } else {
        return elem;
      }
    });
    setoptionslist(updatedlist);
  };
  const handleCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(password);
    setTimeout(() => {
      setIsCopied(false);
    }, 1700);
  };

  return (
    <div className="container">
      <div className="inner-conatiner">
        {password === "" ? (
          <>...</>
        ) : (
          <div className="pwd-and-copy">
            <span>{password}</span>

            {isCopied ? (
              <button onClick={() => handleCopy()}>Copied</button>
            ) : (
              <button onClick={() => handleCopy()}>copy</button>
            )}
          </div>
        )}

        <div className="char-length">
          <div className="length">
            <span>Character Length</span>
            <span>{limit}</span>
          </div>
          <div>
            <input
              type="range"
              value={limit}
              min={4}
              max={20}
              onChange={(e) => {
                setlimit(e.target.value);
              }}
              className="slider"
            />
          </div>
        </div>
        <div className="checkboxes">
          {checkboxes.map((option, index) => {
            return (
              <div className={option.direction} key={index}>
                <input
                  type="checkbox"
                  onChange={() => {
                    handleCheckboxChange(index);
                  }}
                />
                <span>{option.title}</span>
              </div>
            );
          })}
        </div>
        {errorMessage !== "" ? <span>{errorMessage}</span> : <></>}
        {strength === "" ? (
          <></>
        ) : (
          <div className="strength">
            <span>Strength</span>
            <span>{strength}</span>
          </div>
        )}

        <div className="generate-pwd">
          <button onClick={() => generatePassword(limit, optionlist)}>
            Genrate PWD
          </button>
        </div>
      </div>
    </div>
  );
}
