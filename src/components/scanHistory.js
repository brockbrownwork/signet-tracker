import React, { useState, useEffect } from 'react';


function ScanHistory(props) {
  let historyList = <></>
  if (props.scanHistory){
    console.log("console.dir of props.scanHistory[0]")
    console.dir(props.scanHistory[0])
    historyList = props.scanHistory.map(entry => <p>{entry.location}, {entry.date} </p>)
    console.log(historyList);
  }
  return (
    <div>
        {historyList? historyList: ''}
    </div>
  );
}

export default ScanHistory;
