import React from 'react';
import RandomVerse from './components/RandomVerse';
import SpecificVerse from './components/SpecificVerse';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="container">
        <div className="frame">
          <h2>Generate a Bible Verse</h2>
          <RandomVerse />
        </div>
        <div className="frame">
          <h2>Search for a Bible Verse</h2>
          <SpecificVerse />
        </div> 
      </div>
    </div>
  );
}

export default App;
