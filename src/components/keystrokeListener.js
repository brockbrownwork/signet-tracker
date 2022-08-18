import React from 'react';
import {v4 as uuid} from "uuid"; 

var keystrokes = [];
var keystroke_debug = false;
var lastKeystrokeTime = Date.now() / 1000;
var lastScan = "No scans yet.";
var currentLocation = "No location yet.";

function KeystrokeListener(props) {
  const [state, setState] = React.useState({})
  const limitBetweenKeystrokes = 0.05; // to prevent accidental scans, i.e.: someone is mashing the keyboard
  const minimumScanLength = 6;
  React.useEffect(() => {
	console.log("Change to keystroke_debug detected.");
    const handleKeyDown = (event) => {
	   if  (event.keyCode >= 65 && event.keyCode <= 90 || // is it a letter?
			event.keyCode >= 48 && event.keyCode <= 57 || // or is it a number?
			event.key == "Enter") { // or is it the enter key?
			// console.log(event.key);
			// console.log("accumulated keystrokes: " + String(keystrokes));
			const secondsSinceEpoch = Date.now() / 1000;
			// console.log("secondsSinceEpoch: " + String(secondsSinceEpoch));
			const secondsBetweenKeystrokes = secondsSinceEpoch - lastKeystrokeTime;
			// console.log("Time between keystrokes: " + String(secondsSinceEpoch - lastKeystrokeTime));
			if (secondsBetweenKeystrokes < limitBetweenKeystrokes){
					keystrokes.push(event.key);
					// console.log(keystrokes);
					if (keystrokes.length >= minimumScanLength && event.key == 'Enter') {
						let scanResult = keystrokes.slice(0, -1).join('');
						if (props.onScan) {
							props.onScan(scanResult)
						}
						else {
							console.log("SCAN COMPLETED: " + scanResult);
						}
            setState({...state, lastScan: keystrokes.slice(0, -1).join('')})
					}
			} else {
			   keystrokes = [event.key];
			   console.log("Timed out, keystrokes have been reset.");
			}
		   lastKeystrokeTime = secondsSinceEpoch;
		}
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [keystroke_debug]); // TODO: why doesn't this react? Maybe it's because it needs to be in the actual effect.
  if (keystroke_debug) {
  return(<p class = 'center'>The <i>listener</i> lives here. &#128066; &#128585;</p>);
  } else {
	  return (<div>
      Last scan: {state.lastScan? state.lastScan: 'no scans yet :)'}
    </div>);
  }
}

export default KeystrokeListener;
