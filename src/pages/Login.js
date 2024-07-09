import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [loginState, setLoginState] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async (e) => {
    try {
      const res = await axios.post("/v2/admin/signin", data);
      const { token, expired } = res.data;
      console.log(res);
      document.cookie = `Token=${token};expires=${new Date(expired)}`;
      //儲存 Token
      if (res.data.success) {
        navigate("/admin/products");
      }
    } catch (error) {
      setLoginState(error.response.data);
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1505069446780-4ef442b5207f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="col-md-5">
        <p className="mb-4 text-center text-white fs-2 login-title">
          管理後台登入
        </p>

        <div
          className={`alert alert-danger ${
            loginState.message ? "d-block" : "d-none"
          } animate__animated animate__fadeInDown`}
          role="alert"
        >
          {loginState.message}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label w-100 text-white">
            Email
            <input
              id="email"
              className="form-control rounded-3 shadow-sm"
              name="username"
              type="email"
              placeholder="Email Address"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label w-100 text-white">
            密碼
            <input
              type="password"
              className="form-control rounded-3 shadow-sm"
              name="password"
              id="password"
              placeholder="name@example.com"
              onChange={handleChange}
            />
          </label>
        </div>
        <button
          type="button"
          className="btn btn-secondary w-100 rounded-3 shadow-sm"
          onClick={submit}
        >
          登入
        </button>
      </div>
    </div>
  );
}

export default Login;
