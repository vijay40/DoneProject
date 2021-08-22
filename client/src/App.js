import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Topbar from './components/Topbar';
import ListPatients from './pages/ListPatients';
import Login from './pages/Login';
import RegisterPatient from './pages/RegisterPatient';

function App() {
  return (
    <Router>
      <div className="App">
        <Topbar />

        <div className="main-wrapper">
          <Switch>
            <Route exact path="/" component={RegisterPatient} />
            <Route path="/admin/login" component={Login} />
            <Route path="/patient/register" component={RegisterPatient} />
            <Route path="/patient/list" component={ListPatients} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
