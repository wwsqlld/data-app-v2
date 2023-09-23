import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

import {Home} from './pages/Home.js';
import {Auth} from './pages/Auth.js';
import {CreateData} from './pages/CreateData.js';
import { Register } from './pages/Register.js';
import { IndPerson } from './pages/IndPerson.js';
import Navbar from './components/navbar';

function App() {
 

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<CreateData />} />
          <Route path='/auth' element={<Auth  />} />
          <Route path='/register' element={<Register  />} />
          <Route path='/person/:id' element={ <IndPerson /> } />
        </Routes>
      </BrowserRouter>    
    </div>
  );
}

export default App;
