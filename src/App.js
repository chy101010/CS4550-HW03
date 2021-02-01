import './App.css';

// My import
import { useState } from 'react';
import { generateSecret, validGuess, compareGuess } from './GameLogic';

function App() {
  // User guesses
  const [guesses, setGuesses] = useState([]);
  // Secret key: 
  // Initial State: 4 random unique digits 
  const [secret, setSecret] = useState(generateSecret());
  // Lives
  const [lives, setLives] = useState(8);
  // Message
  const [message, setMessage] = useState("Enter 4 Digits!");
  // Results
  const [result, setResult] = useState([]);
  // User input
  const [input, setInput] = useState('');
  // Game State
  const [game, setGame] = useState(true);


  /*
    Process a guess
  */
  const submitGuess = () => {
    const isValid = validGuess(guesses, input);
    // Set the message
    setMessage(isValid.message);
    if (isValid.status === 0) {
      // append to guess list
      setGuesses([...guesses, input]);
      // append to result list
      const compare = compareGuess(input, secret);
      setResult([...result, compare.message]);
      if (compare.status === -1) {
        setLives(prev => prev - 1);
        if (lives - 1 === 0) {
          setGame(false);
          setMessage("Lost The Game!")
        }
      }
      else {
        setGame(false);
        setMessage("Won The Game!");
      }
      // clear the input 
      setInput("");
    }
  }

  /* onChange handler for the text-input element, set the state {input} to text-input's value, 
     if the state {input}'s length is less than or equal to 4.
  */
  const handleOnChange = ({ target }) => {
    if (target.value.length <= 4 && game) {
      setInput(target.value);
    }
  }

  /* onKeyDown handler for the text-input element
     if "Enter" is pressed, then the guess of the user will be processed
     if "BackSpace" is pressed, then we remove the last character of the state {input}
  */
  const handleKeyDown = (event) => {
    if (game) {
      if (event.key === "Enter") {
        submitGuess();
      }
      else if (event.key === "Backspace") {
        setInput(input.substring(0, input.length));
      }
    }
  }

  /* onClick hanlder for the button-input element
     if this element is clicked, then the guess of the user will be processed
  */
  const handleClickGuess = () => {
    if (game) {
      submitGuess();
    }
  }


  /* onClick hanlder for the button-input element
     if this element is clicked, then the game will be resetted
  */
  const handleClickReset = () => {
    setSecret(generateSecret());
    setGuesses([]);
    setLives(8);
    setMessage("New Game!");
    setResult([]);
    setInput("");
    setGame(true);
  }


  // Render()
  let displaySecret;
  if (!game) {
    displaySecret = `The Secret: ${secret}`;
  }
  let rows = [];
  for (let i = 0; i < guesses.length; i++) {
    let oldGuess = <td>{guesses[i]}</td>;
    let message = <td>{result[i]}</td>;
    rows.push(<tr>{[oldGuess, message]}</tr>);
  }
  return (
    <div className="App">
      <h1>4 Digits</h1>
      <h4>{message}</h4>
      <h5>Lives:{lives}</h5>
      <input id="input" onChange={handleOnChange} onKeyDown={handleKeyDown} value={input} tpye="text" />
      <input onClick={handleClickGuess} type="button" value="Guess!" />
      <input onClick={handleClickReset} className="button button-clear" type="button" value="Reset" />
      <table>
        <thead>
          <tr>
            <td>Guess</td>
            <td>Result</td>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
      <h2>{displaySecret}</h2>
      <p>Note: If the matching digits are in their right positions, they are "bulls", if in different positions, they are "cows".</p>
    </div>);
}



export default App;
