import { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [product, setProduct] = useState({
    name: "React",
    price: 10,
    description: "Powered By Facebook",
  });

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const header = {
      "Content-Type": "application/json",
    };

    return fetch(`/payment`, {
      method: "POST",
      header,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("RESPONSE ", response);
        const { status } = response;
        console.log("STATUS ", status);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout
          stripeKey="pk_test_51I6HClEBoSGdyQZkjS4xxxu4OR9v6LcloX8npXFfQKNShlXnrhXkHTODq4ugyuGy3fTK2TV2nNMN8mxhfkaF3sh600ETbJmmsd"
          token={makePayment}
          name="Buy React"
          amount={product.price * 100}
        >
          <button className="btn-large blue">
            Buy React for only ${`${product.price}`}
          </button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
