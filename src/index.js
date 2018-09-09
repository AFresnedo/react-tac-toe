import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// guess: requires X or O passed as a prop, does NOT have state
class Square extends React.Component {

  constructor(props) {
    super(props);
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
      <button className="square" onClick={this.props.markIt}>
        { this.props.mark }
      </button>
    );
  }
}

// guess: this will have the state of each square and turn as a prop
class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      marks: Array(9).fill(null)
    };
  }
  // NOTE i suspect the "i" in handleClick is the most important lesson here
  // WARN apparently it wasn't, some weird thing about copying array is inc
  handleClick(i) {
    // get a copy of the marks array in state
    const marks = this.state.marks.slice();
    // mark the proper square
    marks[i] = 'X';
    // update board
    this.setState({ marks });
  }
  // NOTE this is really cool, not necessary to put <Component /> in JSX
  // NOTE parenthesis for return ( ) are to control javascripts' autosemicolon
  renderSquare(i) {
    return (
      <Square
        mark={this.state.marks[i]}
        markIt={() => this.handleClick(i)}
      />);
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
