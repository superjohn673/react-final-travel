import React from "react";
import { Link } from "react-router-dom";

const CartNavigator = ({ currentStep, nextStep }) => {
  const steps = [
    { label: "購物車", path: "/cart", icon: "fa-shopping-cart" },
    { label: "填寫資料", path: "/checkout", icon: "fa-address-card" },
    { label: "確認報名", path: "/confirm", icon: "fa-clipboard-check" },
    { label: "前往付款", path: "/payment", icon: "fa-credit-card" },
  ];

  return (
    <div className="container">
      <nav className="cart-navigator" aria-label="購物流程">
        <ol className="progress-container">
          {steps.map((step, index) => (
            <li
              key={index}
              className={`progress-step ${
                index + 1 === currentStep ? "current" : ""
              } ${index + 1 < currentStep ? "completed" : ""}`}
            >
              <div className="progress-step-content">
                {index + 1 === currentStep && (
                  <i
                    className={`fa-solid fa-plane-departure progress-icon`}
                    aria-hidden="true"
                  ></i>
                )}
                <div
                  className={`progress-circle ${
                    index + 1 <= currentStep ? "active" : ""
                  }`}
                  aria-current={index + 1 === currentStep ? "step" : null}
                >
                  {index + 1 < currentStep ? (
                    <i className="fa-solid fa-check" aria-hidden="true"></i>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`progress-line ${
                      index + 1 < currentStep ? "active" : ""
                    } ${index + 1 === currentStep ? "next-step" : ""}`}
                    aria-hidden="true"
                  />
                )}
                <div className="progress-label">
                  {index + 1 < currentStep ? (
                    <Link to={step.path} className="step-link">
                      {step.label}
                    </Link>
                  ) : (
                    step.label
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default CartNavigator;
