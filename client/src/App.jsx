import './App.css';
import io from "socket.io-client";
import { useEffect, useState } from 'react';
import { getEndpoint } from './Helpers/endpoint';
import MainRouter from './User/MainRouter';


let socket;

function App() {
  const ENDPOINT = getEndpoint();

  useEffect(() => {
    socket = io(ENDPOINT);

    return () => {
      socket.off();
    }
  }, [ENDPOINT]);

  return (
    <>
      <MainRouter />
    </>
  );
}

export default App;
