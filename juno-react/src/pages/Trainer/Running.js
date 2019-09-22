import React, { useState, useEffect } from "react";
import {
  Button,
  Segment,
  Grid,
  Header,
  Menu,
  Container,
  Input,
} from "semantic-ui-react";
import styles from './styles.module.css';
import ObjectRenderer from '../../components/ObjectRenderer';
import {EventTypes, publishEvent, usePusherSubscription} from "../../util/pusher";

const models = {
  'https://s3-ap-southeast-2.amazonaws.com/www.junohealth.com/models/baby040.glTF.glb': 'Normal',
  'https://s3-ap-southeast-2.amazonaws.com/www.junohealth.com/models/face-attempt-001.glTF.glb': 'Face condition',
  'https://s3-ap-southeast-2.amazonaws.com/www.junohealth.com/models/baby-045-chest.glTF.glb': 'Chest condition',
  'https://s3-ap-southeast-2.amazonaws.com/www.junohealth.com/models/baby012.glb': 'Plain',
};

const modelKeys = Object.keys(models);

const publish = ({ channelName, model }) =>
  publishEvent(channelName, EventTypes.TRAINER, {
    model,
  });

const Running = ({ channelName }) => {
  const [connectionStatus, pusherEvents] = usePusherSubscription(channelName, EventTypes.TRAINEE);
  const [model, setModel] = useState(modelKeys[0]);

  useEffect(() => {
    publish({ channelName, model });
  }, [channelName, model, pusherEvents]);

  return (
    <div>
      <Menu
        fixed="top"
        size='large'
        inverted
      >
        <Container>
          <Menu.Item as='div' className="ui input">
            <div className={styles.codeHeader}>Room Code:</div>
            <Input className={styles.upperInput} value={channelName} readOnly />
          </Menu.Item>
          <Menu.Item position='right'>
            <div className={styles.codeHeader}>Number of connections: {pusherEvents.length}</div>
          </Menu.Item>
        </Container>
      </Menu>

      <Segment id={styles.content} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={16} className={styles.column}>
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

export default Running;
