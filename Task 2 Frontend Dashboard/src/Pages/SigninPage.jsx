import { useState } from "react";
import Login from "../Components/SignIn/Login";
import Registration from "../Components/SignIn/Registration";
import "./login.css";

function SigninPage() {
  const [switched, setSwitched] = useState(false);
  return (
    <div className="sub-bd">
      <div className="info-div-pass">
        <div>These are testing data (test users)</div>
        <div>{`Admin:{email:"abc@gmail.com", pass:"abc"}`}</div>
        <div>{`Sales Rep:{email:"xyz@gmail.com", pass:"xyz"}`}</div>
        <div>{`Viewr:{email:"pqr@gmail.com", pass:"pqr"}`}</div>
      </div>
      {switched ? (
        <Registration setSwitched={setSwitched} />
      ) : (
        <Login setSwitched={setSwitched} />
      )}
    </div>
  );
}

export default SigninPage;
