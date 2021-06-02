import logo from './logo.svg';
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useParams } from "react-router";
import './App.css';
import Calculator from './components/Calculator';
import CreateCalculator from './components/CreateCalculator';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/calculator" children={<Calculator />} />
        <Route path="/" children={<CreateCalculator />} />
      </Switch>
    </Router>
  );
}

export default App;
