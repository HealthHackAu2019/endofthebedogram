import React from 'react';
import {
  Grid,
  Header,
  Segment,
  Image,
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
              Juno is an animated full body simulated baby, with varying skin tones.
              augmented reality overlay of the manikin with a number of presentations and skin types.
              </p>
            </Grid.Column>
            <Grid.Column floated='right' width={8}>
              <Image src={baby} rounded />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>



    </div>
  );
}

export default Home;
