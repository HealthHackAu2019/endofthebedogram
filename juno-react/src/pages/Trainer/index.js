import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Container,
  Menu,
  Input,
  Segment,
  Grid,
  Header,
} from "semantic-ui-react";
import Pusher from 'pusher-js';
import ObjectRenderer from '../../components/ObjectRenderer';
import styles from './styles.module.css';
import {EventTypes, publishEvent} from "../../util/pusher";

let _pusher = undefined;
const pusher = () => {
  if (!_pusher) {
    _pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
      forceTLS: true,
    });
  }

  return _pusher;
};

const models = {
  'https://s3-ap-southeast-2.amazonaws.com/www.junohealth.com/models/baby040.glTF.glb': 'Model 1',
  'https://s3-ap-southeast-2.amazonaws.com/www.junohealth.com/models/baby012.glb': 'Model 2',
  'https://s3-ap-southeast-2.amazonaws.com/www.junohealth.com/models/baby012.glb': 'Model 3',
};

const textures = {
  texture1: 'Texture 1',
  texture2: 'Texture 2',
  texture3: 'Texture 3',
};

const modelKeys = Object.keys(models);
const textureKeys = Object.keys(textures);

const publish = ({ channelName, model, texture }) =>
  publishEvent(channelName, EventTypes.TRAINER, {
    model,
    texture,
  });

const generateCode = (length) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let text = "";

  for (let i = 0; i < length; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return text;
};

const Trainer = () => {
  const [connected, setConnected] = useState(false);
  const [channelName, setChannelName] = useState(generateCode(5));
  const [model, setModel] = useState(modelKeys[0]);
  const [texture, setTexture] = useState('');

  // Update channel name
  const handleUpdateChannelName = useCallback(e => setChannelName(e.target.value.toUpperCase()), []);
  useEffect(() => {
    if (!channelName) return;
    publish({ channelName, model, texture });
  }, [channelName, model, texture]);

  // Start the training session
  const handleStartSession = useCallback(() => (async () => {
    pusher().subscribe(channelName);
    pusher().bind(EventTypes.TRAINEE, () => {
      publish({ channelName, model, texture });
    });
    setConnected(true);
  })(), [channelName]);

  return (
    <div className={styles.root}>
      <Menu
        fixed="top"
        size='large'
        inverted
      >
        <Container>
          <Menu.Item as='div' className="ui input">
            <Input className={styles.upperInput} value={channelName} readOnly onChange={handleUpdateChannelName} />
          </Menu.Item>
          <Menu.Item as='div'>
            <Button as="div" primary disabled={connected} onClick={handleStartSession}>Start training session</Button>
          </Menu.Item>
        </Container>
      </Menu>

      <Segment id={styles.content} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={8} className={styles.column}>
              <Header as='h3'>Models</Header>
              {modelKeys.map(m => (
                <Button
                  key={m}
                  onClick={() => setModel(m)}
                  primary={m === model}
                >
                  {models[m]}
                </Button>
              ))}
            </Grid.Column>
            <Grid.Column width={8} className={styles.column}>
              <Header as='h3'>Textures</Header>
              {textureKeys.map(t => (
                <Button
                  key={t}
                  onClick={() => setTexture(t)}
                  primary={t === texture}
                >
                  {textures[t]}
                </Button>
              ))}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              <ObjectRenderer
                key={model}
                modelPath={model}
                zPosition={-50}
                zOffset={3}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};

export default Trainer;
