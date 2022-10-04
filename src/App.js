import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import localization from './localization/en-US.json';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AddDoor from './components/AddDoor';

function App() {
  window.bundle = localization;
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/door-add" element={<AddDoor />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
