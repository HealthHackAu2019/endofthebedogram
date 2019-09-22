import React, { useState, useCallback } from "react";
import {
  Form,
  Grid,
  Header,
} from "semantic-ui-react";

import FullView from "./FullView";
import styles from "./styles.module.css";

import NavBar from "../../components/NavBar";

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

  if (isSubmitted || true) {
    return (
      <FullView channel={channelName} />
    )
  } else {
    return (
      <div>
        <NavBar hideStartTraining />
        <Grid textAlign='center' style={{ height: '100vh', 'background-color': '#1b1c1d' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: '80vw' }}>
            <Header as='h2' style={{ color: 'white' }} textAlign='center'>
              Please enter your session code:
            </Header>
              <Form
                onSubmit={handleJoinSession}>
                  <Form.Input
                    fluid icon='key'
                    iconPosition='left'
                    placeholder='Session Code'
                    size="massive"
                    value={channelName}
                    onChange={handleUpdateChannelName}/>
                <Form.Button
                  primary
                  fluid
                  size='massive'>
                  Join Training Session
                </Form.Button>
              </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
};

export default Trainee;
