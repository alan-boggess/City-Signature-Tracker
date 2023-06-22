import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App({ characterStore }) {
  const [charName, setCharName] = useState('');
  const [characters, setCharacters] = useState(() => {
    const json = localStorage.getItem('characters');
    const savedCharacters = JSON.parse(json);
    if (savedCharacters) {
      return savedCharacters;
    }
    else return [];
  });

  let nextId = 0;

  useEffect(() => {
    const json = JSON.stringify(characters);
    localStorage.setItem('characters', json);
  }, [characters]);

  return (
    <div className="App">
      <header className="App-header">
        <center>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Alignment Merit</th>
                <th>20 Merits</th>
                <th>Astral Merit</th>
                <th>Threads</th>
              </tr>
            </thead>
            <tbody>
              {characters.map( c => (
                <tr>
                  <td>{c.name}</td>
                  <td>placeholder text</td>
                </tr>
                ))
              }
            </tbody>
          </table>
          <input
            value={charName}
            onChange={c => setCharName(c.target.value)}
          />
          <button onClick={() => {
            setCharacters([
              ...characters,
              { id: nextId++, name: charName }
             ]);
          }}>Add Character</button>
        </center>
      </header>
    </div>
  );
}

export default App;
