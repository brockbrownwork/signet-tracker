import React, { useState, useEffect } from 'react';
import {Button, Alert} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import signetLogo from './images/signet.png'
import './App.css';

import io from 'socket.io-client';
import KeystrokeListener from './components/keystrokeListener';

test();

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const getRandomProperty = (obj) => {
  let keys = Object.keys(obj);
  return obj[keys[Math.floor(Math.random() * keys.length)]];
};

const socket = io('10.250.200.126:3001');
function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState(null);
  const [bulletinBoard, setBulletinBoard] = useState('');
  document.body.style = 'background: rgb(200, 200, 200)';
  document.title = 'Signet Tracking';
  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      console.log("Connected!");
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log("Disconnected.");
    });
    socket.on('message', data => {
      setLastMessage(data);
    });
    socket.on('bulletinBoard', data => {
      setBulletinBoard(data);
    });
    
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('hello!');
  }

  const onScan = (scanResult) => {
    console.log("Here's the scan result: ", scanResult);
    socket.emit("scan", scanResult);
  };
  return (
    <div>
    <Container style = {{textAlign:'center', verticalAlign: 'center'}}>
      <Row>
        <Col>
          <img src = {signetLogo} width = "30%" style = {{paddingTop:"2.5%"}}/>
          <h2 style = {{paddingTop: "20px", paddingBottom:"5px"}}>Tracking System</h2>
        </Col>
        <Row>
          <p>Bulletin board: {bulletinBoard}</p>
        </Row>
      </Row>
      <Row>
        <Col className="text-center">
        </Col>
      </Row>
      <Row>
        <Col>
          <button onClick={ sendMessage }>Say hello!</button>
      </Col>
      </Row>
      <Row>
        <Col>
          <KeystrokeListener onScan = {onScan}/>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default App;
