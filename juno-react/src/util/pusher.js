import { useState, useEffect, useRef } from "react";
import Pusher from 'pusher-js';
import axios from 'axios';

const buildPusherInstance = () =>
  new Pusher(process.env.REACT_APP_PUSHER_KEY, {
    cluster: process.env.REACT_APP_PUSHER_CLUSTER,
    forceTLS: true,
  });

export const EventTypes = {
  TRAINER: 'trainer-event',
  TRAINEE: 'trainee-event',
};

export const publishEvent = (channel, event, data) => {
  axios.post(`${process.env.REACT_APP_API_URL}/publish`, {
    channel,
    event,
    message: JSON.stringify(data),
  });
};

export const usePusherSubscription = (channelName, eventName, connectedCallback) => {
  const pusher = useRef(buildPusherInstance());
  const events = useRef([]);
  const [pusherEvents, setPusherEvents] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("NOT_CONNECTED");

  useEffect(() => {
    try {
      pusher.current.subscribe(channelName);
      pusher.current.bind(eventName, (data) => {
        console.log("NEW DATA", data);
        events.current = [...events.current, data];
        setPusherEvents(events.current);
      });
      setConnectionStatus("CONNECTED");
      connectedCallback && connectedCallback();
    } catch {
      setConnectionStatus("FAILED");
    }

    return () => {
      if (!pusher.current) {
        return
      }
      pusher.current.unsubscribe(channelName);
      setConnectionStatus("NOT_CONNECTED");
    };
  }, [channelName, eventName]);

  return [connectionStatus, pusherEvents]
};
