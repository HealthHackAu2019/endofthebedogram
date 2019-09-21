// @flow

import React, { useState, type Node } from "react";
import { Button, Container, Icon, Menu, Responsive, Segment, Sidebar, Visibility } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Paths } from "../../App";
import HomepageHeading from "./HomepageHeading";

function DesktopContainer({ children }: { children: Node }) {
  const [fixedMenuVisible, setFixedMenu] = useState(false);

  return (
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <Visibility
        once={false}
        onBottomPassed={() => setFixedMenu(true)}
        onBottomPassedReverse={() => setFixedMenu(false)}
      >
        <Segment
          inverted
          textAlign='center'
          style={{ minHeight: 700, padding: '1em 0em' }}
          vertical
        >
          <Menu
            fixed={fixedMenuVisible ? 'top' : null}
            inverted={!fixedMenuVisible}
            pointing={!fixedMenuVisible}
            secondary={!fixedMenuVisible}
            size='large'
          >
            <Container>
              <Link to={Paths.HOME}>
                <Menu.Item active>Home</Menu.Item>
              </Link>
              <Link to={Paths.ABOUT}>
                <Menu.Item as='a'>About</Menu.Item>
              </Link>
              <Menu.Item position='right'>
                <Link to={Paths.TRAINEE}>
                  <Button as='a' inverted={!fixedMenuVisible}>Start Training Session</Button>
                </Link>
                <Link to={Paths.TRAINEE}>
                  <Button as='a' inverted={!fixedMenuVisible} primary={fixedMenuVisible} style={{ marginLeft: '0.5em' }}>Join Training Session</Button>
                </Link>
              </Menu.Item>
            </Container>
          </Menu>
          <HomepageHeading />
        </Segment>
      </Visibility>

      {children}
    </Responsive>
  )
}

function MobileContainer({ children }: { children: Node }) {
  const [sidebarOpened, setSidebarOpened] = useState(false);

  return (
    <Responsive as={Sidebar.Pushable} maxWidth={Responsive.onlyMobile.maxWidth}>
      <Sidebar
        as={Menu}
        animation='push'
        inverted
        onHide={() => setSidebarOpened(false)}
        vertical
        visible={sidebarOpened}
      >
        <Menu.Item as='a' active>
          Home
        </Menu.Item>
        <Menu.Item as='a'>About</Menu.Item>
        <Menu.Item as='a'>Start Training Session</Menu.Item>
        <Menu.Item as='a'>Join Training Session</Menu.Item>
      </Sidebar>

      <Sidebar.Pusher dimmed={sidebarOpened}>
        <Segment
          inverted
          textAlign='center'
          style={{ minHeight: 350, padding: '1em 0em' }}
          vertical
        >
          <Container>
            <Menu inverted pointing secondary size='large'>
              <Menu.Item onClick={() => setSidebarOpened(true)}>
                <Icon name='sidebar' />
              </Menu.Item>
              <Menu.Item position='right'>
                <Button as='a' inverted>
                  Start Training Session
                </Button>
                <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                  Join Training Session
                </Button>
              </Menu.Item>
            </Menu>
          </Container>
          <HomepageHeading mobile />
        </Segment>

        {children}
      </Sidebar.Pusher>
    </Responsive>
  );
}

const ResponsiveContainer = ({ children }: { children: Node }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

export default ResponsiveContainer;
