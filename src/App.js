import { useState, useEffect } from "react";
import "./App.css";

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

function App() {
  const [amount, setAmount] = useState(1);
  const [currencyFrom, setCurrencyFrom] = useState("EUR");
  const [currencyTo, setCurrencyTo] = useState("USD");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function convert() {
        setIsLoading(true);
        const response = await fetch(
          `https://api.frankfurter.dev/v1/latest?base=${currencyFrom}&symbols=${currencyTo}`
        );
        const data = await response.json();
        const convertedAmount = (amount * data.rates[currencyTo]).toFixed(2);

        isLoading
          ? setOutput("Loading Conversion")
          : setOutput(`${convertedAmount} ${currencyTo}`);

        setIsLoading(false);
      }
      currencyFrom !== currencyTo && convert();
      currencyFrom === currencyTo && setOutput(amount);
    },
    [amount, currencyFrom, currencyTo, isLoading]
  );

  function handleSetAmount(e) {
    setAmount(e.target.value);
  }

  function handleSetCurrencyFrom(e) {
    setCurrencyFrom(e.target.value);
  }

  function handleSetCurrencyTo(e) {
    setCurrencyTo(e.target.value);
  }

  return (
    <section className="container">
      <div className="box">
        <div className="input-box">
          <input
            type="number"
            value={amount}
            onChange={handleSetAmount}
            disabled={isLoading ? true : false}
          />
          <select
            value={currencyFrom}
            onChange={handleSetCurrencyFrom}
            disabled={isLoading ? true : false}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
            <option value="INR">INR</option>
          </select>
          <select
            value={currencyTo}
            onChange={handleSetCurrencyTo}
            disabled={isLoading ? true : false}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
            <option value="INR">INR</option>
          </select>
        </div>
        <div className="output-box">
          <p>{output}</p>
        </div>
      </div>
    </section>
  );
}

export default App;
