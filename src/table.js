import React, { useEffect, useState } from 'react'; // ES6 import
import PropTypes from 'prop-types';
import calculateTimeSeries from './utils';

const Table = ({ riskLevel, cones, initialSum }) => {
  // cones data received from App component
  const cone = cones.filter(conesData => conesData.riskLevel === riskLevel)[0]; // "=="" to ""==="
  const fee = 0.01;
  const [rows, setRows] = useState(null);

  useEffect(() => {
    const getTimeSeries = async () => {
      const timeSeries = await calculateTimeSeries({
        mu: cone.mu,
        sigma: cone.sigma,
        years: 10,
        initialSum, // from props
        monthlySum: 200,
        fee
      });

      const months = await timeSeries.median.map((v, idx) => idx); //does not have to be an array instead do .median.length;
      const dataGood = await timeSeries.upper95.map(v => v.y);
      const dataMedian = await timeSeries.median.map(v => v.y);
      const dataBad = await timeSeries.lower05.map(v => v.y);

      // Can be replaced by a for loop from 0 to months-1
      const rowContent = await months.map((entry, idx) => (
        // no array index key. changed "idx" to "entry"
        <tr key={entry}>
          <td>{entry}</td>
          <td>{dataGood[idx]}</td>
          <td>{dataMedian[idx]}</td>
          <td>{dataBad[idx]}</td>
        </tr>
      ));

      setRows(rowContent);
    };
    getTimeSeries();
  }, []);

  //  Eliminating the usage of create react element for readability
  const tableHeader = (
    <tr>
      <th>month</th>
      <th>good</th>
      <th>median</th>
      <th>bad</th>
    </tr>
  );

  return (
    <table>
      <thead>{tableHeader}</thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

Table.defaultProps = {
  riskLevel: 3,
  initialSum: 10000
};

Table.propTypes = {
  riskLevel: PropTypes.number,
  cones: PropTypes.arrayOf(PropTypes.object).isRequired, // cones array cannot be empty
  initialSum: PropTypes.number
};

export default Table;
