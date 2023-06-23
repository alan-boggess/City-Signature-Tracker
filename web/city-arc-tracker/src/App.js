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

  const [charId, setCharId] = useState(() => {
    const json = localStorage.getItem('charId');
    const charId = JSON.parse(json);
    if (charId) {
      return charId;
    }
    else return characters.length;
  });

  useEffect(() => {
    const json = JSON.stringify(characters);
    localStorage.setItem('characters', json);
  }, [characters]);

  useEffect(() => {
    const json = JSON.stringify(charId);
    localStorage.setItem('charId', json);
  }, [charId]);

  return (
    <div className="App">
      <header className="App-header">
        <center>
          <table>
            <thead>
              <tr>
                <th></th>
                <th></th>
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
                  <td>
                    <button onClick={() => {
                      setCharacters(characters.filter(char => char.name !== c.name))
                    }}>X</button>
                  </td>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{LockoutTime(c, c.morality)}</td>
                  <td>{LockoutTime(c, c.merits)}</td>
                  <td>{LockoutTime(c, c.astral)}</td>
                  <td>{LockoutTime(c, c.threads)}</td>
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
              { id: charId, name: charName, alignment: 'hero' }
             ]);
            setCharId(charId + 1);
          }}>Add Character</button>
        </center>
      </header>
    </div>
  );
}

function LockoutTime(character, time) {
  if (time)
    return time;
  else {
    return (
      <button onClick={() => {
      }}>Cleared</button>
    )
  }
}

export default App;
