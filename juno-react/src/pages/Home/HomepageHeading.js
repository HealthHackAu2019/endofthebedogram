// @flow

import React from 'react';
import { Button, Container, Header, Icon } from "semantic-ui-react";

const HomepageHeading = ({ mobile }: { mobile?: boolean }) => (
  <Container text>
    <Header
      as='h1'
      content='Juno'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='Digital training for neonatal care'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button primary size='huge'>
      Get Started
      <Icon name='right arrow' />
    </Button>
  </Container>
);

export default HomepageHeading;
