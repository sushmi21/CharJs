import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Menu from './menu';
import RiskLevelSelector from './risk-level-selector';
import Table from './table';
import Chart from './chart';
import InitialSumInput from './initial-sum-input';

// Class components can be written as functional components using hooks from react 16.8.0
// Upgraded react an react-dom dependency to latest version to use hooks
const App = () => {
  const [riskLevel, setRiskLevel] = useState(3);
  const [initialSum, setInitialSum] = useState(10000);
  const [cones, setCones] = useState([]);

  // Cones data is needed by Table and Chart child componments, so fetch data here in parent and send to children as props
  useEffect(() => {
    const fetchCones = () => {
      fetch('http://localhost:3000/api/cones', {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response;
        })
        .then(response => response.json())
        .then(response => setCones(response))
        .catch(error => console.log(error));
    };
    fetchCones();
  }, []);

  return (
    <Router>
      <div>
        <Menu />
        {/* Show a loader until the cones data is fetched. */}
        {cones.length !== 0 ? (
          <>
            <RiskLevelSelector
              onChangeRiskLevel={levelOfRisk => setRiskLevel(levelOfRisk)}
            />
            {/* Inpu component for comonent*/}
            <InitialSumInput
              initialSum={initialSum}
              onInitialSumChange={sum => setInitialSum(sum)}
            />
            {/* Send cones and initialSum props to childres */}
            <Route
              exact
              path="/"
              component={() => (
                <Table
                  riskLevel={riskLevel}
                  cones={cones}
                  initialSum={initialSum}
                />
              )}
            />
            <Route
              path="/table"
              component={() => (
                <Table
                  riskLevel={riskLevel}
                  cones={cones}
                  initialSum={initialSum}
                />
              )}
            />
            <Route
              path="/chart"
              component={() => (
                <Chart
                  riskLevel={riskLevel}
                  cones={cones}
                  initialSum={initialSum}
                />
              )}
            />
          </>
        ) : (
          //Loading indicator, until the cones data are fetched
          <div>Loading data...</div>
        )}
      </div>
    </Router>
  );
};
export default App;
