import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes,Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Secondpage from './components/Secondpage';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='main' element={<Secondpage/>}/>

      </Routes>

    </div>
  );
}

export default App;
