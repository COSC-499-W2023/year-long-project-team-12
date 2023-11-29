import React from 'react';
import "./DoesNotExist.scss";


function DoesNotExist() {
  return (
    <div className="doesNotExistContainer">
      <div className="header">
      <h2 data-testid="info"> Sorry, The Page you want to visit does not Exist :)</h2>
      </div>
    </div>
  );
};

export default DoesNotExist;