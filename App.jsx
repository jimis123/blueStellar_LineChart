import React from 'react';
import './App.css';
import LineChart from './Components/LineChart';
import TimeSeriesTable from '../src/Components/TimeSeriesTable.jsx';



function App() {
  return (
    <div className="App">
      <h1 style={{textDecorationLine: 'underline', color: 'blue'}}>
        Hello StellarBlue Company
      </h1>

      <TimeSeriesTable/>
      
      <LineChart />

      

    </div>
  );
}

export default App;