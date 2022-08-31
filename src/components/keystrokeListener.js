import React from 'react';
import {v4 as uuid} from "uuid"; 

var keystrokes = [];
var keystroke_debug = false;
var lastKeystrokeTime = Date.now() / 1000;
var lastScan = "No scans yet.";
var currentLocation = "No location yet.";

function KeystrokeListener(props) {
  const [state, setState] = React.useState({});
  const [textbox, setTextbox] = React.useState(''); // TODO: add a manual scan textbox
  const ref = React.useRef(null);
  const limitBetweenKeystrokes = 0.05; // to prevent accidental scans, i.e.: someone is mashing the keyboard
  const minimumScanLength = 6;
  React.useEffect(() => {
    const handleKeyDown = (event) => {
	   if  (event.keyCode >= 65 && event.keyCode <= 90 || // is it a letter?
			event.keyCode >= 48 && event.keyCode <= 57 || // or is it a number?
			event.key == "Enter") { // or is it the enter key?
			const secondsSinceEpoch = Date.now() / 1000;
			const secondsBetweenKeystrokes = secondsSinceEpoch - lastKeystrokeTime;
			if (secondsBetweenKeystrokes < limitBetweenKeystrokes){
					keystrokes.push(event.key);
					if (keystrokes.length >= minimumScanLength && event.key == 'Enter') {
						let scanResult = keystrokes.slice(0, -1).join('');
						if (!(document.activeElement === ref.current)) {
							if (props.onScan) {
								props.onScan(scanResult)
							}
							else {
								console.log("SCAN COMPLETED: " + scanResult);
							}
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
  }, [textbox]);
  if (keystroke_debug) {
  return (
  	<p class = 'center'>
	The <i>listener</i> lives here. &#128066; &#128585;
	</p>
	);
  } else {
	  return (
	  	<div style = {{margin: props.margin || '20px'}}>
      	Last scan: {state.lastScan? `${state.lastScan} from ${props.location}`: 'no scans yet :)'}
		<form onSubmit={(e) => {
			e.preventDefault();
			props.onScan(textbox);
			setTextbox('');
		}}>
			<input ref = {ref} type = 'text' value = {textbox} onChange = {(e) => setTextbox(e.target.value)}/>
			<input type = 'submit' value = {'scan to ' + props.location} />
		</form>

    	</div>);
  }
}

export default KeystrokeListener;
