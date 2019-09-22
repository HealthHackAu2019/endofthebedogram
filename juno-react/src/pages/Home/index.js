import React from 'react';
import {
  Grid,
  Header,
  Segment,
  Image,
  Button,
} from "semantic-ui-react";
import styles from "./styles.module.scss";
import HomepageHeading from "./HomepageHeading";
import NavBar from "../../components/NavBar";
import baby from "../../img/baby.jpg";


function Home() {
  return (
    <div>
      <NavBar hero>
        <HomepageHeading/>
      </NavBar>

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
              Juno is an animated full body augmented reality overlay of the manikin
              with a number of presentations and skin types.
              </p>
            </Grid.Column>
            <Grid.Column floated='right' width={8}>
              <Image src={baby} rounded />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment className={styles.topPadding} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column floated='left' width={8}>
              <Image src='https://jeromeetienne.github.io/AR.js/data/images/HIRO.jpg' rounded />
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as='h3' className={styles.header}>
                How to use Juno
              </Header>
              <p className={styles.details}>
                Our augmented reality system uses a marker to position the simulated baby
                in the real world.
              </p>
              <p>
                <a href="https://jeromeetienne.github.io/AR.js/data/images/HIRO.jpg" download>
                  <Button size='large'>	
                    Download Marker	
                  </Button>
                </a>
              </p>
              <p className={styles.details}>
              Once a trainee joins a session, by pointing their phone at the
              marker they will be able to see the simulated baby.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>


    </div>
  );
}

export default Home;
