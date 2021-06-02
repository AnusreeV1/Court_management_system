import { useState } from "react";
import Signin from "./components/signin";

const ClientAuthPage = () => {
  const [signupState, setsignupState] = useState(true);

  const signupHandler = () => setsignupState((state) => !state);

  return (
    <div>
        <Signin Handler={signupHandler} />
    </div>
  );
};

export default ClientAuthPage;