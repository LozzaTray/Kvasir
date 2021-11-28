import React from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './component/map'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pint Map</h1>
      </header>
      <div>
        <Map />
      </div>
    </div>
  );
}

export default App;
