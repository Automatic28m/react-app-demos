import PropTypes, { string } from 'prop-types';
import React from 'react';
import { useState, useEffect } from 'react';
import { Response } from './components/PropTypesResponse';

function App() {

  const [stringProp, setStringProp] = useState("");
  const [passProp, setPassProp] = useState(0);

  const handleStringPass = () => {
    // console.log(typeof(stringProp));
    setPassProp(stringProp);
  }

  const handleConvert = () => {
    let numericValue = Number(stringProp);
    // console.log(typeof(numericValue));
    setPassProp(numericValue);
  }

  return (
    <div className="container max-w-xl m-auto mt-20">
      <div className='flex flex-col gap-3 mb-3'>
        <b className='text-xl'>PropTypes Demo</b>
        <input type="text"
          placeholder="Type string or integer"
          className="input input-bordered w-full"
          onChange={(e) => setStringProp(e.target.value)}
        />
        {/* <input type='number'
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setStringProp(e.target.value)}
        /> */}
        <p>Click a prefer button then check result in console.</p>
        <button className='btn btn-outline btn-accent' onClick={handleStringPass}>Pass as String</button>
        <button className='btn btn-outline btn-accent' onClick={handleConvert}>Pass as Number</button>
      </div>
      <Response passProp={passProp} />
    </div>
  )
}

export default App;
