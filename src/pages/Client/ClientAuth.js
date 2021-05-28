import { useState } from "react";
import Signup from "./components/ClientSignup";
import Signin from "./components/ClientSignin";

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
