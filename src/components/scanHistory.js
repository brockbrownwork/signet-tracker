import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

function ScanHistory(props) {
  let historyList = ''
  if (props.scanHistory) {
    historyList = props.scanHistory.map(entry => <div key = {uuid()}>{entry.location}, {entry.date} </div>)
    console.log(historyList);
  }
  return (
    <div>
        {historyList != [] && historyList != ''? historyList: 'ack! no history'}
    </div>
  );
}

export default ScanHistory;
