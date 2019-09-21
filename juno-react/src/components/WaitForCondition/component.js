import React, { Component, useState, useEffect, useCallback } from 'react';

const WaitForCondition = ({ onCheckCondition, waitDuration, children }) => {
  const [conditionMet, setConditionMet] = useState(false);

  const checkCondition = useCallback(() => {
    const passed = onCheckCondition();
    if (!passed) {
      setTimeout(checkCondition, waitDuration);
    } else {
      setConditionMet(true);
    }
  }, [onCheckCondition, waitDuration]);

  useEffect(() => {
    checkCondition();
  }, []);

  if (!conditionMet) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return children;
};

export default WaitForCondition;
