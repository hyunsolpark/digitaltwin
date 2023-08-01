import Nav from "./Nav";
import { Route,Routes} from 'react-router-dom';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';
import Chart from './ChartPage';
import Login from "./Login";
import Info from "./Info";

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Nav/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/chart" element={<Chart/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/info/:id" element={<Info/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
