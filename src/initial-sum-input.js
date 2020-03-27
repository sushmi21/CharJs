import React from 'react';
import PropTypes from 'prop-types';

// Initial sum value is needed by the sibling components table and chart, so maintain the state in parent component App
const InitialSumInput = ({ initialSum, onInitialSumChange }) => {
  // Change listener
  const handleInitialSumChange = event => {
    const sum = Number(event.target.value);
    onInitialSumChange(sum); // callback to parent
  };

  return (
    <div>
      Initial Sum:
      <input
        type="text"
        name="sum"
        value={initialSum} //prop from parent to show the default value and changed value
        onChange={handleInitialSumChange}
      />
    </div>
  );
};

InitialSumInput.defaultProps = {
  onInitialSumChange: () => {},
  initialSum: 10000
};

InitialSumInput.propTypes = {
  onInitialSumChange: PropTypes.func,
  initialSum: PropTypes.number
};
export default InitialSumInput;
