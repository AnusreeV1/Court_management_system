import { Route, Switch } from "react-router-dom";

import Home from "./pages/Home";

import ClientAuth from "./pages/Client/ClientAuth";
import ClientsPage from "./pages/Client/Clients";

import LawyerAuth from "./pages/Lawyers/LawyerAuth";
import LawyersPage from "./pages/Lawyers/Lawyers";
import SignIn from "./pages/Lawyers/components/LawyerSignin";

import JudgesAuth from "./pages/Judges/JudgeAuth";
import JudgesPage from "./pages/Judges/Judges";

import CourtAuth from "./pages/Courts/CourtAuth";
import CourtPage from "./pages/Courts/Courts";

import SuperAdmin from "./pages/superadmin/sadmin";
import SadminAuth from "./pages/superadmin/sadminauth";

const Navigation = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/clientsauth" exact>
        <ClientAuth />
      </Route>
      <Route path="/clients" exact>
        <ClientsPage />
      </Route>
      <Route path="/lawyers" exact>
        <LawyersPage />
      </Route>
      <Route path="/lawyersauth" exact>
        <SignIn />
      </Route>
      <Route path="/judgesauth" exact>
        <JudgesAuth />
      </Route>
      <Route path="/judges" exact>
        <JudgesPage />
      </Route>
      <Route path="/courtsauth" exact>
        <CourtAuth />
      </Route>
      <Route path="/courts" exact>
        <CourtPage />
      </Route>
      <Route path="/sadmin" exact>
        <SuperAdmin />
      </Route>
      <Route path="/sauth" exact>
        <SadminAuth />
      </Route>
    </Switch>
  );
};

export default Navigation;

