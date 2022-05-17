import Login from "./components/Login";
import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route exact path="/" element={ <Login /> }>
          </Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
