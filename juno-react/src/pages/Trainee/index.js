import React, { useState, useCallback } from "react";
import {
  Button,
  Container,
  Menu,
  Input,
} from "semantic-ui-react";
import FullView from "./FullView";
import styles from "./styles.module.css";

const Trainee = () => {
  const [isSubmitted, setSubmitted] = useState(false);
  const [channelName, setChannelName] = useState("");
  const handleUpdateChannelName = useCallback(e => setChannelName(e.target.value.toUpperCase()), []);

  // Start the training session
  const handleJoinSession = useCallback(() => (async () => {
    if (!channelName) {
      alert('Channel name is mandatory');
      return;
    }

    if (isSubmitted) {
      return;
    }

    setSubmitted(true);
  })(), [channelName, isSubmitted]);

  if (isSubmitted) {
    return (
      <FullView channel={channelName} />
    )
  } else {
    return (
      <div>
        <Menu
          fixed="top"
          size='large'
          inverted
        >
          <Container>
            <Menu.Item as='div' className="ui input">
              <Input value={channelName} onChange={handleUpdateChannelName} className={styles.upperInput} />
            </Menu.Item>
            <Menu.Item as='div'>
              <Button as="div" primary onClick={handleJoinSession}>Join training session</Button>
            </Menu.Item>
          </Container>
        </Menu>
      </div>
    );
  }
};

export default Trainee;
