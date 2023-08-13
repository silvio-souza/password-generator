const inputEl = document.querySelector("#password");

const upperCaseCheckEl = document.querySelector("#uppercase-check");
const numberCheckEl = document.querySelector("#number-check");
const symbolCheckEl = document.querySelector("#symbol-check");

const SecurityIndicatorBarEl = document.querySelector(
  "#security-indicator-bar"
);

let passwordLength = 16;

const generatePassword = () => {
  let chars = "abcdefghjklmnpqrstuvwxyz";

  const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const numberChars = "123456789";
  const symbolChars = "?!@&*()[]";

  if (upperCaseCheckEl.checked) {
    chars += upperCaseChars;
  }

  if (numberCheckEl.checked) {
    chars += numberChars;
  }

  if (symbolCheckEl.checked) {
    chars += symbolChars;
  }

  let password = "";

  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  inputEl.value = password;

  calculatePasswordStrength();
  calculateFontSize();

  // console.log(password);
};

const calculatePasswordStrength = () => {
  const lengthWeight = Math.round((passwordLength / 64) * 25); // 25 is the weigth
  const upperCasesCheckWeith = upperCaseCheckEl.checked ? 15 : 0;
  const numbersCheckWeith = numberCheckEl.checked ? 25 : 0;
  const symbolsCheckWeith = symbolCheckEl.checked ? 35 : 0;

  const percent =
    lengthWeight + upperCasesCheckWeith + numbersCheckWeith + symbolsCheckWeith;

  SecurityIndicatorBarEl.style.width = `${percent}%`;

  if (percent > 69) {
    // safe
    SecurityIndicatorBarEl.classList.remove("critical");
    SecurityIndicatorBarEl.classList.remove("warning");
    SecurityIndicatorBarEl.classList.add("safe");
  } else if (percent > 45) {
    // warning
    SecurityIndicatorBarEl.classList.remove("critical");
    SecurityIndicatorBarEl.classList.add("warning");
    SecurityIndicatorBarEl.classList.remove("safe");
  } else {
    // critical
    SecurityIndicatorBarEl.classList.add("critical");
    SecurityIndicatorBarEl.classList.remove("warning");
    SecurityIndicatorBarEl.classList.remove("safe");
  }

  if (percent >= 100) {
    SecurityIndicatorBarEl.classList.add("completed");
  } else {
    SecurityIndicatorBarEl.classList.remove("completed");
  }
};

calculateFontSize = () => {
  if (passwordLength > 45) {
    inputEl.classList.remove("font-sm");
    inputEl.classList.remove("font-xs");
    inputEl.classList.add("font-xxs");
  } else if (passwordLength > 32) {
    inputEl.classList.remove("font-sm");
    inputEl.classList.add("font-xs");
    inputEl.classList.remove("font-xxs");
  } else if (passwordLength > 22) {
    inputEl.classList.add("font-sm");
    inputEl.classList.remove("font-xs");
    inputEl.classList.remove("font-xxs");
  } else {
    inputEl.classList.remove("font-sm");
    inputEl.classList.remove("font-xs");
    inputEl.classList.remove("font-xxs");
  }
};

const copy = () => {
  navigator.clipboard.writeText(inputEl.value);
};

const passwordLengthEl = document.querySelector("#password-length");
passwordLengthEl.addEventListener("input", () => {
  passwordLength = passwordLengthEl.value;
  document.querySelector("#password-length-text").innerText = passwordLength;
  generatePassword();
});

upperCaseCheckEl.addEventListener("click", generatePassword);
numberCheckEl.addEventListener("click", generatePassword);
symbolCheckEl.addEventListener("click", generatePassword);

document.querySelector("#renew").addEventListener("click", generatePassword);

document.querySelector("#copy-1").addEventListener("click", copy);
document.querySelector("#copy-2").addEventListener("click", copy);

generatePassword();
