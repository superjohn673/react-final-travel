import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginImg from "../../assets/images/login/login.jpg";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [loginState, setLoginState] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [validation, setValidation] = useState({
    username: { valid: true, message: "" },
    password: { valid: true, message: "" },
  });

  // 檢查是否有保存的登入資訊
  useEffect(() => {
    const savedUsername = localStorage.getItem("rememberedUsername");
    if (savedUsername) {
      setData((prev) => ({ ...prev, username: savedUsername }));
      setRememberMe(true);
    }
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newValidation = { ...validation };

    // 驗證電子郵件
    if (!data.username) {
      newValidation.username = { valid: false, message: "請輸入電子郵件" };
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(data.username)) {
      newValidation.username = {
        valid: false,
        message: "請輸入有效的電子郵件格式",
      };
      isValid = false;
    } else {
      newValidation.username = { valid: true, message: "" };
    }

    // 驗證密碼
    if (!data.password) {
      newValidation.password = { valid: false, message: "請輸入密碼" };
      isValid = false;
    } else if (data.password.length < 6) {
      newValidation.password = {
        valid: false,
        message: "密碼長度至少為6個字符",
      };
      isValid = false;
    } else {
      newValidation.password = { valid: true, message: "" };
    }

    setValidation(newValidation);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    // 清除該欄位的錯誤訊息
    if (!validation[name].valid) {
      setValidation({
        ...validation,
        [name]: { valid: true, message: "" },
      });
    }
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  const submit = async (e) => {
    e.preventDefault();

    // 表單驗證
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setLoginState({});

    try {
      const res = await axios.post("/v2/admin/signin", data);
      const { token, expired } = res.data;

      // 安全地設置 cookie (HttpOnly 和 Secure 標誌應在伺服器端設置)
      document.cookie = `Token=${token};expires=${new Date(expired)}`;

      // 如果選擇了"記住我"，則保存用戶名
      if (rememberMe) {
        localStorage.setItem("rememberedUsername", data.username);
      } else {
        localStorage.removeItem("rememberedUsername");
      }

      if (res.data.success) {
        // 登入成功動畫
        setLoginState({ success: true, message: "登入成功，正在跳轉..." });

        // 延遲導航以顯示成功訊息
        setTimeout(() => {
          navigate("/admin/products");
        }, 1000);
      }
    } catch (error) {
      console.error("登入錯誤:", error);

      // 處理不同類型的錯誤
      if (error.response) {
        // 伺服器回應的錯誤
        setLoginState(error.response.data);
      } else if (error.request) {
        // 請求發送但沒有收到回應
        setLoginState({ message: "無法連接到伺服器，請檢查您的網絡連接" });
      } else {
        // 其他錯誤
        setLoginState({ message: "登入過程中發生錯誤，請稍後再試" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${loginImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="brand-logo">
              <i className="fas fa-plane-departure"></i>
            </div>
            <h2 className="login-title">旅遊管理系統</h2>
            <p className="login-subtitle">請登入以繼續</p>
          </div>

          {loginState.message && (
            <div
              className={`alert ${
                loginState.success ? "alert-success" : "alert-danger"
              } animate__animated animate__fadeInDown`}
              role="alert"
            >
              <i
                className={`fas ${
                  loginState.success
                    ? "fa-check-circle"
                    : "fa-exclamation-circle"
                } me-2`}
              ></i>
              {loginState.message}
            </div>
          )}

          <form onSubmit={submit} className="login-form">
            <div className="form-group mb-4">
              <label htmlFor="email" className="form-label">
                電子郵件
              </label>
              <div
                className={`input-group ${
                  !validation.username.valid ? "has-validation" : ""
                }`}
              >
                <span className="input-group-text">
                  <i className="fas fa-envelope"></i>
                </span>
                <input
                  id="email"
                  className={`form-control ${
                    !validation.username.valid ? "is-invalid" : ""
                  }`}
                  name="username"
                  type="email"
                  placeholder="請輸入您的電子郵件"
                  onChange={handleChange}
                  value={data.username}
                  required
                />
                {!validation.username.valid && (
                  <div className="invalid-feedback">
                    {validation.username.message}
                  </div>
                )}
              </div>
            </div>

            <div className="form-group mb-4">
              <div className="d-flex justify-content-between">
                <label htmlFor="password" className="form-label">
                  密碼
                </label>
                <a href="#" className="forgot-password">
                  忘記密碼?
                </a>
              </div>
              <div
                className={`input-group ${
                  !validation.password.valid ? "has-validation" : ""
                }`}
              >
                <span className="input-group-text">
                  <i className="fas fa-lock"></i>
                </span>
                <input
                  type="password"
                  className={`form-control ${
                    !validation.password.valid ? "is-invalid" : ""
                  }`}
                  name="password"
                  id="password"
                  placeholder="請輸入您的密碼"
                  onChange={handleChange}
                  value={data.password}
                  required
                />
                {!validation.password.valid && (
                  <div className="invalid-feedback">
                    {validation.password.message}
                  </div>
                )}
              </div>
            </div>

            <div className="form-check mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={handleRememberMe}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                記住我
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 login-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  登入中...
                </>
              ) : (
                "登入系統"
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>© {new Date().getFullYear()} 旅遊管理系統. 保留所有權利</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
