import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// guess: requires X or O passed as a prop, does NOT have state
class Square extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mark: null
    };
  }
  render() {

    /* WARN tons of mistakes getting the onClick to mark as "X"
     * errors include: not respecting that state is private
     *    - trying to set this.state.mark
     *    - trying to set this.state = { mark:...
     *    - not using setState
     * also include: missing the key design that the state of THIS is just
     * one box that knows about itself...for a second you thought this code
     * would mark "X" on all components because they are all Square
     * but this should never be a thought, each square has its own state
     */
    return (
      <button className="square"
        onClick={( () => {
          this.setState({mark: 'X'})}
        )}>
        { this.state.mark }
      </button>
    );
  }
}

// guess: this will have the state of each square and turn as a prop
class Board extends React.Component {
  // NOTE this is really cool, not necessary to put <Component /> in JSX
  renderSquare(i) {
    return <Square index={i}/>;
  }

  render() {
    /* guess: this will not be const OR will be a prop passed into board
     * probably a prop, since we have a "game" parent component
     */
    // guess: does NOT have a helper to pass to square
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// guess: passes game turn (its state) as a prop to board
// guess: has a helper that it passes to board to change game turn
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
