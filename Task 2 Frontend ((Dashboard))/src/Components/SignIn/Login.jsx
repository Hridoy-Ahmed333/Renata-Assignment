import { useState } from "react";
import { login } from "../../Utills/userDaraFetch";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useUser } from "../../Context/UserContexts";

function Login({ setSwitched }) {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { setRole } = useUser();

  const handleSwitching = (e) => {
    e.preventDefault();
    setSwitched((switched) => !switched);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    try {
      const data = login(loginData.email, loginData.password);
      if (data?.success) {
        setRole(data.user.role);
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            email: data.user.email,
            role: data.user.role,
          })
        );
        toast.success("Successfully logged in");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="sn-container">
      <div className="fst-form-container">
        <div className="fst-left-section">
          <h1>Login</h1>
          <form className="fst" onSubmit={handleLoginSubmit}>
            <div className="fst-input-group">
              <input
                type="email"
                placeholder="Email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />
            </div>
            <div className="fst-input-group">
              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
            </div>
            <button type="submit" className="fst-btn">
              Login
            </button>
          </form>
          <div className="switch" onClick={handleSwitching}>
            Want to Register? <span>Sign Up</span>
          </div>
        </div>
        <div className="fst-right-section">
          <h1>To Login</h1>
          <p>Use the data given at top</p>
          <p>Or, do Registration</p>
          <div
            className="visit-dash"
            onClick={() => {
              localStorage.setItem(
                "currentUser",
                JSON.stringify({
                  email: "new@gmail.com",
                  role: "Visitor",
                })
              );
              navigate("/");
            }}
          >
            Visit Dashboar as a visitor
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
