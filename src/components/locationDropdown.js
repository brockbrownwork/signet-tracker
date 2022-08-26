import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

function App(props) {
  let locations = []
  let cell_numbers = [1, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  let options = cell_numbers.map(cell => <option key = {uuid()}>cell {cell}</option>)
  useEffect(() => {
    
  }, []);

  return (
  <select onChange = {
    (e) => {
      props.setLocation(e.target.value)
      e.target.blur() // blurs so that when the next scan comes in, it doesn't pop open the dropdown
      }} value = {props.location}>
    {options}
  </select>
  );
}

export default App;
