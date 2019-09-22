import React, { useRef, Fragment } from "react";
import {
  Button,
  Header,
  Input,
  Form,
} from "semantic-ui-react";
import styles from './styles.module.css';
import NavBar from "../../components/NavBar";

const generateCode = (length) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let text = "";

  for (let i = 0; i < length; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return text;
};

const Landing = ({ onStart }) => {
  const channelName = useRef(generateCode(5));

  return (
    <Fragment>
      <NavBar hideStartTraining />
      <div className={styles.landingLayout}>
        <Header as="h2">Your session code is:</Header>
        <Form onSubmit={() => onStart(channelName.current)}>
          <Form.Input className={styles.upperInput} value={channelName.current} readOnly size="massive" />
          <Form.Button size="massive" primary>Start training session</Form.Button>
        </Form>
        </div>
    </Fragment>
  );
};

export default Landing;
