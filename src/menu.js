import React from 'react';
import { Link } from 'react-router-dom';

// Converting class components to stateless function comoponents
const Menu = () => {
  return (
    <div>
      <p>
        <Link to="/table">Table</Link>
      </p>
      <p>
        <Link to="/chart">Chart</Link>
      </p>
    </div>
  );
};

export default Menu;
