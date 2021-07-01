import React from "react";
import { Route, Switch } from "react-router-dom";
import { Compare } from "./pages/Compare";
import StepByStep from "./pages/StepByStep";
import { AppNavbar } from "./components/AppNavbar";
import { useEmbedState } from "./hooks";
import { Embed } from "./pages/Embed";
import { Quiz } from "./pages/Quiz";
import { Home } from "./pages/Home";

function App() {
  const embedded = useEmbedState();

  return (
    <>
      {!embedded && <AppNavbar></AppNavbar>}
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route exact path="/compare">
          <Compare></Compare>
        </Route>
        <Route exact path="/steps">
          <StepByStep></StepByStep>
        </Route>
        <Route exact path="/quiz">
          <Quiz></Quiz>
        </Route>
        <Route exact path="/embed">
          <Embed></Embed>
        </Route>
      </Switch>
    </>
  );
}

export default App;
