import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import socketIOClient from "socket.io-client"

import { Button, Input } from 'antd';
import 'antd/dist/antd.css';

const ENDPOINT = "http://127.0.0.1:4001";

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px;
  border: solid grey 1px;
`

const Form = styled.div`
  display: flex;
  width: 100%;
`


function App() {
  const [message, setMessage] = useState(null)
  const [messages, setMessages] = useState([])
  let socket

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, {
      withCredentials: true
    })

    socket.on("message received", message => {
      console.log(message)
    })
  }, []);
  
  const handleSubmit = () => {
    message && socket.emit("message submitted", message)
  }

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  return (
    <Footer>
      <Form onSubmit={handleSubmit}>
        <Input
          autoFocus
          onChange={handleChange}
        />
        <Button type="submit">
          Envoyer
        </Button>
      </Form>
    </Footer>
  );
}

export default App;