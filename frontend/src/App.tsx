import React from 'react';
import './App.css';
import Map from "./component/map";

const App: React.VFC = () => {
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
