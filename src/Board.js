import React from 'react';
import Square from './Square';

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
  /* NOTE wasn't that weird...just very forward thinking about usefulness
   * of not losing information...anyway, don't let that distract from "i"
   */

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
