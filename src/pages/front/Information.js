import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

const Information = () => {
  const [activeCategory, setActiveCategory] = useState("payment");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const faqRefs = useRef([]);

  const toggleFaqItem = (index) => {
    faqRefs.current[index].classList.toggle("active");
  };

  const categories = useMemo(
    () => [
      { id: "payment", name: "付款", icon: "fa-credit-card" },
      { id: "group", name: "團體旅遊", icon: "fa-users" },
      { id: "flight", name: "機票", icon: "fa-plane" },
      { id: "hotel", name: "訂房", icon: "fa-hotel" },
      { id: "passport", name: "護照", icon: "fa-passport" },
    ],
    []
  );

  const faqData = useMemo(
    () => ({
      payment: [
        {
          question: "如何付款?",
          answer:
            "您可以使用信用卡、線上支付或銀行轉帳等方式進行付款。詳細步驟如下：<br/><br/>" +
            "<strong>信用卡付款：</strong>在結帳頁面選擇「信用卡付款」，輸入您的卡號、有效期限和安全碼即可完成付款。我們支援VISA、MasterCard、JCB等主要信用卡。<br/><br/>" +
            "<strong>線上支付：</strong>我們支援多種線上支付方式，包括LINE Pay、街口支付等。選擇您偏好的支付方式，按照指示完成付款。<br/><br/>" +
            "<strong>銀行轉帳：</strong>您可以選擇「銀行轉帳」方式，系統會提供我們的銀行帳戶資訊。請在訂單成立後24小時內完成轉帳，並在備註欄填寫您的訂單編號。",
        },
        {
          question: "是否接受分期付款?",
          answer:
            "是的，我們提供分期付款服務。您可以在結帳時選擇分期付款的方式。<br/><br/>" +
            "我們支援3期、6期、12期和24期分期付款，手續費依照各銀行規定收取。請注意，分期付款僅適用於新台幣10,000元以上的訂單。<br/><br/>" +
            "部分銀行卡片還有分期零利率的優惠活動，詳情請參考我們的「優惠活動」頁面或洽詢您的發卡銀行。",
        },
        {
          question: "如何申請退款?",
          answer:
            "如果您需要申請退款，請聯絡我們的客服人員。我們會根據您的情況進行審核，並盡快為您處理退款事宜。<br/><br/>" +
            "<strong>退款流程：</strong><br/>" +
            "1. 登入您的帳戶，前往「訂單管理」頁面<br/>" +
            "2. 找到需要退款的訂單，點擊「申請退款」<br/>" +
            "3. 填寫退款原因和相關資訊<br/>" +
            "4. 提交申請後，我們的客服人員會在1-2個工作天內與您聯繫<br/><br/>" +
            "<strong>退款政策：</strong><br/>" +
            "- 出發前30天取消：全額退款（扣除手續費）<br/>" +
            "- 出發前15-29天取消：退款70%<br/>" +
            "- 出發前7-14天取消：退款50%<br/>" +
            "- 出發前7天內取消：不予退款<br/><br/>" +
            "特殊情況（如天災、疾病等）可能有不同的退款政策，請與客服人員聯繫了解詳情。",
        },
      ],
      group: [
        {
          question: "如何預訂團體旅遊?",
          answer:
            "您可以透過我們的網站或聯絡我們的團體旅遊專員進行預訂。我們會根據您的需求為您安排合適的行程。",
        },
        {
          question: "團體旅遊有什麼優惠?",
          answer:
            "團體旅遊通常可以享有優惠價格，如團體機票、住宿等。我們也會提供額外的服務，如專屬導遊、專車接送等。",
        },
        {
          question: "團體旅遊的取消政策是什麼?",
          answer:
            "團體旅遊的取消政策會根據具體行程而有所不同。詳細信息請參考我們的團體旅遊條款。",
        },
      ],
      flight: [
        {
          question: "如何預訂機票?",
          answer:
            "您可以直接在我們的網站上搜索並預訂機票。我們提供多種航空公司的選擇，並提供優惠價格。",
        },
        {
          question: "如何更改或取消機票?",
          answer:
            "如果需要更改或取消機票，請聯絡我們的客服人員。我們會根據航空公司的政策為您處理。",
        },
        {
          question: "是否提供行李托運?",
          answer:
            "是的，我們提供行李托運服務。您可以在預訂時選擇是否需要托運行李，並根據重量支付相應的費用。",
        },
      ],
      hotel: [
        {
          question: "如何預訂住宿?",
          answer:
            "您可以在我們的網站上搜索並預訂住宿。我們提供多種類型的住宿選擇，包括酒店、民宿等。",
        },
        {
          question: "如何更改或取消預訂?",
          answer:
            "如果需要更改或取消預訂，請聯絡我們的客服人員。我們會根據住宿提供商的政策為您處理。",
        },
        {
          question: "是否提供接送服務?",
          answer:
            "部分住宿提供接送服務，具體情況請查看您預訂的住宿詳情。如需接送服務，可在預訂時一併選擇。",
        },
      ],
      passport: [
        {
          question: "如何申請護照?",
          answer:
            "您可以前往當地的政府機構申請護照。申請流程包括提交申請表、證件照、身份證明文件等。具體要求請查看當地的相關規定。",
        },
        {
          question: "護照有效期是多久?",
          answer:
            "一般情況下，成人護照有效期為10年，未成年人的護照有效期為5年。具體有效期可能因國家而有所不同，請查看相關規定。",
        },
        {
          question: "如何更換護照?",
          answer:
            "如果您的護照遺失、毀損或資料變更，需要更換護照。請前往當地的政府機構提交申請，並準備相關證件。我們建議您提前辦理，以免影響旅行計劃。",
        },
      ],
    }),
    []
  );

  // 搜尋功能
  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const query = searchQuery.toLowerCase();
    const results = [];

    // 搜尋所有類別中的問題
    Object.keys(faqData).forEach((categoryId) => {
      faqData[categoryId].forEach((faq, index) => {
        if (
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
        ) {
          results.push({
            ...faq,
            categoryId,
            categoryName: categories.find((c) => c.id === categoryId).name,
            categoryIcon: categories.find((c) => c.id === categoryId).icon,
            index,
          });
        }
      });
    });

    setSearchResults(results);
  }, [searchQuery, faqData, categories]);

  // 當搜尋框內容變化時更新搜尋結果
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, handleSearch]);

  // 清除搜尋
  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    setSearchResults([]);
  };

  // 點擊搜尋結果
  const handleSearchResultClick = (result) => {
    setActiveCategory(result.categoryId);
    setIsSearching(false);
    setSearchQuery("");

    // 等待類別切換後展開對應問題
    setTimeout(() => {
      if (faqRefs.current[result.index]) {
        faqRefs.current[result.index].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        toggleFaqItem(result.index);
      }
    }, 100);
  };

  return (
    <>
      <div className="faq-hero">
        <div className="container">
          <h1 className="faq-hero-title">常見問題</h1>
          <p className="faq-hero-subtitle">找到您旅行中可能遇到的問題的解答</p>
          <div className="faq-search">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="搜尋您的問題..."
                aria-label="搜尋您的問題"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={clearSearch}
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleSearch}
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
            {isSearching && searchResults.length > 0 && (
              <div className="faq-search-results">
                <div className="search-results-header">
                  找到 {searchResults.length} 個結果
                </div>
                <div className="search-results-list">
                  {searchResults.map((result, idx) => (
                    <div
                      key={idx}
                      className="search-result-item"
                      onClick={() => handleSearchResultClick(result)}
                    >
                      <div className="search-result-category">
                        <i className={`fas ${result.categoryIcon} me-2`}></i>
                        {result.categoryName}
                      </div>
                      <div className="search-result-question">
                        {result.question}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {isSearching && searchResults.length === 0 && searchQuery && (
              <div className="faq-search-results">
                <div className="search-no-results">
                  <i className="fas fa-exclamation-circle me-2"></i>
                  沒有找到符合「{searchQuery}」的結果
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="faq-category-tabs">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`faq-category-tab ${
                activeCategory === category.id ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <i className={`fas ${category.icon}`}></i>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        <div className="faq-container">
          <div className="row">
            <div className="col-lg-8">
              <div className="faq-section">
                <h2>
                  <i
                    className={`fas ${
                      categories.find((c) => c.id === activeCategory).icon
                    } me-2`}
                  ></i>
                  {categories.find((c) => c.id === activeCategory).name}
                </h2>
                {faqData[activeCategory].map((faq, index) => (
                  <div
                    key={index}
                    className="faq-item"
                    id={`${activeCategory}-${index}`}
                    ref={(el) => (faqRefs.current[index] = el)}
                    onClick={() => toggleFaqItem(index)}
                  >
                    <div className="faq-header">
                      <h3>{faq.question}</h3>
                      <span className="toggle-icon">+</span>
                    </div>
                    <div className="faq-content">
                      <p dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="faq-contact-card">
                <div className="faq-contact-icon">
                  <i className="fas fa-headset"></i>
                </div>
                <h3>需要更多協助？</h3>
                <p>
                  如果您沒有找到您的問題的答案，請隨時聯繫我們的客戶服務團隊。
                </p>
                <div className="faq-contact-info">
                  <div className="contact-item">
                    <i className="fas fa-phone"></i>
                    <span>02-2712-0589</span>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-envelope"></i>
                    <span>service@shibatravel.com</span>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-clock"></i>
                    <span>週一至週五 9:00-18:00</span>
                  </div>
                </div>
                <button className="btn btn-primary w-100 mt-3">
                  <i className="fas fa-paper-plane me-2"></i>發送訊息
                </button>
              </div>
              <div className="faq-popular-card mt-4">
                <h3>熱門問題</h3>
                <ul className="faq-popular-list">
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveCategory("payment");
                        setTimeout(() => toggleFaqItem(2), 100);
                      }}
                    >
                      <i className="fas fa-question-circle me-2"></i>
                      如何申請退款?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveCategory("flight");
                        setTimeout(() => toggleFaqItem(1), 100);
                      }}
                    >
                      <i className="fas fa-question-circle me-2"></i>
                      如何更改或取消機票?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveCategory("hotel");
                        setTimeout(() => toggleFaqItem(0), 100);
                      }}
                    >
                      <i className="fas fa-question-circle me-2"></i>
                      如何預訂住宿?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveCategory("group");
                        setTimeout(() => toggleFaqItem(0), 100);
                      }}
                    >
                      <i className="fas fa-question-circle me-2"></i>
                      如何預訂團體旅遊?
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Information;
