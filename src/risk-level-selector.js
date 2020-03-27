import React from 'react';
import PropTypes from 'prop-types';

// no state or lifecycle methods, hence can be written as function componet

const RiskLevelSelector = ({
  minRiskLevel,
  maxRiskLevel,
  onChangeRiskLevel
}) => {
  const defultRiskl = 10;
  const options = [];

  const onChange = event => {
    const riskLevel = Number(event.target.value);
    onChangeRiskLevel(riskLevel);
  };

  // only have values greater than or equal to min risk level (i.e. from 3)
  for (let k = minRiskLevel; k <= maxRiskLevel; k += 1) {
    options.push(
      <option key={k} value={k}>
        {k}
      </option>
    );
  }

  return (
    <div>
      Risk level:
      <select onChange={onChange} defaultValue={defultRiskl}>
        {options}
      </select>
    </div>
  );
};

// Prop validation
RiskLevelSelector.defaultProps = {
  minRiskLevel: 3,
  maxRiskLevel: 25,
  onChangeRiskLevel: () => {}
};

RiskLevelSelector.propTypes = {
  minRiskLevel: PropTypes.number,
  maxRiskLevel: PropTypes.number,
  onChangeRiskLevel: PropTypes.func
};

export default RiskLevelSelector;
