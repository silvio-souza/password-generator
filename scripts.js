const inputEl = document.querySelector("#password");
let passwordLength = 16;

const generatePassword = () => {
  const chars =
    "abcdefghjklmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789?!@&*()[]";

  let password = "";

  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  inputEl.value = password;

  console.log(password);
};

const copy = () => {
  navigator.clipboard.writeText(inputEl.value);
};

const passwordLengthEl = document.querySelector("#password-length");
passwordLengthEl.addEventListener("input", () => {
  passwordLength = passwordLengthEl.value;
  generatePassword();
});

const buttonCopyEL = document.querySelector("#copy");
buttonCopyEL.addEventListener("click", copy);

generatePassword();
