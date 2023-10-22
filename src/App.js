import logo from './logo.svg';
import './App.css';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Contact from './Components/Contact/Contact';
//import Fetchexceldata from './Components/Excel/Fetchexceldata';
import Product from './Components/Header/Product';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Signin/>}/>
      <Route path='/Signup' element={<Signup/>}/>
      <Route path='/Contact' element={<Contact/>}/>
      <Route path='/Excel' element={<Product/>}/>
     </Routes>
     </BrowserRouter>
     
    </div>
  );
}

export default App;
