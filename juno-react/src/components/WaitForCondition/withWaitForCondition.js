import React from 'react';
import WaitForCondition from './component';

export default (onCheckCondition, waitDuration = 200) => C => props => (
  <WaitForCondition onCheckCondition={onCheckCondition} waitDuration={waitDuration}>
    <C {...props} />
  </WaitForCondition>
);

