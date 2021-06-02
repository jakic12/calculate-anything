import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useParams } from "react-router";
import './App.css';
import CreateCalculator from './components/CreateCalculator';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" children={<CreateCalculator />} />
      </Switch>
    </Router>
  );
}

export default App;
