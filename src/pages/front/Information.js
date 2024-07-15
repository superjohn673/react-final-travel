import React, { useState, useRef } from "react";

const Information = () => {
  const faqRefs = useRef([]);

  const toggleFaqItem = (index) => {
    faqRefs.current[index].classList.toggle("active");
  };

  return (
    <>
      <div className="container py-5">
        <div>
          <p className="text-center fs-2">常見問題</p>
        </div>
        <div className="faq-container">
          <div className="faq-section">
            <h2>付款</h2>
            <div
              className="faq-item"
              ref={(el) => (faqRefs.current[0] = el)}
              onClick={() => toggleFaqItem(0)}
            >
              <div className="faq-header">
                <h3>如何付款?</h3>
                <span className="toggle-icon">+</span>
              </div>
              <div className="faq-content">
                <p>
                  您可以使用信用卡、線上支付或銀行轉帳等方式進行付款。詳細步驟請參考我們的付款指南。
                </p>
              </div>
            </div>
            <div
              className="faq-item"
              ref={(el) => (faqRefs.current[1] = el)}
              onClick={() => toggleFaqItem(1)}
            >
              <div className="faq-header">
                <h3>是否接受分期付款?</h3>
                <span className="toggle-icon">+</span>
              </div>
              <div className="faq-content">
                <p>
                  是的,我們提供分期付款服務。您可以在結帳時選擇分期付款的方式。
                </p>
              </div>
            </div>
            <div
              className="faq-item"
              ref={(el) => (faqRefs.current[2] = el)}
              onClick={() => toggleFaqItem(2)}
            >
              <div className="faq-header">
                <h3>如何申請退款?</h3>
                <span className="toggle-icon">+</span>
              </div>
              <div className="faq-content">
                <p>
                  如果您需要申請退款,請聯絡我們的客服人員。我們會根據您的情況進行審核,並盡快為您處理退款事宜。
                </p>
              </div>
            </div>
          </div>

          <div className="faq-section">
            <h2>團體旅遊</h2>
            <div
              className="faq-item"
              ref={(el) => (faqRefs.current[3] = el)}
              onClick={() => toggleFaqItem(3)}
            >
              <div className="faq-header">
                <h3>如何預訂團體旅遊?</h3>
                <span className="toggle-icon">+</span>
              </div>
              <div className="faq-content">
                <p>
                  您可以透過我們的網站或聯絡我們的團體旅遊專員進行預訂。我們會根據您的需求為您安排合適的行程。
                </p>
              </div>
            </div>
            <div
              className="faq-item"
              ref={(el) => (faqRefs.current[4] = el)}
              onClick={() => toggleFaqItem(4)}
            >
              <div className="faq-header">
                <h3>團體旅遊有什麼優惠?</h3>
                <span className="toggle-icon">+</span>
              </div>
              <div className="faq-content">
                <p>
                  團體旅遊通常可以享有優惠價格,如團體機票、住宿等。我們也會提供額外的服務,如專屬導遊、專車接送等。
                </p>
              </div>
            </div>
            <div
              className="faq-item"
              ref={(el) => (faqRefs.current[5] = el)}
              onClick={() => toggleFaqItem(5)}
            >
              <div className="faq-header">
                <h3>團體旅遊的取消政策是什麼?</h3>
                <span className="toggle-icon">+</span>
              </div>
              <div className="faq-content">
                <p>
                  團體旅遊的取消政策會根據具體行程而有所不同。詳細信息請參考我們的團體旅遊條款。
                </p>
              </div>
            </div>
          </div>

          <div className="faq-section">
            <h2>機票</h2>
            <div
              className="faq-item"
              ref={(el) => (faqRefs.current[6] = el)}
              onClick={() => toggleFaqItem(6)}
            >
              <div className="faq-header">
                <h3>如何預訂機票?</h3>
                <span className="toggle-icon">+</span>
              </div>
              <div className="faq-content">
                <p>
                  您可以直接在我們的網站上搜索並預訂機票。我們提供多種航空公司的選擇,並提供優惠價格。
                </p>
              </div>
            </div>
            <div
              className="faq-item"
              ref={(el) => (faqRefs.current[7] = el)}
              onClick={() => toggleFaqItem(7)}
            >
              <div className="faq-header">
                <h3>如何更改或取消機票?</h3>
                <span className="toggle-icon">+</span>
              </div>
              <div className="faq-content">
                <p>
                  如果需要更改或取消機票,請聯絡我們的客服人員。我們會根據航空公司的政策為您處理。
                </p>
              </div>
            </div>
            <div
              className="faq-item"
              ref={(el) => (faqRefs.current[8] = el)}
              onClick={() => toggleFaqItem(8)}
            >
              <div className="faq-header">
                <h3>是否提供行李托運?</h3>
                <span className="toggle-icon">+</span>
              </div>
              <div className="faq-content">
                <p>
                  是的,我們提供行李托運服務。您可以在預訂時選擇是否需要托運行李,並根據重量支付相應的費用。
                </p>
              </div>
            </div>
          </div>

          <div className="faq-section">
            <h2>訂房</h2>
            <div
              className="faq-item"
              ref={(el) => (faqRefs.current[9] = el)}
              onClick={() => toggleFaqItem(9)}
            >
              <div className="faq-header">
                <h3>如何預訂住宿?</h3>
                <span className="toggle-icon">+</span>
              </div>
              <div className="faq-content">
                <p>
                  您可以在我們的網站上搜索並預訂住宿。我們提供多種類型的住宿選擇,包括酒店、民宿等。
                </p>
              </div>
            </div>
            <div
              className="faq-item"
              ref={(el) => (faqRefs.current[10] = el)}
              onClick={() => toggleFaqItem(10)}
            >
              <div className="faq-header">
                <h3>如何更改或取消預訂?</h3>
                <span className="toggle-icon">+</span>
              </div>
              <div className="faq-content">
                <p>
                  如果需要更改或取消預訂,請聯絡我們的客服人員。我們會根據住宿提供商的政策為您處理。
                </p>
              </div>
            </div>
            <div
              className="faq-item"
              ref={(el) => (faqRefs.current[11] = el)}
              onClick={() => toggleFaqItem(11)}
            >
              <div className="faq-header">
                <h3>是否提供接送服務?</h3>
                <span className="toggle-icon">+</span>
              </div>
              <div className="faq-content">
                <p>
                  部分住宿提供接送服務,具體情況請查看您預訂的住宿詳情。如需接送服務,可在預訂時一併選擇。
                </p>
              </div>
            </div>
          </div>

          <div className="faq-section">
            <h2>護照</h2>
            <div
              className="faq-item"
              ref={(el) => (faqRefs.current[12] = el)}
              onClick={() => toggleFaqItem(12)}
            >
              <div className="faq-header">
                <h3>如何申請護照?</h3>
                <span className="toggle-icon">+</span>
              </div>
              <div className="faq-content">
                <p>
                  您可以前往當地的政府機構申請護照。申請流程包括提交申請表、證件照、身份證明文件等。具體要求請查看當地的相關規定。
                </p>
              </div>
            </div>
            <div
              className="faq-item"
              ref={(el) => (faqRefs.current[13] = el)}
              onClick={() => toggleFaqItem(13)}
            >
              <div className="faq-header">
                <h3>護照有效期是多久?</h3>
                <span className="toggle-icon">+</span>
              </div>
              <div className="faq-content">
                <p>
                  一般情況下,成人護照有效期為10年,未成年人的護照有效期為5年。具體有效期可能因國家而有所不同,請查看相關規定。
                </p>
              </div>
            </div>
            <div
              className="faq-item"
              ref={(el) => (faqRefs.current[14] = el)}
              onClick={() => toggleFaqItem(14)}
            >
              <div className="faq-header">
                <h3>如何更換護照?</h3>
                <span className="toggle-icon">+</span>
              </div>
              <div className="faq-content">
                <p>
                  如果您的護照遺失、毀損或資料變更,需要更換護照。請前往當地的政府機構提交申請,並準備相關證件。我們建議您提前辦理,以免影響旅行計劃。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Information;
