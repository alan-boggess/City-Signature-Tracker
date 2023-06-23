import './App.css';
import { useState, useEffect } from 'react';

const moralityMerit = 'ALIGNMENT';
const rewardMerits = 'MERITS';
const astralMerit = 'ASTRAL';
const incarnateThreads = 'THREADS';

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
                  <td>{LockoutTime(c, c.morality, moralityMerit)}</td>
                  <td>{LockoutTime(c, c.merits, rewardMerits)}</td>
                  <td>{LockoutTime(c, c.astral, astralMerit)}</td>
                  <td>{LockoutTime(c, c.threads, incarnateThreads)}</td>
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
  
  function LockoutTime(character, time, reward) {
    if (time) {
      if (time > Date.now()) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', hour12: true, minute: 'numeric' };
        return (
          <>
          {new Date(time).toLocaleDateString(undefined, options)}
          <button onClick={() => {
            if (reward === moralityMerit) {
              character.morality = null;
            }
            if (reward === rewardMerits) {
              character.merits = null;
            }
            if (reward === astralMerit) {
              character.astral = null;
            }
            if (reward === incarnateThreads) {
              character.threads = null;
            }
            let newCharacters = [...characters];
            setCharacters(newCharacters);
          }}>X</button>
          </>
        )
      }
    }
    return (
      <button onClick={() => {
        let timestamp = Date.now();
        let lockout = timestamp + 162 * 3600 * 1000;
        if (reward === moralityMerit) {
          character.morality = lockout;
        }
        if (reward === rewardMerits) {
          character.merits = lockout;
        }
        if (reward === astralMerit) {
          character.astral = lockout;
        }
        if (reward === incarnateThreads) {
          character.threads = lockout;
        }
        let newCharacters = [...characters];
        setCharacters(newCharacters);
      }}>Cleared</button>
    )
  }
}

export default App;
