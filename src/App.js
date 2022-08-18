import React, { useState, useEffect } from 'react';
import {Button, Alert} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import keystrokeListener from './components/keystrokeListener';
import connectedGnome from './connected_gnome.jfif';
import disconnectedGnome from './disconnected_gnome.jfif';
import './App.css';

import io from 'socket.io-client';
import KeystrokeListener from './components/keystrokeListener';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const getRandomProperty = (obj) => {
  let keys = Object.keys(obj);
  return obj[keys[Math.floor(Math.random() * keys.length)]];
};

const gnomeImages = importAll(require.context('./images/gnomes', false, /\.(jfif|png|jpe?g|svg|gif)$/));
const spinningGnome = getRandomProperty(gnomeImages);

const socket = io('10.250.200.126:3001');
const disconnectedGnomeMarkup = <p><span style = {{color:'red'}}>AUGH!</span> disconnected.</p>
const connectedGnomeMarkup = <p><span style = {{color:'green'}}>connected ;)</span></p>
function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState(null);
  const [connectedGnomePicture, setConnectedGnomePicture] = useState(disconnectedGnome);
  const [connectedGnomeText, setConnectedGnomeText] = useState(disconnectedGnomeMarkup);
  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      setConnectedGnomePicture(connectedGnome);
      setConnectedGnomeText(connectedGnomeMarkup);
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
      setConnectedGnomeText(disconnectedGnomeMarkup);
      setConnectedGnomePicture(disconnectedGnome);
    });
    socket.on('message', data => {
      setLastMessage(data);
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
  const dancingGnome = <Col xs lg = "2"><img width = '100px' src = {gnomeImages['santa-fun.gif']}/></Col>;
  return (
    <Container style = {{textAlign:'center'}}>
      <Row>
        <Col>
        <KeystrokeListener onScan = {(scanResult) => console.log("Hey, look at this:", scanResult)}/>
        <h1>Welcome to <span className = 'rainbow-text'>SPINTHEGNO.ME</span></h1>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <img src={spinningGnome} className="Spinning-gnome" alt="logo"/>
        </Col>
      </Row>
      <Row>
        <Col>
          {connectedGnomeText}
          <img src = {connectedGnomePicture} width = '10%'/>
        </Col>
      </Row>
      <Row>
        <Col md = {8}>
          <p>Last message: { lastMessage || '-' }</p>
        </Col>
      <Col md = {1}>
        <button onClick={ sendMessage }>Say hello!</button>
      </Col>
      </Row>
    </Container>
  );
}

export default App;
