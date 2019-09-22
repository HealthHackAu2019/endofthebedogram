// @flow

import React from 'react';
import { Button, Container, Header} from "semantic-ui-react";
import {Link, withRouter} from "react-router-dom";
import {Paths} from "../../App";
import styles from "./styles.module.scss"

const HomepageHeading = () => (
  <Container text>
    <Header
      as='h1'
      content='Juno'
      inverted
      style={{
        fontSize: '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: '3em',
      }}
    />
    <Header
      as='h2'
      content='Digital training for neonatal care'
      inverted
      style={{
        fontSize: '1.7em',
        fontWeight: 'normal',
        marginTop: '1.5em',
      }}
    />

    <div className={styles.buttonPadding}>
        <Link to={Paths.TRAINER}>
        <Button className="ui inverted green button" as='div'>Trainer</Button>
        </Link>
    </div>

    <div className={styles.buttonPadding}>
        <Link to={Paths.TRAINEE}>
            <Button className="ui inverted blue button" as='div'>Trainee</Button>
        </Link>
    </div>

  </Container>
);

export default HomepageHeading;
