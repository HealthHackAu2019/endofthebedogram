// @flow

import React from 'react';
import { Button, Container, Header, Icon } from "semantic-ui-react";

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
    <Button primary size='huge'>
      Get Started
      <Icon name='right arrow' />
    </Button>
  </Container>
);

export default HomepageHeading;
