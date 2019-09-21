import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import logo from './logo.svg';
import styles from './styles.module.scss';

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
    <div className={styles.container}>
      <header className={styles.header}>
        <img src={logo} className={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>{message}</p>
        <a
          className={styles.link}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Home;
