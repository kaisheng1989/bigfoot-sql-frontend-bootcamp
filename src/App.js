import logo from './logo.svg';
import './App.css';
import List from "./Components/List";
import SightingDetails from './Components/SightingDetails';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Router>
          <Routes>
            <Route path="/" element={<List />}></Route>
            <Route path="/details/:id" element={<SightingDetails />}></Route>
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
