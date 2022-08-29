import React, { useState, useEffect } from 'react';


function OnlineIndicator(props) {

  return (
    <strong style = {props.connected? {color:'green'}: {color:'red'}}>
    {props.connected? "online": "offline"}
    </strong>
  );
}

export default OnlineIndicator;
