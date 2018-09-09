import React from 'react';

// guess: requires X or O passed as a prop, does NOT have state
// NOTE guess was correct! ayeeeee
function Square(props) {
  return (
    <button className="square" onClick={props.markIt}>
      {props.mark}
    </button>
  );
}

export default Square;
