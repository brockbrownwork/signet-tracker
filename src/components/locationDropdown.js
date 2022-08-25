import React, { useState, useEffect } from 'react';

function App(props) {
  let locations = []
  let cell_numbers = [1, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  let options = cell_numbers.map(cell => <option>cell {cell}</option>)
  useEffect(() => {
  }, []);

  return (
  <select onChange = {(e) => props.setLocation(e.target.value)} name="locations" id="locations" selected = "cell 5">
    {options}
  </select>
  );
}

export default App;