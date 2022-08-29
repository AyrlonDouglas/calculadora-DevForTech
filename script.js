let buttons = document.querySelectorAll(".key");
let display = document.querySelector(".calculator-display");
let history = document.querySelector(".calculator-history");

let operation = "";
let result = 0;
let clickOperator = false;
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const operators = ["+", "-", "*", "/", "%"];
document.addEventListener(
  "keydown",
  (event) => {
    let name = event.key;

    if (numbers.includes(name) || operators.includes(name)) {
      handleOperations(name);
    }
    if (name === "Enter") {
      history.textContent = equal();
      display.innerHTML = equal();
    }
    if (name === "Backspace") {
      del();
    }
    if (name === "Delete") {
      clearDisplay();
    }
  },
  false
);

for (let button of buttons) {
  button.onclick = (e) => {
    handleOperations(e.target.innerText);
  };
}

const handleOperations = (key) => {
  if (
    !numbers.includes(key) &&
    key === history.textContent[history.textContent.length - 1]
  ) {
    return;
  } else if (!numbers.includes(key) && history.textContent.length === 0) {
    return;
  } else if (
    !numbers.includes(key) &&
    !numbers.includes(history.textContent[history.textContent.length - 1])
    // &&
    // history.textContent[history.textContent.length - 1] !== key
  ) {
    if (key !== "DEL" && key !== "C" && key !== "CE" && key !== "=") {
      history.textContent =
        history.textContent.substring(0, history.textContent.length - 1) + key;
      return;
    }
  } else if (
    history.textContent[history.textContent.length - 1] === "." &&
    !numbers.includes(key)
  ) {
    if (key !== "DEL" && key !== "C" && key !== "CE" && key !== "=") {
      history.textContent += "0" + key;
    }
    return;
  }

  if (key === ".") {
    // verifica se já existe "." entre operadores
    const positionOperador = [];
    for (let [index, value] of history.textContent.split("").entries()) {
      if (!numbers.includes(value)) {
        positionOperador.push(index);
      }
    }
    if (positionOperador.length > 0) {
      for (
        let i = positionOperador[positionOperador.length - 1];
        i < history.textContent.length;
        i++
      ) {
        if (history.textContent[i] === ".") return;
      }
    } else {
      if (history.textContent.indexOf(".") !== -1) {
        return;
      }
    }
  }

  switch (key) {
    case "C":
      clearDisplay();
      break;
    case "CE":
      break;
    case "=":
      history.textContent = equal();
      display.innerHTML = equal();
      break;
    case "DEL":
      del();
      break;
    default:
      if (numbers.includes(key)) {
        display.innerHTML += key;
      } else {
        display.innerHTML = "";
      }
      history.textContent += key;
  }
};

const clearDisplay = () => {
  display.innerHTML = "";
  operation = "";
  history.textContent = "";
};

const handleHistoryForDisplay = () => {
  if (history && history.textContent.length > 0) {
    if (
      !numbers.includes(history.textContent[history.textContent.length - 1])
    ) {
      return history.textContent.substring(0, history.textContent.length - 1);
    } else return history.textContent;
  } else return "0";
};

const equal = () => {
  return eval(handleHistoryForDisplay());
};

const del = () => {
  if (display.innerHTML.length > 0) {
    display.innerHTML = display.innerHTML.substring(
      0,
      display.innerHTML.length - 1
    );
    operation = operation.substring(0, operation.length - 1);
    history.textContent = history.textContent.substring(
      0,
      history.textContent.length - 1
    );
  }
};
