import React from 'react';
import Square from './Square';

// guess: this will have the state of each square and turn as a prop
class Board extends React.Component {

  constructor(props) {
    super(props);
    // TODO determine if this does anything
    // NOTE it does not do anything, they are passed by reference
    // NOTE if you want to make properties immutable, then prevent writing
    const marks = Array(9).fill(null);
    const turn = 0;
    this.state = {
      marks,
      turn
    };
  }
  // NOTE i suspect the "i" in handleClick is the most important lesson here
  // WARN apparently it wasn't, some weird thing about copying array is inc
  /* NOTE wasn't that weird...just very forward thinking about usefulness
   * of not losing information...anyway, don't let that distract from "i"
   */

  handleClick(i) {
    // get a copy of the marks array in state
    const marks = this.state.marks.slice();
    // set the mark for the respective square
    marks[i] = (this.state.turn % 2 === 0) ? 'X' : 'O';
    // get a copy of the turn (integers are primitive)
    const turn = this.state.turn + 1;
    // update board and turn
    this.setState({
      marks,
      turn
    });
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
    let status = this.state.turn % 2 === 0 ? 'Player: X\'s turn' :
      'Player Y\'s turn';

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

//
// helper functions, not method of Board (not exported)
//
function checkEnd(marks) {
  let winner = null;
  //
  // check for a player victory
  //
  // check rows
  if (winner = checkLine(0, 2, 1, marks)) { return winner; }
  if (winner = checkLine(3, 5, 1, marks)) { return winner; }
  if (winner = checkLine(6, 8, 1, marks)) { return winner; }
  // check columns
  if (winner = checkLine(0, 3, 6, marks)) { return winner; }
  if (winner = checkLine(1, 3, 7, marks)) { return winner; }
  if (winner = checkLine(2, 3, 8, marks)) { return winner; }
  // check diagonals
  if (winner = checkLine(0, 8, 3, marks)) { return winner; }
  if (winner = checkLine(2, 6, 2, marks)) { return winner; }
  // check for a draw
  return stalemate(marks) ? 'draw' : false;
}

// TODO implement using rest, best of both worlds (2D array + no hardcode)
function checkLine(start, end, increment, marks) {
  // check to see if every mark is the same
  let same = true;
  let toCompare = marks[start];
  for (let i = start + increment; i <= end; i += increment) {
    // check if new mark is the same as old mark
    if (marks[i] !== toCompare) {
      same = false;
    }
    // update "previous mark checked"
    toCompare = marks[i];
  }
  // if the same, winner is mark[i] (either X or O)
  return same ? toCompare : null;
}

function stalemate(marks) {
  let gameOver = true;
  marks.forEach(function(mark) {
    if (!mark) {
      gameOver = false;
    }
  });
  return gameOver;
}

/* AVOID MUTATIONS (first example: slice array of marks, instead of editing):
 *
 * NOTE Complex Features Become Simple
 *
 * Immutability makes complex features much easier to implement. Later in this
 * tutorial, we will implement a “time travel” feature that allows us to review
 * the tic-tac-toe game’s history and “jump back” to previous moves. This
 * functionality isn’t specific to games — an ability to undo and redo certain
 * actions is a common requirement in applications. Avoiding direct data
 * mutation lets us keep previous versions of the game’s history intact, and
 * reuse them later.
 *
 * NOTE Detecting Changes
 *
 * Detecting changes in mutable objects is difficult because they are modified
 * directly. This detection requires the mutable object to be compared to
 * previous copies of itself and the entire object tree to be traversed.
 *
 * Detecting changes in immutable objects is considerably easier. If the
 * immutable object that is being referenced is different than the previous
 * one, then the object has changed.
 *
 * NOTE Determining When to Re-render in React
 *
 * The main benefit of immutability is that it helps you build pure components
 * in React. Immutable data can easily determine if changes have been made
 * which helps to determine when a component requires re-rendering.
 *
 * You can learn more about shouldComponentUpdate() and how you can build pure
 * components by reading Optimizing Performance. */

export default Board;
