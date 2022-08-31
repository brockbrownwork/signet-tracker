import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

function ScanHistory(props) {
  let historyList = ''
  if (props.scanHistory) {
    historyList = props.scanHistory.map(
      (entry) => {
        let date = new Date(Date.parse(entry.date))
        let time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
        historyList =
          <div key = {uuid()}>
            {entry.location}, {date.toLocaleDateString()}, {time}
            <p>
              {entry.comments}
            </p>
          </div>
        console.log("historyList:", historyList)
        return <span>
          {historyList}
        </span>
      })
  }
  return (
    <div>
        {historyList != [] && historyList != ''? [<strong>History of last scan:</strong>, ...historyList]: 'ack! no history'}
    </div>
  );
}

export default ScanHistory;
