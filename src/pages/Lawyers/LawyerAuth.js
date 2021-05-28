import { useState } from "react";
import Signup from "./components/LawyerSignup";
import Signin from "./components/LawyerSignin";

const ClientAuthPage = () => {
  const [signupState, setsignupState] = useState(true);

  const signupHandler = () => setsignupState((state) => !state);

  return (
    <div>
      {signupState ? (
        <Signup Handler={signupHandler} />
      ) : (
        <Signin Handler={signupHandler} />
      )}
    </div>
  );
};

export default ClientAuthPage;