import { Switch, Route } from "react-router-dom";

import Notification from "./components/Notification/index";
import Menu from "./components/Menu/index";

import About from "./pages/About/index";
import Homepage from "./pages/Homepage/index";


const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Menu />
      <Notification />
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/">
          <Homepage/>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
