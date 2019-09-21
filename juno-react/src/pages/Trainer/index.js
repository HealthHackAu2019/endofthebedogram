import React, { useState, useCallback } from "react";
import {
  Button,
  Container,
  Menu,
  Input,
} from "semantic-ui-react";
import axios from 'axios';

const Trainer = () => {
  const [connected, setConnected] = useState(false);
  const [channelName, setChannelName] = useState(Math.random().toString(36).substring(7));

  // Update channel name
  const handleUpdateChannelName = useCallback(e => setChannelName(e.target.value), []);

  // Start the training session
  const handleStartSession = useCallback(() => (async () => {
    await axios.post(`${process.env.REACT_APP_API_URL}/publish`, {
      channel: channelName,
      event: 'trainer-event',
      message: 'Starting session...',
    });
    setConnected(true);
  })(), [channelName]);

  return (
    <div>
      <Menu
        fixed="top"
        size='large'
        inverted
      >
        <Container>
          <Menu.Item as='div' className="ui input">
            <Input value={channelName} readOnly={connected} onChange={handleUpdateChannelName} />
          </Menu.Item>
          <Menu.Item as='div'>
            <Button as="div" primary disabled={connected} onClick={handleStartSession}>Start training session</Button>
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
};

export default Trainer;
