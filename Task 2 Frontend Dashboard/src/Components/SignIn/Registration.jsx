import { useState } from "react";
import { register } from "../../Utills/userDaraFetch";
import "./signupfrom.css";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContexts";

function Registration({ setSwitched }) {
  const [registrationData, setRegistrationData] = useState({
    email: "",
    role: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setRole } = useUser();

  const handleSwitching = (e) => {
    e.preventDefault();
    setSwitched((switched) => !switched);
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    try {
      const data = register(registrationData);
      if (data?.success) {
        setRole(data.user.role);
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            email: data.user.email,
            role: data.user.role,
          })
        );
        navigate("/");
        toast.success("Success fully Registered");
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
          <h1>Registration</h1>
          <form className="fst" onSubmit={handleRegistrationSubmit}>
            <div className="fst-input-group">
              <input
                type="email"
                placeholder="Email"
                value={registrationData.email}
                onChange={(e) =>
                  setRegistrationData({
                    ...registrationData,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div className="fst-input-group">
              <select
                className="select"
                value={registrationData.role}
                onChange={(e) =>
                  setRegistrationData({
                    ...registrationData,
                    role: e.target.value,
                  })
                }
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Sales Representative">
                  Sales Representative
                </option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>

            <div className="fst-input-group">
              <input
                type="password"
                placeholder="Password"
                value={registrationData.password}
                onChange={(e) =>
                  setRegistrationData({
                    ...registrationData,
                    password: e.target.value,
                  })
                }
              />
            </div>
            <button type="submit" className="fst-btn">
              Register
            </button>
          </form>
          <div className="switch" onClick={handleSwitching}>
            Already have an account? <span>Log In</span>
          </div>
        </div>
        <div className="fst-right-section">
          <h1>WELCOME TO MY WEBSITE!</h1>
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

export default Registration;
