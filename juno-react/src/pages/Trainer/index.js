import React, { useState } from "react";
import Running from "./Running";
import Landing from "./Landing";

const Trainer = () => {
  const [channelName, setChannelName] = useState("");

  if (channelName) {
    return <Running channelName={channelName} />
  } else {
    return <Landing onStart={(channelName) => setChannelName(channelName)} />
  }
};

export default Trainer;
