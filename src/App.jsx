import { useState, useCallback, useEffect } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += "!@#$%^&*()_+[]{}|;:',.<>?/`~";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  // ✅ Copy to clipboard function
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  };

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-xl px-4 py-8 my-10 bg-yellow-400 text-zinc-700'>
      <h1 className='text-2xl text-center font-bold mb-4'>Password Generator</h1>

      <div className='flex shadow rounded overflow-hidden mb-4'>
        <input
          type="text"
          value={password}
          className='w-full py-2 px-3 outline-none text-lg bg-white text-black'
          placeholder='Password'
          readOnly
        />
        <button
          onClick={copyToClipboard}
          className='bg-blue-700 hover:bg-blue-800 text-white px-4 py-2'
        >
          Copy
        </button>
      </div>

      <div className='flex items-center gap-x-3 mb-4'>
        <input
          type="range"
          min={6}
          max={30}
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className='cursor-pointer'
        />
        <label className='text-md'>Length: {length}</label>
      </div>

      <div className='flex items-center gap-x-2 mb-2'>
        <input
          type="checkbox"
          checked={numberAllowed}
          onChange={() => setNumberAllowed((prev) => !prev)}
        />
        <label>Include Numbers</label>
      </div>

      <div className='flex items-center gap-x-2'>
        <input
          type="checkbox"
          checked={charAllowed}
          onChange={() => setCharAllowed((prev) => !prev)}
        />
        <label>Include Special Characters</label>
      </div>
    </div>
  );
}

export default App;
