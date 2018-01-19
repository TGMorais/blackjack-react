import React from "react";

import './score.css';

const Score = ({ score }) => {
  return (
      <div className={`score`}>
          {score}
      </div>
  )
};

export default Score;
