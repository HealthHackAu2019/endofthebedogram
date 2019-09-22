import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Segment,
} from "semantic-ui-react";
import cn from "classnames";
import styles from "./styles.module.scss";
import HomepageHeading from "./HomepageHeading";
import NavBar from "../../components/NavBar";
import {Link} from "react-router-dom";

const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
  cluster: process.env.REACT_APP_PUSHER_CLUSTER,
  forceTLS: true,
});

const channelName = 'channel001';
const eventName = 'event001';

function Home() {
  const [ message, setMessage ] = useState('');

  useEffect(() => {
    const ch = pusher.subscribe(channelName);
    ch.bind(eventName, (msg) => setMessage(JSON.stringify(msg)));

    return () => pusher.unsubscribe(channelName);
  }, []);


  return (
    <div>
      <NavBar hero>
        <HomepageHeading/>
      </NavBar>
      <p>{message}</p>

      <Segment className={styles.topPadding} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h3' className={styles.header}>
                Plastic Baby Manikins Aren't Good Enough
              </Header>
              <p className={styles.details}>
                When assessing neonates, Midwives and Doctors too often mistake normal presentations as signs of
                disease. When this results in unnecessary procedures being performed it can cause distress to the baby
                / family, be unnecessarily risky and costly. Educational programs to address this issue are currently
                delivered using neonatal manikins that don’t accurately reflect the clinical signs.
              </p>
              <Header as='h3' className={styles.header}>
                Disrupting the Endofthebedogram
              </Header>
              <p className={styles.details}>
              Juno is an animated full body simulated baby, with varying skin tones.
              augmented reality overlay of the manikin with a number of presentations and skin types.
              </p>
            </Grid.Column>
            <Grid.Column floated='right' width={6}>
              <div className={styles.imagePlaceholder} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Button size='huge'>Check Them Out</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment className={styles.noPadding} vertical>
        <Grid celled='internally' columns='equal' stackable>
          <Grid.Row textAlign='center'>
            <Grid.Column className={styles.gridPadding}>
              <Header as='h3' className={styles.header}>
                "Quote"
              </Header>
              <p className={styles.details}>Details</p>
            </Grid.Column>
            <Grid.Column className={styles.gridPadding}>
              <Header as='h3' className={styles.header}>
                "Quote"
              </Header>
              <p className={styles.details}>Details</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment className={styles.topPadding} vertical>
        <Container text>
          <Header as='h3' className={styles.header}>
            Header
          </Header>
          <p className={styles.details}>
            Some content here
          </p>
          <Button as='a' size='large'>
            Action
          </Button>

          <Divider
            as='h4'
            horizontal
            className={cn('header', styles.divider)}
          >
            Divider
          </Divider>

          <Header as='h3' className={styles.header}>
            Header
          </Header>
          <p className={styles.details}>
            Some content here
          </p>
          <Button as='a' size='large'>
            Action
          </Button>
        </Container>
      </Segment>
    </div>
  );
}

export default Home;
