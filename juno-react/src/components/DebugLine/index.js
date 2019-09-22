import React from "react";

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default ({ enabled, right }) => {
  if (!enabled) {
    return null
  }

  const styles = {
    position: 'fixed',
    width: '50px',
    top: 0,
    bottom: 0,
    backgroundColor: `${getRandomColor()}77`,
    ...(right ? { right: 0 } : { left: 0 }),
  };

  return <div style={styles}/>;
}

