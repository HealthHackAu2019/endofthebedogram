import React, { useState, useCallback } from "react";
import {
  Button,
  Container,
  Menu,
  Input,
} from "semantic-ui-react";
import Pusher from 'pusher-js';

const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
  cluster: process.env.REACT_APP_PUSHER_CLUSTER,
  forceTLS: true,
});

const Trainee = () => {
  const [connected, setConnected] = useState(false);
  const [channelName, setChannelName] = useState();
  const [trainerEvents, setTrainerEvents] = useState([]);
  const handleUpdateChannelName = useCallback(e => setChannelName(e.target.value), []);

  // Start the training session
  const handleJoinSession = useCallback(() => {
    if (!channelName) {
      alert('Channel name is mandatory');
      return;
    }

    pusher.subscribe(channelName);
    pusher.bind('trainer-event', (data) => {
      setTrainerEvents([...trainerEvents, data]);
    });
    setConnected(true);
  }, [channelName, trainerEvents]);

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
            <Button as="div" primary disabled={connected} onClick={handleJoinSession}>Join training session</Button>
          </Menu.Item>
        </Container>
      </Menu>
      <p>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        {JSON.stringify(trainerEvents)}
      </p>
    </div>
  );
};

export default Trainee;
