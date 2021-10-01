import './App.css';
import Messenger from './pages/messenger/Messenger';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import UploadImage from './pages/uploadImage/UploadImage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
        {user ? <Messenger /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route exact path="/uploadImage">
        <UploadImage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
