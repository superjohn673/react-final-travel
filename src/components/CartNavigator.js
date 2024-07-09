import React from "react";
import { Link } from "react-router-dom";

const CartNavigator = ({ currentStep, nextStep }) => {
  const steps = [
    { label: "購物車", path: "/cart" },
    { label: "填寫資料", path: "/checkout" },
    { label: "確認報名", path: "/confirm" },
    { label: "付款", path: "/payment" },
  ];

  return (
    <div className="cart-navigator">
      <div className="progress-container">
        {steps.map((step, index) => (
          <div key={index} className="progress-step">
            {index + 1 === currentStep && (
              <i class="fa-solid fa-plane-departure progress-icon"></i>
            )}
            <div
              className={`progress-circle ${
                index + 1 <= currentStep ? "active" : ""
              }`}
            >
              {index + 1}
            </div>
            <div
              className={`progress-line ${
                index + 1 <= currentStep ? "active" : ""
              } ${index + 1 === nextStep ? "next-step" : ""}`}
            />
            <div className="progress-label">{step.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartNavigator;
