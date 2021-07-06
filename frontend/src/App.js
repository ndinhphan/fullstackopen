import { Switch, Route, Redirect } from "react-router-dom";

import Notification from "./components/Notification/index";
import Menu from "./components/Menu/index";

import About from "./pages/About/index";
import Homepage from "./pages/Homepage/index";

const App = () => {
  const routes = [
    {
      path: "/about",
      component: About,
    },
    {
      path: "/",
      component: Homepage,
    },
    {
      path: "*",
      render: () => <Redirect to="/" />,
    },
  ];
  const renderRoutes = routes.map((r) =>
    r.render ? (
      <Route path={r.path} render={r.render} />
    ) : (
      <Route path={r.path} component={r.component} />
    )
  );
  return (
    <div>
      <h2>Anecdotes</h2>
      <Menu />
      <Notification />
      <Switch>
        {renderRoutes}
        {/* <Route path="/about" component={About} />
        <Route path="/" component={Homepage} />
        <Route path="*" render={() => <Redirect to="/" />} /> */}
      </Switch>
    </div>
  );
};

export default App;
