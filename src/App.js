import logo from './burguermu.png';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from
'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import Contact from './screens/Contact';
import About from './screens/About';

 
function App() {
  return (
    <div className="App">
      <header className="App-header">
      <NavBar/>
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
      <img src={logo} className="App-logo" alt="logo" />
        <p>
          Melhor Burguer do Muundo
        </p>
       </header>
    </div>
  );
}
 
export default App;