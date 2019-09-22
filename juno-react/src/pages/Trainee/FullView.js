import React, { Fragment } from "react";
import Debug from "../../components/Debug";
import ARView from "../../components/ARView";
import { EventTypes, publishEvent, usePusherSubscription } from "../../util/pusher";

const connectedCallback = (channel) => () => publishEvent(channel, EventTypes.TRAINEE, { action: 'joined' });

const FullView = ({ channel }) => {
  // const [connectionStatus, pusherEvents] = usePusherSubscription(channel, EventTypes.TRAINER, connectedCallback(channel));
  // const latestEvent = pusherEvents[pusherEvents.length - 1];
  const connectionStatus = "TESTING";
  const latestEvent = {TESTING: 1, model: "https://s3-ap-southeast-2.amazonaws.com/www.junohealth.com/models/baby040.glTF.glb"};

  return (
    <Fragment>
      <Debug enabled line>
        <div style={{ position: 'fixed', zIndex: 15, color: "red", fontWeight: 600, fontSize: 16 }}>
          Connection Status: {connectionStatus}
          <br />
          PusherEvents:
          <pre>{JSON.stringify(latestEvent, null, 2)}</pre>
        </div>
      </Debug>
      <ARView model={latestEvent ? latestEvent.model : ""} />
    </Fragment>
  );
};

export default FullView;
