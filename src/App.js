import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue} from "./StateProvider";
import Login from "./Login";

function App() {
  const [{ user },dispatch]=useStateValue();
  return (
    <div className="app">
      {!user ? (
        <Login/>
      ) : (
        <div className="app_body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
