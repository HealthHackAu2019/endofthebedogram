import React, { Fragment } from "react";
import DebugLine from "../../components/DebugLine";
import ARView from "../../components/ARView";
import { EventTypes, publishEvent, usePusherSubscription } from "../../util/pusher";

const connectedCallback = (channel) => () => publishEvent(channel, EventTypes.TRAINEE, { action: 'joined' });

const FullView = ({ channel }) => {
  const [connectionStatus, pusherEvents] = usePusherSubscription(channel, EventTypes.TRAINER, connectedCallback(channel));
  const latestEvent = pusherEvents[pusherEvents.length - 1];

  return (
    <Fragment>
      <DebugLine enabled />
      <div style={{ position: 'fixed', zIndex: 15, color: "red", fontWeight: 600, fontSize: 16 }}>
        Connection Status: {connectionStatus}
        <br />
        PusherEvents:
        <pre>{JSON.stringify(latestEvent, null, 2)}</pre>
      </div>
      <ARView />
    </Fragment>
  );
};

export default FullView;
