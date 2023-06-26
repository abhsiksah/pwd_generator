import { useState } from "react";

const usePasswordGenerator = () => {
  let [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [strength, setStrength] = useState("");
  let pwdinprogress = "";
  let charset = "";
  const generatePassword = (length, checkboxData) => {
    const ifValid = checkboxData.filter((elem) => elem.status);

    if (ifValid.length === 0) {
      setErrorMessage("Please Check Atleast 1 Option");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      return;
    } else {
      if (length <= 6) {
        setStrength("weak");
      } else if (length <= 12) {
        setStrength("medium");
      } else if (length <= 15) {
        setStrength("strong");
      } else {
        setStrength("very strong");
      }

      //generate pwd

      for (let option of ifValid) {
        switch (option.title) {
          case "Include-Caps":
            charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            break;
          case "Include-small":
            charset += "abcdefghijklmnopqrstuvwxyz";
            break;
          case "Include-special":
            charset += "!@#$%^&*(){}:";
            break;
          case "Include-numbers":
            charset += "1234567890";
            break;
          default:
            break;
        }
      }

      let i = 0;
      while (i < length) {
        pwdinprogress += charset[Math.floor(Math.random() * charset.length)];
        i++;
      }
      setPassword(pwdinprogress);
      pwdinprogress = "";
    }
  };

  return { password, errorMessage, strength, generatePassword };
};

export default usePasswordGenerator;
